import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: RUTHERFORD SCATTERING SETUP ────────────────────────────────────────
function RutherfordScatteringSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-semibold">Fig 1 — Rutherford Alpha Scattering Experiment (Glow-Enhanced)</p>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 130 }}>
        <defs>
          <linearGradient id="leadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid Background */}
        <g stroke="#ffffff" strokeOpacity="0.02" strokeWidth="0.5">
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="140" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 25} x2="340" y2={i * 25} />
          ))}
        </g>

        {/* Lead box / alpha source (Left) */}
        <rect x="15" y="55" width="35" height="25" rx="4" fill="url(#leadGrad)" stroke="#60a5fa" strokeWidth="1" filter="url(#glow)" />
        <circle cx="32" cy="67.5" r="4" fill="#ef4444" filter="url(#glow)" />
        <text x="32" y="47" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Alpha Source</text>
 
        {/* Gold foil (Center) */}
        <rect x="160" y="25" width="8" height="90" fill="url(#goldGrad)" rx="1" filter="url(#glow)" />
        <text x="164" y="17" fill="#fbbf24" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Gold Foil</text>
 
        {/* Incident beam */}
        <line x1="50" y1="67.5" x2="160" y2="67.5" stroke="#38bdf8" strokeWidth="2.5" filter="url(#glow)" />
        <polygon points="105,67.5 98,63 98,72" fill="#38bdf8" />
 
        {/* Scattered beam paths */}
        {/* 1. Passed straight */}
        <path d="M 168 67.5 L 290 67.5" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
        <polygon points="230,67.5 223,64 223,71" fill="#10b981" />
        <text x="295" y="70" fill="#10b981" fontSize="8" fontFamily="monospace" fontWeight="bold">Most Undeflected</text>
 
        {/* 2. Small deflection */}
        <path d="M 168 63 L 260 30" stroke="#f43f5e" strokeWidth="1.5" filter="url(#glow)" />
        <polygon points="210,48 205,53 213,52" fill="#f43f5e" />
        <text x="265" y="27" fill="#f43f5e" fontSize="8" fontFamily="monospace">Deflected (&theta;)</text>
 
        {/* 3. Rebounded large deflection */}
        <path d="M 160 67.5 L 80 115" stroke="#eab308" strokeWidth="2" filter="url(#glow)" />
        <polygon points="120,91 127,90 123,83" fill="#eab308" />
        <text x="50" y="127" fill="#eab308" fontSize="8" fontFamily="monospace" fontWeight="bold">Rebounded (1 in 8000)</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: BOHR ORBIT & STANDING de BROGLIE MATTER WAVE ───────────────────────
function BohrStandingWaveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-violet-400/70 font-semibold">Fig 2 — Bohr Standing Wave Orbit (Quantized n = 4 Wave Harmonics)</p>
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 130 }}>
        <defs>
          <radialGradient id="nucGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
          <filter id="neonBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid Background */}
        <g stroke="#ffffff" strokeOpacity="0.02" strokeWidth="0.5">
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="150" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 25} x2="340" y2={i * 25} />
          ))}
        </g>

        {/* Nucleus (Center) */}
        <circle cx="170" cy="75" r="12" fill="url(#nucGrad)" stroke="#a78bfa" strokeWidth="1" filter="url(#neonBlue)" />
        <text x="170" y="78" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">(+)</text>
        <text x="170" y="99" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle">Nucleus</text>
 
        {/* Classical Bohr Circular Orbit */}
        <circle cx="170" cy="75" r="45" fill="none" stroke="#475569" strokeWidth="0.8" strokeDasharray="3,3" />
 
        {/* Standing wave path with n=4 lobes */}
        <path
          d="
            M 170 20
            C 188 20, 220 40, 220 75
            C 220 110, 188 130, 170 130
            C 152 130, 120 110, 120 75
            C 120 40, 152 20, 170 20
          "
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.5"
          filter="url(#neonBlue)"
        />
        {/* Wave modulation inner/outer loops */}
        <path
          d="
            M 170 30
            C 182 35, 210 50, 210 75
            C 210 100, 182 115, 170 120
            C 158 115, 130 100, 130 75
            C 130 50, 158 35, 170 30
          "
          fill="none"
          stroke="#a78bfa"
          strokeWidth="1.2"
          strokeDasharray="2,2"
        />
 
        <text x="245" y="70" fill="#22d3ee" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Standing Wave</text>
        <text x="245" y="82" fill="#a78bfa" fontSize="8.5" fontFamily="monospace">2&pi;r = n&lambda; (n = 4)</text>
      </svg>
    </div>
  );
}

