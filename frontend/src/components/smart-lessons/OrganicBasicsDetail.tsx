import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cn } from '../../lib/utils';
import { 
  Star, 
  Atom, 
  Layers, 
  FlaskConical, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb,
  Zap,
  TrendingUp,
  RefreshCw,
  Sparkles,
  Sliders,
  Award,
  Scissors,
  Activity
} from 'lucide-react';

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


// ─── LOCAL SUB-COMPONENTS ───────────────────────────────────────────────────

function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' | 'pink' }) {
  const styles = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function SectionBanner({ label, color = 'cyan' }: { label: string; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500',
    rose: 'bg-rose-500/10 text-rose-400 border-l-2 border-rose-500',
    amber: 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500',
    violet: 'bg-violet-500/10 text-violet-400 border-l-2 border-violet-500',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500',
  };

  return (
    <div className={`px-3 py-1.5 rounded text-[11.5px] font-black uppercase tracking-wider ${styles[color]}`}>
      {label}
    </div>
  );
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 flex gap-3 text-[13px] text-white/70 leading-relaxed">
      <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      <div>
        <span className="text-cyan-400 font-bold block mb-0.5">Gold Tip / Insight</span>
        {children}
      </div>
    </div>
  );
}

function WarningCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 flex gap-3 text-[13px] text-white/70 leading-relaxed">
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
      <div>
        <span className="text-rose-400 font-bold block mb-0.5">{title}</span>
        {children}
      </div>
    </div>
  );
}

