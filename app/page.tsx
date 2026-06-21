"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const STANDARD_PINS: Record<string, string> = { miriam: "1234", jan: "1234", franz: "1234" };
const PINS_KEY = "organaut-pins";

function ladePins(): Record<string, string> {
  try { const r = localStorage.getItem(PINS_KEY); return r ? JSON.parse(r) : STANDARD_PINS; }
  catch { return STANDARD_PINS; }
}

const BerlinSkyline = () => (
  <svg viewBox="0 0 400 200" width="100%" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} preserveAspectRatio="xMidYMax meet">
    <defs>
      <filter id="weich"><feGaussianBlur stdDeviation="1.5"/></filter>
      <linearGradient id="baumGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6A8A5A" stopOpacity="0.85"/>
        <stop offset="100%" stopColor="#4A6A3A" stopOpacity="0.95"/>
      </linearGradient>
      <linearGradient id="wasserGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7AA0B8" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#5A8098" stopOpacity="0.3"/>
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="22" rx="38" ry="14" fill="white" opacity="0.45" filter="url(#weich)"/>
    <ellipse cx="78" cy="16" rx="28" ry="11" fill="white" opacity="0.35" filter="url(#weich)"/>
    <ellipse cx="280" cy="18" rx="45" ry="16" fill="white" opacity="0.45" filter="url(#weich)"/>
    <ellipse cx="320" cy="26" rx="32" ry="12" fill="white" opacity="0.38" filter="url(#weich)"/>
    <rect x="0" y="60" width="72" height="140" fill="#B0A088"/>
    <rect x="0" y="58" width="72" height="5" fill="#C0B098"/>
    <rect x="0" y="55" width="72" height="4" fill="#A89878"/>
    <rect x="8" y="44" width="18" height="16" fill="#A89878"/>
    <rect x="46" y="48" width="16" height="12" fill="#A89878"/>
    <rect x="22" y="62" width="28" height="80" fill="#B8A890" opacity="0.6"/>
    <rect x="20" y="60" width="32" height="4" fill="#C8B8A0"/>
    {[6,32,54].map((x,i) => (<g key={i}><rect x={x} y="70" width="12" height="16" rx="5" fill="#8CAABA" opacity="0.5"/><path d={`M${x} 77 Q${x+6} 72 ${x+12} 77`} fill="#C8B890" opacity="0.4"/><rect x={x} y="95" width="12" height="16" rx="5" fill="#8CAABA" opacity="0.45"/><rect x={x} y="120" width="12" height="15" rx="4" fill="#8CAABA" opacity="0.4"/><rect x={x} y="143" width="12" height="14" rx="4" fill="#8CAABA" opacity="0.35"/></g>))}
    <rect x="26" y="162" width="20" height="38" rx="10" fill="#7A6A50"/>
    <rect x="22" y="60" width="3" height="140" fill="#C0B098" opacity="0.4"/>
    <rect x="47" y="60" width="3" height="140" fill="#C0B098" opacity="0.4"/>
    <rect x="70" y="78" width="56" height="122" fill="#A89880"/>
    <rect x="70" y="75" width="56" height="5" fill="#B8A890"/>
    <path d="M70 72 L80 55 L116 55 L126 72Z" fill="#907860"/>
    <rect x="90" y="58" width="10" height="12" rx="5" fill="#8CAABA" opacity="0.5"/>
    {[76,96,112].map((x,i) => (<g key={i}><rect x={x} y="87" width="11" height="15" rx="5" fill="#8CAABA" opacity="0.45"/><rect x={x} y="109" width="11" height="14" rx="4" fill="#8CAABA" opacity="0.4"/><rect x={x} y="130" width="11" height="14" rx="4" fill="#8CAABA" opacity="0.38"/><rect x={x} y="150" width="11" height="13" rx="4" fill="#8CAABA" opacity="0.35"/></g>))}
    <rect x="86" y="168" width="16" height="32" rx="8" fill="#6A5A40"/>
    <rect x="192" y="50" width="5" height="150" fill="#7A6A5A" opacity="0.8"/>
    <path d="M188 130 L192 50 L197 50 L201 130Z" fill="#8A7A6A" opacity="0.7"/>
    <ellipse cx="194" cy="72" r="16" fill="#9A8A7A" opacity="0.85"/>
    <ellipse cx="194" cy="72" r="10" fill="#B0A090" opacity="0.6"/>
    <circle cx="191" cy="68" r="4" fill="white" opacity="0.35"/>
    <line x1="194" y1="50" x2="194" y2="20" stroke="#7A6A5A" strokeWidth="2.5" opacity="0.7"/>
    <line x1="194" y1="20" x2="194" y2="8" stroke="#7A6A5A" strokeWidth="1.5" opacity="0.6"/>
    <rect x="184" y="88" width="20" height="8" rx="4" fill="#8A7A6A" opacity="0.65"/>
    <rect x="210" y="68" width="60" height="132" fill="#A8A090"/>
    <rect x="210" y="64" width="60" height="6" fill="#B8B0A0"/>
    <path d="M225 60 L240 44 L255 60Z" fill="#887860"/>
    {[218,238,258].map((x,i) => (<g key={i}><rect x={x} y="75" width="12" height="17" rx="6" fill="#8CAABA" opacity="0.45"/><rect x={x} y="100" width="12" height="16" rx="5" fill="#8CAABA" opacity="0.4"/><rect x={x} y="123" width="12" height="15" rx="5" fill="#8CAABA" opacity="0.38"/><rect x={x} y="145" width="12" height="14" rx="4" fill="#8CAABA" opacity="0.35"/></g>))}
    <rect x="230" y="168" width="18" height="32" rx="9" fill="#7A6A50"/>
    <rect x="268" y="56" width="65" height="144" fill="#B0A888"/>
    <rect x="316" y="36" width="20" height="168" fill="#A8A080"/>
    <path d="M316 36 L326 18 L336 36Z" fill="#887858"/>
    {[319].map((x,i) => (<g key={i}><rect x={x} y="44" width="8" height="12" rx="4" fill="#8CAABA" opacity="0.5"/><rect x={x} y="64" width="8" height="12" rx="4" fill="#8CAABA" opacity="0.45"/><rect x={x} y="84" width="8" height="12" rx="4" fill="#8CAABA" opacity="0.4"/><rect x={x} y="104" width="8" height="12" rx="4" fill="#8CAABA" opacity="0.38"/></g>))}
    {[274,292,306].map((x,i) => (<g key={i}><rect x={x} y="65" width="11" height="15" rx="5" fill="#8CAABA" opacity="0.42"/><rect x={x} y="87" width="11" height="14" rx="4" fill="#8CAABA" opacity="0.38"/><rect x={x} y="108" width="11" height="14" rx="4" fill="#8CAABA" opacity="0.35"/><rect x={x} y="128" width="11" height="13" rx="4" fill="#8CAABA" opacity="0.32"/></g>))}
    <rect x="280" y="168" width="18" height="32" rx="9" fill="#6A5A40"/>
    <rect x="336" y="74" width="64" height="126" fill="#A09888"/>
    <rect x="336" y="70" width="64" height="5" fill="#B0A898"/>
    {[342,358,374,388].map((x,i) => (<g key={i}><rect x={x} y="80" width="10" height="14" rx="5" fill="#8CAABA" opacity="0.4"/><rect x={x} y="101" width="10" height="13" rx="4" fill="#8CAABA" opacity="0.37"/><rect x={x} y="120" width="10" height="13" rx="4" fill="#8CAABA" opacity="0.34"/><rect x={x} y="140" width="10" height="12" rx="4" fill="#8CAABA" opacity="0.31"/></g>))}
    <rect x="352" y="168" width="16" height="32" rx="8" fill="#6A5A40"/>
    <rect x="60" y="148" width="5" height="52" fill="#6A5230" opacity="0.7"/>
    <ellipse cx="62" cy="140" rx="18" ry="22" fill="url(#baumGrad)" opacity="0.82"/>
    <ellipse cx="56" cy="148" rx="12" ry="16" fill="#5A7A4A" opacity="0.6"/>
    <ellipse cx="70" cy="145" rx="11" ry="15" fill="#6A8A5A" opacity="0.65"/>
    <rect x="155" y="152" width="5" height="48" fill="#6A5230" opacity="0.7"/>
    <ellipse cx="157" cy="143" rx="20" ry="23" fill="url(#baumGrad)" opacity="0.78"/>
    <ellipse cx="149" cy="152" rx="13" ry="17" fill="#4A6A3A" opacity="0.55"/>
    <ellipse cx="166" cy="149" rx="12" ry="15" fill="#5A7A4A" opacity="0.6"/>
    <rect x="173" y="156" width="4" height="44" fill="#6A5230" opacity="0.65"/>
    <ellipse cx="175" cy="148" rx="15" ry="18" fill="url(#baumGrad)" opacity="0.75"/>
    <rect x="358" y="150" width="5" height="50" fill="#6A5230" opacity="0.7"/>
    <ellipse cx="360" cy="141" rx="19" ry="22" fill="url(#baumGrad)" opacity="0.8"/>
    <ellipse cx="352" cy="149" rx="13" ry="16" fill="#4A6A3A" opacity="0.55"/>
    <ellipse cx="369" cy="147" rx="12" ry="15" fill="#6A8A5A" opacity="0.62"/>
    <rect x="108" y="158" width="4" height="42" fill="#6A5230" opacity="0.6"/>
    <ellipse cx="110" cy="151" rx="14" ry="17" fill="url(#baumGrad)" opacity="0.7"/>
    <rect x="0" y="192" width="400" height="8" fill="#8A8070" opacity="0.55"/>
    <rect x="0" y="183" width="400" height="9" fill="#9A9080" opacity="0.4"/>
    <line x1="88" y1="140" x2="88" y2="192" stroke="#5A4830" strokeWidth="2.5" opacity="0.55"/>
    <path d="M84 140 Q88 134 92 140" stroke="#5A4830" strokeWidth="2" fill="none" opacity="0.55"/>
    <circle cx="88" cy="134" r="5" fill="#D4B860" opacity="0.6"/>
    <line x1="310" y1="135" x2="310" y2="192" stroke="#5A4830" strokeWidth="2.5" opacity="0.55"/>
    <path d="M306 135 Q310 129 314 135" stroke="#5A4830" strokeWidth="2" fill="none" opacity="0.55"/>
    <circle cx="310" cy="129" r="5" fill="#D4B860" opacity="0.6"/>
    <path d="M0 186 Q100 180 200 186 Q300 192 400 186 L400 200 L0 200Z" fill="url(#wasserGrad)"/>
  </svg>
);

