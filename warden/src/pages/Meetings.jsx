import { useEffect, useState } from 'react'

const DEFAULT = [
  { title: 'Monthly Hostel Meeting', date: '5 Jul, 5:00 PM', venue: 'Hostel Auditorium', status: 'Upcoming', reason: 'Monthly updates and feedback' },
  { title: 'Mess Committee Review', date: '18 Jul, 4:00 PM', venue: 'Warden Office', status: 'Upcoming', reason: 'Discuss menu and hygiene' },
  { title: 'Fire Safety Drill Briefing', date: '2 Jul, 10:00 AM', venue: 'Block C Lawn', status: 'Completed', reason: 'Drill and safety protocols' },
]

export default function Meetings() {
  const [meetings, setMeetings] = useState(DEFAULT)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', venue: '', reason: '' })

  useEffect(() => {
    const stored = localStorage.getItem('meetings_list')
    if (stored) setMeetings(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('meetings_list', JSON.stringify(meetings))
  }, [meetings])

  function addMeeting() {
    if (!form.title || !form.date) return alert('Please provide title and date')
    setMeetings((m) => [{ ...form, status: 'Upcoming' }, ...m])
    setForm({ title: '', date: '', venue: '', reason: '' })
    setShowForm(false)
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Meetings</h2>
          <p>Scheduled and past hostel meetings.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-gold" onClick={() => setShowForm((s) => !s)}>+ Schedule Meeting</button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="field"><label>Title</label><input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></div>
          <div className="field"><label>Date / Time</label><input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} /></div>
          <div className="field"><label>Venue</label><input value={form.venue} onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))} /></div>
          <div className="field"><label>Reason</label><input value={form.reason} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} placeholder="Purpose of meeting" /></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-gold" onClick={addMeeting}>Save</button>
            <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-3">
        {meetings.map((m, idx) => (
          <div className="card" key={idx}>
            <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              {m.title}
              <span className={'pill ' + (m.status === 'Upcoming' ? 'progress' : 'resolved')}>{m.status}</span>
            </div>
            <div className="row-line"><div>Date</div><div style={{ color: 'var(--text-dim)' }}>{m.date}</div></div>
            <div className="row-line"><div>Venue</div><div style={{ color: 'var(--text-dim)' }}>{m.venue}</div></div>
            {m.reason && <div className="row-line"><div>Reason</div><div style={{ color: 'var(--text-dim)' }}>{m.reason}</div></div>}
          </div>
        ))}
      </div>
    </>
  )
}
