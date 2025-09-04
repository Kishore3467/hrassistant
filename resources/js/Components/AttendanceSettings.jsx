import React, { useState } from "react";
import AttendanceManagement from "./AttendanceManagement";
import "./AttendanceSetting.css";
import Topbar from "./Topbar";

export default function AttendanceSettings() {
  const [settings, setSettings] = useState({
    regularization: false,
    onDuty: false,
    hourlyPermission: false,
    breakTime: false,
    kiosk: false,
    officeInRemoteIn: false,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Topbar />
      <div className="attendance-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="sidebar-title">Configuration</h2>
          <ul className="sidebar-list">
            <li className="active">Methods</li>
            <li>Attendance Policy</li>
            <li>Overtime Policies</li>
            <li>Check In and Check Out</li>
            <li>Specific Policies</li>
            <li>Pay Period</li>
            <li>Reports</li>
            <li>FTP Plugin</li>
            <li>Additional Options</li>
          </ul>
        </aside>

        {/* Main Section */}
        <div className="main-wrapper">
          {/* HR View: show all employee attendance */}
          <AttendanceManagement />
        </div>
      </div>
    </>
  );
}
