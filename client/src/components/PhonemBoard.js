import React from 'react';
import PhonemButton from './PhonemButton';

const Phonemboard = () => {
  return (
    <div className="phonem-board">
      <PhonemButton label="B" soundFile="sound1.mp3" />
      <PhonemButton label="F" soundFile="sound2.mp3" />
    </div>
  );
};

export default Phonemboard;
