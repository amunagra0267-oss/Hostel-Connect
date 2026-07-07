import React from "react";
import Button from "../common/Button";

const QuickActionCard = ({
  title,
  onClick,
}) => {
  return (
    <Button variant="primary" onClick={onClick} className="mb-2 mr-2">
      {title}
    </Button>
  );
};

export default QuickActionCard;