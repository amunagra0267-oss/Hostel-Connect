import { useState } from 'react'

const INITIAL = [
  { title: 'Water supply maintenance', body: 'Water supply will be interrupted on 15 Jul from 10 AM–1 PM for tank cleaning.', date: '13 Jul' },
  { title: 'Mess timing change', body: 'Dinner timing shifted to 8:00–9:30 PM starting this week.', date: '11 Jul' },
]

export default function Notices() {
  const [notices, setNotices] = useState(INITIAL)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function publish(e) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    setNotices((prev) => [{ title, body, date: 'Just now' }, ...prev])
    setTitle('')
    setBody('')
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Notices</h2>
          <p>Publish announcements visible to all residents.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1.3fr', gap: 18 }}>
        <form className="card" onSubmit={publish}>
          <div className="card-title">New Notice</div>
          <div className="field">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notice title" />
          </div>
          <div className="field">
            <label>Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Write the notice…"
              style={{
                width: '100%',
                background: 'var(--panel-2)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: 10,
                padding: 11,
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                resize: 'vertical',
              }}
            />
          </div>
          <button className="btn btn-gold" type="submit">Publish Notice</button>
        </form>

        <div className="card">
          <div className="card-title">Published</div>
          {notices.map((n, i) => (
            <div className="row-line" key={i} style={{ display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                <span>{n.title}</span>
                <span style={{ color: 'var(--text-dim)', fontWeight: 400, fontSize: '0.78rem' }}>{n.date}</span>
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginTop: 4 }}>{n.body}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
