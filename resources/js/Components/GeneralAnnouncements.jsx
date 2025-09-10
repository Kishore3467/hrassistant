import React, { useState, useEffect } from "react";
import "./GeneralAnnouncements.css";
import Topbar from "./Topbar";

const GeneralAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    category: "General",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load announcements from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("announcements")) || [];
    setAnnouncements(stored);
  }, []);

  // Save to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem("announcements", JSON.stringify(data));
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new announcement
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;

    const newAnnouncement = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleString(),
    };

    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    saveToStorage(updated);

    setFormData({ title: "", message: "", category: "General" });
    setIsFormVisible(false);
  };

  // Delete announcement
  const handleDelete = (id) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    saveToStorage(updated);
  };

  // Toggle form visibility
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      <Topbar />
      <div className="announcements-page">
        <div className="announcements-container">
          <div className="announcements-header">
            <h2>
              <span className="icon">📢</span>
              Company Announcements
            </h2>
            <button className="btn-toggle-form" onClick={toggleForm}>
              {isFormVisible ? "Cancel" : "New Announcement"}
            </button>
          </div>

          {/* Post Form with slide animation */}
          <div className={`form-container ${isFormVisible ? "visible" : ""}`}>
            <form className="announcement-form" onSubmit={handleSubmit}>
              <h3>Create New Announcement</h3>
              <input
                type="text"
                name="title"
                placeholder="Announcement Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Write your announcement here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              <div className="form-row">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="General">General</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Policy Update">Policy Update</option>
                  <option value="Reminder">Reminder</option>
                  <option value="Urgent">Urgent</option>
                </select>
                <button type="submit" className="btn-post">
                  Post Announcement
                </button>
              </div>
            </form>
          </div>

          {/* Statistics bar */}
          <div className="announcement-stats">
            <div className="stat-item">
              <span className="stat-number">{announcements.length}</span>
              <span className="stat-label">Total Announcements</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {announcements.filter(a => a.category === "Urgent").length}
              </span>
              <span className="stat-label">Urgent</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {announcements.filter(a => a.category === "Policy Update").length}
              </span>
              <span className="stat-label">Policy Updates</span>
            </div>
          </div>

          {/* List */}
          <div className="announcement-list">
            {announcements.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>No announcements yet</h3>
                <p>Be the first to create an announcement for your team</p>
              </div>
            ) : (
              announcements.map((a) => (
                <div key={a.id} className={`announcement-card ${a.category.toLowerCase().replace(' ', '-')}`}>
                  <div className="card-header">
                    <h3>{a.title}</h3>
                    <span className={`category-tag ${a.category.toLowerCase().replace(' ', '-')}`}>
                      {a.category}
                    </span>
                  </div>
                  <p className="message">{a.message}</p>
                  <div className="card-footer">
                    <span className="date">{a.date}</span>
                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(a.id)}
                      aria-label="Delete announcement"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralAnnouncements;