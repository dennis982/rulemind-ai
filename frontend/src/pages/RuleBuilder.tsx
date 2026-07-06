import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

export default function RuleBuilder() {
  const [rules] = useState([
    {
      id: 1,
      name: 'High Risk Transaction',
      condition: 'Amount > $10,000 AND Location = "International"',
      action: 'Trigger: High Risk Audit',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Suspicious Pattern',
      condition: 'Transaction Count > 100 AND Timeframe = "1 hour"',
      action: 'Flag: Manual Review Required',
      status: 'Active',
    },
  ])

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Rule Builder</h2>
          <p className="text-dark-400">Create and manage business logic rules</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} /> New Rule
        </button>
      </div>

      {/* Rule Creation Form */}
      <div className="card space-y-4">
        <h3 className="text-xl font-bold">Create New Rule</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">Rule Name</label>
            <input type="text" placeholder="e.g., High Risk Transaction" className="input-field w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Condition Type</label>
              <select className="input-field w-full">
                <option>AND</option>
                <option>OR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Field</label>
              <select className="input-field w-full">
                <option>Transaction Amount</option>
                <option>User Location</option>
                <option>Transaction Count</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Operator</label>
              <select className="input-field w-full">
                <option>Greater Than (>)</option>
                <option>Less Than (<)</option>
                <option>Equals (=)</option>
                <option>Not Equals (≠)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Value</label>
              <input type="text" placeholder="10000" className="input-field w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Action (THEN)</label>
            <input type="text" placeholder="e.g., Trigger: High Risk Audit" className="input-field w-full" />
          </div>
          <button className="btn-primary w-full">Save Rule</button>
        </div>
      </div>

      {/* Rules List */}
      <div className="card space-y-4">
        <h3 className="text-xl font-bold">Active Rules ({rules.length})</h3>
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="p-4 bg-dark-800 rounded-lg border border-dark-700 hover:border-accent-blue transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-lg">{rule.name}</p>
                  <p className="text-sm text-dark-400 mt-1 font-mono">IF {rule.condition} THEN {rule.action}</p>
                </div>
                <span className="badge badge-success">{rule.status}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-dark-700 rounded transition-colors">
                  <Eye size={18} className="text-dark-400" />
                </button>
                <button className="p-2 hover:bg-dark-700 rounded transition-colors">
                  <Edit size={18} className="text-dark-400" />
                </button>
                <button className="p-2 hover:bg-dark-700 rounded transition-colors">
                  <Trash2 size={18} className="text-accent-red" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
