# Module 2 Copilot Lab — local playground

Standalone project. **Not linked to GitHub formation repo.**

## Quick start

```bash
cd module-2-copilot-lab
npm install
npm run step 00          # reset to step 0 starter
npm test -- tests/step-00-intro.test.js
```

## Play all steps

| Step | Reset command | Test |
|------|---------------|------|
| 0 Setup | `npm run step 00` | `npm test -- tests/step-00-intro.test.js` |
| 1 Validators | `npm run step 01` | `npm test -- tests/step-01-schemas.test.js` |
| 2 POST /students | `npm run step 02` | `npm test -- tests/step-02-student-route.test.js` |
| 3 POST /classes | `npm run step 03` | `npm test -- tests/step-03-class-route.test.js` |
| 4 Duplicates | `npm run step 04` | `npm test -- tests/step-04-duplicate-errors.test.js` |
| 5 Integration | `npm run step 05` | `npm test` |

After each step, implement with Copilot following **README.md**, then compare:

```bash
npm run solution       # copy full reference into src/
npm test               # should pass all 15 tests
npm run step 02        # go back to step 2 starter to practice again
```

Full theory, modes, and solutions: **README.md**
