import React from "react";
import {
  FaClock,
  FaCalendarAlt,
  FaUsersCog,
  FaArrowRight,
} from "react-icons/fa";
 
import "./CoreHR.css";
 
import { Link } from "react-router-dom";
const services = [
  {
    id: 1,
    title: "Attendance Management",
    description:
      "Track employee attendance with real-time monitoring, automated reports, and analytics.",
    icon: <FaClock />,
    link: "/attendancesetting",
  },
  {
    id: 2,
    title: "Leave Management (Time Off)",
    description:
      "Manage leave requests, approvals, and balances easily with our intuitive time off system.",
    icon: <FaCalendarAlt />,
    link: "/leavemanagement",
  },
  {
    id: 3,
    title: "Shift Management",
    description:
      "Create, edit, and assign employee shifts, ensuring smooth operations and proper coverage.",
    icon: <FaUsersCog />,
    link: "/shiftmanagement",
  },
];
 
const CoreHR = () => {
  return (
    <div className="corehr-wrapper">
      <header className="corehr-header">
        <h1>CoreHR Services</h1>
        <p>
          Streamline your human resources operations by managing attendance,
          leave, and shifts efficiently.
        </p>
      </header>
 
      <section className="corehr-services">
        {services.map(({ id, title, description, icon, link }) => (
          <div key={id} className="corehr-card">
            <div className="corehr-icon">{icon}</div>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={link} className="try-now-link"><button className="corehr-btn">
              Explore <FaArrowRight />
            </button></Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CoreHR;