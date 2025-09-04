// EmployeeSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeSignup.css";

const EmployeeSignup = () => {
  const [formData, setFormData] = useState({
    companyId: "",
    name: "",
    employeeId: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Fetch HR data
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    const employeesInfo = JSON.parse(localStorage.getItem("employeeInfo")) || [];

    // 🔹 Validate Company ID
    const companyExists = companies.find(
      (c) => c.companyId === formData.companyId
    );

    if (!companyExists) {
      alert("❌ Invalid Company ID. Please contact HR.");
      return;
    }

    // 🔹 Validate Employee info
    const employeeExists = employeesInfo.find(
      (emp) =>
        emp.companyId === formData.companyId &&
        emp.employeeId === formData.employeeId &&
        emp.name.toLowerCase() === formData.name.toLowerCase() &&
        emp.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (!employeeExists) {
      alert("❌ Your details do not match HR records. Please contact HR.");
      return;
    }

    // 🔹 Check if already signed up
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const alreadySigned = employees.find(
      (e) =>
        e.companyId === formData.companyId &&
        e.employeeId === formData.employeeId
    );

    if (alreadySigned) {
      alert("⚠️ You have already signed up. Redirecting to login...");
      navigate("/login");
      return;
    }

    // 🔹 Save employee credentials
    const newEmployee = {
      ...formData,
      status: "approved", // pre-approved by HR
    };

    employees.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(employees));

    // 🔹 Auto login
    localStorage.setItem("currentUser", JSON.stringify(newEmployee));

    alert("✅ Signup successful! Redirecting to your dashboard...");
    navigate("/employee-dashboard");
  };

  return (
    <div className="signup-container">
      <h2>Employee Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyId"
          placeholder="Enter Company ID"
          value={formData.companyId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Employee Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="employeeId"
          placeholder="Enter Employee ID"
          value={formData.employeeId}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Employee Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default EmployeeSignup;
