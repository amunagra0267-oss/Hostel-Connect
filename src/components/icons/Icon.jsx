import React from "react";

const Icon = ({ name, className = "", size, filled = false }) => {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size ? `${size}px` : undefined,
        fontVariationSettings: `"FILL" ${filled ? 1 : 0}, "wght" 400, "GRAD" 0, "opsz" 24`,
      }}
    >
      {name}
    </span>
  );
};

export default Icon;
