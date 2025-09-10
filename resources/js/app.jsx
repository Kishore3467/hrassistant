import React, { useState } from "react";
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { EmployeeProvider } from "./EmployeeContext";


import "./Components/base.css";
import "./Components/layout.css";
import "./Components/sidebar.css";
import "./Components/topbar.css";
import "./Components/cards.css";
import Chatbot from "./Components/ChatBot";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Features from "./Components/Features";
import OfferLetterGenerator from "./Components/OfferLetterGenerator";
import WhatsAppAutoPopup from "./Components/WhatsAppAutoPopup";
import WhatsAppButton from "./Components/WhatsAppButton";
import Onboarding from "./Components/Onboarding";
import PolicyQA from "./Components/PolicyQA";
import CoreHRLogin from "./Components/CoreHRLogin";
import CoreHR from "./Components/CoreHR";
import AttendanceManagement from "./Components/AttendanceManagement";
import LeaveManagement from "./Components/LeaveManagement";
import EmployeePortal from "./Components/EmployeePortal";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import ShiftManagement from "./Components/ShiftManagement";
import ShiftTiming from "./Components/ShiftTiming";
import PerformanceLogin from "./Components/PerformanceLogin";
import Performance from "./Components/Performance";
import PerformanceDevelopment from "./Components/PerformanceDevelopment";
import PayrollManagement from "./Components/PayrollManagement";
import PolicyBot from "./Components/PolicyBot";
import EmployeeHandbookPolicy from "./Components/EmployeeHandbookPolicy";
import CodeOfConductPolicy from "./Components/CodeOfConductPolicy";
import PayrollLanding from "./Components/PayrollLanding";
import HeroSection from "./Components/HeroSection";
import HeroSectionOnboarding from "./Components/HeroSectionOnboarding";
import MainDashboard from "./Components/MainDashboard";
import Dashboard from "./Components/Dashboard";
import EmployeeInformation from "./Components/EmployeeInformation";
import AttendanceSettings from "./Components/AttendanceSettings";
import General from "./Components/General";
import LeavePolicy from "./Components/LeavePolicy";
import LeaveTracker from "./Components/LeaveTracker";
import HomeOne from "./Components/HomeOne";
import PayrollDashboard from "./Components/PayrollDashboard";
import TaskDashboard from "./Components/TaskDashboard";
import HRLetter from "./Components/HRLetter";
import TravelRequest from "./Components/TravelRequest";
import GeneralAnnouncements from "./Components/GeneralAnnouncements";
import Offboarding from "./Components/Offboarding";
import Files from "./Components/Files";
import EmployeeEngagement from "./Components/EmployeeEngagement";
import EmployeePerformance from "./Components/EmployeePerformance";
import EmployeeDashboard1 from "./Components/EmployeeDashboard1";
import WaitingPage from "./Components/WaitingPage";
import EmployeeLogin from "./Components/EmployeeLogin";
import AttendanceTracker from "./Components/AttendanceTracker";
import LeaveStatus from "./Components/LeaveStatus";
import EmployeeProfile from "./Components/EmployeeProfile";
import LoginModal from "./Components/LoginModal";

import { UserProvider } from "./UserContext";


function App() {
  const [showOfferLetterForm, setShowOfferLetterForm] = useState(false);

  // Helper function to check if employee is logged in
  const isLoggedIn = !!localStorage.getItem("currentEmployee");

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>HRCoPilot - AI HR Assistant</h1>
          <p>Your intelligent HR support chatbot</p>
        </header>
        
        <main className="app-main">
          {/* <Chatbot /> */}
        </main>
        
        <footer className="app-footer">
          <p>Powered by AI • HRCoPilot Project • 2024</p>
        </footer>
      </div>
      <Router>
        <Header />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/offerLetterGenerator" element={<OfferLetterGenerator />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/policy" element={<PolicyQA />} />
          <Route path="/corehrlogin" element={<CoreHRLogin />} />
          <Route path="/corehr" element={<CoreHR />} />
          <Route path="/attendancemanagement" element={<AttendanceManagement />} />
          <Route path="/leavemanagement" element={<LeaveManagement />} />
          <Route path="/employeeportal" element={<EmployeePortal />} />
          <Route path="/login" element={<EmployeeLogin />} />

          {/* Protected Employee Dashboard */}
          <Route
            path="/employee-dashboard1"
            element={isLoggedIn ? <EmployeeDashboard1 /> : <Navigate to="/login" />}
          />
          <Route
            path="/employeedashboard"
            element={isLoggedIn ? <EmployeeDashboard /> : <Navigate to="/login" />}
          />

          {/* Other routes */}
          <Route path="/shiftmanagement" element={<ShiftManagement />} />
          <Route path="/shifttiming" element={<ShiftTiming />} />
          <Route path="/performancelogin" element={<PerformanceLogin />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/performancedevelopment" element={<PerformanceDevelopment />} />
          <Route path="/payrollmanagement" element={<PayrollManagement />} />
          <Route path="/policybot" element={<PolicyBot />} />
          <Route path="/payrolllanding" element={<PayrollLanding />} />
          <Route path="/herosection" element={<HeroSection />} />
          <Route path="/employeehandbookpolicy" element={<EmployeeHandbookPolicy />} />
          <Route path="/codeofconductpolicy" element={<CodeOfConductPolicy />} />
          <Route path="/herosectiononboarding" element={<HeroSectionOnboarding />} />
          <Route path="/maindashboard" element={<MainDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-info" element={<EmployeeInformation />} />
          <Route path="/attendancesetting" element={<AttendanceSettings />} />
          <Route path="/general" element={<General />} />
          <Route path="/leavepolicy" element={<LeavePolicy />} />
          <Route path="/leave-tracker" element={<LeaveTracker />} />
          <Route path="/homeone" element={<HomeOne />} />
          <Route path="/payrolldashboard" element={<PayrollDashboard />} />
          <Route path="/taskdashboard" element={<TaskDashboard />} />
          <Route path="/hrletter" element={<HRLetter />} />
          <Route path="/travelrequest" element={<TravelRequest />} />
          <Route path="/generalannouncements" element={<GeneralAnnouncements />} />
          <Route path="/offboarding" element={<Offboarding />} />
          <Route path="/files" element={<Files />} />
          <Route path="/employee-engagement" element={<EmployeeEngagement />} />
          <Route path="/employee-performance" element={<EmployeePerformance />} />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/attendance-tracker" element={<AttendanceTracker />} />
          <Route path="/leave-status" element={<LeaveStatus />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          
   

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />

        {/* WhatsApp components */}
        {/* <WhatsAppButton
          phone="919876543210"
          message="Hi, I want to get in touch with you!"
        />
        <WhatsAppAutoPopup
          phone="919876543210"
          message="Hello! I want to get in touch with you."
          delay={3000}
        /> */}

        {/* Offer Letter popup */}
        {showOfferLetterForm && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button
                className="popup-close"
                onClick={() => setShowOfferLetterForm(false)}
              >
                ✖
              </button>
              <OfferLetterGenerator />
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>
);

export default App;
