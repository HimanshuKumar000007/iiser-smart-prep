import React, { useState, useMemo } from 'react';
import { 
  Star, 
  BarChart3, 
  Atom, 
  Layers, 
  FlaskConical, 
  BookOpen, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Lightbulb,
  Zap,
  TrendingUp,
  RefreshCw,
  Sparkles,
  ZapOff
} from 'lucide-react';

// ─── LOCAL SUB-COMPONENTS ───────────────────────────────────────────────────

function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' | 'pink' }) {
  const styles = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function SectionBanner({ label, color = 'cyan' }: { label: string; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500',
    rose: 'bg-rose-500/10 text-rose-400 border-l-2 border-rose-500',
    amber: 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500',
    violet: 'bg-violet-500/10 text-violet-400 border-l-2 border-violet-500',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500',
  };

  return (
    <div className={`px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider ${styles[color]}`}>
      {label}
    </div>
  );
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 flex gap-3 text-[13px] text-white/70 leading-relaxed">
      <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      <div>
        <span className="text-cyan-400 font-bold block mb-0.5">Gold Tip / Insight</span>
        {children}
      </div>
    </div>
  );
}

function WarningCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 flex gap-3 text-[13px] text-white/70 leading-relaxed">
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
      <div>
        <span className="text-rose-400 font-bold block mb-0.5">{title}</span>
        {children}
      </div>
    </div>
  );
}

function Collapsible({ 
  title, 
  icon, 
  accent = 'cyan', 
  defaultOpen = false, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  accent?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald'; 
  defaultOpen?: boolean; 
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colors = {
    cyan: {
      border: 'border-white/8 hover:border-cyan-500/30',
      activeBorder: 'border-cyan-500/30',
      bg: 'bg-[#0b1220]/20',
      text: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10'
    },
    rose: {
      border: 'border-white/8 hover:border-rose-500/30',
      activeBorder: 'border-rose-500/30',
      bg: 'bg-[#180a0f]/20',
      text: 'text-rose-400',
      iconBg: 'bg-rose-500/10'
    },
    amber: {
      border: 'border-white/8 hover:border-amber-500/30',
      activeBorder: 'border-amber-500/30',
      bg: 'bg-[#151007]/20',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    },
    violet: {
      border: 'border-white/8 hover:border-violet-500/30',
      activeBorder: 'border-violet-500/30',
      bg: 'bg-[#120b20]/20',
      text: 'text-violet-400',
      iconBg: 'bg-violet-500/10'
    },
    emerald: {
      border: 'border-white/8 hover:border-emerald-500/30',
      activeBorder: 'border-emerald-500/30',
      bg: 'bg-[#0b2014]/20',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10'
    }
  };

  const style = colors[accent];

  return (
    <div className={`border rounded-3xl transition-all duration-300 overflow-hidden ${isOpen ? `${style.activeBorder} ${style.bg}` : style.border}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left select-none"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${style.iconBg} ${style.text} shrink-0`}>
            {icon}
          </div>
          <span className="text-[14.5px] font-black text-white leading-tight tracking-wide">{title}</span>
        </div>
        <div className={`text-[11px] font-bold uppercase tracking-wider shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''} ${style.text}`}>
          {isOpen ? 'Collapse ▲' : 'Expand ▼'}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 hover:border-white/15 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-white/45">Formula / Rule</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-2.5 h-2.5 ${i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10'}`} />
          ))}
        </span>
      </div>
      <p className="text-cyan-300 font-mono font-bold text-[13.5px] leading-snug" dangerouslySetInnerHTML={{ __html: formula }} />
      <p className="text-white/80 text-[11px]"><strong className="text-white/40">Use:</strong> {use}</p>
      <p className="text-white/55 text-[11px]"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
    </div>
  );
}

// ─── PARTIAL DATA & MODELS FOR METALS ──────────────────────────────────────────

interface MetalSystem {
  symbol: string;
  name: string;
  e0: number; // Standard Reduction Potential
  n: number;  // Ion charge / electrons
  color: string;
}

const METALS_DB: Record<string, MetalSystem> = {
  Zn: { symbol: 'Zn', name: 'Zinc (Zn²⁺/Zn)', e0: -0.76, n: 2, color: '#f43f5e' },
  Fe: { symbol: 'Fe', name: 'Iron (Fe²⁺/Fe)', e0: -0.44, n: 2, color: '#fb923c' },
  Ni: { symbol: 'Ni', name: 'Nickel (Ni²⁺/Ni)', e0: -0.25, n: 2, color: '#fbbf24' },
  H2: { symbol: 'H₂', name: 'SHE (2H⁺/H₂)', e0: 0.00, n: 2, color: '#a78bfa' },
  Cu: { symbol: 'Cu', name: 'Copper (Cu²⁺/Cu)', e0: 0.34, n: 2, color: '#38bdf8' },
  Ag: { symbol: 'Ag', name: 'Silver (Ag⁺/Ag)', e0: 0.80, n: 1, color: '#34d399' }
};

