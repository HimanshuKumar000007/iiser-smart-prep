import React, { useState } from 'react';
import {
  Star, AlertTriangle, CheckCircle,
  BookOpen, Flame, Target, RefreshCw, Sparkles, HelpCircle, ArrowRight, Zap, Info,
  Layers, Activity, Sliders, Play
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
      <p className="font-mono text-cyan-300 font-bold text-[14px] sm:text-base bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-500/10 inline-block" dangerouslySetInnerHTML={{ __html: formula }} />
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
      <div className="text-white/70 text-[13px] leading-relaxed">{children}</div>
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
      <div className="text-white/75 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

// ─── STATIC SVGS ─────────────────────────────────────────────────────────────
function BornHaberCycleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
      <p className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-semibold">Fig 1 — Born-Haber Cycle for NaCl (Lattice Enthalpy &Delta;<i>H</i><sub>L</sub> derivation)</p>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 170 }}>
        {/* Direct Path */}
        <text x="35" y="145" fill="#e2e8f0" fontSize="7.5" fontFamily="monospace">Na(s) + ½ Cl₂(g)</text>
        <line x1="120" y1="140" x2="215" y2="140" stroke="#f43f5e" strokeWidth="1.2" />
        <path d="M 215 140 L 210 137 M 215 140 L 210 143" stroke="#f43f5e" strokeWidth="1.2" />
        <text x="165" y="152" fill="#f43f5e" fontSize="7" fontFamily="monospace" textAnchor="middle">ΔHf (Formation)</text>
        <text x="225" y="145" fill="#38bdf8" fontSize="7.5" fontFamily="monospace">NaCl(s)</text>

        {/* Step 1: Sublimation */}
        <line x1="75" y1="130" x2="75" y2="90" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 75 90 L 72 95 M 75 90 L 78 95" stroke="#cbd5e1" strokeWidth="1" />
        <text x="70" y="112" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="end">ΔHsub</text>
        <text x="50" y="82" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">Na(g) + ½ Cl₂(g)</text>

        {/* Step 2: Ionization */}
        <line x1="75" y1="70" x2="75" y2="30" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 75 30 L 72 35 M 75 30 L 78 35" stroke="#cbd5e1" strokeWidth="1" />
        <text x="70" y="52" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="end">I.E.</text>
        <text x="45" y="22" fill="#a78bfa" fontSize="7.5" fontFamily="monospace">Na⁺(g) + e⁻ + ½ Cl₂(g)</text>

        {/* Step 3: Dissociation */}
        <line x1="160" y1="22" x2="225" y2="22" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 225 22 L 220 19 M 225 22 L 220 25" stroke="#cbd5e1" strokeWidth="1" />
        <text x="192" y="16" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="middle">½ ΔHdiss</text>
        <text x="235" y="22" fill="#a78bfa" fontSize="7.5" fontFamily="monospace">Na⁺(g) + e⁻ + Cl(g)</text>

        {/* Step 4: Electron Gain */}
        <line x1="265" y1="30" x2="265" y2="70" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 265 70 L 262 65 M 265 70 L 268 65" stroke="#cbd5e1" strokeWidth="1" />
        <text x="270" y="52" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="start">ΔegH (negative)</text>
        <text x="235" y="82" fill="#f472b6" fontSize="7.5" fontFamily="monospace">Na⁺(g) + Cl⁻(g)</text>

        {/* Step 5: Lattice Formation */}
        <line x1="250" y1="92" x2="250" y2="130" stroke="#34d399" strokeWidth="1.2" />
        <path d="M 250 130 L 247 125 M 250 130 L 253 125" stroke="#34d399" strokeWidth="1.2" />
        <text x="256" y="112" fill="#34d399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">U (Lattice energy released)</text>
      </svg>
    </div>
  );
}

function PolarizationSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
      <p className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-semibold">Fig 2 — Cation Polarization of Anion Electron Cloud (Fajan's Rules)</p>
      <svg viewBox="0 0 340 110" className="w-full" style={{ maxHeight: 100 }}>
        {/* Left Side: Unpolarized */}
        <g transform="translate(10, 10)">
          <circle cx="35" cy="45" r="12" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.2" />
          <text x="35" y="48" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">+</text>
          <text x="35" y="72" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Cation</text>

          <circle cx="95" cy="45" r="22" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="95" y="48" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">-</text>
          <text x="95" y="82" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Anion (Spherical)</text>

          <text x="65" y="10" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace" textAnchor="middle">No Distortion (Ionic)</text>
        </g>

        {/* Arrow */}
        <path d="M 155 55 L 185 55" fill="none" stroke="#eab308" strokeWidth="1.5" />
        <path d="M 185 55 L 180 52 M 185 55 L 180 58" fill="none" stroke="#eab308" strokeWidth="1.5" />

        {/* Right Side: Polarized */}
        <g transform="translate(195, 10)">
          <circle cx="30" cy="45" r="12" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.2" />
          <text x="30" y="48" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">+</text>

          {/* Polarized Anion (Elliptical shape) */}
          <path d="M 52,45 C 52,25 98,25 98,45 C 98,65 52,65 52,45 Z" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.2" />
          <text x="80" y="48" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">-</text>
          <text x="75" y="82" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Covalent Character</text>

          <text x="65" y="10" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Polarized Cloud</text>
        </g>
      </svg>
    </div>
  );
}

function VseprGeometriesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
      <p className="text-[10px] uppercase tracking-wider text-violet-400/70 font-semibold">Fig 3 — Steric 5 VSEPR Geometries</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Seesaw - SF4 */}
        <g transform="translate(10, 10)">
          <circle cx="45" cy="50" r="7" fill="#fff" />
          <text x="45" y="53" fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>
          <line x1="45" y1="50" x2="45" y2="20" stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1="45" y1="50" x2="45" y2="80" stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1="45" y1="50" x2="20" y2="65" stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1="45" y1="50" x2="70" y2="65" stroke="#cbd5e1" strokeWidth="1.2" />
          <circle cx="45" cy="20" r="4" fill="#38bdf8" />
          <circle cx="45" cy="80" r="4" fill="#38bdf8" />
          <circle cx="20" cy="65" r="4" fill="#38bdf8" />
          <circle cx="70" cy="65" r="4" fill="#38bdf8" />
          <path d="M 45,50 C 50,45 68,45 65,52 C 62,59 50,55 45,50 Z" fill="#fb7185" fillOpacity="0.4" stroke="#fb7185" strokeWidth="0.8" />
          <circle cx="58" cy="49" r="1" fill="#fff" />
          <circle cx="61" cy="51" r="1" fill="#fff" />
          <text x="45" y="98" fill="#e2e8f0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Seesaw (SF₄)</text>
        </g>

        {/* T-Shape - ClF3 */}
        <g transform="translate(125, 10)">
          <circle cx="45" cy="50" r="7" fill="#fff" />
          <text x="45" y="53" fill="#000" fontSize="6.5" fontWeight="bold" textAnchor="middle">Cl</text>
          <line x1="45" y1="50" x2="45" y2="20" stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1="45" y1="50" x2="45" y2="80" stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1="45" y1="50" x2="15" y2="50" stroke="#cbd5e1" strokeWidth="1.2" />
          <circle cx="45" cy="20" r="4" fill="#38bdf8" />
          <circle cx="45" cy="80" r="4" fill="#38bdf8" />
          <circle cx="15" cy="50" r="4" fill="#38bdf8" />
          <path d="M 45,50 C 50,42 68,36 68,47 C 68,54 50,52 45,50 Z" fill="#fb7185" fillOpacity="0.4" stroke="#fb7185" strokeWidth="0.8" />
          <path d="M 45,50 C 50,58 68,64 68,53 C 68,46 50,48 45,50 Z" fill="#fb7185" fillOpacity="0.4" stroke="#fb7185" strokeWidth="0.8" />
          <text x="45" y="98" fill="#e2e8f0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">T-Shaped (ClF₃)</text>
        </g>

        {/* Linear - XeF2 */}
        <g transform="translate(240, 10)">
          <circle cx="45" cy="50" r="7" fill="#fff" />
          <text x="45" y="53" fill="#000" fontSize="6.5" fontWeight="bold" textAnchor="middle">Xe</text>
          <line x1="45" y1="50" x2="45" y2="20" stroke="#cbd5e1" strokeWidth="1.2" />
          <line x1="45" y1="50" x2="45" y2="80" stroke="#cbd5e1" strokeWidth="1.2" />
          <circle cx="45" cy="20" r="4" fill="#38bdf8" />
          <circle cx="45" cy="80" r="4" fill="#38bdf8" />
          <path d="M 45,50 C 53,40 70,40 65,50 C 60,60 53,55 45,50 Z" fill="#fb7185" fillOpacity="0.3" stroke="#fb7185" strokeWidth="0.8" />
          <path d="M 45,50 C 37,40 20,40 25,50 C 30,60 37,55 45,50 Z" fill="#fb7185" fillOpacity="0.3" stroke="#fb7185" strokeWidth="0.8" />
          <path d="M 45,50 C 53,60 70,60 65,50 C 60,40 53,45 45,50 Z" fill="#fb7185" fillOpacity="0.3" stroke="#fb7185" strokeWidth="0.8" />
          <text x="45" y="98" fill="#e2e8f0" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Linear (XeF₂)</text>
        </g>
      </svg>
    </div>
  );
}

function MOTDiagramSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
      <p className="text-[10px] uppercase tracking-wider text-emerald-400/70 font-semibold">Fig 4 — s-p Mixing Inversion (Total e⁻ ≤ 14 vs. Total e⁻ &gt; 14)</p>
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 140 }}>
        {/* N2 (Total e- <= 14) */}
        <g transform="translate(10, 10)">
          <text x="70" y="15" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">Valence MOs (e⁻ &le; 14)</text>
          <line x1="15" y1="130" x2="15" y2="25" stroke="#475569" strokeWidth="1" />
          <path d="M 15 25 L 12 30 M 15 25 L 18 30" stroke="#475569" strokeWidth="1" />
          <text x="10" y="80" fill="#475569" fontSize="6.5" transform="rotate(-90 10 80)" textAnchor="middle">Energy</text>

          <rect x="55" y="30" width="30" height="8" fill="none" stroke="#fb7185" strokeWidth="1" />
          <text x="70" y="37" fill="#fb7185" fontSize="6" fontFamily="monospace" textAnchor="middle">σ* 2pz</text>

          <rect x="35" y="48" width="30" height="8" fill="none" stroke="#fb7185" strokeWidth="1" />
          <rect x="75" y="48" width="30" height="8" fill="none" stroke="#fb7185" strokeWidth="1" />
          <text x="70" y="55" fill="#fb7185" fontSize="6" fontFamily="monospace" textAnchor="middle">π* 2px,y</text>

          {/* s-p mixing pushes this orbital UP */}
          <rect x="55" y="66" width="30" height="8" fill="none" stroke="#34d399" strokeWidth="1.2" />
          <text x="70" y="73" fill="#34d399" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">σ 2pz</text>

          <rect x="35" y="84" width="30" height="8" fill="none" stroke="#38bdf8" strokeWidth="1" />
          <rect x="75" y="84" width="30" height="8" fill="none" stroke="#38bdf8" strokeWidth="1" />
          <text x="70" y="91" fill="#38bdf8" fontSize="6" fontFamily="monospace" textAnchor="middle">π 2px,y</text>
        </g>

        {/* O2 / F2 (Total e- > 14) */}
        <g transform="translate(180, 10)">
          <text x="70" y="15" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Valence MOs (e⁻ &gt; 14)</text>

          <rect x="55" y="30" width="30" height="8" fill="none" stroke="#fb7185" strokeWidth="1" />
          <text x="70" y="37" fill="#fb7185" fontSize="6" fontFamily="monospace" textAnchor="middle">σ* 2pz</text>

          <rect x="35" y="48" width="30" height="8" fill="none" stroke="#fb7185" strokeWidth="1" />
          <rect x="75" y="48" width="30" height="8" fill="none" stroke="#fb7185" strokeWidth="1" />
          <text x="70" y="55" fill="#fb7185" fontSize="6" fontFamily="monospace" textAnchor="middle">π* 2px,y</text>

          <rect x="35" y="66" width="30" height="8" fill="none" stroke="#38bdf8" strokeWidth="1" />
          <rect x="75" y="66" width="30" height="8" fill="none" stroke="#38bdf8" strokeWidth="1" />
          <text x="70" y="73" fill="#38bdf8" fontSize="6" fontFamily="monospace" textAnchor="middle">π 2px,y</text>

          {/* No s-p mixing: this orbital is LOWEST */}
          <rect x="55" y="84" width="30" height="8" fill="none" stroke="#34d399" strokeWidth="1.2" />
          <text x="70" y="91" fill="#34d399" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">σ 2pz</text>
        </g>
      </svg>
    </div>
  );
}

function HBondingSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
      <p className="text-[10px] uppercase tracking-wider text-amber-400/70 font-semibold">Fig 5 — Hydrogen Bonding: Intermolecular vs Intramolecular</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Left: Intermolecular */}
        <g transform="translate(10, 10)">
          <text x="70" y="15" fill="#22d3ee" fontSize="7.5" fontWeight="bold" textAnchor="middle">Intermolecular (HF association)</text>

          <text x="15" y="55" fill="#f43f5e" fontSize="9" fontWeight="bold">H</text>
          <line x1="25" y1="52" x2="40" y2="52" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="43" y="55" fill="#a78bfa" fontSize="9" fontWeight="bold">F</text>
          <line x1="53" y1="52" x2="68" y2="52" stroke="#fb7185" strokeWidth="1" strokeDasharray="3,3" />

          <text x="71" y="55" fill="#f43f5e" fontSize="9" fontWeight="bold">H</text>
          <line x1="81" y1="52" x2="96" y2="52" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="99" y="55" fill="#a78bfa" fontSize="9" fontWeight="bold">F</text>
          <line x1="109" y1="52" x2="124" y2="52" stroke="#fb7185" strokeWidth="1" strokeDasharray="3,3" />

          <text x="127" y="55" fill="#f43f5e" fontSize="9" fontWeight="bold">H</text>
          <text x="70" y="90" fill="#94a3b8" fontSize="6.5" textAnchor="middle">Boiling Point ↑ (Association)</text>
        </g>

        {/* Right: Intramolecular */}
        <g transform="translate(195, 10)">
          <text x="65" y="15" fill="#f472b6" fontSize="7.5" fontWeight="bold" textAnchor="middle">Intramolecular (o-Nitrophenol)</text>

          {/* Benzene Ring Schematic */}
          <polygon points="50,45 65,35 80,45 80,65 65,75 50,65" fill="none" stroke="#475569" strokeWidth="1" />
          {/* Phenol -OH */}
          <line x1="65" y1="35" x2="65" y2="25" stroke="#475569" strokeWidth="1" />
          <text x="61" y="21" fill="#a78bfa" fontSize="8" fontWeight="bold">O</text>
          <line x1="69" y1="18" x2="77" y2="18" stroke="#475569" strokeWidth="1" />
          <text x="79" y="21" fill="#f43f5e" fontSize="8" fontWeight="bold">H</text>

          {/* Nitro -NO2 */}
          <line x1="80" y1="45" x2="92" y2="41" stroke="#475569" strokeWidth="1" />
          <text x="94" y="44" fill="#a78bfa" fontSize="8" fontWeight="bold">N</text>
          <line x1="102" y1="41" x2="112" y2="45" stroke="#475569" strokeWidth="1" />
          <text x="114" y="49" fill="#a78bfa" fontSize="8">O</text>
          <line x1="97" y1="35" x2="97" y2="27" stroke="#475569" strokeWidth="1" />
          <text x="94" y="25" fill="#a78bfa" fontSize="8">O</text>

          {/* Hydrogen Bond */}
          <line x1="85" y1="18" x2="93" y2="21" stroke="#fb7185" strokeWidth="1.2" strokeDasharray="2,2" />

          <text x="65" y="90" fill="#94a3b8" fontSize="6.5" textAnchor="middle">Steam Volatile (Chelation)</text>
        </g>
      </svg>
    </div>
  );
}

function OrbitalOverlapsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
      <p className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-semibold">Fig 6 — Covalent Orbital Overlap Configurations</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* s-s overlap */}
        <g transform="translate(10, 15)">
          <circle cx="20" cy="35" r="12" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="32" cy="35" r="12" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="26" cy="35" r="2" fill="#fff" />
          <text x="26" y="65" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">s-s overlap (σ)</text>
        </g>
        {/* s-p overlap */}
        <g transform="translate(85, 15)">
          <circle cx="15" cy="35" r="10" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1" />
          <path d="M 23,35 C 23,25 35,25 35,35 C 35,45 23,45 23,35 Z" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
          <path d="M 47,35 C 47,25 35,25 35,35 C 35,45 47,45 47,35 Z" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="25" cy="35" r="2" fill="#fff" />
          <text x="31" y="65" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">s-p overlap (σ)</text>
        </g>
        {/* p-p head-on overlap */}
        <g transform="translate(165, 15)">
          <path d="M 10,35 C 10,25 22,25 22,35 C 22,45 10,45 10,35 Z" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
          <path d="M 34,35 C 34,25 22,25 22,35 C 22,45 34,45 34,35 Z" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
          <path d="M 26,35 C 26,25 38,25 38,35 C 38,45 26,45 26,35 Z" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
          <path d="M 50,35 C 50,25 38,25 38,35 C 38,45 50,45 50,35 Z" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="30" cy="35" r="2" fill="#fff" />
          <text x="30" y="65" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">p-p axial (σ)</text>
        </g>
        {/* p-p lateral overlap */}
        <g transform="translate(255, 15)">
          {/* Left dumbbell */}
          <path d="M 20,25 C 12,25 12,10 20,10 C 28,10 28,25 20,25 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
          <path d="M 20,25 C 12,25 12,40 20,40 C 28,40 28,25 20,25 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
          {/* Right dumbbell */}
          <path d="M 40,25 C 32,25 32,10 40,10 C 48,10 48,25 40,25 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
          <path d="M 40,25 C 32,25 32,40 40,40 C 48,40 48,25 40,25 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
          {/* Overlap dotted connections */}
          <line x1="20" y1="12" x2="40" y2="12" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="20" y1="38" x2="40" y2="38" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
          <text x="30" y="65" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle">p-p lateral (π)</text>
        </g>
      </svg>
    </div>
  );
}

function HybridLobesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
      <p className="text-[10px] uppercase tracking-wider text-violet-400/70 font-semibold">Fig 7 — Spatial Hybrid Orbital Shapes (Lobe Geometries)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* sp linear */}
        <g transform="translate(10, 10)">
          {/* Large right lobe, small left lobe */}
          <path d="M 45,50 C 45,42 75,40 75,50 C 75,60 45,58 45,50 Z" fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="1" />
          <path d="M 45,50 C 45,46 25,45 25,50 C 25,55 45,54 45,50 Z" fill="#22d3ee" fillOpacity="0.15" stroke="#22d3ee" strokeWidth="0.8" />
          {/* Large left lobe, small right lobe */}
          <path d="M 45,50 C 45,42 15,40 15,50 C 15,60 45,58 45,50 Z" fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="1" />
          <path d="M 45,50 C 45,46 65,45 65,50 C 65,55 45,54 45,50 Z" fill="#22d3ee" fillOpacity="0.15" stroke="#22d3ee" strokeWidth="0.8" />
          <circle cx="45" cy="50" r="3" fill="#fff" />
          <text x="45" y="98" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle">sp Linear (180°)</text>
        </g>
        {/* sp2 trigonal planar */}
        <g transform="translate(125, 10)">
          {/* Three lobes at 120 degrees */}
          {/* Lobe 1: Upwards */}
          <path d="M 45,50 C 37,50 35,20 45,20 C 55,20 53,50 45,50 Z" fill="#a78bfa" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
          {/* Lobe 2: Down-Left (240 deg) */}
          <path d="M 45,50 C 41,43 19,56 24,65 C 29,74 49,57 45,50 Z" fill="#a78bfa" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
          {/* Lobe 3: Down-Right (320 deg) */}
          <path d="M 45,50 C 49,43 71,56 66,65 C 61,74 41,57 45,50 Z" fill="#a78bfa" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="45" cy="50" r="3" fill="#fff" />
          <text x="45" y="98" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" textAnchor="middle">sp² Planar (120°)</text>
        </g>
        {/* sp3 tetrahedral */}
        <g transform="translate(240, 10)">
          {/* Four lobes in tetrahedral directions */}
          {/* Upwards */}
          <path d="M 45,50 C 39,50 37,22 45,22 C 53,22 51,50 45,50 Z" fill="#fb7185" fillOpacity="0.3" stroke="#fb7185" strokeWidth="1" />
          {/* Down-Left-Front */}
          <path d="M 45,50 C 41,43 20,60 27,69 C 34,78 49,57 45,50 Z" fill="#fb7185" fillOpacity="0.3" stroke="#fb7185" strokeWidth="1" />
          {/* Down-Right-Front */}
          <path d="M 45,50 C 49,43 70,60 63,69 C 56,78 41,57 45,50 Z" fill="#fb7185" fillOpacity="0.3" stroke="#fb7185" strokeWidth="1" />
          {/* Back (dashed or low opacity) */}
          <path d="M 45,50 C 51,46 59,51 55,62 C 51,73 41,54 45,50 Z" fill="#fb7185" fillOpacity="0.1" stroke="#fb7185" strokeWidth="0.8" strokeDasharray="2,1" />
          <circle cx="45" cy="50" r="3" fill="#fff" />
          <text x="45" y="98" fill="#fb7185" fontSize="8.5" fontFamily="monospace" textAnchor="middle">sp³ Tetrahedral (109.5°)</text>
        </g>
      </svg>
    </div>
  );
}

// ─── INTERACTIVE DATA ─────────────────────────────────────────────────────────

// Widget 1: VSEPR Molecular Database
interface VseprShapeItem {
  sn: number;
  bp: number;
  lp: number;
  geometry: string;
  shape: string;
  idealAngle: string;
  realAngle: string;
  example: string;
  explanation: string;
  bondsSvg: React.ReactNode;
}

