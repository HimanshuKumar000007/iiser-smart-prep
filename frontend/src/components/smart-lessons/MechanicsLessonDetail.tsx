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
          Module {number}
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
  formula, use_when, freq_stars, difficulty_stars, color = 'violet', copy_text
}: {
  formula: string;
  use_when: string;
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
          <div className={cn('font-mono font-bold text-[17px] sm:text-lg tracking-wide', formulaColors[color])}>
            <span dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
          <div className="text-white/80 text-[13px] font-semibold leading-relaxed"><span dangerouslySetInnerHTML={{ __html: use_when }} /></div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(copy_text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
        <FrequencyBadge stars={freq_stars} />
 <div className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-white/40">
          <span>Difficulty:</span>
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

function MemoryBox({ title = 'Visual Memory Trick', children, type = 'default' }: { title?: string; children: React.ReactNode; type?: 'default' | 'alert' }) {
  return (
    <div className={cn(
      'rounded-2xl border p-4.5 flex gap-3.5 leading-relaxed',
      type === 'alert'
        ? 'border-rose-500/25 bg-rose-500/[0.03] text-rose-200'
        : 'border-amber-500/20 bg-amber-500/[0.03] text-amber-200'
    )}>
      <div className="text-2xl shrink-0">💡</div>
      <div className="space-y-1 text-[14.5px]">
        <div className="font-bold uppercase text-[13px] tracking-wider opacity-90">{title}</div>
        <div className="opacity-80 text-[13px] sm:text-sm">{children}</div>
      </div>
    </div>
  );
}

function SolvedExample({ title, problem, steps, insight, color = 'violet' }: { title: string; problem: string; steps: string[]; insight: string; color?: string }) {
  const borderColors: Record<string, string> = {
    violet: 'border-violet-500/20 bg-violet-500/5',
    cyan: 'border-cyan-500/20 bg-cyan-500/5',
    amber: 'border-amber-500/20 bg-amber-500/5',
    emerald: 'border-emerald-500/20 bg-emerald-500/5',
    rose: 'border-rose-500/20 bg-rose-500/5',
  };
  return (
    <div className={cn('rounded-2xl border p-5 space-y-4 bg-[#0A0C18]', borderColors[color])}>
      <div className="border-b border-white/5 pb-2.5">
        <h4 className="text-white font-bold text-[14.5px] text-left">{title}</h4>
      </div>
 <p className="text-white/70 text-[13px] sm:text-sm bg-black/20 rounded-lg px-3 py-2 leading-relaxed">{problem}</p>
      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
 <span className="text-[12px] font-bold text-white/30 bg-white/5 rounded px-1.5 py-0.5 shrink-0 mt-0.5">Step {i + 1}</span>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step }} />
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2.5 flex gap-2">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-200 text-[13px] leading-relaxed">{insight}</p>
      </div>
    </div>
  );
}

// ─── SVG Diagram Components ───────────────────────────────────────────────────

function InclineForcesDiagram() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Block on rough incline diagram">
      <path d="M 30 150 L 230 150 L 230 50 Z" fill="none" stroke="#ffffff1a" strokeWidth="1.5" />
      <path d="M 30 150 L 230 50" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <text x="210" y="142" fill="#a78bfa" fontSize="10" fontFamily="monospace">θ</text>
      {/* Box */}
      <g transform="translate(130, 100) rotate(-26.5)">
        <rect x="-20" y="-12" width="40" height="24" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" rx="3" />
        {/* Forces */}
        {/* Normal N */}
        <line x1="0" y1="0" x2="0" y2="-45" stroke="#34d399" strokeWidth="2" />
        <polygon points="0,-45 -4,-38 4,-38" fill="#34d399" />
        <text x="5" y="-35" fill="#34d399" fontSize="9" fontFamily="monospace">N</text>
        {/* Friction fs */}
        <line x1="0" y1="0" x2="-45" y2="0" stroke="#f43f5e" strokeWidth="2" />
        <polygon points="-45,0 -38,-4 -38,4" fill="#f43f5e" />
        <text x="-40" y="-8" fill="#f43f5e" fontSize="9" fontFamily="monospace">fs</text>
      </g>
      {/* Gravity mg */}
      <line x1="130" y1="100" x2="130" y2="155" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="130,155 126,148 134,148" fill="#f59e0b" />
      <text x="135" y="150" fill="#f59e0b" fontSize="9" fontFamily="monospace">mg</text>
      {/* Gravity components */}
      <line x1="130" y1="100" x2="110" y2="140" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
      <text x="85" y="135" fill="#f59e0b" fontSize="8" fontFamily="monospace">mg cosθ</text>
      <line x1="130" y1="100" x2="150" y2="110" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
      <text x="145" y="125" fill="#f59e0b" fontSize="8" fontFamily="monospace">mg sinθ</text>
    </svg>
  );
}

