import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useVisitor } from "../../context/VisitorContext";
import PageHeader from "../../components/common/PageHeader";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/icons/Icon";

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-outline-variant last:border-0">
    <span className="font-body-md text-body-md text-on-surface-variant">{label}</span>
    <span className="font-label-md text-label-md text-on-surface">{value}</span>
  </div>
);

const VisitorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { visitors } = useVisitor();

  const visitor = useMemo(
    () => visitors.find((item) => item.id === Number(id)),
    [id, visitors]
  );

  if (!visitor) {
    return (
      <EmptyState
        icon="search_off"
        title="Visitor request not found"
        description="This pass may have been removed."
      />
    );
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Access Management"
        title="Visitor Pass Details"
        actions={<Badge>{visitor.status}</Badge>}
      />

      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-unit-lg">
        <DetailRow label="Visitor Name" value={visitor.name} />
        <DetailRow label="Relation" value={visitor.relation} />
        <DetailRow label="Phone" value={visitor.phone} />
        <DetailRow label="Visit Date" value={visitor.date} />
        <DetailRow label="Visit Time" value={visitor.time} />
        <DetailRow label="Purpose" value={visitor.purpose} />
      </div>

      {/* Digital Pass */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/15 to-surface border border-primary/30 rounded-lg p-unit-lg mb-8">
        <p className="font-eyebrow text-eyebrow text-primary uppercase mb-3">
          Digital Visitor Pass
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-headline-sm text-headline-sm text-on-surface">
              {visitor.name}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {visitor.date} · {visitor.time}
            </p>
          </div>
          <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center">
            <Icon name="qr_code_2" className="text-on-surface" size={36} />
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Badge>{visitor.status}</Badge>
          <Button
            variant="secondary"
            icon={<Icon name="download" size={18} />}
            onClick={() => window.print()}
          >
            Download Pass
          </Button>
        </div>
      </div>

      <Button
        variant="secondary"
        icon={<Icon name="arrow_back" size={18} />}
        onClick={() => navigate("/visitor")}
        className="w-full justify-center"
      >
        Back to Visitor Pass Dashboard
      </Button>
    </div>
  );
};

export default VisitorDetails;
