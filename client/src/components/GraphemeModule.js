import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import AppBar from "./ResponsiveAppbar";
import ReactPlayer from "react-player";
import axios from "axios";
import "../styles/components/GraphemeModule.css";

const GraphemeModule = () => {
  const [stream, setStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [audioReceived, setAudioReceived] = useState(false);
  const [retry, setRetry] = useState(0);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const { graphemeName } = useParams();
  const MAX_TRIES = 1;

  const location = useLocation();
  const soundFile = location.state.soundName;

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
      console.log('fetching audio');
      setRetry(retry + 1);
      const domain = 'https://four-chefs-kick.loca.lt';
      const endpoint = `${domain}/phoneme/${soundFile}`;
      try {
        const response = await axios.get(endpoint);
        const base64encoding = response.data;
        console.log(base64encoding);
        const audioBlob = base64toM4A(base64encoding, 'audio/m4a');
        const audioFileName = `${soundFile}.m4a`;
        const audioFile = new File([audioBlob], audioFileName, { type: 'audio/m4a' });
        setAudioFile(audioFile);
        setAudioReceived(true);
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    }

    const fetchVideo = async () => {
      console.log('fetching video');
      const domain = 'https://four-chefs-kick.loca.lt';
      const videoEndpoint = `${domain}/phoneme/combined/${soundFile}`;
      try {
        const response = await axios.get(videoEndpoint);
        const combinedBase64encoding = response.data;
        console.log(combinedBase64encoding);

        // Set videoFile state with the combined video (audio and video) data
        setVideoFile(base64toBlob(combinedBase64encoding, 'video/mp4'));
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      initializeWebcam();
    }

    if (retry < MAX_TRIES) {
      fetchAudio();
      fetchVideo();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [soundFile, stream, audioReceived, setRetry, retry]);

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
    const phonem = { audioFile };
    const domain = 'https://loose-poems-doubt.loca.lt'; //change this based on backend URL
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

    for (let offset = 0; offset < byteChar.length; offset += 128) {
      const slice = byteChar.slice(offset, offset + 128);
      const byteArr = new Uint8Array(
        Array.from(slice, char => char.charCodeAt(0))
      );
      byteArrays.push(byteArr);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const base64toBlob = (base64encoding, contentType) => {
    const byteChar = atob(base64encoding);
    const byteArrays = [];

    for(let offset = 0; offset < byteChar.length; offset += 128) {
      const slice = byteChar.slice(offset, offset + 128);
      const byteArr = new Uint8Array(
        Array.from(slice, char => char.charCodeAt(0))
      );
      byteArrays.push(byteArr);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  return (
    <div>
      <AppBar showButtons={false} />

      <div className="outer-container">
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
            {videoFile && (
              <ReactPlayer
                url={URL.createObjectURL(videoFile)}
                controls
                playing={recording}
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
        <div className="buttons-container">
          <button onClick={playSound}>{graphemeName}</button>
          <button onClick={recording ? stopRecording : startRecording}>
            {recording ? 'stop' : 'record'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphemeModule;