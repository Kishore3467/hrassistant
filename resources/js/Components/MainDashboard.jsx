import React, { useState, useEffect } from 'react';
import './MainDashboard.css';

const MainDashboard = () => {
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      
      // Set current date in the required format
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1>My Space</h1>
      </header>

      <section className="team-section">
        <h2>Team</h2>
        <div className="organization">
          <h3>Organization</h3>
          <div className="org-links">
            <span>Overview</span>
            <span>Dashboard</span>
            <span>Calendar</span>
            <span>Delegation</span>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="active-learning">
        <h3>Active Learning</h3>
        <div className="learning-card">
          <div className="ceo-section">
            <strong>Active Learning</strong>
            <div className="ceo-info">
              <span>Kishore P CEO</span>
              <span className="out-text">Out</span>
            </div>
            <div className="timer">{currentTime}</div>
          </div>

          <div className="check-in-section">
            <strong>Cineck-in</strong>
            <div className="google-checkins">
              <span>Google</span>
              <span>Google</span>
              <span>Google</span>
              <span>Google</span>
            </div>
          </div>
        </div>
      </section>

      <section className="reports">
        <h3>Reportses</h3>
        <div className="report-list">
          <div className="report-item">
            <span>S19 - Michael Johnson</span>
            <span className="status">Yet to check-in</span>
          </div>
          <div className="report-item">
            <span>S2 - Lilly Williams</span>
            <span className="status">Yet to check-in</span>
          </div>
          <div className="report-item">
            <span>S20 - Christopher Brown</span>
            <span className="status">Yet to check-in</span>
          </div>
        </div>
      </section>

      <section className="work-schedule">
        <h3>Work Schedule</h3>
        <div className="schedule-header">
          {currentDate} - 23-Aug-2025
        </div>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>General</th>
              <th>8:00 AM - 8:00 PM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sun 17 Weekend</td>
              <td>Mon 18 Absent</td>
              <td>Tue 19 Absent</td>
              <td>Wed 20 Absent</td>
              <td>Thu 21</td>
              <td>Fri 22</td>
              <td>Sat 23 Weekend</td>
            </tr>
          </tbody>
        </table>
      </section>

      <div className="time-log-alert">
        You are yet to submit your time logs today!
      </div>
    </div>
  );
};

export default MainDashboard;