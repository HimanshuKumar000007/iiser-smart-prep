import React, { useState } from 'react';
import {
  Star, AlertTriangle, Zap, BookOpen, FlaskConical,
  Atom, BarChart3, RefreshCw, ChevronDown, ChevronUp, Layers, HelpCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SHARED HELPERS ──────────────────────────────────────────────────────────
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
  return <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${styles[color]}`}>{children}</span>;
}

function SectionBanner({ label, color = 'cyan' }: { label: string; color?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' }) {
  const c: Record<string, string> = { 
    cyan: 'bg-cyan-400 text-cyan-400', 
    violet: 'bg-violet-400 text-violet-400', 
    emerald: 'bg-emerald-400 text-emerald-400', 
    amber: 'bg-amber-400 text-amber-400', 
    rose: 'bg-rose-400 text-rose-400' 
  };
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${c[color].split(' ')[0]}`} />
      <span className={`text-[11px] font-black tracking-widest uppercase ${c[color].split(' ')[1]}`}>{label}</span>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-rose-400 uppercase tracking-wider">Exam Trap</span>
      </div>
      <div className="text-white/70 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-amber-400 uppercase tracking-wider">IAT Shortcut</span>
      </div>
      <div className="text-white/75 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-cyan-400 uppercase tracking-wider">Professor's Perspective</span>
      </div>
      <div className="text-white/75 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function Collapsible({ title, icon, children, defaultOpen = true, accent = 'cyan' }:
  { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; accent?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' }) {
  const [open, setOpen] = useState(defaultOpen);
  const accents: Record<string, string> = {
    cyan: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-300',
    violet: 'border-violet-500/20 bg-violet-500/5 text-violet-300',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
    amber: 'border-amber-500/20 bg-amber-500/5 text-amber-300',
    rose: 'border-rose-500/20 bg-rose-500/5 text-rose-300',
  };
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors">
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

function SolvedProblem({ title, question, solution }: { title: string; question: string; solution: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-white/3 border border-white/8 space-y-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-[12.5px] font-black text-emerald-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-[13px] text-white/90 font-bold leading-relaxed">{question}</div>
      <div className="p-4 rounded-xl bg-[#060814] border border-white/5 text-[12.5px] text-white/70 space-y-2 leading-relaxed font-mono">
        <div className="text-emerald-300 font-bold text-[11px] uppercase tracking-wider mb-1">Detailed Solution:</div>
        {solution}
      </div>
    </div>
  );
}

// ─── VISUAL SVG DIAGRAMS ─────────────────────────────────────────────────────
function WorkPVDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">P-V Work: Reversible vs Irreversible Expansion</span>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 150 }}>
        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="150" x2="320" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="35" y="25" fill="#94a3b8" fontSize="7" textAnchor="end">Pressure (P) →</text>
        <text x="310" y="162" fill="#94a3b8" fontSize="7" textAnchor="middle">Volume (V) →</text>

        {/* Shading for Reversible Work (under the curve) */}
        <path d="M 80,40 Q 140,85 260,110 L 260,150 L 80,150 Z" fill="#34d399" fillOpacity="0.15" />
        
        {/* Shading for Irreversible Work (constant P_ext = P2) */}
        <rect x="80" y="110" width="180" height="40" fill="#f43f5e" fillOpacity="0.2" />

        {/* Reversible Isothermal Curve */}
        <path d="M 80,40 Q 140,85 260,110" fill="none" stroke="#34d399" strokeWidth="2.5" />
        <circle cx="80" cy="40" r="4" fill="#34d399" />
        <text x="80" y="32" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">1 (P₁, V₁)</text>
        <circle cx="260" cy="110" r="4" fill="#34d399" />
        <text x="265" y="104" fill="#34d399" fontSize="7" fontWeight="bold">2 (P₂, V₂)</text>

        {/* Irreversible Path */}
        {/* Constant external pressure level (P2) */}
        <line x1="80" y1="110" x2="260" y2="110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,2" />
        <path d="M 80,40 L 80,110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,2" />
        <circle cx="80" cy="110" r="3.5" fill="#f43f5e" />

        {/* Labels for shaded regions */}
        <text x="170" y="130" fill="#f43f5e" fontSize="7.5" fontWeight="bold" textAnchor="middle">Irreversible Work (Rectangular Area)</text>
        <text x="170" y="75" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="middle">Extra Reversible Work</text>

        {/* V1, V2 labels */}
        <line x1="80" y1="150" x2="80" y2="155" stroke="#94a3b8" />
        <text x="80" y="164" fill="#94a3b8" fontSize="7" textAnchor="middle">V₁</text>
        <line x1="260" y1="150" x2="260" y2="155" stroke="#94a3b8" />
        <text x="260" y="164" fill="#94a3b8" fontSize="7" textAnchor="middle">V₂</text>
      </svg>
      <span className="text-[10.5px] text-white/40 mt-1 text-center max-w-sm">Reversible path follows intermediate steps (max area under curve). Irreversible path drops instantly to P_ext, yielding less expansion work.</span>
    </div>
  );
}

function CarnotCycleDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">The Carnot Cycle (P-V Plot)</span>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 150 }}>
        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="150" x2="320" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="35" y="25" fill="#94a3b8" fontSize="7" textAnchor="end">P →</text>
        <text x="310" y="162" fill="#94a3b8" fontSize="7" textAnchor="middle">V →</text>

        {/* Cycle outline */}
        {/* 1 -> 2 (Isothermal Exp, gentle, Th) */}
        <path d="M 80,40 Q 120,60 170,75" fill="none" stroke="#38bdf8" strokeWidth="2" />
        {/* 2 -> 3 (Adiabatic Exp, steep) */}
        <path d="M 170,75 Q 200,110 240,130" fill="none" stroke="#eab308" strokeWidth="2" />
        {/* 3 -> 4 (Isothermal Comp, gentle, Tc) */}
        <path d="M 240,130 Q 180,115 130,95" fill="none" stroke="#a855f7" strokeWidth="2" />
        {/* 4 -> 1 (Adiabatic Comp, steep) */}
        <path d="M 130,95 Q 100,65 80,40" fill="none" stroke="#f43f5e" strokeWidth="2" />

        {/* Node Points */}
        <circle cx="80" cy="40" r="3" fill="#38bdf8" />
        <text x="74" y="38" fill="#38bdf8" fontSize="7" fontWeight="bold">1</text>
        <circle cx="170" cy="75" r="3" fill="#38bdf8" />
        <text x="175" y="72" fill="#38bdf8" fontSize="7" fontWeight="bold">2</text>
        <circle cx="240" cy="130" r="3" fill="#a855f7" />
        <text x="245" y="138" fill="#a855f7" fontSize="7" fontWeight="bold">3</text>
        <circle cx="130" cy="95" r="3" fill="#a855f7" />
        <text x="125" y="103" fill="#a855f7" fontSize="7" fontWeight="bold">4</text>

        {/* Labels for steps */}
        <text x="125" y="50" fill="#38bdf8" fontSize="6" textAnchor="middle" transform="rotate(22 125 50)">Isotherm (T_h)</text>
        <text x="215" y="98" fill="#eab308" fontSize="6" textAnchor="middle" transform="rotate(35 215 98)">Adiabatic</text>
        <text x="185" y="130" fill="#a855f7" fontSize="6" textAnchor="middle" transform="rotate(20 185 130)">Isotherm (T_c)</text>
        <text x="95" y="75" fill="#f43f5e" fontSize="6" textAnchor="middle" transform="rotate(60 95 75)">Adiabatic</text>

        {/* Efficiency formula box */}
        <rect x="230" y="20" width="80" height="35" rx="4" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.1" />
        <text x="270" y="32" fill="#ffffff" fontSize="7.5" fontWeight="bold" textAnchor="middle">Efficiency (η)</text>
        <text x="270" y="46" fill="#34d399" fontSize="8" fontWeight="black" textAnchor="middle">1 − T_c/T_h</text>
      </svg>
    </div>
  );
}

function EntropyTempDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Entropy vs Temperature (Phase Transitions)</span>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 150 }}>
        {/* Axes */}
        <line x1="40" y1="20" x2="40" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="150" x2="320" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="35" y="25" fill="#94a3b8" fontSize="7" textAnchor="end">Entropy (S) →</text>
        <text x="310" y="162" fill="#94a3b8" fontSize="7" textAnchor="middle">Temp (T) →</text>

        {/* Solid segment */}
        <path d="M 40,150 Q 70,140 100,130" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="65" y="130" fill="#38bdf8" fontSize="7" fontWeight="bold">Solid</text>

        {/* Fusion transition */}
        <line x1="100" y1="130" x2="100" y2="90" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,1" />
        <text x="106" y="112" fill="#22c55e" fontSize="6.5" fontWeight="bold">Fusion (T_f)</text>

        {/* Liquid segment */}
        <path d="M 100,90 Q 150,85 200,80" fill="none" stroke="#eab308" strokeWidth="2.5" />
        <text x="150" y="75" fill="#eab308" fontSize="7" fontWeight="bold">Liquid</text>

        {/* Vaporization transition */}
        <line x1="200" y1="80" x2="200" y2="30" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,1" />
        <text x="206" y="55" fill="#ef4444" fontSize="6.5" fontWeight="bold">Vap (T_b)</text>

        {/* Gas segment */}
        <path d="M 200,30 Q 260,25 310,20" fill="none" stroke="#a855f7" strokeWidth="2.5" />
        <text x="260" y="15" fill="#a855f7" fontSize="7" fontWeight="bold">Gas</text>

        {/* Third law reference */}
        <circle cx="40" cy="150" r="3" fill="#ef4444" />
        <text x="45" y="146" fill="#ef4444" fontSize="6" fontWeight="bold">0 K (S = 0)</text>
      </svg>
    </div>
  );
}

function BornHaberCycleDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Born-Haber Cycle Energy Levels (NaCl)</span>
      <svg viewBox="0 0 340 200" className="w-full" style={{ maxHeight: 180 }}>
        {/* Levels */}
        {/* Gaseous Ions (highest) */}
        <line x1="40" y1="25" x2="160" y2="25" stroke="#f43f5e" strokeWidth="2" />
        <text x="45" y="20" fill="#f43f5e" fontSize="7" fontWeight="bold">Na⁺(g) + Cl(g) + e⁻</text>

        <line x1="180" y1="45" x2="300" y2="45" stroke="#ef4444" strokeWidth="2" />
        <text x="295" y="40" fill="#ef4444" fontSize="7" fontWeight="bold" textAnchor="end">Na⁺(g) + Cl⁻(g)</text>

        {/* Gaseous atoms */}
        <line x1="40" y1="65" x2="160" y2="65" stroke="#eab308" strokeWidth="2" />
        <text x="45" y="60" fill="#eab308" fontSize="7" fontWeight="bold">Na⁺(g) + ½Cl₂(g) + e⁻</text>

        <line x1="40" y1="105" x2="160" y2="105" stroke="#38bdf8" strokeWidth="2" />
        <text x="45" y="100" fill="#38bdf8" fontSize="7" fontWeight="bold">Na(g) + ½Cl₂(g)</text>

        {/* Elements Standard (baseline) */}
        <line x1="40" y1="145" x2="200" y2="145" stroke="#ffffff" strokeWidth="2" />
        <text x="45" y="140" fill="#ffffff" fontSize="7" fontWeight="bold">Na(s) + ½Cl₂(g) (Standard State = 0)</text>

        {/* Solid lattice (lowest) */}
        <line x1="180" y1="180" x2="300" y2="180" stroke="#34d399" strokeWidth="2" />
        <text x="295" y="175" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="end">NaCl(s)</text>

        {/* Arrows upward (absorb) */}
        {/* sub */}
        <path d="M 60,145 L 60,105" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#bh-arrow)" />
        <text x="64" y="127" fill="#38bdf8" fontSize="6.5">ΔsubH</text>

        {/* IE */}
        <path d="M 80,105 L 80,65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#bh-arrow)" />
        <text x="84" y="87" fill="#eab308" fontSize="6.5">IE</text>

        {/* dissociation */}
        <path d="M 100,65 L 100,25" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#bh-arrow)" />
        <text x="104" y="47" fill="#f43f5e" fontSize="6.5">½ B.E.</text>

        {/* Arrows downward (release) */}
        {/* EA */}
        <path d="M 150,25 L 190,45" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#bh-arrow)" />
        <text x="175" y="32" fill="#ef4444" fontSize="6.5" textAnchor="middle">EA (Cl)</text>

        {/* Lattice Energy formation */}
        <path d="M 240,45 L 240,180" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#bh-arrow)" />
        <text x="244" y="112" fill="#34d399" fontSize="6.5">−U (Lattice energy)</text>

        {/* Formation direct */}
        <path d="M 180,145 L 195,180" stroke="#a855f7" strokeWidth="1.5" markerEnd="url(#bh-arrow)" />
        <text x="198" y="160" fill="#a855f7" fontSize="6.5">ΔfH°</text>

        {/* Arrow definition */}
        <defs>
          <marker id="bh-arrow" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L5,2.5 z" fill="#ffffff" fillOpacity="0.6" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function GibbsFreeEnergyTempPlot() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Gibbs Free Energy vs Temperature (ΔG = ΔH − TΔS)</span>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 150 }}>
        {/* Axes */}
        <line x1="40" y1="90" x2="320" y2="90" stroke="#94a3b8" strokeWidth="1" /> {/* T-axis */}
        <line x1="50" y1="15" x2="50" y2="165" stroke="#94a3b8" strokeWidth="1.5" />  {/* dG-axis */}
        <text x="45" y="20" fill="#94a3b8" fontSize="7" textAnchor="end">ΔG →</text>
        <text x="310" y="102" fill="#94a3b8" fontSize="7" textAnchor="middle">Temp (T) →</text>

        {/* Case 1: dH > 0, dS < 0 (always positive) */}
        <line x1="50" y1="50" x2="280" y2="20" stroke="#f43f5e" strokeWidth="2" />
        <text x="285" y="22" fill="#f43f5e" fontSize="6" fontWeight="bold">ΔH&gt;0, ΔS&lt;0 (Non-spon)</text>

        {/* Case 2: dH < 0, dS > 0 (always negative) */}
        <line x1="50" y1="130" x2="280" y2="160" stroke="#34d399" strokeWidth="2" />
        <text x="285" y="162" fill="#34d399" fontSize="6" fontWeight="bold">ΔH&lt;0, ΔS&gt;0 (Spon)</text>

        {/* Case 3: dH < 0, dS < 0 (spontaneous at low T) */}
        <line x1="50" y1="120" x2="260" y2="35" stroke="#eab308" strokeWidth="2" />
        <text x="265" y="37" fill="#eab308" fontSize="6" fontWeight="bold">ΔH&lt;0, ΔS&lt;0</text>

        {/* Case 4: dH > 0, dS > 0 (spontaneous at high T) */}
        <line x1="50" y1="60" x2="260" y2="145" stroke="#a855f7" strokeWidth="2" />
        <text x="265" y="147" fill="#a855f7" fontSize="6" fontWeight="bold">ΔH&gt;0, ΔS&gt;0</text>

        {/* Switch temp dots */}
        <circle cx="215" cy="90" r="3.5" fill="#eab308" />
        <circle cx="120" cy="90" r="3.5" fill="#a855f7" />
        <text x="170" y="98" fill="#ffffff" fillOpacity="0.7" fontSize="6.5" textAnchor="middle">T = ΔH / ΔS</text>
      </svg>
    </div>
  );
}

