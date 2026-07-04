import React from "react";

const VARIANTS = {
  primary:
    "bg-primary hover:bg-primary/90 text-black font-semibold disabled:bg-primary/60",
  secondary:
    "bg-surface-container-low border border-outline-variant text-on-surface hover:border-primary hover:text-primary",
  danger:
    "bg-danger/10 border border-danger text-danger hover:bg-danger/20",
  ghost: "bg-transparent text-on-surface-variant hover:text-primary hover:bg-surface-container-low",
};

const Button = ({
  children,
  variant = "primary",
  icon,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-label-md text-label-md transition-colors ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
