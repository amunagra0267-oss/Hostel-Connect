import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Students from './pages/Students.jsx'
import Complaints from './pages/Complaints.jsx'
import Attendance from './pages/Attendance.jsx'
import Leave from './pages/Leave.jsx'
import VisitorPass from './pages/VisitorPass.jsx'
import MessMenu from './pages/MessMenu.jsx'
import Meetings from './pages/Meetings.jsx'
import Notices from './pages/Notices.jsx'
import Notifications from './pages/Notifications.jsx'
import DigitalID from './pages/DigitalID.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leave" element={<Leave />} />
        <Route path="visitor-pass" element={<VisitorPass />} />
        <Route path="mess-menu" element={<MessMenu />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="notices" element={<Notices />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="digital-id" element={<DigitalID />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
