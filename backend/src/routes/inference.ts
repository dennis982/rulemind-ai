import { Router, Request, Response } from 'express'
import * as inferenceService from '../services/inferenceService.js'
import * as auditService from '../services/auditService.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { scenario } = req.body
    const result = await inferenceService.runInference({ scenario, userId: (req as any).userId })

    if (result) {
      // Log to audit trail
      await auditService.createAuditEntry({
        scenario,
        triggeredRuleId: result.ruleId,
        confidence: result.confidence,
        action: result.action,
        status: 'Completed',
      })
    }

    res.json(result || { message: 'No rules triggered' })
  } catch (error) {
    res.status(500).json({ error: 'Inference failed' })
  }
})

export default router
