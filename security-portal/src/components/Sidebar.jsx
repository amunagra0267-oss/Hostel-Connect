import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Bell,
  CalendarCheck2,
  LogOut as LogOutIcon,
  Users,
  UserCircle2,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useData } from '../context/DataContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/notice', label: 'Notice', icon: Bell },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck2 },
  { to: '/entry-exit', label: 'Entry / Exit', icon: ShieldCheck },
  { to: '/visitor-log', label: 'Visitor Log', icon: Users },
  { to: '/lost-found', label: 'Lost & Found', icon: Search },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
]

export default function Sidebar({ isOpen, onClose }) {
  const { data } = useData()
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/70 transition-opacity duration-200 md:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col border-r border-ink-700 bg-ink-900 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:w-64 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-ink-700 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 font-display font-bold text-ink-950">
              HC
            </div>
            <div>
              <p className="font-display text-sm font-semibold leading-tight text-white">HostelConnect</p>
              <p className="text-[11px] leading-tight text-neutral-400">Geeta University</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 bg-ink-800 text-neutral-300 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <p className="px-5 pt-5 pb-2 text-[11px] font-semibold tracking-widest text-gold-500">
          SECURITY PORTAL
        </p>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `focus-gold flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-500 text-ink-950'
                    : 'text-neutral-300 hover:bg-ink-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink-700 p-3">
          <button
            onClick={() => {
              navigate('/profile')
              onClose?.()
            }}
            className="focus-gold flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-ink-800"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/20 font-display text-sm font-semibold text-gold-400">
              {data.guard.photoInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{data.guard.name}</p>
              <p className="truncate text-[11px] text-neutral-400">Security</p>
            </div>
          </button>
          <button
            onClick={() => {
              logout()
              navigate('/login')
              onClose?.()
            }}
            className="focus-gold mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-ink-800 hover:text-red-400"
          >
            <LogOutIcon size={16} />
            Switch Portal
          </button>
        </div>
      </aside>
    </>
  )
}
