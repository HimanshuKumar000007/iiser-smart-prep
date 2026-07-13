import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  BookOpen, Zap, Brain, Copy, Check, RefreshCw
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
      <p className="text-white text-[13px] font-semibold leading-relaxed font-mono" dangerouslySetInnerHTML={{ __html: question }}></p>
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
        <span className="text-emerald-400 font-bold" dangerouslySetInnerHTML={{ __html: answer }}></span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ThermodynamicsLessonDetail({ progress, isCompleted = false, onNavigate }: Props) {
  const [revealConventions, setRevealConventions] = useState(false);
  const [revealCycles, setRevealCycles] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(12).fill(false));

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 font-sans">
      
      {/* ── HEADER Mockup ──────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl border border-white/5 bg-[#0A0C18] p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Physics Unit 9
            </span>
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
              IAT Advanced
            </span>
          </div>
 <div className="flex items-center gap-1 text-[12px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 animate-pulse" /> hot topic
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Thermodynamics
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
 <p className="text-white/60 text-[13px] sm:text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-400" /> 40 min intensive review
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3.5 pt-2">
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-3 text-center space-y-1 hover:border-violet-500/20 transition-colors">
 <span className="text-white/40 text-[10px] uppercase tracking-wider block">Revision Time</span>
 <span className="text-white font-extrabold text-[13px] sm:text-sm block">40 Min</span>
          </div>
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-3 text-center space-y-1 hover:border-violet-500/20 transition-colors">
 <span className="text-white/40 text-[10px] uppercase tracking-wider block">Difficulty</span>
 <span className="text-white font-extrabold text-[13px] sm:text-sm block text-rose-400">★★★★☆</span>
          </div>
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-3 text-center space-y-1 hover:border-violet-500/20 transition-colors">
 <span className="text-white/40 text-[10px] uppercase tracking-wider block">Expected Questions</span>
 <span className="text-white font-extrabold text-[13px] sm:text-sm block text-cyan-400">2–3 Qs</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between text-[13px] font-semibold">
            <span className="text-white/50">Lesson Progress</span>
 <span className={cn("font-bold", isCompleted ?"text-emerald-400" :"text-amber-400")}>
              {isCompleted ? "Completed • Quiz Passed" : progress > 0 ? `${Math.round(progress)}% Read` : "Reading Content"}
            </span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-300", isCompleted ? "bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-cyan-500")}
              style={{ width: `${isCompleted ? 100 : Math.max(2, progress)}%` }}
            />
            {!isCompleted && progress > 0 && progress < 100 && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4] transition-all duration-300"
                style={{ left: `calc(${progress}% - 4px)` }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── CHAPTER SNAPSHOT ───────────────────────────────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4">
 <h3 className="text-white font-display font-bold text-[13px] uppercase tracking-widest flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-400" /> 📘 Chapter Snapshot
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] text-white/80">
 <div className="space-y-2">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-white/40">Prerequisites</span>
              <span className="text-white font-semibold">Ideal Gas Laws, Kinetic Theory</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="text-white/40">Expected Focus</span>
              <span className="text-amber-300 font-semibold">First Law, Polytropic Index, Carnot Efficiency</span>
            </div>
            <div className="flex justify-between pb-1.5">
              <span className="text-white/40">Weightage</span>
              <span className="text-emerald-400 font-semibold">High (2-3 Qs)</span>
            </div>
          </div>
          <div className="space-y-1.5 font-sans leading-relaxed">
 <strong className="text-white text-[12px] uppercase tracking-wider block">Core Skills You will Learn:</strong>
            <ul className="list-disc pl-4 space-y-1 text-white/70">
              <li>Balancing Heat (Q), Work (W), and Internal Energy (U) signs correctly</li>
              <li>Calculating molar heat capacity C for any general polytropic process (PV<sup>x</sup> = constant)</li>
              <li>Evaluating cycles and finding thermodynamic efficiency (η) of heat engines and COPs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── MODULE 1: First Law & Sign Conventions ─────────────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={1} title="First Law of Thermodynamics & Sign Conventions" difficulty={3} color="violet" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          {/* Zeroth Law & Equation of State */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-3.5">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-violet-400" /> Foundations: Thermal Equilibrium & Zeroth Law
            </span>
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
              <p>
                <strong>Thermal Equilibrium:</strong> Two macroscopic systems are in thermal equilibrium if, when placed in thermal contact, there is no net exchange of heat energy between them. They share the exact same temperature.
              </p>
              <p>
                <strong>Zeroth Law of Thermodynamics:</strong> If two systems A and B are each in thermal equilibrium with a third system C, then A and B are in thermal equilibrium with each other.
              </p>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-white/70 italic text-[12px]">
                *Physical Significance: This law defines temperature as a measurable state function and establishes the physical basis for thermometry (system C acts as the thermometer).
              </div>
              <p>
                <strong>Equation of State:</strong> A mathematical relation connecting state variables (P, V, T). For μ moles of an ideal gas, it is:
                <code className="text-cyan-300 font-mono ml-1 text-[13px]">PV = μRT</code> (where T must be in Kelvin).
              </p>
            </div>
          </div>

          <div className="bg-black/45 p-4 rounded-xl border border-violet-500/20 text-center space-y-1">
 <span className="text-white/40 text-[10px] uppercase tracking-wider">The First Law Equation</span>
 <div className="text-[21px] font-bold text-violet-300">dQ = dU + dW</div>
            <p className="text-[12px] text-white/60">
              Heat added to a system equals the change in its internal energy plus the work done BY the system (Energy Conservation).
            </p>
          </div>

          {/* Work, Internal Energy & Free Expansion Definitions */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-4">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-violet-400" /> Fundamental Definitions: Work, Internal Energy & Free Expansion
            </span>
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3.5 font-sans">
              <p>
                <strong>1. General Work Integral:</strong> The thermodynamic work done by a gas during volume change from V<sub>i</sub> to V<sub>f</sub> is given by the integral:
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">W = &int; P dV</code>
                This represents the area under the curve on a pressure-volume indicator diagram. If the gas expands (dV &gt; 0), work is positive (done BY the gas). If it is compressed (dV &lt; 0), work is negative (done ON the gas).
              </p>
              
              {/* SVG Diagram: Work as Area Under Curve */}
              <div className="p-3 bg-black/45 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <svg viewBox="0 0 240 130" className="w-full max-w-xs mx-auto">
                  <line x1="25" y1="10" x2="25" y2="110" stroke="#6b7280" strokeWidth="1" />
                  <line x1="25" y1="110" x2="220" y2="110" stroke="#6b7280" strokeWidth="1" />
                  <text x="18" y="15" fill="#ffffff50" fontSize="7" textAnchor="end">P</text>
                  <text x="215" y="120" fill="#ffffff50" fontSize="7">V</text>
                  {/* Shaded Area */}
                  <path d="M 60 70 Q 120 40 180 30 L 180 110 L 60 110 Z" fill="#c084fc" fillOpacity="0.15" />
                  {/* Curve */}
                  <path d="M 60 70 Q 120 40 180 30" fill="none" stroke="#a78bfa" strokeWidth="2" />
                  {/* Limits */}
                  <line x1="60" y1="70" x2="60" y2="110" stroke="#ffffff30" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="180" y1="30" x2="180" y2="110" stroke="#ffffff30" strokeWidth="0.8" strokeDasharray="2 2" />
                  <text x="60" y="118" fill="#ffffff60" fontSize="6.5" textAnchor="middle">V<sub>i</sub></text>
                  <text x="180" y="118" fill="#ffffff60" fontSize="6.5" textAnchor="middle">V<sub>f</sub></text>
                  <text x="120" y="75" fill="#c084fc" fontSize="8" fontWeight="bold" textAnchor="middle">Work = &int; P dV (Area)</text>
                </svg>
 <span className="text-[11px] text-white/40 uppercase tracking-wider text-center">Figure 1.1: Work done represented as the area under a PV curve</span>
              </div>

              {/* SVG Diagram: Work Sign Convention (Piston Expansion vs Compression) */}
              <div className="p-3 bg-black/45 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <svg viewBox="0 0 240 100" className="w-full max-w-xs mx-auto">
                  <defs>
                    <marker id="arrow-cyan-scale-p" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                    </marker>
                    <marker id="arrow-red-scale-p" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                    </marker>
                  </defs>
                  {/* Expansion Cylinder */}
                  <g transform="translate(10, 0)">
                    <rect x="15" y="20" width="80" height="45" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                    {/* Gas inside */}
                    <rect x="15" y="20" width="50" height="45" fill="#a78bfa" fillOpacity="0.08" />
                    {/* Piston head */}
                    <rect x="65" y="20" width="6" height="45" fill="#a78bfa" stroke="#a78bfa" strokeWidth="1" />
                    {/* Piston shaft */}
                    <rect x="71" y="40" width="25" height="5" fill="#a78bfa" />
                    {/* Expansion arrow */}
                    <path d="M 68 12 L 88 12" fill="none" stroke="#22d3ee" strokeWidth="1.2" markerEnd="url(#arrow-cyan-scale-p)" />
                    <text x="78" y="8" fill="#22d3ee" fontSize="6.5" textAnchor="middle">dV &gt; 0</text>
                    <text x="50" y="80" fill="#ffffff70" fontSize="7" textAnchor="middle">1. Expansion (Work BY Gas)</text>
                    <text x="50" y="90" fill="#22d3ee" fontSize="7.5" fontWeight="bold" textAnchor="middle">W &gt; 0 (Positive)</text>
                  </g>

                  {/* Compression Cylinder */}
                  <g transform="translate(130, 0)">
                    <rect x="15" y="20" width="80" height="45" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                    {/* Gas inside */}
                    <rect x="15" y="20" width="70" height="45" fill="#a78bfa" fillOpacity="0.08" />
                    {/* Piston head */}
                    <rect x="85" y="20" width="6" height="45" fill="#a78bfa" stroke="#a78bfa" strokeWidth="1" />
                    {/* Piston shaft */}
                    <rect x="91" y="40" width="10" height="5" fill="#a78bfa" />
                    {/* Compression arrow */}
                    <path d="M 92 12 L 72 12" fill="none" stroke="#f43f5e" strokeWidth="1.2" markerEnd="url(#arrow-red-scale-p)" />
                    <text x="82" y="8" fill="#f43f5e" fontSize="6.5" textAnchor="middle">dV &lt; 0</text>
                    <text x="50" y="80" fill="#ffffff70" fontSize="7" textAnchor="middle">2. Compression (Work ON Gas)</text>
                    <text x="50" y="90" fill="#f43f5e" fontSize="7.5" fontWeight="bold" textAnchor="middle">W &lt; 0 (Negative)</text>
                  </g>
                </svg>
 <span className="text-[11px] text-white/40 uppercase tracking-wider text-center">Figure 1.1b: Thermodynamic sign convention for work done</span>
              </div>

              <p>
                <strong>2. Internal Energy (Ideal Gas):</strong> The internal energy (U) of an ideal gas represents the total kinetic energy of its molecules. It depends strictly on temperature (T) and degrees of freedom (f):
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">U = (f/2) &mu; R T</code>
                where &mu; is the number of moles. Consequently, the change in internal energy is always dU = (f/2) &mu; R dT = &mu; C<sub>v</sub> dT for any thermodynamic path of an ideal gas.
              </p>

              <p>
                <strong>3. Free Expansion (Joule Expansion):</strong> An irreversible process where a gas expands spontaneously into an evacuated chamber (vacuum) with zero resistance.
              </p>
              
              {/* SVG Diagram: Free Expansion */}
              <div className="p-3 bg-black/45 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <svg viewBox="0 0 240 100" className="w-full max-w-xs mx-auto">
                  {/* Container outline */}
                  <rect x="20" y="15" width="200" height="60" rx="4" fill="none" stroke="#6b7280" strokeWidth="1.5" />
                  {/* Insulating boundary */}
                  <rect x="16" y="11" width="208" height="68" rx="6" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                  {/* Center partition */}
                  <line x1="120" y1="15" x2="120" y2="75" stroke="#9ca3af" strokeWidth="2" strokeDasharray="3 1" />
                  <text x="120" y="10" fill="#f87171" fontSize="7" textAnchor="middle">Insulating Partition (Removed)</text>
                  
                  {/* Left Chamber: Gas molecules */}
                  <text x="70" y="38" fill="#a78bfa" fontSize="9" fontWeight="bold" textAnchor="middle">Ideal Gas</text>
                  <text x="70" y="52" fill="#ffffff50" fontSize="7" textAnchor="middle">P, V<sub>i</sub>, T<sub>i</sub></text>
                  {/* Small particles representing molecules */}
                  <circle cx="40" cy="30" r="1.5" fill="#a78bfa" />
                  <circle cx="50" cy="45" r="1.5" fill="#a78bfa" />
                  <circle cx="85" cy="32" r="1.5" fill="#a78bfa" />
                  <circle cx="95" cy="55" r="1.5" fill="#a78bfa" />
                  <circle cx="45" cy="62" r="1.5" fill="#a78bfa" />
                  
                  {/* Right Chamber: Vacuum */}
                  <text x="170" y="45" fill="#ffffff30" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">VACUUM</text>
                  <text x="170" y="56" fill="#ffffff20" fontSize="7" textAnchor="middle">P<sub>ext</sub> = 0</text>
                </svg>
 <span className="text-[11px] text-white/40 uppercase tracking-wider text-center">Figure 1.2: Free expansion of an ideal gas into a vacuum</span>
              </div>

              <div className="p-3.5 bg-rose-500/[0.03] border border-rose-500/20 rounded-xl space-y-2 text-[12.5px]">
 <strong className="text-rose-400 block uppercase tracking-wider text-[11px]">⚠️ The Physics of Free Expansion (High-Weightage Concept):</strong>
                <p className="text-white/70">
                  Since the expansion occurs against vacuum, no opposing force exists, making external work <strong>W = 0</strong>. Because the walls are perfectly insulated (adiabatic container), <strong>Q = 0</strong>.
                </p>
                <p className="text-white/70">
                  Applying the First Law: dQ = dU + dW &rarr; 0 = dU + 0 &rarr; <strong>dU = 0</strong>.
                </p>
                <p className="text-white/70">
                  For an ideal gas, since dU = 0, the temperature remains completely constant (<strong>&Delta;T = 0</strong>, T<sub>f</sub> = T<sub>i</sub>).
                </p>
                <p className="text-white/65 italic">
                  *Why is it Irreversible? Free expansion is highly spontaneous and irreversible because the gas cannot contract back into the left chamber without external work. Since it is irreversible, the entropy of the universe increases (&Delta;S<sub>universe</sub> &gt; 0), even though Q = 0.
                </p>
              </div>
            </div>
          </div>

          {/* Sign Conventions */}
          <div className="bg-[#05060F] p-4.5 border border-white/5 rounded-2xl space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Master Your Signs (The physics rule for IAT)</h4>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px] text-center">
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg space-y-1.5">
                <span className="text-white/40 block text-[10px] uppercase">Heat (dQ)</span>
                <span className="text-emerald-400 font-bold block">+ : Absorbed</span>
                <span className="text-rose-400 font-bold block">- : Released</span>
              </div>
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg space-y-1.5">
                <span className="text-white/40 block text-[10px] uppercase">Work (dW)</span>
                <span className="text-emerald-400 font-bold block">+ : Expansion (by gas)</span>
                <span className="text-rose-400 font-bold block">- : Compression (on gas)</span>
              </div>
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg space-y-1.5">
                <span className="text-white/40 block text-[10px] uppercase">Internal Energy (dU)</span>
                <span className="text-emerald-400 font-bold block">+ : Temp rises</span>
                <span className="text-rose-400 font-bold block">- : Temp falls</span>
              </div>
            </div>
          </div>

          {/* First Law Applications Summary Table */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-4">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-violet-400" /> First Law Applications (dQ = dU + dW) Summary
            </span>
            <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-left text-white/80 border-collapse border border-white/5">
                <thead>
                  <tr className="bg-white/5 text-white border-b border-white/10 uppercase tracking-wider text-[11px]">
                    <th className="p-2 border-r border-white/5">Process</th>
                    <th className="p-2 border-r border-white/5">Condition</th>
                    <th className="p-2 border-r border-white/5">First Law Form</th>
                    <th className="p-2">Physical Consequence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                    <td className="p-2.5 border-r border-white/5 font-semibold text-amber-300">Isothermal</td>
                    <td className="p-2.5 border-r border-white/5">dT = 0 &rarr; dU = 0</td>
                    <td className="p-2.5 border-r border-white/5 text-cyan-300">dQ = dW</td>
                    <td className="p-2.5 leading-relaxed font-sans text-white/70">All heat added to the system is fully converted to work done by the gas.</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                    <td className="p-2.5 border-r border-white/5 font-semibold text-cyan-300">Adiabatic</td>
                    <td className="p-2.5 border-r border-white/5">dQ = 0</td>
                    <td className="p-2.5 border-r border-white/5 text-cyan-300">dU = -dW</td>
                    <td className="p-2.5 leading-relaxed font-sans text-white/70">Work done by gas is at the expense of its internal energy, causing temperature to drop.</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                    <td className="p-2.5 border-r border-white/5 font-semibold text-blue-300">Isochoric</td>
                    <td className="p-2.5 border-r border-white/5">dV = 0 &rarr; dW = 0</td>
                    <td className="p-2.5 border-r border-white/5 text-cyan-300">dQ = dU</td>
                    <td className="p-2.5 leading-relaxed font-sans text-white/70">No mechanical work is done; all added heat goes directly to increasing internal energy.</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                    <td className="p-2.5 border-r border-white/5 font-semibold text-rose-300">Isobaric</td>
                    <td className="p-2.5 border-r border-white/5">dP = 0</td>
                    <td className="p-2.5 border-r border-white/5 text-cyan-300">dQ = dU + P dV</td>
                    <td className="p-2.5 leading-relaxed font-sans text-white/70">Heat added is split: part increases internal energy (&mu; C<sub>v</sub> dT) and part does work (P dV = &mu; R dT).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-3 font-sans">
            <p>
              <strong>State variables:</strong> Variables that depend only on the current thermodynamic state, not on path history (<code className="text-violet-300 font-mono">P, V, T, U, S</code>).
            </p>
            <p>
              <strong>Path functions:</strong> Variables representing energy transfers that depend explicitly on the path path taken (<code className="text-violet-300 font-mono">Q, W</code>).
            </p>
            <p className="bg-[#05060F] p-3 border border-white/5 rounded-xl text-[13px]">
              💡 <strong>Crucial Ideal Gas Hook:</strong> The internal energy change <code className="text-violet-300 font-mono">dU = &mu; C<sub>v</sub> dT</code> is ALWAYS true for an ideal gas, regardless of the thermodynamic process (even if volume or pressure change!).
            </p>
          </div>

          {/* Specific Heat Capacity per unit mass vs mole */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-3.5">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-violet-400" /> Specific Heat Capacity (Per Unit Mass vs. Per Mole)
            </span>
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
              <p>
                <strong>1. Specific Heat Capacity (s):</strong> Defined as the quantity of heat required to raise the temperature of a unit mass of a substance by 1&deg;C (or 1 K):
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">s = Q / (m &middot; &Delta;T)</code>
                where m is the mass of the substance.
              </p>
              <p>
                <strong>2. Heat Capacity (C'):</strong> The quantity of heat required to raise the temperature of a given body by 1 K:
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">C' = Q / &Delta;T = m &middot; s</code>
              </p>
              <p>
                <strong>3. Molar Heat Capacity (C):</strong> The quantity of heat required to raise the temperature of 1 mole of a substance by 1 K:
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">C = Q / (&mu; &middot; &Delta;T) = M &middot; s</code>
                where &mu; is the number of moles, and M is the molar mass of the substance.
              </p>
              
 <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1.5 text-[12.5px]">
                <span className="text-white/40 block text-[10px] uppercase">Interconnection Relation:</span>
                <div className="text-center text-cyan-300 font-bold">
                  C' = &mu; &middot; C = m &middot; s
                </div>
                <p className="text-white/50 text-[11px] leading-relaxed pt-1 font-sans text-center">
                  Heat Capacity (C') links Molar Heat Capacity (C) and Specific Heat (s) based on mole count (&mu;) or mass (m).
                </p>
              </div>
            </div>
          </div>

          {/* Molar Heat Capacities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-xl space-y-1.5">
 <span className="text-[12px] font-bold text-violet-400 tracking-wider block uppercase">Constant Volume (C<sub>v</sub>)</span>
              <p className="text-[13px] text-white/70">
                Heat capacity per mole at constant volume. No work is done, so all heat goes to internal energy.
                <code className="text-violet-300 block font-mono mt-1 text-[13px]">C<sub>v</sub> = (f/2)R</code>
              </p>
            </div>
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-xl space-y-1.5">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase">Constant Pressure (C<sub>p</sub>)</span>
              <p className="text-[13px] text-white/70">
                Heat capacity per mole at constant pressure. Heat does both work and raises internal energy.
                <code className="text-cyan-300 block font-mono mt-1 text-[13px]">C<sub>p</sub> = C<sub>v</sub> + R = (1 + f/2)R</code>
              </p>
            </div>
          </div>
 <div className="p-3 bg-[#05060F] border border-white/5 rounded-xl text-center text-[13px]">
            Mayer's Relation: <span className="text-cyan-300 font-bold">C<sub>p</sub> - C<sub>v</sub> = R</span> | Specific Heat ratio: <span className="text-cyan-300 font-bold">&gamma; = C<sub>p</sub> / C<sub>v</sub> = 1 + 2/f</span>
          </div>
        </div>
      </div>

      {/* ── MODULE 2: Thermodynamic Processes & SVGs ───────────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={2} title="Thermodynamic Processes & PV Diagrams" difficulty={4} color="cyan" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-6">
          {/* PV Diagram Gallery SVG */}
          <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
            <svg width="360" height="200" viewBox="0 0 360 200" className="max-w-full">
              {/* Axes */}
              <line x1="40" y1="20" x2="40" y2="170" stroke="#6b7280" strokeWidth="1.5" />
              <line x1="40" y1="170" x2="330" y2="170" stroke="#6b7280" strokeWidth="1.5" />
              
              {/* Axis Labels */}
              <text x="30" y="25" fill="#9ca3af" fontSize="9" textAnchor="end" fontWeight="bold">Pressure (P)</text>
              <text x="315" y="185" fill="#9ca3af" fontSize="9" textAnchor="middle" fontWeight="bold">Volume (V)</text>

              {/* Isobaric */}
              <line x1="80" y1="50" x2="260" y2="50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red-pv)" />
              <text x="270" y="53" fill="#ef4444" fontSize="8" fontWeight="bold">Isobaric (P = const)</text>

              {/* Isochoric */}
              <line x1="80" y1="50" x2="80" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow-blue-pv)" />
              <text x="85" y="145" fill="#60a5fa" fontSize="8" fontWeight="bold">Isochoric (V = const)</text>

              {/* Isothermal */}
              <path d="M 80 50 Q 150 90 240 110" fill="none" stroke="#eab308" strokeWidth="2" />
              <text x="220" y="102" fill="#eab308" fontSize="8" fontWeight="bold">Isothermal (PV = const)</text>

              {/* Adiabatic */}
              <path d="M 80 50 Q 130 110 200 150" fill="none" stroke="#22d3ee" strokeWidth="2" />
              <text x="175" y="137" fill="#22d3ee" fontSize="8" fontWeight="bold">Adiabatic (PV<sup>&gamma;</sup> = const)</text>

              {/* Origin indicator */}
              <text x="35" y="178" fill="#6b7280" fontSize="8">0</text>

              {/* Arrow defs */}
              <defs>
                <marker id="arrow-red-pv" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
                <marker id="arrow-blue-pv" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                </marker>
              </defs>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 2.1: PV Indicator Diagram showing relative steepness (Adiabatic slope = &gamma; * Isothermal slope)
            </div>
          </div>

          {/* Process Flow Diagrams SVGs */}
          <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase text-center">🔄 Process Flow Visualization</span>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px] text-center">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                <span className="text-amber-400 font-bold block">ISOTHERMAL</span>
                <span className="text-white/60 block">Slow process</span>
                <span className="text-cyan-300 font-bold block">Q<sub>in</sub> = W<sub>out</sub></span>
                <span className="text-white/40 block">dU = 0</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                <span className="text-cyan-400 font-bold block">ADIABATIC</span>
                <span className="text-white/60 block">Rapid process</span>
                <span className="text-cyan-300 font-bold block">Q = 0</span>
                <span className="text-rose-400 font-bold block">Temp Drops</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                <span className="text-blue-400 font-bold block">ISOCHORIC</span>
                <span className="text-white/60 block">Volume locked</span>
                <span className="text-cyan-300 font-bold block">Work = 0</span>
                <span className="text-rose-300 block">Pressure rises</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                <span className="text-rose-400 font-bold block">ISOBARIC</span>
                <span className="text-white/60 block">Pressure fixed</span>
                <span className="text-cyan-300 font-bold block">Work = P&Delta;V</span>
                <span className="text-white/50 block">U and W both change</span>
              </div>
            </div>
          </div>

          {/* Decision Tree */}
          <div className="bg-[#05060F] p-4.5 rounded-xl border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase text-center">💡 Process Identification Decision Tree</span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[13px]">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-cyan-300 font-mono font-bold block">No Heat Exchange?</span>
                <span className="text-white font-bold">🛡️ Adiabatic</span>
                <span className="text-[12px] text-white/50 block">Rapid change. Q = 0. PV<sup>&gamma;</sup> = const.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-cyan-300 font-mono font-bold block">Constant Temp?</span>
                <span className="text-white font-bold">🌡️ Isothermal</span>
                <span className="text-[12px] text-white/50 block">Slow change. dU = 0. PV = const.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-cyan-300 font-mono font-bold block">Constant Pressure?</span>
                <span className="text-white font-bold">🏗️ Isobaric</span>
                <span className="text-[12px] text-white/50 block">Horizontal line. W = P&Delta;V.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-cyan-300 font-mono font-bold block">Constant Volume?</span>
                <span className="text-white font-bold">🔒 Isochoric</span>
                <span className="text-[12px] text-white/50 block">Vertical line. W = 0. dQ = dU.</span>
              </div>
            </div>
          </div>

          {/* Cyclic Processes */}
          <div className="bg-[#05060F] p-4.5 rounded-xl border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Cyclic Processes
            </span>
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
              <p>
                A <strong>cyclic process</strong> consists of a series of thermodynamic transitions that eventually returns the system back to its initial state.
              </p>
 <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1.5 text-[12.5px]">
                <div className="flex justify-between">
                  <span className="text-white/40 font-semibold">Net Internal Energy Change:</span>
                  <span className="text-emerald-400 font-bold">&Delta;U<sub>net</sub> = 0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 font-semibold">Net Work Done (First Law):</span>
                  <span className="text-cyan-300 font-bold">W<sub>net</sub> = Q<sub>net</sub> = Enclosed Loop Area</span>
                </div>
              </div>
              <p className="text-[12.5px] text-white/70 pt-0.5">
                &bull; <strong>Clockwise cycle:</strong> Represents a heat engine. The loop area is positive, meaning net work is done BY the system (net heat is absorbed).
                <br />
                &bull; <strong>Counter-clockwise cycle:</strong> Represents a refrigerator/heat pump. The loop area is negative, meaning net work is done ON the system (heat is pumped from cold to hot).
              </p>

              {/* SVG Diagram: Carnot Cycle / Cyclic loop direction */}
              <div className="p-3 bg-black/45 rounded-xl border border-white/5 flex flex-col items-center gap-2">
                <svg viewBox="0 0 240 110" className="w-full max-w-xs mx-auto">
                  <defs>
                    <marker id="arrow-cyan-scale" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                    </marker>
                    <marker id="arrow-red-scale" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" />
                    </marker>
                  </defs>
                  {/* Clockwise Loop (Engine) */}
                  <g transform="translate(10, 0)">
                    <line x1="15" y1="10" x2="15" y2="85" stroke="#6b7280" strokeWidth="1" />
                    <line x1="15" y1="85" x2="95" y2="85" stroke="#6b7280" strokeWidth="1" />
                    <text x="10" y="15" fill="#ffffff50" fontSize="6">P</text>
                    <text x="90" y="93" fill="#ffffff50" fontSize="6">V</text>
                    {/* Clockwise cycle loop */}
                    <path d="M 30 35 C 40 25, 70 25, 80 50 C 70 75, 40 75, 30 35 Z" fill="#22d3ee" fillOpacity="0.08" stroke="#22d3ee" strokeWidth="1.5" />
                    {/* Direction arrows */}
                    <path d="M 50 28 L 60 28" fill="none" stroke="#22d3ee" strokeWidth="1.2" markerEnd="url(#arrow-cyan-scale)" />
                    <path d="M 60 72 L 50 72" fill="none" stroke="#22d3ee" strokeWidth="1.2" markerEnd="url(#arrow-cyan-scale)" />
                    <text x="55" y="52" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">W<sub>net</sub> &gt; 0</text>
                    <text x="50" y="102" fill="#22d3ee" fontSize="7" fontWeight="bold" textAnchor="middle">Engine (Clockwise)</text>
                  </g>

                  {/* Counter-Clockwise Loop (Refrigerator) */}
                  <g transform="translate(130, 0)">
                    <line x1="15" y1="10" x2="15" y2="85" stroke="#6b7280" strokeWidth="1" />
                    <line x1="15" y1="85" x2="95" y2="85" stroke="#6b7280" strokeWidth="1" />
                    <text x="10" y="15" fill="#ffffff50" fontSize="6">P</text>
                    <text x="90" y="93" fill="#ffffff50" fontSize="6">V</text>
                    {/* Counter-clockwise cycle loop */}
                    <path d="M 30 35 C 40 25, 70 25, 80 50 C 70 75, 40 75, 30 35 Z" fill="#ec4899" fillOpacity="0.08" stroke="#ec4899" strokeWidth="1.5" />
                    {/* Direction arrows */}
                    <path d="M 60 28 L 50 28" fill="none" stroke="#ec4899" strokeWidth="1.2" markerEnd="url(#arrow-red-scale)" />
                    <path d="M 50 72 L 60 72" fill="none" stroke="#ec4899" strokeWidth="1.2" markerEnd="url(#arrow-red-scale)" />
                    <text x="55" y="52" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">W<sub>net</sub> &lt; 0</text>
                    <text x="50" y="102" fill="#ec4899" fontSize="7" fontWeight="bold" textAnchor="middle">Ref / HP (Anti-Clock)</text>
                  </g>
                </svg>
 <span className="text-[11px] text-white/40 uppercase tracking-wider text-center">Figure 2.1b: Cycle direction work signs</span>
              </div>
            </div>
          </div>

          {/* Process Parameter Table */}
          <div className="overflow-x-auto">
 <table className="w-full text-[13px] text-left text-white/80 border-collapse border border-white/5">
              <thead>
                <tr className="bg-white/5 text-white border-b border-white/10 uppercase tracking-wider text-[12px]">
                  <th className="p-3 border-r border-white/5">Process</th>
                  <th className="p-3 border-r border-white/5">Equation</th>
                  <th className="p-3 border-r border-white/5">Work Done (W)</th>
                  <th className="p-3">Molar Heat (C)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-semibold text-amber-300">Isothermal</td>
                  <td className="p-3 border-r border-white/5">PV = K</td>
                  <td className="p-3 border-r border-white/5 text-cyan-300">&mu;RT ln(V<sub>f</sub>/V<sub>i</sub>)</td>
                  <td className="p-3 font-bold">&infin;</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-semibold text-cyan-300">Adiabatic</td>
                  <td className="p-3 border-r border-white/5 text-[12px] leading-relaxed">
                    PV<sup>&gamma;</sup> = K<br />
                    TV<sup>&gamma;&minus;1</sup> = K<br />
                    T<sup>&gamma;</sup>P<sup>1&minus;&gamma;</sup> = K
                  </td>
                  <td className="p-3 border-r border-white/5 text-cyan-300">(P<sub>i</sub>V<sub>i</sub> − P<sub>f</sub>V<sub>f</sub>)/(&gamma;−1)</td>
                  <td className="p-3 font-bold text-rose-400">0</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-semibold text-blue-300">Isochoric</td>
                  <td className="p-3 border-r border-white/5">V = K</td>
                  <td className="p-3 border-r border-white/5 text-rose-400 font-bold">0</td>
                  <td className="p-3">C<sub>v</sub></td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-semibold text-rose-300">Isobaric</td>
                  <td className="p-3 border-r border-white/5">P = K</td>
                  <td className="p-3 border-r border-white/5 text-cyan-300">P&Delta;V = &mu;R&Delta;T</td>
                  <td className="p-3">C<sub>p</sub></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── MODULE 3: Carnot Cycles, Engines & Refrigerators ───────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={3} title="Carnot Cycles, Engines & Refrigerators" difficulty={4} color="rose" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-6">
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
            <p>
              The <strong>Carnot Engine</strong> is a theoretical reversible cycle operating between two temperatures (T<sub>H</sub> and T<sub>L</sub>). It represents the maximum efficiency allowed by the Second Law of Thermodynamics.
            </p>
          </div>

          {/* The Carnot Cycle Steps and Diagrams */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-5">
 <span className="text-[12px] font-bold text-rose-400 tracking-wider block uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-rose-400" /> Carnot Cycle: The Reversible Ideal Loop
            </span>
            
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
              <p>
                The Carnot Cycle operates in a closed reversible loop consisting of <strong>four distinct steps</strong>:
              </p>
              <ol className="list-decimal pl-5 space-y-2.5 text-[12.5px] text-white/70 leading-relaxed">
                <li><strong>Step 1: Isothermal Expansion (1 &rarr; 2):</strong> The gas absorbs heat Q<sub>H</sub> from the hot reservoir at T<sub>H</sub>. It expands slowly at constant temperature T<sub>H</sub>, doing work W<sub>12</sub> = &mu;RT<sub>H</sub> ln(V<sub>2</sub>/V<sub>1</sub>).</li>
                <li><strong>Step 2: Adiabatic Expansion (2 &rarr; 3):</strong> The gas container is insulated (Q = 0). It continues to expand, doing work at the expense of its internal energy, and its temperature drops from T<sub>H</sub> to T<sub>L</sub>.</li>
                <li><strong>Step 3: Isothermal Compression (3 &rarr; 4):</strong> The gas rejects heat Q<sub>C</sub> to the cold reservoir at T<sub>L</sub>. Work is done ON the gas at constant temperature T<sub>L</sub>, compressing it slowly.</li>
                <li><strong>Step 4: Adiabatic Compression (4 &rarr; 1):</strong> The gas is insulated. It is compressed back to its initial state, raising its temperature from T<sub>L</sub> to T<sub>H</sub>.</li>
              </ol>
              
              <p className="pt-2">
                <strong>The Carnot Theorem &amp; Efficiency:</strong> Because the heat transfers are completely isothermal, the ratio of heat exchanged equals the ratio of reservoir absolute temperatures:
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">Q<sub>H</sub> / Q<sub>C</sub> = T<sub>H</sub> / T<sub>L</sub></code>
                The general efficiency &eta; of any heat engine is the ratio of net work output to heat input: &eta; = W / Q<sub>H</sub> = (Q<sub>H</sub> − Q<sub>C</sub>) / Q<sub>H</sub> = 1 − Q<sub>C</sub> / Q<sub>H</sub>. For the Carnot cycle, this simplifies to:
                <code className="text-rose-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">&eta; = 1 − T<sub>L</sub> / T<sub>H</sub></code>
              </p>
            </div>

            {/* Diagram Gallery: PV, TS, and Energy Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/5">
              {/* 1. PV Diagram */}
              <div className="p-3 bg-black/45 border border-white/5 rounded-xl flex flex-col items-center gap-2">
                <svg viewBox="0 0 140 140" className="w-full">
                  <line x1="15" y1="10" x2="15" y2="125" stroke="#6b7280" strokeWidth="1" />
                  <line x1="15" y1="125" x2="135" y2="125" stroke="#6b7280" strokeWidth="1" />
                  <text x="10" y="15" fill="#ffffff40" fontSize="6" textAnchor="end">P</text>
                  <text x="130" y="133" fill="#ffffff40" fontSize="6">V</text>
                  {/* PV curves */}
                  {/* 1 -> 2 (Isothermal Th) */}
                  <path d="M 30 35 Q 55 50 80 55" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="50" y="32" fill="#f87171" fontSize="6" fontWeight="bold">1 &rarr; 2 (T<sub>H</sub>)</text>
                  {/* 2 -> 3 (Adiabatic) */}
                  <path d="M 80 55 Q 98 85 110 95" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="104" y="75" fill="#38bdf8" fontSize="6" fontWeight="bold">2 &rarr; 3</text>
                  {/* 3 -> 4 (Isothermal Tl) */}
                  <path d="M 110 95 Q 75 92 45 80" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
                  <text x="75" y="105" fill="#22d3ee" fontSize="6" fontWeight="bold">3 &rarr; 4 (T<sub>L</sub>)</text>
                  {/* 4 -> 1 (Adiabatic) */}
                  <path d="M 45 80 Q 35 55 30 35" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                  <text x="22" y="65" fill="#c084fc" fontSize="6" fontWeight="bold">4 &rarr; 1</text>
                </svg>
 <span className="text-[10px] text-white/40 uppercase tracking-wider text-center">A: Carnot PV Loop</span>
              </div>

              {/* 2. TS Diagram */}
              <div className="p-3 bg-black/45 border border-white/5 rounded-xl flex flex-col items-center gap-2">
                <svg viewBox="0 0 140 140" className="w-full">
                  <line x1="20" y1="10" x2="20" y2="125" stroke="#6b7280" strokeWidth="1" />
                  <line x1="20" y1="125" x2="135" y2="125" stroke="#6b7280" strokeWidth="1" />
                  <text x="15" y="15" fill="#ffffff40" fontSize="6" textAnchor="end">T</text>
                  <text x="130" y="133" fill="#ffffff40" fontSize="6">S</text>
                  {/* Rectangular loop */}
                  <rect x="40" y="30" width="60" height="60" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="70" y="25" fill="#f87171" fontSize="6" textAnchor="middle">T<sub>H</sub></text>
                  <text x="70" y="102" fill="#22d3ee" fontSize="6" textAnchor="middle">T<sub>L</sub></text>
                  <text x="35" y="60" fill="#a78bfa" fontSize="6" textAnchor="end">S<sub>1</sub></text>
                  <text x="105" y="60" fill="#cbd5e1" fontSize="6" textAnchor="start">S<sub>2</sub></text>
                  {/* Flow arrows */}
                  <polygon points="75,30 71,27 71,33" fill="#ef4444" />
                  <polygon points="100,65 97,61 103,61" fill="#38bdf8" />
                  <polygon points="65,90 69,87 69,93" fill="#22d3ee" />
                  <polygon points="40,55 37,59 43,59" fill="#a78bfa" />
                </svg>
 <span className="text-[10px] text-white/40 uppercase tracking-wider text-center">B: Carnot TS Diagram</span>
              </div>

              {/* 3. Energy Flow Schematic */}
              <div className="p-3 bg-black/45 border border-white/5 rounded-xl flex flex-col items-center gap-2">
                <svg viewBox="0 0 140 140" className="w-full">
                  {/* Hot Reservoir */}
                  <rect x="25" y="10" width="90" height="20" rx="3" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1" />
                  <text x="70" y="22" fill="#f87171" fontSize="7" fontWeight="bold" textAnchor="middle">Hot Source (T<sub>H</sub>)</text>
                  
                  {/* Engine Circle */}
                  <circle cx="70" cy="70" r="18" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="70" y="73" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Engine</text>
                  
                  {/* Cold Reservoir */}
                  <rect x="25" y="110" width="90" height="20" rx="3" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1" />
                  <text x="70" y="122" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">Cold Sink (T<sub>L</sub>)</text>
                  
                  {/* Arrows */}
                  {/* Qh */}
                  <line x1="70" y1="30" x2="70" y2="52" stroke="#ef4444" strokeWidth="1.5" />
                  <polygon points="70,52 67,47 73,47" fill="#ef4444" />
                  <text x="75" y="44" fill="#f87171" fontSize="7">Q<sub>H</sub></text>
                  
                  {/* Qc */}
                  <line x1="70" y1="88" x2="70" y2="110" stroke="#38bdf8" strokeWidth="1.5" />
                  <polygon points="70,110 67,105 73,105" fill="#38bdf8" />
                  <text x="75" y="102" fill="#38bdf8" fontSize="7">Q<sub>C</sub></text>
                  
                  {/* Work */}
                  <line x1="88" y1="70" x2="108" y2="70" stroke="#22d3ee" strokeWidth="1.5" />
                  <polygon points="108,70 103,67 103,73" fill="#22d3ee" />
                  <text x="100" y="65" fill="#22d3ee" fontSize="7">W</text>
                </svg>
 <span className="text-[10px] text-white/40 uppercase tracking-wider text-center">C: Energy Flow</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormulaCard
              formula="&eta; = 1 &minus; T<sub>L</sub> / T<sub>H</sub>"
              use_when="Efficiency of a Carnot Heat Engine. T<sub>L</sub> is the cold sink temperature, T<sub>H</sub> is the hot source temperature. Must convert temperatures to Kelvin!"
              priority="ESSENTIAL"
              freq_stars={5}
              difficulty_stars={2}
              color="rose"
              copy_text="efficiency = 1 - Tl/Th"
            />
            <FormulaCard
              formula="COP (&beta;) = T<sub>L</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>)"
              use_when="Coefficient of Performance (COP) for a Carnot Refrigerator. Tells you how much heat is removed per unit work input."
              priority="ESSENTIAL"
              freq_stars={5}
              difficulty_stars={3}
              color="rose"
              copy_text="COP = Tl/(Th - Tl)"
            />
          </div>

          {/* Refrigerator vs Heat Pump Comparison Card */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-4">
 <span className="text-[12px] font-bold text-rose-400 tracking-wider block uppercase flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-rose-400" /> Refrigerators vs. Heat Pumps: Performance Indicators
            </span>
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
              <p>
                <strong>1. Refrigerator Coefficient of Performance (&beta;<sub>ref</sub>):</strong> Measures the effectiveness of removing heat from a cold reservoir:
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">&beta;<sub>ref</sub> = Q<sub>L</sub> / W = T<sub>L</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>)</code>
              </p>
              <p>
                <strong>2. Heat Pump Coefficient of Performance (COP<sub>hp</sub>):</strong> Measures the effectiveness of pumping heat into a warm space:
                <code className="text-cyan-300 block font-mono text-center py-2 bg-black/45 rounded-lg my-1">COP<sub>hp</sub> = Q<sub>H</sub> / W = T<sub>H</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>)</code>
              </p>
 <p className="bg-white/[0.02] p-3 border border-white/5 rounded-xl text-[12.5px] text-center">
                💡 <strong>The Interconnection Relation:</strong>
                <br />
                <span className="text-emerald-400 font-bold block mt-1">COP<sub>hp</sub> = &beta;<sub>ref</sub> + 1</span>
                Since COP<sub>hp</sub> = T<sub>H</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>) = T<sub>L</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>) + 1 = &beta;<sub>ref</sub> + 1. This means a heat pump is always more efficient than a refrigerator by exactly 1 unit!
              </p>
            </div>
          </div>

          {/* Engine vs Refrigerator Table */}
          <div className="overflow-x-auto">
 <table className="w-full text-[13px] text-left text-white/80 border-collapse border border-white/5">
              <thead>
                <tr className="bg-white/5 text-white border-b border-white/10 uppercase tracking-wider text-[12px]">
                  <th className="p-3 border-r border-white/5">Feature</th>
                  <th className="p-3 border-r border-white/5">Carnot Engine</th>
                  <th className="p-3">Carnot Refrigerator (Heat Pump)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-bold">Operational Goal</td>
                  <td className="p-3 border-r border-white/5">Convert Heat from Hot source to useful Work</td>
                  <td className="p-3">Perform Work to pump Heat from Cold source to Hot sink</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-bold">Efficiency Indicator</td>
                  <td className="p-3 border-r border-white/5 text-emerald-400">Efficiency (&eta;) = W / Q<sub>H</sub></td>
                  <td className="p-3 text-cyan-400">COP (&beta;) = Q<sub>L</sub> / W</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-bold">Formula Relation</td>
                  <td className="p-3 border-r border-white/5">&eta; = 1 &minus; T<sub>L</sub> / T<sub>H</sub></td>
                  <td className="p-3">&beta; = T<sub>L</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>) = (1 &minus; &eta;) / &eta;</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 border-r border-white/5 font-bold">Direction of Cycle</td>
                  <td className="p-3 border-r border-white/5 text-emerald-400">Clockwise on PV diagram (W<sub>net</sub> &gt; 0)</td>
                  <td className="p-3 text-rose-400">Counter-clockwise on PV diagram (W<sub>net</sub> &lt; 0)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Reversible vs Irreversible Processes */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-3">
 <span className="text-[12px] font-bold text-rose-400 tracking-wider block uppercase flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-rose-400" /> Reversible vs. Irreversible Processes
            </span>
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
              <p>
                A <strong>reversible process</strong> is an idealized thermodynamic process that can be retraced backward such that both the system and its surroundings return exactly to their initial states. Real-world processes are strictly <strong>irreversible</strong> due to energy dissipation.
              </p>
              
              <div className="overflow-x-auto pt-1">
 <table className="w-full text-[13px] text-left text-white/70 border-collapse border border-white/5">
                  <thead>
                    <tr className="bg-white/5 text-white border-b border-white/10 uppercase tracking-wider text-[10px]">
                      <th className="p-2 border-r border-white/5">Property</th>
                      <th className="p-2 border-r border-white/5">Reversible Process</th>
                      <th className="p-2">Irreversible Process</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-2 border-r border-white/5 font-bold text-white/90">Execution Speed</td>
                      <td className="p-2 border-r border-white/5 text-emerald-400">Infinitely slow (Quasi-static)</td>
                      <td className="p-2 text-rose-400">Rapid and spontaneous</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 border-r border-white/5 font-bold text-white/90">Dissipative Losses</td>
                      <td className="p-2 border-r border-white/5 text-emerald-400">Zero friction, viscosity, or resistance</td>
                      <td className="p-2 text-rose-400">Friction, turbulence, electrical resistance present</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 border-r border-white/5 font-bold text-white/90">Entropy Change</td>
                      <td className="p-2 border-r border-white/5 text-emerald-400">&Delta;S<sub>universe</sub> = 0 (constant entropy)</td>
                      <td className="p-2 text-rose-400">&Delta;S<sub>universe</sub> &gt; 0 (entropy increases)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-2 border-r border-white/5 font-bold text-white/90">Common Examples</td>
                      <td className="p-2 border-r border-white/5 text-emerald-300">Isothermal/adiabatic slow piston movements</td>
                      <td className="p-2 text-rose-300">Free expansion of gas, spontaneous heat transfer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* The Second Law of Thermodynamics */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-cyan-400" /> The Second Law of Thermodynamics
            </span>
            <div className="text-[13px] text-white/80 leading-relaxed space-y-3 font-sans">
              <p>
                The Second Law establishes that thermodynamic processes have a natural direction and cannot be reversed spontaneously.
              </p>
              <div className="space-y-2 pl-2">
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
 <strong className="text-cyan-300 block">1. Kelvin-Planck Statement (Engine limit):</strong>
                  <p className="text-white/70 pt-0.5">
                    It is impossible to construct a heat engine operating in a cycle that absorbs heat from a single reservoir and converts it 100% into useful mechanical work. There must be some heat rejected to a colder sink (Efficiency &eta; &lt; 1).
                  </p>
                </div>
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
 <strong className="text-cyan-300 block">2. Clausius Statement (Refrigerator limit):</strong>
                  <p className="text-white/70 pt-0.5">
                    It is impossible to construct a cyclic device whose sole effect is to transfer heat from a cooler body to a warmer body without the input of external mechanical work.
                  </p>
                </div>
              </div>
              <p className="pt-1.5">
                <strong>Entropy (S) &amp; Reversible Changes:</strong> Entropy is a state function that measures system disorder. For a reversible process, the change in entropy is defined as dS = dQ<sub>rev</sub> / T.
              </p>
 <div className="p-3.5 bg-black/45 border border-white/5 rounded-xl space-y-2.5 text-[12.5px]">
                <div className="flex justify-between">
                  <span className="text-white/40 font-semibold">Entropy change (Reversible Isothermal):</span>
                  <span className="text-cyan-300 font-bold">&Delta;S = &mu; R ln(V_f / V_i)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40 font-semibold">Entropy change (Reversible Adiabatic):</span>
                  <span className="text-emerald-400 font-bold">&Delta;S = 0</span>
                </div>
                <div className="border-t border-white/5 pt-2 text-[11px] text-white/50 leading-relaxed font-sans">
                  *Entropy is a State Function: The change in entropy &Delta;S depends strictly on the initial and final states of the system, not on the specific thermodynamic path taken (&Delta;S_universe &ge; 0).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODULE 4: Polytropic Processes & Shortcuts ─────────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={4} title="Polytropic Processes & Advanced Shortcuts" difficulty={4.5} color="emerald" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
            <p>
              Many real expansions are <strong>polytropic</strong>, governed by the relation <code className="text-emerald-300 font-mono">PV<sup>x</sup> = Constant</code>. We can instantly find the molar heat capacity using this shortcut:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaCard
              formula="C = C<sub>v</sub> + R / (1 &minus; x)"
              use_when="Molar Heat Capacity of an ideal gas during a polytropic expansion PV<sup>x</sup> = Constant. C<sub>v</sub> is the isochoric heat capacity."
              priority="ELITE SHORTCUT"
              freq_stars={5}
              difficulty_stars={3.5}
              color="emerald"
              copy_text="C = Cv + R/(1 - x)"
            />
            <FormulaCard
              formula="(dP/dV)<sub>adi</sub> = &gamma; &times; (dP/dV)<sub>iso</sub>"
              use_when="Comparing adiabatic and isothermal curves at the same point. Adiabatic curve is always steeper by factor &gamma;."
              priority="VISUAL SHORTCUT"
              freq_stars={4}
              difficulty_stars={2}
              color="emerald"
              copy_text="Slope_adi = gamma * Slope_iso"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 5: Solved Numerical Examples ───────────────────────────── */}
      <div className="space-y-6">
        <SectionHeader icon={<Target className="w-5 h-5" />} label="Step-by-Step Solved Numericals" color="emerald" />

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          <SolvedExample
            number={1}
            question="A diatomic gas (Cv = 5/2 R) absorbs 300 J of heat and is simultaneously compressed by an external pressure of 2.0 * 10⁵ Pa from 2.5 Liters to 1.5 Liters. Find the change in internal energy of the gas."
            steps={[
              "Identify parameters: dQ = +300 J (heat enters the system).",
              "Volume change: dV = Vf - Vi = 1.5 - 2.5 = -1.0 Liters.",
              "Convert volume to m³: dV = -1.0 * 10⁻³ m³.",
              "Calculate work done: dW = P * dV = (2.0 * 10⁵ Pa) * (-1.0 * 10⁻³ m³) = -200 J (negative due to compression).",
              "Apply First Law: dQ = dU + dW  →  300 = dU + (-200).",
              "Solve for dU: dU = 300 - (-200) = 300 + 200 = 500 J."
            ]}
            answer="dU = 500 J (Temp rises)"
            color="emerald"
          />

          <SolvedExample
            number={2}
            question="In a polytropic expansion, an ideal gas expands according to the relation PV^1.5 = Constant. If the gas is diatomic (Cv = 5/2 R), find its molar heat capacity during this process."
            steps={[
              "Identify the polytropic index from PV^1.5 = Constant: x = 1.5.",
              "Isochoric heat capacity for diatomic gas: Cv = 5/2 R.",
              "Apply the polytropic molar heat shortcut: C = Cv + R / (1 - x).",
              "Substitute values: C = 5/2 R + R / (1 - 1.5) = 2.5 R + R / (-0.5).",
              "Calculate: R / (-0.5) = -2 R.",
              "Total capacity: C = 2.5 R - 2 R = 0.5 R = R / 2."
            ]}
            answer="Molar Heat C = R / 2"
            color="emerald"
          />

          <SolvedExample
            number={3}
            question="A Carnot refrigerator operating between a cold reservoir at -13&deg;C and a hot reservoir at 27&deg;C absorbs 520 J of heat from the cold reservoir in each cycle. Find the work done on the refrigerator per cycle."
            steps={[
              "Convert temperatures to Kelvin: T<sub>L</sub> = -13 + 273 = 260 K. T<sub>H</sub> = 27 + 273 = 300 K.",
              "Calculate COP: &beta; = T<sub>L</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>) = 260 / (300 &minus; 260) = 260 / 40 = 6.5.",
              "Apply COP definition: &beta; = Q<sub>L</sub> / W.",
              "Solve for work input: W = Q<sub>L</sub> / &beta; = 520 / 6.5 = 80 J."
            ]}
            answer="Work Done = 80 J"
            color="emerald"
          />

          <SolvedExample
            number={4}
            question="Calculate the specific heat ratio (&gamma;<sub>mix</sub>) of a mixture containing 2 moles of Helium (Monoatomic, f=3) and 3 moles of Oxygen (Diatomic, f=5)."
            steps={[
              "Find individual heat capacities: C<sub>v,He</sub> = (3/2)R. C<sub>v,O2</sub> = (5/2)R.",
              "Find equivalent C<sub>v</sub> of the mixture: C<sub>v,mix</sub> = (n1&middot;C<sub>v1</sub> + n2&middot;C<sub>v2</sub>) / (n1 + n2).",
              "Substitute: C<sub>v,mix</sub> = (2&times;1.5R + 3&times;2.5R) / 5 = (3R + 7.5R) / 5 = 10.5R / 5 = 2.1R.",
              "Find equivalent C<sub>p</sub> of the mixture: C<sub>p,mix</sub> = C<sub>v,mix</sub> + R = 2.1R + R = 3.1R.",
              "Calculate specific heat ratio: &gamma;<sub>mix</sub> = C<sub>p,mix</sub> / C<sub>v,mix</sub> = 3.1 / 2.1 = 31/21 &asymp; 1.48."
            ]}
            answer="&gamma;<sub>mix</sub> &asymp; 1.48"
            color="emerald"
          />

          <SolvedExample
            number={5}
            question="1 mole of an ideal gas expands isothermally at 300 K from an initial volume of 10 Liters to a final volume of 20 Liters. Find the work done by the gas during this expansion. (R = 8.31 J/mol K, ln 2 = 0.693)"
            steps={[
              "Identify process parameters: isothermal (T = 300 K), &mu; = 1, V<sub>i</sub> = 10 L, V<sub>f</sub> = 20 L.",
              "State the isothermal work done formula: W = &mu; R T ln(V<sub>f</sub> / V<sub>i</sub>).",
              "Substitute values: W = 1 &middot; 8.31 &middot; 300 &middot; ln(20 / 10).",
              "Simplify volume ratio: V<sub>f</sub> / V<sub>i</sub> = 2. Hence, W = 2493 &middot; ln(2).",
              "Substitute ln(2) = 0.693: W = 2493 &middot; 0.693 &asymp; 1727.6 J."
            ]}
            answer="Work = 1728 J (Positive work)"
            color="emerald"
          />

          <SolvedExample
            number={6}
            question="A monatomic ideal gas (&gamma; = 5/3) at 27&deg;C is compressed adiabatically to one-eighth of its original volume. Calculate the work done during this compression if there is 1 mole of gas."
            steps={[
              "Convert temperature to Kelvin: T<sub>i</sub> = 27 + 273 = 300 K.",
              "State adiabatic temp-volume relation: T<sub>i</sub> V<sub>i</sub><sup>(&gamma;&minus;1)</sup> = T<sub>f</sub> V<sub>f</sub><sup>(&gamma;&minus;1)</sup>.",
              "Given V<sub>f</sub> = V<sub>i</sub> / 8, solve for final temperature: T<sub>f</sub> = T<sub>i</sub> &middot; (V<sub>i</sub> / V<sub>f</sub>)<sup>(&gamma;&minus;1)</sup> = 300 &middot; 8<sup>2/3</sup>.",
              "Calculate 8<sup>2/3</sup> = 4. Hence, T<sub>f</sub> = 300 &middot; 4 = 1200 K.",
              "State adiabatic work done formula: W = &mu; R (T<sub>i</sub> &minus; T<sub>f</sub>) / (&gamma; &minus; 1).",
              "Substitute values: W = 1 &middot; 8.31 &middot; (300 &minus; 1200) / (5/3 &minus; 1) = 8.31 &middot; (&minus;900) / (2/3).",
              "Calculate: W = 8.31 &middot; (&minus;1350) = &minus;11218.5 J."
            ]}
            answer="Work = &minus;11219 J (Work done ON the gas)"
            color="emerald"
          />

          <SolvedExample
            number={7}
            question="A Carnot engine absorbs 1000 J of heat from a reservoir at 600 K and rejects heat to a sink at 300 K. Find its efficiency and the net work output per cycle."
            steps={[
              "Identify temperatures: T<sub>H</sub> = 600 K, T<sub>L</sub> = 300 K.",
              "Calculate Carnot efficiency: &eta; = 1 &minus; T<sub>L</sub> / T<sub>H</sub> = 1 &minus; 300 / 600 = 0.5 (or 50%).",
              "State relation for efficiency: &eta; = W / Q<sub>H</sub>.",
              "Given Q<sub>H</sub> = 1000 J, solve for net work output: W = &eta; &middot; Q<sub>H</sub> = 0.5 &middot; 1000 = 500 J."
            ]}
            answer="&eta; = 50%, Work = 500 J"
            color="emerald"
          />

          <SolvedExample
            number={8}
            question="A Carnot heat pump is used to maintain a room temperature of 21&deg;C. If the outdoor temperature is -9&deg;C and the pump requires 500 W of electrical power input, find the rate at which heat is delivered to the room."
            steps={[
              "Convert temperatures to Kelvin: T<sub>L</sub> = &minus;9 + 273 = 264 K, T<sub>H</sub> = 21 + 273 = 294 K.",
              "Calculate Heat Pump COP: COP<sub>hp</sub> = T<sub>H</sub> / (T<sub>H</sub> &minus; T<sub>L</sub>) = 294 / (294 &minus; 264) = 294 / 30 = 9.8.",
              "State COP rate relation: COP<sub>hp</sub> = (Rate of Q<sub>H</sub>) / P.",
              "Solve for rate of heat delivery: Rate of Q<sub>H</sub> = COP<sub>hp</sub> &middot; P = 9.8 &middot; 500 = 4900 W."
            ]}
            answer="Heat Rate = 4900 W (or J/s)"
            color="emerald"
          />

          <SolvedExample
            number={9}
            question="An ideal gas is kept in one chamber of an adiabatic container while the other chamber is evacuated. A valve is opened, allowing the gas to undergo free expansion. If the initial temperature was 300 K, what is the final temperature, and is entropy conserved?"
            steps={[
              "Free expansion occurs against vacuum, so external pressure is zero: W = 0.",
              "Container is perfectly insulated, so heat exchange is zero: Q = 0.",
              "Applying First Law: dQ = dU + dW &rarr; 0 = dU + 0 &rarr; dU = 0.",
              "For an ideal gas, internal energy depends only on temperature. Since dU = 0, final temperature equals initial temperature: T<sub>f</sub> = T<sub>i</sub> = 300 K.",
              "Since the expansion is spontaneous and irreversible, entropy is NOT conserved. Universal entropy increases: &Delta;S<sub>universe</sub> &gt; 0."
            ]}
            answer="T<sub>f</sub> = 300 K, Entropy increases"
            color="emerald"
          />
        </div>
      </div>

      {/* ── SECTION 6: Strategy & Memory Guidelines ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        {/* Memorize Box */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-400" /> What You MUST Memorize
          </h4>
          <ul className="space-y-3.5 text-[13px] text-white/80">
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Process Sign Conventions:</strong>
              <br />
              dQ = dU + dW. Compressions mean negative work, heat release means negative Q.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Polytropic Capacity Shortcut:</strong>
              <br />
              C = Cv + R/(1 - x). Memorizing this saves 3 minutes of integration steps on IAT.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Degrees of Freedom &amp; &gamma; Values (MUST Memorize):</strong>
              <br />
              &bull; Monoatomic gas: f = 3, C<sub>v</sub> = 3/2 R, C<sub>p</sub> = 5/2 R, &gamma; = 5/3 &asymp; 1.67
              <br />
              &bull; Diatomic gas: f = 5, C<sub>v</sub> = 5/2 R, C<sub>p</sub> = 7/2 R, &gamma; = 7/5 = 1.40
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
              <strong className="text-amber-400">Isolated logarithmic work values:</strong>
              <br />
              No need to memorize values for ln(Vf/Vi) beyond basic numbers like ln(2) ≈ 0.693, as IAT provides logarithm coefficients.
            </li>
            <li className="leading-relaxed">
              <strong className="text-amber-400">Specific complex mixture equations:</strong>
              <br />
              Just remember the mole-weighted average method: Cv_mix = (n1·Cv1 + n2·Cv2) / (n1+n2).
            </li>
          </ul>
        </div>
      </div>

      {/* ── SECTION 7: IAT Exam Focus Points & Strategy ────────────────────── */}
      <div className="space-y-8 pt-6 border-t border-white/5">
        <SectionHeader icon={<Brain className="w-5 h-5" />} label="IAT Exam Focus & Question Strategy" color="violet" />

        {/* Question Strategy Recognition */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider">Question Strategy Recognition</h4>
          <div className="space-y-4.5 text-[13px]">
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Temperature remains constant&quot; or &quot;Slow expansion&quot;</div>
                <div className="text-white/60 leading-relaxed font-sans">
                  &rarr; <strong>Think</strong>: Isothermal process. Internal energy change dU = 0 for ideal gas. Molar heat capacity C = &infin;. Work done: W = &mu;RT ln(V<sub>f</sub>/V<sub>i</sub>).
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Rapid expansion&quot; or &quot;No heat exchange&quot;</div>
                <div className="text-white/60 leading-relaxed font-sans">
                  &rarr; <strong>Think</strong>: Adiabatic process. Heat exchange dQ = 0. Work is done at the expense of internal energy (dU = &minus;dW). Slope is steeper: (dP/dV)<sub>adi</sub> = &gamma; &middot; (dP/dV)<sub>iso</sub>.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Cyclic PV indicator loop&quot;</div>
                <div className="text-white/60 leading-relaxed font-sans">
                  &rarr; <strong>Think</strong>: Net internal energy change over a cycle is dU = 0. Net Work = Area of the loop (Clockwise = Positive Engine, Counter-clockwise = Negative Refrigerator/Heat Pump).
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Carnot engine working between T₁ and T₂&quot;</div>
                <div className="text-white/60 leading-relaxed font-sans">
                  &rarr; <strong>Think</strong>: Efficiency &eta; = 1 &minus; T<sub>L</sub>/T<sub>H</sub>. Always convert T to Kelvin first. Use Q<sub>H</sub>/Q<sub>C</sub> = T<sub>H</sub>/T<sub>L</sub> for heat ratios.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Traps */}
        <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-4">
 <h4 className="text-rose-400 font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-rose-400" /> Common Traps &amp; Mistakes to Avoid
          </h4>
          <div className="space-y-3.5 text-[13px] text-white/80">
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 1: The Celsius efficiency trap in Carnot</strong>
              <br />
              Plugging temperatures directly in Celsius into &eta; = 1 &minus; T<sub>L</sub>/T<sub>H</sub> (e.g. using 27°C / 127°C instead of 300K / 400K). Always convert to Kelvin.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 2: Ideal gas dU vs general process dU</strong>
              <br />
              Assuming that dU = &mu;C<sub>v</sub>dT is only valid for isochoric processes. This relation is ALWAYS valid for any process of an ideal gas because internal energy is a state variable depending strictly on temperature.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 3: Free expansion isothermal vs irreversible trap</strong>
              <br />
              Thinking free expansion is a standard isothermal process since dT = 0. Free expansion is highly non-equilibrium and irreversible; no work is done (W = 0) and no heat is exchanged (Q = 0). The entropy of the universe increases (&Delta;S<sub>universe</sub> &gt; 0).
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 4: Work sign in compression</strong>
              <br />
              Forgetting that if a gas is compressed (volume decreases), work is done ON the gas, so dW is negative in the First Law equation dQ = dU + dW.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 5: Entropy calculation for irreversible processes</strong>
              <br />
              Trying to use &Delta;S = &int;dQ<sub>irr</sub>/T for irreversible paths. Since entropy is a state function, you must define a dummy reversible path connecting the same start and end states, and integrate dQ<sub>rev</sub>/T along that path instead.
            </div>
          </div>
        </div>

        {/* Third Law of Thermodynamics */}
        <div className="p-4.5 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-2xl space-y-2">
 <span className="text-[12px] font-bold text-indigo-400 uppercase tracking-wider block">❄️ Third Law of Thermodynamics</span>
          <p className="text-[12.5px] leading-relaxed text-white/70">
            <strong>Statement:</strong> The entropy of a perfect crystalline substance approaches exactly zero as the thermodynamic temperature falls to absolute zero (0 K). At absolute zero, all molecular motion ceases and the system has only one microstate.
          </p>
        </div>
      </div>

      {/* 1-Minute Interactive Checklist */}
      <div className="pt-6">
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-cyan-400" /> Interactive 1-Minute Revision Checklist
          </h4>
          <p className="text-[12.5px] text-white/50 leading-relaxed font-sans">
            Click on each item to check off your review progress before stepping into the exam hall:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
            {[
              "Zeroth Law & temperature measurement basis",
              "First Law sign conventions for Q, W, dU",
              "Work integral: W = ∫P dV (area under curve)",
              "dU = μCvdT is ALWAYS valid for ideal gases",
              "Isothermal process work done: μRT ln(Vf/Vi)",
              "Adiabatic conditions: PV^γ, TV^(γ-1), T^γ P^(1-γ)",
              "Polytropic C shortcut: C = Cv + R/(1-x)",
              "Free expansion: Q=0, W=0, dU=0, ΔS_univ > 0",
              "Carnot cycle 4 steps and PV/TS layout",
              "Carnot Efficiency (using absolute Kelvin scales!)",
              "Engine (clockwise) vs Refrigerator (anti-clockwise)",
              "Second Law & Entropy change calculation rules"
            ].map((item, idx) => (
              <label
                key={idx}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-200",
                  checkedItems[idx] 
                    ? "bg-cyan-500/5 border-cyan-500/20 text-cyan-200" 
                    : "bg-white/[0.01] border-white/5 hover:border-white/10 text-white/70"
                )}
              >
                <input
                  type="checkbox"
                  checked={checkedItems[idx]}
                  onChange={() => {
                    const newChecked = [...checkedItems];
                    newChecked[idx] = !newChecked[idx];
                    setCheckedItems(newChecked);
                  }}
                  className="rounded border-white/10 bg-black/40 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0 w-4 h-4 shrink-0"
                />
                <span className="leading-snug">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 8: 2-Minute Revision Sheet ─────────────────────────────── */}
      <div className="p-6 bg-gradient-to-br from-violet-950/20 to-cyan-950/20 border border-violet-500/10 rounded-2xl space-y-5 mt-6">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4.5 h-4.5 text-cyan-400" /> 2-Minute Revision Sheet
        </h3>

        {/* Row 1: Core Laws */}
        <div>
 <span className="text-[10px] uppercase tracking-widest text-white/30 block pb-2">⚡ Core Laws &amp; Definitions</span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-[13px] text-white/80">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>First Law</strong>: dQ = dU + dW. Compression &rarr; W &lt; 0; heat release &rarr; Q &lt; 0.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Internal Energy (ideal gas)</strong>: U = (f/2)&mu;RT. dU = &mu;C<sub>v</sub> dT for ANY process.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Work integral</strong>: W = &int;P dV = area under PV curve.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Specific heat hierarchy</strong>: s = Q/m&Delta;T; C&apos; = ms = &mu;C.</span>
            </li>
          </ul>
        </div>

        {/* Row 2: Process Quick-Fire */}
        <div>
 <span className="text-[10px] uppercase tracking-widest text-white/30 block pb-2">🔁 Process Quick-Fire (First Law form)</span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-[13px] text-white/80">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Isothermal</strong>: dT=0 &rarr; dU=0 &rarr; Q=W=&mu;RT ln(V<sub>f</sub>/V<sub>i</sub>).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Adiabatic</strong>: Q=0 &rarr; dU=&minus;W. PV<sup>&gamma;</sup>=const. W=(P<sub>i</sub>V<sub>i</sub>&minus;P<sub>f</sub>V<sub>f</sub>)/(&gamma;&minus;1).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span><strong>Isochoric</strong>: dV=0 &rarr; W=0 &rarr; Q=dU=&mu;C<sub>v</sub> dT.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>Isobaric</strong>: dP=0 &rarr; W=P&Delta;V &rarr; Q=&mu;C<sub>p</sub> dT.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <span><strong>Free Expansion</strong>: Into vacuum &rarr; Q=0, W=0, dU=0, &Delta;T=0. Irreversible! &Delta;S<sub>universe</sub> &gt; 0.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <span><strong>Cyclic Process</strong>: &Delta;U<sub>net</sub>=0. Net Work = Net Heat = Enclosed PV loop area.</span>
            </li>
          </ul>
        </div>

        {/* Row 3: Carnot & Entropy */}
        <div>
 <span className="text-[10px] uppercase tracking-widest text-white/30 block pb-2">🔥 Carnot Cycle &amp; Entropy</span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-[13px] text-white/80">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>Carnot 4 Steps</strong>: Iso-exp(T<sub>H</sub>) &rarr; Adi-exp &rarr; Iso-comp(T<sub>L</sub>) &rarr; Adi-comp.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>Key Ratio</strong>: Q<sub>H</sub>/Q<sub>C</sub> = T<sub>H</sub>/T<sub>L</sub>. Efficiency: &eta; = 1 &minus; T<sub>L</sub>/T<sub>H</sub> = W/Q<sub>H</sub>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>Refrigerator COP</strong>: &beta;<sub>ref</sub> = Q<sub>L</sub>/W = T<sub>L</sub>/(T<sub>H</sub>&minus;T<sub>L</sub>) = (1&minus;&eta;)/&eta;.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span><strong>Heat Pump COP</strong>: COP<sub>hp</sub> = Q<sub>H</sub>/W = T<sub>H</sub>/(T<sub>H</sub>&minus;T<sub>L</sub>) = &beta;<sub>ref</sub> + 1.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>2nd Law (Entropy)</strong>: &Delta;S<sub>universe</sub> &ge; 0 always. &Delta;S = 0 (reversible); &Delta;S &gt; 0 (irreversible).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Entropy formulas</strong>: Isothermal &Delta;S = &mu;R ln(V<sub>f</sub>/V<sub>i</sub>); Adiabatic reversible &Delta;S = 0.</span>
            </li>
          </ul>
        </div>

        {/* Row 4: Advanced shortcuts */}
        <div>
 <span className="text-[10px] uppercase tracking-widest text-white/30 block pb-2">⚙️ Advanced Shortcuts</span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-[13px] text-white/80">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Polytropic C</strong>: C = C<sub>v</sub> + R/(1&minus;x) for PV<sup>x</sup>=const. Saves ~3 min on IAT.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>PV slope</strong>: (dP/dV)<sub>adi</sub> = &gamma; &middot; (dP/dV)<sub>iso</sub>. Adiabatic always steeper.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Monoatomic</strong>: f=3, C<sub>v</sub>=3/2 R, C<sub>p</sub>=5/2 R, &gamma;=5/3&asymp;1.67.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Diatomic</strong>: f=5, C<sub>v</sub>=5/2 R, C<sub>p</sub>=7/2 R, &gamma;=7/5=1.40.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
