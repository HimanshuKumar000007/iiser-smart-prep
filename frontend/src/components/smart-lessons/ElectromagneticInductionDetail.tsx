import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp, Square, CheckSquare, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: MOVING MAGNET & LENZ'S LAW ───────────────────────────────────────
function MovingMagnetSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">'s Coil-Magnet Experiment & Lenz'Fig 1 — Faradays Law</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Approaching Magnet */}
        <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">N-Pole Approaching (Repulsion)</span>
          <svg viewBox="0 0 180 120" className="w-full" style={{ maxHeight: 110 }}>
            {/* Coil Loop */}
            <ellipse cx="60" cy="60" rx="10" ry="35" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
            {/* Front of coil indicator */}
            <path d="M 60 25 A 10 35 0 0 1 60 95" fill="none" stroke="#c084fc" strokeWidth="3" />
            
            {/* Magnet */}
            <rect x="105" y="45" width="30" height="30" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1.5" />
            <rect x="135" y="45" width="30" height="30" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1.5" />
            <text x="120" y="64" fill="#22d3ee" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">S</text>
            <text x="150" y="64" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">N</text>
            
            {/* Velocity Arrow */}
            <line x1="100" y1="60" x2="78" y2="60" stroke="#34d399" strokeWidth="2" />
            <polygon points="78,60 84,56 84,64" fill="#34d399" />
            <text x="89" y="52" fill="#34d399" fontSize="8" fontFamily="monospace">v</text>

            {/* Induced Field opposes: Loop creates N-Pole on right face */}
            <text x="50" y="56" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Counter-</text>
            <text x="50" y="66" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Clockwise</text>
            <text x="50" y="76" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">current (N)</text>

            {/* Current Arrow on Loop */}
            <polygon points="60,25 54,32 64,30" fill="#a78bfa" />
          </svg>
 <p className="text-[10px] text-white/50 text-center">Induced current creates North pole to repel incoming North pole.</p>
        </div>
        {/* Receding Magnet */}
        <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-rose-400 block text-center">N-Pole Receding (Attraction)</span>
          <svg viewBox="0 0 180 120" className="w-full" style={{ maxHeight: 110 }}>
            {/* Coil Loop */}
            <ellipse cx="60" cy="60" rx="10" ry="35" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
            {/* Front of coil indicator */}
            <path d="M 60 25 A 10 35 0 0 1 60 95" fill="none" stroke="#c084fc" strokeWidth="3" />
            
            {/* Magnet */}
            <rect x="90" y="45" width="30" height="30" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1.5" />
            <rect x="120" y="45" width="30" height="30" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1.5" />
            <text x="105" y="64" fill="#22d3ee" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">S</text>
            <text x="135" y="64" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">N</text>
            
            {/* Velocity Arrow */}
            <line x1="155" y1="60" x2="173" y2="60" stroke="#f87171" strokeWidth="2" />
            <polygon points="173,60 167,56 167,64" fill="#f87171" />
            <text x="162" y="52" fill="#f87171" fontSize="8" fontFamily="monospace">v</text>

            {/* Induced Field opposes: Loop creates S-Pole on right face */}
            <text x="50" y="56" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Clockwise</text>
            <text x="50" y="66" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">current (S)</text>

            {/* Current Arrow on Loop (downward at front) */}
            <polygon points="60,95 64,88 54,90" fill="#a78bfa" />
          </svg>
 <p className="text-[10px] text-white/50 text-center">Induced current creates South pole to attract receding North pole.</p>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 2: MOTIONAL EMF (TRANSLATIONAL & ROTATIONAL) ─────────────────────────
function MotionalEMFSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Motional EMF (Cutting Magnetic Field Lines)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Translational */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Translating Rod (v ⊥ B ⊥ l)</span>
          <svg viewBox="0 0 160 120" className="w-full" style={{ maxHeight: 110 }}>
            {/* B Field Crosses */}
            {[20,50,80,110,140].map(x => [20,50,80,100].map(y => (
              <g key={`${x}-${y}`} opacity="0.3">
                <line x1={x-3} y1={y-3} x2={x+3} y2={y+3} stroke="#a78bfa" strokeWidth="1" />
                <line x1={x+3} y1={y-3} x2={x-3} y2={y+3} stroke="#a78bfa" strokeWidth="1" />
              </g>
            )))}
            {/* Rod */}
            <rect x="75" y="20" width="10" height="80" rx="2" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="73" y="18" fill="#38bdf8" fontSize="8" fontFamily="monospace">l</text>
            
            {/* Polarities (F = q(v * B)) */}
            {/* v is right, B is into page -> force on positive charge is UP */}
            <text x="80" y="34" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">+</text>
            <text x="80" y="94" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">−</text>

            {/* Velocity vector */}
            <line x1="85" y1="60" x2="120" y2="60" stroke="#fb923c" strokeWidth="2" />
            <polygon points="120,60 112,56 112,64" fill="#fb923c" />
            <text x="105" y="52" fill="#fb923c" fontSize="8" fontFamily="monospace">v</text>

            <text x="15" y="112" fill="#a78bfa" fontSize="8" fontFamily="monospace">B ⊗ (into page)</text>
          </svg>
 <p className="text-[10px] text-white/50 text-center">ε = Bvl (upper end gets positive potential)</p>
        </div>
        {/* Rotational */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">Rotating Rod (about one end)</span>
          <svg viewBox="0 0 160 120" className="w-full" style={{ maxHeight: 110 }}>
            {/* B Field Crosses */}
            {[20,50,80,110,140].map(x => [20,50,80,100].map(y => (
              <g key={`${x}-${y}`} opacity="0.3">
                <line x1={x-3} y1={y-3} x2={x+3} y2={y+3} stroke="#a78bfa" strokeWidth="1" />
                <line x1={x+3} y1={y-3} x2={x-3} y2={y+3} stroke="#a78bfa" strokeWidth="1" />
              </g>
            )))}
            {/* Hinge Center */}
            <circle cx="80" cy="95" r="4" fill="#ffffff" />
            <text x="80" y="108" fill="#ffffff" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Pivot (O)</text>

            {/* Rotating Rod */}
            <line x1="80" y1="95" x2="115" y2="35" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
            
            {/* Rotation Arc */}
            <path d="M 110 44 A 55 55 0 0 0 88 40" fill="none" stroke="#fb923c" strokeWidth="1.2" strokeDasharray="3,2" />
            <polygon points="88,40 96,36 94,44" fill="#fb923c" />
            <text x="100" y="32" fill="#fb923c" fontSize="8" fontFamily="monospace">ω</text>

            {/* Polarities (v * B outwards along rod) */}
            <text x="123" y="33" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace">+</text>
            <text x="88" y="93" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="monospace">−</text>
          </svg>
 <p className="text-[10px] text-white/50 text-center">ε = ½ Bωl² (free tip positive, center negative)</p>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 3: AC GENERATOR ─────────────────────────────────────────────────────
function ACGeneratorSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — AC Generator & Sine Wave Output</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Generator representation */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-violet-400 block text-center">Rotating Coil in B Field</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 100 }}>
            {/* Poles */}
            <rect x="5" y="25" width="25" height="60" rx="2" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1" />
            <text x="17" y="58" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">N</text>
            <rect x="130" y="25" width="25" height="60" rx="2" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1" />
            <text x="142" y="58" fill="#22d3ee" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">S</text>

            {/* B Field Lines */}
            <line x1="32" y1="40" x2="128" y2="40" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3,3" />
            <line x1="32" y1="55" x2="128" y2="55" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3,3" />
            <line x1="32" y1="70" x2="128" y2="70" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3,3" />

            {/* Rotating Loop (Perspective) */}
            <polygon points="50,45 110,35 110,75 50,85" fill="none" stroke="#fb923c" strokeWidth="1.5" />
            {/* Rotation arrow */}
            <path d="M 80 20 A 12 12 0 1 1 80 44" fill="none" stroke="#fb923c" strokeWidth="1.2" />
            <polygon points="80,44 75,39 85,39" fill="#fb923c" />
            <text x="80" y="14" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">ω</text>
          </svg>
        </div>
        {/* Output Waveform */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-violet-400 block text-center">Induced EMF: ε = ε₀ sin(ωt)</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 100 }}>
            {/* Axes */}
            <line x1="10" y1="55" x2="150" y2="55" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="20" y1="10" x2="20" y2="100" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <text x="145" y="65" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace">t</text>
            <text x="12" y="16" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace">ε</text>

            {/* Sine Curve */}
            <path d="M 20 55 C 40 10, 60 10, 80 55 C 100 100, 120 100, 140 55" fill="none" stroke="#c084fc" strokeWidth="2" />

            {/* Peak labels */}
            <line x1="20" y1="20" x2="50" y2="20" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="2,2" strokeOpacity="0.4" />
            <text x="10" y="24" fill="#c084fc" fontSize="8" fontFamily="monospace">+ε₀</text>
            <text x="80" y="94" fill="#c084fc" fontSize="8" fontFamily="monospace">ε₀ = NABω</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function FaradayHenryExperimentsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1.1 — Faraday &amp; Henry&apos;s Core Experiments</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Magnet & Coil with Galvanometer */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Experiment 1: Magnet &amp; Coil</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Coil loops */}
            {(() => {
              const loops = [];
              for (let i = 0; i < 4; i++) {
                const x = 30 + i * 12;
                loops.push(
                  <g key={i}>
                    <ellipse cx={x} cy="45" rx="5" ry="18" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                  </g>
                );
              }
              return loops;
            })()}
            {/* Galvanometer */}
            <circle cx="95" cy="45" r="14" fill="none" stroke="#34d399" strokeWidth="1.5" />
            <text x="95" y="48" fill="#34d399" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">G</text>
            {/* Galvanometer Needle (Deflected) */}
            <line x1="95" y1="45" x2="87" y2="38" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
            
            {/* Connecting Wires */}
            <path d="M 30 63 C 30 75, 85 75, 85 55" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <path d="M 66 63 C 66 75, 105 75, 105 55" fill="none" stroke="#a78bfa" strokeWidth="1" />
            
            {/* Moving Magnet */}
            <rect x="5" y="35" width="20" height="20" fill="#22d3ee" fillOpacity="0.2" stroke="#22d3ee" strokeWidth="1" />
            <rect x="25" y="35" width="20" height="20" fill="#e11d48" fillOpacity="0.2" stroke="#e11d48" strokeWidth="1" />
            <text x="15" y="47" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">S</text>
            <text x="35" y="47" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle">N</text>
            <line x1="3" y1="45" x2="-8" y2="45" stroke="#34d399" strokeWidth="1.2" />
            <polygon points="-8,45 -3,42 -3,48" fill="#34d399" />
          </svg>
 <p className="text-[9px] text-white/40 leading-relaxed">
            Moving N-pole inside induces momentary deflection in G. Deflection duration = duration of relative motion. Stationary magnet produces ZERO deflection.
          </p>
        </div>
        {/* Two-Coil Experiment */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">Experiment 2: Primary &amp; Secondary Coils</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Primary Coil C1 (with Battery & Switch) */}
            <g transform="translate(15, 0)">
              <ellipse cx="20" cy="40" rx="4" ry="15" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
              <ellipse cx="28" cy="40" rx="4" ry="15" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
              <ellipse cx="36" cy="40" rx="4" ry="15" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
              {/* Battery */}
              <rect x="15" y="65" width="12" height="6" fill="#fb923c" fillOpacity="0.2" stroke="#fb923c" strokeWidth="0.8" />
              <text x="21" y="70" fill="#fb923c" fontSize="5" fontFamily="monospace" textAnchor="middle">Cell</text>
              {/* Switch */}
              <line x1="32" y1="68" x2="40" y2="62" stroke="#fb923c" strokeWidth="1" />
              <circle cx="32" cy="68" r="1.5" fill="#fb923c" />
              <circle cx="42" cy="68" r="1.5" fill="#fb923c" />
              {/* Connections */}
              <path d="M 20 55 C 20 68, 15 68, 15 65" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
              <path d="M 36 55 C 36 68, 42 68, 42 68" fill="none" stroke="#a78bfa" strokeWidth="0.8" />
              <text x="28" y="20" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">Coil 1</text>
            </g>

            {/* Secondary Coil C2 (with Galvanometer) */}
            <g transform="translate(85, 0)">
              <ellipse cx="20" cy="40" rx="4" ry="15" fill="none" stroke="#e9d5ff" strokeWidth="1.2" />
              <ellipse cx="28" cy="40" rx="4" ry="15" fill="none" stroke="#e9d5ff" strokeWidth="1.2" />
              <ellipse cx="36" cy="40" rx="4" ry="15" fill="none" stroke="#e9d5ff" strokeWidth="1.2" />
              {/* Galvanometer */}
              <circle cx="28" cy="70" r="8" fill="none" stroke="#34d399" strokeWidth="1" />
              <text x="28" y="72" fill="#34d399" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">G</text>
              <line x1="28" y1="70" x2="31" y2="66" stroke="#34d399" strokeWidth="1" />
              {/* Connections */}
              <path d="M 20 55 C 20 70, 20 70, 20 70" fill="none" stroke="#e9d5ff" strokeWidth="0.8" />
              <path d="M 36 55 C 36 70, 36 70, 36 70" fill="none" stroke="#e9d5ff" strokeWidth="0.8" />
              <text x="28" y="20" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">Coil 2</text>
            </g>
          </svg>
 <p className="text-[9px] text-white/40 leading-relaxed">
            Galvanometer G deflects only during switch close (growth of current in Coil 1) and switch open (decay of current). Constant current yields zero deflection.
          </p>
        </div>
      </div>
    </div>
  );
}

function RotatingDiscAndRailSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2.1 — Advanced Motional EMF Systems</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rotating Disc */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">Rotating Disc in B Field</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 95 }}>
            {/* Magnetic Field Dots */}
            {(() => {
              const dots = [];
              const coords = [[20, 20], [20, 50], [20, 80], [50, 20], [50, 50], [50, 80], [80, 20], [80, 50], [80, 80], [110, 20], [110, 50], [110, 80], [140, 20], [140, 50], [140, 80]];
              for (let i = 0; i < coords.length; i++) {
                const [x, y] = coords[i];
                dots.push(
                  <g key={i} opacity="0.3">
                    <circle cx={x} cy={y} r="1" fill="#38bdf8" />
                    <circle cx={x} cy={y} r="4" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
                  </g>
                );
              }
              return dots;
            })()}
            {/* Disc circle */}
            <circle cx="80" cy="50" r="32" fill="#22d3ee" fillOpacity="0.1" stroke="#22d3ee" strokeWidth="1.5" />
            <circle cx="80" cy="50" r="3" fill="#ffffff" />
            {/* Radius line representing a rod segment */}
            <line x1="80" y1="50" x2="80" y2="18" stroke="#f87171" strokeWidth="1.8" />
            {/* Rotation direction */}
            <path d="M 65 24 A 20 20 0 0 1 95 24" fill="none" stroke="#fb923c" strokeWidth="1" strokeDasharray="3,1" />
            <polygon points="95,24 90,20 92,27" fill="#fb923c" />
            
            {/* Terminal indications */}
            <text x="80" y="45" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Pivot (-)</text>
            <text x="80" y="14" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle">Rim (+)</text>
            <text x="116" y="80" fill="#fb923c" fontSize="8" fontFamily="monospace">ω</text>
            <text x="12" y="100" fill="#38bdf8" fontSize="7" fontFamily="monospace">B ⊙ (out of page)</text>
          </svg>
 <p className="text-[9px] text-white/40 leading-relaxed">
            A metal disc of radius R rotating at &omega; acts as infinite radial rods in parallel: <code>&epsilon; = &frac12; B &omega; R&sup2;</code> between center and rim.
          </p>
        </div>
        {/* Rail Problem */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">U-Shaped Rail &amp; Moving Rod</span>
          <svg viewBox="0 0 160 110" className="w-full" style={{ maxHeight: 95 }}>
            {/* B Field Crosses */}
            {(() => {
              const crosses = [];
              const coords = [[20, 20], [20, 50], [20, 80], [50, 20], [50, 50], [50, 80], [80, 20], [80, 50], [80, 80], [110, 20], [110, 50], [110, 80], [140, 20], [140, 50], [140, 80]];
              for (let i = 0; i < coords.length; i++) {
                const [x, y] = coords[i];
                crosses.push(
                  <g key={i} opacity="0.25">
                    <line x1={x-2} y1={y-2} x2={x+2} y2={y+2} stroke="#a78bfa" strokeWidth="0.8" />
                    <line x1={x+2} y1={y-2} x2={x-2} y2={y+2} stroke="#a78bfa" strokeWidth="0.8" />
                  </g>
                );
              }
              return crosses;
            })()}
            {/* U rail */}
            <path d="M 20 25 L 130 25 M 20 75 L 130 75 M 20 25 L 20 75" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            {/* Resistor on left */}
            <rect x="16" y="42" width="8" height="16" fill="#1e1b4b" stroke="#ffffff" strokeWidth="1" />
            <text x="10" y="52" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="end">R</text>
            
            {/* Moving Rod */}
            <line x1="90" y1="20" x2="90" y2="80" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Velocity */}
            <line x1="90" y1="50" x2="115" y2="50" stroke="#fb923c" strokeWidth="1.5" />
            <polygon points="115,50 109,47 109,53" fill="#fb923c" />
            <text x="102" y="44" fill="#fb923c" fontSize="7" fontFamily="monospace">v</text>

            <text x="92" y="16" fill="#34d399" fontSize="7" fontFamily="monospace">rod (l)</text>
          </svg>
 <p className="text-[9px] text-white/40 leading-relaxed">
            Rod moving on rails generates current <code>I = Bvl/R</code>. Induces magnetic drag force <code>F = B&sup2;l&sup2;v/R</code> opposing motion.
          </p>
        </div>
      </div>
    </div>
  );
}

function DCGeneratorAndCommutatorSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3.1 — AC vs DC Generator Commutator Details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AC Generator Detail */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 block text-center">AC: Slip Rings (Continuous contact)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Two rings concentric along shaft */}
            <line x1="20" y1="50" x2="140" y2="50" stroke="#94a3b8" strokeWidth="2" strokeOpacity="0.4" />
            
            <circle cx="65" cy="50" r="10" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
            <rect x="62" y="36" width="6" height="4" fill="#34d399" /> {/* Brush 1 */}
            
            <circle cx="95" cy="50" r="10" fill="none" stroke="#c084fc" strokeWidth="2.5" />
            <rect x="92" y="60" width="6" height="4" fill="#34d399" /> {/* Brush 2 */}
            
            <text x="65" y="28" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Slip Ring 1</text>
            <text x="95" y="78" fill="#c084fc" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Slip Ring 2</text>
            <text x="135" y="42" fill="#34d399" fontSize="7" fontFamily="monospace">Brushes</text>
          </svg>
 <p className="text-[9px] text-white/40 leading-relaxed">
            Slip rings are continuous circular bands that maintain separate connections to each coil terminal, producing sinusoidal AC output.
          </p>
        </div>
        {/* DC Generator Detail */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-emerald-400 block text-center">DC: Split Rings (Commutator)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            <line x1="20" y1="50" x2="140" y2="50" stroke="#94a3b8" strokeWidth="2" strokeOpacity="0.4" />
            
            {/* Split ring (two half-circles) */}
            <path d="M 70 38 A 12 12 0 0 1 90 38" fill="none" stroke="#34d399" strokeWidth="3" />
            <path d="M 70 62 A 12 12 0 0 1 90 62" fill="none" stroke="#34d399" strokeWidth="3" transform="rotate(180 80 50)" />
            
            {/* Brushes at 9 o'clock and 3 o'clock */}
            <rect x="63" y="47" width="5" height="6" fill="#fb923c" />
            <rect x="92" y="47" width="5" height="6" fill="#fb923c" />
            
            {/* Commutator gaps */}
            <line x1="80" y1="34" x2="80" y2="40" stroke="#000000" strokeWidth="1.5" />
            <line x1="80" y1="60" x2="80" y2="66" stroke="#000000" strokeWidth="1.5" />
            
            <text x="80" y="25" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">Split-Ring Commutator</text>
            <text x="110" y="52" fill="#fb923c" fontSize="7.5" fontFamily="monospace">Brushes</text>
          </svg>
 <p className="text-[9px] text-white/40 leading-relaxed">
            Split rings automatically reverse terminal connections every half rotation (when coil EMF is zero), rectifying AC into pulsating DC output.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── REUSABLE HELPERS ────────────────────────────────────────────────────────
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

function InsightCard({ title = "Key Insight", children }: { title?: string; children: React.ReactNode }) {
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
export default function ElectromagneticInductionDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'charge' | 'inductance' | 'generators'>('charge');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(12).fill(false));
  
  // Interactive Simulator States
  const [simSelfL, setSimSelfL] = useState('0.5');
  const [simCurrent, setSimCurrent] = useState('2.0');
  
  const simEnergy = 0.5 * parseFloat(simSelfL) * Math.pow(parseFloat(simCurrent), 2);

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🌀</span>
              <Tag color="violet">Physics Unit 6</Tag>
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
              Electromagnetic Induction (EMI)
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-violet-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Magnetic Flux</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Moving Charges</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Basic Calculus (d/dt)</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (3.8/5)' },
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
              "Faraday's laws of induction and the role of changing magnetic flux",
              "Lenz's Law as energy conservation representation",
              "Motional EMF: translational (Bvl) and rotational (½Bωl²)",
              "Induced charge shortcut (Δq = ΔΦ/R) — independent of time",
              "Self-induction (L) and Mutual induction (M) with nesting geometries",
              "RL circuits behavior: switch-on vs steady-state limits",
              "AC generator peak EMF (NABω) and sinusoidal voltage curves",
              "Eddy currents and electromagnetic damping"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: FARADAY & LENZ */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Faraday's Discovery &amp; Lenz's Law</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Electromagnetic Induction (EMI) is the generation of electric currents in a loop by a changing magnetic field. Nature resists changes in magnetic flux: Lenz&apos;s Law acts as the &quot;electrical inertia&quot; mechanism, enforcing the conservation of energy.
        </p>

        {/* Faraday & Henry Experiments card */}
        <div className="space-y-3.5">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[12px]">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">🧪 Faraday &amp; Henry Experiments (1831)</span>
            <p className="text-white/70">
              Michael Faraday (UK) and Joseph Henry (USA) independently discovered that electric currents are induced in a coil only during a change of magnetic flux linked with it.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-white/60">
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 space-y-1">
                <strong className="text-white">Experiment 1 (Magnet-Coil):</strong>
                <p>Galvanometer connected to coil. Pushing magnet in/out deflects needle. Deflection reverses on pole or velocity reversal. Deflection amplitude increases with relative speed. Stationary magnet = no deflection.</p>
              </div>
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 space-y-1">
                <strong className="text-white">Experiment 2 (Two Coils):</strong>
                <p>Primary coil C1 connected to cell/switch, secondary coil C2 connected to galvanometer. Closing switch creates momentary deflection; opening switch creates opposite deflection. Constant current in C1 = no deflection in C2.</p>
              </div>
            </div>
          </div>
          <FaradayHenryExperimentsSVG />
        </div>

        {/* Magnetic Flux Parameters */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[12px]">
          <span className="text-amber-400 font-bold uppercase tracking-wider block">📐 Magnetic Flux (&Phi;) Parameters</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/60">
            <div className="space-y-1">
              <li>&bull; <strong className="text-white">SI Unit:</strong> Weber (Wb), where <code>1 Wb = 1 T &middot; m&sup2; = 1 V &middot; s</code>.</li>
              <li>&bull; <strong className="text-white">Dimensional Formula:</strong> <code>[&Phi;] = [M L&sup2; T<sup>&minus;2</sup> A<sup>&minus;1</sup>]</code>.</li>
              <li>&bull; <strong className="text-white">Flux Linkage:</strong> For a coil with N turns, total flux linked is <code>N &Phi;</code>.</li>
            </div>
            <div className="space-y-1">
              <strong className="text-white">Orientation Cases (&Phi; = BA cos&theta;):</strong>
              <li>&bull; <strong className="text-white">Max Flux:</strong> &theta; = 0&deg; (B normal to loop plane) &rarr; &Phi;<sub>max</sub> = BA.</li>
              <li>&bull; <strong className="text-white">Zero Flux:</strong> &theta; = 90&deg; (B parallel to loop plane) &rarr; &Phi; = 0.</li>
              <li>&bull; <strong className="text-white">Opposite Flux:</strong> &theta; = 180&deg; &rarr; &Phi; = &minus;BA.</li>
            </div>
          </div>
        </div>

        <MovingMagnetSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="Φ = B * A = BA cosθ"
            use="Magnetic Flux through loop area vector A at angle θ to B"
            note="Angle θ is relative to the normal (perpendicular) of the loop plane. Flat loop perpendicular to field has θ = 0°."
            priority={5}
          />
          <FormulaCard
            formula="ε = −N (dΦ / dt)"
            use="Faraday's Law of induction (N turns)"
            note="Negative sign denotes Lenz's Law. Average induced EMF is ε_avg = −N (ΔΦ/Δt)."
            priority={5}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="I = |ε| / R = (N/R) (dΦ/dt)"
            use="Induced Current in a loop of resistance R"
            note="Only flows if the circuit is closed. EMF is generated regardless of open/closed circuit status."
            priority={5}
          />
          <FormulaCard
            formula="Δq = N ΔΦ / R"
            use="Total induced charge flown during flux change"
            note="Extremely high-yield shortcut. Total charge depends only on total change in flux, NOT how fast it occurred!"
            priority={5}
          />
        </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">🧠 How to Solve This Type of Problem</span>
          <p className="text-white/70 leading-relaxed">
            For most EMI questions, follow this 5-step checklist:
          </p>
          <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-2 text-white/60">
            <p>1. Write the flux as <code>Φ = BA cosθ</code> (or <code>Φ = BA</code> if the angle is fixed).</p>
            <p>2. Identify what is changing: <code>B</code>, <code>A</code>, <code>θ</code>, or the number of turns <code>N</code>.</p>
            <p>3. Use <code>ε = -N dΦ/dt</code> to get the induced emf; the negative sign gives the direction via Lenz&apos;s law.</p>
            <p>4. If the circuit is closed, get the current from <code>I = ε/R</code> and then use force/power if needed.</p>
            <p>5. For total charge during a full flux change, use the shortcut <code>Δq = NΔΦ/R</code>.</p>
          </div>
 <p className="text-emerald-400 font-semibold">
            Quick trap: if the flux is constant, then <code>dΦ/dt = 0</code> and there is no induced emf.
          </p>
        </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">🛡️ Lenz&apos;s Law &amp; Conservation of Energy Proof</span>
          <p className="text-white/70 leading-relaxed">
            Lenz&apos;s Law states that the direction of the induced current is such that it opposes the change in magnetic flux that produced it. This is a direct consequence of the law of conservation of energy.
          </p>
          <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-2 text-white/60">
            <strong className="text-white">Mathematical Proof (Moving Rod Rail Problem):</strong>
            <p>1. When a rod of length <code>l</code> moves with velocity <code>v</code> perpendicular to <code>B</code>, motional EMF is <code>&epsilon; = Bvl</code>.</p>
            <p>2. If loop resistance is <code>R</code>, induced current is <code>I = Bvl/R</code>.</p>
            <p>3. This current experiences a magnetic force: <code>F<sub>mag</sub> = I l B = (B&sup2; l&sup2; v) / R</code> acting opposite to velocity <code>v</code>.</p>
            <p>4. To keep the rod moving, an external mechanical force <code>F<sub>ext</sub> = &minus;F<sub>mag</sub></code> must be applied. Mechanical power input: 
              <code className="text-cyan-300 block mt-1">P<sub>mech</sub> = F<sub>ext</sub> &middot; v = (B&sup2; l&sup2; v&sup2;) / R</code>
            </p>
            <p>5. The rate of electrical energy dissipation (Joule heat) in the resistor:
              <code className="text-cyan-300 block mt-1">P<sub>elec</sub> = I&sup2; R = (Bvl/R)&sup2; &middot; R = (B&sup2; l&sup2; v&sup2;) / R</code>
            </p>
 <p className="text-emerald-400 font-semibold">Thus, P<sub>mech</sub> = P<sub>elec</sub>. Mechanical work done against the opposing Lenz force is exactly equal to the electrical energy generated.</p>
          </div>

          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block pt-2 border-t border-white/5">👉 Fleming&apos;s Right-Hand Rule (Induced Currents)</span>
          <p className="text-white/70 leading-relaxed">
            Used to find the direction of induced current in a conductor moving in a magnetic field:
            <br />&bull; <strong className="text-white">Thumb:</strong> Points in the direction of the <strong className="text-amber-300">Motion</strong> of the conductor.
            <br />&bull; <strong className="text-white">Forefinger:</strong> Points in the direction of the <strong className="text-cyan-300">Magnetic Field</strong> (B).
            <br />&bull; <strong className="text-white">Middle Finger:</strong> Points in the direction of the <strong className="text-emerald-300">Induced Current</strong>.
          </p>
        </div>
      </div>

      {/* PART 2: MOTIONAL EMF */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Motional EMF — Translational &amp; Rotational</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          When a conducting rod moves across magnetic field lines, free charges inside experience a magnetic Lorentz force <code>F = q(v * B)</code>. This separates charge along the rod, establishing an electric field that builds up until the electric and magnetic forces balance out.
        </p>
        <MotionalEMFSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="ε = B v l"
            use="Translational Motional EMF across moving rod of length l"
            note="Valid only if velocity v, field B, and length l are mutually perpendicular. If v is parallel to l, ε = 0."
            priority={5}
          />
          <FormulaCard
            formula="ε = ½ B ω l²"
            use="Rotational Motional EMF for a rod rotating about one pivot"
            note="Rod sweeps out area at rate dA/dt = ½ l² ω. Hinge center O is negative, free moving tip is positive (for B into page)."
            priority={5}
          />
        </div>
        <div className="space-y-3.5">
          <div className="flex items-center gap-2">
 <span className="px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[12px] font-bold">ADVANCED</span>
 <span className="text-[12px] text-white/50">Rotating Disc &amp; Conducting Rails</span>
          </div>
          <RotatingDiscAndRailSVG />
        </div>

        <div className="grid sm:grid-cols-2 gap-3.5">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">💿 Rotating Disc &amp; Rail Analysis</span>
            <ul className="text-white/60 space-y-1">
              <li>&bull; <strong className="text-white">Rotating Disc EMF:</strong> <code>&epsilon; = &frac12; B &omega; R&sup2;</code> (derived by integrating radial segments: <code>&int; B v dr = &int; B &omega; r dr</code> from 0 to R).</li>
              <li>&bull; <strong className="text-white">Concentric Rings:</strong> M ∝ r<sub>1</sub>² / r<sub>2</sub>.</li>
              <li>&bull; <strong className="text-white">U-Rail Drag Force:</strong> Current <code>I = Bvl / R</code>. Opposing magnetic force is <code>F = I l B = B&sup2; l&sup2; v / R</code>. Power input: <code>P = Fv = B&sup2; l&sup2; v&sup2; / R</code>.</li>
            </ul>
          </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-amber-400 font-bold uppercase tracking-wider block">🌀 Non-Conservative Induced E-Fields</span>
            <p className="text-white/70">
              A time-varying magnetic field produces a non-conservative electric field:
            </p>
            <code className="text-cyan-300 block mt-1">&Boint; E &middot; dl = &minus; d&Phi;<sub>B</sub> / dt</code>
            <ul className="text-white/60 space-y-1 mt-1">
              <li>&bull; <strong className="text-white">Non-Conservative:</strong> Work done in a closed loop is non-zero (unlike electrostatic fields where work is always zero).</li>
              <li>&bull; Field lines form closed loops.</li>
            </ul>
          </div>
        </div>

        {/* Coil Rotation Derivation */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">⚙️ Derivation of AC Generator EMF: &epsilon; = NAB&omega; sin(&omega;t)</span>
          <p className="text-white/70 leading-relaxed">
            When a coil of N turns and area A rotates with constant angular speed &omega; in a uniform magnetic field B:
            <br />1. Flux at any instant: <code>&Phi; = B &middot; A = B A cos(&omega;t)</code>.
            <br />2. Total flux linkage: <code>&Phi;<sub>total</sub> = N &Phi; = N B A cos(&omega;t)</code>.
            <br />3. By Faraday&apos;s Law: <code>&epsilon; = &minus; d&Phi;<sub>total</sub> / dt = &minus; N B A &middot; (&minus;&omega; sin(&omega;t))</code>.
            <br />4. Thus: <code className="text-cyan-300 font-bold block mt-1 text-[13px]">&epsilon; = N A B &omega; sin(&omega;t) = &epsilon;<sub>0</sub> sin(&omega;t)</code> (where &epsilon;<sub>0</sub> = NAB&omega; is peak EMF).
          </p>
        </div>

        <InsightCard title="Motional EMF as a Battery">
          A moving wire acts exactly like a chemical cell. To find the positive terminal, compute the direction of the vector cross-product <code>v * B</code>. The positive charges will accumulate at the end pointed to by <code>v * B</code>.
        </InsightCard>
      </div>

      {/* PART 3: INDUCTANCE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Self &amp; Mutual Inductance</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Inductance is the electrical counterpart of mass or inertia. It measures a system&apos;s opposition to changes in electrical current.
        </p>

        {/* Inductance Parameters */}
        <div className="grid sm:grid-cols-2 gap-3.5">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">📐 Inductance Units &amp; Dimensions</span>
            <ul className="text-white/60 space-y-1">
              <li>&bull; <strong className="text-white">SI Unit:</strong> Henry (H), where <code>1 H = 1 Wb/A = 1 V &middot; s/A = 1 &Omega; &middot; s</code>.</li>
              <li>&bull; <strong className="text-white">Dimensions (L &amp; M):</strong> <code>[M L&sup2; T<sup>&minus;2</sup> A<sup>&minus;2</sup>]</code>.</li>
              <li>&bull; <strong className="text-emerald-400">Coefficient of Coupling (k):</strong> Measures magnetic linking: <code>M = k &radic;(L<sub>1</sub>L<sub>2</sub>)</code> (where 0 &le; k &le; 1).</li>
            </ul>
          </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-amber-400 font-bold uppercase tracking-wider block">🌀 General Inductance Definitions</span>
            <ul className="text-white/60 space-y-1">
              <li>&bull; <strong className="text-white">Self-Inductance:</strong> <code>N &Phi; = L I &rArr; L = N&Phi;/I</code>. Self-induced back EMF is <code>&epsilon; = &minus;L (dI/dt)</code>.</li>
              <li>&bull; <strong className="text-white">Mutual Inductance:</strong> <code>N<sub>2</sub> &Phi;<sub>21</sub> = M I<sub>1</sub> &rArr; M = N<sub>2</sub>&Phi;<sub>21</sub>/I<sub>1</sub></code>.</li>
            </ul>
          </div>
        </div>

        {/* Energy Density & Motor Back EMF */}
        <div className="grid sm:grid-cols-2 gap-3.5">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-rose-400 font-bold uppercase tracking-wider block">🔋 Magnetic Energy Density (u<sub>B</sub>)</span>
            <p className="text-white/70">
              Energy per unit volume stored in a magnetic field B:
            </p>
            <code className="text-cyan-300 block mt-1">u<sub>B</sub> = B&sup2; / (2&mu;<sub>0</sub>) = &frac12; B H</code>
            <p className="text-white/55 text-[11px] leading-relaxed mt-1">
              <strong>Solenoid Derivation:</strong> Stored energy <code>U = &frac12; L I&sup2;</code>. Since <code>L = &mu;<sub>0</sub> n&sup2; A l</code> and <code>B = &mu;<sub>0</sub> n I &rArr; I = B/(&mu;<sub>0</sub> n)</code>. Substitute L and I: <code>U = &frac12; (&mu;<sub>0</sub> n&sup2; A l) (B/&mu;<sub>0</sub>n)&sup2; = B&sup2; A l / (2&mu;<sub>0</sub>)</code>. Volume is <code>A l</code>, so <code>u<sub>B</sub> = U / (A l) = B&sup2; / (2&mu;<sub>0</sub>)</code>.
            </p>
          </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block">⚙️ Back EMF in DC Motors (NCERT 6.9)</span>
            <p className="text-white/70 leading-relaxed">
              When a motor rotates, the armature coil cuts magnetic lines, generating a <strong>back EMF</strong> (&epsilon;<sub>b</sub>) opposing the applied voltage V.
              <br /><code className="text-cyan-300 block mt-1">I = (V &minus; &epsilon;<sub>b</sub>) / R</code>
              <span className="text-white/55 block mt-1">
                At startup, speed is zero &rArr; &epsilon;<sub>b</sub> = 0, so starting current is very large. As speed increases, &epsilon;<sub>b</sub> rises, and armature current decreases to normal operating values.
              </span>
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="L = μ₀ n² A l = μ₀ N² A / l"
            use="Self-Inductance of a long air-core solenoid"
            note="n = N/l is turns per unit length. Solenoid with core permeability μ has L = μ n² A l."
            priority={5}
          />
          <FormulaCard
            formula="M = μ₀ n₁ n₂ A l"
            use="Mutual Inductance of nested coaxial solenoids"
            note="Here, A is strictly the area of the smaller inner solenoid, and l is the length of the outer/longer solenoid."
            priority={5}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="ε = −L (dI / dt)"
            use="Self-induced back EMF resisting change in current I"
            note="Current growth: EMF opposes source. Current decay: EMF attempts to maintain current."
            priority={5}
          />
          <FormulaCard
            formula="U = ½ L I²"
            use="Energy stored in the magnetic field of an inductor"
            note="Compare to kinetic energy E_k = ½ mv² (where L replaces mass and I replaces velocity)."
            priority={5}
          />
        </div>

        {/* Inductor Transient Limits */}
        <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[13px] min-w-[360px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Circuit State</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Inductor Behavior</th>
                <th className="text-left px-4 py-3 text-violet-400 font-bold uppercase">Physical Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Transient (t = 0)', 'Open Circuit (R → ∞)', 'Back EMF perfectly cancels battery voltage; zero current flows'],
                ['Steady State (t → ∞)', 'Plain Wire (R = 0)', 'Current is constant; back EMF drops to zero; acts as resistance-free link'],
                ['Decay (Opening Switch)', 'Current Source', 'Inductor attempts to maintain steady-state current, sparking across switch'],
              ].map(([state, behavior, meaning]) => (
                <tr key={state} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white/60 font-semibold" dangerouslySetInnerHTML={{ __html: state }} />
                  <td className="px-4 py-2.5 text-cyan-300" dangerouslySetInnerHTML={{ __html: behavior }} />
                  <td className="px-4 py-2.5 text-violet-300" dangerouslySetInnerHTML={{ __html: meaning }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RL Time Constant Note & Derivations */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3.5">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">⏱️ RL Circuit Time Constant (τ) &amp; Derivations</span>
          <p className="text-white/70">
            For growth of current: <code>I(t) = I<sub>0</sub> (1 &minus; e<sup>&minus;t/&tau;</sup>)</code> where the time constant is <code className="text-cyan-300">&tau; = L / R</code>.
          </p>
          <ul className="text-white/55 space-y-1 text-[12px] list-disc list-inside">
            <li>Units of <code>&tau;</code> are seconds (s).</li>
            <li>At <code>t = &tau;</code>, the growing current reaches approximately <strong className="text-white">63.2%</strong> of its steady-state maximum <code>I<sub>0</sub></code>.</li>
            <li>For decay of current: <code>I(t) = I<sub>0</sub> e<sup>&minus;t/&tau;</sup></code>. At <code>t = &tau;</code>, current decays to <strong className="text-white">36.8%</strong> of <code>I<sub>0</sub></code>.</li>
          </ul>

          <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-2 text-white/60 pt-2.5 border-t border-white/8 mt-2">
            <strong className="text-white">1. Current Growth Derivation (Switch Closed):</strong>
            <p>KVL equation: <code>V &minus; L(dI/dt) = IR &rArr; L(dI/dt) = V &minus; IR &rArr; dI / (V &minus; IR) = dt / L</code>.</p>
            <p>Integrating from <code>I = 0</code> to <code>I</code> and <code>t = 0</code> to <code>t</code>:
              <br /><code>&int;<sub>0</sub><sup>I</sup> dI / (V &minus; IR) = &int;<sub>0</sub><sup>t</sup> dt / L &rArr; &minus;1/R ln((V &minus; IR) / V) = t / L</code>.
              <br /><code>ln(1 &minus; IR/V) = &minus;t &middot; R/L &rArr; 1 &minus; IR/V = e<sup>&minus;t/&tau;</sup></code>.
              <br />Defining <code>I<sub>0</sub> = V/R</code>: <code className="text-cyan-300">I(t) = I<sub>0</sub>(1 &minus; e<sup>&minus;t/&tau;</sup>)</code>.
            </p>
            <strong className="text-white">2. Current Decay Derivation (Switch Opened, V=0):</strong>
            <p>Loop equation: <code>&minus;L(dI/dt) = IR &rArr; dI / I = &minus; (R/L) dt</code>.</p>
            <p>Integrating from <code>I = I<sub>0</sub></code> to <code>I</code> and <code>t = 0</code> to <code>t</code>:
              <br /><code>ln(I / I<sub>0</sub>) = &minus;t / &tau; &rArr; <code className="text-cyan-300">I(t) = I<sub>0</sub> e<sup>&minus;t/&tau;</sup></code></code>.
            </p>
          </div>
        </div>

        {/* Transient RL circuit comparison table */}
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">⚖️ Solenoid / Inductor Mechanics Analogy</span>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-[12px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left py-1.5 px-2 text-cyan-400">Translational Mechanics</th>
                  <th className="text-left py-1.5 px-2 text-violet-400">Electrical System (RL)</th>
                  <th className="text-left py-1.5 px-2 text-white/40">Inertial Role</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Mass (m)', 'Inductance (L)', 'Opposes change in state (Inertia)'],
                  ['Velocity (v)', 'Current (I)', 'State variable of system'],
                  ['Force (F = m dv/dt)', 'EMF (ε = L dI/dt)', 'Cause that changes state variable'],
                  ['Work (½ mv²)', 'Energy (½ LI²)', 'Stored potential energy'],
                ].map(([mech, elec, role]) => (
                  <tr key={mech} className="border-b border-white/5 last:border-0">
                    <td className="py-1.5 px-2 text-cyan-300" dangerouslySetInnerHTML={{ __html: mech }} />
                    <td className="py-1.5 px-2 text-violet-300" dangerouslySetInnerHTML={{ __html: elec }} />
                    <td className="py-1.5 px-2 text-white/40" dangerouslySetInnerHTML={{ __html: role }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 4: AC GENERATOR & EDDY CURRENTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">AC Generator &amp; Eddy Currents</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          An AC generator converts mechanical energy into alternating electrical voltage. A rectangular loop of N turns, area A, rotates in a uniform field B with constant angular speed &omega;, changing the effective area swept by field lines: <code>&theta; = &omega;t</code>. The frequency of the output AC is <code>f = &omega; / 2&pi;</code>.
        </p>

        {/* Generator Construction & Commutator details */}
        <div className="grid sm:grid-cols-2 gap-3.5">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">⚙️ AC Generator Construction (Slip Rings &amp; Brushes)</span>
            <ul className="text-white/60 space-y-1">
              <li>&bull; <strong className="text-white">Slip Rings:</strong> Concentric circular metal bands connected to the coil ends. They rotate with the coil, preventing wires from twisting and maintaining continuous electrical contact.</li>
              <li>&bull; <strong className="text-white">Brushes:</strong> Carbon blocks pressed lightly against the rotating slip rings to conduct the induced current to the external circuit.</li>
            </ul>
          </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[12px]">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block">🔌 DC Generator (Split Ring Commutator)</span>
            <ul className="text-white/60 space-y-1">
              <li>&bull; <strong className="text-white">Split Rings:</strong> A single ring split into two halves (commutator). Reverses contact terminals every half-turn at the exact moment the induced EMF is zero.</li>
              <li>&bull; <strong className="text-white">Output:</strong> Converts sinusoidal AC current inside the rotating coil into a pulsating unidirectional DC voltage in the external circuit.</li>
            </ul>
          </div>
        </div>

        <ACGeneratorSVG />
        <DCGeneratorAndCommutatorSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="ε = ε₀ sin(ωt) | ε₀ = N A B ω"
            use="Instantaneous and Peak induced EMF in AC generator"
            note="Peak EMF ε₀ occurs when θ = 90° (loop plane parallel to B field lines, rate of cutting is maximum)."
            priority={5}
          />
          <FormulaCard
            formula="P_avg = ½ ε₀ I₀ cosφ"
            use="Average power output in alternating circuits"
            note="Coil rotation speed doubles both the peak EMF ε₀ and the frequency ω of the waveform."
            priority={4}
          />
        </div>
        <div className="space-y-2">
          {[
            {
              emoji: '🌀',
              title: 'Eddy Currents (Foucault Currents) &amp; Losses',
              formula: 'P_e = K_e f&sup2; B_m&sup2; V t&sup2;',
              detail: 'When a solid piece of metal experiences changing flux, circulating currents form in the bulk volume. Named Foucault Currents. They create heat losses (Joule heating). The loss is proportional to the square of frequency (f), peak field (B_m), and sheet thickness (t). Minimised by using laminated sheets insulated with varnish, which increases path resistance.'
            },
            {
              emoji: '🛑',
              title: 'Electromagnetic Damping &amp; Braking',
              formula: 'F_drag &prop; v',
              detail: 'Used in magnetic brakes for trains and damping of dead-beat galvanometers. Eddy currents induced in the moving metal drum create opposing Lorentz forces that bring it to a smooth stop without mechanical friction.'
            },
            {
              emoji: '🔥',
              title: 'Induction Furnace Application',
              formula: 'Heat = I&sup2; R t',
              detail: 'Large time-varying magnetic fields are applied to a metal scrap sample. The induced high-intensity eddy currents produce enough Joule heating to melt the metals, used in metallurgy to prepare alloys.'
            },
            {
              emoji: '✂️',
              title: 'Slotting Method for Reduction',
              formula: 'Slotting &rArr; Path Cut',
              detail: 'An alternative to laminations is cutting narrow slots/holes in the bulk metal block. This cuts the physical paths of the circulating currents, drastically reducing the effective loop area and the associated eddy losses.'
            }
          ].map(c => <RevealCard key={c.title} {...c} />)}
        </div>
      </div>

      {/* PART 5: INDUCTOR SIMULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-violet-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-violet-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Inductor Stored Energy Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Observe how the stored magnetic energy <code>U = ½ L I²</code> changes with self-inductance and loop current.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-[12px] font-bold text-white/40 block mb-1">Inductance L (Henrys):</label>
              <input
                type="number"
                value={simSelfL}
                onChange={e => setSimSelfL(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-violet-500/40"
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-white/40 block mb-1">Current I (Amperes):</label>
              <input
                type="number"
                value={simCurrent}
                onChange={e => setSimCurrent(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none focus:border-violet-500/40"
              />
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 flex flex-col justify-center items-center text-center">
            <span className="text-[12px] uppercase font-bold text-white/35">Stored Energy U</span>
 <span className="text-2xl font-bold text-violet-400 my-1">
              {!isNaN(simEnergy) ? `${simEnergy.toFixed(3)} J` : 'Error'}
            </span>
 <span className="text-[10px] text-white/45">Equivalent to mechanical energy</span>
          </div>
        </div>
      </div>

      {/* PART 6: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Solved 1: Airplane */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Airplane wings Motional EMF</span>
          <p className="text-white/80">An airplane with a wingspan of 30 m flies horizontally at a speed of 900 km/h in a region where Earth's vertical magnetic field component is 4 * 10⁻⁴ T. Calculate the potential difference induced between the wingtips.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Convert speed to m/s: <code>v = 900 * 5/18 = 250 m/s</code>.</p>
            <p>2. Using motional EMF formula: <code>ε = Bv * v * l</code> (where Bv is Earth's vertical field).</p>
            <p>3. Substitute: <code>ε = (4 * 10⁻⁴ T) * (250 m/s) * (30 m)</code></p>
            <p>4. <code>ε = (10⁻¹ T·m/s) * 30 = 3.0 V</code></p>
            <p className="text-cyan-300 font-bold">Induced voltage = 3.0 Volts</p>
          </div>
        </div>

        {/* Solved 2: Charge formula */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Induced Charge Shortcut</span>
          <p className="text-white/80">A flat coil of 100 turns and resistance 20 Ω is placed perpendicular to a magnetic field of 0.2 T. The coil is suddenly flipped by 180° in 0.1 s. Calculate the total charge that passes through the coil.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Initial flux: <code>Φ₁ = BA = B * A</code>. Perpendicular to plane implies normal is parallel: cos 0° = 1.</p>
            <p>2. Flipped 180°: <code>Φ₂ = BA cos 180° = −BA</code>.</p>
            <p>3. Flux change magnitude: <code>|ΔΦ| = |Φ₂ − Φ₁| = 2 BA</code>.</p>
            <p>4. Total charge: <code>Δq = N |ΔΦ| / R = 2 N B A / R</code>.</p>
            <p>5. If area is A = 10 cm² (10⁻³ m²): <code>Δq = 2 * 100 * 0.2 * 10⁻³ / 20 = 2 * 10⁻³ C = 2 mC</code>.</p>
            <p className="text-cyan-300 font-bold">Notice: Time interval (0.1 s) is completely redundant!</p>
          </div>
        </div>

        {/* Solved 3: Concentric rings */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Concentric Rings Mutual Inductance</span>
          <p className="text-white/80">Two concentric coplanar circular loops have radii r₁ and r₂ where r₁ ≪ r₂. Determine the mutual inductance M of this setup.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Let current I flow in the outer loop (radius r₂).</p>
            <p>2. Magnetic field at the center: <code>B = μ₀ I / 2r₂</code>.</p>
            <p>3. Since r₁ ≪ r₂, we assume B is uniform across the area of the smaller loop.</p>
            <p>4. Flux through inner loop: <code>Φ₁ = B * A₁ = (μ₀ I / 2r₂) * π r₁²</code>.</p>
            <p>5. Since <code>Φ = M I</code>, we extract mutual inductance: <code>M = μ₀ π r₁² / 2r₂</code>.</p>
            <p className="text-cyan-300 font-bold">M ∝ r₁² / r₂ (Direct IAT proportionality MCQ favorite!)</p>
          </div>
        </div>
      </div>

      {/* DECISION TREE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-violet-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-violet-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'charge', label: '⚡ Total Charge Flown' },
            { id: 'inductance', label: '🌀 Solenoid Inductances' },
            { id: 'generators', label: '⚙️ Motional vs AC Generator' },
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
          {selectedGoal === 'charge' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Calculate total charge moved during flux change</span>
              <p className="text-white/70">1. Identify flux change <code>ΔΦ = Φ_final − Φ_initial</code>.</p>
              <p className="text-white/70">2. Use <code>Δq = N ΔΦ / R</code>.</p>
              <p className="text-white/70">3. Ignore any mention of time interval Δt — it has no impact on final charge flown.</p>
            </>
          )}
          {selectedGoal === 'inductance' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Find Self L or Mutual M inductance</span>
              <p className="text-white/70">1. Coaxial solenoid: <code>L = μ₀ n² A l</code> where n is turns per unit length.</p>
              <p className="text-white/70">2. Nested loops: <code>M = μ₀ π r_inner² / 2r_outer</code>.</p>
              <p className="text-white/70">3. Nested solenoids: Area depends strictly on smaller inner cylinder, length on outer solenoid.</p>
            </>
          )}
          {selectedGoal === 'generators' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Select correct Motional or AC Generator formula</span>
              <p className="text-white/70">1. Moving straight wire: <code>ε = Bvl</code> (must cut field lines perpendicular).</p>
              <p className="text-white/70">2. Rotating wire pivot: <code>ε = ½ Bωl²</code>.</p>
              <p className="text-white/70">3. Rotating loop (AC generator): <code>ε = ε₀ sin(ωt)</code> where peak EMF is <code>ε₀ = NABω</code>.</p>
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
            { cue: '"Coil is flipped/rotated, find total charge"', think: "Δq = ΔΦ/R. Completely ignore any time duration given." },
            { cue: '"Magnet dropped through metal ring"', think: "Lenz opposes both entries and exits. Acceleration is less than g (a < g) in both phases." },
            { cue: '"Airplane wing flight horizontally"', think: "Motional EMF ε = B_vertical * v * wingspan." },
            { cue: '"Rod rotating about one end in magnetic field"', think: "ε = ½ Bωl². Pivot is negative, free tip is positive." },
            { cue: '"Inductor immediately after closing circuit"', think: "t = 0 limit. Acts as open circuit (infinite resistance). Current is zero." },
            { cue: '"Generator rotation speed doubled"', think: "Peak EMF doubles (ε₀ = NABω) and frequency doubles (waveform squishes)." },
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
          <TrapCard title="Trap 1: The Plane vs Normal Angle Trap">
            Flux formula uses <code>cosθ</code> where θ is the angle with the normal to the plane. If the question says "field is at 30° to the plane of the loop", the angle with the normal is <code>90° − 30° = 60°</code>. Watch out!
          </TrapCard>
          <TrapCard title="Trap 2: Slit in the Ring of Dropped Magnet">
            If a magnet is dropped through a ring with a slit, no closed loop current flows. There is an induced EMF at the open ends, but no magnetic field opposing the magnet, so it falls with <code>a = g</code>.
          </TrapCard>
          <TrapCard title="Trap 3: sol / inductor 'n' vs 'N'">
            In solenoid inductance L = μ₀n²Al, 'n' is turns per unit length (n = N/l). If written with total turns N, the formula is <code>L = μ₀ N² A / l</code>. Using N instead of n has a squared mismatch.
          </TrapCard>
          <TrapCard title="Trap 4: Motional EMF parallel components">
            If a wire moves parallel to its length, or along the magnetic field vector, no lines are cut. The cross product v * B yields zero force along the conductor axis, giving zero EMF.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-violet-500/5 border border-violet-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-violet-400" />
 <h3 className="text-violet-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Magnetic flux &Phi; = BA cos&theta; (Wb, dimensions [ML&sup2;T<sup>&minus;2</sup>A<sup>&minus;1</sup>])",
            "Faraday&apos;s Law &epsilon; = &minus;d&Phi;/dt. Lenz&apos;s Law ensures conservation of energy",
            "Induced charge shortcut &Delta;q = N&Delta;&Phi;/R (completely time-independent!)",
            "Motional EMF &epsilon; = Bvl for translation; &epsilon; = &frac12; B&omega;l&sup2; for rotation",
            "Rotating disc EMF &epsilon; = &frac12; B&omega;R&sup2; between center and rim",
            "Lenz&apos;s Law: N-pole approach induces CCW current (repels incoming magnet)",
            "Concentric Coplanar loops mutual inductance M &prop; r<sub>1</sub>&sup2; / r<sub>2</sub>",
            "Inductance SI unit is Henry (H, [ML&sup2;T<sup>&minus;2</sup>A<sup>&minus;2</sup>])",
            "Magnetic field energy density u<sub>B</sub> = B&sup2; / (2&mu;<sub>0</sub>)",
            "Inductor at t=0 acts as open circuit; at t=&infin; acts as short circuit",
            "RL Time Constant &tau; = L/R; governs growth/decay curves",
            "AC generator output &epsilon; = NAB&omega; sin(&omega;t); contrasted with DC split-rings"
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
                <CheckSquare className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
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
