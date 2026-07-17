import React, { useMemo, useState } from 'react'
import { CalendarCheck2, CalendarX2, Plane, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react'
import Topbar from '../components/Topbar.jsx'
import { Card, Button, Badge } from '../components/UI.jsx'
import { useData } from '../context/DataContext.jsx'

const todayStr = () => new Date().toISOString().slice(0, 10)

const statusStyle = {
  present: 'bg-emerald-500 text-ink-950',
  absent: 'bg-red-500 text-white',
  leave: 'bg-sky-500 text-white',
}

const statusLabel = { present: 'Present', absent: 'Absent', leave: 'Leave' }

export default function Attendance() {
  const { data, markAttendance } = useData()
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    d.setDate(1)
    return d
  })

  const today = todayStr()
  const todayRecord = data.attendance[today]

  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startOffset = firstDay.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells = []
    for (let i = 0; i < startOffset; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      cells.push({ day: d, dateStr, record: data.attendance[dateStr] })
    }
    return cells
  }, [viewDate, data.attendance])

  const monthRecords = calendarDays.filter(Boolean).map((c) => c.record).filter(Boolean)
  const counts = {
    present: monthRecords.filter((r) => r.status === 'present').length,
    absent: monthRecords.filter((r) => r.status === 'absent').length,
    leave: monthRecords.filter((r) => r.status === 'leave').length,
  }

  const changeMonth = (delta) => {
    setViewDate((d) => {
      const nd = new Date(d)
      nd.setMonth(nd.getMonth() + delta)
      return nd
    })
  }

  return (
    <>
      <Topbar title="Attendance" subtitle="Mark today's attendance — sent to Admin & Warden for approval" />

      <main className="p-5 md:p-8 space-y-6">
        <Card className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-400">Today</p>
              <p className="font-display text-lg font-semibold text-white">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              {todayRecord && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge tone={todayRecord.status === 'present' ? 'green' : todayRecord.status === 'absent' ? 'red' : 'blue'}>
                    Marked {statusLabel[todayRecord.status]}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                    <Clock3 size={12} />
                    {todayRecord.approval === 'pending' ? 'Awaiting approval' : 'Approved'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={todayRecord?.status === 'present' ? 'primary' : 'secondary'}
                onClick={() => markAttendance('present')}
              >
                <CalendarCheck2 size={16} /> Present
              </Button>
              <Button
                variant={todayRecord?.status === 'leave' ? 'primary' : 'secondary'}
                onClick={() => markAttendance('leave')}
              >
                <Plane size={16} /> Leave
              </Button>
              <Button
                variant={todayRecord?.status === 'absent' ? 'danger' : 'secondary'}
                onClick={() => markAttendance('absent')}
              >
                <CalendarX2 size={16} /> Absent
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-display font-bold text-emerald-400">{counts.present}</p>
            <p className="text-xs text-neutral-400 mt-1">Present</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-display font-bold text-red-400">{counts.absent}</p>
            <p className="text-xs text-neutral-400 mt-1">Absent</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-display font-bold text-sky-400">{counts.leave}</p>
            <p className="text-xs text-neutral-400 mt-1">Leave</p>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white">Monthly Attendance</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => changeMonth(-1)} className="focus-gold p-1.5 rounded-lg hover:bg-ink-800 text-neutral-400">
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-neutral-300 w-32 text-center">{monthLabel}</span>
              <button onClick={() => changeMonth(1)} className="focus-gold p-1.5 rounded-lg hover:bg-ink-800 text-neutral-400">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-neutral-500 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((c, i) =>
              c === null ? (
                <div key={i} />
              ) : (
                <div
                  key={c.dateStr}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium border ${
                    c.record
                      ? `${statusStyle[c.record.status]} border-transparent`
                      : c.dateStr === today
                      ? 'border-gold-500/60 text-gold-400'
                      : 'border-ink-700 text-neutral-500'
                  }`}
                >
                  {c.day}
                </div>
              )
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-ink-700">
            {Object.entries(statusLabel).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span className={`w-2.5 h-2.5 rounded-full ${statusStyle[key]}`} />
                {label}
              </div>
            ))}
          </div>
        </Card>
      </main>
    </>
  )
}
