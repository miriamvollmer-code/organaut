"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type Foto = { id: number; data: string; beschriftung: string; von: string; datum: string };

const STORAGE_KEY = "organaut-fotos";
const PROFIL_EMOJI: Record<string, string> = { miriam: "👩", jan: "👨", franz: "🧒" };

function laden(): Foto[] {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : []; }
  catch { return []; }
}
function speichern(f: Foto[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(f)); return true; }
  catch { return false; } // localStorage voll
}

function bildZuBase64(datei: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Bild verkleinern vor dem Speichern
    const img = new Image();
    const url = URL.createObjectURL(datei);
    img.onload = () => {
      const MAX = 800;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function Fotos() {
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [ausgewaehlt, setAusgewaehlt] = useState<Foto | null>(null);
  const [profil, setProfil] = useState("");
  const [fehler, setFehler] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfil(localStorage.getItem("organaut-profil") ?? "");
    setFotos(laden());
  }, []);

  const hochladen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateien = Array.from(e.target.files ?? []);
    setFehler("");
    for (const datei of dateien) {
      try {
        const data = await bildZuBase64(datei);
        const neuesFoto: Foto = {
          id: Date.now() + Math.random(),
          data,
          beschriftung: datei.name.replace(/\.[^.]+$/, ""),
          von: profil,
          datum: new Date().toLocaleDateString("de-DE", { day: "numeric", month: "short" }),
        };
        setFotos(prev => {
          const neu = [...prev, neuesFoto];
          if (!speichern(neu)) {
            setFehler("Speicher fast voll — ältere Fotos löschen um Platz zu schaffen.");
            return prev;
          }
          return neu;
        });
      } catch {
        setFehler("Foto konnte nicht geladen werden.");
      }
    }
    e.target.value = "";
  };

  const beschriftungAendern = (id: number, text: string) => {
    setFotos(prev => {
      const neu = prev.map(f => f.id === id ? { ...f, beschriftung: text } : f);
      speichern(neu);
      return neu;
    });
    if (ausgewaehlt?.id === id) setAusgewaehlt(prev => prev ? { ...prev, beschriftung: text } : null);
  };

  const loeschen = (id: number) => {
    setFotos(prev => {
      const neu = prev.filter(f => f.id !== id);
      speichern(neu);
      return neu;
    });
    setAusgewaehlt(null);
    setFehler("");
  };

  if (ausgewaehlt) {
    return (
      <main className="min-h-screen bg-black flex flex-col">
        <header className="px-4 py-3 flex items-center justify-between">
          <button onClick={() => setAusgewaehlt(null)} className="text-white text-lg">← Zurück</button>
          <div className="text-white text-sm opacity-60">{ausgewaehlt.datum} {ausgewaehlt.von && PROFIL_EMOJI[ausgewaehlt.von]}</div>
          <button onClick={() => loeschen(ausgewaehlt.id)} className="text-red-400 text-sm">Löschen</button>
        </header>
        <img src={ausgewaehlt.data} alt={ausgewaehlt.beschriftung} className="flex-1 object-contain" />
        <div className="p-4">
          <input
            value={ausgewaehlt.beschriftung}
            onChange={e => beschriftungAendern(ausgewaehlt.id, e.target.value)}
            className="w-full bg-white/10 text-white rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Beschriftung..."
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center gap-3">
        <Link href="/home" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-xl font-bold text-gray-800">📷 Fotos</h1>
        <button onClick={() => inputRef.current?.click()} className="ml-auto bg-pink-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-pink-600">+ Fotos</button>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={hochladen} />
      </header>

      {fehler && (
        <div className="max-w-md mx-auto mx-4 mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {fehler}
        </div>
      )}

      <div className="max-w-md mx-auto p-4">
        {fotos.length === 0 ? (
          <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-pink-400 transition-colors">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-gray-400">Fotos hochladen</div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {fotos.map(f => (
              <button key={f.id} onClick={() => setAusgewaehlt(f)} className="aspect-square overflow-hidden rounded-lg relative">
                <img src={f.data} alt={f.beschriftung} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                {f.von && <span className="absolute bottom-1 right-1 text-xs">{PROFIL_EMOJI[f.von]}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
