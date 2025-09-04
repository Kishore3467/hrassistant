import React from "react";
import "./HomeOne.css";

export default function HomeOne() {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <h1>Overview</h1>
        <nav>
          <span>Dashboard</span>
          <span>Calendar</span>
          <span>Delegation</span>
        </nav>
      </header>

      {/* Main content grid */}
      <div className="grid">
        {/* Profile + Check-in */}
        <div className="card profile-card">
          <div className="avatar"></div>
          <h2>Kishore P</h2>
          <p className="role">CEO</p>
          <p className="leave">Leave</p>
          <div className="timer">00 : 00 : 00</div>
          <button className="checkin-btn">Check-in</button>
        </div>

        {/* Reportees */}
        <div className="card reportees-card">
          <h3>Reportees</h3>
          <ul>
            <li>
              <span>Michael Johnson</span>
              <span className="status">Yet to check-in</span>
            </li>
            <li>
              <span>Lilly Williams</span>
              <span className="status">Yet to check-in</span>
            </li>
            <li>
              <span>Christopher Brown</span>
              <span className="status">Yet to check-in</span>
            </li>
          </ul>
          <button className="more-btn">+1 More</button>
        </div>

        {/* Greeting */}
        <div className="card greeting-card">
          <div>
            <h2>Good Afternoon, Kishore P</h2>
            <p>Have a productive day!</p>
          </div>
          <div className="sun">☀️</div>
        </div>
      </div>

      {/* Work Schedule */}
      <div className="card work-card">
        <h3>Work Schedule</h3>
        <p className="date-range">24-Aug-2025 – 30-Aug-2025</p>
        <div className="schedule">
          <div className="day weekend">
            <span>Sun</span>
            <strong>24</strong>
            <small>Weekend</small>
          </div>
          <div className="day leave">
            <span>Mon</span>
            <strong>25</strong>
            <small>Casual Leave</small>
          </div>
          <div className="day">
            <span>Tue</span>
            <strong>26</strong>
          </div>
          <div className="day">
            <span>Wed</span>
            <strong>27</strong>
          </div>
          <div className="day">
            <span>Thu</span>
            <strong>28</strong>
          </div>
          <div className="day">
            <span>Fri</span>
            <strong>29</strong>
          </div>
          <div className="day weekend">
            <span>Sat</span>
            <strong>30</strong>
            <small>Weekend</small>
          </div>
        </div>
      </div>
    </div>
  );
}
