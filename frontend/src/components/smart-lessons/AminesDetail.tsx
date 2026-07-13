import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
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
  Activity,
  SlidersHorizontal,
  Workflow,
  ClipboardList
} from 'lucide-react';

const renderBoldText = (text: string) => {
  if (!text) return null;
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="text-white">{part}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

const InlineMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: false,
      throwOnError: false,
    });
    return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
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
    return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (e) {
    return <div className={className}>{math}</div>;
  }
};

// ─── LOCAL SUB-COMPONENTS ───────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' | 'pink' }) {
  const colorMap = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${colorMap[color]}`}>
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
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 flex gap-3 text-[13px] text-white/70 leading-relaxed text-left">
      <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      <div>
        <strong className="text-cyan-400 block mb-0.5 uppercase tracking-wide text-[11px]">Gold Tip / Insight</strong>
        {children}
      </div>
    </div>
  );
}

function WarningCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 flex gap-3 text-[13px] text-white/70 leading-relaxed text-left">
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
      <div>
        <strong className="text-rose-400 block mb-0.5 uppercase tracking-wide text-[11px]">{title}</strong>
        {children}
      </div>
    </div>
  );
}

function Collapsible({ title, icon, accent = 'cyan', defaultOpen = false, children }: { 
  title: string; 
  icon: React.ReactNode; 
  accent?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald'; 
  defaultOpen?: boolean; 
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const accentClasses = {
    cyan: 'border-cyan-500/20 hover:border-cyan-500/30 text-cyan-400 bg-cyan-500/[0.02]',
    rose: 'border-rose-500/20 hover:border-rose-500/30 text-rose-400 bg-rose-500/[0.02]',
    amber: 'border-amber-500/20 hover:border-amber-500/30 text-amber-400 bg-amber-500/[0.02]',
    violet: 'border-violet-500/20 hover:border-violet-500/30 text-violet-400 bg-violet-500/[0.02]',
    emerald: 'border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 bg-emerald-500/[0.02]',
  };
  return (
    <div className="border border-white/5 rounded-3xl overflow-hidden bg-[#070913]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-5 flex items-center justify-between text-left transition ${isOpen ? 'border-b border-white/5' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border flex items-center justify-center ${accentClasses[accent]}`}>
            {icon}
          </div>
          <span className="text-white font-bold text-sm sm:text-base tracking-wide font-display">{title}</span>
        </div>
        <span className="text-white/40 text-xs sm:text-sm font-semibold pr-1">
          {isOpen ? 'Collapse [-]' : 'Expand [+]'}
        </span>
      </button>
      {isOpen && <div className="p-5 sm:p-6 space-y-5 bg-[#090b16]/40">{children}</div>}
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

