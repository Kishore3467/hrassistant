import React from "react";

const Step6Terms = ({ nextStep, prevStep, handleChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    if (!values.agreed) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
    }
    nextStep();
  };

  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form onSubmit={continueStep}>
      <h2>Step 6: Terms & Conditions</h2>

      <div style={{ maxHeight: "150px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
        <p><strong>Terms and Conditions:</strong></p>
        <p>
          1. You agree to abide by all company policies.<br />
          2. Any false information may result in disqualification.<br />
          3. Company assets provided must be returned upon exit.<br />
          4. Confidential information should not be shared externally.<br />
          5. You will follow all code of conduct rules outlined in your employment letter.
        </p>
      </div>

      <label>
        <input
          type="checkbox"
          checked={values.agreed}
          onChange={handleChange("agreed")}
        />
        &nbsp;I agree to the Terms & Conditions
      </label>

      <div style={{ marginTop: "20px" }}>
        <button type="button" onClick={back}>Back</button>
        <button type="submit" style={{ marginLeft: "10px" }}>Next</button>
      </div>
    </form>
  );
};

export default Step6Terms;
