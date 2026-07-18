import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMeeting } from "../../context/MeetingContext";
import PageHeader from "../../components/common/PageHeader";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/icons/Icon";

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-outline-variant last:border-0">
    <Icon name={icon} className="text-on-surface-variant" size={20} />
    <div>
      <p className="font-label-sm text-label-sm text-on-surface-variant">{label}</p>
      <p className="font-label-md text-label-md text-on-surface">{value}</p>
    </div>
  </div>
);

const MeetingDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { meetings } = useMeeting();

  const meeting = useMemo(
    () => meetings.find((item) => item.id === Number(id)),
    [id, meetings]
  );

  if (!meeting) {
    return (
      <EmptyState
        icon="search_off"
        title="Meeting not found"
        description="This meeting may have been removed or rescheduled."
      />
    );
  }

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Community"
        title={meeting.title}
        actions={<Badge>{meeting.status}</Badge>}
      />

      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-unit-lg">
        <DetailRow icon="calendar_today" label="Date" value={meeting.date} />
        <DetailRow icon="schedule" label="Time" value={meeting.time} />
        <DetailRow icon="location_on" label="Venue" value={meeting.venue} />
        <DetailRow icon="person" label="Conducted By" value={meeting.conductedBy} />
      </div>

      <div className="bg-surface border border-outline-variant rounded-lg p-unit-lg mb-8">
        <p className="font-eyebrow text-eyebrow text-primary uppercase mb-2">
          Description
        </p>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {meeting.description}
        </p>
      </div>

      <Button
        variant="secondary"
        icon={<Icon name="arrow_back" size={18} />}
        onClick={() => navigate("/meetings")}
        className="w-full justify-center"
      >
        Back to Meetings
      </Button>
    </div>
  );
};

export default MeetingDetails;
