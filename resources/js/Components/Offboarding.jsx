// File: Offboarding.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus, FaChevronDown, FaChevronRight, FaBars, FaTimes, FaSignOutAlt, FaUserSlash, FaCross } from "react-icons/fa";
import Topbar from "./Topbar";
import Modal from "react-modal";
import "./Offboarding.css";

// Fix Modal accessibility
Modal.setAppElement(document.body);

const Offboarding = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [exitDropdownOpen, setExitDropdownOpen] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  // Company-specific reasons
  const [companyReasons, setCompanyReasons] = useState({
    resignation: [],
    termination: [],
    deceased: []
  });

  // Statistics for overview
  const [stats, setStats] = useState({
    totalOffboardings: 124,
    resignationRate: "68%",
    terminationRate: "24%",
    deceasedRate: "8%",
    monthlyTrend: "+12%"
  });

  // Recent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, employee: "Sarah Johnson", type: "Resignation", date: "2 hours ago", status: "Pending" },
    { id: 2, employee: "Michael Chen", type: "Termination", date: "1 day ago", status: "In Progress" },
    { id: 3, employee: "Emma Wilson", type: "Resignation", date: "2 days ago", status: "Completed" },
    { id: 4, employee: "David Brown", type: "Deceased", date: "3 days ago", status: "Completed" }
  ]);

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
          resignation: ["Career Opportunities", "Starting Own Business", "Moving Abroad", "Work-Life Balance", "Returning to Education"],
          termination: ["Policy Violation", "Performance Issues", "Restructuring", "Attendance Problems", "Behavioral Issues"],
          deceased: ["Natural Causes", "Medical Condition", "Accident"]
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

  // Drag and drop functionality
  const handleDragStart = (e, type, index) => {
    setDraggedItem({ type, index });
    e.dataTransfer.setData("text/plain", ""); // Required for Firefox
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary for allowing drop
  };

  const handleDrop = (e, type, targetIndex) => {
    e.preventDefault();
    if (draggedItem) {
      const { type: sourceType, index: sourceIndex } = draggedItem;
      
      if (sourceType === type) {
        const updatedReasons = [...companyReasons[type]];
        const [movedItem] = updatedReasons.splice(sourceIndex, 1);
        updatedReasons.splice(targetIndex, 0, movedItem);
        
        const updated = { ...companyReasons, [type]: updatedReasons };
        saveReasons(updated);
      }
    }
    setDraggedItem(null);
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
  const ReasonList = ({ title, type, icon }) => (
    <div className="content-box animated-fade-in">
      <div className="header-row">
        <div className="title-with-icon">
          {icon}
          <h2>{title}</h2>
        </div>
        <button className="add-btn modern-btn" onClick={() => handleAddReason(type)}>
          <FaPlus /> Add Reason
        </button>
      </div>

      <p className="section-description">Customize and rearrange reasons by dragging and dropping</p>
      <div className="reason-list">
        {companyReasons[type].length > 0 ? (
          companyReasons[type].map((reason, index) => (
            <div 
              key={index} 
              className="reason-item"
              draggable
              onDragStart={(e) => handleDragStart(e, type, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, type, index)}
            >
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
          ))
        ) : (
          <div className="empty-state">
            <p>No reasons added yet. Click "Add Reason" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );

  // Statistics Cards
  const StatCard = ({ title, value, trend, icon, color }) => (
    <div className={`stat-card ${color} animated-card`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && <span className={`trend ${trend.includes('+') ? 'positive' : 'negative'}`}>{trend}</span>}
      </div>
    </div>
  );

  // Activity Item
  const ActivityItem = ({ activity }) => (
    <div className="activity-item">
      <div className="activity-icon">
        {activity.type === "Resignation" && <FaSignOutAlt />}
        {activity.type === "Termination" && <FaUserSlash />}
        {activity.type === "Deceased" && <FaCross />}
      </div>
      <div className="activity-details">
        <h4>{activity.employee}</h4>
        <p>{activity.type} · {activity.date}</p>
      </div>
      <div className={`activity-status ${activity.status.toLowerCase().replace(' ', '-')}`}>
        {activity.status}
      </div>
    </div>
  );

  // Content switcher
  const renderContent = () => {
    switch (activeSection) {
      case "resignation":
        return <ReasonList 
          title="Resignation Reasons" 
          type="resignation" 
          icon={<FaSignOutAlt />} 
        />;
      case "termination":
        return <ReasonList 
          title="Termination Reasons" 
          type="termination" 
          icon={<FaUserSlash />} 
        />;
      case "deceased":
        return <ReasonList 
          title="Deceased Reasons" 
          type="deceased" 
          icon={<FaCross />} 
        />;
      default:
        return (
          <div className="overview-container">
            <div className="welcome-banner animated-fade-in">
              <h1>Offboarding Management</h1>
              <p>Streamline employee exits with our comprehensive offboarding system</p>
            </div>
            
            <div className="stats-grid">
              <StatCard 
                title="Total Offboardings" 
                value={stats.totalOffboardings} 
                trend={stats.monthlyTrend}
                icon={<FaSignOutAlt />}
                color="blue"
              />
              <StatCard 
                title="Resignation Rate" 
                value={stats.resignationRate} 
                icon={<FaSignOutAlt />}
                color="green"
              />
              <StatCard 
                title="Termination Rate" 
                value={stats.terminationRate} 
                icon={<FaUserSlash />}
                color="orange"
              />
              <StatCard 
                title="Deceased Rate" 
                value={stats.deceasedRate} 
                icon={<FaCross />}
                color="red"
              />
            </div>
            
            <div className="overview-content">
              <div className="content-box quick-actions animated-fade-in">
                <h2>Quick Actions</h2>
                <div className="button-group">
                  <button className="btn resign-btn modern-btn" onClick={() => openModal("Resignation")}>
                    <FaSignOutAlt /> Initiate Resignation
                  </button>
                  <button className="btn terminate-btn modern-btn" onClick={() => openModal("Termination")}>
                    <FaUserSlash /> Record Termination
                  </button>
                  <button className="btn deceased-btn modern-btn" onClick={() => openModal("Deceased")}>
                    <FaCross /> Report Deceased
                  </button>
                </div>
              </div>
              
              <div className="content-box recent-activities animated-fade-in">
                <h2>Recent Activities</h2>
                <div className="activities-list">
                  {recentActivities.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
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
      
      <button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="offboarding-page">
        {/* Sidebar */}
        <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <h3>Offboarding</h3>
          <ul>
            <li
              className={activeSection === "overview" ? "active" : ""}
              onClick={() => {
                setActiveSection("overview");
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">📊</span> Overview
            </li>

            <li
              onClick={() => setExitDropdownOpen(!exitDropdownOpen)}
              className={exitDropdownOpen ? "active" : ""}
            >
              <span className="nav-icon">🚪</span> Exit Reasons 
              {exitDropdownOpen ? <FaChevronDown /> : <FaChevronRight />}
            </li>
            {exitDropdownOpen && (
              <ul className="submenu">
                <li
                  className={activeSection === "resignation" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("resignation");
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">↩️</span> Resignation
                </li>
                <li
                  className={activeSection === "termination" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("termination");
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">🔚</span> Termination
                </li>
                <li
                  className={activeSection === "deceased" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("deceased");
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">😔</span> Deceased
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
          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder={`Enter details for this ${formType.toLowerCase()}...`}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
            <button type="submit" className="submit-btn modern-btn">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Offboarding;