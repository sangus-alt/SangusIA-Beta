import React, { useState } from "react";
export default function PlayTTS({ text }: { text: string }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  async function getAudio() {
    const res = await fetch("/api/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const blob = await res.blob();
    setAudioUrl(URL.createObjectURL(blob));
  }
  return (
    <span>
      <button onClick={getAudio}>🔊 Lire avec ma voix</button>
      {audioUrl && <audio src={audioUrl} autoPlay controls />}
    </span>
  );
}