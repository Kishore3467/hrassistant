import React, { useState } from 'react';
import axios from 'axios';

export default function UserDocumentUpload() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!type) {
      setMessage('Please select a document type.');
      return;
    }
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/upload-user-document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('File uploaded successfully!');
      setFile(null);
      setType('');
      e.target.reset(); // reset form inputs
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <div>
        <label>Document Type:</label>
        <select value={type} onChange={e => setType(e.target.value)} required>
          <option value="">-- Select Type --</option>
          <option value="education">Educational Documents</option>
          <option value="aadhar">Aadhar Card</option>
          <option value="pan">PAN Card</option>
          <option value="bank_passbook">Bank Passbook</option>
          <option value="passport_photo">Passport Size Photo</option>
          <option value="experience_certificate">Experience Certificate</option>
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Choose File:</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={e => setFile(e.target.files[0])}
          required
        />
      </div>

      <button type="submit" style={{ marginTop: 15 }}>
        Upload Document
      </button>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </form>
  );
}
