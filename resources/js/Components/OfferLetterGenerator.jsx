import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaBriefcase,
  FaIdCard,
  FaDownload,
  FaFileAlt,
  FaTimes,
  FaFilePdf,
  FaBolt,
  FaLock,
  FaPenFancy,
} from "react-icons/fa";
import "./OfferLetterGenerator.css";

export default function OfferLetterGenerator() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleGenerate = async () => {
    if (!name || !role || !aadharNumber) {
      alert("Please enter Name, Role, and Aadhar Number.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/offer-letter",
        { name, role, aadhar_number: aadharNumber },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Offer_Letter_${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      setShowForm(false); // Close modal after download
    } catch (error) {
      alert(error.response?.data?.error || "Error generating offer letter");
    }
  };

  return (
    <div>
      {/* Intro Section */}
      <div className="offer-intro">
        <h1>HR Software for Every Business</h1>
        <p>
          Streamline all your HR processes and deliver exceptional employee
          experiences with our cloud-based HR software that's intuitive, agile,
          and mobile-friendly.
        </p>
        <p>
          Generate professional offer letters instantly for your new hires.
          Ensure compliance, maintain a consistent brand voice, and make a
          strong first impression with automated document creation.
        </p>
        <ul className="benefits-list">
          <li>
            <FaFilePdf className="benefit-icon" /> Professionally formatted PDF
            offer letters
          </li>
          <li>
            <FaBolt className="benefit-icon" /> Instant download after submission
          </li>
          <li>
            <FaLock className="benefit-icon" /> Secure data handling with
            encryption
          </li>
          <li>
            <FaPenFancy className="benefit-icon" /> Customizable role and
            personal details
          </li>
        </ul>
        <div className="intro-buttons">
          <button
            className="intro-btn get-offer"
            onClick={() => setShowForm(true)}
          >
            Get Offer Letter
          </button>
          <button className="intro-btn request-demo">Request Demo</button>
        </div>
      </div>

      <div className="offer-wrapper">
  <div className="offer-intro">
    {/* Your existing content here */}
  </div>
  <div className="offer-image">
    <img src="/hr2.png" alt="Related visual" />
  </div>
</div>


      {/* Popup Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="offer-letter-container">
              <button className="close-btn" onClick={() => setShowForm(false)}>
                <FaTimes />
              </button>
              <h2 className="title">
                <FaFileAlt className="title-icon" /> Generate Offer Letter
              </h2>

              <div className="form-group">
                <label className="input-label">
                  <FaUser className="input-icon" /> Employee Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Employee Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-box"
                />

                <label className="input-label">
                  <FaBriefcase className="input-icon" /> Role / Position
                </label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-box"
                />

                <label className="input-label">
                  <FaIdCard className="input-icon" /> Aadhar Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Aadhar Number"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  className="input-box"
                />

                <button onClick={handleGenerate} className="download-btn">
                  <FaDownload className="btn-icon" /> Download Offer Letter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
