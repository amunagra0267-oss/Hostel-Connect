import React from "react";
import Icon from "../icons/Icon";

const EmptyState = ({ icon = "inbox", title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-surface border border-outline-variant rounded-lg">
      <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
        <Icon name={icon} className="text-on-surface-variant" size={28} />
      </div>
      <p className="font-headline-sm text-headline-sm text-on-surface mb-1">
        {title}
      </p>
      {description && (
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;
