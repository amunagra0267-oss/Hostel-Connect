import { useMemo, useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const STUDENTS = [
  { id: 'S-101', name: 'Aarav Sharma', room: 'C-204', course: 'B.Tech CSE', phone: '98xxxxxx01' },
  { id: 'S-102', name: 'Ishaan Patel', room: 'C-118', course: 'B.Tech ME', phone: '98xxxxxx02' },
  { id: 'S-103', name: 'Rohan Mehta', room: 'C-306', course: 'BBA', phone: '98xxxxxx03' },
  { id: 'S-104', name: 'Kabir Singh', room: 'C-210', course: 'B.Tech ECE', phone: '98xxxxxx04' },
  { id: 'S-105', name: 'Dev Kumar', room: 'C-115', course: 'B.Com', phone: '98xxxxxx05' },
  { id: 'S-106', name: 'Yash Gupta', room: 'C-220', course: 'B.Tech CSE', phone: '98xxxxxx06' },
]

export default function Students() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [students, setStudents] = useState(STUDENTS)
  const [form, setForm] = useState({ id: '', name: '', room: '', course: '', phone: '' })

  useEffect(() => {
    const stored = localStorage.getItem('students_list')
    if (stored) setStudents(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('students_list', JSON.stringify(students))
  }, [students])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return students
    return students.filter(
      (s) => s.name.toLowerCase().includes(q) || s.room.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    )
  }, [query, students])

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Students</h2>
          <p>{STUDENTS.length} residents in your hostel block.</p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, room or ID…"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '10px 14px',
            borderRadius: 10,
            fontSize: '0.85rem',
            width: 260,
          }}
        />
        {user?.role && user.role.toLowerCase().includes('warden') && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <input placeholder="ID" value={form.id} onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))} />
            <input placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <input placeholder="Room" value={form.room} onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))} />
            <input placeholder="Course" value={form.course} onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))} />
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            <button
              className="btn btn-gold"
              onClick={() => {
                if (!form.id || !form.name) return
                setStudents((s) => [form, ...s])
                setForm({ id: '', name: '', room: '', course: '', phone: '' })
              }}
            >Add Student</button>
          </div>
        )}

      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Course</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.room}</td>
                <td>{s.course}</td>
                <td>{s.phone}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ color: 'var(--text-dim)' }}>No students match "{query}".</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
