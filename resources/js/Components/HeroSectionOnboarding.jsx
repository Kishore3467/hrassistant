import React, { useState } from "react";
import "./HeroSectionOnboarding.css";
import Onboarding from "./Onboarding";
import PreOnboarding from "./PreOnboarding";
import TrackOnboarding from "./TrackOnboarding";
import SignupModal from "./SignupModal"; // Import Modal
import MainDashDashboard from "./MainDashboard";

const HeroSectionOnboarding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-tag">Onboarding software</span>
        <h1 className="hero-title">Create a memorable first impression</h1>
        <p className="hero-description">
          Give your new hires the warm welcome they deserve. With personalized
          onboarding workflows, Zoho People helps your new hires complete
          onboarding procedures in no time so they sail smoothly into their
          first day.
        </p>
        <div className="hero-buttons">
        <button
  className="btn-primary"
  onClick={() => setIsModalOpen(true)}
>
  Sign up for free trial →
</button>

<SignupModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
/>

          <button className="btn-secondary">Request Demo →</button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="hero-image">
        <img src="./onboarding.webp" alt="Attendance Dashboard" />
      </div>

      <PreOnboarding />
      <TrackOnboarding />
      {/* <Onboarding /> */}

      {/* Modal */}
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSectionOnboarding;
