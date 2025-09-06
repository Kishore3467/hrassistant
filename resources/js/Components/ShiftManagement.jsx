import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSpinner,
} from "react-icons/fa";
import "./ShiftManagement.css";

export default function ShiftManagement() {
  const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
  const currentUser = currentUserData?.email || "guest";

  const [shifts, setShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    date: "",
    name: "",
    time: "",
    role: "Cashier",
    status: "Assigned",
    employee_id: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [currentShiftId, setCurrentShiftId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  // 🔹 Load shifts for current user
  const fetchShifts = () => {
    setLoading(true);
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("shifts")) || {};
      setShifts(data[currentUser] || []);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (currentUserData) {
      const stored = localStorage.getItem(`employees_${currentUserData.email}`);
      if (stored) {
        setEmployees(JSON.parse(stored));
      }
    }
    fetchShifts();
  }, []);

  // 🔹 Save shifts (per user)
  const saveShifts = (updatedShifts) => {
    const allShifts = JSON.parse(localStorage.getItem("shifts")) || {};
    allShifts[currentUser] = updatedShifts;
    localStorage.setItem("shifts", JSON.stringify(allShifts));
    setShifts(updatedShifts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newShift.date || !newShift.name || !newShift.time) {
      return alert("Please fill all required fields");
    }

    if (isEditing) {
      const updatedShifts = shifts.map((s) =>
        s.id === currentShiftId
          ? {
              ...newShift,
              id: currentShiftId,
              companyId: currentUserData.companyId,
            }
          : s
      );
      saveShifts(updatedShifts);
    } else {
      const newEntry = {
        ...newShift,
        id: Date.now(),
        companyId: currentUserData.companyId,
      };
      saveShifts([...shifts, newEntry]);
    }

    // Reset
    setIsEditing(false);
    setNewShift({
      date: "",
      name: "",
      time: "",
      role: "Cashier",
      status: "Assigned",
      employee_id: "",
    });
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

  const deleteShift = (id) => {
    if (window.confirm("Are you sure you want to delete this shift?")) {
      const updatedShifts = shifts.filter((s) => s.id !== id);
      saveShifts(updatedShifts);
    }
  };

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
        <div>
          <h1>Shift Management</h1>
          <p className="sm-subtitle">
            Efficiently manage and assign employee work schedules
          </p>
          <p className="sm-user">👤 Logged in as: {currentUser}</p>
        </div>
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

      {/* Add / Edit Form */}
      <form className="sm-form" onSubmit={handleSubmit}>
        <div className="sm-form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={newShift.date}
            onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
            required
          />
        </div>

        {/* Employee Dropdown */}
        <div className="sm-form-group">
          <label>Employee Name</label>
        <select
  name="name"
  value={newShift.name}
  onChange={(e) => {
    const selectedName = e.target.value;
    const selectedEmp = employees.find((emp) => emp.name === selectedName);
    setNewShift({
      ...newShift,
      name: selectedName,
      employee_id: selectedEmp ? (selectedEmp.employeeId || selectedEmp.id) : "", // ✅ fallback
    });
  }}
  required
>
  <option value="">Select Employee</option>
  {employees.map((emp) => (
    <option key={emp.employeeId || emp.id} value={emp.name}>
      {emp.name}
    </option>
  ))}
</select>

        </div>

        {/* Auto-filled Employee ID */}
        <div className="sm-form-group">
          <label>Employee ID</label>
          <input
            type="text"
            name="employee_id"
            value={newShift.employee_id}
            readOnly
          />
        </div>

        <div className="sm-form-group">
          <label>Shift Time</label>
          <select
            name="time"
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
            name="role"
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
            name="status"
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
                    <div className="sm-actions">
                      <button
                        type="button"
                        className="sm-edit"
                        onClick={() => editShift(shift)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        className="sm-delete"
                        onClick={() => deleteShift(shift.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="7" className="sm-no-results">
                    No shifts found matching your criteria
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
