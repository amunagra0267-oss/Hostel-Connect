import React, { useEffect, useMemo, useState, useCallback } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";
import api from "../../apiClient";
import { useAuth } from "../../context/AuthContext";

const Attendance = () => {
  const { user, token } = useAuth();
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  const load = useCallback(() => {
    if (!user?.id || !token) return;
    api
      .getAttendanceHistory(user.id, token)
      .then((records) =>
        setAttendanceHistory(
          records.map((r) => ({
            id: r._id,
            date: r.date,
            status: r.present ? "In Hostel" : "Out",
            checkIn: r.checkIn || "-",
            checkOut: r.checkOut || "-",
          }))
        )
      )
      .catch((err) => console.warn("Could not load attendance:", err.message));
  }, [user, token]);

  useEffect(() => { load(); }, [load]);

  const today = attendanceHistory[0];

  const percentage = useMemo(() => {
    if (attendanceHistory.length === 0) return 0;
    const present = attendanceHistory.filter((item) => item.status === "In Hostel").length;
    return Math.round((present / attendanceHistory.length) * 100);
  }, [attendanceHistory]);

  return (
    <div>
      <PageHeader
        eyebrow="MONITORING"
        title="Attendance"
        description="Track your hostel check-in and check-out history"
      />

      {/* Today's Status Card - marked by warden/security, reflected here automatically */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-unit-lg">
        <h3 className="text-xl font-bold text-on-surface mb-4">Today's Status</h3>
        <div className="space-y-2">
          <p className="text-on-surface-variant">
            <span className="text-2xl">{today?.status === "In Hostel" ? "🟢" : "🔴"}</span>{" "}
            {today ? today.status : "Not marked yet"}
          </p>
          <p className="text-on-surface">Check In: <span className="font-semibold">{today?.checkIn || "--"}</span></p>
          <p className="text-on-surface">Check Out: <span className="font-semibold">{today?.checkOut || "--"}</span></p>
        </div>
      </div>

      {/* Attendance Percentage Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-unit-lg">
        <h3 className="text-xl font-bold text-on-surface mb-4">Attendance Percentage</h3>
        <p className="text-5xl font-bold text-primary">{percentage}%</p>
      </div>

      {/* Attendance History */}
      <div>
        <h3 className="text-xl font-bold text-on-surface mb-4">Attendance History</h3>
        <div className="space-y-3">
          {attendanceHistory.length === 0 && (
            <p className="text-on-surface-variant">No attendance records yet.</p>
          )}
          {attendanceHistory.map((attendance) => (
            <div key={attendance.id} className="bg-surface border border-outline-variant rounded-lg p-unit-lg">
              <h4 className="text-lg font-semibold text-on-surface mb-3">{attendance.date}</h4>
              <div className="space-y-2 text-on-surface-variant">
                <p>Status: <span className="text-on-surface font-medium">{attendance.status}</span></p>
                <p>Check In: <span className="text-on-surface font-medium">{attendance.checkIn}</span></p>
                <p>Check Out: <span className="text-on-surface font-medium">{attendance.checkOut}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
