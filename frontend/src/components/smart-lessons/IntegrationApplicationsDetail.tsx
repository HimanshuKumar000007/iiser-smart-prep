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

// ─── SVG 1: AREA BETWEEN TWO CURVES ──────────────────────────────────────────
function AreaBetweenCurvesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Shaded area bounded between y<sub>upper</sub> and y<sub>lower</sub> curves</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Shaded Area between curves */}
        <path d="M 60 70 Q 170 15 280 40 Q 170 100 60 70 Z" fill="rgba(34, 211, 238, 0.12)" stroke="none" />
        
        {/* Upper Curve */}
        <path d="M 40 80 Q 170 10 300 45" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        <text x="210" y="25" fill="#22d3ee" fontSize="8" fontFamily="monospace">y<sub>upper</sub></text>

        {/* Lower Curve */}
        <path d="M 40 75 Q 170 110 300 35" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
        <text x="210" y="98" fill="#a78bfa" fontSize="8" fontFamily="monospace">y<sub>lower</sub></text>

        {/* Intersections */}
        <circle cx="60" cy="70" r="3" fill="#eab308" />
        <circle cx="280" cy="40" r="3" fill="#eab308" />
        <text x="60" y="112" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">x = a</text>
        <text x="280" y="112" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">x = b</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: FTC AVERAGE VALUE HEIGHT ─────────────────────────────────────────
function FtcAverageValueSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Definite Integral Average Height f<sub>avg</sub> matching total area</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Under curve shaded area */}
        <path d="M 50 100 L 50 65 Q 160 20 270 50 L 270 100 Z" fill="rgba(167, 139, 250, 0.08)" />

        {/* Curve f(x) */}
        <path d="M 40 70 Q 160 10 280 50" fill="none" stroke="#a78bfa" strokeWidth="1.8" />

        {/* Average value rectangle line */}
        <line x1="50" y1="48" x2="270" y2="48" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="50" y="48" width="220" height="52" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.4" />
        <text x="160" y="44" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">f<sub>avg</sub> = Area / (b − a)</text>

        {/* Axes */}
        <line x1="30" y1="100" x2="300" y2="100" stroke="#334155" strokeWidth="1" />
        <text x="50" y="112" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">a</text>
        <text x="270" y="112" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">b</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function IntegrationApplicationsDetail({ progress, isCompleted, onNavigate }: Props) {
  // King's properties bounds state
  const [lowerA, setLowerA] = useState<string>('0');
  const [upperB, setUpperB] = useState<string>('4');

  const la = parseFloat(lowerA) || 0;
  const ub = parseFloat(upperB) || 0;
  const width = ub - la;

  // Parabola intersection solver state
  const [coefA, setCoefA] = useState<string>('1');
  const [coefB, setCoefB] = useState<string>('1');

  const ca = parseFloat(coefA) || 0;
  const cb = parseFloat(coefB) || 0;
  const parabolaArea = (16 * ca * cb) / 3;

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
              Integration and Applications
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Differentiation</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 font-bold">Trig Identities</span>
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

      {/* PART 1: ANTIDERIVATIVES & FTC */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Antiderivatives &amp; FTC</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          <strong>Integration as the Inverse of Differentiation:</strong> If <code>F'(x) = f(x)</code>, then <code>&int; f(x) dx = F(x) + C</code>. Here, <code>F(x)</code> is the antiderivative of <code>f(x)</code>, and <code>C</code> is the constant of integration.
          <br />
          The Fundamental Theorem of Calculus (FTC) formally bridges differentiation and integration.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="d/dx &int;[a to x] f(t) dt = f(x)"
            use="Fundamental Theorem of Calculus (FTC I)"
            note="Connects accumulation integrations back to standard derivatives."
            priority={5}
          />
          <FormulaCard
            formula="&int;[a to b] f(x) dx = F(b) − F(a)"
            use="FTC Part II evaluation rule"
            note="F is antiderivative of f. Area is computed by interval difference."
            priority={5}
          />
        </div>

        {/* Area vs Definite Integral */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Definite Integral vs Bounded Area</strong>
            <p>&bull; <strong>Definite Integrals</strong> can be negative (when curves lie below the x-axis bounds).</p>
            <p>&bull; <strong>Geometric Area</strong> is strictly positive. For area calculations, take modulus: <code>Area = &int; |f(x)| dx</code>.</p>
          </div>
        </div>
      </div>

      {/* PART 2: STANDARD INTEGRALS & IDENTITIES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Standard Integrals &amp; Identities</h2>
        </div>

        {/* Standard integrals table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Standard Integrals Reference Table</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Integrand Type</th>
                  <th>Antiderivative Statement (F(x) + C)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Algebraic powers</td>
                  <td><code>&int; xⁿ dx = x^(n+1)/(n+1) + C (n &ne; −1) | &int; 1/x dx = ln|x| + C</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Exponentials base e / a</td>
                  <td><code>&int; e^x dx = e^x + C | &int; a^x dx = a^x / ln(a) + C</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Trig standard sine / cosine</td>
                  <td><code>&int; sin(x) dx = −cos(x) + C | &int; cos(x) dx = sin(x) + C</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Trig tangent / cotangent</td>
                  <td><code>&int; tan(x) dx = ln|sec(x)| + C | &int; cot(x) dx = ln|sin(x)| + C</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">Trig secant / cosecant</td>
                  <td><code>&int; sec(x) dx = ln|sec x + tan x| + C | &int; csc(x) dx = ln|csc x − cot x| + C</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Special algebraic rational</td>
                  <td><code>&int; dx/(x&sup2;+a&sup2;) = 1/a &middot; arctan(x/a) + C | &int; dx/&radic;(a&sup2;−x&sup2;) = arcsin(x/a) + C</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Trigonometric identities box */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Trigonometric Identities for Integration</strong>
          <p>&bull; <code>sin&sup2;(x) = (1 − cos 2x) / 2</code> | <code>cos&sup2;(x) = (1 + cos 2x) / 2</code>.</p>
          <p>&bull; <code>sin A cos B = ^1&frasl;_2 [ sin(A+B) + sin(A-B) ]</code> (Product-to-Sum conversion).</p>
        </div>
      </div>

      {/* PART 3: METHODS OF INTEGRATION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Methods of Integration</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Complex integrations are evaluated using substitution, trigonometric replacements, or Integration by Parts shortcuts.
        </p>

        {/* Integration By Parts table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 ILATE Choice of u reference</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Function Category</th>
                  <th>ILATE Priority</th>
                  <th>Choose as u?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Inverse Trigonometric (arcsin x)</td>
                  <td>1 (Highest)</td>
                  <td>Yes (Always)</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Logarithmic (ln x)</td>
                  <td>2</td>
                  <td>Yes</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Algebraic (xⁿ)</td>
                  <td>3</td>
                  <td>Depends on product partner</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Exponential (e^x)</td>
                  <td>5 (Lowest)</td>
                  <td>No (Prefer as v)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="&int; f(g(x)) &middot; g'(x) dx = &int; f(u) du"
            use="Integration by Substitution (u-sub)"
            note="Let u = g(x), then du = g'(x) dx. Converts composite functions into standard Integrals."
            priority={5}
          />
          <FormulaCard
            formula="1 / ((x − a)(x − b)) = A / (x − a) + B / (x − b)"
            use="Integration by Partial Fractions"
            note="Decomposes proper rational fractions P(x)/Q(x) into separate, easily integrable logarithmic terms."
            priority={5}
          />
          <FormulaCard
            formula="&int; u v dx = u &int; v dx − &int; [ u' &int; v dx ] dx"
            use="Integration By Parts"
            note="Follow ILATE priority order to choose u. u is differentiated, v is integrated."
            priority={5}
          />
          <FormulaCard
            formula="I_n = −sin^(n-1)(x)cos(x)/n + (n-1)/n &middot; I_(n-2)"
            use="Trig Reduction Formula for sin^n(x)"
            note="Allows step-down simplification of high-degree trigonometric powers."
            priority={5}
          />
        </div>

        {/* Trig substitution guidelines */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Trigonometric substitution table</strong>
            <p>&bull; For radical <code>&radic;(a&sup2; − x&sup2;)</code> &rArr; let <code>x = a sin &theta;</code>.</p>
            <p>&bull; For radical <code>&radic;(a&sup2; + x&sup2;)</code> &rArr; let <code>x = a tan &theta;</code>.</p>
            <p>&bull; For radical <code>&radic;(x&sup2; − a&sup2;)</code> &rArr; let <code>x = a sec &theta;</code>.</p>
          </div>
        </div>
      </div>

      {/* PART 4: DEFINITE INTEGRATION PROPERTIES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Definite Integration Properties</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Symmetries and interval partitioning speed up definite evaluations. Leibniz rule differentiates integrals with variable bounds.
        </p>

        {/* Symmetry properties box */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Definite Integral symmetry properties</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Property Name</th>
                  <th>Formula Statement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">King's Property</td>
                  <td><code>&int;[a to b] f(x) dx = &int;[a to b] f(a + b − x) dx</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Even Function Rule</td>
                  <td><code>&int;[−a to a] f(x) dx = 2 &int;[0 to a] f(x) dx (if f(−x) = f(x))</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Odd Function Rule</td>
                  <td><code>&int;[−a to a] f(x) dx = 0 (if f(−x) = −f(x))</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Periodic scaling</td>
                  <td><code>&int;[0 to nT] f(x) dx = n &int;[0 to T] f(x) dx (T is period)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="d/dx &int;[&psi;(x) to &phi;(x)] f(t) dt = f(&phi;(x))&phi;'(x) − f(&psi;(x))&psi;'(x)"
            use="Leibniz Integral differentiation Rule"
            note="High-yield property for differentiating integral equations."
            priority={5}
          />
          <FormulaCard
            formula="&int;[0 to &pi;/2] sin x dx = &int;[0 to &pi;/2] cos x dx = 1"
            use="Trigonometric Definite Limit shortcut"
            note="Symmetric quadrant area bounds. Replaces integration steps."
            priority={5}
          />
        </div>
      </div>

      {/* PART 5: APPLICATIONS: AREA BOUNDS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Applications: Area Bounds</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Double-curve intersections outline bounded areas. Sketch boundaries before evaluating intervals.
        </p>
        <AreaBetweenCurvesSVG />
        <FtcAverageValueSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="Area = &int;[a to b] |y| dx = &int;[a to b] |f(x)| dx"
            use="Area under a single curve (X-axis)"
            note="Use modulus to ensure area contribution remains positive for segments below the X-axis."
            priority={5}
          />
          <FormulaCard
            formula="Area = &int;[a to b] (y_upper − y_lower) dx"
            use="Area Bounded between two curves"
            note="Confirm upper and lower orientation via sketches before setting limits."
            priority={5}
          />
          <FormulaCard
            formula="Area = 16ab / 3"
            use="Parabolas y&sup2;=4ax and x&sup2;=4by intersection area"
            note="High-yield shortcut. Saves massive integral integration evaluation time."
            priority={5}
          />
        </div>

        {/* Parametric and conics area */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Parametric &amp; Conic Bounded Areas</strong>
          <p>&bull; <strong>Parametric Area:</strong> <code>Area = &int; y &middot; (dx/dt) dt</code>.</p>
          <p>&bull; <strong>Ellipse Area:</strong> Total area of <code>x&sup2;/a&sup2; + y&sup2;/b&sup2; = 1</code> is exactly <code>&pi;ab</code>.</p>
        </div>
      </div>

      {/* PART 6: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">King's &amp; Parabolas Solver</h2>
        </div>

        {/* King's Solver */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Symmetric King's Property width calculator</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Lower Bound (a):</label>
 <input type="number" value={lowerA} onChange={e => setLowerA(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Upper Bound (b):</label>
 <input type="number" value={upperB} onChange={e => setUpperB(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Integration width (b − a) = <span className="text-cyan-400 font-bold">{width.toFixed(3)}</span></p>
            <p>&bull; Mid-point average (a + b)/2 = <span className="text-violet-400 font-bold">{((la + ub) / 2).toFixed(3)}</span></p>
          </div>
        </div>

        {/* Parabola Solver */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">Parabola intersection bounding area shortcut</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Coefficient a in y&sup2; = 4ax:</label>
 <input type="number" value={coefA} onChange={e => setCoefA(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Coefficient b in x&sup2; = 4by:</label>
 <input type="number" value={coefB} onChange={e => setCoefB(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Area = 16ab/3 = <span className="text-emerald-400 font-bold">{parabolaArea.toFixed(3)}</span></p>
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
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 1: King's Property symmetric integration</span>
          <p className="text-white/80">Evaluate the integral &int;[0 to &pi;/2] sin x / (sin x + cos x) dx.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Let <code>I = &int; sin x / (sin x + cos x) dx</code>. Apply King's property: <code>x &rarr; &pi;/2 − x</code>.</p>
            <p>2. Then <code>I = &int; cos x / (cos x + sin x) dx</code>.</p>
            <p>3. Add both integrals: <code>2I = &int; (sin x + cos x) / (sin x + cos x) dx = &int; 1 dx = [x]_0^(&pi;/2) = &pi;/2</code>.</p>
            <p>4. Divide by 2: <code>I = &pi;/4</code>.</p>
            <p className="text-cyan-300 font-bold">Integral value = &pi;/4</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 2: Leibniz integral differentiation</span>
          <p className="text-white/80">Find the derivative of F(x) = &int;[0 to x&sup2;] cos(t) dt with respect to x.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Apply Leibniz rule: <code>F'(x) = cos(x&sup2;) &middot; d/dx(x&sup2;) − cos(0) &middot; d/dx(0)</code>.</p>
            <p>2. Derivative is <code>cos(x&sup2;) &middot; 2x</code>.</p>
            <p className="text-cyan-300 font-bold">F'(x) = 2x &middot; cos(x&sup2;)</p>
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
            { cue: '"Evaluate definite integral with trigonometric boundaries sin/cos..."', think: "Apply King's property f(a+b-x) to check if the denominator remains unchanged while numerator terms add up to 1." },
            { cue: '"Differentiate F(x) defined as a definite integration..."', think: "Apply the Leibniz integration rule. Differentiate upper limits and evaluate variables directly." },
            { cue: '"Find area trapped between y² = 4ax and x² = 4by"', think: "Apply the parabola bounding area shortcut directly: Area = 16ab / 3." },
            { cue: '"Integral containing greatest integer function [x] bounds..."', think: "Partition the definite limits at integer values, and integrate constant piecewise steps." },
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
          <TrapCard title="Trap 1: U-substitution definite limit conversions">
            When performing variable replacements in definite integrals, do not keep the original bounds. Convert the upper and lower limits to the new u-variable parameters.
          </TrapCard>
          <TrapCard title="Trap 2: Absolute area modulus checks">
            Do not evaluate geometric areas below the x-axis as negative values. Apply absolute modulus signs to calculate true geometric positive coverage.
          </TrapCard>
          <TrapCard title="Trap 3: Inverse trigonometric constants">
            Confusing the 1/a coefficient factor. <code>arctan(x/a)</code> has a <code>1/a</code> coefficient multiplier in front of the term, whereas <code>arcsin(x/a)</code> does not.
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
            "FTC I: d/dx &int; f(t) dt = f(x)",
            "FTC II bounds evaluation: F(b) − F(a)",
            "Standard algebraic: &int; xⁿ dx = x^(n+1)/(n+1)",
            "Log integral: &int; 1/x dx = ln|x|",
            "Exp integrals base e / a forms",
            "Trig sine/cosine antiderivatives with signs check",
            "Inverse trig: &int; dx/&radic;(a&sup2;-x&sup2;) = arcsin(x/a)",
            "By Parts: &int; u v dx = u&int;v dx − &int;[u'&int;v dx]",
            "ILATE selection priorities hierarchy",
            "Reduction formulas step-down steps",
            "Trig substitutions: x = a sin &theta; for &radic;(a&sup2;-x&sup2;)",
            "King's Property: f(x) &rarr; f(a+b-x)",
            "Even symmetry: 2 &int;[0 to a] f(x) dx | Odd: 0",
            "Periodic symmetry: n &int;[0 to T] f(x) dx",
            "Leibniz Variable boundary differentiation",
            "Area between curves: &int; (y_upper − y_lower) dx",
            "Conic bounded area shortcuts: Ellipse is &pi;ab",
            "Parabolas intersection shortcut: Area = 16ab/3",
            "Average Value definition: 1/(b-a) &int; f(x) dx",
            "Parametric Area: &int; y (dx/dt) dt"
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
