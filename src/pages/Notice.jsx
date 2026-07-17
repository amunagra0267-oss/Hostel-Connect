import React, { useState } from 'react'
import { Bell, ChevronDown, CheckCheck } from 'lucide-react'
import Topbar from '../components/Topbar.jsx'
import { Card, Badge, Button, EmptyState } from '../components/UI.jsx'
import { useData } from '../context/DataContext.jsx'

const priorityTone = { high: 'red', medium: 'gold', low: 'neutral' }

export default function Notice() {
  const { data, markNoticeRead, markAllNoticesRead } = useData()
  const [openId, setOpenId] = useState(null)

  const notices = [...data.notices].sort((a, b) => (a.date < b.date ? 1 : -1))
  const unread = notices.filter((n) => !n.read).length

  const toggle = (n) => {
    setOpenId(openId === n.id ? null : n.id)
    if (!n.read) markNoticeRead(n.id)
  }

  return (
    <>
      <Topbar title="Notice Board" subtitle={`${unread} unread notice${unread === 1 ? '' : 's'}`} />

      <main className="p-5 md:p-8 space-y-4">
        <div className="flex justify-end">
          {unread > 0 && (
            <Button variant="secondary" onClick={markAllNoticesRead}>
              <CheckCheck size={16} /> Mark all as read
            </Button>
          )}
        </div>

        {notices.length === 0 ? (
          <Card className="p-5">
            <EmptyState icon={Bell} title="No notices yet" hint="Notices from the admin and warden office will appear here." />
          </Card>
        ) : (
          <div className="space-y-3">
            {notices.map((n) => {
              const open = openId === n.id
              return (
                <Card key={n.id} className={`transition-colors ${!n.read ? 'border-gold-500/40' : ''}`}>
                  <button
                    onClick={() => toggle(n)}
                    className="focus-gold w-full flex items-center gap-3 px-5 py-4 text-left"
                  >
                    {!n.read && <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-white">{n.title}</p>
                        <Badge tone={priorityTone[n.priority]}>{n.priority}</Badge>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{n.from} · {n.date}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-neutral-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 -mt-1">
                      <p className="text-sm text-neutral-300 leading-relaxed border-t border-ink-700 pt-4">
                        {n.body}
                      </p>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </main>
    </>
  )
}
