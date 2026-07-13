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

// ─── SVG 1: LAGRANGE MEAN VALUE THEOREM (LMVT) ──────────────────────────────
function LagrangeMvtSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Lagrange MVT: parallel tangent slope (f'(c)) equals secant slope</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Curve f(x) */}
        <path d="M 40 90 Q 150 10 300 40" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        <circle cx="40" cy="90" r="3" fill="#22d3ee" />
        <circle cx="300" cy="40" r="3" fill="#22d3ee" />

        {/* Secant chord */}
        <line x1="40" y1="90" x2="300" y2="40" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="35" y="98" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">A(a, f(a))</text>
        <text x="305" y="45" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">B(b, f(b))</text>

        {/* Parallel tangent */}
        <line x1="100" y1="48" x2="220" y2="25" stroke="#eab308" strokeWidth="1.5" />
        <circle cx="160" cy="36" r="3" fill="#eab308" />
        <text x="160" y="52" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace" textAnchor="middle">C(c, f(c))</text>
        <text x="210" y="20" fill="#eab308" fontSize="8" fontFamily="monospace" fontWeight="bold">Tangent || Secant</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: EXTREMA, CONCAVITY & INFLECTION ──────────────────────────────────
function CurveExtremaSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Extrema, Concavity directions &amp; Inflection Point (f(c) = 0)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* S-shaped curve */}
        <path d="M 40 90 Q 110 10 170 60 T 300 30" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
        
        {/* Local Maxima */}
        <circle cx="105" cy="34" r="3" fill="#f43f5e" />
        <text x="105" y="24" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">'=0)</text>

        {/* Inflection Point */}
        <circle cx="170" cy="60" r="3" fill="#eab308" />
        <text x="170" y="75" fill="#eab308" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Inflection (f''=0)</text>

        {/* Local Minima */}
        <circle cx="235" cy="50" r="3" fill="#34d399" />
        <text x="235" y="40" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Local Min (f'Local Max (f=0)</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function DifferentiationAoDDetail({ progress, isCompleted, onNavigate }: Props) {
  // Tangent/Normal calculator state
  const [pointX0, setPointX0] = useState<string>('2');
  const [slopeF, setSlopeF] = useState<string>('4');

  const x0 = parseFloat(pointX0) || 0;
  const mt = parseFloat(slopeF) || 0;

  const mn = mt !== 0 ? -1 / mt : Infinity;
  // Let y0 = x0^2 for demonstration
  const y0 = x0 * x0;

  // Logarithmic solver
  const [baseVal, setBaseVal] = useState<string>('2');
  const bv = parseFloat(baseVal) || 2;
  const derivativeVal = bv * Math.log(bv); // derivative of x^x at x=2 is x^x(1+ln x) = 4(1+ln 2)

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
              Differentiation and AoD
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Limits &amp; Continuity</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 font-bold">Function Slopes</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '3-4 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Hard (4.0/5)' },
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

      {/* PART 1: DEFINITIONS & COMBINATION RULES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Definitions &amp; Combination Rules</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The derivative measures local instantaneous rates of change. Differentiation rules govern combination algebra, parametric vectors, and implicit derivatives.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="f'(x) = lim (h&rarr;0) [f(x+h) − f(x)] / h"
            use="Limit definition of a derivative"
            note="First principles track slope limit delta approaches zero."
            priority={5}
          />
          <FormulaCard
            formula="(u &plusmn; v)' = u' &plusmn; v'"
            use="Sum and Difference Rule"
            note="Basic algebraic linearity rule: differentiate terms independently."
            priority={5}
          />
          <FormulaCard
            formula="(uv)' = u &middot; v' + v &middot; u'"
            use="Product rule for differentiation"
            note="Successive evaluation keeps one term static, differentiates the other."
            priority={5}
          />
          <FormulaCard
            formula="(u / v)' = [v &middot; u' − u &middot; v'] / v&sup2;"
            use="Quotient rule for differentiation"
            note="Numerator difference scaled over squared denominator. Valid for v &ne; 0."
            priority={5}
          />
          <FormulaCard
            formula="(f(g(x)))' = f'(g(x)) &middot; g'(x)"
            use="Chain rule for composite functions"
            note="Inner function derivative scales the outer derivative multiplier."
            priority={5}
          />
          <FormulaCard
            formula="dy/dx = (dy/dt) / (dx/dt)"
            use="Parametric Differentiation"
            note="Used when x and y are given in terms of a parameter t. dx/dt cannot be zero."
            priority={5}
          />
          <FormulaCard
            formula="y' = y &middot; [g'(x) ln f(x) + g(x) f'(x)/f(x)]"
            use="Logarithmic Differentiation for f(x)^g(x)"
            note="Derived by taking natural log of both sides, followed by implicit differentiation."
            priority={5}
          />
          <FormulaCard
            formula="y'' = d/dx(dy/dx) = d²y/dx²"
            use="Second Order Derivative"
            note="The derivative of the derivative. Geometrically measures the rate of change of slope."
            priority={5}
          />
        </div>

        {/* Leibniz & Inverse Rule */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Higher Successive &amp; Leibniz Rules</strong>
          <p>&bull; <strong>Successive Derivative:</strong> Higher rates computed sequentially as: <code>y', y'', y''' ...</code>.</p>
          <p>&bull; <strong>Leibniz Product Rule:</strong> For n-th derivative of product: <code>(uv)⁽ⁿ⁾ = &Sigma; (n Cr) u⁽ⁿ&macr;ʳ⁾ v⁽ʳ⁾</code>.</p>
          <p>&bull; <strong>Inverse Function Derivative:</strong> <code>(f&macr;¹)'(x) = 1 / f'(f&macr;¹(x))</code>. Highly useful for inverse mappings.</p>
        </div>
      </div>

      {/* PART 2: STANDARD DERIVATIVES & SHORTCUTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Standard Derivatives &amp; Shortcuts</h2>
        </div>

        {/* Standard derivatives reference */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Standard Function Derivatives reference</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Function Definition</th>
                  <th>Derivative Statement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Algebraic / Logarithmic</td>
                  <td><code>(xⁿ)' = n &middot; x^(n-1) | (ln x)' = 1/x</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Exponentials base e / a</td>
                  <td><code>(e^x)' = e^x | (a^x)' = a^x &middot; ln(a)</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Trig sine / cosine / tangent</td>
                  <td><code>(sin x)' = cos x | (cos x)' = −sin x | (tan x)' = sec&sup2; x</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Trig cotangent / secant / cosecant</td>
                  <td><code>(cot x)' = −csc&sup2; x | (sec x)' = sec x tan x | (csc x)' = −csc x cot x</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">Inverse Trigonometrics</td>
                  <td><code>(arcsin x)' = 1 / &radic;(1 − x&sup2;) | (arctan x)' = 1 / (1 + x&sup2;)</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Hyperbolic sinh / cosh</td>
                  <td><code>(sinh x)' = cosh x | (cosh x)' = sinh x</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Memory Trick Alert */}
 <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-[12px] text-white/70">
          💡 <strong>Memory Trick:</strong> Derivatives of all <strong>"CO-"</strong> functions (cosine, cotangent, cosecant) are strictly negative!
        </div>

        {/* Derivative Shortcuts */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Quick Evaluation Shortcuts</strong>
          <div className="grid sm:grid-cols-2 gap-2 text-white/80">
            <p>&bull; <code>(uⁿ)' = n &middot; u^(n-1) &middot; u'</code></p>
            <p>&bull; <code>(&radic;u)' = u' / (2&radic;u)</code></p>
            <p>&bull; <code>(ln u)' = u' / u</code></p>
            <p>&bull; <code>(e^u)' = e^u &middot; u'</code></p>
          </div>
        </div>
      </div>

      {/* PART 3: TANGENTS & NORMALS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Tangents, Normals &amp; Rates</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The tangent lines align parallel to instantaneous slope limits, while normal lines stand orthogonal to the curve boundaries.
        </p>

        {/* Tangents Normals equations table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Tangents &amp; Normals parameters Summary</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Line Type</th>
                  <th>Slope Formula (m)</th>
                  <th>Equation (Point-slope form)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Tangent line</td>
                  <td><code>m_T = f'(x_0)</code></td>
                  <td><code>y − y_0 = m_T(x − x_0)</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Normal line</td>
                  <td><code>m_N = −1 / f'(x_0)</code></td>
                  <td><code>y − y_0 = m_N(x − x_0)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Implicit differentiation */}
        <div className="grid sm:grid-cols-2 gap-4">
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
            <strong className="text-white text-[13px] block mb-1">🔑 Implicit Differentiation Formula</strong>
            <p>For implicit relation <code>F(x, y) = 0</code>, differentiate both sides with respect to x:</p>
            <code>dy/dx = −( &part;F/&part;x ) / ( &part;F/&part;y )</code>.
          </div>
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
            <strong className="text-white text-[13px] block mb-1">🔑 Rate of Change &amp; Related Rates</strong>
            <p>If two variables x and y depend on time t, their rates of change are related by the chain rule:</p>
            <code>dy/dt = (dy/dx) &middot; (dx/dt)</code>.
            <br />
            <span className="text-[10px] text-white/40 block mt-1">Example: Sphere Volume: V = 4/3 &pi; r&sup3; &rArr; dV/dt = 4&pi; r&sup2; &middot; (dr/dt).</span>
          </div>
        </div>
      </div>

      {/* PART 4: MONOTONICITY & EXTREMA TESTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Monotonicity &amp; Extrema Tests</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Monotonicity tests define whether a function is growing or shrinking. Extrema and concavity tests isolate maximums, minimums, and inflection breakpoints.
        </p>
        <CurveExtremaSVG />

        {/* Monotonicity and Extrema Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="f'(x) > 0 on (a, b) &rArr; Strictly Increasing"
            use="Strict Monotonic Growth test"
            note="The tangent slope is strictly positive. Function values increase from left to right."
            priority={5}
          />
          <FormulaCard
            formula="f'(x) < 0 on (a, b) &rArr; Strictly Decreasing"
            use="Strict Monotonic Decay test"
            note="The tangent slope is strictly negative. Function values decrease from left to right."
            priority={5}
          />
          <FormulaCard
            formula="f''(c) < 0 at f'(c)=0 &rArr; Local Maxima"
            use="Second derivative test criteria"
            note="Slope changes from positive to negative. Concavity faces downward."
            priority={5}
          />
          <FormulaCard
            formula="f''(c) > 0 at f'(c)=0 &rArr; Local Minima"
            use="Second derivative test criteria"
            note="Slope changes from negative to positive. Concavity faces upward."
            priority={5}
          />
        </div>

        {/* Inflection & Concavity */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Concavity &amp; Inflection Point Conditions</strong>
            <p>&bull; <strong>Concavity Upward:</strong> <code>f''(x) &gt; 0</code>. <strong>Concavity Downward:</strong> <code>f''(x) &lt; 0</code>.</p>
            <p>&bull; <strong>Inflection Point:</strong> A point where <code>f''(c) = 0</code> (necessary condition) AND concavity changes sign (sufficient condition).</p>
          </div>
        </div>
      </div>

      {/* PART 5: ROLLE'S & MEAN VALUE THEOREMS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Rolle's &amp; Mean Value Theorems</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Mean Value Theorems guarantee point slopes inside differentiable intervals.
        </p>
        <LagrangeMvtSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="f'(c) = 0"
            use="Rolle's Theorem statement"
            note="Requires continuous [a,b], differentiable (a,b), and boundary equality f(a) = f(b)."
            priority={5}
          />
          <FormulaCard
            formula="f'(c) = [f(b) − f(a)] / (b − a)"
            use="Lagrange Mean Value Theorem slope"
            note="Tangents must run parallel to endpoints secant chord at intermediate point c."
            priority={5}
          />
        </div>
      </div>

      {/* PART 6: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Tangents &amp; Logarithmic Solver</h2>
        </div>

        {/* Tangents Solver */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Tangent &amp; Normal line equations solver</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Point coordinate x₀:</label>
 <input type="number" value={pointX0} onChange={e => setPointX0(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Slope of tangent f'(x₀):</label>
 <input type="number" value={slopeF} onChange={e => setSlopeF(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Point: <code>(x₀, y₀) = ({x0}, {y0.toFixed(2)})</code></p>
            <p>&bull; Normal slope: <span className="text-cyan-400 font-bold">{mn.toFixed(3)}</span></p>
            <p>&bull; Tangent Eq: <code>y − {y0.toFixed(2)} = {mt} &middot; (x − {x0})</code></p>
            <p>&bull; Normal Eq: <code>y − {y0.toFixed(2)} = {mn.toFixed(3)} &middot; (x − {x0})</code></p>
          </div>
        </div>

        {/* Logarithmic derivative Solver */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">Logarithmic Differentiation Checker: (x^x)'</span>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Evaluate derivative at positive value x:</label>
 <input type="number" value={baseVal} onChange={e => setBaseVal(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Base x = <span className="text-violet-400 font-bold">{bv}</span></p>
            <p>&bull; Formula: <code>d/dx(x^x) = x^x &middot; (1 + ln x)</code></p>
            <p>&bull; Evaluation = <span className="text-emerald-400 font-bold">{(Math.pow(bv, bv) * (1 + Math.log(bv))).toFixed(3)}</span></p>
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
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 1: Parametric Second Derivative Trap</span>
          <p className="text-white/80">Find d&sup2;y/dx&sup2; if x = cos t, y = sin t at t = &pi;/4.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. First derivatives: <code>dx/dt = −sin t</code>, <code>dy/dt = cos t</code>.</p>
            <p>2. dy/dx = <code>(cos t) / (−sin t) = −cot t</code>.</p>
            <p>3. d&sup2;y/dx&sup2; = <code>d/dt(−cot t) &middot; dt/dx = csc&sup2; t &middot; [ 1 / (−sin t) ] = −csc&sup3; t</code>.</p>
            <p>4. At t = &pi;/4: <code>−(&radic;2)&sup3; = −2&radic;2</code>.</p>
            <p className="text-cyan-300 font-bold">Correct derivative = −2&radic;2</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 2: Rolle's theorem validation</span>
          <p className="text-white/80">Verify Rolle's theorem for f(x) = x&sup2; − 4x + 3 in interval [1, 3].</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. f(x) is polynomial &rArr; continuous on [1, 3] and differentiable on (1, 3).</p>
            <p>2. Check boundaries: <code>f(1) = 1 − 4 + 3 = 0</code>, <code>f(3) = 9 − 12 + 3 = 0</code> (f(1) = f(3)).</p>
            <p>3. Differentiate: <code>f'(x) = 2x − 4</code>. Set equal to 0: <code>2c − 4 = 0 &rArr; c = 2</code>.</p>
            <p>4. Value <code>c = 2</code> lies inside (1, 3).</p>
            <p className="text-cyan-300 font-bold">Rolle's Theorem verified at c = 2</p>
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
            { cue: '"Evaluate parametric second derivative d²y/dx²..."', think: "Differentiate dy/dx with respect to t, then scale by dt/dx. Avoid dividing d²y/dt² by d²x/dt²." },
            { cue: '"Find inflection points of a transcendental graph"', think: "Set f''(x) = 0 and solve. Ensure that concavity actually changes sign across the critical point." },
            { cue: '"Identify tangents parallel to secant chords on interval [a,b]"', think: "Apply the Lagrange Mean Value Theorem (LMVT): f'(c) = [f(b)-f(a)]/(b-a)." },
            { cue: '"Rate of change of volume or sphere surface leak..."', think: "Express equations in single variables and apply implicit differentiation with respect to time t." },
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
          <TrapCard title="Trap 1: Parametric second derivative fractions">
            Do not write <code>d&sup2;y/dx&sup2; = (d&sup2;y/dt&sup2;) / (d&sup2;x/dt&sup2;)</code>. This is a fatal notation error. Differentiate <code>dy/dx</code> with respect to <code>t</code>, then multiply by <code>dt/dx</code>.
          </TrapCard>
          <TrapCard title="Trap 2: Boundary interval extrema checks">
            For global/absolute extrema on closed interval <code>[a, b]</code>, the absolute max or min can occur at endpoints where <code>f'(x) &ne; 0</code>. Always test boundary values.
          </TrapCard>
          <TrapCard title="Trap 3: Inflection point verification errors">
            Setting <code>f''(x) = 0</code> does not guarantee an inflection point. For example, for <code>y = x⁴</code> at x = 0, <code>f'' = 0</code>, but concavity does not change signs (no inflection).
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
            "Limit definition: f'(x) = lim [f(x+h) − f(x)]/h",
            "Product Rule: (uv)' = u&middot;v' + v&middot;u'",
            "Quotient Rule: (u/v)' = [v&middot;u' − u&middot;v']/v&sup2;",
            "Chain Rule: (f(g(x)))' = f'(g(x)) &middot; g'(x)",
            "Successive Differentiation: y', y'', y''' sequence",
            "Leibniz product rule format",
            "Inverse function derivative: (f&macr;¹)'(x) = 1 / f'(f&macr;¹(x))",
            "Standard algebraic: (xⁿ)' = n &middot; x^(n-1)",
            "Trig derivatives negative signs for 'CO-' functions",
            "Hyperbolic sinh/cosh derivatives statements",
            "Inverse trig: (arcsin x)' = 1/&radic;(1-x&sup2;)",
            "Implicit differentiation: dy/dx = −(&part;F/&part;x) / (&part;F/&part;y)",
            "Slope of normal: m_N = −1/f'(x_0)",
            "Local Maxima: f'(c) = 0 and f''(c) < 0",
            "Local Minima: f'(c) = 0 and f''(c) > 0",
            "Inflection Point requires concavity sign change",
            "Rolle's: f(a) = f(b) with continuous/differentiable constraints",
            "LMVT: f'(c) = [f(b) − f(a)] / (b − a)",
            "Log shortcut evaluation for bases x^x derivatives",
            "Wavy Curve sign checks for monotonicity ranges"
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
