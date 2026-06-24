/**
 * @copilot-context
 * Class onboarding route — POST /classes creates a class record.
 * Mirror students.js flow using validateClass and classCode as unique key.
 * Tests: tests/step-03-class-route.test.js, step-04-duplicate-errors.test.js
 */
import { Router } from 'express'
import { sendError } from '../middleware/errors.js'
import { hasClass, saveClass } from '../store.js'
import { validateClass } from '../validators.js'

const router = Router()

/**
 * @copilot-oneshot
 * POST /classes:
 * 1) validateClass(req.body) → 400 with { error } if invalid
 * 2) 409 { error: 'Class already exists' } if classCode duplicate
 * 3) 201 + created class JSON on success
 */
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
