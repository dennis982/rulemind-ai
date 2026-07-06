import pool from '../config/database.js'
import { AuditEntry } from '../types/index.js'

export const createAuditEntry = async (entry: Omit<AuditEntry, 'id' | 'timestamp'>): Promise<AuditEntry> => {
  const result = await pool.query(
    'INSERT INTO audit_log (scenario, triggered_rule_id, confidence, action, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [entry.scenario, entry.triggeredRuleId, entry.confidence, entry.action, entry.status]
  )
  return result.rows[0]
}

export const getAuditEntries = async (limit: number = 100, offset: number = 0): Promise<AuditEntry[]> => {
  const result = await pool.query(
    'SELECT * FROM audit_log ORDER BY timestamp DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  )
  return result.rows
}

export const getAuditStats = async () => {
  const result = await pool.query(`
    SELECT 
      COUNT(*) as total_decisions,
      COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completed,
      AVG(confidence) as avg_confidence
    FROM audit_log
  `)
  return result.rows[0]
}
