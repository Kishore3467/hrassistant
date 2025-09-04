import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import "./PolicyBot.css"; 
import "./EmployeeHandbookPolicy.css";

const EmployeeHandbookPolicy = () => {
  const [openSection, setOpenSection] = useState("policies"); // default open Policies

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/policies/employee-handbook.pdf";
    link.setAttribute("download", "employee-handbook.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="privacy-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-item">
          <div className="sidebar-title" onClick={() => toggleSection("terms")}>
            Terms <span>{openSection === "terms" ? "▲" : "▼"}</span>
          </div>
          {openSection === "terms" && (
            <ul className="sidebar-list">
              <li>General Terms</li>
              <li>Service Terms</li>
            </ul>
          )}
        </div>

        <div className="sidebar-item">
          <div className="sidebar-title" onClick={() => toggleSection("privacy")}>
            Privacy <span>{openSection === "privacy" ? "▲" : "▼"}</span>
          </div>
          {openSection === "privacy" && (
            <ul className="sidebar-list">
              <li>Privacy Overview</li>
              <li>Data Collection</li>
            </ul>
          )}
        </div>

        <div className="sidebar-item">
          <div className="sidebar-title" onClick={() => toggleSection("security")}>
            Security and Compliance{" "}
            <span>{openSection === "security" ? "▲" : "▼"}</span>
          </div>
          {openSection === "security" && (
            <ul className="sidebar-list">
              <li>Security Policy</li>
              <li>Compliance</li>
            </ul>
          )}
        </div>

        <div className="sidebar-item">
          <div className="sidebar-title" onClick={() => toggleSection("policies")}>
            Policies <span>{openSection === "policies" ? "▲" : "▼"}</span>
          </div>
          {openSection === "policies" && (
            <ul className="sidebar-list">
              <li><Link to="/employeepolicy">Abuse Policy</Link></li>
              <li><Link to="/antispampolicy">Anti-Spam Policy</Link></li>
              <li><Link to="/iprcomplaints">IPR Complaints Policy</Link></li>
              <li><Link to="/employeehandbookpolicy" className="active">Employee Handbook</Link></li>
            </ul>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="policy-content">
        <h1 className="policy-title">📘 Employee Handbook</h1>
        <p className="policy-intro">
          Our Employee Handbook provides essential guidelines, workplace policies,
          and benefits for employees. It ensures alignment with our values and
          helps you understand your rights and responsibilities.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est expedita, iusto ad consequatur similique ipsa quaerat ullam placeat nisi odit facilis molestias fugiat numquam illo dicta nostrum possimus unde tempore. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt nostrum eum architecto asperiores deleniti quia, vero voluptate? Aspernatur sit ratione fugit, illum nihil voluptate dolore tenetur doloremque tempora ducimus reiciendis!
        </p>

        <h2 className="section-title">What’s Inside?</h2>
        <ul className="policy-list">
          <li>✅ Company Vision & Mission</li>
          <li>✅ Workplace Code of Conduct</li>
          <li>✅ Employee Benefits & Compensation</li>
          <li>✅ Leave & Attendance Policies</li>
          <li>✅ Performance & Growth Opportunities</li>
        </ul>

        <button onClick={handleDownload} className="download-btn">
          <FiDownload /> Download Handbook
        </button>
      </div>
    </div>
  );
};

export default EmployeeHandbookPolicy;
