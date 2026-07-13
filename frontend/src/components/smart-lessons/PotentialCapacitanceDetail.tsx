import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  BookOpen, Zap, Brain, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG VISUAL 1: EQUIPOTENTIAL SURFACES ────────────────────────────────────
function EquipotentialSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Equipotential Planes vs Electric Field (E ⊥ V)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Uniform E Field lines */}
        {[40, 110, 180, 250, 320].map(x => (
          <g key={x}>
            <line x1={x} y1="10" x2={x} y2="110" stroke="#f87171" strokeWidth="1.2" />
            <path d="M 0 0 L -3 6 L 3 6 Z" fill="#f87171" transform={`translate(${x} 110)`} />
          </g>
        ))}
        <text x="325" y="105" fill="#f87171" fontSize="8" fontFamily="monospace">E-Field</text>

        {/* Equipotential Planes (horizontal dashed lines) */}
        {[30, 60, 90].map((y, idx) => (
          <g key={y}>
            <line x1="20" y1={y} x2="320" y2={y} stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x="25" y={y - 4} fill="#22d3ee" fontSize="8" fontFamily="monospace">V_{3 - idx} = {(3 - idx) * 10} V</text>
          </g>
        ))}

        {/* Path and Work Done representation */}
        <circle cx="150" cy="60" r="3.5" fill="#34d399" />
        <line x1="150" y1="60" x2="220" y2="60" stroke="#34d399" strokeWidth="1" strokeDasharray="2,2" />
        <circle cx="220" cy="60" r="3.5" fill="#34d399" />
        <path d="M 220 60 L 214 57 L 214 63 Z" fill="#34d399" />
        
        <text x="185" y="53" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">ΔV = 0 &rArr; Work = 0</text>
        <text x="150" y="73" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace">Point A</text>
        <text x="220" y="73" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace">Point B</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 2: PARALLEL PLATE CAPACITOR ──────────────────────────────────
function CapacitorPlateSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Parallel Plate Capacitor Fields &amp; Force</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 130 }}>
        {/* Left Positive Plate */}
        <rect x="50" y="15" width="8" height="100" fill="#22d3ee" rx="1.5" />
        {Array.from({ length: 5 }).map((_, i) => (
          <text key={i} x="54" y={32 + i * 18} fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
        ))}
        <text x="54" y="10" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">Plate A (+Q)</text>

        {/* Right Negative Plate */}
        <rect x="280" y="15" width="8" height="100" fill="#f87171" rx="1.5" />
        {Array.from({ length: 5 }).map((_, i) => (
          <text key={i} x="284" y={31 + i * 18} fill="#000" fontSize="10" fontWeight="bold" textAnchor="middle">-</text>
        ))}
        <text x="284" y="10" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">Plate B (-Q)</text>

        {/* E Field arrows inside */}
        {[30, 48, 66, 84, 102].map(y => (
          <g key={y}>
            <line x1="64" y1={y} x2="274" y2={y} stroke="#a78bfa" strokeWidth="1" />
            <path d="M 274 y L 268 y-3 L 268 y+3 Z" fill="#a78bfa" transform={`translate(0 ${y})`} />
          </g>
        ))}
        <text x="160" y="55" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" textAnchor="middle">E = σ / ε₀</text>

        {/* Distance Indicator */}
        <line x1="58" y1="122" x2="280" y2="122" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="58" y1="119" x2="58" y2="125" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="280" y1="119" x2="280" y2="125" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
        <text x="169" y="120" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">Separation (d)</text>

        {/* Attraction force arrows */}
        <path d="M 85 65 L 105 65" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#garr)" />
        <path d="M 245 65 L 225 65" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#garr)" />
        <text x="160" y="78" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">Plate Attraction: F = Q² / (2ε₀A)</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 3: DIELECTRIC POLARISATION ────────────────────────────────────
function DielectricInsertionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Capacitor with Dielectric Slab (C increases by K)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Metal Plates */}
        <rect x="30" y="15" width="6" height="90" fill="#22d3ee" />
        <rect x="304" y="15" width="6" height="90" fill="#f87171" />
        <text x="33" y="10" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">+Q</text>
        <text x="307" y="10" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">-Q</text>

        {/* Dielectric Slab */}
        <rect x="80" y="20" width="180" height="80" fill="#a78bfa" fillOpacity="0.15" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2" />
        <text x="170" y="64" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Dielectric Slab (K)</text>

        {/* Induced/Polarised Surface Charges */}
        {/* Negative bound charge on left dielectric surface */}
        {Array.from({ length: 4 }).map((_, i) => (
          <text key={i} x="86" y="38 + i * 16" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">-</text>
        ))}
        {/* Positive bound charge on right dielectric surface */}
        {Array.from({ length: 4 }).map((_, i) => (
          <text key={i} x="254" y="39 + i * 16" fill="#22d3ee" fontSize="7" fontWeight="bold" textAnchor="middle">+</text>
        ))}

        {/* Field directions */}
        <line x1="42" y1="35" x2="292" y2="35" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
        <path d="M 292 35 L 286 32 L 286 38 Z" fill="#ffffff" fillOpacity="0.2" />
        <text x="55" y="31" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace">E<sub>0</sub> (Vacuum field)</text>

        <line x1="240" y1="85" x2="95" y2="85" stroke="#f87171" strokeWidth="0.8" />
        <path d="M 95 85 L 101 82 L 101 88 Z" fill="#f87171" />
        <text x="235" y="81" fill="#f87171" fontSize="7.5" fontFamily="monospace" textAnchor="end">E<sub>p</sub> (Induced polar field)</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 4: DIPOLE POTENTIAL ──────────────────────────────────────────
function DipolePotentialSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Electric Dipole Equipotential Plane (V = 0 Equatorial Line)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Charges */}
        <circle cx="100" cy="60" r="7" fill="#22d3ee" />
        <text x="100" y="63" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
        <text x="100" y="47" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">+q</text>

        <circle cx="240" cy="60" r="7" fill="#f87171" />
        <text x="240" y="62" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">-</text>
        <text x="240" y="47" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">-q</text>

        {/* Equatorial Zero Potential Plane */}
        <line x1="170" y1="10" x2="170" y2="110" stroke="#34d399" strokeWidth="2.5" />
        <text x="175" y="25" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Equatorial Line (V = 0)</text>

        {/* Potential lines */}
        {/* positive potential loops */}
        <circle cx="100" cy="60" r="24" fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
        <circle cx="95" cy="60" r="16" fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.6" />
        {/* negative potential loops */}
        <circle cx="240" cy="60" r="24" fill="none" stroke="#f87171" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.4" />
        <circle cx="245" cy="60" r="16" fill="none" stroke="#f87171" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.6" />
        
        <text x="175" y="105" fill="#ffffff" fillOpacity="0.3" fontSize="7.5" fontFamily="monospace">E-Field Lines are ⊥ to this plane</text>
      </svg>
    </div>
  );
}

function NChargeAssemblySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4.1 — Potential Energy of 3-Charge Assembly</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Triangle structure */}
        <line x1="170" y1="20" x2="80" y2="90" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3,2" />
        <line x1="170" y1="20" x2="260" y2="90" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3,2" />
        <line x1="80" y1="90" x2="260" y2="90" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3,2" />
        
        {/* Charges */}
        <circle cx="170" cy="20" r="7" fill="#22d3ee" />
        <text x="170" y="23" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
        <text x="170" y="9" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">q<sub>1</sub></text>

        <circle cx="80" cy="90" r="7" fill="#f87171" />
        <text x="80" y="92" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">-</text>
        <text x="80" y="103" fill="#f87171" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">q<sub>2</sub></text>

        <circle cx="260" cy="90" r="7" fill="#22d3ee" />
        <text x="260" y="93" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
        <text x="260" y="103" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">q<sub>3</sub></text>

        {/* Distance labels */}
        <text x="120" y="50" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">r<sub>12</sub></text>
        <text x="220" y="50" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">r<sub>13</sub></text>
        <text x="170" y="100" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">r<sub>23</sub></text>

        {/* Energy breakdown */}
        <text x="170" y="68" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Total U = U<sub>12</sub> + U<sub>13</sub> + U<sub>23</sub></text>
      </svg>
    </div>
  );
}

function PartialDielectricSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5.1 — Partial Dielectric Slab Insertion (thickness t &lt; d)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Plates */}
        <rect x="50" y="15" width="6" height="90" fill="#22d3ee" />
        <rect x="280" y="15" width="6" height="90" fill="#f87171" />
        
        {/* Partially Inserted Dielectric Slab */}
        <rect x="110" y="20" width="80" height="80" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
        <text x="150" y="64" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Slab (K)</text>

        {/* Separation indicators */}
        {/* Full separation d */}
        <line x1="56" y1="112" x2="280" y2="112" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="56" y1="109" x2="56" y2="115" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="280" y1="109" x2="280" y2="115" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
        <text x="240" y="120" fill="#ffffff" fillOpacity="0.5" fontSize="7.5" fontFamily="monospace" textAnchor="middle">separation d</text>

        {/* Slab thickness t */}
        <line x1="110" y1="112" x2="190" y2="112" stroke="#a78bfa" strokeWidth="1.2" />
        <line x1="110" y1="109" x2="110" y2="115" stroke="#a78bfa" strokeWidth="1.2" />
        <line x1="190" y1="109" x2="190" y2="115" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="150" y="120" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">thickness t</text>
      </svg>
    </div>
  );
}

function VanDeGraaffSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 6 — Van de Graaff Generator: Corona Discharge accumulation</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 140 }}>
        {/* Inner Pulley/Belt */}
        <rect x="155" y="45" width="30" height="80" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
        <ellipse cx="170" cy="45" rx="15" ry="4" fill="#ffffff" fillOpacity="0.3" />
        <ellipse cx="170" cy="125" rx="15" ry="4" fill="#ffffff" fillOpacity="0.3" />
        
        {/* Belt */}
        <line x1="155" y1="45" x2="155" y2="125" stroke="#fb923c" strokeWidth="1.5" />
        <line x1="185" y1="45" x2="185" y2="125" stroke="#fb923c" strokeWidth="1.5" />

        {/* Large outer hollow conducting sphere */}
        <circle cx="170" cy="45" r="32" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <text x="170" y="27" fill="#22d3ee" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Hollow Sphere (V = kQ/R)</text>

        {/* Brushes */}
        {/* Spray brush bottom */}
        <line x1="140" y1="115" x2="152" y2="115" stroke="#f87171" strokeWidth="1" />
        <text x="135" y="118" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="end">Spray Brush (+)</text>
        
        {/* Collect brush top */}
        <line x1="188" y1="45" x2="200" y2="45" stroke="#34d399" strokeWidth="1" />
        <text x="205" y="48" fill="#34d399" fontSize="7" fontFamily="monospace">Collector Brush</text>

        {/* Positive charges accumulating on the outer shell */}
        {(() => {
          const charges = [];
          for (let deg = 0; deg < 360; deg += 30) {
            const r = 36;
            const rad = deg * Math.PI / 180;
            const x = 170 + r * Math.cos(rad);
            const y = 45 + r * Math.sin(rad);
            if (deg > 60 && deg < 120) continue;
            charges.push(<text key={deg} x={x} y={y + 2.5} fill="#22d3ee" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>);
          }
          return charges;
        })()}
      </svg>
    </div>
  );
}

// ─── REUSABLE UI HELPERS ─────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' }) {
  const styles = {
    cyan:   'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:   'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:  'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[12px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">{children}</h2>
  );
}

function PremiumFormulaCard({ formula, label, use, priority = 5 }: { formula: string; label: string; use: string; priority?: number }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 hover:border-white/15 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-white/45">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <p className=" text-cyan-300 font-bold text-[13px] sm:text-sm" dangerouslySetInnerHTML={{ __html: formula }} />
      <div className="text-[12px] space-y-0.5">
        <p className="text-white/80"><strong className="text-white/40">Use:</strong> <span dangerouslySetInnerHTML={{ __html: use }} /></p>
        <p className="text-white/55"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: label }} /></p>
      </div>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-rose-400/50" /> : <ChevronDown className="w-4 h-4 text-rose-400/50" />}
      </button>
      {isOpen && (
        <div className="text-white/65 text-[13px] leading-relaxed mt-2 pt-2 border-t border-rose-500/10">
          {children}
        </div>
      )}
    </div>
  );
}

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">Key Insight</span>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function RevealCard({ emoji, title, formula, detail }: { emoji: string; title: string; formula: string; detail: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(v => !v)}
      className="w-full text-left p-4 rounded-2xl bg-[#090b18] border border-white/8 hover:border-white/15 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[21px]">{emoji}</span>
          <div>
            <p className="text-white/80 font-bold text-[13px]">{title}</p>
            <p className=" text-cyan-400 text-[14.5px] font-bold mt-0.5" dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
      </div>
      {open && (
        <p className="text-white/55 text-[13px] leading-relaxed mt-3 pt-3 border-t border-white/5">
          {detail}
        </p>
      )}
    </button>
  );
}

