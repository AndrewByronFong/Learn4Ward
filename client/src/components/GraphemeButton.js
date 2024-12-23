import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/PhonemButton.css';

const GraphemeButton = ({ graphemeName, soundFile, x, y }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const phonemboard = {
    transform: `translate(${x}%, ${y}%)`,
  };

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };

  const handleClick = () => {
    navigate(`/module/${graphemeName}`, { state: { soundName: soundFile } });
  };

  return (
    <div
      className={`phonem-button ${expanded ? 'expanded' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={phonemboard}
    >
      <h1>
        {graphemeName}
      </h1>
    </div>
  );
};

export default GraphemeButton;
