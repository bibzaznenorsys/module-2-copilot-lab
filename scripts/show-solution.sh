#!/usr/bin/env bash
# Copy full reference solution from solution/ into src/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

cp solution/src/app.js solution/src/validators.js src/
cp solution/src/routes/*.js src/routes/
cp solution/src/middleware/errors.js src/middleware/errors.js

echo "→ Full solution copied to src/"
echo "  Run: npm test"
