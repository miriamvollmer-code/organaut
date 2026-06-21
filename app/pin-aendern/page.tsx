"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const PINS_KEY = "organaut-pins";
const STANDARD = { miriam: "1234", jan: "1234", franz: "1234" };
const NAMEN: Record<string, string> = { miriam: "Miriam", jan: "Jan", franz: "Franz" };

function ladePins() {
  try { const r = localStorage.getItem(PINS_KEY); return r ? JSON.parse(r) : { ...STANDARD }; }
  catch { return { ...STANDARD }; }
}

export default function PinAendern() {
  const [profil, setProfil] = useState("");
  const [pins, setPins] = useState<Record<string, string>>(STANDARD);
  const [schritt, setSchritt] = useState<"alt" | "neu" | "bestaetigen">("alt");
  const [eingabe, setEingabe] = useState("");
  const [neuPin, setNeuPin] = useState("");
  const [fehler, setFehler] = useState("");
  const [erfolg, setErfolg] = useState(false);

  useEffect(() => {
    setProfil(localStorage.getItem("organaut-profil") ?? "");
    setPins(ladePins());
  }, []);

  const zifferDruecken = (z: string) => {
    if (eingabe.length >= 4) return;
    const neu = eingabe + z;
    setEingabe(neu);
    setFehler("");

    if (neu.length === 4) {
      setTimeout(() => {
        if (schritt === "alt") {
          if (neu === pins[profil]) { setSchritt("neu"); setEingabe(""); }
          else { setFehler("Falsche PIN"); setEingabe(""); }
        } else if (schritt === "neu") {
          setNeuPin(neu); setSchritt("bestaetigen"); setEingabe("");
        } else {
          if (neu === neuPin) {
            const aktuell = ladePins();
            aktuell[profil] = neu;
            localStorage.setItem(PINS_KEY, JSON.stringify(aktuell));
            setPins(aktuell);
            setErfolg(true);
          } else {
            setFehler("PINs stimmen nicht überein");
            setSchritt("neu");
            setEingabe("");
            setNeuPin("");
          }
        }
      }, 200);
    }
  };

  const TITEL: Record<string, string> = {
    alt: "Aktuelle PIN eingeben",
    neu: "Neue PIN wählen",
    bestaetigen: "Neue PIN bestätigen",
  };

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #C8D8E4 0%, #EEE8D8 100%)" }}>
      <header className="px-6 py-4 flex items-center gap-3" style={{ background: "rgba(250,245,233,0.85)", borderBottom: "1px solid #D4C4A0" }}>
        <Link href="/home" className="text-gray-400 hover:text-gray-600">←</Link>
        <h1 className="text-xl font-bold" style={{ color: "#3A1E08", fontFamily: "Georgia, serif" }}>🔑 PIN ändern</h1>
      </header>

      <div className="max-w-xs mx-auto p-6 flex flex-col items-center">
        {erfolg ? (
          <div className="text-center mt-12">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-xl font-bold mb-2" style={{ color: "#3A1E08", fontFamily: "Georgia, serif" }}>PIN geändert!</p>
            <p className="text-sm mb-8" style={{ color: "#6B4A28", fontFamily: "Georgia, serif" }}>Die neue PIN für {NAMEN[profil]} ist gespeichert.</p>
            <Link href="/home" className="px-6 py-3 rounded-2xl text-white" style={{ background: "#8B5E3C", fontFamily: "Georgia, serif" }}>Zurück</Link>
          </div>
        ) : (
          <>
            <p className="text-sm mt-8 mb-6 text-center" style={{ color: "#6B4A28", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              {NAMEN[profil]} — {TITEL[schritt]}
            </p>

            {/* PIN-Punkte */}
            <div className="flex justify-center gap-4 mb-4">
              {[0,1,2,3].map(i => (
                <div key={i} className="w-4 h-4 rounded-full transition-all"
                  style={{ background: eingabe.length > i ? "#2C1408" : fehler ? "#C4484A" : "#D4C4A0", transform: eingabe.length === i+1 ? "scale(1.3)" : "scale(1)" }} />
              ))}
            </div>

            {fehler && <p className="text-sm mb-4 text-center" style={{ color: "#C4484A", fontFamily: "Georgia, serif" }}>{fehler}</p>}

            {/* Fortschritt */}
            <div className="flex gap-2 mb-6">
              {["alt","neu","bestaetigen"].map((s,i) => (
                <div key={s} className="h-1 w-8 rounded-full" style={{ background: ["alt","neu","bestaetigen"].indexOf(schritt) >= i ? "#8B5E3C" : "#D4C4A0" }} />
              ))}
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-3 w-full">
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((z, i) => (
                <button key={i} onClick={() => z === "⌫" ? setEingabe(p => p.slice(0,-1)) : z ? zifferDruecken(z) : undefined}
                  disabled={!z}
                  className="h-14 rounded-2xl text-xl font-medium transition-transform active:scale-90"
                  style={{ background: z ? "rgba(255,255,255,0.8)" : "transparent", color: "#2C1408", border: z ? "1px solid #D4C4A088" : "none", fontFamily: "Georgia, serif" }}>
                  {z}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
