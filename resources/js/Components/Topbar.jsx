import React, { useState, useEffect, useRef } from "react";
import "./Topbar.css";

const Topbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    logo: "",
    companyId: "",
  });
  const [notification, setNotification] = useState({ show: false, message: "" });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) { // 500KB limit
        showNotification("Image size should be less than 500KB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentUser((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === currentUser.email);
    if (index !== -1) {
      users[index] = currentUser;
    } else {
      users.push(currentUser);
    }
    localStorage.setItem("users", JSON.stringify(users));
    showNotification("Profile updated successfully!");
    setIsProfileOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser({ name: "", email: "", logo: "", companyId: "" });
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      showNotification(`Searching for: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <nav className="navbar1">
        {/* Left Section: Back Arrow + Logo */}
        <div className="navbar1-left">
          <span
            className="back-arrow"
            onClick={() => (window.location.href = "/dashboard")}
            title="Back to Dashboard"
          >
            ←
          </span>
          <div className="navbar-logo-wrapper">
            {currentUser.logo ? (
              <img src={currentUser.logo} alt="Logo" className="navbar-logo" />
            ) : (
              <span className="brand-text">
                {currentUser.companyId || "Company"}
              </span>
            )}
          </div>
        </div>

        {/* Center Section: Search */}
        <div className="navbar1-center">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search employees, files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <span className="search-icon">🔍</span>
            </button>
          </form>
        </div>

        {/* Right Section: Profile */}
        <div className="navbar1-right" ref={dropdownRef}>
          <div
            className={`user-profile ${isProfileOpen ? "active" : ""}`}
            onClick={toggleProfileDropdown}
          >
            <div className="user-avatar">
              {currentUser.name?.charAt(0) || "U"}
            </div>
            <span className="user-name">{currentUser.name || "User"}</span>
            <span className={`profile-arrow ${isProfileOpen ? "rotate" : ""}`}>▼</span>
          </div>

          <div className={`profile-dropdown ${isProfileOpen ? "show" : ""}`}>
            <div className="dropdown-header">
              <h3>Profile Settings</h3>
              <button 
                className="close-dropdown"
                onClick={() => setIsProfileOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="profile-logo-section">
              <div className="logo-preview">
                {currentUser.logo ? (
                  <img src={currentUser.logo} alt="Profile Logo" />
                ) : (
                  <div className="placeholder-logo">
                    {currentUser.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <label className="logo-upload-btn">
                <input type="file" accept="image/*" onChange={handleLogoChange} />
                Change Logo
              </label>
            </div>

            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                value={currentUser.email} 
                disabled 
                className="form-input disabled"
              />
            </div>

            <div className="form-group">
              <label>Company ID:</label>
              <input
                type="text"
                name="companyId"
                value={currentUser.companyId}
                onChange={handleChange}
                placeholder="e.g., abc_corp"
                className="form-input"
              />
            </div>

            <div className="profile-actions">
              <button onClick={handleSave} className="save-btn">Save Changes</button>
              <button onClick={handleSignOut} className="signout-btn">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Notification */}
      {notification.show && (
        <div className="notification">
          {notification.message}
        </div>
      )}
    </>
  );
};

export default Topbar;