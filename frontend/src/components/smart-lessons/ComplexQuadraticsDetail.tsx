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
      <div className="text-white/65 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

// ─── SVG 1: ARGAND PLANE DIAGRAM ──────────────────────────────────────────────
function ArgandPlaneSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Argand plane Representation of Complex Number z = a + ib</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 120 }}>
        <line x1="20" y1="110" x2="280" y2="110" stroke="#475569" strokeWidth="1" />
        <polygon points="280,110 275,107 275,113" fill="#475569" />
        <text x="290" y="113" fill="#64748b" fontSize="8" fontFamily="monospace">Real</text>

        <line x1="60" y1="130" x2="60" y2="20" stroke="#475569" strokeWidth="1" />
        <polygon points="60,20 57,25 63,25" fill="#475569" />
        <text x="60" y="12" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Imaginary</text>

        <line x1="60" y1="110" x2="200" y2="50" stroke="#22d3ee" strokeWidth="2" />
        <circle cx="200" cy="50" r="4.5" fill="#eab308" />
        
        <line x1="200" y1="50" x2="200" y2="110" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="200" y1="50" x2="60" y2="50" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />

        <text x="210" y="47" fill="#eab308" fontSize="8.5" fontFamily="monospace" fontWeight="bold">P(a, b) = z</text>
        <text x="130" y="73" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle">r = |z|</text>
        <text x="200" y="118" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">a</text>
        <text x="50" y="54" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="end">b</text>

        <path d="M 85 110 A 25 25 0 0 0 81 101" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="92" y="104" fill="#a78bfa" fontSize="8.5" fontFamily="monospace">&theta;</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: POLAR FORM TRIANGLE ────────────────────────────────────────────────
function PolarFormSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Polar Form components (r cos &theta;, r sin &theta;)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <line x1="80" y1="90" x2="240" y2="90" stroke="#475569" strokeWidth="1.5" />
        <line x1="240" y1="90" x2="240" y2="25" stroke="#475569" strokeWidth="1.5" />
        <line x1="80" y1="90" x2="240" y2="25" stroke="#22d3ee" strokeWidth="2" />

        <text x="150" y="50" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle">r</text>
        <text x="160" y="102" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">a = r cos &theta;</text>
        <text x="248" y="62" fill="#cbd5e1" fontSize="8" fontFamily="monospace">b = r sin &theta;</text>
        
        <path d="M 105 90 A 25 25 0 0 0 98 81" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="110" y="85" fill="#a78bfa" fontSize="8.5" fontFamily="monospace">&theta;</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: ROOT NATURE FLOWCHART ─────────────────────────────────────────────
function RootNatureFlowchartSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — nature of Roots of Quadratic ax² + bx + c = 0</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 100 }}>
        <rect x="125" y="10" width="90" height="22" rx="4" fill="none" stroke="#475569" strokeWidth="1" />
        <text x="170" y="24" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">D = b² − 4ac</text>

        <path d="M 170 32 L 170 50 M 170 32 L 60 50 M 170 32 L 280 50" stroke="#64748b" strokeWidth="1" />

        <rect x="20" y="55" width="80" height="24" rx="4" fill="#34d399" fillOpacity="0.1" stroke="#34d399" strokeWidth="1" />
        <text x="60" y="69" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D &gt; 0</text>
        <text x="60" y="90" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Real &amp; Distinct</text>

        <rect x="130" y="55" width="80" height="24" rx="4" fill="#eab308" fillOpacity="0.1" stroke="#eab308" strokeWidth="1" />
        <text x="170" y="69" fill="#eab308" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D = 0</text>
        <text x="170" y="90" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Real &amp; Equal</text>

        <rect x="240" y="55" width="80" height="24" rx="4" fill="#f43f5e" fillOpacity="0.1" stroke="#f43f5e" strokeWidth="1" />
        <text x="280" y="69" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">D &lt; 0</text>
        <text x="280" y="90" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">Complex Conjugate</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: PARABOLA GRAPH ───────────────────────────────────────────────────
function ParabolaSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Parabolic Graphs of Quadratic Functions</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Upward Parabola */}
        <g transform="translate(20, 10)">
          <line x1="10" y1="80" x2="130" y2="80" stroke="#334155" strokeWidth="0.8" />
          <line x1="70" y1="95" x2="70" y2="10" stroke="#334155" strokeWidth="0.8" />
          <path d="M 30 20 Q 70 95 110 20" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
          <circle cx="70" cy="57.5" r="3" fill="#eab308" />
          <text x="70" y="70" fill="#eab308" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Vertex (-b/2a, -D/4a)</text>
          <text x="70" y="92" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">a &gt; 0 (Opens Up)</text>
        </g>

        {/* Downward Parabola */}
        <g transform="translate(180, 10)">
          <line x1="10" y1="80" x2="130" y2="80" stroke="#334155" strokeWidth="0.8" />
          <line x1="70" y1="95" x2="70" y2="10" stroke="#334155" strokeWidth="0.8" />
          <path d="M 30 85 Q 70 10 110 85" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
          <circle cx="70" cy="47.5" r="3" fill="#eab308" />
          <text x="70" y="38" fill="#eab308" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Vertex (-b/2a, -D/4a)</text>
          <text x="70" y="92" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">a &lt; 0 (Opens Down)</text>
        </g>
      </svg>
    </div>
  );
}

