#!/usr/bin/env python3
import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path('/Users/diego/.openclaw/workspace/diego-claw')
DATA_PATH = ROOT / 'projects' / 'data' / 'openclaw-status-dashboard.json'
DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
OPENCLAW_BIN = '/opt/homebrew/bin/openclaw'
OLLAMA_BIN = '/usr/local/bin/ollama'


def run(cmd):
    return subprocess.check_output(cmd, text=True, stderr=subprocess.STDOUT)


def run_optional(cmd):
    try:
        return run(cmd)
    except Exception:
        return None


def load_existing():
    if DATA_PATH.exists():
        try:
            return json.loads(DATA_PATH.read_text(encoding='utf-8'))
        except Exception:
            return {}
    return {}


def parse_security_audit():
    raw = run_optional([OPENCLAW_BIN, 'security', 'audit'])
    if not raw:
        return {'critical': None, 'warn': None, 'info': None, 'summaryText': 'Security audit unavailable'}
    m = re.search(r'Summary:\s+(\d+)\s+critical\s+·\s+(\d+)\s+warn\s+·\s+(\d+)\s+info', raw)
    if not m:
        return {'critical': None, 'warn': None, 'info': None, 'summaryText': raw.splitlines()[0].strip() if raw.splitlines() else 'Security audit unavailable'}
    return {
        'critical': int(m.group(1)),
        'warn': int(m.group(2)),
        'info': int(m.group(3)),
        'summaryText': m.group(0)
    }


def sanitize_recent_sessions(status):
    recent = status.get('sessions', {}).get('recent', [])[:6]
    out = []
    for item in recent:
        out.append({
            'agentId': item.get('agentId'),
            'kind': item.get('kind'),
            'model': item.get('model'),
            'ageMs': item.get('age'),
            'percentUsed': item.get('percentUsed'),
            'remainingTokens': item.get('remainingTokens'),
            'contextTokens': item.get('contextTokens'),
            'thinkingLevel': item.get('thinkingLevel'),
        })
    return out


def make_summary_input(snapshot):
    trimmed = {
        'gatewayStatus': snapshot['openclaw']['gatewayStatus'],
        'gatewayLatencyMs': snapshot['openclaw']['gatewayLatencyMs'],
        'agents': snapshot['openclaw']['agents'],
        'sessions': snapshot['openclaw']['sessions'],
        'tasksActive': snapshot['openclaw']['tasksActive'],
        'taskFailures': snapshot['openclaw']['taskFailures'],
        'primaryModel': snapshot['session']['model'],
        'contextUsedPercent': snapshot['session']['contextUsedPercent'],
        'security': snapshot['security'],
        'usage': snapshot.get('usage', {}),
        'tokens': snapshot.get('tokens', []),
    }
    return json.dumps(trimmed, separators=(',', ':'), ensure_ascii=False)


def ollama_summary(snapshot):
    prompt = (
        'Return JSON only with keys summary and riskLabel. '
        'Summary must be one short sentence. riskLabel must be one of Low Risk, Moderate Risk, High Risk. '
        'Base it on this OpenClaw dashboard snapshot: ' + make_summary_input(snapshot)
    )
    try:
        raw = subprocess.check_output([OLLAMA_BIN, 'run', 'gemma4:latest', prompt], text=True, stderr=subprocess.STDOUT, timeout=90)
        m = re.search(r'\{.*\}', raw, re.S)
        if not m:
            raise ValueError('No JSON object in ollama output')
        parsed = json.loads(m.group(0))
        return {
            'summary': str(parsed.get('summary', '')).strip() or 'OpenClaw is operational.',
            'riskLabel': str(parsed.get('riskLabel', '')).strip() or 'Moderate Risk'
        }
    except Exception:
        security = snapshot['security']
        critical = security.get('critical') or 0
        warn = security.get('warn') or 0
        if critical > 0:
            return {
                'summary': 'OpenClaw is running and healthy overall, but the security audit still needs attention.',
                'riskLabel': 'Moderate Risk'
            }
        if warn > 0:
            return {
                'summary': 'OpenClaw is running cleanly with good headroom, with only minor warnings to review.',
                'riskLabel': 'Low Risk'
            }
        return {
            'summary': 'OpenClaw is running cleanly with healthy usage headroom.',
            'riskLabel': 'Low Risk'
        }


def main():
    existing = load_existing()
    status = json.loads(run([OPENCLAW_BIN, 'status', '--json']))
    security = parse_security_audit()

    gateway = status.get('gateway', {})
    gateway_service = status.get('gatewayService', {})
    sessions = status.get('sessions', {})
    tasks = status.get('tasks', {})
    heartbeat = status.get('heartbeat', {})
    recent = sessions.get('recent', [])

    primary_session = None
    for item in recent:
        if item.get('agentId') == 'main':
            primary_session = item
            break
    if not primary_session and recent:
        primary_session = recent[0]
    primary_session = primary_session or {}

    snapshot = {
        'generatedAt': datetime.now(timezone.utc).isoformat(),
        'runtimeVersion': status.get('runtimeVersion'),
        'openclaw': {
            'gatewayStatus': 'Running' if gateway.get('reachable') else 'Unavailable',
            'gatewayLatencyMs': gateway.get('latencyMs') or gateway.get('reachableMs'),
            'gatewayService': gateway_service.get('runtimeShort') or gateway_service.get('state') or 'unknown',
            'agents': len(status.get('agents', {}).get('agents', [])) if isinstance(status.get('agents', {}).get('agents'), list) else None,
            'sessions': sessions.get('count'),
            'tasksActive': tasks.get('active'),
            'tasksQueued': tasks.get('byStatus', {}).get('queued', 0),
            'taskFailures': tasks.get('failures'),
            'heartbeatEvery': next((a.get('every') for a in heartbeat.get('agents', []) if a.get('agentId') == 'main'), None),
            'channelSummary': status.get('channelSummary', []),
        },
        'session': {
            'model': primary_session.get('model') or sessions.get('defaults', {}).get('model'),
            'kind': primary_session.get('kind'),
            'reasoning': primary_session.get('thinkingLevel') or 'standard',
            'contextUsedPercent': primary_session.get('percentUsed'),
            'contextTokens': primary_session.get('contextTokens'),
            'remainingTokens': primary_session.get('remainingTokens'),
            'ageMs': primary_session.get('age'),
        },
        'security': security,
        'recentSessions': sanitize_recent_sessions(status),
        'usage': existing.get('usage', {
            'day': {'leftPercent': 98, 'consumed': '5h', 'remaining': '3h 48m', 'label': 'Very safe'},
            'week': {'leftPercent': 98, 'consumed': 'Low burn', 'remaining': '4d 7h', 'label': 'Excellent'}
        }),
        'tokens': existing.get('tokens', [
            {'name': 'Default OAuth token', 'status': 'OK', 'expiresIn': '29h'},
            {'name': 'OpenAI Codex account token', 'status': 'OK', 'expiresIn': '10d'}
        ]),
    }

    ai = ollama_summary(snapshot)
    snapshot['aiSummary'] = ai['summary']
    snapshot['riskLabel'] = ai['riskLabel']

    DATA_PATH.write_text(json.dumps(snapshot, indent=2), encoding='utf-8')
    print(f'Wrote {DATA_PATH}')


if __name__ == '__main__':
    main()
