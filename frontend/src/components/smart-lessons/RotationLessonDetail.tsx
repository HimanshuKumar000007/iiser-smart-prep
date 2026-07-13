import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  ArrowRight, BookOpen, Zap, Eye, TrendingUp, Activity, Brain, Award,
  Copy, Check, RefreshCw
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

function AngularVelocityVectorDiagram() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs mx-auto" aria-label="Angular velocity and linear velocity vector relationship">
      {/* Central Axis */}
      <line x1="120" y1="140" x2="120" y2="20" stroke="#ffffff40" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="120" y1="50" x2="120" y2="20" stroke="#f59e0b" strokeWidth="2.5" />
      <polygon points="120,20 116,28 124,28" fill="#f59e0b" />
      <text x="130" y="25" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">ω (Axial Vector)</text>
      
      {/* Rotating Disk (Ellipse in perspective) */}
      <ellipse cx="120" cy="90" rx="70" ry="25" fill="none" stroke="#38bdf8" strokeWidth="2" />
      
      {/* Radial Vector r */}
      <line x1="120" y1="90" x2="175" y2="98" stroke="#a78bfa" strokeWidth="2" />
      <polygon points="175,98 168,94 171,102" fill="#a78bfa" />
      <text x="145" y="93" fill="#a78bfa" fontSize="9" fontFamily="monospace">r</text>
      
      {/* Tangential Velocity Vector v */}
      <line x1="175" y1="98" x2="195" y2="125" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="195,125 187,123 193,118" fill="#f43f5e" />
      <text x="185" y="140" fill="#fca5a5" fontSize="9" fontFamily="monospace" fontWeight="bold">v = ω * r</text>
      
      {/* Rotation Arrow on Disk */}
      <path d="M 70 95 A 50 20 0 0 0 160 102" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
      <polygon points="160,102 153,99 157,105" fill="#38bdf8" />
    </svg>
  );
}

function RadiusOfGyrationDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Radius of gyration visual concept diagram">
      {/* Axis of rotation */}
      <line x1="40" y1="10" x2="40" y2="130" stroke="#ffffff40" strokeWidth="1.5" />
      <text x="45" y="18" fill="#ffffff40" fontSize="8" fontFamily="monospace">Rotation Axis</text>
      
      {/* Case 1: Complex Body */}
      <path d="M 60 40 Q 110 30 130 60 T 100 110 T 60 90 Z" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1.5" />
      <circle cx="75" cy="55" r="3" fill="#38bdf8" />
      <text x="80" y="53" fill="#38bdf8" fontSize="7" fontFamily="monospace">m₁</text>
      <circle cx="110" cy="70" r="3.5" fill="#38bdf8" />
      <text x="115" y="68" fill="#38bdf8" fontSize="7" fontFamily="monospace">m₂</text>
      <circle cx="90" cy="95" r="2.5" fill="#38bdf8" />
      <text x="95" y="93" fill="#38bdf8" fontSize="7" fontFamily="monospace">m₃</text>
      <text x="85" y="125" fill="#a5b4fc" fontSize="8" fontFamily="monospace">I = &sum; m<sub>i</sub> r<sub>i</sub>&sup2;</text>
      
      {/* Separator */}
      <line x1="140" y1="20" x2="140" y2="120" stroke="#ffffff10" strokeWidth="1" />
      
      {/* Case 2: Concentrated Point mass */}
      <line x1="180" y1="10" x2="180" y2="130" stroke="#ffffff40" strokeWidth="1.5" />
      
      {/* Point Mass at distance k */}
      <line x1="180" y1="70" x2="220" y2="70" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="220" cy="70" r="7" fill="#f59e0b" />
      <text x="217" y="73" fill="#000000" fontSize="8" fontFamily="monospace" fontWeight="bold">M</text>
      
      <text x="195" y="65" fill="#f59e0b" fontSize="8" fontFamily="monospace">k</text>
      <text x="185" y="125" fill="#fef08a" fontSize="8" fontFamily="monospace">I = M k²</text>
    </svg>
  );
}

function CoupleTorqueDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Torque of a couple diagram">
      {/* Rod pivoted at center */}
      <line x1="50" y1="70" x2="190" y2="70" stroke="#4b5563" strokeWidth="5" strokeLinecap="round" />
      <circle cx="120" cy="70" r="4" fill="#ffffff" />
      <text x="120" y="85" fill="#ffffff40" fontSize="8" fontFamily="monospace">Pivot</text>
      
      {/* Downward force F on left tip */}
      <line x1="60" y1="70" x2="60" y2="110" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="60,110 56,103 64,103" fill="#f43f5e" />
      <text x="45" y="105" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">F</text>
      
      {/* Upward force F on right tip */}
      <line x1="180" y1="70" x2="180" y2="30" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="180,30 176,37 184,37" fill="#f43f5e" />
      <text x="188" y="40" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">F</text>
      
      {/* Rotation Indicator */}
      <path d="M 90 45 A 40 40 0 0 1 150 45" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
      
      {/* Label */}
      <text x="120" y="125" fill="#f59e0b" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Couple Torque τ = F &middot; d</text>
      <line x1="60" y1="70" x2="180" y2="70" stroke="#ffffff20" strokeWidth="1" strokeDasharray="3 3" />
      <text x="120" y="62" fill="#ffffff40" fontSize="8" fontFamily="monospace" textAnchor="middle">d</text>
    </svg>
  );
}

export function RotationLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 6</span>
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
                  PHYSICS UNIT 6
                </span>
 <span className="px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-400 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500" /> HIGH WEIGHTAGE
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
              System of Particles and Rotational Motion
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
 <div className="text-[12px] font-bold uppercase tracking-widest text-cyan-400/80">
              CORE NCERT FOUNDATION FOR IISER IAT EXAM
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">REVISION TIME</div>
 <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>80 min</span>
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
                <span>2-3 questions every year</span>
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

      {/* Syllabus Index table */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Syllabus Coverage & Priority Index
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
 <tr className="border-b border-white/5 text-white/40">
                <th className="py-2.5">Topic</th>
                <th className="py-2.5">Weightage</th>
                <th className="py-2.5">Focus Priority</th>
              </tr>
            </thead>
 <tbody className="divide-y divide-white/5 text-white/80">
              <tr>
                <td className="py-3 font-semibold text-white">Centre of Mass (COM)</td>
                <td className="py-3 text-rose-400">🔥 High</td>
                <td className="py-3 text-amber-400">⭐⭐⭐⭐⭐ Focus on 2-Body and Cavities</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-white">Torque & Equilibrium</td>
                <td className="py-3 text-rose-400">🔥 High</td>
                <td className="py-3 text-amber-400">⭐⭐⭐⭐⭐ Focus on toppling limit</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-white">Moment of Inertia (MOI)</td>
                <td className="py-3 text-rose-400">🔥 High</td>
                <td className="py-3 text-amber-400">⭐⭐⭐⭐⭐ Focus on theorems</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-white">Rolling Motion</td>
                <td className="py-3 text-rose-400">🔥 High</td>
                <td className="py-3 text-amber-400">⭐⭐⭐⭐⭐ Focus on Incline races</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-white">Radius of Gyration</td>
                <td className="py-3 text-amber-400">⭐ Medium</td>
                <td className="py-3 text-white/40">⭐⭐⭐ Standard shapes only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECTION 1: Core Concepts ─────────────────────────────────────────── */}
      <div className="space-y-12">
        
        {/* Part 1 */}
        <div className="space-y-6">
          <ModuleHeader number={1} title="Centre of Mass (COM) Dynamics" difficulty={3} color="violet" />

          <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
            <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
              <p>
                The <strong>Centre of Mass (COM)</strong> of a system is a unique mathematical point where the entire mass of the system can be assumed to be concentrated for studying its overall translational motion.
              </p>
              <p>
                For a system of discrete particles, the position vector r<sub>com</sub> is defined as:
                r<sub>com</sub> = (∑ m<sub>i</sub> * r<sub>i</sub>) / (∑ m<sub>i</sub>)
              </p>
              <p>
                For continuous mass distributions, we integrate over differential mass elements dm:
                r<sub>com</sub> = (∫ r dm) / (∫ dm)
              </p>
              <p>
                <strong>Motion of COM:</strong>
                v<sub>com</sub> = (∑ m<sub>i</sub> * v<sub>i</sub>) / M<sub>total</sub>  and  a<sub>com</sub> = F<sub>net</sub>,ext / M<sub>total</sub>
              </p>
              <p>
                <strong>Linear Momentum of a System of Particles:</strong>
                The total linear momentum P of a system of particles is the vector sum of individual momenta:
                P = ∑ m<sub>i</sub> * v<sub>i</sub> = M<sub>total</sub> * v<sub>com</sub>
                This shows that the total linear momentum of the system is equal to the product of the total mass and the velocity of its Centre of Mass. If the center of mass is at rest (v<sub>com</sub> = 0), then the total linear momentum of the system is strictly zero (P = 0).
              </p>
            </div>

            {/* SVG Diagram 1: Two-Body COM */}
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
              <svg width="360" height="150" viewBox="0 0 360 150" className="max-w-full">
                {/* Horizontal Line connecting masses */}
                <line x1="60" y1="75" x2="300" y2="75" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                
                {/* Mass 1 */}
                <circle cx="60" cy="75" r="14" fill="#6366f1" />
                <text x="60" y="79" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">m1</text>
                <text x="60" y="110" fill="#a5b4fc" fontSize="10" textAnchor="middle">Position: x = 0</text>
                
                {/* Mass 2 */}
                <circle cx="300" cy="75" r="22" fill="#06b6d4" />
                <text x="300" y="79" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle">m2</text>
                <text x="300" y="110" fill="#a5f3fc" fontSize="10" textAnchor="middle">Position: x = d</text>
                
                {/* Centre of Mass (COM) */}
                <circle cx="220" cy="75" r="6" fill="#f59e0b" />
                <line x1="220" y1="50" x2="220" y2="100" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="220" y="42" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">COM (Balance Point)</text>
                
                {/* Distances */}
                <path d="M 60 90 L 60 95 L 220 95 L 220 90" fill="none" stroke="#6366f1" strokeWidth="1" />
                <text x="140" y="91" fill="#6366f1" fontSize="9" textAnchor="middle">r1 = [m2/(m1+m2)] d</text>

                <path d="M 220 90 L 220 95 L 300 95 L 300 90" fill="none" stroke="#06b6d4" strokeWidth="1" />
                <text x="260" y="91" fill="#06b6d4" fontSize="9" textAnchor="middle">r2 = [m1/(m1+m2)] d</text>
              </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                Figure 1.1: Discrete Two-Body COM Position Division
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={1}
              question="Two particles of masses 2 kg and 6 kg are located at coordinates (1 m, 2 m) and (5 m, -2 m) respectively. Find the coordinates of their Centre of Mass."
              steps={[
                "Identify components: m1 = 2 kg, x1 = 1, y1 = 2; m2 = 6 kg, x2 = 5, y2 = -2.",
                "Calculate x<sub>com</sub>: (m1*x1 + m2*x2) / (m1 + m2) = (2 * 1 + 6 * 5) / (2 + 6) = (2 + 30) / 8 = 32 / 8 = 4 m.",
                "Calculate y<sub>com</sub>: (m1*y1 + m2*y2) / (m1 + m2) = (2 * 2 + 6*(-2)) / (2 + 6) = (4 - 12) / 8 = -8 / 8 = -1 m."
              ]}
              answer="r<sub>com</sub> = (4 m, &minus;1 m)"
              color="violet"
            />

            <SolvedExample
              number={2}
              question="A circular disc of radius R has a circular cavity of radius R/2 cut out from it. The center of the cavity is at a distance of R/2 from the center of the original solid disc. Find the shift in the Centre of Mass."
              steps={[
                "Use the 'Negative Mass' trick. Let the mass density per unit area be σ.",
                "Mass of original solid disc: M1 = σ * π * R<sup>2</sup>, centered at x1 = 0.",
                "Mass of removed cavity disc: M<sub>cavity</sub> = σ * π * (R/2)^2 = M1 / 4, centered at x<sub>cavity</sub> = R/2.",
                "Apply formula: x<sub>com</sub> = (M1*x1 - M<sub>cavity</sub> * x<sub>cavity</sub>) / (M1 - M<sub>cavity</sub>) = (M1*0 - (M1/4)*(R/2)) / (M1 - M1/4).",
                "Simplify: x<sub>com</sub> = - (M1 * R / 8) / (3/4 * M1) = - (R / 8) * (4/3) = - R/6."
              ]}
              answer="x<sub>com</sub> = &minus;R/6 (shifted away from cavity center)"
              color="violet"
            />
          </div>
        </div>

        {/* Part 2 */}
        <div className="space-y-6">
          <ModuleHeader number={2} title="Torque, Rotational Kinematics & Equilibrium" difficulty={4} color="cyan" />

          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-5">
            <p>
              <strong>Vector (Cross) Product of Two Vectors (A &times; B):</strong>
              The vector product of two vectors A and B is a vector C = A &times; B whose magnitude is:
              |C| = A &middot; B &middot; sin &theta;
              Where &theta; is the angle between them (0 &le; &theta; &le; &pi;). The direction of C is perpendicular to the plane of A and B and is given by the <strong>Right-Hand Rule</strong>: curl fingers of right hand from A to B; the thumb points in the direction of C. Note that the vector product is non-commutative: A &times; B = &minus;(B &times; A).
            </p>

            {/* Rotational kinematics and relations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AngularVelocityVectorDiagram />
              <div className="space-y-3 justify-center flex flex-col">
                <div className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider">Angular Velocity &amp; Acceleration Definitions</div>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
 <strong>Angular velocity (&omega;):</strong> rate of change of angular displacement. Vector relation: <span className="text-cyan-300">v = &omega; &times; r</span>.
                </p>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
 <strong>Scalar relation:</strong> <span className="text-cyan-300">v = r&omega;</span> (for perpendicular vectors on circular track).
                </p>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
                  <strong>Angular acceleration (&alpha;):</strong> rate of change of angular velocity:
 <strong className="block text-cyan-300 mt-0.5">&alpha; = d&omega;/dt = d&sup2;&theta;/dt&sup2;</strong>
                </p>
              </div>
            </div>

            {/* Rotational Kinematics Equations Card */}
            <div className="p-4.5 rounded-2xl bg-cyan-900/10 border border-cyan-500/20 space-y-3">
              <div className="text-[13px] font-bold text-cyan-300 uppercase tracking-wider">Rotational Kinematics Equations (Constant &alpha;)</div>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
 For rotation about a fixed axis with constant angular acceleration <span className="">&alpha;</span>, the equations are perfectly analogous to linear kinematics:
              </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[13px] text-cyan-300">
                <div className="bg-black/20 p-2.5 rounded text-center border border-white/5">
                  &omega; = &omega;₀ + &alpha;t
                </div>
                <div className="bg-black/20 p-2.5 rounded text-center border border-white/5">
                  &theta; = &omega;₀t + &frac12;&alpha;t&sup2;
                </div>
                <div className="bg-black/20 p-2.5 rounded text-center border border-white/5">
                  &omega;&sup2; = &omega;₀&sup2; + 2&alpha;&theta;
                </div>
              </div>
            </div>

            <p>
              <strong>Torque (&tau;):</strong> represents the rotational effect of a force. It is defined as:
              &tau; = r &times; F
              Where r is the position vector from the reference origin to the point of application of the force F.
            </p>

            {/* Couple definition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CoupleTorqueDiagram />
              <div className="space-y-3 justify-center flex flex-col">
                <div className="text-[13px] font-bold text-rose-400 uppercase tracking-wider">Couple (Torque of a Couple)</div>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
                  A **Couple** is defined as a pair of equal and opposite forces acting on a body along different lines of action. 
                </p>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
 Since net force is zero (<span className="">&Sigma;F = 0</span>), a couple produces **pure rotation** without any translational motion. The torque of a couple is independent of the reference origin point:
 <strong className="block text-rose-300 mt-0.5">&tau; = F &middot; d</strong>
                  Where d is the perpendicular distance between the lines of action of the two forces.
                </p>
              </div>
            </div>

            {/* Linear vs Rotational Variables Comparison Table */}
            <div className="rounded-xl border border-white/5 overflow-hidden">
              <div className="bg-white/5 px-4 py-2.5 text-[13px] font-bold text-white uppercase tracking-wider">Comparison Table: Linear vs Rotational Variables</div>
              <table className="w-full text-left border-collapse text-[12.5px]">
                <thead>
 <tr className="bg-white/[0.02] border-b border-white/5 text-white/50">
                    <th className="p-2.5">Linear Concept</th>
                    <th className="p-2.5">Rotational Concept</th>
                    <th className="p-2.5">Linking Formula</th>
                  </tr>
                </thead>
 <tbody className="divide-y divide-white/5 text-white/75">
                  <tr>
                    <td className="p-2.5">Displacement: x</td>
                    <td className="p-2.5">Angular Displacement: &theta; (rad)</td>
                    <td className="p-2.5">s = r&theta;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Velocity: v = dx/dt</td>
                    <td className="p-2.5">Angular Velocity: &omega; = d&theta;/dt</td>
                    <td className="p-2.5">v = &omega; &times; r &nbsp;(v = r&omega;)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Acceleration: a = dv/dt</td>
                    <td className="p-2.5">Angular Acceleration: &alpha; = d&omega;/dt</td>
                    <td className="p-2.5">a<sub>t</sub> = &alpha; &times; r &nbsp;(a<sub>t</sub> = r&alpha;)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Mass (Inertia): m</td>
                    <td className="p-2.5">Moment of Inertia: I</td>
                    <td className="p-2.5">I = &Sigma; m<sub>i</sub> r<sub>i</sub>&sup2; = M k&sup2;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Force: F = m&middot;a</td>
                    <td className="p-2.5">Torque: &tau; = I&middot;&alpha;</td>
                    <td className="p-2.5">&tau; = r &times; F</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Momentum: p = m&middot;v</td>
                    <td className="p-2.5">Angular Momentum: L = I&middot;&omega;</td>
                    <td className="p-2.5">L = r &times; p</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Kinetic Energy: K = &frac12;mv&sup2;</td>
                    <td className="p-2.5">Rotational KE: K<sub>rot</sub> = &frac12;I&omega;&sup2;</td>
                    <td className="p-2.5">K<sub>total</sub> = &frac12;Mv&sup2;(1 + k&sup2;/R&sup2;)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">Power: P = F&middot;v</td>
                    <td className="p-2.5">Rotational Power: P = &tau;&middot;&omega;</td>
                    <td className="p-2.5">&mdash;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5">'s 2nd: F = dp/dt</td>
                    <td className="p-2.5">Rotational 2nd: &tau; = dL/dt</td>
                    <td className="p-2.5">&mdash;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Equilibrium:</strong> A rigid body is in complete equilibrium ONLY if:
              ∑ F<sub>ext</sub> = 0 (Translational)  AND  ∑ τ<sub>ext</sub> = 0 (Rotational)
            </p>
          </div>

          {/* SVG Diagram 2: Cross Product Torque */}
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
            <svg width="360" height="150" viewBox="0 0 360 150" className="max-w-full">
              {/* Rod representation */}
              <line x1="80" y1="110" x2="280" y2="110" stroke="#4b5563" strokeWidth="6" strokeLinecap="round" />
              <circle cx="80" cy="110" r="4" fill="#ffffff" />
              <text x="80" y="130" fill="#ffffff" fontSize="9" textAnchor="middle">Origin (Pivot)</text>

              {/* Vector r */}
              <path d="M 80 110 L 250 110" fill="none" stroke="#6366f1" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <text x="170" y="100" fill="#a5b4fc" fontSize="10" textAnchor="middle">Position Vector r</text>

              {/* Force Vector F */}
              <path d="M 250 110 L 250 40" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <text x="270" y="55" fill="#fca5a5" fontSize="10">Force F</text>

              {/* Torque rotation indicator */}
              <path d="M 220 90 A 30 30 0 0 0 250 120" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
              <text x="210" y="80" fill="#06b6d4" fontSize="10" textAnchor="end">Rotation tend (CCW)</text>

              {/* Torque Vector (Out of page symbol) */}
              <circle cx="160" cy="40" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="160" cy="40" r="2.5" fill="#f59e0b" />
              <text x="180" y="44" fill="#f59e0b" fontSize="11" fontWeight="bold">Torque τ (Out of Page ⊙)</text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" />
                </marker>
              </defs>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 2.1: Torque Vector Direction using Right-Hand Rule
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <SolvedExample
              number={3}
              question="A uniform rectangular block of mass m, height h, and base width b is kept on a rough horizontal surface. A horizontal force F is applied at the top edge of the block. Find the minimum value of force F required to topple the block before it slides."
              steps={[
                "Toppling occurs when the normal reaction force N shifts completely to the rightmost bottom corner edge (pivot).",
                "At the verge of toppling, take torque about the rightmost bottom corner pivot.",
                "Torque by force F (applied at height h): τ1 = F * h (clockwise direction tending to topple).",
                "Torque by gravity mg (acting at the block center, distance b/2 from pivot): τ2 = mg * (b/2) (counter-clockwise restoring torque).",
                "Equate clockwise and counter-clockwise torques at the tipping limit: F * h = mg * (b/2).",
                "Solve for F: F = mg * b / (2 * h)."
              ]}
              answer="F<sub>topple</sub> = mg&middot;b / (2h)"
              color="cyan"
            />
          </div>
        </div>

        {/* Part 3 */}
        <div className="space-y-6">
          <ModuleHeader number={3} title="Moment of Inertia (MOI) & Theorems" difficulty={4} color="amber" />

          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-5">
            <p>
              <strong>Moment of Inertia (I)</strong> represents the rotational inertia of a body:
              I = &sum; m<sub>i</sub> &middot; r<sub>i</sub>&sup2; = &int; r&sup2; dm
            </p>

            {/* Radius of Gyration definition and SVG */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadiusOfGyrationDiagram />
              <div className="space-y-3 justify-center flex flex-col">
                <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">Radius of Gyration (k)</span>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
                  The Radius of Gyration of a rotating body about a given axis is the distance from the axis at which the entire mass M could be concentrated to give the same moment of inertia:
                </p>
 <div className="text-cyan-300 text-[12.5px] bg-black/20 p-2.5 rounded">
                  I = M &middot; k&sup2; &nbsp;&nbsp;&implies;&nbsp;&nbsp; k = &radic;(I / M)
                </div>
                <p className="text-white/50 text-[11.5px] leading-relaxed">
                  For example, for a solid sphere of radius R rotating central-axially, k = &radic;(2/5)R &approx; 0.63R.
                </p>
              </div>
            </div>

            <p>
              <strong>Standard MOI Values (Central Axis):</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li>Thin Ring: MR²</li>
                <li>Thin Disc: (1/2)MR²</li>
                <li>Solid Sphere: (2/5)MR²</li>
                <li>Hollow Sphere: (2/3)MR²</li>
                <li>Rod (through center, perpendicular to length): ML²/12</li>
                <li>Rod (through end, perpendicular to length): ML²/3</li>
              </ul>
            </p>
            
            {/* Perpendicular axis restriction warning */}
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1.5">
              <span className="text-[11px] font-black text-rose-400 uppercase tracking-wider block">Perpendicular Axis Theorem restriction</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
 <strong>IMPORTANT:</strong> The Perpendicular Axis Theorem (<span className="">Iz = Ix + Iy</span>) is **strictly restricted to 2D planar bodies (laminar objects)** (such as a disc, ring, thin plate). It **cannot** be applied to 3D bodies like spheres, cylinders, or rods!
              </p>
            </div>
          </div>

          {/* SVG Diagram 3: Theorems */}
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
            <svg width="360" height="160" viewBox="0 0 360 160" className="max-w-full">
              {/* Parallel Axis representation */}
              <g transform="translate(10, 0)">
                {/* Planar body */}
                <path d="M 40 40 Q 120 20 150 70 T 100 130 T 30 90 Z" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1.5" />
                
                {/* COM center axis */}
                <line x1="90" y1="20" x2="90" y2="140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="90" cy="80" r="4" fill="#f59e0b" />
                <text x="90" y="15" fill="#f59e0b" fontSize="9" textAnchor="middle">Axis passing COM</text>
                
                {/* Parallel shifted axis */}
                <line x1="140" y1="20" x2="140" y2="140" stroke="#3b82f6" strokeWidth="2" />
                <text x="140" y="15" fill="#3b82f6" fontSize="9" textAnchor="middle">Shifted Axis I</text>
                
                {/* Shift distance d */}
                <path d="M 90 80 L 140 80" fill="none" stroke="#ffffff" strokeWidth="1" markerEnd="url(#arrow)" />
                <text x="115" y="75" fill="#ffffff" fontSize="9" textAnchor="middle">d</text>
                
                <text x="90" y="152" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">I = Icom + Md²</text>
              </g>

              {/* Perpendicular Axis representation */}
              <g transform="translate(200, 0)">
                {/* Plane Lamina */}
                <ellipse cx="80" cy="100" rx="60" ry="25" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                
                {/* X Axis */}
                <line x1="80" y1="100" x2="150" y2="100" stroke="#f43f5e" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <text x="155" y="103" fill="#fca5a5" fontSize="9">x</text>

                {/* Y Axis */}
                <line x1="80" y1="100" x2="110" y2="70" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <text x="112" y="65" fill="#a7f3d0" fontSize="9">y</text>

                {/* Z Axis (Perpendicular) */}
                <line x1="80" y1="100" x2="80" y2="25" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="80" y="18" fill="#fef08a" fontSize="9" textAnchor="middle">z</text>

                <text x="80" y="152" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Iz = Ix + Iy</text>
              </g>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 3.1: Parallel Axis Theorem vs Perpendicular Axis Theorem
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={4}
              question="Find the Moment of Inertia of a thin uniform disc of mass M and radius R about a tangent perpendicular to its plane."
              steps={[
                "Find the Moment of Inertia about the central axis passing through the COM: I<sub>com</sub> = (1/2) * M * R<sup>2</sup>.",
                "Identify the shifted tangent axis. It is parallel to the central axis and at a distance d = R from the COM center.",
                "Apply the Parallel Axis Theorem: I<sub>tangent</sub> = I<sub>com</sub> + M * d<sup>2</sup>.",
                "Substitute values: I<sub>tangent</sub> = (1/2) * M * R<sup>2</sup> + M * R<sup>2</sup> = (3/2) * M * R<sup>2</sup>."
              ]}
              answer="I = (3/2)MR²"
              color="amber"
            />

            <SolvedExample
              number={5}
              question="A solid sphere of mass M and radius R is rotating about a tangent. Calculate its Radius of Gyration (k)."
              steps={[
                "Moment of inertia of solid sphere about diameter: I<sub>dia</sub> = (2/5) * M * R<sup>2</sup>.",
                "Use Parallel Axis Theorem to find MOI about tangent: I<sub>tangent</sub> = I<sub>dia</sub> + M * R<sup>2</sup> = (2/5) * M * R<sup>2</sup> + M * R<sup>2</sup> = (7/5) * M * R<sup>2</sup>.",
                "Relate Moment of Inertia to Radius of Gyration: I = M * k<sup>2</sup>.",
                "Solve for k: M * k<sup>2</sup> = (7/5) * M * R<sup>2</sup>  => k = sqrt(7/5) * R."
              ]}
              answer="k = √(7/5) R ≈ 1.18 R"
              color="amber"
            />
          </div>
        </div>

        {/* Part 4 */}
        <div className="space-y-6">
          <ModuleHeader number={4} title="Pure Rolling & Incline Kinematics" difficulty={5} color="emerald" />

          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-5">
            <p>
              <strong>Pure Rolling:</strong> occurs when a circular body rolls on a surface without slipping. The point of contact of the body with the ground is instantaneously at rest:
              v<sub>com</sub> = R·ω  and  a<sub>com</sub> = R·α
              Static friction does NO work in pure rolling.
            </p>
            <p>
              <strong>Kinetic Energy of Rolling:</strong>
              K<sub>total</sub> = K<sub>trans</sub> + K<sub>rot</sub> = (1/2)Mv² [1 + k²/R²]
              Where k is the Radius of Gyration (I = Mk²).
            </p>
            
            {/* Incline rolling kinematics velocity and time formulas */}
            <div className="p-4.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-3.5">
              <span className="text-[13px] font-bold text-emerald-300 uppercase tracking-wider block">Rolling down an Incline (Incline Kinematics)</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                When a circular body of mass M, radius R, and radius of gyration k rolls from rest down a rough incline of height h and angle &theta;:
              </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[12px] text-emerald-300">
                <div className="bg-black/20 p-2.5 rounded text-center border border-white/5">
                  <div className="text-white/40 text-[10px] uppercase mb-1">Acceleration (a)</div>
                  a = g&middot;sin&theta; / [1 + k&sup2;/R&sup2;]
                </div>
                <div className="bg-black/20 p-2.5 rounded text-center border border-white/5">
                  <div className="text-white/40 text-[10px] uppercase mb-1">Final Velocity (v)</div>
                  v = &radic;[ 2gh / (1 + k&sup2;/R&sup2;) ]
                </div>
                <div className="bg-black/20 p-2.5 rounded text-center border border-white/5">
                  <div className="text-white/40 text-[10px] uppercase mb-1">Time taken (t)</div>
                  t = (1/sin&theta;) &radic;[ 2h(1 + k&sup2;/R&sup2;) / g ]
                </div>
              </div>
              <p className="text-white/60 text-[12px] leading-relaxed pt-1.5 border-t border-white/5">
                <strong>Rolling Race Ranking (Time taken to reach bottom):</strong>
 <strong className="block text-emerald-400 mt-0.5">t<sub>Solid</sub> Sphere &lt; t<sub>Solid</sub> Disc &lt; t<sub>Hollow</sub> Sphere &lt; t<sub>Ring</sub></strong>
 Reason: Solid sphere has the smallest inertia ratio <span className="">k&sup2;/R&sup2; = 0.4</span>, resulting in the highest acceleration, highest final velocity, and shortest travel time.
              </p>
            </div>
          </div>

          {/* SVG Diagram 4: Pure Rolling */}
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
            <svg width="360" height="160" viewBox="0 0 360 160" className="max-w-full">
              {/* Horizontal Ground */}
              <line x1="40" y1="130" x2="320" y2="130" stroke="#ffffff" strokeWidth="2" />
              <line x1="40" y1="130" x2="30" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
              <line x1="100" y1="130" x2="90" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
              <line x1="160" y1="130" x2="150" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
              <line x1="220" y1="130" x2="210" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
              <line x1="280" y1="130" x2="270" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.3" />

              {/* Rolling Wheel */}
              <circle cx="180" cy="70" r="60" fill="none" stroke="#10b981" strokeWidth="3" />
              <circle cx="180" cy="70" r="5" fill="#ffffff" />
              
              {/* Angular Velocity arrow */}
              <path d="M 160 30 A 50 50 0 0 1 210 30" fill="none" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
              <text x="185" y="20" fill="#f59e0b" fontSize="10" textAnchor="middle">ω (Roll)</text>

              {/* Center velocity vector */}
              <path d="M 180 70 L 245 70" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="215" y="62" fill="#93c5fd" fontSize="9" textAnchor="middle">v<sub>com</sub></text>

              {/* Bottom Contact Point */}
              <circle cx="180" cy="130" r="4" fill="#f43f5e" />
              
              {/* Velocity components at bottom point */}
              <path d="M 180 130 L 210 130" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="212" y="125" fill="#93c5fd" fontSize="8">v<sub>com</sub></text>

              <path d="M 180 130 L 150 130" fill="none" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="148" y="125" fill="#fcd34d" fontSize="8" textAnchor="end">Rω</text>

              <text x="180" y="152" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Contact Point: vp = vcom - Rω = 0</text>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 4.1: Velocity Decomposition in Pure Rolling (No Slip)
            </div>
          </div>

          {/* Friction Direction Analysis */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-3">
 <div className="text-[13px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" /> Rolling with Slipping & Friction Direction Analysis
            </div>
            <p className="text-white/80 text-[13px] leading-relaxed">
              When a body is NOT in pure rolling, it slips. Kinetic friction acts at the bottom point of contact to oppose the relative motion. The direction of friction depends on the relative velocity of the bottom contact point vp = vcom - Rω:
            </p>
 <ul className="list-disc list-inside text-[13px] text-white/70 space-y-2">
              <li>
                <strong className="text-cyan-300">Forward Slipping (v<sub>com</sub> &gt; Rω):</strong> The bottom point slides forward. Kinetic friction acts <strong>backward</strong>. This friction decreases v<sub>com</sub> (linear deceleration) and increases ω (angular acceleration) until the condition v = Rω is established.
              </li>
              <li>
                <strong className="text-cyan-300">Backward Slipping (v<sub>com</sub> &lt; Rω):</strong> The bottom point slides backward (e.g. wheel burnout). Kinetic friction acts <strong>forward</strong>. This friction increases v<sub>com</sub> (linear acceleration) and decreases ω (angular deceleration) until the condition v = Rω is established.
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={6}
              question="A solid disc of mass M and radius R rolls on a flat surface without slipping at a constant speed v. Find its total Kinetic Energy."
              steps={[
                "Identify translational kinetic energy: K<sub>trans</sub> = (1/2) * M * v<sup>2</sup>.",
                "Identify moment of inertia of solid disc: I = (1/2) * M * R<sup>2</sup>.",
                "Using pure rolling condition (w = v/R), identify rotational kinetic energy: K<sub>rot</sub> = (1/2) * I * w<sup>2</sup> = (1/2) * ((1/2) * M * R<sup>2</sup>) * (v/R)^2 = (1/4) * M * v<sup>2</sup>.",
                "Sum the components: K<sub>total</sub> = K<sub>trans</sub> + K<sub>rot</sub> = (1/2) * M * v<sup>2</sup> + (1/4) * M * v<sup>2</sup> = (3/4) * M * v<sup>2</sup>."
              ]}
              answer="K<sub>total</sub> = (3/4)Mv&sup2;"
              color="emerald"
            />

            <SolvedExample
              number={7}
              question="A solid cylinder rolls down a rough inclined plane of inclination θ without slipping. Find its acceleration down the incline."
              steps={[
                "Identify the radius of gyration ratio for a solid cylinder (disc): k<sup>2</sup> / R<sup>2</sup> = 1/2.",
                "Use the rolling acceleration formula: a = g * sinθ / (1 + k<sup>2</sup> / R<sup>2</sup>).",
                "Substitute the ratio: a = g * sinθ / (1 + 1/2) = g * sinθ / (3/2).",
                "Simplify: a = (2/3) * g * sinθ."
              ]}
              answer="a = (2/3)g sinθ"
              color="emerald"
            />
          </div>
        </div>

        {/* Part 5 */}
        <div className="space-y-6">
          <ModuleHeader number={5} title="Angular Momentum Conservation & Collisions" difficulty={5} color="rose" />

          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-5">
            <p>
              <strong>Conservation of Angular Momentum:</strong> if the net external torque acting on the system is zero, then the total angular momentum remains strictly constant:
              L = r &times; p = constant  =&implies;  I1&middot;&omega;1 = I2&middot;&omega;2
            </p>

            {/* Relation between Torque and Angular Momentum & Rotational WET */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-2">
                <span className="text-[11px] font-black text-violet-400 uppercase tracking-wider block">Torque &amp; Angular Momentum (&tau; = dL/dt)</span>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
 Rotational twin of Newton'Newtons Second Law (<span className="">F = dp/dt</span>). The net external torque equals the rate of change of angular momentum:
                </p>
 <div className="text-violet-300 text-[12.5px] bg-black/20 p-2.5 rounded text-center">
                  &tau;_net = dL/dt = d(I&omega;)/dt = I&middot;&alpha;
                </div>
                <p className="text-white/45 text-[11px]">
 If <span className="">&tau;_net = 0</span>, then <span className="">dL/dt = 0 ⟹ L = constant</span> (Angular Momentum Conservation).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-2">
                <span className="text-[11px] font-black text-rose-400 uppercase tracking-wider block">Work-Energy Theorem for Rotation</span>
                <p className="text-white/70 text-[12.5px] leading-relaxed">
                  The work done by a torque in rotating a body about a fixed axis is equal to the change in its rotational kinetic energy:
                </p>
 <div className="text-rose-300 text-[12.5px] bg-black/20 p-2.5 rounded text-center">
                  W = &int; &tau; d&theta; = &Delta;K<sub>rot</sub> = &frac12;I&omega;_f&sup2; &minus; &frac12;I&omega;_i&sup2;
                </div>
                <p className="text-white/45 text-[11px]">
 Power delivered by torque: <span className="text-cyan-300">P = dW/dt = &tau;&middot;&omega;</span>.
                </p>
              </div>
            </div>

            <p>
              <strong>Hinged Rod Collisions:</strong> For IAT bullet-rod collision questions: linear momentum is NOT conserved (hinge applies unknown impulsive reaction force). Apply Conservation of Angular Momentum strictly about the hinge pivot:
              L<sub>initial</sub>, bullet = L<sub>final</sub>, system  =&gt;  m·v0 * r<sub>perp</sub> = I<sub>system</sub> * ω
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SolvedExample
              number={8}
              question="A uniform thin rod of mass M and length L is hinged at its top end and hangs vertically. A bullet of mass m moving horizontally with velocity v hits the bottom end of the rod and gets embedded in it. Find the angular velocity of the rod-bullet system immediately after the collision."
              steps={[
                "Hinge reaction applies external linear impulse, so linear momentum is NOT conserved.",
                "Since the hinge force acts at the pivot point, its torque about the pivot is zero. Conserve angular momentum (L) about the hinge pivot.",
                "Initial angular momentum of bullet about hinge: L<sub>initial</sub> = m * v * L.",
                "Moment of inertia of rod about hinge end: I<sub>rod</sub> = M * L<sup>2</sup> / 3.",
                "Moment of inertia of embedded bullet about hinge: I<sub>bullet</sub> = m * L<sup>2</sup>.",
                "Total final moment of inertia of system: I<sub>total</sub> = M * L<sup>2</sup> / 3 + m * L<sup>2</sup> = L<sup>2</sup> * (M/3 + m).",
                "Equate initial and final angular momentum: m * v * L = I<sub>total</sub> * ω = L<sup>2</sup> * (M/3 + m) * ω.",
                "Solve for ω: ω = m * v / [ L * (M/3 + m) ] = 3 * m * v / [ L * (M + 3 * m) ]."
              ]}
              answer="ω = 3mv / [ L(M + 3m) ]"
              color="rose"
            />

            <SolvedExample
              number={9}
              question="A man of mass m stands at one end of a stationary boat of mass M and length L floating in water. If the man walks to the other end of the boat, how much does the boat shift relative to the water? (Assume no friction)."
              steps={[
                "Since there is no external force on the man-boat system along the horizontal direction, the center of mass does not move (Δx<sub>com</sub> = 0).",
                "Let the boat shift a distance x in the opposite direction of the man's movement.",
                "Displacement of the man relative to the water: Δx<sub>man</sub> = L - x. Displacement of the boat: Δx<sub>boat</sub> = -x.",
                "Using COM conservation: m * Δx<sub>man</sub> + M * Δx<sub>boat</sub> = 0  => m * (L - x) - M * x = 0.",
                "Solve for x: m * L = (M + m) * x  => x = m * L / (M + m)."
              ]}
              answer="x = mL / (m + M)"
              color="rose"
            />
          </div>
        </div>

      </div>

      {/* ── SECTION 2: Formula Priorities & When to Use ──────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <SectionHeader icon={<TrendingUp className="w-5 h-5" />} label="Formula Priorities & When to Use" color="violet" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormulaCard
            formula="τ = Iα"
            use_when="Newton's 2nd Law for Rotational Dynamics. Use when a torque is applied to a rigid body about a fixed pivot and you need to calculate the resulting angular acceleration."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={3}
            color="cyan"
            copy_text="tau = I * alpha"
          />
          <FormulaCard
            formula="I = Icom + Md²"
            use_when="Parallel Axis Theorem. Use when the target axis is shifted from the center of mass but remains parallel to the central axis, and the original MOI through the Centre of Mass is known."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={2}
            color="violet"
            copy_text="I = I_com + M * d^2"
          />
          <FormulaCard
            formula="L = Iω"
            use_when="Angular momentum of a rigid body about a fixed axis of rotation. Use to calculate angular momentum of rotating discs, rods, or sphere rollers."
            priority="⭐⭐⭐⭐"
            freq_stars={4}
            difficulty_stars={2}
            color="amber"
            copy_text="L = I * omega"
          />
          <FormulaCard
            formula="K = (1/2)Mv²[1 + k²/R²]"
            use_when="Kinetic energy of rolling. Use to compute total kinetic energy (translational + rotational) of an object in pure rolling motion down inclines or along flat surfaces."
            priority="⭐⭐⭐"
            freq_stars={4}
            difficulty_stars={4}
            color="emerald"
            copy_text="K = 0.5 * M * v^2 * (1 + k^2/R^2)"
          />
          <FormulaCard
            formula="xcom = (M1x1 - Mcavityxcavity)/(M1 - Mcavity)"
            use_when="Negative mass trick. Use to find the center of mass shift when a circular, spherical, or rectangular chunk is cut out of a larger uniform body."
            priority="⭐⭐⭐⭐"
            freq_stars={4}
            difficulty_stars={3}
            color="rose"
            copy_text="x_com = (M1*x1 - M_cavity*x_cavity) / (M1 - M_cavity)"
          />
          <FormulaCard
            formula="r1 = [m2 / (m1 + m2)] d"
            use_when="Two-body center of mass shortcut. Calculates distance of COM from mass m1 for two objects separated by distance d."
            priority="⭐⭐⭐"
            freq_stars={3}
            difficulty_stars={1}
            color="violet"
            copy_text="r1 = (m2 / (m1 + m2)) * d"
          />
          <FormulaCard
            formula="C = A * B  |  |C| = A·B·sin θ"
            use_when="Vector (Cross) Product algebra. Use to find direction (via Right-Hand Rule) and magnitude of torque (r * F), angular momentum (r * p), or linear velocity (ω * r)."
            priority="⭐⭐⭐⭐⭐ (Critical)"
            freq_stars={5}
            difficulty_stars={3}
            color="rose"
            copy_text="C_mag = A * B * sin(theta)"
          />
          <FormulaCard
            formula="W = τ·Δθ  |  Power = τ·ω"
            use_when="Work-Energy Theorem for Rotation. Use when calculating work done by a constant torque through angular displacement Δθ, or instantaneous power delivered by torque at angular velocity ω."
            priority="⭐⭐⭐⭐"
            freq_stars={4}
            difficulty_stars={2}
            color="cyan"
            copy_text="W = tau * delta_theta; P = tau * omega"
          />
        </div>
      </div>

      {/* ── SECTION 3: IAT Exam Recognition, Shortcuts & Traps ─────────────── */}
      <div className="space-y-8 pt-6 border-t border-white/5">
        <SectionHeader icon={<Brain className="w-5 h-5" />} label="IAT Exam Recognition & Shortcuts" color="emerald" />

        {/* Question Recognition */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider">Question Recognition Patterns</h4>
          <div className="space-y-4.5 text-[13px]">
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Hinge&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Angular Momentum conservation about the hinge pivot. Hinge reaction force represents external force (linear momentum NOT conserved), but torque of hinge about pivot is zero.
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Rolling&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Pure rolling kinematics relation v<sub>com</sub> = Rω and rolling kinetic energy K = (1/2)Mv²[1 + k²/R²].
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div className="space-y-1">
                <div className="text-white font-bold">Question says: &quot;Cavity / Cutout&quot;</div>
                <div className="text-white/60 leading-relaxed">
                  → <strong>Think</strong>: Negative mass trick! Treat the body with a cavity as a full solid body plus a negative mass of the cutout cavity shape.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Traps */}
        <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-4">
 <h4 className="text-rose-400 font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Common Traps & Mistakes to Avoid
          </h4>
          <div className="space-y-3.5 text-[13px] text-white/80">
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 1: Cross Product Order Reversal</strong>
              <br />
              Writing v = r * ω instead of v = ω * r is a common mistake. Since vector products are anti-commutative (A * B = -B * A), order is critical. Remember: v = ω * r and τ = r * F.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 2: Misapplying the Parallel Axis Theorem</strong>
              <br />
              The formula I = I<sub>com</sub> + Md² ONLY works when I<sub>com</sub> is the moment of inertia about an axis passing through the <strong>Centre of Mass</strong>. You cannot use it to directly shift between two random parallel axes that do not pass through the COM (you must first shift to the COM axis, then shift out).
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 3: Assuming COM is always inside the body</strong>
              <br />
              The COM of a ring, a hollow sphere, or a boomerang lies in empty space outside the actual material.
            </div>
            <div className="leading-relaxed">
              <strong className="text-rose-400">Trap 4: Neglecting Rotational K.E. in Rolling</strong>
              <br />
              For rolling bodies, the total kinetic energy contains both translational and rotational components (K = (1/2)Mv² + (1/2)Iω²). Forgetting the rotational part leads to incorrect velocity calculations when using energy conservation.
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: 30-Second Revision Checklist ─────────────────────────── */}
      <div className="p-6 bg-gradient-to-br from-violet-950/20 to-cyan-950/20 border border-violet-500/10 rounded-2xl space-y-4 pt-6 mt-6 border-t border-white/5">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4.5 h-4.5 text-amber-400" /> 30-Second Revision Checklist
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 text-[13px] text-white/80">
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>COM Position: r<sub>com</sub> = ∑ m<sub>i</sub> r<sub>i</sub> / M. Dividers go in inverse ratio of masses.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Torque: τ = r * F. Origin-dependent, but Couple torque is origin-invariant.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Equilibrium: Requires BOTH ∑ F = 0 and ∑ τ = 0.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Parallel Axis: I = I<sub>com</sub> + Md² (one axis must pass through COM). Perpendicular Axis: I<sub>z</sub> = I<sub>x</sub> + I<sub>y</sub> (2D lamina only!).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Rotational Kinematics: &omega; = &omega;₀ + &alpha;t, &theta; = &omega;₀t + &frac12;&alpha;t&sup2;, &omega;&sup2; = &omega;₀&sup2; + 2&alpha;&theta; (for constant &alpha;).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Radius of Gyration: k = &radic;(I/M). Torque-momentum link: &tau;_net = dL/dt.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Work-Energy: W = &int; &tau; d&theta; = &Delta;K<sub>rot</sub>. Torque of a couple: &tau; = F &middot; d (independent of origin).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Standard MOIs: Ring (MR²), Disc ((1/2)MR²), Solid Sphere ((2/5)MR²), Hollow Sphere ((2/3)MR²).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Pure Rolling: v<sub>com</sub> = Rω (lowest point static friction work is zero).</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Rolling K.E.: (1/2)Mv² [ 1 + k²/R² ]. Incline race winner is always Solid Sphere.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Angular Momentum: L = r * p = Iω. Conserved if τ<sub>net</sub> = 0.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
