import React, { useState, useEffect } from "react";
import "./CandidateOnboardingForm.css";

const initialState = {
  id: null,
  full_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  degree: "",
  university: "",
  graduation_year: "",
  job_title: "",
  years_of_exp: "",
  company: "",
  created_at: null
};

const CandidateOnboardingForm = ({ companyName, onSaved, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 3;

  useEffect(() => {
    // Generate a unique ID for this candidate
    setForm(prev => ({
      ...prev,
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      company: companyName,
      created_at: new Date().toISOString()
    }));
  }, [companyName]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('candidates') || '[]');
      const updatedData = [...existingData, form];
      localStorage.setItem('candidates', JSON.stringify(updatedData));
      
      // Set current user in localStorage
      localStorage.setItem('currentCandidate', JSON.stringify(form));
      
      // Success animation before closing
      setSubmitted(true);
      
      setTimeout(() => {
        onSaved?.();
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  // Render step 1 - Personal Information
  const renderStep1 = () => (
    <div className={`form-step ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
      <div className="step-header">
        <div className="step-indicator">
          {currentStep > 1 ? <i className="fas fa-check"></i> : "1"}
        </div>
        <h3>Personal Information</h3>
      </div>
      <div className="input-group">
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={onChange}
          required
          className="form-input"
        />
        <i className="input-icon fas fa-user"></i>
      </div>
      <div className="input-group">
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
          className="form-input"
        />
        <i className="input-icon fas fa-envelope"></i>
      </div>
      <div className="input-group">
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={onChange}
          className="form-input"
        />
        <i className="input-icon fas fa-phone"></i>
      </div>
    </div>
  );

  // Render step 2 - Address Information
  const renderStep2 = () => (
    <div className={`form-step ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
      <div className="step-header">
        <div className="step-indicator">
          {currentStep > 2 ? <i className="fas fa-check"></i> : "2"}
        </div>
        <h3>Address Information</h3>
      </div>
      <div className="input-group">
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={onChange}
          className="form-input"
        />
        <i className="input-icon fas fa-home"></i>
      </div>
      <div className="form-row">
        <div className="input-group">
          <input 
            name="city" 
            placeholder="City" 
            value={form.city} 
            onChange={onChange} 
            className="form-input" 
          />
          <i className="input-icon fas fa-city"></i>
        </div>
        <div className="input-group">
          <input 
            name="state" 
            placeholder="State" 
            value={form.state} 
            onChange={onChange} 
            className="form-input" 
          />
          <i className="input-icon fas fa-map-marker-alt"></i>
        </div>
      </div>
      <div className="input-group">
        <input 
          name="zip" 
          placeholder="Zip Code" 
          value={form.zip} 
          onChange={onChange} 
          className="form-input" 
        />
        <i className="input-icon fas fa-mail-bulk"></i>
      </div>
    </div>
  );

  // Render step 3 - Education & Employment
  const renderStep3 = () => (
    <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
      <div className="step-header">
        <div className="step-indicator">3</div>
        <h3>Education & Employment</h3>
      </div>
      <div className="form-row">
        <div className="input-group">
          <input 
            name="degree" 
            placeholder="Degree" 
            value={form.degree} 
            onChange={onChange} 
            className="form-input" 
          />
          <i className="input-icon fas fa-graduation-cap"></i>
        </div>
        <div className="input-group">
          <input 
            name="university" 
            placeholder="University" 
            value={form.university} 
            onChange={onChange} 
            className="form-input" 
          />
          <i className="input-icon fas fa-university"></i>
        </div>
      </div>
      <div className="input-group">
        <input 
          name="graduation_year" 
          placeholder="Graduation Year" 
          value={form.graduation_year} 
          onChange={onChange} 
          className="form-input" 
        />
        <i className="input-icon fas fa-calendar-alt"></i>
      </div>
      <div className="form-row">
        <div className="input-group">
          <input 
            name="job_title" 
            placeholder="Job Title" 
            value={form.job_title} 
            onChange={onChange} 
            className="form-input" 
          />
          <i className="input-icon fas fa-briefcase"></i>
        </div>
        <div className="input-group">
          <input 
            name="years_of_exp" 
            placeholder="Years of Experience" 
            type="number" 
            value={form.years_of_exp} 
            onChange={onChange} 
            className="form-input" 
          />
          <i className="input-icon fas fa-chart-line"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className={`onboarding-modal ${submitted ? 'success-animation' : ''}`}>
        <div className="modal-header">
          <h2>Onboard Employee – {companyName}</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="step-labels">
            <span className={currentStep >= 1 ? "active" : ""}>Personal</span>
            <span className={currentStep >= 2 ? "active" : ""}>Address</span>
            <span className={currentStep >= 3 ? "active" : ""}>Education</span>
          </div>
        </div>

        <form onSubmit={submit} className="onboarding-form">
          <div className="form-steps">
            {renderStep1()}
            {renderStep2()}
            {renderStep3()}
          </div>

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary">
                <i className="fas fa-arrow-left"></i> Back
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Next <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check"></i> Complete Onboarding
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className={`onboarding-success ${submitted ? 'animate' : ''}`}>
          <div className="success-checkmark">
            <div className="check-icon">
              <i className="fas fa-check"></i>
            </div>
          </div>
          <h3>Employee Onboarded Successfully!</h3>
        </div>
      </div>
    </div>
  );
};

export default CandidateOnboardingForm;