export default function AminesDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [substrate, setSubstrate] = useState<'prim_aliph' | 'sec_aliph' | 'tert_aliph' | 'prim_arom' | 'diazonium'>('prim_aliph');
  const [reagent, setReagent] = useState<'hinsberg' | 'nitrous' | 'carbylamine' | 'bromine_water' | 'azo_coupling'>('hinsberg');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    // Diazonium salt special handling
    if (substrate === 'diazonium') {
      if (reagent === 'azo_coupling') {
        return {
          outcome: 'Orange/Yellow Azo Dye Precipitate',
          color: 'text-amber-400',
          visualEffect: 'Intense colored solid separating rapidly from the solution.',
          product: 'p-Hydroxyazobenzene (Orange) or p-Aminoazobenzene (Yellow)',
          explanation: 'Benzene diazonium chloride undergoes electrophilic aromatic substitution coupling with activated phenols (alkaline) or anilines (acidic) to yield highly conjugated azo dyes.',
          trap: 'Diazonium salts must be prepared and kept cold (0-5°C). Above this, they hydrolyze to phenol, making coupling reactions fail.'
        };
      }
      if (reagent === 'nitrous' || reagent === 'hinsberg' || reagent === 'carbylamine') {
        return {
          outcome: 'No Reaction / Decomposition',
          color: 'text-rose-400',
          visualEffect: 'Nitrogen gas evolves slowly on warming.',
          product: 'Phenol / Chlorobenzene mixture',
          explanation: 'Diazonium salts do not possess nucleophilic amine nitrogens and fail Hinsberg/Carbylamine tests completely.',
          trap: 'Diazonium salts are ionic intermediates, not free amines.'
        };
      }
    }

    // Hinsberg Test
    if (reagent === 'hinsberg') {
      if (substrate === 'prim_aliph') {
        return {
          outcome: 'Soluble Sulfonamide in Alkali',
          color: 'text-emerald-400',
          visualEffect: 'Initial clear solution forms a precipitate with Hinsberg reagent, which dissolves completely upon adding NaOH.',
          product: 'N-Alkylbenzenesulfonamide sodium salt (Soluble)',
          explanation: 'Primary amines react with benzenesulfonyl chloride to form N-alkylbenzenesulfonamide. The hydrogen attached to nitrogen is highly acidic due to the strong electron-withdrawing sulfonyl group, making it soluble in aqueous NaOH.',
          trap: 'Acidifying this solution precipitates the sulfonamide again. Remember this characteristic behavior!'
        };
      }
      if (substrate === 'prim_arom') {
        return {
          outcome: 'Soluble Sulfonamide in Alkali (Aromatic)',
          color: 'text-emerald-400',
          visualEffect: 'White solid forms which dissolves completely upon addition of NaOH.',
          product: 'N-Phenylbenzenesulfonamide sodium salt (Soluble)',
          explanation: 'Aniline reacts as a primary amine, forming a sulfonamide that dissolves in alkali because of the acidic proton left on the nitrogen atom.',
          trap: 'This test is identical for both primary aliphatic and primary aromatic amines.'
        };
      }
      if (substrate === 'sec_aliph') {
        return {
          outcome: 'Insoluble Sulfonamide (Precipitate remains)',
          color: 'text-amber-400',
          visualEffect: 'Solid precipitate forms and does NOT dissolve in NaOH solution.',
          product: 'N,N-Dialkylbenzenesulfonamide (Insoluble)',
          explanation: 'Secondary amines react with benzenesulfonyl chloride to form a sulfonamide. Since there is no acidic hydrogen remaining on the nitrogen, the product cannot form a salt and remains completely insoluble in alkali.',
          trap: 'Since the precipitate remains, this clearly distinguishes secondary amines from primary amines.'
        };
      }
      if (substrate === 'tert_aliph') {
        return {
          outcome: 'No Reaction / Dissolves in Acid',
          color: 'text-rose-400',
          visualEffect: 'No solid product forms. Upon acid addition, the amine dissolves.',
          product: 'Unreacted Tertiary Amine salt',
          explanation: 'Tertiary amines do not possess any replaceable hydrogens on nitrogen, making them inert to benzenesulfonyl chloride under Hinsberg conditions.',
          trap: 'Since they do not react, tertiary amines remain soluble in acidic medium but separate as oily layers in basic solutions.'
        };
      }
    }

    // Nitrous Acid Test
    if (reagent === 'nitrous') {
      if (substrate === 'prim_aliph') {
        return {
          outcome: 'Vigorous N₂ Gas Evolution',
          color: 'text-emerald-400',
          visualEffect: 'Rapid bubbling and effervescence of colorless, odorless nitrogen gas.',
          product: 'Alcohols + Alkenes + Nitrogen gas (N₂↑)',
          explanation: 'Primary aliphatic amines react with nitrous acid (NaNO₂ + HCl) to form highly unstable aliphatic diazonium salts, which decompose instantly even at 0°C to release N₂ gas and carbocation intermediates.',
          trap: 'Quantitative estimation of this nitrogen gas is used in Van Slyke method for amino acid determination.'
        };
      }
      if (substrate === 'prim_arom') {
        return {
          outcome: 'Stable Diazonium Salt Formed (at 0-5°C)',
          color: 'text-cyan-400',
          visualEffect: 'Clear solution forms at ice-cold temperature. On warming, nitrogen gas bubbles out and phenol forms.',
          product: 'Benzenediazonium Chloride [C₆H₅N₂⁺Cl⁻]',
          explanation: 'Primary aromatic amines (Aniline) undergo diazotization to form resonance-stabilized benzene diazonium salts that are stable in cold aqueous solution.',
          trap: 'Must keep temperature strictly at 0-5°C. Above 10°C, the salt decomposes to phenol.'
        };
      }
      if (substrate === 'sec_aliph') {
        return {
          outcome: 'Yellow Oily Nitrosamine formed',
          color: 'text-yellow-400',
          visualEffect: 'A distinct yellow oily layer separates on top of the aqueous solution.',
          product: 'N-Nitrosodialkylamine (Yellow Oil)',
          explanation: 'Secondary amines react with nitrous acid to form oily, insoluble N-nitrosamines which do not decompose to release gas.',
          trap: 'Nitrosamines are potent carcinogens. This test is a classic indicator of secondary amines.'
        };
      }
      if (substrate === 'tert_aliph') {
        return {
          outcome: 'Crystalline Nitrite Salt / Dissolution',
          color: 'text-zinc-400',
          visualEffect: 'The amine dissolves completely to form a soluble nitrite salt.',
          product: 'Trialkylammonium Nitrite Salt',
          explanation: 'Tertiary aliphatic amines react with nitrous acid to form soluble trialkylammonium nitrite salts, which decompose on heating to yield nitrosamines and aldehydes.',
          trap: 'Aromatic tertiary amines undergo electrophilic ring nitrosation to yield green p-nitrosoaniline salts.'
        };
      }
    }

    // Carbylamine Test
    if (reagent === 'carbylamine') {
      const isPrim = substrate === 'prim_aliph' || substrate === 'prim_arom';
      if (isPrim) {
        return {
          outcome: 'Extremely Foul Odor (Carbylamine Positive)',
          color: 'text-rose-400',
          visualEffect: 'Evolution of offensive, nauseating vapor of alkyl isocyanide.',
          product: 'Alkyl/Aryl Isocyanide (R-NC / Ar-NC)',
          explanation: 'Primary amines (both aliphatic and aromatic) react with chloroform and alcoholic KOH to undergo alpha-elimination yielding dichlorocarbene intermediates, which attack the amine to form highly offensive isocyanides.',
          trap: 'This test is extremely selective for primary amines. Secondary and tertiary amines show absolutely no reaction because they lack two amine protons.'
        };
      } else {
        return {
          outcome: 'No Reaction / Inert',
          color: 'text-zinc-400',
          visualEffect: 'No changes. No foul odor is generated.',
          product: 'None',
          explanation: 'Secondary and tertiary amines lack the necessary two protons on nitrogen to undergo elimination of 3 molecules of HCl, preventing isocyanide formation.',
          trap: 'Useful diagnostic test to confirm the presence of primary amine groups.'
        };
      }
    }

    // Bromine Water Test
    if (reagent === 'bromine_water') {
      if (substrate === 'prim_arom') {
        return {
          outcome: 'White Precipitate Formed Instantly',
          color: 'text-emerald-400',
          visualEffect: 'Orange bromine color is discharged, and a dense white precipitate settles down.',
          product: '2,4,6-Tribromoaniline↓',
          explanation: 'The amino group (-NH₂) is highly activating due to strong +M resonance. Aniline reacts instantly with bromine water without any Lewis acid catalyst to undergo electrophilic substitution at all ortho and para positions.',
          trap: 'To obtain mono-brominated product, the amino group must be protected by acetylation (forming acetanilide) first, which reduces its electron-donating power.'
        };
      } else {
        return {
          outcome: 'No Precipitate / Weak Bromination',
          color: 'text-zinc-400',
          visualEffect: 'Bromine color remains or fades very slowly with no precipitate.',
          product: 'None',
          explanation: 'Aliphatic amines do not possess an activated aromatic ring, so they do not undergo ring halogenation reactions.',
          trap: 'Aliphatic amines may form unstable N-bromo derivatives, but no ring substitution takes place.'
        };
      }
    }

    return {
      outcome: 'Reaction details not configured',
      color: 'text-zinc-400',
      visualEffect: 'None',
      product: 'None',
      explanation: 'None',
      trap: 'None'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white">
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Chemistry</Tag>
            <Tag color="cyan">Unit 13</Tag>
            <Tag color="rose">IAT Essential</Tag>
            <Tag color="violet">Organic Compounds Containing Nitrogen</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Organic Compounds <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Containing Nitrogen</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Rigorous revision framework for Amines and Diazonium Salts. Master basicity trends, named preparations (Gabriel, Hoffmann degradation), Hinsberg test separation, and diazonium coupling pathways for the IAT exam.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: STRUCTURE, NOMENCLATURE & PYRAMIDAL INVERSION ──────── */}
      <Collapsible title="1 · Structure, Classification & Pyramidal Inversion" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70">
          <p className="leading-relaxed">
            Amines are derivatives of ammonia in which one or more hydrogen atoms are replaced by alkyl or aryl groups. The nitrogen atom in amines is <InlineMath math="\text{sp}^3" /> hybridized with a pyramidal geometry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Structure and Inversion */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Nitrogen Geometry & Pyramidal Inversion</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Pyramidal Geometry:</strong> Nitrogen lone pair occupies one position of tetrahedral space, compressing the remaining bond angles (e.g. to <InlineMath math="108^\circ" /> in trimethylamine).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Pyramidal Inversion:</strong> Amines with three different substituents undergo extremely rapid "umbrella-like" nitrogen inversion through a planar transition state (<InlineMath math="\text{sp}^2" />-like nitrogen). As a result, chiral amines cannot be resolved into stable enantiomers at room temperature.
                  </div>
                </li>
              </ul>
            </div>

            {/* Classification */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Classification & N-Substitution</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>1° (Primary):</strong> One carbon bonded to Nitrogen. e.g. Ethanamine (<InlineMath math="\text{R-NH}_2" />).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>2° (Secondary):</strong> Two carbons bonded to Nitrogen. e.g. N-Methylethanamine (<InlineMath math="\text{R}_2\text{NH}" />).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>3° (Tertiary):</strong> Three carbons bonded to Nitrogen. e.g. N,N-Dimethylmethanamine (<InlineMath math="\text{R}_3\text{N}" />).
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* SVG Inversion Diagram */}
          <div className="p-5 bg-black/45 rounded-2xl border border-white/5 flex flex-col items-center justify-center space-y-2">
            <span className="text-[11px] font-bold text-cyan-400 block uppercase tracking-wider">Nitrogen Pyramidal Inversion Scheme</span>
            <svg viewBox="0 0 500 120" className="w-full max-w-md h-auto text-white">
              {/* Left Pyramid */}
              <g transform="translate(10, 10)">
                <text x="60" y="60" fill="currentColor" className="text-xs font-mono font-bold">N</text>
                {/* Bonds */}
                <line x1="62" y1="52" x2="62" y2="30" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" /> {/* Lone pair */}
                <path d="M 62,25 C 55,25 55,15 62,15 C 69,15 69,25 62,25" fill="none" stroke="currentColor" strokeWidth="1" />
                <line x1="56" y1="64" x2="35" y2="85" stroke="currentColor" strokeWidth="2" />
                <line x1="66" y1="64" x2="85" y2="85" stroke="currentColor" strokeWidth="2" />
                <line x1="60" y1="66" x2="52" y2="90" stroke="currentColor" strokeWidth="3" />
                <text x="25" y="98" fill="currentColor" className="text-[10px] font-mono">R¹</text>
                <text x="88" y="98" fill="currentColor" className="text-[10px] font-mono">R²</text>
                <text x="45" y="105" fill="currentColor" className="text-[10px] font-mono">R³</text>
              </g>

              {/* Equilibrium Arrow */}
              <path d="M 180,60 L 220,60" stroke="cyan" strokeWidth="2" />
              <path d="M 220,60 L 212,54" stroke="cyan" strokeWidth="2" />
              <path d="M 200,70 L 160,70" stroke="cyan" strokeWidth="2" />
              <path d="M 160,70 L 168,76" stroke="cyan" strokeWidth="2" />
              <text x="175" y="48" fill="cyan" className="text-[9px] font-mono">Inversion</text>

              {/* Right Pyramid (Inverted) */}
              <g transform="translate(280, 10)">
                <text x="60" y="60" fill="currentColor" className="text-xs font-mono font-bold">N</text>
                {/* Bonds Inverted */}
                <line x1="62" y1="68" x2="62" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" /> {/* Lone pair down */}
                <path d="M 62,95 C 55,95 55,105 62,105 C 69,105 69,95 62,95" fill="none" stroke="currentColor" strokeWidth="1" />
                <line x1="56" y1="56" x2="35" y2="35" stroke="currentColor" strokeWidth="2" />
                <line x1="66" y1="56" x2="85" y2="35" stroke="currentColor" strokeWidth="2" />
                <line x1="60" y1="54" x2="52" y2="30" stroke="currentColor" strokeWidth="3" />
                <text x="25" y="28" fill="currentColor" className="text-[10px] font-mono">R¹</text>
                <text x="88" y="28" fill="currentColor" className="text-[10px] font-mono">R²</text>
                <text x="45" y="22" fill="currentColor" className="text-[10px] font-mono">R³</text>
              </g>
            </svg>
            <span className="text-[10px] text-white/40">*Note:* The energy barrier is only ~25 kJ/mol, leading to rapid racemization.</span>
          </div>

          <SectionBanner label="Nomenclature Flashcard Table" color="cyan" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Structure</th>
                  <th className="p-3">Common Name</th>
                  <th className="p-3 text-cyan-400">IUPAC Name</th>
                  <th className="p-3">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-sans">
                <tr>
                  <td className="p-3 font-mono text-xs">{"CH₃-NH₂"}</td>
                  <td className="p-3">Methylamine</td>
                  <td className="p-3 text-cyan-400 font-semibold">Methanamine</td>
                  <td className="p-3">1° Aliphatic</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">{"(CH₃)₂NH"}</td>
                  <td className="p-3">Dimethylamine</td>
                  <td className="p-3 text-cyan-400 font-semibold">N-Methylmethanamine</td>
                  <td className="p-3">2° Aliphatic</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">{"(CH₃)₃N"}</td>
                  <td className="p-3">Trimethylamine</td>
                  <td className="p-3 text-cyan-400 font-semibold">N,N-Dimethylmethanamine</td>
                  <td className="p-3">3° Aliphatic</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">{"C₆H₅NH₂"}</td>
                  <td className="p-3">Aniline</td>
                  <td className="p-3 text-cyan-400 font-semibold">Benzenamine</td>
                  <td className="p-3">1° Aromatic</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">{"o-CH₃-C₆H₄-NH₂"}</td>
                  <td className="p-3">o-Toluidine</td>
                  <td className="p-3 text-cyan-400 font-semibold">2-Methylbenzenamine</td>
                  <td className="p-3">1° Aromatic</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs">{"C₆H₅CH₂NH₂"}</td>
                  <td className="p-3">Benzylamine</td>
                  <td className="p-3 text-cyan-400 font-semibold">Phenylmethanamine</td>
                  <td className="p-3">1° Aralkyl</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: PREPARATION OF AMINES ──────────────────────────────── */}
      <Collapsible title="2 · Methods of Preparation of Amines" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="1. Standard Synthesis Pathways" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Reductions of Nitrogenous Groups</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Nitro Compounds Reduction:</strong> <InlineMath math="\text{R-NO}_2" /> reduced with <InlineMath math="\text{Fe/HCl}" /> or <InlineMath math="\text{Sn/HCl}" /> or catalytic hydrogenation. <strong className="text-white">Fe/HCl is preferred</strong> because <InlineMath math="\text{FeCl}_2" /> gets hydrolyzed to release HCl, minimizing starting acid requirements.</li>
                <li><strong>Nitriles Reduction:</strong> Reduced cleanly using <InlineMath math="\text{LiAlH}_4" /> or sodium in ethanol (Mendius Reaction) to yield primary amines.</li>
                <li><strong>Amides Reduction:</strong> Amides treated with <InlineMath math="\text{LiAlH}_4" /> yield amines with the exact same carbon count.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Alkylation & Ammonolysis</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Ammonolysis of Halides:</strong> Reaction of alkyl halide with ethanolic ammonia. Proceeds via nucleophilic substitution (<InlineMath math="\text{S}_\text{N}2" />).</li>
                <li><strong>Yield mixture:</strong> Yields a mixture of 1°, 2°, 3° amines and quaternary ammonium salts. Excess ammonia favors 1° amine formation.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. High-Yield Named Syntheses" color="amber" />
          
          {/* Gabriel Phthalimide Synthesis */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-3">
            <span className="font-bold text-white block text-sm">Gabriel Phthalimide Synthesis (Pure 1° Aliphatic Amines Only)</span>
            <p className="leading-relaxed">
              Phthalimide is treated with KOH to form potassium phthalimide. This strong nitrogen nucleophile attacks an alkyl halide in an <InlineMath math="\text{S}_\text{N}2" /> reaction to form N-alkylphthalimide, which is hydrolyzed to form a pure primary amine.
            </p>
            <div className="p-3 bg-black/45 rounded-xl font-mono text-cyan-300 text-xs text-center">
              {"Phthalimide + KOH ➔ Potassium Phthalimide + R-X ➔ N-Alkylphthalimide ➔ (NaOH aq.) ➔ Pure 1° Amine"}
            </div>
            <WarningCard title="Critical Gabriel Trap">
              {"Aromatic primary amines (Aniline) cannot be prepared by Gabriel Phthalimide synthesis because aryl halides do not undergo nucleophilic substitution (S_N2) with the sterically hindered phthalimide anion under normal synthesis conditions."}
            </WarningCard>
          </div>

          {/* Hoffmann Bromamide Degradation */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-3">
            <span className="font-bold text-white block text-sm">Hoffmann Bromamide Degradation (Step-Down Primary Amines)</span>
            <p className="leading-relaxed">
              Treatment of an amide with bromine in aqueous or ethanolic sodium hydroxide solution results in migration of the alkyl/aryl group from carbonyl carbon to nitrogen, yielding a primary amine with <strong className="text-white">exactly one less carbon</strong>.
            </p>
            <div className="p-3 bg-black/45 rounded-xl font-mono text-cyan-300 text-xs text-center">
              {"R-CONH₂ + Br₂ + 4 NaOH ➔ R-NH₂ + Na₂CO₃ + 2 NaBr + 2 H₂O"}
            </div>
            <ProTip>
              {"The rate-determining step in Hoffmann degradation is the migration of the alkyl/aryl group to the electron-deficient nitrogen atom of the isocyanate intermediate. The configuration of the migrating chiral center is completely retained!"}
            </ProTip>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: PHYSICAL PROPERTIES & BOILING POINTS ───────────────── */}
      <Collapsible title="3 · Physical Properties of Amines" icon={<TrendingUp className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="Hydrogen Bonding, Boiling Point & Solubility Trends" color="emerald" />
          <p className="leading-relaxed">
            Primary and secondary amines can form intermolecular hydrogen bonds due to the polar N-H bonds. Tertiary amines do not have hydrogen atoms bonded to nitrogen, preventing self-association.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-emerald-400 block uppercase text-xs">Boiling Point Hierarchy</span>
              Due to intermolecular hydrogen bonding (which is stronger with more H-atoms on Nitrogen):
              <div className="font-mono text-emerald-300 text-xs my-1.5">
                {"Primary Amines (1°) > Secondary Amines (2°) > Tertiary Amines (3°)"}
              </div>
              For isomeric amines, tertiary amines have the lowest boiling point because they lack hydrogen bonding.
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Solubility & Odor</span>
              Lower aliphatic amines are highly soluble in water due to hydrogen bonding with water molecules.
              <span className="block mt-1">Odor: Methylamine and ethylamine have sharp, fishy ammonia-like odors.</span>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: BASICITY & CHEMICAL REACTIONS ──────────────────────── */}
      <Collapsible title="4 · Basicity & Chemical Reactions of Amines" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          <SectionBanner label="1. Basicity Comparison Framework" color="violet" />
          <p className="leading-relaxed">
            Amines are basic due to the presence of a lone pair of electrons on nitrogen. The basicity depends heavily on inductive effects (+I), solvation stabilization of conjugate cations, and steric hindrance around the nitrogen.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Gas Phase Basicity</span>
              In gas phase (governed purely by electronic inductive effects):
              <div className="font-mono text-cyan-300 text-[12px] my-1 font-bold">
                {"3° > 2° > 1° > NH₃"}
              </div>
              Alkyl groups (+I effect) release electron density onto nitrogen.
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Aqueous Methyl Order</span>
              In water (Interplay of +I, solvation, and steric effects):
              <div className="font-mono text-rose-300 text-[12px] my-1 font-bold">
                {"2° > 1° > 3° > NH₃"}
              </div>
              <InlineMath math="\text{Me}_2\text{NH} > \text{MeNH}_2 > \text{Me}_3\text{N} > \text{NH}_3" />
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block uppercase text-xs">Aqueous Ethyl Order</span>
              In water (Ethyl grouping steric factor):
              <div className="font-mono text-amber-300 text-[12px] my-1 font-bold">
                {"2° > 3° > 1° > NH₃"}
              </div>
              <InlineMath math="\text{Et}_2\text{NH} > \text{Et}_3\text{N} > \text{EtNH}_2 > \text{NH}_3" />
            </div>
          </div>

          <WarningCard title="Aromatic Amine Basicity (Aniline)">
            {"Aniline is a much weaker base than ammonia (pKb of aniline is 9.42, ammonia is 4.75). The lone pair of electrons on nitrogen is delocalized into the benzene ring by resonance (+M effect), making it less available for protonation. Furthermore, aniline conjugate acid (anilinium ion) is less resonance stabilized than aniline itself."}
          </WarningCard>

          <SectionBanner label="2. Key Distinguishing Diagnostic Reactions" color="violet" />
          <ul className="list-disc pl-4 space-y-3 text-white/60">
            <li>
              <strong>Carbylamine Reaction (Primary Amines only):</strong> 1° aliphatic and aromatic amines heated with chloroform (<InlineMath math="\text{CHCl}_3" />) and alcoholic KOH form highly offensive, foul-smelling <strong className="text-white">isocyanides (carbylamines)</strong>.
              <div className="font-mono text-rose-300 text-[11px] mt-1">
                {"R-NH₂ + CHCl₃ + 3 KOH ➔ R-NC (foul smell) + 3 KCl + 3 H₂O"}
              </div>
            </li>
            <li>
              <strong>Reaction with Nitrous Acid (HNO₂):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>1° Aliphatic:</strong> Reacts to form highly unstable diazonium salt, which decomposes instantly to give off nitrogen gas bubbles (<InlineMath math="\text{N}_2\uparrow" />) and a mixture of alcohols.</li>
                <li><strong>1° Aromatic:</strong> Form stable diazonium salts at cold temperatures (0-5°C).</li>
                <li><strong>2° Amines:</strong> Form yellow oily insolubles called N-nitrosamines.</li>
                <li><strong>3° Amines:</strong> Form soluble nitrite salts.</li>
              </ul>
            </li>
            <li>
              <strong>Hinsberg Test (Separation of 1°, 2°, 3° Amines):</strong> Uses Benzenesulfonyl chloride (<InlineMath math="\text{C}_6\text{H}_5\text{SO}_2\text{Cl}" />) in excess NaOH:
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Primary Amine:</strong> Yields a sulfonamide containing an acidic N-H proton, which dissolves completely in NaOH (clear solution).</li>
                <li><strong>Secondary Amine:</strong> Yields a sulfonamide containing no acidic protons, remaining insoluble as a solid precipitate.</li>
                <li><strong>Tertiary Amine:</strong> Does not react; remains soluble in acidic wash.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="3. Ring Activation & Electrophilic Substitution of Aniline" color="violet" />
          <p className="leading-relaxed">
            The amino group (-NH₂) is highly activating and ortho/para-directing due to resonance donation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Direct Halogenation</span>
              Aniline reacts instantly with bromine water to give a white precipitate of **2,4,6-tribromoaniline** with loss of bromine color. No catalyst is required because of the strong activation.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Monohalogenation Protection Route</span>
              To prepare mono-substituted p-bromoaniline: first react aniline with acetic anhydride in pyridine. The resulting **acetanilide** has a less activating amide group (lone pair is delocalized into the acetyl carbonyl group). Bromination yields p-bromoacetanilide, which is hydrolyzed to yield p-bromoaniline.
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 5: DIAZONIUM SALTS PREPARATION & REACTIONS ────────────── */}
      <Collapsible title="5 · Diazonium Salts: Preparation & Synthetic utility" icon={<Workflow className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="1. Preparation via Diazotization" color="rose" />
          <p className="leading-relaxed">
            Aromatic primary amines (Aniline) react with nitrous acid (generated in-situ from <InlineMath math="\text{NaNO}_2" /> and <InlineMath math="\text{HCl}" />) at strictly <strong className="text-white">0-5°C</strong> to form stable diazonium salts:
          </p>
          <div className="p-3 bg-black/45 rounded-xl font-mono text-rose-300 text-xs text-center">
            {"C₆H₅NH₂ + NaNO₂ + 2 HCl ➔ (0 - 5°C) ➔ C₆H₅N₂⁺Cl⁻ + NaCl + 2 H₂O"}
          </div>
          <WarningCard title="Temperature Control is Critical">
            {"If the diazotization reaction mixture rises above 10°C, the diazonium salt is rapidly hydrolyzed by water to form Phenol, releasing nitrogen gas."}
          </WarningCard>

          <SectionBanner label="2. Substitution Reactions of Diazonium (Loss of Nitrogen)" color="rose" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Reaction Name / Target</th>
                  <th className="p-3">Reagents & Conditions</th>
                  <th className="p-3 text-cyan-400">Chemical Equation / Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-sans">
                <tr>
                  <td className="p-3 font-bold text-white">Sandmeyer Reaction (-Cl, -Br, -CN)</td>
                  <td className="p-3">CuCl/HCl, CuBr/HBr, or CuCN/KCN</td>
                  <td className="p-3 font-mono text-xs">{"C₆H₅N₂⁺Cl⁻ + CuCl ➔ C₆H₅Cl + N₂↑ (high yield)"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Gattermann Reaction</td>
                  <td className="p-3">Copper powder in HCl or HBr</td>
                  <td className="p-3 font-mono text-xs">{"C₆H₅N₂⁺Cl⁻ + Cu/HCl ➔ C₆H₅Cl + N₂↑ (lower yield)"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Iodination</td>
                  <td className="p-3">Warm with aqueous Potassium Iodide (KI)</td>
                  <td className="p-3 font-mono text-xs">{"C₆H₅N₂⁺Cl⁻ + KI ➔ C₆H₅I + N₂↑ + KCl (no catalyst needed)"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Schiemann Reaction (-F)</td>
                  <td className="p-3">HBF₄ followed by dry heating</td>
                  <td className="p-3 font-mono text-xs">{"C₆H₅N₂⁺Cl⁻ + HBF₄ ➔ C₆H₅N₂⁺BF₄⁻ ➔ (Heat) ➔ C₆H₅F + BF₃ + N₂"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Deamination (Reduction to Benzene)</td>
                  <td className="p-3">Hypophosphorous acid (H₃PO₂) or Ethanol</td>
                  <td className="p-3 font-mono text-xs">{"C₆H₅N₂⁺Cl⁻ + H₃PO₂ + H₂O ➔ C₆H₅H + N₂ + H₃PO₃ + HCl"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Hydrolysis to Phenol</td>
                  <td className="p-3">Warming with water or dilute acid</td>
                  <td className="p-3 font-mono text-xs">{"C₆H₅N₂⁺Cl⁻ + H₂O ➔ C₆H₅OH + N₂↑ + HCl"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Coupling Reactions (Retention of Nitrogen)" color="rose" />
          <ul className="list-disc pl-4 space-y-2 text-white/60">
            <li>
              <strong>Coupling with Phenol:</strong> Diazonium salt reacts with phenol in a weakly alkaline medium (pH 9-10) to form p-hydroxyazobenzene, which is an <strong className="text-white">orange dye</strong>.
            </li>
            <li>
              <strong>Coupling with Aniline:</strong> Diazonium salt reacts with aniline in a weakly acidic medium (pH 5-6) to form p-aminoazobenzene, which is a <strong className="text-white">yellow dye</strong>.
            </li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 6: INTERACTIVE AMINE & DIAZONIUM LAB SIMULATOR ────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            6 · Interactive Amine Identification Lab & Reaction Predictor
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select an amine or diazonium substrate and a diagnostic chemical reagent to evaluate reaction outcomes, intermediate steps, and key IAT traps.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Substrate Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Nitrogen Substrate</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSubstrate('prim_aliph')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'prim_aliph' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Ethylamine (1° Aliphatic Amine)
                </button>
                <button 
                  onClick={() => setSubstrate('sec_aliph')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'sec_aliph' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Diethylamine (2° Aliphatic Amine)
                </button>
                <button 
                  onClick={() => setSubstrate('tert_aliph')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'tert_aliph' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Triethylamine (3° Aliphatic Amine)
                </button>
                <button 
                  onClick={() => setSubstrate('prim_arom')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'prim_arom' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Aniline (1° Aromatic Amine)
                </button>
                <button 
                  onClick={() => setSubstrate('diazonium')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'diazonium' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Benzene Diazonium Chloride
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Reagent / Test Method</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'hinsberg', label: 'Hinsberg Reagent (PhSO₂Cl + NaOH)' },
                  { id: 'nitrous', label: 'Nitrous Acid (NaNO₂ + HCl @ 0-5°C)' },
                  { id: 'carbylamine', label: 'Carbylamine Test (CHCl₃ + KOH)' },
                  { id: 'bromine_water', label: 'Bromine Water (Aromatic Ring)' },
                  { id: 'azo_coupling', label: 'Azo Coupling (with Phenol/Alkali)' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setReagent(r.id as any)}
                    className={`p-2 rounded-lg border text-left text-xs font-bold transition ${reagent === r.id ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Output Screen */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4 text-[13px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Analysis Lab Screen</span>
              <span className="text-xs font-mono text-cyan-400">Status: Output Ready</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Reaction Outcome</span>
                  <span className={`text-base font-bold font-display ${sim.color}`}>{sim.outcome}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Visual Observation</span>
                  <span className="text-white font-semibold">{sim.visualEffect}</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Major Product(s)</span>
                  <span className="text-white font-mono font-semibold">{sim.product}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-left leading-relaxed text-white/70">
              <strong className="text-cyan-400 block mb-1">Reaction Mechanism:</strong>
              {sim.explanation}
            </div>

            <div className="p-3.5 bg-rose-500/5 border border-rose-500/10 rounded-xl text-left leading-relaxed text-white/70">
              <strong className="text-rose-400 block mb-1">IAT Trap Warning:</strong>
              {renderBoldText(sim.trap)}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION 7: SOLVED PROBLEMS ────────────────────────────────────── */}
      <Collapsible title="7 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Basicity order comparison</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Arrange the following in decreasing order of basic strength in aqueous solution: Methylamine, Dimethylamine, Trimethylamine, Ammonia."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-sans text-[13px] text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. In water, basic strength is determined by the combined effect of inductive effect (+I), solvation stabilization, and steric hindrance."}</div>
              <div>{"2. For methyl substituted amines, the correct decreasing basicity sequence is 2° > 1° > 3° > NH₃."}</div>
              <div>{"3. Dimethylamine (pK_b = 3.27) is the strongest base. Trimethylamine (pK_b = 4.22) is weaker than methylamine (pK_b = 3.38) due to steric hindrance inhibiting protonation."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs">Answer: Dimethylamine &gt; Methylamine &gt; Trimethylamine &gt; Ammonia</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Hinsberg Separation Logic</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An organic compound (A) with molecular formula C₃H₉N reacts with benzenesulfonyl chloride to form a solid precipitate insoluble in aqueous NaOH. Identify the compound."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-sans text-[13px] text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The formula C₃H₉N represents an amine with 3 carbons."}</div>
              <div>{"2. Since the compound reacts with Hinsberg reagent to form a precipitate that is completely insoluble in NaOH, it must be a secondary amine."}</div>
              <div>{"3. Primary amines yield sulfonamides that dissolve in NaOH. Tertiary amines do not react at all."}</div>
              <div>{"4. A 3-carbon secondary amine is N-Methylethanamine (Ethylmethylamine)."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs">Answer: N-Methylethanamine [CH₃-NH-C₂H₅]</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Gabriel Phthalimide Constraint</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why is Gabriel Phthalimide synthesis unsuitable for preparing Aniline?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-sans text-[13px] text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Gabriel phthalimide synthesis requires nucleophilic attack of phthalimide anion on an alkyl halide via an S_N2 mechanism."}</div>
              <div>{"2. Preparing aniline would require chlorobenzene or bromobenzene as substrate."}</div>
              <div>{"3. Aryl halides do not undergo nucleophilic substitution (S_N2) easily because of partial double bond character of the C-X bond (resonance) and steric blocking of the ring."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs">Answer: Aryl halides cannot undergo the necessary S_N2 attack by phthalimide anion.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 8: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="8 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Amines and Diazonium Chemistry with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following amines does NOT react with benzenesulfonyl chloride (Hinsberg reagent)?',
                a: 'Methylamine',
                b: 'Dimethylamine',
                c: 'Trimethylamine',
                d: 'Aniline',
                ans: 'Correct Answer: C. Trimethylamine is a tertiary amine. Lacking a hydrogen atom bonded to nitrogen, it cannot undergo substitution with benzenesulfonyl chloride.'
              },
              {
                q: 'Hoffmann bromamide degradation of benzamide yields:',
                a: 'Benzylamine',
                b: 'Aniline',
                c: 'Benzonitrile',
                d: 'Methylamine',
                ans: 'Correct Answer: B. Hoffmann degradation of benzamide (C₆H₅CONH₂) yields aniline (C₆H₅NH₂), which has exactly one less carbon atom.'
              },
              {
                q: 'The gaseous phase basicity sequence of methyl-substituted amines is:',
                a: '2° > 1° > 3° > NH₃',
                b: '3° > 2° > 1° > NH₃',
                c: '2° > 3° > 1° > NH₃',
                d: '1° > 2° > 3° > NH₃',
                ans: 'Correct Answer: B. In the gaseous phase, there are no hydration or steric hindrances, so the basicity follows the pure electronic +I inductive effect of alkyl groups: 3° > 2° > 1° > NH₃.'
              },
              {
                q: 'Bromination of aniline with bromine water yields:',
                a: 'p-Bromoaniline',
                b: 'o-Bromoaniline',
                c: '2,4,6-Tribromoaniline',
                d: 'Benzonitrile',
                ans: 'Correct Answer: C. Direct reaction of aniline with bromine water yields 2,4,6-tribromoaniline as a white precipitate, owing to the extremely high activation of the ring by the -NH₂ group.'
              },
              {
                q: 'Which of the following forms a yellow oily nitrosamine upon treatment with NaNO₂/HCl?',
                a: 'Aniline',
                b: 'Diethylamine',
                c: 'Ethylamine',
                d: 'Triethylamine',
                ans: 'Correct Answer: B. Secondary amines (like Diethylamine) react with nitrous acid to yield stable N-nitrosamines which separate as yellow oily layers.'
              },
              {
                q: 'The Sandmeyer reaction converts benzenediazonium chloride to chlorobenzene using:',
                a: 'Cu / HCl',
                b: 'CuCl / HCl',
                c: 'Cu₂Cl₂ / H₂O',
                d: 'SnCl₂ / HCl',
                ans: 'Correct Answer: B. The Sandmeyer reaction uses cuprous chloride (CuCl or Cu₂Cl₂) in hydrochloric acid to replace the diazonium group.'
              },
              {
                q: 'The coupling reaction of benzene diazonium chloride with phenol yields a:',
                a: 'Yellow dye',
                b: 'Orange dye',
                c: 'Red precipitate',
                d: 'Colorless compound',
                ans: 'Correct Answer: B. Coupling with phenol in alkaline medium yields p-hydroxyazobenzene, which is a bright orange azo dye.'
              },
              {
                q: 'Fluorobenzene is prepared from benzene diazonium chloride by reacting with HBF₄ followed by heating. This reaction is named:',
                a: 'Sandmeyer Reaction',
                b: 'Gattermann Reaction',
                c: 'Schiemann Reaction',
                d: 'Finkelstein Reaction',
                ans: 'Correct Answer: C. The conversion of diazonium salt to fluorobenzene via diazonium fluoroborate intermediate is the Balz-Schiemann reaction.'
              },
              {
                q: 'Which of the following compounds is the weakest base?',
                a: 'Methanamine',
                b: 'Dimethylamine',
                c: 'Benzenamine (Aniline)',
                d: 'Ammonia',
                ans: 'Correct Answer: C. Aniline (benzenamine) is the weakest base because the nitrogen lone pair is delocalized into the aromatic ring by resonance, reducing its basic availability.'
              },
              {
                q: 'Benzene diazonium chloride reacts with hypophosphorous acid (H₃PO₂) to yield:',
                a: 'Phenol',
                b: 'Benzene',
                c: 'Chlorobenzene',
                d: 'Aniline',
                ans: 'Correct Answer: B. H₃PO₂ acts as a reducing agent, converting benzenediazonium chloride to benzene while being oxidized itself to phosphorous acid (H₃PO₃).'
              }
            ].map((test, index) => (
              <div key={index} className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">{index + 1}</span>
                  <span className="text-white font-bold text-xs sm:text-sm">{test.q}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[13px] text-white/60">
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
          className="text-[13px] text-white/50 hover:text-white transition flex items-center gap-1.5 font-sans"
        >
          ← Back to Dashboard
        </button>
        <span className="text-[11px] text-white/30 font-mono">Organic Compounds Containing Nitrogen · Unit 13</span>
      </div>

    </div>
  );
}
