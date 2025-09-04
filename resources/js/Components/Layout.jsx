import React from "react";
import { NavLink } from "react-router-dom";
import "./LayoutShift.css";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <nav className="app-topnav">
        <ul>
          <li><NavLink to="/" className="app-tab">Shifts</NavLink></li>
          <li><NavLink to="/configuration" className="app-tab">Configuration</NavLink></li>
          <li><NavLink to="/approvals" className="app-tab">Approvals</NavLink></li>
          <li><NavLink to="/automation" className="app-tab">Automation</NavLink></li>
        </ul>
      </nav>

      <div className="app-container">
        {/* Sidebar */}
        <aside className="app-sidebar">
          <ul>
            <li><NavLink to="/general" className="app-side-link">General</NavLink></li>
            <li><NavLink to="/manage-shifts" className="app-side-link">Manage Shifts</NavLink></li>
            <li><NavLink to="/auto-shift" className="app-side-link">Auto Shift Assignment</NavLink></li>
            <li><NavLink to="/shift-patterns" className="app-side-link">Shift Patterns</NavLink></li>
          </ul>
        </aside>

        {/* Page Content */}
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}
