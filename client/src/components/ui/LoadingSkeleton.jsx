import React from "react";

export default function LoadingSkeleton({ lines = 3, className = "" }) {
  return (
    <div className={`skeleton ${className}`.trim()} aria-busy="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-line" />
      ))}
    </div>
  );
}

