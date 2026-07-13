import React from "react";

const ComplaintCard = ({
  category,
  status,
  createdAt,
}) => {
  return (
    <div>

      <h3>{category}</h3>

      <p>Status : {status}</p>

      <p>Created : {createdAt}</p>

      <hr />

    </div>
  );
};

export default ComplaintCard;