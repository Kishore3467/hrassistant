import React, { useState, useEffect } from 'react';

const Step2Education = ({ formData, setFormData, nextStep, prevStep }) => {
  const [educationList, setEducationList] = useState([
    { degree: '', university: '', year: '' }
  ]);

  // Load initial data from formData if available
  useEffect(() => {
    if (formData?.education?.length) {
      setEducationList(formData.education);
    }
  }, []); // ← only run on mount

  // Update parent formData when any change occurs
  const updateParentForm = (newList) => {
    setEducationList(newList);
    setFormData(prev => ({
      ...prev,
      education: newList
    }));
  };

  const handleChange = (index, event) => {
    const updatedList = [...educationList];
    updatedList[index][event.target.name] = event.target.value;
    updateParentForm(updatedList);
  };

  const addEducation = () => {
    const newList = [...educationList, { degree: '', university: '', year: '' }];
    updateParentForm(newList);
  };

  const removeEducation = (index) => {
    const newList = educationList.filter((_, i) => i !== index);
    updateParentForm(newList);
  };

  return (
    <div>
      <h2>Step 2: Education Details</h2>
      {educationList.map((edu, index) => (
        <div key={index}>
          <input
            type="text"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleChange(index, e)}
            placeholder="Degree"
          />
          <input
            type="text"
            name="university"
            value={edu.university}
            onChange={(e) => handleChange(index, e)}
            placeholder="University"
          />
          <input
            type="text"
            name="year"
            value={edu.year}
            onChange={(e) => handleChange(index, e)}
            placeholder="Year"
          />
          {educationList.length > 1 && (
            <button type="button" onClick={() => removeEducation(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addEducation}>Add Education</button>
      <br />
      <button type="button" onClick={prevStep}>Back</button>
      <button type="button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step2Education;