const vseprDb: VseprShapeItem[] = [
  {
    sn: 2, bp: 2, lp: 0,
    geometry: "Linear", shape: "Linear",
    idealAngle: "180°", realAngle: "180°",
    example: "BeCl₂, CO₂, CS₂",
    explanation: "With two bond pairs and zero lone pairs, the bonds project in opposite directions to minimize repulsion, yielding a linear shape.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="10" y2="50" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="90" y2="50" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="10" cy="50" r="6" fill="#38bdf8" />
        <circle cx="90" cy="50" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 3, bp: 3, lp: 0,
    geometry: "Trigonal Planar", shape: "Trigonal Planar",
    idealAngle: "120°", realAngle: "120°",
    example: "BF₃, BCl₃",
    explanation: "Three electron clouds organize at 120° in a single plane, yielding a symmetric trigonal planar structure with no lone pair distortions.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="70" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="70" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="15" r="6" fill="#38bdf8" />
        <circle cx="20" cy="70" r="6" fill="#38bdf8" />
        <circle cx="80" cy="70" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 3, bp: 2, lp: 1,
    geometry: "Trigonal Planar", shape: "Bent (V-shape)",
    idealAngle: "120°", realAngle: "< 120° (e.g. ~119.5° in SO₂)",
    example: "SO₂, O₃",
    explanation: "The lone pair occupies one trigonal position. Because lp-bp repulsion exceeds bp-bp, it compresses the bonding angle below 120°.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="25" y2="80" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="75" y2="80" stroke="#94a3b8" strokeWidth="2" />
        {/* Lone Pair */}
        <path d="M 50,50 C 45,40 40,20 50,15 C 60,20 55,40 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="48" cy="22" r="1.5" fill="#fff" />
        <circle cx="52" cy="22" r="1.5" fill="#fff" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="25" cy="80" r="6" fill="#38bdf8" />
        <circle cx="75" cy="80" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 4, bp: 4, lp: 0,
    geometry: "Tetrahedral", shape: "Tetrahedral",
    idealAngle: "109.5°", realAngle: "109.5°",
    example: "CH₄, NH₄⁺, SiF₄",
    explanation: "A symmetric distribution in three dimensions gives 109.5° bond angles pointing to the corners of a tetrahedron.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="75" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="70" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,1" />
        <line x1="50" y1="50" x2="85" y2="70" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="15" r="6" fill="#38bdf8" />
        <circle cx="20" cy="75" r="6" fill="#38bdf8" />
        <circle cx="70" cy="80" r="6" fill="#38bdf8" />
        <circle cx="85" cy="70" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 4, bp: 3, lp: 1,
    geometry: "Tetrahedral", shape: "Trigonal Pyramidal",
    idealAngle: "109.5°", realAngle: "107° (in NH₃)",
    example: "NH₃, PCl₃, H₃O⁺",
    explanation: "One lone pair sits at the apex. Increased lp-bp repulsion pushes the three basal bonds downward, compressing the angles to ~107°.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="20" y2="75" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="70" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,1" />
        <line x1="50" y1="50" x2="80" y2="70" stroke="#94a3b8" strokeWidth="2" />
        {/* Lone Pair Apex */}
        <path d="M 50,50 C 45,40 40,20 50,15 C 60,20 55,40 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="48" cy="22" r="1.5" fill="#fff" />
        <circle cx="52" cy="22" r="1.5" fill="#fff" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="20" cy="75" r="6" fill="#38bdf8" />
        <circle cx="70" cy="80" r="6" fill="#38bdf8" />
        <circle cx="80" cy="70" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 4, bp: 2, lp: 2,
    geometry: "Tetrahedral", shape: "Bent (V-shape)",
    idealAngle: "109.5°", realAngle: "104.5° (in H₂O)",
    example: "H₂O, OF₂",
    explanation: "Two lone pairs sit on the oxygen. The extremely strong lp-lp repulsion, combined with lp-bp force, squashes the H-O-H angle down to 104.5°.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="25" y2="80" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="75" y2="80" stroke="#94a3b8" strokeWidth="2" />
        {/* Two Lone Pairs */}
        <path d="M 50,50 C 42,45 25,30 32,22 C 39,14 48,35 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <path d="M 50,50 C 58,45 75,30 68,22 C 61,14 52,35 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="31" cy="22" r="1.5" fill="#fff" />
        <circle cx="69" cy="22" r="1.5" fill="#fff" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="25" cy="80" r="6" fill="#38bdf8" />
        <circle cx="75" cy="80" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 5, bp: 5, lp: 0,
    geometry: "Trigonal Bipyramidal", shape: "Trigonal Bipyramidal",
    idealAngle: "90° (ax-eq) / 120° (eq-eq)", realAngle: "90° / 120°",
    example: "PCl₅",
    explanation: "Five valence clouds split: 3 equatorial positions at 120° spacing, and 2 axial positions at 90° to the equatorial plane.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="85" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="55" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="55" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="68" y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,1" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="15" r="6" fill="#38bdf8" />
        <circle cx="50" cy="85" r="6" fill="#38bdf8" />
        <circle cx="20" cy="55" r="6" fill="#38bdf8" />
        <circle cx="80" cy="55" r="6" fill="#38bdf8" />
        <circle cx="68" cy="70" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 5, bp: 4, lp: 1,
    geometry: "Trigonal Bipyramidal", shape: "Seesaw",
    idealAngle: "90° / 120°", realAngle: "87° (ax) / 101.5° (eq)",
    example: "SF₄",
    explanation: "Bent's rule: The lone pair demands higher s-character, securing an equatorial site. Axial bonds are forced backward, reducing angles.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="18" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="82" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="22" y2="60" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="72" y2="60" stroke="#94a3b8" strokeWidth="2" />
        {/* Equatorial LP */}
        <path d="M 50,50 C 58,45 80,45 78,52 C 76,59 58,55 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="70" cy="49" r="1.5" fill="#fff" />
        <circle cx="73" cy="51" r="1.5" fill="#fff" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="18" r="6" fill="#38bdf8" />
        <circle cx="50" cy="82" r="6" fill="#38bdf8" />
        <circle cx="22" cy="60" r="6" fill="#38bdf8" />
        <circle cx="72" cy="60" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 5, bp: 3, lp: 2,
    geometry: "Trigonal Bipyramidal", shape: "T-shaped",
    idealAngle: "90°", realAngle: "87.5°",
    example: "ClF₃, ICl₃",
    explanation: "Two lone pairs claim equatorial positions. The resulting electrostatic repulsion compresses the axial F-Cl-F spine into a slight 'T'.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="18" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="82" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="15" y2="50" stroke="#94a3b8" strokeWidth="2" />
        {/* Two equatorial LPs */}
        <path d="M 50,50 C 58,42 76,36 76,47 C 76,54 58,52 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <path d="M 50,50 C 58,58 76,64 76,53 C 76,46 58,48 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="68" cy="42" r="1.5" fill="#fff" />
        <circle cx="68" cy="58" r="1.5" fill="#fff" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="18" r="6" fill="#38bdf8" />
        <circle cx="50" cy="82" r="6" fill="#38bdf8" />
        <circle cx="15" cy="50" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 5, bp: 2, lp: 3,
    geometry: "Trigonal Bipyramidal", shape: "Linear",
    idealAngle: "180°", realAngle: "180°",
    example: "XeF₂, I₃⁻",
    explanation: "All three equatorial spots are occupied by lone pairs, arrayed symmetrically at 120° intervals. Their repulsions cancel, leaving the axial bonds linear.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="85" stroke="#94a3b8" strokeWidth="2" />
        {/* Three equatorial LPs */}
        <path d="M 50,50 C 58,40 76,40 72,50 C 68,60 58,55 50,50 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
        <path d="M 50,50 C 42,40 24,40 28,50 C 32,60 42,55 50,50 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
        <path d="M 50,50 C 58,60 76,60 72,50 C 68,40 58,45 50,50 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="15" r="6" fill="#38bdf8" />
        <circle cx="50" cy="85" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 6, bp: 6, lp: 0,
    geometry: "Octahedral", shape: "Octahedral",
    idealAngle: "90°", realAngle: "90°",
    example: "SF₆",
    explanation: "Six coordinate bonds point to the corners of a regular octahedron. All angles are exactly 90° and equivalent.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="85" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="35" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="65" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="35" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="65" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="15" r="6" fill="#38bdf8" />
        <circle cx="50" cy="85" r="6" fill="#38bdf8" />
        <circle cx="20" cy="35" r="6" fill="#38bdf8" />
        <circle cx="80" cy="65" r="6" fill="#38bdf8" />
        <circle cx="80" cy="35" r="6" fill="#38bdf8" />
        <circle cx="20" cy="65" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 6, bp: 5, lp: 1,
    geometry: "Octahedral", shape: "Square Pyramidal",
    idealAngle: "90°", realAngle: "< 90° (e.g. ~84.8° in BrF₅)",
    example: "BrF₅, IF₅",
    explanation: "One lone pair lies in an axial orbital. Its strong repulsion pushes the four equatorial bonds upward, compressing all angles to < 90°.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="40" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="60" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="60" stroke="#94a3b8" strokeWidth="2" />
        {/* Axial LP at the bottom */}
        <path d="M 50,50 C 45,60 45,80 50,85 C 55,80 55,60 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="48" cy="78" r="1.5" fill="#fff" />
        <circle cx="52" cy="78" r="1.5" fill="#fff" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="15" r="6" fill="#38bdf8" />
        <circle cx="20" cy="40" r="6" fill="#38bdf8" />
        <circle cx="80" cy="60" r="6" fill="#38bdf8" />
        <circle cx="80" cy="40" r="6" fill="#38bdf8" />
        <circle cx="20" cy="60" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 6, bp: 4, lp: 2,
    geometry: "Octahedral", shape: "Square Planar",
    idealAngle: "90°", realAngle: "90°",
    example: "XeF₄, ICl₄⁻",
    explanation: "Two lone pairs arrange 'trans' (top and bottom) to minimize LP-LP repulsion. Their axial forces cancel, leaving the square planar structure perfectly flat.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="20" y2="40" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="60" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="60" stroke="#94a3b8" strokeWidth="2" />
        {/* Two opposite LPs */}
        <path d="M 50,50 C 45,40 45,20 50,15 C 55,20 55,40 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <path d="M 50,50 C 45,60 45,80 50,85 C 55,80 55,60 50,50 Z" fill="#f43f5e" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="48" cy="22" r="1.5" fill="#fff" />
        <circle cx="52" cy="22" r="1.5" fill="#fff" />
        <circle cx="48" cy="78" r="1.5" fill="#fff" />
        <circle cx="52" cy="78" r="1.5" fill="#fff" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="20" cy="40" r="6" fill="#38bdf8" />
        <circle cx="80" cy="60" r="6" fill="#38bdf8" />
        <circle cx="80" cy="40" r="6" fill="#38bdf8" />
        <circle cx="20" cy="60" r="6" fill="#38bdf8" />
      </g>
    )
  },
  {
    sn: 7, bp: 7, lp: 0,
    geometry: "Pentagonal Bipyramidal", shape: "Pentagonal Bipyramidal",
    idealAngle: "72° (eq-eq) / 90° (ax-eq)", realAngle: "72° / 90°",
    example: "IF₇",
    explanation: "Maximum steric accommodation creates a flat pentagonal base (five equatorial bonds at 72° intervals) and two axial poles.",
    bondsSvg: (
      <g>
        <line x1="50" y1="50" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="85" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="50" x2="20" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="50" x2="80" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="50" x2="15" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="50" x2="85" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="50" y1="50" x2="50" y2="68" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,1" />
        <circle cx="50" cy="50" r="10" fill="#a78bfa" />
        <circle cx="50" cy="15" r="6" fill="#38bdf8" />
        <circle cx="50" cy="85" r="6" fill="#38bdf8" />
        <circle cx="20" cy="40" r="5" fill="#38bdf8" />
        <circle cx="80" cy="40" r="5" fill="#38bdf8" />
        <circle cx="15" cy="60" r="5" fill="#38bdf8" />
        <circle cx="85" cy="60" r="5" fill="#38bdf8" />
        <circle cx="50" cy="68" r="5" fill="#38bdf8" />
      </g>
    )
  }
];

// Widget 2: MOT Species Database
interface MotSpeciesItem {
  key: string;
  name: string;
  electrons: number;
  configHtml: string;
  nb: number;
  na: number;
  bo: number;
  magnetism: "Paramagnetic" | "Diamagnetic";
  unpaired: number;
  homo: string;
  lumo: string;
  stability: "Stable" | "Unstable" | "Metastable";
  mixing: boolean;
  explanation: string;
}

