// PageTransition.jsx
import React, { useState, useEffect } from "react";
import "./PageTransition.css";

export default function PageTransition({ children, trigger }) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowOverlay(true);
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 1000); // Duration of animation
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {showOverlay && <div className="book-animation"></div>}
      <div className={showOverlay ? "page-hidden" : ""}>{children}</div>
    </>
  );
}
