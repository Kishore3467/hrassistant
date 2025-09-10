// HrDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { 
  AiOutlineCheckCircle, AiOutlineEdit, AiOutlineClose, 
  AiOutlineSend, AiOutlineUser, AiOutlineTeam, 
  AiOutlineFileText, AiOutlinePlus, AiOutlineSearch,
  AiOutlineDashboard, AiOutlineLogout
} from "react-icons/ai";
import { 
  BsCalendar3, BsChatDots, BsGraphUp, BsBell, 
  BsFillPersonCheckFill, BsThreeDotsVertical 
} from "react-icons/bs";
import { FiSettings, FiUsers, FiFile } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import "./HrDashboard.css";

const HrDashboard = () => {
  const [checkIn, setCheckIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showAllPopup, setShowAllPopup] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! I'm your HR assistant. How can I help you today?", sender: "bot" }
  ]);
  const [messageInput, setMessageInput] = useState("");
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeave: 0,
    pendingRequests: 0
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      
      // Load user-specific profile image if available
      const userProfiles = JSON.parse(localStorage.getItem("userProfiles")) || {};
      if (userProfiles[user.email] && userProfiles[user.email].profileImage) {
        setCurrentUser(prev => ({
          ...prev,
          profileImage: userProfiles[user.email].profileImage
        }));
      }
    }

    const savedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const companyEmployees = user
      ? savedEmployees.filter((e) => e.companyId === user.companyId)
      : [];
    setEmployees(companyEmployees);

    const leaves = JSON.parse(localStorage.getItem("leaves")) || [];
    const companyLeaves = user
      ? leaves.filter((l) => l.companyId === user.companyId)
      : [];
    setLeaveApplications(companyLeaves);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Set up time updater
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    // Load notifications
    const savedNotifications = JSON.parse(localStorage.getItem("hrNotifications")) || [];
    setNotifications(savedNotifications);

    return () => clearInterval(timer);
  }, []);

  // Add this useEffect to calculate stats
  useEffect(() => {
    if (employees.length > 0) {
      const presentToday = employees.filter(emp => emp.status === "Checked-in").length;
      const onLeave = leaveApplications.filter(leave => 
        leave.status === "Approved" && 
        isDateInRange(new Date(), leave.fromDate, leave.toDate)
      ).length;
      
      const pendingRequests = employees.filter(emp => !emp.approved).length + 
                             leaveApplications.filter(leave => leave.status === "Pending").length;
      
      setStats({
        totalEmployees: employees.length,
        presentToday,
        onLeave,
        pendingRequests
      });
    }
  }, [employees, leaveApplications]);

  // Helper function to check if a date is in range
  const isDateInRange = (date, startDate, endDate) => {
    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return d >= start && d <= end;
  };

  // Listen for localStorage changes (employee applies leave)
  useEffect(() => {
    const handleStorageChange = () => {
      const leaves = JSON.parse(localStorage.getItem("leaves")) || [];
      const companyLeaves = currentUser
        ? leaves.filter((l) => l.companyId === currentUser.companyId)
        : [];
      setLeaveApplications(companyLeaves);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentUser]);

  // Scroll to bottom of chat
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckIn = () => {
    setCheckIn(true);
    // Add check-in animation effect
    const checkInBtn = document.querySelector('.hr-checkin-btn');
    if (checkInBtn) {
      checkInBtn.classList.add('checked-in-animation');
      setTimeout(() => {
        checkInBtn.classList.remove('checked-in-animation');
      }, 2000);
    }
    
    // Add notification
    addNotification("Checked in successfully!", "success");
    showNotification("Checked in successfully! 👍");
  };

  // Add notification function
  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleTimeString(),
      read: false
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    localStorage.setItem("hrNotifications", JSON.stringify(updatedNotifications));
  };

  // SAFE send email function
  const sendEmail = async (payload) => {
    try {
      const res = await fetch("/api/send-approval-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // ✅ Parse JSON
      const data = await res.json();
      if (!data.success) console.error("Failed email:", data.message);
      return data.success;

    } catch (err) {
      console.error("Send email error:", err);
      return false;
    }
  };

  // Approve employee
  const approveEmployee = async (empId) => {
    const approvedEmp = employees.find((e) => e.empId === empId);
    if (!approvedEmp) return alert("Employee not found!");

    const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const newAllEmployees = allEmployees.map((emp) =>
      emp.empId === empId ? { ...emp, approved: true } : emp
    );
    localStorage.setItem("employees", JSON.stringify(newAllEmployees));
    setEmployees((prev) =>
      prev.map((emp) => (emp.empId === empId ? { ...emp, approved: true } : emp))
    );

    // Show success notification
    addNotification(`Approved employee: ${approvedEmp.name}`, "success");
    showNotification("Employee approved successfully!");

    await sendEmail({
      email: approvedEmp.email,
      name: approvedEmp.name,
      company: currentUser.companyName || currentUser.companyId,
      message: "You have been approved by HR ✅",
    });
  };

  const rejectEmployee = (empId) => {
    const employee = employees.find((e) => e.empId === empId);
    const updated = employees.filter((emp) => emp.empId !== empId);
    setEmployees(updated);
    const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    localStorage.setItem(
      "employees",
      JSON.stringify(allEmployees.filter((emp) => emp.empId !== empId))
    );
    
    addNotification(`Rejected employee: ${employee.name}`, "warning");
    showNotification("Employee rejected");
  };

  // Approve leave
  const approveLeave = async (leaveId) => {
    const leave = leaveApplications.find((l) => l.id === leaveId);
    if (!leave) return;

    const updated = leaveApplications.map((l) =>
      l.id === leaveId ? { ...l, status: "Approved" } : l
    );
    setLeaveApplications(updated);

    const allLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
    const newAllLeaves = allLeaves.map((l) =>
      l.id === leaveId ? { ...l, status: "Approved" } : l
    );
    localStorage.setItem("leaves", JSON.stringify(newAllLeaves));

    addNotification(`Approved leave for: ${leave.name}`, "success");
    showNotification("Leave approved successfully!");

    await sendEmail({
      email: leave.email,
      name: leave.name,
      company: currentUser.companyName || currentUser.companyId,
      message: `Your leave from ${leave.fromDate} to ${leave.toDate} has been approved ✅`,
    });
  };

  const rejectLeave = async (leaveId) => {
    const leave = leaveApplications.find((l) => l.id === leaveId);
    if (!leave) return;

    const updated = leaveApplications.map((l) =>
      l.id === leaveId ? { ...l, status: "Rejected" } : l
    );
    setLeaveApplications(updated);

    const allLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
    const newAllLeaves = allLeaves.map((l) =>
      l.id === leaveId ? { ...l, status: "Rejected" } : l
    );
    localStorage.setItem("leaves", JSON.stringify(newAllLeaves));

    addNotification(`Rejected leave for: ${leave.name}`, "warning");
    showNotification("Leave rejected");

    await sendEmail({
      email: leave.email,
      name: leave.name,
      company: currentUser.companyName || currentUser.companyId,
      message: `Your leave from ${leave.fromDate} to ${leave.toDate} has been rejected ❌`,
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...currentUser, profileImage: reader.result };
      setCurrentUser(updatedUser);
      
      // Save to localStorage under current user
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      // Also save to userProfiles keyed by email for persistence across logins
      const userProfiles = JSON.parse(localStorage.getItem("userProfiles")) || {};
      userProfiles[currentUser.email] = {
        ...userProfiles[currentUser.email],
        profileImage: reader.result
      };
      localStorage.setItem("userProfiles", JSON.stringify(userProfiles));
      
      addNotification("Profile image updated!", "success");
      showNotification("Profile image updated!");
    };
    reader.readAsDataURL(file);
  };

  const showNotification = (message) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'hr-notification';
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    // Add user message
    const newMessage = {
      id: chatMessages.length + 1,
      text: messageInput,
      sender: "user"
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setMessageInput("");
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        text: "I'm a demo chatbot. In a real application, I would help with HR queries.",
        sender: "bot"
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const markNotificationAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("hrNotifications", JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem("hrNotifications", JSON.stringify([]));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!currentUser) return <div className="hr-loading">Loading...</div>;

  return (
    <div className="hr-dashboard">
      {/* Notification container */}
      <div className="hr-notification-container"></div>
      
      {/* HEADER */}
      <header className="hr-header">
        <div className="header-left">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <BsThreeDotsVertical />
          </button>
          <div className="search-bar">
            <AiOutlineSearch />
            <input 
              type="text" 
              placeholder="Search employees..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="header-right">
          <div className="notifications-wrapper">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BsBell />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="notifications-panel">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <button onClick={clearAllNotifications}>Clear All</button>
                </div>
                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <p className="no-notifications">No notifications</p>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <p>{notification.message}</p>
                        <span>{notification.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="user-menu">
            <img 
              src={currentUser.profileImage || "/default-profile.png"} 
              alt={currentUser.name}
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role">{currentUser.role}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="hr-dashboard-content">
        {/* SIDEBAR */}
        <aside className={`hr-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-profile">
            <div className="profile-img-wrapper">
              <img
                src={
                  currentUser.profileImage ||
                  currentUser.companyLogo ||
                  "/default-profile.png"
                }
                alt={currentUser.name}
                className="sidebar-profile-img"
              />
              <label className="edit-icon" onClick={() => fileInputRef.current.click()}>
                <AiOutlineEdit />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
            <div className="sidebar-profile-info">
              <h3>{currentUser.name}</h3>
              <p>{currentUser.role}</p>
              <p>{currentUser.companyId}</p>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <ul>
              <li>
                <button 
                  className={activeTab === "dashboard" ? "active" : ""}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <AiOutlineDashboard />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button 
                  className={activeTab === "employees" ? "active" : ""}
                  onClick={() => setActiveTab("employees")}
                >
                  <FiUsers />
                  <span>Employees</span>
                </button>
              </li>
              <li>
                <button 
                  className={activeTab === "attendance" ? "active" : ""}
                  onClick={() => setActiveTab("attendance")}
                >
                  <BsFillPersonCheckFill />
                  <span>Attendance</span>
                </button>
              </li>
              <li>
                <button 
                  className={activeTab === "leaves" ? "active" : ""}
                  onClick={() => setActiveTab("leaves")}
                >
                  <BsCalendar3 />
                  <span>Leaves</span>
                </button>
              </li>
              <li>
                <button 
                  className={activeTab === "reports" ? "active" : ""}
                  onClick={() => setActiveTab("reports")}
                >
                  <TbReportAnalytics />
                  <span>Reports</span>
                </button>
              </li>
              <li>
                <button 
                  className={activeTab === "settings" ? "active" : ""}
                  onClick={() => setActiveTab("settings")}
                >
                  <FiSettings />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>
              <AiOutlineLogout />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="hr-main-content">
          {/* DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <>
              <div className="content-header">
                <h1>Dashboard</h1>
                <p>{greeting}, {currentUser.name}! Here's today's overview.</p>
              </div>
              
              <div className="dashboard-grid">
                {/* Stats Cards */}
                <div className="stats-section">
                  <div className="stat-card">
                    <div className="stat-icon total-employees">
                      <AiOutlineTeam />
                    </div>
                    <div className="stat-info">
                      <h3>{stats.totalEmployees}</h3>
                      <p>Total Employees</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon present">
                      <AiOutlineUser />
                    </div>
                    <div className="stat-info">
                      <h3>{stats.presentToday}</h3>
                      <p>Present Today</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon on-leave">
                      <BsCalendar3 />
                    </div>
                    <div className="stat-info">
                      <h3>{stats.onLeave}</h3>
                      <p>On Leave</p>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon pending">
                      <BsBell />
                    </div>
                    <div className="stat-info">
                      <h3>{stats.pendingRequests}</h3>
                      <p>Pending Requests</p>
                    </div>
                  </div>
                </div>
                
                {/* Check-in Section */}
                <div className="checkin-section">
                  <div className="checkin-card">
                    <div className="checkin-header">
                      <h3>Today's Status</h3>
                      <span className="current-time">{currentTime}</span>
                    </div>
                    <div className="checkin-status">
                      <span className={`status-badge ${checkIn ? "checked-in" : "pending"}`}>
                        {checkIn ? "Checked-in" : "Yet to check-in"}
                      </span>
                    </div>
                    <button 
                      onClick={handleCheckIn} 
                      className={`hr-checkin-btn ${checkIn ? 'checked-in' : ''}`}
                      disabled={checkIn}
                    >
                      {checkIn ? 'Checked In' : 'Check-in'}
                    </button>
                  </div>
                  
                  <div className="schedule-card">
                    <div className="schedule-header">
                      <BsCalendar3 />
                      <h3>Work Schedule</h3>
                    </div>
                    <div className="schedule-details">
                      <p>Today: 9:00 AM - 6:00 PM</p>
                      <p>24-Aug-2025 - 30-Aug-2025</p>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activities */}
                <div className="activities-section">
                  <div className="section-header">
                    <h3>Recent Activities</h3>
                    <button>View All</button>
                  </div>
                  <div className="activities-list">
                    {employees.slice(0, 3).map(emp => (
                      <div key={emp.empId} className="activity-item">
                        <div className="activity-avatar">
                          <img src={emp.img || "/emp19.png"} alt={emp.name} />
                        </div>
                        <div className="activity-details">
                          <p><strong>{emp.name}</strong> {emp.status === "Checked-in" ? "checked in" : "is yet to check in"}</p>
                          <span className="activity-time">{currentTime}</span>
                        </div>
                      </div>
                    ))}
                    
                    {leaveApplications.filter(l => l.status === "Pending").slice(0, 2).map(leave => (
                      <div key={leave.id} className="activity-item">
                        <div className="activity-avatar">
                          <AiOutlineFileText />
                        </div>
                        <div className="activity-details">
                          <p><strong>{leave.name}</strong> requested leave from {leave.fromDate} to {leave.toDate}</p>
                          <span className="activity-time">Pending approval</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="quick-actions-section">
                  <div className="section-header">
                    <h3>Quick Actions</h3>
                  </div>
                  <div className="actions-grid">
                    <button className="action-btn">
                      <AiOutlineUser />
                      <span>Add Employee</span>
                    </button>
                    <button className="action-btn">
                      <FiFile />
                      <span>Create Report</span>
                    </button>
                    <button className="action-btn">
                      <BsGraphUp />
                      <span>View Analytics</span>
                    </button>
                    <button className="action-btn">
                      <FiSettings />
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
                
                {/* Reportees */}
                <div className="reportees-section">
                  <div className="section-header">
                    <h3>Your Reportees</h3>
                    <button onClick={() => setShowAllPopup(true)}>View All</button>
                  </div>
                  <div className="reportees-list">
                    {employees.slice(0, 4).map((rep) => (
                      <div key={rep.empId} className="reportee-card">
                        <img
                          src={rep.img || "/emp19.png"}
                          alt={rep.name}
                          className="reportee-img"
                        />
                        <div className="reportee-info">
                          <p className="reportee-name">{rep.name}</p>
                          <span className="reportee-id">{rep.empId}</span>
                          <span
                            className={`reportee-status ${
                              rep.status === "Yet to check-in" ? "pending" : "checked-in"
                            }`}
                          >
                            {rep.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* EMPLOYEES VIEW */}
          {activeTab === "employees" && (
            <div className="employees-view">
              <div className="content-header">
                <h1>Employee Management</h1>
                <p>Manage your team members and approvals</p>
              </div>
              
              <div className="view-content">
                <div className="approvals-section">
                  <h3>Pending Employee Approvals</h3>
                  {employees.filter((e) => !e.approved).length === 0 ? (
                    <p className="no-data">No pending approvals 🎉</p>
                  ) : (
                    <div className="approval-cards-container">
                      {employees
                        .filter((e) => !e.approved)
                        .map((emp) => (
                          <div key={emp.empId} className="approval-card">
                            <div className="approval-card-content">
                              <img src={emp.img || "/emp19.png"} alt={emp.name} />
                              <div>
                                <h4>{emp.name}</h4>
                                <p>{emp.email}</p>
                                <p className="emp-id">{emp.empId}</p>
                              </div>
                            </div>
                            <div className="approval-card-actions">
                              <button 
                                className="approve-btn"
                                onClick={() => approveEmployee(emp.empId)}
                              >
                                Approve
                              </button>
                              <button 
                                className="reject-btn"
                                onClick={() => rejectEmployee(emp.empId)}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                
                <div className="all-employees-section">
                  <div className="section-header">
                    <h3>All Employees</h3>
                    <div className="employees-filter">
                      <select>
                        <option>All Departments</option>
                        <option>HR</option>
                        <option>Development</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="employees-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>ID</th>
                          <th>Department</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployees.map(emp => (
                          <tr key={emp.empId}>
                            <td>
                              <div className="employee-cell">
                                <img src={emp.img || "/emp19.png"} alt={emp.name} />
                                <span>{emp.name}</span>
                              </div>
                            </td>
                            <td>{emp.empId}</td>
                            <td>{emp.department || "Not specified"}</td>
                            <td>
                              <span className={`status-badge ${emp.approved ? "approved" : "pending"}`}>
                                {emp.approved ? "Approved" : "Pending"}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="view-btn">View</button>
                                <button className="edit-btn">Edit</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* LEAVES VIEW */}
          {activeTab === "leaves" && (
            <div className="leaves-view">
              <div className="content-header">
                <h1>Leave Management</h1>
                <p>Review and manage employee leave requests</p>
              </div>
              
              <div className="view-content">
                <div className="leave-stats">
                  <div className="leave-stat-card">
                    <h3>{leaveApplications.filter(l => l.status === "Pending").length}</h3>
                    <p>Pending Requests</p>
                  </div>
                  <div className="leave-stat-card">
                    <h3>{leaveApplications.filter(l => l.status === "Approved").length}</h3>
                    <p>Approved Leaves</p>
                  </div>
                  <div className="leave-stat-card">
                    <h3>{leaveApplications.filter(l => l.status === "Rejected").length}</h3>
                    <p>Rejected Leaves</p>
                  </div>
                </div>
                
                <div className="leave-requests-section">
                  <h3>Employee Leave Requests</h3>
                  {leaveApplications.length === 0 ? (
                    <p className="no-data">No leave requests</p>
                  ) : (
                    <div className="leave-cards-container">
                      {leaveApplications.map((l) => (
                        <div key={l.id} className="leave-card">
                          <div className="leave-card-header">
                            <div className="leave-requester">
                              <img src={l.img || "/emp19.png"} alt={l.name} />
                              <div>
                                <h4>{l.name}</h4>
                                <p className="leave-email">{l.email}</p>
                              </div>
                            </div>
                            <span className={`status-badge status-${l.status.toLowerCase()}`}>
                              {l.status}
                            </span>
                          </div>
                          <div className="leave-details">
                            <p className="leave-dates">{l.fromDate} to {l.toDate}</p>
                            <p className="leave-reason">{l.reason || "No reason provided"}</p>
                          </div>
                          {l.status === "Pending" && (
                            <div className="leave-card-actions">
                              <button 
                                className="approve-btn"
                                onClick={() => approveLeave(l.id)}
                              >
                                Approve
                              </button>
                              <button 
                                className="reject-btn"
                                onClick={() => rejectLeave(l.id)}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Chatbot Toggle */}
      <div className={`chatbot-toggle ${showChatbot ? 'active' : ''}`} onClick={() => setShowChatbot(!showChatbot)}>
        <BsChatDots />
        <span>HR Assistant</span>
      </div>
      
      {/* Chatbot Window */}
      {showChatbot && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>HR Assistant</h3>
            <button className="chatbot-close" onClick={() => setShowChatbot(false)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className="chatbot-messages">
            {chatMessages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit">
              <AiOutlineSend />
            </button>
          </form>
        </div>
      )}
      
      {/* All Employees Popup */}
      {showAllPopup && (
        <div className="hr-popup-overlay" onClick={() => setShowAllPopup(false)}>
          <div className="hr-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="hr-popup-close"
              onClick={() => setShowAllPopup(false)}
            >
              <AiOutlineClose />
            </button>
            <h3>All Employees</h3>
            <div className="hr-popup-content">
              {employees.map((rep) => (
                <div key={rep.empId} className="hr-popup-employee">
                  <img
                    src={rep.img || "/emp19.png"}
                    alt={rep.name}
                    className="hr-popup-img"
                  />
                  <div className="hr-popup-info">
                    <p className="hr-popup-name">
                      {rep.empId} - {rep.name}
                    </p>
                    <p className="hr-popup-email">{rep.email}</p>
                    <p className="hr-popup-status">
                      Status: {rep.approved ? "✅ Approved" : "⏳ Pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrDashboard;