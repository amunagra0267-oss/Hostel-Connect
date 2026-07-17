import { useEffect, useState } from 'react'

const INITIAL = [
  { id: 'C-2041', student: 'Aarav Sharma', room: 'C-204', issue: 'Water leakage in bathroom', created: '2 Jul', status: 'progress', assigned: '' },
  { id: 'C-2040', student: 'Ishaan Patel', room: 'C-118', issue: 'Broken window latch', created: '3 Jul', status: 'pending', assigned: '' },
  { id: 'C-2039', student: 'Rohan Mehta', room: 'C-306', issue: 'WiFi not working', created: '4 Jul', status: 'resolved', assigned: '' },
  { id: 'C-2038', student: 'Yash Gupta', room: 'C-220', issue: 'Noisy corridor light', created: '5 Jul', status: 'pending', assigned: '' },
]

const NEXT_STATUS = { pending: 'progress', progress: 'resolved', resolved: 'resolved' }
const NEXT_LABEL = { pending: 'Start progress', progress: 'Mark resolved', resolved: 'Resolved' }

export default function Complaints() {
  const [complaints, setComplaints] = useState(INITIAL)

  useEffect(() => {
    const stored = localStorage.getItem('complaints_list')
    if (stored) setComplaints(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('complaints_list', JSON.stringify(complaints))
  }, [complaints])

  function advance(id) {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: NEXT_STATUS[c.status] } : c))
    )
  }

  function assignWorker(id, name) {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, assigned: name } : c)))
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Complaints</h2>
          <p>Track and update maintenance and resident complaints.</p>
        </div>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Room</th>
              <th>Issue</th>
              <th>Created</th>
              <th>Status</th>
              <th>Worker</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.student}</td>
                <td>{c.room}</td>
                <td>{c.issue}</td>
                <td>{c.created}</td>
                <td><span className={'pill ' + c.status}>{c.status}</span></td>
                <td>
                  <input value={c.assigned || ''} onChange={(e) => assignWorker(c.id, e.target.value)} placeholder="Assign worker" style={{ background: 'var(--panel)', border: '1px solid var(--border)', padding: 6, borderRadius: 8 }} />
                </td>
                <td>
                  <button
                    className="btn btn-outline"
                    disabled={c.status === 'resolved'}
                    onClick={() => advance(c.id)}
                  >
                    {NEXT_LABEL[c.status]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
