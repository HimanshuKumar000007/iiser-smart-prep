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

function InsightCard({ title = "Key Concept", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">{title}</span>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

// ─── SVG 1: UNIT CIRCLE COORDINATES ───────────────────────────────────────────
function UnitCircleSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Unit Circle representations of (cos &theta;, sin &theta;)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 120 }}>
        {/* Circle */}
        <circle cx="170" cy="70" r="40" fill="none" stroke="#475569" strokeWidth="1.2" />
        
        {/* Axes */}
        <line x1="110" y1="70" x2="230" y2="70" stroke="#334155" strokeWidth="0.8" />
        <line x1="170" y1="20" x2="170" y2="120" stroke="#334155" strokeWidth="0.8" />

        {/* Vector Line */}
        <line x1="170" y1="70" x2="204.6" y2="50" stroke="#22d3ee" strokeWidth="1.8" />
        <circle cx="204.6" cy="50" r="3.5" fill="#eab308" />

        {/* Labels */}
        <text x="210" y="47" fill="#cbd5e1" fontSize="8" fontFamily="monospace" fontWeight="bold">P(cos&theta;, sin&theta;)</text>
        <text x="180" y="77" fill="#22d3ee" fontSize="7" fontFamily="monospace">R=1</text>

        {/* Angle */}
        <path d="M 185 70 A 15 15 0 0 0 183 62" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="190" y="66" fill="#a78bfa" fontSize="8.5" fontFamily="monospace">&theta;</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: ASTC QUADRANT MAP ──────────────────────────────────────────────────
function AstcMapSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — ASTC Quadrant sign Rules</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 110 }}>
        {/* Quadrant grid */}
        <line x1="80" y1="70" x2="260" y2="70" stroke="#475569" strokeWidth="1.2" />
        <line x1="170" y1="10" x2="170" y2="130" stroke="#475569" strokeWidth="1.2" />

        {/* Labels Q1 */}
        <text x="215" y="35" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Q1: ALL (+)</text>
        <text x="215" y="48" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">All trig ratios positive</text>

        {/* Labels Q2 */}
        <text x="125" y="35" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Q2: SIN (+)</text>
        <text x="125" y="48" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">sin/csc are positive</text>

        {/* Labels Q3 */}
        <text x="125" y="95" fill="#a78bfa" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Q3: TAN (+)</text>
        <text x="125" y="108" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">tan/cot are positive</text>

        {/* Labels Q4 */}
        <text x="215" y="95" fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Q4: COS (+)</text>
        <text x="215" y="108" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">cos/sec are positive</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: TRIGONOMETRIC WAVEFORMS ───────────────────────────────────────────
function TrigWavesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — sine (cyan) &amp; Cosine (violet) waves</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 100 }}>
        {/* Axes */}
        <line x1="20" y1="60" x2="320" y2="60" stroke="#475569" strokeWidth="1" />
        <line x1="60" y1="10" x2="60" y2="110" stroke="#475569" strokeWidth="1" />

        {/* Sine curve (cyan) */}
        <path d="M 60 60 Q 95 10 130 60 T 200 60 T 270 60" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        <text x="280" y="55" fill="#22d3ee" fontSize="8" fontFamily="monospace">sin x</text>

        {/* Cosine curve (violet) */}
        <path d="M 60 20 Q 95 60 130 100 T 200 20 T 270 100" fill="none" stroke="#a78bfa" strokeWidth="1.8" />
        <text x="280" y="105" fill="#a78bfa" fontSize="8" fontFamily="monospace">cos x</text>
      </svg>
    </div>
  );
}