const Bulldogge = ({ variante }: { variante: "miriam" | "jan" | "franz" }) => {
  const fell = "#8B3A0E", fellHell = "#B5541E", fellMittel = "#9B4414", fellDunkel = "#5A2008";
  const nase = "#1A0800", auge = "#0D0500", augWeiss = "#F5EDD6";

  if (variante === "miriam") return (
    <svg viewBox="0 0 130 130" width="80" height="80">
      <ellipse cx="65" cy="96" rx="38" ry="24" fill={fellMittel}/><ellipse cx="65" cy="94" rx="34" ry="20" fill={fellHell}/>
      <ellipse cx="65" cy="56" rx="34" ry="32" fill={fellHell}/><ellipse cx="42" cy="62" rx="14" ry="12" fill={fellMittel}/><ellipse cx="88" cy="62" rx="14" ry="12" fill={fellMittel}/>
      <path d="M32 44 Q20 52 24 66 Q32 58 34 50Z" fill={fellDunkel}/><path d="M98 44 Q110 52 106 66 Q98 58 96 50Z" fill={fellDunkel}/>
      <path d="M46 40 Q65 34 84 40" stroke={fellDunkel} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M50 47 Q65 42 80 47" stroke={fellDunkel} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <ellipse cx="49" cy="54" rx="11" ry="12" fill={augWeiss}/><ellipse cx="81" cy="54" rx="11" ry="12" fill={augWeiss}/>
      <ellipse cx="50" cy="55" rx="8" ry="9" fill="#3D1A00"/><ellipse cx="82" cy="55" rx="8" ry="9" fill="#3D1A00"/>
      <ellipse cx="50" cy="56" rx="5" ry="6" fill={auge}/><ellipse cx="82" cy="56" rx="5" ry="6" fill={auge}/>
      <circle cx="46" cy="51" r="3" fill="white"/><circle cx="78" cy="51" r="3" fill="white"/>
      <path d="M40 47 Q44 43 49 44" stroke={fellDunkel} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M90 47 Q86 43 81 44" stroke={fellDunkel} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="65" cy="68" rx="11" ry="7.5" fill={nase}/>
      <path d="M53 77 Q65 86 77 77" stroke={nase} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="38" cy="68" rx="9" ry="6" fill="#E8A0BF" opacity="0.55"/><ellipse cx="92" cy="68" rx="9" ry="6" fill="#E8A0BF" opacity="0.55"/>
      <path d="M38 34 Q65 25 92 34" stroke="#C4847A" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <circle cx="65" cy="27" r="6" fill="#A05060"/>
      <text x="65" y="31" fontSize="7" textAnchor="middle">🐻</text>
      <ellipse cx="44" cy="114" rx="13" ry="8" fill={fellMittel}/><ellipse cx="86" cy="114" rx="13" ry="8" fill={fellMittel}/>
    </svg>
  );

  if (variante === "jan") return (
    <svg viewBox="0 0 130 130" width="80" height="80">
      <ellipse cx="65" cy="98" rx="42" ry="25" fill={fell}/><ellipse cx="65" cy="96" rx="38" ry="21" fill={fellMittel}/>
      <ellipse cx="65" cy="55" rx="37" ry="34" fill={fellMittel}/><ellipse cx="40" cy="63" rx="16" ry="13" fill={fell}/><ellipse cx="90" cy="63" rx="16" ry="13" fill={fell}/>
      <path d="M28 42 Q15 53 20 68 Q29 59 31 48Z" fill={fellDunkel}/><path d="M102 42 Q115 53 110 68 Q101 59 99 48Z" fill={fellDunkel}/>
      <path d="M42 38 Q65 30 88 38" stroke={fellDunkel} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M46 46 Q65 39 84 46" stroke={fellDunkel} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M50 53 Q65 48 80 53" stroke={fellDunkel} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <ellipse cx="49" cy="55" rx="12" ry="10" fill={augWeiss}/><ellipse cx="81" cy="55" rx="12" ry="10" fill={augWeiss}/>
      <ellipse cx="50" cy="56" rx="9" ry="7.5" fill="#2A1200"/><ellipse cx="82" cy="56" rx="9" ry="7.5" fill="#2A1200"/>
      <ellipse cx="50" cy="57" rx="6" ry="5" fill={auge}/><ellipse cx="82" cy="57" rx="6" ry="5" fill={auge}/>
      <circle cx="46" cy="52" r="3.5" fill="white"/><circle cx="78" cy="52" r="3.5" fill="white"/>
      <rect x="36" y="48" width="26" height="17" rx="5" fill="none" stroke="#4A3820" strokeWidth="2.2"/>
      <rect x="68" y="48" width="26" height="17" rx="5" fill="none" stroke="#4A3820" strokeWidth="2.2"/>
      <line x1="62" y1="55" x2="68" y2="55" stroke="#4A3820" strokeWidth="2"/>
      <line x1="36" y1="55" x2="30" y2="53" stroke="#4A3820" strokeWidth="2"/>
      <line x1="94" y1="55" x2="100" y2="53" stroke="#4A3820" strokeWidth="2"/>
      <path d="M39 46 Q49 42 58 46" stroke={fellDunkel} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M72 46 Q81 42 91 46" stroke={fellDunkel} strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="65" cy="69" rx="13" ry="9" fill={nase}/>
      <path d="M52 79 Q65 76 78 79" stroke={nase} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="36" cy="70" rx="9" ry="6" fill="#7BA7D4" opacity="0.4"/><ellipse cx="94" cy="70" rx="9" ry="6" fill="#7BA7D4" opacity="0.4"/>
      <rect x="32" y="85" width="66" height="9" rx="4.5" fill="#4A6A8A" opacity="0.9"/>
      <rect x="62" y="81" width="2" height="8" fill="#C8B870" opacity="0.9"/>
      <circle cx="63" cy="80" r="4" fill="#C8B870" opacity="0.9"/>
      <ellipse cx="42" cy="116" rx="16" ry="9" fill={fell}/><ellipse cx="88" cy="116" rx="16" ry="9" fill={fell}/>
    </svg>
  );

  return (
    <svg viewBox="0 0 130 130" width="80" height="80">
      <ellipse cx="65" cy="96" rx="37" ry="23" fill={fellMittel}/><ellipse cx="65" cy="94" rx="33" ry="19" fill={fellHell}/>
      <ellipse cx="65" cy="55" rx="33" ry="31" fill={fellHell}/><ellipse cx="43" cy="61" rx="13" ry="11" fill={fellMittel}/><ellipse cx="87" cy="61" rx="13" ry="11" fill={fellMittel}/>
      <path d="M32 43 Q21 52 25 65 Q33 57 35 48Z" fill={fellDunkel}/><path d="M98 43 Q109 52 105 65 Q97 57 95 48Z" fill={fellDunkel}/>
      <path d="M46 40 Q65 34 84 40" stroke={fellDunkel} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55"/>
      <ellipse cx="49" cy="53" rx="13" ry="14" fill={augWeiss}/><ellipse cx="81" cy="53" rx="13" ry="14" fill={augWeiss}/>
      <ellipse cx="50" cy="54" rx="10" ry="11" fill="#4A2200"/><ellipse cx="82" cy="54" rx="10" ry="11" fill="#4A2200"/>
      <ellipse cx="50" cy="55" rx="7" ry="8" fill={auge}/><ellipse cx="82" cy="55" rx="7" ry="8" fill={auge}/>
      <circle cx="45" cy="49" r="4" fill="white"/><circle cx="77" cy="49" r="4" fill="white"/>
      <path d="M38 46 Q43 41 49 43" stroke={fellDunkel} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M92 46 Q87 41 81 43" stroke={fellDunkel} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="65" cy="67" rx="10" ry="7" fill={nase}/>
      <path d="M50 76 Q65 88 80 76" stroke={nase} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="62" y="76" width="5" height="6" rx="1.5" fill={augWeiss}/>
      <ellipse cx="38" cy="66" rx="9" ry="6" fill="#7AA870" opacity="0.55"/><ellipse cx="92" cy="66" rx="9" ry="6" fill="#7AA870" opacity="0.55"/>
      <ellipse cx="78" cy="30" rx="23" ry="9" fill="#D4642A" transform="rotate(-14 78 30)"/>
      <rect x="56" y="22" width="42" height="13" rx="6" fill="#D4642A" transform="rotate(-14 77 28)"/>
      <rect x="53" y="32" width="48" height="5" rx="2.5" fill="#B84E18" transform="rotate(-14 77 34)"/>
      <text x="73" y="32" fontSize="7.5" fill="white" fontWeight="bold" transform="rotate(-14 73 32)">BVG</text>
      <ellipse cx="43" cy="113" rx="13" ry="8" fill={fellMittel}/><ellipse cx="87" cy="113" rx="13" ry="8" fill={fellMittel}/>
    </svg>
  );
};

