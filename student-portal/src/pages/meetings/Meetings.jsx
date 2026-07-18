import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useMeeting } from "../../context/MeetingContext";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Icon from "../../components/icons/Icon";

const Meetings = () => {
  const navigate = useNavigate();
  const { meetings } = useMeeting();

  const totalMeetings = useMemo(() => meetings.length, [meetings]);

  return (
    <div>
      <PageHeader
        eyebrow="Community"
        title="Hostel Meetings"
        description={`${totalMeetings} scheduled meeting${totalMeetings === 1 ? "" : "s"}`}
      />

      {meetings.length === 0 ? (
        <EmptyState
          icon="groups"
          title="No meetings scheduled"
          description="Hostel meetings will appear here once announced."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-surface border border-outline-variant rounded-lg p-unit-lg flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="groups" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface">
                      {meeting.title}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {meeting.venue}
                    </p>
                  </div>
                </div>
                <Badge>{meeting.status}</Badge>
              </div>

              <div className="flex items-center gap-4 font-body-md text-body-md text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <Icon name="calendar_today" size={16} />
                  {meeting.date}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="schedule" size={16} />
                  {meeting.time}
                </span>
              </div>

              <Button
                variant="secondary"
                onClick={() => navigate(`/meetings/${meeting.id}`)}
                className="w-full justify-center"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meetings;
