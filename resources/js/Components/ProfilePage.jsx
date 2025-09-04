import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "", email: "", logo: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) setUser(currentUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Update localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Also update in "users" array if you want persistence across sign-ins
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }
    alert("Profile updated successfully!");
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-card">
        <div className="profile-logo">
          {user.logo ? (
            <img src={user.logo} alt="Profile Logo" />
          ) : (
            <div className="placeholder-logo">{user.name?.charAt(0)}</div>
          )}
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>
        <div className="profile-info">
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={user.email} disabled />

          <label>Role:</label>
          <input type="text" value="Super Administrator" disabled />

          <div className="profile-actions">
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