export default function PotentialCapacitanceDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'dielectric' | 'capacitor' | 'equipotential'>('dielectric');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(10).fill(false));

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🔋</span>
              <Tag color="cyan">Physics Unit 12</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">High Weightage</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Electrostatic Potential and Capacitance
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex items-center gap-1">
              <span>Prerequisites:</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Coulomb\'s Law</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electric Field</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Gauss\'s Law</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Hard (5/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px] font-bold text-white/40">
              <span className="uppercase tracking-wider">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[12px] text-white/35 font-medium">
              {isCompleted ? 'Reading Completed — Quiz Unlocked! 🔓' : 'Scroll to complete the lesson and unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

      {/* WHAT YOU WILL LEARN */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <SectionTitle>What You Will Learn</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              'Electrostatic potential (V) vs Potential Energy (U) properties',
              'The potential gradient relation: E = -dV/dr',
              'Electric dipole potential profiles & 1/r² axial dependencies',
              'Equipotential surfaces behavior & zero work done paths',
              'Electrostatic shielding & potentials of conducting spheres',
              'Dielectrics insert parameters under battery connected vs removed states',
              'Parallel plate capacitance derivations & force between plates',
              'Series vs Parallel capacitor networks configurations'
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: ELECTROSTATIC POTENTIAL & GRADIENT */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Electrostatic Potential &amp; Potential Gradient</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Electric potential (V) measures the electrical potential energy per unit charge at a point. It is a scalar field, simplifying complex vector field maps into simple scalar sums.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[400px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Feature</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Electric Potential (V)</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-bold uppercase">Potential Energy (U)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Nature', 'Property of a specific coordinate in space', 'Property of the system of interacting charges'],
                ['Formula (Point charge)', 'V = kq / r', 'U = k q<sub>1</sub>q<sub>2</sub> / r'],
                ['SI Unit', 'Volt (1 V = 1 J/C)', 'Joule (J)'],
                ['Mathematical Nature', 'Scalar field (add algebraically)', 'Scalar quantity (add algebraically)'],
              ].map(([feat, pot, nrg]) => (
                <tr key={feat as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: feat as string }} />
                  <td className="px-4 py-3 text-cyan-300" dangerouslySetInnerHTML={{ __html: pot as string }} />
                  <td className="px-4 py-3 text-emerald-300" dangerouslySetInnerHTML={{ __html: nrg as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="V = W / q₀"
            use="Potential (V) as work done (W) per unit test charge (q₀)"
            label="Work done is path-independent in conservative electrostatic fields."
            priority={5}
          />
          <PremiumFormulaCard
            formula="E = -dV / dr"
            use="Calculates electric field from potential gradient"
            label="Negative sign shows that electric field E points towards decreasing potential."
            priority={5}
          />
        </div>
      </div>

      {/* PART 2: DIPOLE POTENTIAL & COMPARISON TABLE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Electric Dipole Potential Profiles</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The electric potential of a dipole is angle-dependent and decays faster than that of a point charge.
        </p>
        <DipolePotentialSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="V<sub>dipole</sub> = (k &middot; p &middot; cos&theta;) / r&sup2;"
            use="Potential due to a short dipole at distance r, angle θ"
            label="k = 1/(4πε₀), p = q*2a. Decays as 1/r²."
            priority={5}
          />
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 text-[12px] text-white/70">
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">📍 Special Dipole Cases</span>
            <p>&bull; <strong className="text-white">Axial Line (θ = 0° / 180°):</strong> <code>V = &plusmn; kp / r²</code> (Maximum magnitude).</p>
            <p>&bull; <strong className="text-white">Equatorial Line (θ = 90°):</strong> <code>V = 0</code> (The entire equatorial plane is a zero potential boundary!).</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[400px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Quantity</th>
                <th className="text-center px-4 py-3 text-cyan-400 font-bold uppercase">Point Charge Dependency</th>
                <th className="text-center px-4 py-3 text-violet-400 font-bold uppercase">Dipole Dependency</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Electric Potential (V)', 'V ∝ 1 / r', 'V ∝ 1 / r²'],
                ['Electric Field (E)', 'E ∝ 1 / r²', 'E ∝ 1 / r³'],
              ].map(([qty, pt, dp]) => (
                <tr key={qty as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{qty as string}</td>
                  <td className="px-4 py-3 text-cyan-300 text-center">{pt as string}</td>
                  <td className="px-4 py-3 text-violet-300 text-center font-bold">{dp as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TrapCard title="Common IAT Trap: V = 0 vs E = 0">
          A zero potential at a point does NOT imply the electric field is zero!
          <br />&bull; At the <strong>center of an electric dipole</strong>, the potential is exactly zero (<code>V = 0</code>), but the electric field is non-zero (<code>E = 2kp/d³</code>).
          <br />&bull; Conversely, at the <strong>midpoint between two equal positive charges</strong>, the electric field is zero (<code>E = 0</code>), but the potential is positive and non-zero (<code>V = 2kq/r</code>).
        </TrapCard>
      </div>

      {/* PART 3: EQUIPOTENTIAL SURFACES & SYSTEM ENERGY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Equipotential Surfaces &amp; Energy</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          An equipotential surface is a surface where the potential has the same constant value at every point.
        </p>
        <EquipotentialSVG />

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">🔑 Core Equipotential Properties</span>
          <p>&bull; <strong className="text-white">Zero Work Done:</strong> No work is done in moving a charge between any two points on an equipotential surface (<code>W = q &Delta;V = 0</code>).</p>
          <p>&bull; <strong className="text-white">Perpendicular E-Field:</strong> The electric field lines are ALWAYS perpendicular to the equipotential surface at every point. If they weren\'t, there would be a tangential component of E along the surface, which would require work to move a charge.</p>
          <p>&bull; <strong className="text-white">Spacing:</strong> Equipotential surfaces are closer together in regions of strong electric fields and farther apart in weak field zones (<code>dr = |dV / E|</code>).</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">INSIGHT</span>
            <span className="text-[12px] text-white/50">n-Charge Assembly Potential Energy</span>
          </div>
          <NChargeAssemblySVG />
          <p className="text-white/60 text-[13px] leading-relaxed">
            <strong>Assembling n Charges:</strong> The total work required to assemble a configuration of point charges is the sum of the potential energy of all possible pairs:
            <br /><code className="text-cyan-300 font-bold">U<sub>total</sub> = k &Sigma;<sub>i &lt; j</sub> (q<sub>i</sub>q<sub>j</sub> / r<sub>ij</sub>)</code>
            <br />For three charges, this becomes: <code className="text-emerald-400">U = k (q<sub>1</sub>q<sub>2</sub>/r<sub>12</sub> + q<sub>1</sub>q<sub>3</sub>/r<sub>13</sub> + q<sub>2</sub>q<sub>3</sub>/r<sub>23</sub>)</code>.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="U = qV"
            use="Potential energy of point charge q in external potential V"
            label="This is the general potential energy for a point charge placed in a pre-existing external field."
            priority={5}
          />
          <PremiumFormulaCard
            formula="U = k &middot; q<sub>1</sub>q<sub>2</sub> / r"
            use="Potential energy of a two point charge system"
            label="Attracting charges (opposite signs) have negative potential energy (stable). Repelling charges have positive energy."
            priority={5}
          />
          <PremiumFormulaCard
            formula="U = &minus;p &middot; E cos&theta;"
            use="Potential energy of a dipole in uniform E-field"
            label="Minimum potential energy (stable equilibrium) occurs at &theta; = 0&deg; (dipole aligned with field)."
            priority={5}
          />
        </div>
      </div>

      {/* PART 4: ELECTROSTATICS OF CONDUCTORS & DIELECTRICS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Electrostatics of Conductors &amp; Dielectrics</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Conductors have free valence electron clouds, while dielectrics (insulators) do not have free charges but polarize in external fields.
        </p>
        <DielectricInsertionSVG />

 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-amber-400 uppercase tracking-wider block">🛡️ Electrostatics of Conductors Rules</span>
          <ul className="text-white/70 space-y-2">
            <li>1. <strong className="text-white">E<sub>inside</sub> = 0:</strong> Inside a conductor in static equilibrium, the electric field is exactly zero.</li>
            <li>2. <strong className="text-white">Surface E-Field:</strong> E is always perpendicular to the surface at every point (<code>E ⊥ Surface</code>).</li>
            <li>3. <strong className="text-white">Constant Potential V:</strong> The potential is constant throughout the volume and equal to its surface value.</li>
            <li>4. <strong className="text-white">Cavity Shielding:</strong> Cavity inside a conductor has zero field (electrostatic shielding).</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RevealCard
            emoji="🔋"
            title="Battery Disconnected (Q is Constant)"
            formula="C = KC₀ | V = V₀/K | U = U₀/K"
            detail="When dielectric is inserted with battery removed, the charge Q is trapped and stays constant. Capacitance increases, causing potential V and stored energy U to drop by a factor of K."
          />
          <RevealCard
            emoji="⚡"
            title="Battery Connected (V is Constant)"
            formula="C = KC₀ | Q = KQ₀ | U = KU₀"
            detail="When dielectric is inserted with battery connected, the potential V remains constant. Capacitance increases, drawing more charge Q from the battery and increasing stored energy U by K."
          />
        </div>

        <div className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 text-[12px] font-bold">APPLICATION</span>
            <span className="text-[12px] text-white/50">Van de Graaff Generator</span>
          </div>
          <VanDeGraaffSVG />
          <p className="text-white/60 text-[13px] leading-relaxed">
            <strong>Van de Graaff Generator:</strong> An electrostatic machine designed to build up extremely high potentials (millions of volts) on a hollow metal sphere.
            <br />&bull; <strong>Corona Discharge:</strong> Charge is sprayed onto a moving belt using comb-like needles at high potential via corona discharge (leakage from sharp points).
            <br />&bull; <strong>Shielding Principle:</strong> The belt carries charges inside the hollow sphere, where a collector brush transfers them to the inner surface. Since charge on a conductor resides entirely on its <em>outer surface</em>, the potential of the outer sphere rises continuously: <code>V = kQ/R</code>.
          </p>
        </div>
      </div>

      {/* PART 5: CAPACITORS & NETWORKS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Capacitors &amp; Networks</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A capacitor is a system of two conductors separated by an insulator, used to store electric charge and electrical potential energy.
        </p>
        <CapacitorPlateSVG />

        {/* PARALLEL PLATE CAPACITOR DETAIL */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Parallel Plate Capacitor Dynamics</span>
          <p className="text-white/70 leading-relaxed">
            The capacitance of a parallel plate capacitor in vacuum is:
            <br /><code className="text-cyan-300 font-bold">C = ε₀A / d</code>
            <br />&bull; <strong>Area effect:</strong> Capacitance is directly proportional to plate area: <code>C ∝ A</code>.
            <br />&bull; <strong>Separation effect:</strong> Capacitance is inversely proportional to plate separation distance: <code>C ∝ 1/d</code>.
            <br />&bull; <strong>With Dielectric:</strong> If a dielectric of constant K is inserted, <code>C<sub>new</sub> = K &middot; C<sub>vac</sub> = K &middot; &epsilon;<sub>0</sub>A/d</code>.
          </p>
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-400 block uppercase">⚙️ Force between Plates</span>
            <p className="text-white/60 leading-relaxed">
              The plates of a capacitor attract each other with a force given by:
              <br /><code className="text-emerald-300 font-bold">F = Q&sup2; / (2&epsilon;<sub>0</sub>A) = &frac12; q E<sub>plate</sub></code>
              <br />where <code>E<sub>plate</sub> = &sigma; / (2&epsilon;<sub>0</sub>) = Q / (2&epsilon;<sub>0</sub>A)</code> is the electric field produced by one plate. Note that the force is independent of plate separation distance <code>d</code> as long as <code>Q</code> is constant.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">INSIGHT</span>
            <span className="text-[12px] text-white/50">Partial Dielectric Slab Insertion</span>
          </div>
          <PartialDielectricSVG />
          <p className="text-white/60 text-[13px] leading-relaxed">
            <strong>Partial Slab Insertion:</strong> If a dielectric slab of thickness <code>t</code> (where <code>t &lt; d</code>) and constant <code>K</code> is inserted:
            <br /><code className="text-cyan-300 font-bold">C = &epsilon;<sub>0</sub>A / [d &minus; t + (t / K)]</code>
            <br />&bull; If fully filled (<code>t = d</code>): <code>C = &epsilon;<sub>0</sub>A / (d/K) = K &middot; &epsilon;<sub>0</sub>A/d = KC<sub>0</sub></code>.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
 <table className="w-full text-[13px] min-w-[480px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Feature</th>
                <th className="text-center px-4 py-3 text-cyan-400 font-bold uppercase">Series Combination</th>
                <th className="text-center px-4 py-3 text-emerald-400 font-bold uppercase">Parallel Combination</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Same Quantity', 'Charge (Q) is same on all capacitors', 'Potential Difference (V) is same across all'],
                ['Equivalent Capacitance', '1/C<sub>eq</sub> = &Sigma; (1/C<sub>i</sub>)', 'C<sub>eq</sub> = &Sigma; C<sub>i</sub>'],
                ['Formula for Two Capacitors', 'C<sub>eq</sub> = (C<sub>1</sub> &middot; C<sub>2</sub>) / (C<sub>1</sub> + C<sub>2</sub>)', 'C<sub>eq</sub> = C<sub>1</sub> + C<sub>2</sub>'],
                ['Equivalent C Magnitude', 'C<sub>eq</sub> is smaller than the smallest capacitor', 'C<sub>eq</sub> is larger than the largest capacitor'],
              ].map(([feat, ser, par]) => (
                <tr key={feat as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: feat as string }} />
                  <td className="px-4 py-3 text-cyan-300 text-center" dangerouslySetInnerHTML={{ __html: ser as string }} />
                  <td className="px-4 py-3 text-emerald-300 text-center font-bold" dangerouslySetInnerHTML={{ __html: par as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="U = &frac12; C V&sup2; = Q&sup2; / (2C) = &frac12; Q V"
            use="Calculates energy stored in a capacitor"
            label="Equals the area under the charge Q vs potential V charging curve."
            priority={5}
          />
          <PremiumFormulaCard
            formula="u = &frac12; &epsilon;<sub>0</sub> E&sup2;"
            use="Electrostatic energy density (energy per unit volume) in E-field"
            label="Stored in the electric field between plates. Shows energy resides in field, not metal."
            priority={5}
          />
          <PremiumFormulaCard
            formula="&Delta;U<sub>loss</sub> = &frac12; &middot; [C<sub>1</sub>C<sub>2</sub> / (C<sub>1</sub>+C<sub>2</sub>)] &middot; (V<sub>1</sub> &minus; V<sub>2</sub>)&sup2;"
            use="Energy loss on connecting charged capacitors"
            label="Stored energy is converted into heat and electromagnetic radiation during charge redistribution."
            priority={5}
          />
        </div>
      </div>

      {/* PART 6: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0"><BookOpen className="w-5 h-5" /></span>
          <h3 className="text-white font-display font-bold text-[17px] sm:text-lg tracking-wide uppercase">Solved Numerical Examples</h3>
        </div>

        {/* Example 1: Midpoint Potential */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 1: Algebraic superposition of potentials</span>
            <p className="text-white/80 leading-relaxed">
              Two point charges q<sub>1</sub> = +3.0 μC and q<sub>2</sub> = -3.0 μC are placed at coordinates A(0, 0) and B(4.0 m, 0) respectively. Find the potential V and electric field E at:
              <br />(i) the midpoint of the line segment AB.
              <br />(ii) a point C(2.0 m, 3.0 m) on the equatorial axis.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Case (i) — Midpoint M(2.0 m, 0):</strong>
              <br />&nbsp;&nbsp;&nbsp;Distance from q<sub>1</sub> to M is <code>r<sub>1</sub> = 2.0 m</code>. Distance from q<sub>2</sub> to M is <code>r<sub>2</sub> = 2.0 m</code>.
              <br />&nbsp;&nbsp;&nbsp;Potential V<sub>M</sub> is scalar sum:
              <br />&nbsp;&nbsp;&nbsp;<code>V<sub>M</sub> = k q<sub>1</sub>/r<sub>1</sub> + k q<sub>2</sub>/r<sub>2</sub> = k &middot; (3.0 &times; 10<sup>&minus;6</sup>)/2.0 + k &middot; (&minus;3.0 &times; 10<sup>&minus;6</sup>)/2.0 = 0 Volts</code>.
              <br />&nbsp;&nbsp;&nbsp;Electric Field E<sub>M</sub> is vector sum:
              <br />&nbsp;&nbsp;&nbsp;Both fields point towards the right (away from positive q<sub>1</sub>, towards negative q<sub>2</sub>).
              <br />&nbsp;&nbsp;&nbsp;<code>E<sub>M</sub> = k |q<sub>1</sub>|/r<sub>1</sub>&sup2; + k |q<sub>2</sub>|/r<sub>2</sub>&sup2; = (9 &times; 10<sup>9</sup>) &middot; [ (3 &times; 10<sup>&minus;6</sup>)/4 + (3 &times; 10<sup>&minus;6</sup>)/4 ] = 1.35 &times; 10<sup>4</sup> N/C (along +x)</code>.
            </p>
            <p>
              2. <strong className="text-white">Case (ii) — Equatorial point C(2.0 m, 3.0 m):</strong>
              <br />&nbsp;&nbsp;&nbsp;Point C lies on the perpendicular bisector (equatorial axis).
              <br />&nbsp;&nbsp;&nbsp;Distances: <code>r<sub>1</sub> = sqrt(2² + 3²) = sqrt(13) m</code>. <code>r<sub>2</sub> = sqrt(2² + 3²) = sqrt(13) m</code>.
              <br />&nbsp;&nbsp;&nbsp;Since q<sub>1</sub> and q<sub>2</sub> are equal and opposite, <code>V<sub>C</sub> = k q<sub>1</sub>/r<sub>1</sub> + k q<sub>2</sub>/r<sub>2</sub> = 0</code>.
              <br />&nbsp;&nbsp;&nbsp;This matches the dipole equatorial potential rule!
            </p>
          </div>
        </div>

        {/* Example 2: Capacitor with Dielectric slab */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 2: Battery state changes with dielectric slab</span>
            <p className="text-white/80 leading-relaxed">
              A parallel plate capacitor of capacitance C₀ = 10 pF is charged by a battery to potential V₀ = 100 V. The battery is then disconnected. A dielectric slab of constant K = 5.0 is now inserted between the plates. Calculate the new capacitance C, charge Q, potential V, and energy stored U.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Identify the Constant Quantity:</strong>
              <br />&nbsp;&nbsp;&nbsp;Since the battery is <strong>disconnected</strong> before inserting the slab, the charge Q is trapped and remains constant:
              <br />&nbsp;&nbsp;&nbsp;<code>Q = Q₀ = C₀ * V₀ = 10 pF * 100 V = 1000 pC = 1.0 * 10^-9 C</code>.
            </p>
            <p>
              2. <strong className="text-white">New Capacitance (C):</strong>
              <br />&nbsp;&nbsp;&nbsp;Capacitance increases by K:
              <br />&nbsp;&nbsp;&nbsp;<code>C = K * C₀ = 5.0 * 10 pF = 50 pF</code>.
            </p>
            <p>
              3. <strong className="text-white">New Potential (V):</strong>
              <br />&nbsp;&nbsp;&nbsp;<code>V = Q / C = Q₀ / (KC₀) = V₀ / K = 100 V / 5.0 = 20 V</code>.
            </p>
            <p>
              4. <strong className="text-white">Stored Energy (U):</strong>
              <br />&nbsp;&nbsp;&nbsp;Original energy: <code>U₀ = (1/2) C₀ V₀² = (1/2) * (10 * 10^-12) * 100² = 5 * 10^-8 Joules</code>.
              <br />&nbsp;&nbsp;&nbsp;New energy: <code>U = U₀ / K = (5 * 10^-8 J) / 5.0 = 1.0 * 10^-8 Joules</code>.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE FORMULA FINDER (DECISION TREE) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Select what your question is trying to solve to immediately find the correct approach:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dielectric', label: '🔋 Dielectric Insertion' },
            { id: 'capacitor', label: '⚡ Capacitors & Force' },
            { id: 'equipotential', label: '🧱 Equipotential & Potential' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSelectedGoal(btn.id as any)}
              className={cn(
'px-3 py-1.5 rounded-xl border text-[13px] font-bold transition-all',
                selectedGoal === btn.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white/80 hover:bg-white/[0.04]'
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5">
          {selectedGoal === 'dielectric' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-cyan-400 block uppercase">Objective: Dielectric block battery status changes</span>
              <p className="text-white/70">1. Battery disconnected: Charge <code>Q = Constant</code>. <code>C &rarr; KC</code>, <code>V &rarr; V/K</code>, <code>U &rarr; U/K</code>.</p>
              <p className="text-white/70">2. Battery connected: Potential <code>V = Constant</code>. <code>C &rarr; KC</code>, <code>Q &rarr; KQ</code>, <code>U &rarr; KU</code>.</p>
            </div>
          )}
          {selectedGoal === 'capacitor' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-emerald-400 block uppercase">Objective: Plates forces and capacitance values</span>
              <p className="text-white/70">1. Vacuum capacitance: <code>C = ε₀A / d</code>.</p>
              <p className="text-white/70">2. Force between plates: <code>F = Q² / (2ε₀A)</code> (independent of plate separation d).</p>
              <p className="text-white/70">3. Series equivalent: <code>1/C<sub>eq</sub> = &Sigma;(1/C<sub>i</sub>)</code>; Parallel: <code>C<sub>eq</sub> = &Sigma; C<sub>i</sub></code>.</p>
            </div>
          )}
          {selectedGoal === 'equipotential' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-violet-400 block uppercase">Objective: Equipotentials, gradient, work done</span>
              <p className="text-white/70">1. Work done along equipotential: <code>W = q * ΔV = 0</code>.</p>
              <p className="text-white/70">2. Electric field direction: <code>E</code> points perpendicular to the equipotential surface.</p>
              <p className="text-white/70">3. Potential gradient: <code>E = -dV/dr</code>.</p>
            </div>
          )}
        </div>
      </div>

      {/* QUESTION RECOGNITION SECTION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"Battery remains connected during slab insertion"', think: 'Potential V is constant. Capacitance increases (C = KC0), charge increases (Q = KQ0), energy increases (U = KU0).' },
            { cue: '"Battery is disconnected before slab insertion"', think: 'Charge Q is constant. Capacitance increases (C = KC0), potential decreases (V = V0/K), energy decreases (U = U0/K).' },
            { cue: '"Work done in moving charge along equipotential surface"', think: 'Work done is exactly zero because ΔV = 0.' },
            { cue: '"Midpoint between equal and opposite charges"', think: 'Potential V is zero, but electric field E is non-zero and points towards the negative charge.' },
            { cue: '"Hollow metal shell of radius R and charge Q"', think: 'Inside field E = 0, but potential is constant and equal to surface value V = kQ/R.' }
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="font-mono text-[13px] font-bold text-cyan-400" dangerouslySetInnerHTML={{ __html: cue }} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">Immediately think...</p>
                <p className="font-mono text-[13px] text-white/70" dangerouslySetInnerHTML={{ __html: think }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMON MISTAKES & TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Energy stored sharing split">
            When connecting a charged capacitor C<sub>1</sub> to an uncharged capacitor C<sub>2</sub> in parallel, the total charge is conserved, but some electrostatic energy is lost as heat/electromagnetic radiation during charge redistribution: <code>&Delta;U<sub>loss</sub> = &frac12; &middot; (C<sub>1</sub>C<sub>2</sub> / (C<sub>1</sub>+C<sub>2</sub>)) &middot; V<sub>0</sub>&sup2;</code>.
          </TrapCard>
          <TrapCard title="Trap 2: Force between plate separation distance">
            Do not assume the force between capacitor plates changes when separation d is doubled under constant charge Q. The force <code>F = Q² / (2ε₀A)</code> is independent of separation distance d!
          </TrapCard>
          <TrapCard title="Trap 3: V = 0 center dipole field">
            The potential at the center of an electric dipole is zero, but the electric field is NOT zero. Remember that V is a scalar sum (potentials cancel), while E is a vector sum (fields add up pointing from + to -).
          </TrapCard>
        </div>
      </div>

      {/* 2-MINUTE REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/15">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-400" />
            <h3 className="text-emerald-400 font-display font-bold text-[14.5px] uppercase tracking-wider">
              2-Minute Revision Checklist
            </h3>
          </div>
          <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            {checkedItems.filter(Boolean).length} / 10 Completed
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            'Electric potential is a scalar V = kq/r; Potential energy is system property U = kq<sub>1</sub>q<sub>2</sub>/r',
            'Potential gradient: E = -dV/dr (E points towards decreasing V)',
            'Dipole potential axial V = kp/r&sup2;; equatorial V = 0',
            'Equipotential surface: work done is zero; E lines are perpendicular',
            'Conductors inside: E = 0, potential V is constant throughout volume',
            'Capacitance parallel plate: C = &epsilon;<sub>0</sub>A/d (increases by K with dielectric)',
            'Battery removed: Q is constant; Battery connected: V is constant',
            'Force between capacitor plates: F = Q&sup2;/(2&epsilon;<sub>0</sub>A) (independent of d)',
            'Series capacitance: 1/C<sub>eq</sub> = &Sigma;(1/C<sub>i</sub>); Parallel equivalent: C<sub>eq</sub> = &Sigma;C<sub>i</sub>',
            'Stored energy: U = &frac12;CV&sup2; = Q&sup2;/(2C); Energy density: u = &frac12;&epsilon;<sub>0</sub>E&sup2;'
          ].map((item, idx) => (
            <button
              key={item}
              onClick={() => {
                const next = [...checkedItems];
                next[idx] = !next[idx];
                setCheckedItems(next);
              }}
 className="w-full flex items-start text-left gap-2.5 text-[13px] text-white/70 py-1.5 border-b border-white/[0.04] last:border-0 hover:text-white transition-colors focus:outline-none"
            >
              <CheckCircle className={cn(
                "w-4 h-4 shrink-0 mt-0.5 transition-colors",
                checkedItems[idx] ? "text-emerald-400 fill-emerald-400/20" : "text-white/10"
              )} />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
