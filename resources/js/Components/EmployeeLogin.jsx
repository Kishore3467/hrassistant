import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Get all employees stored
    const employees = JSON.parse(localStorage.getItem("employeeInfo")) || [];

    const employee = employees.find(
      (e) => e.email === email && e.employeeId === employeeId
    );

    if (employee) {
      localStorage.setItem("currentEmployee", JSON.stringify(employee));
      navigate("/employee-dashboard1"); // Redirect after login
    } else {
      alert("❌ Invalid Email or Employee ID!");
    }
  };

  return (
    <div>
      <h2>Employee Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default EmployeeLogin;
