import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useData } from '../context/DataContext.jsx'

export default function Topbar({ title, subtitle }) {
  const { data } = useData()
  const navigate = useNavigate()
  const unread = data.notices.filter((n) => !n.read).length

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 md:px-8 py-4 bg-ink-950/90 backdrop-blur border-b border-ink-700">
      <div className="min-w-0">
        <h1 className="font-display text-xl md:text-2xl font-semibold text-white truncate">{title}</h1>
        {subtitle && <p className="text-xs md:text-sm text-neutral-400 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-ink-800 border border-ink-700 text-xs text-neutral-300">
          {today}
        </span>
        <button
          onClick={() => navigate('/notice')}
          aria-label="Open notices"
          className="focus-gold relative w-10 h-10 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center text-neutral-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
