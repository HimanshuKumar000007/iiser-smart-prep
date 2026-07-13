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
  Workflow
} from 'lucide-react';

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
  const colorMap = {
    cyan: 'from-cyan-500/10 to-transparent border-cyan-500/20 text-cyan-400',
    rose: 'from-rose-500/10 to-transparent border-rose-500/20 text-rose-400',
    amber: 'from-amber-500/10 to-transparent border-amber-500/20 text-amber-400',
    violet: 'from-violet-500/10 to-transparent border-violet-500/20 text-violet-400',
    emerald: 'from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400'
  };
  return (
    <div className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r border ${colorMap[color]} font-semibold text-[13px] sm:text-sm tracking-wide uppercase`}>
      {label}
    </div>
  );
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-[13px] text-white/70 leading-relaxed text-left">
      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center">
        <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
      </div>
      <div>
        <strong className="text-cyan-400 block mb-0.5 uppercase tracking-wide text-[11px]">High-Yield Concept / Trap</strong>
        {children}
      </div>
    </div>
  );
}

function WarningCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-[13px] text-white/70 leading-relaxed text-left">
      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-rose-500/10 flex items-center justify-center">
        <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
      </div>
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
        <span className="text-white/40 text-[13px] sm:text-sm font-semibold pr-1">
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

export default function HaloalkanesDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [substrate, setSubstrate] = useState<'1' | '2' | '3' | 'aryl'>('1');
  const [nucleophile, setNucleophile] = useState<'strong' | 'weak'>('strong');
  const [leavingGroup, setLeavingGroup] = useState<'I' | 'Br' | 'Cl' | 'F'>('Br');

  // Reaction Conversion Map State
  const [mapInput, setMapInput] = useState<'aq_koh' | 'alc_koh' | 'kcn' | 'agcn' | 'kno2' | 'agno2' | 'nh3' | 'naor' | 'mg' | 'wurtz'>('aq_koh');

  // Simulator Logic
  const getSimulatorOutcome = () => {
    if (substrate === 'aryl') {
      return {
        mechanism: 'No Reaction (At standard conditions)',
        rateLaw: 'Rate = 0',
        stereochem: 'No Change',
        carbocation: 'Extremely Unstable Phenyl Cation (Fails to form)',
        relativeRate: '0 (Extremely Inert)',
        explanation: 'Haloarenes are highly unreactive to nucleophilic substitution due to: (1) resonance stabilization showing partial double-bond character of C-X bond, (2) sp² hybridized carbon holding leaving group tightly, (3) steric hindrance to backside attack, and (4) electrostatic repulsion from the electron-rich pi cloud.',
        color: 'text-rose-400'
      };
    }

    if (substrate === '3') {
      if (nucleophile === 'weak') {
        return {
          mechanism: 'S_N1 (Solvolysis)',
          rateLaw: 'Rate = k[R-X]',
          stereochem: 'Racemization (Inversion + Retention)',
          carbocation: 'Stable 3° Carbocation (Formed via slow R-X cleavage)',
          relativeRate: '1,000 (Very Fast)',
          explanation: 'Tertiary substrate undergoes rapid S_N1 substitution. The rate-determining step is the formation of a planar 3° carbocation intermediate. Polar protic solvents stabilize this cation. Stereochemical outcome yields racemization, though ion-pair interactions may slightly favor inversion in practice.',
          color: 'text-emerald-400'
        };
      } else {
        return {
          mechanism: 'E2 (Elimination predominant)',
          rateLaw: 'Rate = k[R-X][Nu⁻]',
          stereochem: 'Regioselective (Saytzeff Alkene formed)',
          carbocation: 'None (Concerted dehydrohalogenation)',
          relativeRate: '800 (Fast)',
          explanation: 'With a strong base/nucleophile, a tertiary substrate undergoes E2 elimination rather than substitution due to severe steric crowding at the α-carbon, which blocks nucleophilic attack.',
          color: 'text-amber-400'
        };
      }
    }

    if (substrate === '1') {
      if (nucleophile === 'strong') {
        const rateMap = { I: '2,000', Br: '1,000', Cl: '100', F: '1' };
        return {
          mechanism: 'S_N2',
          rateLaw: 'Rate = k[R-X][Nu⁻]',
          stereochem: '100% Inversion of Configuration (Walden Inversion)',
          carbocation: 'None (Concerted single-step transition state)',
          relativeRate: `${rateMap[leavingGroup]} (Determined by leaving group ability)`,
          explanation: 'Primary substrate undergoes concerted S_N2 substitution. Backside attack occurs simultaneously with leaving group departure. Order of leaving group ability: I⁻ > Br⁻ > Cl⁻ >> F⁻, making R-I react the fastest.',
          color: 'text-cyan-400'
        };
      } else {
        return {
          mechanism: 'S_N2 (Slow Solvolysis)',
          rateLaw: 'Rate = k[R-X][Nu⁻]',
          stereochem: 'Inversion of Configuration',
          carbocation: 'None',
          relativeRate: '0.1 (Extremely Slow)',
          explanation: 'Primary substrates do not form unstable 1° carbocations, preventing S_N1. Weak nucleophiles result in a highly sluggish S_N2 reaction.',
          color: 'text-zinc-400'
        };
      }
    }

    // Secondary Substrate: Borderline Case
    if (nucleophile === 'strong') {
      return {
        mechanism: 'S_N2 / E2 Mixture',
        rateLaw: 'Rate = k[R-X][Nu⁻]',
        stereochem: 'Inversion (S_N2) / Saytzeff Alkene (E2)',
        carbocation: 'None (Concerted mechanisms)',
        relativeRate: '50 (Moderate)',
        explanation: 'Secondary substrates are borderline. Strong, bulky bases favor E2 elimination, whereas highly nucleophilic, non-basic species (like I⁻, CN⁻) favor S_N2 substitution with inversion.',
        color: 'text-violet-400'
      };
    } else {
      return {
        mechanism: 'S_N1',
        rateLaw: 'Rate = k[R-X]',
        stereochem: 'Racemization',
        carbocation: '2° Carbocation (Subject to hydride/alkyl rearrangement)',
        relativeRate: '10 (Slow)',
        explanation: 'Secondary substrates with weak nucleophiles in polar protic solvents undergo S_N1 reactions. The 2° carbocation formed can rearrange to a more stable 3° carbocation if structural pathways permit.',
        color: 'text-rose-300'
      };
    }
  };

  const sim = getSimulatorOutcome();

  // Conversion Map Data
  const mapData = {
    aq_koh: {
      reagent: 'Aqueous KOH / NaOH (or moist Ag₂O)',
      product: 'Alcohol (R-OH)',
      mechanism: 'Nucleophilic Substitution (S_N2 for 1°, S_N1 for 3°)',
      equation: 'R-X + OH⁻ → R-OH + X⁻',
      details: 'High dielectric constant of water stabilizes ionic intermediates, favoring substitution. Primary halides follow S_N2, whereas tertiary halides react via S_N1.'
    },
    alc_koh: {
      reagent: 'Alcoholic KOH + Heat',
      product: 'Alkene (Elimination Product)',
      mechanism: 'E2 Dehydrohalogenation',
      equation: 'R-CH₂-CH₂-X + alc. KOH/Δ → R-CH=CH₂ + KX + H₂O',
      details: 'Ethoxide ions (C₂H₅O⁻) generated in alcoholic solutions are strong bases. They abstract a β-hydrogen, initiating E2 elimination. Regioselectivity follows Saytzeff\'s rule (highly substituted alkene is the major product).'
    },
    kcn: {
      reagent: 'KCN / NaCN in aqueous ethanol',
      product: 'Alkyl Nitrile (R-C≡N)',
      mechanism: 'S_N2 (Carbon-Carbon bond formation)',
      equation: 'R-X + KCN → R-CN + KX',
      details: 'Cyanide is an ambident nucleophile. In KCN, the bond between potassium and carbon is ionic. Attack occurs through the carbon atom, producing an alkyl nitrile (useful for ascending a homologous series).'
    },
    agcn: {
      reagent: 'AgCN in aqueous ethanol',
      product: 'Alkyl Isocyanide (R-N⁺≡C⁻)',
      mechanism: 'S_N2 (Nitrogen-Carbon bond formation)',
      equation: 'R-X + AgCN → R-NC + AgX↓',
      details: 'AgCN is covalent. Since the carbon atom is not free, attack occurs through the lone pair of nitrogen, yielding an isocyanide (carbylamine derivative).'
    },
    kno2: {
      reagent: 'KNO₂ in aqueous ethanol',
      product: 'Alkyl Nitrite (R-O-N=O)',
      mechanism: 'S_N2 (Oxygen-Nitrogen bond formation)',
      equation: 'R-X + KNO₂ → R-ONO + KX',
      details: 'Nitrite is an ambident nucleophile. The ionic K-O bond leaves the oxygen atom with a negative charge. Nucleophilic attack happens through oxygen, yielding nitrites.'
    },
    agno2: {
      reagent: 'AgNO₂ in aqueous ethanol',
      product: 'Nitroalkane (R-NO₂)',
      mechanism: 'S_N2 (Nitrogen-Oxygen bond formation)',
      equation: 'R-X + AgNO₂ → R-NO₂ + AgX↓',
      details: 'Ag-O bond in AgNO₂ is covalent. Attack occurs via nitrogen\'s lone pair, yielding a stable nitroalkane.'
    },
    nh3: {
      reagent: 'Excess Ethanolic Ammonia (Ammonolysis)',
      product: 'Primary Amine (R-NH₂)',
      mechanism: 'S_N2 (Ammonolysis)',
      equation: 'R-X + NH₃ (excess) → R-NH₂ + HX',
      details: 'If ammonia is in excess, primary amine is the major product. If R-X is in excess, substitution continues to yield secondary, tertiary amines, and finally quaternary ammonium salts (R₄N⁺X⁻).'
    },
    naor: {
      reagent: 'Sodium Alkoxide (NaO-R\') (Williamson Ether Synthesis)',
      product: 'Ether (R-O-R\')',
      mechanism: 'S_N2 (Ether Synthesis)',
      equation: 'R-X (1°) + R\'-O⁻Na⁺ → R-O-R\' + NaX',
      details: 'Requires a primary alkyl halide (R-X) to minimize steric hindrance. If a tertiary alkyl halide is used instead, the strongly basic alkoxide causes E2 elimination, yielding an alkene.'
    },
    mg: {
      reagent: 'Magnesium metal in Dry Ether',
      product: 'Grignard Reagent (R-Mg-X)',
      mechanism: 'Organometallic Formation (Single Electron Transfer)',
      equation: 'R-X + Mg → (Dry Ether) → R-Mg-X',
      details: 'The carbon-magnesium bond is highly polar and covalent. Extremely sensitive to moisture; any trace of water decomposes it instantly: R-Mg-X + H₂O → R-H + Mg(OH)X.'
    },
    wurtz: {
      reagent: 'Sodium metal in Dry Ether (Wurtz Reaction)',
      product: 'Symmetrical Alkane (R-R)',
      mechanism: 'Free Radical / Carbanionic coupling',
      equation: '2 R-X + 2 Na → (Dry Ether) → R-R + 2 NaX',
      details: 'Best for preparing symmetrical alkanes with an even number of carbons. Unsymmetrical combinations yield a complex mixture of products with close boiling points, making separation difficult.'
    }
  };

  const md = mapData[mapInput];

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white">
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Chemistry</Tag>
            <Tag color="cyan">Unit 12</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="violet">Haloalkanes & Haloarenes</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Haloalkanes & <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Haloarenes</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Complete structural analysis of organohalogen compounds. This module covers mechanisms of nucleophilic substitution (S<sub>N</sub>1 vs S<sub>N</sub>2), dehydrohalogenation elimination pathways, name reactions, and essential conceptual traps for the IISER Aptitude Test.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: CLASSIFICATION ───────────────────────────────────────── */}
      <Collapsible title="1 · Classification of Halogen Compounds" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            Halogen compounds are classified based on the hybridization state of the carbon atom bonded to the halogen, and the total count of halogen substituents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            {/* sp3 hybridized */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">C(sp³)–X Classifications</span>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Alkyl Halides (Haloalkanes):</strong> Halogen bonded directly to an alkyl carbon. Sub-classified into Primary (1°), Secondary (2°), and Tertiary (3°) based on α-carbon substitution.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Allylic Halides:</strong> Halogen bonded to an sp³ carbon adjacent to a carbon-carbon double bond.
                    <div className="font-mono text-cyan-300/80 text-[11px] mt-0.5">Example: CH₂=CH–CH₂–Cl (3-Chloroprop-1-ene)</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Benzylic Halides:</strong> Halogen bonded to an sp³ carbon directly attached to an aromatic ring.
                    <div className="font-mono text-cyan-300/80 text-[11px] mt-0.5">Example: C₆H₅–CH₂–Cl (Benzyl chloride)</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* sp2 hybridized */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">C(sp²)–X Classifications</span>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Vinylic Halides:</strong> Halogen atom directly attached to an sp² hybridized carbon of a C=C double bond.
                    <div className="font-mono text-rose-300/80 text-[11px] mt-0.5">Example: CH₂=CH–Cl (Chloroethene)</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Aryl Halides (Haloarenes):</strong> Halogen atom bonded directly to an sp² hybridized carbon of an aromatic ring.
                    <div className="font-mono text-rose-300/80 text-[11px] mt-0.5">Example: C₆H₅–Cl (Chlorobenzene)</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: NOMENCLATURE & C-X NATURE ───────────────────────────── */}
      <Collapsible title="2 · Nomenclature & Nature of C–X Bond" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="Nomenclature Fundamentals" color="violet" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            In IUPAC nomenclature, halogens are always treated as <strong>substituents</strong>. The longest carbon chain is numbered to give the substituents the lowest locants. In dihalides, two classifications are essential:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5">
              <span className="font-bold text-violet-400 block mb-1">Geminal Dihalides (Gem-dihalides)</span>
              Both halogen atoms are bonded to the <strong>same</strong> carbon atom. Also known as alkylidene dihalides.
              <div className="font-mono text-violet-300 text-[11px] mt-1.5">Example: CH₃–CHCl₂ (Ethylidene chloride)</div>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5">
              <span className="font-bold text-cyan-400 block mb-1">Vicinal Dihalides (Vic-dihalides)</span>
              Halogen atoms are bonded to <strong>adjacent</strong> carbon atoms. Also known as alkylene dihalides.
              <div className="font-mono text-cyan-300 text-[11px] mt-1.5">Example: ClCH₂–CH₂Cl (Ethylene dichloride)</div>
            </div>
          </div>

          <SectionBanner label="Nature of the C–X Bond" color="violet" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Because halogens are more electronegative than carbon, the carbon-halogen bond is polar. The carbon atom carries a partial positive charge (δ⁺), acting as an electrophilic center, while the halogen carries a partial negative charge (δ⁻).
          </p>

          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-white block uppercase tracking-wider">Dipole Moment Order of Methyl Halides</span>
            <div className="p-3 bg-black/45 rounded-xl text-center text-sm font-mono text-cyan-300">
              {"CH₃Cl (1.86 D) > CH₃F (1.847 D) > CH₃Br (1.73 D) > CH₃I (1.63 D)"}
            </div>
            <ProTip>
              {"Although Fluorine is more electronegative than Chlorine, CH₃Cl has a higher dipole moment than CH₃F. Dipole moment is the product of charge separation and bond distance (μ = q × d). The C–Cl bond is significantly longer than the C–F bond, which overcompensates for the smaller charge difference. This is a very common IAT trap!"}
            </ProTip>
          </div>

          {/* Bond length and BDE trends */}
          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Bond Length & Bond Dissociation Energy (BDE) Trends</span>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                    <th className="p-2.5">Bond Type (C-X)</th>
                    <th className="p-2.5">Bond Length (pm)</th>
                    <th className="p-2.5">Bond Dissociation Energy (kJ/mol)</th>
                    <th className="p-2.5">Substitution Reactivity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  <tr>
                    <td className="p-2.5 font-bold text-white">C–F</td>
                    <td className="p-2.5">139 pm</td>
                    <td className="p-2.5 font-mono text-rose-400">485 kJ/mol (Strongest)</td>
                    <td className="p-2.5 text-rose-400 font-semibold">Lowest (Inert)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">C–Cl</td>
                    <td className="p-2.5">178 pm</td>
                    <td className="p-2.5 font-mono">339 kJ/mol</td>
                    <td className="p-2.5">Moderate</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">C–Br</td>
                    <td className="p-2.5">193 pm</td>
                    <td className="p-2.5 font-mono">285 kJ/mol</td>
                    <td className="p-2.5">High</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">C–I</td>
                    <td className="p-2.5">213 pm</td>
                    <td className="p-2.5 font-mono text-emerald-400">213 kJ/mol (Weakest)</td>
                    <td className="p-2.5 text-emerald-400 font-semibold">Highest (Most Reactive)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed font-mono">
              *Trend Note:* As halogen size increases, orbital overlap between Carbon (2p) and Halogen (2p/3p/4p/5p) becomes poorer, weakening the bond. Thus, BDE decreases and reactivity increases from Fluorine to Iodine.
            </p>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: PREPARATION OF HALOALKANES ──────────────────────────── */}
      <Collapsible title="3 · Preparation of Haloalkanes" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="1. From Alcohols" color="amber" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Alcohols can be converted to alkyl halides using hydrogen halides (HX), phosphorus halides (PCl₃/PCl₅), or thionyl chloride (SOCl₂).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block">Lucas Reagent & Rate Distinction</span>
              Concentrated HCl with anhydrous ZnCl₂ is called <strong>Lucas Reagent</strong>. It distinguishes alcohols based on carbocation stability:
              <ul className="list-disc pl-4 space-y-1 mt-1 text-white/60">
                <li>Tertiary alcohols: React immediately, showing instant turbidity.</li>
                <li>Secondary alcohols: React within 5 minutes, showing turbidity.</li>
                <li>Primary alcohols: Do not react at room temperature (require heating).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-emerald-400 block">Thionyl Chloride (Darzen's Method)</span>
              The reaction with thionyl chloride (SOCl₂) is the <strong>preferred method</strong> for synthesizing alkyl chlorides:
              <div className="font-mono text-emerald-300 text-[11px] my-1">{"R-OH + SOCl₂ → R-Cl + SO₂↑ + HCl↑"}</div>
              Because the byproducts (SO₂ and HCl) are escapable gases, the purification of the alkyl chloride is highly efficient.
            </div>
          </div>

          <SectionBanner label="2. From Hydrocarbons" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-400 block">A. Free Radical Halogenation</span>
              Alkanes react with Cl₂ or Br₂ in presence of UV light (hν) or heat:
              <div className="font-mono text-cyan-300 text-[10px] my-1">{"R-H + X₂ → (hν/Δ) → R-X + HX"}</div>
              Follows free radical chain mechanism. Tends to produce complex structural mixtures of mono-, di-, and poly-haloalkanes, making isolation of a single isomer difficult.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-rose-400 block">B. Electrophilic Addition to Alkenes</span>
              Adding HX or X₂ across double bonds:
              <ul className="list-disc pl-4 space-y-1 text-white/60 text-[11px]">
                <li><strong>Markovnikov Addition:</strong> H⁺ goes to carbon with more hydrogens.</li>
                <li><strong>Peroxide Effect (Kharasch):</strong> HBr addition in presence of peroxides yields anti-Markovnikov product (radical mechanism, only occurs with HBr).</li>
                <li><strong>Addition of X₂:</strong> Yields vicinal dihalides (colorless).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-amber-400 block">C. Addition to Alkynes</span>
              Alkynes react with HX or X₂:
              <ul className="list-disc pl-4 space-y-1 text-white/60 text-[11px]">
                <li>Adding 2 moles of HX yields <strong>geminal dihalides</strong> (both halogens on the same carbon) due to consecutive electrophilic addition.</li>
                <li>Adding 2 moles of X₂ yields <strong>tetrahalides</strong> (vicinal packing).</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="3. Halogen Exchange Name Reactions" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block">Finkelstein Reaction</span>
              Used for preparing alkyl iodides:
              <div className="font-mono text-cyan-300 text-[11px] my-1">{"R-Cl/R-Br + NaI → R-I + NaCl/NaBr↓"}</div>
              The reaction is carried out in <strong>dry acetone</strong>. Since NaCl and NaBr are insoluble in dry acetone, they precipitate, driving the equilibrium forward (Le Chatelier's Principle).
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-pink-400 block">Swarts Reaction</span>
              Used for preparing alkyl fluorides:
              <div className="font-mono text-pink-300 text-[11px] my-1">{"R-X + AgF / Hg₂F₂ / CoF₂ / SbF₃ → R-F"}</div>
              Treating alkyl chlorides or bromides with heavy metal fluorides yields the corresponding alkyl fluoride.
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: PREPARATION OF HALOARENES ───────────────────────────── */}
      <Collapsible title="4 · Preparation of Haloarenes" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="1. Direct Electrophilic Substitution" color="emerald" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Benzene reacts with Cl₂ or Br₂ in the presence of a Lewis acid catalyst (such as anhydrous FeCl₃, FeBr₃, or AlCl₃) to form chlorobenzene or bromobenzene. The catalyst generates the electrophile (X⁺) in the dark.
          </p>

          <SectionBanner label="2. From Diazonium Salts (Sandmeyer & Gattermann Reactions)" color="emerald" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Starting with aniline (C₆H₅NH₂), diazotization with NaNO₂ + HCl at 0–5°C produces benzene diazonium chloride (C₆H₅N₂⁺Cl⁻), which is a key synthetic intermediate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-emerald-400 block">Sandmeyer Reaction</span>
              Uses cuprous salts (CuCl or CuBr) to introduce the halogen:
              <ul className="list-disc pl-4 space-y-1.5 text-white/60">
                <li>{"Ar-N₂⁺Cl⁻ + CuCl / HCl → Ar-Cl + N₂↑"}</li>
                <li>{"Ar-N₂⁺Cl⁻ + CuBr / HBr → Ar-Br + N₂↑"}</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block">Gattermann Reaction</span>
              A variation that uses copper powder and halogen acids instead of cuprous halides:
              <ul className="list-disc pl-4 space-y-1.5 text-white/60">
                <li>{"Ar-N₂⁺Cl⁻ + Cu / HCl → Ar-Cl + N₂ + CuCl"}</li>
                <li>{"Ar-N₂⁺Cl⁻ + Cu / HBr → Ar-Br + N₂ + CuBr"}</li>
              </ul>
            </div>
          </div>
          <ProTip>
            {"To prepare Iodobenzene from diazonium salt, copper salts are not required. Simply warm the diazonium salt solution with Potassium Iodide (KI): Ar-N₂⁺Cl⁻ + KI → Ar-I + KCl + N₂↑."}
          </ProTip>

          <SectionBanner label="3. Phenols & Side-Chain Halogenation" color="emerald" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-emerald-400 block">Preparation from Phenols</span>
              Reaction of phenol with phosphorus pentachloride (PCl₅) yields chlorobenzene:
              <div className="font-mono text-emerald-300 text-[11px] my-1">{"C₆H₅-OH + PCl₅ → C₆H₅-Cl + POCl₃ + HCl"}</div>
              *Note:* Yield is low because side-reactions produce triphenyl phosphate, but it is a standard conversion pathway.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-amber-400 block">Side-Chain Halogenation of Toluene</span>
              Treating toluene with Cl₂ in presence of heat or light (hν) leads to side-chain substitution, not ring substitution:
              <div className="font-mono text-amber-300 text-[11px] my-1">{"C₆H₅-CH₃ + Cl₂ → (hν) → C₆H₅-CH₂-Cl (Benzyl chloride)"}</div>
              This is a free radical mechanism. Contrast this with ring electrophilic halogenation (which uses FeCl₃ in the dark to yield o- and p-chlorotoluene).
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 5: PHYSICAL PROPERTIES ─────────────────────────────────── */}
      <Collapsible title="5 · Physical Properties of Organohalogens" icon={<TrendingUp className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-white/70">
            {/* Boiling Points */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block">Boiling Point & Physical States</span>
              Boiling points are higher than parent hydrocarbons due to polar attractions. Trend order:
              <div className="font-mono text-cyan-300 text-[11px] mt-1">{"R-I > R-Br > R-Cl > R-F"}</div>
              Branching decreases boiling point (spherical shape reduces surface area).
              <div className="text-white/50 text-[11px] mt-1">
                *Physical States:* Methyl chloride (CH₃Cl), methyl bromide (CH₃Br), and ethyl chloride (C₂H₅Cl) are <strong>gases</strong> at room temperature. Higher members are liquids or solids.
              </div>
            </div>

            {/* Solubility & Melting Points */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block">Solubility & Melting Points</span>
              Alkyl halides are polar but insoluble in water because solute-solvent interactions cannot break strong water-water H-bonds.
              <div className="text-white/60 mt-1 text-[11px]">
                <strong>Melting Point Symmetry:</strong> For dihalobenzenes, the <strong>para-isomer</strong> has a significantly higher melting point than ortho and meta isomers. Its symmetrical structure allows close, tight packaging inside the crystal lattice.
              </div>
            </div>

            {/* Density */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block">Density & Dipole Trends</span>
              Bromo, iodo, and polychloro derivatives are heavier than water. Density increases with molecular mass:
              <div className="font-mono text-amber-300 text-[11px] mt-1">{"R-I > R-Br > R-Cl"}</div>
              Fluorides are generally lighter than water. Refractive index also follows the density/mass sequence: I &gt; Br &gt; Cl &gt; F.
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 6: NUCLEOPHILIC SUBSTITUTION (SIMULATOR) ────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            6 · Interactive Nucleophilic Substitution Simulator
          </h2>
          <Tag color="cyan">Interactive</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Configure the reaction components below to simulate the competing mechanisms of nucleophilic substitution (<span className="font-bold text-cyan-400">S<sub>N</sub>1 vs S<sub>N</sub>2 vs E2</span>).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Substrate */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-white/50 uppercase tracking-wider block">1. Select Substrate (R-X)</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setSubstrate('1')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === '1' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Primary (1°)
                </button>
                <button 
                  onClick={() => setSubstrate('2')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === '2' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Secondary (2°)
                </button>
                <button 
                  onClick={() => setSubstrate('3')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === '3' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Tertiary (3°)
                </button>
                <button 
                  onClick={() => setSubstrate('aryl')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${substrate === 'aryl' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Aryl (Haloarene)
                </button>
              </div>
            </div>

            {/* Nucleophile */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-white/50 uppercase tracking-wider block">2. Select Nucleophile / Base</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setNucleophile('strong')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${nucleophile === 'strong' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  {"Strong (e.g., CN⁻, I⁻)"}
                </button>
                <button 
                  onClick={() => setNucleophile('weak')}
                  className={`p-2 rounded-xl border text-xs font-bold transition ${nucleophile === 'weak' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  {"Weak (e.g., H₂O, EtOH)"}
                </button>
              </div>
            </div>

            {/* Leaving Group */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-white/50 uppercase tracking-wider block">3. Select Leaving Group (X⁻)</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['I', 'Br', 'Cl', 'F'] as const).map((lg) => (
                  <button
                    key={lg}
                    onClick={() => setLeavingGroup(lg)}
                    className={`p-2 rounded-lg border text-xs font-bold transition ${leavingGroup === lg ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    {lg}⁻
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Output Screen */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Simulation Output</span>
              <span className="text-xs font-mono text-cyan-400">Status: Active</span>
            </div>

            <div className="grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Predominant Pathway</span>
                  <span className={`text-base font-bold font-display ${sim.color}`}>{sim.mechanism}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Rate Equation</span>
                  <span className="text-white font-mono">{sim.rateLaw}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Stereochemistry</span>
                  <span className="text-white font-semibold">{sim.stereochem}</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Carbocation Intermediate</span>
                  <span className="text-white font-semibold">{sim.carbocation}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Relative Reactivity Score</span>
                  <span className="text-white font-mono font-bold text-cyan-300">{sim.relativeRate}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-left text-[13px] leading-relaxed text-white/70">
              <strong className="text-cyan-400 block mb-1">Mechanistic Insight:</strong>
              {sim.explanation}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION 7: MECHANISTIC COMPARISON & FACTORS ────────────────────── */}
      <Collapsible title="7 · SN1 vs SN2 Mechanistic Breakdown" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            The mechanism of nucleophilic substitution is dictated by carbocation stability, steric hindrance, nucleophile concentration/strength, and solvent characteristics.
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Feature</th>
                  <th className="p-3">S<sub>N</sub>1 Mechanism</th>
                  <th className="p-3">S<sub>N</sub>2 Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold text-white">Kinetics & Rate Law</td>
                  <td className="p-3">Unimolecular. Rate = k[R-X]</td>
                  <td className="p-3">Bimolecular. Rate = k[R-X][Nu⁻]</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Reaction Steps</td>
                  <td className="p-3">Two-step process via carbocation intermediate</td>
                  <td className="p-3">One-step concerted transition state</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Reactivity Order</td>
                  <td className="p-3 font-mono">3° &gt; 2° &gt; 1° &gt; CH₃X</td>
                  <td className="p-3 font-mono">CH₃X &gt; 1° &gt; 2° &gt; 3°</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Stereochemical Outcome</td>
                  <td className="p-3">Racemization (with slight inversion due to ion-pairs)</td>
                  <td className="p-3">100% Inversion of configuration (Walden Inversion)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Solvent Conditions</td>
                  <td className="p-3">Polar protic solvents (H₂O, alcohols, RCOOH)</td>
                  <td className="p-3">Polar aprotic solvents (Acetone, DMSO, DMF)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Catalytic rearrangements</td>
                  <td className="p-3 text-emerald-400">Yes (hydride/alkyl shift to stabilize carbocation)</td>
                  <td className="p-3 text-rose-400">No (no intermediate exists)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70 mt-2">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Leaving Group Ability Factor</span>
              The rate of both S<sub>N</sub>1 and S<sub>N</sub>2 reactions increases with better leaving group ability.
              <div className="font-mono text-cyan-300 text-[11px] my-1">{"I⁻ > Br⁻ > Cl⁻ >> F⁻"}</div>
              Therefore, alkyl iodides (R-I) are the most reactive toward substitution, while alkyl fluorides (R-F) are extremely inert.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">S_N1 Stereochemical Nuance</span>
              <p className="text-white/60">
                While S<sub>N</sub>1 reactions on a chiral substrate generally produce racemization because the planar carbocation intermediate can be attacked from either face, complete 50:50 racemization rarely occurs.
              </p>
              <span className="font-mono text-[10px] text-rose-300 block">*Note:* The departing leaving group temporarily shields the front face as an ion-pair, slightly favoring backside inversion.</span>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 8: AMBIDENT NUCLEOPHILES ────────────────────────────────── */}
      <Collapsible title="8 · Ambident Nucleophile Transformations" icon={<Workflow className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            Ambident nucleophiles possess two nucleophilic centers but react through only one depending on reaction conditions, counter-ions, and solvent.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            {/* Cyanide vs Isocyanide */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Case 1: CN vs NC Formation</span>
              <div className="space-y-2">
                <div className="p-3 bg-black/45 rounded-lg border border-cyan-500/10">
                  <strong>KCN Reaction (Nitrile Major):</strong>
                  <div className="font-mono text-[11px] text-cyan-300">R-X + KCN → R-CN + KX</div>
                  KCN is ionic, generating free CN⁻. Attack occurs primarily through the carbon atom, forming a strong C-C covalent bond.
                </div>
                <div className="p-3 bg-black/45 rounded-lg border border-rose-500/10">
                  <strong>AgCN Reaction (Isocyanide Major):</strong>
                  <div className="font-mono text-[11px] text-rose-300">R-X + AgCN → R-NC + AgX↓</div>
                  AgCN is covalent. Carbon is bonded to silver, leaving only nitrogen\'s lone pair free for nucleophilic attack, yielding an isocyanide.
                </div>
              </div>
            </div>

            {/* Nitrite vs Nitro */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Case 2: ONO vs NO₂ Formation</span>
              <div className="space-y-2">
                <div className="p-3 bg-black/45 rounded-lg border border-cyan-500/10">
                  <strong>KNO₂ Reaction (Nitrite Major):</strong>
                  <div className="font-mono text-[11px] text-cyan-300">R-X + KNO₂ → R-ONO + KX</div>
                  KNO₂ is ionic. The negatively charged oxygen atom acts as the nucleophilic center, yielding an alkyl nitrite.
                </div>
                <div className="p-3 bg-black/45 rounded-lg border border-rose-500/10">
                  <strong>AgNO₂ Reaction (Nitro Major):</strong>
                  <div className="font-mono text-[11px] text-rose-300">R-X + AgNO₂ → R-NO₂ + AgX↓</div>
                  AgNO₂ is covalent. Attack occurs via nitrogen\'s lone pair, yielding a stable nitroalkane.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 9: ELIMINATION & COMPETITION ───────────────────────────── */}
      <Collapsible title="9 · Elimination Reactions & Competition" icon={<Activity className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            Alkyl halides with a β-hydrogen undergo dehydrohalogenation when treated with strong bases, producing alkenes via elimination.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Saytzeff's Rule (Regioselectivity)</span>
              During dehydrohalogenation, if more than one alkene can be formed, the major product is the highly substituted alkene (possessing the greatest number of alkyl groups attached to the double-bonded carbons).
              <div className="font-mono text-rose-300 text-[11px] my-1">{"CH₃-CH(Br)-CH₂-CH₃ + alc. KOH → But-2-ene (80%, Major) + But-1-ene (20%, Minor)"}</div>
              Highly substituted alkenes are thermodynamically more stable due to hyperconjugation.
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block uppercase text-xs">Competition: Substitution vs. Elimination</span>
              Nucleophiles are also bases. Whether a reaction undergoes substitution or elimination depends on:
              <ul className="list-disc pl-4 space-y-1.5 mt-1 text-white/60">
                <li><strong>Base Strength & Bulkishness:</strong> Strong, bulky bases (like t-butoxide) favor elimination.</li>
                <li><strong>Substrate:</strong> 1° halides favor S_N2; 3° halides favor E2/E1.</li>
                <li><strong>Temperature:</strong> Higher temperatures favor elimination over substitution because ΔS is positive for elimination.</li>
              </ul>
            </div>
          </div>

          <WarningCard title="Aqueous KOH vs. Alcoholic KOH Solvent Effect">
            {"• Aqueous KOH: Fully solvates OH⁻ ions, decreasing basicity but maintaining high nucleophilicity, favoring substitution (R-OH formation).\n• Alcoholic KOH: Forms alkoxide ions (RO⁻) which are highly basic, abstracting a β-proton and driving elimination (alkene formation)."}
          </WarningCard>
        </div>
      </Collapsible>

      {/* ─── SECTION 10: METALS & COUPLING ──────────────────────────────────── */}
      <Collapsible title="10 · Reactions with Metals & Organometallics" icon={<Workflow className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="1. Grignard Reagent Formation" color="emerald" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Alkyl halides react with magnesium metal in dry ether to form alkylmagnesium halides (R-Mg-X), known as Grignard Reagents.
          </p>
          <div className="p-4.5 rounded-2xl bg-black/35 border border-white/5 space-y-2">
            <div className="font-mono text-emerald-400 text-sm text-center">{"R-X + Mg → (Dry Ether) → R-Mg-X"}</div>
            <p className="text-[13px] text-white/70 leading-relaxed">
              The carbon-magnesium bond is covalent but highly polar (C<sup>δ⁻</sup>–Mg<sup>δ⁺</sup>), making Grignard reagents exceptionally strong nucleophiles and bases.
            </p>
            <WarningCard title="Destruction by Moisture">
              {"Grignard reagents react instantly with any source of active hydrogen (water, alcohols, amines) to yield hydrocarbons. For this reason, the reaction must be carried out under completely anhydrous conditions:\nR-Mg-X + H₂O → R-H + Mg(OH)X"}
            </WarningCard>
          </div>

          <SectionBanner label="2. Reduction of Haloalkanes" color="emerald" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Alkyl halides can be reduced back to hydrocarbons using a variety of hydride sources or hydrogen gas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-white/70">
            <div className="p-3 bg-black/45 rounded-xl border border-white/5">
              <strong>A. Lithium Aluminum Hydride (LiAlH₄)</strong>
              Acts as a nucleophilic hydride (H⁻) source.
              <div className="text-white/60 text-[11px] mt-1">
                Reduces 1° and 2° alkyl halides to alkanes via S_N2 mechanism.
              </div>
              <span className="text-rose-400 font-bold block text-[10px] mt-1">*Warning:* 3° alkyl halides undergo elimination to form alkenes instead.</span>
            </div>
            <div className="p-3 bg-black/45 rounded-xl border border-white/5">
              <strong>B. Zinc in Acidic Medium (Zn/HCl)</strong>
              Proton transfer and single-electron reduction:
              <div className="font-mono text-[11px] text-cyan-300 my-1">R-X + Zn + H⁺ → R-H + Zn²⁺ + X⁻</div>
              Ideal for reducing all alkyl halides (1°, 2°, 3°) cleanly to alkanes.
            </div>
            <div className="p-3 bg-black/45 rounded-xl border border-white/5">
              <strong>C. Catalytic Hydrogenation</strong>
              Reacts with H₂ gas over palladium on carbon (Pd/C):
              <div className="font-mono text-[11px] text-cyan-300 my-1">R-X + H₂ → (Pd/C) → R-H + HX</div>
              Cleaves the C-X bond and replaces it with hydrogen.
            </div>
          </div>

          <SectionBanner label="3. Coupling Name Reactions" color="emerald" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block">Wurtz Reaction</span>
              Couples two molecules of alkyl halides in the presence of sodium in dry ether:
              <div className="font-mono text-cyan-300 text-[11px] mt-1">{"2 RX + 2 Na → R-R + 2 NaX"}</div>
              Only symmetrical, even-carbon alkanes are prepared in high yield.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-pink-400 block">Wurtz-Fittig Reaction</span>
              A mixture of an alkyl halide and an aryl halide treated with sodium in dry ether yields an alkylarene:
              <div className="font-mono text-pink-300 text-[11px] mt-1">{"Ar-X + R-X + 2 Na → Ar-R + 2 NaX"}</div>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block">Fittig Reaction</span>
              Coupling of two aryl halide molecules using sodium in dry ether, yielding diaryls:
              <div className="font-mono text-amber-300 text-[11px] mt-1">{"2 Ar-X + 2 Na → Ar-Ar + 2 NaX"}</div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 11: HALOARENES LESS REACTIVITY ─────────────────────────── */}
      <Collapsible title="11 · Why Haloarenes are Less Reactive" icon={<Atom className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            Haloarenes are extremely unreactive toward nucleophilic substitution compared to haloalkanes. The major reasons are:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block">1. Resonance Stabilization</span>
              The lone pairs on the halogen atom undergo resonance conjugation with the pi electrons of the benzene ring, imparting a <strong>partial double-bond character</strong> to the C–X bond.
              <div className="text-white/60 text-[11px]">This makes the C-X bond shorter, stronger, and significantly harder to cleave than the single C-X bond in haloalkanes.</div>
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block">2. Carbon Hybridization State</span>
              In haloalkanes, halogen is attached to an <strong>sp³</strong> carbon. In haloarenes, halogen is attached to an <strong>sp²</strong> carbon.
              <div className="text-white/60 text-[11px]">sp² carbons have more s-character (33%) than sp³ carbons (25%), making them more electronegative. This holds the C-X electron pair tightly, decreasing bond length and reactivity.</div>
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-amber-400 block">3. Instability of Phenyl Cation</span>
              In S_N1 reactions, haloarenes would have to form a phenyl cation intermediate.
              <div className="text-white/60 text-[11px]">The phenyl cation cannot be resonance stabilized (the positive charge sits in an sp² orbital perpendicular to the pi cloud), meaning S_N1 is completely ruled out.</div>
            </div>

            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-pink-400 block">4. Electrostatic Repulsion</span>
              Because of the rich pi electron cloud above and below the benzene ring, approaching nucleophiles (which are also electron-rich) experience strong electrostatic repulsion, blocking backside attack (S_N2).
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 12: SUBSTITUTION IN HALOARENES ─────────────────────────── */}
      <Collapsible title="12 · Nucleophilic Substitution in Haloarenes" icon={<FlaskConical className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4">
          <SectionBanner label="1. Drastic Conditions (Dow Process)" color="cyan" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            Chlorobenzene can be converted to phenol only under drastic conditions of high temperature and pressure:
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center font-mono text-cyan-300 text-xs">
            {"C₆H₅-Cl + NaOH → (623 K, 300 atm) → C₆H₅-ONa → (H⁺) → C₆H₅-OH"}
          </div>

          <SectionBanner label="2. Nucleophilic Aromatic Substitution (S_NAr)" color="cyan" />
          <p className="text-[13px] text-white/70 leading-relaxed">
            While substitution is generally extremely difficult, addition of strong electron-withdrawing groups (such as <span className="font-bold text-rose-400">-NO₂</span>) at the <strong>ortho</strong> or <strong>para</strong> positions enables substitution via the <strong>S_NAr</strong> mechanism:
          </p>
          <div className="p-4.5 rounded-2xl bg-black/35 border border-white/5 space-y-2 text-[13px]">
            <span className="font-bold text-cyan-400 block uppercase">Addition-Elimination Pathway</span>
            <p className="text-white/70">
              Unlike aliphatic S_N2 (concerted) or S_N1 (carbocation), S_NAr is a two-step addition-elimination process:
            </p>
            <ol className="list-decimal pl-4 space-y-1.5 text-white/60 text-[11px]">
              <li><strong>Addition (Slow/RDS):</strong> The nucleophile attacks the activated carbon, forming a delocalized, negatively-charged cyclohexadienyl anion known as the <strong>Meisenheimer Complex</strong>.</li>
              <li><strong>Elimination (Fast):</strong> The halide leaving group departures, restoring aromaticity.</li>
            </ol>
            <div className="text-[11px] p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg">
              *Crucial IAT Concept:* The rate-determining step is addition (Meisenheimer complex formation). The stronger the electron-withdrawing power at o/p positions, the more stable this anionic intermediate, leading to faster rates.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-[#ffffff]/70 mt-3">
            <div className="p-4 rounded-xl bg-[#090a15] border border-white/5 space-y-1">
              <span className="font-bold text-cyan-400 block">Para-Nitro</span>
              Reactivity increases. Reaction occurs with aqueous NaOH at <strong>443 K</strong>.
            </div>
            <div className="p-4 rounded-xl bg-[#090a15] border border-white/5 space-y-1">
              <span className="font-bold text-amber-400 block">Ortho & Para-Di-Nitro</span>
              Reactivity increases further. Reaction occurs with aqueous Na₂CO₃ at <strong>368 K</strong>.
            </div>
            <div className="p-4 rounded-xl bg-[#090a15] border border-white/5 space-y-1">
              <span className="font-bold text-rose-400 block">Tri-Nitro (Picryl Chloride)</span>
              Reacts simply by <strong>warming with water</strong> to yield Picric Acid (2,4,6-trinitrophenol).
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-[#ffffff]/70">
            <div className="p-4 rounded-xl bg-[#090a15] border border-white/5 space-y-1">
              <span className="font-bold text-cyan-400 block">Para-Nitro</span>
              Reactivity increases. Reaction occurs with aqueous NaOH at <strong>443 K</strong>.
            </div>
            <div className="p-4 rounded-xl bg-[#090a15] border border-white/5 space-y-1">
              <span className="font-bold text-amber-400 block">Ortho & Para-Di-Nitro</span>
              Reactivity increases further. Reaction occurs with aqueous Na₂CO₃ at <strong>368 K</strong>.
            </div>
            <div className="p-4 rounded-xl bg-[#090a15] border border-white/5 space-y-1">
              <span className="font-bold text-rose-400 block">Tri-Nitro (Picryl Chloride)</span>
              Reacts simply by <strong>warming with water</strong> to yield Picric Acid (2,4,6-trinitrophenol).
            </div>
          </div>
          <WarningCard title="Meta Position Non-Activation">
            {"The presence of a nitro group at the meta-position has no activation effect on the leaving group. Resonance structures show that the negative charge generated during nucleophilic attack does not reside on the carbon holding the meta-nitro group, preventing stabilization. This is a crucial distinction for IAT!"}
          </WarningCard>
        </div>
      </Collapsible>

      {/* ─── SECTION 13: ELECTROPHILIC SUBSTITUTION ─────────────────────────── */}
      <Collapsible title="13 · Electrophilic Substitution of Haloarenes" icon={<Atom className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          <p className="text-[13px] text-white/70 leading-relaxed">
            In electrophilic aromatic substitution (EAS), halogens present a unique double effect:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-violet-400 block">Deactivating Effect (-I)</span>
              Because halogens are highly electronegative, they withdraw electron density from the benzene ring via the <strong>inductive effect</strong>, making the ring less reactive than benzene toward electrophiles.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-emerald-400 block">Ortho/Para-Directing Effect (+M)</span>
              The lone pairs on the halogen atom release electron density to the ring via resonance (<strong className="text-emerald-400">+M effect</strong>).
              <div className="text-white/60 text-[11px] mt-1">This increases electron density selectively at ortho and para positions, directing incoming electrophiles to these locations (with para being the major product due to steric factors).</div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 14: POLYHALOGEN COMPOUNDS ──────────────────────────────── */}
      <Collapsible title="14 · Environmental & Health Effects of Polyhalogens" icon={<TrendingUp className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
            {/* Chloroform & Methylene chloride */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-rose-400 block">1. Chloroform (CHCl₃) & Methylene Chloride (CH₂Cl₂)</span>
              <strong>Chloroform:</strong> Slowly oxidizes in air/light to form poisonous <strong>phosgene gas</strong> (carbonyl chloride, COCl₂):
              <div className="font-mono text-rose-300 text-[10px] my-1">{"2 CHCl₃ + O₂ → (Light) → 2 COCl₂ + 2 HCl"}</div>
              Must be stored in dark, full bottles to exclude air.
              <div className="mt-1 text-[13px] text-white/60">
                <strong>Methylene chloride (CH₂Cl₂):</strong> Industrial solvent, paint remover. Causes central nervous system harm, auditory and visual impairment upon exposure.
              </div>
            </div>

            {/* Iodoform & CCl4 */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-amber-400 block">2. Triiodomethane (CHI₃) & Carbon Tetrachloride (CCl₄)</span>
              <strong>Iodoform (CHI₃):</strong> Used as antiseptic; acts due to the <strong>liberation of free iodine</strong>.
              <div className="mt-1 text-[13px] text-white/60">
                <strong>Carbon tetrachloride (CCl₄):</strong> Solvent and cleaning agent, historically used as a fire extinguisher (under name <strong>Pyrene</strong>). Highly toxic to liver. Preparation:
                <div className="font-mono text-amber-300 text-[10px] my-0.5">{"CH₄ + 4 Cl₂ → (hν) → CCl₄ + 4 HCl"}</div>
              </div>
            </div>

            {/* Freons & Naming */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-cyan-400 block">3. Freons (CFCs) & Naming System</span>
              Freons are highly stable chlorofluorocarbons. Homolytically cleave in the stratosphere to release Cl• radicals, destroying ozone.
              <div className="mt-1 text-[13px] text-white/60">
                <strong>Freon-XYZ Naming Rule:</strong>
                <ul className="list-disc pl-4 space-y-0.5 font-mono text-[10px] mt-0.5">
                  <li>X = Carbon atoms - 1 (omit if 0)</li>
                  <li>Y = Hydrogen atoms + 1</li>
                  <li>Z = Fluorine atoms</li>
                </ul>
                Examples:
                <br />• CF₂Cl₂ = <strong>Freon-12</strong> (C=1→X=0; H=0→Y=1; F=2→Z=2)
                <br />• CFCl₃ = <strong>Freon-11</strong> (C=1→X=0; H=0→Y=1; F=1→Z=1)
                <br />• CHF₂Cl = <strong>Freon-22</strong> (C=1→X=0; H=1→Y=2; F=2→Z=2)
              </div>
            </div>

            {/* DDT & Teflon */}
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1.5">
              <span className="font-bold text-pink-400 block">4. DDT & Teflon (PTFE)</span>
              <strong>DDT (p,p’-dichlorodiphenyltrichloroethane):</strong> Stable chlorinated insecticide. Fat-soluble and bioaccumulates in food chains, thinning bird eggshells.
              <div className="mt-1 text-[13px] text-white/60">
                <strong>Teflon (Polytetrafluoroethylene, PTFE):</strong> Formed by radical polymerization of tetrafluoroethylene (CF₂=CF₂):
                <div className="font-mono text-pink-300 text-[10px] my-0.5">{"n CF₂=CF₂ → (Initiator) → -[CF₂-CF₂]ₙ-"}</div>
                Excellent thermal resistance, chemically inert, used in non-stick coatings.
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 15: REACTION CONVERSION MAP ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <Workflow className="w-5 h-5 text-amber-400" />
            15 · Alkyl Halide (R-X) Reaction Conversion Map
          </h2>
          <Tag color="amber">High Yield</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select a reagent below to visualize its conversion mechanism, chemical equation, and clinical synthetic details.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {Object.entries(mapData).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setMapInput(key as any)}
              className={`p-2.5 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition ${mapInput === key ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
            >
              {key.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3.5 text-[13px] text-left">
          <div className="flex flex-wrap justify-between items-center border-b border-white/5 pb-2">
            <div>
              <span className="text-[10px] text-white/40 uppercase block">Reagent / Conditions</span>
              <span className="text-sm font-bold text-amber-400">{md.reagent}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/40 uppercase block">Primary Product</span>
              <span className="text-sm font-bold text-emerald-400">{md.product}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-white/40 uppercase block">Mechanism Type</span>
              <span className="text-white font-semibold">{md.mechanism}</span>
            </div>
            <div>
              <span className="text-[10px] text-white/40 uppercase block">Chemical Equation</span>
              <span className="text-cyan-300 font-mono">{md.equation}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 text-white/70 leading-relaxed">
            <strong className="text-white block mb-0.5 text-[11px] uppercase tracking-wide">Synthetic Detail:</strong>
            {md.details}
          </div>
        </div>
      </div>

      {/* ─── SECTION 16: CONCEPTUAL INSIGHTS & PROBLEMS ─────────────────────── */}
      <Collapsible title="16 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Ambident Nucleophile regiochemistry</Tag>
            <p className="text-white font-bold text-[13px] sm:text-sm">
              {"Why does haloalkane react with KCN to form alkyl cyanide, but with AgCN to form alkyl isocyanide?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. KCN is predominantly ionic. The cyanide ion (CN⁻) has negative charges on both carbon and nitrogen."}</div>
              <div>{"2. Carbon-carbon covalent bonds are significantly stronger than carbon-nitrogen bonds, so nucleophilic attack occurs through carbon, yielding alkyl cyanides."}</div>
              <div>{"3. AgCN is highly covalent. The Ag-C bond is intact, leaving only the lone pair of nitrogen free for nucleophilic attack, producing alkyl isocyanides."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: KCN is ionic (attacks via carbon); AgCN is covalent (attacks via nitrogen)</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Williamson Ether Synthesis Trap</Tag>
            <p className="text-white font-bold text-[13px] sm:text-sm">
              {"Why does treating t-butyl bromide with sodium methoxide yield isobutylene instead of t-butyl methyl ether?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Sodium methoxide is a strong base as well as a nucleophile."}</div>
              <div>{"2. Tertiary alkyl halides are highly sterically hindered, which completely blocks the S_N2 path."}</div>
              <div>{"3. Under strong basic conditions, a tertiary substrate undergoes E2 elimination rather than substitution, yielding isobutylene (2-methylprop-1-ene)."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Strongly basic methoxide drives E2 elimination on tertiary substrates</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Halogen activation positions</Tag>
            <p className="text-white font-bold text-[13px] sm:text-sm">
              {"Explain why picryl chloride (2,4,6-trinitrochlorobenzene) reacts with warm water to form picric acid, whereas chlorobenzene is inert."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Chlorobenzene resists nucleophilic substitution due to resonance stabilization of the C-Cl bond."}</div>
              <div>{"2. Nitro groups (-NO₂) at ortho and para positions are strong electron-withdrawing groups."}</div>
              <div>{"3. They stabilize the negative charge on the Meisenheimer intermediate during attack, dramatically lowering the activation energy."}</div>
              <div>{"4. Having three nitro groups (two ortho, one para) activates the C-Cl bond to such an extent that even a weak nucleophile like warm water easily replaces chloride."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Three electron-withdrawing nitro groups stabilize the substitution transition state</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Carbocation Rearrangement in Solvolysis</Tag>
            <p className="text-white font-bold text-[13px] sm:text-sm">
              {"Predict the major organic product formed when 2-bromo-3-methylbutane undergoes solvolysis in ethanol (EtOH). Explain the mechanism."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-[13px] text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Solvolysis in a polar protic solvent (EtOH) follows the S_N1 mechanism. The first step is the loss of the bromide leaving group to generate a 2° carbocation: CH₃-CH(⁺)-CH(CH₃)₂."}</div>
              <div>{"2. The adjacent carbon has a tertiary hydrogen. To increase stability, a 1,2-hydride shift occurs: CH₃-CH₂-C⁺(CH₃)₂ (forming a highly stable 3° carbocation)."}</div>
              <div>{"3. The weak nucleophile, ethanol, attacks this rearranged 3° carbocation, followed by deprotonation to yield the ether product."}</div>
              <div>{"4. The major product is 2-ethoxy-2-methylbutane."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: 2-Ethoxy-2-methylbutane (formed via a 1,2-hydride shift to yield a 3° carbocation intermediate)</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 17: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="17 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Test your knowledge of Haloalkanes and Haloarenes with this high-yield revision mock test.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following isomers of C₄H₉Br will react the fastest via S_N2 mechanism?',
                a: '1-Bromobutane',
                b: '2-Bromobutane',
                c: '2-Bromo-2-methylpropane',
                d: '1-Bromo-2-methylpropane',
                ans: 'Correct Answer: A. 1-Bromobutane is a primary alkyl halide with the least steric hindrance around the carbon holding the leaving group, making it highly reactive to S_N2 backside attack.'
              },
              {
                q: 'Select the correct order of dipole moments for methyl halides:',
                a: 'CH₃F > CH₃Cl > CH₃Br > CH₃I',
                b: 'CH₃Cl > CH₃F > CH₃Br > CH₃I',
                c: 'CH₃Cl > CH₃Br > CH₃F > CH₃I',
                d: 'CH₃F > CH₃Br > CH₃Cl > CH₃I',
                ans: 'Correct Answer: B. CH₃Cl (1.86 D) > CH₃F (1.847 D) > CH₃Br (1.73 D) > CH₃I (1.63 D). Although fluorine is more electronegative, the carbon-chlorine bond length is much greater, rendering CH₃Cl more dipolar.'
              },
              {
                q: 'The Finkelstein reaction is carried out in dry acetone. What role does the solvent play?',
                a: 'It acts as a catalyst',
                b: 'It dissolves NaCl and NaBr to increase reactivity',
                c: 'It precipitates NaCl and NaBr to shift the equilibrium forward',
                d: 'It protonates the alkyl halide',
                ans: 'Correct Answer: C. Sodium chloride and sodium bromide are insoluble in dry acetone and precipitate out. According to Le Chatelier\'s principle, this precipitation drives the equilibrium toward alkyl iodide formation.'
              },
              {
                q: 'Which reagent is used in the Sandmeyer reaction to prepare Bromobenzene from benzene diazonium chloride?',
                a: 'HBr / Cu powder',
                b: 'HBr / CuBr',
                c: 'FeBr₃',
                d: 'KBr',
                ans: 'Correct Answer: B. The Sandmeyer reaction uses cuprous bromide (CuBr or Cu₂Br₂) in HBr. Using copper powder and HBr is instead called the Gattermann reaction.'
              },
              {
                q: 'What is the major product when 2-bromobutane is treated with alcoholic KOH and heated?',
                a: 'Butan-2-ol',
                b: 'But-1-ene',
                c: 'trans-But-2-ene',
                d: 'cis-But-2-ene',
                ans: 'Correct Answer: C. Alcoholic KOH initiates E2 elimination. Elimination follows Saytzeff\'s rule to give But-2-ene (more substituted alkene) as the major product. The trans isomer is more stable than the cis isomer, making trans-but-2-ene the primary major product.'
              },
              {
                q: 'Why are haloarenes highly unreactive toward S_N1 reactions?',
                a: 'They cannot form a stable planar carbocation',
                b: 'The positive charge would reside on a highly unstable sp² carbon of phenyl ring',
                c: 'Resonance conjugation gives the C-X bond partial double-bond character',
                d: 'All of the above',
                ans: 'Correct Answer: D. All of the above. Phenyl cation is highly unstable as the charge resides on an sp² orbital. Furthermore, resonance gives the C-X bond partial double bond character, increasing its strength.'
              },
              {
                q: 'Under what conditions does the reaction of chlorobenzene with aqueous NaOH occur (Dow Process)?',
                a: 'Room temperature, 1 atm',
                b: '373 K, 10 atm',
                c: '623 K, 300 atm',
                d: 'Picric acid conditions',
                ans: 'Correct Answer: C. Because of the extremely low reactivity of haloarenes, chlorobenzene requires drastic conditions of 623 K and 300 atm to be converted to sodium phenoxide.'
              },
              {
                q: 'Which of the following compounds is converted to a poisonous gas called phosgene when exposed to light and air?',
                a: 'Dichloromethane',
                b: 'Trichloromethane (Chloroform)',
                c: 'Triiodomethane',
                d: 'Carbon tetrachloride',
                ans: 'Correct Answer: B. Chloroform reacts slowly with atmospheric oxygen in the presence of light to form poisonous carbonyl chloride (phosgene, COCl₂).'
              },
              {
                q: 'Picryl chloride represents which of the following compounds?',
                a: 'Chlorobenzene',
                b: '2,4-Dinitrochlorobenzene',
                c: '2,4,6-Trinitrochlorobenzene',
                d: 'Benzene diazonium chloride',
                ans: 'Correct Answer: C. Picryl chloride is 2,4,6-trinitrochlorobenzene, which is highly activated toward nucleophilic attack due to the three strong electron-withdrawing nitro groups.'
              },
              {
                q: 'Grignard reagents are prepared in dry ether because:',
                a: 'Ether is highly polar and reacts with Mg',
                b: 'Moisture destroys the Grignard reagent to form hydrocarbons',
                c: 'Ether acts as a proton donor',
                d: 'Ether precipitates RMgX',
                ans: 'Correct Answer: B. The carbon-magnesium bond is extremely basic. Moisture decomposes it instantly: R-Mg-X + H₂O → R-H + Mg(OH)X. Hence, dry ether must be used as the solvent.'
              }
            ].map((test, index) => (
              <div key={index} className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">{index + 1}</span>
                  <span className="text-white font-bold text-[13px] sm:text-sm">{test.q}</span>
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
        <span className="text-xs text-white/30 font-mono">Haloalkanes & Haloarenes · Unit 12</span>
      </div>

    </div>
  );
}
