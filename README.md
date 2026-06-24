# Module 2 Lab — Student & Class Onboarding

Hands-on lab aligned with **Module 2 theory: Interaction Modes — All Methods**.

Build `POST /students` and `POST /classes` with Express, Vitest, and GitHub Copilot.

**Reference branch:** `feature/module-2/solution` (all 15 tests pass)

---

## Learning goals (Module 2 practice)

From the course **Practice with Copilot** unit:

1. **Practice all interaction modes**
2. **Generate and review suggestions**
3. **Create tests with Copilot**
4. **Validate output quality**

---

## Business context

A school launches a teacher portal. Teachers register students and classes without spreadsheets.

**Example payload:**

```json
{
  "student": {
    "studentId": "STD-3007",
    "fullName": "Sara Idrissi",
    "email": "sara.idrissi@school.edu"
  },
  "class": {
    "classCode": "MATH-8A",
    "teacher": "Mr. Karim",
    "room": "B12"
  }
}
```

**Expected API behaviour:**

| Case | Status | Body |
|------|--------|------|
| Valid create | 201 | Created object |
| Invalid payload | 400 | `{ "error": "..." }` |
| Duplicate id/code | 409 | `{ "error": "..." }` |

---

## Setup

```bash
git clone https://github.com/HansLanda14ib/github-formation.git
cd github-formation
git checkout feature/module-2/solution
cd labs/module-2
npm install
npm test
```

---

## Project layout

```
labs/module-2/
├── src/
│   ├── app.js                 # Express app (health + routes)
│   ├── validators.js          # Step 1
│   ├── routes/
│   │   ├── students.js        # Step 2–4
│   │   └── classes.js         # Step 3–4
│   ├── middleware/errors.js   # Unified { error } format
│   └── store.js               # In-memory store (provided)
├── tests/
│   ├── step-00-intro.test.js
│   ├── step-01-schemas.test.js
│   ├── step-02-student-route.test.js
│   ├── step-03-class-route.test.js
│   ├── step-04-duplicate-errors.test.js
│   └── step-05-integration.test.js
└── LAB-NOTES.md               # Your Copilot reflections (step 5)
```

---

## Interaction modes — theory recap

From **Module 2 — Interaction Modes — All Methods**:

| Mode | Description | Lab usage |
|------|-------------|-----------|
| **Inline Suggestions** | Real-time completions as you type | Imports, Express boilerplate, repetitive lines |
| **Command Palette** | Quick Copilot access via keyboard | Open Chat, generate tests, run tasks |
| **Copilot Chat** | Side-panel natural language chat | Multi-file tasks (mirror students → classes) |
| **Inline Chat** | In-editor chat `Ctrl+I` / `Cmd+I` | Single-file logic (validators, route handler) |
| **Slash Commands** | `/explain`, `/suggest`, `/tests`, `/comment` | Understand, improve, test, document |
| **Comments to Code** | NL comment → implementation | `@copilot-context` above empty functions |
| **Automated Test Generation** | Select code → palette → generate tests | Extra tests beyond provided Vitest suite |

### Keyboard shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Inline Chat | `Ctrl+I` | `Cmd+I` |
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Accept suggestion | `Tab` | `Tab` |
| Next suggestion | `Alt+]` | `Option+]` |

### Slash commands (Copilot Chat)

```
/explain   — What does this function return and why?
/suggest   — How can I improve this error handling?
/tests     — Generate unit tests for validateStudent edge cases
/comment   — Add JSDoc to this route handler
```

---

## Quality validation (every step)

Before moving on:

- [ ] `npm test -- tests/step-XX-....test.js` passes
- [ ] Every suggestion was **reviewed** (no blind Accept All)
- [ ] Error strings match tests **exactly**
- [ ] Imports are correct; no unused Copilot artifacts
- [ ] Responses use project patterns: `sendError`, `{ valid, data }`

---

