import React from "react";
import {
  FaUserCheck,
  FaFileSignature,
  FaChartLine,
  FaRobot,
  FaUsers,
  FaArrowRight,
  FaBriefcase,
  FaFileAlt,
  FaBullhorn, // Icon for AI Influencer Marketing
  FaMoneyCheckAlt // Icon for Payroll
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Features.css";
 
const featuresData = [
  {
    icon: <FaUserCheck />,
    title: "Hiring & Onboarding",
    description:
      "Streamline recruitment and new employee onboarding processes with automation and integrations.",
    link: "/onboarding",
  },
  {
    icon: <FaFileSignature />,
    title: "Offer Letter",
    description:
      "Generate, customize, and send offer letters quickly and securely to candidates.",
    link: "/offerlettergenerator",
  },
  {
    icon: <FaUsers />,
    title: "Core HR",
    description:
      "Manage employee data, organizational structure, and HR administration efficiently.",
    link: "/corehrlogin",
  },
  {
    icon: <FaChartLine />,
    title: "Performance & Development",
    description:
      "Track employee performance, set goals, and manage development plans effectively.",
    link: "/performancedevelopment",
  },
  {
    icon: <FaRobot />,
    title: "HR Chatbot",
    description:
      "Automate HR queries and support with an AI-powered chatbot available 24/7.",
    link: "/hrchatbot",
  },
  {
    icon: <FaBriefcase />,
    title: "Employee Portal",
    description:
      "Access personal details, submit leave requests, and track attendance in one place.",
    link: "/employeeportal",
  },
  {
    icon: <FaFileAlt />,
    title: "Policy Management",
    description:
      "Easily create, update, and share company policies with employees securely.",
    link: "/policy",
  },
  {
    icon: <FaBullhorn />,
    title: "AI Influencer Marketing",
    description:
      "Leverage AI to identify influencers, manage campaigns, and optimize marketing strategies.",
    link: "#",
  },
  {
    icon: <FaMoneyCheckAlt />,
    title: "Payroll Management",
    description:
      "Automate salary calculations, generate payslips, and manage employee compensation efficiently.",
    link: "/payrollmanagement",
  },
];
 
export default function Features() {
  return (
    <section className="features-section">
      <h1 className="features-title">Our Features</h1>
      <div className="features-grid">
        {featuresData.map(({ icon, title, description, link }, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{icon}</div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-description">{description}</p>
            <Link to={link} className="try-now-link">
              Explore Now <FaArrowRight className="arrow" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
 
 