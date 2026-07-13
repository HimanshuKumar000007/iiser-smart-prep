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

// ─── SVG 1: BAR MAGNET FIELD LINES ───────────────────────────────────────────
function BarMagnetSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Bar Magnet Field Lines (outside: N→S; inside: S→N continuous loops)</p>
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 155 }}>
        {/* Magnet body */}
        <rect x="110" y="65" width="60" height="30" rx="4" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1.5" />
        <rect x="170" y="65" width="60" height="30" rx="4" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="140" y="83" fill="#f87171" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">S</text>
        <text x="200" y="83" fill="#22d3ee" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">N</text>

        {/* External field lines — arcs from N to S outside */}
        {/* Top arcs */}
        <path d="M 200 65 C 200 35, 140 35, 140 65" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M 200 65 C 200 15, 140 15, 140 65" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M 200 65 C 220 5, 120 5, 140 65" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.12" />
        {/* Bottom arcs */}
        <path d="M 200 95 C 200 125, 140 125, 140 95" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M 200 95 C 200 145, 140 145, 140 95" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M 200 95 C 220 155, 120 155, 140 95" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.12" />
        {/* Right side arcs */}
        <path d="M 230 80 C 270 50, 270 110, 230 80" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <path d="M 230 80 C 310 30, 310 130, 230 80" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
        {/* Left side arcs */}
        <path d="M 110 80 C 70 50, 70 110, 110 80" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <path d="M 110 80 C 30 30, 30 130, 110 80" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />

        {/* Internal field line (S to N, inside magnet) */}
        <path d="M 140 80 L 200 80" fill="none" stroke="#fb923c" strokeWidth="1.8" />
        <polygon points="200,80 192,76 192,84" fill="#fb923c" />
        <text x="170" y="73" fill="#fb923c" fontSize="7.5" fontFamily="monospace" textAnchor="middle">S→N inside</text>

        {/* Arrow on external top arc */}
        <polygon points="170,35 165,42 175,42" fill="#ffffff" fillOpacity="0.4" />

        {/* Labels */}
        <text x="170" y="10" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle" fillOpacity="0.6">N→S outside</text>
        <text x="170" y="155" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle" fillOpacity="0.6">Closed continuous loops → ∮B·dA = 0</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: EARTH'S MAGNETISM & DIP ANGLE ────────────────────────────────────
function EarthMagnetismSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Earth as Magnetic Dipole & Dip Angle</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Earth dipole */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Geographic vs Magnetic Poles</span>
          <svg viewBox="0 0 160 140" className="w-full" style={{ maxHeight: 130 }}>
            {/* Earth circle */}
            <circle cx="80" cy="70" r="45" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            {/* Geographic axis (vertical) */}
            <line x1="80" y1="10" x2="80" y2="130" stroke="#6b7280" strokeWidth="1" strokeDasharray="4,3" />
            <text x="83" y="16" fill="#6b7280" fontSize="7" fontFamily="monospace">Geographic N</text>
            <text x="83" y="128" fill="#6b7280" fontSize="7" fontFamily="monospace">Geographic S</text>
            {/* Magnetic dipole axis (tilted ~11°) */}
            <line x1="70" y1="18" x2="90" y2="122" stroke="#a78bfa" strokeWidth="1.5" />
            {/* Magnetic S at top (geographic N side) */}
            <circle cx="71" cy="22" r="5" fill="#f87171" fillOpacity="0.3" stroke="#f87171" strokeWidth="1" />
            <text x="56" y="21" fill="#f87171" fontSize="7.5" fontFamily="monospace">Mag S</text>
            {/* Magnetic N at bottom (geographic S side) */}
            <circle cx="89" cy="118" r="5" fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="1" />
            <text x="95" y="122" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">Mag N</text>
            {/* Field lines */}
            <path d="M 89 118 C 130 100, 130 40, 71 22" fill="none" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M 89 118 C 30 100, 30 40, 71 22" fill="none" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
            <text x="80" y="72" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle" fillOpacity="0.4">~11° offset</text>
          </svg>
        </div>
        {/* Dip angle */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">Dip Angle (δ): B<sub>H</sub> and B<sub>V</sub> Components</span>
          <svg viewBox="0 0 160 140" className="w-full" style={{ maxHeight: 130 }}>
            {/* Ground line */}
            <line x1="10" y1="80" x2="150" y2="80" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <text x="145" y="75" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.4">Horiz.</text>
            {/* B<sub>E</sub> vector */}
            <line x1="40" y1="80" x2="110" y2="128" stroke="#34d399" strokeWidth="2" />
            <polygon points="110,128 103,118 115,122" fill="#34d399" />
            <text x="112" y="132" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">B<sub>E</sub></text>
            {/* B<sub>H</sub> component */}
            <line x1="40" y1="80" x2="110" y2="80" stroke="#22d3ee" strokeWidth="1.5" />
            <polygon points="110,80 102,76 102,84" fill="#22d3ee" />
            <text x="68" y="74" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">B<sub>H</sub></text>
            {/* B<sub>V</sub> component */}
            <line x1="110" y1="80" x2="110" y2="128" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="114" y="108" fill="#fb923c" fontSize="8.5" fontFamily="monospace">B<sub>V</sub></text>
            {/* Dip angle arc */}
            <path d="M 65 80 A 25 25 0 0 1 57 100" fill="none" stroke="#f87171" strokeWidth="1.2" />
            <text x="70" y="98" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">δ</text>
            {/* Formulas */}
            <text x="5" y="12" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.6">B<sub>H</sub> = B<sub>E</sub> cosδ</text>
            <text x="5" y="24" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.6">B<sub>V</sub> = B<sub>E</sub> sinδ</text>
            <text x="5" y="36" fill="#fb923c" fontSize="7" fontFamily="monospace">Poles: δ=90°</text>
            <text x="5" y="48" fill="#22d3ee" fontSize="7" fontFamily="monospace">Equator: δ=0°</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 3: HYSTERESIS LOOP ───────────────────────────────────────────────────
function HysteresisSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — B-H Hysteresis Loop for Ferromagnetic Material</p>
      <svg viewBox="0 0 340 200" className="w-full" style={{ maxHeight: 195 }}>
        {/* Axes */}
        <line x1="170" y1="15" x2="170" y2="185" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="20" y1="100" x2="320" y2="100" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.25" />
        <text x="315" y="96" fill="#ffffff" fillOpacity="0.4" fontSize="9" fontFamily="monospace">H →</text>
        <text x="174" y="20" fill="#ffffff" fillOpacity="0.4" fontSize="9" fontFamily="monospace">B ↑</text>

        {/* Main Hysteresis Loop */}
        <path d="M 290 30 
                 C 250 30, 200 45, 170 60
                 C 140 75, 90 170, 50 170
                 C 90 170, 140 155, 170 140
                 C 200 125, 250 30, 290 30 Z"
               fill="#a78bfa" fillOpacity="0.05" stroke="#a78bfa" strokeWidth="2" />

        {/* Initial Magnetization curve (from origin to saturation) */}
        <path d="M 170 100 Q 220 85 290 30" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="205" y="80" fill="#22d3ee" fontSize="7" fontFamily="monospace">Initial Magnetization</text>

        {/* Key points */}
        {/* Retentivity — B when H=0 on upper */}
        <circle cx="170" cy="60" r="3.5" fill="#34d399" />
        <line x1="170" y1="60" x2="145" y2="60" stroke="#34d399" strokeWidth="1" strokeDasharray="3,2" />
        <text x="60" y="63" fill="#34d399" fontSize="8" fontFamily="monospace">Retentivity (B<sub>r</sub>)</text>

        {/* Retentivity lower */}
        <circle cx="170" cy="140" r="3.5" fill="#34d399" />

        {/* Coercivity — H when B=0 on upper */}
        <circle cx="110" cy="100" r="3.5" fill="#fb923c" />
        <line x1="110" y1="100" x2="110" y2="120" stroke="#fb923c" strokeWidth="1" strokeDasharray="3,2" />
        <text x="65" y="134" fill="#fb923c" fontSize="8" fontFamily="monospace">Coercivity (H<sub>c</sub>)</text>

        {/* Coercivity lower */}
        <circle cx="230" cy="100" r="3.5" fill="#fb923c" />

        {/* Saturation points */}
        <circle cx="290" cy="30" r="3" fill="#f87171" />
        <text x="292" y="25" fill="#f87171" fontSize="7.5" fontFamily="monospace">Sat. (+)</text>
        <circle cx="50" cy="170" r="3" fill="#f87171" />
        <text x="15" y="170" fill="#f87171" fontSize="7.5" fontFamily="monospace">Sat. (−)</text>

        {/* Usage labels */}
        <text x="25" y="195" fill="#34d399" fontSize="7.5" fontFamily="monospace">Permanent Magnet: High B<sub>r</sub>, High H<sub>c</sub></text>
        <text x="180" y="195" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">Transformer: Low B<sub>r</sub>, Low H<sub>c</sub></text>
      </svg>
    </div>
  );
}

