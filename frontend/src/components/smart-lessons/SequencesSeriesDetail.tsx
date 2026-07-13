import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function MathFraction({ num, den }: { num: React.ReactNode; den: React.ReactNode }) {
  return (
 <span className="inline-flex flex-col items-center align-middle mx-1.5">
      <span className="text-[13px] pb-0.5 border-b border-white/20 text-center w-full px-1.5">{num}</span>
      <span className="text-[12px] pt-0.5 text-center w-full px-1.5">{den}</span>
    </span>
  );
}

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
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
      <p className="font-mono text-cyan-300 font-bold text-[14.5px]" dangerouslySetInnerHTML={{ __html: formula }} />
      <p className="text-white/80 text-[11px]"><strong className="text-white/40">Use:</strong> <span dangerouslySetInnerHTML={{ __html: use }} /></p>
      <p className="text-white/55 text-[11px]"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        <span className="text-[11px] font-black text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

// ─── SVG 1: AP vs GP GROWTH CURVES ───────────────────────────────────────────
function APGPGrowthSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Linear AP growth (d=4) vs Exponential GP growth (r=1.5)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Grid axes */}
        <line x1="20" y1="100" x2="320" y2="100" stroke="#334155" strokeWidth="1" />
        <line x1="30" y1="10" x2="30" y2="110" stroke="#334155" strokeWidth="1" />

        {/* Linear AP (Cyan) */}
        <line x1="30" y1="90" x2="280" y2="40" stroke="#22d3ee" strokeWidth="2" />
        <text x="285" y="45" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">AP (Linear)</text>

        {/* Exponential GP (Violet) */}
        <path d="M 30 95 Q 150 90 260 20" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="265" y="25" fill="#a78bfa" fontSize="8.5" fontFamily="monospace">GP (Exponential)</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: INFINITE GP CONVERGENCE ─────────────────────────────────────────
function InfiniteGPConvergenceSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Convergence of S_&infin; = a / (1 − r) for |r| &lt; 1</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Convergence limit line */}
        <line x1="20" y1="30" x2="320" y2="30" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="310" y="25" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="end">S_&infin; = Limit</text>

        {/* Curve of partial sums */}
        <path d="M 30 100 Q 120 40 280 32" fill="none" stroke="#34d399" strokeWidth="2" />
        <circle cx="30" cy="100" r="2.5" fill="#34d399" />
        <circle cx="90" cy="70" r="2.5" fill="#34d399" />
        <circle cx="170" cy="45" r="2.5" fill="#34d399" />
        <circle cx="250" cy="34" r="2.5" fill="#34d399" />

        <text x="35" y="110" fill="#cbd5e1" fontSize="7" fontFamily="monospace">S₁</text>
        <text x="95" y="80" fill="#cbd5e1" fontSize="7" fontFamily="monospace">S₂</text>
        <text x="175" y="55" fill="#cbd5e1" fontSize="7" fontFamily="monospace">S₃</text>
        <text x="255" y="44" fill="#cbd5e1" fontSize="7" fontFamily="monospace">S<sub>n</sub></text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function SequencesSeriesDetail({ progress, isCompleted, onNavigate }: Props) {
  // GP Converter state
  const [gpA, setGpA] = useState<string>('4');
  const [gpR, setGpR] = useState<string>('0.5');

  const fa = parseFloat(gpA) || 0;
  const fr = parseFloat(gpR) || 0;
  const isConvergent = Math.abs(fr) < 1;
  const gpSum = isConvergent ? fa / (1 - fr) : Infinity;

  // AM-GM optimization state
  const [numX, setNumX] = useState<string>('8');
  const [numY, setNumY] = useState<string>('2');

  const nx = parseFloat(numX) || 0;
  const ny = parseFloat(numY) || 0;

  const am = (nx + ny) / 2;
  const gm = Math.sqrt(nx * ny);
  const hm = (nx + ny) > 0 ? (2 * nx * ny) / (nx + ny) : 0;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">📊</span>
              <Tag color="cyan">Math Unit 3</Tag>
              <Tag color="rose">IAT Core Framework</Tag>
              <Tag color="amber">High Yield</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Sequences and Series
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Basic Algebra</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 font-bold">Summations &amp; Sigma notation</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '20 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Easy (2.5/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-white/40">
              <span className="uppercase tracking-wider">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[11px] text-white/35 font-medium">
              {isCompleted ? 'Reading Completed — Quiz Unlocked! 🔓' : 'Scroll to complete the lesson and unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

      {/* PART 1: ARITHMETIC PROGRESSION (AP) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Arithmetic Progression (AP)</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          An Arithmetic Progression grows linearly. Successive terms differ by a constant difference d.
        </p>
        <APGPGrowthSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="t_n = a + (n − 1)d"
            use="nth term of an AP"
            note="a is first term, d is common difference. Linear growth tracker."
            priority={5}
          />
          <FormulaCard
            formula="S_n = (n/2)[2a + (n − 1)d] = (n/2)(a + l)"
            use="Sum of n terms of an AP"
            note="l represents the final term. Average is (a+l)/2, sum is average * n."
            priority={5}
          />
        </div>

        {/* AM Insertion & Shortcuts */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 AP Shortcuts &amp; Insertion of AMs</strong>
          <p>&bull; <strong>Insertion of n AMs:</strong> Inserted between a and b. Common difference is: <code>d = (b − a) / (n + 1)</code>.</p>
          <p>&bull; <strong>Term Selection:</strong>
            <br />
            - 3 terms: <code>a − d, a, a + d</code> (Sum equals 3a).
            <br />
            - 4 terms: <code>a − 3d, a − d, a + d, a + 3d</code> (Common difference is 2d).
          </p>
        </div>
      </div>

      {/* PART 2: GEOMETRIC PROGRESSION (GP) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Geometric Progression (GP)</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A Geometric Progression grows exponentially. Successive terms scale by a constant ratio r.
        </p>
        <InfiniteGPConvergenceSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="t_n = a &middot; r^(n−1)"
            use="nth term of a GP"
            note="a is first term, r is common ratio. Recurrence: a_n = r &middot; a_(n-1)."
            priority={5}
          />
          <FormulaCard
            formula="S_n = a(1 − rⁿ) / (1 − r)"
            use="Sum of Finite GP"
            note="Valid for r ≠ 1. If r = 1, sum collapses simply to S_n = n &middot; a."
            priority={5}
          />
          <FormulaCard
            formula="S_&infin; = a / (1 − r)"
            use="Sum of Infinite GP"
            note="Strictly valid only if |r| < 1. If |r| >= 1, the infinite sum diverges."
            priority={5}
          />
        </div>

        {/* GP Insertion & Alternate Cancellation */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 GP Insertion &amp; Special Cases</strong>
          <p>&bull; <strong>Insertion of n GMs:</strong> Inserted between a and b. Common ratio is: <code>r = (b/a)^(1/(n+1))</code>.</p>
          <p>&bull; <strong>Alternate Cancellation:</strong> If <code>r = −1</code>, finite GP sum alternates: <code>S<sub>n</sub> = a</code> (n odd), and <code>S<sub>n</sub> = 0</code> (n even).</p>
        </div>
      </div>

      {/* PART 3: HARMONIC PROGRESSION & RELATIONSHIPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Harmonic Progression (HP) &amp; Means</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Terms are in HP if their reciprocals form an AP. The means (AM, GM, HM) satisfy standard bounds.
        </p>

        {/* Means Formula Box */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-center">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider block">Arithmetic Mean (AM)</span>
            <code className="text-white font-mono text-[13px]">(a + b) / 2</code>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-center">
            <span className="text-[10px] font-black text-violet-400 uppercase tracking-wider block">Geometric Mean (GM)</span>
            <code className="text-white font-mono text-[13px]">&radic;(ab)</code>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-center">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">Harmonic Mean (HM)</span>
            <code className="text-white font-mono text-[13px]">2ab / (a + b)</code>
          </div>
        </div>

        {/* Inequality relation */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 AM &ge; GM &ge; HM Inequality</strong>
            <p>&bull; For positive real numbers: <code>AM &ge; GM &ge; HM</code>. Equality holds <strong>only</strong> if <code>a = b</code>.</p>
            <p>&bull; If a, b, c are in HP: <code>2/b = 1/a + 1/c &rArr; b = 2ac / (a + c)</code>.</p>
          </div>
        </div>
      </div>

      {/* PART 4: AGP & SIGMA RULES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">AGP &amp; Sigma Rules</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Arithmetico-Geometric Progressions (AGP) combine AP and GP terms. Sigma rules handle limits and partitions.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="S_&infin; = a/(1−r) + dr/(1−r)²"
            use="Sum of Infinite AGP"
            note="Valid for |r| < 1. If solved finite, multiply by r, shift right and subtract."
            priority={5}
          />
          <FormulaCard
            formula="&Sigma;(ca_n) = c &Sigma;a_n"
            use="Sigma Coefficient Rule"
            note="Allows constant multipliers to be pulled outside of summations."
            priority={5}
          />
        </div>
      </div>

      {/* PART 5: SPECIAL SERIES & TELESCOPING */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Special Series &amp; Telescoping</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Special summations track sum of squares, cubes, odd/even terms, and telescoping fractions.
        </p>

        {/* Sum tables */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Standard Series Summations Reference</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Series Type</th>
                  <th>Sum Formula (S<sub>n</sub>)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">First n natural numbers</td>
                  <td>n(n + 1) / 2</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Sum of Squares</td>
                  <td>n(n + 1)(2n + 1) / 6</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Sum of Cubes</td>
                  <td>[ n(n + 1) / 2 ]&sup2;</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">First n Odd Numbers</td>
                  <td>n&sup2;</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">First n Even Numbers</td>
                  <td>n(n + 1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Telescoping fractions */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Telescoping Partial Fraction Identities</strong>
            <p>&bull; <code>1 / (n(n + 1)) = 1/n − 1/(n + 1)</code>.</p>
            <p>&bull; <code>1 / ((n + 1)(n + 2)) = 1/(n + 1) − 1/(n + 2)</code>.</p>
            <p>&bull; <code>1 / (n(n + 2)) = ^1&frasl;_2 [ 1/n − 1/(n + 2) ]</code>.</p>
          </div>
        </div>
      </div>

      {/* PART 6: AP vs GP COMPARISON REFERENCE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 6</span>
          <h2 className="text-white font-display font-bold text-[17px]">AP vs GP Comparison Reference</h2>
        </div>

        <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40">
                <th className="py-2">Property</th>
                <th>AP</th>
                <th>GP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              <tr className="hover:bg-white/[0.01]">
                <td className="py-2 text-cyan-400 font-bold">Constant Parameter</td>
                <td>Difference: <code>d = t<sub>n</sub> − t_(n-1)</code></td>
                <td>Ratio: <code>r = t<sub>n</sub> / t_(n-1)</code></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="py-2 text-violet-400 font-bold">Growth Profile</td>
                <td>Linear growth (Simple Interest)</td>
                <td>Exponential growth (Compound)</td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="py-2 text-emerald-400 font-bold">Sum Characteristic</td>
                <td>Quadratic in n</td>
                <td>Exponential in n</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PART 7: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">GP Convergence &amp; Means Solver</h2>
        </div>

        {/* GP Solver */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Infinite GP Sum Evaluator</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">First Term (a):</label>
 <input type="number" value={gpA} onChange={e => setGpA(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Common Ratio (r):</label>
 <input type="number" value={gpR} onChange={e => setGpR(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Convergent = <span className={cn('font-bold', isConvergent ? 'text-emerald-400' : 'text-rose-400')}>{isConvergent ? 'Yes (|r| < 1)' : 'No (|r| >= 1)'}</span></p>
            <p>&bull; Infinite Sum (S_&infin;) = <span className="text-cyan-400 font-bold">{gpSum.toString()}</span></p>
          </div>
        </div>

        {/* Means Solver */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">AM-GM-HM Inequality Checker</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Value x (positive):</label>
 <input type="number" value={numX} onChange={e => setNumX(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Value y (positive):</label>
 <input type="number" value={numY} onChange={e => setNumY(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1.5">
            <p>&bull; AM = <span className="text-cyan-400 font-bold">{am.toFixed(3)}</span></p>
            <p>&bull; GM = <span className="text-violet-400 font-bold">{gm.toFixed(3)}</span></p>
            <p>&bull; HM = <span className="text-emerald-400 font-bold">{hm.toFixed(3)}</span></p>
            <p>&bull; Verification: <span className="text-amber-400 font-bold">{am >= gm && gm >= hm ? 'AM >= GM >= HM Verified! ✓' : 'Invalid values'}</span></p>
          </div>
        </div>
      </div>

      {/* SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 1: AM-GM Inequality Optimization</span>
          <p className="text-white/80">Find the minimum value of (x + 1/x) for x &gt; 0.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Apply AM &ge; GM on positive terms: <code>(x + 1/x) / 2 &ge; &radic;(x &middot; 1/x)</code>.</p>
            <p>2. Simplify: <code>(x + 1/x) / 2 &ge; 1 &rArr; x + 1/x &ge; 2</code>.</p>
            <p>3. Equality holds when <code>x = 1/x &rArr; x = 1</code>.</p>
            <p className="text-cyan-300 font-bold">Minimum value = 2</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 2: Telescoping series expansion</span>
          <p className="text-white/80">Sum the series: 1/(1&middot;2) + 1/(2&middot;3) + ... + 1/(n(n+1)).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Rewrite general term: <code>1 / (k(k + 1)) = 1/k − 1/(k + 1)</code>.</p>
            <p>2. Write partial sums: <code>(1 − 1/2) + (1/2 − 1/3) + ... + (1/n − 1/(n+1))</code>.</p>
            <p>3. Alternate terms cancel: <code>1 − 1/(n+1) = n / (n + 1)</code>.</p>
            <p className="text-cyan-300 font-bold">Sum = n / (n + 1)</p>
          </div>
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"Find the minimum value of positive expression..."', think: "Immediately think of the AM >= GM inequality. If needed, split terms (like x² + 1/x + 1/x) to eliminate x." },
            { cue: '"Given sum Sn = An² + Bn, find common difference"', think: "Sn is quadratic in n, representing an AP. The common difference is exactly 2A." },
            { cue: '"Series combines linear term and ratio term..."', think: "Identify as Arithmetico-Geometric Progression (AGP). Solve by multiplying S by r, shifting right and subtracting." },
            { cue: '"Sum containing 1/(n(n+2)) terms..."', think: "Apply partial fractions telescoping: 1/2 [1/n − 1/(n+2)], then cancel intermediate terms." },
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

      {/* COMMON TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: The Infinite GP ratio bounds">
            Do not calculate the sum of infinite GP for values where <code>|r| &ge; 1</code>. The convergence formula <code>S_&infin; = a / (1 − r)</code> is mathematically invalid for diverging series.
          </TrapCard>
          <TrapCard title="Trap 2: AM-GM bound strictly positive check">
            Never apply the <code>AM &ge; GM</code> inequality if terms can take negative values. For negative numbers, GM can be imaginary, and inequality signs can reverse.
          </TrapCard>
          <TrapCard title="Trap 3: Sigma bounds indexing errors">
            If summing squares like <code>3&sup2; + 4&sup2; + ... + 10&sup2;</code>, do not plug <code>n = 10</code> directly into the summation formula. You must subtract the missing starting terms: <code>&Sigma;_(k=1)^10 k&sup2; − (1&sup2; + 2&sup2;)</code>.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
 <h3 className="text-cyan-400 font-display font-bold text-[17px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "AP nth term: t_n = a + (n−1)d",
            "AP Sum: S_n = (n/2)[2a + (n−1)d]",
            "Average * Terms sum shortcut for AP series",
            "Insert n AMs: common difference d = (b−a) / (n+1)",
            "3 AP terms: a-d, a, a+d | 4 AP terms: a-3d, a-d, a+d, a+3d",
            "GP nth term: t_n = a * r^(n−1)",
            "GP Sum: S_n = a(1−r^n) / (1−r)",
            "Infinite GP sum: S_&infin; = a / (1−r) strictly for |r| < 1",
            "Insert n GMs: common ratio r = (b/a)^(1/(n+1))",
            "Recurrence relation format: a_n = r * a_(n-1)",
            "HP Definition: terms reciprocals form an AP",
            "HP term relation: b = 2ac / (a+c) if in HP",
            "Means bounds relation: AM &ge; GM &ge; HM for positive values",
            "Sum of Infinite AGP: S_&infin; = a/(1−r) + dr/(1−r)²",
            "Sum of first n odd numbers: 1 + 3 + ... = n²",
            "Sum of first n even numbers: 2 + 4 + ... = n(n+1)",
            "Sum of natural numbers: n(n+1) / 2",
            "Sum of squares: n(n+1)(2n+1) / 6",
            "Sum of cubes: [n(n+1)/2]²",
            "Telescoping partial fraction: 1/(n(n+1)) = 1/n − 1/(n+1)"
          ].map(item => (
            <div key={item} className="flex items-start gap-2 text-[13px] text-white/70 py-1 border-b border-white/[0.04] last:border-0">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
