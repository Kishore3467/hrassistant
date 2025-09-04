import React from "react";

const MusterRollReport = () => {
  return (
    <section className="feature-section">
      {/* Left Content */}
      <div className="feature-content">
        <span className="feature-tag">Reports and analytics</span>
        <h1 className="feature-title">Get detailed attendance summaries</h1>
        <p className="feature-description">
          Understand your organization's attendance patterns using insightful reports like early and late arrivals, attendance data for payroll, muster rolls, and more.
        </p>
      </div>

      {/* Right Image */}
      <div className="feature-image">
        <img src="./zp-detailed-summaries.jpg" alt="Geo Restriction Dashboard" />
      </div>
    </section>
  );
};

export default MusterRollReport;
