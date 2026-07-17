import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Save, Phone, Mail, ShieldCheck, CalendarClock, LogOut, Users, ClipboardList } from 'lucide-react'
import Topbar from '../components/Topbar.jsx'
import { Card, Button, Field, inputClass, Badge } from '../components/UI.jsx'
import { useData } from '../context/DataContext.jsx'

export default function Profile() {
  const { data, updateGuard } = useData()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(data.guard)

  const startEdit = () => {
    setForm(data.guard)
    setEditing(true)
  }

  const save = (e) => {
    e.preventDefault()
    updateGuard(form)
    setEditing(false)
  }

  const attendanceCount = Object.values(data.attendance).filter((a) => a.status === 'present').length
  const visitorsHandled = data.visitors.length
  const passesIssued = data.entries.length

  return (
    <>
      <Topbar title="Profile" subtitle="Your details on record with HostelConnect" />

      <main className="p-5 md:p-8 space-y-6 max-w-2xl">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/15 border border-gold-500/30 text-gold-400 flex items-center justify-center font-display font-bold text-2xl">
              {data.guard.photoInitial}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-lg font-semibold text-white truncate">{data.guard.name}</h2>
              <p className="text-xs text-neutral-400">{data.guard.id} · {data.guard.gate}</p>
              <Badge tone="green">On Duty</Badge>
            </div>
            {!editing && (
              <Button variant="secondary" onClick={startEdit}>
                <Pencil size={14} /> Edit
              </Button>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <ClipboardList className="mx-auto text-gold-500 mb-1" size={18} />
            <p className="text-xl font-display font-bold text-white">{attendanceCount}</p>
            <p className="text-[11px] text-neutral-400">Days Present</p>
          </Card>
          <Card className="p-4 text-center">
            <Users className="mx-auto text-gold-500 mb-1" size={18} />
            <p className="text-xl font-display font-bold text-white">{visitorsHandled}</p>
            <p className="text-[11px] text-neutral-400">Visitors Logged</p>
          </Card>
          <Card className="p-4 text-center">
            <ShieldCheck className="mx-auto text-gold-500 mb-1" size={18} />
            <p className="text-xl font-display font-bold text-white">{passesIssued}</p>
            <p className="text-[11px] text-neutral-400">Passes Issued</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-display font-semibold text-white mb-4">Contact & Duty Details</h3>
          {!editing ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone size={15} className="text-gold-500" /> {data.guard.phone}
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail size={15} className="text-gold-500" /> {data.guard.email}
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <CalendarClock size={15} className="text-gold-500" /> {data.guard.shift}
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <ShieldCheck size={15} className="text-gold-500" /> {data.guard.gate}
              </div>
            </div>
          ) : (
            <form onSubmit={save}>
              <Field label="Full Name">
                <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field label="Phone">
                <input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </Field>
              <Field label="Email">
                <input className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="Shift">
                <input className={inputClass} value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} />
              </Field>
              <Field label="Gate Assigned">
                <input className={inputClass} value={form.gate} onChange={(e) => setForm({ ...form, gate: e.target.value })} />
              </Field>
              <div className="flex gap-2 mt-2">
                <Button type="submit"><Save size={14} /> Save Changes</Button>
                <Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </form>
          )}
        </Card>

        <Button variant="danger" className="w-full" onClick={() => navigate('/login')}>
          <LogOut size={16} /> Log Out
        </Button>
      </main>
    </>
  )
}
