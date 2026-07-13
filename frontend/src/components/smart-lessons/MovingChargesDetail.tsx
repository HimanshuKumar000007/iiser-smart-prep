import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: RIGHT-HAND RULE & FORCE DIRECTIONS ───────────────────────────────
function RightHandRuleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Lorentz Force Direction (Right-Hand Rule)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Cross Product: F = q(v * B)</span>
          <svg viewBox="0 0 180 120" className="w-full" style={{ maxHeight: 110 }}>
            {/* Origin */}
            <circle cx="90" cy="70" r="3" fill="#ffffff" fillOpacity="0.6" />
            {/* v vector (right) */}
            <line x1="90" y1="70" x2="155" y2="70" stroke="#22d3ee" strokeWidth="2" />
            <polygon points="155,70 147,65 147,75" fill="#22d3ee" />
            <text x="130" y="62" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold">v</text>
            {/* B vector (up) */}
            <line x1="90" y1="70" x2="90" y2="15" stroke="#a78bfa" strokeWidth="2" />
            <polygon points="90,15 85,23 95,23" fill="#a78bfa" />
            <text x="96" y="28" fill="#a78bfa" fontSize="10" fontFamily="monospace" fontWeight="bold">B</text>
            {/* F = v×B out of page */}
            <circle cx="90" cy="70" r="12" fill="none" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="90" cy="70" r="3" fill="#34d399" />
            <text x="108" y="74" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">F (out)</text>
            {/* Angle arc */}
            <path d="M 105 70 A 15 15 0 0 0 90 55" fill="none" stroke="#fb923c" strokeWidth="1" />
            <text x="108" y="60" fill="#fb923c" fontSize="8" fontFamily="monospace">θ</text>
          </svg>
 <p className="text-[10px] text-white/50 text-center">|F| = qvB sinθ</p>
        </div>
        <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-rose-400 block text-center">Negative Charge: REVERSE the direction!</span>
          <svg viewBox="0 0 180 120" className="w-full" style={{ maxHeight: 110 }}>
            <circle cx="90" cy="70" r="3" fill="#ffffff" fillOpacity="0.6" />
            <line x1="90" y1="70" x2="155" y2="70" stroke="#22d3ee" strokeWidth="2" />
            <polygon points="155,70 147,65 147,75" fill="#22d3ee" />
            <text x="130" y="62" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold">v (e⁻)</text>
            <line x1="90" y1="70" x2="90" y2="15" stroke="#a78bfa" strokeWidth="2" />
            <polygon points="90,15 85,23 95,23" fill="#a78bfa" />
            <text x="96" y="28" fill="#a78bfa" fontSize="10" fontFamily="monospace" fontWeight="bold">B</text>
            {/* F INTO page for negative charge */}
            <circle cx="90" cy="70" r="12" fill="none" stroke="#f87171" strokeWidth="1.5" />
            <line x1="82" y1="62" x2="98" y2="78" stroke="#f87171" strokeWidth="2" />
            <line x1="82" y1="78" x2="98" y2="62" stroke="#f87171" strokeWidth="2" />
            <text x="108" y="74" fill="#f87171" fontSize="9" fontFamily="monospace" fontWeight="bold">F (in)</text>
            <text x="45" y="110" fill="#f87171" fontSize="8" fontFamily="monospace">For q&#60;0: F = -q|v×B|</text>
          </svg>
 <p className="text-[10px] text-rose-400/70 text-center">Electron: direction flips!</p>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 2: CIRCULAR & HELICAL MOTION ────────────────────────────────────────
function ParticleMotionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Particle Trajectories in Magnetic Field</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Circular Motion */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Circular Motion (v ⊥ B)</span>
          <svg viewBox="0 0 160 120" className="w-full" style={{ maxHeight: 110 }}>
            {/* B into page dots */}
            {[30,70,110,150].map(x => [25,55,85,105].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#a78bfa" fillOpacity="0.4" />
            )))}
            {/* Circular orbit */}
            <circle cx="80" cy="65" r="38" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4,2" />
            {/* Particle */}
            <circle cx="118" cy="65" r="5" fill="#22d3ee" />
            <text x="125" y="53" fill="#22d3ee" fontSize="8" fontFamily="monospace">q+</text>
            {/* Velocity arrow */}
            <line x1="118" y1="60" x2="118" y2="30" stroke="#fb923c" strokeWidth="1.5" />
            <polygon points="118,30 114,38 122,38" fill="#fb923c" />
            <text x="122" y="38" fill="#fb923c" fontSize="8" fontFamily="monospace">v</text>
            {/* Radius label */}
            <line x1="80" y1="65" x2="118" y2="65" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3,2" />
            <text x="92" y="60" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.6">R</text>
            {/* B label */}
            <text x="12" y="115" fill="#a78bfa" fontSize="8" fontFamily="monospace">B ⊙ into page</text>
          </svg>
 <p className="text-[10px] text-white/50 text-center">R = mv/qB | T = 2πm/qB</p>
        </div>
        {/* Helical Motion */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">Helical Motion (v at angle to B)</span>
          <svg viewBox="0 0 160 120" className="w-full" style={{ maxHeight: 110 }}>
            {/* B field along axis */}
            <line x1="10" y1="60" x2="155" y2="60" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="5,3" />
            <polygon points="155,60 147,55 147,65" fill="#a78bfa" />
            <text x="135" y="54" fill="#a78bfa" fontSize="8" fontFamily="monospace">B</text>
            {/* Helix path */}
            <path d="M 18 60 C 25 40, 38 40, 45 60 C 52 80, 65 80, 72 60 C 79 40, 92 40, 99 60 C 106 80, 119 80, 126 60"
              fill="none" stroke="#34d399" strokeWidth="1.5" />
            {/* Velocity components */}
            <line x1="18" y1="60" x2="40" y2="60" stroke="#fb923c" strokeWidth="1.2" />
            <polygon points="40,60 33,56 33,64" fill="#fb923c" />
            <text x="22" y="54" fill="#fb923c" fontSize="7.5" fontFamily="monospace">v∥</text>
            <line x1="18" y1="60" x2="18" y2="38" stroke="#22d3ee" strokeWidth="1.2" />
            <polygon points="18,38 14,46 22,46" fill="#22d3ee" />
            <text x="22" y="44" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">v⊥</text>
            {/* Pitch label */}
            <line x1="18" y1="108" x2="72" y2="108" stroke="#34d399" strokeWidth="0.8" />
            <line x1="18" y1="103" x2="18" y2="113" stroke="#34d399" strokeWidth="0.8" />
            <line x1="72" y1="103" x2="72" y2="113" stroke="#34d399" strokeWidth="0.8" />
            <text x="45" y="118" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">Pitch P</text>
          </svg>
 <p className="text-[10px] text-white/50 text-center">R = mv⊥/qB | P = v∥ * T</p>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 3: MAGNETIC FIELD GEOMETRIES ────────────────────────────────────────
function MagneticFieldGeometrySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Magnetic Field Geometries</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Infinite wire */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Infinite Wire: B = μ₀I/2πd</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 100 }}>
            <line x1="80" y1="5" x2="80" y2="105" stroke="#fb923c" strokeWidth="2.5" />
            <polygon points="80,5 76,15 84,15" fill="#fb923c" />
            <text x="85" y="15" fill="#fb923c" fontSize="8" fontFamily="monospace">I</text>
            {/* Circular field lines */}
            {[22,35,50].map((r, i) => (
              <circle key={r} cx="80" cy="55" r={r} fill="none"
                stroke={i === 0 ? '#22d3ee' : i === 1 ? '#34d399' : '#a78bfa'}
                strokeWidth="1" strokeDasharray="4,3" />
            ))}
            {/* Direction arrow */}
            <polygon points="80,20 77,28 83,28" fill="#22d3ee" transform="rotate(-50,80,20)" />
            <line x1="80" y1="55" x2="102" y2="55" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="3,2" />
            <text x="88" y="50" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.6">d</text>
          </svg>
        </div>
        {/* Solenoid */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-violet-400 block text-center">Solenoid: B = μ₀nI (n = N/L)</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 100 }}>
            {/* Solenoid coils - simplified representation */}
            {[20,36,52,68,84,100,116,132].map((x, i) => (
              <ellipse key={x} cx={x} cy="55" rx="6" ry="20"
                fill="none" stroke="#a78bfa" strokeWidth="1.5"
                strokeDasharray={i % 2 === 0 ? "none" : "3,2"} />
            ))}
            {/* Top and bottom rails */}
            <line x1="20" y1="35" x2="132" y2="35" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="20" y1="75" x2="132" y2="75" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
            {/* Field lines inside */}
            {[1,2,3].map(i => (
              <line key={i} x1="18" y1={45 + i*8} x2="134" y2={45 + i*8}
                stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.7" />
            ))}
            <polygon points="134,53 128,50 128,56" fill="#34d399" />
            <text x="60" y="100" fill="#ffffff" fontSize="8" fontFamily="monospace" fillOpacity="0.5" textAnchor="middle">Uniform field inside</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 4: VELOCITY SELECTOR ────────────────────────────────────────────────
function VelocitySelectorSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Velocity Selector (E ⊥ B, charge goes straight when qE = qvB)</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 125 }}>
        {/* Plates */}
        <rect x="30" y="15" width="280" height="10" rx="2" fill="#22d3ee" fillOpacity="0.15" stroke="#22d3ee" strokeWidth="1" />
        <rect x="30" y="105" width="280" height="10" rx="2" fill="#f87171" fillOpacity="0.15" stroke="#f87171" strokeWidth="1" />
        <text x="320" y="23" fill="#22d3ee" fontSize="9" fontFamily="monospace">+V</text>
        <text x="320" y="114" fill="#f87171" fontSize="9" fontFamily="monospace">−V</text>

        {/* E field arrows (downward) */}
        {[60,100,140,180,220,260].map(x => (
          <g key={x}>
            <line x1={x} y1="28" x2={x} y2="100" stroke="#22d3ee" strokeWidth="0.8" strokeOpacity="0.5" />
            <polygon points={`${x},100 ${x-3},90 ${x+3},90`} fill="#22d3ee" fillOpacity="0.5" />
          </g>
        ))}
        <text x="290" y="68" fill="#22d3ee" fontSize="9" fontFamily="monospace">E↓</text>

        {/* B crosses into page */}
        {[55,95,135,175,215,255].map(x =>
          [45,65,85].map(y => (
            <g key={`${x}-${y}`}>
              <line x1={x-5} y1={y-5} x2={x+5} y2={y+5} stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
              <line x1={x+5} y1={y-5} x2={x-5} y2={y+5} stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.5" />
            </g>
          ))
        )}
        <text x="18" y="68" fill="#a78bfa" fontSize="9" fontFamily="monospace">B⊗</text>

        {/* Particle going straight */}
        <line x1="30" y1="62" x2="310" y2="62" stroke="#34d399" strokeWidth="2" />
        <polygon points="310,62 300,57 300,67" fill="#34d399" />
        <circle cx="175" cy="62" r="5" fill="#34d399" />
        <text x="162" y="54" fill="#34d399" fontSize="9" fontFamily="monospace">v=E/B</text>
      </svg>
    </div>
  );
}

