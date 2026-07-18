import React, { useMemo } from "react";

import { useNotification } from "../../context/NotificationContext";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/icons/Icon";

const TYPE_ICON = {
  Complaint: "report_problem",
  Leave: "event_available",
  Notice: "campaign",
  Visitor: "badge",
  Meeting: "groups",
};

const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } =
    useNotification();

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  return (
    <div>
      <PageHeader
        eyebrow="Updates"
        title="Notifications"
        description={`${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
        actions={
          unreadCount > 0 && (
            <Button variant="secondary" icon={<Icon name="done_all" size={18} />} onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )
        }
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon="notifications"
          title="You're all caught up"
          description="New notifications will show up here."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-surface border rounded-lg p-unit-md flex items-start gap-4 ${
                notification.read ? "border-outline-variant" : "border-primary/40"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notification.read ? "bg-surface-container-high" : "bg-primary/15"
                }`}
              >
                <Icon
                  name={TYPE_ICON[notification.type] ?? "notifications"}
                  className={notification.read ? "text-on-surface-variant" : "text-primary"}
                  size={20}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="font-label-md text-label-md text-on-surface">
                    {notification.title}
                  </p>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {notification.time}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {notification.message}
                </p>

                <div className="flex items-center gap-4 mt-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    {notification.type}
                  </span>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="font-label-sm text-label-sm text-primary hover:underline"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="font-label-sm text-label-sm text-danger hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
