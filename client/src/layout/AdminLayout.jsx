import React, { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../services/authService";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ThreeBackground from "../components/three/ThreeBackground";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { to: "/admin-dashboard", label: "Dashboard", icon: "dashboard" },
      { to: "/clients", label: "Clients", icon: "clients" },
      { to: "/projects", label: "Projects", icon: "projects" },
      { to: "/tasks", label: "Tasks", icon: "tasks" },
      { to: "/project-insights", label: "Insights", icon: "insights" },
      { to: "/team", label: "Team", icon: "clients" },
    ],
    [],
  );

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } finally {
      navigate("/");
    }
  };

  const titleMap = {
    "/admin-dashboard": "Admin Dashboard",
    "/clients": "Clients",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/team": "Team members",
    "/project-insights": "Project Insights",
  };

  const title = titleMap[location.pathname] || "Admin";

  return (
    <div className="app-shell">
      <ThreeBackground />
      <Sidebar items={navItems} />
      <div className="app-main">
        <Navbar title={title} onLogout={handleLogout} />
        <main className="app-content">
          <div className="content-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

