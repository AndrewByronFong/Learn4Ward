import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import AppBar from "./ResponsiveAppbar";
import axios from "axios";
import "../styles/components/GraphemeModule.css";

const GraphemeModule = () => {
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const { graphemeName, soundFile } = useParams();

  useEffect(() => {
    const initializeWebcam = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const fetchAudio = async () => {
      const phonem = {soundFile};
      const domain = '';
      const endpoint = `${domain}/phonem/${phonem}`;
      try {
        const response = await axios.get(endpoint);
        const base64encoding = response.data.audioData;
        const audioBlob = base64toM4A(base64encoding, 'audio/m4a');
        const audioFileName = `${soundFile}.m4a`;
        const audioFile = new File([audioBlob], audioFileName, { type: 'audio/m4a' });
        setAudioFile(audioFile);
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    }

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      initializeWebcam();
    }

    fetchAudio();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream, soundFile]);

  const startRecording = () => {
    const audioStream = stream.clone();
    const mediaRecorder = new MediaRecorder(audioStream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/m4a' });
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64encode = reader.result.split(',')[1];
        sendAudio(base64encode);
        setAudioChunks([]);
      };
      reader.readAsDataURL(audioBlob);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const sendAudio = async (base64encode) => {
    const phonem = {audioFile};
    const domain = ''; // change this based on backend URL
    const endpoint = `${domain}/phoneme/compare/${phonem}`;
    try {
      const response = await axios.post(endpoint, {
        soundIn64: base64encode,
      });
      console.log('Audio base-64 encoding successfully sent:', response.data);
    } catch (error) {
      console.log('Error sending audio base-64 encoding:', error);
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const playSound = () => {
    if (audioFile) {
      const audio = new Audio(URL.createObjectURL(audioFile));
      audio.play();
    }
  };

  const base64toM4A = (base64encoding, contentType) => {
    const byteChar = atob(base64encoding);
    const byteArrays = [];

    for (let offset = 0; offset < byteChar.length; offset += 512) {
      const slice = byteChar.slice(offset, offset + 512);
      const byteNum = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNum[i] = slice.charCodeAt(i);
      }

      const byteArr = new Uint8Array(byteNum);
      byteArrays.push(byteArr);
    }

    return new Blob(byteArrays, {type: contentType });
  };

  return (
    <>
      <AppBar showButtons={false} />

      <div className="container">
        {stream && (
          <div className="left-side">
            <Webcam
              style={{ width: "100%", height: "100%" }}
              ref={webcamRef}
            />
          </div>
        )}

        <div className="right-side">
          <button onClick={playSound}>{graphemeName}</button>
          <button onClick={recording ? stopRecording : startRecording}>
            {recording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>
    </>
  );
};

export default GraphemeModule;
