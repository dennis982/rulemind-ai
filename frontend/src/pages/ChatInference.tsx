import { Send, Zap } from 'lucide-react'
import { useState } from 'react'

export default function ChatInference() {
  const [messages, setMessages] = useState<Array<{ id: number; role: 'user' | 'assistant'; content: string; ruleTriggered?: string }>>([
    { id: 1, role: 'assistant', content: 'Hello! I\'m RuleMind AI. Describe a business scenario and I\'ll analyze it against our compliance rules.' },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: messages.length + 1, role: 'user', content: input }])
    setInput('')
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: prev.length + 1,
        role: 'assistant',
        content: 'Transaction flagged for high risk. Rule #42 triggered: Amount exceeds $10,000 AND international location detected.',
        ruleTriggered: 'Rule #42',
      }])
    }, 500)
  }

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Hybrid Inference Engine</h2>
        <p className="text-dark-400">Analyze scenarios with rule-based logic + AI explanations</p>
      </div>

      <div className="flex gap-6 flex-1">
        {/* Rules Panel */}
        <div className="w-64 card bg-dark-800 border-dark-700 overflow-y-auto">
          <h3 className="font-bold mb-4">Active Rules</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-2 bg-dark-700 rounded text-sm hover:bg-dark-600 cursor-pointer transition-colors">
                <p className="font-medium">Rule #{40 + i}</p>
                <p className="text-xs text-dark-400 mt-1 truncate">Amount > $10K AND Location = Intl</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex-1 flex flex-col card">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-accent-blue text-white'
                    : 'bg-dark-800 text-dark-100 border border-dark-700'
                }`}>
                  {msg.ruleTriggered && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-dark-600">
                      <Zap size={16} className="text-accent-amber" />
                      <span className="text-sm font-bold text-accent-amber">{msg.ruleTriggered}</span>
                    </div>
                  )}
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe a business scenario..."
              className="input-field flex-1"
            />
            <button onClick={handleSend} className="btn-primary px-6 flex items-center gap-2">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
