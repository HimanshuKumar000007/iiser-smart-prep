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
      <span className={colors[color] ?? 'text-violet-400'}>{icon}</span>
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-widest">{label}</h2>
    </div>
  );
}

function ModuleHeader({ number, title, difficulty, color = 'violet' }: { number: number; title: string; difficulty: number; color?: string }) {
  const badgeColors: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
      <div className="flex items-center gap-2.5">
 <span className={cn('text-xs font-bold px-2 py-0.5 rounded border uppercase', badgeColors[color])}>
          Part {number}
        </span>
        <h3 className="text-white font-display font-bold text-[17px]">{title}</h3>
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
    <div className={cn('rounded-xl border p-4.5 space-y-3.5 transition-all duration-200', bgColors[color], borderColors[color])}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10 uppercase">
              Priority: {priority}
            </span>
          </div>
          <div className={cn('font-mono font-bold text-[17px] sm:text-lg tracking-wide pt-1', formulaColors[color])}><span dangerouslySetInnerHTML={{ __html: formula }} /></div>
          <div className="text-white/80 text-[13px] font-semibold leading-relaxed pt-1"><span dangerouslySetInnerHTML={{ __html: use_when }} /></div>
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
    <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3">
 <span className={cn('text-xs font-bold px-2 py-0.5 rounded border uppercase', accentColors[color])}>
          Solved Numerical {number}
        </span>
      </div>
      <div className="text-white font-medium text-[14.5px] leading-relaxed">{question}</div>

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

function KeplerCard({
  title, question, answer
}: {
  title: string;
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/5 bg-[#0A0C18] rounded-xl overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="space-y-0.5">
 <span className="text-[12px] uppercase font-bold text-cyan-400">Kepler Laws</span>
          <h4 className="text-white font-bold text-[14.5px]">{title}</h4>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-white/5 bg-white/[0.01] space-y-3 text-[13px]">
          <div className="text-white/60 font-semibold">{question}</div>
 <div className="p-3 bg-violet-500/5 border border-violet-500/10 rounded-lg text-white leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

function HohmannTransferDiagram() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs mx-auto" aria-label="Hohmann transfer orbit diagram between two circular orbits">
      {/* Central Planet */}
      <circle cx="120" cy="80" r="16" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
      <text x="120" y="83" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Planet</text>
      
      {/* Inner Circular Orbit */}
      <circle cx="120" cy="80" r="35" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <text x="120" y="38" fill="#38bdf8" fontSize="7" textAnchor="middle">Inner Orbit (r₁)</text>
      
      {/* Outer Circular Orbit */}
      <circle cx="120" cy="80" r="65" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <text x="120" y="10" fill="#38bdf8" fontSize="7" textAnchor="middle">Outer Orbit (r₂)</text>
      
      {/* Hohmann Elliptical Transfer Orbit */}
      <ellipse cx="105" cy="80" rx="50" ry="43" fill="none" stroke="#a78bfa" strokeWidth="2" />
      <text x="75" y="132" fill="#a78bfa" fontSize="8" fontWeight="bold">Hohmann Transfer Orbit</text>
      
      {/* Perihelion Burn Δv₁ */}
      <circle cx="155" cy="80" r="3" fill="#f43f5e" />
      <line x1="155" y1="80" x2="155" y2="55" stroke="#f43f5e" strokeWidth="1.5" />
      <polygon points="155,55 152,62 158,62" fill="#f43f5e" />
      <text x="162" y="65" fill="#f43f5e" fontSize="7" fontWeight="bold">Δv₁ Boost</text>
      
      {/* Outer touchpoint: (55, 80) */}
      <circle cx="55" cy="80" r="3" fill="#f43f5e" />
      <line x1="55" y1="80" x2="55" y2="105" stroke="#f43f5e" strokeWidth="1.5" />
      <polygon points="55,105 52,98 58,98" fill="#f43f5e" />
      <text x="25" y="103" fill="#f43f5e" fontSize="7" fontWeight="bold">Δv₂ Boost</text>
    </svg>
  );
}

function EquipotentialFieldLinesDiagram() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs mx-auto" aria-label="Gravitational field lines and equipotential surfaces diagram">
      {/* Central Mass */}
      <circle cx="120" cy="80" r="10" fill="#f59e0b" />
      <text x="120" y="83" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">M</text>
      
      {/* Radial Field Lines pointing inwards */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 120 + 70 * Math.cos(rad);
        const y1 = 80 + 70 * Math.sin(rad);
        const x2 = 120 + 15 * Math.cos(rad);
        const y2 = 80 + 15 * Math.sin(rad);
        
        // arrow tip coords
        const xt = 120 + 35 * Math.cos(rad);
        const yt = 80 + 35 * Math.sin(rad);
        
        return (
          <g key={angle}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
            <circle cx={xt} cy={yt} r="1.5" fill="#06b6d4" />
          </g>
        );
      })}
      <text x="190" y="40" fill="#06b6d4" fontSize="8" fontWeight="bold">Field Lines (Eg)</text>
      
      {/* Equipotential Concentric Circles */}
      <circle cx="120" cy="80" r="30" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
      <text x="120" y="47" fill="#c084fc" fontSize="7" textAnchor="middle">V₁</text>
      
      <circle cx="120" cy="80" r="50" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
      <text x="120" y="27" fill="#c084fc" fontSize="7" textAnchor="middle">V₂</text>
      
      <circle cx="120" cy="80" r="68" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
      <text x="120" y="9" fill="#c084fc" fontSize="7" textAnchor="middle">V₃ (V₁ &lt; V₂ &lt; V₃)</text>
      
      <text x="135" y="145" fill="#a78bfa" fontSize="8" fontWeight="bold">Equipotentials (V = const)</text>
    </svg>
  );
}