const motDb: Record<string, MotSpeciesItem> = {
  H2: {
    key: "H2", name: "Hydrogen molecule (H₂)", electrons: 2,
    configHtml: "(σ<sub>1s</sub>)<sup>2</sup>",
    nb: 2, na: 0, bo: 1.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "σ₁s", lumo: "σ*₁s", stability: "Stable", mixing: false,
    explanation: "Two electrons fill the bonding σ₁s orbital. Stable single bond with no unpaired spins."
  },
  H2_plus: {
    key: "H2_plus", name: "Hydrogen cation (H₂⁺)", electrons: 1,
    configHtml: "(σ<sub>1s</sub>)<sup>1</sup>",
    nb: 1, na: 0, bo: 0.5, magnetism: "Paramagnetic", unpaired: 1,
    homo: "σ₁s", lumo: "σ*₁s", stability: "Metastable", mixing: false,
    explanation: "Only one bonding electron. Weak half-bond, highly reactive and paramagnetic."
  },
  He2: {
    key: "He2", name: "Helium dimer (He₂)", electrons: 4,
    configHtml: "(σ<sub>1s</sub>)<sup>2</sup> (σ*<sub>1s</sub>)<sup>2</sup>",
    nb: 2, na: 2, bo: 0.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "σ*₁s", lumo: "σ₂s", stability: "Unstable", mixing: false,
    explanation: "Antibonding and bonding forces cancel. Bond order is 0.0, meaning the diatomic molecule does not exist in nature."
  },
  Li2: {
    key: "Li2", name: "Lithium dimer (Li₂)", electrons: 6,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup>",
    nb: 4, na: 2, bo: 1.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "σ₂s", lumo: "σ*₂s", stability: "Stable", mixing: false,
    explanation: "Inner K shells cancel (bonding/antibonding). Valence σ₂s is occupied. Exists in gas phase."
  },
  Be2: {
    key: "Be2", name: "Beryllium dimer (Be₂)", electrons: 8,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup>",
    nb: 4, na: 4, bo: 0.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "σ*₂s", lumo: "π₂p", stability: "Unstable", mixing: false,
    explanation: "Valence σ₂s and σ*₂s are both filled. Force cancels, so Be₂ is unstable and doesn't exist under ordinary conditions."
  },
  B2: {
    key: "B2", name: "Boron dimer (B₂)", electrons: 10,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>1</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>1</sup>",
    nb: 6, na: 4, bo: 1.0, magnetism: "Paramagnetic", unpaired: 2,
    homo: "π₂p", lumo: "σ₂pz", stability: "Stable", mixing: true,
    explanation: "s-p mixing forces π₂p to sit lower than σ₂p_z. Hund's rule splits the two electrons into degenerate π orbitals, causing paramagnetism."
  },
  C2: {
    key: "C2", name: "Dicarbon (C₂)", electrons: 12,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup>",
    nb: 8, na: 4, bo: 2.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "π₂p", lumo: "σ₂pz", stability: "Stable", mixing: true,
    explanation: "Due to s-p mixing, valence electrons fill both π₂p orbitals. Highly unusual: both bonds in C₂ are Pi (π) bonds!"
  },
  N2: {
    key: "N2", name: "Nitrogen molecule (N₂)", electrons: 14,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup>",
    nb: 10, na: 4, bo: 3.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "σ₂pz", lumo: "π*₂p", stability: "Stable", mixing: true,
    explanation: "Highest stability homonuclear species with a strong triple bond (1 σ, 2 π) and no unpaired spins."
  },
  N2_plus: {
    key: "N2_plus", name: "Nitrogen cation (N₂⁺)", electrons: 13,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>1</sup>",
    nb: 9, na: 4, bo: 2.5, magnetism: "Paramagnetic", unpaired: 1,
    homo: "σ₂pz", lumo: "σ₂pz", stability: "Stable", mixing: true,
    explanation: "An electron is removed from the bonding σ₂p_z. Bond order decreases to 2.5 and the species becomes paramagnetic."
  },
  N2_minus: {
    key: "N2_minus", name: "Nitrogen anion (N₂⁻)", electrons: 15,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup> (π*<sub>2p<sub>x</sub></sub>)<sup>1</sup>",
    nb: 10, na: 5, bo: 2.5, magnetism: "Paramagnetic", unpaired: 1,
    homo: "π*₂p", lumo: "π*₂p", stability: "Stable", mixing: true,
    explanation: "The extra electron enters the antibonding π*₂p orbital. The bond order drops to 2.5, making it less stable than neutral N₂."
  },
  O2: {
    key: "O2", name: "Oxygen molecule (O₂)", electrons: 16,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (π*<sub>2p<sub>x</sub></sub>)<sup>1</sup> = (π*<sub>2p<sub>y</sub></sub>)<sup>1</sup>",
    nb: 10, na: 6, bo: 2.0, magnetism: "Paramagnetic", unpaired: 2,
    homo: "π*₂p", lumo: "σ*₂pz", stability: "Stable", mixing: false,
    explanation: "No s-p mixing, so σ₂p_z sits lower than π₂p. The two valence electrons in the antibonding π*₂p are split singly, correctly predicting paramagnetism."
  },
  O2_plus: {
    key: "O2_plus", name: "Oxygen cation (O₂⁺)", electrons: 15,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (π*<sub>2p<sub>x</sub></sub>)<sup>1</sup>",
    nb: 10, na: 5, bo: 2.5, magnetism: "Paramagnetic", unpaired: 1,
    homo: "π*₂p", lumo: "π*₂p", stability: "Stable", mixing: false,
    explanation: "Removing an electron from an antibonding π* orbital strengthens the molecule: Bond order increases to 2.5!"
  },
  O2_minus: {
    key: "O2_minus", name: "Superoxide ion (O₂⁻)", electrons: 17,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (π*<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π*<sub>2p<sub>y</sub></sub>)<sup>1</sup>",
    nb: 10, na: 7, bo: 1.5, magnetism: "Paramagnetic", unpaired: 1,
    homo: "π*₂p", lumo: "σ*₂pz", stability: "Stable", mixing: false,
    explanation: "Adding one electron to the antibonding π* set lowers the bond order to 1.5. Paramagnetic."
  },
  O2_2minus: {
    key: "O2_2minus", name: "Peroxide ion (O₂²⁻)", electrons: 18,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (π*<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π*<sub>2p<sub>y</sub></sub>)<sup>2</sup>",
    nb: 10, na: 8, bo: 1.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "π*₂p", lumo: "σ*₂pz", stability: "Stable", mixing: false,
    explanation: "Both antibonding π* orbitals are filled. The bond order drops to 1.0, and the peroxide ion is diamagnetic."
  },
  F2: {
    key: "F2", name: "Fluorine molecule (F₂)", electrons: 18,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (π*<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π*<sub>2p<sub>y</sub></sub>)<sup>2</sup>",
    nb: 10, na: 8, bo: 1.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "π*₂p", lumo: "σ*₂pz", stability: "Stable", mixing: false,
    explanation: "Highly electronegative terminal atoms. Holds a weak single covalent bond, diamagnetic."
  },
  Ne2: {
    key: "Ne2", name: "Neon dimer (Ne₂)", electrons: 20,
    configHtml: "KK (σ<sub>2s</sub>)<sup>2</sup> (σ*<sub>2s</sub>)<sup>2</sup> (σ<sub>2p<sub>z</sub></sub>)<sup>2</sup> (π<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π<sub>2p<sub>y</sub></sub>)<sup>2</sup> (π*<sub>2p<sub>x</sub></sub>)<sup>2</sup> = (π*<sub>2p<sub>y</sub></sub>)<sup>2</sup> (σ*<sub>2p<sub>z</sub></sub>)<sup>2</sup>",
    nb: 10, na: 10, bo: 0.0, magnetism: "Diamagnetic", unpaired: 0,
    homo: "σ*₂pz", lumo: "None", stability: "Unstable", mixing: false,
    explanation: "All bonding and antibonding molecular orbitals are filled. Bond order is 0.0, making Ne₂ unstable and nonexistent."
  }
};

// Widget 3: Lewis Structure Trainer Data
interface TrainerConfig {
  formula: string;
  name: string;
  svgMarkup: React.ReactNode;
  atoms: { id: string; name: string; correctFc: number; valence: number; nonbond: number; shared: number }[];
}

const trainerDb: TrainerConfig[] = [
  {
    formula: "O₃",
    name: "Ozone",
    svgMarkup: (
      <svg viewBox="0 0 200 120" className="w-48 mx-auto">
        <circle cx="100" cy="30" r="16" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="2" />
        <text x="100" y="34" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">O (A)</text>
        <line x1="88" y1="42" x2="52" y2="78" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="112" y1="42" x2="148" y2="78" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="108" y1="46" x2="144" y2="82" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="40" cy="90" r="16" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />
        <text x="40" y="94" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">O (B)</text>
        <circle cx="160" cy="90" r="16" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="2" />
        <text x="160" y="94" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">O (C)</text>
      </svg>
    ),
    atoms: [
      { id: "A", name: "Central Oxygen (A)", correctFc: 1, valence: 6, nonbond: 2, shared: 6 },
      { id: "B", name: "Single-Bonded Oxygen (B)", correctFc: -1, valence: 6, nonbond: 6, shared: 2 },
      { id: "C", name: "Double-Bonded Oxygen (C)", correctFc: 0, valence: 6, nonbond: 4, shared: 4 }
    ]
  },
  {
    formula: "NH₄⁺",
    name: "Ammonium Cation",
    svgMarkup: (
      <svg viewBox="0 0 200 120" className="w-48 mx-auto">
        <circle cx="100" cy="60" r="16" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="2" />
        <text x="100" y="64" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">N (A)</text>
        <line x1="100" y1="44" x2="100" y2="15" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="100" y1="76" x2="100" y2="105" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="84" y1="60" x2="50" y2="60" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="116" y1="60" x2="150" y2="60" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="100" cy="15" r="8" fill="#38bdf8" /> <text x="100" y="18" fill="#fff" fontSize="8" textAnchor="middle">H</text>
        <circle cx="100" cy="105" r="8" fill="#38bdf8" /> <text x="100" y="108" fill="#fff" fontSize="8" textAnchor="middle">H</text>
        <circle cx="50" cy="60" r="8" fill="#38bdf8" /> <text x="50" y="63" fill="#fff" fontSize="8" textAnchor="middle">H</text>
        <circle cx="150" cy="60" r="8" fill="#38bdf8" /> <text x="150" y="63" fill="#fff" fontSize="8" textAnchor="middle">H</text>
      </svg>
    ),
    atoms: [
      { id: "A", name: "Central Nitrogen (A)", correctFc: 1, valence: 5, nonbond: 0, shared: 8 },
      { id: "B", name: "Hydrogen (any H)", correctFc: 0, valence: 1, nonbond: 0, shared: 2 }
    ]
  },
  {
    formula: "CO₃²⁻",
    name: "Carbonate Anion",
    svgMarkup: (
      <svg viewBox="0 0 200 120" className="w-48 mx-auto">
        <circle cx="100" cy="60" r="16" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="2" />
        <text x="100" y="64" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">C (A)</text>
        <line x1="100" y1="44" x2="100" y2="20" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="104" y1="44" x2="104" y2="20" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="86" y1="68" x2="52" y2="90" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="114" y1="68" x2="148" y2="90" stroke="#cbd5e1" strokeWidth="1.5" />
        <circle cx="102" cy="15" r="12" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="102" y="19" fill="#fff" fontSize="9" textAnchor="middle">O (B)</text>
        <circle cx="45" cy="95" r="12" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.5" />
        <text x="45" y="99" fill="#fff" fontSize="9" textAnchor="middle">O (C)</text>
        <circle cx="155" cy="95" r="12" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="1.5" />
        <text x="155" y="99" fill="#fff" fontSize="9" textAnchor="middle">O (D)</text>
      </svg>
    ),
    atoms: [
      { id: "A", name: "Central Carbon (A)", correctFc: 0, valence: 4, nonbond: 0, shared: 8 },
      { id: "B", name: "Double-Bonded Oxygen (B)", correctFc: 0, valence: 6, nonbond: 4, shared: 4 },
      { id: "C", name: "Single-Bonded Oxygen (C)", correctFc: -1, valence: 6, nonbond: 6, shared: 2 },
      { id: "D", name: "Single-Bonded Oxygen (D)", correctFc: -1, valence: 6, nonbond: 6, shared: 2 }
    ]
  }
];

