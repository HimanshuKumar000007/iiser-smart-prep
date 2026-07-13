import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}


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

// ─── SVG 1: PHOTOELECTRIC EFFECT APPARATUS ─────────────────────────────────────
function PhotoelectricApparatusSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Experimental Setup for Photoelectric Effect</p>
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 135 }}>
        {/* Vacuum Tube Envelope */}
        <rect x="50" y="20" width="240" height="70" rx="35" fill="none" stroke="#475569" strokeWidth="2.2" />
        <text x="170" y="32" fill="#ffffff" fillOpacity="0.4" fontSize="8" fontFamily="monospace" textAnchor="middle">Evacuated Glass Tube</text>

        {/* Emitter Plate (Cathode, Left) */}
        <rect x="75" y="35" width="6" height="40" fill="#a8a29e" stroke="#78716c" />
        <text x="78" y="85" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Emitter (C)</text>

        {/* Collector Plate (Anode, Right) */}
        <rect x="259" y="35" width="6" height="40" fill="#a8a29e" stroke="#78716c" />
        <text x="262" y="85" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Collector (A)</text>

        {/* Quartz Window */}
        <rect x="145" y="14" width="50" height="8" rx="2" fill="#38bdf8" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1" />
        <text x="170" y="10" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Quartz Window</text>

        {/* Incident UV Rays */}
        <path d="M 170 -5 L 170 14" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3,2" />
        <path d="M 155 8 L 90 45" stroke="#a78bfa" strokeWidth="1.5" />
        <polygon points="90,45 96,40 92,37" fill="#a78bfa" />
        
        {/* Photoelectrons flying */}
        <circle cx="120" cy="45" r="2.5" fill="#22d3ee" />
        <line x1="120" y1="45" x2="140" y2="47" stroke="#22d3ee" strokeWidth="1" />
        <polygon points="140,47 134,44 135,49" fill="#22d3ee" />

        <circle cx="160" cy="52" r="2.5" fill="#22d3ee" />
        <line x1="160" y1="52" x2="185" y2="50" stroke="#22d3ee" strokeWidth="1" />
        <polygon points="185,50 179,47 180,52" fill="#22d3ee" />

        {/* Circuit connections */}
        <line x1="78" y1="75" x2="78" y2="120" stroke="#64748b" strokeWidth="1.5" />
        <line x1="262" y1="75" x2="262" y2="120" stroke="#64748b" strokeWidth="1.5" />
        
        {/* Commutator & Volt / Ammeter representation */}
        <circle cx="170" cy="120" r="10" fill="none" stroke="#fb923c" strokeWidth="1.5" />
        <text x="170" y="123" fill="#fb923c" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">V</text>
        <line x1="78" y1="120" x2="160" y2="120" stroke="#64748b" strokeWidth="1.5" />
        <line x1="180" y1="120" x2="262" y2="120" stroke="#64748b" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── SVG 2: THREE KEY PHOTOELECTRIC GRAPHS ───────────────────────────────────
function PhotoelectricGraphsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — The Three Critical Photoelectric Effect Curves</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Graph 1: Current vs Voltage */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
 <span className="text-[10px] font-bold text-cyan-400 block">Current vs. Voltage (Varying Intensity)</span>
          <svg viewBox="0 0 100 90" className="w-full" style={{ maxHeight: 85 }}>
            {/* Axis */}
            <line x1="10" y1="70" x2="90" y2="70" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="50" y1="10" x2="50" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            {/* Curve 1 (Higher intensity) */}
            <path d="M 25 70 Q 42 70 50 45 T 85 30" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            {/* Curve 2 (Lower intensity) */}
            <path d="M 25 70 Q 42 70 50 55 T 85 45" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
            {/* Labels */}
            <text x="20" y="79" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">-<i>V</i>_0</text>
            <text x="88" y="27" fill="#22d3ee" fontSize="7" fontFamily="monospace">I₁</text>
            <text x="88" y="42" fill="#a78bfa" fontSize="7" fontFamily="monospace">I₂</text>
          </svg>
        </div>
        {/* Graph 2: Stopping Potential vs Frequency */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
 <span className="text-[10px] font-bold text-violet-400 block">Stopping Potential vs. Frequency</span>
          <svg viewBox="0 0 100 90" className="w-full" style={{ maxHeight: 85 }}>
            {/* Axis */}
            <line x1="10" y1="70" x2="95" y2="70" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="20" y1="10" x2="20" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            {/* Metal A */}
            <line x1="45" y1="70" x2="90" y2="20" stroke="#a78bfa" strokeWidth="1.8" />
            {/* Metal B */}
            <line x1="65" y1="70" x2="95" y2="35" stroke="#fb923c" strokeWidth="1.5" />
            {/* Threshold labels */}
            <text x="45" y="79" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">ν₀</text>
            <text x="65" y="79" fill="#fb923c" fontSize="7" fontFamily="monospace" textAnchor="middle">ν₀'</text>
            <text x="92" y="16" fill="#a78bfa" fontSize="7.5" fontFamily="monospace">Slope = h/e</text>
          </svg>
        </div>
        {/* Graph 3: Kmax vs Frequency */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
 <span className="text-[10px] font-bold text-emerald-400 block"><i>K</i>_max vs. Frequency</span>
          <svg viewBox="0 0 100 90" className="w-full" style={{ maxHeight: 85 }}>
            {/* Axis */}
            <line x1="10" y1="70" x2="95" y2="70" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="20" y1="10" x2="20" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" />
            {/* Kmax Line */}
            <line x1="40" y1="70" x2="90" y2="15" stroke="#34d399" strokeWidth="2" />
            <text x="40" y="79" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle">ν₀</text>
            <text x="92" y="16" fill="#34d399" fontSize="7.5" fontFamily="monospace">Slope = h</text>
            {/* Y-intercept work function projection */}
            <line x1="20" y1="70" x2="40" y2="70" stroke="#34d399" strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG 3: DAVISSON-GERMER Nickel TARGET SCATTERING ──────────────────────────
function DavissonGermerSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Davisson-Germer Electron Scattering showing wave diffraction behavior</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        {/* Electron Gun (Left) */}
        <rect x="20" y="55" width="50" height="25" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        <line x1="70" y1="67.5" x2="160" y2="67.5" stroke="#38bdf8" strokeWidth="2" />
        <polygon points="120,67.5 113,63 113,72" fill="#38bdf8" />
        <text x="45" y="71" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">Electron Gun</text>

        {/* Nickel Crystal Target (Center) */}
        <polygon points="160,50 190,50 195,85 165,85" fill="#a8a29e" stroke="#78716c" />
        <text x="178" y="100" fill="#78716c" fontSize="8" fontFamily="monospace" textAnchor="middle">Nickel Target</text>

        {/* Scattered Electron Path */}
        <path d="M 175 67.5 L 245 15" stroke="#fb923c" strokeWidth="1.8" strokeDasharray="3,2" />
        <polygon points="215,36 211,42 217,45" fill="#fb923c" />

        {/* Scattering Angle arc */}
        <path d="M 205 67.5 A 30 30 0 0 0 196 46" fill="none" stroke="#22d3ee" strokeWidth="1.2" />
        <text x="212" y="54" fill="#22d3ee" fontSize="8" fontFamily="monospace">θ = 50°</text>

        {/* Detector (Movable, along arc) */}
        <rect x="238" y="8" width="15" height="15" rx="2" fill="#0f172a" stroke="#fb923c" strokeWidth="1.5" />
        <text x="260" y="18" fill="#fb923c" fontSize="7.5" fontFamily="monospace">Detector (54V Peak)</text>
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

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function DualNatureDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'ratio' | 'flux' | 'wavelength'>('ratio');
  
  // Interactive Simulator States
  const [wavelengthNm, setWavelengthNm] = useState('350'); // nm
  const [metalWorkFunctionEv, setMetalWorkFunctionEv] = useState('2.14'); // Cs (default)
  const [lightIntensity, setLightIntensity] = useState('60'); // %

  const lambda = parseFloat(wavelengthNm);
  const phi0 = parseFloat(metalWorkFunctionEv);
  const intensity = parseFloat(lightIntensity);

  // Constants
  const hc = 1240; // eV·nm
  const photonEnergyEv = !isNaN(lambda) && lambda > 0 ? hc / lambda : 0;
  
  const isEmitted = photonEnergyEv > phi0;
  const kMaxEv = isEmitted ? photonEnergyEv - phi0 : 0;
  const v0 = kMaxEv; // eV to stopping voltage <i>V</i>_0 is numerical equivalence

  // de Broglie Ratio Calculator States
  const [particle1, setParticle1] = useState<'electron' | 'proton' | 'alpha'>('proton');
  const [particle2, setParticle2] = useState<'electron' | 'proton' | 'alpha'>('alpha');
  const [comparisonBaseline, setComparisonBaseline] = useState<'velocity' | 'momentum' | 'energy' | 'voltage'>('voltage');

  // Ratios (Masses: me=1, mp=1836, ma=7344. Charges: qe=1, qp=1, qa=2)
  const getMassCharge = (p: 'electron' | 'proton' | 'alpha') => {
    if (p === 'electron') return { m: 1, q: 1 };
    if (p === 'proton') return { m: 1836, q: 1 };
    return { m: 7344, q: 2 }; // alpha
  };

  const p1_data = getMassCharge(particle1);
  const p2_data = getMassCharge(particle2);

  let wavelengthRatioResult = 1;
  if (comparisonBaseline === 'velocity') {
    // λ = h/mv -> ratio is m2 / m1
    wavelengthRatioResult = p2_data.m / p1_data.m;
  } else if (comparisonBaseline === 'momentum') {
    // λ = h/p -> ratio is 1:1 if momentum is same
    wavelengthRatioResult = 1;
  } else if (comparisonBaseline === 'energy') {
    // λ = h/√(2mE) -> ratio is √(m2 / m1)
    wavelengthRatioResult = Math.sqrt(p2_data.m / p1_data.m);
  } else if (comparisonBaseline === 'voltage') {
    // λ = h/√(2mqV) -> ratio is √[(m2*q2) / (m1*q1)]
    wavelengthRatioResult = Math.sqrt((p2_data.m * p2_data.q) / (p1_data.m * p1_data.q));
  }

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">⚛️</span>
              <Tag color="cyan">Physics Unit 11</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Hot Topic</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Dual Nature of Radiation and Matter
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electrostatic Potential</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Classical Mechanics</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '20 min' },
              { label: 'Expected Questions', value: '1-2 / year' },
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

      {/* TIMELINE OF DISCOVERIES */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Development of Modern Particle-Wave Theories</h2>
          </div>
          <div className="overflow-x-auto">
 <div className="flex gap-4 pb-2 text-[12px] min-w-[500px]">
              {[
                { year: '1865', name: 'Maxwell', desc: 'EM wave theory of light' },
                { year: '1887', name: 'Hertz', desc: 'Discovered spark photoelectric gaps' },
                { year: '1888', name: 'Hallwachs', desc: 'Observed Zn plates charge changes under UV' },
                { year: '1905', name: 'Einstein', desc: 'Proposed photon concept & photoelectric equation' },
                { year: '1924', name: 'de Broglie', desc: 'Postulated matter waves (λ = h/p)' },
                { year: '1927', name: 'Davisson-Germer', desc: 'Diffracted electrons from Ni crystal (wave proof)' }
              ].map((step, idx) => (
                <div key={step.name} className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
                  <div className="text-cyan-400 font-bold shrink-0">{step.year}</div>
                  <div>
                    <strong className="text-white block">{step.name}</strong>
                    <span className="text-white/40 text-[10px]">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PART 1: ELECTRON EMISSION & APPARATUS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Electron Emission &amp; Experimental Studies</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Electrons are bound inside metals by electrostatic forces. Ejecting them requires giving them energy equal to or exceeding the metal's <strong>work function (&Phi;_0)</strong>. Photoelectric emission uses incident light energy to eject these electrons.
        </p>
        <PhotoelectricApparatusSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="E = hν = hc / λ"
            use="Energy of a single incident light photon"
            note="hc ≈ 1240 eV·nm. Higher frequency ν (or shorter wavelength λ) means higher photon energy."
            priority={5}
          />
          <FormulaCard
            formula="&Phi;_0 = hν₀ = hc / λ₀"
            use="Metal Work Function (Threshold criteria)"
            note="Minimum energy for emission. If ν < ν₀ (or λ > λ₀), zero electrons are emitted regardless of light intensity."
            priority={5}
          />
        </div>

        {/* Four Mechanisms of Electron Emission & Work Function Table */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⚡ Types of Electron Emission &amp; Work Functions</span>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[13px] block mb-1">A. Emission Mechanisms</strong>
              <p className="text-white/70 leading-relaxed">
                &bull; <strong>Thermionic Emission:</strong> Heating provides thermal energy to overcome the barrier (used in CRTs/filaments).
                <br />
                &bull; <strong>Field Emission:</strong> A strong electric field (<code>&approx; 10⁸ V/m</code>) pulls electrons out.
                <br />
                &bull; <strong>Secondary Emission:</strong> High-energy electron beam bombardment knocks out secondary electrons.
                <br />
                &bull; <strong>Photoelectric Emission:</strong> Incident photons transfer energy to eject surface electrons.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1">
              <strong className="text-white text-[13px] block mb-1">B. Work Function of Key Metals</strong>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 text-left">
                      <th className="pb-1">Metal</th>
                      <th className="pb-1">&Phi;_0 (eV)</th>
                      <th className="pb-1">Metal</th>
                      <th className="pb-1">&Phi;_0 (eV)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-1 text-cyan-300">Cesium (Cs)</td>
                      <td className="py-1">2.14</td>
                      <td className="py-1 text-violet-300">Aluminum (Al)</td>
                      <td className="py-1">4.28</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-1 text-cyan-300">Potassium (K)</td>
                      <td className="py-1">2.30</td>
                      <td className="py-1 text-violet-300">Zinc (Zn)</td>
                      <td className="py-1">4.31</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-1 text-cyan-300">Sodium (Na)</td>
                      <td className="py-1">2.75</td>
                      <td className="py-1 text-violet-300">Copper (Cu)</td>
                      <td className="py-1">4.65</td>
                    </tr>
                    <tr className="border-b border-white/5 last:border-0">
                      <td className="py-1 text-cyan-300">Calcium (Ca)</td>
                      <td className="py-1">3.20</td>
                      <td className="py-1 text-violet-300">Platinum (Pt)</td>
                      <td className="py-1">5.65</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2: EINSTEIN'S EQUATION & GRAPHS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Einstein's Photoelectric Equation &amp; Curves</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Einstein explained the photoelectric effect by treating light as particles (photons) interacting on a 1-to-1 basis with electrons. Photoelectric current reaches a maximum known as the <strong>saturation current</strong>.
        </p>
        <PhotoelectricGraphsSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="<i>K</i>_max = hν − &Phi;_0"
            use="Einstein's Photoelectric Equation"
            note="<i>K</i>_max is the maximum kinetic energy of ejected electrons. Deeper electrons undergo collisions, exiting with K < <i>K</i>_max."
            priority={5}
          />
          <FormulaCard
            formula="e <i>V</i>_0 = <i>K</i>_max ⟹ <i>V</i>_0 = (h/e)ν − (&Phi;_0/e)"
            use="Stopping Potential <i>V</i>_0 equation"
            note="<i>V</i>_0 is the retarding potential that stops the most energetic photoelectron. Note that the slope of the <i>V</i>_0 vs. ν graph is h/e."
            priority={5}
          />
        </div>

        {/* Particle Nature of Light: The Photon Properties Card */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">☀️ Particle Nature of Light: Key Photon Properties</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[13px] block mb-1">A. Mass, Velocity &amp; Charge</strong>
              <p>
                &bull; <strong className="text-white">Rest Mass:</strong> A photon has exactly <code className="text-cyan-300">zero rest mass</code>.
                <br />
                &bull; <strong className="text-white">Relativistic Mass:</strong> Possesses effective inertial mass: <code>m = E/c² = hν/c²</code>.
                <br />
                &bull; <strong className="text-white">Speed Invariance:</strong> Travels at exact speed <code>c</code> in vacuum, regardless of source or detector velocity.
                <br />
                &bull; <strong className="text-white">Charge:</strong> Electrically neutral; not deflected by magnetic or electric fields.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[13px] block mb-1">B. Energy, Momentum &amp; Collisions</strong>
              <p>
                &bull; <strong className="text-white">Energy &amp; Momentum:</strong> <code>E = hν = hc/λ</code>, and carries momentum <code>p = E/c = h/λ</code> (produces radiation pressure).
                <br />
                &bull; <strong className="text-white">Number conservation:</strong> In photon-particle collisions, total energy and momentum are conserved, but the **number of photons is NOT conserved** (they may be created or absorbed).
              </p>
            </div>
          </div>
        </div>

        {/* Wave theory failure table */}
        <div className="space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 block">📊 Failure of Classical Wave Theory vs. Observations</span>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[12px] min-w-[480px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
                  <th className="text-left px-4 py-2">Feature</th>
                  <th className="text-left px-4 py-2 text-cyan-400">Classical Wave Theory Predicts</th>
                  <th className="text-left px-4 py-2 text-rose-400">Experimental Observation</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Maximum KE (<i>K</i>_max)', 'Proportional to Intensity (higher fields accelerate electrons faster)', 'Independent of Intensity; strictly linear with Frequency'],
                  ['Time Delay', 'Significant delay (hours) for electrons to absorb enough continuous energy', 'Instantaneous emission (no measurable delay < 10⁻⁹ s)'],
                  ['Threshold Frequency', 'Emission should occur at any frequency given high enough intensity', 'No emission occurs below threshold ν₀, no matter the intensity'],
                ].map(([feat, wave, obs]) => (
                  <tr key={feat} className="border-b border-white/5 last:border-0 text-white/70">
                    <td className="px-4 py-2 font-semibold text-white/85">{feat}</td>
                    <td className="px-4 py-2 text-cyan-300">{wave}</td>
                    <td className="px-4 py-2 text-rose-300">{obs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 3: MATTER WAVES & de BROGLIE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Matter Waves &amp; de Broglie Wavelength</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Louis de Broglie postulated that moving material particles exhibit wave properties. The wave-particle duality is symmetrical: just as light has momentum, particles have wavelengths.
        </p>

        {/* de Broglie Derivation & Electron Shortcut details */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 de Broglie Analogy &amp; Shortcut Derivations</span>
          <div className="grid sm:grid-cols-2 gap-4 leading-relaxed text-white/70">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Wavelength Hypothesis</strong>
              <p>
                For photons, energy <code>E = hν</code> and mass-equivalence is <code>E = mc²</code>.
                <br />
                Momentum: <code>p = mc = hν/c = h/λ ⟹ λ = h/p</code>.
                <br /><br />
                By wave-particle symmetry, de Broglie proposed that any material particle of momentum <code>p = mv</code> behaves as a wave with wavelength:
                <br />
                <code className="text-cyan-300 font-bold">λ = h / p = h / (mv)</code>.
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Electron Shortcut Derivation</strong>
              <p>
                Substituting electron constants (<code><i>m</i>_e = 9.1×10⁻³¹ kg</code>, <code>q = 1.6×10⁻¹⁹ C</code>) and Planck's constant into <code>λ = h/√(2mqV)</code>:
                <br />
                <code>&lambda;_e = (6.63×10⁻³⁴) / √[2 * 9.1×10⁻³¹ * 1.6×10⁻¹⁹ * V]</code>
                <br />
                <code className="text-cyan-300 font-bold">&lambda;_e = 12.27 / √V Å</code>.
                <br /><br />
                For a proton (using <code><i>m</i>_p = 1836 <i>m</i>_e</code>), the same derivation yields:
                <br />
                <code className="text-violet-300">&lambda;_p = 0.286 / √V Å</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="λ = h / p = h / (mv) = h / √(2mK)"
            use="de Broglie wavelength of matter waves"
            note="h ≈ 6.626 * 10⁻³⁴ J·s. K is kinetic energy. For heavy macroscopic objects, λ is too small to observe."
            priority={5}
          />
          <FormulaCard
            formula="λ = h / √(2 m q V)"
            use="Wavelength of a charge q accelerated by potential V"
            note="Specific shortcut for electrons: &lambda;_e ≈ 12.27 / √V Å (where V is in volts)."
            priority={5}
          />
        </div>
        <DavissonGermerSVG />

        <InsightCard title="Davisson-Germer Experimental Verification Math">
          At an accelerating potential of <strong>54 V</strong>, a peak in scattered electron intensity was observed at angle <strong>θ = 50°</strong>.
          <br /><br />
          1. <strong>Bragg Diffraction calculation:</strong> For Nickel planes with lattice spacing <code>d = 0.91 Å</code>, the glancing angle of incidence is <code>ϕ = (180° - 50°) / 2 = 65°</code>.
          Using Bragg's Law: <code>λ = 2d sin(ϕ) = 2 * 0.91 Å * sin(65°) ≈ 1.65 Å</code>.
          <br />
          2. <strong>de Broglie Prediction:</strong> <code>λ = 12.27 / √54 ≈ 1.67 Å</code>.
          <br />
          The experimental value (1.65 Å) matches the theoretical prediction (1.67 Å) beautifully, confirming electron wave nature!
        </InsightCard>

        {/* Heisenberg Uncertainty Principle Card */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">🔮 Heisenberg Uncertainty Principle</span>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Core Principle Equations</strong>
              <p className="text-white/70 leading-relaxed">
                It is physically impossible to simultaneously measure both the position and momentum of a subatomic particle with absolute precision:
                <br />
                <code className="text-cyan-300 font-bold">Δx &middot; Δp &ge; h / 4π</code>
                <br /><br />
                Similarly, for energy and time intervals:
                <br />
                <code className="text-cyan-300 font-bold">ΔE &middot; Δt &ge; h / 4π</code>
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Worked Uncertainty Example</strong>
              <p className="text-white/70 leading-relaxed">
                <strong>Q:</strong> If the uncertainty in position of an electron is 1 Å (<code>10⁻¹⁰ m</code>), calculate the minimum uncertainty in its momentum.
                <br /><br />
                <strong>Sol:</strong> <code>Δp &ge; h / (4π Δx) = (6.63 * 10⁻³⁴) / (4 * 3.14 * 10⁻¹⁰)</code>
                <br />
                <code>Δp &ge; 5.28 * 10⁻²⁵ kg&middot;m/s</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4: INTERACTIVE PHOTOELECTRIC SIMULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Photoelectric Simulator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Vary sliders for wavelength, work function, and intensity to calculate emission kinetic energy and stopping potentials.
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Light Wavelength (λ): {wavelengthNm} nm</span>
              <span className="text-cyan-400">Photon Energy = {photonEnergyEv.toFixed(2)} eV</span>
            </div>
            <input
              type="range" min="150" max="750" step="10"
              value={wavelengthNm} onChange={e => setWavelengthNm(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Metal Work Function (&Phi;_0): {metalWorkFunctionEv} eV</span>
              <div className="flex gap-2">
                <button onClick={() => setMetalWorkFunctionEv('2.14')} className="text-[10px] bg-white/5 px-1 py-0.5 rounded text-white hover:bg-white/10">Cs (2.14)</button>
                <button onClick={() => setMetalWorkFunctionEv('2.75')} className="text-[10px] bg-white/5 px-1 py-0.5 rounded text-white hover:bg-white/10">Na (2.75)</button>
                <button onClick={() => setMetalWorkFunctionEv('4.31')} className="text-[10px] bg-white/5 px-1 py-0.5 rounded text-white hover:bg-white/10">Zn (4.31)</button>
              </div>
            </div>
            <input
              type="range" min="1.5" max="6.0" step="0.05"
              value={metalWorkFunctionEv} onChange={e => setMetalWorkFunctionEv(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Light Intensity: {lightIntensity}%</span>
              <span className="text-emerald-400">Higher Intensity &rarr; Higher Saturation Current</span>
            </div>
            <input
              type="range" min="10" max="100" step="5"
              value={lightIntensity} onChange={e => setLightIntensity(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>
 <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center">
          <div>
            <span className="text-[12px] uppercase font-bold text-white/35">Emission Status</span>
            <div className={cn("text-[14px] font-bold my-1.5", isEmitted ? "text-emerald-400" : "text-rose-400")}>
              {isEmitted ? (
                <span>YES &mdash; Photon Energy ({photonEnergyEv.toFixed(2)} eV) &gt; Work Function ({phi0.toFixed(2)} eV)</span>
              ) : (
                <span>NO &mdash; Photon Energy ({photonEnergyEv.toFixed(2)} eV) &le; Work Function ({phi0.toFixed(2)} eV)</span>
              )}
            </div>
          </div>
          <div>
            <span className="text-[12px] uppercase font-bold text-white/35">Maximum Kinetic Energy / Stopping Potential</span>
            <div className="text-[15px] font-bold text-cyan-400 my-1.5">
              {isEmitted ? (
                <span>{kMaxEv.toFixed(2)} eV (<InlineMath math={`V_0 = ${v0.toFixed(2)}\text{ V}`} />)</span>
              ) : (
                <span>0.00 eV (No Emission)</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PART 5: de BROGLIE RATIO CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">de Broglie Wavelength Ratio Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Compare de Broglie wavelengths of two accelerated particles by selecting matching criteria.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Particle 1:</label>
            <select
              value={particle1} onChange={e => setParticle1(e.target.value as any)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="electron" className="bg-[#0A0C18]">Electron (m=1, q=1)</option>
              <option value="proton" className="bg-[#0A0C18]">Proton (m=1836, q=1)</option>
              <option value="alpha" className="bg-[#0A0C18]">Alpha Particle (m=7344, q=2)</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Particle 2:</label>
            <select
              value={particle2} onChange={e => setParticle2(e.target.value as any)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="electron" className="bg-[#0A0C18]">Electron (m=1, q=1)</option>
              <option value="proton" className="bg-[#0A0C18]">Proton (m=1836, q=1)</option>
              <option value="alpha" className="bg-[#0A0C18]">Alpha Particle (m=7344, q=2)</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Comparison Condition:</label>
            <select
              value={comparisonBaseline} onChange={e => setComparisonBaseline(e.target.value as any)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="velocity" className="bg-[#0A0C18]">Same Velocity (v)</option>
              <option value="momentum" className="bg-[#0A0C18]">Same Momentum (p)</option>
              <option value="energy" className="bg-[#0A0C18]">Same Kinetic Energy (K)</option>
              <option value="voltage" className="bg-[#0A0C18]">Same Accel Voltage (V)</option>
            </select>
          </div>
        </div>
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center">
          <span className="text-[12px] uppercase font-bold text-white/35">Resultant Wavelength Ratio (λ₁ / λ₂)</span>
          <p className="text-[21px] font-bold text-cyan-400 my-1">
            {wavelengthRatioResult ? `${wavelengthRatioResult.toFixed(4)}` : 'Error'}
          </p>
        </div>
      </div>

      {/* PART 6: MEMORY BOX & COMPARISON TABLE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Revision Cheat Sheet &amp; dependencies</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-1">
            <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">💡 Core Dependency Card</span>
            <p className="text-white/70">
              &bull; <strong className="text-white">Light Intensity:</strong> Only alters the <strong className="text-cyan-300">number of photons</strong> emitted per second, which alters the saturation current. Does not affect <i>K</i>_max.
              <br /><br />
              &bull; <strong className="text-white">Light Frequency:</strong> Only alters the <strong className="text-violet-300">energy of individual photons</strong>, which alters <i>K</i>_max and the stopping potential. Does not affect saturation current.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
                  <th className="text-left px-3 py-2">Quantity</th>
                  <th className="text-left px-3 py-2 text-cyan-300">Depends Directly On</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Photoelectric Current', 'Intensity of incident light'],
                  ['Saturation Current', 'Intensity of incident light'],
                  ['Maximum KE (Kmax)', 'Frequency of incident light'],
                  ['Stopping Potential (V0)', 'Frequency of incident light'],
                ].map(([qty, dep]) => (
                  <tr key={qty} className="border-b border-white/5 last:border-0 text-white/70">
                    <td className="px-3 py-2 font-semibold text-white/85">{qty}</td>
                    <td className="px-3 py-2 text-cyan-300">{dep}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Photoelectric calculations</span>
          <p className="text-white/80">Light of wavelength 310 nm falls on a metal surface having a work function of 2.2 eV. Find: (a) energy of incident photons, (b) maximum kinetic energy of photoelectrons, and (c) the stopping potential.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Photon energy: <code>E = hc / λ = 1240 / 310 = 4.0 eV</code>.</p>
            <p>2. Maximum KE: <code><i>K</i>_max = E − &Phi;_0 = 4.0 − 2.2 = 1.8 eV</code>.</p>
            <p>3. Stopping Potential: <code>e <i>V</i>_0 = 1.8 eV ⟹ <i>V</i>_0 = 1.8 V</code>.</p>
            <p className="text-cyan-300 font-bold">Photon Energy = 4.0 eV | <i>K</i>_max = 1.8 eV | Stopping Potential = 1.8 V</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Proton and Alpha Wavelength Ratios</span>
          <p className="text-white/80">A proton and an alpha particle are accelerated through the same potential difference V. Find the ratio of their de Broglie wavelengths.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Accel Formula: <code>λ = h / √(2mqV) ⟹ λ ∝ 1 / √(mq)</code>.</p>
            <p>2. Let proton mass &amp; charge be: <code><i>m</i>_p, <i>q</i>_p</code>.</p>
            <p>3. Alpha particle mass &amp; charge: <code><i>m</i>_&alpha; = 4 <i>m</i>_p</code> and <code><i>q</i>_&alpha; = 2 <i>q</i>_p</code>.</p>
            <p>4. Ratio: <code>&lambda;_p / &lambda;_&alpha; = √[ (<i>m</i>_&alpha; <i>q</i>_&alpha;) / (<i>m</i>_p <i>q</i>_p) ] = √[ (4 * 2) / (1 * 1) ] = √8 = 2√2</code>.</p>
            <p className="text-cyan-300 font-bold">&lambda;_p / &lambda;_&alpha; = 2√2 : 1 ≈ 2.828</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Monochromatic Photon Flux</span>
          <p className="text-white/80">A 100 W sodium lamp emits monochromatic yellow light of wavelength 589 nm. Assuming 60% efficiency in converting power to light, calculate the number of photons emitted per second.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Effective light power: <code>P = 100 W * 60% = 60 W = 60 J/s</code>.</p>
            <p>2. Energy of one photon: <code>E = hc / λ = (1.986 * 10⁻²⁵ J·m) / (589 * 10⁻⁹ m) ≈ 3.37 * 10⁻¹⁹ J</code>.</p>
            <p>3. Photon flux: <code>n = P / E = 60 / (3.37 * 10⁻¹⁹) ≈ 1.78 * 10²⁰ photons/second</code>.</p>
            <p className="text-cyan-300 font-bold">Photon Emission Rate = 1.78 * 10²⁰ photons/s</p>
          </div>
        </div>
      </div>

      {/* FORMULA DECISION TREE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ratio', label: '📊 Particle Wavelength Ratios' },
            { id: 'flux', label: '💡 Photon Flux & power' },
            { id: 'wavelength', label: '⚡ Photoelectric Limits' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSelectedGoal(btn.id as any)}
              className={cn(
'px-3 py-1.5 rounded-xl border text-[13px] font-bold transition-all',
                selectedGoal === btn.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white/80 hover:bg-white/[0.04]'
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 text-[13px] space-y-2">
          {selectedGoal === 'ratio' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Select de Broglie particle comparison ratios</span>
              <p className="text-white/70">1. Same velocity: <code>λ ∝ 1 / m</code>.</p>
              <p className="text-white/70">2. Same momentum: <code>λ₁ / λ₂ = 1</code> (always identical).</p>
              <p className="text-white/70">3. Same KE: <code>λ ∝ 1 / √m</code>.</p>
              <p className="text-white/70">4. Same Voltage: <code>λ ∝ 1 / √(mq)</code>.</p>
            </>
          )}
          {selectedGoal === 'flux' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Calculate photon flux or numbers</span>
              <p className="text-white/70">1. Bulbs: Photon rate: <code>n = P / E = P λ / hc</code>.</p>
              <p className="text-white/70">2. Intensity relation: <code>Intensity I = n <i>E</i>_photon / (Area * time)</code>.</p>
            </>
          )}
          {selectedGoal === 'wavelength' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Einstein's photoelectric limit criteria</span>
              <p className="text-white/70">1. Maximum kinetic energy: <code><i>K</i>_max = hν − &Phi;_0</code>.</p>
              <p className="text-white/70">2. Threshold frequency check: <code>ν_min = &Phi;_0 / h</code>.</p>
              <p className="text-white/70">3. Threshold wavelength check: <code>λ_max = hc / &Phi;_0</code>.</p>
            </>
          )}
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
            { cue: '"Threshold wavelength or threshold frequency"', think: "Indicates work function: &Phi;_0 = hν₀ = hc/λ₀. Photoelectric emission only occurs when ν > ν₀." },
            { cue: '"Stopping potential vs frequency graph slope"', think: "The slope is always the universal constant h/e. The x-intercept is the threshold frequency ν₀." },
            { cue: '"Find photon flux or number of photons per second"', think: "n = Power / Ephoton = Pλ / hc." },
            { cue: '"Charged particle accelerated by voltage V"', think: "de Broglie: λ = h / √(2mqV). For electrons, use shortcut: λ ≈ 12.27 / √V Å." },
            { cue: '"Nickel target or angular scattering diffraction of electrons"', think: "Davisson-Germer Experiment. Confirms the wave nature of electrons." },
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
          <TrapCard title="Trap 1: Slope of Stopping Potential Graph">
            In a graph of Stopping Potential (<i>V</i>_0) vs. frequency (ν), the slope is <strong>h/e</strong> (approx 4.14 * 10⁻¹⁵ V·s), NOT planck's constant <code>h</code>. In a graph of <i>K</i>_max vs. ν, the slope is <code>h</code>.
          </TrapCard>
          <TrapCard title="Trap 2: The Intensity Trap">
            Assuming that increasing the light intensity increases the velocity or kinetic energy of ejected photoelectrons is incorrect. Intensity only increases the **number of photoelectrons** ejected per second (photoelectric current).
          </TrapCard>
          <TrapCard title="Trap 3: Electron specific shortcut usage limits">
            Do not use the <code>λ = 12.27 / √V Å</code> shortcut for protons, alpha particles, or ions! It is derived strictly using the mass and charge values of an **electron**.
          </TrapCard>
          <TrapCard title="Trap 4: de Broglie Wavelength of Photons">
            Never use the matter-wave formula <code>λ = h / √(2mK)</code> for photons! Photons have zero rest mass. Use the electromagnetic wave equation instead: <code>λ = c/ν = hc/E</code>.
          </TrapCard>
        </div>
      </div>

      {/* NEXT STEPS IN MODERN PHYSICS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
 <div className="relative z-10 text-[13px]">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">Where This Leads Next</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/80 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10 font-bold">Dual Nature (Unit 11)</span>
            <span className="text-white/30">&rarr;</span>
            <span className="text-white/50 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Atoms &amp; Bohr Model (Unit 12)</span>
            <span className="text-white/30">&rarr;</span>
            <span className="text-white/50 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Nuclei &amp; Decay (Unit 13)</span>
          </div>
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
            "Work Function &Phi;_0: minimum energy to eject electron (Cesium is lowest, Platinum highest)",
            "Photon properties: zero rest mass, electrically neutral, moves at speed c",
            "Photoelectric current: depends linearly on light intensity (more photons = more current)",
            "<i>K</i>_max and Stopping potential: depend linearly on frequency, independent of intensity",
            "Einstein's Equation: <i>K</i>_max = hν − &Phi;_0 (Conservation of energy in 1-to-1 interactions)",
            "Stopping Potential <i>V</i>_0: e <i>V</i>_0 = <i>K</i>_max. Slope of <i>V</i>_0 vs ν graph is h/e",
            "de Broglie: λ = h/p = h/mv. Wave nature of moving matter particles",
            "Accelerated Charge wavelength: λ = h/√(2mqV)",
            "Electron shortcut: &lambda;_e = 12.27 / √V Å (V must be in Volts)",
            "Davisson-Germer: scattered electrons off Nickel crystal, proving wave diffraction",
            "Photon flux emitted: n = Power / <i>E</i>_photon = Pλ / hc",
            "Saturation current: proportional to light intensity"
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