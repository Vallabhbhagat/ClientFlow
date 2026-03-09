import React from "react";
import { NavLink } from "react-router-dom";
import { FiGrid, FiUsers, FiFolder, FiCheckSquare, FiBarChart2 } from "react-icons/fi";

const ICONS = {
  dashboard: FiGrid,
  clients: FiUsers,
  projects: FiFolder,
  tasks: FiCheckSquare,
  insights: FiBarChart2,
};

export default function Sidebar({ items, brand = "ClientFlow" }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark" aria-hidden="true" />
        <div className="brand-text">
          <div className="brand-name">{brand}</div>
          <div className="brand-sub">Workflow Intelligence</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = ICONS[item.icon] || FiGrid;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`.trim()
              }
              end
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-hint">
          Tip: Use Insights to spot margin + risk early.
        </div>
      </div>
    </aside>
  );
}

