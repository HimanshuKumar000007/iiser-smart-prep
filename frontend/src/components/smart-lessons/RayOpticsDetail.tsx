import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: CONCAVE MIRROR IMAGE FORMATION ────────────────────────────────────
function ConcaveMirrorSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Concave Mirror: Real, Inverted Image (Object beyond C)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Principal Axis */}
        <line x1="20" y1="70" x2="320" y2="70" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />
        
        {/* Curved Mirror Surface */}
        <path d="M 280 20 A 100 100 0 0 0 280 120" fill="none" stroke="#64748b" strokeWidth="3" />
        {/* Silvering representation */}
        <path d="M 282 23 L 287 20 M 283 38 L 288 35 M 284 53 L 289 50 M 284 68 L 289 65 M 284 83 L 289 80 M 283 98 L 288 95 M 282 113 L 287 110" stroke="#64748b" strokeWidth="1" strokeOpacity="0.4" />

        {/* Center of Curvature, Focus, Pole */}
        <circle cx="100" cy="70" r="3" fill="#fb923c" />
        <text x="100" y="83" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">C</text>
        <circle cx="190" cy="70" r="3" fill="#fb923c" />
        <text x="190" y="83" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">F</text>
        <text x="290" y="78" fill="#ffffff" fillOpacity="0.6" fontSize="8" fontFamily="monospace">P (Pole)</text>

        {/* Object (beyond C) */}
        <line x1="50" y1="70" x2="50" y2="35" stroke="#22d3ee" strokeWidth="2.5" />
        <polygon points="50,35 46,42 54,42" fill="#22d3ee" />
        <text x="50" y="28" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Object</text>

        {/* Parallel Ray -> Focus */}
        <path d="M 50 35 L 280 35 L 190 70 L 140 89" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
        <polygon points="175,35 168,31 168,39" fill="#a78bfa" />
        
        {/* Ray passing through C -> returns along same path */}
        <path d="M 50 35 L 140 89 L 280 105" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M 50 35 L 100 70 L 140 89" fill="none" stroke="#34d399" strokeWidth="1.2" />
        
        {/* Image (between C & F, real, inverted) */}
        <line x1="140" y1="70" x2="140" y2="89" stroke="#f87171" strokeWidth="2" />
        <polygon points="140,89 136,82 144,82" fill="#f87171" />
        <text x="140" y="101" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">Image (Real)</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: TOTAL INTERNAL REFLECTION & OPTICAL FIBER ─────────────────────────
function TotalInternalReflectionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Total Internal Reflection inside an Optical Fiber</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <defs>
          {/* Core Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Gradients */}
          <linearGradient id="core-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="cladding-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Cladding top & bottom backgrounds */}
        <rect x="20" y="20" width="300" height="25" fill="url(#cladding-grad)" />
        <rect x="20" y="75" width="300" height="25" fill="url(#cladding-grad)" />

        {/* Central Core background */}
        <rect x="20" y="45" width="300" height="30" fill="url(#core-grad)" />

        {/* Fiber outer boundary */}
        <rect x="20" y="20" width="300" height="80" fill="none" stroke="#334155" strokeWidth="1.8" rx="2" />

        {/* Core-cladding boundaries (dashed interfaces) */}
        <line x1="20" y1="45" x2="320" y2="45" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
        <line x1="20" y1="75" x2="320" y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />

        {/* Normals at reflection points */}
        <line x1="75" y1="30" x2="75" y2="90" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.5" />
        <line x1="155" y1="30" x2="155" y2="90" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.5" />
        <line x1="235" y1="30" x2="235" y2="90" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.5" />
        <line x1="315" y1="30" x2="315" y2="90" stroke="#64748b" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.5" />

        {/* Normal lines labels */}
        <text x="75" y="27" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="middle" opacity="0.7">Normal</text>

        {/* Angle of incidence arc at first bounce */}
        <path d="M 75 55 A 10 10 0 0 1 65.6 48.5" fill="none" stroke="#f43f5e" strokeWidth="1" />
        <text x="68" y="58" fill="#f43f5e" fontSize="7.5" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">θ</text>

        {/* Neon Light Ray Beam (Multiple TIRs) */}
        {/* Glow layer */}
        <path d="M 10 73 L 20 60 L 75 45 L 155 75 L 235 45 L 315 75 L 320 72 L 330 75" 
              fill="none" stroke="#22d3ee" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.18" />
        {/* Main beam layer */}
        <path d="M 10 73 L 20 60 L 75 45 L 155 75 L 235 45 L 315 75 L 320 72 L 330 75" 
              fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Center bright core layer */}
        <path d="M 10 73 L 20 60 L 75 45 L 155 75 L 235 45 L 315 75 L 320 72 L 330 75" 
              fill="none" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

        {/* Reflection point highlight circles (glowing dots) */}
        <circle cx="75" cy="45" r="2.8" fill="#f43f5e" filter="url(#glow)" />
        <circle cx="155" cy="75" r="2.8" fill="#f43f5e" filter="url(#glow)" />
        <circle cx="235" cy="45" r="2.8" fill="#f43f5e" filter="url(#glow)" />
        <circle cx="315" cy="75" r="2.8" fill="#f43f5e" filter="url(#glow)" />

        {/* Ray direction arrows */}
        <polygon points="46,55 49,48 41,51" fill="#22d3ee" />
        <polygon points="121,62 115,59 119,66" fill="#22d3ee" />
        <polygon points="201,57 204,50 196,53" fill="#22d3ee" />

        {/* Text Annotations (properly using tspan for subscripts instead of HTML tags) */}
        <text x="170" y="35" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
          Cladding (n<tspan fontSize="6.5" baselineShift="sub">clad</tspan> = 1.42)
        </text>
        <text x="170" y="63" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          Core (n<tspan fontSize="6.5" baselineShift="sub">core</tspan> = 1.52 &gt; n<tspan fontSize="6.5" baselineShift="sub">clad</tspan>)
        </text>
        
        {/* Critical Angle TIR text */}
        <text x="110" y="53" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" fontWeight="bold">θ &gt; C (TIR)</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: REFRACTION THROUGH CONVEX LENS ────────────────────────────────────
function ConvexLensSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Convex Lens: Real Image Formation</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Axis */}
        <line x1="20" y1="70" x2="320" y2="70" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />

        {/* Convex Lens Body */}
        <path d="M 170 20 A 100 100 0 0 0 170 120 A 100 100 0 0 0 170 20" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.8" />
        <line x1="170" y1="20" x2="170" y2="120" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3,3" strokeOpacity="0.4" />
        <text x="170" y="14" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Convex Lens</text>

        {/* Focus points */}
        <circle cx="110" cy="70" r="3" fill="#fb923c" />
        <text x="110" y="82" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">F₁</text>
        <circle cx="230" cy="70" r="3" fill="#fb923c" />
        <text x="230" y="82" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">F₂</text>

        {/* Object (beyond 2F₁) */}
        <line x1="50" y1="70" x2="50" y2="30" stroke="#22d3ee" strokeWidth="2.5" />
        <polygon points="50,30 46,37 54,37" fill="#22d3ee" />
        <text x="50" y="23" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Object</text>

        {/* Ray parallel to axis -> goes through Focus F₂ */}
        <path d="M 50 30 L 170 30 L 230 70 L 290 110" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
        <polygon points="120,30 113,26 113,34" fill="#a78bfa" />

        {/* Ray through optical center -> goes straight */}
        <path d="M 50 30 L 170 70 L 290 110" fill="none" stroke="#34d399" strokeWidth="1.2" />
        <polygon points="120,53 115,50 118,57" fill="#34d399" />

        {/* Image (Real, Inverted) */}
        <line x1="290" y1="70" x2="290" y2="110" stroke="#f87171" strokeWidth="2.2" />
        <polygon points="290,110 286,103 294,103" fill="#f87171" />
        <text x="290" y="122" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">Image (Real)</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: PRISM DISPERSION ──────────────────────────────────────────────────
function PrismDispersionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Refraction and Dispersion through a Prism</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Triangular Prism */}
        <polygon points="170,20 100,110 240,110" fill="none" stroke="#64748b" strokeWidth="2.5" />
        <text x="170" y="15" fill="#ffffff" fillOpacity="0.8" fontSize="9.5" fontFamily="monospace" textAnchor="middle">A (Prism Angle)</text>

        {/* Incident White Ray */}
        <line x1="30" y1="90" x2="120" y2="80" stroke="#ffffff" strokeWidth="2" />
        <polygon points="80,84 74,80 77,88" fill="#ffffff" />
        <text x="35" y="82" fill="#ffffff" fontSize="8" fontFamily="monospace">White Light</text>

        {/* Deviation inside prism (divergence begins) */}
        {/* Red beam */}
        <line x1="120" y1="80" x2="200" y2="85" stroke="#f87171" strokeWidth="1.2" />
        {/* Violet beam */}
        <line x1="120" y1="80" x2="198" y2="92" stroke="#c084fc" strokeWidth="1.2" />

        {/* Refracted emerging spectrum */}
        {/* Red path */}
        <path d="M 200 85 L 290 105" fill="none" stroke="#f87171" strokeWidth="1.5" />
        <text x="295" y="108" fill="#f87171" fontSize="8" fontFamily="monospace">Red (Least bent)</text>
        {/* Violet path */}
        <path d="M 198 92 L 285 125" fill="none" stroke="#c084fc" strokeWidth="1.5" />
        <text x="290" y="128" fill="#c084fc" fontSize="8" fontFamily="monospace">Violet (Most bent)</text>

        {/* Spectrum filling */}
        <polygon points="120,80 200,85 198,92" fill="#a78bfa" fillOpacity="0.08" />
        <polygon points="200,85 290,105 285,125 198,92" fill="#a78bfa" fillOpacity="0.08" />
      </svg>
    </div>
  );
}

