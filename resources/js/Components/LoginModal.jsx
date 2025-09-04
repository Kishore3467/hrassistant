import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true, // ✅ session cookies
});

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", formData); // send email + password
      const user = res.data.user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard"); // redirect to HrDashboard
    } catch (err) {
      console.error(err.response);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button onClick={onClose}>✖</button>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
