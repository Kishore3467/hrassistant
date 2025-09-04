import React from "react";

const Step1PersonalDetails = ({ nextStep, handleChange, values }) => {
  const continueStep = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={continueStep}>
      <h2>Step 1: Personal Details</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange("name")}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange("email")}
        required
      />

      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        value={values.phone}
        onChange={handleChange("phone")}
        required
      />

      <label>Address:</label>
      <textarea
        name="address"
        value={values.address}
        onChange={handleChange("address")}
        required
      />

      <button type="submit">Next</button>
    </form>
  );
};

export default Step1PersonalDetails;
