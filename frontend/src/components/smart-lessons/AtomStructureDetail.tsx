import React, { useState } from 'react';
import {
  Star, AlertTriangle, CheckCircle,
  BookOpen, Flame, Target, RefreshCw
} from 'lucide-react';
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
        <span className="text-[10px] uppercase font-bold text-white/45 ">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <p className=" text-cyan-300 font-bold text-[13.5px] leading-snug" dangerouslySetInnerHTML={{ __html: formula }} />
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

// ─── SVG 1: ELECTROMAGNETIC SPECTRUM & ENERGY CHAIN ─────────────────────────
function ElectromagneticSpectrumSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px]  uppercase tracking-wider text-white/30">Fig 1 — Electromagnetic spectrum order and energy-wavelength relation</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <line x1="20" y1="50" x2="320" y2="50" stroke="#475569" strokeWidth="1.5" />
        <path d="M 315 45 L 325 50 L 315 55 z" fill="#475569" />
        <text x="170" y="44" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">Wavelength (&lambda;) Increases &rarr;</text>
        <text x="170" y="66" fill="#fb7185" fontSize="7" fontFamily="monospace" textAnchor="middle">&larr; Frequency (&nu;) &amp; Energy (E) Increase</text>

        <g fontSize="6.5" fontFamily="monospace" textAnchor="middle">
          <line x1="30" y1="45" x2="30" y2="55" stroke="#64748b" strokeWidth="1" />
          <text x="30" y="38" fill="#fb7185">Gamma</text>

          <line x1="75" y1="45" x2="75" y2="55" stroke="#64748b" strokeWidth="1" />
          <text x="75" y="38" fill="#fb7185">X-Ray</text>

          <line x1="120" y1="45" x2="120" y2="55" stroke="#64748b" strokeWidth="1" />
          <text x="120" y="38" fill="#a78bfa">UV</text>

          <rect x="150" y="30" width="40" height="40" fill="rgba(234, 179, 8, 0.08)" stroke="#eab308" strokeWidth="0.8" rx="2" />
          <text x="170" y="53" fill="#eab308" fontSize="7.5" fontWeight="bold">Visible</text>

          <line x1="220" y1="45" x2="220" y2="55" stroke="#64748b" strokeWidth="1" />
          <text x="220" y="38" fill="#cbd5e1">IR</text>

          <line x1="265" y1="45" x2="265" y2="55" stroke="#64748b" strokeWidth="1" />
          <text x="265" y="38" fill="#22d3ee">Micro</text>

          <line x1="310" y1="45" x2="310" y2="55" stroke="#64748b" strokeWidth="1" />
          <text x="310" y="38" fill="#22d3ee">Radio</text>
        </g>

        <text x="170" y="96" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">
          Frequency (&nu; &uarr;) &rArr; Energy (E &uarr;) &rArr; Wavelength (&lambda; &darr;)
        </text>
      </svg>
    </div>
  );
}

// ─── SVG 2: BOHR MODEL CALCULATIONS & PROPORTIONALITY MAP ───────────────────
function BohrProportionalitySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px]  uppercase tracking-wider text-white/30">Fig 2 — Bohr radius, energy, velocity and time proportionalities</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <line x1="170" y1="10" x2="170" y2="110" stroke="#334155" strokeWidth="1" />
        <line x1="20" y1="60" x2="320" y2="60" stroke="#334155" strokeWidth="1" />

        <text x="95" y="32" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Radius (r<sub>n</sub>)</text>
        <text x="95" y="47" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">r<sub>n</sub> &prop; n&sup2; / Z</text>

        <text x="245" y="32" fill="#fb7185" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Energy (E<sub>n</sub>)</text>
        <text x="245" y="47" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">E<sub>n</sub> &prop; -Z&sup2; / n&sup2;</text>

        <text x="95" y="82" fill="#34d399" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Velocity (v<sub>n</sub>)</text>
        <text x="95" y="97" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">v<sub>n</sub> &prop; Z / n</text>

        <text x="245" y="82" fill="#eab308" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Time (T<sub>n</sub>)</text>
        <text x="245" y="97" fill="#cbd5e1" fontSize="8" fontFamily="monospace" textAnchor="middle">T<sub>n</sub> &prop; n&sup3; / Z&sup2;</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: ORBITAL SHAPES VISUALIZER ────────────────────────────────────────
function OrbitalShapesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px]  uppercase tracking-wider text-white/30">Fig 3 — Electron probability densities (s, p, and d orbitals)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <circle cx="50" cy="60" r="22" fill="rgba(34, 211, 238, 0.05)" stroke="#22d3ee" strokeWidth="1" />
        <circle cx="50" cy="60" r="1" fill="#22d3ee" />
        <text x="50" y="98" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">s (spherical)</text>

        <path d="M 120 60 C 120 40 145 40 145 60 C 145 80 120 80 120 60 C 120 40 95 40 95 60 C 95 80 120 80 120 60" fill="rgba(167, 139, 250, 0.05)" stroke="#a78bfa" strokeWidth="1" />
        <circle cx="120" cy="60" r="1" fill="#a78bfa" />
        <text x="120" y="98" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">p<sub>x</sub> (dumbbell)</text>

        <g transform="translate(190, 60)">
          <path d="M 0 0 C -15 -15 -15 15 0 0 C 15 15 15 -15 0 0 C -15 15 15 15 0 0 C 15 -15 -15 -15 0 0" fill="rgba(52, 211, 153, 0.05)" stroke="#34d399" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="1" fill="#34d399" />
        </g>
        <text x="190" y="98" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">d<sub>x</sub>&sup2;-y&sup2; (double-db)</text>

        <g transform="translate(270, 60)">
          <path d="M 0 0 C -8 -15 8 -15 0 0 C -8 15 8 15 0 0" fill="rgba(251, 113, 133, 0.05)" stroke="#fb7185" strokeWidth="1" />
          <ellipse cx="0" cy="0" rx="14" ry="4" fill="none" stroke="#fb7185" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="1" fill="#fb7185" />
        </g>
        <text x="270" y="98" fill="#fb7185" fontSize="7.5" fontFamily="monospace" textAnchor="middle">d<sub>z</sub>&sup2; (donut-db)</text>
      </svg>
    </div>
  );
}

