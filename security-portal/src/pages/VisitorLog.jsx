import React, { useState } from 'react'
import { Plus, Users, Phone } from 'lucide-react'
import Topbar from '../components/Topbar.jsx'
import { Card, Badge, Button, Modal, Field, inputClass, EmptyState } from '../components/UI.jsx'
import { useData } from '../context/DataContext.jsx'

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', {
    day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

const emptyForm = { name: '', relation: '', room: '', phone: '', purpose: '' }

export default function VisitorLog() {
  const { data, checkInVisitor, checkOutVisitor } = useData()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState(emptyForm)

  const visitors = data.visitors.filter((v) => (filter === 'all' ? true : v.status === filter))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.room) return
    checkInVisitor({
      name: form.name,
      relation: form.relation || 'Visitor',
      room: form.room,
      phone: form.phone,
      purpose: form.purpose || 'General visit',
    })
    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <>
      <Topbar title="Visitor Log" subtitle="Issue visitor passes and track who's on campus" />

      <main className="p-5 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-2">
            {['all', 'in', 'out'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`focus-gold px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filter === f
                    ? 'bg-gold-500 text-ink-950 border-gold-500'
                    : 'border-ink-700 text-neutral-400 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All' : f === 'in' ? 'Checked In' : 'Checked Out'}
              </button>
            ))}
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> New Entry
          </Button>
        </div>

        {visitors.length === 0 ? (
          <Card className="p-5">
            <EmptyState icon={Users} title="No visitors logged" hint="Tap 'New Entry' to check in a visitor." />
          </Card>
        ) : (
          <div className="space-y-3">
            {visitors.map((v) => (
              <Card key={v.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center font-display font-semibold shrink-0">
                  {v.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{v.name}</p>
                    <Badge tone="neutral">Room {v.room}</Badge>
                    <Badge tone={v.status === 'in' ? 'green' : 'neutral'}>
                      {v.status === 'in' ? 'Checked In' : 'Checked Out'}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{v.relation} · {v.purpose}</p>
                  <div className="flex flex-wrap gap-x-3 text-[11px] text-neutral-500 mt-1">
                    <span>In: {fmt(v.inAt)}</span>
                    {v.outAt && <span>Out: {fmt(v.outAt)}</span>}
                    {v.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={11} /> {v.phone}
                      </span>
                    )}
                  </div>
                </div>
                {v.status === 'in' && (
                  <Button variant="danger" className="!text-xs shrink-0" onClick={() => checkOutVisitor(v.id)}>
                    Check Out
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <Modal open={open} onClose={() => setOpen(false)} title="New Visitor Pass">
        <form onSubmit={submit}>
          <Field label="Visitor Name">
            <input
              required
              className={inputClass}
              placeholder="e.g. Kavita Singh"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Relation / Meeting Whom">
            <input
              className={inputClass}
              placeholder="e.g. Sister of Amit Singh"
              value={form.relation}
              onChange={(e) => setForm({ ...form, relation: e.target.value })}
            />
          </Field>
          <Field label="Room Number">
            <input
              required
              className={inputClass}
              placeholder="e.g. 308"
              value={form.room}
              onChange={(e) => setForm({ ...form, room: e.target.value })}
            />
          </Field>
          <Field label="Phone Number">
            <input
              className={inputClass}
              placeholder="e.g. 98765xxxxx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <Field label="Purpose of Visit">
            <input
              className={inputClass}
              placeholder="e.g. Family visit"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            />
          </Field>
          <Button type="submit" className="w-full mt-2">Check In Visitor</Button>
        </form>
      </Modal>
    </>
  )
}
