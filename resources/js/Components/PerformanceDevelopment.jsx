import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaSearch, FaTrash, FaChartLine } from "react-icons/fa";
import "./PerformanceDevelopment.css";

export default function PerformanceDevelopment() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "",
    rating: "",
    last_review: ""
  });
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/performance-employees");
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    const newId = `EMP${String(employees.length + 1).padStart(3, '0')}`;

    try {
      const payload = {
        employee_id: newId,
        name: newEmployee.name,
        role: newEmployee.role,
        department: newEmployee.department,
        rating: parseFloat(newEmployee.rating), // convert to numeric
        last_review: newEmployee.last_review    // match backend field
      };

      const res = await axios.post("http://127.0.0.1:8000/api/performance-employees", payload);

      // Add to local state for instant UI update
      setEmployees([...employees, { ...payload, id: newId }]);
      setNewEmployee({ name: "", role: "", department: "", rating: "", last_review: "" });
      setShowEmployeeForm(false);
    } catch (err) {
      console.error("Error adding employee:", err.response?.data || err);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/performance-employees/${id}`);
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (err) {
        console.error("Error deleting employee:", err.response?.data || err);
      }
    }
  };

  return (
    <div className="pd-container">
      <header className="pd-header">
        <div className="pd-header-content">
          <h1 className="pd-main-title">Performance & Development</h1>
          <p className="pd-subtitle">Track and enhance employee performance through measurable goals</p>
        </div>
      </header>

      <div className="pd-card">
        <div className="pd-card-header">
          <h2 className="pd-card-title">
            <FaChartLine className="pd-card-icon" />
            Employee Performance Metrics
          </h2>
          <div className="pd-header-actions">
            <div className="pd-search-container">
              <FaSearch className="pd-search-icon" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pd-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="pd-add-employee-btn"
              onClick={() => setShowEmployeeForm(!showEmployeeForm)}
            >
              <FaPlus /> Add Employee
            </button>
          </div>
        </div>

        {showEmployeeForm && (
          <form className="pd-employee-form" onSubmit={handleEmployeeSubmit}>
            <div className="pd-form-row">
              <div className="pd-form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={newEmployee.name}
                  onChange={handleEmployeeChange}
                  className="pd-form-input"
                  required
                />
              </div>
              <div className="pd-form-group">
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={newEmployee.role}
                  onChange={handleEmployeeChange}
                  className="pd-form-input"
                  required
                />
              </div>
            </div>
            <div className="pd-form-row">
              <div className="pd-form-group">
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={newEmployee.department}
                  onChange={handleEmployeeChange}
                  className="pd-form-input"
                  required
                />
              </div>
              <div className="pd-form-group">
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (0-5)"
                  min="0"
                  max="5"
                  step="0.1"
                  value={newEmployee.rating}
                  onChange={handleEmployeeChange}
                  className="pd-form-input"
                  required
                />
              </div>
              <div className="pd-form-group">
                <input
                  type="date"
                  name="last_review"
                  value={newEmployee.last_review}
                  onChange={handleEmployeeChange}
                  className="pd-form-input"
                  required
                />
              </div>
            </div>
            <div className="pd-form-actions">
              <button type="button" className="pd-cancel-btn" onClick={() => setShowEmployeeForm(false)}>
                Cancel
              </button>
              <button type="submit" className="pd-submit-btn">
                Add Employee
              </button>
            </div>
          </form>
        )}

        <div className="pd-table-container">
          <table className="pd-table">
            <thead>
              <tr>
                <th className="pd-th-left">Employee ID</th>
                <th className="pd-th-left">Name</th>
                <th className="pd-th-left">Role</th>
                <th className="pd-th-left">Department</th>
                <th className="pd-th-center">Rating</th>
                <th className="pd-th-right">Last Review</th>
                <th className="pd-th-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id}>
                  <td className="pd-td-left">{emp.id}</td>
                  <td className="pd-td-left pd-employee-name">{emp.name}</td>
                  <td className="pd-td-left">{emp.role}</td>
                  <td className="pd-td-left">{emp.department}</td>
                  <td className="pd-td-center">
                    <span className={`pd-rating ${emp.rating >= 4.5 ? "pd-rating-excellent" : emp.rating >= 4.0 ? "pd-rating-good" : "pd-rating-average"}`}>
                      {emp.rating} ⭐
                    </span>
                  </td>
                  <td className="pd-td-right">{new Date(emp.last_review).toLocaleDateString()}</td>
                  <td className="pd-td-center">
                    <button onClick={() => deleteEmployee(emp.id)} className="pd-delete-btn" title="Delete employee">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
