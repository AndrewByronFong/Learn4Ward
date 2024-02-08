import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/PhonemButton.css';

const PhonemButton = ({ label, soundFile, x, y }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const phonemboard = {
    transform: `translate(${x}px, ${y}px)`,
  };

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const handleClick = () => {
    navigate(`/module/${label}`, { state: { soundName: label } });
  };

  return (
    <div
      className={`phonem-button ${expanded ? 'expanded' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={phonemboard}
    >
      {label}
    </div>
  );
};

export default PhonemButton;
