// import { useState } from "react";
// import axios from "axios";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaBuilding,
//   FaCalendar,
//   FaCheckCircle,
// } from "react-icons/fa";
// import "./Onboarding.css";

// const steps = [
//   "Personal Information",
//   "Emergency Contact",
//   "Job Details",
//   "Education & Experience",
//   "Bank Details",
//   "Equipment & Kit",
//   "Review & Submit",
// ];

// const regionCodes = [
//   { code: "+1", name: "USA/Canada" },
//   { code: "+44", name: "UK" },
//   { code: "+91", name: "India" },
//   { code: "+61", name: "Australia" },
//   { code: "+81", name: "Japan" },
// ];

// const Onboarding = () => {
//   const [step, setStep] = useState(0);
//   const [phoneRegion, setPhoneRegion] = useState({
//     phone: "+91",
//     emergencyContactPhone: "+91",
//   });
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     dateOfBirth: "",
//     emergencyContactName: "",
//     emergencyContactPhone: "",
//     education: "",
//     experience: "",
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//     companyEmail: "",
//     laptopSerial: "",
//     kitStatus: "",
//     joiningDate: "",
//     department: "",
//     designation: "",
//     employeeId: "",
//     workLocation: "",
//     probationPeriod: "",
//     reportingManager: "",
//     additionalNotes: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleRegionChange = (e) => {
//     const { name, value } = e.target;
//     setPhoneRegion((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const nextStep = () => {
//     const fields = fieldGroups[step];

//     for (let field of fields) {
//       if (field.required) {
//         const value = formData[field.name];
//         if (!value || value.trim() === "") {
//           alert(
//             `Please fill the required field: ${field.placeholder
//               .replace("*", "")
//               .trim()}`
//           );
//           return;
//         }

//         if (field.type === "email") {
//           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           if (!emailRegex.test(value)) {
//             alert(`Please enter a valid email address.`);
//             return;
//           }
//         }

//         if (field.type === "tel") {
//           const phoneNumber = value.trim();
//           const phoneRegex = /^[0-9]{10}$/;
//           if (!phoneRegex.test(phoneNumber)) {
//             alert(
//               `Please enter a valid 10-digit phone number with digits only (no spaces or symbols).`
//             );
//             return;
//           }
//         }
//       }
//     }
//     setStep((prev) => prev + 1);
//   };

//   const prevStep = () => setStep((prev) => prev - 1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Combine region codes with phone numbers
//       const payload = {
//         ...formData,
//         phone: `${phoneRegion.phone} ${formData.phone}`,
//         emergencyContactPhone: `${phoneRegion.emergencyContactPhone} ${formData.emergencyContactPhone}`,
//       };

//       const res = await axios.post(
//         "http://127.0.0.1:8000/api/employee-onboarding",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("Form submitted successfully!");
//       setStep(0);
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         address: "",
//         dateOfBirth: "",
//         emergencyContactName: "",
//         emergencyContactPhone: "",
//         education: "",
//         experience: "",
//         bankName: "",
//         accountNumber: "",
//         ifscCode: "",
//         companyEmail: "",
//         laptopSerial: "",
//         kitStatus: "",
//         joiningDate: "",
//         department: "",
//         designation: "",
//         employeeId: "",
//         workLocation: "",
//         probationPeriod: "",
//         reportingManager: "",
//         additionalNotes: "",
//       });
//       setPhoneRegion({ phone: "+91", emergencyContactPhone: "+91" });
//     } catch (error) {
//       console.error("Error submitting form:", error.response?.data || error.message);
//       alert("Submission failed! Please try again.");
//     }
//   };