export default function ChemicalBondingDetail({ progress, isCompleted, onNavigate }: Props) {
  // Widget Tab State
  const [activeTab, setActiveTab] = useState<'vsepr' | 'mot' | 'fc'>('vsepr');

  // Widget 1: VSEPR Explorer States
  const [vseprSN, setVseprSN] = useState<number>(4);
  const [vseprLP, setVseprLP] = useState<number>(0);

  // Filter valid BP/LP combinations for selection
  const validVseprItems = vseprDb.filter(item => item.sn === vseprSN);
  const availableLPs = Array.from(new Set(validVseprItems.map(item => item.lp))).sort((a,b) => a-b);
  const selectedVsepr = vseprDb.find(item => item.sn === vseprSN && item.lp === vseprLP) || validVseprItems[0];

  // Auto-adjust lone pair if selected SN changes
  const handleSNChange = (sn: number) => {
    setVseprSN(sn);
    const subItems = vseprDb.filter(item => item.sn === sn);
    setVseprLP(subItems[0].lp);
  };

  // Widget 2: MOT Calculator States
  const [motKey, setMotKey] = useState<string>("O2");
  const selectedMot = motDb[motKey] || motDb["O2"];

  // Widget 3: Lewis Structure Trainer States
  const [trainerIndex, setTrainerIndex] = useState(0);
  const [userFcInputs, setUserFcInputs] = useState<Record<string, number>>({});
  const [trainerFeedback, setTrainerFeedback] = useState<string | null>(null);

  const currentTrainer = trainerDb[trainerIndex];

  const handleFcSubmit = () => {
    let allCorrect = true;
    const errors: string[] = [];

    currentTrainer.atoms.forEach(atom => {
      const userVal = userFcInputs[atom.id];
      if (userVal === undefined) {
        allCorrect = false;
        errors.push(`${atom.name} is missing.`);
      } else if (Number(userVal) !== atom.correctFc) {
        allCorrect = false;
        errors.push(`${atom.name} is incorrect (You put ${userVal}).`);
      }
    });

    if (allCorrect) {
      const breakdowns = currentTrainer.atoms.map(atom => {
        return `• ${atom.name}: V = ${atom.valence}, L = ${atom.nonbond}, S = ${atom.shared}. FC = ${atom.valence} - ${atom.nonbond} - ½(${atom.shared}) = ${atom.correctFc >= 0 ? '+' + atom.correctFc : atom.correctFc}`;
      }).join('\n');
      setTrainerFeedback(`🎉 Correct! You assigned the formal charges perfectly.\n\nMathematical breakdown:\n${breakdowns}`);
    } else {
      setTrainerFeedback(`❌ Incorrect or incomplete. Double check valence electrons, shared bonds, and non-bonding electrons.\n\nErrors:\n${errors.join('\n')}`);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* ─── snapped snapshot header ────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-[#0d1027] to-violet-500/10 border border-white/8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest animate-pulse">Chemistry Unit 4</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest animate-pulse">IAT Advanced</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest font-mono">Weightage: 99/100</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-white leading-none tracking-tight">
              Chemical Bonding and Molecular Structure
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-white/60 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Master the physical forces driving molecules. Explore covalent/ionic transitions, Slater charge vectors, VSEPR angles, steric Bent's preferences, back bonding coordinates, and molecular orbital energy filler matrices.
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('smart_lessons')}
            className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/8 text-white/90 hover:text-white text-xs font-bold transition-all shrink-0 hover:scale-105 active:scale-95"
          >
            &larr; Return to Dashboard
          </button>
        </div>
      </div>

      {/* ─── 1. WHY CHEMICAL BONDS FORM ───────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5 shadow-xl">
        <SectionBanner label="01 / Fundamental Drivers of Chemical Bonding" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Potential Energy Minimization</h3>
            <p>
              Atoms combine to form chemical bonds primarily to achieve a <strong>lower potential energy state</strong> (greater stability). A bond is formed only if the net electrostatic forces of attraction between nuclei and electrons exceed the repulsion forces, causing a potential energy dip.
            </p>
            <p>
              The thermodynamic driver of bonding is represented as:
              <br />
              <code className="text-cyan-300 font-mono font-bold bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">ΔG = ΔH - TΔS &lt; 0</code>
            </p>
          </div>
          <div className="space-y-4">
            <TrapCard title="Octet Rule is Not the Fundamental Cause">
              <p className="text-white/60 text-[12.5px] leading-relaxed">
                A common misconception is that atoms bond <i>solely</i> to complete an octet. The octet rule is a useful empirical model with many exceptions; the absolute fundamental driver is always the <strong>minimization of net potential energy</strong>.
              </p>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── 2. KÖSSEL-LEWIS & OCTET RULE EXCEPTIONS ──────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="02 / Kössel-Lewis Approach &amp; Octet Exceptions" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Kössel-Lewis Dual Bonding Model</h3>
            <p>
              In 1916, Kössel and Lewis independently explained chemical bonding based on noble gas electronic configurations:
            </p>
            <p>
              • <strong>Lewis Covalent Sharing:</strong> Focuses on non-metallic elements sharing electron pairs to complete valence octets.
            </p>
            <p>
              • <strong>Kössel Electrostatic Transfer:</strong> Focuses on ionic/electrovalent bonds. Highly electropositive alkali/alkaline earth metals lose electrons to form stable cations, while highly electronegative halogens/chalcogens gain electrons to form stable anions. The resulting electrostatic attraction between these oppositely charged ions binds them into a solid lattice. The energetics are governed by:
              <br />
              <code className="text-cyan-300 font-mono font-bold block my-1">Metal(g) &rarr; Metal⁺(g) + e⁻ [I.E. &gt; 0]</code>
              <code className="text-cyan-300 font-mono font-bold block my-1">Non-metal(g) + e⁻ &rarr; Anion⁻(g) [&Delta;_egH &lt; 0]</code>
              <code className="text-cyan-300 font-mono font-bold block my-1">M⁺(g) + X&minus;(g) &rarr; MX(s) [Lattice Energy &lt; 0]</code>
            </p>
            <h4 className="text-white font-bold text-sm">Outdated d-Orbital Explanations</h4>
            <p>
              Traditionally, expanded octets in species like PCl<sub>5</sub> and SF<sub>6</sub> were explained by the participation of empty valence-shell <i>d</i>-orbitals (e.g. <i>sp</i><sup>3</sup><i>d</i>, <i>sp</i><sup>3</sup><i>d</i><sup>2</sup> hybridization). Modern molecular calculations show <i>d</i>-orbitals are too high in energy to participate significantly. Instead, bonding is explained via <strong>multi-center bonds</strong> (e.g., 3-center 4-electron bonds).
            </p>
          </div>
          <div className="space-y-4">
            <TrapCard title="Rigorous Exception Classification">
              <ul className="space-y-2 text-white/60 text-[12.5px]">
                <li>⚠️ <strong>Incomplete Octet (Electron Deficient)</strong>: Central atom has &lt; 8 electrons. e.g., LiCl, BeH<sub>2</sub> [4], BF<sub>3</sub> [6]. Typically act as strong Lewis acids.</li>
                <li>⚠️ <strong>Odd-Electron Species</strong>: Diatomic or polyatomic molecules containing an odd total of electrons, rendering octet completion impossible. e.g., NO [11 valence e⁻], NO<sub>2</sub> [17 valence e⁻]. Shows strong paramagnetic behavior.</li>
                <li>⚠️ <strong>Expanded Octet (Hypervalency)</strong>: Central atom has &gt; 8 electrons. e.g., PF<sub>5</sub> [10], SF<sub>6</sub> [12], H<sub>2</sub>SO<sub>4</sub> [12], IF<sub>7</sub> [14]. Explained modernly by 3c-4e bonds.</li>
              </ul>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── 3. LEWIS STRUCTURE DRAWING METHOD ───────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="03 / Lewis Structures &amp; Step-by-Step Drawing Method" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Step-by-Step Lewis Protocol</h3>
            <ol className="list-decimal pl-4 space-y-2.5 text-white/70">
              <li><strong>Total Valence Electrons (<i>Q</i>)</strong>: Sum valence electrons of all atoms. Add electrons for negative charges; subtract for positive charges.</li>
              <li><strong>Skeletal Structure</strong>: Place the least electronegative atom in the center (Hydrogen and Fluorine are always terminal).</li>
              <li><strong>Single Bonds</strong>: Connect atoms with single bonds (each bond uses 2 electrons).</li>
              <li><strong>Terminal Octets</strong>: Distribute remaining electrons as lone pairs to complete terminal octets.</li>
              <li><strong>Central Atom Assignment</strong>: Place remaining electrons on the central atom as lone pairs.</li>
              <li><strong>Octet Completion</strong>: If central atom has incomplete octet, convert lone pairs from terminal atoms into double/triple bonds.</li>
              <li><strong>Formal Charge Check</strong>: Compute formal charges to find the most stable configuration.</li>
            </ol>
          </div>
          <div className="space-y-4">
            <FormulaCard
              formula="FC = V - L - &frac12; S"
              use="Calculate formal charge on an individual bonded atom."
              note="<b>V</b> = Valence electrons of free atom, <b>L</b> = number of <i>non-bonding valence electrons</i> (not pairs!), <b>S</b> = number of shared/bonding electrons."
              priority={5}
            />
            <ExamTipCard title="Formal Charge Check Rule">
              The sum of formal charges of all atoms in a species must equal the net charge of the molecule or ion. A Lewis structure is most stable when formal charges are minimized, and negative formal charges sit on more electronegative atoms.
            </ExamTipCard>
          </div>
        </div>
      </div>

      {/* ─── 4. COORDINATE OR DATIVE BOND ────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="04 / Coordinate (Dative) Covalent Bonding" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Shared Pair from a Single Donor</h3>
            <p>
              A coordinate bond is a type of covalent bond where both shared electrons originate from a single atom (the Lewis base donor) to fill the empty valence orbital of another (the Lewis acid acceptor).
            </p>
            <p>
              Once formed, a coordinate bond is <strong>indistinguishable</strong> from a normal covalent bond in terms of properties, bond length, and strength. It is represented by an arrow (&rarr;) pointing from donor to acceptor.
            </p>
          </div>
          <div className="space-y-3.5">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[12.5px] space-y-2">
              <span className="font-bold text-white block uppercase text-[11px] tracking-wider text-cyan-400">Classic Examples:</span>
              <ul className="space-y-2 text-white/60">
                <li>🔗 <strong>Ammonium (NH<sub>4</sub><sup>+</sup>)</strong>: Nitrogen in NH<sub>3</sub> donates its lone pair to an empty 1<i>s</i> orbital of H<sup>+</sup>.</li>
                <li>🔗 <strong>Hydronium (H<sub>3</sub>O<sup>+</sup>)</strong>: Oxygen in H<sub>2</sub>O donates a lone pair to H<sup>+</sup>.</li>
                <li>🔗 <strong>Adduct Formations</strong>: BF<sub>3</sub> &larr; NH<sub>3</sub> where nitrogen donates to boron's empty 2<i>p</i> orbital.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 5. IONIC BOND & BORN-HABER CYCLE ────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="05 / Ionic Bonding &amp; Thermochemical Cycles" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Electrovalent Bonds &amp; Energy Trends</h3>
            <p>
              Formed by the complete transfer of valence electrons. Factors favoring ionic bonding:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-white/60">
              <li>Low ionization enthalpy of cation metal.</li>
              <li><strong>More favorable (more negative)</strong> electron gain enthalpy of anion non-metal.</li>
              <li>High magnitude of negative lattice enthalpy.</li>
            </ul>
            <h4 className="text-white font-bold text-sm">Lattice Enthalpy Convention (Important!)</h4>
            <p className="text-white/60">
              Lattice enthalpy has two conventions:
              <br />
              1. Lattice Dissociation Enthalpy: Energy required to separate 1 mole of solid crystal into gaseous ions (always positive, &Delta;<i>H</i><sub>L</sub> &gt; 0).
              <br />
              2. Lattice Formation Enthalpy: Energy released when gaseous ions crystallize into solid lattice (always negative, &Delta;<i>H</i><sub>L</sub> &lt; 0).
            </p>
          </div>
          <div className="space-y-4">
            <BornHaberCycleSVG />
            <ExamTipCard title="Born-Haber Thermochemical Equation">
              Applying Hess's Law to the cycle yields:
              <br />
              <code className="text-cyan-300 font-bold block mt-1 font-mono">ΔH<sub>f</sub> = ΔH<sub>sub</sub> + I.E. + &frac12; ΔH<sub>diss</sub> + Δ<sub>eg</sub>H + U</code>
              Where <i>U</i> is the lattice formation enthalpy (negative value) and &Delta;<i>H</i><sub>f</sub> is the enthalpy of formation.
            </ExamTipCard>
          </div>
        </div>
      </div>

      {/* ─── 6. HYDRATION vs LATTICE ENTHALPY ────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="06 / Hydration vs. Lattice Enthalpy (Solubility)" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Solubility Driver Analysis</h3>
            <p>
              When an ionic compound dissolves in water, the solid lattice must break (lattice enthalpy input required, &Delta;<i>H</i><sub>L</sub> &gt; 0), and the resulting ions are hydrated by water molecules (hydration enthalpy released, &Delta;<i>H</i><sub>hyd</sub> &lt; 0).
            </p>
            <p>
              Solubility is thermodynamically favored when the magnitude of hydration enthalpy exceeds the lattice enthalpy:
              <br />
              <code className="text-cyan-300 font-mono font-bold bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">|&Delta;H<sub>hyd</sub>| &gt; &Delta;H<sub>L</sub></code>
            </p>
          </div>
          <div className="space-y-4">
            <TrapCard title="Solubility Trends in IAT">
              <p className="text-white/60 text-[12.5px] leading-relaxed">
                Both Lattice Energy and Hydration Energy are proportional to 1/<i>r</i>. For larger anions (like SO<sub>4</sub><sup>2-</sup>, CO<sub>3</sub><sup>2-</sup>), the change in lattice energy is minor down a group, so <strong>decreasing hydration energy dominates</strong>, reducing solubility down the group (e.g. MgSO<sub>4</sub> is highly soluble, BaSO<sub>4</sub> is insoluble).
              </p>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── 7. FAJAN'S RULES ────────────────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="07 / Fajan's Rules: Covalent Character in Ionic Bonds" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Polarization of Anions</h3>
            <p>
              No ionic bond is 100% ionic. Cations polarize (distort) the spherical electron cloud of adjacent anions, sharing electron density. Polarizing power increases covalent character, which decreases melting points and solubility.
            </p>
            <PolarizationSVG />
          </div>
          <div className="space-y-4">
            <TrapCard title="Fajan's Covalent Character Drivers">
              <ul className="list-disc pl-4 space-y-2 text-white/60 text-[12.5px]">
                <li><strong>Small Cation Size</strong>: Higher charge density polarizes anions strongly (Li<sup>+</sup> &gt; Na<sup>+</sup> &gt; K<sup>+</sup>).</li>
                <li><strong>Large Anion Size</strong>: Outer electrons are held loosely, showing high polarizability (I<sup>-</sup> &gt; Br<sup>-</sup> &gt; Cl<sup>-</sup> &gt; F<sup>-</sup>).</li>
                <li><strong>High Charge on Ions</strong>: Increases polarization forces (Fe<sup>3+</sup> &gt; Fe<sup>2+</sup>).</li>
                <li><strong>Pseudo-Noble Gas Configuration</strong>: Cations with <i>ns</i><sup>2</sup> <i>np</i><sup>6</sup> <i>nd</i><sup>10</sup> config (e.g. Cu<sup>+</sup>, Ag<sup>+</sup>, Zn<sup>2+</sup>) have greater polarizing power than noble gas <i>ns</i><sup>2</sup> <i>np</i><sup>6</sup> cations (e.g. Na<sup>+</sup>, Ca<sup>2+</sup>) due to poor shielding by <i>d</i>-electrons.</li>
              </ul>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── 8. BOND PARAMETERS & RESONANCE ──────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="08 / Bond Parameters &amp; Resonance Analysis" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Key Bond Parameters</h3>
            <div className="space-y-3 text-xs text-white/60">
              <p>
                • <strong>Bond Length:</strong> The average equilibrium distance between the nuclei of two bonded atoms. Trend: increases with larger atomic size and decreases as bond multiplicity increases:
                <br />
                <code className="text-cyan-300 font-mono font-bold block mt-1">C&minus;C (1.54 Å) &gt; C=C (1.34 Å) &gt; C&equiv;C (1.20 Å)</code>
              </p>
              <p>
                • <strong>Bond Dissociation Enthalpy (Bond Energy):</strong> The energy required to break one mole of chemical bonds of a specific type between gaseous atoms. Higher bond order and greater electronegativity difference correlate with higher bond energy:
                <br />
                <code className="text-cyan-300 font-mono font-bold block mt-1">C&equiv;C (~835 kJ/mol) &gt; C=C (~614 kJ/mol) &gt; C&minus;C (~348 kJ/mol)</code>
              </p>
              <p>
                • <strong>Bond Order (General):</strong> Represents the number of shared electron pairs. In a resonance hybrid, it is calculated as:
                <br />
                <code className="text-cyan-300 font-mono font-bold block mt-1">B.O. = Total bonds in all links / Total resonance structures</code>
                For example, in Ozone (O₃), B.O. = 3 / 2 = 1.5. In Carbonate (CO₃²⁻), B.O. = 4 / 3 = 1.33. In Benzene, B.O. = 9 / 6 = 1.5.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Equivalent vs Non-Equivalent Resonance</h3>
            <p>
              Resonance occurs when a single Lewis structure cannot explain all properties. The actual structure is a resonance hybrid of equivalent or non-equivalent canonical structures.
            </p>
            <p>
              <strong>Equivalent Structures:</strong> Canonical forms are equal in energy and stability (e.g., in CO₃²⁻, all three C-O bonds are identical). Resonance energy is high.
            </p>
            <p>
              <strong>Non-Equivalent Structures:</strong> Canonical forms have unequal energies (e.g., in OCN⁻). The hybrid resembles the lowest-energy structure (stable formal charges on electronegative atoms).
            </p>
            <ExamTipCard title="Resonance Energy">
              Resonance energy is the difference in potential energy between the actual resonance hybrid (most stable) and the lowest-energy canonical structure.
              <br />
              <code className="text-cyan-300 font-mono font-bold block mt-1">E<sub>resonance</sub> = E<sub>hybrid</sub> - E<sub>canonical</sub>(most stable)</code>
            </ExamTipCard>
          </div>
        </div>
      </div>

      {/* ─── 9. DIPOLE MOMENTS & % IONIC CHARACTER ───────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="09 / Dipole Moment &amp; Percentage Ionic Character" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormulaCard
              formula="&mu; = q &times; r"
              use="Determine molecular bond dipole moment vector."
              note="q = partial charge, r = distance vector. Net molecular dipole moment is the vector sum of all bond and lone-pair dipoles."
              priority={5}
            />
            <FormulaCard
              formula="&mu;<sub>res</sub> = &radic;(&mu;₁² + &mu;₂² + 2&mu;₁&mu;₂ cos&theta;)"
              use="Calculate the resultant dipole moment of two intersecting bond vectors."
              note="&theta; is the angle between the two bond dipole vectors."
              priority={4}
            />
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[12.5px] space-y-2 text-white/60">
              <span className="font-bold text-white block uppercase text-[11px] tracking-wider text-cyan-400">Hannay-Smith &amp; 50% Rule:</span>
              <p>Used to estimate percentage ionic character from electronegativity difference (&Delta;&chi;):</p>
              <code className="text-cyan-300 font-mono block font-bold text-center bg-black/40 p-2 rounded border border-white/5">
                % Ionic Character = 16(Δχ) + 3.5(Δχ)²
              </code>
              <p className="text-[11.5px] pt-1">
                • If <strong>&Delta;&chi; &gt; 1.7</strong>: Predominantly ionic bond (&gt; 50% ionic character).
                <br />
                • If <strong>&Delta;&chi; &lt; 1.7</strong>: Predominantly covalent bond (&lt; 50% ionic character).
                <br />
                • If <strong>&Delta;&chi; = 1.7</strong>: Exactly 50% ionic character.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <FormulaCard
              formula="% Ionic Character = (&mu;<sub>observed</sub> / &mu;<sub>theoretical</sub>) &times; 100"
              use="Determine ionic percent from experimental dipole moments."
              note="μ_theoretical assumes 100% electron transfer (charge e = 1.6 × 10⁻¹⁹ C)."
              priority={4}
            />
            <TrapCard title="Symmetric Cancellation Trap">
              Symmetric molecules like BF<sub>3</sub> (trigonal planar), CH<sub>4</sub> (tetrahedral), CCl<sub>4</sub>, and XeF<sub>4</sub> (square planar) have individual polar bonds, but their vector sum cancels out completely, resulting in a net dipole moment of zero (&mu; = 0).
            </TrapCard>
            <TrapCard title="High Yield: NH₃ vs. NF₃ Dipole Moment">
              <p className="text-white/60 text-[12.5px] leading-relaxed">
                Although fluorine is much more electronegative than hydrogen, the dipole moment of <strong>NH₃ (1.47 D)</strong> is far greater than <strong>NF₃ (0.23 D)</strong>:
              </p>
              <p className="text-white/60 text-[12.5px] leading-relaxed pt-1">
                • In <strong>NH₃</strong>: The N&minus;H bond dipoles point from H to N (towards lone pair). The bond dipoles and lone-pair dipole act in the <strong>same direction</strong> (add up).
                <br />
                • In <strong>NF₃</strong>: The N&minus;F bond dipoles point from N to F (away from lone pair). The bond dipoles and lone-pair dipole act in <strong>opposite directions</strong> (partially cancel out).
              </p>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── 10. VSEPR THEORY DISTORTIONS ────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="10 / VSEPR Theory: Lone Pair &amp; Multiple Bond Distortions" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Repulsion Distortions</h3>
            <p>
              The ideal bond angles of electronic geometries (e.g. 109.5° for tetrahedral, 120° for trigonal planar) are distorted when lone pairs or multiple bonds are present:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-white/60">
              <li><strong>Lone Pairs</strong>: Occupy more space around the nucleus, pushing adjacent bond pairs closer (lp-lp &gt; lp-bp &gt; bp-bp). e.g. CH<sub>4</sub> (109.5&deg;) &rarr; NH<sub>3</sub> (107&deg;) &rarr; H<sub>2</sub>O (104.5&deg;).</li>
              <li><strong>Multiple Bonds</strong>: Double and triple bonds have higher electron density and repel adjacent single bonds more than single bonds repel each other. e.g. in Formaldehyde (H<sub>2</sub>C=O), the H-C-H angle is compressed to 116&deg; (ideal is 120&deg;).</li>
            </ul>
          </div>
          <div className="space-y-4">
            <VseprGeometriesSVG />
          </div>
        </div>
      </div>

      {/* ─── INTERACTIVE SMART STUDY LAB ────────────────────────────────────── */}
      <div id="smart-lab" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-violet-950/20 via-[#0a0d22] to-cyan-950/20 border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-violet-500/5 blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/15 pb-4 gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h2 className="text-white font-display font-black text-[18px] uppercase tracking-wider">Chemical Bonding Interactive Lab</h2>
            </div>
            <p className="text-white/50 text-xs">Simulate geometries, molecular orbitals, and test active recall in real-time.</p>
          </div>
          
          {/* Tab Selection */}
          <div className="flex rounded-xl bg-black/40 p-1 border border-white/5 self-start sm:self-auto shrink-0 font-mono text-[11px] font-extrabold uppercase tracking-wider">
            {[
              { id: 'vsepr', label: 'VSEPR Shapes' },
              { id: 'mot',   label: 'MOT Calc' },
              { id: 'fc',    label: 'Formal Charge' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-all",
                  activeTab === tab.id
                    ? "bg-cyan-500 text-black font-black"
                    : "text-white/60 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── TAB CONTENT 1: VSEPR SHAPE EXPLORER ─── */}
        {activeTab === 'vsepr' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 animate-in fade-in duration-300">
            {/* Control Panel */}
            <div className="md:col-span-4 p-5 rounded-2xl bg-black/30 border border-white/5 space-y-4">
              <SectionBanner label="Shape Parameters" />
              
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-black uppercase text-white/40 block mb-1.5">Steric Number (SN)</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[2, 3, 4, 5, 6, 7].map(sn => (
                      <button
                        key={sn}
                        onClick={() => handleSNChange(sn)}
                        className={cn(
                          "py-2 rounded-xl text-xs font-mono font-bold transition-all border",
                          vseprSN === sn
                            ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 font-extrabold shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                            : "bg-white/[0.02] border-white/5 text-white/50 hover:border-white/10"
                        )}
                      >
                        SN = {sn}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase text-white/40 block mb-1.5">Lone Pairs (LP)</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {availableLPs.map(lp => (
                      <button
                        key={lp}
                        onClick={() => setVseprLP(lp)}
                        className={cn(
                          "py-2 rounded-xl text-xs font-mono font-bold transition-all border",
                          vseprLP === lp
                            ? "bg-rose-500/10 border-rose-400 text-rose-400 font-extrabold shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                            : "bg-white/[0.02] border-white/5 text-white/50 hover:border-white/10"
                        )}
                      >
                        LP = {lp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Molecule Summary */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5 text-xs text-white/70">
                <div>
                  <span className="text-white/40 block text-[9.5px] uppercase font-bold">Molecular Shape</span>
                  <span className="text-white font-extrabold text-[15px] text-cyan-400">{selectedVsepr?.shape}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-white/40 block text-[9.5px] uppercase font-bold">Ideal Angle</span>
                    <span className="text-white font-bold">{selectedVsepr?.idealAngle}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9.5px] uppercase font-bold">Actual Angle</span>
                    <span className="text-rose-400 font-bold">{selectedVsepr?.realAngle}</span>
                  </div>
                </div>
                <div>
                  <span className="text-white/40 block text-[9.5px] uppercase font-bold">Electronic Geometry</span>
                  <span className="text-white font-medium">{selectedVsepr?.geometry}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[9.5px] uppercase font-bold">Key Examples</span>
                  <span className="text-white font-mono bg-black/40 px-2 py-0.5 rounded border border-white/5 inline-block mt-0.5">{selectedVsepr?.example}</span>
                </div>
              </div>
            </div>

            {/* Visualizer Panel */}
            <div className="md:col-span-8 p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between min-h-[300px] relative">
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-white/30 font-bold">3D-Like Coordinate Overlap Model</span>
              
              <div className="flex-1 flex items-center justify-center py-4">
                <svg viewBox="0 0 100 100" className="w-48 h-48 max-w-full drop-shadow-[0_0_20px_rgba(167,139,250,0.15)] transition-all duration-500">
                  {selectedVsepr?.bondsSvg}
                </svg>
              </div>

              {/* Explanation Box */}
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-1 text-xs">
                <span className="text-violet-400 font-bold uppercase tracking-wider text-[9.5px]">VSEPR Repulsion Analysis:</span>
                <p className="text-white/70 leading-relaxed font-sans">{selectedVsepr?.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB CONTENT 2: MOLECULAR ORBITAL CALCULATOR ─── */}
        {activeTab === 'mot' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 animate-in fade-in duration-300">
            {/* Control Panel */}
            <div className="md:col-span-4 p-5 rounded-2xl bg-black/30 border border-white/5 space-y-4">
              <SectionBanner label="Diatomic Species Selection" />
              
              <div>
                <label className="text-[11px] font-black uppercase text-white/40 block mb-1.5">Select Homonuclear Species</label>
                <select
                  value={motKey}
                  onChange={e => setMotKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none font-mono"
                >
                  {Object.keys(motDb).map(k => (
                    <option key={k} value={k} className="bg-[#0A0C18]">{motDb[k].name}</option>
                  ))}
                </select>
              </div>

              {/* Calculator Summary */}
              <div className="p-4.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3.5 text-xs text-white/75">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/40 font-bold uppercase text-[9.5px]">Total Electrons</span>
                  <span className="font-mono text-sm text-cyan-400 font-extrabold">{selectedMot.electrons} e⁻</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/40 font-bold uppercase text-[9.5px]">s-p Mixing (Valence Inversion)</span>
                  <span className={cn("font-bold uppercase text-[10px]", selectedMot.mixing ? "text-amber-400" : "text-emerald-400")}>
                    {selectedMot.mixing ? "Active (e⁻ ≤ 14)" : "Negligible (e⁻ > 14)"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/40 font-bold uppercase text-[9.5px]">Bond Order Calculation</span>
                  <span className="font-mono text-white font-extrabold text-sm">
                    ({selectedMot.nb} - {selectedMot.na}) / 2 = <span className="text-cyan-400">{selectedMot.bo.toFixed(1)}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-white/40 font-bold uppercase text-[9.5px]">Magnetic Behavior</span>
                  <span className={cn("font-bold uppercase text-[10px]", selectedMot.magnetism === "Paramagnetic" ? "text-cyan-400" : "text-slate-400")}>
                    {selectedMot.magnetism} ({selectedMot.unpaired} unpaired)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-white/40 block text-[9.5px] uppercase font-bold">HOMO Level</span>
                    <span className="text-white font-mono font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5 inline-block mt-0.5">{selectedMot.homo}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9.5px] uppercase font-bold">LUMO Level</span>
                    <span className="text-white font-mono font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5 inline-block mt-0.5">{selectedMot.lumo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualizer Panel */}
            <div className="md:col-span-8 p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between min-h-[300px] relative">
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-white/30 font-bold">Molecular Configuration Diagram</span>
              
              <div className="flex-1 flex flex-col justify-center items-center py-4 space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-white/40">Occupied MO energy levels:</span>
                  <p className="font-mono text-cyan-300 font-extrabold text-sm sm:text-base bg-cyan-950/20 px-4 py-2 rounded-xl border border-cyan-500/10 inline-block select-all" dangerouslySetInnerHTML={{ __html: selectedMot.configHtml }} />
                </div>

                {/* Energy Boxes Diagram */}
                <div className="w-full max-w-sm space-y-2 border border-white/5 bg-black/30 p-4.5 rounded-2xl font-mono text-[10.5px]">
                  <div className="text-center font-bold text-white/35 pb-1 border-b border-white/5 uppercase text-[9px] tracking-wider">Valence Orbitals Occupancy</div>
                  
                  {[
                    { label: "σ* 2pz", active: selectedMot.electrons >= 20, fill: selectedMot.electrons >= 20 ? 2 : 0 },
                    { label: "π* 2px,y", active: selectedMot.electrons >= 16, fill: selectedMot.electrons >= 18 ? 4 : selectedMot.electrons === 17 ? 3 : selectedMot.electrons === 16 ? 2 : selectedMot.electrons === 15 ? 1 : 0 },
                    { label: selectedMot.mixing ? "σ 2pz" : "π 2px,y", active: selectedMot.electrons >= 12, fill: selectedMot.mixing ? (selectedMot.electrons >= 14 ? 2 : selectedMot.electrons === 13 ? 1 : 0) : (selectedMot.electrons >= 16 ? 4 : selectedMot.electrons >= 12 ? (selectedMot.electrons - 12) : 0) },
                    { label: selectedMot.mixing ? "π 2px,y" : "σ 2pz", active: selectedMot.electrons >= 10, fill: selectedMot.mixing ? (selectedMot.electrons >= 12 ? 4 : selectedMot.electrons === 11 ? 3 : selectedMot.electrons === 10 ? 2 : 0) : (selectedMot.electrons >= 12 ? 2 : selectedMot.electrons === 11 ? 1 : 0) },
                    { label: "σ* 2s", active: selectedMot.electrons >= 8, fill: selectedMot.electrons >= 8 ? 2 : 0 },
                    { label: "σ 2s", active: selectedMot.electrons >= 6, fill: selectedMot.electrons >= 6 ? 2 : 0 },
                  ].map((level, i) => (
                    <div key={i} className={cn("flex justify-between items-center p-1 rounded transition-colors", level.active ? "bg-cyan-500/5 text-white" : "text-white/20")}>
                      <span>{level.label}</span>
                      <div className="flex gap-1">
                        {Array.from({ length: level.fill }).map((_, j) => (
                          <span key={j} className="h-3 w-1.5 bg-cyan-400 rounded-sm" title="Electron" />
                        ))}
                        {level.fill === 0 && <span className="text-[9px] text-white/10 uppercase">Empty</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation Box */}
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-1 text-xs">
                <span className="text-violet-400 font-bold uppercase tracking-wider text-[9.5px]">Diatomic MOT Stability Notes:</span>
                <p className="text-white/70 leading-relaxed font-sans">{selectedMot.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB CONTENT 3: LEWIS FORMAL CHARGE TRAINER ─── */}
        {activeTab === 'fc' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 animate-in fade-in duration-300">
            {/* Control Panel */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-black/30 border border-white/5 space-y-4">
              <SectionBanner label="Formal Charge Challenger" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/50 font-bold uppercase font-sans">Challenge Target:</span>
                <span className="font-mono text-lg font-black text-cyan-300 bg-white/5 px-2.5 py-0.5 rounded border border-white/5">{currentTrainer.formula} ({currentTrainer.name})</span>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs text-white/60">Using the formula <code>FC = V - L - ½ S</code>, input the formal charge for each labeled atom:</p>
                
                {currentTrainer.atoms.map(atom => (
                  <div key={atom.id} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-white block">{atom.name}</span>
                      <span className="text-[10px] text-white/40">Valence: {atom.valence} | Non-bond: {atom.nonbond} | Shared: {atom.shared}</span>
                    </div>
                    <select
                      value={userFcInputs[atom.id] ?? ''}
                      onChange={e => setUserFcInputs(prev => ({ ...prev, [atom.id]: Number(e.target.value) }))}
                      className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white outline-none font-mono font-bold text-[12.5px] w-20"
                    >
                      <option value="">--</option>
                      {[-2, -1, 0, 1, 2].map(val => (
                        <option key={val} value={val}>{val >= 0 ? '+' + val : val}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center gap-3 pt-2">
                <button
                  onClick={handleFcSubmit}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-[12.5px] hover:bg-cyan-400 transition-colors"
                >
                  Verify Calculations
                </button>
                <button
                  onClick={() => {
                    setTrainerIndex(prev => (prev + 1) % trainerDb.length);
                    setUserFcInputs({});
                    setTrainerFeedback(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-white/60 hover:text-white border border-white/5 text-[11.5px] transition-colors"
                >
                  Next Species &rarr;
                </button>
              </div>
            </div>

            {/* Diagram Panel */}
            <div className="md:col-span-7 p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between min-h-[300px] relative">
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-white/30 font-bold">Lewis Skeletal Diagram</span>
              
              <div className="flex-1 flex items-center justify-center py-4">
                {currentTrainer.svgMarkup}
              </div>

              {/* Feedback Box */}
              {trainerFeedback && (
                <div className={cn(
                  "p-4 rounded-xl border text-xs leading-relaxed whitespace-pre-wrap font-sans",
                  trainerFeedback.includes("Correct")
                    ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-300"
                    : "bg-rose-500/5 border-rose-500/10 text-rose-300"
                )}>
                  {trainerFeedback}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── 11. VALENCE BOND THEORY & OVERLAPS ──────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="11 / Valence Bond Theory (VBT) &amp; Orbital Overlaps" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Orbital Overlap Types</h3>
            <p>
              Covalent bonds form by the overlap of half-filled atomic orbitals containing electrons with opposite spins. Orbital overlap extent determines bond strength (greater overlap = stronger bond):
            </p>
            <div className="space-y-2 border-l-2 border-cyan-500/20 pl-3 text-xs">
              <p>
                • <strong>s&minus;s overlap:</strong> Overlap of two half-filled s-orbitals along the internuclear axis. Forms a symmetric <strong>Sigma (σ) bond</strong>.
              </p>
              <p>
                • <strong>s&minus;p overlap:</strong> Overlap of a half-filled s-orbital and a half-filled p-orbital along the axis. Forms a <strong>σ bond</strong> (e.g., in HF).
              </p>
              <p>
                • <strong>p&minus;p axial (head-on) overlap:</strong> Overlap of two p-orbitals along the internuclear axis. Forms a strong <strong>σ bond</strong>.
              </p>
              <p>
                • <strong>p&minus;p lateral (sideways) overlap:</strong> Parallel p-orbitals overlap side-by-side perpendicular to the axis. Forms a weaker <strong>Pi (π) bond</strong> (overlap is less extensive).
              </p>
            </div>
            <OrbitalOverlapsSVG />
          </div>
          <div className="space-y-4">
            <TrapCard title="Internuclear Axis Overlap Limits">
              <p className="text-white/60 text-[12.5px] leading-relaxed">
                By convention, the internuclear axis is the <strong>z-axis</strong>:
                <br />
                • <i>p<sub>z</sub></i> - <i>p<sub>z</sub></i> head-on overlap forms a <strong>σ bond</strong>.
                <br />
                • <i>p<sub>x</sub></i> - <i>p<sub>x</sub></i> or <i>p<sub>y</sub></i> - <i>p<sub>y</sub></i> lateral overlap forms a <strong>π bond</strong>.
                <br />
                • <i>s</i> - <i>p<sub>x</sub></i> or <i>d</i> - <i>s</i> overlaps perpendicular to the axis result in zero overlap (no bond).
              </p>
            </TrapCard>
            <TrapCard title="VBT Limitations (Why MOT is needed)">
              <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-[12.5px]">
                <li>❌ <strong>O₂ Paramagnetism:</strong> VBT incorrectly predicts all electrons in O₂ are paired (diamagnetic). MOT correctly predicts 2 unpaired electrons in antibonding orbitals.</li>
                <li>❌ <strong>Odd-Electron Species:</strong> Cannot explain the stability or structures of odd-electron molecules like NO or NO₂.</li>
                <li>❌ <strong>Coordinate Bonds:</strong> Fails to account for coordinate/dative bond energetics and properties quantitatively.</li>
                <li>❌ <strong>Bond Energies:</strong> Does not predict quantitative values of bond enthalpies and bond lengths.</li>
              </ul>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── 12. HYBRIDISATION & STERIC TABLE ────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="12 / Hybridisation Shortcuts &amp; Steric Matrix" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FormulaCard
              formula="SN = &frac12; [ V + M - C + A ]"
              use="Determine Steric Number of central atom."
              note="<b>V</b> = Valence electrons on central atom, <b>M</b> = number of monovalent atoms (H, F, Cl, Br, I), <b>C</b> = Cationic charge, <b>A</b> = Anionic charge."
              priority={5}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px] font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-white/40">
                    <th className="py-2 pr-2">SN</th>
                    <th className="py-2 pr-2">Hybrid</th>
                    <th className="py-2 pr-2">Ideal Shape</th>
                    <th className="py-2">Examples (Lone Pairs)</th>
                  </tr>
                </thead>
                <tbody className="text-white/60 divide-y divide-white/[0.04]">
                  <tr><td className="py-2">2</td><td className="text-cyan-400 font-bold">sp</td><td>Linear</td><td>BeCl₂ (0 lp), CO₂ (0 lp)</td></tr>
                  <tr><td className="py-2">3</td><td className="text-cyan-400 font-bold">sp²</td><td>Trig Planar</td><td>BF₃ (0 lp), SO₂ (1 lp)</td></tr>
                  <tr><td className="py-2">4</td><td className="text-cyan-400 font-bold">sp³</td><td>Tetrahedral</td><td>CH₄ (0 lp), NH₃ (1 lp), H₂O (2 lp)</td></tr>
                  <tr><td className="py-2">5</td><td className="text-cyan-400 font-bold">sp³d</td><td>TBP</td><td>PCl₅ (0 lp), SF₄ (1 lp), XeF₂ (3 lp)</td></tr>
                  <tr><td className="py-2">6</td><td className="text-cyan-400 font-bold">sp³d²</td><td>Octahedral</td><td>SF₆ (0 lp), XeF₄ (2 lp)</td></tr>
                  <tr><td className="py-2">7</td><td className="text-cyan-400 font-bold">sp³d³</td><td>Pent Bipyram</td><td>IF₇ (0 lp), XeF₆ (1 lp)</td></tr>
                </tbody>
              </table>
            </div>
            <HybridLobesSVG />
          </div>
          <div className="space-y-4">
            <ExamTipCard title="Quick Steric Shortcuts in IAT">
              Alternatively, count steric number directly as:
              <br />
              <code className="text-cyan-300 font-bold block mt-1 font-mono">SN = (Number of Sigma Bonds) + (Number of Lone Pairs)</code>
              Multiple bonds (double/triple) are counted as only 1 sigma bond when determining hybridization.
            </ExamTipCard>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[12.5px] space-y-2 text-white/60">
              <span className="font-bold text-white block uppercase text-[11px] tracking-wider text-cyan-400">Equivalent vs. Non-Equivalent Hybrids:</span>
              <p>
                • <strong>Equivalent Hybrids:</strong> Orbitals have identical energy and s-character distribution (e.g. sp, sp², sp³, sp³d² in symmetric compounds with no lone pairs).
              </p>
              <p>
                • <strong>Non-Equivalent Hybrids:</strong> Orbitals have different spatial distributions and s-character (e.g. sp³d where axial orbitals are pure pd, and equatorial are sp² hybrids; explainable by Bent's rule).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 13. BENT'S RULE & SUBS ELEC PREFERENCES ─────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="13 / Bent's Rule: Substituent Orbital Preferences" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">s-Character vs Electronegativity</h3>
            <p>
              Bent's Rule states: <strong>More electronegative substituents prefer hybrid orbitals having less s-character (more p-character), while lone pairs and multiple bonds prefer hybrid orbitals having more s-character.</strong>
            </p>
            <p>
              In trigonal bipyramidal geometry (<i>sp</i><sup>3</sup><i>d</i>), the hybrid is split:
              <br />
              • <strong>Equatorial orbitals</strong>: <i>sp</i><sup>2</sup> hybrids (higher s-character, 33.3%).
              <br />
              • <strong>Axial orbitals</strong>: <i>pd</i> hybrids (zero s-character).
            </p>
          </div>
          <div className="space-y-4">
            <TrapCard title="Bent's Rule Configurations">
              <p className="text-white/60 text-[12.5px] leading-relaxed mb-2">
                This explains substituent positioning in hypervalent molecules:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-white/50 text-[12px]">
                <li>In PCl<sub>3</sub>F<sub>2</sub>, the more electronegative fluorine atoms occupy the <strong>axial</strong> positions (0% s-character).</li>
                <li>In SF<sub>4</sub>, the lone pair prefers the <strong>equatorial</strong> site (higher s-character to hold the pair closer to the nucleus).</li>
              </ul>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── 14. BACK BONDING ────────────────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="14 / Back Bonding (pπ - dπ / pπ - pπ Overlaps)" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Intramolecular Electron Donation</h3>
            <p>
              Back bonding occurs when an atom containing a lone pair (like F) donates electron density sideways into the vacant orbital of an adjacent electron-deficient atom (like B).
            </p>
            <p>
              In BF<sub>3</sub>, fluorine donates its 2<i>p</i> electron density into boron's empty 2<i>p</i> orbital, forming a partial <i>B-F</i> double bond. This explains why the experimental <i>B-F</i> bond is shorter than expected.
            </p>
          </div>
          <div className="space-y-4">
            <ExamTipCard title="Boron Trihalide Lewis Acidity exception">
              According to electronegativity, BF<sub>3</sub> should be the strongest Lewis acid, but back bonding is most efficient for 2<i>p</i>-2<i>p</i> overlaps. 
              <br />
              • BF<sub>3</sub> has strong 2<i>p</i>-2<i>p</i> back bonding, reducing its empty orbital availability.
              <br />
              • BBr<sub>3</sub> has poor 2<i>p</i>-4<i>p</i> overlap, leaving boron highly deficient.
              <br />
              • <strong>Lewis Acidity Order</strong>: <code className="text-cyan-300 font-mono font-bold font-sans">BF₃ &lt; BCl₃ &lt; BBr₃</code>
            </ExamTipCard>
          </div>
        </div>
      </div>

      {/* ─── 15. MOT, s-p MIXING & HOMO/LUMO ─────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="15 / Molecular Orbital Theory: s-p Mixing &amp; Frontier Orbitals" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Frontier Molecular Orbitals (FMO)</h3>
            <p>
              Molecular orbitals are populated in order of energy. The two most important orbitals for reactivity are:
            </p>
            <p>
              • <strong>HOMO</strong> (Highest Occupied Molecular Orbital): The highest energy orbital containing electrons. Acts as electron donor.
            </p>
            <p>
              • <strong>LUMO</strong> (Lowest Unoccupied Molecular Orbital): The lowest energy empty orbital. Acts as electron acceptor.
            </p>
            <MOTDiagramSVG />
          </div>
          <div className="space-y-4">
            <TrapCard title="s-p Mixing Inversion Core Reason">
              <p className="text-white/60 text-[12.5px] leading-relaxed mb-2">
                In lighter elements (total electrons &le; 14, i.e., up to N<sub>2</sub>), the energy gap between 2<i>s</i> and 2<i>p</i> atomic orbitals is small, allowing them to mix. This mixing raises the energy of the &sigma;<sub>2p<sub>z</sub></sub> molecular orbital above the &pi;<sub>2p<sub>x,y</sub></sub> levels.
              </p>
              <p className="text-white/60 text-[12.5px] leading-relaxed">
                In heavier elements (total electrons &gt; 14, e.g. O<sub>2</sub>, F<sub>2</sub>), the larger nuclear charge draws the 2<i>s</i> level down, increasing the 2<i>s</i>-2<i>p</i> gap and making mixing negligible. Consequently, &sigma;<sub>2p<sub>z</sub></sub> remains lowest in energy.
              </p>
            </TrapCard>
            
            <h4 className="text-white font-bold text-sm">VBT vs. MOT Comparison (High Yield)</h4>
            <div className="overflow-x-auto rounded-xl border border-white/5 mt-2">
              <table className="w-full text-[11px] font-sans text-white/70">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
                    <th className="px-3 py-2 text-left font-bold">Parameter</th>
                    <th className="px-3 py-2 text-left font-bold">Valence Bond (VBT)</th>
                    <th className="px-3 py-2 text-left font-bold text-cyan-300">Molecular Orbital (MOT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr>
                    <td className="px-3 py-2 font-bold text-white">Orbital Nature</td>
                    <td className="px-3 py-2">Localized overlaps.</td>
                    <td className="px-3 py-2 text-cyan-200">Delocalized molecular orbitals.</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-bold text-white">O₂ Paramagnetism</td>
                    <td className="px-3 py-2 text-rose-400">Fails (predicts diamagnetic).</td>
                    <td className="px-3 py-2 text-emerald-400 font-bold">Succeeds (paramagnetic, 2 unpaired e⁻).</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-bold text-white">Resonance Need</td>
                    <td className="px-3 py-2">Requires resonance hybrids.</td>
                    <td className="px-3 py-2 text-cyan-200">Delocalized MO occupancy handles it.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 16. HYDROGEN BONDING & CONSEQ ───────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="16 / Hydrogen Bonding: Strengths, Types &amp; Consequences" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Conditions &amp; Strengths</h3>
            <p>
              Hydrogen bonding is a strong dipole-dipole attraction that occurs when:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
              <li>Hydrogen is covalently bonded to a highly electronegative atom having small size (<strong>only F, O, or N</strong>).</li>
              <li>This electronegative partner pulls electron density away, exposing H's nucleus (bare proton).</li>
              <li>The exposed proton electrostatically attracts the lone pair of a neighboring F, O, or N atom.</li>
            </ul>
            <p className="text-xs text-white/60">
              Typical strength order (driven by electronegativity differences):
              <br />
              <code className="text-cyan-300 font-mono font-bold font-sans">F-H···F (&gt;40 kJ/mol) &gt; O-H···O (&gt;20 kJ/mol) &gt; N-H···N (&gt;8 kJ/mol)</code>
            </p>
            <h4 className="text-white font-bold text-sm">Tetrahedral Ice Cage &amp; Density Anomaly</h4>
            <p className="text-white/60 text-xs leading-relaxed">
              In solid ice, each oxygen atom is tetrahedrally surrounded by four hydrogen atoms—two by normal covalent bonds and two by hydrogen bonds. This creates a highly ordered, open cage-like framework with a large amount of empty space, rendering solid ice less dense than liquid water.
              <br /><br />
              Upon warming, these H-bonds begin to rupture, causing the cages to collapse. The water molecules pack closer together, which causes density to increase, reaching a maximum value at <strong>4°C (277 K)</strong>. Above 4°C, normal thermal expansion dominates, and density decreases.
            </p>
          </div>
          <div className="space-y-4">
            <HBondingSVG />
          </div>
        </div>
      </div>

      {/* ─── 17. OTHER INTERMOLECULAR FORCES ─────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <SectionBanner label="17 / van der Waals &amp; Other Intermolecular Forces" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-white/70 text-[13.5px] leading-relaxed">
            <h3 className="text-white font-bold text-lg">Attractive Forces Classification</h3>
            <p>
              Non-bonding attractive forces hold molecules together. Ordered by typical bond strength:
            </p>
            <ol className="list-decimal pl-4 space-y-2 text-white/60">
              <li><strong>Ion-Dipole Forces</strong>: Interaction between an ion and a polar molecule (e.g. hydration of ions, ~40-600 kJ/mol).</li>
              <li><strong>Dipole-Dipole (Keesom) Forces</strong>: Alignment of permanent molecular dipoles (e.g. liquid HCl, ~5-25 kJ/mol).</li>
              <li><strong>Dipole-Induced Dipole (Debye) Forces</strong>: A polar molecule induces a temporary dipole in an adjacent non-polar one (e.g., Xe in H<sub>2</sub>O, ~2-10 kJ/mol).</li>
              <li><strong>London Dispersion Forces</strong>: Fluctuations in electron clouds create instantaneous dipoles that induce dipoles in neighbors (universal, dominates in nonpolar species like Ar, CH<sub>4</sub>, ~0.05-40 kJ/mol). Strength scale: proportional to polarizability and surface area.</li>
            </ol>
          </div>
          <div className="space-y-4">
            <TrapCard title="Intermolecular Energy vs Distance Scales">
              <ul className="list-disc pl-4 space-y-1.5 text-white/50 text-[12px] font-mono">
                <li>Ion-Dipole energy &propto; 1/r²</li>
                <li>Dipole-Dipole (stationary) &propto; 1/r³</li>
                <li>Dipole-Dipole (rotating gas) &propto; 1/r⁶</li>
                <li>London Dispersion &propto; 1/r⁶</li>
              </ul>
            </TrapCard>
          </div>
        </div>
      </div>

      {/* ─── SOLVED EXAMPLES ─────────────────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Solved Advanced IAT Examples</h3>
          </div>
          <Tag color="emerald">Solved PYQs</Tag>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
            <span className="text-[12.5px] font-extrabold text-emerald-400 uppercase tracking-wider block">Example 1: Anomalous Bond Order of CO⁺</span>
            <p className="text-white/85 font-medium">According to MOT, what is the bond order of CO and CO<sup>+</sup>? Explain the unexpected trend.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/65">
              <p>1. Neutral CO has 14 electrons. Its configuration gives a bond order of 3.0.</p>
              <p>2. In removing an electron to form CO<sup>+</sup>, it is taken from the weakly antibonding &sigma;<sub>2s</sub> orbital (homopolar MO mixing causes the HOMO &sigma;<sub>2s</sub><sup>*</sup> equivalent orbital to have slightly antibonding characteristics).</p>
              <p>3. Removing an electron from an antibonding orbital increases the bond order: <code className="text-cyan-300 font-bold font-mono">Bond Order (CO<sup>+</sup>) = 3.5</code>. This is one of the most famous transition exceptions in inorganic chemistry.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
            <span className="text-[12.5px] font-extrabold text-emerald-400 uppercase tracking-wider block">Example 2: XeF₄ Dipole Moment</span>
            <p className="text-white/85 font-medium">Explain why XeF<sub>4</sub> is a non-polar molecule (&mu; = 0) despite having polar Xe-F bonds and lone pairs on Xenon.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/65">
              <p>1. Xenon has Steric Number 6 (4 bond pairs, 2 lone pairs). Hybridization is <i>sp</i><sup>3</sup><i>d</i><sup>2</sup>.</p>
              <p>2. The geometry is octahedral, but the molecular shape is square planar.</p>
              <p>3. The 2 lone pairs occupy opposite axial positions, so their dipoles cancel out exactly.</p>
              <p>4. The 4 Xe-F bonds point towards the corners of a square, so their bond dipoles also cancel out exactly, resulting in a net dipole moment of zero.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
            <span className="text-[12.5px] font-extrabold text-emerald-400 uppercase tracking-wider block">Example 3: Bent's Rule in PCl₃F₂</span>
            <p className="text-white/85 font-medium">Using Bent's rule, predict the location of Fluorines in phosphorus chlorofluorides.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/65">
              <p>1. PCl<sub>3</sub>F<sub>2</sub> has <i>sp</i><sup>3</sup><i>d</i> hybridization with a Trigonal Bipyramidal geometry.</p>
              <p>2. Fluorine is highly electronegative and prefers axial orbitals (which have 0% s-character, i.e., <i>pd</i> orbitals).</p>
              <p>3. Therefore, both fluorine atoms sit on the axial positions, and the chlorine atoms occupy the equatorial positions, yielding a symmetric, non-polar structure (&mu; = 0).</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2-MIN REVISION CHECKLIST ────────────────────────────────────────── */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
          <h3 className="text-cyan-400 font-display font-bold text-[16px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Potential Energy dip: Covalent/ionic bonds form primarily to lower potential energy",
            "Formal Charge: FC = V - L - 1/2 S (L = number of individual non-bonding electrons)",
            "Slater's Rules: Z_eff determines bond polarization and ionic radius contractions",
            "Fajan's Covalent rules: Small cation, large anion, high ionic charge, pseudo-noble gas",
            "Hannay-Smith Equation: % Ionic Character = 16(Δχ) + 3.5(Δχ)²",
            "VSEPR repulsions: lp-lp > lp-bp > bp-bp (lone pairs deform ideal hybrid angles)",
            "Bent's Rule: Electronegative groups sit in axial orbitals (less s-character) in sp³d",
            "Back Bonding: efficient 2p-2p sideways donation limits boron halide acidity",
            "s-p Mixing: swaps σ_2pz above π_2px,y for diatomic species with ≤ 14 total electrons",
            "HOMO / LUMO: Frontier orbitals dictate electron donor/acceptor reactivity",
            "Hydrogen bonding: strong F-H···F > O-H···O > N-H···N dipole connections",
            "Ice cage density anomaly: tetrahedral H-bonding volume expansion creates lower density",
            "Intermolecular scale: Ion-Dipole (1/r²) vs Debye/London (1/r⁶) dispersion forces"
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
