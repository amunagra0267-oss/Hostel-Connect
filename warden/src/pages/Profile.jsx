import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [wardenNumber, setWardenNumber] = useState(user?.wardenNumber || '')

  return (
    <>
      <div className="page-header">
        <div>
          <h2>My Profile</h2>
          <p>Your warden account details.</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        <div className="avatar-circle" style={{ width: 56, height: 56, fontSize: '1.2rem', marginBottom: 16 }}>
          {user?.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
        </div>
        <div className="row-line"><div>Name</div><div>{user?.name}</div></div>
        <div className="row-line"><div>Email</div><div>{user?.email}</div></div>
        <div className="row-line"><div>Role</div><div>{user?.role}</div></div>
        <div className="row-line"><div>Hostel Block</div><div>{user?.hostel}</div></div>
        <div style={{ height: 12 }} />
        {!editing ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="row-line" style={{ flex: 1 }}><div>Warden No.</div><div>{user?.wardenNumber || '-'}</div></div>
            <button className="btn btn-outline" onClick={() => setEditing(true)}>Edit</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input style={{ padding: 8, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--panel)' }} value={wardenNumber} onChange={(e) => setWardenNumber(e.target.value)} placeholder="Enter warden number" />
            <button className="btn btn-gold" onClick={() => { updateProfile({ wardenNumber }); setEditing(false); }}>Save</button>
            <button className="btn btn-outline" onClick={() => { setWardenNumber(user?.wardenNumber || ''); setEditing(false); }}>Cancel</button>
          </div>
        )}
      </div>
    </>
  )
}