function AtwoodPulleyDiagram() {
  return (
    <svg viewBox="0 0 200 180" className="w-full max-w-xs mx-auto" aria-label="Atwood machine pulley diagram">
      <circle cx="100" cy="50" r="15" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      {/* Ceiling */}
      <line x1="80" y1="20" x2="120" y2="20" stroke="#ffffff30" strokeWidth="2" />
      <line x1="100" y1="20" x2="100" y2="35" stroke="#ffffff30" strokeWidth="2" />
      {/* Strings */}
      <line x1="85" y1="50" x2="85" y2="120" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="115" y1="50" x2="115" y2="100" stroke="#38bdf8" strokeWidth="1.5" />
      {/* Mass 1 */}
      <rect x="73" y="120" width="24" height="24" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" rx="3" />
      <text x="81" y="136" fill="#38bdf8" fontSize="10" fontFamily="monospace">m₁</text>
      {/* Mass 2 */}
      <rect x="103" y="100" width="24" height="24" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" rx="3" />
      <text x="111" y="116" fill="#38bdf8" fontSize="10" fontFamily="monospace">m₂</text>
      {/* Tension labels */}
      <text x="75" y="80" fill="#38bdf8" fontSize="8" fontFamily="monospace">T</text>
      <text x="120" y="80" fill="#38bdf8" fontSize="8" fontFamily="monospace">T</text>
      <text x="65" y="155" fill="#f59e0b" fontSize="8" fontFamily="monospace">m₁g</text>
      <text x="125" y="135" fill="#f59e0b" fontSize="8" fontFamily="monospace">m₂g</text>
    </svg>
  );
}

function LiftApparentWeightDiagram() {
  return (
    <svg viewBox="0 0 200 180" className="w-full max-w-xs mx-auto" aria-label="Apparent weight in a lift diagram">
      <rect x="50" y="30" width="100" height="120" fill="none" stroke="#a78bfa" strokeWidth="2" rx="6" />
      {/* Lift frame acceleration */}
      <line x1="25" y1="90" x2="25" y2="60" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="25,60 21,67 29,67" fill="#f43f5e" />
      <text x="12" y="55" fill="#f43f5e" fontSize="10" fontFamily="monospace">a (up)</text>
      {/* Person/Block */}
      <rect x="85" y="110" width="30" height="30" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" rx="2" />
      <line x1="100" y1="125" x2="100" y2="85" stroke="#34d399" strokeWidth="2" />
      <polygon points="100,85 96,92 104,92" fill="#34d399" />
      <text x="105" y="95" fill="#34d399" fontSize="9" fontFamily="monospace">N = m(g+a)</text>
      <line x1="100" y1="125" x2="100" y2="160" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="100,160 96,153 104,153" fill="#f59e0b" />
      <text x="105" y="155" fill="#f59e0b" fontSize="9" fontFamily="monospace">mg</text>
    </svg>
  );
}

function RoadBankingDiagram() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Road banking force diagram">
      <path d="M 30 140 L 230 140 L 230 65 Z" fill="none" stroke="#ffffff1a" strokeWidth="1.5" />
      <path d="M 30 140 L 230 65" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <text x="210" y="132" fill="#a78bfa" fontSize="10" fontFamily="monospace">θ</text>
      {/* Car/Block */}
      <g transform="translate(130, 102.5) rotate(-20.5)">
        <rect x="-18" y="-10" width="36" height="20" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" rx="2" />
        {/* Normal vector */}
        <line x1="0" y1="0" x2="0" y2="-45" stroke="#34d399" strokeWidth="2" />
        <polygon points="0,-45 -4,-38 4,-38" fill="#34d399" />
        <text x="5" y="-35" fill="#34d399" fontSize="9" fontFamily="monospace">N</text>
      </g>
      {/* Gravity mg */}
      <line x1="130" y1="102.5" x2="130" y2="155" stroke="#f59e0b" strokeWidth="2" />
      <polygon points="130,155 126,148 134,148" fill="#f59e0b" />
      <text x="135" y="150" fill="#f59e0b" fontSize="9" fontFamily="monospace">mg</text>
      {/* Centripetal direction indicator */}
      <line x1="130" y1="102.5" x2="60" y2="102.5" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="65" y="95" fill="#06b6d4" fontSize="8" fontFamily="monospace">mv²/R</text>
    </svg>
  );
}

