import React, { useEffect, useState } from "react";
import { authHeader } from "../api";

export default function AdminPanel() {
  const [stats, setStats] = useState<any>({});
  const [files, setFiles] = useState<string[]>([]);
  useEffect(() => {
    fetch("/system/stats", { headers: authHeader() })
      .then(r => r.json()).then(setStats);
    fetch("/system/files", { headers: authHeader() })
      .then(r => r.json()).then(d => setFiles(d.files));
  }, []);
  function restart() {
    fetch("/system/restart", { method: "POST", headers: authHeader() });
    alert("Redémarrage demandé");
  }
  return (
    <div>
      <h2>Panel Administration</h2>
      <h3>Système</h3>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
      <h3>Fichiers racine</h3>
      <ul>{files.map(f => <li key={f}>{f}</li>)}</ul>
      <button onClick={restart}>Redémarrer le serveur</button>
    </div>
  );
}