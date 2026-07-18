import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './components/Sidebar.jsx'
import MobileNav from './components/MobileNav.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Notice from './pages/Notice.jsx'
import Attendance from './pages/Attendance.jsx'
import EntryExit from './pages/EntryExit.jsx'
import VisitorLog from './pages/VisitorLog.jsx'
import LostFound from './pages/LostFound.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
          <div className="flex min-h-screen bg-ink-950">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 min-w-0 pb-16 md:pb-0">
              <div className="flex items-center justify-between border-b border-ink-700 bg-ink-950/90 px-4 py-3 md:hidden">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-700 bg-ink-900 text-neutral-200"
                  aria-label="Open sidebar"
                >
                  <Menu size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 font-display font-bold text-ink-950">
                    HC
                  </div>
                  <div className="text-sm font-semibold text-white">HostelConnect</div>
                </div>
                <div className="w-10" />
              </div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/entry-exit" element={<EntryExit />} />
                <Route path="/visitor-log" element={<VisitorLog />} />
                <Route path="/lost-found" element={<LostFound />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
            <MobileNav />
          </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
