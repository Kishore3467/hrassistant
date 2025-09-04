import React from "react";
import "./TrackOnboarding.css";

const TrackOnboarding = () => {
  return (
    <section className="preonboarding1">
      <div className="preonboarding1-content">
        {/* Left side big heading */}
        <div className="left">
          <h1 className="big-text1">Track onboarding <br /> progress in real time</h1>
        </div>

        {/* Right side paragraph */}
        <div className="right1">
          <p>
            Monitor the onboarding progress at every stage <br /> using comprehensive reports. With regular<br /> reminders and continued support, encourage your new hires <br /> to complete processes quickly and easily.
          </p>
        </div>
      </div>

      {/* Centered Image */}
      <div className="image-container1">
        <img src="./emptrack2.jpg" alt="Pre-Onboarding" />
      </div>
    </section>
  );
};

export default TrackOnboarding;
