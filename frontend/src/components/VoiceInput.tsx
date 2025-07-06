import React, { useRef } from "react";

export default function VoiceInput({ onText }: { onText: (t: string) => void }) {
  const recRef = useRef<any>(null);

  function start() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = "fr-FR";
    rec.onresult = (e: any) => onText(e.results[0][0].transcript);
    rec.start();
    recRef.current = rec;
  }
  function stop() {
    recRef.current?.stop();
  }
  return (
    <button onMouseDown={start} onMouseUp={stop} title="Maintenir pour parler">
      🎤 Parle à Sangus
    </button>
  );
}