## Step-by-step: exercise + Copilot mode + solution

Work live: clear code → use assigned mode → test → compare with solution below.

---

### Step 0 — Setup & Command Palette

**Copilot mode:** Command Palette  
**Test:** `npm test -- tests/step-00-intro.test.js`

#### Exercise

1. `Ctrl+Shift+P` / `Cmd+Shift+P` → open terminal
2. `npm install` && `npm test -- tests/step-00-intro.test.js`
3. Command Palette → **Copilot: Open Chat** → *“Explain this lab folder structure”*

#### Solution — `src/app.js`

```js
import express from 'express'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  return app
}
```

---

### Step 1 — Validators (Comments to Code + Inline Chat)

**Copilot modes:** Comments to Code, Inline Chat, Inline Suggestions  
**Test:** `npm test -- tests/step-01-schemas.test.js`

#### Exercise

1. Clear function bodies in `src/validators.js`
2. Add context comment:

```js
/**
 * @copilot-context
 * validateStudent: require studentId, fullName, email; validate email.
 * validateClass: require classCode, teacher; room optional.
 * Return { valid: true, data } or { valid: false, error: string }.
 * Tests: tests/step-01-schemas.test.js
 */
```

3. **Comments to Code:** type signatures; accept inline suggestions one line at a time
4. **Inline Chat** (`Cmd+I`): *“Complete both validators matching the comment and tests”*

#### One-shot prompt

> Implement validateStudent and validateClass. Missing fields → error with "Missing".
> Invalid email → error with "email". Success → { valid: true, data: object }.

#### Solution — `src/validators.js`

```js
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function missingFields(payload, fields) {
  const missing = fields.filter((field) => !payload?.[field])
  if (missing.length === 0) return null
  return `Missing required fields: ${missing.join(', ')}`
}

export function validateStudent(payload) {
  const missing = missingFields(payload, ['studentId', 'fullName', 'email'])
  if (missing) return { valid: false, error: missing }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return { valid: false, error: 'Invalid email format' }
  }

  return {
    valid: true,
    data: {
      studentId: payload.studentId,
      fullName: payload.fullName,
      email: payload.email,
    },
  }
}

export function validateClass(payload) {
  const missing = missingFields(payload, ['classCode', 'teacher'])
  if (missing) return { valid: false, error: missing }

  return {
    valid: true,
    data: {
      classCode: payload.classCode,
      teacher: payload.teacher,
      ...(payload.room ? { room: payload.room } : {}),
    },
  }
}
```

---

### Step 2 — POST /students (Inline Chat + Inline Suggestions)

**Copilot modes:** Inline Chat, Inline Suggestions  
**Test:** `npm test -- tests/step-02-student-route.test.js`

#### Exercise

1. Implement `src/routes/students.js` with **Inline Chat**
2. Use **Inline Suggestions** for imports and `app.use('/students', ...)`
3. Wire router in `src/app.js`

#### One-shot prompt

> POST /students: validateStudent(req.body), 400 { error } if invalid,
> 201 + JSON on success. Use sendError and saveStudent.

#### Solution — `src/routes/students.js`

```js
import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { hasStudent, saveStudent } from '../store.js'
import { validateStudent } from '../validators.js'

const router = Router()

router.post('/', (req, res) => {
  const validation = validateStudent(req.body)

  if (!validation.valid) {
    return sendError(res, 400, validation.error)
  }

  if (hasStudent(validation.data.studentId)) {
    return sendError(res, 409, 'Student already exists')
  }

  const created = saveStudent(validation.data)
  return res.status(201).json(created)
})

export default router
```

#### Solution — `src/app.js` (add students router)

```js
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
```

> **Note:** Step 2 tests do not require 409 yet — but full solution includes it for step 4.

---

### Step 3 — POST /classes (Copilot Chat)

**Copilot mode:** Copilot Chat (side panel)  
**Test:** `npm test -- tests/step-03-class-route.test.js`

