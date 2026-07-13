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
      <p className="font-mono text-cyan-300 font-bold text-[13px] sm:text-sm" dangerouslySetInnerHTML={{ __html: formula }} />
      <p className="text-white/80 text-[12px]"><strong className="text-white/40">Use:</strong> <span dangerouslySetInnerHTML={{ __html: use }} /></p>
      <p className="text-white/55 text-[12px]"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
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

// ─── SVG 1: MATRIX MULTIPLICATION COMPATIBILITY RULE ──────────────────────────
function MatrixMultiplicationSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Matrix Multiplication Dimensional compatibility check</p>
      <svg viewBox="0 0 340 100" className="w-full" style={{ maxHeight: 90 }}>
        {/* Matrix A dims */}
        <rect x="30" y="25" width="80" height="30" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="70" y="44" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle">Matrix A (m &times; n)</text>

        {/* Matrix B dims */}
        <rect x="150" y="25" width="80" height="30" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="190" y="44" fill="#a78bfa" fontSize="9" fontFamily="monospace" textAnchor="middle">Matrix B (n &times; p)</text>

        {/* Output dims */}
        <rect x="260" y="25" width="60" height="30" rx="4" fill="none" stroke="#34d399" strokeWidth="1.2" />
        <text x="290" y="44" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">AB (m &times; p)</text>

        {/* Compatibility link */}
        <path d="M 98 55 C 110 65 150 65 162 55" fill="none" stroke="#eab308" strokeWidth="1" strokeDasharray="3 3" />
        <text x="130" y="75" fill="#eab308" fontSize="8" fontFamily="monospace" textAnchor="middle">Columns (n) must match Rows (n)</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: TRANSPOSE OF A MATRIX Reflection ─────────────────────────────────
function MatrixTransposeSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Transpose Reflection across main diagonal (aᵢⱼ &harr; aⱼᵢ)</p>
      <svg viewBox="0 0 340 110" className="w-full" style={{ maxHeight: 100 }}>
        {/* Main diagonal axis line */}
        <line x1="80" y1="20" x2="160" y2="80" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Elements map */}
        <text x="80" y="30" fill="#34d399" fontSize="9" fontFamily="monospace">a₁₁</text>
        <text x="120" y="30" fill="#22d3ee" fontSize="9" fontFamily="monospace">a₁₂</text>
        <text x="80" y="70" fill="#a78bfa" fontSize="9" fontFamily="monospace">a₂₁</text>
        <text x="120" y="70" fill="#34d399" fontSize="9" fontFamily="monospace">a₂₂</text>

        {/* Arrow between a_12 and a_21 */}
        <path d="M 115 35 C 105 45 95 55 85 62" fill="none" stroke="#eab308" strokeWidth="1" />
        <polygon points="85,62 92,60 88,55" fill="#eab308" />
        <polygon points="115,35 108,37 112,42" fill="#eab308" />

        <text x="210" y="45" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">Symmetric: aⱼᵢ = aᵢⱼ</text>
        <text x="210" y="60" fill="#f43f5e" fontSize="9.5" fontFamily="monospace">Skew-Sym: aⱼᵢ = −aᵢⱼ</text>
        <text x="210" y="72" fill="#64748b" fontSize="7.5" fontFamily="monospace">(Skew-Sym diagonals are strictly 0)</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: SARRUS RULE DETERMINANT DIAGRAM ────────────────────────────────────
function DeterminantExpansionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — 3&times;3 Determinant diagonals expansion map (Sarrus / sign matrix)</p>
      <svg viewBox="0 0 340 100" className="w-full" style={{ maxHeight: 90 }}>
        {/* Sign Matrix helper */}
        <g transform="translate(20, 10)">
          <text x="0" y="25" fill="#cbd5e1" fontSize="9" fontFamily="monospace">[ + </text>
          <text x="20" y="25" fill="#f43f5e" fontSize="9" fontFamily="monospace">&minus;</text>
          <text x="35" y="25" fill="#cbd5e1" fontSize="9" fontFamily="monospace">+</text>
          <text x="50" y="25" fill="#cbd5e1" fontSize="9" fontFamily="monospace">]</text>

          <text x="0" y="45" fill="#cbd5e1" fontSize="9" fontFamily="monospace">[ &minus; </text>
          <text x="20" y="45" fill="#cbd5e1" fontSize="9" fontFamily="monospace">+</text>
          <text x="35" y="45" fill="#f43f5e" fontSize="9" fontFamily="monospace">&minus;</text>
          <text x="50" y="45" fill="#cbd5e1" fontSize="9" fontFamily="monospace">]</text>

          <text x="0" y="65" fill="#cbd5e1" fontSize="9" fontFamily="monospace">[ + </text>
          <text x="20" y="65" fill="#f43f5e" fontSize="9" fontFamily="monospace">&minus;</text>
          <text x="35" y="65" fill="#cbd5e1" fontSize="9" fontFamily="monospace">+</text>
          <text x="50" y="65" fill="#cbd5e1" fontSize="9" fontFamily="monospace">]</text>

          <text x="25" y="85" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Cofactor signs</text>
        </g>

        {/* 2x2 standard cross */}
        <g transform="translate(160, 15)">
          <line x1="10" y1="10" x2="60" y2="60" stroke="#34d399" strokeWidth="1.5" />
          <line x1="60" y1="10" x2="10" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="35" y="78" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">|A| = ad &minus; bc</text>
          
          <text x="5" y="22" fill="#cbd5e1" fontSize="9" fontFamily="monospace">a</text>
          <text x="60" y="22" fill="#cbd5e1" fontSize="9" fontFamily="monospace">b</text>
          <text x="5" y="58" fill="#cbd5e1" fontSize="9" fontFamily="monospace">c</text>
          <text x="60" y="58" fill="#cbd5e1" fontSize="9" fontFamily="monospace">d</text>
        </g>

        <text x="290" y="45" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">|AB| = |A||B|</text>
        <text x="290" y="60" fill="#22d3ee" fontSize="9" fontFamily="monospace" textAnchor="middle">|kA| = kⁿ|A|</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: MATRIX INVERSE FLOWCHART ──────────────────────────────────────────
function MatrixInverseFlowSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Adjoint &amp; inverse computation pipeline</p>
      <svg viewBox="0 0 340 100" className="w-full" style={{ maxHeight: 90 }}>
        {/* Step 1: Matrix A */}
        <rect x="15" y="25" width="55" height="30" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="42.5" y="43" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace" textAnchor="middle">Matrix A</text>

        {/* Step 2: Cofactor C */}
        <rect x="95" y="25" width="60" height="30" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="125" y="43" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Cofactors C</text>

        {/* Step 3: Adjoint C^T */}
        <rect x="180" y="25" width="65" height="30" rx="4" fill="none" stroke="#34d399" strokeWidth="1" />
        <text x="212.5" y="43" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">Adjoint Cᵀ</text>

        {/* Step 4: Inverse */}
        <rect x="270" y="25" width="55" height="30" rx="4" fill="none" stroke="#eab308" strokeWidth="1.2" />
        <text x="297.5" y="43" fill="#eab308" fontSize="9.5" fontFamily="monospace" textAnchor="middle">Inv A⁻¹</text>

        {/* Connection arrows */}
        <path d="M 70 40 L 95 40 M 155 40 L 180 40 M 245 40 L 270 40" stroke="#475569" strokeWidth="1" />

        <text x="170" y="80" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace" textAnchor="middle">A⁻¹ = (1/|A|) &middot; adj(A)</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function MatricesDeterminantsDetail({ progress, isCompleted, onNavigate }: Props) {
  // 2x2 Matrix Input Elements
  const [ma, setMa] = useState<string>('2');
  const [mb, setMb] = useState<string>('3');
  const [mc, setMc] = useState<string>('1');
  const [md, setMd] = useState<string>('4');

  const aVal = parseFloat(ma) || 0;
  const bVal = parseFloat(mb) || 0;
  const cVal = parseFloat(mc) || 0;
  const dVal = parseFloat(md) || 0;

  // Matrix properties computations
  const det = aVal * dVal - bVal * cVal;
  const trace = aVal + dVal;

  const isSymmetric = bVal === cVal;
  const isSkewSymmetric = aVal === 0 && dVal === 0 && bVal === -cVal;

  // Adjoint elements
  const adjA = dVal;
  const adjB = -bVal;
  const adjC = -cVal;
  const adjD = aVal;

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
              <Tag color="cyan">Mathematics Unit 2</Tag>
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
              Matrices and Determinants
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Algebraic Operations</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">System of Equations</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (2.8/5)' },
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

      {/* PART 0: CONCEPT, ALGEBRA & ELEMENTARY OPERATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 0</span>
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Concept, Algebra &amp; Elementary Operations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A matrix is a formal rectangular array representing linear transformations. We define its notation, arithmetic properties, and row/column reduction tools.
        </p>

        {/* Notation, Order & Equality */}
 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Notation, Order &amp; Equality</strong>
          <p>&bull; <strong>Matrix Notation:</strong> Denoted as <code>A = [a_ij]_m&times;n</code> where <code>i</code> represents the row index (1 to m) and <code>j</code> represents the column index (1 to n).</p>
          <p>&bull; <strong>Equality Condition:</strong> Two matrices A = [a_ij] and B = [b_ij] are equal (A = B) if and only if:
            <br />
            1. They have the same order (m &times; n).
            <br />
            2. Corresponding elements are equal: <code>a_ij = b_ij</code> for all i, j.
          </p>
        </div>

        {/* Matrix Addition & Scalar Multiplication definitions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block">Matrix Addition (A + B)</span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              Defined **only if** A and B have the same order. Add corresponding elements: <code>c_ij = a_ij + b_ij</code>.
              <br />
 <span className="text-[12px] text-white/40 mt-1 block">Properties: Commutative (A+B = B+A), Associative (A+(B+C) = (A+B)+C).</span>
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-[12px] font-black text-violet-400 uppercase tracking-wider block">Scalar Multiplication (kA)</span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              Multiplying matrix A by scalar k scales **every single element** by k: <code>kA = [k &middot; a_ij]</code>.
              <br />
 <span className="text-[12px] text-white/40 mt-1 block">Negative matrix: −A = (−1)A. Zero matrix has no inverse.</span>
            </p>
          </div>
        </div>

        {/* Elementary Row & Column Operations */}
 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔄 Elementary Row &amp; Column Operations</strong>
          <p>&bull; <strong>Row/Col Swap:</strong> Interchanging two rows/columns: <code>R_i &harr; R_j</code> or <code>C_i &harr; C_j</code>.</p>
          <p>&bull; <strong>Scalar Scale:</strong> Multiplying a row/column by a non-zero scalar: <code>R_i &rarr; k R_i</code> or <code>C_i &rarr; k C_i</code>.</p>
          <p>&bull; <strong>Row/Col Addition:</strong> Adding a scalar multiple of another row/column: <code>R_i &rarr; R_i + k R_j</code> or <code>C_i &rarr; C_i + k C_j</code>.</p>
        </div>

        {/* Uniqueness of Inverse Proof */}
 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2.5 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Proof: Uniqueness of Inverse Matrix</strong>
          <p className="text-white/60 leading-relaxed">
            Suppose square matrix A has two distinct inverses, B and C.
            <br />
            By definition: <code>AB = BA = I</code> and <code>AC = CA = I</code>.
            <br />
            Let's evaluate:
            <br />
            <code>B = B &middot; I = B(AC) = (BA)C = I &middot; C = C</code>.
            <br />
            Since <code>B = C</code>, the inverse is strictly **unique**.
          </p>
        </div>
      </div>

      {/* PART 1: MATRICES BASICS & TYPES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Matrices Basics &amp; Classifications</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A matrix is an ordered rectangular array of numbers. Matrix operations follow strict compatibility guidelines.
        </p>
        <MatrixMultiplicationSVG />
        <MatrixTransposeSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="(AB)ᵀ = Bᵀ Aᵀ"
            use="Transpose Reversal Law"
            note="Applies similarly to matrix inverses: (AB)⁻¹ = B⁻¹ A⁻¹."
            priority={5}
          />
          <FormulaCard
            formula="A = ½(A + Aᵀ) + ½(A − Aᵀ)"
            use="Symmetric/Skew-Symmetric decomposition"
            note="Every square matrix can be uniquely decomposed into the sum of a symmetric and skew-symmetric matrix."
            priority={5}
          />
        </div>

        {/* Matrix Multiplication Worked Example */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🧮 Matrix Multiplication Worked Example</strong>
          <p>
            Multiply A (2&times;2) by B (2&times;1):
            <br />
            <code>A = [1 2; 3 4]</code>, <code>B = [5; 6]</code>
            <br />
            <code>AB = [(1&middot;5 + 2&middot;6); (3&middot;5 + 4&middot;6)] = [(5 + 12); (15 + 24)] = [17; 39]</code>
          </p>
        </div>

        {/* Trace of a Matrix */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Trace of a Square Matrix: tr(A)</strong>
          <p>&bull; <strong>Definition:</strong> Sum of main diagonal elements: <code>tr(A) = a₁₁ + a₂₂ + ...</code></p>
          <p>&bull; <strong>Addition rule:</strong> <code>tr(A + B) = tr(A) + tr(B)</code>.</p>
          <p>&bull; <strong>Cyclic order product:</strong> <code>tr(AB) = tr(BA)</code>.</p>
          <p>&bull; <strong>Scaling rule:</strong> <code>tr(kA) = k &middot; tr(A)</code>.</p>
        </div>

        {/* Matrix classifications box */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Matrix Classifications Taxonomy</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Matrix Type</th>
                  <th>Definition / Mathematical Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Row Matrix</td>
                  <td>Matrix containing only a single row (order 1 &times; n).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Column Matrix</td>
                  <td>Matrix containing only a single column (order m &times; 1).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Rectangular Matrix</td>
                  <td>Matrix where number of rows does not equal columns (m &ne; n).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Null (Zero) Matrix</td>
                  <td>Matrix where every entry is exactly zero (denoted by O). Has no inverse.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Square Matrix</td>
                  <td>Number of rows equals number of columns (m = n).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Diagonal Matrix</td>
                  <td>Square matrix where all non-diagonal elements are zero (a_ij = 0 for i &ne; j).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Scalar Matrix</td>
                  <td>Diagonal matrix with all diagonal elements equal.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Identity Matrix (I)</td>
                  <td>Scalar matrix where diagonal elements equal 1. (Note: I⁻¹ = I).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">Orthogonal Matrix</td>
                  <td>Square matrix satisfies: <code>A &middot; Aᵀ = Aᵀ &middot; A = I</code>. Implies <code>A⁻¹ = Aᵀ</code> and <code>|A| = &plusmn;1</code>.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-purple-400 font-bold">Idempotent Matrix</td>
                  <td>Square matrix satisfies: <code>A&sup2; = A</code>. Trace is equal to the rank.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 2: DETERMINANTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Determinants, Cofactors &amp; Inverses</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Determinants are scalar values mapping square matrices. Invertibility requires a non-singular determinant ($|A| \neq 0$).
        </p>
        <DeterminantExpansionSVG />
        <MatrixInverseFlowSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="A(adj A) = |A|I"
            use="Adjoint Identity Relation"
            note="Also implies |adj A| = |A|^(n-1) where n is matrix square order."
            priority={5}
          />
          <FormulaCard
            formula="A⁻¹ = (1/|A|) &middot; adj(A)"
            use="Matrix Inverse evaluation"
            note="Strictly valid only if matrix is non-singular (|A| &ne; 0)."
            priority={5}
          />
          <FormulaCard
            formula="Area = ½ | det([x₁ y₁ 1; x₂ y₂ 1; x₃ y₃ 1]) |"
            use="Area of a Triangle using Determinants"
            note="For vertices (x₁,y₁), (x₂,y₂), (x₃,y₃). If Area = 0, the three points are strictly collinear."
            priority={5}
          />
        </div>

        {/* Minors & Cofactors Definition */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Minors and Cofactors Formal Definitions</strong>
          <p>&bull; <strong>Minor (M_ij):</strong> The determinant of the submatrix obtained by deleting the i-th row and j-th column of matrix A.</p>
          <p>&bull; <strong>Cofactor (A_ij):</strong> The signed minor calculated as:
            <br />
            <code className="text-cyan-400">A_ij = (−1)ⁱ⁺ʲ &middot; M_ij</code>.
          </p>
        </div>

        {/* Singular vs Non-Singular Definition */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 space-y-1">
            <span className="text-[12px] font-black text-amber-400 uppercase tracking-wider block">Singular Matrix</span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              A square matrix where the determinant is zero (<code>|A| = 0</code>). Singular matrices have **no inverse** (non-invertible).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-1">
            <span className="text-[12px] font-black text-emerald-400 uppercase tracking-wider block">Non-Singular Matrix</span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              A square matrix where the determinant is non-zero (<code>|A| &ne; 0</code>). They are always **invertible** (A⁻¹ exists).
            </p>
          </div>
        </div>

        {/* Determinant properties box */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Properties &amp; Shortcuts of Determinants</strong>
          <p>&bull; <strong>Multiplicativity:</strong> <code>|AB| = |A||B|</code>.</p>
          <p>&bull; <strong>Scalar Expansion:</strong> <code>|kA| = kⁿ|A|</code> (where n is matrix order).</p>
          <p>&bull; <strong>Inverse Determinant:</strong> <code>|A⁻¹| = 1/|A|</code>.</p>
          <p>&bull; <strong>Row Swap:</strong> Interchanging two rows or columns flips sign: <code>|A'| = −|A|</code>.</p>
          <p>&bull; <strong>Row Addition:</strong> Adding scalar multiples of rows (<code>R_i &rarr; R_i + k &middot; R_j</code>) preserves the determinant value.</p>
          <p>&bull; <strong>Triangular Matrices:</strong> Determinant of upper/lower triangular or diagonal matrices equals the product of diagonal entries.</p>
          <p>&bull; <strong>Efficiency Tip:</strong> Always expand the determinant along the row or column containing the <strong>maximum number of zeros</strong>.</p>
        </div>

        {/* Properties of Inverse */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Properties of Matrix Inverse</strong>
          <p>&bull; <code>(A⁻¹)⁻¹ = A</code>.</p>
          <p>&bull; <code>(AB)⁻¹ = B⁻¹ A⁻¹</code> (Reversal Law).</p>
          <p>&bull; <code>(Aᵀ)⁻¹ = (A⁻¹)ᵀ</code>.</p>
          <p>&bull; <code>(kA)⁻¹ = (1/k) A⁻¹</code> (where k is non-zero scalar).</p>
        </div>

        {/* Area Scale & Rank */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Geometric Transformation &amp; Rank</strong>
          <p>&bull; <strong>Determinant Scale Factor:</strong> The determinant measures how areas/volumes are scaled by a transformation:
            <br />
            - <code>|A| &gt; 0</code>: Orientation preserved.
            <br />
            - <code>|A| &lt; 0</code>: Reverses orientation (reflection).
            <br />
            - <code>|A| = 0</code>: Space collapses (line collapses to point, 3D to 2D plane).
          </p>
          <p>&bull; <strong>Rank of a Matrix:</strong> The maximum number of linearly independent rows (or columns) in a matrix. Trace of an idempotent matrix is equal to its rank.</p>
        </div>
      </div>

      {/* PART 3: SYSTEM OF LINEAR EQUATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Solving System of Linear Equations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          System equations are represented as <code>AX = B</code> and resolved using Cramer's Rule or Matrix inverses.
        </p>

        {/* Cramer's Rule box */}
 <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Cramer's Rule (Determinants)</strong>
          <p>&bull; <code>x = D_x / D</code>, <code>y = D_y / D</code>, <code>z = D_z / D</code>.</p>
          <p>&bull; <strong>Unique Solution:</strong> If <code>D &ne; 0</code>.</p>
          <p>&bull; <strong>Inconsistent (No solution):</strong> If <code>D = 0</code> and at least one <code>D_i &ne; 0</code>.</p>
          <p>&bull; <strong>Infinite or No solution:</strong> If <code>D = D_x = D_y = D_z = 0</code>.</p>
        </div>
      </div>

      {/* PART 4: INTERACTIVE SOLVER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">2&times;2 Matrix Solver</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Enter elements of matrix A to evaluate determinant, adjoint, inverse, and classifications.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto p-4 rounded-2xl bg-white/5 border border-white/10">
 <input type="number" value={ma} onChange={e => setMa(e.target.value)} className="w-full px-2 py-1.5 rounded bg-[#0A0C18] border border-white/15 text-white text-[13px] text-center outline-none" />
 <input type="number" value={mb} onChange={e => setMb(e.target.value)} className="w-full px-2 py-1.5 rounded bg-[#0A0C18] border border-white/15 text-white text-[13px] text-center outline-none" />
 <input type="number" value={mc} onChange={e => setMc(e.target.value)} className="w-full px-2 py-1.5 rounded bg-[#0A0C18] border border-white/15 text-white text-[13px] text-center outline-none" />
 <input type="number" value={md} onChange={e => setMd(e.target.value)} className="w-full px-2 py-1.5 rounded bg-[#0A0C18] border border-white/15 text-white text-[13px] text-center outline-none" />
        </div>
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[13px] text-white/80">
          <p>&bull; Determinant |A| = <span className="text-cyan-400 font-bold">{det}</span></p>
          <p>&bull; Trace(A) = <span className="text-violet-400 font-bold">{trace}</span></p>
          <p>&bull; Symmetric = <span className={cn('font-bold', isSymmetric ? 'text-emerald-400' : 'text-white/40')}>{isSymmetric ? 'YES' : 'NO'}</span></p>
          <p>&bull; Skew-Symmetric = <span className={cn('font-bold', isSkewSymmetric ? 'text-emerald-400' : 'text-white/40')}>{isSkewSymmetric ? 'YES' : 'NO'}</span></p>
          <p>&bull; Adjoint adj(A) = <span className="text-rose-400 font-bold">[{adjA}, {adjB}; {adjC}, {adjD}]</span></p>
          <p>&bull; Inverse A⁻¹ = <span className="text-yellow-400 font-bold">{det !== 0 ? `[${(adjA/det).toFixed(2)}, ${(adjB/det).toFixed(2)}; ${(adjC/det).toFixed(2)}, ${(adjD/det).toFixed(2)}]` : 'undefined (singular)'}</span></p>
        </div>
      </div>

      {/* PART 5: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Matrix scalar determinant properties</span>
          <p className="text-white/80">If A is a 3&times;3 matrix with |A| = 4, evaluate the value of |3A|.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify formula: <code>|kA| = kⁿ|A|</code> where n is order.</p>
            <p>2. Here order n = 3, and scalar factor k = 3.</p>
            <p>3. Calculate: <code>|3A| = 3&sup3; &middot; |A| = 27 &middot; 4 = 108</code>.</p>
            <p className="text-cyan-300 font-bold">Determinant value = 108</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Cramer's rule evaluation</span>
          <p className="text-white/80">Solve the system: 2x + 3y = 8 and x + 4y = 9 using Cramer's rule.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Compute main determinant: <code>D = det([2,3; 1,4]) = 8 − 3 = 5</code>.</p>
            <p>2. Compute Dx (replace first column with constants): <code>D_x = det([8,3; 9,4]) = 32 − 27 = 5</code>.</p>
            <p>3. Compute Dy (replace second column with constants): <code>D_y = det([2,8; 1,9]) = 18 − 8 = 10</code>.</p>
            <p>4. Solutions: <code>x = D_x/D = 5/5 = 1</code>, <code>y = D_y/D = 10/5 = 2</code>.</p>
            <p className="text-cyan-300 font-bold">Solutions: (x, y) = (1, 2)</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Adjoint properties</span>
          <p className="text-white/80">If |A| = 5 for a 3&times;3 matrix, find the value of |adj A|.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify formula: <code>|adj A| = |A|^(n-1)</code>.</p>
            <p>2. Scale order exponent: <code>n − 1 = 3 − 1 = 2</code>.</p>
            <p>3. Calculate: <code>|adj A| = 5&sup2; = 25</code>.</p>
            <p className="text-cyan-300 font-bold">Adjoint Determinant = 25</p>
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
            { cue: '"Find values of k for which system has infinite solutions"', think: "Set determinant D = 0 and solve for variable parameters." },
            { cue: '"Evaluate |adj A|"', think: "Apply the relation |adj A| = |A|^(n-1) to bypass adjoint calculation." },
            { cue: '"Matrix satisfies Aᵀ = −A"', think: "Matrix is skew-symmetric; diagonal elements are strictly zero." },
            { cue: '"Find determinant of product matrix |AB|"', think: "Compute separately |A| &middot; |B| rather than performing matrix multiplications." },
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
          <TrapCard title="Trap 1: The Matrix Scaling Exponent Trap">
            Remember that <code>|kA| = kⁿ |A|</code>. Forgetting the order exponent <code>n</code> is one of the most frequent mistakes.
          </TrapCard>
          <TrapCard title="Trap 2: Matrix Multiplication is NOT Commutative">
            In general, <code>AB &ne; BA</code>. When multiplying matrices, keep factor order strictly identical.
          </TrapCard>
          <TrapCard title="Trap 3: Transpose of products reversal">
            When taking transposes or inverses of product matrices, order reverses: <code>(AB)ᵀ = Bᵀ Aᵀ</code> and <code>(AB)⁻¹ = B⁻¹ A⁻¹</code>.
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
            "Matrix Transpose rule: (AB)ᵀ = Bᵀ Aᵀ",
            "Symmetric Matrix: Aᵀ = A",
            "Skew-Symmetric: Aᵀ = −A (diagonals strictly 0)",
            "Determinant relation: |AB| = |A||B|",
            "Scaling rule: |kA| = kⁿ|A|",
            "Adjoint relation: A(adj A) = |A|I",
            "Adjoint determinant: |adj A| = |A|^(n-1)",
            "Matrix Inverse: A⁻¹ = (1/|A|) &middot; adj A",
            "Invertibility condition: |A| &ne; 0",
            "Cramer's Rule parameter: x = D_x/D, y = D_y/D",
            "Orthogonal Matrix condition: A &middot; Aᵀ = I",
            "Trace of square matrix: sum of diagonal elements",
            "Inconsistent system: D = 0 and at least one D_i &ne; 0"
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