// ─── SVG 5: GRAPHICAL REPRESENTATION OF LINEAR INEQUALITIES ────────────────────
function LinearInequalitiesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Graphical representation on Real Number Line (Linear Inequalities)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Case 1: x > 2 */}
        <text x="15" y="25" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Case 1: x &gt; 2</text>
        <line x1="15" y1="40" x2="220" y2="40" stroke="#475569" strokeWidth="1" />
        <line x1="100" y1="40" x2="220" y2="40" stroke="#22d3ee" strokeWidth="2.5" />
        <polygon points="220,40 212,36 212,44" fill="#22d3ee" />
        <circle cx="100" cy="40" r="4.5" fill="#05060F" stroke="#22d3ee" strokeWidth="2.2" />
        <text x="100" y="52" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">2</text>
        <text x="235" y="43" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">x &isin; (2, &infin;)</text>

        {/* Case 2: x ≤ 3 */}
        <text x="15" y="75" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Case 2: x &le; 3</text>
        <line x1="15" y1="90" x2="220" y2="90" stroke="#475569" strokeWidth="1" />
        <line x1="15" y1="90" x2="140" y2="90" stroke="#34d399" strokeWidth="2.5" />
        <polygon points="15,90 23,86 23,94" fill="#34d399" />
        <circle cx="140" cy="90" r="4.5" fill="#34d399" />
        <text x="140" y="102" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">3</text>
        <text x="235" y="93" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace">x &isin; (−&infin;, 3]</text>
      </svg>
    </div>
  );
}

// ─── SVG 6: INTERVAL NOTATION GRAPHIC ─────────────────────────────────────────
function IntervalNotationSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 6 — Interval notations: Open vs. Closed circles</p>
      <svg viewBox="0 0 340 110" className="w-full" style={{ maxHeight: 100 }}>
        <line x1="40" y1="35" x2="200" y2="35" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="80" y1="35" x2="160" y2="35" stroke="#22d3ee" strokeWidth="3" />
        <circle cx="80" cy="35" r="4.5" fill="#05060F" stroke="#22d3ee" strokeWidth="2" />
        <circle cx="160" cy="35" r="4.5" fill="#05060F" stroke="#22d3ee" strokeWidth="2" />
        <text x="260" y="38" fill="#22d3ee" fontSize="9" fontFamily="monospace">Open (a, b)</text>

        <line x1="40" y1="75" x2="200" y2="75" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="80" y1="75" x2="160" y2="75" stroke="#34d399" strokeWidth="3" />
        <circle cx="80" cy="75" r="4.5" fill="#34d399" />
        <circle cx="160" cy="75" r="4.5" fill="#34d399" />
        <text x="260" y="78" fill="#34d399" fontSize="9" fontFamily="monospace">Closed [a, b]</text>
      </svg>
    </div>
  );
}

// ─── SVG 7: 2D LINEAR INEQUALITY REGION SHADING ──────────────────────────────
function GraphicalInequalitySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 7 — Shading a Linear Inequality in 2D Plane: 2x + 3y &le; 6</p>
      <svg viewBox="0 0 340 135" className="w-full" style={{ maxHeight: 120 }}>
        {/* Shaded Feasible Region */}
        <polygon points="40,110 40,80 180,110" fill="#22d3ee" fillOpacity="0.15" />
        
        {/* XY axes */}
        <line x1="40" y1="110" x2="260" y2="110" stroke="#475569" strokeWidth="1" />
        <polygon points="260,110 255,107 255,113" fill="#475569" />
        <text x="270" y="113" fill="#64748b" fontSize="8" fontFamily="monospace">x</text>

        <line x1="40" y1="120" x2="40" y2="20" stroke="#475569" strokeWidth="1" />
        <polygon points="40,20 37,25 43,25" fill="#475569" />
        <text x="40" y="12" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">y</text>

        {/* Boundary line */}
        <line x1="40" y1="80" x2="180" y2="110" stroke="#a78bfa" strokeWidth="1.8" />
        
        {/* Labels */}
        <text x="110" y="86" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" transform="rotate(12 110 86)">2x + 3y = 6</text>
        <text x="50" y="103" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" fontWeight="bold">Shaded Half-Plane (Feasible)</text>
        
        <circle cx="40" cy="80" r="3" fill="#eab308" />
        <text x="32" y="83" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="end">(0, 2)</text>
        
        <circle cx="180" cy="110" r="3" fill="#eab308" />
        <text x="180" y="120" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">(3, 0)</text>
      </svg>
    </div>
  );
}

