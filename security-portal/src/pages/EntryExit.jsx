import React, { useState } from 'react'
import { Plus, ShieldCheck, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import Topbar from '../components/Topbar.jsx'
import { Card, Badge, Button, Modal, Field, inputClass, EmptyState } from '../components/UI.jsx'
import { useData } from '../context/DataContext.jsx'

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', {
    day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

const emptyForm = { student: '', room: '', reason: '', expectedReturn: '' }

export default function EntryExit() {
  const { data, createLeavePass, markEntryReturned } = useData()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState(emptyForm)

  const entries = data.entries.filter((e) => (filter === 'all' ? true : e.status === filter))

  const submit = (e) => {
    e.preventDefault()
    if (!form.student || !form.room) return
    createLeavePass({
      student: form.student,
      room: form.room,
      reason: form.reason || 'Not specified',
      outAt: new Date().toISOString(),
      expectedReturn: form.expectedReturn || null,
    })
    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <>
      <Topbar title="Entry / Exit" subtitle="Student leave passes — create, track and close out" />

      <main className="p-5 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-2">
            {['all', 'out', 'in'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`focus-gold px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filter === f
                    ? 'bg-gold-500 text-ink-950 border-gold-500'
                    : 'border-ink-700 text-neutral-400 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All' : f === 'out' ? 'Currently Out' : 'Returned'}
              </button>
            ))}
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> New Entry
          </Button>
        </div>

        {entries.length === 0 ? (
          <Card className="p-5">
            <EmptyState icon={ShieldCheck} title="No leave passes yet" hint="Tap 'New Entry' to log a student leaving the hostel." />
          </Card>
        ) : (
          <div className="space-y-3">
            {entries.map((e) => (
              <Card key={e.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  e.status === 'out' ? 'bg-gold-500/15 text-gold-400' : 'bg-emerald-500/15 text-emerald-400'
                }`}>
                  {e.status === 'out' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{e.student}</p>
                    <Badge tone="neutral">Room {e.room}</Badge>
                    <Badge tone={e.status === 'out' ? 'gold' : 'green'}>
                      {e.status === 'out' ? 'Currently Out' : 'Returned'}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{e.reason}</p>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Out: {fmt(e.outAt)}
                    {e.expectedReturn && ` · Expected back: ${fmt(e.expectedReturn)}`}
                    {e.inAt && ` · Returned: ${fmt(e.inAt)}`}
                  </p>
                </div>
                {e.status === 'out' && (
                  <Button variant="secondary" className="!text-xs shrink-0" onClick={() => markEntryReturned(e.id)}>
                    Mark Returned
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <Modal open={open} onClose={() => setOpen(false)} title="New Leave Pass">
        <form onSubmit={submit}>
          <Field label="Student Name">
            <input
              required
              className={inputClass}
              placeholder="e.g. Amit Singh"
              value={form.student}
              onChange={(e) => setForm({ ...form, student: e.target.value })}
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
          <Field label="Reason">
            <input
              className={inputClass}
              placeholder="e.g. Weekend home visit"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
            />
          </Field>
          <Field label="Expected Return (optional)">
            <input
              type="datetime-local"
              className={inputClass}
              value={form.expectedReturn}
              onChange={(e) => setForm({ ...form, expectedReturn: e.target.value })}
            />
          </Field>
          <Button type="submit" className="w-full mt-2">Create Pass</Button>
        </form>
      </Modal>
    </>
  )
}
