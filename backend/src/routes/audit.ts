import { Router, Request, Response } from 'express'
import * as auditService from '../services/auditService.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

// Get audit entries
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100
    const offset = parseInt(req.query.offset as string) || 0
    const entries = await auditService.getAuditEntries(limit, offset)
    res.json(entries)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit entries' })
  }
})

// Get audit statistics
router.get('/stats', authMiddleware, async (req: Request, res: Response) => {
  try {
    const stats = await auditService.getAuditStats()
    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit stats' })
  }
})

export default router
