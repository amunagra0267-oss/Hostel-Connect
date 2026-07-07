import React from "react";

const MeetingCard = ({
  title,
  date,
  time,
  venue,
}) => {
  return (
    <div>

      <h3>{title}</h3>

      <p>{date}</p>

      <p>{time}</p>

      <p>{venue}</p>

      <hr />

    </div>
  );
};

export default MeetingCard;