function GpePotentialWellDiagram() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs mx-auto" aria-label="Gravitational potential energy curve showing the potential well">
      {/* Axes */}
      <line x1="30" y1="20" x2="220" y2="20" stroke="#ffffff40" strokeWidth="1.5" />
      <line x1="30" y1="10" x2="30" y2="150" stroke="#ffffff40" strokeWidth="1.5" />
      <text x="225" y="24" fill="#ffffff60" fontSize="8" fontFamily="monospace">r</text>
      <text x="20" y="15" fill="#ffffff60" fontSize="8" fontFamily="monospace">U(r)</text>
      
      {/* Potential well curve: U = -1/r */}
      <path d="M 40 140 Q 55 50 210 25" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
      <text x="110" y="55" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace">U = -GMm / r</text>
      
      {/* Bound orbits region */}
      <rect x="40" y="21" width="170" height="110" fill="#f43f5e08" pointerEvents="none" />
      <text x="120" y="100" fill="#fca5a5" fontSize="8" textAnchor="middle">Bound System (E &lt; 0)</text>
      
      {/* Escape limit */}
      <line x1="30" y1="20" x2="220" y2="20" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
      <text x="160" y="14" fill="#10b981" fontSize="7" fontWeight="bold">Escape Energy (E &ge; 0)</text>
      
      <circle cx="50" cy="80" r="3" fill="#ffffff" />
      <text x="56" y="83" fill="#ffffff" fontSize="8">Orbit point</text>
    </svg>
  );
}

