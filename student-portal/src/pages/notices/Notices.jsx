import React, { useMemo, useState } from "react";

import { useNotice } from "../../context/NoticeContext";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/icons/Icon";

const Notices = () => {
  const { notices, markAsRead } = useNotice();
  const [search, setSearch] = useState("");

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) =>
      notice.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, notices]);

  return (
    <div>
      <PageHeader
        eyebrow="Community"
        title="Hostel Notices"
        actions={<SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notice..." />}
      />

      {filteredNotices.length === 0 ? (
        <EmptyState
          icon="campaign"
          title="No notices found"
          description="Try a different search, or check back later."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-surface border rounded-lg p-unit-md flex items-start gap-4 ${
                notice.important ? "border-primary/40" : "border-outline-variant"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notice.important ? "bg-primary/15" : "bg-surface-container-high"
                }`}
              >
                <Icon
                  name={notice.important ? "priority_high" : "campaign"}
                  className={notice.important ? "text-primary" : "text-on-surface-variant"}
                  size={20}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    {notice.title}
                  </p>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {notice.date}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {notice.description}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  {notice.important && (
                    <span className="font-label-sm text-label-sm text-primary flex items-center gap-1">
                      <Icon name="push_pin" size={14} />
                      Important
                    </span>
                  )}
                  {!notice.read && (
                    <button
                      onClick={() => markAsRead(notice.id)}
                      className="font-label-sm text-label-sm text-primary hover:underline"
                    >
                      Mark as Read
                    </button>
                  )}
                  {notice.read && (
                    <span className="font-label-sm text-label-sm text-success flex items-center gap-1">
                      <Icon name="check_circle" size={14} />
                      Read
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notices;