#### Exercise

1. Open **Copilot Chat** with `@workspace`
2. Review each file diff before accepting

#### One-shot prompt (Chat)

> Mirror src/routes/students.js for POST /classes using validateClass, saveClass, hasClass.
> Mount /classes in app.js. Match tests/step-03-class-route.test.js.

#### Solution — `src/routes/classes.js`

```js
import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { hasClass, saveClass } from '../store.js'
import { validateClass } from '../validators.js'

const router = Router()

router.post('/', (req, res) => {
  const validation = validateClass(req.body)

  if (!validation.valid) {
    return sendError(res, 400, validation.error)
  }

  if (hasClass(validation.data.classCode)) {
    return sendError(res, 409, 'Class already exists')
  }

  const created = saveClass(validation.data)
  return res.status(201).json(created)
})

export default router
```

#### Solution — `src/app.js` (full)

```js
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
```

---

### Step 4 — Duplicates & unified errors (/explain + /suggest)

**Copilot modes:** Slash `/explain`, `/suggest`  
**Test:** `npm test -- tests/step-04-duplicate-errors.test.js`

#### Exercise

1. Select POST handler → **`/explain`**
2. **`/suggest`** — add 409 with exact messages
3. **`/explain`** `sendError` — confirm `{ error: string }` only

#### Exact messages required by tests

- `'Student already exists'`
- `'Class already exists'`

#### Solution — `src/middleware/errors.js`

```js
export function errorBody(message) {
  return { error: message }
}

export function sendError(res, status, message) {
  return res.status(status).json(errorBody(message))
}
```

Duplicate guards are in the route files (see step 2–3 solutions above).

---

### Step 5 — Tests, quality & LAB-NOTES (/tests + Generate Tests)

**Copilot modes:** `/tests`, `/comment`, Command Palette → Generate Tests  
**Test:** `npm test` (all 15)

#### Exercise

1. Select `validateStudent` → Command Palette → **Copilot: Generate Tests**
2. Chat: **`/comment`** on `createApp`
3. Complete `LAB-NOTES.md` — which mode worked best per step
4. Review generated tests; delete hallucinated APIs

#### Solution checklist

- [ ] 6 test files, 15 tests pass
- [ ] `LAB-NOTES.md` filled in
- [ ] You documented manual fixes after Copilot

---

## Test commands quick reference

| Step | Command |
|------|---------|
| 0 | `npm test -- tests/step-00-intro.test.js` |
| 1 | `npm test -- tests/step-01-schemas.test.js` |
| 2 | `npm test -- tests/step-02-student-route.test.js` |
| 3 | `npm test -- tests/step-03-class-route.test.js` |
| 4 | `npm test -- tests/step-04-duplicate-errors.test.js` |
| 5 | `npm test` |

---

## Mode × step summary

| Step | Topic | Primary Copilot mode |
|------|-------|----------------------|
| 0 | Setup | Command Palette |
| 1 | Validators | Comments to Code + Inline Chat |
| 2 | POST /students | Inline Chat + Inline Suggestions |
| 3 | POST /classes | Copilot Chat |
| 4 | Duplicates & errors | /explain + /suggest |
| 5 | Tests & docs | /tests + Generate Tests + /comment |

---

## Live session flow (trainer)

1. Present the **Copilot mode** for the step (theory recap above)
2. Learners implement using that mode only
3. Run the step test together
4. **Validate quality** (checklist above)
5. Reveal **solution** section from this README
6. Compare with annotated source on `feature/module-2/solution`

---

## Full reference code

All files on `feature/module-2/solution` include `@copilot-context` and `@copilot-oneshot` comments demonstrating **Comments to Code** best practice.

```bash
git checkout feature/module-2/solution
cd labs/module-2
npm test
```

Student reflections: complete [LAB-NOTES.md](./LAB-NOTES.md).