// ─── SVG 5: TELESCOPE SCHEMATIC ──────────────────────────────────────────────
function TelescopeSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Astronomical Telescope (Normal Adjustment: Infinity)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Principal Axis */}
        <line x1="10" y1="70" x2="330" y2="70" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.25" />

        {/* Objective Lens (Large, left) */}
        <path d="M 80 20 A 150 150 0 0 0 80 120 A 150 150 0 0 0 80 20" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2" />
        <text x="80" y="14" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">Objective (fo)</text>

        {/* Eyepiece Lens (Small, right) */}
        <path d="M 260 40 A 60 60 0 0 0 260 100 A 60 60 0 0 0 260 40" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="260" y="32" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">Eyepiece (fe)</text>

        {/* Rays from infinity */}
        <path d="M 15 35 L 80 50 L 190 85 L 260 70 L 320 57" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <path d="M 15 70 L 80 70 L 190 85 L 260 70 L 320 57" fill="none" stroke="#a78bfa" strokeWidth="1" />

        {/* Focus pointer (Intermediate image) */}
        <line x1="190" y1="70" x2="190" y2="85" stroke="#f87171" strokeWidth="1.5" />
        <circle cx="190" cy="85" r="1.5" fill="#f87171" />
        <text x="190" y="62" fill="#fb923c" fontSize="7.5" fontFamily="monospace" textAnchor="middle">fo + fe</text>

        {/* Tube length indicator */}
        <line x1="80" y1="125" x2="260" y2="125" stroke="#34d399" strokeWidth="1" strokeDasharray="3,2" />
        <text x="170" y="136" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">Tube Length L = fo + fe</text>
      </svg>
    </div>
  );
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

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function InsightCard({ title = "Key Concept", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">{title}</span>
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
            <p className="font-mono text-cyan-400 text-[14.5px] font-bold mt-0.5" dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
      </div>
      {open && (
        <p className="text-white/55 text-[13px] leading-relaxed mt-3 pt-3 border-t border-white/5">{detail}</p>
      )}
    </button>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function RayOpticsDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'mirror' | 'lens' | 'prism' | 'instrument'>('mirror');

  // Interactive Lens Maker States
  const [refractiveIndex, setRefractiveIndex] = useState('1.5');
  const [radiusR1, setRadiusR1] = useState('20');
  const [radiusR2, setRadiusR2] = useState('-20');

  const n = parseFloat(refractiveIndex);
  const r1 = parseFloat(radiusR1);
  const r2 = parseFloat(radiusR2);

  const oneOverF = (n - 1) * ((1 / r1) - (1 / r2));
  const focalLengthResult = 1 / oneOverF;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🔍</span>
              <Tag color="cyan">Physics Unit 9</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Hot Topic</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Ray Optics and Optical Instruments
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Trigonometry</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Sign Conventions</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">High School Geometry</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Hard (4.2/5)' },
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
              <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 rounded-full"
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
            <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">What You Will Learn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              "Spherical mirrors: Mirror formula & magnification tables",
              "Refraction at boundaries, Snell's Law and absolute index relations",
              "Total Internal Reflection: critical angle condition and optical fibers",
              "Lens Maker's equation and equivalent power of lens combinations",
              "Refraction through a prism: deviation, dispersion and minimum deviation",
              "Optical instruments: Simple/Compound microscopes and astronomical telescopes"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: SPHERICAL MIRRORS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Reflection &amp; Spherical Mirrors</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Spherical mirrors reflect light and form images based on their curvature. Concave mirrors converge rays (real or virtual images), whereas convex mirrors always diverge rays to form virtual, diminished, upright images.
        </p>
        <ConcaveMirrorSVG />

        {/* LAWS OF REFLECTION & GEOMETRY RELATION */}
        <div className="grid sm:grid-cols-2 gap-3">
 <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 text-[12px] space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📜 Laws of Reflection</span>
            <ul className="text-white/70 space-y-1.5 list-inside list-disc">
              <li>The angle of incidence equals the angle of reflection: <code>∠i = ∠r</code>.</li>
              <li>The incident ray, reflected ray, and the normal to the reflecting surface at the point of incidence all lie in the same plane.</li>
              <li>For spherical mirrors, the normal at any point always passes through the <strong>Center of Curvature (C)</strong>.</li>
            </ul>
          </div>

 <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 text-[12px] space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Focal Length &amp; Curvature Radius: f = R/2</span>
            <p className="text-white/75 leading-relaxed">
              For a spherical mirror of small aperture, the focal length is exactly half of its radius of curvature:
              <code className="text-cyan-300 block my-1">f = R / 2</code>
              <strong>Derivation Outline:</strong> Consider a paraxial ray parallel to the principal axis hitting the mirror at point M. The normal is the radius CM. By geometry, <code>∠M<sub>CP</sub> = ∠M<sub>CF</sub> = i</code>. Triangle MCF is isosceles (since ∠FMC = ∠MCF), yielding <code>CF = FF' ≈ FP = f</code>. Since <code>CP = R = CF + FP = 2f</code>, we get <code>f = R/2</code>.
            </p>
          </div>
        </div>

        {/* CARTESIAN SIGN CONVENTION */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2.5">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Cartesian Sign Convention Rules</span>
          <div className="grid sm:grid-cols-2 gap-3 text-white/70 leading-relaxed text-[11px]">
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              &bull; <strong>Origin:</strong> All distances are measured from the <strong>Pole (P)</strong> of the mirror.
              <br />
              &bull; <strong>Incidence Direction:</strong> Distances measured in the direction of the incident light are taken as <strong>positive</strong> (+); distances measured against it are <strong>negative</strong> (-).
            </div>
            <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
              &bull; <strong>Principal Axis Y-Axis:</strong> Distances measured perpendicular to and above the principal axis are <strong>positive</strong> (+). Distances below it are <strong>negative</strong> (-).
              <br />
              &bull; <strong>Consequence:</strong> Object distance <code>u</code> is always negative. Concave focal length <code>f &lt; 0</code>. Convex focal length <code>f &gt; 0</code>.
            </div>
          </div>
        </div>

        {/* MIRROR FORMULA & MAGNIFICATION CARDS */}
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="1/v + 1/u = 1/f = 2/R"
            use="Mirror formula relating object, image and curvature radius"
            note="Cartesian sign convention: u is negative (left). Concave: f < 0. Convex: f > 0."
            priority={5}
          />
          <FormulaCard
            formula="m = h<sub>i</sub> / h<sub>o</sub> = −v / u"
            use="Magnification factor of mirror image"
            note="|m| > 1: enlarged image. m < 0: real & inverted. m > 0: virtual & erect."
            priority={5}
          />
        </div>

        {/* USES OF SPHERICAL MIRRORS */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🚗 Practical Uses of Spherical Mirrors</span>
          <div className="grid sm:grid-cols-2 gap-3 text-white/70 text-[11.5px] leading-relaxed">
            <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
              <strong className="text-white block mb-0.5">&bull; Concave Mirror Uses:</strong>
              Used in shaving and makeup mirrors (produces enlarged virtual image when close), dentist mirrors, car headlights and searchlights (produces a parallel beam when light source is at F), and solar furnaces (concentrates solar rays).
            </div>
            <div className="bg-black/20 p-2.5 rounded-lg border border-white/5">
              <strong className="text-white block mb-0.5">&bull; Convex Mirror Uses:</strong>
              Used as rear-view mirrors in automobiles (gives a wide field of view and forms upright, diminished images of traffic behind), and in shop security mirrors to observe large areas at once.
            </div>
          </div>
        </div>

        {/* IMAGE FORMATION TABLES */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Concave Mirror Image Formation Table */}
          <div className="space-y-2">
 <span className="text-[11.5px] font-bold text-cyan-400 block">📊 Concave Mirror Image Positions</span>
            <div className="overflow-x-auto rounded-xl border border-white/8">
 <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/8 text-white/55 text-left">
                    <th className="px-2.5 py-2">Object</th>
                    <th className="px-2.5 py-2">Image</th>
                    <th className="px-2.5 py-2">Size/Nature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['At ∞', 'At F', 'Point / Real & Inv'],
                    ['Beyond C', 'Between F & C', 'Diminished / Real & Inv'],
                    ['At C', 'At C', 'Same / Real & Inv'],
                    ['Between C & F', 'Beyond C', 'Enlarged / Real & Inv'],
                    ['At F', 'At ∞', 'Highly Enl / Real & Inv'],
                    ['Between F & P', 'Behind mirror', 'Enlarged / Virt & Erect'],
                  ].map(([obj, img, sizeNat]) => (
                    <tr key={obj} className="border-b border-white/5 last:border-0 text-white/70">
                      <td className="px-2.5 py-2 font-semibold text-cyan-300">{obj}</td>
                      <td className="px-2.5 py-2 text-white/80">{img}</td>
                      <td className="px-2.5 py-2 text-amber-300">{sizeNat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Convex Mirror Image Formation Table */}
          <div className="space-y-2">
 <span className="text-[11.5px] font-bold text-violet-400 block">📊 Convex Mirror Image Positions</span>
            <div className="overflow-x-auto rounded-xl border border-white/8">
 <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/8 text-white/55 text-left">
                    <th className="px-2.5 py-2">Object Position</th>
                    <th className="px-2.5 py-2">Image Position</th>
                    <th className="px-2.5 py-2">Size/Nature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['At Infinity', 'At Focus F behind mirror', 'Highly diminished, point size / Virtual & Erect'],
                    ['Between ∞ & Pole P', 'Between P & F behind mirror', 'Diminished / Virtual & Erect']
                  ].map(([obj, img, sizeNat]) => (
                    <tr key={obj} className="border-b border-white/5 last:border-0 text-white/70">
                      <td className="px-2.5 py-2 font-semibold text-violet-300">{obj}</td>
                      <td className="px-2.5 py-2 text-white/80">{img}</td>
                      <td className="px-2.5 py-2 text-amber-300">{sizeNat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: REFRACTION & TIR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Refraction &amp; Total Internal Reflection (TIR)</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Refraction is the bending of a light beam transitioning between media with different optical speeds. If passing from a denser to a rarer medium at an incident angle exceeding the critical angle <code>C</code>, the beam cannot escape and undergoes <strong>Total Internal Reflection</strong>.
        </p>
        <TotalInternalReflectionSVG />

        {/* LAWS OF REFRACTION & REAR CONCEPTS */}
 <div className="grid sm:grid-cols-2 gap-3 text-[12px]">
          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📜 Laws of Refraction</span>
            <ul className="text-white/70 space-y-1.5 list-inside list-disc">
              <li>The incident ray, the refracted ray, and the normal to the interface at the point of incidence all lie in the same plane.</li>
              <li><strong>Snell's Law:</strong> The ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media: <code>sin(i) / sin(r) = n₂₁ = n₂ / n₁</code>.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Apparent Depth &amp; Lateral Shift</span>
            <ul className="text-white/70 space-y-1.5 list-inside list-disc">
              <li><strong>Apparent Depth:</strong> When viewed vertically from a rarer medium, an object in a denser medium appears closer:
                <code className="text-cyan-300 block my-0.5">Apparent Depth = Real Depth / n</code>
                Shift is: <code>d = Real Depth * (1 − 1/n)</code>.
              </li>
              <li><strong>Lateral Shift (t):</strong> For a glass slab of thickness <code>t</code>:
                <code className="text-cyan-300 block my-0.5">Shift = t * sin(i − r) / cos(r)</code>
              </li>
            </ul>
          </div>
        </div>

        {/* MULTIPLE MEDIA REFRACTION */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⛓️ Refraction Through Multiple Parallel Media</span>
          <p className="text-white/70 leading-relaxed text-[11px]">
            For multiple parallel layers of media (e.g. Air → Water → Glass → Air):
            <code className="text-cyan-300 block my-1">₁n₂ * ₂n₃ * ₃n₁ = 1   →   ₂n₃ = ₁n₃ / ₁n₂ = n₃ / n₂</code>
            This shows that the product of successive relative refractive indices for a closed loop of interfaces is always 1.
          </p>
        </div>

        {/* FORMULAS */}
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="n₁ sin(i) = n₂ sin(r)"
            use="Snell's Law of refraction at boundary"
            note="Refractive index n = c/v. Relative index n₂₁ = n₂/n₁ = v₁/v₂ = λ₁/λ₂. Frequency remains invariant."
            priority={5}
          />
          <FormulaCard
            formula="sin(C) = n<sub>rare</sub> / n<sub>dense</sub> = 1 / n"
            use="Critical Angle (C) boundary condition"
            note="For glass-to-air transition: sin(C) = 1/n. If incident angle i > C, TIR occurs."
            priority={5}
          />
        </div>

        {/* TIR APPLICATIONS */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">💡 TIR Applications &amp; Optical fiber detail</span>
          {[
            {
              emoji: '🌐',
              title: 'Optical Fibers: Core-Cladding & Applications',
              formula: 'n<sub>core</sub> > n<sub>cladding</sub>  |  sin(C) = n<sub>cladding</sub> / n<sub>core</sub>',
              detail: 'Structure: Consists of a central core of high refractive index glass/plastic surrounded by a cladding of slightly lower index. Applications: Used for high-speed telecommunications (transmits light signals with zero attenuation over miles), medical endoscopes (transmitting images of internal organs), and optical sensors.'
            },
            {
              emoji: '💎',
              title: 'Brilliance of Diamond',
              formula: 'C<sub>diamond</sub> ≈ 24.4° (n ≈ 2.42)',
              detail: 'Because diamond has a very high refractive index (2.42), its critical angle in air is very small (24.4°). Diamond cutters cut faces at precise angles so that light entering the diamond undergoes multiple total internal reflections before exiting, making it sparkle brilliantly.'
            },
            {
              emoji: '📐',
              title: 'Prism as a Reflector (TIR Devs)',
              formula: 'i = 45° > C<sub>glass</sub> ≈ 42°',
              detail: 'Right-angled isosceles prisms (90°-45°-45°) can bend light by 90° or 180° by using total internal reflection (since 45° exceeds the critical angle of glass 42°). Unlike silvered mirrors, TIR reflections are 100% efficient without absorption losses, widely used in periscopes and binoculars.'
            },
            {
              emoji: '🏜️',
              title: 'Mirage Formation',
              formula: 'dn/dy > 0 (n increases with height)',
              detail: 'Hot air near the ground is less dense and has a lower refractive index. Light rays from the sky bend upward via progressive refraction and TIR, creating inverted virtual images that mimic water surfaces.'
            }
          ].map(c => <RevealCard key={c.title} {...c} />)}
        </div>
      </div>

      {/* PART 3: REFRACTION AT LENSES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Refraction at Spherical Surfaces &amp; Lenses</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A lens utilizes two curved refracting surfaces. The Lens Maker's Formula calculates the focal length based on curvature radii, which can then be combined with the Thin Lens equation to locate images.
        </p>
        <ConvexLensSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="n₂/v − n₁/u = (n₂ − n₁)/R"
            use="Refraction at a single spherical surface of radius R"
            note="n₁ is the starting medium, n₂ is the final medium. u and v are measured from the vertex."
            priority={5}
          />
          <FormulaCard
            formula="1/f = (n<sub>rel</sub> − 1) (1/R₁ − 1/R₂)"
            use="Lens Maker's Formula for thin lenses"
            note="n<sub>rel</sub> = n<sub>lens</sub> / n<sub>surrounding</sub>. For convex lens: R₁ > 0, R₂ < 0. For concave lens: R₁ < 0, R₂ > 0."
            priority={5}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="1/v − 1/u = 1/f"
            use="Thin Lens Formula relating object, image and focus"
            note="Note the negative sign (-). u is negative. f is positive for convex, negative for concave."
            priority={5}
          />
          <FormulaCard
            formula="m = v / u  |  m<sub>axial</sub> = m² = (v / u)²"
            use="Linear and Longitudinal/Axial magnification for lenses"
            note="Linear magnification m > 0 for virtual/erect, m < 0 for real/inverted. Axial magnification describes enlargement along the principal axis."
            priority={5}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="P = 1 / f (in meters)  [Unit: Diopter (D = m⁻¹)]"
            use="Optical Power of a lens"
            note="Convex lens has positive power (converging). Concave lens has negative power (diverging). 1 Diopter is the power of a lens of focal length 1 meter."
            priority={5}
          />
          <FormulaCard
            formula="P<sub>eq</sub> = P₁ + P₂  |  1/f<sub>eq</sub> = 1/f₁ + 1/f₂"
            use="Equivalent power of thin lenses in contact"
            note="Lenses separated by distance d have equivalent power: P<sub>eq</sub> = P₁ + P₂ − d P₁ P₂."
            priority={5}
          />
        </div>

        {/* IMAGE FORMATION TABLES FOR LENSES */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Convex Lens Image Formation Table */}
          <div className="space-y-2">
 <span className="text-[11.5px] font-bold text-cyan-400 block">📊 Convex Lens Image Positions</span>
            <div className="overflow-x-auto rounded-xl border border-white/8">
 <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/8 text-white/55 text-left">
                    <th className="px-2.5 py-2">Object Position</th>
                    <th className="px-2.5 py-2">Image Position</th>
                    <th className="px-2.5 py-2">Size/Nature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['At Infinity', 'At Focus F₂', 'Point / Real & Inv'],
                    ['Beyond 2F₁', 'Between F₂ & 2F₂', 'Diminished / Real & Inv'],
                    ['At 2F₁', 'At 2F₂', 'Same / Real & Inv'],
                    ['Between F₁ & 2F₁', 'Beyond 2F₂', 'Enlarged / Real & Inv'],
                    ['At F₁', 'At Infinity', 'Highly Enl / Real & Inv'],
                    ['Between F₁ & Optical C', 'On same side', 'Enlarged / Virt & Erect'],
                  ].map(([obj, img, sizeNat]) => (
                    <tr key={obj} className="border-b border-white/5 last:border-0 text-white/70">
                      <td className="px-2.5 py-2 font-semibold text-cyan-300">{obj}</td>
                      <td className="px-2.5 py-2 text-white/80">{img}</td>
                      <td className="px-2.5 py-2 text-amber-300">{sizeNat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Concave Lens Image Formation Table */}
          <div className="space-y-2">
 <span className="text-[11.5px] font-bold text-violet-400 block">📊 Concave Lens Image Positions</span>
            <div className="overflow-x-auto rounded-xl border border-white/8">
 <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/8 text-white/55 text-left">
                    <th className="px-2.5 py-2">Object Position</th>
                    <th className="px-2.5 py-2">Image Position</th>
                    <th className="px-2.5 py-2">Size/Nature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['At Infinity', 'At Focus F₁', 'Highly diminished, point size / Virtual & Erect'],
                    ['Between ∞ & Optical C', 'Between C & F₁ on object side', 'Diminished / Virtual & Erect']
                  ].map(([obj, img, sizeNat]) => (
                    <tr key={obj} className="border-b border-white/5 last:border-0 text-white/70">
                      <td className="px-2.5 py-2 font-semibold text-violet-300">{obj}</td>
                      <td className="px-2.5 py-2 text-white/80">{img}</td>
                      <td className="px-2.5 py-2 text-amber-300">{sizeNat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4: REFRACTION THROUGH A PRISM */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Refraction &amp; Dispersion through a Prism</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A prism deflects light by angle <code>δ</code>. Because different wavelengths travel at different speeds in glass, white light splits into its component colors (dispersion).
        </p>
        <PrismDispersionSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="A + δ = i + e"
            use="Prism angle, deviation, incidence and emergence relation"
            note="Valid for all incidence angles. A = r₁ + r₂ relates internal refraction angles."
            priority={5}
          />
          <FormulaCard
            formula="n = sin((A + δ<sub>m</sub>)/2) / sin(A/2)"
            use="Prism formula at minimum deviation condition (δ<sub>m</sub>)"
            note="At minimum deviation: i = e and r₁ = r₂ = A/2. Used to find prism refractive index."
            priority={5}
          />
        </div>
        <InsightCard title="Dispersion and Rainbows">
          Refractive index n varies inversely with wavelength (Cauchy's equation: <code>n = a + b / λ²</code>). Since violet has the shortest wavelength, it experiences the highest index, deviating the most. Red has the longest wavelength and deviates the least.
          <br /><br />
          &bull; <strong>Angular Dispersion (θ):</strong> The difference in deviation between violet and red rays:
          <code className="text-cyan-300 block my-1">θ = δ<sub>v</sub> − δ<sub>r</sub> = (n<sub>v</sub> − n<sub>r</sub>) A  (for thin prisms)</code>
          &bull; <strong>Dispersive Power (ω):</strong> The ratio of angular dispersion to the mean deviation (of yellow light):
          <code className="text-cyan-300 block my-1">ω = (n<sub>v</sub> − n<sub>r</sub>) / (n<sub>y</sub> − 1) = θ / δ<sub>mean</sub></code>
          &bull; <strong>Primary vs Secondary Rainbows:</strong>
          <div className="bg-black/35 p-3 rounded-xl border border-white/5 my-2 text-[11px] space-y-1.5">
            <div>
              <strong className="text-cyan-300">1. Primary Rainbow:</strong> Forms via <strong>two refractions and one internal reflection</strong> inside water droplets. Red is on the outer ring (at 42°) and violet on the inner ring (at 40°). Very intense.
            </div>
            <div>
              <strong className="text-violet-300">2. Secondary Rainbow:</strong> Forms via <strong>two refractions and two internal reflections</strong> inside droplets. Color order is reversed (violet on outer ring at 53°, red on inner at 50°). Fainter due to double reflection losses.
            </div>
          </div>
        </InsightCard>
      </div>

      {/* PART 5: OPTICAL INSTRUMENTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Optical Instruments &amp; The Human Eye</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Optical instruments utilize lenses and mirrors to enhance visual perception. While microscopes magnify close details, telescopes resolve distant angular sizes. The human eye acts as a biological lens system.
        </p>
        <TelescopeSVG />

        {/* THE HUMAN EYE & DEFECTS OF VISION */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">👁️ The Human Eye &amp; Defects of Vision</span>
          <p className="text-white/70 leading-relaxed text-[11px]">
            The eye focuses light via the cornea and a crystalline lens onto the <strong>retina</strong>. Ciliary muscles adjust the lens curvature to change focal length—this ability is called the <strong>Power of Accommodation</strong>.
          </p>
          <div className="grid sm:grid-cols-4 gap-3 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-cyan-300 block mb-0.5">Myopia (Nearsightedness)</strong>
              Nearby objects are clear, distant objects are blurry. Image forms *in front* of the retina due to long eyeball or excessive curvature. <strong>Correction:</strong> Concave (diverging) lens (focal length <code>f = −d<sub>far</sub></code>).
            </div>
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-cyan-300 block mb-0.5">Hypermetropia (Farsightedness)</strong>
              Distant objects are clear, close objects are blurry. Near point shifts beyond 25 cm. Image forms *behind* the retina. <strong>Correction:</strong> Convex (converging) lens.
            </div>
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-cyan-300 block mb-0.5">Presbyopia</strong>
              Age-related loss of power of accommodation as ciliary muscles weaken. The near point recedes. <strong>Correction:</strong> Bifocal lenses (upper concave for distance, lower convex for reading).
            </div>
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-cyan-300 block mb-0.5">Astigmatism</strong>
              Cornea is not perfectly spherical (curved differently in vertical vs horizontal planes), causing blurred focus in some directions. <strong>Correction:</strong> Cylindrical lenses.
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP IMAGE FORMATION IN INSTRUMENTS */}
 <div className="grid sm:grid-cols-2 gap-3 text-[12px]">
          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-1.5">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🔬 Compound Microscope Progression</span>
            <p className="text-white/60 text-[11px] leading-relaxed">
              1. <strong>Objective Lens</strong> (short focal length <code>f<sub>o</sub></code>, small aperture) forms a real, inverted, magnified intermediate image of the close object near the focal point of the eyepiece.<br />
              2. <strong>Eyepiece Lens</strong> (larger focal length <code>f<sub>e</sub></code>) acts as a simple magnifier, forming a final highly magnified virtual image at the near point (D) or infinity.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-1.5">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🔭 Refracting Telescope Progression</span>
            <p className="text-white/60 text-[11px] leading-relaxed">
              1. <strong>Objective Lens</strong> (large focal length <code>f<sub>o</sub></code>, large aperture to gather light) forms a real, inverted intermediate image of a distant object at its second focal point <code>f<sub>o</sub></code>.<br />
              2. <strong>Eyepiece Lens</strong> (short focal length <code>f<sub>e</sub></code>) magnifies this intermediate image, projecting the final virtual image to infinity (normal adjustment) or the near point.
            </p>
          </div>
        </div>

        {/* MICROSCOPE & TELESCOPE FORMULAS */}
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="M = 1 + D/f  |  M = D/f"
            use="Simple Microscope (Single convex lens magnification)"
            note="M = 1 + D/f is for final image at near point D (25 cm). M = D/f is for final image at infinity (relaxed eye)."
            priority={5}
          />
          <FormulaCard
            formula="M = (L / f<sub>o</sub>) (1 + D / f<sub>e</sub>)"
            use="Compound Microscope magnification (near point)"
            note="L is the tube length. f<sub>o</sub> is objective focus, f<sub>e</sub> is eyepiece focus. M = (L / f<sub>o</sub>)(D / f<sub>e</sub>) for image at infinity."
            priority={5}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="M = −f<sub>o</sub> / f<sub>e</sub>"
            use="Astronomical Telescope angular magnification (Infinity)"
            note="Negative sign indicates an inverted image. For image at near point: M = −(f<sub>o</sub>/f<sub>e</sub>)(1 + f<sub>e</sub>/D)."
            priority={5}
          />
          <FormulaCard
            formula="L = f<sub>o</sub> + f<sub>e</sub>"
            use="Tube Length of Astronomical Telescope at infinity"
            note="The focal points of the objective and eyepiece coincide, so the intermediate image is at their common focus."
            priority={5}
          />
        </div>

        {/* REFLECTING TELESCOPES & RESOLVING POWER */}
 <div className="grid sm:grid-cols-2 gap-3 text-[12px]">
          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📡 Reflecting Telescopes (Newtonian / Cassegrain)</span>
            <p className="text-white/70 leading-relaxed text-[11px]">
              Instead of a glass lens objective, a large paraboloidal concave primary mirror gathers light. In a <strong>Cassegrain telescope</strong>, light reflects off the primary mirror, hits a secondary convex mirror, and passes through a central hole in the primary to the eyepiece.
              <br />
              <strong className="text-white block mt-1">Advantages over Refracting Telescopes:</strong>
              &bull; <strong>No Chromatic Aberration</strong> (mirrors do not disperse light by wavelength).<br />
              &bull; <strong>No Spherical Aberration</strong> when using parabolic mirror profiles.<br />
              &bull; <strong>Mechanical Ease:</strong> Large mirrors can be supported along their entire back surface, whereas large lenses can only be supported at their edges.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🔍 Resolving Power (microscope vs telescope)</span>
            <ul className="text-white/70 space-y-2 text-[11.5px] leading-relaxed">
              <li>
                <strong>Compound Microscope:</strong> Limit of resolution is <code>d<sub>min</sub> = 1.22 λ / (2 n sin θ)</code>.
                <br />
                <code className="text-cyan-300">Resolving Power = 2 n sin θ / (1.22 λ)</code>
                Where <code>n sin θ</code> is the numerical aperture, and θ is the half-angle of the light cone entering the objective.
              </li>
              <li>
                <strong>Astronomical Telescope:</strong> Angular resolution is <code>dθ = 1.22 λ / D</code>.
                <br />
                <code className="text-cyan-300">Resolving Power = D / (1.22 λ)</code>
                Where <code>D</code> is the aperture diameter of the objective. Bigger aperture resolves closer stars.
              </li>
            </ul>
          </div>
        </div>

        {/* MAGNIFICATION DISTINCTION */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⚖️ Linear Magnification vs Magnifying Power (Angular)</span>
          <p className="text-white/70 leading-relaxed text-[11.5px]">
            &bull; <strong>Linear Magnification (m = h<sub>i</sub> / h<sub>o</sub> = v / u):</strong> The ratio of the actual physical size of the image to the object. It describes lateral magnification for a single lens or mirror.
            <br />
            &bull; <strong>Magnifying Power (M = θ<sub>image</sub> / θ<sub>object</sub>):</strong> The ratio of the angle subtended at the eye by the image to the angle subtended by the object at the unaided eye. Useful for optical instruments where the object/image distance varies.
          </p>
        </div>
      </div>

      {/* PART 6: INTERACTIVE LENS MAKER CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Lens Maker's Focal Length Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Enter values to calculate the focal length f using the Lens Maker's Formula: <code>1/f = (n − 1) (1/R₁ − 1/R₂)</code>.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Refractive Index n:</label>
            <input
              type="number"
              value={refractiveIndex}
              onChange={e => setRefractiveIndex(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-cyan-500/40"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">R₁ Curvature Radius (cm):</label>
            <input
              type="number"
              value={radiusR1}
              onChange={e => setRadiusR1(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-cyan-500/40"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">R₂ Curvature Radius (cm):</label>
            <input
              type="number"
              value={radiusR2}
              onChange={e => setRadiusR2(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-cyan-500/40"
            />
          </div>
        </div>
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center">
          <span className="text-[12px] uppercase font-bold text-white/35">Calculated Focal Length f</span>
          <p className="text-[21px] font-bold text-cyan-400 my-1">
            {!isNaN(focalLengthResult) && isFinite(focalLengthResult) ? `${focalLengthResult.toFixed(2)} cm` : 'Infinity / Error'}
          </p>
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

        {/* Example 1: Lens combination */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Equivalent focal length &amp; power</span>
          <p className="text-white/80">A convex lens of focal length 20 cm is placed in contact with a concave lens of focal length 25 cm. Find the power and focal length of the combination.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Focal lengths: <code>f₁ = +20 cm = +0.2 m</code> and <code>f₂ = −25 cm = −0.25 m</code>.</p>
            <p>2. Powers: <code>P₁ = 1/f₁ = +5 D</code> and <code>P₂ = 1/f₂ = −4 D</code>.</p>
            <p>3. Combined power: <code>P<sub>eq</sub> = P₁ + P₂ = +5 + (−4) = +1 D</code>.</p>
            <p>4. Combined focal length: <code>f<sub>eq</sub> = 1/P<sub>eq</sub> = +1 m = +100 cm</code>.</p>
            <p className="text-cyan-300 font-bold">P<sub>eq</sub> = +1.0 Dioptre | f<sub>eq</sub> = +100 cm (Acts as a weak convex lens)</p>
          </div>
        </div>

        {/* Example 2: Prism */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Prism minimum deviation</span>
          <p className="text-white/80">A prism has an angle A = 60°. If the refractive index of the glass is √3, calculate the angle of minimum deviation δ<sub>m</sub>.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>Using the Prism Formula: <code>n = sin((A + δ<sub>m</sub>)/2) / sin(A/2)</code></p>
            <p><code>√3 = sin((60° + δ<sub>m</sub>)/2) / sin(30°)</code></p>
            <p><code>√3 * 0.5 = sin((60° + δ<sub>m</sub>)/2) ⟹ sin((60° + δ<sub>m</sub>)/2) = √3/2</code></p>
            <p>Since <code>sin(60°) = √3/2</code>, we have: <code>(60° + δ<sub>m</sub>)/2 = 60° ⟹ 60° + δ<sub>m</sub> = 120°</code>.</p>
            <p className="text-cyan-300 font-bold">δ<sub>m</sub> = 60° (Minimum deviation angle)</p>
          </div>
        </div>

        {/* Example 3: Telescope */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Telescope Magnification &amp; Tube Length</span>
          <p className="text-white/80">An astronomical telescope has an objective focal length of 140 cm and eyepiece focal length of 5 cm. Find its magnifying power and tube length in normal adjustment.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Normal adjustment means final image is at infinity.</p>
            <p>2. Magnification: <code>M = −f<sub>o</sub> / f<sub>e</sub> = −140 / 5 = −28</code>.</p>
            <p>3. Tube Length: <code>L = f<sub>o</sub> + f<sub>e</sub> = 140 + 5 = 145 cm</code>.</p>
            <p className="text-cyan-300 font-bold">Magnification = −28 (inverted image) | Tube Length = 145 cm</p>
          </div>
        </div>
      </div>

      {/* FORMULA DECISION TREE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'mirror', label: '🪞 Mirror Selection' },
            { id: 'lens', label: '👓 Lens Maker vs Formula' },
            { id: 'prism', label: '📐 Prism Variables' },
            { id: 'instrument', label: '🔬 Instrument Magnification' },
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
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 text-[13px] space-y-2">
          {selectedGoal === 'mirror' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Select spherical mirror formulas</span>
              <p className="text-white/70">1. Concave mirror: converges, focal length is negative (<code>f &lt; 0</code>). Real or virtual images.</p>
              <p className="text-white/70">2. Convex mirror: diverges, focal length is positive (<code>f &gt; 0</code>). Always forms diminished virtual images.</p>
              <p className="text-white/70">3. Formula: <code>1/v + 1/u = 1/f = 2/R</code>. Magnification: <code>m = −v/u = h<sub>i</sub>/h<sub>o</sub></code>.</p>
            </>
          )}
          {selectedGoal === 'lens' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Find lens parameters or focal length</span>
              <p className="text-white/70">1. To design a lens from radii: use Lens Maker's: <code>1/f = (n<sub>lens</sub>/n<sub>med</sub> − 1)(1/R₁ − 1/R₂)</code>.</p>
              <p className="text-white/70">2. To find image position: use Lens Formula: <code>1/v − 1/u = 1/f</code>. Power: <code>P = 1/f (in meters)</code>.</p>
              <p className="text-white/70">3. Lenses in contact: <code>P<sub>eq</sub> = P₁ + P₂</code>. Separated: <code>P<sub>eq</sub> = P₁ + P₂ − d P₁ P₂</code>.</p>
            </>
          )}
          {selectedGoal === 'prism' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Calculate deviation and index in prism</span>
              <p className="text-white/70">1. General incidence: <code>A + δ = i + e</code> where A is prism angle (<code>A = r₁ + r₂</code>).</p>
              <p className="text-white/70">2. At minimum deviation: <code>n = sin((A + δ<sub>m</sub>)/2) / sin(A/2)</code>. Here: <code>i = e</code> and <code>r = A/2</code>.</p>
              <p className="text-white/70">3. Dispersion: Angular dispersion <code>θ = (n<sub>v</sub> − n<sub>r</sub>)A</code>. Dispersive Power <code>ω = (n<sub>v</sub> − n<sub>r</sub>)/(n<sub>y</sub> − 1)</code>.</p>
            </>
          )}
          {selectedGoal === 'instrument' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Magnification or resolution of optical instruments</span>
              <p className="text-white/70">1. Simple microscope: <code>M = 1 + D/f</code> (near point) or <code>D/f</code> (infinity).</p>
              <p className="text-white/70">2. Compound microscope: <code>M = (L / f<sub>o</sub>)(1 + D / f<sub>e</sub>)</code> (near point) or <code>M = (L / f<sub>o</sub>)(D / f<sub>e</sub>)</code> (infinity).</p>
              <p className="text-white/70">3. Telescope: <code>M = −f<sub>o</sub> / f<sub>e</sub></code> and <code>L = f<sub>o</sub> + f<sub>e</sub></code> (infinity). Near point: <code>M = −(f<sub>o</sub>/f<sub>e</sub>)(1 + f<sub>e</sub>/D)</code>.</p>
              <p className="text-white/70">4. Resolving power: Microscope <code>2n sin θ / (1.22 λ)</code> | Telescope <code>D / (1.22 λ)</code>.</p>
            </>
          )}
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"Critical angle condition for glass-air interface"', think: "TIR. sin(C) = 1/n. If angle i > C, light reflects completely." },
            { cue: '"A person cannot see distant objects clearly, corrigible lens?"', think: "Myopia (Nearsightedness). Corrected using a concave (diverging) lens of focal length f = −d<sub>far</sub>." },
            { cue: '"Object placed in water/glass appears raised, find depth"', think: "Real & Apparent depth. Apparent Depth = Real Depth / n. Shift is d = Real Depth * (1 − 1/n)." },
            { cue: '"Calculates resolving power of telescope with larger aperture"', think: "Resolving Power = D / 1.22λ. Doubling the aperture D doubles the resolving power." },
            { cue: '"Reflecting telescope advantages vs refractors"', think: "No chromatic aberration (mirrors do not disperse light), no spherical aberration with parabolic profiles, mechanical ease of back support." },
            { cue: '"Prism minimum deviation condition"', think: "i = e, r₁ = r₂ = A/2. Use prism formula to find refractive index n." },
            { cue: '"Ray of light enters a glass slab of thickness t at angle i, lateral displacement?"', think: "Lateral shift formula: d = t * sin(i − r) / cos(r)." },
            { cue: '"Lenses in contact, find combination power"', think: "P<sub>eq</sub> = P₁ + P₂ where P = 1/f (f must be in meters)." }
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="text-[13px] font-mono text-cyan-400" dangerouslySetInnerHTML={{ __html: cue }} />
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
          <TrapCard title="Trap 1: Mirror vs Lens Formula Sign Confusion">
            Mirror formula has a positive sign: <code>1/v + 1/u = 1/f</code>.
            Thin lens formula has a negative sign: <code>1/v − 1/u = 1/f</code>.
            Do not mix them up! u is almost always negative for real objects.
          </TrapCard>
          <TrapCard title="Trap 2: Chromatic Aberration in Lenses vs Mirrors">
            Lenses exhibit <strong>chromatic aberration</strong> because refractive index varies with wavelength (dispersion), causing different colors to focus at different points. Reflecting mirrors reflect all wavelengths at the same angle, having <strong>zero chromatic aberration</strong>.
          </TrapCard>
          <TrapCard title="Trap 3: R₁ and R₂ Signs in Lens Maker's Formula">
            For a biconvex lens, the first surface curves right (<code>R₁ &gt; 0</code>), and the second curves left (<code>R₂ &lt; 0</code>). This makes the term <code>(1/R₁ − 1/R₂)</code> positive. Drawing the centers of curvature helps confirm the signs.
          </TrapCard>
          <TrapCard title="Trap 4: Resolving Power vs Magnification dependence">
            Magnifying power only enlarges the angular size (e.g. <code>M = −f<sub>o</sub>/f<sub>e</sub></code>). Resolving power describes the ability to distinguish two separate close objects, which depends strictly on aperture <code>D</code> and wavelength <code>λ</code>, NOT the eyepiece focal length.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
 <h3 className="text-cyan-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Mirror: 1/v + 1/u = 1/f = 2/R. Magnification m = −v/u",
            "Refraction: Snell's Law n₁ sin i = n₂ sin r. Frequency remains constant",
            "Apparent depth: Depth<sub>app</sub> = Depth<sub>real</sub> / n. Shift d = t(1 - 1/n)",
            "TIR: Light must go denser to rarer at i > C. sin C = n<sub>rare</sub>/n<sub>dense</sub> = 1/n",
            "Optical fiber: core-cladding transmission (n<sub>core</sub> > n<sub>cladding</sub>)",
            "Prisms for TIR: Right isosceles (90°-45°-45°) for 90°/180° light bending",
            "Lens Maker's: 1/f = (n<sub>lens</sub>/n<sub>medium</sub> − 1)(1/R₁ − 1/R₂)",
            "Thin Lens: 1/v − 1/u = 1/f. Magnification m = +v/u. Power P = 1/f (Diopters D)",
            "Equivalent Power: P<sub>eq</sub> = P₁ + P₂ (separated: P₁ + P₂ − d P₁ P₂)",
            "Prism: A + δ = i + e (A = r₁ + r₂). Min deviation: n = sin((A + δ<sub>m</sub>)/2) / sin(A/2)",
            "Dispersion: Angular dispersion θ = (n<sub>v</sub> - n<sub>r</sub>)A. Power ω = (n<sub>v</sub> - n<sub>r</sub>)/(n<sub>y</sub> - 1)",
            "Defects of vision: Myopia corrected by concave; Hypermetropia by convex",
            "Simple Microscope: M = 1 + D/f (near point), M = D/f (infinity)",
            "Compound Microscope: M = (L/f<sub>o</sub>)(1 + D/f<sub>e</sub>) (near point), intermediate real image",
            "Telescope: M = −f<sub>o</sub>/f<sub>e</sub> and L = f<sub>o</sub> + f<sub>e</sub> (infinity normal adjustment)",
            "Reflecting telescope Cassegrain: large primary concave mirror, parabolic mirror has no aberrations",
            "Resolving Power: Microscope = 2n sin θ / 1.22λ | Telescope = D / 1.22λ"
          ].map(item => (
            <div key={item} className="flex items-start gap-2 text-[13px] text-white/70 py-1 border-b border-white/[0.04] last:border-0">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
