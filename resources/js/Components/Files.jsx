// src/pages/Files.jsx
import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import "./Files.css";

const Files = () => {
  const [activeTab, setActiveTab] = useState("employee");
  const [companyId, setCompanyId] = useState(null);
  const [companyFiles, setCompanyFiles] = useState({
    employee: {},   // 🔑 store files per employee
    organization: [],
    team: [],
    reportee: [],
  });

  const [employees, setEmployees] = useState([]); // ✅ employees list
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [fileLabel, setFileLabel] = useState("");

  // ✅ Load company info and employees on mount
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setCompanyId(currentUser.email);

      // fetch employees created in EmployeeInformation.jsx
      const storedEmployees =
        JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || [];
      setEmployees(storedEmployees);

      // fetch previously uploaded files for this company
      const storedFiles =
        JSON.parse(localStorage.getItem(`files_${currentUser.email}`)) || {
          employee: {},
          organization: [],
          team: [],
          reportee: [],
        };
      setCompanyFiles(storedFiles);
    }
  }, []);

  // ✅ Save files in localStorage (per company)
  const saveFiles = (updatedFiles) => {
    setCompanyFiles(updatedFiles);
    if (companyId) {
      localStorage.setItem(`files_${companyId}`, JSON.stringify(updatedFiles));
    }
  };

  // ✅ File Upload Handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (activeTab === "employee") {
      if (!selectedEmployee) {
        alert("⚠️ Please select an employee.");
        return;
      }
      if (!fileLabel) {
        alert("⚠️ Please enter a file name (e.g., PAN Card).");
        return;
      }

      const updated = {
        ...companyFiles,
        employee: {
          ...companyFiles.employee,
          [selectedEmployee]: [
            ...(companyFiles.employee[selectedEmployee] || []),
            ...files.map((f) => ({
              label: fileLabel,
              name: f.name,
            })),
          ],
        },
      };
      saveFiles(updated);
      setFileLabel(""); // reset file label
    } else {
      // organization / team / reportee
      const updated = {
        ...companyFiles,
        [activeTab]: [...companyFiles[activeTab], ...files.map((f) => f.name)],
      };
      saveFiles(updated);
    }
  };

  // ✅ Render Employee Files Tab
  const renderEmployeeFiles = () => (
    <div>
      <h2>Employee Files</h2>

      {/* Employee Selector */}
      <div className="employee-selector">
        <label>Select Employee:</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.name}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* File Label */}
      <div className="file-label-input">
        <label>File Name:</label>
        <input
          type="text"
          value={fileLabel}
          onChange={(e) => setFileLabel(e.target.value)}
          placeholder="e.g., PAN Card, Aadhar"
        />
      </div>

      {/* Upload Box */}
      <div className="upload-box">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="upload-btn">
          + Add File
        </label>
      </div>

      {/* Uploaded Files List */}
      {selectedEmployee && (
        <div className="uploaded-list">
          <h3>Files for {selectedEmployee}</h3>
          {companyFiles.employee[selectedEmployee]?.length > 0 ? (
            <ul>
              {companyFiles.employee[selectedEmployee].map((file, index) => (
                <li key={index}>
                  📄 {file.label} - {file.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-msg">No files uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );

  // ✅ Render content for all tabs
  const renderContent = () => {
    if (activeTab === "employee") return renderEmployeeFiles();

    return (
      <div className="file-content">
        <h2>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Files
        </h2>

        {/* Upload Box */}
        <div className="upload-box">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="upload-btn">
            + Add File
          </label>
        </div>

        {/* Uploaded Files */}
        <div className="uploaded-list">
          {companyFiles[activeTab].length > 0 ? (
            <ul>
              {companyFiles[activeTab].map((file, index) => (
                <li key={index}>📄 {file}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-msg">No files uploaded yet.</p>
          )}
        </div>
      </div>
    );
  };

  if (!companyId) {
    return (
      <div className="files-page">
        <Topbar />
        <div className="content-box">
          <h2>No Company Found</h2>
          <p>Please log in with a company account to upload files.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="files-page">
      {/* Topbar */}
      <Topbar />

      <div className="files-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li
              className={activeTab === "employee" ? "active" : ""}
              onClick={() => setActiveTab("employee")}
            >
              Employee Files
            </li>
            <li
              className={activeTab === "organization" ? "active" : ""}
              onClick={() => setActiveTab("organization")}
            >
              Organization Files
            </li>
            <li
              className={activeTab === "team" ? "active" : ""}
              onClick={() => setActiveTab("team")}
            >
              Team Files
            </li>
            <li
              className={activeTab === "reportee" ? "active" : ""}
              onClick={() => setActiveTab("reportee")}
            >
              Reportee Files
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Files;
