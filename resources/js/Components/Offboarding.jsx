// File: Offboarding.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Topbar from "./Topbar";
import Modal from "react-modal";
import "./Offboarding.css";

// Fix Modal accessibility
Modal.setAppElement(document.body);

const Offboarding = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [exitDropdownOpen, setExitDropdownOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  // Company-specific reasons
  const [companyReasons, setCompanyReasons] = useState({
    resignation: [],
    termination: [],
    deceased: []
  });

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user && user.companyId) {
      setCompanyId(user.companyId);

      const storedReasons =
        JSON.parse(localStorage.getItem(`offboarding_${user.companyId}`)) || {
          resignation: ["Career Opportunities", "Starting Own Business", "Moving Abroad"],
          termination: ["Policy Violation", "Performance Issues"],
          deceased: ["Natural Causes", "Medical Condition"]
        };

      setCompanyReasons(storedReasons);
    }
  }, []);

  const saveReasons = (updatedReasons) => {
    setCompanyReasons(updatedReasons);
    if (companyId) {
      localStorage.setItem(`offboarding_${companyId}`, JSON.stringify(updatedReasons));
    }
  };

  // CRUD for reasons
  const handleAddReason = (type) => {
    const newReason = prompt("Enter new reason:");
    if (newReason) {
      const updated = { ...companyReasons, [type]: [...companyReasons[type], newReason] };
      saveReasons(updated);
    }
  };

  const handleEditReason = (type, index) => {
    const updatedReason = prompt("Edit reason:", companyReasons[type][index]);
    if (updatedReason) {
      const updated = { ...companyReasons };
      updated[type][index] = updatedReason;
      saveReasons(updated);
    }
  };

  const handleDeleteReason = (type, index) => {
    if (window.confirm("Are you sure you want to delete this reason?")) {
      const updated = {
        ...companyReasons,
        [type]: companyReasons[type].filter((_, i) => i !== index)
      };
      saveReasons(updated);
    }
  };

  // Modal controls
  const openModal = (type) => {
    setFormType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setReason("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted ${formType} reason:`, reason);
    closeModal();
  };

  // Reusable Reason List
  const ReasonList = ({ title, type }) => (
    <div className="content-box">
      <div className="header-row">
        <h2>{title}</h2>
        <button className="add-btn" onClick={() => handleAddReason(type)}>
          Add Reason
        </button>
      </div>

      <h4>Customize and Rearrange Reason</h4>
      <div className="reason-list">
        {companyReasons[type].map((reason, index) => (
          <div key={index} className="reason-item">
            <span className="drag-handle">⋮⋮</span>
            <span className="reason-text">{reason}</span>
            <div className="reason-actions">
              <FaEdit
                className="icon edit"
                onClick={() => handleEditReason(type, index)}
              />
              <FaTrash
                className="icon delete"
                onClick={() => handleDeleteReason(type, index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Content switcher
  const renderContent = () => {
    switch (activeSection) {
      case "resignation":
        return <ReasonList title="Resignation Reason" type="resignation" />;
      case "termination":
        return <ReasonList title="Termination Reason" type="termination" />;
      case "deceased":
        return <ReasonList title="Deceased Reason" type="deceased" />;
      default:
        return (
          <div className="content-box">
            <h2>Offboarding Overview</h2>
            <p>
              Manage the offboarding process of employees including exit interviews,
              knowledge transfer, asset collection, and compliance checks.
            </p>
            {/* <div className="button-group">
              <button className="btn resign-btn" onClick={() => openModal("Resignation")}>
                Resignation Form
              </button>
              <button className="btn terminate-btn" onClick={() => openModal("Termination")}>
                Termination Reason
              </button>
            </div> */}
          </div>
        );
    }
  };

  if (!companyId) {
    return (
      <div className="content-box">
        <h2>No Company Selected</h2>
        <p>Please sign in with a company account to view offboarding reasons.</p>
      </div>
    );
  }

  return (
    <div className="offboarding-container">
      <Topbar />

      <div className="offboarding-page">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Offboarding</h3>
          <ul>
            <li
              className={activeSection === "overview" ? "active" : ""}
              onClick={() => setActiveSection("overview")}
            >
              Overview
            </li>

            <li
              onClick={() => setExitDropdownOpen(!exitDropdownOpen)}
              className={exitDropdownOpen ? "active" : ""}
            >
              Exit Reasons ▾
            </li>
            {exitDropdownOpen && (
              <ul className="submenu">
                <li
                  className={activeSection === "resignation" ? "active" : ""}
                  onClick={() => setActiveSection("resignation")}
                >
                  Resignation Reason
                </li>
                <li
                  className={activeSection === "termination" ? "active" : ""}
                  onClick={() => setActiveSection("termination")}
                >
                  Termination Reason
                </li>
                <li
                  className={activeSection === "deceased" ? "active" : ""}
                  onClick={() => setActiveSection("deceased")}
                >
                  Deceased Reason
                </li>
              </ul>
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">{renderContent()}</main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Offboarding Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-header">
          <h2>{formType} Form</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Offboarding;
