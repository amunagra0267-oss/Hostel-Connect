import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useLeave } from "../../context/LeaveContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const Leave = () => {
  const navigate = useNavigate();

  const { leaves } = useLeave();

  const statistics = useMemo(() => {
    return {
      total: leaves.length,

      approved: leaves.filter(
        (leave) => leave.status === "Approved"
      ).length,

      pending: leaves.filter(
        (leave) => leave.status === "Pending"
      ).length,

      rejected: leaves.filter(
        (leave) => leave.status === "Rejected"
      ).length,
    };
  }, [leaves]);

  return (
    <div>
      <PageHeader
        eyebrow="TIME OFF"
        title="Leave Dashboard"
        description="Manage your leave requests and approvals"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">Total</p>
          <p className="text-3xl font-bold text-primary">{statistics.total}</p>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">Approved</p>
          <p className="text-3xl font-bold text-primary">{statistics.approved}</p>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">Pending</p>
          <p className="text-3xl font-bold text-primary">{statistics.pending}</p>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">Rejected</p>
          <p className="text-3xl font-bold text-primary">{statistics.rejected}</p>
        </div>
      </div>

      {/* Apply Leave Button */}
      <div className="mb-8">
        <Button 
          onClick={() => navigate("/apply-leave")}
          icon={<Icon name="add" size={18} />}
        >
          Apply Leave
        </Button>
      </div>

      {/* Leave Requests */}
      <div>
        <h3 className="text-xl font-bold text-on-surface mb-4">Your Leave Requests</h3>
        <div className="space-y-3">
          {leaves.map((leave) => (
            <div key={leave.id} className="bg-surface border border-outline-variant rounded-lg p-unit-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-on-surface">{leave.destination}</h4>
                  <p className="text-on-surface-variant text-sm">{leave.from} - {leave.to}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  leave.status === 'Approved' ? 'bg-primary/20 text-primary' :
                  leave.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {leave.status}
                </span>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate(`/leave/${leave.id}`)}
                className="w-full justify-center"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leave;