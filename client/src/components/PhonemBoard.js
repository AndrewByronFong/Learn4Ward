import React, { useEffect, useMemo, useState } from 'react';
import '../styles/components/PhonemBoard.css'
import PhonemButton from '../components/PhonemButton';

const PhonemBoard = () => {
  const phonemData = useMemo(() => [
    { label: 'B' },
    { label: 'D' },
    { label: 'F' },
    { label: 'G' },
    { label: 'K' },
    { label: 'L' },
    { label: 'M' },
    { label: 'N' },
    { label: 'P' },
    { label: 'R' },
  ], []);

  const [phonemButtons, setPhonemButtons] = useState([]);

  useEffect(() => {
    const buttons = phonemData.map((data, index) => {
      const angle = (index / phonemData.length) * 2 * Math.PI;
      const x = 400 * Math.cos(angle);
      const y = 400 * Math.sin(angle)+700;
      return (
        <PhonemButton
          phonemName={data.label}
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
