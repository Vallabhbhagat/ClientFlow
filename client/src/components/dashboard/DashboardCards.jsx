import React from "react";
import GlassCard from "../ui/GlassCard";

export default function DashboardCards({ stats }) {
  return (
    <div className="grid grid-4">
      {stats.map((s) => (
        <GlassCard key={s.label} className="stat-card">
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
          {s.hint ? <div className="stat-hint">{s.hint}</div> : null}
        </GlassCard>
      ))}
    </div>
  );
}

