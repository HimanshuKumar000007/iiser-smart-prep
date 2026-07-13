import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}


// ─── MATH RENDERING HELPERS ──────────────────────────────────────────────────
const InlineMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: false,
      throwOnError: false,
    });
    return <span className={cn("inline-block", className)} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (e) {
    return <code className={className}>{math}</code>;
  }
};

const DisplayMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: true,
      throwOnError: false,
    });
    return <div className={cn("overflow-x-auto py-2 my-2 text-center", className)} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (e) {
    return <div className={cn("font-mono my-2 text-center", className)}>{math}</div>;
  }
};

const renderMathText = (text: string) => {
  if (!text) return null;
  const parts = text.split('$');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      try {
        const html = katex.renderToString(part, {
          displayMode: false,
          throwOnError: false,
        });
        return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
      } catch (e) {
        return <code key={index}>{part}</code>;
      }
    }
    return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
  });
};

// ─── SVG 1: WAVEFRONT TYPES ──────────────────────────────────────────────────
function WavefrontTypesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Spherical, Cylindrical, and Plane Wavefronts</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Spherical */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
 <span className="text-[10px] font-bold text-cyan-400 block">Spherical (Point Source)</span>
          <svg viewBox="0 0 100 90" className="w-full" style={{ maxHeight: 85 }}>
            <circle cx="50" cy="45" r="3" fill="#e11d48" />
            <circle cx="50" cy="45" r="15" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="50" cy="45" r="28" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.6" />
            <circle cx="50" cy="45" r="40" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Propagation arrows */}
            <path d="M 50 45 L 78 17" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="2,2" />
            <polygon points="78,17 71,18 75,22" fill="#22d3ee" />
            <path d="M 50 45 L 78 73" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="2,2" />
            <polygon points="78,73 75,68 71,72" fill="#22d3ee" />
          </svg>
        </div>
        {/* Cylindrical */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
 <span className="text-[10px] font-bold text-violet-400 block">Cylindrical (Line Source)</span>
          <svg viewBox="0 0 100 90" className="w-full" style={{ maxHeight: 85 }}>
            {/* Line source */}
            <line x1="50" y1="10" x2="50" y2="80" stroke="#fb923c" strokeWidth="2.5" />
            {/* Cylinder shells */}
            <ellipse cx="50" cy="15" rx="15" ry="5" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <ellipse cx="50" cy="75" rx="15" ry="5" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <line x1="35" y1="15" x2="35" y2="75" stroke="#a78bfa" strokeWidth="1" />
            <line x1="65" y1="15" x2="65" y2="75" stroke="#a78bfa" strokeWidth="1" />
            
            <ellipse cx="50" cy="15" rx="28" ry="8" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.6" />
            <ellipse cx="50" cy="75" rx="28" ry="8" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="22" y1="15" x2="22" y2="75" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="78" y1="15" x2="78" y2="75" stroke="#a78bfa" strokeWidth="1.2" strokeOpacity="0.6" />
          </svg>
        </div>
        {/* Plane */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
 <span className="text-[10px] font-bold text-emerald-400 block">Plane (Distant Source)</span>
          <svg viewBox="0 0 100 90" className="w-full" style={{ maxHeight: 85 }}>
            {/* Wavefront planes */}
            <polygon points="25,15 35,45 35,75 25,45" fill="#34d399" fillOpacity="0.1" stroke="#34d399" strokeWidth="1" />
            <polygon points="45,15 55,45 55,75 45,45" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeWidth="1.2" />
            <polygon points="65,15 75,45 75,75 65,45" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.5" />
            {/* Wave rays */}
            <path d="M 10 30 L 90 30" stroke="#34d399" strokeWidth="0.8" strokeDasharray="3,2" />
            <polygon points="90,30 84,27 84,33" fill="#34d399" />
            <path d="M 10 60 L 90 60" stroke="#34d399" strokeWidth="0.8" strokeDasharray="3,2" />
            <polygon points="90,60 84,57 84,63" fill="#34d399" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 1b: HUYGENS CONSTRUCTION WAVEFRONT ──────────────────────────────────
function HuygensConstructionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1b — Huygens' Wavelet Construction for Plane Wavefronts</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 115 }}>
        {/* Source wavefront (plane) */}
        <line x1="60" y1="10" x2="60" y2="110" stroke="#22d3ee" strokeWidth="2.2" />
        <text x="50" y="60" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle" writingMode="vertical-rl">Primary Wavefront AB</text>

        {/* Secondary sources on AB */}
        <circle cx="60" cy="30" r="3" fill="#f43f5e" />
        <circle cx="60" cy="65" r="3" fill="#f43f5e" />
        <circle cx="60" cy="100" r="3" fill="#f43f5e" />

        {/* Wavelet arcs */}
        <path d="M 60 10 A 20 20 0 0 1 80 30 A 20 20 0 0 1 60 50" fill="none" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="3,2" />
        <path d="M 60 45 A 20 20 0 0 1 80 65 A 20 20 0 0 1 60 85" fill="none" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="3,2" />
        <path d="M 60 80 A 20 20 0 0 1 80 100 A 20 20 0 0 1 60 120" fill="none" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="3,2" />
        
        {/* Forward envelope tangent */}
        <line x1="80" y1="30" x2="80" y2="100" stroke="#34d399" strokeWidth="2.5" />
        <line x1="80" y1="10" x2="80" y2="110" stroke="#34d399" strokeWidth="1.5" strokeDasharray="2,2" strokeOpacity="0.6" />
        <text x="92" y="60" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle" writingMode="vertical-rl">New Wavefront A'B' (Tangent Envelope)</text>

        {/* Forward direction arrow */}
        <line x1="60" y1="65" x2="130" y2="65" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
        <polygon points="130,65 122,61 122,69" fill="#ffffff" fillOpacity="0.5" />
        <text x="105" y="58" fill="#ffffff" fillOpacity="0.6" fontSize="8" fontFamily="monospace" textAnchor="middle">Radius = vτ</text>
      </svg>
    </div>
  );
}


// ─── SVG 2: YDSE SETUP ────────────────────────────────────────────────────────
function YDSESetupSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Young's Double Slit Experiment (YDSE) Geometry</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Source slit */}
        <line x1="20" y1="30" x2="20" y2="65" stroke="#64748b" strokeWidth="3" />
        <line x1="20" y1="75" x2="20" y2="110" stroke="#64748b" strokeWidth="3" />
        <text x="25" y="73" fill="#ffffff" fillOpacity="0.6" fontSize="8" fontFamily="monospace">S</text>

        {/* Double slit screen */}
        <line x1="100" y1="10" x2="100" y2="45" stroke="#64748b" strokeWidth="3" />
        <line x1="100" y1="55" x2="100" y2="85" stroke="#64748b" strokeWidth="3" />
        <line x1="100" y1="95" x2="100" y2="130" stroke="#64748b" strokeWidth="3" />
        <text x="106" y="52" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" fontWeight="bold">S₁</text>
        <text x="106" y="98" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" fontWeight="bold">S₂</text>

        {/* Slit separation d */}
        <path d="M 94 50 L 94 100" stroke="#a78bfa" strokeWidth="0.8" />
        <line x1="91" y1="50" x2="97" y2="50" stroke="#a78bfa" strokeWidth="0.8" />
        <line x1="91" y1="100" x2="97" y2="100" stroke="#a78bfa" strokeWidth="0.8" />
        <text x="86" y="79" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">d</text>

        {/* Main Screen */}
        <line x1="280" y1="10" x2="280" y2="130" stroke="#475569" strokeWidth="2.5" />
        <text x="288" y="20" fill="#ffffff" fillOpacity="0.6" fontSize="8" fontFamily="monospace">Screen</text>

        {/* Screen distance D */}
        <path d="M 100 135 L 280 135" stroke="#34d399" strokeWidth="0.8" />
        <line x1="100" y1="132" x2="100" y2="138" stroke="#34d399" strokeWidth="0.8" />
        <line x1="280" y1="132" x2="280" y2="138" stroke="#34d399" strokeWidth="0.8" />
        <text x="190" y="131" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">D</text>

        {/* Rays meeting at P */}
        <line x1="100" y1="50" x2="280" y2="35" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="100" y1="100" x2="280" y2="35" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="280" cy="35" r="2.5" fill="#f43f5e" />
        <text x="285" y="42" fill="#f43f5e" fontSize="8" fontFamily="monospace">P (y)</text>

        {/* Central Maxima (O) */}
        <line x1="100" y1="75" x2="280" y2="75" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3,3" strokeOpacity="0.4" />
        <circle cx="280" cy="75" r="2.5" fill="#34d399" />
        <text x="285" y="80" fill="#34d399" fontSize="8" fontFamily="monospace">O (Central Max)</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: DIFFRACTION INTENSITY PROFILE ─────────────────────────────────────
function DiffractionProfileSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Single Slit Diffraction: Intensity Distribution and Central Maxima Width</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Axis */}
        <line x1="10" y1="100" x2="330" y2="100" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="170" y1="10" x2="170" y2="130" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3,3" strokeOpacity="0.2" />

        {/* Central Maximum Peak (at θ = 0) */}
        {/* Draw intensity distribution curve */}
        <path d="M 50 100 
                 Q 95 100 110 94 
                 T 130 100 
                 Q 145 90 150 75
                 Q 158 55 170 20
                 Q 182 55 190 75
                 Q 195 90 210 100
                 T 230 94
                 Q 245 100 290 100" 
              fill="none" stroke="#fb923c" strokeWidth="2.2" />

        {/* Intensity filling */}
        <path d="M 130 100 
                 Q 145 90 150 75
                 Q 158 55 170 20
                 Q 182 55 190 75
                 Q 195 90 210 100 Z" 
              fill="#fb923c" fillOpacity="0.12" />

        {/* Minima labels */}
        <circle cx="130" cy="100" r="2.5" fill="#f87171" />
        <text x="130" y="112" fill="#f87171" fontSize="7.5" fontFamily="monospace" textAnchor="middle">−λ/a</text>
        
        <circle cx="210" cy="100" r="2.5" fill="#f87171" />
        <text x="210" y="112" fill="#f87171" fontSize="7.5" fontFamily="monospace" textAnchor="middle">+λ/a</text>

        {/* Central Max Label */}
        <text x="170" y="15" fill="#fb923c" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Central Max (I₀)</text>
        
        {/* Width indicators */}
        <path d="M 130 122 L 210 122" stroke="#22d3ee" strokeWidth="1" />
        <line x1="130" y1="119" x2="130" y2="125" stroke="#22d3ee" strokeWidth="1" />
        <line x1="210" y1="119" x2="210" y2="125" stroke="#22d3ee" strokeWidth="1" />
        <text x="170" y="132" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">Angular Width = 2λ/a</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: POLARIZATION & MALUS'S LAW ───────────────────────────────────────
function PolarizationSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Malus's Law: Unpolarized Light halving, and Intensity reduction by θ</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 115 }}>
        {/* Unpolarized Light (All direction arrows) */}
        <line x1="10" y1="60" x2="80" y2="60" stroke="#a78bfa" strokeWidth="2.2" />
        {/* Star arrows */}
        <line x1="30" y1="40" x2="30" y2="80" stroke="#a78bfa" strokeWidth="1.2" />
        <line x1="15" y1="45" x2="45" y2="75" stroke="#a78bfa" strokeWidth="1.2" />
        <line x1="45" y1="45" x2="15" y2="75" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="30" y="28" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Unpolarized (I₀)</text>

        {/* Polarizer 1 (Vertical) */}
        <rect x="80" y="20" width="10" height="80" rx="2" fill="none" stroke="#22d3ee" strokeWidth="2" />
        <line x1="85" y1="25" x2="85" y2="95" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3,2" />
        <text x="85" y="14" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">Polarizer</text>

        {/* Linearly Polarized Light (Vertical only) */}
        <line x1="90" y1="60" x2="200" y2="60" stroke="#22d3ee" strokeWidth="2.2" />
        <line x1="140" y1="45" x2="140" y2="75" stroke="#22d3ee" strokeWidth="1.5" />
        <polygon points="140,45 137,50 143,50" fill="#22d3ee" />
        <polygon points="140,75 137,70 143,70" fill="#22d3ee" />
        <text x="140" y="32" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">I₁ = I₀ / 2</text>

        {/* Analyzer (Rotated by θ) */}
        <g transform="rotate(30, 205, 60)">
          <rect x="200" y="20" width="10" height="80" rx="2" fill="none" stroke="#fb923c" strokeWidth="2" />
          <line x1="205" y1="25" x2="205" y2="95" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="3,2" />
        </g>
        <text x="205" y="14" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">Analyzer (θ)</text>

        {/* Transmitted Light */}
        <line x1="210" y1="60" x2="310" y2="60" stroke="#fb923c" strokeWidth="1.8" />
        <text x="265" y="42" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">I₂ = I₁ cos²θ</text>
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
  const renderFormula = (latex: string) => {
    try {
      const html = katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
      });
      return <div className="overflow-x-auto py-1 text-cyan-300 font-bold" dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
      return <div className="font-mono text-cyan-300 font-bold text-[13px] sm:text-sm">{latex}</div>;
    }
  };

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
      {renderFormula(formula)}
      <p className="text-white/80 text-[12px]"><strong className="text-white/40">Use:</strong> {renderMathText(use)}</p>
      <p className="text-white/55 text-[12px]"><strong className="text-white/40">Note:</strong> {renderMathText(note)}</p>
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

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function WaveOpticsDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'formulas' | 'shift' | 'polarization'>('formulas');
  
  // YDSE Simulator States
  const [wavelengthNm, setWavelengthNm] = useState('500'); // nm
  const [slitSeparationMm, setSlitSeparationMm] = useState('0.2'); // mm
  const [screenDistanceM, setScreenDistanceM] = useState('1.5'); // m

  const lambda = parseFloat(wavelengthNm) * 1e-9;
  const d = parseFloat(slitSeparationMm) * 1e-3;
  const D = parseFloat(screenDistanceM);

  const fringeWidthResult = !isNaN(lambda) && !isNaN(d) && !isNaN(D) && d > 0 ? (lambda * D) / d : 0;

  // Brewster Solver States
  const [refractiveIndex, setRefractiveIndex] = useState('1.5');
  const muVal = parseFloat(refractiveIndex);
  
  const brewsterAngleDeg = !isNaN(muVal) ? Math.atan(muVal) * (180 / Math.PI) : 0;
  const criticalAngleDeg = !isNaN(muVal) && muVal >= 1 ? Math.asin(1 / muVal) * (180 / Math.PI) : 0;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🌊</span>
              <Tag color="cyan">Physics Unit 10</Tag>
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
              Wave Optics and Interference
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Simple Harmonic Motion</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Waves &amp; Phase</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Algebraic Identities</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Hard (4.3/5)' },
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
              "Huygens' Principle: proofs of reflection & refraction limits",
              "Superposition & Resultant intensity equations in coherent setups",
              "Young's Double Slit Experiment (YDSE) maxima and minima rules",
              "Optical path and slab shift fringe displacements calculations",
              "Single slit diffraction patterns and central maximum angular widths",
              "Polarisation of light: Brewster's and Malus's law boundary behaviors"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: WAVEFRONT THEORY & HUYGENS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Wavefronts &amp; Huygens' Principle</h2>
        </div>
        
        {/* Formal statement of Huygens' Principle */}
 <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📜 Huygens' Principle (Formal Axiomatic Statement)</span>
          <ul className="text-white/70 space-y-1.5 list-inside list-disc text-[11.5px] leading-relaxed">
            <li>Every point on a primary wavefront acts as a source of secondary disturbance, emitting spherical wavelets called <strong>secondary wavelets</strong>.</li>
            <li>These secondary wavelets travel in all directions with the <strong>speed of light in that specific medium</strong>.</li>
            <li>The forward envelope (tangent surface) to these secondary wavelets at any subsequent instant gives the position and shape of the <strong>new wavefront</strong> at that instant.</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <WavefrontTypesSVG />
          <HuygensConstructionSVG />
        </div>

        {/* Limitations of Huygens' Principle */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⚠️ Limitations of Huygens' Wave Theory</span>
          <ul className="text-white/70 space-y-1 text-[11px] leading-relaxed">
            <li>&bull; <strong>The Backward Wave Paradox:</strong> The theory mathematically predicts a backward wave envelope. Huygens had to artificially assume the amplitude of wavelets is proportional to <code>½ (1 + cos θ)</code>, which becomes zero in the backward direction (<code>θ = 180°</code>).</li>
            <li>&bull; <strong>No Quantum/Particle explanations:</strong> Being a pure classical wave description, it fails to explain the Photoelectric Effect, Compton Scattering, or the existence of photons.</li>
            <li>&bull; <strong>No Intensity Details:</strong> It acts as a geometric model but does not describe energy/intensity variations quantitatively.</li>
          </ul>
        </div>

        {/* Huygens Boundary Proofs */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Huygens' Boundary Proofs (Step-by-Step Geometry)</span>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Proof of Reflection Law</strong>
              <p className="text-white/75 leading-relaxed">
                Let a plane wavefront AB strike mirror surface AC at angle <code>i</code>.
                Let <code>v</code> be wave speed. The time taken for wavelet from B to reach C is <code>τ</code>, so <code>BC = vτ</code>.
                <br /><br />
                During <code>τ</code>, wavelet from A grows to radius <code>vτ</code>. The tangent from C to this wavelet is AE, so <code>AE = vτ</code>.
              </p>
              <p className="text-white/55 leading-relaxed">
                In right triangles ΔAEC and ΔCBA:
                <br />&bull; Hypotenuse AC is common.
                <br />&bull; <code>AE = BC = vτ</code>.
                <br />Thus, ΔAEC ≅ ΔCBA (RHS congruency), which yields: <code className="text-cyan-300 font-bold">∠i = ∠r</code>.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Proof of Refraction (Snell's Law)</strong>
              <p className="text-white/75 leading-relaxed">
                Plane wavefront AB hits boundary AC. In time <code>τ</code>, wavelet from B reaches C in medium 1: <code>BC = v₁τ</code>.
                <br />
                Wavelet from A in medium 2 spreads to radius <code>AE = v₂τ</code>.
              </p>
              <p className="text-white/55 leading-relaxed">
                In ΔABC: <code>sin(i) = BC / AC = v₁τ / AC</code>.
                <br />
                In ΔAEC: <code>sin(r) = AE / AC = v₂τ / AC</code>.
                <br />
                Dividing the two yields:
                <br />
                <code>sin(i) / sin(r) = v₁ / v₂ = n₂ / n₁</code>
                <br />
                Which yields Snell's Law: <code className="text-cyan-300 font-bold">n₁ sin(i) = n₂ sin(r)</code>.
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-white/5">
            <p className="text-white/70 leading-relaxed">
              &bull; <strong className="text-white">Wavelength Relation:</strong> Since speed changes but frequency <InlineMath math="\nu" /> remains constant, the wavelength scales: <InlineMath className="text-cyan-300" math="\lambda_{\text{medium}} = \frac{\lambda_{\text{vac}}}{n}" />.
            </p>
          </div>
        </div>
      </div>

      {/* PART 2: INTERFERENCE & YDSE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Wave Interference &amp; YDSE</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Interference is the redistribution of wave intensity resulting from the superposition of coherent wave sources. In YDSE, two slits divide the wavefront to create alternating bright and dark bands.
        </p>
        <YDSESetupSVG />

        {/* Coherent & Incoherent Superposition and Wave Math */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">🌊 Coherent vs. Incoherent Addition &amp; Superposition Math</span>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Wave Amplitude Derivation</strong>
              <p className="text-white/75 leading-relaxed text-[11px]">
                Let two waves be:
                <br />
                <code>E₁ = a₁ cos(ωt)</code> and <code>E₂ = a₂ cos(ωt + φ)</code>.
                <br />
                The resultant amplitude <code>A</code> is given by:
                <br />
                <code className="text-cyan-300">A² = a₁² + a₂² + 2 a₁ a₂ cos(φ)</code>
              </p>
              <p className="text-white/55 leading-relaxed text-[11px]">
                Since intensity <code>I ∝ Amplitude²</code>:
                <br />
                <code>I = I₁ + I₂ + 2 &radic;(I₁ I₂) cos(φ)</code>.
                <br />
                For identical inputs (<code>I₁ = I₂ = I₀</code>), this simplifies to:
                <br />
                <code className="text-cyan-300">I = 4 I₀ cos²(φ / 2)</code>
              </p>
            </div>
            
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Coherent vs. Incoherent Addition</strong>
              <p className="text-white/75 leading-relaxed text-[11px]">
                &bull; <strong className="text-white">Coherent Addition:</strong> Constant phase difference (<InlineMath math="\Delta\phi = \text{constant}" />) over time. Resultant intensity fluctuates between maxima (<InlineMath className="text-cyan-300" math="I_{\text{max}} = (\sqrt{I_1} + \sqrt{I_2})^2" />) and minima (<InlineMath className="text-rose-300" math="I_{\text{min}} = (\sqrt{I_1} - \sqrt{I_2})^2" />).
                <br />
                &bull; <strong className="text-white">Incoherent Addition:</strong> Phase difference fluctuates randomly and rapidly. The time-average of <code>cos(φ)</code> is zero:
                <br />
                <InlineMath className="text-cyan-300" math="I_{\text{net}} = I_1 + I_2" /> (yielding uniform illumination, no fringes).
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-white block mb-0.5">1. Coherence Types</strong>
              &bull; <strong>Temporal Coherence:</strong> Correlation of phase at a single point over a time interval (determined by light wave packet length).<br />
              &bull; <strong>Spatial Coherence:</strong> Correlation of phase between two different points across the wave front.
            </div>
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-white block mb-0.5">2. Coherent Source Methods</strong>
              &bull; <strong>Division of Wavefront:</strong> Splitting a wavefront into pieces (e.g. YDSE, Fresnel biprism, Lloyd's mirror).<br />
              &bull; <strong>Division of Amplitude:</strong> Splitting wave amplitude via reflection/refraction (e.g. thin films, Michelson interferometer).
            </div>
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-white block mb-0.5">3. Laser Sources</strong>
              Unlike traditional hot filaments, a <strong>Laser</strong> produces highly directional, monochromatic light with exceptionally high spatial and temporal coherence because of stimulated atomic emission.
            </div>
          </div>
        </div>

        {/* GEOMETRIC DETAILS OF YDSE */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📏 YDSE Fringe Geometry, Shapes &amp; White Light</span>
          <div className="grid sm:grid-cols-3 gap-3 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-white block mb-0.5">A. Shape of Fringes</strong>
              In three dimensions, the locus of points having a constant path difference is a <strong>hyperbola</strong> with the two slits as foci. Thus, YDSE fringes are hyperbolic on the screen, but appear as <strong>straight vertical lines</strong> in the central region of a distant screen.
            </div>
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-white block mb-0.5">B. White Light Illumination</strong>
              If white light is used in YDSE:<br />
              1. The <strong>central fringe is white</strong> because path difference is zero for all wavelengths (constructive).<br />
              2. Fringes closest to center are <strong>colored</strong> (violet on inner edge, red on outer).<br />
              3. Further out, different orders overlap, and the pattern washes out into uniform white.
            </div>
            <div className="bg-black/35 p-2 rounded border border-white/5">
              <strong className="text-white block mb-0.5">C. Source Slit Shift &amp; Slit Width</strong>
              &bull; <strong>Moving Source Slit:</strong> Moving the source slit <InlineMath math="S" /> downwards by <InlineMath math="y_s" /> shifts the central fringe <strong>upwards</strong> by:
              <InlineMath math="y = \frac{D}{d_s} y_s" /> (where <InlineMath math="d_s" /> is the source-to-slit distance).<br />
              &bull; <strong>Slit Width:</strong> If source slit is too wide, different parts act as independent sources, blurring the fringes.
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="I = I_1 + I_2 + 2\sqrt{I_1 I_2} \cos(\Delta\phi) = 4I_0 \cos^2\left(\frac{\Delta\phi}{2}\right)"
            use="Resultant intensity of two interfering waves"
            note="Simplifies to $4I_0 \\cos^2(\\Delta\\phi/2)$ for identical source intensities. The intensity oscillates between $4I_0$ (constructive) and $0$ (destructive)."
            priority={5}
          />
          <FormulaCard
            formula="\Delta\phi = \left(\frac{2\pi}{\lambda}\right) \Delta x"
            use="Phase difference (Δφ) from path difference (Δx)"
            note="Bright fringes (constructive): $\\Delta x = n\\lambda$. Dark fringes (destructive): $\\Delta x = (n - 1/2)\\lambda$. Phase change of $2\\pi$ corresponds to $1$ wavelength path."
            priority={5}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <FormulaCard
            formula="\beta = \frac{\lambda D}{d}"
            use="Linear Fringe Width in YDSE"
            note="$d$ is slit separation, $D$ is screen distance. Fringe width $\\beta$ decreases if the setup is immersed in liquid (since $\\lambda$ reduces)."
            priority={5}
          />
          <FormulaCard
            formula="\theta = \frac{\beta}{D} = \frac{\lambda}{d}"
            use="Angular Fringe Width in YDSE"
            note="Independent of screen distance $D$. Represents the angle subtended by a single fringe at the double slit."
            priority={5}
          />
          <FormulaCard
            formula="\Delta y = \frac{D}{d}(\mu - 1)t"
            use="Shift in fringe pattern due to thin glass slab"
            note="Placing a slab of index $\\mu$ and thickness $t$ in front of one slit shifts the entire pattern toward that slit by $\\Delta y$."
            priority={5}
          />
        </div>

        <InsightCard title="Energy Conservation in Interference">
          Interference does not destroy energy. The energy that vanishes at the dark fringes (destructive interference) is completely redirected to the bright fringes (constructive interference). The average intensity across the entire screen remains constant at <InlineMath math="I_{\text{avg}} = I_1 + I_2" />.
        </InsightCard>
      </div>

      {/* PART 3: SINGLE SLIT DIFFRACTION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Single Slit Diffraction</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Diffraction is the bending of light waves around obstacles or through narrow apertures. In single slit diffraction, secondary wavelets from the same wavefront interfere to produce a wide central maximum flanked by decaying secondary fringes.
        </p>
        <DiffractionProfileSVG />
        {/* FRESNEL VS FRAUNHOFER CLASSIFICATION */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Diffraction Classification (Fresnel vs. Fraunhofer)</span>
          <div className="grid sm:grid-cols-2 gap-3 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-2.5 rounded border border-white/5 space-y-1">
              <strong className="text-white block">1. Fresnel Diffraction</strong>
              &bull; <strong>Source/Screen Distance:</strong> Placed at finite distances from the diffracting aperture.<br />
              &bull; <strong>Wavefronts:</strong> Incident wavefronts are spherical or cylindrical.<br />
              &bull; <strong>Lenses:</strong> No lenses are required to observe the pattern.
            </div>
            <div className="bg-black/35 p-2.5 rounded border border-white/5 space-y-1">
              <strong className="text-white block">2. Fraunhofer Diffraction</strong>
              &bull; <strong>Source/Screen Distance:</strong> Placed at infinite distances (effectively) from the aperture.<br />
              &bull; <strong>Wavefronts:</strong> Incident wavefront is plane.<br />
              &bull; <strong>Lenses:</strong> Convex lenses are used to make light parallel and focus the pattern on the screen.
            </div>
          </div>
        </div>

        {/* SINGLE SLIT FORMULAS & RELATIVE INTENSITIES */}
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="a \sin\theta = n\lambda \quad (\text{Minima}) \quad \Big| \quad a \sin\theta \approx \left(n + \frac{1}{2}\right)\lambda \quad (\text{Secondary Maxima})"
            use="Conditions for diffraction Minima and Secondary Maxima"
            note="Note that the secondary maxima condition is ONLY an approximation. The exact positions require solving $\\tan\\alpha = \\alpha$ where $\\alpha = \\frac{\\pi a \\sin\\theta}{\\lambda}$. Relative intensities of maxima are: $I_{\\text{central}} = I_0$, 1st secondary = $\\frac{I_0}{22}$, 2nd secondary = $\\frac{I_0}{61}$, 3rd = $\\frac{I_0}{121}$."
            priority={5}
          />
          <FormulaCard
            formula="W = \frac{2\lambda D}{a}"
            use="Linear width of the Central Maximum on the screen"
            note="Spans from the first minimum on the left ($-\\lambda/a$) to the first minimum on the right ($+\\lambda/a$). The angular width is $2\\theta = 2\\lambda/a$."
            priority={5}
          />
        </div>

        {/* DIFFRACTION GRATING, CIRCULAR APERTURE & RESOLVING POWER */}
 <div className="grid sm:grid-cols-2 gap-3 text-[12px]">
          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⛓️ Diffraction Grating &amp; Circular Aperture</span>
            <ul className="text-white/70 space-y-2 text-[11px] leading-relaxed">
              <li>
                <strong>Diffraction Grating:</strong> Consists of a large number of parallel close slits. Formula:
                <DisplayMath className="text-cyan-300" math="(a + b) \sin\theta = n\lambda" />
                Where <code>(a + b)</code> is the grating element, and <code>n</code> is the order of the spectrum.
              </li>
              <li>
                <strong>Circular Aperture:</strong> Bending of light through a pinhole. First minimum occurs at the angle given by:
                <DisplayMath className="text-cyan-300" math="\sin\theta \approx \frac{1.22\lambda}{d}" />
                Where <code>d</code> is the circular aperture diameter. Produces a circular pattern called the <strong>Airy Disk</strong>.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🔍 Resolving Power Limits (Rayleigh Criterion)</span>
            <ul className="text-white/70 space-y-2 text-[11px] leading-relaxed">
              <li>
                <strong>Rayleigh Criterion:</strong> Two close point sources are just resolved when the central maximum of one falls on the first minimum of the other.
              </li>
              <li>
                <strong>Telescope:</strong> Limit of resolution <InlineMath math="d\theta = \frac{1.22\lambda}{D}" />.
                <DisplayMath className="text-cyan-300" math="\text{Resolving Power} = \frac{D}{1.22\lambda}" />
              </li>
              <li>
                <strong>Microscope:</strong> Limit of resolution <InlineMath math="d_{\text{min}} = \frac{1.22\lambda}{2n\sin\theta}" />.
                <DisplayMath className="text-cyan-300" math="\text{Resolving Power} = \frac{2n\sin\theta}{1.22\lambda}" />
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison table */}
        <div className="space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 block">📊 Interference (YDSE) vs. Diffraction (Single Slit)</span>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[12px] min-w-[480px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
                  <th className="text-left px-4 py-2">Feature</th>
                  <th className="text-left px-4 py-2 text-cyan-400">Interference (YDSE)</th>
                  <th className="text-left px-4 py-2 text-violet-400">Diffraction (Single Slit)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Origin', 'Superposition of waves from two distinct coherent wavefronts', 'Superposition of wavelets from different parts of the same wavefront'],
                  ['Fringe Brightness', 'All bright fringes are of equal intensity', 'Intensity decays rapidly from central max to higher orders'],
                  ['Fringe Width', <span>All fringes are of equal width (<InlineMath math="\beta = \frac{\lambda D}{d}" />)</span>, <span>Central max is twice as wide as secondary maxima (<InlineMath math="\frac{2\lambda D}{a}" />)</span>],
                  ['Minima Intensity', 'Minima are perfectly dark (zero intensity)', 'Minima are not completely dark (some residual light remains)'],
                ].map(([feat, interf, diffr]: [string, any, any]) => (
                  <tr key={feat} className="border-b border-white/5 last:border-0 text-white/70">
                    <td className="px-4 py-2 font-semibold text-white/85">{feat}</td>
                    <td className="px-4 py-2 text-cyan-300">{interf}</td>
                    <td className="px-4 py-2 text-violet-300">{diffr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 4: POLARISATION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Light Polarisation &amp; Wave Nature</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Polarisation restricts wave oscillations to a single plane. The ability to polarize light proves that light travels as <strong>transverse waves</strong>, since longitudinal waves cannot be polarized.
        </p>
        <PolarizationSVG />

        {/* PLANES, POLAROIDS & BIREFRINGENCE */}
 <div className="grid sm:grid-cols-3 gap-3 text-[12px] text-white/70">
          <div className="p-3 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
            <strong className="text-white block mb-0.5">1. Planes of Vibration &amp; Polarisation</strong>
            &bull; <strong>Plane of Vibration:</strong> The plane containing the direction of light propagation and the direction of electric field oscillations.
            <br />
            &bull; <strong>Plane of Polarisation:</strong> The plane passing through the direction of propagation that is <strong>perpendicular</strong> to the plane of vibration (contains no electric oscillations).
          </div>
          <div className="p-3 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
            <strong className="text-white block mb-0.5">2. Polaroids &amp; Birefringence</strong>
            &bull; <strong>Polaroids:</strong> Thin sheets of polymer (like nitrocellulose) containing aligned microscopic crystals (e.g. herapathite) that absorb one polarization component (dichroism) and transmit the other.
            <br />
            &bull; <strong>Birefringence (Double Refraction):</strong> Unpolarized light entering a crystal like calcite splits into two rays: <strong>Ordinary (O-ray)</strong> (obeys Snell's law) and <strong>Extraordinary (E-ray)</strong> (travels at different speed and does not obey Snell's law). Both are mutually perpendicular polarized.
          </div>
          <div className="p-3 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
            <strong className="text-white block mb-0.5">3. Uses of Polaroids</strong>
            &bull; <strong>Glare Reduction:</strong> Sunglasses and car windshields block horizontally polarized reflected glare.
            <br />
            &bull; <strong>LCD Screens:</strong> Control light transmission via liquid crystal alignment.
            <br />
            &bull; <strong>Stress Analysis:</strong> Photoelasticity reveals structural stress patterns under polarized light.
          </div>
        </div>

        {/* OPTICAL ACTIVITY, CIRCULAR & ELLIPTICAL POLARIZATION */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🧪 Optical Activity &amp; Non-Linear Polarization</span>
          <div className="grid sm:grid-cols-2 gap-4 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[13px] block mb-1">A. Optical Activity &amp; Specific Rotation</strong>
              <p>
                Certain asymmetric substances (like sugar solutions, quartz) rotate the plane of polarization of light passing through them.
                <br />
                &bull; <strong>Dextrorotatory (d-):</strong> Rotates the plane clockwise (looking toward the source).
                <br />
                &bull; <strong>Laevorotatory (l-):</strong> Rotates the plane counter-clockwise.
                <br />
                &bull; <strong>Specific Rotation (θ):</strong> Given by:
                <DisplayMath className="text-cyan-300" math="s = \frac{\theta}{l \cdot c}" />
                Where <InlineMath math="\theta" /> is the rotation angle, <InlineMath math="l" /> is the path length (in dm), and <InlineMath math="c" /> is the concentration (in <InlineMath math="\text{g/cm}^3" />).
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[13px] block mb-1">B. Circular &amp; Elliptical Polarization</strong>
              <p>
                Formed when two mutually perpendicular polarized waves have a fixed phase difference.
                <br />
                &bull; <strong>Quarter-Wave Plate:</strong> Introduces a path difference of <InlineMath math="\lambda/4" /> (phase shift <InlineMath math="\pi/2" />). Converts plane-polarized light into circular (if amplitudes are equal) or elliptical (if amplitudes are unequal) polarized light.
                <br />
                &bull; <strong>Half-Wave Plate:</strong> Introduces a path difference of <InlineMath math="\lambda/2" /> (phase shift <InlineMath math="\pi" />), rotating the plane of polarization.
              </p>
            </div>
          </div>
        </div>

        {/* MALUS'S & BREWSTER'S PROOFS */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Proofs of Polarization Laws</span>
          <div className="grid sm:grid-cols-2 gap-4 text-[11.5px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Derivation of Malus's Law</strong>
              <p>
                Let plane polarized light of amplitude <InlineMath math="E_0" /> hit an analyzer. The electric field component along the transmission axis is <InlineMath math="E = E_0 \cos\theta" />.
                <br /><br />
                Since transmitted intensity is proportional to amplitude squared:
                <DisplayMath className="text-cyan-300" math="I = k E^2 = k E_0^2 \cos^2\theta = I_{\text{in}} \cos^2\theta" />
                For unpolarized incident light of intensity <InlineMath math="I_0" />: the average value of <InlineMath math="\cos^2\theta" /> over all directions is <InlineMath math="1/2" />, so <InlineMath math="I_{\text{transmitted}} = \frac{I_0}{2}" />.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Proof of Brewster's Law &amp; Refraction Relations</strong>
              <p>
                When light hits a boundary at the polarizing angle <InlineMath math="i_p" />, the reflected and refracted rays are perpendicular (<InlineMath math="i_p + 90^\circ + r = 180^\circ" />, meaning <InlineMath math="r = 90^\circ - i_p" />).
                <br /><br />
                By Snell's Law:
                <DisplayMath math="n = \frac{\sin i_p}{\sin r} = \frac{\sin i_p}{\sin(90^\circ - i_p)} = \frac{\sin i_p}{\cos i_p}" />
                <DisplayMath className="text-cyan-300" math="n = \tan i_p" />
                Thus, reflected light is completely plane-polarized parallel to the surface.
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="I = I_{\text{in}} \cos^2\theta"
            use="Malus's Law for polarized light entering an analyzer"
            note="$\\theta$ is the angle between polarizer transmission axes. If unpolarized light of intensity $I_0$ passes through the first polarizer, its intensity becomes $\\frac{I_0}{2}$."
            priority={5}
          />
          <FormulaCard
            formula="\tan i_p = \mu = n"
            use="Brewster's Law (Polarizing Angle $i_p$)"
            note="At incident angle $i_p$, the reflected ray is completely polarized, and the reflected and refracted rays are perpendicular ($90^\\circ$ apart)."
            priority={5}
          />
        </div>

        {/* Polarisation by Scattering */}
        <InsightCard title="Polarisation by Scattering (Rayleigh Scattering)">
          When unpolarized sunlight hits molecules in the Earth's atmosphere, it sets the molecular electrons into vibration. Since the scattered light observed in a direction perpendicular to the Sun's rays is generated by transverse electric field components oscillating strictly perpendicular to the line of sight, the <strong>scattered light at a 90° angle is completely plane-polarized</strong>. This is why clear blue sky light is partially polarized and can be verified using polarizing sunglasses.
        </InsightCard>
      </div>

      {/* PART 5: INTERACTIVE YDSE SIMULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Interactive YDSE Fringe Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Adjust sliders to visualize how wavelength, slit spacing, and screen distance scale the fringe width: <InlineMath math="\beta = \frac{\lambda D}{d}" />.
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Wavelength (<InlineMath math="\lambda" />): {wavelengthNm} nm</span>
              <span className="text-cyan-400">λ</span>
            </div>
            <input
              type="range" min="400" max="750" step="10"
              value={wavelengthNm} onChange={e => setWavelengthNm(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Slit Separation (<InlineMath math="d" />): {slitSeparationMm} mm</span>
              <span className="text-violet-400">d</span>
            </div>
            <input
              type="range" min="0.05" max="0.8" step="0.05"
              value={slitSeparationMm} onChange={e => setSlitSeparationMm(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Screen Distance (<InlineMath math="D" />): {screenDistanceM} m</span>
              <span className="text-emerald-400">D</span>
            </div>
            <input
              type="range" min="0.5" max="3" step="0.1"
              value={screenDistanceM} onChange={e => setScreenDistanceM(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center">
          <span className="text-[12px] uppercase font-bold text-white/35">Calculated Fringe Width <InlineMath math="\beta" /></span>
          <p className="text-[21px] font-bold text-cyan-400 my-1">
            {fringeWidthResult ? `${(fringeWidthResult * 1e3).toFixed(3)} mm` : 'Error'}
          </p>
        </div>
      </div>

      {/* PART 6: BREWSTER & CRITICAL ANGLE SOLVER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Brewster vs. Critical Angle Solver</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Enter the medium's refractive index <InlineMath math="\mu" /> to compare Brewster's polarizing angle (reflection) and the critical angle for TIR (refraction boundary).
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Refractive Index <InlineMath math="\mu" />:</label>
            <input
              type="number" step="0.05" min="1.0"
              value={refractiveIndex}
              onChange={e => setRefractiveIndex(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-cyan-500/40"
            />
          </div>
 <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-white/35">Brewster Angle <InlineMath math="i_p" /></span>
              <span className="text-[13px] font-bold text-cyan-400 mt-1">
                {brewsterAngleDeg ? `${brewsterAngleDeg.toFixed(2)}°` : 'Error'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-white/35">Critical Angle <InlineMath math="C" /></span>
              <span className="text-[13px] font-bold text-rose-400 mt-1">
                {criticalAngleDeg ? `${criticalAngleDeg.toFixed(2)}°` : 'NaN / None'}
              </span>
            </div>
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

        {/* Example 1: Glass slab */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Glass slab fringe shift</span>
          <p className="text-white/80">In a YDSE setup, a thin mica sheet of thickness 12 μm and refractive index 1.5 is placed in front of one of the slits. If screen distance is 1 m and slit separation is 0.4 mm: (a) find the linear shift of the central maxima, and (b) calculate the number of fringes shifted if light of wavelength 600 nm is used.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Shift formula: <InlineMath math="\Delta y = \frac{D}{d}(\mu - 1)t" />.</p>
            <p>2. Calculate shift: <InlineMath math="\Delta y = \frac{1}{0.4 \times 10^{-3}} \times (1.5 - 1) \times 12 \times 10^{-6} = 1.5 \times 10^{-2} \text{ m} = 1.5 \text{ cm}" />.</p>
            <p>3. Fringe width: <InlineMath math="\beta = \frac{\lambda D}{d} = \frac{600 \times 10^{-9} \times 1}{0.4 \times 10^{-3}} = 1.5 \times 10^{-3} \text{ m} = 1.5 \text{ mm}" />.</p>
            <p>4. Fringes shifted: <InlineMath math="n = \frac{\Delta y}{\beta} = \frac{(\mu - 1)t}{\lambda} = \frac{0.5 \times 12 \times 10^{-6}}{600 \times 10^{-9}} = 10" />.</p>
            <p className="text-cyan-300 font-bold">Fringe Shift = 1.5 cm | Number of fringes shifted <InlineMath math="n = 10" /></p>
          </div>
        </div>

        {/* Example 2: Three polarizers */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Three polarizers setup (Malus's Law)</span>
          <p className="text-white/80">Two polarizing sheets are crossed (axes at $90^\circ$), blocking all light. A third polarizing sheet is placed between them with its axis oriented at $45^\circ$ to the first polarizer. If unpolarized light of intensity $I_0$ is incident on the first sheet, calculate the final transmitted intensity.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. First polarizer: Unpolarized light <InlineMath math="I_0" /> becomes linearly polarized with intensity <InlineMath math="I_1 = \frac{I_0}{2}" />.</p>
            <p>2. Middle polarizer (at $45^\circ$ to the first): Transmitted intensity is <InlineMath math="I_2 = I_1 \cos^2(45^\circ) = \frac{I_0}{2} \cdot \left(\frac{1}{\sqrt{2}}\right)^2 = \frac{I_0}{4}" />.</p>
            <p>3. Third polarizer (at $90^\circ$ to the first, hence at $45^\circ$ to the middle): Transmitted intensity is <InlineMath math="I_3 = I_2 \cos^2(45^\circ) = \frac{I_0}{4} \cdot \left(\frac{1}{\sqrt{2}}\right)^2 = \frac{I_0}{8}" />.</p>
            <p className="text-cyan-300 font-bold">Transmitted Intensity = <InlineMath math="I_0/8" /> (Middle polarizer allows light to pass through!)</p>
          </div>
        </div>

        {/* Example 3: Missing wavelengths */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Missing wavelength in front of slit</span>
          <p className="text-white/80">In a YDSE setup, a detector is placed on the screen directly in front of slit <InlineMath math="S_1" /> (position <InlineMath math="y = d/2" />). If <InlineMath math="D = 1 \text{ m}" />, <InlineMath math="d = 2 \text{ mm}" />, and the source emits a continuous spectrum from 400 nm to 800 nm, find the missing wavelengths at the detector.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Path difference at position <InlineMath math="y" />: <InlineMath math="\Delta x = \frac{yd}{D} = \left(\frac{d}{2}\right)\left(\frac{d}{D}\right) = \frac{d^2}{2D}" />.</p>
            <p>2. Substitute: <InlineMath math="\Delta x = \frac{(2 \times 10^{-3})^2}{2(1)} = 2 \times 10^{-6} \text{ m} = 2000 \text{ nm}" />.</p>
            <p>3. Missing wavelengths (destructive interference): <InlineMath math="\Delta x = (2n - 1)\frac{\lambda}{2} \implies \lambda = \frac{2\Delta x}{2n - 1} = \frac{4000}{2n - 1} \text{ nm}" />.</p>
            <p>4. For <InlineMath math="n = 3" />: <InlineMath math="\lambda = 800 \text{ nm}" />. For <InlineMath math="n = 4" />: <InlineMath math="\lambda \approx 571.4 \text{ nm}" />. For <InlineMath math="n = 5" />: <InlineMath math="\lambda \approx 444.4 \text{ nm}" />.</p>
            <p className="text-cyan-300 font-bold">Missing Wavelengths = 800 nm, 571.4 nm, 444.4 nm</p>
          </div>
        </div>

        {/* Example 4: YDSE Fringes inside Diffraction Envelope */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 4: Missing orders due to diffraction envelope</span>
          <p className="text-white/80">In a YDSE setup, the double slit separation is <InlineMath math="2 \text{ mm}" /> and the width of each single slit is <InlineMath math="0.4 \text{ mm}" />. (a) Determine how many interference fringes fall within the central maximum of the diffraction envelope. (b) Explain why some orders are "missing".</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Central diffraction maximum width lies between <InlineMath math="\theta = \pm\lambda/a" />, giving angular width: <InlineMath math="2\theta_{\text{diff}} = 2\lambda/a" />.</p>
            <p>2. YDSE angular fringe width is: <InlineMath math="\theta_{\text{int}} = \lambda/d" />.</p>
            <p>3. Number of interference fringes inside central maximum: <InlineMath math="N = \frac{2d}{a} = \frac{2(2 \text{ mm})}{0.4 \text{ mm}} = 10" />.</p>
            <p>4. The 5th interference maximum condition <InlineMath math="d \sin\theta = 5\lambda" /> falls exactly on the 1st diffraction minimum <InlineMath math="a \sin\theta = 1\lambda" /> (since $d/a = 5$). Thus, the 5th and -5th interference bright fringes cannot receive light, making them <strong>missing orders</strong>.</p>
            <p className="text-cyan-300 font-bold">Number of fringes inside central max = 10 | Missing orders = 5th, 15th, 25th, etc.</p>
          </div>
        </div>

        {/* Example 5: Grating Order Limits & Telescope Resolution */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 5: Grating spectrum orders &amp; Telescope Resolving Power</span>
          <p className="text-white/80">A diffraction grating has 5000 lines per cm. (a) Find the maximum order visible for light of wavelength <InlineMath math="500 \text{ nm}" /> at normal incidence. (b) Calculate the resolving power of an astronomical telescope with an objective lens diameter of <InlineMath math="2.54 \text{ m}" /> at the same wavelength.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Grating element: <InlineMath math="(a + b) = \frac{1}{5000} \text{ cm} = 2 \times 10^{-6} \text{ m}" />.</p>
            <p>2. Grating equation: <InlineMath math="(a + b)\sin\theta = n\lambda \implies n = \frac{(a+b)\sin\theta}{\lambda}" />.</p>
            <p>3. Maximum order occurs when <InlineMath math="\sin\theta = 1" />: <InlineMath math="n_{\text{max}} = \frac{a+b}{\lambda} = \frac{2 \times 10^{-6}}{500 \times 10^{-9}} = 4" />.</p>
            <p>4. Telescope resolving power formula: <InlineMath math="\text{Resolving Power} = \frac{D}{1.22\lambda}" />.</p>
            <p>5. Substitute values: <InlineMath math="\text{RP} = \frac{2.54}{1.22 \times 500 \times 10^{-9}} \approx 4.16 \times 10^6" />.</p>
            <p className="text-cyan-300 font-bold">Max visible grating order = 4 | Telescope Resolving Power = 4.16 × 10⁶</p>
          </div>
        </div>
      </div>

      {/* MEMORY BOX */}
 <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-3 text-center">
        <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-widest block">💡 Core Memory Card</span>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-2">
          <div className="p-3 bg-black/45 rounded-xl border border-white/5">
            <span className="text-[12px] font-bold text-cyan-400 block mb-1">YDSE Setup</span>
            <p className="text-[13px] text-white/80">Bright: <InlineMath math="d \sin\theta = n\lambda" /></p>
            <p className="text-[13px] text-white/50">Dark: <InlineMath math="d \sin\theta = (n - 1/2)\lambda" /></p>
          </div>
          <div className="p-3 bg-black/45 rounded-xl border border-white/5">
            <span className="text-[12px] font-bold text-violet-400 block mb-1">Diffraction Setup</span>
            <p className="text-[13px] text-white/80">Minima: <InlineMath math="a \sin\theta = n\lambda" /></p>
            <p className="text-[13px] text-white/50">Maxima: <InlineMath math="a \sin\theta \approx (n + 1/2)\lambda" /></p>
          </div>
        </div>
        <p className="text-[10px] text-white/40 mt-1">Note the conditions are mathematically flipped between setups!</p>
      </div>

      {/* FORMULA COMPARISON TABLE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Cheat Sheet</h2>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
                <th className="text-left px-4 py-2.5">Concept</th>
                <th className="text-left px-4 py-2.5">Formula</th>
                <th className="text-left px-4 py-2.5 text-cyan-300">Variables</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Phase Difference', '\\Delta\\phi = \\frac{2\\pi}{\\lambda} \\Delta x', '$\lambda$ = wavelength, $\Delta x$ = path difference'],
                ['Linear Fringe Width', '\\beta = \\frac{\\lambda D}{d}', '$d$ = slit separation, $D$ = screen distance'],
                ['Angular Fringe Width', '\\theta = \\frac{\\lambda}{d}', 'Independent of $D$. Angle subtended by a fringe'],
                ['Diffraction Minima', 'a \\sin\\theta = n\\lambda', '$a$ = slit width, $\theta$ = deviation angle'],
                ['Diffraction Grating', '(a + b) \\sin \\theta = n\\lambda', '$(a + b)$ = grating element, $n$ = spectrum order'],
                ['Telescope Resolving Power', '\\text{RP} = \\frac{D}{1.22 \\lambda}', '$D$ = objective aperture diameter, $\lambda$ = wavelength'],
                ['Microscope Resolving Power', '\\text{RP} = \\frac{2n \\sin \\theta}{1.22 \\lambda}', '$n \sin \theta$ = numerical aperture, $\theta$ = light cone angle'],
                ['Specific Rotation', 's = \\frac{\\theta}{l \\cdot c}', '$\theta$ = rotation angle, $l$ = length (dm), $c$ = concentration'],
                ['Malus\'s Law', 'I = I_0 \\cos^2\\theta', '$I_0$ = polarized input, $\theta$ = relative angle'],
                ['Brewster\'s Law', '\\tan i_p = \\mu', '$i_p$ = polarizing angle, $\mu$ = refractive index'],
                ['Glass Slab Shift', '\\Delta y = \\frac{D}{d}(\\mu - 1)t', '$t$ = slab thickness, $\mu$ = slab index'],
              ].map(([concept, form, vars]) => (
                <tr key={concept} className="border-b border-white/5 last:border-0 text-white/70">
                  <td className="px-4 py-3 font-semibold text-white/80">{concept}</td>
                  <td className="px-4 py-3 text-cyan-300 font-bold"><InlineMath math={form} /></td>
                  <td className="px-4 py-3 text-white/50">{renderMathText(vars)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
            { id: 'formulas', label: '📊 Wavefront & Slit Relations' },
            { id: 'shift', label: '👓 Slab Shifts & Wavelengths' },
            { id: 'polarization', label: '🕶️ Polarizers & Reflection' },
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
          {selectedGoal === 'formulas' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Select basic YDSE or diffraction formulas</span>
              <p className="text-white/70">1. To find fringe spacing: use <InlineMath math="\beta = \frac{\lambda D}{d}" />. Angular width: <InlineMath math="\theta = \frac{\lambda}{d}" />.</p>
              <p className="text-white/70">2. To find YDSE dark band positions: use <InlineMath math="y = (2n - 1)\frac{\lambda D}{2d}" />.</p>
              <p className="text-white/70">3. To find diffraction central maximum width: use <InlineMath math="W = \frac{2\lambda D}{a}" />. For circular apertures: <InlineMath math="\theta \approx \frac{1.22\lambda}{d}" />.</p>
              <p className="text-white/70">4. For grating lines: use <InlineMath math="(a + b) \sin\theta = n\lambda" />.</p>
            </>
          )}
          {selectedGoal === 'shift' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Shift, missing orders, or resolving power</span>
              <p className="text-white/70">1. Number of fringes shifted after placing slab: <InlineMath math="n_{\text{shift}} = \frac{(\mu - 1)t}{\lambda}" />.</p>
              <p className="text-white/70">2. Number of YDSE fringes inside diffraction central maximum: <InlineMath math="N = \frac{2d}{a}" />.</p>
              <p className="text-white/70">3. Telescope resolving power: <InlineMath math="\text{RP} = \frac{D}{1.22\lambda}" />. Microscope resolving power: <InlineMath math="\text{RP} = \frac{2n\sin\theta}{1.22\lambda}" />.</p>
            </>
          )}
          {selectedGoal === 'polarization' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Analyze polarizers, Brewster angle, or optical activity</span>
              <p className="text-white/70">1. Unpolarized light incident on 1st sheet: intensity is cut in half: <InlineMath math="I = \frac{I_0}{2}" />.</p>
              <p className="text-white/70">2. Subsequent polarized sheets: use Malus's: <InlineMath math="I_{\text{out}} = I_{\text{in}} \cos^2\theta" />.</p>
              <p className="text-white/70">3. Polarizing angle relation: <InlineMath math="\tan i_p = \mu" />.</p>
              <p className="text-white/70">4. Rotation of polarization plane: Specific rotation <InlineMath math="s = \frac{\theta}{l \cdot c}" />.</p>
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
            { cue: '"YDSE setup is immersed in a liquid of index $\mu$"', think: "Fringe width shrinks: $\beta' = \frac{\beta}{\mu}$ because $\lambda$ shrinks to $\frac{\lambda}{\mu}$." },
            { cue: '"How many interference fringes lie inside the central diffraction envelope?"', think: "Divide central max width by fringe width: $N = \frac{2d}{a}$. If $d/a = m$, the $m$-th YDSE order is a missing order." },
            { cue: '"Thin sheet of thickness $t$ is placed in front of one slit"', think: "Shift of central max: $\Delta y = \frac{D}{d}(\mu - 1)t$. Number of shifted fringes $n = \frac{(\mu - 1)t}{\lambda}$." },
            { cue: '"Unpolarized light passes through a polarizer"', think: "The first polarizer always cuts the intensity exactly in half: $I_{\text{out}} = \frac{I_0}{2}$." },
            { cue: '"Calculate the specific rotation of sugar solution"', think: "Specific rotation $s = \frac{\theta}{l \cdot c}$. Note that length $l$ must be in decimeters ($1 \text{ dm} = 10 \text{ cm}$)." },
            { cue: '"Reflected and refracted rays are perpendicular"', think: "Brewster's angle condition: $\tan i_p = \mu$. Reflected light is completely polarized." },
            { cue: '"Find the resolving power or Rayleigh limit"', think: "$\text{RP} = \frac{D}{1.22\lambda}$ for telescopes, or $\text{RP} = \frac{2n\sin\theta}{1.22\lambda}$ for microscopes." },
            { cue: '"Central maximum width in diffraction"', think: "$W = \frac{2\lambda D}{a}$. Note that central max is twice as wide as secondary fringes." },
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
          <TrapCard title="Trap 1: The First Polarizer Reduction">
            When unpolarized light of intensity <InlineMath math="I_0" /> passes through the very first polarizer, its intensity is <strong>halved to <InlineMath math="I_0/2" /></strong>, regardless of the polarizer's angle. Malus's Law applies only starting from the second polarizer.
          </TrapCard>
          <TrapCard title="Trap 2: Slit Width vs. Slit Separation variables">
            Do not mix up <InlineMath math="d" /> and <InlineMath math="a" />! <InlineMath math="d" /> is the separation between the two slits in YDSE (determines fringe spacing). <InlineMath math="a" /> is the width of a single slit in diffraction (determines central max size).
          </TrapCard>
          <TrapCard title="Trap 3: Diffraction Maxima Condition is ONLY an Approximation">
            The formula <InlineMath math="a \sin\theta = (n + 1/2)\lambda" /> is only an <strong>approximation</strong> for secondary maxima. The exact maxima are found by solving the transcendental equation <InlineMath math="\tan\alpha = \alpha" /> (where <InlineMath math="\alpha = \frac{\pi a \sin\theta}{\lambda}" />), which gives values slightly smaller than <InlineMath math="(n + 1/2)\pi" />.
          </TrapCard>
          <TrapCard title="Trap 4: Specific Rotation Units">
            In <InlineMath math="s = \frac{\theta}{l \cdot c}" />, length <InlineMath math="l" /> MUST be expressed in <strong>decimeters</strong> (dm), and concentration <InlineMath math="c" /> in <strong><InlineMath math="\text{g/cm}^3" /></strong>. If the problem gives length in cm, divide by 10 before using the formula.
          </TrapCard>
          <TrapCard title="Trap 5: Resolving Power vs. Limit of Resolution">
            Do not confuse the two! <strong>Resolving power</strong> is the reciprocal of the <strong>limit of resolution</strong>. For telescope, resolution limit is <InlineMath math="d\theta = \frac{1.22\lambda}{D}" /> (smaller is better), whereas Resolving Power is <InlineMath math="\frac{D}{1.22\lambda}" /> (larger is better).
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
            "Wavefront: Point source = Spherical; Line source = Cylindrical; Distant = Plane",
            "Huygens: secondary wavelets travel at speed of light, envelope is new wavefront",
            "Resultant intensity: $I = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos(\Delta\phi)$ ($4I_0 \cos^2(\Delta\phi/2)$ if symmetric)",
            "YDSE Bright fringes: $\Delta x = n\lambda$ | Dark fringes: $\Delta x = (n - 1/2)\lambda$",
            "Fringe Width: $\beta = \frac{\lambda D}{d}$ (Linear) | $\theta = \frac{\lambda}{d}$ (Angular, independent of $D$)",
            "White light in YDSE: Central white fringe flanked by colored fringes",
            "Slab Shift: $\Delta y = \frac{D}{d}(\mu - 1)t$. Number of fringes shifted $n = \frac{(\mu - 1)t}{\lambda}$",
            "Source Slit Shift: moving $S$ down by $y_s$ shifts pattern up by $\frac{D}{d_s} y_s$",
            "Diffraction Minima: $a \sin\theta = n\lambda$ | Central maximum angular width = $\frac{2\lambda}{a}$",
            "Diffraction vs YDSE: Central max is twice as wide as secondary maxima",
            "Diffraction Grating: $(a + b)\sin\theta = n\lambda$ (determines spectral lines)",
            "Airy Disk: circular aperture diffraction with limit $\theta = \frac{1.22\lambda}{d}$",
            "Resolving Power: Telescope = $\frac{D}{1.22\lambda}$ | Microscope = $\frac{2n\sin\theta}{1.22\lambda}$",
            "Planes: Vibration plane contains E-field; Polarisation plane is perpendicular to it",
            "Polaroids: tourmaline/sheets utilizing dichroism to produce plane-polarized light",
            "Optical Activity: $s = \frac{\theta}{l \cdot c}$. Specific rotation of dextro/laevo substances",
            "Double Refraction: splits light into Ordinary (O-ray) and Extraordinary (E-ray)"
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
