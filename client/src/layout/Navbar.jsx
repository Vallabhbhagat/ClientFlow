import React from "react";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import AnimatedButton from "../components/ui/AnimatedButton";

function getTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function setTheme(next) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("clientflow.theme", next);
  } catch {
    // ignore
  }
}

export function initThemeFromStorage() {
  try {
    const stored = localStorage.getItem("clientflow.theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      return;
    }
  } catch {
    // ignore
  }
  // Default: dark
  setTheme("dark");
}

export default function Navbar({ title, onLogout }) {
  const [theme, setThemeState] = React.useState(() => getTheme());

  React.useEffect(() => {
    initThemeFromStorage();
    setThemeState(getTheme());
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    setThemeState(next);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">{title}</div>
      </div>

      <div className="topbar-right">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <FiMoon /> : <FiSun />}
        </button>
        <AnimatedButton variant="ghost" size="sm" onClick={onLogout}>
          <FiLogOut style={{ marginRight: 8 }} />
          Logout
        </AnimatedButton>
      </div>
    </header>
  );
}

