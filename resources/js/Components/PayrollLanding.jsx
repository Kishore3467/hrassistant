// resources/js/Components/PayrollLanding.jsx
import React from "react";
import "./PayrollLanding.css"; 
import PayrollManagement from "./PayrollManagement"; // ✅ Import correctly
import PayrollSystem from "./PayrollSystem";
import PayrollAccess from "./PayrollAccess";
import FAQComponent from "./FAQComponent";


const PayrollLanding = () => {
  return (
    <div className="payroll-landing">
      {/* Header Section */}
      <section className="hero">
        <h1>Payroll made easy, scalable, and compliant</h1>
        <p>
          Transform outdated payroll practices and build a better workplace for
          your business with Zoho Payroll.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Start My Free Trial</button>
          <button className="btn-outline">Request a demo</button>
        </div>
      </section>

      {/* Dashboard Mock Section */}
      <section className="dashboard-preview">
        {/* <div className="dashboard-left">
          <img
            src='./hr1.png'
            alt="Employer"
            className="employer-img"
          />
        </div> */}
        {/* <div className="dashboard-center">
          <div className="dashboard-box">
            <h3>Welcome Meera Krishnan!</h3>
            <p>
              <strong>Process Pay Run for May 2024:</strong>{" "}
              <span className="approved">Approved</span>
            </p>
            <div className="pay-summary">
              <p><b>Employees' Net Pay:</b> ₹17,25,23,654.00</p>
              <p><b>Payment Date:</b> 31 May 2024</p>
              <p><b>No. of Employees:</b> 1308</p>
            </div>
            <button className="btn-small">View Details</button>
          </div>
        </div> */}
        {/* <div className="dashboard-right">
          <div className="employee-portal">
            <h4>Hello! Kartik Kumar</h4>
            <p>Welcome to Zoho Payroll</p>
            <div className="countdown">03 : 43 : 44</div>
            <button className="btn-outline">Request Demo</button>
          </div>
        </div> */}
      </section>

      {/* ✅ Embed PayrollManagement System here */}
      
      <PayrollSystem/>
      <PayrollAccess/>
      <FAQComponent/>
      <section className="payroll-management-section">
        <PayrollManagement />
      </section>
    </div>
  );
};

export default PayrollLanding;
