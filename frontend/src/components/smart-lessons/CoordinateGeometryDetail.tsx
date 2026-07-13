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

// ─── SVG 1: CARTESIAN TRANSLATION (ORIGIN SHIFT) ─────────────────────────────
function OriginShiftSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Shifting of Origin to (h, k) without axis rotation</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 120 }}>
        {/* Original Axes (Gray) */}
        <line x1="20" y1="120" x2="200" y2="120" stroke="#475569" strokeWidth="1" />
        <line x1="40" y1="20" x2="40" y2="130" stroke="#475569" strokeWidth="1" />
        <text x="30" y="130" fill="#475569" fontSize="8" fontFamily="monospace">O(0,0)</text>

        {/* Shifted Axes (Cyan) */}
        <line x1="80" y1="80" x2="280" y2="80" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="100" y1="10" x2="100" y2="120" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="100" cy="80" r="3" fill="#22d3ee" />
        <text x="105" y="75" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">'(h,k)</text>

        {/* Point P */}
        <circle cx="180" cy="40" r="3.5" fill="#eab308" />
        <text x="188" y="38" fill="#cbd5e1" fontSize="8" fontFamily="monospace">P(x,y) / P'O(X,Y)</text>

        {/* Dimension labels */}
        <text x="140" y="93" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">X = x − h</text>
        <text x="190" y="60" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">Y = y − k</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: STRAIGHT LINE FORMS & PROJECTION ──────────────────────────────────
function LineFormsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Perpendicular distance of point from line Ax + By + C = 0</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 110 }}>
        {/* Grid lines */}
        <line x1="20" y1="110" x2="320" y2="110" stroke="#334155" strokeWidth="0.8" />
        <line x1="30" y1="10" x2="30" y2="120" stroke="#334155" strokeWidth="0.8" />

        {/* Line */}
        <line x1="50" y1="100" x2="280" y2="35" stroke="#a78bfa" strokeWidth="2" />
        <text x="220" y="45" fill="#a78bfa" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Ax + By + C = 0</text>

        {/* Point P */}
        <circle cx="120" cy="30" r="3" fill="#eab308" />
        <text x="110" y="22" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" fontWeight="bold">P(x₁,y₁)</text>

        {/* Perpendicular Line projection */}
        <line x1="120" y1="30" x2="173" y2="65" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
        <polyline points="167,61 163,56 168,52" fill="none" stroke="#f43f5e" strokeWidth="0.8" />
        <text x="155" y="47" fill="#f43f5e" fontSize="7.5" fontFamily="monospace">d = |Ax₁+By₁+C|/&radic;(A&sup2;+B&sup2;)</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: CONIC SECTIONS GALLERY ───────────────────────────────────────────
function ConicGallerySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Conic Sections Focus, Directrix, and Geometry Details</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Circle (e=0) */}
        <g transform="translate(0, 5)">
          <circle cx="45" cy="45" r="20" fill="none" stroke="#22d3ee" strokeWidth="1.2" />
          <circle cx="45" cy="45" r="1.5" fill="#22d3ee" />
          {/* Radius Vector */}
          <line x1="45" y1="45" x2="60" y2="31" stroke="#eab308" strokeWidth="1" />
          <text x="45" y="60" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">Center C</text>
          <text x="45" y="100" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Circle (e=0)</text>
        </g>

        {/* Ellipse (0 < e < 1) */}
        <g transform="translate(85, 5)">
          <ellipse cx="45" cy="45" rx="25" ry="16" fill="none" stroke="#34d399" strokeWidth="1.2" />
          {/* Foci */}
          <circle cx="33" cy="45" r="1.5" fill="#34d399" />
          <circle cx="57" cy="45" r="1.5" fill="#34d399" />
          <text x="33" y="55" fill="#cbd5e1" fontSize="5.5" fontFamily="monospace" textAnchor="middle">F₁</text>
          <text x="57" y="55" fill="#cbd5e1" fontSize="5.5" fontFamily="monospace" textAnchor="middle">F₂</text>
          <text x="45" y="100" fill="#34d399" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Ellipse (e&lt;1)</text>
        </g>

        {/* Parabola (e=1) */}
        <g transform="translate(170, 5)">
          {/* Focus and directrix */}
          <line x1="10" y1="15" x2="10" y2="75" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
          <path d="M 20 15 Q 50 45 20 75" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="32" cy="45" r="1.5" fill="#a78bfa" />
          <text x="32" y="55" fill="#cbd5e1" fontSize="6" fontFamily="monospace" textAnchor="middle">Focus F</text>
          <text x="5" y="47" fill="#cbd5e1" fontSize="5.5" fontFamily="monospace" transform="rotate(-90 5 47)">Directrix</text>
          <text x="30" y="100" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Parabola (e=1)</text>
        </g>

        {/* Hyperbola (e>1) */}
        <g transform="translate(255, 5)">
          <path d="M 12 20 Q 30 45 12 70 M 58 20 Q 40 45 58 70" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
          {/* Asymptotes crossing */}
          <line x1="10" y1="20" x2="60" y2="70" stroke="#475569" strokeWidth="0.8" strokeDasharray="1 2" />
          <line x1="10" y1="70" x2="60" y2="20" stroke="#475569" strokeWidth="0.8" strokeDasharray="1 2" />
          <circle cx="21" cy="45" r="1.5" fill="#f43f5e" />
          <circle cx="49" cy="45" r="1.5" fill="#f43f5e" />
          <text x="35" y="100" fill="#f43f5e" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Hyperbola (e&gt;1)</text>
        </g>
      </svg>
    </div>
  );
}