// ─── WIDGET 1: GIBBS SPONTANEITY PREDICTOR ──────────────────────────────────
function GibbsPredictor() {
  const [dH, setDH] = useState(-50); // kJ/mol
  const [dS, setDS] = useState(150); // J/mol.K
  const [temp, setTemp] = useState(298); // Kelvin

  // Convert dS to kJ/mol.K
  const dS_kJ = dS / 1000;
  const dG = dH - temp * dS_kJ;

  let state = '';
  let color = '';
  if (dG < 0) {
    state = 'Spontaneous (ΔG < 0) ✓';
    color = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
  } else if (dG === 0) {
    state = 'At Equilibrium (ΔG = 0) ⇌';
    color = 'text-amber-400 border-amber-500/20 bg-amber-500/5';
  } else {
    state = 'Non-Spontaneous (ΔG > 0) ✗';
    color = 'text-rose-400 border-rose-500/20 bg-rose-500/5';
  }

  // Switch Temperature calculation
  const canSwitch = (dH < 0 && dS < 0) || (dH > 0 && dS > 0);
  const switchT = canSwitch ? Math.round(dH / dS_kJ) : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* enthalpy control */}
        <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
          <div className="flex justify-between text-[11px] text-white/40 uppercase">
            <span>Enthalpy (ΔH)</span>
            <span className="font-bold text-white font-mono">{dH} kJ/mol</span>
          </div>
          <input type="range" min="-200" max="200" step="5" value={dH} onChange={e => setDH(parseInt(e.target.value))} className="w-full accent-cyan-400" />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>Exothermic (-200)</span>
            <span>Endothermic (200)</span>
          </div>
        </div>

        {/* entropy control */}
        <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
          <div className="flex justify-between text-[11px] text-white/40 uppercase">
            <span>Entropy (ΔS)</span>
            <span className="font-bold text-white font-mono">{dS} J/mol·K</span>
          </div>
          <input type="range" min="-400" max="400" step="10" value={dS} onChange={e => setDS(parseInt(e.target.value))} className="w-full accent-cyan-400" />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>More Order (-400)</span>
            <span>More Disorder (400)</span>
          </div>
        </div>

        {/* temperature control */}
        <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
          <div className="flex justify-between text-[11px] text-white/40 uppercase">
            <span>Temperature (T)</span>
            <span className="font-bold text-white font-mono">{temp} K ({Math.round(temp - 273.15)}°C)</span>
          </div>
          <input type="range" min="0" max="1000" step="10" value={temp} onChange={e => setTemp(parseInt(e.target.value))} className="w-full accent-cyan-400" />
          <div className="flex justify-between text-[10px] text-white/30">
            <span>Absolute Zero (0)</span>
            <span>High Temp (1000)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Spontaneity criteria output */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
          <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Gibbs Energy Calculation</div>
          <div className="space-y-2 text-[12.5px] font-mono">
            <div className="flex justify-between">
              <span className="text-white/40">ΔH value:</span>
              <span className="font-bold text-cyan-300">{dH} kJ/mol</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">−T × ΔS term:</span>
              <span className="font-bold text-violet-300">
                − ({temp} K) × ({dS_kJ.toFixed(3)} kJ/mol·K) = {( -temp * dS_kJ ).toFixed(2)} kJ/mol
              </span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between text-[14px]">
              <span className="text-white font-bold">ΔG = ΔH − TΔS:</span>
              <span className="font-black text-emerald-400">{dG.toFixed(2)} kJ/mol</span>
            </div>
          </div>
        </div>

        {/* Predictor output */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Thermodynamic Spontaneity State</div>
            <div className={`mt-2 p-3 rounded-xl border text-center font-bold text-[13.5px] ${color}`}>
              {state}
            </div>
          </div>
          <div className="text-[11.5px] text-white/45 space-y-1 mt-2">
            <div>• Enthalpy favorability: <strong className={dH < 0 ? 'text-emerald-400' : 'text-rose-400'}>{dH < 0 ? 'Favored (Exothermic)' : 'Unfavored (Endothermic)'}</strong></div>
            <div>• Entropy favorability: <strong className={dS > 0 ? 'text-emerald-400' : 'text-rose-400'}>{dS > 0 ? 'Favored (+ΔS)' : 'Unfavored (-ΔS)'}</strong></div>
            {switchT !== null ? (
              <div className="mt-2 p-2 rounded bg-white/5 border border-white/5 text-[11px]">
                ℹ️ Spontaneity switches at <strong className="text-amber-300">{switchT} K</strong> ({Math.round(switchT - 273.15)}°C).
                {dH > 0 ? ' Spontaneous above this T.' : ' Spontaneous below this T.'}
              </div>
            ) : (
              <div className="mt-2 p-2 rounded bg-white/5 border border-white/5 text-[11px] text-white/35">
                ℹ️ No switch temperature. Spontaneity is independent of Temperature.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WIDGET 2: REVERSIBLE VS IRREVERSIBLE WORK ──────────────────────────────
function WorkCalculator() {
  const [moles, setMoles] = useState(1);
  const [v1, setV1] = useState(10); // Litres
  const [v2, setV2] = useState(20); // Litres
  const [temp, setTemp] = useState(298); // Kelvin

  const R = 8.314; // J/mol.K
  const R_L_atm = 0.0821; // L.atm/mol.K

  // Reversible Work
  // w_rev = -nRT ln(V2/V1)
  const wRev = -moles * R * temp * Math.log(v2 / v1);

  // Irreversible Work against constant external pressure P_ext
  // Let P_ext = P_final = n R T / V2
  const pFinal_atm = (moles * R_L_atm * temp) / v2;
  const pFinal_Pa = (moles * R * temp) / (v2 / 1000); // Pa
  const wIrrev = -pFinal_Pa * ((v2 - v1) / 1000); // J (using SI units)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Moles (n)</label>
          <select value={moles} onChange={e => setMoles(parseFloat(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-cyan-500/40">
            {[0.5, 1, 2, 5].map(m => (
              <option key={m} value={m} className="bg-[#0d1220]">{m} mol</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Initial Vol (V₁)</label>
          <select value={v1} onChange={e => setV1(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-cyan-500/40">
            {[2, 5, 10, 15].map(v => (
              <option key={v} value={v} className="bg-[#0d1220]">{v} L</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Final Vol (V₂)</label>
          <select value={v2} onChange={e => setV2(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-cyan-500/40">
            {[20, 30, 40, 50].map(v => (
              <option key={v} value={v} className="bg-[#0d1220]">{v} L</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Temp (T)</label>
          <select value={temp} onChange={e => setTemp(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-cyan-500/40">
            {[273, 298, 373, 500].map(t => (
              <option key={t} value={t} className="bg-[#0d1220]">{t} K ({Math.round(t - 273.15)}°C)</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Reversible calculation */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
          <div className="text-[11px] text-emerald-400 uppercase tracking-wider font-bold">Reversible Isothermal Expansion</div>
          <div className="text-[12.5px] text-white/60">Proceeds through infinite steps, maintaining internal pressure equal to external pressure at each stage. Max expansion work obtained.</div>
          <div className="p-3 rounded-xl bg-white/3 space-y-1 font-mono text-[12px]">
            <div>w_rev = −nRT ln(V₂/V₁)</div>
            <div className="text-white/40">
              = −({moles} × 8.314 × {temp}) × ln({v2}/{v1})
            </div>
            <div className="text-emerald-300 font-bold text-[14px] mt-2">
              w = {Math.round(wRev)} J ({ (wRev / 1000).toFixed(2) } kJ)
            </div>
          </div>
        </div>

        {/* Irreversible calculation */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
          <div className="text-[11px] text-rose-400 uppercase tracking-wider font-bold">Irreversible Expansion (P_ext = P_final)</div>
          <div className="text-[12.5px] text-white/60">Proceeds against constant external pressure. Expansion is rapid and thermodynamically less efficient than reversible expansion.</div>
          <div className="p-3 rounded-xl bg-white/3 space-y-1 font-mono text-[12px]">
            <div>w_irrev = −P_ext × ΔV</div>
            <div className="text-white/40">
              P_ext = P_final = {pFinal_atm.toFixed(3)} atm
            </div>
            <div className="text-rose-300 font-bold text-[14px] mt-2">
              w = {Math.round(wIrrev)} J ({ (wIrrev / 1000).toFixed(2) } kJ)
            </div>
        </div>
      </div>
    </div>

      <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-[12.5px] text-white/70">
        💡 <strong>Key Thermodynamic Lesson:</strong> Notice that <strong className="text-emerald-300">|w_rev| &gt; |w_irrev|</strong>. Maximum work is always obtained during a reversible expansion process. In compression, however, more work is required during an irreversible process.
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ThermodynamicsDetail({ progress, isCompleted, onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'gibbs' | 'work'>('gibbs');

  const tabs = [
    { id: 'gibbs' as const, label: 'Gibbs Predictor', icon: <Star className="w-3.5 h-3.5" /> },
    { id: 'work' as const, label: 'Work Calculator', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0b0f1e] via-[#0d1220] to-[#0b0f1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="cyan">Chemistry</Tag>
            <Tag color="amber">Unit 6</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="pink">Hot Topic</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Thermodynamics &<br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Thermochemistry</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            First, Second, and Third laws, state vs path functions, calorimetry, enthalpies of reaction, Born-Haber cycle, entropy calculations, Gibbs free energy spontaneity criteria, and adiabatic relations.
          </p>
          <div className="flex gap-3 flex-wrap text-[12px] text-white/40">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 25 min read</span>
            <span>·</span><span>pyqFrequency: 82%</span>
            <span>·</span><span className="text-rose-400 font-bold">Priority: Hot Topic</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: Terminology & System Types ─────────────────────────── */}
      <Collapsible title="1 · Thermodynamic Terminology & Systems" icon={<Atom className="w-4 h-4" />} accent="emerald">
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Thermodynamics is the study of energy transformations in physical and chemical systems. We divide the universe into two parts:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-white/70">
            <li><strong className="text-white">System:</strong> The specific part of the universe under thermodynamic study.</li>
            <li><strong className="text-white">Surroundings:</strong> Everything else in the universe outside the system boundaries.</li>
            <li><strong className="text-white">Boundary:</strong> The real or imaginary interface separating system from surroundings.</li>
          </ul>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  {['System Type', 'Matter Exchange', 'Energy Exchange', 'Thermodynamic Condition'].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-white/40 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Open System (e.g. open beaker)', 'Yes', 'Yes', 'dM ≠ 0, dE ≠ 0'],
                  ['Closed System (e.g. sealed flask)', 'No', 'Yes', 'dM = 0, dE ≠ 0'],
                  ['Isolated System (e.g. ideal thermos)', 'No', 'No', 'dM = 0, dE = 0'],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                    <td className="px-3 py-2.5 font-bold text-cyan-300">{r[0]}</td>
                    <td className="px-3 py-2.5 text-emerald-300 font-bold">{r[1]}</td>
                    <td className="px-3 py-2.5 text-violet-300 font-bold">{r[2]}</td>
                    <td className="px-3 py-2.5 font-mono text-white/50 text-[11px]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 2: Intensive vs Extensive & State/Path Functions ──────── */}
      <Collapsible title="2 · State variables, state functions, and property classification" icon={<Layers className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
              <div className="text-cyan-300 font-bold text-[12.5px] uppercase tracking-wider">Extensive Properties</div>
              <p className="text-[12px] text-white/60">Properties that depend on the <strong className="text-white">mass/amount</strong> of substance present in the system.</p>
              <div className="font-mono text-cyan-400 text-[11px] bg-white/3 p-2 rounded">
                Mass, Volume, Internal Energy (U), Enthalpy (H), Entropy (S), Gibbs Free Energy (G), Heat Capacity.
              </div>
            </div>
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-2">
              <div className="text-violet-300 font-bold text-[12.5px] uppercase tracking-wider">Intensive Properties</div>
              <p className="text-[12px] text-white/60">Properties that are <strong className="text-white">independent</strong> of the mass/amount of substance present.</p>
              <div className="font-mono text-violet-400 text-[11px] bg-white/3 p-2 rounded">
                Temperature, Pressure, Density, Viscosity, Surface Tension, Refractive Index, pH, Cell Potential (E°cell), Molar properties, Specific heat.
              </div>
            </div>
          </div>

          <ExamTip>
            Specific properties (e.g., Specific Heat = Heat Capacity per gram) and Molar properties (e.g., Molar Volume = Volume per mole) are always <strong>Intensive</strong>, even though they are ratios of extensive properties!
          </ExamTip>

          <div className="space-y-2">
            <SectionBanner label="State Functions vs Path Functions" color="violet" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div className="p-3 rounded-lg bg-white/3 border border-white/5">
                <span className="text-cyan-300 font-bold block">State Functions</span>
                Depend only on the initial and final states of the system, not on the path taken.
                <span className="block font-mono text-[11px] text-white/50 mt-1">P, V, T, U, H, S, G</span>
              </div>
              <div className="p-3 rounded-lg bg-white/3 border border-white/5">
                <span className="text-rose-300 font-bold block">Path Functions</span>
                Depend on the path/mechanism taken to reach the final state. In elementary thermodynamics, heat (q) and work (w) are the principal path functions.
                <span className="block font-mono text-[11px] text-white/50 mt-1">q, w</span>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 3: Thermodynamic Processes & Reversibility ───────────── */}
      <Collapsible title="3 · Thermodynamic Processes & Reversibility" icon={<Star className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[12px]">
            {[
              { title: 'Isothermal', cond: 'ΔT = 0, dT = 0', desc: 'Constant Temperature' },
              { title: 'Adiabatic', cond: 'q = 0', desc: 'No heat exchange with surroundings' },
              { title: 'Isobaric', cond: 'ΔP = 0, dP = 0', desc: 'Constant Pressure' },
              { title: 'Isochoric', cond: 'ΔV = 0, dV = 0', desc: 'Constant Volume' },
            ].map(p => (
              <div key={p.title} className="p-3 rounded-xl bg-white/3 border border-white/8">
                <div className="text-white font-bold">{p.title}</div>
                <div className="text-cyan-300 font-mono text-[10.5px] mt-1">{p.cond}</div>
                <div className="text-white/40 text-[10px] mt-0.5">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-3">
            <SectionBanner label="Reversible vs Irreversible Work" color="amber" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-1">
                <span className="text-emerald-400 font-bold">Reversible Process</span>
                <p className="text-white/60 text-[12px]">Proceeds through an infinite number of infinitesimal steps. Driving force is only infinitesimally greater than opposing force. Can be reversed at any point. Maximum work obtained in expansion.</p>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 space-y-1">
                <span className="text-rose-400 font-bold">Irreversible Process</span>
                <p className="text-white/60 text-[12px]">Proceeds rapidly through finite steps. Occurs with a large difference between driving and opposing forces. Natural spontaneous processes are irreversible. Work obtained is less than reversible.</p>
              </div>
            </div>
          </div>

          <WorkPVDiagram />

          <div className="space-y-3">
            <SectionBanner label="Adiabatic Process & Work Formula" color="rose" />
            <p>In an adiabatic process, heat exchange is zero (<i>q</i> = 0). By the first law, &Delta;<i>U</i> = <i>w</i>. For <i>n</i> moles of an ideal gas, the work done is:</p>
            <div className="font-mono text-[14px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              w = n × Cv,m × (T₂ − T₁) = (P₂V₂ − P₁V₁) / (γ − 1)
            </div>
            <p className="text-[11.5px] text-white/45">Since expansion (<i>T</i><sub>2</sub> &lt; <i>T</i><sub>1</sub>) does work (<i>w</i> &lt; 0), the temperature of the system drops. In compression (<i>T</i><sub>2</sub> &gt; <i>T</i><sub>1</sub>), work is done on the system (<i>w</i> &gt; 0) and temperature rises.</p>
          </div>

          <div className="space-y-3">
            <SectionBanner label="The Carnot Cycle" color="violet" />
            <p>A theoretical, fully reversible thermodynamic cycle consisting of four steps that establishes the upper limit of efficiency (<i>&eta;</i>) for heat engines:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] text-white/60">
              <div className="p-3 rounded-lg bg-white/3 space-y-1">
                <div className="text-cyan-300 font-bold">1. Isothermal Expansion (1 → 2)</div>
                <div>Gas absorbs heat <i>q</i><sub>h</sub> at <i>T</i><sub>h</sub> and expands isothermally. (&Delta;<i>U</i> = 0, <i>q</i><sub>h</sub> = &minus;<i>w</i>₁)</div>
              </div>
              <div className="p-3 rounded-lg bg-white/3 space-y-1">
                <div className="text-amber-300 font-bold">2. Adiabatic Expansion (2 → 3)</div>
                <div>Gas expands adiabatically, cooling from <i>T</i><sub>h</sub> to <i>T</i><sub>c</sub>. (<i>q</i> = 0, <i>w</i>₂ = &Delta;<i>U</i>)</div>
              </div>
              <div className="p-3 rounded-lg bg-white/3 space-y-1">
                <div className="text-violet-300 font-bold">3. Isothermal Compression (3 → 4)</div>
                <div>Gas is compressed isothermally, releasing heat <i>q</i><sub>c</sub> at <i>T</i><sub>c</sub>. (&Delta;<i>U</i> = 0, <i>q</i><sub>c</sub> = &minus;<i>w</i>₃)</div>
              </div>
              <div className="p-3 rounded-lg bg-white/3 space-y-1">
                <div className="text-rose-300 font-bold">4. Adiabatic Compression (4 → 1)</div>
                <div>Gas is compressed adiabatically, heating from <i>T</i><sub>c</sub> to <i>T</i><sub>h</sub>. (<i>q</i> = 0, <i>w</i>₄ = &Delta;<i>U</i>)</div>
              </div>
            </div>
            <CarnotCycleDiagram />
            <div className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/15 text-[12px] text-white/65 font-mono">
              <div>Total Cycle Work: w_net = w₁ + w₂ + w₃ + w₄ = −(q_h + q_c)</div>
              <div>Thermal Efficiency: η = |w_net| / q_h = 1 − T_c/T_h</div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 4: First Law & Sign Conventions ──────────────────────── */}
      <Collapsible title="4 · First Law of Thermodynamics & PV Work" icon={<Star className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>The <strong className="text-white">First Law of Thermodynamics</strong> (Law of Conservation of Energy) states that energy can neither be created nor destroyed, only transformed.</p>

          <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-center">
            <div className="font-mono text-rose-300 text-[15px] font-black">ΔU = q + w</div>
            <div className="text-white/50 text-[12px] mt-1">U = Internal Energy, q = Heat, w = Work</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-cyan-300 font-bold text-[12.5px] block">Heat Conventions (q)</span>
              <ul className="text-[12px] text-white/60 space-y-1">
                <li>• <strong className="text-white">q &gt; 0:</strong> Heat absorbed by the system (endothermic)</li>
                <li>• <strong className="text-white">q &lt; 0:</strong> Heat released by the system (exothermic)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-violet-300 font-bold text-[12.5px] block">Work Conventions (w)</span>
              <ul className="text-[12px] text-white/60 space-y-1">
                <li>• <strong className="text-white">w &gt; 0:</strong> Work done ON the system (compression)</li>
                <li>• <strong className="text-white">w &lt; 0:</strong> Work done BY the system (expansion)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Pressure-Volume (PV) Work" color="rose" />
            <p>For expansion or compression work against an external pressure (Pext):</p>
            <div className="font-mono text-[13.5px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              w = −Pext ΔV = −Pext (V₂ − V₁)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px] mt-2">
              <div className="p-3 bg-[#060814] rounded-xl border border-white/5">
                <span className="text-emerald-300 font-bold">Reversible Isothermal expansion:</span>
                <div className="font-mono text-[12.5px] mt-1">w = −nRT ln(V₂/V₁) = −2.303 nRT log(V₂/V₁)</div>
              </div>
              <div className="p-3 bg-[#060814] rounded-xl border border-white/5">
                <span className="text-rose-300 font-bold">Irreversible isothermal expansion:</span>
                <div className="font-mono text-[12.5px] mt-1">w = −Pext (V₂ − V₁)</div>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 5: Internal Energy & Enthalpy ─────────────────────────── */}
      <Collapsible title="5 · Internal Energy & Enthalpy" icon={<Layers className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-2">
            <SectionBanner label="Internal Energy (U) & Enthalpy (H)" color="emerald" />
            <p>For an ideal gas, internal energy depends <strong className="text-white">only on temperature</strong>. In any isothermal process of an ideal gas, <strong className="text-emerald-300">ΔU = 0</strong>, meaning <strong className="text-emerald-300">q = −w</strong>.</p>
            <p>Enthalpy (H) is defined as the total heat content of the system:</p>
            <div className="font-mono text-[14px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              H = U + PV &nbsp;→&nbsp; ΔH = ΔU + Δ(PV)
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Ideal Gas Reactions at Constant T" color="cyan" />
            <p>For chemical reactions involving ideal gases at constant temperature:</p>
            <div className="font-mono text-[14.5px] text-emerald-300 font-bold bg-white/3 p-3 rounded text-center">
              ΔrH = ΔrU + ΔngRT
            </div>
            <div className="text-[12.5px] text-white/60 mt-1">
              • <strong className="text-white">Δng:</strong> stoichiometric moles of gaseous products − stoichiometric moles of gaseous reactants. Only count gases!
            </div>
          </div>

          <TrapCard title="Ideal Gas Free Expansion">
            Free expansion refers to expansion into a vacuum (<strong>Pext = 0</strong>). In an isolated container:
            <div className="font-mono text-[12px] bg-black/30 p-2 rounded mt-1">
              q = 0 (isolated), w = 0 (Pext = 0) → ΔU = 0 → ΔT = 0 (since U is f(T) only).
            </div>
            Thus, for ideal gas free expansion, <strong>ΔU = 0, ΔH = 0, q = 0, w = 0, and ΔT = 0</strong>.
          </TrapCard>
        </div>
      </Collapsible>

      {/* ── SECTION 6: Heat Capacity & Mayer's Relation ───────────────────── */}
      <Collapsible title="6 · Heat Capacity, Cp and Cv" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Heat Capacity (C) is the heat required to raise the temperature of a system by 1 K (or 1°C):</p>
          <div className="grid grid-cols-3 gap-2 text-center text-[12.5px]">
            <div className="p-3 bg-white/3 rounded-xl border border-white/8">
              <span className="text-white/40 text-[10px] block uppercase">Total Heat Cap</span>
              <span className="font-bold text-white font-mono">C = q / ΔT</span>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/8">
              <span className="text-white/40 text-[10px] block uppercase">Specific Heat</span>
              <span className="font-bold text-cyan-300 font-mono">c = q / (m·ΔT)</span>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/8">
              <span className="text-white/40 text-[10px] block uppercase">Molar Heat Cap</span>
              <span className="font-bold text-violet-300 font-mono">Cm = q / (n·ΔT)</span>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Mayer's Relation & Ratio γ" color="violet" />
            <p>At constant pressure, part of the heat is consumed for expansion work. Therefore, <strong className="text-white">Cp &gt; Cv</strong>. For 1 mole of an ideal gas:</p>
            <div className="font-mono text-[14px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              Cp,m − Cv,m = R
            </div>
            <p>The ratio of heat capacities is <strong className="text-white">γ = Cp / Cv</strong>. The heat capacity of an ideal gas depends on its <strong className="text-white">degrees of freedom (f)</strong>:</p>
            <div className="overflow-x-auto rounded-xl border border-white/8 my-3">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Atomicity</th>
                    <th className="px-3 py-2 text-center text-white/40 font-bold">f (transl + rot)</th>
                    <th className="px-3 py-2 text-center text-white/40 font-bold">Cv,m</th>
                    <th className="px-3 py-2 text-center text-white/40 font-bold">Cp,m</th>
                    <th className="px-3 py-2 text-center text-white/40 font-bold">γ = Cp/Cv</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Monoatomic', '3 (3T + 0R)', '3/2 R', '5/2 R', '1.67 (5/3)', 'He, Ne, Ar'],
                    ['Diatomic', '5 (3T + 2R)', '5/2 R', '7/2 R', '1.40 (7/5)', 'H₂, N₂, O₂, CO'],
                    ['Polyatomic (Non-linear)', '6 (3T + 3R)', '3 R (6/2 R)', '4 R (8/2 R)', '1.33 (4/3)', 'H₂O, NH₃, CH₄'],
                    ['Polyatomic (Linear)', '7 (3T + 4R)', '7/2 R', '9/2 R', '1.28 (9/7)', 'CO₂, CS₂'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 font-mono">
                      <td className="px-3 py-2 text-left font-sans font-bold text-cyan-300">{r[0]}</td>
                      <td className="px-3 py-2 text-center text-white/70">{r[1]}</td>
                      <td className="px-3 py-2 text-center text-emerald-300 font-bold">{r[2]}</td>
                      <td className="px-3 py-2 text-center text-violet-300 font-bold">{r[3]}</td>
                      <td className="px-3 py-2 text-center text-amber-300 font-bold">{r[4]}</td>
                      <td className="px-3 py-2 text-left text-white/50 text-[11px] font-sans">{r[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Adiabatic Ideal-Gas Relations" color="rose" />
            <p>During an adiabatic process (q = 0) of an ideal gas, the system follows:</p>
            <div className="font-mono text-[13.5px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              PV^γ = constant &nbsp;|&nbsp; TV^(γ−1) = constant &nbsp;|&nbsp; T^γ P^(1−γ) = constant
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-cyan-300 font-bold text-[12.5px] block">Joule-Thomson Effect & Real Gases</span>
              <p className="text-[12px] text-white/60">For real (non-ideal) gases, adiabatic expansion through a porous plug into a region of lower pressure causes a temperature change. The Joule-Thomson coefficient is defined as:</p>
              <div className="font-mono text-cyan-300 text-[12.5px] bg-black/30 p-2 rounded text-center font-bold font-mono">
                μ_JT = (∂T / ∂P)_H
              </div>
              <p className="text-[11px] text-white/45">At ordinary temperatures, most real gases cool upon expansion (μ_JT &gt; 0), except Hydrogen and Helium which warm up because their inversion temperature is below room temperature.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-violet-300 font-bold text-[12.5px] block">C vs T & Non-Ideal Corrections</span>
              <p className="text-[12px] text-white/60">In rigorous calculations, heat capacity is not constant but increases with temperature due to the activation of vibrational modes: C_m = a + bT + cT².</p>
              <p className="text-[11px] text-white/45">For non-ideal gases, internal energy depends on volume as well as temperature due to intermolecular attractive forces: (∂U / ∂V)_T = a / V_m² (from van der Waals equation).</p>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 7: Calorimetry ────────────────────────────────────────── */}
      <Collapsible title="7 · Calorimetry" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Calorimetry is the experimental technique to measure heat changes during physical or chemical processes.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 space-y-2">
              <div className="text-amber-300 font-bold text-[12.5px] uppercase">Constant Volume (Bomb Calorimetry)</div>
              <p className="text-[12px] text-white/60">Constant volume maintained (dV = 0). No P-V expansion work occurs. Under this condition:</p>
              <div className="font-mono text-amber-300 text-[13px] bg-white/3 p-2 rounded text-center">
                qv = ΔU
              </div>
              <p className="text-[11.5px] text-white/40 italic">Typically used to measure internal energy changes in combustion reactions.</p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
              <div className="text-cyan-300 font-bold text-[12.5px] uppercase">Constant Pressure (Coffee-Cup Calorimetry)</div>
              <p className="text-[12px] text-white/60">Constant pressure is maintained. Only P-V work is involved. Under this condition:</p>
              <div className="font-mono text-cyan-300 text-[13px] bg-white/3 p-2 rounded text-center">
                qp = ΔH
              </div>
              <p className="text-[11.5px] text-white/40 italic">Commonly used for solution-phase processes at atmospheric pressure.</p>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 8: Hess's Law & Standard Enthalpies ────────────────────── */}
      <Collapsible title="8 · Thermochemistry & Hess's Law" icon={<BarChart3 className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-2">
            <SectionBanner label="Hess's Law of Constant Heat Summation" color="rose" />
            <p>Hess's Law states that the enthalpy change of a reaction is <strong className="text-white">independent of the pathway</strong> or the number of steps taken. It is a direct consequence of enthalpy being a state function.</p>
            <div className="p-4 rounded-xl bg-[#060814] border border-white/5 font-mono text-[12.5px] text-center">
              If A → B (ΔH₁), B → C (ΔH₂)<br />
              Then for A → C: &nbsp;<strong className="text-cyan-300">ΔH = ΔH₁ + ΔH₂</strong>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Standard Enthalpies of Phase Transitions" color="violet" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
              {[
                { name: 'Enthalpy of Fusion (ΔfusH°)', desc: 'Enthalpy change to convert 1 mole of solid to liquid at its melting point.' },
                { name: 'Enthalpy of Vaporization (ΔvapH°)', desc: 'Enthalpy change to convert 1 mole of liquid to gas at its boiling point.' },
                { name: 'Enthalpy of Sublimation (ΔsubH°)', desc: 'Enthalpy change to convert 1 mole of solid directly to gas.' },
                { name: 'Enthalpy of Atomization (ΔaH°)', desc: 'Enthalpy change to break 1 mole of substance completely into gaseous atoms.' },
              ].map(ph => (
                <div key={ph.name} className="p-3 rounded-lg bg-white/3 border border-white/5 space-y-1">
                  <strong className="text-violet-300 block">{ph.name}</strong>
                  <span className="text-white/60">{ph.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Standard Reaction Enthalpies & Key Definitions" color="emerald" />
            <div className="space-y-2">
              <div className="p-3 bg-white/3 rounded-xl border border-white/8 space-y-1">
                <span className="text-emerald-400 font-bold block">1. Standard Enthalpy of Formation (ΔfH°)</span>
                <p className="text-white/65 text-[12px]">The enthalpy change when exactly 1 mole of a substance is formed from its constituent elements in their most stable reference standard states. By convention, ΔfH° of elements in their most stable states is zero (e.g. O₂(g), C(graphite) = 0).</p>
              </div>
              <div className="p-3 bg-white/3 rounded-xl border border-white/8 space-y-1">
                <span className="text-amber-400 font-bold block">2. Standard Enthalpy of Neutralization (ΔneutH°)</span>
                <p className="text-white/65 text-[12px]">The enthalpy change when 1 mole of H⁺ from an acid is neutralized by 1 mole of OH⁻ from a base in dilute aqueous solution. For strong monoprotic acids and strong bases, it is constant at approximately <strong className="text-white">−57.1 kJ/mol</strong>.</p>
              </div>
              <div className="p-3 bg-white/3 rounded-xl border border-white/8 space-y-1">
                <span className="text-rose-400 font-bold block">3. Standard Enthalpy of Combustion (ΔcH°)</span>
                <p className="text-white/65 text-[12px]">The enthalpy change when 1 mole of a substance is completely burned in oxygen under standard states. It is always negative (exothermic process).</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Kirchhoff's Equation (Temperature Dependence)" color="cyan" />
            <p>Used to find reaction enthalpy at different temperatures, assuming ΔCp is temperature-independent:</p>
            <div className="font-mono text-[14px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              ΔrH(T₂) = ΔrH(T₁) + ΔrCp × (T₂ − T₁) &nbsp;|&nbsp; where d(ΔH)/dT = ΔCp
            </div>
          </div>

          <div className="space-y-2 mt-3">
            <SectionBanner label="Standard Enthalpies of Formation Reference Table" color="cyan" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Compound</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Standard State Formula</th>
                    <th className="px-3 py-2 text-center text-white/40 font-bold">ΔfH° (kJ/mol)</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Water (Liquid)', 'H₂O(l)', '−285.8', 'Exothermic (stable)'],
                    ['Water (Gas)', 'H₂O(g)', '−241.8', 'Exothermic'],
                    ['Carbon Dioxide', 'CO₂(g)', '−393.5', 'Exothermic (combustion product)'],
                    ['Methane', 'CH₄(g)', '−74.8', 'Exothermic'],
                    ['Ammonia', 'NH₃(g)', '−46.1', 'Exothermic'],
                    ['Acetylene', 'C₂H₂(g)', '+226.7', 'Endothermic (unstable/reactive)'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 font-mono">
                      <td className="px-3 py-2 text-left font-sans font-bold text-cyan-300">{r[0]}</td>
                      <td className="px-3 py-2 text-left text-white/70">{r[1]}</td>
                      <td className="px-3 py-2 text-center text-emerald-300 font-bold">{r[2]}</td>
                      <td className="px-3 py-2 text-left text-white/50 text-[11px] font-sans">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </Collapsible>

      {/* ── SECTION 9: Bond Enthalpy & Born-Haber Cycle ───────────────────── */}
      <Collapsible title="9 · Bond Enthalpies & Born-Haber Cycle" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-2">
            <SectionBanner label="Bond Enthalpy Calculations" color="violet" />
            <p>For chemical reactions involving bond breaking and forming:</p>
            <div className="font-mono text-[14px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              ΔrH ≈ Σ (Bond Enthalpies of reactants/broken) − Σ (Bond Enthalpies of products/formed)
            </div>
            <p className="text-[11.5px] text-white/45 italic">Note: The ≈ sign represents that average bond enthalpies are used. The general product-minus-reactant rule is reversed because energy is absorbed to break bonds (reactants) and released when forming bonds (products).</p>
          </div>

          <div className="space-y-2 mt-2">
            <SectionBanner label="Bond Enthalpy Reference Table" color="violet" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Bond Type</th>
                    <th className="px-3 py-2 text-center text-white/40 font-bold">Bond Enthalpy (kJ/mol)</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Bond Strength Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['H−H', '436', 'Strong single bond'],
                    ['C−H', '413', 'Common organic single bond'],
                    ['C−C', '348', 'Moderate single bond'],
                    ['C=C', '614', 'Double bond (stronger)'],
                    ['C≡C', '839', 'Triple bond (extremely strong)'],
                    ['O−H', '463', 'Polar single bond'],
                    ['C=O (in CO₂)', '799', 'Highly stable carbonyl bond'],
                    ['N≡N', '945', 'Triple bond (inert atmosphere, standard state baseline)'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3 font-mono">
                      <td className="px-3 py-2 text-left font-sans font-bold text-violet-300">{r[0]}</td>
                      <td className="px-3 py-2 text-center text-emerald-300 font-bold">{r[1]}</td>
                      <td className="px-3 py-2 text-left text-white/50 text-[11px] font-sans">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Lattice Enthalpy Sign Conventions" color="rose" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 space-y-1">
                <span className="text-rose-400 font-bold">Lattice Dissociation Enthalpy</span>
                <p className="text-white/60">MX(s) → M⁺(g) + X⁻(g)</p>
                <p className="text-emerald-400 font-bold">Positive change (+ΔH)</p>
                <p className="text-white/50 text-[11px]">Energy is absorbed to break the crystal lattice into gaseous ions.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-1">
                <span className="text-emerald-400 font-bold">Lattice Formation Enthalpy</span>
                <p className="text-white/60">M⁺(g) + X⁻(g) → MX(s)</p>
                <p className="text-rose-400 font-bold">Negative change (-ΔH)</p>
                <p className="text-white/50 text-[11px]">Energy is released when gaseous ions coalesce into a solid lattice.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Born-Haber Cycle for NaCl" color="amber" />
            <p>The Born-Haber cycle uses Hess's Law to calculate lattice dissociation enthalpy indirectly:</p>
            <BornHaberCycleDiagram />
            <div className="p-4 rounded-2xl bg-[#060814] border border-white/5 font-mono text-[12px] space-y-1 mt-3">
              <div>Na(s) + ½Cl₂(g) → NaCl(s) &nbsp; [ΔfH°]</div>
              <div className="text-white/40">Step 1: Sublimation &nbsp; Na(s) → Na(g) &nbsp; [ΔsubH]</div>
              <div className="text-white/40">Step 2: Ionization &nbsp; Na(g) → Na⁺(g) + e⁻ &nbsp; [IE]</div>
              <div className="text-white/40">Step 3: Dissociation &nbsp; ½Cl₂(g) → Cl(g) &nbsp; [½ B.E.]</div>
              <div className="text-white/40">Step 4: Electron Affinity &nbsp; Cl(g) + e⁻ → Cl⁻(g) &nbsp; [EA]</div>
              <div className="text-white/40">Step 5: Lattice Formation &nbsp; Na⁺(g) + Cl⁻(g) → NaCl(s) &nbsp; [-U]</div>
              <div className="h-px bg-white/10 my-2" />
              <div className="text-cyan-300 font-bold">ΔfH° = ΔsubH + IE + ½ B.E. + EA − U</div>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ── SECTION 10: Second & Third Laws of Thermodynamics ────────────── */}
      <Collapsible title="10 · Second & Third Laws of Thermodynamics" icon={<Atom className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p><strong className="text-white">Entropy (S):</strong> A state function representing the degree of energy dispersal or the number of microstates accessible to a system.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-1">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block">Second Law</span>
              <p className="text-white/60">For any spontaneous process, the total entropy change of the universe (system + surroundings) must be positive:</p>
              <div className="font-mono text-emerald-300 font-bold text-center mt-1">ΔStotal = ΔSsys + ΔSsurr &gt; 0</div>
            </div>
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-1">
              <span className="text-violet-300 font-bold uppercase tracking-wider text-[11px] block">Third Law</span>
              <p className="text-white/60">The entropy of a perfect crystalline substance is exactly zero at absolute zero (0 K).</p>
              <div className="font-mono text-violet-300 font-bold text-center mt-1">S = 0 (at T = 0 K)</div>
            </div>
          </div>

          <EntropyTempDiagram />

          <div className="space-y-2">
            <SectionBanner label="Clausius Inequality" color="emerald" />
            <p>For any cyclical thermodynamic process, the cyclic integral of heat transfer divided by temperature is always less than or equal to zero:</p>
            <div className="font-mono text-[13.5px] text-emerald-300 font-bold bg-white/3 p-3 rounded text-center">
              ∮(δq / T) ≤ 0 &nbsp;|&nbsp; (= 0 for Reversible, &lt; 0 for Irreversible)
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Entropy Change Calculations" color="cyan" />
            <p>For an infinitesimal reversible change: <strong className="font-mono text-cyan-300">dS = δqrev/T</strong>. For isothermal reversible processes: <strong className="font-mono text-cyan-300">ΔS = qrev/T</strong>.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div className="p-3 bg-[#060814] rounded-xl border border-white/5 space-y-1 font-mono">
                <span className="text-cyan-300 font-bold">Entropy of Phase Transition:</span>
                <div>ΔStrans = ΔHtrans / Ttrans</div>
                <div className="text-white/40">e.g., ΔSvap = ΔHvap / Tb</div>
              </div>
              <div className="p-3 bg-[#060814] rounded-xl border border-white/5 space-y-1 font-mono">
                <span className="text-violet-300 font-bold">Ideal Gas Expansion:</span>
                <div>ΔS = nCv ln(T₂/T₁) + nR ln(V₂/V₁)</div>
                <div>ΔS = nCp ln(T₂/T₁) − nR ln(P₂/P₁)</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-cyan-300 font-bold text-[12.5px] block">Trouton's Rule</span>
              <p className="text-[12px] text-white/60">For most non-associated liquids (like benzene, cyclohexane, hexane) at their normal boiling point, the entropy of vaporization is a constant value:</p>
              <div className="font-mono text-cyan-300 text-[12.5px] bg-black/30 p-2 rounded text-center font-bold">
                ΔSvap ≈ 85 to 88 J / (mol·K)
              </div>
              <p className="text-[11px] text-white/45">Fails for liquids with hydrogen bonding (e.g. water, ethanol) due to high initial liquid-phase organization which results in abnormally large entropy increases upon vaporization.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-violet-300 font-bold text-[12.5px] block">Residual Entropy</span>
              <p className="text-[12px] text-white/60">Entropy possessed by a substance at 0 K due to structural disorganization or multiple orientation choices in the crystal lattice (violating the Third Law's "perfect crystalline" criterion).</p>
              <div className="font-mono text-violet-300 text-[12.5px] bg-black/30 p-2 rounded text-center font-bold">
                S_0 = k_B ln W &gt; 0
              </div>
              <p className="text-[11px] text-white/45">Examples: CO (random C-O vs O-C alignment), N₂O, and H₂O (hydrogen bond configuration choices).</p>
            </div>
          </div>
        </div>
      </Collapsible>


      {/* ── SECTION 11: Gibbs Free Energy & Spontaneity ──────────────────── */}
      <Collapsible title="11 · Gibbs Free Energy & Spontaneity" icon={<BarChart3 className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Gibbs free energy (G) is the thermodynamic potential used to monitor spontaneity at <strong className="text-white">constant temperature and pressure</strong>:</p>
          
          <div className="font-mono text-[14.5px] text-rose-300 font-black bg-white/3 p-3 rounded text-center">
            ΔG = ΔH − TΔS
          </div>

          <GibbsFreeEnergyTempPlot />

          <div className="space-y-2">
            <SectionBanner label="Temperature Dependence of Spontaneity" color="rose" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    {['ΔH', 'ΔS', 'ΔG = ΔH - TΔS', 'Spontaneity'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-white/40 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['−', '+', 'Always negative', 'Spontaneous at all temperatures'],
                    ['+', '−', 'Always positive', 'Non-spontaneous at all temperatures'],
                    ['−', '−', 'Negative at low T', 'Spontaneous at low temperatures (enthalpy favored)'],
                    ['+', '+', 'Negative at high T', 'Spontaneous at high temperatures (entropy favored)'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-2.5 font-bold font-mono text-emerald-300 text-center">{r[0]}</td>
                      <td className="px-3 py-2.5 font-bold font-mono text-violet-300 text-center">{r[1]}</td>
                      <td className="px-3 py-2.5 font-mono text-cyan-300">{r[2]}</td>
                      <td className="px-3 py-2.5 font-bold text-white/80">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Gibbs Energy and Equilibrium Constant" color="cyan" />
            <p>At standard state equilibrium, ΔG = 0, which yields standard free energy relation with the equilibrium constant <i>K</i>:</p>
            <div className="font-mono text-[14px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              ΔG° = −RT ln K = −2.303 RT log K
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-cyan-300 font-bold text-[12.5px] block">van't Hoff Equation</span>
              <p className="text-[12px] text-white/60">Describes the temperature dependence of the equilibrium constant <i>K</i> based on the standard enthalpy of reaction (&Delta;<sub>r</sub><i>H</i>&deg;):</p>
              <div className="font-mono text-cyan-300 text-[12.5px] bg-black/30 p-2.5 rounded text-center font-bold space-y-1">
                <div>d(ln K)/dT = ΔrH° / (RT²)</div>
                <div className="h-px bg-white/10 my-1" />
                <div className="text-[11.5px]">ln(K₂/K₁) = (ΔrH°/R) × (1/T₁ − 1/T₂)</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
              <span className="text-violet-300 font-bold text-[12.5px] block">Relation between Kp and Kc</span>
              <p className="text-[12px] text-white/60">Relates standard partial pressure equilibrium constant (<i>K</i><sub>p</sub>) to standard molar concentration equilibrium constant (<i>K</i><sub>c</sub>):</p>
              <div className="font-mono text-violet-300 text-[13px] bg-black/30 p-2.5 rounded text-center font-bold">
                Kp = Kc × (R T)^Δng
              </div>
              <p className="text-[11px] text-white/45 font-sans mt-1">Where &Delta;<i>n</i><sub>g</sub> is the difference between stoichiometric gas moles of products and reactants.</p>
            </div>
          </div>

          <ProTip>
            <strong>Gibbs-Helmholtz Equation:</strong> The equation <strong>ΔG = ΔH − TΔS</strong> is often misnamed. The actual Gibbs-Helmholtz equation describes the temperature dependence of Gibbs energy:
            <div className="font-mono text-[12px] bg-black/30 p-2 rounded mt-1 text-center">
              [∂(G/T)/∂T]P = −H/T² &nbsp;→&nbsp; [∂(ΔG/T)/∂T]P = −ΔH/T²
            </div>
          </ProTip>
        </div>
      </Collapsible>


      {/* ── INTERACTIVE STUDY LAB ─────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 overflow-hidden bg-[#090b18]">
        <div className="p-5 border-b border-white/8 bg-gradient-to-r from-cyan-500/5 to-violet-500/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-widest text-cyan-400 uppercase">Interactive Study Lab</span>
          </div>
          <h2 className="text-lg font-black text-white">Thermodynamics Master Tools</h2>
          <p className="text-white/40 text-[12px] mt-1">Interactive modules to master heat, work, and spontaneity relations</p>
        </div>

        <div className="flex border-b border-white/8">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('flex items-center gap-2 px-4 py-3 text-[11.5px] font-bold border-b-2 transition-all flex-1 justify-center',
                activeTab === tab.id ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5' : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3')}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'gibbs' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Change ΔH, ΔS, and Temperature to visualize the spontaneity boundary and the enthalpy-entropy competition.</p>
              <GibbsPredictor />
            </div>
          )}
          {activeTab === 'work' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Calculate and compare work for reversible vs irreversible expansion processes at constant temperatures.</p>
              <WorkCalculator />
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 12: Solved Problems ───────────────────────────────────── */}
      <Collapsible title="12 · Solved Advanced Problems (8 High-Yield Cases)" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4">
          
          <SolvedProblem 
            title="Problem 1: Reversible vs Irreversible Work" 
            question="1 mole of an ideal gas at 300 K expands isothermally from 10 L to 20 L. Calculate the work done (in J) if the expansion is (a) reversible, and (b) irreversible against a constant external pressure of 1 atm. (1 L·atm = 101.3 J)"
            solution={
              <div className="space-y-2">
                <div>(a) Reversible work: w = −nRT ln(V₂/V₁)</div>
                <div>w = −(1 mol) × (8.314 J/mol·K) × (300 K) × ln(20 / 10)</div>
                <div>w = −2494.2 × 0.693 = −1728.8 J</div>
                <div className="mt-2">(b) Irreversible work: P_ext = P_final = nRT / V₂</div>
                <div>P_ext = (1 mol × 0.0821 L·atm/mol·K × 300 K) / 20 L = 1.2315 atm</div>
                <div>w = −P_ext × ΔV = −1.2315 atm × (20 − 10 L) = −12.315 L·atm</div>
                <div>w = −12.315 × 101.3 J = −1247.5 J</div>
                <div className="mt-1 text-emerald-300">Note: |w_rev| (1728.8 J) &gt; |w_irrev| (1247.5 J). Maximum work is done reversibly.</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 2: ΔH and ΔU Relation" 
            question="For the combustion of benzene liquid, C₆H₆(l) + 15/2 O₂(g) → 6CO₂(g) + 3H₂O(l) at 298 K, the enthalpy of reaction ΔrH is −3268 kJ/mol. Calculate ΔrU for this combustion process."
            solution={
              <div className="space-y-2">
                <div>Formula: ΔrH = ΔrU + ΔngRT</div>
                <div>Determine Δng (gaseous species only):</div>
                <div>Δng = Moles of CO₂(g) − Moles of O₂(g) = 6 − 7.5 = −1.5 mol</div>
                <div className="mt-2">Values in SI units:</div>
                <div>R = 8.314 J/mol·K = 8.314 × 10⁻³ kJ/mol·K</div>
                <div>T = 298 K</div>
                <div>ΔngRT = −1.5 × (8.314 × 10⁻³) × 298 = −3.716 kJ</div>
                <div className="mt-2">Therefore:</div>
                <div>ΔrU = ΔrH − ΔngRT = −3268 − (−3.716) = −3264.28 kJ/mol</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 3: Hess's Law Cycle" 
            question="Calculate the standard enthalpy of formation of C₂H₄(g) using the following combustion reactions: C(graphite) + O₂(g) → CO₂(g) (ΔH = −393.5 kJ), H₂(g) + ½O₂(g) → H₂O(l) (ΔH = −285.8 kJ), and C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(l) (ΔH = −1411.0 kJ)."
            solution={
              <div className="space-y-2">
                <div>Target reaction: 2C(graphite) + 2H₂(g) → C₂H₄(g)</div>
                <div>Multiply Carbon combustion by 2: &nbsp; 2 × (−393.5) = −787.0 kJ</div>
                <div>Multiply Hydrogen combustion by 2: &nbsp; 2 × (−285.8) = −571.6 kJ</div>
                <div>Reverse Ethylene combustion: &nbsp; +1411.0 kJ</div>
                <div className="mt-2">Sum of reaction steps:</div>
                <div>ΔfH°(C₂H₄) = (−787.0) + (−571.6) + 1411.0</div>
                <div className="font-bold text-emerald-300">ΔfH° = +52.4 kJ/mol</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 4: Bond Enthalpy approximation" 
            question="Estimate the enthalpy change for the reaction: H₂(g) + Cl₂(g) → 2HCl(g) if the bond enthalpies of H-H, Cl-Cl, and H-Cl are 436 kJ/mol, 242 kJ/mol, and 431 kJ/mol respectively."
            solution={
              <div className="space-y-2">
                <div>Formula: ΔrH ≈ Σ (Bond enthalpies of broken bonds) − Σ (Bond enthalpies of formed bonds)</div>
                <div>Bonds broken: 1 mol H-H + 1 mol Cl-Cl</div>
                <div>Bonds formed: 2 mol H-Cl</div>
                <div className="mt-2">Calculation:</div>
                <div>ΔrH = (436 + 242) − 2 × (431)</div>
                <div>ΔrH = 678 − 862</div>
                <div className="font-bold text-emerald-300">ΔrH = −184 kJ</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 5: Born-Haber Cycle & Lattice Enthalpy" 
            question="Find the lattice dissociation enthalpy of NaCl(s) using the Born-Haber cycle data: ΔfH°(NaCl) = −411 kJ/mol, sublimation enthalpy of Na = +108 kJ/mol, ionization energy of Na = +496 kJ/mol, bond dissociation energy of Cl₂ = +242 kJ/mol, electron gain enthalpy of Cl = −349 kJ/mol."
            solution={
              <div className="space-y-2">
                <div>Cycle equation: ΔfH° = ΔsubH + IE + ½ B.E. + EA − U_formation</div>
                <div>Where U_dissociation = +U_formation</div>
                <div>−411 = 108 + 496 + ½(242) + (−349) − U_formation</div>
                <div>−411 = 108 + 496 + 121 − 349 − U_formation</div>
                <div>−411 = 376 − U_formation</div>
                <div>U_formation = 376 + 411 = 787 kJ/mol</div>
                <div className="font-bold text-emerald-300">Lattice dissociation enthalpy = +787 kJ/mol (formation = −787 kJ/mol)</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 6: Entropy of Phase Transition" 
            question="The enthalpy of vaporization of water at 373 K is 40.66 kJ/mol. Calculate the entropy change (ΔS) for the vaporization of 1 mole of water in J/mol·K."
            solution={
              <div className="space-y-2">
                <div>Formula at phase transition equilibrium: ΔSvap = ΔHvap / Tb</div>
                <div>Convert ΔH to Joules: 40.66 kJ/mol = 40660 J/mol</div>
                <div>Tb = 373 K</div>
                <div className="mt-2">Calculation:</div>
                <div>ΔSvap = 40660 / 373 = 109.0 J/mol·K</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 7: Gibbs Energy Spontaneity Boundary" 
            question="For a chemical reaction, ΔH = −10.5 kJ and ΔS = −30.0 J/K. Determine if the reaction is spontaneous at (a) 298 K, and (b) 500 K. Assume ΔH and ΔS are constant."
            solution={
              <div className="space-y-2">
                <div>Convert ΔS to kJ/K: −30.0 J/K = −0.030 kJ/K</div>
                <div className="mt-2">(a) At T = 298 K:</div>
                <div>ΔG = ΔH − TΔS = −10.5 − [298 × (−0.030)] = −10.5 + 8.94 = −1.56 kJ</div>
                <div className="text-emerald-300">ΔG &lt; 0 → Spontaneous at 298 K</div>
                <div className="mt-2">(b) At T = 500 K:</div>
                <div>ΔG = −10.5 − [500 × (−0.030)] = −10.5 + 15.0 = +4.5 kJ</div>
                <div className="text-rose-300">ΔG &gt; 0 → Non-spontaneous at 500 K (entropy term dominates at high T)</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 8: Gibbs Energy and Equilibrium Constant" 
            question="The equilibrium constant (K) for a reaction is 10 at 298 K. Calculate the standard Gibbs free energy change (ΔG°) for this reaction in kJ/mol at 298 K. (R = 8.314 J/mol·K)"
            solution={
              <div className="space-y-2">
                <div>Formula: ΔG° = −2.303 RT log K</div>
                <div>R = 8.314 J/mol·K = 8.314 × 10⁻³ kJ/mol·K</div>
                <div>T = 298 K</div>
                <div>log K = log(10) = 1</div>
                <div className="mt-2">Calculation:</div>
                <div>ΔG° = −2.303 × (8.314 × 10⁻³) × 298 × 1</div>
                <div>ΔG° = −19.146 × 298 × 10⁻³ = −5.71 kJ/mol</div>
              </div>
            }
          />

        </div>
      </Collapsible>

      {/* ── SECTION 13: Common Mistakes & IAT Shortcuts ───────────────────── */}
      <Collapsible title="13 · Common Mistakes & IAT Shortcuts" icon={<Zap className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { title: 'The Unit Trap (J vs kJ)', body: 'Always convert ΔS (usually in J/K) to kJ/K by dividing by 1000 before plugging it into the Gibbs spontaneity relation ΔG = ΔH − TΔS. A mismatch in units is the most common reason for numerical errors.' },
              { title: 'Bond Enthalpy Sign', body: 'The general product-minus-reactant rule is reversed for Bond Enthalpies: ΔH ≈ Σ(Broken reactant bonds) − Σ(Formed product bonds). Remember: breaking is endothermic (+), forming is exothermic (−).' },
              { title: 'Standard state ≠ STP', body: 'Standard state (indicated by the superscript °) refers to the element at 1 bar pressure at the temperature under consideration (usually 298.15 K). It is not the same as STP (0°C, 1 atm).' },
              { title: 'Enthalpy of neutralization exception', body: 'Neutralization of strong monoprotic acid by a strong base is −57.1 kJ/mol. Weak acids or bases require heat for complete ionization, resulting in a less exothermic neutralization value.' },
              { title: 'Internal energy is f(T)', body: 'For an ideal gas, internal energy depends only on temperature. Therefore, in any isothermal process (constant T), ΔU is exactly zero.' },
            ].map(trap => <TrapCard key={trap.title} title={trap.title}>{trap.body}</TrapCard>)}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              'Reversible isothermal work: w_rev = −nRT ln(V₂/V₁). Maximizes work output for gas expansions.',
              'Kirchhoff\'s Equation: ΔH(T₂) = ΔH(T₁) + ΔCp(T₂ − T₁). Use it when reaction enthalpies vary with temperature.',
              'Third Law: S = 0 only for perfect crystalline substances at 0 K.',
              'Phase transition entropy: ΔS = ΔH / T at the equilibrium transition temperature.',
              'Mayer\'s relation: Cp − Cv = R for one mole of an ideal gas.',
              'Entropy criteria: gases have significantly higher entropy than liquids or solids due to microstates.',
              'Isothermal free expansion: q = 0, w = 0, ΔU = 0, and ΔT = 0.',
              'Hemoglobin transition: Fe²⁺ transitions from high-spin (deoxy, out-of-plane) to low-spin (oxy, in-plane) upon oxygen binding.',
            ].map((tip, i) => <ExamTip key={i}>{tip}</ExamTip>)}
          </div>
        </div>
      </Collapsible>

      {/* ── RAPID REVISION ────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider">Rapid Revision Checklist</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] text-white/70">
          {[
            'System, boundary, surroundings — key definitions',
            'Open beaker (open), sealed flask (closed), thermos (isolated)',
            'Intensive variables independent of amount (T, P, density)',
            'State functions depend only on initial/final state (U, H, S, G)',
            'Path functions depend on the mechanism (heat q, work w)',
            'First Law sign convention: ΔU = q + w (heat in (+), work on (+))',
            'Pressure-volume work formula: w = −Pext ΔV',
            'Ideal gas isothermal expansion: ΔU = 0, q = −w',
            'Enthalpy definition: H = U + PV',
            'Stoichiometric gas relation: ΔrH = ΔrU + ΔngRT',
            'Mayer\'s relation: Cp − Cv = R for ideal gases',
            'Adiabatic ideal gas relations: PV^γ = constant',
            'Constant volume (bomb) calorimeter: qv = ΔU',
            'Constant pressure (coffee cup) calorimeter: qp = ΔH',
            'Hess\'s Law: total enthalpy change is pathway-independent',
            'Standard formation enthalpy of element standard states = 0',
            'Lattice dissociation (+) vs Lattice formation (−)',
            'Kirchhoff\'s temperature dependence of reaction enthalpies',
            'Entropy dS = δqrev/T; spontaneous ΔStotal = ΔSsys + ΔSsurr > 0',
            'Third Law: S = 0 at 0 K for perfect crystals',
            'Gibbs equation: ΔG = ΔH − TΔS at constant T and P',
            'Equilibrium relation: ΔG° = −RT ln K',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
