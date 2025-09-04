import React, { useEffect, useState } from "react";
import "./LeaveStatus.css";

export default function LeaveStatus() {
  const [leaves, setLeaves] = useState({
    totalLeaves: 24,
    usedLeaves: 5,
  });

  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem("leaves")) || {};
    setLeaves(storedLeaves);
  }, []);

  const remainingLeaves = (leaves.totalLeaves || 24) - (leaves.usedLeaves || 0);

  return (
    <div className="leave-status card">
      <h3>Leave Status</h3>
      <p>Total Leaves: {leaves.totalLeaves}</p>
      <p>Used Leaves: {leaves.usedLeaves}</p>
      <p>Remaining Leaves: {remainingLeaves}</p>
    </div>
  );
}
