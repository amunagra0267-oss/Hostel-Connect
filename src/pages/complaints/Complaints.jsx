import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useComplaint } from "../../context/ComplaintContext";

import ComplaintCard from "../../components/cards/ComplaintCard";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const Complaints = () => {
  const navigate = useNavigate();

  const { complaints } = useComplaint();

  const statistics = useMemo(() => {
    return {
      total: complaints.length,

      resolved: complaints.filter(
        (c) => c.status === "Resolved"
      ).length,

      pending: complaints.filter(
        (c) => c.status === "Pending"
      ).length,

      inProgress: complaints.filter(
        (c) => c.status === "In Progress"
      ).length,
    };
  }, [complaints]);

  return (
    <div>
      <PageHeader
        eyebrow="MAINTENANCE"
        title="Complaint Dashboard"
        description="Track and manage your hostel complaints"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">Total</p>
          <p className="text-3xl font-bold text-primary">{statistics.total}</p>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">Resolved</p>
          <p className="text-3xl font-bold text-primary">{statistics.resolved}</p>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">In Progress</p>
          <p className="text-3xl font-bold text-primary">{statistics.inProgress}</p>
        </div>
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-md">
          <p className="text-on-surface-variant text-sm mb-2">Pending</p>
          <p className="text-3xl font-bold text-primary">{statistics.pending}</p>
        </div>
      </div>

      {/* Raise Complaint Button */}
      <div className="mb-8">
        <Button 
          onClick={() => navigate("/raise-complaint")}
          icon={<Icon name="add" size={18} />}
        >
          Raise Complaint
        </Button>
      </div>

      {/* Complaints List */}
      <div>
        <h3 className="text-xl font-bold text-on-surface mb-4">Your Complaints</h3>
        <div className="space-y-3">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="bg-surface border border-outline-variant rounded-lg p-unit-lg">
              <ComplaintCard
                category={complaint.title}
                status={complaint.status}
                createdAt={complaint.createdAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;