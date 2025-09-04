import React, { useState, useEffect, useContext } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";
import "./ShiftManagement.css";
import { UserContext } from "../UserContext";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

export default function ShiftManagement() {
  const { currentUser } = useContext(UserContext);

  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newShift, setNewShift] = useState({
    date: "",
    name: "",
    time: "",
    role: "Cashier",
    status: "Assigned",
    employee_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentShiftId, setCurrentShiftId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  // Fetch employees from database
  const fetchEmployees = async () => {
    if (!currentUser) return;
    try {
      const res = await api.get(`/employees?companyId=${currentUser.companyId}`);
      if (Array.isArray(res.data)) setEmployees(res.data);
      else setEmployees([]);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employees");
    }
  };

  // Fetch shifts from database
  const fetchShifts = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await api.get(`/shifts?companyId=${currentUser.companyId}`);
      if (Array.isArray(res.data)) setShifts(res.data);
      else setShifts([]);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch shifts");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
    fetchShifts();
  }, [currentUser]);

  // Save or update shift in database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newShift.date || !newShift.name || !newShift.time) {
      return alert("Please fill all required fields");
    }

    try {
      const payload = {
        ...newShift,
        company_id: currentUser.companyId,
      };

      if (isEditing) {
        await api.put(`/shifts/${currentShiftId}`, payload);
        alert("✅ Shift updated successfully!");
      } else {
        await api.post("/shifts", payload);
        alert("✅ Shift added successfully!");
      }

      setIsEditing(false);
      setCurrentShiftId(null);
      setNewShift({
        date: "",
        name: "",
        time: "",
        role: "Cashier",
        status: "Assigned",
        employee_id: "",
      });

      fetchShifts(); // Refresh table
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to save shift. Check console for details.");
    }
  };

  const editShift = (shift) => {
    setNewShift({
      date: shift.date,
      name: shift.name,
      time: shift.time,
      role: shift.role,
      status: shift.status,
      employee_id: shift.employee_id,
    });
    setIsEditing(true);
    setCurrentShiftId(shift.id);
  };

  const deleteShift = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shift?")) return;
    try {
      await api.delete(`/shifts/${id}`);
      fetchShifts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete shift");
    }
  };

  // Filtered shifts
  const filteredShifts = shifts.filter((shift) => {
    const matchesSearch =
      shift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shift.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shift.employee_id || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      shift.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="sm-container">
      <header className="sm-header">
        <h1>Shift Management</h1>
        <p className="sm-subtitle">Efficiently manage and assign employee work schedules</p>
        <p className="sm-user">👤 Logged in as: {currentUser?.name || "Guest"}</p>
      </header>

      {/* Search & Filter */}
      <div className="sm-controls">
        <div className="sm-search">
          <FaSearch className="sm-search-icon" />
          <input
            type="text"
            placeholder="Search shifts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sm-filter">
          <FaFilter className="sm-filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Form */}
      <form className="sm-form" onSubmit={handleSubmit}>
        <div className="sm-form-group">
          <label>Date</label>
          <input
            type="date"
            value={newShift.date}
            onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
            required
          />
        </div>

        <div className="sm-form-group">
          <label>Employee Name</label>
          <select
            value={newShift.name}
            onChange={(e) => {
              const selectedName = e.target.value;
              const selectedEmp = employees.find((emp) => emp.name === selectedName);
              setNewShift({
                ...newShift,
                name: selectedName,
                employee_id: selectedEmp ? selectedEmp.employee_id : "",
              });
            }}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.employee_id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm-form-group">
          <label>Employee ID</label>
          <input type="text" value={newShift.employee_id} readOnly />
        </div>

        <div className="sm-form-group">
          <label>Shift Time</label>
          <select
            value={newShift.time}
            onChange={(e) => setNewShift({ ...newShift, time: e.target.value })}
            required
          >
            <option value="">Select Shift Time</option>
            <option value="06:00 AM - 02:00 PM">06:00 AM - 02:00 PM</option>
            <option value="02:00 PM - 11:00 PM">02:00 PM - 11:00 PM</option>
            <option value="11:00 PM - 06:00 AM">11:00 PM - 06:00 AM</option>
          </select>
        </div>

        <div className="sm-form-group">
          <label>Role</label>
          <select
            value={newShift.role}
            onChange={(e) => setNewShift({ ...newShift, role: e.target.value })}
          >
            <option value="Cashier">Cashier</option>
            <option value="Manager">Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div className="sm-form-group">
          <label>Status</label>
          <select
            value={newShift.status}
            onChange={(e) => setNewShift({ ...newShift, status: e.target.value })}
          >
            <option value="Assigned">Assigned</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" className="sm-submit">
          <FaPlus /> {isEditing ? "Update Shift" : "Add Shift"}
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="sm-loading">
          <FaSpinner className="sm-spinner" /> Loading shifts...
        </div>
      )}

      {/* Shifts Table */}
      <div className="sm-table-wrapper">
        <table className="sm-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>ID</th>
              <th>Shift Time</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.length > 0 ? (
              filteredShifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.date}</td>
                  <td>{shift.name}</td>
                  <td>{shift.employee_id}</td>
                  <td>{shift.time}</td>
                  <td>{shift.role}</td>
                  <td>
                    <span className={`sm-status ${shift.status.toLowerCase()}`}>
                      {shift.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => editShift(shift)}><FaEdit /></button>
                    <button onClick={() => deleteShift(shift.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="7">No shifts found</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
