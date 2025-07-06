export default function LogoutButton() {
  return <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>Déconnexion</button>;
}