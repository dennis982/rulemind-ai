export interface Rule {
  id: number
  name: string
  condition: string
  action: string
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

export interface AuditEntry {
  id: number
  timestamp: string
  scenario: string
  triggeredRuleId: number
  confidence: number
  action: string
  status: 'Completed' | 'Pending' | 'Failed'
}

export interface InferenceRequest {
  scenario: string
  userId: string
}

export interface InferenceResult {
  ruleId: number
  ruleName: string
  confidence: number
  explanation: string
  action: string
}

export interface User {
  id: string
  email: string
  passwordHash: string
  role: 'admin' | 'user' | 'viewer'
  createdAt: string
}
