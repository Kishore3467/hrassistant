import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    alert("Profile updated!");
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser({ name: "", email: "", logo: "", companyId: "" });
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching: ${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <nav className="navbar1">
      {/* Left Section: Back Arrow + Logo */}
      <div className="navbar1-left">
        <span
          className="back-arrow"
          onClick={() => (window.location.href = "/dashboard")}
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
          />
          <button type="submit">🔍</button>
        </form>
      </div>

      {/* Right Section: Profile */}
      <div className="navbar1-right">
        <div
          className="user-profile"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <div className="user-avatar">
            {currentUser.name?.charAt(0) || "U"}
          </div>
          <span className="user-name">{currentUser.name || "User"}</span>
          <span className="profile-arrow">▼</span>
        </div>

        {isProfileOpen && (
          <div className="profile-dropdown">
            <div className="profile-logo-section">
              {currentUser.logo ? (
                <img src={currentUser.logo} alt="Profile Logo" />
              ) : (
                <div className="placeholder-logo">
                  {currentUser.name?.charAt(0)}
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleLogoChange} />
            </div>

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={currentUser.name}
              onChange={handleChange}
            />

            <label>Email:</label>
            <input type="email" value={currentUser.email} disabled />

            <label>Company ID:</label>
            <input
              type="text"
              name="companyId"
              value={currentUser.companyId}
              onChange={handleChange}
              placeholder="e.g., abc_corp"
            />

            <div className="profile-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleSignOut} className="signout-btn">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Topbar;