// ─── SVG 8: TANGENT WAVE WITH ASYMPTOTES ──────────────────────────────────────
function TanWaveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Tangent Wave (tan x) with vertical asymptotes (period = &pi;)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 100 }}>
        {/* Axes */}
        <line x1="20" y1="60" x2="320" y2="60" stroke="#475569" strokeWidth="1" />
        <line x1="170" y1="10" x2="170" y2="110" stroke="#475569" strokeWidth="1" />

        {/* Asymptotes at x = 90 (pi/2) and x = 250 (-pi/2) */}
        <line x1="90" y1="10" x2="90" y2="110" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="250" y1="10" x2="250" y2="110" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Tan curves */}
        {/* Middle branch: passing through origin (170, 60) */}
        <path d="M 110 100 C 130 90 150 70 170 60 C 190 50 210 30 230 20" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        
        {/* Left branch */}
        <path d="M 30 90 C 45 80 55 70 65 60 C 75 50 82 35 85 20" fill="none" stroke="#22d3ee" strokeWidth="1.8" />

        {/* Right branch */}
        <path d="M 255 100 C 258 85 265 70 275 60 C 285 50 295 40 310 30" fill="none" stroke="#22d3ee" strokeWidth="1.8" />

        {/* Labels */}
        <text x="95" y="20" fill="#f43f5e" fontSize="7.5" fontFamily="monospace">x = −&pi;/2</text>
        <text x="205" y="20" fill="#f43f5e" fontSize="7.5" fontFamily="monospace">x = &pi;/2</text>
        <text x="210" y="55" fill="#22d3ee" fontSize="8" fontFamily="monospace">tan x</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: INVERSE TRIGONOMETRIC WAVEFORMS (ARCSIN) ──────────────────────────
function InverseWavesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — arcsin wave (cyan) principal branch limits [-&pi;/2, &pi;/2]</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 100 }}>
        {/* Axes */}
        <line x1="40" y1="60" x2="300" y2="60" stroke="#475569" strokeWidth="1" />
        <line x1="170" y1="10" x2="170" y2="110" stroke="#475569" strokeWidth="1" />

        {/* Arcsin path */}
        <path d="M 120 100 Q 150 75 170 60 T 220 20" fill="none" stroke="#22d3ee" strokeWidth="1.8" />

        {/* Horizontal boundary lines */}
        <line x1="40" y1="20" x2="300" y2="20" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="40" y1="100" x2="300" y2="100" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Labels */}
        <text x="180" y="24" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">y = &pi;/2</text>
        <text x="180" y="105" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace">y = −&pi;/2</text>
        <text x="225" y="32" fill="#22d3ee" fontSize="8" fontFamily="monospace">sin⁻¹x</text>
      </svg>
    </div>
  );
}

