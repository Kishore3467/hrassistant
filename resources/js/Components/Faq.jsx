import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is attendance management?",
      answer: "Attendance management is the process of monitoring and tracking employee attendance, including clock-ins, clock-outs, breaks, leaves, and absences. It helps organizations maintain accurate records of working hours for payroll, compliance, and productivity analysis."
    },
    {
      question: "Why is an attendance management system important for every organization?",
      answer: "An attendance management system is crucial because it automates time tracking, reduces manual errors, ensures compliance with labor regulations, streamlines payroll processing, provides insights into workforce productivity, and helps manage leaves and absences effectively."
    },
    {
      question: "What is an attendance management system?",
      answer: "An attendance management system is a software solution that helps organizations track and manage employee attendance data. It typically includes features like time tracking, leave management, overtime calculation, reporting, and integration with payroll systems."
    },
    {
      question: "How does Zoho People's attendance management software help every organization?",
      answer: "Zoho People's attendance management software helps organizations by providing automated time tracking, flexible shift scheduling, geolocation-based clock-ins, real-time attendance reports, seamless payroll integration, and mobile accessibility, making attendance management efficient and accurate."
    },
    {
      question: "Does Zoho People have a mobile app for attendance management?",
      answer: "Yes, Zoho People offers a mobile app that allows employees to clock in and out, apply for leaves, view their attendance history, and receive notifications. Managers can approve requests and monitor team attendance on the go through the mobile app."
    }
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
            >
              <span className="question-number">{index + 1}.</span>
              {faq.question}
              <span className="faq-icon">
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;