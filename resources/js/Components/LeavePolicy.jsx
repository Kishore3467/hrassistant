import React, { useEffect, useState } from "react";
import "./LeavePolicy.css";
import Topbar from "./Topbar";

export default function LeavePolicy() {
  const [activePage, setActivePage] = useState("LeavePolicy");
  const [policies, setPolicies] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    color: "#000000",
    type: "Paid",
    policy: "Experience based",
    unit: "Days",
    status: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Get current HR info
  const currentHR = JSON.parse(localStorage.getItem("currentHR"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // ---------------- LOAD COMPANY-SPECIFIC POLICIES ----------------
  useEffect(() => {
    const storedPolicies = JSON.parse(
      localStorage.getItem(`policies_${currentHR?.companyId}`)
    ) || [];
    setPolicies(storedPolicies);
  }, [currentHR]);

  // ---------------- LOAD COMPANY-SPECIFIC LEAVES ----------------
  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem("leaveApplications")) || [];
    const companyLeaves = storedLeaves.filter(
      (l) => l.companyId === currentHR?.companyId
    );
    setLeaveApplications(companyLeaves);
  }, [currentHR]);

  // Listen to storage changes for dynamic updates
  useEffect(() => {
    const handleStorage = () => {
      const storedLeaves = JSON.parse(localStorage.getItem("leaveApplications")) || [];
      const companyLeaves = storedLeaves.filter(
        (l) => l.companyId === currentHR?.companyId
      );
      setLeaveApplications(companyLeaves);

      const storedPolicies = JSON.parse(
        localStorage.getItem(`policies_${currentHR?.companyId}`)
      ) || [];
      setPolicies(storedPolicies);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [currentHR]);

  // ---------------- POLICY FUNCTIONS ----------------
  const toggleStatus = (index) => {
    const updated = [...policies];
    updated[index].status = !updated[index].status;
    setPolicies(updated);
    localStorage.setItem(
      `policies_${currentHR?.companyId}`,
      JSON.stringify(updated)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy({ ...newPolicy, [name]: value });
  };

  const addPolicy = () => {
    const updated = [...policies, newPolicy];
    setPolicies(updated);
    localStorage.setItem(
      `policies_${currentHR?.companyId}`,
      JSON.stringify(updated)
    );
    setNewPolicy({
      name: "",
      color: "#000000",
      type: "Paid",
      policy: "Experience based",
      unit: "Days",
      status: true,
    });
    setShowForm(false);
  };

  const handleEditClick = (index) => {
    setSelectedIndex(index);
    setNewPolicy(policies[index]);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDeleteClick = (index) => {
    setSelectedIndex(index);
    setModalType("delete");
    setShowModal(true);
  };

  const saveEdit = () => {
    const updated = [...policies];
    updated[selectedIndex] = newPolicy;
    setPolicies(updated);
    localStorage.setItem(
      `policies_${currentHR?.companyId}`,
      JSON.stringify(updated)
    );
    setShowModal(false);
  };

  const confirmDelete = () => {
    const updated = policies.filter((_, i) => i !== selectedIndex);
    setPolicies(updated);
    localStorage.setItem(
      `policies_${currentHR?.companyId}`,
      JSON.stringify(updated)
    );
    setShowModal(false);
  };

  // ---------------- LEAVE TRACKER FUNCTIONS ----------------
  const handleLeaveApply = (leaveData) => {
    const allLeaves = JSON.parse(localStorage.getItem("leaveApplications")) || [];
    const newLeave = {
      ...leaveData,
      id: Date.now(), // unique id
      name: currentUser.name,
      employeeId: currentUser.id,
      companyId: currentHR.companyId,
      status: "Pending",
    };
    const updatedLeaves = [...allLeaves, newLeave];
    localStorage.setItem("leaveApplications", JSON.stringify(updatedLeaves));
    setLeaveApplications(updatedLeaves.filter(l => l.companyId === currentHR.companyId));
  };

  const updateLeaveStatus = (leaveId, status) => {
    const allLeaves = JSON.parse(localStorage.getItem("leaveApplications")) || [];
    const updatedLeaves = allLeaves.map(l => {
      if (l.id === leaveId) return { ...l, status };
      return l;
    });
    localStorage.setItem("leaveApplications", JSON.stringify(updatedLeaves));
    setLeaveApplications(updatedLeaves.filter(l => l.companyId === currentHR.companyId));
  };

  // ---------------- LEAVE FORM STATE ----------------
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm({ ...leaveForm, [name]: value });
  };

  const submitLeave = () => {
    if (!leaveForm.type || !leaveForm.fromDate || !leaveForm.toDate)
      return alert("Fill all required fields");
    handleLeaveApply(leaveForm);
    setLeaveForm({ type: "", fromDate: "", toDate: "", reason: "" });
  };

  return (
    <div className="lp-container">
      <Topbar />
      <div className="lp-wrapper">
        <aside className="lp-sidebar">
          <ul>
            <li
              className={activePage === "LeavePolicy" ? "active" : ""}
              onClick={() => setActivePage("LeavePolicy")}
            >
              Leave Policy
            </li>
            <li
              className={activePage === "WorkCalendar" ? "active" : ""}
              onClick={() => setActivePage("WorkCalendar")}
            >
              Work Calendar
            </li>
            <li>Pay Period</li>
            <li>Leave Tracker</li>
            <li>Reports</li>
          </ul>
        </aside>

        <main className="lp-main">
          {/* ---------------- LEAVE POLICY ---------------- */}
          {activePage === "LeavePolicy" && (
            <>
              <div className="lp-header">
                <h2>Leave Policy</h2>
                <button className="lp-btn primary" onClick={() => setShowForm(true)}>
                  Add Leave Policy
                </button>
              </div>

              {showForm && (
                <div className="lp-modal">
                  <div className="lp-modal-content">
                    <span className="lp-close" onClick={() => setShowForm(false)}>
                      &times;
                    </span>
                    <h3>Add Leave Policy</h3>
                    <input
                      type="text"
                      name="name"
                      placeholder="Policy Name"
                      value={newPolicy.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="color"
                      name="color"
                      value={newPolicy.color}
                      onChange={handleInputChange}
                    />
                    <select name="type" value={newPolicy.type} onChange={handleInputChange}>
                      <option value="Paid">Paid</option>
                      <option value="Unpaid">Unpaid</option>
                      <option value="Compensatory Off">Compensatory Off</option>
                    </select>
                    <select name="policy" value={newPolicy.policy} onChange={handleInputChange}>
                      <option value="Experience based">Experience based</option>
                      <option value="Fixed based">Fixed based</option>
                      <option value="Management approval">Management approval</option>
                      <option value="Custom">Custom</option>
                    </select>
                    <input
                      type="text"
                      name="unit"
                      placeholder="Unit"
                      value={newPolicy.unit}
                      onChange={handleInputChange}
                    />
                    <button className="lp-btn primary" onClick={addPolicy}>
                      Save Policy
                    </button>
                  </div>
                </div>
              )}

              <table className="lp-table">
                <thead>
                  <tr>
                    <th>Leave policy</th>
                    <th>Type</th>
                    <th>Policy type</th>
                    <th>Unit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.length ? (
                    policies.map((p, i) => (
                      <tr key={i}>
                        <td>
                          <span className="lp-dot" style={{ background: p.color }}></span> {p.name}
                        </td>
                        <td>{p.type}</td>
                        <td>{p.policy}</td>
                        <td>{p.unit}</td>
                        <td>
                          <label className="lp-switch">
                            <input
                              type="checkbox"
                              checked={p.status}
                              onChange={() => toggleStatus(i)}
                            />
                            <span className="slider"></span>
                          </label>
                        </td>
                        <td>
                          <button className="lp-btn edit" onClick={() => handleEditClick(i)}>
                            Edit
                          </button>
                          <button className="lp-btn delete" onClick={() => handleDeleteClick(i)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No policies found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {showModal && (
                <div className="lp-modal">
                  <div className="lp-modal-content">
                    <span className="lp-close" onClick={() => setShowModal(false)}>
                      &times;
                    </span>
                    {modalType === "edit" && (
                      <>
                        <h3>Edit Policy</h3>
                        <input
                          type="text"
                          name="name"
                          value={newPolicy.name}
                          onChange={handleInputChange}
                        />
                        <input
                          type="color"
                          name="color"
                          value={newPolicy.color}
                          onChange={handleInputChange}
                        />
                        <select name="type" value={newPolicy.type} onChange={handleInputChange}>
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                          <option value="Compensatory Off">Compensatory Off</option>
                        </select>
                        <select name="policy" value={newPolicy.policy} onChange={handleInputChange}>
                          <option value="Experience based">Experience based</option>
                          <option value="Fixed based">Fixed based</option>
                          <option value="Management approval">Management approval</option>
                          <option value="Custom">Custom</option>
                        </select>
                        <input type="text" name="unit" value={newPolicy.unit} onChange={handleInputChange} />
                        <button className="lp-btn primary" onClick={saveEdit}>
                          Save Changes
                        </button>
                      </>
                    )}
                    {modalType === "delete" && (
                      <>
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete "{policies[selectedIndex].name}"?</p>
                        <button className="lp-btn delete" onClick={confirmDelete}>
                          Delete
                        </button>
                        <button className="lp-btn secondary" onClick={() => setShowModal(false)}>
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ---------------- LEAVE TRACKER ---------------- */}
              <div style={{ marginTop: "40px" }}>
                <h2>Leave Tracker</h2>

                {/* Employee Leave Application Form */}
                {currentUser?.role === "Employee" && (
                  <div className="leave-form">
                    <select name="type" value={leaveForm.type} onChange={handleLeaveChange}>
                      <option value="">-- Select Leave Type --</option>
                      {policies.filter(p => p.status).map((p, idx) => (
                        <option key={idx} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                    <input type="date" name="fromDate" value={leaveForm.fromDate} onChange={handleLeaveChange} />
                    <input type="date" name="toDate" value={leaveForm.toDate} onChange={handleLeaveChange} />
                    <input type="text" name="reason" placeholder="Reason" value={leaveForm.reason} onChange={handleLeaveChange} />
                    <button className="lp-btn primary" onClick={submitLeave}>Apply Leave</button>
                  </div>
                )}

                {/* Leave Tracker Table */}
                <table className="lp-table">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Employee ID</th>
                      <th>Leave Type</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Reason</th>
                      <th>Status</th>
                      {currentHR && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {leaveApplications.length ? leaveApplications.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.name}</td>
                        <td>{leave.employeeId}</td>
                        <td>{leave.type}</td>
                        <td>{leave.fromDate}</td>
                        <td>{leave.toDate}</td>
                        <td>{leave.reason}</td>
                        <td>{leave.status}</td>
                        {currentHR && (
                          <td>
                            {leave.status === "Pending" && (
                              <>
                                <button onClick={() => updateLeaveStatus(leave.id, "Approved")}>Approve</button>
                                <button onClick={() => updateLeaveStatus(leave.id, "Rejected")}>Reject</button>
                              </>
                            )}
                          </td>
                        )}
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={currentHR ? 8 : 7} style={{ textAlign: "center" }}>No leave applications found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
