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

// ─── SVG 1: LP FEASIBLE REGION GRAPH ─────────────────────────────────────────
function LpFeasibleRegionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — LP Bounded Feasible region polygon and Optimal Corner Points</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Shaded Feasible Polygon */}
        <polygon points="40,100 180,100 130,50 40,50" fill="rgba(34, 211, 238, 0.12)" stroke="none" />

        {/* Constraint boundary lines */}
        <line x1="40" y1="50" x2="260" y2="50" stroke="#a78bfa" strokeWidth="1.5" />
        <line x1="180" y1="100" x2="110" y2="30" stroke="#34d399" strokeWidth="1.5" />

        {/* Axes */}
        <line x1="40" y1="10" x2="40" y2="110" stroke="#475569" strokeWidth="1" />
        <line x1="30" y1="100" x2="300" y2="100" stroke="#475569" strokeWidth="1" />

        {/* Vertices */}
        <circle cx="40" cy="100" r="3.5" fill="#eab308" />
        <circle cx="180" cy="100" r="3.5" fill="#eab308" />
        <circle cx="130" cy="50" r="3.5" fill="#eab308" />
        <circle cx="40" cy="50" r="3.5" fill="#eab308" />

        <text x="48" y="93" fill="#cbd5e1" fontSize="7" fontFamily="monospace">A(0,0)</text>
        <text x="188" y="93" fill="#cbd5e1" fontSize="7" fontFamily="monospace">B(4,0)</text>
        <text x="135" y="44" fill="#cbd5e1" fontSize="7" fontFamily="monospace">C(3,3)</text>
        <text x="48" y="44" fill="#cbd5e1" fontSize="7" fontFamily="monospace">D(0,3)</text>

        <text x="210" y="35" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">Feasible Region</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: PROBABILITY VENN DIAGRAM ─────────────────────────────────────────
function ProbabilityVennSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Probability Set Intersection P(A &cap; B) vs Union P(A &cup; B)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Sample Space box */}
        <rect x="20" y="10" width="300" height="100" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="25" y="22" fill="#475569" fontSize="9" fontFamily="monospace" fontWeight="bold">S</text>

        {/* Set A (Cyan) */}
        <circle cx="130" cy="60" r="35" fill="rgba(34, 211, 238, 0.08)" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="100" y="62" fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">A</text>

        {/* Set B (Violet) */}
        <circle cx="190" cy="60" r="35" fill="rgba(167, 139, 250, 0.08)" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="220" y="62" fill="#a78bfa" fontSize="9" fontFamily="monospace" fontWeight="bold">B</text>

        {/* Intersection shading overlay */}
        <path d="M 155 35 A 35 35 0 0 1 190 60 A 35 35 0 0 1 155 85 A 35 35 0 0 1 130 60 A 35 35 0 0 1 155 35 Z" fill="#eab308" opacity="0.25" />
        <text x="160" y="62" fill="#eab308" fontSize="7" fontFamily="monospace" textAnchor="middle">A &cap; B</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: BAYES TREE DIAGRAM ───────────────────────────────────────────────
function BayesTreeSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Bayes Tree: Prior probabilities branching to conditional outcomes</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Start node */}
        <circle cx="40" cy="60" r="4" fill="#64748b" />

        {/* Branches */}
        <line x1="40" y1="60" x2="140" y2="25" stroke="#475569" strokeWidth="1.2" />
        <line x1="40" y1="60" x2="140" y2="95" stroke="#475569" strokeWidth="1.2" />

        {/* Cause Nodes */}
        <rect x="140" y="15" width="40" height="20" rx="3" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="160" y="27" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Bag E₁</text>

        <rect x="140" y="85" width="40" height="20" rx="3" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="160" y="97" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Bag E₂</text>

        {/* Sub-branches to outcome A */}
        <line x1="180" y1="25" x2="260" y2="60" stroke="#475569" strokeWidth="1" />
        <line x1="180" y1="95" x2="260" y2="60" stroke="#475569" strokeWidth="1" />

        <circle cx="260" cy="60" r="4" fill="#eab308" />
        <text x="270" y="63" fill="#eab308" fontSize="8" fontFamily="monospace" fontWeight="bold">Outcome A</text>

        {/* Labels */}
        <text x="90" y="38" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace">P(E₁)</text>
        <text x="90" y="82" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace">P(E₂)</text>
        <text x="210" y="36" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace">P(A|E₁)</text>
        <text x="210" y="84" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace">P(A|E₂)</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function StatsProbLPDetail({ progress, isCompleted, onNavigate }: Props) {
  // Binomial state
  const [trialsN, setTrialsN] = useState<string>('5');
  const [probP, setProbP] = useState<string>('0.5');
  const [successR, setSuccessR] = useState<string>('2');

  const tn = parseInt(trialsN) || 1;
  const pp = parseFloat(probP) || 0.5;
  const sr = parseInt(successR) || 0;

  // Factorial helper
  const fact = (num: number): number => {
    if (num <= 1) return 1;
    return num * fact(num - 1);
  };

  const nCr = fact(tn) / (fact(sr) * fact(tn - sr));
  const binomialProb = nCr * Math.pow(pp, sr) * Math.pow(1 - pp, tn - sr);

  // Statistics properties state
  const [meanVal, setMeanVal] = useState<string>('10');
  const [sdVal, setSdVal] = useState<string>('3');
  const [scaleA, setScaleA] = useState<string>('2');

  const mv = parseFloat(meanVal) || 0;
  const sv = parseFloat(sdVal) || 0;
  const sa = parseFloat(scaleA) || 1;

  const cv = mv !== 0 ? (sv / mv) * 100 : 0;
  const newMean = mv * sa + 5; // showing +5 shift example
  const newSd = sv * Math.abs(sa);

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
              Statistics, Probability and LP
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Set Theory</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 font-bold">Algebraic Graphs</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '20 min' },
              { label: 'Expected Questions', value: '2-5 / year' },
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

      {/* PART 1: STATISTICS (DISPERSION) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Statistics (Dispersion)</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Dispersion quantifies the variability or spread of data around its central values. Variance tracks the average squared deviation.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="MD = &Sigma;|x_i − x̄| / n  |  &sigma;&sup2; = &Sigma;x_i&sup2;/n − (x̄)&sup2;"
            use="Mean Deviation &amp; Variance (Ungrouped Data)"
            note="Used for discrete single observations list. SD is &radic;(Variance)."
            priority={5}
          />
          <FormulaCard
            formula="MD = &Sigma;f_i|x_i − x̄| / N  |  &sigma;&sup2; = &Sigma;f_i(x_i − x̄)&sup2; / N"
            use="Mean Deviation &amp; Variance (Grouped Data)"
            note="N = &Sigma;f_i is total frequency sum. x_i is midpoint of class intervals."
            priority={5}
          />
          <FormulaCard
            formula="&sigma;&sup2; = h&sup2; &middot; [ &Sigma;f_i d_i&sup2;/N − (&Sigma;f_i d_i/N)&sup2; ]"
            use="Step Deviation Variance (Grouped Data)"
            note="d_i = (x_i − A)/h where A is assumed mean, h is class interval width. Massive time saver."
            priority={5}
          />
          <FormulaCard
            formula="CV = (&sigma; / x̄) &middot; 100"
            use="Coefficient of Variation (CV)"
            note="Measures relative dispersion stability. Lower CV values denote higher stability."
            priority={5}
          />
        </div>

        {/* SD property box */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Dispersion change of origin &amp; scale properties</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Operation type</th>
                  <th>New Mean value</th>
                  <th>New Standard Deviation (&sigma;)</th>
                  <th>New Variance (&sigma;&sup2;)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Shift Origin (x<sub>i</sub> &plusmn; k)</td>
                  <td>Mean &plusmn; k</td>
                  <td>Unchanged (&sigma;)</td>
                  <td>Unchanged (&sigma;&sup2;)</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Scale Shift (a &middot; x<sub>i</sub>)</td>
                  <td>Mean &middot; a</td>
                  <td>|a| &middot; &sigma;</td>
                  <td>a&sup2; &middot; &sigma;&sup2;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 2: PROBABILITY & DISTRIBUTIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Probability Theorems &amp; Distributions</h2>
        </div>
        
        {/* Foundational Concepts Box */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3.5 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Sample Space, Events &amp; Axiomatic Probability</strong>
            <p>&bull; <strong>Sample Space (S):</strong> Set of all outcomes of a random experiment. Coin toss: <code>S = &#123;H, T&#125;</code>, Double toss: <code>S = &#123;HH, HT, TH, TT&#125;</code>.</p>
            <p>&bull; <strong>Event Algebra:</strong>
              <br />
              &mdash; <i>'Not A'</i>: Complement <code>'</code> or <code>A&sup2;</code> (all outcomes not in A).
              <br />
              &mdash; <i>''</i>: Union <code>A &cup; B</code> (outcomes in A, B, or both).
              <br />
              &mdash; <i>''</i>: Intersection <code>A &cap; B</code> (outcomes in both A and B).
            </p>
            <p>&bull; <strong>Event Symmetries:</strong>
              <br />
              &mdash; <i>Mutually Exclusive (ME):</i> <code>A &cap; B = &empty; &rArr; P(A &cap; B) = 0</code>.
              <br />
              &mdash; <i>Exhaustive Events:</i> <code>E&sup1; &cup; E&sup2; &cup; ... &cup; Eⁿ = S &rArr; &Sigma; P(E<sub>i</sub>) = 1</code> (if disjoint).
            </p>
            <p>&bull; <strong>Probability Axioms:</strong> 1. <code>0 &le; P(E) &le; 1</code> | 2. <code>P(S) = 1</code> | 3. For disjoint events <code>P(A &cup; B) = P(A) + P(B)</code>.</p>
          </div>
        </div>

        <ProbabilityVennSVG />
        <BayesTreeSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="P(A &cup; B) = P(A) + P(B) − P(A &cap; B)"
            use="Addition Theorem on Probability"
            note="Applies generally. For mutually exclusive events, P(A &cap; B) = 0, so union is sum of probabilities."
            priority={5}
          />
          <FormulaCard
            formula="P(A|B) = P(A &cap; B)/P(B)  |  P(A &cap; B) = P(A) &middot; P(B|A)"
            use="Conditional Probability &amp; Multiplication Theorem"
            note="Applies where P(B) > 0. For independent events, P(B|A) = P(B), meaning P(A &cap; B) = P(A)P(B)."
            priority={5}
          />
          <FormulaCard
            formula="P(E_i|A) = [P(E_i)P(A|E_i)] / &Sigma;[P(E_j)P(A|E_j)]"
            use="Bayes'"
            note=""
            priority={5}
          />
          <FormulaCard
            formula=""
            use=""
            note=""
            priority={5}
          />
        </div>

        {/* Expectation rules */}
        <div className="">
          <strong className="">🔑 Expectation transformations &amp; Bernoulli</strong>
          <p>&bull; <strong>Expectation Properties:</strong> <code>E(aX + b) = a E(X) + b</code> and <code>Var(aX + b) = a&sup2; Var(X)</code>.</p>
          <p>&bull; <strong>Bernoulli Trial:</strong> Trials must be finite, independent, success/failure outcomes, with constant probability.</p>
        </div>

        {/* Probability Selector Flowchart */}
        <div className="">
          <strong className="">🔑 Probability Formula Decision Selector Flowchart</strong>
          <div className="">
            <p>&bull; <i>""</i> &rArr; use <strong>Conditional Probability</strong>.</p>
            <p>&bull; <i>""</i> &rArr; use <strong>Complement rule: 1 − P(A')</strong>.</p>
            <p>&bull; <i>""</i> &rArr; use <strong>Bayes' Theorem</strong>.</p>
            <p>&bull; <i>""</i> &rArr; use <strong>Binomial distribution</strong>.</p>
          </div>
        </div>
      </div>

      {/* PART 3: LINEAR PROGRAMMING (LP) CORNER METHOD */}
      <div className="">
        <div className="">
          <span className="">PART 3</span>
          <h2 className="font-display ">Linear Programming (LP) Corner Method</h2>
        </div>
        <p className="">
          Linear Programming optimizes a linear objective function. The optimal value always occurs at one of the corner points of the bounded feasible region.
        </p>
        <LpFeasibleRegionSVG />

        {/* LP Special Cases */}
        <div className="">
          <strong className="">🔑 Linear Programming Special Cases</strong>
          <p>&bull; <strong>Multiple Optima:</strong> If two corner points yield identical optimal Z values, then every point on the line segment connecting them is also optimal.</p>
          <p>&bull; <strong>Unbounded Regions:</strong> Optimal maximum values may not exist if constraints shape open boundaries running to infinity.</p>
        </div>
      </div>

      {/* PART 4: INTERACTIVE SOLVERS */}
      <div className="">
        <div className="">
          <RefreshCw className="" />
          <h2 className="font-display ">Binomial &amp; CV Dispersion Solver</h2>
        </div>

        {/* Binomial Evaluator */}
        <div className="">
          <span className="">Binomial Distribution Evaluator</span>
          <div className="">
            <div>
              <label className="">Trials (n):</label>
              <input type="" value={trialsN} onChange={e => setTrialsN(e.target.value)} className="" />
            </div>
            <div>
              <label className="">Prob. (p):</label>
              <input type="" step="" value={probP} onChange={e => setProbP(e.target.value)} className="" />
            </div>
            <div>
              <label className="">Success (r):</label>
              <input type="" value={successR} onChange={e => setSuccessR(e.target.value)} className="" />
            </div>
          </div>
          <div className="">
            <p>&bull; P(X = {sr}) = <span className="">{binomialProb.toFixed(4)}</span></p>
            <p>&bull; Distribution Mean (np) = <span className="">{(tn * pp).toFixed(2)}</span></p>
            <p>&bull; Variance (npq) = <span className="">{(tn * pp * (1 - pp)).toFixed(2)}</span></p>
          </div>
        </div>

        {/* CV Solver */}
        <div className="">
          <span className="">Dispersion properties &amp; Shifts Predictor</span>
          <div className="">
            <div>
              <label className="">Mean (x̄):</label>
              <input type="" value={meanVal} onChange={e => setMeanVal(e.target.value)} className="" />
            </div>
            <div>
              <label className="">SD (&sigma;):</label>
              <input type="" value={sdVal} onChange={e => setSdVal(e.target.value)} className="" />
            </div>
            <div>
              <label className="">Scale factor (a):</label>
              <input type="" value={scaleA} onChange={e => setScaleA(e.target.value)} className="" />
            </div>
          </div>
          <div className="">
            <p>&bull; Coefficient of Variation (CV) = <span className="">{cv.toFixed(2)}%</span></p>
            <p>&bull; Predicted Mean (after <code>a&middot;x + 5</code>) = <span className="">{newMean.toFixed(2)}</span></p>
            <p>&bull; Predicted SD (after <code>a&middot;x + 5</code>) = <span className="">{newSd.toFixed(2)}</span></p>
          </div>
        </div>
      </div>

      {/* SOLVED EXAMPLES */}
      <div className="">
        <div className="">
          <span className="">
            <BookOpen className="" />
          </span>
          <h3 className="font-display ">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
        <div className="">
          <span className="">Example 1: Variance of first n natural numbers</span>
          <p className="">Evaluate the variance of the first n natural numbers.</p>
          <div className="">
            <p>1. Formula: <code>&sigma;&sup2; = &Sigma;x<sub>i</sub>&sup2;/n − (x̄)&sup2;</code>.</p>
            <p>2. Sum of natural numbers = <code>n(n+1)/2</code> &rArr; <code>x̄ = (n+1)/2</code>.</p>
            <p>3. Sum of squares = <code>n(n+1)(2n+1)/6</code> &rArr; <code>&Sigma;x<sub>i</sub>&sup2;/n = (n+1)(2n+1)/6</code>.</p>
            <p>4. Variance: <code>&sigma;&sup2; = (n+1)(2n+1)/6 − (n+1)&sup2;/4 = (n&sup2; − 1) / 12</code>.</p>
            <p className="">Variance = (n&sup2; − 1) / 12</p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="">
          <span className="">Example 2: Bayes' Theorem ball draw</span>
          <p className="">Bag 1 has 3 red and 2 white balls. Bag 2 has 2 red and 4 white balls. One red ball is drawn. Find the probability it came from Bag 1.</p>
          <div className="">
            <p>1. Let E₁ = Bag 1 choice, E₂ = Bag 2 choice. <code>P(E₁) = P(E₂) = 0.5</code>.</p>
            <p>2. A = Red ball drawn. <code>P(A|E₁) = 3/5 = 0.6</code>, <code>P(A|E₂) = 2/6 = 1/3</code>.</p>
            <p>3. Denominator (Total Red Prob) = <code>0.5 &middot; 0.6 + 0.5 &middot; (1/3) = 0.3 + 0.166 = 0.466</code>.</p>
            <p>4. Bayes' P(E₁|A) = <code>(0.5 &middot; 0.6) / 0.466 = 0.3 / 0.466 = 9/14 &asymp; 0.643</code>.</p>
            <p className="">Probability = 9/14</p>
          </div>
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="">
        <div className="">
          <Target className="" />
          <h2 className="font-display ">Question Recognition Patterns</h2>
        </div>
        <div className="">
          {[
            { cue: '""', think: "" },
            { cue: '""', think: "' theorem to reverse trace path conditionally." },
            { cue: '"Find max of Z under linear bounded bounds..."', think: "Calculate intersection vertices (corner points) of shaded constraint planes, then evaluate Z at each corner." },
            { cue: '"Evaluate probability of getting exactly r successes in independent trials..."', think: "Apply the Binomial Distribution equation P(X=r) = nCr pʳ q^(n-r)." },
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
          <TrapCard title="Trap 1: Mutually exclusive vs Independent events logic">
            Do not equate Mutually Exclusive (<code>P(A &cap; B) = 0</code>) with Independent (<code>P(A &cap; B) = P(A)P(B)</code>). They are completely distinct concepts.
          </TrapCard>
          <TrapCard title="Trap 2: Standard deviation vs variance scales shifts">
            Remember that variance scales by <code>a&sup2;</code> while standard deviation scales by <code>|a|</code>. Constant shifts (<code>+b</code>) do not affect either.
          </TrapCard>
          <TrapCard title="Trap 3: Unbounded LP maximum optimizations">
            In unbounded constraint planes, maximum values may not exist. Always check if the half-plane <code>ax + by &gt; Z<sub>max</sub></code> intersects the feasible region.
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
            "Mean Deviation: MD = &Sigma;|x_i − x̄| / n",
            "Variance: &sigma;&sup2; = &Sigma;x_i&sup2;/n − (x̄)&sup2;",
            "Variance shortcut: Var(X) = E(X&sup2;) − [E(X)]&sup2;",
            "Origin shifts do not affect variance or SD",
            "Multiplication scales SD by |a| and Var by a&sup2;",
            "Coefficient of Variation: CV = (&sigma;/x̄) &times; 100",
            "Natural numbers variance shortcut: (n&sup2;−1) / 12",
            "Addition rule: P(A &cup; B) = P(A) + P(B) − P(A &cap; B)",
            ") = 1 − P(A) for 'at least one'",
            "Conditional probability: P(A|B) = P(A &cap; B)/P(B)",
            "Total probability: P(A) = &Sigma; P(E_i)P(A|E_i)",
            "Bayes' reverse path tracking equation",
            "Expectation property: E(aX+b) = a E(X) + b",
            "Variance expectation: Var(aX+b) = a&sup2; Var(X)",
            "Bernoulli Trial criteria constraints",
            "Binomial Distribution: nCr pʳ q^(n-r)",
            "Binomial Mean = np | Variance = npq",
            "Optimal Z always occurs at vertices of feasible region",
            "Multiple optima occurs if two adjacent vertices share Z",
            "Unbounded region maximum checks required"
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
