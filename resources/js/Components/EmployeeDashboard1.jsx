import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AttendanceManagement from "./AttendanceManagement";
import "./EmployeeDashboardPro.css";

function EmployeeDashboard1() {
  const [employee, setEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("dashboardTheme") || "light");
  const [newLeave, setNewLeave] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
    status: "Pending",
  });

  const [travelRequests, setTravelRequests] = useState([]);
  const [formData, setFormData] = useState({
    destination: "",
    purpose: "",
    startDate: "",
    endDate: "",
    cost: "",
  });

  const navigate = useNavigate();

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("dashboardTheme", newTheme);
  };

  const loadEmployeeData = () => {
    const currentEmployee = JSON.parse(localStorage.getItem("currentEmployee"));
    if (!currentEmployee) return navigate("/login");
    setEmployee(currentEmployee);

    // Leave Applications
    const storedLeaves = JSON.parse(localStorage.getItem("leaves") || "[]");
    setLeaveApplications(
      storedLeaves.filter(
        (l) =>
          String(l.empId) === String(currentEmployee.employeeId) &&
          String(l.companyId) === String(currentEmployee.companyId)
      )
    );

    // Shifts
    const allShifts = JSON.parse(localStorage.getItem("shifts") || "[]");
    let myShifts = [];
    Object.values(allShifts).forEach((userShifts) => {
      myShifts = [
        ...myShifts,
        ...userShifts.filter(
          (s) =>
            String(s.employee_id) ===
            String(currentEmployee?.employeeId || currentEmployee?.id) &&
            String(s.companyId) === String(currentEmployee?.companyId)
        ),
      ];
    });
    setShifts(myShifts);

    // Tasks
    const allTaskKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("tasks_")
    );
    let allTasks = [];
    allTaskKeys.forEach((key) => {
      const t = JSON.parse(localStorage.getItem(key) || "[]");
      allTasks = [...allTasks, ...t];
    });
    setTasks(allTasks.filter((t) => String(t.employeeId) === String(currentEmployee.employeeId)));

    // Travel Requests
    const savedRequests = JSON.parse(localStorage.getItem("travelRequests")) || [];
    setTravelRequests(
      savedRequests.filter(
        (r) =>
          r.companyId === currentEmployee.companyId &&
          r.employeeId === currentEmployee.employeeId
      )
    );
  };

  const getRemainingDays = (policyName) => {
    const currentYear = new Date().getFullYear();
    const leavesOfType = leaveApplications.filter(
      (l) =>
        l.type === policyName &&
        new Date(l.fromDate).getFullYear() === currentYear
    );

    const usedDays = leavesOfType.reduce((acc, curr) => {
      const f = new Date(curr.fromDate);
      const t = new Date(curr.toDate);
      return acc + Math.ceil((t - f) / (1000 * 60 * 60 * 24)) + 1;
    }, 0);

    return Math.max(12 - usedDays, 0);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("announcements")) || [];
    if (employee) {
      const myAnns = stored.filter(
        (a) =>
          a.employeeId === employee.employeeId || a.employeeId === "all"
      );
      setAnnouncements(myAnns);
      if (myAnns.length > 0) setShowAnnouncementPopup(true);
    }
  }, [employee]);

  useEffect(() => {
    loadEmployeeData();
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(loadEmployeeData, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLeaveChange = (e) =>
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!newLeave.type || !newLeave.fromDate || !newLeave.toDate)
      return alert("Fill all required fields");

    const from = new Date(newLeave.fromDate);
    const to = new Date(newLeave.toDate);
    const requestedDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    const leavesOfType = leaveApplications.filter((l) => l.type === newLeave.type);
    const usedDays = leavesOfType.reduce((acc, curr) => {
      const f = new Date(curr.fromDate);
      const t = new Date(curr.toDate);
      return acc + Math.ceil((t - f) / (1000 * 60 * 60 * 24)) + 1;
    }, 0);
    const remaining = 12 - usedDays;

    if (requestedDays > remaining)
      return alert(`Remaining ${newLeave.type} leave: ${remaining} day(s)`);

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedEmployee = { ...employee, photo: reader.result };
      setEmployee(updatedEmployee);
      localStorage.setItem("currentEmployee", JSON.stringify(updatedEmployee));
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentEmployee");
    navigate("/login");
  };

  const leavePolicies = JSON.parse(localStorage.getItem("policies") || "[]") || [];

  const generatePayrollPDF = () => {
    if (!employee) return;

    const payrollRecords = JSON.parse(localStorage.getItem("payrollRecords") || "[]") || [];
    const myRecord = payrollRecords.find(
      (p) => String(p.employee_id) === String(employee.employeeId)
    );
    if (!myRecord) return alert("No payroll record found for you!");

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payroll Invoice", 14, 22);
    doc.setFontSize(12);
    doc.text(`Employee Name: ${employee.name}`, 14, 32);
    doc.text(`Employee ID: ${employee.employeeId}`, 14, 40);
    doc.text(`Department: ${employee.department}`, 14, 48);
    doc.text(`Role: ${employee.role}`, 14, 56);

    autoTable(doc, {
      startY: 65,
      head: [["Description", "Amount (₹)"]],
      body: [
        ["Salary", myRecord.salary || 0],
        ["Bonus", myRecord.bonus || 0],
        ["Deductions", myRecord.deductions || 0],
        ["Net Pay", (myRecord.salary || 0) + (myRecord.bonus || 0) - (myRecord.deductions || 0)],
      ],
    });

    doc.save(`Payroll_${employee.employeeId}.pdf`);
  };

  if (!employee) return null;

  return (
    <div className={`dashboard-pro ${theme}-theme`}>
      {/* Sidebar */}
      <aside className="sidebar-pro">
        <div className="sidebar-header">
          <h2 className="logo-pro">HR Copilot</h2>
          <div className="employee-mini-profile">
            <img src={employee.photo || "/default-avatar.png"} alt={employee.name} />
            <div>
              <p className="employee-name">{employee.name}</p>
              <p className="employee-role">{employee.role}</p>
            </div>
          </div>
        </div>
        <ul className="menu-pro">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <span className="menu-icon">🏠</span>
            <span className="menu-text">Dashboard</span>
          </li>
          <li className={activeTab === "leave" ? "active" : ""} onClick={() => setActiveTab("leave")}>
            <span className="menu-icon">📝</span>
            <span className="menu-text">Apply Leave</span>
          </li>
          <li className={activeTab === "shifts" ? "active" : ""} onClick={() => setActiveTab("shifts")}>
            <span className="menu-icon">🕒</span>
            <span className="menu-text">Shifts</span>
          </li>
          <li className={activeTab === "attendance" ? "active" : ""} onClick={() => setActiveTab("attendance")}>
            <span className="menu-icon">📅</span>
            <span className="menu-text">Attendance</span>
          </li>
          <li className={activeTab === "tasks" ? "active" : ""} onClick={() => setActiveTab("tasks")}>
            <span className="menu-icon">📂</span>
            <span className="menu-text">Tasks</span>
          </li>
          <li className={activeTab === "travel" ? "active" : ""} onClick={() => setActiveTab("travel")}>
            <span className="menu-icon">✈️</span>
            <span className="menu-text">Travel Requests</span>
          </li>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            <span className="menu-icon">👤</span>
            <span className="menu-text">Profile</span>
          </li>
          <li className={activeTab === "payroll" ? "active" : ""} onClick={() => setActiveTab("payroll")}>
            <span className="menu-icon">💵</span>
            <span className="menu-text">Payroll</span>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <button className="logout-btn-pro" onClick={handleLogout}>
            <span className="menu-icon">🚪</span>
            <span className="menu-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-pro">
        <header className="topbar-pro">
          <div className="breadcrumb">
            <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
          </div>
          <div className="header-actions">
            <div className="welcome-text">Welcome, {employee.name}</div>
            <div className="notification-bell">🔔</div>
          </div>
        </header>

        {/* Render Tabs */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content-pro">
            <div className="dashboard-grid-pro">
              {/* Employee Info Cards */}
              {[
                { label: "Employee ID", value: employee.employeeId, icon: "🆔", color: "#4e73df" },
                { label: "Email", value: employee.email, icon: "📧", color: "#1cc88a" },
                { label: "Department", value: employee.department, icon: "🏢", color: "#36b9cc" },
                { label: "Role", value: employee.role, icon: "💼", color: "#f6c23e" },
                { label: "Joining Date", value: employee.joiningDate, icon: "📅", color: "#e74a3b" },
                { label: "Salary", value: `₹ ${employee.salary}`, icon: "💰", color: "#6f42c1" },
              ].map((card, idx) => (
                <div className="stat-card-pro animated-card" key={idx}>
                  <div className="stat-card-icon" style={{ backgroundColor: card.color }}>
                    {card.icon}
                  </div>
                  <div className="stat-card-content">
                    <h4 className="stat-card-label">{card.label}</h4>
                    <p className="stat-card-value">{card.value}</p>
                  </div>
                </div>
              ))}

              {/* Announcements */}
              <div className="announcements-card-pro">
                <div className="card-header-pro">
                  <h4>📢 Latest Announcements</h4>
                </div>
                <div className="card-body-pro">
                  {announcements.length === 0 ? (
                    <p className="no-data-text">No announcements yet.</p>
                  ) : (
                    <ul className="announcements-list">
                      {announcements.slice(0, 3).map((a) => (
                        <li key={a.id} className="announcement-item animated-item">
                          <div className="announcement-title">{a.title}</div>
                          <div className="announcement-message">{a.message}</div>
                          <div className="announcement-date">{a.date}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leave Tab */}
        {activeTab === "leave" && (
          <div className="tab-content-pro fade-in-pro">
            <div className="leave-section-pro">
              <div className="card-pro animated-card">
                <div className="card-header-pro">
                  <h3>Apply for Leave</h3>
                </div>
                <div className="card-body-pro">
                  <form className="leave-form-pro" onSubmit={handleLeaveSubmit}>
                    <div className="form-row-pro">
                      <div className="form-group-pro">
                        <label>Leave Type</label>
                        <select
                          name="type"
                          value={newLeave.type}
                          onChange={handleLeaveChange}
                          required
                        >
                          <option value="">Select Leave Type</option>
                          <option value="Casual">Casual</option>
                          <option value="Sick">Sick</option>
                          <option value="Earned">Earned</option>
                        </select>
                      </div>
                      <div className="form-group-pro">
                        <label>From Date</label>
                        <input
                          type="date"
                          name="fromDate"
                          value={newLeave.fromDate}
                          onChange={handleLeaveChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row-pro">
                      <div className="form-group-pro">
                        <label>To Date</label>
                        <input
                          type="date"
                          name="toDate"
                          value={newLeave.toDate}
                          onChange={handleLeaveChange}
                          required
                        />
                      </div>
                      <div className="form-group-pro">
                        <label>Reason</label>
                        <input
                          type="text"
                          name="reason"
                          value={newLeave.reason}
                          onChange={handleLeaveChange}
                          placeholder="Reason for leave"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary-pro animated-button"
                      disabled={getRemainingDays(newLeave.type) <= 0}
                    >
                      Apply for Leave
                    </button>
                  </form>
                </div>
              </div>

              {/* Leave Balance */}
              <div className="leave-balance-section">
                <h3>Leave Balance</h3>
                <div className="leave-balance-grid">
                  {leavePolicies.map((policy) => {
                    const remaining = getRemainingDays(policy.name);
                    return (
                      <div
                        key={policy.name}
                        className={`leave-balance-card animated-card ${remaining === 0 ? "exhausted" : ""}`}
                      >
                        <div className="leave-type">{policy.name}</div>
                        <div className="leave-days">{remaining}</div>
                        <div className="leave-label">days remaining</div>
                        {remaining === 0 && (
                          <div className="exhausted-badge">Exhausted</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Leave History */}
              <div className="card-pro animated-card">
                <div className="card-header-pro">
                  <h3>Leave History</h3>
                </div>
                <div className="card-body-pro">
                  <div className="table-responsive">
                    <table className="data-table-pro">
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
                        {leaveApplications.length ? (
                          leaveApplications.map((leave, idx) => (
                            <tr key={idx} className="animated-item">
                              <td>{leave.type}</td>
                              <td>{leave.fromDate}</td>
                              <td>{leave.toDate}</td>
                              <td>{leave.reason}</td>
                              <td>
                                <span className={`status-badge status-${leave.status.toLowerCase()}`}>
                                  {leave.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="no-data">
                              No leave applications
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would follow the same pattern with improved styling */}
        {/* Shifts Tab */}
        {activeTab === "shifts" && (
          <div className="tab-content-pro fade-in">
            <div className="card-pro animated-card">
              <div className="card-header-pro">
                <h3>My Shifts</h3>
              </div>
              <div className="card-body-pro">
                {shifts.length > 0 ? (
                  <div className="table-responsive">
                    <table className="data-table-pro">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Role</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shifts.map((shift, idx) => (
                          <tr key={shift.id} className="animated-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <td>{shift.date}</td>
                            <td>{shift.time}</td>
                            <td>{shift.role}</td>
                            <td>
                              <span className={`status-badge status-${shift.status.toLowerCase()}`}>
                                {shift.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="no-data-text">No shifts assigned yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <AttendanceManagement currentEmployee={employee} />
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="tab-content-pro fade-in">
            <div className="card-pro animated-card">
              <div className="card-header-pro">
                <h3>My Tasks</h3>
              </div>
              <div className="card-body-pro">
                {tasks.length > 0 ? (
                  <div className="table-responsive">
                    <table className="data-table-pro">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Start Date</th>
                          <th>Due Date</th>
                          <th>Document Submission</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task, idx) => (
                          <tr key={task.id} className="animated-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <td>{task.title}</td>
                            <td>{task.startDate}</td>
                            <td>{task.dueDate}</td>
                            <td>{task.documentDate}</td>
                            <td>
                              <span className={`status-badge status-${task.status?.toLowerCase() || 'pending'}`}>
                                {task.status || 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="no-data-text">No tasks assigned to you yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Travel Requests */}
        {activeTab === "travel" && (
          <div className="tab-content-pro fade-in">
            <div className="card-pro animated-card">
              <div className="card-header-pro">
                <h3>Travel Request Form</h3>
              </div>
              <div className="card-body-pro">
                <form
                  className="travel-form-pro"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const allRequests = JSON.parse(
                      localStorage.getItem("travelRequests") || "[]"
                    );
                    const newRequest = {
                      ...formData,
                      id: Date.now(),
                      employeeId: employee.employeeId,
                      companyId: employee.companyId,
                      employeeName: employee.name,
                    };
                    localStorage.setItem(
                      "travelRequests",
                      JSON.stringify([...allRequests, newRequest])
                    );
                    setTravelRequests([...travelRequests, newRequest]);
                    setFormData({ destination: "", purpose: "", startDate: "", endDate: "", cost: "" });
                  }}
                >
                  <div className="form-row-pro">
                    <div className="form-group-pro">
                      <label>Destination</label>
                      <input
                        type="text"
                        placeholder="Enter destination"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group-pro">
                      <label>Purpose</label>
                      <input
                        type="text"
                        placeholder="Purpose of travel"
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row-pro">
                    <div className="form-group-pro">
                      <label>Start Date</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group-pro">
                      <label>End Date</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row-pro">
                    <div className="form-group-pro">
                      <label>Estimated Cost (₹)</label>
                      <input
                        type="number"
                        placeholder="Estimated cost"
                        value={formData.cost}
                        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary-pro animated-button">Submit Request</button>
                </form>
              </div>
            </div>

            {travelRequests.length > 0 && (
              <div className="card-pro animated-card">
                <div className="card-header-pro">
                  <h3>Travel Requests History</h3>
                </div>
                <div className="card-body-pro">
                  <div className="table-responsive">
                    <table className="data-table-pro">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Destination</th>
                          <th>Purpose</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Cost (₹)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {travelRequests.map((req, idx) => (
                          <tr key={req.id} className="animated-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <td>{req.employeeName}</td>
                            <td>{req.destination}</td>
                            <td>{req.purpose}</td>
                            <td>{req.startDate}</td>
                            <td>{req.endDate}</td>
                            <td>₹{req.cost}</td>
                            <td>
                              <span className={`status-badge status-${req.status?.toLowerCase() || 'pending'}`}>
                                {req.status || 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="tab-content-pro fade-in">
            <div className="profile-page-pro">
              <div className="card-pro animated-card">
                <div className="card-header-pro">
                  <h3>My Profile</h3>
                </div>
                <div className="card-body-pro">
                  <div className="profile-container">
                    <div className="profile-photo-section">
                      <div className="profile-photo">
                        <img src={employee.photo || "/default-avatar.png"} alt={employee.name} />
                        <div className="photo-upload">
                          <label htmlFor="photo-upload" className="btn-secondary-pro animated-button">
                            Change Photo
                          </label>
                          <input 
                            id="photo-upload" 
                            type="file" 
                            accept="image/*" 
                            onChange={handlePhotoChange} 
                            style={{ display: 'none' }} 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile-details">
                      <div className="profile-detail-row">
                        <div className="profile-detail-item animated-item">
                          <label>Full Name</label>
                          <p>{employee.name}</p>
                        </div>
                        <div className="profile-detail-item animated-item" style={{ animationDelay: "0.1s" }}>
                          <label>Employee ID</label>
                          <p>{employee.employeeId}</p>
                        </div>
                      </div>
                      <div className="profile-detail-row">
                        <div className="profile-detail-item animated-item" style={{ animationDelay: "0.2s" }}>
                          <label>Email</label>
                          <p>{employee.email}</p>
                        </div>
                        <div className="profile-detail-item animated-item" style={{ animationDelay: "0.3s" }}>
                          <label>Department</label>
                          <p>{employee.department}</p>
                        </div>
                      </div>
                      <div className="profile-detail-row">
                        <div className="profile-detail-item animated-item" style={{ animationDelay: "0.4s" }}>
                          <label>Role</label>
                          <p>{employee.role}</p>
                        </div>
                        <div className="profile-detail-item animated-item" style={{ animationDelay: "0.5s" }}>
                          <label>Joining Date</label>
                          <p>{employee.joiningDate}</p>
                        </div>
                      </div>
                      <div className="profile-detail-row">
                        <div className="profile-detail-item animated-item" style={{ animationDelay: "0.6s" }}>
                          <label>Salary</label>
                          <p>₹ {employee.salary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === "payroll" && (
          <div className="tab-content-pro fade-in">
            <div className="card-pro animated-card">
              <div className="card-header-pro">
                <h3>Payroll Information</h3>
              </div>
              <div className="card-body-pro">
                <div className="payroll-action">
                  <button className="btn-primary-pro animated-button" onClick={generatePayrollPDF}>
                    Download Payroll PDF
                  </button>
                </div>
                
                <div className="payroll-details">
                  <h4>Recent Payroll Records</h4>
                  <div className="table-responsive">
                    <table className="data-table-pro">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Salary</th>
                          <th>Bonus</th>
                          <th>Deductions</th>
                          <th>Net Pay</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* You would populate this with actual payroll data */}
                        <tr className="animated-item">
                          <td>March 2023</td>
                          <td>₹50,000</td>
                          <td>₹5,000</td>
                          <td>₹2,500</td>
                          <td>₹52,500</td>
                          <td>
                            <span className="status-badge status-paid">Paid</span>
                          </td>
                        </tr>
                        <tr className="animated-item" style={{ animationDelay: "0.1s" }}>
                          <td>February 2023</td>
                          <td>₹50,000</td>
                          <td>₹2,000</td>
                          <td>₹2,500</td>
                          <td>₹49,500</td>
                          <td>
                            <span className="status-badge status-paid">Paid</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Announcement Popup Modal */}
      {showAnnouncementPopup && announcements.length > 0 && (
        <div className="modal-overlay animated-modal">
          <div className="modal-pro">
            <div className="modal-header">
              <h3>New Announcement</h3>
              <button onClick={() => setShowAnnouncementPopup(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="announcement-popup">
                <h4>{announcements[0].title}</h4>
                <p>{announcements[0].message}</p>
                <div className="announcement-date">{announcements[0].date}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-primary-pro animated-button"
                onClick={() => setShowAnnouncementPopup(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard1;