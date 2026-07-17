import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, ROLES } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import StudentPortal from "./pages/StudentPortal";
import WardenPortal from "./pages/WardenPortal";
import SecurityPortal from "./pages/SecurityPortal";
import WorkerPortal from "./pages/WorkerPortal";
import AdminPortal from "./pages/AdminPortal";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Student */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allow={ROLES.STUDENT}>
              <StudentPortal />
            </ProtectedRoute>
          }
        />

        {/* Warden */}
        <Route
          path="/warden"
          element={
            <ProtectedRoute allow={ROLES.WARDEN}>
              <WardenPortal />
            </ProtectedRoute>
          }
        />

        {/* Security */}
        <Route
          path="/security"
          element={
            <ProtectedRoute allow={ROLES.SECURITY}>
              <SecurityPortal />
            </ProtectedRoute>
          }
        />

        {/* Worker */}
        <Route
          path="/worker"
          element={
            <ProtectedRoute allow={ROLES.WORKER}>
              <WorkerPortal />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allow={ROLES.ADMIN}>
              <AdminPortal />
            </ProtectedRoute>
          }
        />

        {/* Invalid routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}