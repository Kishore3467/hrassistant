import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ServiceCard from "./ServiceCard";
import UserLicenseDashboard from "./UserLicenseDashboard";
import HomeOne from "./HomeOne"
import HrDashboard from "./HrDashboard";

export default function Dashboard() {
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
    { label: "Travel", to: "/travelrequest", icon: "⭐", color: "c-rose" },
    { label: "Tasks", to: "/taskdashboard", icon: "👜", color: "c-yellow" },
    
  ];

  const servicesRow3 = [
{ label: "General", to: "/generalannouncements", icon: "🏢", color: "c-amber" },
    { label: "Offboarding", to: "/offboarding", icon: "🚪", color: "c-red" },
    { label: "Marketplace", icon: "🛍️", color: "c-blue" },
    { label: "Developer Space", icon: "🧑‍💻", color: "c-orange" },
    { label: "Manage Accounts", icon: "👤", color: "c-amber" },
  ];

  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Topbar />
        <HrDashboard />
        {/* <HomeOne/> */}
        {/* <UserLicenseDashboard/> */}

        <section className="services-wrap">
          <h2 className="section-title">Services</h2>

          <div className="svc-grid">
            {servicesRow1.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>

          <div className="svc-grid">
            {servicesRow2.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>

          <div className="svc-grid narrow">
            {servicesRow3.map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
