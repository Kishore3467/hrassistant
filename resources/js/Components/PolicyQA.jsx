import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiDownload, FiCheckCircle, FiAlertCircle, FiSearch } from 'react-icons/fi';
import './PolicyBot.css';

const PolicyBot = () => {
  const [policies, setPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadStatus, setDownloadStatus] = useState({ visible: false, success: false, message: '' });

  // Fetch all policies on component load
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('/api/corporate-policies');
        setPolicies(response.data);
      } catch (error) {
        console.error('Failed to fetch policies:', error);
      }
    };
    fetchPolicies();
  }, []);

  // Individual policy download
  const downloadPolicy = async (policyId, policyName) => {
    try {
      setDownloadStatus({ visible: true, success: false, message: `Preparing ${policyName}...` });

      const response = await axios.get(`/api/corporate-policies/${policyId}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${policyName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadStatus({ visible: true, success: true, message: `${policyName} download started!` });
      setTimeout(() => setDownloadStatus(prev => ({ ...prev, visible: false })), 5000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus({ visible: true, success: false, message: `Failed to download ${policyName}. Please try again.` });
    }
  };

  const filteredPolicies = policies.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="policy-container">
      {/* Notification */}
      {downloadStatus.visible && (
        <div className={`download-notification ${downloadStatus.success ? 'success' : 'error'}`} role="alert">
          {downloadStatus.success ? <FiCheckCircle /> : <FiAlertCircle />} {downloadStatus.message}
        </div>
      )}

      {/* Search */}
      <div className="policy-search">
        <FiSearch />
        <input
          type="text"
          placeholder="Search policies..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Policy List */}
      <ul className="policy-list">
        {filteredPolicies.map(policy => (
          <li key={policy.id}>
            <button
              className="policy-download-btn"
              onClick={() => downloadPolicy(policy.id, policy.name)}
            >
              <FiDownload /> {policy.name} ({policy.category}) - {new Date(policy.updated).toLocaleDateString()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PolicyBot;
