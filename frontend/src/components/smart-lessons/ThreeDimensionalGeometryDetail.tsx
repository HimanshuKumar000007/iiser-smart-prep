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

// ─── SVG 1: DIRECTION ANGLES ─────────────────────────────────────────────────
function DirectionAnglesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Direction Angles (&alpha;, &beta;, &gamma;) with coordinate axes</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 125 }}>
        {/* Axes */}
        <line x1="170" y1="120" x2="280" y2="120" stroke="#475569" strokeWidth="1" />
        <text x="285" y="123" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Y</text>

        <line x1="170" y1="120" x2="170" y2="20" stroke="#475569" strokeWidth="1" />
        <text x="167" y="15" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Z</text>

        <line x1="170" y1="120" x2="100" y2="70" stroke="#475569" strokeWidth="1" />
        <text x="90" y="73" fill="#cbd5e1" fontSize="8" fontFamily="monospace">X</text>

        {/* Vector OP */}
        <line x1="170" y1="120" x2="230" y2="50" stroke="#22d3ee" strokeWidth="1.8" />
        <circle cx="230" cy="50" r="3" fill="#eab308" />
        <text x="238" y="48" fill="#cbd5e1" fontSize="8" fontFamily="monospace">P(x,y,z)</text>

        {/* Angle curves */}
        {/* alpha with X */}
        <path d="M 152 107 Q 165 95 185 85" fill="none" stroke="#eab308" strokeWidth="1" />
        <text x="156" y="93" fill="#eab308" fontSize="7" fontFamily="monospace">&alpha;</text>

        {/* beta with Y */}
        <path d="M 210 120 Q 210 100 205 93" fill="none" stroke="#34d399" strokeWidth="1" />
        <text x="214" y="110" fill="#34d399" fontSize="7" fontFamily="monospace">&beta;</text>

        {/* gamma with Z */}
        <path d="M 170 80 Q 185 80 195 88" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="180" y="73" fill="#a78bfa" fontSize="7" fontFamily="monospace">&gamma;</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: SKEW LINES vs PARALLEL LINES ──────────────────────────────────────
function SkewLinesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Skew Lines in 3D space: Never intersect and never parallel</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 115 }}>
        {/* Line 1 (Lower Plane) */}
        <line x1="40" y1="100" x2="280" y2="70" stroke="#22d3ee" strokeWidth="1.5" />
        <text x="200" y="93" fill="#22d3ee" fontSize="8" fontFamily="monospace">L₁: r = a₁ + &lambda;b₁</text>

        {/* Line 2 (Upper Plane, skewed cross) */}
        <line x1="60" y1="20" x2="220" y2="110" stroke="#a78bfa" strokeWidth="1.5" />
        <text x="75" y="38" fill="#a78bfa" fontSize="8" fontFamily="monospace">L₂: r = a₂ + &mu;b₂</text>

        {/* Shortest Distance common perpendicular */}
        <line x1="140" y1="65" x2="165" y2="83" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="140" cy="65" r="2" fill="#f43f5e" />
        <circle cx="165" cy="83" r="2" fill="#f43f5e" />
        <text x="160" y="60" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" fontWeight="bold">Shortest Distance (d)</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: LINE INTERSECTING PLANE ──────────────────────────────────────────
function LinePlaneSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Line intersecting plane and Normal Vector alignment</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 115 }}>
        {/* Plane (represented as parallelogram) */}
        <polygon points="50,80 270,80 300,110 80,110" fill="none" stroke="#34d399" strokeWidth="1.2" />
        <text x="240" y="103" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Plane: Ax+By+Cz+D=0</text>

        {/* Normal Vector n */}
        <line x1="175" y1="95" x2="175" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 175 30 L 172 36 L 178 36 Z" fill="#cbd5e1" />
        <text x="182" y="38" fill="#cbd5e1" fontSize="8" fontFamily="monospace">Normal n = (A,B,C)</text>

        {/* Line intersecting */}
        <line x1="100" y1="120" x2="230" y2="40" stroke="#a78bfa" strokeWidth="1.8" />
        <circle cx="175" cy="95" r="3" fill="#eab308" />
        <text x="210" y="63" fill="#a78bfa" fontSize="8" fontFamily="monospace">Line (dir b)</text>

        {/* Angle notation */}
        <path d="M 195 83 Q 190 73 175 80" fill="none" stroke="#eab308" strokeWidth="1" />
        <text x="187" y="78" fill="#eab308" fontSize="7" fontFamily="monospace">&theta;</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ThreeDimensionalGeometryDetail({ progress, isCompleted, onNavigate }: Props) {
  // Skew Lines Distance Calculator State
  const [a1x, setA1x] = useState<string>('1');
  const [a1y, setA1y] = useState<string>('2');
  const [a1z, setA1z] = useState<string>('3');
  const [a2x, setA2x] = useState<string>('2');
  const [a2y, setA2y] = useState<string>('4');
  const [a2z, setA2z] = useState<string>('5');
  const [b1x, setB1x] = useState<string>('1');
  const [b1y, setB1y] = useState<string>('-1');
  const [b1z, setB1z] = useState<string>('1');
  const [b2x, setB2x] = useState<string>('2');
  const [b2y, setB2y] = useState<string>('1');
  const [b2z, setB2z] = useState<string>('2');

  const p1x = parseFloat(a1x) || 0;
  const p1y = parseFloat(a1y) || 0;
  const p1z = parseFloat(a1z) || 0;
  const p2x = parseFloat(a2x) || 0;
  const p2y = parseFloat(a2y) || 0;
  const p2z = parseFloat(a2z) || 0;

  const d1x = parseFloat(b1x) || 0;
  const d1y = parseFloat(b1y) || 0;
  const d1z = parseFloat(b1z) || 0;
  const d2x = parseFloat(b2x) || 0;
  const d2y = parseFloat(b2y) || 0;
  const d2z = parseFloat(b2z) || 0;

  // b1 x b2 cross product
  const cx = d1y * d2z - d1z * d2y;
  const cy = d1z * d2x - d1x * d2z;
  const cz = d1x * d2y - d1y * d2x;
  const magCross = Math.sqrt(cx * cx + cy * cy + cz * cz);

  // (a2 - a1) dot (b1 x b2)
  const dotProd = (p2x - p1x) * cx + (p2y - p1y) * cy + (p2z - p1z) * cz;
  const shortestDist = magCross > 0 ? Math.abs(dotProd) / magCross : 0;

  // Foot/Image Calculator State
  const [ptX, setPtX] = useState<string>('1');
  const [ptY, setPtY] = useState<string>('2');
  const [ptZ, setPtZ] = useState<string>('3');
  const [planeA, setPlaneA] = useState<string>('2');
  const [planeB, setPlaneB] = useState<string>('-1');
  const [planeC, setPlaneC] = useState<string>('1');
  const [planeD, setPlaneD] = useState<string>('3');

  const px = parseFloat(ptX) || 0;
  const py = parseFloat(ptY) || 0;
  const pz = parseFloat(ptZ) || 0;
  const pa = parseFloat(planeA) || 0;
  const pb = parseFloat(planeB) || 0;
  const pc = parseFloat(planeC) || 0;
  const pd = parseFloat(planeD) || 0;

  const sumSq = pa * pa + pb * pb + pc * pc;
  const planeEval = pa * px + pb * py + pc * pz + pd;

  // Foot coordinates
  const footX = sumSq > 0 ? px - (pa * planeEval) / sumSq : 0;
  const footY = sumSq > 0 ? py - (pb * planeEval) / sumSq : 0;
  const footZ = sumSq > 0 ? pz - (pc * planeEval) / sumSq : 0;

  // Image coordinates
  const imgX = sumSq > 0 ? px - (2 * pa * planeEval) / sumSq : 0;
  const imgY = sumSq > 0 ? py - (2 * pb * planeEval) / sumSq : 0;
  const imgZ = sumSq > 0 ? pz - (2 * pc * planeEval) / sumSq : 0;

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
              <span className="text-[10px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Three-Dimensional Geometry
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10">Vectors Algebra</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 font-bold">Dot &amp; Cross Products</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★☆' },
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

      {/* PART 0: COORDINATE AXES, PLANES & OCTANTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 0</span>
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Coordinate Axes, Planes &amp; Octants</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The three mutually perpendicular axes (X, Y, Z) divide the 3D space into 8 regions called octants, and form three primary coordinate planes.
        </p>

        {/* Planes & equations */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-center">
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider block">XY-Plane</span>
            <code className="text-white font-mono text-[13px]">z = 0</code>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-center">
            <span className="text-[10px] font-black text-violet-400 uppercase tracking-wider block">YZ-Plane</span>
            <code className="text-white font-mono text-[13px]">x = 0</code>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-center">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">ZX-Plane</span>
            <code className="text-white font-mono text-[13px]">y = 0</code>
          </div>
        </div>

        {/* Octant Sign Rules Reference */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 The Eight Coordinate Octants Sign Matrix</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Octant</th>
                  <th>I</th>
                  <th>II</th>
                  <th>III</th>
                  <th>IV</th>
                  <th>V</th>
                  <th>VI</th>
                  <th>VII</th>
                  <th>VIII</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Sign (x, y, z)</td>
                  <td>(+, +, +)</td>
                  <td>(−, +, +)</td>
                  <td>(−, −, +)</td>
                  <td>(+, −, +)</td>
                  <td>(+, +, −)</td>
                  <td>(−, +, −)</td>
                  <td>(−, −, −)</td>
                  <td>(+, −, −)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 1: COORDINATE BASICS, DCS & DRS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">3D Coordinates, DCs &amp; DRs</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          3D geometry adds a depth z-axis. Directions are formalized through Direction Angles, Direction Cosines (l, m, n) and Direction Ratios (a, b, c).
        </p>
        <DirectionAnglesSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="l² + m² + n² = 1"
            use="Direction Cosine Identity"
            note="Also translates to cos²&alpha; + cos²&beta; + cos²&gamma; = 1. Valid only for normalized cosines."
            priority={5}
          />
          <FormulaCard
            formula="d = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²)"
            use="Distance between two 3D points"
            note="Straight-line distance between P₁(x₁,y₁,z₁) and P₂(x₂,y₂,z₂)."
            priority={5}
          />
          <FormulaCard
            formula="l = ±a / √(a² + b² + c²)"
            use="DR to DC translation"
            note="Similarly evaluates m and n. DRs are simple scaled multipliers of DCs."
            priority={5}
          />
        </div>

        {/* Section formula */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Section Formula &amp; Direction Vectors</strong>
          <p>&bull; <strong>Section Coordinate (3D):</strong> <code>((mx₂ &plusmn; nx₁)/(m&plusmn;n), (my₂ &plusmn; ny₁)/(m&plusmn;n), (mz₂ &plusmn; nz₁)/(m&plusmn;n))</code>.</p>
          <p>&bull; <strong>Direction Vector between Points:</strong> Vector <code>AB = (x₂ − x₁)i + (y₂ − y₁)j + (z₂ − z₁)k</code>. The coefficients are exactly the Direction Ratios (DRs) of the line joining them.</p>
        </div>
      </div>

      {/* PART 2: EQUATIONS OF LINES IN 3D */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Equations of Lines in 3D</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A line in space is determined by a point it passes through and the direction it runs parallel to.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="r = a + &lambda;b"
            use="Vector Equation of a Line"
            note="a is the position vector of the point, b is the parallel direction vector."
            priority={5}
          />
          <FormulaCard
            formula="(x − x₁)/a = (y − y₁)/b = (z − z₁)/c = &lambda;"
            use="Cartesian Equation of a Line"
            note="a, b, c represent the DRs of the line. The parameters of x, y, z must be exactly +1."
            priority={5}
          />
        </div>

        {/* Special cases */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 General Point &amp; Symmetric Special Cases</strong>
          <p>&bull; <strong>General Point on Line:</strong> Written as <code>(a&lambda; + x₁, b&lambda; + y₁, c&lambda; + z₁)</code>. This is the main tool used for intersection problems.</p>
          <p>&bull; <strong>Zero Denominator case:</strong> If any DR is zero, say <code>c = 0</code>, rewrite the line as <code>(x−x₁)/a = (y−y₁)/b, z = z₁</code>. This line lies in a plane parallel to the xy-plane.</p>
        </div>
      </div>

      {/* PART 3: EQUATIONS OF PLANES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Equations of Planes</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          A plane is defined by a point it passes through and the normal vector perpendicular to its flat surface.
        </p>
        <LinePlaneSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="Ax + By + Cz + D = 0"
            use="General Equation of a Plane"
            note="Coefficients (A, B, C) are the Direction Ratios (DRs) of the plane's normal vector."
            priority={5}
          />
          <FormulaCard
            formula="r⃗ &middot; n̂ = p"
            use="Vector Equation &amp; Normal Form"
            note="n̂ is the unit normal vector, p is the perpendicular distance from the origin. If non-unit normal vector n⃗ is used: r⃗ &middot; n⃗ = d."
            priority={5}
          />
          <FormulaCard
            formula="lx + my + nz = p"
            use="Cartesian Normal Form"
            note="l, m, n are Direction Cosines (DCs) of the normal vector, p is the perpendicular distance from the origin."
            priority={5}
          />
          <FormulaCard
            formula="det([x-x₁ y-y₁ z-z₁; x₂-x₁ y₂-y₁ z₂-z₁; x₃-x₁ y₃-y₁ z₃-z₁]) = 0"
            use="Plane passing through 3 points"
            note="Points must be non-collinear. Eliminates the normal variable directly."
            priority={5}
          />
        </div>

        {/* Family of planes */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Family of Planes &amp; Intersections</strong>
          <p>&bull; <strong>Plane Family:</strong> Pass through intersection line of planes P₁=0 and P₂=0: <code>P₁ + &lambda;P₂ = 0</code>.</p>
          <p>&bull; <strong>Normal direction:</strong> For plane equation <code>r &middot; n = d</code>, <code>d</code> is the perpendicular distance from the origin **only** if <code>n</code> is scaled as a unit normal vector (<code>n̂</code>).</p>
        </div>
      </div>

      {/* PART 4: ANGLES & DISTANCES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Angles &amp; Shortest Distances</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Shortest distance represents the perpendicular distance between space lines (skew or parallel) or planes.
        </p>
        <SkewLinesSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="d = |(a₂−a₁)&middot;(b₁&times;b₂)| / |b₁&times;b₂|"
            use="Shortest Distance between Skew Lines"
            note="Lines are skew. If shortest distance d = 0, the lines are coplanar."
            priority={5}
          />
          <FormulaCard
            formula="d = |(a₂−a₁)&times;b| / |b|"
            use="Shortest Distance between Parallel Lines"
            note="Valid when direction vectors are parallel (b₁ = b₂ = b)."
            priority={5}
          />
          <FormulaCard
            formula="d = |Ax₁ + By₁ + Cz₁ + D| / &radic;(A²+B²+C²)"
            use="Distance from Point to Plane"
            note="Perpendicular distance from point P(x₁, y₁, z₁) to plane Ax+By+Cz+D=0."
            priority={5}
          />
          <FormulaCard
            formula="d = |D₁ − D₂| / &radic;(A²+B²+C²)"
            use="Distance between Parallel Planes"
            note="Planes must share identical normals (Ax+By+Cz+D₁=0 and Ax+By+Cz+D₂=0)."
            priority={5}
          />
        </div>

        {/* Angle formulas */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-3 text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Angle Formulas Summary</strong>
            <p>&bull; <strong>Between two Lines:</strong> <code>cos&theta; = (b₁ &middot; b₂) / (|b₁||b₂|)</code>.</p>
            <p>&bull; <strong>Between two Planes:</strong> <code>cos&theta; = (n₁ &middot; n₂) / (|n₁||n₂|)</code>.</p>
            <p>&bull; <strong>Between Line &amp; Plane:</strong> <code className="text-cyan-400">sin&theta; = (b &middot; n) / (|b||n|)</code> (Uses sine because angle is 90° − &theta;).</p>
          </div>
        </div>
      </div>

      {/* PART 5: FOOT OF PERPENDICULAR & IMAGE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Foot of Perpendicular &amp; Image</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Finding the orthogonal projection (foot) or the mirror reflection (image) of a point across a plane is a classic IAT calculation.
        </p>

        {/* Separated Foot and Image Formula Boxes */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-3">
            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider block">🏢 Foot of Perpendicular Coordinate</span>
 <div className="text-white/70 text-xs leading-relaxed">
              For point (x₁, y₁, z₁) and plane Ax + By + Cz + D = 0, the foot (x<sub>f</sub>, y<sub>f</sub>, z<sub>f</sub>) satisfies:
 <div className="mt-3 p-3 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center flex-wrap gap-1 text-[13px] text-cyan-300">
                <MathFraction num={<>x_f − x₁</>} den="A" />
                <span className="text-white/60">=</span>
                <MathFraction num={<>y_f − y₁</>} den="B" />
                <span className="text-white/60">=</span>
                <MathFraction num={<>z_f − z₁</>} den="C" />
                <span className="text-white/60">=</span>
 <span className="text-white font-bold">−</span>
                <MathFraction num="Ax₁ + By₁ + Cz₁ + D" den="A² + B² + C²" />
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-violet-500/5 border border-violet-500/15 space-y-3">
            <span className="text-[11px] font-black text-violet-400 uppercase tracking-wider block">🪞 Image of a Point Coordinate</span>
 <div className="text-white/70 text-xs leading-relaxed">
              The reflection image (x<sub>i</sub>, y<sub>i</sub>, z<sub>i</sub>) across the plane satisfies:
 <div className="mt-3 p-3 bg-black/30 rounded-xl border border-white/5 flex items-center justify-center flex-wrap gap-1 text-[13px] text-violet-300">
                <MathFraction num={<>x_i − x₁</>} den="A" />
                <span className="text-white/60">=</span>
                <MathFraction num={<>y_i − y₁</>} den="B" />
                <span className="text-white/60">=</span>
                <MathFraction num={<>z_i − z₁</>} den="C" />
                <span className="text-white/60">=</span>
 <span className="text-white font-bold">−2</span>
                <MathFraction num="Ax₁ + By₁ + Cz₁ + D" den="A² + B² + C²" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 6: COPLANARITY OF TWO LINES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 6</span>
          <h2 className="text-white font-display font-bold text-[17px]">Coplanarity of Two Lines</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Two lines are coplanar if they lie in the exact same plane. Geometrically, the volume of the parallelepiped formed by their direction and distance vectors is zero.
        </p>

        {/* Determinant Coplanarity condition */}
 <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Determinant Coplanarity Condition</strong>
          <p>Two lines (x−x₁)/a₁ = (y−y₁)/b₁ = (z−z₁)/c₁ and (x−x₂)/a₂ = (y−y₂)/b₂ = (z−z₂)/c₂ are coplanar if and only if:</p>
          <div className="p-4 rounded-xl bg-[#080913] border border-white/5 text-center text-cyan-400">
            det([ x₂−x₁ y₂−y₁ z₂−z₁ ; a₁ b₁ c₁ ; a₂ b₂ c₂ ]) = 0
          </div>
          <p>&bull; Note: If the determinant equals 0, the shortest distance between these skew lines is exactly zero (intersecting or parallel).</p>
        </div>
      </div>

      {/* SUMMARY TABLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 7</span>
          <h2 className="text-white font-display font-bold text-[17px]">Reference Comparisons &amp; Conditions</h2>
        </div>

        {/* Parallel and Perpendicular Conditions Table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
 <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 3D Objects Parallel &amp; Perpendicular Conditions</span>
          <div className="overflow-x-auto">
 <table className="w-full text-[11px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Object Pair</th>
                  <th>Parallel Condition</th>
                  <th>Perpendicular Condition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-cyan-400 font-bold">Line - Line</td>
                  <td>DRs proportional: a₁/a₂ = b₁/b₂ = c₁/c₂</td>
                  <td>a₁a₂ + b₁b₂ + c₁c₂ = 0</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-violet-400 font-bold">Plane - Plane</td>
                  <td>Normals proportional: A₁/A₂ = B₁/B₂ = C₁/C₂</td>
                  <td>A₁A₂ + B₁B₂ + C₁C₂ = 0</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2 text-emerald-400 font-bold">Line - Plane</td>
                  <td>Line direction perp to normal: aA + bB + cC = 0</td>
                  <td>Line direction parallel to normal: a/A = b/B = c/C</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 8: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">3D Coordinate &amp; Foot Solver</h2>
        </div>

        {/* 3D Foot/Image Calculator */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Point projection &amp; Image Calculator</span>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Point x₁:</label>
 <input type="number" value={ptX} onChange={e => setPtX(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Point y₁:</label>
 <input type="number" value={ptY} onChange={e => setPtY(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Point z₁:</label>
 <input type="number" value={ptZ} onChange={e => setPtZ(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Plane A:</label>
 <input type="number" value={planeA} onChange={e => setPlaneA(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Plane B:</label>
 <input type="number" value={planeB} onChange={e => setPlaneB(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Plane C:</label>
 <input type="number" value={planeC} onChange={e => setPlaneC(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs text-center outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-0.5">Plane D:</label>
 <input type="number" value={planeD} onChange={e => setPlaneD(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs text-center outline-none" />
            </div>
          </div>
 <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1.5">
            <p>&bull; Foot of Perpendicular = <span className="text-cyan-400 font-bold">({footX.toFixed(3)}, {footY.toFixed(3)}, {footZ.toFixed(3)})</span></p>
            <p>&bull; Mirror Reflection Image = <span className="text-violet-400 font-bold">({imgX.toFixed(3)}, {imgY.toFixed(3)}, {imgZ.toFixed(3)})</span></p>
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
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 1: Shortest distance between skew lines</span>
          <p className="text-white/80">Evaluate the shortest distance between lines r = (i+2j+3k) + &lambda;(i−j+k) and r = (2i+4j+5k) + &mu;(2i+j+2k).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Find (a₂ − a₁): <code>(2−1)i + (4−2)j + (5−3)k = i + 2j + 2k</code>.</p>
            <p>2. Evaluate (b₁ &times; b₂): <code>det([i j k; 1 -1 1; 2 1 2]) = −3i + 0j + 3k</code>.</p>
            <p>3. Distance projection: <code>d = |(i+2j+2k) &middot; (−3i+3k)| / &radic;(9+0+9) = |−3 + 6| / &radic;18 = 3 / (3&radic;2) = 1/&radic;2</code>.</p>
            <p className="text-cyan-300 font-bold">Shortest Distance = 1/&radic;2 units</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 2: Coplanarity intersection parameter</span>
          <p className="text-white/80">Determine if lines (x-1)/1 = (y-2)/-1 = (z-3)/1 and (x-2)/2 = (y-4)/1 = (z-5)/2 are coplanar.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify coordinates: x₂−x₁=1, y₂−y₁=2, z₂−z₁=2.</p>
            <p>2. Set up the determinant: <code>det([1 2 2; 1 -1 1; 2 1 2])</code>.</p>
            <p>3. Calculate value: <code>1(-2-1) - 2(2-2) + 2(1 - (-2)) = -3 - 0 + 6 = 3</code>.</p>
            <p className="text-rose-400 font-bold">Determinant = 3 &ne; 0. Lines are NOT coplanar (skew).</p>
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
            { cue: '"Find the image of point (x₁, y₁, z₁) in the plane"', think: "Use the image formula multiplier -2: (x_i-x₁)/A = ... = -2(Ax₁+By₁+Cz₁+D)/(A²+B²+C²)." },
            { cue: '"Angle between line and plane is &theta;"', think: "Must use the sine formula sin&theta; = (b&middot;n)/(|b||n|), not the cosine formula." },
            { cue: '"Find plane passing through intersections of P₁ and P₂"', think: "Matches the family of planes: P₁ + &lambda;P₂ = 0. Use the given point to solve for &lambda;." },
            { cue: '"Distance between two parallel planes"', think: "Scale equations so A, B, C coefficients match, then evaluate |D₁-D₂| / √(A²+B²+C²)." },
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
          <TrapCard title="Trap 1: Cartesian coordinate coefficients scaling">
            Always verify that the coefficients of x, y, and z are exactly +1 in the line equations. For example, for <code>(2x − 1)/3 = (y − 2)/4</code>, the DR is not 3, it is <code>3/2</code> after rewriting as <code>(x − 1/2) / (3/2)</code>.
          </TrapCard>
          <TrapCard title="Trap 2: Sine vs. Cosine for Line-Plane angle">
            Remember that the angle between a line and a plane uses <code>sin&theta;</code> because the angle is measured relative to the plane surface, which is complementary to the normal angle.
          </TrapCard>
          <TrapCard title="Trap 3: Foot of Perpendicular vs. Image of Point">
            Do not confuse the scalar multipliers. The foot of the perpendicular has a multiplier of <code>−1</code>, whereas the image has a multiplier of <code>−2</code>.
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
            "DCs identity: l² + m² + n² = 1",
            "Distance in 3D: d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)",
            "Section: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n), (mz₂+nz₁)/(m+n))",
            "DR between points: (x₂−x₁, y₂−y₁, z₂−z₁)",
            "Line Vector: r = a + λb",
            "Line Cartesian: (x−x₁)/a = (y−y₁)/b = (z−z₁)/c = λ",
            "Plane General form: Ax + By + Cz + D = 0",
            "Plane through 3 points determinant evaluation",
            "Family of Planes equation: P₁ + λP₂ = 0",
            "Line-Line angle: cosθ = (b₁·b₂)/(|b₁||b₂|)",
            "Plane-Plane angle: cosθ = (n₁·n₂)/(|n₁||n₂|)",
            "Line-Plane angle: sinθ = (b·n)/(|b||n|)",
            "Skew Lines shortest distance determinant formula",
            "Parallel Lines distance: d = |(a₂−a₁)×b| / |b|",
            "Point-to-plane distance: |Ax₁+By₁+Cz₁+D| / √(A²+B²+C²)",
            "Parallel planes distance: |D₁−D₂| / √(A²+B²+C²)",
            "Foot of Perpendicular: multiplier coefficient is −1",
            "Image of Point: multiplier coefficient is −2",
            "Coplanarity Condition: determinant = 0",
            "Symmetric form zero denominator indicates axis parallelism"
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
