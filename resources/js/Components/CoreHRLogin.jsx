import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./CoreHRLogin.css";
import { useNavigate } from "react-router-dom";
 
const CoreHRLogin = () => {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
 
  const [showPassword, setShowPassword] = useState(false);
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
 
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
 
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (!validateEmail(formData.username)) {
      alert("Please enter a valid email address.");
      return;
    }
 
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
 
    // If validation passes, navigate to /corehr
    alert(`Logging in as ${formData.username}`);
    navigate("/corehr");
  };
 
  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "25px" }}>
          <img
            src="/logo.png"
            alt="CoreHR Logo"
            style={{ maxWidth: "150px", height: "auto", margin: "0 auto", display: "block" }}
          />
        </div>
 
        <h2 className="login-title">CoreHR Portal</h2>
 
        <div className="input-group">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="username"
            placeholder="Email"
            className="login-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
 
        <div className="input-group" style={{ position: "relative" }}>
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={toggleShowPassword}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
 
        <div className="form-footer">
          <label className="remember-label">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember me
          </label>
        </div>
 
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};
 
export default CoreHRLogin;
 