import React from "react";
import {
  FaMoneyCheckAlt,
  FaUsers,
  FaClock,
  FaFileAlt,
  FaChartLine,
  FaUserCog,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "./KeyFeatures.css";

export default function KeyFeatures() {
  const features = [
    {
      icon: <FaMoneyCheckAlt />,
      title: "Automated Payroll & Compliance",
      desc: "Save valuable time with AI-powered payroll automation while ensuring accuracy and compliance with labor laws.",
    },
    {
      icon: <FaUsers />,
      title: "Employee Onboarding & Exit Management",
      desc: "Simplify hiring and offboarding with digital workflows, making employee transitions smooth and efficient.",
    },
    {
      icon: <FaClock />,
      title: "Smart Leave & Attendance Tracking",
      desc: "Eliminate manual tracking with intelligent leave requests, shift scheduling, and real-time attendance insights.",
    },
    {
      icon: <FaFileAlt />,
      title: "AI-Powered HR Policies & Documentation",
      desc: "Instantly generate, customize, and manage HR policies, letters, and compliance documents with ease.",
    },
    {
      icon: <FaChartLine />,
      title: "Performance Reviews & Feedback",
      desc: "Empower managers with AI-driven performance insights, enabling transparent reviews and timely feedback.",
    },
    {
      icon: <FaUserCog />,
      title: "Employee Self-Service Portal",
      desc: "Enable employees to access payslips, submit leave requests, and resolve HR queries 24/7 via a self-service hub.",
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Key Features
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          HR Copilot brings together automation, intelligence, and employee-first
          design to make HR effortless and efficient.
        </motion.p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              className="feature-card"
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="icon-wrap">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