const PROFILE = [
  { id: "miriam", name: "Miriam", farbe: "#C4847A", hintergrund: "#F5E8E0", bild: "/Miriam.png", variante: "miriam" as const },
  { id: "jan",    name: "Jan",    farbe: "#7A9EB4", hintergrund: "#E0EAF0", bild: "/Jan.png",    variante: "jan" as const },
  { id: "franz",  name: "Franz",  farbe: "#C47A3A", hintergrund: "#F0E8DC", bild: "/Franz.png",  variante: "franz" as const },
];

export default function ProfilAuswahl() {
  const router = useRouter();
  const [ausgewaehlt, setAusgewaehlt] = useState<typeof PROFILE[0] | null>(null);
  const [pin, setPin] = useState("");
  const [fehler, setFehler] = useState(false);
  const [pins, setPins] = useState(STANDARD_PINS);

  useEffect(() => { setPins(ladePins()); }, []);

  const profilWaehlen = (p: typeof PROFILE[0]) => {
    setAusgewaehlt(p);
    setPin("");
    setFehler(false);
  };

  const pinPruefen = () => {
    if (pin === pins[ausgewaehlt!.id]) {
      localStorage.setItem("organaut-profil", ausgewaehlt!.id);
      router.push("/home");
    } else {
      setFehler(true);
      setPin("");
    }
  };

  const zifferDruecken = (z: string) => {
    if (pin.length >= 4) return;
    const neu = pin + z;
    setPin(neu);
    setFehler(false);
    if (neu.length === 4) {
      setTimeout(() => {
        if (neu === pins[ausgewaehlt!.id]) {
          localStorage.setItem("organaut-profil", ausgewaehlt!.id);
          router.push("/home");
        } else {
          setFehler(true);
          setPin("");
        }
      }, 200);
    }
  };

  const profil = ausgewaehlt ? PROFILE.find(p => p.id === ausgewaehlt.id)! : null;

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#C8BEA0" }}>
      {/* Berlin-Hintergrundbild */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <img src="/berlin.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: 0.55 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(168,196,216,0.3) 0%, rgba(238,232,216,0.55) 100%)" }} />
      </div>

      <div className="flex flex-col items-center justify-center flex-1 px-6 py-10" style={{ position: "relative", zIndex: 1 }}>

        {!ausgewaehlt ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-1" style={{ color: "#2C1408", fontFamily: "Georgia, serif" }}>Organaut</h1>
              <p className="text-sm mt-1" style={{ color: "#5A3818", fontFamily: "Georgia, serif", fontStyle: "italic" }}>Wer macht was</p>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {PROFILE.map((p) => (
                <button key={p.id} onClick={() => profilWaehlen(p)}
                  className="flex items-center gap-5 rounded-3xl px-5 py-4 transition-transform hover:scale-105 active:scale-95"
                  style={{ background: p.hintergrund, border: `2px solid ${p.farbe}`, boxShadow: `0 6px 20px ${p.farbe}44` }}>
                  <img src={p.bild} alt={p.name} style={{ width: 80, height: 80, objectFit: "contain" }} />
                  <span className="text-2xl font-bold" style={{ color: "#2C1408", fontFamily: "Georgia, serif" }}>{p.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full max-w-xs">
            <button onClick={() => setAusgewaehlt(null)} className="self-start mb-4 text-sm" style={{ color: "#5A3818", fontFamily: "Georgia, serif" }}>← Zurück</button>

            <div className="rounded-3xl px-8 py-6 w-full text-center" style={{ background: profil!.hintergrund, border: `2px solid ${profil!.farbe}`, boxShadow: `0 6px 20px ${profil!.farbe}44` }}>
              <img src={profil!.bild} alt={profil!.name} style={{ width: 96, height: 96, objectFit: "contain", margin: "0 auto" }} />
              <p className="text-xl font-bold mt-2 mb-6" style={{ color: "#2C1408", fontFamily: "Georgia, serif" }}>{profil!.name}</p>

              {/* PIN-Punkte */}
              <div className="flex justify-center gap-4 mb-6">
                {[0,1,2,3].map(i => (
                  <div key={i} className="w-4 h-4 rounded-full transition-all"
                    style={{ background: pin.length > i ? "#2C1408" : fehler ? "#C4484A" : "#D4C4A0", transform: pin.length === i+1 ? "scale(1.3)" : "scale(1)" }} />
                ))}
              </div>

              {fehler && <p className="text-sm mb-4" style={{ color: "#C4484A", fontFamily: "Georgia, serif" }}>Falsche PIN — versuch nochmal</p>}

              {/* Numpad */}
              <div className="grid grid-cols-3 gap-3">
                {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((z, i) => (
                  <button key={i} onClick={() => z === "⌫" ? setPin(p => p.slice(0,-1)) : z ? zifferDruecken(z) : undefined}
                    disabled={!z}
                    className="h-14 rounded-2xl text-xl font-medium transition-transform active:scale-90"
                    style={{ background: z ? "rgba(255,255,255,0.7)" : "transparent", color: "#2C1408", border: z ? `1px solid ${profil!.farbe}44` : "none", fontFamily: "Georgia, serif" }}>
                    {z}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs" style={{ color: "#7A5838", fontStyle: "italic", fontFamily: "Georgia, serif" }}>
          Berlin, {new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
    </main>
  );
}
