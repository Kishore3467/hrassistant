// LeaveBalance.jsx
import React, { useState } from "react";
import "./LeaveBalance.css";

const LeaveBalance = () => {
  const [isOpen, setIsOpen] = useState(true);

  const leaveData = [
    { type: "Casual Leave", available: 10, booked: 2, remaining: 8 },
    { type: "Earned Leave", available: 12, booked: 0, remaining: 12 },
    { type: "Sick Leave", available: 12, booked: 0, remaining: 12 },
    { type: "Leave Without Pay", available: 0, booked: 0, remaining: 0 },
    { type: "Paternity Leave", available: 0, booked: 0, remaining: 0 },
    { type: "Sabbatical Leave", available: 0, booked: 0, remaining: 0 },
  ];

  if (!isOpen) return null; // 🔥 hides component when closed

  return (
    <div className="leave-management-modal">
      <div className="leave-management-content">
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ✖
        </button>
        <h2>Leave Balance</h2>

        <table className="leave-table">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Available</th>
              <th>Booked</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr key={index}>
                <td>{leave.type}</td>
                <td>{leave.available}</td>
                <td>{leave.booked}</td>
                <td>{leave.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveBalance;
