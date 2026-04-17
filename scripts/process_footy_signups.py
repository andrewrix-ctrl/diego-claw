#!/usr/bin/env python3
import csv
import io
import json
import subprocess
from datetime import datetime, timezone

SHEET_ID = "1NkZ8KMEDGVGTigZjsGGzlwfDFHPRQpOhWJ6XZNV6uZ8"
SHEET_RANGE = "Sheet1!A:G"
CC_EMAIL = "andrew.rix@fujitsu.com"
SITE_LINK = "https://andrewrix-ctrl.github.io/diego-claw/projects/nrl-footy-tipping/"


def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{p.stderr.strip()}")
    return p.stdout


def ensure_headers(rows):
    expected = ["Timestamp", "Name", "Email", "Favourite Team", "Source Page", "Welcome Status", "Welcome Sent At"]
    current = rows[0] if rows else []
    if current[:7] != expected:
        run([
            "gog", "sheets", "update", SHEET_ID, "Sheet1!A1:G1",
            "--values-json", json.dumps([expected])
        ])


def get_rows():
    out = run(["gog", "sheets", "get", SHEET_ID, SHEET_RANGE, "--plain"])
    reader = csv.reader(io.StringIO(out), delimiter="\t")
    return list(reader)


def send_welcome(name, email, team):
    subject = "Welcome to Diego’s NRL Footy Tipping 🏉"
    html = (
        f"<html><body><h2>Welcome to Diego’s NRL Footy Tipping 🏉</h2>"
        f"<p>Hey {name},</p>"
        f"<p>You’re officially in!</p>"
        f"<p><strong>Favourite team:</strong> {team}</p>"
        f"<p>You’ll receive weekly tipping links and round wrap-ups.</p>"
        f"<p>You can always check the latest here: <a href='{SITE_LINK}'>{SITE_LINK}</a></p>"
        f"<p>Regards,<br>Diego Claw (Drew's footy tipping assistant) 🤖🦞</p>"
        f"</body></html>"
    )

    run([
        "gog", "gmail", "send",
        f"--to={email}",
        f"--cc={CC_EMAIL}",
        f"--subject={subject}",
        f"--body-html={html}"
    ])


def mark_row(row_num, status, sent_at=""):
    run([
        "gog", "sheets", "update", SHEET_ID, f"Sheet1!F{row_num}:G{row_num}",
        "--values-json", json.dumps([[status, sent_at]])
    ])


def main():
    rows = get_rows()
    if not rows:
        ensure_headers(rows)
        rows = get_rows()
    ensure_headers(rows)
    rows = get_rows()

    sent = 0
    failed = 0

    for i, row in enumerate(rows[1:], start=2):
        padded = row + [""] * (7 - len(row))
        _, name, email, team, _, status, _ = padded[:7]

        if not email.strip() or not name.strip() or not team.strip():
            continue
        if status.strip():
            continue

        try:
            send_welcome(name.strip(), email.strip(), team.strip())
            ts = datetime.now(timezone.utc).isoformat()
            mark_row(i, "SENT", ts)
            sent += 1
        except Exception:
            mark_row(i, "ERROR")
            failed += 1

    print(json.dumps({"ok": True, "sent": sent, "failed": failed}))


if __name__ == "__main__":
    main()
