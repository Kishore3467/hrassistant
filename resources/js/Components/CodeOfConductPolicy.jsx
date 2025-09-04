import React from "react";
import { FiDownload } from "react-icons/fi";

const CodeOfConductPolicy = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/policies/code-of-conduct.pdf";
    link.setAttribute("download", "code-of-conduct.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="single-policy">
      <h3>⚖️ Code of Conduct</h3>
      <p>Our official Code of Conduct policy for maintaining compliance.</p>
      <button onClick={handleDownload} className="resource-download-btn">
        <FiDownload /> Download
      </button>
    </div>
  );
};

export default CodeOfConductPolicy;
