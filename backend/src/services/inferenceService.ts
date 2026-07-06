import { InferenceRequest, InferenceResult } from '../types/index.js'
import { getAllRules } from './ruleService.js'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const runInference = async (req: InferenceRequest): Promise<InferenceResult | null> => {
  try {
    const rules = await getAllRules()
    const activeRules = rules.filter(r => r.status === 'Active')

    // Simple rule matching engine
    for (const rule of activeRules) {
      const matched = evaluateRule(req.scenario, rule.condition)
      if (matched) {
        // Generate AI explanation via OpenAI
        const explanation = await generateExplanation(req.scenario, rule)
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          confidence: 0.95,
          explanation,
          action: rule.action,
        }
      }
    }

    return null
  } catch (error) {
    console.error('Inference error:', error)
    throw error
  }
}

const evaluateRule = (scenario: string, condition: string): boolean => {
  // Simple keyword matching for MVP
  const keywords = condition.toLowerCase().split(' AND ').concat(condition.toLowerCase().split(' OR '))
  return keywords.some(keyword => scenario.toLowerCase().includes(keyword.replace(/[^a-z0-9]/g, '')))
}

const generateExplanation = async (scenario: string, rule: any): Promise<string> => {
  try {
    const message = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a compliance expert. Explain why a rule was triggered in 2-3 sentences.',
        },
        {
          role: 'user',
          content: `Scenario: ${scenario}\nRule: ${rule.name}\nAction: ${rule.action}`,
        },
      ],
      max_tokens: 150,
    })
    return message.choices[0].message.content || ''
  } catch (error) {
    console.error('OpenAI error:', error)
    return 'Compliance rule triggered. Manual review recommended.'
  }
}
