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
    <div className="dashboard-pro">
      {/* Sidebar */}
      <aside className="sidebar-pro">
        <h2 className="logo-pro">HR Copilot</h2>
        <ul className="menu-pro">
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>🏠 Dashboard</li>
          <li className={activeTab === "leave" ? "active" : ""} onClick={() => setActiveTab("leave")}>📝 Apply Leave</li>
          <li className={activeTab === "shifts" ? "active" : ""} onClick={() => setActiveTab("shifts")}>🕒 Shifts</li>
          <li className={activeTab === "attendance" ? "active" : ""} onClick={() => setActiveTab("attendance")}>📅 Attendance</li>
          <li className={activeTab === "tasks" ? "active" : ""} onClick={() => setActiveTab("tasks")}>📂 Tasks</li>
          <li className={activeTab === "travel" ? "active" : ""} onClick={() => setActiveTab("travel")}>✈️ Travel Requests</li>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>👤 Profile</li>
          <li className={activeTab === "payroll" ? "active" : ""} onClick={() => setActiveTab("payroll")}>💵 Payroll</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-pro">
        <header className="topbar-pro">
          <h3>Welcome, {employee.name}</h3>
          <button className="logout-btn-pro" onClick={handleLogout}>Logout</button>
        </header>

        {/* Render Tabs */}
      {activeTab === "dashboard" && (
  <div className="dashboard-pro fade-in">
    <div className="dashboard-row-pro">
      {/* Employee Info Cards */}
      {[
        { label: "Employee ID", value: employee.employeeId, icon: "🆔" },
        { label: "Email", value: employee.email, icon: "📧" },
        { label: "Department", value: employee.department, icon: "🏢" },
        { label: "Role", value: employee.role, icon: "💼" },
        { label: "Joining Date", value: employee.joiningDate, icon: "📅" },
        { label: "Salary", value: `₹ ${employee.salary}`, icon: "💰" },
      ].map((card, idx) => (
        <div className="card-pro" key={idx}>
          <div className="card-icon">{card.icon}</div>
          <h4 className="card-label">{card.label}</h4>
          <p className="card-value">{card.value}</p>
        </div>
      ))}

      {/* Announcements */}
      <div className="card-pro announcements-card">
        <h4>📢 Latest Announcements</h4>
        {announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          <ul>
            {announcements.map((a) => (
              <li key={a.id}>
                <strong>{a.title}:</strong> {a.message}{" "}
                <em>({a.date})</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
)}



        {/* Leave Tab */}
        {activeTab === "leave" && (
          <div className="leave-section-pro fade-in-pro">
            <h3>📝 Apply Leave</h3>
            <form className="leave-form-pro" onSubmit={handleLeaveSubmit}>
              <div>
                <label>Type:</label>
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
              <div>
                <label>From:</label>
                <input
                  type="date"
                  name="fromDate"
                  value={newLeave.fromDate}
                  onChange={handleLeaveChange}
                  required
                />
              </div>
              <div>
                <label>To:</label>
                <input
                  type="date"
                  name="toDate"
                  value={newLeave.toDate}
                  onChange={handleLeaveChange}
                  required
                />
              </div>
              <div>
                <label>Reason:</label>
                <input
                  type="text"
                  name="reason"
                  value={newLeave.reason}
                  onChange={handleLeaveChange}
                />
              </div>
              <button
                type="submit"
                disabled={getRemainingDays(newLeave.type) <= 0}
                style={{
                  backgroundColor:
                    getRemainingDays(newLeave.type) <= 0 ? "#ccc" : "#007bff",
                  cursor:
                    getRemainingDays(newLeave.type) <= 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Apply
              </button>
            </form>

            {/* Leave Balance */}
            <div className="leave-balance-card">
              {leavePolicies.map((policy) => {
                const remaining = getRemainingDays(policy.name);
                return (
                  <div
                    key={policy.name}
                    className={`leave-card ${remaining === 0 ? "exhausted" : ""
                      }`}
                  >
                    <h4>{policy.name}</h4>
                    <p>{remaining} day(s) remaining</p>
                    {remaining === 0 && (
                      <span className="exhausted-text">❌ Exhausted</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Leave Table */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <table
                className="leave-table fade-in"
                style={{ width: "80%", maxWidth: "800px" }}
              >
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
                      <tr key={idx}>
                        <td>{leave.type}</td>
                        <td>{leave.fromDate}</td>
                        <td>{leave.toDate}</td>
                        <td>{leave.reason}</td>
                        <td>{leave.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No leave applications
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        

        {/* Shifts Tab */}
        {activeTab === "shifts" && (
          <div className="dashboard-row-pro fade-in">
            <div className="card-pro">
              <div className="card-icon">🕒</div>
              <h4 className="card-label">My Shifts</h4>
              {shifts.length > 0 ? (
                <table className="shift-table-pro">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((shift) => (
                      <tr key={shift.id}>
                        <td>{shift.date}</td>
                        <td>{shift.time}</td>
                        <td>{shift.role}</td>
                        <td>{shift.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No shifts assigned yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <AttendanceManagement currentEmployee={employee} />
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="fade-in-pro">
            <h3>📂 My Tasks</h3>
            {tasks.length > 0 ? (
              <table className="task-table-pro">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th>Document Submission</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.startDate}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.documentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No tasks assigned to you yet.</p>
            )}
          </div>
        )}

        

        {/* Travel Requests */}
        {activeTab === "travel" && (
          <div className="fade-in-pro">
            <h3>✈️ Travel Requests</h3>
            <form
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
              <input
                type="text"
                placeholder="Destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
              />
              <input
                type="date"
                placeholder="Start Date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
              <input
                type="date"
                placeholder="End Date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Estimated Cost"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                required
              />
              <button type="submit">Submit</button>
            </form>

            {travelRequests.length > 0 && (
              <table className="travel-table-pro">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Destination</th>
                    <th>Purpose</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {travelRequests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.employeeName}</td>
                      <td>{req.destination}</td>
                      <td>{req.purpose}</td>
                      <td>{req.startDate}</td>
                      <td>{req.endDate}</td>
                      <td>₹{req.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="profile-page-pro fade-in">
            <div className="profile-container">
              <div className="profile-photo">
                <img src={employee.photo || "/default-avatar.png"} alt={employee.name} />
                <input type="file" accept="image/*" onChange={handlePhotoChange} title="Change Photo" />
              </div>
              <div className="profile-details">
                <h2>{employee.name}</h2>
                <p><strong>Employee ID:</strong> {employee.employeeId}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Role:</strong> {employee.role}</p>
                <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
                <p><strong>Salary:</strong> ₹ {employee.salary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === "payroll" && (
          <div className="fade-in-pro">
            <h3>💵 Payroll</h3>
            <button onClick={generatePayrollPDF}>Download Payroll PDF</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard1;

