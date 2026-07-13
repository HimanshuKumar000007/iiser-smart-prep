import React, { useState } from 'react';
import { Star, AlertTriangle, CheckCircle, BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: BINDING ENERGY PER NUCLEON CURVE ──────────────────────────────────
function BindingEnergyCurveSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Binding Energy per Nucleon (BE/A) vs. Mass Number (A)</p>
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 150 }}>
        {/* Y Axis (BE/A in MeV) */}
        <line x1="35" y1="10" x2="35" y2="140" stroke="#475569" strokeWidth="1.5" />
        <text x="12" y="75" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" transform="rotate(-90 12 75)" textAnchor="middle">BE/A (MeV)</text>
        
        {/* Y Axis Ticks */}
        {[0, 2, 4, 6, 8, 9].map(val => (
          <g key={val}>
            <line x1="31" y1={140 - val * 13} x2="35" y2={140 - val * 13} stroke="#475569" />
            <text x="25" y={143 - val * 13} fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="end">{val}</text>
          </g>
        ))}

        {/* X Axis (Mass Number A) */}
        <line x1="35" y1="140" x2="320" y2="140" stroke="#475569" strokeWidth="1.5" />
        <text x="177" y="154" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">Mass Number (A)</text>
        
        {/* X Axis Ticks */}
        {[0, 50, 100, 150, 200, 250].map(val => (
          <g key={val}>
            <line x1={35 + val * 1.1} y1="140" x2={35 + val * 1.1} y2="144" stroke="#475569" />
            <text x={35 + val * 1.1} y="151" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{val}</text>
          </g>
        ))}

        {/* Stability Curve Path */}
        {/* Starts low at H, spikes at He-4, drops, spikes at C-12, drops, spikes at O-16, peaks at Fe-56, then drops slowly */}
        <path
          d="
            M 36 138 
            Q 38 100 39 88
            Q 41 125 43 115
            L 47 70
            L 51 90
            L 57 58
            L 61 78
            L 66 52
            Q 75 60 85 45
            Q 96.6 25 96.6 25
            Q 145 32 200 42
            Q 255 48 297 50
          "
          fill="none" stroke="#22d3ee" strokeWidth="2.2"
        />

        {/* Highlight points */}
        {/* 4He */}
        <circle cx="47" cy="70" r="2" fill="#f43f5e" />
        <text x="44" y="66" fill="#f43f5e" fontSize="6.5" fontFamily="monospace">⁴He</text>

        {/* 12C */}
        <circle cx="57" cy="58" r="2" fill="#fb923c" />
        <text x="59" y="54" fill="#fb923c" fontSize="6.5" fontFamily="monospace">¹²C</text>

        {/* 16O */}
        <circle cx="66" cy="52" r="2" fill="#38bdf8" />
        <text x="68" y="48" fill="#38bdf8" fontSize="6.5" fontFamily="monospace">¹⁶O</text>

        {/* 56Fe (Iron peak) */}
        <circle cx="96.6" cy="25" r="3" fill="#34d399" />
        <text x="96.6" y="17" fill="#34d399" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">⁵⁶Fe (8.8 MeV)</text>

        {/* 238U */}
        <circle cx="297" cy="50" r="2.5" fill="#fb923c" />
        <text x="297" y="44" fill="#fb923c" fontSize="7" fontFamily="monospace" textAnchor="middle">²³⁸U</text>

        {/* Process Indicators */}
        <text x="65" y="105" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">← Fusion</text>
        <text x="240" y="105" fill="#fb923c" fontSize="8" fontFamily="monospace" textAnchor="middle">Fission →</text>
      </svg>
    </div>
  );
}