// ─── SVG 4: CUTTING A MAGNET ─────────────────────────────────────────────────
function CuttingMagnetSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Cutting a Bar Magnet</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Transverse cut */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Transverse Cut: m&apos; = m / 2</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Original */}
            <rect x="10" y="20" width="60" height="20" rx="3" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1.2" />
            <rect x="70" y="20" width="60" height="20" rx="3" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1.2" />
            <text x="40" y="33" fill="#f87171" fontSize="9" fontFamily="monospace" textAnchor="middle">S</text>
            <text x="100" y="33" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle">N</text>
            {/* Cut line */}
            <line x1="70" y1="12" x2="70" y2="48" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="72" y="10" fill="#fb923c" fontSize="7" fontFamily="monospace">cut</text>
            {/* Result */}
            <text x="5" y="65" fill="#f87171" fontSize="7.5" fontFamily="monospace">q<sub>m</sub> same | L/2 | m&apos; = q<sub>m</sub>(L/2) = m/2</text>
          </svg>
        </div>
        {/* Longitudinal cut */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-rose-400 block text-center">Longitudinal Cut: m&apos; = m / 2</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Original */}
            <rect x="10" y="15" width="60" height="20" rx="3" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1.2" />
            <rect x="70" y="15" width="60" height="20" rx="3" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1.2" />
            <text x="40" y="28" fill="#f87171" fontSize="9" fontFamily="monospace" textAnchor="middle">S</text>
            <text x="100" y="28" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle">N</text>
            {/* Cut line (horizontal) */}
            <line x1="8" y1="25" x2="132" y2="25" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="3,2" />
            <text x="135" y="28" fill="#fb923c" fontSize="7" fontFamily="monospace">cut</text>
            {/* Result */}
            <text x="5" y="55" fill="#f87171" fontSize="7.5" fontFamily="monospace">L same | q<sub>m</sub>/2 | m&apos; = (q<sub>m</sub>/2)L = m/2</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SolenoidAnalogySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1.1 — Equivalence of Bar Magnet and Finite Solenoid</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Magnet */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Bar Magnet</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            <rect x="50" y="35" width="30" height="20" rx="2" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1" />
            <rect x="80" y="35" width="30" height="20" rx="2" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1" />
            <text x="65" y="47" fill="#f87171" fontSize="9" fontFamily="monospace" textAnchor="middle">S</text>
            <text x="95" y="47" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle">N</text>
            <path d="M 95 35 C 95 15, 65 15, 65 35" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <path d="M 95 55 C 95 75, 65 75, 65 55" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="65" y1="45" x2="95" y2="45" stroke="#fb923c" strokeWidth="1.2" />
            <polygon points="95,45 89,42 89,48" fill="#fb923c" />
          </svg>
        </div>
        {/* Solenoid */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">Finite Solenoid (Current Loops)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Coil helices */}
            {(() => {
              const loops = [];
              for (let i = 0; i < 6; i++) {
                const x = 45 + i * 14;
                loops.push(
                  <g key={i}>
                    <path d={`M ${x} 35 C ${x+8} 35, ${x+8} 55, ${x} 55`} fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                    <path d={`M ${x} 55 C ${x-8} 55, ${x-8} 35, ${x} 35`} fill="none" stroke="#a78bfa" strokeWidth="0.5" strokeOpacity="0.5" />
                  </g>
                );
              }
              return loops;
            })()}
            <path d="M 115 35 C 115 15, 45 15, 45 35" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <path d="M 115 55 C 115 75, 45 75, 45 55" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            {/* Direction arrows */}
            <text x="35" y="47" fill="#f87171" fontSize="8" fontFamily="monospace">S</text>
            <text x="125" y="47" fill="#22d3ee" fontSize="8" fontFamily="monospace">N</text>
          </svg>
        </div>
      </div>
 <p className="text-[10px] text-white/50 leading-relaxed">
        Both produce identical external magnetic field configurations. A finite solenoid of length 2L, radius a, and n turns per unit length behaves like a bar magnet with magnetic moment M = N I A.
      </p>
    </div>
  );
}

function DomainTheorySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4.1 — Ferromagnetic Domains (Alignment in External Field)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unmagnetized */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-rose-400 block text-center">Unmagnetized (Random, B<sub>ext</sub> = 0)</span>
          <svg viewBox="0 0 140 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Domain boundaries */}
            <line x1="45" y1="15" x2="45" y2="85" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="95" y1="15" x2="95" y2="85" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="15" y1="50" x2="125" y2="50" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            
            {/* Arrows representing domain magnetization */}
            {/* Top-Left */}
            <line x1="25" y1="38" x2="35" y2="28" stroke="#f87171" strokeWidth="1.5" />
            <polygon points="35,28 27,29 34,36" fill="#f87171" />
            {/* Bottom-Left */}
            <line x1="35" y1="62" x2="25" y2="72" stroke="#f87171" strokeWidth="1.5" />
            <polygon points="25,72 33,71 26,64" fill="#f87171" />
            {/* Top-Middle */}
            <line x1="70" y1="25" x2="70" y2="40" stroke="#f87171" strokeWidth="1.5" />
            <polygon points="70,40 66,32 74,32" fill="#f87171" />
            {/* Bottom-Middle */}
            <line x1="70" y1="75" x2="70" y2="60" stroke="#f87171" strokeWidth="1.5" />
            <polygon points="70,60 66,68 74,68" fill="#f87171" />
            {/* Top-Right */}
            <line x1="105" y1="35" x2="115" y2="35" stroke="#f87171" strokeWidth="1.5" />
            <polygon points="115,35 107,31 107,39" fill="#f87171" />
            {/* Bottom-Right */}
            <line x1="115" y1="65" x2="105" y2="65" stroke="#f87171" strokeWidth="1.5" />
            <polygon points="105,65 113,61 113,69" fill="#f87171" />
          </svg>
        </div>
        {/* Magnetized */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Magnetized (Aligned, B<sub>ext</sub> &gt; 0)</span>
          <svg viewBox="0 0 140 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Domain boundaries (shifted/grown) */}
            <line x1="30" y1="15" x2="30" y2="85" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="110" y1="15" x2="110" y2="85" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            <line x1="15" y1="50" x2="125" y2="50" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.2" />
            
            {/* All arrows aligned in direction of B<sub>ext</sub> (right) */}
            {(() => {
              const aligned = [];
              const coords = [[20, 32], [20, 68], [50, 32], [50, 68], [70, 32], [70, 68], [90, 32], [90, 68], [120, 32], [120, 68]];
              for (let i = 0; i < coords.length; i++) {
                const [x, y] = coords[i];
                aligned.push(
                  <g key={i}>
                    <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="#22d3ee" strokeWidth="1.5" />
                    <polygon points={`${x+5},${y} ${x-1},${y-3} ${x-1},${y+3}`} fill="#22d3ee" />
                  </g>
                );
              }
              return aligned;
            })()}
          </svg>
        </div>
      </div>
 <p className="text-[10px] text-white/50 leading-relaxed">
        In ferromagnetic materials, individual atomic dipoles interact to form microscopic regions (~1 mm size) called **domains**. In unmagnetized state, domain orientations are random (net M = 0). Under B<sub>ext</sub>, domains align and grow, causing massive magnetization.
      </p>
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

function PremiumFormulaCard({ formula, label, use, priority = 5 }: { formula: string; label: string; use: string; priority?: number }) {
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
export default function MagnetismMatterDetail({ progress, isCompleted, onNavigate }: Props) {
  const [chiValue, setChiValue] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<'dipole' | 'earth' | 'material'>('dipole');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(12).fill(false));

  const identifyMaterial = (chi: number) => {
    if (chi < 0) return { label: 'Diamagnetic', color: 'text-cyan-400', detail: 'Repelled from field. Temperature-independent. χ < 0, μ<sub>r</sub> < 1. Examples: Bi, Cu, Water, Gold.' };
    if (chi > 0 && chi < 10) return { label: 'Paramagnetic', color: 'text-amber-400', detail: 'Weakly attracted. Follows Curie\'s Law (χ ∝ 1/T). χ small positive. Examples: Al, Na, O₂.' };
    return { label: 'Ferromagnetic', color: 'text-rose-400', detail: 'Strongly attracted. Has domains. χ ≫ 1, μ<sub>r</sub> ≫ 1. Becomes paramagnetic above Curie temperature T<sub>c</sub>. Examples: Fe, Ni, Co.' };
  };

  const chiNum = parseFloat(chiValue);
  const materialResult = !isNaN(chiNum) ? identifyMaterial(chiNum) : null;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🧲</span>
              <Tag color="emerald">Physics Unit 5</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Hot Topic</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-emerald-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Magnetism and Matter
            </h1>
            <p className="text-[12px] text-emerald-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Moving Charges</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Magnetic Field</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Magnetic Dipole</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '20 min' },
              { label: 'Expected Questions', value: '1-2 / year' },
              { label: 'Weightage', value: '★★★★☆' },
              { label: 'Difficulty', value: 'Medium (3.5/5)' },
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
              <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 rounded-full"
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
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </div>
            <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">What You Will Learn</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              "Bar magnet as magnetic dipole — axial and equatorial field formulas",
              "Gauss's Law for magnetism: ∮B·dA = 0 → no magnetic monopoles",
              "Diamagnetic, Paramagnetic, and Ferromagnetic material comparison",
              "Curie's Law (χ ∝ 1/T) and Curie Temperature for ferromagnets",
              "Earth's magnetism: declination, dip angle, B<sub>H</sub> and B<sub>V</sub> components",
              "Apparent dip formula: tan δ' = tan δ / cos θ",
              "Hysteresis loop: retentivity and coercivity for magnets and cores",
              "Magnetisation M, intensity H, and relationship B = μ<sub>0</sub>(H + M)"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: BAR MAGNET FORMULAS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Bar Magnet as a Magnetic Dipole</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A bar magnet behaves like an ideal magnetic dipole. Its magnetic moment <code>m = q<sub>m</sub> &middot; 2l</code> points from South to North pole (inside the magnet). All dipole formulas are direct analogues of electrostatic dipole formulas via the substitution: <code>p &rarr; m, E &rarr; B, 1/4&pi;&epsilon;<sub>0</sub> &rarr; &mu;<sub>0</sub>/4&pi;</code>.
        </p>

        {/* Pole strength and length details */}
        <div className="grid sm:grid-cols-2 gap-3.5">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">📐 Magnetic vs Geometric Length</span>
            <p className="text-white/70">
              The poles of a bar magnet do not reside exactly at the physical ends, but slightly inside.
            </p>
            <ul className="text-white/60 space-y-1">
              <li>&bull; <strong className="text-white">Magnetic Length (2l):</strong> Distance between poles.</li>
              <li>&bull; <strong className="text-white">Geometric Length (L<sub>geo</sub>):</strong> Overall physical length.</li>
              <li>&bull; <strong className="text-emerald-400">Ratio:</strong> <code>2l = L<sub>mag</sub> &asymp; 5/6 &middot; L<sub>geo</sub> &asymp; 0.84 L<sub>geo</sub></code>.</li>
            </ul>
          </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-amber-400 font-bold uppercase tracking-wider block">🧲 Pole Strength (q<sub>m</sub>) &amp; Coulomb&apos;s Law</span>
            <ul className="text-white/60 space-y-1">
              <li>&bull; <strong className="text-white">Pole Strength (q<sub>m</sub>):</strong> The charge-equivalent strength of a single pole. Unit is <strong className="text-white">A &middot; m</strong> or <strong className="text-white">J / T</strong>.</li>
              <li>&bull; <strong className="text-white">Coulomb&apos;s Law for Poles:</strong> Force between two magnetic poles:
                <code className="text-cyan-300 block mt-1">F = (&mu;<sub>0</sub> / 4&pi;) &middot; (q<sub>m1</sub> &middot; q<sub>m2</sub> / r&sup2;)</code>
              </li>
            </ul>
          </div>
        </div>

        {/* Solenoid Analogy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
 <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[12px] font-bold">ANALOGY</span>
 <span className="text-[12px] text-white/50">Bar Magnet as Equivalent Solenoid</span>
          </div>
          <SolenoidAnalogySVG />
        </div>

        <BarMagnetSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="B<sub>axis</sub> = (μ<sub>0</sub>/4π) * 2m/r³"
            use="Magnetic field on the axial line (end-on position)"
            note="Direction is same as m (S→N). For short dipole: r ≫ 2l. Compare: E<sub>axis</sub> = 2p/4πε₀r³"
            priority={5}
          />
          <FormulaCard
            formula="B<sub>eq</sub> = (μ<sub>0</sub>/4π) * m/r³"
            use="Magnetic field on the equatorial line (broadside-on)"
            note="Direction is OPPOSITE to m. B<sub>eq</sub> = B<sub>axis</sub>/2 for same r. Compare: E<sub>eq</sub> = p/4πε₀r³"
            priority={5}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="&tau; = mB sin&theta; | U = &minus;mB cos&theta; | W = mB(cos&theta;<sub>1</sub> &minus; cos&theta;<sub>2</sub>)"
            use="Torque, Potential Energy, and Work Done in rotating a dipole"
            note="Stable equilibrium (U min): &theta;=0&deg;, m &parallel; B. Unstable (U max): &theta;=180&deg;, m antiparallel to B. W = mB(1 &minus; cos&theta;) when rotated from 0&deg; to &theta;."
            priority={5}
          />
          <FormulaCard
            formula="T = 2&pi; &radic;(I / mB)"
            use="Time period of a freely oscillating bar magnet in field B"
            note="I = moment of inertia. Since T &prop; 1/&radic;B, doubling B makes T &rarr; T/&radic;2."
            priority={5}
          />
        </div>
        <CuttingMagnetSVG />
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">⚡ Electrostatics Analogy — Every Formula Transfers Directly</span>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-[12px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left py-1.5 px-2 text-cyan-400">Electric Dipole</th>
                  <th className="text-left py-1.5 px-2 text-violet-400">Magnetic Dipole</th>
                  <th className="text-left py-1.5 px-2 text-white/40">Substitution</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['p = q * 2l', 'm = q<sub>m</sub> * 2l', 'p → m'],
                  ['E<sub>axis</sub> = 2p/4πε₀r³', 'B<sub>axis</sub> = μ<sub>0</sub>2m/4πr³', '1/4πε₀ → μ<sub>0</sub>/4π'],
                  ['E<sub>eq</sub> = p/4πε₀r³', 'B<sub>eq</sub> = μ<sub>0</sub>m/4πr³', 'E → B'],
                  ['τ = pE sinθ', 'τ = mB sinθ', 'Direct analogy'],
                  ['U = −pE cosθ', 'U = −mB cosθ', 'Direct analogy'],
                ].map(([el, mag, sub]) => (
                  <tr key={el as string} className="border-b border-white/5 last:border-0">
                    <td className="py-1.5 px-2 text-cyan-300" dangerouslySetInnerHTML={{ __html: el as string }} />
                    <td className="py-1.5 px-2 text-violet-300" dangerouslySetInnerHTML={{ __html: mag as string }} />
                    <td className="py-1.5 px-2 text-white/40" dangerouslySetInnerHTML={{ __html: sub as string }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Null Points */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">📍 Null Points &amp; Earth&apos;s Field Cancellation</span>
          <p className="text-white/70 leading-relaxed">
            Null points are coordinates where the magnetic field of a bar magnet cancels the horizontal component of Earth&apos;s magnetic field exactly (B<sub>net</sub> = 0).
          </p>
          <ul className="text-white/60 space-y-1">
            <li>&bull; <strong className="text-white">Axial Null Points (Solenoid End-on):</strong> Occur when the magnet is placed with its North pole pointing North. The null points lie on the equatorial line: <code>B<sub>eq</sub> = B<sub>H</sub></code>.</li>
            <li>&bull; <strong className="text-white">Equatorial Null Points (Broadside-on):</strong> Occur when the magnet is placed with its North pole pointing South. The null points lie on the axial line: <code>B<sub>axis</sub> = B<sub>H</sub></code>.</li>
          </ul>
        </div>
      </div>

      {/* PART 2: MAGNETIC MATERIALS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Magnetic Materials — Highest Yield Section</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          When a material is placed in an external magnetic field H, its response is characterised by its magnetic susceptibility χ. The total field inside the material is <code>B = μ<sub>0</sub>(H + M) = μ<sub>0</sub>μ<sub>r</sub> H</code>.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px] min-w-[540px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Property</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Diamagnetic (χ &lt; 0)</th>
                <th className="text-left px-4 py-3 text-amber-400 font-bold uppercase">Paramagnetic (χ &gt; 0, small)</th>
                <th className="text-left px-4 py-3 text-rose-400 font-bold uppercase">Ferromagnetic (χ ≫ 0)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Behaviour in B', 'Weakly repelled', 'Weakly attracted', 'Strongly attracted'],
                ['In non-uniform B', 'Moves to weak region', 'Moves to strong region', 'Moves to strong region'],
                ['Susceptibility χ', '−1 ≤ χ &lt; 0', '0 &lt; χ &lt; ε (small)', 'χ ≫ 1 (thousands)'],
                ['Rel. Permeability μ<sub>r</sub>', '0 ≤ μ<sub>r</sub> &lt; 1', 'μ<sub>r</sub> &gt; 1 (slightly)', 'μ<sub>r</sub> ≫ 1 (100s–1000s)'],
                ['Temperature effect', 'Independent of T', 'χ ∝ 1/T (Curie Law)', 'Becomes paramagnetic above T<sub>c</sub>'],
                ['Examples', 'Bi, Cu, H₂O, Au', 'Al, Na, O₂ (STP)', 'Fe, Ni, Co, Alnico'],
              ].map(([prop, dia, para, ferro]) => (
                <tr key={prop as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white/60 font-semibold" dangerouslySetInnerHTML={{ __html: prop as string }} />
                  <td className="px-4 py-2.5 text-cyan-300" dangerouslySetInnerHTML={{ __html: dia as string }} />
                  <td className="px-4 py-2.5 text-amber-300" dangerouslySetInnerHTML={{ __html: para as string }} />
                  <td className="px-4 py-2.5 text-rose-300" dangerouslySetInnerHTML={{ __html: ferro as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

 <div className="p-4 rounded-2xl bg-[#090b18] border border-amber-500/10 text-[12px] space-y-1.5">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">💡 Memory Trick</span>
          <p className="text-white/70">
            <strong className="text-cyan-400">Dia</strong> — DIA-magnet opposes / dies away from field (negative χ, like "dead" to magnetism).
            <br /><strong className="text-amber-400">Para</strong> — PARAmagnet is parallel-passive, weakly follows (small positive χ, like a follower).
            <br /><strong className="text-rose-400">Ferro</strong> — FERROcious magnet is strongly attracted (huge positive χ, ferocious attraction).
          </p>
        </div>

        {/* Interactive Material Identifier */}
        <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
 <span className="text-[12px] font-bold text-white/50 uppercase tracking-wider block">🔬 Interactive: Enter χ value to identify material</span>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              value={chiValue}
              onChange={e => setChiValue(e.target.value)}
              placeholder="e.g. -0.005 or 0.003 or 5000"
 className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-emerald-500/40 transition-colors"
            />
 <span className="text-white/40 text-[13px] shrink-0">χ =</span>
          </div>
          {materialResult && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/8">
 <p className={`font-bold text-[14.5px] ${materialResult.color}`}>{materialResult.label}</p>
              <p className="text-white/60 text-[12px] mt-1 leading-relaxed">{materialResult.detail}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {[
            { emoji: '❄️', title: 'Superconductors — Perfect Diamagnets', formula: 'χ = −1, μ<sub>r</sub> = 0', detail: 'A superconductor below its critical temperature completely expels all magnetic flux from its interior (Meissner Effect). It is a perfect diamagnet with χ = −1 and μ<sub>r</sub> = 0. No field exists inside it whatsoever.' },
            { emoji: '📉', title: "Curie's Law for Paramagnets", formula: 'χ = C / T', detail: "For paramagnetic materials, susceptibility is inversely proportional to absolute temperature: χ = C/T (C is the Curie constant). This means as temperature rises, the material becomes less magnetic because thermal agitation randomizes the atomic dipole alignment. Diamagnets are strictly temperature-independent — never apply Curie's Law to them." },
          ].map(c => <RevealCard key={c.title} {...c} />)}
        </div>

        {/* SI Units Table */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[12px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">📏 SI Units &amp; Dimensions of Magnetic Quantities</span>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-[12px]">
              <thead>
                <tr className="border-b border-white/8 text-white/50">
                  <th className="text-left py-1.5 px-2">Quantity</th>
                  <th className="text-left py-1.5 px-2">Symbol</th>
                  <th className="text-left py-1.5 px-2">SI Unit</th>
                  <th className="text-left py-1.5 px-2">Dimensions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Magnetic Field / Flux Density', 'B', 'Tesla (T) or Wb/m&sup2;', '[M T<sup>&minus;2</sup> A<sup>&minus;1</sup>]'],
                  ['Magnetic Intensity / Field Strength', 'H', 'A / m', '[L<sup>&minus;1</sup> A]'],
                  ['Intensity of Magnetisation', 'M', 'A / m', '[L<sup>&minus;1</sup> A]'],
                  ['Magnetic Susceptibility', '&chi;', 'Dimensionless', 'M&deg;L&deg;T&deg;A&deg;'],
                  ['Relative Permeability', '&mu;<sub>r</sub>', 'Dimensionless', 'M&deg;L&deg;T&deg;A&deg;'],
                  ['Permeability of Vacuum/Medium', '&mu;', 'T &middot; m / A or H / m', '[M L T<sup>&minus;2</sup> A<sup>&minus;2</sup>]'],
                ].map(([qty, sym, unit, dim]) => (
                  <tr key={sym} className="border-b border-white/5 last:border-0">
                    <td className="py-1.5 px-2 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: qty }} />
                    <td className="py-1.5 px-2 text-cyan-300 font-bold" dangerouslySetInnerHTML={{ __html: sym }} />
                    <td className="py-1.5 px-2 text-emerald-300" dangerouslySetInnerHTML={{ __html: unit }} />
                    <td className="py-1.5 px-2 text-violet-300" dangerouslySetInnerHTML={{ __html: dim }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Domain Theory Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
 <span className="px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-400 text-[12px] font-bold">DOMAIN THEORY</span>
 <span className="text-[12px] text-white/50">Microscopic Alignment in Ferromagnets</span>
          </div>
          <DomainTheorySVG />
        </div>

        {/* NCERT Reasoning Points */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[12px]">
          <span className="text-[12px] font-bold text-amber-400 uppercase tracking-wider block">❓ NCERT Additional Exercises Reasoning — High Probability MCQ Cues</span>
          <div className="space-y-3 text-white/70 leading-relaxed">
            <p>
              1. <strong className="text-white">Why does a paramagnetic sample display greater magnetisation when cooled?</strong>
              <br />At lower temperatures, thermal agitation decreases. Atomic dipoles undergo less random vibration and align more effectively along the direction of external field.
            </p>
            <p>
              2. <strong className="text-white">Why is diamagnetism temperature-independent?</strong>
              <br />Diamagnetism arises from induced orbital currents when an external field is applied (Lenz&apos;s Law). It does not depend on permanent atomic dipoles, meaning thermal fluctuations cannot disrupt it.
            </p>
            <p>
              3. <strong className="text-white">Why do magnetic field lines align normally to ferromagnetic surfaces?</strong>
              <br />Ferromagnetic materials have very high relative permeability (&mu;<sub>r</sub> &gt;&gt; 1000). The field lines choose the path of least reluctance, passing perpendicularly into the highly permeable medium.
            </p>
            <p>
              4. <strong className="text-white">Maximum Magnetisation:</strong>
              <br />A paramagnetic material requires extreme fields (~10<sup>5</sup> times stronger) to reach the same level of saturation magnetisation as a ferromagnetic material because paramagnets lack the cooperative domain alignment mechanism.
            </p>
          </div>
        </div>
      </div>

      {/* PART 3: EARTH'S MAGNETISM */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Earth's Magnetism — Declination, Dip &amp; Components</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Earth behaves like a giant magnetic dipole. Crucially, the magnetic North Pole is near the geographic South Pole and vice versa — so the geographic North is actually a magnetic South (which is why a compass needle's North end points toward it). The field is thought to arise from the Dynamo Effect (convection currents in molten outer core).
        </p>
        <EarthMagnetismSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="B<sub>H</sub> = B<sub>E</sub> cosδ | B<sub>V</sub> = B<sub>E</sub> sinδ"
            use="Horizontal and vertical components of Earth's field"
            note="At poles: δ = 90° → B<sub>H</sub> = 0, B<sub>V</sub> = B<sub>E</sub>. At equator: δ = 0° → B<sub>H</sub> = B<sub>E</sub>, B<sub>V</sub> = 0."
            priority={5}
          />
          <FormulaCard
            formula="tan δ&apos; = tan δ / cos θ"
            use="Apparent dip δ&apos; measured in plane at angle θ to magnetic meridian"
            note="True dip δ is only measured in the magnetic meridian plane. In any other plane, dip appears larger (δ&apos; ≥ δ)."
            priority={4}
          />
        </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3.5">
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">🌍 Three Magnetic Elements &amp; Tangent Law</span>
          <ul className="text-white/70 space-y-1.5">
            <li>&bull; <strong className="text-white">Declination (&alpha;):</strong> Angle between the geographic meridian and the magnetic meridian. Varies with geographic location.</li>
            <li>&bull; <strong className="text-white">Inclination/Dip (&delta;):</strong> Angle between Earth&apos;s total field B<sub>E</sub> and the horizontal. Dip = 90&deg; at poles, 0&deg; at equator.</li>
            <li>&bull; <strong className="text-white">Horizontal Component (B<sub>H</sub>):</strong> The component of B<sub>E</sub> in the horizontal plane: <code>B<sub>H</sub> = B<sub>E</sub> cos&delta;</code>. Note that <code>tan &delta; = B<sub>V</sub> / B<sub>H</sub></code>.</li>
            <li>&bull; <strong className="text-white">Tangent Law:</strong> When a magnetic needle is suspended in two mutually perpendicular fields &mdash; Earth&apos;s field B<sub>H</sub> and an external field B &mdash; it deflects by angle &theta; such that: <code className="text-cyan-300">B = B<sub>H</sub> tan&theta;</code>.</li>
          </ul>

          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block pt-2 border-t border-white/5">🗺️ Earth&apos;s Magnetic Maps (Isogonic, Agonic, Isoclinic, Aclinic)</span>
          <p className="text-white/70">MCQs frequently check definitions of imaginary lines on Earth&apos;s magnetic maps:</p>
          <ul className="text-white/60 space-y-1">
            <li>&bull; <strong className="text-white">Isogonic Lines:</strong> Connect locations on Earth with the <strong className="text-cyan-300">SAME declination</strong> (&alpha;).</li>
            <li>&bull; <strong className="text-white">Agonic Lines:</strong> Connect locations with <strong className="text-rose-400">ZERO declination</strong> (&alpha; = 0).</li>
            <li>&bull; <strong className="text-white">Isoclinic Lines:</strong> Connect locations with the <strong className="text-cyan-300">SAME dip angle</strong> (&delta;).</li>
            <li>&bull; <strong className="text-white">Aclinic Lines (Magnetic Equator):</strong> Connect locations with <strong className="text-rose-400">ZERO dip angle</strong> (&delta; = 0).</li>
          </ul>

          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block pt-2 border-t border-white/5">📏 Magnetic Latitude Relations</span>
          <p className="text-white/70">
            For magnetic latitude &lambda; (measured from magnetic equator):
            <br />&bull; Dip angle relation: <code className="text-cyan-300">tan &delta; = 2 tan &lambda;</code>.
            <br />&bull; Total intensity relation: <code className="text-cyan-300">B<sub>E</sub> = B<sub>0</sub> &radic;(1 + 3 sin&sup2; &lambda;)</code> (where B<sub>0</sub> is field at magnetic equator).
          </p>

          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block pt-2 border-t border-white/5">⚡ Earth&apos;s Dynamo Effect Mechanism</span>
          <p className="text-white/70">
            Earth&apos;s magnetic field is generated by convective currents of highly conducting molten fluids (iron and nickel) in its outer core. This rotation-induced convection acts as a self-sustaining dynamo (convective loop currents generate magnetic field, which induces further currents).
          </p>
        </div>
      </div>

      {/* PART 4: HYSTERESIS & GAUSS'S LAW */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Hysteresis, Gauss's Law &amp; H vs B</h2>
        </div>
        <HysteresisSVG />
        <div className="grid sm:grid-cols-2 gap-3">
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2.5 text-[12px]">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">🔴 Permanent Magnets</span>
            <p className="text-white/70">Need <strong className="text-white">High Retentivity</strong> (B<sub>r</sub>) &mdash; strong field retained after removing H.</p>
            <p className="text-white/70">Need <strong className="text-white">High Coercivity</strong> (H<sub>c</sub>) &mdash; resists demagnetisation by stray fields.</p>
            <p className="text-white/55 text-[12px]">Materials: Steel, Alnico, SmCo<sub>5</sub>, Nd&sub2;Fe<sub>14</sub>B</p>
          </div>
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2.5 text-[12px]">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🔵 Electromagnets &amp; Cores</span>
            <p className="text-white/70">Need <strong className="text-white">High Permeability</strong> &mdash; strong magnetic field for small coil currents.</p>
            <p className="text-white/70">Need <strong className="text-white">Low Retentivity &amp; Coercivity</strong> &mdash; demagnetises instantly when current is turned off.</p>
            <p className="text-white/55 text-[12px]">Materials: Soft Iron (highly permeable, loses magnetism easily)</p>
          </div>
        </div>

        {/* Hysteresis Energy Loss */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">🔥 Hysteresis Energy Loss</span>
          <p className="text-white/70">
            When a ferromagnetic material is subjected to an AC magnetising field, energy is lost as heat due to the work done in flipping domain orientations.
            <br />&bull; <strong className="text-white">Energy lost per unit volume per cycle:</strong> Equals the <strong className="text-white">Area under the B-H loop</strong>: <code>E<sub>loss</sub> = &Boint; B dH</code>.
            <br />&bull; Soft iron has a narrow loop (low area) &rarr; low energy loss, making it ideal for transformer cores.
          </p>
        </div>

        {/* Gauss's Law Comparison */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">∮ Gauss&apos;s Law in Electrostatics vs Magnetism</span>
          <div className="grid sm:grid-cols-2 gap-3 text-white/75">
            <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-cyan-400 uppercase block font-bold mb-1">Electrostatics</span>
              <code>&Boint; E &middot; dA = q / &epsilon;<sub>0</sub></code>
              <p className="text-white/55 text-[11px] mt-1">Electric monopoles (free charges) exist. Field lines start on positive and end on negative charge.</p>
            </div>
            <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
              <span className="text-[10px] text-emerald-400 uppercase block font-bold mb-1">Magnetism</span>
              <code>&Boint; B &middot; dA = 0</code>
              <p className="text-white/55 text-[11px] mt-1">Magnetic monopoles DO NOT exist. Field lines always form closed loops. If monopoles existed, this would equal <code>&mu;<sub>0</sub> q<sub>m</sub></code>.</p>
            </div>
          </div>
        </div>

        {/* Magnetic Shielding */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">🛡️ Magnetic Shielding (NCERT Additional Exercise)</span>
          <p className="text-white/70 leading-relaxed">
            Sensitive instruments can be shielded from external magnetic fields by enclosing them within a hollow ferromagnetic box of high permeability (like soft iron). The external field lines prefer to pass through the highly permeable walls rather than the interior air gap, leaving the inside field-free.
          </p>
        </div>

        {/* H vs B derivation */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">H vs B — The &quot;Effort&quot; vs &quot;Result&quot; Derivation</span>
          <p className="text-white/65 leading-relaxed">
            Think of <code className="text-amber-300">H (Magnetic Intensity)</code> as the driving <strong>effort</strong> applied by the coil/current. Think of <code className="text-cyan-300">B (Magnetic Field)</code> as the final <strong>result</strong> inside the material.
            <br /><br />
            <strong>Step-by-step derivation:</strong>
            <br />1. Total magnetic field inside a magnetized material: <code className="text-cyan-300 block">B = &mu;<sub>0</sub>(H + M)</code>
            <br />2. Since magnetization M is proportional to field intensity H: <code className="text-cyan-300 block">M = &chi; H</code>
            <br />3. Substituting M: <code className="text-cyan-300 block">B = &mu;<sub>0</sub>(H + &chi; H) = &mu;<sub>0</sub>(1 + &chi;)H</code>
            <br />4. Defining relative permeability <code>&mu;<sub>r</sub> = 1 + &chi;</code>: <code className="text-cyan-300 font-bold block text-[13px] mt-1">B = &mu;<sub>0</sub> &mu;<sub>r</sub> H = &mu; H</code>
          </p>
        </div>
      </div>

      {/* PART 5: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Oscillating Compass — Time Period Change</span>
          <p className="text-white/80">A compass needle oscillates with time period T in a region where Earth's horizontal field is B<sub>H</sub>. The external field is now doubled by placing a bar magnet nearby. Find the new time period.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>Since <code>T = 2π√(I/mB)</code>, we have <code>T ∝ 1/√B</code>.</p>
            <p>New field: <code>B&apos; = 2B<sub>H</sub></code>, so <code>T&apos; = T / √2</code>.</p>
            <p className="text-cyan-300 font-bold">New time period T&apos; = T / √2 ≈ 0.707 T</p>
          </div>
        </div>

 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Identify Material from χ and Find μ<sub>r</sub></span>
          <p className="text-white/80">A material has susceptibility χ = −0.00005. (a) Identify the material type. (b) Find its relative permeability μ<sub>r</sub>. (c) Does it obey Curie's Law?</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>(a) χ is negative → <strong className="text-cyan-300">Diamagnetic</strong>. Weakly repelled from field. Examples: Bi, Cu, Water.</p>
            <p>(b) <code>μ<sub>r</sub> = 1 + χ = 1 + (−0.00005) = 0.99995</code> → slightly less than 1 ✓ (characteristic of diamagnets).</p>
            <p>(c) <strong className="text-rose-300">No</strong> — Curie's Law (χ ∝ 1/T) applies ONLY to paramagnets. Diamagnetism is an intrinsic orbital effect, temperature-independent.</p>
          </div>
        </div>

 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Find True Dip from Apparent Dip</span>
          <p className="text-white/80">The apparent dip in a plane making 30° with the magnetic meridian is observed to be 45°. Find the true dip δ.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>Using: <code>tan δ&apos; = tan δ / cos θ</code></p>
            <p><code>tan 45° = tan δ / cos 30°</code></p>
            <p><code>1 = tan δ / (√3/2)</code></p>
            <p><code>tan δ = √3/2 ≈ 0.866</code></p>
            <p className="text-cyan-300 font-bold">True dip δ = arctan(0.866) ≈ 40.9°</p>
          </div>
        </div>
      </div>

      {/* FORMULA DECISION TREE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-emerald-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-emerald-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dipole', label: '🧲 Dipole Field' },
            { id: 'earth', label: '🌍 Earth Magnetism' },
            { id: 'material', label: '📊 Material ID' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSelectedGoal(btn.id as any)}
              className={cn(
'px-3 py-1.5 rounded-xl border text-[13px] font-bold transition-all',
                selectedGoal === btn.id
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.15)]'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white/80 hover:bg-white/[0.04]'
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 text-[13px] space-y-2">
          {selectedGoal === 'dipole' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Find field of bar magnet at a point</span>
              <p className="text-white/70">1. On axial line (end-on): <code>B = μ<sub>0</sub> * 2m / (4π r³)</code> — same direction as m.</p>
              <p className="text-white/70">2. On equatorial line (broadside): <code>B = μ<sub>0</sub> * m / (4π r³)</code> — opposite to m.</p>
              <p className="text-white/70">3. Axial is twice equatorial for same r: <code>B<sub>axis</sub> = 2 * B<sub>eq</sub></code>.</p>
              <p className="text-white/70">4. Time period: <code>T ∝ 1/√B</code> — doubling B gives T/√2.</p>
            </>
          )}
          {selectedGoal === 'earth' && (
            <>
              <span className="text-[12px] font-bold text-emerald-400 uppercase block">Objective: Earth field components and dip</span>
              <p className="text-white/70">1. Components: <code>B<sub>H</sub> = B<sub>E</sub> cosδ</code>, <code>B<sub>V</sub> = B<sub>E</sub> sinδ</code></p>
              <p className="text-white/70">2. True dip: <code>tan δ = B<sub>V</sub> / B<sub>H</sub></code></p>
              <p className="text-white/70">3. Apparent dip: <code>tan δ&apos; = tan δ / cos θ</code> (θ = angle from meridian)</p>
              <p className="text-white/70">4. Dip at poles = 90°; Dip at equator = 0°</p>
            </>
          )}
          {selectedGoal === 'material' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Identify material class from χ or μ<sub>r</sub></span>
              <p className="text-white/70">1. χ &lt; 0 (or μ<sub>r</sub> &lt; 1) → <strong className="text-cyan-300">Diamagnetic</strong> — repelled, T-independent.</p>
              <p className="text-white/70">2. χ &gt; 0, small (or μ<sub>r</sub> slightly &gt; 1) → <strong className="text-amber-300">Paramagnetic</strong> — weakly attracted, χ ∝ 1/T.</p>
              <p className="text-white/70">3. χ ≫ 1 (or μ<sub>r</sub> ≫ 1) → <strong className="text-rose-300">Ferromagnetic</strong> — strongly attracted, has T<sub>c</sub>, hysteresis.</p>
              <p className="text-white/70">4. χ = −1, μ<sub>r</sub> = 0 → <strong className="text-white">Perfect Diamagnet</strong> = Superconductor (Meissner Effect).</p>
            </>
          )}
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-emerald-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"χ = −0.005" or "μ<sub>r</sub> = 0.998"', think: "Diamagnetic. Negative χ or μ<sub>r</sub> < 1. Moves to weaker field region. Not temperature-dependent." },
            { cue: '"χ ≫ 1" or "μ<sub>r</sub> = 5000"', think: "Ferromagnetic. Strongly attracted. Has Curie temperature. Shows hysteresis." },
            { cue: '"Dip angle at poles / equator"', think: "δ = 90° at geographic poles (B<sub>H</sub> = 0). δ = 0° at equator (B<sub>V</sub> = 0)." },
            { cue: '"Bar magnet placed in another plane"', think: "Apparent dip: tan δ' = tan δ / cos θ. Always larger than true dip." },
            { cue: '"Compass needle oscillates, B is doubled"', think: "T ∝ 1/√B. If B doubles: T' = T/√2. If B is 4×: T' = T/2." },
            { cue: '"Permanent magnet vs transformer core"', think: "Permanent: High B<sub>r</sub>, High H<sub>c</sub>. Transformer: Low B<sub>r</sub>, Low H<sub>c</sub> (thin hysteresis loop)." },
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="text-[13px] font-mono text-emerald-400" dangerouslySetInnerHTML={{ __html: cue }} />
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
          <TrapCard title="Trap 1: Field Inside a Bar Magnet is NOT Zero">
            Outside a bar magnet, field lines go N → S. But inside, lines go S → N (to complete closed loops). The field inside a bar magnet is non-zero and directed from S to N. This is exactly what ∮B·dA = 0 requires.
          </TrapCard>
          <TrapCard title="Trap 2: Curie's Law Only for Paramagnets">
            Never apply Curie's Law (χ ∝ 1/T) to diamagnetic materials. Diamagnetism is an intrinsic orbital effect — it is temperature-independent. Applying it is a classic IAT distractor.
          </TrapCard>
          <TrapCard title="Trap 3: Confusing M and m">
            m = magnetic dipole moment (A·m²) — property of a specific bar or loop.
            M = Magnetisation (A/m) — dipole moment per unit volume of a material.
            Units are completely different. IAT MCQs deliberately mix them.
          </TrapCard>
          <TrapCard title="Trap 4: Geographic North ≠ Magnetic North">
            Earth's magnetic North Pole is near the geographic South Pole. The North end of a compass needle points geographically north — but that geographic north is actually a magnetic south (attracting the compass needle's North). Highly counter-intuitive and a direct IAT question.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-emerald-400" />
 <h3 className="text-emerald-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Bar magnet dipole moment m = q<sub>m</sub> &middot; 2l (S &rarr; N inside)",
            "Axial field: B = &mu;<sub>0</sub> &middot; 2m / (4&pi;r&sup3;) (same as m)",
            "Equatorial field: B = &mu;<sub>0</sub> &middot; m / (4&pi;r&sup3;) (opposite to m)",
            "U = &minus;mB cos&theta;; Stable at &theta;=0&deg; (min U); Unstable at &theta;=180&deg; (max U)",
            "T = 2&pi;&radic;(I/mB); T &prop; 1/&radic;B; doubling B &rarr; T' = T/&radic;2",
            "∮B&middot;dA = 0 &mdash; field lines closed loops &rarr; no magnetic monopoles",
            "Diamagnetic: &chi; &lt; 0, repelled, temp-independent (Bi, Cu, water)",
            "Paramagnetic: &chi; &gt; 0 small, Curie's Law &chi; &prop; 1/T (Al, Na, O<sub>2</sub>)",
            "Ferromagnetic: &chi; &gt;&gt; 1, domains, becomes para above T<sub>c</sub>",
            "Dip: 90&deg; at poles, 0&deg; at equator; Apparent dip: tan &delta;' = tan &delta; / cos &theta;",
            "Hysteresis: permanent magnet needs high B<sub>r</sub> + high H<sub>c</sub>",
            "Transformer core needs low B<sub>r</sub> + low H<sub>c</sub> (thin loop, low heat loss)"
          ].map((item, idx) => (
            <button
              key={item}
              onClick={() => setCheckedItems(prev => {
                const next = [...prev];
                next[idx] = !next[idx];
                return next;
              })}
              className="w-full text-left flex items-start gap-2.5 text-[13px] py-1 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors rounded px-1.5 focus:outline-none"
            >
              {checkedItems[idx] ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
              )}
              <span className={checkedItems[idx] ? 'text-white/40 line-through' : 'text-white/70'} dangerouslySetInnerHTML={{ __html: item }} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
