export default function MasterBadge({ user }: { user: any }) {
  if (user?.username === "abosule")
    return <div style={{color: "gold", fontWeight: "bold"}}>👑 Maître absolu de Sangus</div>;
  return null;
}