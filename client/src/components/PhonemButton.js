import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/PhonemButton.css';

const PhonemButton = ({ label, soundFile }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

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
    >
      {label}
    </div>
  );
};

export default PhonemButton;
