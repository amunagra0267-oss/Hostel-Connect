import { Link } from 'react-router-dom'

const STATS = [
  { label: 'Total Residents', value: 342, tone: '' },
  { label: 'Open Complaints', value: 14, tone: 'danger' },
  { label: 'Pending Leave', value: 7, tone: 'gold' },
  { label: "Today's Attendance", value: '94%', tone: 'success' },
]

const RECENT_COMPLAINTS = [
  { id: 'C-2041', student: 'Aarav Sharma', room: 'C-204', issue: 'Water leakage', status: 'progress' },
  { id: 'C-2040', student: 'Ishaan Patel', room: 'C-118', issue: 'Broken window', status: 'pending' },
  { id: 'C-2039', student: 'Rohan Mehta', room: 'C-306', issue: 'WiFi not working', status: 'resolved' },
]

const LEAVE_REQUESTS = [
  { id: 'L-551', student: 'Kabir Singh', room: 'C-210', dates: '12–14 Jul', status: 'pending' },
  { id: 'L-550', student: 'Dev Kumar', room: 'C-115', dates: '10–11 Jul', status: 'approved' },
]

export default function Dashboard() {
  return (
    <>
      <div className="page-header">
        <div>
          <h2>Overview</h2>
          <p>A quick look at what needs your attention today.</p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 22 }}>
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className={'stat-value' + (s.tone ? ' ' + s.tone : '')}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            Recent Complaints
            <Link to="/dashboard/complaints" style={{ color: 'var(--gold)', fontSize: '0.78rem' }}>View all</Link>
          </div>
          {RECENT_COMPLAINTS.map((c) => (
            <div className="row-line" key={c.id}>
              <div>
                <div>{c.student} &middot; {c.room}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>{c.issue}</div>
              </div>
              <span className={'pill ' + c.status}>{c.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            Leave Requests
            <Link to="/dashboard/leave" style={{ color: 'var(--gold)', fontSize: '0.78rem' }}>View all</Link>
          </div>
          {LEAVE_REQUESTS.map((l) => (
            <div className="row-line" key={l.id}>
              <div>
                <div>{l.student} &middot; {l.room}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>{l.dates}</div>
              </div>
              <span className={'pill ' + l.status}>{l.status}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Today's Mess Menu</div>
          <div className="row-line"><div>Breakfast</div><div style={{ color: 'var(--text-dim)' }}>Poha + Tea</div></div>
          <div className="row-line"><div>Lunch</div><div style={{ color: 'var(--text-dim)' }}>Dal Rice Roti</div></div>
          <div className="row-line"><div>Snacks</div><div style={{ color: 'var(--text-dim)' }}>Sandwich</div></div>
          <div className="row-line"><div>Dinner</div><div style={{ color: 'var(--text-dim)' }}>Paneer + Naan</div></div>
        </div>

        <div className="card">
          <div className="card-title">Upcoming Meeting</div>
          <div className="row-line"><div>Monthly Hostel Meeting</div></div>
          <div className="row-line"><div>Date</div><div style={{ color: 'var(--text-dim)' }}>5 July, 5:00 PM</div></div>
          <div className="row-line"><div>Venue</div><div style={{ color: 'var(--text-dim)' }}>Hostel Auditorium</div></div>
        </div>
      </div>
    </>
  )
}
