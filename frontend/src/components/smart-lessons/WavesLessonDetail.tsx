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

// ─── SVG VISUAL 1: PROGRESSIVE WAVE ANATOMY ──────────────────────────────────
function ProgressiveWaveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Progressive Wave Anatomy</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Axes */}
        <line x1="20" y1="60" x2="320" y2="60" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
        <line x1="20" y1="10" x2="20" y2="110" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
        
        {/* Sine Wave */}
        <path d="M 20 60 Q 55 15, 90 60 T 160 60 T 230 60 T 300 60" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Wavelength Indicator */}
        <line x1="55" y1="15" x2="195" y2="15" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="55" y1="12" x2="55" y2="18" stroke="#a78bfa" strokeWidth="1" />
        <line x1="195" y1="12" x2="195" y2="18" stroke="#a78bfa" strokeWidth="1" />
        <text x="125" y="11" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Wavelength (λ)</text>

        {/* Amplitude Indicator */}
        <line x1="125" y1="60" x2="125" y2="105" stroke="#34d399" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="122" y1="105" x2="128" y2="105" stroke="#34d399" strokeWidth="1" />
        <text x="131" y="86" fill="#34d399" fontSize="8" fontFamily="monospace">Amp (A)</text>

        {/* Labels */}
        <text x="55" y="32" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Crest</text>
        <text x="125" y="116" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Trough</text>
        <text x="320" y="68" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace" textAnchor="end">Propagation Direction &rarr;</text>
        <text x="25" y="18" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">y</text>
        <text x="312" y="55" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">x</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 2: STANDING WAVE LOOPS (Nodes & Antinodes) ────────────────────
function StandingWaveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Standing Wave Loops</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Baseline */}
        <line x1="20" y1="60" x2="320" y2="60" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
        
        {/* Combined Loops */}
        {/* Loop 1 */}
        <path d="M 40 60 Q 90 15, 140 60" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <path d="M 40 60 Q 90 105, 140 60" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3,2" strokeOpacity="0.5" />
        {/* Loop 2 */}
        <path d="M 140 60 Q 190 105, 240 60" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <path d="M 140 60 Q 190 15, 240 60" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3,2" strokeOpacity="0.5" />
        {/* Loop 3 */}
        <path d="M 240 60 Q 290 15, 340 60" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <path d="M 240 60 Q 290 105, 340 60" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3,2" strokeOpacity="0.5" />

        {/* Nodes and Antinodes Markers */}
        <circle cx="40" cy="60" r="3.5" fill="#f87171" />
        <circle cx="140" cy="60" r="3.5" fill="#f87171" />
        <circle cx="240" cy="60" r="3.5" fill="#f87171" />
        <circle cx="340" cy="60" r="3.5" fill="#f87171" />
        
        <circle cx="90" cy="60" r="3" fill="#34d399" />
        <circle cx="190" cy="60" r="3" fill="#34d399" />
        <circle cx="290" cy="60" r="3" fill="#34d399" />

        {/* Labels */}
        <text x="40" y="48" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Node</text>
        <text x="140" y="48" fill="#f87171" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">N</text>
        <text x="90" y="75" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Antinode (A)</text>
        <text x="190" y="75" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">A</text>

        {/* Distance Indicator */}
        <line x1="90" y1="110" x2="140" y2="110" stroke="#a78bfa" strokeWidth="0.8" />
        <line x1="90" y1="107" x2="90" y2="113" stroke="#a78bfa" strokeWidth="0.8" />
        <line x1="140" y1="107" x2="140" y2="113" stroke="#a78bfa" strokeWidth="0.8" />
        <text x="115" y="118" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">λ/4</text>

        <line x1="40" y1="10" x2="140" y2="10" stroke="#a78bfa" strokeWidth="0.8" />
        <line x1="40" y1="7" x2="40" y2="13" stroke="#a78bfa" strokeWidth="0.8" />
        <line x1="140" y1="7" x2="140" y2="13" stroke="#a78bfa" strokeWidth="0.8" />
        <text x="90" y="6" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Node to Node = λ/2</text>
      </svg>
    </div>
  );
}

