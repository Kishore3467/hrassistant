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
  });

  // Load saved requests from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("travelRequests")) || [];
    setRequests(saved);
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRequests = [...requests, formData];
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
    });
  };

  return (
    <>
      <Topbar />
      <div className="travel-container">
        <div className="travel-form-card">
          <h2>Employee Travel Request</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Employee Name</label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
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
              />
            </div>

            <div className="form-group">
              <label>Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="form-group">
              <label>Estimated Cost</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Submit Request
            </button>
          </form>
        </div>

        <div className="travel-list-card">
          <h2>Submitted Travel Requests</h2>
          {requests.length === 0 ? (
            <p>No travel requests found.</p>
          ) : (
            <table className="travel-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Destination</th>
                  <th>Purpose</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, index) => (
                  <tr key={index}>
                    <td>{req.employeeName}</td>
                    <td>{req.destination}</td>
                    <td>{req.purpose}</td>
                    <td>{req.startDate}</td>
                    <td>{req.endDate}</td>
                    <td>₹{req.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default TravelRequest;
