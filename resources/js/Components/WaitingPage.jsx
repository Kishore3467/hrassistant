import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WaitingPage = () => {
  const navigate = useNavigate();
  const employeeId = 1; // Example: logged-in employee (replace with real login)

  useEffect(() => {
    const checkApproval = () => {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const emp = employees.find((e) => e.id === employeeId);
      if (emp?.approved) {
        navigate("/employee-dashboard"); // redirect instantly
      }
    };

    // Check initially
    checkApproval();

    // Listen for changes in localStorage (HR approval event)
    window.addEventListener("storage", checkApproval);

    return () => {
      window.removeEventListener("storage", checkApproval);
    };
  }, [navigate, employeeId]);

  return (
    <div>
      <h2>Your account is waiting for HR approval...</h2>
    </div>
  );
};

export default WaitingPage;
