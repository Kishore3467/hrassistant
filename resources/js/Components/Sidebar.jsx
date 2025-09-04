import React from "react";
import { Link, useLocation } from "react-router-dom";

const Item = ({ to, icon, label }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <li className={`sb-item ${active ? "active" : ""}`}>
      <Link to={to}>
        <span className="sb-ico" aria-hidden>{icon}</span>
        <span className="sb-label">{label}</span>
      </Link>
    </li>
  );
};

export default function Sidebar() {
  return (
    <aside className="sidebar1">
      <div className="sb-logo">
        <div className="logo-dot" />
      </div>

      <ul className="sb-list">
        <Item to="/dashboard" label="Home" icon="🏠" />
        <Item to="/onboarding" label="Onboarding" icon="🤝" />
        <Item to="/attendance" label="Attendance" icon="⏱️" />
        <li className="sb-divider" />
        <Item to="/leavepolicy" label="Leave Tracker" icon="🌴" />
        <Item to="/settings" label="Time Tracker" icon="🕒" />
        <Item to="/settings" label="Performance" icon="🏆" />
        <li className="sb-divider" />
        <Item to="/settings" label="More" icon="⋯" />
        <Item to="/settings" label="Operations" icon="🛠️" />
        <Item to="/settings" label="Reports" icon="📊" />
      </ul>
    </aside>
  );
}