// ─── SVG 5: GENERAL SOLUTIONS ROUTER ──────────────────────────────────────────
function GeneralSolutionsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 6 — General solution routes for Trigonometric Equations</p>
      <svg viewBox="0 0 340 110" className="w-full" style={{ maxHeight: 95 }}>
        {/* sin path */}
        <rect x="20" y="15" width="80" height="24" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="60" y="29" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">sin&theta; = sin&alpha;</text>
        <text x="60" y="52" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">n&pi; + (−1)ⁿ&alpha;</text>

        {/* cos path */}
        <rect x="130" y="15" width="80" height="24" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="170" y="29" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">cos&theta; = cos&alpha;</text>
        <text x="170" y="52" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">2n&pi; &plusmn; &alpha;</text>

        {/* tan path */}
        <rect x="240" y="15" width="80" height="24" rx="4" fill="none" stroke="#34d399" strokeWidth="1" />
        <text x="280" y="29" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">tan&theta; = tan&alpha;</text>
        <text x="280" y="52" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">n&pi; + &alpha;</text>

        <text x="170" y="85" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Where n represents any integer (n &isin; &integers;)</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function TrigInverseDetail({ progress, isCompleted, onNavigate }: Props) {
  // Unit Circle Explorer State
  const [angleInput, setAngleInput] = useState<string>('30');
  const angle = parseFloat(angleInput) || 0;
  const rad = angle * (Math.PI / 180);

  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);
  const tanVal = Math.abs(cosVal) > 0.001 ? Math.tan(rad) : NaN;

  // Active quadrant determination
  const getQuadrant = (deg: number) => {
    const normalized = ((deg % 360) + 360) % 360;
    if (normalized >= 0 && normalized < 90) return 'Q1: ALL (+)';
    if (normalized >= 90 && normalized < 180) return 'Q2: SIN (+)';
    if (normalized >= 180 && normalized < 270) return 'Q3: TAN (+)';
    return 'Q4: COS (+)';
  };

  // ITF Triangle Solver State
  const [oppSide, setOppSide] = useState<string>('3');
  const [hypSide, setHypSide] = useState<string>('5');

  const opp = parseFloat(oppSide) || 3;
  const hyp = parseFloat(hypSide) || 5;

  const adj = hyp > opp ? Math.sqrt(hyp * hyp - opp * opp) : 0;
  const sinInverseVal = Math.asin(opp / hyp) * (180 / Math.PI);
  const tanInverseVal = adj > 0 ? Math.atan(opp / adj) * (180 / Math.PI) : 0;

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
              Trigonometry and Inverse Trigonometry
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Basic Geometry</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Algebraic substitution</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (3.2/5)' },
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

      {/* PART 1: TRIGONOMETRIC FUNCTIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Trigonometric Functions &amp; Unit Circle</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Trigonometric ratios extend from right triangles to any arbitrary angle rotating on a unit circle.
        </p>
        <UnitCircleSVG />
        <AstcMapSVG />
        <TrigWavesSVG />
        <TanWaveSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="sin²θ + cos²θ = 1  |  1 + tan²θ = sec²θ"
            use="Fundamental Trigonometric Identities"
            note="Also 1 + cot²θ = csc²θ. Essential for simplifying circular equations."
            priority={5}
          />
          <FormulaCard
            formula="l = rθ"
            use="Arc length calculation"
            note="θ must be strictly in radians. Connection: π radians = 180°."
            priority={5}
          />
        </div>

        {/* Double Angle, Compound & Factorization Formulas */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3.5 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Compound &amp; Double Angles</strong>
            <p>&bull; <strong>sin(A &plusmn; B):</strong> <code>sinAcosB &plusmn; cosAsinB</code>.</p>
            <p>&bull; <strong>cos(A &plusmn; B):</strong> <code>cosAcosB &mp; sinAsinB</code>.</p>
            <p>&bull; <strong>sin(2&theta;):</strong> <code>2sin&theta;cos&theta; = 2tan&theta; / (1 + tan&sup2;&theta;)</code>.</p>
            <p>&bull; <strong>cos(2&theta;):</strong> <code>cos&sup2;&theta; − sin&sup2;&theta; = 2cos&sup2;&theta; − 1 = 1 − 2sin&sup2;&theta;</code>.</p>
          </div>
          <div className="border-t border-white/5 pt-3">
            <strong className="text-white text-[13px] block mb-1">🔑 Sum-to-Product (Factorization)</strong>
            <p>&bull; <code>sinC + sinD = 2 sin((C+D)/2) cos((C-D)/2)</code></p>
            <p>&bull; <code>sinC − sinD = 2 cos((C+D)/2) sin((C-D)/2)</code></p>
            <p>&bull; <code>cosC + cosD = 2 cos((C+D)/2) cos((C-D)/2)</code></p>
            <p>&bull; <code>cosC − cosD = −2 sin((C+D)/2) sin((C-D)/2)</code></p>
          </div>
          <div className="border-t border-white/5 pt-3">
            <strong className="text-white text-[13px] block mb-1">🔑 Product-to-Sum (Defactorization)</strong>
            <p>&bull; <code>2 sinA cosB = sin(A+B) + sin(A-B)</code></p>
            <p>&bull; <code>2 cosA sinB = sin(A+B) − sin(A-B)</code></p>
            <p>&bull; <code>2 cosA cosB = cos(A+B) + cos(A-B)</code></p>
            <p>&bull; <code>2 sinA sinB = cos(A-B) − cos(A+B)</code></p>
          </div>
        </div>

        {/* Special Angles Table */}
        <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Special Angles Reference Values</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-center border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2 text-left">Angle &theta;</th>
                  <th>0&deg; (0)</th>
                  <th>30&deg; (&pi;/6)</th>
                  <th>45&deg; (&pi;/4)</th>
                  <th>60&deg; (&pi;/3)</th>
                  <th>90&deg; (&pi;/2)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-cyan-400 font-bold">sin&theta;</td>
                  <td>0</td>
                  <td>1/2</td>
                  <td>1/&radic;2</td>
                  <td>&radic;3/2</td>
                  <td>1</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-violet-400 font-bold">cos&theta;</td>
                  <td>1</td>
                  <td>&radic;3/2</td>
                  <td>1/&radic;2</td>
                  <td>1/2</td>
                  <td>0</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-emerald-400 font-bold">tan&theta;</td>
                  <td>0</td>
                  <td>1/&radic;3</td>
                  <td>1</td>
                  <td>&radic;3</td>
                  <td>&infin;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 2: GENERAL SOLUTIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">General Solutions to Equations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Due to trigonometric periodicity, algebraic trig equations have infinite solutions represented systematically.
        </p>
        <GeneralSolutionsSVG />
      </div>

      {/* PART 3: INVERSE TRIGONOMETRY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Inverse Trigonometric Functions (ITF)</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          To make inverse trigonometric mappings valid functions, domains must be restricted to their principal value branches.
        </p>
        <InverseWavesSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="sin⁻¹x + cos⁻¹x = π/2"
            use="Complementary Angle Identity"
            note="Valid strictly for input domain x ∈ [-1, 1]."
            priority={5}
          />
          <FormulaCard
            formula="tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]"
            use="Tan Addition Formula"
            note="Strictly valid when xy < 1. If xy > 1, add π (for x,y > 0) or subtract π (for x,y < 0)."
            priority={5}
          />
        </div>

        {/* Principal Value Branches Table */}
        <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 ITF Principal Value Domains &amp; Ranges</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-center border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2 text-left">Inverse Function</th>
                  <th>Domain (Inputs)</th>
                  <th>Principal Range (Outputs)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-cyan-400 font-bold">arcsin(x) / sin⁻¹x</td>
                  <td>[−1, 1]</td>
                  <td>[−&pi;/2, &pi;/2]</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-violet-400 font-bold">arccos(x) / cos⁻¹x</td>
                  <td>[−1, 1]</td>
                  <td>[0, &pi;]</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-left text-emerald-400 font-bold">arctan(x) / tan⁻¹x</td>
                  <td>&real;</td>
                  <td>(−&pi;/2, &pi;/2)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 4: INTERACTIVE UNIT CIRCLE EXPLORER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Unit Circle Quadrant Explorer</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Enter an angle in degrees to evaluate trigonometry ratios and active quadrant sign rules.
        </p>
        <div className="space-y-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Angle &theta; (in degrees):</label>
            <input
              type="number"
              value={angleInput} onChange={e => setAngleInput(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[13px] text-white/80">
            <p>&bull; Quadrant = <span className="text-cyan-400 font-bold">{getQuadrant(angle)}</span></p>
            <p>&bull; sin&theta; = <span className="text-violet-400 font-bold">{sinVal.toFixed(4)}</span></p>
            <p>&bull; cos&theta; = <span className="text-emerald-400 font-bold">{cosVal.toFixed(4)}</span></p>
            <p>&bull; tan&theta; = <span className="text-rose-400 font-bold">{isNaN(tanVal) ? 'undefined (asymptote)' : tanVal.toFixed(4)}</span></p>
          </div>
        </div>
      </div>

      {/* PART 5: INTERACTIVE TRIANGLE CONVERTER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">ITF Triangle Converter</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Enter opposite and hypotenuse lengths to compute the matching adjacent side and angles.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Opposite Side:</label>
            <input
              type="number"
              value={oppSide} onChange={e => setOppSide(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Hypotenuse:</label>
            <input
              type="number"
              value={hypSide} onChange={e => setHypSide(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
        </div>
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[13px] text-white/80">
          <p>&bull; Computed Adjacent Side = <span className="text-cyan-400 font-bold">{adj.toFixed(4)}</span></p>
          <p>&bull; Angle (sin⁻¹(Opp/Hyp)) = <span className="text-violet-400 font-bold">{sinInverseVal.toFixed(2)}&deg;</span></p>
          <p>&bull; Conversion: <code>sin⁻¹({opp}/{hyp}) &rArr; tan⁻¹({opp}/{adj.toFixed(2)})</code> = <span className="text-emerald-400 font-bold">{tanInverseVal.toFixed(2)}&deg;</span></p>
        </div>
      </div>

      {/* PART 6: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: principal value branch conversion</span>
          <p className="text-white/80">Evaluate the value of sin⁻¹(sin(5&pi;/6)).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Check if the angle <code>5&pi;/6</code> lies inside principal value branch of arcsin: <code>[−&pi;/2, &pi;/2]</code>.</p>
            <p>2. Since <code>5&pi;/6 ≈ 150&deg;</code> lies outside the range, we must reduce it.</p>
            <p>3. Use identity: <code>sin(5&pi;/6) = sin(&pi; − &pi;/6) = sin(&pi;/6)</code>.</p>
            <p>4. Since <code>&pi;/6</code> is within the principal range: <code>sin⁻¹(sin(&pi;/6)) = &pi;/6</code>.</p>
            <p className="text-cyan-300 font-bold">Principal Value = &pi;/6</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Quadratic Trigonometric equation</span>
          <p className="text-white/80">Solve the equation 2sin&sup2;x − 3sinx + 1 = 0 for x &isin; [0, 2&pi;].</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Factorize the quadratic equation: <code>(2sinx − 1)(sinx − 1) = 0</code>.</p>
            <p>2. Case 1: <code>sinx = 1/2 &rArr; x = &pi;/6, 5&pi;/6</code> inside the domain.</p>
            <p>3. Case 2: <code>sinx = 1 &rArr; x = &pi;/2</code> inside the domain.</p>
            <p className="text-cyan-300 font-bold">Solutions: x = &pi;/6, &pi;/2, 5&pi;/6</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Tan addition identity</span>
          <p className="text-white/80">Simplify tan⁻¹(1/2) + tan⁻¹(1/3).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Check product condition: <code>xy = (1/2)(1/3) = 1/6 &lt; 1</code>.</p>
            <p>2. Apply addition formula: <code>tan⁻¹[(1/2 + 1/3) / (1 − 1/6)] = tan⁻¹[(5/6) / (5/6)] = tan⁻¹(1)</code>.</p>
            <p>3. Since <code>tan⁻¹(1) = &pi;/4</code> inside the principal branch: <code>&pi;/4</code>.</p>
            <p className="text-cyan-300 font-bold">Simplified value = &pi;/4</p>
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
            { cue: '"Find the number of solutions of f(x) = g(x)"', think: "Graph both functions and count the number of coordinate intersections." },
            { cue: '"Evaluate sin(sin⁻¹x)"', think: "Directly output x, but double check that x lies inside the domain [−1, 1]." },
            { cue: '"Evaluate sin⁻¹(sin x)"', think: "Reduce angle x to the principal value branch [−&pi;/2, &pi;/2] before canceling." },
            { cue: '"Integrals/derivatives with radical terms √(a² - x²)"', think: "Use the trigonometric substitution x = a sin&theta; to simplify." },
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
          <TrapCard title="Trap 1: The ITF Principal Domain cancellation">
            Remember that <code>sin⁻¹(sin &theta;) &ne; &theta;</code> if the angle is outside the principal range <code>[−&pi;/2, &pi;/2]</code>. You must reduce the quadrant first.
          </TrapCard>
          <TrapCard title="Trap 2: Variable division root cancellation">
            Never divide both sides of a trigonometric equation by a variable expression (e.g. dividing <code>sin&theta; = sin2&theta;</code> by <code>sin&theta;</code>) as this cancels potential roots where the expression equals 0. Factor terms instead.
          </TrapCard>
          <TrapCard title="Trap 3: Tan addition domain restriction adjustment">
            The formula <code>tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1-xy)]</code> requires <code>xy &lt; 1</code>. If <code>xy &gt; 1</code> and both are positive, you must add <code>&pi;</code>: <code>&pi; + tan⁻¹[(x+y)/(1-xy)]</code>.
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
            "Angle measurement conversions: π rad = 180°",
            "Arc length equation: l = rθ (θ in radians)",
            "Fundamental Identity: sin²θ + cos²θ = 1",
            "Identities: 1 + tan²θ = sec²θ, 1 + cot²θ = csc²θ",
            "sin(2θ) = 2sinθcosθ = 2tanθ / (1 + tan²θ)",
            "cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ",
            "General Solution for sinθ = sinα is nπ + (-1)ⁿα",
            "General Solution for cosθ = cosα is 2nπ ± α",
            "General Solution for tanθ = tanα is nπ + α",
            "sin⁻¹x: Domain [−1, 1], Range [−π/2, π/2]",
            "cos⁻¹x: Domain [−1, 1], Range [0, π]",
            "tan⁻¹x: Domain ℝ, Range (−π/2, π/2)",
            "Complementary identity: sin⁻¹x + cos⁻¹x = π/2",
            "Substitution: x = a sinθ for √(a² - x²)",
            "Substitution: x = a tanθ for √(a² + x²)"
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