// ─── SVG VISUAL 3: REFLECTION AT BOUNDARIES ──────────────────────────────────
function BoundaryReflectionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Fixed Boundary vs Free Boundary Reflection</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fixed boundary */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[12px] font-bold text-rose-400 block">Rigid/Fixed End (Phase Shift = π)</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 70 }}>
            {/* Rigid Wall */}
            <rect x="140" y="5" width="8" height="70" fill="#3f3f46" rx="1" />
            <line x1="10" y1="40" x2="140" y2="40" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
            {/* Incoming wave (solid) */}
            <path d="M 10 40 Q 30 15, 50 40" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <path d="M 28 22 L 36 22 L 32 17 Z" fill="#22d3ee" />
            {/* Reflected wave (dashed, inverted) */}
            <path d="M 80 40 Q 100 65, 120 40" fill="none" stroke="#f87171" strokeWidth="1.5" strokeDasharray="3,2" />
            <path d="M 102 58 L 94 58 L 98 63 Z" fill="#f87171" />
            <text x="30" y="55" fill="#22d3ee" fontSize="7" fontFamily="monospace">Incident</text>
            <text x="100" y="30" fill="#f87171" fontSize="7" fontFamily="monospace">Reflected (Inverted)</text>
          </svg>
        </div>

        {/* Free boundary */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 block">Open/Free End (Phase Shift = 0)</span>
          <svg viewBox="0 0 160 80" className="w-full" style={{ maxHeight: 70 }}>
            {/* Rod with ring */}
            <line x1="140" y1="5" x2="140" y2="75" stroke="#3f3f46" strokeWidth="3" />
            <circle cx="140" cy="40" r="4.5" fill="none" stroke="#34d399" strokeWidth="2" />
            <line x1="10" y1="40" x2="140" y2="40" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
            {/* Incoming wave (solid) */}
            <path d="M 10 40 Q 30 15, 50 40" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <path d="M 28 22 L 36 22 L 32 17 Z" fill="#22d3ee" />
            {/* Reflected wave (dashed, same phase) */}
            <path d="M 80 40 Q 100 15, 120 40" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,2" />
            <path d="M 102 22 L 94 22 L 98 17 Z" fill="#34d399" />
            <text x="30" y="55" fill="#22d3ee" fontSize="7" fontFamily="monospace">Incident</text>
            <text x="100" y="55" fill="#34d399" fontSize="7" fontFamily="monospace">Reflected (Upright)</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 4: ORGAN PIPE HARMONICS ──────────────────────────────────────
function PipeHarmonicsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Organ Pipe Fundamental Modes</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Closed organ pipe */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
 <span className="text-[12px] font-bold text-amber-400">Closed Pipe (Fundamental, L = λ/4)</span>
 <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-1 rounded border border-rose-500/20">Odd only</span>
          </div>
          <svg viewBox="0 0 180 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Closed pipe body */}
            <line x1="20" y1="15" x2="150" y2="15" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="65" x2="150" y2="65" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="15" x2="20" y2="65" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" /> {/* Closed wall */}
            
            {/* Standing wave path */}
            <path d="M 20 40 Q 85 15, 150 15" fill="none" stroke="#fb923c" strokeWidth="2" />
            <path d="M 20 40 Q 85 65, 150 65" fill="none" stroke="#fb923c" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="3,2" />
            
            {/* Label nodes */}
            <circle cx="20" cy="40" r="3.5" fill="#f87171" />
            <text x="26" y="43" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="bold">N</text>
            <text x="145" y="43" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">A</text>
            
            <text x="85" y="52" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="middle">f<sub>1</sub> = v / 4L</text>
          </svg>
        </div>

        {/* Open organ pipe */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
 <span className="text-[12px] font-bold text-cyan-400">Open Pipe (Fundamental, L = λ/2)</span>
 <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded border border-emerald-500/20">All integers</span>
          </div>
          <svg viewBox="0 0 180 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Open pipe body */}
            <line x1="20" y1="15" x2="150" y2="15" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="20" y1="65" x2="150" y2="65" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.3" />
            
            {/* Standing wave path */}
            <path d="M 20 15 Q 85 40, 150 15" fill="none" stroke="#22d3ee" strokeWidth="2" />
            <path d="M 20 65 Q 85 40, 150 65" fill="none" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="3,2" />
            
            {/* Label nodes */}
            <circle cx="85" cy="40" r="3.5" fill="#f87171" />
            <text x="85" y="52" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">N</text>
            <text x="24" y="43" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">A</text>
            <text x="145" y="43" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">A</text>
            
            <text x="85" y="27" fill="#ffffff" fillOpacity="0.4" fontSize="7.5" fontFamily="monospace" textAnchor="middle">f<sub>1</sub> = v / 2L</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 5: DOPPLER EFFECT WAVEFRONTS ──────────────────────────────────
function DopplerEffectSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Doppler Effect Wavefront Compression (Source moving Right)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 140 }}>
        {/* Source position (moving right) */}
        <circle cx="210" cy="70" r="4" fill="#f87171" />
        <line x1="210" y1="70" x2="235" y2="70" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#darr)" />
        <text x="210" y="60" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">Source (v<sub>s</sub>)</text>

        {/* Compressed Wavefronts on Right */}
        <circle cx="160" cy="70" r="30" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="180" cy="70" r="20" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.8" />
        <circle cx="195" cy="70" r="10" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.8" />

        {/* Expanded Wavefronts on Left */}
        <circle cx="130" cy="70" r="50" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.3" />
        <circle cx="90" cy="70" r="80" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeOpacity="0.15" />

        {/* Listeners */}
        <circle cx="30" cy="70" r="6" fill="#a78bfa" />
        <text x="30" y="87" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Observer A (Receding)</text>
        <text x="30" y="58" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">' = f [v/(v+v<sub>s</sub>)]</text>
        
        <circle cx="310" cy="70" r="6" fill="#34d399" />
        <text x="310" y="87" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">Observer B (Approaching)</text>
        <text x="310" y="58" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle">f'f = f [v/(v-v<sub>s</sub>)]</text>
        
        <defs>
          <marker id="darr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill="#f87171" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function LongitudinalWaveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1.1 — Longitudinal Wave (Compressions &amp; Rarefactions)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Baseline axes */}
        <line x1="20" y1="90" x2="320" y2="90" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
        
        {/* Compressions and Rarefactions representation using vertical line density */}
        {(() => {
          const lines = [];
          for (let i = 20; i <= 320; i += 3) {
            const phase = (i - 20) * (2 * Math.PI / 120); // 120 wavelength
            const shift = 8 * Math.sin(phase);
            const x = i + shift;
            lines.push(
              <line key={i} x1={x} y1="30" x2={x} y2="80" stroke="#22d3ee" strokeWidth="1" strokeOpacity={0.4 + 0.5 * Math.sin(phase + Math.PI/2)} />
            );
          }
          return lines;
        })()}

        {/* Labels for Compressions & Rarefactions */}
        <text x="50" y="20" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Compression</text>
        <text x="50" y="27" fill="#ffffff" fillOpacity="0.4" fontSize="6.5" fontFamily="monospace" textAnchor="middle">(High P, High &rho;)</text>
        
        <text x="110" y="20" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Rarefaction</text>
        <text x="110" y="27" fill="#ffffff" fillOpacity="0.4" fontSize="6.5" fontFamily="monospace" textAnchor="middle">(Low P, Low &rho;)</text>

        <text x="170" y="20" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Compression</text>
        <text x="230" y="20" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Rarefaction</text>
        <text x="290" y="20" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Compression</text>

        {/* Wavelength bracket between Compressions */}
        <line x1="50" y1="105" x2="170" y2="105" stroke="#34d399" strokeWidth="1" />
        <line x1="50" y1="102" x2="50" y2="108" stroke="#34d399" strokeWidth="1" />
        <line x1="170" y1="102" x2="170" y2="108" stroke="#34d399" strokeWidth="1" />
        <text x="110" y="115" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">Wavelength (&lambda;)</text>

        {/* Oscillation directions indicators */}
        <text x="20" y="100" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">Wave direction &rarr;</text>
        <text x="260" y="100" fill="#ffffff" fillOpacity="0.4" fontSize="7" fontFamily="monospace">Particle oscillation &harr;</text>
      </svg>
    </div>
  );
}

function BeatsEnvelopeSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5.1 — Beats Resultant Wave Envelope (Waxing &amp; Waning)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 120 }}>
        {/* Center line */}
        <line x1="10" y1="60" x2="330" y2="60" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
        
        {/* Upper and Lower Envelopes (dashed) */}
        {(() => {
          let pathUp = "M 10 95";
          let pathDown = "M 10 25";
          for (let x = 10; x <= 330; x += 2) {
            const env = 35 * Math.abs(Math.sin((x - 10) * Math.PI / 160));
            pathUp += ` L ${x} ${60 + env}`;
            pathDown += ` L ${x} ${60 - env}`;
          }
          return (
            <>
              <path d={pathUp} fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.6" />
              <path d={pathDown} fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.6" />
            </>
          );
        })()}

        {/* Superposed high-frequency carrier wave inside envelope */}
        {(() => {
          let pathWave = "M 10 60";
          for (let x = 10; x <= 330; x += 1) {
            const env = 35 * Math.abs(Math.sin((x - 10) * Math.PI / 160));
            const y = 60 + env * Math.sin((x - 10) * 2 * Math.PI / 10);
            pathWave += ` L ${x} ${y}`;
          }
          return <path d={pathWave} fill="none" stroke="#22d3ee" strokeWidth="1.2" />;
        })()}

        {/* Labels */}
        <text x="90" y="16" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Waxing (Loud)</text>
        <text x="170" y="16" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Waning (Silent)</text>
        <text x="250" y="16" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Waxing (Loud)</text>

        {/* Beat period bracket */}
        <line x1="90" y1="108" x2="250" y2="108" stroke="#34d399" strokeWidth="0.8" />
        <line x1="90" y1="105" x2="90" y2="111" stroke="#34d399" strokeWidth="0.8" />
        <line x1="250" y1="105" x2="250" y2="111" stroke="#34d399" strokeWidth="0.8" />
        <text x="170" y="117" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">Beat Period T<sub>b</sub> = 1 / (f<sub>1</sub> &minus; f<sub>2</sub>)</text>
      </svg>
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
        <p className="text-white/55 text-[13px] leading-relaxed mt-3 pt-3 border-t border-white/5">
          {detail}
        </p>
      )}
    </button>
  );
}