export function GravitationLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 7</span>
      </div>

      {/* Subject Header */}
      <div className="relative overflow-hidden p-6 bg-gradient-to-br from-[#0B0D1B] via-[#0D0F22] to-[#12142E] border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center flex-wrap gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 shadow-lg shadow-violet-500/10">
                <Brain className="w-5.5 h-5.5" />
              </div>
              <div className="flex items-center gap-2">
 <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-[12px] font-bold uppercase tracking-wider">
                  PHYSICS UNIT 7
                </span>
 <span className="px-3 py-1 rounded-full bg-[#3B1219] border border-rose-500/30 text-rose-400 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> HIGH WEIGHTAGE
                </span>
              </div>
            </div>
            
            <div className="text-right shrink-0">
 <div className="text-[12px] uppercase tracking-widest text-white/40">READING PROGRESS</div>
              <div className="text-cyan-400 font-bold text-[19px] font-mono">{progress}%</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-white leading-tight">
              Gravitation (Fields, Potentials and Orbits)
            </h1>
 <div className="text-[12px] font-bold uppercase tracking-widest text-cyan-400/80">
              CORE NCERT FOUNDATION FOR IISER IAT EXAM
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">REVISION TIME</div>
 <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>45 min</span>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">IAT IMPORTANCE</div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">YEARLY OCCURRENCE</div>
 <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>1-2 questions every year</span>
              </div>
            </div>
          </div>

          {/* Premium Progress Track */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="h-3 bg-white/5 rounded-full relative overflow-visible border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 relative shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                style={{ width: `${progress}%` }}
              >
                {progress > 0 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_10px_#06b6d4] animate-pulse pointer-events-none" />
                )}
              </div>
            </div>
 <div className="flex justify-between items-center text-[12px] mt-1">
              <span className="text-white/40">Status: {isCompleted ? 'Completed' : progress >= 90 ? 'Ready to Quiz' : 'Reading Content'}</span>
              <span className={cn("font-bold transition-all", isCompleted ? "text-emerald-400" : "text-cyan-400")}>
                {isCompleted ? '✅ Lesson Completed! • Quiz Passed!' : progress >= 90 ? 'Reading Completed (100%) • Quiz Unlocked!' : `Scroll to unlock quiz (${90 - progress}% more)`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn box */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" /> WHAT YOU&apos;LL LEARN
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-6 text-[13px] text-white/80">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Universal Law of Gravitation & Electrostatics Analogy</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Gravitational Field (Eg) & Potential (V) properties</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Variation of gravity with Altitude, Depth, and Latitude</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Escape Velocity vs. Orbital speed trajectories</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Kepler&apos;s Laws of Planetary Motion (Elliptical geometry)</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Virial Energy Theorem (Circular Satellites)</span>
          </li>
        </ul>
      </div>

      {/* ── SECTION 1: Core Concepts ─────────────────────────────────────────── */}
      <div className="space-y-12">
        
        {/* Part 1 */}
        <div className="space-y-6">
          <ModuleHeader number={1} title="Universal Gravitation & Electrostatics Analogy" difficulty={3} color="violet" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                The <strong>Universal Law of Gravitation</strong> states that every particle of mass in the universe attracts every other particle with a central, conservative force proportional to the product of their masses and inversely proportional to the square of the distance between them.
              </p>
            </div>

            {/* Universal Gravitational Constant G */}
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-2">
              <span className="text-[11px] font-black text-violet-400 uppercase tracking-wider block">Universal Gravitational Constant (G)</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                The constant <code className="font-mono text-white bg-white/5 px-1 rounded">G</code> is a fundamental universal constant of nature. It was first experimentally determined by Henry Cavendish:
              </p>
 <div className="text-violet-300 text-[12.5px] bg-black/20 p-2.5 rounded text-center">
                G = 6.674 &times; 10&supminus;&sup1;&sup1; N&middot;m&sup2;/kg&sup2;
              </div>
              <p className="text-white/50 text-[11.5px] leading-relaxed">
                Unlike the electrostatic force constant, the value of <code className="font-mono text-white">G</code> is **completely independent of the medium** separating the masses, temperature, pressure, or chemical state. Dimensions: <span className="font-mono text-cyan-300">[M&supminus;&sup1; L&sup3; T&supminus;&sup2;]</span>.
              </p>
            </div>

            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                <strong>Electrostatics Analogy:</strong> Gravitational mechanics shares an identical mathematical framework with electrostatics. By mapping constants, you can solve complex gravitational field and potential problems instantly:
              </p>
            </div>

            {/* Analogy Table & Equipotential Field Lines Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
 <tr className="border-b border-white/5 text-white/40">
                      <th className="py-2.5">Property</th>
                      <th className="py-2.5">Gravitation</th>
                      <th className="py-2.5">Electrostatics</th>
                    </tr>
                  </thead>
 <tbody className="divide-y divide-white/5 text-white/80">
                    <tr>
                      <td className="py-3 font-semibold text-white">Force Constant</td>
                      <td className="py-3 text-rose-400">-G (6.67 * 10^-11)</td>
                      <td className="py-3 text-cyan-400">k = 1 / (4&pi;&epsilon;₀) (9 * 10^9)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-white">Primary Quantity</td>
                      <td className="py-3 text-rose-400">Mass (m)</td>
                      <td className="py-3 text-cyan-400">Charge (q)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-white">Potential (V)</td>
                      <td className="py-3 text-rose-400">-GM / r</td>
                      <td className="py-3 text-cyan-400">k q / r</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-white">Field (E)</td>
                      <td className="py-3 text-rose-400">-GM / r²</td>
                      <td className="py-3 text-cyan-400">k q / r²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-center">
                <EquipotentialFieldLinesDiagram />
 <div className="text-[11px] text-white/40 uppercase tracking-widest text-center mt-2">
                  Figure 1.1: Field Lines &amp; Equipotentials (Eg &perp; V)
                </div>
              </div>
            </div>

            {/* Gravitational Potential Energy of a System of Particles */}
            <div className="p-4.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
              <span className="text-[13px] font-bold text-cyan-300 uppercase tracking-wider block">Gravitational Potential Energy of a System of Particles</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                For a system containing multiple point masses, the total gravitational potential energy U is the sum of the potential energies of all unique pairs. It represents the total work done in assembling the system from infinity:
              </p>
 <div className="text-cyan-300 text-[12.5px] bg-black/20 p-2.5 rounded text-center">
                U = &minus;G &Sigma;<sub>i &lt; j</sub> (m<sub>i</sub> &middot; m<sub>j</sub>) / r<sub>ij</sub>
              </div>
              <p className="text-white/50 text-[11.5px] leading-relaxed">
 For example, for 3 masses m<sub>1</sub>, m<sub>2</sub>, m<sub>3</sub> at the corners of a triangle: <span className="text-cyan-300">U = &minus;G [ (m<sub>1</sub>m<sub>2</sub>)/r<sub>12</sub> + (m<sub>2</sub>m<sub>3</sub>)/r<sub>23</sub> + (m<sub>1</sub>m<sub>3</sub>)/r<sub>13</sub> ]</span>.
              </p>
            </div>

            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                <strong>Field & Potential Relation:</strong> The gravitational field vector E<sub>g</sub> is the negative gradient of the gravitational potential V:
                E<sub>g</sub> = &minus;dV / dr
                This shows that the gravitational field vector always points in the direction of decreasing potential (i.e. towards the attracting mass).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={1}
              question="Three equal masses m are placed at the three vertices of an equilateral triangle of side length a. Find the gravitational potential at the center of the triangle."
              steps={[
                "The distance from each vertex to the center of an equilateral triangle of side a is: r = a / sqrt(3).",
                "Since gravitational potential is a scalar quantity, sum the potentials due to each of the three masses.",
                "Potential V = V<sub>1</sub> + V<sub>2</sub> + V<sub>3</sub> = &minus;GM/r &minus; GM/r &minus; GM/r = &minus;3 * G * M / r.",
                "Substitute r = a / sqrt(3): V = &minus;3 * G * M / (a / sqrt(3)) = &minus;3 * sqrt(3) * G * M / a."
              ]}
              answer="V<sub>center</sub> = &minus;3&radic;3 GM/a"
              color="violet"
            />

            <SolvedExample
              number={2}
              question="Two point masses 4m and 9m are separated by a distance d. Find the distance of the point from mass 4m where the net gravitational field is zero (Neutral Point)."
              steps={[
                "Let the point be at distance x from mass m1 = 4m. Hence, distance from m2 = 9m is d - x.",
                "Equate the gravitational field magnitudes: G * m1 / x² = G * m2 / (d - x)².",
                "Substitute values: G * (4m) / x² = G * (9m) / (d - x)²  => 4/x² = 9/(d-x)².",
                "Take square root of both sides: 2/x = 3/(d-x).",
                "Cross multiply and solve: 2(d-x) = 3x  => 2d - 2x = 3x  => 5x = 2d  => x = 2d/5 = 0.4d."
              ]}
              answer="x = 2d/5 (from mass 4m)"
              color="violet"
            />
          </div>
        </div>

        {/* Part 2 */}
        <div className="space-y-6">
          <ModuleHeader number={2} title="Variation of g (Altitude, Depth & Latitude)" difficulty={4} color="cyan" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                The acceleration due to gravity g at the surface of Earth is:
                g = GM / R² = (4/3)·π·ρ·G·R
                Where ρ is the mean density of the Earth, and R is the radius. Apparent gravity varies depending on elevation, depth, and the latitude of rotation:
              </p>
 <ul className="list-disc list-inside space-y-2.5 text-white/70 text-[13px]">
                <li>
                  <strong className="text-cyan-300">Variation with Height (h):</strong>
                  <br />
                  Exact formula (valid for all heights): g_h = g / (1 + h/R)²
                  <br />
                  Approximation (valid ONLY if h &lt; 5% of R): g_h ≈ g * (1 - 2h/R)
                </li>
                <li>
                  <strong className="text-cyan-300">Variation with Depth (d):</strong>
                  <br />
                  Exact formula: g<sub>d</sub> = g &middot; (1 &minus; d/R)
                  <br />
                  (Note that gravity decreases linearly to exactly zero at the center of the Earth!)
                </li>
                <li>
                  <strong className="text-cyan-300">Variation with Latitude (&lambda;) due to Earth&apos;s rotation &omega;:</strong>
                  <br />
                  g<sub>&lambda;</sub> = g &minus; R &middot; &omega;&sup2; &middot; cos&sup2;&lambda;
                  <br />
                  At poles (&lambda; = 90&deg;): g<sub>pole</sub> = g (maximum value, unaffected by rotation).
                  <br />
                  At equator (&lambda; = 0&deg;): g<sub>equator</sub> = g &minus; R&middot;&omega;&sup2; (minimum value).
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={3}
              question="At what height above the Earth's surface will the acceleration due to gravity become 36% of its value at the surface? (Take radius of Earth as R)."
              steps={[
                "Identify the given ratio: g<sub>h</sub> / g = 36% = 0.36.",
                "Since the value decreases significantly, do not use the linear approximation. Use the exact formula: g<sub>h</sub> = g / (1 + h/R)&sup2;.",
                "Substitute values: g / (1 + h/R)&sup2; = 0.36 * g  => 1 / (1 + h/R)&sup2; = 36/100.",
                "Take the square root of both sides: 1 / (1 + h/R) = 6/10.",
                "Reciprocate: 1 + h/R = 10/6 = 5/3.",
                "Solve for h/R: h/R = 5/3 - 1 = 2/3  => h = 2R/3."
              ]}
              answer="h = 2R/3"
              color="cyan"
            />

            <SolvedExample
              number={4}
              question="Find the depth below the Earth's surface where the acceleration due to gravity is equal to the acceleration due to gravity at a height h = R/4. (Take Earth's radius as R)."
              steps={[
                "First calculate g at height h = R/4: g<sub>h</sub> = g / (1 + h/R)&sup2; = g / (1 + 1/4)&sup2; = g / (5/4)&sup2; = 16g / 25.",
                "Now set this equal to the value at depth d: g<sub>d</sub> = g * (1 - d/R) = 16g / 25.",
                "Cancel g: 1 - d/R = 16/25.",
                "Solve for d/R: d/R = 1 - 16/25 = 9/25  => d = 9R/25 = 0.36R."
              ]}
              answer="d = 9R/25 (or 0.36 R)"
              color="cyan"
            />
          </div>
        </div>

        {/* Part 3 */}
        <div className="space-y-6">
          <ModuleHeader number={3} title="Escape Velocity & Orbital Dynamics" difficulty={4} color="amber" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                <strong>Escape Velocity (v<sub>e</sub>):</strong> represents the minimum speed required for a projectile to escape the gravitational pull of a planet:
                v<sub>e</sub> = &radic;(2GM / R) = &radic;(2gR)
                (Note that escape velocity depends ONLY on planet parameters and starting location; it is 100% independent of projectile mass and angle of launch). For Earth, v<sub>e</sub> &asymp; 11.2 km/s.
              </p>
              <p>
                <strong>Orbital Velocity (v<sub>o</sub>):</strong> is the speed required to maintain a circular orbit at distance r from the planet center:
                v<sub>o</sub> = &radic;(GM / r)
              </p>
              <p>
                <strong>Crucial Relation near Surface (r &asymp; R):</strong>
                v<sub>e</sub> = &radic;2 &middot; v<sub>o</sub>
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* SVG Diagram 3: Escape vs Orbital */}
              <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                <svg width="240" height="150" viewBox="0 0 240 150" className="max-w-full">
                  {/* Earth */}
                  <circle cx="80" cy="85" r="20" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="80" y="88" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">Planet</text>

                  {/* Launch Point */}
                  <circle cx="80" cy="55" r="2.5" fill="#ffffff" />
                  
                  {/* Circular orbit (vo) */}
                  <circle cx="80" cy="85" r="30" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 80 55 A 30 30 0 0 1 110 85" fill="none" stroke="#06b6d4" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  <text x="115" y="65" fill="#06b6d4" fontSize="7">vo (Orbit)</text>

                  {/* Escape trajectory (ve) */}
                  <path d="M 80 55 Q 160 55 220 120" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                  <text x="175" y="65" fill="#34d399" fontSize="7">ve (Escape)</text>
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" />
                    </marker>
                  </defs>
                </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                  Figure 3.1: Circular Path vs Escape Path
                </div>
              </div>

              {/* SVG Diagram 1: Planet Orbit r vs h */}
              <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                <svg width="240" height="150" viewBox="0 0 240 150" className="max-w-full">
                  <circle cx="120" cy="75" r="60" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Earth */}
                  <circle cx="120" cy="75" r="30" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="120" y="78" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Earth</text>
                  
                  {/* Satellite */}
                  <circle cx="180" cy="75" r="4" fill="#f59e0b" />
                  
                  {/* Dimensions */}
                  <line x1="120" y1="75" x2="120" y2="105" stroke="#ffffff" strokeWidth="1" />
                  <text x="114" y="93" fill="#ffffff" fontSize="7" textAnchor="end">R</text>
                  
                  <line x1="120" y1="105" x2="120" y2="135" stroke="#a855f7" strokeWidth="1" />
                  <text x="114" y="123" fill="#c084fc" fontSize="7" textAnchor="end">h</text>
                  
                  <line x1="120" y1="75" x2="180" y2="75" stroke="#10b981" strokeWidth="1" />
                  <text x="150" y="69" fill="#34d399" fontSize="7" textAnchor="middle">r = R + h</text>
                </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                  Figure 3.2: Orbital Radius (r) vs Altitude (h)
                </div>
              </div>

              {/* SVG Diagram: GPE Potential Well */}
              <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
                <GpePotentialWellDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                  Figure 3.3: Potential Well &amp; Orbit Bound States
                </div>
              </div>
            </div>
          </div>

          {/* Satellite Orbit Characteristics & Weightlessness */}
          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
            <h4 className="text-white font-bold text-[14.5px]">Time Period, Binding Energy &amp; Weightlessness</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl space-y-2">
                <span className="text-[13px] font-bold text-amber-300 uppercase block">Time Period of Satellite (T)</span>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
 The time taken by a satellite to complete one full revolution is derived from the orbital velocity (<span className="text-cyan-300">v<sub>o</sub> = &radic;(GM/r)</span>):
                </p>
 <div className="text-amber-200 text-[12.5px] bg-black/20 p-2 rounded">
                  T = 2&pi;r / v<sub>o</sub> = 2&pi; &radic;(r&sup3; / GM)
                </div>
                <p className="text-white/50 text-[11.5px] leading-relaxed">
 Square both sides: <span className="text-cyan-300">T&sup2; = (4&pi;&sup2;/GM)r&sup3;</span>. This is Kepler's Third Law (Harmonic Law)!
                </p>
                <p className="text-white/55 text-[11.5px] leading-relaxed border-t border-white/5 pt-1.5 mt-1.5">
                  <strong>Geostationary Altitude Derivation:</strong> For a geostationary satellite, T = 24 hours = 86,400 seconds. Substituting this into the time period formula gives:
 <span className="text-amber-300 block mt-0.5">r &asymp; 42,200 km ⟹ h = r &minus; R &asymp; 36,000 km</span>
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl space-y-2">
                <span className="text-[13px] font-bold text-amber-300 uppercase block">Binding Energy &amp; Weightlessness</span>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
                  <strong>Binding Energy (B.E.):</strong> is the energy that must be supplied to a satellite to escape its orbit completely to infinity:
                </p>
 <div className="text-amber-200 text-[12.5px] bg-black/20 p-2 rounded">
                  B.E. = &minus;E<sub>total</sub> = +GMm / 2r
                </div>
                <p className="text-white/75 text-[12.5px] leading-relaxed border-t border-white/5 pt-2 mt-2">
                  <strong>Weightlessness in Orbit:</strong>
                </p>
                <p className="text-white/60 text-[12px] leading-relaxed">
                  Astronauts in space feel weightless NOT because there is &quot;zero gravity&quot; (gravity at 400 km space station altitude is still about 90% of earth surface gravity), but because they are in a state of continuous <strong>free fall</strong>. Since both the spacecraft and the astronauts fall towards the Earth with the same centripetal acceleration, the normal reaction force between them is zero:
 <span className="text-rose-300 block mt-0.5">N = m(g &minus; a) = 0</span>
                </p>
              </div>
            </div>
          </div>

          <SolvedExample
            number={5}
            question="A satellite of mass m is in a circular orbit of radius 3R around a planet of mass M and radius R. Find the minimum speed with which it must be launched from the surface to reach this orbit."
            steps={[
              "Apply Conservation of Mechanical Energy: E<sub>surface</sub> = E<sub>orbit</sub>.",
              "E<sub>surface</sub> = K<sub>launch</sub> - G * M * m/R. E<sub>orbit</sub> = -G * M * m/(2 * r) = -G * M * m/(2*(3R)) = -G * M * m/(6R).",
              "Set them equal: (1/2)*m*v&sup2; - G * M * m/R = -G * M * m/(6R).",
              "Cancel m and solve: (1/2)*v&sup2; = G * M/R - G * M/(6R) = (5/6)*G * M/R.",
              "Multiply by 2: v&sup2; = (5/3)*G * M/R  => v = &radic;(5GM / 3R)."
            ]}
            answer="v = &radic;(5GM / 3R)"
            color="amber"
          />
        </div>

        {/* Part 4 */}
        <div className="space-y-6">
          <ModuleHeader number={4} title="Kepler’s Laws & Orbital Mechanics" difficulty={4} color="emerald" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                Kepler&apos;s Laws govern the motion of planets orbiting around a star or satellites orbiting a planet:
              </p>
            </div>

            {/* SVG Diagram 2: Kepler Orbit */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
              <svg width="360" height="150" viewBox="0 0 360 150" className="max-w-full">
                {/* Ellipse orbit */}
                <ellipse cx="180" cy="75" rx="100" ry="50" fill="none" stroke="#6366f1" strokeWidth="2" />
                
                {/* Sun at Focus 1 */}
                <circle cx="130" cy="75" r="14" fill="#f59e0b" />
                <text x="130" y="79" fill="#000000" fontSize="9" fontWeight="bold" textAnchor="middle">Sun</text>
                
                {/* Perihelion */}
                <circle cx="80" cy="75" r="5" fill="#ef4444" />
                <text x="80" y="65" fill="#fca5a5" fontSize="8" textAnchor="middle">Perihelion</text>
                <text x="80" y="92" fill="#fca5a5" fontSize="8" textAnchor="middle">vₘₐₓ | rₘᵢₙ</text>
                
                {/* Aphelion */}
                <circle cx="280" cy="75" r="5" fill="#3b82f6" />
                <text x="280" y="65" fill="#93c5fd" fontSize="8" textAnchor="middle">Aphelion</text>
                <text x="280" y="92" fill="#93c5fd" fontSize="8" textAnchor="middle">vₘᵢₙ | rₘₐₓ</text>
                
                {/* Angular Momentum Conservation line */}
                <line x1="130" y1="75" x2="80" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="130" y1="75" x2="280" y2="75" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                Figure 4.1: Elliptical Kepler Orbit Parameters and Conservations
              </div>
            </div>
          </div>

          {/* Kepler Collapsible Cards */}
          <div className="grid grid-cols-1 gap-3.5">
            <KeplerCard
              title="1st Law: Law of Orbits"
              question="What is the shape of the path of a planet?"
              answer="Planets move in elliptical orbits with the Sun at one of the two foci."
            />
            <KeplerCard
              title="2nd Law: Law of Areas"
              question="What remains constant during planetary motion?"
              answer="Areal Velocity is constant (dA/dt = L / 2m). This is a direct consequence of the Conservation of Angular Momentum under a central force field (net torque is zero)."
            />
            <KeplerCard
              title="3rd Law: Law of Periods"
              question="What is the relationship between the time period and semi-major axis?"
              answer="T² ∝ a³, where T is the time period and a is the semi-major axis of the elliptical orbit."
            />
          </div>

          <SolvedExample
            number={6}
            question="A planet orbits the sun in an elliptical path. The distance at perihelion is r1 and at aphelion is r2. If the speed of the planet at perihelion is v1, find its speed at aphelion."
            steps={[
              "No external torque acts on the planet about the Sun focus, so Angular Momentum (L) is conserved.",
              "L = m * v * r * sinθ. At perihelion and aphelion, the velocity is perpendicular to the position vector (θ = 90°).",
              "Therefore, L = m * v<sub>1</sub> * r<sub>1</sub> = m * v<sub>2</sub> * r<sub>2</sub>.",
              "Cancel m: v<sub>1</sub> * r<sub>1</sub> = v<sub>2</sub> * r<sub>2</sub>  => v<sub>2</sub> = v<sub>1</sub> * r<sub>1</sub> / r<sub>2</sub>."
            ]}
            answer="v<sub>2</sub> = v<sub>1</sub> &middot; r<sub>1</sub> / r<sub>2</sub>"
            color="emerald"
          />
        </div>

        {/* Part 5 */}
        <div className="space-y-6">
          <ModuleHeader number={5} title="Conceptual Insights & Advanced Tricks" difficulty={5} color="rose" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                <strong>The Spherical Cavity Trick:</strong> The gravitational field inside a spherical cavity carved inside a uniform solid sphere is completely uniform in magnitude and direction!
                E<sub>g</sub> = &frac43; &middot; &pi; &middot; &rho; &middot; G &middot; a
                (Where a is the vector connecting the center of the solid sphere to the center of the cavity).
              </p>
              <p>
                <strong>Tunnel Through the Earth:</strong> If a tunnel is dug along any chord of the Earth, a particle dropped in it will execute Simple Harmonic Motion (SHM) with time period:
                T = 2π * sqrt(R / g) ≈ 84.6 minutes
                (Note that the period is independent of the location or length of the tunnel chord!)
              </p>
            </div>

            {/* SVG Diagram 4: Field Graphs */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
              <svg width="360" height="150" viewBox="0 0 360 150" className="max-w-full">
                {/* Solid Sphere Graph */}
                <g transform="translate(10, 0)">
                  <line x1="30" y1="20" x2="30" y2="120" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="30" y1="120" x2="160" y2="120" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="25" y="15" fill="#ffffff" fontSize="8" textAnchor="end">g</text>
                  <text x="165" y="123" fill="#ffffff" fontSize="8">r</text>
                  
                  <line x1="85" y1="120" x2="85" y2="40" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
                  <text x="85" y="132" fill="#ffffff" fontSize="8" textAnchor="middle">r = R</text>
                  
                  <line x1="30" y1="120" x2="85" y2="40" stroke="#3b82f6" strokeWidth="2" />
                  <text x="50" y="75" fill="#93c5fd" fontSize="8">g ∝ r</text>
                  
                  <path d="M 85 40 Q 110 90 150 110" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  <text x="130" y="75" fill="#93c5fd" fontSize="8">g ∝ 1/r²</text>
                  
                  <text x="95" y="14" fill="#3b82f6" fontSize="9" fontWeight="bold" textAnchor="middle">Solid Sphere</text>
                </g>

                {/* Hollow Shell Graph */}
                <g transform="translate(190, 0)">
                  <line x1="30" y1="20" x2="30" y2="120" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="30" y1="120" x2="160" y2="120" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="25" y="15" fill="#ffffff" fontSize="8" textAnchor="end">g</text>
                  <text x="165" y="123" fill="#ffffff" fontSize="8">r</text>
                  
                  <line x1="85" y1="120" x2="85" y2="40" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
                  <text x="85" y="132" fill="#ffffff" fontSize="8" textAnchor="middle">r = R</text>
                  
                  <line x1="30" y1="120" x2="85" y2="120" stroke="#ef4444" strokeWidth="2.5" />
                  <text x="55" y="112" fill="#fca5a5" fontSize="8">g = 0</text>
                  
                  <path d="M 85 40 Q 110 90 150 110" fill="none" stroke="#ef4444" strokeWidth="2" />
                  <text x="130" y="75" fill="#fca5a5" fontSize="8">g ∝ 1/r²</text>
                  
                  <text x="95" y="14" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">Hollow Shell</text>
                </g>
              </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                Figure 5.1: Acceleration due to Gravity Variation (Solid Earth vs Hollow Shell)
              </div>
            </div>

            {/* Field Inside Solid Sphere vs Hollow Shell Formulas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
                <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider block">Field Inside a Solid Sphere (r &lt; R)</span>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
                  Inside a uniform solid sphere of mass M and radius R, the gravitational field intensity increases linearly from the center:
                </p>
 <div className="text-cyan-300 text-[12.5px] bg-black/20 p-2.5 rounded text-center">
                  E<sub>g</sub> = (G &middot; M / R&sup3;) &middot; r &nbsp;&nbsp;(r &lt; R)
                </div>
                <p className="text-white/50 text-[11.5px]">
                  At the center (r = 0), the field is zero. At the surface (r = R), it reaches maximum value: g = GM/R&sup2;.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-2">
                <span className="text-[11px] font-black text-rose-400 uppercase tracking-wider block">Field Inside a Hollow Shell (r &lt; R)</span>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
                  According to Newton's Shell Theorem, the gravitational field at any point inside a hollow spherical shell is zero:
                </p>
 <div className="text-rose-300 text-[12.5px] bg-black/20 p-2.5 rounded text-center">
                  E<sub>g</sub> = 0 &nbsp;&nbsp;(for all r &lt; R)
                </div>
                <p className="text-white/50 text-[11.5px]">
                  Therefore, a mass element placed inside a hollow shell experiences zero net gravitational force from the shell.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={7}
              question="A tunnel is dug along a diameter of the Earth. A ball is dropped from the surface into the tunnel. Calculate the speed of the ball when it reaches the center of the Earth."
              steps={[
                "Apply Conservation of Mechanical Energy: E<sub>surface</sub> = E<sub>center</sub>.",
                "E<sub>surface</sub> = &minus;G * M * m/R. E<sub>center</sub> = K<sub>center</sub> + V<sub>center</sub> * m.",
                "Recall gravitational potential at the center of a uniform solid sphere: V<sub>center</sub> = -1.5 * G * M/R.",
                "Equate energies: -G * M * m/R = (1/2)*m*v&sup2; - 1.5 * G * M * m/R.",
                "Simplify: (1/2)*v&sup2; = 1.5 * G * M/R - G * M/R = 0.5 * G * M/R  => v&sup2; = G * M/R.",
                "Substitute g = G * M/R&sup2;: v = &radic;(g * R)."
              ]}
              answer="v = &radic;(gR) &asymp; 7.9 km/s"
              color="rose"
            />

            <SolvedExample
              number={8}
              question="A satellite of mass 200 kg revolves in a circular orbit of radius 3R around a planet of mass M and radius R. Calculate the binding energy of the satellite."
              steps={[
                "Total energy of the satellite in circular orbit: E<sub>total</sub> = -G * M * m / (2 * r).",
                "Substitute orbit radius r = 3R: E<sub>total</sub> = -G * M * m / (6 * R).",
                "Binding energy is defined as the negative of the total energy: B.E. = -E<sub>total</sub> = G * M * m / (6 * R).",
                "Substitute given mass m = 200 kg: B.E. = 200 * G * M / (6 * R) = 100 * G * M / (3 * R)."
              ]}
              answer="B.E. = 100 GM / 3R"
              color="rose"
            />
          </div>
        </div>

      </div>

      {/* ── SECTION 2: Formula Priorities & When to Use ──────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <SectionHeader icon={<TrendingUp className="w-5 h-5" />} label="Formula Priorities & When to Use" color="violet" />

        {/* SVG Diagrams: Satellite Energy & Hohmann Transfer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
            <svg width="340" height="110" viewBox="0 0 340 110" className="max-w-full">
              <rect x="20" y="35" width="80" height="40" rx="6" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
              <text x="60" y="52" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">K.E. (Positive)</text>
              <text x="60" y="68" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">+100 J</text>

              <text x="120" y="60" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">⇄</text>

              <rect x="140" y="35" width="80" height="40" rx="6" fill="#f43f5e" fillOpacity="0.1" stroke="#f43f5e" strokeWidth="2" />
              <text x="180" y="52" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">Total E (Negative)</text>
              <text x="180" y="68" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">-100 J</text>

              <rect x="240" y="35" width="80" height="40" rx="6" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" />
              <text x="280" y="52" fill="#fcd34d" fontSize="9" fontWeight="bold" textAnchor="middle">P.E. (Double Neg)</text>
              <text x="280" y="68" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">-200 J</text>

              <text x="180" y="98" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">E = -K = U / 2</text>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 5.2: Virial Theorem Energy Ratios for Circular Orbits
            </div>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
            <HohmannTransferDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 5.3: Hohmann Satellite Transfer Orbit Path
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaCard
            formula="E = -K = U/2"
            use_when="Virial Theorem for circular orbits. Use when one of the orbital energies is known, allowing you to find the other two instantly."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={2}
            color="rose"
            copy_text="E = -K; U = 2*E"
          />
          <FormulaCard
            formula="ve = √(2GM/R) = √(2gR)"
            use_when="Escape velocity. Use to compute the velocity required to escape a planet's surface completely. Remember that launch angle does not affect this velocity."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={1}
            color="cyan"
            copy_text="v_e = sqrt(2 * G * M / R)"
          />
          <FormulaCard
            formula="W = [n / (n+1)] mgR"
            use_when="Lifting shortcut. Work done to lift a mass m from Earth's surface to a height h = n·R (e.g. lift to height R => n=1 => W = mgR/2)."
            priority="⭐⭐⭐⭐"
            freq_stars={4}
            difficulty_stars={2}
            color="violet"
            copy_text="W = (n / (n + 1)) * m * g * R"
          />
          <FormulaCard
            formula="gh = g / (1 + h/R)²"
            use_when="Exact gravity with altitude. Use when height h is large (h > 5% of R). Do not use the binomial approximation for space altitudes."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={2}
            color="amber"
            copy_text="g_h = g / (1 + h/R)^2"
          />
          <FormulaCard
            formula="T = 2&pi;&radic;(r&sup3; / GM)"
            use_when="Orbital Time Period. Calculates satellite revolution time or orbits at distance r from center of mass M."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={2}
            color="violet"
            copy_text="T = 2*pi*sqrt(r^3 / (G*M))"
          />
          <FormulaCard
            formula="x = d / (√(m2/m1) + 1)"
            use_when="Neutral point location. Distance from mass m1 where the net field due to m1 and m2 (separated by distance d) is zero."
            priority="⭐⭐⭐"
            freq_stars={3}
            difficulty_stars={3}
            color="emerald"
            copy_text="x = d / (sqrt(m2/m1) + 1)"
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
              <strong className="text-emerald-400">Virial Energy Relations:</strong>
              <br />
              K = +GMm/(2r), U = -GMm/r, E = -GMm/(2r). Memorize the ratios: E = -K = U/2.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Escape Velocity:</strong>
              <br />
              v<sub>e</sub> = &radic;(2GM/R) = &radic;(2gR) (&asymp; 11.2 km/s for Earth).
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Kepler III Relation:</strong>
              <br />
              T&sup2; &prop; a&sup3; (Square of orbital period is proportional to cube of semi-major axis).
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
              <strong className="text-amber-400">Complex Orbital Velocities:</strong>
              <br />
              Do not memorize separate formulas for different satellites. Derive orbital velocity instantly by equating forces: F<sub>g</sub> = F<sub>c</sub> &rarr; G &middot; M&middot;m/r&sup2; = m&middot;v&sup2;/r.
            </li>
            <li className="leading-relaxed">
              <strong className="text-amber-400">Specific Latitudinal &omega; values:</strong>
              <br />
              Instead of memorizing values, remember that g<sub>&lambda;</sub> = g &minus; R&middot;&omega;&sup2;&middot;cos&sup2;&lambda;, then plug in &lambda; = 90&deg; for poles or &lambda; = 0&deg; for the equator.
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
                <div className="text-white font-bold">Question says: &quot;Satellite Shift&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Change in TOTAL ENERGY (W = E_final - E_initial). Do NOT just calculate potential energy change.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Escape from Surface&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Conservation of Mechanical Energy (E_initial = E_final = 0).
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Height h&quot; (large value)</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Don&apos;t use mgh or g(1-2h/R). Use the exact fraction formula: g_h = g / (1 + h/R)².
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Satellite Features comparison */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-400" /> Geostationary vs. Polar Satellites
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
 <tr className="border-b border-white/5 text-white/40">
                  <th className="py-2.5">Feature</th>
                  <th className="py-2.5">Geostationary</th>
                  <th className="py-2.5">Polar</th>
                </tr>
              </thead>
 <tbody className="divide-y divide-white/5 text-white/80">
                <tr>
                  <td className="py-3 font-semibold text-white">Orbit Location</td>
                  <td className="py-3">Orbits equator</td>
                  <td className="py-3">Orbits pole-to-pole</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Time Period (T)</td>
                  <td className="py-3 text-cyan-400">24 hours (matches Earth)</td>
                  <td className="py-3 text-amber-400">≈ 100 minutes</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Altitude (h)</td>
                  <td className="py-3">High (h ≈ 36,000 km)</td>
                  <td className="py-3">Low (h ≈ 500 km)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-white">Use Case</td>
                  <td className="py-3">Communications, Weather</td>
                  <td className="py-3">Spy, Mapping, Remote Sensing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Traps */}
        <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-4">
 <h4 className="text-rose-400 font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Common Traps & Mistakes to Avoid
          </h4>
          <div className="space-y-3.5 text-[13px] text-white/80">
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 1: The mgh Trap</strong>
              <br />
              Using W = mgh or ΔU = mgh for satellite orbital heights. FATAL ERROR! mgh is valid ONLY for heights h &lt; 10 km. For orbital heights, you MUST use the exact formula: ΔU = U_final - U_initial = -GMm/r_final - (-GMm/r_initial).
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 2: The Binomial Approximation Trap</strong>
              <br />
              Using g_h = g * (1 - 2h/R) when h = R/2. This linear approximation produces massive errors for h &gt; 300 km. You must use the fraction formula: g_h = g / (1 + h/R)².
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 3: Escape Velocity Angle Dependency</strong>
              <br />
              Assuming that escape velocity depends on the angle of projection (e.g. projecting at 30° vs 90°). Escape velocity is a scalar property derived from conservation of energy, meaning it is identical regardless of projection angle.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 4: Confusing r with h</strong>
              <br />
              In orbital formulas (U, F, v_o, T), r is the distance from the center of the planet: r = R_earth + h. Never plug altitude h directly into the denominator!
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: Binary Star Systems ──────────────────────────────────── */}
      <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 pt-6 mt-6 border-t border-white/5">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4.5 h-4.5 text-rose-500 animate-pulse" /> Binary Star Systems (Heavy IAT Favorite)
        </h4>
        <p className="text-white/80 text-[13px] leading-relaxed">
          Two stars of masses m1 and m2 separated by distance d orbit their common center of mass.
        </p>
 <p className="text-white/70 text-[13px] leading-relaxed bg-[#05060F] p-3 rounded-lg border border-white/5">
          <strong>Key Rule:</strong> They both revolve with the same angular velocity (ω) and the same Time Period. The mutual gravitational force provides the centripetal force for both:
          <br />
          G * m1 * m2 / d² = m1 * ω² * r1 = m2 * ω² * r2
          <br />
          Where r1 and r2 are their distances from the center of mass (r1 + r2 = d).
        </p>
        
        {/* Solved Example for Binary System */}
        <SolvedExample
          number={9}
          question="Two identical stars, each of mass M, form a binary system orbiting their common center of mass in a circle of radius R. Find the time period of their orbit."
          steps={[
            "Identify components: masses are M and M, and the distance between them is d = 2R (since they orbit a circle of radius R about the COM center).",
            "Mutual gravitational force: F<sub>g</sub> = G * M * M / d&sup2; = G * M&sup2; / (2R)&sup2; = G * M&sup2; / (4R&sup2;).",
            "This force provides centripetal force for either star: F<sub>g</sub> = M * &omega;&sup2; * R.",
            "Equate forces: G * M&sup2; / (4R&sup2;) = M * &omega;&sup2; * R  => G * M / (4R&sup3;) = &omega;&sup2;.",
            "Solve for &omega;: &omega; = sqrt(GM / 4R&sup3;) = (1/2) * sqrt(GM / R&sup3;).",
            "Calculate Time Period T: T = 2&pi; / &omega; = 2&pi; / [ (1/2) * sqrt(GM / R&sup3;) ] = 4&pi; * sqrt(R&sup3; / GM)."
          ]}
          answer="T = 4&pi;&radic;(R&sup3; / GM)"
          color="rose"
        />
      </div>

      {/* ── SECTION 6: 2-Minute Revision Sheet ─────────────────────────────── */}
      <div className="p-6 bg-gradient-to-br from-violet-950/20 to-cyan-950/20 border border-violet-500/10 rounded-2xl space-y-4 pt-6 mt-6 border-t border-white/5">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4.5 h-4.5 text-amber-400" /> 2-Minute Revision Sheet
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 text-[13px] text-white/80">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>g variation: height exact g<sub>h</sub> = g/(1+h/R)&sup2;; depth exact g<sub>d</sub> = g(1&minus;d/R).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Escape speed: v<sub>e</sub> = &radic;(2GM/R) = &radic;(2gR) (independent of launch angle).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Orbital speed: v<sub>o</sub> = &radic;(GM/r). Near surface, v<sub>e</sub> = &radic;2 v<sub>o</sub>.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Kepler&apos;s Laws: orbits are ellipses; areal velocity dA/dt is constant; T&sup2; &prop; a&sup3;.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Virial Energy: E = -K = U/2.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Geostationary satellites: equator orbit, T = 24 hours, h &approx; 36,000 km.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>G constant: 6.674 * 10^-11 N·m²/kg² (independent of medium, [M^-1 L^3 T^-2]).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Shell vs Sphere fields: hollow shell interior E<sub>g</sub> = 0; solid sphere interior E<sub>g</sub> = GMr/R&sup3;.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>System PE: U = &minus;G &Sigma; (m<sub>i</sub> m<sub>j</sub>) / r<sub>ij</sub>. Binding Energy B.E. = &minus;E<sub>total</sub> = +GMm/2r.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Polar satellites: pole-to-pole orbit, T ≈ 100 minutes, h ≈ 500 km.</span>
          </li>
        </ul>
      </div>

      {/* ── SECTION 7: Final Revision Checklist (Night Before Mock) ─────────── */}
      <div className="p-6 bg-gradient-to-br from-cyan-950/20 to-violet-950/20 border border-cyan-500/10 rounded-2xl space-y-4 pt-6 mt-6 border-t border-white/5">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4.5 h-4.5 text-cyan-400" /> 🚀 Final Revision: 5 Things You Must Remember
        </h3>
        <ol className="space-y-4 text-[13px] text-white/80">
          <li className="flex gap-3">
 <span className="font-bold text-cyan-400 shrink-0">[1]</span>
            <div>
              <strong className="text-white">Escape Velocity is angle-independent:</strong>
              <p className="text-white/60 mt-0.5">Whether you fire a bullet at 30 degrees, 45 degrees, or straight up, the speed required to escape the planet remains exactly v_e = sqrt(2GM/R).</p>
            </div>
          </li>
          <li className="flex gap-3">
 <span className="font-bold text-cyan-400 shrink-0">[2]</span>
            <div>
              <strong className="text-white">Satellite Orbit Changes:</strong>
              <p className="text-white/60 mt-0.5">When calculating work done to shift a satellite between two orbits, calculate the change in TOTAL energy (E = -GMm/2r), not just potential energy.</p>
            </div>
          </li>
          <li className="flex gap-3">
 <span className="font-bold text-cyan-400 shrink-0">[3]</span>
            <div>
              <strong className="text-white">Height Binomial Limits:</strong>
              <p className="text-white/60 mt-0.5">Never use g_h = g(1-2h/R) if the height h is greater than 300 km (or 5% of Earth&apos;s radius). Always use the exact fraction: g_h = g / (1 + h/R)².</p>
            </div>
          </li>
          <li className="flex gap-3">
 <span className="font-bold text-cyan-400 shrink-0">[4]</span>
            <div>
              <strong className="text-white">Solid Earth Gravity Trend:</strong>
              <p className="text-white/60 mt-0.5">Inside the Earth, gravitational field increases linearly with distance from the center (g ∝ r). Outside the Earth, it drops off as an inverse square (g ∝ 1/r²).</p>
            </div>
          </li>
          <li className="flex gap-3">
 <span className="font-bold text-cyan-400 shrink-0">[5]</span>
            <div>
              <strong className="text-white">Kepler Time Ratios:</strong>
              <p className="text-white/60 mt-0.5">When orbits change, use Kepler&apos;s Third Law (T1/T2)² = (a1/a2)³ to solve time period shifts instantly.</p>
            </div>
          </li>
        </ol>
      </div>

    </div>
  );
}
