import React from "react";

const NoticeCard = ({ title, date, showDate = true }) => {
  return (
    <div className="py-2">
      <h3 className="font-medium">{title}</h3>
      {showDate && <small className="text-sm text-on-surface-variant">{date}</small>}
      <hr className="mt-2" />
    </div>
  );
};

export default NoticeCard;