export function WavesLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'wave_speed' | 'harmonics' | 'doppler' | 'reflection'>('wave_speed');
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
              Waves (Mechanical)
            </h1>
            <p className="text-[12px] text-rose-400/80 font-semibold tracking-wide mt-1.5">
              High yield topic featuring organ pipes, beats, and Doppler frequency shifts
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'IAT Priority', value: 'High' },
              { label: 'Difficulty', value: '4 / 5' },
              { label: 'Expected Questions', value: '1-2 / year' },
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
              'Transverse vs Longitudinal wave parameters',
              'Generalized wave equation and path/phase differences',
              'Travelling speeds in strings, rods, and Newton-Laplace corrections',
              'Reflection boundary conditions (fixed end π shift vs open end 0)',
              'Standing waves anatomy (nodes, antinodes, loop properties)',
              'Harmonics in stretched strings, open, and closed organ pipes',
              'Beat frequency and tuning fork waxing/filing calculations',
              'Doppler effect relative velocity frequency shifts',
              'Damped & Forced oscillations with resonance conditions'
            ].map(item => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: CORE CLASSIFICATION & PROGRESSIVE EQUATION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Wave Classification &amp; Progressive Equations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Mechanical waves require a material medium to propagate. The particles of the medium oscillate about their mean position, transferring energy and momentum without any bulk transfer of matter.
        </p>
        <ProgressiveWaveSVG />
        <LongitudinalWaveSVG />

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[400px]">
            <thead>
 <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Property</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Transverse Waves</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-bold uppercase">Longitudinal Waves</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Particle Displacement', 'Perpendicular to wave propagation (⊥)', 'Parallel to wave propagation (∥)'],
                ['Propagating Media', 'Solids and liquid surfaces only (requires shear elasticity)', 'Solids, liquids, and gases (requires volume elasticity)'],
                ['Pressure / Density Shifts', 'No pressure changes in the bulk medium', 'Pressure and density variations (compressions & rarefactions)'],
                ['Polarization', 'Can be polarized', 'Cannot be polarized (sound waves)'],
              ].map(([prop, tr, lo]) => (
 <tr key={prop as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{prop as string}</td>
                  <td className="px-4 py-3 text-cyan-300">{tr as string}</td>
                  <td className="px-4 py-3 text-emerald-300">{lo as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="v = &lambda; f = &omega; / k"
            use="Universal Progressive Wave Speed"
            label="Relates wave propagation velocity, frequency, and wavelength"
            priority={5}
          />
          <PremiumFormulaCard
            formula="y(x,t) = A sin(kx &mp; &omega;t + &phi;)"
            use="Progressive Wave Displacement"
            label="k = 2&pi;/&lambda; (wave number), &omega; = 2&pi;f. Use &minus; for +x direction, + for &minus;x direction."
            priority={5}
          />
          <PremiumFormulaCard
            formula="v<sub>p</sub> = &minus;v<sub>wave</sub> &middot; (&part;y/&part;x)"
            use="Particle Velocity vs Wave Velocity"
            label="&part;y/&part;x is the wave slope. Particle velocity is variable; wave velocity v is constant."
            priority={5}
          />
        </div>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-wider block">📝 Worked Example: Particle Velocity Application</span>
          <p className="text-white/70 leading-relaxed">
            <strong>Problem:</strong> A wave equation is given by <code>y(x,t) = 0.02 sin(10πx - 50πt)</code> (SI units). Find the velocity of the particle at <code>x = 0.1 m</code> at time <code>t = 0.2 s</code>.
            <br /><strong>Solution:</strong>
            <br />1. The particle velocity is the partial derivative of displacement with respect to time:
            <br />&nbsp;&nbsp;&nbsp;<code>v<sub>p</sub> = ∂y/∂t = 0.02 * (-50π) * cos(10πx - 50πt) = -π cos(10πx - 50πt)</code>.
            <br />2. Substitute the values <code>x = 0.1</code> and <code>t = 0.2</code>:
            <br />&nbsp;&nbsp;&nbsp;Phase angle <code>θ = 10π(0.1) - 50π(0.2) = π - 10π = -9π</code>.
            <br />3. Calculate the cosine value:
            <br />&nbsp;&nbsp;&nbsp;<code>cos(-9π) = cos(9π) = -1</code> (since 9 is an odd integer of π).
            <br />4. Substitute back into the expression:
            <br />&nbsp;&nbsp;&nbsp;<code>v<sub>p</sub> = -π * (-1) = π m/s &approx; 3.14 m/s</code>.
          </p>
        </div>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">📐 Phase vs Path Difference</span>
          <p className="text-white/70">A path difference of <code>&Delta;x</code> between two points corresponds to a phase difference of <code>&Delta;&phi;</code>:</p>
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-cyan-300 font-bold text-center">
            &Delta;&phi; = (2π / λ) * &Delta;x
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider">Directional Sign Trap</span>
          </div>
 <p className="text-white/65 text-[13px] leading-relaxed">
            Check the sign of <code>kx</code> and <code>&omega;t</code>:
            <br />&bull; If they have <strong className="text-white">opposite signs</strong> (e.g., <code>kx - &omega;t</code> or <code>-kx + &omega;t</code>), the wave moves in the <strong className="text-cyan-300">+x direction</strong>.
            <br />&bull; If they have the <strong className="text-white">same sign</strong> (e.g., <code>kx + &omega;t</code> or <code>-kx - &omega;t</code>), the wave moves in the <strong className="text-rose-400">-x direction</strong>.
          </p>
        </div>
      </div>

      {/* PART 2: SPEED OF TRAVELLING WAVES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Speed of Travelling Waves</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Wave speed (v) is a property of the medium, determined entirely by its inertial (density) and elastic (tension, Young or Bulk modulus) properties.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[480px]">
            <thead>
 <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Medium Type</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Wave Type</th>
                <th className="text-center px-4 py-3 text-emerald-400 font-bold uppercase">Speed Formula (v)</th>
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Terms</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Stretched String', 'Transverse', '√(T / μ)', 'T = tension (N), μ = mass per unit length (kg/m)'],
                ['Solid Rod', 'Longitudinal', '√(Y / ρ)', 'Y = Young\'s Modulus (Pa), ρ = density (kg/m³)'],
                ['Fluid / Gas (Newton)', 'Longitudinal', '√(B / ρ) or √(P / ρ)', 'B = Bulk Modulus, P = pressure, ρ = density'],
                ['Gas (Laplace corrected)', 'Longitudinal', '√(γP / ρ) = √(γRT / M)', 'γ = adiabatic ratio, M = molar mass (kg/mol)'],
              ].map(([med, wav, form, terms]) => (
 <tr key={med as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{med as string}</td>
                  <td className="px-4 py-3 text-cyan-300">{wav as string}</td>
                  <td className="px-4 py-3 text-emerald-300 text-center font-bold">{form as string}</td>
                  <td className="px-4 py-3 text-white/50 text-[12px]">{terms as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InsightCard>
          <strong>Wave Speed Independence:</strong> Mechanical wave speed on a string or in a gas is determined solely by the properties of the medium (tension, linear density, pressure, temperature). It is <strong>completely independent</strong> of the wave&apos;s amplitude, frequency, or wavelength. Changing frequency only changes the wavelength so that their product <code>v = f &lambda;</code> remains constant!
        </InsightCard>

        <div className="grid sm:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="v = &radic;(T / &mu;)"
            use="Transverse String Wave Speed"
            label="T: tension in the string (N), &mu;: mass per unit length (kg/m)"
            priority={5}
          />
          <PremiumFormulaCard
            formula="v = &radic;(&gamma;P / &rho;) = &radic;(&gamma;RT / M)"
            use="Longitudinal Sound Speed in Gas (Newton-Laplace)"
            label="&gamma;: adiabatic index, P: pressure, &rho;: density, R: gas constant, T: absolute temp, M: molar mass"
            priority={5}
          />
          <PremiumFormulaCard
            formula="P<sub>avg</sub> = &frac12;&mu; v A&sup2;&omega;&sup2;"
            use="Average Power Transmitted by String Wave"
            label="Power is proportional to the square of amplitude (A&sup2;) and frequency (&omega;&sup2;)."
            priority={5}
          />
        </div>

        <TrapCard title="Newton-Laplace Correction - IAT Favorite">
          Newton assumed sound propagation in gas is an <strong>isothermal process</strong> (yielding <code>v = √(P/ρ)</code>). This gave a sound speed of 280 m/s in air, far below the experimental 332 m/s.
          <br /><strong>Laplace</strong> corrected this, recognizing that compressions and rarefactions happen too rapidly for heat exchange, making it an <strong>adiabatic process</strong>.
          <br />The correct formula is <code className="text-rose-400">v = √(γP/ρ) = √(γRT/M)</code>, which matches experimental values exactly.
        </TrapCard>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">🔊 Sound Intensity &amp; Decibel Scale (β)</span>
 <p className="text-white/70 leading-relaxed">
            Intensity (I) is the average power passing normally per unit area: <code>I = P<sub>avg</sub> / Area</code>.
            <br />&bull; <strong>Point Source:</strong> Emits spherical waves. Intensity decreases as inverse-square distance: <code className="text-cyan-300">I ∝ 1/r²</code> (amplitude <code>A ∝ 1/r</code>).
            <br />&bull; <strong>Line Source:</strong> Emits cylindrical waves. Intensity decreases as inverse distance: <code className="text-cyan-300">I ∝ 1/r</code> (amplitude <code>A ∝ 1/√r</code>).
            <br />The loudness level in decibels (dB) is defined relative to the reference threshold of hearing (<code>I<sub>0</sub> = 10⁻¹² W/m²</code>):
            <br /><code className="text-emerald-400 font-bold">β = 10 log₁₀(I / I<sub>0</sub>)</code>
          </p>
        </div>
      </div>

      {/* PART 3: PRINCIPLE OF SUPERPOSITION & REFLECTION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Principle of Superposition &amp; Boundary Reflection</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          When multiple waves overlap, the resultant displacement at any point is the algebraic sum of the individual displacements: <code>y<sub>res</sub> = y<sub>1</sub> + y<sub>2</sub> + ... + y<sub>n</sub></code>.
        </p>
        <BoundaryReflectionSVG />

 <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 text-[13px]">
          <p className="text-white"><strong className="text-rose-400 font-bold">1. Fixed End Inversion:</strong> A wave reflecting off a rigid wall undergoes a phase shift of <code className="text-rose-300">π radians (180°)</code>. The reflected displacement flips sign.</p>
          <p className="text-white/50 pl-3">If <code>y<sub>i</sub> = A sin(kx - ωt)</code>, then <code>y<sub>r</sub> = -A sin(kx + ωt)</code>.</p>
          <p className="text-white mt-3"><strong className="text-cyan-400 font-bold">2. Free End Reflection:</strong> A wave reflecting off an open boundary (free ring) experiences <code className="text-cyan-300">zero phase shift (0°)</code>. The reflected displacement remains upright.</p>
          <p className="text-white/50 pl-3">If <code>y<sub>i</sub> = A sin(kx - ωt)</code>, then <code>y<sub>r</sub> = A sin(kx + ωt)</code>.</p>
          
          <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-[12.5px] font-sans text-white/60">
 <p className="text-white font-semibold text-[13px] uppercase text-cyan-400">⚖️ Boundary Density Classification:</p>
            <p>&bull; <strong>Reflection from Denser Medium:</strong> Acts as a <strong>Fixed End</strong> support. The boundary cannot oscillate, yielding a phase change of <code className="text-rose-300 font-mono">&pi;</code> (inversion).</p>
            <p>&bull; <strong>Reflection from Rarer Medium:</strong> Acts as a <strong>Free End</strong> support. The boundary oscillates with maximum amplitude, yielding a phase change of <code className="text-cyan-300 font-mono">0</code> (no inversion).</p>
          </div>
        </div>
      </div>

      {/* PART 4: STANDING WAVES & HARMONICS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Standing Waves &amp; Organ Pipe Harmonics</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Standing waves are formed by the superposition of two progressive waves of the same frequency and amplitude travelling in opposite directions.
        </p>
        <StandingWaveSVG />

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">🎓 Derivation of Standing Wave Equation</span>
          <p className="text-white/70 leading-relaxed">
            Consider an incident wave travelling along the +x direction: 
            <br /><code>y<sub>1</sub> = A sin(kx - ωt)</code>.
            <br />Upon reflection from a fixed boundary at x=0, the wave undergoes a π phase shift and travels along the -x direction: 
            <br /><code>y<sub>2</sub> = -A sin(kx + ωt)</code>.
            <br />By the Principle of Superposition:
            <br /><code>y = y<sub>1</sub> + y<sub>2</sub> = A sin(kx - ωt) - A sin(kx + ωt)</code>.
            <br />Using the identity <code>sin(A - B) - sin(A + B) = -2 cos(A) sin(B)</code>:
            <br /><code className="text-cyan-300 font-bold">y(x,t) = [2A sin(kx)] cos(ωt)</code>.
            <br />The amplitude of the standing wave is space-dependent: <code>A<sub>standing</sub>(x) = 2A sin(kx)</code>.
            <br />&bull; <strong>Nodes</strong> occur where <code>sin(kx) = 0 &rArr; kx = nπ &rArr; x = nλ/2</code> (displacement is always zero).
            <br />&bull; <strong>Antinodes</strong> occur where <code>sin(kx) = &plusmn;1 &rArr; kx = (n + 1/2)π &rArr; x = (n + 1/2)λ/2</code> (displacement oscillates with max amplitude 2A).
          </p>
        </div>

        <PipeHarmonicsSVG />

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[480px]">
            <thead>
 <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Oscillating System</th>
                <th className="text-center px-4 py-3 text-cyan-400 font-bold uppercase">Fundamental Frequency (f<sub>1</sub>)</th>
                <th className="text-center px-4 py-3 text-emerald-400 font-bold uppercase">Harmonics Present</th>
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Ratio</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Stretched String (Fixed ends)', 'v / 2L', 'All integer harmonics (1f<sub>1</sub>, 2f<sub>1</sub>, 3f<sub>1</sub>, ...)', '1 : 2 : 3 : 4'],
                ['Open Organ Pipe', 'v / 2L', 'All integer harmonics (1f<sub>1</sub>, 2f<sub>1</sub>, 3f<sub>1</sub>, ...)', '1 : 2 : 3 : 4'],
                ['Closed Organ Pipe', 'v / 4L', 'Odd harmonics only (1f<sub>1</sub>, 3f<sub>1</sub>, 5f<sub>1</sub>, ...)', '1 : 3 : 5 : 7'],
              ].map(([sys, fund, harm, rat]) => (
 <tr key={sys as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{sys as string}</td>
                  <td className="px-4 py-3 text-cyan-300 text-center font-bold">{fund as string}</td>
                  <td className="px-4 py-3 text-emerald-300 text-center text-[12px]">{harm as string}</td>
                  <td className="px-4 py-3 text-white/50">{rat as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InsightCard>
          <strong>Standing Wave Node Rules:</strong>
          <br />&bull; Distance between two consecutive nodes (or two antinodes) is <code>λ/2</code>.
          <br />&bull; Distance between a node and its adjacent antinode is <code>λ/4</code>.
          <br />&bull; All particles within a single loop (between two adjacent nodes) oscillate in the same phase. Particles in adjacent loops are 180° (π) out of phase.
        </InsightCard>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-amber-400 uppercase tracking-wider block">📐 Organ Pipe End Correction (e)</span>
          <p className="text-white/70 leading-relaxed">
            The antinodes at the open ends of a pipe do not form exactly at the open boundary, but slightly outside it.
            <br />End correction is given by: <code>e &approx; 0.6r</code>, where <code>r</code> is the inner radius of the pipe.
            <br />&bull; <strong>Closed Organ Pipe</strong> (one open end): 
            <br />&nbsp;&nbsp;&nbsp;Effective length: <code>L<sub>eff</sub> = L + e = L + 0.6r</code>.
            <br />&nbsp;&nbsp;&nbsp;Fundamental frequency: <code className="text-amber-300">f<sub>1</sub> = v / [4(L + 0.6r)]</code>.
            <br />&bull; <strong>Open Organ Pipe</strong> (two open ends): 
            <br />&nbsp;&nbsp;&nbsp;Effective length: <code>L<sub>eff</sub> = L + 2e = L + 1.2r</code>.
            <br />&nbsp;&nbsp;&nbsp;Fundamental frequency: <code className="text-amber-300">f<sub>1</sub> = v / [2(L + 1.2r)]</code>.
          </p>
        </div>
      </div>

      {/* PART 5: BEATS & DOPPLER EFFECT */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Beats &amp; Doppler Effect</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Beats occur when two sound waves of slightly different frequencies superpose, creating a periodic variation in sound intensity.
        </p>

        <BeatsEnvelopeSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="f<sub>beats</sub> = |f<sub>1</sub> - f<sub>2</sub>|"
            use="Calculate beat frequency (beats per second)"
            label="For the human ear to distinguish distinct beats, the difference must be less than 10 Hz due to persistence of hearing."
            priority={5}
          />
          <PremiumFormulaCard
            formula="f' = f * [ (v &plusmn; v<sub>o</sub>) / (v &mp; v<sub>s</sub>) ]"
            use="Apparent frequency due to relative motion (Doppler Effect) [Extra &mdash; Beyond Syllabus]"
            label="v = speed of sound, v<sub>o</sub> = velocity of observer, v<sub>s</sub> = velocity of source. Upper signs for approaching, lower signs for receding."
            priority={5}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag color="violet">Extra (Beyond Syllabus)</Tag>
 <span className="text-[11px] text-white/30">Doppler effect visual reference</span>
          </div>
          <DopplerEffectSVG />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase">🎵 Tuning Fork Waxing vs Filing</span>
 <ul className="text-[13px] text-white/70 space-y-2">
              <li>• <strong className="text-white">Waxing (Adding mass)</strong>:
                <br />Adding wax increases the mass of the tines. This decreases the frequency: <code className="text-rose-400 font-bold">f decreases</code>.
              </li>
              <li>• <strong className="text-white">Filing (Removing mass)</strong>:
                <br />Filing the tines removes mass. This increases the frequency: <code className="text-emerald-400 font-bold">f increases</code>.
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase">⚡ Doppler Sign Convention Trick [Extra &mdash; Beyond Syllabus]</span>
 <p className="text-white/70 text-[13px] leading-relaxed">
              The two formula formats are completely equivalent. The general vector formula is:
              <br /><code className="text-violet-300">f' = f * [(v - v<sub>o</sub>) / (v - v<sub>s</sub>)]</code>
              <br />To apply this, draw a vector from <strong>Source (S) to Observer (O)</strong>. This direction is <strong>positive (+)</strong>.
              <br />&bull; If Observer moves towards Source (opposite to S&rarr;O): <code>v<sub>o</sub></code> is negative, so numerator becomes <code>v - (-v<sub>o</sub>) = v + v<sub>o</sub></code>.
              <br />&bull; If Source moves towards Observer (along S&rarr;O): <code>v<sub>s</sub></code> is positive, so denominator becomes <code>v - (+v<sub>s</sub>) = v - v<sub>s</sub></code>.
              <br />This yields <code className="text-cyan-300">f' = f * [(v + v<sub>o</sub>) / (v - v<sub>s</sub>)]</code> for the approaching case.
            </p>
          </div>
        </div>
      </div>

      {/* APPENDIX — BEYOND SYLLABUS: DAMPED & FORCED RESONANCE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18]/80 border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/60 text-[11px] font-bold">APPENDIX</span>
          <h2 className="text-white font-display font-bold text-[16px]">Extra (Beyond Syllabus) &mdash; Damped &amp; Forced Resonance</h2>
        </div>
        <p className="text-white/50 text-[12.5px] leading-relaxed">
          When a system oscillates under an external periodic force, the oscillations are forced. The system eventually oscillates with the frequency of the external force.
        </p>

 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[13px] text-white/70">
          <p><strong className="text-white">Resonance Condition:</strong> When the driving frequency <code>&omega;<sub>d</sub></code> is equal to the natural frequency <code>&omega;</code> of the system, the energy transfer is maximum, and the amplitude of oscillation becomes extremely large.</p>
          <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl text-center text-cyan-300 font-bold">
            Resonance: &omega;<sub>d</sub> = &omega; &rArr; A = Maximum
          </div>
        </div>
      </div>

      {/* PART 7: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0"><BookOpen className="w-5 h-5" /></span>
 <h3 className="text-white font-display font-bold text-[17px] sm:text-lg tracking-wide uppercase">Solved Numerical Examples</h3>
        </div>

        {/* Example 1: Beats & Tuning Fork */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 1: Beats &amp; Tuning Fork Tuning</span>
            <p className="text-white/80 leading-relaxed">
              Tuning fork A of frequency 324 Hz produces 6 beats per second when sounded with another tuning fork B. When B is loaded with a little wax, the beat frequency becomes 4 beats per second. Find the original frequency of B.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Determine possible frequencies:</strong>
              <br />'s frequency is:
              <br />&nbsp;&nbsp;&nbsp;<code>f<sub>B</sub> = f<sub>A</sub> &plusmn; 6 = 324 &plusmn; 6 &rArr; f<sub>B</sub> = 330 Hz</code> or <code>318 Hz</code>.
            </p>
            <p>
              2. <strong className="text-white">Analyze the effect of loading with wax:</strong>
              <br />&nbsp;&nbsp;&nbsp;Loading fork B with wax increases its mass, which decreases B\'s frequency: <code>f<sub>B</sub>\' &lt; f<sub>B</sub></code>.
            </p>
            <p>
              3. <strong className="text-white">Check both cases:</strong>
              <br />&nbsp;&nbsp;&nbsp;&bull; If <code>f<sub>B</sub> = 330 Hz</code>: Decreasing B\'s frequency (say, to 328 Hz) brings it closer to A (324 Hz). The beats would decrease: <code>|328 - 324| = 4 Hz</code>. This matches the problem statement (beats decreased to 4)!
              <br />&nbsp;&nbsp;&nbsp;&bull; If <code>f<sub>B</sub> = 318 Hz</code>: Decreasing B\'s frequency (say, to 316 Hz) moves it further away from A (324 Hz). The beats would increase: <code>|316 - 324| = 8 Hz</code> (mismatch).
            </p>
            <p>
              4. <strong className="text-white">Conclusion:</strong>
              <br />&nbsp;&nbsp;&nbsp;The original frequency of tuning fork B is <code className="text-cyan-300">330 Hz</code>.
            </p>
          </div>
        </div>

        {/* Example 2: Organ Pipe Harmonics */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 2: Pipe Resonance Frequency Matching</span>
            <p className="text-white/80 leading-relaxed">
              A closed organ pipe of length 50 cm and an open organ pipe of length L produce their fundamental frequencies in unison. If the speed of sound is 340 m/s, find the length of the open organ pipe L.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Closed Pipe Fundamental Frequency (f<sub>c</sub>):</strong>
              <br />&nbsp;&nbsp;&nbsp;<code>f<sub>c</sub> = v / 4L<sub>c</sub></code> where <code>L<sub>c</sub> = 50 cm = 0.5 m</code>.
              <br />&nbsp;&nbsp;&nbsp;<code>f<sub>c</sub> = 340 / (4 * 0.5) = 340 / 2 = 170 Hz</code>.
            </p>
            <p>
              2. <strong className="text-white">Open Pipe Fundamental Frequency (f<sub>o</sub>):</strong>
              <br />&nbsp;&nbsp;&nbsp;<code>f<sub>o</sub> = v / 2L<sub>o</sub></code>.
            </p>
            <p>
              3. <strong className="text-white">Set them in unison (f<sub>c</sub> = f<sub>o</sub>):</strong>
              <br />&nbsp;&nbsp;&nbsp;<code>v / 4L<sub>c</sub> = v / 2L<sub>o</sub> &rArr; 2L<sub>o</sub> = 4L<sub>c</sub> &rArr; L<sub>o</sub> = 2 L<sub>c</sub></code>.
              <br />&nbsp;&nbsp;&nbsp;<code>L<sub>o</sub> = 2 * 0.5 m = 1.0 m = 100 cm</code>.
            </p>
            <p>
              4. <strong className="text-white">Conclusion:</strong>
              <br />&nbsp;&nbsp;&nbsp;The length of the open organ pipe is <code className="text-cyan-300">100 cm</code>.
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
            { id: 'wave_speed', label: '⚡ Wave Speed' },
            { id: 'harmonics', label: '🎵 Harmonics' },
            { id: 'doppler', label: '🔊 Doppler Shift' },
            { id: 'reflection', label: '🔁 Boundary Reflection' },
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
          {selectedGoal === 'wave_speed' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-cyan-400 block uppercase">Objective: Calculate wave speed in a medium</span>
              <p className="text-white/70">1. On a stretched string: Use <code>v = &radic;(T / &mu;)</code>.</p>
              <p className="text-white/70">2. Through solids: Use <code>v = &radic;(Y / &rho;)</code>.</p>
              <p className="text-white/70">3. Through gas (Laplace): Use <code>v = &radic;(&gamma;P / &rho;) = &radic;(&gamma;RT / M)</code>.</p>
            </div>
          )}
          {selectedGoal === 'harmonics' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-emerald-400 block uppercase">Objective: Find frequencies in pipes or strings</span>
              <p className="text-white/70">1. Stretched string or Open pipe: <code>f<sub>n</sub> = n &times; (v / 2L)</code> (n = 1, 2, 3...).</p>
              <p className="text-white/70">2. Closed organ pipe: <code>f<sub>n</sub> = (2n - 1) &times; (v / 4L)</code> (n = 1, 2, 3... &mdash; odd harmonics only).</p>
            </div>
          )}
          {selectedGoal === 'doppler' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-violet-400 block uppercase">Objective: Find apparent shifted sound frequencies</span>
              <p className="text-white/70">1. Approaching target: Apparent frequency increases (higher pitch). Numerator adds speed, denominator subtracts.</p>
              <p className="text-white/70">2. Receding target: Apparent frequency decreases (lower pitch).</p>
              <p className="text-white/70">3. Use Source-to-Observer convention trick to avoid signs errors: <code>f&apos; = f &times; (v &plusmn; v<sub>o</sub>) / (v &mp; v<sub>s</sub>)</code>. Put the observer&apos;s motion in numerator, source motion in denominator.</p>
            </div>
          )}
          {selectedGoal === 'reflection' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-amber-400 block uppercase">Objective: Determine reflected wave shape and phase shifts</span>
              <p className="text-white/70">1. Reflection from rigid wall/support: Phase shifts by <code>π (180°)</code>. Wave flips upside down.</p>
              <p className="text-white/70">2. Reflection from open end/free loop: Phase shifts by <code>0°</code>. Wave reflects upright.</p>
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
            { cue: '"Open organ pipe and closed organ pipe in unison"', think: 'Equate fundamental frequencies: v/2L<sub>o</sub>pen = v/4L<sub>c</sub>losed. This means L<sub>o</sub>pen = 2 * L<sub>c</sub>losed.' },
            { cue: '"Tuning fork is loaded with wax / waxed"', think: 'Frequency of the fork decreases. Rerun the beats difference with the lower value.' },
            { cue: '"Tuning fork is filed"', think: 'Frequency of the fork increases. Rerun the beats difference with the higher value.' },
            { cue: '"Moving source towards stationary observer"', think: 'Doppler effect. Apparent frequency increases: f\' = f * [v / (v - v<sub>s</sub>)].' },
            { cue: '"Distance between node and adjacent antinode"', think: 'Set the distance equal to λ/4. Nodes to Nodes is λ/2.' },
            { cue: '"Point source vs line source intensity variations"', think: 'Point source intensity varies as 1/r². Line source intensity varies as 1/r.' }
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
          <TrapCard title="Trap 1: Newton's Sound Speed Assumption">
            Do not use <code>v = √(P/ρ)</code> for sound speed in air unless isothermal conditions are explicitly stated. Standard sound propagation in gas is adiabatic; always use the Laplace corrected version: <code>v = √(γP/ρ)</code>.
          </TrapCard>
          <TrapCard title="Trap 2: Beats limit of human hearing">
            If two sound sources have a frequency difference greater than 10 Hz (e.g. 300 Hz and 312 Hz), beats are still produced physically, but the human ear cannot resolve them due to persistence of hearing.
          </TrapCard>
          <TrapCard title="Trap 3: Closed pipe harmonics are odd integers only">
            For a closed pipe, harmonics are <code>1f<sub>1</sub>, 3f<sub>1</sub>, 5f<sub>1</sub>...</code>. There are NO even harmonics. The 2nd overtone is the 5th harmonic, NOT the 3rd harmonic.
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
            'Transverse (&perp;) vs Longitudinal (&parallel;) classification',
            'Progressive equation: y = A sin(kx &minus; &omega;t) is +x moving; kx + &omega;t is &minus;x moving',
            'Newton-Laplace adiabatic sound speed: v = &radic;(&gamma;P/&rho;) = &radic;(&gamma;RT/M)',
            'Rigid end reflection: phase shift &pi; (flips); Free end: phase shift 0',
            'Nodes are points of zero displacement; Antinodes are max displacement points',
            'Distance: Node-Node = &lambda;/2; Node-Antinode = &lambda;/4',
            'Open pipe fundamental f = v/2L; Closed pipe fundamental f = v/4L',
            'Closed organ pipe only produces ODD harmonics (1, 3, 5...)',
            'Beat frequency = |f1 - f2|; human ear limit is 10 Hz',
            'Doppler effect general [Extra]: f&apos; = f * [(v &plusmn; vo) / (v &mp; vs)]'
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
