import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// token attach pannura middleware
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function EmployeeInformation() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // employees fetch pannura function
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch employees. Please login again.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // input changes handle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // save new employee
  const handleSave = async () => {
    try {
      await api.post("/employees", formData);
      alert("Employee saved successfully!");
      setFormData({ name: "", email: "", phone: "" });
      fetchEmployees();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to save employee. Please check console.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Information</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Add Employee</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <div>
        <h3>Saved Employees</h3>
        {employees.length > 0 ? (
          <ul>
            {employees.map((emp) => (
              <li key={emp.id}>
                <b>{emp.name}</b> - {emp.email} - {emp.phone}
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default EmployeeInformation;
