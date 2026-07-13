import React, { useState } from 'react';
import {
  Star, AlertTriangle, Zap, BookOpen, FlaskConical,
  Atom, BarChart3, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' | 'orange' | 'pink' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    orange:  'bg-orange-500/10 border-orange-500/20 text-orange-400',
    pink:    'bg-pink-500/10 border-pink-500/20 text-pink-400',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function SectionBanner({ label, color = 'cyan' }: { label: string; color?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' }) {
  const colors: Record<string, string> = {
    cyan:    'bg-cyan-400 text-cyan-400',
    violet:  'bg-violet-400 text-violet-400',
    emerald: 'bg-emerald-400 text-emerald-400',
    amber:   'bg-amber-400 text-amber-400',
    rose:    'bg-rose-400 text-rose-400',
  };
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${colors[color].split(' ')[0]}`} />
      <span className={`text-[11px] font-black tracking-widest uppercase ${colors[color].split(' ')[1]}`}>{label}</span>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-white/70 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-1">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-amber-400 uppercase tracking-wider">IAT Shortcut</span>
      </div>
      <div className="text-white/75 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-1">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-cyan-400 uppercase tracking-wider">Professor's Perspective</span>
      </div>
      <div className="text-white/75 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

// ─── INTERACTIVE WIDGET 1: TRANSITION METAL EXPLORER ─────────────────────────
interface MetalData {
  symbol: string;
  name: string;
  z: number;
  atomConfig: string;
  dElectrons: number; // in ground state atom
  commonOS: string[];
  maxOS: number;
  unpaired: number; // in ground state atom
  mu: string;
  color: string;
  colorHex: string;
  isTransition: boolean;
  note: string;
  ions: { label: string; config: string; dCount: number; unpaired: number; mu: string }[];
}

const metals3d: MetalData[] = [
  {
    symbol: 'Sc', name: 'Scandium', z: 21,
    atomConfig: '[Ar] 3d¹ 4s²', dElectrons: 1, commonOS: ['+3'], maxOS: 3, unpaired: 1,
    mu: '1.73', color: 'Colorless (Sc³⁺ is d⁰)', colorHex: '#94a3b8', isTransition: true,
    note: 'Only +3 oxidation state. Sc³⁺ is d⁰ → colorless.',
    ions: [{ label: 'Sc³⁺', config: '[Ar] 3d⁰', dCount: 0, unpaired: 0, mu: '0' }]
  },
  {
    symbol: 'Ti', name: 'Titanium', z: 22,
    atomConfig: '[Ar] 3d² 4s²', dElectrons: 2, commonOS: ['+2', '+3', '+4'], maxOS: 4, unpaired: 2,
    mu: '2.83', color: 'Ti³⁺ is purple/violet', colorHex: '#7c3aed', isTransition: true,
    note: 'Ti⁴⁺ is d⁰ → colorless. Ti³⁺ has 1 unpaired electron → violet.',
    ions: [
      { label: 'Ti³⁺', config: '[Ar] 3d¹', dCount: 1, unpaired: 1, mu: '1.73' },
      { label: 'Ti⁴⁺', config: '[Ar] 3d⁰', dCount: 0, unpaired: 0, mu: '0' }
    ]
  },
  {
    symbol: 'V', name: 'Vanadium', z: 23,
    atomConfig: '[Ar] 3d³ 4s²', dElectrons: 3, commonOS: ['+2', '+3', '+4', '+5'], maxOS: 5, unpaired: 3,
    mu: '3.87', color: 'V²⁺ violet; V³⁺ green; VO²⁺ blue; VO₂⁺ yellow', colorHex: '#2563eb', isTransition: true,
    note: 'V shows all OS from +2 to +5. V₂O₅ is an important industrial catalyst.',
    ions: [
      { label: 'V²⁺', config: '[Ar] 3d³', dCount: 3, unpaired: 3, mu: '3.87' },
      { label: 'V³⁺', config: '[Ar] 3d²', dCount: 2, unpaired: 2, mu: '2.83' },
      { label: 'V⁴⁺ (VO²⁺)', config: '[Ar] 3d¹', dCount: 1, unpaired: 1, mu: '1.73' }
    ]
  },
  {
    symbol: 'Cr', name: 'Chromium', z: 24,
    atomConfig: '[Ar] 3d⁵ 4s¹ (anomaly)', dElectrons: 5, commonOS: ['+2', '+3', '+6'], maxOS: 6, unpaired: 6,
    mu: '6.93 (atom)', color: 'Cr³⁺ green; Cr₂O₇²⁻ orange; CrO₄²⁻ yellow', colorHex: '#16a34a', isTransition: true,
    note: 'Half-filled 3d⁵ configuration gives extra stability via maximum exchange energy.',
    ions: [
      { label: 'Cr²⁺', config: '[Ar] 3d⁴', dCount: 4, unpaired: 4, mu: '4.90' },
      { label: 'Cr³⁺', config: '[Ar] 3d³', dCount: 3, unpaired: 3, mu: '3.87' },
      { label: 'Cr⁶⁺', config: '[Ar] 3d⁰', dCount: 0, unpaired: 0, mu: '0' }
    ]
  },
  {
    symbol: 'Mn', name: 'Manganese', z: 25,
    atomConfig: '[Ar] 3d⁵ 4s²', dElectrons: 5, commonOS: ['+2', '+3', '+4', '+6', '+7'], maxOS: 7, unpaired: 5,
    mu: '5.92', color: 'Mn²⁺ faint pink; MnO₄⁻ intense purple (charge transfer)', colorHex: '#db2777', isTransition: true,
    note: 'Max OS of +7 in this series. MnO₄⁻ color is due to charge-transfer (d⁰ Mn), not d-d transition.',
    ions: [
      { label: 'Mn²⁺', config: '[Ar] 3d⁵', dCount: 5, unpaired: 5, mu: '5.92' },
      { label: 'Mn³⁺', config: '[Ar] 3d⁴', dCount: 4, unpaired: 4, mu: '4.90' },
      { label: 'Mn⁷⁺ (MnO₄⁻)', config: '[Ar] 3d⁰', dCount: 0, unpaired: 0, mu: '0' }
    ]
  },
  {
    symbol: 'Fe', name: 'Iron', z: 26,
    atomConfig: '[Ar] 3d⁶ 4s²', dElectrons: 6, commonOS: ['+2', '+3'], maxOS: 6, unpaired: 4,
    mu: '4.90', color: 'Fe²⁺ pale green; Fe³⁺ yellow-brown', colorHex: '#ca8a04', isTransition: true,
    note: 'Fe is biologically crucial — hemoglobin (O₂ carrier). Fe acts as catalyst in Haber process.',
    ions: [
      { label: 'Fe²⁺', config: '[Ar] 3d⁶', dCount: 6, unpaired: 4, mu: '4.90' },
      { label: 'Fe³⁺', config: '[Ar] 3d⁵', dCount: 5, unpaired: 5, mu: '5.92' }
    ]
  },
  {
    symbol: 'Co', name: 'Cobalt', z: 27,
    atomConfig: '[Ar] 3d⁷ 4s²', dElectrons: 7, commonOS: ['+2', '+3'], maxOS: 5, unpaired: 3,
    mu: '3.87', color: 'Co²⁺ pink; Co³⁺ varies with ligand', colorHex: '#e879f9', isTransition: true,
    note: 'Cobalt is in Vitamin B₁₂ — essential for humans. Co³⁺ forms stable octahedral complexes.',
    ions: [
      { label: 'Co²⁺', config: '[Ar] 3d⁷', dCount: 7, unpaired: 3, mu: '3.87' },
      { label: 'Co³⁺', config: '[Ar] 3d⁶', dCount: 6, unpaired: 4, mu: '4.90' }
    ]
  },
  {
    symbol: 'Ni', name: 'Nickel', z: 28,
    atomConfig: '[Ar] 3d⁸ 4s²', dElectrons: 8, commonOS: ['+2'], maxOS: 4, unpaired: 2,
    mu: '2.83', color: 'Ni²⁺ green', colorHex: '#4ade80', isTransition: true,
    note: 'Ni is a catalyst for hydrogenation reactions. Ni²⁺ forms square planar complexes.',
    ions: [
      { label: 'Ni²⁺', config: '[Ar] 3d⁸', dCount: 8, unpaired: 2, mu: '2.83' }
    ]
  },
  {
    symbol: 'Cu', name: 'Copper', z: 29,
    atomConfig: '[Ar] 3d¹⁰ 4s¹ (anomaly)', dElectrons: 10, commonOS: ['+1', '+2'], maxOS: 3, unpaired: 1,
    mu: '1.73 (atom)', color: 'Cu²⁺ blue; Cu⁺ colorless (d¹⁰)', colorHex: '#0ea5e9', isTransition: true,
    note: 'Fully filled 3d¹⁰ gives Cu its anomalous config. Cu does NOT liberate H₂ from non-oxidizing acids (E° = +0.34 V).',
    ions: [
      { label: 'Cu⁺', config: '[Ar] 3d¹⁰', dCount: 10, unpaired: 0, mu: '0' },
      { label: 'Cu²⁺', config: '[Ar] 3d⁹', dCount: 9, unpaired: 1, mu: '1.73' }
    ]
  },
  {
    symbol: 'Zn', name: 'Zinc', z: 30,
    atomConfig: '[Ar] 3d¹⁰ 4s²', dElectrons: 10, commonOS: ['+2'], maxOS: 2, unpaired: 0,
    mu: '0', color: 'Colorless (Zn²⁺ is d¹⁰)', colorHex: '#94a3b8', isTransition: false,
    note: 'NOT a transition element — 3d¹⁰ is complete in both atom and common +2 ion. Colorless, diamagnetic.',
    ions: [
      { label: 'Zn²⁺', config: '[Ar] 3d¹⁰', dCount: 10, unpaired: 0, mu: '0' }
    ]
  }
];

function OrbitalBoxes({ dCount, dElectrons }: { dCount: number; dElectrons: number }) {
  // Fill d orbitals using Hund's rule
  const boxes = [0, 1, 2, 3, 4]; // 5 d-orbitals
  const spins: ('up' | 'both' | 'empty')[] = boxes.map((i) => {
    if (i < dElectrons - 5 && dElectrons > 5) return 'both';
    if (i < dElectrons && dElectrons <= 5) return 'up';
    if (dElectrons > 5 && i < dElectrons - 5) return 'both';
    if (dElectrons > 5 && i >= dElectrons - 5) return 'up';
    return 'empty';
  });

  // Recalculate properly
  const filled: ('up' | 'both' | 'empty')[] = [0,1,2,3,4].map((i) => {
    const up = Math.min(dCount, 5);
    const down = Math.max(0, dCount - 5);
    if (i < down) return 'both';
    if (i < up) return 'up';
    return 'empty';
  });

  return (
    <div className="flex gap-1 items-center">
      {filled.map((spin, i) => (
        <div key={i} className="w-7 h-8 border border-white/20 rounded-md flex flex-col items-center justify-center relative bg-white/3">
          {spin === 'up' && <span className="text-cyan-400 text-[11px] leading-none">↑</span>}
          {spin === 'both' && <>
            <span className="text-cyan-400 text-[11px] leading-none">↑</span>
            <span className="text-rose-400 text-[10px] leading-none mt-0.5">↓</span>
          </>}
          {spin === 'empty' && <span className="text-white/10 text-[10px]">·</span>}
        </div>
      ))}
      <span className="text-white/30 text-[10px] ml-1">3d</span>
    </div>
  );
}

function TransitionMetalExplorer() {
  const [selectedIndex, setSelectedIndex] = useState(4); // Default: Mn
  const [selectedIonIndex, setSelectedIonIndex] = useState(0);

  const metal = metals3d[selectedIndex];
  const ion = metal.ions[Math.min(selectedIonIndex, metal.ions.length - 1)];

  return (
    <div className="space-y-5">
      {/* Metal Selector Bar */}
      <div className="flex flex-wrap gap-2">
        {metals3d.map((m, i) => (
          <button
            key={m.symbol}
            onClick={() => { setSelectedIndex(i); setSelectedIonIndex(0); }}
            className={cn(
              'px-3 py-1.5 rounded-xl text-[13px] font-bold transition-all duration-200 border',
              i === selectedIndex
                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300 shadow-lg shadow-violet-500/10'
                : 'bg-white/3 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/8'
            )}
          >
            {m.symbol}
            {!m.isTransition && <span className="ml-1 text-[9px] text-rose-400">*</span>}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-white/30">* Not a transition element (d¹⁰ in atom and common ion)</p>

      {/* Metal Info Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl font-black text-white">{metal.symbol}</div>
              <div className="text-white/50 text-[13px]">{metal.name} (Z = {metal.z})</div>
            </div>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {metal.isTransition
                ? <Tag color="emerald">Transition</Tag>
                : <Tag color="rose">d-block only</Tag>}
            </div>
          </div>

          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between">
              <span className="text-white/40">Config (Atom)</span>
              <span className="text-cyan-300 font-mono font-bold">{metal.atomConfig}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Common OS</span>
              <span className="text-amber-300 font-bold">{metal.commonOS.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Max OS (series)</span>
              <span className="text-violet-300 font-bold">+{metal.maxOS}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Atom μ (BM)</span>
              <span className="text-rose-300 font-bold">{metal.mu !== '0' ? `${metal.mu} BM` : 'Diamagnetic'}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <div className="text-[11px] text-white/30 mb-1 uppercase tracking-wider">Color in Solution</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: metal.colorHex }} />
              <span className="text-white/70 text-[12px]">{metal.color}</span>
            </div>
          </div>

          <p className="text-white/50 text-[12px] italic border-t border-white/5 pt-2">{metal.note}</p>
        </div>

        {/* Ion Viewer */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
          <div className="text-[11px] text-white/30 uppercase tracking-wider mb-1">Select Ion</div>
          <div className="flex flex-wrap gap-2">
            {metal.ions.map((ion, i) => (
              <button
                key={ion.label}
                onClick={() => setSelectedIonIndex(i)}
                className={cn(
                  'px-3 py-1 rounded-lg text-[12px] font-bold border transition-all',
                  i === selectedIonIndex
                    ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
                    : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70'
                )}
              >
                {ion.label}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="text-[11px] text-white/30 mb-1.5">Electronic Configuration</div>
              <div className="font-mono text-emerald-300 text-[13px] font-bold bg-emerald-950/20 px-3 py-2 rounded-lg border border-emerald-500/10">
                {ion.config}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-white/30 mb-1.5">3d Orbital Occupancy</div>
              <OrbitalBoxes dCount={ion.dCount} dElectrons={ion.dCount} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-[13px] pt-1">
              <div className="p-3 rounded-xl bg-white/3 border border-white/8 text-center">
                <div className="text-white/30 text-[10px] uppercase">Unpaired e⁻</div>
                <div className="text-2xl font-black text-white mt-1">{ion.unpaired}</div>
                <div className="text-white/30 text-[10px]">{ion.unpaired === 0 ? 'Diamagnetic' : 'Paramagnetic'}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/3 border border-white/8 text-center">
                <div className="text-white/30 text-[10px] uppercase">Spin-only μ</div>
                <div className="text-2xl font-black text-violet-300 mt-1">{ion.mu}</div>
                <div className="text-white/30 text-[10px]">BM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INTERACTIVE WIDGET 2: KMnO₄ REACTION PREDICTOR ─────────────────────────
interface MnReaction {
  medium: 'acidic' | 'neutral' | 'alkaline';
  reagent: string;
  halfReductionHtml: string;
  partnerHtml: string;
  fullEquationHtml: string;
  mnProduct: string;
  mnProductColor: string;
  observation: string;
}

const mnReactions: MnReaction[] = [
  {
    medium: 'acidic',
    reagent: 'Fe²⁺ → Fe³⁺',
    halfReductionHtml: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
    partnerHtml: 'Fe²⁺ → Fe³⁺ + e⁻',
    fullEquationHtml: 'MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O',
    mnProduct: 'Mn²⁺', mnProductColor: '#f9a8d4',
    observation: 'Purple → Colorless (Mn²⁺ is very pale pink, essentially colorless in dilute solution)'
  },
  {
    medium: 'acidic',
    reagent: 'I⁻ → I₂',
    halfReductionHtml: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
    partnerHtml: '2I⁻ → I₂ + 2e⁻',
    fullEquationHtml: '2MnO₄⁻ + 10I⁻ + 16H⁺ → 2Mn²⁺ + 5I₂ + 8H₂O',
    mnProduct: 'Mn²⁺', mnProductColor: '#f9a8d4',
    observation: 'Purple → Colorless/brown; brown I₂ liberated (confirmed by starch → blue-black)'
  },
  {
    medium: 'acidic',
    reagent: 'C₂O₄²⁻ → CO₂',
    halfReductionHtml: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
    partnerHtml: 'C₂O₄²⁻ → 2CO₂ + 2e⁻',
    fullEquationHtml: '2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O',
    mnProduct: 'Mn²⁺', mnProductColor: '#f9a8d4',
    observation: 'Purple → Colorless; brisk CO₂ gas evolved (slow initially, then autocatalytic)'
  },
  {
    medium: 'acidic',
    reagent: 'SO₂ → SO₄²⁻',
    halfReductionHtml: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
    partnerHtml: 'SO₂ + 2H₂O → SO₄²⁻ + 4H⁺ + 2e⁻',
    fullEquationHtml: '2MnO₄⁻ + 5SO₂ + 2H₂O → 2Mn²⁺ + 5SO₄²⁻ + 4H⁺',
    mnProduct: 'Mn²⁺', mnProductColor: '#f9a8d4',
    observation: 'Purple → Colorless; SO₂ gas decolorizes acidified KMnO₄'
  },
  {
    medium: 'neutral',
    reagent: 'H₂S → S',
    halfReductionHtml: 'MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻',
    partnerHtml: 'H₂S → S + 2H⁺ + 2e⁻',
    fullEquationHtml: '2MnO₄⁻ + 3H₂S → 2MnO₂ + 3S + 2H₂O + 2OH⁻',
    mnProduct: 'MnO₂', mnProductColor: '#92400e',
    observation: 'Purple → Brown/black precipitate of MnO₂; yellow sulfur precipitate'
  },
  {
    medium: 'alkaline',
    reagent: 'Mn²⁺ (disproportionation)',
    halfReductionHtml: 'MnO₄⁻ + e⁻ → MnO₄²⁻',
    partnerHtml: 'MnO₄²⁻ gains e⁻ in strongly alkaline conditions',
    fullEquationHtml: '2KMnO₄ + 2KOH → 2K₂MnO₄ + H₂O + [O]',
    mnProduct: 'MnO₄²⁻', mnProductColor: '#166534',
    observation: 'Purple → Green (manganate K₂MnO₄). In neutral/faintly alkaline media, MnO₂ is produced instead.'
  },
];

function KMnO4Predictor() {
  const [medium, setMedium] = useState<'acidic' | 'neutral' | 'alkaline'>('acidic');
  const [reactionIndex, setReactionIndex] = useState(0);

  const filtered = mnReactions.filter(r => r.medium === medium);
  const selected = filtered[Math.min(reactionIndex, filtered.length - 1)];

  const mediumInfo = {
    acidic:   { label: 'Acidic Medium (H₂SO₄)', product: 'Mn²⁺ (colorless/pale pink)', productColor: '#f9a8d4', bg: 'bg-rose-500/5 border-rose-500/15', text: 'text-rose-400' },
    neutral:  { label: 'Neutral / Faintly Alkaline', product: 'MnO₂ (brown ppt)', productColor: '#92400e', bg: 'bg-amber-500/5 border-amber-500/15', text: 'text-amber-400' },
    alkaline: { label: 'Strongly Alkaline Medium', product: 'MnO₄²⁻ (green)', productColor: '#166534', bg: 'bg-emerald-500/5 border-emerald-500/15', text: 'text-emerald-400' },
  };

  const info = mediumInfo[medium];

  return (
    <div className="space-y-4">
      {/* Medium Selector */}
      <div className="grid grid-cols-3 gap-2">
        {(['acidic', 'neutral', 'alkaline'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMedium(m); setReactionIndex(0); }}
            className={cn(
              'py-2.5 rounded-xl text-[12px] font-bold border transition-all',
              m === medium
                ? m === 'acidic' ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                  : m === 'neutral' ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70'
            )}
          >
            {m === 'acidic' ? 'Acidic' : m === 'neutral' ? 'Neutral' : 'Alkaline'}
          </button>
        ))}
      </div>

      {/* Summary Banner */}
      <div className={`p-3 rounded-xl border text-[12px] ${info.bg}`}>
        <span className={`font-bold ${info.text}`}>{info.label}</span>
        <span className="text-white/50 mx-2">→</span>
        <span className="text-white/70">Mn reduces to: </span>
        <span className="font-bold text-white">{info.product}</span>
      </div>

      {/* Reaction Selector */}
      <div className="flex flex-wrap gap-2">
        {filtered.map((r, i) => (
          <button
            key={i}
            onClick={() => setReactionIndex(i)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all',
              i === reactionIndex
                ? 'bg-violet-500/20 border-violet-500/30 text-violet-300'
                : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70'
            )}
          >
            {r.reagent}
          </button>
        ))}
      </div>

      {/* Full Reaction Viewer */}
      {selected && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-3 text-[13px]">
            <div className="space-y-2">
              <div className="text-[11px] text-white/30 uppercase tracking-wider">Reduction Half-Reaction (MnO₄⁻)</div>
              <div className="font-mono text-rose-300 bg-rose-950/20 px-3 py-2 rounded-lg border border-rose-500/10">
                {selected.halfReductionHtml}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] text-white/30 uppercase tracking-wider">Oxidation Half-Reaction</div>
              <div className="font-mono text-cyan-300 bg-cyan-950/20 px-3 py-2 rounded-lg border border-cyan-500/10">
                {selected.partnerHtml}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] text-white/30 uppercase tracking-wider">Complete Ionic Equation</div>
              <div className="font-mono text-emerald-300 font-bold bg-emerald-950/20 px-3 py-2 rounded-lg border border-emerald-500/10 text-[12px]">
                {selected.fullEquationHtml}
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-amber-200/80 text-[12px]">{selected.observation}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INTERACTIVE WIDGET 3: MAGNETIC MOMENT CALCULATOR ─────────────────────────
interface MagIon {
  label: string;
  metal: string;
  config: string;
  dCount: number;
  unpaired: number;
}

const magIons: MagIon[] = [
  { label: 'Sc³⁺', metal: 'Sc', config: '[Ar] 3d⁰', dCount: 0, unpaired: 0 },
  { label: 'Ti³⁺', metal: 'Ti', config: '[Ar] 3d¹', dCount: 1, unpaired: 1 },
  { label: 'Ti²⁺', metal: 'Ti', config: '[Ar] 3d²', dCount: 2, unpaired: 2 },
  { label: 'V³⁺',  metal: 'V',  config: '[Ar] 3d²', dCount: 2, unpaired: 2 },
  { label: 'V²⁺',  metal: 'V',  config: '[Ar] 3d³', dCount: 3, unpaired: 3 },
  { label: 'Cr³⁺', metal: 'Cr', config: '[Ar] 3d³', dCount: 3, unpaired: 3 },
  { label: 'Cr²⁺', metal: 'Cr', config: '[Ar] 3d⁴', dCount: 4, unpaired: 4 },
  { label: 'Mn²⁺', metal: 'Mn', config: '[Ar] 3d⁵', dCount: 5, unpaired: 5 },
  { label: 'Mn³⁺', metal: 'Mn', config: '[Ar] 3d⁴', dCount: 4, unpaired: 4 },
  { label: 'Fe²⁺', metal: 'Fe', config: '[Ar] 3d⁶', dCount: 6, unpaired: 4 },
  { label: 'Fe³⁺', metal: 'Fe', config: '[Ar] 3d⁵', dCount: 5, unpaired: 5 },
  { label: 'Co²⁺', metal: 'Co', config: '[Ar] 3d⁷', dCount: 7, unpaired: 3 },
  { label: 'Co³⁺', metal: 'Co', config: '[Ar] 3d⁶', dCount: 6, unpaired: 4 },
  { label: 'Ni²⁺', metal: 'Ni', config: '[Ar] 3d⁸', dCount: 8, unpaired: 2 },
  { label: 'Cu²⁺', metal: 'Cu', config: '[Ar] 3d⁹', dCount: 9, unpaired: 1 },
  { label: 'Cu⁺',  metal: 'Cu', config: '[Ar] 3d¹⁰', dCount: 10, unpaired: 0 },
  { label: 'Zn²⁺', metal: 'Zn', config: '[Ar] 3d¹⁰', dCount: 10, unpaired: 0 },
];

function MagCalc() {
  const [selected, setSelected] = useState(9); // Fe²⁺

  const ion = magIons[selected];
  const n = ion.unpaired;
  const mu = Math.sqrt(n * (n + 2));
  const muStr = mu.toFixed(2);

  const filled: ('up' | 'both' | 'empty')[] = [0,1,2,3,4].map((i) => {
    const down = Math.max(0, ion.dCount - 5);
    const up = Math.min(ion.dCount, 5);
    if (i < down) return 'both';
    if (i < up) return 'up';
    return 'empty';
  });

  return (
    <div className="space-y-5">
      {/* Ion Selector */}
      <div className="flex flex-wrap gap-2">
        {magIons.map((ion, i) => (
          <button
            key={ion.label}
            onClick={() => setSelected(i)}
            className={cn(
              'px-3 py-1.5 rounded-xl text-[12px] font-bold border transition-all',
              i === selected
                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70'
            )}
          >
            {ion.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: Step-by-step */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-4">
          <div className="text-[11px] text-white/30 uppercase tracking-wider">Step-by-Step Calculation</div>

          <div className="space-y-3 text-[13px]">
            <div className="flex justify-between p-2.5 rounded-lg bg-white/3 border border-white/5">
              <span className="text-white/40">1. Ion</span>
              <span className="font-bold text-white">{ion.label}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-white/3 border border-white/5">
              <span className="text-white/40">2. Configuration</span>
              <span className="font-mono text-cyan-300 text-[12px]">{ion.config}</span>
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-white/3 border border-white/5">
              <span className="text-white/40">3. d-electron count</span>
              <span className="font-bold text-amber-300">{ion.dCount}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white/3 border border-white/5 space-y-2">
              <span className="text-white/40">4. Orbital boxes (Hund's rule)</span>
              <OrbitalBoxes dCount={ion.dCount} dElectrons={ion.dCount} />
            </div>
            <div className="flex justify-between p-2.5 rounded-lg bg-white/3 border border-white/5">
              <span className="text-white/40">5. Unpaired electrons (n)</span>
              <span className="font-bold text-rose-300">{n}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-violet-500/10 border border-violet-500/20 space-y-1">
              <span className="text-white/40 text-[11px]">6. Apply formula</span>
              <div className="font-mono text-[13px] text-violet-300">
                μ = √(n(n+2)) = √({n}×{n+2}) = √{n*(n+2)} = <span className="font-black text-white">{muStr} BM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Result */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-4 flex flex-col items-center justify-center text-center">
          <div className="text-white/40 text-[11px] uppercase tracking-wider">Spin-Only Magnetic Moment</div>
          <div>
            <div className="text-6xl font-black text-violet-300">{muStr}</div>
            <div className="text-white/50 text-lg mt-1">Bohr Magnetons (BM)</div>
          </div>
          <div className={cn(
            'px-4 py-2 rounded-xl font-bold text-[13px] border',
            n === 0
              ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
          )}>
            {n === 0 ? 'Diamagnetic' : `Paramagnetic (${n} unpaired)`}
          </div>
          {n === 0 && (
            <p className="text-white/40 text-[12px]">
              {ion.dCount === 0 ? 'd⁰ ion — no d electrons' : 'd¹⁰ ion — all paired'}
            </p>
          )}
        </div>
      </div>

      {/* Quick Reference Table */}
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              <th className="px-3 py-2.5 text-left text-white/40 font-bold">n (unpaired)</th>
              <th className="px-3 py-2.5 text-left text-white/40 font-bold">μ = √(n(n+2)) BM</th>
              <th className="px-3 py-2.5 text-left text-white/40 font-bold">Example ions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: 0, mu: '0', examples: 'Sc³⁺, Ti⁴⁺, Cu⁺, Zn²⁺' },
              { n: 1, mu: '1.73', examples: 'Ti³⁺, Cu²⁺' },
              { n: 2, mu: '2.83', examples: 'Ti²⁺, V³⁺, Ni²⁺' },
              { n: 3, mu: '3.87', examples: 'V²⁺, Cr³⁺, Co²⁺' },
              { n: 4, mu: '4.90', examples: 'Cr²⁺, Mn³⁺, Fe²⁺, Co³⁺' },
              { n: 5, mu: '5.92', examples: 'Mn²⁺, Fe³⁺' },
            ].map(row => (
              <tr key={row.n} className={cn(
                'border-b border-white/5',
                row.n === n ? 'bg-violet-500/10' : 'hover:bg-white/3'
              )}>
                <td className="px-3 py-2 font-bold text-white">{row.n}</td>
                <td className="px-3 py-2 font-mono text-violet-300 font-bold">{row.mu}</td>
                <td className="px-3 py-2 text-white/60">{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── COLLAPSIBLE SECTION ──────────────────────────────────────────────────────
function Collapsible({ title, icon, children, defaultOpen = true, accent = 'cyan' }:
  { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; accent?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' }) {
  const [open, setOpen] = useState(defaultOpen);
  const accents: Record<string, string> = {
    cyan:    'border-cyan-500/20 bg-cyan-500/5 text-cyan-300',
    violet:  'border-violet-500/20 bg-violet-500/5 text-violet-300',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
    amber:   'border-amber-500/20 bg-amber-500/5 text-amber-300',
    rose:    'border-rose-500/20 bg-rose-500/5 text-rose-300',
  };
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg border ${accents[accent]}`}>{icon}</div>
          <span className="text-[15px] font-bold text-white text-left">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function DfBlockDetail({ progress, isCompleted, onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'metal-explorer' | 'kmno4' | 'magcalc'>('metal-explorer');

  const tabs = [
    { id: 'metal-explorer' as const, label: 'Metal Explorer', icon: <Atom className="w-3.5 h-3.5" /> },
    { id: 'kmno4' as const, label: 'KMnO₄ Predictor', icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { id: 'magcalc' as const, label: 'μ Calculator', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0b0f1e] via-[#0d1220] to-[#0b0f1e] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-orange-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="violet">Chemistry</Tag>
            <Tag color="amber">Unit 8</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="orange">Hot Topic</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            d- and f-Block<br />
            <span className="bg-gradient-to-r from-violet-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">Elements</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Transition metals (Sc–Zn), their characteristic properties, chemistry of KMnO₄ and K₂Cr₂O₇, and a deep dive into the lanthanoid and actinoid series. Master the concepts behind color, magnetism, oxidation states, and redox reactions.
          </p>
          <div className="flex gap-3 flex-wrap text-[12px] text-white/40">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 25 min read</span>
            <span>·</span>
            <span>pyqFrequency: 56%</span>
            <span>·</span>
            <span className="text-amber-400 font-bold">Priority: High</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: What is a Transition Element? ─────────────────────────── */}
      <Collapsible title="1 · What Is a Transition Element?" icon={<Atom className="w-4 h-4" />} accent="violet">
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>
            The <strong className="text-white">d-block elements</strong> occupy Groups 3–12 in the periodic table, filling the <span className="text-violet-300">(n–1)d</span> subshells. However, a d-block element is only called a <strong className="text-white">transition element</strong> if its atom <em>or at least one of its stable ions</em> has an <strong className="text-amber-300">incomplete d-subshell</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-1.5">
              <div className="text-emerald-400 font-bold text-[12px] uppercase tracking-wider">✓ Transition Elements</div>
              <p className="text-white/70">Sc, Ti, V, Cr, Mn, Fe, Co, Ni, Cu — all have at least one stable ion with an incomplete d-subshell.</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 space-y-1.5">
              <div className="text-rose-400 font-bold text-[12px] uppercase tracking-wider">✗ d-block But NOT Transition</div>
              <p className="text-white/70"><strong className="text-white">Zn, Cd, Hg</strong> — their atoms are d¹⁰ and their common ions (Zn²⁺, Cd²⁺, Hg²⁺) are also d¹⁰. No incomplete d-subshell in any common state.</p>
            </div>
          </div>
          <ProTip>
            The old definition "transition = bridging s-block to p-block" is informal. The <strong>IUPAC-accepted definition</strong> requires an incomplete d-subshell in the element or its ions. This is why Zn is excluded but Cu is included (Cu⁺ is d¹⁰, but Cu²⁺ is d⁹ — incomplete, so Cu qualifies).
          </ProTip>
        </div>
      </Collapsible>

      {/* ── SECTION 2: Electronic Configurations ────────────────────────────── */}
      <Collapsible title="2 · Electronic Configurations & Anomalies" icon={<Star className="w-4 h-4" />} accent="cyan">
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>
            The general electronic configuration is: <span className="font-mono text-cyan-300 bg-cyan-950/30 px-2 py-0.5 rounded">(n−1)d¹⁻¹⁰ ns⁰⁻²</span>
          </p>
          <p>
            The filling of d orbitals follows the Aufbau principle, but two major anomalies arise because certain electron distributions provide exceptional stability through:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-white/65">
            <li><strong className="text-white">Maximum exchange energy</strong> when d-orbitals are half-filled (all same spin)</li>
            <li><strong className="text-white">Symmetrical distribution</strong> of electron density (half-filled d⁵ or fully filled d¹⁰)</li>
          </ul>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-4 py-3 text-left text-white/40 font-bold">Element (Z)</th>
                  <th className="px-4 py-3 text-left text-white/40 font-bold">Expected Config</th>
                  <th className="px-4 py-3 text-left text-white/40 font-bold">Actual Config</th>
                  <th className="px-4 py-3 text-left text-white/40 font-bold">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 bg-amber-500/5">
                  <td className="px-4 py-3 font-bold text-amber-300">Cr (Z = 24)</td>
                  <td className="px-4 py-3 font-mono text-white/50">[Ar] 3d⁴ 4s²</td>
                  <td className="px-4 py-3 font-mono text-emerald-300 font-bold">[Ar] 3d⁵ 4s¹</td>
                  <td className="px-4 py-3 text-white/65">Half-filled 3d⁵ — maximum exchange energy. One e⁻ shifts from 4s → 3d.</td>
                </tr>
                <tr className="border-b border-white/5 bg-amber-500/5">
                  <td className="px-4 py-3 font-bold text-amber-300">Cu (Z = 29)</td>
                  <td className="px-4 py-3 font-mono text-white/50">[Ar] 3d⁹ 4s²</td>
                  <td className="px-4 py-3 font-mono text-emerald-300 font-bold">[Ar] 3d¹⁰ 4s¹</td>
                  <td className="px-4 py-3 text-white/65">Fully filled 3d¹⁰ — symmetry and exchange energy together favor this.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <TrapCard title="Ion Configuration Rule">
            When forming ions, electrons are always removed from the <strong>outermost s orbital first</strong>, then d. So Fe²⁺ is [Ar] 3d⁶ <strong>not</strong> [Ar] 3d⁴4s². Never write 4s² remaining in a transition metal ion.
          </TrapCard>
        </div>
      </Collapsible>

      {/* ── SECTION 3: Key Properties ──────────────────────────────────────── */}
      <Collapsible title="3 · General Properties of 3d Transition Metals" icon={<BarChart3 className="w-4 h-4" />} accent="emerald">
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">

          {/* Atomic/Ionic Radii */}
          <div className="space-y-2">
            <SectionBanner label="A. Atomic & Ionic Radii" color="emerald" />
            <p>Atomic radii generally <strong className="text-white">decrease from Sc to Cr</strong>, then remains approximately constant (Fe, Co, Ni) due to increasing nuclear charge being offset by d-electron shielding, then slightly increases for Cu and Zn.</p>
          </div>

          {/* Enthalpy of Atomization */}
          <div className="space-y-2">
            <SectionBanner label="B. Enthalpy of Atomization" color="cyan" />
            <p>
              Transition metals have <strong className="text-white">high enthalpies of atomization</strong> because of strong metallic bonding involving large numbers of unpaired d electrons. The trend across the series is <strong className="text-amber-300">irregular</strong> (not a smooth curve).
            </p>
            <ExamTip>
              Mn has an unexpectedly <strong>low enthalpy</strong> (for the 3d series) because its half-filled 3d⁵4s² config holds electrons more tightly, reducing metallic bonding strength. Zn has the <strong>lowest</strong> in the series — its d¹⁰ configuration means no unpaired d-electrons contribute to metallic bonding.
            </ExamTip>
          </div>

          {/* Ionization Enthalpy */}
          <div className="space-y-2">
            <SectionBanner label="C. Ionization Enthalpy" color="violet" />
            <p>IE₁ values are higher than s-block but lower than p-block. They <strong className="text-white">increase irregularly</strong> across the series due to increasing nuclear charge but partially offset by d-electron shielding.</p>
          </div>

          {/* Oxidation States */}
          <div className="space-y-2">
            <SectionBanner label="D. Oxidation States" color="amber" />
            <p>Transition metals exhibit <strong className="text-white">variable oxidation states</strong> due to the small energy gap between (n–1)d and ns orbitals — both sets of electrons can participate in bonding.</p>
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    {['Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn'].map(s => (
                      <th key={s} className="px-2 py-2 text-center text-white/50 font-bold">{s}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {['+3','+2,+3,+4','+2,+3,+4,+5','+2,+3,+6','+2,+3,+4,+6,+7','+2,+3','+2,+3','+2','+1,+2','+2'].map((os, i) => (
                      <td key={i} className="px-2 py-2.5 text-center text-white/65 text-[11px]">{os}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-white/50">
              The <strong className="text-white">highest oxidation states</strong> occur in the middle of the series (Mn = +7, Cr = +6) where the number of d electrons available for bonding is maximized.
            </p>
          </div>

          {/* Electrode Potentials */}
          <div className="space-y-2">
            <SectionBanner label="E. Standard Electrode Potentials" color="rose" />
            <p>
              The trend in E°(M²⁺/M) is <strong className="text-white">irregular</strong>. It depends on three competing enthalpy terms:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-[11.5px]">
              {[
                { label: 'Sublimation Enthalpy', note: 'solid → gas', color: 'text-rose-300' },
                { label: 'Ionization Enthalpy', note: 'IE₁ + IE₂', color: 'text-amber-300' },
                { label: 'Hydration Enthalpy', note: 'M²⁺(g) → M²⁺(aq)', color: 'text-cyan-300' },
              ].map(t => (
                <div key={t.label} className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <div className={`font-bold ${t.color}`}>{t.label}</div>
                  <div className="text-white/40 mt-1">{t.note}</div>
                </div>
              ))}
            </div>
            <TrapCard title="Copper's Positive E° Explained">
              Cu has a <strong>positive E°(Cu²⁺/Cu) = +0.34 V</strong>, meaning it cannot liberate H₂ from <strong>non-oxidizing</strong> dilute acids like HCl or dilute H₂SO₄. High atomization and ionization enthalpies are not compensated by hydration enthalpy. However, Cu <strong>does</strong> react with oxidizing acids (HNO₃, hot conc. H₂SO₄).
            </TrapCard>

            {/* E° Numerical Table */}
            <div className="space-y-2 mt-3">
              <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Standard Reduction Potentials E°(M²⁺/M) — 3d Series</div>
              <div className="overflow-x-auto rounded-xl border border-white/8">
                <table className="w-full text-[11.5px]">
                  <thead>
                    <tr className="border-b border-white/8 bg-white/3">
                      {['Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn'].map(s => (
                        <th key={s} className="px-3 py-2 text-center text-white/50 font-bold">{s}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {['–2.09','–1.63','–1.13','–0.91','–1.18','–0.44','–0.28','–0.25','+0.34','–0.76'].map((v, i) => (
                        <td key={i} className={`px-3 py-2.5 text-center font-mono font-bold ${parseFloat(v) > 0 ? 'text-rose-400' : 'text-cyan-300'}`}>{v} V</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11.5px] text-white/45">
                Note the <strong className="text-rose-400">positive spike at Cu (+0.34 V)</strong> — the only 3d transition metal with a positive E°(M²⁺/M). Mn (–1.18 V) is more negative than its neighbors due to the extra stability of 3d⁵.
              </p>
            </div>

            {/* Melting Point Trend SVG */}
            <div className="space-y-2 mt-2">
              <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Melting Point Trend (3d Series)</div>
              <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
                <svg viewBox="0 0 340 110" className="w-full" style={{ maxHeight: 100 }}>
                  {/* Axes */}
                  <line x1="30" y1="10" x2="30" y2="90" stroke="#475569" strokeWidth="1" />
                  <line x1="30" y1="90" x2="330" y2="90" stroke="#475569" strokeWidth="1" />
                  <text x="8" y="55" fill="#475569" fontSize="7" transform="rotate(-90 8 55)" textAnchor="middle">M.P. →</text>
                  {/* Element labels */}
                  {['Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn'].map((el, i) => (
                    <text key={el} x={42 + i * 29} y="100" fill="#94a3b8" fontSize="7" textAnchor="middle">{el}</text>
                  ))}
                  {/* Bar heights — approximate relative melting points (1541,1668,1910,1907,1246,1538,1495,1455,1085,420) normalized */}
                  {[1541,1668,1910,1907,1246,1538,1495,1455,1085,420].map((mp, i) => {
                    const h = (mp / 1910) * 70;
                    const isMn = i === 4;
                    const isZn = i === 9;
                    return (
                      <g key={i}>
                        <rect
                          x={36 + i * 29}
                          y={90 - h}
                          width={12}
                          height={h}
                          fill={isMn ? '#f43f5e' : isZn ? '#f59e0b' : '#38bdf8'}
                          fillOpacity={0.7}
                          rx={2}
                        />
                        <text x={42 + i * 29} y={88 - h - 2} fill="#cbd5e1" fontSize="5.5" textAnchor="middle">{Math.round(mp/100)*100}</text>
                      </g>
                    );
                  })}
                  <text x="170" y="8" fill="#f43f5e" fontSize="6.5" textAnchor="middle">↑ Mn anomalously low (half-filled 3d⁵ stability)</text>
                </svg>
                <p className="text-[10.5px] text-white/35 mt-1 text-center">Mn has an anomalously <span className="text-rose-400">low melting point</span> (1246°C vs ~1500°C expected) due to its stable half-filled 3d⁵ configuration. Zn's very low mp (420°C) is due to complete d¹⁰ — no unpaired d electrons for metallic bonding.</p>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 3.5: KEY FIGURES ─────────────────────────────────────────── */}
      <Collapsible title="3.5 · Key Figures & Diagrams" icon={<BarChart3 className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-6 text-[13.5px] text-white/75 leading-relaxed">

          {/* Fig 1: Periodic Table Placement */}
          <div className="space-y-2">
            <SectionBanner label="Fig 1 — d-Block & f-Block Position in Periodic Table" color="cyan" />
            <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
              <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 135 }}>
                {/* s-block */}
                <rect x="5" y="5" width="30" height="80" rx="3" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
                <text x="20" y="35" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle">s</text>
                <text x="20" y="48" fill="#f43f5e" fontSize="6.5" textAnchor="middle">block</text>
                <text x="20" y="60" fill="#f43f5e" fontSize="6" textAnchor="middle">Gr 1,2</text>
                <text x="20" y="70" fill="#f43f5e" fontSize="6" textAnchor="middle">P 1–7</text>
                {/* d-block */}
                <rect x="100" y="30" width="120" height="55" rx="3" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="160" y="52" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">d-block</text>
                <text x="160" y="65" fill="#38bdf8" fontSize="7" textAnchor="middle">Groups 3–12</text>
                <text x="160" y="75" fill="#38bdf8" fontSize="6.5" textAnchor="middle">Periods 4–7</text>
                {/* p-block */}
                <rect x="295" y="5" width="40" height="80" rx="3" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
                <text x="315" y="35" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">p</text>
                <text x="315" y="48" fill="#a78bfa" fontSize="6.5" textAnchor="middle">block</text>
                <text x="315" y="60" fill="#a78bfa" fontSize="6" textAnchor="middle">Gr 13–18</text>
                <text x="315" y="70" fill="#a78bfa" fontSize="6" textAnchor="middle">P 1–7</text>
                {/* f-block */}
                <rect x="55" y="100" width="220" height="30" rx="3" fill="#fb923c" fillOpacity="0.2" stroke="#fb923c" strokeWidth="1.5" />
                <text x="165" y="113" fill="#fb923c" fontSize="8" fontWeight="bold" textAnchor="middle">f-block (placed separately below)</text>
                <text x="165" y="124" fill="#fb923c" fontSize="6.5" textAnchor="middle">Lanthanoids (4f, Period 6) + Actinoids (5f, Period 7)</text>
                {/* Arrows */}
                <path d="M 50 55 L 95 55" stroke="#475569" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M 225 55 L 290 55" stroke="#475569" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M 160 90 L 160 96" stroke="#fb923c" strokeWidth="1" strokeDasharray="2,2" />
                <text x="70" y="50" fill="#475569" fontSize="6" textAnchor="middle">→ d fills Period 4+</text>
              </svg>
              <p className="text-[10.5px] text-white/35 mt-2 text-center">d-block starts at Period 4 because 3d energy falls below 4s only after Z=20 (Ca). The f-block is separated for layout convenience — they belong between Groups 2 and 3.</p>
            </div>
          </div>

          {/* Fig 2: (n-1)d vs ns orbital energy */}
          <div className="space-y-2">
            <SectionBanner label="Fig 2 — (n−1)d vs ns Orbital Energy Crossing" color="violet" />
            <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
              <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 125 }}>
                {/* Y axis */}
                <line x1="40" y1="10" x2="40" y2="120" stroke="#475569" strokeWidth="1" />
                <path d="M 40 10 L 37 15 M 40 10 L 43 15" stroke="#475569" strokeWidth="1" />
                <text x="8" y="70" fill="#64748b" fontSize="6.5" transform="rotate(-90 8 70)" textAnchor="middle">Energy (lower = more stable)</text>
                {/* X axis */}
                <line x1="40" y1="120" x2="320" y2="120" stroke="#475569" strokeWidth="1" />
                <text x="180" y="130" fill="#64748b" fontSize="7" textAnchor="middle">Atomic Number Z →</text>
                {/* Key Z markers */}
                {[['H','50'],['K/Ca','150'],['Sc','185'],['Zn','290']].map(([l,x]) => (
                  <text key={l} x={parseInt(x)} y="128" fill="#64748b" fontSize="6.5" textAnchor="middle">{l}</text>
                ))}
                {/* 4s curve — starts low, crosses, stays mid after 20 */}
                <path d="M 50,30 C 80,35 100,50 150,65 C 185,75 230,70 290,68" fill="none" stroke="#34d399" strokeWidth="2" />
                <text x="300" y="65" fill="#34d399" fontSize="7" fontWeight="bold">4s</text>
                {/* 3d curve — starts high, falls below 4s after Z~20 */}
                <path d="M 80,20 C 110,25 140,55 185,80 C 230,90 270,88 290,87" fill="none" stroke="#38bdf8" strokeWidth="2" />
                <text x="300" y="87" fill="#38bdf8" fontSize="7" fontWeight="bold">3d</text>
                {/* Crossing annotation */}
                <circle cx="150" cy="65" r="4" fill="none" stroke="#eab308" strokeWidth="1.5" />
                <text x="152" y="56" fill="#eab308" fontSize="6.5">Crossing ≈ Z=20</text>
                {/* Ionization arrow region */}
                <rect x="180" y="68" width="60" height="25" rx="2" fill="#f43f5e" fillOpacity="0.08" stroke="#f43f5e" strokeWidth="0.8" />
                <text x="210" y="79" fill="#f43f5e" fontSize="6" textAnchor="middle">4s higher in energy</text>
                <text x="210" y="88" fill="#f43f5e" fontSize="6" textAnchor="middle">→ ionized FIRST</text>
              </svg>
              <p className="text-[10.5px] text-white/35 mt-2 text-center">For Z {'<'} 20, 4s is more stable than 3d (fills first). After Z {'>'} 20, the 3d becomes more stable in the atom, but 4s is still the outermost orbital (higher energy) — so it is removed first during ionization.</p>
            </div>
          </div>

          {/* Fig 3: Crystal Field Splitting */}
          <div className="space-y-2">
            <SectionBanner label="Fig 3 — Octahedral Crystal Field Splitting (d-Orbital Splitting)" color="emerald" />
            <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
              <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 140 }}>
                {/* Free ion */}
                <text x="55" y="20" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Free Ion</text>
                <text x="55" y="32" fill="#94a3b8" fontSize="7" textAnchor="middle">(5 degenerate)</text>
                {[0,1,2,3,4].map(i => (
                  <rect key={i} x={30 + i * 8} y={60} width={6} height={20} rx={1} fill="#38bdf8" fillOpacity={0.3} stroke="#38bdf8" strokeWidth={0.8} />
                ))}
                <text x="55" y="95" fill="#94a3b8" fontSize="6.5" textAnchor="middle">5 d-orbitals</text>

                {/* Arrow */}
                <path d="M 110 75 L 155 75" stroke="#eab308" strokeWidth="1.5" />
                <path d="M 155 75 L 150 72 M 155 75 L 150 78" stroke="#eab308" strokeWidth="1.5" />
                <text x="132" y="70" fill="#eab308" fontSize="7" textAnchor="middle">Ligand field</text>

                {/* Octahedral split */}
                <text x="240" y="20" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Octahedral Field</text>
                {/* eg (higher) — dx2-y2, dz2 */}
                <text x="240" y="38" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle">eg (×2) — HIGHER</text>
                <rect x="210" y="42" width="18" height="16" rx={2} fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={1} />
                <rect x="252" y="42" width="18" height="16" rx={2} fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={1} />
                <text x="219" y="53" fill="#f43f5e" fontSize="6" textAnchor="middle">dz²</text>
                <text x="261" y="53" fill="#f43f5e" fontSize="6" textAnchor="middle">dx²-y²</text>

                {/* Delta_o */}
                <line x1="290" y1="50" x2="290" y2="100" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
                <path d="M 290 50 L 287 55 M 290 50 L 293 55" stroke="#eab308" strokeWidth="1" />
                <path d="M 290 100 L 287 95 M 290 100 L 293 95" stroke="#eab308" strokeWidth="1" />
                <text x="306" y="78" fill="#eab308" fontSize="7" textAnchor="middle">Δo</text>

                {/* t2g (lower) — dxy, dyz, dxz */}
                <text x="240" y="118" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">t₂g (×3) — LOWER</text>
                <rect x="195" y="98" width="18" height="16" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
                <rect x="228" y="98" width="18" height="16" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
                <rect x="261" y="98" width="18" height="16" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
                <text x="204" y="109" fill="#34d399" fontSize="5.5" textAnchor="middle">dxy</text>
                <text x="237" y="109" fill="#34d399" fontSize="5.5" textAnchor="middle">dyz</text>
                <text x="270" y="109" fill="#34d399" fontSize="5.5" textAnchor="middle">dxz</text>

                <text x="240" y="135" fill="#94a3b8" fontSize="6.5" textAnchor="middle">Electron jumps t₂g → eg absorbs light → complementary color observed</text>
              </svg>
              <p className="text-[10.5px] text-white/35 mt-2 text-center">In an octahedral ligand field, d-orbitals split into lower-energy <span className="text-emerald-400 font-bold">t₂g</span> (3 orbitals: dxy, dyz, dxz) and higher-energy <span className="text-rose-400 font-bold">eg</span> (2 orbitals: dz², dx²-y²). The energy gap is Δo. Electrons absorbing Δo cause color.</p>
            </div>
          </div>

          {/* Fig 4: Magnetic Moment Chart */}
          <div className="space-y-2">
            <SectionBanner label="Fig 4 — Spin-Only Magnetic Moment μ vs Unpaired Electrons n" color="rose" />
            <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
              <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 115 }}>
                <line x1="40" y1="10" x2="40" y2="100" stroke="#475569" strokeWidth="1" />
                <line x1="40" y1="100" x2="320" y2="100" stroke="#475569" strokeWidth="1" />
                <text x="14" y="58" fill="#64748b" fontSize="6.5" transform="rotate(-90 14 58)" textAnchor="middle">μ (BM)</text>
                <text x="180" y="115" fill="#64748b" fontSize="7" textAnchor="middle">n (unpaired electrons)</text>
                {[0,1,2,3,4,5].map(n => {
                  const mu = Math.sqrt(n*(n+2));
                  const x = 60 + n * 44;
                  const y = 100 - (mu / 5.92) * 80;
                  return (
                    <g key={n}>
                      <circle cx={x} cy={y} r={5} fill="#a78bfa" fillOpacity={0.8} />
                      <text x={x} y={100+11} fill="#94a3b8" fontSize="7.5" textAnchor="middle">{n}</text>
                      <text x={x} y={y-8} fill="#c4b5fd" fontSize="7" textAnchor="middle">{mu.toFixed(2)}</text>
                      {n > 0 && <line x1={60+(n-1)*44} y1={100-(Math.sqrt((n-1)*(n+1))/5.92)*80} x2={x} y2={y} stroke="#7c3aed" strokeWidth="1.5" />}
                    </g>
                  );
                })}
                <text x="260" y="22" fill="#a78bfa" fontSize="7">μ = √(n(n+2))</text>
                <text x="260" y="33" fill="#a78bfa" fontSize="7">max at n=5</text>
                <text x="260" y="43" fill="#a78bfa" fontSize="7">(Mn²⁺, Fe³⁺)</text>
              </svg>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ── SECTION 4: Color, Magnetism, Catalysis ─────────────────────────── */}
      <Collapsible title="4 · Color, Magnetism, Catalysis & Interstitial Compounds" icon={<Sparkles className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">

          <div className="space-y-3">
            <SectionBanner label="A. Color of Ions" color="violet" />
            <p>Transition metal ions are colored due to two mechanisms:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15">
                <div className="text-violet-300 font-bold mb-2 text-[12.5px] uppercase tracking-wider">d–d Transitions</div>
                <p className="text-white/65 text-[12.5px]">Ligands cause crystal field splitting of d-orbitals. Electrons absorb specific wavelengths to jump between split levels. The complementary color is observed.</p>
                <p className="text-white/50 text-[11.5px] mt-2">Examples: Ti³⁺ (violet), Fe³⁺ (yellow-brown), Ni²⁺ (green)</p>
              </div>
              <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15">
                <div className="text-orange-300 font-bold mb-2 text-[12.5px] uppercase tracking-wider">Charge-Transfer Transitions</div>
                <p className="text-white/65 text-[12.5px]">An electron transfers between the metal and ligand. These give very <strong className="text-white">intense colors</strong> even in d⁰ species.</p>
                <p className="text-white/50 text-[11.5px] mt-2">Examples: MnO₄⁻ (intense purple, Mn⁷⁺ = d⁰), Cr₂O₇²⁻ (orange, Cr⁶⁺ = d⁰)</p>
              </div>
            </div>
            <TrapCard title="d⁰ and d¹⁰ are Colorless (generally)">
              Ions like Sc³⁺, Ti⁴⁺, Cu⁺, Zn²⁺ are <strong>colorless</strong> in simple aqueous solution because d–d transitions are impossible (no electrons to excite or no empty orbital). MnO₄⁻ is the key exception — its intense purple is charge-transfer, not d–d.
            </TrapCard>
          </div>

          <div className="space-y-3">
            <SectionBanner label="B. Magnetic Properties" color="rose" />
            <p>Substances with <strong className="text-white">unpaired electrons</strong> are paramagnetic (attracted to magnetic field). All electrons paired → diamagnetic (weakly repelled).</p>
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 text-center">
              <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">Spin-only formula</div>
              <div className="text-2xl font-mono font-black text-violet-300">μ = √[n(n+2)] BM</div>
              <div className="text-white/40 text-[11.5px] mt-1">n = number of unpaired electrons</div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="C. Catalytic Properties" color="emerald" />
            <p>Transition metals are excellent catalysts due to:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2 text-white/65">
              <li><strong className="text-white">Variable oxidation states</strong> → can form unstable intermediate compounds with reactants</li>
              <li><strong className="text-white">Available d-orbitals</strong> → can adsorb reactants on their surface (heterogeneous catalysis)</li>
            </ul>
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-4 py-2.5 text-left text-white/40">Catalyst</th>
                    <th className="px-4 py-2.5 text-left text-white/40">Reaction</th>
                    <th className="px-4 py-2.5 text-left text-white/40">Industry</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cat: 'Fe', rxn: 'N₂ + 3H₂ → 2NH₃', ind: 'Haber process' },
                    { cat: 'V₂O₅', rxn: '2SO₂ + O₂ → 2SO₃', ind: 'Contact process (H₂SO₄)' },
                    { cat: 'Ni / Pt', rxn: 'Alkene + H₂ → Alkane', ind: 'Hydrogenation of oils' },
                    { cat: 'Pt-Rh', rxn: '4NH₃ + 5O₂ → 4NO + 6H₂O', ind: 'Ostwald process (HNO₃)' },
                  ].map(r => (
                    <tr key={r.cat} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-4 py-2.5 font-bold text-violet-300">{r.cat}</td>
                      <td className="px-4 py-2.5 font-mono text-white/70 text-[11px]">{r.rxn}</td>
                      <td className="px-4 py-2.5 text-white/50">{r.ind}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="D. Interstitial Compounds" color="cyan" />
            <p>Transition metals form <strong className="text-white">interstitial compounds</strong> when small atoms (H, C, N, B) occupy the interstitial sites (holes) in their crystal lattice. Properties:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-white/65">
              <li>High melting points, great hardness (e.g. steel = Fe + C)</li>
              <li>Chemically inert (less reactive than parent metal)</li>
              <li>Retain metallic conductivity</li>
              <li>Non-stoichiometric (variable composition)</li>
            </ul>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 5: K₂Cr₂O₇ ────────────────────────────────────────────── */}
      <Collapsible title="5 · Potassium Dichromate (K₂Cr₂O₇)" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">

          <div className="space-y-2">
            <SectionBanner label="Preparation from Chromite Ore" color="amber" />
            <div className="space-y-2 text-[12.5px]">
              {[
                { step: '1', label: 'Ore roasting in air', eq: '4FeCr₂O₄ + 8Na₂CO₃ + 7O₂ → 8Na₂CrO₄ + 2Fe₂O₃ + 8CO₂', note: 'Chromate (yellow)' },
                { step: '2', label: 'Acidification', eq: '2Na₂CrO₄ + H₂SO₄ → Na₂Cr₂O₇ + Na₂SO₄ + H₂O', note: 'Dichromate (orange)' },
                { step: '3', label: 'K⁺ treatment', eq: 'Na₂Cr₂O₇ + 2KCl → K₂Cr₂O₇ + 2NaCl', note: 'K₂Cr₂O₇ less soluble, crystallizes out' },
              ].map(s => (
                <div key={s.step} className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-black flex items-center justify-center">{s.step}</span>
                    <span className="text-white/50 text-[11px] font-bold uppercase">{s.label}</span>
                  </div>
                  <div className="font-mono text-orange-300 text-[11.5px]">{s.eq}</div>
                  <div className="text-white/40 text-[11px] mt-1">{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Chromate–Dichromate Equilibrium" color="rose" />
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 text-center space-y-2">
              <div className="font-mono text-[13px] text-white">
                2CrO₄²⁻ (yellow) + 2H⁺ ⇌ Cr₂O₇²⁻ (orange) + H₂O
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px] mt-2">
                <div className="text-amber-300"><strong>Acidic medium</strong>: equilibrium shifts right → Cr₂O₇²⁻ (orange)</div>
                <div className="text-cyan-300"><strong>Basic medium</strong>: equilibrium shifts left → CrO₄²⁻ (yellow)</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Oxidizing Reactions in Acidic Medium" color="cyan" />
            <p className="text-[12.5px]">Half-reaction: <span className="font-mono text-orange-300">Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O</span></p>
            <div className="space-y-2">
              {[
                { reductant: 'Fe²⁺ → Fe³⁺', eq: 'K₂Cr₂O₇ + 6FeSO₄ + 7H₂SO₄ → K₂SO₄ + Cr₂(SO₄)₃ + 3Fe₂(SO₄)₃ + 7H₂O' },
                { reductant: 'I⁻ → I₂', eq: 'K₂Cr₂O₇ + 6KI + 7H₂SO₄ → K₂SO₄ + Cr₂(SO₄)₃ + 3I₂ + 4K₂SO₄ + 7H₂O' },
                { reductant: 'H₂S → S', eq: 'K₂Cr₂O₇ + 3H₂S + 4H₂SO₄ → K₂SO₄ + Cr₂(SO₄)₃ + 3S↓ + 7H₂O' },
                { reductant: 'SO₂ → SO₄²⁻', eq: 'K₂Cr₂O₇ + 3SO₂ + H₂SO₄ → K₂SO₄ + Cr₂(SO₄)₃ + H₂O' },
              ].map(r => (
                <div key={r.reductant} className="p-3 rounded-xl bg-[#090b18] border border-white/8">
                  <div className="text-cyan-400 font-bold text-[11px] uppercase tracking-wider mb-1">{r.reductant}</div>
                  <div className="font-mono text-white/65 text-[11.5px] break-all">{r.eq}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 6: KMnO₄ ──────────────────────────────────────────────── */}
      <Collapsible title="6 · Potassium Permanganate (KMnO₄)" icon={<FlaskConical className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">

          <div className="space-y-2">
            <SectionBanner label="Preparation from MnO₂ (Pyrolusite)" color="rose" />
            <div className="space-y-2 text-[12.5px]">
              {[
                { step: '1', label: 'Alkaline oxidative fusion', eq: '2MnO₂ + 4KOH + O₂ → 2K₂MnO₄ + 2H₂O', note: 'Manganate (green, Mn⁶⁺)' },
                { step: '2', label: 'Oxidation (electrolytic or Cl₂)', eq: '2K₂MnO₄ + Cl₂ → 2KMnO₄ + 2KCl', note: 'Permanganate (purple, Mn⁷⁺)' },
              ].map(s => (
                <div key={s.step} className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[10px] font-black flex items-center justify-center">{s.step}</span>
                    <span className="text-white/50 text-[11px] font-bold uppercase">{s.label}</span>
                  </div>
                  <div className="font-mono text-pink-300 text-[11.5px]">{s.eq}</div>
                  <div className="text-white/40 text-[11px] mt-1">{s.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3">
            <div className="text-rose-400 font-bold text-[12.5px] uppercase tracking-wider">Medium-Dependent Reduction Product</div>
            <div className="grid grid-cols-3 gap-3 text-center text-[12px]">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <div className="text-rose-300 font-bold">Acidic</div>
                <div className="text-white/60 mt-1 text-[11px]">MnO₄⁻ + 8H⁺ + 5e⁻</div>
                <div className="text-white font-bold mt-1">Mn²⁺</div>
                <div className="text-white/40 text-[10px]">(colorless)</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="text-amber-300 font-bold">Neutral / Faint Alk.</div>
                <div className="text-white/60 mt-1 text-[11px]">MnO₄⁻ + 2H₂O + 3e⁻</div>
                <div className="text-white font-bold mt-1">MnO₂</div>
                <div className="text-white/40 text-[10px]">(brown ppt)</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-emerald-300 font-bold">Strongly Alkaline</div>
                <div className="text-white/60 mt-1 text-[11px]">MnO₄⁻ + e⁻</div>
                <div className="text-white font-bold mt-1">MnO₄²⁻</div>
                <div className="text-white/40 text-[10px]">(green manganate)</div>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 6.5: Important Compounds ───────────────────────────────── */}
      <Collapsible title="6.5 · Other Important Compounds" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">
          <p className="text-[12.5px] text-white/50">Beyond KMnO₄ and K₂Cr₂O₇, several other transition-element compounds are IAT-relevant for identification, properties, and applications.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                formula: 'TiCl₄', name: 'Titanium(IV) Chloride',
                color: 'cyan', appearance: 'Colourless fuming liquid',
                properties: [
                  'Strong Lewis acid — accepts electron pairs from ligands',
                  'Reacts vigorously with water: TiCl₄ + 2H₂O → TiO₂ + 4HCl',
                  'Used with AlR₃ in Ziegler-Natta polymerization catalyst',
                  'Ti is d⁰ (Ti⁴⁺) → colorless despite being a transition metal ion',
                ],
                os: '+4'
              },
              {
                formula: 'V₂O₅', name: 'Vanadium Pentoxide',
                color: 'amber', appearance: 'Orange-yellow solid',
                properties: [
                  'Contact process catalyst: 2SO₂ + O₂ ⇌ 2SO₃ (at ~450°C)',
                  'Acts as oxidizing agent; V⁵⁺ → V⁴⁺ during catalysis, then reoxidized',
                  'Amphoteric oxide — reacts with both acids and bases',
                  'Highest stable OS of V (+5) makes it an oxidant',
                ],
                os: '+5'
              },
              {
                formula: 'FeSO₄·7H₂O', name: 'Ferrous Sulphate (Mohr\'s Salt precursor)',
                color: 'emerald', appearance: 'Pale green crystalline solid',
                properties: [
                  'Fe²⁺ is a standard reducing agent in volumetric analysis',
                  'Mohr\'s salt = (NH₄)₂Fe(SO₄)₂·6H₂O — more stable than FeSO₄',
                  'Oxidized by KMnO₄ in acidic medium: Fe²⁺ → Fe³⁺',
                  'Color change: green (Fe²⁺) → yellow-brown (Fe³⁺)',
                ],
                os: '+2'
              },
              {
                formula: 'CuSO₄·5H₂O', name: 'Copper(II) Sulphate (Blue Vitriol)',
                color: 'violet', appearance: 'Blue crystalline solid',
                properties: [
                  'On heating: CuSO₄·5H₂O → CuSO₄ (anhydrous, white) + 5H₂O',
                  'Test for water: anhydrous CuSO₄ turns blue in presence of water',
                  'Blue color of Cu²⁺ (3d⁹) due to d–d transition in octahedral field',
                  'Used in Fehling\'s solution and as a fungicide (Bordeaux mixture)',
                ],
                os: '+2'
              },
            ].map(compound => (
              <div key={compound.formula} className={`p-4 rounded-2xl bg-${compound.color}-500/5 border border-${compound.color}-500/15 space-y-2`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className={`text-${compound.color}-300 font-black text-lg font-mono`}>{compound.formula}</div>
                    <div className="text-white/50 text-[11.5px]">{compound.name}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full bg-${compound.color}-500/15 border border-${compound.color}-500/20 text-${compound.color}-400 text-[10px] font-black`}>OS {compound.os}</span>
                </div>
                <div className="text-[11px] text-white/35 italic">{compound.appearance}</div>
                <ul className="space-y-1 text-[12px] text-white/65">
                  {compound.properties.map((p, i) => (
                    <li key={i} className="flex gap-1.5"><span className={`text-${compound.color}-400 shrink-0 mt-0.5`}>▸</span>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 7: f-block ─────────────────────────────────────────────── */}
      <Collapsible title="7 · f-Block: Lanthanoids & Actinoids" icon={<Atom className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">

          <p>
            The f-block elements are the <strong className="text-white">inner transition elements</strong>, associated with the progressive filling of 4f (lanthanoids) and 5f (actinoids) subshells. They are conventionally shown separately below the main periodic table.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 space-y-2">
              <div className="text-amber-300 font-bold uppercase tracking-wider text-[12px]">Lanthanoids (4f series)</div>
              <p className="text-white/65 text-[12.5px]">La (Z=57) to Lu (Z=71). The 4f subshell fills from Ce onwards. Common oxidation state: <strong className="text-white">+3</strong>. Ce also shows +4; Eu and Yb also show +2.</p>
              <p className="text-white/65 text-[12.5px]">Generally paramagnetic (4f electrons), most are colorful due to f–f transitions.</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/15 space-y-2">
              <div className="text-orange-300 font-bold uppercase tracking-wider text-[12px]">Actinoids (5f series)</div>
              <p className="text-white/65 text-[12.5px]">Ac (Z=89) to Lr (Z=103). All are <strong className="text-white">radioactive</strong>. Show a <strong className="text-white">wider range of OS</strong> (U shows +3 to +6; many form stable oxocations like UO₂²⁺).</p>
              <p className="text-white/65 text-[12.5px]">Wider OS range due to smaller 5f/6d/7s energy gap compared to 4f/5d/6s in lanthanoids.</p>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Lanthanoid Contraction" color="amber" />
            <p>
              Across the lanthanoid series (La → Lu), atomic and ionic radii <strong className="text-white">steadily decrease</strong>. This is called <strong className="text-amber-300">lanthanoid contraction</strong>.
            </p>
            <p>
              <strong className="text-white">Cause:</strong> 4f electrons have very <strong className="text-white">poor shielding efficiency</strong> — each additional 4f electron does not effectively shield the increased nuclear charge, so effective nuclear charge increases progressively, contracting the electron cloud.
            </p>
            <div className="space-y-2 text-[12.5px]">
              <div className="text-white/40 uppercase tracking-wider text-[11px] font-bold">Consequences:</div>
              {[
                'The 5d elements (Hf, Ta, W, ...) have almost the same size as their 4d counterparts (Zr, Nb, Mo, ...) — making separation of 4d/5d pairs extremely difficult.',
                'Basicity of Ln³⁺ ions decreases La³⁺ → Lu³⁺ (smaller ion → more charge concentrated → weaker base).',
                'This property allows separation of lanthanoids by ion-exchange chromatography.',
              ].map((c, i) => (
                <div key={i} className="flex gap-2 p-2.5 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-amber-400 font-bold shrink-0">{i+1}.</span>
                  <span className="text-white/65">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lanthanoids vs Actinoids Table */}
          <div className="space-y-2">
            <SectionBanner label="Lanthanoids vs. Actinoids Comparison" color="rose" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-4 py-2.5 text-left text-white/40 font-bold">Property</th>
                    <th className="px-4 py-2.5 text-left text-amber-400 font-bold">Lanthanoids</th>
                    <th className="px-4 py-2.5 text-left text-orange-400 font-bold">Actinoids</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Filling orbital', '4f', '5f'],
                    ['Elements', 'La – Lu (Z 57–71)', 'Ac – Lr (Z 89–103)'],
                    ['Radioactivity', 'Not radioactive (stable)', 'All radioactive'],
                    ['Common OS', '+3 (very stable)', '+3, +4, +5, +6 (variable)'],
                    ['OS Range', 'Narrow (+2, +3, +4 rarely)', 'Wide (+3 to +6; U shows all)'],
                    ['Contraction per element', 'Smaller (4f shielding slightly better)', 'Larger (5f shields even more poorly)'],
                    ['Magnetic behavior', 'Paramagnetic (most)', 'Paramagnetic (complex)'],
                    ['Abundance / availability', 'Occur naturally, some common', 'Most are man-made (synthetic)'],
                    ['Oxocations', 'Rare', 'Common (UO₂²⁺, NpO₂²⁺, PuO₂²⁺)'],
                  ].map(([prop, ln, ac], i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-4 py-2.5 text-white/50 font-bold">{prop}</td>
                      <td className="px-4 py-2.5 text-amber-200/70">{ln}</td>
                      <td className="px-4 py-2.5 text-orange-200/70">{ac}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 7.5: Applications ─────────────────────────────────────── */}
      <Collapsible title="7.5 · Applications of d- and f-Block Elements" icon={<Atom className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">

          {/* Biological */}
          <div className="space-y-3">
            <SectionBanner label="A. Biological Applications" color="emerald" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { metal: 'Fe', mol: 'Hemoglobin', role: 'O₂ transport in blood', detail: 'Fe²⁺ in heme group binds O₂ reversibly. Fe³⁺ (methemoglobin) cannot carry O₂ — oxidation state matters!', color: 'rose' },
                { metal: 'Co', mol: 'Vitamin B₁₂', role: 'Nerve function & DNA synthesis', detail: 'Cobalt is the only metal in a human vitamin. Co³⁺ in cobalamin is essential for red blood cell formation.', color: 'violet' },
                { metal: 'Zn', mol: 'Many Enzymes', role: 'Structural & catalytic roles', detail: 'Zn²⁺ in carbonic anhydrase, carboxypeptidase. Despite being d¹⁰ (not transition), Zn is biologically vital.', color: 'cyan' },
              ].map(b => (
                <div key={b.metal} className={`p-4 rounded-xl bg-${b.color}-500/5 border border-${b.color}-500/15 space-y-2`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xl font-black text-${b.color}-300 font-mono`}>{b.metal}</span>
                    <span className="text-white/50 text-[12px] font-bold">{b.mol}</span>
                  </div>
                  <div className={`text-[11px] font-bold text-${b.color}-400 uppercase tracking-wider`}>{b.role}</div>
                  <p className="text-[12px] text-white/60">{b.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Alloys */}
          <div className="space-y-3">
            <SectionBanner label="B. Alloy Formation" color="cyan" />
            <p>Transition metals readily form <strong className="text-white">alloys</strong> with other metals because they have similar atomic radii and can substitute for each other in crystal lattices (Hume-Rothery rules).</p>
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-4 py-2.5 text-left text-white/40 font-bold">Alloy</th>
                    <th className="px-4 py-2.5 text-left text-white/40 font-bold">Composition</th>
                    <th className="px-4 py-2.5 text-left text-white/40 font-bold">Properties & Uses</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Steel', comp: 'Fe + 0.5–1.5% C', use: 'Construction, machinery. Harder than pure iron due to interstitial C.' },
                    { name: 'Stainless Steel', comp: 'Fe + Cr (18%) + Ni (8%)', use: 'Corrosion-resistant. Cr forms passivating Cr₂O₃ layer.' },
                    { name: 'Brass', comp: 'Cu + Zn (20–45%)', use: 'Musical instruments, plumbing fittings. Hard, corrosion-resistant.' },
                    { name: 'Bronze', comp: 'Cu + Sn (12%)', use: 'Statues, coins. Harder and more durable than copper.' },
                    { name: 'Nichrome', comp: 'Ni + Cr (20%)', use: 'Heating elements (high resistivity, oxidation-resistant).' },
                    { name: 'Duralumin', comp: 'Al + Cu + Mn + Mg', use: 'Aircraft bodies. Light and strong. Mn here is the d-block contributor.' },
                  ].map(r => (
                    <tr key={r.name} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-4 py-2.5 font-bold text-cyan-300">{r.name}</td>
                      <td className="px-4 py-2.5 font-mono text-white/60 text-[11px]">{r.comp}</td>
                      <td className="px-4 py-2.5 text-white/55">{r.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Magnetic Materials */}
          <div className="space-y-3">
            <SectionBanner label="C. Magnetic Materials" color="violet" />
            <p><strong className="text-white">Ferromagnetism</strong> is a special form of magnetism seen in Fe, Co, and Ni (and their alloys). Unlike simple paramagnetism (individual unpaired electrons), ferromagnetic materials have <strong className="text-white">magnetic domains</strong> where all atomic magnetic moments align cooperatively.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-2">
                <div className="text-violet-300 font-bold text-[12.5px] uppercase tracking-wider">Ferromagnetic Metals</div>
                <p className="text-[12px] text-white/65"><strong className="text-white">Fe, Co, Ni</strong> — permanent magnets possible. Domains align below the Curie temperature.</p>
                <p className="text-[12px] text-white/65">Used in: electric motors, transformers, hard drives, MRI machines.</p>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 space-y-2">
                <div className="text-rose-400 font-bold text-[12.5px] uppercase tracking-wider">Why Not Mn?</div>
                <p className="text-[12px] text-white/65">Mn has 5 unpaired electrons (more than Fe!) but is NOT ferromagnetic. Its crystal structure prevents cooperative domain alignment. Certain Mn alloys (e.g. Heusler alloys) are ferromagnetic.</p>
              </div>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ── SECTION 8: Common Mistakes & IAT Focus ─────────────────────────── */}
      <Collapsible title="8 · Common Mistakes & IAT Shortcuts" icon={<Zap className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { title: 'Ion Electron Removal Order', body: 'Always remove 4s before 3d when forming ions. Fe → Fe²⁺: remove both 4s electrons first → [Ar] 3d⁶. Never keep 4s² in an ion.' },
              { title: 'Zn is NOT a Transition Metal', body: 'Zn (atom) is 3d¹⁰ 4s². Zn²⁺ is 3d¹⁰. No incomplete d-subshell anywhere → d-block, not transition element. Zn²⁺ is colorless and diamagnetic.' },
              { title: "Mn's Low Atomization Enthalpy", body: "Mn has a lower-than-expected enthalpy of atomization because its 3d⁵4s² electrons are held tightly in stable half-filled orbitals. Don't say it's because of 'weak bonds'." },
              { title: 'Cu Does NOT React with Dilute HCl', body: 'E°(Cu²⁺/Cu) = +0.34 V is positive, meaning Cu is a weaker reducing agent than H₂. So it cannot reduce H⁺ to H₂. Cu reacts with oxidizing acids (HNO₃) only.' },
              { title: 'MnO₄⁻ Color Is NOT d–d Transition', body: 'Mn in MnO₄⁻ is Mn⁷⁺ = d⁰. There are no d electrons to undergo d–d transitions. The intense purple arises from charge-transfer (O → Mn electron transfer).' },
              { title: 'Actinoid Contraction > Lanthanoid Contraction', body: '5f electrons have even poorer shielding than 4f, so the incremental contraction per element is greater across actinoids than lanthanoids.' },
            ].map(trap => <TrapCard key={trap.title} title={trap.title}>{trap.body}</TrapCard>)}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              'Highest OS in 3d series: Mn = +7 (in MnO₄⁻), Cr = +6 (in CrO₄²⁻/Cr₂O₇²⁻)',
              'Sc shows ONLY +3 OS (loses all three valence electrons). No other OS is common.',
              'KMnO₄ acidic medium → Mn²⁺ (colorless). Neutral → MnO₂ (brown). Alkaline → MnO₄²⁻ (green).',
              'Cr₂O₇²⁻ (orange) + OH⁻ → CrO₄²⁻ (yellow). CrO₄²⁻ + H⁺ → Cr₂O₇²⁻ (orange).',
              'Magnetic moment (spin-only): n=5 → 5.92 BM (e.g. Mn²⁺, Fe³⁺). n=4 → 4.90 BM (e.g. Fe²⁺, Cr²⁺). n=3 → 3.87 BM (e.g. Cr³⁺, Co²⁺).',
              'Lanthanoid separation uses ion-exchange chromatography (basicity difference due to size).',
              'Zr (4d) and Hf (5d) are almost identical in size → consequence of lanthanoid contraction.',
              'Fe, Co, Ni are ferromagnetic; Mn has most unpaired electrons but is NOT ferromagnetic (crystal structure prevents domain alignment).',
              'TiCl₄ is a strong Lewis acid (Ti⁴⁺ = d⁰); used in Ziegler-Natta polymerization.',
              'CuSO₄ (anhydrous) is white; turns blue with water → used as a test for water.',
              'Crystal field splitting: d-orbitals split into t₂g (lower, 3 orbitals) and eg (higher, 2 orbitals) in octahedral field.',
              'V₂O₅ is amphpteric: reacts with both acids and bases. OS of V = +5.',
              'Biological: Fe in hemoglobin (Fe²⁺ carries O₂; Fe³⁺ cannot), Co in Vitamin B₁₂.',
              'Alloys: Brass = Cu+Zn; Bronze = Cu+Sn; Stainless steel = Fe+Cr+Ni.',
            ].map((tip, i) => <ExamTip key={i}>{tip}</ExamTip>)}
          </div>
        </div>
      </Collapsible>

      {/* ── INTERACTIVE STUDY LAB ─────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 overflow-hidden bg-[#090b18]">
        <div className="p-5 border-b border-white/8 bg-gradient-to-r from-violet-500/5 to-orange-500/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-widest text-violet-400 uppercase">Interactive Study Lab</span>
          </div>
          <h2 className="text-lg font-black text-white">d-Block Master Tools</h2>
          <p className="text-white/40 text-[12px] mt-1">Three tools to master the most exam-frequent concepts in one place</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-[12px] font-bold border-b-2 transition-all flex-1 justify-center',
                activeTab === tab.id
                  ? 'border-violet-400 text-violet-300 bg-violet-500/5'
                  : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3'
              )}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'metal-explorer' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Select any element (Sc–Zn) to explore its configuration, oxidation states, unpaired electrons, magnetic moment, and ion orbital diagram.</p>
              <TransitionMetalExplorer />
            </div>
          )}
          {activeTab === 'kmno4' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Select the reaction medium and partner reactant to predict the KMnO₄ reduction product and see the balanced ionic equation.</p>
              <KMnO4Predictor />
            </div>
          )}
          {activeTab === 'magcalc' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Select an ion, trace its d-electron configuration step-by-step, and calculate the spin-only magnetic moment.</p>
              <MagCalc />
            </div>
          )}
        </div>
      </div>

      {/* ── RAPID REVISION ────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span className="text-[12px] font-black text-emerald-400 uppercase tracking-wider">Rapid Revision Checklist</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] text-white/70">
          {[
            'Transition element definition (incomplete d-subshell in atom or ion)',
            'Zn, Cd, Hg are d-block but NOT transition elements',
            'Cr = [Ar] 3d⁵ 4s¹; Cu = [Ar] 3d¹⁰ 4s¹ — anomalous configurations',
            'Remove 4s electrons first when forming ions',
            'Mn has max OS = +7; Sc has only +3',
            'Cu positive E° → does not displace H₂ from dilute acids',
            'Color: d⁰ and d¹⁰ ions are colorless; MnO₄⁻ is charge-transfer (not d–d)',
            'μ = √[n(n+2)] BM; highest for Mn²⁺/Fe³⁺ with n=5 → 5.92 BM',
            'KMnO₄: acidic→Mn²⁺; neutral→MnO₂; alkaline→MnO₄²⁻',
            'K₂Cr₂O₇ preparation: chromite → chromate → dichromate → K salt',
            'Chromate (yellow) ⇌ Dichromate (orange) by pH change',
            'Lanthanoid contraction → similar 4d/5d radii (e.g. Zr/Hf)',
            'Actinoid contraction > lanthanoid contraction (5f shields poorly)',
            'Actinoids: all radioactive; wider OS range (5f/6d gap is small)',
            'Interstitial compounds: non-stoichiometric, hard, high mp',
            'Catalysis: variable OS allows intermediate compound formation',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// Needed for TS JSX
function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/>
      <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75L19 14z"/>
      <path d="M5 18l.5 1.5L7 20l-1.5.5L5 22l-.5-1.5L3 20l1.5-.5L5 18z"/>
    </svg>
  );
}
