import React from "react";
import { Link } from "react-router-dom"; // use this if you use React Router
import "./Dashboard.css";

export default function ServiceCard({ label, icon, background, to }) {
  return (
    <Link
      to={to}
      className="service-card"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="icon">{icon}</div>
      <div className="label">{label}</div>
    </Link>
  );
}
