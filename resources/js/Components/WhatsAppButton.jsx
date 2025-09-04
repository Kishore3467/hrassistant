// src/components/WhatsAppButton.jsx
import React from 'react';

const WhatsAppButton = ({ phone = '919876543210', message = 'Hello!' }) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        textDecoration: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
      aria-label="Chat on WhatsApp"
    >
      📱
    </a>
  );
};

export default WhatsAppButton;
