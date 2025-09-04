import React, { useState } from "react";
import "./EmployeeScheduling.css";
import EmployeeLogin from "./EmployeeLogin"; // import signup form
// import "./EmployeeLogin.css";

const EmployeeScheduling = () => {
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  return (
    <div className="employee-scheduling">
      <header className="header-section">
        <p className="subtitle">Shift scheduling software</p>
        <h1 className="title">
          Employee <span className="highlight">scheduling</span> and time tracking made simple
        </h1>
        <div className="action-buttons">
          <button
            className="btn btn-red"
            onClick={() => setShowSignupPopup(true)}
          >
            SIGN UP FOR FREE TRIAL
          </button>
          <button className="btn btn-black">REQUEST DEMO</button>
        </div>
      </header>

      {/* Features Section */}
      <div className="features-section">
        <div className="feature-card green-card">
          <h3>Draft schedules effectively and efficiently</h3>
          <img src="./draft.png" alt="Draft Schedule" />
        </div>
        <div className="feature1-image">
          <img src="./men.jpg" alt="Employee working" />
        </div>
        <div className="feature-card brown-card">
          <h3>View workplace activity</h3>
          <img src="./draft.png" alt="Workplace Activity" />
        </div>
      </div>

      {/* Signup Popup */}
      {showSignupPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <span
              className="close-icon"
              onClick={() => setShowSignupPopup(false)}
            >
              &times;
            </span>
            <EmployeeLogin onClose={() => setShowSignupPopup(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeScheduling;
