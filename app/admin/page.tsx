"use client";
import { useState } from "react";

const MASTER = "4622";
const PINS_KEY = "organaut-pins";
const NAMEN = ["miriam", "jan", "franz"] as const;
const ANZEIGE: Record<string, string> = { miriam: "Miriam", jan: "Jan", franz: "Franz" };

export default function Admin() {
  const [eingabe, setEingabe] = useState("");
  const [eingeloggt, setEingeloggt] = useState(false);
  const [fehler, setFehler] = useState(false);
  const [erledigt, setErledigt] = useState<string[]>([]);

  const pruefen = () => {
    if (eingabe === MASTER) { setEingeloggt(true); setFehler(false); }
    else { setFehler(true); setEingabe(""); }
  };

  const pinZuruecksetzen = (profil: string) => {
    const pins = (() => {
      try { const r = localStorage.getItem(PINS_KEY); return r ? JSON.parse(r) : {}; }
      catch { return {}; }
    })();
    pins[profil] = "1234";
    localStorage.setItem(PINS_KEY, JSON.stringify(pins));
    setErledigt(prev => [...prev, profil]);
  };

  const alleZuruecksetzen = () => {
    localStorage.setItem(PINS_KEY, JSON.stringify({ miriam: "1234", jan: "1234", franz: "1234" }));
    setErledigt(["miriam", "jan", "franz"]);
  };

  if (!eingeloggt) return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#EEE8D8" }}>
      <h1 className="text-2xl font-bold mb-8" style={{ color: "#3A1E08", fontFamily: "Georgia, serif" }}>Admin</h1>
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-xs">
        <p className="text-sm mb-4 text-center" style={{ color: "#6B4A28", fontFamily: "Georgia, serif" }}>Master-Passwort eingeben</p>
        <input
          type="password"
          value={eingabe}
          onChange={e => { setEingabe(e.target.value); setFehler(false); }}
          onKeyDown={e => e.key === "Enter" && pruefen()}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-xl tracking-widest focus:outline-none focus:ring-2 mb-3"
          placeholder="••••"
          autoFocus
        />
        {fehler && <p className="text-sm text-center mb-3" style={{ color: "#C4484A" }}>Falsches Passwort</p>}
        <button onClick={pruefen} className="w-full py-3 rounded-xl text-white font-medium" style={{ background: "#8B5E3C" }}>
          Einloggen
        </button>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen px-6 py-10" style={{ background: "#EEE8D8" }}>
      <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: "#3A1E08", fontFamily: "Georgia, serif" }}>Admin</h1>
      <p className="text-sm text-center mb-8" style={{ color: "#6B4A28", fontFamily: "Georgia, serif", fontStyle: "italic" }}>PIN zurücksetzen auf 1234</p>

      <div className="max-w-xs mx-auto flex flex-col gap-3">
        {NAMEN.map(p => (
          <div key={p} className="bg-white rounded-2xl px-5 py-4 flex items-center justify-between shadow-sm">
            <span className="font-semibold" style={{ color: "#3A1E08", fontFamily: "Georgia, serif" }}>{ANZEIGE[p]}</span>
            {erledigt.includes(p) ? (
              <span className="text-green-600 text-sm">✓ zurückgesetzt</span>
            ) : (
              <button onClick={() => pinZuruecksetzen(p)} className="px-4 py-1.5 rounded-xl text-white text-sm" style={{ background: "#C4622A" }}>
                Reset
              </button>
            )}
          </div>
        ))}

        <button
          onClick={alleZuruecksetzen}
          className="mt-4 w-full py-3 rounded-2xl text-white font-medium"
          style={{ background: "#8B5E3C" }}
        >
          Alle zurücksetzen
        </button>
      </div>
    </main>
  );
}
