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

// ─── SVG VISUAL 1: SHM REFERENCE CIRCLE (UCM Projection) ─────────────────────
function SHMCircleSVG() {
  const [angle, setAngle] = useState(60); // interactive angle slider in the visual

  // Calculate coordinates on circle of radius 60 centered at (100, 100)
  const rad = (angle * Math.PI) / 180;
  const cx = 110;
  const cy = 100;
  const r = 65;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
 <p className="text-[12px] uppercase tracking-wider text-white/30">Interactive Fig 1</p>
          <h4 className="text-white font-bold text-[13px]">UCM Circle Projection &amp; Phase</h4>
        </div>
        <div className="flex items-center gap-2">
 <span className="text-[12px] text-cyan-400 font-bold">{angle}° (ωt + φ)</span>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-20 accent-cyan-400 cursor-pointer h-1 rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 220 200" className="w-full mx-auto" style={{ maxHeight: 180 }}>
          {/* Reference Circle */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.4" />
          <circle cx={cx} cy={cy} r={r} fill="#22d3ee" fillOpacity="0.01" />
          {/* Axes */}
          <line x1={cx - 85} y1={cy} x2={cx + 85} y2={cy} stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
          <line x1={cx} y1={cy - 85} x2={cx} y2={cy + 85} stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
          {/* Projection Line on x-axis */}
          <line x1={px} y1={py} x2={px} y2={cy} stroke="#a78bfa" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.7" />
          {/* Radius Vector */}
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          <circle cx={px} cy={py} r={4.5} fill="#22d3ee" />
          {/* Projected Particle on x-axis */}
          <circle cx={px} cy={cy} r={5} fill="#a78bfa" />
          <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
          {/* Arc for Angle */}
          <path
            d={`M ${cx + 15} ${cy} A 15 15 0 ${angle > 180 ? 1 : 0} 0 ${cx + 15 * Math.cos(rad)} ${cy - 15 * Math.sin(rad)}`}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.2"
          />
          {/* Labels */}
          <text x={cx + r + 8} y={cy + 3} fill="#22d3ee" fontSize="8" fontFamily="monospace" fillOpacity="0.7">A</text>
          <text x={cx - r - 12} y={cy + 3} fill="#22d3ee" fontSize="8" fontFamily="monospace" fillOpacity="0.7">-A</text>
          <text x={px} y={cy + 13} fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">x</text>
          <text x={px + 2} y={py - 6} fill="#22d3ee" fontSize="7" fontFamily="monospace">P (x, y)</text>
          <text x={cx + 18} y={cy - 6} fill="#22d3ee" fontSize="7.5" fontFamily="monospace">θ</text>
        </svg>
 <div className="space-y-2 text-[13px] text-white/70">
          <p className="text-white/95 font-bold text-[12px] uppercase tracking-wider text-cyan-400">Reference Circle Method</p>
          <p className="text-[12px] leading-relaxed">
            As particle <span className="text-cyan-300">P</span> rotates in UCM at angular speed <span className="text-cyan-300">ω</span>, its projection on the diameter executes SHM.
          </p>
          <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-1">
            <p className="text-white text-[12px] font-bold">Displacement Projection:</p>
            <code className="text-cyan-300 text-[13px] block">x = A cos(ωt + φ)</code>
            <p className="text-[12px] text-white/40">Here: A = Circle Radius, θ = ωt + φ = Phase</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 2: SHM KINEMATICS GRAPH GALLERY ──────────────────────────────
function GraphGallerySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[12px] uppercase tracking-wider text-white/30">Fig 2 — Kinematics Phase Profiles (φ = 0)</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Displacement x(t) = A sin(ωt) */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-cyan-400 block">Displacement x(t) = A sin(ωt)</span>
          <svg viewBox="0 0 160 85" className="w-full" style={{ maxHeight: 75 }}>
            <line x1="10" y1="42.5" x2="150" y2="42.5" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="10" y1="5" x2="10" y2="80" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
            <path d="M 10 42.5 Q 42.5 10, 75 42.5 T 140 42.5" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <text x="145" y="46" fill="#ffffff" fillOpacity="0.4" fontSize="6">t</text>
            <text x="13" y="14" fill="#22d3ee" fontSize="7" fontWeight="bold">+A</text>
            <text x="13" y="77" fill="#22d3ee" fontSize="7" fontWeight="bold">-A</text>
          </svg>
        </div>

        {/* Velocity v(t) = Aω cos(ωt) */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-emerald-400 block">Velocity v(t) = Aω cos(ωt)</span>
          <svg viewBox="0 0 160 85" className="w-full" style={{ maxHeight: 75 }}>
            <line x1="10" y1="42.5" x2="150" y2="42.5" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="10" y1="5" x2="10" y2="80" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
            <path d="M 10 15 Q 42.5 75, 75 42.5 T 140 15" fill="none" stroke="#34d399" strokeWidth="2" />
            <text x="145" y="46" fill="#ffffff" fillOpacity="0.4" fontSize="6">t</text>
            <text x="13" y="14" fill="#34d399" fontSize="7" fontWeight="bold">+Aω</text>
            <text x="13" y="77" fill="#34d399" fontSize="7" fontWeight="bold">-Aω</text>
          </svg>
        </div>

        {/* Acceleration a(t) = -Aω² sin(ωt) */}
        <div className="bg-black/30 p-2 rounded-xl border border-white/5 space-y-1">
 <span className="text-[10px] font-bold text-rose-400 block">Acceleration a(t) = -Aω² sin(ωt)</span>
          <svg viewBox="0 0 160 85" className="w-full" style={{ maxHeight: 75 }}>
            <line x1="10" y1="42.5" x2="150" y2="42.5" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
            <line x1="10" y1="5" x2="10" y2="80" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
            <path d="M 10 42.5 Q 42.5 75, 75 42.5 T 140 42.5" fill="none" stroke="#f87171" strokeWidth="2" />
            <text x="145" y="46" fill="#ffffff" fillOpacity="0.4" fontSize="6">t</text>
            <text x="13" y="14" fill="#f87171" fontSize="7" fontWeight="bold">+Aω²</text>
            <text x="13" y="77" fill="#f87171" fontSize="7" fontWeight="bold">-Aω²</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 3: PHASE WHEEL / PHASE CLOCK ─────────────────────────────────
function PhaseWheelSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
 <p className="text-[12px] uppercase tracking-wider text-white/30">Fig 3 — Kinematics Phase Wheel</p>
          <h4 className="text-white font-bold text-[13px]">Phase Lead Relationships</h4>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 180 180" className="w-full mx-auto" style={{ maxHeight: 160 }}>
          <circle cx="90" cy="90" r="55" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3,2" strokeOpacity="0.1" />
          {/* Main Phase Axes */}
          <line x1="25" y1="90" x2="155" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.1" />
          <line x1="90" y1="25" x2="90" y2="155" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.1" />
          {/* Vectors */}
          {/* x vector (at 0 degrees / Right) */}
          <line x1="90" y1="90" x2="145" y2="90" stroke="#22d3ee" strokeWidth="2.5" markerEnd="url(#leadarr)" />
          <circle cx="145" cy="90" r="3" fill="#22d3ee" />
          <text x="154" y="93" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" fontWeight="bold">x</text>
          {/* v vector (at 90 degrees / Top / leads x by pi/2) */}
          <line x1="90" y1="90" x2="90" y2="35" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#leadarr)" />
          <circle cx="90" cy="35" r="3" fill="#34d399" />
          <text x="90" y="27" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">v</text>
          {/* a vector (at 180 degrees / Left / leads v by pi/2, opposite x) */}
          <line x1="90" y1="90" x2="35" y2="90" stroke="#f87171" strokeWidth="2.5" markerEnd="url(#leadarr)" />
          <circle cx="35" cy="90" r="3" fill="#f87171" />
          <text x="25" y="93" fill="#f87171" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="end">a</text>
          {/* Curved Lead Arrows */}
          <path d="M 125 75 A 40 40 0 0 0 105 55" fill="none" stroke="#34d399" strokeWidth="1.2" strokeDasharray="2,1" />
          <text x="122" y="58" fill="#34d399" fontSize="7" fontFamily="monospace">+π/2</text>
          <path d="M 75 55 A 40 40 0 0 0 55 75" fill="none" stroke="#f87171" strokeWidth="1.2" strokeDasharray="2,1" />
          <text x="50" y="58" fill="#f87171" fontSize="7" fontFamily="monospace">+π/2</text>
          <defs>
            <marker id="leadarr" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="#ffffff" fillOpacity="0.4" />
            </marker>
          </defs>
        </svg>
 <div className="space-y-2 text-[13px] text-white/70">
          <p className="text-cyan-400 font-bold text-[12px] uppercase tracking-wider">Phase Summary Card</p>
          <ul className="space-y-1 text-[12px]">
            <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" /><span>Velocity leads displacement by <strong className="text-white">π/2 (90°)</strong>.</span></li>
            <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" /><span>Acceleration leads velocity by <strong className="text-white">π/2 (90°)</strong>.</span></li>
            <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-rose-400 shrink-0" /><span>Acceleration and displacement are in <strong className="text-white">opposite phase (π / 180°)</strong>.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 4: ENERGY FLOW IN SHM ────────────────────────────────────────
function EnergyFlowSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[12px] uppercase tracking-wider text-white/30">Fig 4 — Potential (PE) &amp; Kinetic (KE) Energy Conversion</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 200 130" className="w-full mx-auto" style={{ maxHeight: 130 }}>
          {/* Energy curves */}
          {/* U = 1/2 k x^2 (Parabola opening up) */}
          <path d="M 30 25 Q 100 115, 170 25" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
          {/* K = 1/2 k (A^2 - x^2) (Parabola opening down) */}
          <path d="M 30 115 Q 100 25, 170 115" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
          {/* Total Energy E = Constant */}
          <line x1="25" y1="25" x2="175" y2="25" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.8" />
          {/* Vertical axes */}
          <line x1="100" y1="15" x2="100" y2="120" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.15" />
          {/* Intersection Points (E/2) */}
          <circle cx="65" cy="70" r="3.5" fill="#ffffff" />
          <circle cx="135" cy="70" r="3.5" fill="#ffffff" />
          <line x1="65" y1="70" x2="65" y2="115" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.3" />
          <line x1="135" y1="70" x2="135" y2="115" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.3" />
          {/* Axis Labels */}
          <text x="100" y="127" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle" fillOpacity="0.5">x = 0 (Mean)</text>
          <text x="30" y="127" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle" fillOpacity="0.5">-A</text>
          <text x="170" y="127" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle" fillOpacity="0.5">+A</text>
          <text x="65" y="127" fill="#ffffff" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fillOpacity="0.45">-A/√2</text>
          <text x="135" y="127" fill="#ffffff" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fillOpacity="0.45">A/√2</text>
          <text x="178" y="28" fill="#a78bfa" fontSize="7" fontFamily="monospace">Total E</text>
          <text x="145" y="18" fill="#22d3ee" fontSize="7" fontFamily="monospace">PE (U)</text>
          <text x="145" y="108" fill="#34d399" fontSize="7" fontFamily="monospace">KE (K)</text>
        </svg>
 <div className="space-y-2 text-[13px] text-white/70">
          <p className="text-cyan-400 font-bold text-[12px] uppercase tracking-wider">Energy Transition Logic</p>
          <ul className="space-y-1 text-[12px]">
            <li>• <strong className="text-white">At Mean (x=0)</strong>: PE is minimum (0), KE is maximum (E). Velocity is highest.</li>
            <li>• <strong className="text-white">At Extreme (x=±A)</strong>: PE is maximum (E), KE is minimum (0). Velocity is zero.</li>
            <li>• <strong className="text-white">At x = ±A/√2 (≈ 0.707A)</strong>: Potential Energy = Kinetic Energy = E/2.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SpringMassSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[12px] uppercase tracking-wider text-white/30">Fig 2.1 — Spring-Mass Systems (Horizontal &amp; Vertical)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Horizontal Spring Mass */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 flex flex-col items-center">
 <span className="text-[10px] font-bold text-cyan-400 block mb-2">Horizontal SHM</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 80 }}>
            {/* Wall */}
            <line x1="10" y1="10" x2="10" y2="60" stroke="#6b7280" strokeWidth="3" />
            <line x1="10" y1="40" x2="35" y2="40" stroke="#6b7280" strokeWidth="1" />
            {/* Ground */}
            <line x1="10" y1="60" x2="150" y2="60" stroke="#6b7280" strokeWidth="1.5" />
            {/* Spring path - zig-zag */}
            <path d="M 10 40 L 20 40 L 25 30 L 33 50 L 41 30 L 49 50 L 57 30 L 65 50 L 73 30 L 81 50 L 89 30 L 97 50 L 105 40 L 115 40" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Mass block */}
            <rect x="115" y="25" width="30" height="30" fill="#a78bfa" fillOpacity="0.18" stroke="#a78bfa" strokeWidth="1.5" />
            <text x="130" y="43" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">m</text>
            {/* Force & Displacement Arrows */}
            <path d="M 130 15 L 150 15" fill="none" stroke="#22d3ee" strokeWidth="1" markerEnd="url(#springarr)" />
            <text x="140" y="10" fill="#22d3ee" fontSize="7" textAnchor="middle">x &gt; 0</text>
            <path d="M 115 15 L 95 15" fill="none" stroke="#f43f5e" strokeWidth="1" markerEnd="url(#springarr-red)" />
            <text x="105" y="10" fill="#f43f5e" fontSize="7" textAnchor="middle">F = -kx</text>
            <defs>
              <marker id="springarr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4 Z" fill="#22d3ee" />
              </marker>
              <marker id="springarr-red" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4 Z" fill="#f43f5e" />
              </marker>
            </defs>
          </svg>
        </div>
        
        {/* Vertical Spring Mass */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 flex flex-col items-center">
 <span className="text-[10px] font-bold text-amber-400 block mb-2">Vertical Equilibrium</span>
          <svg viewBox="0 0 160 85" className="w-full" style={{ maxHeight: 80 }}>
            {/* Ceiling */}
            <line x1="40" y1="10" x2="120" y2="10" stroke="#6b7280" strokeWidth="3" />
            
            {/* Unstretched Spring */}
            <g transform="translate(10, 0)">
              <path d="M 40 10 L 40 20 L 45 23 L 35 29 L 45 35 L 35 41 L 45 47 L 35 53 L 40 58 L 40 65" fill="none" stroke="#6b7280" strokeWidth="1" strokeOpacity="0.5" />
              <text x="40" y="77" fill="#ffffff50" fontSize="7" textAnchor="middle">Natural L</text>
            </g>

            {/* Stretched Spring with mass */}
            <g transform="translate(60, 0)">
              {/* Spring stretched */}
              <path d="M 40 10 L 40 22 L 45 27 L 35 35 L 45 43 L 35 51 L 45 59 L 35 67 L 40 72 L 40 82" fill="none" stroke="#eab308" strokeWidth="1.2" />
              {/* Mass block */}
              <rect x="28" y="82" width="24" height="24" fill="#a78bfa" fillOpacity="0.18" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="40" y="96" fill="#ffffff" fontSize="8.5" textAnchor="middle" fontWeight="bold">m</text>
              {/* Forces */}
              <path d="M 58 82 L 58 62" fill="none" stroke="#eab308" strokeWidth="1" markerEnd="url(#springarr-gold)" />
              <text x="75" y="70" fill="#eab308" fontSize="7">F<sub>s</sub> = ky<sub>0</sub></text>
              <path d="M 58 106 L 58 126" fill="none" stroke="#f43f5e" strokeWidth="1" markerEnd="url(#springarr-red)" />
              <text x="70" y="122" fill="#f43f5e" fontSize="7">W = mg</text>
            </g>
            <defs>
              <marker id="springarr-gold" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4 Z" fill="#eab308" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SimplePendulumSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[12px] uppercase tracking-wider text-white/30">Fig 6.1 — Simple Pendulum Force Resolution</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 200 180" className="w-full mx-auto" style={{ maxHeight: 180 }}>
          {/* Ceiling */}
          <line x1="50" y1="15" x2="150" y2="15" stroke="#6b7280" strokeWidth="3" />
          
          {/* Vertical reference line */}
          <line x1="100" y1="15" x2="100" y2="150" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3,3" strokeOpacity="0.2" />
          
          {/* String at displacement theta */}
          <line x1="100" y1="15" x2="137.6" y2="118.4" stroke="#a78bfa" strokeWidth="1.5" />
          <text x="122" y="65" fill="#a78bfa" fontSize="7.5" fontFamily="monospace">L</text>
          
          {/* Pendulum bob */}
          <circle cx="137.6" cy="118.4" r="9" fill="#a78bfa" fillOpacity="0.25" stroke="#a78bfa" strokeWidth="1.5" />
          <text x="137.6" y="121.4" fill="#ffffff" fontSize="8.5" textAnchor="middle" fontWeight="bold">m</text>
          
          {/* Angular displacement indicator arc */}
          <path d="M 100 45 A 30 30 0 0 1 110.2 43.1" fill="none" stroke="#22d3ee" strokeWidth="1" />
          <text x="107" y="38" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">&theta;</text>
          
          {/* Gravity force arrow (downward) */}
          <line x1="137.6" y1="118.4" x2="137.6" y2="165" stroke="#ffffff" strokeWidth="1.2" markerEnd="url(#penarr)" />
          <text x="143" y="162" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.8">mg</text>
          
          {/* Resolved components of gravity */}
          <line x1="137.6" y1="118.4" x2="151.3" y2="156.0" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.4" />
          
          {/* Tangential line perpendicular to string */}
          <line x1="137.6" y1="118.4" x2="112.3" y2="127.6" stroke="#f43f5e" strokeWidth="1.2" markerEnd="url(#penarr-red)" />
          <text x="106" y="140" fill="#f43f5e" fontSize="7" fontFamily="monospace">mg sin&theta;</text>
          <text x="153" y="164" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.5">mg &middot; cos&theta;</text>
          
          <defs>
            <marker id="penarr" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="#ffffff" fillOpacity="0.8" />
            </marker>
            <marker id="penarr-red" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="#f43f5e" />
            </marker>
          </defs>
        </svg>
 <div className="space-y-2 text-[13px] text-white/70">
          <p className="text-cyan-400 font-bold text-[12px] uppercase tracking-wider">Restoring Force Origin</p>
          <p className="text-[12px] leading-relaxed">
            The gravity component <span className="text-rose-400 font-bold">mg sin&theta;</span> acts along the tangent to restore equilibrium.
          </p>
          <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-1 text-[11.5px]">
            <p className="text-white font-bold text-[12px]">Small Angle Approximation:</p>
            <p>For &theta; &lt; 10&deg;, sin&theta; &asymp; &theta; = x/L.</p>
            <code className="text-rose-400 font-bold block mt-1">F &asymp; &minus;mg(x/L) &rArr; a = &minus;(g/L)x</code>
            <p className="text-white/40 mt-1">This satisfies the SHM criterion: a = &minus;&omega;&sup2;x</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DampedDecaySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[12px] uppercase tracking-wider text-white/30">Fig 8.1 — Damped Sinusoidal Oscillation Envelope</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 200 110" className="w-full mx-auto" style={{ maxHeight: 110 }}>
          {/* Time axis */}
          <line x1="15" y1="55" x2="185" y2="55" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
          <line x1="15" y1="10" x2="15" y2="100" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
          <text x="188" y="58" fill="#ffffff" fontSize="6.5" textAnchor="start" fillOpacity="0.5">t</text>
          <text x="8" y="15" fill="#ffffff" fontSize="6.5" textAnchor="middle" fillOpacity="0.5">x</text>
          
          {/* Exponential Decay Envelope (dashed) */}
          <path d="M 15 15 C 45 28, 85 40, 175 51" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.7" />
          <path d="M 15 95 C 45 82, 85 70, 175 59" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.7" />
          
          {/* Damped Sine wave */}
          <path d="M 15 15 Q 30 90, 45 32 T 75 44 T 105 50 T 135 53 T 165 54.5" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" />
          
          <text x="105" y="25" fill="#f43f5e" fontSize="7.5" fontFamily="monospace">A(t) = A<sub>0</sub>e<sup>&minus;bt/2m</sup></text>
        </svg>
 <div className="space-y-1.5 text-[12px] text-white/70">
          <p className="text-cyan-400 font-bold text-[12.5px] uppercase tracking-wider">Amplitude Decay</p>
          <p className="leading-relaxed">
            Due to friction or drag, energy decreases exponentially over time.
          </p>
          <div className="bg-black/40 p-2 rounded-lg border border-white/5 text-[11px] leading-relaxed">
            <span className="text-white font-bold block mb-0.5">Mechanical Energy Decay:</span>
            <span>E(t) = E<sub>0</sub>e<sup>&minus;bt/m</sup></span>
            <span className="text-white/40 block mt-0.5">Where: b = damping coefficient</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REUSABLE SMALL UI COMPONENTS ────────────────────────────────────────────
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
      <p className="font-mono text-cyan-300 font-bold text-[14.5px]" dangerouslySetInnerHTML={{ __html: formula }} />
      <div className="text-[12px] space-y-0.5">
        <p className="text-white/80"><strong className="text-white/40">Use:</strong> <span dangerouslySetInnerHTML={{ __html: use }} /></p>
        <p className="text-white/50"><strong className="text-white/40">Note:</strong> {label}</p>
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
        <p className="text-white/55 text-[13px] leading-relaxed mt-3 pt-3 border-t border-white/5">
          {detail}
        </p>
      )}
    </button>
  );
}

