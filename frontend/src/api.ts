export function logout() {
  localStorage.removeItem("token");
  // Optionnel : redirige vers la page de connexion
  window.location.href = "/login";
}