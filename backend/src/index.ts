import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import ruleRoutes from './routes/rules.js'
import inferenceRoutes from './routes/inference.js'
import auditRoutes from './routes/audit.js'
import authRoutes from './routes/auth.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/rules', ruleRoutes)
app.use('/api/inference', inferenceRoutes)
app.use('/api/audit', auditRoutes)

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'operational', timestamp: new Date().toISOString() })
})

// Error handling
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 RuleMind AI Backend running on port ${PORT}`)
  console.log(`📚 Proprietary | Dennis Yaotse`)
})

export default app
