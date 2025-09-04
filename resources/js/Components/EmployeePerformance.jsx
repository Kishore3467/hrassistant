// File: EmployeePerformance.jsx
import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import "./EmployeePerformance.css";

const EmployeePerformance = () => {
  const [companyId, setCompanyId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [performanceData, setPerformanceData] = useState({}); // { employeeName: [{ score, review, date }] }
  const [rewardsData, setRewardsData] = useState({}); // { employeeName: { monthly: [], yearly: [], goals: [] } }

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [score, setScore] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setCompanyId(currentUser.email);

      const storedEmployees =
        JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || [];
      setEmployees(storedEmployees);

      const storedPerformance =
        JSON.parse(localStorage.getItem(`performance_${currentUser.email}`)) || {};
      setPerformanceData(storedPerformance);

      const storedRewards =
        JSON.parse(localStorage.getItem(`rewards_${currentUser.email}`)) || {};
      setRewardsData(storedRewards);
    }
  }, []);

  const savePerformance = (updated) => {
    setPerformanceData(updated);
    if (companyId) {
      localStorage.setItem(`performance_${companyId}`, JSON.stringify(updated));
    }
  };

  const saveRewards = (updated) => {
    setRewardsData(updated);
    if (companyId) {
      localStorage.setItem(`rewards_${companyId}`, JSON.stringify(updated));
    }
  };

  const handleAddPerformance = () => {
    if (!selectedEmployee) {
      alert("⚠️ Select an employee");
      return;
    }
    if (!score) {
      alert("⚠️ Enter score");
      return;
    }

    const newPerformance = {
      score,
      review,
      date: new Date().toLocaleDateString(),
    };

    const updated = {
      ...performanceData,
      [selectedEmployee]: [...(performanceData[selectedEmployee] || []), newPerformance],
    };

    savePerformance(updated);

    // Optional: check for "Best Employee" rewards
    const employeeScores = updated[selectedEmployee].map((e) => parseInt(e.score));
    const avgScore =
      employeeScores.reduce((sum, s) => sum + s, 0) / employeeScores.length;

    const updatedRewards = {
      ...rewardsData,
      [selectedEmployee]: {
        monthly: avgScore >= 85 ? ["Best Employee of the Month"] : [],
        yearly: avgScore >= 90 ? ["Best Employee of the Year"] : [],
        goals: avgScore >= 80 ? ["Goal Achieved"] : [],
      },
    };

    saveRewards(updatedRewards);

    setScore("");
    setReview("");
  };

  return (
    <div className="employee-performance-page">
      <Topbar />

      <div className="performance-layout">
        {/* Sidebar */}
        <aside className="performance-sidebar">
          <h3>Employees</h3>
          <ul>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <li
                  key={emp.id}
                  className={selectedEmployee === emp.name ? "active" : ""}
                  onClick={() => setSelectedEmployee(emp.name)}
                >
                  {emp.name}
                </li>
              ))
            ) : (
              <li className="empty-msg">
                No employees found. Add employees to see performance.
              </li>
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="performance-content">
          {selectedEmployee ? (
            <>
              <h2>Performance for {selectedEmployee}</h2>

              {/* Add Performance Entry */}
              <div className="add-performance">
                <input
                  type="number"
                  placeholder="Score (0-100)"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  min="0"
                  max="100"
                />
                <textarea
                  placeholder="Review / Comments"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <button onClick={handleAddPerformance}>Add Performance</button>
              </div>

              {/* Performance List */}
              <div className="performance-list">
                {performanceData[selectedEmployee]?.length > 0 ? (
                  <ul>
                    {performanceData[selectedEmployee].map((entry, idx) => (
                      <li key={idx}>
                        <strong>Score:</strong> {entry.score} |{" "}
                        <strong>Date:</strong> {entry.date}
                        {entry.review && <p>{entry.review}</p>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-msg">
                    <p>No performance records yet.</p>
                    <p>📌 Tip: Add a score and review for this employee.</p>
                  </div>
                )}
              </div>

              {/* Rewards / Goals */}
              <div className="rewards-section">
                <h3>Achievements & Goals</h3>
                {rewardsData[selectedEmployee] ? (
                  <ul>
                    {rewardsData[selectedEmployee].monthly?.map((r, i) => (
                      <li key={i}>🏆 {r}</li>
                    ))}
                    {rewardsData[selectedEmployee].yearly?.map((r, i) => (
                      <li key={i}>🥇 {r}</li>
                    ))}
                    {rewardsData[selectedEmployee].goals?.map((g, i) => (
                      <li key={i}>🎯 {g}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-msg">
                    No achievements yet. Performance above 80 triggers rewards!
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="empty-msg">
              <p>Select an employee to view performance data.</p>
              <p>💡 Tip: Track scores, give rewards, and set goals for employee growth.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeePerformance;
