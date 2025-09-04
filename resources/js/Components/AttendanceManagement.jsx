import React, { useState, useEffect } from "react";
import "./AttendanceManagement.css";

const AttendanceManagement = ({ currentHR }) => {
  const [attendance, setAttendance] = useState([]);

  // Load attendance from localStorage filtered by current HR's company
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("attendance") || "[]");

    if (currentHR) {
      const companyData = savedData.filter(
        (record) => record.companyId === currentHR.companyId
      );
      setAttendance(companyData);
    } else {
      setAttendance([]);
    }
  }, [currentHR]);

  // Function to generate Google Maps link
  const getMapsLink = (loc) =>
    loc ? `https://www.google.com/maps?q=${loc.lat},${loc.lng}` : null;

  return (
    <div className="attendance-container">
      <h2 className="title">
        Attendance Records - {currentHR?.companyName || "Company"}
      </h2>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Punch In</th>
            <th>Punch In Location</th>
            <th>Punch Out</th>
            <th>Punch Out Location</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length ? (
            attendance.map((record) => (
              <tr key={record.id}>
                <td>{record.name}</td>
                <td>{record.punchIn}</td>
                <td>
                  {record.punchInLocation ? (
                    <a
                      href={getMapsLink(record.punchInLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{record.punchOut || "Not Punched Out"}</td>
                <td>
                  {record.punchOutLocation ? (
                    <a
                      href={getMapsLink(record.punchOutLocation)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No attendance records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceManagement;
