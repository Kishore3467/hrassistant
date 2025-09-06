// EmployeeInformation.jsx
import React, { useState, useEffect } from "react";
import "./employeeInfo.css";
import Topbar from "./Topbar";
import EmployeeCard from "./EmployeeCard";

function EmployeeInformation() {
  const [showIdModal, setShowIdModal] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    department: "",
    role: "",
    joiningDate: "",
    leaveDetails: "",
    salary: "",
    image: "",
    aadhar: "",
    pan: "",
    bankPassbook: "",
    educationCertificates: [],
  });
  const [viewEmployee, setViewEmployee] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const show = urlParams.get("show");
  const [activeTab, setActiveTab] = useState(
    show === "basic" ? "Basic Details" : "Policy"
  );

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`employees_${currentUser.email}`);
      if (stored) setEmployees(JSON.parse(stored));
    }
  }, [currentUser]);

  const generateEmployeeId = () => {
    const newId = "EMP-" + Math.floor(Math.random() * 100000);
    setEmployeeId(newId);
    setFormData({ ...formData, employeeId: newId });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "educationCertificates") {
        const filePromises = [...files].map((file) => toBase64(file));
        const base64Files = await Promise.all(filePromises);
        setFormData({ ...formData, [name]: base64Files });
      } else {
        const base64File = await toBase64(files[0]);
        setFormData({ ...formData, [name]: base64File });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    if (!currentUser) {
      alert("❌ Please sign in first!");
      return;
    }

    if (!formData.employeeId) {
      alert("❌ Please generate an Employee ID first!");
      return;
    }

    let updatedEmployees;
    if (editEmployeeId) {
      // Update existing employee
      updatedEmployees = employees.map((emp) =>
        emp.employeeId === editEmployeeId ? { ...formData } : emp
      );
      alert("✅ Employee updated successfully!");
      setEditEmployeeId(null);
    } else {
      // New employee
      updatedEmployees = [...employees, { ...formData }];
      alert("✅ Employee created successfully!");
    }

    setEmployees(updatedEmployees);
   localStorage.setItem(`employees_${currentUser.email}`, JSON.stringify(updatedEmployees));


    // Save globally for signup validation
    const allEmployees = JSON.parse(localStorage.getItem("employeeInfo")) || [];
    const alreadyExists = allEmployees.find(
      (e) => e.employeeId === formData.employeeId
    );
    if (!alreadyExists) {
      allEmployees.push({ ...formData, companyId: currentUser.companyId });
      localStorage.setItem("employeeInfo", JSON.stringify(allEmployees));
    }

    // Reset form
    setFormData({
      name: "",
      employeeId: "",
      email: "",
      department: "",
      role: "",
      joiningDate: "",
      leaveDetails: "",
      salary: "",
      image: "",
      aadhar: "",
      pan: "",
      bankPassbook: "",
      educationCertificates: [],
    });
    setEmployeeId(null);
  };

  const handleViewDetails = (employee) => {
    setViewEmployee(employee);
    setShowDetailsModal(true);
  };

  return (
    <div className="employee-info-page">
      <Topbar />

      <header className="employee-header">
        <h2>Employee Information</h2>
        <nav className="tabs">
          {["Policy", "HR Process", "Extend Service", "Access Control"].map(
            (tab) => (
              <span
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            )
          )}
        </nav>
      </header>

      <div className="employee-content">
        <aside className="sidebar">
          <ul>
            <li
              className={activeTab === "Basic Details" ? "active" : ""}
              onClick={() => setActiveTab("Basic Details")}
            >
              Basic Details
            </li>
            <li onClick={() => setShowIdModal(true)}>Employee ID</li>
            <li>Employee Status</li>
            <li>Career History</li>
            <li>Resources</li>
          </ul>
        </aside>

        <main className="main-panel">
          {activeTab === "HR Process" && (
            <div className="hr-form">
              <h3>Employee Details Form</h3>
              <form>
                {[
                  { label: "Employee ID", name: "employeeId", type: "text" },
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Department", name: "department", type: "text" },
                  { label: "Role", name: "role", type: "text" },
                  { label: "Joining Date", name: "joiningDate", type: "date" },
                  { label: "Leave Details", name: "leaveDetails", type: "text" },
                  { label: "Salary", name: "salary", type: "number" },
                ].map((field) => (
                  <label key={field.name}>
                    {field.label}:
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </label>
                ))}

                {[
                  { label: "Employee Photo", name: "image", multiple: false },
                  { label: "Aadhar Card", name: "aadhar" },
                  { label: "PAN Card", name: "pan" },
                  { label: "Bank Passbook", name: "bankPassbook" },
                  {
                    label: "Educational Certificates",
                    name: "educationCertificates",
                    multiple: true,
                  },
                ].map((field) => (
                  <label key={field.name}>
                    {field.label}:
                    <input
                      type="file"
                      name={field.name}
                      multiple={field.multiple || false}
                      accept={field.name === "image" ? "image/*" : undefined}
                      onChange={handleChange}
                    />
                  </label>
                ))}

                <button type="button" onClick={handleSave}>
                  Save Employee
                </button>
              </form>
            </div>
          )}

          {activeTab === "Basic Details" && (
            <div className="basic-details">
              <h3>Saved Employees</h3>
              {employees.length > 0 ? (
                <div className="employee-grid">
                  {employees.map((emp) => (
                    <EmployeeCard
                      key={emp.employeeId}
                      employee={emp}
                      onView={(emp) => handleViewDetails(emp)}
                      onEdit={(emp) => {
                        setFormData(emp);
                        setActiveTab("HR Process");
                        setEditEmployeeId(emp.employeeId);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p>No employees saved yet.</p>
              )}
            </div>
          )}
        </main>
      </div>

      {showIdModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-icon" onClick={() => setShowIdModal(false)}>
              &times;
            </span>
            <h3>Generate Employee ID</h3>
            {!employeeId ? (
              <>
                <p>Click the button to generate a unique Employee ID.</p>
                <button onClick={generateEmployeeId}>Generate ID</button>
              </>
            ) : (
              <p className="success-msg">
                ✅ Employee ID generated: <strong>{employeeId}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {showDetailsModal && viewEmployee && (
        <div className="modal-overlay">
          <div className="modal">
            <span
              className="close-icon"
              onClick={() => setShowDetailsModal(false)}
            >
              &times;
            </span>
            <h3>Employee Details</h3>
            {viewEmployee.image && (
              <img
                src={viewEmployee.image}
                alt={viewEmployee.name}
                className="employee-photo"
              />
            )}
            <p>
              <b>Name:</b> {viewEmployee.name}
            </p>
            <p>
              <b>Employee ID:</b> {viewEmployee.employeeId}
            </p>
            <p>
              <b>Email:</b> {viewEmployee.email}
            </p>
            <p>
              <b>Department:</b> {viewEmployee.department}
            </p>
            <p>
              <b>Role:</b> {viewEmployee.role}
            </p>
            <p>
              <b>Joining Date:</b> {viewEmployee.joiningDate}
            </p>
            <p>
              <b>Leave Details:</b> {viewEmployee.leaveDetails}
            </p>
            <p>
              <b>Salary:</b> {viewEmployee.salary}
            </p>
            <p>
              <b>Aadhar:</b>{" "}
              {viewEmployee.aadhar ? (
                <a href={viewEmployee.aadhar} target="_blank" rel="noreferrer">
                  View
                </a>
              ) : (
                "Not Uploaded"
              )}
            </p>
            <p>
              <b>PAN:</b>{" "}
              {viewEmployee.pan ? (
                <a href={viewEmployee.pan} target="_blank" rel="noreferrer">
                  View
                </a>
              ) : (
                "Not Uploaded"
              )}
            </p>
            <p>
              <b>Bank Passbook:</b>{" "}
              {viewEmployee.bankPassbook ? (
                <a
                  href={viewEmployee.bankPassbook}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              ) : (
                "Not Uploaded"
              )}
            </p>
            <p>
              <b>Education Certificates:</b>{" "}
              {viewEmployee.educationCertificates.length > 0
                ? viewEmployee.educationCertificates.map((cert, i) => (
                    <span key={i}>
                      <a href={cert} target="_blank" rel="noreferrer">
                        Cert {i + 1}
                      </a>{" "}
                    </span>
                  ))
                : "Not Uploaded"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeInformation;
