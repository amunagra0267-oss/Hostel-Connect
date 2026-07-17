import { useState } from 'react'

const STUDENTS = [
  { id: 'S-101', name: 'Aarav Sharma', room: 'C-204', course: 'B.Tech CSE', valid: '2026-27' },
  { id: 'S-102', name: 'Ishaan Patel', room: 'C-118', course: 'B.Tech ME', valid: '2026-27' },
  { id: 'S-103', name: 'Rohan Mehta', room: 'C-306', course: 'BBA', valid: '2026-27' },
]

export default function DigitalID() {
  const [selected, setSelected] = useState(STUDENTS[0])

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Digital ID</h2>
          <p>Look up a resident's hostel ID card.</p>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '260px 1fr', gap: 18 }}>
        <div className="card" style={{ padding: 10 }}>
          {STUDENTS.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: s.id === selected.id ? 700 : 500,
                background: s.id === selected.id ? 'var(--gold)' : 'transparent',
                color: s.id === selected.id ? '#1a1500' : 'var(--text)',
              }}
            >
              {s.name}
            </div>
          ))}
        </div>

        <div
          className="card"
          style={{
            maxWidth: 380,
            background: 'linear-gradient(155deg, #1a1a1e, #0f0f11)',
            border: '1px solid var(--gold)',
          }}
        >
          <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '0.85rem', marginBottom: 4 }}>
            HostelConnect
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>
            Geeta University · Resident ID
          </div>
          <div className="avatar-circle" style={{ width: 56, height: 56, fontSize: '1.2rem', marginBottom: 14 }}>
            {selected.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{selected.name}</div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', marginBottom: 14 }}>{selected.course}</div>
          <div className="row-line"><div>ID</div><div>{selected.id}</div></div>
          <div className="row-line"><div>Room</div><div>{selected.room}</div></div>
          <div className="row-line"><div>Valid Thru</div><div>{selected.valid}</div></div>
        </div>
      </div>
    </>
  )
}
