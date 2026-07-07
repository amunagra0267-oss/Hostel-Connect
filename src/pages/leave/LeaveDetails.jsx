import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useLeave } from "../../context/LeaveContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { leaves } = useLeave();


  const leave = useMemo(() => {
    return leaves.find(
      (item) => item.id === Number(id)
    );
  }, [id, leaves]);

  if (!leave) {
    return (
      <div className="text-center py-12">
        <p className="text-on-surface text-lg">Leave Application Not Found</p>
        <Button onClick={() => navigate("/leave")} className="mt-4">
          Back to Leave
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="TIME OFF"
        title="Leave Details"
        description="View your complete leave application"
      />

      {/* Leave Information Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-on-surface">Application Details</h3>
          <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
            leave.status === 'Approved' ? 'bg-primary/20 text-primary' :
            leave.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
            'bg-red-500/20 text-red-500'
          }`}>
            {leave.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Application ID</p>
            <p className="text-lg font-semibold text-on-surface">{leave.id}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Applied On</p>
            <p className="text-lg font-semibold text-on-surface">{leave.appliedOn}</p>
          </div>
        </div>
      </div>

      {/* Travel Details Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Travel Details</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-on-surface-variant text-sm mb-2">From Date</p>
            <p className="text-lg font-semibold text-on-surface">{leave.from}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-2">To Date</p>
            <p className="text-lg font-semibold text-on-surface">{leave.to}</p>
          </div>
          <div className="col-span-2">
            <p className="text-on-surface-variant text-sm mb-2">Destination</p>
            <p className="text-lg font-semibold text-on-surface">{leave.destination}</p>
          </div>
        </div>
      </div>

      {/* Reason Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-lg font-bold text-on-surface mb-3">Reason for Leave</h3>
        <p className="text-on-surface-variant leading-relaxed">{leave.reason}</p>
      </div>

      {/* Emergency Information Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Emergency Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-on-surface-variant text-sm mb-2">Emergency Contact</p>
            <p className="text-lg font-semibold text-on-surface">{leave.emergencyContact}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-2">Transport Mode</p>
            <p className="text-lg font-semibold text-on-surface">{leave.transport}</p>
          </div>
        </div>
      </div>

      {/* Warden Remarks Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-lg font-bold text-on-surface mb-3">Warden Remarks</h3>
        <p className="text-on-surface-variant">{leave.remarks || "No remarks yet"}</p>
      </div>

      {/* Timeline Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Application Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-semibold text-on-surface">Application Submitted</p>
              <p className="text-sm text-on-surface-variant">{leave.appliedOn}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${leave.status !== 'Pending' ? '✅' : '⏳'}`}></div>
            <div>
              <p className="font-semibold text-on-surface">Warden Review</p>
              <p className="text-sm text-on-surface-variant">{leave.status !== 'Pending' ? 'Completed' : 'In Progress'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${leave.status !== 'Pending' ? '✅' : '⏳'}`}></div>
            <div>
              <p className="font-semibold text-on-surface">Final Decision</p>
              <p className="text-sm text-on-surface-variant">{leave.status !== 'Pending' ? `${leave.status}` : 'Awaiting'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <Button variant="secondary" onClick={() => navigate("/leave")} className="w-full justify-center">
        Back to Leave Dashboard
      </Button>
    </div>
  );
};

export default LeaveDetails;