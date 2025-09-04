import React, { useState } from "react";
import { FaChartLine, FaUsers } from "react-icons/fa";
import "./Performance.css";
 
export default function Performance() {
  const [teamMembers] = useState([
    { id: "EMP001", name: "John Doe", role: "Manager" },
    { id: "EMP002", name: "Jane Smith", role: "Supervisor" },
    { id: "EMP003", name: "Alex Johnson", role: "Team Lead" }
  ]);
 
  const [developmentGoals, setDevelopmentGoals] = useState([
    {
      id: 1,
      title: "Improve customer service skills",
      progress: 65,
      deadline: "2023-12-15",
      assignedBy: "Manager",
      assignedTo: ["EMP001", "EMP002"],
      status: "Processing",
      lastUpdated: "2023-11-10"
    },
    {
      id: 2,
      title: "Complete product knowledge training",
      progress: 0,
      deadline: "2024-01-10",
      assignedBy: "Supervisor",
      assignedTo: ["EMP002"],
      status: "Not Started",
      lastUpdated: "2023-11-05"
    },
    {
      id: 3,
      title: "Increase sales conversion rate",
      progress: 100,
      deadline: "2024-02-20",
      assignedBy: "Store Manager",
      assignedTo: ["EMP001", "EMP003"],
      status: "Completed",
      lastUpdated: "2023-11-12"
    }
  ]);
 
  const getAssignedMemberNames = (assignedIds) => {
    return teamMembers
      .filter(member => assignedIds.includes(member.id))
      .map(member => member.name)
      .join(", ");
  };
 
  const getStatusColor = (status) => {
    switch(status) {
      case "Not Started": return "#9ca3af";
      case "Processing": return "#f59e0b";
      case "Completed": return "#10b981";
      default: return "#9ca3af";
    }
  };
 
  // Map status to progress %
  const getProgressFromStatus = (status) => {
    switch(status) {
      case "Not Started": return 0;
      case "Processing": return 50;
      case "Completed": return 100;
      default: return 0;
    }
  };
 
  const handleStatusChange = (goalId, newStatus) => {
    setDevelopmentGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === goalId
          ? {
              ...goal,
              status: newStatus,
              progress: getProgressFromStatus(newStatus),
              lastUpdated: new Date().toISOString()
            }
          : goal
      )
    );
  };
 
  return (
    <div className="performance-container">
      <header className="performance-header">
        <h1><FaChartLine /> Performance Overview</h1>
        <p>Track your progress, assigned goals, and deadlines.</p>
      </header>
 
      <section className="performance-goals-section">
        <div className="goals-grid">
          {developmentGoals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <h3 className="goal-title">{goal.title}</h3>
                <div className="goal-meta">
                  <span className="goal-assigned">Assigned by: {goal.assignedBy}</span>
                  <select
                    className="goal-status"
                    style={{ backgroundColor: getStatusColor(goal.status) }}
                    value={goal.status}
                    onChange={(e) => handleStatusChange(goal.id, e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
             
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <div className="progress-info">
                  <span className="progress-text">{goal.progress}% Complete</span>
                  <span className="last-updated">Updated: {new Date(goal.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
             
              <div className="goal-footer">
                <div className="goal-assigned-members">
                  <FaUsers className="members-icon" />
                  <span className="members-text">
                    Working with: {getAssignedMemberNames(goal.assignedTo)}
                  </span>
                </div>
                <span className="deadline">
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}