import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaListUl,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaCaretDown,
  FaUserCheck,
  FaFileSignature,
  FaChartLine,
  FaRobot,
  FaFileAlt,
  FaUsers,
  FaUserTie,
  FaMoneyCheckAlt, // Icon for Payroll
  FaBullhorn // Icon for AI Influencer Marketing
} from "react-icons/fa";
 
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
 
  // Close mobile menu & dropdown when clicking a link
  const handleLinkClick = () => {
    setMenuOpen(false);
    setFeaturesOpen(false);
  };
 
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={handleLinkClick}>
          <img src="./logo.png" alt="logo" />
        </Link>
        <span className="company-name"></span>
      </div>
 
      {/* Desktop and Mobile Menu */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>
            <FaInfoCircle /> About
          </Link>
        </li>
 
        {/* Features dropdown */}
        <li
          className="dropdown"
          onClick={() => setFeaturesOpen(!featuresOpen)}
        >
          <div className="dropdown-toggle">
            <FaListUl /> Features <FaCaretDown className="caret-icon" />
          </div>
 
          {/* Dropdown menu */}
          <ul className={`dropdown-menu ${featuresOpen ? "show" : ""}`}>
            <li>
              <Link to="/herosectiononboarding" onClick={handleLinkClick}>
                <FaUserCheck style={{ marginRight: "8px" }} /> Hiring & Onboarding
              </Link>
            </li>
            <li>
              <Link to="/offerlettergenerator" onClick={handleLinkClick}>
                <FaFileSignature style={{ marginRight: "8px" }} /> Offer Letter
              </Link>
            </li>
            <li>
              <Link to="/herosection" onClick={handleLinkClick}>
                <FaUsers style={{ marginRight: "8px" }} /> Core HR
              </Link>
            </li>
            <li>
              <Link
                to="/performancelogin"
                onClick={handleLinkClick}
              >
                <FaChartLine style={{ marginRight: "8px" }} /> Performance & Development
              </Link>
            </li>
            <li>
              <Link to="/employeedashboard" onClick={handleLinkClick}>
                <FaUserTie style={{ marginRight: "8px" }} /> Employee Portal
              </Link>
            </li>
            <li>
              <Link to="/chatbot" onClick={handleLinkClick}>
                <FaRobot style={{ marginRight: "8px" }} /> HR Chatbot
              </Link>
            </li>
            <li>
              <Link to="/policybot" onClick={handleLinkClick}>
                <FaFileAlt style={{ marginRight: "8px" }} /> Policy
              </Link>
            </li>
            <li>
              <Link to="/payrolllanding" onClick={handleLinkClick}>
                <FaMoneyCheckAlt style={{ marginRight: "8px" }} /> Payroll Management
              </Link>
            </li>
            <li>
              <Link to="/employee-dashboard1" onClick={handleLinkClick}>
                <FaBullhorn style={{ marginRight: "8px" }} /> AI Influencer Marketing
              </Link>
            </li>
 
            {/* All Features button at the end */}
            <li>
              <Link
                to="/features"
                onClick={handleLinkClick}
                className="all-features-btn"
              >
                All Features
              </Link>
            </li>
          </ul>
        </li>
 
        <li>
          <Link to="/contact" onClick={handleLinkClick}>
            <FaEnvelope /> Contact
          </Link>
        </li>
      </ul>
 
      {/* Mobile Toggle */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}
 