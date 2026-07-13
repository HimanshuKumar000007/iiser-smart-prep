import React, { useState } from 'react';
import {
  Star, AlertTriangle, CheckCircle,
  BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp,
  Square, CheckSquare
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: PHASOR DIAGRAMS FOR PURE ELEMENTS ────────────────────────────────
function PurePhasorsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Phasor Relationships for Pure R, L, C Elements</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pure R */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Pure Resistor (In Phase)</span>
          <svg viewBox="0 0 120 100" className="w-full" style={{ maxHeight: 90 }}>
            <line x1="15" y1="50" x2="105" y2="50" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="60" y1="10" x2="60" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            {/* Voltage & Current vectors */}
            <line x1="60" y1="50" x2="100" y2="50" stroke="#22d3ee" strokeWidth="2.2" />
            <polygon points="100,50 94,46 94,54" fill="#22d3ee" />
            <line x1="60" y1="50" x2="85" y2="50" stroke="#a78bfa" strokeWidth="1.8" />
            <polygon points="85,50 80,47 80,53" fill="#a78bfa" />
            <text x="104" y="46" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">V</text>
            <text x="88" y="46" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold">I</text>
            <text x="15" y="90" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace">φ = 0°</text>
          </svg>
        </div>
        {/* Pure L */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-rose-400 block text-center">Pure Inductor (V leads by 90°)</span>
          <svg viewBox="0 0 120 100" className="w-full" style={{ maxHeight: 90 }}>
            <line x1="15" y1="50" x2="105" y2="50" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="60" y1="10" x2="60" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            {/* Current vector (right) */}
            <line x1="60" y1="50" x2="95" y2="50" stroke="#a78bfa" strokeWidth="1.8" />
            <polygon points="95,50 89,47 89,53" fill="#a78bfa" />
            {/* Voltage vector (up) */}
            <line x1="60" y1="50" x2="60" y2="20" stroke="#22d3ee" strokeWidth="2.2" />
            <polygon points="60,20 56,26 64,26" fill="#22d3ee" />
            <text x="98" y="46" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold">I</text>
            <text x="64" y="26" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">V</text>
            {/* Angle arc */}
            <path d="M 75 50 A 15 15 0 0 0 60 35" fill="none" stroke="#fb923c" strokeWidth="1" />
            <text x="70" y="38" fill="#fb923c" fontSize="7" fontFamily="monospace">+90°</text>
          </svg>
        </div>
        {/* Pure C */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">Pure Capacitor (I leads by 90°)</span>
          <svg viewBox="0 0 120 100" className="w-full" style={{ maxHeight: 90 }}>
            <line x1="15" y1="50" x2="105" y2="50" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="60" y1="10" x2="60" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            {/* Voltage vector (right) */}
            <line x1="60" y1="50" x2="95" y2="50" stroke="#22d3ee" strokeWidth="1.8" />
            <polygon points="95,50 89,47 89,53" fill="#22d3ee" />
            {/* Current vector (up) */}
            <line x1="60" y1="50" x2="60" y2="20" stroke="#a78bfa" strokeWidth="2.2" />
            <polygon points="60,20 56,26 64,26" fill="#a78bfa" />
            <text x="98" y="46" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">V</text>
            <text x="64" y="26" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold">I</text>
            {/* Angle arc */}
            <path d="M 75 50 A 15 15 0 0 0 60 35" fill="none" stroke="#fb923c" strokeWidth="1" />
            <text x="70" y="38" fill="#fb923c" fontSize="7" fontFamily="monospace">+90°</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 2: SERIES LCR & IMPEDANCE TRIANGLE ──────────────────────────────────
function LCRTriangleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Series LCR Impedance Vector Addition (Phasor Triangle)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Schematic LCR */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 flex flex-col justify-center items-center">
 <span className="text-[10px] font-bold text-cyan-400 block text-center mb-2">Series Circuit Diagram</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Wires */}
            <path d="M 10 40 L 30 40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            {/* R (resistor) */}
            <path d="M 30 40 L 33 34 L 38 46 L 43 34 L 48 46 L 53 40" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="41" y="26" fill="#22d3ee" fontSize="8" fontFamily="monospace">R</text>
            {/* L (inductor) */}
            <path d="M 53 40 C 58 25, 63 25, 68 40 C 73 25, 78 25, 83 40 C 88 25, 93 25, 98 40" fill="none" stroke="#fb923c" strokeWidth="1.5" />
            <text x="75" y="26" fill="#fb923c" fontSize="8" fontFamily="monospace">XL</text>
            {/* C (capacitor) */}
            <line x1="98" y1="40" x2="110" y2="40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="110" y1="25" x2="110" y2="55" stroke="#a78bfa" strokeWidth="2" />
            <line x1="116" y1="25" x2="116" y2="55" stroke="#a78bfa" strokeWidth="2" />
            <line x1="116" y1="40" x2="150" y2="40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            <text x="113" y="21" fill="#a78bfa" fontSize="8" fontFamily="monospace">XC</text>
          </svg>
        </div>
        {/* Impedance Triangle */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-violet-400 block text-center">Impedance Triangle (XL &gt; XC)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 95 }}>
            {/* Base R */}
            <line x1="30" y1="80" x2="110" y2="80" stroke="#22d3ee" strokeWidth="2" />
            <text x="70" y="93" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle">Resistance R</text>
            {/* Height (XL - XC) */}
            <line x1="110" y1="80" x2="110" y2="20" stroke="#fb923c" strokeWidth="2" />
            <text x="115" y="54" fill="#fb923c" fontSize="8.5" fontFamily="monospace" dominantBaseline="central">XL − XC</text>
            {/* Hypotenuse Z */}
            <line x1="30" y1="80" x2="110" y2="20" stroke="#a78bfa" strokeWidth="2.5" />
            <text x="56" y="44" fill="#a78bfa" fontSize="9.5" fontFamily="monospace" fontWeight="bold">Impedance Z</text>
            {/* Phase Angle φ */}
            <path d="M 45 80 A 15 15 0 0 0 41 71" fill="none" stroke="#f87171" strokeWidth="1.2" />
            <text x="49" y="75" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">φ</text>
            <text x="5" y="16" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace">Z = √[R²+(XL-XC)²]</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 3: ELECTRICAL RESONANCE CURVE ───────────────────────────────────────
function ResonanceCurveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Resonant Curve (Current Amplitude vs Driving Frequency)</p>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 175 }}>
        {/* Axes */}
        <line x1="40" y1="15" x2="40" y2="155" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="40" y1="155" x2="310" y2="155" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <text x="300" y="168" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace">Frequency f</text>
        <text x="14" y="24" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace">Current I</text>

        {/* Resonant Frequency Reference */}
        <line x1="175" y1="155" x2="175" y2="35" stroke="#fb923c" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.5" />
        <text x="175" y="168" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">f₀ (Resonant)</text>

        {/* High Q Factor Curve (Sharp, Low R) */}
        <path d="M 40 150 C 90 148, 140 130, 160 80
                 C 168 60, 172 35, 175 35
                 C 178 35, 182 60, 190 80
                 C 210 130, 260 148, 310 150"
              fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <text x="210" y="55" fill="#22d3ee" fontSize="8" fontFamily="monospace">High Q (Sharp resonance)</text>

        {/* Low Q Factor Curve (Flat, High R) */}
        <path d="M 40 150 C 90 148, 130 115, 155 95
                 C 165 87, 172 80, 175 80
                 C 178 80, 185 87, 195 95
                 C 220 115, 260 148, 310 150"
              fill="none" stroke="#a78bfa" strokeWidth="1.8" />
        <text x="210" y="100" fill="#a78bfa" fontSize="8" fontFamily="monospace">Low Q (Flat resonance)</text>

        {/* Peak Current limit */}
        <circle cx="175" cy="35" r="3" fill="#22d3ee" />
        <text x="164" y="30" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="end"><i>I</i>_max = V / R</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: TRANSFORMER SCHEMATIC ────────────────────────────────────────────
function TransformerSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Ideal Transformer (Step-up / Step-down Principle)</p>
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 145 }}>
        {/* Core Block */}
        <rect x="100" y="25" width="140" height="100" rx="6" fill="none" stroke="#64748b" strokeWidth="8" />
        <rect x="120" y="45" width="100" height="60" rx="3" fill="#05060F" stroke="#64748b" strokeWidth="4" />
        <text x="170" y="78" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Laminated Iron Core</text>

        {/* Primary winding (left - Step Up: fewer turns) */}
        <path d="M 85 45 C 95 45, 105 45, 105 50
                 C 105 55, 95 55, 95 60
                 C 95 65, 105 65, 105 70
                 C 105 75, 95 75, 95 80
                 C 95 85, 105 85, 105 90
                 C 105 95, 85 95, 85 95" fill="none" stroke="#fb923c" strokeWidth="2" />
        <text x="65" y="74" fill="#fb923c" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Primary<br />(Np)</text>

        {/* Secondary winding (right - Step Up: more turns) */}
        <path d="M 255 40 C 245 40, 235 40, 235 44
                 C 235 48, 245 48, 245 52
                 C 245 56, 235 56, 235 60
                 C 235 64, 245 64, 245 68
                 C 245 72, 235 72, 235 76
                 C 235 80, 245 80, 245 84
                 C 245 88, 235 88, 235 92
                 C 235 96, 245 96, 245 100
                 C 245 104, 255 104, 255 104" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        <text x="275" y="74" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Secondary<br />(Ns &gt; Np)</text>

        {/* Step-up labels */}
        <text x="170" y="140" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Step-up: Vs &gt; Vp | Is &lt; Ip | k &gt; 1</text>
      </svg>
    </div>
  );
}

