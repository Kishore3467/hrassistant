import React, { useState, useEffect } from 'react';

const Step3Experience = ({ formData, setFormData, nextStep, prevStep }) => {
  const [experienceList, setExperienceList] = useState([
    { company: '', role: '', years: '' }
  ]);

  // Load initial experience if available
  useEffect(() => {
    if (formData?.experience?.length) {
      setExperienceList(formData.experience);
    }
  }, []);

  const updateParentForm = (newList) => {
    setExperienceList(newList);
    setFormData(prev => ({
      ...prev,
      experience: newList
    }));
  };

  const handleChange = (index, e) => {
    const updatedList = [...experienceList];
    updatedList[index][e.target.name] = e.target.value;
    updateParentForm(updatedList);
  };

  const addExperience = () => {
    const newList = [...experienceList, { company: '', role: '', years: '' }];
    updateParentForm(newList);
  };

  const removeExperience = (index) => {
    const newList = experienceList.filter((_, i) => i !== index);
    updateParentForm(newList);
  };

  return (
    <div>
      <h2>Step 3: Work Experience</h2>
      {experienceList.map((exp, index) => (
        <div key={index}>
          <input
            type="text"
            name="company"
            value={exp.company}
            onChange={(e) => handleChange(index, e)}
            placeholder="Company"
          />
          <input
            type="text"
            name="role"
            value={exp.role}
            onChange={(e) => handleChange(index, e)}
            placeholder="Role"
          />
          <input
            type="text"
            name="years"
            value={exp.years}
            onChange={(e) => handleChange(index, e)}
            placeholder="Years"
          />
          {experienceList.length > 1 && (
            <button type="button" onClick={() => removeExperience(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addExperience}>Add Experience</button>
      <br />
      <button type="button" onClick={prevStep}>Back</button>
      <button type="button" onClick={nextStep}>Next</button>
    </div>
  );
};

export default Step3Experience;
