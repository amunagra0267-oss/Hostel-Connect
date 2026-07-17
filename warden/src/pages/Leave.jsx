import { useState } from 'react'

const INITIAL = [
  { id: 'L-551', student: 'Kabir Singh', room: 'C-210', dates: '12 – 14 Jul', reason: 'Family function', location: 'Home, Kurukshetra', status: 'pending' },
  { id: 'L-550', student: 'Dev Kumar', room: 'C-115', dates: '10 – 11 Jul', reason: 'Medical checkup', location: 'City Hospital', status: 'approved' },
  { id: 'L-549', student: 'Yash Gupta', room: 'C-220', dates: '8 – 9 Jul', reason: 'Personal', location: 'Relative House', status: 'rejected' },
]

export default function Leave() {
  const [requests, setRequests] = useState(INITIAL)

  function setStatus(id, status) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Leave Requests</h2>
          <p>Approve or reject outgoing leave applications.</p>
        </div>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Location</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.student}</td>
                <td>{r.room}</td>
                <td>{r.dates}</td>
                <td>{r.reason}</td>
                <td>{r.location}</td>
                <td><span className={'pill ' + r.status}>{r.status}</span></td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-gold"
                    disabled={r.status !== 'pending'}
                    onClick={() => setStatus(r.id, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline"
                    disabled={r.status !== 'pending'}
                    onClick={() => setStatus(r.id, 'rejected')}
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
