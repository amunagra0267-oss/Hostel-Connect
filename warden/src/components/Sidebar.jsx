import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const icon = (path) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
)

const icons = {
  dashboard: icon(<><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>),
  students: icon(<><circle cx="9" cy="7" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" /><path d="M16 4.2a3.5 3.5 0 0 1 0 6.6" /><path d="M21.5 20c0-2.9-2-5.3-4.7-6.1" /></>),
  complaints: icon(<><path d="M10.3 3.5a2 2 0 0 1 3.4 0l8.2 14.2A2 2 0 0 1 20.2 21H3.8a2 2 0 0 1-1.7-3.3z" /><path d="M12 9v4" /><path d="M12 16.5h.01" /></>),
  attendance: icon(<><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M8 3v3M16 3v3M3 9.5h18" /><path d="M8.5 14l2 2 4-4" /></>),
  leave: icon(<><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M8 3v3M16 3v3M3 9.5h18" /><path d="M9 14h6M9 17h3" /></>),
  visitor: icon(<><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="12" cy="10.5" r="2.5" /><path d="M8 16c.7-1.7 2.2-2.5 4-2.5s3.3.8 4 2.5" /></>),
  mess: icon(<><path d="M6 3v7a2 2 0 0 0 2 2h1v9" /><path d="M6 3v4M9 3v4" /><path d="M17 3c-1.7 0-3 2-3 5s1.3 5 3 5 3-2 3-5-1.3-5-3-5Z" /><path d="M17 13v8" /></>),
  meetings: icon(<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 21h10M9 18v3M15 18v3" /><path d="M7 9h10M7 12.5h6" /></>),
  notices: icon(<><path d="M4 4h16v13H8l-4 4Z" /><path d="M8 9h8M8 12.5h5" /></>),
  notifications: icon(<><path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" /><path d="M10 19a2 2 0 0 0 4 0" /></>),
  digitalid: icon(<><rect x="3" y="4.5" width="18" height="15" rx="2" /><circle cx="9" cy="10.5" r="2" /><path d="M6.5 16c.5-1.6 1.6-2.3 2.5-2.3s2 .7 2.5 2.3" /><path d="M14.5 9.5h4M14.5 12.5h4M14.5 15.5h2.5" /></>),
  profile: icon(<><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>),
  logout: icon(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>),
}

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/dashboard/students', label: 'Students', icon: 'students' },
  { to: '/dashboard/complaints', label: 'Complaints', icon: 'complaints' },
  { to: '/dashboard/attendance', label: 'Attendance', icon: 'attendance' },
  { to: '/dashboard/leave', label: 'Leave Requests', icon: 'leave' },
  { to: '/dashboard/visitor-pass', label: 'Visitor Pass', icon: 'visitor' },
  { to: '/dashboard/mess-menu', label: 'Mess Menu', icon: 'mess' },
  { to: '/dashboard/meetings', label: 'Meetings', icon: 'meetings' },
  { to: '/dashboard/notices', label: 'Notices', icon: 'notices' },
  { to: '/dashboard/notifications', label: 'Notifications', icon: 'notifications' },
  { to: '/dashboard/digital-id', label: 'Digital ID', icon: 'digitalid' },
]

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-name">HostelConnect</div>
        <div className="brand-sub">Warden Portal</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
          >
            {icons[item.icon]}
            {item.label}
          </NavLink>
        ))}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}
        >
          {icons.profile}
          My Profile
        </NavLink>
      </nav>

      <button className="sidebar-logout" onClick={logout} aria-label="Logout" title="Logout">
        <span className="logout-icon">{icons.logout}</span>
        <span className="logout-text">Logout</span>
      </button>
    </aside>
  )
}