// ─── SVG 4: PHOTOELECTRIC EFFECT GRAPH (ADVANCED) ───────────────────────────
function PhotoelectricEffectSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px]  uppercase tracking-wider text-white/30">Fig 4 — Photoelectric Effect: Stopping Potential vs Light Frequency</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <line x1="50" y1="10" x2="50" y2="100" stroke="#475569" strokeWidth="1.2" />
        <line x1="40" y1="90" x2="310" y2="90" stroke="#475569" strokeWidth="1.2" />
        <text x="180" y="103" fill="#cbd5e1" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Frequency (&nu;)</text>
        <text x="18" y="55" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 18 55)">Stopping Pot. (V₀)</text>

        <line x1="120" y1="90" x2="280" y2="20" stroke="#fb7185" strokeWidth="1.8" />
        <circle cx="120" cy="90" r="2.5" fill="#eab308" />

        <text x="120" y="99" fill="#eab308" fontSize="7" fontFamily="monospace" textAnchor="middle">Threshold &nu;_0</text>

        <text x="240" y="45" fill="#fb7185" fontSize="7.5" fontFamily="monospace">Slope = h / e</text>
        <text x="240" y="56" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace">V₀ = (h/e)&nu; - &phi;/e</text>
      </svg>
    </div>
  );
}

