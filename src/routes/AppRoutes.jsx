import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/login/Login";
import ForgotPassword from "../pages/login/ForgotPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";
import MyRoom from "../pages/myroom/MyRoom";

import Complaints from "../pages/complaints/Complaints";
import RaiseComplaint from "../pages/complaints/RaiseComplaint";
import ComplaintDetails from "../pages/complaints/ComplaintDetails";

import Leave from "../pages/leave/Leave";
import ApplyLeave from "../pages/leave/ApplyLeave";
import LeaveDetails from "../pages/leave/LeaveDetails";

import Visitor from "../pages/visitor/Visitor";
import VisitorHistory from "../pages/visitor/VisitorHistory";
import RequestVisitor from "../pages/visitor/RequestVisitor";
import VisitorDetails from "../pages/visitor/VisitorDetails";

import MessMenu from "../pages/mess/MessMenu";

import Meetings from "../pages/meetings/Meetings";
import MeetingDetails from "../pages/meetings/MeetingDetails";

import Notices from "../pages/notices/Notices";
import Notifications from "../pages/notifications/Notifications";

import Attendance from "../pages/attendance/Attendance";

import EmergencyContacts from "../pages/emergency/EmergencyContacts";

import DigitalID from "../pages/idcard/DigitalID";

import Settings from "../pages/settings/Settings";

import FAQ from "../pages/faq/FAQ";

import Feedback from "../pages/feedback/Feedback";

import Layout from "../layouts/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/my-room"
          element={<MyRoom />}
        />

        <Route
          path="/faq"
          element={<FAQ />}
        />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/complaints"
          element={<Complaints />}
        />

        <Route
          path="/raise-complaint"
          element={<RaiseComplaint />}
        />

        <Route
          path="/complaints/:id"
          element={<ComplaintDetails />}
        />

        <Route
          path="/emergency"
          element={<EmergencyContacts />}
        />

        <Route
          path="/leave"
          element={<Leave />}
        />

        <Route
          path="/apply-leave"
          element={<ApplyLeave />}
        />

        <Route
          path="/digital-id"
          element={<DigitalID />}
        />

        <Route
          path="/leave/:id"
          element={<LeaveDetails />}
        />

        <Route
          path="/visitor"
          element={<Visitor />}
        />

        <Route
          path="/visitor-history"
          element={<VisitorHistory />}
        />

        <Route
            path="/request-visitor"
            element={<RequestVisitor />}
        />

        <Route
            path="/visitor/:id"
            element={<VisitorDetails />}
        />

        <Route
          path="/mess"
          element={<MessMenu />}
        />

        <Route
          path="/meetings"
          element={<Meetings />}
        />

        <Route
          path="/meetings/:id"
          element={<MeetingDetails />}
        />

        <Route
          path="/notices"
          element={<Notices />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route
        path="/feedback"
        element={<Feedback />}
      />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Route>

      {/* Invalid Route */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;