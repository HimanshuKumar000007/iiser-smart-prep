import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  ArrowRight, BookOpen, Zap, Eye, TrendingUp, Activity, Brain, Award,
  ChevronDown, ChevronUp, Copy, Check, RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── Sub-Components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, label, color = 'cyan' }: { icon: React.ReactNode; label: string; color?: string }) {
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
      <span className={colors[color] ?? 'text-cyan-400'}>{icon}</span>
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-widest">{label}</h2>
    </div>
  );
}

function FrequencyBadge({ stars, label }: { stars: number; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[13px]">
      <span className="text-white/50">IISER Freq</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn('w-3 h-3', i < stars ? 'text-amber-400 fill-amber-400' : 'text-white/20')} />
        ))}
      </span>
      <span className="text-white/60">{label}</span>
    </div>
  );
}

function FormulaCard({
  formula, use_when, freq_stars, freq_label, color = 'cyan', copy_text
}: {
  formula: React.ReactNode;
  use_when: string;
  freq_stars: number;
  freq_label: string;
  color?: string;
  copy_text: string;
}) {
  const [copied, setCopied] = useState(false);
  const borderColors: Record<string, string> = {
    cyan: 'border-cyan-500/25 hover:border-cyan-400/40',
    violet: 'border-violet-500/25 hover:border-violet-400/40',
    amber: 'border-amber-500/25 hover:border-amber-400/40',
    emerald: 'border-emerald-500/25 hover:border-emerald-400/40',
    rose: 'border-rose-500/25 hover:border-rose-400/40',
  };
  const bgColors: Record<string, string> = {
    cyan: 'bg-cyan-500/5',
    violet: 'bg-violet-500/5',
    amber: 'bg-amber-500/5',
    emerald: 'bg-emerald-500/5',
    rose: 'bg-rose-500/5',
  };
  const formulaColors: Record<string, string> = {
    cyan: 'text-cyan-300',
    violet: 'text-violet-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
    rose: 'text-rose-300',
  };
  return (
    <div className={cn('rounded-2xl border p-5 transition-all duration-200', bgColors[color], borderColors[color])}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className={cn('font-mono font-bold text-[19px] tracking-wide', formulaColors[color])}>
            <span dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
          <div className="text-white/50 text-[13px] font-medium uppercase tracking-wider">Use when</div>
          <div className="text-white/80 text-[14.5px]"><span dangerouslySetInnerHTML={{ __html: use_when }} /></div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(copy_text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
        </button>
      </div>
      <div className="mt-3 pt-3 border-t border-white/5">
        <FrequencyBadge stars={freq_stars} label={freq_label} />
      </div>
    </div>
  );
}

function MemoryBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 flex gap-3">
      <div className="text-2xl shrink-0">🔥</div>
      <div className="text-amber-200 text-[14.5px] leading-relaxed">{children}</div>
    </div>
  );
}

function TrapCard({ title, trap, fix }: { title: string; trap: string; fix: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-rose-500/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="text-rose-300 font-semibold text-[14.5px]">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-rose-400" /> : <ChevronDown className="w-4 h-4 text-rose-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <div className="bg-rose-900/20 rounded-xl p-3 border border-rose-500/20">
            <div className="text-[13px] font-bold text-rose-400 uppercase mb-1">The Trap</div>
            <p className="text-white/75 text-[14.5px]">{trap}</p>
          </div>
          <div className="bg-emerald-900/20 rounded-xl p-3 border border-emerald-500/20">
            <div className="text-[13px] font-bold text-emerald-400 uppercase mb-1">The Fix</div>
            <p className="text-white/75 text-[14.5px]">{fix}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function RecognitionCard({ trigger, thought, action, color = 'violet' }: { trigger: string; thought: string; action: string; color?: string }) {
  const borderColors: Record<string, string> = {
    violet: 'border-violet-500/25',
    cyan: 'border-cyan-500/25',
    amber: 'border-amber-500/25',
  };
  const badgeColors: Record<string, string> = {
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  };
  return (
    <div className={cn('rounded-2xl border bg-white/[0.02] p-4 space-y-3', borderColors[color])}>
      <div className="flex items-center gap-2">
        <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border', badgeColors[color])}>If question says...</span>
      </div>
      <div className="font-mono text-white font-semibold text-[14.5px] bg-white/5 rounded-lg px-3 py-2" dangerouslySetInnerHTML={{ __html: `&ldquo;${trigger}&rdquo;` }} />
      <div className="flex items-center gap-2 text-white/40 text-[13px]">
        <ArrowRight className="w-3 h-3" />
        <span>Immediately think</span>
      </div>
      <div className="font-mono text-emerald-300 font-bold text-[14.5px]" dangerouslySetInnerHTML={{ __html: thought }} />
      <div className="text-white/65 text-[13px] border-t border-white/5 pt-2" dangerouslySetInnerHTML={{ __html: action }} />
    </div>
  );
}

// ─── SVG Graphs ───────────────────────────────────────────────────────────────

function XTGraph() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Position-Time graph">
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="30" y1={y} x2="250" y2={y} stroke="#ffffff0a" strokeWidth="1" />
      ))}
      {[70, 110, 150, 190, 230].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2="165" stroke="#ffffff0a" strokeWidth="1" />
      ))}
      <line x1="30" y1="160" x2="250" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="30" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <text x="245" y="175" fill="#ffffff60" fontSize="11" fontFamily="monospace">t</text>
      <text x="18" y="24" fill="#ffffff60" fontSize="11" fontFamily="monospace">x</text>
      <path d="M 35 150 Q 100 145 145 110 Q 190 70 245 30"
        fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
      <line x1="100" y1="155" x2="180" y2="90" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 2" />
      <text x="200" y="28" fill="#22d3ee" fontSize="10" fontFamily="monospace">slope = v</text>
      <text x="185" y="80" fill="#a78bfa" fontSize="9" fontFamily="monospace">tangent</text>
      <text x="40" y="110" fill="#ffffff60" fontSize="9" fontFamily="monospace">concave ∪</text>
      <text x="40" y="123" fill="#ffffff60" fontSize="9" fontFamily="monospace">⟹ a &gt; 0</text>
    </svg>
  );
}

function VTGraph() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Velocity-Time graph">
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="30" y1={y} x2="250" y2={y} stroke="#ffffff0a" strokeWidth="1" />
      ))}
      {[70, 110, 150, 190, 230].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2="165" stroke="#ffffff0a" strokeWidth="1" />
      ))}
      <line x1="30" y1="160" x2="250" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="30" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <text x="245" y="175" fill="#ffffff60" fontSize="11" fontFamily="monospace">t</text>
      <text x="18" y="24" fill="#ffffff60" fontSize="11" fontFamily="monospace">v</text>
      <line x1="35" y1="140" x2="245" y2="35" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="35,160 245,160 245,35 35,140" fill="#34d39918" />
      <line x1="90" y1="115" x2="175" y2="73" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" />
      <text x="120" y="68" fill="#f59e0b" fontSize="9" fontFamily="monospace">slope = a</text>
      <text x="115" y="145" fill="#34d399" fontSize="9" fontFamily="monospace">area = displacement</text>
    </svg>
  );
}

function ATGraph() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Acceleration-Time graph">
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="30" y1={y} x2="250" y2={y} stroke="#ffffff0a" strokeWidth="1" />
      ))}
      {[70, 110, 150, 190, 230].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2="165" stroke="#ffffff0a" strokeWidth="1" />
      ))}
      <line x1="30" y1="160" x2="250" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="30" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <text x="245" y="175" fill="#ffffff60" fontSize="11" fontFamily="monospace">t</text>
      <text x="18" y="24" fill="#ffffff60" fontSize="11" fontFamily="monospace">a</text>
      <line x1="35" y1="80" x2="245" y2="80" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="35,160 245,160 245,80 35,80" fill="#f472b618" />
      <text x="90" y="135" fill="#f472b6" fontSize="9" fontFamily="monospace">area = Δv</text>
      <text x="155" y="72" fill="#f472b6" fontSize="9" fontFamily="monospace">const a</text>
    </svg>
  );
}

