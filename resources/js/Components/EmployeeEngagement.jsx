// File: EmployeeEngagement.jsx
import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import "./EmployeeEngagement.css";

const EmployeeEngagement = () => {
  const [companyId, setCompanyId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [engagements, setEngagements] = useState({}); // { employeeName: [{title, date, notes}] }

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [engagementTitle, setEngagementTitle] = useState("");
  const [engagementNotes, setEngagementNotes] = useState("");

  // Load company & employees
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setCompanyId(currentUser.email);

      const storedEmployees =
        JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || [];
      setEmployees(storedEmployees);

      const storedEngagements =
        JSON.parse(localStorage.getItem(`engagements_${currentUser.email}`)) || {};
      setEngagements(storedEngagements);
    }
  }, []);

  // Save engagements to localStorage
  const saveEngagements = (updated) => {
    setEngagements(updated);
    if (companyId) {
      localStorage.setItem(`engagements_${companyId}`, JSON.stringify(updated));
    }
  };

  // Add new engagement
  const handleAddEngagement = () => {
    if (!selectedEmployee) {
      alert("⚠️ Select an employee");
      return;
    }
    if (!engagementTitle) {
      alert("⚠️ Enter engagement title");
      return;
    }

    const newEngagement = {
      title: engagementTitle,
      notes: engagementNotes,
      date: new Date().toLocaleDateString(),
    };

    const updated = {
      ...engagements,
      [selectedEmployee]: [...(engagements[selectedEmployee] || []), newEngagement],
    };

    saveEngagements(updated);
    setEngagementTitle("");
    setEngagementNotes("");
  };

  return (
    <div className="employee-engagement-page">
      <Topbar />

      <div className="engagement-layout">
        {/* Sidebar */}
        <aside className="engagement-sidebar">
          <h3>Employees</h3>
          <ul>
            {employees.map((emp) => (
              <li
                key={emp.id}
                className={selectedEmployee === emp.name ? "active" : ""}
                onClick={() => setSelectedEmployee(emp.name)}
              >
                {emp.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="engagement-content">
          {selectedEmployee ? (
            <>
              <h2>Engagements for {selectedEmployee}</h2>

              {/* Add Engagement */}
              <div className="add-engagement">
                <input
                  type="text"
                  placeholder="Engagement Title"
                  value={engagementTitle}
                  onChange={(e) => setEngagementTitle(e.target.value)}
                />
                <textarea
                  placeholder="Notes / Details"
                  value={engagementNotes}
                  onChange={(e) => setEngagementNotes(e.target.value)}
                />
                <button onClick={handleAddEngagement}>Add Engagement</button>
              </div>

              {/* List Engagements */}
              <div className="engagement-list">
                {engagements[selectedEmployee]?.length > 0 ? (
                  <ul>
                    {engagements[selectedEmployee].map((e, idx) => (
                      <li key={idx}>
                        <strong>{e.title}</strong> <em>({e.date})</em>
                        <p>{e.notes}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-msg">No engagements yet.</p>
                )}
              </div>
            </>
          ) : (
            <p>Select an employee to view engagements.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeEngagement;
