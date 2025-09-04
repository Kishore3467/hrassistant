import React from "react";
import { motion } from "framer-motion";
import "./AnimatedSVGBackground.css";

export default function AnimatedSVGBackground() {
  return (
    <motion.svg
      className="animated-bg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Rotating big circle */}
      <motion.circle
        cx="400"
        cy="300"
        r="200"
        stroke="#007bff"
        strokeWidth="5"
        fill="transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      {/* Floating small circles */}
      <motion.circle
        cx="200"
        cy="150"
        r="20"
        fill="#00c49f"
        animate={{ y: [0, 50, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.circle
        cx="600"
        cy="450"
        r="15"
        fill="#ff8042"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