function VerticalCircularDiagram() {
  return (
    <svg viewBox="0 0 200 180" className="w-full max-w-xs mx-auto" aria-label="Vertical circular motion diagram">
      <circle cx="100" cy="90" r="50" fill="none" stroke="#ffffff15" strokeWidth="1.5" strokeDasharray="4 2" />
      {/* Top point */}
      <circle cx="100" cy="40" r="4" fill="#f43f5e" />
      <line x1="100" y1="40" x2="100" y2="65" stroke="#f43f5e" strokeWidth="1.5" />
      <polygon points="100,65 97,58 103,58" fill="#f43f5e" />
      <text x="82" y="60" fill="#f43f5e" fontSize="8" fontFamily="monospace">T<sub>top</sub> + mg</text>
      <text x="95" y="32" fill="#f43f5e" fontSize="9" fontFamily="monospace">Top (v<sub>min</sub>=√gR)</text>
      {/* Bottom point */}
      <circle cx="100" cy="140" r="4" fill="#34d399" />
      <line x1="100" y1="140" x2="100" y2="115" stroke="#34d399" strokeWidth="1.5" />
      <polygon points="100,115 97,122 103,122" fill="#34d399" />
      <text x="105" y="125" fill="#34d399" fontSize="8" fontFamily="monospace">T<sub>bot</sub></text>
      <line x1="100" y1="140" x2="100" y2="165" stroke="#f59e0b" strokeWidth="1.5" />
      <polygon points="100,165 97,158 103,158" fill="#f59e0b" />
      <text x="105" y="160" fill="#f59e0b" fontSize="8" fontFamily="monospace">mg</text>
      <text x="90" y="152" fill="#34d399" fontSize="9" fontFamily="monospace">Bottom (u<sub>min</sub>=√5gR)</text>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function MechanicsLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const toggleCheck = (i: number) => setChecklist(p => ({ ...p, [i]: !p[i] }));

  const revisionItems = [
    'Newton Laws of Motion (Second Law F=ma, Third Law action-reaction pairs)',
    'Equilibrium of concurrent forces (&Sigma;F<sub>x</sub> = 0, &Sigma;F<sub>y</sub> = 0) & FBD checklist',
    'Solving connected bodies using system acceleration shortcuts',
    'Applying Pseudo Forces in accelerating frames',
    'Linear Momentum Conservation & Impulse as area under F-t graph',
    'Static friction limits vs kinetic friction constants & Angle of friction',
    'Pulling vs Pushing normal force comparisons (pulling is easier)',
    'Rolling friction causes & lubrication mechanics',
    'Vehicle on level circular road safe speed: v<sub>max</sub> = &radic;(&mu;<sub>s</sub>&middot;R&middot;g)',
    'Road banking safe velocity formulas with/without friction',
    'Vertical circular motion critical velocities and tension differences',
    'Non-uniform circular motion: centripetal and tangential accelerations',
    'Spring cut/string cut instantaneous force dynamics',
    'Apparent weight formulations in accelerating elevators',
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12 pb-32">

      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 4</span>
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
                  PHYSICS UNIT 4
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
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Laws of Motion
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
                <span>30 min</span>
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

      {/* What You'll Learn box */}
      <div className="bg-[#0B0D19] border border-white/5 rounded-2xl p-5 space-y-4">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" /> WHAT YOU&apos;LL LEARN
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-white/65">
          {[
            'Newton Laws of Motion (Inertial vs Non-Inertial frames)',
            'Solving connected bodies using system acceleration shortcuts',
            'Applying Pseudo Forces in accelerating frames',
            'Linear Momentum Conservation (exploding pieces vector math)',
            'Static friction self-adjusting limits vs kinetic friction constants',
            'Road banking safe velocity formulas with/without friction',
            'Vertical circular motion critical velocities and tension differences',
            'Non-uniform circular motion: centripetal and tangential accelerations',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-[13px] text-white/80">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </ul>
      </div>

      {/* ── MODULE 1: Newton's Laws of Motion ─────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={1} title="Newton's Laws of Motion" difficulty={2} color="violet" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">'s Laws of Motion &amp; Inertial Frames</h4>
          
          {/* Newton'}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-1.5">
              <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest block">First Law</span>
              <strong className="text-white text-[13px] block">Law of Inertia</strong>
              <p className="text-white/60 text-[12px] leading-relaxed">A body remains at rest or in uniform straight motion unless compelled to change by a net external force.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">Second Law</span>
              <strong className="text-white text-[13px] block">F = dp/dt = ma</strong>
              <p className="text-white/60 text-[12px] leading-relaxed">Rate of change of linear momentum is directly proportional to applied force: <strong>F = dp/dt = m&middot;a</strong> (for constant mass).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1.5">
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block">Third Law</span>
              <strong className="text-white text-[13px] block">Action-Reaction</strong>
              <p className="text-white/60 text-[12px] leading-relaxed">For every action, there is an equal and opposite reaction. They act on <em>different</em> bodies, so they never cancel.</p>
            </div>
          </div>

          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
 These laws define <strong className="text-white text-cyan-300">Inertial Frames</strong> (frames moving at constant velocity or at rest, where a<sub>frame</sub> = 0). For accelerating <strong className="text-white text-rose-300">Non-Inertial Frames</strong> (where a<sub>frame</sub> &ne; 0), Newton's laws are only valid if we apply a correction force called a <strong className="text-rose-300">Pseudo Force (F<sub>p</sub> = &minus;m&middot;a<sub>frame</sub>)</strong> to every body in the opposite direction.
          </p>

          {/* Equilibrium and FBD Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
              <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider block">Equilibrium of Concurrent Forces</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed">
                A system of concurrent forces (forces acting at a single point) is in translational equilibrium when their vector resultant is zero:
              </p>
 <div className="text-emerald-300 text-[12px] bg-black/20 p-2 rounded text-center">
                &Sigma;F<sub>x</sub> = 0 &nbsp;&nbsp;|&nbsp;&nbsp; &Sigma;F<sub>y</sub> = 0 &nbsp;&nbsp;|&nbsp;&nbsp; &Sigma;F<sub>z</sub> = 0
              </div>
              <p className="text-white/45 text-[11px] leading-relaxed">
                If the body is in equilibrium under three coplanar forces, they must be either parallel or concurrent (meeting at a common point).
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 space-y-2">
              <span className="text-[11px] font-black text-indigo-400 uppercase tracking-wider block">Free Body Diagram (FBD) Checklist</span>
              <ul className="list-decimal list-inside text-white/65 text-[12px] space-y-1 leading-relaxed">
                <li><strong className="text-white/80">Isolate:</strong> Choose the system / object and isolate it mentally.</li>
                <li><strong className="text-white/80">Draw Forces:</strong> Represent all external forces acting <em>directly on</em> the body as vectors starting from its center of mass.</li>
                <li><strong className="text-white/80">Axes Selection:</strong> Choose axes along the direction of motion/acceleration to simplify component resolutions.</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AtwoodPulleyDiagram />
            <div className="space-y-3 justify-center flex flex-col">
              <div className="text-[13px] font-bold text-violet-400 uppercase tracking-wider">Atwood Machine & Lami's Theorem</div>
              <p className="text-white/60 text-[13px] leading-relaxed">
                For a simple pulley with connected masses <code className="font-mono text-white text-[12px] bg-white/5 px-1 py-0.5 rounded">m₁ &gt; m₂</code>:
              </p>
 <div className="bg-white/5 rounded-lg p-3 space-y-1 text-[12px]">
                <div>Acceleration: a = (m₁ - m₂)g / (m₁ + m₂)</div>
                <div>Tension: T = 2m₁m₂g / (m₁ + m₂)</div>
              </div>
              <p className="text-white/60 text-[13px] leading-relaxed border-t border-white/5 pt-2">
                <strong>Lami's Theorem</strong> (for exactly 3 concurrent coplanar forces keeping a body in translational equilibrium):
              </p>
 <div className="bg-white/5 rounded-lg p-3 text-[12px] text-cyan-300">
                F₁/sinα = F₂/sinβ = F₃/sinγ
              </div>
              <p className="text-white/50 text-[12px] leading-relaxed">
                Where angle α is between forces F₂ and F₃, β is between F₁ and F₃, and γ is between F₁ and F₂.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MemoryBox title="Visual Memory: Accelerating Bus">
            When a bus accelerates forward, passengers feel thrown backward. 
            <strong>Inertia</strong> is the reason w.r.t the ground frame (inertial frame). 
            <strong>Pseudo Force</strong> is just a mathematical correction tool inside the accelerating bus frame.
          </MemoryBox>
          <MemoryBox title="Newton's Third Law Trap" type="alert">
            Action and reaction forces never act on the same body! They act on different bodies, so they <strong>never cancel</strong> each other out.
          </MemoryBox>
        </div>

        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">Module 1 Formula Cards</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormulaCard
              formula="a = Net Driving Force / Total Mass"
              use_when="System Shortcut: Find common acceleration of connected masses"
              freq_stars={5}
              difficulty_stars={1}
              color="cyan"
              copy_text="a = F_driving / m_total"
            />
            <FormulaCard
              formula="F = dp/dt = m&middot;a"
              use_when="Newton's Second Law: Find force from change in momentum or acceleration"
              freq_stars={5}
              difficulty_stars={1}
              color="violet"
              copy_text="F = m*a"
            />
            <FormulaCard
              formula="Σ T * a = 0"
              use_when="Constraint Motion Shortcut: Link accelerations of multiple pulleys"
              freq_stars={4}
              difficulty_stars={3}
              color="violet"
              copy_text="sum(T * a) = 0"
            />
          </div>
        </div>

        <SolvedExample
          title="Atwood Machine Numerical"
          problem="In an Atwood machine, the suspended masses are m₁ = 3 kg and m₂ = 2 kg. Find the acceleration of the masses and the tension in the string. (Take g = 10 m/s²)"
          steps={[
            'Calculate the system acceleration using the shortcut: a = (m₁ - m₂)g / (m₁ + m₂).',
            'Substitute the given values: a = (3 - 2)·10 / (3 + 2) = 1·10 / 5 = 2 m/s².',
            'Calculate the tension using the formula: T = 2m₁m₂g / (m₁ + m₂).',
            'Substitute the given values: T = 2·3·2·10 / (3 + 2) = 120 / 5 = 24 N.'
          ]}
          insight="Tension T is less than m₁g (30 N) but greater than m₂g (20 N), allowing m₁ to accelerate down and m₂ to accelerate up."
          color="violet"
        />
      </div>

      {/* ── MODULE 2: Momentum & Impulse ─────────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={2} title="Momentum & Impulse" difficulty={3} color="cyan" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Conservation of Linear Momentum</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            If the net external force on a system of particles is zero (<code className="font-mono text-white bg-white/5 px-1 rounded">&Sigma;F<sub>ext</sub> = 0</code>), then the total linear momentum of the system is strictly conserved.
          </p>
          <div className="rounded-xl bg-cyan-900/10 border border-cyan-500/20 p-4 space-y-2">
            <div className="text-[13px] font-bold text-cyan-300 uppercase">Impulse &amp; Momentum Theorem</div>
 <p className="text-white/60 text-[13px] leading-relaxed">
              J = &int; F dt = &Delta;p = p<sub>final</sub> &minus; p<sub>initial</sub>
            </p>
            <p className="text-white/65 text-[13px] leading-relaxed">
 <strong>Impulse</strong> is equal to the <strong>area under the Force-Time (F-t) graph</strong>. If the force varies with time, use integration: <span className="text-cyan-300">J = &int; F(t) dt</span>. If velocity or direction changes instantaneously, resolve vectors into components to compute <span className="text-cyan-300">&Delta;p = m(v<sub>f</sub> &minus; v<sub>i</sub>)</span>.
            </p>
          </div>
        </div>

        <SolvedExample
          title="Bomb Explosion Vector Momentum"
          problem="A bomb of mass 6 kg initially at rest explodes into three pieces of masses 2 kg, 2 kg, and 2 kg. The first two pieces fly off at right angles to each other with velocities of 3î m/s and 4ĵ m/s. Find the velocity and speed of the third piece."
          steps={[
            'Identify initial momentum: p<sub>initial</sub> = 0 since the bomb was at rest.',
            'By momentum conservation, final momentum must be zero: p₁ + p₂ + p₃ = 0 ⟹ p₃ = -(p₁ + p₂).',
            'Compute momentum of the first two pieces: p₁ = m₁v₁ = 2·(3î) = 6î kg·m/s, p₂ = m₂v₂ = 2·(4ĵ) = 8ĵ kg·m/s.',
            'Calculate third piece momentum: p₃ = -(6î + 8ĵ) = -6î - 8ĵ kg·m/s.',
            'Find the velocity of the third piece: v₃ = p₃ / m₃ = (-6î - 8ĵ) / 2 = -3î - 4ĵ m/s.',
            'Compute speed: |v₃| = √((-3)² + (-4)²) = √25 = 5 m/s.'
          ]}
          insight="The third piece flies off in a direction exactly opposite to the resultant momentum vector of the first two pieces."
          color="cyan"
        />
      </div>

      {/* ── MODULE 3: Friction ───────────────────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={3} title="Friction" difficulty={3} color="amber" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Static vs. Kinetic Friction</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            Friction is a resistive force that opposes relative slipping between contact surfaces.
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-white font-bold">
                  <th className="p-3">Property</th>
                  <th className="p-3">Static Friction (fs)</th>
                  <th className="p-3">Kinetic Friction (fk)</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="p-3 font-semibold text-white">Nature</td>
                  <td className="p-3">Self-adjusting; prevents relative motion.</td>
                  <td className="p-3">Constant; acts during relative sliding.</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-semibold text-white">Formula</td>
                  <td className="p-3">0 ≤ fs ≤ μs·N</td>
                  <td className="p-3">fk = μk·N</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Magnitude</td>
                  <td className="p-3">Exactly matches applied tangential force.</td>
                  <td className="p-3">Constant value (typically fk &lt; fs,max).</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Friction Flowchart */}
          <div className="bg-white/5 rounded-xl p-5 space-y-4">
            <div className="text-[13px] font-bold text-amber-400 uppercase tracking-wider text-center">Friction Decision Flowchart</div>
 <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-[13px]">
              <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded text-center w-full md:w-36">
                Applied Force F
              </div>
              <div className="text-white/40">→</div>
              <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded text-center w-full md:w-44">
                Is F ≤ fs,max (μs·N)?
              </div>
              <div className="text-white/40">→</div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <div className="bg-emerald-500/15 border border-emerald-500/20 p-2 rounded text-center text-emerald-300">
                  YES ⟹ No motion<br />fs = F
                </div>
                <div className="bg-rose-500/15 border border-rose-500/20 p-2 rounded text-center text-rose-300">
                  NO ⟹ Slides<br />fk = μk·N
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InclineForcesDiagram />
          <div className="space-y-3 justify-center flex flex-col">
            <div className="text-[13px] font-bold text-amber-400 uppercase tracking-wider">Motion on Rough Incline</div>
            <p className="text-white/60 text-[13px] leading-relaxed">
              When a block sits or slides on an inclined plane of angle <code className="font-mono text-white text-[12px] bg-white/5 px-1 py-0.5 rounded">&theta;</code>:
            </p>
 <div className="bg-white/5 rounded-lg p-3 space-y-2 text-[12px]">
              <div>Angle of Repose: &theta; = tan_-1(&mu;_s) (Block begins to slip)</div>
              <div>Sliding Down: a = g(sin&theta; &minus; &mu;_k&middot;cos&theta;)</div>
              <div>Sliding Up: a = g(sin&theta; + &mu;_k&middot;cos&theta;) (deceleration)</div>
            </div>
          </div>
        </div>

        {/* Angle of Friction, Pulling vs Pushing, Rolling Friction, Lubrication */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Angle of Friction & Pull vs Push */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-3">
            <div>
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block">Angle of Friction (&lambda;)</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed mt-1">
 The angle between the normal reaction <span className="">N</span> and the resultant of the limiting friction <span className="">f<sub>s,max</sub></span> and normal force:
 <strong className="block text-amber-300 mt-0.5">tan &lambda; = f<sub>s,max</sub> / N = &mu;<sub>s</sub></strong>
                This is mathematically equal to the Angle of Repose!
              </p>
            </div>
            <div className="border-t border-white/5 pt-3">
              <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block">Pulling vs. Pushing on a Rough Surface</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed mt-1">
 Pulling at angle <span className="">&theta;</span> decreases the normal force (<span className="">N = mg &minus; F sin&theta;</span>), which reduces friction. Pushing increases normal force (<span className="">N = mg + F sin&theta;</span>). Hence, <strong>pulling is easier than pushing</strong>.
              </p>
            </div>
          </div>

          {/* Rolling Friction & Lubrication */}
          <div className="p-4 rounded-xl bg-[#05060F] border border-white/5 space-y-3">
            <div>
              <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider block">Rolling Friction (f<sub>r</sub>)</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed mt-1">
                Occurs when a body (wheel, sphere) rolls over a surface. Caused by local elastic deformation at the contact surface.
 <strong className="block text-cyan-300 mt-0.5">f<sub>r</sub> = &mu;<sub>r</sub> &middot; (N / r) &nbsp;&nbsp;|&nbsp;&nbsp; &mu;<sub>r</sub> &ll; &mu;<sub>k</sub> &ll; &mu;<sub>s</sub></strong>
                Rolling friction is significantly smaller than sliding friction, which is why ball bearings are used.
              </p>
            </div>
            <div className="border-t border-white/5 pt-3">
              <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider block">Lubrication</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed mt-1">
                A classic friction reduction method. A thin layer of lubricant (oil, grease) is inserted between sliding surfaces, replacing solid-to-solid contact with fluid friction (shear resistance), which is far smaller.
              </p>
            </div>
          </div>
        </div>

        <SolvedExample
          title="Block slipping on Incline"
          problem="A block of mass 5 kg is placed on a rough inclined plane of inclination 37°. If the coefficient of static friction is &mu;<sub>s</sub> = 0.5 and kinetic friction is &mu;<sub>k</sub> = 0.4, determine if the block slides, and find its acceleration. (Take g = 10 m/s², sin 37° = 0.6, cos 37° = 0.8)"
          steps={[
            'Calculate the driving gravitational force along the incline: F<sub>drive</sub> = mg sin&theta; = 5&middot;10&middot;0.6 = 30 N.',
            'Calculate the normal reaction: N = mg cos&theta; = 5&middot;10&middot;0.8 = 40 N.',
            'Find maximum static friction: f<sub>s,max</sub> = &mu;<sub>s</sub>&middot;N = 0.5&middot;40 = 20 N.',
            'Compare: F<sub>drive</sub> (30 N) &gt; f<sub>s,max</sub> (20 N) ⟹ The block slips and moves down the incline.',
            'Apply kinetic friction: f<sub>k</sub> = &mu;<sub>k</sub>&middot;N = 0.4&middot;40 = 16 N.',
            'Find acceleration: a = (F<sub>drive</sub> &minus; f<sub>k</sub>) / m = (30 - 16) / 5 = 14 / 5 = 2.8 m/s².'
          ]}
          insight="Once slipping starts, static friction is replaced by kinetic friction, which is smaller, resulting in a higher net accelerating force."
          color="amber"
        />
      </div>

      {/* ── MODULE 4: Circular Motion & Banking ──────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={4} title="Circular Motion & Banking" difficulty={4} color="rose" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Centripetal vs. Centrifugal force</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            <strong className="text-white">Centripetal force</strong> is not a separate force; it is the label we give to whatever net real force (tension, gravity, friction) points towards the center. 
            <strong className="text-rose-300">Centrifugal force</strong> is a pseudo force ONLY drawn in the rotating frame of reference.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RoadBankingDiagram />
            <div className="space-y-3 justify-center flex flex-col">
              <div className="text-[13px] font-bold text-rose-400 uppercase tracking-wider">Banking of Roads</div>
              <p className="text-white/60 text-[13px] leading-relaxed">
                For a circular road of radius <code className="font-mono text-white">R</code> banked at angle <code className="font-mono text-white">θ</code>:
              </p>
 <div className="bg-white/5 rounded-lg p-3 space-y-2 text-[12px]">
                <div>Level Circular Road (Friction only): v_max = &radic;(&mu;_s&middot;R&middot;g)</div>
                <div>Frictionless Banked Speed: v_opt = &radic;(R&middot;g&middot;tan&theta;)</div>
                <div>Max Banked Speed (with friction): v_max = &radic;[R&middot;g&middot;(&mu; + tan&theta;) / (1 &minus; &mu;&middot;tan&theta;)]</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VerticalCircularDiagram />
          <div className="space-y-3 justify-center flex flex-col">
            <div className="text-[13px] font-bold text-rose-400 uppercase tracking-wider">Vertical Circular Motion (VCM)</div>
 <p className="text-white/60 text-[13px] leading-relaxed text-[12px] bg-white/5 p-3 rounded">
              - Min speed at bottom: u<sub>min</sub> = &radic;(5gR)<br />
              - Min speed at top: v<sub>min</sub> = &radic;(gR)<br />
              - Tension Difference: T<sub>bottom</sub> &minus; T<sub>top</sub> = 6mg
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">Module 4 Formula Cards</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormulaCard
              formula="v<sub>max</sub> = &radic;(&mu;<sub>s</sub>&middot;R&middot;g)"
              use_when="Level Circular Road: Find maximum safe speed without skidding"
              freq_stars={5}
              difficulty_stars={2}
              color="emerald"
              copy_text="v_max = sqrt(mu*R*g)"
            />
            <FormulaCard
              formula="a<sub>total</sub> = &radic;(a<sub>c</sub>&sup2; + a<sub>t</sub>&sup2;)"
              use_when="Non-Uniform Circular Motion: Total acceleration magnitude"
              freq_stars={5}
              difficulty_stars={4}
              color="rose"
              copy_text="a = sqrt(a_c^2 + a_t^2)"
            />
            <FormulaCard
              formula="v<sub>opt</sub> = &radic;(R&middot;g&middot;tan&theta;)"
              use_when="Frictionless banked road safe velocity"
              freq_stars={4}
              difficulty_stars={3}
              color="cyan"
              copy_text="v = sqrt(R*g*tan(theta))"
            />
            <FormulaCard
              formula="T<sub>bot</sub> &minus; T<sub>top</sub> = 6mg"
              use_when="Tension difference at bottom and top in vertical circle"
              freq_stars={4}
              difficulty_stars={3}
              color="violet"
              copy_text="T_diff = 6*m*g"
            />
          </div>
        </div>

        <SolvedExample
          title="Non-Uniform Circular Motion Acceleration"
          problem="A particle moves along a circle of radius R = 2 m. At a certain instant, its speed is v = 4 m/s and it is accelerating tangentially at a<sub>t</sub> = 3 m/s&sup2;. Find the magnitude of its total acceleration."
          steps={[
            'Calculate the centripetal acceleration: a<sub>c</sub> = v&sup2; / R.',
            'Substitute values: a<sub>c</sub> = 4&sup2; / 2 = 16 / 2 = 8 m/s&sup2;.',
            'Identify the tangential acceleration component: a<sub>t</sub> = 3 m/s&sup2;.',
            'Calculate total acceleration: a<sub>total</sub> = &radic;(a<sub>c</sub>&sup2; + a<sub>t</sub>&sup2;).',
            'Substitute values: a<sub>total</sub> = &radic;(8&sup2; + 3&sup2;) = &radic;(64 + 9) = &radic;73 &asymp; 8.54 m/s&sup2;.'
          ]}
          insight="Centripetal acceleration changes the velocity direction, while tangential acceleration changes its speed. Since they are perpendicular, we use the Pythagorean theorem."
          color="rose"
        />
      </div>

      {/* ── MODULE 5: Advanced Applications ─────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={5} title="Advanced Applications" difficulty={5} color="emerald" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LiftApparentWeightDiagram />
          <div className="space-y-3 justify-center flex flex-col">
 <div className="text-[13px] font-bold text-emerald-400 uppercase tracking-wider">Apparent Weight in Lift</div>
            <div className="overflow-x-auto rounded-xl border border-white/5">
 <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5 text-white">
                    <th className="p-2">Lift Motion</th>
                    <th className="p-2">Apparent Weight (N)</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="p-2">Const. Speed / Rest</td>
                    <td className="p-2">mg</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2">Accelerating UP (a)</td>
                    <td className="p-2 text-rose-300">m(g + a)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-2">Accelerating DOWN (a)</td>
                    <td className="p-2 text-cyan-300">m(g - a)</td>
                  </tr>
                  <tr>
                    <td className="p-2">Free Fall (a = g)</td>
                    <td className="p-2 text-rose-400 font-bold">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Spring Systems & Cut Spring/String Rule</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            Springs store force as deformation <code className="font-mono text-white bg-white/5 px-1 rounded">F = -kx</code>. Equivalent constants for spring combinations:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl space-y-2">
              <div className="text-[13px] font-bold text-emerald-300 uppercase">Series vs. Parallel Springs</div>
 <ul className="list-disc list-inside text-white/70 text-[13px] space-y-1.5 leading-relaxed">
                <li>Series: 1/keq = 1/k₁ + 1/k₂ ⟹ keq = k₁k₂/(k₁+k₂)</li>
                <li>Parallel: keq = k₁ + k₂</li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-xl space-y-2">
              <div className="text-[13px] font-bold text-rose-300 uppercase">Instantaneous Cut Rules</div>
              <ul className="list-disc list-inside text-white/70 text-[13px] space-y-1.5 leading-relaxed">
                <li><strong>Strings</strong>: Tension vanishes or changes value <strong>instantaneously</strong>.</li>
                <li><strong>Springs</strong>: Spring force <strong>remains unchanged</strong> instantaneously since deformation cannot change in zero time.</li>
              </ul>
            </div>
          </div>
        </div>

        <SolvedExample
          title="Rocket Propulsion Variable Mass"
          problem="A rocket of initial mass M = 1000 kg ejects fuel gas at a constant rate of dm/dt = -10 kg/s w.r.t the rocket with relative speed v<sub>rel</sub> = 500 m/s. Find the initial thrust force on the rocket."
          steps={[
            'Identify the formula for rocket thrust: F<sub>thrust</sub> = v<sub>rel</sub> &middot; (-dm/dt).',
            'Identify given parameters: v<sub>rel</sub> = 500 m/s, rate of mass ejection -dm/dt = 10 kg/s.',
            'Calculate thrust: F<sub>thrust</sub> = 500 &middot; 10 = 5000 N.'
          ]}
          insight="This thrust force accelerates the rocket upwards. Net acceleration is: a = (F<sub>thrust</sub> &minus; Mg)/M."
          color="emerald"
        />
      </div>

      {/* ── SECTION 5: Common Mistakes ───────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<AlertTriangle className="w-5 h-5" />} label="Common Traps & Mistakes" color="rose" />
        <div className="space-y-3">
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 space-y-2">
            <div className="text-rose-300 font-bold text-[14.5px]">Trap 1: Assuming Normal reaction N = mg blindly</div>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
              Normal reaction is NOT always weight. On an incline, <code className="font-mono text-white bg-white/5 px-1 rounded">N = mg cosθ</code>. Under an upward pulling force F at angle θ, <code className="font-mono text-white bg-white/5 px-1 rounded">N = mg - F sinθ</code> (which makes pulling easier than pushing).
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 space-y-2">
            <div className="text-rose-300 font-bold text-[14.5px]">Trap 2: Action-Reaction Cancellation</div>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
              Many students think the normal reaction N and weight mg of a resting book on a table form an action-reaction pair because they cancel out. <strong>WRONG</strong>. They act on the same body (the book). Action-reaction pairs must act on different bodies and never cancel.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 space-y-2">
            <div className="text-rose-300 font-bold text-[14.5px]">Trap 3: Spring force in cut scenarios</div>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
              Assuming spring force collapses to zero immediately when a connected string is cut. <strong>WRONG</strong>. Spring force is proportional to stretch, which requires time to relax.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: "Must Memorize" Quick Reference Box ──────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Award className="w-5 h-5" />} label="Must Memorize Quick Reference" color="amber" />
        <div className="rounded-2xl border border-amber-500/30 bg-amber-900/10 p-5 space-y-3">
          <p className="text-amber-200 text-[13px] sm:text-sm">Save time in exams. Memorize these values and equations directly:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Atwood machine acceleration a=(m1-m2)g/(m1+m2)', 'Angle of repose tanθ=μ', 'Vertical circle bottom speed √(5gR)', 'Tension difference T_bot-T_top = 6mg', 'Banked road opt speed √(Rg tanθ)', 'Lami\'s Theorem relations', 'Series spring 1/keq = 1/k1 + 1/k2', 'Pseudo force Fp = -m·a'].map((item, idx) => (
 <div key={idx} className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-amber-200 text-[13px] text-center flex items-center justify-center">
                {}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 7: 2-Minute Revision Sheet ───────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader icon={<RefreshCw className="w-5 h-5" />} label="2-Minute Revision Checklist" color="emerald" />
        <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-5 space-y-4">
          <p className="text-white/50 text-[13px]">Run through this checklist before your mock tests to verify readiness.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {revisionItems.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-150',
                  checklist[i]
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/5 bg-white/[0.02] text-white/60 hover:border-white/10'
                )}
              >
                <div className={cn('w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                  checklist[i] ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                )}>
                  {checklist[i] && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-[13px]" dangerouslySetInnerHTML={{ __html: item }} />
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-white/40 text-[13px]">
              {Object.values(checklist).filter(Boolean).length} / {revisionItems.length} checked
            </span>
            {Object.values(checklist).filter(Boolean).length === revisionItems.length && (
              <span className="text-emerald-400 text-[13px] font-bold">🎉 Fully prepared for Unit 4!</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}