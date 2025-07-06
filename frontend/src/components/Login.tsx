import React, { useState } from "react";
export default function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function login() {
    const params = new URLSearchParams({ username, password });
    const res = await fetch("/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      onLogin();
    } else setError("Identifiants incorrects.");
  }
  return (
    <form onSubmit={e => { e.preventDefault(); login(); }}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button type="submit">Se connecter</button>
      {error && <div>{error}</div>}
    </form>
  );
}