// ─── SVG 8: WAVY CURVE SIGN CHART (BEYOND SYLLABUS) ──────────────────────────
function WavyCurveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 8 — Wavy Curve (Method of Intervals) for (x-1)(x-3) &le; 0</p>
      <svg viewBox="0 0 340 100" className="w-full" style={{ maxHeight: 90 }}>
        <line x1="20" y1="50" x2="320" y2="50" stroke="#cbd5e1" strokeWidth="1.5" />
        <polygon points="320,50 315,47 315,53" fill="#cbd5e1" />
        <polygon points="20,50 25,47 25,53" fill="#cbd5e1" />

        <circle cx="110" cy="50" r="4.5" fill="#f43f5e" />
        <text x="110" y="65" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">1</text>

        <circle cx="230" cy="50" r="4.5" fill="#f43f5e" />
        <text x="230" y="65" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" textAnchor="middle">3</text>

        <path d="M 230 50 Q 275 15 305 15" fill="none" stroke="#22d3ee" strokeWidth="2" />
        <text x="270" y="32" fill="#22d3ee" fontSize="12" fontFamily="monospace" fontWeight="bold">+</text>

        <path d="M 110 50 Q 170 85 230 50" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <text x="170" y="77" fill="#a78bfa" fontSize="12" fontFamily="monospace" fontWeight="bold">−</text>

        <path d="M 35 15 Q 65 15 110 50" fill="none" stroke="#22d3ee" strokeWidth="2" />
        <text x="70" y="32" fill="#22d3ee" fontSize="12" fontFamily="monospace" fontWeight="bold">+</text>
      </svg>
    </div>
  );
}

