import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useVisitor } from "../../context/VisitorContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import EmptyState from "../../components/common/EmptyState";
import StatCard from "../../components/cards/StatCard";
import Icon from "../../components/icons/Icon";

const Visitor = () => {
  const navigate = useNavigate();
  const { visitors } = useVisitor();

  const statistics = useMemo(() => {
    return {
      total: visitors.length,
      approved: visitors.filter((v) => v.status === "Approved").length,
      pending: visitors.filter((v) => v.status === "Pending").length,
      rejected: visitors.filter((v) => v.status === "Rejected").length,
    };
  }, [visitors]);

  return (
    <div>
      <PageHeader
        eyebrow="Access Management"
        title="Visitor Pass Dashboard"
        description="Track and manage passes requested for your guests."
        actions={
          <Button
            icon={<Icon name="add" size={18} />}
            onClick={() => navigate("/request-visitor")}
          >
            Request Visitor Pass
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-unit-lg">
        <StatCard title="Total Requests" value={statistics.total} icon="groups" />
        <StatCard title="Approved" value={statistics.approved} icon="verified" />
        <StatCard title="Pending" value={statistics.pending} icon="hourglass_empty" />
        <StatCard title="Rejected" value={statistics.rejected} icon="block" />
      </div>

      {visitors.length === 0 ? (
        <EmptyState
          icon="badge"
          title="No visitor passes yet"
          description="Requests you raise for guests will show up here."
        />
      ) : (
        <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
          <div className="px-unit-md py-4 border-b border-outline-variant">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Recent Requests
            </h2>
          </div>

          <div className="divide-y divide-outline-variant">
            {visitors.map((visitor) => (
              <div
                key={visitor.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-unit-md py-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                    <Icon name="person" className="text-on-surface-variant" size={20} />
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">
                      {visitor.name}{" "}
                      <span className="text-on-surface-variant font-body-md text-body-md">
                        · {visitor.relation}
                      </span>
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {visitor.date} at {visitor.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge>{visitor.status}</Badge>
                  <button
                    onClick={() => navigate(`/visitor/${visitor.id}`)}
                    className="font-label-md text-label-md text-primary hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitor;
