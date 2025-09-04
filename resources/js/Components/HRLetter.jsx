import React, { useState } from "react";
import Topbar from "./Topbar";
import Modal from "react-modal";
import jsPDF from "jspdf";
import "./HRLetter.css";

// Safe setAppElement
if (document.getElementById("root")) {
  Modal.setAppElement("#root");
} else {
  Modal.setAppElement(document.body);
}

const HRLetter = () => {
  const [docType, setDocType] = useState("addressProof");
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    joiningDate: "",
    leavingDate: "",
    salary: "",
    address: "",
    company: "Your Company Name",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const generateLetter = () => {
    switch (docType) {
      case "addressProof":
        return `To Whomsoever It May Concern,\n\nThis is to certify that ${employee.name}, residing at ${employee.address}, is an employee of ${employee.company}.\n\nSincerely,\nHR Department\n${employee.company}`;
      case "bonafide":
        return `To Whomsoever It May Concern,\n\nThis is to certify that ${employee.name} is a bonafide employee of ${employee.company} working as ${employee.position} since ${employee.joiningDate}.\n\nSincerely,\nHR Department\n${employee.company}`;
      case "experience":
        return `To Whomsoever It May Concern,\n\nThis is to certify that ${employee.name} was employed at ${employee.company} as ${employee.position} from ${employee.joiningDate} to ${employee.leavingDate} with a salary of ${employee.salary}.\n\nWe wish them all the best in their future endeavors.\n\nSincerely,\nHR Department\n${employee.company}`;
      default:
        return "";
    }
  };

  const handleGenerateClick = () => setIsModalOpen(true);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const lines = generateLetter().split("\n");
    let y = 20;
    lines.forEach((line) => {
      doc.text(line, 10, y);
      y += 7;
    });
    doc.save(`${employee.name}_HR_Letter.pdf`);
  };

  const Sidebar = () => (
    <div className="sidebar-existing">
      <h2>Menu</h2>
      <ul>
        <li>HR Letter</li>
        <li>Employee Management</li>
        <li>Attendance</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>
    </div>
  );

  return (
    <>
      <Topbar />
      <div className="dashboard-container-existing">
        <Sidebar />
        <div className="main-content-existing">
          <div className="hr-letter-container-existing">
            <h2>HR Document Generator</h2>

            <div className="form-group-existing">
              <label>Document Type</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="input-existing"
              >
                <option value="addressProof">Address Proof</option>
                <option value="bonafide">Bonafide Certificate</option>
                <option value="experience">Experience Letter</option>
              </select>
            </div>

            <div className="form-group-existing">
              <label>Employee Name</label>
              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                className="input-existing"
              />
            </div>

            <div className="form-group-existing">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleChange}
                className="input-existing"
              />
            </div>

            <div className="form-group-existing">
              <label>Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={employee.joiningDate}
                onChange={handleChange}
                className="input-existing"
              />
            </div>

            {docType === "experience" && (
              <>
                <div className="form-group-existing">
                  <label>Leaving Date</label>
                  <input
                    type="date"
                    name="leavingDate"
                    value={employee.leavingDate}
                    onChange={handleChange}
                    className="input-existing"
                  />
                </div>
                <div className="form-group-existing">
                  <label>Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    className="input-existing"
                  />
                </div>
              </>
            )}

            {docType === "addressProof" && (
              <div className="form-group-existing">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                  className="input-existing"
                />
              </div>
            )}

            <button className="button-existing" onClick={handleGenerateClick}>
              Generate Letter
            </button>

            {/* Modal */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="HR Letter Modal"
              className="modal-existing"
              overlayClassName="overlay-existing"
            >
              <h2>
                Generated {docType.replace(/([A-Z])/g, " $1")} Letter
              </h2>
              <pre className="modal-preview">{generateLetter()}</pre>
              <div className="modal-actions">
                <button
                  onClick={handleDownloadPDF}
                  className="button-existing"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="button-existing close-btn"
                >
                  Close
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default HRLetter;
