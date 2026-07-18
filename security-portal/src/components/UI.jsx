import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-ink-900 border border-ink-700 rounded-2xl ${className}`}>{children}</div>
  )
}

export function StatCard({ icon: Icon, value, label, tone = 'gold' }) {
  const tones = {
    gold: 'bg-gold-500/15 text-gold-400',
    green: 'bg-emerald-500/15 text-emerald-400',
    blue: 'bg-sky-500/15 text-sky-400',
    red: 'bg-red-500/15 text-red-400',
  }
  return (
    <Card className="p-4 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tones[tone]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-neutral-400 mt-1">{label}</p>
      </div>
    </Card>
  )
}

export function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-ink-700 text-neutral-300',
    gold: 'bg-gold-500/15 text-gold-400 border border-gold-500/30',
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    red: 'bg-red-500/15 text-red-400 border border-red-500/30',
    blue: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-gold',
    secondary: 'bg-ink-800 text-neutral-200 border border-ink-700 hover:bg-ink-700',
    danger: 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25',
    ghost: 'text-neutral-400 hover:text-white hover:bg-ink-800',
  }
  return (
    <button
      className={`focus-gold inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-ink-900 border border-ink-700 sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-700 sticky top-0 bg-ink-900">
          <h3 className="font-display font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="focus-gold text-neutral-400 hover:text-white p-1 rounded-lg">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function Field({ label, children, error }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-xs font-medium text-neutral-400">{label}</span>
      {children}
      {error ? <p className="mt-1.5 text-xs text-red-400">{error}</p> : null}
    </label>
  )
}

export const inputClass =
  'focus-gold w-full bg-ink-800 border border-ink-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-gold-500/60'

export function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-4">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-ink-700 flex items-center justify-center text-neutral-500 mb-4">
          <Icon size={24} />
        </div>
      )}
      <p className="text-sm font-medium text-neutral-300">{title}</p>
      {hint && <p className="text-xs text-neutral-500 mt-1 max-w-xs">{hint}</p>}
    </div>
  )
}
