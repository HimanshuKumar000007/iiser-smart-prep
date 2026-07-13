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

// ─── SVG 1: VECTOR ADDITION DIAGRAM ───────────────────────────────────────────
function VectorAdditionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Triangle Law &amp; Parallelogram Law of Vector Addition</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 120 }}>
        {/* Triangle Law */}
        <g transform="translate(10, 10)">
          <line x1="20" y1="90" x2="100" y2="90" stroke="#22d3ee" strokeWidth="2" />
          <polygon points="100,90 92,86 92,94" fill="#22d3ee" />
          <text x="60" y="102" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">u⃗</text>

          <line x1="100" y1="90" x2="140" y2="30" stroke="#a78bfa" strokeWidth="2" />
          <polygon points="140,30 132,36 137,41" fill="#a78bfa" />
          <text x="127" y="55" fill="#a78bfa" fontSize="8" fontFamily="monospace">v⃗</text>

          <line x1="20" y1="90" x2="140" y2="30" stroke="#34d399" strokeWidth="2" />
          <polygon points="140,30 131,34 133,28" fill="#34d399" />
          <text x="65" y="47" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">u⃗ + v⃗</text>
          
          <text x="75" y="15" fill="#64748b" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Triangle Law</text>
        </g>

        {/* Parallelogram Law */}
        <g transform="translate(180, 10)">
          <line x1="20" y1="90" x2="100" y2="90" stroke="#22d3ee" strokeWidth="2" />
          <polygon points="100,90 92,86 92,94" fill="#22d3ee" />
          <text x="60" y="102" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">u⃗</text>

          <line x1="20" y1="90" x2="60" y2="30" stroke="#a78bfa" strokeWidth="2" />
          <polygon points="60,30 52,36 57,41" fill="#a78bfa" />
          <text x="32" y="55" fill="#a78bfa" fontSize="8" fontFamily="monospace">v⃗</text>

          {/* Dotted lines */}
          <line x1="100" y1="90" x2="140" y2="30" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="60" y1="30" x2="140" y2="30" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

          {/* Resultant */}
          <line x1="20" y1="90" x2="140" y2="30" stroke="#34d399" strokeWidth="2" />
          <polygon points="140,30 131,34 133,28" fill="#34d399" />
          <text x="75" y="47" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold">Resultant</text>
          
          <text x="75" y="15" fill="#64748b" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Parallelogram Law</text>
        </g>
      </svg>
    </div>
  );
}

// ─── SVG 2: RESOLUTION OF VECTORS IN 2D ────────────────────────────────────────
function VectorResolutionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Resolution of Vector A⃗ into Ax (cos) &amp; Ay (sin) components</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 110 }}>
        {/* Axes */}
        <line x1="30" y1="100" x2="250" y2="100" stroke="#475569" strokeWidth="1" />
        <line x1="30" y1="110" x2="30" y2="20" stroke="#475569" strokeWidth="1" />

        {/* Vector */}
        <line x1="30" y1="100" x2="180" y2="40" stroke="#22d3ee" strokeWidth="2" />
        <polygon points="180,40 172,43 175,49" fill="#22d3ee" />

        {/* Projection dotted lines */}
        <line x1="180" y1="40" x2="180" y2="100" stroke="#64748b" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="180" y1="40" x2="30" y2="40" stroke="#64748b" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Labels */}
        <text x="185" y="37" fill="#cbd5e1" fontSize="9" fontFamily="monospace" fontWeight="bold">A⃗</text>
        <text x="110" y="113" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">Ax = A cos&theta;</text>
        <text x="35" y="74" fill="#a78bfa" fontSize="8" fontFamily="monospace">Ay = A sin&theta;</text>

        {/* Angle */}
        <path d="M 60 100 A 30 30 0 0 0 54 87" fill="none" stroke="#eab308" strokeWidth="1" />
        <text x="65" y="93" fill="#eab308" fontSize="8.5" fontFamily="monospace">&theta;</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: CROSS PRODUCT AND RIGHT-HAND RULE ──────────────────────────────────
function RightHandRuleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — cross Product Normal Vector perpendicular to A⃗ and B⃗</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 120 }}>
        {/* Plane grid representation */}
        <polygon points="40,110 200,110 250,75 90,75" fill="#334155" fillOpacity="0.1" stroke="#475569" strokeWidth="0.8" />
        
        {/* Vector A */}
        <line x1="140" y1="95" x2="220" y2="95" stroke="#22d3ee" strokeWidth="2" />
        <polygon points="220,95 212,91 212,99" fill="#22d3ee" />
        <text x="228" y="98" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">A⃗</text>

        {/* Vector B (tilted) */}
        <line x1="140" y1="95" x2="190" y2="80" stroke="#a78bfa" strokeWidth="2" />
        <polygon points="190,80 182,79 184,85" fill="#a78bfa" />
        <text x="198" y="78" fill="#a78bfa" fontSize="8.5" fontFamily="monospace">B⃗</text>

        {/* Resultant Perpendicular Normal Vector A x B */}
        <line x1="140" y1="95" x2="140" y2="25" stroke="#34d399" strokeWidth="2.5" />
        <polygon points="140,25 136,33 144,33" fill="#34d399" />
        <text x="140" y="18" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">A⃗ &times; B⃗</text>

        {/* Perpendicular square notation */}
        <polyline points="140,85 148,85 148,95" fill="none" stroke="#34d399" strokeWidth="0.8" />

        {/* Right-Hand notation text */}
        <text x="280" y="60" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Index finger &rarr; A⃗</text>
        <text x="280" y="73" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Middle finger &rarr; B⃗</text>
        <text x="280" y="86" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Thumb &rarr; A⃗ &times; B⃗</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: VECTOR PROJECTION ──────────────────────────────────────────────────
function VectorProjectionSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Scalar Projection (Shadow length) of A⃗ onto B⃗</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 100 }}>
        {/* Base vector B */}
        <line x1="30" y1="90" x2="270" y2="90" stroke="#cbd5e1" strokeWidth="1.5" />
        <polygon points="270,90 262,86 262,94" fill="#cbd5e1" />
        <text x="278" y="93" fill="#cbd5e1" fontSize="9" fontFamily="monospace">B⃗</text>

        {/* Vector A */}
        <line x1="30" y1="90" x2="160" y2="35" stroke="#22d3ee" strokeWidth="2" />
        <polygon points="160,35 151,39 155,44" fill="#22d3ee" />
        <text x="165" y="32" fill="#22d3ee" fontSize="9" fontFamily="monospace">A⃗</text>

        {/* Projection dotted line */}
        <line x1="160" y1="35" x2="160" y2="90" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="3 3" />
        
        {/* Shaded projection line */}
        <line x1="30" y1="90" x2="160" y2="90" stroke="#f43f5e" strokeWidth="2.5" />
        <circle cx="160" cy="90" r="2.5" fill="#f43f5e" />

        {/* Label */}
        <text x="95" y="104" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle">Projection = |A⃗| cos&theta;</text>
        
        {/* Angle */}
        <path d="M 55 90 A 25 25 0 0 0 51 80" fill="none" stroke="#eab308" strokeWidth="1" />
        <text x="60" y="85" fill="#eab308" fontSize="8" fontFamily="monospace">&theta;</text>
      </svg>
    </div>
  );
}

// ─── SVG 5: TRIPLE PRODUCTS SUMMARY FLOWCHART ──────────────────────────────────
function TripleProductsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Vector &amp; Triple Product classification map</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 95 }}>
        {/* Vector Box */}
        <rect x="15" y="45" width="70" height="22" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="50" y="58" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">Vector Ops</text>

        {/* Dot Product */}
        <rect x="105" y="15" width="105" height="24" rx="4" fill="none" stroke="#cbd5e1" strokeWidth="1" />
        <text x="157.5" y="29" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">Dot: a⃗ * b⃗ (Scalar)</text>

        {/* Cross Product */}
        <rect x="105" y="75" width="105" height="24" rx="4" fill="none" stroke="#cbd5e1" strokeWidth="1" />
        <text x="157.5" y="89" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">Cross: a⃗ &times; b⃗ (Vector)</text>

        {/* Scalar Triple Product */}
        <rect x="235" y="15" width="95" height="24" rx="4" fill="none" stroke="#34d399" strokeWidth="1" />
        <text x="282.5" y="29" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">STP: [a⃗ b⃗ c⃗] (Vol)</text>

        {/* Vector Triple Product */}
        <rect x="235" y="75" width="95" height="24" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="282.5" y="89" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">VTP: a⃗ &times; (b⃗ &times; c⃗)</text>

        {/* Connections */}
        <path d="M 85 56 L 105 27 M 85 56 L 105 87 M 210 27 L 235 27 M 210 87 L 235 87" stroke="#475569" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function VectorsDetail({ progress, isCompleted, onNavigate }: Props) {
  // Vector A components
  const [a1, setA1] = useState<string>('2');
  const [a2, setA2] = useState<string>('1');
  const [a3, setA3] = useState<string>('-1');

  // Vector B components
  const [b1, setB1] = useState<string>('1');
  const [b2, setB2] = useState<string>('3');
  const [b3, setB3] = useState<string>('2');

  const va1 = parseFloat(a1) || 0;
  const va2 = parseFloat(a2) || 0;
  const va3 = parseFloat(a3) || 0;

  const vb1 = parseFloat(b1) || 0;
  const vb2 = parseFloat(b2) || 0;
  const vb3 = parseFloat(b3) || 0;

  // Computations
  const magA = Math.sqrt(va1 * va1 + va2 * va2 + va3 * va3);
  const magB = Math.sqrt(vb1 * vb1 + vb2 * vb2 + vb3 * vb3);
  
  const dotProduct = va1 * vb1 + va2 * vb2 + va3 * vb3;
  
  const cross1 = va2 * vb3 - va3 * vb2;
  const cross2 = va3 * vb1 - va1 * vb3;
  const cross3 = va1 * vb2 - va2 * vb1;
  const magCross = Math.sqrt(cross1 * cross1 + cross2 * cross2 + cross3 * cross3);

  const angleRad = magA > 0 && magB > 0 ? Math.acos(Math.max(-1, Math.min(1, dotProduct / (magA * magB)))) : 0;
  const angleDeg = angleRad * (180 / Math.PI);

  const scalarProjection = magB > 0 ? dotProduct / magB : 0;

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
              Vectors and 3D Algebra
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Coordinate Geometry</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Basic Trigonometry</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
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
      {/* PART 0: VECTOR FUNDAMENTALS & TAXONOMY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 0</span>
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Vector Fundamentals &amp; Taxonomy</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Before performing operations, we must distinguish between scalar and vector quantities and classify their geometric properties.
        </p>

        {/* Scalar vs Vector definitions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block">Scalars (Magnitude only)</span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              Quantities fully described by a single real number (size/magnitude). Examples: <em>mass, temperature, time, distance, speed, energy</em>. They obey standard algebraic addition.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <span className="text-[12px] font-black text-violet-400 uppercase tracking-wider block">Vectors (Magnitude + Direction)</span>
            <p className="text-white/70 text-[13px] leading-relaxed">
              Quantities requiring both a magnitude (length) and a specific spatial direction. Examples: <em>displacement, velocity, force, acceleration, momentum</em>. They obey vector addition laws.
            </p>
          </div>
        </div>

        {/* Foundations taxonomy box */}
 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Core Definitions &amp; Taxonomy</strong>
          <p>&bull; <strong>Position Vector:</strong> A vector representing a point P(x, y, z) relative to origin O(0,0,0). Denoted <code>OP⃗ = xî + yĵ + zk̂</code>.</p>
          <p>&bull; <strong>Negative of a Vector:</strong> A vector with identical magnitude but exactly opposite direction. Denoted <code>−a⃗ = −xî − yĵ − zk̂</code> (angle of 180&deg;).</p>
          <p>&bull; <strong>Scalar Multiplication (&lambda;a⃗):</strong> Multiplies magnitude by <code>|&lambda;|</code>. Direction is identical if <code>&lambda; &gt; 0</code>, or reversed if <code>&lambda; &lt; 0</code>.
            <br />
 <span className="text-white/40 text-[12px] block mt-1">Properties: &lambda;(&mu;a⃗) = (&lambda;&mu;)a⃗, &lambda;(a⃗+b⃗) = &lambda;a⃗ + &lambda;b⃗.</span>
          </p>
          <p>&bull; <strong>Direction Ratios (a, b, c):</strong> Any set of numbers proportional to direction cosines (l, m, n) such that:
            <br />
            <code className="text-cyan-400">l = a/&radic;(a&sup2;+b&sup2;+c&sup2;)</code>, <code className="text-violet-400">m = b/&radic;(a&sup2;+b&sup2;+c&sup2;)</code>, <code className="text-emerald-400">n = c/&radic;(a&sup2;+b&sup2;+c&sup2;)</code>.
          </p>
        </div>

        {/* Vector types checklist table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Taxonomy of Geometric Vectors</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Vector Type</th>
                  <th>Definition / Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Zero (Null) Vector</td>
                  <td>Magnitude is zero; initial &amp; terminal points coincide. Direction is indeterminate.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Unit Vector</td>
                  <td>Magnitude equals 1 (â = a⃗ / |a⃗|). Defines direction.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Coinitial Vectors</td>
                  <td>Vectors sharing the same initial point.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Collinear (Parallel)</td>
                  <td>Lie along parallel lines (regardless of magnitude/sense). Condition: <code>a⃗ = &lambda;b⃗</code>.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">Equal Vectors</td>
                  <td>Identical magnitude and same direction.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-purple-400 font-bold">Free Vectors</td>
                  <td>Can be translated parallel to themselves without modifying physical properties.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 1: BASICS & ADDITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Vector addition, Components &amp; Cosines</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Vectors combine magnitude and direction. Adding components follows the triangle and parallelogram laws.
        </p>
        <VectorAdditionSVG />
        <VectorResolutionSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="â = a⃗ / |a⃗|"
            use="Unit Vector definition"
            note="Has magnitude of 1. Used solely to specify direction. Zero vector has indeterminate direction."
            priority={5}
          />
          <FormulaCard
            formula="l² + m² + n² = 1"
            use="Direction Cosines Identity"
            note="l = cosα, m = cosβ, n = cosγ. Equivalently, sin²α + sin²β + sin²γ = 2."
            priority={5}
          />
        </div>

        {/* Section and components box */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Section Formula (for Position Vectors)</strong>
          <p>&bull; <strong>Internal:</strong> <code>r⃗ = (mb⃗ + na⃗) / (m + n)</code>.</p>
          <p>&bull; <strong>External:</strong> <code>r⃗ = (mb⃗ − na⃗) / (m − n)</code>.</p>
          <p>&bull; <strong>Distance:</strong> <code>AB = |b⃗ − a⃗| = &radic;((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)</code>.</p>
        </div>
      </div>

      {/* PART 2: DOT AND CROSS PRODUCTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Dot &amp; Cross Vector Products</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The dot product yields a scalar mapping the shadow projection of vectors. The cross product resolves a mutually perpendicular vector.
        </p>
        <VectorProjectionSVG />
        <RightHandRuleSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="a⃗ * b⃗ = |a⃗||b⃗| cosθ"
            use="Dot (Scalar) Product"
            note="Orthogonal check: a⃗ * b⃗ = 0. Angle: &theta; = cos⁻¹((a⃗·b⃗) / (|a⃗||b⃗|))."
            priority={5}
          />
          <FormulaCard
            formula="a⃗ * b⃗ = |a⃗||b⃗| sinθ n̂"
            use="Cross (Vector) Product"
            note="Collinear check: a⃗ * b⃗ = 0. Computed using standard 3x3 determinant."
            priority={5}
          />
        </div>

        {/* Orthogonal reference wheel table */}
        <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Unit Vector Products Quick reference</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-center border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2 text-left">Unit vectors</th>
                  <th>Dot product (&middot;)</th>
                  <th>Cross product (&times;)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-cyan-400 font-bold">î, î</td>
                  <td>1</td>
                  <td>0⃗</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-cyan-400 font-bold">î &times; ĵ</td>
                  <td>0</td>
                  <td>k̂</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-violet-400 font-bold">ĵ &times; k̂</td>
                  <td>0</td>
                  <td>î</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-violet-400 font-bold">k̂ &times; î</td>
                  <td>0</td>
                  <td>ĵ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 3: TRIPLE PRODUCTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Scalar &amp; Vector Triple Products</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Triple products combine three vectors to resolve spatial volumes and planar projections.
        </p>
        <TripleProductsSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="[a⃗ b⃗ c⃗] = a⃗ * (b⃗ * c⃗)"
            use="Scalar Triple Product (STP)"
            note="Represents Volume of Parallelepiped. Coplanar check: [a⃗ b⃗ c⃗] = 0."
            priority={5}
          />
          <FormulaCard
            formula="a⃗ * (b⃗ * c⃗) = (a⃗·c⃗)b⃗ − (a⃗·b⃗)c⃗"
            use="Vector Triple Product (VTP)"
            note="Mnemonic: BAC − CAB. Perpendicular to a⃗ and lies in the plane of b⃗ and c⃗."
            priority={5}
          />
        </div>

        {/* STP Properties box */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Core STP Properties</strong>
          <p>&bull; <strong>Cyclic Permutation:</strong> <code>[a⃗ b⃗ c⃗] = [b⃗ c⃗ a⃗] = [c⃗ a⃗ b⃗]</code>.</p>
          <p>&bull; <strong>Interchange:</strong> Interchanging any two adjacent vectors changes sign: <code>[a⃗ b⃗ c⃗] = −[b⃗ a⃗ c⃗]</code>.</p>
          <p>&bull; <strong>Coplanarity:</strong> If three vectors are coplanar, their STP volume equals 0.</p>
        </div>
      </div>

      {/* PART 4: INTERACTIVE CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Vector Operations Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Enter components for 3D vectors a⃗ and b⃗ to dynamically evaluate products, angles, and projections.
        </p>
        
        {/* Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">Vector a⃗</span>
            <div className="grid grid-cols-3 gap-2">
 <input type="number" value={a1} onChange={e => setA1(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" placeholder="x" />
 <input type="number" value={a2} onChange={e => setA2(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" placeholder="y" />
 <input type="number" value={a3} onChange={e => setA3(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" placeholder="z" />
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">Vector b⃗</span>
            <div className="grid grid-cols-3 gap-2">
 <input type="number" value={b1} onChange={e => setB1(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" placeholder="x" />
 <input type="number" value={b2} onChange={e => setB2(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" placeholder="y" />
 <input type="number" value={b3} onChange={e => setB3(e.target.value)} className="w-full px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" placeholder="z" />
            </div>
          </div>
        </div>

        {/* Results */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[13px] text-white/80">
          <p>&bull; |a⃗| = <span className="text-cyan-400 font-bold">{magA.toFixed(4)}</span></p>
          <p>&bull; |b⃗| = <span className="text-violet-400 font-bold">{magB.toFixed(4)}</span></p>
          <p>&bull; Dot Product (a⃗ * b⃗) = <span className="text-emerald-400 font-bold">{dotProduct}</span></p>
          <p>&bull; Angle between them = <span className="text-yellow-400 font-bold">{angleDeg.toFixed(2)}&deg;</span></p>
          <p>&bull; Cross Product (a⃗ &times; b⃗) = <span className="text-rose-400 font-bold">({cross1.toFixed(2)})î + ({cross2.toFixed(2)})ĵ + ({cross3.toFixed(2)})k̂</span></p>
          <p>&bull; Scalar Projection of a⃗ on b⃗ = <span className="text-cyan-300 font-bold">{scalarProjection.toFixed(4)}</span></p>
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
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Angle Between 3D Vectors</span>
          <p className="text-white/80">Find the angle between vectors a⃗ = (2, 1, −1) and b⃗ = (1, 3, 2).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Compute dot product: <code>a⃗ * b⃗ = (2)(1) + (1)(3) + (−1)(2) = 2 + 3 − 2 = 3</code>.</p>
            <p>2. Compute magnitudes: <code>|a⃗| = &radic;(4+1+1) = &radic;6</code> and <code>|b⃗| = &radic;(1+9+4) = &radic;14</code>.</p>
            <p>3. Apply angle formula: <code>cos&theta; = (a⃗ * b⃗) / (|a⃗||b⃗|) = 3 / &radic;(84)</code>.</p>
            <p className="text-cyan-300 font-bold">&theta; = cos⁻¹(3 / &radic;84) &approx; 70.89&deg;</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Vector perpendicular to two vectors</span>
          <p className="text-white/80">Find a vector of magnitude 5 perpendicular to both a⃗ = (1, −1, 2) and b⃗ = (2, 1, −1).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Use cross product to find perpendicular vector direction:
               <br />
               <code>a⃗ &times; b⃗ = det([î, ĵ, k̂; 1, −1, 2; 2, 1, −1]) = î(1−2) − ĵ(−1−4) + k̂(1−(−2)) = −î + 5ĵ + 3k̂</code>.
            </p>
            <p>2. Find magnitude of cross product: <code>|a⃗ &times; b⃗| = &radic;(1 + 25 + 9) = &radic;35</code>.</p>
            <p>3. Normalize and scale by 5: <code>v⃗ = &plusmn;5 * (−î + 5ĵ + 3k̂) / &radic;35</code>.</p>
            <p className="text-cyan-300 font-bold">Vector: &plusmn;(5/&radic;35)(−î + 5ĵ + 3k̂)</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Area of a Triangle using vertices</span>
          <p className="text-white/80">Find the area of the triangle formed by vertices A(1, 1, 1), B(1, 2, 3), and C(2, 3, 1).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify side vectors instead of coordinates:
               <br />
               <code>AB⃗ = b⃗ − a⃗ = (0)î + (1)ĵ + (2)k̂</code>.
               <br />
               <code>AC⃗ = c⃗ − a⃗ = (1)î + (2)ĵ + (0)k̂</code>.
            </p>
            <p>2. Compute cross product of sides: <code>AB⃗ &times; AC⃗ = det([î, ĵ, k̂; 0, 1, 2; 1, 2, 0]) = î(0−4) − ĵ(0−2) + k̂(0−1) = −4î + 2ĵ − k̂</code>.</p>
            <p>3. Calculate magnitude: <code>|AB⃗ &times; AC⃗| = &radic;(16 + 4 + 1) = &radic;21</code>.</p>
            <p>4. Area = <code>1/2 * |AB⃗ &times; AC⃗| = &radic;21 / 2</code>.</p>
            <p className="text-cyan-300 font-bold">Area = &radic;21 / 2</p>
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
            { cue: '"Prove three vectors are coplanar"', think: "Verify if the Scalar Triple Product [a⃗ b⃗ c⃗] equals 0." },
            { cue: '"Find projection of a⃗ on b⃗"', think: "Compute (a⃗ * b⃗) / |b⃗| for scalar projection, and scale along b̂ for vector form." },
            { cue: '"Angle bisector vector between a⃗ and b⃗"', think: "Bisector points in the direction of (â + b̂) for internal, and (â - b̂) for external." },
            { cue: '"Find vector perpendicular to both vectors"', think: "Compute cross product a⃗ * b⃗, normalize to unit vector, and multiply by desired magnitude." },
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
          <TrapCard title="Trap 1: Vertices vs. Side Vectors for Area">
            If given points, do NOT cross product the position vectors directly (e.g. <code>1/2 |a⃗ &times; b⃗|</code>). You must form side vectors first: <code>AB⃗ = b⃗ - a⃗</code> and <code>AC⃗ = c⃗ - a⃗</code>, and then evaluate.
          </TrapCard>
          <TrapCard title="Trap 2: Dot cancellation fallacy">
            If <code>a⃗ * b⃗ = a⃗ * c⃗</code>, do NOT cancel the vector to imply <code>b⃗ = c⃗</code>. It only means <code>a⃗ * (b⃗ − c⃗) = 0</code>, meaning <code>a⃗</code> is perpendicular to <code>(b⃗ − c⃗)</code>.
          </TrapCard>
          <TrapCard title="Trap 3: Cross Product order direction">
            Order strictly determines direction: <code>a⃗ &times; b⃗ = −(b⃗ &times; a⃗)</code>. Swapping factors flips normal vector sign orientation.
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
            "Unit vector: â = a⃗ / |a⃗|",
            "Distance: AB = |b⃗ - a⃗|",
            "Direction cosines constraint: l² + m² + n² = 1",
            "Direction cosines sine identity: sin²α + sin²β + sin²γ = 2",
            "Internal Section: r⃗ = (mb⃗ + na⃗)/(m+n)",
            "Dot product check for orthogonality: a⃗ * b⃗ = 0",
            "Cross product check for collinearity: a⃗ * b⃗ = 0",
            "Scalar Projection: (a⃗ * b⃗) / |b⃗|",
            "Vector Projection: ((a⃗ * b⃗) / |b⃗|²) b⃗",
            "Determinant method for cross product: det([î,ĵ,k̂; a; b])",
            "Parallelepiped volume: [a⃗ b⃗ c⃗] = a⃗ * (b⃗ &times; c⃗)",
            "Coplanarity check: [a⃗ b⃗ c⃗] = 0",
            "Vector Triple Product: a⃗ &times; (b⃗ &times; c⃗) = (a⃗·c⃗)b⃗ - (a⃗·b⃗)c⃗ (BAC-CAB)",
            "Lagrange Identity: |a⃗ &times; b⃗|² + (a⃗ * b⃗)² = |a⃗|²|b⃗|²",
            "Triangle Area = 1/2 |AB⃗ &times; AC⃗|"
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
