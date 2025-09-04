import React, { useEffect, useState } from "react";

const WhatsAppAutoPopup = ({
  phone = "919876543210", 
  message = "Hi! How can I help you?",
  delay = 3000 // delay in ms before popup shows
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!open) return null;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        right: 20,
        width: 320,
        border: "1px solid #25D366",
        borderRadius: 8,
        backgroundColor: "white",
        zIndex: 9999,
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          padding: 10,
          backgroundColor: "#25D366",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 16,
        }}
      >
        <span>Chat with us on WhatsApp</span>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="Close chat popup"
        >
          ×
        </button>
      </div>
      <div style={{ padding: 20, textAlign: "center" }}>
        <p style={{ marginBottom: 20 }}>
          Need help? Click the button below to chat with us on WhatsApp.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "#25D366",
            color: "white",
            padding: "12px 24px",
            borderRadius: 5,
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: 16,
            display: "inline-block",
          }}
        >
          Open WhatsApp Chat
        </a>
      </div>
    </div>
  );
};

export default WhatsAppAutoPopup;
