import React from "react";
import "./Home.css";
import { FaUsers, FaRobot, FaClock, FaStar, FaPaperPlane, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";
import About from "./About";
import WorkingProcess from "./WorkingProcess";
import { motion } from "framer-motion";
import CustomCursor from "./CustomCursor";
import KeyFeatures from "./KeyFeatures";
 
export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-section-content">
          <h1>Open Source HR Copilot</h1>
          <p className="hero-subtitle">
            Your AI-powered HR assistant for onboarding, employee support and process automation.
          </p>
          <p className="hero-target">
            🇬🇧 UK-based enterprises & 🇮🇳 India-based IT/HR outsourcing firms
          </p>
 
          <div className="hero-buttons-wrap">
            <Link to="/features" className="btn-wrapper">
              <a href="#" className="btn-main">
                <FaStar className="btn-icon-main" /> Explore Features
              </a>
            </Link>
            <Link to="/about" className="btn-wrapper">
              <a href="#" className="btn-outline">
                <FaPaperPlane className="btn-icon-main" /> Get Started
              </a>
            </Link>
          </div>
 
          <div className="hero-highlight-list">
            <div className="highlight-card">
              <FaUsers className="highlight-card-icon" />
              <p>Seamless Employee Onboarding</p>
            </div>
            <div className="highlight-card">
              <FaRobot className="highlight-card-icon" />
              <p>AI-Driven HR Insights</p>
            </div>
            <div className="highlight-card">
              <FaClock className="highlight-card-icon" />
              <p>Save Hours of Manual Work</p>
            </div>
            <div className="highlight-card">
              <FaHeadset className="highlight-card-icon" />
              <p>Employee Support 24/7</p>
            </div>
          </div>
 
          <blockquote className="testimonial-box">
            “HR Copilot has transformed our onboarding process — we save 15+ hours per new hire.”
            <span>— Sarah M., HR Manager</span>
          </blockquote>
        </div>
 
        <div className="hero-image-wrap">
          <img src="./home.png" alt="HR Copilot Illustration" />
        </div>
      </section>
      <About />
      <KeyFeatures />
         {/* <WorkingProcess /> */}
    </>
  );
}