const PROFIL_NAME: Record<string, string> = { miriam: "Miriam", jan: "Jan", franz: "Franz" };

export async function benachrichtigen(profil: string, titel: string, text: string) {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
  if (Notification.permission !== "granted") return;

  const name = PROFIL_NAME[profil] ?? profil;
  new Notification(`Organaut — ${name}`, { body: `${titel}: ${text}`, icon: "/icon-192.png" });
}
