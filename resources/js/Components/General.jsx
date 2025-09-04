import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import "./General.css";
import Topbar from "./Topbar";
import ShiftManagement from "./ShiftManagement";

export default function General() {
  const [selectedSection, setSelectedSection] = useState("general");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // ✅ States for Auto Shift Assignment
  const [enabled, setEnabled] = useState(false);
  const [preference, setPreference] = useState("Closest shift (based on time)");
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifyFeed, setNotifyFeed] = useState(false);
  const [applicable, setApplicable] = useState("all");

  // ✅ Employees (fetched from localStorage)
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // ✅ Get logged-in user (stored as JSON object { name, email })
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const stored = localStorage.getItem(`employees_${currentUser.email}`);
      if (stored) setEmployees(JSON.parse(stored));
    }
  }, [currentUser]);

  const handleSaveAutoShift = () => {
    console.log("Auto Shift Settings Saved:", {
      enabled,
      preference,
      notifyEmail,
      notifyFeed,
      applicable,
      selectedEmployees,
    });
    alert("Auto Shift Assignment settings saved!");
  };

  return (
    <>
      <Topbar />
      <Layout>
        <div className="pro-content">
          <div className="pro-content-inner">

            {/* Sidebar Tabs */}
            <div className="sidebar-tabs">
              <button
                className={selectedSection === "general" ? "active-tab" : ""}
                onClick={() => setSelectedSection("general")}
              >
                General Settings
              </button>
              <button
                className={selectedSection === "autoShift" ? "active-tab" : ""}
                onClick={() => setSelectedSection("autoShift")}
              >
                Auto Shift Assignment
              </button>
            </div>

            {/* ✅ Show Shift Management only in General Settings */}
            {selectedSection === "general" && <ShiftManagement />}

            {/* ✅ Auto Shift Section */}
            {selectedSection === "autoShift" && (
              <div className="pro-card">
                <h2>Auto shift assignment</h2>
                <label>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() => setEnabled(!enabled)}
                  />{" "}
                  Enable Auto shift assignment
                </label>

                {enabled && (
                  <>
                    <h3>Auto-assign shift preference</h3>
                    <select
                      className="shift-select"
                      value={preference}
                      onChange={(e) => setPreference(e.target.value)}
                    >
                      <option>Closest shift (based on time)</option>
                      <option>First shift available</option>
                      <option>Last shift available</option>
                    </select>

                    <h3>Employee notifications</h3>
                    <label>
                      <input
                        type="checkbox"
                        checked={notifyEmail}
                        onChange={() => setNotifyEmail(!notifyEmail)}
                      />{" "}
                      Email
                    </label>
                    <br />
                    <label>
                      <input
                        type="checkbox"
                        checked={notifyFeed}
                        onChange={() => setNotifyFeed(!notifyFeed)}
                      />{" "}
                      Feed notification
                    </label>

                    <h3 style={{ marginTop: "20px" }}>Applicable to</h3>
                    <label>
                      <input
                        type="radio"
                        checked={applicable === "all"}
                        onChange={() => setApplicable("all")}
                      />{" "}
                      All users
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        checked={applicable === "specific"}
                        onChange={() => setApplicable("specific")}
                      />{" "}
                      Specific users
                    </label>

                    {/* ✅ Dropdown for Specific Users */}
                    {applicable === "specific" && (
                      <div style={{ marginTop: "10px" }}>
                        <h4>Select Employee:</h4>
                        <select
                          className="employee-select"
                          value={selectedEmployee}
                          onChange={(e) => {
                            setSelectedEmployee(e.target.value);
                            setSelectedEmployees([e.target.value]);
                          }}
                        >
                          <option value="">-- Select an Employee --</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>
                              {emp.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                <div style={{ marginTop: "20px" }}>
                  <button className="btn primary" onClick={handleSaveAutoShift}>
                    Save
                  </button>
                  <button
                    className="btn secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
