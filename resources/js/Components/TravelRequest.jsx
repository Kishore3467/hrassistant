import React, { useState, useEffect } from "react";
import Topbar from "./Topbar";
import "./TravelRequest.css";

const TravelRequest = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: "",
    destination: "",
    purpose: "",
    startDate: "",
    endDate: "",
    cost: "",
    transportType: "flight" // Added transport type
  });

  // Animation state
  const [animate, setAnimate] = useState(false);

  // Load saved requests from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("travelRequests")) || [];
    setRequests(saved);
    
    // Trigger animations after component mounts
    setAnimate(true);
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      ...formData,
      id: Date.now(), // Add unique ID for animations
      status: "Pending" // Add status field
    };
    
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem("travelRequests", JSON.stringify(updatedRequests));

    // Clear form
    setFormData({
      employeeName: "",
      destination: "",
      purpose: "",
      startDate: "",
      endDate: "",
      cost: "",
      transportType: "flight"
    });
  };

  // Transport type icons
  const transportIcons = {
    flight: "✈️",
    train: "🚆",
    bus: "🚌",
    car: "🚗"
  };

  return (
    <>
      <Topbar />
      
      {/* Animated background elements */}
      <div className="travel-background">
        <div className="clouds"></div>
        <div className="airplane"></div>
        <div className="mountains"></div>
      </div>
      
      <div className={`travel-container ${animate ? 'fade-in' : ''}`}>
        <div className="travel-header">
          <h1>Travel Request Portal</h1>
          <p>Plan your business trips with ease</p>
        </div>
        
        <div className="travel-content">
          <div className="travel-form-card slide-in-left">
            <div className="card-header">
              <h2>New Travel Request</h2>
              <div className="form-icon">🌍</div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  placeholder="Where are you going?"
                />
              </div>

              <div className="form-group">
                <label>Purpose of Travel</label>
                <textarea
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  placeholder="Describe the purpose of your trip"
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Transport Type</label>
                  <div className="transport-options">
                    {Object.keys(transportIcons).map(type => (
                      <label key={type} className="transport-option">
                        <input
                          type="radio"
                          name="transportType"
                          value={type}
                          checked={formData.transportType === type}
                          onChange={handleChange}
                        />
                        <span className="transport-icon">{transportIcons[type]}</span>
                        <span className="transport-label">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Estimated Cost (₹)</label>
                  <input
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <button type="submit" className="btn-submit">
                Submit Request
                <span className="btn-icon">✈️</span>
              </button>
            </form>
          </div>

          <div className="travel-list-card slide-in-right">
            <div className="card-header">
              <h2>Travel Requests</h2>
              <div className="requests-count">{requests.length}</div>
            </div>
            
            {requests.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🧳</div>
                <h3>No travel requests yet</h3>
                <p>Submit your first travel request to get started</p>
              </div>
            ) : (
              <div className="requests-container">
                {requests.map((req) => (
                  <div key={req.id} className="request-item">
                    <div className="request-header">
                      <div className="employee-info">
                        <span className="employee-avatar">{req.employeeName.charAt(0)}</span>
                        <span className="employee-name">{req.employeeName}</span>
                      </div>
                      <div className="transport-type">
                        {transportIcons[req.transportType || 'flight']}
                      </div>
                    </div>
                    
                    <div className="request-destination">
                      <span className="destination-icon">📍</span>
                      {req.destination}
                    </div>
                    
                    <div className="request-dates">
                      <div className="date-range">
                        <span className="date-label">From:</span>
                        <span className="date-value">{req.startDate}</span>
                      </div>
                      <div className="date-range">
                        <span className="date-label">To:</span>
                        <span className="date-value">{req.endDate}</span>
                      </div>
                    </div>
                    
                    <div className="request-purpose">
                      {req.purpose}
                    </div>
                    
                    <div className="request-footer">
                      <div className="request-cost">₹{req.cost}</div>
                      <div className="request-status">{req.status || 'Pending'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelRequest;