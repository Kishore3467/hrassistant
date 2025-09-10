import React, { useState } from "react";
import LeaveManagement from "./LeaveManagement";
import LeaveBalance from "./LeaveBalance";

export default function LeaveTracker() {
  const [activeTab, setActiveTab] = useState("summary");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showApplyLeave, setShowApplyLeave] = useState(false);

  const leaves = [
    { type: "Casual Leave", available: 10, booked: 2, color: "#4CAF50" },
    { type: "Earned Leave", available: 12, booked: 0, color: "#2196F3" },
    { type: "Sick Leave", available: 12, booked: 0, color: "#FF9800" },
    { type: "Leave Without Pay", available: 0, booked: 0, color: "#9E9E9E" },
    { type: "Paternity Leave", available: 0, booked: 0, color: "#E91E63" },
    { type: "Sabbatical Leave", available: 0, booked: 0, color: "#673AB7" },
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
        <div className="sidebar-header">
          <h2>HR Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👤</span>
            <span className="nav-text">Onboarding</span>
          </a>
          <a href="#" className="nav-item active">
            <span className="nav-icon">📅</span>
            <span className="nav-text">Leave Tracker</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⏱️</span>
            <span className="nav-text">Attendance</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⏰</span>
            <span className="nav-text">Time Tracker</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📊</span>
            <span className="nav-text">Performance</span>
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📋</span>
            <span className="nav-text">Reports</span>
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="tabs">
            <button 
              onClick={() => setActiveTab("summary")} 
              className={`tab ${activeTab === "summary" ? "active" : ""}`}
            >
              Leave Summary
            </button>
            <button 
              onClick={() => setActiveTab("balance")} 
              className={`tab ${activeTab === "balance" ? "active" : ""}`}
            >
              Leave Balance
            </button>
            <button 
              onClick={() => setActiveTab("requests")} 
              className={`tab ${activeTab === "requests" ? "active" : ""}`}
            >
              Leave Requests
            </button>
            <button 
              onClick={() => setActiveTab("shift")} 
              className={`tab ${activeTab === "shift" ? "active" : ""}`}
            >
              Shift
            </button>
          </div>
          <div className="action-buttons">
            <button className="btn icon-btn" onClick={() => setShowCalendar(true)}>
              <span className="btn-icon">📅</span>
              Calendar
            </button>
            <button className="btn primary-btn" onClick={() => setShowApplyLeave(true)}>
              <span className="btn-icon">+</span>
              Apply Leave
            </button>
          </div>
        </div>

        {/* Content per tab */}
        {activeTab === "summary" && (
          <div className="cards">
            {leaves.map((leave, i) => (
              <div key={i} className="card" style={{ '--accent-color': leave.color }}>
                <div className="card-header">
                  <h3>{leave.type}</h3>
                  <div className="card-badge">{leave.available + leave.booked}</div>
                </div>
                <div className="card-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(leave.booked / (leave.available + leave.booked)) * 100}%`,
                        backgroundColor: leave.color
                      }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span className="available">Available: {leave.available}</span>
                    <span className="booked">Booked: {leave.booked}</span>
                  </div>
                </div>
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
        <div className="modal-overlay" onClick={() => setShowCalendar(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Calendar View</h3>
              <button className="modal-close" onClick={() => setShowCalendar(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>[Calendar Placeholder]</p>
            </div>
            <div className="modal-footer">
              <button className="btn secondary-btn" onClick={() => setShowCalendar(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      {showApplyLeave && (
        <div className="modal-overlay" onClick={() => setShowApplyLeave(false)}>
          <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Leave Application Form</h3>
              <button className="modal-close" onClick={() => setShowApplyLeave(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLeaveSubmit} className="leave-form">
                <div className="form-group">
                  <label>Leave Type:</label>
                  <select required className="form-input">
                    <option value="">-- Select --</option>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Paid Leave</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>From Date:</label>
                    <input type="date" required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>To Date:</label>
                    <input type="date" required className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason:</label>
                  <textarea required className="form-input"></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn secondary-btn" onClick={() => setShowApplyLeave(false)}>Cancel</button>
                  <button type="submit" className="btn primary-btn">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: #f7f9fc;
          color: #333;
          line-height: 1.6;
        }
        
        .app {
          display: flex;
          min-height: 100vh;
        }
        
        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: linear-gradient(135deg, #1f2b6c 0%, #2f3d8a 100%);
          color: #fff;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
        
        .sidebar-header {
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-header h2 {
          font-weight: 600;
          font-size: 1.5rem;
          background: linear-gradient(90deg, #fff, #a3b1ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeIn 0.8s ease;
        }
        
        .sidebar-nav {
          padding: 20px 0;
          flex: 1;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          padding: 14px 24px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.05);
        }
        
        .nav-item.active {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: linear-gradient(to bottom, #4CAF50, #2196F3);
          border-radius: 0 4px 4px 0;
        }
        
        .nav-icon {
          margin-right: 12px;
          font-size: 1.2rem;
        }
        
        .nav-text {
          font-weight: 500;
        }
        
        /* Main Content Styles */
        .main {
          flex: 1;
          padding: 24px;
          background: #f7f9fc;
          min-height: 100vh;
        }
        
        /* Topbar Styles */
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          padding: 16px 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          animation: slideDown 0.5s ease;
        }
        
        .tabs {
          display: flex;
          gap: 8px;
        }
        
        .tab {
          padding: 10px 20px;
          border: none;
          background: #f5f7ff;
          cursor: pointer;
          border-radius: 8px;
          font-weight: 500;
          color: #666;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #4CAF50, #2196F3);
          transition: all 0.3s ease;
          transform: translateX(-50%);
          border-radius: 3px 3px 0 0;
        }
        
        .tab:hover {
          color: #1f2b6c;
          background: #edf1ff;
        }
        
        .tab.active {
          color: #1f2b6c;
          background: #edf1ff;
        }
        
        .tab.active::after {
          width: 70%;
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
        }
        
        /* Button Styles */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%);
          transform-origin: 50% 50%;
        }
        
        .btn:hover::after {
          animation: ripple 1s ease-out;
        }
        
        .icon-btn {
          background: #f5f7ff;
          color: #1f2b6c;
        }
        
        .icon-btn:hover {
          background: #e8edff;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(31, 43, 108, 0.1);
        }
        
        .primary-btn {
          background: linear-gradient(90deg, #1f2b6c, #2f3d8a);
          color: #fff;
        }
        
        .primary-btn:hover {
          background: linear-gradient(90deg, #2f3d8a, #3f4da0);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(31, 43, 108, 0.2);
        }
        
        .secondary-btn {
          background: #f5f7ff;
          color: #1f2b6c;
        }
        
        .secondary-btn:hover {
          background: #e8edff;
        }
        
        .btn-icon {
          margin-right: 8px;
        }
        
        /* Card Styles */
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          animation: fadeIn 0.8s ease;
        }
        
        .card {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border-top: 4px solid var(--accent-color, #1f2b6c);
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .card-header h3 {
          font-weight: 600;
          color: #333;
        }
        
        .card-badge {
          background: #f5f7ff;
          color: #1f2b6c;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .card-progress {
          margin-top: 16px;
        }
        
        .progress-bar {
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease-in-out;
        }
        
        .progress-stats {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }
        
        .available {
          color: #4CAF50;
          font-weight: 500;
        }
        
        .booked {
          color: #F44336;
          font-weight: 500;
        }
        
        /* Section Styles */
        .section {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          animation: fadeIn 0.8s ease;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          padding: 20px;
        }
        
        .modal {
          background: #fff;
          border-radius: 12px;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.4s ease;
        }
        
        .modal-lg {
          max-width: 600px;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 {
          font-weight: 600;
          color: #333;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #999;
          transition: color 0.3s ease;
        }
        
        .modal-close:hover {
          color: #F44336;
        }
        
        .modal-body {
          padding: 24px;
          max-height: calc(90vh - 130px);
          overflow-y: auto;
        }
        
        .modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        
        /* Form Styles */
        .leave-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-row {
          display: flex;
          gap: 16px;
        }
        
        .form-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .form-group label {
          font-weight: 500;
          margin-bottom: 8px;
          color: #555;
        }
        
        .form-input {
          padding: 12px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #1f2b6c;
          box-shadow: 0 0 0 3px rgba(31, 43, 108, 0.1);
        }
        
        textarea.form-input {
          min-height: 100px;
          resize: vertical;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 16px;
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(40px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 0.5;
          }
          20% {
            transform: scale(25, 25);
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: scale(40, 40);
          }
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .sidebar {
            width: 240px;
          }
          
          .cards {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
        
        @media (max-width: 768px) {
          .app {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }
          
          .sidebar-nav {
            display: flex;
            overflow-x: auto;
            padding: 0;
          }
          
          .nav-item {
            padding: 16px 20px;
            white-space: nowrap;
          }
          
          .nav-item.active::before {
            width: 100%;
            height: 4px;
            top: auto;
            bottom: 0;
            border-radius: 4px 4px 0 0;
          }
          
          .topbar {
            flex-direction: column;
            gap: 16px;
          }
          
          .tabs {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          
          .form-row {
            flex-direction: column;
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .main {
            padding: 16px;
          }
          
          .cards {
            grid-template-columns: 1fr;
          }
          
          .modal {
            width: 100%;
            margin: 0 16px;
          }
        }
      `}</style>
    </div>
  );
}