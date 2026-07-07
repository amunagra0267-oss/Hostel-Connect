import React, { useMemo } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const Attendance = () => {
  const attendanceHistory = [
    {
      id: 1,
      date: "2 July",
      status: "In Hostel",
      checkIn: "7:45 PM",
      checkOut: "-",
    },
    {
      id: 2,
      date: "1 July",
      status: "Out",
      checkIn: "8:00 PM",
      checkOut: "9:30 AM",
    },
    {
      id: 3,
      date: "30 June",
      status: "In Hostel",
      checkIn: "7:30 PM",
      checkOut: "-",
    },
    {
      id: 4,
      date: "29 June",
      status: "In Hostel",
      checkIn: "8:15 PM",
      checkOut: "-",
    },
    {
      id: 5,
      date: "28 June",
      status: "Out",
      checkIn: "8:10 PM",
      checkOut: "10:00 AM",
    },
  ];

  const percentage = useMemo(() => {
    const present = attendanceHistory.filter(
      (item) => item.status === "In Hostel"
    ).length;

    return Math.round(
      (present / attendanceHistory.length) * 100
    );
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="MONITORING"
        title="Attendance"
        description="Track your hostel check-in and check-out history"
      />

      {/* Today's Status Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-unit-lg">
        <h3 className="text-xl font-bold text-on-surface mb-4">Today's Status</h3>
        <div className="space-y-2">
          <p className="text-on-surface-variant">
            <span className="text-2xl">🟢</span> In Hostel
          </p>
          <p className="text-on-surface">Check In: <span className="font-semibold">7:45 PM</span></p>
          <p className="text-on-surface">Check Out: <span className="font-semibold">--</span></p>
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