function VXGraph() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Velocity-Position graph">
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="30" y1={y} x2="250" y2={y} stroke="#ffffff0a" strokeWidth="1" />
      ))}
      {[70, 110, 150, 190, 230].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2="165" stroke="#ffffff0a" strokeWidth="1" />
      ))}
      <line x1="30" y1="160" x2="250" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="30" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <text x="245" y="175" fill="#ffffff60" fontSize="11" fontFamily="monospace">x</text>
      <text x="18" y="24" fill="#ffffff60" fontSize="11" fontFamily="monospace">v</text>
      <path d="M 35 155 Q 100 150 160 110 Q 210 75 245 35"
        fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="120" y1="125" x2="190" y2="78" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" />
      <text x="108" y="170" fill="#818cf8" fontSize="9" fontFamily="monospace">slope = dv/dx</text>
      <text x="140" y="68" fill="#f59e0b" fontSize="9" fontFamily="monospace">subnormal = a</text>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function MotionStraightLessonDetail({ isCompleted, onNavigate }: Props) {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const toggleCheck = (i: number) => setChecklist(p => ({ ...p, [i]: !p[i] }));

  const revisionItems = [
    'SUVAT equations require constant acceleration',
    'Distance ≠ Displacement when v changes sign',
    'a = v(dv/dx) when a depends on position x',
    'Split integrals at v = 0 to find total distance',
    'At highest point: v = 0, a = g ≠ 0 (g = 9.8 or 10 m/s²)',
    'Graph slope: x-t → v | v-t → a (kink = slope discontinuity)',
    'Graph area: v-t → displacement | a-t → Δv ONLY (not velocity)',
    'Galileo ratio for free fall: 1 : 3 : 5 : 7...',
    'Relative velocity: freeze one frame to solve chases',
    'Turning point: v = 0 AND a ≠ 0',
    'Constraint pulley relation: sum of coordinate lengths',
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-32">

      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 2</span>
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
                  PHYSICS UNIT 2
                </span>
 <span className="px-3 py-1 rounded-full bg-[#3B1219] border border-rose-500/30 text-rose-400 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> HIGH WEIGHTAGE
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Motion in a Straight Line
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
                <span>15 min</span>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">IAT IMPORTANCE</div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn('w-3.5 h-3.5', i < 4 ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">YEARLY OCCURRENCE</div>
 <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>1 question every year</span>
              </div>
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
            'Calculus definitions vs algebraic SUVAT equations',
            'All 4 kinematic graphs, kink meaning, and areas',
            '1D relative velocity frame to resolve chases',
            'Free fall gravity equations and Galileo odd numbers law',
            'Constraint motion for pulley-mass string systems',
            'Handling turning points and sign changes for distance',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-[13px] text-white/80">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </ul>
      </div>

      {/* ── SECTION 1: Core Concepts ─────────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<BookOpen className="w-5 h-5" />} label="Core Concepts" color="cyan" />

        {/* Concept 1: What is Kinematics */}
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Concept 1</span>
            <h3 className="text-white font-display font-bold text-[14.5px]">What is Kinematics?</h3>
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            Kinematics describes <strong className="text-white">how</strong> things move — position, velocity, acceleration — without asking <em>why</em>. That "why" (forces, mass) is Dynamics/Newton's Laws.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                emoji: '📏',
                title: 'Distance vs. Displacement',
                reveal: 'Distance: Actual path length (Scalar). Always ≥ 0, never decreases.\nDisplacement: Shortest vector from Start → End. Can be positive, negative, or zero.\nKey: Distance ≥ |Displacement| always.',
                color: 'border-cyan-500/20 bg-cyan-500/5'
              },
              {
                emoji: '⏱️',
                title: 'Average vs. Instantaneous',
                reveal: 'Average: Over a finite time interval Δt. Represents the slope of the secant line on x-t graph.\nInstantaneous: As Δt → 0. Represents the slope of the tangent line on x-t graph.',
                color: 'border-violet-500/20 bg-violet-500/5'
              },
              {
                emoji: '🚗',
                title: 'Uniform vs. Non-Uniform',
                reveal: 'Uniform Motion: Acceleration a = 0, velocity v = constant. Position changes linearly: s = vt.\nNon-Uniform Motion: Acceleration a ≠ 0, velocity v changes. Requires algebra/SUVAT (constant acceleration) or calculus (variable acceleration).',
                color: 'border-amber-500/20 bg-amber-500/5'
              }
            ].map((card) => {
              const [open, setOpen] = useState(false);
              return (
                <button
                  key={card.title}
                  onClick={() => setOpen(o => !o)}
                  className={cn('rounded-xl border p-4 text-left transition-all duration-200', card.color, open ? 'ring-1 ring-white/10' : 'hover:ring-1 hover:ring-white/5')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[21px]">{card.emoji}</span>
                      <span className="text-white font-semibold text-[14.5px]">{card.title}</span>
                    </div>
                    <span className="text-white/30 text-[13px]">{open ? '▲' : 'Reveal'}</span>
                  </div>
                  {open && (
                    <div className="mt-3 text-white/70 text-[13px] leading-relaxed whitespace-pre-line border-t border-white/10 pt-3">
                      {card.reveal}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scalar vs. Vector Quick Reference Table */}
          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 space-y-2">
 <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">⚖️ Scalar vs. Vector Reference</span>
            <div className="overflow-x-auto">
 <table className="w-full text-[12.5px] border-collapse border border-white/5 text-white/70">
                <thead>
                  <tr className="bg-white/5 text-white border-b border-white/10 text-left uppercase text-[10px] tracking-wider">
                    <th className="p-2 border-r border-white/5">Quantity</th>
                    <th className="p-2 border-r border-white/5">Scalar Variant (Magnitude Only)</th>
                    <th className="p-2 border-r border-white/5">Vector Variant (Mag + Direction)</th>
                    <th className="p-2">Key Distinction / IAT Hook</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                    <td className="p-2 border-r border-white/5 font-bold text-white">Space</td>
                    <td className="p-2 border-r border-white/5 text-cyan-300">Distance (d ≥ 0)</td>
                    <td className="p-2 border-r border-white/5 text-violet-300">Displacement (s)</td>
                    <td className="p-2 font-sans">Distance can never decrease. Displacement can decrease and be zero.</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                    <td className="p-2 border-r border-white/5 font-bold text-white">Rate of Position</td>
                    <td className="p-2 border-r border-white/5 text-cyan-300">Speed (v)</td>
                    <td className="p-2 border-r border-white/5 text-violet-300">Velocity (v&#x20d7;)</td>
                    <td className="p-2 font-sans">
                      <strong>Instantaneous Speed = |Instantaneous Velocity|</strong>. Average speed &ne; |average velocity|!
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="p-2 border-r border-white/5 font-bold text-white">Rate of Velocity</td>
                    <td className="p-2 border-r border-white/5 text-cyan-300">Magnitude of acc. |a&#x20d7;|</td>
                    <td className="p-2 border-r border-white/5 text-violet-300">Acceleration (a&#x20d7;)</td>
                    <td className="p-2 font-sans">Acceleration direction determines if speed increases (same as v) or decreases (opposite to v).</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[12.5px] text-amber-300/90 font-sans italic bg-amber-500/5 p-3 rounded border border-amber-500/10 leading-relaxed">
              💡 <strong>CRITICAL IAT TRAP:</strong> Instantaneous speed is <em>always</em> equal to the magnitude of instantaneous velocity: <code className="font-mono bg-white/10 px-1 rounded">speed = |v|</code>. However, <strong>Average Speed</strong> is calculated as Total Distance / Total Time, which is generally <em>greater than or equal to</em> the magnitude of Average Velocity (Total Displacement / Total Time).
            </div>
          </div>

          <MemoryBox>
            Distance is what your odometer reads. Displacement is what your GPS straight-line arrow shows.
          </MemoryBox>
        </div>

        {/* Concept 2: The Calculus Triangle */}
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">Concept 2</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">The Calculus Triangle</h3>
            </div>
            <FrequencyBadge stars={5} label="Every Year" />
          </div>
          <p className="text-white/65 text-[14.5px]">These three relations are the universal foundation. They work for <strong className="text-white">all</strong> types of acceleration.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { formula: 'v = dx/dt', title: 'Velocity', desc: 'Rate of change of position' },
              { formula: 'a = dv/dt', title: 'Acceleration', desc: 'Rate of change of velocity' },
              { formula: 'a = v·dv/dx', title: 'Chain Rule Form', desc: 'Critical for a = f(x)' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-black/30 border border-violet-500/15 p-4 text-center space-y-2">
                <div className="font-mono text-violet-300 font-bold text-[19px]">{item.formula}</div>
                <div className="text-white/80 text-[13px] font-semibold">{item.title}</div>
                <div className="text-white/40 text-[13px]">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Integration Decision Tree Flowcard */}
          <div className="bg-black/35 border border-violet-500/25 rounded-xl p-4 space-y-3">
 <span className="text-[11px] font-bold text-violet-300 uppercase tracking-wider block text-center">🌳 Variable Acceleration Decision Tree</span>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[13px]">
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg space-y-1">
                <span className="text-amber-300 font-bold block">1. If a = f(t)</span>
                <span className="text-white/60 block">We want velocity:</span>
                <span className="text-emerald-300 font-bold block">v(t) = ∫ a(t) dt + C</span>
                <span className="text-white/40 text-[11px] block mt-1">Use initial condition to find constant C.</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg space-y-1">
                <span className="text-amber-300 font-bold block">2. If a = f(x)</span>
                <span className="text-white/60 block">We want velocity:</span>
                <span className="text-emerald-300 font-bold block">∫ v dv = ∫ f(x) dx</span>
                <span className="text-white/40 text-[11px] block mt-1">LHS becomes: &frac12;(v_f&sup2; &minus; v_i&sup2;).</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg space-y-1">
                <span className="text-amber-300 font-bold block">3. If a = f(v)</span>
                <span className="text-white/60 block">Find time or position:</span>
                <span className="text-emerald-300 font-bold block">dt = dv / f(v)</span>
                <span className="text-emerald-300 font-bold block">dx = v dv / f(v)</span>
                <span className="text-white/40 text-[11px] block mt-1">Integrate both sides using given limits.</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-rose-500/10 border border-rose-500/25 p-3 flex gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-rose-200 text-[13px] leading-relaxed">
              <strong>CRITICAL:</strong> Use <code className="font-mono bg-white/10 px-1 rounded">a = v(dv/dx)</code> when acceleration is given as a function of position (x), not time (t). This is the #1 IAT trap.
            </p>
          </div>
        </div>

        {/* Concept 3: Relative Velocity */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Concept 3</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Relative Velocity in 1D</h3>
            </div>
            <FrequencyBadge stars={4} label="Overtaking & Chases" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            IAT loves relative motion. The trick: <strong className="text-white">freeze one object</strong> and reduce a two-body problem to a one-body problem.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/30 border border-emerald-500/15 p-4 space-y-2">
 <div className="text-emerald-400 font-bold">v<sub>rel</sub> = v<sub>A</sub> &minus; v<sub>B</sub></div>
              <div className="text-white/50 text-[13px]">Relative velocity of A w.r.t. B</div>
            </div>
            <div className="rounded-xl bg-black/30 border border-emerald-500/15 p-4 space-y-2">
 <div className="text-emerald-400 font-bold">a<sub>rel</sub> = a<sub>A</sub> &minus; a<sub>B</sub></div>
              <div className="text-white/50 text-[13px]">Relative acceleration of A w.r.t. B</div>
            </div>
          </div>
          <div className="rounded-xl bg-emerald-900/20 border border-emerald-500/15 p-4 space-y-2">
            <div className="text-[13px] font-bold text-emerald-400 uppercase">Overtaking Framework</div>
            <ol className="list-decimal list-inside text-white/70 text-[13px] space-y-1 leading-relaxed">
              <li>Set v<sub>rel</sub> and a<sub>rel</sub> using the formulas above</li>
              <li>Distance to cover = relative separation</li>
              <li>Apply standard SUVAT using only relative values</li>
            </ol>
          </div>
          <MemoryBox>
            Same direction → subtract velocities. Opposite direction → add velocities. Always.
          </MemoryBox>
        </div>

        {/* Concept 4: Free Fall under Gravity */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Concept 4</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Free Fall under Gravity</h3>
            </div>
            <FrequencyBadge stars={5} label="Extremely Common" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            Free fall is motion under the sole influence of gravity. The acceleration due to gravity is constant near Earth's surface: 
 <strong className="text-white ml-1.5 mr-1.5">g = 9.8 m/s²</strong> 
 (often approximated as <strong className="text-white">10 m/s²</strong> in IAT questions — check the instruction header).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-black/30 border border-rose-500/15 p-4 space-y-2">
              <div className="text-[13px] font-bold text-rose-400 uppercase">Sign Convention (Upward Positive)</div>
              <ul className="list-disc list-inside text-white/70 text-[13px] space-y-1.5 leading-relaxed">
                <li>Acceleration <code className="font-mono bg-white/10 px-1 rounded">a = -g = -9.8 m/s²</code> (always downwards)</li>
                <li>Initial velocity <code className="font-mono bg-white/10 px-1 rounded">u</code> is <span className="text-emerald-400 font-bold">+ve</span> if thrown up, <span className="text-rose-400 font-bold">-ve</span> if thrown down</li>
                <li>Displacement <code className="font-mono bg-white/10 px-1 rounded">s = h</code> is positive above the release point</li>
              </ul>
            </div>
            <div className="rounded-xl bg-black/30 border border-rose-500/15 p-4 space-y-2">
              <div className="text-[13px] font-bold text-rose-400 uppercase">Equations of Motion (a = -g)</div>
 <div className="grid grid-cols-2 gap-2 text-[13px]">
                <div className="bg-white/5 p-2 rounded text-rose-300">v = u - gt</div>
                <div className="bg-white/5 p-2 rounded text-rose-300">h = ut - ½gt²</div>
                <div className="bg-white/5 p-2 rounded text-rose-300">v&sup2; = u&sup2; &minus; 2gh</div>
                <div className="bg-white/5 p-2 rounded text-rose-300">t<sub>up</sub> = u/g</div>
              </div>
            </div>
          </div>

          {/* Sign Convention Comparison & SVG Vector Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            {/* SVG Visual Vector representation */}
            <div className="bg-black/35 rounded-xl p-3 border border-rose-500/20 flex flex-col items-center gap-2">
 <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider text-center">Free-Fall Vector Representation</span>
              <svg viewBox="0 0 160 160" className="w-full max-w-[150px] mx-auto">
                {/* Max height marker */}
                <line x1="20" y1="20" x2="140" y2="20" stroke="#ffffff30" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="80" y="15" fill="#f87171" fontSize="7" textAnchor="middle" fontWeight="bold">Max Height (v = 0, a = -g)</text>
                
                {/* Throw Point */}
                <circle cx="50" cy="140" r="4" fill="#60a5fa" />
                {/* Fall Point */}
                <circle cx="110" cy="140" r="4" fill="#f87171" />
                
                {/* Path Curve representing trajectory */}
                <path d="M 50 140 Q 80 10 110 140" fill="none" stroke="#ffffff20" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Velocity vectors */}
                {/* Going Up */}
                <line x1="50" y1="120" x2="50" y2="85" stroke="#34d399" strokeWidth="1.5" />
                <polygon points="50,85 47,90 53,90" fill="#34d399" />
                <text x="42" y="105" fill="#34d399" fontSize="7" textAnchor="end">v &gt; 0</text>
                
                {/* Highest point ball */}
                <circle cx="80" cy="20" r="4" fill="#a78bfa" />
                
                {/* Going Down */}
                <line x1="110" y1="60" x2="110" y2="95" stroke="#f87171" strokeWidth="1.5" />
                <polygon points="110,95 107,90 113,90" fill="#f87171" />
                <text x="118" y="80" fill="#f87171" fontSize="7">v &lt; 0</text>
                
                {/* Gravity Acceleration vector */}
                <line x1="80" y1="50" x2="80" y2="85" stroke="#fbbf24" strokeWidth="2" />
                <polygon points="80,85 76,79 84,79" fill="#fbbf24" />
                <text x="84" y="65" fill="#fbbf24" fontSize="7" fontWeight="bold">a = -g (Always Downwards)</text>
                
                {/* Ground */}
                <line x1="15" y1="145" x2="145" y2="145" stroke="#6b7280" strokeWidth="1" />
              </svg>
 <span className="text-[10px] text-white/40 uppercase tracking-wider text-center">Figure 4.1: Kinematic vectors during free-fall cycle</span>
            </div>

            {/* Table comparing Sign Conventions */}
            <div className="bg-black/35 rounded-xl p-3 border border-rose-500/20 space-y-2">
 <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block text-center">Sign Convention Reference Matrix</span>
 <table className="w-full text-[11px] border-collapse border border-white/5 text-white/70">
                <thead>
                  <tr className="bg-white/5 text-white border-b border-white/10 text-left uppercase text-[9px] tracking-wider">
                    <th className="p-1.5 border-r border-white/5">Parameters</th>
                    <th className="p-1.5 border-r border-white/5">Upward Positive (Recommended)</th>
                    <th className="p-1.5">Downward Positive</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-1.5 border-r border-white/5 font-bold">Acc. Due to Gravity (g)</td>
                    <td className="p-1.5 border-r border-white/5 text-rose-400 font-bold">a = -g (always -9.8)</td>
                    <td className="p-1.5 text-emerald-400 font-bold">a = +g (always +9.8)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-1.5 border-r border-white/5 font-bold">Velocity going Up</td>
                    <td className="p-1.5 border-r border-white/5 text-emerald-400">Positive (+v)</td>
                    <td className="p-1.5 text-rose-400">Negative (-v)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-1.5 border-r border-white/5 font-bold">Velocity going Down</td>
                    <td className="p-1.5 border-r border-white/5 text-rose-400">Negative (-v)</td>
                    <td className="p-1.5 text-emerald-400">Positive (+v)</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 border-r border-white/5 font-bold">Displacement</td>
                    <td className="p-1.5 border-r border-white/5">Positive above release point</td>
                    <td className="p-1.5">Positive below release point</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-[10.5px] text-white/40 leading-relaxed font-sans pt-1">
                *Tip: Stick to <strong>Upward Positive</strong> for 95% of problems to avoid sign errors, especially for balls thrown upwards from high towers.
              </div>
            </div>
          </div>

          <MemoryBox>
            At maximum height: Instantaneous velocity <strong className="text-white">v = 0</strong>, but acceleration is still <strong className="text-white">a = &minus;g = &minus;9.8 m/s&sup2;</strong> downwards. It does NOT float or have zero acceleration!
          </MemoryBox>
        </div>

        {/* Concept 5: Constraint Motion Basics */}
        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">Concept 5</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Constraint Motion Basics</h3>
            </div>
            <FrequencyBadge stars={3} label="Pulley & String Relations" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            When bodies are connected by inextensible strings or rigid rods, their velocities and accelerations are constrained. Use the **length conservation rule** to find relations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-black/30 border border-sky-500/15 p-4 space-y-2">
              <div className="text-[13px] font-bold text-sky-400 uppercase">Simple Pulley Constraint</div>
              <p className="text-white/70 text-[13px] leading-relaxed">
                For two masses connected over a fixed pulley by a string of length <code className="font-mono bg-white/10 px-1 rounded">L = x<sub>1</sub> + x<sub>2</sub> + constant</code>:
              </p>
 <div className="text-sky-300 text-[13px] bg-white/5 p-2 rounded">
                Differentiating: v<sub>1</sub> + v<sub>2</sub> = 0 ⟹ v<sub>1</sub> = &minus;v<sub>2</sub><br />
                Differentiating again: a<sub>1</sub> + a<sub>2</sub> = 0 ⟹ a<sub>1</sub> = &minus;a<sub>2</sub>
              </div>
            </div>
            <div className="rounded-xl bg-black/30 border border-sky-500/15 p-4 space-y-2">
              <div className="text-[13px] font-bold text-sky-400 uppercase">Movable Pulley Rule</div>
              <p className="text-white/70 text-[13px] leading-relaxed">
                If the pulley itself moves with velocity <code className="font-mono bg-white/10 px-1 rounded">v<sub>p</sub></code>, and the connected ends move with <code className="font-mono bg-white/10 px-1 rounded">v<sub>1</sub></code> and <code className="font-mono bg-white/10 px-1 rounded">v<sub>2</sub></code>:
              </p>
 <div className="text-sky-300 text-[13px] bg-white/5 p-2 rounded text-center">
                v<sub>p</sub> = (v<sub>1</sub> + v<sub>2</sub>)/2<br />
                a<sub>p</sub> = (a<sub>1</sub> + a<sub>2</sub>)/2
              </div>
              <div className="text-white/50 text-[12px] leading-relaxed border-t border-white/5 pt-2">
                <strong>Worked Example:</strong> If end 1 moves down at 4 m/s (taken positive) and end 2 moves down at 2 m/s, the pulley moves down at (4 + 2)/2 = 3 m/s. If end 2 moves up at 2 m/s (-2 m/s), the pulley moves down at (4 - 2)/2 = 1 m/s.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Visual Diagrams & Graphs ──────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Eye className="w-5 h-5" />} label="Visual Diagrams & Graphs" color="sky" />
        <p className="text-white/50 text-[14.5px]">Every graph hides slope and area information. Memorize these — IAT asks 1–2 graph interpretation questions every year.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'x – t Graph',
              subtitle: 'Position-Time',
              graph: <XTGraph />,
              rows: [
                { label: 'Slope', value: 'Velocity (v)' },
                { label: 'Concave ∪', value: 'a > 0 (holds water)' },
                { label: 'Concave ∩', value: 'a < 0 (spills water)' },
                { label: 'Slope = 0', value: 'Body at rest' },
                { label: 'Kink (sharp)', value: 'Instant v change (Impulse / F = ∞)' },
              ],
              color: 'border-cyan-500/20',
              freq: 5
            },
            {
              title: 'v – t Graph',
              subtitle: 'Velocity-Time',
              graph: <VTGraph />,
              rows: [
                { label: 'Slope', value: 'Acceleration (a)' },
                { label: 'Area', value: 'Displacement' },
                { label: '|v|-t Area', value: 'Total Distance' },
                { label: 'Crosses axis', value: 'Direction reversal' },
                { label: 'Kink (sharp)', value: 'Instant a change (Jerk = ∞)' },
              ],
              color: 'border-emerald-500/20',
              freq: 5
            },
            {
              title: 'a – t Graph',
              subtitle: 'Acceleration-Time',
              graph: <ATGraph />,
              rows: [
                { label: 'Area', value: 'Change in velocity (Δv) = vf - vi ONLY' },
                { label: 'Area IS NOT', value: 'Absolute velocity or displacement' },
                { label: 'Flat line', value: 'Constant acceleration' },
              ],
              color: 'border-rose-500/20',
              freq: 3
            },
            {
              title: 'v – x Graph',
              subtitle: 'Velocity-Position',
              graph: <VXGraph />,
              rows: [
                { label: 'Slope', value: 'dv/dx' },
                { label: 'Subnormal', value: 'v(dv/dx) = Acceleration' },
                { label: 'Area (a-x)', value: '(vf² - vi²) / 2' },
              ],
              color: 'border-violet-500/20',
              freq: 4
            }
          ].map(panel => (
            <div key={panel.title} className={cn('rounded-2xl border bg-[#0A0C18] p-4 space-y-3', panel.color)}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-[14.5px]">{panel.title}</div>
                  <div className="text-white/40 text-[13px]">{panel.subtitle}</div>
                </div>
                <FrequencyBadge stars={panel.freq} label="" />
              </div>
              {panel.graph}
              <div className="space-y-1.5 border-t border-white/5 pt-3">
                {panel.rows.map(row => (
                  <div key={row.label} className="flex items-center justify-between text-[13px]">
 <span className="text-white/40">{row.label}</span>
                    <span className="text-white/75" dangerouslySetInnerHTML={{ __html: row.value }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Physical Situation Mockups / Diagrams */}
        <div className="space-y-3.5">
 <span className="text-[12px] font-bold text-sky-400 uppercase tracking-widest block text-center">⚙️ Physical Situation Visualizations</span>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Stroboscopic Position (Galileo's 1:3:5 Law) */}
            <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-4.5 space-y-3 flex flex-col items-center justify-between text-center">
 <span className="text-[12.5px] font-bold text-amber-300">1. Galileo's 1:3:5 Odd Spacing Law</span>
              <svg viewBox="0 0 240 100" className="w-full max-w-[200px]">
                {/* Horizontal scale */}
                <line x1="15" y1="75" x2="225" y2="75" stroke="#6b7280" strokeWidth="1.2" />
                {/* Tick marks and positions */}
                <circle cx="20" cy="75" r="4.5" fill="#a78bfa" />
                <text x="20" y="65" fill="#a78bfa" fontSize="7.5" textAnchor="middle" fontWeight="bold">t=0</text>
                
                <circle cx="40" cy="75" r="4.5" fill="#a78bfa" />
                <text x="40" y="65" fill="#a78bfa" fontSize="7.5" textAnchor="middle" fontWeight="bold">t=1s</text>
                
                <circle cx="100" cy="75" r="4.5" fill="#a78bfa" />
                <text x="100" y="65" fill="#a78bfa" fontSize="7.5" textAnchor="middle" fontWeight="bold">t=2s</text>
                
                <circle cx="200" cy="75" r="4.5" fill="#a78bfa" />
                <text x="200" y="65" fill="#a78bfa" fontSize="7.5" textAnchor="middle" fontWeight="bold">t=3s</text>
                
                {/* Spacings labels */}
                <path d="M 22 83 L 38 83" stroke="#cbd5e1" strokeWidth="0.8" markerEnd="url(#arrow-sub)" />
                <text x="30" y="93" fill="#cbd5e1" fontSize="7" textAnchor="middle">1x</text>
                
                <path d="M 42 83 L 98 83" stroke="#34d399" strokeWidth="0.8" markerEnd="url(#arrow-sub)" />
                <text x="70" y="93" fill="#34d399" fontSize="7" textAnchor="middle">3x</text>
                
                <path d="M 102 83 L 198 83" stroke="#60a5fa" strokeWidth="0.8" markerEnd="url(#arrow-sub)" />
                <text x="150" y="93" fill="#60a5fa" fontSize="7" textAnchor="middle">5x</text>
                
                <defs>
                  <marker id="arrow-sub" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff60" />
                  </marker>
                </defs>
              </svg>
              <p className="text-[12px] text-white/50 leading-relaxed font-sans">
                Positions of an object accelerating from rest. The distance covered in each interval scales as **1 : 3 : 5 : 7**.
              </p>
            </div>

            {/* 2. Reaction-Time Braking Diagram */}
            <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-4.5 space-y-3 flex flex-col items-center justify-between text-center">
 <span className="text-[12.5px] font-bold text-rose-300">2. Stopping Distance &amp; Reaction Time</span>
              <svg viewBox="0 0 240 100" className="w-full max-w-[200px]">
                {/* Road */}
                <line x1="10" y1="70" x2="230" y2="70" stroke="#6b7280" strokeWidth="1.5" />
                
                {/* Car at t=0 */}
                <rect x="15" y="45" width="22" height="12" rx="2" fill="#60a5fa" />
                <circle cx="21" cy="60" r="3" fill="#ffffff" />
                <circle cx="31" cy="60" r="3" fill="#ffffff" />
                <text x="26" y="38" fill="#60a5fa" fontSize="7.5" textAnchor="middle" fontWeight="bold">Hazard Seen</text>
                
                {/* Car at t=t_reaction */}
                <rect x="95" y="45" width="22" height="12" rx="2" fill="#fbbf24" opacity="0.6" />
                <circle cx="101" cy="60" r="3" fill="#ffffff" opacity="0.6" />
                <circle cx="111" cy="60" r="3" fill="#ffffff" opacity="0.6" />
                <text x="106" y="38" fill="#fbbf24" fontSize="7.5" textAnchor="middle" fontWeight="bold">Brakes Applied</text>
                
                {/* Car Stopped */}
                <rect x="195" y="45" width="22" height="12" rx="2" fill="#ef4444" />
                <circle cx="201" cy="60" r="3" fill="#ffffff" />
                <circle cx="211" cy="60" r="3" fill="#ffffff" />
                <text x="206" y="38" fill="#f87171" fontSize="7.5" textAnchor="middle" fontWeight="bold">v = 0 (Stop)</text>
                
                {/* Brackets */}
                <path d="M 26 78 L 26 83 L 106 83 L 106 78" fill="none" stroke="#fbbf24" strokeWidth="0.8" />
                <text x="66" y="93" fill="#fbbf24" fontSize="7.5" textAnchor="middle">d_reaction = u·t_r</text>
                
                <path d="M 106 78 L 106 83 L 206 83 L 206 78" fill="none" stroke="#ef4444" strokeWidth="0.8" />
                <text x="156" y="93" fill="#f87171" fontSize="7.5" textAnchor="middle">d_braking = u²/2a</text>
              </svg>
              <p className="text-[12px] text-white/50 leading-relaxed font-sans">
                Stopping distance is split into **reaction delay** (constant speed) and **braking phase** (uniform deceleration).
              </p>
            </div>

            {/* 3. Overtaking Train Scenario */}
            <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-4.5 space-y-3 flex flex-col items-center justify-between text-center">
 <span className="text-[12.5px] font-bold text-emerald-300">3. Relative Chase / Overtaking Scenario</span>
              <svg viewBox="0 0 240 100" className="w-full max-w-[200px]">
                {/* Train A Track */}
                <line x1="10" y1="40" x2="230" y2="40" stroke="#4b5563" strokeWidth="1.2" strokeDasharray="3 2" />
                {/* Train B Track */}
                <line x1="10" y1="70" x2="230" y2="70" stroke="#4b5563" strokeWidth="1.2" strokeDasharray="3 2" />
                
                {/* Train A (Chaser) */}
                <rect x="20" y="27" width="55" height="10" rx="1.5" fill="#34d399" />
                <text x="47" y="23" fill="#34d399" fontSize="7.5" textAnchor="middle" fontWeight="bold">Train A (v_A)</text>
                
                {/* Train B (Chasee) */}
                <rect x="130" y="57" width="40" height="10" rx="1.5" fill="#60a5fa" />
                <text x="150" y="53" fill="#60a5fa" fontSize="7.5" textAnchor="middle" fontWeight="bold">Train B (v_B)</text>
                
                {/* Separation indicator */}
                <line x1="75" y1="40" x2="130" y2="40" stroke="#a78bfa" strokeWidth="1" />
                <polygon points="75,40 80,37 80,43" fill="#a78bfa" />
                <polygon points="130,40 125,37 125,43" fill="#a78bfa" />
                <text x="102" y="34" fill="#a78bfa" fontSize="7.5" textAnchor="middle">Separation (d)</text>
                
                {/* Ground Frame relative hook */}
                <text x="120" y="88" fill="#a78bfa" fontSize="7.5" textAnchor="middle" fontWeight="bold" fontFamily="monospace">To catch: x_rel = d + L_A + L_B</text>
              </svg>
              <p className="text-[12px] text-white/50 leading-relaxed font-sans">
                Relative coordinate reduction simplifies train-overtaking: **relative distance = relative velocity × time**.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: Key Formulas ───────────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Zap className="w-5 h-5" />} label="Key Formulas" color="amber" />

        {/* Consolidated Master Formula Table */}
        <div className="bg-[#0A0C18] border border-amber-500/25 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider font-mono">Consolidated Master Formula Reference</h4>
          </div>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] border-collapse border border-white/5 text-white/70">
              <thead>
                <tr className="bg-white/5 text-white border-b border-white/10 text-left uppercase text-[9.5px] tracking-wider">
                  <th className="p-2 border-r border-white/5">Equation / Formula</th>
                  <th className="p-2 border-r border-white/5">Variable Definitions</th>
                  <th className="p-2 border-r border-white/5">Usage Condition</th>
                  <th className="p-2">Key Trap to Avoid</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                  <td className="p-2 border-r border-white/5 text-cyan-300 font-bold font-mono">v = dx / dt<br />a = dv / dt</td>
                  <td className="p-2 border-r border-white/5">x = position, v = velocity,<br />a = acceleration, t = time</td>
                  <td className="p-2 border-r border-white/5 text-emerald-400 font-bold">Universal (Any motion)</td>
                  <td className="p-2 font-sans">Do not treat derivative as a simple division (e.g. v &ne; x/t unless v is constant).</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                  <td className="p-2 border-r border-white/5 text-cyan-300 font-bold font-mono">a = v (dv / dx)</td>
                  <td className="p-2 border-r border-white/5">v = velocity, x = position</td>
                  <td className="p-2 border-r border-white/5 text-emerald-400 font-bold">When a is a function of position: a = f(x)</td>
                  <td className="p-2 font-sans">Using dv/dt when acceleration is given as f(x) will lead to unsolvable integrals.</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                  <td className="p-2 border-r border-white/5 text-cyan-300 font-bold font-mono">
                    v = u + at<br />
                    s = ut + &frac12;at&sup2;<br />
                    v&sup2; = u&sup2; + 2as
                  </td>
                  <td className="p-2 border-r border-white/5">u = initial velocity, v = final,<br />a = constant acceleration, t = time</td>
                  <td className="p-2 border-r border-white/5 text-amber-400 font-bold">Constant acceleration ONLY (SUVAT)</td>
                  <td className="p-2 font-sans">Applying these to variable acceleration like <code className="font-mono bg-white/10 px-1 rounded">a = 3t²</code> is a guaranteed zero-score mistake.</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                  <td className="p-2 border-r border-white/5 text-cyan-300 font-bold font-mono">s<sub>n</sub> = u + &frac12;a(2n &minus; 1)</td>
                  <td className="p-2 border-r border-white/5">s<sub>n</sub> = distance covered strictly in the n-th second</td>
                  <td className="p-2 border-r border-white/5 text-amber-400 font-bold">Constant acceleration ONLY</td>
                  <td className="p-2 font-sans">Dimensionally, LHS represents length per unit time (speed), even though it is written as displacement.</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                  <td className="p-2 border-r border-white/5 text-cyan-300 font-bold font-mono">v<sub>mid</sub> = &radic;[(v<sub>1</sub>&sup2; + v<sub>2</sub>&sup2;)/2]</td>
                  <td className="p-2 border-r border-white/5">v<sub>1</sub> = entry velocity, v<sub>2</sub> = exit velocity</td>
                  <td className="p-2 border-r border-white/5 text-amber-400 font-bold">Midpoint of distance (const a)</td>
                  <td className="p-2 font-sans">This is NOT the velocity at the midpoint of time (which is simply (v<sub>1</sub> + v<sub>2</sub>)/2).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="p-2 border-r border-white/5 text-cyan-300 font-bold font-mono">x = u&sup2; / 2a</td>
                  <td className="p-2 border-r border-white/5">u = speed, a = deceleration magnitude</td>
                  <td className="p-2 border-r border-white/5 text-rose-400 font-bold">Stopping Distance</td>
                  <td className="p-2 font-sans">Distance scales with the square of speed. Doubling initial speed quadruples the stopping distance!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculus Triangle cards */}
        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">Calculus Definitions (Universal)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormulaCard formula="v = dx/dt" use_when="Always — linking position to velocity" freq_stars={5} freq_label="Core" color="violet" copy_text="v = dx/dt" />
            <FormulaCard formula="a = dv/dt" use_when="When acceleration varies with time" freq_stars={5} freq_label="Core" color="violet" copy_text="a = dv/dt" />
            <FormulaCard formula="a = v·(dv/dx)" use_when="When a is a function of position x" freq_stars={5} freq_label="★ IAT Favourite" color="rose" copy_text="a = v·(dv/dx)" />
          </div>
        </div>

        {/* SUVAT equations */}
        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">SUVAT Equations (Constant Acceleration ONLY)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormulaCard formula="v = u + at" use_when="Find final velocity if time is known" freq_stars={5} freq_label="Every Exam" color="cyan" copy_text="v = u + at" />
            <FormulaCard formula="s = ut + ½at²" use_when="Find displacement from time, no final velocity" freq_stars={5} freq_label="Every Exam" color="cyan" copy_text="s = ut + (1/2)at²" />
            <FormulaCard formula="v² = u² + 2as" use_when="Find velocity from displacement (no time!)" freq_stars={5} freq_label="Every Exam" color="cyan" copy_text="v² = u² + 2as" />
            <FormulaCard formula={"sₙ = u + (a/2)(2n–1)"} use_when="Distance traveled strictly in the nth second" freq_stars={4} freq_label="Tricky IAT Question" color="amber" copy_text="sn = u + (a/2)(2n-1)" />
          </div>
          <MemoryBox>
            <strong>SUVAT Collapse Warning:</strong> If a = f(t) or a = f(x) (variable acceleration), these 4 equations are INVALID. Switch to calculus integration immediately.
          </MemoryBox>
        </div>
      </div>

      {/* ── SECTION 4: Shortcuts & Memory Tricks ─────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Brain className="w-5 h-5" />} label="Shortcuts & Memory Tricks" color="emerald" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Mid-Point Velocity',
              emoji: '↔️',
              formula: 'v<sub>mid</sub> = &radic;[(v<sub>1</sub><sup>2</sup> + v<sub>2</sub><sup>2</sup>) / 2]',
              note: 'Velocity at the midpoint of DISTANCE (not time)',
              color: 'border-cyan-500/20 bg-cyan-500/5'
            },
            {
              title: 'Average Speed Tricks',
              emoji: '⚡',
              formula: 'Equal distance: 2v<sub>1</sub>v<sub>2</sub>/(v<sub>1</sub>+v<sub>2</sub>)<br />Equal time: (v<sub>1</sub>+v<sub>2</sub>)/2',
              note: 'Harmonic Mean vs Arithmetic Mean. Don\'t mix them up!',
              color: 'border-violet-500/20 bg-violet-500/5'
            },
            {
              title: 'Stopping Distance',
              emoji: '🚗',
              formula: 'x = u<sup>2</sup> / 2a',
              note: 'Speed ×2 → Distance ×4. Speed ×3 → Distance ×9!',
              color: 'border-rose-500/20 bg-rose-500/5'
            },
            {
              title: "Galileo's Law of Odd Numbers",
              emoji: '🪨',
              formula: '1 : 3 : 5 : 7 : 9 ...',
              note: 'Distances in successive equal time intervals from rest',
              color: 'border-amber-500/20 bg-amber-500/5'
            },
          ].map(item => (
            <div key={item.title} className={cn('rounded-2xl border p-4 space-y-3', item.color)}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-white font-bold text-[14.5px]">{item.title}</span>
              </div>
              <div 
 className="text-white/90 text-[14.5px] whitespace-pre-line bg-black/20 rounded-lg px-3 py-2"
                dangerouslySetInnerHTML={{ __html: item.formula }}
              />
              <p className="text-white/55 text-[13px]">{item.note}</p>
            </div>
          ))}
        </div>

        {/* Must Memorize Box */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-900/10 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h4 className="text-amber-300 font-bold text-[14.5px]">Must Memorize — Don't Derive in Exam</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Galileo\'s 1:3:5 Law', 'Stopping Distance x=u²/2a', 'Pulley Constraint a₁=-a₂', 'SUVAT Integrals'].map(item => (
              <div key={item} className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-amber-200 text-[13px] text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 5: Common Mistakes ───────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<AlertTriangle className="w-5 h-5" />} label="Common Traps & Mistakes" color="rose" />
        <div className="space-y-3">
          <TrapCard
            title="Trap 1: The Calculus Distance Trap"
            trap="Given v(t) = 2t − 4, asked for distance from t=0 to t=4. Students integrate directly and get 0. This calculates displacement, not distance!"
            fix="Find where v=0 (at t=2). Split: |∫₀²(2t-4)dt| + |∫₂⁴(2t-4)dt| = |-4| + |4| = 8 m. Always split at sign changes of v."
          />
          <TrapCard
            title="Trap 2: Using SUVAT for Variable Acceleration"
            trap="If a = 3t² or a = -kx, blindly applying v = u+at or s = ut+½at² gives a completely wrong answer."
            fix="Check if a is constant. If a = f(t) → integrate a to get v. If a = f(x) → use a = v(dv/dx) and integrate."
          />
          <TrapCard
            title="Trap 3: Highest Point — a = 0 Misconception"
            trap="At the highest point of a thrown ball, velocity = 0. Many students think acceleration is also 0 here."
            fix="At the highest point: v=0 but a = g downward. Gravity never switches off. The ball is momentarily at rest, not floating."
          />
          <TrapCard
            title="Trap 4: Impossible x-t Graphs"
            trap="An x-t graph that doubles back on itself (time axis) implies time going backward — physically impossible."
            fix="Legitimate graphs never curve back along the time axis. Sharp corners imply infinite acceleration (also impossible in reality)."
          />
          <TrapCard
            title="Trap 5: Distance vs. Displacement in v-t Area"
            trap="The area under a v-t graph when velocity changes sign gives displacement (signed area), not distance."
            fix="For total distance, flip all negative-area portions above the axis (use the |v|-t graph) and add all areas."
          />
        </div>
      </div>

      {/* ── SECTION 6: Question Recognition ─────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Target className="w-5 h-5" />} label="Question Recognition Patterns" color="violet" />
        <p className="text-white/50 text-[14.5px]">Train your brain to pattern-match. Spot the keywords → instantly know the method.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RecognitionCard
            trigger="acceleration depends on position"
            thought="a = v·(dv/dx)"
            action="Write a = f(x), substitute into v·dv/dx = f(x), then integrate with limits."
            color="violet"
          />
          <RecognitionCard
            trigger="variable / non-uniform acceleration"
            thought="Integration, NOT SUVAT"
            action="SUVAT equations are invalid. Use ∫a dt = v + C or ∫v dt = x + C."
            color="violet"
          />
          <RecognitionCard
            trigger="total distance covered in T seconds"
            thought="Check for turning points: v = 0 ?"
            action="Find t where v=0. If 0 < t < T, split the calculation at that point."
            color="cyan"
          />
          <RecognitionCard
            trigger="train A overtakes train B"
            thought="Relative velocity framework"
            action="v<sub>rel</sub> = v<sub>A</sub> &minus; v<sub>B</sub>, a<sub>rel</sub> = a<sub>A</sub> &minus; a<sub>B</sub>. Distance = sum of train lengths. Use SUVAT on relative motion."
            color="cyan"
          />
          <RecognitionCard
            trigger="slope of v-t graph"
            thought="= Acceleration"
            action="Positive slope = positive acceleration. Negative slope = deceleration. Zero slope = uniform velocity."
            color="amber"
          />
          <RecognitionCard
            trigger="area under v-t graph"
            thought="= Displacement"
            action="For distance, take absolute value of each section. Sections where v<0 contribute negative area to displacement but positive to distance."
            color="amber"
          />
        </div>
      </div>

      {/* ── SECTION 7: Solved IAT-style Examples ─────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<TrendingUp className="w-5 h-5" />} label="Solved IAT-style Examples" color="indigo" />

        <div className="space-y-4">
          {[
            {
              title: 'Finding Max/Min Velocity using Calculus',
              problem: 'Given position x = t³ − 6t² + 9t (m). When is velocity minimum?',
              steps: [
                'Find velocity: v = dx/dt = 3t² − 12t + 9',
                'To minimize v, set its derivative (acceleration) = 0',
                'a = dv/dt = 6t − 12 = 0 ⟹ t = 2 s',
                'Verify: v(2) = 12 − 24 + 9 = −3 m/s (minimum velocity)',
              ],
              insight: 'Minimum velocity ≠ zero velocity. A particle can have its most negative velocity at some finite time.',
              color: 'border-indigo-500/20 bg-indigo-500/5'
            },
            {
              title: 'Reaction Time + Braking Problem (Numerical)',
              problem: 'A driver traveling at u = 20 m/s sees a hazard. Reaction time t<sub>r</sub> = 0.5 s, after which they decelerate at a = 4 m/s². Find total stopping distance.',
              steps: [
                'Reaction phase (constant speed): d<sub>reaction</sub> = u &middot; t<sub>r</sub> = 20 m/s &middot; 0.5 s = 10 m.',
                'Braking phase (deceleration from 20 m/s to 0): Use v&sup2; = u&sup2; &minus; 2as ⟹ 0 = 20&sup2; &minus; 2(4)d<sub>braking</sub>.',
                'Solve for braking distance: d<sub>braking</sub> = 400 / 8 = 50 m.',
                'Total stopping distance = d<sub>reaction</sub> + d<sub>braking</sub> = 10 m + 50 m = 60 m.',
              ],
              insight: 'Stopping distance depends quadratically on speed: double the initial speed, and the braking portion quadruples.',
              color: 'border-emerald-500/20 bg-emerald-500/5'
            },
            {
              title: 'Integration: Acceleration is a = f(x)',
              problem: 'A particle moves with position-dependent acceleration a = 3x² (m/s²). If its velocity is v = 2 m/s at x = 0, find its velocity at x = 2 m.',
              steps: [
                'Since acceleration depends on x, use a = v·dv/dx = 3x².',
                'Separate variables: v dv = 3x² dx.',
                'Integrate both sides using initial conditions as lower limits: ∫₂ᵛ v dv = ∫₀² 3x² dx.',
                'Evaluate the integrals: [v²/2]₂ᵛ = [x³]₀² ⟹ v²/2 − 2²/2 = 2³ − 0³.',
                'v²/2 − 2 = 8 ⟹ v²/2 = 10 ⟹ v² = 20 ⟹ v = √20 ≈ 4.47 m/s.',
              ],
              insight: 'The limits represent coordinates: lower limits match the initial state, upper limits match the final state. Never forget to subtract the lower limit term (2²/2)!',
              color: 'border-violet-500/20 bg-violet-500/5'
            },
            {
              title: 'Integration: Acceleration is a = f(t)',
              problem: 'A particle starts from x = 1 m with velocity v = 2 m/s at t = 0. Its acceleration is a(t) = 3t² − 2t. Find velocity and position at t = 2 s.',
              steps: [
                'Integrate acceleration to get velocity: v(t) = ∫(3t² − 2t) dt = t³ − t² + C₁.',
                'Apply initial condition v(0) = 2 ⟹ C₁ = 2. So, v(t) = t³ − t² + 2.',
                'At t = 2 s: v(2) = 2³ − 2² + 2 = 8 − 4 + 2 = 6 m/s.',
                'Integrate velocity to get position: x(t) = ∫(t³ − t² + 2) dt = t⁴/4 − t³/3 + 2t + C₂.',
                'Apply initial condition x(0) = 1 ⟹ C₂ = 1. So, x(t) = t⁴/4 − t³/3 + 2t + 1.',
                'At t = 2 s: x(2) = 2⁴/4 − 2³/3 + 2(2) + 1 = 4 − 2.67 + 4 + 1 = 6.33 m.',
              ],
              insight: 'You must resolve the integration constants C₁ and C₂ sequentially using the initial conditions at t = 0.',
              color: 'border-cyan-500/20 bg-cyan-500/5'
            },
            {
              title: '2-Body Relative Acceleration Chase',
              problem: 'A thief starts 100 m ahead of a police car from rest with acceleration a<sub>t</sub> = 2 m/s². The police car starts with initial velocity u<sub>p</sub> = 5 m/s and acceleration a<sub>p</sub> = 3 m/s². When and where does the police car catch the thief?',
              steps: [
                'Identify initial conditions: x<sub>t</sub>(0) = 100 m, u<sub>t</sub> = 0, a<sub>t</sub> = 2 m/s². x<sub>p</sub>(0) = 0, u<sub>p</sub> = 5 m/s, a<sub>p</sub> = 3 m/s².',
                'Work in the relative frame (freeze the police car): relative position s<sub>rel</sub> = 100 m.',
                'Relative initial velocity: u<sub>rel</sub> = u<sub>t</sub> &minus; u<sub>p</sub> = 0 &minus; 5 = &minus;5 m/s (thief moving backward relative to police).',
                'Relative acceleration: a<sub>rel</sub> = a<sub>t</sub> &minus; a<sub>p</sub> = 2 &minus; 3 = &minus;1 m/s².',
                'Set relative displacement equation: s<sub>rel</sub>(t) = s<sub>rel</sub>(0) + u<sub>rel</sub>&middot;t + &frac12;&middot;a<sub>rel</sub>&middot;t&sup2; = 0 ⟹ 100 &minus; 5t &minus; &frac12;(1)t&sup2; = 0.',
                'Rearrange into a standard quadratic: t&sup2; + 10t &minus; 200 = 0 ⟹ (t &minus; 10)(t + 20) = 0 ⟹ t = 10 s (positive root).',
                'Find catch position in the ground frame using police kinematics: x<sub>p</sub>(10) = 5(10) + &frac12;(3)(10&sup2;) = 50 + 150 = 200 m.',
              ],
              insight: 'Relative velocity is −5 m/s because the police is approaching the thief. Setting up the signs of relative variables correctly is crucial for finding the correct catch time.',
              color: 'border-amber-500/20 bg-amber-500/5'
            }
          ].map((ex) => {
            return (
              <div key={ex.title} className={cn('rounded-2xl border p-5 space-y-4 bg-[#0A0C18]', ex.color)}>
                <div className="border-b border-white/5 pb-2.5">
                  <h4 className="text-white font-bold text-[14.5px] text-left">{ex.title}</h4>
                </div>
                <p className="text-white/70 text-[14.5px] font-mono bg-black/20 rounded-lg px-3 py-2" dangerouslySetInnerHTML={{ __html: ex.problem }} />
                <div className="space-y-2">
                  {ex.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
 <span className="text-[12px] font-bold text-white/30 bg-white/5 rounded px-1.5 py-0.5 shrink-0 mt-0.5">Step {i + 1}</span>
                      <p className="text-white/75 text-[14.5px] leading-relaxed" dangerouslySetInnerHTML={{ __html: step }} />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2.5 flex gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-amber-200 text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: ex.insight }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SECTION 8: IAT Exam Focus ────────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Activity className="w-5 h-5" />} label="IAT Exam Focus" color="amber" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Calculus > Algebra',
              desc: 'IAT strongly prefers calculus-based problems. Always verify if acceleration is constant before using SUVAT.',
              stars: 5,
              color: 'border-violet-500/20 bg-violet-500/5'
            },
            {
              title: 'Turning Points',
              desc: 'If a question asks "total distance in T seconds," 90% chance there\'s a turning point hidden inside. Always check v = 0.',
              stars: 5,
              color: 'border-rose-500/20 bg-rose-500/5'
            },
            {
              title: 'Graph Reading',
              desc: 'Know what slope and area mean for ALL 4 graphs. IAT loves asking about graphs that look unusual or have multiple segments.',
              stars: 4,
              color: 'border-cyan-500/20 bg-cyan-500/5'
            },
            {
              title: 'Relative Velocity',
              desc: 'Overtaking/chase problems appear often. Set up a relative frame, apply SUVAT on relative motion — done in 30 seconds.',
              stars: 4,
              color: 'border-emerald-500/20 bg-emerald-500/5'
            },
          ].map(item => (
            <div key={item.title} className={cn('rounded-2xl border p-4 space-y-2', item.color)}>
              <div className="flex items-center justify-between">
                <h4 className="text-white font-bold text-[14.5px]">{item.title}</h4>
                <FrequencyBadge stars={item.stars} label="" />
              </div>
              <p className="text-white/60 text-[13px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 9: 1-Minute Revision Sheet ───────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader icon={<RefreshCw className="w-5 h-5" />} label="1-Minute Revision Sheet" color="emerald" />
        <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-5 space-y-4">
          <p className="text-white/50 text-[13px]">Check off each item you've mastered. Perfect to run through before a mock test.</p>
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
              <span className="text-emerald-400 text-[13px] font-bold">🎉 Ready for the quiz!</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
