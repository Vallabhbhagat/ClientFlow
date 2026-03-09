import React from "react";

export default function EmptyStateIllustration({ title, subtitle }) {
  return (
    <div className="empty">
      <div className="empty-art" aria-hidden="true">
        <svg viewBox="0 0 640 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="40" y1="40" x2="560" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7C5CFF" stopOpacity="0.9" />
              <stop offset="0.55" stopColor="#22D3EE" stopOpacity="0.65" />
              <stop offset="1" stopColor="#22C55E" stopOpacity="0.35" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <circle cx="180" cy="160" r="86" fill="url(#g1)" filter="url(#blur)" opacity="0.75" />
          <circle cx="420" cy="140" r="64" fill="url(#g1)" filter="url(#blur)" opacity="0.55" />
          <rect x="140" y="120" width="360" height="160" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
          <rect x="170" y="150" width="220" height="18" rx="9" fill="rgba(255,255,255,0.18)" />
          <rect x="170" y="182" width="280" height="12" rx="6" fill="rgba(255,255,255,0.12)" />
          <rect x="170" y="206" width="250" height="12" rx="6" fill="rgba(255,255,255,0.10)" />
          <rect x="170" y="230" width="190" height="12" rx="6" fill="rgba(255,255,255,0.10)" />
        </svg>
      </div>
      <div className="empty-text">
        {title ? <div className="empty-title">{title}</div> : null}
        {subtitle ? <div className="empty-subtitle">{subtitle}</div> : null}
      </div>
    </div>
  );
}

