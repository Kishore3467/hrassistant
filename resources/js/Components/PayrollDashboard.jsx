import React, { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaChartLine,
  FaBell,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import axios from "axios";
import Topbar from "./Topbar";
import "./PayrollDashboard.css";

const PayrollDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // logged-in user
  const [formData, setFormData] = useState({
    name: "",
    employee_id: "",
    position: "",
    department: "",
    salary: 0,
    bonus: 0,
    deductions: 0,
    currency: "USD",
  });
  const [viewSection, setViewSection] = useState("dashboard"); // dashboard | employees | payroll
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [loginId, setLoginId] = useState(""); // for login form

  // Load employees and currentUser from localStorage
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  // Fetch currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await axios.get("https://api.exchangerate.host/symbols");
        if (res.data && res.data.symbols) {
          setCurrencies(Object.keys(res.data.symbols));
        } else {
          setCurrencies(["USD", "EUR", "GBP", "INR"]);
        }
      } catch (err) {
        console.error("Error fetching currencies:", err);
        setCurrencies(["USD", "EUR", "GBP", "INR"]);
      }
    };
    fetchCurrencies();
  }, []);

  // Login handler
  const handleLogin = () => {
    const user = employees.find(emp => emp.employee_id === loginId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      setLoginId("");
      setViewSection("dashboard");
    } else {
      alert("Employee not found!");
    }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setViewSection("dashboard");
  };

  // Form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["salary", "bonus", "deductions"].includes(name)
        ? parseFloat(value) || 0
        : value,
    });
  };

  // Add / Update employee
const handleSubmit = (e) => {
  e.preventDefault();
  let updatedEmployees;
  let newEmployee = null;

  if (editingId) {
    updatedEmployees = employees.map(emp =>
      emp.id === editingId ? { ...formData, id: editingId } : emp
    );
    setEditingId(null);
  } else {
    newEmployee = { ...formData, id: Date.now() };
    updatedEmployees = [...employees, newEmployee];
  }

  localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  setEmployees(updatedEmployees);

  // Only update currentUser if a new employee is added
  if (newEmployee && newEmployee.employee_id === formData.employee_id) {
    setCurrentUser(newEmployee);
    localStorage.setItem("currentUser", JSON.stringify(newEmployee));
  }

  setFormData({
    name: "",
    employee_id: "",
    position: "",
    department: "",
    salary: 0,
    bonus: 0,
    deductions: 0,
    currency: "USD",
  });
  setIsModalOpen(false);
};


  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);

      // If currentUser deleted themselves, log out
      if (currentUser && currentUser.id === id) handleLogout();
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

  // Filter employees to show only logged-in user's data
  const visibleEmployees = currentUser
    ? employees.filter(emp => emp.employee_id === currentUser.employee_id)
    : [];

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
                <li onClick={() => setViewSection("dashboard")}>
                  <FaTachometerAlt /> Dashboard
                </li>
                <li onClick={() => setViewSection("employees")}>
                  <FaUsers /> Employees
                </li>
                <li onClick={() => setViewSection("payroll")}>
                  <FaMoneyBillWave /> Payroll
                </li>
                <li>
                  <FaFileInvoiceDollar /> Invoices
                </li>
                <li>
                  <FaChartLine /> Reports
                </li>
                <li onClick={handleLogout}>Logout</li>
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
                <span className="pd-profile">{currentUser.name}</span>
              </div>
            )}
          </header>

          {/* Login Form */}
          {!currentUser && (
            <div className="pd-login-form">
              <h2>Employee Login</h2>
              <input
                placeholder="Enter Employee ID"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
              />
              <button className="pd-primary-btn" onClick={handleLogin}>Login</button>
            </div>
          )}

          {/* Dashboard */}
          {currentUser && viewSection === "dashboard" && (
            <div className="pd-dashboard-actions">
              <button className="pd-primary-btn" onClick={() => setIsModalOpen(true)}>
                <FaPlus /> Add / Update Payroll
              </button>
            </div>
          )}

          {/* Employees Table */}
          {currentUser && viewSection === "employees" && (
            <div className="pd-employees-container">
              <button onClick={() => setViewSection("dashboard")} className="pd-primary-btn pd-back-btn">
                Back to Dashboard
              </button>
              <table className="pd-employee-table">
                <thead>
                  <tr>
                    <th>Name</th>
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
                  {visibleEmployees.map(emp => (
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
                        <button className="pd-action-btn pd-edit" onClick={() => handleEdit(emp)}><FaEdit /></button>
                        <button className="pd-action-btn pd-delete" onClick={() => handleDelete(emp.id)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Payroll Section */}
          {currentUser && viewSection === "payroll" && (
            <div className="pd-invoices-container">
              <button onClick={() => setViewSection("dashboard")} className="pd-primary-btn pd-back-btn">
                Back to Dashboard
              </button>
              <h2>Payroll Invoices</h2>
              <table className="pd-employee-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Employee ID</th>
                    <th>Net Pay</th>
                    <th>Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleEmployees.map(emp => (
                    <tr key={emp.id}>
                      <td>{emp.name}</td>
                      <td>{emp.employee_id}</td>
                      <td>{formatCurrency(calculateNetPay(emp), emp.currency)}</td>
                      <td>{emp.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && currentUser && (
            <div className="pd-modal-overlay">
              <div className="pd-modal">
                <h2>{editingId ? "Edit Employee" : "Add / Update Payroll"}</h2>
                <form onSubmit={handleSubmit} className="pd-modal-form">
                  <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                  <input name="employee_id" placeholder="Employee ID" value={formData.employee_id} onChange={handleChange} required />
                  <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
                  <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                  <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
                  <input type="number" name="bonus" placeholder="Bonus" value={formData.bonus} onChange={handleChange} />
                  <input type="number" name="deductions" placeholder="Deductions" value={formData.deductions} onChange={handleChange} />
                  <select name="currency" value={formData.currency} onChange={handleChange} required>
                    {currencies.map(cur => (
                      <option key={cur} value={cur}>{cur}</option>
                    ))}
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
