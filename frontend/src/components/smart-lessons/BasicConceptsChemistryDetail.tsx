import React, { useState } from 'react';
import {
  Star, AlertTriangle, CheckCircle,
  BookOpen, Flame, Target, RefreshCw, Sparkles, HelpCircle, ArrowRight, Zap, Info
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── STYLING COMPONENTS ───────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function SectionBanner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span className="text-[11px] font-black tracking-widest text-cyan-400 uppercase">{label}</span>
    </div>
  );
}

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
  return (
    <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3.5 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono tracking-widest">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <p className="font-mono text-cyan-300 font-bold text-[14.5px] sm:text-base bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-500/10 inline-block" dangerouslySetInnerHTML={{ __html: formula }} />
      <div className="space-y-1.5 text-white/80 text-[13px] leading-relaxed">
        <p><strong className="text-white/40">Use:</strong> {use}</p>
        <p className="text-white/60"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
      </div>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/15 shadow-sm space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/70 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function ExamTipCard({ title = "Exam Tip", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/15 shadow-sm space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-amber-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/75 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

// ─── SVGS ─────────────────────────────────────────────────────────────────────
function MoleRoadmapSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-cyan-400/70 font-semibold">Fig 1 — Mole conversion roadmap and stoichiometric links</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <rect x="15" y="45" width="55" height="22" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="42.5" y="58" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Mass (g)</text>

        <rect x="135" y="45" width="60" height="22" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="165" y="58" fill="#a78bfa" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Moles (n)</text>

        <rect x="260" y="15" width="65" height="22" rx="4" fill="none" stroke="#34d399" strokeWidth="1" />
        <text x="292.5" y="28" fill="#34d399" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Particles (N)</text>

        <rect x="260" y="75" width="65" height="22" rx="4" fill="none" stroke="#eab308" strokeWidth="1" />
        <text x="292.5" y="88" fill="#eab308" fontSize="7" fontFamily="monospace" textAnchor="middle">Volume (STP)</text>

        <line x1="70" y1="56" x2="135" y2="56" stroke="#475569" strokeWidth="1" />
        <text x="102" y="51" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="middle">&divide; M</text>
        <text x="102" y="67" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="middle">&times; M</text>

        <line x1="195" y1="50" x2="260" y2="28" stroke="#475569" strokeWidth="1" />
        <text x="228" y="34" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="middle">&times; N<sub>A</sub></text>

        <line x1="195" y1="62" x2="260" y2="84" stroke="#475569" strokeWidth="1" />
        <text x="228" y="82" fill="#cbd5e1" fontSize="6.5" fontFamily="monospace" textAnchor="middle">&divide; 22.4 L</text>
      </svg>
    </div>
  );
}

function ConcentrationConversionsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-violet-400/70 font-semibold">Fig 2 — Concentration transformation pathway mapping</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <rect x="20" y="45" width="55" height="22" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1" />
        <text x="47.5" y="58" fill="#22d3ee" fontSize="7" fontFamily="monospace" textAnchor="middle">Mass %</text>

        <rect x="135" y="15" width="60" height="22" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1" />
        <text x="165" y="28" fill="#a78bfa" fontSize="7" fontFamily="monospace" textAnchor="middle">Molarity (M)</text>

        <rect x="135" y="75" width="60" height="22" rx="4" fill="none" stroke="#fb7185" strokeWidth="1" />
        <text x="165" y="88" fill="#fb7185" fontSize="7" fontFamily="monospace" textAnchor="middle">Molality (m)</text>

        <rect x="260" y="45" width="60" height="22" rx="4" fill="none" stroke="#34d399" strokeWidth="1" />
        <text x="290" y="58" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="middle">Mole Frac (X)</text>

        <line x1="75" y1="56" x2="135" y2="28" stroke="#475569" strokeWidth="1" />
        <text x="105" y="38" fill="#cbd5e1" fontSize="6" fontFamily="monospace" textAnchor="middle">via Density d</text>

        <line x1="75" y1="56" x2="135" y2="84" stroke="#475569" strokeWidth="1" />
        <text x="105" y="78" fill="#cbd5e1" fontSize="6" fontFamily="monospace" textAnchor="middle">solvent mass</text>

        <line x1="195" y1="28" x2="260" y2="56" stroke="#475569" strokeWidth="1" />
        <line x1="195" y1="84" x2="260" y2="56" stroke="#475569" strokeWidth="1" />
      </svg>
    </div>
  );
}

function LimitingReagentProgressSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-emerald-400/70 font-semibold">Fig 3 — Stoichiometric Reactants Decay &amp; Products Growth curves</p>
      <svg viewBox="0 0 340 130" className="w-full" style={{ maxHeight: 115 }}>
        <line x1="40" y1="10" x2="40" y2="110" stroke="#475569" strokeWidth="1.2" />
        <line x1="30" y1="100" x2="310" y2="100" stroke="#475569" strokeWidth="1.2" />
        <text x="170" y="112" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Extent of Reaction (&xi;)</text>
        <text x="15" y="60" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 15 60)">Moles</text>

        <path d="M 40 20 L 200 100 L 300 100" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
        <text x="210" y="98" fill="#f43f5e" fontSize="7.5" fontFamily="monospace">Limiting Reagent (B)</text>

        <path d="M 40 40 L 200 80 L 300 80" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
        <text x="210" y="76" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">Excess Reagent (A)</text>

        <path d="M 40 100 L 200 40 L 300 40" fill="none" stroke="#34d399" strokeWidth="1.8" />
        <text x="210" y="36" fill="#34d399" fontSize="7.5" fontFamily="monospace">Product (C)</text>

        <line x1="200" y1="10" x2="200" y2="100" stroke="#eab308" strokeWidth="1" strokeDasharray="3 3" />
        <text x="200" y="18" fill="#eab308" fontSize="7" fontFamily="monospace" textAnchor="middle">Reaction Ends</text>
      </svg>
    </div>
  );
}

function SolutionDilutionScalingSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#060814] p-5 space-y-3 shadow-xl">
 <p className="text-[10px] uppercase tracking-wider text-amber-400/70 font-semibold">Fig 4 — Solution Dilution: M₁V₁ = M₂V₂</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        <rect x="30" y="30" width="60" height="70" fill="rgba(34, 211, 238, 0.05)" stroke="#64748b" strokeWidth="1.2" />
        <line x1="30" y1="65" x2="90" y2="65" stroke="#22d3ee" strokeWidth="1.5" />
        <circle cx="45" cy="75" r="1.5" fill="#f43f5e" />
        <circle cx="55" cy="80" r="1.5" fill="#f43f5e" />
        <circle cx="65" cy="72" r="1.5" fill="#f43f5e" />
        <circle cx="75" cy="85" r="1.5" fill="#f43f5e" />
        <circle cx="50" cy="90" r="1.5" fill="#f43f5e" />
        <circle cx="70" cy="92" r="1.5" fill="#f43f5e" />
        <text x="60" y="24" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Conc (M₁, V₁)</text>

        <path d="M 115 65 L 165 65" fill="none" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="140" y="58" fill="#eab308" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Add H₂O</text>

        <rect x="190" y="30" width="80" height="70" fill="rgba(167, 139, 250, 0.05)" stroke="#64748b" strokeWidth="1.2" />
        <line x1="190" y1="45" x2="270" y2="45" stroke="#a78bfa" strokeWidth="1.5" />
        <circle cx="205" cy="55" r="1.5" fill="#f43f5e" />
        <circle cx="215" cy="75" r="1.5" fill="#f43f5e" />
        <circle cx="235" cy="62" r="1.5" fill="#f43f5e" />
        <circle cx="255" cy="80" r="1.5" fill="#f43f5e" />
        <circle cx="220" cy="90" r="1.5" fill="#f43f5e" />
        <circle cx="245" cy="92" r="1.5" fill="#f43f5e" />
        <text x="230" y="24" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Dilute (M₂, V₂)</text>

        <text x="310" y="68" fill="#eab308" fontSize="9.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">M₁V₁ = M₂V₂</text>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#eab308" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function BasicConceptsChemistryDetail({ progress, isCompleted, onNavigate }: Props) {
  // Limiting Reagent state
  const [coeffA, setCoeffA] = useState<string>('1');
  const [molesA, setMolesA] = useState<string>('5');
  const [coeffB, setCoeffB] = useState<string>('3');
  const [molesB, setMolesB] = useState<string>('10');
  const [coeffProd, setCoeffProd] = useState<string>('2'); 

  const cA = parseFloat(coeffA) || 1;
  const mA = parseFloat(molesA) || 0;
  const cB = parseFloat(coeffB) || 1;
  const mB = parseFloat(molesB) || 0;
  const cP = parseFloat(coeffProd) || 1;

  const indexA = mA / cA;
  const indexB = mB / cB;

  const lrIdentifier = indexA < indexB ? 'Reactant A' : 'Reactant B';
  const minIndex = Math.min(indexA, indexB);
  const maxProductMoles = minIndex * cP;

  // Molarity conversion state
  const [massPct, setMassPct] = useState<string>('20');
  const [densityD, setDensityD] = useState<string>('1.2');
  const [molarM, setMolarM] = useState<string>('40');

  const mp = parseFloat(massPct) || 0;
  const dd = parseFloat(densityD) || 1;
  const mm = parseFloat(molarM) || 1;

  const derivedMolarity = (10 * dd * mp) / mm;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12 pb-24 px-4">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🧪</span>
              <Tag color="cyan">Chemistry Unit 1</Tag>
              <Tag color="rose">IAT Foundation</Tag>
              <Tag color="amber">Essential</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[22px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Some Basic Concepts of Chemistry
            </h1>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-2 flex flex-wrap items-center gap-1.5">
              <span>Prerequisites:</span>
              <span className="text-white/60 bg-white/5 px-2 py-0.5 rounded text-[10px] border border-white/10">Atomic Numbers</span>
              <span className="text-white/60 bg-white/5 px-2 py-0.5 rounded text-[10px] border border-white/10 font-bold">Gas Equations</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (3.0/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13.5px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
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

      {/* PART 0: MATTER & ITS NATURE */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">FOUNDATIONS</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Matter and its Nature</h2>
        </div>

        {/* Card 1: Physical Classification */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="0.1 State Classification" />
          <p className="text-white/70 text-[13.5px] leading-relaxed">
            Matter is defined as anything that possesses mass and occupies physical space. It exists in three classical phases under standard conditions:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-[13px] text-white/70 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-black text-cyan-400 block">1. Solids 🧊</span>
              <ul className="space-y-1 text-white/60">
                <li>&bull; Definite shape &amp; volume</li>
                <li>&bull; Extremely low kinetic energy</li>
                <li>&bull; Incompressible crystal grids</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-black text-violet-400 block">2. Liquids 💧</span>
              <ul className="space-y-1 text-white/60">
                <li>&bull; Definite volume, shapes shift</li>
                <li>&bull; Medium kinetic energy</li>
                <li>&bull; Translational particle sliding</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-black text-emerald-400 block">3. Gases 💨</span>
              <ul className="space-y-1 text-white/60">
                <li>&bull; Variable shape &amp; volume</li>
                <li>&bull; High kinetic energy</li>
                <li>&bull; Highly compressible</li>
              </ul>
            </div>
          </div>
          <div className="p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/10 text-[13px] text-white/75 space-y-2">
            <div className="flex items-center gap-2">
              <Tag color="violet">Extra Enrichment — Not in Core NCERT Syllabus</Tag>
            </div>
            <p>&bull; <strong>Plasma:</strong> Ionized gas formed under extreme temperature where electrons break free from nuclei. Conducts electricity and forms stars.</p>
            <p>&bull; <strong>Bose-Einstein Condensate (BEC):</strong> Formed near absolute zero temperature. Atoms lose individuality, merging into a single quantum state.</p>
          </div>
        </div>

        {/* Card 2: Chemical Classification */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="0.2 Chemical Classification" />
          <div className="grid sm:grid-cols-2 gap-4 text-[13.5px] text-white/70">
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <strong className="text-white text-[14px] block border-b border-white/5 pb-1">A. Pure Substances</strong>
              <p className="text-white/50 text-[12.5px]">Fixed, constant composition at the particle level.</p>
              <ul className="space-y-2.5 pt-1 text-white/70">
                <li>
                  <span className="text-cyan-400 font-bold block">✓ Elements</span>
                  Single atom type (e.g., Cu, O₂, O₃). Cannot be separated chemically.
                </li>
                <li>
                  <span className="text-violet-400 font-bold block">✓ Compounds</span>
                  Combined different atoms in constant proportions (e.g., H₂O). Can be separated only chemically.
                </li>
              </ul>
            </div>
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <strong className="text-white text-[14px] block border-b border-white/5 pb-1">B. Mixtures</strong>
              <p className="text-white/50 text-[12.5px]">Variable physical combinations of substances.</p>
              <ul className="space-y-2.5 pt-1 text-white/70">
                <li>
                  <span className="text-emerald-400 font-bold block">✓ Homogeneous</span>
                  Uniform, single-phase solution (e.g., salt in water, clean air, alloys).
                </li>
                <li>
                  <span className="text-amber-400 font-bold block">✓ Heterogeneous</span>
                  Multi-phase, non-uniform composition (e.g., colloids, sand in water).
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Extensive vs Intensive */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <SectionBanner label="0.3 Extensive vs Intensive Properties" />
            <Tag color="amber">⭐⭐ High Yield</Tag>
          </div>
          <p className="text-white/75 text-[13.5px]">
            Properties are classified based on their sensitivity to the mass/quantity of the system:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-white/75">
            <div className="p-4.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
              <strong className="text-cyan-400 block border-b border-cyan-500/10 pb-1 uppercase tracking-wider text-[12px]">Extensive (Size-Dependent)</strong>
              <p>Values change proportionally with the amount of matter in the system.</p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {['Mass', 'Volume', 'Enthalpy (H)', 'Entropy (S)', 'Moles (n)', 'Heat Capacity'].map(p => (
 <span key={p} className="px-2 py-0.5 bg-black/40 rounded text-[11px] border border-white/5">{p}</span>
                ))}
              </div>
            </div>
            <div className="p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/10 space-y-2">
              <strong className="text-violet-400 block border-b border-violet-500/10 pb-1 uppercase tracking-wider text-[12px]">Intensive (Independent)</strong>
              <p>Values remain invariant regardless of the amount of matter present.</p>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {['Density (d)', 'Temperature (T)', 'Pressure (P)', 'Molality (m)', 'pH', 'Refractive Index'].map(p => (
 <span key={p} className="px-2 py-0.5 bg-black/40 rounded text-[11px] border border-white/5">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Atoms vs Molecules */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-3 shadow-lg text-[13.5px] text-white/75 leading-relaxed">
          <SectionBanner label="0.4 Fundamental Particles" />
          <p>&bull; <strong>Atom:</strong> The smallest particle of an element that takes part in a chemical reaction. It may or may not exist independently (e.g. He exists, whereas H atoms are highly reactive and exist as diatomic H₂ molecules).</p>
          <p>&bull; <strong>Molecule:</strong> The smallest particle of an element or compound capable of independent existence under normal conditions (e.g., O₂, H₂O).</p>
        </div>
      </div>

      {/* PART 1: DALTON'S ATOMIC THEORY */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 1</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Dalton's Atomic Theory</h2>
        </div>

        {/* Card 1: Postulates */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <SectionBanner label="1.1 The Postulates" />
            <Tag color="cyan">⭐ Must Know</Tag>
          </div>
          <ol className="space-y-3.5 text-[13.5px] text-white/70">
            <li className="flex gap-2">
              <span className="text-cyan-400 font-bold">1.</span>
              <span>Matter is composed of extremely small, indivisible particles called <strong>atoms</strong>.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400 font-bold">2.</span>
              <span>Atoms of a given element are identical in mass, size, and all chemical characteristics.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400 font-bold">3.</span>
              <span>Atoms of different elements possess different masses, sizes, and chemical properties.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400 font-bold">4.</span>
              <span>Atoms cannot be created, subdivided, or destroyed during chemical reactions.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-cyan-400 font-bold">5.</span>
              <span>Compounds are formed when atoms of different elements combine in simple, whole-number numerical ratios.</span>
            </li>
          </ol>
        </div>

        {/* Card 2: Explain Laws */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="1.2 Explaining Combination Laws" />
          <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
            <p>&bull; <strong>Conservation of Mass:</strong> Since atoms are indestructible (Postulate 4) and only rearrange during reactions, total mass remains constant.</p>
            <p>&bull; <strong>Definite Proportions:</strong> A compound has a fixed ratio of atoms (Postulate 5/6) and each atom type has a constant mass (Postulate 2). Therefore, the elements in that compound must exist in a fixed mass ratio.</p>
            <div className="p-4 bg-[#080913] border border-white/5 rounded-2xl space-y-2">
              <strong className="text-cyan-300 block">&bull; Multiple Proportions Explanation:</strong>
              <p>Since different elements combine in simple integral atomic ratios (Postulate 5), different compounds formed by the same two elements must correspond to distinct small integer atom ratios.</p>
 <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1.5 text-[12.5px] text-white/60">
                <p><strong>Example (CO vs CO₂):</strong></p>
                <p>1. In Carbon Monoxide (CO): 1 C atom combines with 1 O atom. Mass ratio of C:O = 12 : 16.</p>
                <p>2. In Carbon Dioxide (CO₂): 1 C atom combines with 2 O atoms. Mass ratio of C:O = 12 : 32.</p>
                <p>3. For a fixed mass of C (12g), the mass ratio of Oxygen combining is 16g : 32g, which yields exactly <strong>1 : 2</strong> (a simple whole-number ratio).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Limitations */}
        <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/10 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-[12.5px] font-extrabold text-rose-400 uppercase tracking-wider">Limitations &amp; Demerits ❌</span>
            <Tag color="rose">⭐⭐ High Yield</Tag>
          </div>
          <ul className="space-y-3 text-[13.5px] text-white/75">
            <li className="flex gap-2.5 items-start">
              <span className="text-rose-400">✗</span>
              <span><strong>Subatomic Structure:</strong> Atoms are not indivisible; they consist of electrons, protons, and neutrons.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-rose-400">✗</span>
              <span><strong>Isotopes:</strong> Atoms of the same element can have different masses (e.g., Protium ¹H vs Deuterium ²H). This violates Postulate 2.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-rose-400">✗</span>
              <span><strong>Isobars:</strong> Atoms of different elements can have identical mass numbers (e.g., ⁴⁰Ar and ⁴⁰Ca). This violates Postulate 3.</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-rose-400">✗</span>
              <span><strong>Complex ratios:</strong> Organic molecules combine in complex ratios (e.g., sucrose C₁₂H₂₂O₁₁).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* PART 2: LAWS OF CHEMICAL COMBINATION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 2</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Laws of Chemical Combination</h2>
        </div>

        {/* Individual Law Cards for chunking */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0A0C18] border border-white/5 space-y-2">
            <Tag color="cyan">1. Conservation of Mass</Tag>
            <p className="text-[13px] text-white/70">Total mass of reactants equals the total mass of products in any standard chemical reaction.</p>
 <div className="p-2 bg-white/[0.02] border border-white/5 rounded text-[11px] text-cyan-300">Reactants Mass = Products Mass</div>
            <p className="text-[11px] text-rose-400/80"><strong className="text-white/45">Limit:</strong> Fails for nuclear reactions where mass-energy interconverts (E = mc²).</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A0C18] border border-white/5 space-y-2">
            <Tag color="cyan">2. Definite Proportions</Tag>
            <p className="text-[13px] text-white/70">A pure compound always contains its constituent elements in a fixed ratio by weight, regardless of its source.</p>
            <p className="text-[11px] text-rose-400/80"><strong className="text-white/45">Limit:</strong> Fails for isotopic mixtures (e.g., H₂O vs D₂O have different mass ratios) and non-stoichiometric compounds (e.g., Fe<sub>0.95</sub>O).</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A0C18] border border-white/5 space-y-2">
            <Tag color="cyan">3. Multiple Proportions</Tag>
            <p className="text-[13px] text-white/70">If two elements form multiple compounds, the masses of one combining with a fixed mass of the other are in simple whole-number ratios.</p>
            <p className="text-[11px] text-rose-400/80"><strong className="text-white/45">Limit:</strong> Fails for complex polymers and non-stoichiometric crystalline oxides.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A0C18] border border-white/5 space-y-2">
            <Tag color="cyan">4. Combining Volumes</Tag>
            <p className="text-[13px] text-white/70">Reacting gaseous volumes under identical T and P are in simple integral ratios (Gay-Lussac's Law).</p>
 <div className="p-2 bg-white/[0.02] border border-white/5 rounded text-[11px] text-cyan-300">1 vol H₂ + 1 vol Cl₂ &rarr; 2 vol HCl</div>
            <p className="text-[11px] text-rose-400/80"><strong className="text-white/45">Limit:</strong> Fails at high pressures where gas behavior deviates from ideal gas laws.</p>
          </div>
        </div>

        {/* Richter's Law */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <SectionBanner label="2.2 Law of Reciprocal Proportions" />
            <Tag color="violet">Extra Enrichment — Valuable IAT Concept</Tag>
          </div>
          <p className="text-white/70 text-[13.5px] leading-relaxed">
            Proposed by Jeremias Richter, this law describes how different elements combine separately with a fixed mass of a third element.
          </p>
          <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-2.5 text-[13px]">
            <strong className="text-white">Example with C, H, O:</strong>
            <p>&bull; Methane (CH₄): 12g C combines with 4g H (Ratio: <strong>3g C per 1g H</strong>).</p>
            <p>&bull; Water (H₂O): 16g O combines with 2g H (Ratio: <strong>8g O per 1g H</strong>).</p>
            <p>&bull; Combining ratio of C to O with 1g H = <strong>3 : 8</strong>.</p>
            <p>&bull; Carbon Dioxide (CO₂): 12g C combines with 32g O (Ratio: 12:32 = <strong>3 : 8</strong>).</p>
 <p className="text-emerald-400 font-semibold">The ratios match perfectly, confirming the law.</p>
          </div>
        </div>
      </div>

      {/* PART 3: ATOMIC AND MOLECULAR MASSES */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 3</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Atomic and Molecular Masses</h2>
        </div>

        {/* Card 1: Relative scale */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="3.1 Relative Scale &amp; amu" />
          <p className="text-white/75 text-[13.5px] leading-relaxed">
            Since individual atoms are too small to weigh, they are measured relative to the Carbon-12 standard:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 text-[13px] block">Atomic Mass Unit (amu or u)</strong>
              <p className="text-[13px] text-white/60">Defined as exactly 1/12th of the mass of a single Carbon-12 atom.</p>
              <code className="text-cyan-300 block pt-1 font-mono text-[12px]">1 amu = 1.66056 &times; 10⁻²⁴ g</code>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <strong className="text-violet-400 text-[13px] block">Average Atomic Mass</strong>
              <p className="text-[13px] text-white/60">Accounts for the fractional abundances of all isotopes in nature.</p>
              <code className="text-violet-300 block pt-1 font-mono text-[11px]">Avg = &Sigma; (Abundance &times; Mass)</code>
            </div>
          </div>
        </div>

        {/* Card 2: Gram masses */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="3.2 Gram Atomic &amp; Molecular Mass" />
          <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-white/75">
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1.5">
              <strong className="text-white block border-b border-white/5 pb-1">Gram Atomic Mass (GAM)</strong>
              <p>The atomic mass of an element expressed in grams. It represents the mass of 1 mole of atoms.</p>
              <p className="text-cyan-300 font-bold font-mono">GAM of Oxygen = 16.0 g</p>
            </div>
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1.5">
              <strong className="text-white block border-b border-white/5 pb-1">Gram Molecular Mass (GMM)</strong>
              <p>The molecular mass of a substance expressed in grams. It represents the mass of 1 mole of molecules.</p>
 <p className="text-violet-300 font-bold">GMM of Water = 18.0 g</p>
            </div>
          </div>
        </div>

        {/* Card 3: Formula Mass & Vapour Density */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0A0C18] border border-white/5 space-y-2">
            <Tag color="emerald">Formula Mass (Ionic Networks)</Tag>
            <p className="text-[13px] text-white/70">Used for ionic compounds lacking discrete molecules (e.g. NaCl). Sum of the constituent ions' atomic masses.</p>
            <code className="text-emerald-300 block font-mono text-[12.5px]">NaCl = 23.0 + 35.5 = 58.5 u</code>
          </div>
          <div className="p-5 rounded-2xl bg-[#0A0C18] border border-white/5 space-y-2">
            <Tag color="amber">Vapour Density (Gas Weights)</Tag>
            <p className="text-[13px] text-white/70">Ratio of gas mass to the mass of an equal volume of Hydrogen gas under identical T &amp; P.</p>
            <code className="text-amber-300 block font-mono text-[12.5px]">Molecular Mass = 2 &times; VD</code>
          </div>
        </div>
      </div>

      {/* PART 4: MOLE CONCEPT & STP */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 4</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Mole Concept &amp; STP</h2>
        </div>

        <MoleRoadmapSVG />

        {/* Card 1: Mole definition */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <SectionBanner label="4.1 Mole Definition" />
            <Tag color="cyan">⭐ Must Know</Tag>
          </div>
          <p className="text-white/70 text-[13.5px] leading-relaxed">
            The mole is the amount of substance containing as many chemical entities as there are carbon atoms in exactly 12 grams of Carbon-12.
          </p>
 <div className="p-4 bg-cyan-950/20 border border-cyan-500/10 rounded-xl space-y-1 text-[13px] text-cyan-300">
            <p>&bull; Avogadro's Constant (N<sub>A</sub>) = 6.02214076 &times; 10²³ particles/mol</p>
          </div>
        </div>

        {/* Card 2: STP differences */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <div className="flex justify-between items-center">
            <SectionBanner label="4.2 STP vs SATP Molar Volume limits" />
            <Tag color="rose">⭐⭐ High Yield</Tag>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-[13px] text-white/75">
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <strong className="text-white">Old STP (Pre-IUPAC)</strong>
              <p>273.15 K &amp; 1 atm</p>
              <p className="text-cyan-300 font-bold">22.4 Litres / mol</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <strong className="text-white">Modern STP (IUPAC)</strong>
              <p>273.15 K &amp; 1 bar</p>
              <p className="text-violet-300 font-bold">22.7 Litres / mol</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <strong className="text-white">SATP Ambient</strong>
              <p>298.15 K &amp; 1 bar</p>
              <p className="text-emerald-300 font-bold">24.8 Litres / mol</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormulaCard
            formula="n = Mass (g) / Molar Mass (g/mol)"
            use="Moles calculations from solid weights"
            note="Fundamental molecular mass calculation bridge."
            priority={5}
          />
          <FormulaCard
            formula="n = Volume (L) at STP / 22.4 L"
            use="Gas moles calculation"
            note="Use 22.4 L for old STP pressure (1 atm) or 22.7 L for modern pressure (1 bar)."
            priority={5}
          />
          <FormulaCard
            formula="n = N / N<sub>A</sub>"
            use="Mole calculations from particle counts"
            note="N is the total count of atoms, molecules, or ions; N<sub>A</sub> = 6.022 &times; 10²³."
            priority={5}
          />
          <FormulaCard
            formula="X<sub>A</sub> = n<sub>A</sub> / (n<sub>A</sub> + n<sub>B</sub>)"
            use="Mole fraction (X)"
            note="Ratio of component moles to total moles of all components in solution. &Sigma;X = 1."
            priority={5}
          />
        </div>
      </div>

      {/* PART 5: PERCENTAGE COMPOSITION */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 5</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Percentage Composition</h2>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70 leading-relaxed">
          <SectionBanner label="5.1 Calculation Definition" />
          <p>
            Percentage composition specifies the mass percentage of each constituent element present in a pure chemical compound:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <FormulaCard
              formula="% Element = (Mass of Element / Molar Mass) &times; 100"
              use="Determine chemical formula mass fractions"
              note="Calculated based on 1 mole of the substance."
              priority={5}
            />
            <div className="p-4.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
              <strong className="text-cyan-400 block text-[12.5px] uppercase">Example (Glucose C₆H₁₂O₆):</strong>
              <p className="text-[13px] text-white/80">Molar Mass = 180 g/mol.</p>
 <ul className="text-[12.5px] text-white/60 space-y-1">
                <li>&bull; % C = (72g / 180g) &times; 100 = <strong>40.0%</strong></li>
                <li>&bull; % H = (12.096g / 180g) &times; 100 = <strong>6.72%</strong></li>
                <li>&bull; % O = (96g / 180g) &times; 100 = <strong>53.28%</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2: Empirical & Molecular Formula Theory */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="5.2 Empirical &amp; Molecular Formula Determination" />
          <p className="text-white/70 text-[13.5px] leading-relaxed">
            While percentage composition gives mass fractions, the chemical formulas represent atom counts:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">Empirical Formula</span>
              <p>Represents the simplest whole-number ratio of various atoms present in a compound.</p>
              <span className="text-violet-400 font-bold block pt-1.5 uppercase tracking-wider">Molecular Formula</span>
              <p>Represents the actual number of atoms of each element present in a molecule of the compound.</p>
            </div>
            <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">Mathematical Relation</span>
              <code className="text-cyan-300 block font-mono text-center py-1 bg-black/20 my-1 font-bold">Molecular Formula = n &times; Empirical Formula</code>
              <p>where the multiplier <code>n</code> is defined as:</p>
              <code className="text-violet-300 block font-mono text-center py-1 bg-black/20 my-1 font-bold">n = Molar Mass / Empirical Formula Mass</code>
              <p className="text-white/40 text-[10px] leading-snug">Example: Glucose has empirical formula <code>CH₂O</code>. With molar mass 180g/mol, its empirical mass is 30g/mol. Hence, <code>n = 180 / 30 = 6</code>, giving molecular formula <code>C₆H₁₂O₆</code>.</p>
            </div>
          </div>
          <div className="p-4.5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
            <span className="text-cyan-400 font-bold block uppercase tracking-wider">Step-by-Step Determination Method</span>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-white/70">
              <li><strong>Convert Mass % to Grams:</strong> Assume a 100g sample so that mass percentages directly represent gram masses of each element.</li>
              <li><strong>Convert to Moles:</strong> Divide the mass of each element by its respective atomic mass to find relative moles.</li>
              <li><strong>Calculate Mole Ratios:</strong> Divide all the calculated mole values by the smallest mole value obtained in step 2.</li>
              <li><strong>Convert to Whole Numbers:</strong> If any ratio is fractional, multiply all ratios by a suitable integer (e.g., multiply by 2 if ending in 0.5, by 3 if ending in 0.33) to make them integers.</li>
              <li><strong>Write Formulas:</strong> Write symbols with the calculated integers as subscripts to obtain the empirical formula. Use molar mass to find <code>n</code> and get the molecular formula.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* PART 6: CHEMICAL EQUATIONS & BALANCING */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 6</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Chemical Equations &amp; Balancing</h2>
        </div>

        {/* Card 1: skeletal vs balanced */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70 leading-relaxed">
          <SectionBanner label="6.1 Equations Basics" />
          <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-white/75">
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
              <strong className="text-white">Skeletal Equation</strong>
              <p>Unbalanced formula summary indicating reactants and products.</p>
              <code className="text-rose-300 font-mono">Mg + O₂ &rarr; MgO</code>
            </div>
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-1">
              <strong className="text-white">Balanced Equation</strong>
              <p>Conforms to conservation of mass by matching atom counts on both sides.</p>
              <code className="text-cyan-300 font-mono">2Mg(s) + O₂(g) &rarr; 2MgO(s)</code>
            </div>
          </div>
          <div className="p-4 bg-violet-500/5 border border-violet-500/10 rounded-xl space-y-2">
            <strong className="text-violet-400 block text-[12.5px] uppercase">State Symbols:</strong>
            <p>&bull; <strong>(s):</strong> Solid | <strong>(l):</strong> Liquid | <strong>(g):</strong> Gas | <strong>(aq):</strong> Aqueous solution</p>
          </div>
        </div>

        {/* Card 2: Balancing Methods */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70 leading-relaxed">
          <SectionBanner label="6.2 Balancing Methods" />
          <div className="space-y-4">
            <div className="p-4.5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
              <strong className="text-white">A. Hit-and-Trial (Inspection)</strong>
              <p>Balance elements starting with the one in the largest formula first.</p>
 <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[12.5px] text-cyan-300">
                Fe + H₂O &rarr; Fe₃O₄ + H₂
                <br />1. Balance Fe: 3Fe + H₂O &rarr; Fe₃O₄ + H₂
                <br />2. Balance O: 3Fe + 4H₂O &rarr; Fe₃O₄ + H₂
                <br />3. Balance H: 3Fe + 4H₂O &rarr; Fe₃O₄ + 4H₂ (Balanced!)
              </div>
            </div>

            <div className="p-4.5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
              <strong className="text-white">B. Algebraic Method</strong>
              <p>Assign variable coefficients and solve simultaneous system equations.</p>
 <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-[12.5px] text-cyan-300">
                a &middot; C₃H₈ + b &middot; O₂ &rarr; c &middot; CO₂ + d &middot; H₂O
                <br />&bull; Carbon balance: 3a = c
                <br />&bull; Hydrogen balance: 8a = 2d  &rArr; d = 4a
                <br />&bull; Oxygen balance: 2b = 2c + d
                <br />Set a = 1 &rArr; c = 3, d = 4, 2b = 6+4 = 10 &rArr; b = 5.
                <br />Equation: C₃H₈ + 5O₂ &rarr; 3CO₂ + 4H₂O
              </div>
            </div>

            <div className="p-4.5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
              <strong className="text-white">C. Redox Balancing Methods</strong>
              <div className="grid sm:grid-cols-2 gap-3 text-[12.5px] pt-1">
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                  <strong className="text-white block font-sans">1. Oxidation Number Method</strong>
                  <p>1. Find oxidation numbers of reacting elements.</p>
                  <p>2. Multiply species coefficients to equalize gain and loss of ON.</p>
                  <p>3. Balance remaining charges and atoms (H⁺/OH⁻ and H₂O).</p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                  <strong className="text-white block font-sans">2. Ion-Electron Method</strong>
                  <p>1. Split into oxidation and reduction half-reactions.</p>
                  <p>2. Balance atoms except O and H.</p>
                  <p>3. Add H₂O/H⁺/OH⁻ to balance O/H; add electrons to balance charge.</p>
                  <p>4. Match electron transfers and add halves.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Types of Chemical Reactions */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70 leading-relaxed">
          <SectionBanner label="6.3 Classification of Chemical Reactions" />
          <p className="text-[13px] text-white/60">
            Reactions are classified based on how atoms and molecules regroup during the chemical transformation:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">1. Combination Reactions</span>
              <p className="text-white/50">Two or more reactants combine to form a single product.</p>
              <code className="text-cyan-300 block font-mono">A + B &rarr; AB</code>
              <p className="text-white/40 text-[10px]">Example: <code>2Mg(s) + O₂(g) &rarr; 2MgO(s)</code></p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-violet-400 font-bold block uppercase tracking-wider">2. Decomposition Reactions</span>
              <p className="text-white/50">A single reactant breaks down into two or more simpler products.</p>
              <code className="text-violet-300 block font-mono">AB &rarr; A + B</code>
              <p className="text-white/40 text-[10px]">Example: <code>2H₂O(l) &rarr; 2H₂(g) + O₂(g)</code></p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold block uppercase tracking-wider">3. Displacement Reactions</span>
              <p className="text-white/50">A more reactive element displaces a less reactive element from its compound.</p>
              <code className="text-emerald-300 block font-mono">A + BC &rarr; AC + B</code>
              <p className="text-white/40 text-[10px]">Example: <code>Zn(s) + CuSO₄(aq) &rarr; ZnSO₄(aq) + Cu(s)</code></p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold block uppercase tracking-wider">4. Double Displacement Reactions</span>
              <p className="text-white/50">Mutual exchange of ions between two compounds to form two new compounds.</p>
              <code className="text-amber-300 block font-mono">AB + CD &rarr; AD + CB</code>
              <p className="text-white/40 text-[10px]">Example: <code>AgNO₃(aq) + NaCl(aq) &rarr; AgCl(s) + NaNO₃(aq)</code></p>
            </div>
          </div>
          <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-xs text-white/70">
            <strong>Note:</strong> To identify a reaction type, examine the reactants and count of products. A single product points to combination, whereas a single reactant points to decomposition.
          </div>
        </div>

        {/* Card 4: Limitations */}
        <div className="p-6 rounded-3xl bg-rose-500/5 border border-rose-500/10 space-y-4 shadow-lg text-[13.5px] text-white/75 leading-relaxed">
          <strong className="text-rose-400 block font-semibold">Limitations of Chemical Equations ⚠️</strong>
          <p>A balanced equation summarizes chemical stoichiometry, but fails to show:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-white/70 text-[13px]">
            <li>&bull; <strong>Rate:</strong> Does not indicate how fast the reaction occurs.</li>
            <li>&bull; <strong>Mechanism:</strong> Does not reveal individual molecular steps.</li>
            <li>&bull; <strong>Reversibility:</strong> Does not show if the reaction reaches equilibrium.</li>
            <li>&bull; <strong>Energy changes:</strong> Enthalpy differences are omitted unless explicitly annotated (&Delta;H).</li>
          </ul>
        </div>
      </div>

      {/* PART 7: CONCENTRATION TERMS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 7</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Concentration Terms</h2>
        </div>

        <ConcentrationConversionsSVG />
        <SolutionDilutionScalingSVG />

        {/* Card 1: Concentration Properties & Enrichment */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70 leading-relaxed">
          <SectionBanner label="7.1 Concentration Properties &amp; Enrichment" />
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider">Mole Fraction (X)</span>
              <p>
                The ratio of the number of moles of a particular component to the total number of moles of all components present in the solution.
              </p>
              <p className="text-white/50">
                It is unitless and temperature-independent. The sum of mole fractions of all components is always exactly 1: <code>X<sub>A</sub> + X<sub>B</sub> = 1</code>.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-violet-400 font-bold block uppercase tracking-wider">Normality (N) &amp; Equivalent Mass</span>
              <p>
                Normality is the number of gram equivalents of solute dissolved per litre of solution. It is temperature-dependent.
              </p>
              <code className="text-violet-300 block font-mono text-[11.5px] py-1 bg-black/20 text-center font-bold">N = Molarity &times; n-factor</code>
              <p>
                Equivalent Mass is calculated as:
              </p>
              <code className="text-cyan-300 block font-mono text-[11.5px] py-1 bg-black/20 text-center font-bold">Equivalent Mass = Molar Mass / n-factor</code>
            </div>
          </div>
          <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-2 text-xs">
            <strong className="text-white block">Understanding the n-factor:</strong>
            <p>&bull; <strong>Acids:</strong> Basicity (number of replaceable H⁺ ions). E.g. HCl (1), H₂SO₄ (2), H₃PO₄ (3), H₃PO₃ (2 - dibasic!).</p>
            <p>&bull; <strong>Bases:</strong> Acidity (number of replaceable OH⁻ ions). E.g. NaOH (1), Ca(OH)₂ (2).</p>
            <p>&bull; <strong>Salts:</strong> Total positive (or negative) charge of ions. E.g. Al₂(SO₄)₃ has 2 Al³⁺ ions, so n-factor = 6.</p>
            <p>&bull; <strong>Redox Agents:</strong> Total change in oxidation number of the reacting species per molecule. E.g. MnO₄⁻ in acidic medium reduces to Mn²⁺, change = 5, so n-factor = 5.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormulaCard
            formula="M = moles solute / Volume solution (L)"
            use="Molarity (M) calculation"
            note="Temperature dependent because solution volume changes with thermal expansions."
            priority={5}
          />
          <FormulaCard
            formula="m = moles solute / kg solvent"
            use="Molality (m) calculation"
            note="Temperature independent because mass variables remain invariant under heating."
            priority={5}
          />
          <FormulaCard
            formula="ppm = (solute mass / solution mass) &times; 10⁶"
            use="Parts Per Million (ppm) scaling"
            note="Perfect for trace pollutants or extremely dilute solutes."
            priority={5}
          />
          <FormulaCard
            formula="M = 10 &middot; d &middot; % / Molar Mass"
            use="Molarity from Density &amp; Mass percent shortcut"
            note="d is solution density in g/mL. Avoids multiple intermediate volume steps."
            priority={5}
          />
        </div>
      </div>

      {/* PART 8: SIGNIFICANT FIGURES */}
      <div className="space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[10px] font-extrabold">PART 8</span>
          <h2 className="font-display text-white font-extrabold text-[18px] uppercase tracking-wide">Significant Figures</h2>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg text-[13.5px] text-white/70 leading-relaxed">
          <SectionBanner label="8.1 Key Rules" />
          <ul className="space-y-2">
            <li>&bull; Non-zero digits are always significant (e.g. 256 has 3 SF).</li>
            <li>&bull; Zeros preceding the first non-zero digit are not significant (e.g. 0.002 has 1 SF).</li>
            <li>&bull; Zeros between non-zero digits are significant (e.g. 2.02 has 3 SF).</li>
            <li>&bull; Zeros at the end of a number to the right of the decimal are significant (e.g. 0.200 has 3 SF).</li>
          </ul>
        </div>

        {/* SF Operation Table */}
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4 shadow-lg">
          <SectionBanner label="8.2 Mathematical Operations" />
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] text-white/70 text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/40">
                  <th className="py-2">Operation</th>
                  <th>Rule</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2.5 text-cyan-400 font-bold">Addition / Subtraction</td>
                  <td>Match term with the <strong>least decimal places</strong>.</td>
                  <td><code>12.11 + 18.0 = 30.1</code></td>
                </tr>
                <tr className="hover:bg-white/[0.01]">
                  <td className="py-2.5 text-violet-400 font-bold">Multiplication / Division</td>
                  <td>Match term with the <strong>least significant figures</strong>.</td>
                  <td><code>2.5 &times; 1.25 = 3.1</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PART 9: INTERACTIVE SOLVERS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Stoichiometry &amp; Molarity Solver</h2>
        </div>

        <LimitingReagentProgressSVG />

        {/* Limiting Reagent Solver */}
        <div className="space-y-4 pt-2">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Limiting Reagent (LR) &amp; Yield calculator</span>
          <p className="text-[10px] text-white/40">Equation modeled: Coeff.A &middot; Reactant A + Coeff.B &middot; Reactant B &rarr; Coeff.Prod &middot; Product C</p>
          <div className="grid grid-cols-5 gap-2">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Coeff. A:</label>
              <input type="number" value={coeffA} onChange={e => setCoeffA(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Moles A:</label>
              <input type="number" value={molesA} onChange={e => setMolesA(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Coeff. B:</label>
              <input type="number" value={coeffB} onChange={e => setCoeffB(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Moles B:</label>
              <input type="number" value={molesB} onChange={e => setMolesB(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Coeff. Prod C:</label>
              <input type="number" value={coeffProd} onChange={e => setCoeffProd(e.target.value)} className="w-full px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Reactant A index (moles/coeff): <span className="text-cyan-400 font-bold">{indexA.toFixed(3)}</span></p>
            <p>&bull; Reactant B index (moles/coeff): <span className="text-violet-400 font-bold">{indexB.toFixed(3)}</span></p>
            <p>&bull; Limiting Reagent = <span className="text-emerald-400 font-bold">{lrIdentifier}</span></p>
            <p>&bull; Max product C formed = <span className="text-rose-400 font-bold">{maxProductMoles.toFixed(3)} moles</span></p>
          </div>
        </div>

        {/* Molarity conversion solver */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider block">Molarity from Mass % and Density Converter</span>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Mass % (w/w):</label>
              <input type="number" value={massPct} onChange={e => setMassPct(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Density (d in g/mL):</label>
              <input type="number" step="0.1" value={densityD} onChange={e => setDensityD(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 block mb-1">Solute Molar Mass:</label>
              <input type="number" value={molarM} onChange={e => setMolarM(e.target.value)} className="w-full px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs outline-none" />
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/80 space-y-1">
            <p>&bull; Calculated Molarity = <span className="text-emerald-400 font-bold">{derivedMolarity.toFixed(3)} M</span></p>
          </div>
        </div>
      </div>

      {/* SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </span>
            <h3 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Solved IAT Examples</h3>
          </div>
          <Tag color="emerald">Medium</Tag>
        </div>

        <div className="space-y-6">
          {/* Example 1 */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[11.5px] font-extrabold text-emerald-400 uppercase tracking-widest block">Example 1: Limiting Reagent &amp; Excess Reagent</span>
            <p className="text-white/85 font-medium">If 2 moles of N₂ gas are mixed with 5 moles of H₂ gas to synthesize ammonia according to N₂ + 3H₂ &rarr; 2NH₃. Identify the limiting reagent and determine the moles of excess reagent left.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/60">
              <p>1. Compare stoichiometric indices: <code>moles / coefficient</code>.</p>
              <p>2. For N₂: <code>2 / 1 = 2</code>.</p>
              <p>3. For H₂: <code>5 / 3 = 1.67</code>.</p>
              <p>4. Since 1.67 &lt; 2, <strong>H₂ is the Limiting Reagent</strong>.</p>
              <p>5. Moles of N₂ reacted: <code>5 moles H₂ &times; (1 mol N₂ / 3 mol H₂) = 1.67 moles N₂</code>.</p>
              <p>6. Moles of excess N₂ left: <code>2 - 1.67 = 0.33 moles</code>.</p>
              <p className="text-cyan-300 font-bold font-mono">Limiting Reagent = H₂ | Excess N₂ Left = 0.33 mol</p>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[11.5px] font-extrabold text-emerald-400 uppercase tracking-widest block">Example 2: Molarity calculation using density</span>
            <p className="text-white/80">Calculate the molarity of a 20% (w/w) NaOH solution with density d = 1.2 g/mL.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/60">
              <p>1. Solute Molar Mass (NaOH) = <code>23 + 16 + 1 = 40 g/mol</code>.</p>
              <p>2. Apply density shortcut: <code>M = [10 &times; d &times; %] / Molar Mass</code>.</p>
              <p>3. Evaluate: <code>M = [10 &times; 1.2 &times; 20] / 40 = 240 / 40 = 6 M</code>.</p>
              <p className="text-cyan-300 font-bold font-mono">Molarity = 6.0 M</p>
            </div>
          </div>

          {/* Example 3: Average Atomic Mass (RESTORED) */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[11.5px] font-extrabold text-emerald-400 uppercase tracking-widest block">Example 3: Average Atomic Mass calculation</span>
            <p className="text-white/80">Chlorine occurs in nature as two isotopes: ³⁵Cl (75% abundance, 34.97 u) and ³⁷Cl (25% abundance, 36.97 u). Calculate the average atomic mass of Chlorine.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/60">
              <p>1. Formula: <code>Avg Mass = &Sigma;(abundance &times; isotopic mass)</code>.</p>
              <p>2. Substitute: <code>(0.75 &times; 34.97) + (0.25 &times; 36.97)</code>.</p>
              <p>3. Compute: <code>26.2275 + 9.2425 = 35.47 u &approx; 35.5 u</code>.</p>
              <p className="text-cyan-300 font-bold font-mono">Average Atomic Mass of Cl &approx; 35.5 u</p>
            </div>
          </div>

          {/* Example 4: Vapour Density and Molecular Weight */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[11.5px] font-extrabold text-emerald-400 uppercase tracking-widest block">Example 4: Vapour Density calculations</span>
            <p className="text-white/80">A gas has a vapour density of 32. Calculate its molecular mass and find the volume occupied by 16g of this gas at STP.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/60">
              <p>1. Calculate Molecular Mass: <code>Mass = 2 &times; VD = 2 &times; 32 = 64 g/mol</code> (matches SO₂).</p>
              <p>2. Calculate moles in 16g sample: <code>n = 16g / 64 g/mol = 0.25 moles</code>.</p>
              <p>3. Calculate volume occupied at STP: <code>Volume = n &times; 22.4 L = 0.25 &times; 22.4 = 5.6 Litres</code>.</p>
              <p className="text-cyan-300 font-bold font-mono">Molecular Mass = 64 g/mol | Volume at STP = 5.6 Litres</p>
            </div>
          </div>

          {/* Example 5: Empirical & Molecular Formula Calculation */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[11.5px] font-extrabold text-emerald-400 uppercase tracking-widest block">Example 5: Empirical &amp; Molecular Formula Determination</span>
            <p className="text-white/85 font-medium">An organic compound contains 40.0% Carbon, 6.7% Hydrogen, and 53.3% Oxygen by mass. If its molar mass is 180 g/mol, determine its empirical and molecular formulas.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/65">
              <p>1. Convert mass percents to moles (assume 100g sample):
                <br />&bull; Moles of C = <code>40.0 / 12 = 3.33</code>
                <br />&bull; Moles of H = <code>6.7 / 1 = 6.7</code>
                <br />&bull; Moles of O = <code>53.3 / 16 = 3.33</code>
              </p>
              <p>2. Divide by the smallest mole value (3.33) to get simple integer ratio:
                <br />&bull; C = <code>3.33 / 3.33 = 1</code>
                <br />&bull; H = <code>6.7 / 3.33 &approx; 2</code>
                <br />&bull; O = <code>3.33 / 3.33 = 1</code>
                <br />Empirical Formula (EF) = <strong>CH₂O</strong>.
              </p>
              <p>3. Calculate empirical formula mass: <code>EF Mass = 12 + 2(1) + 16 = 30 g/mol</code>.</p>
              <p>4. Find scaling multiplier: <code>n = Molar Mass / EF Mass = 180 / 30 = 6</code>.</p>
              <p>5. Molecular Formula: <code>(CH₂O) &times; 6 = C₆H₁₂O₆</code>.</p>
              <p className="text-cyan-300 font-bold font-mono">Empirical Formula = CH₂O | Molecular Formula = C₆H₁₂O₆</p>
            </div>
          </div>

          {/* Example 6: Balancing Redox Reaction */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3.5 text-[13.5px] leading-relaxed">
            <span className="text-[11.5px] font-extrabold text-emerald-400 uppercase tracking-widest block">Example 6: Redox Equation Balancing (Oxidation Number Method)</span>
            <p className="text-white/85 font-medium">Balance the following skeletal redox reaction in acidic medium: <code>MnO₄⁻ + Fe²⁺ &rarr; Mn²⁺ + Fe³⁺</code>.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/65">
              <p>1. Find oxidation state changes:
                <br />&bull; Mn in MnO₄⁻ (+7) &rarr; Mn²⁺ (+2) (Gain of 5 electrons | Reduction).
                <br />&bull; Fe²⁺ (+2) &rarr; Fe³⁺ (+3) (Loss of 1 electron | Oxidation).
              </p>
              <p>2. Equalize electron transfer: Multiply Fe species coefficients by 5:
                <br /><code>MnO₄⁻ + 5Fe²⁺ &rarr; Mn²⁺ + 5Fe³⁺</code>.
              </p>
              <p>3. Balance oxygen atoms: Add 4 H₂O to products:
                <br /><code>MnO₄⁻ + 5Fe²⁺ &rarr; Mn²⁺ + 5Fe³⁺ + 4H₂O</code>.
              </p>
              <p>4. Balance hydrogen atoms: Add 8 H⁺ to reactants:
                <br /><code>MnO₄⁻ + 5Fe²⁺ + 8H⁺ &rarr; Mn²⁺ + 5Fe³⁺ + 4H₂O</code> (Balanced!).
              </p>
              <p className="text-cyan-300 font-bold font-mono">Balanced Equation: MnO₄⁻ + 5Fe²⁺ + 8H⁺ &rarr; Mn²⁺ + 5Fe³⁺ + 4H₂O</p>
            </div>
          </div>
        </div>
      </div>

      {/* COMMON TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5 shadow-xl">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-4">
          <TrapCard title="Trap 1: Mass-based stoichiometric coefficients division">
            Never divide starting gram masses by stoichiometric coefficients. Convert all inputs to moles first, then compare index values.
          </TrapCard>
          <TrapCard title="Trap 2: Molarity vs Molality temperature dependencies">
            Molarity (M) depends on temperature because it uses solution volume (which expands). Molality (m) is temperature-independent because it uses solvent mass.
          </TrapCard>
          <TrapCard title="Trap 3: 1 atm vs 1 bar in Molar Volumes">
            Do not confuse old STP volume (22.4 L/mol under 1 atm) with new IUPAC volume (22.7 L/mol under 1 bar). 1 atm = 1.01325 bar.
          </TrapCard>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
          <h3 className="text-cyan-400 font-display font-bold text-[16px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Physical states: Solids, Liquids, Gases, plus Plasma and BEC",
            "Extensive (Mass, Volume) vs Intensive properties (Density, Temp, Pressure)",
            "Pure elements/compounds vs homogeneous/heterogeneous mixtures",
            "Conservation of mass is not valid for nuclear reactions (E = mc²)",
            "Dalton: matter consists of indivisible atoms; identical element = same mass",
            "Dalton limits: subatomic structure, isotopes, isobars, allotropes",
            "Definition of Atom vs Molecule (H exists as H₂ molecule)",
            "1 amu/u = 1/12th Carbon-12 mass = 1.66056 &times; 10⁻²⁴ g",
            "GAM & GMM represent mass of 1 mole in grams (Oxygen = 16g, Water = 18g)",
            "Formula Mass is used for ionic compounds (NaCl) lacking discrete molecules",
            "Vapour Density formula: Molecular Mass = 2 &times; Vapour Density",
            "Avg Atomic Mass: &Sigma;(fractional abundance &times; isotope mass)",
            "Mole: amount containing exactly N<sub>A</sub> = 6.022 &times; 10²³ particles",
            "STP Volume: 22.4 L (1 atm) or 22.7 L (1 bar) per mole of ideal gas",
            "Empirical vs Molecular formulas: Molecular Formula = n &times; Empirical Formula",
            "Reaction types: Combination, Decomposition, Displacement, Double Displacement",
            "Redox: Oxidation (loss of e⁻ / ON increase) vs Reduction (gain of e⁻ / ON decrease)",
            "Limiting Reagent: reactant with the smallest (moles/coefficient) ratio"
          ].map(item => (
            <div key={item} className="flex items-start gap-2.5 text-[13px] text-white/70 py-1.5 border-b border-white/[0.04] last:border-0">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
