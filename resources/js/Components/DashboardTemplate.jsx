import React, { useState } from "react";
import "./DashboardTemplate.css";

const DashboardTemplate = () => {
  const [currentImage, setCurrentImage] = useState("/images/ab3.jpg");
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "⭐ Stay informed and organized",
      description:
        "Get insights into your personal, team, and organization information using Spaces, a dedicated self-service portal that encourages employees to track their daily tasks, view career history, and stay updated on organization-wide information.",
      image: "./inf1.jpg",
    },
    {
      title: "📦 Access all team information from one place",
      description:
        "Strengthen team collaboration with the all-new team space that displays all your team information, lets you post messages and ideas through the department wall, and always keeps you engaged with groups and channels.",
      image: "./inf2.jpg",
    },
    {
      title: "👤 Effortlessly administer employee management",
      description:
        "Adopt a structured approach to managing transfers, promotions, and performance reviews with easy access to employee data.",
      image: "./inf3.jpg",
    },
  ];

  const handleClick = (index) => {
    setCurrentImage(features[index].image);
    setActiveIndex(index);
  };

  return (
    <div>
      {/* Top Heading Outside of the Section */}
      <h1 className="feature-main-heading-top">
        Experience powerful, <br />flexible collaboration with <br /> a unified portal
      </h1>

      {/* Feature Section */}
      <section className="dashboard-section">
        <div className="feature-container">
          {/* Left Image */}
          <div className="feature-image">
            <img src={currentImage} alt="Feature" />
          </div>

          {/* Right Cards */}
          <div className="feature-content">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => handleClick(index)}
              >
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardTemplate;
