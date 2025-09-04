// HrDashboard.jsx
import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle, AiOutlineEdit } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs";
import "./HrDashboard.css";

const HrDashboard = () => {
  const [checkIn, setCheckIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Activities");
  const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showAllPopup, setShowAllPopup] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);

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
  }, []);

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

  const handleCheckIn = () => setCheckIn(true);

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

    alert("Employee approved ✅");

    await sendEmail({
      email: approvedEmp.email,
      name: approvedEmp.name,
      company: currentUser.companyName || currentUser.companyId,
      message: "You have been approved by HR ✅",
    });
  };

  const rejectEmployee = (empId) => {
    const updated = employees.filter((emp) => emp.empId !== empId);
    setEmployees(updated);
    const allEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    localStorage.setItem(
      "employees",
      JSON.stringify(allEmployees.filter((emp) => emp.empId !== empId))
    );
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

    alert("Leave approved ✅");

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

    alert("Leave rejected ❌");

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
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    "Activities",
    "Feeds",
    "Profile",
    "Approvals",
    "Leave",
    "Attendance",
    "Timesheets",
    "Files",
    "HR Process",
  ];

  if (!currentUser) return <p>Loading...</p>;

  return (
    <div className="hr-dashboard">
      {/* LEFT PANEL */}
      <div className="hr-left-panel">
        <div className="hr-profile-card">
          <div className="hr-profile-header">
            <div className="profile-img-wrapper">
              <img
                src={
                  currentUser.profileImage ||
                  currentUser.companyLogo ||
                  "/default-profile.png"
                }
                alt={currentUser.name}
                className="hr-profile-img"
              />
              <label className="edit-icon">
                <AiOutlineEdit />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>
            <div className="hr-profile-info">
              <h3>{currentUser.name}</h3>
              <p>
                {currentUser.role} @ {currentUser.companyId}
              </p>
            </div>
          </div>

          <div className="hr-status-section">
            <span className={`hr-status-badge ${checkIn ? "checked-in" : ""}`}>
              {checkIn ? "Checked-in" : "Yet to check-in"}
            </span>
          </div>

          <div className="hr-time-section">
            <span className="hr-time">00 : 00 : 00</span>
          </div>

          <button onClick={handleCheckIn} className="hr-checkin-btn">
            Check-in
          </button>
        </div>

        {/* Reportees */}
        <div className="hr-reportees">
          <h4>Reportees</h4>
          {employees.slice(0, 3).map((rep) => (
            <div key={rep.empId} className="hr-reportee-card">
              <img
                src={rep.img || "/emp19.png"}
                alt={rep.name}
                className="hr-reportee-img"
              />
              <div className="hr-reportee-info">
                <p className="hr-reportee-name">
                  {rep.empId} - {rep.name}
                </p>
                <span
                  className={`hr-reportee-status ${
                    rep.status === "Yet to check-in" ? "pending" : "checked-in"
                  }`}
                >
                  {rep.status}
                </span>
                <span className="approval-status">
                  {rep.approved ? "✅ Approved" : "⏳ Pending"}
                </span>
              </div>
            </div>
          ))}
          {employees.length > 3 && (
            <p className="hr-more" onClick={() => setShowAllPopup(true)}>
              +{employees.length - 3} More
            </p>
          )}
        </div>

        {showAllPopup && (
          <div className="hr-popup-overlay">
            <div className="hr-popup">
              <span
                className="hr-popup-close"
                onClick={() => setShowAllPopup(false)}
              >
                &times;
              </span>
              <h3>All Employees</h3>
              {employees.map((rep) => (
                <div key={rep.empId} className="hr-popup-employee">
                  <img
                    src={rep.img || "/emp19.png"}
                    alt={rep.name}
                    className="hr-popup-img"
                  />
                  <div>
                    <p>
                      {rep.empId} - {rep.name} ({rep.email})
                    </p>
                    <p>Status: {rep.approved ? "✅ Approved" : "⏳ Pending"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="hr-right-panel">
        {/* Tabs */}
        <div className="hr-tabs">
          {tabs.map((tab) => (
            <span
              key={tab}
              className={`hr-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="hr-content">
          <div className="hr-greeting-container">
            <img src="/logo.png" alt="Logo" />
            <div className="hr-greeting-text">
              <h3>
                {greeting} {currentUser.name}
              </h3>
              <p>Have a productive day!</p>
            </div>
          </div>

          {/* Activities */}
          {activeTab === "Activities" && (
            <>
              <div className="hr-checkin-reminder">
                <div className="hr-checkin-text">
                  <div className="hr-checkin-title">
                    <AiOutlineCheckCircle className="hr-icon" />
                    <h4>Check-in reminder</h4>
                  </div>
                  <p>Your shift has already started</p>
                  <h6>General</h6>
                </div>
                <div className="hr-checkin-time">9:00 AM - 6:00 PM</div>
              </div>

              <div className="hr-work-schedule">
                <div className="hr-work-title">
                  <BsCalendar3 className="hr-icon" />
                  <h4>Work Schedule</h4>
                </div>
                <p>24-Aug-2025 - 30-Aug-2025</p>
              </div>
            </>
          )}

          {/* Approvals */}
          {activeTab === "Approvals" && (
            <div className="hr-approvals">
              <h3>Pending Employee Approvals</h3>
              {employees.filter((e) => !e.approved).length === 0 && (
                <p>No pending approvals 🎉</p>
              )}
              {employees
                .filter((e) => !e.approved)
                .map((emp) => (
                  <div key={emp.empId} className="approval-card">
                    <p>
                      {emp.name} ({emp.email}) - {emp.empId}
                    </p>
                    <button onClick={() => approveEmployee(emp.empId)}>
                      Approve ✅
                    </button>
                    <button onClick={() => rejectEmployee(emp.empId)}>
                      Reject ❌
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* Leave Requests */}
          {activeTab === "Leave" && (
            <div className="hr-leave-requests">
              <h3>Employee Leave Requests</h3>
              {leaveApplications.length === 0 ? (
                <p>No leave requests</p>
              ) : (
                leaveApplications.map((l) => (
                  <div key={l.id} className="leave-card">
                    <p>
                      {l.name} ({l.email}) - {l.fromDate} to {l.toDate}
                    </p>
                    <p>Status: {l.status}</p>
                    {l.status === "Pending" && (
                      <>
                        <button onClick={() => approveLeave(l.id)}>
                          Approve ✅
                        </button>
                        <button onClick={() => rejectLeave(l.id)}>
                          Reject ❌
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
