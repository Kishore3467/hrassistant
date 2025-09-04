import axios from 'axios';
import React, { useState } from 'react';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const sendMessage = async () => {
    setError('');
    setResponse('');

    if (!input.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/aichat', {
        prompt: input.trim(),
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResponse(res.data.response);
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // Laravel validation errors
        setError(JSON.stringify(err.response.data.errors));
      } else if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={5}
        cols={50}
        placeholder="Enter your prompt here"
      />
      <br />
      <button onClick={sendMessage}>Send</button>

      {response && <p><strong>Response:</strong> {response}</p>}
      {error && <p style={{ color: 'red' }}><strong>Error:</strong> {error}</p>}
    </div>
  );
}
