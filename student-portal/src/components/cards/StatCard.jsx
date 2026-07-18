import React from "react";
import Icon from "../icons/Icon";

const StatCard = ({ title, value, status, icon = "insights" }) => {
  return (
    <div className="bg-surface border border-outline-variant rounded-lg p-unit-md flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon name={icon} className="text-primary" size={22} />
      </div>
      <div>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
          {title}
        </p>
        <p className="font-headline-sm text-headline-sm text-on-surface">
          {value}
        </p>
        {status && (
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
