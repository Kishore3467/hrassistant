import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaChartLine,
  FaEnvelopeOpenText,
  FaArrowRight,
} from "react-icons/fa";

import "./CoreHR.css";
import { Link } from "react-router-dom";
import EmployeeScheduling from "./EmployeeScheduling"; 
import OrganizationModal from "./OrganizationModal";
import DashboardTemplate from "./DashboardTemplate";
import FAQ from "./Faq";
import MainDashboard from "./MainDashboard";

const services = [
  {
    id: 1,
    title: "Shift Timing",
    description:
      "View and manage your upcoming work shifts, schedules, and assignments.",
    icon: <FaCalendarAlt />,
    link: "/shifttiming",
  },
  {
    id: 2,
    title: "Performance",
    description:
      "Track your development goals, performance metrics, and progress reports.",
    icon: <FaChartLine />,
    link: "/performance",
  },
  {
    id: 3,
    title: "Request Leave",
    description:
      "Submit and manage your leave requests with quick approval tracking.",
    icon: <FaEnvelopeOpenText />,
    link: "/employeeportal",
  },
];

const EmployeeDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="corehr-wrapper">
      <header className="corehr-header">
        <h1>Employee Portal</h1>
        <p>
          Access your work schedule, performance tracking, and leave requests in one place.
        </p>
      </header>

      <section className="corehr-services">
        <div className="employee-scheduling-section">
          {/* <h1>Employee Scheduling Dashboard</h1> */}
          <EmployeeScheduling />
        </div>
        <OrganizationModal 
        />
        <DashboardTemplate/>
        <MainDashboard/>
        <FAQ />

        {services.map(({ id, title, description, icon, link }) => (
          <div key={id} className="corehr-card">
            <div className="corehr-icon">{icon}</div>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={link} className="try-now-link">
              <button className="corehr-btn">
                Explore <FaArrowRight />
              </button>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EmployeeDashboard;
