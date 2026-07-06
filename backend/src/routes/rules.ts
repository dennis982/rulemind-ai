import { Router, Request, Response } from 'express'
import * as ruleService from '../services/ruleService.js'
import authMiddleware from '../middleware/auth.js'

const router = Router()

// Get all rules
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const rules = await ruleService.getAllRules()
    res.json(rules)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rules' })
  }
})

// Get single rule
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const rule = await ruleService.getRuleById(parseInt(req.params.id))
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' })
    }
    res.json(rule)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rule' })
  }
})

// Create rule
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, condition, action, status } = req.body
    const rule = await ruleService.createRule({ name, condition, action, status })
    res.status(201).json(rule)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rule' })
  }
})

// Update rule
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const rule = await ruleService.updateRule(parseInt(req.params.id), req.body)
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' })
    }
    res.json(rule)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rule' })
  }
})

// Delete rule
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const deleted = await ruleService.deleteRule(parseInt(req.params.id))
    if (!deleted) {
      return res.status(404).json({ error: 'Rule not found' })
    }
    res.json({ message: 'Rule deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete rule' })
  }
})

export default router
