import React, { useState } from 'react';
import {
  Star, AlertTriangle, CheckCircle,
  BookOpen, Flame, Target, RefreshCw, Sparkles, HelpCircle, ArrowRight, Zap, Info
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function SectionBanner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span className="text-[11px] font-black tracking-widest text-cyan-400 uppercase">{label}</span>
    </div>
  );
}

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
  return (
    <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3.5 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono tracking-widest">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <p className="font-mono text-cyan-300 font-bold text-[14.5px] sm:text-base bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-500/10 inline-block" dangerouslySetInnerHTML={{ __html: formula }} />
      <div className="space-y-1.5 text-white/80 text-[13px] leading-relaxed">
        <p><strong className="text-white/40">Use:</strong> {use}</p>
        <p className="text-white/60"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
      </div>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/15 shadow-sm space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/70 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function ExamTipCard({ title = "Exam Tip", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/15 shadow-sm space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-amber-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/75 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

// ─── SVGS ─────────────────────────────────────────────────────────────────────
function RadiusTypesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-semibold">Fig 1 — Classification of Atomic Radii Types</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 120 }}>
        <g transform="translate(10, 20)">
          <circle cx="35" cy="45" r="22" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="65" cy="45" r="22" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.2" />
          <circle cx="35" cy="45" r="2" fill="#fff" />
          <circle cx="65" cy="45" r="2" fill="#fff" />
          <line x1="35" y1="45" x2="65" y2="45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,1" />
          <line x1="35" y1="45" x2="50" y2="45" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="50" y="85" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Covalent</text>
        </g>
        <g transform="translate(125, 20)">
          <circle cx="35" cy="45" r="22" fill="#a78bfa" fillOpacity="0.15" stroke="#a78bfa" strokeWidth="1.2" />
          <circle cx="79" cy="45" r="22" fill="#a78bfa" fillOpacity="0.15" stroke="#a78bfa" strokeWidth="1.2" />
          <circle cx="35" cy="45" r="2" fill="#fff" />
          <circle cx="79" cy="45" r="2" fill="#fff" />
          <line x1="35" y1="45" x2="79" y2="45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,1" />
          <line x1="35" y1="45" x2="57" y2="45" stroke="#c084fc" strokeWidth="1.5" />
          <text x="57" y="85" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Metallic</text>
        </g>
        <g transform="translate(240, 20)">
          <circle cx="20" cy="45" r="16" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1.2" />
          <circle cx="70" cy="45" r="16" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1.2" />
          <circle cx="20" cy="45" r="2" fill="#fff" />
          <circle cx="70" cy="45" r="2" fill="#fff" />
          <line x1="20" y1="45" x2="70" y2="45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,1" />
          <line x1="20" y1="45" x2="45" y2="45" stroke="#fb7185" strokeWidth="1.5" />
          <text x="45" y="85" fill="#f43f5e" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Van der Waals</text>
        </g>
      </svg>
    </div>
  );
}

function ShieldingPenetrationSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-violet-400/70 font-semibold">Fig 2 — Shielding Strength vs Orbital Penetration Depth</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 120 }}>
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <circle cx="25" cy="65" r="14" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="25" y="68" fill="#fff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Ze</text>
        <path d="M 25 15 A 50 50 0 0 1 25 115" fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeDasharray="3,2" />
        <path d="M 25 5 A 60 60 0 0 1 25 125" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3,2" />
        <path d="M 39 65 Q 90 20 180 50" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <circle cx="39" cy="65" r="4" fill="#22d3ee" />
        <text x="185" y="53" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">s (Max Penetration)</text>
        <path d="M 85 65 Q 150 110 240 85" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
        <circle cx="85" cy="65" r="4" fill="#f43f5e" />
        <text x="245" y="88" fill="#f43f5e" fontSize="8" fontFamily="monospace" fontWeight="bold">f (Max Shielded)</text>
        <rect x="75" y="110" width="200" height="8" rx="4" fill="url(#shieldGrad)" />
        <text x="75" y="105" fill="#ef4444" fontSize="8.5" fontFamily="monospace" textAnchor="start">Poor (f)</text>
        <text x="275" y="105" fill="#10b981" fontSize="8.5" fontFamily="monospace" textAnchor="end">Strong (s)</text>
        <text x="175" y="125" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Shielding Ability: s &gt; p &gt; d &gt; f</text>
      </svg>
    </div>
  );
}

function OxideScaleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-emerald-400/70 font-semibold">Fig 3 — Oxide Character Trend Across Period 3 Elements</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <line x1="20" y1="60" x2="320" y2="60" stroke="#475569" strokeWidth="2" />
        <circle cx="45" cy="60" r="10" fill="#3b82f6" />
        <text x="45" y="45" fill="#3b82f6" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Na₂O</text>
        <text x="45" y="85" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Strong Basic</text>
        <circle cx="95" cy="60" r="8" fill="#60a5fa" />
        <text x="95" y="45" fill="#60a5fa" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">MgO</text>
        <text x="95" y="85" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Basic</text>
        <circle cx="150" cy="60" r="8" fill="#eab308" />
        <text x="150" y="45" fill="#eab308" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Al₂O₃</text>
        <text x="150" y="85" fill="#eab308" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Amphoteric</text>
        <circle cx="205" cy="60" r="8" fill="#f87171" />
        <text x="205" y="45" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SiO₂</text>
        <text x="205" y="85" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Weak Acidic</text>
        <circle cx="260" cy="60" r="8" fill="#ef4444" />
        <text x="260" y="45" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SO₃</text>
        <text x="260" y="85" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Acidic</text>
        <circle cx="305" cy="60" r="10" fill="#dc2626" />
        <text x="305" y="45" fill="#dc2626" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Cl₂O₇</text>
        <text x="305" y="85" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Strong Acidic</text>
      </svg>
    </div>
  );
}

function AtomicRadiusGraphSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-semibold">Fig 4 — Atomic Radius (pm) vs Z</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 120 }}>
        <line x1="30" y1="10" x2="30" y2="110" stroke="#475569" strokeWidth="1.2" />
        <line x1="30" y1="110" x2="330" y2="110" stroke="#475569" strokeWidth="1.2" />
        <text x="25" y="113" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="end">0</text>
        <text x="25" y="73" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="end">100</text>
        <text x="25" y="33" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="end">200</text>
        <path d="M 40 49.2 L 70 65.2 L 100 74.8 L 130 79.2 L 160 80.4 L 190 83.6 L 220 84.4" fill="none" stroke="#22d3ee" strokeWidth="2" />
        <circle cx="40" cy="49.2" r="2.5" fill="#22d3ee" /><text x="40" y="42" fill="#22d3ee" fontSize="6.5" fontFamily="monospace">Li</text>
        <circle cx="70" cy="65.2" r="2.5" fill="#22d3ee" /><text x="70" y="58" fill="#22d3ee" fontSize="6.5" fontFamily="monospace">Be</text>
        <circle cx="100" cy="74.8" r="2.5" fill="#22d3ee" /><text x="100" y="67" fill="#22d3ee" fontSize="6.5" fontFamily="monospace">B</text>
        <circle cx="220" cy="84.4" r="2.5" fill="#22d3ee" /><text x="225" y="86" fill="#22d3ee" fontSize="6.5" fontFamily="monospace">F</text>
        <path d="M 55 35.6 L 85 46 L 115 52.8 L 145 62.8 L 175 66 L 205 68.4 L 235 70.4" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3,1" />
        <circle cx="55" cy="35.6" r="2.5" fill="#a78bfa" /><text x="55" y="29" fill="#a78bfa" fontSize="6.5" fontFamily="monospace">Na</text>
        <text x="170" y="123" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Z (Atomic Number) &rarr;</text>
      </svg>
    </div>
  );
}

function IonizationGraphSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-rose-400/70 font-semibold">Fig 5 — First IE vs Z Exceptions</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 120 }}>
        <line x1="35" y1="10" x2="35" y2="110" stroke="#475569" strokeWidth="1.2" />
        <line x1="35" y1="110" x2="330" y2="110" stroke="#475569" strokeWidth="1.2" />
        <text x="30" y="113" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="end">0</text>
        <text x="30" y="78" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="end">1000</text>
        <path d="M 50 86.6 L 80 69.5 L 110 74 L 140 61.1 L 170 46.9 L 200 50.9 L 230 34.4 L 260 16.4" fill="none" stroke="#f43f5e" strokeWidth="2" />
        <circle cx="50" cy="86.6" r="2.5" fill="#f43f5e" /><text x="50" y="94" fill="#f43f5e" fontSize="6.5" fontFamily="monospace">Li</text>
        <circle cx="80" cy="69.5" r="2.5" fill="#f43f5e" /><text x="80" y="62" fill="#f43f5e" fontSize="6.5" fontFamily="monospace" fontWeight="bold">Be</text>
        <circle cx="110" cy="74" r="2.5" fill="#f43f5e" /><text x="110" y="82" fill="#f43f5e" fontSize="6.5" fontFamily="monospace">B</text>
        <circle cx="170" cy="46.9" r="2.5" fill="#f43f5e" /><text x="170" y="39" fill="#f43f5e" fontSize="6.5" fontFamily="monospace" fontWeight="bold">N</text>
        <circle cx="200" cy="50.9" r="2.5" fill="#f43f5e" /><text x="200" y="58" fill="#f43f5e" fontSize="6.5" fontFamily="monospace">O</text>
      </svg>
    </div>
  );
}

