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

// ─── SVG VISUAL 1: SERIES VS PARALLEL CIRCUITS ────────────────────────────────
function CircuitsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Series vs Parallel Resistor Networks</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Series circuit */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 block text-center">Resistors in Series (<i>R</i><sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub>)</span>
          <svg viewBox="0 0 160 90" className="w-full" style={{ maxHeight: 80 }}>
            {/* Battery */}
            <line x1="20" y1="60" x2="20" y2="40" stroke="#a78bfa" strokeWidth="2" />
            <line x1="12" y1="50" x2="28" y2="50" stroke="#a78bfa" strokeWidth="1.2" />
            <line x1="16" y1="53" x2="24" y2="53" stroke="#a78bfa" strokeWidth="2.5" />
            
            {/* Wires */}
            <path d="M 20 40 L 20 20 L 45 20" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M 20 60 L 20 80 L 140 80 L 140 20 L 115 20" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            
            {/* Resistor 1 */}
            <path d="M 45 20 L 48 16 L 52 24 L 56 16 L 60 24 L 64 16 L 68 24 L 71 20" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <text x="58" y="10" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">R<sub>1</sub></text>
            
            <line x1="71" y1="20" x2="89" y2="20" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            
            {/* Resistor 2 */}
            <path d="M 89 20 L 92 16 L 96 24 L 100 16 L 104 24 L 108 16 L 112 24 L 115 20" fill="none" stroke="#34d399" strokeWidth="1.5" />
            <text x="102" y="10" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">R<sub>2</sub></text>

            {/* Current Arrow */}
            <path d="M 130 80 L 136 80" stroke="#fb923c" strokeWidth="1.2" />
            <path d="M 136 80 L 132 77 L 132 83 Z" fill="#fb923c" />
            <text x="127" y="75" fill="#fb923c" fontSize="7.5" fontFamily="monospace">I</text>
          </svg>
        </div>

        {/* Parallel circuit */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 block text-center">Resistors in Parallel (1/<i>R</i><sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub>)</span>
          <svg viewBox="0 0 160 90" className="w-full" style={{ maxHeight: 80 }}>
            {/* Battery */}
            <line x1="20" y1="65" x2="20" y2="45" stroke="#a78bfa" strokeWidth="2" />
            <line x1="12" y1="55" x2="28" y2="55" stroke="#a78bfa" strokeWidth="1.2" />
            <line x1="16" y1="58" x2="24" y2="58" stroke="#a78bfa" strokeWidth="2.5" />

            {/* Wires */}
            <path d="M 20 45 L 20 20 L 60 20" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M 20 65 L 20 80 L 60 80" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            
            {/* Junctions */}
            <circle cx="60" cy="20" r="1.5" fill="#ffffff" />
            <circle cx="60" cy="80" r="1.5" fill="#ffffff" />
            
            {/* Branch 1 */}
            <path d="M 60 20 L 80 20 L 80 35 L 83 38 L 77 42 L 83 46 L 77 50 L 83 54 L 77 58 L 80 61 L 80 80 L 60 80" fill="none" stroke="#f87171" strokeWidth="1.2" />
            <text x="92" y="48" fill="#f87171" fontSize="7" fontFamily="monospace">R<sub>1</sub></text>

            {/* Branch 2 */}
            <path d="M 60 20 L 120 20 L 120 35 L 123 38 L 117 42 L 123 46 L 117 50 L 123 54 L 117 58 L 120 61 L 120 80 L 60 80" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
            <text x="132" y="48" fill="#a78bfa" fontSize="7" fontFamily="monospace">R<sub>2</sub></text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 2: WHEATSTONE BRIDGE ──────────────────────────────────────────
function WheatstoneSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Balanced Wheatstone Bridge (Ig = 0)</p>
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 160 }}>
        {/* Diamond frame */}
        <line x1="170" y1="15" x2="80" y2="80" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="80" y1="80" x2="170" y2="145" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="170" y1="15" x2="260" y2="80" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
        <line x1="260" y1="80" x2="170" y2="145" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />

        {/* Junction Nodes */}
        <circle cx="170" cy="15" r="3.5" fill="#ffffff" />
        <text x="170" y="8" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">Node A</text>
        
        <circle cx="80" cy="80" r="3.5" fill="#ffffff" />
        <text x="70" y="83" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="end">Node B</text>

        <circle cx="260" cy="80" r="3.5" fill="#ffffff" />
        <text x="270" y="83" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace">Node D</text>

        <circle cx="170" cy="145" r="3.5" fill="#ffffff" />
        <text x="170" y="156" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">Node C</text>

        {/* Resistors in diamond limbs */}
        {/* R1 (A to B) */}
        <path d="M 170 15 L 140 37 L 137 32 L 132 40 L 127 32 L 122 40 L 117 32 L 112 40 L 110 38 L 80 80" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="110" y="32" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">P</text>

        {/* R2 (A to D) */}
        <path d="M 170 15 L 200 37 L 203 32 L 208 40 L 213 32 L 218 40 L 223 32 L 228 40 L 230 38 L 260 80" fill="none" stroke="#e11d48" strokeWidth="1.5" />
        <text x="230" y="32" fill="#e11d48" fontSize="8.5" fontFamily="monospace">Q</text>

        {/* R3 (B to C) */}
        <path d="M 80 80 L 110 122 L 112 120 L 117 128 L 122 120 L 127 128 L 132 120 L 137 128 L 140 123 L 170 145" fill="none" stroke="#34d399" strokeWidth="1.5" />
        <text x="110" y="132" fill="#34d399" fontSize="8.5" fontFamily="monospace">R</text>

        {/* R4 (D to C) */}
        <path d="M 260 80 L 230 122 L 228 120 L 223 128 L 218 120 L 213 128 L 208 120 L 203 128 L 200 123 L 170 145" fill="none" stroke="#fb923c" strokeWidth="1.5" />
        <text x="225" y="132" fill="#fb923c" fontSize="8.5" fontFamily="monospace">S</text>

        {/* Galvanometer (B to D) */}
        <line x1="80" y1="80" x2="140" y2="80" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="170" cy="80" r="14" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="170" y="84" fill="#a78bfa" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">G</text>
        <line x1="200" y1="80" x2="260" y2="80" stroke="#a78bfa" strokeWidth="1" />
        
        {/* Null point indicator */}
        <text x="170" y="112" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Balanced: <i>I</i><sub>g</sub> = 0</text>
        <text x="170" y="124" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">P / Q = R / S</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 3: METER BRIDGE ──────────────────────────────────────────────
function MeterBridgeSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Meter Bridge Slide Wire (Null Point Null Method)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 140 }}>
        {/* Thick Copper strips (metallic zero resistance connectors) */}
        <path d="M 20 40 L 40 40 L 40 50 L 20 50 Z" fill="#ffffff" fillOpacity="0.25" />
        <path d="M 90 40 L 250 40 L 250 50 L 90 50 Z" fill="#ffffff" fillOpacity="0.25" />
        <path d="M 300 40 L 320 40 L 320 50 L 300 50 Z" fill="#ffffff" fillOpacity="0.25" />

        {/* Bridge Wire (100 cm) */}
        <line x1="30" y1="90" x2="310" y2="90" stroke="#fb923c" strokeWidth="2" />
        <text x="30" y="103" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">0 cm (A)</text>
        <text x="310" y="103" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="end">100 cm (C)</text>

        {/* Connections from Copper strips to wire endpoints */}
        <line x1="30" y1="45" x2="30" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="310" y1="45" x2="310" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Resistors in the gaps */}
        {/* Gap 1: R (Known Box) */}
        <rect x="52" y="15" width="26" height="14" fill="#22d3ee" fillOpacity="0.1" stroke="#22d3ee" strokeWidth="1" />
        <text x="65" y="25" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">Box R</text>
        <path d="M 40 45 L 52 22 L 78 22 L 90 45" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Gap 2: S (Unknown) */}
        <rect x="262" y="15" width="26" height="14" fill="#fb923c" fillOpacity="0.1" stroke="#fb923c" strokeWidth="1" />
        <text x="275" y="25" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">Res S</text>
        <path d="M 250 45 L 262 22 L 288 22 L 300 45" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />

        {/* Galvanometer and sliding Jockey */}
        <line x1="170" y1="45" x2="170" y2="60" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="170" cy="70" r="10" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1" />
        <text x="170" y="73" fill="#a78bfa" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">G</text>
        
        {/* Jockey sliding connector to wire */}
        <path d="M 170 80 L 130 90" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="130" cy="90" r="2" fill="#34d399" />
        <text x="130" y="85" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">J</text>

        {/* Length markers */}
        <line x1="30" y1="120" x2="130" y2="120" stroke="#34d399" strokeWidth="0.8" />
        <text x="80" y="116" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">length l</text>
        
        <line x1="130" y1="120" x2="310" y2="120" stroke="#a78bfa" strokeWidth="0.8" />
        <text x="220" y="116" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">100 - l</text>

        {/* Formula */}
        <text x="170" y="134" fill="#ffffff" fillOpacity="0.7" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">R / S = l / (100 - l)</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 4: POTENTIOMETER LAYOUT ──────────────────────────────────────
function PotentiometerSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Potentiometer Circuit (EMF / Internal Resistance)</p>
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 150 }}>
        {/* Primary Circuit */}
        {/* Primary Battery Ep */}
        <line x1="50" y1="25" x2="50" y2="15" stroke="#a78bfa" strokeWidth="2" />
        <line x1="42" y1="20" x2="58" y2="20" stroke="#a78bfa" strokeWidth="1.2" />
        <line x1="46" y1="23" x2="54" y2="23" stroke="#a78bfa" strokeWidth="2.5" />
        <text x="50" y="10" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">Battery Ep</text>

        {/* Primary wires */}
        <path d="M 50 15 L 20 15 L 20 60 L 30 60" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
        <path d="M 50 25 L 320 25 L 320 60 L 310 60" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

        {/* Potentiometer long wire AB (mapped as 3 parallel zig zag rows for space) */}
        <line x1="30" y1="60" x2="310" y2="60" stroke="#fb923c" strokeWidth="1.8" />
        <line x1="310" y1="60" x2="310" y2="75" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="310" y1="75" x2="30" y2="75" stroke="#fb923c" strokeWidth="1.8" />
        <line x1="30" y1="75" x2="30" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="30" y1="90" x2="310" y2="90" stroke="#fb923c" strokeWidth="1.8" />
        
        <text x="25" y="56" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace">A</text>
        <text x="315" y="96" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace">B</text>

        {/* Secondary Circuit connected at point A */}
        <path d="M 30 60 L 30 120 L 70 120" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
        {/* Secondary Cell E1 */}
        <line x1="75" y1="125" x2="75" y2="115" stroke="#22d3ee" strokeWidth="2" />
        <line x1="68" y1="120" x2="82" y2="120" stroke="#22d3ee" strokeWidth="1.2" />
        <line x1="71" y1="123" x2="79" y2="123" stroke="#22d3ee" strokeWidth="2.5" />
        <text x="75" y="110" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Cell E<sub>1</sub></text>

        {/* Galvanometer and Jockey */}
        <line x1="82" y1="120" x2="110" y2="120" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="120" cy="120" r="10" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1" />
        <text x="120" y="123" fill="#a78bfa" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">G</text>
        
        <path d="M 130 120 L 190 120 L 190 75" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="190" cy="75" r="2" fill="#34d399" />
        <text x="190" y="70" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">J</text>
        <text x="110" y="69" fill="#34d399" fontSize="7.5" fontFamily="monospace">Balance point length (l)</text>

        {/* Potential Gradient formula */}
        <text x="240" y="135" fill="#ffffff" fillOpacity="0.7" fontSize="8.5" fontWeight="bold" fontFamily="monospace">E<sub>1</sub> = φ * l</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 5: TEMPERATURE DEPENDENCE OF RESISTIVITY ─────────────────────
function TempDependenceSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Resistivity (ρ) vs Temperature (T)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Metal Graph */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 block text-center">Metals (α &gt; 0, ρ increases with T)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Axes */}
            <line x1="20" y1="10" x2="20" y2="85" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="85" x2="150" y2="85" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <text x="15" y="16" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" writingMode="tb">ρ</text>
            <text x="145" y="93" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="end">T (K)</text>

            {/* Rising curve */}
            <path d="M 20 70 C 50 68, 90 60, 140 20" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
          </svg>
        </div>

        {/* Semiconductor Graph */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 block text-center">Semiconductors (α &lt; 0, ρ decreases with T)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Axes */}
            <line x1="20" y1="10" x2="20" y2="85" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="85" x2="150" y2="85" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <text x="15" y="16" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" writingMode="tb">ρ</text>
            <text x="145" y="93" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="end">T (K)</text>

            {/* Decaying curve */}
            <path d="M 25 20 C 35 60, 70 80, 140 82" fill="none" stroke="#f87171" strokeWidth="1.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function VICharacteristicsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5.1 — V-I Characteristics (Ohmic vs Non-Ohmic)</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Ohmic Resistor */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 block text-center">Linear (Ohmic Resistor)</span>
          <svg viewBox="0 0 120 90" className="w-full" style={{ maxHeight: 75 }}>
            <line x1="15" y1="10" x2="15" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="15" y1="75" x2="110" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <text x="10" y="16" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" writingMode="tb">I</text>
            <text x="105" y="83" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="end">V</text>
            <line x1="15" y1="75" x2="100" y2="20" stroke="#22d3ee" strokeWidth="1.8" />
          </svg>
        </div>

        {/* Semiconductor Diode */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 block text-center">Non-Linear (Diode)</span>
          <svg viewBox="0 0 120 90" className="w-full" style={{ maxHeight: 75 }}>
            <line x1="15" y1="10" x2="15" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="15" y1="75" x2="110" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <text x="10" y="16" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" writingMode="tb">I</text>
            <text x="105" y="83" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="end">V</text>
            <path d="M 15 75 Q 70 74 100 20" fill="none" stroke="#f87171" strokeWidth="1.8" />
          </svg>
        </div>

        {/* Thermistor / Thyristor */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-amber-400 block text-center">Thyristor (Non-unique V)</span>
          <svg viewBox="0 0 120 90" className="w-full" style={{ maxHeight: 75 }}>
            <line x1="15" y1="10" x2="15" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="15" y1="75" x2="110" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <text x="10" y="16" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" writingMode="tb">I</text>
            <text x="105" y="83" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="end">V</text>
            <path d="M 15 75 Q 40 40 50 45 T 80 20" fill="none" stroke="#fb923c" strokeWidth="1.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SuperconductivitySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5.2 — Superconductivity Transition (ρ drops to 0 at Tc)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Axes */}
        <line x1="40" y1="15" x2="40" y2="95" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="40" y1="95" x2="310" y2="95" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <text x="30" y="20" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace">ρ</text>
        <text x="305" y="105" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="end">T (K)</text>

        {/* Transition line */}
        <path d="M 40 95 L 140 95 L 140 35 C 180 30, 240 28, 300 20" fill="none" stroke="#22d3ee" strokeWidth="2" />

        {/* Pointer at Tc */}
        <line x1="140" y1="95" x2="140" y2="105" stroke="#34d399" strokeWidth="1.2" />
        <circle cx="140" cy="95" r="3" fill="#34d399" />
        <text x="140" y="112" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">T<sub>c</sub></text>
        
        <text x="160" y="55" fill="#ffffff" fillOpacity="0.5" fontSize="8" fontFamily="monospace">Normal State (ρ &gt; 0)</text>
        <text x="75" y="85" fill="#22d3ee" fontSize="8" fontFamily="monospace">Superconducting (ρ = 0)</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 6: MAXIMUM POWER TRANSFER THEOREM ────────────────────────────
function MaxPowerTransferSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 6 — Stored Load Power (P) vs Load Resistance (R)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Axes */}
        <line x1="40" y1="15" x2="40" y2="115" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="40" y1="115" x2="310" y2="115" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
        <text x="30" y="20" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace">P (W)</text>
        <text x="305" y="125" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="end">Load R (Ω)</text>

        {/* Peak curve */}
        <path d="M 40 115 C 80 80, 130 30, 160 30 C 190 30, 240 85, 300 100" fill="none" stroke="#34d399" strokeWidth="2" />

        {/* Peak pointer at R = r */}
        <line x1="160" y1="30" x2="160" y2="115" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3,2" strokeOpacity="0.3" />
        <circle cx="160" cy="30" r="3" fill="#34d399" />
        <text x="160" y="124" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">R = r (Match)</text>
        
        {/* Max Power label */}
        <text x="170" y="25" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold"><i>P</i><sub>max</sub> = Ep² / 4r</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 7: CELLS IN SERIES & PARALLEL ─────────────────────────────────
function CellsGroupingSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 7 — Cells Grouping</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Series Cells */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 block text-center">Cells in Series (Aiding vs Opposing)</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Aiding Row */}
            <path d="M 10 25 L 30 25" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            {/* Cell 1 */}
            <line x1="30" y1="35" x2="30" y2="15" stroke="#22d3ee" strokeWidth="1.5" />
            <line x1="35" y1="30" x2="35" y2="20" stroke="#22d3ee" strokeWidth="2.5" />
            {/* Cell 2 */}
            <line x1="35" y1="25" x2="60" y2="25" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="60" y1="35" x2="60" y2="15" stroke="#22d3ee" strokeWidth="1.5" />
            <line x1="65" y1="30" x2="65" y2="20" stroke="#22d3ee" strokeWidth="2.5" />
            <path d="M 65 25 L 90 25" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <text x="50" y="47" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">Aiding: <i>E</i><sub>net</sub> = E<sub>1</sub> + E<sub>2</sub></text>

            {/* Opposing Row */}
            <path d="M 10 60 L 30 60" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            {/* Cell 1 */}
            <line x1="30" y1="70" x2="30" y2="50" stroke="#f87171" strokeWidth="1.5" />
            <line x1="35" y1="65" x2="35" y2="55" stroke="#f87171" strokeWidth="2.5" />
            {/* Opposing Cell 2 */}
            <line x1="35" y1="60" x2="60" y2="60" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="60" y1="65" x2="60" y2="55" stroke="#f87171" strokeWidth="2.5" />
            <line x1="65" y1="70" x2="65" y2="50" stroke="#f87171" strokeWidth="1.5" />
            <path d="M 65 60 L 90 60" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <text x="50" y="78" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Opposing: <i>E</i><sub>net</sub> = E<sub>1</sub> - E<sub>2</sub></text>
          </svg>
        </div>

        {/* Parallel Cells */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 block text-center">Cells in Parallel (Equivalent EMF)</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 75 }}>
            <path d="M 10 40 L 30 40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M 30 40 L 30 20 L 50 20" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M 30 40 L 30 60 L 50 60" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

            {/* Branch 1 Cell */}
            <line x1="50" y1="28" x2="50" y2="12" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="55" y1="24" x2="55" y2="16" stroke="#e11d48" strokeWidth="2.5" />
            <path d="M 55 20 L 100 20 Z" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            
            {/* Branch 2 Cell */}
            <line x1="50" y1="68" x2="50" y2="52" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="55" y1="64" x2="55" y2="56" stroke="#e11d48" strokeWidth="2.5" />
            <path d="M 55 60 L 100 60 Z" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

            {/* Junction out */}
            <path d="M 100 20 L 100 40 L 120 40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M 100 60 L 100 40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
            <circle cx="30" cy="40" r="1.5" fill="#ffffff" />
            <circle cx="100" cy="40" r="1.5" fill="#ffffff" />

            <text x="120" y="72" fill="#e11d48" fontSize="6.8" fontFamily="monospace" textAnchor="end"><i>E</i><sub>eq</sub> = (E<sub>1</sub>/r<sub>1</sub> + E<sub>2</sub>/r<sub>2</sub>)/(1/r<sub>1</sub> + 1/r<sub>2</sub>)</text>
          </svg>
        </div>
      </div>
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

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CurrentElectricityDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'stretch' | 'power' | 'measuring' | 'kirchhoff'>('stretch');
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
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">⚡</span>
              <Tag color="cyan">Physics Unit 3</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Very High Weightage</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Current Electricity
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex items-center gap-1">
              <span>Prerequisites:</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electrostatics</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electric Field</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Potential gradient</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (4/5)' },
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
              "Microscopic origin of resistivity: ρ = m/(ne²τ)",
              "Ohm's Law vector formulation: J = σE",
              "Drift speed vs thermal speed electron dynamics",
              "Resistivity temperature curves in metals vs semiconductors",
              "Electrical energy, power dissipation & appliance rating rules",
              "Grouping of cells in series, parallel, and optimal mixed layouts",
              "Kirchhoff's Junction (KCL) and Loop (KVL) rules application",
              "Wheatstone bridge, Meter bridge and Potentiometer concepts"
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: DRIFT VELOCITY & RESISTIVITY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Drift Velocity &amp; Origin of Resistivity</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Electric current is the net rate of charge flow through a cross-section (<code>I = dq/dt</code>). In conductors, free electrons move in all directions randomly due to thermal energy at high speeds (<code>~10⁵ m/s</code>), yielding zero net current. Applying an electric field imposes a steady drift velocity (<code>~10⁻⁴ m/s</code>) via frequent lattice collisions.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="ρ = m / (n * e² * τ)"
            use="Microscopic origin of resistivity"
            label="n is electron density; τ is relaxation time (average time between collisions); m & e are electron mass and charge."
            priority={5}
          />
          <PremiumFormulaCard
            formula="<i>v</i><sub>d</sub> = (e * E / m) * τ = μ * E"
            use="Drift velocity (<i>v</i><sub>d</sub>) and Mobility (μ) definition"
            label="Mobility μ = eτ/m measures how easily a carrier drifts under an electric field."
            priority={5}
          />
        </div>

 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-1.5 text-[12px] text-white/70">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">🎨 Carbon Resistor Color Codes</span>
          <p>Resistors are often labeled with color bands: <strong>BBROY of Great Britain has Very Good Wife</strong></p>
          <p className="text-[12px] leading-relaxed text-white/50">
            Black(0), Brown(1), Red(2), Orange(3), Yellow(4), Green(5), Blue(6), Violet(7), Grey(8), White(9).
            <br />Tolerance bands: Gold (±5%), Silver (±10%), No band (±20%).
          </p>
        </div>

        <InsightCard>
          <strong>Why circuits respond instantly:</strong> Even though electron drift speed is extremely slow (~10⁻⁴ m/s, meaning it takes hours to travel a meter), the electric field propagates through wires at the speed of light. This sets all free electrons in motion almost instantaneously upon closing the switch.
        </InsightCard>
      </div>

      {/* PART 2: KEY RELATIONS & COMPARISONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Key Current Formulations &amp; Mappings</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Comparing the nature of current parameters helps prevent common unit or vector errors:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
 <table className="w-full text-[13px] min-w-[440px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Quantity</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Formula</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-bold uppercase">Mathematical Nature</th>
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">SI Unit</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Electric Current (I)', 'I = n e A <i>v</i><sub>d</sub>', 'Scalar', 'Ampere (A)'],
                ['Current Density (J)', 'J = I / A = n e <i>v</i><sub>d</sub>', 'Vector (points along E)', 'A/m²'],
                ['Drift Velocity (<i>v</i><sub>d</sub>)', '<i>v</i><sub>d</sub> = e E τ / m', 'Vector', 'm/s'],
              ].map(([qty, form, nat, unit]) => (
                <tr key={qty as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: qty as string }} />
                  <td className="px-4 py-3 text-cyan-300" dangerouslySetInnerHTML={{ __html: form as string }} />
                  <td className="px-4 py-3 text-emerald-300" dangerouslySetInnerHTML={{ __html: nat as string }} />
                  <td className="px-4 py-3 text-white/65" dangerouslySetInnerHTML={{ __html: unit as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="J = σ * E"
            use="Vector/Microscopic form of Ohm's Law"
            label="σ = 1/ρ is the electrical conductivity of the material."
            priority={5}
          />
          <PremiumFormulaCard
            formula="R&apos; = n² * R"
            use="Stretching wire resistance shortcut"
            label="If a wire is stretched to n times its length, its resistance increases by n² (because Area decreases by 1/n to keep volume constant)."
            priority={5}
          />
        </div>
      </div>

      {/* PART 3: TEMPERATURE DEPENDENCE & LIMITATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Temperature Dependence &amp; Ohm&apos;s Law Limitations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Resistivity changes with temperature because the parameters <code>n</code> (carrier density) and <code>τ</code> (collision time) are temperature-dependent.
        </p>
        <TempDependenceSVG />

 <div className="overflow-x-auto rounded-2xl border border-white/8 w-full text-[13px]">
 <table className="w-full text-[13px] min-w-[440px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Material Class</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Temperature Coefficient (α)</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-bold uppercase">Microscopic Mechanism</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Metals', 'Positive (&alpha; &gt; 0)', 'Collision frequency increases with T; &tau; decreases'],
                ['Semiconductors', 'Negative (&alpha; &lt; 0)', 'Carrier density n increases exponentially with T'],
                ['Alloys (e.g. Constantan)', 'Near Zero (&alpha; &asymp; 0)', 'Structural disorder makes &tau; nearly T-independent']
              ].map(([mat, coeff, mech]) => (
                <tr key={mat as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: mat as string }} />
                  <td className="px-4 py-3 text-cyan-300" dangerouslySetInnerHTML={{ __html: coeff as string }} />
                  <td className="px-4 py-3 text-emerald-300" dangerouslySetInnerHTML={{ __html: mech as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[12px] font-bold text-cyan-400 block">📊 Ohmic vs Non-Ohmic Conductors</span>
            <VICharacteristicsSVG />
            <p className="text-white/60 text-[12px] leading-relaxed">
              Ohmic materials maintain a constant ratio of V/I (linear slope). Non-ohmic materials (diodes, thyristors) show curves, direction-dependent conduction, or multi-valued voltage regions.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[12px] font-bold text-emerald-400 block">❄️ Superconductivity</span>
            <SuperconductivitySVG />
            <p className="text-white/60 text-[12px] leading-relaxed">
              Certain materials show abruptly zero resistivity below a critical temperature <code>T<sub>c</sub></code>. Superconductors also exhibit perfect diamagnetism, expelling all magnetic fields (Meissner Effect).
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="&rho;<sub>T</sub> = &rho;<sub>0</sub> &middot; [1 + &alpha;(T &minus; T<sub>0</sub>)]"
            use="Resistivity variation with temperature"
            label="α is the temperature coefficient of resistivity."
            priority={5}
          />
 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 text-[12px] text-white/70">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">🚫 Limitations of Ohm's Law</span>
            <p>&bull; <strong className="text-white">Non-linear V-I:</strong> Diodes, transistors, and vacuum tubes have curved V-I profiles.</p>
            <p>&bull; <strong className="text-white">Sign dependency:</strong> Current changes magnitude when voltage polarity is reversed (diodes).</p>
            <p>&bull; <strong className="text-white">Non-unique V:</strong> Multiple voltage values can produce the same current (e.g. GaAs thyristor regions).</p>
          </div>
        </div>
      </div>

      {/* PART 4: ELECTRICAL ENERGY, APPLIANCES POWER & JOULE HEATING */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Electrical Energy, Power &amp; Joule Heating</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Charges moving through a resistance lose potential energy due to lattice collisions, which is dissipated as heat.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="P = V * I = I² * R = V² / R"
            use="Power dissipation in a resistor"
            label="Use I²R for series (same current); use V²/R for parallel (same voltage)."
            priority={5}
          />
          <PremiumFormulaCard
            formula="H = I² * R * t"
            use="Joule's Law of Heating"
            label="Total thermal energy generated in time t in a resistor."
            priority={5}
          />
        </div>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">⚡ Appliance Ratings &amp; Bulbs Traps</span>
          <p>&bull; <strong className="text-white">Resistance of appliance:</strong> R = V<sub>rated</sub>&sup2; / P<sub>rated</sub>. (e.g., a 60W, 220V bulb has more resistance than a 100W, 220V bulb!).</p>
          <p>&bull; <strong className="text-white">Series power trap:</strong> Since current is identical in series, <code>P = I²R ∝ R</code>. Thus, the bulb with <strong>higher resistance (lower rated power) glows brighter</strong>.</p>
          <p>&bull; <strong className="text-white">Parallel power trap:</strong> Since potential is identical in parallel, <code>P = V²/R ∝ 1/R</code>. Thus, the bulb with <strong>lower resistance (higher rated power) glows brighter</strong>.</p>
        </div>
      </div>

      {/* PART 5: RESISTORS & CELLS GROUPING */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Resistors &amp; Cells Combinations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Resistors and cells can be grouped in series, parallel, or mixed layouts to customize resistance, current, and electromotive force.
        </p>

        <div className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">COMPARISON</span>
            <span className="text-[12px] text-white/50">Resistors in Series vs Parallel</span>
          </div>
          <CircuitsSVG />
 <div className="overflow-x-auto rounded-2xl border border-white/8 w-full text-[13px]">
 <table className="w-full text-[13px] min-w-[440px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/8">
                  <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Feature</th>
                  <th className="text-center px-4 py-3 text-cyan-400 font-bold uppercase">Series Combination</th>
                  <th className="text-center px-4 py-3 text-emerald-400 font-bold uppercase">Parallel Combination</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Same Quantity', 'Current (I) is identical', 'Potential Difference (V) is identical'],
                  ['Equivalent R&apos;', 'R<sub>eq</sub> = &Sigma; R<sub>i</sub> = R<sub>1</sub> + R<sub>2</sub> + ...', '1/R<sub>eq</sub> = &Sigma; 1/R<sub>i</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + ...'],
                  ['Shortcut (2 Resistors)', 'R<sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub>', 'R<sub>eq</sub> = (R<sub>1</sub> &middot; R<sub>2</sub>) / (R<sub>1</sub> + R<sub>2</sub>)'],
                  ['Resultant Value', 'R<sub>eq</sub> is larger than the largest resistor', 'R<sub>eq</sub> is smaller than the smallest resistor']
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
        </div>

        <div className="space-y-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">GROUPING</span>
            <span className="text-[12px] text-white/50">Cells Aiding vs Opposing</span>
          </div>
          <CellsGroupingSVG />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <PremiumFormulaCard
            formula="R<sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub> + ..."
            use="Resistors in Series"
            label="Current remains identical; voltages add up. Equivalent resistance increases."
            priority={5}
          />
          <PremiumFormulaCard
            formula="1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> + 1/R<sub>3</sub> + ..."
            use="Resistors in Parallel"
            label="Potential remains identical; currents add up. Equivalent resistance decreases."
            priority={5}
          />
          <PremiumFormulaCard
            formula="E<sub>eq</sub> = E<sub>1</sub> + E<sub>2</sub> | r<sub>eq</sub> = r<sub>1</sub> + r<sub>2</sub>"
            use="Cells in Series (Aiding)"
            label="If cells are opposing (positive-to-positive), E<sub>eq</sub> = |E<sub>1</sub> &minus; E<sub>2</sub>|, while internal resistance is still additive: r<sub>eq</sub> = r<sub>1</sub> + r<sub>2</sub>."
            priority={5}
          />
          <PremiumFormulaCard
            formula="E<sub>eq</sub> = (&Sigma; E<sub>i</sub>/r<sub>i</sub>) / (&Sigma; 1/r<sub>i</sub>)"
            use="Cells in Parallel"
            label="r<sub>eq</sub> is given by 1/r<sub>eq</sub> = &Sigma; (1/r<sub>i</sub>). For n identical cells in parallel, E<sub>eq</sub> = E and r<sub>eq</sub> = r/n."
            priority={5}
          />
        </div>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-wider block">⛓️ Mixed Grouping: n cells in series, m parallel rows</span>
          <p className="text-white/70 leading-relaxed">
            For a mixed network feeding a load resistor R:
            <br />&bull; Total EMF: <code><i>E</i><sub>net</sub> = n * E</code>.
            <br />&bull; Total internal resistance: <code>r<sub>net</sub> = n * r / m</code>.
            <br />&bull; <strong className="text-white">Maximum current condition:</strong> Max current is drawn by load R when <code>R = n * r / m</code> (or <code>m * R = n * r</code>).
          </p>
        </div>
      </div>

      {/* PART 6: KIRCHHOFF'S RULES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 6</span>
          <h2 className="text-white font-display font-bold text-[17px]">Kirchhoff's Circuit Rules &amp; Sign Conventions</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          For complex circuits where Ohm's law alone is insufficient, Kirchhoff's rules form the core framework:
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/8 space-y-2">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">1. Junction Rule (KCL)</span>
            <p className=" text-cyan-300 font-bold text-[14.5px]">Σ I = 0</p>
            <p className="text-white/55 text-[12px] leading-relaxed">
              The algebraic sum of currents meeting at any junction is zero. Incoming currents are positive; outgoing currents are negative.
              <br /><strong>Conservation Law:</strong> Conservation of Charge.
            </p>
          </div>
          <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/8 space-y-2">
            <span className="text-[10px] uppercase font-bold text-rose-400 block">2. Loop Rule (KVL)</span>
            <p className=" text-rose-300 font-bold text-[14.5px]">Σ ΔV = 0</p>
            <p className="text-white/55 text-[12px] leading-relaxed">
              The algebraic sum of changes in potential around any closed circuit loop is zero.
              <br /><strong>Conservation Law:</strong> Conservation of Energy.
            </p>
          </div>
        </div>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-amber-400 uppercase tracking-wider block">⚠️ KVL Sign Conventions to Memorise</span>
          <ul className="text-white/70 space-y-2">
            <li>&bull; <strong className="text-white">Resistors:</strong> Potential falls (<code>-IR</code>) when moving in the direction of current; potential rises (<code>+IR</code>) when moving opposite to current.</li>
            <li>&bull; <strong className="text-white">Batteries/Cells:</strong> Potential rises (<code>+ε</code>) when moving from negative terminal to positive terminal; potential falls (<code>-ε</code>) when moving from positive to negative terminal.</li>
          </ul>
        </div>
      </div>

      {/* PART 7: MEASURING TOOLS & POWER THEOREM */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 7</span>
          <h2 className="text-white font-display font-bold text-[17px]">EMF, Measuring Instruments &amp; Maximum Power</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Electromotive force (EMF, ε) is the potential difference of a cell when no current is drawn. In active circuits, internal resistance (r) reduces terminal voltage (V).
        </p>
        <CircuitsSVG />
        <WheatstoneSVG />
        <MeterBridgeSVG />
        <PotentiometerSVG />
        <MaxPowerTransferSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="V = ε - I * r"
            use="Terminal voltage (V) of discharging cell"
            label="For charging cell, V = ε + Ir. If circuit is open, V = ε."
            priority={5}
          />
          <PremiumFormulaCard
            formula="r = R * (ε / V - 1)"
            use="Calculates cell internal resistance r"
            label="Can also be measured using potentiometer: r = R * (l<sub>1</sub>/l<sub>2</sub> - 1) where l<sub>1</sub> and l<sub>2</sub> are EMF vs terminal voltage balance lengths."
            priority={5}
          />
        </div>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">🔌 Potentiometer Principle &amp; Null Method</span>
          <p className="text-white/70 leading-relaxed">
            A potentiometer is a standard null-method instrument used to measure EMF or internal resistance.
            <br />&bull; <strong className="text-white">Principle:</strong> Potential drop across any length of wire is directly proportional to that length: <code>V ∝ l</code>, so <code>V = φ * l</code> (where <code>φ</code> is the potential gradient).
            <br />&bull; <strong className="text-white">Why it is superior:</strong> Since it draws ZERO current from the test cell at the null point, it measures true EMF, unlike a standard voltmeter which draws some current and thus measures terminal voltage V.
          </p>
        </div>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-wider block">⚡ Maximum Power Transfer Theorem</span>
          <p className="text-white/70 leading-relaxed">
            The power transferred to an external load resistance R by a cell of EMF ε and internal resistance r is maximum when:
            <br /><code className="text-cyan-300 font-bold">Load Resistance (R) = Internal Resistance (r)</code>
            <br />The maximum power delivered is:
            <br /><code className="text-emerald-300 font-bold"><i>P</i><sub>max</sub> = ε² / 4r</code>
          </p>
        </div>
      </div>

      {/* PART 8: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0"><BookOpen className="w-5 h-5" /></span>
          <h3 className="text-white font-display font-bold text-[17px] sm:text-lg tracking-wide uppercase">Solved Numerical Examples</h3>
        </div>

        {/* Example 1: Drift Velocity */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 1: Drift speed &amp; current density</span>
            <p className="text-white/80 leading-relaxed">
              A copper wire of cross-sectional area A = 1.0 * 10⁻⁷ m² carries a steady current I = 1.5 A. Assuming copper has n = 8.5 * 10²⁸ free electrons per m³, calculate:
              <br />(i) the current density J in the wire.
              <br />(ii) the average drift velocity <i>v</i><sub>d</sub> of the conduction electrons (e = 1.6 * 10⁻¹⁹ C).
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Current Density (J):</strong>
              <br />&nbsp;&nbsp;&nbsp;<code>J = I / A = 1.5 A / (1.0 * 10^-7 m²) = 1.5 * 10^7 A/m²</code>.
            </p>
            <p>
              2. <strong className="text-white">Drift Velocity (<i>v</i><sub>d</sub>):</strong>
              <br />&nbsp;&nbsp;&nbsp;From <code>J = n * e * <i>v</i><sub>d</sub></code>:
              <br />&nbsp;&nbsp;&nbsp;<code><i>v</i><sub>d</sub> = J / (n * e) = (1.5 * 10^7) / [ (8.5 * 10^28) * (1.6 * 10^-19) ]</code>
              <br />&nbsp;&nbsp;&nbsp;<code><i>v</i><sub>d</sub> = (1.5 * 10^7) / (1.36 * 10^10) ≈ 1.1 * 10^-3 m/s = 1.1 mm/s</code>.
              <br />&nbsp;&nbsp;&nbsp;This highlights that drift velocity is extremely small!
            </p>
          </div>
        </div>

        {/* Example 2: Cells Mixed Grouping & Bulbs */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 2: mixed cells optimal matching &amp; bulb rating</span>
            <p className="text-white/80 leading-relaxed">
              (a) You have 24 cells, each of EMF 1.5V and internal resistance r = 0.5 Ω. What is the optimal series-parallel combination to deliver maximum current to an external load R = 3 Ω?
              <br />(b) Two electric bulbs of ratings 100W, 220V and 60W, 220V are connected in series across a 220V power supply. Find which bulb glows brighter.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Part (a) Mixed grouping optimal:</strong>
              <br />&nbsp;&nbsp;&nbsp;Let n cells be in series and m rows in parallel. Total cells: <code>n * m = 24</code>.
              <br />&nbsp;&nbsp;&nbsp;Condition for maximum current: <code>R = n * r / m</code>.
              <br />&nbsp;&nbsp;&nbsp;Substituting R = 3 Ω and r = 0.5 Ω: <code>3 = n * 0.5 / m ⟹ n / m = 6 ⟹ n = 6m</code>.
              <br />&nbsp;&nbsp;&nbsp;Substitute in total count: <code>(6m) * m = 24 ⟹ m² = 4 ⟹ m = 2</code>.
              <br />&nbsp;&nbsp;&nbsp;Then, <code>n = 12</code>.
              <br />&nbsp;&nbsp;&nbsp;Optimal combination: 12 cells in series per row, with 2 rows in parallel.
            </p>
            <p>
              2. <strong className="text-white">Part (b) Bulb brightness in series:</strong>
              <br />&nbsp;&nbsp;&nbsp;Resistance of bulb 1 (100W): <code>R<sub>1</sub> = V² / P₁ = 220² / 100 = 484 Ω</code>.
              <br />&nbsp;&nbsp;&nbsp;Resistance of bulb 2 (60W): <code>R<sub>2</sub> = V² / P₂ = 220² / 60 = 807 Ω</code> (higher resistance).
              <br />&nbsp;&nbsp;&nbsp;In a series circuit, same current I flows. Power dissipated: <code>P = I²R</code>.
              <br />&nbsp;&nbsp;&nbsp;Since <code>R<sub>2</sub> &gt; R<sub>1</sub></code>, <strong>the 60W bulb dissipates more power and glows brighter</strong>!
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
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'stretch', label: '📐 Wire Stretching' },
            { id: 'power', label: '⚡ Maximum Power' },
            { id: 'measuring', label: '🛡️ Measuring Devices' },
            { id: 'kirchhoff', label: '🔀 Kirchhoff Rules' },
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
          {selectedGoal === 'stretch' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-cyan-400 block uppercase">Objective: Stretching wires effect</span>
              <p className="text-white/70">1. Stretched by n times: <code>R&apos; = n&sup2; * R</code> (Volume constant, Area decreases).</p>
              <p className="text-white/70">2. Radius decreases to 1/n: <code>R&apos; = n&sup4; * R</code> (Area decreases as r&sup2;).</p>
            </div>
          )}
          {selectedGoal === 'power' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-emerald-400 block uppercase">Objective: Power optimizations</span>
              <p className="text-white/70">1. Condition: <code>External load resistance R = cell internal resistance r</code>.</p>
              <p className="text-white/70">2. Power: <code><i>P</i><sub>max</sub> = E&sup2; / 4r</code>.</p>
            </div>
          )}
          {selectedGoal === 'measuring' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-violet-400 block uppercase">Objective: Wheatstone, Meter Bridge, Potentiometer</span>
              <p className="text-white/70">1. Wheatstone balance: <code>P / Q = R / S</code>.</p>
              <p className="text-white/70">2. Meter bridge balance: <code>R / S = l / (100 - l)</code>.</p>
              <p className="text-white/70">3. Potentiometer EMF: <code>E<sub>1</sub> / E<sub>2</sub> = l<sub>1</sub> / l<sub>2</sub></code>; Internal resistance: <code>r = R * (l<sub>1</sub>/l<sub>2</sub> - 1)</code>.</p>
            </div>
          )}
          {selectedGoal === 'kirchhoff' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-cyan-400 block uppercase">Objective: Kirchhoff&apos;s Rules Application</span>
              <p className="text-white/70">1. Kirchhoff&apos;s Current Law (Junction Rule): <code>&Sigma; I = 0</code> (Conservation of Charge).</p>
              <p className="text-white/70">2. Kirchhoff&apos;s Voltage Law (Loop Rule): <code>&Sigma; &Delta;V = 0</code> (Conservation of Energy).</p>
              <p className="text-white/70">3. Loop Sign Convention: &bull; Potential drop when traversing a resistor in direction of current: <code>&minus;IR</code>. &bull; Potential gain when traversing a battery from negative to positive terminal: <code>+E</code>.</p>
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
            { cue: '"A wire is stretched to double its length"', think: "Volume is conserved. New resistance is 2² * R = 4R." },
            { cue: '"Find load resistance for maximum power transfer"', think: "Set external load resistance R equal to internal resistance r." },
            { cue: '"Null point at balance length l"', think: "Wheatstone or Meter Bridge balance: R/S = l/(100-l)." },
            { cue: '"Compare EMF of two cells using potentiometer"', think: "Use the null-method balance lengths ratio: ε₁/ε₂ = l<sub>1</sub>/l<sub>2</sub>." },
            { cue: '"Multiple parallel battery branches with resistors"', think: "Apply KCL Junction Rule / Nodal Analysis shortcut (Σ I = 0 at node)." }
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
          <TrapCard title="Trap 1: Voltmeter vs Potentiometer">
            A voltmeter always draws some current from the circuit to show a deflection, so it measures terminal voltage V, not true EMF ε. Only a potentiometer is a null-method tool drawing zero current at balance, giving a true EMF reading.
          </TrapCard>
          <TrapCard title="Trap 2: Current density vector nature">
            Current is a scalar quantity because it does not obey vector addition laws. However, Current Density J is a vector pointing along the electric field E.
          </TrapCard>
          <TrapCard title="Trap 3: Sign of temperature coefficient">
            Do not confuse α signs. Metals have positive α (resistance increases with temp). Semiconductors have negative α (resistance decreases with temp because carrier density n surges).
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
            "Drift speed is small (~10<sup>&minus;4</sup> m/s) compared to thermal speed (~10<sup>5</sup> m/s)",
            "Resistivity formula: &rho; = m / (ne&sup2;&tau;) (relaxation time collision rate)",
            "Ohm&apos;s Law vector form: J = &sigma;E; conductivity &sigma; = 1/&rho;",
            "Stretching wire length n times: R&apos; = n&sup2;R",
            "Metals &alpha; &gt; 0; Semiconductors &alpha; &lt; 0; Alloys &alpha; &asymp; 0",
            "Kirchhoff rules: Junction (charge conservation); Loop (energy conservation)",
            "Discharging: V = E &minus; Ir; Charging: V = E + Ir; Open loop: V = E",
            "Maximum power transfer delivered is P<sub>max</sub> = E&sup2; / 4r at R = r",
            "Wheatstone balanced ratio: P/Q = R/S; Meter bridge: R/S = l/(100-l)",
            "Potentiometer null points: E<sub>1</sub> / E<sub>2</sub> = l<sub>1</sub> / l<sub>2</sub>"
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
