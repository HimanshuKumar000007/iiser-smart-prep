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
    <div className={cn('rounded-xl border p-4.5 transition-all duration-200 bg-[#0A0C18]', bgColors[color], borderColors[color])}>
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

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-white/5">
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
    violet: 'text-violet-400 border-violet-500/20 bg-violet-500/[0.02]',
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/[0.02]',
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.02]',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/[0.02]',
    rose: 'text-rose-400 border-rose-500/20 bg-rose-500/[0.02]',
  };
  const badgeColors: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  };
  return (
    <div className={cn('rounded-2xl border p-5 space-y-4 bg-[#0A0C18]', accentColors[color])}>
      <div className="flex items-center gap-2">
 <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase', badgeColors[color])}>
          Solved Example {number}
        </span>
      </div>
      <p className="text-white text-[13px] font-semibold leading-relaxed">{question}</p>
      <div className="space-y-2 border-t border-white/5 pt-3">
 <h5 className="text-white/40 text-[12px] uppercase tracking-wider">Step-by-step Solution:</h5>
        <ol className="space-y-2 text-[13px] text-white/80 list-decimal pl-4 leading-relaxed font-sans">
          {steps.map((step, idx) => (
            <li key={idx} className="pl-1" dangerouslySetInnerHTML={{ __html: step }} />
          ))}
        </ol>
      </div>
 <div className="p-3 bg-black/45 border border-white/5 rounded-xl flex items-center justify-between text-[13px]">
        <span className="text-white/40 uppercase text-[12px] tracking-wider">Final Answer:</span>
        <span className="text-emerald-400 font-bold" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function DuctileBrittleCurvesDiagram() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs mx-auto" aria-label="Stress strain curve comparison for ductile vs brittle materials">
      {/* Axes */}
      <line x1="30" y1="130" x2="220" y2="130" stroke="#ffffff40" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="30" y2="130" stroke="#ffffff40" strokeWidth="1.5" />
      <text x="225" y="134" fill="#ffffff60" fontSize="8" fontFamily="monospace">Strain</text>
      <text x="20" y="15" fill="#ffffff60" fontSize="8" fontFamily="monospace">Stress</text>
      
      {/* Ductile curve (Steel) */}
      <path d="M 30 130 L 70 80 Q 90 70 120 60 T 180 80" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
      <circle cx="180" cy="80" r="3" fill="#38bdf8" />
      <text x="180" y="93" fill="#38bdf8" fontSize="8" fontWeight="bold">Ductile Fracture</text>
      <text x="110" y="48" fill="#38bdf8" fontSize="8" fontFamily="monospace">Ductile (Steel)</text>
      
      {/* Brittle curve (Glass) */}
      <path d="M 30 130 L 80 50 L 95 40" fill="none" stroke="#ef4444" strokeWidth="2.5" />
      <circle cx="95" cy="40" r="3" fill="#ef4444" />
      <text x="95" y="32" fill="#fca5a5" fontSize="8" fontWeight="bold">Brittle Fracture</text>
      <text x="50" y="35" fill="#fca5a5" fontSize="8" fontFamily="monospace">Brittle (Glass)</text>
    </svg>
  );
}

function IBeamCrossSectionDiagram() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs mx-auto" aria-label="I-beam girder cross section diagram">
      {/* I-beam outline */}
      <path d="M 50 30 L 190 30 L 190 50 L 135 50 L 135 110 L 190 110 L 190 130 L 50 130 L 50 110 L 105 110 L 105 50 L 50 50 Z" 
            fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
      
      {/* Dimension Lines */}
      <line x1="50" y1="20" x2="190" y2="20" stroke="#ffffff30" strokeWidth="1" />
      <line x1="50" y1="17" x2="50" y2="23" stroke="#ffffff30" strokeWidth="1" />
      <line x1="190" y1="17" x2="190" y2="23" stroke="#ffffff30" strokeWidth="1" />
      <text x="120" y="15" fill="#a5b4fc" fontSize="8" textAnchor="middle">Flange Width (b)</text>
      
      {/* Depth of girder */}
      <line x1="205" y1="30" x2="205" y2="130" stroke="#ffffff30" strokeWidth="1" />
      <line x1="202" y1="30" x2="208" y2="30" stroke="#ffffff30" strokeWidth="1" />
      <line x1="202" y1="130" x2="208" y2="130" stroke="#ffffff30" strokeWidth="1" />
      <text x="212" y="85" fill="#a5b4fc" fontSize="8" textAnchor="start">Depth (d)</text>
      
      {/* Force stress labels */}
      <text x="120" y="43" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">Top Flange (Tension / Compression)</text>
      <text x="120" y="123" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">Bottom Flange</text>
      <text x="120" y="83" fill="#ffffff60" fontSize="8" textAnchor="middle">Web (Minimizes Weight)</text>
      
      {/* Bending relation */}
      <text x="120" y="152" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">Bending δ ∝ 1 / (b d³)</text>
    </svg>
  );
}

function PoissonRatioDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Poisson ratio visualization showing lateral contraction and longitudinal elongation">
      {/* Grid line separator */}
      <line x1="120" y1="10" x2="120" y2="130" stroke="#ffffff10" strokeWidth="1" strokeDasharray="3 3" />
      
      {/* Original wire (left side) */}
      <rect x="50" y="25" width="20" height="90" fill="none" stroke="#ffffff30" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="60" y="73" fill="#ffffff40" fontSize="9" textAnchor="middle">Original</text>
      <text x="60" y="125" fill="#ffffff40" fontSize="8" textAnchor="middle">Diameter d</text>
      
      {/* Stretched wire (right side) */}
      <rect x="175" y="10" width="10" height="120" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
      
      {/* Extension labels */}
      <path d="M 195 10 L 195 130" stroke="#34d399" strokeWidth="1" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
      <text x="202" y="73" fill="#34d399" fontSize="8">L + ΔL</text>
      
      {/* Lateral contraction labels */}
      <path d="M 165 40 L 175 40" stroke="#f43f5e" strokeWidth="1" />
      <path d="M 195 40 L 185 40" stroke="#f43f5e" strokeWidth="1" />
      <text x="180" y="33" fill="#fca5a5" fontSize="7" textAnchor="middle">d - Δd</text>
      
      <text x="180" y="138" fill="#34d399" fontSize="8.5" textAnchor="middle" fontWeight="bold">σ = -Δd/d ÷ ΔL/L</text>
    </svg>
  );
}