// ─── SVG 5: GALVANOMETER & CONVERSIONS ────────────────────────────────────────
function GalvanometerSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Galvanometer to Ammeter / Voltmeter Conversions</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ammeter - Shunt in Parallel */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
 <span className="text-[10px] font-bold text-cyan-400 block text-center mb-2">Ammeter: Shunt S in Parallel</span>
          <svg viewBox="0 0 160 90" className="w-full" style={{ maxHeight: 85 }}>
            {/* Main current path */}
            <path d="M 10 45 L 40 45" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M 120 45 L 150 45" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            {/* Junction */}
            <circle cx="40" cy="45" r="2" fill="#ffffff" />
            <circle cx="120" cy="45" r="2" fill="#ffffff" />
            {/* Galvanometer branch */}
            <path d="M 40 45 L 40 20 L 120 20 L 120 45" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            <circle cx="80" cy="20" r="12" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1.5" />
            <text x="80" y="24" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">G</text>
            <text x="38" y="13" fill="#a78bfa" fontSize="7" fontFamily="monospace">Rg, Ig</text>
            {/* Shunt branch */}
            <path d="M 40 45 L 40 70 L 120 70 L 120 45" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="80" y="68" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle" dominantBaseline="central">S (small)</text>
            {/* Current labels */}
            <text x="10" y="38" fill="#fb923c" fontSize="8" fontFamily="monospace">I</text>
            <text x="135" y="38" fill="#fb923c" fontSize="8" fontFamily="monospace">I</text>
            <text x="145" y="80" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">S=IgRg/(I-Ig)</text>
          </svg>
        </div>
        {/* Voltmeter - High R in series */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
 <span className="text-[10px] font-bold text-rose-400 block text-center mb-2">Voltmeter: Multiplier R in Series</span>
          <svg viewBox="0 0 160 90" className="w-full" style={{ maxHeight: 85 }}>
            {/* Wire */}
            <path d="M 10 45 L 30 45" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            {/* High resistor */}
            <path d="M 30 45 L 33 39 L 38 51 L 43 39 L 48 51 L 53 39 L 58 51 L 63 45" fill="none" stroke="#f87171" strokeWidth="1.5" />
            <text x="46" y="34" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">R (large)</text>
            {/* Connection */}
            <path d="M 63 45 L 85 45" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            {/* Galvanometer */}
            <circle cx="105" cy="45" r="14" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1.5" />
            <text x="105" y="49" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">G</text>
            <text x="98" y="30" fill="#a78bfa" fontSize="7" fontFamily="monospace">Rg, Ig</text>
            <path d="M 119 45 L 150 45" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />
            {/* Voltage across */}
            <text x="80" y="78" fill="#f87171" fontSize="7.5" fontFamily="monospace" textAnchor="middle">R = V/Ig - Rg</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LoopAxisGraphSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3.1 — Magnetic Field B vs distance x along Circular Loop Axis</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Axes */}
        <line x1="170" y1="15" x2="170" y2="105" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="30" y1="95" x2="310" y2="95" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <text x="175" y="25" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace">B</text>
        <text x="305" y="105" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="end">x (distance)</text>

        {/* Symmetric Bell curve for loop axis field */}
        <path d="M 40 94 C 100 94, 130 35, 170 35 C 210 35, 240 94, 300 94" fill="none" stroke="#22d3ee" strokeWidth="2" />

        {/* Pointer at center (x = 0) */}
        <circle cx="170" cy="35" r="3" fill="#22d3ee" />
        <text x="170" y="50" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Center (x = 0)</text>
        <text x="170" y="62" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">B = &mu;<sub>0</sub>I / 2R</text>

        {/* Decaying notes */}
        <text x="75" y="80" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace">B &prop; 1/x&sup3; (x &gt;&gt; R)</text>
        <text x="265" y="80" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="end">B &prop; 1/x&sup3;</text>
      </svg>
    </div>
  );
}

function ToroidCrossSectionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3.2 — Toroid Magnetic Field Confinement (B = 0 inside &amp; outside core)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Core rings */}
        <circle cx="170" cy="60" r="45" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.15" />
        <circle cx="170" cy="60" r="25" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.15" />
        
        {/* Confined Magnetic Field line */}
        <circle cx="170" cy="60" r="35" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeDasharray="4,3" />
        <text x="170" y="64" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Core (B = &mu;<sub>0</sub>nI)</text>

        {/* Windings dots */}
        {(() => {
          const dots = [];
          for (let deg = 0; deg < 360; deg += 30) {
            const rad = deg * Math.PI / 180;
            const xInner = 170 + 25 * Math.cos(rad);
            const yInner = 60 + 25 * Math.sin(rad);
            const xOuter = 170 + 45 * Math.cos(rad);
            const yOuter = 60 + 45 * Math.sin(rad);
            dots.push(
              <g key={deg}>
                <circle cx={xInner} cy={yInner} r="1.8" fill="#22d3ee" />
                <circle cx={xOuter} cy={yOuter} r="1.8" fill="#f87171" />
              </g>
            );
          }
          return dots;
        })()}

        {/* Confinement labels */}
        <text x="75" y="64" fill="#f87171" fontSize="8.5" fontFamily="monospace">B = 0 (Outside)</text>
        <text x="265" y="64" fill="#f87171" fontSize="8.5" fontFamily="monospace" textAnchor="end">B = 0 (Inside)</text>
      </svg>
    </div>
  );
}

function CyclotronDeesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3.3 — Cyclotron Dees &amp; Spiral Charged Particle Path</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 140 }}>
        {/* Two Dees */}
        {/* Left Dee */}
        <path d="M 155 15 A 50 50 0 0 0 155 115 Z" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <text x="120" y="65" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold">Dee D₁</text>
        {/* Right Dee */}
        <path d="M 185 15 A 50 50 0 0 1 185 115 Z" fill="none" stroke="#e11d48" strokeWidth="2.5" />
        <text x="220" y="65" fill="#e11d48" fontSize="10" fontFamily="monospace" fontWeight="bold">Dee D₂</text>

        {/* High Frequency AC Voltage Source */}
        <line x1="155" y1="125" x2="185" y2="125" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx="170" cy="125" r="7" fill="#090b18" stroke="#ffffff" strokeWidth="1" />
        <path d="M 166 125 Q 168 121 170 125 T 174 125" fill="none" stroke="#ffffff" strokeWidth="1" />
        <text x="170" y="137" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="middle">High-Freq Oscillator</text>

        {/* Connections */}
        <path d="M 155 65 L 155 125" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
        <path d="M 185 65 L 185 125" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Magnetic field representation (out of page dots) */}
        {(() => {
          const dots = [];
          const coords = [[85, 35], [85, 65], [85, 95], [120, 35], [120, 65], [120, 95], [220, 35], [220, 65], [220, 95], [255, 35], [255, 65], [255, 95]];
          for (let i = 0; i < coords.length; i++) {
            dots.push(<circle key={i} cx={coords[i][0]} cy={coords[i][1]} r="1" fill="#a78bfa" fillOpacity="0.4" />);
          }
          return dots;
        })()}
        <text x="75" y="125" fill="#a78bfa" fontSize="8" fontFamily="monospace">B-Field (out of page)</text>

        {/* Spiral particle trajectory */}
        <path d="M 170 65 A 5 5 0 0 0 170 55 A 10 10 0 0 1 170 75 A 15 15 0 0 0 170 45 A 20 20 0 0 1 170 85 A 25 25 0 0 0 170 35 A 30 30 0 0 1 170 95 A 35 35 0 0 0 170 25 M 170 25 L 205 10" 
          fill="none" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="3,1" />
        <circle cx="170" cy="65" r="2.5" fill="#fb923c" />
        <circle cx="205" cy="10" r="3.5" fill="#fb923c" />
        <text x="212" y="8" fill="#fb923c" fontSize="7.5" fontFamily="monospace">Exit Beam</text>
      </svg>
    </div>
  );
}

