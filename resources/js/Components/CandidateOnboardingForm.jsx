import React, { useState } from "react";
import api from "../api";

const initialState = {
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
};

const CandidateOnboardingForm = ({ companyName, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialState);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/onboardings", {
        ...form,
        company: companyName,
      });

      alert("✅ Saved!");
      setForm(initialState);

      onSaved?.(); // refresh employee onboarding
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 520 }}>
      <h2>Onboard Employee – {companyName}</h2>
      <input
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={onChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={onChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={onChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={onChange}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <input name="city" placeholder="City" value={form.city} onChange={onChange} />
        <input name="state" placeholder="State" value={form.state} onChange={onChange} />
        <input name="zip" placeholder="Zip" value={form.zip} onChange={onChange} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <input name="degree" placeholder="Degree" value={form.degree} onChange={onChange} />
        <input
          name="university"
          placeholder="University"
          value={form.university}
          onChange={onChange}
        />
      </div>
      <input
        name="graduation_year"
        placeholder="Graduation Year"
        value={form.graduation_year}
        onChange={onChange}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <input name="job_title" placeholder="Job Title" value={form.job_title} onChange={onChange} />
        <input
          name="years_of_exp"
          placeholder="Years of Exp"
          type="number"
          value={form.years_of_exp}
          onChange={onChange}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default CandidateOnboardingForm;
