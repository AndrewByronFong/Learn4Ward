import React, { useState } from 'react';
import '../styles/components/PhonemButton.css';

const SoundButton = ({ label, soundFile }) => {
  const [expanded, setExpanded] = useState(false);

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  return (
    <div
      className={`phonem-button ${expanded ? 'expanded' : ''}`}
      onClick={() => {
        setExpanded(!expanded);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </div>
  );
};

export default SoundButton;
