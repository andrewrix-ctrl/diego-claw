#!/bin/zsh
set -euo pipefail

PORT="${1:-8123}"
WORKSPACE_ROOT="/Users/diego/.openclaw/workspace"
SITE_PATH="/diego-claw/"

cd "$WORKSPACE_ROOT"

echo "Previewing Diego Claw at http://localhost:${PORT}${SITE_PATH}"
echo "Serving from $WORKSPACE_ROOT so /diego-claw/... absolute paths resolve correctly."
python3 -m http.server "$PORT"
