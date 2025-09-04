import axios from 'axios';
import React, { useState } from 'react';

const WhatsAppMessageForm = () => {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/send-whatsapp', { to, message });
      setStatus(res.data.message);
    } catch (err) {
      setStatus(err.response?.data?.error || 'Error sending message');
    }
  };

  return (
    <div>
      <input placeholder="Phone number with country code" value={to} onChange={e => setTo(e.target.value)} />
      <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send WhatsApp Message</button>
      <p>{status}</p>
    </div>
  );
};

export default WhatsAppMessageForm;
