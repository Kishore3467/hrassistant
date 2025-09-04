import React from "react";
import "./AttendanceFeature.css";

const AttendanceFeature = () => {
  return (
    <section className="feature-section">
      {/* Left Content */}
      <div className="feature-content">
        <span className="feature-tag">IP and geofencing</span>
        <h1 className="feature-title">Capture attendance in real time</h1>
        <p className="feature-description">
          Allow your teams to access work from any authorized location or device
          with IP and location-based attendance marking, making the entire process
          safe and secure.
        </p>
      </div>

      {/* Right Image */}
      <div className="feature-image">
        <img src="./zp-geofencing1.png" alt="Geo Restriction Dashboard" />
      </div>
    </section>
  );
};

export default AttendanceFeature;
