import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import axios from "axios";
import "./LeaveManagement.css";

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  // Fetch leave requests from API on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/leave-requests"
      );
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const sendEmailNotification = (email, status, name, dates, reason) => {
    const statusColor = status === "Approved" ? "#4CAF50" : "#F44336";

    const templateParams = {
      to_email: email,
      to_name: name,
      leave_status: status,
      leave_dates: dates,
      status_color: statusColor,
      message: reason,
    };

    emailjs
      .send(
        "service_si20iih", // Your EmailJS Service ID
        "template_yi39886", // Your EmailJS Template ID
        templateParams,
        "huyXk0U8nCVm-ghYn" // Your EmailJS Public Key
      )
      .then(
        () => {
          setNotification({
            show: true,
            message: `Email sent to ${name} (${email}): Leave ${status.toLowerCase()} for ${dates}`,
            type: status.toLowerCase(),
          });

          setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
          }, 5000);
        },
        (error) => {
          console.error("Email sending failed:", error);
          setNotification({
            show: true,
            message: `Failed to send email to ${name}.`,
            type: "error",
          });

          setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
          }, 5000);
        }
      );
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/leave-requests/${id}`, {
        status: newStatus,
      });

      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) => {
          if (request.id === id) {
            const dates = `${request.date} to ${request.end_date || request.endDate}`;
            sendEmailNotification(
              request.email,
              newStatus,
              request.name,
              dates,
              request.reason
            );
            return { ...request, status: newStatus };
          }
          return request;
        })
      );
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update leave status");
    }
  };

  const filteredRequests = leaveRequests.filter((request) => {
    const matchesFilter =
      filter === "all" ||
      request.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="leave-management-container">
      {notification.show && (
        <div className={`notification-banner ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === "approved" ? "✓" : "✗"}
          </span>
          {notification.message}
        </div>
      )}

      <header className="page-header">
        <div>
          <h1 className="page-title">Leave Management System</h1>
          <p className="page-subtitle">
            Review and manage employee leave requests
          </p>
        </div>
      </header>

      <div className="controls-section">
        <div className="search-filter-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="search-icon">🔍</i>
          </div>

          <div className="filter-dropdown">
            <label htmlFor="status-filter">Filter by status:</label>
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="leave-table">
          <thead>
            <tr>
              <th className="text-left">Employee</th>
              <th className="text-left">Leave Type</th>
              <th className="text-left">Dates</th>
              <th className="text-left">Reason</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="text-left">
                    <div className="employee-info">
                      <div className="employee-name">{request.name}</div>
                      <div className="employee-email">{request.email}</div>
                    </div>
                  </td>
                  <td className="text-left">{request.leave_type || request.leaveType}</td>
                  <td className="text-left">
                    {request.date} to {request.end_date || request.endDate}
                    <div className="duration-badge">
                      {Math.floor(
                        (new Date(request.end_date || request.endDate) -
                          new Date(request.date)) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}{" "}
                      days
                    </div>
                  </td>
                  <td className="text-left">
                    <div className="reason-container">
                      <strong>{request.subject}</strong>
                      <p>{request.reason}</p>
                    </div>
                  </td>
                  <td className="text-center">
                    <span
                      className={`status-badge ${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="action-buttons">
                      <button
                        className="btn-approve"
                        onClick={() => updateStatus(request.id, "Approved")}
                        disabled={request.status !== "Pending"}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => updateStatus(request.id, "Rejected")}
                        disabled={request.status !== "Pending"}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">
                  No leave requests found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;
