import React from "react";
import "./PreOnboarding.css";

const PreOnboarding = () => {
  return (
    <section className="preonboarding">
      <div className="preonboarding-content">
        {/* Left side big heading */}
        <div className="left">
          <h1 className="big-text">Pre-onboard for <br /> a great day one</h1>
        </div>

        {/* Right side paragraph */}
        <div className="right">
          <p>
            Pre-onboarding helps new hires feel welcomed and prepared before <br />
            their official start date. It ensures that they have access to
            resources, <br /> necessary information, and company insights, creating a
            smooth transition <br /> into their new role.
          </p>
        </div>
      </div>

      {/* Centered Image */}
      <div className="image-container">
        <img src="./emp-onboarding.jpg" alt="Pre-Onboarding" />
      </div>
    </section>
  );
};

export default PreOnboarding;