// ─── SVG 4: CIRCLE TANGENTS & RADICAL AXIS ────────────────────────────────────
function CircleTangentsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Radical Axis (S1 − S2 = 0) of two non-intersecting circles</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 100 }}>
        {/* Circle 1 */}
        <circle cx="80" cy="60" r="25" fill="none" stroke="#22d3ee" strokeWidth="1.2" />
        <circle cx="80" cy="60" r="1.5" fill="#22d3ee" />

        {/* Circle 2 */}
        <circle cx="220" cy="60" r="30" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
        <circle cx="220" cy="60" r="1.5" fill="#a78bfa" />

        {/* Radical Axis */}
        <line x1="150" y1="10" x2="150" y2="110" stroke="#34d399" strokeWidth="1.5" />
        <text x="142" y="30" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="end" transform="rotate(-90 142 30)">Radical Axis (S₁ − S₂ = 0)</text>

        {/* Distance connection line */}
        <line x1="80" y1="60" x2="220" y2="60" stroke="#475569" strokeWidth="0.8" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

// ─── SVG 5: PARAMETRIC SUMMARY FLOWCHART ──────────────────────────────────────
function ParametricFlowSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Standard Parametric Coordinates Flow</p>
      <svg viewBox="0 0 340 100" className="w-full" style={{ maxHeight: 85 }}>
        {/* Circle */}
        <rect x="10" y="15" width="70" height="30" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="45" y="27" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Circle</text>
        <text x="45" y="40" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">(r cos&theta;, r sin&theta;)</text>

        {/* Parabola */}
        <rect x="95" y="15" width="70" height="30" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="130" y="27" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Parabola</text>
        <text x="130" y="40" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">(at&sup2;, 2at)</text>

        {/* Ellipse */}
        <rect x="180" y="15" width="70" height="30" rx="4" fill="none" stroke="#34d399" strokeWidth="1" />
        <text x="215" y="27" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Ellipse</text>
        <text x="215" y="40" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">(a cos&theta;, b sin&theta;)</text>

        {/* Hyperbola */}
        <rect x="260" y="15" width="70" height="30" rx="4" fill="none" stroke="#f43f5e" strokeWidth="1" />
        <text x="295" y="27" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Hyperbola</text>
        <text x="295" y="40" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">(a sec&theta;, b tan&theta;)</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function CoordinateGeometryDetail({ progress, isCompleted, onNavigate }: Props) {
  // Conic parameter state
  const [eccInput, setEccInput] = useState<string>('0.8');
  const [paramInput, setParamInput] = useState<string>('45');

  const ecc = parseFloat(eccInput) || 0;
  const param = parseFloat(paramInput) || 0;
  const paramRad = param * (Math.PI / 180);

  const getConicType = (e: number) => {
    if (e === 0) return 'Circle';
    if (e > 0 && e < 1) return 'Ellipse';
    if (e === 1) return 'Parabola';
    return 'Hyperbola';
  };

  // Distance calculator state
  const [lineA, setLineA] = useState<string>('3');
  const [lineB, setLineB] = useState<string>('4');
  const [lineC, setLineC] = useState<string>('-5');
  const [ptX, setPtX] = useState<string>('1');
  const [ptY, setPtY] = useState<string>('2');

  const la = parseFloat(lineA) || 0;
  const lb = parseFloat(lineB) || 0;
  const lc = parseFloat(lineC) || 0;
  const px = parseFloat(ptX) || 0;
  const py = parseFloat(ptY) || 0;

  const denom = Math.sqrt(la * la + lb * lb);
  const dist = denom > 0 ? Math.abs(la * px + lb * py + lc) / denom : 0;

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
              <Tag color="cyan">Mathematics Unit 3</Tag>
              <Tag color="rose">IAT Core Framework</Tag>
              <Tag color="amber">High Yield</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Coordinate Geometry
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Basic Algebra</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10 font-bold">2D Graph plotting</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '3-4 / year' },
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

      {/* PART 1: CARTESIAN PLANE & ORIGIN SHIFT */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Cartesian Coordinates &amp; Origin Translation</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The rectangular coordinate system maps 2D planes. Translating origins shifts coordinates without changing axial rotations.
        </p>
        <OriginShiftSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="X = x − h  |  Y = y − k"
            use="Shifting of Origin to (h, k)"
            note="Maintains original axial orientation. Used to simplify quadratic conic equations."
            priority={5}
          />
          <FormulaCard
            formula="x = (mx₂ &plusmn; nx₁) / (m &plusmn; n)"
            use="Section Formula (Internal / External)"
            note="Midpoint formula corresponds to ratio 1:1, reducing to (x₁ + x₂) / 2."
            priority={5}
          />
          <FormulaCard
            formula="d = √((x₂ − x₁)² + (y₂ − y₁)²)"
            use="Distance between two points"
            note="Calculates straight-line Cartesian distance between P₁(x₁,y₁) and P₂(x₂,y₂)."
            priority={5}
          />
        </div>
      </div>

      {/* PART 1.5: SLOPE & VARIOUS FORMS OF AN EQUATION OF A LINE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1.5</span>
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Slope &amp; Various Forms of equations of a Line</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">'s angular inclination. Lines can be written in multiple standard forms depending on known intercepts or coordinates.
        </p>

        {/* Slope Definition & General Form */}
 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Slope Definition &amp; General Form Relation</strong>
          <p>&bull; <strong>Slope (m):</strong> <code>m = tan&theta; = (y₂ − y₁) / (x₂ − x₁)</code>, where &theta; is the angle of inclination with the positive x-axis.</p>
          <p>&bull; <strong>General Line Form:</strong> <code>Ax + By + C = 0</code>.
            <br />
            - Slope: <code>m = −A/B</code>.
            <br />
            - y-intercept: <code>c = −C/B</code>.
          </p>
        </div>

        {/* Forms of equations of a line table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Various Forms of equations of a Line</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Line Form Name</th>
                  <th>Equation / Structure</th>
                  <th>Parameters Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Slope-Intercept</td>
                  <td><code>y = mx + c</code></td>
                  <td>m = slope, c = y-intercept.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Point-Slope</td>
                  <td><code>y − y₁ = m(x − x₁)</code></td>
                  <td>m = slope, passes through point (x₁, y₁).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Two-Point Form</td>
                  <td><code>(y−y₁)/(x−x₁) = (y₂−y₁)/(x₂−x₁)</code></td>
                  <td>Line passing through points (x₁, y₁) and (x₂, y₂).</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Intercept Form</td>
                  <td><code>x/a + y/b = 1</code></td>
                  <td>a = x-intercept, b = y-intercept.</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">Normal Form</td>
                  <td><code>x cos&alpha; + y sin&alpha; = p</code></td>
                  <td>p = perp distance from origin (&ge;0), &alpha; = angle with positive x-axis.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 2: STRAIGHT LINES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Straight Lines Algebra</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A straight line is a degree-1 locus. Angle splits, parallel/perpendicular properties, and distance projections are resolved algebraically.
        </p>
        <LineFormsSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="d = |Ax₁ + By₁ + C| / √(A² + B²)"
            use="Perpendicular distance from Point"
            note="Gives shortest distance from point P(x₁, y₁) to line Ax + By + C = 0."
            priority={5}
          />
          <FormulaCard
            formula="d = |C₁ − C₂| / √(A² + B²)"
            use="Distance between Parallel Lines"
            note="Lines must share identical slope coefficients (Ax + By + C₁/C₂ = 0) before applying."
            priority={5}
          />
        </div>

        {/* Family of lines */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Family of Lines &amp; Pair of Lines</strong>
          <p>&bull; <strong>Intersection Family:</strong> Equation of any line passing through intersection of L₁ and L₂ is: <code>L₁ + &lambda;L₂ = 0</code>.</p>
          <p>&bull; <strong>Angle between Lines:</strong> <code>tan&theta; = |(m₁ − m₂) / (1 + m₁m₂)|</code>. Parallel if <code>m₁ = m₂</code>; perpendicular if <code>m₁m₂ = −1</code>.</p>
        </div>
      </div>

      {/* PART 3: CONIC SECTIONS FUNDAMENTALS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Conic Sections Classification</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Conic sections represent planar intersections, classified by eccentricity (e) and quadratic discriminants.
        </p>
        <ConicGallerySVG />

        {/* 2nd degree equation classification */}
 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 General Second Degree Equation Classification</strong>
          <p className="text-white/50 mb-2">Equation: <code>ax&sup2; + 2hxy + by&sup2; + 2gx + 2fy + c = 0</code>, with discriminant <code>&Delta; = abc + 2fgh − af&sup2; − bg&sup2; − ch&sup2;</code>.</p>
          <p>&bull; <strong>If &Delta; = 0 (Degenerate):</strong> Represents intersecting lines (h&sup2; &gt; ab), parallel lines (h&sup2; = ab), or a single point (h&sup2; &lt; ab).</p>
          <p>&bull; <strong>If &Delta; &ne; 0 (Non-degenerate):</strong>
            <br />
            - Parabola: <code>h&sup2; = ab</code>.
            <br />
            - Ellipse: <code>h&sup2; &lt; ab</code> (or Circle if a = b, h = 0).
            <br />
            - Hyperbola: <code>h&sup2; &gt; ab</code> (or Rectangular Hyperbola if a + b = 0).
          </p>
        </div>
      </div>

      {/* PART 4: CIRCLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Circles &amp; Power of a Point</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A circle is the locus of a point equidistant from a center center. Tangents, radical axes, and power products shape circle properties.
        </p>
        <CircleTangentsSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="xx₁ + yy₁ = r²"
            use="Tangent to Circle x² + y² = r²"
            note="Evaluated at the point (x₁, y₁) on the circle curve using T = 0."
            priority={5}
          />
          <FormulaCard
            formula="S₁ = S₂ = 0  &rArr;  S₁ − S₂ = 0"
            use="Radical Axis Equation"
            note="Locus of points from which tangent segments to both circles are equal. Perpendicular to center line."
            priority={5}
          />
        </div>

        {/* Power of point & chord of contact */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Power of a Point &amp; Common Tangents</strong>
          <p>&bull; <strong>Power of Point:</strong> For <code>S = x&sup2;+y&sup2;+2gx+2fy+c</code>, power at <code>P(x₁,y₁)</code> is <code>S₁</code>. Tangent length <code>T = &radic;S₁</code>. Chord of contact is <code>T = 0</code>.</p>
          <p>&bull; <strong>Family of Circles:</strong> <code>S + &lambda;S'
          The slope represents a line = 0</code> (intersection of two circles) or <code>S + &lambda;L = 0</code> (circle and line intersection).</p>
        </div>

        {/* Common tangents table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Number of Common Tangents between Two Circles</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Distance vs. Radii Condition</th>
                  <th>Number of Tangents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">d &gt; r₁ + r₂ (Separate)</td>
                  <td>4 (2 direct, 2 transverse)</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">d = r₁ + r₂ (Touch externally)</td>
                  <td>3</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">|r₁ − r₂| &lt; d &lt; r₁ + r₂ (Intersect)</td>
                  <td>2</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">d = |r₁ − r₂| (Touch internally)</td>
                  <td>1</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-amber-400 font-bold">d &lt; |r₁ − r₂| (One inside another)</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 5: PARABOLA, ELLIPSE & HYPERBOLA */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Parabola, Ellipse &amp; Hyperbola</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Conic properties are evaluated through eccentricity relationships, parametric curves, and asymptotes.
        </p>
        <ParametricFlowSVG />

        {/* Tangent & Normals */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Parabola Tangent &amp; Normal (y² = 4ax)</strong>
            <p>&bull; Tangent at <code>t</code>: <code>ty = x + at&sup2;</code>.</p>
            <p>&bull; Normal at <code>t</code>: <code>y = −tx + 2at + at&sup3;</code>.</p>
          </div>
          <div className="border-t border-white/5 pt-3">
            <strong className="text-white text-[13px] block mb-1">🔑 Ellipse &amp; Hyperbola Parametric coordinate Forms</strong>
            <p>&bull; <strong>Ellipse (x²/a² + y²/b² = 1):</strong> Parametric coordinates: <code>(a cos&theta;, b sin&theta;)</code>.</p>
            <p>&bull; <strong>Hyperbola (x²/a² − y²/b² = 1):</strong> Parametric coordinates: <code>(a sec&theta;, b tan&theta;)</code>.</p>
            <p>&bull; <strong>Rectangular Hyperbola (xy = c²):</strong> Parametric coordinates: <code>(ct, c/t)</code>, asymptotes are <code>x = 0, y = 0</code>.</p>
          </div>
        </div>

        {/* Summary Table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Standard Conic Sections Comparison Reference</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[12px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Conic</th>
                  <th>Eccentricity (e)</th>
                  <th>Foci</th>
                  <th>Directrix</th>
                  <th>Latus Rectum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Parabola</td>
                  <td>e = 1</td>
                  <td>(a, 0)</td>
                  <td>x = −a</td>
                  <td>4a</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Ellipse</td>
                  <td>e = &radic;(1 − b&sup2;/a&sup2;) &lt; 1</td>
                  <td>(&plusmn;ae, 0)</td>
                  <td>x = &plusmn;a/e</td>
                  <td>2b&sup2;/a</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-rose-400 font-bold">Hyperbola</td>
                  <td>e = &radic;(1 + b&sup2;/a&sup2;) &gt; 1</td>
                  <td>(&plusmn;ae, 0)</td>
                  <td>x = &plusmn;a/e</td>
                  <td>2b&sup2;/a</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 6: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Conic &amp; Distance Explorer</h2>
        </div>

        {/* Point to Line Distance solver */}
        <div className="space-y-3">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">Point-to-Line Distance Calculator</span>
          <div className="grid grid-cols-5 gap-2">
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Line A:</label>
 <input type="number" value={lineA} onChange={e => setLineA(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Line B:</label>
 <input type="number" value={lineB} onChange={e => setLineB(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Line C:</label>
 <input type="number" value={lineC} onChange={e => setLineC(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Point x₁:</label>
 <input type="number" value={ptX} onChange={e => setPtX(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Point y₁:</label>
 <input type="number" value={ptY} onChange={e => setPtY(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[13px] text-center outline-none" />
            </div>
          </div>
 <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/70">
            Perpendicular Distance = <span className="text-cyan-400 font-bold">{dist.toFixed(4)}</span>
          </div>
        </div>

        {/* Conic Parameter evaluation */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">Eccentricity &amp; Parametric point Evaluator</span>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Eccentricity (e):</label>
 <input type="number" value={eccInput} onChange={e => setEccInput(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[13px] outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Angle / Parameter &theta; (deg):</label>
 <input type="number" value={paramInput} onChange={e => setParamInput(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-[13px] outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[13px] text-white/80">
            <p>&bull; Classified Conic = <span className="text-cyan-400 font-bold">{getConicType(ecc)}</span></p>
            <p>&bull; Parametric Point (r=2, a=2, b=1.5, t={ecc}):
              <br />
              - Circle: <code>(2cos&theta;, 2sin&theta;)</code> &rArr; <span className="text-violet-400 font-bold">({(2 * Math.cos(paramRad)).toFixed(2)}, {(2 * Math.sin(paramRad)).toFixed(2)})</span>
              <br />
              - Parabola (t={ecc}): <code>(at&sup2;, 2at)</code> &rArr; <span className="text-emerald-400 font-bold">({(2 * ecc * ecc).toFixed(2)}, {(4 * ecc).toFixed(2)})</span>
            </p>
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
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Circle Center &amp; Radius</span>
          <p className="text-white/80">Find the center and radius of x&sup2; + y&sup2; − 4x + 6y − 12 = 0.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Compare with general circle form: <code>2g = −4 &rArr; g = −2</code> and <code>2f = 6 &rArr; f = 3</code>, with <code>c = −12</code>.</p>
            <p>2. Center coordinate: <code>(−g, −f) = (2, −3)</code>.</p>
            <p>3. Radius formula: <code>R = &radic;(g&sup2; + f&sup2; − c) = &radic;(4 + 9 − (−12)) = &radic;25 = 5</code>.</p>
            <p className="text-cyan-300 font-bold">Center = (2, −3), Radius = 5 units</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Parallel Lines separation</span>
          <p className="text-white/80">Find the distance between parallel lines 3x + 4y − 5 = 0 and 3x + 4y + 10 = 0.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Check coefficients: A=3, B=4, C₁=−5, C₂=10.</p>
            <p>2. Apply distance formula: <code>d = |C₁ − C₂| / &radic;(A&sup2;+B&sup2;) = |−5 − 10| / &radic;(9+16) = 15/5 = 3</code>.</p>
            <p className="text-cyan-300 font-bold">Distance = 3 units</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Ellipse Eccentricity &amp; Focus</span>
          <p className="text-white/80">Evaluate the eccentricity and foci of ellipse x&sup2;/25 + y&sup2;/16 = 1.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify major/minor values: a&sup2;=25 &rArr; a=5, b&sup2;=16 &rArr; b=4 (a &gt; b).</p>
            <p>2. Eccentricity relation: <code>b&sup2; = a&sup2;(1 − e&sup2;) &rArr; 16 = 25(1 − e&sup2;) &rArr; e&sup2; = 9/25 &rArr; e = 3/5 = 0.6</code>.</p>
            <p>3. Foci coordinates: <code>(&plusmn;ae, 0) = (&plusmn;5 &middot; 3/5, 0) = (&plusmn;3, 0)</code>.</p>
            <p className="text-cyan-300 font-bold">Eccentricity = 0.6, Foci = (&plusmn;3, 0)</p>
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
            { cue: '"Find the equation of tangent to curve at (x₁, y₁)"', think: "Apply the T = 0 shortcut directly: swap x² → xx₁ and linear terms." },
            { cue: '"Find locus of intersection of perpendicular tangents"', think: "Matches the Director Circle equation (Circle: x²+y²=2r², Ellipse: x²+y²=a²+b²)." },
            { cue: '"Evaluate number of tangents between two circles"', think: "Compute distance between centers d and compare to r₁ &plusmn; r₂." },
            { cue: '"Distance between parallel lines"', think: "Ensure coefficients are normalized to matching A and B before running |C₁−C₂|/√(A²+B²)." },
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
          <TrapCard title="Trap 1: The Ellipse vs. Hyperbola Eccentricity Sign">
            Do not confuse the sign inside the eccentricity equations. For Ellipse (e &lt; 1): <code>b&sup2; = a&sup2;(1 − e&sup2;)</code>. For Hyperbola (e &gt; 1): <code>b&sup2; = a&sup2;(e&sup2; − 1)</code>. Swapping them yields imaginary values.
          </TrapCard>
          <TrapCard title="Trap 2: Parallel line distance coefficient scaling">
            To solve the distance between <code>3x + 4y + 5 = 0</code> and <code>6x + 8y − 12 = 0</code>, you must scale the second line to match coordinates first (divide by 2: <code>3x + 4y − 6 = 0</code>) before running the formula.
          </TrapCard>
          <TrapCard title="Trap 3: Hyperbola Director Circle boundaries">
            The director circle of hyperbola <code>x&sup2;/a&sup2; − y&sup2;/b&sup2; = 1</code> is <code>x&sup2; + y&sup2; = a&sup2; − b&sup2;</code>. This circle exists as a real locus only if <code>a &gt; b</code>. If <code>a &lt; b</code>, no perpendicular tangents can intersect.
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
            "Distance: d = √((x₂-x₁)² + (y₂-y₁)²)",
            "Midpoint coordinate: ((x₁+x₂)/2, (y₁+y₂)/2)",
            "Internal Section: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))",
            "Shifting of Origin translation: X = x - h, Y = y - k",
            "Point-to-line projection: d = |Ax₁+By₁+C| / √(A²+B²)",
            "Parallel line projection: d = |C₁−C₂| / √(A²+B²)",
            "Family of Lines through intersections: L₁ + λL₂ = 0",
            "General Conics: h² = ab (parabola), h² < ab (ellipse), h² > ab (hyperbola)",
            "Standard Circle: (x−h)² + (y−k)² = r²",
            "General Circle radius: R = √(g²+f²−c)",
            "Radical Axis equation: S₁ − S₂ = 0",
            "Power of a Point: S₁ (tangent length = √S₁)",
            "Parabola parametric point: (at², 2at) with y²=4ax",
            "Parabola Tangent at t: ty = x + at²",
            "Parabola Normal at t: y = −tx + 2at + at³",
            "Ellipse parametric point: (a cosθ, b sinθ)",
            "Hyperbola parametric point: (a secθ, b tanθ)",
            "Rectangular Hyperbola parametric point: (ct, c/t) with xy=c²",
            "Tangent at point: T = 0 shortcut replaces quadratic terms",
            "Director Circle: locus of perpendicular tangent intersections"
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
