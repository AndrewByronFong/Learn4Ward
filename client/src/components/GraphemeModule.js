import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const GraphemeModule = () => {
  const [audio] = useState(new Audio());
  const { soundName } = useParams();

  useEffect(() => {
    const soundFilePath = getSoundFilePath(soundName);
    audio.src = soundFilePath;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, soundName]);

  const playSound = () => {
    audio.play();
  };

  const getSoundFilePath = (name) => {
    const soundLibrary = {
      A: "/path/to/sound_A.mp3",
      B: "/path/to/sound_B.mp3",
      // Add more entries as needed
    };

    return soundLibrary[name] || "";
  };

  return (
    <div>
      <h2>{`Module for sound ${soundName}`}</h2>
      <p>Additional content goes here</p>
      <button onClick={playSound}>
        Play Sound {soundName}
      </button>
    </div>
  );
};

export default GraphemeModule;
