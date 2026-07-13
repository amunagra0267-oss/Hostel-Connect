import React from "react";

/**
 * Pill status badge — 15% opacity background of the status color,
 * fully opaque text, per DESIGN.md "Badges/Chips" spec.
 */
const STATUS_STYLES = {
  approved: "bg-success/15 text-success",
  active: "bg-success/15 text-success",
  read: "bg-success/15 text-success",
  resolved: "bg-success/15 text-success",
  completed: "bg-success/15 text-success",
  good: "bg-success/15 text-success",

  pending: "bg-warning/15 text-warning",
  upcoming: "bg-warning/15 text-warning",
  unread: "bg-warning/15 text-warning",
  "in progress": "bg-warning/15 text-warning",
  inprogress: "bg-warning/15 text-warning",

  rejected: "bg-danger/15 text-danger",
  cancelled: "bg-danger/15 text-danger",
  overdue: "bg-danger/15 text-danger",

  default: "bg-tertiary/15 text-tertiary",
};

const Badge = ({ children, tone }) => {
  const key = (tone ?? String(children)).toString().toLowerCase().trim();
  const style = STATUS_STYLES[key] ?? STATUS_STYLES.default;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-label-sm text-label-sm ${style}`}
    >
      {children}
    </span>
  );
};

export default Badge;
