import React from "react";

const Step7Setup = ({ prevStep, handleChange, values, handleSubmit }) => {
  const back = (e) => {
    e.preventDefault();
    prevStep();
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={submit}>
      <h2>Step 7: Email & Laptop Setup</h2>

      <div>
        <label>Company Email:</label>
        <input
          type="email"
          value={values.company_email}
          onChange={handleChange("company_email")}
          required
        />
      </div>

      <div>
        <label>Laptop Serial Number:</label>
        <input
          type="text"
          value={values.laptop_serial}
          onChange={handleChange("laptop_serial")}
          required
        />
      </div>

      <div>
        <label>Kit Status:</label>
        <select
          value={values.kit_status}
          onChange={handleChange("kit_status")}
          required
        >
          <option value="">Select Status</option>
          <option value="Provided">Provided</option>
          <option value="Pending">Pending</option>
          <option value="Not Applicable">Not Applicable</option>
        </select>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button type="button" onClick={back}>Back</button>
        <button type="submit" style={{ marginLeft: "10px" }}>Submit</button>
      </div>
    </form>
  );
};

export default Step7Setup;