// ─── SVG 3: HYDROGEN SPECTRAL LINES ENERGY JUMPS ─────────────────────────────
function HydrogenTransitionsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-rose-400/70 font-semibold">Fig 3 — Hydrogen Spectral Lines Energy Levels &amp; Quantum Transitions</p>
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 140 }}>
        <defs>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <marker id="transArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
          </marker>
        </defs>

        {/* Grid Background */}
        <g stroke="#ffffff" strokeOpacity="0.02" strokeWidth="0.5">
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="160" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 25} x2="340" y2={i * 25} />
          ))}
        </g>

        {/* Energy levels */}
        {/* n = 1 */}
        <line x1="30" y1="130" x2="310" y2="130" stroke="#475569" strokeWidth="1.5" />
        <text x="20" y="133" fill="#cbd5e1" fontSize="8" fontFamily="monospace">n=1 (-13.6 eV)</text>
 
        {/* n = 2 */}
        <line x1="30" y1="90" x2="310" y2="90" stroke="#475569" strokeWidth="1.2" />
        <text x="20" y="93" fill="#cbd5e1" fontSize="8" fontFamily="monospace">n=2 (-3.4 eV)</text>
 
        {/* n = 3 */}
        <line x1="30" y1="65" x2="310" y2="65" stroke="#475569" strokeWidth="1" />
        <text x="20" y="68" fill="#cbd5e1" fontSize="8" fontFamily="monospace">n=3 (-1.51 eV)</text>
 
        {/* n = 4 */}
        <line x1="30" y1="48" x2="310" y2="48" stroke="#475569" strokeWidth="1" />
        <text x="20" y="51" fill="#cbd5e1" fontSize="8" fontFamily="monospace">n=4 (-0.85 eV)</text>
 
        {/* n = 5 */}
        <line x1="30" y1="36" x2="310" y2="36" stroke="#475569" strokeWidth="0.8" />
 
        {/* n = ∞ */}
        <line x1="30" y1="20" x2="310" y2="20" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x="20" y="23" fill="#64748b" fontSize="8" fontFamily="monospace">n=&infin; (0.00 eV)</text>
 
        {/* Lyman Transitions (to n=1) */}
        <path d="M 90 90 L 90 128" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <path d="M 105 65 L 105 128" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <path d="M 120 20 L 120 128" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <text x="105" y="146" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Lyman (UV)</text>
 
        {/* Balmer Transitions (to n=2) */}
        <path d="M 180 65 L 180 88" stroke="#a78bfa" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <path d="M 195 48 L 195 88" stroke="#a78bfa" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <path d="M 210 20 L 210 88" stroke="#a78bfa" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <text x="195" y="106" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Balmer (Vis)</text>
 
        {/* Paschen Transitions (to n=3) */}
        <path d="M 265 48 L 265 63" stroke="#f43f5e" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <path d="M 280 20 L 280 63" stroke="#f43f5e" strokeWidth="1.8" markerEnd="url(#transArrow)" filter="url(#neonGlow)" />
        <text x="272" y="81" fill="#f43f5e" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Paschen (IR)</text>
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
export default function AtomsDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'rutherford' | 'transitions' | 'proportionality'>('transitions');

  // Bohr Orbit Calculator States
  const [elementZ, setElementZ] = useState('1'); // Z factor
  const [orbitN, setOrbitN] = useState('2'); // n index

  const Z = parseInt(elementZ);
  const n = parseInt(orbitN);

  const radiusNm = 0.0529 * ((n * n) / Z);
  const velocityMs = 2.18e6 * (Z / n);
  const totalEnergyEv = -13.6 * ((Z * Z) / (n * n));
  const kineticEnergyEv = -totalEnergyEv;
  const potentialEnergyEv = 2 * totalEnergyEv;

  // Spectrometer States
  const [spectrometerN1, setSpectrometerN1] = useState('1');
  const [spectrometerN2, setSpectrometerN2] = useState('3');

  const n1 = parseInt(spectrometerN1);
  const n2_val = spectrometerN2 === 'inf' ? Infinity : parseInt(spectrometerN2);

  // Transitions Rydberg math
  const z_ryd = 1;
  const term1 = 1 / (n1 * n1);
  const term2 = n2_val === Infinity ? 0 : 1 / (n2_val * n2_val);
  const transitionEnergyEv = 13.6 * z_ryd * (term1 - term2);
  const wavelengthNm = transitionEnergyEv > 0 ? 1240 / transitionEnergyEv : 0;

  // Series identifier
  let seriesName = 'Lyman';
  let emRegion = 'Ultraviolet (UV)';
  if (n1 === 1) {
    seriesName = 'Lyman';
    emRegion = 'Ultraviolet (UV)';
  } else if (n1 === 2) {
    seriesName = 'Balmer';
    emRegion = 'Visible Light';
  } else if (n1 === 3) {
    seriesName = 'Paschen';
    emRegion = 'Near Infrared (IR)';
  } else if (n1 === 4) {
    seriesName = 'Brackett';
    emRegion = 'Far Infrared (IR)';
  } else {
    seriesName = 'Pfund';
    emRegion = 'Far Infrared (IR)';
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
              <Tag color="cyan">Physics Unit 12</Tag>
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
              Atoms and Spectral Transitions
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electrostatics</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Circular Motion</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2 / year' },
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

      {/* PART 0: DISCOVERY OF SUBATOMIC PARTICLES (Historical Context — Not in IAT Syllabus) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 0</span>
          <h2 className="text-white font-display font-bold text-[17px]">Discovery of Subatomic Particles (Historical Background)</h2>
        </div>
 <p className="text-white/60 text-[13px] leading-relaxed">
          *Note: This historical section provides background context; it is not explicitly tested in the IAT Physics syllabus.*
        </p>

        {/* Discovery details */}
 <div className="grid sm:grid-cols-3 gap-3 text-[11.5px] text-white/70">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <strong className="text-cyan-400 text-[12px] block">Electron (1897)</strong>
            <p>&bull; <strong>Discoverer:</strong> J.J. Thomson</p>
            <p>&bull; <strong>Setup:</strong> Cathode Ray Tube (CRT). Measured charge-to-mass ratio: <code>e/m &asymp; 1.76 &times; 10¹¹ C/kg</code>.</p>
            <p>&bull; <strong>Charge:</strong> Millikan (Oil Drop Experiment, 1909) found <code>e = -1.6 &times; 10⁻¹⁹ C</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <strong className="text-violet-400 text-[12px] block">Proton (1886 / 1919)</strong>
            <p>&bull; <strong>Discoverer:</strong> Goldstein (anode/canal rays); Rutherford named proton in 1919.</p>
            <p>&bull; <strong>Properties:</strong> Positively charged canal rays composed of ions. Mass: <code>m_p &asymp; 1.672 &times; 10⁻²⁷ kg</code>.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <strong className="text-emerald-400 text-[12px] block">Neutron (1932)</strong>
            <p>&bull; <strong>Discoverer:</strong> James Chadwick</p>
            <p>&bull; <strong>Setup:</strong> Bombarded thin Beryllium foil with high-speed &alpha;-particles (He²⁺).</p>
            <p>&bull; <strong>Properties:</strong> Highly penetrating neutral particles of mass <code>m_n &asymp; 1.675 &times; 10⁻²⁷ kg</code>.</p>
          </div>
        </div>
      </div>

      {/* TIMELINE OF MODELS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
            <BookOpen className="w-4 h-4 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Evolution of Atomic Models</h2>
          </div>
          <div className="overflow-x-auto">
 <div className="flex gap-4 pb-2 text-[12px] min-w-[500px]">
              {[
                { year: '1808', name: 'Dalton', desc: 'Indivisible solid sphere model' },
                { year: '1904', name: 'J.J. Thomson', desc: 'Plum pudding model (neutral soup)' },
                { year: '1911', name: 'Rutherford', desc: 'Planetary nuclear model (empty atom)' },
                { year: '1913', name: 'Bohr', desc: 'Quantized orbits & photon transitions' },
                { year: '1924', name: 'de Broglie', desc: 'Standing electron waves (2πr = nλ)' },
                { year: '1926', name: 'Quantum model', desc: 'Schrodinger electron probability clouds' }
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

      {/* PART 1: SCATTERING & NUCLEUS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Rutherford's Scattering &amp; Nuclear Discovery</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Geiger and Marsden bombarded thin gold foil with high-speed alpha particles (He²⁺). Observations showed most particles passed straight, while a tiny fraction rebounded (&gt;90°), demonstrating that mass is concentrated in a tiny positive <strong>nucleus</strong>.
        </p>

        {/* Rutherford Nuclear Model Postulates */}
 <div className="p-4.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📜 Postulates of Rutherford's Nuclear Model</span>
          <ul className="text-white/70 space-y-1.5 list-disc list-inside text-[11.5px] leading-relaxed">
            <li>**Concentrated Positive Charge &amp; Mass:** The entire positive charge and almost all the mass of the atom are concentrated in a extremely small, dense region called the **nucleus**.</li>
            <li>**Electrons Orbiting:** Electrons revolve around the nucleus in circular orbits, just like planets around the Sun. The electrostatic attraction provides the required centripetal force.</li>
            <li>**Mostly Empty Space:** The nucleus size is negligible compared to the atom. The atom is mostly empty space.</li>
          </ul>
          <div className="pt-2 border-t border-white/5 text-white/50 text-[11px]">
            **Scale Comparison:** Atomic radius is <code>~10⁻¹⁰ m</code> (1 Å) while nuclear radius is <code>~10⁻¹⁵ m</code> (1 fm). The atom is <code>10⁵</code> times larger than the nucleus, equivalent to a marble in the center of a sports stadium.
          </div>
        </div>

        <InsightCard title="Thomson's Plum Pudding Model Failure">
          In J.J. Thomson's plum pudding model, positive charge and mass are assumed to be spread uniformly over the entire volume of the atom (&approx; 10⁻¹⁰ m). Under this assumption, the electric fields within the atom are far too weak to deflect the fast alpha particles by more than a fraction of a degree. The experimental observation of deflections up to 180° (rebounding) was completely impossible under Thomson's model, thereby disproving it and proving that the entire positive charge and mass must be concentrated in a tiny nucleus (&approx; 10⁻¹⁵ m).
        </InsightCard>

        <RutherfordScatteringSVG />

        {/* Rebound statistic & Closest Approach Derivation */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2.5">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Scattering Mathematics &amp; Energy Conservation</span>
          <div className="grid sm:grid-cols-2 gap-4 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[12px] block mb-0.5">A. Significance of 1 in 8000 Statistic</strong>
              Geiger-Marsden found that about **1 in 8000** alpha particles was deflected by more than 90° (some by 180°). This rebound statistic mathematically proves that the positive charge is concentrated in a tiny volume, making head-on collisions extremely rare but causing enormous repulsive electric forces when they happen.
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[12px] block mb-0.5">B. Derivation of Closest Approach (r₀)</strong>
              For a head-on collision, initial kinetic energy of alpha particle (<code>K = 1/2 m v²</code>) is completely converted into electrostatic potential energy at the turning point:
              <code className="text-cyan-300 block my-1">K = (1 / 4πε₀) * (q₁ * q₂) / r₀</code>
              Since <code>q₁ = 2e</code> (alpha particle) and <code>q₂ = Ze</code> (gold nucleus):
              <code className="text-cyan-300 block my-1">K = (1 / 4πε₀) * (2Ze² / r₀)  ⟹  r₀ = (1 / 4πε₀) * (2Ze² / K)</code>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="r₀ = (1 / 4πε₀) * (2 Z e² / K)"
            use="Distance of Closest Approach (Head-on collision)"
            note="K is the initial kinetic energy of the alpha particle. Establishes the upper limit of the nuclear size."
            priority={5}
          />
          <FormulaCard
            formula="b = [Z e² cot(θ / 2)] / [4πε₀ K]"
            use="Impact Parameter (b)"
            note="b is perpendicular distance from the nucleus axis. If b = 0, θ = 180° (rebound). Large b gives minimal deflection."
            priority={5}
          />
        </div>

        {/* Failure of Rutherford's Model */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">⚠️ Failure of Rutherford's Model (Classical Instability)</span>
          <p className="text-white/70 text-[11px] leading-relaxed">
            According to electromagnetic theory, an accelerating charged particle (like an electron revolving in circular orbits) must continuously radiate electromagnetic energy. As it radiates, its energy decreases, causing the orbit radius to shrink continuously.
            Ultimately, the electron must **spiral into the nucleus within 10⁻⁸ seconds**. Thus, Rutherford's classical model cannot explain atomic stability or why atoms emit discrete line spectra instead of continuous ones.
          </p>
        </div>

        <InsightCard title="Scattering statistics">
          The number of scattered particles <strong>N(θ)</strong> detected at angle <strong>θ</strong> varies as:
          <br />
          <code className="text-cyan-300 font-bold">N(θ) ∝ 1 / sin⁴(θ/2)</code>.
          <br />
          This drop-off is extremely steep; very few particles bounce back.
        </InsightCard>
      </div>

      {/* PART 2: BOHR POSTULATES & RADIUS/ENERGY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Bohr's Quantized Model &amp; Parameter Equations</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Bohr resolved Rutherford's classical model instability (where accelerating electrons should radiate energy and spiral into the nucleus) by introducing three postulates of quantization.
        </p>

        {/* Bohr's Three Postulates */}
 <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Bohr's Three Postulates (Formal Statements)</strong>
          <p>&bull; <strong>1. Postulate of Stationary Orbits:</strong> An electron in an atom can revolve in certain stable, non-radiating circular orbits without emitting electromagnetic energy, contrary to classical theory.</p>
          <p>&bull; <strong>2. Postulate of Quantization (Bohr's Second Postulate):</strong> The electron revolves only in those orbits where the orbital angular momentum (<code>L = mvr</code>) is an integral multiple of <code>h / 2π</code>:
            <code className="text-cyan-300 block my-1">m v r = n h / 2π  (where n = 1, 2, 3...)</code>
          </p>
          <p>&bull; <strong>3. Postulate of Transitions (Bohr's Frequency Condition):</strong> Emission or absorption of energy occurs only when an electron jumps from one non-radiating orbit to another. The frequency <code>ν</code> of the emitted/absorbed photon is:
            <code className="text-cyan-300 block my-1">hν = E_i − E_f</code>
          </p>
        </div>

        {/* Applicability to Hydrogenic Atoms */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-1.5">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⚛️ Applicability &amp; Ground State Facts</span>
          <p className="text-white/70 text-[11px] leading-relaxed">
            &bull; **Hydrogenic (Single-Electron) Species:** The Bohr model is strictly applicable only to H-like atoms/ions having exactly one electron: **H, He⁺ (Z=2), Li²⁺ (Z=3), Be³⁺ (Z=4)**, etc.
            <br />
            &bull; **Ground State Energy:** For hydrogen (Z=1, n=1), the ground state energy is a constant:
            <code className="text-cyan-300 block my-1">E₁ = −13.6 eV</code>
          </p>
        </div>

        {/* Bohr Orbit Parameter Derivations */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📐 Step-by-Step Bohr Derivations</span>
          <div className="grid sm:grid-cols-3 gap-3 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-2.5 rounded border border-white/5 space-y-1">
              <strong className="text-white block">1. Bohr Radius (<i>r_n</i>) Derivation</strong>
              Equate Coulomb force to centripetal force:
              <code>k Z e² / r² = m v² / r ⟹ v² = k Z e² / (m r)</code>.
              <br />
              From angular momentum:
              <code>v = n h / (2π m r)</code>.
              <br />
              Substitute <i>v</i>:
              <code>n²h² / (4π²m²r²) = k Z e² / (m r)</code>.
              <br />
              Solve for <i>r</i>:
              <code className="text-cyan-300 font-bold block my-1">r_n = ε₀h²n² / (πmZe²) = 0.529 (n²/Z) Å</code>
            </div>
            
            <div className="bg-black/35 p-2.5 rounded border border-white/5 space-y-1">
              <strong className="text-white block">2. Velocity (<i>v_n</i>) Derivation</strong>
              Substitute the radius <i>r_n</i> expression into the angular momentum equation:
              <code>v = n h / (2π m r_n)</code>.
              <br />
              This yields:
              <code>v_n = Z e² / (2 ε₀ h n)</code>.
              <br />
              Evaluating constants:
              <code className="text-cyan-300 font-bold block my-1">v_n = 2.18 × 10⁶ (Z/n) m/s</code>
              Notice: <code>v_n ∝ Z / n</code>.
            </div>

            <div className="bg-black/35 p-2.5 rounded border border-white/5 space-y-1">
              <strong className="text-white block">3. Orbit Energy (<i>E_n</i>) Derivation</strong>
              Kinetic Energy is:
              <code>KE = ½ m v² = k Z e² / (2r)</code>.
              <br />
              Electrostatic Potential Energy is:
              <code>PE = −k Z e² / r</code>.
              <br />
              Total Energy is:
              <code>TE = KE + PE = −k Z e² / (2r)</code>.
              <br />
              Substitute <i>r_n</i>:
              <code className="text-cyan-300 font-bold block my-1">E_n = −m Z² e⁴ / (8 ε₀² h² n²) = −13.6 (Z²/n²) eV</code>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="r_n = 0.529 * (n² / Z) Å"
            use="Bohr Radius of nth orbit"
            note="Radius is proportional to n² / Z. Ground state radius of Hydrogen (Z=1, n=1) is a₀ = 0.529 Å."
            priority={5}
          />
          <FormulaCard
            formula="v_n = 2.18 * 10⁶ * (Z / n) m/s"
            use="Electron velocity in nth orbit"
            note="Velocity decreases as orbit number n increases. Velocity scales as Z / n."
            priority={5}
          />
          <FormulaCard
            formula="E_n = −13.6 * (Z² / n²) eV"
            use="Total Energy of bound electron"
            note="Total Energy is negative, denoting a bound state in a potential well. E scales as Z² / n²."
            priority={5}
          />
          <FormulaCard
            formula="TE = −KE = PE / 2"
            use="Energy Proportionality relations"
            note="If TE = -3.4 eV, then KE = +3.4 eV and PE = -6.8 eV. Very common in IAT MCQs!"
            priority={5}
          />
        </div>
        {/* Bohr Model Limitations Card */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider block">⚠️ Limitations of the Bohr Model (NCERT Essentials)</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[13px] block mb-1">A. Spectral &amp; Relativistic Limits</strong>
              <p>
                &bull; <strong className="text-white">Multi-Electron Atoms:</strong> Applicable strictly to single-electron hydrogenic atoms/ions (H, He⁺, Li²⁺). Cannot explain spectra of multi-electron systems.
                <br />
                &bull; <strong className="text-white">Relative Intensities:</strong> Cannot predict why some spectral lines are brighter/more intense than others.
                <br />
                &bull; <strong className="text-white">Fine Structure:</strong> Fails to explain the doublets/triplets (splitting of spectral lines observed with high resolution).
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-white text-[13px] block mb-1">B. Quantum &amp; Field Limits</strong>
              <p>
                &bull; <strong className="text-white">Heisenberg Violation:</strong> Assumes electrons possess well-defined, precise positions (radius) and velocities simultaneously, violating the Uncertainty Principle.
                <br />
                &bull; <strong className="text-white">Zeeman &amp; Stark Effects:</strong> Fails to explain the splitting of spectral lines under external magnetic fields (Zeeman effect) or electric fields (Stark effect).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PART 3: HYDROGEN SPECTRA & de BROGLIE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Hydrogen Spectral Series &amp; de Broglie Standing Waves</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The wave nature of electrons explains Bohr's empirical quantization rule: stable circular orbits must match the electron's standing de Broglie wavelength to prevent destructive interference.
        </p>
        <BohrStandingWaveSVG />

        {/* Continuous vs Line & Absorption vs Emission Spectra */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">📊 General Atomic Spectra &amp; Types</span>
          <div className="grid sm:grid-cols-2 gap-4 text-[11px] leading-relaxed text-white/70">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[12px] block mb-0.5">A. Continuous vs. Line Spectra</strong>
              &bull; **Continuous Spectrum:** Contains radiation of all wavelengths in a range (e.g., light from hot incandescent solids like bulb filaments). Shows smooth gradients of color without breaks.
              <br />
              &bull; **Line Spectrum:** Contains only discrete, specific wavelengths with sharp boundaries (e.g., light emitted from excited gaseous atoms). Since energy levels in atoms are quantized, gas discharges emit distinct lines.
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[12px] block mb-0.5">B. Emission vs. Absorption Spectra</strong>
              &bull; **Emission Spectrum:** Bright colored lines against a dark background, produced when excited gaseous atoms drop from high to low energy levels.
              <br />
              &bull; **Absorption Spectrum:** Dark lines crossing a continuous spectrum, produced when white light passes through a cool gas. Sun's atmosphere shows **Fraunhofer lines** due to gaseous absorption. The Lyman series is seen in hydrogen's absorption spectrum (since ground state electrons absorb from n = 1).
            </div>
          </div>
        </div>

        <HydrogenTransitionsSVG />

        {/* Spectral Series & Limit definitions */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white block mb-0.5">⛓️ Series Limit Definition</strong>
          The **series limit** of any spectral series corresponds to the shortest wavelength (highest energy photon) emitted in that series. It is calculated by setting the initial orbit number to infinity:
          <code className="text-cyan-300 block my-1">1 / λ_limit = R * Z² / n₁²  (since 1 / n₂² = 1 / ∞ = 0)</code>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <FormulaCard
            formula="1/λ = R Z² (1/n₁² − 1/n₂²)"
            use="Rydberg Formula for transition wavelengths"
            note="R is Rydberg Constant ≈ 1.097 * 10⁷ m⁻¹ (hcR = 13.6 eV). For longest wavelength, choose smallest jump. For shortest (series limit), set n₂ = ∞."
            priority={5}
          />
          <FormulaCard
            formula="N = n (n − 1) / 2"
            use="Total number of spectral lines emitted"
            note="Calculates the number of possible transition lines when electrons de-excite from the nth state back to the ground state (n₁ = 1)."
            priority={5}
          />
          <FormulaCard
            formula="2π r = n λ"
            use="de Broglie standing wave condition"
            note="Substituting λ = h/mv immediately derives Bohr's angular momentum rule: mvr = nh/2π."
            priority={5}
          />
        </div>

        {/* Series table */}
        <div className="space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 block">📊 Spectral Series of Hydrogen (Z = 1)</span>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
 <table className="w-full text-[12px] min-w-[480px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
                  <th className="text-left px-4 py-2">Series</th>
                  <th className="text-left px-4 py-2">Final n₁</th>
                  <th className="text-left px-4 py-2">Initial n₂</th>
                  <th className="text-left px-4 py-2 text-cyan-300">EM Spectrum Region</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Lyman', '1', '2, 3, 4 ... ∞', 'Ultraviolet (UV)'],
                  ['Balmer', '2', '3, 4, 5 ... ∞', 'Visible Light'],
                  ['Paschen', '3', '4, 5, 6 ... ∞', 'Near Infrared (IR)'],
                  ['Brackett', '4', '5, 6, 7 ... ∞', 'Far Infrared (IR)'],
                  ['Pfund', '5', '6, 7, 8 ... ∞', 'Far Infrared (IR)'],
                ].map(([ser, n1, n2, reg]) => (
                  <tr key={ser} className="border-b border-white/5 last:border-0 text-white/70">
                    <td className="px-4 py-2 font-semibold text-white/85">{ser}</td>
                    <td className="px-4 py-2 text-cyan-300">{n1}</td>
                    <td className="px-4 py-2 text-violet-300">{n2}</td>
                    <td className="px-4 py-2">{reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 4: QUANTUM MECHANICAL MODEL (BEYOND IAT PHYSICS SYLLABUS — CHEMISTRY/NCERT SUPPLEMENT ONLY) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Quantum Mechanical Model (Chemistry Supplement Only)</h2>
        </div>
        
        {/* Off-syllabus warning banner */}
 <div className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/15 text-[11.5px] text-rose-300 leading-relaxed">
          <strong>⚠️ SYLLABUS WARNING:</strong> The following section on Orbitals, Quantum Numbers, and Electronic Configurations (Aufbau, Pauli, Hund's, Anomalous configurations) is NOT in the official IAT Physics syllabus. It is included here solely as a Chemistry/NCERT supplement. Feel free to skip this for the physics portion.
        </div>

        <p className="text-white/60 text-[13px] leading-relaxed">
          The modern quantum model replaces fixed classical trajectories (orbits) with electron probability clouds (orbitals) defined by Schrödinger's wave function (ψ).
        </p>

        {/* Orbit vs Orbital Box */}
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-3.5 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Core Concept: Orbit vs Orbital</strong>
          <p>&bull; <strong>Orbit:</strong> A well-defined circular pathway of the electron around the nucleus (Bohr model). Implies exact simultaneously known coordinates, violating Heisenberg's principle.</p>
          <p>&bull; <strong>Orbital:</strong> A 3D region of space around the nucleus where the probability of finding the electron is maximum (indicated by ψ² ≥ 90%). Explains the uncertainty nature of subatomic matter waves.</p>
          <p>&bull; <strong>Radial and Angular Nodes:</strong> Points in space where the probability of finding an electron is exactly zero.
            <br />
            &mdash; <i>Radial nodes (spherical)</i> = <code><i>n</i> - <i>l</i> - 1</code>
            <br />
            &mdash; <i>Angular nodes (planes/cones)</i> = <code><i>l</i></code>
            <br />
            &mdash; <i>Total nodes</i> = <code><i>n</i> - 1</code> (the sum of radial and angular nodes).
          </p>
        </div>

        {/* Quantum Numbers Address Guide */}
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-3 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Electron Address Parameters (Quantum Numbers)</strong>
          <p>&bull; <strong>Principal Quantum Number (<i>n</i>):</strong> Identifies shell energy and size. Allowed values: <code><i>n</i> = 1, 2, 3, ...</code>. Shell capacity is <code>2<i>n</i>²</code> electrons.</p>
          <p>&bull; <strong>Azimuthal Quantum Number (<i>l</i>):</strong> Defines subshell shape and orbital angular momentum: <code><i>L</i> = &radic;[<i>l</i>(<i>l</i>+1)] &middot; ^h&frasl;_2&pi;</code>. Allowed values: <code>0 &le; <i>l</i> &le; <i>n</i>-1</code> (s=0, p=1, d=2, f=3).</p>
          <p>&bull; <strong>Magnetic Quantum Number (<i>m</i>_l):</strong> Identifies spatial orientation of orbitals. Allowed values: <code>-<i>l</i> &le; <i>m</i>_l &le; +<i>l</i></code> (totaling <code>2<i>l</i>+1</code> degenerate orbitals per subshell).</p>
          <p>&bull; <strong>Spin Quantum Number (<i>m</i>_s):</strong> Spin state direction. Allowed values: <code>&plusmn;^1&frasl;_2</code> (spin up or spin down).</p>
        </div>

        {/* Filling Rules */}
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-3.5 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Governing Filling Rules</strong>
          <p>&bull; <strong>Aufbau Principle:</strong> Orbitals are filled in increasing order of energy, matching the <code>(n+l)</code> rule. If <code>(n+l)</code> values are identical, the orbital with the lower <code>n</code> is filled first.</p>
          <p>&bull; <strong>Pauli Exclusion Principle:</strong> An orbital can hold at most 2 electrons with opposite spins. No two electrons in an atom can have the same set of four quantum numbers.</p>
          <p>&bull; <strong>Hund's Rule of Maximum Multiplicity:</strong> Degenerate orbitals are singly filled with parallel spins before electron pairing starts, minimizing electrostatic repulsion.</p>
        </div>

        {/* Shapes of Orbitals */}
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 space-y-2 text-[12px] text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔑 Shapes of Orbitals</strong>
          <p>&bull; <strong>s-orbitals (l=0):</strong> Spherical, non-directional.</p>
          <p>&bull; <strong>p-orbitals (l=1):</strong> Dumbbell shaped, directional along orthogonal axes (p_x, p_y, p_z).</p>
          <p>&bull; <strong>d-orbitals (l=2):</strong> Double dumbbell shaped (d_xy, d_yz, d_zx, d_x&sup2;-y&sup2;), except d_z&sup2; which is a dumbbell with a central donut-like ring.</p>
        </div>

        {/* Anomalous configs */}
 <div className="p-4.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-2 text-[12px] text-white/70">
          <strong className="text-cyan-400 text-[13px] block">⭐ Anomalous Configurations (Ground-state stability)</strong>
          <p>&bull; Chromium (Cr, Z=24): <code>[Ar] 3<i>d</i>⁵ 4<i>s</i>¹</code> (not 3<i>d</i>⁴ 4<i>s</i>&sup2;)</p>
          <p>&bull; Copper (Cu, Z=29): <code>[Ar] 3<i>d</i>¹⁰ 4<i>s</i>¹</code> (not 3<i>d</i>⁹ 4<i>s</i>&sup2;)</p>
          <p>&bull; These arise due to the extra stability of symmetric half-filled and fully-filled degenerate subshells which maximize exchange energies.</p>
        </div>
      </div>

      {/* PART 5: BOHR PARAMETER INTERACTIVE CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Bohr Parameter Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Select element species and orbit number n to calculate orbital radius, electron velocity, and energy values.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Select Element Species:</label>
            <select
              value={elementZ} onChange={e => setElementZ(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="1" className="bg-[#0A0C18]">Hydrogen (Z=1)</option>
              <option value="2" className="bg-[#0A0C18]">Helium Ion He+ (Z=2)</option>
              <option value="3" className="bg-[#0A0C18]">Lithium Ion Li2+ (Z=3)</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Orbit Number (n): {orbitN}</label>
            <input
              type="range" min="1" max="10" step="1"
              value={orbitN} onChange={e => setOrbitN(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 mt-2"
            />
          </div>
        </div>
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-[13px] text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">Radius r_n</span>
            <p className="text-[14.5px] font-bold text-cyan-400 my-1">{radiusNm.toFixed(4)} nm</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">Velocity v_n</span>
            <p className="text-[14.5px] font-bold text-violet-400 my-1">{(velocityMs / 1e6).toFixed(3)} * 10⁶ m/s</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-white/35">Total Energy E_n</span>
            <p className="text-[14.5px] font-bold text-rose-400 my-1">{totalEnergyEv.toFixed(2)} eV</p>
          </div>
        </div>
      </div>

      {/* PART 6: INTERACTIVE HYDROGEN TRANSITION SPECTROMETER */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Hydrogen Transition Spectrometer</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Select electron transition jump (Initial n₂ &rarr; Final n₁) to compute emitted photon characteristics.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Final Orbit (n₁):</label>
            <select
              value={spectrometerN1} onChange={e => {
                setSpectrometerN1(e.target.value);
                const newN1 = parseInt(e.target.value);
                const currentN2 = spectrometerN2 === 'inf' ? Infinity : parseInt(spectrometerN2);
                if (currentN2 <= newN1) {
                  setSpectrometerN2(String(newN1 + 1));
                }
              }}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="1" className="bg-[#0A0C18]">n=1 (Lyman Series)</option>
              <option value="2" className="bg-[#0A0C18]">n=2 (Balmer Series)</option>
              <option value="3" className="bg-[#0A0C18]">n=3 (Paschen Series)</option>
              <option value="4" className="bg-[#0A0C18]">n=4 (Brackett Series)</option>
              <option value="5" className="bg-[#0A0C18]">n=5 (Pfund Series)</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Initial Orbit (n₂):</label>
            <select
              value={spectrometerN2} onChange={e => setSpectrometerN2(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              {Array.from({ length: 6 }).map((_, i) => {
                const optVal = n1 + 1 + i;
                if (optVal > 8) return null;
                return (
                  <option key={optVal} value={String(optVal)} className="bg-[#0A0C18]">n={optVal}</option>
                );
              })}
              <option value="inf" className="bg-[#0A0C18]">n=∞ (Series Limit)</option>
            </select>
          </div>
        </div>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-[13px] text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">Energy Change (ΔE)</span>
            <p className="text-[14.5px] font-bold text-cyan-400 my-1">{transitionEnergyEv.toFixed(3)} eV</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">Wavelength (λ)</span>
            <p className="text-[14.5px] font-bold text-violet-400 my-1">{wavelengthNm.toFixed(1)} nm</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">Series Name</span>
            <p className="text-[14.5px] font-bold text-emerald-400 my-1">{seriesName}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-white/35">EM Band</span>
            <p className="text-[14.5px] font-bold text-amber-400 my-1">{emRegion}</p>
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
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Transition Recoil Momentum</span>
          <p className="text-white/80">A stationary hydrogen atom in the ground state absorbs a photon of energy 12.09 eV, exciting the electron. Calculate: (a) the excited state orbit number, and (b) the recoil momentum of the atom when the electron jumps back to the ground state.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Excited state: <code>E = E₁ + 12.09 eV = -13.6 + 12.09 = -1.51 eV</code>. This corresponds exactly to <code>n = 3</code> (2nd excited state).</p>
            <p>2. Recoil momentum: By conservation of linear momentum (Newton's 3rd Law), when the atom emits a photon of energy E, the photon carries momentum <code>p = E/c</code> forward, causing the atom to recoil with equal and opposite momentum: <code>p_recoil = E / c</code>.</p>
            <p>3. Convert energy to Joules: <code>E = 12.09 * 1.6 * 10⁻¹⁹ J = 1.934 * 10⁻¹⁸ J</code>.</p>
            <p>4. Momentum: <code>p_recoil = 1.934 * 10⁻¹⁸ / (3 * 10⁸) = 6.45 * 10⁻²⁷ kg·m/s</code>.</p>
            <p className="text-cyan-300 font-bold">Orbit Number n = 3 | Recoil Momentum = 6.45 * 10⁻²⁷ kg·m/s</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Orbit Radii Comparison</span>
          <p className="text-white/80">Compare the radius of the ground state orbit of a Hydrogen atom with the radius of the 2nd Bohr orbit of a Singly-Ionized Helium ion (He+).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Radius formula: <code>r ∝ n² / Z</code>.</p>
            <p>2. For Hydrogen (Z=1, n=1): <code>r_H ∝ 1² / 1 = 1</code>.</p>
            <p>3. For Helium Ion He+ (Z=2, n=2): <code>r_He ∝ 2² / 2 = 2</code>.</p>
            <p>4. Ratio: <code>r_H / r_He = 1 / 2</code>. Thus, the radius of the He+ orbit is exactly twice that of the ground state H-atom.</p>
            <p className="text-cyan-300 font-bold">r_H / r_He = 1 : 2</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Time Period &amp; Frequency Ratios</span>
          <p className="text-white/80">Find the ratio of the frequency of revolution of an electron in the ground state of Hydrogen to the 2nd excited state of a Doubly-Ionized Lithium ion (Li2+).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Frequency relation: <code>f = 1/T = v / 2πr ∝ Z² / n³</code>.</p>
            <p>2. For Hydrogen (Z=1, n=1): <code>f_H ∝ 1² / 1³ = 1</code>.</p>
            <p>3. For Lithium Ion Li2+ (Z=3, n=3 because 2nd excited state means n=3): <code>f_Li ∝ 3² / 3³ = 9 / 27 = 1/3</code>.</p>
            <p>4. Ratio: <code>f_H / f_Li = 1 / (1/3) = 3</code>.</p>
            <p className="text-cyan-300 font-bold">f_H / f_Li = 3 : 1</p>
          </div>
        </div>

        {/* Example 4: Number of Spectral Lines */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 4: Spectral Lines Emission</span>
          <p className="text-white/80">A sample of hydrogen atoms is excited to the n = 4 state. Find the total number of spectral lines that can be observed in the emission spectrum as they return to the ground state. Also identify the series to which these lines belong.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Formula: <code>N = n(n − 1) / 2 = 4(3) / 2 = 6 lines</code>.</p>
            <p>2. Transitions mapping:</p>
            <p>&bull; **Lyman Series (n₁ = 1):** 3 lines (<code>4 &rarr; 1, 3 &rarr; 1, 2 &rarr; 1</code>)</p>
            <p>&bull; **Balmer Series (n₁ = 2):** 2 lines (<code>4 &rarr; 2, 3 &rarr; 2</code>)</p>
            <p>&bull; **Paschen Series (n₁ = 3):** 1 line (<code>4 &rarr; 3</code>)</p>
            <p className="text-cyan-300 font-bold">Total = 6 lines (3 UV, 2 Visible, 1 Infrared)</p>
          </div>
        </div>

        {/* Example 5: Distance of Closest Approach */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 5: Distance of Closest Approach</span>
          <p className="text-white/80">In a Geiger-Marsden experiment, an alpha particle of energy 7.7 MeV is scattered head-on by a gold nucleus (Z = 79). Calculate the distance of closest approach.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Initial KE in Joules: <code>K = 7.7 MeV = 7.7 * 10⁶ * 1.6 * 10⁻¹⁹ J = 1.232 * 10⁻¹² J</code>.</p>
            <p>2. Closest approach formula: <code>r₀ = (1 / 4&pi;&epsilon;₀) * (2 Z e² / K)</code>.</p>
            <p>3. Substitute values (<code>k = 9 * 10⁹ N·m²/C²</code>, <code>e = 1.6 * 10⁻¹⁹ C</code>):</p>
            <p><code>r₀ = 9 * 10⁹ * [2 * 79 * (1.6 * 10⁻¹⁹)²] / (1.232 * 10⁻¹²)</code></p>
            <p><code>r₀ = [9 * 10⁹ * 158 * 2.56 * 10⁻³⁸] / (1.232 * 10⁻¹²) ≈ 2.95 * 10⁻¹⁴ m = 29.5 fm</code>.</p>
            <p className="text-cyan-300 font-bold">Distance of Closest Approach r₀ ≈ 29.5 fm (approx 30 fm)</p>
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
            { id: 'rutherford', label: '📊 Alpha Scattering Limits' },
            { id: 'transitions', label: '💡 Wavelength & Rydberg' },
            { id: 'proportionality', label: '⚙️ Proportionality Ratios' },
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
          {selectedGoal === 'rutherford' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Rutherford alpha scattering</span>
              <p className="text-white/70">1. Closest approach distance: <code>r₀ = (1/4&pi;&epsilon;₀)(2Ze²/K)</code>.</p>
              <p className="text-white/70">2. Impact parameter deflection: <code>b = [Ze² cot(&theta;/2)] / [4&pi;&epsilon;₀ K]</code>.</p>
              <p className="text-white/70">3. Rebound statistics: <code>N(&theta;) &prop; 1/sin⁴(&theta;/2)</code>.</p>
            </>
          )}
          {selectedGoal === 'transitions' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Rydberg spectral wavelength</span>
              <p className="text-white/70">1. Rydberg formula: <code>1/&lambda; = R Z² (1/n₁² - 1/n₂²)</code>.</p>
              <p className="text-white/70">2. Maximum energy transition (series limit): <code>n₂ = &infin;</code>.</p>
              <p className="text-white/70">3. Total spectral lines: <code>N = n(n-1)/2</code>.</p>
            </>
          )}
          {selectedGoal === 'proportionality' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Bohr Orbit parameters comparison</span>
              <p className="text-white/70">1. Radius ratio: <code>r₁/r₂ = (n₁/n₂)² * (Z₂/Z₁)</code>.</p>
              <p className="text-white/70">2. Velocity ratio: <code>v₁/v₂ = (Z₁/Z₂) * (n₂/n₁)</code>.</p>
              <p className="text-white/70">3. Revolution frequency ratio: <code>f₁/f₂ = (Z₁/Z₂)² * (n₂/n₁)³</code>.</p>
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
            { cue: '"Singly ionized Helium (He+) or doubly ionized Lithium (Li2+)"', think: "Bohr formulas only apply to single-electron species. You MUST keep Z factors (Z=2 for He+, Z=3 for Li2+)." },
            { cue: '"Series limit or shortest wavelength"', think: "Transition initial orbit is n₂ = ∞ (E_initial = 0)." },
            { cue: '"Find the total number of spectral lines emitted"', think: "Use the transition lines formula: N = n(n-1)/2." },
            { cue: '"Find the recoil velocity of the hydrogen atom"', think: "Use momentum conservation: m_atom * v_recoil = E_photon / c." },
            { cue: '"Total energy is -1.51 eV"', think: "The electron is in n = 3 orbit. Kinetic energy is +1.51 eV, Potential energy is -3.02 eV." },
            { cue: '"Second excited state"', think: "Corresponds to quantum number n = 3 (ground state is n=1, 1st excited state is n=2)." },
            { cue: '"Absorption spectrum of hydrogen gas at room temp"', think: "Only Lyman series lines are observed, because at room temperature, all electrons reside in the n=1 ground state." },
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
          <TrapCard title="Trap 1: The Z² Factor in Energy">
            When calculating the energy levels of Helium or Lithium ions, do not forget to multiply by <code>Z²</code>. E.g. for ground state of He+ (Z=2), <code>E₁ = -13.6 * 2² = -54.4 eV</code>, not -13.6 eV.
          </TrapCard>
          <TrapCard title="Trap 2: Longest Wavelength vs. Shortest Wavelength">
            Longest wavelength corresponds to **minimum energy change** (shortest jump, e.g. <code>n = 3 &rarr; 2</code> for Balmer). Shortest wavelength (series limit) corresponds to **maximum energy change** (from <code>n = ∞ &rarr; 2</code>).
          </TrapCard>
          <TrapCard title="Trap 3: Excited state numbering vs. Orbit quantum number">
            The 1st excited state is <code>n = 2</code>. The 2nd excited state is <code>n = 3</code>. Always add 1 to the excited state label to find the correct quantum number <code>n</code>.
          </TrapCard>
          <TrapCard title="Trap 4: Recoil Momentum units">
            Do not divide energy in eV by speed of light <code>c</code> to find momentum! Energy must be converted to **Joules** first: <code>p = (E_eV * 1.6 * 10⁻¹⁹) / c</code>.
          </TrapCard>
          <TrapCard title="Trap 5: Rutherford scattering angular dependence">
            Be careful with the <code>N(θ) ∝ 1 / sin⁴(θ/2)</code> relation. If comparing values at θ₁ = 60° and θ₂ = 120°, remember θ/2 is 30° and 60°. So: <code>N(60°) / N(120°) = sin⁴(60°) / sin⁴(30°) = (√3/2 / 1/2)⁴ = 9 : 1</code>.
          </TrapCard>
          <TrapCard title="Trap 6: Absorption lines at room temperature">
            Do not assume hydrogen gas at room temp can absorb Balmer lines! At room temp, electrons are exclusively in ground state (n = 1), so they can only absorb photons of the **Lyman series** (UV light).
          </TrapCard>
        </div>
      </div>

      {/* NEXT STEPS IN MODERN PHYSICS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
 <div className="relative z-10 text-[13px]">
          <div className="flex items-center gap-2.5 mb-3">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">Where This Leads Next</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/80 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10 font-bold">Atoms (Unit 12)</span>
            <span className="text-white/30">&rarr;</span>
            <span className="text-white/50 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Nuclei &amp; Binding Energy (Unit 13)</span>
            <span className="text-white/30">&rarr;</span>
            <span className="text-white/50 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Semiconductors (Unit 14)</span>
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
            "Rutherford nucleus discovery: 1 in 8000 alphas rebounded (Gold Foil), proving mass concentration",
            "Sizes: Atomic radius is ~10⁻¹⁰ m; nuclear radius is ~10⁻¹⁵ m (scale difference of 10⁵)",
            "Closest approach: PE = KE, r₀ = (1/4πε₀)(2Ze²/K) for head-on alpha collisions",
            "Impact parameter b: perpendicular offset distance. b=0 means θ=180° (rebound)",
            "Rutherford model failure: accelerating charges must radiate energy and spiral into nucleus",
            "Bohr angular momentum rule: mvr = nh/2π (Quantization postulate)",
            "Hydrogenic atoms: Bohr model is strictly for single-electron species (H, He⁺, Li²⁺)",
            "Bohr parameters derivations: r_n ∝ n²/Z, v_n ∝ Z/n, E_n ∝ Z²/n²",
            "Bohr radius: r_n = 0.529 (n²/Z) Å",
            "Electron velocity: v_n = 2.18 * 10⁶ (Z/n) m/s",
            "Bound electron energy: E_n = -13.6 (Z²/n²) eV, with E₁ = -13.6 eV for hydrogen",
            "Energy shortcut relation: TE = -KE = PE / 2",
            "Spectra types: Line spectra (excited gas emission) vs continuous spectra (incandescent solids)",
            "Absorption vs emission: Absorption shows dark lines on continuous spectrum (Lyman only at room temp)",
            "Rydberg formula: 1/λ = R Z² (1/n₁² - 1/n₂²)",
            "Series limit: shortest wavelength in a series, calculated by setting n₂ = ∞",
            "de Broglie standing waves: 2πr = nλ (constructive wave orbit loop)",
            "Spectral lines emitted: N = n(n-1)/2 transitions from state n to ground state",
            "Series destinations: Lyman (n₁=1, UV), Balmer (n₁=2, visible), Paschen (n₁=3, IR)",
            "Radial nodes: n-l-1, Angular nodes: l, Total nodes: n-1 (Quantum Mechanics)",
            "Aufbau energy ordering: 1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p",
            "Pauli Exclusion rule: no identical 4 quantum number sets per electron",
            "Hund's rule of maximum multiplicity: degenerate single filling first",
            "Anomalous configs: Cr [Ar]3d⁵4s¹ and Cu [Ar]3d¹⁰4s¹ stability"
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