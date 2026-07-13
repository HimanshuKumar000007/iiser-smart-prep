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
  formula, use_when, freq_stars, freq_label, color = 'violet', copy_text
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

function ProjectileGraph() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Projectile Trajectory graph">
      {[40, 80, 120, 160].map(y => (
        <line key={y} x1="30" y1={y} x2="250" y2={y} stroke="#ffffff0a" strokeWidth="1" />
      ))}
      {[70, 110, 150, 190, 230].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2="165" stroke="#ffffff0a" strokeWidth="1" />
      ))}
      <line x1="30" y1="160" x2="250" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <line x1="30" y1="20" x2="30" y2="160" stroke="#ffffff50" strokeWidth="1.5" />
      <text x="245" y="175" fill="#ffffff60" fontSize="11" fontFamily="monospace">x</text>
      <text x="18" y="24" fill="#ffffff60" fontSize="11" fontFamily="monospace">y</text>
      {/* Parabolic path */}
      <path d="M 30 160 Q 135 20 240 160" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      {/* Velocity vector at peak */}
      <line x1="135" y1="90" x2="185" y2="90" stroke="#f59e0b" strokeWidth="1.5" />
      <polygon points="185,90 178,86 178,94" fill="#f59e0b" />
      {/* Labels */}
      <text x="110" y="80" fill="#f59e0b" fontSize="9" fontFamily="monospace">v<sub>peak</sub> = u·cosθ</text>
      <text x="75" y="130" fill="#a78bfa" fontSize="9" fontFamily="monospace">H<sub>max</sub> = u²·sin²θ/2g</text>
    </svg>
  );
}

function RiverBoatDiagram() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="River Boat crossing vectors">
      {/* River banks */}
      <line x1="30" y1="30" x2="230" y2="30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="30" y1="150" x2="230" y2="150" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
      <text x="40" y="22" fill="#38bdf8" fontSize="10" fontFamily="monospace">Bank B</text>
      <text x="40" y="165" fill="#38bdf8" fontSize="10" fontFamily="monospace">Bank A</text>
      {/* Flow vector v_r */}
      <line x1="40" y1="90" x2="100" y2="90" stroke="#06b6d4" strokeWidth="2" />
      <polygon points="100,90 92,86 92,94" fill="#06b6d4" />
      <text x="60" y="82" fill="#06b6d4" fontSize="9" fontFamily="monospace">v<sub>river</sub></text>
      {/* Boat headed at angle θ */}
      <line x1="130" y1="150" x2="90" y2="50" stroke="#ec4899" strokeWidth="2" />
      <polygon points="90,50 90,58 97,52" fill="#ec4899" />
      <text x="65" y="45" fill="#ec4899" fontSize="9" fontFamily="monospace">v<sub>boat</sub>/river</text>
      {/* Resultant velocity vector */}
      <line x1="130" y1="150" x2="130" y2="50" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="135" y="100" fill="#22c55e" fontSize="9" fontFamily="monospace">v<sub>resultant</sub></text>
    </svg>
  );
}

function CircularMotionDiagram() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Circular motion vectors">
      <circle cx="130" cy="90" r="50" fill="none" stroke="#ffffff1a" strokeWidth="1.5" />
      {/* Position dot */}
      <circle cx="180" cy="90" r="4" fill="#34d399" />
      {/* Centripetal acceleration vector */}
      <line x1="180" y1="90" x2="145" y2="90" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="145,90 152,86 152,94" fill="#f43f5e" />
      <text x="142" y="82" fill="#f43f5e" fontSize="9" fontFamily="monospace">a<sub>c</sub></text>
      {/* Velocity vector */}
      <line x1="180" y1="90" x2="180" y2="40" stroke="#60a5fa" strokeWidth="2" />
      <polygon points="180,40 176,47 184,47" fill="#60a5fa" />
      <text x="185" y="55" fill="#60a5fa" fontSize="9" fontFamily="monospace">v<sub>tangent</sub></text>
    </svg>
  );
}

