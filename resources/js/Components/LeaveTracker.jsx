import React, { useState } from "react";
import LeaveManagement from "./LeaveManagement";
import LeaveBalance from "./LeaveBalance";

export default function LeaveTracker() {
  const [activeTab, setActiveTab] = useState("summary");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showApplyLeave, setShowApplyLeave] = useState(false);

  const leaves = [
    { type: "Casual Leave", available: 10, booked: 2 },
    { type: "Earned Leave", available: 12, booked: 0 },
    { type: "Sick Leave", available: 12, booked: 0 },
    { type: "Leave Without Pay", available: 0, booked: 0 },
    { type: "Paternity Leave", available: 0, booked: 0 },
    { type: "Sabbatical Leave", available: 0, booked: 0 },
  ];

  // Handle Leave Application Submit
  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    alert("✅ Leave request submitted successfully!");
    setShowApplyLeave(false);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Menu</h2>
        <a href="#">Home</a>
        <a href="#">Onboarding</a>
        <a href="#" className="active">Leave Tracker</a>
        <a href="#">Attendance</a>
        <a href="#">Time Tracker</a>
        <a href="#">Performance</a>
        <a href="#">Reports</a>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="tabs">
            <button onClick={() => setActiveTab("summary")} className={activeTab === "summary" ? "active" : ""}>Leave Summary</button>
            <button onClick={() => setActiveTab("balance")} className={activeTab === "balance" ? "active" : ""}>Leave Balance</button>
            <button onClick={() => setActiveTab("requests")} className={activeTab === "requests" ? "active" : ""}>Leave Requests</button>
            <button onClick={() => setActiveTab("shift")} className={activeTab === "shift" ? "active" : ""}>Shift</button>
          </div>
          <div>
            <button className="btn" onClick={() => setShowCalendar(true)}>📅</button>
            <button className="btn" onClick={() => setShowApplyLeave(true)}>Apply Leave</button>
          </div>
        </div>

        {/* Content per tab */}
        {activeTab === "summary" && (
          <div className="cards">
            {leaves.map((leave, i) => (
              <div key={i} className="card">
                <h3>{leave.type}</h3>
                <p>Available: {leave.available}</p>
                <p>Booked: {leave.booked}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "balance" && (
          <div className="section">
            <LeaveBalance />
          </div>
        )}

        {activeTab === "requests" && (
          <div className="section">
            <LeaveManagement />
          </div>
        )}

        {activeTab === "shift" && (
          <div className="section">Shift Page</div>
        )}
      </main>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="popup" onClick={() => setShowCalendar(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Calendar View</h3>
            <p>[Calendar Placeholder]</p>
            <button className="btn" onClick={() => setShowCalendar(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {showApplyLeave && (
        <div className="popup" onClick={() => setShowApplyLeave(false)}>
          <div className="popup-content" style={{ width: "600px" }} onClick={(e) => e.stopPropagation()}>
            <button className="btn close-btn" onClick={() => setShowApplyLeave(false)}>✖</button>
            <h3>Leave Application Form</h3>
            <form onSubmit={handleLeaveSubmit}>
              <label>Leave Type:</label>
              <select required>
                <option value="">-- Select --</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Paid Leave</option>
              </select>

              <label>From Date:</label>
              <input type="date" required />

              <label>To Date:</label>
              <input type="date" required />

              <label>Reason:</label>
              <textarea required></textarea>

              <button type="submit" className="btn">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        body { margin: 0; font-family: Arial, sans-serif; }
        .app { display: flex; }
        .sidebar {
          width: 220px;
          background: #1f2b6c;
          color: #fff;
          height: 100vh;
          padding-top: 10px;
        }
        .sidebar h2 { text-align: center; }
        .sidebar a { display: block; padding: 12px 20px; color: #fff; text-decoration: none; }
        .sidebar a:hover, .sidebar a.active { background: #2f3d8a; }
        .main { flex: 1; padding: 20px; background: #f7f9fc; min-height: 100vh; }
        .topbar { display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 10px 15px; border-radius: 8px; margin-bottom: 20px; }
        .tabs button { margin-right: 10px; padding: 8px 15px; border: none; background: #f0f0f0; cursor: pointer; border-radius: 5px; }
        .tabs button.active { background: #1f2b6c; color: #fff; }
        .btn { margin-left: 5px; padding: 8px 12px; border: none; background: #1f2b6c; color: #fff; border-radius: 5px; cursor: pointer; }
        .btn.close-btn { float: right; background: red; }
        .btn.close-btn:hover { background: darkred; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
        .card { background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center; }
        .section { background: #fff; padding: 20px; border-radius: 10px; }
        .popup { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .popup-content { background: #fff; padding: 20px; border-radius: 8px; max-height: 90vh; overflow-y: auto; width: 500px; }
        form { display: flex; flex-direction: column; }
        form label { margin-top: 10px; font-weight: bold; }
        form input, form select, form textarea { margin-top: 5px; padding: 8px; border: 1px solid #ccc; border-radius: 5px; }
        form button { margin-top: 15px; }
      `}</style>
    </div>
  );
}
