"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { benachrichtigen } from "../benachrichtigung";

type Aufgabe = { id: number; text: string; person: string; erledigt: boolean; erledigtVon: string };

const STORAGE_KEY = "organaut-aufgaben";
const PERSONEN = ["Alle", "Miriam", "Jan", "Franz"];
const PERSON_FARBEN: Record<string, string> = {
  Miriam: "bg-pink-100 text-pink-700",
  Jan:    "bg-blue-100 text-blue-700",
  Franz:  "bg-orange-100 text-orange-700",
};
const PROFIL_EMOJI: Record<string, string> = { miriam: "👩", jan: "👨", franz: "🧒" };

const STANDARD: Aufgabe[] = [
  { id: 1, text: "Spülmaschine ausräumen", person: "Franz", erledigt: false, erledigtVon: "" },
  { id: 2, text: "Einkaufen", person: "Miriam", erledigt: false, erledigtVon: "" },
];

function laden(): Aufgabe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : STANDARD;
  } catch { return STANDARD; }
}

function speichern(aufgaben: Aufgabe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(aufgaben));
}

export default function Aufgaben() {
  const [aufgaben, setAufgaben] = useState<Aufgabe[]>([]);
  const [eingabe, setEingabe] = useState("");
  const [person, setPerson] = useState("Miriam");
  const [filter, setFilter] = useState("Alle");
  const [profil, setProfil] = useState("");
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    setProfil(localStorage.getItem("organaut-profil") ?? "");
    setAufgaben(laden());
    setBereit(true);
  }, []);

  const aktualisieren = (neu: Aufgabe[]) => { setAufgaben(neu); speichern(neu); };

  const hinzufuegen = () => {
    if (!eingabe.trim()) return;
    aktualisieren([...aufgaben, { id: Date.now(), text: eingabe.trim(), person, erledigt: false, erledigtVon: "" }]);
    benachrichtigen(profil, `✅ Aufgabe für ${person}`, eingabe.trim());
    setEingabe("");
  };

  const umschalten = (id: number) =>
    aktualisieren(aufgaben.map(a => a.id === id
      ? { ...a, erledigt: !a.erledigt, erledigtVon: !a.erledigt ? profil : "" }
      : a));

  const loeschen = (id: number) => aktualisieren(aufgaben.filter(a => a.id !== id));

  const gefiltert = filter === "Alle" ? aufgaben : aufgaben.filter(a => a.person === filter);

  if (!bereit) return null;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/home" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-xl font-bold text-gray-800">✅ Aufgaben</h1>
      </header>

      <div className="max-w-md mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <input
            value={eingabe}
            onChange={e => setEingabe(e.target.value)}
            onKeyDown={e => e.key === "Enter" && hinzufuegen()}
            placeholder="Neue Aufgabe..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <div className="flex gap-2">
            {["Miriam", "Jan", "Franz"].map(p => (
              <button
                key={p}
                onClick={() => setPerson(p)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
                  ${person === p ? PERSON_FARBEN[p] + " ring-2 ring-offset-1 ring-yellow-400" : "bg-gray-100 text-gray-500"}`}
              >
                {p}
              </button>
            ))}
            <button onClick={hinzufuegen} className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 font-medium">+</button>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          {PERSONEN.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1 rounded-full text-sm ${filter === p ? "bg-gray-800 text-white" : "bg-white text-gray-500 shadow-sm"}`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {gefiltert.length === 0 && (
            <div className="px-4 py-6 text-center text-gray-400">Keine Aufgaben 🎉</div>
          )}
          {gefiltert.map(a => (
            <div key={a.id} className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 ${a.erledigt ? "opacity-50" : ""}`}>
              <button
                onClick={() => umschalten(a.id)}
                className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-white text-xs transition-colors
                  ${a.erledigt ? "bg-yellow-400 border-yellow-400" : "border-gray-300 hover:border-yellow-400"}`}
              >
                {a.erledigt ? "✓" : ""}
              </button>
              <span className={`flex-1 text-gray-700 ${a.erledigt ? "line-through" : ""}`}>{a.text}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${PERSON_FARBEN[a.person]}`}>{a.person}</span>
              {a.erledigtVon && <span className="text-sm">{PROFIL_EMOJI[a.erledigtVon]}</span>}
              <button onClick={() => loeschen(a.id)} className="text-gray-300 hover:text-red-400 ml-1">✕</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
