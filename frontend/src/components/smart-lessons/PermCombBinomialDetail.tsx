import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, HelpCircle, Info, Table, FileText, Zap } from 'lucide-react';
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

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 hover:border-white/15 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-white/45">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <p className="text-cyan-300 font-bold text-[13.5px] leading-snug" dangerouslySetInnerHTML={{ __html: formula }} />
      <p className="text-white/80 text-[11px]"><strong className="text-white/40">Use:</strong> <span dangerouslySetInnerHTML={{ __html: use }} /></p>
      <p className="text-white/55 text-[11px]"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
    </div>
  );
}

function DerivationBox({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="p-4.5 rounded-2xl bg-cyan-950/10 border border-cyan-500/20 space-y-2.5 my-3">
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20 text-[9px] text-cyan-400 font-black tracking-wider uppercase">Derivation</span>
        <h4 className="text-white font-bold text-xs">{title}</h4>
      </div>
      <div className="space-y-1.5 text-[11.5px] text-white/70 leading-relaxed font-sans">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-cyan-400 font-bold font-mono">{idx + 1}.</span>
            <span dangerouslySetInnerHTML={{ __html: step }} />
          </div>
        ))}
      </div>
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

function InsightCard({ title = "Key Concept", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">{title}</span>
      <div className="text-white/65 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

// ─── SVG 1: P vs C DECISION FLOWCHART ──────────────────────────────────────────
function DecisionFlowchartSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[9px] uppercase tracking-wider text-white/30">Fig 1 — Decision Flowchart: Permutation vs. Combination</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 120 }}>
        <rect x="125" y="10" width="90" height="22" rx="4" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="170" y="24" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Counting Task</text>

        <line x1="170" y1="32" x2="170" y2="48" stroke="#64748b" strokeWidth="1" />
        <polygon points="170,48 167,43 173,43" fill="#64748b" />

        <polygon points="170,48 215,62 170,76 125,62" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        <text x="170" y="65" fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">Order matters?</text>

        <line x1="125" y1="62" x2="65" y2="62" stroke="#64748b" strokeWidth="1" />
        <polygon points="65,62 70,59 70,65" fill="#64748b" />
        <text x="95" y="55" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">YES</text>

        <line x1="215" y1="62" x2="275" y2="62" stroke="#64748b" strokeWidth="1" />
        <polygon points="275,62 270,59 270,65" fill="#64748b" />
        <text x="245" y="55" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">NO</text>

        <rect x="10" y="50" width="55" height="24" rx="4" fill="#22d3ee" fillOpacity="0.1" stroke="#22d3ee" strokeWidth="1.2" />
        <text x="37.5" y="64" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">nPr</text>
        <text x="37.5" y="85" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Arrangement</text>

        <rect x="275" y="50" width="55" height="24" rx="4" fill="#a78bfa" fillOpacity="0.1" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="302.5" y="64" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">nCr</text>
        <text x="302.5" y="85" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Selection</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: PASCAL'S TRIANGLE ─────────────────────────────────────────────────
function PascalsTriangleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[9px] uppercase tracking-wider text-white/30">Fig 2 — Pascal's Triangle Binomial Coefficients (n = 0 to 4)</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 120 }}>
        <text x="170" y="20" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">1</text>
        <text x="45" y="20" fill="#64748b" fontSize="7" fontFamily="monospace">(n=0)</text>

        <text x="150" y="40" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="190" y="40" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="45" y="40" fill="#64748b" fontSize="7" fontFamily="monospace">(n=1)</text>

        <text x="130" y="60" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="170" y="60" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">2</text>
        <text x="210" y="60" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="45" y="60" fill="#64748b" fontSize="7" fontFamily="monospace">(n=2)</text>

        <text x="110" y="80" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="150" y="80" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">3</text>
        <text x="190" y="80" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">3</text>
        <text x="230" y="80" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="45" y="80" fill="#64748b" fontSize="7" fontFamily="monospace">(n=3)</text>

        <text x="90" y="100" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="130" y="100" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">4</text>
        <text x="170" y="100" fill="#22d3ee" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">6</text>
        <text x="210" y="100" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">4</text>
        <text x="250" y="100" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">1</text>
        <text x="45" y="100" fill="#64748b" fontSize="7" fontFamily="monospace">(n=4)</text>

        <path d="M 160 46 L 168 54 M 180 46 L 172 54" stroke="#475569" strokeWidth="0.8" />
        <path d="M 140 66 L 148 74 M 160 66 L 152 74" stroke="#475569" strokeWidth="0.8" />
        <path d="M 180 66 L 188 74 M 200 66 L 192 74" stroke="#475569" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

// ─── SVG 3: STARS AND BARS (BEGGAR'S METHOD) ──────────────────────────────────
function StarsAndBarsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[9px] uppercase tracking-wider text-white/30">Fig 3 — Stars and Bars Visual Representation</p>
      <svg viewBox="0 0 340 110" className="w-full" style={{ maxHeight: 100 }}>
        <g transform="translate(20, 25)">
          <text x="15" y="30" fill="#eab308" fontSize="20" textAnchor="middle">★</text>
          <text x="40" y="30" fill="#eab308" fontSize="20" textAnchor="middle">★</text>
          <text x="65" y="30" fill="#eab308" fontSize="20" textAnchor="middle">★</text>
          
          <line x1="85" y1="10" x2="85" y2="40" stroke="#f43f5e" strokeWidth="2.5" />

          <text x="110" y="30" fill="#eab308" fontSize="20" textAnchor="middle">★</text>
          <text x="135" y="30" fill="#eab308" fontSize="20" textAnchor="middle">★</text>

          <line x1="155" y1="10" x2="155" y2="40" stroke="#f43f5e" strokeWidth="2.5" />

          <text x="180" y="30" fill="#eab308" fontSize="20" textAnchor="middle">★</text>
          <text x="205" y="30" fill="#eab308" fontSize="20" textAnchor="middle">★</text>
        </g>

        <text x="60" y="85" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Beggar 1 gets 3</text>
        <text x="140" y="85" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Beggar 2 gets 2</text>
        <text x="200" y="85" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Beggar 3 gets 2</text>
        <text x="290" y="35" fill="#e2e8f0" fontSize="8" fontFamily="monospace" textAnchor="middle">N = 7 objects</text>
        <text x="290" y="50" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle">R - 1 = 2 bars</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: CIRCULAR SEATING ARRANGEMENT ──────────────────────────────────────
function CircularSeatingSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[9px] uppercase tracking-wider text-white/30">Fig 4 — Circular Permutations: Seating vs. Necklaces</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 110 }}>
        <circle cx="170" cy="65" r="32" fill="none" stroke="#475569" strokeWidth="1.5" />
        
        <circle cx="170" cy="27" r="5" fill="#22d3ee" />
        <text x="170" y="21" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">Fixed ref (A)</text>
        
        <circle cx="208" cy="65" r="5" fill="#cbd5e1" />
        <text x="219" y="68" fill="#cbd5e1" fontSize="8" fontFamily="monospace">B</text>

        <circle cx="170" cy="103" r="5" fill="#cbd5e1" />
        <text x="170" y="115" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">C</text>

        <circle cx="132" cy="65" r="5" fill="#cbd5e1" />
        <text x="121" y="68" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="end">D</text>

        <text x="50" y="60" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Seating: (n-1)!</text>
        <text x="50" y="75" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Since shifting everyone</text>
        <text x="50" y="87" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">gives same relative spots</text>

        <text x="285" y="60" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Necklaces: (n-1)! / 2</text>
        <text x="285" y="75" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">When clockwise and</text>
        <text x="285" y="87" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">anticlockwise match</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function PermCombBinomialDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'decision' | 'binomial' | 'beggar'>('decision');

  // Interactive Binomial Visualizer State
  const [powerN, setPowerN] = useState<number>(4);

  // Combinatorics Calculator States
  const [calcN, setCalcN] = useState<string>('5');
  const [calcR, setCalcR] = useState<string>('2');

  const n = parseInt(calcN) || 0;
  const r = parseInt(calcR) || 0;

  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const nPr = n >= r && n >= 0 && r >= 0 ? factorial(n) / factorial(n - r) : 0;
  const nCr = n >= r && n >= 0 && r >= 0 ? nPr / factorial(r) : 0;

  // Render color-coded expansion terms for (a+b)^p
  const renderBinomialExpansion = (p: number) => {
    const terms: React.ReactNode[] = [];
    for (let i = 0; i <= p; i++) {
      const coeff = factorial(p) / (factorial(i) * factorial(p - i));
      const aPower = p - i;
      const bPower = i;

      terms.push(
        <span key={i} className="inline-block whitespace-nowrap mx-1.5 my-1">
          {i > 0 && <span className="text-white/40 mr-1.5">+</span>}
          <span className="text-cyan-400 font-bold">{coeff}</span>
          {aPower > 0 && (
            <span>
              <span className="text-white">a</span>
              {aPower > 1 && <sup className="text-emerald-400 text-[10px]">{aPower}</sup>}
            </span>
          )}
          {bPower > 0 && (
            <span>
              <span className="text-white">b</span>
              {bPower > 1 && <sup className="text-violet-400 text-[10px]">{bPower}</sup>}
            </span>
          )}
        </span>
      );
    }
    return <div className="flex flex-wrap items-center justify-center p-4 bg-black/40 border border-white/5 rounded-2xl text-xs">{terms}</div>;
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xl p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🎲</span>
              <Tag color="cyan">Math Unit 1</Tag>
              <Tag color="rose">IAT Foundation</Tag>
              <Tag color="amber">Core Syllabus</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-sm font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Counting Principles, Permutations, Combinations and Binomial Theorem
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[11px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Arithmetic Operations</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Algebraic Expansion</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '45 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium-Hard (3.8/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-xs font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-white/40">
              <span className="uppercase tracking-wider">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[10px] text-white/35 font-medium">
              {isCompleted ? 'Reading Completed — Quiz Unlocked! 🔓' : 'Scroll to complete the lesson and unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

      {/* PART 0: FUNDAMENTAL PRINCIPLES OF COUNTING & FACTORIALS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">PART 0</span>
          <h2 className="text-white font-display font-bold text-base">Fundamental Principles of Counting &amp; Factorials</h2>
        </div>
        <p className="text-white/60 text-xs leading-relaxed">
          Before applying permutations or combinations, we must build counting structures from the ground up using core logical operations and factorials.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">1. Addition Principle</h3>
            <p className="text-white/70 text-[11.5px] leading-relaxed">
              If an operation can be performed in <code>m</code> ways and a second operation (mutually exclusive from the first) in <code>n</code> ways, then either of the two operations can be performed in <code>m + n</code> ways.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-white/50 space-y-1.5">
              <p><strong className="text-cyan-300">Example A1:</strong> Select a book from 3 Chemistry books or 4 Physics books. Total ways = <code>3 + 4 = 7</code>.</p>
              <p><strong className="text-cyan-300">Example A2:</strong> Travel from City A to B via 3 flights or 2 train routes. Total ways = <code>3 + 2 = 5</code>.</p>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">2. Multiplication Principle</h3>
            <p className="text-white/70 text-[11.5px] leading-relaxed">
              If an operation can be performed in <code>m</code> ways, and following it, a second operation can be performed in <code>n</code> ways, then the two operations in succession can be performed in <code>m × n</code> ways.
            </p>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-white/50 space-y-1.5">
              <p><strong className="text-cyan-300">Example M1:</strong> Choose 1 Chemistry book AND 1 Physics book out of 3 Chem and 4 Phys. Total ways = <code>3 × 4 = 12</code>.</p>
              <p><strong className="text-cyan-300">Example M2:</strong> Number of 2-digit numbers formed using digits <code>{'{1, 2, 3}'}</code> without repetition = <code>3 × 2 = 6</code>.</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Factorial Section */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">3. Factorial n (n!)</h3>
            <p className="text-white/70 text-[11.5px] leading-relaxed">
              The product of the first <code>n</code> consecutive natural numbers is denoted by <code>n!</code>:
              <br />
              <code>n! = 1 × 2 × 3 × ... × n</code>
            </p>
            <div className="text-[11px] text-white/60 space-y-1 bg-black/40 p-3 rounded-xl">
              <p>&bull; <strong>Recursive relation:</strong> <code>n! = n × (n − 1)!</code></p>
              <p>&bull; <strong>Special definitions:</strong> <code>0! = 1</code> and <code>1! = 1</code></p>
              <p>&bull; <strong>Growth rate:</strong> Factorials grow faster than exponential functions (e.g. <code>10! = 3,628,800</code>).</p>
            </div>
            {/* Factorial Table */}
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left border-collapse text-[10px] text-white/50">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-1 font-bold">n</th>
                    <th className="pb-1 font-bold">n! Value</th>
                    <th className="pb-1 font-bold">n</th>
                    <th className="pb-1 font-bold">n! Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-1">1!</td><td className="py-1">1</td>
                    <td className="py-1">6!</td><td className="py-1">720</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-1">2!</td><td className="py-1">2</td>
                    <td className="py-1">7!</td><td className="py-1">5,040</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-1">3!</td><td className="py-1">6</td>
                    <td className="py-1">8!</td><td className="py-1">40,320</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-1">4!</td><td className="py-1">24</td>
                    <td className="py-1">9!</td><td className="py-1">362,880</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-1">5!</td><td className="py-1">120</td>
                    <td className="py-1">10!</td><td className="py-1">3,628,800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Principle of Inclusion-Exclusion */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 flex flex-col justify-between">
            <div>
              <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">4. Principle of Inclusion-Exclusion (PIE)</h3>
              <p className="text-white/70 text-[11.5px] leading-relaxed mb-2">
                Used to find the size of the union of sets by adding individual sizes and subtracting overlapping intersections.
              </p>
              <div className="space-y-1.5 text-[11px] text-white/60 bg-black/40 p-3 rounded-xl">
                <p><strong>For 2 Sets A &amp; B:</strong></p>
                <code className="text-cyan-300">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</code>
                <p className="pt-1.5"><strong>For 3 Sets A, B &amp; C:</strong></p>
                <code className="text-cyan-300 block leading-tight">
                  n(A ∪ B ∪ C) = n(A) + n(B) + n(C) − n(A ∩ B) − n(B ∩ C) − n(C ∩ A) + n(A ∩ B ∩ C)
                </code>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-[11px] text-white/70">
              <strong>Example:</strong> Out of 50 students, 30 study Physics (P) and 25 study Chemistry (C), with 10 studying both. How many study at least one?
              <br />
              <code>n(P ∪ C) = 30 + 25 − 10 = 45 students</code>.
            </div>
          </div>
        </div>
      </div>

      {/* PART 1: PERMUTATIONS (ARRANGEMENTS) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-base">Permutations — Derivations &amp; Configurations</h2>
        </div>
        <p className="text-white/60 text-xs leading-relaxed">
          Permutations calculate the number of arrangements where <strong>order matters</strong>. We look at derivations, repetitions, alike objects, restricted cases, and circular arrangements.
        </p>

        <DecisionFlowchartSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="nPr = n! / (n − r)!"
            use="Standard Permutation formula (n distinct objects taken r at a time)"
            note="Derived directly by applying the Multiplication Principle across r sequential vacant spaces."
            priority={5}
          />
          <FormulaCard
            formula="nPn = n!"
            use="Arranging all n distinct objects together"
            note="Since no objects are left out, it represents full linear arrangements."
            priority={5}
          />
        </div>

        {/* Derivation: nPr */}
        <DerivationBox
          title="Derivation of nPr Formula"
          steps={[
            "Suppose we have <code>r</code> vacant places to fill using <code>n</code> distinct objects.",
            "The first place can be filled in <code>n</code> ways.",
            "The second place can be filled in <code>n − 1</code> ways, the third in <code>n − 2</code> ways, and so on.",
            "Continuing down, the <code>r</code>-th place can be filled in <code>n − (r − 1) = n − r + 1</code> ways.",
            "By the Multiplication Principle, the total number of ways is:<br/><code>nPr = n(n − 1)(n − 2)...(n − r + 1)</code>.",
            "Multiply and divide by <code>(n − r)! = (n − r)(n − r − 1)...3 × 2 × 1</code>:<br/><code>nPr = [n(n − 1)...(n − r + 1) × (n − r)!] / (n − r)! = n! / (n − r)!</code>."
          ]}
        />

        <div className="grid sm:grid-cols-3 gap-3">
          {/* Repetition */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] space-y-1">
            <span className="text-cyan-400 font-bold block">1. Repetition Allowed</span>
            <p className="text-white/70">Number of permutations of <code>n</code> objects taken <code>r</code> at a time when repetition is allowed is:</p>
            <code className="text-cyan-300 block text-center py-1.5 text-xs font-bold">n^r</code>
            <p className="text-white/40 text-[10px]">Example: Forming 3-digit numbers from digits {'{1,2,3,4,5}'} allowing repetition = <code>5³ = 125</code>.</p>
          </div>

          {/* Alike Objects */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] space-y-1">
            <span className="text-cyan-400 font-bold block">2. Alike Objects of Same Kind</span>
            <p className="text-white/70">Permutations of <code>n</code> objects where <code>p</code> are alike of kind 1, <code>q</code> alike of kind 2, and <code>r</code> alike of kind 3:</p>
            <code className="text-cyan-300 block text-center py-1.5 text-xs font-bold">n! / (p! · q! · r!)</code>
            <p className="text-white/40 text-[10px]">Example: Arranging letters of "ARRANGE" (7 letters: 2 A's, 2 R's) = <code>7! / (2! 2!) = 1260</code>.</p>
          </div>

          {/* Selections from n Objects */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] space-y-1">
            <span className="text-cyan-400 font-bold block">3. Total Selections</span>
            <p className="text-white/70">Total ways to select at least one object from <code>n</code> distinct objects:</p>
            <code className="text-cyan-300 block text-center py-1.5 text-xs font-bold">2^n − 1</code>
            <p className="text-white/40 text-[10px]">Example: Choosing any subset of items from 5 distinct options = <code>2⁵ − 1 = 31</code>.</p>
          </div>
        </div>

        {/* Restricted Permutations Box */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            Restricted Permutations (Syllabus Core)
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">A. Objects Always Together (Tie / String Method)</span>
              <p className="text-white/70">
                To keep specific objects together, tie them into a <strong>single block/unit</strong>. Permute the other objects along with this unit, then multiply by internal permutations of the objects within the unit.
              </p>
              <p className="text-white/50 text-[11px]">
                <strong>Example:</strong> Arrange 5 boys and 3 girls in a row such that girls sit together.
                <br />
                1. Group 3 girls into 1 unit. Total units = 5 boys + 1 block = 6.
                <br />
                2. Arrange units: <code>6!</code>.
                <br />
                3. Arrange girls internally: <code>3!</code>.
                <br />
                4. Total ways = <code>6! × 3! = 720 × 6 = 4320</code>.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">B. Objects Never Together (Gap / Insertion Method)</span>
              <p className="text-white/70">
                To prevent specific objects from sitting next to each other, first arrange the other objects in a row. Identify the empty spaces (gaps) between them, and insert the restricted objects into those gaps.
              </p>
              <p className="text-white/50 text-[11px]">
                <strong>Example:</strong> Arrange 5 boys and 3 girls such that no two girls are together.
                <br />
                1. Arrange boys first: <code>5! = 120</code>.
                <br />
                2. Gaps created = 5 + 1 = 6.
                <br />
                3. Select and arrange girls in gaps: <code>⁶C₃ × 3! = 120</code>.
                <br />
                4. Total ways = <code>120 × 120 = 14,400</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Circular Permutations */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Circular Permutations Derivation &amp; Constraints</h3>
          <CircularSeatingSVG />

          <DerivationBox
            title="Derivation of Circular Permutation Formula"
            steps={[
              "For <code>n</code> distinct objects in a linear row, there are <code>n!</code> arrangements.",
              "If we join the ends of the line to form a circle, shifting each person one seat to the right gives the same relative arrangement.",
              "Specifically, for any arrangement, there are <code>n</code> equivalent shifted linear representations (e.g. <code>ABC</code>, <code>BCA</code>, and <code>CAB</code> are identical on a circle).",
              "Therefore, each circular arrangement is overcounted <code>n</code> times in the linear calculation.",
              "Dividing linear arrangements by <code>n</code>, we get the circular formula: <code>n! / n = (n − 1)!</code>."
            ]}
          />

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">1. Symmetrical Case (Necklaces &amp; Garlands)</span>
              <p className="text-white/70">
                If the circle can be flipped over (like a bead necklace where clockwise and anticlockwise orientations are indistinguishable), then the number of unique arrangements is halved:
                <br />
                <code className="text-cyan-300 font-mono block text-center py-1 my-1 border border-white/5 bg-black/20 font-bold text-xs">(n − 1)! / 2</code>
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">2. Circular Permutations with Restrictions</span>
              <p className="text-white/70">
                &bull; <strong>Specific pair always together:</strong> Treat the pair as 1 unit. Circular units = <code>(n-1)</code>. Arrangements = <code>(n-2)!</code>. The pair can swap in <code>2!</code> ways. Total = <code>2! × (n-2)!</code>.
                <br />
                &bull; <strong>Specific pair never together:</strong> Total circular arrangements minus the together arrangements = <code>(n-1)! − 2(n-2)! = (n-3) × (n-2)!</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: COMBINATIONS (SELECTIONS) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-base">Combinations — Selections, Properties &amp; Grouping</h2>
        </div>
        <p className="text-white/60 text-xs leading-relaxed">
          Combinations count the number of selections where <strong>order is irrelevant</strong>. We examine properties, selections with repetition, and group division.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="nCr = n! / (r! · (n − r)!)"
            use="Standard Combinations formula"
            note="Selects a subset of r objects from n distinct items. Division by r! eliminates order bias."
            priority={5}
          />
          <FormulaCard
            formula="Ways = ^{n+r−1}Cr"
            use="Combinations with Repetition"
            note="Number of ways to select r elements from a pool of n different types where repetition is allowed."
            priority={5}
          />
        </div>

        {/* Derivation: nCr */}
        <DerivationBox
          title="Derivation of nCr from nPr"
          steps={[
            "Let the number of ways to select <code>r</code> objects from <code>n</code> distinct items be <code>nCr</code>.",
            "Once we have selected a group of <code>r</code> objects, these <code>r</code> selected items can be ordered/arranged among themselves in <code>r!</code> ways.",
            "By the Multiplication Principle, the total number of ways to select AND arrange <code>r</code> items is:<br/><code>Ways = nCr × r!</code>.",
            "But the act of selecting and arranging <code>r</code> items is the definition of permutations <code>nPr</code>.",
            "Therefore, we establish the relation:<br/><code>nPr = nCr × r!</code>.",
            "Rearranging to solve for combinations:<br/><code>nCr = nPr / r! = n! / [r! · (n − r)!]</code>."
          ]}
        />

        {/* Identities Detail Grid */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Properties of nCr</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 text-white/70">
              <p>&bull; <strong>Symmetry:</strong> <code>nCr = nCn-r</code>. Selecting <code>r</code> items is equivalent to choosing <code>n-r</code> items to leave behind.</p>
              <p>&bull; <strong>Pascal's Identity:</strong> <code>nCr + nCr-1 = n+1Cr</code>. The basis of building Pascal's Triangle rows.</p>
              <p>&bull; <strong>Absorption / Reduction:</strong> <code>r × nCr = n × n-1Cr-1</code> (useful for algebraic simplifications in series).</p>
            </div>
            <div className="space-y-2 text-white/70">
              <p>&bull; <strong>Ratio Identity:</strong> <code>nCr / nCr-1 = (n − r + 1) / r</code>.</p>
              <p>&bull; <strong>Maximum value of nCr:</strong> For a given <code>n</code>, the value of <code>nCr</code> peaks at the middle term:
                <br />
                &nbsp;&nbsp;- If <code>n</code> is even: Maximum at <code>r = n/2</code>.
                <br />
                &nbsp;&nbsp;- If <code>n</code> is odd: Maximum at <code>r = (n-1)/2</code> and <code>r = (n+1)/2</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Group Divisions */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Division of Objects into Groups</h3>
          <p className="text-white/60 text-xs">
            A critical IAT topic. We divide objects into subsets based on whether groups are of equal or unequal sizes, and whether recipients are identical (heaps) or distinct (people).
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">1. Division into Unequal Groups</span>
              <p className="text-white/70">
                Number of ways to divide <code>(m + n + p)</code> distinct objects into three unequal groups of sizes <code>m</code>, <code>n</code>, and <code>p</code> is:
                <br />
                <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono">(m+n+p)! / (m! · n! · p!)</code>
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">2. Division into Equal Groups</span>
              <p className="text-white/70">
                If we divide <code>3m</code> distinct objects into 3 equal groups of size <code>m</code>:
                <br />
                &bull; <strong>Identical Groups (Heaps / Packets):</strong> Divide by <code>3!</code> to prevent overcounting the order of groups:
                <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono">(3m)! / ((m!)³ · 3!)</code>
                &bull; <strong>Distinct Groups (Distributed to 3 People):</strong> Permute the 3 heaps among recipients by multiplying by <code>3!</code>:
                <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono">(3m)! / (m!)³</code>
              </p>
            </div>
          </div>
        </div>

        {/* Selections from Alike vs Distinct Objects */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-cyan-500/10 space-y-3">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Total Selections from Mixed (Alike &amp; Distinct) Objects</h3>
          <p className="text-white/70 text-xs">
            Suppose there are <code>p</code> alike objects of kind 1, <code>q</code> alike of kind 2, <code>r</code> alike of kind 3, and <code>k</code> distinct objects:
          </p>
          <div className="p-4 rounded-xl bg-black/40 text-xs text-white/80 space-y-2">
            <p>1. Number of ways to select zero or more objects: <code>(p + 1)(q + 1)(r + 1) × 2^k</code></p>
            <p>2. Number of ways to select <strong>at least one</strong> object: <code className="text-cyan-300 font-mono font-bold">[(p + 1)(q + 1)(r + 1) × 2^k] − 1</code></p>
            <p className="text-white/40 text-[10px] leading-relaxed">
              Reasoning: For each alike group of size <code>p</code>, we can choose to select 0, 1, 2, ..., or <code>p</code> items (hence <code>p+1</code> choices). For distinct objects, each can be selected or not (<code>2^k</code> choices). We subtract 1 to exclude the empty selection.
            </p>
          </div>
        </div>
      </div>

      {/* PART 3: APPLICATIONS OF P&C (HIGH PRIORITY) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-base">Standard Application Archetypes</h2>
        </div>
        <p className="text-white/60 text-xs leading-relaxed">
          The IAT heavily features standard categories of counting problems. Mastering these specific templates is crucial to scoring well.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          {/* Word Formation */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 font-bold uppercase tracking-wider">1. Word Formation Problems</h3>
            <p className="text-white/70 leading-relaxed">
              Standard problems involving arranging letters with specific constraints:
              <br />
              &bull; <strong>With alike letters:</strong> Divide total factorial by letter frequency factorials.
              <br />
              &bull; <strong>Vowel constraints:</strong> Treat vowels as a group (Tie method) or separate them using consonants as shields (Gap method).
              <br />
              &bull; <strong>Start / End letters:</strong> Fix letters at boundary positions and permute remaining items.
            </p>
          </div>

          {/* Number Formation */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 font-bold uppercase tracking-wider">2. Number Formation Problems</h3>
            <p className="text-white/70 leading-relaxed">
              Forming numbers using a given set of digits:
              <br />
              &bull; <strong>Zero Constraint:</strong> Digit <code>0</code> cannot occupy the leftmost position (highest place value).
              <br />
              &bull; <strong>Even / Odd constraints:</strong> Final unit digit must be selected from even/odd choices respectively.
              <br />
              &bull; <strong>Divisibility Rules:</strong> 
              <br />
              &nbsp;&nbsp;- Divisible by 5: Ends in 0 or 5.
              <br />
              &nbsp;&nbsp;- Divisible by 3: Sum of selected digits must be a multiple of 3.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          {/* Committee Selection */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 font-bold uppercase tracking-wider">3. Committee &amp; Selection constraints</h3>
            <p className="text-white/70 leading-relaxed">
              Selecting subsets with specified membership criteria:
              <br />
              &bull; <strong>At least / At most:</strong> Separate into mutually exclusive cases and sum results.
              <br />
              &bull; <strong>Inclusive / Exclusive:</strong> If person A must be included, select remaining <code>r-1</code> from <code>n-1</code> (<code>ⁿ⁻¹C_r-1</code>). If person B is excluded, select all <code>r</code> from <code>n-1</code> (<code>ⁿ⁻¹C_r</code>).
            </p>
          </div>

          {/* Geometrical Applications */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 font-bold uppercase tracking-wider">4. Geometrical Configurations</h3>
            <p className="text-white/70 leading-relaxed">
              Counting geometric components from <code>n</code> points:
              <br />
              &bull; <strong>Straight lines:</strong> <code>ⁿC₂</code> (if no 3 collinear). If <code>m</code> points are collinear, lines = <code className="text-cyan-300">ⁿC₂ − ᵐC₂ + 1</code>.
              <br />
              &bull; <strong>Triangles:</strong> <code>ⁿC₃</code>. If <code>m</code> points are collinear, triangles = <code className="text-cyan-300">ⁿC₃ − ᵐC₃</code>.
              <br />
              &bull; <strong>Polygon Diagonals:</strong> <code>ⁿC₂ − n = n(n − 3)/2</code>.
              <br />
              &bull; <strong>Intersection points:</strong> Maximum intersection points of <code>n</code> lines = <code>ⁿC₂</code>.
            </p>
          </div>
        </div>
      </div>

      {/* PART 4: BINOMIAL THEOREM (POSITIVE INTEGRAL INDEX) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-base">Binomial Theorem — Expansion, Properties &amp; Applications</h2>
        </div>
        <p className="text-white/60 text-xs leading-relaxed">
          The Binomial Theorem expands positive integer powers of binomial expressions. Its coefficients align with Pascal's Triangle.
        </p>

        <PascalsTriangleSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="T_r+1 = nCr · x^{n−r} · y^r"
            use="General Term in expansion (x + y)ⁿ"
            note="Note that the index r is 0-indexed, meaning the 4th term (T_4) requires plugging in r = 3."
            priority={5}
          />
          <FormulaCard
            formula="(x + y)ⁿ = &Sigma;_{r=0}^{n} nCr · x^{n−r} · y^r"
            use="Full Binomial Expansion formula"
            note="Total terms in the expansion equals n + 1."
            priority={5}
          />
        </div>

        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] space-y-1.5 text-white/70">
          <strong className="text-white text-xs block mb-1">🔗 Middle Term Rules</strong>
          <p>&bull; <strong>If n is even:</strong> Single middle term at position <code>T_(n/2)+1</code> with coefficient <code>ⁿC_n/2</code>.</p>
          <p>&bull; <strong>If n is odd:</strong> Two middle terms at positions <code>T_(n+1)/2</code> and <code>T_(n+3)/2</code> with equal coefficients <code>ⁿC_(n-1)/2 = ⁿC_(n+1)/2</code>.</p>
        </div>

        {/* Properties of Binomial Coefficients */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Properties of Binomial Coefficients (C_r)</h3>
          <p className="text-white/60 text-xs">Let <code>C_r</code> denote <code>ⁿC_r</code>. By expanding <code>(1 + x)ⁿ</code>, we derive critical identities tested in the IAT:</p>
          
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">1. Sum of All Coefficients</span>
              <code className="text-cyan-300 block font-mono bg-black/20 p-1.5 border border-white/5 text-center">C₀ + C₁ + C₂ + ... + Cn = 2ⁿ</code>
              <p className="text-white/40 text-[10px]">Proof: Set <code>x = 1</code> in <code>(1 + x)ⁿ</code>.</p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">2. Alternating Sum (Even vs Odd Sums)</span>
              <code className="text-cyan-300 block font-mono bg-black/20 p-1.5 border border-white/5 text-center">C₀ + C₂ + C₄ + ... = C₁ + C₃ + C₅ + ... = 2ⁿ⁻¹</code>
              <p className="text-white/40 text-[10px]">Proof: Set <code>x = −1</code> in <code>(1 + x)ⁿ</code>, leading to <code>C₀ − C₁ + C₂ ... = 0</code>.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">3. Sum of Squares of Coefficients</span>
              <code className="text-cyan-300 block font-mono bg-black/20 p-1.5 border border-white/5 text-center">C₀² + C₁² + C₂² + ... + Cn² = ²ⁿCn</code>
              <p className="text-white/40 text-[10px]">Proof: Equate the coefficient of <code>xⁿ</code> in <code>(1+x)ⁿ(x+1)ⁿ = (1+x)²ⁿ</code>.</p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">4. Numerically Greatest Term (NGT)</span>
              <p className="text-white/70">
                To find the NGT in the expansion of <code>(a + b)ⁿ</code>:
                <br />
                1. Write <code>(a + b)ⁿ = aⁿ(1 + x)ⁿ</code>, where <code>x = |b / a|</code>.
                <br />
                2. Calculate value <code>m = (n + 1)x / (1 + x)</code>.
                <br />
                3. <strong>If m is an integer:</strong> The terms <code>T_m</code> and <code>T_m+1</code> are equal and are the greatest terms.
                <br />
                4. <strong>If m is not an integer:</strong> Let <code>p = [m]</code> (greatest integer part). The term <code>T_p+1</code> is the unique greatest term.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">5. Numerical Approximations</span>
              <p className="text-white/70">
                For very small value <code>x</code> (i.e. <code>|x| &lt;&lt; 1</code>), we can drop higher power terms in the binomial expansion:
                <code className="text-cyan-300 block my-1 font-mono text-center bg-black/20 p-1 font-bold text-xs">(1 + x)ⁿ &asymp; 1 + nx</code>
                Useful for estimations in physical measurements (e.g. <code>(1.002)¹⁰ &asymp; 1 + 10(0.002) = 1.02</code>).
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">6. Divisibility Problems</span>
              <p className="text-white/70 text-[11px]">
                To show that expression <code>Aⁿ − B·n − 1</code> is divisible by a number <code>K</code> (where <code>K = d²</code>):
                <br />
                1. Rewrite base <code>A</code> as <code>1 + d</code>.
                <br />
                2. Expand <code>(1 + d)ⁿ</code> using Binomial Theorem.
                <br />
                3. Isolate the first two terms to cancel out <code>B·n + 1</code>.
                <br />
                4. Factor out <code>d²</code> from the remaining terms. (See solved Example 6).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 5: INTERACTIVE BINOMIAL EXPANSION VISUALIZER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-base uppercase tracking-wider">Binomial Expansion Visualizer</h2>
        </div>
        <p className="text-white/55 text-xs">
          Vary the power exponent index (n) to visually trace coefficient symmetry, a-powers, and b-powers.
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] font-bold text-white/40 mb-1">
              <span>Expansion Power (n): {powerN}</span>
              <span>Total Terms: {powerN + 1}</span>
            </div>
            <input
              type="range" min="1" max="6" step="1"
              value={powerN} onChange={e => setPowerN(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-white/35 block">Algebraic Expansion of (a + b)ⁿ:</span>
            {renderBinomialExpansion(powerN)}
          </div>
        </div>
      </div>

      {/* PART 6: DYNAMIC COMBINATORICS CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-base uppercase tracking-wider">Combinatorics Calculator</h2>
        </div>
        <p className="text-white/55 text-xs">
          Enter values for total objects (n) and selections (r) to compute arrangements vs selections.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-white/40 block mb-1">Total Objects (n):</label>
            <input
              type="number" min="0" max="12"
              value={calcN} onChange={e => setCalcN(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-cyan-400/40"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 block mb-1">Selected Objects (r):</label>
            <input
              type="number" min="0" max="12"
              value={calcR} onChange={e => setCalcR(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-cyan-400/40"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">Permutations nPr (Arrangements)</span>
            <p className="text-base font-bold text-cyan-400 my-1">
              {nPr.toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">Combinations nCr (Selections)</span>
            <p className="text-base font-bold text-violet-400 my-1">
              {nCr.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* PART 7: FORMULA QUICK-REFERENCE TABLE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Table className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-base uppercase tracking-wider">Formula Quick-Reference Guide</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-white/70">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] uppercase font-bold tracking-wider text-white/40">
                <th className="p-3">Topic / Concept</th>
                <th className="p-3">Mathematical Formula</th>
                <th className="p-3">Primary Condition / Constraint</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Addition Principle</td>
                <td className="p-3 font-mono text-cyan-300">m + n</td>
                <td className="p-3">Mutually exclusive events</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Multiplication Principle</td>
                <td className="p-3 font-mono text-cyan-300">m × n</td>
                <td className="p-3">Sequential, independent stages</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Standard Permutation</td>
                <td className="p-3 font-mono text-cyan-300">nPr = n! / (n − r)!</td>
                <td className="p-3">Arranging r items out of n, order matters</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Alike Permutation</td>
                <td className="p-3 font-mono text-cyan-300">n! / (p! · q! · r!)</td>
                <td className="p-3">p, q, r are quantities of repeating objects</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Circular Seating</td>
                <td className="p-3 font-mono text-cyan-300">(n − 1)!</td>
                <td className="p-3">No distinct top/bottom reference</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Bead Necklace</td>
                <td className="p-3 font-mono text-cyan-300">(n − 1)! / 2</td>
                <td className="p-3">Clockwise &amp; counterclockwise match</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Standard Selection</td>
                <td className="p-3 font-mono text-cyan-300">nCr = n! / [r! · (n − r)!]</td>
                <td className="p-3">Choosing r items out of n, order irrelevant</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Identical Distribution</td>
                <td className="p-3 font-mono text-cyan-300">ⁿ⁺ʳ⁻¹Cr₋₁</td>
                <td className="p-3">Beggar's method (non-negative solutions)</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Total Selections</td>
                <td className="p-3 font-mono text-cyan-300">2ⁿ − 1</td>
                <td className="p-3">Selecting at least 1 from n distinct objects</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Middle Term (Even n)</td>
                <td className="p-3 font-mono text-cyan-300">T_(n/2)+1 = ⁿC_n/2</td>
                <td className="p-3">Single middle term (n is even)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PART 8: SOLVED EXAMPLES (10 TOTAL EXAMPLES) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
          <h3 className="text-white font-display font-bold text-base uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 1: Term Independent of x</span>
          <p className="text-white/80 font-bold">Find the term independent of x in the expansion of (x² + 1/x)⁹.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Write General Term: <code>T_r+1 = ⁹Cr · (x²)^(9−r) · (x⁻¹)^r = ⁹Cr · x^(18 − 3r)</code>.</p>
            <p>2. Set power of x to zero for term independent of x: <code>18 − 3r = 0 &rArr; r = 6</code>.</p>
            <p>3. Calculate coefficient: <code>⁹C₆ = ⁹C₃ = (9 × 8 × 7) / (3 × 2 × 1) = 84</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: The term independent of x is T_7 = 84</p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 2: Stars &amp; Bars with Minimum Constraints</span>
          <p className="text-white/80 font-bold">Find the number of non-negative integer solutions to the equation x + y + z = 8, subject to the constraints x &ge; 2 and y &ge; 1.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Distribute minimum constraint counts first: give 2 to x, and 1 to y. Remaining items to distribute: <code>8 − 2 − 1 = 5</code>.</p>
            <p>2. We now distribute 5 identical items among 3 variables (x', y', z) with no further constraints: <code>n = 5</code>, <code>r = 3</code>.</p>
            <p>3. Apply Stars &amp; Bars: <code>Ways = ⁿ⁺ʳ⁻¹C_r-1 = ⁵⁺³⁻¹C_3-1 = ⁷C₂ = (7 × 6) / 2 = 21</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: Total integer solutions = 21</p>
          </div>
        </div>

        {/* Example 3 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 3: Dictionary Rank of Words</span>
          <p className="text-white/80 font-bold">Find the dictionary rank of the word "MATH" when all permutations are listed alphabetically.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Alphabetical order of letters: A, H, M, T.</p>
            <p>2. Count words starting with A: <code>3! = 6</code>.</p>
            <p>3. Count words starting with H: <code>3! = 6</code>.</p>
            <p>4. Next starting letter is M. Following M, alphabetical letters are A &rarr; H &rarr; T, forming "MATH". This is the 1st word starting with M.</p>
            <p>5. Add up ranks: <code>6 + 6 + 1 = 13</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: Rank of MATH = 13</p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 4: Derangements Application</span>
          <p className="text-white/80 font-bold">A student writes 4 distinct letters to 4 different friends. If they place the letters into envelopes at random, in how many ways will NONE of the letters reach their correct friend?</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. This is a derangement problem with <code>n = 4</code>.</p>
            <p>2. Apply formula: <code>D₄ = 4! · [1 − 1/1! + 1/2! − 1/3! + 1/4!]</code>.</p>
            <p>3. Calculate: <code>D₄ = 24 · [1 − 1 + 0.5 − 0.1667 + 0.0417] = 24 · [1/2 − 1/6 + 1/24] = 12 − 4 + 1 = 9</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: Total derangement arrangements = 9</p>
          </div>
        </div>

        {/* Example 5 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 5: Word Permutations with Alike Objects</span>
          <p className="text-white/80 font-bold">Find the number of ways to arrange the letters of the word "ARRANGE" such that the two R's are never together.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify the letter pool: 7 letters total. A (2), R (2), G (1), N (1), E (1).</p>
            <p>2. First arrange the letters other than R (A, A, G, N, E). Total items = 5 (with 2 identical A's). Arrangements = <code>5! / 2! = 60</code>.</p>
            <p>3. This creates 6 empty slots (gaps) to place the two R's: <code>_ A _ A _ G _ N _ E _</code>.</p>
            <p>4. Select 2 gaps from the 6 available slots: <code>⁶C₂ = 15</code>. Since the two R's are identical, we do not multiply by 2!.</p>
            <p>5. Total ways = <code>60 × 15 = 900</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: Total arrangements with R's separated = 900</p>
          </div>
        </div>

        {/* Example 6 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 6: Divisibility Proof using Binomial Theorem</span>
          <p className="text-white/80 font-bold">Prove that 9ⁿ − 8n − 1 is divisible by 64 for all positive integers n.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Express 9 as <code>(1 + 8)</code>. Thus, <code>9ⁿ = (1 + 8)ⁿ</code>.</p>
            <p>2. Expand using the Binomial Theorem:<br /><code>(1 + 8)ⁿ = ⁿC₀ + ⁿC₁(8) + ⁿC₂(8²) + ⁿC₃(8³) + ... + ⁿCn(8ⁿ)</code>.</p>
            <p>3. Simplify first two terms: <code>ⁿC₀ = 1</code> and <code>ⁿC₁(8) = 8n</code>.
              <br />
              So: <code>9ⁿ = 1 + 8n + 64(ⁿC₂ + ⁿC₃(8) + ... + ⁿCn(8ⁿ⁻²))</code>.
            </p>
            <p>4. Subtract <code>8n + 1</code> from both sides:
              <br />
              <code>9ⁿ − 8n − 1 = 64(ⁿC₂ + 8·ⁿC₃ + ... ) = 64 × K</code> (where K is an integer).
            </p>
            <p className="text-cyan-300 font-bold">Conclusion: Since it can be factored as 64K, the expression is always divisible by 64.</p>
          </div>
        </div>

        {/* Example 7 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 7: Geometrical Configurations</span>
          <p className="text-white/80 font-bold">A plane contains 10 points. 4 of these points lie on a single straight line, but no other 3 points are collinear. Find: (i) the number of unique straight lines, and (ii) the number of triangles that can be formed.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p><strong>(i) Straight Lines:</strong></p>
            <p>1. Selecting 2 points out of 10 gives <code>¹⁰C₂ = 45</code> lines.</p>
            <p>2. However, the 4 collinear points form only 1 unique line instead of <code>⁴C₂ = 6</code> lines.</p>
            <p>3. Apply collinear adjustment formula: <code>Lines = ¹⁰C₂ − ⁴C₂ + 1 = 45 − 6 + 1 = 40</code>.</p>
            <p><strong>(ii) Triangles:</strong></p>
            <p>1. Selecting 3 points out of 10 gives <code>¹⁰C₃ = 120</code> triangles.</p>
            <p>2. Collinear points cannot form triangles, so subtract combinations among them: <code>⁴C₃ = 4</code>.</p>
            <p>3. Apply adjustment: <code>Triangles = ¹⁰C₃ − ⁴C₃ = 120 − 4 = 116</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: (i) 40 unique lines, (ii) 116 unique triangles</p>
          </div>
        </div>

        {/* Example 8 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 8: Division into Equal vs. Unequal Groups</span>
          <p className="text-white/80 font-bold">Find the number of ways to divide 12 distinct books into 3 equal packets of 4 books each.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. This is a division into equal groups of size 4. Total books <code>3m = 12</code>, group size <code>m = 4</code>.</p>
            <p>2. Since the packets are identical (heaps), the order of the packets does not matter. Thus we divide by <code>3!</code> to prevent overcounting.</p>
            <p>3. Apply the equal packets formula: <code>Ways = 12! / ((4!)³ · 3!)</code>.</p>
            <p>4. Calculation: <code>[12 × 11 × 10 × 9 × 8 × 7 × 6 × 5] / [(24)² × 6] = 5775</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: Total ways to divide into 3 packets = 5775</p>
          </div>
        </div>

        {/* Example 9 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 9: Numerically Greatest Term in a Binomial Expansion</span>
          <p className="text-white/80 font-bold">Find the numerically greatest term in the expansion of (3 + 2x)⁹ when x = 1.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Rewrite: <code>(3 + 2x)⁹ = 3⁹ · (1 + 2x/3)⁹</code>. Let <code>X = |2x/3| = 2/3</code> since x = 1.</p>
            <p>2. Calculate <code>m = (n + 1)X / (1 + X) = (9 + 1)(2/3) / (1 + 2/3) = (20/3) / (5/3) = 4</code>.</p>
            <p>3. Since <code>m = 4</code> is an integer, there are two equal greatest terms: <code>T_4</code> and <code>T_5</code>.</p>
            <p>4. Compute value of T_4: <code>T_4 = ⁹C₃ · (3)⁶ · (2x)³ = 84 × 729 × 8 = 489,888</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: The greatest terms are T_4 and T_5, with a value of 489,888.</p>
          </div>
        </div>

        {/* Example 10 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-xs">
          <span className="text-[10px] font-bold text-emerald-400 uppercase block">Example 10: Sum of Binomial Coefficients Series</span>
          <p className="text-white/80 font-bold">Find the value of the series: C₀ + 2·C₁ + 3·C₂ + ... + (n+1)·Cn, where C_r = ⁿC_r.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Write general term of the series: <code>S = &Sigma;_{"{"}r=0{"}"}^{"{"}n{"}"} (r + 1) · ⁿC_r</code>.</p>
            <p>2. Split the summation: <code>S = &Sigma;_{"{"}r=0{"}"}^{"{"}n{"}"} r · ⁿC_r + &Sigma;_{"{"}r=0{"}"}^{"{"}n{"}"} ⁿC_r</code>.</p>
            <p>3. We know the standard identities:
              <br />
              &bull; <code>&Sigma; r·ⁿC_r = n · 2ⁿ⁻¹</code> (by taking derivative of <code>(1+x)ⁿ</code>).
              <br />
              &bull; <code>&Sigma; ⁿC_r = 2ⁿ</code>.
            </p>
            <p>4. Combine the terms: <code>S = n·2ⁿ⁻¹ + 2ⁿ = 2ⁿ⁻¹(n + 2)</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: The value of the series is (n + 2) · 2ⁿ⁻¹</p>
          </div>
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-base uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"Find the rank of word with repeated letters (e.g. INDIA)"', think: "Permute letters alphabetically, remember to divide by factorials of repeating letters at each stage." },
            { cue: '"Number of integer solutions to equations with boundaries"', think: "Apply Stars and Bars (Beggar's method) after distributing minimum constraints." },
            { cue: '"None of the elements occupy their original positions"', think: "This is a derangement. Apply the Dn formula." },
            { cue: '"Find the coefficient of x^k in binomial product"', think: "Write general terms for both parts, collect powers of x, and equate to k." },
            { cue: '"Total selections from a mix of identical and distinct objects"', think: "Use the formula (p+1)(q+1)...(2^k) - 1, treating alike and distinct separately." },
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[9px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="text-xs text-cyan-400">{cue}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-white/35 uppercase mb-1">Immediately think...</p>
                <p className="text-xs text-white/70">{think}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMON TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-sm uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Circular Arrangements clockwise distinction">
            For circular arrangements, total permutations is <code>(n−1)!</code>. However, for necklaces, clockwise and anticlockwise arrangements are considered identical (since you can flip the necklace), so divide by 2: <code>(n−1)!/2</code>.
          </TrapCard>
          <TrapCard title="Trap 2: The General Term Index Shift">
            The general term formula <code>T_r+1 = nCr · a^{n-r} · b^r</code> uses <code>r</code>, not the term number. To evaluate the 4th term, plug in <code>r = 3</code>.
          </TrapCard>
          <TrapCard title="Trap 3: Grouping Divisions Identical factors">
            If groups have identical sizes, remember to divide by the factorial of the number of identical groups. E.g., dividing 6 books into 3 equal groups of 2 requires dividing by 3!: <code>6! / ((2!)³ · 3!)</code>.
          </TrapCard>
        </div>
      </div>

      {/* NEW SECTION: PART 9: IAT PRACTICE CHALLENGE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-base uppercase tracking-wider">IAT Practice Challenge (Self-Assessment)</h2>
        </div>
        <p className="text-white/60 text-xs">
          Try to solve these representative IAT math questions. Hints and answers are provided below for verification.
        </p>

        <div className="space-y-4">
          {[
            {
              id: 1,
              q: "Q1. Find the number of 4-digit numbers greater than 5000 that can be formed using the digits 3, 5, 6, 7, and 8, if digit repetition is not allowed.",
              hint: "The first digit can only be 5, 6, 7, or 8 (4 choices). Arrange the remaining 3 positions from the remaining 4 digits.",
              ans: "4 × ⁴P₃ = 4 × 24 = 96 numbers."
            },
            {
              id: 2,
              q: "Q2. In a polygon, the number of diagonals is 54. Find the number of sides of this polygon.",
              hint: "Apply the diagonal formula: n(n-3)/2 = 54. Solve the quadratic equation n² - 3n - 108 = 0.",
              ans: "n = 12 sides (reject negative roots)."
            },
            {
              id: 3,
              q: "Q3. Find the number of ways to distribute 10 identical mangoes among 4 children such that each child gets at least 1 mango.",
              hint: "This is the positive integer solution case for Stars & Bars. Subtract 1 from each mango first, or use the formula: ⁿ⁻¹Cr₋₁ with n=10, r=4.",
              ans: "⁹C₃ = (9 × 8 × 7) / 6 = 84 ways."
            },
            {
              id: 4,
              q: "Q4. If the coefficients of the 2nd, 3rd, and 4th terms in the expansion of (1+x)ⁿ are in AP, find the value of n.",
              hint: "Coefficients are ⁿC₁, ⁿC₂, ⁿC₃. Using arithmetic progression rule: 2·ⁿC₂ = ⁿC₁ + ⁿC₃. Simplify into a quadratic equation in n.",
              ans: "n = 7 (n = 2 is rejected since expansion requires at least 4 terms)."
            },
            {
              id: 5,
              q: "Q5. Find the remainder when 2^99 is divided by 5.",
              hint: "Rewrite 2^99 as 2·2^98 = 2·(4)^49 = 2·(5 - 1)^49. Expand using Binomial Theorem, showing all terms except the last are multiples of 5.",
              ans: "Remainder = 3 (since last term is 2 × (-1) = -2, and -2 ≡ 3 mod 5)."
            }
          ].map(({ id, q, hint, ans }) => (
            <div key={id} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2 text-xs">
              <p className="text-white/90 font-bold">{q}</p>
              <div className="text-[11px] text-white/50 pl-2 border-l border-cyan-500/30 space-y-1">
                <p><strong>Hint:</strong> {hint}</p>
                <p className="text-cyan-400"><strong>Answer:</strong> {ans}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
          <h3 className="text-cyan-400 font-display font-bold text-sm uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Addition Principle: Sum mutually exclusive paths (m + n)",
            "Multiplication Principle: Product consecutive stages (m × n)",
            "Factorial Definition: n! = n × (n-1)!, with 0! = 1",
            "Inclusion-Exclusion: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)",
            "Permutations (nPr): arrangements where order matters",
            "Permutations with Repetition: n^r ways",
            "Alike Objects Permutations: n! / (p! · q! · r!)",
            "Always Together: Treat as single block (Tie method)",
            "Never Together: Arrange others first, insert in gaps (Gap method)",
            "Circular Seating: (n-1)!",
            "Circular beads (Necklace): (n-1)! / 2",
            "Combinations (nCr): selections where order does not matter",
            "Pascal's Identity: nCr + nCr-1 = n+1Cr",
            "Symmetry relation: nCr = nCn-r",
            "Total selections: 2^n - 1 for distinct, (p+1)(q+1)... - 1 for mixed",
            "Equal division: (3m)! / ((m!)^3 × 3!) for heaps, no 3! for people",
            "Middle terms: T_(n/2)+1 for even n; T_(n+1)/2 & T_(n+3)/2 for odd n",
            "Sum of binomial coefficients: C0 + C1 + ... = 2ⁿ",
            "Sum of squares of binomial coefficients: C₀² + C₁² + ... = ²ⁿCn",
            "Numerically Greatest Term: Check integer status of m = (n+1)x / (1+x)"
          ].map(item => (
            <div key={item} className="flex items-start gap-2 text-xs text-white/70 py-1 border-b border-white/[0.04] last:border-0">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
