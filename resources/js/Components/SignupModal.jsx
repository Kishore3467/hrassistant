import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupModal.css";

const SignupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    agree: false,
    logo: "/default-logo.png",
  });

  const [error, setError] = useState("");
  const [isSignin, setIsSignin] = useState(false);
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [signinError, setSigninError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((user) => user.email === formData.email);

    if (emailExists) {
      setError("Email already taken. Please sign in.");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(formData));
    setError("");
    navigate("/dashboard");
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === signinEmail);

    if (!user) {
      setSigninError("Email not registered. Please sign up.");
      return;
    }

    if (user.password !== signinPassword) {
      setSigninError("Incorrect password. Try again.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    setSigninError("");
    navigate("/dashboard");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>✖</button>

        {!isSignin ? (
          <>
            <div className="modal-header"><h2>Start your 30-day free trial</h2></div>
            {error && <p className="error-message">{error} <span style={{color:'blue', cursor:'pointer'}} onClick={() => {setIsSignin(true); setError("");}}>Sign In</span></p>}
            <form className="modal-form" onSubmit={handleSignup}>
              <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} required />
              <label className="checkbox">
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required /> I agree to the <a href="#">Terms</a> and <a href="#">Privacy</a>.
              </label>
              <button type="submit" className="btn-submit">FREE SIGN UP</button>
            </form>
          </>
        ) : (
          <>
            <div className="modal-header"><h2>Sign In</h2></div>
            {signinError && <p className="error-message">{signinError}</p>}
            <form className="modal-form" onSubmit={handleSignin}>
              <input type="email" placeholder="Email *" value={signinEmail} onChange={(e) => setSigninEmail(e.target.value)} required />
              <input type="password" placeholder="Password *" value={signinPassword} onChange={(e) => setSigninPassword(e.target.value)} required />
              <button type="submit" className="btn-submit">SIGN IN</button>
              <p>Don't have an account? <span style={{color:'blue', cursor:'pointer'}} onClick={() => {setIsSignin(false); setSigninError("");}}>Sign Up</span></p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
