import React, { useState } from "react";
import "./PolicyBot.css";
import { Link } from "react-router-dom";


const PolicyBot = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="privacy-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-item">
          <div
            className="sidebar-title"
            onClick={() => toggleSection("terms")}
          >
            Terms <span>{openSection === "terms" ? "▲" : "▼"}</span>
          </div>
          <div
            className={`sidebar-dropdown ${
              openSection === "terms" ? "open" : ""
            }`}
          >
            <ul className="sidebar-list">
              <li>General Terms</li>
              <li>Service Terms</li>
            </ul>
          </div>
        </div>

        <div className="sidebar-item">
          <div
            className="sidebar-title"
            onClick={() => toggleSection("privacy")}
          >
            Privacy <span>{openSection === "privacy" ? "▲" : "▼"}</span>
          </div>
          <div
            className={`sidebar-dropdown ${
              openSection === "privacy" ? "open" : ""
            }`}
          >
            <ul className="sidebar-list">
              <li>Privacy Overview</li>
              <li>Data Collection</li>
            </ul>
          </div>
        </div>

        <div className="sidebar-item">
          <div
            className="sidebar-title"
            onClick={() => toggleSection("security")}
          >
            Security and Compliance{" "}
            <span>{openSection === "security" ? "▲" : "▼"}</span>
          </div>
          <div
            className={`sidebar-dropdown ${
              openSection === "security" ? "open" : ""
            }`}
          >
            <ul className="sidebar-list">
              <li>Security Policy</li>
              <li>Compliance</li>
            </ul>
          </div>
        </div>

        <div className="sidebar-item">
          <div
            className="sidebar-title"
            onClick={() => toggleSection("policies")}
          >
            Policies <span>{openSection === "policies" ? "▲" : "▼"}</span>
          </div>
          <div
            className={`sidebar-dropdown ${
              openSection === "policies" ? "open" : ""
            }`}
          >
            <ul className="sidebar-list">
              <li>Cookie Policy</li>
              <li>Refund Policy</li>
              <li><Link to="/employeehandbookpolicy">Employee Handbook</Link></li>
              <li><Link to="/codeofconductpolicy">Code of Conduct</Link></li>
              <li><Link to="/leavepolicy">Leave Policy</Link></li>
              <li><Link to="/travelpolicy">Travel Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <h2>Summary of our Privacy Policy</h2>
        <p>
          It covers every Zoho website that links here, and all of the products
          and services contained on those websites. The{" "}
          <a href="#">detailed policy</a> follows the same structure as this
          summary and constitutes the actual legal document.
        </p>
        <p>
          <strong>Our privacy commitment:</strong> Zoho has never sold your
          information to someone else for advertising, or made money by showing
          you other people's ads, and we never will. This has been our approach
          for almost 25 years, and we remain committed to it. This policy tells
          you what information we collect from you, what we do with it, who can
          access it, and what you can do about it.
        </p>

        <hr />

        <p className="last-updated">
          <strong>Last updated on:</strong> 5th June 2023.
        </p>

        <h3>Part I – Information Zoho collects and controls</h3>
        <p>
          We only collect the information that we actually need. Some of that is
          information that you actively give us when you sign up for an account,
          register for an event, ask for customer support, or buy something from
          us. We store your name and contact information, but we don't store
          credit card numbers (except with your permission and in one of our
          secured payment gateways).
        </p>
      </div>
    </div>
  );
};

export default PolicyBot;
