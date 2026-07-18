import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarCheck2, ShieldCheck, Users, UserCircle2 } from 'lucide-react'

const items = [
  { to: '/', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/attendance', label: 'Attend.', icon: CalendarCheck2 },
  { to: '/entry-exit', label: 'Entry', icon: ShieldCheck },
  { to: '/visitor-log', label: 'Visitors', icon: Users },
  { to: '/profile', label: 'Profile', icon: UserCircle2 },
]

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ink-900 border-t border-ink-700 flex justify-around py-2">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `focus-gold flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium ${
              isActive ? 'text-gold-500' : 'text-neutral-400'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
