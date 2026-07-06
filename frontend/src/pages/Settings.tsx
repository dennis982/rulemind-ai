import { Save } from 'lucide-react'

export default function Settings() {
  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <div>
        <h2 className="text-3xl font-bold mb-2">Settings</h2>
        <p className="text-dark-400">Manage application configuration and preferences</p>
      </div>

      {/* API Configuration */}
      <div className="card space-y-4">
        <h3 className="text-xl font-bold">API Configuration</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">API Base URL</label>
            <input type="text" value="http://localhost:5000" className="input-field w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">OpenAI API Key</label>
            <input type="password" placeholder="sk-..." className="input-field w-full" />
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="card space-y-4">
        <h3 className="text-xl font-bold">System Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
            <label className="font-medium">Enable Notifications</label>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
            <label className="font-medium">Auto-save Rules</label>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
            <label className="font-medium">Dark Mode</label>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Proprietary Notice */}
      <div className="card bg-dark-800 border-dark-700 space-y-3">
        <h3 className="text-lg font-bold">About RuleMind AI</h3>
        <div className="text-sm text-dark-400 space-y-2">
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Owner:</strong> Dennis Yaotse</p>
          <p><strong>Email:</strong> dennisyaotse@gmail.com</p>
          <p><strong>License:</strong> Proprietary (Closed Source)</p>
          <p><strong>Status:</strong> Premium SaaS - Authorized Enterprises Only</p>
        </div>
      </div>

      <button className="btn-primary w-full flex items-center justify-center gap-2">
        <Save size={18} /> Save Settings
      </button>
    </div>
  )
}
