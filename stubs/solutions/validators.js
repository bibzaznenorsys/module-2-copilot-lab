const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function missingFields(payload, fields) {
  const missing = fields.filter((field) => !payload?.[field])
  if (missing.length === 0) return null
  return `Missing required fields: ${missing.join(', ')}`
}

export function validateStudent(payload) {
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

export function validateClass(payload) {
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
