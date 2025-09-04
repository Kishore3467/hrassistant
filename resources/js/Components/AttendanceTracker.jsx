import React, { useEffect, useState } from "react";
import "./AttendanceTracker.css";

export default function AttendanceTracker() {
  const [attendance, setAttendance] = useState({
    presentDays: 0,
    absentDays: 0,
    leavesTaken: 0,
  });

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendance(storedAttendance);
  }, []);

  return (
    <div className="attendance-tracker card">
      <h3>Attendance</h3>
      <div className="stats">
        <div>
          <strong>{attendance.presentDays || 20}</strong>
          <span>Present</span>
        </div>
        <div>
          <strong>{attendance.absentDays || 2}</strong>
          <span>Absent</span>
        </div>
        <div>
          <strong>{attendance.leavesTaken || 1}</strong>
          <span>Leaves</span>
        </div>
      </div>
    </div>
  );
}