function Collapsible({ 
  title, 
  icon, 
  accent = 'cyan', 
  defaultOpen = false, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  accent?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald'; 
  defaultOpen?: boolean; 
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colors = {
    cyan: {
      border: 'border-white/5 hover:border-cyan-500/30',
      activeBorder: 'border-cyan-500/30',
      bg: 'bg-[#0b1220]/20',
      text: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10'
    },
    rose: {
      border: 'border-white/5 hover:border-rose-500/30',
      activeBorder: 'border-rose-500/30',
      bg: 'bg-[#180a0f]/20',
      text: 'text-rose-400',
      iconBg: 'bg-rose-500/10'
    },
    amber: {
      border: 'border-white/5 hover:border-amber-500/30',
      activeBorder: 'border-amber-500/30',
      bg: 'bg-[#18110a]/20',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    },
    violet: {
      border: 'border-white/5 hover:border-violet-500/30',
      activeBorder: 'border-violet-500/30',
      bg: 'bg-[#110a18]/20',
      text: 'text-violet-400',
      iconBg: 'bg-violet-500/10'
    },
    emerald: {
      border: 'border-white/5 hover:border-emerald-500/30',
      activeBorder: 'border-emerald-500/30',
      bg: 'bg-[#0a1811]/20',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10'
    }
  };

  const style = colors[accent];

  return (
    <div className={`border rounded-3xl transition-all duration-300 overflow-hidden ${isOpen ? style.activeBorder + ' ' + style.bg : style.border}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-3.5">
          <div className={`p-2.5 rounded-xl ${style.iconBg} ${style.text}`}>
            {icon}
          </div>
          <span className="font-bold text-white text-sm sm:text-base">{title}</span>
        </div>
        <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </div>
      </button>
      
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 border-t border-white/5 pt-5 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface OrganicBasicsDetailProps {
  progress?: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

export default function OrganicBasicsDetail({ progress, isCompleted, onNavigate }: OrganicBasicsDetailProps) {
  // --- Simulator 1: Stability Predictor ---
  const [intermediateType, setIntermediateType] = useState<'carbocation' | 'carbanion' | 'radical'>('carbocation');
  const [substituent, setSubstituent] = useState<'methyl' | 't-butyl' | 'nitro' | 'methoxy' | 'allyl'>('t-butyl');

  const getStabilityResult = () => {
    if (intermediateType === 'carbocation') {
      switch (substituent) {
        case 't-butyl':
          return {
            score: 95,
            level: 'Highly Stable',
            explanation: 'Stabilized by strong hyperconjugation (9 alpha-hydrogens) and positive inductive effects (+I) from three methyl groups.',
            dominant: 'Hyperconjugation & +I Effect'
          };
        case 'allyl':
          return {
            score: 90,
            level: 'Resonance Stabilized',
            explanation: 'Highly stabilized by complete delocalization of the positive charge across the double bond (equivalent resonance structures).',
            dominant: 'Resonance (+R) Effect'
          };
        case 'methoxy':
          return {
            score: 98,
            level: 'Exceptionally Stable',
            explanation: 'Oxygen adjacent to the carbocation back-donates its lone pair, completing the octet of the positively charged carbon via resonance.',
            dominant: 'Resonance (+R) / Lone Pair Back-donation'
          };
        case 'methyl':
          return {
            score: 20,
            level: 'Highly Unstable',
            explanation: 'No alpha-hydrogens for hyperconjugation and no +I alkyl groups. Pure primary-like methyl carbocation is extremely reactive.',
            dominant: 'Lack of Stabilization'
          };
        case 'nitro':
          return {
            score: 5,
            level: 'Extremely Destabilized',
            explanation: 'The nitro group is a powerful electron-withdrawing group (-I, -R) which pulls electron density away from a carbon that is already positive.',
            dominant: 'Inductive & Resonance Electron-Withdrawal (-I, -R)'
          };
      }
    } else if (intermediateType === 'carbanion') {
      switch (substituent) {
        case 't-butyl':
          return {
            score: 10,
            level: 'Extremely Unstable',
            explanation: 'Highly destabilized by the +I electron-donating inductive effect of three methyl groups pushing negative charge onto the carbanion carbon.',
            dominant: '+I Effect Destabilization'
          };
        case 'allyl':
          return {
            score: 85,
            level: 'Resonance Stabilized',
            explanation: 'Stabilized by delocalization of the negative charge (carbanion lone pair) into the adjacent carbon-carbon double bond.',
            dominant: 'Resonance (+R) Delocalization'
          };
        case 'methoxy':
          return {
            score: 30,
            level: 'Unstable',
            explanation: 'Although oxygen is highly electronegative (-I), its lone pairs offer no positive resonance stabilization here, and steric effects destabilize it.',
            dominant: 'Electronegativity (-I) vs. Repulsion'
          };
        case 'methyl':
          return {
            score: 60,
            level: 'Moderately Stable (Alkyl standard)',
            explanation: 'More stable than other alkyl carbanions because it lacks electron-donating alkyl groups (primary/tertiary) that increase negative charge density.',
            dominant: 'Absence of Alkyl +I Effects'
          };
        case 'nitro':
          return {
            score: 98,
            level: 'Exceptionally Stable',
            explanation: 'The nitro group pulls the negative charge into its oxygen atoms through resonance (-R) and strong induction (-I), completely dispersing the charge.',
            dominant: 'Resonance Electron-Withdrawal (-R)'
          };
      }
    } else { // Free Radical
      switch (substituent) {
        case 't-butyl':
          return {
            score: 90,
            level: 'Highly Stable',
            explanation: 'Stabilized by hyperconjugation (9 alpha-hydrogens) and positive inductive effects (+I) supporting the electron-deficient radical center.',
            dominant: 'Hyperconjugation'
          };
        case 'allyl':
          return {
            score: 88,
            level: 'Resonance Stabilized',
            explanation: 'The single unpaired electron is delocalized over the adjacent pi system, providing strong resonance stabilization.',
            dominant: 'Resonance Delocalization'
          };
        case 'methoxy':
          return {
            score: 75,
            level: 'Stable',
            explanation: 'Stabilized to some extent by electron donation from the neighboring oxygen atom dispersing the electron deficiency.',
            dominant: 'Hyperconjugation / Radical Resonance'
          };
        case 'methyl':
          return {
            score: 25,
            level: 'Highly Unstable',
            explanation: 'Lacks any hyperconjugative C-H bonds or alkyl groups to offset the electron deficiency of the radical carbon.',
            dominant: 'Lack of Stabilization'
          };
        case 'nitro':
          return {
            score: 40,
            level: 'Unstable',
            explanation: 'Nitro group exerts a strong electron-withdrawing effect which destabilizes the electron-deficient radical center.',
            dominant: 'Electron-Withdrawal (-I)'
          };
      }
    }
  };

  const stability = getStabilityResult();

  // --- Simulator 2: DBE & Isomer Calculator ---
  const [carbonCount, setCarbonCount] = useState<number>(6);
  const [hydrogenCount, setHydrogenCount] = useState<number>(6);
  const [nitrogenCount, setNitrogenCount] = useState<number>(0);
  const [halogenCount, setHalogenCount] = useState<number>(0);

  const calculateDBE = () => {
    // DBE = C - (H + X)/2 + N/2 + 1
    const dbe = carbonCount - (hydrogenCount + halogenCount) / 2 + nitrogenCount / 2 + 1;
    return dbe;
  };

  const dbeVal = calculateDBE();

  const getIsomerSuggestions = (dbe: number) => {
    if (dbe < 0) return 'Invalid chemical formula (impossible valency ratios).';
    if (dbe === 0) return 'Saturated open-chain compound. No rings, no double/triple bonds. All carbons are sp³ hybridised. Examples include alkanes (e.g. Hexane) or open-chain saturated alcohols/ethers.';
    if (dbe === 1) return 'Contains either 1 double bond (alkene, carbonyl C=O) OR 1 ring (cycloalkane). One carbon is sp² hybridised if a double bond exists.';
    if (dbe === 2) return 'Contains either 2 double bonds, 1 triple bond (alkyne, nitrile -C≡N), 2 rings, or 1 ring + 1 double bond. Carbons can be sp (triple bond) or sp² (double bonds).';
    if (dbe === 3) return 'Contains combinations totaling 3 degrees of unsaturation (e.g. 3 double bonds, 1 triple bond + 1 ring, 2 rings + 1 double bond).';
    if (dbe >= 4) return `High unsaturation (DBE = ${dbe}). Highly likely to contain a Benzene ring (which consumes 4 degrees of unsaturation: 1 ring + 3 double bonds). Examples: Benzene (DBE=4), Aniline (DBE=4), Benzoic acid (DBE=5).`;
    return '';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white">
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0a1518] via-[#091013] to-[#0a1518] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="cyan">Chemistry</Tag>
            <Tag color="emerald">Unit 10</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="violet">GOC Core</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Organic Chemistry: <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">Basic Principles & Techniques</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Master the structural parameters, nomenclature rules, electron delocalisation effects, reaction intermediate geometries, basicity/acidity trends, purification methodologies, and chemical identification tests that form the GOC bedrock of Organic Chemistry.
          </p>
        </div>
      </div>

      {/* ── SECTION 1: CORE CONCEPT & SPONTANEITY BOUNDARIES ───────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            1. Core Concept & The Scope of Organic Chemistry
          </h2>
          <SectionBanner label="Introduction" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong>Organic chemistry</strong> is the branch of chemistry concerned primarily with the structure, properties, preparation, reactions, and mechanisms of carbon compounds, especially hydrocarbons and their derivatives.
          </p>

          <WarningCard title="The Carbon Compound Boundary Trap">
            {"Do not assume every carbon-containing compound is organic. Compounds such as carbon monoxide (CO), carbon dioxide (CO₂), carbonates, bicarbonates, hydrogen cyanides, and metal carbides are conventionally treated as inorganic chemistry due to their ionic structures and minerals-like chemical behavior."}
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 2: UNIQUE NATURE OF CARBON ──────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-emerald-400" />
            2. The Unique Nature of Carbon
          </h2>
          <SectionBanner label="Carbon Properties" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Carbon forms millions of stable compounds due to two unique properties:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">1. Tetravalency</span>
              <p className="text-xs text-white/70">
                Carbon has 4 valence electrons and forms 4 covalent bonds. Carbon can hybridise its s and p orbitals to form tetrahedral, trigonal planar, or linear carbon nodes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block uppercase">2. Catenation</span>
              <p className="text-xs text-white/70">
                The linkage of atoms of the same element into longer chains or rings. The C-C bond is exceptionally strong (348 kJ/mol) and stable, allowing chains of virtually infinite length.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: HYBRIDISATION & SHAPES ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            3. Hybridisation & Molecular Shapes
          </h2>
          <SectionBanner label="Structure" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Hybridisation depends on the <strong>number of electron domains / orbitals involved</strong> rather than simply counting double/triple bonds. Carbon uses three primary hybrid states:
          </p>

          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2.5">Hybridisation</th>
                  <th className="p-2.5">Hybrid Orbitals</th>
                  <th className="p-2.5">Unhybridised p Orbitals</th>
                  <th className="p-2.5">Ideal Geometry</th>
                  <th className="p-2.5">Bond Angle</th>
                  <th className="p-2.5">Typical Bond Types</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold text-cyan-400">sp³</td>
                  <td className="p-2.5">4</td>
                  <td className="p-2.5">0</td>
                  <td className="p-2.5">Tetrahedral</td>
                  <td className="p-2.5">109.5°</td>
                  <td className="p-2.5">Single bonds only (Alkane)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-400">sp²</td>
                  <td className="p-2.5">3</td>
                  <td className="p-2.5">1</td>
                  <td className="p-2.5">Trigonal Planar</td>
                  <td className="p-2.5">120°</td>
                  <td className="p-2.5">1 Double bond (Alkene)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-violet-400">sp</td>
                  <td className="p-2.5">2</td>
                  <td className="p-2.5">2</td>
                  <td className="p-2.5">Linear</td>
                  <td className="p-2.5">180°</td>
                  <td className="p-2.5">1 Triple / 2 Double bonds (Alkyne/Allene)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProTip>
            <strong>Electronegativity vs s-Character:</strong><br />
            As the s-character of the hybrid orbital increases, the electrons are held closer to the nucleus. Therefore, electronegativity follows the trend:
            <div className="my-1.5 p-2 bg-black/35 rounded-xl font-mono text-center text-xs text-cyan-300">
              {"sp (50% s-character) > sp² (33.3% s-character) > sp³ (25% s-character)"}
            </div>
            This makes sp-hybridised carbons highly electron-withdrawing compared to sp³ carbons.
          </ProTip>
        </div>
      </div>

      {/* ── SECTION 4: SIGMA & PI BONDS ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            4. Sigma (σ) and Pi (π) Covalent Bonds
          </h2>
          <SectionBanner label="Bonds" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">Sigma (σ) Bond</span>
              <p className="text-xs text-white/70">
                - Formed by <strong>head-on / end-to-end overlap</strong> of atomic/hybrid orbitals along the internuclear axis.
                <br />- Allows free rotation of bonded atoms.
                <br />- Electron density is concentrated along the line joining the nuclei.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-violet-400 block uppercase">Pi (π) Bond</span>
              <p className="text-xs text-white/70">
                - Formed by <strong>lateral / sideways overlap</strong> of unhybridised parallel p-orbitals perpendicular to the internuclear axis.
                <br />- Restricts free rotation around the bond axis (origin of geometrical isomerism).
                <br />- Electron density lies above and below the plane of the nuclear axis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Bond Lengths & Energies (s-Character Effect)</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/80">
                      <th className="pb-1.5 font-semibold">Bond Type</th>
                      <th className="pb-1.5 font-semibold">Hybrid Orbitals</th>
                      <th className="pb-1.5 font-semibold">Bond Length</th>
                      <th className="pb-1.5 font-semibold">Bond Energy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/70">
                    <tr>
                      <td className="py-1.5">{"C–C (single)"}</td>
                      <td className="py-1.5">{"sp³ – sp³"}</td>
                      <td className="py-1.5 text-cyan-400">1.54 Å</td>
                      <td className="py-1.5 text-emerald-400">348 kJ/mol</td>
                    </tr>
                    <tr>
                      <td className="py-1.5">{"C=C (double)"}</td>
                      <td className="py-1.5">{"sp² – sp²"}</td>
                      <td className="py-1.5 text-cyan-400">1.34 Å</td>
                      <td className="py-1.5 text-emerald-400">614 kJ/mol</td>
                    </tr>
                    <tr>
                      <td className="py-1.5">{"C≡C (triple)"}</td>
                      <td className="py-1.5">{"sp – sp"}</td>
                      <td className="py-1.5 text-cyan-400">1.20 Å</td>
                      <td className="py-1.5 text-emerald-400">835 kJ/mol</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-white/50 leading-normal">
                {"Note: As s-character increases (sp³ = 25% → sp² = 33.3% → sp = 50%), the hybrid orbital size decreases, bringing the bonding electrons closer to the nucleus. This results in shorter and stronger covalent bonds."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Lewis Dot Structures (Electron-Dot Formulas)</span>
              <p className="text-xs text-white/70 leading-relaxed">
                {"In Lewis representations, valence electrons are represented as dots. A shared pair of electrons denotes a single covalent bond. Double and triple bonds consist of two and three shared pairs respectively."}
              </p>
              <div className="bg-black/35 rounded-xl p-3 font-mono text-[11px] text-cyan-300 leading-normal space-y-1">
                <div>{"Methane (CH₄): Four C:H pairs around carbon (8 shared valence electrons)."}</div>
                <div>{"Ethene (C₂H₄): Four dots (double bond) between C::C, and C:H pairs."}</div>
                <div>{"Ethyne (C₂H₂): Six dots (triple bond) between C:::C, and C:H pairs."}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: REPRESENTATIONS OF ORGANIC MOLECULES ────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            5. Representation of Organic Compounds
          </h2>
          <SectionBanner label="Representation" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Organic molecules are drawn using four conventions:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li><strong>Complete Structural Formula:</strong> Shows all covalent bonds as lines.</li>
            <li><strong>Condensed Structural Formula:</strong> Groups hydrogen atoms onto their carbon nodes (e.g. {"CH₃CH₂OH"}).</li>
            <li><strong>Bond-Line Representation:</strong> Represents carbon-carbon bonds as lines in a zig-zag pattern. Carbons are situated at intersections and line ends; hydrogen atoms attached to carbons are omitted and must be mentally supplied using carbon's tetravalency.</li>
            <li><strong>Three-Dimensional / Wedge-Dash Projection:</strong> Solid wedges show bonds pointing towards the viewer, dashed wedges represent bonds pointing away, and normal lines denote bonds in the plane of the screen.</li>
          </ul>
        </div>
      </div>

      {/* ── SECTION 6: CLASSIFICATION OF ORGANIC COMPOUNDS ─────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            6. Classification of Organic Compounds
          </h2>
          <SectionBanner label="Classification" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Organic molecules are classified systematically based on their ring architectures:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Acyclic / Open-Chain Compounds</span>
              <p className="text-xs text-white/70">
                Molecules containing straight or branched carbon chains.
                <br /><span className="text-cyan-300 font-mono text-[11px]">*Examples:* Butane, Isobutane.</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Cyclic / Closed-Chain Compounds</span>
              <p className="text-xs text-white/70">
                Divided into:
                <br />- <strong>Homocyclic / Carbocyclic:</strong> Rings containing only carbon atoms.
                <br />  • *Alicyclic:* Aliphatic-like (Cyclopropane, Cyclohexane).
                <br />  • *Aromatic:* Benzene-like planar delocalized rings (Benzene, Naphthalene).
                <br />- <strong>Heterocyclic:</strong> Rings containing carbon and at least one heteroatom (O, N, S).
                <br />  • *Alicyclic Heterocyclic:* Tetrahydrofuran (THF), Piperidine.
                <br />  • *Aromatic Heterocyclic:* Pyridine, Furan, Thiophene.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 7: AROMATIC, ANTIAROMATIC & NON-AROMATIC ───────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-rose-400" />
            7. Aromatic, Antiaromatic & Non-Aromatic Compounds
          </h2>
          <SectionBanner label="Aromaticity" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            To evaluate aromatic behavior on advanced exams, use the following strict categorization:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block uppercase">1. Aromatic</span>
              <p className="text-xs text-white/70">
                - <strong>Cyclic</strong> and <strong>Planar</strong> ring geometry.
                <br />- <strong>Fully conjugated</strong> (continuous p-orbitals at every ring atom).
                <br />- <strong>Huckel's Rule:</strong> Contains <strong>(4n + 2) π</strong> electrons (<InlineMath math="n=0,1,2..." />).
                <br /><span className="text-emerald-400/80 font-semibold">*Examples:* Benzene (6π), Pyridine (6π), Furan (6π), Cyclopentadienyl anion (6π).</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-rose-400 block uppercase">2. Antiaromatic</span>
              <p className="text-xs text-white/70">
                - <strong>Cyclic</strong> and <strong>Planar</strong> ring geometry.
                <br />- <strong>Fully conjugated</strong> (continuous p-orbitals at every ring atom).
                <br />- Contains <strong>4n π</strong> electrons (<InlineMath math="n=1,2,3..." />).
                <br />- Extremely unstable due to unfavorable electron distribution.
                <br /><span className="text-rose-400/80 font-semibold">*Examples:* Cyclobutadiene (4π), Cyclopentadienyl cation (4π).</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">3. Non-Aromatic</span>
              <p className="text-xs text-white/70">
                - Fails any of the primary conditions (non-cyclic, non-planar, or incomplete ring conjugation due to an <InlineMath math="sp^3" /> ring atom).
                <br />- Stability is comparable to typical open-chain analogues.
                <br /><span className="text-cyan-300 font-semibold">*Examples:* Cycloheptatriene (contains an <InlineMath math="sp^3" /> carbon), Cyclooctatetraene (tub-shaped, non-planar).</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 8: IUPAC NOMENCLATURE RULES ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            8. IUPAC Nomenclature Principles
          </h2>
          <SectionBanner label="Nomenclature" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Nomenclature follows the core IUPAC rule hierarchy:
          </p>
          <ul className="list-decimal pl-5 space-y-2 text-white/70">
            <li><strong>Principal Chain Selection:</strong> Select the parent chain or ring to contain the principal characteristic functional group, followed by the maximum number of multiple bonds, and then the maximum number of carbon atoms.</li>
            <li><strong>Numbering the Parent Chain:</strong> Number the chain to give the principal functional group the lowest possible locant. If equivalent choices remain, apply the <strong>first-point-of-difference</strong> rule to multiple bonds and substituents.</li>
            <li><strong>Substituent Alphabetical Order:</strong> Substituents are listed alphabetically (ignoring numerical prefixes like *di-*, *tri-*, unless they are part of a complex name like *isobutyl*).</li>
          </ul>

          <WarningCard title="The Alphabetical vs First-Point-of-Difference Trap">
            {"Do not use alphabetical order to decide numbering direction unless there is a complete tie from both directions."}
            <p className="text-white/60 text-xs mt-1 font-mono">
              *Example:* CH₃-CH(CH₃)-CH₂-CH(Cl)-CH₃ must be numbered from left to right as 2,4-locants, not right to left based on 'Chloro' alphabetical priority.
            </p>
          </WarningCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Aromatic Compounds Nomenclature</span>
              <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/70">
                <li><strong>Monosubstituted Benzenes:</strong> Prefix the substituent to *benzene* (e.g., *Nitrobenzene*, *Bromobenzene*).</li>
                <li><strong>Disubstituted Benzenes:</strong> Classic prefixes *ortho-* (o-, 1,2-), *meta-* (m-, 1,3-), and *para-* (p-, 1,4-) denote relative substituent positions on the ring.</li>
                <li><strong>Polysubstituted Benzenes:</strong> Number the ring to satisfy the lowest locant rule. If there is a tie, number alphabetically.</li>
                <li><strong>Special Parent Names:</strong> If a substituent gives benzene a special parent name (e.g. *Phenol*, *Toluene*, *Aniline*, *Benzoic acid*), that substituent carbon is always designated as C1.</li>
              </ul>
              <p className="text-[10px] text-white/40 leading-normal font-mono">
                *Example:* 2-Chloro-4-methylphenol (Phenol is parent, C1 has -OH, C2 has -Cl, C4 has -CH₃).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">High-Yield Trivial / Common Names</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/80">
                      <th className="pb-1 font-semibold">Common Name</th>
                      <th className="pb-1 font-semibold">IUPAC Name</th>
                      <th className="pb-1 font-semibold">Formula</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/70">
                    <tr>
                      <td className="py-1 text-cyan-300">Toluene</td>
                      <td className="py-1">Methylbenzene</td>
                      <td className="py-1">C₆H₅CH₃</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-cyan-300">Phenol</td>
                      <td className="py-1">Benzenol</td>
                      <td className="py-1">C₆H₅OH</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-cyan-300">Aniline</td>
                      <td className="py-1">Benzenamine</td>
                      <td className="py-1">C₆H₅NH₂</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-cyan-300">Acetone</td>
                      <td className="py-1">Propanone</td>
                      <td className="py-1">CH₃COCH₃</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-cyan-300">Chloroform</td>
                      <td className="py-1">Trichloromethane</td>
                      <td className="py-1">CHCl₃</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 9: FUNCTIONAL GROUP PRIORITY ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            9. Functional-Group Priority Suffix Order
          </h2>
          <SectionBanner label="Priority" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            When multiple functional groups are present, the principal group gets the principal suffix. All other groups are treated as prefixes. The priority list is non-negotiable:
          </p>

          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs font-mono text-cyan-300 leading-relaxed">
            Carboxylic acid &gt; Sulfonic acid &gt; Ester &gt; Acid halide &gt; Amide &gt; Nitrile &gt; Aldehyde &gt; Ketone &gt; Alcohol &gt; Amine &gt; Alkene &gt; Alkyne
          </div>

          <p className="text-white/60">
            *Example:* An organic compound containing a ketone and an alcohol is named as an <strong>alkanone</strong> (ketone suffix <em>-one</em>) with a <strong>hydroxy</strong> prefix for the alcohol group.
          </p>
        </div>
      </div>

      {/* ── SECTION 10: STRUCTURAL ISOMERISM ──────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            10. Structural Isomerism
          </h2>
          <SectionBanner label="Structural" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Structural isomers have the same molecular formula but different connectivities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">1. Chain & Position</span>
              <p className="text-xs text-white/70">
                - <strong>Chain:</strong> Different carbon skeletons (e.g. n-Pentane vs. Neopentane).
                <br />- <strong>Position:</strong> Different positions of functional groups/substituents on the same skeleton (e.g. Propan-1-ol vs. Propan-2-ol).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block uppercase">2. Functional & Ring-Chain</span>
              <p className="text-xs text-white/70">
                - <strong>Functional:</strong> Different functional groups (e.g. Ethanol and Dimethyl ether).
                <br />- <strong>Ring-Chain:</strong> Open-chain vs. ring structures (e.g. Propene vs. Cyclopropane).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-violet-400 block uppercase">3. Metamerism</span>
              <p className="text-xs text-white/70">
                - Unequal distribution of alkyl carbon chains on either side of a polyvalent heteroatom functional group (e.g. Diethyl ether vs. Methyl propyl ether).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 11: TAUTOMERISM ───────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-rose-400" />
            11. Tautomerism: Dynamic Prototropic Shifts
          </h2>
          <SectionBanner label="Tautomerism" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong>Tautomerism</strong> is a dynamic equilibrium between two readily interconvertible constitutional isomers called tautomers. The most common type is <strong>keto-enol tautomerism</strong> where a proton shifts alongside shifts in pi-bond placement:
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs font-mono text-cyan-300">
            {"CH₃-C(=O)-CH₃ (Keto Form, 99.9%) ⇌ CH₃-C(OH)=CH₂ (Enol Form, 0.1%)"}
          </div>

          <WarningCard title="Tautomerism vs. Resonance Difference">
            {"Resonance structures are hypothetical contributing valence structures that differ only in electron distribution. Tautomers are real chemical species in physical equilibrium that differ in atomic positions (usually hydrogen atoms)."}
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 12: GEOMETRICAL ISOMERISM ─────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-violet-400" />
            12. Geometrical Isomerism: Spatial Rigidity
          </h2>
          <SectionBanner label="Geometrical" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Arises due to <strong>restricted rotation</strong> around carbon-carbon double bonds or ring structures.
          </p>

          <WarningCard title="The Alkene Subsitution Condition Trap">
            {"For a carbon double bond structure abC = Ccd, geometrical isomerism is possible ONLY if each double-bonded carbon is attached to two different substituents (a ≠ b and c ≠ d)."}
            <p className="text-white/60 text-xs mt-1">
              *Example:* Propene (CH₃-CH=CH₂) cannot show geometrical isomerism because one carbon has two identical hydrogen substituents.
            </p>
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 13: E/Z NOMENCLATURE ──────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            13. E/Z Stereodescriptors (CIP Rules)
          </h2>
          <SectionBanner label="E/Z System" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            When an alkene has four different substituents, the cis/trans system fails. We use the <strong>Cahn-Ingold-Prelog (CIP) priority rules</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-white/70">
            <li>Assign priorities to groups on each carbon based on atomic number (higher atomic number = higher priority).</li>
            <li>If there is a tie, compare atoms along the chain at the first point of difference.</li>
            <li><strong>Z (Zusammen):</strong> High-priority groups are on the same side.</li>
            <li><strong>E (Entgegen):</strong> High-priority groups are on opposite sides.</li>
          </ul>
        </div>
      </div>

      {/* ── SECTION 14: OPTICAL ISOMERISM ─────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-emerald-400" />
            14. Optical Isomerism: Chirality & Symmetry
          </h2>
          <SectionBanner label="Optical" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Optical isomerism arises from molecular <strong>chirality</strong>—the property of being non-superimposable on a mirror image.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Chiral Centers & Enantiomers</span>
              <p className="text-xs text-white/70">
                - <strong>Chiral Center:</strong> A carbon atom bonded to four different groups (stereocenter).
                <br />- <strong>Enantiomers:</strong> Non-superimposable mirror images that rotate plane-polarized light in opposite directions (dextrorotatory vs. laevorotatory).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Meso Compounds & Racemic Mixtures</span>
              <p className="text-xs text-white/70">
                - <strong>Meso Compound:</strong> Contains chiral centers but is achiral overall due to an internal plane of symmetry (optically inactive due to internal compensation).
                <br />- <strong>Racemic Mixture:</strong> Equimolar mixture of enantiomers (optically inactive due to external compensation).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 14B: CONFORMATIONAL ISOMERISM ─────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-violet-400" />
            14B. Conformational Isomerism & Newman Projections
          </h2>
          <SectionBanner label="Conformations" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Conformational isomers (conformers) are different spatial arrangements of atoms that can be interconverted by <strong>free rotation around single (σ) C-C bonds</strong>. While rotation is theoretically free, energy barriers exist due to electron repulsions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Ethane Conformers & Strains</span>
              <p className="text-xs text-white/70 leading-relaxed">
                - <strong>Torsional Strain:</strong> Electron-electron repulsion between eclipsing C-H bonding pairs.
                <br />- <strong>Staggered Conformation:</strong> Hydrogen atoms are maximum distance apart (dihedral angle = 60°). Most stable (minimum torsional strain).
                <br />- <strong>Eclipsed Conformation:</strong> Hydrogen atoms align directly behind one another (dihedral angle = 0°). Least stable (maximum torsional strain, energy barrier = 12 kJ/mol).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Butane Conformers (C2–C3 Rotation)</span>
              <p className="text-xs text-white/70 leading-relaxed">
                - <strong>Anti Conformation (180°):</strong> Methyl groups pointing opposite. Most stable (torsional & steric strain minimized).
                <br />- <strong>Gauche Conformation (60°):</strong> Methyl groups adjacent. Less stable than Anti due to methyl-methyl steric strain.
                <br />- <strong>Eclipsed (120°):</strong> CH₃ eclipses H. Higher energy.
                <br />- <strong>Fully Eclipsed (0°):</strong> CH₃ directly eclipses CH₃. Highest energy state (maximum steric and torsional strain).
              </p>
              <div className="p-2 bg-black/35 rounded-xl text-center text-xs font-mono text-cyan-300">
                {"Stability Order: Anti > Gauche > Eclipsed > Fully Eclipsed"}
              </div>
            </div>
          </div>

          <div className="bg-black/35 border border-white/5 rounded-2xl p-4 space-y-3">
            <span className="text-xs font-bold text-white block uppercase tracking-wider text-center">
              Newman Projections of Ethane (Visualised looking down C-C)
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
              {/* Staggered SVG */}
              <div className="flex flex-col items-center space-y-2">
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="22" stroke="white" strokeWidth="2.5" fill="none" />
                  {/* Front Carbon bonds (meet at center) */}
                  <line x1="50" y1="50" x2="50" y2="20" stroke="#06b6d4" strokeWidth="2.5" />
                  <line x1="50" y1="50" x2="24" y2="65" stroke="#06b6d4" strokeWidth="2.5" />
                  <line x1="50" y1="50" x2="76" y2="65" stroke="#06b6d4" strokeWidth="2.5" />
                  {/* Labels for front C */}
                  <text x="50" y="16" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="20" y="68" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="80" y="68" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  {/* Back Carbon bonds (start from circle boundary) */}
                  <line x1="50" y1="72" x2="50" y2="80" stroke="#a78bfa" strokeWidth="2.5" />
                  <line x1="31" y1="39" x2="24" y2="35" stroke="#a78bfa" strokeWidth="2.5" />
                  <line x1="69" y1="39" x2="76" y2="35" stroke="#a78bfa" strokeWidth="2.5" />
                  {/* Labels for back C */}
                  <text x="50" y="87" fill="#a78bfa" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="20" y="32" fill="#a78bfa" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="80" y="32" fill="#a78bfa" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                </svg>
                <span className="text-xs font-bold text-cyan-400 font-mono">Staggered (Min Energy)</span>
              </div>

              {/* Eclipsed SVG */}
              <div className="flex flex-col items-center space-y-2">
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="22" stroke="white" strokeWidth="2.5" fill="none" />
                  {/* Back Carbon bonds (drawn slightly offset to show eclipsing) */}
                  <line x1="53" y1="72" x2="53" y2="80" stroke="#a78bfa" strokeWidth="2.5" />
                  <line x1="33" y1="41" x2="27" y2="37" stroke="#a78bfa" strokeWidth="2.5" />
                  <line x1="67" y1="37" x2="73" y2="33" stroke="#a78bfa" strokeWidth="2.5" />
                  {/* Labels back C */}
                  <text x="53" y="87" fill="#a78bfa" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="24" y="33" fill="#a78bfa" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="77" y="29" fill="#a78bfa" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>

                  {/* Front Carbon bonds (meet at center) */}
                  <line x1="50" y1="50" x2="50" y2="20" stroke="#06b6d4" strokeWidth="2.5" />
                  <line x1="50" y1="50" x2="24" y2="65" stroke="#06b6d4" strokeWidth="2.5" />
                  <line x1="50" y1="50" x2="76" y2="65" stroke="#06b6d4" strokeWidth="2.5" />
                  {/* Labels front C */}
                  <text x="50" y="16" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="20" y="68" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                  <text x="80" y="68" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">H</text>
                </svg>
                <span className="text-xs font-bold text-rose-400 font-mono">Eclipsed (Max Energy)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 14C: R/S CONFIGURATION & FISCHER PROJECTIONS ─────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            14C. R/S Nomenclature & Fischer Projections
          </h2>
          <SectionBanner label="Stereocenter Configuration" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Assigning stereocenter configurations requires applying the <strong>Cahn-Ingold-Prelog (CIP) Priority Rules</strong>:
          </p>

          <ul className="list-decimal pl-5 space-y-2 text-white/70">
            <li><strong>Atomic Number Priority:</strong> Rank the four groups directly attached to the chiral center by atomic number (e.g. {"-I (53) > -Br (35) > -Cl (17) > -F (9) > -OH (8) > -NH₂ (7) > -CH₃ (6) > -H (1)"}).</li>
            <li><strong>Tie-Breaker Rule:</strong> If the directly attached atoms are identical, compare the atoms attached to them along the substituent chain in decreasing atomic number order until the first point of difference is found.</li>
            <li><strong>Multiple Bonds:</strong> Treat double and triple bonds as duplicate/triplicate single bonds (e.g. a carbonyl group {"-CH=O"} is treated as carbon bonded to two oxygens).</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Assigning R (Rectus) vs S (Sinister)</span>
              <p className="text-xs text-white/70 leading-relaxed">
                1. Identify the priority ranking of the four substituents (1 = highest, 4 = lowest).
                <br />2. Orient the molecule such that group 4 (lowest priority, typically -H) points directly <strong>away</strong> from the viewer.
                <br />3. Trace the path from priority <strong>1 → 2 → 3</strong>:
                <br />- <strong>Clockwise rotation:</strong> Designated as <strong>R (Rectus)</strong> configuration.
                <br />- <strong>Counter-clockwise rotation:</strong> Designated as <strong>S (Sinister)</strong> configuration.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Fischer Projection Rules</span>
              <p className="text-xs text-white/70 leading-relaxed">
                - In a Fischer projection, <strong>horizontal lines</strong> represent bonds pointing towards you, and <strong>vertical lines</strong> represent bonds pointing away.
                <br />- If the lowest priority group (4) is on a <strong>vertical line</strong>, the R/S configuration is taken as traced (1 → 2 → 3).
                <br />- If group 4 is on a <strong>horizontal line</strong>, the configuration is <strong>reversed</strong> (e.g. if the trace is clockwise, it is actually S; if counter-clockwise, it is R).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Specific Rotation Formula</span>
              <p className="text-xs text-white/70">
                The optical activity of a pure chiral compound is quantified by its specific rotation:
              </p>
              <div className="my-1 text-center text-xs text-emerald-300">
                <DisplayMath math="[\alpha]^T_\lambda = \frac{\alpha}{l \times c}" />
              </div>
              <p className="text-[11px] text-white/50 leading-normal">
                Where <InlineMath math="\alpha" /> is the observed optical rotation in degrees, <InlineMath math="l" /> is the path length in decimeters (1 dm = 10 cm), and <InlineMath math="c" /> is the concentration in g/mL (or density for pure liquids).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Optical Purity & Enantiomeric Excess</span>
              <p className="text-xs text-white/70 leading-relaxed">
                Enantiomeric excess (ee) measures the optical purity of a non-racemic mixture containing both enantiomers:
              </p>
              <div className="my-1 text-center text-xs text-amber-300">
                <DisplayMath math="\% \text{ ee} = \frac{|\text{Observed Rotation}|}{\text{Specific Rotation of Pure Enantiomer}} \times 100" />
              </div>
              <p className="text-[11px] text-white/50 leading-normal">
                Alternatively, you can compute it directly from mole fractions: <InlineMath math="\% \text{ ee} = \% \text{ major enantiomer} - \% \text{ minor enantiomer}" />.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 15: BOND FISSION ──────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Scissors className="w-5 h-5 text-cyan-400" />
            15. Covalent Bond Fission: Homolytic vs. Heterolytic
          </h2>
          <SectionBanner label="Bond Fission" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Homolytic Fission</span>
              <p className="text-xs text-white/70">
                The bonding electron pair splits equally between atoms:
                <br /><span className="font-mono text-cyan-300">A—B ➔ A• + B•</span>
                <br />Produces highly reactive neutral <strong>Free Radicals</strong>.
                <br />*Favoured by:* UV light, heat, peroxides, and non-polar gas-phase conditions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Heterolytic Fission</span>
              <p className="text-xs text-white/70">
                The bonding electron pair transfers entirely to one partner:
                <br /><span className="font-mono text-violet-300">A—B ➔ A⁺ + B⁻</span>
                <br />Produces charged ions: <strong>Carbocations</strong> (carbon cation) or <strong>Carbanions</strong> (carbon anion).
                <br />*Favoured by:* Polar covalent bonds and polar solvents.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 15B: REACTION COORDINATES & ENERGY PROFILES ────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            15B. Reaction Coordinate Diagrams & Energy Profiles
          </h2>
          <SectionBanner label="Energy Profiles" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            An energy profile plots the potential energy changes that occur as reactants transform into products along the reaction coordinate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Transition State vs. Intermediate</span>
              <ul className="list-disc pl-4 space-y-1 text-xs text-white/70">
                <li><strong>Transition State (TS):</strong> An unstable activated complex where old bonds are breaking and new bonds are forming simultaneously. Represents the <strong>highest energy point (peaks)</strong> on the diagram and cannot be isolated.</li>
                <li><strong>Reaction Intermediate:</strong> A species formed during a multi-step reaction that has a finite lifetime. Corresponds to <strong>local energy minimums (valleys)</strong> between TS peaks and can sometimes be isolated.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Kinetic vs. Thermodynamic Control</span>
              <ul className="list-disc pl-4 space-y-1 text-xs text-white/70">
                <li><strong>Kinetic Product:</strong> Formed fastest because it has the <strong>lowest activation energy (Ea)</strong>. Dominates at low temperatures (irreversible conditions).</li>
                <li><strong>Thermodynamic Product:</strong> The most stable product with the <strong>lowest overall potential energy</strong>. Dominates at high temperatures where reactions are reversible and reach equilibrium.</li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 bg-black/35 rounded-xl text-xs space-y-1.5 text-white/70 leading-relaxed border border-white/5">
            <span className="text-white font-bold block">Key Diagram Terms:</span>
            <div>- <strong>Activation Energy (Ea):</strong> Energy difference between reactants and the highest transition state peak.</div>
            <div>- <strong>Enthalpy of Reaction (ΔH):</strong> Energy difference between products and reactants (<InlineMath math="\Delta H = H_{\text{products}} - H_{\text{reactants}}" />). If products are lower in energy than reactants, the reaction is exothermic (<InlineMath math="\Delta H < 0" />)</div>
          </div>
        </div>
      </div>

      {/* ── SECTION 16: ELECTROPHILES & NUCLEOPHILES ──────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-rose-400" />
            16. Reagents: Electrophiles & Nucleophiles
          </h2>
          <SectionBanner label="Reagents" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Electrophilic Reagents (Lewis Acids)</span>
              <p className="text-xs text-white/70">
                Electron-seeking species that accept electron pairs.
                <br />- <strong>Charged:</strong> {"H⁺, Cl⁺, NO₂⁺, R⁺ (carbocations)."}
                <br />- <strong>Neutral (Incomplete Octets):</strong> {"BF₃, AlCl₃, SO₃."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Nucleophilic Reagents (Lewis Bases)</span>
              <p className="text-xs text-white/70">
                Electron-rich species that donate electron pairs.
                <br />- <strong>Charged:</strong> {"OH⁻, CN⁻, halide ions, carbanions."}
                <br />- <strong>Neutral (Lone Pair Bearers):</strong> {"H₂O, NH₃, R-OH."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 17: REACTION INTERMEDIATES ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            17. Reaction Intermediates
          </h2>
          <SectionBanner label="Intermediates" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Reaction intermediates are temporary species formed during multi-step organic reaction pathways. Let's look at their geometric configurations:
          </p>

          <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-2">Intermediate Orbital Geometries</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-cyan-400 mb-2">Carbocation (sp²)</span>
              <svg className="w-full h-36" viewBox="0 0 200 120">
                {/* 3D-like planar representation */}
                <ellipse cx="100" cy="70" rx="40" ry="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="100" y1="20" x2="100" y2="100" stroke="rgba(255,255,255,0.3)" strokeDasharray="3,3" />
                {/* Lobes of p orbital */}
                <path d="M100,70 C115,40 100,20 100,20 C100,20 85,40 100,70 Z" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1" />
                <path d="M100,70 C115,100 100,120 100,120 C100,120 85,100 100,70 Z" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1" />
                {/* Planar C bonds */}
                <line x1="100" y1="70" x2="60" y2="70" stroke="white" strokeWidth="2" />
                <line x1="100" y1="70" x2="125" y2="80" stroke="white" strokeWidth="2" />
                <line x1="100" y1="70" x2="120" y2="60" stroke="white" strokeWidth="2" />
                <circle cx="100" cy="70" r="4" fill="#22d3ee" />
                <text x="106" y="74" fill="white" fontSize="9" fontWeight="bold">C⁺</text>
                <text x="50" y="35" fill="rgba(255,255,255,0.5)" fontSize="8">Planar, empty p</text>
              </svg>
            </div>

            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-rose-400 mb-2">Carbanion (sp³)</span>
              <svg className="w-full h-36" viewBox="0 0 200 120">
                {/* Pyramidal representation */}
                <line x1="100" y1="50" x2="60" y2="85" stroke="white" strokeWidth="2" />
                <line x1="100" y1="50" x2="140" y2="85" stroke="white" strokeWidth="2" />
                <line x1="100" y1="50" x2="110" y2="95" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
                {/* Lone pair lobe */}
                <path d="M100,50 C115,20 100,10 100,10 C100,10 85,20 100,50 Z" fill="rgba(244,63,94,0.3)" stroke="#f43f5e" strokeWidth="1" />
                <circle cx="98" cy="25" r="1.5" fill="white" />
                <circle cx="102" cy="25" r="1.5" fill="white" />
                <circle cx="100" cy="50" r="4" fill="#f43f5e" />
                <text x="107" y="52" fill="white" fontSize="9" fontWeight="bold">C⁻</text>
                <text x="40" y="30" fill="rgba(255,255,255,0.5)" fontSize="8">Pyramidal, Lone Pair</text>
              </svg>
            </div>

            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-violet-400 mb-2">Free Radical (sp²)</span>
              <svg className="w-full h-36" viewBox="0 0 200 120">
                <ellipse cx="100" cy="70" rx="40" ry="15" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="100" y1="20" x2="100" y2="100" stroke="rgba(255,255,255,0.3)" strokeDasharray="3,3" />
                {/* Lobes of p orbital */}
                <path d="M100,70 C115,40 100,20 100,20 C100,20 85,40 100,70 Z" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="1" />
                <path d="M100,70 C115,100 100,120 100,120 C100,120 85,100 100,70 Z" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="1" />
                <circle cx="100" cy="35" r="1.5" fill="white" /> {/* Unpaired electron */}
                {/* Planar C bonds */}
                <line x1="100" y1="70" x2="60" y2="70" stroke="white" strokeWidth="2" />
                <line x1="100" y1="70" x2="125" y2="80" stroke="white" strokeWidth="2" />
                <line x1="100" y1="70" x2="120" y2="60" stroke="white" strokeWidth="2" />
                <circle cx="100" cy="70" r="4" fill="#a78bfa" />
                <text x="106" y="74" fill="white" fontSize="9" fontWeight="bold">C•</text>
                <text x="45" y="30" fill="rgba(255,255,255,0.5)" fontSize="8">Planar, Single electron</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 18-20: DETAILS OF INTERMEDIATES ───────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            18-20. Carbocations, Carbanions & Radicals Stability
          </h2>
          <SectionBanner label="Intermediate Stability" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase">1. Carbocations</span>
              <p className="text-xs text-white/70">
                - Carbon carries positive charge with 6 valence electrons (sp² planar).
                <br />- <strong>Stability Trend:</strong>
                <br /><span className="font-mono text-cyan-300">3° &gt; 2° &gt; 1° &gt; CH₃⁺</span>
                <br />- Stabilized by <strong>+I effects</strong> and <strong>hyperconjugation</strong> (alpha hydrogens).
                <br />- Resonance stabilized forms (allyl/benzyl) override alkyl-only order.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-rose-400 block uppercase">2. Carbanions</span>
              <p className="text-xs text-white/70">
                - Carbon carries negative charge with 8 valence electrons (sp³ pyramidal).
                <br />- <strong>Stability Trend:</strong>
                <br /><span className="font-mono text-rose-300">CH₃⁻ &gt; 1° &gt; 2° &gt; 3°</span>
                <br />- Destabilized by electron-donating <strong>+I effects</strong> of alkyl groups.
                <br />- Strongly stabilized by electron-withdrawing groups (-I, -R).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase">3. Free Radicals</span>
              <p className="text-xs text-white/70">
                - Neutral carbon carries a single unpaired electron (sp² planar).
                <br />- <strong>Stability Trend:</strong>
                <br /><span className="font-mono text-violet-300">3° &gt; 2° &gt; 1° &gt; CH₃•</span>
                <br />- Stabilized by hyperconjugation and alkyl dispersion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 21: INDUCTIVE EFFECT ──────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            21. Inductive Effect (I-Effect)
          </h2>
          <SectionBanner label="Inductive" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Permanent polarization of sigma-bond electrons due to electronegativity differences along a carbon chain. It decreases rapidly with distance and becomes negligible after 3 carbon bonds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase">Negative Inductive Effect (-I)</span>
              <p className="text-xs text-white/70">
                Electron-withdrawing relative to hydrogen.
                <br /><span className="font-mono text-cyan-300">-NO₂ &gt; -CN &gt; -COOH &gt; -F &gt; -Cl &gt; -Br &gt; -I</span>
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase">Positive Inductive Effect (+I)</span>
              <p className="text-xs text-white/70">
                Electron-donating relative to hydrogen.
                <br /><span className="font-mono text-emerald-300">3° alkyl &gt; 2° alkyl &gt; 1° alkyl &gt; -CH₃</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 22: RESONANCE / MESOMERIC EFFECT ──────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-rose-400" />
            22. Resonance & Mesomeric Effect (R/M Effect)
          </h2>
          <SectionBanner label="Resonance" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Permanent delocalization of pi electrons or lone pair electrons through overlapping p-orbitals in a conjugated system (alternating single and multiple bonds).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-rose-400 block uppercase">Positive Resonance Effect (+R)</span>
              <p className="text-xs text-white/70">
                Groups that donate lone pairs into the conjugated system.
                <br /><span className="font-mono text-rose-300">-OH, -OR, -NH₂, -NHR, -NR₂, -F, -Cl</span>
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase">Negative Resonance Effect (-R)</span>
              <p className="text-xs text-white/70">
                Groups that withdraw pi electrons from the conjugated system.
                <br /><span className="font-mono text-violet-300">-NO₂, -CN, -CHO, -COR, -COOH</span>
              </p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Rules for Resonance Contributors:</h3>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li>Only pi/lone-pair electrons move; nuclear coordinates remain unchanged.</li>
            <li>Contributors with complete octets are much more stable.</li>
            <li>Structures with minimal charge separation are more stable.</li>
            <li>Equivalent resonance structures yield exceptionally high resonance stabilization (e.g. carboxylate ion).</li>
          </ul>
        </div>
      </div>

      {/* ── SECTION 23: HYPERCONJUGATION ──────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            23. Hyperconjugation: No-Bond Resonance
          </h2>
          <SectionBanner label="Hyperconjugation" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Delocalization of electrons from an adjacent <strong><InlineMath math="\sigma" />(C-H)</strong> bond into an adjacent empty/partially filled p-orbital or neighbouring pi-system.
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs font-mono text-cyan-300">
            {"Stability of intermediate / alkene ∝ Number of α-hydrogens"}
          </div>

          <WarningCard title="Alkene Stability Comparison">
            {"But-2-ene is more substituted and has 6 α-hydrogens (CH₃-CH=CH-CH₃), making it thermodynamically more stable than But-1-ene (CH₂=CH-CH₂-CH₃) which has only 2 α-hydrogens."}
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 24: ELECTROMERIC EFFECT ────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-violet-400" />
            24. Electromeric Effect (E-Effect)
          </h2>
          <SectionBanner label="Electromeric" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            A <strong>temporary</strong> complete transfer of pi electrons of a multiple bond to one of the bonded atoms under the influence of an attacking reagent.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-cyan-400 block uppercase">+E Effect</span>
              <p className="text-xs text-white/70">
                Pi electrons transfer to the atom to which the attacking reagent bonds.
                <br />*Example:* Addition of <InlineMath math="H^+" /> to alkenes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-rose-400 block uppercase">-E Effect</span>
              <p className="text-xs text-white/70">
                Pi electrons transfer to the atom other than the one to which the reagent bonds.
                <br />*Example:* Addition of <InlineMath math="CN^-" /> to carbonyl groups.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 25: ACIDITY & BASICITY ────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            25. Acidity & Basicity Principles
          </h2>
          <SectionBanner label="Acidity & Basicity" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Factors Governing Acidity</span>
              <p className="text-xs text-white/70">
                - Acid strength increases as the resulting conjugate base becomes more stable (dispersing negative charge).
                <br />- <strong>Resonance Stabilization:</strong> {"Carboxylic acids (R-COOH) are stronger acids than alcohols (R-OH) because the carboxylate ion is stabilized by resonance."}
                <br />- <strong>Hybridisation Effect:</strong> sp carbons hold negative charge more tightly:
                <br /><span className="font-mono text-cyan-300">HC≡CH (sp) &gt; CH₂=CH₂ (sp²) &gt; CH₃-CH₃ (sp³)</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Factors Governing Basicity</span>
              <p className="text-xs text-white/70">
                - Basicity increases with lone-pair electron density and availability to protonate.
                <br />- <strong>Aliphatic Amines:</strong> Alkyl groups increase electron density via +I effect:
                <br /><span className="font-mono text-violet-300">Secondary &gt; Primary &gt; Tertiary (in aqueous solution due to solvation/steric factors).</span>
                <br />- <strong>Aromatic Amines (Aniline):</strong> Highly delocalized lone pair makes aniline far less basic than cyclohexylamine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 26: TYPES OF ORGANIC REACTIONS ────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            26. Types of Organic Reactions
          </h2>
          <SectionBanner label="Reaction Types" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Nearly all organic transformations fit into four classifications:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-cyan-400 block uppercase">1. Substitution</span>
              <p className="text-[11px] text-white/60">An atom/group is replaced by another (e.g. Nucleophilic or Electrophilic substitution).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-emerald-400 block uppercase">2. Addition</span>
              <p className="text-[11px] text-white/60">Atoms add across double/triple bonds, reducing bond unsaturation.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-violet-400 block uppercase">3. Elimination</span>
              <p className="text-[11px] text-white/60">Atoms/groups are removed to form a new multiple bond.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-rose-400 block uppercase">4. Rearrangement</span>
              <p className="text-[11px] text-white/60">Bond connectivity shifts to form a structural isomer.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 27: PURIFICATION METHODS ──────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-rose-400" />
            27. Purification Methodologies
          </h2>
          <SectionBanner label="Purification" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-rose-400 block uppercase">1. Solid Purification</span>
              <p className="text-xs text-white/70">
                - <strong>Sublimation:</strong> Direct solid-to-gas transition (e.g. Camphor, Naphthalene).
                <br />- <strong>Crystallisation:</strong> Based on differences in solubilities at different temperatures.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">2. Liquid Distillations</span>
              <p className="text-xs text-white/70">
                - <strong>Simple Distillation:</strong> For liquids with large differences in boiling points (&gt; 25°C).
                <br />- <strong>Fractional Distillation:</strong> For liquids with close boiling points (using fractionating columns).
                <br />- <strong>Reduced-Pressure Distillation:</strong> For liquids decomposing near their normal boiling points.
                <br />- <strong>Steam Distillation:</strong> For steam-volatile, water-immiscible compounds (e.g. Aniline).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block uppercase">3. Differential Extraction</span>
              <p className="text-xs text-white/70">
                - <strong>Concept:</strong> Extracts organic compounds from an aqueous layer using a separating funnel.
                <br />- <strong>Mechanism:</strong> Relies on solute solubility differences between two immiscible solvents (aqueous vs organic solvent).
                <br />- <strong>Partitioning:</strong> Organic solute shifts from water to organic layer (e.g. ether) based on partition coefficient.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 28: CHROMATOGRAPHY ────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            28. Chromatography Principles & Rf Value
          </h2>
          <SectionBanner label="Chromatography" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Separation is based on the <strong>differential distribution</strong> of components between a <strong>stationary phase</strong> and a <strong>mobile phase</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-violet-400 block uppercase">Adsorption Chromatography</span>
              <p className="text-xs text-white/70">Based on differential adsorption affinities (e.g. Column and Thin-Layer Chromatography).</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-cyan-400 block uppercase">Partition Chromatography</span>
              <p className="text-xs text-white/70">Based on continuous differential partitioning between stationary liquid and mobile phase (e.g. Paper Chromatography).</p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Retardation Factor (Rf Value):</h3>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold flex items-center justify-center gap-2">
            <span>R<sub>f</sub> =</span>
            <div className="flex flex-col items-center">
              <span className="px-1 border-b border-white/20 pb-0.5">Distance travelled by the substance from reference line</span>
              <span className="px-1 pt-0.5">Distance travelled by the solvent front</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 29: QUALITATIVE ANALYSIS ──────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            29. Qualitative Analysis: Lassaigne's Test
          </h2>
          <SectionBanner label="Qualitative" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Covalently bonded elements (N, S, Halogens) are converted into water-soluble <strong>ionic sodium salts</strong> by fusion with metallic sodium:
          </p>
          <div className="p-3 bg-black/45 rounded-xl font-mono text-xs leading-relaxed space-y-1 text-center">
            <div>Na + C + N ➔ NaCN (Sodium cyanide)</div>
            <div>2Na + S ➔ Na₂S (Sodium sulfide)</div>
            <div>Na + X ➔ NaX (Sodium halide)</div>
          </div>

          <div className="overflow-x-auto border border-white/5 rounded-xl mt-3">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2.5">Element</th>
                  <th className="p-2.5">Confirmatory Test Reagents</th>
                  <th className="p-2.5">Observation / Compound Formed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold text-cyan-300">Nitrogen (N)</td>
                  <td className="p-2.5">FeSO₄ + FeCl₃ + HCl</td>
                  <td className="p-2.5 text-cyan-400 font-semibold">Prussian Blue color: Fe₄[Fe(CN)₆]₃ (ferric ferrocyanide)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-rose-300">Sulphur (S)</td>
                  <td className="p-2.5">Sodium nitroprusside</td>
                  <td className="p-2.5 text-rose-400 font-semibold">Violet color: [Fe(CN)₅NOS]⁴⁻ complex</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-violet-300">N & S together</td>
                  <td className="p-2.5">Sodium fusion + FeCl₃</td>
                  <td className="p-2.5 text-violet-400 font-semibold">Blood-red coloration: [Fe(SCN)]²⁺ complex</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-amber-300">Halogens (X)</td>
                  <td className="p-2.5">HNO₃ + AgNO₃</td>
                  <td className="p-2.5">AgCl (White, NH₃ soluble) / AgBr (Pale Yellow) / AgI (Yellow)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-emerald-300">Phosphorus (P)</td>
                  <td className="p-2.5">Na₂O₂ fusion + HNO₃ + Ammonium molybdate</td>
                  <td className="p-2.5 text-emerald-400 font-semibold">Yellow precipitate: (NH₄)₃PO₄·12MoO₃</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1 mt-2">
            <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Beilstein Flame Test (Halogens)</span>
            <p className="text-xs text-white/70 leading-relaxed">
              {"A quick qualitative alternative for halogens: Heat the organic compound on a clean copper wire in a Bunsen burner flame. A green or blue-green flame confirms the presence of chlorine, bromine, or iodine (due to volatile copper halides). Fluorine is not detected because copper fluoride is non-volatile."}
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 30: QUANTITATIVE ESTIMATION FORMULAS ─────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            30. Quantitative Analysis Formulas
          </h2>
          <SectionBanner label="Quantitative" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Summary of estimation methods and percentage calculations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Carbon, Hydrogen & Nitrogen</span>
              <div className="text-xs text-white/70 space-y-2">
                <div>- <strong>Liebig's Method:</strong></div>
                <DisplayMath math="\%C = \frac{12}{44} \times \frac{\text{Mass of } CO_2}{\text{Mass of Compound}} \times 100" />
                <DisplayMath math="\%H = \frac{2}{18} \times \frac{\text{Mass of } H_2O}{\text{Mass of Compound}} \times 100" />
                <div>- <strong>Dumas Method (Nitrogen):</strong></div>
                <DisplayMath math="\%N = \frac{28}{22400} \times \frac{\text{Volume of } N_2 \text{ (at STP)}}{\text{Mass of Compound}} \times 100" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Kjeldahl & Halogen Methods</span>
              <div className="text-xs text-white/70 space-y-2">
                <div>- <strong>Kjeldahl's Method (Nitrogen):</strong></div>
                <DisplayMath math="\%N = \frac{1.4 \times N \times V}{\text{Mass of Compound}}" />
                <div>- <strong>Carius Method (Halogens):</strong></div>
                <DisplayMath math="\%X = \frac{\text{At. Mass of } X}{\text{Molar Mass of } AgX} \times \frac{\text{Mass of } AgX}{\text{Mass of Compound}} \times 100" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Sulfur & Phosphorus Estimation</span>
              <div className="text-xs text-white/70 space-y-2">
                <div>- <strong>Carius Method (Sulfur):</strong> Precipitated as Barium Sulfate (<InlineMath math="BaSO_4" />).</div>
                <DisplayMath math="\%S = \frac{32}{233} \times \frac{\text{Mass of } BaSO_4}{\text{Mass of Compound}} \times 100" />
                <div>- <strong>Phosphorus Estimation:</strong> Precipitated as Ammonium Phosphomolybdate.</div>
                <DisplayMath math="\%P = \frac{31}{1877} \times \frac{\text{Mass of Precipitate}}{\text{Mass of Compound}} \times 100" />
              </div>
            </div>
          </div>

          <WarningCard title="Kjeldahl Method Limitations">
            {"This method fails for organic compounds containing nitrogen in nitro (-NO₂), azo (-N=N-), or ring architectures (e.g. Pyridine) because these nitrogen groups cannot be quantitatively converted to ammonium sulfate under boiling H₂SO₄ digestion."}
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 31: DEGREE OF UNSATURATION (DBE) ─────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-rose-400" />
            31. Degree of Unsaturation / Double Bond Equivalent (DBE)
          </h2>
          <SectionBanner label="DBE Calculator" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            The <strong>Double Bond Equivalent (DBE)</strong> calculations provide the total number of rings and/or double bonds in an unknown structural formula. Oxygen and sulfur are ignored.
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold flex items-center justify-center gap-1.5">
            <span>DBE = C &minus;</span>
            <div className="flex flex-col items-center">
              <span className="px-1 border-b border-white/20 pb-0.5">H + X</span>
              <span className="px-1 pt-0.5">2</span>
            </div>
            <span>+</span>
            <div className="flex flex-col items-center">
              <span className="px-1 border-b border-white/20 pb-0.5">N</span>
              <span className="px-1 pt-0.5">2</span>
            </div>
            <span>+ 1</span>
          </div>

          <ProTip>
            <strong>DBE Shortcuts:</strong><br />
            - <strong>DBE = 1:</strong> 1 Double Bond (C=C, C=O) OR 1 Ring.<br />
            - <strong>DBE = 4:</strong> Highly suggestive of a benzene ring (1 ring + 3 double bonds = 4 DBE).
          </ProTip>
        </div>
      </div>

      {/* ── LAB 2: IUPAC & DBE CALCULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            31b. Interactive Lab: Isomerism & DBE Calculator
          </h2>
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider bg-yellow-500/10 px-2.5 py-1 border border-yellow-500/20 rounded-full">Isomer Lab</span>
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Vary the atomic counts to dynamically compute the Double Bond Equivalent (DBE) and view chemical structural configurations:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 p-4.5 rounded-2xl">
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase block">Atomic Constraints</span>
              
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Carbons (C)</label>
                  <input 
                    type="number" 
                    value={carbonCount} 
                    onChange={(e) => setCarbonCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Hydrogens (H)</label>
                  <input 
                    type="number" 
                    value={hydrogenCount} 
                    onChange={(e) => setHydrogenCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Nitrogens (N)</label>
                  <input 
                    type="number" 
                    value={nitrogenCount} 
                    onChange={(e) => setNitrogenCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Halogens (X)</label>
                  <input 
                    type="number" 
                    value={halogenCount} 
                    onChange={(e) => setHalogenCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-center">
              <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">Computed DBE Result</span>
              
              <div className="p-4 bg-black/45 rounded-2xl text-center space-y-2 border border-white/5">
                <div className="text-3xl font-black text-cyan-400 font-mono">{dbeVal.toFixed(1)}</div>
                <div className="text-[11px] text-white/50 uppercase font-bold tracking-wider">Double Bond Equivalents</div>
              </div>

              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs text-white/70 leading-relaxed font-mono">
                {getIsomerSuggestions(dbeVal)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 32: STABILITY COMPARISON STRATEGY ────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-violet-400" />
            32. GOC Stability Comparison Hierarchy
          </h2>
          <SectionBanner label="Stability Logic" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            When ranking intermediates or conjugate bases on competitive exams, evaluate electronic effects in this exact priority sequence:
          </p>
          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs font-mono text-cyan-300 leading-relaxed">
            {"Aromaticity > Resonance / Mesomeric > Hyperconjugation > Inductive Effect"}
          </div>

          <ProTip>
            *Example:* An allylic carbocation (<InlineMath math="2^\circ" />, stabilized by resonance) is more stable than a primary propyl carbocation (<InlineMath math="1^\circ" />, stabilized only by +I and hyperconjugation) despite the simple degree-based rule.
          </ProTip>
        </div>
      </div>

      {/* ── LAB 3: INTERACTIVE STABILITY PREDICTOR ────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            32b. Interactive Lab: Stability & Electronic Effects Predictor
          </h2>
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider bg-yellow-500/10 px-2.5 py-1 border border-yellow-500/20 rounded-full">Predictor Lab</span>
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Select an intermediate type and a substituent group to dynamically calculate stability outcomes:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 p-4.5 rounded-2xl">
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase block">Intermediate Model</span>
              <div className="grid grid-cols-3 gap-2">
                {(['carbocation', 'carbanion', 'radical'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setIntermediateType(t)}
                    className={`px-3 py-2 text-xs font-bold capitalize rounded-xl border transition ${
                      intermediateType === t 
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">Substituent / Group Configuration</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['methyl', 't-butyl', 'nitro', 'methoxy', 'allyl'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubstituent(s)}
                    className={`px-3 py-2 text-xs font-bold capitalize rounded-xl border transition ${
                      substituent === s 
                        ? 'bg-amber-500/10 border-amber-400 text-amber-300' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{intermediateType} ({substituent})</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    stability.score > 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>{stability.level}</span>
                </div>

                <div className="mt-3 space-y-1.5">
                  <div className="text-[10px] text-white/40 uppercase font-black">Stability Score</div>
                  <div className="text-2xl font-black font-mono text-cyan-400">{stability.score}/100</div>
                  
                  <div className="text-[10px] text-white/40 uppercase font-black pt-2">Dominant Electronic Effect</div>
                  <div className="text-xs text-white/80 font-bold">{stability.dominant}</div>

                  <div className="text-[10px] text-white/40 uppercase font-black pt-2">Detailed Reason</div>
                  <p className="text-xs text-white/60 leading-relaxed font-mono">{stability.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 33: COMMON MISTAKES & EXAM TRAPS ───────────────────────── */}
      <Collapsible title="33 · Common Mistakes & Exam Traps" icon={<AlertCircle className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-3">
          <WarningCard title="Aromaticity Trap">
            {"(4n+2)π electrons alone do not guarantee aromaticity; the ring MUST also be fully cyclic, planar, and conjugated. If planarity is lost (like the tub shape of Cyclooctatetraene), the molecule becomes non-aromatic, not anti-aromatic."}
          </WarningCard>

          <WarningCard title="Longest Chain IUPAC Trap">
            {"Do not blindly select the longest chain if it excludes the principal functional group. The parent chain must prioritize containing the principal functional group and multiple bonds."}
          </WarningCard>

          <WarningCard title="Chirality Meso Trap">
            {"The presence of chiral centers does not guarantee overall molecular optical activity. A meso compound has chiral centers but is optically inactive due to an internal plane of symmetry."}
          </WarningCard>

          <WarningCard title="Keto-Enol vs. Resonance Trap">
            {"Resonance structures do not exist in physical equilibrium (only the hybrid exists, and no atoms move). Tautomerism involves a physical dynamic equilibrium of actual interconverting molecules (protons migrate)."}
          </WarningCard>

          <WarningCard title="Carbanion Stability Trap">
            {"Alkyl groups show +I effect, which destabilizes carbanions (opposite to carbocations). Simple carbanion stability: Methyl > 1° > 2° > 3°."}
          </WarningCard>

          <WarningCard title="Neutral Electrophiles Trap">
            {"Electrophiles do not require a positive charge. Neutral molecules with incomplete octets like BF₃ and AlCl₃ are strong electrophiles."}
          </WarningCard>
        </div>
      </Collapsible>

      {/* ── SECTION 34: IAT EXAM FOCUS & CHECKLIST ──────────────────────────────── */}
      <Collapsible title="34 · IAT Exam Focus & Checklist" icon={<Star className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/15">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Organic chemistry excludes simple mineral compounds (CO, CO₂, carbonates).",
              "Hybridisation electronegativity trend: sp > sp² > sp³.",
              "Heterocyclic aromatic compounds contain heteroatoms (N, S, O) in conjugated ring cycles.",
              "Antiaromatic structures are cyclic, planar, conjugated, and have 4n pi-electrons.",
              "Modern IUPAC numbering resolves ties using first-point-of-difference rules.",
              "Keto-enol tautomers are real isomers in dynamic equilibrium; resonance contributors are theoretical.",
              "Geometrical isomers require both alkene carbon nodes to bear distinct groups.",
              "Homolytic cleavage yields neutral free radicals (favoured by UV/heat/non-polar).",
              "Carbocations are sp²-hybridised planar carbon nodes with an empty p-orbital.",
              "Electronegative atoms adjacent to carbocations can stabilize via +R back-donation.",
              "Resonance effects dominate over inductive effects, except for halogens (-I > +R).",
              "Kjeldahl's method fails for nitro, azo, and ring-nitrogen compounds (like pyridine)."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                <CheckCircle2 className="w-4.5 h-4.5 text-violet-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 35: SOLVED PROBLEMS (IAT LEVEL) ─────────────────────────── */}
      <Collapsible title="35 · Solved Problems (IAT Level)" icon={<BookOpen className="w-4 h-4" />} accent="emerald" defaultOpen={true}>
        <div className="space-y-4">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Degree of Unsaturation calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Calculate the Double Bond Equivalent (DBE) of C₆H₅N and write possible structural properties."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Apply formula: DBE = C - (H + X)/2 + N/2 + 1"}</div>
              <div>2. Given: C = 6, H = 5, N = 1, X = 0.</div>
              <div>   DBE = 6 - 5/2 + 1/2 + 1 = 6 - 2.5 + 0.5 + 1 = 5.</div>
              <div>3. A DBE of 5 could indicate 1 benzene ring (DBE=4) + 1 additional double bond or ring.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: DBE = 5</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Aromaticity Verification</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Is the cyclopentadienyl anion aromatic, antiaromatic, or non-aromatic? Explain."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Cyclopentadienyl anion is a 5-membered cyclic ring with a negative charge.</div>
              <div>2. The negative charge on carbon represents a lone pair in a p-orbital.</div>
              <div>3. Conjugation is continuous (2 double bonds = 4π electrons + 1 lone pair = 6π electrons).</div>
              <div>4. The ring is cyclic, planar, conjugated, and has 6π electrons, satisfying (4n+2) for n=1.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Aromatic</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Carbocation Stability Comparison</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Rank the following carbocations in order of increasing stability: CH₃-CH₂⁺, (CH₃)₂CH⁺, CH₂=CH-CH₂⁺."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. CH₃-CH₂⁺ is a primary ethyl carbocation (3 α-hydrogens).</div>
              <div>2. (CH₃)₂CH⁺ is a secondary isopropyl carbocation (6 α-hydrogens).</div>
              <div>3. CH₂=CH-CH₂⁺ is an allylic carbocation stabilized by resonance.</div>
              <div>4. Resonance stabilization is stronger than alkyl hyperconjugation.</div>
              <span className="text-emerald-400 font-bold block mt-1">{"Answer: CH₃-CH₂⁺ < (CH₃)₂CH⁺ < CH₂=CH-CH₂⁺"}</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: IUPAC Nomenclature Priority</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Assign the IUPAC name for CH₃-CO-CH₂-CH(OH)-CH₃."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Functional groups: Ketone (>C=O) at C2 and Alcohol (-OH) at C4."}</div>
              <div>{"2. Priority rule: Ketone > Alcohol. Suffix is '-one', prefix is 'hydroxy'."}</div>
              <div>3. Number from left to right to give ketone the lowest locant (2):</div>
              <div>   C1: CH₃, C2: CO, C3: CH₂, C4: CH(OH), C5: CH₃.</div>
              <div>4. Name is 4-hydroxypentan-2-one.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: 4-hydroxypentan-2-one</span>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: Geometrical Isomerism Conditions</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Which of the following compounds exhibits geometrical isomerism: 1-butene or 2-butene?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. 1-butene (CH₂=CH-CH₂-CH₃) has two hydrogen substituents on C1. It fails the abC=Ccd condition.</div>
              <div>2. 2-butene (CH₃-CH=CH-CH₃) has H and CH₃ groups on C2, and H and CH₃ on C3. It meets the condition.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: 2-butene (exists as cis and trans isomers)</span>
            </div>
          </div>

          {/* Problem 6 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 6: Acidic Strength Comparison</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why is p-nitrophenol more acidic than phenol?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Acidity depends on the stability of the conjugate phenoxide ion.</div>
              <div>2. Phenoxide ion is stabilized by resonance of negative charge into the ring.</div>
              <div>3. The p-nitro group is highly electron-withdrawing (-I, -R). It disperses the negative charge further.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Nitro group stabilize phenoxide ion via strong electron-withdrawal</span>
            </div>
          </div>

          {/* Problem 7 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 7: Basic Strength Comparison</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Arrange cyclohexylamine, aniline, and p-nitroaniline in increasing order of basicity."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Cyclohexylamine has sp³ nitrogen with localized lone pair, highly available (strongest base).</div>
              <div>2. Aniline has lone pair delocalized into benzene ring, reducing availability.</div>
              <div>3. p-nitroaniline has nitro group further pulling lone-pair density away (weakest base).</div>
              <span className="text-emerald-400 font-bold block mt-1">{"Answer: p-nitroaniline < aniline < cyclohexylamine"}</span>
            </div>
          </div>

          {/* Problem 8 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 8: Lassaigne's Test blood-red complex</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"During Lassaigne's test, sodium fusion of an organic compound with FeCl₃ gives a blood-red coloration. What elements are present?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Normally, sodium fusion converts N to NaCN and S to Na₂S.</div>
              <div>2. If N and S are present together, sodium thiocyanate (NaSCN) is formed.</div>
              <div>3. SCN⁻ ions react with Fe³⁺ to form the blood-red [Fe(SCN)]²⁺ complex.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Nitrogen and Sulfur are both present</span>
            </div>
          </div>

          {/* Problem 9 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 9: Quantitative analysis calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"In a Dumas nitrogen estimation, 0.3 g of organic compound gave 50 mL of nitrogen gas at 300 K and 715 mm Hg pressure. Find % of N (aqueous tension at 300 K = 15 mm Hg)."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Correct pressure: P = 715 &minus; 15 = 700 mm Hg.</div>
              <div>2. Convert volume to STP: V<sub>STP</sub> = (P<sub>1</sub> &times; V<sub>1</sub> &times; T<sub>STP</sub>) / (P<sub>STP</sub> &times; T<sub>1</sub>)</div>
              <div>   V<sub>STP</sub> = (700 &times; 50 &times; 273) / (760 &times; 300) = 41.9 mL.</div>
              <div>3. Calculate %N = (28 &times; V<sub>STP</sub> &times; 100) / (22400 &times; mass) = (28 &times; 41.9 &times; 100) / (22400 &times; 0.3) = 17.46%.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: %N = 17.46%</span>
            </div>
          </div>

          {/* Problem 10 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 10: Kjeldahl Limitations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why can't Kjeldahl's method be used to estimate nitrogen in nitrobenzene?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Kjeldahl's method relies on converting nitrogen to ammonium sulfate.</div>
              <div>2. Nitrogen in nitro groups (-NO₂) cannot be reduced to ammonia under standard digestion.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Nitro group nitrogen is not converted to ammonium sulfate</span>
            </div>
          </div>

          {/* Problem 11 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 11: Resonance structures stability</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Which resonance contributor of formaldehyde is more stable: H₂C=O or H₂C⁺-O⁻?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. H₂C=O has no charge separation and all atoms have complete octets.</div>
              <div>2. H₂C⁺-O⁻ has charge separation and carbon has an incomplete octet (6 valence e⁻).</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: H₂C=O (Complete octets and zero charge separation)</span>
            </div>
          </div>

          {/* Problem 12 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 12: Optical isomerism meso forms</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"How many stereoisomers exist for tartaric acid? Identify the optically inactive forms."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Tartaric acid has 2 chiral carbons. Formula: HOOC-CH(OH)-CH(OH)-COOH.</div>
              <div>2. Due to structural symmetry, it forms 3 stereoisomers: d-tartaric, l-tartaric, and meso-tartaric acid.</div>
              <div>3. Meso-tartaric acid is optically inactive due to an internal plane of symmetry.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: 3 stereoisomers; Meso-tartaric acid is optically inactive</span>
            </div>
          </div>

          {/* Problem 13 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 13: Conformational Stability of n-Butane</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Arrange the four conformations of n-butane (anti, gauche, eclipsed, fully eclipsed) in order of increasing potential energy."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Anti: Methyl groups are 180° apart, minimizing steric and torsional strain (lowest energy)."}</div>
              <div>{"2. Gauche: Methyl groups are 60° apart, causing mild steric strain (higher energy than anti)."}</div>
              <div>{"3. Eclipsed: H/CH₃ eclipsing bonds cause torsional strain (higher energy)."}</div>
              <div>{"4. Fully Eclipsed: CH₃/CH₃ eclipsing bonds cause maximum steric and torsional strain (highest energy)."}</div>
              <span className="text-emerald-400 font-bold block mt-1">{"Answer: Potential Energy: Anti < Gauche < Eclipsed < Fully Eclipsed"}</span>
            </div>
          </div>

          {/* Problem 14 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 14: Chiral Center R/S Configuration</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Assign the R/S configuration to the chiral center in 2-chlorobutanoic acid."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Chiral center is C2 in CH₃-CH₂-CH(Cl)-COOH."}</div>
              <div>{"2. Determine substituent priorities: 1: -Cl (highest atomic number), 2: -COOH (carbon bonded to three oxygen domains), 3: -CH₂CH₃ (carbon bonded to carbon), 4: -H (lowest atomic number)."}</div>
              <div>{"3. Tracing from priority 1 → 2 → 3: Counter-clockwise path leads to S configuration, and clockwise path leads to R configuration."}</div>
              <span className="text-emerald-400 font-bold block mt-1">{"Answer: S-configuration (when looking with lowest priority H pointing away)"}</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ── SECTION 36: PRACTICE MOCK TEST ──────────────────────────────────── */}
      <Collapsible title="36 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <p className="text-white/60">
            Self-assess your GOC foundation with this 10-question high-yield mock test.
          </p>

          <div className="space-y-4">
            {[
              {
                q: "1. Which of the following compounds has sp-hybridised carbon atoms?",
                a: "A. Propene", b: "B. Propadiene (Allene)", c: "C. Propanone", d: "D. Cyclopropane",
                ans: "B. Propadiene (CH₂=C=CH₂) contains a central carbon with 2 double bonds, which is sp-hybridised."
              },
              {
                q: "2. The correct basic strength order for methyl-substituted amines in aqueous phase is:",
                a: "A. (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃", b: "B. (CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃", c: "C. (CH₃)₂NH > (CH₃)₃N > CH₃NH₂ > NH₃", d: "D. NH₃ > CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N",
                ans: "A. Secondary > Primary > Tertiary > Ammonia is the experimental order due to induction, steric and solvation factors."
              },
              {
                q: "3. Which of the following elements does NOT form a precipitate in Lassaigne's test after fusion with sodium and addition of AgNO₃?",
                a: "A. Chlorine", b: "B. Bromine", c: "C. Nitrogen", d: "D. Iodine",
                ans: "C. Nitrogen forms soluble NaCN, which reacts with FeSO₄ to form blue ferric ferrocyanide; it does not precipitate with silver nitrate."
              },
              {
                q: "4. A compound C₄H₆ has how many degrees of unsaturation?",
                a: "A. 1", b: "B. 2", c: "C. 3", d: "D. 4",
                ans: "B. DBE = 4 - 6/2 + 1 = 2. It can be an alkyne, diene, or bicyclic structure."
              },
              {
                q: "5. Why is the C-O bond in phenol shorter than in methanol?",
                a: "A. Resonance delocalization (+R)", b: "B. Inductive effect (-I)", c: "C. Steric hindrance", d: "D. Hyperconjugation",
                ans: "A. Phenol oxygen lone pairs are delocalized into the benzene ring, giving the C-O bond partial double-bond character."
              },
              {
                q: "6. Which purification method is best suited for separating ortho and para-nitrophenol?",
                a: "A. Crystallisation", b: "B. Steam distillation", c: "C. Sublimation", d: "D. Vacuum distillation",
                ans: "B. o-nitrophenol has intramolecular hydrogen bonds (steam volatile), while p-nitrophenol has intermolecular hydrogen bonds (non-volatile)."
              },
              {
                q: "7. Which intermediate possesses a planar, sp²-hybridised carbon node with a single unpaired electron?",
                a: "A. Carbocation", b: "B. Carbanion", c: "C. Free Radical", d: "D. Carbene",
                ans: "C. Free radicals are sp²-hybridised planar nodes with an unpaired electron situated in a p-orbital."
              },
              {
                q: "8. The IUPAC name for CH₃-CH=CH-C≡CH is:",
                a: "A. Pent-2-en-4-yne", b: "B. Pent-3-en-1-yne", c: "C. Pent-1-yn-3-ene", d: "D. Pent-2-en-1-yne",
                ans: "B. Number from right to left to give double/triple bonds lowest locants (1 for alkyne, 3 for alkene). Alkyne suffix is placed at the end: Pent-3-en-1-yne."
              },
              {
                q: "9. Which effect is temporary and requires an attacking reagent?",
                a: "A. Inductive effect", b: "B. Mesomeric effect", c: "C. Electromeric effect", d: "D. Hyperconjugation",
                ans: "C. The electromeric effect is a temporary electron transfer occurring only in the presence of an attacking reagent."
              },
              {
                q: "10. In Kjeldahl's method, nitrogen is estimated quantitatively as:",
                a: "A. N₂ gas", b: "B. NH₃ gas", c: "C. HNO₃", d: "D. NH₄Cl",
                ans: "B. Digested nitrogen is converted to ammonium sulfate, which yields ammonia (NH₃) upon heating with NaOH; the ammonia is titrated."
              }
            ].map((test, index) => (
              <div key={index} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                <span className="text-xs font-bold text-rose-400 block">Question {index + 1}</span>
                <p className="text-white font-bold">{test.q}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                  <div>{test.a}</div>
                  <div>{test.b}</div>
                  <div>{test.c}</div>
                  <div>{test.d}</div>
                </div>
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer text-cyan-400 hover:text-cyan-300 font-bold">Show Answer & Explanation</summary>
                  <div className="p-3 bg-black/45 rounded-xl font-mono text-emerald-400 mt-2 leading-relaxed">
                    {test.ans}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ─── FOOTER NAVIGATOR ──────────────────────────────────────────────── */}
      <div className="flex justify-between items-center border-t border-white/10 pt-5 mt-4">
        <button 
          onClick={() => onNavigate?.('smart_lessons')}
          className="text-xs text-white/50 hover:text-white transition flex items-center gap-1.5"
        >
          ← Back to Dashboard
        </button>
        <span className="text-[11px] text-white/30 font-mono">Organic Chemistry · Unit 10</span>
      </div>

    </div>
  );
}
