import React from "react";
import { motion } from "framer-motion";

export default function AnimatedSVG() {
  return (
    <motion.svg
      width="300"
      height="300"
      viewBox="0 0 200 200"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
    >
      {/* Rotating Circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="70"
        stroke="#007bff"
        strokeWidth="4"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating Dots */}
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        fill="#00c49f"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="150"
        cy="150"
        r="6"
        fill="#ff8042"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
