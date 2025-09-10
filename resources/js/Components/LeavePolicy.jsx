import React, { useState, useEffect } from "react";
import "./LeavePolicy.css";

const LeavePolicy = () => {
  const [activePage, setActivePage] = useState("LeavePolicy");
  const [policies, setPolicies] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    color: "#6366f1",
    type: "Paid",
    policy: "Experience based",
    unit: "Days",
    status: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [trackerData, setTrackerData] = useState([]);
  const [reportData, setReportData] = useState({});

  // Sample current user (in a real app, this would come from authentication)
  const currentUser = {
    id: "EMP-001",
    name: "John Doe",
    role: "Employee",
    companyId: "COMP-001",
    email: "john.doe@example.com",
    department: "Engineering"
  };

  // Sample HR user
  const currentHR = {
    id: "HR-001",
    name: "Sarah Johnson",
    role: "HR Manager",
    companyId: "COMP-001"
  };

  // Sample leave applications data
  const sampleLeaveApplications = [
    {
      id: 1,
      employeeId: "EMP-001",
      employeeName: "John Doe",
      type: "Annual Leave",
      fromDate: "2023-06-15",
      toDate: "2023-06-16",
      reason: "Family vacation",
      status: "Approved",
      appliedDate: "2023-06-01",
      approvedBy: "Sarah Johnson",
      approvedDate: "2023-06-02"
    },
    {
      id: 2,
      employeeId: "EMP-002",
      employeeName: "Jane Smith",
      type: "Sick Leave",
      fromDate: "2023-06-20",
      toDate: "2023-06-20",
      reason: "Medical appointment",
      status: "Pending",
      appliedDate: "2023-06-18",
      approvedBy: "",
      approvedDate: ""
    },
    {
      id: 3,
      employeeId: "EMP-003",
      employeeName: "Mike Johnson",
      type: "Personal Leave",
      fromDate: "2023-06-25",
      toDate: "2023-06-27",
      reason: "Moving to new house",
      status: "Rejected",
      appliedDate: "2023-06-20",
      approvedBy: "Sarah Johnson",
      approvedDate: "2023-06-21",
      rejectionReason: "Busy period for the team"
    },
    {
      id: 4,
      employeeId: "EMP-001",
      employeeName: "John Doe",
      type: "Sick Leave",
      fromDate: "2023-07-01",
      toDate: "2023-07-01",
      reason: "Dental checkup",
      status: "Pending",
      appliedDate: "2023-06-28",
      approvedBy: "",
      approvedDate: ""
    }
  ];

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    // Simulate loading from localStorage/API
    const storedPolicies = [
      {
        name: "Annual Leave",
        color: "#6366f1",
        type: "Paid",
        policy: "Experience based",
        unit: "Days",
        status: true,
        createdBy: "HR-001"
      },
      {
        name: "Sick Leave",
        color: "#10b981",
        type: "Paid",
        policy: "Fixed based",
        unit: "Days",
        status: true,
        createdBy: "HR-001"
      },
      {
        name: "Personal Leave",
        color: "#f59e0b",
        type: "Unpaid",
        policy: "Management approval",
        unit: "Days",
        status: true,
        createdBy: "HR-001"
      }
    ];
    setPolicies(storedPolicies);
    
    // Set sample leave applications
    setLeaveApplications(sampleLeaveApplications);
    
    // Load sample tracker data
    setTrackerData([
      { id: 1, type: "Annual Leave", date: "2023-05-15", status: "Approved", days: 2 },
      { id: 2, type: "Sick Leave", date: "2023-06-20", status: "Pending", days: 1 }
    ]);
    
    // Load sample report data
    setReportData({
      totalLeaves: 20,
      usedLeaves: 7,
      remainingLeaves: 13,
      pendingRequests: 2
    });
  }, []);

  // ---------------- POLICY FUNCTIONS ----------------
  const toggleStatus = (index) => {
    const updated = [...policies];
    updated[index].status = !updated[index].status;
    setPolicies(updated);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({ ...newPolicy, [name]: value });
  };

  const addPolicy = () => {
    const policyWithCreator = {
      ...newPolicy,
      createdBy: currentUser.id
    };
    
    const updated = [...policies, policyWithCreator];
    setPolicies(updated);
    setNewPolicy({
      name: "",
      color: "#6366f1",
      type: "Paid",
      policy: "Experience based",
      unit: "Days",
      status: true,
    });
    setShowForm(false);
    
    // Show success notification
    document.querySelector('.notification').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.notification').style.display = 'none';
    }, 3000);
  };

  const handleEditClick = (index) => {
    setSelectedIndex(index);
    setNewPolicy(policies[index]);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setModalType("delete");
    setShowModal(true);
  };

  const saveEdit = () => {
    const updated = [...policies];
    updated[selectedIndex] = newPolicy;
    setPolicies(updated);
    setShowModal(false);
  };

  const confirmDelete = () => {
    const updated = policies.filter((_, i) => i !== selectedIndex);
    setPolicies(updated);
    setShowModal(false);
  };

  // ---------------- LEAVE APPLICATION FUNCTIONS ----------------
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const submitLeave = () => {
    if (!leaveForm.type || !leaveForm.fromDate || !leaveForm.toDate) {
      alert("Please fill all required fields");
      return;
    }
    
    // Calculate number of days
    const from = new Date(leaveForm.fromDate);
    const to = new Date(leaveForm.toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Create new leave application
    const newLeave = {
      ...leaveForm,
      id: Date.now(),
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      status: "Pending",
      appliedDate: new Date().toISOString().split('T')[0],
      days: diffDays
    };
    
    // Add to leave applications
    setLeaveApplications([...leaveApplications, newLeave]);
    setLeaveForm({ type: "", fromDate: "", toDate: "", reason: "" });
    
    // Show success notification
    document.querySelector('.notification.success').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.notification.success').style.display = 'none';
    }, 3000);
  };

  // ---------------- LEAVE REQUEST MANAGEMENT ----------------
  const updateLeaveStatus = (id, status) => {
    const updatedApplications = leaveApplications.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status,
          approvedBy: status === "Approved" ? currentHR.name : app.approvedBy,
          approvedDate: status === "Approved" ? new Date().toISOString().split('T')[0] : app.approvedDate
        };
      }
      return app;
    });
    
    setLeaveApplications(updatedApplications);
  };

  // ---------------- RENDER CONTENT BASED ON ACTIVE PAGE ----------------
  const renderContent = () => {
    switch(activePage) {
      case "LeavePolicy":
        return (
          <>
            <div className="lp-header">
              <h2>Leave Policy</h2>
              {currentHR && <button className="lp-btn primary" onClick={() => setShowForm(true)}>Add Leave Policy</button>}
            </div>

            {showForm && (
              <div className="lp-modal-overlay">
                <div className="lp-modal animated-modal">
                  <div className="modal-header">
                    <h3>Add Leave Policy</h3>
                    <span className="lp-close" onClick={() => setShowForm(false)}>&times;</span>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Policy Name</label>
                      <input type="text" name="name" placeholder="Enter policy name" value={newPolicy.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <input type="color" name="color" value={newPolicy.color} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <select name="type" value={newPolicy.type} onChange={handleInputChange}>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Compensatory Off">Compensatory Off</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Policy Type</label>
                      <select name="policy" value={newPolicy.policy} onChange={handleInputChange}>
                        <option value="Experience based">Experience based</option>
                        <option value="Fixed based">Fixed based</option>
                        <option value="Management approval">Management approval</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Unit</label>
                      <input type="text" name="unit" placeholder="Unit (e.g., Days)" value={newPolicy.unit} onChange={handleInputChange} />
                    </div>
                    <div className="modal-actions">
                      <button className="lp-btn secondary" onClick={() => setShowForm(false)}>Cancel</button>
                      <button className="lp-btn primary" onClick={addPolicy}>Save Policy</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- POLICY TABLE ---------------- */}
            <div className="card animated-fade-in">
              <div className="card-header">
                <h3>Current Policies</h3>
                <span className="badge">{policies.length} policies</span>
              </div>
              <div className="table-container">
                <table className="lp-table">
                  <thead>
                    <tr>
                      <th>Leave policy</th>
                      <th>Type</th>
                      <th>Policy type</th>
                      <th>Unit</th>
                      <th>Status</th>
                      {currentHR && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {policies.length ? policies.map((p, i) => (
                      <tr key={i} className="animated-row">
                        <td><span className="lp-dot" style={{ background: p.color }}></span> {p.name}</td>
                        <td><span className={`tag tag-${p.type.toLowerCase().replace(' ', '-')}`}>{p.type}</span></td>
                        <td>{p.policy}</td>
                        <td>{p.unit}</td>
                        <td>
                          {currentHR ? (
                            <label className="lp-switch">
                              <input type="checkbox" checked={p.status} onChange={() => toggleStatus(i)} />
                              <span className="slider"></span>
                            </label>
                          ) : (
                            p.status ? 'Active' : 'Inactive'
                          )}
                        </td>
                        {currentHR && (
                          <td>
                            <div className="action-buttons">
                              <button className="action-btn edit" onClick={() => handleEditClick(i)} title="Edit">
                                <span className="icon">✏️</span>
                              </button>
                              <button className="action-btn delete" onClick={() => handleDeleteClick(i)} title="Delete">
                                <span className="icon">🗑️</span>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={currentHR ? 6 : 5} style={{ textAlign: "center" }} className="empty-state">
                          <div className="empty-icon">📋</div>
                          <p>No policies found</p>
                          {currentHR && <button className="lp-btn primary" onClick={() => setShowForm(true)}>Create your first policy</button>}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ---------------- MODAL ---------------- */}
            {showModal && (
              <div className="lp-modal-overlay">
                <div className="lp-modal animated-modal">
                  <div className="modal-header">
                    <h3>{modalType === "edit" ? "Edit Policy" : "Confirm Delete"}</h3>
                    <span className="lp-close" onClick={() => setShowModal(false)}>&times;</span>
                  </div>
                  <div className="modal-body">
                    {modalType === "edit" && (
                      <>
                        <div className="form-group">
                          <label>Policy Name</label>
                          <input type="text" name="name" value={newPolicy.name} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                          <label>Color</label>
                          <input type="color" name="color" value={newPolicy.color} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                          <label>Type</label>
                          <select name="type" value={newPolicy.type} onChange={handleInputChange}>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Compensatory Off">Compensatory Off</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Policy Type</label>
                          <select name="policy" value={newPolicy.policy} onChange={handleInputChange}>
                            <option value="Experience based">Experience based</option>
                            <option value="Fixed based">Fixed based</option>
                            <option value="Management approval">Management approval</option>
                            <option value="Custom">Custom</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Unit</label>
                          <input type="text" name="unit" value={newPolicy.unit} onChange={handleInputChange} />
                        </div>
                        <div className="modal-actions">
                          <button className="lp-btn secondary" onClick={() => setShowModal(false)}>Cancel</button>
                          <button className="lp-btn primary" onClick={saveEdit}>Save Changes</button>
                        </div>
                      </>
                    )}
                    {modalType === "delete" && (
                      <>
                        <div className="delete-confirmation">
                          <div className="warning-icon">⚠️</div>
                          <p>Are you sure you want to delete the policy <strong>"{policies[selectedIndex].name}"</strong>?</p>
                          <p className="warning-text">This action cannot be undone.</p>
                        </div>
                        <div className="modal-actions">
                          <button className="lp-btn secondary" onClick={() => setShowModal(false)}>Cancel</button>
                          <button className="lp-btn delete" onClick={confirmDelete}>Delete Policy</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- LEAVE APPLICATION FORM ---------------- */}
            <div className="card animated-fade-in delay-1">
              <div className="card-header">
                <h3>Apply for Leave</h3>
              </div>
              <div className="leave-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Leave Type *</label>
                    <select name="type" value={leaveForm.type} onChange={handleLeaveChange}>
                      <option value="">-- Select Leave Type --</option>
                      {policies.filter(p => p.status).map((p, idx) => (
                        <option key={idx} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>From Date *</label>
                    <input type="date" name="fromDate" value={leaveForm.fromDate} onChange={handleLeaveChange} />
                  </div>
                  <div className="form-group">
                    <label>To Date *</label>
                    <input type="date" name="toDate" value={leaveForm.toDate} onChange={handleLeaveChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Reason</label>
                  <textarea name="reason" placeholder="Reason for leave" value={leaveForm.reason} onChange={handleLeaveChange} rows="3" />
                </div>
                <button className="lp-btn primary apply-btn" onClick={submitLeave}>Apply for Leave</button>
              </div>
            </div>

            {/* ---------------- LEAVE REQUESTS TABLE ---------------- */}
            <div className="card animated-fade-in delay-2">
              <div className="card-header">
                <h3>Leave Requests</h3>
                <span className="badge">{leaveApplications.length} requests</span>
              </div>
              <div className="table-container">
                <table className="lp-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Leave Type</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Applied On</th>
                      <th>Status</th>
                      {currentHR && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {leaveApplications.length ? leaveApplications
                      .filter(app => !currentHR || app.companyId === currentHR.companyId)
                      .filter(app => currentHR || app.employeeId === currentUser.id)
                      .map((app, i) => (
                      <tr key={i} className="animated-row">
                        <td>
                          <div className="employee-info">
                            <div className="employee-name">{app.employeeName}</div>
                            {currentHR && <div className="employee-id">{app.employeeId}</div>}
                          </div>
                        </td>
                        <td>{app.type}</td>
                        <td>{app.fromDate}</td>
                        <td>{app.toDate}</td>
                        <td>{app.days || 1}</td>
                        <td>{app.reason}</td>
                        <td>{app.appliedDate}</td>
                        <td>
                          <span className={`status status-${app.status.toLowerCase()}`}>
                            {app.status}
                          </span>
                        </td>
                        {currentHR && (
                          <td>
                            {app.status === "Pending" ? (
                              <div className="action-buttons">
                                <button className="action-btn approve" onClick={() => updateLeaveStatus(app.id, "Approved")} title="Approve">
                                  <span className="icon">✓</span>
                                </button>
                                <button className="action-btn reject" onClick={() => updateLeaveStatus(app.id, "Rejected")} title="Reject">
                                  <span className="icon">✕</span>
                                </button>
                              </div>
                            ) : (
                              <span className="action-complete">Processed</span>
                            )}
                          </td>
                        )}
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={currentHR ? 9 : 8} style={{ textAlign: "center" }} className="empty-state">
                          <div className="empty-icon">📝</div>
                          <p>No leave applications found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      case "WorkCalendar":
        return (
          <div className="card animated-fade-in">
            <div className="card-header">
              <h3>Work Calendar</h3>
            </div>
            <div className="page-content">
              <div className="calendar-placeholder">
                <h3>📅 Work Calendar View</h3>
                <p>This would display a calendar with marked holidays, company events, and team availability.</p>
                <div className="calendar-grid">
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className="calendar-day">
                      {i+1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "LeaveTracker":
        return (
          <div className="card animated-fade-in">
            <div className="card-header">
              <h3>Leave Tracker</h3>
            </div>
            <div className="page-content">
              <div className="tracker-stats">
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-info">
                    <h4>{leaveApplications.filter(app => currentHR || app.employeeId === currentUser.id).length}</h4>
                    <p>Total Requests</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <h4>{leaveApplications.filter(app => app.status === 'Approved' && (currentHR || app.employeeId === currentUser.id)).length}</h4>
                    <p>Approved</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <h4>{leaveApplications.filter(app => app.status === 'Pending' && (currentHR || app.employeeId === currentUser.id)).length}</h4>
                    <p>Pending</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">❌</div>
                  <div className="stat-info">
                    <h4>{leaveApplications.filter(app => app.status === 'Rejected' && (currentHR || app.employeeId === currentUser.id)).length}</h4>
                    <p>Rejected</p>
                  </div>
                </div>
              </div>
              
              <div className="table-container">
                <table className="lp-table">
                  <thead>
                    <tr>
                      <th>Leave Type</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>Days</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveApplications
                      .filter(app => currentHR || app.employeeId === currentUser.id)
                      .map((app, i) => (
                      <tr key={i} className="animated-row">
                        <td>{app.type}</td>
                        <td>{app.fromDate}</td>
                        <td>{app.toDate}</td>
                        <td>{app.days || 1}</td>
                        <td>{app.reason}</td>
                        <td>
                          <span className={`status status-${app.status.toLowerCase()}`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "Reports":
        return (
          <div className="card animated-fade-in">
            <div className="card-header">
              <h3>Reports</h3>
            </div>
            <div className="page-content">
              <div className="reports-container">
                <div className="report-chart">
                  <h4>Leave Utilization</h4>
                  <div className="chart-placeholder">
                    <div className="chart-bar" style={{height: `${(reportData.usedLeaves/reportData.totalLeaves)*100}%`}}>
                      <span>Used: {reportData.usedLeaves}</span>
                    </div>
                    <div className="chart-bar" style={{height: `${(reportData.remainingLeaves/reportData.totalLeaves)*100}%`}}>
                      <span>Remaining: {reportData.remainingLeaves}</span>
                    </div>
                  </div>
                </div>
                
                <div className="report-summary">
                  <h4>Summary</h4>
                  <div className="summary-item">
                    <label>Total Leaves:</label>
                    <span>{reportData.totalLeaves} days</span>
                  </div>
                  <div className="summary-item">
                    <label>Leaves Used:</label>
                    <span>{reportData.usedLeaves} days</span>
                  </div>
                  <div className="summary-item">
                    <label>Leaves Remaining:</label>
                    <span>{reportData.remainingLeaves} days</span>
                  </div>
                  <div className="summary-item">
                    <label>Pending Requests:</label>
                    <span>{reportData.pendingRequests}</span>
                  </div>
                </div>
              </div>

              <div className="report-details">
                <h4>Leave by Type</h4>
                <div className="leave-type-stats">
                  {["Annual Leave", "Sick Leave", "Personal Leave"].map(type => {
                    const count = leaveApplications.filter(app => app.type === type && (currentHR || app.employeeId === currentUser.id)).length;
                    return (
                      <div key={type} className="type-stat">
                        <div className="type-name">{type}</div>
                        <div className="type-count">{count} requests</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="lp-container">
      <div className="notification">Policy added successfully!</div>
      <div className="notification success">Leave application submitted successfully!</div>
      
      <div className="lp-wrapper">
        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="lp-sidebar">
          <div className="sidebar-header">
            <h3>HR Portal</h3>
            <p>Welcome, {currentUser.name}</p>
            <p className="user-role">{currentUser.role}</p>
          </div>
          <ul>
            <li className={activePage === "LeavePolicy" ? "active" : ""} onClick={() => setActivePage("LeavePolicy")}>
              <span className="icon">📋</span> Leave Policy
            </li>
            <li className={activePage === "WorkCalendar" ? "active" : ""} onClick={() => setActivePage("WorkCalendar")}>
              <span className="icon">📅</span> Work Calendar
            </li>
            <li className={activePage === "LeaveTracker" ? "active" : ""} onClick={() => setActivePage("LeaveTracker")}>
              <span className="icon">📊</span> Leave Tracker
            </li>
            <li className={activePage === "Reports" ? "active" : ""} onClick={() => setActivePage("Reports")}>
              <span className="icon">📈</span> Reports
            </li>
          </ul>
        </aside>

        {/* ---------------- MAIN ---------------- */}
        <main className="lp-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default LeavePolicy;