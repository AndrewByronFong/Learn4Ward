import React, { useEffect, useMemo, useState } from 'react';
import '../styles/components/PhonemBoard.css';
import PhonemButton from './PhonemButton';

const Phonemboard = () => {
  // hard coded phonem data, later use api call for this
  const phonemData = useMemo(() => [
    { label: 'B', soundFile: 'B.m4a' },
    { label: 'D', soundFile: 'D.m4a' },
    { label: 'F', soundFile: 'F.m4a' },
    { label: 'G', soundFile: 'G.m4a' },
    { label: 'H', soundFile: 'H.m4a' },
    { label: 'K', soundFile: 'K.m4a' },
    { label: 'L', soundFile: 'L.m4a' },
    { label: 'M', soundFile: 'M.m4a' },
    { label: 'N', soundFile: 'N.m4a' },
    { label: 'P', soundFile: 'P.m4a' },
  ], []);

  const [phonemButtons, setPhonemButtons] = useState([]);

  useEffect(() => {
    const buttons = phonemData.map((data, index) => {
      const angle = (index / phonemData.length) * 2 * Math.PI;
      const x = 200 * Math.cos(angle);
      const y = 200 * Math.sin(angle);

      return (
        <PhonemButton
          key={index}
          label={data.label}
          soundFile={data.soundFile}
          x={x}
          y={y}
        />
      );
    });

    setPhonemButtons(buttons);
  }, [phonemData]);

  return (
    <div className="phonem-board">
      {phonemButtons}
    </div>
  );
};
//later: make API call to populate the unlocked modules, and pass the audio file name as a prop for each phonem button

export default Phonemboard;
