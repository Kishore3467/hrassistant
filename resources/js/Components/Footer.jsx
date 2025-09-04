import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";
import "./Footer.css";
 
const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
 
  const [submitted, setSubmitted] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add backend API call here
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };
 
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3>About</h3>
          <p>
            <FaMapMarkerAlt className="icon" />
            123 Innovation Drive, Tech City, State 12345
          </p>
          <p>
            <FaEnvelope className="icon" />
            info@example.com
          </p>
          <p>
            <FaPhoneAlt className="icon" />
            +1 234 567 8900
          </p>
        </div>
 
        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            {["Home", "About", "Features", "Contact"].map(
              (link) => (
                <li key={link}>
                  <FaArrowRight className="arrow-icon" />
                  <a href={`/${link.toLowerCase()}`}>{link}</a>
                </li>
              )
            )}
          </ul>
        </div>
 
        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
 
        {/* Client Suggestion Form */}
        <div className="footer-section suggestion-form">
          <h3>Candidate Suggestion</h3>
          {submitted && (
            <p className="success-message">Thank you for your feedback!</p>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <textarea
              name="message"
              placeholder="Your feedback..."
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
 
      {/* Footer Bottom inside footer */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Your Company | All rights reserved.
      </div>
    </footer>
  );
};
 
export default Footer;