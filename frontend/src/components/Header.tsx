import { Settings, Bell, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-dark-900 border-b border-dark-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-accent-blue to-accent-emerald rounded-lg"></div>
        <div>
          <h1 className="text-lg font-bold text-dark-50">RuleMind AI</h1>
          <p className="text-xs text-dark-400">Proprietary | Dennis Yaotse</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
          <Bell size={20} className="text-dark-400" />
        </button>
        <Link to="/settings" className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
          <Settings size={20} className="text-dark-400" />
        </Link>
        <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors">
          <LogOut size={20} className="text-dark-400" />
        </button>
      </div>
    </header>
  )
}
