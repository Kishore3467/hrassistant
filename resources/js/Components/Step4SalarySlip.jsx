import React from "react";

const Step4SalarySlip = ({ nextStep, prevStep, handleFileChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form onSubmit={continueStep}>
      <h2>Step 4: Upload Salary Slip (Optional)</h2>

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      {values.salary_slip && (
        <p>Selected File: {values.salary_slip.name}</p>
      )}

      <button type="button" onClick={back}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step4SalarySlip;