// ─── SVG 9: CUBE ROOTS OF UNITY (BEYOND SYLLABUS) ───────────────────────────
function CubeRootsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 9 — Cube Roots of Unity on Argand Plane circle (120&deg; splits)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        <circle cx="170" cy="70" r="40" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
        
        <line x1="100" y1="70" x2="240" y2="70" stroke="#334155" strokeWidth="0.8" />
        <line x1="170" y1="20" x2="170" y2="120" stroke="#334155" strokeWidth="0.8" />

        <circle cx="210" cy="70" r="4.5" fill="#eab308" />
        <text x="220" y="73" fill="#cbd5e1" fontSize="9" fontFamily="monospace" fontWeight="bold">1</text>

        <circle cx="150" cy="35.4" r="4.5" fill="#22d3ee" />
        <text x="145" y="27" fill="#cbd5e1" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">&omega;</text>

        <circle cx="150" cy="104.6" r="4.5" fill="#a78bfa" />
        <text x="145" y="117" fill="#cbd5e1" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="end">&omega;&sup2;</text>

        <line x1="170" y1="70" x2="210" y2="70" stroke="#eab308" strokeWidth="1.2" />
        <line x1="170" y1="70" x2="150" y2="35.4" stroke="#22d3ee" strokeWidth="1.2" />
        <line x1="170" y1="70" x2="150" y2="104.6" stroke="#a78bfa" strokeWidth="1.2" />

        <text x="185" y="50" fill="#a78bfa" fontSize="7.5" fontFamily="monospace">120&deg;</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ComplexQuadraticsDetail({ progress, isCompleted, onNavigate }: Props) {
  // Calculator States
  const [realA, setRealA] = useState<string>('3');
  const [imagB, setImagB] = useState<string>('4');

  const a = parseFloat(realA) || 0;
  const b = parseFloat(imagB) || 0;
  const mod = Math.sqrt(a * a + b * b);
  const argDeg = Math.atan2(b, a) * (180 / Math.PI);
  const argRad = Math.atan2(b, a);

  // Quadratic solver States
  const [quadA, setQuadA] = useState<string>('1');
  const [quadB, setQuadB] = useState<string>('-5');
  const [quadC, setQuadC] = useState<string>('6');

  const qa = parseFloat(quadA) || 1;
  const qb = parseFloat(quadB) || 0;
  const qc = parseFloat(quadC) || 0;

  const D = qb * qb - 4 * qa * qc;
  const sumRoots = -qb / qa;
  const prodRoots = qc / qa;

  // Roots solver calculation
  const getRootsOutput = () => {
    if (D > 0) {
      const r1 = (-qb + Math.sqrt(D)) / (2 * qa);
      const r2 = (-qb - Math.sqrt(D)) / (2 * qa);
      return `Real & Distinct: x = ${r1.toFixed(3)} and x = ${r2.toFixed(3)}`;
    } else if (D === 0) {
      const r = -qb / (2 * qa);
      return `Real & Equal: x = ${r.toFixed(3)}`;
    } else {
      const realPart = -qb / (2 * qa);
      const imagPart = Math.sqrt(-D) / (2 * qa);
      return `Complex Conjugate: x = ${realPart.toFixed(3)} ± ${imagPart.toFixed(3)}i`;
    }
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
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">📐</span>
              <Tag color="cyan">Mathematics Unit 2</Tag>
              <Tag color="rose">IAT Foundation</Tag>
              <Tag color="amber">Core Syllabus</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Complex Numbers, Quadratic Equations and Linear Inequalities
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Real Algebra</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Geometry Coordinates</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '40 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (3.5/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] uppercase font-bold text-white/35 block mb-1">{label}</span>
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

      {/* PART 0: MOTIVATION & BASICS OF COMPLEX NUMBERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 0</span>
          <h2 className="text-white font-display font-bold text-[17px]">Motivation &amp; Foundations of Complex Numbers</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Real numbers are not closed under the square root operation: equations like <code>x² + 1 = 0</code> have no real solutions because no real number squares to a negative. To resolve this, we define the imaginary unit <code>i = &radic;−1</code>.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Powers of i */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">1. Powers of i (Imaginary Unit Cycling)</h3>
            <p className="text-white/70 text-[11.5px] leading-relaxed">
              Powers of <code>i</code> cycle repeatedly through four values: <code>i, −1, −i, 1</code>.
            </p>
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left border-collapse text-[10px] text-white/50">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-1 font-bold">Power</th>
                    <th className="pb-1 font-bold">Value</th>
                    <th className="pb-1 font-bold">Power Reduction Rule</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-1">i¹</td><td className="py-1">i</td>
                    <td className="py-1" rowSpan={4}>
                      For any integer <code>k</code>, divide the exponent by 4:
                      <br />
                      <code>i^k = i^(k mod 4)</code>
                      <br />
                      <span className="text-[9px] text-cyan-400">E.g., i⁹⁹ = i³ = −i</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-1">i²</td><td className="py-1">−1</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-1">i³</td><td className="py-1">−i</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-1">i⁴</td><td className="py-1">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Equality & Subtraction */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 flex flex-col justify-between">
            <div>
              <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">2. Equality &amp; Subtraction</h3>
              <div className="space-y-2 text-[11.5px] text-white/70 leading-relaxed">
                <p>
                  <strong>Representation:</strong> A complex number <code>z</code> can be represented as an ordered pair <code>(a, b)</code> belonging to the Cartesian product <code>ℝ × ℝ</code>, commonly written in algebraic form as:
                  <br />
                  <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-bold">z = a + ib</code>
                </p>
                <p>
                  <strong>Equality:</strong> Two complex numbers are equal iff their real parts match AND their imaginary parts match:
                  <br />
                  <code>a + ib = c + id &rArr; a = c and b = d</code>.
                </p>
                <p>
                  <strong>Subtraction:</strong> Algebraically subtract real parts and imaginary parts separately:
                  <br />
                  <code>(a + ib) − (c + id) = (a − c) + i(b − d)</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 1: COMPLEX NUMBERS & GEOMETRY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Complex Numbers &amp; Argand Geometry</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Every complex number maps to a 2D position vector in the Argand plane, enabling geometric interpretations of algebraic identities.
        </p>
        <ArgandPlaneSVG />
        <PolarFormSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="z = a + ib  |  z̅ = a − ib"
            use="Algebraic Form &amp; Conjugate"
            note="Conjugate is a mirror reflection across the Real axis. Identity: z · z̅ = |z|²."
            priority={5}
          />
          <FormulaCard
            formula="z = r(cos θ + i sin θ) = r e^{iθ}"
            use="Polar &amp; Euler representation"
            note="r is the modulus distance from origin. θ is the argument angle."
            priority={5}
          />
        </div>

        {/* Properties at a Glance */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Properties of Modulus, Conjugate &amp; Argument</h3>
          
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">Conjugate (z̅) Properties</span>
              <p>&bull; Double Conjugate: <code>z̅̅ = z</code></p>
              <p>&bull; Additive/Subtractive: <code>z₁ &plusmn; z₂̅ = z̅₁ &plusmn; z̅₂</code></p>
              <p>&bull; Multiplicative/Divisive: <code>z₁ · z₂̅ = z̅₁ · z̅₂</code> and <code>(z₁/z₂)̄ = z̅₁ / z̅₂</code></p>
              <p>&bull; Real / Imaginary checks: <code>z + z̅ = 2Re(z)</code> and <code>z − z̅ = 2iIm(z)</code></p>
              <p>&bull; Real Number: If <code>z</code> is purely real, <code>z̅ = z</code>. If purely imaginary, <code>z̅ = −z</code>.</p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">Modulus (|z|) Properties</span>
              <p>&bull; Non-negativity: <code>|z| &ge; 0</code>, with <code>|z| = 0 iff z = 0</code></p>
              <p>&bull; Multiplication/Division: <code>|z₁ · z₂| = |z₁| · |z₂|</code> and <code>|z₁ / z₂| = |z₁| / |z₂|</code></p>
              <p>&bull; Power preservation: <code>|zⁿ| = |z|ⁿ</code></p>
              <p>&bull; Conjugate Equality: <code>|z| = |z̅| = |−z|</code></p>
              <p>&bull; <strong>Triangle Inequalities:</strong>
                <br />
                &nbsp;&nbsp;- Upper Bound: <code>|z₁ + z₂| &le; |z₁| + |z₂|</code>
                <br />
                &nbsp;&nbsp;- Lower Bound: <code>||z₁| − |z₂|| &le; |z₁ − z₂|</code>
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">Argument (arg z) Properties</span>
              <p>&bull; Multiplication Rule: <code>arg(z₁ · z₂) = arg(z₁) + arg(z₂) + 2k&pi;</code></p>
              <p>&bull; Division Rule: <code>arg(z₁ / z₂) = arg(z₁) − arg(z₂) + 2k&pi;</code></p>
              <p>&bull; Conjugate Argument: <code>arg(z̅) = −arg(z)</code></p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">Fundamental Theorem of Algebra (FTOA)</span>
              <p className="leading-relaxed">
                <strong>Statement:</strong> Every polynomial equation of degree <code>n &ge; 1</code> with complex coefficients has at least one complex root.
                <br />
                <strong>Corollary (Factorization):</strong> Every polynomial of degree <code>n</code> can be factored into exactly <code>n</code> linear complex factors:
                <br />
                <code>P(x) = a_n(x − z₁)(x − z₂)...(x − z_n)</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: QUADRATIC EQUATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Quadratic Equations &amp; Root Relations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Quadratic equations are degree-2 polynomials. Their root behavior is governed by the discriminant, and their graphs are parabolas.
        </p>
        <RootNatureFlowchartSVG />
        <ParabolaSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="x = [−b &plusmn; &radic;(b² − 4ac)] / 2a"
            use="Quadratic Roots formula"
            note="Roots are symmetric. Discriminant D = b² − 4ac determines their nature."
            priority={5}
          />
          <FormulaCard
            formula="α + β = −b/a  |  αβ = c/a"
            use="Relations between roots and coefficients"
            note="Difference of roots: |α − β| = &radic;D / |a|."
            priority={5}
          />
        </div>

        {/* Quadratics Expansion Info */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Root Formation &amp; Symmetric Functions</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">1. Formation of Quadratic from Roots</span>
              <p>
                If <code>&alpha;</code> and <code>&beta;</code> are roots, we can form the original quadratic equation by setting:
                <code className="text-cyan-300 block font-mono bg-black/20 p-1 text-center my-1">x² − (&alpha; + &beta;)x + &alpha;&beta; = 0</code>
              </p>
              <p className="text-white/40 text-[10px]">E.g., if roots are 2 and 3, equation is <code>x² − 5x + 6 = 0</code>.</p>
            </div>
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">2. Symmetric Functions of Roots</span>
              <p>Expressing powers of roots in terms of sum and product coefficients:</p>
              <p>&bull; Squares sum: <code>&alpha;² + &beta;² = (&alpha; + &beta;)² − 2&alpha;&beta;</code></p>
              <p>&bull; Cubes sum: <code>&alpha;³ + &beta;³ = (&alpha; + &beta;)³ − 3&alpha;&beta;(&alpha; + &beta;)</code></p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 3: LINEAR INEQUALITIES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Linear Inequalities &amp; Boundary Representations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Inequalities describe ranges of real values. Linear inequalities can be solved algebraically using sign rules and plotted either on a 1D real number line or shaded in a 2D coordinate plane.
        </p>
        <LinearInequalitiesSVG />
        <IntervalNotationSVG />
        <GraphicalInequalitySVG />

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
            <h3 className="text-cyan-400 font-bold uppercase tracking-wider">1. Basic Inequality Manipulation Rules</h3>
            <div className="space-y-2 text-white/70">
              <p>&bull; <strong>Addition/Subtraction:</strong> Adding or subtracting the same number on both sides preserves inequality. If <code>x &gt; y</code>, then <code>x + c &gt; y + c</code>.</p>
              <p>&bull; <strong>Positive Multiplication:</strong> Multiplying/dividing both sides by a positive number preserves inequality.</p>
              <p>&bull; <strong>Negative Multiplication:</strong> Multiplying/dividing both sides by a negative number <strong>reverses/flips</strong> the inequality sign! E.g. if <code>−2x &gt; 6</code>, then <code>x &lt; −3</code>.</p>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs flex flex-col justify-between">
            <div>
              <h3 className="text-cyan-400 font-bold uppercase tracking-wider">2. Algebraic Solution &amp; Systems</h3>
              <p className="text-white/70 leading-relaxed mb-2">
                Solving linear inequalities in one variable follows standard algebraic isolating steps, keeping sign-reversal rules in mind.
              </p>
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl text-white/60">
                <strong>System of Inequalities:</strong> To solve a system of simultaneous inequalities, find the <strong>intersection</strong> (common range) of their individual solution intervals.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4: EXTRA CONCEPTS (BEYOND SYLLABUS) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-white/15 bg-white/5 text-white/65 text-[10px] font-bold">EXTRA</span>
          <h2 className="text-white font-display font-bold text-base">Concepts Beyond Syllabus (Supplemental)</h2>
        </div>
        <p className="text-white/50 text-xs leading-relaxed">
          The following topics are not officially part of the core IAT syllabus but are useful extensions for competitive maths.
        </p>
        <WavyCurveSVG />
        <CubeRootsSVG />

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
            <span className="text-cyan-400 font-bold block">1. Wavy Curve Method (Intervals)</span>
            <p className="text-white/60 leading-relaxed">
              Used to solve higher-degree polynomial and rational inequalities. Find critical roots, plot them on a line, and alternate sign waves. Denominator roots must have open boundary circles. Even power factors do not switch signs across roots.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
            <span className="text-cyan-400 font-bold block">2. Cube Roots of Unity (1, &omega;, &omega;&sup2;)</span>
            <p className="text-white/60 leading-relaxed">
              Roots of <code>x³ = 1</code>, spaced at 120&deg; intervals on the unit circle.
              <br />
              Identities: <code>1 + &omega; + &omega;&sup2; = 0</code> and <code>&omega;&sup3; = 1</code>.
            </p>
          </div>
        </div>
      </div>

      {/* PART 5: INTERACTIVE CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Modulus &amp; Polar Calculator</h2>
        </div>
        <p className="text-white/50 text-[13px]">
          Enter z = a + ib parameters to compute polar coordinates, modulus, and Euler representations.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Real Part (a):</label>
            <input
              type="number"
              value={realA} onChange={e => setRealA(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Imaginary Part (b):</label>
            <input
              type="number"
              value={imagB} onChange={e => setImagB(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[13px] text-white/80">
          <p>&bull; Modulus |z| = <span className="text-cyan-400 font-bold">{mod.toFixed(4)}</span></p>
          <p>&bull; Argument &theta; = <span className="text-violet-400 font-bold">{argDeg.toFixed(2)}&deg; ({argRad.toFixed(4)} rad)</span></p>
          <p>&bull; Euler Form = <span className="text-emerald-400 font-bold">{mod.toFixed(3)} e^({argRad.toFixed(3)}i)</span></p>
        </div>
      </div>

      {/* PART 6: INTERACTIVE QUADRATIC SOLVER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Quadratic Equation solver</h2>
        </div>
        <p className="text-white/50 text-[13px]">
          Enter coefficients a, b, and c to verify discriminant properties and roots.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">a:</label>
            <input
              type="number"
              value={quadA} onChange={e => setQuadA(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">b:</label>
            <input
              type="number"
              value={quadB} onChange={e => setQuadB(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">c:</label>
            <input
              type="number"
              value={quadC} onChange={e => setQuadC(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 space-y-1.5 text-[13px] text-white/80">
          <p>&bull; Discriminant D = <span className="text-cyan-400 font-bold">{D}</span></p>
          <p>&bull; Roots: <span className="text-rose-400 font-bold">{getRootsOutput()}</span></p>
          <p>&bull; Sum of roots (&alpha; + &beta;) = <span className="text-violet-400">{sumRoots.toFixed(3)}</span></p>
          <p>&bull; Product of roots (&alpha;&beta;) = <span className="text-emerald-400">{prodRoots.toFixed(3)}</span></p>
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
                <th className="p-3">Concept</th>
                <th className="p-3">Formula / Identity</th>
                <th className="p-3">Key Details / Restrictions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Complex Form</td>
                <td className="p-3 font-mono text-cyan-300">z = a + ib</td>
                <td className="p-3">Real part a, Imaginary part b</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Modulus</td>
                <td className="p-3 font-mono text-cyan-300">|z| = &radic;(a² + b²)</td>
                <td className="p-3">Always &ge; 0. distance from origin.</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Conjugate</td>
                <td className="p-3 font-mono text-cyan-300">z̅ = a − ib</td>
                <td className="p-3">Identity: z · z̅ = |z|²</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Triangle Inequality</td>
                <td className="p-3 font-mono text-cyan-300">|z₁ + z₂| &le; |z₁| + |z₂|</td>
                <td className="p-3">Equality holds when arg(z₁) = arg(z₂)</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Roots relation</td>
                <td className="p-3 font-mono text-cyan-300">&alpha; + &beta; = −b/a  |  &alpha;&beta; = c/a</td>
                <td className="p-3">Quadratic roots sum and product rules</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Equation formation</td>
                <td className="p-3 font-mono text-cyan-300">x² − Sx + P = 0</td>
                <td className="p-3">S = sum of roots, P = product of roots</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Quadratic graph</td>
                <td className="p-3 font-mono text-cyan-300">Vertex: (−b/2a, −D/4a)</td>
                <td className="p-3">Upward if a &gt; 0, Downward if a &lt; 0</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/[0.01]">
                <td className="p-3 font-bold text-white">Inequality rules</td>
                <td className="p-3 font-mono text-cyan-300">ax &lt; b &rArr; x &gt; b/a if a &lt; 0</td>
                <td className="p-3">Flip sign when multiplying by negative</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* PART 8: SOLVED EXAMPLES (8 TOTAL EXAMPLES) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
          <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Property-based Modulus/Conjugate Calculation</span>
          <p className="text-white/80 font-bold">If z = (1 + i) / (1 − i), find the modulus |z| and the conjugate z̅.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Simplify z by multiplying numerator and denominator by conjugate of denominator: <code>z = [(1 + i)(1 + i)] / [(1 − i)(1 + i)] = (1 + 2i + i²) / (1 − i²) = 2i / 2 = i</code>.</p>
            <p>2. Find modulus: <code>|z| = |i| = &radic;(0² + 1²) = 1</code>.</p>
            <p>3. Find conjugate: <code>z̅ = Re(z) − iIm(z) = 0 − 1i = −i</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: |z| = 1 and z̅ = −i</p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Equality of Complex Numbers</span>
          <p className="text-white/80 font-bold">Find the values of real numbers x and y if (x + 2) + i(y − 3) = 5 − 2i.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Equate the real parts: <code>x + 2 = 5 &rArr; x = 3</code>.</p>
            <p>2. Equate the imaginary parts: <code>y − 3 = −2 &rArr; y = 1</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: x = 3, y = 1</p>
          </div>
        </div>

        {/* Example 3 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Roots Relationship &amp; Symmetric Functions</span>
          <p className="text-white/80 font-bold">Let &alpha; and &beta; be the roots of the equation x² − 5x + 6 = 0. Compute the value of &alpha;³ + &beta;³.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify root relations: <code>&alpha; + &beta; = 5</code> and <code>&alpha;&beta; = 6</code>.</p>
            <p>2. Apply the symmetric cube sum formula: <code>&alpha;³ + &beta;³ = (&alpha; + &beta;)³ − 3&alpha;&beta;(&alpha; + &beta;)</code>.</p>
            <p>3. Calculate: <code>&alpha;³ + &beta;³ = (5)³ − 3(6)(5) = 125 − 90 = 35</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: &alpha;³ + &beta;³ = 35</p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 4: Quadratic Equation Formation</span>
          <p className="text-white/80 font-bold">Form the quadratic equation with real coefficients if one of its roots is 2 + &radic;3.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Since coefficients are real, irrational roots occur in conjugate pairs. Thus, the second root must be <code>2 − &radic;3</code>.</p>
            <p>2. Compute Sum of Roots (S): <code>(2 + &radic;3) + (2 − &radic;3) = 4</code>.</p>
            <p>3. Compute Product of Roots (P): <code>(2 + &radic;3)(2 − &radic;3) = 2² − (&radic;3)² = 4 − 3 = 1</code>.</p>
            <p>4. Construct equation: <code>x² − Sx + P = 0 &rArr; x² − 4x + 1 = 0</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: x² − 4x + 1 = 0</p>
          </div>
        </div>

        {/* Example 5 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 5: Linear Inequality algebraic solution</span>
          <p className="text-white/80 font-bold">Solve the linear inequality 3x − 5 &gt; 7 and show the solution interval.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Add 5 to both sides: <code>3x &gt; 12</code>.</p>
            <p>2. Divide both sides by positive number 3 (preserves sign): <code>x &gt; 4</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: x &inSample; (4, &infin;)</p>
          </div>
        </div>

        {/* Example 6 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 6: System of Linear Inequalities</span>
          <p className="text-white/80 font-bold">Find the solution set for the system of simultaneous linear inequalities: 2x − 1 &gt; 3 and 3x + 2 &le; 17.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Solve inequality 1: <code>2x − 1 &gt; 3 &rArr; 2x &gt; 4 &rArr; x &gt; 2</code>. Interval: <code>(2, &infin;)</code>.</p>
            <p>2. Solve inequality 2: <code>3x + 2 &le; 17 &rArr; 3x &le; 15 &rArr; x &le; 5</code>. Interval: <code>(−&infin;, 5]</code>.</p>
            <p>3. Find the overlapping range (intersection): <code>x &gt; 2</code> AND <code>x &le; 5</code>.</p>
            <p className="text-cyan-300 font-bold">Answer: x &isin; (2, 5]</p>
          </div>
        </div>

        {/* Example 7 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 7: Shading linear inequality in 2D coordinate plane</span>
          <p className="text-white/80 font-bold">Sketch the graphical feasible region of 2x + 3y &le; 6 in the XY plane.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. First plot boundary line <code>2x + 3y = 6</code> by finding intercepts: y-intercept at <code>(0, 2)</code>, x-intercept at <code>(3, 0)</code>.</p>
            <p>2. Test origin <code>(0,0)</code> in the inequality: <code>2(0) + 3(0) &le; 6 &rArr; 0 &le; 6</code> (True!).</p>
            <p>3. Shading region: Since (0,0) is true, shade the half-plane containing the origin (downward-left of boundary line).</p>
            <p className="text-cyan-300 font-bold">Answer: Shaded half-plane including origin below line 2x+3y=6.</p>
          </div>
        </div>

        {/* Example 8 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 8: (Beyond Syllabus) Cube roots of unity evaluation</span>
          <p className="text-white/80 font-bold">Evaluate the value of the algebraic expression (1 − &omega; + &omega;&sup2;)⁵.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Recall identity: <code>1 + &omega; + &omega;&sup2; = 0 &rArr; 1 + &omega;&sup2; = −&omega;</code>.</p>
            <p>2. Substitute: <code>(1 + &omega;&sup2; − &omega;)⁵ = (−&omega; − &omega;)⁵ = (−2&omega;)⁵</code>.</p>
            <p>3. Compute: <code>(−2)⁵ * &omega;⁵ = −32 * &omega;⁵ = −32 * &omega;²</code> (since <code>&omega;⁵ = &omega;²</code>).</p>
            <p className="text-cyan-300 font-bold">Answer: Result = −32&omega;&sup2;</p>
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
            { cue: '"Condition for quadratic to have real roots"', think: "Set Discriminant D = b² - 4ac >= 0." },
            { cue: '"Rotate complex number vector representation"', think: "Multiplication by i rotates 90° counter-clockwise. Multiplication by -i rotates 90° clockwise." },
            { cue: '"Locus of |z - z1| = |z - z2|"', think: "Describes the perpendicular bisector of the line segment joining z1 and z2." },
            { cue: '"Solve rational inequalities with divisions"', think: "Do NOT cross-multiply variables! Bring everything to one side and apply the Wavy Curve method." },
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
          <TrapCard title="Trap 1: Cross-Multiplying Inequality Variables">
            Never cross-multiply an inequality by a variable unless you are absolutely sure of its sign. If the variable is negative, the inequality sign must flip. Instead, move all terms to the left side and solve.
          </TrapCard>
          <TrapCard title="Trap 2: Complex Conjugate Root Assumption">
            Complex roots only occur in conjugate pairs (p &plusmn; iq) if ALL coefficients of the polynomial are real. If any coefficient is complex, roots are not conjugates.
          </TrapCard>
          <TrapCard title="Trap 3: Wavy Curve multiplicity exceptions">
            When applying the Wavy Curve method, signs only alternate across simple roots. If a factor is raised to an even power (multiplicity), the sign stays the SAME on both sides.
          </TrapCard>
        </div>
      </div>

      {/* PART 9: IAT PRACTICE CHALLENGE */}
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
              q: "Q1. Find the value of the sum: i⁹⁹ + i¹⁰⁰ + i¹⁰¹ + i¹⁰².",
              hint: "Recall that the sum of any four consecutive integer powers of i is always equal to 0.",
              ans: "0 (i³ + i⁰ + i¹ + i² = −i + 1 + i − 1 = 0)."
            },
            {
              id: 2,
              q: "Q2. Find the locus of the complex number z if it satisfies the equation |z − 3| = |z − 5|.",
              hint: "This represents the set of points equidistant from 3 and 5 on the real axis, which is their perpendicular bisector.",
              ans: "Re(z) = 4 (or x = 4)."
            },
            {
              id: 3,
              q: "Q3. If the roots of the quadratic equation x² − px + q = 0 differ by 1, find a relation between p and q.",
              hint: "Let roots be α and β. Then |α - β| = 1. Square both sides: (α + β)² - 4αβ = 1. Substitute S and P.",
              ans: "p² − 4q = 1."
            },
            {
              id: 4,
              q: "Q4. Solve the system of simultaneous linear inequalities: 3x + 2 > 8 and 5x − 4 < 16.",
              hint: "Solve each inequality independently: x > 2 and x < 4. Find the common overlapping range.",
              ans: "x ∈ (2, 4)."
            },
            {
              id: 5,
              q: "Q5. Find the conjugate of the complex number z = (2 + i) / (1 − i).",
              hint: "Simplify z first by multiplying numerator and denominator by (1+i), then compute the conjugate.",
              ans: "1/2 − 3/2i (since simplified z = 1/2 + 3/2i)."
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
          <h3 className="text-cyan-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Complex z = a + ib, modulus |z| = √(a² + b²)",
            "z̅ = a - ib, z * z̅ = |z|²",
            "Powers of i cycling rule: i^k = i^(k mod 4)",
            "Equality: two complex numbers match iff real and imaginary parts match",
            "Polar: z = r(cos θ + i sin θ), Euler: z = r e^(iθ)",
            "Triangle Inequality: |z₁ + z₂| ≤ |z₁| + |z₂|",
            "Fundamental Theorem of Algebra: Degree n equation has exactly n complex roots",
            "Symmetric functions: α² + β² = (α+β)² - 2αβ",
            "Quadratic formation: x² - Sx + P = 0",
            "Parabolic Vertex: (-b/2a, -D/4a)",
            "Inequality multiplication: flip sign when multiplying by negative",
            "System of inequalities: find intersection of solution ranges",
            "2D shading boundary: ax + by ≤ c divides coordinate plane into two half-planes",
            "Cube roots sum (extra): 1 + ω + ω² = 0, power cycle: ω³ = 1"
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
