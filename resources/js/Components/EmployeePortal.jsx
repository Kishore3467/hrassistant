import React, { useState } from "react";
import axios from "axios";
import "./EmployeePortal.css";

export default function EmployeePortal() {
  const [formVisible, setFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [leaveData, setLeaveData] = useState({
    date: "",
    endDate: "",
    name: "",
    email: "",
    subject: "",
    reason: "",
    leaveType: "Personal",
  });

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/leave-requests",
        leaveData
      );

      alert("Leave request submitted successfully!");
      setFormVisible(false);
      setLeaveData({
        date: "",
        endDate: "",
        name: "",
        email: "",
        subject: "",
        reason: "",
        leaveType: "Personal",
      });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "There was an error submitting your leave request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-portal-wrapper">
      {/* --- Leave Request Section --- */}
      <div className="employee-portal-container">
        <div className="portal-header">
          <div>
            <h2>Employee Leave Request Portal</h2>
            <p className="portal-subtitle">
              Submit your leave requests for manager approval
            </p>
          </div>
          <button
            className="request-leave-btn"
            onClick={() => setFormVisible(!formVisible)}
          >
            {formVisible ? "Cancel Request" : "Request Leave"}
          </button>
        </div>

        {formVisible && (
          <form className="leave-request-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="date"
                  value={leaveData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={leaveData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={leaveData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={leaveData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Leave Type</label>
              <select
                name="leaveType"
                value={leaveData.leaveType}
                onChange={handleChange}
                required
              >
                <option value="Personal">Personal</option>
                <option value="Medical">Medical</option>
                <option value="Vacation">Vacation</option>
                <option value="Bereavement">Bereavement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={leaveData.subject}
                onChange={handleChange}
                placeholder="Brief reason for leave"
                required
              />
            </div>

            <div className="form-group">
              <label>Detailed Reason</label>
              <textarea
                name="reason"
                value={leaveData.reason}
                onChange={handleChange}
                placeholder="Provide additional details about your leave request"
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Leave Request"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* --- Employee Scheduling Section --- */}
      
    </div>
  );
}
