import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

// ─── MATH RENDERING HELPERS ──────────────────────────────────────────────────
const InlineMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: false,
      throwOnError: false,
    });
    return <span className={cn("inline-block", className)} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (e) {
    return <code className={className}>{math}</code>;
  }
};

const DisplayMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: true,
      throwOnError: false,
    });
    return <div className={cn("overflow-x-auto py-2 my-2 text-center", className)} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (e) {
    return <div className={cn("font-mono my-2 text-center", className)}>{math}</div>;
  }
};

const renderMathText = (text: string) => {
  if (!text) return null;
  const parts = text.split('$');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <InlineMath key={index} math={part} />;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: FUNCTION MAPPING DIAGRAMS ──────────────────────────────────────────
function MappingSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Function Mapping Classifications</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* ONE-TO-ONE (INJECTIVE) */}
        <g transform="translate(10, 10)">
          <text x="35" y="-2" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">One-to-One (Injective)</text>
          {/* Set A */}
          <ellipse cx="15" cy="40" rx="12" ry="25" fill="none" stroke="#475569" strokeWidth="1" />
          <text x="15" y="25" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">1</text>
          <text x="15" y="43" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">2</text>
          <text x="15" y="60" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">3</text>
          {/* Set B */}
          <ellipse cx="55" cy="40" rx="12" ry="25" fill="none" stroke="#475569" strokeWidth="1" />
          <text x="55" y="22" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">a</text>
          <text x="55" y="35" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">b</text>
          <text x="55" y="48" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">c</text>
          <text x="55" y="61" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">d</text>
          {/* Arrows */}
          <line x1="22" y1="23" x2="48" y2="20" stroke="#22d3ee" strokeWidth="1" />
          <line x1="22" y1="40" x2="48" y2="33" stroke="#22d3ee" strokeWidth="1" />
          <line x1="22" y1="57" x2="48" y2="45" stroke="#22d3ee" strokeWidth="1" />
          <text x="35" y="76" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Distinct inputs &rarr; distinct outputs</text>
        </g>

        {/* ONTO (SURJECTIVE) */}
        <g transform="translate(125, 10)">
          <text x="35" y="-2" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Onto (Surjective)</text>
          {/* Set A */}
          <ellipse cx="15" cy="40" rx="12" ry="25" fill="none" stroke="#475569" strokeWidth="1" />
          <text x="15" y="22" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">1</text>
          <text x="15" y="34" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">2</text>
          <text x="15" y="46" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">3</text>
          <text x="15" y="58" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">4</text>
          {/* Set B */}
          <ellipse cx="55" cy="40" rx="12" ry="25" fill="none" stroke="#475569" strokeWidth="1" />
          <text x="55" y="25" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">a</text>
          <text x="55" y="43" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">b</text>
          <text x="55" y="60" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">c</text>
          {/* Arrows */}
          <line x1="22" y1="20" x2="48" y2="23" stroke="#a78bfa" strokeWidth="1" />
          <line x1="22" y1="32" x2="48" y2="23" stroke="#a78bfa" strokeWidth="1" />
          <line x1="22" y1="44" x2="48" y2="40" stroke="#a78bfa" strokeWidth="1" />
          <line x1="22" y1="56" x2="48" y2="57" stroke="#a78bfa" strokeWidth="1" />
          <text x="35" y="76" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Range = Codomain (no leftovers)</text>
        </g>

        {/* BIJECTIVE (INVERTIBLE) */}
        <g transform="translate(240, 10)">
          <text x="35" y="-2" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Bijective (Invertible)</text>
          {/* Set A */}
          <ellipse cx="15" cy="40" rx="12" ry="25" fill="none" stroke="#475569" strokeWidth="1" />
          <text x="15" y="25" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">1</text>
          <text x="15" y="43" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">2</text>
          <text x="15" y="60" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">3</text>
          {/* Set B */}
          <ellipse cx="55" cy="40" rx="12" ry="25" fill="none" stroke="#475569" strokeWidth="1" />
          <text x="55" y="25" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle">a</text>
          <text x="55" y="43" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle">b</text>
          <text x="55" y="60" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle">c</text>
          {/* Arrows */}
          <line x1="22" y1="23" x2="48" y2="23" stroke="#34d399" strokeWidth="1" />
          <line x1="22" y1="40" x2="48" y2="40" stroke="#34d399" strokeWidth="1" />
          <line x1="22" y1="57" x2="48" y2="57" stroke="#34d399" strokeWidth="1" />
          <text x="35" y="76" fill="#64748b" fontSize="6.5" fontFamily="monospace" textAnchor="middle">Both 1-1 &amp; onto (Inverse exists)</text>
        </g>
      </svg>
    </div>
  );
}

