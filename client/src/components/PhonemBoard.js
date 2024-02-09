import React, { useEffect, useMemo, useState } from 'react';
import PhonemButton from '../components/PhonemButton';

const PhonemBoard = () => {
  const phonemData = useMemo(() => [
    { label: 'A', soundFile: 'B.m4a' },
    { label: 'B', soundFile: 'B.m4a' },
    { label: 'C', soundFile: 'B.m4a' },
    { label: 'D', soundFile: 'B.m4a' },
    { label: 'E', soundFile: 'B.m4a' },
    { label: 'F', soundFile: 'B.m4a' },
    // Add more phonem data
  ], []);

  const [phonemButtons, setPhonemButtons] = useState([]);

  useEffect(() => {
    const buttons = phonemData.map((data, index) => {
      const angle = (index / phonemData.length) * 2 * Math.PI;
      const x = 100 * Math.cos(angle);
      const y = 100 * Math.sin(angle);

      return (
        <PhonemButton
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

export default PhonemBoard;
