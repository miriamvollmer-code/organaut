"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { benachrichtigen } from "../benachrichtigung";

type Artikel = { id: number; name: string; erledigt: boolean; von: string };

const STORAGE_KEY = "organaut-einkauf";

function laden(): Artikel[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [
      { id: 1, name: "Milch", erledigt: false, von: "" },
      { id: 2, name: "Brot", erledigt: false, von: "" },
    ];
  } catch { return []; }
}

function speichern(artikel: Artikel[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(artikel));
}

export default function Einkauf() {
  const [artikel, setArtikel] = useState<Artikel[]>([]);
  const [eingabe, setEingabe] = useState("");
  const [profil, setProfil] = useState("");
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    setProfil(localStorage.getItem("organaut-profil") ?? "");
    setArtikel(laden());
    setBereit(true);
  }, []);

  const aktualisieren = (neu: Artikel[]) => {
    setArtikel(neu);
    speichern(neu);
  };

  const hinzufuegen = () => {
    if (!eingabe.trim()) return;
    aktualisieren([...artikel, { id: Date.now(), name: eingabe.trim(), erledigt: false, von: profil }]);
    benachrichtigen(profil, "🛒 Einkauf", eingabe.trim());
    setEingabe("");
  };

  const umschalten = (id: number) =>
    aktualisieren(artikel.map(a => a.id === id ? { ...a, erledigt: !a.erledigt, von: profil } : a));

  const loeschen = (id: number) =>
    aktualisieren(artikel.filter(a => a.id !== id));

  const erledigtLoeschen = () =>
    aktualisieren(artikel.filter(a => !a.erledigt));

  const PROFIL_EMOJI: Record<string, string> = { miriam: "👩", jan: "👨", franz: "🧒" };

  const offen = artikel.filter(a => !a.erledigt);
  const erledigt = artikel.filter(a => a.erledigt);

  if (!bereit) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/home" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-xl font-bold text-gray-800">🛒 Einkaufsliste</h1>
      </header>

      <div className="max-w-md mx-auto p-4">
        <div className="flex gap-2 mb-4">
          <input
            value={eingabe}
            onChange={e => setEingabe(e.target.value)}
            onKeyDown={e => e.key === "Enter" && hinzufuegen()}
            placeholder="Artikel hinzufügen..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button onClick={hinzufuegen} className="bg-green-500 text-white px-5 py-3 rounded-xl hover:bg-green-600 font-medium">+</button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {offen.map(a => (
            <div key={a.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <button onClick={() => umschalten(a.id)} className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-green-400 flex-shrink-0" />
              <span className="flex-1 text-gray-700">{a.name}</span>
              {a.von && <span className="text-sm" title={a.von}>{PROFIL_EMOJI[a.von]}</span>}
              <button onClick={() => loeschen(a.id)} className="text-gray-300 hover:text-red-400">✕</button>
            </div>
          ))}
          {offen.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-400">Alle erledigt! 🎉</div>
          )}
        </div>

        {erledigt.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Erledigt ({erledigt.length})</span>
              <button onClick={erledigtLoeschen} className="text-sm text-gray-400 hover:text-red-500">Löschen</button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden opacity-70">
              {erledigt.map(a => (
                <div key={a.id} className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <button onClick={() => umschalten(a.id)} className="w-6 h-6 rounded-full bg-green-400 flex-shrink-0 flex items-center justify-center text-white text-xs">✓</button>
                  <span className="flex-1 text-gray-400 line-through">{a.name}</span>
                  {a.von && <span className="text-sm" title={`erledigt von ${a.von}`}>{PROFIL_EMOJI[a.von]} ✓</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
