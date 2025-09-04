import React, { useEffect, useState } from "react";
import "./EmployeeProfile.css";

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    avatar: "",
  });

  useEffect(() => {
    // Get employee data from localStorage
    const storedEmployee = JSON.parse(localStorage.getItem("employee")) || {};
    setEmployee(storedEmployee);
  }, []);

  return (
    <div className="employee-profile card">
      <img
        src={employee.avatar || "https://via.placeholder.com/100"}
        alt="Avatar"
        className="avatar"
      />
      <div className="info">
        <h3>{employee.name || "John Doe"}</h3>
        <p>Email: {employee.email || "john@example.com"}</p>
        <p>Position: {employee.position || "Software Engineer"}</p>
        <p>Department: {employee.department || "IT"}</p>
      </div>
    </div>
  );
}
