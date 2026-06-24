/**
 * @copilot-context
 * Express app factory for Module 2 lab — used by supertest in all step tests.
 * Wire routes added incrementally: health (step 0), /students (step 2), /classes (step 3).
 */
import express from 'express'
import classesRouter from './routes/classes.js'
import studentsRouter from './routes/students.js'

export const createApp = () => {
  const app = express()
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', module: 2 })
  })

  app.use('/students', studentsRouter)
  app.use('/classes', classesRouter)

  return app
}
