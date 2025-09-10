// src/pages/Files.jsx
import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import "./Files.css";

const Files = () => {
  const [activeTab, setActiveTab] = useState("employee");
  const [companyId, setCompanyId] = useState(null);
  const [companyFiles, setCompanyFiles] = useState({
    employee: {},
    organization: [],
    team: [],
    reportee: [],
  });

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [fileLabel, setFileLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState({});
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification function
  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Load company info and employees on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setCompanyId(currentUser.email);

        // Fetch employees
        const storedEmployees = 
          JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || [];
        setEmployees(storedEmployees);

        // Fetch previously uploaded files
        const storedFiles = 
          JSON.parse(localStorage.getItem(`files_${currentUser.email}`)) || {
            employee: {},
            organization: [],
            team: [],
            reportee: [],
          };
        setCompanyFiles(storedFiles);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Save files in localStorage (per company)
  const saveFiles = (updatedFiles) => {
    setCompanyFiles(updatedFiles);
    if (companyId) {
      localStorage.setItem(`files_${companyId}`, JSON.stringify(updatedFiles));
    }
  };

  // File Upload Handler with progress simulation
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (activeTab === "employee") {
      if (!selectedEmployee) {
        showNotification("Please select an employee.", "warning");
        return;
      }
      if (!fileLabel) {
        showNotification("Please enter a file name (e.g., PAN Card).", "warning");
        return;
      }

      // Simulate upload progress for each file
      files.forEach((file, index) => {
        const fileId = `${Date.now()}-${index}`;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        
        // Simulate progress
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = prev[fileId] + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              // Add file to state when "upload" completes
              const updated = {
                ...companyFiles,
                employee: {
                  ...companyFiles.employee,
                  [selectedEmployee]: [
                    ...(companyFiles.employee[selectedEmployee] || []),
                    { label: fileLabel, name: file.name }
                  ],
                },
              };
              saveFiles(updated);
              
              // Remove from progress tracking
              const { [fileId]: removed, ...rest } = prev;
              return rest;
            }
            return { ...prev, [fileId]: newProgress };
          });
        }, 100);
      });
      
      setFileLabel("");
      showNotification(`Uploading ${files.length} file(s) for ${selectedEmployee}`, "success");
    } else {
      // For other tabs
      files.forEach((file, index) => {
        const fileId = `${Date.now()}-${index}`;
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = prev[fileId] + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              const updated = {
                ...companyFiles,
                [activeTab]: [...companyFiles[activeTab], file.name],
              };
              saveFiles(updated);
              
              const { [fileId]: removed, ...rest } = prev;
              return rest;
            }
            return { ...prev, [fileId]: newProgress };
          });
        }, 100);
      });
      
      showNotification(`Uploading ${files.length} file(s) to ${activeTab}`, "success");
    }
    
    // Reset file input
    e.target.value = '';
  };

  // Delete file handler
  const handleDeleteFile = (tab, employeeName, index) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      if (tab === "employee") {
        const updatedEmployeeFiles = [...companyFiles.employee[employeeName]];
        updatedEmployeeFiles.splice(index, 1);
        
        const updated = {
          ...companyFiles,
          employee: {
            ...companyFiles.employee,
            [employeeName]: updatedEmployeeFiles
          }
        };
        saveFiles(updated);
        showNotification("File deleted successfully", "success");
      } else {
        const updatedFiles = [...companyFiles[tab]];
        updatedFiles.splice(index, 1);
        
        const updated = {
          ...companyFiles,
          [tab]: updatedFiles
        };
        saveFiles(updated);
        showNotification("File deleted successfully", "success");
      }
    }
  };

  // Render Employee Files Tab
  const renderEmployeeFiles = () => (
    <div className="tab-content">
      <div className="tab-header">
        <h2>Employee Files</h2>
        <p>Upload and manage documents for individual employees</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Select Employee</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="modern-select"
          >
            <option value="">-- Select Employee --</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Document Type</label>
          <input
            type="text"
            value={fileLabel}
            onChange={(e) => setFileLabel(e.target.value)}
            placeholder="e.g., PAN Card, Aadhar, Resume"
            className="modern-input"
          />
        </div>
      </div>

      <div className="upload-section">
        <div className="upload-box">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            id="fileUpload"
            className="file-input"
          />
          <label htmlFor="fileUpload" className="upload-btn">
            <span className="upload-icon">📁</span>
            <span>Choose files or drag them here</span>
          </label>
        </div>
      </div>

      {/* Upload progress indicators */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="upload-progress-container">
          <h4>Uploading Files</h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="progress-item">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span>{progress}%</span>
            </div>
          ))}
        </div>
      )}

      {selectedEmployee && (
        <div className="files-list">
          <div className="list-header">
            <h3>
              Files for <span className="employee-name">{selectedEmployee}</span>
            </h3>
            <span className="file-count">
              {companyFiles.employee[selectedEmployee]?.length || 0} files
            </span>
          </div>
          
          {companyFiles.employee[selectedEmployee]?.length > 0 ? (
            <div className="file-cards">
              {companyFiles.employee[selectedEmployee].map((file, index) => (
                <div key={index} className="file-card">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <div className="file-label">{file.label}</div>
                    <div className="file-name">{file.name}</div>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteFile("employee", selectedEmployee, index)}
                    aria-label="Delete file"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <p>No files uploaded yet for this employee</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Render content for organization, team, and reportee tabs
  const renderGenericFiles = (tab) => (
    <div className="tab-content">
      <div className="tab-header">
        <h2>{tab.charAt(0).toUpperCase() + tab.slice(1)} Files</h2>
        <p>Upload and manage {tab} documents</p>
      </div>

      <div className="upload-section">
        <div className="upload-box">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            id="fileUpload"
            className="file-input"
          />
          <label htmlFor="fileUpload" className="upload-btn">
            <span className="upload-icon">📁</span>
            <span>Choose files or drag them here</span>
          </label>
        </div>
      </div>

      {/* Upload progress indicators */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="upload-progress-container">
          <h4>Uploading Files</h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="progress-item">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span>{progress}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="files-list">
        <div className="list-header">
          <h3>Uploaded Files</h3>
          <span className="file-count">{companyFiles[tab].length} files</span>
        </div>
        
        {companyFiles[tab].length > 0 ? (
          <div className="file-cards">
            {companyFiles[tab].map((file, index) => (
              <div key={index} className="file-card">
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <div className="file-name">{file}</div>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteFile(tab, null, index)}
                  aria-label="Delete file"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <p>No files uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your files...</p>
        </div>
      );
    }

    if (activeTab === "employee") return renderEmployeeFiles();
    return renderGenericFiles(activeTab);
  };

  if (!companyId && !isLoading) {
    return (
      <div className="files-page">
        <Topbar />
        <div className="content-box error-state">
          <div className="error-icon">⚠️</div>
          <h2>No Company Found</h2>
          <p>Please log in with a company account to upload files.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="files-page">
      <Topbar />
      
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="files-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Document Manager</h3>
          </div>
          <ul className="sidebar-nav">
            <li
              className={activeTab === "employee" ? "active" : ""}
              onClick={() => setActiveTab("employee")}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-text">Employee Files</span>
            </li>
            <li
              className={activeTab === "organization" ? "active" : ""}
              onClick={() => setActiveTab("organization")}
            >
              <span className="nav-icon">🏢</span>
              <span className="nav-text">Organization Files</span>
            </li>
            <li
              className={activeTab === "team" ? "active" : ""}
              onClick={() => setActiveTab("team")}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-text">Team Files</span>
            </li>
            <li
              className={activeTab === "reportee" ? "active" : ""}
              onClick={() => setActiveTab("reportee")}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Reportee Files</span>
            </li>
          </ul>
        </aside>

        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Files;