//   const fieldGroups = {
//     0: [
//       {
//         icon: <FaUser />,
//         type: "text",
//         name: "fullName",
//         placeholder: "Full Name *",
//         required: true,
//       },
//       {
//         icon: <FaEnvelope />,
//         type: "email",
//         name: "email",
//         placeholder: "Personal Email *",
//         required: true,
//       },
//       {
//         icon: <FaPhone />,
//         type: "tel",
//         name: "phone",
//         placeholder: "Phone Number *",
//         required: true,
//         isPhoneWithRegion: true,
//       },
//       {
//         icon: <FaCalendar />,
//         type: "date",
//         name: "dateOfBirth",
//         placeholder: "Date of Birth *",
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "textarea",
//         name: "address",
//         placeholder: "Permanent Address *",
//         rows: 3,
//         required: true,
//       },
//     ],
//     1: [
//       {
//         icon: <FaUser />,
//         type: "text",
//         name: "emergencyContactName",
//         placeholder: "Emergency Contact Name *",
//         required: true,
//       },
//       {
//         icon: <FaPhone />,
//         type: "tel",
//         name: "emergencyContactPhone",
//         placeholder: "Emergency Contact Phone *",
//         required: true,
//         isPhoneWithRegion: true,
//       },
//     ],
//     2: [
//       {
//         icon: <FaUser />,
//         type: "text",
//         name: "employeeId",
//         placeholder: "Employee ID *",
//         required: true,
//       },
//       {
//         icon: <FaCalendar />,
//         type: "date",
//         name: "joiningDate",
//         placeholder: "Joining Date *",
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "text",
//         name: "department",
//         placeholder: "Department *",
//         required: true,
//       },
//       {
//         icon: <FaUser />,
//         type: "text",
//         name: "designation",
//         placeholder: "Designation / Role *",
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "text",
//         name: "workLocation",
//         placeholder: "Work Location *",
//         required: true,
//       },
//       {
//         icon: <FaCalendar />,
//         type: "text",
//         name: "probationPeriod",
//         placeholder: "Probation Period *",
//         required: true,
//       },
//       {
//         icon: <FaUser />,
//         type: "text",
//         name: "reportingManager",
//         placeholder: "Reporting Manager *",
//         required: true,
//       },
//       {
//         icon: <FaEnvelope />,
//         type: "textarea",
//         name: "additionalNotes",
//         placeholder: "Additional Notes *",
//         rows: 3,
//         required: true,
//       },
//     ],
//     3: [
//       {
//         icon: <FaBuilding />,
//         type: "textarea",
//         name: "education",
//         placeholder: "Education Details *",
//         rows: 3,
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "textarea",
//         name: "experience",
//         placeholder: "Work Experience Summary *",
//         rows: 3,
//         required: true,
//       },
//     ],
//     4: [
//       {
//         icon: <FaBuilding />,
//         type: "text",
//         name: "bankName",
//         placeholder: "Bank Name *",
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "text",
//         name: "accountNumber",
//         placeholder: "Account Number *",
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "text",
//         name: "ifscCode",
//         placeholder: "IFSC Code *",
//         required: true,
//       },
//     ],
//     5: [
//       {
//         icon: <FaEnvelope />,
//         type: "email",
//         name: "companyEmail",
//         placeholder: "Company Email *",
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "text",
//         name: "laptopSerial",
//         placeholder: "Laptop Serial Number *",
//         required: true,
//       },
//       {
//         icon: <FaBuilding />,
//         type: "text",
//         name: "kitStatus",
//         placeholder: "Kit Status *",
//         required: true,
//       },
//     ],
//     6: [],
//   };

//   const formatLabel = (key) => {
//     const result = key.replace(/([A-Z])/g, " $1");
//     return result.charAt(0).toUpperCase() + result.slice(1);
//   };

//   return (
//     <div className="ob-wrapper">
//       {/* Left info section */}
//       <div className="ob-info-section">
//         <h1 className="ob-title">Welcome to HR Copilot</h1>
//         <p className="ob-description">
//           Let’s get you set up quickly and smoothly. Please complete each step
//           of the onboarding process.
//         </p>
//         <ul className="ob-feature-list">
//           <li>
//             <FaCheckCircle className="ob-check-icon" /> Simple & clear steps
//           </li>
//           <li>
//             <FaCheckCircle className="ob-check-icon" /> Secure data entry
//           </li>
//           <li>
//             <FaCheckCircle className="ob-check-icon" /> Fast & responsive
//             interface
//           </li>
//         </ul>
//       </div>

