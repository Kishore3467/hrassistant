import React, { useState, useEffect } from "react";
import "./PayrollAccess.css";

const PayrollAccess = () => {
  const tabs = ["Web and Mobile app", "Instant Payslips", "Digitisation", "Communication"];

  const cards = [
    {
      title: "Make payroll data accessible anywhere",
      desc: "Let employees download payslip, tax worksheets, and Form 16s at their convenience, using their web app and mobile, instantly.",
      img: "./mobileapp.png",
      bg: "yellow-card",
    },
    {
      title: "Notify as soon as payroll is processed",
      desc: "Automatically send salary notifications when payroll is processed and when you release payslips to employees.",
      img: "./notify.png",
      bg: "white-card",
    },
    {
      title: "Go Paperless with Digitisation",
      desc: "Manage all employee payroll documents digitally, avoiding the hassle of paperwork.",
      img: "./digit.webp",
      bg: "yellow-card",
    },
    {
      title: "Better Communication with Employees",
      desc: "Send instant messages, updates, and announcements within the payroll portal.",
      img: "./communicate.webp",
      bg: "white-card",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="employee-portal">
      {/* Heading */}
      <div className="header">
        <p className="subtitle">INTUITIVE EMPLOYEE PORTAL</p>
        <h1 className="title">
          Self-service tools you and your employees will love
        </h1>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="carousel">
        <button className="arrow left-arrow" onClick={prevSlide}>
          &#10094;
        </button>

        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div key={index} className={`card ${card.bg}`}>
              <div className="card-content">
                <div className="text-section">
                  <h2>{card.title}</h2>
                  <p>{card.desc}</p>
                </div>
                <div className="image-section">
                  <img src={card.img} alt={card.title} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow right-arrow" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="dots">
        {cards.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${currentIndex === idx ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PayrollAccess;