// ─── SVG 5: POWER FACTOR & IMPEDANCE TRIANGLE ────────────────────────────────
function PowerFactorSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Phasor Power Resolution (Wattless Current)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 135 }}>
        {/* Base line (Voltage vector) */}
        <line x1="50" y1="100" x2="280" y2="100" stroke="#22d3ee" strokeWidth="2.5" />
        <polygon points="280,100 272,96 272,104" fill="#22d3ee" />
        <text x="265" y="88" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold"><i>V</i>_rms</text>

        {/* Current Vector lagging by φ */}
        <line x1="50" y1="100" x2="220" y2="40" stroke="#a78bfa" strokeWidth="2.2" />
        <polygon points="220,40 210,41 214,49" fill="#a78bfa" />
        <text x="225" y="38" fill="#a78bfa" fontSize="10" fontFamily="monospace" fontWeight="bold"><i>I</i>_rms</text>

        {/* Angle arc */}
        <path d="M 85 100 A 35 35 0 0 0 79 88" fill="none" stroke="#f87171" strokeWidth="1.2" />
        <text x="92" y="93" fill="#f87171" fontSize="9.5" fontFamily="monospace">φ</text>

        {/* Component projections */}
        {/* Active component in phase with V */}
        <line x1="220" y1="40" x2="220" y2="100" stroke="#fb923c" strokeWidth="1" strokeDasharray="3,2" />
        {/* Horizontal segment from 50 to 220 */}
        <line x1="50" y1="105" x2="220" y2="105" stroke="#fb923c" strokeWidth="1.2" />
        <line x1="50" y1="102" x2="50" y2="108" stroke="#fb923c" strokeWidth="1.2" />
        <line x1="220" y1="102" x2="220" y2="108" stroke="#fb923c" strokeWidth="1.2" />
        <text x="135" y="118" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">Active component: I cosφ</text>

        {/* Wattless component 90 deg out of phase */}
        <text x="228" y="74" fill="#f87171" fontSize="8" fontFamily="monospace" dominantBaseline="central">Wattless: I sinφ (<i>P</i>_avg = 0)</text>
      </svg>
    </div>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[12px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 hover:border-white/15 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-white/45 font-mono">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <p className="font-mono text-cyan-300 font-bold text-[13px] sm:text-sm" dangerouslySetInnerHTML={{ __html: formula }} />
      <p className="text-white/80 text-[12px]"><strong className="text-white/40">Use:</strong> <span dangerouslySetInnerHTML={{ __html: use }} /></p>
      <p className="text-white/55 text-[12px]"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
    </div>
  );
}

function InsightCard({ title = 'Key Insight', children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">{title}</span>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-rose-500/5 border border-rose-500/15 overflow-hidden transition-all">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 p-4 text-left hover:bg-rose-500/5 transition-colors"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider flex-1">{title}</span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-rose-400/60 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-rose-400/60 shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
        </div>
      )}
    </div>
  );
}

// ─── SVG: INDUCTOR QUARTER-CYCLE ENERGY ──────────────────────────────────────
function InductorEnergyCycleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig A — Pure Inductor: Quarter-Cycle Magnetic Energy Exchange</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 115 }}>
        {/* Axes */}
        <line x1="30" y1="10" x2="30" y2="105" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="30" y1="60" x2="310" y2="60" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
        <text x="300" y="73" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">ωt</text>
        {/* Voltage curve (leads by 90°) */}
        <path d="M 30 60 C 55 10, 80 10, 100 60 C 120 110, 145 110, 165 60 C 185 10, 210 10, 230 60 C 250 110, 275 110, 295 60"
          fill="none" stroke="#22d3ee" strokeWidth="2" />
        <text x="32" y="20" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">v(t) — Voltage</text>
        {/* Current curve (lags voltage) */}
        <path d="M 30 10 C 50 10, 75 10, 100 60 C 125 110, 150 110, 175 60 C 200 10, 225 10, 250 60 C 275 110, 300 110, 295 60"
          fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="32" y="113" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold">i(t) — Current (lags 90°)</text>
        {/* Quarter labels */}
        <text x="52" y="80" fill="#4ade80" fontSize="7" fontFamily="monospace" textAnchor="middle">Q1: ↑B field</text>
        <text x="132" y="45" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Q2: ↓B field</text>
        <text x="210" y="80" fill="#4ade80" fontSize="7" fontFamily="monospace" textAnchor="middle">Q3: ↑B rev.</text>
        <text x="270" y="45" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Q4: ↓B rev.</text>
        {/* Period markers */}
        {[100, 175, 250].map(x => (
          <line key={x} x1={x} y1="57" x2={x} y2="63" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
        ))}
      </svg>
 <p className="text-[11px] text-white/50 leading-relaxed">
        Q1: Source energy builds magnetic field (P &gt; 0, energy stored). Q2: Field collapses, energy returned to source (P &lt; 0). Net over full cycle: <span className="text-cyan-400 font-bold">P_avg = 0</span>.
      </p>
    </div>
  );
}

