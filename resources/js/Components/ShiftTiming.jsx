import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./ShiftTiming.css";

export default function ShiftTiming() {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/shifts") // Laravel API endpoint
      .then((res) => res.json())
      .then((data) => setShifts(data))
      .catch((err) => console.error("Error fetching shifts:", err));
  }, []);

  return (
    <div className="shift-timing-container">
      <header className="shift-header">
        <h1>
          <FaCalendarAlt /> Shift Timing
        </h1>
        <p>View your upcoming work schedule</p>
      </header>

      <section className="shift-schedule-section">
        <div className="table-responsive">
          <table className="shift-table">
            <thead>
              <tr>
                <th className="text-left">Date</th>
                <th className="text-left">name</th>
                <th className="text-left">Shift Time</th>
                <th className="text-left">Role</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.date}</td>
                  <td>{shift.name}</td>
                  <td>{shift.time}</td>
                  <td>{shift.role}</td>
                  <td className="text-center">
                    <span className={`status-badge ${shift.status.toLowerCase()}`}>
                      {shift.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
