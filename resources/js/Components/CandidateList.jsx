import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateList = ({ companyName }) => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/candidates", {
        params: { company: companyName },
      });
      setCandidates(res.data.data);
    };
    fetchData();
  }, [companyName]);

  return (
    <div>
      <h3>{companyName} - Onboarded Candidates</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.position}</td>
              <td>{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
