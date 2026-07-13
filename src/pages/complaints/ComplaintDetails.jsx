import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useComplaint } from "../../context/ComplaintContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { complaints } = useComplaint();


  const complaint = useMemo(() => {
    return complaints.find(
      (item) => item.id === Number(id)
    );
  }, [complaints, id]);


  if (!complaint) {
    return (
      <div className="text-center py-12">
        <p className="text-on-surface text-lg">Complaint Not Found</p>
        <Button onClick={() => navigate("/complaints")} className="mt-4">
          Back to Complaints
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="MAINTENANCE"
        title="Complaint Details"
        description="View your complaint status and updates"
      />

      {/* Complaint Information Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold text-on-surface">{complaint.title}</h3>
          <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
            complaint.status === 'Resolved' ? 'bg-primary/20 text-primary' :
            complaint.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-500' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {complaint.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Complaint ID</p>
            <p className="text-lg font-semibold text-on-surface">{complaint.id}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Category</p>
            <p className="text-lg font-semibold text-on-surface">{complaint.category}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Priority</p>
            <p className="text-lg font-semibold text-on-surface">{complaint.priority}</p>
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Created On</p>
            <p className="text-lg font-semibold text-on-surface">{complaint.createdAt}</p>
          </div>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-lg font-bold text-on-surface mb-3">Description</h3>
        <p className="text-on-surface-variant leading-relaxed">{complaint.description}</p>
      </div>

      {/* Worker Assignment Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-lg font-bold text-on-surface mb-4">Worker Assignment</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="person" className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-lg font-semibold text-on-surface">Rajesh Kumar</p>
            <p className="text-sm text-on-surface-variant">Maintenance Worker</p>
          </div>
        </div>
      </div>

      {/* Expected Completion Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-lg font-bold text-on-surface mb-3">Expected Completion</h3>
        <div className="flex items-center gap-3">
          <Icon name="schedule" className="text-primary" size={24} />
          <div>
            <p className="text-lg font-semibold text-on-surface">Tomorrow Evening</p>
            <p className="text-sm text-on-surface-variant">Estimated completion time</p>
          </div>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <h3 className="text-xl font-bold text-on-surface mb-6">Timeline</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <p className="font-semibold text-on-surface">Complaint Raised</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <p className="font-semibold text-on-surface">Assigned to Worker</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${complaint.status === 'In Progress' || complaint.status === 'Resolved' ? '✅' : '⏳'}`}></div>
            <p className={`font-semibold ${complaint.status === 'In Progress' || complaint.status === 'Resolved' ? 'text-on-surface' : 'text-on-surface-variant'}`}>
              In Progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${complaint.status === 'Resolved' ? '✅' : '⏳'}`}></div>
            <p className={`font-semibold ${complaint.status === 'Resolved' ? 'text-on-surface' : 'text-on-surface-variant'}`}>
              Resolved
            </p>
          </div>
        </div>
      </div>

      {/* Photo Section */}
      {complaint.photo && (
        <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
          <h3 className="text-lg font-bold text-on-surface mb-3">Uploaded Photo</h3>
          <p className="text-on-surface-variant">{complaint.photo}</p>
        </div>
      )}

      {/* Back Button */}
      <Button variant="secondary" onClick={() => navigate("/complaints")} className="w-full justify-center">
        Back to Complaints
      </Button>
    </div>
  );
};

export default ComplaintDetails;