// ─── SVG 2: EXPONENTIAL RADIOACTIVE DECAY CURVE ────────────────────────────────
function RadioactiveDecaySVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Exponential Decay: Remaining Nuclei vs. Half-Lives</p>
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 130 }}>
        {/* Y Axis (N/N0) */}
        <line x1="40" y1="10" x2="40" y2="130" stroke="#475569" strokeWidth="1.5" />
        <text x="15" y="70" fill="#94a3b8" fontSize="8" fontFamily="monospace" transform="rotate(-90 15 70)" textAnchor="middle">Quantity (N/N₀)</text>
        
        {/* Y ticks */}
        {[
          { label: 'N₀', val: 120 },
          { label: 'N₀/2', val: 60 },
          { label: 'N₀/4', val: 30 },
          { label: 'N₀/8', val: 15 }
        ].map(tick => (
          <g key={tick.label}>
            <line x1="36" y1={130 - tick.val} x2="40" y2={130 - tick.val} stroke="#475569" />
            <text x="30" y={133 - tick.val} fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="end">{tick.label}</text>
          </g>
        ))}

        {/* X Axis (Time t) */}
        <line x1="40" y1="130" x2="310" y2="130" stroke="#475569" strokeWidth="1.5" />
        <text x="175" y="145" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Time (t)</text>

        {/* X ticks */}
        {[
          { label: 'T₁/₂', val: 80 },
          { label: '2T₁/₂', val: 160 },
          { label: '3T₁/₂', val: 240 }
        ].map(tick => (
          <g key={tick.label}>
            <line x1={40 + tick.val} y1="130" x2={40 + tick.val} y2="134" stroke="#475569" />
            <text x={40 + tick.val} y="141" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">{tick.label}</text>
          </g>
        ))}

        {/* Decay Curve */}
        {/* N = N0 * e^-λt */}
        <path
          d="
            M 40 10
            C 80 70, 140 100, 200 100
            S 260 115, 310 120
          "
          fill="none" stroke="#a78bfa" strokeWidth="2.2"
        />

        {/* Highlight points at half-lives */}
        <circle cx="120" cy="70" r="2.5" fill="#22d3ee" />
        <circle cx="200" cy="100" r="2.5" fill="#22d3ee" />
        <circle cx="280" cy="115" r="2.5" fill="#22d3ee" />
      </svg>
    </div>
  );
}

