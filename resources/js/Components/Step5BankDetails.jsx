import React from "react";

const Step5BankDetails = ({ nextStep, prevStep, handleChange, values }) => {
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
      <h2>Step 5: Bank Details</h2>

      <label>Bank Name:</label>
      <input
        type="text"
        value={values.bank_name}
        onChange={handleChange("bank_name")}
      />

      <label>Account Number:</label>
      <input
        type="text"
        value={values.account_number}
        onChange={handleChange("account_number")}
      />

      <label>IFSC Code:</label>
      <input
        type="text"
        value={values.ifsc_code}
        onChange={handleChange("ifsc_code")}
      />

      <button type="button" onClick={back}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step5BankDetails;
