"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PROFIL_NAMEN: Record<string, string> = { miriam: "Miriam", jan: "Jan", franz: "Franz" };
const PROFIL_AKZENT: Record<string, string> = { miriam: "#C4847A", jan: "#7A9EB4", franz: "#C47A3A" };

const BEREICHE = [
  { name: "Kalender",  emoji: "📅", href: "/kalender", bg: "#F5F0E0", border: "#C4A840", shadow: "#C4A84044" },
  { name: "Einkauf",   emoji: "🛒", href: "/einkauf",  bg: "#E8F0E4", border: "#7A9E6A", shadow: "#7A9E6A44" },
  { name: "Aufgaben",  emoji: "✅", href: "/aufgaben", bg: "#F5EDE0", border: "#C47A3A", shadow: "#C47A3A44" },
  { name: "Fotos",     emoji: "📷", href: "/fotos",    bg: "#F0E8EA", border: "#C4847A", shadow: "#C4847A44" },
  { name: "Notizen",   emoji: "📝", href: "/notizen",  bg: "#EAE8F0", border: "#8A7AB4", shadow: "#8A7AB444" },
];

export default function Home() {
  const router = useRouter();
  const [profil, setProfil] = useState<string | null>(null);

  useEffect(() => {
    const p = localStorage.getItem("organaut-profil");
    if (!p) router.push("/");
    else setProfil(p);
  }, [router]);

  if (!profil) return null;

  const akzent = PROFIL_AKZENT[profil];

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #C8D8E4 0%, #D8CEB0 35%, #EEE8D8 100%)" }}>
      <header className="px-6 py-5 flex items-center justify-between" style={{ background: "rgba(250,245,233,0.85)", backdropFilter: "blur(8px)", borderBottom: "1px solid #D4C4A0" }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#3A1E08", fontFamily: "Georgia, serif" }}>🚀 Organaut</h1>
          <p className="text-sm mt-0.5" style={{ color: "#6B4A28", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
            Willkommen, {PROFIL_NAMEN[profil]}!
          </p>
        </div>
        <button
          onClick={() => { localStorage.removeItem("organaut-profil"); router.push("/"); }}
          className="text-sm px-4 py-2 rounded-2xl"
          style={{ background: "#EEE4D0", color: "#6B4A28", border: "1px solid #D4C4A0", fontFamily: "Georgia, serif" }}
        >
          ← Wechseln
        </button>
      </header>

      {/* Dünner farbiger Akzentstreifen */}
      <div style={{ height: "3px", background: `linear-gradient(90deg, transparent, ${akzent}, transparent)` }} />

      <div className="p-6 grid grid-cols-2 gap-4 max-w-md mx-auto mt-4">
        {BEREICHE.map((b) => (
          <Link
            key={b.href}
            href={b.href}
            className="rounded-3xl p-6 flex flex-col items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            style={{
              background: b.bg,
              border: `2px solid ${b.border}`,
              boxShadow: `0 4px 16px ${b.shadow}`,
              fontFamily: "Georgia, serif",
            }}
          >
            <span className="text-4xl">{b.emoji}</span>
            <span className="font-semibold text-sm" style={{ color: "#3A1E08" }}>{b.name}</span>
          </Link>
        ))}
      </div>

      {/* Berliner Mond / Deko unten */}
      <div className="text-center mt-8 pb-8" style={{ color: "#8B6A48", fontSize: "12px", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
        Berlin grüßt euch 🐻
      </div>
    </main>
  );
}