// ─── REUSABLE HELPERS ────────────────────────────────────────────────────────
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
export default function MovingChargesDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'radius' | 'field' | 'galv'>('radius');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(12).fill(false));

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🧲</span>
              <Tag color="violet">Physics Unit 4</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Hot Topic</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-violet-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Moving Charges and Magnetism
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-violet-400/80 font-semibold tracking-wide mt-1.5 flex items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electrostatics</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electric Field</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Vectors & Cross Products</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'High (4.5/5)' },
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
              "Lorentz force: F = q(E + v * B) — combined electric and magnetic force",
              "Magnetic force on current-carrying wires: F = IL * B",
              "Circular & helical particle trajectories — radius and pitch formulas",
              "Biot-Savart Law for finite wire, loop center and axis",
              "Ampere's Circuital Law — solenoid, toroid, infinite wire",
              "Force between parallel wires — definition of the Ampere",
              "Velocity selector: when qE = qvB, particle goes straight",
              "Moving Coil Galvanometer — conversion to ammeter and voltmeter"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: LORENTZ FORCE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Lorentz Force: Electric + Magnetic</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Moving electric charges create a magnetic field. Conversely, external magnetic fields exert a force on moving charges (but <strong className="text-white">never on stationary ones</strong>). The complete force on a charged particle is the Lorentz Force.
        </p>
        <RightHandRuleSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="<i>F</i><sub>net</sub> = q(E + v * B)"
            use="Total Lorentz Force on charge q in combined E and B fields"
            note="For pure B only: F = qvB sinθ. Maximum when v ⊥ B (θ=90°), zero when v ∥ B (θ=0°)."
            priority={5}
          />
          <FormulaCard
            formula="F = I(L * B) = ILB sinθ"
            use="Magnetic force on a current-carrying conductor of length L"
            note="Direction by Right-Hand Rule. A wire parallel to B feels zero force."
            priority={5}
          />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px] min-w-[360px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Property</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Electric Force (qE)</th>
                <th className="text-left px-4 py-3 text-violet-400 font-bold uppercase">Magnetic Force (qv×B)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Acts on', 'Stationary OR moving charge', 'Moving charge ONLY'],
                ['Direction', 'Along E field', 'Perpendicular to both v and B'],
                ['Work Done', 'Can do work', 'ZERO work (always ⊥ to v)'],
                ['Effect', 'Changes speed', 'Changes direction only'],
              ].map(([prop, elec, mag]) => (
                <tr key={prop as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white/60 font-semibold">{prop as string}</td>
                  <td className="px-4 py-2.5 text-cyan-300">{elec as string}</td>
                  <td className="px-4 py-2.5 text-violet-300">{mag as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InsightCard>
          <strong>Zero Work Done:</strong> The magnetic force is always perpendicular to velocity (<i>F</i><sub>m</sub> ⊥ v). Therefore, magnetic force does ZERO work. It can change the direction of a particle, but NEVER its speed or kinetic energy. This is why a charged particle traces a circular (not spiral) path in a pure B field.
        </InsightCard>
      </div>

      {/* PART 2: PARTICLE TRAJECTORIES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Particle Trajectories in Magnetic Fields</h2>
        </div>
        <ParticleMotionSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="R = mv / qB = p / qB"
            use="Radius of circular orbit (v ⊥ B)"
            note="Also: R = √(2mK)/qB (from KE) and R = √(2mV/q)/B (from potential V). IAT loves comparing these for different particles!"
            priority={5}
          />
          <FormulaCard
            formula="T = 2πm / qB"
            use="Time period of circular orbit"
            note="T is INDEPENDENT of v and R — this is the key concept behind the cyclotron! Frequency f = qB/2πm (cyclotron frequency)."
            priority={5}
          />
        </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2.5 text-[12px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-wider block">🌀 Helical Motion (v at angle θ to B)</span>
          <p className="text-white/70">When velocity has components both along and perpendicular to B, the particle undergoes helical motion:</p>
          <ul className="text-white/60 space-y-1.5">
            <li>&bull; <code className="text-cyan-300">Radius: R = m(v sinθ) / qB</code> — governed by the perpendicular component only!</li>
            <li>&bull; <code className="text-emerald-300">Pitch: P = (v cosθ) * T = 2πm(v cosθ) / qB</code> — distance advanced per revolution along B.</li>
            <li>&bull; <strong className="text-white">Common trap:</strong> do NOT use total v for radius — only <code>v⊥ = v sinθ</code>.</li>
          </ul>
        </div>

        {/* Particle Comparison Table */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-amber-400 uppercase tracking-wider block">⚡ Particle Radius Comparisons — IAT Favourite</span>
          <p className="text-white/60 text-[12px] mb-2">For particles accelerated through same potential V, in same B: R ∝ √(m/q)</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-[12px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left py-1.5 px-2 text-white/40">Particle</th>
                  <th className="text-left py-1.5 px-2 text-white/40">m</th>
                  <th className="text-left py-1.5 px-2 text-white/40">q</th>
                  <th className="text-left py-1.5 px-2 text-cyan-400">√(m/q)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Proton (p)', 'mp', 'e', '√(m<sub>p</sub>/e)'],
                  ['Deuteron (d)', '2m<sub>p</sub>', 'e', '√(2m<sub>p</sub>/e) = √2 * Rp'],
                  ['Alpha (α)', '4m<sub>p</sub>', '2e', '√(2m<sub>p</sub>/e) = √2 * Rp'],
                  ['Electron (e⁻)', 'me', 'e', '√(me/e) ≪ Rp'],
                ].map(([part, m, q, r]) => (
                  <tr key={part as string} className="border-b border-white/5 last:border-0">
                    <td className="py-1.5 px-2 text-white/70" dangerouslySetInnerHTML={{ __html: part as string }} />
                    <td className="py-1.5 px-2 text-violet-300" dangerouslySetInnerHTML={{ __html: m as string }} />
                    <td className="py-1.5 px-2 text-rose-300" dangerouslySetInnerHTML={{ __html: q as string }} />
                    <td className="py-1.5 px-2 text-cyan-300 font-bold" dangerouslySetInnerHTML={{ __html: r as string }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/40 text-[10px]">Key insight: Deuteron and Alpha particle have the SAME radius under same V and B.</p>
        </div>
      </div>

      {/* PART 3: BIOT-SAVART & AMPERE'S LAW */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Biot-Savart &amp; Ampere&apos;s Law</h2>
        </div>
        <MagneticFieldGeometrySVG />
        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px] min-w-[480px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Geometry</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Field (B)</th>
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Key Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Infinite Straight Wire', '&mu;<sub>0</sub>I / 2&pi;d', 'd = perpendicular distance from wire'],
                ['Finite Straight Wire', '&mu;<sub>0</sub>I(sin&phi;<sub>1</sub> + sin&phi;<sub>2</sub>) / 4&pi;d', 'For infinite wire: both angles = 90&deg;'],
                ['Circular Loop &mdash; Center', '&mu;<sub>0</sub>I / 2R', 'For N turns: multiply by N'],
                ['Circular Loop &mdash; Axis', '&mu;<sub>0</sub>IR&sup2; / 2(x&sup2; + R&sup2;)<sup>3/2</sup>', 'Maximum at center (x = 0)'],
                ['Ideal Solenoid (inside)', '&mu;<sub>0</sub>nI', 'n = N/L turns per meter; Outside B &asymp; 0'],
                ['Toroid (inside)', '&mu;<sub>0</sub>NI / 2&pi;r', 'Strictly confined in core; outside B = 0']
              ].map(([geo, field, note]) => (
                <tr key={geo as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: geo as string }} />
                  <td className="px-4 py-2.5 text-cyan-300 font-bold" dangerouslySetInnerHTML={{ __html: field as string }} />
                  <td className="px-4 py-2.5 text-white/55" dangerouslySetInnerHTML={{ __html: note as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 block">📊 Loop Axis Field Profile</span>
            <LoopAxisGraphSVG />
          </div>
          <div className="space-y-2">
 <span className="text-[12px] font-bold text-emerald-400 block">🌀 Toroid Magnetic Confinement</span>
            <ToroidCrossSectionSVG />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="dB = (&mu;<sub>0</sub>I / 4&pi;) &middot; (dl &times; r̂ / r&sup2;)"
            use="Biot-Savart Law for a tiny current element dl"
            label="Use superposition for complex geometries. Segments pointing directly toward/away from the point contribute ZERO (sin&theta; = 0)."
            priority={5}
          />
          <PremiumFormulaCard
            formula="&Boint; B &middot; dl = &mu;<sub>0</sub> I<sub>enclosed</sub>"
            use="Ampere&apos;s Circuital Law for symmetric configurations"
            label="Analogous to Gauss&apos;s Law in electrostatics. Use for infinite wires, solenoids, and toroids."
            priority={5}
          />
          <PremiumFormulaCard
            formula="B<sub>axis</sub> = &mu;<sub>0</sub>IR&sup2; / 2(x&sup2;+R&sup2;)<sup>3/2</sup>"
            use="Magnetic field at distance x along axis of circular loop"
            label="Maximum at center (x=0). Decreases as 1/x&sup3; for x &gt;&gt; R."
            priority={5}
          />
        </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">⚡ Force Between Parallel Wires — Definition of the Ampere</span>
          <p className="text-white/70">Two parallel wires carrying currents I₁ and I₂ at distance d apart exert a force per unit length on each other:</p>
          <p className="font-mono text-cyan-300 font-bold text-[14.5px]">F/L = μ₀I₁I₂ / (2πd)</p>
          <p className="text-white/55 text-[12px]">
            Like currents ATTRACT. Opposite currents REPEL. (Opposite to electrostatics — unlike charges attract there!)
            <br /><strong className="text-white">1 Ampere</strong> is defined as: the constant current which, in two infinite parallel wires 1 m apart in vacuum, produces F/L = 2×10⁻⁷ N/m.
          </p>
        </div>
      </div>

      {/* PART 4: VELOCITY SELECTOR & APPLICATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Velocity Selector &amp; Magnetic Dipole Applications</h2>
        </div>
        <VelocitySelectorSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="v = E / B"
            use="Velocity selector — only particles with this speed pass undeflected"
            note="Condition: qE = qvB. Electric force and magnetic force cancel exactly. Independent of mass and charge — acts as a speed filter."
            priority={5}
          />
          <FormulaCard
            formula="m = NIA | τ = mB sinθ | U = −mB cosθ"
            use="Magnetic dipole moment, torque, and potential energy of a current loop in field B"
            note="W to rotate: W = mB(cosθ₁ − cosθ₂). PE is measured relative to θ = 90° (U = 0 reference)."
            priority={5}
          />
        </div>

        {/* Equilibrium insight */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[12px]">
          <span className="text-[12px] font-bold text-amber-400 uppercase tracking-wider block">⚖️ Stable vs Unstable Equilibrium — IAT Direct Question</span>
          <p className="text-white/70 leading-relaxed">
            The potential energy of a magnetic dipole in an external field is <code className="text-cyan-300">U = −mB cosθ</code>.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-1">
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
              <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Stable Equilibrium (θ = 0°)</span>
              <p className="text-white/60 text-[12px] leading-relaxed">
                <code>U = &minus;mB</code> &rarr; <strong className="text-white">minimum PE</strong>.<br />
                Dipole moment m is parallel to B. Any small disturbance generates a restoring torque that returns the dipole to &theta; = 0&deg;. Like a compass needle aligning with Earth&apos;s magnetic field.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15">
              <span className="text-[10px] font-bold text-rose-400 uppercase block mb-1">Unstable Equilibrium (θ = 180°)</span>
              <p className="text-white/60 text-[12px] leading-relaxed">
                <code>U = +mB</code> → <strong className="text-white">maximum PE</strong>.<br />
                Dipole m is antiparallel to B. Any small disturbance causes it to flip to θ = 0°. Mechanical analogy: a pencil balanced on its tip.
              </p>
            </div>
          </div>
        </div>

        {/* Moving charge as current */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-violet-500/10 space-y-2.5 text-[12px]">
          <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">⚛️ Moving Charge as Equivalent Current — Bridge to Atomic Magnetism</span>
          <p className="text-white/70 leading-relaxed">
            An electron orbiting a nucleus completes one revolution in period T. It carries charge e, so it is equivalent to a current loop:
          </p>
          <p className="text-cyan-300 font-bold text-[14.5px]">I = q / T = qf = qω / 2π = qv / 2πR</p>
          <p className="text-white/55 text-[12px] leading-relaxed">
            The orbital magnetic moment of the electron: <code><i>m</i><sub>orbital</sub> = IA = (qv/2πR) * πR² = qvR/2</code>.
            <br />This is the microscopic origin of diamagnetism and paramagnetism covered in the next chapter (Magnetism &amp; Matter).
            <br /><strong className="text-white">IAT asks:</strong>"An electron moves in a circle of radius R with speed v. Find the equivalent current and magnetic moment."  → Use <code>I = ev/2πR</code>, <code>m = IAₒ = evR/2</code>.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">DIAGRAM</span>
 <span className="text-[12px] text-white/50">Cyclotron Dee Path</span>
          </div>
          <CyclotronDeesSVG />
        </div>

        <div className="space-y-2">
          {[
            {
              emoji: '🌀',
              title: 'Cyclotron — Resonance Condition',
              formula: 'f = qB / 2πm',
              detail: 'In a cyclotron, alternating electric field accelerates particles in Dees. The cyclotron frequency f = qB/2πm is independent of velocity — this is what enables resonance. The particle spirals outward as it gains energy. Works only for non-relativistic particles.'
            },
            {
              emoji: '💡',
              title: 'Moving Coil Galvanometer — Principle',
              formula: 'φ = (NAB/k) * I',
              detail: 'A current-carrying coil in a radial magnetic field (sinθ = 1 always) experiences torque τ = NIAB. This is balanced by restoring spring torque kφ. At equilibrium: kφ = NIAB, so deflection φ ∝ I. Current sensitivity = NAB/k. Voltage sensitivity = NAB/kR.'
            }
          ].map(c => <RevealCard key={c.title} {...c} />)}
        </div>
      </div>

      {/* PART 5: GALVANOMETER CONVERSIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Galvanometer Conversions — Very High Yield</h2>
        </div>
        <GalvanometerSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="S = Ig * Rg / (I − Ig)"
            use="Shunt resistance to convert galvanometer to Ammeter"
            note="S is very small — it bypasses most of the current. Ammeter is always connected in series in a circuit."
            priority={5}
          />
          <FormulaCard
            formula="<i>R</i><sub>high</sub> = (V / Ig) − Rg"
            use="Multiplier resistance to convert galvanometer to Voltmeter"
            note="<i>R</i><sub>high</sub> is very large — it limits current. Voltmeter is always connected in parallel across the component."
            priority={5}
          />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px] min-w-[400px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50">Property</th>
                <th className="text-left px-4 py-3 text-cyan-400">Ammeter</th>
                <th className="text-left px-4 py-3 text-rose-400">Voltmeter</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Addition', 'Shunt S (parallel)', 'Multiplier R (series)'],
                ['Resistance value', 'Very small (≈0)', 'Very large (≈∞)'],
                ['Circuit connection', 'Series with load', 'Parallel across load'],
                ['Ideal resistance', 'Zero Ω', 'Infinite Ω'],
              ].map(([prop, amm, volt]) => (
                <tr key={prop as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white/60">{prop as string}</td>
                  <td className="px-4 py-2.5 text-cyan-300">{amm as string}</td>
                  <td className="px-4 py-2.5 text-rose-300">{volt as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PART 6: SOLVED EXAMPLE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Numerical Examples</h3>
        </div>

        {/* Solved 1: Radius + Period */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Proton vs Alpha in Same B and V</span>
          <p className="text-white/80">A proton and an alpha particle are accelerated through the same potential difference V, then enter a region of uniform magnetic field B perpendicular to their velocities. Find the ratio of their orbital radii (<i>R</i><sub>p</sub> : <i>R</i><sub>&alpha;</sub>).</p>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 uppercase block">Solution</span>
            <p>1. From energy conservation: <code>qV = ½mv²</code>, so <code>v = √(2qV/m)</code>.</p>
            <p>2. Radius in magnetic field: <code>R = mv/qB = m√(2qV/m) / qB = √(2mV/q) / B</code></p>
            <p>3. Therefore: <code>R ∝ √(m/q)</code></p>
            <p>4. For proton: <code>m<sub>p</sub> = mp, <i>q</i><sub>p</sub> = e</code> → <code><i>R</i><sub>p</sub> ∝ √(m<sub>p</sub>/e)</code></p>
            <p>5. For alpha: <code>m<sub>&alpha;</sub> = 4m<sub>p</sub>, q<sub>&alpha;</sub> = 2e</code> → <code><i>R</i><sub>&alpha;</sub> ∝ √(4m<sub>p</sub>/2e) = √(2m<sub>p</sub>/e)</code></p>
            <p className="text-cyan-300 font-bold">
              <i>R</i><sub>p</sub> : <i>R</i><sub>&alpha;</sub> = √(m<sub>p</sub>/e) : √(2m<sub>p</sub>/e) = 1 : √2
            </p>
          </div>
        </div>

        {/* Solved 2: Galvanometer shunt */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Galvanometer Shunt Calculation</span>
          <p className="text-white/80">A galvanometer has a coil resistance Rg = 50 Ω and gives full-scale deflection at Ig = 1 mA. Calculate the shunt resistance S needed to convert it into an ammeter of range 0–5 A.</p>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 uppercase block">Solution</span>
            <p>At full-scale, shunt S carries: <code><i>I</i><sub>S</sub> = I − Ig = 5 − 0.001 = 4.999 A</code></p>
            <p>Voltage across shunt = Voltage across galvanometer (parallel):</p>
            <p><code><i>I</i><sub>S</sub> * S = Ig * Rg</code></p>
            <p><code>S = Ig * Rg / (I − Ig) = (0.001 * 50) / 4.999</code></p>
            <p className="text-cyan-300 font-bold">S = 0.05 / 4.999 ≈ 0.01 Ω (extremely small — as expected!)</p>
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
            { id: 'radius', label: '🌀 Particle Radius' },
            { id: 'field', label: '🧲 Field Geometry' },
            { id: 'galv', label: '🔬 Galvanometer' },
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
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 text-[13px] space-y-2.5">
          {selectedGoal === 'radius' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Find Radius / Period of a charged particle</span>
              <p className="text-white/70">1. From velocity v: <code>R = mv/qB</code></p>
              <p className="text-white/70">2. From kinetic energy K: <code>R = √(2mK)/qB</code></p>
              <p className="text-white/70">3. From potential V: <code>R = √(2mV/q)/B = (1/B)√(2mV/q)</code></p>
              <p className="text-white/70">4. For comparing particles (same V, B): <code>R ∝ √(m/q)</code></p>
              <p className="text-white/70">5. Period (cyclotron): <code>T = 2πm/qB</code> — independent of v!</p>
            </>
          )}
          {selectedGoal === 'field' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Find Magnetic Field B at a point</span>
              <p className="text-white/70">1. Infinite wire at distance d: <code>B = μ₀I/2πd</code></p>
              <p className="text-white/70">2. Circular loop center: <code>B = μ₀NI/2R</code></p>
              <p className="text-white/70">3. Solenoid (inside): <code>B = μ₀nI</code> where n = N/L (NOT total turns!)</p>
              <p className="text-white/70">4. Toroid (inside): <code>B = μ₀NI/2πr</code></p>
              <p className="text-white/70">5. Straight segment contribution = 0 if it points to/from observation point.</p>
            </>
          )}
          {selectedGoal === 'galv' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Galvanometer Conversion</span>
              <p className="text-white/70">1. Ammeter shunt: <code>S = IgRg/(I − Ig)</code> — very small, connects in parallel.</p>
              <p className="text-white/70">2. Voltmeter multiplier: <code>R = V/Ig − Rg</code> — very large, connects in series.</p>
              <p className="text-white/70">3. Current sensitivity: <code>Is = NAB/k</code></p>
              <p className="text-white/70">4. Voltage sensitivity: <code>Vs = NAB/kR</code></p>
              <p className="text-white/70">5. Note: Increasing R of galvanometer increases current sensitivity but DECREASES voltage sensitivity!</p>
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
            { cue: '"Proton / alpha / deuteron enter same B and V"', think: "Compare R ∝ √(m/q). Alpha and deuteron have same radius!" },
            { cue: '"Charge passes straight through crossed E and B fields"', think: "Velocity selector: v = E/B. qE = qvB exactly cancels." },
            { cue: '"Helical path, find pitch"', think: "Pitch P = v cosθ * T = 2πm(v cosθ)/qB. Use only the parallel component." },
            { cue: '"Wire bent into semicircle and straight segments"', think: "Biot-Savart superposition: straight parts through the point contribute ZERO field." },
            { cue: '"Galvanometer to ammeter / voltmeter"', think: "Ammeter: small shunt S parallel. Voltmeter: large R series. Use S = IgRg/(I−Ig)." },
            { cue: '"Time period of cyclotron is independent of..."', think: "T = 2πm/qB — independent of velocity v and orbital radius R!" },
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
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps &amp; Exam Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Negative Charge — Flip the Direction">
            The Right-Hand Rule gives the force direction for a POSITIVE charge. If the particle is an electron (or any negative charge), apply the RHR first, then REVERSE the final direction. Many students forget to flip.
          </TrapCard>
          <TrapCard title="Trap 2: Solenoid n vs N Confusion">'n'
            In B = μ₀nI,  is the number of turns PER METRE (n = N/L), not the total number of turns N. If a solenoid has 1000 turns in 2m, then n = 500 turns/m — not 1000.
          </TrapCard>
          <TrapCard title="Trap 3: Helical Motion — Use Only v⊥ for Radius">
            For helical motion with v at angle θ to B, only v⊥ = v sinθ contributes to the circular radius (R = mv sinθ/qB). Using total v gives a wrong answer. The parallel component v cosθ gives the pitch.
          </TrapCard>
          <TrapCard title="Trap 4: Parallel Wires Attract / Repel">
            Like currents ATTRACT. Opposite currents REPEL. This is the OPPOSITE of electrostatics, where like charges repel. A common IAT MCQ exploits this confusion.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-violet-500/5 border border-violet-500/15">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-violet-400" />
 <h3 className="text-violet-400 font-display font-bold text-[14.5px] uppercase tracking-wider">
              2-Minute Revision Checklist
            </h3>
          </div>
 <span className="text-[11px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
            {checkedItems.filter(Boolean).length} / 12 Completed
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Lorentz Force: F = q(E + v&times;B) &mdash; magnetic part does zero work",
            "For v &perp; B: circular orbit R = mv/qB, T = 2&pi;m/qB (T independent of v!)",
            "Helical motion: R uses v<sub>&perp;</sub> = v sin&theta;; Pitch P = v cos&theta; &middot; T",
            "Comparing particles (same V, B): R &prop; &radic;(m/q)",
            "Deuteron and Alpha particle have same radius! (&radic;(2m<sub>p</sub>/e) each)",
            "Biot-Savart: straight segments pointing at point contribute ZERO field",
            "Solenoid: B = &mu;<sub>0</sub>nI (n = N/L, not total N!); Field is uniform inside",
            "Parallel wires with like currents ATTRACT (opposite to electrostatics!)",
            "Velocity selector: v = E/B, works for all charges and masses",
            "Galvanometer &rarr; Ammeter: shunt S = I<sub>g</sub>R<sub>g</sub>/(I&minus;I<sub>g</sub>) in parallel",
            "Galvanometer &rarr; Voltmeter: R = V/I<sub>g</sub> &minus; R<sub>g</sub> in series",
            "MCG deflection: &phi; = (NAB/k)I &mdash; sensitivity = NAB/k"
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
                checkedItems[idx] ? "text-violet-400 fill-violet-400/20" : "text-white/10"
              )} />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
