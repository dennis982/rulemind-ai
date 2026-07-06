import { Download, Filter } from 'lucide-react'

export default function AuditLog() {
  const auditEntries = [
    {
      timestamp: '2024-07-06 14:32:15',
      scenario: 'Transaction: $15,000 from London',
      triggeredRule: 'Rule #42',
      confidence: '98.5%',
      action: 'Flag: High Risk Audit',
      status: 'Completed',
    },
    {
      timestamp: '2024-07-06 14:15:42',
      scenario: 'User: John Doe, 50 transactions in 1 hour',
      triggeredRule: 'Rule #15',
      confidence: '87.3%',
      action: 'Manual Review Required',
      status: 'Pending',
    },
    {
      timestamp: '2024-07-06 13:58:21',
      scenario: 'Account balance dropped 60% overnight',
      triggeredRule: 'Rule #28',
      confidence: '92.1%',
      action: 'Alert: Possible Fraud',
      status: 'Completed',
    },
  ]

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Audit Log</h2>
          <p className="text-dark-400">Immutable decision ledger - 100% explainability</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2">
            <Filter size={18} /> Filter
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Decisions', value: '1,247' },
          { label: 'Rules Triggered', value: '487' },
          { label: 'Avg Confidence', value: '91.2%' },
          { label: 'Review Rate', value: '12.3%' },
        ].map((stat, i) => (
          <div key={i} className="card text-center">
            <p className="text-dark-400 text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Audit Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-dark-700">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Timestamp</th>
              <th className="px-4 py-3 text-left font-bold">Input Scenario</th>
              <th className="px-4 py-3 text-left font-bold">Triggered Rule</th>
              <th className="px-4 py-3 text-left font-bold">Confidence</th>
              <th className="px-4 py-3 text-left font-bold">Action Taken</th>
              <th className="px-4 py-3 text-left font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {auditEntries.map((entry, i) => (
              <tr key={i} className="border-b border-dark-800 hover:bg-dark-800 transition-colors">
                <td className="px-4 py-3 font-mono text-xs">{entry.timestamp}</td>
                <td className="px-4 py-3">{entry.scenario}</td>
                <td className="px-4 py-3 font-bold text-accent-blue">{entry.triggeredRule}</td>
                <td className="px-4 py-3">
                  <span className="badge bg-accent-emerald/20 text-accent-emerald">{entry.confidence}</span>
                </td>
                <td className="px-4 py-3 text-sm">{entry.action}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${
                    entry.status === 'Completed' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