function NonUniformCircularMotionDiagram() {
  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Non-Uniform Circular motion vectors">
      <circle cx="130" cy="90" r="50" fill="none" stroke="#ffffff1a" strokeWidth="1.5" />
      {/* Position dot */}
      <circle cx="180" cy="90" r="4" fill="#a78bfa" />
      {/* Centripetal acceleration vector (inwards) */}
      <line x1="180" y1="90" x2="140" y2="90" stroke="#f43f5e" strokeWidth="2" />
      <polygon points="140,90 147,86 147,94" fill="#f43f5e" />
      <text x="145" y="82" fill="#f43f5e" fontSize="9" fontFamily="monospace">a<sub>c</sub></text>
      {/* Tangential acceleration vector */}
      <line x1="180" y1="90" x2="180" y2="50" stroke="#34d399" strokeWidth="2" />
      <polygon points="180,50 176,57 184,57" fill="#34d399" />
      <text x="185" y="47" fill="#34d399" fontSize="9" fontFamily="monospace">a<sub>t</sub></text>
      {/* Velocity vector (tangent) */}
      <line x1="180" y1="90" x2="180" y2="30" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="2 1" />
      <text x="185" y="32" fill="#60a5fa" fontSize="8" fontFamily="monospace">v</text>
      {/* Net Acceleration vector */}
      <line x1="180" y1="90" x2="140" y2="50" stroke="#fbbf24" strokeWidth="2.5" />
      <polygon points="140,50 148,51 144,57" fill="#fbbf24" />
      <text x="135" y="45" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">a<sub>net</sub></text>
      {/* Dashed lines to form rect */}
      <line x1="140" y1="90" x2="140" y2="50" stroke="#ffffff20" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="180" y1="50" x2="140" y2="50" stroke="#ffffff20" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function MotionPlaneLessonDetail({ isCompleted, onNavigate }: Props) {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const toggleCheck = (i: number) => setChecklist(p => ({ ...p, [i]: !p[i] }));

  const revisionItems = [
    'Scalar = magnitude only (mass, speed, time); Vector = magnitude + direction (displacement, velocity, force)',
    'Vector subtraction: A − B = A + (−B); |A−B| = √(A²+B²−2AB·cosθ)',
    'Analytical addition: Rₓ = Aₓ+Bₓ, Rᵧ = Aᵧ+Bᵧ then |R|=√(Rₓ²+Rᵧ²)',
    'General 2D: v⃗=v⃗₀+a⃗t; r⃗=r⃗₀+v⃗₀t+½a⃗t² (components are independent)',
    'Projectile: T=2u·sinθ/g, H=u²sin²θ/2g, R=u²sin(2θ)/g',
    'Trajectory: y=x·tanθ−gx²/(2u²cos²θ) — parabola in x-y plane',
    'Inclined plane: T=2u·sin(θ−β)/(g·cosβ), optimal θ=45°±β/2',
    'UCM: ω=dθ/dt=v/r=2πf=2π/T; period T=2π/ω',
    'Centripetal acceleration: aₙ=v²/r=ω²r (derived from geometry of Δv⃗)',
    '2D Relative velocity: v⃗ᵣєₗ = v⃗_A − v⃗_B (resolve into components)',
    'River: shortest time → head perpendicular; shortest path → sinθ=v_r/v_b',
    'UCM acceleration magnitude constant, direction always changing (radially inward)',
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

      {/* ── SECTION 0: Chapter Overview ─────────────────────────────────────── */}
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
              Motion in a Plane
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
                <span>20 min</span>
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
        </div>
      </div>

      {/* What You'll Learn box */}
      <div className="bg-[#0B0D19] border border-white/5 rounded-2xl p-5 space-y-4">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" /> WHAT YOU&apos;LL LEARN
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-white/65">
          {[
            'Vector additions, dot products, and component resolution',
            'Full formulas for projectile range, flight time, and peak height',
            'Projectile projection on inclined planes up and down',
            '2D Relative velocity river-boat crossing and rain-umbrella directions',
            'Centripetal acceleration and variable acceleration vectors in UCM',
            'High-yield traps: Peak velocity, river drift, and UCM vectors',
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
        <SectionHeader icon={<BookOpen className="w-5 h-5" />} label="Core Concepts" color="violet" />

        {/* Concept 1: Vectors & Scalars */}
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">Concept 1</span>
            <h3 className="text-white font-display font-bold text-[14.5px]">Scalars &amp; Vectors — Definitions &amp; Operations</h3>
          </div>

          {/* Definitions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-violet-500/5 border border-violet-500/20 p-4 space-y-2">
              <span className="text-[12px] font-black text-violet-400 uppercase tracking-wider block">Scalar Quantity</span>
              <p className="text-white/70 text-[13px] leading-relaxed">A physical quantity that has <strong>magnitude only</strong>. Adding two scalars follows ordinary arithmetic.</p>
              <div className="text-[12px] text-white/45 leading-relaxed">
                <strong className="text-violet-300">Examples:</strong> mass (kg), distance (m), speed (m/s), time (s), temperature (K), energy (J), density (kg/m&sup3;), electric charge (C)
              </div>
            </div>
            <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/20 p-4 space-y-2">
              <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block">Vector Quantity</span>
              <p className="text-white/70 text-[13px] leading-relaxed">A physical quantity that has <strong>both magnitude and direction</strong>. Must be added using the laws of vector addition.</p>
              <div className="text-[12px] text-white/45 leading-relaxed">
                <strong className="text-cyan-300">Examples:</strong> displacement (m), velocity (m/s), acceleration (m/s&sup2;), force (N), momentum (kg&middot;m/s), electric field (N/C), torque (N&middot;m)
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase text-[10px] font-bold tracking-widest bg-white/[0.01]">
                  <th className="py-2.5 px-3">Property</th>
                  <th className="py-2.5 px-3 text-violet-400">Scalar</th>
                  <th className="py-2.5 px-3 text-cyan-400">Vector</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                {[
                  ['Direction', 'No direction', 'Has specific direction'],
                  ['Addition rule', 'Ordinary algebra', 'Triangle / Parallelogram law'],
                  ['Subtraction', 'A − B (simple)', 'A + (−B): reverse B then add'],
                  ['Representation', 'Single number', 'Arrow or bold symbol (A or ⇒A)'],
                  ['Multiplication by λ', '|λ|A (sign changes value)', '|λ||A|; reverses direction if λ < 0'],
                  ['Dot product', 'N/A', 'A·B = |A||B|cosθ (gives scalar)'],
                  ['Cross product', 'N/A', 'A×B = |A||B|sinθ n̂ (gives vector)'],
                ].map(([prop, sc, vc], i) => (
                  <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-white/60">{prop}</td>
                    <td className="py-2.5 px-3 text-violet-300/80">{sc}</td>
                    <td className="py-2.5 px-3 text-cyan-300/80">{vc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Properties of vector addition */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-[13px]">
            <span className="text-[12px] font-black text-amber-400 uppercase tracking-wider block">Properties of Vector Addition</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/65 leading-relaxed">
              <div><strong className="text-white">Commutative:</strong> A + B = B + A</div>
              <div><strong className="text-white">Associative:</strong> (A + B) + C = A + (B + C)</div>
              <div><strong className="text-white">Identity:</strong> A + 0 = A (null vector)</div>
              <div><strong className="text-white">Triangle Inequality:</strong> |A + B| ≤ |A| + |B|</div>
            </div>
          </div>

          {/* Vector Subtraction */}
          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
            <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider block">Vector Subtraction (Graphical Method)</span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              <strong>A − B = A + (−B).</strong> To subtract B from A graphically:
            </p>
            <ol className="list-decimal list-inside text-white/60 text-[13px] space-y-1 leading-relaxed">
              <li>Draw vector <strong>A</strong> from origin O.</li>
              <li>Draw <strong>−B</strong> (reverse direction of B, same magnitude) from the tip of A.</li>
              <li>The resultant from O to the final tip is <strong>A − B</strong>.</li>
              <li><em>Magnitude:</em> |A − B| = &radic;(A&sup2; + B&sup2; − 2AB&middot;cos&theta;)</li>
            </ol>
 <div className="mt-2 bg-black/30 rounded-lg p-2.5 text-[12px] text-rose-300 text-center">
              Displacement = r₂ − r₁ = Δr (vector subtraction of position vectors)
            </div>
          </div>

          {/* Position & Displacement Vectors */}
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
            <span className="text-[12px] font-black text-emerald-400 uppercase tracking-wider block">Position &amp; Displacement Vectors in 2D</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[13px]">
              <div className="bg-black/20 rounded-lg p-3 space-y-1 flex flex-col justify-between">
                <div>
                  <div className="text-emerald-300 font-bold">Position Vector (r)</div>
 <div className="text-white/80">r = x&nbsp;&icirc; + y&nbsp;ĵ</div>
                </div>
                <p className="text-white/45 leading-relaxed text-[12px]">Points from origin O to the location of the particle. Its magnitude is the distance from O. Dependent on origin choice.</p>
              </div>
              <div className="bg-black/20 rounded-lg p-3 space-y-1 flex flex-col justify-between">
                <div>
                  <div className="text-emerald-300 font-bold">Displacement Vector (Δr)</div>
 <div className="text-white/80">Δr = r₂ − r₁ = Δx&nbsp;&icirc; + Δy&nbsp;ĵ</div>
                </div>
                <p className="text-white/45 leading-relaxed text-[12px]">Change in position. Straight line from start to end. <strong>Independent of origin choice!</strong></p>
              </div>
              {/* SVG vector representation */}
              <div className="bg-black/30 rounded-lg p-2.5 flex flex-col items-center gap-1.5 border border-emerald-500/10">
 <span className="text-[10px] text-emerald-400 uppercase tracking-wider text-center">Graph Interpretation</span>
                <svg viewBox="0 0 120 100" className="w-full max-w-[110px] mx-auto">
                  <circle cx="15" cy="85" r="2" fill="#ffffff" />
                  <text x="10" y="93" fill="#ffffff60" fontSize="7">O</text>
                  <line x1="15" y1="85" x2="45" y2="45" stroke="#60a5fa" strokeWidth="1.2" />
                  <polygon points="45,45 39,47 42,51" fill="#60a5fa" />
                  <text x="25" y="68" fill="#60a5fa" fontSize="7">r₁</text>
                  <circle cx="45" cy="45" r="2.5" fill="#60a5fa" />
                  <text x="45" y="38" fill="#60a5fa" fontSize="7" textAnchor="middle">P(x₁,y₁)</text>
                  <line x1="15" y1="85" x2="95" y2="65" stroke="#a78bfa" strokeWidth="1.2" />
                  <polygon points="95,65 88,68 91,72" fill="#a78bfa" />
                  <text x="55" y="82" fill="#a78bfa" fontSize="7">r₂</text>
                  <circle cx="95" cy="65" r="2.5" fill="#a78bfa" />
                  <text x="103" y="73" fill="#a78bfa" fontSize="7">Q(x₂,y₂)</text>
                  <line x1="45" y1="45" x2="95" y2="65" stroke="#22c55e" strokeWidth="1.8" />
                  <polygon points="95,65 88,60 91,66" fill="#22c55e" />
                  <text x="73" y="52" fill="#22c55e" fontSize="7.5" textAnchor="middle" fontWeight="bold">&Delta;r</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Analytical Method */}
          <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-3">
            <span className="text-[12px] font-black text-indigo-400 uppercase tracking-wider block">Analytical Method: Adding Vectors by Components</span>
            <ol className="list-decimal list-inside text-white/65 text-[13px] space-y-1 leading-relaxed">
 <li>Resolve each vector into x and y components: <span className="text-indigo-300">Aₓ = |A|cosθ₁, Aᵧ = |A|sinθ₁</span></li>
 <li>Add components: <span className="text-indigo-300">Rₓ = Aₓ + Bₓ,&nbsp; Rᵧ = Aᵧ + Bᵧ</span></li>
 <li>Find resultant magnitude: <span className="text-indigo-300">|R| = &radic;(Rₓ&sup2; + Rᵧ&sup2;)</span></li>
 <li>Find angle: <span className="text-indigo-300">θ = tan⁻¹(Rᵧ / Rₓ)</span></li>
            </ol>
 <div className="bg-black/30 rounded-lg p-3 space-y-1 text-[12px]">
              <div className="text-white/40 uppercase text-[10px] tracking-wider mb-1">Worked Example</div>
              <div className="text-indigo-300">A = 5 at 37°, B = 10 at 53°</div>
              <div className="text-white/60">Aₓ=5cos37°=4, Aᵧ=5sin37°=3</div>
              <div className="text-white/60">Bₓ=10cos53°=6, Bᵧ=10sin53°=8</div>
              <div className="text-cyan-300">Rₓ=4+6=10, Rᵧ=3+8=11</div>
              <div className="text-emerald-300">|R|=&radic;(100+121)=&radic;221≈14.87, θ=tan⁻¹(11/10)≈47.7°</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                emoji: '📐',
                title: 'Vector Resolution',
                reveal: 'A vector A at angle θ w.r.t x-axis can be written as:\nAx = A·cosθ (along x-axis)\nAy = A·sinθ (along y-axis)\nVector A = Ax i + Ay j.',
                color: 'border-cyan-500/20 bg-cyan-500/5'
              },
              {
                emoji: '⚫',
                title: 'Dot Product (Scalar)',
                reveal: 'A * B = AxBx + AyBy = |A||B|cosθ.\nUse when finding angles between vectors, or projection of A along B (A·cosθ). Dot product of perpendicular vectors is 0.',
                color: 'border-violet-500/20 bg-violet-500/5'
              },
              {
                emoji: '✖️',
                title: 'Cross Product (Vector)',
                reveal: 'A * B = |A||B|sinθ n.\nResult is perpendicular to both A and B. Magnitude represents the area of a parallelogram. Used in rotation.',
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

          {/* Unit Vector & Graphical Addition block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="rounded-xl bg-black/30 border border-violet-500/15 p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="text-[13px] font-bold text-violet-300 uppercase tracking-wide">Unit Vector Notation (î, ĵ) &amp; Resolution</div>
                <p className="text-white/70 text-[13px] leading-relaxed">
                  Vector A resolved along orthogonal axes: Ax = A·cosθ, Ay = A·sinθ.
                </p>
                <div className="grid grid-cols-2 gap-3.5 mt-2">
 <div className="bg-white/5 rounded-lg p-2.5 space-y-1 text-[12px] flex flex-col justify-center">
                    <div className="text-cyan-300">A = A<sub>x</sub>î + A<sub>y</sub>ĵ</div>
                    <div className="text-violet-300">|A| = &radic;(A<sub>x</sub>&sup2; + A<sub>y</sub>&sup2;)</div>
                    <div className="text-amber-300">tan&theta; = A<sub>y</sub>/A<sub>x</sub></div>
                  </div>
                  {/* Resolution SVG */}
                  <div className="bg-black/40 rounded-xl p-1.5 border border-white/5 flex flex-col items-center">
                    <svg viewBox="0 0 120 100" className="w-full max-w-[90px] mx-auto">
                      <line x1="15" y1="85" x2="110" y2="85" stroke="#ffffff30" strokeWidth="1" />
                      <line x1="15" y1="85" x2="15" y2="10" stroke="#ffffff30" strokeWidth="1" />
                      <line x1="15" y1="85" x2="85" y2="25" stroke="#a78bfa" strokeWidth="2" />
                      <polygon points="85,25 78,28 81,34" fill="#a78bfa" />
                      <text x="50" y="45" fill="#a78bfa" fontSize="9" textAnchor="middle" fontWeight="bold">A</text>
                      <path d="M 30 85 A 15 15 0 0 0 27 75" fill="none" stroke="#fbbf24" strokeWidth="1" />
                      <text x="35" y="80" fill="#fbbf24" fontSize="7">&theta;</text>
                      <line x1="85" y1="25" x2="85" y2="85" stroke="#ffffff20" strokeWidth="0.8" strokeDasharray="2 2" />
                      <text x="50" y="94" fill="#60a5fa" fontSize="7.5" textAnchor="middle">A<sub>x</sub></text>
                      <text x="94" y="55" fill="#f472b6" fontSize="7.5">A<sub>y</sub></text>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-[12px] leading-relaxed border-t border-white/5 pt-2.5 mt-2">
                <strong>Example:</strong> If <code className="font-mono text-white">v = 3î + 4ĵ m/s</code>, its speed is <code className="font-mono text-white">|v| = 5 m/s</code>, and angle is <code className="font-mono text-white">θ = tan⁻¹(4/3) ≈ 53°</code>.
              </p>
            </div>
            <div className="rounded-xl bg-black/30 border border-violet-500/15 p-4 space-y-3 flex flex-col justify-between">
              <div>
 <div className="text-[13px] font-bold text-violet-300 uppercase tracking-wide">Graphical Vector Addition &amp; Real Multipliers</div>
                <p className="text-white/70 text-[13px] leading-relaxed mb-2">
                  <strong>Triangle Law:</strong> Vectors A &amp; B head-to-tail; R connects tail of A to head of B.
                  <br />
                  <strong>Parallelogram Law:</strong> A &amp; B share origin; R is the diagonal:
                </p>
 <div className="bg-white/5 rounded-lg p-2.5 space-y-1 text-[12px]">
                  <div className="text-cyan-300">R = √(A² + B² + 2AB·cosθ)</div>
                  <div className="text-violet-300">tanα = B·sinθ / (A + B·cosθ)</div>
                </div>

                {/* Addition SVGs */}
                <div className="grid grid-cols-2 gap-2 mt-3 p-1.5 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex flex-col items-center gap-1">
 <span className="text-[9px] text-white/40 uppercase">Parallelogram Law</span>
                    <svg viewBox="0 0 120 100" className="w-full max-w-[90px] mx-auto">
                      <line x1="15" y1="85" x2="65" y2="85" stroke="#38bdf8" strokeWidth="1.5" />
                      <polygon points="65,85 59,82 59,88" fill="#38bdf8" />
                      <text x="40" y="96" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">A</text>
                      <line x1="15" y1="85" x2="45" y2="35" stroke="#ec4899" strokeWidth="1.5" />
                      <polygon points="45,35 39,39 44,43" fill="#ec4899" />
                      <text x="22" y="55" fill="#ec4899" fontSize="8" textAnchor="end" fontWeight="bold">B</text>
                      <line x1="65" y1="85" x2="95" y2="35" stroke="#ffffff30" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="45" y1="35" x2="95" y2="35" stroke="#ffffff30" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="15" y1="85" x2="95" y2="35" stroke="#22c55e" strokeWidth="2" />
                      <polygon points="95,35 88,38 91,44" fill="#22c55e" />
                      <text x="55" y="52" fill="#22c55e" fontSize="9" textAnchor="middle" fontWeight="bold">R</text>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-1">
 <span className="text-[9px] text-white/40 uppercase">Triangle Law</span>
                    <svg viewBox="0 0 120 100" className="w-full max-w-[90px] mx-auto">
                      <line x1="15" y1="85" x2="65" y2="85" stroke="#38bdf8" strokeWidth="1.5" />
                      <polygon points="65,85 59,82 59,88" fill="#38bdf8" />
                      <text x="40" y="96" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">A</text>
                      <line x1="65" y1="85" x2="95" y2="35" stroke="#ec4899" strokeWidth="1.5" />
                      <polygon points="95,35 89,39 94,43" fill="#ec4899" />
                      <text x="85" y="55" fill="#ec4899" fontSize="8" textAnchor="start" fontWeight="bold">B</text>
                      <line x1="15" y1="85" x2="95" y2="35" stroke="#22c55e" strokeWidth="2" />
                      <polygon points="95,35 88,38 91,44" fill="#22c55e" />
                      <text x="45" y="52" fill="#22c55e" fontSize="9" textAnchor="middle" fontWeight="bold">R</text>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-2.5 mt-2">
                <div className="text-[12px] font-bold text-violet-300 uppercase tracking-wide">Multiplication &amp; Scaling</div>
                <p className="text-white/60 text-[12px] leading-relaxed">
                  Multiplying vector <code className="font-mono">A</code> by real <code className="font-mono">λ</code> yields <code className="font-mono">λA</code> with magnitude <code className="font-mono">|λ||A|</code>. Reverses direction if <code className="font-mono">λ &lt; 0</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Concept 1a: General 2D Kinematics (Variable Motion) */}
        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">Concept 1a</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">General 2D Motion — Velocity &amp; Acceleration</h3>
            </div>
            <FrequencyBadge stars={4} label="Syllabus Core" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            Before applying constant acceleration rules, remember the general calculus and limit definitions of velocity and acceleration vectors in 2D space:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Velocity in 2D */}
            <div className="rounded-xl bg-black/30 border border-sky-500/15 p-4 space-y-3">
              <span className="text-[12.5px] font-bold text-sky-400 block uppercase">Velocity in 2D (v⃗)</span>
              <div className="space-y-2 text-[13px] text-white/70">
                <div>
                  <strong>Average Velocity:</strong> Rate of displacement over finite interval:
                  <code className="text-sky-300 block font-mono text-center py-1.5 bg-black/40 rounded mt-1">v⃗_avg = Δr⃗ / Δt = (Δx/Δt)î + (Δy/Δt)ĵ</code>
                </div>
                <div>
                  <strong>Instantaneous Velocity:</strong> Limit of average velocity as Δt → 0:
                  <code className="text-sky-300 block font-mono text-center py-1.5 bg-black/40 rounded mt-1">v⃗ = dr⃗ / dt = dx/dt î + dy/dt ĵ = vₓî + vᵧĵ</code>
                </div>
              </div>
            </div>

            {/* Acceleration in 2D */}
            <div className="rounded-xl bg-black/30 border border-sky-500/15 p-4 space-y-3">
              <span className="text-[12.5px] font-bold text-sky-400 block uppercase">Acceleration in 2D (a⃗)</span>
              <div className="space-y-2 text-[13px] text-white/70">
                <div>
                  <strong>Average Acceleration:</strong> Rate of change of velocity vector:
                  <code className="text-sky-300 block font-mono text-center py-1.5 bg-black/40 rounded mt-1">a⃗_avg = Δv⃗ / Δt = (Δvₓ/Δt)î + (Δvᵧ/Δt)ĵ</code>
                </div>
                <div>
                  <strong>Instantaneous Acceleration:</strong> Derivative of velocity w.r.t. time:
                  <code className="text-sky-300 block font-mono text-center py-1.5 bg-black/40 rounded mt-1">a⃗ = dv⃗ / dt = dvₓ/dt î + dvᵧ/dt ĵ = aₓî + aᵧĵ</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Concept 1b: General Motion in a Plane with Constant Acceleration */}
        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">Concept 1b</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Motion in a Plane with Constant Acceleration</h3>
            </div>
            <FrequencyBadge stars={4} label="IAT Vector Questions" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            When acceleration is constant in both magnitude and direction in 2D, the vector equations of motion are direct extensions of the 1D equations:
          </p>

          {/* Vector equations */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { eq: 'v⃗ = v⃗₀ + a⃗t', label: 'Velocity (vector)', color: 'border-sky-500/20 bg-sky-500/5', tc: 'text-sky-300' },
              { eq: 'r⃗ = r⃗₀ + v⃗₀t + ½ a⃗t²', label: 'Position (vector)', color: 'border-violet-500/20 bg-violet-500/5', tc: 'text-violet-300' },
              { eq: 'v² = v₀² + 2a⃗·Δr⃗', label: 'Velocity² (dot product)', color: 'border-cyan-500/20 bg-cyan-500/5', tc: 'text-cyan-300' },
            ].map(item => (
              <div key={item.eq} className={`rounded-xl border p-4 text-center space-y-1.5 ${item.color}`}>
 <div className={`font-bold text-[14.5px] ${item.tc}`}>{item.eq}</div>
                <div className="text-white/40 text-[11px] uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Component breakdown */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3 text-[13px]">
            <span className="text-[12px] font-black text-white/50 uppercase tracking-wider block">Component Form (x and y are independent)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sky-400 font-bold text-[12px] uppercase">x-direction</div>
 <div className="text-white/75 space-y-0.5">
                  <div>vₓ = v₀ₓ + aₓt</div>
                  <div>x = x₀ + v₀ₓt + ½ aₓt²</div>
                  <div>vₓ² = v₀ₓ² + 2aₓ(x - x₀)</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-violet-400 font-bold text-[12px] uppercase">y-direction</div>
 <div className="text-white/75 space-y-0.5">
                  <div>vᵧ = v₀ᵧ + aᵧt</div>
                  <div>y = y₀ + v₀ᵧt + ½ aᵧt²</div>
                  <div>vᵧ² = v₀ᵧ² + 2aᵧ(y - y₀)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Worked Example */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-[13px]">
            <span className="text-[12px] font-black text-amber-400 uppercase tracking-wider block">Worked Example — General 2D Kinematics</span>
            <p className="text-white/65 leading-relaxed">A particle starts at origin with v₀ = 3î + 4ĵ m/s and has constant acceleration a = 2î + 3ĵ m/s². Find its position and velocity at t = 2 s.</p>
 <div className="bg-black/30 rounded-lg p-3 text-[12px] space-y-1">
              <div className="text-sky-300">v⃗(t) = v⃗₀ + a⃗t = (3+2×2)î + (4+3×2)ĵ = <strong>7î + 10ĵ m/s</strong></div>
              <div className="text-violet-300">r⃗(t) = v⃗₀t + ½ a⃗t² = (3×2+½×2×4)î + (4×2+½×3×4)ĵ = <strong>10î + 14ĵ m</strong></div>
              <div className="text-white/40 text-[11px] mt-1">Speed = √(7²+10²) = √149 ≈ 12.2 m/s | |r| = √(100+196) ≈ 17.2 m from origin</div>
            </div>
          </div>
        </div>

        {/* Concept 2: Projectile Motion */}
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Concept 2</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Projectile Motion (Flat Ground)</h3>
            </div>
            <FrequencyBadge stars={5} label="Every Year" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            Decompose the projectile velocity vector into two completely independent motions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-black/30 border border-cyan-500/15 p-4 space-y-1.5">
              <div className="text-[13px] font-bold text-cyan-400 uppercase">Horizontal (Uniform)</div>
 <div className="text-[13px] text-white/80">u<sub>x</sub> = u&middot;cos&theta;, a<sub>x</sub> = 0</div>
              <p className="text-white/50 text-[12px] leading-relaxed">Velocity remains constant throughout the flight: x = (u&middot;cos&theta;)t.</p>
            </div>
            <div className="rounded-xl bg-black/30 border border-cyan-500/15 p-4 space-y-1.5">
              <div className="text-[13px] font-bold text-cyan-400 uppercase">Vertical (Accelerated)</div>
 <div className="text-[13px] text-white/80">u<sub>y</sub> = u&middot;sin&theta;, a<sub>y</sub> = &minus;g</div>
              <p className="text-white/50 text-[12px] leading-relaxed">Under constant acceleration downwards: y = (u&middot;sin&theta;)t &minus; &frac12;gt&sup2;.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {[
              { title: 'Time of Flight (T)', formula: '2u·sinθ / g' },
              { title: 'Max Height (H)', formula: 'u²·sin²θ / 2g' },
              { title: 'Range (R)', formula: 'u²·sin(2θ) / g (Max at 45°: R = u²/g)' },
              { title: 'Trajectory', formula: 'y = x·tanθ - gx²/(2u²·cos²θ)' },
            ].map(item => (
              <div key={item.title} className="rounded-lg bg-black/40 border border-cyan-500/15 p-3 text-center space-y-1 flex flex-col justify-center">
                <div className="text-white/40 text-[10px] uppercase tracking-wider">{item.title}</div>
                <div className="font-mono text-cyan-300 font-bold text-[11px] sm:text-[12px]">{item.formula}</div>
              </div>
            ))}
          </div>

          {/* Derivations */}
          <div className="p-4 rounded-xl bg-black/20 border border-cyan-500/10 space-y-3 text-[13px]">
            <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block">Key Derivations (IAT Conceptual Depth)</span>
            <div className="space-y-3 text-white/60 leading-relaxed">
              <div>
                <div className="font-bold text-white text-[13px] mb-1">1. Time of Flight T = 2u·sinθ / g</div>
 <p className="text-[12px]">Vertical displacement = 0 at landing: 0 = (u·sinθ)T − ½ gT² ⇒ T(u·sinθ − ½ gT) = 0 ⇒ <span className="text-cyan-300">T = 2u·sinθ/g</span></p>
              </div>
              <div>
                <div className="font-bold text-white text-[13px] mb-1">2. Max Height H = u²sin²θ / 2g</div>
 <p className="text-[12px]">At peak, vᵧ = 0: vᵧ² = uᵧ² − 2gH ⇒ 0 = (u·sinθ)² − 2gH ⇒ <span className="text-cyan-300">H = u²sin²θ/2g</span></p>
              </div>
              <div>
                <div className="font-bold text-white text-[13px] mb-1">3. Range R = u²sin(2θ) / g</div>
 <p className="text-[12px]">R = uₓ·T = (u·cosθ)·(2u·sinθ/g) = 2u²sinθ·cosθ/g = <span className="text-cyan-300">u²sin(2θ)/g</span></p>
              </div>
              <div>
                <div className="font-bold text-white text-[13px] mb-1">4. Trajectory Equation y = x·tanθ − gx²/(2u²cos²θ)</div>
 <p className="text-[12px]">From x = (u·cosθ)t ⇒ t = x/(u·cosθ). Substitute into y = (u·sinθ)t − ½ gt²: <span className="text-cyan-300">y = x·tanθ − gx²/(2u²cos²θ)</span> (parabola: y is quadratic in x)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Concept 3: Projectile on Inclined Plane */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">Concept 3</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Projectile on Inclined Plane</h3>
            </div>
            <FrequencyBadge stars={3} label="99th Percentile Booster" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            Projectiles launched on a hill inclined at angle <code className="font-mono bg-white/10 px-1 rounded">&beta;</code>. The coordinate axes are rotated to align with the slope, introducing acceleration components: <code className="font-mono bg-white/10 px-1 rounded">a<sub>x</sub> = &minus;g sin&beta;</code> and <code className="font-mono bg-white/10 px-1 rounded">a<sub>y</sub> = &minus;g cos&beta;</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Up the Incline */}
            <div className="rounded-xl bg-black/30 border border-rose-500/15 p-4 space-y-2 text-[13px] flex flex-col justify-between">
              <div>
                <div className="text-[13px] font-bold text-rose-400 uppercase mb-1">Up the Incline</div>
                <ul className="list-disc list-inside text-white/70 space-y-1 leading-relaxed">
                  <li>Time of Flight: <code className="font-mono text-rose-300 block my-0.5">T = 2u sin(&theta;&minus;&beta;)/g cos&beta;</code></li>
                  <li>General Range: <code className="font-mono text-rose-300 block my-0.5">R = 2u&sup2; sin(&theta;&minus;&beta;) cos&theta; / (g cos&sup2;&beta;)</code></li>
                  <li>Max Range: <code className="font-mono text-rose-300 block my-0.5">R<sub>max</sub> = u&sup2;/[g(1 + sin&beta;)]</code></li>
                  <li>Optimal Angle: <code className="font-mono text-rose-300 block my-0.5">&theta; = 45&deg; + &beta;/2</code></li>
                </ul>
              </div>
            </div>

            {/* Down the Incline */}
            <div className="rounded-xl bg-black/30 border border-rose-500/15 p-4 space-y-2 text-[13px] flex flex-col justify-between">
              <div>
                <div className="text-[13px] font-bold text-rose-400 uppercase mb-1">Down the Incline</div>
                <ul className="list-disc list-inside text-white/70 space-y-1 leading-relaxed">
                  <li>Time of Flight: <code className="font-mono text-rose-300 block my-0.5">T = 2u sin(&theta;+&beta;)/g cos&beta;</code></li>
                  <li>General Range: <code className="font-mono text-rose-300 block my-0.5">R = 2u&sup2; sin(&theta;+&beta;) cos&theta; / (g cos&sup2;&beta;)</code></li>
                  <li>Max Range: <code className="font-mono text-rose-300 block my-0.5">R<sub>max</sub> = u&sup2;/[g(1 &minus; sin&beta;)]</code></li>
                  <li>Optimal Angle: <code className="font-mono text-rose-300 block my-0.5">&theta; = 45&deg; &minus; &beta;/2</code></li>
                </ul>
              </div>
            </div>

            {/* SVG Visual */}
            <div className="bg-black/40 rounded-xl p-3 border border-rose-500/20 flex flex-col items-center gap-2">
 <span className="text-[10px] text-rose-300 uppercase tracking-wider text-center font-bold">Slope Geometry (Angle &theta; w.r.t Horiz)</span>
              <svg viewBox="0 0 140 110" className="w-full max-w-[130px] mx-auto">
                <path d="M 15 95 L 125 45" stroke="#ffffff40" strokeWidth="1.5" />
                <line x1="15" y1="95" x2="125" y2="95" stroke="#ffffff20" strokeWidth="1" />
                <path d="M 35 95 A 20 20 0 0 0 32 87" fill="none" stroke="#f472b6" strokeWidth="1" />
                <text x="38" y="91" fill="#f472b6" fontSize="7">&beta;</text>
                <path d="M 15 95 Q 65 30 110 52" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="15" y1="95" x2="55" y2="55" stroke="#fbbf24" strokeWidth="1.5" />
                <polygon points="55,55 48,58 51,64" fill="#fbbf24" />
                <text x="32" y="68" fill="#fbbf24" fontSize="8" fontWeight="bold">u</text>
                <path d="M 30 95 A 15 15 0 0 0 25 85" fill="none" stroke="#fbbf24" strokeWidth="0.8" />
                <text x="24" y="80" fill="#fbbf24" fontSize="7">&theta;</text>
                <text x="50" y="85" fill="#a78bfa" fontSize="6.5">Relative: &theta; &minus; &beta;</text>
                <line x1="75" y1="65" x2="60" y2="90" stroke="#f87171" strokeWidth="1" />
                <polygon points="60,90 64,85 58,83" fill="#f87171" />
                <text x="52" y="98" fill="#f87171" fontSize="6">g cos&beta;</text>
                <line x1="75" y1="65" x2="95" y2="55" stroke="#f87171" strokeWidth="1" />
                <polygon points="95,55 89,53 91,59" fill="#f87171" />
                <text x="96" y="47" fill="#f87171" fontSize="6">g sin&beta;</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Concept 4: Relative Velocity in 2D */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Concept 4</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Relative Velocity in 2D</h3>
            </div>
            <FrequencyBadge stars={4} label="River-Boat & Rain-Man" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            In 2D relative motion, velocity vectors must be resolved using vector subtractions: 
            <code className="font-mono bg-white/10 ml-1.5 px-1.5 py-0.5 rounded">v<sub>rel</sub> = v<sub>A</sub> &minus; v<sub>B</sub></code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-black/30 border border-emerald-500/15 p-4 space-y-2">
              <div className="text-[13px] font-bold text-emerald-400">River Boat Crossing &mdash; Width d, boat speed v<sub>b</sub>, river speed v<sub>r</sub></div>
 <ul className="list-disc list-inside text-white/70 text-[13px] space-y-1.5 leading-relaxed">
                <li>Shortest Time: head straight across (&theta; = 90&deg;)<br />⟹ t<sub>min</sub> = d/v<sub>b</sub> | Drift x = v<sub>r</sub> &middot; (d/v<sub>b</sub>)</li>
                <li>Shortest Path (Zero Drift): head upstream at angle sin&theta; = v<sub>r</sub>/v<sub>b</sub><br />⟹ t = d / &radic;(v<sub>b</sub>&sup2; &minus; v<sub>r</sub>&sup2;) | Drift x = 0</li>
              </ul>
            </div>
            <div className="rounded-xl bg-black/30 border border-emerald-500/15 p-4 space-y-2">
              <div className="text-[13px] font-bold text-emerald-400 uppercase">Rain-Man umbrella angle</div>
              <p className="text-white/70 text-[13px] leading-relaxed">
                If rain falls vertically with speed <code className="font-mono">v<sub>y</sub></code> and man runs with speed <code className="font-mono">v<sub>x</sub></code>:
              </p>
 <div className="text-emerald-300 text-[13px] bg-white/5 p-2 rounded text-center">
                Relative velocity of rain w.r.t man: v<sub>rm</sub> = &minus;v<sub>x</sub> î &minus; v<sub>y</sub> ĵ<br />
                Angle to hold umbrella: tan&theta; = v<sub>x</sub> / v<sub>y</sub> (w.r.t vertical)
              </div>
            </div>
          </div>
        </div>

        {/* Concept 5: Circular Motion (Uniform & Non-Uniform) */}
        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">Concept 5</span>
              <h3 className="text-white font-display font-bold text-[14.5px]">Circular Motion (Uniform & Non-Uniform)</h3>
            </div>
            <FrequencyBadge stars={4} label="Centripetal & Tangential Forces" />
          </div>
          <p className="text-white/65 text-[14.5px] leading-relaxed">
            When a particle moves in a circle, its velocity vector changes direction continuously, creating an acceleration towards the center. If its speed also changes, it possesses a tangential component of acceleration as well.
          </p>

          {/* Angular quantities */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px]">
            {[
              { label: 'Angular Displacement (Δθ)', val: 'Δθ = arc length / radius = s/r', note: 'Unit: radians (rad). One full circle = 2π rad. Direction: right-hand rule (CCW = +ve).', color: 'border-sky-500/20' },
              { label: 'Angular Velocity (ω)', val: 'ω = dθ/dt = v/r = 2πf = 2π/T', note: 'Rate of change of angular displacement. Relates to linear speed: v = rω.', color: 'border-violet-500/20' },
              { label: 'Angular Acceleration (α)', val: 'α = dω/dt = a<sub>t</sub>/r', note: 'Rate of change of angular velocity. Tangential acceleration: a<sub>t</sub> = rα.', color: 'border-amber-500/20' },
            ].map(item => (
              <div key={item.label} className={`rounded-xl bg-black/30 border p-4 space-y-1.5 ${item.color}`}>
                <div className="text-sky-400 font-bold text-[12px] uppercase">{item.label}</div>
 <div className="text-white/85 text-[12px]">{item.val}</div>
                <p className="text-white/40 text-[11px] leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Period & Frequency */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap gap-4 text-[13px]">
 <div className="text-violet-300"><strong className="text-white/60 text-[11px] uppercase block mb-0.5">Period T</strong>T = 2π/ω = 2πr/v = 1/f</div>
 <div className="text-violet-300"><strong className="text-white/60 text-[11px] uppercase block mb-0.5">Frequency f</strong>f = ω/2π = 1/T</div>
 <div className="text-cyan-300"><strong className="text-white/60 text-[11px] uppercase block mb-0.5">Linear speed</strong>v = rω = 2πr/T = 2πrf</div>
          </div>

          {/* Derivation of centripetal acceleration */}
          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2 text-[13px]">
            <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider block">Derivation of Centripetal Acceleration a<sub>n</sub> = v²/r</span>
            <p className="text-white/65 leading-relaxed text-[12px]">
              Consider a particle at P moving with speed v along a circle of radius r. In time Δt it moves to Q, turning through angle Δθ. The velocity vectors v⃗₁ and v⃗₂ both have magnitude v but differ in direction by Δθ.
            </p>
 <div className="bg-black/30 rounded-lg p-3 text-[12px] space-y-1">
              <div className="text-white/55">|Δv⃗| = 2v·sin(Δθ/2) ≈ vΔθ (for small Δθ)</div>
              <div className="text-white/55">a = |Δv⃗|/Δt = v(Δθ/Δt) = vω</div>
              <div className="text-rose-300">a<sub>n</sub> = vω = v(v/r) = <strong>v²/r = ω²r</strong></div>
              <div className="text-white/40 text-[11px]">Direction: Δv⃗ points towards centre O as Δt→0 ⇒ centripetal (inward)</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-black/30 border border-sky-500/15 p-4 space-y-2">
 <div className="text-[13px] font-bold text-sky-400">Centripetal Acceleration (a<sub>c</sub>)</div>
 <div className="text-sky-300 text-[13px] bg-white/5 p-2 rounded">
                a<sub>c</sub> = v²/R = ω²·R = v·ω<br />
                ω = v/R = 2π/T
              </div>
              <p className="text-white/50 text-[12px] leading-relaxed">Responsible only for changing the direction of velocity. Points radially inwards.</p>
            </div>
            <div className="rounded-xl bg-black/30 border border-sky-500/15 p-4 space-y-2">
 <div className="text-[13px] font-bold text-sky-400">Tangential Acceleration (a<sub>t</sub>)</div>
 <div className="text-sky-300 text-[13px] bg-white/5 p-2 rounded">
                a<sub>t</sub> = dv/dt = r·α<br />
                α (angular acceleration) = dω/dt
              </div>
              <p className="text-white/50 text-[12px] leading-relaxed">Responsible only for changing the magnitude of velocity (speed). Points along the tangent.</p>
            </div>
            <div className="rounded-xl bg-black/30 border border-sky-500/15 p-4 space-y-2">
 <div className="text-[13px] font-bold text-sky-400">Total Acceleration (a<sub>total</sub>)</div>
 <div className="text-sky-300 text-[13px] bg-white/5 p-2 rounded">
                a<sub>total</sub> = &radic;(a<sub>c</sub>&sup2; + a<sub>t</sub>&sup2;)<br />
                tan&phi; = a<sub>c</sub> / a<sub>t</sub> (angle w.r.t tangent)
              </div>
              <p className="text-white/50 text-[12px] leading-relaxed">For Uniform Circular Motion, speed is constant, so a<sub>t</sub> = 0, and a<sub>total</sub> = a<sub>c</sub>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Visual Diagrams & Graphs ──────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Eye className="w-5 h-5" />} label="Visual Diagrams & Graphs" color="sky" />
        <p className="text-white/50 text-[14.5px]">Visualizing 2D trajectories and velocity resultants.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Projectile Trajectory',
              subtitle: 'Parabolic motion',
              graph: <ProjectileGraph />,
              rows: [
                { label: 'At launch', value: 'u<sub>x</sub> = u&middot;cos&theta;, u<sub>y</sub> = u&middot;sin&theta;' },
                { label: 'At peak', value: 'v<sub>y</sub> = 0, v<sub>x</sub> = u&middot;cos&theta;' },
                { label: 'At land', value: 'v<sub>x</sub> = u&middot;cos&theta;, v<sub>y</sub> = &minus;u&middot;sin&theta;' },
                { label: 'Gravity', value: 'Constant downwards (g)' },
              ],
              color: 'border-cyan-500/20',
              freq: 5
            },
            {
              title: 'River Boat Crossing',
              subtitle: 'Vector addition',
              graph: <RiverBoatDiagram />,
              rows: [
                { label: 'River flow', value: 'Flow speed along x-axis' },
                { label: 'Shortest path', value: 'Resultant v is vertical' },
                { label: 'Shortest time', value: 'Boat head perpendicular' },
                { label: 'Drift', value: 'x = (v<sub>river</sub>) &middot; t' },
              ],
              color: 'border-emerald-500/20',
              freq: 4
            },
            {
              title: 'Uniform Circular Motion',
              subtitle: 'Centripetal acceleration',
              graph: <CircularMotionDiagram />,
              rows: [
                { label: 'Velocity v', value: 'Tangential to circle' },
                { label: 'Acceleration a<sub>c</sub>', value: 'Radially inward' },
                { label: 'Angle v &amp; a<sub>c</sub>', value: '90&deg; (always perpendicular)' },
                { label: 'Angular Speed &omega;', value: '&omega; = d&theta;/dt' },
              ],
              color: 'border-rose-500/20',
              freq: 4
            },
            {
              title: 'Non-Uniform Circular',
              subtitle: 'Speed &amp; Direction change',
              graph: <NonUniformCircularMotionDiagram />,
              rows: [
                { label: 'Centripetal a<sub>c</sub>', value: 'v&sup2;/R (inward directional)' },
                { label: 'Tangential a<sub>t</sub>', value: 'dv/dt (speed changes)' },
                { label: 'Net Accel a', value: '&radic;(a<sub>c</sub>&sup2; + a<sub>t</sub>&sup2;)' },
                { label: 'Angle to tangent', value: 'tan&phi; = a<sub>c</sub> / a<sub>t</sub>' },
              ],
              color: 'border-amber-500/20',
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
      </div>

      {/* ── SECTION 3: Key Formulas ───────────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Zap className="w-5 h-5" />} label="Key Formulas" color="amber" />

        {/* Vector formulas */}
        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">Vector Mathematics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormulaCard formula="A * B = |A||B|cosθ" use_when="Find angle between vectors (Dot product)" freq_stars={5} freq_label="Core" color="violet" copy_text="A.B = |A||B|cos(theta)" />
            <FormulaCard formula="|A * B| = |A||B|sinθ" use_when="Find perpendicular product (Cross product)" freq_stars={4} freq_label="Core" color="violet" copy_text="|AxB| = |A||B|sin(theta)" />
            <FormulaCard formula="R = √[A² + B² + 2ABcosθ]" use_when="Resultant of two vectors at angle θ" freq_stars={5} freq_label="Core" color="cyan" copy_text="R = sqrt(A^2 + B^2 + 2ABcos(theta))" />
          </div>
        </div>

        {/* Projectile formulas */}
        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">Projectile Equations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormulaCard formula="T = 2u·sinθ / g" use_when="Time of flight on flat ground" freq_stars={5} freq_label="Every Exam" color="cyan" copy_text="T = 2u.sin(theta)/g" />
            <FormulaCard formula="R = u²·sin(2θ) / g" use_when="Horizontal range on flat ground" freq_stars={5} freq_label="Every Exam" color="cyan" copy_text="R = u^2.sin(2theta)/g" />
            <FormulaCard formula="H = u²·sin²θ / 2g" use_when="Maximum height reached" freq_stars={5} freq_label="Every Exam" color="cyan" copy_text="H = u^2.sin^2(theta)/(2g)" />
            <FormulaCard formula="y = x·tanθ - gx²/(2u²·cos²θ)" use_when="Equation of trajectory (path shape)" freq_stars={4} freq_label="High Yield" color="amber" copy_text="y = x.tan(theta) - g.x^2/(2u^2.cos^2(theta))" />
          </div>
        </div>
      </div>

      {/* ── SECTION 4: Shortcuts & Memory Tricks ─────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Brain className="w-5 h-5" />} label="Shortcuts & Memory Tricks" color="emerald" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Complementary Projection Angles',
              emoji: '🔄',
              formula: 'R(θ) = R(90° - θ)',
              note: 'Horizontal range is identical for angles θ and 90° - θ.',
              color: 'border-cyan-500/20 bg-cyan-500/5'
            },
            {
              title: 'Range is equal to n times Height',
              emoji: '📐',
              formula: 'tanθ = 4 / n',
              note: 'If Horizontal Range R = n * Max Height H, find projection angle easily.',
              color: 'border-violet-500/20 bg-violet-500/5'
            },
            {
              title: 'River Crossing Minimum Path condition',
              emoji: '🚣',
              formula: 'sinθ = v_river / v_boat',
              note: 'For zero drift crossing, boat speed must be greater than river speed.',
              color: 'border-rose-500/20 bg-rose-500/5'
            },
            {
              title: "Max Range angle on inclined planes",
              emoji: '⛰️',
              formula: 'θ = 45° ± β/2',
              note: '+ for up-incline, - for down-incline. Optimal range throw angle.',
              color: 'border-amber-500/20 bg-amber-500/5'
            },
          ].map(item => (
            <div key={item.title} className={cn('rounded-2xl border p-4 space-y-3', item.color)}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-white font-bold text-[14.5px]">{item.title}</span>
              </div>
 <div className="text-white/90 text-[14.5px] whitespace-pre-line bg-black/20 rounded-lg px-3 py-2">
                {item.formula}
              </div>
              <p className="text-white/55 text-[13px]">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 5: Common Mistakes ───────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<AlertTriangle className="w-5 h-5" />} label="Common Traps & Mistakes" color="rose" />
        <div className="space-y-3">
          <TrapCard
            title="Trap 1: Projectile Peak Velocity Misconception"
            trap="Thinking velocity at the highest point of a projectile is zero."
            fix="Only the vertical velocity v<sub>y</sub> is zero at peak. The horizontal velocity u<sub>x</sub> = u&middot;cos&theta; remains unchanged. Therefore, total velocity is u&middot;cos&theta;."
          />
          <TrapCard
            title="Trap 2: Shortest Crossing Path vs. Shortest Crossing Time"
            trap="Thinking that head perpendicular (&theta; = 90&deg;) crosses river in shortest path."
            fix="Perpendicular heading crosses in shortest TIME (t = d/v<sub>b</sub>) but has a drift. For shortest PATH (zero drift), head upstream (sin&theta; = v<sub>r</sub>/v<sub>b</sub>)."
          />
          <TrapCard
            title="Trap 3: Uniform Circular Motion Acceleration is NOT Constant"
            trap="Assuming centripetal acceleration vector is constant because its magnitude (v&sup2;/R) is constant."
            fix="Magnitude is constant, but the direction is always changing (always pointing radially inwards). Thus, centripetal acceleration is a variable vector."
          />
          <TrapCard
            title="Trap 4: Relative Velocity 2D Angles"
            trap="Using simple scalar addition or subtraction for velocities at an angle instead of resolving vector components."
            fix="Always write velocities in vector form: v = v<sub>x</sub> i + v<sub>y</sub> j. Subtract components: v<sub>rel</sub> = (v<sub>Ax</sub> &minus; v<sub>Bx</sub>)i + (v<sub>Ay</sub> &minus; v<sub>By</sub>)j."
          />
          <TrapCard
            title="Trap 5: Constant Speed is NOT always Uniform Circular Motion"
            trap="Assuming that if a particle has constant speed, it must be executing Uniform Circular Motion."
            fix="UCM requires BOTH constant speed AND a constant radius of curvature. In non-circular curves (like ellipses or parabolas), the radius of curvature changes, requiring a variable centripetal acceleration (a<sub>c</sub> = v&sup2;/R) and potentially a tangential acceleration component to maintain the trajectory, even if speed remains constant."
          />
        </div>
      </div>

      {/* ── SECTION 6: Question Recognition ─────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Target className="w-5 h-5" />} label="Question Recognition Patterns" color="violet" />
        <p className="text-white/50 text-[14.5px]">Train your brain to pattern-match. Spot the keywords &rarr; instantly know the method.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RecognitionCard
            trigger="range is equal to maximum height"
            thought="tan&theta; = 4"
            action="Set R = H. u&sup2;&middot;sin(2&theta;)/g = u&sup2;&middot;sin&sup2;&theta;/2g &rArr; 2sin&theta;&middot;cos&theta; = sin&sup2;&theta;/2 &rArr; tan&theta; = 4. Angle is arctan(4)."
            color="violet"
          />
          <RecognitionCard
            trigger="boat crosses in shortest time"
            thought="&theta; = 90&deg; (straight ahead)"
            action="Time t = d/v<sub>boat</sub>. Boat heads straight across banks. Resultant motion has a drift downstream."
            color="violet"
          />
          <RecognitionCard
            trigger="man running to shield from falling rain"
            thought="Relative Rain-Man Vector"
            action="Calculate v<sub>rain/man</sub> = v<sub>rain</sub> &minus; v<sub>man</sub>. Angle of umbrella w.r.t vertical is tan&theta; = v<sub>man</sub> / v<sub>rain</sub>."
            color="cyan"
          />
          <RecognitionCard
            trigger="maximum range on inclined plane"
            thought="&theta; = 45&deg; &plusmn; &beta;/2"
            action="Projection angle w.r.t incline for up-incline is 45&deg; + &beta;/2, down-incline is 45&deg; &minus; &beta;/2."
            color="cyan"
          />
        </div>
      </div>

      {/* ── SECTION 7: Solved IAT-style Examples ─────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<TrendingUp className="w-5 h-5" />} label="Solved IAT-style Examples" color="indigo" />

        <div className="space-y-4">
          {[
            {
              title: 'Projectile Launch Angle for R = 4H',
              problem: 'A projectile is launched such that its horizontal range is exactly 4 times its maximum height. Find the angle of projection.',
              steps: [
                'Write the initial setup: R = 4H &rArr; u&sup2;&middot;sin(2&theta;)/g = 4 &middot; (u&sup2;&middot;sin&sup2;&theta; / 2g).',
                'Simplify the constants on both sides (canceling u&sup2;/g and simplifying 4/2 = 2): sin(2&theta;) = 2&middot;sin&sup2;&theta;.',
                'Expand the double-angle identity: 2&middot;sin&theta;&middot;cos&theta; = 2&middot;sin&sup2;&theta;.',
                'Divide both sides by 2&middot;sin&theta; (since &theta; &ne; 0): cos&theta; = sin&theta; &rArr; sin&theta;/cos&theta; = 1 &rArr; tan&theta; = 1.',
                'Determine projection angle: &theta; = tan&sup-1;(1) = 45&deg;.'
              ],
              insight: 'This is a classic result. At a 45&deg; launch angle, the horizontal range is exactly 4 times the maximum height achieved.',
              color: 'border-indigo-500/20 bg-indigo-500/5'
            },
            {
              title: '2D Kinematics in &icirc;/&jcirc; Notation',
              problem: 'A particle&rsquo;s position vector is given by r(t) = (2t&sup2;)&icirc; + (3t)&jcirc; meters. Find the velocity vector, its magnitude (speed), and the angle it makes with the positive x-axis at t = 2 s.',
              steps: [
                'Find velocity by differentiating position r(t) w.r.t time t: v(t) = dr/dt = d/dt[(2t&sup2;)&icirc; + (3t)&jcirc;] = (4t)&icirc; + 3&jcirc; m/s.',
                'At t = 2 s, substitute t = 2 into the velocity vector: v(2) = (4&middot;2)&icirc; + 3&jcirc; = 8&icirc; + 3&jcirc; m/s.',
                'Calculate speed (magnitude of velocity vector): |v| = &radic;(v<sub>x</sub>&sup2; + v<sub>y</sub>&sup2;) = &radic;(8&sup2; + 3&sup2;) = &radic;(64 + 9) = &radic;73 &asymp; 8.54 m/s.',
                'Find the angle w.r.t positive x-axis using components: tan&theta; = v<sub>y</sub> / v<sub>x</sub> = 3 / 8 &rArr; &theta; = tan&sup-1;(3/8) &asymp; 20.5&deg;.'
              ],
              insight: 'Differentiate each unit vector component independently to find velocity. The angle relative to the x-axis is always determined by the ratio of the y-component to the x-component.',
              color: 'border-amber-500/20 bg-amber-500/5'
            },
            {
              title: 'River Boat crossing with Drift calculation',
              problem: 'A river of width 500 m flows at 3 km/h. A boat moves w.r.t river at 5 km/h. Find drift if boat heads in the direction of shortest crossing time.',
              steps: [
                'For shortest time: head perpendicular to flow (&theta; = 90&deg;).',
                'Cross time: t = d / v<sub>b</sub> = 0.5 km / 5 km/h = 0.1 hours (6 minutes).',
                'Drift velocity: v<sub>river</sub> = 3 km/h.',
                'Drift distance: x = v<sub>river</sub> &middot; t = 3 km/h &middot; 0.1 h = 0.3 km = 300 meters.'
              ],
              insight: 'Heading perpendicular minimizes the time spent in the river, but river flow sweeps the boat downstream.',
              color: 'border-emerald-500/20 bg-emerald-500/5'
            },
            {
              title: 'Uniform Circular Motion: Velocity change',
              problem: 'A particle moves with constant speed v in a circle of radius R. Find magnitude of change in velocity vector after it completes 1/4 of a circle.',
              steps: [
                'Initial velocity: v<sub>i</sub> = v &jcirc; (moving upwards).',
                'After 1/4 circle (90&deg; turn): v<sub>f</sub> = &minus;v &icirc; (moving leftwards).',
                'Change in velocity vector: &Delta;v = v<sub>f</sub> &minus; v<sub>i</sub> = &minus;v &icirc; &minus; v &jcirc;.',
                'Magnitude of change: |&Delta;v| = &radic;[(&minus;v)&sup2; + (&minus;v)&sup2;] = v&radic;2.'
              ],
              insight: 'Even though speed remains constant (change in speed is 0), change in velocity vector is not zero due to direction change!',
              color: 'border-violet-500/20 bg-violet-500/5'
            },
            {
              title: 'Projectile up Inclined Plane range',
              problem: 'A ball is projected up a hill of incline &beta; = 30&deg; with speed u = 10 m/s at angle &theta; = 60&deg; w.r.t horizontal. Find the range along the incline (take g = 10 m/s&sup2;).',
              steps: [
                'Angle w.r.t incline: &alpha; = &theta; &minus; &beta; = 60&deg; &minus; 30&deg; = 30&deg;.',
                'Time of Flight: T = 2u&middot;sin&alpha; / (g&middot;cos&beta;) = 2(10)sin(30&deg;) / (10&middot;cos(30&deg;)) = 1 / (&radic;3/2) = 2/&radic;3 seconds.',
                'Incline acceleration: a<sub>x</sub> = &minus;g&middot;sin&beta; = &minus;10&middot;sin(30&deg;) = &minus;5 m/s&sup2;.',
                'Initial velocity along incline: u<sub>x</sub> = u&middot;cos&alpha; = 10&middot;cos(30&deg;) = 5&radic;3 m/s.',
                'Range: R = u<sub>x</sub>&middot;T + &frac12;&middot;a<sub>x</sub>&middot;T&sup2; = 5&radic;3(2/&radic;3) &minus; &frac12;(5)(2/&radic;3)&sup2; = 10 &minus; &frac12;(5)(4/3) = 10 &minus; 10/3 = 20/3 &asymp; 6.67 meters.'
              ],
              insight: 'Incline coordinate projections automatically take gravity component along incline (g&middot;sin&beta;) into account.',
              color: 'border-cyan-500/20 bg-cyan-500/5'
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
              title: 'Vector Algebra',
              desc: 'IAT likes combining unit vectors with kinematics (e.g. position vector given in i and j, find velocity angle).',
              stars: 5,
              color: 'border-violet-500/20 bg-violet-500/5'
            },
            {
              title: 'Peak Velocity in Projectiles',
              desc: 'Remember that horizontal velocity never goes to zero in standard projectile problems.',
              stars: 5,
              color: 'border-rose-500/20 bg-rose-500/5'
            },
            {
              title: 'River Crossing short conditions',
              desc: 'Master the drift equations and heading angles for shortest time vs shortest path crossing.',
              stars: 4,
              color: 'border-cyan-500/20 bg-cyan-500/5'
            },
            {
              title: 'UCM acceleration magnitude',
              desc: 'Magnitude is constant, vector is variable. This distinction separates top rankers in IAT.',
              stars: 4,
              color: 'border-emerald-500/20 bg-emerald-500/5'
            },
          ].map(item => (
            <div key={item.title} className={cn('rounded-2xl border p-4 space-y-2', item.color)}>
              <div className="flex items-center justify-between">
                <h4 className="text-white font-bold text-[14.5px]">{item.title}</h4>
                <FrequencyBadge stars={item.stars} label="" />
              </div>
              <p className="text-white/65 text-[13px] leading-relaxed">{item.desc}</p>
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
