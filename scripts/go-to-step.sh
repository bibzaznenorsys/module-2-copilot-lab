#!/usr/bin/env bash
# Reset src/ to the starter state for a lab step (00–05).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STEP="${1:-}"

usage() {
  echo "Usage: npm run step -- <00|01|02|03|04|05>"
  echo ""
  echo "Examples:"
  echo "  npm run step 00"
  echo "  npm run step 01"
  exit 1
}

[[ "$STEP" =~ ^0[0-5]$ ]] || usage

cd "$ROOT"

copy_base() {
  cp stubs/solutions/validators.js src/validators.js 2>/dev/null || true
  cp solution/src/middleware/errors.js src/middleware/errors.js
}

echo "→ Step $STEP starter loaded into src/"

case "$STEP" in
  00)
    cp stubs/00-intro/app.js src/app.js
    cp stubs/01-schemas/validators.js src/validators.js
    cp stubs/02-student-route/students.js src/routes/students.js
    cp stubs/03-class-route/classes.js src/routes/classes.js
    cp solution/src/middleware/errors.js src/middleware/errors.js
    ;;
  01)
    cp stubs/00-intro/app.js src/app.js
    cp stubs/01-schemas/validators.js src/validators.js
    cp stubs/02-student-route/students.js src/routes/students.js
    cp stubs/03-class-route/classes.js src/routes/classes.js
    cp solution/src/middleware/errors.js src/middleware/errors.js
    ;;
  02)
    cp stubs/solutions/validators.js src/validators.js
    cp stubs/02-student-route/students.js src/routes/students.js
    cp stubs/03-class-route/classes.js src/routes/classes.js
    cp solution/src/middleware/errors.js src/middleware/errors.js
    cat > src/app.js <<'EOF'
import express from 'express'
import studentsRouter from './routes/students.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  return app
}
EOF
    ;;
  03)
    cp stubs/solutions/validators.js src/validators.js
    cp stubs/04-duplicate-errors/students.js src/routes/students.js
    cp stubs/03-class-route/classes.js src/routes/classes.js
    cp solution/src/middleware/errors.js src/middleware/errors.js
    cat > src/app.js <<'EOF'
import express from 'express'
import classesRouter from './routes/classes.js'
import studentsRouter from './routes/students.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  app.use('/classes', classesRouter)
  return app
}
EOF
    ;;
  04)
    cp stubs/solutions/validators.js src/validators.js
    cp stubs/04-duplicate-errors/students.js src/routes/students.js
    cp stubs/04-duplicate-errors/classes.js src/routes/classes.js
    cp solution/src/middleware/errors.js src/middleware/errors.js
    cat > src/app.js <<'EOF'
import express from 'express'
import classesRouter from './routes/classes.js'
import studentsRouter from './routes/students.js'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  app.use('/classes', classesRouter)
  return app
}
EOF
    ;;
  05)
    cp stubs/solutions/validators.js src/validators.js
    cp solution/src/routes/students.js src/routes/students.js
    cp solution/src/routes/classes.js src/routes/classes.js
    cp solution/src/middleware/errors.js src/middleware/errors.js
    cp solution/src/app.js src/app.js
    cat > LAB-NOTES.md <<'EOF'
# Module 2 Lab Notes — Copilot interaction modes

Document how you used each mode during the live session.

## Goals checklist

- [ ] Practiced all interaction modes
- [ ] Generated and reviewed suggestions (no blind accept)
- [ ] Created tests with Copilot
- [ ] Validated output quality before each step

## Mode usage log

| Mode | Step used | What worked | What you fixed manually |
|------|-----------|-------------|-------------------------|
| Inline Suggestions | | | |
| Command Palette | | | |
| Copilot Chat | | | |
| Inline Chat (Cmd+I) | | | |
| Slash /explain | | | |
| Slash /suggest | | | |
| Slash /tests | | | |
| Slash /comment | | | |
| Comments to Code | | | |
| Generate Tests (palette) | | | |
EOF
    ;;
esac

case "$STEP" in
  00) echo "  Test: npm test -- tests/step-00-intro.test.js" ;;
  01) echo "  Test: npm test -- tests/step-01-schemas.test.js" ;;
  02) echo "  Test: npm test -- tests/step-02-student-route.test.js" ;;
  03) echo "  Test: npm test -- tests/step-03-class-route.test.js" ;;
  04) echo "  Test: npm test -- tests/step-04-duplicate-errors.test.js" ;;
  05) echo "  Test: npm test  (all 15)" ;;
esac
