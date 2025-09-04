// OrganizationModal.jsx
import React, { useState } from "react";
import "./OrganizationModal.css";

const sections = [
  {
    title: "Add employees quickly",
    text: `Migrate your employee data to Zoho People in just a few steps. You
      can import, add, and invite users directly or sync them through
      Zoho Mail, Office 365, and Google Workspace integrations.`,
    image: "./ab1.jpg",
  },
  {
    title: "Organize multiple business entities",
    text: `From adding your business entities and their different divisions to
      building your organization structure, you can effortlessly manage
      your employee data from within Zoho People.`,
    image: "./ab2.jpg",
  },
  {
    title: "Automate employee ID generation",
    text: `Keep employee records organized and secure by automatically
      generating ID numbers based on custom parameters like entity,
      location, department, prefixes, and suffixes.`,
    image: "./ab3.jpg",
  },
  {
    title: "Classify your workforce",
    text: `Set the foundation for error-free management, from payroll and
      admin actions to performance and learning management by dividing
      your workforce into departments, designations, and locations.`,
    image: "./ab4.jpg",
  },
];

const OrganizationModal = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
     <div className="organization-section">
        <h1 className="organization-heading">
        Create and customize your organization
      </h1>
        <div className="info-card">
      <div className="card-body">
        {/* Left Image Box */}
        <div
          className="card-image"
          style={{ backgroundImage: `url(${sections[activeIndex].image})` }}
        ></div>

        {/* Right Text Section */}
        <div className="card-text">
          <h2 className="card-title">{sections[activeIndex].title}</h2>
          <p>{sections[activeIndex].text}</p>

          {/* Clickable headings */}
          <div className="section-buttons">
            {sections.map((section, index) => (
              <button
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => setActiveIndex(index)}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrganizationModal;
