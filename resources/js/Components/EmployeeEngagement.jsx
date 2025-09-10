// File: EmployeeEngagement.jsx
import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import "./EmployeeEngagement.css";

const EmployeeEngagement = () => {
  const [companyId, setCompanyId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [engagements, setEngagements] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [engagementTitle, setEngagementTitle] = useState("");
  const [engagementNotes, setEngagementNotes] = useState("");
  const [engagementDate, setEngagementDate] = useState(new Date().toISOString().split('T')[0]);
  const [engagementType, setEngagementType] = useState("Meeting");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [stats, setStats] = useState({ total: 0, lastMonth: 0, byType: {} });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Show notification
  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Load company & employees
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
      
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setCompanyId(currentUser.email);

        const storedEmployees =
          JSON.parse(localStorage.getItem(`employees_${currentUser.email}`)) || [];
        setEmployees(storedEmployees);

        const storedEngagements =
          JSON.parse(localStorage.getItem(`engagements_${currentUser.email}`)) || {};
        setEngagements(storedEngagements);
        
        calculateStats(storedEngagements);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Calculate engagement statistics
  const calculateStats = (engagementsData) => {
    let total = 0;
    let lastMonth = 0;
    const byType = {};
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    Object.values(engagementsData).forEach(employeeEngagements => {
      employeeEngagements.forEach(engagement => {
        total++;
        
        // Count engagements from last month
        const engagementDate = new Date(engagement.date);
        if (engagementDate >= oneMonthAgo) {
          lastMonth++;
        }
        
        // Count by type
        if (byType[engagement.type]) {
          byType[engagement.type]++;
        } else {
          byType[engagement.type] = 1;
        }
      });
    });
    
    setStats({ total, lastMonth, byType });
  };

  // Save engagements to localStorage
  const saveEngagements = (updated) => {
    setEngagements(updated);
    calculateStats(updated);
    if (companyId) {
      localStorage.setItem(`engagements_${companyId}`, JSON.stringify(updated));
    }
  };

  // Add new engagement
  const handleAddEngagement = () => {
    if (!selectedEmployee) {
      showNotification("Please select an employee", "warning");
      return;
    }
    if (!engagementTitle) {
      showNotification("Please enter an engagement title", "warning");
      return;
    }

    const newEngagement = {
      title: engagementTitle,
      notes: engagementNotes,
      date: engagementDate,
      type: engagementType,
      id: Date.now() // Unique ID for each engagement
    };

    const updated = {
      ...engagements,
      [selectedEmployee]: [...(engagements[selectedEmployee] || []), newEngagement],
    };

    saveEngagements(updated);
    setEngagementTitle("");
    setEngagementNotes("");
    setEngagementDate(new Date().toISOString().split('T')[0]);
    setEngagementType("Meeting");
    
    showNotification("Engagement added successfully", "success");
  };

  // Delete an engagement
  const handleDeleteEngagement = (employeeName, engagementId) => {
    if (window.confirm("Are you sure you want to delete this engagement?")) {
      const updatedEngagements = engagements[employeeName].filter(
        e => e.id !== engagementId
      );
      
      const updated = {
        ...engagements,
        [employeeName]: updatedEngagements
      };
      
      saveEngagements(updated);
      showNotification("Engagement deleted successfully", "success");
    }
  };

  // Filter engagements based on search and type filter
  const filteredEngagements = selectedEmployee && engagements[selectedEmployee] 
    ? engagements[selectedEmployee].filter(engagement => {
        const matchesSearch = engagement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             engagement.notes.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "All" || engagement.type === filterType;
        return matchesSearch && matchesType;
      })
    : [];

  // Get unique engagement types for filter dropdown
  const engagementTypes = ["All", "Meeting", "Review", "Training", "Event", "One-on-One", "Feedback"];

  return (
    <div className="employee-engagement-page">
      <Topbar />
      
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="engagement-layout">
        {/* Sidebar */}
        <aside className="engagement-sidebar">
          <div className="sidebar-header">
            <h3>Employee Engagement</h3>
            <div className="stats-card">
              <div className="stat-item">
                <span className="stat-number">{stats.total}</span>
                <span className="stat-label">Total Engagements</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.lastMonth}</span>
                <span className="stat-label">Last 30 Days</span>
              </div>
            </div>
          </div>
          
          <div className="employee-search">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="employees-list">
            <h4>Employees</h4>
            <ul>
              {employees.filter(emp => 
                emp.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((emp) => (
                <li
                  key={emp.id}
                  className={selectedEmployee === emp.name ? "active" : ""}
                  onClick={() => setSelectedEmployee(emp.name)}
                >
                  <div className="employee-avatar">
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="employee-info">
                    <span className="employee-name">{emp.name}</span>
                    <span className="engagement-count">
                      {engagements[emp.name] ? engagements[emp.name].length : 0} engagements
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="engagement-content">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading engagement data...</p>
            </div>
          ) : selectedEmployee ? (
            <>
              <div className="content-header">
                <div className="employee-header">
                  <div className="employee-avatar large">
                    {selectedEmployee.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2>{selectedEmployee}</h2>
                    <p>
                      {engagements[selectedEmployee] ? engagements[selectedEmployee].length : 0} engagements
                    </p>
                  </div>
                </div>
                
                <div className="engagement-filters">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    {engagementTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Engagement Form */}
              <div className="add-engagement-card">
                <h3>Add New Engagement</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Engagement Title"
                      value={engagementTitle}
                      onChange={(e) => setEngagementTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={engagementType}
                      onChange={(e) => setEngagementType(e.target.value)}
                    >
                      {engagementTypes.filter(type => type !== "All").map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={engagementDate}
                      onChange={(e) => setEngagementDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Notes</label>
                    <textarea
                      placeholder="Details about the engagement..."
                      value={engagementNotes}
                      onChange={(e) => setEngagementNotes(e.target.value)}
                      rows="3"
                    />
                  </div>
                </div>
                
                <button 
                  className="primary-btn"
                  onClick={handleAddEngagement}
                >
                  + Add Engagement
                </button>
              </div>

              {/* Engagements List */}
              <div className="engagements-section">
                <div className="section-header">
                  <h3>Engagement History</h3>
                  <span className="result-count">
                    {filteredEngagements.length} results
                  </span>
                </div>
                
                {filteredEngagements.length > 0 ? (
                  <div className="engagement-cards">
                    {filteredEngagements.map((engagement) => (
                      <div key={engagement.id} className="engagement-card">
                        <div className="engagement-header">
                          <div className="engagement-type">{engagement.type}</div>
                          <span className="engagement-date">{engagement.date}</span>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteEngagement(selectedEmployee, engagement.id)}
                            aria-label="Delete engagement"
                          >
                            ✕
                          </button>
                        </div>
                        <h4 className="engagement-title">{engagement.title}</h4>
                        <p className="engagement-notes">{engagement.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h4>No engagements found</h4>
                    <p>Try changing your filters or add a new engagement</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="welcome-state">
              <div className="welcome-icon">👥</div>
              <h2>Employee Engagement Dashboard</h2>
              <p>Select an employee to view or add engagements</p>
              <div className="engagement-stats-cards">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total Engagements</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <span className="stat-number">{stats.lastMonth}</span>
                    <span className="stat-label">Last 30 Days</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-content">
                    <span className="stat-number">
                      {stats.byType.Meeting || 0}
                    </span>
                    <span className="stat-label">Meetings</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeEngagement;