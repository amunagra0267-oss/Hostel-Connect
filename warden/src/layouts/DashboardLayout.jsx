import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={"app-shell" + (sidebarOpen ? ' sidebar-open' : '')}>
      <Sidebar />
      <div className="main-area">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              className="hamburger-btn"
              aria-label="Toggle menu"
              onClick={() => setSidebarOpen((s) => !s)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div className="topbar-title">
              <h1>Hostel Warden Portal</h1>
              <p>{today} &middot; {user?.hostel}</p>
            </div>
          </div>
          <div className="topbar-right">
            <button className="bell-btn" aria-label="Notifications" onClick={() => navigate('/dashboard/notifications')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" />
                <path d="M10 19a2 2 0 0 0 4 0" />
              </svg>
              <span className="dot">3</span>
            </button>
            <button className="icon-logout" title="Logout" onClick={logout}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
            </button>
            <div className="avatar-chip">
              <div className="avatar-circle">{user ? initials(user.name) : 'W'}</div>
              <div className="who">
                <div className="name">{user?.name}</div>
                <div className="role">{user?.role}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
