import React, { useRef, useState } from "react";
import { authHeader } from "../api";

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  function startRecording() {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      mediaRecorder.current.ondataavailable = e => chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        const formData = new FormData();
        formData.append("file", blob, "voice.webm");
        fetch("/upload-voice", { method: "POST", body: formData, headers: authHeader() });
      };
      mediaRecorder.current.start();
    });
  }

  function stopRecording() {
    setRecording(false);
    mediaRecorder.current?.stop();
  }

  return (
    <div>
      <button onMouseDown={startRecording} onMouseUp={stopRecording} disabled={recording}>
        🎙️ Enregistrer ma voix
      </button>
      {audioURL && <audio src={audioURL} controls />}
    </div>
  );
}