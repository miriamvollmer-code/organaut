"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const WOCHENTAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const STORAGE_KEY = "organaut-kalender";
const PROFIL_EMOJI: Record<string, string> = { miriam: "👩", jan: "👨", franz: "🧒" };

type Termin = { datum: string; text: string; von: string };

function laden(): Termin[] {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; }
  catch { return []; }
}
function speichern(t: Termin[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(t)); }

export default function Kalender() {
  const heute = new Date();
  const [jahr, setJahr] = useState(heute.getFullYear());
  const [monat, setMonat] = useState(heute.getMonth());
  const [termine, setTermine] = useState<Termin[]>([]);
  const [ausgewaehlt, setAusgewaehlt] = useState<string | null>(null);
  const [eingabe, setEingabe] = useState("");
  const [profil, setProfil] = useState("");

  useEffect(() => {
    setProfil(localStorage.getItem("organaut-profil") ?? "");
    setTermine(laden());
  }, []);

  const aktualisieren = (neu: Termin[]) => { setTermine(neu); speichern(neu); };

  const ersterTag = new Date(jahr, monat, 1).getDay();
  const versatz = ersterTag === 0 ? 6 : ersterTag - 1;
  const tageImMonat = new Date(jahr, monat + 1, 0).getDate();

  const vorMonat = () => { if (monat === 0) { setMonat(11); setJahr(j => j-1); } else setMonat(m => m-1); };
  const naechsterMonat = () => { if (monat === 11) { setMonat(0); setJahr(j => j+1); } else setMonat(m => m+1); };

  const datumStr = (tag: number) => `${jahr}-${String(monat+1).padStart(2,"0")}-${String(tag).padStart(2,"0")}`;
  const termineAmTag = (tag: number) => termine.filter(t => t.datum === datumStr(tag));

  const terminHinzufuegen = () => {
    if (!ausgewaehlt || !eingabe.trim()) return;
    aktualisieren([...termine, { datum: ausgewaehlt, text: eingabe.trim(), von: profil }]);
    setEingabe("");
  };

  const terminLoeschen = (datum: string, text: string) =>
    aktualisieren(termine.filter(t => !(t.datum === datum && t.text === text)));

  const ausgewaehltTermine = ausgewaehlt ? termine.filter(t => t.datum === ausgewaehlt) : [];

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/home" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-xl font-bold text-gray-800">📅 Kalender</h1>
      </header>

      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={vorMonat} className="p-2 hover:bg-gray-100 rounded-lg">‹</button>
            <span className="font-semibold text-gray-800">{MONATE[monat]} {jahr}</span>
            <button onClick={naechsterMonat} className="p-2 hover:bg-gray-100 rounded-lg">›</button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WOCHENTAGE.map(t => <div key={t} className="text-center text-xs text-gray-400 font-medium py-1">{t}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: versatz }).map((_, i) => <div key={`l-${i}`} />)}
            {Array.from({ length: tageImMonat }).map((_, i) => {
              const tag = i + 1;
              const ds = datumStr(tag);
              const istHeute = ds === heute.toISOString().slice(0, 10);
              const anzahl = termineAmTag(tag).length;
              const istAusgewaehlt = ds === ausgewaehlt;
              return (
                <button
                  key={tag}
                  onClick={() => setAusgewaehlt(ds === ausgewaehlt ? null : ds)}
                  className={`aspect-square rounded-lg text-sm flex flex-col items-center justify-center
                    ${istAusgewaehlt ? "bg-blue-500 text-white" : istHeute ? "bg-blue-100 text-blue-700 font-bold" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  {tag}
                  {anzahl > 0 && (
                    <span className={`text-xs leading-none ${istAusgewaehlt ? "text-white" : "text-blue-400"}`}>
                      {"·".repeat(Math.min(anzahl, 3))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {ausgewaehlt && (
          <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
            <h2 className="font-semibold text-gray-800 mb-3">
              {new Date(ausgewaehlt + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
            </h2>
            {ausgewaehltTermine.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700 flex-1">{t.text}</span>
                {t.von && <span className="text-sm mr-2">{PROFIL_EMOJI[t.von]}</span>}
                <button onClick={() => terminLoeschen(t.datum, t.text)} className="text-gray-400 hover:text-red-500">✕</button>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <input
                value={eingabe}
                onChange={e => setEingabe(e.target.value)}
                onKeyDown={e => e.key === "Enter" && terminHinzufuegen()}
                placeholder="Neuer Termin..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button onClick={terminHinzufuegen} className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">+</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
