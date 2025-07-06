import React, { useState } from "react";
import { authHeader } from "../api";

export default function ProfileEdit({ profile, onUpdate }: { profile: any, onUpdate: (u: any) => void }) {
  const [display_name, setDisplayName] = useState(profile.display_name);
  async function save() {
    const res = await fetch("/users/me", {
      method: "PUT",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ display_name }),
    });
    if (res.ok) {
      const data = await res.json();
      onUpdate(data);
    }
  }
  return (
    <form onSubmit={e => { e.preventDefault(); save(); }}>
      <input value={display_name} onChange={e => setDisplayName(e.target.value)} placeholder="Nom affiché" />
      <button type="submit">Enregistrer</button>
    </form>
  );
}