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

// ─── SVG 1: ORTHOGONAL TRAJECTORIES ──────────────────────────────────────────
function OrthogonalTrajectoriesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Orthogonal Trajectories: Concentric Circles cuts by Radial Lines</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Concentric Circles (Cyan) */}
        <circle cx="170" cy="60" r="18" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <circle cx="170" cy="60" r="35" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <circle cx="170" cy="60" r="50" fill="none" stroke="#22d3ee" strokeWidth="1" />

        {/* Radial Lines (Violet) */}
        <line x1="170" y1="10" x2="170" y2="110" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="120" y1="60" x2="220" y2="60" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="130" y1="20" x2="210" y2="100" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="130" y1="100" x2="210" y2="20" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 3" />

        <text x="175" y="15" fill="#a78bfa" fontSize="7" fontFamily="monospace">Radial Lines (dy/dx = −x/y)</text>
        <text x="225" y="72" fill="#22d3ee" fontSize="7" fontFamily="monospace">Circles (x&sup2;+y&sup2;=r&sup2;)</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: EXPONENTIAL GROWTH vs DECAY ──────────────────────────────────────
function GrowthDecaySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Exponential Growth (k &gt; 0) vs Radioactive Decay (k &lt; 0)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Axes */}
        <line x1="30" y1="10" x2="30" y2="110" stroke="#334155" strokeWidth="1" />
        <line x1="20" y1="100" x2="320" y2="100" stroke="#334155" strokeWidth="1" />

        {/* Growth curve (Cyan) */}
        <path d="M 30 90 Q 150 85 260 20" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        <text x="265" y="25" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">Growth (k &gt; 0)</text>

        {/* Decay curve (Rose) */}
        <path d="M 30 20 Q 110 80 280 95" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
        <text x="285" y="93" fill="#f43f5e" fontSize="8.5" fontFamily="monospace">Decay (k &lt; 0)</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function DifferentialEquationsDetail({ progress, isCompleted, onNavigate }: Props) {
  // IF Calculator state
  const [powerK, setPowerK] = useState<string>('2');
  const pk = parseFloat(powerK) || 1;

  // Growth/Decay state
  const [paramK, setParamK] = useState<string>('0.5');
  const [initC, setInitC] = useState<string>('10');

  const pK = parseFloat(paramK) || 0;
  const iC = parseFloat(initC) || 0;

  // Evaluate value at t=2
  const valueAtT2 = iC * Math.exp(pK * 2);

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
              Differential Equations
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Integration</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 font-bold">Rates of Change</span>
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

      {/* PART 1: ORDER, DEGREE & FORMATION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Order, Degree &amp; Formation</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Order represents the highest derivative present. Degree tracks its exponent power. Formation is achieved by differentiating a family of curves and eliminating arbitrary parameters.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="Order = Highest derivative order"
            use="Order definition of a DE"
            note="Always defined. Never fractional or negative. Represents basic dimensions."
            priority={5}
          />
          <FormulaCard
            formula="Degree = Power of highest derivative"
            use="Degree definition of a DE"
            note="Only defined if derivatives can be expressed as a polynomial. Trapped derivatives undefined."
            priority={5}
          />
        </div>

        {/* Formation example box */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Formation of a Differential Equation</strong>
            <p>&bull; To form a DE from an equation with n arbitrary constants, differentiate <strong>n times</strong> and eliminate the constants.</p>
            <p>&bull; <strong>Example:</strong> For circles at origin <code>x&sup2; + y&sup2; = r&sup2;</code> (1 constant).
              <br />
              Differentiating: <code>2x + 2y &middot; y' = 0 &rArr; y' = −x/y</code> (Constant cleanly eliminated).
            </p>
          </div>
        </div>
      </div>

      {/* PART 2: COMPREHENSIVE SOLVER REFERENCE TABLE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Summary of DE Types &amp; Methods</h2>
        </div>

        <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40">
                <th className="py-2">DE Category</th>
                <th>Standard Identification Form</th>
                <th>Solving Method / Substitutions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              <tr className="hover:bg-white/[0.01]">
                <td className="py-2 text-cyan-400 font-bold">Variable Separable</td>
                <td><code>dy/dx = f(x) &middot; g(y)</code></td>
                <td>Separate variables: <code>&int; dy/g(y) = &int; f(x) dx + C</code></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="py-2 text-violet-400 font-bold">Homogeneous DE</td>
                <td><code>dy/dx = f(y/x)</code></td>
                <td>Substitute: <code>y = vx &rArr; dy/dx = v + x dv/dx</code></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="py-2 text-emerald-400 font-bold">Linear DE (LDE)</td>
                <td><code>dy/dx + Py = Q</code> (P, Q functions of x)</td>
                <td>IF = <code>e^(&int; P dx)</code> | Sol: <code>y &middot; IF = &int;(Q &middot; IF)dx + C</code></td>
              </tr>
              <tr className="hover:bg-white/[0.01]">
                <td className="py-2 text-rose-400 font-bold">Exact DE</td>
                <td><code>M dx + N dy = 0</code></td>
                <td>Verify: <code>&part;M/&part;y = &part;N/&part;x</code> | Sol: <code>&int;M dx + &int;[terms in N free of x]dy = C</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PART 3: BERNOULLI DE & INTEGRATING FACTOR QUICK REFERENCE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Bernoulli DE &amp; IF Shortcuts</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The Bernoulli equation is a non-linear format convertible to linear, and Integrating Factors (IF) are standard multipliers based on coefficient rules.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="dy/dx + Py = Q &rArr; IF = e^(&int; P dx)"
            use="Linear DE Form 1 (y-dependent)"
            note="Solution is y &middot; IF = &int; Q &middot; IF dx + C. P and Q depend strictly on x."
            priority={5}
          />
          <FormulaCard
            formula="dx/dy + Px = Q &rArr; IF = e^(&int; P dy)"
            use="Linear DE Form 2 (x-dependent)"
            note="Solution is x &middot; IF = &int; Q &middot; IF dy + C. P and Q depend strictly on y."
            priority={5}
          />
          <FormulaCard
            formula="dy/dx + Py = Q &middot; yⁿ"
            use="Bernoulli Differential Equation"
            note="Divide by yⁿ. Substitute z = y^(1−n) to convert it to a standard linear form."
            priority={5}
          />
          <FormulaCard
            formula="eln(f(x)) = f(x) | e^(−ln x) = 1/x"
            use="Logarithmic property in IF calculations"
            note="Log properties cancel base e. Crucial to resolve negative signs cleanly."
            priority={5}
          />
        </div>

        {/* Integrating Factor Table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Integrating Factor (IF) Quick-Reference Table</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">LDE Coefficient P(x)</th>
                  <th>Integrating Factor (IF = e^(&int; P dx))</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">1 / x</td>
                  <td><code>x</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">2 / x</td>
                  <td><code>x&sup2;</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">tan x</td>
                  <td><code>sec x</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">cot x</td>
                  <td><code>sin x</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">sec x</td>
                  <td><code>sec x + tan x</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 4: EXACT WORKFLOW & ORTHOGONAL TRAJECTORIES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Exact DE &amp; Orthogonal Trajectories</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Exact conditions combine cross partial derivatives. Orthogonal trajectories run perpendicular to the original curve systems.
        </p>
        <OrthogonalTrajectoriesSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="&part;M / &part;y = &part;N / &part;x"
            use="Exactness Verification criteria"
            note="Cross partial derivatives must match. If exact, integrate M (y const) and N (free of x)."
            priority={5}
          />
          <FormulaCard
            formula="Replace dy/dx with −dx/dy"
            use="Orthogonal Trajectories condition"
            note="Substitute perpendicular slope relation into original DE and solve family."
            priority={5}
          />
        </div>
      </div>

      {/* PART 5: DE MODELS: GROWTH & DECAY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Growth, Decay &amp; Conic Models</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Growth and decay models establish rate properties over time.
        </p>
        <GrowthDecaySVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="dy/dt = k &middot; y &rArr; y = C &middot; e^(kt)"
            use="Exponential Growth / Decay model"
            note="If k > 0, it models growth. If k < 0, it models radioactive decay."
            priority={5}
          />
          <FormulaCard
            formula="y' = −x / y"
            use="Differential equation of circles family"
            note="Represents family of concentric circles x&sup2; + y&sup2; = r&sup2; at origin."
            priority={5}
          />
        </div>
      </div>

      {/* PART 6: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">IF &amp; Exponential Solver</h2>
        </div>

        {/* IF Solver */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">LDE Integrating Factor (IF) Calculator (P = k/x)</span>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Power coefficient k (for P = k/x):</label>
 <input type="number" value={powerK} onChange={e => setPowerK(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; LDE coefficient P(x) = <code>{pk}/x</code></p>
            <p>&bull; Integrating Factor (IF) = <code>e^(&int; {pk}/x dx) = e^({pk} ln x) = x^{pk}</code></p>
          </div>
        </div>

        {/* Growth Solver */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">Growth &amp; Decay Profile Calculator</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Rate constant k:</label>
 <input type="number" value={paramK} onChange={e => setParamK(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Initial quantity C:</label>
 <input type="number" value={initC} onChange={e => setInitC(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Model profile = <span className={cn('font-bold', pK > 0 ? 'text-emerald-400' : 'text-rose-400')}>{pK > 0 ? 'Exponential Growth' : 'Exponential Decay'}</span></p>
            <p>&bull; Value at t = 2: <code>y(2) = C &middot; e^(2k) = </code><span className="text-cyan-400 font-bold">{valueAtT2.toFixed(3)}</span></p>
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
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 1: Linear LDE solving</span>
          <p className="text-white/80">Solve dy/dx + 2y/x = x.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify standard LDE form: <code>P = 2/x</code>, <code>Q = x</code>.</p>
            <p>2. Integrating Factor: <code>IF = e^(&int; 2/x dx) = e^(2 ln x) = x&sup2;</code>.</p>
            <p>3. Solve LDE: <code>y &middot; x&sup2; = &int; (x &middot; x&sup2;) dx + C = &int; x&sup3; dx + C = x⁴/4 + C</code>.</p>
            <p>4. Divide by x&sup2;: <code>y = x&sup2;/4 + C/x&sup2;</code>.</p>
            <p className="text-cyan-300 font-bold">Solution: y = x&sup2;/4 + C/x&sup2;</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 2: Orthogonal trajectory of curves</span>
          <p className="text-white/80">Find orthogonal trajectories of the family of straight lines y = Cx.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Differentiate: <code>dy/dx = C</code>. Eliminate C: <code>dy/dx = y/x</code>.</p>
            <p>2. Replace dy/dx with <code>−dx/dy</code>: <code>−dx/dy = y/x &rArr; x dx = −y dy</code>.</p>
            <p>3. Integrate: <code>&int; x dx = −&int; y dy &rArr; x&sup2;/2 = −y&sup2;/2 + C' &rArr; x&sup2; + y&sup2; = C''</code>.</p>
            <p className="text-cyan-300 font-bold">Orthogonal Trajectories are circles: x&sup2; + y&sup2; = C''</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 3: Linear LDE dx/dy form solving</span>
          <p className="text-white/80">Solve dx/dy + x/y = y&sup2;.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify standard LDE form 2 (dx/dy + Px = Q): <code>P = 1/y</code>, <code>Q = y&sup2;</code>.</p>
            <p>2. Integrating Factor: <code>IF = e^(&int; 1/y dy) = e^(ln y) = y</code>.</p>
            <p>3. Solve LDE: <code>x &middot; y = &int; (y&sup2; &middot; y) dy + C = &int; y&sup3; dy + C = y⁴/4 + C</code>.</p>
            <p>4. Divide by y: <code>x = y&sup3;/4 + C/y</code>.</p>
            <p className="text-cyan-300 font-bold">Solution: x = y&sup3;/4 + C/y</p>
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
            { cue: '"Find order and degree of fractional derivative relation..."', think: "Rationalize the equation to remove fractional powers and exponents before counting degree indices." },
            { cue: '"Solve LDE dy/dx + Py = Q where coefficient has trig..."', think: "Evaluate the Integrating Factor IF = e^(&int;P dx) immediately, paying careful attention to ln cancellations." },
            { cue: '"Find orthogonal family system to curve equation..."', think: "Form the curve's DE, substitute dy/dx with −dx/dy, and integrate the perpendicular DE." },
            { cue: '"Recognize homogeneous DE dy/dx = f(y/x)"', think: "Substitute y = vx immediately to reduce variables to separable format dv and dx." },
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
          <TrapCard title="Trap 1: Derivative degree indices definitions">
            Degree is **undefined** if y' is locked inside exponential, logarithmic, or trigonometric arguments (e.g. <code>e^(y')</code>, <code>sin(y'')</code>).
          </TrapCard>
          <TrapCard title="Trap 2: Negative signs in Integrating Factor powers">
            For LDE <code>dy/dx − y/x = x</code>, P is <code>−1/x</code>. Do not write IF = x. The negative sign must be resolved: <code>e^(&int; −1/x dx) = e^(−ln x) = 1/x</code>.
          </TrapCard>
          <TrapCard title="Trap 3: LDE variable direction forms">
            Check the LDE direction. If of form <code>dx/dy + Px = Q</code>, P and Q must depend strictly on y, and Integrating Factor is integrated over dy.
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
            "Order: Highest derivative order present",
            "Degree: Exponent power of highest derivative",
            "Degree is undefined if derivatives are non-polynomials",
            "Differentiate family of curves n times to eliminate constants",
            "Particular solution evaluates arbitrary constants",
            "Separable format dy/g(y) = f(x)dx integration",
            "Homogeneous substitution: y = vx and dy/dx = v + x dv/dx",
            "LDE form 1: dy/dx + Py = Q with IF = e^(&int; P dx)",
            "LDE form 1 solution: y &middot; IF = &int;(Q &middot; IF) dx + C",
            "LDE form 2: dx/dy + Px = Q with IF = e^(&int; P dy)",
            "IF log cancel shortcut: e^(ln f(x)) = f(x)",
            "IF negative log shortcut: e^(−ln x) = 1/x",
            "Bernoulli form substitution: z = y^(1-n)",
            "Exact DE condition: &part;M/&part;y = &part;N/&part;x",
            "Exact solution: &int;M dx + &int;[terms free of x in N] dy = C",
            "Orthogonal trajectory slope swap: replace dy/dx with −dx/dy",
            "Circles family DE: y' = −x/y",
            "Exponential Growth/Decay DE: dy/dt = ky",
            "IF = sec x for P = tan x LDE",
            "IF = sin x for P = cot x LDE"
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