//       {/* Right form section */}
//       <div className="ob-form-card">
//         <h2 className="ob-step-title">{steps[step]}</h2>
//         <form onSubmit={handleSubmit} className="ob-form">
//           <fieldset className="ob-fieldset">
//             <div className="ob-form-row">
//               {step < steps.length - 1
//                 ? fieldGroups[step].map((field, i) => {
//                     if (field.isPhoneWithRegion) {
//                       return (
//                         <div
//                           key={i}
//                           className="ob-input-with-icon ob-phone-with-region"
//                         >
//                           {field.icon && (
//                             <span className="ob-icon">{field.icon}</span>
//                           )}

//                           <select
//                             name={field.name}
//                             value={phoneRegion[field.name]}
//                             onChange={handleRegionChange}
//                             className="ob-phone-region-select"
//                           >
//                             {regionCodes.map(({ code, name }) => (
//                               <option key={code} value={code}>
//                                 {code} ({name})
//                               </option>
//                             ))}
//                           </select>

//                           <input
//                             type="tel"
//                             name={field.name}
//                             value={formData[field.name]}
//                             onChange={handleChange}
//                             placeholder={field.placeholder}
//                             required={field.required || false}
//                             className="ob-input ob-phone-input"
//                           />
//                         </div>
//                       );
//                     }

//                     return field.type === "textarea" ? (
//                       <textarea
//                         key={i}
//                         name={field.name}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         placeholder={field.placeholder}
//                         rows={field.rows}
//                         required={field.required || false}
//                         className="ob-textarea"
//                       />
//                     ) : (
//                       <div key={i} className="ob-input-with-icon">
//                         {field.icon && (
//                           <span className="ob-icon">{field.icon}</span>
//                         )}
//                         <input
//                           type={field.type}
//                           name={field.name}
//                           value={formData[field.name]}
//                           onChange={handleChange}
//                           placeholder={field.placeholder}
//                           required={field.required || false}
//                           className="ob-input"
//                         />
//                       </div>
//                     );
//                   })
//                 : (
//                   <div className="ob-review-table-container">
//                     <table className="ob-review-table">
//                       <thead>
//                         <tr>
//                           <th>Field</th>
//                           <th>Value</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {Object.entries(formData).map(([key, value]) => (
//                           <tr key={key}>
//                             <td>{formatLabel(key)}</td>
//                             <td>
//                               {key === "phone"
//                                 ? `${phoneRegion.phone} ${value}`
//                                 : key === "emergencyContactPhone"
//                                 ? `${phoneRegion.emergencyContactPhone} ${value}`
//                                 : value || <i>No data</i>}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//             </div>
//           </fieldset>

//           <div className="ob-form-navigation">
//             {step > 0 && (
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="ob-btn ob-btn-back"
//               >
//                 Back
//               </button>
//             )}
//             {step < steps.length - 1 && (
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="ob-btn ob-btn-next"
//               >
//                 Next
//               </button>
//             )}
//             {step === steps.length - 1 && (
//               <button type="submit" className="ob-btn ob-btn-submit">
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Onboarding;

// Inside Onboarding.jsx
import React, { useState, useEffect } from "react";
import "./onboarding.css";
import CandidateOnboardingForm from "./CandidateOnboardingForm";
import Topbar from "./Topbar";
import api from "../api"; // your API instance