// ─── SVG 2: FUNCTION GRAPHS (MODULUS, SIGNUM, GIF) ──────────────────────────
function FunctionGraphsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Modulus, Signum, and Greatest Integer (GIF) Graphs</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* MODULUS |x| */}
        <g transform="translate(10, 10)">
          {/* Axes */}
          <line x1="10" y1="45" x2="70" y2="45" stroke="#475569" strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="#475569" strokeWidth="1" />
          {/* Graph: V Shape */}
          <polyline points="15,20 40,45 65,20" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="40" y="80" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Modulus: |x|</text>
        </g>

        {/* SIGNUM sgn(x) */}
        <g transform="translate(125, 10)">
          {/* Axes */}
          <line x1="10" y1="45" x2="70" y2="45" stroke="#475569" strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="#475569" strokeWidth="1" />
          {/* Graph */}
          <line x1="10" y1="58" x2="38" y2="58" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="42" y1="32" x2="70" y2="32" stroke="#a78bfa" strokeWidth="1.5" />
          {/* Open/closed circles */}
          <circle cx="40" cy="45" r="2.2" fill="#a78bfa" />
          <circle cx="40" cy="32" r="1.8" fill="none" stroke="#a78bfa" strokeWidth="1" />
          <circle cx="40" cy="58" r="1.8" fill="none" stroke="#a78bfa" strokeWidth="1" />
          <text x="40" y="80" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Signum: sgn(x)</text>
        </g>

        {/* GIF [x] */}
        <g transform="translate(240, 10)">
          {/* Axes */}
          <line x1="10" y1="45" x2="70" y2="45" stroke="#475569" strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="#475569" strokeWidth="1" />
          {/* Staircase Steps */}
          {/* Step -1 */}
          <line x1="20" y1="55" x2="40" y2="55" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="20" cy="55" r="1.8" fill="#34d399" />
          <circle cx="40" cy="55" r="1.5" fill="none" stroke="#34d399" strokeWidth="1" />
          {/* Step 0 */}
          <line x1="40" y1="45" x2="60" y2="45" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="40" cy="45" r="1.8" fill="#34d399" />
          <circle cx="60" cy="45" r="1.5" fill="none" stroke="#34d399" strokeWidth="1" />
          {/* Step 1 */}
          <line x1="60" y1="35" x2="75" y2="35" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="60" cy="35" r="1.8" fill="#34d399" />
          <text x="40" y="80" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">GIF: [x]</text>
        </g>
      </svg>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[12px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
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
      <div className="text-cyan-300 font-bold text-[13.5px] sm:text-sm">
        <InlineMath math={formula} />
      </div>
      <p className="text-white/80 text-[12px]">
        <strong className="text-white/40">Use: </strong>
        {renderMathText(use)}
      </p>
      <p className="text-white/55 text-[12px]">
        <strong className="text-white/40">Note: </strong>
        {renderMathText(note)}
      </p>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function InsightCard({ title = "Key Concept", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">{title}</span>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function SetsDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'venn' | 'relations' | 'composition'>('venn');

  // Venn Diagram Interactive States
  const [vennMode, setVennMode] = useState<'union' | 'intersect' | 'difference' | 'symmetric'>('union');

  // Relation Builder States
  // A = {1, 2, 3}
  // User toggles pairs in the relation
  const [relPairs, setRelPairs] = useState<Record<string, boolean>>({
    '1,1': true,
    '2,2': true,
    '3,3': true,
    '1,2': false,
    '2,1': false,
    '2,3': false,
    '3,2': false,
    '1,3': false,
    '3,1': false,
  });

  const togglePair = (pairKey: string) => {
    setRelPairs(prev => ({ ...prev, [pairKey]: !prev[pairKey] }));
  };

  // Evaluate Relation Properties
  const isReflexive = relPairs['1,1'] && relPairs['2,2'] && relPairs['3,3'];
  
  const isSymmetric = 
    (relPairs['1,2'] === relPairs['2,1']) && 
    (relPairs['2,3'] === relPairs['3,2']) && 
    (relPairs['1,3'] === relPairs['3,1']);

  // Transitive verification helper
  const checkTransitive = () => {
    const pairsList: [number, number][] = [];
    Object.entries(relPairs).forEach(([key, val]) => {
      if (val) {
        const [a, b] = key.split(',').map(Number);
        pairsList.push([a, b]);
      }
    });

    for (let i = 0; i < pairsList.length; i++) {
      for (let j = 0; j < pairsList.length; j++) {
        const [a, b] = pairsList[i];
        const [c, d] = pairsList[j];
        if (b === c) {
          // We need (a, d) to exist in relation
          const targetKey = `${a},${d}`;
          if (!relPairs[targetKey]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const isTransitive = checkTransitive();
  const isEquivalence = isReflexive && isSymmetric && isTransitive;

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
              <Tag color="cyan">Mathematics Unit 1</Tag>
              <Tag color="rose">IAT Foundation</Tag>
              <Tag color="amber">Essential</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Sets, Relations and Functions
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Basic Algebra</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Number Systems</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '20 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Easy-Medium (2.5/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px] font-bold text-white/40">
              <span className="uppercase tracking-wider">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[12px] text-white/35 font-medium">
              {isCompleted ? 'Reading Completed — Quiz Unlocked! 🔓' : 'Scroll to complete the lesson and unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

            {/* PART 1: SETS AND OPERATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Set Algebra &amp; Subsets</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Sets are collections of well-defined distinct objects. Operations on sets satisfy commutative, associative, distributive, and De Morgan properties.
        </p>

        {/* NCERT Set Classifications Card */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">📐 Classifications of Sets</strong>
          <div className="grid sm:grid-cols-3 gap-4 font-mono text-[12px] text-white/70">
            <div className="space-y-1">
              <strong className="text-cyan-400 block">&bull; Finite vs. Infinite Sets</strong>
              <p className="text-white/65">
                <strong>Finite:</strong> Contains a countable number of elements (e.g. <InlineMath math="A = \{1, 2, 3\}" />).
                <br />
                <strong>Infinite:</strong> Elements are uncountable or infinite. E.g. Natural numbers <InlineMath math="\mathbb{N}" /> (countable infinite) or Real numbers <InlineMath math="\mathbb{R}" /> (uncountable infinite).
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-violet-400 block">&bull; Equal vs. Equivalent Sets</strong>
              <p className="text-white/65">
                <strong>Equal (<InlineMath math="A = B" />):</strong> Exactly the same elements.
                <br />
                <strong>Equivalent:</strong> Same cardinality (<InlineMath math="n(A) = n(B)" />), but elements can differ (e.g. <InlineMath math="\{1, 2\} \sim \{a, b\}" />).
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-rose-400 block">&bull; Singleton &amp; Empty Set</strong>
              <p className="text-white/65">
                <strong>Singleton:</strong> Cardinality is 1 (e.g. <InlineMath math="\{0\}" />).
                <br />
                <strong>Empty / Null (<InlineMath math="\emptyset" />):</strong> Cardinality is 0. Note properties: <InlineMath math="\emptyset \subseteq A" />, <InlineMath math="A \cap \emptyset = \emptyset" />, and <InlineMath math="A \cup \emptyset = A" /> for any set <InlineMath math="A" />.
              </p>
            </div>
          </div>
        </div>

        {/* Set Operation Laws Card */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">🔑 Laws of Set Algebra</strong>
          <div className="grid sm:grid-cols-2 gap-4 font-mono text-[12px] text-white/70">
            <div className="space-y-1">
              <p>&bull; <strong>Commutative:</strong> <InlineMath math="A \cup B = B \cup A" /> and <InlineMath math="A \cap B = B \cap A" /></p>
              <p>&bull; <strong>Associative:</strong> <InlineMath math="(A \cup B) \cup C = A \cup (B \cup C)" /> and <InlineMath math="(A \cap B) \cap C = A \cap (B \cap C)" /></p>
              <p>&bull; <strong>Distributive:</strong> <InlineMath math="A \cup (B \cap C) = (A \cup B) \cap (A \cup C)" /> and <InlineMath math="A \cap (B \cup C) = (A \cap B) \cup (A \cap C)" /></p>
            </div>
            <div className="space-y-1">
              <p>&bull; <strong>Idempotent:</strong> <InlineMath math="A \cup A = A" /> and <InlineMath math="A \cap A = A" /></p>
              <p>&bull; <strong>Identity:</strong> <InlineMath math="A \cup \emptyset = A" /> and <InlineMath math="A \cap U = A" /></p>
              <p>&bull; <strong>Complement:</strong> <InlineMath math="A \cup A' = U" />, <InlineMath math="A \cap A' = \emptyset" />, <InlineMath math="(A')' = A" />, and <InlineMath math="\emptyset' = U, U' = \emptyset" /></p>
            </div>
          </div>
          <p className="text-[11px] font-mono text-white/50">&bull; <strong>Disjoint Sets:</strong> Two sets <InlineMath math="A" /> and <InlineMath math="B" /> are disjoint if their intersection is empty, i.e., <InlineMath math="A \cap B = \emptyset" />.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="\text{Subsets} = 2^n \quad | \quad \text{Proper Subsets} = 2^n - 1"
            use="Subsets &amp; Power Set Cardinality"
            note="Power Set $P(A)$ is the set of all subsets of $A$. Proper subsets exclude the set itself. If $A \\subset B$, then $B$ is a superset of $A$ ($B \\supset A$)."
            priority={5}
          />
          <FormulaCard
            formula="n(A \cup B) = n(A) + n(B) - n(A \cap B)"
            use="Inclusion-Exclusion Principle"
            note="For three sets: $n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(A \\cap C) + n(A \\cap B \\cap C)$."
            priority={5}
          />
          <FormulaCard
            formula="A \Delta B = (A - B) \cup (B - A) = (A \cup B) - (A \cap B)"
            use="Symmetric Difference &amp; Complements"
            note="Elements belonging to exactly one of the sets. Complement $A' = U - A$, where $U$ is the Universal Set."
            priority={5}
          />
          <FormulaCard
            formula="(A \\cup B)' = A' \\cap B' \\quad | \\quad (A \\cap B)' = A' \\cup B'"
            use="De Morgan's Laws"
            note="Essential for simplifying logical complements and probability intersections."
            priority={5}
          />
        </div>

        {/* Set Representations & Intervals Card */}
        <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📝 Set Representations &amp; Intervals</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Set Representations &amp; Universal Set</strong>
              <p>
                &bull; <strong>Roster / Tabular Form:</strong> Elements listed within braces, separated by commas. E.g., <InlineMath math="A = \{1, 2, 3\}" />.
                <br />
                &bull; <strong>Set-Builder Form:</strong> Elements defined by a shared property. E.g., <InlineMath math="A = \{x \in \mathbb{N} : x \le 3\}" />.
                <br />
                &bull; <strong>Universal Set (<InlineMath math="U" />):</strong> The grand target set containing all elements under consideration for a given context. E.g., for integer sets, <InlineMath math="U = \mathbb{Z}" />.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Intervals on the Real Line (subset of <InlineMath math="\mathbb{R}" />)</strong>
              <p>
                Let <InlineMath math="a, b \in \mathbb{R}" /> with <InlineMath math="a < b" />:
                <br />
                &bull; <strong>Open Interval:</strong> <InlineMath math="(a, b) = \{x \in \mathbb{R} : a < x < b\}" /> (endpoints excluded).
                <br />
                &bull; <strong>Closed Interval:</strong> <InlineMath math="[a, b] = \{x \in \mathbb{R} : a \le x \le b\}" /> (endpoints included).
                <br />
                &bull; <strong>Semi-Open / Semi-Closed:</strong>
                <br />
                &nbsp;&nbsp; - <InlineMath math="[a, b) = \{x \in \mathbb{R} : a \le x < b\}" />.
                <br />
                &nbsp;&nbsp; - <InlineMath math="(a, b] = \{x \in \mathbb{R} : a < x \le b\}" />.
              </p>
            </div>
          </div>
        </div>
      </div>

            {/* PART 2: RELATIONS & EQUIVALENCE CLASSES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Relations, Transitivity, &amp; Equivalence</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A relation <InlineMath math="R" /> from set <InlineMath math="A" /> to <InlineMath math="B" /> is a subset of the Cartesian product <InlineMath math="A \times B" />.
        </p>

        {/* Cartesian Products & Ordered Pairs Card */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">⚡ Ordered Pairs &amp; Cartesian Products</strong>
          <div className="grid sm:grid-cols-2 gap-4 font-mono text-[12px] text-white/70">
            <div className="space-y-1">
              <strong className="text-cyan-400 block">&bull; Ordered Pairs &amp; Equality</strong>
              <p className="text-white/65">
                An ordered pair is defined mathematically as <InlineMath math="(a, b) = \{\{a\}, \{a, b\}\}" />.
                <br />
                <strong>Equality rule:</strong> <InlineMath math="(a, b) = (c, d) \iff a = c \text{ and } b = d" />.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-violet-400 block">&bull; Cartesian Product Properties</strong>
              <p className="text-white/65">
                <InlineMath math="A \times B = \{(a, b) : a \in A \text{ and } b \in B\}" />.
                <br />
                &bull; <strong>Non-commutative:</strong> <InlineMath math="A \times B \ne B \times A" /> (unless <InlineMath math="A = B" />).
                <br />
                &bull; <strong>Cardinality:</strong> <InlineMath math="n(A \times B) = n(A) \cdot n(B)" />.
                <br />
                &bull; <strong>Distributive:</strong> <InlineMath math="A \times (B \cup C) = (A \times B) \cup (A \times C)" />.
                <br />
                &bull; <strong>Empty Factor:</strong> <InlineMath math="A \times \emptyset = \emptyset" />.
              </p>
            </div>
          </div>
        </div>

        {/* Expanded Relation Types */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">🔑 Complete Types of Relations</strong>
          <div className="grid sm:grid-cols-2 gap-4 font-mono text-[12px] text-white/70">
            <div className="space-y-2">
              <strong className="text-cyan-400 block">&bull; Fundamental Relations</strong>
              <p>&bull; <strong>Void / Empty:</strong> <InlineMath math="R = \emptyset \subseteq A \times A" />.</p>
              <p>&bull; <strong>Universal:</strong> <InlineMath math="R = A \times A" /> (all possible pairs).</p>
              <p>&bull; <strong>Inverse Relation:</strong> <InlineMath math="R^{-1} = \{(b, a) : (a, b) \in R\}" />.</p>
            </div>
            <div className="space-y-2">
              <strong className="text-violet-400 block">&bull; Algebraic Relation Properties</strong>
              <p>&bull; <strong>Reflexive:</strong> <InlineMath math="(a, a) \in R" /> for all <InlineMath math="a \in A" />.</p>
              <p>&bull; <strong>Symmetric:</strong> If <InlineMath math="(a, b) \in R \implies (b, a) \in R" />.</p>
              <p>&bull; <strong>Transitive:</strong> If <InlineMath math="(a, b) \in R" /> and <InlineMath math="(b, c) \in R \implies (a, c) \in R" />.</p>
              <p>&bull; <strong>Antisymmetric:</strong> If <InlineMath math="(a, b) \in R" /> and <InlineMath math="(b, a) \in R \implies a = b" />.</p>
              <p>&bull; <strong>Asymmetric:</strong> If <InlineMath math="(a, b) \in R \implies (b, a) \notin R" />.</p>
            </div>
          </div>
        </div>

        <InsightCard title="Equivalence Classes &amp; Partitions">
          If <InlineMath math="R" /> is an equivalence relation on <InlineMath math="A" />, then for any <InlineMath math="a \in A" />, its equivalence class is:
          <br />
          <InlineMath math="[a] = \{ x \in A : (x, a) \in R \}" />.
          <br />
          These equivalence classes partition the set <InlineMath math="A" /> into pairwise disjoint subsets whose union is <InlineMath math="A" />. If two equivalence classes overlap, they must be identical!
        </InsightCard>
      </div>

            {/* PART 3: FUNCTIONS, COMPOSITION & INVERSE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Functions, Invertibility &amp; Graphs</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Functions map every element of a domain set to a unique element of a codomain. Invertibility requires bijectivity.
        </p>
        <MappingSVG />
        <FunctionGraphsSVG />

        {/* Function Domain-Codomain-Range Trio Card */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">📐 Domain, Codomain, Range &amp; Images</strong>
          <div className="grid sm:grid-cols-2 gap-4 font-mono text-[12px] text-white/70">
            <div className="space-y-1">
              <strong className="text-cyan-400 block">&bull; The Function Trio</strong>
              <p className="text-white/65">
                For a function <InlineMath math="f: A \to B" />:
                <br />
                - <strong>Domain:</strong> The set <InlineMath math="A" />.
                <br />
                - <strong>Codomain:</strong> The target set <InlineMath math="B" />.
                <br />
                - <strong>Range:</strong> The set of all actual outputs <InlineMath math="f(A) = \{f(x) : x \in A\} \subseteq B" />.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-violet-400 block">&bull; Image &amp; Pre-Image Terminology</strong>
              <p className="text-white/65">
                If <InlineMath math="f(x) = y" />, then <InlineMath math="y" /> is the <strong>image</strong> of <InlineMath math="x" />, and <InlineMath math="x" /> is the <strong>pre-image</strong> of <InlineMath math="y" /> under <InlineMath math="f" />.
                <br />
                - <strong>Real-Valued Function:</strong> A function whose range is a subset of real numbers <InlineMath math="\mathbb{R}" />.
              </p>
            </div>
          </div>
        </div>

        {/* Explicit Piecewise Function Formulas */}
        <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">⚙️ Piecewise Real-Valued Functions (NCERT Formulas)</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed font-mono">
            <div className="space-y-2">
              <strong className="text-white block">A. Modulus &amp; Signum Functions</strong>
              <div className="space-y-1">
                <strong>Modulus:</strong>
                <DisplayMath math="|x| = \begin{cases} x & x \ge 0 \\ -x & x < 0 \end{cases}" />
                <p className="text-[11px] text-white/40">Domain: <InlineMath math="\mathbb{R}" /> | Range: <InlineMath math="[0, \infty)" />.</p>
              </div>
              <div className="space-y-1 mt-2">
                <strong>Signum:</strong>
                <DisplayMath math="\text{sgn}(x) = \begin{cases} 1 & x > 0 \\ 0 & x = 0 \\ -1 & x < 0 \end{cases}" />
                <p className="text-[11px] text-white/40">Domain: <InlineMath math="\mathbb{R}" /> | Range: <InlineMath math="\{-1, 0, 1\}" />.</p>
              </div>
            </div>
            <div className="space-y-2">
              <strong className="text-white block">B. Greatest Integer &amp; Fractional Part</strong>
              <div className="space-y-1">
                <strong>Greatest Integer Function (GIF):</strong>
                <DisplayMath math="[x] = n \quad \text{where} \quad n \le x < n+1 \quad (n \in \mathbb{Z})" />
                <p className="text-[11px] text-white/40">Domain: <InlineMath math="\mathbb{R}" /> | Range: <InlineMath math="\mathbb{Z}" />.</p>
              </div>
              <div className="space-y-1 mt-2">
                <strong>Fractional Part Function (FPF):</strong>
                <DisplayMath math="\{x\} = x - [x]" />
                <p className="text-[11px] text-white/40">Domain: <InlineMath math="\mathbb{R}" /> | Range: <InlineMath math="[0, 1)" />.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transcendental Functions: Exp, Log, Trig */}
        <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">📈 Exponential, Logarithmic &amp; Trigonometric Functions</span>
          <div className="grid sm:grid-cols-3 gap-4 text-white/70 leading-relaxed font-mono">
            <div className="space-y-1">
              <strong className="text-white block">A. Exponential (<InlineMath math="a^x" />)</strong>
              <p className="text-white/65">
                <InlineMath math="f(x) = a^x \quad (a > 0, a \ne 1)" />.
                <br />
                - Domain: <InlineMath math="\mathbb{R}" />
                <br />
                - Range: <InlineMath math="(0, \infty)" />
                <br />
                - Graph: Increases for <InlineMath math="a > 1" />, decreases for <InlineMath math="0 < a < 1" />.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block">B. Logarithmic (<InlineMath math="\log_a x" />)</strong>
              <p className="text-white/65">
                <InlineMath math="f(x) = \log_a(x) \quad (a > 0, a \ne 1)" />.
                <br />
                - Domain: <InlineMath math="(0, \infty)" />
                <br />
                - Range: <InlineMath math="\mathbb{R}" />
                <br />
                - Inverse of exponential function.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block">C. Trigonometric</strong>
              <p className="text-white/65">
                &bull; <InlineMath math="\sin x" />: Dom <InlineMath math="\mathbb{R}" />, Range <InlineMath math="[-1, 1]" />.
                <br />
                &bull; <InlineMath math="\cos x" />: Dom <InlineMath math="\mathbb{R}" />, Range <InlineMath math="[-1, 1]" />.
                <br />
                &bull; <InlineMath math="\tan x" />: Dom <InlineMath math="\mathbb{R} \setminus \{(2k+1)\pi/2\}" />, Range <InlineMath math="\mathbb{R}" />.
              </p>
            </div>
          </div>
        </div>

        {/* Function Properties: Even/Odd, Periodic, Inverse Graphs */}
        <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[12px] font-bold text-rose-400 uppercase tracking-wider block">⚙️ Function Properties &amp; Inverse Geometry</span>
          <div className="grid sm:grid-cols-3 gap-4 text-white/70 leading-relaxed font-mono">
            <div className="space-y-1">
              <strong className="text-white block">Even &amp; Odd Functions</strong>
              <p className="text-white/65">
                - <strong>Even:</strong> <InlineMath math="f(-x) = f(x)" /> (symmetric about y-axis, e.g. <InlineMath math="x^2" />, <InlineMath math="\cos x" />).
                <br />
                - <strong>Odd:</strong> <InlineMath math="f(-x) = -f(x)" /> (symmetric about origin, e.g. <InlineMath math="x^3" />, <InlineMath math="\sin x" />).
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block">Periodic Functions</strong>
              <p className="text-white/65">
                Satisfies <InlineMath math="f(x + T) = f(x)" /> for all <InlineMath math="x" />. The smallest positive constant <InlineMath math="T" /> is the period (e.g. <InlineMath math="\sin x" /> has period <InlineMath math="2\pi" />).
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block">Inverse Graphs &amp; Self-Inverse</strong>
              <p className="text-white/65">
                - <strong>Inverse Graph:</strong> The graph of <InlineMath math="f^{-1}(x)" /> is the reflection of the graph of <InlineMath math="f(x)" /> in the line <InlineMath math="y = x" />.
                <br />
                - <strong>Self-Inverse:</strong> <InlineMath math="f(x) = f^{-1}(x)" /> (e.g. <InlineMath math="f(x) = 1/x" /> or <InlineMath math="f(x) = -x" />).
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="f(x_1) = f(x_2) \\implies x_1 = x_2"
            use="One-to-One / Injective test"
            note="If different inputs yield the same output, the function is many-to-one."
            priority={5}
          />
          <FormulaCard
            formula="\\text{Range}(f) = \\text{Codomain}"
            use="Onto / Surjective test"
            note="Every element in the codomain target set must have at least one pre-image in the domain."
            priority={5}
          />
        </div>

        <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">⚙️ Composition &amp; Line Tests</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed">
            <div className="space-y-1">
              <strong className="text-white block">Composition of Functions</strong>
              <p>
                <InlineMath math="(g \circ f)(x) = g(f(x))" />.
                <br />
                - <strong>Non-commutative:</strong> <InlineMath math="g \circ f \ne f \circ g" />.
                <br />
                - <strong>Associative:</strong> <InlineMath math="(h \circ g) \circ f = h \circ (g \circ f)" />.
                <br />
                For composition to exist, the range of <InlineMath math="f" /> must be a subset of the domain of <InlineMath math="g" />.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block">Geometrical Tests</strong>
              <p>
                &bull; <strong>Vertical Line Test:</strong> Determines if a curve represents a function (vertical line crosses at most once).
                <br />
                &bull; <strong>Horizontal Line Test:</strong> Determines if a function is injective (horizontal line crosses at most once).
              </p>
            </div>
          </div>
        </div>

        {/* Algebraic Operations & Real-Valued Function Types Card */}
        <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">⚡ Algebra of Functions &amp; Core Types (NCERT Core)</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Algebraic Operations &amp; Domains</strong>
              <p>
                Let <InlineMath math="f: D_f \to \mathbb{R}" /> and <InlineMath math="g: D_g \to \mathbb{R}" /> be real-valued functions:
                <br />
                &bull; <strong>Sum / Difference:</strong> <InlineMath math="(f \pm g)(x) = f(x) \pm g(x)" />. Domain is <InlineMath math="D_f \cap D_g" />.
                <br />
                &bull; <strong>Product:</strong> <InlineMath math="(f \cdot g)(x) = f(x) \cdot g(x)" />. Domain is <InlineMath math="D_f \cap D_g" />.
                <br />
                &bull; <strong>Quotient:</strong> <InlineMath math="(f / g)(x) = f(x) / g(x)" />. Domain is <InlineMath math="(D_f \cap D_g) \setminus \{x : g(x) = 0\}" />.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Polynomial &amp; Rational Functions</strong>
              <p>
                &bull; <strong>Polynomial Function:</strong> <InlineMath math="f(x) = a_n x^n + \dots + a_0" />. Domain is always the entire real line <InlineMath math="\mathbb{R}" />.
                <br />
                &bull; <strong>Rational Function:</strong> <InlineMath math="f(x) = P(x) / Q(x)" /> where <InlineMath math="P(x)" /> and <InlineMath math="Q(x)" /> are polynomials. Domain is <InlineMath math="\mathbb{R} \setminus \{x : Q(x) = 0\}" />.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4: INTERACTIVE RELATIONS BUILDER & CLASSIFIER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Relations Classifier Simulator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Toggle ordered pairs to build a custom relation on set A = {'{'}1, 2, 3{'}'} and instantly evaluate its algebraic properties.
        </p>

        <div className="grid grid-cols-3 gap-2">
          {Object.keys(relPairs).map(pair => (
            <button
              key={pair}
              onClick={() => togglePair(pair)}
              className={cn(
'p-2.5 rounded-xl border text-[12px] font-bold transition-all text-center',
                relPairs[pair]
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'
              )}
            >
              ({pair})
            </button>
          ))}
        </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[13px]">
          <div className={cn("p-3 rounded-2xl border", isReflexive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/5 border-rose-500/10 text-rose-400")}>
            <strong>Reflexive</strong>
            <p className="text-[12px] mt-1">{isReflexive ? 'Yes (All (a,a) present)' : 'No (Missing (a,a))'}</p>
          </div>
          <div className={cn("p-3 rounded-2xl border", isSymmetric ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/5 border-rose-500/10 text-rose-400")}>
            <strong>Symmetric</strong>
            <p className="text-[12px] mt-1">{isSymmetric ? 'Yes (Pairs match)' : 'No (Incomplete pairs)'}</p>
          </div>
          <div className={cn("p-3 rounded-2xl border", isTransitive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/5 border-rose-500/10 text-rose-400")}>
            <strong>Transitive</strong>
            <p className="text-[12px] mt-1">{isTransitive ? 'Yes' : 'No (a->b, b->c but no a->c)'}</p>
          </div>
          <div className={cn("p-3 rounded-2xl border", isEquivalence ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300 font-bold" : "bg-white/[0.02] border-white/5 text-white/35")}>
            <strong>Equivalence</strong>
            <p className="text-[12px] mt-1">{isEquivalence ? 'Yes (R,S,T holds!)' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* PART 5: INTERACTIVE VENN DIAGRAM EXPLORER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Venn Diagram Explorer</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'union', label: 'Union (A ∪ B)' },
            { id: 'intersect', label: 'Intersection (A ∩ B)' },
            { id: 'difference', label: 'Difference (A − B)' },
            { id: 'symmetric', label: 'Symmetric Difference (A Δ B)' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setVennMode(opt.id as any)}
              className={cn(
'px-3 py-1.5 rounded-xl border text-[13px] font-bold transition-all',
                vennMode === opt.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white/80'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <div className="bg-[#05060F] p-4 rounded-2xl border border-white/5 flex justify-center">
            <svg viewBox="0 0 200 120" className="w-full max-w-[240px]">
              {/* Universal Set boundary */}
              <rect x="5" y="5" width="190" height="110" fill="none" stroke="#475569" strokeWidth="1" />
              <text x="10" y="18" fill="#64748b" fontSize="8" fontFamily="monospace">U</text>

              {/* Venn Shaded Region Path definition */}
              {vennMode === 'union' && (
                <>
                  <circle cx="80" cy="60" r="35" fill="#22d3ee" fillOpacity="0.3" />
                  <circle cx="120" cy="60" r="35" fill="#22d3ee" fillOpacity="0.3" />
                </>
              )}
              {vennMode === 'intersect' && (
                <g>
                  {/* Clip path for intersection */}
                  <clipPath id="intersect-clip">
                    <circle cx="80" cy="60" r="35" />
                  </clipPath>
                  <circle cx="120" cy="60" r="35" fill="#22d3ee" fillOpacity="0.5" clipPath="url(#intersect-clip)" />
                </g>
              )}
              {vennMode === 'difference' && (
                <g>
                  <mask id="diff-mask">
                    <rect x="0" y="0" width="200" height="120" fill="white" />
                    <circle cx="120" cy="60" r="35" fill="black" />
                  </mask>
                  <circle cx="80" cy="60" r="35" fill="#22d3ee" fillOpacity="0.4" mask="url(#diff-mask)" />
                </g>
              )}
              {vennMode === 'symmetric' && (
                <g>
                  <mask id="symm-mask-left">
                    <rect x="0" y="0" width="200" height="120" fill="white" />
                    <circle cx="120" cy="60" r="35" fill="black" />
                  </mask>
                  <mask id="symm-mask-right">
                    <rect x="0" y="0" width="200" height="120" fill="white" />
                    <circle cx="80" cy="60" r="35" fill="black" />
                  </mask>
                  <circle cx="80" cy="60" r="35" fill="#22d3ee" fillOpacity="0.4" mask="url(#symm-mask-left)" />
                  <circle cx="120" cy="60" r="35" fill="#22d3ee" fillOpacity="0.4" mask="url(#symm-mask-right)" />
                </g>
              )}

              {/* Circles outlines */}
              <circle cx="80" cy="60" r="35" fill="none" stroke="#64748b" strokeWidth="1" />
              <circle cx="120" cy="60" r="35" fill="none" stroke="#64748b" strokeWidth="1" />
              <text x="60" y="63" fill="#cbd5e1" fontSize="10" fontFamily="monospace" fontWeight="bold">A</text>
              <text x="140" y="63" fill="#cbd5e1" fontSize="10" fontFamily="monospace" fontWeight="bold">B</text>
            </svg>
          </div>

 <div className="space-y-2 text-[13px]">
            {vennMode === 'union' && (
              <>
                <span className="text-[12px] font-bold text-cyan-400 uppercase">Operation: A ∪ B</span>
                <p className="text-white/70">Combines all elements present in set A, set B, or both. Represented algebraically as <code>A ∪ B</code>.</p>
              </>
            )}
            {vennMode === 'intersect' && (
              <>
                <span className="text-[12px] font-bold text-violet-400 uppercase">Operation: A ∩ B</span>
                <p className="text-white/70">Selects only elements belonging to both set A and set B simultaneously. Represented as <code>A ∩ B</code>.</p>
              </>
            )}
            {vennMode === 'difference' && (
              <>
                <span className="text-[12px] font-bold text-rose-400 uppercase">Operation: A − B</span>
                <p className="text-white/70">Extracts elements belonging strictly to set A, removing any elements that also belong to set B. Represented as <code>A − B</code>.</p>
              </>
            )}
            {vennMode === 'symmetric' && (
              <>
                <span className="text-[12px] font-bold text-emerald-400 uppercase">Operation: A Δ B</span>
                <p className="text-white/70">Selects elements belonging to either set A or set B, excluding their intersection region. Equivalent to <code>(A − B) ∪ (B − A)</code>.</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* PART 6: DOMAIN restrictions FLOWCHART */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Domain Restrictions Guide</h2>
        </div>
 <div className="grid sm:grid-cols-3 gap-3 text-center text-[13px]">
          <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-white/35 font-bold uppercase block">Denominators</span>
            <p className="text-cyan-300 font-bold">1 / f(x)</p>
            <p className="text-white/60 text-[12px]">Condition: <code>f(x) &ne; 0</code></p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-white/35 font-bold uppercase block">Square Roots</span>
            <p className="text-violet-300 font-bold">&radic;f(x)</p>
            <p className="text-white/60 text-[12px]">Condition: <code>f(x) &ge; 0</code></p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl space-y-1">
            <span className="text-[10px] text-white/35 font-bold uppercase block">Logarithms</span>
            <p className="text-emerald-300 font-bold">log(f(x))</p>
            <p className="text-white/60 text-[12px]">Condition: <code>f(x) &gt; 0</code></p>
          </div>
        </div>
      </div>

            {/* PART 7: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
          <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px] font-mono">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Domain of a square-root rational function</span>
          <p className="text-white/80">Find the domain of the function <InlineMath math="f(x) = \frac{1}{\sqrt{x^2 - 5x + 6}}" />.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Combination restriction: The term inside the square root must be non-negative, and the denominator cannot be zero.</p>
            <p>2. Therefore: <InlineMath math="x^2 - 5x + 6 > 0" /> (strictly positive).</p>
            <p>3. Factorize the quadratic equation: <InlineMath math="(x - 2)(x - 3) > 0" />.</p>
            <p>4. Use the wavy-curve method: The inequality holds true when <InlineMath math="x < 2" /> or <InlineMath math="x > 3" />.</p>
            <p className="text-cyan-300 font-bold">Domain: <InlineMath math="x \in (-\infty, 2) \cup (3, \infty)" /></p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px] font-mono">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Composite Functions and Non-Commutativity</span>
          <p className="text-white/80">Let <InlineMath math="f(x) = 2x + 3" /> and <InlineMath math="g(x) = x^2" />. Calculate <InlineMath math="(g \circ f)(x)" /> and <InlineMath math="(f \circ g)(x)" />, demonstrating they are not equal.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Calculate <InlineMath math="(g \circ f)(x)" />: <InlineMath math="g(f(x)) = g(2x + 3) = (2x + 3)^2 = 4x^2 + 12x + 9" />.</p>
            <p>2. Calculate <InlineMath math="(f \circ g)(x)" />: <InlineMath math="f(g(x)) = f(x^2) = 2x^2 + 3" />.</p>
            <p>3. Compare expressions: <InlineMath math="4x^2 + 12x + 9 \ne 2x^2 + 3" />.</p>
            <p className="text-cyan-300 font-bold">Output: <InlineMath math="(g \circ f)(x) \ne (f \circ g)(x)" /> (Composition is not commutative!)</p>
          </div>
        </div>

        {/* Example 3 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px] font-mono">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Inverse of a rational function</span>
          <p className="text-white/80">Find the inverse of the rational bijective function <InlineMath math="f(x) = \frac{2x + 3}{x - 5}" />.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Set function equal to y: <InlineMath math="y = \frac{2x + 3}{x - 5}" />.</p>
            <p>2. Multiply and expand: <InlineMath math="y(x - 5) = 2x + 3 \implies xy - 5y = 2x + 3" />.</p>
            <p>3. Rearrange terms to solve for x: <InlineMath math="xy - 2x = 5y + 3 \implies x(y - 2) = 5y + 3" />.</p>
            <p>4. Express x as: <InlineMath math="x = \frac{5y + 3}{y - 2}" />.</p>
            <p>5. Swap variable back to x: <InlineMath math="f^{-1}(x) = \frac{5x + 3}{x - 2}" /></p>
            <p className="text-cyan-300 font-bold">Inverse: <InlineMath math="f^{-1}(x) = \frac{5x + 3}{x - 2}" /></p>
          </div>
        </div>

        {/* Example 4 (New) */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px] font-mono">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 4: Cartesian Product Cardinality &amp; Subsets</span>
          <p className="text-white/80">If set <InlineMath math="A" /> has 3 elements and set <InlineMath math="B = \{3, 4, 5\}" />, find the number of elements in <InlineMath math="A \times B" /> and the total number of relations from <InlineMath math="A" /> to <InlineMath math="B" />.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Find cardinality of <InlineMath math="B" />: <InlineMath math="n(B) = 3" /> (elements are 3, 4, 5).</p>
            <p>2. Given <InlineMath math="n(A) = 3" />.</p>
            <p>3. Cardinality of Cartesian product: <InlineMath math="n(A \times B) = n(A) \cdot n(B) = 3 \times 3 = 9" />.</p>
            <p>4. Number of relations is the number of subsets of <InlineMath math="A \times B" />: <InlineMath math="2^{n(A \times B)} = 2^9 = 512" />.</p>
            <p className="text-cyan-300 font-bold">Output: n(A &times; B) = 9 elements | Total Relations = 512</p>
          </div>
        </div>

        {/* Example 5 (New) */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px] font-mono">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 5: Verifying Set Distributive Law</span>
          <p className="text-white/80">If <InlineMath math="A = \{1, 2\}" />, <InlineMath math="B = \{2, 3\}" />, and <InlineMath math="C = \{3, 4\}" />, verify the distributive law <InlineMath math="A \cap (B \cup C) = (A \cap B) \cup (A \cap C)" />.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Evaluate LHS:
               <br />
               - Find Union: <InlineMath math="B \cup C = \{2, 3, 4\}" />.
               <br />
               - Find Intersection: <InlineMath math="A \cap (B \cup C) = \{1, 2\} \cap \{2, 3, 4\} = \{2\}" />.
            </p>
            <p>2. Evaluate RHS:
               <br />
               - Find Intersection 1: <InlineMath math="A \cap B = \{2\}" />.
               <br />
               - Find Intersection 2: <InlineMath math="A \cap C = \emptyset" />.
               <br />
               - Find Union of Intersections: <InlineMath math="(A \cap B) \cup (A \cap C) = \{2\} \cup \emptyset = \{2\}" />.
            </p>
            <p className="text-cyan-300 font-bold">LHS = RHS = {'{'}2{'}'} (Distributive Law verified successfully!)</p>
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
            { cue: '"Check if the relation is equivalence on integers"', think: "Verify Reflexive (a,a), Symmetric (a,b -> b,a), and Transitive (a,b and b,c -> a,c) properties." },
            { cue: '"Find the range of f(x) = |x - 2| + 5"', think: "Minimum value of modulus is 0. So the range starts at 5: [5, ∞)." },
            { cue: '"Condition for f(x) to have an inverse"', think: "The function must be bijective (both injective/one-to-one and surjective/onto)." },
            { cue: '"Find domain of log(x² - 9)"', think: "The argument of a log must be strictly positive: x² - 9 > 0 → x ∈ (-∞, -3) ∪ (3, ∞)." },
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
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: The Null Set vs. Set containing Null Set">
            <code>∅</code> is the empty set with 0 elements. However, <code>{'{'}∅{'}'}</code> is a non-empty power-set element containing ∅, meaning its cardinality is 1!
          </TrapCard>
          <TrapCard title="Trap 2: Default Transitivity validation">
            A relation is transitive <strong>by default</strong> if there are no pairs <code>(a,b)</code> and <code>(b,c)</code> present to check. For example, <code>R = {'{'} (1,2) {'}'}</code> on <code>A = {'{'}1, 2, 3{'}'}</code> is transitive!
          </TrapCard>
          <TrapCard title="Trap 3: Inversion mapping check">
            Do not assume any function has an inverse. If a function is not onto (codomain has leftovers) or not one-to-one, its inverse relation is not a valid function.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
 <h3 className="text-cyan-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Subsets: A set of size n has 2ⁿ subsets",
            "Symmetric difference: A Δ B = (A ∪ B) − (A ∩ B)",
            "De Morgan's complement rules: (A ∪ B)' = A' ∩ B'",
            "Equivalence relations: Reflexive, Symmetric, and Transitive simultaneously",
            "Equivalence classes partition set into disjoint subsets",
            "Injection (1-1): f(x₁) = f(x₂) &rArr; x₁ = x₂",
            "Surjection (onto): Range equals Codomain",
            "Bijection: Injective & Surjective (Invertible)",
            "Composition is NOT commutative: g(f(x)) &ne; f(g(x))",
            "Vertical line test: curve represents function if crosses at most once",
            "Greatest Integer [x]: step staircase, integer &le; x",
            "Fractional part: {x} = x − [x] (Range: [0, 1))",
            "Domain roots: inside &radic; must be &ge; 0",
            "Domain fractions: denominator must be &ne; 0"
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
