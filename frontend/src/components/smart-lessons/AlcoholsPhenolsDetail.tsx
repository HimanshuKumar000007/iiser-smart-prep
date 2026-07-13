import React, { useState } from 'react';
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

export default function AlcoholsPhenolsDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [substrate, setSubstrate] = useState<'1' | '2' | '3' | 'phenol' | 'ether_simple' | 'ether_mixed'>('1');
  const [testReagent, setTestReagent] = useState<'lucas' | 'victor' | 'fecl3' | 'na' | 'naoh' | 'dichromate_pcc' | 'hi'>('lucas');

  // Simulator Logic
  const getSimulatorOutcome = () => {
    if (substrate === 'ether_simple' || substrate === 'ether_mixed') {
      if (testReagent === 'hi') {
        const isMixed = substrate === 'ether_mixed';
        return {
          outcome: 'Ether Cleavage occurred',
          color: 'text-emerald-400',
          visualEffect: 'Colorless solution clears, yielding alkyl halide(s).',
          product: isMixed ? 't-Butyl iodide + Methanol (S_N1)' : 'Ethyl iodide + Ethanol (S_N2)',
          explanation: 'Ethers are cleaved by strong acids. For Mixed Ethers containing a tertiary alkyl group (t-butyl methyl ether), protonation of oxygen is followed by C-O cleavage via S_N1 mechanism to form the highly stable t-butyl carbocation, yielding t-butyl iodide. In simple ethers (diethyl ether), it follows S_N2 mechanism, attacking the smaller/less hindered group.',
          trap: 'Cleavage with HI follows S_N1 only if a stable 3° carbocation can be formed. Otherwise, the halide attacks the smaller alkyl group via S_N2.'
        };
      }
      if (testReagent === 'fecl3' || testReagent === 'lucas' || testReagent === 'na' || testReagent === 'naoh' || testReagent === 'dichromate_pcc') {
        return {
          outcome: 'No Reaction / Inert',
          color: 'text-rose-400',
          visualEffect: 'No observable change (solution remains clear).',
          product: 'None',
          explanation: 'Ethers are chemically stable and lack acidic protons or oxidizable functional groups. They fail to react with sodium, NaOH, Lucas reagent, neutral FeCl₃, or moderate oxidants like chromic acid.',
          trap: 'Ethers are highly flammable and slowly absorb oxygen from air to form explosive peroxides: R-O-CH₂-R + O₂ → R-O-CH(OOH)-R. Stored in dark brown bottles to prevent radical generation.'
        };
      }
    }

    if (substrate === 'phenol') {
      if (testReagent === 'fecl3') {
        return {
          outcome: 'Violet / Purple Complex Formed',
          color: 'text-violet-400',
          visualEffect: 'Instant change to a deep, dark violet-purple color.',
          product: 'Iron-Phenolate Coordination Complex [Fe(OC₆H₅)₆]³⁻',
          explanation: 'Phenols react with neutral FeCl₃ solution to form a characteristic violet-colored coordination complex. This is the primary qualitative test to distinguish phenols from alcohols.',
          trap: 'Alcohols do NOT react with neutral FeCl₃. This is a very frequent qualitative analysis question in the IAT!'
        };
      }
      if (testReagent === 'na') {
        return {
          outcome: 'Effervescence (Hydrogen Gas)',
          color: 'text-emerald-400',
          visualEffect: 'Vigorous bubbling and evolution of colorless, odorless gas.',
          product: 'Sodium Phenoxide (C₆H₅ONa) + H₂↑',
          explanation: 'Phenols are acidic enough to react with sodium metal, releasing hydrogen gas and forming sodium phenoxide.',
          trap: 'Both alcohols and phenols react with sodium metal to release H₂. Thus, Na metal test cannot be used to distinguish alcohols from phenols.'
        };
      }
      if (testReagent === 'naoh') {
        return {
          outcome: 'Sodium Phenoxide salt (Soluble)',
          color: 'text-cyan-400',
          visualEffect: 'Phenol dissolves readily in aqueous sodium hydroxide.',
          product: 'Sodium Phenoxide (C₆H₅ONa) + H₂O',
          explanation: 'Phenols are moderately acidic (pK_a ≈ 10) due to resonance stabilization of the phenoxide ion. They are acidic enough to react with bases like NaOH.',
          trap: 'Alcohols (except methanol slightly) are weaker acids than water and do NOT react with aqueous NaOH. This serves as a key distinction!'
        };
      }
      if (testReagent === 'lucas' || testReagent === 'victor') {
        return {
          outcome: 'No Reaction / Fails Test',
          color: 'text-rose-400',
          visualEffect: 'No turbidity or color complex formed.',
          product: 'None',
          explanation: 'Phenols do not undergo nucleophilic substitution under standard room temperature conditions. The C-O bond has partial double bond character due to resonance, preventing cleavage.',
          trap: 'Lucas test only applies to aliphatic alcohols where C-O cleavage can yield a stable carbocation or transition state.'
        };
      }
      if (testReagent === 'dichromate_pcc') {
        return {
          outcome: 'Dark colored oxidation mixture',
          color: 'text-amber-400',
          visualEffect: 'Solution turns dark brown/black.',
          product: 'p-Benzoquinone',
          explanation: 'Under strong oxidants (Na₂Cr₂O₇/H₂SO₄), phenol is oxidized to p-benzoquinone (conjugated diketone). PCC does not react cleanly.',
          trap: 'Phenol oxidation yields benzoquinone, which destroys the aromatic ring. To reduce phenol back to benzene, distil with zinc dust: C₆H₅OH + Zn → C₆H₆ + ZnO.'
        };
      }
    }

    // Alcohols Logic
    if (testReagent === 'lucas') {
      const outcomes = {
        '1': { text: 'No Turbidity at room temp', color: 'text-rose-400', effect: 'Solution remains completely clear at room temperature. Turbidity appears only on prolonged heating.', prod: 'Primary Alkyl Chloride (sluggish S_N2)' },
        '2': { text: 'Turbidity in 5 minutes', color: 'text-amber-400', effect: 'Slight cloudiness/separation of organic layer appears within 3-5 minutes.', prod: 'Secondary Alkyl Chloride' },
        '3': { text: 'Immediate Turbidity', color: 'text-emerald-400', effect: 'Instant cloudiness and phase separation at room temperature.', prod: 'Tertiary Alkyl Chloride (instant S_N1)' }
      };
      return {
        outcome: outcomes[substrate as '1'|'2'|'3'].text,
        color: outcomes[substrate as '1'|'2'|'3'].color,
        visualEffect: outcomes[substrate as '1'|'2'|'3'].effect,
        product: outcomes[substrate as '1'|'2'|'3'].prod,
        explanation: 'Lucas reagent (conc. HCl + anhydrous ZnCl₂) operates via carbocation intermediate stability. 3° alcohols form a stable 3° carbocation instantly (S_N1). 2° alcohols take 5 minutes. 1° alcohols cannot form stable 1° carbocations and do not react at room temperature.',
        trap: 'Anhydrous ZnCl₂ acts as a Lewis acid catalyst, coordinating with oxygen to make the -OH group a better leaving group.'
      };
    }

    if (testReagent === 'victor') {
      const outcomes = {
        '1': { text: 'Blood Red Color', color: 'text-rose-500', effect: 'Solution turns brilliant cherry/blood red upon addition of alkali.', prod: 'Nitrolic Acid salt (soluble red anion)' },
        '2': { text: 'Blue Color', color: 'text-blue-400', effect: 'Solution turns deep blue.', prod: 'Pseudonitrole (soluble blue monomer)' },
        '3': { text: 'Colorless / No Reaction', color: 'text-zinc-400', effect: 'Solution remains clear and colorless.', prod: 'None (no alpha-hydrogen present)' }
      };
      return {
        outcome: outcomes[substrate as '1'|'2'|'3'].text,
        color: outcomes[substrate as '1'|'2'|'3'].color,
        visualEffect: outcomes[substrate as '1'|'2'|'3'].effect,
        product: outcomes[substrate as '1'|'2'|'3'].prod,
        explanation: 'Victor Meyer Test sequences: R-OH → (P+I₂) → R-I → (AgNO₂) → R-NO₂ → (HNO₂) → Nitrolic acid/Pseudonitrole → (NaOH) → Colored salt. 1° yields nitrolic acid (has 2 α-H), forming a red sodium salt. 2° yields pseudonitrole (has 1 α-H), which is blue. 3° has no α-H, hence fails to react with HNO₂.',
        trap: 'Remember the acronym: **R-B-W** (Red for 1°, Blue for 2°, White/Colorless for 3°).'
      };
    }

    if (testReagent === 'fecl3' || testReagent === 'naoh') {
      return {
        outcome: 'No Reaction',
        color: 'text-rose-400',
        visualEffect: 'No color change or dissolution occurs.',
        product: 'None',
        explanation: 'Alcohols are weaker acids than water. They do not react with aqueous bases like NaOH or coordinate with neutral FeCl₃.',
        trap: 'Methanol has a pK_a of 15.5, which is close to water (15.7), but still fails to react with NaOH in standard aqueous medium.'
      };
    }

    if (testReagent === 'na') {
      return {
        outcome: 'Hydrogen Gas Released (Slow to Moderate)',
        color: 'text-emerald-400',
        visualEffect: 'Steady bubbling of colorless gas. Reacts slower than phenols.',
        product: 'Sodium Alkoxide (R-ONa) + H₂↑',
        explanation: 'Alcohols react with active metals like sodium to form alkoxides and hydrogen gas. Reactivity order: 1° > 2° > 3° (due to steric hindrance at the -OH proton interface).',
        trap: 'Water reacts much more vigorously with Na than alcohols do. Grignard reagents are destroyed by alcohols: RMgX + ROH → RH + Mg(OR)X.'
      };
    }

    if (testReagent === 'dichromate_pcc') {
      const outcomes = {
        '1': { text: 'Oxidation to Carboxylic Acid / Aldehyde', color: 'text-cyan-400', effect: 'Dichromate turns from orange to green (Cr³⁺). PCC yields aldehyde cleanly.', prod: 'Aldehyde (with PCC) / Carboxylic Acid (with Dichromate)' },
        '2': { text: 'Oxidation to Ketone', color: 'text-amber-400', effect: 'Dichromate turns from orange to green. PCC also yields ketone.', prod: 'Ketone (R-CO-R\')' },
        '3': { text: 'Resists Oxidation (No Reaction)', color: 'text-rose-400', effect: 'No color change with PCC. Hot acidic dichromate causes dehydration to alkene instead.', prod: 'None / Alkene under dehydrating conditions' }
      };
      return {
        outcome: outcomes[substrate as '1'|'2'|'3'].text,
        color: outcomes[substrate as '1'|'2'|'3'].color,
        visualEffect: outcomes[substrate as '1'|'2'|'3'].effect,
        product: outcomes[substrate as '1'|'2'|'3'].prod,
        explanation: '1° alcohols oxidize to aldehydes using PCC (pyridinium chlorochromate) or anhydrous CrO₃. Strong oxidants (KMnO₄, K₂Cr₂O₇) oxidize them completely to carboxylic acids. 2° alcohols oxidize to ketones. 3° alcohols lack α-hydrogens, preventing oxidation under normal conditions.',
        trap: 'Carboxylic acids and esters cannot be reduced by weak NaBH₄. They require strong LiAlH₄ to yield 1° alcohols.'
      };
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
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="violet">Alcohols, Phenols & Ethers</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Alcohols, Phenols & <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Ethers</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Comprehensive review of oxygen-containing functional groups. This chapter covers acidity trends, qualitative tests (Lucas, Victor Meyer, FeCl₃), substitution-elimination competition, and detailed name reactions for the IAT.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: CLASSIFICATION & STRUCTURE ─────────────────────────── */}
      <Collapsible title="1 · Classification & Molecular Structure" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            Alcohols and phenols are classified based on the hybridization state of the carbon bonded to the hydroxyl (-OH) group, and the number of -OH substituents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            {/* Classification Card */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">C–OH Classification Categories</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>C(sp³)–OH Alcohols:</strong> Alkyl alcohols sub-classified into Primary (1°), Secondary (2°), and Tertiary (3°). Also includes Allylic (adjacent to C=C) and Benzylic (adjacent to benzene ring) systems.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>C(sp²)–OH Compounds:</strong> Vinylic alcohols (enol forms) and Phenols where the -OH group is bonded directly to an sp² hybridized carbon of the aromatic ring.
                  </div>
                </li>
              </ul>
            </div>

            {/* Structure Card */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Functional Group Geometries</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Alcohols (C-O-H angle ≈ 108.9°):</strong> Slightly smaller than the tetrahedral angle (109°28\') due to steric repulsion between oxygen\'s unshared lone pairs.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Phenols (C-O bond length ≈ 136 pm):</strong> Shorter than in methanol (142 pm) due to: (i) partial double-bond character from resonance conjugation, and (ii) sp² hybridization of the ring carbon holding oxygen.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Ethers (R-O-R angle ≈ 111.7°):</strong> Slightly larger than tetrahedral due to strong steric repulsion between the two bulky alkyl parent groups.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: NOMENCLATURE & COMMON NAMES ───────────────────────── */}
      <Collapsible title="2 · Nomenclature & Naming Systems" icon={<ClipboardList className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="IUPAC Rules & Common Systems" color="emerald" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            In IUPAC nomenclature: Alcohols use the suffix <strong className="text-white">-ol</strong> (e.g. Ethanol, Propan-2-ol). Ethers are named as <strong className="text-white">alkoxyalkanes</strong>, where the larger alkyl group serves as the parent alkane chain (e.g. Methoxyethane). Phenols are treated as benzene derivatives with <strong className="text-white">-phenol</strong> as parent (e.g. 2-Methylphenol).
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Structure</th>
                  <th className="p-3">Common Name</th>
                  <th className="p-3">IUPAC Name</th>
                  <th className="p-3">Structural Context / Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-sans">
                <tr>
                  <td className="p-3 font-mono">CH₃-CH(OH)-CH₃</td>
                  <td className="p-3">Isopropyl alcohol</td>
                  <td className="p-3 font-semibold text-emerald-400">Propan-2-ol</td>
                  <td className="p-3 text-white/60">Secondary (2°) Alcohol</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">(CH₃)₃C-OH</td>
                  <td className="p-3">tert-Butyl alcohol</td>
                  <td className="p-3 font-semibold text-emerald-400">2-Methylpropan-2-ol</td>
                  <td className="p-3 text-white/60">Tertiary (3°) Alcohol</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">CH₂=CH-CH₂-OH</td>
                  <td className="p-3">Allyl alcohol</td>
                  <td className="p-3 font-semibold text-emerald-400">Prop-2-en-1-ol</td>
                  <td className="p-3 text-white/60">Allylic Alcohol</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">o-CH₃-C₆H₄-OH</td>
                  <td className="p-3">o-Cresol</td>
                  <td className="p-3 font-semibold text-emerald-400">2-Methylphenol</td>
                  <td className="p-3 text-white/60">Phenol Derivative (Cresol)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">C₆H₄(OH)₂ (1,2)</td>
                  <td className="p-3">Catechol</td>
                  <td className="p-3 font-semibold text-emerald-400">Benzene-1,2-diol</td>
                  <td className="p-3 text-white/60">Dihydric Phenol</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">C₆H₄(OH)₂ (1,3)</td>
                  <td className="p-3">Resorcinol</td>
                  <td className="p-3 font-semibold text-emerald-400">Benzene-1,3-diol</td>
                  <td className="p-3 text-white/60">Dihydric Phenol</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">C₆H₄(OH)₂ (1,4)</td>
                  <td className="p-3">Quinol / Hydroquinone</td>
                  <td className="p-3 font-semibold text-emerald-400">Benzene-1,4-diol</td>
                  <td className="p-3 text-white/60">Dihydric Phenol</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">CH₃-O-CH₂-CH₃</td>
                  <td className="p-3">Ethyl methyl ether</td>
                  <td className="p-3 font-semibold text-emerald-400">Methoxyethane</td>
                  <td className="p-3 text-white/60">Simple Alkyl Ether</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">C₆H₅-O-CH₃</td>
                  <td className="p-3">Anisole</td>
                  <td className="p-3 font-semibold text-emerald-400">Methoxybenzene</td>
                  <td className="p-3 text-white/60">Aryl Alkyl Ether</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono">C₆H₅-O-CH₂-CH₃</td>
                  <td className="p-3">Phenetole</td>
                  <td className="p-3 font-semibold text-emerald-400">Ethoxybenzene</td>
                  <td className="p-3 text-white/60">Aryl Alkyl Ether</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProTip>
            <strong className="text-cyan-400">Carbinol System:</strong> A classic nomenclature system where methyl alcohol is called 'Carbinol' (CH₃OH). Substituents attached to the carbon holding the -OH group are prefix-named. For example, Isopropyl alcohol (CH₃-CH(OH)-CH₃) is named as <strong className="text-white">Dimethyl carbinol</strong>.
          </ProTip>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: ACिडITY COMPARISON TABLES ────────────────────────────── */}
      <Collapsible title="3 · Relative Acidity & Electronic Effects" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="Acidity Scale & Resonance Stabilization" color="violet" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Phenols are stronger acids than alcohols but weaker than carboxylic acids. The relative acidic order is:
          </p>

          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-white block uppercase tracking-wider">High-Yield Acidity Sequence</span>
            <div className="p-3 bg-black/45 rounded-xl text-center text-sm font-mono text-cyan-300">
              {"Carboxylic Acids >> Phenols >> Water > 1° Alcohols > 2° Alcohols > 3° Alcohols"}
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed">
              <strong>Phenoxide Resonance:</strong> The phenoxide ion (C₆H₅O⁻) is highly stable because the negative charge is delocalized over the ortho and para positions of the benzene ring. While alkoxide ions (R-O⁻) localize negative charge solely on oxygen, making them stronger bases (and weaker conjugate acids).
            </p>
          </div>

          {/* pKa Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Compound Name</th>
                  <th className="p-3">Chemical Formula</th>
                  <th className="p-3 text-cyan-400">pK_a Value</th>
                  <th className="p-3 text-rose-400">Relative Acidic Strength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-mono">
                <tr>
                  <td className="p-3 font-sans">Picric Acid (2,4,6-trinitrophenol)</td>
                  <td className="p-3">(NO₂)₃-C₆H₂-OH</td>
                  <td className="p-3 text-cyan-400">0.38</td>
                  <td className="p-3 text-rose-400">Extremely Strong (comparable to mineral acids)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans">Acetic Acid</td>
                  <td className="p-3">CH₃COOH</td>
                  <td className="p-3 text-cyan-400">4.76</td>
                  <td className="p-3 text-rose-400">Strong Carboxylic Acid</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans">p-Nitrophenol</td>
                  <td className="p-3">p-NO₂-C₆H₄-OH</td>
                  <td className="p-3 text-cyan-400">7.15</td>
                  <td className="p-3 text-rose-400">Highly Acidic (due to -M and -I effects)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans">Phenol</td>
                  <td className="p-3">C₆H₅OH</td>
                  <td className="p-3 text-cyan-400">10.0</td>
                  <td className="p-3 text-rose-400">Moderately Acidic</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans">Water</td>
                  <td className="p-3">H₂O</td>
                  <td className="p-3 text-cyan-400">15.7</td>
                  <td className="p-3 text-rose-400">Neutral Baseline</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans">Methanol</td>
                  <td className="p-3">CH₃OH</td>
                  <td className="p-3 text-cyan-400">15.5</td>
                  <td className="p-3 text-rose-400">Weakly Acidic (more acidic than water)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans">Ethanol</td>
                  <td className="p-3">CH₃CH₂OH</td>
                  <td className="p-3 text-cyan-400">15.9</td>
                  <td className="p-3 text-rose-400">Very Weakly Acidic (due to +I ethyl group)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            {/* EWG effect */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Electron-Withdrawing Groups (EWGs)</span>
              EWGs (like -NO₂, -CN, -Cl) disperse negative charge, stabilizing the phenoxide ion and <strong>increasing acidity</strong>.
              <div className="font-mono text-rose-300 text-[11px] mt-1.5">
                {"Picric Acid > 2,4-dinitrophenol > p-nitrophenol > o-nitrophenol > Phenol"}
              </div>
              *Note:* o-nitrophenol is slightly less acidic than p-nitrophenol due to intramolecular hydrogen bonding, which holds the acidic proton.
            </div>

            {/* EDG effect */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block uppercase text-xs">Electron-Donating Groups (EDGs)</span>
              EDGs (like -CH₃, -OCH₃) intensify the negative charge, destabilizing the phenoxide ion and <strong>decreasing acidity</strong>.
              <div className="font-mono text-amber-300 text-[11px] mt-1.5">
                {"Phenol > o-Cresol > p-Cresol > m-Cresol"}
              </div>
              Alkyl groups decrease acidity via positive inductive (+I) and hyperconjugative effects.
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: RESONANCE SCHEMATICS ────────────────────────────────── */}
      <Collapsible title="4 · Resonance Structures & Molecular Visuals" icon={<Atom className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="Resonance delocalization of Phenoxide Ion" color="rose" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            The negative charge on oxygen in the phenoxide ion is conjugated with the aromatic pi cloud, dispersing negative density to the ortho and para ring carbons. This stabilizes the conjugate base:
          </p>

          {/* SVG Resonance Structures */}
          <div className="p-6 bg-black/45 rounded-2xl border border-white/5 flex flex-col items-center justify-center space-y-4">
            <svg viewBox="0 0 720 180" className="w-full max-w-2xl h-auto text-white">
              {/* Structure 1 */}
              <g transform="translate(10, 10)">
                <polygon points="50,20 85,40 85,80 50,100 15,80 15,40" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="60" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50" y1="20" x2="50" y2="2" stroke="currentColor" strokeWidth="2" />
                <text x="44" y="-3" fill="currentColor" className="text-[11px] font-mono font-bold">O⁻</text>
                <text x="32" y="118" fill="currentColor" className="text-[10px] font-mono">(I)</text>
              </g>

              {/* Arrow 1-2 */}
              <path d="M 110,60 L 140,60" stroke="cyan" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="115" y="52" fill="cyan" className="text-[9px] font-mono">Resonance</text>

              {/* Structure 2 */}
              <g transform="translate(160, 10)">
                <polygon points="50,20 85,40 85,80 50,100 15,80 15,40" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* double bond C=O */}
                <line x1="47" y1="20" x2="47" y2="2" stroke="currentColor" strokeWidth="2" />
                <line x1="53" y1="20" x2="53" y2="2" stroke="currentColor" strokeWidth="2" />
                <text x="44" y="-3" fill="currentColor" className="text-[11px] font-mono font-bold">O</text>
                {/* Double bonds in ring */}
                <line x1="80" y1="43" x2="80" y2="77" stroke="currentColor" strokeWidth="2" />
                <line x1="20" y1="77" x2="48" y2="93" stroke="currentColor" strokeWidth="2" />
                {/* negative charge on ortho */}
                <circle cx="15" cy="40" r="4" fill="cyan" />
                <text x="21" y="38" fill="cyan" className="text-[9px] font-mono font-bold">⁻</text>
                <text x="32" y="118" fill="currentColor" className="text-[10px] font-mono">(II)</text>
              </g>

              {/* Arrow 2-3 */}
              <path d="M 260,60 L 290,60" stroke="cyan" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Structure 3 */}
              <g transform="translate(310, 10)">
                <polygon points="50,20 85,40 85,80 50,100 15,80 15,40" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="47" y1="20" x2="47" y2="2" stroke="currentColor" strokeWidth="2" />
                <line x1="53" y1="20" x2="53" y2="2" stroke="currentColor" strokeWidth="2" />
                <text x="44" y="-3" fill="currentColor" className="text-[11px] font-mono font-bold">O</text>
                {/* Double bonds in ring */}
                <line x1="18" y1="43" x2="18" y2="77" stroke="currentColor" strokeWidth="2" />
                <line x1="82" y1="43" x2="52" y2="26" stroke="currentColor" strokeWidth="2" />
                {/* negative charge on para */}
                <circle cx="50" cy="100" r="4" fill="cyan" />
                <text x="56" y="98" fill="cyan" className="text-[9px] font-mono font-bold">⁻</text>
                <text x="32" y="118" fill="currentColor" className="text-[10px] font-mono">(III)</text>
              </g>

              {/* Arrow 3-4 */}
              <path d="M 410,60 L 440,60" stroke="cyan" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Structure 4 */}
              <g transform="translate(460, 10)">
                <polygon points="50,20 85,40 85,80 50,100 15,80 15,40" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="47" y1="20" x2="47" y2="2" stroke="currentColor" strokeWidth="2" />
                <line x1="53" y1="20" x2="53" y2="2" stroke="currentColor" strokeWidth="2" />
                <text x="44" y="-3" fill="currentColor" className="text-[11px] font-mono font-bold">O</text>
                {/* Double bonds in ring */}
                <line x1="20" y1="43" x2="20" y2="77" stroke="currentColor" strokeWidth="2" />
                <line x1="80" y1="77" x2="52" y2="93" stroke="currentColor" strokeWidth="2" />
                {/* negative charge on other ortho */}
                <circle cx="85" cy="40" r="4" fill="cyan" />
                <text x="91" y="38" fill="cyan" className="text-[9px] font-mono font-bold">⁻</text>
                <text x="32" y="118" fill="currentColor" className="text-[10px] font-mono">(IV)</text>
              </g>

              {/* Definitions */}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0,2 L 8,5 L 0,8 z" fill="cyan" />
                </marker>
              </defs>
            </svg>
            <span className="text-[11px] text-white/50 font-mono">*Note:* Structures II, III, and IV show that orth and para positions carry negative charge, directing electrophilic attacks there.</span>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 5: PREPARATION OF ALCOHOLS & PHENOLS ───────────────────── */}
      <Collapsible title="5 · Preparation of Alcohols & Phenols" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5">
          <SectionBanner label="1. Alcohol Synthesis Pathways" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block">Hydration & Hydroboration-Oxidation</span>
              <ul className="space-y-2 text-white/60">
                <li>
                  <strong>Acid-Catalyzed Hydration:</strong> Markovnikov addition of water. Carbocation intermediates form, making rearrangements possible.
                </li>
                <li>
                  <strong>Hydroboration-Oxidation (HBO):</strong> Overall yields anti-Markovnikov addition of water. It operates via concerted <strong>syn-addition</strong> (no carbocation formed).
                  <div className="font-mono text-cyan-300 text-[10px] mt-0.5">Propene + B₂H₆ followed by H₂O₂/OH⁻ ➔ 1-Propanol (100% yield)</div>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block">Carbonyl Reduction Selector</span>
              NaBH₄ and LiAlH₄ have different reduction rules:
              <ul className="list-disc pl-4 space-y-1 mt-1 text-white/60 text-[11.5px]">
                <li><strong>NaBH₄ (Mild):</strong> Reduces <strong>only</strong> aldehydes and ketones to 1° and 2° alcohols. Fails to reduce carboxylic acids or esters.</li>
                <li><strong>LiAlH₄ (Strong):</strong> Reduces aldehydes, ketones, carboxylic acids, esters, acid chlorides, and amides to their corresponding alcohols.</li>
              </ul>
            </div>
          </div>

          <ProTip>
            {"Grignard reagents (RMgX) react with carbonyls to yield alcohols of different classifications:\n• Formaldehyde + RMgX ➔ Primary (1°) Alcohol\n• Other Aldehydes + RMgX ➔ Secondary (2°) Alcohol\n• Ketones + RMgX ➔ Tertiary (3°) Alcohol\n• Ethylene Oxide (epoxide) + RMgX ➔ Primary (1°) Alcohol (extends the carbon chain of the Grignard reagent by exactly two carbon atoms)."}
          </ProTip>

          <SectionBanner label="2. Phenol Preparative Flowchart (3 Routes)" color="amber" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-emerald-400 block uppercase text-xs">A. Dow Process (Haloarene)</span>
              Chlorobenzene fused with aq. NaOH under severe conditions:
              <div className="font-mono text-emerald-300 text-[10.5px] my-1">
                {"C₆H₅Cl + NaOH ➔ (623K, 300 atm) ➔ Sodium Phenoxide ➔ (dil. HCl) ➔ Phenol"}
              </div>
              Industrial baseline route.
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-pink-400 block uppercase text-xs">B. Cumene Process (Commercial)</span>
              Isopropylbenzene oxidized by air to cumene hydroperoxide, then cleaved:
              <div className="font-mono text-pink-300 text-[10.5px] my-1">
                {"Cumene + O₂ ➔ Hydroperoxide ➔ (dil. H₂SO₄) ➔ Phenol + Acetone (byproduct)"}
              </div>
              Most commercially important method.
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-cyan-400 block uppercase text-xs">C. Diazonium Route (Aniline)</span>
              Aniline diazotized at 273-278K, then warmed with water:
              <div className="font-mono text-cyan-300 text-[10.5px] my-1">
                {"C₆H₅NH₂ ➔ (NaNO₂ + HCl, 0-5°C) ➔ C₆H₅N₂⁺Cl⁻ ➔ (Warm H₂O) ➔ C₆H₅OH + N₂↑ + HCl"}
              </div>
              Cleanest laboratory preparation.
            </div>
          </div>

          {/* Diazonium Flow Diagram */}
          <div className="p-4.5 bg-black/45 rounded-2xl border border-white/5 flex flex-col items-center justify-center space-y-3">
            <span className="text-[11px] font-bold text-cyan-400 block uppercase tracking-wider">Diazonium salt to Phenol Conversion Scheme</span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-white">
              <div className="p-2 border border-white/10 bg-white/[0.02] rounded">Benzene</div>
              <span>➔ (HNO₃/H₂SO₄) ➔</span>
              <div className="p-2 border border-white/10 bg-white/[0.02] rounded">Nitrobenzene</div>
              <span>➔ (Sn/HCl) ➔</span>
              <div className="p-2 border border-white/10 bg-white/[0.02] rounded">Aniline</div>
              <span>➔ (NaNO₂/HCl) ➔</span>
              <div className="p-2 border border-cyan-500/30 bg-cyan-500/10 rounded text-cyan-400 font-bold">Diazonium Salt</div>
              <span>➔ (Warm H₂O) ➔</span>
              <div className="p-2 border border-emerald-500/30 bg-emerald-500/10 rounded text-emerald-400 font-bold">Phenol</div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 6: PHYSICAL PROPERTIES ─────────────────────────────────── */}
      <Collapsible title="6 · Physical Properties Comparison" icon={<TrendingUp className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            The presence of polar hydroxyl groups enables hydrogen bonding, dramatically altering physical states compared to hydrocarbons or ethers.
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Property</th>
                  <th className="p-3">Alcohols</th>
                  <th className="p-3">Phenols</th>
                  <th className="p-3">Ethers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold text-white">Hydrogen Bonding</td>
                  <td className="p-3 text-emerald-400">Yes (Intermolecular)</td>
                  <td className="p-3 text-emerald-400">Yes (Intermolecular)</td>
                  <td className="p-3 text-rose-400">No (Only acts as H-bond acceptor)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Boiling Point</td>
                  <td className="p-3">Very High (increases with mass, decreases with branching)</td>
                  <td className="p-3">Very High (higher than isomeric alkyl benzenes)</td>
                  <td className="p-3">Low (comparable to alkanes of similar mass)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Water Solubility</td>
                  <td className="p-3">Highly soluble (decreases as hydrophobic alkyl chain grows)</td>
                  <td className="p-3">Moderately soluble (higher than benzene due to H-bonding)</td>
                  <td className="p-3">Slightly soluble (miscible with water to a similar extent as alcohols)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProTip>
            <strong className="text-cyan-400">Solubility Rule:</strong> Alcohols form hydrogen bonds with water molecules. However, as the length of the carbon chain increases, the hydrophobic (alkyl) part grows larger, resisting water solvation. Thus, solubility decreases with increasing carbon chain length. Branched isomeric alcohols have higher solubility due to spherical packing which minimizes surface area exposure.
          </ProTip>
        </div>
      </Collapsible>

      {/* ─── SECTION 7: DISTINGUISHING TESTS MASTER TABLE & SIMULATOR ───────── */}
      <Collapsible title="7 · Distinguishing Tests Master Summary" icon={<Sliders className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="One-Page Distinguishing Test Matrix" color="violet" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Quick reference matrix to distinguish alcohols, phenols, and ethers under IAT testing conditions:
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Test / Reagent</th>
                  <th className="p-3">1° Alcohol</th>
                  <th className="p-3">2° Alcohol</th>
                  <th className="p-3">3° Alcohol</th>
                  <th className="p-3">Phenol</th>
                  <th className="p-3">Ethers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-sans">
                <tr>
                  <td className="p-3 font-bold text-white">Lucas (HCl/ZnCl₂)</td>
                  <td className="p-3 text-white/60">No turbidity at RT</td>
                  <td className="p-3 text-amber-400">Turbidity in 5 mins</td>
                  <td className="p-3 text-emerald-400">Turbidity instantly</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Victor Meyer</td>
                  <td className="p-3 text-rose-500 font-semibold">Blood Red color</td>
                  <td className="p-3 text-blue-400 font-semibold">Blue color</td>
                  <td className="p-3 text-white/50">Colorless</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Neutral FeCl₃</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-violet-400 font-semibold">Violet complex</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Sodium Metal (Na)</td>
                  <td className="p-3 text-emerald-400">H₂ Effervescence</td>
                  <td className="p-3 text-emerald-400">H₂ Effervescence</td>
                  <td className="p-3 text-emerald-400">H₂ Effervescence</td>
                  <td className="p-3 text-emerald-400">H₂ Effervescence</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Aqueous NaOH</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                  <td className="p-3 text-cyan-400 font-semibold">Dissolves (Phenoxide)</td>
                  <td className="p-3 text-rose-400">No reaction</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SIMULATOR BOX ─────────────────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            5 · Interactive Alcohol, Phenol & Ether Identification Lab
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select a compound substrate and a reagent/test chemical to simulate visual qualitative tests and study organic conversion mechanisms.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Substrate Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Organic Substrate</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setSubstrate('1')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === '1' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Primary (1°) Alcohol
                </button>
                <button 
                  onClick={() => setSubstrate('2')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === '2' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Secondary (2°) Alcohol
                </button>
                <button 
                  onClick={() => setSubstrate('3')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === '3' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Tertiary (3°) Alcohol
                </button>
                <button 
                  onClick={() => setSubstrate('phenol')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === 'phenol' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Phenol
                </button>
                <button 
                  onClick={() => setSubstrate('ether_simple')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === 'ether_simple' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Simple Ether
                </button>
                <button 
                  onClick={() => setSubstrate('ether_mixed')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === 'ether_mixed' ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Mixed Ether
                </button>
              </div>
            </div>

            {/* Test Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Reagent / Test Method</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'lucas', label: 'Lucas Test (HCl / ZnCl₂)' },
                  { id: 'victor', label: 'Victor Meyer Test (R-B-W)' },
                  { id: 'fecl3', label: 'Neutral FeCl₃ Solution' },
                  { id: 'na', label: 'Sodium Metal (Na)' },
                  { id: 'naoh', label: 'Sodium Hydroxide (NaOH)' },
                  { id: 'dichromate_pcc', label: 'Oxidation (Dichromate / PCC)' },
                  { id: 'hi', label: 'Cleavage by Hydriodic Acid (HI)' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTestReagent(t.id as any)}
                    className={`p-2 rounded-lg border text-left text-xs font-bold transition ${testReagent === t.id ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output Screen */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4 text-[13px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Lab Output Screen</span>
              <span className="text-xs font-mono text-cyan-400">Status: Running</span>
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
              <strong className="text-cyan-400 block mb-1">Detailed Mechanism:</strong>
              {sim.explanation}
            </div>

            <div className="p-3.5 bg-rose-500/5 border border-rose-500/10 rounded-xl text-left leading-relaxed text-white/70">
              <strong className="text-rose-400 block mb-1">IAT Trap Warning:</strong>
              {renderBoldText(sim.trap)}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION 8: REACTIONS OF ALCOHOLS ───────────────────────────────── */}
      <Collapsible title="8 · Reactions of Alcohols: Oxidation, Dehydration & Conversions" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="1. Dehydration & Temperature Trap" color="violet" />
          <p className="leading-relaxed">
            Dehydration of alcohols to alkenes follows the carbocation stability order: <strong>3° &gt; 2° &gt; 1°</strong>.
          </p>

          {/* Temperature Trap Block Diagram */}
          <div className="p-4 bg-black/45 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
            <div className="space-y-1">
              <span className="text-xs font-bold text-white/40 uppercase block">Reaction Pathway A</span>
              <div className="font-mono text-cyan-300 font-bold p-2 bg-cyan-500/10 border border-cyan-500/20 rounded">
                {"Ethanol + conc. H₂SO₄ @ 413 K"}
              </div>
              <span className="text-[11.5px] text-white/60 block">Substitution (S_N2) ➔ <strong className="text-white">Diethyl Ether</strong></span>
            </div>
            <div className="text-cyan-400 font-bold text-lg hidden sm:block">VS</div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-white/40 uppercase block">Reaction Pathway B</span>
              <div className="font-mono text-rose-300 font-bold p-2 bg-rose-500/10 border border-rose-500/20 rounded">
                {"Ethanol + conc. H₂SO₄ @ 443 K"}
              </div>
              <span className="text-[11.5px] text-white/60 block">Elimination (E1) ➔ <strong className="text-white">Ethene</strong></span>
            </div>
          </div>

          <SectionBanner label="2. Oxidation vs. Dehydrogenation (Cu/573 K)" color="violet" />
          <p className="leading-relaxed">
            Dehydrogenation over heated copper is a distinct, high-yield diagnostic method for alcohol classification:
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Substrate Class</th>
                  <th className="p-3">Oxidation (PCC / Chromic Acid)</th>
                  <th className="p-3 text-cyan-400">Dehydrogenation (Cu / 573 K)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-sans">
                <tr>
                  <td className="p-3 font-bold text-white">Primary (1°) ROH</td>
                  <td className="p-3">Aldehyde (PCC) / Acid (KMnO₄)</td>
                  <td className="p-3 text-cyan-400 font-mono">R-CHO (Aldehyde) + H₂↑</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Secondary (2°) ROH</td>
                  <td className="p-3">Ketone (R-CO-R\')</td>
                  <td className="p-3 text-cyan-400 font-mono">R-CO-R\' (Ketone) + H₂↑</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Tertiary (3°) ROH</td>
                  <td className="p-3">Resists (alkene under hot acid)</td>
                  <td className="p-3 text-rose-400 font-mono">Alkene (Dehydration occurs!) + H₂O</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Alcohol-to-Halide Conversions (Chlorinating Agents)" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Reagent</th>
                  <th className="p-3">Reaction Equation</th>
                  <th className="p-3 text-cyan-400">Byproducts & Technical Nuance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-mono text-xs">
                <tr>
                  <td className="p-3 font-sans font-bold text-white">Thionyl Chloride (SOCl₂ / Pyridine)</td>
                  <td className="p-3">{"R-OH + SOCl₂ ➔ R-Cl + SO₂↑ + HCl↑"}</td>
                  <td className="p-3 text-cyan-400 font-sans"><strong className="text-white">Cleanest chlorinating agent.</strong> Byproducts are gaseous and escape, giving pure alkyl halide. (Darzens Process)</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-bold text-white">Phosphorus Pentachloride (PCl₅)</td>
                  <td className="p-3">{"R-OH + PCl₅ ➔ R-Cl + POCl₃ + HCl↑"}</td>
                  <td className="p-3 text-white/60 font-sans">Requires fractional distillation to separate alkyl chloride from liquid phosphoryl chloride (POCl₃).</td>
                </tr>
                <tr>
                  <td className="p-3 font-sans font-bold text-white">Phosphorus Trichloride (PCl₃)</td>
                  <td className="p-3">{"3 R-OH + PCl₃ ➔ 3 R-Cl + H₃PO₃"}</td>
                  <td className="p-3 text-white/60 font-sans">Yields solid phosphorous acid (H₃PO₃) as byproduct.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="4. Esterification & Acetylation" color="violet" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-violet-400 block">Fischer Esterification</span>
              Reversible condensation with carboxylic acids catalyzed by dry HCl gas or conc. H₂SO₄:
              <div className="font-mono text-violet-300 text-[11px] my-1">
                {"R-OH + R'-COOH ⇌ R'-COOR + H₂O"}
              </div>
              Water is removed continuously to drive the equilibrium forward (Le Chatelier\'s principle).
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-rose-400 block">Acetylation of Alcohols</span>
              Reacting with acid anhydride or acid chloride in the presence of <strong className="text-white">pyridine</strong> to neutralize hydrochloric acid (HCl) byproducts:
              <div className="font-mono text-rose-300 text-[11px] my-1">
                {"R-OH + CH₃COCl + Pyridine ➔ CH₃COOR + Pyridinium⁺Cl⁻"}
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 9: CHEMICAL REACTIONS OF PHENOLS ───────────────────────── */}
      <Collapsible title="9 · Chemical Reactions of Phenols: Azo-coupling & Acetylation" icon={<FlaskConical className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="Phenol Functional Transformations" color="rose" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Diazonium Coupling (Azo Dye Test)</span>
              Phenol couples with benzenediazonium chloride in a weakly alkaline medium (pH 9-10) to produce an orange-colored azo dye:
              <div className="font-mono text-rose-300 text-[10.5px] my-1">
                {"C₆H₅N₂⁺Cl⁻ + C₆H₅OH ➔ p-hydroxyazobenzene (orange dye) + HCl"}
              </div>
              The nucleophile is the phenoxide ion, which is highly activated for electrophilic ring substitution at the para-position.
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Phenol Acetylation (Schotten-Baumann)</span>
              Phenol reacts with benzoyl chloride or acetyl chloride in basic medium to form esters:
              <div className="font-mono text-cyan-300 text-[10.5px] my-1">
                {"C₆H₅OH + CH₃COCl + NaOH ➔ Phenyl acetate (C₆H₅OCOCH₃) + NaCl + H₂O"}
              </div>
              This is also used to synthesize aspirin from salicylic acid.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-emerald-400 block uppercase text-xs">Reimer-Tiemann Mechanism Context</span>
              Active electrophile is <strong>dichlorocarbene (:CCl₂)</strong>, generated in-situ by abstraction of proton from chloroform by NaOH.
              <div className="font-mono text-emerald-300 text-[11px] mt-1">{"CHCl₃ + OH⁻ ➔ :CCl₂ + Cl⁻ + H₂O"}</div>
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-amber-400 block uppercase text-xs">Kolbe\'s Synthesis Mechanism Context</span>
              Carbon dioxide acts as a weak electrophile, attacking activated phenoxide at the ortho position, followed by proton shift.
              <div className="font-mono text-amber-300 text-[11px] mt-1">{"Phenoxide + CO₂ ➔ Salicylate intermediate ➔ Salicylic acid"}</div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 10: ETHERS: WILLIAMSON & CLEAVAGE ───────────────────────── */}
      <Collapsible title="10 · Ethers: Williamson Synthesis & Acid Cleavage" icon={<Workflow className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="1. Williamson Ether Synthesis" color="amber" />
          <p className="leading-relaxed">
            Williamson ether synthesis is an organorganic reaction forming an ether from an organohalide and an alcohol. Typically involves an S_N2 reaction of an alkoxide ion with a primary alkyl halide:
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center font-mono text-cyan-300 text-sm">
            {"R-X (1°) + R'-O⁻Na⁺ ➔ R-O-R' + NaX"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <WarningCard title="Substrate Steric Constraints">
              {"Because the reaction mechanism is S_N2, the alkyl halide must be primary (1°). If a tertiary (3°) alkyl halide is used with a sodium alkoxide, the strongly basic alkoxide causes E2 elimination instead, yielding an alkene (isobutylene) as the major product."}
            </WarningCard>
            <WarningCard title="Aryl and Vinyl Halide Limitation">
              {"Aryl halides and vinyl halides cannot be used as the organic halide partner. Backside S_N2 attack on sp² hybridized carbons is completely blocked, and the C-Halogen bonds have partial double bond character due to resonance conjugation."}
            </WarningCard>
          </div>

          <SectionBanner label="2. Acidic Cleavage of Ethers & Zeisel Method" color="amber" />
          <p className="leading-relaxed">
            Ethers are cleaved only by concentrated halogen acids (HX) at high temperatures. Reactivity order: <strong className="text-white">HI &gt; HBr &gt;&gt; HCl</strong> (HCl practically fails).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Simple & Mixed Ethers (S_N2 Cleavage)</span>
              Halide nucleophile attacks the smaller, less hindered alkyl group via S_N2:
              <div className="font-mono text-cyan-300 text-[11px] my-1">
                {"CH₃-O-CH₂-CH₃ + HI ➔ CH₃-I + CH₃-CH₂-OH"}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-rose-400 block uppercase text-xs">Tertiary Alkyl Ethers (S_N1 Cleavage)</span>
              If one of the alkyl groups is tertiary, cleavage yields a tertiary alkyl halide and a primary alcohol:
              <div className="font-mono text-rose-300 text-[11px] my-1">
                {"(CH₃)₃C-O-CH₃ + HI ➔ (CH₃)₃C-I + CH₃-OH"}
              </div>
            </div>
          </div>

          <ProTip>
            <strong className="text-cyan-400">Zeisel Method:</strong> Quantitative estimation of alkoxy groups (like methoxy) in organic compounds. The ether is cleaved with excess concentrated HI, yielding alkyl iodides: R-O-R\' + 2 HI ➔ R-I + R\'-I + H₂O. The resulting alkyl iodide (RI) is swept into alcoholic AgNO₃ solution, forming a yellow silver iodide (AgI) precipitate. The mass of AgI is weighed to determine alkoxy group content.
          </ProTip>

          <SectionBanner label="3. Electrophilic Substitution in Anisole" color="amber" />
          <p className="leading-relaxed">
            The methoxy group (-OCH₃) in anisole activates the ring and directs substitution to ortho and para positions:
          </p>
          <ul className="list-disc pl-4 space-y-2 text-white/60">
            <li>
              <strong>Nitration:</strong> Anisole reacts with conc. HNO₃ + H₂SO₄ to yield o-nitroanisole (minor) and p-nitroanisole (major).
            </li>
            <li>
              <strong>Halogenation:</strong> Bromination with Br₂ in ethanoic acid (even in absence of FeBr₃ catalyst) yields o-bromoanisole and p-bromoanisole (para major, 90%).
            </li>
            <li>
              <strong>Friedel-Crafts:</strong> Alkylation with CH₃Cl/AlCl₃ yields o-methylanisole and p-methylanisole. Acylation with CH₃COCl/AlCl₃ yields acetyl derivatives (p-methoxyacetophenone, major).
            </li>
          </ul>

          <SectionBanner label="4. Crown Ethers (Host-Guest Complexes)" color="amber" />
          <p className="leading-relaxed">
            Crown ethers are cyclic polyethers that selectively bind specific alkali metal cations in their central cavity:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-white/60">
            <li><strong>18-Crown-6:</strong> Cavity matches the size of potassium ion (K⁺).</li>
            <li><strong>15-Crown-5:</strong> Cavity matches sodium ion (Na⁺).</li>
            <li><strong>12-Crown-4:</strong> Cavity matches lithium ion (Li⁺).</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 11: COMMERCIALLY IMPORTANT ALCOHOLS ─────────────────────── */}
      <Collapsible title="11 · Commercially Important Alcohols & Derivatives" icon={<ClipboardList className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="Industrial Alcohols & Practical Utility" color="emerald" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            NCERT highlights several aliphatic alcohols and diols of extreme industrial importance:
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Compound</th>
                  <th className="p-3">Common Name / Details</th>
                  <th className="p-3">Industrial Preparation Method</th>
                  <th className="p-3 text-cyan-400">Key Usage / Toxicity Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-sans">
                <tr>
                  <td className="p-3 font-mono font-bold text-white">Methanol (CH₃OH)</td>
                  <td className="p-3">Wood Spirit</td>
                  <td className="p-3">Hydrogenation of CO: CO + 2H₂ ➔ (ZnO-Cr₂O₃, 573K, 200 atm) ➔ CH₃OH</td>
                  <td className="p-3 text-rose-400">Highly poisonous. Ingestion causes blindness or death. Used as solvent and denaturing agent.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-white">Ethanol (C₂H₅OH)</td>
                  <td className="p-3">Grain Alcohol</td>
                  <td className="p-3">Fermentation of molasses (invertase/zymase enzymes).</td>
                  <td className="p-3 text-cyan-400">Excellent solvent. <strong className="text-white">Rectified spirit</strong> is a 95.6% water azeotrope. <strong className="text-white">Absolute alcohol</strong> is 99%+. <strong className="text-white">Denatured spirit</strong> has pyridine/CuSO₄ added.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-white">Ethylene Glycol</td>
                  <td className="p-3">Ethane-1,2-diol</td>
                  <td className="p-3">Hydrolysis of ethylene oxide.</td>
                  <td className="p-3 text-cyan-400">Used as car engine <strong className="text-white">antifreeze agent</strong> and in polyester synthesis.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-white">Glycerol</td>
                  <td className="p-3">Propane-1,2,3-triol</td>
                  <td className="p-3">Saponification byproduct of oils/fats.</td>
                  <td className="p-3 text-cyan-400">Used in cosmetics, moisturizers, and explosive manufacturing (<strong className="text-white">Nitroglycerine / Trinitroglycerine</strong>).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-white">Propan-2-ol</td>
                  <td className="p-3">Isopropyl alcohol</td>
                  <td className="p-3">Hydration of propene.</td>
                  <td className="p-3 text-cyan-400">Commonly used as <strong className="text-white">rubbing alcohol</strong> disinfectant.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 12: CONCEPTUAL SOLVED PROBLEMS ─────────────────────────── */}
      <Collapsible title="12 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Distinguishing Alcohols chemically</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"How can you chemically distinguish between Ethanol and Phenol?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Use neutral FeCl₃ solution: Phenol reacts immediately to form a violet/purple complex, whereas ethanol shows no reaction."}</div>
              <div>{"2. Use aqueous NaOH: Phenol is sufficiently acidic to react with NaOH and dissolve, whereas ethanol is a weaker acid than water and does not react."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs">Answer: Use Neutral FeCl₃ (violet color with Phenol) or NaOH (Phenol dissolves)</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Williamson Synthesis Products</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"What happens when tert-butyl chloride is treated with sodium methoxide? Name the major organic product."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Tert-butyl chloride is a tertiary (3°) alkyl halide. Sodium methoxide is a strong base."}</div>
              <div>{"2. S_N2 attack on the tertiary carbon is sterically blocked."}</div>
              <div>{"3. The methoxide ion abstracts a beta-proton from one of the methyl groups, initiating E2 dehydrohalogenation."}</div>
              <div>{"4. The major product is isobutylene (2-methylpropene)."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs">Answer: Isobutylene (2-methylpropene) via E2 elimination</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Anisole Cleavage with HI</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Predict the products formed when anisole (methoxybenzene) is treated with hot hydroiodic acid (HI)."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed font-sans text-left">
              <span className="text-white font-bold block mb-1 font-mono text-xs">Detailed Solution:</span>
              <div className="font-mono text-xs text-emerald-400">{"1. Anisole has two C-O bonds: O-methyl (sp³) and O-phenyl (sp²)."}</div>
              <div className="font-mono text-xs text-emerald-400">{"2. The O-phenyl bond has partial double bond character due to conjugation of oxygen's lone pairs with the ring, making it too strong to cleave."}</div>
              <div className="font-mono text-xs text-emerald-400">{"3. HI protonates anisole's oxygen, and the iodide ion attacks the less hindered methyl carbon via S_N2 mechanism."}</div>
              <div className="font-mono text-xs text-emerald-400">{"4. The products formed are phenol and methyl iodide."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Phenol + Methyl Iodide (C₆H₅OH + CH₃I)</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Acidic Strength gradations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Arrange the following compounds in increasing order of their acidic strength: Propan-1-ol, Phenol, p-Nitrophenol, p-Cresol."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed font-sans text-left">
              <span className="text-white font-bold block mb-1 font-mono text-xs">Detailed Solution:</span>
              <div className="font-mono text-xs text-emerald-400">{"1. Propan-1-ol is an aliphatic alcohol; weaker acid than phenols due to lack of resonance stabilization."}</div>
              <div className="font-mono text-xs text-emerald-400">{"2. Phenol has resonance stabilization of phenoxide."}</div>
              <div className="font-mono text-xs text-emerald-400">{"3. p-Cresol has an electron-donating methyl group which destabilizes the conjugate base, decreasing acidity relative to phenol."}</div>
              <div className="font-mono text-xs text-emerald-400">{"4. p-Nitrophenol has a strong electron-withdrawing nitro group (-M effect) which stabilizes the phenoxide charge, increasing acidity."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Propan-1-ol &lt; p-Cresol &lt; Phenol &lt; p-Nitrophenol</span>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: Darzens Process Nuance</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Explain why thionyl chloride (SOCl₂) is preferred over PCl₅ or PCl₃ for converting alcohols into alkyl chlorides."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed font-sans text-left">
              <span className="text-white font-bold block mb-1 font-mono text-xs">Detailed Solution:</span>
              <div className="font-mono text-xs text-emerald-400">{"1. SOCl₂ reacts with R-OH to give alkyl chloride, sulfur dioxide (SO₂), and hydrogen chloride (HCl)."}</div>
              <div className="font-mono text-xs text-emerald-400">{"2. The reaction equation is: R-OH + SOCl₂ ➔ R-Cl + SO₂↑ + HCl↑."}</div>
              <div className="font-mono text-xs text-emerald-400">{"3. Both SO₂ and HCl are gases that bubble out of the reaction mixture, leaving behind pure liquid alkyl chloride."}</div>
              <div className="font-mono text-xs text-emerald-400">{"4. Conversions using PCl₅ or PCl₃ yield liquid/solid byproducts (POCl₃, H₃PO₃) that require fractional distillation to separate."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Both byproducts (SO₂ and HCl) are gases, leaving pure alkyl chloride.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 13: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="13 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Test your knowledge of Alcohols, Phenols, and Ethers with this IAT-focused mock test.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following compounds is converted to a violet coordination complex when treated with neutral FeCl₃?',
                a: 'Ethanol',
                b: 'Benzyl alcohol',
                c: 'Phenol',
                d: 'Diethyl ether',
                ans: 'Correct Answer: C. Phenol reacts with neutral ferric chloride to produce a characteristic violet-colored complex [Fe(OC₆H₅)₆]³⁻. Alcohols and ethers do not show this reaction.'
              },
              {
                q: 'In the Victor Meyer test, a secondary alcohol shows which of the following colors?',
                a: 'Blood Red',
                b: 'Blue',
                c: 'Green',
                d: 'Colorless',
                ans: 'Correct Answer: B. Victor Meyer color indications: Primary (1°) alcohols give a red color, secondary (2°) alcohols give a blue color, and tertiary (3°) alcohols remain colorless (white).'
              },
              {
                q: 'Predict the major organic product formed when propene undergoes hydroboration-oxidation.',
                a: 'Propan-1-ol',
                b: 'Propan-2-ol',
                c: 'Propane-1,2-diol',
                d: 'Propanone',
                ans: 'Correct Answer: A. Hydroboration-oxidation adds water across alkenes with anti-Markovnikov regioselectivity and syn-stereochemistry, converting propene directly to 1-propanol.'
              },
              {
                q: 'Which reducing agent can reduce carboxylic acids directly to primary alcohols?',
                a: 'NaBH₄',
                b: 'LiAlH₄',
                c: 'H₂ / Pd-C',
                d: 'Both A and B',
                ans: 'Correct Answer: B. LiAlH₄ is a strong reducing agent capable of reducing carboxylic acids, esters, and amides. NaBH₄ is milder and only reduces aldehydes and ketones.'
              },
              {
                q: 'Select the correct order of acidic strength:',
                a: 'Phenol > Water > Ethanol',
                b: 'Water > Phenol > Ethanol',
                c: 'Ethanol > Water > Phenol',
                d: 'Phenol > Ethanol > Water',
                ans: 'Correct Answer: A. Phenol (stable phenoxide via resonance) is more acidic than water. Water is more acidic than ethanol due to the destabilizing electron-donating inductive (+I) effect of the ethyl group.'
              },
              {
                q: 'Salicylaldehyde is prepared from phenol using which reaction?',
                a: 'Kolbe\'s Reaction',
                b: 'Reimer-Tiemann Reaction',
                c: 'Dow\'s Process',
                d: 'Friedel-Crafts Formylation',
                ans: 'Correct Answer: B. The Reimer-Tiemann reaction converts phenol to salicylaldehyde using chloroform and aqueous NaOH, proceeding via a dichlorocarbene (:CCl₂) intermediate.'
              },
              {
                q: 'Which of the following reaction conditions yields diethyl ether from ethanol?',
                a: 'Ethanol + conc. H₂SO₄ at 443 K',
                b: 'Ethanol + conc. H₂SO₄ at 413 K',
                c: 'Ethanol + dil. HCl at room temperature',
                d: 'Williamson synthesis with t-butyl chloride',
                ans: 'Correct Answer: B. Heating ethanol with concentrated sulfuric acid at 413 K produces diethyl ether via an S_N2 mechanism. Higher temperature (443 K) leads to E1 elimination, yielding ethene.'
              },
              {
                q: 'Cleavage of t-butyl methyl ether with one equivalent of HI yields:',
                a: 't-Butyl alcohol + Methyl iodide',
                b: 't-Butyl iodide + Methyl alcohol',
                c: 't-Butyl iodide + Methyl iodide',
                d: 'Isobutylene + Methanol',
                ans: 'Correct Answer: B. Because one of the groups is tertiary (t-butyl), C-O bond cleavage goes through an S_N1 mechanism to form a stable 3° carbocation, yielding t-butyl iodide and methanol.'
              },
              {
                q: 'Anisole (methoxybenzene) undergoes electrophilic bromination at which positions?',
                a: 'Ortho and Para',
                b: 'Meta only',
                c: 'Ortho only',
                d: 'Para only',
                ans: 'Correct Answer: A. The methoxy group (-OCH₃) is strongly activating and ortho/para-directing due to resonance conjugation (+M effect) with the ring.'
              },
              {
                q: 'Which crown ether matches the cavity size of the Potassium (K⁺) cation?',
                a: '12-Crown-4',
                b: '15-Crown-5',
                c: '18-Crown-6',
                d: '24-Crown-8',
                ans: 'Correct Answer: C. 18-Crown-6 has a ring cavity size that perfectly coordinates with the potassium ion (K⁺), making potassium salts soluble in organic solvents.'
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
        <span className="text-[11px] text-white/30 font-mono">Alcohols, Phenols & Ethers · Unit 13</span>
      </div>

    </div>
  );
}
