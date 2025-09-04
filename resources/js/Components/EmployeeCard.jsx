import React from "react";
import "./employeeCard.css";

export default function EmployeeCard({ employee, onView, onEdit }) {
  return (
    <div className="employee-card">
      {employee.image && <img src={employee.image} alt={employee.name} className="employee-photo" />}
      <div className="employee-info">
        <p><b>Name:</b> {employee.name}</p>
        <p><b>Email:</b> {employee.email}</p>
        <p><b>Department:</b> {employee.department}</p>
        <p><b>Role:</b> {employee.role}</p>
      </div>
      <div className="employee-actions">
        <button onClick={() => onView(employee)}>View Details</button>
        <button onClick={() => onEdit(employee)}>Edit</button>
      </div>
    </div>
  );
}
