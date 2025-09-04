import React from "react";
import "./employeeProfileCard.css";

const EmployeeProfileCard = ({ currentUser }) => {
  if (!currentUser) return null;

  return (
    <div className="employee-profile-card">
      <img
        src={currentUser.profileImage || currentUser.companyLogo || "/default-profile.png"}
        alt={currentUser.name}
        className="employee-img"
      />
      <h2>{currentUser.name}</h2>
      <p>{currentUser.role}</p>
      <p>{currentUser.department || "Department not set"}</p>
      <p>Joined: {currentUser.joiningDate || "N/A"}</p>
      <p>Email: {currentUser.email}</p>
      <p>Company: {currentUser.companyId}</p>
    </div>
  );
};

export default EmployeeProfileCard;
