import React, { useState, useRef } from "react";

export default function ChatStreaming() {
  const [response, setResponse] = useState("");
  const ws = useRef<WebSocket | null>(null);

  function startStreaming(prompt: string) {
    setResponse("");
    ws.current = new WebSocket("ws://localhost:8000/ws/stream_ia");
    ws.current.onopen = () => ws.current?.send(prompt);
    ws.current.onmessage = (evt) => {
      if (evt.data === "[END]") ws.current?.close();
      else setResponse((r) => r + evt.data);
    };
    ws.current.onclose = () => ws.current = null;
  }

  return (
    <div>
      <button onClick={() => startStreaming("Explique l’architecture MVC.")}>
        Lancer la réponse IA en streaming
      </button>
      <div style={{whiteSpace: "pre-line", marginTop: 10}}>
        {response}
      </div>
    </div>
  );
}