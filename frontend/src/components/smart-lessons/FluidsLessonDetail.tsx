import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  ArrowRight, BookOpen, Zap, Eye, TrendingUp, Activity, Brain, Award,
  Copy, Check, ChevronDown, ChevronUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── Sub-Components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, label, color = 'violet' }: { icon: React.ReactNode; label: string; color?: string }) {
  const colors: Record<string, string> = {
    cyan: 'text-cyan-400',
    violet: 'text-violet-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
    indigo: 'text-indigo-400',
    sky: 'text-sky-400',
  };
  return (
    <div className="flex items-center gap-3 pb-1">
      <div className={cn('p-2 rounded-xl bg-white/5 border border-white/10 shrink-0', colors[color])}>
        {icon}
      </div>
 <h3 className="text-white font-display font-bold text-[17px] sm:text-lg tracking-wide uppercase">
        {label}
      </h3>
    </div>
  );
}

function ModuleHeader({
  number, title, difficulty, color = 'violet'
}: {
  number: number;
  title: string;
  difficulty: number;
  color?: string;
}) {
  const bgColors: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
      <div className="flex items-center gap-3">
 <span className={cn('text-xs font-bold px-2.5 py-1 rounded-lg border uppercase shrink-0', bgColors[color])}>
          Module {number}
        </span>
        <h4 className="text-white font-bold text-[14.5px] sm:text-base">{title}</h4>
      </div>
      <div className="flex items-center gap-1.5 text-[13px] text-white/50">
        <span>Difficulty:</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-3.5 h-3.5', i < difficulty ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
    </div>
  );
}

function FrequencyBadge({ stars }: { stars: number }) {
  return (
 <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider">
      <span className="text-white/40">Frequency:</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn('w-2.5 h-2.5', i < stars ? 'text-amber-400 fill-amber-400' : 'text-white/20')} />
        ))}
      </span>
    </div>
  );
}

function FormulaCard({
  formula, use_when, priority, freq_stars, difficulty_stars, color = 'violet', copy_text
}: {
  formula: string;
  use_when: string;
  priority: string;
  freq_stars: number;
  difficulty_stars: number;
  color?: string;
  copy_text: string;
}) {
  const [copied, setCopied] = useState(false);
  const borderColors: Record<string, string> = {
    cyan: 'border-cyan-500/20 hover:border-cyan-400/30',
    violet: 'border-violet-500/20 hover:border-violet-400/30',
    amber: 'border-amber-500/20 hover:border-amber-400/30',
    emerald: 'border-emerald-500/20 hover:border-emerald-400/30',
    rose: 'border-rose-500/20 hover:border-rose-400/30',
  };
  const bgColors: Record<string, string> = {
    cyan: 'bg-cyan-500/[0.03]',
    violet: 'bg-violet-500/[0.03]',
    amber: 'bg-amber-500/[0.03]',
    emerald: 'bg-emerald-500/[0.03]',
    rose: 'bg-rose-500/[0.03]',
  };
  const formulaColors: Record<string, string> = {
    cyan: 'text-cyan-300',
    violet: 'text-violet-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
    rose: 'text-rose-300',
  };
  return (
    <div className={cn('rounded-xl border p-4.5 space-y-3 transition-all duration-200 bg-[#0A0C18]', bgColors[color], borderColors[color])}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 w-full overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10 uppercase">
              Priority: {priority}
            </span>
          </div>
          <div className={cn('font-mono font-bold text-[14.5px] sm:text-base tracking-wide pt-1 whitespace-nowrap', formulaColors[color])}>
            <span dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
          <div className="text-white/85 text-[13px] font-semibold leading-relaxed pt-1"><span dangerouslySetInnerHTML={{ __html: use_when }} /></div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(copy_text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
        <FrequencyBadge stars={freq_stars} />
 <div className="flex items-center gap-1.5 text-[12px] text-white/40">
          <span>DIFFICULTY:</span>
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn('w-2.5 h-2.5', i < difficulty_stars ? 'text-amber-400 fill-amber-400' : 'text-white/20')} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

function SolvedExample({
  number, question, steps, answer, color = 'violet'
}: {
  number: number;
  question: string;
  steps: string[];
  answer: string;
  color?: string;
}) {
  const accentColors: Record<string, string> = {
    violet: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    rose: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
  };
  return (
    <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center gap-3">
 <span className={cn('text-xs font-bold px-2 py-0.5 rounded border uppercase', accentColors[color])}>
          Solved Numerical {number}
        </span>
      </div>
      <div className="text-white font-medium text-[14.5px] leading-relaxed" dangerouslySetInnerHTML={{ __html: question }} />

      <div className="space-y-3 pt-3 border-t border-white/5">
 <h4 className="text-white/40 font-bold text-[13px] uppercase tracking-wider">Step-by-Step Derivation</h4>
        <ol className="space-y-3">
          {steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 text-[13px] leading-relaxed text-white/80">
 <span className="font-bold text-cyan-400 shrink-0">[{idx + 1}]</span>
              <span dangerouslySetInnerHTML={{ __html: step }} />
            </li>
          ))}
        </ol>
      </div>

      <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
 <div className="text-[12px] text-emerald-400 font-bold uppercase tracking-wider">Final Result</div>
          <div className="text-white font-bold text-[14.5px] mt-0.5 font-mono" dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
}

// ─── Extra SVG Diagrams ─────────────────────────────────────────────────────────

function BarometerManometerDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Barometer and open-tube manometer diagram">
      {/* Mercury Barometer */}
      <g transform="translate(10, 0)">
        {/* Trough */}
        <rect x="15" y="110" width="50" height="20" rx="2" fill="#334155" stroke="#475569" strokeWidth="1.5" />
        <rect x="15" y="110" width="50" height="15" fill="#94a3b8" opacity="0.8" />
        
        {/* Barometer tube */}
        <rect x="35" y="20" width="10" height="100" fill="none" stroke="#475569" strokeWidth="1.5" />
        <rect x="35" y="45" width="10" height="75" fill="#94a3b8" />
        <text x="40" y="32" fill="#ffffff40" fontSize="6" textAnchor="middle">Vacuum</text>
        
        {/* Height dimension */}
        <line x1="55" y1="45" x2="55" y2="120" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
        <text x="60" y="85" fill="#f59e0b" fontSize="8">h</text>
        
        <text x="40" y="138" fill="#ffffff60" fontSize="8" textAnchor="middle">Barometer (Patm = &rho;gh)</text>
      </g>
      
      {/* Open-tube Manometer */}
      <g transform="translate(130, 0)">
        {/* Gas Chamber bulb */}
        <circle cx="25" cy="70" r="18" fill="none" stroke="#475569" strokeWidth="1.5" />
        <text x="25" y="73" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Gas (P)</text>
        
        {/* Connection pipe */}
        <rect x="43" y="66" width="15" height="8" fill="none" stroke="#475569" strokeWidth="1.5" />
        
        {/* U-tube */}
        <path d="M 58 40 L 58 100 A 10 10 0 0 0 78 100 L 78 20" fill="none" stroke="#475569" strokeWidth="1.5" />
        
        {/* Manometer Liquid filling */}
        <path d="M 58 80 L 58 100 A 10 10 0 0 0 78 100 L 78 50 L 78 100 A 10 10 0 0 1 58 100 Z" fill="#38bdf8" opacity="0.6" />
        
        {/* Height difference h */}
        <line x1="58" y1="80" x2="88" y2="80" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="78" y1="50" x2="88" y2="50" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="85" y1="50" x2="85" y2="80" stroke="#f59e0b" strokeWidth="1" />
        <polygon points="85,50 82,55 88,55" fill="#f59e0b" />
        <polygon points="85,80 82,75 88,75" fill="#f59e0b" />
        <text x="91" y="68" fill="#fcd34d" fontSize="8">h</text>
        
        <text x="45" y="138" fill="#ffffff60" fontSize="8" textAnchor="middle">Manometer (P - Patm = &rho;gh)</text>
      </g>
    </svg>
  );
}

function VenturimeterDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Venturimeter flow speed measurement diagram">
      {/* Venturi Tube Outline */}
      <path d="M 15 35 L 70 35 Q 90 35 100 55 L 120 55 Q 130 35 150 35 L 225 35 L 225 95 L 150 95 Q 130 95 120 75 L 100 75 Q 90 95 70 95 L 15 95 Z" 
            fill="none" stroke="#475569" strokeWidth="2" />
      
      {/* Liquid stream (shading) */}
      <path d="M 15 35 L 70 35 Q 90 35 100 55 L 120 55 Q 130 35 150 35 L 225 35 L 225 95 L 150 95 Q 130 95 120 75 L 100 75 Q 90 95 70 95 L 15 95 Z" 
            fill="#38bdf8" fillOpacity="0.1" />

      {/* Two vertical tubes */}
      <rect x="45" y="10" width="10" height="25" fill="none" stroke="#475569" strokeWidth="1.5" />
      <rect x="45" y="18" width="10" height="17" fill="#38bdf8" fillOpacity="0.5" />
      <line x1="45" y1="35" x2="55" y2="35" stroke="#38bdf8" strokeWidth="1.5" />
      
      <rect x="105" y="10" width="10" height="45" fill="none" stroke="#475569" strokeWidth="1.5" />
      <rect x="105" y="42" width="10" height="13" fill="#38bdf8" fillOpacity="0.5" />
      <line x1="105" y1="55" x2="115" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
      
      {/* Height difference h */}
      <line x1="55" y1="18" x2="120" y2="18" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="115" y1="42" x2="120" y2="42" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="118" y1="18" x2="118" y2="42" stroke="#f59e0b" strokeWidth="1" />
      <polygon points="118,18 115,23 121,23" fill="#f59e0b" />
      <polygon points="118,42 115,37 121,37" fill="#f59e0b" />
      <text x="123" y="33" fill="#fcd34d" fontSize="8" fontFamily="monospace">h</text>
      
      {/* Flow parameters */}
      <text x="35" y="68" fill="#ffffff80" fontSize="8" fontWeight="bold">A₁, v₁</text>
      <text x="110" y="68" fill="#ffffff" fontSize="7" fontWeight="bold">A₂, v₂</text>
      
      {/* Direction arrow */}
      <line x1="20" y1="65" x2="40" y2="65" stroke="#38bdf8" strokeWidth="1.5" />
      <polygon points="40,65 35,62 35,68" fill="#38bdf8" />
    </svg>
  );
}

function AerofoilDynamicLiftDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Aerofoil dynamic lift and streamlines diagram">
      {/* Aerofoil (Wing) shape */}
      <path d="M 40 70 C 60 45 140 40 200 70 C 140 75 60 80 40 70 Z" fill="#334155" stroke="#64748b" strokeWidth="2" />
      <text x="110" y="65" fill="#ffffff50" fontSize="9" fontWeight="bold" textAnchor="middle">Wing (Aerofoil)</text>
      
      {/* Streamlines above (crowded, high velocity) */}
      <path d="M 20 50 Q 70 20 220 52" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      <path d="M 20 40 Q 70 10 220 42" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="120" y="23" fill="#06b6d4" fontSize="8" fontWeight="bold" textAnchor="middle">v<sub>top</sub> is HIGH (P<sub>top</sub> is LOW)</text>
      
      {/* Streamlines below (sparse, low velocity) */}
      <path d="M 20 90 Q 70 95 220 85" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      <path d="M 20 105 Q 70 115 220 100" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="120" y="115" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">v<sub>bottom</sub> is LOW (P<sub>bottom</sub> is HIGH)</text>
      
      {/* Lift Force Vector */}
      <line x1="120" y1="65" x2="120" y2="25" stroke="#f43f5e" strokeWidth="2.5" />
      <polygon points="120,25 116,33 124,33" fill="#f43f5e" />
      <text x="125" y="32" fill="#fca5a5" fontSize="9" fontWeight="bold">Dynamic Lift</text>
    </svg>
  );
}

function CapillaryRiseDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Capillary rise ascent formula diagram">
      {/* Beaker / Trough */}
      <path d="M 40 50 L 40 120 L 200 120 L 200 50" fill="none" stroke="#475569" strokeWidth="2" />
      <rect x="41" y="80" width="158" height="39" fill="#38bdf8" fillOpacity="0.2" />
      <line x1="40" y1="80" x2="200" y2="80" stroke="#38bdf8" strokeWidth="1.5" />
      
      {/* Capillary Tube */}
      <rect x="110" y="20" width="20" height="100" fill="none" stroke="#475569" strokeWidth="1.5" />
      
      {/* Liquid in tube rising to h */}
      <rect x="111" y="45" width="18" height="74" fill="#38bdf8" fillOpacity="0.4" />
      
      {/* Concave Meniscus */}
      <path d="M 111 45 Q 120 52 129 45" fill="none" stroke="#38bdf8" strokeWidth="2" />
      
      {/* Height dimension h */}
      <line x1="135" y1="45" x2="155" y2="45" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="135" y1="80" x2="155" y2="80" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="150" y1="45" x2="150" y2="80" stroke="#f59e0b" strokeWidth="1" />
      <polygon points="150,45 147,51 153,51" fill="#f59e0b" />
      <polygon points="150,80 147,74 153,74" fill="#f59e0b" />
      <text x="156" y="66" fill="#fcd34d" fontSize="9" fontFamily="monospace">h</text>
      
      {/* Contact angle labels */}
      <line x1="111" y1="45" x2="101" y2="25" stroke="#ffffff" strokeWidth="1" />
      <path d="M 111 45 A 15 15 0 0 0 111 25" fill="none" stroke="#ffffff" strokeWidth="1" />
      <text x="115" y="32" fill="#ffffff" fontSize="7">θ</text>
      
      <text x="120" y="134" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">h = 2S cos&theta; / (&rho;gr)</text>
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function FluidsLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [revealTerminal, setRevealTerminal] = useState(false);
  const [revealCapillary, setRevealCapillary] = useState(false);
  const [revealAtmospheric, setRevealAtmospheric] = useState(false);
  const [revealReynolds, setRevealReynolds] = useState(false);
  const [revealVenturimeter, setRevealVenturimeter] = useState(false);
  const [revealStokes, setRevealStokes] = useState(false);
  const [revealEnergy, setRevealEnergy] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Breadcrumbs Navigation */}
 <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 9 (Fluids)</span>
      </div>

      {/* Subject Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0A0C18] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
 <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-wider">
              Physics Revision Suite
            </span>
 <span className="flex items-center gap-1 text-[12px] text-white/40">
              <Clock className="w-3.5 h-3.5" /> 35 Mins Read
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Mechanical Properties of Fluids</h2>
          <p className="text-white/60 text-[13.5px] leading-relaxed max-w-xl">
            A comprehensive NCERT-aligned syllabus masterclass covering Statics, Dynamics, Bernoulli applications, Viscosity, Surface Energy, and Capillary Ascent.
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0 shrink-0 gap-3">
          <div className="space-y-0.5">
 <div className="text-[11px] text-white/30 uppercase tracking-widest text-right">Unit Progress</div>
            <div className="text-white font-mono font-bold text-xl sm:text-2xl">{progress}% Completed</div>
          </div>
          <div className="w-32 sm:w-40 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* ── SECTION 1: Core Concepts ─────────────────────────────────────────── */}
      <div className="space-y-12">

        {/* Part 1: Fluid Statics vs Dynamics */}
        <div className="space-y-6">
          <ModuleHeader number={1} title="Fluid Statics, Dynamics & Bernoulli Principle" difficulty={3} color="violet" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
            {/* Thrust & Pressure */}
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-2.5">
 <span className="text-[13px] font-bold text-violet-400 uppercase tracking-wider block">1. Foundations of Pressure</span>
              <p className="text-white/70 text-[13px] leading-relaxed">
                A fluid exerts a perpendicular force on any boundary surface. This normal force is called <strong>Thrust</strong>.
                <strong>Pressure (P)</strong> is defined as the thrust per unit area:
              </p>
 <div className="text-violet-300 text-[13px] bg-black/20 p-2.5 rounded text-center">
                P = dF_perp / dA &nbsp; [SI Unit: Pascal (Pa) = N/m² | Dimensions: M L&supminus;&sup1; T&supminus;&sup2;]
              </div>
              <p className="text-white/70 text-[13px] leading-relaxed">
                <strong>Isotropic Nature:</strong> In a fluid at rest, pressure at a point is <strong>independent of direction</strong> (same in all directions). 
                <strong>Pascal's Law:</strong> Pressure applied to any part of an enclosed fluid is transmitted undiminished to every other part and to the walls of the container. 
                Applications include the <em>hydraulic lift</em>, <em>hydraulic brakes</em>, and <em>hydraulic press</em>.
              </p>
            </div>

            {/* Gauge vs. Absolute & Atmospheric Pressure */}
            <div className="text-white/80 text-[13px] leading-relaxed space-y-3">
              <p>
                <strong>Absolute Pressure vs. Gauge Pressure:</strong> Absolute pressure (P) is the total real pressure, while Gauge Pressure (P<sub>gauge</sub>) is the pressure relative to local atmospheric pressure:
              </p>
 <div className="my-2 bg-[#05060F] p-3 rounded-xl border border-white/5 text-center text-[12.5px] text-cyan-300">
                P<sub>absolute</sub> = P<sub>atm</sub> + P<sub>gauge</sub> &nbsp; &rarr; &nbsp; P = P<sub>atm</sub> + &rho;gh
              </div>
              <p>
                Standard atmospheric pressure is <code className="text-cyan-300">P<sub>atm</sub> = 1.013 &times; 10⁵ Pa</code> (equal to 1.013 bar, 760 torr, or 760 mm of mercury).
              </p>
            </div>

            {/* Measuring Instruments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                <BarometerManometerDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                  Figure 1.1: Torricelli Barometer &amp; Open-tube Manometer Setup
                </div>
              </div>
              <div className="space-y-3 justify-center flex flex-col">
                <button
                  onClick={() => setRevealAtmospheric(!revealAtmospheric)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-violet-400"
                >
                  <span>🔬 How do Barometers &amp; Manometers work?</span>
                  {revealAtmospheric ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {revealAtmospheric && (
                  <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 text-[12.5px] text-white/70 leading-relaxed space-y-2">
                    <p>
                      <strong>Mercury Barometer:</strong> A long tube closed at one end is filled with mercury and inverted into a trough. The mercury column drops until the hydrostatic pressure at its base ({"P = &rho;<sub>Hg</sub> g h"}) balances the external atmospheric pressure {"P<sub>atm</sub>"}.
                    </p>
                    <p>
                      <strong>Open-Tube Manometer:</strong> A U-tube containing a liquid of density &rho;. One arm is connected to the gas container, and the other is open to the atmosphere. The pressure difference is measured by the height difference <i>h</i>: {"P &minus; P<sub>atm</sub> = &rho; g h"}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Statics vs Dynamics Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
 <tr className="border-b border-white/5 text-white/40">
                    <th className="py-2.5">Feature</th>
                    <th className="py-2.5">Fluid Statics</th>
                    <th className="py-2.5">Fluid Dynamics</th>
                  </tr>
                </thead>
 <tbody className="divide-y divide-white/5 text-white/80">
                  <tr>
                    <td className="py-3 font-semibold text-white">Condition</td>
                    <td className="py-3 text-cyan-400">Fluid at rest (v = 0)</td>
                    <td className="py-3 text-violet-400">Fluid in motion (v &gt; 0)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-white">Primary Focus</td>
                    <td className="py-3 text-cyan-400">Pressure, Buoyancy, Density</td>
                    <td className="py-3 text-violet-400">Flow rates, Velocity, Energy density</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-white">Core Principle</td>
                    <td className="py-3 text-cyan-400">Pascal&apos;s Law / Archimedes Principle</td>
                    <td className="py-3 text-violet-400">Equation of Continuity / Bernoulli</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pascal Piston SVG */}
              <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                <svg width="340" height="150" viewBox="0 0 340 150" className="max-w-full">
                  {/* Fluid container */}
                  <path d="M 50 30 L 50 120 L 290 120 L 290 30" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  <rect x="51.5" y="60" width="237" height="58.5" fill="#3b82f6" fillOpacity="0.15" />
                  
                  {/* Left piston (Small area) */}
                  <line x1="50" y1="60" x2="110" y2="60" stroke="#f43f5e" strokeWidth="4" />
                  <line x1="50" y1="30" x2="50" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
                  <line x1="110" y1="30" x2="110" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
                  
                  <line x1="80" y1="15" x2="80" y2="50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="80" y="10" fill="#fca5a5" fontSize="8" textAnchor="middle">Force F1</text>
                  <text x="80" y="72" fill="#93c5fd" fontSize="8" textAnchor="middle">Area A1</text>

                  {/* Right piston (Large area) */}
                  <line x1="210" y1="60" x2="290" y2="60" stroke="#10b981" strokeWidth="4" />
                  <line x1="210" y1="30" x2="210" y2="60" stroke="#10b981" strokeWidth="1.5" />
                  
                  <line x1="250" y1="50" x2="250" y2="15" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="250" y="10" fill="#a7f3d0" fontSize="8" textAnchor="middle">Force F2 = F1*(A2/A1)</text>
                  <text x="250" y="72" fill="#93c5fd" fontSize="8" textAnchor="middle">Area A2</text>

                  <text x="170" y="100" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">Pascal&apos;s Law: P1 = P2</text>
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                    </marker>
                  </defs>
                </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                  Figure 1.2: Pascal&apos;s Hydraulic Lift Principle
                </div>
              </div>

              {/* Bernoulli Flow SVG */}
              <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                <svg width="340" height="150" viewBox="0 0 340 150" className="max-w-full">
                  {/* Pipe contour */}
                  <path d="M 30 40 L 110 40 Q 150 70 190 70 L 310 70 M 30 110 L 110 110 Q 150 90 190 90 L 310 90" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                  <path d="M 30 40 L 110 40 Q 150 70 190 70 L 310 70 L 310 90 L 190 90 Q 150 90 110 110 L 30 110 Z" fill="#a855f7" fillOpacity="0.1" />

                  {/* Flow streamlines */}
                  <path d="M 40 60 H 110 Q 150 77 190 77 H 300" fill="none" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 40 85 H 110 Q 150 83 190 83 H 300" fill="none" stroke="#c084fc" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Labels */}
                  <text x="65" y="32" fill="#c084fc" fontSize="9" textAnchor="middle">Wide A1</text>
                  <text x="65" y="125" fill="#a5b4fc" fontSize="8" textAnchor="middle">v1: Low | P1: High</text>

                  <text x="250" y="62" fill="#c084fc" fontSize="9" textAnchor="middle">Narrow A2</text>
                  <text x="250" y="105" fill="#a5b4fc" fontSize="8" textAnchor="middle">v2: High | P2: Low</text>
                </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                  Figure 1.3: Bernoulli Flow in Varying Pipe Constriction
                </div>
              </div>
            </div>

            {/* Streamline flow definitions, Continuity Derivation */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3 text-[13px] text-white/80">
 <span className="text-[13.5px] font-bold text-violet-300 uppercase tracking-wider block">2. Streamline Flow &amp; Continuity Derivation</span>
              <p>
                <strong>Streamline:</strong> A curve whose tangent at any point indicates the direction of fluid velocity at that point. Streamlines never cross each other.
                <br />
                <strong>Steady Flow:</strong> A condition where fluid velocity at any given location remains constant over time.
              </p>
 <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-[12.5px] leading-relaxed">
                <strong className="text-violet-400">Continuity Equation Derivation:</strong>
                <br />
                Consider fluid flow through a pipe of changing area. The mass entering in time dt is dm<sub>in</sub> = &rho;₁ A₁ v₁ dt. The mass leaving is dm<sub>out</sub> = &rho;₂ A₂ v₂ dt.
                <br />
                By conservation of mass: dm<sub>in</sub> = dm<sub>out</sub> &rArr; &rho;₁ A₁ v₁ = &rho;₂ A₂ v₂.
                <br />
                For incompressible liquids, density &rho;₁ = &rho;₂, yielding the final relation:
                <br />
                <span className="text-cyan-300 font-bold block text-center mt-1">A₁ * v₁ = A₂ * v₂ = Constant (Volume Flow Rate)</span>
              </div>
            </div>

            {/* Reynolds number and critical velocity */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
 <span className="text-[13px] font-bold text-violet-300 uppercase tracking-wider">3. Critical Velocity &amp; Reynolds Number (Re)</span>
 <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">HIGH WEIGHTAGE</span>
              </div>
              <p className="text-[13px] leading-relaxed text-white/70">
                <strong>Critical Velocity (v<sub>c</sub>):</strong> The maximum velocity up to which fluid flow remains streamline. Beyond this, flow becomes turbulent.
              </p>
 <div className="my-2 bg-[#05060F] p-3 rounded-xl border border-white/5 text-center text-[12.5px] text-cyan-300">
                Re = &rho; &middot; v &middot; d / &eta; &nbsp; &rarr; &nbsp; v<sub>c</sub> = Re &middot; &eta; / (&rho; &middot; d)
              </div>
              <div className="text-[12.5px] leading-relaxed text-white/70 space-y-1 pl-2">
                <p>&bull; <strong>Re &lt; 1000:</strong> Streamline / Laminar Flow.</p>
                <p>&bull; <strong>Re &gt; 2000:</strong> Turbulent Flow (chaotic, characterized by eddies and energy dissipation).</p>
                <p>&bull; <strong>1000 &lt; Re &lt; 2000:</strong> Flow is unstable and transitionary.</p>
              </div>
            </div>

            {/* Bernoulli's Equation Derivation & Limitations */}
            <div className="p-4.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-3 text-[13px] text-white/80">
 <span className="text-[13.5px] font-bold text-violet-300 uppercase tracking-wider block">4. Bernoulli's Principle &amp; Derivation</span>
              <p>
                Bernoulli&apos;s equation is a statement of the <strong>conservation of energy</strong> for an ideal fluid flow.
              </p>
              <button
                onClick={() => setRevealEnergy(!revealEnergy)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[12.5px] text-violet-400"
              >
                <span>📜 View Bernoulli Equation Derivation Summary &amp; Limitations</span>
                {revealEnergy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {revealEnergy && (
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[12.5px] text-white/70 leading-relaxed font-sans space-y-3">
                  <div>
                    <strong className="text-violet-400">Derivation Summary:</strong>
                    <p className="mt-1">
                      Let fluid move through a pipe. Work done by pressure forces at both ends: W = (P₁ - P₂) &middot; &Delta;V.
                      <br />
                      Change in Kinetic Energy: &Delta;K = 0.5 &middot; &Delta;m (v₂&sup2; - v₁&sup2;).
                      <br />
                      Change in Potential Energy: &Delta;U = &Delta;m g (h₂ - h₁).
                      <br />
                      By Work-Energy Theorem (W = &Delta;K + &Delta;U):
                      <br />
                      (P₁ - P₂) &Delta;V = 0.5 &middot; &Delta;m (v₂&sup2; - v₁&sup2;) + &Delta;m g (h₂ - h₁).
                      <br />
                      Divide by volume &Delta;V (noting density &rho; = &Delta;m / &Delta;V):
                      <br />
                      P₁ - P₂ = 0.5 &middot; &rho; v₂&sup2; - 0.5 &middot; &rho; v₁&sup2; + &rho; g h₂ - &rho; g h₁.
                      <br />
                      Rearranging terms gives: <code className="text-cyan-300">P + 0.5&rho;v&sup2; + &rho;gh = Constant</code>.
                    </p>
                  </div>
                  <div>
                    <strong className="text-violet-400">Critical Limitations:</strong>
                    <ul className="list-disc list-inside space-y-1 pl-2 mt-1">
                      <li>Assumes liquid is <strong>non-viscous</strong> (frictionless flow).</li>
                      <li>Assumes liquid is <strong>incompressible</strong> (density remains constant).</li>
                      <li>Assumes flow is <strong>steady</strong> and <strong>irrotational</strong> (no turbulence/swirls).</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bernoulli Applications: Venturimeter, Aerofoil, Magnus */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-4">
 <span className="text-[13px] font-bold text-violet-300 uppercase tracking-wider block">5. Bernoulli Applications in Action</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                  <VenturimeterDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                    Figure 1.4: Venturimeter Flow Measurement
                  </div>
                </div>
                <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                  <AerofoilDynamicLiftDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                    Figure 1.5: Dynamic Lift Aerofoil Streamlines
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setRevealVenturimeter(!revealVenturimeter)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[12.5px] text-violet-400"
                >
                  <span>📝 Explanation of Venturimeter, Dynamic Lift &amp; Magnus Effect</span>
                  {revealVenturimeter ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {revealVenturimeter && (
                  <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 text-[12.5px] text-white/70 leading-relaxed space-y-3 font-sans">
                    <div>
                      <strong>A. Venturimeter:</strong>
                      <p className="mt-0.5">
                        Used to measure flow speed of liquids in a pipe. It consists of a horizontal tube with a narrow constriction (throat). By measuring the height difference h of the liquid columns in the U-tube, flow speed is computed:
                        <br />
                        <code className="text-cyan-300">v₁ = A₂ &middot; &radic;[ 2gh / (A₁&sup2; - A₂&sup2;) ]</code>
                      </p>
                    </div>
                    <div>
                      <strong>B. Airplane Aerofoil (Dynamic Lift):</strong>
                      <p className="mt-0.5">
                        The shape of the wing (aerofoil) forces streamlines to crowd together on the top surface, increasing air velocity: v_top &gt; v_bottom. According to Bernoulli, this creates a low-pressure zone above and a high-pressure zone below, generating net upward <strong>Dynamic Lift</strong>.
                      </p>
                    </div>
                    <div>
                      <strong>C. Magnus Effect (Spinning Ball):</strong>
                      <p className="mt-0.5">
                        A spinning ball drags air boundary layers. On one side, the drag velocity adds to wind velocity, while on the other side it opposes. This asymmetry creates a velocity difference and a corresponding pressure difference, causing the ball to curve or "swing" mid-flight.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Torricelli's Law Derivation Card */}
            <div className="p-5 bg-[#05060F] border border-white/5 rounded-2xl space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
                <Lightbulb className="w-4.5 h-4.5 text-cyan-400" /> Derivation: Torricelli&apos;s Law (Speed of Efflux)
              </h4>
              <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
                <p>
                  Consider a large open tank filled with water of density &rho; to a total height H. A small hole of area a is made on the side wall at a depth h below the water surface. The top surface area of the tank is A (where A &gt;&gt; a).
                </p>
 <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2.5 text-[12px] leading-relaxed">
                  <div>
                    <strong className="text-cyan-400">1. Equation of Continuity:</strong>
                    <br />
                    A &middot; v<sub>surface</sub> = a &middot; v<sub>efflux</sub>  →  v<sub>surface</sub> = (a/A) &middot; v<sub>efflux</sub>.
                    <br />
                    Since A &gt;&gt; a, the term (a/A) &asymp; 0, meaning the falling speed of the top surface is negligible (v<sub>surface</sub> &asymp; 0).
                  </div>
                  <div>
                    <strong className="text-cyan-400">2. Apply Bernoulli&apos;s Equation between surface (1) and hole (2):</strong>
                    <br />
                    P<sub>atm</sub> + &rho;gH + &frac12;&rho;(v<sub>surface</sub>)&sup2; = P<sub>atm</sub> + &rho;g(H - h) + &frac12;&rho;(v<sub>efflux</sub>)&sup2;
                  </div>
                  <div>
                    <strong className="text-cyan-400">3. Cancel P<sub>atm</sub> and substitute v<sub>surface</sub> &asymp; 0:</strong>
                    <br />
                    &rho;gH = &rho;gH - &rho;gh + &frac12;&rho;(v<sub>efflux</sub>)&sup2;  →  &rho;gh = &frac12;&rho;(v<sub>efflux</sub>)&sup2;
                  </div>
                  <div>
                    <strong className="text-cyan-400">4. Solve for Efflux Speed:</strong>
                    <br />
                    v<sub>efflux</sub> = &radic;(2gh)  (Matches the speed of a particle falling freely from height h!)
                  </div>
                </div>
                <p>
                  <strong>Horizontal Range (R):</strong> The water emerging horizontally travels a vertical distance (H - h) to the ground. The time of flight is t = &radic;[2(H - h)/g]. Thus, the horizontal range is:
                  <br />
 <span className="text-cyan-300 block text-center pt-1">R = v<sub>efflux</sub> &middot; t = &radic;(2gh) &middot; &radic;[2(H - h)/g] = 2&radic;(h(H - h))</span>
                </p>
                
                {/* Symmetry Insight block */}
                <div className="bg-[#05060F] p-3 rounded-xl border border-white/5 space-y-1.5">
 <span className="text-[12px] font-bold text-amber-400 tracking-wider block uppercase">💡 IAT Symmetry Insight: Equal Ranges</span>
                  <p className="text-[12px] leading-relaxed text-white/70">
                    The horizontal range formula <code className="text-cyan-300">R = 2&radic;(h(H - h))</code> is mathematically symmetric under exchange of <code className="text-cyan-300">h</code> (depth from top) and <code className="text-cyan-300">H - h</code> (height from bottom).
                  </p>
                  <p className="text-[12px] leading-relaxed text-white/60">
                    This means <strong>two orifices made at complementary positions</strong> (one at depth h₁ = y and another at height y₂ = y from the bottom) will result in the <strong>exact same horizontal range</strong> on the ground!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={1}
              question="An open U-tube contains water. When it is at rest, the water levels in both arms are identical. If the U-tube is accelerated horizontally with a constant acceleration of 4.9 m/s² (g/2), and the distance between the two vertical arms is 10 cm, calculate the difference in water height between the two arms."
              steps={[
                "Under horizontal acceleration, the liquid surface tilts. The angle of tilt θ with the horizontal satisfies: tan θ = a / g.",
                "Given acceleration a = 4.9 m/s² and g = 9.8 m/s²  →  tan θ = 4.9 / 9.8 = 0.5.",
                "Let h be the height difference between the columns and L = 10 cm be the horizontal separation.",
                "From the geometry of the tilted surface: tan θ = h / L.",
                "Substitute values: 0.5 = h / 10  →  h = 0.5 * 10 = 5 cm."
              ]}
              answer="Height Difference = 5 cm"
              color="violet"
            />

            <SolvedExample
              number={2}
              question="A solid cylinder of mass M and density &rho;<sub>object</sub> floats vertically in water of density &rho;<sub>liquid</sub>. If 20% of its volume is submerged, find the ratio of density of water to that of the cylinder."
              steps={[
                "Archimedes Principle states: Buoyancy Force = Weight of liquid displaced.",
                "For a floating object in equilibrium: F<sub>B</sub> = Weight of object  →  V<sub>submerged</sub> * &rho;<sub>liquid</sub> * g = V<sub>total</sub> * &rho;<sub>object</sub> * g.",
                "Cancel g: V<sub>submerged</sub> * &rho;<sub>liquid</sub> = V<sub>total</sub> * &rho;<sub>object</sub>.",
                "We are given that 20% of the volume is submerged: V<sub>submerged</sub> = 0.2 * V<sub>total</sub>.",
                "Substitute: (0.2 * V<sub>total</sub>) * &rho;<sub>liquid</sub> = V<sub>total</sub> * &rho;<sub>object</sub>  →  0.2 * &rho;<sub>liquid</sub> = &rho;<sub>object</sub>.",
                "Calculate ratio &rho;<sub>liquid</sub> / &rho;<sub>object</sub> = 1 / 0.2 = 5."
              ]}
              answer="&rho;<sub>liquid</sub> / &rho;<sub>object</sub> = 5 : 1"
              color="violet"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={3}
              question="A wide open cylindrical tank is filled with water to a height of 5 m. A small orifice is made on the side wall of the tank at a height of 1.8 m above the ground. Calculate: (i) the speed of efflux of water through the orifice, and (ii) the horizontal range of the water stream on the ground. (Take g = 10 m/s²)"
              steps={[
                "Identify the parameters: Total height of water H = 5 m. Height of orifice above ground y = 1.8 m.",
                "Calculate depth of orifice below water surface: h = H - y = 5 - 1.8 = 3.2 m.",
                "Apply Torricelli's Law for speed of efflux: v<sub>efflux</sub> = &radic;(2gh) = &radic;(2 * 10 * 3.2) = &radic;(64) = 8 m/s.",
                "Compute time of flight for water to reach the ground: t = &radic;(2y/g) = &radic;(2 * 1.8 / 10) = &radic;(0.36) = 0.6 s.",
                "Calculate horizontal range: R = v<sub>efflux</sub> * t = 8 * 0.6 = 4.8 m. (Alternatively: R = 2&radic;(h * y) = 2&radic;(3.2 * 1.8) = 2&radic;(5.76) = 2 * 2.4 = 4.8 m)."
              ]}
              answer="Efflux Speed = 8 m/s | Horizontal Range = 4.8 m"
              color="violet"
            />

            <SolvedExample
              number={4}
              question="A differential open-tube manometer is connected to a vessel containing gas. The manometer liquid is mercury (density = 13.6 g/cm³). The level of mercury in the open arm is 15 cm higher than the level in the arm connected to the vessel. If atmospheric pressure is 1.013 * 10^5 Pa, calculate the absolute pressure of the gas. (g = 9.8 m/s²)"
              steps={[
                "Parameters: atmospheric pressure P<sub>atm</sub> = 1.013 * 10^5 Pa, height h = 15 cm = 0.15 m, density &rho; = 13.6 * 10³ kg/m³.",
                "Hydrostatic gauge pressure is given by: P<sub>gauge</sub> = &rho;gh.",
                "P<sub>gauge</sub> = (13.6 * 10³) * 9.8 * 0.15 = 19992 Pa &asymp; 2.0 * 10^4 Pa.",
                "Absolute pressure of the gas: P = P<sub>atm</sub> + P<sub>gauge</sub> = 1.013 * 10^5 + 0.20 * 10^5 = 1.213 * 10^5 Pa."
              ]}
              answer="Absolute Gas Pressure = 1.213 * 10^5 Pa"
              color="violet"
            />
          </div>

          <SolvedExample
            number={5}
            question="A Venturimeter is connected in a horizontal water pipe of area of cross-section 10 cm². At the throat, the area is 5 cm². The flow speed of water in the main pipe is 2 m/s. Calculate: (i) the pressure difference between the main section and the throat, and (ii) the height difference in mercury in the U-tube. (&rho;<sub>water</sub> = 1000 kg/m³, &rho;<sub>mercury</sub> = 13600 kg/m³, g = 10 m/s²)"
            steps={[
              "Identify parameters: A₁ = 10 cm² = 10⁻³ m², A₂ = 5 cm² = 5 * 10⁻⁴ m², speed v₁ = 2 m/s.",
              "From Continuity Equation: A₁v₁ = A₂v₂  →  10 * 2 = 5 * v₂  →  v₂ = 4 m/s.",
              "Apply Bernoulli's Equation for horizontal flow: P<sub>1</sub> &minus; P<sub>2</sub> = &frac12;&rho;<sub>water</sub>(v<sub>2</sub>&sup2; &minus; v<sub>1</sub>&sup2;).",
              "P<sub>1</sub> &minus; P<sub>2</sub> = 0.5 * 1000 * (4&sup2; &minus; 2&sup2;) = 500 * (16 &minus; 4) = 500 * 12 = 6000 Pa.",
              "The pressure difference is balanced by the mercury column height h: P<sub>1</sub> &minus; P<sub>2</sub> = h &middot; (&rho;<sub>mercury</sub> &minus; &rho;<sub>water</sub>) &middot; g.",
              "6000 = h &middot; (13600 &minus; 1000) &middot; 10  &rarr;  6000 = h &middot; 12600 &middot; 10 = 126000 h.",
              "Solve for h: h = 6000 / 126000 = 1 / 21 m &asymp; 4.76 cm."
            ]}
            answer="Pressure Difference = 6000 Pa | Mercury Height h = 4.76 cm"
            color="violet"
          />
        </div>

        {/* Part 2: Viscosity & Terminal Velocity */}
        <div className="space-y-6">
          <ModuleHeader number={2} title="Viscosity, Newton's Law & Terminal Velocity" difficulty={4} color="cyan" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
            {/* Viscosity & Coefficient Definitions */}
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2.5">
 <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">1. Viscosity &amp; Newton's Law of Viscous Force</span>
              <p className="text-white/70 text-[13px] leading-relaxed">
                <strong>Viscosity</strong> is the internal friction of a fluid that resists relative motion between its layers.
                According to <strong>Newton's Law of Viscosity</strong>, the viscous drag force F between two parallel layers of fluid of area A having velocity gradient dv/dx is:
              </p>
 <div className="text-cyan-300 text-[13px] bg-black/20 p-2.5 rounded text-center">
                F = &minus;&eta; * A * (dv / dx)
              </div>
              <p className="text-white/70 text-[13px] leading-relaxed">
                Where <strong>&eta;</strong> is the <strong>Coefficient of Viscosity</strong>:
              </p>
 <ul className="list-disc list-inside text-white/60 text-[12px] space-y-1 pl-2">
                <li><strong>SI Unit:</strong> Poiseuille (Pl), Pa&middot;s, or kg/(m&middot;s).</li>
                <li><strong>CGS Unit:</strong> Poise (1 Pa&middot;s = 10 Poise).</li>
                <li><strong>Dimensions:</strong> [M L&supminus;&sup1; T&supminus;&sup1;].</li>
              </ul>
            </div>

            {/* Temperature Dependence of Viscosity */}
            <div className="bg-[#05060F] p-4.5 rounded-xl border border-white/5 space-y-2">
              <span className="text-[13px] font-bold text-cyan-300 uppercase tracking-wider block font-mono">2. Temperature Dependence of Viscosity</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <span className="text-rose-400 font-bold block mb-1">In Liquids:</span>
                  Viscosity <strong>decreases</strong> as temperature rises because cohesive forces between molecules weaken.
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <span className="text-emerald-400 font-bold block mb-1">In Gases:</span>
                  Viscosity <strong>increases</strong> as temperature rises (&eta; &prop; &radic;T) because rate of molecular collisions increases.
                </div>
              </div>
            </div>

            {/* Stokes' Law & Terminal Velocity Derivation */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3">
              <span className="text-[13px] font-bold text-cyan-300 uppercase tracking-wider block font-mono">3. Stokes' Law &amp; Terminal Velocity Derivation</span>
              <p className="text-[13px] leading-relaxed text-white/70">
                <strong>Stokes' Law:</strong> Viscous drag force acting on a small spherical ball of radius r moving with velocity v in a medium of viscosity &eta; is:
                <br />
                <code className="text-cyan-300 font-mono block text-center py-1">F = 6&pi; * &eta; * r * v</code>
              </p>
              <button
                onClick={() => setRevealStokes(!revealStokes)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[12.5px] text-cyan-400"
              >
                <span>📈 View Terminal Velocity Force Derivation details</span>
                {revealStokes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {revealStokes && (
                <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 text-[12.5px] text-white/70 leading-relaxed font-sans space-y-3">
                  <p>
                    As a sphere of density &rho; falls through fluid of density &sigma;, it accelerates. Three forces act on it:
                    <br />
                    1. Weight downwards: W = 4/3 * &pi; * r&sup3; * &rho; * g
                    <br />
                    2. Buoyant Force upwards: F_B = 4/3 * &pi; * r&sup3; * &sigma; * g
                    <br />
                    3. Viscous drag upwards: F_v = 6&pi; &eta; r v
                  </p>
                  <p>
                    The sphere reaches constant <strong>Terminal Velocity (v_t)</strong> when net force is zero (W = F_B + F_v):
                    <br />
                    4/3 * &pi; * r&sup3; * &rho; * g = 4/3 * &pi; * r&sup3; * &sigma; * g + 6&pi; &eta; r v_t
                    <br />
                    6&pi; &eta; r v_t = 4/3 * &pi; * r&sup3; * (&rho; - &sigma;) g
                    <br />
                    &rArr; v_t = 2 r&sup2; (&rho; - &sigma;) g / (9 &eta;)
                  </p>
                </div>
              )}
            </div>

            {/* Poiseuille's Law */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
              <span className="text-[13px] font-bold text-cyan-300 uppercase tracking-wider block font-mono">4. Poiseuille's Law (Flow Rate in Capillary)</span>
              <p className="text-[13px] leading-relaxed text-white/70">
                The volume of liquid flowing per second (Q) through a horizontal capillary tube of radius r and length l under pressure difference P is:
              </p>
 <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-center text-[13px] text-cyan-300">
                Q = &pi; * P * r⁴ / (8 * &eta; * l)
              </div>
              <p className="text-[12px] text-white/40 leading-relaxed">
                *Note the high-yield dependence: flow rate Q is proportional to the <strong>fourth power of radius</strong> (Q &prop; r⁴). A 10% decrease in radius drops flow rate by nearly 34%!
              </p>
            </div>

            {/* Tap to Reveal Piles */}
            <div className="bg-[#05060F] border border-white/5 rounded-2xl p-4.5 space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Interactive Concept Check</h4>
              
              <div className="space-y-2">
                <button
                  onClick={() => setRevealTerminal(!revealTerminal)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-cyan-400"
                >
                  <span>🏀 Terminal Velocity: Factor dependencies?</span>
                  {revealTerminal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {revealTerminal && (
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[13px] text-white/70 leading-relaxed font-sans">
                    Terminal velocity depends directly on the square of the radius (v_t &prop; r&sup2;) and the density difference (v_t &prop; &rho; - &sigma;). Therefore, larger drops fall faster. If the body is less dense than the fluid (&rho; &lt; &sigma;), v_t is negative, causing it to rise (e.g., air bubbles rising in water).
                  </div>
                )}
              </div>
            </div>

            {/* SVG Flow Transition */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
              <svg width="360" height="130" viewBox="0 0 360 130" className="max-w-full">
                {/* Laminar Flow */}
                <g transform="translate(10, 0)">
                  <text x="75" y="15" fill="#22d3ee" fontSize="9" fontWeight="bold" textAnchor="middle">Laminar Flow (Re &lt; 1000)</text>
                  <path d="M 15 40 H 135 M 15 60 H 135 M 15 80 H 135 M 15 100 H 135" fill="none" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrow-c)" />
                </g>

                {/* Turbulent Flow */}
                <g transform="translate(190, 0)">
                  <text x="75" y="15" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Turbulent Flow (Re &gt; 2000)</text>
                  <path d="M 15 40 Q 40 20 60 45 T 100 35 T 135 45" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                  <path d="M 15 65 Q 45 80 75 55 T 115 75 T 135 65" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                  <path d="M 15 90 Q 55 105 85 85 T 125 105 T 135 90" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                  
                  {/* Turbulent eddies circles */}
                  <circle cx="50" cy="50" r="8" fill="none" stroke="#fda4af" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="95" cy="85" r="6" fill="none" stroke="#fda4af" strokeWidth="1" strokeDasharray="2 2" />
                </g>

                <defs>
                  <marker id="arrow-c" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                  </marker>
                </defs>
              </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                Figure 2.3: Flow transition: Streamline Laminar vs Chaotic Turbulent flow
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={6}
              question="Eight identical spherical water drops, each falling through air with a terminal velocity of 12 cm/s, merge to form a single larger drop. Calculate the terminal velocity of the merged larger drop."
              steps={[
                "Let r be the radius of each small drop. Let R be the radius of the merged large drop.",
                "Since total volume is conserved: V<sub>large</sub> = 8 * V<sub>small</sub>  →  (4/3)·π·R³ = 8 * (4/3)·π·r³.",
                "Cancel constants and take cube root: R³ = 8r³  →  R = 2r.",
                "Terminal velocity formula shows: v<sub>t</sub> ∝ Radius².",
                "Therefore, the ratio of new velocity to old velocity is: v<sub>new</sub> / v = (R / r)² = (2r / r)² = 4.",
                "Substitute the given small drop velocity (12 cm/s): v<sub>new</sub> = 4 * 12 = 48 cm/s."
              ]}
              answer="v<sub>large</sub> = 48 cm/s"
              color="cyan"
            />

            <SolvedExample
              number={7}
              question="Calculate the terminal velocity of a steel ball of radius 2 mm falling through glycerin of density 1.2 * 10³ kg/m³ and coefficient of viscosity 0.83 kg/(m·s). Density of steel is 7.8 * 10³ kg/m³. (g = 9.8 m/s²)"
              steps={[
                "Identify parameters: radius r = 2 mm = 2 * 10⁻³ m, η = 0.83 kg/(m·s).",
                "ρ (steel) = 7.8 * 10³ kg/m³, σ (glycerin) = 1.2 * 10³ kg/m³.",
                "Density difference: (ρ - σ) = (7.8 - 1.2) * 10³ = 6.6 * 10³ kg/m³.",
                "Apply terminal velocity formula: v<sub>t</sub> = 2 r² (ρ - σ) g / (9 η).",
                "v<sub>t</sub> = [ 2 * (4 * 10⁻⁶) * (6.6 * 10³) * 9.8 ] / [ 9 * 0.83 ].",
                "v<sub>t</sub> = [ 8 * 10⁻⁶ * 6600 * 9.8 ] / 7.47 = 0.5174 / 7.47 ≈ 0.069 m/s = 6.9 cm/s."
              ]}
              answer="Terminal Velocity v<sub>t</sub> = 6.9 cm/s"
              color="cyan"
            />
          </div>

          <SolvedExample
            number={8}
            question="A liquid flows through a horizontal capillary tube of radius r and length l. If the radius is doubled and the length is halved, keeping the pressure difference across the tube constant, find the ratio of the new rate of flow to the original flow rate."
            steps={[
              "From Poiseuille's Law, flow rate is: Q = π P r⁴ / (8 η l).",
              "Since pressure P and viscosity η are constant: Q ∝ r⁴ / l.",
              "Let initial flow rate be Q₁ = k * r⁴ / l. New radius R = 2r and new length L = l / 2.",
              "New flow rate Q₂ = k * (2r)⁴ / (l / 2) = k * 16 r⁴ * 2 / l = 32 * (k * r⁴ / l) = 32 Q₁.",
              "Ratio is Q₂ / Q₁ = 32."
            ]}
            answer="New Flow Rate = 32 * Original Flow Rate"
            color="cyan"
          />
        </div>

        {/* Part 3: Surface Tension */}
        <div className="space-y-6">
          <ModuleHeader number={3} title="Surface Tension, Surface Energy & Capillary Action" difficulty={4} color="amber" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
            {/* Surface Energy & Surface Tension Definitions */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2.5">
 <span className="text-[13px] font-bold text-amber-400 uppercase tracking-wider block">1. Surface Tension &amp; Surface Energy</span>
              <p className="text-white/70 text-[13px] leading-relaxed">
                <strong>Surface Tension (S):</strong> is the result of cohesive molecular forces pulling surface molecules inward, causing the surface layer to act like a stretched elastic sheet.
                <strong>Surface Energy:</strong> molecules at the surface layer experience a net inward pull, possessing extra potential energy. Work done in increasing surface area is stored as surface energy:
              </p>
 <div className="text-amber-300 text-[13px] bg-black/20 p-2.5 rounded text-center">
                S = Work Done / &Delta;A &nbsp; &rarr; &nbsp; W = S &middot; &Delta;A
              </div>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                *Soap bubbles have <strong>two surfaces</strong> (inner and outer interfaces), meaning a bubble of radius R has surface area 2 &middot; 4&pi;R&sup2; = 8&pi;R&sup2;. Hence, work done to blow it is W = 8&pi;R&sup2; S.
              </p>
            </div>

            {/* Excess Pressure inside drops/bubbles */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl space-y-3">
 <span className="text-[13px] font-bold text-amber-300 uppercase tracking-wider block">2. Excess Pressure Derivations</span>
              <div className="text-[13px] leading-relaxed text-white/70 space-y-2">
                <p>
                  Due to surface tension, the pressure inside a curved surface is always greater than outside.
                </p>
 <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[12px] leading-relaxed space-y-2.5">
                  <div>
                    <strong className="text-amber-400">A. Liquid Drop Derivation:</strong>
                    <br />
                    Let drop expand by dR. Work done by excess pressure: W = F &middot; dR = (&Delta;P &middot; 4&pi; R&sup2;) &middot; dR.
                    <br />
                    Increase in surface area: dA = 4&pi;(R + dR)&sup2; - 4&pi; R&sup2; &asymp; 8&pi; R dR.
                    <br />
                    Increase in Surface Energy: dU = S &middot; dA = S &middot; 8&pi; R dR.
                    <br />
                    Equating work and energy: &Delta;P &middot; 4&pi; R&sup2; dR = S &middot; 8&pi; R dR &rArr; &Delta;P = 2S/R.
                  </div>
                  <div>
                    <strong className="text-amber-400">B. Soap Bubble Derivation:</strong>
                    <br />
                    Since a soap bubble has two free surfaces, area increase is doubled: dA = 2 &middot; 8&pi; R dR = 16&pi; R dR.
                    <br />
                    Equating: &Delta;P &middot; 4&pi; R&sup2; dR = S &middot; 16&pi; R dR &rArr; &Delta;P = 4S/R.
                  </div>
                </div>
              </div>
            </div>

            {/* Capillary Rise Ascent & Meniscus */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-4">
 <span className="text-[13px] font-bold text-amber-300 uppercase tracking-wider block">3. Capillary Ascent Derivation &amp; Meniscus Shapes</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                  <CapillaryRiseDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                    Figure 3.1: Capillary Tube Ascent Height Diagram
                  </div>
                </div>
                <div className="space-y-3 justify-center flex flex-col">
                  <p className="text-[12.5px] leading-relaxed text-white/70">
                    <strong>Ascent Derivation:</strong>
                    <br />
                    The upward force due to surface tension along the circumference is 2&pi; r S cos&theta;. This upward force balances the weight of the liquid column &pi; r&sup2; h &rho; g.
                    <br />
                    2&pi; r S cos&theta; = &pi; r&sup2; h &rho; g &rArr; h = 2 S cos&theta; / (&rho; g r).
                  </p>
                  <p className="text-[12.5px] leading-relaxed text-white/70">
                    <strong>Meniscus shapes:</strong>
                    <br />
                    - <strong>Wetting (&theta; &lt; 90&deg;, Concave):</strong> Adhesion &gt; Cohesion (e.g. Water-Glass).
                    <br />
                    - <strong>Non-wetting (&theta; &gt; 90&deg;, Convex):</strong> Cohesion &gt; Adhesion (e.g. Mercury-Glass).
                  </p>
                </div>
              </div>
            </div>

            {/* Factors affecting Surface Tension */}
            <div className="p-4.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-3 text-[13px] text-white/80">
 <span className="text-[13.5px] font-bold text-amber-300 uppercase tracking-wider block">4. Factors Affecting Surface Tension</span>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Temperature:</strong> Surface tension <strong>decreases</strong> linearly as temperature increases. It becomes zero at critical temperature.</li>
                <li><strong>Impurities:</strong> Highly soluble solutes (like salt in water) <strong>increase</strong> surface tension. Sparingly soluble solutes (like soap, detergent, phenol) <strong>decrease</strong> surface tension.</li>
                <li><strong>Detergents Cleaning Action:</strong> Detergents dramatically lower surface tension, allowing water to fully wet the tiny pores of grease and dirt particles, lifting them away.</li>
              </ul>
            </div>

            {/* Tap to Reveal Jurin's Law */}
            <div className="bg-[#05060F] border border-white/5 rounded-2xl p-4.5 space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Capillary Rise Analysis</h4>
              
              <div className="space-y-2">
                <button
                  onClick={() => setRevealCapillary(!revealCapillary)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-cyan-400"
                >
                  <span>🧪 Capillary Rise height (h) vs Tube Radius (r)?</span>
                  {revealCapillary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {revealCapillary && (
                  <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[13px] text-white/70 leading-relaxed font-sans">
                    Capillary rise is governed by Jurin&apos;s Law: h = 2S cosθ / (ρgr). Because height is inversely proportional to radius (h ∝ 1/r), narrower tubes have a significantly higher water rise. If θ &gt; 90° (obtuse, like mercury), the cosine is negative, causing the liquid column to fall inside the tube.
                  </div>
                )}
              </div>
            </div>

            {/* SVG Meniscus Comparison */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
              <svg width="360" height="150" viewBox="0 0 360 150" className="max-w-full">
                {/* Concave Meniscus (Water) */}
                <g transform="translate(20, 0)">
                  <text x="75" y="15" fill="#06b6d4" fontSize="9" fontWeight="bold" textAnchor="middle">Wetting: Concave (θ &lt; 90°)</text>
                  <line x1="30" y1="30" x2="30" y2="130" stroke="#cccccc" strokeWidth="2.5" />
                  <line x1="120" y1="30" x2="120" y2="130" stroke="#cccccc" strokeWidth="2.5" />
                  
                  <path d="M 30 70 Q 75 95 120 70 L 120 130 L 30 130 Z" fill="#0284c7" fillOpacity="0.2" />
                  <path d="M 30 70 Q 75 95 120 70" fill="none" stroke="#38bdf8" strokeWidth="2" />
                  
                  <line x1="30" y1="70" x2="55" y2="95" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="45" y="65" fill="#f43f5e" fontSize="8">θ (Acute)</text>
                </g>

                {/* Convex Meniscus (Mercury) */}
                <g transform="translate(190, 0)">
                  <text x="75" y="15" fill="#e11d48" fontSize="9" fontWeight="bold" textAnchor="middle">Non-Wetting: Convex (θ &gt; 90°)</text>
                  <line x1="30" y1="30" x2="30" y2="130" stroke="#cccccc" strokeWidth="2.5" />
                  <line x1="120" y1="30" x2="120" y2="130" stroke="#cccccc" strokeWidth="2.5" />
                  
                  <path d="M 30 90 Q 75 65 120 90 L 120 130 L 30 130 Z" fill="#475569" fillOpacity="0.2" />
                  <path d="M 30 90 Q 75 65 120 90" fill="none" stroke="#94a3b8" strokeWidth="2" />
                  
                  <line x1="30" y1="90" x2="10" y2="70" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="25" y="105" fill="#f43f5e" fontSize="8">θ (Obtuse)</text>
                </g>
              </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                Figure 3.2: Meniscus shapes: Water/Glass (wetting) vs Mercury/Glass (non-wetting)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={9}
              question="A soap bubble of radius 3 cm is blown in air. Find: (i) the excess pressure inside it, and (ii) the work done in blowing it. (Surface tension of soap solution is 3.0 * 10⁻² N/m)"
              steps={[
                "Identify parameters: radius R = 3 cm = 0.03 m, Surface tension S = 3.0 * 10⁻² N/m.",
                "Excess pressure inside soap bubble: &Delta;P = 4S / R.",
                "&Delta;P = (4 * 3.0 * 10⁻²) / 0.03 = 0.12 / 0.03 = 4 Pa.",
                "Work done in blowing bubble (which has two free surfaces): W = 8&pi;R&sup2;S.",
                "W = 8 * 3.14 * (0.03)&sup2; * (3.0 * 10⁻²).",
                "W = 25.12 * 9 * 10⁻⁴ * 3 * 10⁻&sup2; = 25.12 * 2.7 * 10&supminus;⁵ ≈ 6.78 * 10&supminus;⁴ J."
              ]}
              answer="Excess Pressure = 4 Pa | Work Done = 6.78 * 10^-4 J"
              color="amber"
            />

            <SolvedExample
              number={10}
              question="A capillary tube of radius 0.2 mm is dipped vertically in water (S = 0.072 N/m, density = 1000 kg/m³). Angle of contact is 0°. Calculate the height to which water rises in the tube. (g = 10 m/s²)"
              steps={[
                "Identify parameters: r = 0.2 mm = 2 * 10⁻⁴ m, S = 0.072 N/m, &rho; = 1000 kg/m³, &theta; = 0&deg; (cos 0&deg; = 1).",
                "Apply Jurin's Ascent formula: h = 2S cos&theta; / (&rho;gr).",
                "h = (2 * 0.072 * 1) / (1000 * 10 * 2 * 10⁻⁴) = 0.144 / 2 = 0.072 m = 7.2 cm."
              ]}
              answer="Height of Capillary Rise h = 7.2 cm"
              color="amber"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Formulas & Shortcuts ─────────────────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <SectionHeader icon={<Flame className="w-5 h-5" />} label="High-Yield Fluid Formula Sheet" color="rose" />

        {/* Bubble vs Drop Comparison Card */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider">Excess Pressure comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
 <tr className="border-b border-white/5 text-white/40">
                  <th className="py-2.5">Object</th>
                  <th className="py-2.5">Number of Surfaces</th>
                  <th className="py-2.5">Excess Pressure Formula (ΔP)</th>
                </tr>
              </thead>
 <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-3 font-semibold text-white">Liquid Drop (in Air)</td>
                  <td className="py-3">1 Interface (liquid-air)</td>
                  <td className="py-3 text-cyan-400 font-bold">2S / R</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Air Bubble (in Liquid)</td>
                  <td className="py-3">1 Interface (air-liquid)</td>
                  <td className="py-3 text-cyan-400 font-bold">2S / R</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Soap Bubble (in Air)</td>
                  <td className="py-3">2 Interfaces (inner & outer)</td>
                  <td className="py-3 text-rose-400 font-bold">4S / R</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaCard
            formula="P = P<sub>atm</sub> + &rho;gh"
            use_when="Absolute pressure. Use to find static pressure at depth h in a liquid column of density &rho;."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={1}
            color="cyan"
            copy_text="P = P_atm + rho * g * h"
          />
          <FormulaCard
            formula="F<sub>B</sub> = V<sub>sub</sub> &middot; &rho;<sub>liquid</sub> &middot; g"
            use_when="Archimedes Buoyancy. Always use fluid density, not object density. Relates volume submerged to upward buoyant support force."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={2}
            color="violet"
            copy_text="F_B = V_sub * rho_liquid * g"
          />
          <FormulaCard
            formula="A<sub>1</sub>v<sub>1</sub> = A<sub>2</sub>v<sub>2</sub>"
            use_when="Equation of Continuity. Conservation of Mass for incompressible streamline fluid flows. Constricted areas accelerate velocity."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={1}
            color="emerald"
            copy_text="A1 * v1 = A2 * v2"
          />
          <FormulaCard
            formula="P + &rho;gh + &frac12;&rho;v&sup2; = Constant"
            use_when="Bernoulli's Principle. Conservation of energy density for ideal non-viscous streamline flows."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={3}
            color="amber"
            copy_text="P + rho * g * h + 0.5 * rho * v^2 = Constant"
          />
          <FormulaCard
            formula="v<sub>t</sub> = 2r&sup2;(&rho; &minus; &sigma;)g / 9&eta;"
            use_when="Terminal Velocity. Relates radius&sup2;, viscosity, and density differences under gravity drag balance."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={4}
            difficulty_stars={3}
            color="rose"
            copy_text="v_t = 2 * r^2 * (rho - sigma) * g / (9 * eta)"
          />
          <FormulaCard
            formula="h = 2S cos&theta; / (&rho;gr)"
            use_when="Capillary Rise. Shows h is inversely proportional to radius r (Jurin's Law). Negative height implies capillary depression."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={2}
            color="cyan"
            copy_text="h = 2 * S * cos(theta) / (rho * g * r)"
          />
        </div>
      </div>

      {/* ── SECTION 3: Strategy & Memory Guidelines ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        {/* Memorize Box */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-400" /> What You MUST Memorize
          </h4>
          <ul className="space-y-3.5 text-[13px] text-white/80">
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Torricelli Efflux Range:</strong>
              <br />
              Speed of efflux v = &radic;(2gh) where h is the depth of the hole. Range is R = 2&radic;(h(H - h)). Maximum range is R<sub>max</sub> = H when hole is at midpoint h = H/2.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Terminal velocity merge factor:</strong>
              <br />
              When N droplets merge: v<sub>new</sub> = N<sup>2/3</sup> &middot; v<sub>old</sub>. (e.g., 27 drops merge &rarr; 27<sup>2/3</sup> = 9 times velocity).
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Bubble Blowing Work:</strong>
              <br />
              For soap bubbles, work is W = S * (2 * 4πR²) = 8πR²S. Don&apos;t forget the factor of 2 for two surfaces!
            </li>
          </ul>
        </div>

        {/* Don't Memorize Box */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-400" /> What You Should NOT Memorize
          </h4>
          <ul className="space-y-3.5 text-[13px] text-white/80">
            <li className="leading-relaxed">
              <strong className="text-amber-400">Specific Venturimeter speed formulas:</strong>
              <br />
              Do not memorize long derived formulas. Always solve using Continuity A1v1 = A2v2 and Bernoulli&apos;s P1 - P2 = (1/2)ρ(v2² - v1²) step-by-step.
            </li>
            <li className="leading-relaxed">
              <strong className="text-amber-400">Complex viscous force integration:</strong>
              <br />
              Newton's Law of Viscosity is fundamental: F = -ηA(dv/dy). Do not memorize complex coefficients; they are either given or derived directly from boundary conditions.
            </li>
          </ul>
        </div>
      </div>

      {/* ── SECTION 4: IAT Exam Recognition, Shortcuts & Traps ─────────────── */}
      <div className="space-y-8 pt-6 border-t border-white/5">
        <SectionHeader icon={<Brain className="w-5 h-5" />} label="IAT Exam Strategy & Common Traps" color="emerald" />

        {/* Question Strategy / Recognition */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider">Question Strategy Recognition</h4>
          <div className="space-y-4.5 text-[13px]">
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Varying Pipe diameter&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Equation of Continuity (A1v1 = A2v2) combined with Bernoulli&apos;s Equation. Narrow section means high velocity and low pressure.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Floating Body / Hydrometer&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Force balance of weight and buoyancy (F_B = mg). Upward force is weight of liquid displaced.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Soap Bubble&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Bubble has two surfaces. Excess pressure is ΔP = 4S/R. Work done to blow is 8πR²S.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Splitting/Merging drops&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Thermodynamics connection. Splitting increases area → absorbs energy → liquid cools. Merging decreases area → releases energy → liquid heats up.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Traps */}
        <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-4">
 <h4 className="text-rose-400 font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-rose-400" /> Common Traps & Mistakes to Avoid
          </h4>
          <div className="space-y-3.5 text-[13px] text-white/80">
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 1: The Archimedes Density Trap</strong>
              <br />
              Using the density of the floating object in the Buoyancy formula. This is fatal! Buoyant Force is F_B = V_submerged * ρ_liquid * g. Always use the density of the liquid.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 2: Insufficient Capillary Tube Length</strong>
              <br />
              Assuming that water will overflow out of the tube if the tube length is shorter than the capillary height h. It will not overflow! Instead, the meniscus flattens (contact angle changes to increase curvature radius R_m) to maintain equilibrium: h * R_m = Constant.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 3: Bubble vs Drop Pressure Differences</strong>
              <br />
              Using 4S/R for air bubbles submerged in water. A bubble * inside* water only has a single interface (air-water), so the excess pressure is 2S/R, not 4S/R! 4S/R is only for soap bubbles in air (two interfaces).
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: 2-Minute Revision Sheet ─────────────────────────────── */}
      <div className="p-6 bg-gradient-to-br from-violet-950/20 to-cyan-950/20 border border-violet-500/10 rounded-2xl space-y-4 pt-6 mt-6 border-t border-white/5">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4.5 h-4.5 text-amber-400" /> 2-Minute Revision Sheet
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 text-[13px] text-white/80">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Pascal&apos;s Law</strong>: Pressure applied to enclosed fluid is transmitted undiminished.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Buoyant Force</strong>: F_B = V_submerged * ρ_liquid * g. Weight of fluid displaced.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Continuity</strong>: A1v1 = A2v2 (Conservation of Mass). Narrow section = high speed.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Bernoulli</strong>: P + ρgh + (1/2)ρv² = Constant. High velocity = low pressure.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Terminal velocity</strong>: v_t ∝ r². Larger spheres reach much higher speed.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Capillary Rise</strong>: h = 2S cosθ / (ρgr). Meniscus water concave, mercury convex.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Excess Pressure</strong>: 2S/R for drop or submerged bubble, 4S/R for soap bubble in air.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
