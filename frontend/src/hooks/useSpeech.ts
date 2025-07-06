import { useRef } from "react";

export function useTTS(lang = "fr-FR") {
  const synth = window.speechSynthesis;
  return (text: string) => {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    synth.speak(utter);
  };
}

export function useSTT(onResult: (result: string) => void, lang = "fr-FR") {
  const recognition = useRef<SpeechRecognition|null>(null);

  function start() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.lang = lang;
    recognition.current.onresult = e => onResult(e.results[0][0].transcript);
    recognition.current.start();
  }
  function stop() {
    recognition.current?.stop();
  }
  return { start, stop };
}