// ─── SVG 3: RADIATION PENETRATION COMPARISON ─────────────────────────────────
function RadiationPenetrationSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Penetration Capabilities of Alpha, Beta, and Gamma Rays</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 120 }}>
        {/* Barriers */}
        {/* Paper */}
        <rect x="110" y="15" width="4" height="100" fill="#e2e8f0" stroke="#cbd5e1" />
        <text x="112" y="10" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Paper</text>

        {/* Aluminum plate */}
        <rect x="200" y="15" width="8" height="100" fill="#94a3b8" stroke="#475569" />
        <text x="204" y="10" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Al (3mm)</text>

        {/* Lead shield */}
        <rect x="290" y="15" width="16" height="100" fill="#334155" stroke="#1e293b" />
        <text x="298" y="10" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Lead</text>

        {/* Alpha Ray (Stopped by paper) */}
        <line x1="20" y1="35" x2="110" y2="35" stroke="#f43f5e" strokeWidth="2.5" />
        <polygon points="65,35 58,31 58,39" fill="#f43f5e" />
        <text x="20" y="30" fill="#f43f5e" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Alpha (α)</text>

        {/* Beta Ray (Passes paper, stopped by Al) */}
        <line x1="20" y1="65" x2="200" y2="65" stroke="#fb923c" strokeWidth="1.8" />
        <polygon points="120,65 113,61 113,69" fill="#fb923c" />
        <text x="20" y="60" fill="#fb923c" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Beta (β)</text>

        {/* Gamma Ray (Passes paper & Al, stopped by Lead) */}
        <path d="M 20 95 L 290 95" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,2" />
        <polygon points="180,95 173,91 173,99" fill="#34d399" />
        <text x="20" y="90" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold">Gamma (γ)</text>
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
export default function NucleiDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'decay' | 'radii' | 'qvalue'>('decay');

  // Decay simulator states
  const [halfLifeS, setHalfLifeS] = useState('60'); // Half life in seconds
  const [initialQuantity, setInitialQuantity] = useState('5000'); // Initial atoms
  const [elapsedTimeS, setElapsedTimeS] = useState('120'); // Time in seconds

  const t12 = parseFloat(halfLifeS);
  const n0 = parseFloat(initialQuantity);
  const t = parseFloat(elapsedTimeS);

  const numHalfLives = t / t12;
  const remainingAtoms = n0 * Math.pow(0.5, numHalfLives);
  const decayedAtoms = n0 - remainingAtoms;

  // Nuclear size calculator states
  const [species1, setSpecies1] = useState<'C12' | 'Al27' | 'Cu64' | 'U238'>('Al27');
  const [species2, setSpecies2] = useState<'C12' | 'Al27' | 'Cu64' | 'U238'>('U238');

  const getAValue = (s: string) => {
    if (s === 'C12') return 12;
    if (s === 'Al27') return 27;
    if (s === 'Cu64') return 64;
    return 238; // U238
  };

  const a1 = getAValue(species1);
  const a2 = getAValue(species2);

  const r1 = 1.2 * Math.pow(a1, 1/3);
  const r2 = 1.2 * Math.pow(a2, 1/3);

  const radiiRatio = r1 / r2;
  const volumeRatio = a1 / a2;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">☢️</span>
              <Tag color="cyan">Physics Unit 13</Tag>
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
              Nuclei and Radioactive Decay
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Modern Physics Basics</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Einstein Mass Energy</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
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

      {/* PART 1: COMPOSITION, RADIUS & DENSITY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Nuclear Composition &amp; Density Constants</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The nucleus houses nucleons: positively charged protons (Z) and neutral neutrons (N). While the size scales with mass number, the core density is a universal constant.
        </p>
 <div className="grid sm:grid-cols-3 gap-3 text-center text-[13px]">
          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
            <span className="text-[10px] text-white/35 font-bold uppercase block mb-1">Isotopes</span>
            <p className="text-white">Same Z, Different A</p>
            <p className="text-cyan-400 text-[12px]">¹H, ²H, ³H</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
            <span className="text-[10px] text-white/35 font-bold uppercase block mb-1">Isobars</span>
            <p className="text-white">Same A, Different Z</p>
            <p className="text-violet-400 text-[12px]">³H, ³He</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl">
            <span className="text-[10px] text-white/35 font-bold uppercase block mb-1">Isotones</span>
            <p className="text-white">Same Neutrons (A-Z)</p>
            <p className="text-emerald-400 text-[12px]">¹⁴C, ¹⁶O (N = 8)</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="R = R₀ A¹/³"
            use="Nuclear Radius equation"
            note="R₀ ≈ 1.2 fm (1.2 * 10⁻¹⁵ m). Volume V ∝ R³ ∝ A (Volume scales linearly with nucleon count)."
            priority={5}
          />
          <FormulaCard
            formula="ρ<sub>nuclear</sub> = Mass / Volume ≈ 2.3 * 10¹⁷ kg/m³"
            use="Nuclear Density (Constant)"
            note="Since Mass ∝ A and Volume ∝ A, density is independent of A. Density ratio for any two elements is always 1:1."
            priority={5}
          />
        </div>
      </div>

      {/* PART 2: MASS DEFECT & BINDING ENERGY */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Mass Defect, Binding Energy &amp; Stability</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The measured mass of a stable nucleus is always less than the sum of its individual nucleons. This difference, the <strong>mass defect (Δm)</strong>, represents the energy released during assembly: the <strong>binding energy (BE)</strong>.
        </p>
        <BindingEnergyCurveSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="Δm<sub>nuc</sub> = [Z·m<sub>p</sub> + (A−Z)·m<sub>n</sub>] − M<sub>nuc</sub>  |  Δm<sub>atom</sub> = [Z·M<sub>H</sub> + (A−Z)·m<sub>n</sub>] − M<sub>atom</sub>"
            use="Mass Defect calculation (Nuclear vs. Atomic)"
            note="M<sub>H</sub> is Hydrogen atom mass, M<sub>atom</sub> is the target neutral atom mass. Atomic masses are used in standard tables because electron masses cancel out."
            priority={5}
          />
          <FormulaCard
            formula="BE = Δm * c² = Δm * 931.5 MeV"
            use="Binding Energy representation"
            note="Multiply Δm in amu (u) directly by 931.5 to get BE in million electron volts (MeV)."
            priority={5}
          />
        </div>
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-1.5 text-white/70">
          <strong className="text-white text-[13px] block mb-1">🔗 Binding Energy Stability Trends</strong>
          <p>&bull; <strong>Iron Peak:</strong> ⁵⁶Fe has the highest BE per nucleon (approx 8.8 MeV), indicating peak stability.</p>
          <p>&bull; <strong>Fusion:</strong> Light elements (A &lt; 30) merge to form heavier, more stable elements (releasing energy).</p>
          <p>&bull; <strong>Fission:</strong> Heavy nuclei (A &gt; 170) split into medium nuclei to increase stability per nucleon.</p>
        </div>
        <InsightCard title="Nuclear Force Characteristics (Detailed range mechanics)">
          Nucleons are held together by the **nuclear force** which is:
          <br />
          &bull; <strong>Range-Dependent Behavior:</strong> 
          <br />
          &nbsp;&nbsp; - At distances <code>r &gt; 2-3 fm</code>: becomes negligible (Coulomb repulsion dominates between protons).
          <br />
          &nbsp;&nbsp; - At distances <code>r &approx; 1 fm</code>: strongly attractive (binds nucleons together).
          <br />
          &nbsp;&nbsp; - At distances <code>r &lt; 0.5 fm</code>: becomes highly <strong>repulsive</strong> (prevents nuclear collapse, establishing constant density).
          <br />
          &bull; <strong>Saturation &amp; Density connection:</strong> A nucleon only interacts with its immediate neighbors. This saturation leads to nuclear volume scaling as <code>V &prop; A</code>, keeping density constant.
          <br />
          &bull; <strong>Charge Independence &amp; Exchange:</strong> <code>F<sub>pp</sub> &approx; F<sub>pn</sub> &approx; F<sub>nn</sub></code>. The force is mediated by the exchange of <strong>π-mesons</strong> (Yukawa theory).
          <br />
          &bull; <strong>Non-Inverse-Square:</strong> Unlike gravity or electromagnetism, the nuclear force does not follow the inverse-square law.
        </InsightCard>
      </div>

      {/* PART 3: RADIOACTIVITY LAWS & COMPARISONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Radioactivity Laws &amp; Radiation Types</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Radioactivity is spontaneous, random nuclear decay to achieve higher nuclear binding energy. The decay rate depends on the quantity of remaining active nuclei.
        </p>
        <RadioactiveDecaySVG />
        <RadiationPenetrationSVG />
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="N = N₀ e^{−λ t} = N₀ (1/2)<sup>n</sup>"
            use="Radioactive Decay law / Remaining Nuclei"
            note="λ is decay constant. n = t / T<sub>1/2</sub> is the number of elapsed half-lives. N₀ is initial quantity."
            priority={5}
          />
          <FormulaCard
            formula="T<sub>1/2</sub> = 0.693 / λ  |  τ<sub>mean</sub> = 1 / λ"
            use="Half-Life and Mean-Life relations"
            note="T<sub>1/2</sub> is the time required for 50% of the sample to decay. Mean life τ represents the average lifetime."
            priority={5}
          />
        </div>

        {/* Balanced Decay Equations & Activity Card */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">⚛️ Decay Equations &amp; Activity Measurements</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed">
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">A. Balanced Decay Equations</strong>
              <p className="text-[12px]">
                &bull; <strong>Alpha (α):</strong> <code><sup>A</sup><sub>Z</sub>X &rarr; <sup>A−4</sup><sub>Z−2</sub>Y + ⁴₂He</code> (Z down 2, A down 4).
                <br />
                &bull; <strong>Beta-Minus (β⁻):</strong> <code><sup>A</sup><sub>Z</sub>X &rarr; <sup>A</sup><sub>Z+1</sub>Y + e⁻ + v̄</code> (Z up 1, A same; emits antineutrino).
                <br />
                &bull; <strong>Beta-Plus (β⁺):</strong> <code><sup>A</sup><sub>Z</sub>X &rarr; <sup>A</sup><sub>Z-1</sub>Y + e⁺ + v</code> (Z down 1, A same; emits neutrino).
                <br />
                &bull; <strong>Electron Capture:</strong> <code><sup>A</sup><sub>Z</sub>X + e⁻ &rarr; <sup>A</sup><sub>Z-1</sub>Y + v</code> (proton captures shell e⁻ &rarr; neutron + ν).
                <br />
                &bull; <strong>Gamma (γ):</strong> <code><sup>A</sup><sub>Z</sub>X* &rarr; <sup>A</sup><sub>Z</sub>X + γ</code> (de-excitation, no A/Z change).
              </p>
            </div>
            <div className="bg-black/35 p-3 rounded-xl border border-white/5 space-y-2">
              <strong className="text-white text-[13px] block mb-1">B. Activity of a Sample</strong>
              <p>
                Activity (A) is the rate of disintegration:
                <br />
                <code className="text-cyan-300">A(t) = −dN/dt = λ N(t)</code>.
                <br />
                Since <code>N = N₀ e^{"-λt"}</code>, <code>A = A₀ e^{"-λt"}</code>.
                <br /><br />
                <strong>Units of Activity:</strong>
                <br />
                &bull; <strong>Becquerel (Bq):</strong> <code>1 Bq = 1 decay / second</code> (SI Unit).
                <br />
                &bull; <strong>Curie (Ci):</strong> <code>1 Ci = 3.7 * 10¹⁰ Bq</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Radiation Comparison Table */}
        <div className="space-y-2">
 <span className="text-[12px] font-bold text-cyan-400 block">📊 Radiation Properties Comparison Table</span>
 <div className="overflow-x-auto rounded-2xl border border-white/8 text-[12px]">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/8 text-white/55">
                  <th className="text-left px-4 py-2">Property</th>
                  <th className="text-left px-4 py-2 text-rose-400">Alpha (α)</th>
                  <th className="text-left px-4 py-2 text-violet-400">Beta (β)</th>
                  <th className="text-left px-4 py-2 text-emerald-400">Gamma (γ)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Identity', 'Helium Nucleus (⁴₂He²⁺)', 'Fast electron (e⁻) or positron (e⁺)', 'High energy photons'],
                  ['Charge', '+2 e', '−1 e (β⁻) or +1 e (β⁺)', '0 (Neutral)'],
                  ['Rest Mass', 'Heavier (~4 u)', 'Light (~1/1836 u)', '0'],
                  ['Typical Velocity', 'Slow (~5% of c)', 'High (~90% of c)', 'Speed of light (c)'],
                  ['Penetration Power', 'Low (stopped by paper)', 'Medium (passes paper, stopped by Al)', 'High (requires thick Lead)'],
                  ['Ionization Power', 'Very High (heavy, high charge)', 'Medium', 'Low (unaffected by charge)'],
                ].map(([prop, alpha, beta, gamma]) => (
                  <tr key={prop} className="border-b border-white/5 last:border-0 text-white/70">
                    <td className="px-4 py-2 font-semibold text-white/85">{prop}</td>
                    <td className="px-4 py-2 text-rose-300">{alpha}</td>
                    <td className="px-4 py-2 text-violet-300">{beta}</td>
                    <td className="px-4 py-2 text-emerald-300">{gamma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 3.5: NUCLEAR ENERGY — FISSION & FUSION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3.5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Nuclear Energy: Fission vs. Fusion Mechanics</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Nuclear reactions rearrange nucleons to shift products closer to the maximum binding energy per nucleon (⁵⁶Fe), releasing enormous energy according to E = Δm * c².
        </p>

 <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed text-[12px]">
          {/* Fission Card */}
          <div className="bg-black/35 p-4 rounded-xl border border-white/5 space-y-3">
            <strong className="text-cyan-400 text-[13px] block">&bull; Nuclear Fission Mechanics</strong>
            <p>
              A heavy nucleus splits into lighter fragments when bombarded by slow (thermal) neutrons:
              <br />
              <code className="text-cyan-300">²³⁵₉₂U + ¹₀n &rarr; ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n + &approx; 200 MeV</code>
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li><strong>Chain Reaction:</strong> The 3 released neutrons trigger further fissions.</li>
              <li><strong>Critical Mass:</strong> The minimum mass of fissile material needed to sustain a self-supporting chain reaction.</li>
              <li><strong>Reactor Controls:</strong> 
                <br />&nbsp;&bull; <em>Moderator</em> (Heavy water D₂O, graphite) slows down fast neutrons to thermal speeds (0.025 eV).
                <br />&nbsp;&bull; <em>Control Rods</em> (Cadmium, Boron) absorb excess neutrons to regulate power.
              </li>
            </ul>
          </div>

          {/* Fusion Card */}
          <div className="bg-black/35 p-4 rounded-xl border border-white/5 space-y-3">
            <strong className="text-violet-400 text-[13px] block">&bull; Nuclear Fusion Mechanics</strong>
            <p>
              Light nuclei fuse together under extreme conditions to form a heavier, more stable nucleus:
              <br />
              <code className="text-cyan-300">²₁H + ³₁H &rarr; ⁴₂He + ¹₀n + 17.6 MeV</code>
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/60">
              <li><strong>Extreme Conditions:</strong> Requires temperatures of <code>&approx; 10⁷ K</code> and extreme pressure to overcome the strong Coulomb repulsion barrier.</li>
              <li><strong>Thermonuclear Stars:</strong> Powered by the <strong>proton-proton cycle</strong> converting 4 protons into 1 Helium nucleus (releasing 26.7 MeV).</li>
              <li><strong>Energy Yield:</strong> Fusion releases significantly **more energy per unit mass** than fission.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PART 4: INTERACTIVE RADIOACTIVITY SIMULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Radioactive Decay Simulator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Vary sliders for half-life, initial atoms count, and elapsed time to trace remaining vs decayed fractions.
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Half-life (T<sub>1</sub>/2): {halfLifeS} seconds</span>
            </div>
            <input
              type="range" min="10" max="200" step="10"
              value={halfLifeS} onChange={e => setHalfLifeS(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Initial Quantity (N₀): {initialQuantity} atoms</span>
            </div>
            <input
              type="range" min="1000" max="10000" step="500"
              value={initialQuantity} onChange={e => setInitialQuantity(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-violet-400"
            />
          </div>
          <div>
            <div className="flex justify-between text-[12px] font-bold text-white/40 mb-1">
              <span>Elapsed Time (t): {elapsedTimeS} seconds</span>
              <span className="text-cyan-400">{numHalfLives.toFixed(2)} half-lives</span>
            </div>
            <input
              type="range" min="0" max="300" step="5"
              value={elapsedTimeS} onChange={e => setElapsedTimeS(e.target.value)}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>
        </div>
 <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center text-[13px]">
          <div>
            <span className="text-[12px] uppercase font-bold text-white/35">Remaining Fraction (N/N₀)</span>
            <p className="text-[17px] font-bold text-cyan-400 my-1">
              {(remainingAtoms / n0 * 100).toFixed(1)}% ({Math.round(remainingAtoms)} atoms)
            </p>
          </div>
          <div>
            <span className="text-[12px] uppercase font-bold text-white/35">Decayed Fraction</span>
            <p className="text-[17px] font-bold text-rose-400 my-1">
              {(decayedAtoms / n0 * 100).toFixed(1)}% ({Math.round(decayedAtoms)} atoms)
            </p>
          </div>
        </div>
      </div>

      {/* PART 5: NUCLEAR RADIUS & DENSITY RATIO CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Radius &amp; Volume Ratio Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Compare sizes and densities of two nucleides.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Element Species 1:</label>
            <select
              value={species1} onChange={e => setSpecies1(e.target.value as any)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="C12" className="bg-[#0A0C18]">Carbon (A=12)</option>
              <option value="Al27" className="bg-[#0A0C18]">Aluminum (A=27)</option>
              <option value="Cu64" className="bg-[#0A0C18]">Copper (A=64)</option>
              <option value="U238" className="bg-[#0A0C18]">Uranium (A=238)</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Element Species 2:</label>
            <select
              value={species2} onChange={e => setSpecies2(e.target.value as any)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="C12" className="bg-[#0A0C18]">Carbon (A=12)</option>
              <option value="Al27" className="bg-[#0A0C18]">Aluminum (A=27)</option>
              <option value="Cu64" className="bg-[#0A0C18]">Copper (A=64)</option>
              <option value="U238" className="bg-[#0A0C18]">Uranium (A=238)</option>
            </select>
          </div>
        </div>
 <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-[12px] text-center">
          <div>
            <span className="text-white/35 font-bold uppercase block mb-1">Radii Ratio (R₁/R₂)</span>
            <p className="text-[14.5px] font-bold text-cyan-400 my-0.5">{radiiRatio.toFixed(4)}</p>
            <span className="text-white/35">Scale: (A₁/A₂)^(1/3)</span>
          </div>
          <div>
            <span className="text-white/35 font-bold uppercase block mb-1">Volume Ratio (V₁/V₂)</span>
            <p className="text-[14.5px] font-bold text-violet-400 my-0.5">{volumeRatio.toFixed(4)}</p>
            <span className="text-white/35">Scale: A₁ / A₂</span>
          </div>
          <div>
            <span className="text-white/35 font-bold uppercase block mb-1">Density Ratio</span>
            <p className="text-[14.5px] font-bold text-emerald-400 my-0.5">1.0000 : 1.0000</p>
            <span className="text-white/35">Independent of A</span>
          </div>
        </div>
      </div>

      {/* PART 6: MEMORY BOX & FOCUS POINTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Revision Cheat Sheet &amp; Q-Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-1">
            <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">💡 size dependencies</span>
            <p className="text-white/70">
              &bull; Radius: <code>R &prop; A^{1/3}</code>.
              <br />
              &bull; Surface Area: <code>Area &prop; R² &prop; A^{2/3}</code>.
              <br />
              &bull; Volume: <code>Volume &prop; R³ &prop; A</code>.
              <br />
              &bull; Density: <code>ρ &prop; A / Volume &prop; Constant</code>.
            </p>
          </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-1">
            <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">⚙️ Decay Q-Value &amp; Kinetic Energies</span>
            <p className="text-white/70">
              Q-value equals mass deficit times speed of light squared:
              <br />
              <code>Q = (M<sub>initial</sub> − M<sub>final</sub>) c²</code>.
              <br /><br />
              In spontaneous alpha decay of stationary nucleus, alpha particle shares Q:
              <br />
              <code className="text-cyan-300">K<sub>α</sub> = Q * [(A − 4) / A]</code> (shares ~98% energy).
              <br />
              <code className="text-cyan-300">K<sub>daughter</sub> = Q * [4 / A]</code>.
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
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Binding Energy of Helium</span>
          <p className="text-white/80">Calculate the binding energy (in MeV) and binding energy per nucleon of a Helium nucleus (⁴₂He) from the following standard data: mass of ⁴₂He nucleus = 4.001506 u, mass of proton = 1.007276 u, and mass of neutron = 1.008665 u.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Sum of constituent masses: <code>Σm = 2·m<sub>p</sub> + 2·m<sub>n</sub> = 2(1.007276) + 2(1.008665) = 2.014552 + 2.017330 = 4.031882 u</code>.</p>
            <p>2. Mass defect: <code>Δm = Σm − M<sub>nucleus</sub> = 4.031882 − 4.001506 = 0.030376 u</code>.</p>
            <p>3. Binding Energy: <code>BE = Δm * 931.5 MeV = 0.030376 * 931.5 ≈ 28.30 MeV</code>.</p>
            <p>4. BE per nucleon: <code>BE / A = 28.30 / 4 ≈ 7.07 MeV/nucleon</code>.</p>
            <p className="text-cyan-300 font-bold">Total BE = 28.30 MeV | BE/A = 7.07 MeV/nucleon</p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Alpha Decay Kinetic Energy sharing</span>
          <p className="text-white/80">A stationary Uranium nucleus (²³⁸₉₂U) decays spontaneously by emitting an alpha particle. If the total energy released (Q-value) is 4.28 MeV, calculate the kinetic energy of the emitted alpha particle.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Mass number of initial nucleus: <code>A = 238</code>.</p>
            <p>2. Kinetic Energy of Alpha particle: <code>K<sub>α</sub> = Q * [(A − 4) / A]</code>.</p>
            <p>3. Substitute values: <code>K<sub>α</sub> = 4.28 * [234 / 238] = 4.28 * 0.9832 = 4.208 MeV</code>.</p>
            <p>4. Recoil Energy of Thorium daughter: <code>K<sub>Th</sub> = Q * [4 / 238] = 4.28 * 0.0168 = 0.072 MeV</code>.</p>
            <p className="text-cyan-300 font-bold">Kinetic Energy of Alpha Particle = 4.21 MeV | Daughter Recoil = 0.07 MeV</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Simultaneous Parallel decay</span>
          <p className="text-white/80">A radioactive isotope can decay simultaneously through two parallel processes. The half-life for path 1 is 8 hours, and for path 2 is 12 hours. Find the effective half-life of the sample.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Parallel decay: The effective decay constant is <code>λ<sub>eff</sub> = λ₁ + λ₂</code>.</p>
            <p>2. Since <code>λ = 0.693 / T</code>, the half-life relation is: <code>1 / T<sub>eff</sub> = 1 / T₁ + 1 / T₂</code>.</p>
            <p>3. Calculate: <code>1 / T<sub>eff</sub> = 1 / 8 + 1 / 12 = (3 + 2) / 24 = 5 / 24</code>.</p>
            <p>4. Effective half-life: <code>T<sub>eff</sub> = 24 / 5 = 4.8 hours</code>.</p>
            <p className="text-cyan-300 font-bold">Effective half-life = 4.8 hours (approx 4 hours 48 minutes)</p>
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
            { id: 'decay', label: '📊 Radioactivity limits & decays' },
            { id: 'radii', label: '💡 Radius & Volume ratios' },
            { id: 'qvalue', label: '⚡ Q-Values & energy sharing' },
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
          {selectedGoal === 'decay' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Radioactive half-life decay</span>
              <p className="text-white/70">1. Remaining sample: <code>N = N₀ (1/2)<sup>n</sup></code> where <code>n = t / T<sub>1/2</sub></code>.</p>
              <p className="text-white/70">2. Mean life conversion: <code>τ<sub>mean</sub> = T<sub>1/2</sub> / 0.693</code>.</p>
              <p className="text-white/70">3. Parallel path decay constants: <code>λ<sub>eff</sub> = λ₁ + λ₂</code>.</p>
            </>
          )}
          {selectedGoal === 'radii' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Radius and Volume scales</span>
              <p className="text-white/70">1. Radius scale: <code>R ∝ A<sup>1/3</sup></code>.</p>
              <p className="text-white/70">2. Surface area scale: <code>Area ∝ A<sup>2/3</sup></code>.</p>
              <p className="text-white/70">3. Volume scale: <code>Volume ∝ A</code>.</p>
              <p className="text-white/70">4. Density scale: <code>Density ∝ 1:1</code> (Always independent of A).</p>
            </>
          )}
          {selectedGoal === 'qvalue' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Q-value decay energy divisions</span>
              <p className="text-white/70">1. Q-value: <code>Q = (Initial Mass − Final Mass) c²</code>.</p>
              <p className="text-white/70">2. Alpha particle KE: <code>K<sub>α</sub> = Q * [(A − 4) / A]</code>.</p>
              <p className="text-white/70">3. Recoil core daughter KE: <code>K<sub>d</sub> = Q * [4 / A]</code>.</p>
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
            { cue: '"Ratio of densities of two nuclei (e.g. Iron to Lead)"', think: "Nuclear density is constant, independent of A. The ratio is always exactly 1:1." },
            { cue: '"Alpha decay of stationary nucleus, calculate alpha particle energy"', think: "Calculate Q-value first, then use fraction: K<sub>α</sub> = Q * (A-4)/A." },
            { cue: '"Calculate the fraction decayed in time t"', think: "Remaining fraction is N/N₀ = (1/2)<sup>n</sup>. Decayed fraction is 1 - N/N₀." },
            { cue: '"Decays via path A with half-life T1 and path B with half-life T2"', think: "Parallel path decays: 1/T<sub>eff</sub> = 1/T1 + 1/T2." },
            { cue: '"Mass defect in atomic mass units (amu)"', think: "Multiply mass defect directly by 931.5 to find binding energy in MeV." },
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
          <TrapCard title="Trap 1: Decayed fraction vs. Remaining fraction">
            Always double check whether the question asks for the fraction of the sample that **decays** or the fraction that **remains**. E.g., after 3 half-lives, remaining is 12.5% (1/8), but decayed is 87.5% (7/8).
          </TrapCard>
          <TrapCard title="Trap 2: Beta Decay Neutrino Pairings">
            Beta-minus decay (β⁻) emits an **antineutrino** (v̄), whereas Beta-plus decay (β⁺) emits a **neutrino** (v). Mixing these up is a common distracter option in IAT equations.
          </TrapCard>
          <TrapCard title="Trap 3: Density scaling assumptions">
            Do not assume nuclear density increases with mass number (A). Although mass increases with A, volume also increases proportionally with A, keeping density constant.
          </TrapCard>
          <TrapCard title="Trap 4: Incorrect Alpha Energy Sharing formula">
            Avoid using <code>K<sub>α</sub> = Q * A / (A − 4)</code>! This is incorrect and yields values larger than the total Q-value. The correct formula is <code>K<sub>α</sub> = Q * (A − 4) / A</code>.
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
            <span className="text-white/80 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10 font-bold">Nuclei (Unit 13)</span>
            <span className="text-white/30">&rarr;</span>
            <span className="text-white/50 bg-white/5 px-2.5 py-1 rounded-xl border border-white/5">Semiconductors &amp; Logic Gates (Unit 14)</span>
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
            "Radius formula: R = R₀ A¹/³ (Volume ∝ A)",
            "Constant density: roughly 2.3 * 10¹⁷ kg/m³ (Density ratio is 1:1)",
            "Isotopes (same Z), Isobars (same A), Isotones (same A-Z)",
            "Mass defect: difference between free nucleon masses and bound nucleus mass",
            "Binding Energy BE = Δm * 931.5 MeV (if Δm is in amu)",
            "Stability peak: Iron (⁵⁶Fe) is peak stable with BE/A ≈ 8.8 MeV",
            "Radioactive decay law: N = N₀ e^{−λt} = N₀ (1/2)<sup>n</sup>",
            "Half-life relation: T<sub>1/2</sub> = 0.693 / λ. Mean life: τ = 1/λ",
            "Competing parallel decays: 1/T<sub>eff</sub> = 1/T₁ + 1/T₂",
            "Alpha decay: A decreases by 4, Z by 2. Energy: K<sub>α</sub> = Q * (A-4)/A",
            "Beta-minus decay: n &rarr; p + e⁻ + antineutrino. Z increases by 1",
            "Beta-plus decay: p &rarr; n + e⁺ + neutrino. Z decreases by 1",
            "Gamma decay: emits photon returning excited state to ground, no A/Z change",
            "Q-value: Q = (M<sub>initial</sub> − M<sub>final</sub>) c²"
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
