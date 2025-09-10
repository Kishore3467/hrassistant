// PayrollDashboard.jsx
import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaEdit, FaTrash, FaPlus, FaBell, FaChartLine, FaChartPie, FaHistory } from "react-icons/fa";
import Topbar from "./Topbar";
import "./PayrollDashboard.css";

const PayrollDashboard = () => {
  const [employees, setEmployees] = useState([]); // payroll records
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    position: "",
    department: "",
    salary: 0,
    bonus: 0,
    deductions: 0,
    currency: "USD",
  });
  const [viewSection, setViewSection] = useState("dashboard"); // dashboard | employees
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("payrollRecords")) || [];
    setEmployees(storedEmployees);

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  useEffect(() => {
    // fetch currencies
    setCurrencies(["USD", "EUR", "INR", "GBP"]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["salary", "bonus", "deductions"].includes(name)
        ? parseFloat(value) || 0
        : value,
    });
  };

  // Auto-fill employee details when selected
  const handleEmployeeIdChange = (e) => {
    const empId = e.target.value;
    const emp = JSON.parse(localStorage.getItem("employeeInfo") || "[]")
      .find(emp => emp.employeeId === empId);
    setFormData({
      ...formData,
      employee_id: empId,
      name: emp?.name || "",
      position: emp?.role || "",
      department: emp?.department || "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedEmployees;
    const recordId = editingId || Date.now();
    if (editingId) {
      updatedEmployees = employees.map(emp =>
        emp.id === editingId ? { ...formData, id: editingId } : emp
      );
      setEditingId(null);
    } else {
      updatedEmployees = [...employees, { ...formData, id: recordId }];
    }
    localStorage.setItem("payrollRecords", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setFormData({
      employee_id: "",
      name: "",
      position: "",
      department: "",
      salary: 0,
      bonus: 0,
      deductions: 0,
      currency: "USD",
    });
    setIsModalOpen(false);
    setViewSection("employees"); // show employees tab after submit
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      localStorage.setItem("payrollRecords", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
    }
  };

  const calculateNetPay = (emp) => emp.salary + emp.bonus - emp.deductions;

  const formatCurrency = (amount, currency) => {
    try {
      return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
    } catch {
      return amount;
    }
  };

  // Calculate analytics data
  const payrollAnalytics = {
    totalPayroll: employees.reduce((sum, emp) => sum + (emp.salary + emp.bonus - emp.deductions), 0),
    averageSalary: employees.length ? employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length : 0,
    totalEmployees: employees.length,
    upcomingPayments: employees.filter(emp => {
      // Simple logic to find employees with payment due in next 7 days
      return Math.random() > 0.7; // Placeholder logic
    }).length
  };

  // Sample recent activity data
  const recentActivities = [
    { id: 1, title: "Payroll processed for John Doe", time: "2 hours ago", icon: <FaMoneyBillWave /> },
    { id: 2, title: "New employee added to payroll", time: "Yesterday", icon: <FaUsers /> },
    { id: 3, title: "Salary revision for Jane Smith", time: "2 days ago", icon: <FaEdit /> },
    { id: 4, title: "Monthly payroll report generated", time: "3 days ago", icon: <FaChartLine /> }
  ];

  return (
    <>
      <Topbar />
      <div className="pd-dashboard-container">
        {/* Sidebar */}
        <aside className="pd-sidebar">
          <h2 className="pd-logo">PayrollPro</h2>
          {currentUser && (
            <nav>
              <ul>
                <li onClick={() => setViewSection("dashboard")}><FaTachometerAlt /> Dashboard</li>
                <li onClick={() => setViewSection("employees")}><FaUsers /> Employees</li>
              </ul>
            </nav>
          )}
        </aside>

        {/* Main Content */}
        <div className="pd-main-content">
          <header className="pd-topbar">
            <h1>{viewSection.charAt(0).toUpperCase() + viewSection.slice(1)}</h1>
            {currentUser && (
              <div className="pd-topbar-right">
                <FaBell size={20} className="pd-icon" />
                <span className="pd-profile">{currentUser.name.charAt(0)}</span>
              </div>
            )}
          </header>

          {/* Dashboard Section */}
          {viewSection === "dashboard" && (
            <>
              <div className="pd-dashboard-actions">
                <button className="pd-primary-btn" onClick={() => setIsModalOpen(true)}>
                  <FaPlus /> Add Payroll
                </button>
              </div>

              {/* Analytics Cards */}
              <div className="pd-dashboard-analytics">
                <div className="pd-stat-card">
                  <FaMoneyBillWave className="pd-stat-icon" />
                  <div className="pd-stat-value">
                    {formatCurrency(payrollAnalytics.totalPayroll, "USD")}
                  </div>
                  <div className="pd-stat-label">Total Payroll</div>
                </div>

                <div className="pd-stat-card">
                  <FaChartPie className="pd-stat-icon" />
                  <div className="pd-stat-value">
                    {formatCurrency(payrollAnalytics.averageSalary, "USD")}
                  </div>
                  <div className="pd-stat-label">Average Salary</div>
                </div>

                <div className="pd-stat-card">
                  <FaUsers className="pd-stat-icon" />
                  <div className="pd-stat-value">{payrollAnalytics.totalEmployees}</div>
                  <div className="pd-stat-label">Employees</div>
                </div>

                <div className="pd-stat-card">
                  <FaBell className="pd-stat-icon" />
                  <div className="pd-stat-value">{payrollAnalytics.upcomingPayments}</div>
                  <div className="pd-stat-label">Upcoming Payments</div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="pd-charts-container">
                <div className="pd-chart-card">
                  <div className="pd-chart-header">
                    <div className="pd-chart-title">Payroll Distribution</div>
                    <div className="pd-chart-actions">
                      <button className="pd-chart-action-btn">View Report</button>
                    </div>
                  </div>
                  <div className="pd-chart-placeholder">
                    Payroll Distribution Chart (Integration needed)
                  </div>
                </div>

                <div className="pd-activity-card">
                  <div className="pd-chart-header">
                    <div className="pd-chart-title">Recent Activity</div>
                    <div className="pd-chart-actions">
                      <button className="pd-chart-action-btn">
                        <FaHistory />
                      </button>
                    </div>
                  </div>
                  <ul className="pd-activity-list">
                    {recentActivities.map(activity => (
                      <li key={activity.id} className="pd-activity-item">
                        <div className="pd-activity-icon">{activity.icon}</div>
                        <div className="pd-activity-content">
                          <div className="pd-activity-title">{activity.title}</div>
                          <div className="pd-activity-time">{activity.time}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* Employees Tab */}
          {viewSection === "employees" && (
            <div className="pd-employees-container">
              <table className="pd-employee-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Employee ID</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Net Pay</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length ? employees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.employee_id}</td>
                      <td>{emp.position}</td>
                      <td>{emp.department}</td>
                      <td>{formatCurrency(emp.salary, emp.currency)}</td>
                      <td>{formatCurrency(emp.bonus, emp.currency)}</td>
                      <td>{formatCurrency(emp.deductions, emp.currency)}</td>
                      <td>{formatCurrency(calculateNetPay(emp), emp.currency)}</td>
                      <td>
                        <button className="pd-action-btn pd-edit" onClick={() => handleEdit(emp)}>Edit</button>
                        <button className="pd-action-btn pd-delete" onClick={() => handleDelete(emp.id)}>Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="9" style={{ textAlign: "center" }}>No payroll records yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="pd-modal-overlay">
              <div className="pd-modal">
                <h2>{editingId ? "Edit Payroll" : "Add Payroll"}</h2>
                <form onSubmit={handleSubmit}>
                  <select
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleEmployeeIdChange}
                    required
                  >
                    <option value="">Select Employee</option>
                    {JSON.parse(localStorage.getItem("employeeInfo") || "[]").map(emp => (
                      <option key={emp.employeeId} value={emp.employeeId}>
                        {emp.name} ({emp.employeeId})
                      </option>
                    ))}
                  </select>

                  <input name="name" value={formData.name} readOnly placeholder="Full Name" />
                  <input name="position" value={formData.position} readOnly placeholder="Position" />
                  <input name="department" value={formData.department} readOnly placeholder="Department" />
                  <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                  <input type="number" name="bonus" value={formData.bonus} onChange={handleChange} placeholder="Bonus" />
                  <input type="number" name="deductions" value={formData.deductions} onChange={handleChange} placeholder="Deductions" />
                  <select name="currency" value={formData.currency} onChange={handleChange}>
                    {currencies.map(cur => <option key={cur} value={cur}>{cur}</option>)}
                  </select>

                  <div className="pd-modal-buttons">
                    <button type="button" className="pd-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    <button type="submit" className="pd-primary-btn">{editingId ? "Update" : "Submit"}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default PayrollDashboard;