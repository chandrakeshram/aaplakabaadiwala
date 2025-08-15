// src/components/AnimatedBackground.jsx
import React from 'react';
import './AnimatedBackground.css'; // Import the CSS file for styling

const AnimatedBackground = () => {
  return (
    <div className="animated-background-container -z-10">
      <div className="gradient-1"></div>
      <div className="gradient-2"></div>
      <div className="gradient-3"></div>
    </div>
  );
};

export default AnimatedBackground;