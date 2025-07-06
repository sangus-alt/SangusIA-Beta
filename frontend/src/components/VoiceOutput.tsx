export default function VoiceOutput({ text }: { text: string }) {
  function speak() {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    window.speechSynthesis.speak(utter);
  }
  return (
    <button onClick={speak} title="Écouter la réponse">
      🔊 Lire à voix haute
    </button>
  );
}