import { Link, useLocation } from 'react-router-dom'
import { Home, GitBranch, MessageSquare, FileText, Settings } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/rules', label: 'Rule Builder', icon: GitBranch },
  { path: '/chat', label: 'Chat & Inference', icon: MessageSquare },
  { path: '/audit', label: 'Audit Log', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-800 p-6 overflow-y-auto">
      <nav className="space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-accent-blue text-white shadow-glow-blue'
                  : 'text-dark-400 hover:bg-dark-800 hover:text-dark-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
