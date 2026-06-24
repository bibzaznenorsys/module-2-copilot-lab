/**
 * @copilot-context
 * Module 2 — schema validation layer for student/class onboarding.
 * Consumers: POST /students and POST /classes routes.
 * Contract: always return { valid: true, data } or { valid: false, error: string }.
 * Tests: tests/step-01-schemas.test.js
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const missingFields = (payload, fields) => {
  const missing = fields.filter((field) => !payload?.[field])
  if (missing.length === 0) return null
  return `Missing required fields: ${missing.join(', ')}`
}

/**
 * @copilot-oneshot
 * Implement validateStudent(payload):
 * - require studentId, fullName, email
 * - reject missing fields with error matching /missing/i
 * - reject bad email with error matching /email/i
 * - on success return { valid: true, data: normalized payload }
 */
export const validateStudent = (payload) => {
  const missing = missingFields(payload, ['studentId', 'fullName', 'email'])
  if (missing) {
    return { valid: false, error: missing }
  }

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

/**
 * @copilot-oneshot
 * Implement validateClass(payload):
 * - require classCode and teacher (room optional)
 * - reject missing required fields with /missing/i
 * - on success return { valid: true, data: payload subset }
 */
export const validateClass = (payload) => {
  const missing = missingFields(payload, ['classCode', 'teacher'])
  if (missing) {
    return { valid: false, error: missing }
  }

  return {
    valid: true,
    data: {
      classCode: payload.classCode,
      teacher: payload.teacher,
      ...(payload.room ? { room: payload.room } : {}),
    },
  }
}
