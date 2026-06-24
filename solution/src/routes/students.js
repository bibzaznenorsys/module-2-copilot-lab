/**
 * @copilot-context
 * Student onboarding route — POST /students creates a student record.
 * Dependencies: validateStudent (step 1), in-memory store, unified sendError helper.
 * Tests: tests/step-02-student-route.test.js, step-04-duplicate-errors.test.js
 */
import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { hasStudent, saveStudent } from '../store.js'
import { validateStudent } from '../validators.js'

const router = Router()

/**
 * @copilot-oneshot
 * POST /students:
 * 1) validateStudent(req.body) → 400 with { error } if invalid
 * 2) 409 { error: 'Student already exists' } if studentId duplicate
 * 3) 201 + created student JSON on success
 */
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
