import React, { useState } from "react";
import axios from "axios";

const DownloadOfferLetter = () => {
  const [aadhar, setAadhar] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/offer-letter/${aadhar}`, {
        responseType: 'blob',
      });

      // Create a blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "offer_letter.txt"); // or .pdf if you return a PDF
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      setError("Aadhar number not found or server error.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h3>Download Offer Letter</h3>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          placeholder="Enter Aadhar Number"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          required
        />
        <button type="submit">Download</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DownloadOfferLetter;
