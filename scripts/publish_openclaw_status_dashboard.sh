#!/bin/zsh
set -euo pipefail

REPO="/Users/diego/.openclaw/workspace/diego-claw"
LOG_DIR="$REPO/.logs"
LOCK_DIR="/tmp/publish_openclaw_status_dashboard.lock"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
mkdir -p "$LOG_DIR"

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Another dashboard publish run is already in progress." >> "$LOG_DIR/openclaw-dashboard-publish.log"
  exit 0
fi
trap 'rmdir "$LOCK_DIR"' EXIT

{
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting dashboard refresh"
  cd "$REPO"

  /opt/homebrew/bin/python3 scripts/update_openclaw_status_dashboard.py

  /usr/bin/git add \
    projects/openclaw-status-dashboard.html \
    projects/data/openclaw-status-dashboard.json \
    scripts/update_openclaw_status_dashboard.py \
    scripts/publish_openclaw_status_dashboard.sh

  if /usr/bin/git diff --cached --quiet; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] No dashboard changes to publish"
    exit 0
  fi

  /usr/bin/git commit -m "Refresh OpenClaw status dashboard snapshot"
  /usr/bin/git push origin main
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Published dashboard update"
} >> "$LOG_DIR/openclaw-dashboard-publish.log" 2>&1
