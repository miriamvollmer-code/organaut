"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

type Notiz = { id: number; titel: string; inhalt: string; farbe: string; von: string; geaendert: string };

const FARBEN = ["bg-yellow-100", "bg-blue-100", "bg-green-100", "bg-pink-100", "bg-purple-100"];
const PROFIL_EMOJI: Record<string, string> = { miriam: "👩", jan: "👨", franz: "🧒" };

export default function Notizen() {
  const [notizen, setNotizen] = useState<Notiz[]>([]);
  const [offen, setOffen] = useState<Notiz | null>(null);
  const [neu, setNeu] = useState(false);
  const [titel, setTitel] = useState("");
  const [inhalt, setInhalt] = useState("");
  const [farbe, setFarbe] = useState(FARBEN[0]);
  const [profil, setProfil] = useState("");

  useEffect(() => {
    setProfil(localStorage.getItem("organaut-profil") ?? "");
    laden();
  }, []);

  const laden = async () => {
    const { data } = await supabase.from("notizen").select("*").order("id");
    if (data) setNotizen(data);
  };

  const speichernNotiz = async () => {
    if (!titel.trim()) return;
    const jetzt = new Date().toLocaleString("de-DE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
    if (offen) {
      await supabase.from("notizen").update({ titel, inhalt, von: profil, geaendert: jetzt }).eq("id", offen.id);
      setNotizen(prev => prev.map(n => n.id === offen.id ? { ...n, titel, inhalt, von: profil, geaendert: jetzt } : n));
    } else {
      const { data } = await supabase.from("notizen").insert({ titel, inhalt, farbe, von: profil, geaendert: jetzt }).select().single();
      if (data) setNotizen(prev => [...prev, data]);
    }
    setOffen(null);
    setNeu(false);
    setTitel("");
    setInhalt("");
  };

  const loeschen = async (id: number) => {
    await supabase.from("notizen").delete().eq("id", id);
    setNotizen(prev => prev.filter(n => n.id !== id));
    setOffen(null);
  };

  const bearbeiten = (n: Notiz) => {
    setOffen(n); setTitel(n.titel); setInhalt(n.inhalt); setFarbe(n.farbe); setNeu(false);
  };

  if (offen || neu) {
    return (
      <main className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button onClick={() => { setOffen(null); setNeu(false); setTitel(""); setInhalt(""); }} className="text-gray-400 hover:text-gray-600">← Zurück</button>
          <div className="flex gap-2">
            {offen && <button onClick={() => loeschen(offen.id)} className="text-red-400 hover:text-red-600 text-sm">Löschen</button>}
            <button onClick={speichernNotiz} className="bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-600">Speichern</button>
          </div>
        </header>
        <div className="max-w-md mx-auto p-4">
          <div className="flex gap-2 mb-3">
            {FARBEN.map(f => (
              <button key={f} onClick={() => setFarbe(f)} className={`w-7 h-7 rounded-full ${f} ${farbe === f ? "ring-2 ring-offset-1 ring-gray-400" : ""}`} />
            ))}
          </div>
          <input value={titel} onChange={e => setTitel(e.target.value)} placeholder="Titel..." className="w-full text-xl font-semibold border-0 bg-transparent focus:outline-none mb-3 text-gray-800"/>
          <textarea value={inhalt} onChange={e => setInhalt(e.target.value)} placeholder="Notiz schreiben..." rows={12} className="w-full border-0 bg-transparent focus:outline-none text-gray-700 resize-none"/>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/home" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-xl font-bold text-gray-800">📝 Notizen</h1>
        <button onClick={() => { setNeu(true); setTitel(""); setInhalt(""); setFarbe(FARBEN[0]); }} className="ml-auto bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-600">+ Neu</button>
      </header>

      <div className="max-w-md mx-auto p-4 grid grid-cols-2 gap-3">
        {notizen.map(n => (
          <button key={n.id} onClick={() => bearbeiten(n)} className={`${n.farbe} rounded-2xl p-4 text-left shadow-sm hover:shadow-md transition-shadow`}>
            <div className="font-semibold text-gray-800 mb-1 truncate">{n.titel}</div>
            <div className="text-sm text-gray-600 line-clamp-3">{n.inhalt}</div>
            {(n.von || n.geaendert) && (
              <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                {n.von && <span>{PROFIL_EMOJI[n.von]}</span>}
                {n.geaendert && <span>{n.geaendert}</span>}
              </div>
            )}
          </button>
        ))}
        {notizen.length === 0 && (
          <div className="col-span-2 text-center text-gray-400 py-12">Noch keine Notizen</div>
        )}
      </div>
    </main>
  );
}