// ─── SVG: CAPACITOR QUARTER-CYCLE ENERGY ─────────────────────────────────────
function CapacitorEnergyCycleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig B — Pure Capacitor: Quarter-Cycle Electric Energy Exchange</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 115 }}>
        {/* Axes */}
        <line x1="30" y1="10" x2="30" y2="105" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="30" y1="60" x2="310" y2="60" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
        <text x="300" y="73" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">ωt</text>
        {/* Voltage curve */}
        <path d="M 30 60 C 55 10, 80 10, 100 60 C 120 110, 145 110, 165 60 C 185 10, 210 10, 230 60 C 250 110, 275 110, 295 60"
          fill="none" stroke="#22d3ee" strokeWidth="2" />
        <text x="32" y="20" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">v(t) — Voltage</text>
        {/* Current curve (leads voltage by 90°) */}
        <path d="M 30 10 C 30 10, 55 10, 80 60 C 100 110, 125 110, 150 60 C 175 10, 200 10, 225 60 C 250 110, 270 110, 295 60"
          fill="none" stroke="#34d399" strokeWidth="2" />
        <text x="32" y="113" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">i(t) — Current (leads 90°)</text>
        {/* Quarter labels */}
        <text x="52" y="45" fill="#4ade80" fontSize="7" fontFamily="monospace" textAnchor="middle">Q1: Charging ↑</text>
        <text x="132" y="80" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Q2: Discharging ↓</text>
        <text x="210" y="45" fill="#4ade80" fontSize="7" fontFamily="monospace" textAnchor="middle">Q3: Chg. rev.</text>
        <text x="270" y="80" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Q4: Dischg.</text>
        {[100, 175, 250].map(x => (
          <line key={x} x1={x} y1="57" x2={x} y2="63" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
        ))}
      </svg>
 <p className="text-[11px] text-white/50 leading-relaxed">
        Q1: Current charges capacitor, electric field energy stored (P &gt; 0). Q2: Capacitor discharges back to source (P &lt; 0). Net over full cycle: <span className="text-emerald-400 font-bold">P_avg = 0</span>.
      </p>
    </div>
  );
}