export default function ElectrochemistryDetail({ 
  progress, 
  isCompleted, 
  onNavigate 
}: { 
  progress: number; 
  isCompleted: boolean; 
  onNavigate?: (dir: 'prev' | 'next') => void; 
}) {

  // ─── SIMULATOR 1 STATE ───────────────────────────────────────────────────────
  const [anodeKey, setAnodeKey] = useState<string>('Zn');
  const [cathodeKey, setCathodeKey] = useState<string>('Cu');
  const [anodeConc, setAnodeConc] = useState<number>(0.1);
  const [cathodeConc, setCathodeConc] = useState<number>(1.0);

  // ─── SIMULATOR 2 STATE ───────────────────────────────────────────────────────
  const [electrolyteType, setElectrolyteType] = useState<'strong' | 'weak'>('strong');
  const [conc, setConc] = useState<number>(0.1); // Molarity

  // ─── COMPUTATIONS FOR SIMULATOR 1 ──────────────────────────────────────────
  const anode = METALS_DB[anodeKey] || METALS_DB.Zn;
  const cathode = METALS_DB[cathodeKey] || METALS_DB.Cu;

  const e0Cell = cathode.e0 - anode.e0;

  // Least common multiple of charges for overall n
  const cellN = useMemo(() => {
    if (anode.n === cathode.n) return anode.n;
    return anode.n * cathode.n;
  }, [anode, cathode]);

  // Reaction Quotient Q calculation
  const Q = useMemo(() => {
    const anodePower = cellN / anode.n;
    const cathodePower = cellN / cathode.n;
    return Math.pow(anodeConc, anodePower) / Math.pow(cathodeConc, cathodePower);
  }, [anodeConc, cathodeConc, anode, cathode, cellN]);

  const nernstShift = (0.05915 / cellN) * Math.log10(Q);
  const eCell = e0Cell - nernstShift;

  const deltaG = -cellN * 96.485 * eCell; // kJ/mol
  const deltaG0 = -cellN * 96.485 * e0Cell; // kJ/mol

  const eqConstant = useMemo(() => {
    const exponent = (cellN * e0Cell) / 0.05915;
    if (exponent > 30) return '> 10³⁰';
    if (exponent < -30) return '< 10⁻³⁰';
    return Math.pow(10, exponent).toExponential(3);
  }, [cellN, e0Cell]);

  // ─── COMPUTATIONS FOR SIMULATOR 2 ──────────────────────────────────────────
  const L_m0 = electrolyteType === 'strong' ? 150 : 390.5; // S cm2/mol
  const computedStats = useMemo(() => {
    const sqrtC = Math.sqrt(conc);
    if (electrolyteType === 'strong') {
      const A = 60; // constant
      const L_m = Math.max(20, L_m0 - A * sqrtC);
      const conductivity = (L_m * conc) / 1000; // S/cm
      return { L_m, conductivity, alpha: 1, Ka: null };
    } else {
      const Ka = 1.8e-5;
      const a = (-Ka + Math.sqrt(Ka * Ka + 4 * conc * Ka)) / (2 * conc);
      const alpha = Math.min(1.0, a);
      const L_m = L_m0 * alpha;
      const conductivity = (L_m * conc) / 1000;
      return { L_m, conductivity, alpha, Ka };
    }
  }, [electrolyteType, conc, L_m0]);

  // ─── HELPERS FOR SIMULATOR 2 FORMATTING ─────────────────────────────────────
  const formatValue = (num: number) => {
    if (num >= 0.001) return num.toFixed(4);
    const exponent = Math.floor(Math.log10(num));
    const base = num / Math.pow(10, exponent);
    return (
      <span className="font-sans">
        {base.toFixed(3)} &times; 10<sup>{exponent}</sup>
      </span>
    );
  };

  const formatConcentration = (value: number) => {
    if (value === 1.0) return "1.0 M";
    if (value === 0.1) return "0.1 M";
    const exponent = Math.round(Math.log10(value));
    if (Math.abs(value - Math.pow(10, exponent)) < 1e-9) {
      return (
        <span className="font-sans">
          10<sup>{exponent}</sup> M
        </span>
      );
    }
    return value.toFixed(4) + " M";
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 mt-2 pb-32 lg:pb-8 px-2 sm:px-4 lg:px-0 text-white/90">
      
      {/* ── HEADER SNAPSHOT ────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#090b16] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Tag color="violet">Chemistry Unit 3</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="amber">High Weightage</Tag>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">Electrochemistry</h1>
          <p className="text-xs text-white/50 mt-1">Spontaneous cell thermodynamics, ion migration mechanics, and electrolysis stoichiometry.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <div className="text-right">
            <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Est. Study Time</span>
            <span className="text-xs sm:text-sm font-extrabold text-cyan-400 font-mono">25 Minutes</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <span className="text-[10px] text-white/40 block font-bold uppercase tracking-wider">Revision Level</span>
            <span className="text-xs sm:text-sm font-extrabold text-emerald-400 font-mono">Deep Review</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: CORE CONCEPTS & CELL TYPES ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            1. Core Concept & Cell Classification
          </h2>
          <SectionBanner label="Conversions" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Electrochemistry is the study of chemical processes that cause electrons to move. This movement of electrons is called electricity, which can be generated by movements of electrons from one element to another in a reaction known as an oxidation-reduction (redox) reaction.
          </p>

          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2 sm:p-3">Feature</th>
                  <th className="p-2 sm:p-3">Galvanic (Voltaic) Cell</th>
                  <th className="p-2 sm:p-3">Electrolytic Cell</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Energy Conversion</td>
                  <td className="p-2 sm:p-3 text-emerald-400 font-medium">Chemical Energy ➔ Electrical Energy</td>
                  <td className="p-2 sm:p-3 text-cyan-400 font-medium">Electrical Energy ➔ Chemical Energy</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Spontaneity</td>
                  <td className="p-2 sm:p-3">Spontaneous (&Delta;G &lt; 0, E<sub>cell</sub> &gt; 0)</td>
                  <td className="p-2 sm:p-3">Non-spontaneous (&Delta;G &gt; 0, E<sub>cell</sub> &lt; 0)</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Anode Polarity</td>
                  <td className="p-2 sm:p-3 text-rose-400">Negative (−) | Oxidation place</td>
                  <td className="p-2 sm:p-3 text-rose-400">Positive (+) | Oxidation place</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Cathode Polarity</td>
                  <td className="p-2 sm:p-3 text-cyan-400">Positive (+) | Reduction place</td>
                  <td className="p-2 sm:p-3 text-cyan-400">Negative (−) | Reduction place</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProTip>
            <strong>Memory Hack: AN OX & RED CAT</strong><br />
            Oxidation always occurs at the <strong>Anode</strong> (<code className="text-white">AN OX</code>).<br />
            Reduction always occurs at the <strong>Cathode</strong> (<code className="text-white">RED CAT</code>).<br />
            This rule remains absolutely identical for both Galvanic and Electrolytic cells.
          </ProTip>
        </div>
      </div>

      {/* ── SECTION 2: GALVANIC CELLS & CELL NOTATION ─────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            2. Galvanic Cell Structure & Cell Notation
          </h2>
          <SectionBanner label="Cell Setup" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            A Galvanic cell generates electrical energy from spontaneous chemical redox processes. The classic example is the <strong>Daniell Cell</strong>, which utilizes the oxidation of Zinc metal and reduction of Copper ions.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">Standard Cell Notation:</h3>
          <p>
            An electrochemical cell is described using a notation that lists components from anode (left) to cathode (right):
          </p>
          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold">
            Anode Electrode &nbsp;|&nbsp; Anode Solution (C<sub>1</sub>) &nbsp;&bull;&bull;&nbsp; Cathode Solution (C<sub>2</sub>) &nbsp;|&nbsp; Cathode Electrode
          </div>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li><code className="text-white">|</code> represents a <strong>phase boundary</strong> between electrode and solution.</li>
            <li><code className="text-white">||</code> represents the <strong>salt bridge</strong> or liquid-junction potential boundary.</li>
            <li>Concentrations (molarities) or gas pressures are written in parentheses next to the ions.</li>
          </ul>

          <WarningCard title="Salt Bridge Functionality & Ion Migration">
            A salt bridge is a U-shaped tube filled with a concentrated gel containing an inert electrolyte like <code className="text-white">KCl</code>, <code className="text-white">KNO₃</code>, or <code className="text-white">NH₄NO₃</code>.
            <ul className="list-disc pl-5 space-y-1 mt-1 text-white/70">
              <li><strong>Circuit Connection</strong>: It completes the electrical path without mixing the solutions directly.</li>
              <li><strong>Electrical Neutrality</strong>: It prevents charge accumulation. <strong>Anions migrate toward the anode</strong> to neutralize the build-up of positive cations. <strong>Cations migrate toward the cathode</strong> to replace reduced cations.</li>
              <li><strong>Liquid Junction Potential</strong>: It minimizes the potential difference at the liquid-liquid interface.</li>
              <li><strong>Trap Warning</strong>: Electrons do <strong>not</strong> travel through the salt bridge; current is carried by ions. Electrons only travel through the external metallic wire!</li>
            </ul>
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 3: STANDARD HYDROGEN ELECTRODE (SHE) & SERIES ───────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-violet-400" />
            3. SHE & The Electrochemical Series
          </h2>
          <SectionBanner label="Potentials" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Because the absolute potential of a single electrode half-cell cannot be measured directly, standard potentials are measured relative to the <strong>Standard Hydrogen Electrode (SHE)</strong>, which is arbitrarily defined to have a potential of 0.00 V at all temperatures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <span className="text-[10px] font-black text-violet-400 tracking-wider uppercase block">SHE Representation</span>
              <p className="text-white/70">
                The SHE is written as:
              </p>
              <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs text-violet-300 font-semibold">
                Pt(s) &nbsp;|&nbsp; H<sub>2</sub>(g, 1 bar) &nbsp;|&nbsp; H<sup>+</sup>(aq, 1 M)
              </div>
              <p className="text-white/70">
                It consists of a platinum foil coated with finely divided platinum black. Hydrogen gas is bubbled through an acidic solution at standard conditions:
              </p>
              <ul className="list-disc pl-5 text-white/60 text-xs">
                <li>{"PH₂ = 1 bar (or 1 atm)"}</li>
                <li>{"[H⁺] = 1.0 M (or unit activity)"}</li>
                <li>{"E°red = E°ox = 0.00 V"}</li>
              </ul>
            </div>

            {/* Custom SVG of SHE */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
              <span className="text-[10.5px] font-black text-white/50 mb-3 uppercase tracking-wider text-center">Standard Hydrogen Electrode Structure</span>
              <svg width="240" height="150" viewBox="0 0 240 150" className="w-full max-w-[240px]">
                {/* Beaker */}
                <rect x="50" y="30" width="140" height="100" rx="4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                {/* Acid solution */}
                <rect x="52" y="60" width="136" height="68" fill="rgba(34,211,238,0.06)" />
                <text x="120" y="115" fill="rgba(34,211,238,0.4)" fontSize="8.5" textAnchor="middle">1.0 M H⁺(aq) Solution</text>
                
                {/* Glass Tube */}
                <rect x="100" y="10" width="40" height="100" rx="3" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="90" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.2)" />
                <text x="85" y="27" fill="white" fontSize="8" textAnchor="end">H₂ (1 bar)</text>
                <path d="M 90,25 L 110,25" stroke="rgba(255,255,255,0.2)" markerEnd="url(#arrow)" />

                {/* Platinum Wire & Foil */}
                <line x1="120" y1="15" x2="120" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="123" y="18" fill="#cbd5e1" fontSize="8">Pt wire</text>
                <rect x="112" y="90" width="16" height="20" fill="#334155" stroke="white" strokeWidth="1" />
                <text x="120" y="102" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">Pt Foil</text>

                {/* Bubbles */}
                <circle cx="110" cy="85" r="2.5" fill="none" stroke="rgba(255,255,255,0.4)" />
                <circle cx="130" cy="75" r="2" fill="none" stroke="rgba(255,255,255,0.4)" />
                <circle cx="115" cy="65" r="3" fill="none" stroke="rgba(255,255,255,0.4)" />
              </svg>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Interpretation of the Electrochemical Series:</h3>
          <p>
            {"Standard Reduction Potentials (E°red) are compiled with all half-reactions written as reductions."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">Large Positive E°red (e.g., F₂ = +2.87V)</span>
              <p className="text-xs text-white/70">
                Strong tendency to undergo reduction. The species acts as a <strong>powerful oxidizing agent</strong> (readily accepts electrons).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
              <span className="text-[10px] font-black text-emerald-400 block uppercase">Large Negative E°red (e.g., Li = -3.05V)</span>
              <p className="text-xs text-white/70">
                Strong tendency to undergo oxidation. The reduced form acts as a <strong>powerful reducing agent</strong> (readily donates electrons).
              </p>
            </div>
          </div>

          <ProTip>
            <strong>Spontaneous Galvanic Condition:</strong><br />
            Under standard conditions, the half-cell with the <strong>higher standard reduction potential</strong> always acts as the <strong>cathode</strong>, while the lower acts as the <strong>anode</strong>:<br />
            <div className="my-1.5 p-3.5 bg-black/35 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold">
              E&deg;<sub>cell</sub> = E&deg;<sub>cathode</sub> &minus; E&deg;<sub>anode</sub> &nbsp;&bull;&nbsp; where E&deg;<sub>cell</sub> &gt; 0 for spontaneity
            </div>
          </ProTip>

          <h3 className="text-sm font-bold text-white pt-2">Standard Electrochemical Series Reference Table (at 298 K):</h3>
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2">Reduction Half-Reaction</th>
                  <th className="p-2">E° (V)</th>
                  <th className="p-2">Strength / Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 text-[11px]">
                <tr className="bg-rose-500/5">
                  <td className="p-2">{"F₂ + 2e⁻ ➔ 2F⁻"}</td>
                  <td className="p-2 text-rose-400 font-bold">+2.87</td>
                  <td className="p-2 text-rose-300">Strongest Oxidizing Agent</td>
                </tr>
                <tr>
                  <td className="p-2">{"MnO₄⁻ + 8H⁺ + 5e⁻ ➔ Mn²⁺ + 4H₂O"}</td>
                  <td className="p-2 text-rose-400/80">+1.51</td>
                  <td className="p-2">Common analytical oxidant</td>
                </tr>
                <tr>
                  <td className="p-2">{"Cl₂ + 2e⁻ ➔ 2Cl⁻"}</td>
                  <td className="p-2 text-rose-400/80">+1.36</td>
                  <td className="p-2">Strong oxidant</td>
                </tr>
                <tr>
                  <td className="p-2">{"O₂ + 4H⁺ + 4e⁻ ➔ 2H₂O"}</td>
                  <td className="p-2 text-rose-400/80">+1.23</td>
                  <td className="p-2">Acidic oxygen reduction potential</td>
                </tr>
                <tr>
                  <td className="p-2">{"Ag⁺ + e⁻ ➔ Ag"}</td>
                  <td className="p-2 text-cyan-400">+0.80</td>
                  <td className="p-2">Weak oxidant / Noble metal</td>
                </tr>
                <tr>
                  <td className="p-2">{"Cu²⁺ + 2e⁻ ➔ Cu"}</td>
                  <td className="p-2 text-cyan-400">+0.34</td>
                  <td className="p-2">Spontaneous cathode vs. SHE</td>
                </tr>
                <tr className="bg-violet-500/5 font-bold">
                  <td className="p-2">{"2H⁺ + 2e⁻ ➔ H₂ (SHE)"}</td>
                  <td className="p-2 text-violet-400">0.00</td>
                  <td className="p-2 text-violet-300">Reference zero potential</td>
                </tr>
                <tr>
                  <td className="p-2">{"Pb²⁺ + 2e⁻ ➔ Pb"}</td>
                  <td className="p-2 text-emerald-400/80">-0.13</td>
                  <td className="p-2">Easier to oxidize than H₂</td>
                </tr>
                <tr>
                  <td className="p-2">{"Fe²⁺ + 2e⁻ ➔ Fe"}</td>
                  <td className="p-2 text-emerald-400/80">-0.44</td>
                  <td className="p-2">Corrosion anode reactive site</td>
                </tr>
                <tr>
                  <td className="p-2">{"Zn²⁺ + 2e⁻ ➔ Zn"}</td>
                  <td className="p-2 text-emerald-400/80">-0.76</td>
                  <td className="p-2">Sacrificial anode / galvanization</td>
                </tr>
                <tr>
                  <td className="p-2">{"Al³⁺ + 3e⁻ ➔ Al"}</td>
                  <td className="p-2 text-emerald-400/80">-1.66</td>
                  <td className="p-2">High energy density metal oxidation</td>
                </tr>
                <tr>
                  <td className="p-2">{"Na⁺ + e⁻ ➔ Na"}</td>
                  <td className="p-2 text-emerald-400/80">-2.71</td>
                  <td className="p-2">Highly electropositive alkali metal</td>
                </tr>
                <tr className="bg-emerald-500/5">
                  <td className="p-2">{"Li⁺ + e⁻ ➔ Li"}</td>
                  <td className="p-2 text-emerald-400 font-bold">-3.05</td>
                  <td className="p-2 text-emerald-300">Strongest Reducing Agent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: NERNST EQUATION & GIBBS FREE ENERGY ─────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            4. Nernst Equation & Cell Thermodynamics
          </h2>
          <SectionBanner label="Thermodynamics" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            The cell potential changes when ion concentrations deviate from 1 M or gas pressures deviate from 1 bar. The cell potential is related to concentration by the <strong>Nernst Equation</strong>.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">1. General Form of the Nernst Equation:</h3>
          <div className="p-4 bg-black/45 rounded-xl text-cyan-300">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold">
              <div className="flex items-center">
                <span className="mr-1.5">E<sub>cell</sub> = E&deg;<sub>cell</sub> &minus;</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">R &middot; T</span>
                  <span className="px-2 pt-0.5">n &middot; F</span>
                </div>
                <span className="ml-1.5">ln Q</span>
              </div>
              <span className="text-white/40">&rArr;</span>
              <div className="flex items-center">
                <span className="mr-1.5">E<sub>cell</sub> = E&deg;<sub>cell</sub> &minus;</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">2.303 &middot; R &middot; T</span>
                  <span className="px-2 pt-0.5">n &middot; F</span>
                </div>
                <span className="ml-1.5">log Q</span>
              </div>
            </div>
          </div>
          <p className="text-white/60">
            {"Where R = 8.314 J/(mol K), T is temperature in Kelvin, F = 96485 C/mol e⁻, n is the moles of electrons transferred, and Q is the reaction quotient."}
          </p>

          <h3 className="text-sm font-bold text-white pt-2">2. Simplified Form at 298 K (25°C):</h3>
          <div className="p-4 bg-black/45 rounded-xl text-cyan-300">
            <div className="flex items-center justify-center text-xs sm:text-sm font-semibold">
              <span className="mr-1.5">E<sub>cell</sub> = E&deg;<sub>cell</sub> &minus;</span>
              <div className="flex flex-col items-center">
                <span className="px-2 border-b border-white/20 pb-0.5">0.0591</span>
                <span className="px-2 pt-0.5">n</span>
              </div>
              <span className="ml-1.5">log Q</span>
            </div>
          </div>

          <WarningCard title="Rules for Writing Q in Electrochemistry">
            The reaction quotient Q must follow standard chemical equilibrium rules:
            <ul className="list-disc pl-5 space-y-1 mt-1 text-white/70">
              <li>Include only <strong>aqueous species</strong> (concentrations in M) and <strong>gaseous species</strong> (pressures in bar).</li>
              <li><strong>Omit all pure solids and pure liquids</strong> (their active mass is conventionally treated as 1).</li>
              <li>{"Example: For Zn(s) + Cu²⁺(aq) ➔ Zn²⁺(aq) + Cu(s), we have Q = [Zn²⁺]/[Cu²⁺]."}</li>
            </ul>
          </WarningCard>

          <h3 className="text-sm font-bold text-white pt-2">3. Individual Electrode Potential (Half-Cell Nernst):</h3>
          <p>
            {"For a metal electrode reduction half-reaction Mn⁺ + n e⁻ ➔ M(s), at 298 K:"}
          </p>
          <div className="p-4 bg-black/45 rounded-xl text-cyan-300">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold">
              <div className="flex items-center">
                <span className="mr-1.5">E = E&deg; &minus;</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">0.0591</span>
                  <span className="px-2 pt-0.5">n</span>
                </div>
                <span className="ml-1.5">log</span>
                <div className="flex flex-col items-center ml-1">
                  <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                  <span className="px-1 pt-0.5">[M<sup>n+</sup>]</span>
                </div>
              </div>
              <span className="text-white/40">&rArr;</span>
              <div className="flex items-center">
                <span className="mr-1.5">E = E&deg; +</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">0.0591</span>
                  <span className="px-2 pt-0.5">n</span>
                </div>
                <span className="ml-1.5">log [M<sup>n+</sup>]</span>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">4. Gibbs Free Energy & Equilibrium Relation:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="text-[10px] font-black text-rose-400 block uppercase mb-1">Spontaneous Energy</span>
              <div className="flex flex-wrap items-center justify-center gap-4 text-rose-300 font-semibold py-1">
                <span>&Delta;G = &minus;nFE<sub>cell</sub></span>
                <span className="text-white/20">&amp;</span>
                <span>&Delta;G&deg; = &minus;nFE&deg;<sub>cell</sub></span>
              </div>
            </div>
            <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="text-[10px] font-black text-cyan-400 block uppercase mb-1">Equilibrium Constant</span>
              <div className="flex items-center justify-center gap-1.5 text-cyan-300 font-semibold py-1">
                <span className="mr-1">log K<sub>eq</sub> =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">n &middot; E&deg;<sub>cell</sub></span>
                  <span className="px-2 pt-0.5">0.0591</span>
                </div>
                <span className="ml-1 text-[10px] text-white/40 font-normal">(at 298 K)</span>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">5. Concentration Cells:</h3>
          <p>
            A concentration cell consists of two half-cells of the same material but at different concentrations. Since electrodes are identical, the standard cell potential E°cell = 0. The potential is driven solely by dilution entropy:
          </p>
          <div className="p-4 bg-black/45 rounded-xl text-cyan-300">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
              <span>M &nbsp;|&nbsp; M<sup>n+</sup>(C<sub>1</sub>) &nbsp;&bull;&bull;&nbsp; M<sup>n+</sup>(C<sub>2</sub>) &nbsp;|&nbsp; M</span>
              <span className="text-white/40">&rArr;</span>
              <div className="flex items-center">
                <span className="mr-1.5">E<sub>cell</sub> =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">0.0591</span>
                  <span className="px-2 pt-0.5">n</span>
                </div>
                <span className="ml-1.5">log</span>
                <div className="flex flex-col items-center ml-1">
                  <span className="px-1.5 border-b border-white/20 pb-0.5">C<sub>2</sub></span>
                  <span className="px-1.5 pt-0.5">C<sub>1</sub></span>
                </div>
                <span className="ml-2 text-[10px] text-white/40 font-normal">(where C<sub>2</sub> &gt; C<sub>1</sub> for spontaneity)</span>
              </div>
            </div>
          </div>
          <p className="text-white/60 text-xs">
            The dilute side (C₁) acts as the <strong>anode</strong> (oxidation increases concentration) and the concentrated side (C₂) acts as the <strong>cathode</strong>.
          </p>
        </div>
      </div>

      {/* ── SIMULATOR 1: GALVANIC CELL & NERNST SIMULATOR ─────────────────── */}
      <div className="bg-[#070913] border border-white/8 rounded-3xl p-5 sm:p-6 space-y-6">
        <div>
          <span className="text-cyan-400 text-[10px] font-black tracking-widest uppercase block mb-1">Interactive Lab 1</span>
          <h3 className="text-white font-bold text-lg">Galvanic Cell & Nernst Equation Simulator</h3>
          <p className="text-white/50 text-xs mt-1">
            Choose anode/cathode metals and concentrations to calculate cell EMF, Gibbs free energy shifts, and equilibrium constants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-1 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">Controls</h4>
            
            {/* Anode Selection */}
            <div className="space-y-1">
              <label className="text-[11px] text-rose-400 font-bold block">Anode Half-Cell (Oxidation)</label>
              <select 
                value={anodeKey} 
                onChange={(e) => {
                  setAnodeKey(e.target.value);
                  if (e.target.value === cathodeKey) {
                    setCathodeKey(Object.keys(METALS_DB).find(k => k !== e.target.value) || 'Cu');
                  }
                }}
                className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
              >
                {Object.entries(METALS_DB).map(([k, m]) => (
                  <option key={k} value={k}>{m.name} [E° = {m.e0.toFixed(2)}V]</option>
                ))}
              </select>
            </div>

            {/* Cathode Selection */}
            <div className="space-y-1">
              <label className="text-[11px] text-cyan-400 font-bold block">Cathode Half-Cell (Reduction)</label>
              <select 
                value={cathodeKey} 
                onChange={(e) => {
                  setCathodeKey(e.target.value);
                  if (e.target.value === anodeKey) {
                    setAnodeKey(Object.keys(METALS_DB).find(k => k !== e.target.value) || 'Zn');
                  }
                }}
                className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {Object.entries(METALS_DB).map(([k, m]) => (
                  <option key={k} value={k} disabled={k === anodeKey}>{m.name} [E° = {m.e0.toFixed(2)}V]</option>
                ))}
              </select>
            </div>

            {/* Anode Concentration */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/50 font-bold">Anode [Mⁿ⁺]</span>
                <span className="text-rose-400 font-bold font-mono">{anodeConc.toFixed(4)} M</span>
              </div>
              <input 
                type="range" 
                min="-4" 
                max="0" 
                step="1"
                value={Math.log10(anodeConc)} 
                onChange={(e) => setAnodeConc(Math.pow(10, parseInt(e.target.value)))}
                className="w-full accent-rose-500 bg-white/10 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Cathode Concentration */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/50 font-bold">Cathode [Mⁿ⁺]</span>
                <span className="text-cyan-400 font-bold font-mono">{cathodeConc.toFixed(4)} M</span>
              </div>
              <input 
                type="range" 
                min="-4" 
                max="0" 
                step="1"
                value={Math.log10(cathodeConc)} 
                onChange={(e) => setCathodeConc(Math.pow(10, parseInt(e.target.value)))}
                className="w-full accent-cyan-500 bg-white/10 h-1 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Dynamic SVG Diagram & voltmeter */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 rounded-2xl bg-black/45 border border-white/5 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-white/40 block text-[9px] uppercase">Standard EMF (E°cell)</span>
                <span className="text-white font-bold">{e0Cell.toFixed(2)} V</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px] uppercase">Calculated EMF (Ecell)</span>
                <span className={`font-bold ${eCell >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {eCell.toFixed(4)} V {eCell < 0 && '(Non-Spontaneous)'}
                </span>
              </div>
              <div>
                <span className="text-rose-400/80 block text-[9px] uppercase">Gibbs Free Energy (ΔG)</span>
                <span className="text-white font-bold">{deltaG.toFixed(1)} kJ/mol</span>
              </div>
              <div>
                <span className="text-cyan-400/80 block text-[9px] uppercase">Equilibrium Keq</span>
                <span className="text-white font-bold">{eqConstant}</span>
              </div>
            </div>

            {/* Galvanic Cell Visualization */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
              <svg width="320" height="170" viewBox="0 0 320 170" className="w-full max-w-[320px]">
                {/* Anode Cup */}
                <rect x="20" y="60" width="90" height="80" rx="3" fill="none" stroke="rgba(244,63,94,0.3)" strokeWidth="2" />
                <rect x="22" y="90" width="86" height="48" fill="rgba(244,63,94,0.05)" />
                <text x="65" y="130" fill="rgba(244,63,94,0.5)" fontSize="9" textAnchor="middle">{anode.symbol}²⁺ Solution</text>
                
                {/* Cathode Cup */}
                <rect x="210" y="60" width="90" height="80" rx="3" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="2" />
                <rect x="212" y="90" width="86" height="48" fill="rgba(34,211,238,0.05)" />
                <text x="255" y="130" fill="rgba(34,211,238,0.5)" fontSize="9" textAnchor="middle">{cathode.symbol}ⁿ⁺ Solution</text>

                {/* Electrodes */}
                <rect x="50" y="30" width="16" height="85" fill={anode.color} stroke="white" strokeWidth="0.5" />
                <text x="58" y="110" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">Anode</text>
                <rect x="254" y="30" width="16" height="85" fill={cathode.color} stroke="white" strokeWidth="0.5" />
                <text x="262" y="110" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">Cathode</text>

                {/* Voltmeter / Wire Circuit */}
                <path d="M 58,30 L 58,15 L 140,15" fill="none" stroke="white" strokeWidth="1" />
                <path d="M 262,30 L 262,15 L 180,15" fill="none" stroke="white" strokeWidth="1" />
                <circle cx="160" cy="15" r="15" fill="#1e1b4b" stroke="white" strokeWidth="1" />
                <text x="160" y="19" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">{eCell.toFixed(2)}V</text>

                {/* Salt Bridge */}
                <path d="M 85,90 L 85,50 C 85,40 235,40 235,50 L 235,90" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="square" />
                <path d="M 85,90 L 85,50 C 85,40 235,40 235,50 L 235,90" fill="none" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="square" />
                <text x="160" y="47" fill="#64748b" fontSize="8.5" fontWeight="bold" textAnchor="middle">Salt Bridge</text>

                {/* Direction Arrows */}
                <path d="M 90,8 L 130,8" fill="none" stroke="#38bdf8" strokeWidth="1" markerEnd="url(#arrow)" />
                <text x="110" y="5" fill="#38bdf8" fontSize="7" textAnchor="middle">e⁻ flow</text>
                
                <path d="M 230,8 L 190,8" fill="none" stroke="#fbbf24" strokeWidth="1" markerEnd="url(#arrow)" />
                <text x="210" y="5" fill="#fbbf24" fontSize="7" textAnchor="middle">Current</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: CONDUCTANCE & MOLAR CONDUCTIVITY ────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            5. Conductance & Molar Conductivity
          </h2>
          <SectionBanner label="Conductivity" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            {"Electrolytic solutions conduct current via ion migration. The quantitative measures are resistance (R), conductance (G), conductivity (κ), and molar conductivity (Λm)."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">Conductivity (κ)</span>
              <div className="flex items-center text-xs sm:text-sm text-cyan-300 font-semibold py-1">
                <span className="mr-1.5">&kappa; =</span>
                <div className="flex flex-col items-center">
                  <span className="px-1.5 border-b border-white/20 pb-0.5">1</span>
                  <span className="px-1.5 pt-0.5">R</span>
                </div>
                <span className="mx-1.5">&middot;</span>
                <span className="text-[14px] font-light">(</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">l</span>
                  <span className="px-1 pt-0.5">A</span>
                </div>
                <span className="text-[14px] font-light">)</span>
                <span className="mx-1.5">=</span>
                <span>G &middot; G<sup>*</sup></span>
              </div>
              <p className="text-[11px] text-white/50">
                {"Where l/A is the Cell Constant (G*, in cm⁻¹). Units of κ: S cm⁻¹ or S m⁻¹."}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">Molar Conductivity (Λm)</span>
              <div className="flex items-center text-xs sm:text-sm text-cyan-300 font-semibold py-1">
                <span className="mr-1.5">&Lambda;<sub>m</sub> =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">1000 &middot; &kappa;</span>
                  <span className="px-2 pt-0.5">C</span>
                </div>
              </div>
              <p className="text-[11px] text-white/50">
                {"Where C is Molarity (mol L⁻¹). Units of Λm: S cm² mol⁻¹."}
              </p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Effect of Dilution on Conductivity Metrics:</h3>
          <ul className="list-disc pl-5 space-y-3 text-white/70">
            <li>
              {"Conductivity (κ) decreases with dilution: Dilution increases the solution volume, which reduces the number of current-carrying ions per unit volume."}
            </li>
            <li>
              {"Molar Conductivity (Λm) increases with dilution: This is because dilution reduces interionic interactions (strong electrolytes) or increases the degree of dissociation (weak electrolytes)."}
            </li>
          </ul>

          <h3 className="text-sm font-bold text-white pt-2">Strong vs. Weak Electrolyte Behavior:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10.5px] font-black text-cyan-300 block uppercase">Strong Electrolytes (Debye-Hückel-Onsager)</span>
              <p className="text-xs text-white/60">
                {"They dissociate completely at all concentrations. Molar conductivity increases linearly with √C:"}
              </p>
              <div className="p-2.5 bg-black/40 rounded-xl text-center text-xs text-cyan-200 font-semibold">
                &Lambda;<sub>m</sub> = &Lambda;<sub>m</sub>&deg; &minus; A&radic;C
              </div>
              <p className="text-[11px] text-white/50">
                {"Λm° is found by extrapolating the linear plot to zero concentration."}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10.5px] font-black text-rose-300 block uppercase">Weak Electrolytes (Ostwald Dilution)</span>
              <p className="text-xs text-white/60">
                {"They dissociate partially. As concentration drops, degree of dissociation (α) increases sharply:"}
              </p>
              <div className="p-2.5 bg-black/40 rounded-xl text-rose-200">
                <div className="flex flex-wrap items-center justify-center gap-3 font-semibold text-xs sm:text-sm">
                  <div className="flex items-center">
                    <span className="mr-1.5">&alpha; =</span>
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">&Lambda;<sub>m</sub></span>
                      <span className="px-1 pt-0.5">&Lambda;<sub>m</sub>&deg;</span>
                    </div>
                  </div>
                  <span className="text-white/20">&amp;</span>
                  <div className="flex items-center">
                    <span className="mr-1.5">K<sub>a</sub> =</span>
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">C &middot; &alpha;<sup>2</sup></span>
                      <span className="px-1 pt-0.5">1 &minus; &alpha;</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-white/50 text-rose-300/80">
                {"Λm° cannot be found by extrapolation (curve goes vertical). Kohlrausch's law must be used."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SIMULATOR 2: MOLAR CONDUCTIVITY DILUTION WIDGET ───────────────── */}
      <div className="bg-[#070913] border border-white/8 rounded-3xl p-5 sm:p-6 space-y-6">
        <div>
          <span className="text-cyan-400 text-[10px] font-black tracking-widest uppercase block mb-1">Interactive Lab 2</span>
          <h3 className="text-white font-bold text-lg">Electrolyte Conductivity & Dilution Simulator</h3>
          <p className="text-white/50 text-xs mt-1">
            Compare Strong (linear) vs. Weak (exponential) electrolyte response to concentration shifts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-1 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">Controls</h4>

            {/* Electrolyte Type */}
            <div className="space-y-1">
              <label className="text-[11px] text-white/50 font-bold block">Electrolyte Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setElectrolyteType('strong')}
                  className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all ${electrolyteType === 'strong' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300' : 'bg-transparent border-white/10 text-white/40 hover:text-white'}`}
                >
                  Strong (KCl)
                </button>
                <button
                  onClick={() => setElectrolyteType('weak')}
                  className={`py-2 px-3 text-xs rounded-xl border font-bold transition-all ${electrolyteType === 'weak' ? 'bg-rose-500/10 border-rose-500 text-rose-300' : 'bg-transparent border-white/10 text-white/40 hover:text-white'}`}
                >
                  Weak (CH₃COOH)
                </button>
              </div>
            </div>

            {/* Concentration (Molarity) Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/50 font-bold">Concentration (C)</span>
                <span className="text-cyan-400 font-bold font-mono">{formatConcentration(conc)}</span>
              </div>
              <input 
                type="range" 
                min="-4" 
                max="0" 
                step="0.25"
                value={Math.log10(conc)} 
                onChange={(e) => setConc(Math.pow(10, parseFloat(e.target.value)))}
                className="w-full accent-cyan-400 bg-white/10 h-1 rounded-lg cursor-pointer"
              />
              {/* Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setConc(0.0001)}
                  className={`text-[9px] px-2 py-0.5 rounded border transition-all ${Math.abs(conc - 0.0001) < 1e-6 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-white/5 text-white/50 hover:text-white/80'}`}
                >
                  10⁻⁴ M
                </button>
                <button
                  onClick={() => setConc(0.001)}
                  className={`text-[9px] px-2 py-0.5 rounded border transition-all ${Math.abs(conc - 0.001) < 1e-6 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-white/5 text-white/50 hover:text-white/80'}`}
                >
                  10⁻³ M
                </button>
                <button
                  onClick={() => setConc(0.01)}
                  className={`text-[9px] px-2 py-0.5 rounded border transition-all ${Math.abs(conc - 0.01) < 1e-6 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-white/5 text-white/50 hover:text-white/80'}`}
                >
                  10⁻² M
                </button>
                <button
                  onClick={() => setConc(0.1)}
                  className={`text-[9px] px-2 py-0.5 rounded border transition-all ${Math.abs(conc - 0.1) < 1e-6 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-white/5 text-white/50 hover:text-white/80'}`}
                >
                  0.1 M
                </button>
                <button
                  onClick={() => setConc(1.0)}
                  className={`text-[9px] px-2 py-0.5 rounded border transition-all ${Math.abs(conc - 1.0) < 1e-6 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-white/5 text-white/50 hover:text-white/80'}`}
                >
                  1.0 M
                </button>
              </div>
            </div>

            <div className="p-3 bg-black/45 border border-white/5 rounded-xl space-y-2 text-[11.5px]">
              <div>
                <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">Conductivity (&kappa;)</span>
                <span className="text-white font-bold font-mono">{formatValue(computedStats.conductivity)} S/cm</span>
              </div>
              <div>
                <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">Molar Conductivity (&Lambda;<sub>m</sub>)</span>
                <span className="text-cyan-300 font-bold font-mono">{computedStats.L_m.toFixed(1)} S cm²/mol</span>
              </div>
              {electrolyteType === 'weak' && (
                <>
                  <div>
                    <span className="text-rose-400 block text-[9px] uppercase font-bold tracking-wider">Degree of Dissociation (&alpha;)</span>
                    <span className="text-white font-bold font-mono">{(computedStats.alpha * 100).toFixed(2)}%</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase font-bold tracking-wider">Dissociation Constant (K<sub>a</sub>)</span>
                    <span className="text-white font-bold font-mono">1.8 &times; 10<sup>&minus;5</sup></span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dilution Plot Graph */}
          <div className="md:col-span-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center">
            <span className="text-[10.5px] font-black text-white/50 mb-3 uppercase tracking-wider text-center flex items-center gap-1.5">
              Molar Conductivity (&Lambda;<sub>m</sub>) vs. Square Root of Concentration (&radic;C)
            </span>
            <svg width="340" height="200" viewBox="0 0 340 200" className="w-full max-w-[340px]">
              <defs>
                <linearGradient id="strongGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="weakGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="55" y1="20" x2="315" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
              <line x1="55" y1="160" x2="315" y2="160" stroke="rgba(255,255,255,0.1)" />
              <line x1="55" y1="20" x2="55" y2="160" stroke="rgba(255,255,255,0.1)" />
              <line x1="315" y1="20" x2="315" y2="160" stroke="rgba(255,255,255,0.05)" />

              {/* Dynamic crosshair dashed lines */}
              {(() => {
                const isStrong = electrolyteType === 'strong';
                const limit = isStrong ? 150 : 390.5;
                const x = 55 + Math.sqrt(conc) * 260;
                const y = 160 - (computedStats.L_m / limit) * 140;
                return (
                  <>
                    <line x1="55" y1={y} x2={x} y2={y} stroke={isStrong ? "rgba(34,211,238,0.3)" : "rgba(244,63,94,0.3)"} strokeDasharray="2,2" strokeWidth="1" />
                    <line x1={x} y1={y} x2={x} y2="160" stroke={isStrong ? "rgba(34,211,238,0.3)" : "rgba(244,63,94,0.3)"} strokeDasharray="2,2" strokeWidth="1" />
                  </>
                );
              })()}

              {/* Gradient fills under curves */}
              {electrolyteType === 'strong' && (
                <path d="M 55,40 L 315,140 L 315,160 L 55,160 Z" fill="url(#strongGrad)" />
              )}
              {electrolyteType === 'weak' && (
                <path d="M 55,22 Q 60,120 315,150 L 315,160 L 55,160 Z" fill="url(#weakGrad)" />
              )}

              {/* Dynamic curves */}
              {/* Strong Electrolyte line (linear decline) */}
              <path d="M 55,40 L 315,140" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="1" />
              {electrolyteType === 'strong' && (
                <>
                  <path d="M 55,40 L 315,140" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                  {/* Current point */}
                  {(() => {
                    const x = 55 + Math.sqrt(conc) * 260;
                    const y = 160 - (computedStats.L_m / 150) * 140;
                    return <circle cx={x} cy={y} r="5.5" fill="#22d3ee" stroke="#070913" strokeWidth="1.5" className="animate-pulse" />;
                  })()}
                </>
              )}

              {/* Weak Electrolyte curve (curved decline) */}
              <path d="M 55,22 Q 60,120 315,150" fill="none" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />
              {electrolyteType === 'weak' && (
                <>
                  <path d="M 55,22 Q 60,120 315,150" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                  {/* Current point */}
                  {(() => {
                    const x = 55 + Math.sqrt(conc) * 260;
                    const y = 160 - (computedStats.L_m / 390.5) * 140;
                    return <circle cx={x} cy={y} r="5.5" fill="#f43f5e" stroke="#070913" strokeWidth="1.5" className="animate-pulse" />;
                  })()}
                </>
              )}

              {/* Axis tick labels using tspan to prevent rendering issues and overlap */}
              <text x="50" y="24" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="end">
                &Lambda;<tspan fontSize="6.5" dy="1.5">m</tspan><tspan fontSize="9" dy="-1.5">&deg;</tspan> (Weak)
              </text>
              <text x="50" y="44" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="end">
                &Lambda;<tspan fontSize="6.5" dy="1.5">m</tspan><tspan fontSize="9" dy="-1.5">&deg;</tspan> (Strong)
              </text>
              <text x="315" y="172" fill="rgba(255,255,255,0.7)" fontSize="8.5" textAnchor="middle">1.0 (Concentrated)</text>
              <text x="55" y="172" fill="rgba(255,255,255,0.7)" fontSize="8.5" textAnchor="middle">0 (Infinite Dilution)</text>
              
              <text x="18" y="90" fill="rgba(255,255,255,0.5)" fontSize="9.5" transform="rotate(-90 18 90)" textAnchor="middle">
                Molar Conductivity (&Lambda;<tspan fontSize="7.5" dy="1.5">m</tspan>)
              </text>
              <text x="185" y="188" fill="rgba(255,255,255,0.5)" fontSize="9.5" textAnchor="middle">Square Root of Conc (&radic;C)</text>
            </svg>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: KOHLRAUSCH'S LAW & APPLICATIONS ────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            6. Kohlrausch's Law of Independent Migration
          </h2>
          <SectionBanner label="Independent Migration" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Kohlrausch's law states that at infinite dilution, the molar conductivity of an electrolyte is equal to the sum of the individual molar conductivities of its constituent cations and anions.
          </p>
          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold">
            &Lambda;<sub>m</sub>&deg; = &nu;<sub>+</sub> &middot; &lambda;<sub>+</sub>&deg; + &nu;<sub>&minus;</sub> &middot; &lambda;<sub>&minus;</sub>&deg;
          </div>
          <p className="text-white/60">
            Where &nu;<sub>+</sub> and &nu;<sub>&minus;</sub> are the stoichiometric coefficients of cations and anions respectively, and &lambda;<sub>+</sub>&deg; and &lambda;<sub>&minus;</sub>&deg; are their limiting molar conductivities.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">The Four Key Applications of Kohlrausch's Law:</h3>
          <div className="space-y-3">
            {/* App 1 */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-cyan-400 block uppercase">1. Limiting Molar Conductivity of Weak Electrolytes</span>
              <p className="text-xs text-white/70">
                You can combine limiting conductivity values of strong electrolytes algebraically to find the value of a weak electrolyte:
              </p>
              <div className="p-3 bg-black/30 rounded-xl text-center text-xs sm:text-sm text-cyan-200 font-semibold">
                &Lambda;<sub>m</sub>&deg;(CH<sub>3</sub>COOH) = &Lambda;<sub>m</sub>&deg;(CH<sub>3</sub>COONa) + &Lambda;<sub>m</sub>&deg;(HCl) &minus; &Lambda;<sub>m</sub>&deg;(NaCl)
              </div>
            </div>

            {/* App 2 */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-cyan-400 block uppercase">2. Degree of Dissociation (α)</span>
              <p className="text-xs text-white/70">
                The ratio of molar conductivity at concentration C to the limiting molar conductivity gives the dissociation fraction:
              </p>
              <div className="p-3 bg-black/30 rounded-xl text-cyan-200 flex items-center justify-center gap-1.5 font-semibold text-xs sm:text-sm">
                <span>&alpha; =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">&Lambda;<sub>m</sub></span>
                  <span className="px-2 pt-0.5">&Lambda;<sub>m</sub>&deg;</span>
                </div>
              </div>
            </div>

            {/* App 3 */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-cyan-400 block uppercase">3. Dissociation Constant (Ka)</span>
              <p className="text-xs text-white/70">
                Using Ostwald's dilution law:
              </p>
              <div className="p-3.5 bg-black/30 rounded-xl text-cyan-200 flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm">
                <span>K<sub>a</sub> =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">C &middot; &alpha;<sup>2</sup></span>
                  <span className="px-2 pt-0.5">1 &minus; &alpha;</span>
                </div>
                <span className="mx-1.5">=</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">C &middot; (&Lambda;<sub>m</sub>)<sup>2</sup></span>
                  <span className="px-2 pt-0.5">&Lambda;<sub>m</sub>&deg; &middot; (&Lambda;<sub>m</sub>&deg; &minus; &Lambda;<sub>m</sub>)</span>
                </div>
              </div>
            </div>

            {/* App 4 */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-cyan-400 block uppercase">4. Solubility of Sparingly Soluble Salts</span>
              <p className="text-xs text-white/70">
                {"For saturated solutions of sparingly soluble salts (like AgCl or BaSO₄), the concentration is equal to solubility (S). Since they are extremely dilute, limiting conductivity approx equals molar conductivity:"}
              </p>
              <div className="p-3 bg-black/30 rounded-xl text-cyan-200 flex items-center justify-center gap-1.5 font-semibold text-xs sm:text-sm">
                <span>S =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">1000 &middot; &kappa;</span>
                  <span className="px-2 pt-0.5">&Lambda;<sub>m</sub>&deg;</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Transport Number & Ionic Mobility:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-300 block uppercase">Transport Number (t₊, t₋)</span>
              <p className="text-xs text-white/70">
                The fraction of the total electric current carried by a specific ion (cation or anion):
              </p>
              <div className="p-3.5 bg-black/45 rounded-xl text-cyan-200 flex flex-wrap items-center justify-center gap-4 font-semibold text-xs sm:text-sm">
                <div className="flex items-center">
                  <span className="mr-1.5">t<sub>+</sub> =</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">&lambda;<sub>+</sub>&deg;</span>
                    <span className="px-2 pt-0.5">&Lambda;<sub>m</sub>&deg;</span>
                  </div>
                </div>
                <span className="text-white/20">,</span>
                <div className="flex items-center">
                  <span className="mr-1.5">t<sub>&minus;</sub> =</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">&lambda;<sub>&minus;</sub>&deg;</span>
                    <span className="px-2 pt-0.5">&Lambda;<sub>m</sub>&deg;</span>
                  </div>
                </div>
                <span className="text-white/40">&rArr;</span>
                <span>t<sub>+</sub> + t<sub>&minus;</sub> = 1</span>
              </div>
              <p className="text-[10.5px] text-white/50 leading-relaxed">
                Note: Strongly hydrated ions migrate slower and have lower transport numbers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-300 block uppercase">Ionic Mobility (u)</span>
              <p className="text-xs text-white/70">
                The speed of an ion under a potential gradient of 1 V/m. Directly proportional to its limiting ionic conductivity:
              </p>
              <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-cyan-200 font-semibold flex flex-wrap items-center justify-center gap-4">
                <span>&lambda;<sub>+</sub>&deg; = F &middot; u<sub>+</sub></span>
                <span className="text-white/20">&amp;</span>
                <span>&lambda;<sub>&minus;</sub>&deg; = F &middot; u<sub>&minus;</sub></span>
              </div>
              <p className="text-[10.5px] text-white/50 leading-relaxed">
                {"Where F = 96500 C/mol. Ionic mobility units: m² V⁻¹ s⁻¹."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 7: ELECTROLYSIS & FARADAY'S LAWS ───────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-rose-400" />
            7. Electrolysis & Faraday's Laws
          </h2>
          <SectionBanner label="Electrolysis" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Electrolysis is the process of chemical decomposition produced by passing an electric current through a liquid or molten electrolyte.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">Faraday's Laws of Electrolysis:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">1. First Law</span>
              <p className="text-xs text-white/60">
                {"The mass (m) of substance deposited is directly proportional to the total charge (Q) passed:"}
              </p>
              <div className="p-3 bg-black/40 rounded-xl text-xs text-rose-300 font-semibold flex flex-wrap items-center justify-center gap-1.5">
                <span>m = Z &middot; Q = Z &middot; I &middot; t =</span>
                <span className="text-[14px] font-light">(</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">M</span>
                  <span className="px-1 pt-0.5">n &middot; F</span>
                </div>
                <span className="text-[14px] font-light">)</span>
                <span>&middot; I &middot; t</span>
              </div>
              <p className="text-[10px] text-white/40">
                {"Z is the electrochemical equivalent, I is current in Amperes, t is time in seconds, and F = 96500 C/mol e⁻."}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">2. Second Law</span>
              <p className="text-xs text-white/60">
                {"When the same charge is passed through different cells, the masses deposited are proportional to equivalent weights (E):"}
              </p>
              <div className="p-3.5 bg-black/40 rounded-xl text-rose-300 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm">
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="px-1.5 border-b border-white/20 pb-0.5">m<sub>1</sub></span>
                    <span className="px-1.5 pt-0.5">m<sub>2</sub></span>
                  </div>
                </div>
                <span>=</span>
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="px-1.5 border-b border-white/20 pb-0.5">E<sub>1</sub></span>
                    <span className="px-1.5 pt-0.5">E<sub>2</sub></span>
                  </div>
                </div>
                <span>=</span>
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="px-1.5 border-b border-white/20 pb-0.5">M<sub>1</sub> / n<sub>1</sub></span>
                    <span className="px-1.5 pt-0.5">M<sub>2</sub> / n<sub>2</sub></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProTip>
            <strong>The Mole-of-Electrons Shortcut:</strong><br />
            To avoid memorizing Z, calculate the moles of electrons passed through the circuit directly, then use reaction stoichiometry:
            <div className="my-2.5 p-4 bg-black/35 rounded-xl text-cyan-300 font-semibold flex items-center justify-center gap-1.5 text-xs sm:text-sm">
              <span>Moles of e<sup>&minus;</sup> =</span>
              <div className="flex flex-col items-center">
                <span className="px-2 border-b border-white/20 pb-0.5">Q</span>
                <span className="px-2 pt-0.5">F</span>
              </div>
              <span>=</span>
              <div className="flex flex-col items-center">
                <span className="px-2 border-b border-white/20 pb-0.5">I &middot; t</span>
                <span className="px-2 pt-0.5">96500</span>
              </div>
            </div>
            <strong>Examples:</strong><br />
            - {"Al³⁺ + 3e⁻ ➔ Al(s) implies 3 moles of e⁻ (3 F) deposit 1 mole (27 g) of Aluminum."}<br />
            - {"2H⁺ + 2e⁻ ➔ H₂(g) implies 2 moles of e⁻ (2 F) liberate 1 mole (22.4 L at STP) of hydrogen gas."}
          </ProTip>

          <WarningCard title="Electrolysis of Aqueous Solutions & Overpotential">
            In aqueous solutions, water molecules compete with solute ions at both electrodes:
            <ul className="list-disc pl-5 space-y-2 mt-1 text-white/70 text-xs">
              <li>
                <strong>At Cathode (Reduction Competition)</strong>:<br />
                The species with the <strong>higher (less negative) reduction potential</strong> is preferentially reduced.<br />
                - Example: In aqueous NaCl, Na⁺ (E° = -2.71 V) competes with H₂O (E° = -0.83 V). Water is reduced preferentially, producing <strong>H₂ gas</strong> at the cathode.
              </li>
              <li>
                <strong>At Anode (Oxidation Competition)</strong>:<br />
                The species with the <strong>lower reduction potential</strong> (higher oxidation potential) is preferentially oxidized.<br />
                - Example: In aqueous NaCl, Cl⁻ (E° = +1.36 V) competes with H₂O (E° = +1.23 V). Theoretically, water should oxidize first to yield O₂. However, due to <strong>Overpotential</strong> (kinetic barrier of oxygen evolution), <strong>Cl₂ gas</strong> is produced at the anode under concentrated conditions.
              </li>
              <li>
                <strong>Active vs. Inert Electrodes</strong>:<br />
                Inert electrodes (Pt, graphite) do not participate. Active electrodes participate: during electrolysis of aqueous CuSO₄ with active Copper electrodes, copper metal oxidizes at the anode ({"Cu(s) ➔ Cu²⁺(aq) + 2e⁻"}) instead of water!
              </li>
            </ul>
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 8: BATTERIES & COMMERCIAL CELLS ───────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            8. Batteries & Commercial Cells
          </h2>
          <SectionBanner label="Commercial Cells" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Batteries are commercial galvanic cells grouped in series to act as a portable source of electrical energy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dry Cell / Primary */}
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block">Primary Batteries (Non-Rechargeable)</span>
              <p className="text-white/70">
                The chemical reaction is irreversible; once reactants are exhausted, the battery becomes dead.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-white/70 text-xs">
                <li>
                  {"Dry Cell (Leclanché): Zinc container is the anode; graphite rod is the cathode. Electrolyte is a paste of NH₄Cl + ZnCl₂. Cell potential drops during use (~1.5V)."}
                </li>
                <li>
                  {"Mercury Cell: Zn-Hg amalgam is the anode; paste of HgO + C is the cathode. Electrolyte is a paste of KOH + ZnO. Generates a highly constant voltage (~1.35V) because no ions in solution change concentration overall."}
                </li>
              </ul>
            </div>

            {/* Lead Storage / Secondary */}
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">Secondary Batteries (Rechargeable)</span>
              <p className="text-white/70">
                Reactions can be reversed by passing an external electrical current in the opposite direction.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-white/70 text-xs">
                <li>
                  {"Lead Storage Battery: Anode is spongy Lead (Pb), cathode is a grid of Lead packed with Lead dioxide (PbO₂). The electrolyte is 38% sulfuric acid (H₂SO₄)."}
                </li>
                <li>
                  {"Lithium-Ion Battery: Modern rechargeable cells where Li⁺ ions migrate back and forth between graphite anodes and transition metal oxide cathodes. Famous for high energy density."}
                </li>
              </ul>
            </div>
          </div>

          {/* Lead Storage Reactions */}
          <div className="p-4 rounded-xl bg-[#090b18] border border-white/5 space-y-2">
            <span className="text-[10px] font-black text-cyan-300 block uppercase">Lead Storage Battery Discharging Reactions</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-black/45 rounded-lg">
                <span className="text-rose-400 block text-[9px] uppercase">Anode (Oxidation)</span>
                Pb(s) + SO<sub>4</sub><sup>2&minus;</sup>(aq) &rarr; PbSO<sub>4</sub>(s) + 2e<sup>&minus;</sup>
              </div>
              <div className="p-2.5 bg-black/45 rounded-lg">
                <span className="text-cyan-400 block text-[9px] uppercase">Cathode (Reduction)</span>
                PbO<sub>2</sub>(s) + 4H<sup>+</sup>(aq) + SO<sub>4</sub><sup>2&minus;</sup>(aq) + 2e<sup>&minus;</sup> &rarr; PbSO<sub>4</sub>(s) + 2H<sub>2</sub>O(l)
              </div>
            </div>
            <div className="p-3 bg-black/45 rounded-xl font-mono text-center text-xs text-white">
              <span className="text-emerald-400 block text-[9px] uppercase font-bold mb-1">Overall Discharging Process</span>
              Pb(s) + PbO<sub>2</sub>(s) + 2H<sub>2</sub>SO<sub>4</sub>(aq) &rarr; 2PbSO<sub>4</sub>(s) + 2H<sub>2</sub>O(l)
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed mt-1.5">
              <strong>Key Insight:</strong> During discharging, sulfuric acid is consumed (density drops). During charging, the external current reverses these reactions, regenerating lead, lead dioxide, and sulfuric acid.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 9: FUEL CELLS ────────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            9. Hydrogen-Oxygen Fuel Cells
          </h2>
          <SectionBanner label="Fuel Cells" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            {"Fuel cells are galvanic cells that convert the chemical combustion energy of gaseous fuels (like H₂, CH₄, or CH₃OH) directly into electrical energy."}
          </p>

          <div className="p-4 rounded-xl bg-[#090b18] border border-white/5 space-y-2">
            <span className="text-[10px] font-black text-emerald-400 block uppercase">H₂-O₂ Fuel Cell (Alkaline Medium)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-black/45 rounded-lg">
                <span className="text-rose-400 block text-[9px] uppercase">Anode (Oxidation)</span>
                2H<sub>2</sub>(g) + 4OH<sup>&minus;</sup>(aq) &rarr; 4H<sub>2</sub>O(l) + 4e<sup>&minus;</sup>
              </div>
              <div className="p-2.5 bg-black/45 rounded-lg">
                <span className="text-cyan-400 block text-[9px] uppercase">Cathode (Reduction)</span>
                O<sub>2</sub>(g) + 2H<sub>2</sub>O(l) + 4e<sup>&minus;</sup> &rarr; 4OH<sup>&minus;</sup>(aq)
              </div>
            </div>
            <div className="p-3 bg-black/45 rounded-xl font-mono text-center text-xs text-white">
              <span className="text-emerald-400 block text-[9px] uppercase font-bold mb-1">Overall Cell Reaction</span>
              2H<sub>2</sub>(g) + O<sub>2</sub>(g) &rarr; 2H<sub>2</sub>O(l)
            </div>
          </div>

          <ul className="list-disc pl-5 space-y-1.5 text-white/70 text-xs">
            <li>{"High Efficiency: Converts chemical energy directly to electricity with an efficiency of ~70% (compared to ~40% for thermal power plants)."}</li>
            <li>{"Clean Product: The main product is water, which was condensed and used as drinking water by astronauts in the Apollo space program."}</li>
          </ul>
        </div>
      </div>

      {/* ── SECTION 10: CORROSION ELECTROCHEMISTRY ────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <ZapOff className="w-5 h-5 text-rose-400" />
            10. Corrosion Electrochemistry
          </h2>
          <SectionBanner label="Corrosion" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Corrosion is the slow destruction of metals by chemical or electrochemical reaction with the environment. Rusting of iron is an electrochemical phenomenon occurring at distinct spots on the metal surface.
          </p>

          {/* Rusting Reactions */}
          <div className="p-4 rounded-xl bg-[#090b18] border border-white/5 space-y-2">
            <span className="text-[10px] font-black text-rose-400 block uppercase">Electrochemical Mechanism of Rusting</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 bg-black/45 rounded-lg">
                <span className="text-rose-400 block text-[9px] uppercase">Anode Spot (Oxidation)</span>
                Fe(s) &rarr; Fe<sup>2+</sup>(aq) + 2e<sup>&minus;</sup>
              </div>
              <div className="p-2.5 bg-black/45 rounded-lg">
                <span className="text-cyan-400 block text-[9px] uppercase">Cathode Spot (Aerated Neutral Water)</span>
                O<sub>2</sub>(g) + 2H<sub>2</sub>O(l) + 4e<sup>&minus;</sup> &rarr; 4OH<sup>&minus;</sup>(aq)
              </div>
            </div>
            <div className="p-3 bg-black/45 rounded-xl font-mono text-center text-xs text-white">
              <span className="text-emerald-400 block text-[9px] uppercase font-bold mb-1">Overall Hydroxide Precipitation</span>
              2Fe(s) + O<sub>2</sub>(g) + 2H<sub>2</sub>O(l) &rarr; 2Fe(OH)<sub>2</sub>(s)
            </div>
            <p className="text-[11.5px] text-white/50 leading-relaxed mt-1">
              {"The dissolved Fe(OH)₂ undergoes further oxidation by atmospheric oxygen to precipitate as hydrated iron(III) oxide (rust):"}
              <span className="font-bold text-white block text-center mt-1">Fe<sub>2</sub>O<sub>3</sub> &middot; xH<sub>2</sub>O</span>
            </p>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Corrosion Prevention Methods:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">1. Galvanization</span>
              <p className="text-white/60">
                Coating iron with a thin layer of Zinc. The Zinc provides a physical barrier and acts as a sacrificial anode if damaged.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">2. Sacrificial Anode</span>
              <p className="text-white/60">
                Connecting iron electrically to highly active metals (like Mg or Zn). The active metal undergoes oxidation preferentially.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">3. Barrier Protection</span>
              <p className="text-white/60">
                Applying paint, grease, or corrosion-resistant coatings to prevent oxygen and water contact with the metal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 11: SOLVED PROBLEMS (IAT ALIGNED) ──────────────────────── */}
      <Collapsible title="11 · Solved Problems (IAT Level)" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={true}>
        <div className="space-y-4">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Standard Potentials Combined</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Given the standard reduction potentials: E°(Fe³⁺/Fe) = -0.036 V and E°(Fe²⁺/Fe) = -0.44 V. Calculate the standard potential E°(Fe³⁺/Fe²⁺)."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Identify the half-reactions and the target reaction:</div>
              <div>   Reaction 1: Fe³⁺ + 3e⁻ ➔ Fe  (n₁ = 3, E°₁ = -0.036V)</div>
              <div>   Reaction 2: Fe²⁺ + 2e⁻ ➔ Fe  (n₂ = 2, E°₂ = -0.44V)</div>
              <div>   Target Reaction: Fe³⁺ + e⁻ ➔ Fe²⁺ (n₃ = 1, E°₃ = ?)</div>
              <div>2. You <strong>cannot</strong> directly add electrode potentials because potential is an intensive property. Convert to Gibbs free energy:</div>
              <div>   &Delta;G&deg; = &minus;nFE&deg;</div>
              <div>3. Note that: Target = Reaction 1 - Reaction 2</div>
              <div>   &Delta;G&deg;<sub>3</sub> = &Delta;G&deg;<sub>1</sub> &minus; &Delta;G&deg;<sub>2</sub></div>
              <div>   &minus;n<sub>3</sub>FE&deg;<sub>3</sub> = &minus;n<sub>1</sub>FE&deg;<sub>1</sub> &minus; (&minus;n<sub>2</sub>FE&deg;<sub>2</sub>)</div>
              <div>   n<sub>3</sub>E&deg;<sub>3</sub> = n<sub>1</sub>E&deg;<sub>1</sub> &minus; n<sub>2</sub>E&deg;<sub>2</sub></div>
              <div>4. Substitute values:</div>
              <div>   1 * E°₃ = 3 * (-0.036) - 2 * (-0.44)</div>
              <div>   E°₃ = -0.108 + 0.88 = +0.772 V.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: E°(Fe³⁺/Fe²⁺) = +0.77 V</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Nernst Equation of Daniell Cell</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A Daniell cell uses Zn(s) | Zn²⁺(0.01 M) || Cu²⁺(1.0 M) | Cu(s). Calculate the cell EMF (Ecell) at 298 K. Given standard reduction potentials: E°(Zn²⁺/Zn) = -0.76 V, E°(Cu²⁺/Cu) = +0.34 V."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Find E°cell: E°cell = E°cathode - E°anode = 0.34 - (-0.76) = 1.10 V.</div>
              <div>2. Balanced reaction: Zn(s) + Cu²⁺(aq) ➔ Zn²⁺(aq) + Cu(s) (n = 2 electrons).</div>
              <div>3. Reaction quotient: Q = [Zn²⁺] / [Cu²⁺] = 0.01 / 1.0 = 10⁻².</div>
              <div>4. Nernst equation at 298 K:</div>
              <div>   E<sub>cell</sub> = E&deg;<sub>cell</sub> &minus; (0.0591 / n) &middot; log Q</div>
              <div>   E<sub>cell</sub> = 1.10 &minus; (0.0591 / 2) &middot; log(10<sup>&minus;2</sup>)</div>
              <div>   E<sub>cell</sub> = 1.10 &minus; 0.0295 &middot; (&minus;2) = 1.10 + 0.059 = 1.159 V.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Ecell = 1.16 V</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Concentration Cell potential</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Calculate the potential (Ecell) of the concentration cell Cu(s) | Cu²⁺(0.001 M) || Cu²⁺(0.1 M) | Cu(s) at 298 K."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. For a concentration cell, the electrodes are identical, so E°cell = 0.00 V.</div>
              <div>2. The cell is spontaneous if C₂ (cathode) &gt; C₁ (anode). Here, C₁ = 0.001 M, C₂ = 0.1 M. n = 2.</div>
              <div>3. Formula:</div>
              <div>   E<sub>cell</sub> = (0.0591 / n) &middot; log(C<sub>2</sub> / C<sub>1</sub>)</div>
              <div>   E<sub>cell</sub> = (0.0591 / 2) &middot; log(0.1 / 0.001)</div>
              <div>   E<sub>cell</sub> = 0.02955 &middot; log(100) = 0.02955 &middot; 2 = 0.0591 V.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Ecell = 0.059 V</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Molar Conductivity & Cell Constant</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"The resistance of a conductivity cell filled with 0.1 M KCl solution is 100 Ω. If the conductivity (κ) of this solution is 1.29 S m⁻¹, find the cell constant (G*) and molar conductivity of the solution."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Cell constant formula: G* = κ * R.</div>
              <div>   G* = 1.29 S/m * 100 Ω = 129 m⁻¹ (or 1.29 cm⁻¹).</div>
              <div>2. Molar conductivity in SI units:</div>
              <div>   &Lambda;<sub>m</sub> = &kappa; / (1000 &middot; C<sub>SI</sub>) &nbsp;&bull;&nbsp; where C<sub>SI</sub> = 0.1 mol/L = 100 mol/m&sup3;</div>
              <div>   Limiting conductivity = 1.29 / (1000 * 0.1 / 1000) = 1.29 / 100 = 0.0129 S m² / mol.</div>
              <div>3. Converting to standard common units (S cm²/mol):</div>
              <div>   Limiting conductivity = 1.29 * 10⁻² S m²/mol * 10⁴ cm²/m² = 129 S cm²/mol.</div>
              <div>   Alternative formula: Limiting conductivity = (κ_in_S_cm_1 * 1000) / Molarity.</div>
              <div>   Since κ = 1.29 S/m = 0.0129 S/cm: Limiting conductivity = (0.0129 * 1000) / 0.1 = 129 S cm²/mol.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Cell Constant = 1.29 cm⁻¹, Limiting Molar Conductivity = 129 S cm²/mol</span>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: Dissociation Constant of Weak Acid</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A 0.01 M solution of acetic acid (CH₃COOH) has a molar conductivity of 16.5 S cm² mol⁻¹. Limiting molar conductivities of H⁺ and CH₃COO⁻ are 349.6 and 40.9 S cm² mol⁻¹ respectively. Calculate the degree of dissociation (α) and acid dissociation constant (Ka)."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Limiting molar conductivity: Limiting value = Limiting(H⁺) + Limiting(CH₃COO⁻) = 349.6 + 40.9 = 390.5 S cm²/mol.</div>
              <div>2. Degree of dissociation (α): α = Limiting / Limiting_value = 16.5 / 390.5 = 0.0422 (or 4.22% dissociated).</div>
              <div>3. Dissociation constant (Ka):</div>
              <div>   Ka = C * α² / (1 - α) ≈ C * α² (since α is small, 1 - α ≈ 1)</div>
              <div>   Ka = 0.01 * (0.0422)² = 0.01 * 0.00178 = 1.78 × 10⁻⁵.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: α = 4.22%, Ka = 1.78 × 10⁻⁵</span>
            </div>
          </div>

          {/* Problem 6 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 6: Solubility of Sparingly Soluble Salt</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"The conductivity (κ) of a saturated solution of AgCl at 298 K is 1.38 × 10⁻⁶ S cm⁻¹ after subtracting the water conductivity. If limiting molar ionic conductivities of Ag⁺ and Cl⁻ are 61.9 and 76.3 S cm² mol⁻¹, calculate the solubility and solubility product (Ksp) of AgCl."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Limiting conductivity: Limiting = Limiting(Ag⁺) + Limiting(Cl⁻) = 61.9 + 76.3 = 138.2 S cm²/mol.</div>
              <div>2. Solubility (S):</div>
              <div>   S = (1000 * κ) / Limiting = (1000 * 1.38 × 10⁻⁶) / 138.2</div>
              <div>   S = 1.38 × 10⁻³ / 138.2 = 9.98 × 10⁻⁶ mol/L.</div>
              <div>3. Solubility Product (Ksp): For a 1:1 salt, Ksp = S²</div>
              <div>   Ksp = (9.98 × 10⁻⁶)² = 9.96 × 10⁻¹¹ mol²/L².</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Solubility = 1.0 × 10⁻⁵ mol/L, Ksp = 1.0 × 10⁻¹⁰</span>
            </div>
          </div>

          {/* Problem 7 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 7: Copper deposition Faraday's Law</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A solution of CuSO₄ is electrolyzed for 10 minutes with a current of 1.5 Amperes. What is the mass of copper deposited at the cathode? (Molar mass of Cu = 63.5 g/mol)"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Convert time to seconds: t = 10 min * 60 s/min = 600 seconds.</div>
              <div>2. Calculate charge (Q): Q = I * t = 1.5 A * 600 s = 900 Coulombs.</div>
              <div>3. Calculate moles of electrons: Moles e⁻ = Q / 96500 = 900 / 96500 = 0.00933 mol.</div>
              <div>4. Deposition reaction: Cu²⁺ + 2e⁻ ➔ Cu(s). Thus, 2 moles of electrons deposit 1 mole of Cu.</div>
              <div>5. Moles of Cu deposited = Moles e⁻ / 2 = 0.00933 / 2 = 0.00466 mol.</div>
              <div>6. Mass of Cu = Moles * Molar Mass = 0.00466 * 63.5 = 0.296 grams.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Mass = 0.30 g</span>
            </div>
          </div>

          {/* Problem 8 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 8: Chlorine Gas Volume Electrolysis</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An aqueous solution of NaCl is electrolyzed. What volume of chlorine gas (Cl₂) is liberated at STP at the anode if a current of 2.0 Amperes is passed for 1 hour?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Convert time to seconds: t = 1 hour = 3600 seconds.</div>
              <div>2. Calculate charge (Q): Q = I * t = 2.0 A * 3600 s = 7200 Coulombs.</div>
              <div>3. Moles of electrons = Q / F = 7200 / 96500 = 0.0746 moles of electrons.</div>
              <div>4. Anode reaction: 2Cl⁻ ➔ Cl₂(g) + 2e⁻. Thus, 2 moles of electrons yield 1 mole of Cl₂.</div>
              <div>5. Moles of Cl₂ = Moles e⁻ / 2 = 0.0746 / 2 = 0.0373 moles.</div>
              <div>6. Volume at STP = Moles * 22.4 L/mol = 0.0373 * 22.4 = 0.835 Liters (or 835 mL).</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Volume of Cl₂ = 0.84 L</span>
            </div>
          </div>

          {/* Problem 9 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 9: Transport Number & Ionic Mobility</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"At infinite dilution, the limiting molar conductivity of AgNO₃ is 133.4 S cm² mol⁻¹. If the limiting ionic conductivity of the nitrate ion (NO₃⁻) is 71.4 S cm² mol⁻¹, calculate the transport number of Ag⁺ and the ionic mobility of Ag⁺ at 298 K."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Find limiting ionic conductivity of Ag⁺:</div>
              <div>   λ°(Ag⁺) = limiting value = 133.4 - 71.4 = 62.0 S cm² mol⁻¹.</div>
              <div>2. Calculate Ag⁺ transport number t₊:</div>
              <div>   t₊ = 62.0 / 133.4 ≈ 0.465.</div>
              <div>3. Calculate ionic mobility u₊:</div>
              <div>   {"λ°(Ag⁺) = F · u₊  ➔  u₊ = 62.0 / F"}</div>
              <div>   Convert λ° to SI units: 62.0 S cm² mol⁻¹ = 62.0 × 10⁻⁴ S m² mol⁻¹.</div>
              <div>   u₊ = 62.0 × 10⁻⁴ / 96500 ≈ 6.42 × 10⁻⁸ m² V⁻¹ s⁻¹.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: t(Ag⁺) = 0.465, u(Ag⁺) = 6.42 × 10⁻⁸ m² V⁻¹ s⁻¹</span>
            </div>
          </div>

          {/* Problem 10 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 10: Aqueous CuSO₄ electrolysis competing reactions</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An aqueous solution of CuSO₄ is electrolyzed using inert Platinum electrodes by passing a current of 5.0 A for 96.5 minutes. Identify the products at both electrodes and calculate the volume of gas liberated at the anode at STP."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Products identification:</div>
              <div>   - At Cathode: Cu²⁺ competes with H₂O. Since E°(Cu²⁺/Cu) = +0.34V is higher than E°(H₂O/H₂) = -0.83V, <strong>Copper metal deposits</strong>.</div>
              <div>   - At Anode: SO₄²⁻ competes with H₂O. Sulfate is extremely stable and difficult to oxidize, so <strong>water oxidizes to yield Oxygen gas (O₂)</strong>.</div>
              <div>2. Convert time to seconds: t = 96.5 min * 60 s/min = 5790 seconds.</div>
              <div>3. Moles of electrons = (I * t) / F = (5.0 A * 5790 s) / 96500 = 0.30 moles of e⁻.</div>
              <div>4. Anode reaction: 2H₂O ➔ O₂ + 4H⁺ + 4e⁻. Thus, 4 moles of electrons yield 1 mole of O₂.</div>
              <div>5. Moles of O₂ = Moles e⁻ / 4 = 0.30 / 4 = 0.075 moles.</div>
              <div>6. Volume of O₂ at STP = 0.075 mol * 22.4 L/mol = 1.68 Liters.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Cathode: Cu(s), Anode: O₂ (1.68 L at STP)</span>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 12: COMMON MISTAKES & EXAM TRAPS ───────────────────────── */}
      <Collapsible title="12 · Common Mistakes & Exam Traps" icon={<AlertCircle className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-3">
          <WarningCard title="The 'Intensive Property' E° Trap">
            {"Standard electrode potential (E°) is an intensive property and does not depend on the stoichiometric coefficients of the reaction."}
            <p className="text-white/60 text-xs mt-1">
              {"Example: If you multiply Zn ➔ Zn²⁺ + 2e⁻ (E° = +0.76 V) by 2 to balance a redox equation, the potential remains +0.76 V. Never multiply standard potential values by any coefficients! However, Gibbs energy (&Delta;G&deg; = &minus;nFE&deg;) is extensive and will double."}
            </p>
          </WarningCard>

          <WarningCard title="Adding Potentials Directly Trap">
            {"When combining two half-reactions to find a third half-reaction, you cannot add standard electrode potentials directly."}
            <p className="text-white/60 text-xs mt-1">
              {"You must convert them to Gibbs free energy changes (&Delta;G&deg;), add the free energies, and then convert the resultant free energy back to standard potential. (Refer to Solved Problem 1)."}
            </p>
          </WarningCard>

          <WarningCard title="Salt Bridge Ion Movement Trap">
            {"Electrons never pass through the salt bridge; current in the salt bridge is carried entirely by the migration of ions."}
            <p className="text-white/60 text-xs mt-1">
              {"Anions (negative ions) migrate toward the anode beaker, and cations (positive ions) migrate toward the cathode beaker."}
            </p>
          </WarningCard>

          <WarningCard title="Molar Conductivity Dilution Trap">
            {"Always remember: on dilution, conductivity (κ) decreases, but molar conductivity (Λm) increases."}
            <p className="text-white/60 text-xs mt-1">
              {"Conductivity drops because the number of ions per cm³ decreases. Molar conductivity increases because the volume term (1000/C) increases much faster than conductivity decreases."}
            </p>
          </WarningCard>

          <WarningCard title="Faraday's Time Unit Trap">
            {"In Q = I · t, time t must always be in seconds."}
            <p className="text-white/60 text-xs mt-1">
              {"Forgetting to convert minutes or hours into seconds is the most frequent reason students lose marks in Faraday's Law numericals."}
            </p>
          </WarningCard>
        </div>
      </Collapsible>

      {/* ── SECTION 13: IAT EXAM FOCUS & CHECKLIST ──────────────────────────────── */}
      <Collapsible title="13 · IAT Exam Focus & Checklist" icon={<Star className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/15">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Understand that the standard hydrogen electrode Pt(s)|H₂(g, 1 bar)|H⁺(aq, 1M) is defined as E° = 0.00 V.",
              "Recall that spontaneous reactions require E_cell > 0 and ΔG < 0.",
              "Use Gibbs energy relation ΔG° = -nFE°cell and log Keq = (nE°cell)/0.0591.",
              "Strong electrolytes follow Λm = Λm° - A√C; weak electrolytes follow Kohlrausch's law.",
              "Apply Kohlrausch's law to calculate limiting molar conductivity of weak acids.",
              "Use the mole-of-electrons shortcut (1 F = 96500 Coulombs) for rapid electrolysis calculations.",
              "Lead storage battery: Pb anode and PbO₂ cathode are both converted to PbSO₄ during discharge.",
              "Corrosion of iron: Anode is Fe oxidation, Cathode in neutral aerated water is O₂ reduction yielding OH⁻."
            ].map((s, i) => (
              <div key={i} className="flex gap-2 text-[12.5px] text-white/70">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ── NAVIGATOR ──────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <button
          onClick={() => onNavigate?.('prev')}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[12px] font-bold border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all"
        >
          ◀ Previous Lesson
        </button>
        <span className="text-[12px] text-white/40 font-bold uppercase">Electrochemistry · Unit 3</span>
        <button
          onClick={() => onNavigate?.('next')}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[12px] font-bold bg-white text-black hover:bg-white/90 transition-all"
        >
          Next Lesson ▶
        </button>
      </div>

    </div>
  );
}
