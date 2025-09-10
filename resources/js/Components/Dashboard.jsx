import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ServiceCard from "./ServiceCard";
import UserLicenseDashboard from "./UserLicenseDashboard";
import HomeOne from "./HomeOne";
import HrDashboard from "./HrDashboard";
import "./HrDashboard.css";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("services");
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const servicesRow1 = [
    { label: "Onboarding", to: "/onboarding", icon: "🪪", color: "c-orange" },
    { label: "Employee Information", to: "/employee-info", icon: "🏢", color: "c-amber" },
    { label: "Leave Tracker", to:"/leavepolicy", icon: "🏖️", color: "c-sky" },
    { label: "Attendance", to: "/attendancesetting", icon: "🗓️", color: "c-orange" },
    { label: "Shifts", to: "/general", icon: "👥", color: "c-cyan" },
    { label: "Payroll", to: "/payrolldashboard", icon: "⏲️", color: "c-yellow" },
  ];

  const servicesRow2 = [
    { label: "Performance", to: "/employee-performance", icon: "🏆", color: "c-green" },
    { label: "Files", to: "/files", icon: "🗂️", color: "c-blue" },
    { label: "Employee Engagement", to: "/employee-engagement", icon: "🧩", color: "c-pink" },
    { label: "HR Letters", to: "/hrletter", icon: "⭐", color: "c-orange" },
    { label: "Travel", to: "/travelrequest", icon: "✈️", color: "c-rose" },
    { label: "Tasks", to: "/taskdashboard", icon: "👜", color: "c-yellow" },
  ];

  const servicesRow3 = [
    { label: "General", to: "/generalannouncements", icon: "📢", color: "c-amber" },
    { label: "Offboarding", to: "/offboarding", icon: "🚪", color: "c-red" },
  ];

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <main className="dashboard-content">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <div className="dashboard-view-toggle">
          <button 
            className={`toggle-btn ${activeView === "hr" ? "active" : ""}`}
            onClick={() => setActiveView("hr")}
          >
            <i className="fas fa-chart-pie"></i>
            HR Dashboard
          </button>
          <button 
            className={`toggle-btn ${activeView === "services" ? "active" : ""}`}
            onClick={() => setActiveView("services")}
          >
            <i className="fas fa-th-large"></i>
            Services
          </button>
        </div>

        {activeView === "hr" ? (
          <HrDashboard />
        ) : (
          <>
            <section className="dashboard-hero">
              <div className="hero-content">
                <h1>HR Management Portal</h1>
                <p>Access all your human resources tools in one place</p>
                <button className="cta-button">Get Started</button>
              </div>
              <div className="hero-visual">
                <div className="floating-elements">
                  <div className="floating-element el-1">👥</div>
                  <div className="floating-element el-2">📊</div>
                  <div className="floating-element el-3">📅</div>
                  <div className="floating-element el-4">📝</div>
                </div>
              </div>
            </section>

            <section className="services-wrap">
              <div className="section-header">
                <h2 className="section-title">HR Services</h2>
                <p className="section-subtitle">Manage all aspects of your workforce</p>
              </div>

              <div className="services-category">
                <h3 className="category-title">Core HR Functions</h3>
                <div className="svc-grid">
                  {servicesRow1.map((s, i) => (
                    <ServiceCard key={i} {...s} delay={i * 0.1} />
                  ))}
                </div>
              </div>

              <div className="services-category">
                <h3 className="category-title">Employee Management</h3>
                <div className="svc-grid">
                  {servicesRow2.map((s, i) => (
                    <ServiceCard key={i} {...s} delay={(i + 6) * 0.1} />
                  ))}
                </div>
              </div>

              <div className="services-category">
                <h3 className="category-title">Additional Services</h3>
                <div className="svc-grid narrow">
                  {servicesRow3.map((s, i) => (
                    <ServiceCard key={i} {...s} delay={(i + 12) * 0.1} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;