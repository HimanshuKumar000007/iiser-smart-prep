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

// ─── SVG 1: REMOVABLE HOLE vs JUMP DISCONTINUITY ──────────────────────────────
function DiscontinuitySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Removable Discontinuity (Hole) vs Step Jump Discontinuity</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Left Side: Removable Hole */}
        <g transform="translate(10, 0)">
          {/* Axes */}
          <line x1="20" y1="100" x2="130" y2="100" stroke="#334155" strokeWidth="1" />
          <line x1="30" y1="20" x2="30" y2="110" stroke="#334155" strokeWidth="1" />
          {/* Curve with hole */}
          <path d="M 30 90 Q 75 40 120 40" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
          {/* The Hole */}
          <circle cx="75" cy="58" r="3.5" fill="#05060F" stroke="#22d3ee" strokeWidth="1.5" />
          {/* Bypassed Point */}
          <circle cx="75" cy="35" r="3" fill="#eab308" />
          <text x="75" y="112" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">x = a</text>
          <text x="75" y="122" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Removable (Hole)</text>
        </g>

        {/* Right Side: Jump Discontinuity */}
        <g transform="translate(170, 0)">
          {/* Axes */}
          <line x1="20" y1="100" x2="130" y2="100" stroke="#334155" strokeWidth="1" />
          <line x1="30" y1="20" x2="30" y2="110" stroke="#334155" strokeWidth="1" />
          {/* Piece 1 */}
          <path d="M 30 80 L 75 80" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
          <circle cx="75" cy="80" r="3.5" fill="#05060F" stroke="#a78bfa" strokeWidth="1.5" />
          {/* Piece 2 */}
          <path d="M 75 40 L 120 40" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
          <circle cx="75" cy="40" r="3" fill="#a78bfa" />
          <text x="75" y="112" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">x = a</text>
          <text x="75" y="122" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Step Jump</text>
        </g>
      </svg>
    </div>
  );
}

