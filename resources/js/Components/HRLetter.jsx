import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [employeesList, setEmployeesList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Simulate fetching employee data
  useEffect(() => {
    const mockEmployees = [
      { id: 1, name: "John Doe", position: "Software Engineer", joiningDate: "2022-01-15" },
      { id: 2, name: "Jane Smith", position: "Product Manager", joiningDate: "2021-03-22" },
      { id: 3, name: "Robert Johnson", position: "UX Designer", joiningDate: "2020-11-05" },
    ];
    setEmployeesList(mockEmployees);
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleEmployeeSelect = (e) => {
    const empId = e.target.value;
    if (empId) {
      const selected = employeesList.find(emp => emp.id === parseInt(empId));
      setSelectedEmployee(selected);
      setEmployee({
        ...employee,
        name: selected.name,
        position: selected.position,
        joiningDate: selected.joiningDate
      });
    } else {
      setSelectedEmployee(null);
    }
  };

  const generateLetter = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    switch (docType) {
      case "addressProof":
        return `To Whom It May Concern,\n\nThis is to certify that Mr./Ms. ${employee.name}, residing at ${employee.address}, is a permanent employee of ${employee.company} since ${employee.joiningDate}.\n\nThis certificate is issued on ${currentDate} at the request of the employee for whatever legal purpose it may serve.\n\nSincerely,\nHR Department\n${employee.company}`;
      case "bonafide":
        return `To Whom It May Concern,\n\nThis is to certify that Mr./Ms. ${employee.name} is a bonafide employee of ${employee.company}. They are working with us as ${employee.position} since ${employee.joiningDate} and are currently employed with our organization.\n\nThis certificate is issued on ${currentDate} for whatever legal purpose it may serve.\n\nSincerely,\nHR Department\n${employee.company}`;
      case "experience":
        return `To Whom It May Concern,\n\nThis is to certify that Mr./Ms. ${employee.name} was employed at ${employee.company} as ${employee.position} from ${employee.joiningDate} to ${employee.leavingDate || "present"}.\n\nDuring their employment, they received a monthly salary of ${employee.salary} and performed their duties with dedication and professionalism.\n\nWe wish them continued success in their future endeavors.\n\nSincerely,\nHR Department\n${employee.company}\nDate: ${currentDate}`;
      default:
        return "";
    }
  };

  const handleGenerateClick = () => {
    setIsLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsModalOpen(true);
      setIsLoading(false);
    }, 800);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(44, 62, 80);
    doc.setFont(undefined, 'bold');
    doc.text(`${docType.charAt(0).toUpperCase() + docType.slice(1).replace(/([A-Z])/g, " $1")}`, 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    const lines = doc.splitTextToSize(generateLetter(), 180);
    doc.text(lines, 20, 40);
    
    doc.save(`${employee.name.replace(/\s+/g, '_')}_${docType}.pdf`);
  };

  const Sidebar = () => (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>HR Portal</h2>
      </div>
      <ul className="sidebar-menu">
        <li className="menu-item active">
          <i className="icon-document"></i>
          <span>Document Generator</span>
        </li>
        <li className="menu-item">
          <i className="icon-employee"></i>
          <span>Employee Management</span>
        </li>
        <li className="menu-item">
          <i className="icon-attendance"></i>
          <span>Attendance</span>
        </li>
        <li className="menu-item">
          <i className="icon-reports"></i>
          <span>Reports</span>
        </li>
        <li className="menu-item">
          <i className="icon-settings"></i>
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <Topbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <div className="content-header">
            <h1>HR Document Generator</h1>
            <p>Create professional HR documents for your employees</p>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2>Document Details</h2>
            </div>
            
            <div className="card-body">
              <div className="form-grid">
                <div className="form-group">
                  <label>Select Employee</label>
                  <select 
                    className="input-field"
                    onChange={handleEmployeeSelect}
                    value={selectedEmployee ? selectedEmployee.id : ""}
                  >
                    <option value="">Select an employee</option>
                    {employeesList.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} - {emp.position}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Document Type</label>
                  <div className="select-wrapper">
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="input-field"
                    >
                      <option value="addressProof">Address Proof</option>
                      <option value="bonafide">Bonafide Certificate</option>
                      <option value="experience">Experience Letter</option>
                    </select>
                    <i className="select-arrow"></i>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Employee Name</label>
                  <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter job position"
                  />
                </div>

                <div className="form-group">
                  <label>Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={employee.joiningDate}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                {docType === "experience" && (
                  <>
                    <div className="form-group">
                      <label>Leaving Date</label>
                      <input
                        type="date"
                        name="leavingDate"
                        value={employee.leavingDate}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div className="form-group">
                      <label>Salary</label>
                      <input
                        type="text"
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter salary details"
                      />
                    </div>
                  </>
                )}

                {docType === "addressProof" && (
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={employee.address}
                      onChange={handleChange}
                      className="input-field textarea"
                      placeholder="Enter complete address"
                      rows="3"
                    />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`} 
                  onClick={handleGenerateClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <i className="icon-generate"></i>
                      Generate Document
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="HR Letter Modal"
        className="modal"
        overlayClassName="overlay"
        closeTimeoutMS={300}
      >
        <div className="modal-header">
          <h2>
            {docType === "addressProof" && "Address Proof Letter"}
            {docType === "bonafide" && "Bonafide Certificate"}
            {docType === "experience" && "Experience Letter"}
          </h2>
          <button 
            className="modal-close"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>
        
        <div className="modal-body">
          <div className="document-preview">
            <div className="document-header">
              <div className="company-logo"></div>
              <div className="company-info">
                <h3>{employee.company}</h3>
                <p>123 Business Avenue, Suite 100</p>
                <p>New York, NY 10001</p>
                <p>Phone: (123) 456-7890</p>
              </div>
            </div>
            
            <div className="document-content">
              <pre>{generateLetter()}</pre>
            </div>
            
            <div className="document-footer">
              <div className="signature-area">
                <p>Authorized Signature</p>
                <div className="signature-line"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            onClick={handleDownloadPDF}
            className="btn btn-download"
          >
            <i className="icon-download"></i>
            Download PDF
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn btn-secondary"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default HRLetter;