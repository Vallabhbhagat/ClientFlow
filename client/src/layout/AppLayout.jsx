import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ navItems, title, onLogout, children }) {
  return (
    <div className="app-shell">
      <Sidebar items={navItems} />
      <div className="app-main">
        <Navbar title={title} onLogout={onLogout} />
        <main className="app-content">
          <div className="content-inner">{children}</div>
        </main>
      </div>
    </div>
  );
}

