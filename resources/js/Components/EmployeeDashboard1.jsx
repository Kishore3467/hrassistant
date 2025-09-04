import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeDashboard1.css";
import AttendanceManagement from "./AttendanceManagement";

function EmployeeDashboard1() {
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [newLeave, setNewLeave] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
    status: "Pending",
  });

  const navigate = useNavigate();

  // Load current employee and their leaves
  useEffect(() => {
    const currentEmployee = JSON.parse(localStorage.getItem("currentEmployee"));
    if (!currentEmployee) {
      navigate("/login");
      return;
    }
    setEmployee(currentEmployee);

    const storedLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
    const filteredLeaves = storedLeaves.filter(
      l => l.empId === currentEmployee.employeeId &&
           l.companyId === currentEmployee.companyId
    );
    setLeaveApplications(filteredLeaves);
  }, [navigate]);

  // Listen for leave storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
      const filteredLeaves = storedLeaves.filter(
        l => l.empId === employee?.employeeId &&
             l.companyId === employee?.companyId
      );
      setLeaveApplications(filteredLeaves);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [employee]);

  // Leave form handlers
  const handleLeaveChange = e => setNewLeave({ ...newLeave, [e.target.name]: e.target.value });

  const handleLeaveSubmit = e => {
    e.preventDefault();
    if (!newLeave.type || !newLeave.fromDate || !newLeave.toDate) {
      return alert("Fill all required fields");
    }

    const from = new Date(newLeave.fromDate);
    const to = new Date(newLeave.toDate);
    const requestedDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    const leavePolicies = JSON.parse(localStorage.getItem("policies"))?.filter(p => p.status) || [];
    const leavesOfType = leaveApplications.filter(l => l.type === newLeave.type);
    const usedDays = leavesOfType.reduce((acc, curr) => {
      const f = new Date(curr.fromDate);
      const t = new Date(curr.toDate);
      return acc + Math.ceil((t - f) / (1000*60*60*24)) + 1;
    }, 0);
    const remaining = 12 - usedDays;

    if (requestedDays > remaining) {
      return alert(`You cannot apply. Remaining ${newLeave.type} leave: ${remaining} day(s).`);
    }

    const leave = {
      ...newLeave,
      id: Date.now(),
      empId: employee.employeeId,
      companyId: employee.companyId,
      name: employee.name,
      status: "Pending",
    };

    const allLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    allLeaves.push(leave);
    localStorage.setItem("leaves", JSON.stringify(allLeaves));

    setLeaveApplications([...leaveApplications, leave]);
    setNewLeave({ type: "", fromDate: "", toDate: "", reason: "", status: "Pending" });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentEmployee");
    navigate("/login");
  };

  const leavePolicies = JSON.parse(localStorage.getItem("policies"))?.filter(p => p.status) || [];

  if (!employee) return null;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar2">
        <h2 className="sidebar2-logo">HR Copilot</h2>
        <ul className="sidebar2-menu">
          <li onClick={() => setActiveTab("dashboard")}>🏠 Dashboard</li>
          <li onClick={() => setActiveTab("leave")}>📝 Apply Leave</li>
          <li onClick={() => setActiveTab("attendance")}>📅 Attendance</li>
          <li onClick={() => setActiveTab("tasks")}>📂 Tasks</li>
          <li onClick={() => setActiveTab("profile")}>👤 Profile</li>
        </ul>
      </aside>

      {/* Main Section */}
      <div className="main-content">
        <header className="topbar">
          <h3>Welcome, {employee.name}</h3>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </header>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="cards-grid">
            {["Employee ID","Email","Department","Role","Joining Date","Salary"].map((item, idx) => (
              <div className="card fade-in" key={idx}>
                <h4>{item}</h4>
                <p>{
                  item==="Employee ID"? employee.employeeId :
                  item==="Email"? employee.email :
                  item==="Department"? employee.department :
                  item==="Role"? employee.role :
                  item==="Joining Date"? employee.joiningDate :
                  `₹ ${employee.salary}`
                }</p>
              </div>
            ))}
          </div>
        )}

        {/* Leave */}
        {activeTab === "leave" && (
          <div className="leave-section fade-in">
            <div style={{ display: "flex", gap: "30px", marginBottom: "30px" }}>
              {/* Form */}
              <div className="leave-form-card" style={{ flex: 1 }}>
                <h3>Apply for Leave</h3>
                <form className="leave-form-compact" onSubmit={handleLeaveSubmit}>
                  <div className="form-group-compact">
                    <label>Leave Type</label>
                    <select name="type" value={newLeave.type} onChange={handleLeaveChange} required>
                      <option value="">-- Select --</option>
                      {leavePolicies.map(p => {
                        const leavesOfType = leaveApplications.filter(l => l.type === p.name);
                        const usedDays = leavesOfType.reduce((acc, curr) => {
                          const f = new Date(curr.fromDate);
                          const t = new Date(curr.toDate);
                          return acc + Math.ceil((t - f) / (1000*60*60*24)) + 1;
                        }, 0);
                        const remaining = 12 - usedDays;
                        return (
                          <option key={p.name} value={p.name} disabled={remaining <= 0}>
                            {p.name} {remaining <= 0 ? "(Exhausted)" : `(${remaining} days remaining)`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group-compact">
                    <label>Start Date</label>
                    <input type="date" name="fromDate" value={newLeave.fromDate} onChange={handleLeaveChange} required />
                  </div>
                  <div className="form-group-compact">
                    <label>End Date</label>
                    <input type="date" name="toDate" value={newLeave.toDate} onChange={handleLeaveChange} required />
                  </div>
                  <div className="form-group-compact">
                    <label>Reason</label>
                    <textarea name="reason" value={newLeave.reason} onChange={handleLeaveChange} rows="2" placeholder="Reason..." required />
                  </div>
                  <button type="submit" className="submit-btn-compact">Apply</button>
                </form>
              </div>

              {/* Leave Balance */}
              <div className="leave-balance-card">
                <h3>Leave Balance</h3>
                {leavePolicies.map(policy => {
                  const leavesOfType = leaveApplications.filter(l => l.type === policy.name);
                  const usedDays = leavesOfType.reduce((acc, curr) => {
                    const f = new Date(curr.fromDate);
                    const t = new Date(curr.toDate);
                    return acc + Math.ceil((t - f) / (1000*60*60*24)) + 1;
                  }, 0);
                  const remaining = 12 - usedDays;
                  return (
                    <div key={policy.name} className="leave-card">
                      <strong>{policy.name}:</strong> {remaining} day(s) remaining
                      {remaining <= 0 && <span style={{color:"red", marginLeft:"8px"}}>❌ Exhausted</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leave Table */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table className="leave-table fade-in" style={{ width: "80%", maxWidth: "800px" }}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveApplications.length ? leaveApplications.map((leave, idx) => (
                    <tr key={idx}>
                      <td>{leave.type}</td>
                      <td>{leave.fromDate}</td>
                      <td>{leave.toDate}</td>
                      <td>{leave.reason}</td>
                      <td>{leave.status}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5" style={{textAlign:"center"}}>No leave applications</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance */}
        {activeTab === "attendance" && <AttendanceManagement currentEmployee={employee} />}
        {activeTab === "tasks" && <p className="fade-in">📂 Task View Coming Soon...</p>}

        {/* Profile */}
        {activeTab === "profile" && (
          <div className="profile-section fade-in">
            <h3>Profile</h3>
            {["Employee ID","Email","Department","Role","Joining Date","Salary"].map((item, idx) => (
              <p key={idx}><b>{item}:</b> {
                item==="Employee ID"? employee.employeeId :
                item==="Email"? employee.email :
                item==="Department"? employee.department :
                item==="Role"? employee.role :
                item==="Joining Date"? employee.joiningDate :
                `₹ ${employee.salary}`
              }</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard1;
