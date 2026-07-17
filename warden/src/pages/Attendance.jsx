import { useState } from 'react'

const INITIAL = [
  { id: 'S-101', name: 'Aarav Sharma', room: 'C-204', present: true },
  { id: 'S-102', name: 'Ishaan Patel', room: 'C-118', present: true },
  { id: 'S-103', name: 'Rohan Mehta', room: 'C-306', present: false },
  { id: 'S-104', name: 'Kabir Singh', room: 'C-210', present: true },
  { id: 'S-105', name: 'Dev Kumar', room: 'C-115', present: true },
  { id: 'S-106', name: 'Yash Gupta', room: 'C-220', present: false },
]

export default function Attendance() {
  const [list, setList] = useState(INITIAL)

  function toggle(id) {
    setList((prev) => prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s)))
  }

  const presentCount = list.filter((s) => s.present).length

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Attendance</h2>
          <p>Today &middot; {presentCount} of {list.length} present ({Math.round((presentCount / list.length) * 100)}%)</p>
        </div>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.room}</td>
                <td>
                  <span className={'pill ' + (s.present ? 'resolved' : 'rejected')}>
                    {s.present ? 'Present' : 'Absent'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline" onClick={() => toggle(s.id)}>
                    Mark {s.present ? 'absent' : 'present'}
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