function Onboarding() {
  const [activeTab, setActiveTab] = useState("Configuration");
  const [activeSidebar, setActiveSidebar] = useState("Candidate Onboarding");
  const [submittedCandidates, setSubmittedCandidates] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user and candidates on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      refreshCandidates(user.name);
    }
  }, []);

  // Fetch candidates from backend
  const refreshCandidates = async (companyName = currentUser?.name) => {
  if (!companyName) return;

  try {
    const res = await api.get("/onboardings", {
      params: { company: companyName },
    });

    // normalize response to always be an array
    const candidates = Array.isArray(res.data) ? res.data : res.data?.data || [];
    setSubmittedCandidates(candidates);
  } catch (err) {
    console.error(err);
    setSubmittedCandidates([]);
    alert("Failed to load candidates");
  }
};


  // Search functionality
  const handleSearch = (query) => {
    if (!query) return setSearchResult("");
    const q = query.toLowerCase();
    if (["candidate", "employee"].some((item) => item.includes(q))) {
      setActiveTab("Configuration");
      setActiveSidebar(
        q.includes("candidate") ? "Candidate Onboarding" : "Employee Onboarding"
      );
      setSearchResult(`Found result for "${query}"`);
    } else if (["service", "extend"].some((item) => item.includes(q))) {
      setActiveTab("Extend Service");
      setSearchResult(`Found result for "${query}"`);
    } else if (["permission"].some((item) => item.includes(q))) {
      setActiveTab("Permissions");
      setSearchResult(`Found result for "${query}"`);
    } else if (["automation"].some((item) => item.includes(q))) {
      setActiveTab("Automation");
      setSearchResult(`Found result for "${query}"`);
    } else {
      setSearchResult(`No results found for "${query}"`);
    }
  };

  // Render sidebar content
  const renderSidebarContent = () => {
    if (activeSidebar === "Candidate Onboarding") {
      return (
        <CandidateOnboardingForm
          companyName={currentUser?.name || ""}
          onSaved={refreshCandidates} // refresh employee list after save
        />
      );
    } else if (activeSidebar === "Employee Onboarding") {
      return (
        <div className="toggle-box">
          <h4>Submitted Candidates</h4>
          {submittedCandidates.length > 0 ? (
           <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Company</th>
      <th>Job Title</th>
    </tr>
  </thead>
  <tbody>
    {submittedCandidates.map((c, idx) => (
      <tr key={idx}>
        <td>{c.full_name}</td>
        <td>{c.email}</td>
        <td>{c.phone}</td>
        <td>{c.company?.name || c.company}</td>  {/* <-- Fix */}
        <td>{c.job_title}</td>
      </tr>
    ))}
  </tbody>
</table>

          ) : (
            <p>No candidates submitted yet.</p>
          )}
        </div>
      );
    }
  };

  // Render main content based on tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Configuration":
        return (
          <>
            <h3>Manage onboarding flows</h3>
            {renderSidebarContent()}
          </>
        );
      case "Extend Service":
        return <h3>Extend Service Page Content</h3>;
      case "Permissions":
        return <h3>Permissions Page Content</h3>;
      case "Automation":
        return <h3>Automation Page Content</h3>;
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-page">
      <Topbar onSearch={handleSearch} />
      {searchResult && <div className="search-result">{searchResult}</div>}

      <header className="onboarding-header">
        <h2>Onboarding</h2>
        <nav className="tabs">
          {["Configuration", "Extend Service", "Permissions", "Automation"].map(
            (tab) => (
              <span
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </span>
            )
          )}
        </nav>
      </header>

      <div className="onboarding-content">
        {activeTab === "Configuration" && (
          <aside className="sidebar">
            <p className="sidebar-title">Preferences</p>
           <ul>
  {["Candidate Onboarding", "Employee Onboarding"].map((item) => (
    <li
      key={item}
      className={activeSidebar === item ? "active" : ""}
      onClick={() => {
        setActiveSidebar(item);
        if (item === "Employee Onboarding") refreshCandidates();
      }}
    >
      {item}
    </li>
  ))}
</ul>

          </aside>
        )}

        <main className="main-panel">{renderTabContent()}</main>
      </div>
    </div>
  );
}

export default Onboarding;
