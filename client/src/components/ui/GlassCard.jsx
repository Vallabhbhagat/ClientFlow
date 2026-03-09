import React from "react";

export default function GlassCard({
  as: As = "div",
  className = "",
  children,
  ...props
}) {
  return (
    <As
      className={`glass-card ${className}`.trim()}
      {...props}
    >
      {children}
    </As>
  );
}

