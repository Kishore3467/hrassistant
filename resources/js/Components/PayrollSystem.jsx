// resources/js/Components/PayrollSystem.jsx
import React from "react";
import "./PayrollSystem.css";

const PayrollSystem = () => {
  return (
    <div className="payroll-system">
      {/* Left Side - Employer */}
      <div className="left-column">
        <div className="card image-card">
          <img src="./hr3.jpg" alt="Employer" />
          <div className="caption">Employer</div>
        </div>

        <div className="card">
          <ul>
            <li>✔ Create Pay Run</li>
            <li>✔ Approve Payroll</li>
            <li>✔ Record Payments</li>
            <li>✔ Send Payslip</li>
          </ul>
        </div>
      </div>

      {/* Center - Dashboard */}
      <div className="center-column">
        <h2>Welcome Meera Krishnan!</h2>

        <div className="card">
          <p>
            <b>Process Pay Run for May 2024:</b>{" "}
            <span className="status approved">Approved</span>
          </p>
          <div className="grid-3">
            <div>
              <p className="label">Employees’ Net Pay</p>
              <p>₹17,25,23,654.00</p>
            </div>
            <div>
              <p className="label">Payment Date</p>
              <p>31 May 2024</p>
            </div>
            <div>
              <p className="label">No. of Employees</p>
              <p>1308</p>
            </div>
          </div>
        </div>

        <div className="grid-3">
          <div className="card small">
            <p className="label">EPF</p>
            <p>₹39,73,913.00</p>
          </div>
          <div className="card small">
            <p className="label">ESI</p>
            <p>₹91,010.00</p>
          </div>
          <div className="card small">
            <p className="label">TDS Deduction</p>
            <p>₹1,15,89,089.00</p>
          </div>
        </div>

        <div className="card">
          <p className="label">Payroll Cost Summary</p>
          <img className="payroll1"
            src="./payroll.webp"
            alt="Payroll Chart"
          />
        </div>
      </div>

      {/* Right Side - Employee Portal */}
      <div className="right-column">
        <div className="card">
          <h3>Employee self-service portal</h3>
          <div className="employee-box">
            <p className="bold">Hello! Kartik Kumar</p>
            <p className="muted">Welcome to Zoho Payroll</p>
            <div className="timer">03 : 43 : 44</div>
            <button className="btn-primary">Check Out</button>
          </div>
          <div className="button-grid">
            <button>Salary</button>
            <button>Payslip</button>
            <button>Earnings</button>
            <button>Benefits</button>
          </div>
        </div>

        <div className="card image-card">
          <img src="./payroll1.jpg" alt="Employee Mobile" />
          <div className="caption">Employee</div>
        </div>
      </div>
    </div>
  );
};

export default PayrollSystem;
