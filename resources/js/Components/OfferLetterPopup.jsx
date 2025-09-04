import React, { useState } from "react";
import OfferLetterGenerator from "./OfferLetterGenerator";
import "./OfferLetterPopup.css";

export default function OfferLetterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent overlay click event
    setIsOpen(false);
  };

  return (
    <div className="offer-letter-section">
      <h2>Create a memorable first impression</h2>
      <p>
        Give your new hires the warm welcome they deserve. With personalized
        onboarding workflows, Zoho People helps your new hires complete
        onboarding procedures in no time so they sail smoothly into their first
        day.
      </p>

      <button className="access-btn" onClick={() => setIsOpen(true)}>
        Get Offer Letter
      </button>
      <button className="demo-btn">Request Demo</button>

      {isOpen && (
        <div className="popup-overlay" onClick={handleClose}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // Prevent overlay close
          >
            <span className="close-btn" onClick={handleClose}>
              &times;
            </span>
            <OfferLetterGenerator />
          </div>
        </div>
      )}
    </div>
  );
}