export function OscillationsLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'time' | 'velocity' | 'energy' | 'pendulum'>('time');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(10).fill(false));

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          {/* Top Row: Icon + Badges + Progress */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">⏲</span>
              <Tag color="cyan">Physics Unit 10</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Hot Topic</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Oscillations (SHM)
            </h1>
            <p className="text-[12px] text-rose-400/80 font-semibold tracking-wide mt-1.5">
              High weightage topic with graphical &amp; numerical questions
            </p>
          </div>

          {/* Stats Grid — 2×2 on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'IAT Priority', value: 'High' },
              { label: 'Difficulty', value: '4 / 5' },
              { label: 'IAT Questions', value: '2-3 / year' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px] font-bold text-white/40">
              <span className="uppercase tracking-wider">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
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
              'Hierarchy of Periodic, Oscillatory, and SHM motions',
              'SHM as a projection of Uniform Circular Motion (UCM)',
              'Kinematic relationships (x, v, a) and phase lead differences',
              'Mean vs Extreme positions properties (velocity, force, acceleration)',
              'Energy sharing curves (PE, KE, and equality point at A/sqrt(2))',
              'Time taken to travel fractional amplitudes (T/12, T/8, T/6)',
              'Simple Pendulums in accelerated frames (lifts, freefall)',
              'Spring combinations (Series, Parallel) and cutting springs rule',
              'Effective time periods for massive springs (Ms/3 rule)'
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: CORE CONCEPT */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Motion Classification Hierarchy</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Understanding the hierarchy of repetitive motions is crucial for identifying simple harmonic motion. Every SHM is oscillatory, and every oscillation is periodic, but the converse is not true.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { type: 'Periodic Motion', condition: 'Repeats after fixed time (T)', ex: 'Planets rotating around Sun, uniform circular motion', col: 'text-cyan-400' },
            { type: 'Oscillatory Motion', condition: 'Periodic + back & forth about Mean Position', ex: 'Piston in engine, swing, rocking chair', col: 'text-violet-400' },
            { type: 'SHM', condition: 'Oscillatory + Restoring force F = -kx', ex: 'Spring-mass system, small angle simple pendulum', col: 'text-rose-400' }
          ].map((item, idx) => (
            <div key={item.type} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between">
 <span className="text-[12px] text-white/40">Step {idx + 1}</span>
 <span className={cn('text-[9px] font-bold uppercase tracking-wider', item.col)}>{item.type}</span>
              </div>
              <h4 className="text-white font-bold text-[13px]">{item.type}</h4>
              <p className="text-white/60 text-[12px]"><strong className="text-white/40">Condition:</strong> {item.condition}</p>
              <p className="text-white/50 text-[12px]"><strong className="text-white/40">Example:</strong> {item.ex}</p>
            </div>
          ))}
        </div>

        <InsightCard>
          <strong>The SHM Criteria:</strong> A system is in SHM if and only if the acceleration is related to displacement by <code>d²x/dt² = -ω²x</code>. If the force constant has any higher power of x (like F = -kx³), the motion is oscillatory but NOT simple harmonic.
        </InsightCard>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
 <span className="text-[10px] uppercase font-bold text-white/35 block">Time Period (T)</span>
 <p className="text-white text-[13px] font-bold">T = 1/f</p>
            <p className="text-white/50 text-[12px]">The smallest time interval after which the motion repeats itself.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
 <span className="text-[10px] uppercase font-bold text-white/35 block">Frequency (f or n)</span>
 <p className="text-white text-[13px] font-bold">f = 1/T</p>
            <p className="text-white/50 text-[12px]">The number of complete oscillations per unit time. Measured in Hertz (Hz).</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
 <span className="text-[10px] uppercase font-bold text-white/35 block">Angular Frequency (ω)</span>
 <p className="text-white text-[13px] font-bold">ω = 2π/T = 2πf</p>
            <p className="text-white/50 text-[12px]">The rate of change of phase angle per unit time. Measured in rad/s.</p>
          </div>
        </div>
      </div>

      {/* PART 2: SHM vs UCM & KINEMATICS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">SHM vs UCM and Kinematics</h2>
        </div>
        <SHMCircleSVG />
        <div>
          <h3 className="text-white/90 font-display font-bold text-[14.5px] mb-3">SHM Kinematics Formulas</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <PremiumFormulaCard
              formula="x(t) = A sin(&omega;t + &phi;)"
              use="Position at any time t"
              label="A: amplitude, &omega;: angular frequency, &phi;: initial phase"
              priority={5}
            />
            <PremiumFormulaCard
              formula="v(t) = A&omega; cos(&omega;t + &phi;) = &plusmn;&omega;&radic;(A&sup2; &minus; x&sup2;)"
              use="Velocity at any displacement x or time t"
              label="v is maximum at mean position (x=0), zero at extreme (x=&plusmn;A)"
              priority={5}
            />
            <PremiumFormulaCard
              formula="a(t) = &minus;A&omega;&sup2; sin(&omega;t + &phi;) = &minus;&omega;&sup2;x"
              use="Acceleration at any displacement x"
              label="Always directed opposite to displacement (towards mean)"
              priority={5}
            />
          </div>
        </div>

        <InsightCard>
          <strong>UCM vs Kinematics Phase Convention:</strong> Both <code>x = A sin(&omega;t + &phi;)</code> and <code>x = A cos(&omega;t + &phi;)</code> are completely valid SHM equations, differing only in the choice of initial phase origin.
          <ul className="list-disc pl-4 mt-1.5 space-y-1">
            <li>Use <strong>sine</strong> (<code>x = A sin(&omega;t)</code>) when the particle starts from the <strong>mean position</strong> (<code>x = 0</code> at <code>t = 0</code>).</li>
            <li>Use <strong>cosine</strong> (<code>x = A cos(&omega;t)</code>) when the particle starts from the <strong>positive extreme position</strong> (<code>x = A</code> at <code>t = 0</code>), which is typical when projecting a reference circle aligned to the positive x-axis.</li>
          </ul>
        </InsightCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase">📍 MEAN POSITION PROPERTIES (x = 0)</span>
 <ul className="text-[13px] text-white/70 space-y-1.5">
              <li>• Displacement: <strong className="text-white">x = 0</strong></li>
              <li>• Velocity: <strong className="text-emerald-400">Maximum (v = &plusmn;A&omega;)</strong></li>
              <li>• Acceleration: <strong className="text-white">Zero (a = 0)</strong></li>
              <li>• Restoring Force: <strong className="text-white">Zero (F = 0)</strong></li>
              <li>• Kinetic Energy: <strong className="text-emerald-400">Maximum (KE = E)</strong></li>
              <li>• Potential Energy: <strong className="text-white">Zero (PE = 0)</strong></li>
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-rose-400 tracking-wider block uppercase">📏 EXTREME POSITION PROPERTIES (x = &plusmn;A)</span>
 <ul className="text-[13px] text-white/70 space-y-1.5">
              <li>• Displacement: <strong className="text-white">x = &plusmn;A</strong></li>
              <li>• Velocity: <strong className="text-white">Zero (v = 0)</strong></li>
              <li>• Acceleration: <strong className="text-rose-400">Maximum (a = &mp;A&omega;&sup2;)</strong></li>
              <li>• Restoring Force: <strong className="text-rose-400">Maximum (F = &mp;kA)</strong></li>
              <li>• Kinetic Energy: <strong className="text-white">Zero (KE = 0)</strong></li>
              <li>• Potential Energy: <strong className="text-rose-400">Maximum (PE = E)</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* PART 3: FORCE LAW FOR SHM & DIFFERENTIAL EQUATION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Force Law for SHM &amp; Differential Equation</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Simple Harmonic Motion is dynamically defined by the restoring force acting on the particle, which always pulls it back towards the equilibrium position.
        </p>

        <SpringMassSVG />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="F = &minus;kx"
            use="Restoring Force Law"
            label="k: force constant (N/m), x: displacement from mean position"
            priority={5}
          />
          <PremiumFormulaCard
            formula="d&sup2;x/dt&sup2; + &omega;&sup2;x = 0"
            use="Defining Differential Equation"
            label="The standard second-order linear differential equation governing all SHM"
            priority={5}
          />
          <PremiumFormulaCard
            formula="T = 2&pi;&radic;(m/k) = 2&pi;/&omega;"
            use="Spring-Mass Time Period"
            label="Governs both horizontal and vertical spring configurations (&omega; = &radic;(k/m))"
            priority={5}
          />
        </div>

        <InsightCard>
          <strong>Equilibrium Position Shift:</strong> In a vertical spring-mass system, gravity stretches the spring by a constant length <code>y<sub>0</sub> = mg/k</code> at equilibrium. The mass still executes SHM about this shifted equilibrium position with the exact same time period <code>T = 2&pi;&radic;(m/k)</code>.
        </InsightCard>
      </div>

      {/* PART 4: PHASE RELATIONSHIPS & GRAPHS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Phase Relationships &amp; Graphs</h2>
        </div>
        <GraphGallerySVG />
        <PhaseWheelSVG />
        <TrapCard title="Frequency Check - Standard Multiplier Trap">
          If displacement oscillates with frequency <code>f<sub>0</sub></code>, then velocity and acceleration also oscillate with frequency <code>f<sub>0</sub></code>.
          However, because energy is proportional to the square of displacement or velocity (e.g. <code>x&sup2;</code> or <code>v&sup2;</code>), the Kinetic and Potential energies oscillate with double the frequency: <code>2f<sub>0</sub></code>!
        </TrapCard>
      </div>

      {/* PART 5: ENERGY IN SHM */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Energy in Simple Harmonic Motion</h2>
        </div>
        <EnergyFlowSVG />

        <div className="grid sm:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="U = &frac12; k x&sup2; = &frac12; m &omega;&sup2; x&sup2;"
            use="Potential Energy (PE)"
            label="U is minimum (0) at mean position, maximum (&frac12;kA&sup2;) at extreme"
            priority={5}
          />
          <PremiumFormulaCard
            formula="K = &frac12; k (A&sup2; &minus; x&sup2;) = &frac12; m &omega;&sup2; (A&sup2; &minus; x&sup2;)"
            use="Kinetic Energy (KE)"
            label="K is maximum (&frac12;kA&sup2;) at mean position, minimum (0) at extreme"
            priority={5}
          />
          <PremiumFormulaCard
            formula="E = U + K = &frac12; k A&sup2;"
            use="Total Mechanical Energy (E)"
            label="Constant at all points throughout the oscillation (Conservation of Energy)"
            priority={5}
          />
        </div>
        
        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[480px]">
            <thead>
 <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase tracking-wider">Position (x)</th>
                <th className="text-center px-4 py-3 text-cyan-400 font-bold uppercase tracking-wider">Potential Energy (U)</th>
                <th className="text-center px-4 py-3 text-emerald-400 font-bold uppercase tracking-wider">Kinetic Energy (K)</th>
                <th className="text-center px-4 py-3 text-violet-400 font-bold uppercase tracking-wider">Total Energy (E)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Mean (x=0)', '0', 'E (100%)', 'E'],
                ['x = ±A/2', 'E/4 (25%)', '3E/4 (75%)', 'E'],
                ['x = ±A/√2', 'E/2 (50%)', 'E/2 (50%)', 'E'],
                ['x = ±A√3/2', '3E/4 (75%)', 'E/4 (25%)', 'E'],
                ['Extreme (x=±A)', 'E (100%)', '0', 'E'],
              ].map(([pos, u, k, e]) => (
 <tr key={pos as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{pos as string}</td>
                  <td className="px-4 py-3 text-cyan-300 text-center">{u as string}</td>
                  <td className="px-4 py-3 text-emerald-300 text-center">{k as string}</td>
                  <td className="px-4 py-3 text-violet-300 text-center font-bold">{e as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InsightCard>
          <strong>Energy Frequency Rule:</strong> While displacement varies as <code>A sin(&omega;t)</code> (frequency f), both kinetic energy <code>K(t)</code> and potential energy <code>U(t)</code> vary as <code>sin&sup2;(&omega;t)</code> and <code>cos&sup2;(&omega;t)</code>. Using trig identity: <code>sin&sup2;&theta; = (1 - cos2&theta;)/2</code>, we see energy oscillates with angular frequency <code>2&omega;</code> (frequency 2f).
        </InsightCard>
      </div>

      {/* PART 6: THE SIMPLE PENDULUM */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 6</span>
          <h2 className="text-white font-display font-bold text-[17px]">The Simple Pendulum</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A point mass suspended by a light, inextensible string executing angular oscillations under the action of gravity.
        </p>

        <SimplePendulumSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="T = 2&pi;&radic;(L/g)"
            use="Pendulum Time Period"
            label="L: string length (m), g: acceleration due to gravity (m/s&sup2;)"
            priority={5}
          />
          <PremiumFormulaCard
            formula="&omega; = &radic;(g/L)"
            use="Angular Frequency"
            label="Independent of bob mass, depends only on length and local gravity"
            priority={5}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase">⏱️ Seconds Pendulum</span>
            <p className="text-white/70 leading-relaxed font-sans">
              A pendulum whose time period is exactly <strong>2 seconds</strong> (takes 1 second to swing from one extreme to the other).
              <br />
              At Earth&apos;s surface:
              <code className="text-cyan-300 font-bold block mt-1">L = g / &pi;&sup2; &asymp; 1 meter</code>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
 <span className="text-[12px] font-bold text-amber-400 tracking-wider block uppercase">🌍 Variation of g with Height &amp; Depth</span>
            <p className="text-white/70 leading-relaxed font-sans">
              As you move above Earth&apos;s surface (height h) or below (depth d), gravity decreases:
              <br />
              &bull; Height: <code>g&apos; = g(1 &minus; 2h/R)</code>
              <br />
              &bull; Depth: <code>g&apos; = g(1 &minus; d/R)</code>
              <br />
              Since <code>g</code> decreases, the pendulum time period <strong>lengthens (T&apos; &gt; T)</strong> &mdash; the clock runs slow.
            </p>
          </div>
        </div>

        <div className="bg-black/30 p-4.5 rounded-2xl border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase">⚙️ Pendulum in Accelerated Frames</span>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
              <span className="text-emerald-400 font-bold block">1. Lift Accelerating UP (a)</span>
              <p className="text-white/60">Effective gravity is increased:</p>
              <code className="text-emerald-300">g<sub>eff</sub> = g + a</code>
              <p className="text-white/40 text-[11px] pt-1">T = 2&pi;&radic;(L/(g+a)) &darr; (runs fast)</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
              <span className="text-rose-400 font-bold block">2. Lift Accelerating DOWN (a)</span>
              <p className="text-white/60">Effective gravity is decreased:</p>
              <code className="text-rose-300">g<sub>eff</sub> = g &minus; a</code>
              <p className="text-white/40 text-[11px] pt-1">T = 2&pi;&radic;(L/(g-a)) &uarr; (runs slow)</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
              <span className="text-amber-400 font-bold block">3. Horizontal Acceleration (a)</span>
              <p className="text-white/60">Car moving laterally with acceleration a:</p>
              <code className="text-amber-300">g<sub>eff</sub> = &radic;(g&sup2; + a&sup2;)</code>
              <p className="text-white/40 text-[11px] pt-1">T = 2&pi;&radic;(L/&radic;(g&sup2;+a&sup2;)) &darr;</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 7: ELITE SHORTCUTS & TIMING */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 7</span>
          <h2 className="text-white font-display font-bold text-[17px]">Elite Shortcuts &amp; Timing Rules</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase">🕒 Time Taken from Mean (x=0)</span>
            <div className="overflow-x-auto w-full">
 <table className="w-full text-[12px] min-w-[220px]">
                <thead>
                  <tr className="border-b border-white/10 text-white/40">
                    <th className="text-left pb-1">Interval</th>
                    <th className="text-right pb-1">Time Taken</th>
                  </tr>
                </thead>
                <tbody className="text-white/80 space-y-1">
                  <tr><td>Mean (0) to A/2</td><td className="text-right text-cyan-300 font-bold">T / 12</td></tr>
                  <tr><td>Mean (0) to A/√2</td><td className="text-right text-cyan-300 font-bold">T / 8</td></tr>
                  <tr><td>Mean (0) to A√3/2</td><td className="text-right text-cyan-300 font-bold">T / 6</td></tr>
                  <tr><td>A/2 to A (Extreme)</td><td className="text-right text-cyan-300 font-bold">T / 6</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-white/40 leading-relaxed pt-1">
              Warning: Time is NOT linear with distance! It takes the same time to travel the first half (0 to A/2: T/12) as it does to travel from A/2 to A (T/6) because the particle slows down near the extreme.
            </p>
          </div>

          <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase">🔩 Massive Spring Correction</span>
 <p className="text-white/70 text-[13px] leading-relaxed">
              Usually springs are assumed massless. If the spring itself has finite mass <code>M<sub>s</sub></code>:
              <br /><br />
              Replace load mass <code>m</code> with effective mass:
              <code className="text-violet-300 font-bold block mt-1.5 text-center">m<sub>eff</sub> = m + M<sub>s</sub>/3</code>
              <br />
              Time period formula becomes:
              <code className="text-violet-300 font-bold block mt-1 text-center">T = 2&pi;&radic;((m + M<sub>s</sub>/3)/k)</code>
            </p>
          </div>
        </div>

        <div className="bg-black/30 p-4.5 rounded-2xl border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-amber-400 tracking-wider block uppercase">✂️ Spring Modification Laws</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
 <span className="text-white/40 text-[10px] block uppercase">Spring Constant Rule</span>
              <p className="text-white/80 font-mono">Spring constant is inversely proportional to its length: <code className="text-amber-300 font-bold">k ∝ 1/L</code>.</p>
              <p className="text-white/50 text-[12px] pt-1">If a spring of constant k is cut into n equal parts, the spring constant of each part becomes <code className="text-amber-300">nk</code>.</p>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
 <span className="text-white/40 text-[10px] block uppercase">Combinations</span>
 <ul className="space-y-1 text-white/70 text-[12px]">
                <li>• <strong className="text-white">Series</strong>: <code>1/k<sub>eq</sub> = Σ(1/k<sub>i</sub>)</code> (softer)</li>
                <li>• <strong className="text-white">Parallel</strong>: <code>k<sub>eq</sub> = Σ k<sub>i</sub></code> (stiffer)</li>
                <li>• Note: Two springs connected to opposite walls of a mass are in parallel! <code>k<sub>eq</sub> = k<sub>1</sub> + k<sub>2</sub></code>.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PART 8: APPENDIX — BEYOND SYLLABUS: DAMPED & FORCED OSCILLATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18]/80 border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/60 text-[11px] font-bold">APPENDIX</span>
          <h2 className="text-white font-display font-bold text-[16px]">Extra (Beyond Syllabus) &mdash; Damped &amp; Forced</h2>
        </div>
        <p className="text-white/50 text-[12.5px] leading-relaxed">
          Real physical oscillations experience dissipative force which dampens amplitude. Although not strictly in focus for direct questions, here is the reference physics:
        </p>

        <DampedDecaySVG />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase">📉 Damped Oscillations</span>
 <p className="text-white/70 text-[13px] leading-relaxed">
              Total resistive force: <code>F<sub>d</sub> = &minus;b v</code>, where <code>b</code> is the damping constant.
              <br />Equation of motion: <code>m d²x/dt² + b dx/dt + kx = 0</code>.
              <br />Displacement solution: <code>x(t) = A(t) cos(ω't + φ)</code>.
            </p>
 <div className="space-y-1.5 border-t border-white/5 pt-2 text-[12px] text-white/50">
              <p>• <strong className="text-cyan-300">Amplitude Decay</strong>: <code>A(t) = A<sub>0</sub> e^(-b t / 2m)</code>. The amplitude decreases exponentially.</p>
              <p>• <strong className="text-cyan-300">Energy Decay</strong>: <code>E(t) = E<sub>0</sub> e^(-b t / m)</code>. Decays twice as fast.</p>
              <p>• <strong className="text-cyan-300">Damped Frequency</strong>: <code>ω' = sqrt(k/m - b²/(4m²))</code>.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase">⚡ Forced Oscillations &amp; Resonance</span>
 <p className="text-white/70 text-[13px] leading-relaxed">
              When an external periodic force <code>F(t) = F<sub>0</sub> cos(&omega;<sub>d</sub> t)</code> is applied.
              <br />Forced oscillator amplitude:
              <br /><code className="text-violet-300">A = F<sub>0</sub> / sqrt(m²(ω² - &omega;<sub>d</sub>²)² + b²&omega;<sub>d</sub>²)</code>
            </p>
 <div className="space-y-1.5 border-t border-white/5 pt-2 text-[12px] text-white/50">
              <p>• <strong className="text-violet-300">Resonance</strong> occurs when <code>&omega;<sub>d</sub> = ω</code>.</p>
              <p>• At resonance, if damping is small, amplitude becomes extremely large.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 7: SOLVED EXAMPLE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0"><BookOpen className="w-5 h-5" /></span>
 <h3 className="text-white font-display font-bold text-[17px] sm:text-lg tracking-wide uppercase">Solved Numerical Example</h3>
        </div>
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Problem statement</span>
            <p className="text-white/80 leading-relaxed">
              A particle executing SHM with time period T starts from the mean position. Find the ratio of time taken by it to travel directly from:
              <br />(i) mean position to half the amplitude (0 to A/2)
              <br />(ii) half the amplitude to the extreme position (A/2 to A)
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Solution (Method 1: Reference Circle projection)</span>
            <p className="text-white/60 leading-relaxed">
              Let the equation of displacement be <code>x(t) = A sin(ωt)</code>.
              <br />1. For 0 to A/2:
              <br />&nbsp;&nbsp;&nbsp;<code>A/2 = A sin(ωt<sub>1</sub>) &rArr; sin(ωt<sub>1</sub>) = 1/2 &rArr; ωt<sub>1</sub> = π/6</code>.
              <br />&nbsp;&nbsp;&nbsp;Since <code>ω = 2π/T</code>:
              <br />&nbsp;&nbsp;&nbsp;<code>(2π/T)t<sub>1</sub> = π/6 &rArr; t<sub>1</sub> = T/12</code>.
              <br />2. For 0 to A:
              <br />&nbsp;&nbsp;&nbsp;The time taken to reach the extreme position A from mean position 0 is <code>t<sub>total</sub> = T/4</code>.
              <br />3. For A/2 to A:
              <br />&nbsp;&nbsp;&nbsp;<code>t<sub>2</sub> = t<sub>total</sub> - t<sub>1</sub> = T/4 - T/12 = (3T - T)/12 = T/6</code>.
              <br />4. Ratio of time taken:
              <br />&nbsp;&nbsp;&nbsp;<code>t<sub>1</sub> : t<sub>2</sub> = (T/12) / (T/6) = 1 : 2</code>.
            </p>
          </div>
          <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
            <p className="text-white/90 text-[12px] leading-relaxed">
              <strong className="text-emerald-400">Physical Intuition:</strong> Near the mean position, the velocity is at its maximum. Therefore, it covers the first half of the distance (0 to A/2) quickly in <code>T/12</code>. Near the extreme, it decelerates and stops, taking twice as long (<code>T/6</code>) to cover the remaining half of the distance (A/2 to A).
            </p>
          </div>
        </div>

        {/* Solved Example 2: Shifted Equilibrium */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 2: Shifted Equilibrium</span>
            <p className="text-white/80 leading-relaxed">
              A particle of mass m = 2 kg executes motion along the x-axis. Its acceleration profile is given by:
              <br /><code>a = -4x + 8</code> (in SI units).
              <br />(i) Prove that the motion is simple harmonic and find the mean position.
              <br />(ii) Calculate the angular frequency ω and time period of oscillations T.
              <br />(iii) Write the displacement equation x(t) if amplitude is A = 3 m and it starts from rest at the maximum positive displacement.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">SHM Proof &amp; Mean Position:</strong>
              <br />&nbsp;&nbsp;&nbsp;Factor out the constant: <code>a = -4(x - 2)</code>.
              <br />&nbsp;&nbsp;&nbsp;Compare this to the standard SHM equation: <code>a = -ω²(x - x<sub>0</sub>)</code> where <code>x<sub>0</sub></code> is the mean position.
              <br />&nbsp;&nbsp;&nbsp;Since acceleration is directly proportional to the negative of displacement from <code>x = 2</code>, the motion is SHM.
              <br />&nbsp;&nbsp;&nbsp;Setting <code>a = 0</code> gives the equilibrium (mean) position: <code>x = 2 m</code>.
            </p>
            <p>
              2. <strong className="text-white">Angular Frequency &amp; Time Period:</strong>
              <br />&nbsp;&nbsp;&nbsp;From comparison, <code>ω² = 4 &rArr; ω = 2 rad/s</code>.
              <br />&nbsp;&nbsp;&nbsp;Time period <code>T = 2π/ω = 2π/2 = π seconds</code> (&approx; 3.14 s).
            </p>
            <p>
              3. <strong className="text-white">Displacement Equation:</strong>
              <br />&nbsp;&nbsp;&nbsp;General displacement equation about a shifted mean <code>x<sub>0</sub></code> is:
              <br />&nbsp;&nbsp;&nbsp;<code>x(t) = x<sub>0</sub> + A cos(ωt + φ) = 2 + 3 cos(2t + φ)</code>.
              <br />&nbsp;&nbsp;&nbsp;At <code>t = 0</code>, the particle is at rest at maximum displacement, so <code>x(0) = x<sub>0</sub> + A = 2 + 3 = 5 m</code>.
              <br />&nbsp;&nbsp;&nbsp;<code>5 = 2 + 3 cos(φ) &rArr; cos(φ) = 1 &rArr; φ = 0</code>.
              <br />&nbsp;&nbsp;&nbsp;Therefore, the equation is: <code className="text-cyan-300">x(t) = 2 + 3 cos(2t)</code>.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE FORMULA FINDER (DECISION TREE) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Select what your question is trying to solve to immediately find the correct approach:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'time', label: '⏳ Travel Time' },
            { id: 'velocity', label: '🚀 Velocity & Accel' },
            { id: 'energy', label: '⚡ SHM Energy' },
            { id: 'pendulum', label: '🎡 Pendulums / Frames' },
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
          {selectedGoal === 'time' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-cyan-400 block uppercase">Objective: Find travel time between two positions</span>
              <p className="text-white/70">1. Set up the equation: <code>x(t) = A sin(ωt + φ)</code> or <code>A cos(ωt + φ)</code>.</p>
              <p className="text-white/70">2. Solve for phase angle <code>θ = ωt + φ</code> at each point.</p>
              <p className="text-white/70">3. Apply the time difference: <code>Δt = Δθ / ω = Δθ·T / 2π</code>.</p>
              <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl text-cyan-300 font-bold text-center">
                Mnemonic: Mean to A/2 is T/12. A/2 to Extreme is T/6.
              </div>
            </div>
          )}
          {selectedGoal === 'velocity' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-emerald-400 block uppercase">Objective: Relate velocity, acceleration, and position</span>
              <p className="text-white/70">1. If given displacement <code>x</code>: Use <code>v = ±ω√(A² - x²)</code> and <code>a = -ω²x</code>.</p>
              <p className="text-white/70">2. If given time <code>t</code>: Use sine/cosine derivatives starting from <code>x(t)</code>.</p>
              <p className="text-white/70">3. Find maximum limits: <code>v<sub>max</sub> = Aω</code> (at mean), <code>a<sub>max</sub> = Aω²</code> (at extremes).</p>
            </div>
          )}
          {selectedGoal === 'energy' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-violet-400 block uppercase">Objective: Compare potential, kinetic, or total energies</span>
              <p className="text-white/70">1. Kinetic Energy: <code>K = 1/2 m v² = 1/2 k(A² - x²)</code>.</p>
              <p className="text-white/70">2. Potential Energy: <code>U = 1/2 k x²</code>.</p>
              <p className="text-white/70">3. Total Energy: <code>E = K + U = 1/2 k A²</code> (always constant for a conservative system).</p>
              <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl text-violet-300 font-bold text-center">
                Mnemonic: Equal sharing point is at x = A/√2 ≈ 0.707A (where U = K = E/2).
              </div>
            </div>
          )}
          {selectedGoal === 'pendulum' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-amber-400 block uppercase">Objective: Calculate simple pendulum time period in variable frames</span>
              <p className="text-white/70">1. Basic formula: <code>T = 2π√(L/g)</code>.</p>
              <p className="text-white/70">2. Accelerated frame: Replace <code>g</code> with <code>g<sub>eff</sub></code> vectorially: <code>g<sub>eff</sub> = g &minus; a</code>.</p>
              <p className="text-white/70">3. Temperature change: Thermal expansion increases pendulum length: <code>ΔT/T ≈ 1/2 α Δθ</code>.</p>
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
            { cue: '"Projection of uniform circular motion on a diameter"', think: 'SHM from UCM. Use x = A cos(ωt + φ).' },
            { cue: '"Find point where Potential and Kinetic energies are equal"', think: 'Set U = K. The displacement is x = ±A/√2 ≈ 0.707A.' },
            { cue: '"Simple pendulum placed in an accelerating lift"', think: 'Apply effective gravity. Upwards acceleration: g + a; Downwards: g - a.' },
            { cue: '"A spring is cut into pieces and rearranged"', think: 'Spring constant k is proportional to 1/Length. Parallel: k<sub>eq</sub> = Σk; Series: 1/k<sub>eq</sub> = Σ1/k.' },
            { cue: '"Acceleration is given by a = -px + q"', think: 'It remains SHM. Shift of mean position: set a = 0 to find the new equilibrium x = q/p. Angular frequency ω = √p.' },
            { cue: '"Spring has finite mass Ms"', think: 'Replace load mass m with effective mass (m + Ms/3) in T = 2π√((m + Ms/3)/k).' }
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

      {/* COMMON MISTAKES & TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Frequency of Energy vs Kinematics">
            Kinematics variables (displacement, velocity, acceleration) oscillate with frequency <code>f</code>. Energies (Potential, Kinetic) oscillate with double frequency <code>2f</code>. Watch out for this distinction in word problems!
          </TrapCard>
          <TrapCard title="Trap 2: Cutting Springs Length Ratio">
            If a spring is cut into lengths in ratio <code>1:2</code>, their constants are in inverse ratio <code>2:1</code>. Never assume constants cut proportionally.
          </TrapCard>
          <TrapCard title="Trap 3: Small Angle Approximation for Pendulum">
            The formula <code>T = 2π√(L/g)</code> holds ONLY for small angular displacement (θ &lt; 10°). If the pendulum is released from 90°, the motion is periodic but NOT simple harmonic.
          </TrapCard>
        </div>
      </div>

      {/* 2-MINUTE REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/15 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-400 animate-pulse" />
 <h3 className="text-emerald-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
          </div>
 <span className="text-[12px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            {checkedItems.filter(Boolean).length} / 10 Completed
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            'SHM condition: acceleration is proportional to &minus;x (a = &minus;&omega;&sup2;x)',
            'Maximum velocity v<sub>max</sub> = A&omega; (at mean), maximum acceleration a<sub>max</sub> = A&omega;&sup2; (at extreme)',
            'Velocity leads displacement by &pi;/2; acceleration leads velocity by &pi;/2',
            'Mean to A/2 is T/12; A/2 to extreme is T/6',
            'Potential and Kinetic energies are equal at x = A/&radic;2 &asymp; 0.707A',
            'Total mechanical energy is constant: E = &frac12; k A&sup2; = &frac12; m &omega;&sup2; A&sup2;',
            'Energies oscillate with double the frequency (2f) of displacement (f)',
            'Spring constant k is proportional to 1/L; cut in n parts &rarr; nk constant each',
            'Series springs: 1/k<sub>eq</sub> = &Sigma;(1/k<sub>i</sub>); Parallel springs: k<sub>eq</sub> = &Sigma;k<sub>i</sub>',
            'Lift accelerating UP: g<sub>eff</sub> = g + a; accelerating DOWN: g<sub>eff</sub> = g &minus; a',
          ].map((item, idx) => (
            <button
              key={item}
              onClick={() => {
                const next = [...checkedItems];
                next[idx] = !next[idx];
                setCheckedItems(next);
              }}
              className="flex items-start text-left gap-2 text-[13px] text-white/70 py-1.5 border-b border-white/[0.04] last:border-0 w-full hover:bg-white/[0.02] rounded px-1 transition-colors group"
            >
              <CheckCircle className={cn(
                "w-4 h-4 shrink-0 mt-0.5 transition-colors",
                checkedItems[idx] ? "text-emerald-400 fill-emerald-500/10" : "text-white/20 group-hover:text-emerald-400/50"
              )} />
              <span className={cn(checkedItems[idx] && "line-through text-white/40")} dangerouslySetInnerHTML={{ __html: item }} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
