import React, { useState, useRef } from "react";
import "./FAQComponent.css";

const faqs = [
  {
    question: "What is payroll?",
    answer:
      "Payroll is the process of calculating and distributing salaries or wages to employees, including deductions, taxes, and benefits.",
  },
  {
    question: "How often is payroll processed?",
    answer:
      "Payroll can be processed weekly, bi-weekly, semi-monthly, or monthly, depending on the company's payroll schedule.",
  },
  {
    question: "How do I access my payslip?",
    answer:
      "Employees can access their payslips through the company’s payroll portal, either via web or mobile app, using their secure login credentials.",
  },
  {
    question: "What deductions are included in my salary?",
    answer:
      "Common deductions include income tax, social security contributions, retirement fund contributions, insurance premiums, and any company-specific deductions.",
  },
  {
    question: "How are taxes calculated on my salary?",
    answer:
      "Taxes are calculated based on your salary, tax brackets, exemptions, and any applicable deductions as per the government rules.",
  },
  {
    question: "Can I download previous payslips?",
    answer:
      "Yes, most payroll systems allow you to download and print previous payslips directly from the employee portal.",
  },
  {
    question: "How do I update my bank account for salary deposits?",
    answer:
      "You can update your bank details in the payroll portal or contact the HR department to ensure your salary is deposited correctly.",
  },
  {
    question: "What should I do if I notice an error in my payslip?",
    answer:
      "If you find an error, report it immediately to the payroll or HR department. They will verify and correct the discrepancy in the next payroll cycle.",
  },
  {
    question: "How do I receive notifications for payroll updates?",
    answer:
      "Many portals offer instant notifications via email or app alerts when payroll is processed or when payslips are released.",
  },
  {
    question: "What is Form 16 and how can I access it?",
    answer:
      "Form 16 is a certificate of tax deducted at source (TDS) issued by the employer. Employees can download it from the payroll portal for filing income tax returns.",
  },
  {
    question: "Can I access payroll from my mobile device?",
    answer:
      "Yes, modern payroll systems provide mobile apps for employees to view payslips, tax forms, and updates anytime, anywhere.",
  },
  {
    question: "Who do I contact for payroll queries?",
    answer:
      "For any questions, contact your HR or payroll department. Most portals also have a support/helpdesk option for instant assistance.",
  },
];

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-left">
        <h2 className="faq-title">Payroll FAQs</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
            </div>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="faq-answer"
              style={{
                maxHeight:
                  activeIndex === index
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
                opacity: activeIndex === index ? 1 : 0,
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-right">
        <img src="./faq1.png" alt="FAQ Illustration" />
      </div>
    </div>
  );
};


export default FAQComponent;
