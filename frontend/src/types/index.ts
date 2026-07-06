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
  triggeredRule: string
  confidence: number
  action: string
  status: 'Completed' | 'Pending' | 'Failed'
}

export interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  ruleTriggered?: string
  confidence?: number
}

export interface InferenceResult {
  ruleId: string
  ruleName: string
  confidence: number
  explanation: string
  action: string
}
