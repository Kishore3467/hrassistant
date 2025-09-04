// HeroSection.jsx
import React from "react";
import "./HeroSection.css";
import AttendanceFeature from "./AttendanceFeature";
import CoreHR from "./CoreHR";
import MusterRollReport from "./MusterRollReport";
import FAQ from "./Faq";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-tag">Attendance management system</span>
        <h1 className="hero-title">Manage your attendance like clockwork</h1>
        <p className="hero-description">
          Boost workplace efficiency with a flexible attendance system that lets
          you check-in from the web and mobile app, allows policy customization
          according to changing work preferences, and manages all your attendance
          information accurately.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Sign up for free trial →</button>
          <button className="btn-secondary">Request Demo →</button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="hero-image">
        <img src="./zp-attendance-new.webp" alt="Attendance Dashboard" />
      </div>
      <AttendanceFeature/>
      <MusterRollReport/>
      <CoreHR/>
      <FAQ/>
    </section>
  );
};

export default HeroSection;