export default function PeriodicityDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedElement, setSelectedElement] = useState<string>('Na');

  // Interactive Comparison States
  const [compEl1, setCompEl1] = useState<string>('Na');
  const [compEl2, setCompEl2] = useState<string>('Cl');

  // Configuration Trainer States
  const [trainerIndex, setTrainerIndex] = useState(0);
  const [trainerUserAns, setTrainerUserAns] = useState<{ block?: string; period?: string; group?: string }>({});
  const [trainerFeedback, setTrainerFeedback] = useState<string | null>(null);

  const elementsDb: Record<string, {
    name: string; symbol: string; Z: number; config: string; block: string; period: number; group: number;
    radius: number; ie: number; en: number; oxidation: string;
  }> = {
    H:  { name: 'Hydrogen', symbol: 'H', Z: 1, config: '1s¹', block: 's', period: 1, group: 1, radius: 37, ie: 1312, en: 2.2, oxidation: '+1, -1' },
    He: { name: 'Helium', symbol: 'He', Z: 2, config: '1s²', block: 's', period: 1, group: 18, radius: 31, ie: 2372, en: 0.0, oxidation: '0' },
    Li: { name: 'Lithium', symbol: 'Li', Z: 3, config: '[He] 2s¹', block: 's', period: 2, group: 1, radius: 152, ie: 520, en: 1.0, oxidation: '+1' },
    Be: { name: 'Beryllium', symbol: 'Be', Z: 4, config: '[He] 2s²', block: 's', period: 2, group: 2, radius: 112, ie: 899, en: 1.5, oxidation: '+2' },
    B:  { name: 'Boron', symbol: 'B', Z: 5, config: '[He] 2s² 2p¹', block: 'p', period: 2, group: 13, radius: 88, ie: 801, en: 2.0, oxidation: '+3' },
    C:  { name: 'Carbon', symbol: 'C', Z: 6, config: '[He] 2s² 2p²', block: 'p', period: 2, group: 14, radius: 77, ie: 1086, en: 2.5, oxidation: '+4, -4' },
    N:  { name: 'Nitrogen', symbol: 'N', Z: 7, config: '[He] 2s² 2p³', block: 'p', period: 2, group: 15, radius: 74, ie: 1402, en: 3.0, oxidation: '+5 to -3' },
    O:  { name: 'Oxygen', symbol: 'O', Z: 8, config: '[He] 2s² 2p⁴', block: 'p', period: 2, group: 16, radius: 66, ie: 1314, en: 3.5, oxidation: '-2' },
    F:  { name: 'Fluorine', symbol: 'F', Z: 9, config: '[He] 2s² 2p⁵', block: 'p', period: 2, group: 17, radius: 64, ie: 1681, en: 4.0, oxidation: '-1' },
    Ne: { name: 'Neon', symbol: 'Ne', Z: 10, config: '[He] 2s² 2p⁶', block: 'p', period: 2, group: 18, radius: 38, ie: 2080, en: 0.0, oxidation: '0' },
    Na: { name: 'Sodium', symbol: 'Na', Z: 11, config: '[Ne] 3s¹', block: 's', period: 3, group: 1, radius: 186, ie: 496, en: 0.9, oxidation: '+1' },
    Mg: { name: 'Magnesium', symbol: 'Mg', Z: 12, config: '[Ne] 3s²', block: 's', period: 3, group: 2, radius: 160, ie: 737, en: 1.2, oxidation: '+2' },
    Al: { name: 'Aluminium', symbol: 'Al', Z: 13, config: '[Ne] 3s² 3p¹', block: 'p', period: 3, group: 13, radius: 143, ie: 578, en: 1.5, oxidation: '+3' },
    Si: { name: 'Silicon', symbol: 'Si', Z: 14, config: '[Ne] 3s² 3p²', block: 'p', period: 3, group: 14, radius: 118, ie: 786, en: 1.8, oxidation: '+4, -4' },
    P:  { name: 'Phosphorus', symbol: 'P', Z: 15, config: '[Ne] 3s² 3p³', block: 'p', period: 3, group: 15, radius: 110, ie: 1012, en: 2.1, oxidation: '+5, +3, -3' },
    S:  { name: 'Sulfur', symbol: 'S', Z: 16, config: '[Ne] 3s² 3p⁴', block: 'p', period: 3, group: 16, radius: 104, ie: 1000, en: 2.5, oxidation: '+6, +4, -2' },
    Cl: { name: 'Chlorine', symbol: 'Cl', Z: 17, config: '[Ne] 3s² 3p⁵', block: 'p', period: 3, group: 17, radius: 99, ie: 1251, en: 3.0, oxidation: '+7 to -1' },
    Ar: { name: 'Argon', symbol: 'Ar', Z: 18, config: '[Ne] 3s² 3p⁶', block: 'p', period: 3, group: 18, radius: 71, ie: 1520, en: 0.0, oxidation: '0' },
    K:  { name: 'Potassium', symbol: 'K', Z: 19, config: '[Ar] 4s¹', block: 's', period: 4, group: 1, radius: 227, ie: 419, en: 0.8, oxidation: '+1' },
    Ca: { name: 'Calcium', symbol: 'Ca', Z: 20, config: '[Ar] 4s²', block: 's', period: 4, group: 2, radius: 197, ie: 590, en: 1.0, oxidation: '+2' },
    Sc: { name: 'Scandium', symbol: 'Sc', Z: 21, config: '[Ar] 3d¹ 4s²', block: 'd', period: 4, group: 3, radius: 162, ie: 633, en: 1.36, oxidation: '+3' },
    Ti: { name: 'Titanium', symbol: 'Ti', Z: 22, config: '[Ar] 3d² 4s²', block: 'd', period: 4, group: 4, radius: 147, ie: 658, en: 1.54, oxidation: '+4, +3, +2' },
    V:  { name: 'Vanadium', symbol: 'V', Z: 23, config: '[Ar] 3d³ 4s²', block: 'd', period: 4, group: 5, radius: 134, ie: 650, en: 1.63, oxidation: '+5 to +2' },
    Cr: { name: 'Chromium', symbol: 'Cr', Z: 24, config: '[Ar] 3d⁵ 4s¹', block: 'd', period: 4, group: 6, radius: 128, ie: 653, en: 1.66, oxidation: '+6, +3, +2' },
    Mn: { name: 'Manganese', symbol: 'Mn', Z: 25, config: '[Ar] 3d⁵ 4s²', block: 'd', period: 4, group: 7, radius: 127, ie: 717, en: 1.55, oxidation: '+7 to +2' },
    Fe: { name: 'Iron', symbol: 'Fe', Z: 26, config: '[Ar] 3d⁶ 4s²', block: 'd', period: 4, group: 8, radius: 126, ie: 762, en: 1.83, oxidation: '+3, +2' },
    Co: { name: 'Cobalt', symbol: 'Co', Z: 27, config: '[Ar] 3d⁷ 4s²', block: 'd', period: 4, group: 9, radius: 125, ie: 760, en: 1.88, oxidation: '+3, +2' },
    Ni: { name: 'Nickel', symbol: 'Ni', Z: 28, config: '[Ar] 3d⁸ 4s²', block: 'd', period: 4, group: 10, radius: 124, ie: 737, en: 1.91, oxidation: '+2, +3' },
    Cu: { name: 'Copper', symbol: 'Cu', Z: 29, config: '[Ar] 3d¹⁰ 4s¹', block: 'd', period: 4, group: 11, radius: 128, ie: 745, en: 1.9, oxidation: '+2, +1' },
    Zn: { name: 'Zinc', symbol: 'Zn', Z: 30, config: '[Ar] 3d¹⁰ 4s²', block: 'd', period: 4, group: 12, radius: 134, ie: 906, en: 1.65, oxidation: '+2' },
    Ga: { name: 'Gallium', symbol: 'Ga', Z: 31, config: '[Ar] 3d¹⁰ 4s² 4p¹', block: 'p', period: 4, group: 13, radius: 135, ie: 579, en: 1.81, oxidation: '+3' },
    Ge: { name: 'Germanium', symbol: 'Ge', Z: 32, config: '[Ar] 3d¹⁰ 4s² 4p²', block: 'p', period: 4, group: 14, radius: 122, ie: 762, en: 2.01, oxidation: '+4, +2' },
    As: { name: 'Arsenic', symbol: 'As', Z: 33, config: '[Ar] 3d¹⁰ 4s² 4p³', block: 'p', period: 4, group: 15, radius: 120, ie: 947, en: 2.18, oxidation: '+5, +3, -3' },
    Se: { name: 'Selenium', symbol: 'Se', Z: 34, config: '[Ar] 3d¹⁰ 4s² 4p⁴', block: 'p', period: 4, group: 16, radius: 117, ie: 941, en: 2.55, oxidation: '+6, +4, -2' },
    Br: { name: 'Bromine', symbol: 'Br', Z: 35, config: '[Ar] 3d¹⁰ 4s² 4p⁵', block: 'p', period: 4, group: 17, radius: 114, ie: 1140, en: 2.96, oxidation: '+5, +1, -1' },
    Kr: { name: 'Krypton', symbol: 'Kr', Z: 36, config: '[Ar] 3d¹⁰ 4s² 4p⁶', block: 'p', period: 4, group: 18, radius: 112, ie: 1351, en: 3.0, oxidation: '0' }
  };

  const comp1 = elementsDb[compEl1] || elementsDb['Na'];
  const comp2 = elementsDb[compEl2] || elementsDb['Cl'];

  const trainerQuestions = [
    { config: '1s² 2s² 2p⁶ 3s² 3p⁴', block: 'p', period: '3', group: '16', explanation: 'Highest n=3 (Period 3). Last electron enters 3p (p-block). Group = 10 + 6 (valence) = 16.' },
    { config: '[Ar] 3d⁵ 4s¹', block: 'd', period: '4', group: '6', explanation: 'Chromium config! Highest n=4 (Period 4). Last electron in 3d (d-block). Group = d electrons (5) + s electrons (1) = 6.' },
    { config: '[Kr] 5s²', block: 's', period: '5', group: '2', explanation: 'Strontium config. Highest n=5 (Period 5). Last electron in 5s (s-block). Group = valence electrons = 2.' },
    { config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', block: 's', period: '6', group: '11', explanation: 'Gold (Au) config. Last electron fills s subshell for relativistic stability. Highest n=6 (Period 6). Group = d (10) + s (1) = 11.' }
  ];

  const currentTrainer = trainerQuestions[trainerIndex];

  const handleTrainerSubmit = () => {
    if (
      trainerUserAns.block === currentTrainer.block &&
      trainerUserAns.period === currentTrainer.period &&
      trainerUserAns.group === currentTrainer.group
    ) {
      setTrainerFeedback('🎉 Correct! ' + currentTrainer.explanation);
    } else {
      setTrainerFeedback('❌ Incorrect. Correct values: Block ' + currentTrainer.block.toUpperCase() + ', Period ' + currentTrainer.period + ', Group ' + currentTrainer.group + '. Explanation: ' + currentTrainer.explanation);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12 pb-24 px-4">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🧪</span>
              <Tag color="cyan">Chemistry Unit 3</Tag>
              <Tag color="rose">IAT Foundation</Tag>
              <Tag color="amber">High Yield</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[22px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Classification of Elements and Periodicity
            </h1>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-2 flex flex-wrap items-center gap-1.5">
              <span>Prerequisites:</span>
              <span className="text-white/60 bg-white/5 px-2 py-0.5 rounded text-[10px] border border-white/10">Bohr Orbits</span>
 <span className="text-white/60 bg-white/5 px-2 py-0.5 rounded text-[10px] border border-white/10">Quantum Numbers</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (3.0/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13.5px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-white/40">
              <span className="uppercase tracking-wider">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[11px] text-white/35 font-medium">
              {isCompleted ? 'Reading Completed — Quiz Unlocked! 🔓' : 'Scroll to complete the lesson and unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

      {/* PART 1: GENESIS OF PERIODIC CLASSIFICATION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 1</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Genesis of Periodic Classification</h2>
        </div>

        {/* Card 1: Historical Laws */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="1.1 Dobereiner &amp; Newlands" />
          <ul className="space-y-4 text-[13.5px] text-white/70">
            <li className="space-y-1">
              <strong className="text-white">'s Triads (1817)</strong>
              <p>Grouped elements in threes. The atomic weight of the middle element is approximately equal to the mean of the other two.</p>
 <div className="mt-1 p-2 rounded bg-black/45 text-cyan-300 text-[12px] inline-block border border-white/5">
                Li(7) - Na(23) - K(39) &rarr; (7+39)/2 = 23
              </div>
            </li>
            <li className="space-y-1">
              <strong className="text-white">Newlands'Dobereiner Law of Octaves (1866)</strong>
              <p>Properties of every 8th element repeat. Failed after Calcium (Ca).</p>
            </li>
          </ul>
        </div>

        {/* Card 2: Mendeleev */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5 shadow-lg">
          <SectionBanner label="1.2 Mendeleev's Periodic Law" />
          <p className="text-white/75 text-[13.5px] leading-relaxed">"The physical and chemical properties of elements are periodic functions of their atomic weights."
            
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-[13px]">
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-2">
              <strong className="text-emerald-400 block border-b border-emerald-500/10 pb-1 font-semibold uppercase text-[11.5px]">Achievements ✅</strong>
              <ul className="space-y-1.5 text-white/75">
                <li>✓ Corrected atomic weights (e.g. Be from 13.5 to 9)</li>
                <li>✓ Left gaps &amp; predicted Eka-Boron (Sc)</li>
                <li>✓ Predicted Eka-Aluminium (Ga) &amp; Eka-Silicon (Ge)</li>
              </ul>
            </div>
            <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl space-y-2">
              <strong className="text-rose-400 block border-b border-rose-500/10 pb-1 font-semibold uppercase text-[11.5px]">Limitations ❌</strong>
              <ul className="space-y-1.5 text-white/75">
                <li>✗ Hydrogen position was unguided</li>
                <li>✗ No position for isotopes</li>
                <li>✗ Weight order anomalies (Ar before K, Co before Ni)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: MODERN PERIODIC LAW & TABLE STRUCTURE */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 2</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Modern Periodic Law &amp; Structure</h2>
        </div>

        {/* Card 1: Modern Law */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/75 leading-relaxed">
          <SectionBanner label="2.1 Modern Periodic Law" />
          <p>"The physical and chemical properties of the elements are periodic functions of their atomic numbers."
            
          </p>
          <div className="p-4 bg-cyan-950/20 border border-cyan-500/10 rounded-xl space-y-1.5">
            <strong className="text-cyan-400 block">'s Law:</strong>
            <p>The square root of the X-ray frequency (&nu;) is proportional to atomic number: <code className="text-cyan-300 font-bold">&radic;&nu; = a(Z - b)</code>. This proved Z governs chemical identity.</p>
          </div>
        </div>

        {/* Card 2: Layout details */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="2.2 Periods and Groups" />
          <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1.5">
              <strong className="text-white block border-b border-white/5 pb-1">Periods (Horizontal Rows)</strong>
              <p>&bull; 1st (shortest): 2 elements (H, He)</p>
              <p>&bull; 2nd &amp; 3rd (short): 8 elements each (Li&ndash;Ne, Na&ndash;Ar)</p>
              <p>&bull; 4th &amp; 5th (long): 18 elements each (K&ndash;Kr, Rb&ndash;Xe)</p>
              <p>&bull; 6th &amp; 7th (longest): 32 elements each (includes Lanthanoids and Actinoids respectively)</p>
            </div>
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1.5">
              <strong className="text-white block border-b border-white/5 pb-1">Groups (Modern vs. Old Notation)</strong>
              <p>Modern periodic table has 18 vertical columns numbered 1 to 18 (IUPAC):</p>
              <p>&bull; <strong>s-block:</strong> Group 1 (IA) and Group 2 (IIA)</p>
              <p>&bull; <strong>d-block:</strong> Groups 3 to 12 (IIIB to VIIB, VIII, IB, IIB)</p>
              <p>&bull; <strong>p-block:</strong> Groups 13 to 17 (IIIA to VIIA) and Group 18 (Zero group / noble gases)</p>
            </div>
          </div>
        </div>

        {/* Card 3: Position of Hydrogen */}
        <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-[12.5px] font-extrabold text-cyan-400 uppercase tracking-wider">Position of Hydrogen: Dual Behavior ⭐</span>
            <Tag color="cyan">⭐⭐ High Yield</Tag>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-white/75">
            <div className="p-4 bg-black/35 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-white">Resembles Alkali Metals (Gp 1)</strong>
              <p>&bull; Electronic configuration: 1s¹ (like ns¹)</p>
              <p>&bull; Electropositive: forms H⁺ ion</p>
              <p>&bull; Forms oxides (H₂O) and halides (HCl)</p>
            </div>
            <div className="p-4 bg-black/35 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-white">Resembles Halogens (Gp 17)</strong>
              <p>&bull; Lacks 1 electron to complete Helium shell</p>
              <p>&bull; Non-metallic: forms diatomic H₂ gas</p>
              <p>&bull; Electronegative: forms hydride ion (H⁻)</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2B: CLASSIFICATION OF ELEMENTS BY BLOCKS (s-, p-, d-, f-blocks) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 2B</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">s-, p-, d-, and f-block Elements</h2>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="2.3 Block Characteristics &amp; Configurations" />
          <p className="text-white/70 text-[13.5px] leading-relaxed">
            Elements are classified into four blocks based on the subshell in which the differentiating (last) electron enters:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            {/* s-block */}
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">1. s-Block Elements (Groups 1 &amp; 2)</span>
              <p>&bull; <strong>Constituents:</strong> Alkali metals (Group 1, <code>ns¹</code>) and alkaline earth metals (Group 2, <code>ns²</code>).</p>
              <p>&bull; <strong>General Outer Configuration:</strong> <code>ns¹⁻²</code>.</p>
              <p>&bull; <strong>Key Properties:</strong> Highly reactive, low ionization enthalpies, soft metals with low melting/boiling points, exhibit +1 (Group 1) and +2 (Group 2) oxidation states. Mostly form ionic compounds (except Li and Be).</p>
            </div>

            {/* p-block */}
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-violet-400 font-bold block uppercase tracking-wider">2. p-Block Elements (Groups 13 to 18)</span>
              <p>&bull; <strong>Constituents:</strong> Metals, metalloids, and non-metals. Includes halogens (Group 17) and noble gases (Group 18).</p>
              <p>&bull; <strong>General Outer Configuration:</strong> <code>ns² np¹⁻⁶</code> (except Helium: <code>1s²</code>).</p>
              <p>&bull; <strong>Key Properties:</strong> Show variable oxidation states, high electronegativities, and form mostly covalent compounds. **Representative elements** comprise both the s- and p-blocks.</p>
            </div>

            {/* d-block */}
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-emerald-400 font-bold block uppercase tracking-wider">3. d-Block Elements (Groups 3 to 12)</span>
              <p>&bull; <strong>Constituents:</strong> Transition elements where outer <code>s</code> and inner <code>d</code> subshells are partially filled.</p>
              <p>&bull; <strong>General Outer Configuration:</strong> <code>(n-1)d¹⁻¹⁰ ns⁰⁻²</code>.</p>
              <p>&bull; <strong>Key Properties:</strong> All are metals, showing variable oxidation states, colored hydrated ions, paramagnetism, and catalytic properties. Often form alloys and interstitial compounds.</p>
            </div>

            {/* f-block */}
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-amber-400 font-bold block uppercase tracking-wider">4. f-Block Elements (Inner Transition)</span>
              <p>&bull; <strong>Constituents:</strong> Lanthanoids (4f, Z = 58-71) and Actinoids (5f, Z = 90-103) located in separate rows at the bottom.</p>
              <p>&bull; <strong>General Outer Configuration:</strong> <code>(n-2)f¹⁻¹⁴ (n-1)d⁰⁻¹ ns²</code>.</p>
              <p>&bull; <strong>Key Properties:</strong> Heavy metals, +3 oxidation state is most common. Actinoids are highly radioactive and show a wider range of oxidation states compared to Lanthanoids.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 3: ELECTRONIC CONFIGURATION PRINCIPLES */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 3</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Electronic Configurations</h2>
        </div>

        {/* Card 1: Governing Rules */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="3.1 Configuration Principles" />
          <ul className="space-y-3 text-[13.5px] text-white/70">
            <li>
              <strong className="text-white font-semibold">Aufbau Principle:</strong> Orbitals fill in order of increasing energy.
              <code className="text-cyan-300 block pt-1 font-mono text-[11.5px]">&mdash; (n+l) Rule: Lower (n+l) value fills first.</code>
            </li>
            <li>
              <strong className="text-white font-semibold">Pauli Exclusion Principle:</strong> Maximum of 2 electrons per orbital with opposite spins.
            </li>
            <li>
              <strong className="text-white font-semibold">Hund'Moseleys Rule:</strong> Degenerate orbitals fill singly with parallel spin first before pairing.
            </li>
          </ul>
        </div>

        {/* Card 2: Aufbau Exceptions */}
        <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-[12.5px] font-extrabold text-cyan-400 uppercase tracking-wider">Aufbau Exceptions (Half/Fully-Filled Shells) ⭐</span>
            <Tag color="cyan">⭐ Must Know</Tag>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-white/75">
            <div className="p-4 bg-black/35 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-white">Period 4 Anomalies</strong>
              <p>&bull; Chromium (Z=24): <code className="text-cyan-300">[Ar] 3d⁵ 4s¹</code></p>
              <p>&bull; Copper (Z=29): <code className="text-cyan-300">[Ar] 3d¹⁰ 4s¹</code></p>
            </div>
            <div className="p-4 bg-black/35 rounded-2xl border border-white/5 space-y-1">
              <strong className="text-white">Period 5 &amp; 6 Anomalies</strong>
              <p>&bull; Palladium (Z=46): <code className="text-cyan-300">[Kr] 4d¹⁰ 5s⁰</code></p>
              <p>&bull; Gold (Z=79): <code className="text-cyan-300">[Xe] 4f¹⁴ 5d¹⁰ 6s¹</code></p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4: EFFECTIVE NUCLEAR CHARGE (Zeff) & SLATER'S RULES */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 4</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Effective Nuclear Charge &amp; Slater's Rules</h2>
        </div>

        <ShieldingPenetrationSVG />

        <div className="grid sm:grid-cols-2 gap-4">
          <FormulaCard
            formula="Z_eff = Z − &sigma;"
            use="Net positive charge calculation"
            note="Z is atomic number, &sigma; is shielding constant calculated using Slater's rules."
            priority={5}
          />
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 text-[13.5px] text-white/75 leading-relaxed space-y-2">
            <strong className="text-cyan-400 block uppercase tracking-wider text-[12px]">Why Z_eff controls trends:</strong>
            <p>&bull; <strong>Atomic size:</strong> High Z_eff pulls valence shells closer, reducing radius.</p>
            <p>&bull; <strong>Ionization Enthalpy:</strong> High Z_eff binds electrons tighter, increasing energy needed to remove them.</p>
          </div>
        </div>

        {/* Card 2: Slater rules */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="4.2 Slater's Rules Calculations" />
          <p>Group electron shells: <code>(1s)(2s, 2p)(3s, 3p)(3d)(4s, 4p)(4d)...</code></p>
          <div className="space-y-3 pt-2 text-white/60">
            <p>&bull; <strong>ns/np electron:</strong> same group shields by <strong>0.35</strong>; (n-1) shell shields by <strong>0.85</strong>; (n-2) and deeper shield by <strong>1.00</strong>.</p>
            <p>&bull; <strong>nd/nf electron:</strong> same group shields by <strong>0.35</strong>; inner shells to the left shield by <strong>1.00</strong>.</p>
          </div>
        </div>
      </div>

      {/* PART 5: PERIODIC TRENDS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 5</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Periodic Trends &amp; Exceptions</h2>
        </div>

        <AtomicRadiusGraphSVG />
        <IonizationGraphSVG />

        {/* Individual Trend Cards */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="5.1 Atomic &amp; Ionic Radius" />
          <p>Atomic radius decreases across a period (Z_eff increases) and increases down a group (principal shell n increases).</p>
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl text-[12.5px] space-y-1">
            <p>&bull; <strong>Cation contraction:</strong> Cations are always smaller than parent atoms (e.g. Fe³⁺ &lt; Fe²⁺ &lt; Fe).</p>
            <p>&bull; <strong>Anion expansion:</strong> Anions are always larger than parent atoms (e.g. O²⁻ &gt; O).</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="5.2 Ionization Enthalpy (IE)" />
          <p>Minimum energy needed to remove the most loosely bound valence electron from a gaseous atom.</p>
          <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-1">
            <strong className="text-rose-400 block font-semibold text-[12px]">IE Exceptions:</strong>
            <p>&bull; <strong>Be &gt; B:</strong> Be has stable fully-filled 2s² subshell (penetration effect).</p>
            <p>&bull; <strong>N &gt; O:</strong> N has stable half-filled 2p³ subshell.</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="5.3 Electron Gain Enthalpy" />
          <p>Enthalpy change when a neutral gaseous atom accepts an electron. Generally exothermic for the first electron.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-1">
              <strong className="text-rose-400 block font-semibold text-[12px]">Gain Enthalpy Exceptions:</strong>
              <p>&bull; <strong>Cl &gt; F:</strong> Fluorine's tiny 2p shell creates high inter-electronic repulsion, reducing energy yield.</p>
              <p>&bull; <strong>S &gt; O:</strong> Oxygen exhibits exceptionally low gain enthalpy due to compact 2p subshell repulsions.</p>
            </div>
            <div className="p-4.5 bg-violet-500/5 border border-violet-500/10 rounded-xl space-y-1 text-white/70 leading-relaxed">
              <strong className="text-violet-400 block font-semibold text-[12px]">Gain Enthalpy vs. Electron Affinity (EA)</strong>
              <p><strong>Enthalpy (&Delta;_egH):</strong> Enthalpy change when adding an electron (negative represents exothermic release).</p>
              <p><strong>Affinity (EA):</strong> Tendency to attract an extra electron (positive represents stronger attraction). Under thermodynamic conditions, <code>&Delta;_egH &approx; &minus;EA</code>.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="5.4 Electronegativity" />
          <p>
            The qualitative tendency of an atom in a chemical compound to attract the shared pair of electrons to itself in a covalent bond.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1.5">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">Trends &amp; Scales</span>
              <p>&bull; <strong>Trend:</strong> Increases across a period (Z_eff increases, size decreases) and decreases down a group (atomic size increases).</p>
              <p>&bull; <strong>Pauling Scale:</strong> Arbitrary relative scale where Fluorine is assigned the highest value of 4.0. Cesium/Francium are lowest (~0.7).</p>
              <p>&bull; <strong>Mulliken Scale:</strong> Average of Ionization Energy and Electron Affinity: <code>EN = (IE + EA) / 2</code>.</p>
            </div>
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1.5">
              <span className="text-violet-400 font-bold block uppercase tracking-wider">Bond Nature &amp; Exceptions</span>
              <p>&bull; <strong>Noble Gases:</strong> Do not form stable covalent bonds in normal states, hence their electronegativity is considered zero.</p>
              <p>&bull; <strong>Metallicity connection:</strong> High electronegativity correlates with non-metallic properties, while low values reflect metallic character.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="5.5 Metallic &amp; Non-metallic Character" />
          <p>
            Reflects the ease of losing or gaining electrons:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">Metallic Character (Electropositivity)</span>
              <p>Tendency of an atom to lose valence electrons. Decreases across a period (Z_eff pulls tighter) and increases down a group (outer shell is further away, reducing IE).</p>
            </div>
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
              <span className="text-violet-400 font-bold block uppercase tracking-wider">Non-metallic Character (Electronegativity)</span>
              <p>Tendency to gain electrons to complete its valence shell. Increases across a period and decreases down a group. Metalloids (e.g. B, Si, Ge, As) sit at the boundary interface.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 6: FAJAN'S RULES & COVALENT CHARACTER */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 6</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">'s Rules &amp; Polarization</h2>
        </div>

        {/* Card 1: Rules summary */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="6.1 Polarization Factors" />
          <p>Polarization of the anion'Fajans electron cloud introduces covalent character into ionic bonds.</p>
          <div className="grid sm:grid-cols-2 gap-4 text-[13px] pt-2">
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1">
              <strong className="text-white">Favours Covalency:</strong>
              <p>&bull; Small cation size (high polarizing power)</p>
              <p>&bull; Large anion size (high polarizability)</p>
              <p>&bull; High ionic charge</p>
            </div>
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl space-y-1">
              <strong className="text-white">Examples:</strong>
              <p>&bull; <strong>LiI:</strong> Highly covalent (small Li⁺, large I⁻)</p>
              <p>&bull; <strong>BeCl₂:</strong> Covalent character due to high charge density of Be²⁺</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 7: DIAGONAL RELATIONSHIPS & INERT PAIR EFFECT */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 7</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Diagonal &amp; Inert Pair Effects</h2>
        </div>

        {/* Card 1: Diagonal Relationship */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="7.1 Diagonal Relationships" />
          <p>Period 2 elements (Li, Be, B) show striking similarity to diagonally adjacent Period 3 elements (Mg, Al, Si) due to similar ionic potential (&phi; = Charge / Size).</p>
          <div className="flex gap-4 text-[12.5px] pt-1">
            <span className="px-3 py-1 bg-white/5 rounded-xl border border-white/5">Li ↔ Mg</span>
            <span className="px-3 py-1 bg-white/5 rounded-xl border border-white/5">Be ↔ Al</span>
            <span className="px-3 py-1 bg-white/5 rounded-xl border border-white/5">B ↔ Si</span>
          </div>
        </div>

        {/* Card 2: Inert pair */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="7.2 Inert Pair Effect" />
          <p>The reluctance of outer valence ns² electrons to participate in bonding in heavier elements of Group 13, 14, and 15 due to poor shielding of d and f shells.</p>
 <p className="text-[12.5px] text-cyan-300 pt-1">
            Stability: Tl⁺ &gt; Tl³⁺ | Pb²⁺ &gt; Pb⁴⁺ | Bi³⁺ &gt; Bi⁵⁺
          </p>
        </div>
      </div>

      {/* PART 8: CHEMICAL PERIODICITY & OXIDES */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 8</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Chemical Periodicity &amp; Oxides</h2>
        </div>

        <OxideScaleSVG />

        {/* Chemical Reactions Table */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="8.2 Oxide Nature Reactions" />
          <div className="overflow-x-auto rounded-xl border border-white/5">
 <table className="w-full text-[12px] min-w-[500px] text-white/70">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
 <th className="px-4 py-2 text-left">Oxide Class</th>
 <th className="px-4 py-2 text-left">Representative Reaction</th>
 <th className="px-4 py-2 text-left text-cyan-300">Chemical Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Strongly Basic', 'Na₂O + H₂O → 2NaOH', 'Dissolves to yield strongly alkaline solutions.'],
                  ['Basic', 'MgO + H₂O → Mg(OH)₂', 'Sparingly soluble base.'],
                  ['Amphoteric', 'Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O\nAl₂O₃ + 2NaOH → 2NaAlO₂ + H₂O', 'Reacts with both strong acids and strong bases.'],
                  ['Acidic', 'P₄O₁₀ + 6H₂O → 4H₃PO₄', 'Yields phosphoric acid.'],
                  ['Strongly Acidic', 'SO₃ + H₂O → H₂SO₄\nCl₂O₇ + H₂O → 2HClO₄', 'Yields strong mineral oxyacids.']
                ].map(([cls, rxn, note]) => (
                  <tr key={cls} className="border-b border-white/5 last:border-0 hover:bg-white/[0.01]">
 <td className="px-4 py-2.5 font-bold text-white">{cls}</td>
 <td className="px-4 py-2.5 text-cyan-300 whitespace-pre">{rxn}</td>
                    <td className="px-4 py-2.5 font-sans">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 9: LANTHANIDE CONTRACTION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 9</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Lanthanide Contraction</h2>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70">
          <SectionBanner label="9.1 Cause &amp; Consequences" />
          <p>
            The steady decrease in atomic and ionic radii of the lanthanoid elements (Z = 58 to 71) from Lanthanum to Lutetium.
          </p>
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-2 text-[13px] text-white/60">
            <p>&bull; <strong>The Cause:</strong> Extremely poor shielding by the 14 inner 4f electrons.</p>
            <p>&bull; <strong>Consequence:</strong> Identical radii for 4d and 5d transition metal pairs (e.g. Zr &approx; Hf). Causes a doubling of density in 5d elements relative to 4d analogues.</p>
          </div>
        </div>
      </div>

      {/* PART 10: MEMORY TRICKS & MNEMONIC AIDS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5 shadow-lg">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 10</span>
          <h2 className="text-white font-display font-bold text-[17px]">Mnemonic Aids &amp; Shortcuts</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-[13.5px] leading-relaxed">
          <div className="p-4.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
            <strong className="text-cyan-400 block border-b border-white/5 pb-1">💡 Trend Mnemonic</strong>
            <p>&bull; <strong>Size:</strong> Decreases Across, Increases Down (Z<sub>eff</sub> pull vs shell addition).</p>
            <p>&bull; <strong>IE / EN:</strong> Increases Across, Decreases Down (Inversely linked to radius!).</p>
          </div>
          <div className="p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/10 space-y-2">
            <strong className="text-violet-400 block border-b border-white/5 pb-1">💡 Exceptions Cheat Sheet</strong>
            <p>&bull; <strong>IE:</strong> Be &gt; B (2s² vs 2p¹), N &gt; O (2p³ half-filled vs 2p⁴).</p>
            <p>&bull; <strong>Electron Gain:</strong> Cl &gt; F (F has compact 2p shell repulsions).</p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TOOLS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Interactive Periodic Table Explorer (Z = 1 to 36)</h2>
        </div>

        <div className="grid grid-cols-10 gap-1.5 p-2.5 rounded-2xl bg-black/40 border border-white/5 overflow-x-auto min-w-[320px]">
          {Object.keys(elementsDb).map(sym => {
            const el = elementsDb[sym];
            const isSelected = selectedElement === sym;
            return (
              <button
                key={sym}
                onClick={() => setSelectedElement(sym)}
                className={cn(
"p-2 text-center rounded-lg font-bold border transition-all min-w-[45px]",
                  el.block === 's' ? "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/20" : "",
                  el.block === 'p' ? "bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border-violet-500/20" : "",
                  el.block === 'd' ? "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/20" : "",
                  isSelected ? "ring-2 ring-amber-400 border-amber-400 scale-105" : ""
                )}
              >
                <span className="text-[9px] text-white/30 block font-normal">{el.Z}</span>
                <span className="text-[12px]">{sym}</span>
              </button>
            );
          })}
        </div>

        {selectedElement && elementsDb[selectedElement] && (
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-[13.5px] text-white/70 grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <h4 className="text-[15px] font-bold text-white">{elementsDb[selectedElement].name} ({selectedElement})</h4>
              <p>&bull; <strong>Atomic Number:</strong> {elementsDb[selectedElement].Z}</p>
              <p>&bull; <strong>Configuration:</strong> <code className="font-mono text-cyan-300">{elementsDb[selectedElement].config}</code></p>
              <p>&bull; <strong>Position:</strong> Period {elementsDb[selectedElement].period} | Group {elementsDb[selectedElement].group} ({elementsDb[selectedElement].block}-block)</p>
            </div>
            <div className="space-y-1.5 sm:border-l sm:border-white/5 sm:pl-4">
              <p>&bull; <strong>Covalent Radius:</strong> {elementsDb[selectedElement].radius} pm</p>
              <p>&bull; <strong>First IE:</strong> {elementsDb[selectedElement].ie} kJ/mol</p>
              <p>&bull; <strong>Electronegativity:</strong> {elementsDb[selectedElement].en}</p>
              <p>&bull; <strong>Oxidation States:</strong> {elementsDb[selectedElement].oxidation}</p>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE COMPARISON MODE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Trend Comparison Simulator</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11.5px] font-bold text-white/40 block mb-1">Element 1:</label>
            <select
              value={compEl1} onChange={e => setCompEl1(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              {Object.keys(elementsDb).map(sym => (
                <option key={sym} value={sym} className="bg-[#0A0C18]">{sym} - {elementsDb[sym].name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11.5px] font-bold text-white/40 block mb-1">Element 2:</label>
            <select
              value={compEl2} onChange={e => setCompEl2(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              {Object.keys(elementsDb).map(sym => (
                <option key={sym} value={sym} className="bg-[#0A0C18]">{sym} - {elementsDb[sym].name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/8 space-y-4 text-[13.5px] text-white/80">
          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span>Atomic Radius</span>
              <span>{comp1.symbol}: {comp1.radius} pm vs {comp2.symbol}: {comp2.radius} pm</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex flex-col justify-center">
                <div className="h-full bg-cyan-400" style={{ width: `${(comp1.radius / 250) * 100}%` }} />
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex flex-col justify-center">
                <div className="h-full bg-violet-400" style={{ width: `${(comp2.radius / 250) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-medium">
              <span>First Ionization Enthalpy</span>
              <span>{comp1.symbol}: {comp1.ie} kJ/mol vs {comp2.symbol}: {comp2.ie} kJ/mol</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex flex-col justify-center">
                <div className="h-full bg-cyan-400" style={{ width: `${(comp1.ie / 2500) * 100}%` }} />
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex flex-col justify-center">
                <div className="h-full bg-violet-400" style={{ width: `${(comp2.ie / 2500) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIGURATION TRAINER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Configuration Position Trainer</h2>
        </div>
        <p className="text-white/50 text-[13px]">
          Determine the Block, Period, and Group of the element with the following electronic configuration:
        </p>

        <div className="p-5 rounded-2xl border border-white/8 bg-black/40 text-center font-mono text-[16px] font-bold text-cyan-300">
          {currentTrainer.config}
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11.5px] font-bold text-white/40 block mb-1">Select Block:</label>
            <select
              value={trainerUserAns.block || ''}
              onChange={e => setTrainerUserAns(prev => ({ ...prev, block: e.target.value }))}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="" className="bg-[#0A0C18]">-- Select --</option>
              <option value="s" className="bg-[#0A0C18]">s-block</option>
              <option value="p" className="bg-[#0A0C18]">p-block</option>
              <option value="d" className="bg-[#0A0C18]">d-block</option>
              <option value="f" className="bg-[#0A0C18]">f-block</option>
            </select>
          </div>
          <div>
            <label className="text-[11.5px] font-bold text-white/40 block mb-1">Select Period:</label>
            <select
              value={trainerUserAns.period || ''}
              onChange={e => setTrainerUserAns(prev => ({ ...prev, period: e.target.value }))}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="" className="bg-[#0A0C18]">-- Select --</option>
              {['1', '2', '3', '4', '5', '6', '7'].map(p => (
                <option key={p} value={p} className="bg-[#0A0C18]">Period {p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11.5px] font-bold text-white/40 block mb-1">Select Group:</label>
            <select
              value={trainerUserAns.group || ''}
              onChange={e => setTrainerUserAns(prev => ({ ...prev, group: e.target.value }))}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="" className="bg-[#0A0C18]">-- Select --</option>
              {Array.from({ length: 18 }).map((_, i) => (
                <option key={i+1} value={String(i+1)} className="bg-[#0A0C18]">Group {i+1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 pt-2">
          <button
            onClick={handleTrainerSubmit}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-[13px] hover:bg-cyan-400 transition-colors"
          >
            Check Configuration
          </button>
          <button
            onClick={() => {
              setTrainerIndex(prev => (prev + 1) % trainerQuestions.length);
              setTrainerUserAns({});
              setTrainerFeedback(null);
            }}
 className="px-4 py-2.5 rounded-xl bg-white/5 text-white/60 hover:text-white border border-white/5 text-[12px] transition-colors"
          >
            Next Config &rarr;
          </button>
        </div>

        {trainerFeedback && (
          <div className={cn(
            "p-4 rounded-2xl border text-[13px] leading-relaxed",
            trainerFeedback.includes("Correct")
              ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-300"
              : "bg-rose-500/5 border-rose-500/10 text-rose-300"
          )}>
            {trainerFeedback}
          </div>
        )}
      </div>

      {/* SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Solved IAT Examples</h3>
          </div>
          <Tag color="emerald">Medium</Tag>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[12px] font-extrabold text-emerald-400 uppercase tracking-wider block">Example 1: Isoelectronic Species Sizing</span>
            <p className="text-white/85 font-medium">Arrange the following isoelectronic ions in order of increasing ionic radius: <code>N&sup3;⁻, O&sup2;⁻, F⁻, Na⁺, Mg&sup2;⁺, Al&sup3;⁺</code>.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/65">
              <p>1. Define species: All have 10 electrons in total (isoelectronic series).</p>
              <p>2. Nuclear charge (<i>Z</i>): Al (13), Mg (12), Na (11), F (9), O (8), N (7).</p>
              <p>3. Formula relation: <code>Ionic radius &prop; 1/Z</code>. Larger nuclear charge pulls the same 10 electrons tighter toward the nucleus, shrinking size.</p>
              <p className="text-cyan-300 font-bold font-mono text-[14px]">Al&sup3;⁺ &lt; Mg&sup2;⁺ &lt; Na⁺ &lt; F⁻ &lt; O&sup2;⁻ &lt; N&sup3;⁻</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[12px] font-extrabold text-emerald-400 uppercase tracking-wider block">Example 2: Electron Gain Enthalpy Comparisons</span>
            <p className="text-white/85 font-medium">Explain why Sulfur has a more negative electron gain enthalpy than Oxygen, despite Oxygen lying above Sulfur in Group 16.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/65">
              <p>1. Oxygen has an extremely compact 2p subshell.</p>
              <p>2. Adding an electron to Oxygen causes high inter-electronic repulsion, limiting energy yield.</p>
              <p>3. Sulfur has a larger 3p subshell, distributing incoming charge better, yielding more energy.</p>
              <p className="text-cyan-300 font-bold font-mono text-[14px]">&Delta;_egH(S) &lt; &Delta;_egH(O)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
          <h3 className="text-cyan-400 font-display font-bold text-[16px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Moseley's Law: √ν = a(Z - b). Proved Z is the fundamental periodicity factor",
            "Radius shrinkage: Decreases across period (Zeff ↑), increases down group (shells ↑)",
            "Radii types comparison: Covalent < Metallic < Van der Waals size limits",
            "Isoelectronic radius: size is inversely proportional to Z. Al³⁺ < Mg²⁺ < Na⁺ < F⁻",
            "Ionization energy exceptions: Be > B (2s² penetration) and N > O (2p³ stability)",
            "Electron gain enthalpy: Cl > F and S > O due to small shell inter-electronic repulsions",
            "Shielding capacity order: s > p > d > f (poor f-shielding causes contractions)",
            "Lanthanoid contraction: 4f poor shielding results in Zr ≈ Hf (similarity of size)",
            "Diagonal pairs: Li/Mg, Be/Al, B/Si (similar charge density and size ratios)",
            "Oxide basicity scale: basic metals (Na₂O) to amphoteric (Al₂O₃) to acidic non-metals (Cl₂O₇)"
          ].map(item => (
            <div key={item} className="flex items-start gap-2.5 text-[13px] text-white/70 py-1.5 border-b border-white/[0.04] last:border-0">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
