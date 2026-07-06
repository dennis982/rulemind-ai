import pool from '../config/database.js'
import { Rule } from '../types/index.js'

export const getAllRules = async (): Promise<Rule[]> => {
  const result = await pool.query('SELECT * FROM rules ORDER BY created_at DESC')
  return result.rows
}

export const getRuleById = async (id: number): Promise<Rule | null> => {
  const result = await pool.query('SELECT * FROM rules WHERE id = $1', [id])
  return result.rows[0] || null
}

export const createRule = async (rule: Omit<Rule, 'id' | 'createdAt' | 'updatedAt'>): Promise<Rule> => {
  const result = await pool.query(
    'INSERT INTO rules (name, condition, action, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [rule.name, rule.condition, rule.action, rule.status]
  )
  return result.rows[0]
}

export const updateRule = async (id: number, updates: Partial<Rule>): Promise<Rule | null> => {
  const result = await pool.query(
    'UPDATE rules SET name = COALESCE($1, name), condition = COALESCE($2, condition), action = COALESCE($3, action), status = COALESCE($4, status), updated_at = NOW() WHERE id = $5 RETURNING *',
    [updates.name, updates.condition, updates.action, updates.status, id]
  )
  return result.rows[0] || null
}

export const deleteRule = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM rules WHERE id = $1', [id])
  return result.rowCount! > 0
}
