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
  };

  // Delete announcement
  const handleDelete = (id) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    saveToStorage(updated);
  };

  return (
    <>
    <Topbar/>
    <div className="announcements-page">
      <h2>📢 General Announcements</h2>

      {/* Post Form */}
      <form className="announcement-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Write announcement..."
          value={formData.message}
          onChange={handleChange}
          required
        />
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
        </select>
        <button type="submit">Post Announcement</button>
      </form>

      {/* List */}
      <div className="announcement-list">
        {announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="announcement-card">
              <h3>{a.title}</h3>
              <p>{a.message}</p>
              <span className="category">📌 {a.category}</span>
              <span className="date">{a.date}</span>
              <button onClick={() => handleDelete(a.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default GeneralAnnouncements;
