import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext.jsx'
import api from '../apiClient.js'

const DataContext = createContext(null)

const STORAGE_KEY = 'hostelconnect_security_portal_v1'

const todayStr = () => new Date().toISOString().slice(0, 10)

const uid = () => Math.random().toString(36).slice(2, 10)

const seedData = () => ({
  guard: {
    name: 'Rajveer Singh',
    id: 'GRD-0042',
    gate: 'Main Gate',
    shift: 'Night Shift · 8:00 PM – 8:00 AM',
    phone: '+91 98765 43210',
    email: 'rajveer.singh@geetauniversity.edu',
    joined: '2023-11-02',
    photoInitial: 'R',
  },
  notices: [
    {
      id: uid(),
      title: 'Fire drill scheduled this weekend',
      body: 'A mandatory fire drill will be conducted across all hostel blocks. Guards must log every resident exit during the drill window and report headcounts to the warden on duty.',
      from: 'Warden Office',
      priority: 'high',
      date: '2026-07-15',
      read: false,
    },
    {
      id: uid(),
      title: 'New visitor ID verification rule',
      body: 'Effective immediately, all visitors must present a valid government ID before a pass is issued. Record the ID type and last 4 digits in the visitor log notes.',
      from: 'Admin Office',
      priority: 'medium',
      date: '2026-07-12',
      read: false,
    },
    {
      id: uid(),
      title: 'Gate shift handover checklist updated',
      body: 'Please review the updated handover checklist before ending your shift — it now includes a lost & found sweep of the gate booth.',
      from: 'Security Head',
      priority: 'low',
      date: '2026-07-08',
      read: true,
    },
  ],
  attendance: {
    // dateStr -> { status: 'present'|'absent'|'leave', markedAt, approval: 'pending'|'approved'|'rejected' }
  },
  entries: [
    // student leave/entry passes
    {
      id: uid(),
      student: 'Amit Singh',
      room: '308',
      type: 'leave',
      reason: 'Weekend home visit',
      outAt: '2026-07-16T18:30:00',
      expectedReturn: '2026-07-18T20:00:00',
      inAt: null,
      status: 'out',
    },
  ],
  visitors: [
    {
      id: uid(),
      name: 'Kavita Singh',
      relation: 'Sister of Amit Singh',
      room: '308',
      phone: '98xxxxxx21',
      purpose: 'Family visit',
      inAt: '2026-07-17T11:00:00',
      outAt: null,
      status: 'in',
    },
    {
      id: uid(),
      name: 'Ramesh Patel',
      relation: 'Courier — food delivery',
      room: '112',
      phone: '97xxxxxx88',
      purpose: 'Delivery',
      inAt: '2026-07-17T09:40:00',
      outAt: '2026-07-17T09:55:00',
      status: 'out',
    },
  ],
  lostFound: [
    {
      id: uid(),
      item: 'Black umbrella',
      type: 'found',
      location: 'Near Main Gate booth',
      description: 'Plain black umbrella, wooden handle, left on the bench.',
      date: '2026-07-16',
      status: 'unclaimed',
    },
  ],
})

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Could not read stored data, reseeding.', e)
  }
  const seed = seedData()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  return seed
}

export function DataProvider({ children }) {
  const { user: authUser } = useAuth()
  const [data, setData] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  // Pull the shared notice board (posted by warden/admin) instead of the local seed
  const { token } = useAuth()
  useEffect(() => {
    if (!token) return
    api
      .getNotices(token)
      .then((notices) =>
        setData((d) => ({
          ...d,
          notices: notices.map((n) => ({
            id: n.id,
            title: n.title,
            body: n.description,
            from: n.postedByName ? `${n.postedByName} (${n.postedByRole})` : n.postedByRole,
            priority: n.important ? 'high' : 'low',
            date: n.date,
            read: n.read,
          })),
        }))
      )
      .catch((err) => console.warn('Could not load shared notices:', err.message))
  }, [token])

  // Keep guard identity in sync with whoever is actually logged in,
  // instead of always showing the seeded placeholder guard.
  useEffect(() => {
    if (authUser) {
      setData((d) => ({
        ...d,
        guard: {
          ...d.guard,
          id: authUser.id || d.guard.id,
          name: authUser.name || d.guard.name,
          email: authUser.email || d.guard.email,
          gate: authUser.gate || d.guard.gate,
          photoInitial: (authUser.name || d.guard.name || '?').charAt(0).toUpperCase(),
        },
      }))
    }
  }, [authUser])

  // ---- Notices ----
  const markNoticeRead = useCallback((id) => {
    setData((d) => ({
      ...d,
      notices: d.notices.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
    api.markNoticeRead(id, token).catch((err) => console.warn('Could not sync read receipt:', err.message))
  }, [token])

  const markAllNoticesRead = useCallback(() => {
    setData((d) => {
      d.notices.filter((n) => !n.read).forEach((n) => {
        api.markNoticeRead(n.id, token).catch(() => {})
      })
      return { ...d, notices: d.notices.map((n) => ({ ...n, read: true })) }
    })
  }, [token])

  // ---- Attendance ----
  const markAttendance = useCallback((status, date = todayStr()) => {
    setData((d) => ({
      ...d,
      attendance: {
        ...d.attendance,
        [date]: {
          status,
          markedAt: new Date().toISOString(),
          approval: 'pending',
        },
      },
    }))
  }, [])

  // ---- Entry / Exit (student leave passes) ----
  const createLeavePass = useCallback((entry) => {
    setData((d) => ({
      ...d,
      entries: [
        {
          id: uid(),
          status: 'out',
          inAt: null,
          ...entry,
        },
        ...d.entries,
      ],
    }))
  }, [])

  const markEntryReturned = useCallback((id) => {
    setData((d) => ({
      ...d,
      entries: d.entries.map((e) =>
        e.id === id ? { ...e, status: 'in', inAt: new Date().toISOString() } : e
      ),
    }))
  }, [])

  // ---- Visitor Log ----
  const checkInVisitor = useCallback((visitor) => {
    setData((d) => ({
      ...d,
      visitors: [
        {
          id: uid(),
          status: 'in',
          inAt: new Date().toISOString(),
          outAt: null,
          ...visitor,
        },
        ...d.visitors,
      ],
    }))
  }, [])

  const checkOutVisitor = useCallback((id) => {
    setData((d) => ({
      ...d,
      visitors: d.visitors.map((v) =>
        v.id === id ? { ...v, status: 'out', outAt: new Date().toISOString() } : v
      ),
    }))
  }, [])

  // ---- Lost & Found ----
  const addLostFoundItem = useCallback((item) => {
    setData((d) => ({
      ...d,
      lostFound: [
        { id: uid(), status: item.type === 'found' ? 'unclaimed' : 'searching', ...item },
        ...d.lostFound,
      ],
    }))
  }, [])

  const resolveLostFoundItem = useCallback((id) => {
    setData((d) => ({
      ...d,
      lostFound: d.lostFound.map((i) =>
        i.id === id ? { ...i, status: i.type === 'found' ? 'claimed' : 'resolved' } : i
      ),
    }))
  }, [])

  // ---- Profile ----
  const updateGuard = useCallback((patch) => {
    setData((d) => ({ ...d, guard: { ...d.guard, ...patch } }))
  }, [])

  const value = {
    data,
    markNoticeRead,
    markAllNoticesRead,
    markAttendance,
    createLeavePass,
    markEntryReturned,
    checkInVisitor,
    checkOutVisitor,
    addLostFoundItem,
    resolveLostFoundItem,
    updateGuard,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
