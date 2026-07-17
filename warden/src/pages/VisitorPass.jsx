import { useState } from 'react'

const INITIAL = [
  { id: 'V-330', student: 'Aarav Sharma', room: 'C-204', visitor: 'Suresh Sharma (Father)', date: '14 Jul, 4 PM', status: 'pending' },
  { id: 'V-329', student: 'Ishaan Patel', room: 'C-118', visitor: 'Meena Patel (Mother)', date: '13 Jul, 11 AM', status: 'approved' },
]

export default function VisitorPass() {
  const [passes, setPasses] = useState(INITIAL)

  function setStatus(id, status) {
    setPasses((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Visitor Passes</h2>
          <p>Review and approve visitor entry requests.</p>
        </div>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Room</th>
              <th>Visitor</th>
              <th>Date &amp; Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {passes.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.student}</td>
                <td>{p.room}</td>
                <td>{p.visitor}</td>
                <td>{p.date}</td>
                <td><span className={'pill ' + p.status}>{p.status}</span></td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-gold"
                    disabled={p.status !== 'pending'}
                    onClick={() => setStatus(p.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline"
                    disabled={p.status !== 'pending'}
                    onClick={() => setStatus(p.id, 'rejected')}
                  >
                    Reject
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
