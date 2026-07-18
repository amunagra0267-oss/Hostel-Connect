import React, { useState } from 'react'
import { Plus, Search, MapPin, PackageCheck } from 'lucide-react'
import Topbar from '../components/Topbar.jsx'
import { Card, Badge, Button, Modal, Field, inputClass, EmptyState } from '../components/UI.jsx'
import { useData } from '../context/DataContext.jsx'

const emptyForm = { item: '', type: 'found', location: '', description: '' }

export default function LostFound() {
  const { data, addLostFoundItem, resolveLostFoundItem } = useData()
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState(emptyForm)

  const items = data.lostFound.filter((i) => (filter === 'all' ? true : i.type === filter))

  const submit = (e) => {
    e.preventDefault()
    if (!form.item || !form.location) return
    addLostFoundItem({
      item: form.item,
      type: form.type,
      location: form.location,
      description: form.description,
      date: new Date().toISOString().slice(0, 10),
    })
    setForm(emptyForm)
    setOpen(false)
  }

  const isResolved = (i) => i.status === 'claimed' || i.status === 'resolved'

  return (
    <>
      <Topbar title="Lost & Found" subtitle="Log items found or reported missing at the gate" />

      <main className="p-5 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex gap-2">
            {['all', 'found', 'lost'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`focus-gold px-3.5 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors ${
                  filter === f
                    ? 'bg-gold-500 text-ink-950 border-gold-500'
                    : 'border-ink-700 text-neutral-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} /> Log Item
          </Button>
        </div>

        {items.length === 0 ? (
          <Card className="p-5">
            <EmptyState icon={Search} title="No items logged" hint="Log a found or lost item to track it here." />
          </Card>
        ) : (
          <div className="space-y-3">
            {items.map((i) => (
              <Card key={i.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  i.type === 'found' ? 'bg-sky-500/15 text-sky-400' : 'bg-red-500/15 text-red-400'
                }`}>
                  <Search size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-white">{i.item}</p>
                    <Badge tone={i.type === 'found' ? 'blue' : 'red'}>{i.type === 'found' ? 'Found' : 'Lost'}</Badge>
                    <Badge tone={isResolved(i) ? 'green' : 'gold'}>
                      {isResolved(i) ? (i.type === 'found' ? 'Claimed' : 'Resolved') : (i.type === 'found' ? 'Unclaimed' : 'Searching')}
                    </Badge>
                  </div>
                  {i.description && <p className="text-xs text-neutral-400 mt-1">{i.description}</p>}
                  <div className="flex flex-wrap gap-x-3 text-[11px] text-neutral-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {i.location}</span>
                    <span>{i.date}</span>
                  </div>
                </div>
                {!isResolved(i) && (
                  <Button variant="secondary" className="!text-xs shrink-0" onClick={() => resolveLostFoundItem(i.id)}>
                    <PackageCheck size={14} /> {i.type === 'found' ? 'Mark Claimed' : 'Mark Resolved'}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <Modal open={open} onClose={() => setOpen(false)} title="Log Lost / Found Item">
        <form onSubmit={submit}>
          <Field label="Item Type">
            <div className="flex gap-2">
              {['found', 'lost'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, type: t })}
                  className={`focus-gold flex-1 py-2.5 rounded-xl text-sm font-medium capitalize border transition-colors ${
                    form.type === t
                      ? 'bg-gold-500 text-ink-950 border-gold-500'
                      : 'border-ink-700 text-neutral-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Item Description">
            <input
              required
              className={inputClass}
              placeholder="e.g. Black umbrella"
              value={form.item}
              onChange={(e) => setForm({ ...form, item: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <input
              required
              className={inputClass}
              placeholder="e.g. Near Main Gate booth"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </Field>
          <Field label="Notes (optional)">
            <textarea
              className={inputClass}
              rows={3}
              placeholder="Any identifying details"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>
          <Button type="submit" className="w-full mt-2">Log Item</Button>
        </form>
      </Modal>
    </>
  )
}
