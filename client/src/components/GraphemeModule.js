import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import "../styles/components/GraphemeModule.css";

const GraphemeModule = () => {
  const [stream, setStream] = useState(null);
  const webcamRef = useRef(null);
  const { soundName } = useParams();

  useEffect(() => {
    const initializeWebcam = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(userStream);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      initializeWebcam();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const playSound = () => {
    // Your existing playSound function
  };

  return (
    <div className="container">
      {stream && (
        <div className="left-side">
          <Webcam
            style={{ width: "500px", height: "500px" }}
            ref={webcamRef}
          />
        </div>
      )}

      <div className="right-side">
        <h2>{`Module for sound ${soundName}`}</h2>
        <p>Additional content goes here</p>
        <button onClick={playSound}>Play Sound {soundName}</button>
      </div>
    </div>
  );
};

export default GraphemeModule;