// ─── SVG 2: SQUEEZE (SANDWICH) THEOREM ──────────────────────────────────────
function SqueezeTheoremSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Squeeze (Sandwich) Theorem: f(x) trapped between g(x) and h(x)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Upper bounding curve h(x) */}
        <path d="M 40 20 Q 170 120 300 20" fill="none" stroke="#34d399" strokeWidth="1.5" />
        <text x="50" y="30" fill="#34d399" fontSize="8.5" fontFamily="monospace">Upper h(x)</text>

        {/* Lower bounding curve g(x) */}
        <path d="M 40 100 Q 170 120 300 100" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="50" y="93" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">Lower g(x)</text>

        {/* Trapped function f(x) oscillating */}
        <path d="M 40 60 Q 90 70 120 85 T 170 102 T 220 88 T 300 60" fill="none" stroke="#f43f5e" strokeWidth="1" />
        <circle cx="170" cy="102" r="3.5" fill="#eab308" />
        <text x="180" y="112" fill="#cbd5e1" fontSize="8" fontFamily="monospace" fontWeight="bold">Squeeze Point L</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function LimitsContinuityDetail({ progress, isCompleted, onNavigate }: Props) {
  // Piecewise solver state
  const [lhlVal, setLhlVal] = useState<string>('3');
  const [rhlVal, setRhlVal] = useState<string>('3');

  const lhl = parseFloat(lhlVal) || 0;
  const rhl = parseFloat(rhlVal) || 0;
  const continuous = lhl === rhl;

  // Exponential limit evaluator
  const [coeffK, setCoeffK] = useState<string>('2');
  const kVal = parseFloat(coeffK) || 1;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">📐</span>
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
              Limits and Continuity
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Basic Calculus</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 font-bold">Function Domains</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '20 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (3.0/5)' },
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

      {/* PART 0: ALGEBRAIC PROPERTIES & FUNCTION CONTINUITY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 text-[11px] font-bold">PART 0</span>
          <h2 className="text-white font-display font-bold text-[17px]">Foundational Algebraic Properties &amp; Continuity</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Before applying complex limits, master the core combination rules that govern limits, algebraic continuity combinations, and standard function domains.
        </p>

        {/* Limit Algebra Box */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-3">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Algebra of Limits (Assuming lim f(x) = A and lim g(x) = B)</span>
 <div className="grid sm:grid-cols-2 gap-3.5 text-[12px] text-white/70">
            <div>
              <p className="text-white/40 uppercase text-[9px] mb-0.5">Sum &amp; Difference Rule</p>
              <code>lim [f(x) &plusmn; g(x)] = A &plusmn; B</code>
            </div>
            <div>
              <p className="text-white/40 uppercase text-[9px] mb-0.5">Scalar Product Rule</p>
              <code>lim [c &middot; f(x)] = c &middot; A</code>
            </div>
            <div>
              <p className="text-white/40 uppercase text-[9px] mb-0.5">Product combination Rule</p>
              <code>lim [f(x) &middot; g(x)] = A &middot; B</code>
            </div>
            <div>
              <p className="text-white/40 uppercase text-[9px] mb-0.5">Quotient division Rule</p>
              <code>lim [f(x) / g(x)] = A / B (if B &ne; 0)</code>
            </div>
          </div>
        </div>

        {/* Continuity Algebra Box */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Algebra of Continuous Functions</strong>
          <p>If functions <code>f</code> and <code>g</code> are continuous at <code>x = a</code>, then:</p>
          <div className="pl-4 space-y-1 text-white/80">
            <p>&bull; Sum and Difference <code>f &plusmn; g</code> is continuous at <code>a</code>.</p>
            <p>&bull; Product <code>f &middot; g</code> is continuous at <code>a</code>.</p>
            <p>&bull; Quotient <code>f / g</code> is continuous at <code>a</code> (provided <code>g(a) &ne; 0</code>).</p>
            <p>&bull; Scaled function <code>c &middot; f</code> is continuous at <code>a</code>.</p>
          </div>
        </div>

        {/* Function Domains Box */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Transcendental, Trig &amp; Inverse Continuity</strong>
          <p>&bull; <strong>Exponentials &amp; Logarithms:</strong> <code>eˣ</code> and <code>aˣ</code> are continuous everywhere (<code>&reals;</code>). Logarithmic <code>ln(x)</code> is continuous on <code>(0, &infin;)</code>.</p>
          <p>&bull; <strong>Trigonometric Functions:</strong> <code>sin x</code> and <code>cos x</code> are continuous everywhere (<code>&reals;</code>). Tangent <code>tan x</code> and secant <code>sec x</code> are continuous except at odd multiples of <code>&pi;/2</code>.</p>
          <p>&bull; <strong>Inverse Trigonometric Functions:</strong> <code>arcsin x</code> and <code>arccos x</code> are continuous on <code>[−1, 1]</code>. Inverse tangent <code>arctan x</code> is continuous everywhere (<code>&reals;</code>).</p>
          <p>&bull; <strong>Inverse Theorem:</strong> If a strictly monotonic function is continuous on an interval, its inverse function is also continuous on its range.</p>
        </div>
      </div>

      {/* PART 1: LIMIT EXISTENCE & CONTINUITY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Limit Existence &amp; Continuity</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Limits evaluate local function behavior. Continuity implies that the approaching limit perfectly equals the actual point value.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="LHL = RHL = L"
            use="Existence of a Limit"
            note="LHL and RHL must converge to a single, identical, finite value."
            priority={5}
          />
          <FormulaCard
            formula="lim (x&rarr;a) f(x) = f(a)"
            use="Condition for Continuity"
            note="The approaching limit must exist and be exactly equal to the point value."
            priority={5}
          />
        </div>

        {/* Continuity guidelines */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Continuity &amp; Composite Functions</strong>
          <p>&bull; <strong>Composite Continuity:</strong> If g is continuous at a, and f is continuous at g(a), then composite <code>f(g(x))</code> is continuous at a.</p>
          <p>&bull; <strong>Polynomial Continuity:</strong> Polynomials are continuous for all real numbers (<code>&reals;</code>). Rational functions are continuous strictly in their domains.</p>
        </div>
      </div>

      {/* PART 2: STANDARD LIMITS & THE 1^INF SHORTCUT */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Standard Limits Reference</h2>
        </div>

        {/* Grouped standard limits table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Essential Standard limits reference</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Limit Type</th>
                  <th>Formula Statement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Trigonometric / Inverse</td>
                  <td><code>lim(x&rarr;0) sin(x)/x = lim(x&rarr;0) tan(x)/x = lim(x&rarr;0) arcsin(x)/x = 1</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Trig Cosine squared</td>
                  <td><code>lim(x&rarr;0) (1 − cos x) / x&sup2; = ^1&frasl;_2</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Exponential base e / a</td>
                  <td><code>lim(x&rarr;0) (e<sup>x</sup> − 1)/x = 1 | lim(x&rarr;0) (a<sup>x</sup> − 1)/x = ln(a)</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Logarithmic limit</td>
                  <td><code>lim(x&rarr;0) ln(1 + x) / x = 1</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">Algebraic expansion</td>
                  <td><code>lim(x&rarr;a) (xⁿ − aⁿ)/(x − a) = n &middot; a^(n-1)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 1^inf shortcut card */}
        <div className="grid sm:grid-cols-1 gap-3">
          <FormulaCard
            formula="lim (f(x)^g(x)) = e^(lim [f(x) − 1] &middot; g(x))"
            use="Indeterminate 1^&infin; limit shortcut"
            note="Valid only if lim f(x) = 1 and lim g(x) = &infin;. High-yield JEE/IAT shortcut."
            priority={5}
          />
        </div>
      </div>

      {/* PART 3: DISCONTINUITY CLASSIFICATION & ONE-SIDED LIMITS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">One-Sided Limits &amp; Discontinuity</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Discontinuities occur when limit validations break down. Breakpoint checks govern modulus and step functions.
        </p>
        <DiscontinuitySVG />

        {/* One sided limits table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 One-Sided Limit Behavior Table</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Function Definition</th>
                  <th>Left-Hand Limit (LHL)</th>
                  <th>Right-Hand Limit (RHL)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Greatest Integer Function [x] at integer I</td>
                  <td>I − 1</td>
                  <td>I</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Fractional Part Function {'{x}'} at integer I</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Reciprocal Function 1/x at x = 0</td>
                  <td>−&infin;</td>
                  <td>+&infin;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 4: ALGEBRAIC EVALUATION TOOLBOX */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Algebraic Evaluation Toolbox</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Tougher limits are resolved using rationalization conjugates, Squeeze squeeze traps, or Taylor expansion shortcuts.
        </p>
        <SqueezeTheoremSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="lim (f'(x) / g'(x))"
            use="L'Hôpital's Rule for Indeterminate forms"
            note="Applies ONLY to 0/0 or &infin;/&infin; forms. Differentiate numerator and denominator separately."
            priority={5}
          />
          <FormulaCard
            formula="lim (x&sup2; cos(1/x)) = 0"
            use="Squeeze (Sandwich) Theorem oscillating limit"
            note="Trapper bounds: −x&sup2; <= x&sup2; cos(1/x) <= x&sup2;. Converges to 0 at origin."
            priority={5}
          />
        </div>

        {/* Taylor Expansion Box */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Taylor Expansion Advanced Shortcuts</strong>
            <p>&bull; <code>e<sup>x</sup> = 1 + x + x&sup2;/2! + x&sup3;/3! + ...</code></p>
            <p>&bull; <code>sin(x) = x − x&sup3;/3! + x⁵/5! − ...</code></p>
            <p>&bull; <code>cos(x) = 1 − x&sup2;/2! + x⁴/4! − ...</code></p>
            <p>&bull; <code>ln(1 + x) = x − x&sup2;/2 + x&sup3;/3 − ...</code></p>
          </div>
        </div>
      </div>

      {/* PART 5: INTERMEDIATE VALUE THEOREM (IVT) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Intermediate Value Theorem (IVT)</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The Intermediate Value Theorem establishes boundary coverage values for continuous real functions.
        </p>

 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Intermediate Value Theorem &amp; Root Existence</strong>
          <p>&bull; <strong>Statement:</strong> If f(x) is continuous on closed interval [a, b], it takes every intermediate value between f(a) and f(b).</p>
          <p>&bull; <strong>Opposite Sign Implication:</strong> If <code>f(a) &middot; f(b) &lt; 0</code>, there exists at least one root <code>c</code> in open interval <code>(a, b)</code> such that <code>f(c) = 0</code>.</p>
        </div>
      </div>

      {/* PART 6: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Breakpoint &amp; Exp limit Solver</h2>
        </div>

        {/* Breakpoint Solver */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Piecewise Breakpoint Continuity Evaluator</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Left-Hand Limit (LHL):</label>
 <input type="number" value={lhlVal} onChange={e => setLhlVal(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Right-Hand Limit (RHL):</label>
 <input type="number" value={rhlVal} onChange={e => setRhlVal(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Continuous at breakpoint = <span className={cn('font-bold', continuous ? 'text-emerald-400' : 'text-rose-400')}>{continuous ? 'Yes (LHL = RHL)' : 'No (LHL != RHL)'}</span></p>
          </div>
        </div>

        {/* Exp Solver */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">Exponential Standard Limit Evaluator</span>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Coefficient k in: lim(x&rarr;0) (e^(kx) − 1)/x</label>
 <input type="number" value={coeffK} onChange={e => setCoeffK(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Limit Value = <span className="text-violet-400 font-bold">{kVal.toFixed(3)}</span></p>
            <p>&bull; Step: Scaled denominator creates <code>k &middot; [ (e^(kx) − 1) / (kx) ] = k &middot; 1 = k</code>.</p>
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
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 1: Breakpoint unknowns solving</span>
          <p className="text-white/80">Evaluate the value of k if f(x) is continuous at x = 0: f(x) = sin(3x)/x for x &ne; 0, and f(0) = k.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Since f(x) is continuous, we must have: <code>lim(x&rarr;0) f(x) = f(0) = k</code>.</p>
            <p>2. Evaluate limit: <code>lim(x&rarr;0) sin(3x)/x = lim(x&rarr;0) 3 &middot; [ sin(3x) / 3x ] = 3 &middot; 1 = 3</code>.</p>
            <p className="text-cyan-300 font-bold">k = 3</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 2: Conjugate rationalization limit</span>
          <p className="text-white/80">Evaluate the limit lim(x&rarr;0) [ &radic;(1 + x) − 1 ] / x.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify the 0/0 form. Multiply numerator and denominator by conjugate: <code>&radic;(1 + x) + 1</code>.</p>
            <p>2. Expand numerator: <code>(1 + x) − 1 = x</code>.</p>
            <p>3. Cancel x: <code>lim(x&rarr;0) 1 / [ &radic;(1 + x) + 1 ] = 1 / 2</code>.</p>
            <p className="text-cyan-300 font-bold">Limit = 1/2</p>
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
            { cue: '"Evaluate limit of f(x)^g(x) yielding 1^&infin;"', think: "Apply the exponential shortcut e^(lim [f(x)-1] &middot; g(x)) directly." },
            { cue: '"Check continuity of piecewise step function at breakpoint"', think: "Equate Left-Hand Limit (LHL) and Right-Hand Limit (RHL) and the defined value at that point." },
            { cue: '"Limit containing square root differences..."', think: "Multiply by the numerator's conjugate to rationalize the expressions." },
            { cue: '"Limit of oscillatory expression x&sup2; sin(1/x) at origin"', think: "Bound the oscillation using Squeeze (Sandwich) theorem between &plusmn;x&sup2; to show limit is 0." },
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
          <TrapCard title="Trap 1: Blind L'Hôpital rule scaling">'Hôpital'
            Never apply Ls rule if the limit is not in a 0/0 or &infin;/&infin; indeterminate form. Plugging into a determinate form yields incorrect values.
          </TrapCard>
          <TrapCard title="Trap 2: Subscript limits outside real domain bounds">
            Do not evaluate one-sided limits over domain areas where the function is undefined. For example, the LHL for <code>&radic;x</code> at x = 0 is imaginary.
          </TrapCard>
          <TrapCard title="Trap 3: GIF integer discontinuity breakpoints">
            Greatest Integer Function <code>f(x) = [x]</code> is discontinuous at **every single integer**. Remember to check integers during piecewise bounds calculations.
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
            "Existence: LHL = RHL",
            "Continuity: LHL = RHL = f(a)",
            "Standard Trig: lim sin(x)/x = lim tan(x)/x = 1",
            "Standard Trig inverse: lim arcsin(x)/x = 1",
            "Cosine fraction: lim (1 − cos x)/x&sup2; = 1/2",
            "Exp e/a limits: lim (e^x − 1)/x = 1 | lim (a^x − 1)/x = ln a",
            "Log limit: lim ln(1+x)/x = 1",
            "1^&infin; form: e^(lim [f(x)−1] &middot; g(x))",
            "Removable discontinuity has defined limit value",
            "Jump discontinuity: LHL != RHL",
            "Greatest Integer Function discontinuous at integers",
            "Fractional Part Function discontinuous at integers",
            "Reciprocal function 1/x LHL is −&infin;, RHL is +&infin;",
            "Composite function continuity rule",
            "Rationalization conjugate multiplication trick",
            "Squeeze Theorem trapping criteria",
            "L'Hôpital rule for 0/0 or &infin;/&infin; derivatives",
            "Taylor Expansions: e^x, sin x, cos x, ln(1+x)",
            "IVT opposite sign root existence: f(a)·f(b) < 0",
            "Polynomials continuous for all real numbers"
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
