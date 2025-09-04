import React, { useEffect, useState } from "react";
import api from "../api";

const OnboardingList = ({ companyName, refreshKey }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await api.get("/onboardings", { params: { company: companyName } });
        setRows(res.data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [companyName, refreshKey]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: 24 }}>
      <h3>{companyName} — Employees</h3>
      {rows.length === 0 ? (
        <p>No employees yet.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%", maxWidth: 900 }}>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Job</th><th>YOE</th><th>Degree</th><th>Added</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.full_name}</td>
                <td>{r.email}</td>
                <td>{r.job_title || "-"}</td>
                <td>{r.years_of_exp ?? "-"}</td>
                <td>{r.degree || "-"}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OnboardingList;