// ─── SVG: TRANSFORMER TYPES (CORE vs SHELL) ──────────────────────────────────
function TransformerTypesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig C — Transformer Construction: Core-Type vs Shell-Type Winding</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Core-type */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-amber-400 block text-center">Core-Type</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 105 }}>
            {/* Outer rectangle core */}
            <rect x="20" y="15" width="120" height="80" rx="4" fill="none" stroke="#64748b" strokeWidth="7" />
            <rect x="38" y="33" width="84" height="44" rx="2" fill="#05060F" stroke="#64748b" strokeWidth="3" />
            {/* Primary winding (left limb) */}
            {[38, 46, 54, 62, 70].map((y, i) => (
              <ellipse key={i} cx="23" cy={y} rx="6" ry="4" fill="none" stroke="#fb923c" strokeWidth="1.5" />
            ))}
            <text x="5" y="100" fill="#fb923c" fontSize="7" fontFamily="monospace">Primary</text>
            {/* Secondary winding (right limb) */}
            {[38, 44, 50, 56, 62, 68, 74].map((y, i) => (
              <ellipse key={i} cx="137" cy={y} rx="6" ry="4" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            ))}
            <text x="115" y="100" fill="#22d3ee" fontSize="7" fontFamily="monospace">Secondary</text>
            <text x="60" y="60" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Iron Core</text>
          </svg>
 <p className="text-[9px] text-white/40 text-center">Windings on separate limbs. Better for HV.</p>
        </div>
        {/* Shell-type */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Shell-Type</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 105 }}>
            {/* Outer E-core shape */}
            <rect x="15" y="15" width="25" height="80" rx="3" fill="none" stroke="#64748b" strokeWidth="6" />
            <rect x="120" y="15" width="25" height="80" rx="3" fill="none" stroke="#64748b" strokeWidth="6" />
            <rect x="40" y="15" width="80" height="18" rx="2" fill="#64748b" />
            <rect x="40" y="77" width="80" height="18" rx="2" fill="#64748b" />
            <rect x="50" y="33" width="60" height="44" rx="2" fill="#05060F" />
            {/* Windings on center limb */}
            {[38, 46, 54].map((y, i) => (
              <ellipse key={i} cx="80" cy={y} rx="25" ry="4" fill="none" stroke="#fb923c" strokeWidth="1.5" />
            ))}
            {[62, 70].map((y, i) => (
              <ellipse key={i} cx="80" cy={y} rx="22" ry="4" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            ))}
            <text x="45" y="100" fill="#fb923c" fontSize="7" fontFamily="monospace">Pri.</text>
            <text x="75" y="100" fill="#22d3ee" fontSize="7" fontFamily="monospace">Sec.</text>
          </svg>
 <p className="text-[9px] text-white/40 text-center">Windings nested on center. Less flux leakage.</p>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AlternatingCurrentDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'rms' | 'reactance' | 'resonance'>('rms');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(14).fill(false));

  // Interactive Resonance Calculator States
  const [inductanceMh, setInductanceMh] = useState('10'); // 10 mH
  const [capacitanceUf, setCapacitanceUf] = useState('1');  // 1 uF
  const [resistanceOhm, setResistanceOhm] = useState('5');  // 5 Ohm

  const L = parseFloat(inductanceMh) * 1e-3;
  const C = parseFloat(capacitanceUf) * 1e-6;
  const R = parseFloat(resistanceOhm);

  const resonantFreqHz = 1 / (2 * Math.PI * Math.sqrt(L * C));
  const qualityFactor = R > 0 ? (1 / R) * Math.sqrt(L / C) : 0;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🔌</span>
              <Tag color="violet">Physics Unit 7</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Must Do</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-violet-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Alternating Current (AC)
            </h1>
            <p className="text-[12px] text-violet-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Trigonometry</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Reactance &amp; Impedance</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Phasors</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '1-2 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Hard (4.0/5)' },
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
              <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[12px] text-white/35 font-medium">
              {isCompleted ? 'Reading Completed — Quiz Unlocked! 🔓' : 'Scroll to complete the lesson and unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

      {/* WHAT YOU WILL LEARN */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-violet-400" />
            </div>
            <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">What You Will Learn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              "AC Waveforms: Peak (i₀), RMS (i₀/√2) and half-cycle average parameters",
              "Phasor concepts for purely Resistive, Inductive and Capacitive circuits",
              "ELI the ICE man mnemonic for remembering current lead/lag relationships",
              "Impedance Z calculation in series LCR circuits via vector addition",
              "Electrical resonance condition (XL = XC) and Q-factor sharpness metrics",
              "Active power factor (cos φ = R/Z) vs Wattless current components",
              "Ideal transformers: voltage/turns ratio conversions and efficiency losses"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: BASICS & RMS VALUES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">AC Waveforms &amp; RMS / Average Metrics</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Unlike DC, Alternating Current (AC) changes magnitude periodically and reverses direction. AC voltmeters and ammeters are designed to measure <strong>RMS values</strong>, which represent the equivalent DC heating capability.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="<i>I</i>_rms = <i>I</i>_0 / √2 ≈ 0.707 <i>I</i>_0"
            use="Root Mean Square current (effective value)"
            note="RMS value indicates the direct current that produces the identical thermal heat dissipation inside a load resistance."
            priority={5}
          />
          <FormulaCard
            formula="I_avg = 2 <i>I</i>_0 / π ≈ 0.637 <i>I</i>_0"
            use="Average current over a single positive half-cycle"
            note="Integration over a full complete cycle is strictly zero, as the positive and negative halves cancel exactly."
            priority={5}
          />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px] min-w-[360px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Parameter</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Mathematical Definition</th>
                <th className="text-left px-4 py-3 text-violet-400 font-bold uppercase">Sine Wave Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Peak Value', 'Amplitude of wave', '<i>I</i>_0 (or <i>V</i>_0)'],
                ['RMS Value', '√[ Average of i²(t) ]', '0.707 <i>I</i>_0 (shown by AC instruments)'],
                ['Half-Cycle Average', 'Integral over half period', '0.637 <i>I</i>_0'],
                ['Full-Cycle Average', 'Integral over full period', '0.000 (strictly zero)'],
              ].map(([param, def, val]) => (
                <tr key={param} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white/60 font-semibold">{param}</td>
                  <td className="px-4 py-2.5 text-cyan-300">{def}</td>
                  <td className="px-4 py-2.5 text-violet-300">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RMS Derivation Proof */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 RMS Mathematical Proof (First Principles)</span>
          <p className="text-white/70 leading-relaxed">
            For current <code>i(t) = <i>I</i>_0 sin(ωt)</code>, the mean-square value over a full period <code>T</code> is:
            <br />
            <code><i>I</i>_rms² = (^1&frasl;_T) &int;[0 to T] i²(t) dt = (<i>I</i>_0²/T) &int;[0 to T] sin²(ωt) dt</code>
          </p>
          <p className="text-white/55 leading-relaxed">
            Using the trigonometric identity <code>sin²(θ) = [1 − cos(2θ)]/2</code>:
            <br />
            <code><i>I</i>_rms² = (<i>I</i>_0²/2T) &int;[0 to T] [1 − cos(2ωt)] dt = (<i>I</i>_0²/2T) [ t − sin(2ωt)/2ω ]_0^T = <i>I</i>_0²/2</code>
            <br />
            Taking the square root gives: <code className="text-cyan-300 font-bold"><i>I</i>_rms = <i>I</i>_0 / &radic;2</code>.
          </p>
        </div>

        {/* Algebraic vs Phasor Addition & Pure R Power */}
        <div className="grid sm:grid-cols-2 gap-3">
 <div className="p-3.5 rounded-2xl bg-[#090b18] border border-amber-500/15 text-[12px] space-y-1.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">⚡ Voltage Addition Rule</span>
            <p className="text-white/70 leading-relaxed">
              <strong className="text-white">Instantaneous values:</strong> Add algebraically. <code>v(t) = v_R(t) + v_L(t) + v_C(t)</code><br />
              <strong className="text-white">Peak/RMS values:</strong> Cannot add directly — must add as phasor (vector) sums: <code className="text-amber-300">V = √(V_R² + (V_L − V_C)²)</code>.
            </p>
            <p className="text-white/50 text-[11px]">Common trap: V_R + V_L + V_C ≠ V_source for RMS values!</p>
          </div>
 <div className="p-3.5 rounded-2xl bg-[#090b18] border border-cyan-500/10 text-[12px] space-y-1.5">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🔌 Power in Pure Resistor</span>
            <p className="text-white/70 leading-relaxed">
              <code>p(t) = i²(t)R = I₀² sin²(ωt) R</code><br />
              This is <strong className="text-white">always positive</strong> (never negative), meaning energy is continuously dissipated as heat. Over one full cycle:<br />
              <code className="text-cyan-300 font-bold">P_avg = I_rms² R = V_rms²/R</code>
            </p>
          </div>
        </div>
      </div>

      {/* PART 2: PURE AC CIRCUITS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Pure AC Circuits &amp; Phasors</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          AC current responds differently to resistors, inductors, and capacitors. A phasor diagram represents current and voltage amplitudes as rotating vectors.
        </p>

        {/* NCERT Phasor Warning */}
 <div className="p-3.5 rounded-2xl bg-violet-500/5 border border-violet-500/20 text-[12px] space-y-1">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">⚠️ NCERT: What are Phasors?</span>
          <p className="text-white/75 leading-relaxed">
            Phasors are <strong className="text-violet-300">mathematical tools — rotating vectors in the complex plane</strong>, NOT physical vectors. They represent scalar quantities (voltage, current) so that addition of out-of-phase sinusoids becomes vector addition of arrows, greatly simplifying circuit analysis.
          </p>
          <p className="text-white/50 text-[11px]">A phasor rotates counterclockwise at angular velocity ω. Its projection onto the horizontal axis gives the instantaneous value of the quantity.</p>
        </div>

        <PurePhasorsSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="<i>X</i>_L = ω L = 2π f L"
            use="Inductive Reactance (opposition from Inductor L)"
            note="Measured in Ohms. Proportional to frequency. Blocks high-frequency AC, passes pure DC easily."
            priority={5}
          />
          <FormulaCard
            formula="<i>X</i>_C = 1 / (ω C) = 1 / (2π f C)"
            use="Capacitive Reactance (opposition from Capacitor C)"
            note="Measured in Ohms. Inversely proportional to frequency. Blocks DC entirely (f=0 → <i>X</i>_C=∞)."
            priority={5}
          />
        </div>

        {/* Phase Relationship Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px] min-w-[360px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Element</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Phase Angle φ</th>
                <th className="text-left px-4 py-3 text-violet-400 font-bold uppercase">Phase Lead / Lag</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pure Resistor (R)', '0° (0 rad)', 'Current and Voltage are in phase'],
                ['Pure Inductor (L)', '90° (π/2 rad)', 'Voltage LEADS Current by 90° (current lags)'],
                ['Pure Capacitor (C)', '90° (π/2 rad)', 'Current LEADS Voltage by 90° (voltage lags)'],
              ].map(([elem, phase, desc]) => (
                <tr key={elem} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white/60 font-semibold">{elem}</td>
                  <td className="px-4 py-2.5 text-cyan-300">{phase}</td>
                  <td className="px-4 py-2.5 text-violet-300">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reactance Derivations from First Principles */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">⚡ Deriving Reactances from AC Equations</span>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Inductive Reactance (XL)</strong>
              <p className="text-white/75 leading-relaxed">
                Let current be <code>i = <i>I</i>_0 sin(ωt)</code>. The voltage across inductor is:
                <br />
                <code>v = L (di/dt) = L (d/dt)[<i>I</i>_0 sin(ωt)]</code>
                <br />
                <code>v = L <i>I</i>_0 ω cos(ωt) = (ωL <i>I</i>_0) sin(ωt + π/2)</code>
              </p>
              <p className="text-white/55 leading-relaxed">
                Comparing to Ohm's Law: <code><i>V</i>_0 = <i>I</i>_0 XL</code>.
                <br />
                Thus, <code className="text-rose-300">XL = ωL</code>, and phase leads current by <code>π/2</code>.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Capacitive Reactance (XC)</strong>
              <p className="text-white/75 leading-relaxed">
                Let voltage be <code>v = <i>V</i>_0 sin(ωt)</code>. The charge on capacitor is:
                <br />
                <code>q = C v = C <i>V</i>_0 sin(ωt)</code>
                <br />
                <code>i = dq/dt = ω C <i>V</i>_0 cos(ωt) = (<i>V</i>_0 / [1/ωC]) sin(ωt + π/2)</code>
              </p>
              <p className="text-white/55 leading-relaxed">
                Comparing to Ohm's Law: <code><i>I</i>_0 = <i>V</i>_0 / XC</code>.
                <br />
                Thus, <code className="text-emerald-300">XC = 1/(ωC)</code>, and current leads voltage by <code>π/2</code>.
              </p>
            </div>
          </div>
        </div>

        {/* ELI the ICE man mnemonic */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-cyan-500/10 text-[12px] space-y-1">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">💡 Famous Mnemonic: ELI the ICE man</span>
          <p className="text-white/70">
            &bull; <strong className="text-rose-400">ELI</strong>: Voltage (<strong>E</strong>) leads Current (<strong>I</strong>) inside an Inductor (<strong>L</strong>).
            <br />&bull; <strong className="text-emerald-400">ICE</strong>: Current (<strong>I</strong>) leads Voltage (<strong>E</strong>) inside a Capacitor (<strong>C</strong>).
          </p>
        </div>

        {/* Peak Current Formulas */}
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="<i>i</i>_m = <i>v</i>_m / <i>X</i>_L"
            use="Peak current through a pure inductor"
            note="The ratio of peak voltage to inductive reactance. Since XL = ωL, higher frequency → higher XL → lower peak current."
            priority={5}
          />
          <FormulaCard
            formula="<i>i</i>_m = <i>v</i>_m / <i>X</i>_C"
            use="Peak current through a pure capacitor"
            note="The ratio of peak voltage to capacitive reactance. Since XC = 1/ωC, higher frequency → lower XC → higher peak current."
            priority={5}
          />
        </div>

        {/* Quarter-Cycle Energy Exchange Diagrams */}
        <InductorEnergyCycleSVG />
        <CapacitorEnergyCycleSVG />
      </div>

      {/* PART 3: SERIES LCR & RESONANCE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Series LCR Circuit &amp; Resonance</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          In a series LCR loop, opposition parameters cannot be added algebraically. Since inductor and capacitor phase vectors point in opposite directions, their reactances subtract vectorially.
        </p>
        <LCRTriangleSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="Z = √[ R² + (<i>X</i>_L − <i>X</i>_C)² ]"
            use="Total Impedance Z of a series LCR loop"
            note="Represents combined opposition. If <i>X</i>_L = <i>X</i>_C, Z reduces to its minimum value R."
            priority={5}
          />
          <FormulaCard
            formula="tan φ = (<i>X</i>_L − <i>X</i>_C) / R"
            use="Phase difference φ between circuit current and voltage"
            note="If <i>X</i>_L > <i>X</i>_C, φ is positive (inductive circuit). If <i>X</i>_L < <i>X</i>_C, φ is negative (capacitive)."
            priority={5}
          />
        </div>

        {/* General Current Expression & Element Voltages */}
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⚡ General Solution for Series LCR</span>
          <p className="text-white/75 leading-relaxed">
            The general current in a series LCR circuit driven by <code>v = V_m sin(ωt)</code> is:<br />
            <code className="text-cyan-300 font-bold">i = i_m sin(ωt + φ)</code><br />
            where <code>i_m = V_m / Z</code> and <code>φ = tan⁻¹[(X_L − X_C) / R]</code>.
          </p>
          <p className="text-white/60 leading-relaxed">
            <strong className="text-white">Voltages across elements (RMS):</strong><br />
            <code>V_R = IR</code>&nbsp;&nbsp;&nbsp;<code className="text-rose-300">V_L = IX_L</code>&nbsp;&nbsp;&nbsp;<code className="text-emerald-300">V_C = IX_C</code><br />
            These are RMS values. Note: <code>V_L</code> and <code>V_C</code> are 180° out of phase with each other.
          </p>
        </div>

        {/* Voltage Addition Paradox (NCERT Example 7.6) */}
 <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">🔍 NCERT Example 7.6: Voltage Addition Paradox</span>
          <p className="text-white/75 leading-relaxed">
            In a series RC circuit: V_rms = 10 V, V_R = 6 V, V_C = 8 V.<br />
            <strong className="text-rose-400">Algebraic sum:</strong> <code>V_R + V_C = 6 + 8 = 14 V ≠ 10 V</code> — seems to violate Kirchhoff's laws!
          </p>
          <p className="text-white/60 leading-relaxed">
            <strong className="text-emerald-400">Resolution:</strong> V_R and V_C are 90° out of phase. Add as phasors:<br />
            <code className="text-amber-300 font-bold">V_source = √(V_R² + V_C²) = √(36 + 64) = √100 = 10 V ✓</code><br />
            Kirchhoff's laws always hold for instantaneous values, not RMS values of out-of-phase quantities.
          </p>
        </div>
        <ResonanceCurveSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="f₀ = 1 / [ 2π √(LC) ]"
            use="Resonant Frequency (when <i>X</i>_L = <i>X</i>_C)"
            note="Impedance Z = R is minimum, and loop current reaches its absolute maximum peak <i>I</i>_max = V / R."
            priority={5}
          />
          <FormulaCard
            formula="Q = ω₀ L / R = (1/R) √(L / C) = 1 / (ω₀ C R)"
            use="Quality Factor (Q) measuring resonance sharpness"
            note="Three equivalent forms! Use Q = ω₀L/R for inductive circuits, Q = 1/ω₀CR for capacitive circuits. Higher Q implies a sharper peak and narrow bandwidth."
            priority={5}
          />
        </div>

        {/* Bandwidth and Series vs Parallel Resonance */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">📈 Bandwidth &amp; Resonance Classifications</span>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Bandwidth &amp; Selectivity</strong>
              <p className="text-white/75 leading-relaxed">
                The bandwidth is the frequency interval <code>Δω = ω₂ − ω₁</code> where power drops to half of maximum (current drops to <code><i>I</i>_max / &radic;2</code>).
                <br />
                Formula: <code className="text-cyan-300 font-bold">Δω = R / L</code>
              </p>
              <p className="text-white/55 leading-relaxed">
                Quality Factor is: <code>Q = ω₀ / Δω = ω₀L / R</code>.
                <br />
                Higher Q factor means narrower bandwidth and sharper resonance (Fig 3).
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Series vs Parallel Resonance</strong>
              <p className="text-white/75 leading-relaxed">
                <strong>Series LCR:</strong> Minimum impedance <code>Z = R</code>, maximum current. Acts as an <em>acceptor circuit</em> at <code>f₀</code>.
                <br />
                <strong>Parallel LCR (Anti-resonance):</strong> Maximum impedance <code>Z &rarr; &infin;</code> (ideal), minimum current. Acts as a <em>rejector circuit</em> at <code>f₀</code>.
              </p>
            </div>
          </div>
        </div>

        {/* LC Oscillations Analogy */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-violet-500/10 space-y-3 text-[12px]">
          <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">🌀 LC Oscillations — Mechanical SHM Analogy</span>
          <p className="text-white/70 leading-relaxed">
            When a charged capacitor <code>C</code> is connected to an inductor <code>L</code>, charge oscillates back and forth at frequency:
            <code className="text-cyan-300 font-bold ml-1.5">ω = 1 / √(LC)</code>
          </p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full min-w-[280px] text-[12px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left py-1.5 px-2 text-cyan-400">Spring-Mass SHM</th>
                  <th className="text-left py-1.5 px-2 text-violet-400">LC Oscillations</th>
                  <th className="text-left py-1.5 px-2 text-white/40">Analogue Role</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Mass (m)', 'Inductance (L)', 'Inertia opposing change'],
                  ['Spring constant (k)', 'Reciprocal Capacitance (1/C)', 'Stiffness / restoring action'],
                  ['Displacement (x)', 'Charge on Capacitor (q)', 'Field coordinate'],
                  ['Velocity (v = dx/dt)', 'Current (I = dq/dt)', 'Rate of change'],
                  ['Potential Energy (½ kx²)', 'Capacitor Energy (q²/2C)', 'Electrostatic field storage'],
                  ['Kinetic Energy (½ mv²)', 'Inductor Energy (½ LI²)', 'Magnetic field storage'],
                ].map(([shm, lc, role]) => (
                  <tr key={shm} className="border-b border-white/5 last:border-0">
                    <td className="py-1.5 px-2 text-cyan-300">{shm}</td>
                    <td className="py-1.5 px-2 text-violet-300">{lc}</td>
                    <td className="py-1.5 px-2 text-white/40">{role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/55 text-[12px] leading-relaxed mt-1">
            &bull; <strong className="text-white">Total Energy:</strong> <code>U = q²/2C + ½ LI² = Constant</code> (in ideal L-C circuit).
            <br />&bull; At <code>q = q_max</code>, all energy is electrostatic. At <code>I = <i>I</i>_max</code>, all energy is magnetic.
          </p>
        </div>
      </div>

      {/* PART 4: POWER IN AC CIRCUITS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Power in AC Circuits &amp; Wattless Current</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Ideal inductors and capacitors consume zero net power over a full cycle because current and voltage are exactly 90° out of phase.
        </p>
        <PowerFactorSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="<i>P</i>_avg = <i>V</i>_rms <i>I</i>_rms cos φ"
            use="Average active power consumed in an AC loop"
            note="cos φ = R / Z is the Power Factor. For a purely resistive circuit, cos φ = 1."
            priority={5}
          />
          <FormulaCard
            formula="<i>I</i>_wattless = <i>I</i>_rms sin φ"
            use="Wattless current component (consumes zero power)"
            note="Current component perpendicular to voltage. Does not contribute to real power dissipation."
            priority={5}
          />
        </div>
        <InsightCard title="Wattless Current Concept">
          Since active power is <code>P = V I cos φ</code>, resolving the current phasor along the voltage gives <code>I cos φ</code> (active) and perpendicular <code>I sin φ</code> (reactive/wattless). The wattless current does work storing energy in electric/magnetic fields, but yields zero average heating over a cycle.
        </InsightCard>

        {/* Instantaneous Power Derivation */}
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Instantaneous Power Derivation (First Principles)</span>
          <p className="text-white/75 leading-relaxed">
            Let <code>v = V_m sin(ωt)</code> and <code>i = I_m sin(ωt + φ)</code>. Instantaneous power is:<br />
            <code>p = vi = V_m I_m sin(ωt) sin(ωt + φ)</code>
          </p>
          <p className="text-white/60 leading-relaxed">
            Using product-to-sum: <code>sin A sin B = ½[cos(A−B) − cos(A+B)]</code>:<br />
            <code>p = (V_m I_m / 2)[cos φ − cos(2ωt + φ)]</code><br />
            Integrating over one complete cycle, the <code>cos(2ωt + φ)</code> term vanishes (averages to zero):<br />
            <code className="text-cyan-300 font-bold">P_avg = (V_m I_m / 2) cos φ = V_rms I_rms cos φ</code>
          </p>
        </div>

        {/* Power at Resonance */}
 <div className="p-4 rounded-2xl bg-[#090b18] border border-emerald-500/10 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">⚡ Power at Resonance</span>
          <p className="text-white/75 leading-relaxed">
            At resonance (<code>X_L = X_C</code>): <code>Z = R</code>, <code>φ = 0</code>, <code>cos φ = 1</code>.<br />
            Therefore, the power factor is maximum (= 1), and power dissipation is maximum:<br />
            <code className="text-emerald-300 font-bold">P_max = V_rms² / R = I_rms² R</code><br />
            <span className="text-white/50">This is also the maximum possible power for the given source and resistor.</span>
          </p>
        </div>

        {/* Power Factor Improvement (NCERT Example 7.7) */}
 <div className="p-4 rounded-2xl bg-[#090b18] border border-violet-500/10 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">🔌 Power Factor Improvement (NCERT Example 7.7)</span>
          <p className="text-white/75 leading-relaxed">
            Industrial loads (motors, furnaces) are often highly inductive, causing current to lag voltage (φ large, cos φ small). This wastes energy as <strong className="text-white">wattless (reactive) current</strong> flows through transmission lines, creating <code>I²R</code> heating losses without doing useful work.
          </p>
          <p className="text-white/60 leading-relaxed">
            <strong className="text-white">Fix:</strong> Connect a capacitor in <em>parallel</em> with the load. The capacitor's leading current partially cancels the inductor's lagging current, <strong className="text-violet-300">reducing the net reactive component</strong>.<br />
            Result: <code className="text-violet-300 font-bold">φ decreases → cos φ increases → I_line decreases → I²R losses fall</code>.
          </p>
          <p className="text-white/50 text-[11px]">Industrial utility companies charge penalties for low power factor since it increases line current without increasing billable power output.</p>
        </div>

        {/* Choke Coil & Pure L/C Energy Exchange */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">🔌 Choke Coils &amp; Zero Power Energy Cycles</span>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. The Choke Coil (with Iron Core)</strong>
              <p className="text-white/75 leading-relaxed">
                A choke coil is a high-inductance (<code>L</code>) and near-zero resistance (<code>R</code>) coil used to control current in AC circuits.
              </p>
              <p className="text-white/55 leading-relaxed">
                Since <code>cos φ = R / Z ≈ 0</code>, the power factor is near-zero. It restricts AC current flow effectively without wasting energy as heat, unlike a rheostat/resistor.<br />
                <strong className="text-white">With iron core:</strong> Inserting the core increases L, reducing current (bulb dims). Removing the core reduces L, increasing current (bulb brightens).
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Why L/C Average Power is Zero</strong>
              <p className="text-white/75 leading-relaxed">
                In the first quarter-cycle, the source builds up a field (electric in C, magnetic in L) storing energy. In the next quarter-cycle, the field collapses and returns all energy to the source.
              </p>
              <p className="text-white/55 leading-relaxed">
                Integrating <code>P(t) = v(t) i(t) &prop; sin(2ωt)</code> over a full cycle gives exactly zero net energy consumption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 5: TRANSFORMERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Transformers — Step-up / Step-down</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Transformers transfer AC power between circuits using mutual induction, stepping voltage up or down while keeping frequency constant.
        </p>
        <TransformerSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="<i>V</i>_s / <i>V</i>_p = <i>N</i>_s / <i>N</i>_p = <i>I</i>_p / <i>I</i>_s = k"
            use="Voltage, turns, and current ratios in transformer"
            note="k is the transformation ratio. Step-up: k > 1 (voltage increases, current decreases to conserve power)."
            priority={5}
          />
          <FormulaCard
            formula="η = (<i>P</i>_out / <i>P</i>_in) * 100%"
            use="Transformer efficiency calculation"
            note="Ideal transformer: η = 100%. Real transformers have copper, iron, hysteresis, and flux losses."
            priority={5}
          />
        </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-1.5">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">🔌 Four Key Transformer Energy Losses</span>
          <ul className="text-white/70 space-y-1">
            <li>&bull; <strong className="text-white">Copper Loss (I²R):</strong> Heat loss in windings. Minimised by using thick copper wires.</li>
            <li>&bull; <strong className="text-white">Iron Loss (Eddy currents):</strong> Induced loops in the core. Minimised by using laminated iron sheets.</li>
            <li>&bull; <strong className="text-white">Hysteresis Loss:</strong> Energy spent magnetising/demagnetising core. Minimised by soft iron.</li>
            <li>&bull; <strong className="text-white">Flux Leakage:</strong> Secondary does not link all primary flux. Minimised by shell-type winding.</li>
          </ul>
        </div>

        {/* Ideal Transformer Assumptions */}
 <div className="p-4 rounded-2xl bg-[#090b18] border border-cyan-500/10 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">✅ Ideal Transformer Assumptions</span>
          <ul className="text-white/70 space-y-1.5">
            <li>• <strong className="text-white">Zero winding resistance:</strong> Primary and secondary coils have negligible ohmic resistance (no I²R loss).</li>
            <li>• <strong className="text-white">No flux leakage:</strong> All magnetic flux from primary threads through secondary (flux coupling = 100%).</li>
            <li>• <strong className="text-white">No core losses:</strong> Iron core has zero hysteresis and eddy current losses.</li>
            <li>• <strong className="text-white">No-load approximation:</strong> With secondary open-circuit, primary current is negligible, so <code>V_p ≈ −e_p</code> (back-EMF equals supply).</li>
          </ul>
        </div>

        {/* Why DC Fails in Transformers */}
 <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">⚠️ Why Transformers Cannot Work with DC</span>
          <p className="text-white/75 leading-relaxed">
            A transformer relies on <strong className="text-white">electromagnetic induction</strong>, which requires a <em>changing</em> magnetic flux to induce EMF. With DC input:
          </p>
          <ul className="text-white/60 space-y-1">
            <li>• Constant DC voltage → constant current → <strong className="text-white">static (constant) magnetic flux</strong>.</li>
            <li>• By Faraday's Law: <code>e = −N dΦ/dt</code>. If <code>dΦ/dt = 0</code>, then <code>e = 0</code> (zero induced EMF in secondary).</li>
            <li>• Result: <span className="text-rose-400 font-bold">No output voltage at secondary. Transformer is completely non-functional with DC.</span></li>
          </ul>
        </div>

        {/* Transformer Construction Types */}
        <TransformerTypesSVG />

        {/* Power Transmission Application */}
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">🌐 Power Transmission Applications</span>
          <p className="text-white/75 leading-relaxed">
            <strong className="text-white">At power station:</strong> Step-up transformer raises voltage (e.g., 11 kV → 132 kV), reducing current by same ratio.<br />
            <strong className="text-white">Transmission line:</strong> Low current reduces <code>I²R</code> heating losses in long cables dramatically.<br />
            <strong className="text-white">At consumer end:</strong> Step-down transformer lowers voltage to safe levels (132 kV → 220 V).
          </p>
          <p className="text-white/50 text-[11px]">
            Power loss = <code>I²R = (P/V)²R</code>. Doubling voltage → 4× reduction in line losses!
          </p>
        </div>
      </div>

      {/* PART 6: INTERACTIVE RESONANCE CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-violet-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-violet-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">LCR Resonant Frequency Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Enter values for L, C, and R to calculate the resonant frequency <code>f₀ = 1 / [2π √(LC)]</code> and Quality Factor <code>Q = (1/R) √(L/C)</code>.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Inductance L (mH):</label>
            <input
              type="number"
              value={inductanceMh}
              onChange={e => setInductanceMh(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-violet-500/40"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Capacitance C (μF):</label>
            <input
              type="number"
              value={capacitanceUf}
              onChange={e => setCapacitanceUf(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-violet-500/40"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Resistance R (Ω):</label>
            <input
              type="number"
              value={resistanceOhm}
              onChange={e => setResistanceOhm(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-violet-500/40"
            />
          </div>
        </div>
 <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center">
          <div className="flex flex-col justify-center border-r border-white/5">
            <span className="text-[12px] uppercase font-bold text-white/35">Resonant Frequency f₀</span>
            <span className="text-[21px] font-bold text-cyan-400 my-1">
              {!isNaN(resonantFreqHz) ? `${resonantFreqHz.toFixed(1)} Hz` : 'Error'}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[12px] uppercase font-bold text-white/35">Quality Factor Q</span>
            <span className="text-[21px] font-bold text-violet-400 my-1">
              {!isNaN(qualityFactor) ? qualityFactor.toFixed(2) : 'Error'}
            </span>
          </div>
        </div>
      </div>

      {/* PART 7: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1: Resonance */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: LCR Resonance Parameters</span>
          <p className="text-white/80">A series LCR circuit has L = 2.0 H, C = 32 μF, and R = 10 Ω. Find: (a) resonant frequency ω₀, (b) Quality Factor Q.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>Resonant frequency: <code>ω₀ = 1 / √(L C) = 1 / √[2.0 * (32 * 10⁻⁶)] = 1 / √[64 * 10⁻⁶] = 1 / [8 * 10⁻³] = 125 rad/s</code>.</p>
            <p>Quality Factor: <code>Q = ω₀ L / R = (125 * 2.0) / 10 = 25</code>.</p>
            <p className="text-cyan-300 font-bold">ω₀ = 125 rad/s (approx 19.9 Hz) | Q = 25 (highly selective)</p>
          </div>
        </div>

        {/* Example 2: Transformer */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Transformer Efficiency &amp; Power</span>
          <p className="text-white/80">A step-down transformer has a primary-to-secondary turns ratio of 20:1. The input voltage is 2200 V, and input power is 11 kW. If the efficiency is 90%, calculate the output voltage and secondary current.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Output voltage: <code>Vs = Vp * (Ns / Np) = 2200 * (1/20) = 110 V</code>.</p>
            <p>2. Efficiency η = 90% → <code><i>P</i>_out = η * <i>P</i>_in = 0.9 * 11000 W = 9900 W</code>.</p>
            <p>3. Secondary current: <code>Is = <i>P</i>_out / Vs = 9900 / 110 = 90 A</code>.</p>
            <p className="text-cyan-300 font-bold">Vs = 110 V | Is = 90 A (Output current increases as voltage drops)</p>
          </div>
        </div>

        {/* Example 3: Power factor */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Average Power in LCR Loop</span>
          <p className="text-white/80">A series LCR circuit has impedance Z = 100 Ω and resistance R = 50 Ω. If connected to a source of <i>V</i>_rms = 200 V, calculate the average power dissipated.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Current: <code><i>I</i>_rms = <i>V</i>_rms / Z = 200 / 100 = 2.0 A</code>.</p>
            <p>2. Power factor: <code>cos φ = R / Z = 50 / 100 = 0.5</code>.</p>
            <p>3. Power: <code><i>P</i>_avg = <i>V</i>_rms <i>I</i>_rms cos φ = 200 * 2.0 * 0.5 = 200 W</code>.</p>
            <p className="text-cyan-300 font-bold">Power consumed = 200 Watts</p>
          </div>
        </div>
      </div>

      {/* FORMULA DECISION TREE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-violet-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-violet-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'rms', label: '🔌 RMS vs Peak' },
            { id: 'reactance', label: '🌀 Reactance & Impedance' },
            { id: 'resonance', label: '⚙️ Resonance Limits' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSelectedGoal(btn.id as any)}
              className={cn(
'px-3 py-1.5 rounded-xl border text-[13px] font-bold transition-all',
                selectedGoal === btn.id
                  ? 'bg-violet-500/20 text-violet-300 border-violet-500/40 shadow-[0_0_12px_rgba(167,139,250,0.15)]'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white/80 hover:bg-white/[0.04]'
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 text-[13px] space-y-2">
          {selectedGoal === 'rms' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Convert between peak and RMS values</span>
              <p className="text-white/70">1. Wave peak to RMS: <code><i>V</i>_rms = <i>V</i>_0 / √2 ≈ 0.707 <i>V</i>_0</code>.</p>
              <p className="text-white/70">2. Household voltage (220 V) is always the RMS value. Its peak is <code><i>V</i>_0 = 220 √2 ≈ 311 V</code>.</p>
            </>
          )}
          {selectedGoal === 'reactance' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Calculate reactances XL, XC or Z</span>
              <p className="text-white/70">1. Inductive reactance: <code>XL = ω L = 2π f L</code>.</p>
              <p className="text-white/70">2. Capacitive reactance: <code>XC = 1 / ω C = 1 / (2π f C)</code>.</p>
              <p className="text-white/70">3. Total Impedance Z: <code>Z = √[ R² + (XL − XC)² ]</code>.</p>
            </>
          )}
          {selectedGoal === 'resonance' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: LCR resonance calculations</span>
              <p className="text-white/70">1. Resonance frequency: <code>f₀ = 1 / [ 2π √(LC) ]</code>.</p>
              <p className="text-white/70">2. Quality factor: <code>Q = (1/R) √(L/C)</code>.</p>
              <p className="text-white/70">3. At resonance: <code>Z = R</code>, <code><i>I</i>_max = V / R</code>, <code>cos φ = 1</code>.</p>
            </>
          )}
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-violet-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"RMS voltage is 220V, find peak voltage"', think: "Peak is 220 √2 ≈ 311V. Household specs are always RMS." },
            { cue: '"Transformer turns ratio step-up"', think: "Ns > Np, voltage steps up, current steps down to conserve power." },
            { cue: '"At resonant frequency of LCR circuit"', think: "XL = XC. Impedance is minimum (Z = R), and current is maximum." },
            { cue: '"Wattless current value"', think: "Current component perpendicular to voltage: <i>I</i>_wattless = <i>I</i>_rms sin φ." },
            { cue: '"Power factor of purely L or C circuit"', think: "Phase shift is 90° -> cos 90° = 0. Average power dissipated is zero." },
            { cue: '"Inductor reactance in DC circuit"', think: "DC frequency is zero (f=0) -> XL = 0 (zero reactance, acts as short wire)." },
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="text-[13px] font-mono text-violet-400" dangerouslySetInnerHTML={{ __html: cue }} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">Immediately think...</p>
                <p className="text-[13px] text-white/70 font-mono" dangerouslySetInnerHTML={{ __html: think }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMON TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Using RMS Instead of Peak Value for Max Force">
            If a question asks for the maximum force on a wire or dielectric breakdown, you must use the peak value <code><i>V</i>_0 = <i>V</i>_rms √2</code>. AC specs default to RMS values.
          </TrapCard>
          <TrapCard title="Trap 2: Assuming Transformers Work with DC">
            Transformers require a changing magnetic flux to operate via mutual induction. Connecting a DC battery (constant voltage) to a transformer's primary coil yields zero output voltage at the secondary.
          </TrapCard>
          <TrapCard title="Trap 3: Resonance means XL = XC, NOT XL + XC">
            Resonance is the cancellation of reactive components (impedance components are 180° out of phase) so <code>XL − XC = 0 ⟹ XL = XC</code>. Adding them yields a common error.
          </TrapCard>
          <TrapCard title="Trap 4: Reactance vs Impedance Units">
            Both reactance (XL, XC) and impedance (Z) are measured in Ohms (Ω). However, Z combines resistance R and reactance vectorially, not algebraically.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-violet-500/5 border border-violet-500/15">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-violet-400" />
 <h3 className="text-violet-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
          </div>
 <span className="text-[12px] text-violet-400/70">
            {checkedItems.filter(Boolean).length}/{checkedItems.length} done
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "RMS current: <i>I</i>_rms = <i>I</i>_0 / √2. Instruments read RMS",
            "Average over full cycle = 0; over half cycle = 2<i>I</i>_0/π",
            "Phasors are math tools (rotating complex vectors), NOT physical vectors",
            "ELI the ICE man: L phase lead V before I; C leads I before V",
            "Peak current: i_m = v_m/X_L (inductor), i_m = v_m/X_C (capacitor)",
            "Reactances: XL = ωL, XC = 1/ωC",
            "Impedance: Z = √[ R² + (XL − XC)² ]",
            "Resonance: XL = XC ⟹ Z = R (min), I = V/R (max)",
            "Resonant frequency: f₀ = 1 / [ 2π √(LC) ]",
            "Quality Factor Q = ω₀L/R = (1/R)√(L/C) = 1/(ω₀CR)",
            "Average power: <i>P</i>_avg = <i>V</i>_rms <i>I</i>_rms cos φ; P_max = V²/R at resonance",
            "Wattless current component: <i>I</i>_rms sin φ (P = 0)",
            "Transformer: Vs/Vp = Ns/Np = Ip/Is = k. DC input → zero output",
            "Step-up has k > 1; steps voltage up, current down. Shell-type reduces flux leakage"
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCheckedItems(prev => {
                const next = [...prev];
                next[idx] = !next[idx];
                return next;
              })}
              className={`flex items-start gap-2 text-[13px] py-1 border-b border-white/[0.04] last:border-0 text-left w-full transition-colors ${checkedItems[idx] ? 'text-violet-300' : 'text-white/70'}`}
            >
              {checkedItems[idx]
                ? <CheckSquare className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                : <Square className="w-3.5 h-3.5 text-white/25 shrink-0 mt-0.5" />
              }
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