export function SolidsLessonDetail({ progress, isCompleted = false, onNavigate }: Props) {
  const [revealModulus, setRevealModulus] = useState(false);
  const [revealCurve, setRevealCurve] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 font-sans">
      
      {/* ── HEADER Mockup (Matches exact style requested) ─────────────────── */}
      <div className="relative rounded-3xl border border-white/5 bg-[#0A0C18] p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Physics Unit 7
            </span>
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              IAT Advanced
            </span>
          </div>
 <div className="flex items-center gap-1 text-[12px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 animate-pulse" /> core topic
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Mechanical Properties of Solids (Elasticity)
            </h1>
          <p className="text-white/60 text-[13px] sm:text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-400" /> 15 min intensive review
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3.5 pt-2">
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-3 text-center space-y-1 hover:border-violet-500/20 transition-colors">
 <span className="text-white/40 text-[10px] uppercase tracking-wider block">Revision Time</span>
 <span className="text-white font-extrabold text-[13px] sm:text-sm block">20 Min</span>
          </div>
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-3 text-center space-y-1 hover:border-violet-500/20 transition-colors">
 <span className="text-white/40 text-[10px] uppercase tracking-wider block">IAT Importance</span>
 <span className="text-white font-extrabold text-[13px] sm:text-sm block text-amber-400">Medium</span>
          </div>
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-3 text-center space-y-1 hover:border-violet-500/20 transition-colors">
 <span className="text-white/40 text-[10px] uppercase tracking-wider block">Yearly Questions</span>
 <span className="text-white font-extrabold text-[13px] sm:text-sm block text-cyan-400">1 Q</span>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between text-[13px] font-semibold">
            <span className="text-white/50">Lesson Progress</span>
 <span className={cn("font-bold", isCompleted ?"text-emerald-400" :"text-violet-400")}>
              {isCompleted ? "Completed • Quiz Passed" : progress > 0 ? `${Math.round(progress)}% Read` : "Reading Content"}
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-300", isCompleted ? "bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-cyan-500")}
              style={{ width: `${isCompleted ? 100 : Math.max(2, progress)}%` }}
            />
            {/* Glowing active pointer dot */}
            {!isCompleted && progress > 0 && progress < 100 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee] transition-all duration-300"
                style={{ left: `calc(${progress}% - 4px)` }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── BEFORE YOU START ────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-violet-950/10 to-indigo-950/10 border border-violet-500/10 rounded-2xl p-5 sm:p-6 space-y-3.5">
 <h3 className="text-white font-display font-bold text-[13px] uppercase tracking-widest flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-400" /> Prerequisites & Concepts
        </h3>
        <p className="text-white/80 text-[13px] sm:text-sm leading-relaxed font-sans">
          Elasticity is the property of a body by virtue of which it regains its original shape and size when the deforming forces are removed. When atoms are displaced from equilibrium spacing, **intermolecular forces** act as internal restoring springs.
        </p>
      </div>

      {/* ── MODULE 1: Stress, Strain & Hooke's Law ─────────────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={1} title="Stress, Strain & Hooke's Law" difficulty={2} color="violet" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
            <p>
              When a deforming force is applied, an internal **restoring force** is generated. 
              <strong> Stress (σ):</strong> is defined as the Restoring Force per unit area: 
              <code className="text-violet-300 bg-white/5 px-1.5 py-0.5 rounded font-mono ml-1 text-[13px]">σ = F_restoring / A</code>. 
              Its SI unit is N/m² or Pascal (Pa).
            </p>
            <p>
              <strong>Strain (ε):</strong> is the fractional change in configuration (dimensionless). There are three primary types depending on the deformation geometry:
            </p>
          </div>

          {/* Types Table */}
          <div className="overflow-x-auto border border-white/5 rounded-xl bg-[#05060F]">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
 <th className="p-3 text-white font-bold uppercase tracking-wider">Deformation Type</th>
 <th className="p-3 text-white font-bold uppercase tracking-wider">Stress (σ)</th>
 <th className="p-3 text-white font-bold uppercase tracking-wider">Strain (ε)</th>
                </tr>
              </thead>
              <tbody className="text-white/70 divide-y divide-white/5">
                <tr>
                  <td className="p-3 font-semibold text-white">Longitudinal (Normal)</td>
                  <td className="p-3">Normal Force / Area (F<sub>normal</sub> / A)</td>
                  <td className="p-3">Change in Length / Original Length (&Delta;L / L)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Shearing (Tangential)</td>
                  <td className="p-3">Tangential Force / Area (F<sub>parallel</sub> / A)</td>
                  <td className="p-3">Shear Angle &theta; &approx; tan &theta; = &Delta;x / L</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Volume (Hydraulic)</td>
                  <td className="p-3">Fluid Pressure P = F<sub>normal</sub> / A</td>
                  <td className="p-3">Change in Volume / Original Volume (&Delta;V / V)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SVG Diagram: Normal vs Shearing deformation */}
          <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
            <svg width="360" height="150" viewBox="0 0 360 150" className="max-w-full">
              {/* Tensile / Normal stress */}
              <g transform="translate(10, 0)">
                <text x="70" y="15" fill="#a78bfa" fontSize="9" fontWeight="bold" textAnchor="middle">Longitudinal Tensile Stress</text>
                {/* Wire ceiling */}
                <line x1="30" y1="30" x2="110" y2="30" stroke="#cccccc" strokeWidth="2.5" />
                {/* Original wire */}
                <line x1="70" y1="30" x2="70" y2="90" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Stretched wire */}
                <line x1="70" y1="30" x2="70" y2="115" stroke="#a78bfa" strokeWidth="2" />
                {/* Load */}
                <rect x="55" y="115" width="30" height="15" rx="3" fill="#0A0C18" stroke="#a78bfa" strokeWidth="1.5" />
                <text x="70" y="125" fill="#a78bfa" fontSize="7" textAnchor="middle">Force F</text>
                {/* Length labels */}
                <text x="45" y="65" fill="#ffffff" fillOpacity="0.4" fontSize="7" textAnchor="middle">Length L</text>
                <text x="45" y="105" fill="#22d3ee" fontSize="7" textAnchor="middle">Extension ΔL</text>
                {/* Arrows */}
                <path d="M 70 90 L 70 115" fill="none" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>

              {/* Shear Stress */}
              <g transform="translate(190, 0)">
                <text x="80" y="15" fill="#f472b6" fontSize="9" fontWeight="bold" textAnchor="middle">Tangential Shearing Stress</text>
                {/* Fixed base */}
                <line x1="20" y1="120" x2="140" y2="120" stroke="#cccccc" strokeWidth="2.5" />
                
                {/* Original shape (dotted) */}
                <rect x="40" y="50" width="80" height="70" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Sheared Shape */}
                <path d="M 60 50 L 140 50 L 120 120 L 40 120 Z" fill="none" stroke="#f472b6" strokeWidth="1.5" />
                <path d="M 60 50 L 140 50 L 120 120 L 40 120 Z" fill="#f472b6" fillOpacity="0.1" />

                {/* Force Arrow */}
                <path d="M 10 50 L 55 50" fill="none" stroke="#f472b6" strokeWidth="2" markerEnd="url(#pink-arrow)" />
                <text x="30" y="42" fill="#f472b6" fontSize="8" fontWeight="bold" textAnchor="middle">Force F</text>

                {/* Shear angle and displacement */}
                <text x="50" y="113" fill="#22d3ee" fontSize="8">θ</text>
                <line x1="40" y1="50" x2="60" y2="50" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" />
                <text x="50" y="45" fill="#22d3ee" fontSize="7" textAnchor="middle">Δx</text>

                <text x="128" y="85" fill="#ffffff" fillOpacity="0.4" fontSize="7">Height L</text>
              </g>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                </marker>
                <marker id="pink-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f472b6" />
                </marker>
              </defs>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 1.1: Longitudinal Tensile stretching vs Tangential Shear angular deformation
            </div>
          </div>

          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-3">
            <p>
              <strong>Hooke&apos;s Law:</strong> Within the elastic limit, the stress developed in a body is directly proportional to the strain produced in it:
            </p>
 <div className="p-3.5 bg-[#05060F] border border-white/5 rounded-xl text-[13px] text-center text-violet-300">
              Stress ∝ Strain  →  Stress = E * Strain
            </div>
            <p>
              Here, <strong>E</strong> is the **Modulus of Elasticity**. It depends * only* on the nature of the material and the temperature, not on the dimensions of the body.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SolvedExample
            number={1}
            question="A steel wire of length 2 m and cross-sectional area 1.0 mm² is stretched by 1.0 mm by a suspended load. Find: (i) the longitudinal strain in the wire, (ii) the tensile stress developed, and (iii) the Young's modulus of steel. (Take load = 10 kg, g = 10 m/s²)"
            steps={[
              "Identify the given parameters: Original Length L = 2 m. Area A = 1 mm² = 1 * 10^-6 m².",
              "Change in length ΔL = 1 mm = 1 * 10^-3 m. Force (Load) F = mg = 10 * 10 = 100 N.",
              "Calculate Longitudinal Strain: ε = ΔL / L = (1 * 10^-3) / 2 = 5 * 10^-4.",
              "Calculate Tensile Stress: σ = F / A = 100 / (1 * 10^-6) = 1 * 10^8 N/m².",
              "Compute Young's Modulus: Y = Stress / Strain = (1 * 10^8) / (5 * 10^-4) = 2 * 10^11 N/m²."
            ]}
            answer="Strain = 5×10^-4 | Stress = 10^8 N/m² | Y = 2×10^11 N/m²"
            color="violet"
          />

          <SolvedExample
            number={2}
            question="A uniform heavy copper rod of length L, cross-sectional area A, and density ρ is suspended vertically from one end. Find the elongation of the rod due to its own weight. (Young's modulus is Y)"
            steps={[
              "Consider a small element of thickness dx at a distance x from the free bottom end of the rod.",
              "The tension T(x) at this point is due to the weight of the rod below it: T(x) = mass<sub>below</sub> * g = (A * x * ρ) * g.",
              "The elongation d(ΔL) of this small element dx is given by: d(ΔL) = T(x) * dx / (A * Y) = (A * x * ρ * g * dx) / (A * Y) = (ρg / Y) * x dx.",
              "Integrate from x = 0 to x = L to find the total elongation: ΔL = ∫[0 to L] (ρg / Y) * x dx = (ρg / Y) * [x²/2] from 0 to L.",
              "Elongation ΔL = ρgL² / 2Y."
            ]}
            answer="ΔL = ρgL² / 2Y"
            color="violet"
          />
        </div>
      </div>

      {/* ── MODULE 2: Elastic Moduli & Poisson's Ratio ────────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={2} title="Elastic Moduli & Poisson's Ratio" difficulty={3} color="cyan" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaCard
              formula="Y = (F / A) / (ΔL / L) = F·L / (A·ΔL)"
              use_when="Young's Modulus: Used for longitudinal tensile or compressive deformation of solids (wires, rods)."
              priority="HIGH"
              freq_stars={5}
              difficulty_stars={2}
              color="cyan"
              copy_text="Y = (F*L)/(A*dL)"
            />
            <FormulaCard
              formula="B = -P / (ΔV / V) = -P·V / ΔV"
              use_when="Bulk Modulus: Used for volume changes under hydraulic pressure. Negative sign indicates volume decreases as pressure increases."
              priority="HIGH"
              freq_stars={4}
              difficulty_stars={2}
              color="cyan"
              copy_text="B = -P*V/dV"
            />
            <FormulaCard
              formula="&eta; = (F<sub>tangential</sub> / A) / &theta;"
              use_when="Shear Modulus (Rigidity): Used when a tangential force deforms shape but keeps volume constant."
              priority="MEDIUM"
              freq_stars={3}
              difficulty_stars={3}
              color="cyan"
              copy_text="eta = (F/A)/theta"
            />
            <FormulaCard
              formula="σ = - (Δd / d) / (ΔL / L)"
              use_when="Poisson's Ratio: Lateral contraction strain divided by longitudinal extension strain. Limits: Theoretical [-1, 0.5], Practical [0, 0.5]."
              priority="HIGH"
              freq_stars={4}
              difficulty_stars={3}
              color="cyan"
              copy_text="sigma = -(dd/d)/(dL/L)"
            />
          </div>

          {/* Poisson's Ratio & Compressibility Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex flex-col md:flex-row gap-4 items-center">
              <PoissonRatioDiagram />
              <div className="space-y-2 justify-center flex flex-col">
                <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">Poisson's Ratio (σ)</span>
                <p className="text-white/70 text-[12px] leading-relaxed">
                  When a wire is stretched longitudinally, it contracts laterally (becomes thinner). Poisson's ratio is the ratio of lateral strain to longitudinal strain:
                </p>
 <div className="text-cyan-300 text-[11px] bg-black/20 p-2 rounded">
                  σ = -Δd/d ÷ ΔL/L
                </div>
                <p className="text-white/50 text-[11px] leading-relaxed">
 Practical limits for isotropic solids are <span className="text-cyan-300">0 to 0.5</span>. A value of <span className="text-cyan-300">σ = 0.5</span> represents perfectly incompressible material (volume remains constant under stretching).
                </p>
              </div>
            </div>

            <div className="p-4.5 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-2 flex flex-col justify-center">
              <span className="text-[13px] font-bold text-violet-400 uppercase tracking-wider block">Compressibility (K)</span>
              <p className="text-white/70 text-[12px] leading-relaxed">
                Compressibility is the measure of the relative volume change of a fluid or solid as a response to a pressure change. It is defined as the **reciprocal of the Bulk Modulus (B)**:
              </p>
 <div className="text-violet-300 text-[12.5px] bg-black/20 p-2.5 rounded text-center">
                K = 1 / B = -(ΔV / V) / P
              </div>
              <p className="text-white/50 text-[11px] leading-relaxed">
 Unit: <span className="text-cyan-300">Pa⁻¹</span> (or <span className="text-cyan-300">m²/N</span>). A higher value of <span className="text-cyan-300">K</span> means the material is highly compressible (e.g., gases have very high compressibility compared to solids and liquids).
              </p>
            </div>
          </div>

          {/* Tap to Reveal Concept check */}
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-4.5 space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Interactive Concept Check</h4>
            
            <div className="space-y-2">
              <button
                onClick={() => setRevealModulus(!revealModulus)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-cyan-400"
              >
                <span>🧪 Does Young's Modulus depend on the length of a wire?</span>
                {revealModulus ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {revealModulus && (
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[13px] text-white/70 leading-relaxed font-sans space-y-2">
                  <p>
                    **Absolutely NOT!** Young&apos;s Modulus (Y) is a **pure material property** (like resistivity or density). It depends solely on the chemical composition and crystal structure of the metal. 
                  </p>
                  <p>
                    If a wire is cut in half, the extension ΔL under the same load will be halved, but the ratio <code className="text-cyan-300">Stress / Strain</code> remains exactly constant. Young&apos;s modulus remains unchanged!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SolvedExample
            number={3}
            question="Find the fractional compression in the volume of water at the bottom of an ocean of depth 2000 m. (Take bulk modulus of water B = 2.2 * 10^9 N/m², density ρ = 1000 kg/m³, and g = 10 m/s²)"
            steps={[
              "Calculate the gauge pressure at depth h = 2000 m: P = ρgh.",
              "P = 1000 * 10 * 2000 = 2 * 10^7 N/m² (Pascal).",
              "From Bulk Modulus definition: B = -P / (ΔV / V)  →  Fractional Volume Compression is -ΔV / V = P / B.",
              "Substitute values: -ΔV / V = (2 * 10^7) / (2.2 * 10^9) = 1 / 110 ≈ 0.009.",
              "Express as percentage: Volume changes by approximately 0.9%."
            ]}
            answer="-ΔV / V = 9×10^-3 (0.9% change)"
            color="cyan"
          />

          <SolvedExample
            number={4}
            question="For a metal wire, show that the fractional change in its volume (ΔV/V) is related to longitudinal strain (ΔL/L) and Poisson's ratio (σ) by: ΔV/V = (1 - 2σ) * (ΔL/L)."
            steps={[
              "Volume of a cylindrical wire of length L and radius r is: V = π * r² * L.",
              "Take the natural log on both sides: ln V = ln(π) + 2 ln r + ln L.",
              "Differentiate to find fractional increments: dV/V = 2 (dr/r) + dL/L.",
              "From Poisson's ratio definition: σ = - (dr/r) / (dL/L)  →  dr/r = -σ * (dL/L).",
              "Substitute dr/r back into the volume increment equation: dV/V = 2 * (-σ * dL/L) + dL/L = (1 - 2σ) * (dL/L)."
            ]}
            answer="ΔV/V = (1 - 2σ) * (ΔL/L)"
            color="cyan"
          />
        </div>
      </div>

      {/* ── MODULE 3: Stress-Strain Curve & Strain Energy ──────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={3} title="Stress-Strain Curve & Strain Energy" difficulty={4} color="amber" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
            <p>
              When we continuously increase tensile load on a metallic wire, its behavior goes through distinct regions as shown on the **Stress-Strain curve** below:
            </p>
          </div>

          {/* SVG: Stress-Strain Curve */}
          <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
            <svg width="380" height="200" viewBox="0 0 380 200" className="max-w-full">
              {/* Axes */}
              <line x1="40" y1="160" x2="350" y2="160" stroke="#cccccc" strokeWidth="2" markerEnd="url(#x-arrow)" />
              <line x1="40" y1="160" x2="40" y2="20" stroke="#cccccc" strokeWidth="2" markerEnd="url(#y-arrow)" />
              <text x="340" y="175" fill="#cccccc" fontSize="8" fontFamily="monospace" textAnchor="middle">Strain (ε)</text>
              <text x="25" y="30" fill="#cccccc" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 25 30)">Stress (σ)</text>

              {/* Stress-strain curve path */}
              {/* Proportional Limit A: straight line from (40,160) to (120,80) */}
              {/* Elastic Limit B: curved to (155,70) */}
              {/* Yielding C: curves down then up to (250,50) (UTS) */}
              {/* Fracture D: drop to (300,90) */}
              <path d="M 40 160 L 120 90 Q 140 75 160 75 T 200 65 Q 240 50 270 50 T 320 85" fill="none" stroke="#f59e0b" strokeWidth="2" />
              
              {/* Points labels */}
              <circle cx="120" cy="90" r="3" fill="#f59e0b" />
              <text x="115" y="83" fill="#ffffff" fontSize="8" fontWeight="bold">A</text>
              
              <circle cx="160" cy="75" r="3" fill="#f59e0b" />
              <text x="158" y="68" fill="#ffffff" fontSize="8" fontWeight="bold">B</text>
              
              <circle cx="270" cy="50" r="3" fill="#f59e0b" />
              <text x="270" y="42" fill="#ffffff" fontSize="8" fontWeight="bold">C (UTS)</text>
              
              <circle cx="320" cy="85" r="3" fill="#f59e0b" />
              <text x="325" y="93" fill="#ffffff" fontSize="8" fontWeight="bold">D</text>

              {/* Legend Callouts */}
              <path d="M 120 90 L 90 60" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
              <text x="85" y="55" fill="#a78bfa" fontSize="7" textAnchor="middle">Proportional Limit (Hooke&apos;s Law)</text>

              <path d="M 160 75 L 180 40" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
              <text x="185" y="35" fill="#60a5fa" fontSize="7" textAnchor="middle">Elastic Limit / Yield Point</text>

              <path d="M 320 85 L 340 120" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
              <text x="340" y="130" fill="#f87171" fontSize="7" textAnchor="middle">Fracture Point</text>

              {/* Permanent Set Dotted Line */}
              <line x1="160" y1="75" x2="90" y2="160" stroke="#f87171" strokeWidth="1" strokeDasharray="2 2" />
              <text x="90" y="155" fill="#f87171" fontSize="6" textAnchor="middle">Permanent Set</text>
              
              <defs>
                <marker id="x-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#cccccc" />
                </marker>
                <marker id="y-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#cccccc" />
                </marker>
              </defs>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 3.1: Complete Stress-Strain profile showing hookean, yield, necking, and breaking boundaries
            </div>
          </div>

          {/* Interactive Curve description drawer */}
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-4.5 space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Curve Regions Explained</h4>
            <div className="space-y-2">
              <button
                onClick={() => setRevealCurve(!revealCurve)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-amber-400"
              >
                <span>📈 Show detailed region definitions (A to D)</span>
                {revealCurve ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {revealCurve && (
                <div className="p-4.5 bg-white/[0.02] rounded-xl border border-white/5 text-[13px] text-white/70 leading-relaxed font-sans space-y-3">
                  <div>
 <strong className="text-amber-400">O to A (Proportional Region):</strong>
                    <p className="mt-0.5">Stress is directly proportional to strain. Hooke&apos;s Law is fully valid here. The slope of this line equals Young&apos;s Modulus (Y).</p>
                  </div>
                  <div>
 <strong className="text-amber-400">A to B (Elastic Limit / Yield Point):</strong>
                    <p className="mt-0.5">Stress is no longer strictly proportional to strain, but the body remains elastic. If load is removed at B, the material returns to its original dimensions.</p>
                  </div>
                  <div>
 <strong className="text-amber-400">B to C (Plastic deformation & UTS):</strong>
                    <p className="mt-0.5">Beyond B, the material goes into plastic deformation. Even when deforming force is removed, a permanent deformation (Permanent Set) remains. C is the Ultimate Tensile Strength (UTS), where the material undergoes necking (localized thinning).</p>
                  </div>
                  <div>
 <strong className="text-amber-400">C to D (Fracture/Breaking):</strong>
                    <p className="mt-0.5">Beyond C, strain increases even with reduced stress until it fractures at D. If C and D are close, the material is **brittle** (like glass). If C and D are far apart, it is **ductile** (like copper or steel).</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ductile vs Brittle Materials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center">
              <DuctileBrittleCurvesDiagram />
 <div className="text-[11px] text-white/40 uppercase tracking-widest text-center mt-2">
                Figure 3.2: Ductile (Large Plastic Zone) vs Brittle (Sudden Fracture)
              </div>
            </div>
            <div className="space-y-3 justify-center flex flex-col">
 <div className="text-[13px] font-bold text-amber-400 uppercase tracking-wider">Ductile vs. Brittle Materials</div>
              <div className="overflow-x-auto rounded-xl border border-white/5">
                <table className="w-full text-left border-collapse text-[12px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5 text-white font-bold">
                      <th className="p-2.5">Property</th>
                      <th className="p-2.5 text-cyan-400">Ductile</th>
                      <th className="p-2.5 text-rose-400">Brittle</th>
                    </tr>
                  </thead>
 <tbody className="text-white/70">
                    <tr className="border-b border-white/5">
                      <td className="p-2.5 font-semibold text-white font-sans">Plastic Zone</td>
                      <td className="p-2.5">Large (Obeys Necking)</td>
                      <td className="p-2.5">Negligible / Small</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2.5 font-semibold text-white font-sans">UTS &amp; Fracture Points</td>
                      <td className="p-2.5">Far apart</td>
                      <td className="p-2.5">Extremely close</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2.5 font-semibold text-white font-sans">Deformation before Break</td>
                      <td className="p-2.5">Significant elongation</td>
                      <td className="p-2.5">Fractures suddenly</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold text-white font-sans">Common Examples</td>
                      <td className="p-2.5 text-cyan-300">Copper, Steel, Gold</td>
                      <td className="p-2.5 text-rose-300">Glass, Cast Iron, Ceramic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Conceptual Moduli, Breaking Stress and Fatigue Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4.5 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2.5">
 <span className="text-[13px] font-bold text-amber-300 uppercase tracking-wider block">Yield Stress vs. Breaking (Ultimate) Stress</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                It is vital to distinguish between these two threshold stresses:
              </p>
 <ul className="list-disc list-inside text-white/60 text-[12px] space-y-1.5 pl-2">
                <li><strong>Yield Stress (Elastic Limit):</strong> The stress at point B where plastic (permanent) deformation begins.</li>
                <li><strong>Breaking Stress (Fracture Point):</strong> The stress at point D where the wire actually snaps. It depends only on the material (not length or radius).</li>
                <li><strong>Work-Hardening:</strong> Repeatedly deforming a material past its yield point introduces crystal dislocations, increasing its yield strength but making it more brittle.</li>
              </ul>
            </div>

            <div className="p-4.5 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-3">
 <span className="text-[13px] font-bold text-violet-300 uppercase tracking-wider block">Elastic After-Effect &amp; Fatigue</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                <strong>Elastic After-Effect:</strong> The delay in returning to the original configuration after load removal. Quartz and phosphor-bronze have nearly zero delay (used in galvanometers), while glass has a long delay.
              </p>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                <strong>Elastic Fatigue:</strong> The loss of elastic strength of a material under continuous alternating strain. Bridges are declared unsafe after decades of use due to cumulative elastic fatigue.
              </p>
            </div>
          </div>

          {/* Reference Table of Moduli values */}
          <div className="rounded-xl border border-white/5 overflow-hidden">
 <div className="bg-white/5 px-4 py-2.5 text-[13px] font-bold text-white uppercase tracking-wider">Typical Elastic Moduli Values (Reference)</div>
            <table className="w-full text-left border-collapse text-[12.5px]">
              <thead>
 <tr className="bg-white/[0.02] border-b border-white/5 text-white/50">
                  <th className="p-2.5">Material</th>
                  <th className="p-2.5 text-cyan-300">Young's Modulus (Y &times; 10¹⁰ Pa)</th>
                  <th className="p-2.5 text-emerald-300">Bulk Modulus (B &times; 10¹⁰ Pa)</th>
                  <th className="p-2.5 text-violet-300">Shear Modulus (&eta; &times; 10¹⁰ Pa)</th>
                </tr>
              </thead>
 <tbody className="divide-y divide-white/5 text-white/75">
                <tr>
                  <td className="p-2.5 text-white font-semibold font-sans">Steel</td>
                  <td className="p-2.5">20.0</td>
                  <td className="p-2.5">16.0</td>
                  <td className="p-2.5">8.4</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-white font-semibold font-sans">Copper</td>
                  <td className="p-2.5">11.0</td>
                  <td className="p-2.5">14.0</td>
                  <td className="p-2.5">4.2</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-white font-semibold font-sans">Glass</td>
                  <td className="p-2.5">6.0</td>
                  <td className="p-2.5">3.7</td>
                  <td className="p-2.5">2.5</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-white font-semibold font-sans">Lead</td>
                  <td className="p-2.5">1.6</td>
                  <td className="p-2.5">5.0</td>
                  <td className="p-2.5">0.6</td>
                </tr>
                <tr className="bg-rose-500/5">
                  <td className="p-2.5 text-rose-300 font-semibold font-sans">Rubber</td>
                  <td className="p-2.5 text-rose-300">0.0005 (5 &times; 10⁻⁴)</td>
                  <td className="p-2.5">&mdash;</td>
                  <td className="p-2.5">&mdash;</td>
                </tr>
              </tbody>
            </table>
            <div className="p-3 bg-white/[0.02] text-[11px] text-white/40 leading-relaxed">
              *Notice that Steel is about <strong>40,000 times more elastic</strong> than Rubber! In physics, &quot;elasticity&quot; is the resistance to deformation, meaning steel requires much higher force to produce the same strain.
            </div>
          </div>

          {/* Strain Energy Formulas */}
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4 pt-2">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Elastic Potential Energy (Strain Energy)</h4>
            <p>
              When a wire is stretched, work is done against internal restoring forces. This work is stored as elastic potential energy:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="bg-[#05060F] p-4 rounded-xl border border-white/5 text-[13px] text-center text-amber-300">
                <span className="text-white/40 block text-[10px] tracking-wider uppercase mb-1">Total Stored Work Done</span>
                W = (1/2) * Force * Extension = (1/2) * F * ΔL
              </div>
 <div className="bg-[#05060F] p-4 rounded-xl border border-white/5 text-[13px] text-center text-amber-300">
                <span className="text-white/40 block text-[10px] tracking-wider uppercase mb-1">Strain Energy Density (u)</span>
                u = (1/2) * Stress * Strain = (1/2) * Y * Strain²
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SolvedExample
            number={5}
            question="Two steel wires have lengths in ratio 1:2 and radii in ratio 2:1. If they are stretched by the same force, find the ratio of their stored elastic potential energy."
            steps={[
              "Stored Elastic Energy is given by: W = (1/2) * F * ΔL.",
              "Substitute ΔL = F * L / (A * Y): W = (1/2) * F² * L / (A * Y) = F² * L / (2 * π * r² * Y).",
              "Given that Y and F are identical: energy W is proportional to L / r².",
              "Therefore, the ratio is: W₁ / W₂ = (L₁ / L₂) * (r₂ / r₁)².",
              "Substitute ratios L₁/L₂ = 1/2 and r₁/r₂ = 2/1  →  W₁/W₂ = (1/2) * (1/2)² = 1 / 8."
            ]}
            answer="W₁ / W₂ = 1 : 8"
            color="amber"
          />

          <SolvedExample
            number={6}
            question="If the stress in a stretched wire is increased by 10%, find the percentage change in the elastic potential energy density stored in the wire."
            steps={[
              "Stored energy density is: u = Stress&sup2; / 2Y.",
              "Since Young's Modulus Y is constant for a given material, energy density is proportional to the square of Stress: u &prop; Stress&sup2;.",
              "Let new Stress be 1.1 * Stress<sub>original</sub> (10% increase).",
              "New energy density: u<sub>new</sub> &prop; (1.1 * Stress<sub>original</sub>)&sup2; = 1.21 * Stress<sub>original</sub>&sup2;.",
              "Calculate percentage increase: (u<sub>new</sub> - u) / u = (1.21 - 1) = 0.21, which corresponds to a 21% increase."
            ]}
            answer="Percentage Increase = 21%"
            color="amber"
          />
        </div>
      </div>

      {/* ── MODULE 4: Applications of Elastic Behavior ─────────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={4} title="Applications of Elastic Behavior" difficulty={3} color="emerald" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
            <p>
              Elastic parameters directly dictate structural limit boundaries. Three elite exam applications are highly tested:
            </p>
          </div>

          <div className="space-y-4">
            {/* Application 1: Bending of beams */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-xl space-y-4">
 <span className="text-[12px] font-bold text-emerald-400 tracking-wider block uppercase">1. Bending of a Beam (Girders)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 justify-center flex flex-col">
                  <p className="text-[13px] leading-relaxed text-white/70">
                    A beam of length L, breadth b, and depth d supported at ends and loaded at the center by weight W undergoes a mid-point depression &delta; given by:
                  </p>
 <div className="bg-black/20 p-2.5 rounded-lg border border-white/5 text-[13px] text-emerald-300 text-center">
                    &delta; = W &middot; L&sup3; / (4 &middot; Y &middot; b &middot; d&sup3;)
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/60">
                    &rarr; **Key Exam Hook**: To minimize depression &delta; and prevent buckling, the depth d should be large because &delta; is inversely proportional to d&sup3; (doubling depth decreases bending by a factor of 8!).
                  </p>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center">
                  <IBeamCrossSectionDiagram />
 <div className="text-[11px] text-white/40 uppercase tracking-widest text-center mt-2">
                    Figure 4.1: I-Beam Cross Section (Depth Maximization)
                  </div>
                </div>
              </div>
            </div>

            {/* Application 2: Mountain Heights */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-xl space-y-2">
 <span className="text-[12px] font-bold text-emerald-400 tracking-wider block uppercase">2. Max Height of a Mountain on Earth</span>
              <p className="text-[13px] leading-relaxed text-white/70">
                At the base of a mountain of height h, the pressure stress exerted due to the weight of the rock is P = hρg. For the mountain to stand without collapsing, this stress must not exceed the elastic yield strength (σ_yield) of the rock.
              </p>
 <div className="bg-[#05060F] p-2.5 rounded-lg border border-white/5 text-[13px] text-emerald-300 text-center">
                h_max ≈ σ_yield / (ρ * g)
              </div>
 <p className="text-[13px] leading-relaxed text-white/60 text-[12px]">
                For typical granite rock (σ_yield ≈ 3 * 10^8 N/m², ρ ≈ 3 * 10³ kg/m³, g = 10 m/s²):
                <br />
                h_max ≈ (3 * 10^8) / (3 * 10³ * 10) = 10,000 m = 10 km. (Matches Everest closely!)
              </p>
            </div>

            {/* Application 3: Cranes metallic ropes */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-xl space-y-2">
 <span className="text-[12px] font-bold text-emerald-400 tracking-wider block uppercase">3. Metallic Ropes in Cranes</span>
              <p className="text-[13px] leading-relaxed text-white/70">
                A crane lifting load M must use a wire rope of radius r such that the tensile stress does not exceed the yield strength (with a safety factor of ~10):
              </p>
 <div className="bg-[#05060F] p-2.5 rounded-lg border border-white/5 text-[13px] text-emerald-300 text-center">
                Stress = Mg / (π * r²) &lt; σ_yield / 10  →  r &gt; √[10 * Mg / (π * σ_yield)]
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SolvedExample
            number={7}
            question="A load W is suspended from a wire of length L and area A. If the wire undergoes an extension ΔL, calculate: (i) the work done by the gravity load, and (ii) the elastic energy stored in the wire. Account for the difference."
            steps={[
              "The gravity load drops vertically by ΔL. Therefore, Work done by gravity load is: W_gravity = Force * displacement = W * ΔL.",
              "The elastic potential energy stored in the wire is: U = (1/2) * Force * extension = (1/2) * W * ΔL.",
              "We observe a difference: U = W_gravity / 2. Only half of the gravity work is stored as elastic energy.",
              "The remaining half (1/2 * W * ΔL) is dissipated as heat in the wire during stretching due to internal molecular damping."
            ]}
            answer="Work = W·ΔL | Stored Energy = (1/2)W·ΔL | 50% lost as heat"
            color="emerald"
          />

          <SolvedExample
            number={8}
            question="A steel wire of length L and cross-section area A is held rigid between two fixed walls. If the temperature of the wire drops by ΔT, find the thermal tension developed in the wire. (Young's modulus is Y, coefficient of linear expansion is α)"
            steps={[
              "When temperature drops, the wire attempts to contract. Its free contraction would be: ΔL = L * α * ΔT.",
              "Since the walls are rigid, the walls exert a force F pulling it back, maintaining its original length. The strain is: ε = ΔL / L = α * ΔT.",
              "From Young's Modulus: Stress = Y * Strain  →  F / A = Y * α * ΔT.",
              "Solve for Thermal Tension Force: F = Y * A * α * ΔT.",
              "Note that the thermal stress (F/A) is completely independent of the length of the wire!"
            ]}
            answer="Tension F = Y * A * α * ΔT"
            color="emerald"
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
              <strong className="text-emerald-400">Beam bending depression:</strong>
              <br />
              δ = WL³ / 4Ybd³. Breadth b and depth d positions in the formula are critical. Depth has cubic dependency.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Thermal Stress tension:</strong>
              <br />
              F = Y·A·α·ΔT. Very common IAT numerical shortcut. Remind yourself that L cancels out.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Energy Density options:</strong>
              <br />
              u = (1/2)·σ·ε = (1/2)·Y·ε² = σ² / 2Y. Memorize all three forms to save algebra time.
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
              <strong className="text-amber-400">Specific values of Young's Modulus:</strong>
              <br />
              Y values for steel, copper, or rubber are always provided. Just remember steel is more elastic than copper, which is more elastic than rubber (Y_steel &gt; Y_copper &gt; Y_rubber).
            </li>
            <li className="leading-relaxed">
              <strong className="text-amber-400">Complex inter-moduli formulas:</strong>
              <br />
              Relationships like Y = 3B(1-2σ) or Y = 2η(1+σ) are rarely queried in their raw algebraic forms. Focus on basic definitions.
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
                <div className="text-white font-bold">Question says: &quot;Steel vs Rubber elasticity&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Steel is more elastic because for the same strain, steel requires a much larger stress (Y_steel ≫ Y_rubber).
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Wire stretched by load and mass is given&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Pay attention to whether the wire has its own mass or if it is massless. If uniform heavy wire, the elongation is halved (ΔL = ρgL²/2Y).
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Poisson's ratio volume change&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: If volume remains constant under stretching, then ΔV/V = 0  →  (1 - 2σ) = 0  →  σ = 0.5. A Poisson&apos;s ratio of 0.5 represents a perfectly incompressible material!
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
              <strong className="text-rose-400">Trap 1: The Dimension Modulus Trap</strong>
              <br />
              Assuming that cutting a wire changes its Young's modulus. This is a classic trap! Young's modulus is a material property. Extension changes, strain changes, but Y is invariant.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 2: The stretching work multiplier</strong>
              <br />
              Assuming the work done to stretch a wire is F * ΔL. Work done by the stretching * force* is F * ΔL, but the elastic potential energy stored is only 1/2 * F * ΔL. The other half is lost as thermal heat.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 3: Area vs Radius square</strong>
              <br />
              Forgetting that area is proportional to the square of radius (A = πr²). If radius is halved, area becomes 1/4th, meaning stress under the same force increases by 4 times!
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
            <span><strong>Hooke&apos;s Law</strong>: Stress = E * Strain. Valid only within the proportional limit.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Young&apos;s Modulus</strong>: Y = FL / (A·ΔL). Invariant under wire cuts or dimensional changes.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Bulk Modulus</strong>: B = -PV / ΔV. Inverse of Bulk Modulus is Compressibility K = 1/B.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Strain Energy</strong>: W = 1/2 F·ΔL. Energy density u = 1/2 * Stress * Strain = Y·ε² / 2.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Poisson&apos;s Ratio</strong>: σ = - (dr/r) / (dL/L). Practical bounds are 0 to 0.5.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Girder Bending</strong>: Depression δ = WL³ / 4Ybd³. Increase depth d to prevent structural sag.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Thermal Stress Tension</strong>: F = YAαΔT. Independent of wire length.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
