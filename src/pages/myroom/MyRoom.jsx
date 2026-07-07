import React, { useMemo } from "react";

import { useStudent } from "../../context/StudentContext";
import PageHeader from "../../components/common/PageHeader";

const MyRoom = () => {
  const { student } = useStudent();

  const room = student.roomDetails;

  const totalRoommates = useMemo(() => {
    return student.roommates.length;
  }, [student.roommates]);

  return (
    <div>
      <PageHeader
        eyebrow="ACCOMMODATION"
        title="My Room"
        description="View your room details and roommate information"
      />

      {/* Room Information Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Room Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Room Number</p>
            <p className="text-lg font-semibold text-on-surface">{student.room}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Hostel</p>
            <p className="text-lg font-semibold text-on-surface">{student.hostel}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Block</p>
            <p className="text-lg font-semibold text-on-surface">{student.block}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Floor</p>
            <p className="text-lg font-semibold text-on-surface">{room.floor}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Capacity</p>
            <p className="text-lg font-semibold text-on-surface">{room.capacity}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Current Occupancy</p>
            <p className="text-lg font-semibold text-on-surface">{room.occupied}</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-outline-variant">
          <p className="text-on-surface-variant text-sm mb-2">Room Status</p>
          <p className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold text-sm">
            {room.roomStatus}
          </p>
        </div>
      </div>

      {/* Maintenance Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Maintenance</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-on-surface-variant text-sm mb-2">Cleanliness Score</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-primary">{room.cleanlinessScore}</p>
              <p className="text-on-surface-variant">/10</p>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-2">Last Cleaning</p>
            <p className="text-lg font-semibold text-on-surface">{room.lastCleaning}</p>
          </div>
        </div>
      </div>

      {/* Roommates */}
      <div>
        <h3 className="text-xl font-bold text-on-surface mb-4">Roommates ({totalRoommates})</h3>
        <div className="space-y-3">
          {student.roommates.map((roommate) => (
            <div key={roommate.id} className="bg-surface border border-outline-variant rounded-lg p-unit-lg">
              <h4 className="text-lg font-semibold text-on-surface mb-2">{roommate.name}</h4>
              <p className="text-on-surface-variant">{roommate.branch}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRoom;