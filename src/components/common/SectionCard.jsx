import React from "react";

const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-surface-container p-4 rounded-md border border-outline-variant mb-6">
      {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default SectionCard;
