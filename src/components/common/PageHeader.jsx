import React from "react";

const PageHeader = ({ eyebrow, title, description, actions }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-unit-lg">
      <div>
        {eyebrow && (
          <p className="font-eyebrow text-eyebrow text-primary mb-1 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-headline-lg text-headline-lg text-on-surface">
          {title}
        </h1>
        {description && (
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
};

export default PageHeader;
