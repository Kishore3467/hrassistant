import React from 'react';
import './About.css';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
const About = () => {
    return (
        <section className="about-section">
            <div className="about-container">
 
                {/* LEFT SIDE - IMAGE */}
                <div className="about-image fade-in-left">
                    <img src="./a.jpg" alt="Innovation at Work" />
                    <div className="image-overlay">
                        <p>Empowering enterprise transformation with Cloud, AI, and Innovation</p>
                    </div>
                </div>
 
                {/* RIGHT SIDE CONTENT */}
                <div className="about-content fade-in-right">
                    <h4 className="about-subtitle">Your Trusted Growth Partner</h4>
                    <h2 className="about-title">About <span>xyz Ltd</span></h2>
                    <p className="about-description">
                        We are a fast-growing app and web development company, headquartered in Asia with a sales and support office in Japan.
                    </p>
                    <p className="about-description">
                        For over 8 years, we’ve delivered innovative, cloud-powered solutions across industries — helping clients unlock new revenue streams, boost efficiency, and create exceptional experiences.
                    </p>
                    <p className="about-description">
                        With deep tech expertise and agile methods, we guide businesses through today’s complex digital world. Our partnership approach focuses on accelerating growth while building sustainable, self-sufficient solutions.
                    </p>
                    <p className="about-description">
                        Our success is measured by the lasting impact we create in the shortest time possible.
                    </p>
 
                    <button className="about-btn">
                        <Link to="/features" className="bt">Explore Features <FaArrowRight /></Link>
                    </button>
                </div>
            </div>
 
            {/* PARTNERS SECTION */}
    <div className="partners-section fade-in-right">
  <h3 className="partners-title">Our Technology Partners</h3>
  <div className="partners-logos">
    <div className="partner-card">
      <img src="./azure.png" alt="Microsoft Azure" />
      <div className="partner-content">
        Microsoft Azure <br/> Leading cloud platform providing scalable and secure solutions.
      </div>
    </div>
    <div className="partner-card">
      <img src="./aws.png" alt="AWS" />
      <div className="partner-content">
        AWS <br/> Comprehensive cloud services for computing, storage, and AI.
      </div>
    </div>
    <div className="partner-card">
      <img src="./gcp.png" alt="Google Cloud" />
      <div className="partner-content">
        Google Cloud <br/> Innovative cloud solutions with powerful machine learning tools.
      </div>
    </div>
    <div className="partner-card">
      <img src="./oracle.png" alt="Oracle" />
      <div className="partner-content">
        Oracle <br/> Enterprise-grade cloud applications and database services.
      </div>
    </div>
  </div>
</div>
 
 
        </section>
    );
};
 
export default About;