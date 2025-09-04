import React, { useState, useEffect } from "react";
import "./UserLicenseDashboard.css";

const UserLicenseDashboard = () => {
  const [activeTab, setActiveTab] = useState("license");
  const [currentUser, setCurrentUser] = useState(null);
  const [logo, setLogo] = useState("/default-logo.png");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      setLogo(user.logo || "/default-logo.png");
    }
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updatedUser = { ...currentUser, logo: reader.result };
      setLogo(reader.result);
      setCurrentUser(updatedUser);

      // Update currentUser in localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Update user in users array
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === updatedUser.email ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    };
    reader.readAsDataURL(file);
  };

  if (!currentUser) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <img
            src={logo}
            alt="Company Logo"
            className="company-logo"
            style={{ height: "40px", cursor: "pointer" }}
            title="Click to change logo"
            onClick={() => document.getElementById("logoInput").click()}
          />
          <input
            type="file"
            id="logoInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>

        <div className="header-center">
          <nav className="navigation">
            <button
              className={activeTab === "license" ? "nav-btn active" : "nav-btn"}
              onClick={() => setActiveTab("license")}
            >
              License
            </button>
            <button
              className={activeTab === "users" ? "nav-btn active" : "nav-btn"}
              onClick={() => setActiveTab("users")}
            >
              Users
            </button>
            <button
              className={activeTab === "settings" ? "nav-btn active" : "nav-btn"}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="header-right">
          <div className="user-info">
            <span className="user-name">{currentUser.name}</span>
            <div className="user-badge">Super Administrator</div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="license-container">
          <div className="license-header">
            <h1>User License</h1>
            <div className="license-progress">
              <div className="progress-text">1/10 Licenses Used</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "10%" }}></div>
              </div>
            </div>
          </div>

          <div className="license-details">
            <div className="detail-card">
              <h3>License Type</h3>
              <p>Enterprise Plan</p>
            </div>
            <div className="detail-card">
              <h3>Valid Until</h3>
              <p>December 31, 2024</p>
            </div>
            <div className="detail-card">
              <h3>Active Users</h3>
              <p>1/10</p>
            </div>
            <div className="detail-card">
              <h3>Status</h3>
              <p className="status-active">Active</p>
            </div>
          </div>

          <div className="license-actions">
            <button className="btn-primary">Add User</button>
            <button className="btn-secondary">Manage License</button>
          </div>

          <div className="users-table">
            <h2>Licensed Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{currentUser.name}</td>
                  <td>{currentUser.email}</td>
                  <td>Super Administrator</td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                  <td>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn remove">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLicenseDashboard;
