/**
 * @copilot-context
 * Unified API error envelope for Module 2 lab.
 * All 4xx/5xx responses must use { error: string } — see step-04-duplicate-errors.test.js
 */

export function errorBody(message) {
  return { error: message }
}

export function sendError(res, status, message) {
  return res.status(status).json(errorBody(message))
}
