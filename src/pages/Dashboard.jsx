import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Users, Clock, ShieldCheck, ArrowRight, Bell, Search } from 'lucide-react'
import Topbar from '../components/Topbar.jsx'
import { Card, StatCard, Badge, Button, EmptyState } from '../components/UI.jsx'
import { useData } from '../context/DataContext.jsx'

const todayStr = () => new Date().toISOString().slice(0, 10)

function timeAgo(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export default function Dashboard() {
  const { data, checkOutVisitor, markEntryReturned } = useData()
  const navigate = useNavigate()

  const currentlyInside = data.visitors.filter((v) => v.status === 'in')
  const todaysVisitors = data.visitors.filter((v) => v.inAt?.slice(0, 10) === todayStr())
  const pendingPasses = data.entries.filter((e) => e.status === 'out')
  const totalLogged = data.visitors.length + data.entries.length
  const latestNotices = [...data.notices]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)

  return (
    <>
      <Topbar title="Dashboard" subtitle="Geeta University · Security Portal" />

      <main className="p-5 md:p-8 space-y-6">
        <Card className="p-6 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold-500/10 blur-2xl" />
          <p className="text-xs text-gold-500 font-semibold tracking-wide mb-1">SECURITY DASHBOARD</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">{data.guard.name}</h2>
          <p className="text-sm text-neutral-400 mt-1">
            {data.guard.gate} · Geeta University Hostel
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Button onClick={() => navigate('/visitor-log')}>
              <Users size={16} /> Visitor Log
            </Button>
            <Button variant="secondary" onClick={() => navigate('/entry-exit')}>
              <ShieldCheck size={16} /> Entry / Exit
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={LogIn} value={currentlyInside.length} label="Currently Inside" tone="green" />
          <StatCard icon={Users} value={todaysVisitors.length} label="Today's Visitors" tone="blue" />
          <StatCard icon={Clock} value={pendingPasses.length} label="Pending Passes" tone="gold" />
          <StatCard icon={ShieldCheck} value={totalLogged} label="Total Logged" tone="neutral" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-white flex items-center gap-2">
                <LogIn size={16} className="text-emerald-400" /> Currently Checked In
              </h3>
              <button onClick={() => navigate('/visitor-log')} className="text-xs text-gold-500 hover:text-gold-400 flex items-center gap-1">
                View all <ArrowRight size={12} />
              </button>
            </div>
            {currentlyInside.length === 0 ? (
              <EmptyState icon={Users} title="No one checked in right now" hint="Visitors you check in will show up here." />
            ) : (
              <div className="space-y-2">
                {currentlyInside.map((v) => (
                  <div key={v.id} className="flex items-center justify-between gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{v.name}</p>
                      <p className="text-xs text-neutral-400 truncate">{v.relation} · Room {v.room}</p>
                      <p className="text-[11px] text-emerald-400 mt-0.5">In at {timeAgo(v.inAt)}</p>
                    </div>
                    <Button variant="danger" className="!px-3 !py-1.5 !text-xs shrink-0" onClick={() => checkOutVisitor(v.id)}>
                      Check Out
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-white flex items-center gap-2">
                <Clock size={16} className="text-gold-500" /> Pending Leave Passes
              </h3>
              <button onClick={() => navigate('/entry-exit')} className="text-xs text-gold-500 hover:text-gold-400 flex items-center gap-1">
                View all <ArrowRight size={12} />
              </button>
            </div>
            {pendingPasses.length === 0 ? (
              <EmptyState icon={ShieldCheck} title="No pending passes" hint="Leave passes awaiting a student's return show here." />
            ) : (
              <div className="space-y-2">
                {pendingPasses.map((e) => (
                  <div key={e.id} className="flex items-center justify-between gap-3 bg-ink-800 border border-ink-700 rounded-xl px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{e.student}</p>
                      <p className="text-xs text-neutral-400 truncate">Room {e.room} · {e.reason}</p>
                      <p className="text-[11px] text-gold-500 mt-0.5">Out since {timeAgo(e.outAt)}</p>
                    </div>
                    <Button variant="secondary" className="!px-3 !py-1.5 !text-xs shrink-0" onClick={() => markEntryReturned(e.id)}>
                      Mark Returned
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Bell size={16} className="text-gold-500" /> Recent Notices
            </h3>
            <button onClick={() => navigate('/notice')} className="text-xs text-gold-500 hover:text-gold-400 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {latestNotices.map((n) => (
              <button
                key={n.id}
                onClick={() => navigate('/notice')}
                className="focus-gold w-full text-left flex items-start gap-3 bg-ink-800 border border-ink-700 rounded-xl px-4 py-3 hover:border-gold-500/40 transition-colors"
              >
                {!n.read && <span className="w-2 h-2 mt-1.5 rounded-full bg-gold-500 shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{n.title}</p>
                  <p className="text-xs text-neutral-500">{n.from} · {n.date}</p>
                </div>
                {n.priority === 'high' && <Badge tone="red">High</Badge>}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Search size={16} className="text-gold-500" /> Lost & Found
            </h3>
            <button onClick={() => navigate('/lost-found')} className="text-xs text-gold-500 hover:text-gold-400 flex items-center gap-1">
              Open <ArrowRight size={12} />
            </button>
          </div>
          <p className="text-xs text-neutral-500">
            {data.lostFound.filter((i) => i.status === 'unclaimed' || i.status === 'searching').length} active item(s) logged at the gate.
          </p>
        </Card>
      </main>
    </>
  )
}
