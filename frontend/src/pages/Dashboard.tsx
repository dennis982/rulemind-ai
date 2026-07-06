import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const data = [
  { name: 'Mon', rules: 24, alerts: 12, compliance: 78 },
  { name: 'Tue', rules: 31, alerts: 19, compliance: 85 },
  { name: 'Wed', rules: 28, alerts: 14, compliance: 82 },
  { name: 'Thu', rules: 35, alerts: 22, compliance: 88 },
  { name: 'Fri', rules: 42, alerts: 28, compliance: 92 },
  { name: 'Sat', rules: 18, alerts: 9, compliance: 75 },
  { name: 'Sun', rules: 22, alerts: 11, compliance: 80 },
]

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Executive Dashboard</h2>
        <p className="text-dark-400">Real-time system performance and compliance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Rules', value: '1,247', trend: '+12%' },
          { label: 'Compliance Score', value: '94.2%', trend: '+3.1%' },
          { label: 'Decisions Today', value: '342', trend: '+28%' },
          { label: 'System Uptime', value: '99.97%', trend: 'Stable' },
        ].map((kpi, i) => (
          <div key={i} className="card">
            <p className="text-dark-400 text-sm font-medium mb-2">{kpi.label}</p>
            <p className="text-3xl font-bold mb-2">{kpi.value}</p>
            <p className="text-accent-emerald text-sm">{kpi.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
              <Legend />
              <Bar dataKey="rules" fill="#3b82f6" />
              <Bar dataKey="alerts" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Compliance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4b5563' }} />
              <Legend />
              <Line type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Decisions */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Recent Decisions</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
              <div>
                <p className="font-medium">Transaction #TXN-{1000 + i}</p>
                <p className="text-sm text-dark-400">Rule #42 Triggered - High Risk Audit</p>
              </div>
              <span className="badge badge-warning">Pending Review</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