export default function AtomStructureDetail({ progress, isCompleted, onNavigate }: Props) {
  // Quantum Number Validator states
  const [valN, setValN] = useState<string>('3');
  const [valL, setValL] = useState<string>('1');
  const [valMl, setValMl] = useState<string>('0');
  const [valMs, setValMs] = useState<string>('0.5');

  const n = parseInt(valN) || 0;
  const l = parseInt(valL) || 0;
  const ml = parseInt(valMl) || 0;
  const ms = parseFloat(valMs) || 0.5;

  let validationMsg = 'VALID STATE ✅';
  let isValValid = true;

  if (n < 1) {
    validationMsg = 'Violation: Principal quantum number n must be >= 1.';
    isValValid = false;
  } else if (l < 0 || l >= n) {
    validationMsg = `Violation: Azimuthal quantum number l must satisfy 0 <= l < n (for n=${n}, l can be 0 to ${n-1}).`;
    isValValid = false;
  } else if (Math.abs(ml) > l) {
    validationMsg = `Violation: Magnetic quantum number m_l must satisfy -l <= m_l <= l (for l=${l}, m_l can be -${l} to +${l}).`;
    isValValid = false;
  } else if (Math.abs(ms) !== 0.5) {
    validationMsg = 'Violation: Spin quantum number m_s must be +1/2 or -1/2.';
    isValValid = false;
  }

  // Bohr Proportionality calculator states
  const [calcN, setCalcN] = useState<string>('1');
  const [calcZ, setCalcZ] = useState<string>('1');
  const [calcProp, setCalcProp] = useState<string>('radius');

  const cnVal = parseInt(calcN) || 1;
  const czVal = parseInt(calcZ) || 1;

  let calcResult = '';
  if (calcProp === 'radius') {
    const radius = 0.529 * (cnVal * cnVal) / czVal;
    calcResult = `Radius r_n = 0.529 * (${cnVal}² / ${czVal}) = ${radius.toFixed(4)} Å`;
  } else if (calcProp === 'energy') {
    const energy = -13.6 * (czVal * czVal) / (cnVal * cnVal);
    calcResult = `Energy E_n = -13.6 * (${czVal}² / ${cnVal}²) = ${energy.toFixed(3)} eV`;
  } else if (calcProp === 'velocity') {
    const velocity = 2.18e6 * czVal / cnVal;
    calcResult = `Velocity v_n = 2.18 * 10⁶ * (${czVal} / ${cnVal}) = ${velocity.toExponential(3)} m/s`;
  } else if (calcProp === 'time') {
    const time = 1.5e-16 * (cnVal * cnVal * cnVal) / (czVal * czVal);
    calcResult = `Time Period T_n = 1.5 * 10⁻¹⁶ * (${cnVal}³ / ${czVal}²) = ${time.toExponential(3)} s`;
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
              <Tag color="cyan">Chemistry Unit 2</Tag>
              <Tag color="rose">IAT Foundation</Tag>
              <Tag color="amber">Quantum Mechanics</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px]  font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Structure of the Atom
            </h1>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10 ">Planck Constant</span>
              <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[10px] border border-white/10  font-bold">EM Wave Equations</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '45 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: 'High' },
              { label: 'Difficulty', value: 'Medium (3.5/5)' },
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

      {/* PART 0A: DISCOVERY OF SUB-ATOMIC PARTICLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 0A</span>
          <h2 className="text-white font-display font-bold text-[17px]">Discovery of Sub-atomic Particles</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Atoms are not indivisible. A series of landmark experiments in the late 19th and early 20th centuries revealed their internal components:
        </p>

        <div className="space-y-4">
          {/* Cathode Ray */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">1. J.J. Thomson's Cathode Ray Tube (CRT) Experiment (1897)</h3>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              <strong>Setup &amp; Observations:</strong> A sealed glass discharge tube containing gas at very low pressure was subjected to high voltage. Radiation emitted from the negative electrode (cathode) traveled in straight lines toward the positive electrode (anode). When electric and magnetic fields were applied, these "cathode rays" deflected in directions indicating they were streams of negatively charged particles—which Thomson named <strong>electrons</strong>.
            </p>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              <strong>e/m Ratio:</strong> Thomson measured the charge-to-mass ratio of the electron by balancing magnetic and electric deflections:
              <br />
              <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono font-bold">e/m = 1.758820 &times; 10¹¹ C/kg</code>
            </p>
          </div>

          {/* Oil-drop */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">2. Millikan's Oil-Drop Experiment (1909)</h3>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              <strong>Method:</strong> Fine oil droplets were sprayed into a chamber and ionized via X-rays. By adjusting the electric field strength between two horizontal plates, Millikan suspended the charged droplets, balancing gravitational pull with electrostatic force.
            </p>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              <strong>Results:</strong> He observed that the charge on any droplet was always an integral multiple of a fundamental unit of charge:
              <br />
              <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono font-bold">e = 1.602 &times; 10⁻¹⁹ C</code>
              Using Thomson's <code>e/m</code>, the electron mass was calculated: <code>m_e = e / (e/m) = 9.109 &times; 10⁻³¹ kg</code>.
            </p>
          </div>

          {/* Rutherford Scattering */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">3. Rutherford's Alpha Scattering Experiment (1911)</h3>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              <strong>Setup:</strong> High-energy &alpha;-particles (helium nuclei, He²⁺) from a radioactive source were directed at a thin sheet of gold foil (approx. 100 nm thick) surrounded by a circular fluorescent ZnS zinc sulfide screen.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-[12px] text-white/70 pt-1">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-emerald-400 font-bold block">Observations</span>
                <p>&bull; 99% of &alpha;-particles passed straight through without deflection.</p>
                <p>&bull; A tiny fraction deflected by small angles.</p>
                <p>&bull; 1 in 20,000 deflected by &gt;90&deg; (some bouncing straight back).</p>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-violet-400 font-bold block">Conclusions</span>
                <p>&bull; Atom's volume is mostly empty space.</p>
                <p>&bull; Positively charged mass is concentrated in an incredibly small, dense central core called the <strong>nucleus</strong>.</p>
              </div>
            </div>
          </div>

          {/* Chadwick */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">4. Chadwick's Neutron Discovery (1932)</h3>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              James Chadwick bombarded a thin sheet of beryllium with &alpha;-particles, causing the emission of highly penetrating neutral radiation. This radiation consisted of uncharged particles with a mass slightly greater than that of a proton, which he named <strong>neutrons</strong>:
              <br />
              <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono font-bold">⁹Be + ⁴He &rarr; ¹²C + ¹n (neutron)</code>
            </p>
          </div>
        </div>
      </div>

      {/* PART 0B: EARLY ATOMIC MODELS & LIMITATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 0B</span>
          <h2 className="text-white font-display font-bold text-[17px]">Early Atomic Models &amp; Limitations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          How scientists arranged subatomic players into structural models, and where those models fell short:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Thomson Model */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5 text-[12.5px] text-white/70">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">1. Thomson's Plum Pudding Model</h3>
            <p>
              <strong>Postulate:</strong> An atom is a uniform sphere of positive charge (radius &approx; 10⁻¹⁰ m) inside which electrons are embedded like plums in a pudding (or seeds in a watermelon).
            </p>
            <p className="text-rose-400/90">
              <strong>Failure:</strong> It predicted small-angle deflections of alpha particles. It was completely unable to explain Rutherford's large-angle and backscattering observations.
            </p>
          </div>

          {/* Rutherford Model */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5 text-[12.5px] text-white/70">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">2. Rutherford's Nuclear Model</h3>
            <p>
              <strong>Postulates:</strong> Positively charged nucleus at the center contains almost all mass. Electrons revolve around it in circular orbits at high speeds, held by electrostatic force.
            </p>
            <div className="p-2.5 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-1.5 text-rose-300">
              <span className="font-bold block">Fatal Limitations:</span>
              <p>&bull; <strong>Electrodynamics Instability:</strong> Orbiting electrons undergo acceleration. According to classical electromagnetism, they should continuously radiate energy, spiraling into the nucleus in &approx; 10⁻⁸ seconds.</p>
              <p>&bull; <strong>Line Spectra:</strong> It predicted a continuous emission spectrum, failing to explain the experimentally observed discrete line spectra of atoms.</p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 0C: DEVELOPMENTS LEADING TO BOHR'S MODEL */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 0C</span>
          <h2 className="text-white font-display font-bold text-[17px]">Developments Leading to Bohr's Model</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Two major developments paved the way: the wave-particle duality of electromagnetic radiation and the quantization of atomic energy levels.
        </p>

        <div className="space-y-4">
          {/* Planck's Theory */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-[12.5px] text-white/70">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">1. Planck's Quantum Theory (1900)</h3>
            <p>
              To resolve the "black body radiation" problem (where classical wave physics predicted infinite energy emission at short wavelengths), Max Planck proposed that atoms/molecules emit or absorb energy only in discrete packets called <strong>quanta</strong> (photons).
            </p>
            <p>
              The energy <i>E</i> of a quantum of radiation is proportional to its frequency &nu;:
              <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono font-bold">E = h&nu; = h c / &lambda;</code>
              where <code>h = 6.626 &times; 10⁻³⁴ J s</code> (Planck's constant).
            </p>
          </div>

          {/* Photoelectric Effect */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-[12.5px] text-white/70">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">2. Photoelectric Effect (Einstein, 1905)</h3>
            <p>
              When light of sufficient frequency hits a metal surface, electrons are ejected instantaneously.
            </p>
            <p>&bull; <strong>Threshold Frequency (&nu;<sub>0</sub>):</strong> Minimum frequency required to eject electrons. If &nu; &lt; &nu;<sub>0</sub>, no emission occurs regardless of intensity.</p>
            <p>&bull; <strong>Einstein's Equation:</strong> Light energy is delivered in photon packets. Part is used to overcome binding energy (Work Function &Phi; = h&nu;<sub>0</sub>), and the remainder goes to kinetic energy:</p>
            <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono font-bold">K.E._max = h&nu; − h&nu;_0 = e V_0</code>
            <p>where <code>V_0</code> is the stopping potential (voltage needed to halt the fastest photoelectrons).</p>
          </div>

          {/* Hydrogen Line Spectra */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-[12.5px] text-white/70">
            <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">3. Hydrogen Line Spectra</h3>
            <p>
              When gas is excited in a discharge tube, it emits discrete wavelengths, producing lines. Johann Balmer discovered that visible wavelengths satisfy a simple formula:
              <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono font-bold">1/&lambda; = R_H (1/2&sup2; − 1/n&sup2;)  [for n = 3, 4, 5...]</code>
              This Rydberg-generalized transition formula showed that electrons exist only in quantized energy levels.
            </p>
          </div>
        </div>
      </div>

      {/* PART 1: BOHR HYDROGEN MODEL */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold ">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Bohr's Model</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Bohr resolved Rutherford's collapse dilemma by introducing quantized circular orbits where the electron does not radiate energy:
        </p>

        <ElectromagneticSpectrumSVG />
        <PhotoelectricEffectSVG />
        <BohrProportionalitySVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="m v r = n h / 2&pi;"
            use="Bohr Angular Momentum Quantization"
            note="Defines stable, non-radiating circular orbits. Angular momentum is an integer multiple of h/2&pi;."
            priority={5}
          />
          <FormulaCard
            formula="r_n = 0.529 &times; ( n² / Z ) Å"
            use="Bohr Orbit Radius Calculation"
            note="For Hydrogen (Z=1, n=1), r_1 = 0.529 Å. Increases quadratically with shell level."
            priority={5}
          />
          <FormulaCard
            formula="E_n = -13.6 &times; ( Z² / n² ) eV"
            use="Bohr Energy Level in eV"
            note="-2.18 &times; 10⁻¹⁸ J. Negative sign represents that the electron is electrostatically bound."
            priority={5}
          />
          <FormulaCard
            formula="1 / &lambda; = R_H &times; Z² [ 1/n_1² - 1/n_2² ]"
            use="Rydberg Formula for hydrogen transitions"
            note="R_H = 109,677 cm⁻¹. Calculates wavelengths of absorption/emission spectra lines."
            priority={5}
          />
        </div>

        {/* Hydrogen Spectral Series Table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider  block">📊 Hydrogen Spectral Transitions</span>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Series</th>
                  <th>n<sub>1</sub> (Lower)</th>
                  <th>n<sub>2</sub> (Upper)</th>
                  <th>Spectral Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-1.5 text-cyan-400 font-bold">Lyman</td>
                  <td>1</td>
                  <td>2, 3, 4...</td>
                  <td>Ultra-violet (UV)</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-1.5 text-violet-400 font-bold">Balmer</td>
                  <td>2</td>
                  <td>3, 4, 5...</td>
                  <td>Visible Region</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-1.5 text-emerald-400 font-bold">Paschen</td>
                  <td>3</td>
                  <td>4, 5, 6...</td>
                  <td>Infrared (IR)</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-1.5 text-amber-400 font-bold">Brackett</td>
                  <td>4</td>
                  <td>5, 6, 7...</td>
                  <td>Infrared (IR)</td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-1.5 text-rose-400 font-bold">Pfund</td>
                  <td>5</td>
                  <td>6, 7, 8...</td>
                  <td>Infrared (IR)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 2: MATTER WAVES & HEISENBERG UNCERTAINTY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold ">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Matter Waves &amp; Heisenberg Uncertainty</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Moving particles display wave features. Exact coordinate trajectories are replaced by probability wave functions derived from Schrödinger's equation.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="&lambda; = h / m v = h / p"
            use="de Broglie Matter Wavelength"
            note="Circumference = integer wave count (2&pi;r = n&lambda;). Explains Bohr's angular momentum quantization."
            priority={5}
          />
          <FormulaCard
            formula="&Delta;x &middot; &Delta;p &ge; h / 4&pi;"
            use="Heisenberg Uncertainty Principle"
            note="Impossible to determine position and momentum of subatomic particles simultaneously with absolute certainty."
            priority={5}
          />
        </div>
      </div>

      {/* PART 3: TOWARDS QUANTUM MECHANICAL MODEL */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Towards Quantum Mechanical Model</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Bohr's model was limited to single-electron systems and treated paths deterministically. The quantum mechanical model treats electrons as 3D probability clouds.
        </p>

        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3.5 text-[12.5px] text-white/70">
          <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-wider">1. The Schrödinger Wave Equation</h3>
          <p>
            Developed by Erwin Schrödinger (1926), this equation describes the behavior of matter waves in a force field:
          </p>
          <code className="text-cyan-300 block text-center py-1 bg-black/20 my-1 font-mono font-bold leading-normal">
            &part;&sup2;&psi;/&part;x&sup2; + &part;&sup2;&psi;/&part;y&sup2; + &part;&sup2;&psi;/&part;z&sup2; + (8&pi;&sup2;m/h&sup2;)(E − V)&psi; = 0
          </code>
          <p>or compactly: <code>Ĥ&psi; = E&psi;</code> (where Ĥ is the Hamiltonian operator, E is total energy, and V is potential energy).</p>

          <div className="grid sm:grid-cols-2 gap-3 pt-1.5 text-xs">
            <div className="p-3 bg-black/45 rounded-xl border border-white/5">
              <strong className="text-white block mb-0.5">Wave Function &psi;</strong>
              <p className="text-white/50">Represents the amplitude of the electron wave. It has no physical significance by itself.</p>
            </div>
            <div className="p-3 bg-black/45 rounded-xl border border-white/5">
              <strong className="text-white block mb-0.5">Probability Density |&psi;|&sup2;</strong>
              <p className="text-white/50">Represents the probability of finding the electron at a specific 3D point in space.</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 Comparison: Bohr vs. Quantum Model</span>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2 pr-2">Feature</th>
                  <th className="pr-2">Bohr Model</th>
                  <th>Quantum Mechanical Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr>
                  <td className="py-2 font-bold">Electron Path</td>
                  <td className="text-rose-300">Deterministic 2D circular orbit</td>
                  <td className="text-emerald-300">3D probabilistic wave-cloud (orbital)</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">Uncertainty</td>
                  <td className="text-rose-300">Violates Heisenberg Principle</td>
                  <td className="text-emerald-300">Inherently accommodates uncertainty</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">System Scope</td>
                  <td className="text-rose-300">Fails for multi-electron atoms</td>
                  <td className="text-emerald-300">Applies to all atoms and molecules</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 4: QUANTUM NUMBERS & ORBITALS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold ">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Quantum Numbers &amp; Nodes</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Quantum numbers act as the electron's address, naturally arising as boundary solutions to the wave equation. Radial and angular nodes mark zero-probability boundary layers.
        </p>

        <OrbitalShapesSVG />

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="Radial Nodes = n - l - 1"
            use="Radial Nodes in spherical shells"
            note="Zero-probability boundary layers. For 3p orbital, nodes = 3 - 1 - 1 = 1."
            priority={5}
          />
          <FormulaCard
            formula="Angular Nodes = l  |  Total Nodes = n - 1"
            use="Angular/Planar nodes calculation"
            note="Nodes along specific axes. s-orbital has 0 angular nodes. p has 1. d has 2."
            priority={5}
          />
        </div>

        {/* Quantum Numbers Address Guide */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-3 text-[13px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Electron Address Parameters</strong>
          <p>&bull; <strong>Principal (<i>n</i>):</strong> Size &amp; energy shell. <code><i>n</i> = 1, 2, 3...</code></p>
          <p>&bull; <strong>Azimuthal (<i>l</i>):</strong> Shape of subshell (orbitals). <code><i>l</i> = 0 to <i>n</i>-1</code> (s=0, p=1, d=2, f=3).</p>
          <p>&bull; <strong>Magnetic (<i>m</i>_l):</strong> Spatial orientation. <code><i>m</i>_l = -<i>l</i> to +<i>l</i></code> (total <code>2<i>l</i> + 1</code> orientations).</p>
          <p>&bull; <strong>Spin (<i>m</i>_s):</strong> Spin state direction. <code><i>m</i>_s = &plusmn;1/2</code>.</p>
        </div>
      </div>

      {/* PART 5: FILLING RULES & ANOMALOUS CONFIGURATIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[11px] font-bold ">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Orbital Filling &amp; Configuration Anomalies</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Electrons occupy orbitals in order of increasing energy, governed by Aufbau, Pauli, and Hund's rules. Half-filled and fully-filled shells display extra stability.
        </p>

        {/* Rules & Energies */}
        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-3.5 text-[13px] text-white/70">
          <div>
            <strong className="text-white text-[13px] block mb-1">🔑 Three Governing Rules</strong>
            <p>&bull; <strong>Aufbau (n+l) Rule:</strong> Fill lower <code>(n+l)</code> energy levels first. If <code>(n+l)</code> is equal, fill the subshell with the smaller <code>n</code> first.</p>
            <p>&bull; <strong>Pauli Exclusion:</strong> No two electrons in an atom can have identical sets of all four quantum numbers.</p>
            <p>&bull; <strong>Hund's Rule:</strong> Degenerate orbitals (same energy, like three 2p orbitals) must be singly occupied with parallel spins before pairing begins.</p>
          </div>
          <div className="border-t border-white/5 pt-2">
            <strong className="text-white text-[13px] block mb-1">🔑 Orbital / Shell Capacities</strong>
            <p>&bull; <strong>Subshell capacity:</strong> s = 2, p = 6, d = 10, f = 14 electrons.</p>
            <p>&bull; <strong>Shell capacity:</strong> <code>2n&sup2;</code> (K=2, L=8, M=18, N=32 electrons).</p>
            <p>&bull; <strong>Subshell orbitals:</strong> s = 1, p = 3, d = 5, f = 7 orbitals.</p>
          </div>
          <div className="border-t border-white/5 pt-2">
            <strong className="text-white text-[13px] block mb-1">🔑 Aufbau Energy Sequence</strong>
            <p><code>1s &rarr; 2s &rarr; 2p &rarr; 3s &rarr; 3p &rarr; 4s &rarr; 3d &rarr; 4p &rarr; 5s &rarr; 4d &rarr; 5p &rarr; 6s</code></p>
          </div>
        </div>

        {/* Anomalous Configurations */}
        <div className="p-4.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-3 text-[13.5px] text-white/75">
          <strong className="text-white text-[13.5px] block mb-1">⭐ Anomalous Configurations (High Yield exceptions)</strong>
          <p>Symmetric half-filled (d⁵, f⁷) and fully-filled (d¹⁰, f¹⁴) subshells provide extra exchange energy and symmetric charge distribution:</p>
          <div className="grid sm:grid-cols-2 gap-2 text-[12px] text-cyan-300 font-bold">
            <p>&bull; Chromium (Cr): <code>[Ar] 3d⁵ 4s¹</code> <span className="text-white/40">(not 3d⁴ 4s&sup2;)</span></p>
            <p>&bull; Copper (Cu): <code>[Ar] 3d¹⁰ 4s¹</code> <span className="text-white/40">(not 3d⁹ 4s&sup2;)</span></p>
            <p>&bull; Molybdenum (Mo): <code>[Kr] 4<i>d</i>⁵ 5<i>s</i>¹</code></p>
            <p>&bull; Silver (Ag): <code>[Kr] 4<i>d</i>¹⁰ 5<i>s</i>¹</code></p>
            <p>&bull; Gold (Au): <code>[Xe] 4<i>f</i>¹⁴ 5<i>d</i>¹⁰ 6<i>s</i>¹</code></p>
          </div>
        </div>
      </div>

      {/* PART 6: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px]  uppercase tracking-wider">Quantum &amp; Bohr Simulators</h2>
        </div>

        {/* Quantum Number Validator */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Quantum Number Address Validator</span>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">n (shell):</label>
              <input type="number" min="1" value={valN} onChange={e => setValN(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs  outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">l (subshell):</label>
              <input type="number" min="0" value={valL} onChange={e => setValL(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs  outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">m<sub>l</sub> (orientation):</label>
              <input type="number" value={valMl} onChange={e => setValMl(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs  outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">m<sub>s</sub> (spin):</label>
              <select value={valMs} onChange={e => setValMs(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs  outline-none">
                <option value="0.5">+1/2</option>
                <option value="-0.5">-1/2</option>
              </select>
            </div>
          </div>
          <div className={cn(
            "p-4 rounded-xl text-[13px] border",
            isValValid ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-rose-500/5 border-rose-500/20 text-rose-400"
          )}>
            <p>&bull; Result: <strong>{validationMsg}</strong></p>
          </div>
        </div>

        {/* Bohr Proportionality calculator */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">Bohr Proportionality calculator</span>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Shell level (n):</label>
              <input type="number" min="1" value={calcN} onChange={e => setCalcN(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs  outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Atomic number (Z):</label>
              <input type="number" min="1" value={calcZ} onChange={e => setCalcZ(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs  outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Quantity type:</label>
              <select value={calcProp} onChange={e => setCalcProp(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs  outline-none">
                <option value="radius">Radius (r<sub>n</sub>)</option>
                <option value="energy">Energy (E<sub>n</sub>)</option>
                <option value="velocity">Velocity (v<sub>n</sub>)</option>
                <option value="time">Time Period (T<sub>n</sub>)</option>
              </select>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5  text-[13px] text-white/80 space-y-1">
            <p>&bull; Calculated = <span className="text-emerald-400 font-bold">{calcResult}</span></p>
          </div>
        </div>
      </div>

      {/* SOLVED EXAMPLES (7 EXAMPLES) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
          <h3 className="text-white font-display font-bold text-[17px] uppercase ">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 1: Bohr Radius ratios</span>
          <p className="text-white/80">Calculate the ratio of Bohr radius of He⁺ in n=2 to that of Li²⁺ in n=3.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Formula: <code>r &prop; n² / Z</code>.</p>
            <p>2. For He⁺ (Z=2, n=2): <code>r₁ &asymp; 2² / 2 = 2</code>.</p>
            <p>3. For Li²⁺ (Z=3, n=3): <code>r₂ &asymp; 3² / 3 = 3</code>.</p>
            <p>4. Ratio <code>r₁(He⁺) / r₂(Li²⁺) = 2 / 3</code>.</p>
            <p className="text-cyan-300 font-bold">Ratio = 2 : 3</p>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 2: Nodes in 4d orbital</span>
          <p className="text-white/80">Determine radial, angular, and total nodes present in a 4d orbital.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify numbers: For 4d, <code>n = 4</code> and <code>l = 2</code>.</p>
            <p>2. Radial Nodes: <code>n - l - 1 = 4 - 2 - 1 = 1</code>.</p>
            <p>3. Angular Nodes: <code>l = 2</code>.</p>
            <p>4. Total Nodes: <code>n - 1 = 3</code> (or sum radial + angular: <code>1 + 2 = 3</code>).</p>
            <p className="text-cyan-300 font-bold">Radial Nodes = 1, Angular Nodes = 2, Total Nodes = 3</p>
          </div>
        </div>

        {/* Example 3 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 3: Electrons matching quantum numbers</span>
          <p className="text-white/80">Find the maximum number of electrons in an atom with quantum parameters <i>n</i> = 3 and <i>m</i>_l = 0.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. For n=3, possible subshells are s (l=0), p (l=1), and d (l=2).</p>
            <p>2. Each subshell contains exactly one orbital with <code><i>m</i>_l = 0</code>:</p>
            <p>&bull; 3s (<i>l</i> = 0, <i>m</i>_l = 0) &rarr; 1 orbital.</p>
            <p>&bull; 3p (<i>l</i> = 1, <i>m</i>_l = 0) &rarr; 1 orbital (3<i>p</i>_z).</p>
            <p>&bull; 3d (<i>l</i> = 2, <i>m</i>_l = 0) &rarr; 1 orbital (3<i>d</i>_z<sup>2</sup>).</p>
            <p>3. Total orbitals with <i>m</i>_l = 0 in <i>n</i> = 3 shell is 3 orbitals.</p>
            <p>4. Max capacity = <code>3 &times; 2 = 6 electrons</code>.</p>
            <p className="text-cyan-300 font-bold">Max Electrons = 6</p>
          </div>
        </div>

        {/* Example 4 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 4: Rutherford Alpha Deflections</span>
          <p className="text-white/80">In a gold foil scattering experiment, if 1 in 10,000 alpha particles are deflected by 90&deg;, how many would deflect by 120&deg;?</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Rutherford's deflection frequency formula: <code>N(&theta;) &prop; 1 / sin⁴(&theta;/2)</code>.</p>
            <p>2. For &theta;<sub>1</sub> = 90&deg;: <code>sin(45&deg;) = 1/&radic;2 &rArr; sin⁴(45&deg;) = 1/4</code>.</p>
            <p>3. For &theta;<sub>2</sub> = 120&deg;: <code>sin(60&deg;) = &radic;3/2 &rArr; sin⁴(60&deg;) = 9/16</code>.</p>
            <p>4. Ratio <code>N(120&deg;) / N(90&deg;) = sin⁴(45&deg;) / sin⁴(60&deg;) = (1/4) / (9/16) = 4/9</code>.</p>
            <p>5. Calculate: <code>N(120&deg;) = (4/9) &times; N(90&deg;) &approx; 444 particles</code> out of 10,000,000 total.</p>
            <p className="text-cyan-300 font-bold">Deflected Particles at 120&deg; &approx; 444 (for same total count)</p>
          </div>
        </div>

        {/* Example 5 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 5: Photoelectric threshold frequency</span>
          <p className="text-white/80">The work function of cesium metal is 2.14 eV. Find the threshold frequency and the maximum kinetic energy of photoelectrons emitted when light of wavelength 300 nm falls on it.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Threshold frequency: <code>&nu;_0 = &Phi; / h = (2.14 &times; 1.6 &times; 10⁻¹⁹ J) / (6.626 &times; 10⁻³⁴ J s) &approx; 5.16 &times; 10¹⁴ Hz</code>.</p>
            <p>2. Energy of incoming photon: <code>E = h c / &lambda; = 1240 eV nm / 300 nm &approx; 4.13 eV</code>.</p>
            <p>3. Max Kinetic Energy: <code>K.E._max = E - &Phi; = 4.13 eV - 2.14 eV = 1.99 eV</code>.</p>
            <p className="text-cyan-300 font-bold">Threshold &nu;_0 = 5.16 &times; 10¹⁴ Hz | K.E._max = 1.99 eV</p>
          </div>
        </div>

        {/* Example 6 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 6: de Broglie wavelength from Voltage</span>
          <p className="text-white/80">Calculate the de Broglie wavelength of an electron accelerated from rest through a potential difference of 100 Volts.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Kinetic energy gained: <code>K.E. = q V = 100 eV</code>.</p>
            <p>2. Shortcut formula for accelerated electron: <code>&lambda; = &radic;(150 / V) Å = 12.27 / &radic;V Å</code>.</p>
            <p>3. Calculate: <code>&lambda; = 12.27 / &radic;100 = 12.27 / 10 = 1.227 Å</code> (or 0.123 nm).</p>
            <p className="text-cyan-300 font-bold">Wavelength &lambda; = 1.227 Å</p>
          </div>
        </div>

        {/* Example 7 */}
        <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13.5px] leading-relaxed">
          <span className="text-[11px] font-bold text-emerald-400 uppercase block">Example 7: Permitted Quantum configurations</span>
          <p className="text-white/80">Which of the following sets of quantum numbers is NOT permitted in an atom, and why?
            <br />Set A: (3, 2, -3, +1/2) | Set B: (2, 1, 0, -1/2) | Set C: (1, 1, 0, +1/2)
          </p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Check Set A: <code>n=3, l=2, m_l=-3</code>. Since <code>|m_l| &le; l</code> is violated (for l=2, m_l can only be -2 to +2), Set A is invalid.</p>
            <p>2. Check Set B: <code>n=2, l=1, m_l=0</code>. All rules satisfied (<code>l &lt; n</code>, <code>|m_l| &le; l</code>, <code>m_s=-1/2</code>). Set B is valid.</p>
            <p>3. Check Set C: <code>n=1, l=1, m_l=0</code>. Since <code>l</code> must be strictly less than <code>n</code> (for n=1, l can only be 0), Set C is invalid.</p>
            <p className="text-cyan-300 font-bold">Answer: Sets A and C are NOT permitted.</p>
          </div>
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px]  uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"Which set of quantum numbers is NOT permitted..."', think: "Check that l is strictly less than n (l < n), and that the absolute value of m_l is less than or equal to l (|m_l| <= l)." },
            { cue: '"Calculate the wavelength of first line of Balmer series..."', think: "The first line of Balmer represents a transition ending at n₁ = 2, starting from n₂ = 3. Apply the Rydberg formula." },
            { cue: '"Calculate the velocity ratio of an electron in different orbits..."', think: "Apply the velocity shortcut v_n = 2.18 * 10⁶ * (Z/n) m/s. Velocity is inversely proportional to shell index n." },
            { cue: '"Find the number of radial nodes in a specific subshell..."', think: "Apply the formula (n - l - 1) immediately using the principal shell and azimuthal subshell values." },
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="text-[13.5px] text-cyan-400" dangerouslySetInnerHTML={{ __html: cue }} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">Immediately think...</p>
                <p className="text-[13.5px] text-white/70" dangerouslySetInnerHTML={{ __html: think }} />
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
          <TrapCard title="Trap 1: Orbit vs Orbital probability interpretations">
            An orbit (Bohr) is a deterministic circular pathway where position/momentum are exact. An orbital (Schrödinger) is a 3D probability density space (indicated by &psi;&sup2;) where position is uncertain.
          </TrapCard>
          <TrapCard title="Trap 2: Ionization electron removal sequence">
            When forming cations of transition elements (e.g., Fe &rarr; Fe&sup2;⁺), remove electrons from the outer 4s orbital first, before removing from the lower-energy 3d orbital. Fe&sup2;⁺ configuration is [Ar] 3d⁶ 4s⁰, NOT [Ar] 3d⁴ 4s&sup2;.
          </TrapCard>
          <TrapCard title="Trap 3: Quantization of angular momentum indices">
            Bohr orbits quantization demands <code>mvr = nh/2&pi;</code>. Do not confuse this with orbital angular momentum of a subshell which depends on azimuthal index: <code>&radic;[l(l+1)] * h/2&pi;</code>.
          </TrapCard>
          <TrapCard title="Trap 4: n-factor vs spin designations in Aufbau rules">
            Check that degenerate levels are filled singly with parallel spin direction (+1/2) before pairing starts. Hund's rule violation yields non-ground configurations.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
          <h3 className="text-cyan-400 font-display font-bold text-[17px] uppercase  tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Electromagnetic spectrum order: Gamma < X-ray < UV < Visible < IR < Micro < Radio",
            "Energy proportionalities: Frequency &nu; &uarr; &rArr; Energy E &uarr; &rArr; Wavelength &lambda; &darr;",
            "Planck relation: E = h&nu; = hc/&lambda; (h = 6.626 &times; 10⁻³⁴ J s)",
            "Photoelectric: K.E.max = h&nu; - h&nu;_0 = eV₀ (intensity tracks current, not K.E.)",
            "J.J. Thomson CRT CRT experiment discovered e⁻ and measured e/m ratio",
            "Millikan oil-drop experiment determined charge e = 1.6 &times; 10⁻¹⁹ C",
            "Rutherford scattering: dense positively charged core = nucleus, mostly empty space",
            "Thomson failed: could not explain alpha scattering deflections",
            "Rutherford failed: could not explain classical collapse or line spectra",
            "Bohr: quantized angular momentum (mvr = nh/2&pi;), non-radiating orbits",
            "Bohr Proportionality: Radius &prop; n²/Z | Energy &prop; -Z²/n² | Velocity &prop; Z/n",
            "de Broglie matter waves: &lambda; = h / mv = h / p",
            "Heisenberg: &Delta;x &middot; &Delta;p &ge; h / 4&pi;",
            "Schrödinger equation: Ĥ&psi; = E&psi;",
            "Wave Function: &psi; is amplitude; |&psi;|&sup2; is probability density",
            "Radial Nodes = n - l - 1 | Angular Nodes = l | Total Nodes = n - 1",
            "Quantum Numbers: n (size), l (shape/subshell), m_l (orientation), m_s (spin)",
            "Filling laws: Aufbau (fill low n+l first), Pauli (no identical sets), Hund (half-fill first)",
            "Chromium: [Ar] 3d⁵ 4s¹ | Copper: [Ar] 3d¹⁰ 4s¹ (half/fully filled subshell stability)"
          ].map(item => (
            <div key={item} className="flex items-start gap-2 text-[13px] text-white/70 py-1 border-b border-white/[0.04] last:border-0 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
