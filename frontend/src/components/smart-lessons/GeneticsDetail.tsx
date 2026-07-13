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
      return <strong key={index} className="text-emerald-400">{part}</strong>;
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

export default function GeneticsDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'pea_plant' | 'dna_sample' | 'ecoli_culture' | 'miller_chamber' | 'forensic_tissue'>('pea_plant');
  const [treatment, setTreatment] = useState<'test_cross' | 'uv_mutagen' | 'lac_induce' | 'spark_discharge' | 'southern_blot'>('test_cross');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    if (treatment === 'test_cross' && specimen === 'pea_plant') {
      return {
        outcome: 'Test Cross Phenotypes (1:1 Ratio)',
        color: 'text-cyan-400',
        visualEffect: 'F1 heterozygous plant (Tt) crossed with homozygous recessive dwarf parent (tt).',
        product: '50% Tall (Tt), 50% Dwarf (tt)',
        explanation: 'A test cross is used to determine whether an organism showing a dominant phenotype is homozygous or heterozygous. Crossing Tt with tt yields a 1:1 phenotypic and genotypic ratio. If the test plant was TT, all progeny would be tall.',
        trap: 'Dihybrid test cross yields a 1:1:1:1 ratio (e.g., RrYy x rryy). Do not confuse this with the F2 dihybrid phenotypic ratio of 9:3:3:1.'
      };
    }

    if (treatment === 'uv_mutagen' && specimen === 'dna_sample') {
      return {
        outcome: 'Point Mutation / Thymine Dimer formation',
        color: 'text-rose-400',
        visualEffect: 'UV rays induce covalent linkage between adjacent thymine bases on the same DNA strand.',
        product: 'Mutated template; replication arrest or frame shift',
        explanation: 'Ultraviolet radiation acts as a physical mutagen. It creates cyclobutane pyrimidine dimers (thymine dimers), distorting the DNA double helix. Repair enzymes (excision repair or photolyase) must resolve this to prevent replication blocks.',
        trap: 'Sickle cell anemia is a point mutation (single base substitution GAG ➔ GUG changing Glutamic acid to Valine in beta-globin). Frameshifts involve insertions or deletions not in multiples of 3.'
      };
    }

    if (treatment === 'lac_induce' && specimen === 'ecoli_culture') {
      return {
        outcome: 'Lac Operon Induction (ON state)',
        color: 'text-emerald-400',
        visualEffect: 'Lactose/allolactose binds to the active repressor. Repressor undergoes conformational shift and detaches from the operator.',
        product: 'Beta-galactosidase, Permease, Transacetylase synthesized',
        explanation: 'Lactose acts as an inducer. When it binds to the lac repressor, the repressor can no longer bind the operator. This allows RNA polymerase to bind the promoter and transcribe the structural genes z, y, and a.',
        trap: 'The operon is under negative control because transcription is blocked by default (repressor bound). It is also under positive control via glucose levels (CAP-cAMP binding).'
      };
    }

    if (treatment === 'spark_discharge' && specimen === 'miller_chamber') {
      return {
        outcome: 'Abiotic Synthesis of Organic Monomers',
        color: 'text-amber-400',
        visualEffect: 'Electric spark discharge (75,000V) inside a closed chamber containing CH4, NH3, H2, and H2O vapor at 800°C.',
        product: 'Alanine, Glycine, Aspartic acid, and other organic acids',
        explanation: 'The Miller-Urey experiment (1953) simulated prebiotic conditions hypothesized by Oparin and Haldane. Within a week, the circulating gases combined to form basic amino acids, demonstrating that organic macromolecules could synthesize abiotically.',
        trap: 'The gas ratio is critical: CH4, NH3, H2 in a 2:1:2 ratio. The environment was reducing (no free O2).'
      };
    }

    if (treatment === 'southern_blot' && specimen === 'forensic_tissue') {
      return {
        outcome: 'VNTR Band Hybridization / DNA Profile matching',
        color: 'text-violet-400',
        visualEffect: 'Separated DNA fragments transferred to nitrocellulose membrane, hybridized with radiolabeled VNTR probe, and exposed to X-ray film.',
        product: 'Autoradiogram displaying high-yield DNA bands',
        explanation: 'DNA Fingerprinting relies on polymorphism in satellite DNA. Variable Number of Tandem Repeats (VNTRs) serve as probes. Since VNTR patterns are unique to individuals (except identical twins), matching bands confirm identity.',
        trap: 'Gel electrophoresis separates fragments by size (DNA runs to anode positive terminal because of its negative phosphate backbone). Sizing matches are verified via Southern blot hybridization, not PCR alone.'
      };
    }

    return {
      outcome: 'Reaction conditions did not trigger any specific genetic or evolutionary phenomenon.',
      color: 'text-zinc-400',
      visualEffect: 'Specimen remains unaffected.',
      product: 'None',
      explanation: 'Try matching the correct specimen with its evolutionary or molecular trigger.',
      trap: 'Read the instructions to match genetic specimens with their stimuli.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white genetics-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .genetics-chapter .text-xs { font-size: 13px !important; }
        .genetics-chapter .text-sm { font-size: 15px !important; }
        .genetics-chapter .text-base { font-size: 17.5px !important; }
        .genetics-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .genetics-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .genetics-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .genetics-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .genetics-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 7</Tag>
            <Tag color="rose">High Yield</Tag>
            <Tag color="violet">Genetics & Evolution</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Genetics and Evolution: <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Heritage, Molecules & Life Origin</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Syllabus-aligned comprehensive framework covering Mendelian laws, chromatin packaging, Meselson-Stahl replication, transcription-splicing steps, translation, regulation systems, and prebiotic evolutionary mechanisms.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: PRINCIPLES OF INHERITANCE AND VARIATION ──────────────── */}
      <Collapsible title="1 · Principles of Inheritance and Variation" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Mendel's Laws & One Gene Inheritance" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Laws of Inheritance:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Law of Dominance:</strong> Characters are controlled by discrete units called factors (alleles) that occur in pairs. In a dissimilar pair, one factor dominates the other.</li>
                <li><strong>Law of Segregation:</strong> Alleles do not show blending; they segregate during gamete formation so a gamete receives only one of the two alleles. This is an absolute law with no exceptions.</li>
                <li><strong>Law of Independent Assortment:</strong> When two pairs of traits are combined in a hybrid, segregation of one pair of characters is independent of the other pair. Only holds if genes are on separate chromosomes or far apart on the same chromosome.</li>
              </ul>
            </li>
            <li><strong>Non-Mendelian Ratios (Deviation from 3:1):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Incomplete Dominance:</strong> F1 phenotype lies between parents. Example: <strong className="text-emerald-400">Snapdragon (Antirrhinum majus)</strong> and *Mirabilis jalapa* red (RR) x white (rr) ➔ pink (Rr) flower color. F2 ratio is 1 Red : 2 Pink : 1 White (phenotypic = genotypic ratio of <InlineMath math="1:2:1" />).</li>
                <li><strong>Codominance:</strong> Both alleles are fully expressed in F1. Example: <strong className="text-emerald-400">ABO blood grouping</strong> in humans, controlled by gene <InlineMath math="I" /> (<InlineMath math="I^A" />, <InlineMath math="I^B" /> are codominant over <InlineMath math="i" />).</li>
                <li><strong>Pleiotropy:</strong> A single gene influences multiple phenotypic traits. Example: <strong className="text-emerald-400">Phenylketonuria (PKU)</strong> (defect in phenylalanine hydroxylase gene causes mental retardation, skin depigmentation, and hair reduction). In peas, starch grain size and seed shape are controlled by one gene (BB large, bb small, Bb intermediate starch size but round shape).</li>
              </ul>
            </li>
          </ul>

          {/* SVG 1: Dihybrid Cross Punnett Square */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 250" className="w-full max-w-md bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">DIHYBRID CROSS PUNNETT SQUARE</text>
              
              {/* Grid 4x4 */}
              <g transform="translate(110, 40)">
                {/* Headers */}
                <text x="20" y="-10" fill="#eab308" fontSize="8" textAnchor="middle">RY</text>
                <text x="60" y="-10" fill="#eab308" fontSize="8" textAnchor="middle">Ry</text>
                <text x="100" y="-10" fill="#eab308" fontSize="8" textAnchor="middle">rY</text>
                <text x="140" y="-10" fill="#eab308" fontSize="8" textAnchor="middle">ry</text>
                
                <text x="-15" y="25" fill="#f43f5e" fontSize="8" textAnchor="middle">RY</text>
                <text x="-15" y="65" fill="#f43f5e" fontSize="8" textAnchor="middle">Ry</text>
                <text x="-15" y="105" fill="#f43f5e" fontSize="8" textAnchor="middle">rY</text>
                <text x="-15" y="145" fill="#f43f5e" fontSize="8" textAnchor="middle">ry</text>

                {/* Rows & columns */}
                <rect x="0" y="0" width="160" height="160" fill="none" stroke="#ffffff" strokeWidth="1" />
                <line x1="40" y1="0" x2="40" y2="160" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="80" y1="0" x2="80" y2="160" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="120" y1="0" x2="120" y2="160" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="0" y1="40" x2="160" y2="40" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="0" y1="80" x2="160" y2="80" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="0" y1="120" x2="160" y2="120" stroke="#ffffff" strokeWidth="0.8" />

                {/* Ratios text */}
                <text x="20" y="25" fill="#a78bfa" fontSize="7" textAnchor="middle">RRYY</text>
                <text x="60" y="25" fill="#a78bfa" fontSize="7" textAnchor="middle">RRYy</text>
                <text x="100" y="25" fill="#a78bfa" fontSize="7" textAnchor="middle">RrYY</text>
                <text x="140" y="25" fill="#a78bfa" fontSize="7" textAnchor="middle">RrYy</text>

                <text x="20" y="65" fill="#a78bfa" fontSize="7" textAnchor="middle">RRYy</text>
                <text x="60" y="65" fill="#a78bfa" fontSize="7" textAnchor="middle">RRyy</text>
                <text x="100" y="65" fill="#a78bfa" fontSize="7" textAnchor="middle">RrYy</text>
                <text x="140" y="65" fill="#a78bfa" fontSize="7" textAnchor="middle">Rryy</text>

                <text x="20" y="105" fill="#a78bfa" fontSize="7" textAnchor="middle">RrYY</text>
                <text x="60" y="105" fill="#a78bfa" fontSize="7" textAnchor="middle">RrYy</text>
                <text x="100" y="105" fill="#a78bfa" fontSize="7" textAnchor="middle">rrYY</text>
                <text x="140" y="105" fill="#a78bfa" fontSize="7" textAnchor="middle">rrYy</text>

                <text x="20" y="145" fill="#a78bfa" fontSize="7" textAnchor="middle">RrYy</text>
                <text x="60" y="145" fill="#a78bfa" fontSize="7" textAnchor="middle">Rryy</text>
                <text x="100" y="145" fill="#a78bfa" fontSize="7" textAnchor="middle">rrYy</text>
                <text x="140" y="145" fill="#a78bfa" fontSize="7" textAnchor="middle">rryy</text>
              </g>

              {/* Ratios description */}
              <text x="10" y="70" fill="#10b981" fontSize="9" fontWeight="bold">Phenotypic Ratio:</text>
              <text x="10" y="90" fill="#ffffff" fontSize="8">Round-Yellow: 9</text>
              <text x="10" y="105" fill="#ffffff" fontSize="8">Round-Green: 3</text>
              <text x="10" y="120" fill="#ffffff" fontSize="8">Wrinkled-Yellow: 3</text>
              <text x="10" y="135" fill="#ffffff" fontSize="8">Wrinkled-Green: 1</text>
            </svg>
          </div>

          <SectionBanner label="2. Inheritance of Two Genes & Linkage" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Chromosomal Theory:</strong> Proposed by <strong className="text-emerald-400">Sutton and Boveri (1902)</strong>. Stated that the behavior of chromosomes is parallel to the behavior of genes and used chromosome movement to explain Mendel’s laws.</li>
            <li><strong>Linkage & Recombination:</strong> Discovered by <strong className="text-emerald-400">T.H. Morgan (1910)</strong> working on *Drosophila melanogaster*. 
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Linkage:</strong> Physical association of genes on a chromosome. Tightly linked genes show very low recombination (e.g., yellow body and white eye in Drosophila showed only 1.3% recombination).</li>
                <li><strong>Recombination:</strong> Generation of non-parental gene combinations (e.g., white eye and miniature wing showed 37.2% recombination).</li>
                <li><strong>Gene Mapping:</strong> <strong className="text-emerald-400">Alfred Sturtevant</strong> mapped the position of genes on chromosomes using recombination frequency (<InlineMath math="1\% \text{ recombination} = 1\text{ cM}" />).</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="3. Sex Determination Systems" color="cyan" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Sex System</th>
                  <th className="p-2.5 text-cyan-400">Mechanism Details</th>
                  <th className="p-2.5 text-emerald-400">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">XX / XY</td>
                  <td className="p-2.5">Male heterogamety. Males produce two types of gametes (X and Y); females are homogametic (XX).</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Humans, Drosophila</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">XX / XO</td>
                  <td className="p-2.5">Male heterogamety. Males have only one X chromosome (XO); females have two (XX).</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Grasshoppers</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">ZZ / ZW</td>
                  <td className="p-2.5">Female heterogamety. Females produce two types of gametes (Z and W); males are homogametic (ZZ).</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Birds, some butterflies</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Haplodiploidy</td>
                  <td className="p-2.5">Male develops parthenogenetically from unfertilized eggs and is haploid (<InlineMath math="n=16" />). Females are diploid (<InlineMath math="2n=32" />). Males produce sperms by mitosis.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Honeybees</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="4. Genetic Disorders Classification" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Mendelian Disorders:</strong> Caused by alteration or mutation in a single gene.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Hemophilia:</strong> Sex-linked recessive disorder. A single protein involved in clotting is affected; patient bleeds continuously from a minor cut.</li>
                <li><strong>Sickle-cell Anemia:</strong> Autosomal recessive. Point mutation at 6th codon of beta-globin gene: <InlineMath math="\text{GAG} \rightarrow \text{GUG}" />. Changes amino acid <strong className="text-emerald-400">Glutamic acid ➔ Valine</strong>. Causes sickle-shaped RBCs under low oxygen tension.</li>
                <li><strong>Color Blindness:</strong> Sex-linked recessive. Defect in red/green cone cells of eye; fails to distinguish red from green. Affects 8% of males and 0.4% of females.</li>
                <li><strong>Phenylketonuria (PKU):</strong> Autosomal recessive. Inborn error of metabolism. Lack of enzyme phenylalanine hydroxylase converts phenylalanine to phenylpyruvic acid, causing mental retardation.</li>
                <li><strong>Thalassemia:</strong> Autosomal recessive. Quantitative defect of globin synthesis (<InlineMath math="\alpha" /> or <InlineMath math="\beta" />). Reduces synthesis of hemoglobin chains.</li>
              </ul>
            </li>
            <li><strong>Chromosomal Disorders:</strong> Caused by excess, absence, or abnormal arrangement of chromosomes due to segregation failure (aneuploidy) or cytokinesis failure (polyploidy).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Down's Syndrome:</strong> Trisomy of chromosome 21 (<InlineMath math="2n+1 = 47" />). Features: short stature, furrowed tongue, partially open mouth, mental retardation.</li>
                <li><strong>Klinefelter's Syndrome:</strong> Presence of an additional X chromosome in males (<InlineMath math="44+\text{XXY} = 47" />). Sterile males with feminine characters like development of breasts (<strong className="text-emerald-400">gynaecomastia</strong>).</li>
                <li><strong>Turner's Syndrome:</strong> Absence of one X chromosome in females (<InlineMath math="44+\text{XO} = 45" />). Sterile females with rudimentary ovaries and lack of secondary sexual characters.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="5. Mutation Types & Mutagens" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Gene Mutation:</strong> Change in a single base pair is a <strong className="text-emerald-400">point mutation</strong> (e.g., Sickle-cell anemia where codon GAG changes to GUG). <strong className="text-emerald-400">Frameshift mutations</strong> involve insertion or deletion of one or more base pairs (not in multiples of 3), changing the entire reading frame down-stream (e.g., in some forms of thalassemia).</li>
            <li><strong>Chromosomal Aberrations:</strong> Structural modifications of chromosomes:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Deletion:</strong> Loss of a segment (e.g., Cri-du-chat syndrome caused by deletion on chromosome 5).</li>
                <li><strong>Duplication:</strong> Repeating a segment.</li>
                <li><strong>Inversion:</strong> Reversal of segment orientation.</li>
                <li><strong>Translocation:</strong> Transfer of a segment to a non-homologous chromosome (e.g., Philadelphia chromosome translocation between 9 and 22 in Chronic Myeloid Leukemia).</li>
              </ul>
            </li>
            <li><strong>Numerical Aberrations:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Aneuploidy:</strong> Failure of chromatid segregation during cell division, causing gain or loss of a chromosome (e.g., Down's <InlineMath math="2n+1" />, Turner's <InlineMath math="2n-1" />).</li>
                <li><strong>Polyploidy:</strong> Failure of cytokinesis after telophase, resulting in increase in a whole set of chromosomes (common in plants).</li>
              </ul>
            </li>
            <li><strong>Mutagens:</strong> Agents that induce mutations:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Physical Mutagens:</strong> Ionizing radiations (X-rays, gamma rays) and non-ionizing radiation like <strong className="text-emerald-400">UV light</strong> (causes thymine dimers).</li>
                <li><strong>Chemical Mutagens:</strong> Base analogs (e.g., 5-Bromouracil), alkylating agents (mustard gas), and deaminating agents (nitrous acid).</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="6. Pedigree Analysis & Inheritance Patterns" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Pedigree Key Symbols:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Square:</strong> Male.</li>
                <li><strong>Circle:</strong> Female.</li>
                <li><strong>Shaded Symbol:</strong> Affected individual.</li>
                <li><strong>Diamond:</strong> Sex unspecified.</li>
                <li><strong>Horizontal Line between symbols:</strong> Mating. Double horizontal line indicates consanguineous mating (between relatives).</li>
              </ul>
            </li>
            <li><strong>Inheritance Rules:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Autosomal Dominant:</strong> Affected individuals have at least one affected parent. Does not skip generations. Affected parents can have unaffected children if parents are heterozygous. (e.g., Myotonic dystrophy, Huntington's chorea).</li>
                <li><strong>Autosomal Recessive:</strong> Can skip generations (unaffected parents can have affected offspring). Both parents of an affected child must be carriers (heterozygous). (e.g., Sickle-cell anemia, Albinism).</li>
                <li><strong>Sex-Linked Recessive:</strong> Shows criss-cross inheritance (carrier mother passes to son, affected father passes to carrier daughter). Much more common in males. Affected females must have an affected father. (e.g., Hemophilia, Color Blindness).</li>
                <li><strong>Sex-Linked Dominant:</strong> Affected father passes to all of his daughters but none of his sons. Affected mother passes to 50% of offspring. (e.g., Vitamin D-resistant rickets).</li>
              </ul>
            </li>
          </ul>

          {/* SVG 11: Pedigree Chart Schema */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 150" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">PEDIGREE CHART: AUTOSOMAL RECESSIVE</text>
              
              {/* Generation I */}
              <text x="20" y="55" fill="#ffffff" fontSize="9" fontWeight="bold">I</text>
              <rect x="80" y="40" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="2" />
              <line x1="100" y1="50" x2="140" y2="50" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="150" cy="50" r="10" fill="none" stroke="#22d3ee" strokeWidth="2" />
              
              {/* Branch to Gen II */}
              <line x1="120" y1="50" x2="120" y2="80" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="60" y1="80" x2="220" y2="80" stroke="#ffffff" strokeWidth="1.5" />

              {/* Generation II */}
              <text x="20" y="105" fill="#ffffff" fontSize="9" fontWeight="bold">II</text>
              
              <circle cx="60" cy="105" r="10" fill="none" stroke="#22d3ee" strokeWidth="2" />
              <line x1="60" y1="80" x2="60" y2="95" stroke="#ffffff" strokeWidth="1.5" />

              <rect x="110" y="95" width="20" height="20" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
              <line x1="120" y1="80" x2="120" y2="95" stroke="#ffffff" strokeWidth="1.5" />

              <rect x="160" y="95" width="20" height="20" fill="none" stroke="#22d3ee" strokeWidth="2" />
              <line x1="170" y1="80" x2="170" y2="95" stroke="#ffffff" strokeWidth="1.5" />

              <circle cx="220" cy="105" r="10" fill="#ef4444" stroke="#ef4444" strokeWidth="2" />
              <line x1="220" y1="80" x2="220" y2="95" stroke="#ffffff" strokeWidth="1.5" />

              {/* Labels */}
              <text x="120" y="132" fill="#ef4444" fontSize="8" textAnchor="middle">Affected (aa)</text>
              <text x="270" y="55" fill="#22d3ee" fontSize="8">Carrier Parents (Aa x Aa)</text>
              <text x="270" y="105" fill="#ffffff" fontSize="8">Unaffected Siblings (A-)</text>
            </svg>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 2: MOLECULAR BASIS OF INHERITANCE ────────────────────────── */}
      <Collapsible title="2 · Molecular Basis of Inheritance" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Watson-Crick DNA Double Helix Structure" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Key Dimensions of B-DNA:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Strand Directionality:</strong> Two polynucleotide chains running in antiparallel directions (one <InlineMath math="5' \rightarrow 3'" />, the other <InlineMath math="3' \rightarrow 5'" />).</li>
                <li><strong>Helical Pitch:</strong> Right-handed helix with a pitch of <strong className="text-emerald-400">34 Å</strong> (3.4 nm) per complete turn, containing <strong className="text-emerald-400">10 base pairs</strong> (yielding 3.4 Å distance between adjacent base pairs).</li>
                <li><strong>Diameter & Grooves:</strong> Uniform diameter of <strong className="text-emerald-400">20 Å</strong> (2.0 nm). Possesses a prominent <strong className="text-emerald-400">major groove</strong> (site for sequence-specific protein binding) and a narrower <strong className="text-emerald-400">minor groove</strong>.</li>
                <li><strong>Hydrogen Bonding & Base Pairing:</strong> Adenine pairs with Thymine (<InlineMath math="\text{A}=\text{T}" />) via 2 hydrogen bonds; Guanine pairs with Cytosine (<InlineMath math="\text{G}\equiv\text{C}" />) via 3 hydrogen bonds. Purines always pair with pyrimidines to maintain constant width.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 12: Watson-Crick DNA Double Helix Structure */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 160" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">B-DNA DOUBLE HELIX DIMENSIONS</text>
              
              {/* Double strand curves */}
              <path d="M 100 50 Q 150 110 200 50 T 300 50" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
              <path d="M 100 90 Q 150 30 200 90 T 300 90" fill="none" stroke="#10b981" strokeWidth="2.5" />
              
              {/* H-bonds rungs */}
              <line x1="125" y1="67" x2="125" y2="73" stroke="#eab308" strokeWidth="1.5" strokeDasharray="1.5" />
              <line x1="150" y1="80" x2="150" y2="60" stroke="#eab308" strokeWidth="1.5" strokeDasharray="1.5" />
              <line x1="175" y1="73" x2="175" y2="67" stroke="#eab308" strokeWidth="1.5" strokeDasharray="1.5" />
              <line x1="200" y1="50" x2="200" y2="90" stroke="#eab308" strokeWidth="1.5" strokeDasharray="1.5" />
              <line x1="225" y1="58" x2="225" y2="82" stroke="#eab308" strokeWidth="1.5" strokeDasharray="1.5" />
              <line x1="250" y1="70" x2="250" y2="70" stroke="#eab308" strokeWidth="1.5" strokeDasharray="1.5" />
              
              {/* Labels */}
              <text x="150" y="45" fill="#a78bfa" fontSize="8" textAnchor="middle">5' ➔ 3' Strand</text>
              <text x="150" y="105" fill="#10b981" fontSize="8" textAnchor="middle">3' ➔ 5' Strand</text>
              <text x="200" y="112" fill="#eab308" fontSize="8" textAnchor="middle">H-Bonds (A=T, G≡C)</text>
              
              {/* Dimension indicators */}
              <line x1="100" y1="125" x2="200" y2="125" stroke="#ffffff" strokeWidth="0.8" />
              <text x="150" y="138" fill="#ffffff" fontSize="8" textAnchor="middle">Pitch = 34 Å (10 bp)</text>
              <line x1="290" y1="40" x2="290" y2="100" stroke="#ffffff" strokeWidth="0.8" />
              <text x="330" y="75" fill="#ffffff" fontSize="8">Diameter = 20 Å</text>
            </svg>
          </div>

          <SectionBanner label="2. DNA Packaging & Chromatin" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Nucleosome Core:</strong> DNA is acidic and negatively charged due to phosphate groups. It wraps around a basic, positively charged histone octamer.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Histones:</strong> Rich in basic amino acids <strong className="text-emerald-400">Lysine</strong> and <strong className="text-emerald-400">Arginine</strong>.</li>
                <li><strong>Octamer Core:</strong> Composed of two molecules each of H2A, H2B, H3, and H4.</li>
                <li><strong>Linker Histone (H1):</strong> Binds the entry/exit site of DNA wrapping.</li>
                <li><strong>Base Pairs:</strong> A typical nucleosome contains about <strong>200 bp</strong> of DNA helix.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 2: Nucleosome Structure */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">NUCLEOSOME PACKAGING</text>
              
              {/* Histone Octamer Core */}
              <circle cx="200" cy="100" r="35" fill="#1e1b4b" stroke="#eab308" strokeWidth="3" />
              
              {/* DNA Wrap */}
              <path d="M 160 100 A 40 40 0 1 1 240 100 A 40 40 0 1 1 160 100" fill="none" stroke="#a78bfa" strokeWidth="4.5" strokeDasharray="3" />
              
              {/* H1 Histone Linker */}
              <rect x="235" y="80" width="15" height="40" rx="3" fill="#10b981" stroke="#ffffff" strokeWidth="1" />

              {/* Labels */}
              <text x="200" y="103" fill="#eab308" fontSize="8" textAnchor="middle">Histone Octamer</text>
              <text x="285" y="70" fill="#10b981" fontSize="9">H1 Histone</text>
              <path d="M 280 75 L 252 90" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2" />

              <text x="110" y="80" fill="#a78bfa" fontSize="9">DNA Double Helix</text>
              <path d="M 125 85 L 165 95" stroke="#a78bfa" strokeWidth="0.8" strokeDasharray="2" />
            </svg>
          </div>

          <SectionBanner label="2. Search for Genetic Material" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Griffith's Transforming Principle (1928):</strong> Worked on *Streptococcus pneumoniae*. 
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>S-strain (smooth, polysaccharide coat, virulent) ➔ Mice Die.</li>
                <li>R-strain (rough, non-capsulated, non-virulent) ➔ Mice Live.</li>
                <li>Heat-killed S-strain ➔ Mice Live.</li>
                <li>Heat-killed S + Live R-strain ➔ Mice Die (live S-strain recovered from dead mice). Concluded that some factor transformed R to S.</li>
              </ul>
            </li>
            <li><strong>Avery, MacLeod, and McCarty (1933-44):</strong> Proved that the transforming chemical was DNA. Digestion with <strong className="text-emerald-400">DNase</strong> blocked transformation, while Proteases and RNases had no effect.</li>
            <li><strong>Hershey-Chase Experiment (1952):</strong> Final proof using bacteriophage T2 and *E. coli*.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Phages grown on medium with <strong className="text-emerald-400"><InlineMath math="^{32}\text{P}" /></strong> (labels DNA) transfer radioactivity to bacteria pellet.</li>
                <li>Phages grown on medium with <strong className="text-rose-400"><InlineMath math="^{35}\text{S}" /></strong> (labels protein coat) keep radioactivity in the supernatant.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 3: Hershey Chase Scheme */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 180" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="250" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">HERSHEY-CHASE EXPERIMENT PROTOCOL</text>
              
              {/* S-35 protein label */}
              <g transform="translate(10, 30)">
                <text x="100" y="20" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">35S labeled Protein coat</text>
                <circle cx="100" cy="50" r="15" fill="none" stroke="#f43f5e" strokeWidth="2" />
                {/* centifuge tube */}
                <path d="M 90 90 L 90 120 L 100 135 L 110 120 L 110 90 Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="120" y="105" fill="#f43f5e" fontSize="7">Supernatant (radioactive)</text>
                <text x="120" y="125" fill="#94a3b8" fontSize="7">Pellet (non-radioactive)</text>
              </g>

              {/* P-32 DNA label */}
              <g transform="translate(250, 30)">
                <text x="100" y="20" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">32P labeled DNA core</text>
                <circle cx="100" cy="50" r="15" fill="#10b981" stroke="#10b981" strokeWidth="2" />
                {/* centifuge tube */}
                <path d="M 90 90 L 90 120 L 100 135 L 110 120 L 110 90 Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="120" y="105" fill="#94a3b8" fontSize="7">Supernatant (non-radioactive)</text>
                <text x="120" y="125" fill="#10b981" fontSize="7">Pellet (radioactive)</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="3. RNA World Hypothesis & RNA Types" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>RNA World Hypothesis:</strong> Proposes that RNA was the first genetic material. Essential life processes (metabolism, splicing, translation) evolved around RNA.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Evidence:</strong> RNA can store genetic information (like DNA) and act as a catalyst/enzyme (like proteins, known as <strong className="text-emerald-400">ribozymes</strong>).</li>
                <li><strong>Stability:</strong> DNA evolved from RNA with chemical modifications (deoxyribose instead of ribose, thymine instead of uracil) to be structurally more stable and less reactive, resisting enzymatic degradation.</li>
              </ul>
            </li>
          </ul>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">RNA Type</th>
                  <th className="p-2.5 text-cyan-400">Structure / Features</th>
                  <th className="p-2.5 text-emerald-400">Biological Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">mRNA (Messenger)</td>
                  <td className="p-2.5">Linear strand; contains coding sequences (codons), 5&apos; cap, 3&apos; poly-A tail, and UTRs (Untranslated Regions).</td>
                  <td className="p-2.5 text-emerald-400">Acts as template for protein synthesis; carries genetic message from DNA to ribosome.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">tRNA (Transfer)</td>
                  <td className="p-2.5">Cloverleaf 2D structure (Holley model), L-shaped 3D structure. Has an <strong className="text-emerald-400">anticodon loop</strong> and an <strong className="text-emerald-400">amino acid acceptor stem (CCA-3&apos;)</strong>.</td>
                  <td className="p-2.5 text-emerald-400">Acts as adapter molecule; reads codons and transfers corresponding amino acids during translation.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">rRNA (Ribosomal)</td>
                  <td className="p-2.5">Highly folded; structural and catalytic component of ribosomes (e.g., 23S rRNA in prokaryotes).</td>
                  <td className="p-2.5 text-emerald-400">Provides structural framework and acts as <strong className="text-emerald-400">peptidyl transferase</strong> catalyst (ribozyme) for peptide bond formation.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SVG 13: tRNA Cloverleaf Structure */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 200" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">tRNA CLOVERLEAF 2D STRUCTURE</text>
              
              {/* Cloverleaf arms */}
              <line x1="170" y1="35" x2="170" y2="70" stroke="#a78bfa" strokeWidth="2" />
              <line x1="180" y1="30" x2="180" y2="70" stroke="#10b981" strokeWidth="2" />
              <text x="180" y="28" fill="#10b981" fontSize="8" fontWeight="bold">CCA-3'</text>
              <text x="156" y="38" fill="#a78bfa" fontSize="8">5'</text>

              <path d="M 170 85 L 120 85 A 15 15 0 1 1 120 105 L 170 105" fill="none" stroke="#a78bfa" strokeWidth="2" />
              <text x="95" y="100" fill="#a78bfa" fontSize="8">D-Loop</text>

              <path d="M 180 85 L 230 85 A 15 15 0 1 0 230 105 L 180 105" fill="none" stroke="#10b981" strokeWidth="2" />
              <text x="250" y="100" fill="#10b981" fontSize="8">TψC Loop</text>

              <path d="M 170 105 L 170 150 A 15 15 0 1 1 180 150 L 180 105" fill="none" stroke="#eab308" strokeWidth="2" />
              <text x="175" y="182" fill="#eab308" fontSize="8" textAnchor="middle">Anticodon Loop</text>

              <circle cx="175" cy="95" r="10" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
            </svg>
          </div>

          <SectionBanner label="4. DNA Replication Machinery" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Semiconservative replication:</strong> Proved by <strong className="text-emerald-400">Meselson and Stahl (1958)</strong> using E. coli grown in heavier isotope <strong className="text-emerald-400"><InlineMath math="^{15}\text{N}" /></strong> and transferring to lighter <strong className="text-emerald-400"><InlineMath math="^{14}\text{N}" /></strong>. Centrifuged in <strong className="text-emerald-400">Cesium Chloride (CsCl)</strong> density gradient.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Generation I (after 20 mins): Hybrid density (<InlineMath math="^{14}\text{N}/^{15}\text{N}" />).</li>
                <li>Generation II (after 40 mins): Equal amounts of hybrid and light DNA.</li>
              </ul>
            </li>
            <li><strong>Replication Fork Enzymes:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Helicase:</strong> Unwinds the double helix at the origin of replication (ori).</li>
                <li><strong>SSB Proteins:</strong> Stabilize single-stranded DNA to prevent reannealing.</li>
                <li><strong>RNA Primase:</strong> Synthesizes short RNA primers to provide a 3'-OH end.</li>
                <li><strong>DNA Polymerase III:</strong> Synthesizes new strands in the <strong>5&apos; ➔ 3&apos;</strong> direction. Highly processive.</li>
                <li><strong>DNA Polymerase I:</strong> Removes RNA primers and replaces them with DNA nucleotides.</li>
                <li><strong>DNA Ligase:</strong> Seals nicks by joining Okazaki fragments on the lagging strand.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 4: Replication Fork */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 200" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">DNA REPLICATION FORK</text>
              
              {/* Unwound strands */}
              <path d="M 40 70 L 180 70 L 320 40" fill="none" stroke="#ffffff" strokeWidth="2.5" />
              <path d="M 40 130 L 180 130 L 320 160" fill="none" stroke="#ffffff" strokeWidth="2.5" />
              
              {/* Leading strand synthesis */}
              <path d="M 180 60 L 300 30" fill="none" stroke="#10b981" strokeWidth="2" />
              <polygon points="300,28 305,30 300,32" fill="#10b981" />
              
              {/* Lagging strand Okazaki fragments */}
              <path d="M 190 140 L 220 148" fill="none" stroke="#ef4444" strokeWidth="2" />
              <path d="M 240 145 L 270 152" fill="none" stroke="#ef4444" strokeWidth="2" />
              <path d="M 280 150 L 310 157" fill="none" stroke="#ef4444" strokeWidth="2" />

              {/* Helicase block */}
              <rect x="165" y="80" width="30" height="40" rx="3" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
              <text x="180" y="103" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">Helicase</text>

              {/* Labels */}
              <text x="330" y="38" fill="#ffffff" fontSize="9">3' Template</text>
              <text x="330" y="165" fill="#ffffff" fontSize="9">5' Template</text>
              <text x="240" y="20" fill="#10b981" fontSize="9">Leading Strand (Continuous)</text>
              <text x="240" y="185" fill="#ef4444" fontSize="9">Lagging Strand (Okazaki fragments)</text>
            </svg>
          </div>

          <SectionBanner label="5. Transcription & Post-Transcriptional Splicing" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Transcription Unit:</strong> Comprises a <strong className="text-emerald-400">Promoter</strong> (binds RNA polymerase and transcription factors at 5' end), <strong className="text-emerald-400">Structural gene</strong> (template/coding strands), and <strong className="text-emerald-400">Terminator</strong> (ends transcription at 3' end).</li>
            <li><strong>Eukaryotic Processing:</strong> The primary transcript (hnRNA) is non-functional and must undergo:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Splicing:</strong> Introns (non-coding sequences) are removed and exons (coding sequences) are joined by spliceosomes.</li>
                <li><strong>Capping:</strong> Methylguanosine triphosphate (<InlineMath math="^{7m}\text{Gppp}" />) is added to the 5&apos; end.</li>
                <li><strong>Tailing:</strong> Adenylate residues (200–300) are added to the 3&apos; end in a template-independent manner (poly-A tail).</li>
              </ul>
            </li>
          </ul>

          {/* SVG 5: Splicing */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 160" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">EUKARYOTIC TRANSCRIPT SPLICING</text>
              
              {/* Primary transcript hnRNA */}
              <g transform="translate(30, 40)">
                <rect x="0" y="10" width="390" height="16" rx="4" fill="#3b0764" stroke="#ffffff" strokeWidth="1" />
                {/* Exons in green */}
                <rect x="0" y="10" width="80" height="16" rx="2" fill="#10b981" />
                <rect x="150" y="10" width="90" height="16" rx="2" fill="#10b981" />
                <rect x="300" y="10" width="90" height="16" rx="2" fill="#10b981" />
                {/* Labels */}
                <text x="40" y="21" fill="#ffffff" fontSize="8" textAnchor="middle">Exon 1</text>
                <text x="115" y="21" fill="#d8b4fe" fontSize="8" textAnchor="middle">Intron 1</text>
                <text x="195" y="21" fill="#ffffff" fontSize="8" textAnchor="middle">Exon 2</text>
                <text x="270" y="21" fill="#d8b4fe" fontSize="8" textAnchor="middle">Intron 2</text>
                <text x="345" y="21" fill="#ffffff" fontSize="8" textAnchor="middle">Exon 3</text>
              </g>

              {/* Spliced mRNA */}
              <g transform="translate(30, 100)">
                <rect x="0" y="10" width="390" height="16" rx="4" fill="#10b981" stroke="#ffffff" strokeWidth="1" />
                {/* Cap & Tail */}
                <rect x="-10" y="6" width="18" height="24" rx="4" fill="#ef4444" />
                <text x="-1" y="21" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">Cap</text>
                
                <rect x="382" y="6" width="22" height="24" rx="4" fill="#3b82f6" />
                <text x="393" y="21" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">Tail</text>

                <text x="195" y="21" fill="#ffffff" fontSize="8" textAnchor="middle">Mature mRNA (Exons joined)</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="6. The Genetic Code" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Genetic Code Properties:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Triplet:</strong> 61 codons code for amino acids; 3 stop codons (UAA, UAG, UGA) do not code.</li>
                <li><strong>Degenerate/Redundant:</strong> Some amino acids are coded by more than one codon (e.g., Leucine, Serine).</li>
                <li><strong>Non-overlapping & Commaless:</strong> Read in a continuous fashion without punctuation.</li>
                <li><strong>Universal:</strong> From bacteria to humans, UUU codes for Phenylalanine (with minor mitochondrial exceptions).</li>
                <li><strong>Initiation Codon:</strong> <strong className="text-emerald-400">AUG</strong> codes for Methionine and acts as the start signal.</li>
                <li><strong>Wobble Hypothesis:</strong> Explains how a single tRNA anticodon can recognize multiple codon triplets due to flexible pairing at the third codon base.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="7. Ribosomal Translation Mechanism" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>tRNA Charging (Aminoacylation):</strong> Amino acids are activated in the presence of ATP and linked to their cognate tRNA by the enzyme <strong className="text-emerald-400">aminoacyl-tRNA synthetase</strong> to form aminoacyl-tRNA. This charging is a prerequisite for translation.</li>
            <li><strong>Ribosomal Subunits & Catalysis:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Prokaryotic ribosome is <strong className="text-emerald-400">70S</strong> (50S large and 30S small subunits). Eukaryotic is <strong className="text-emerald-400">80S</strong> (60S and 40S).</li>
                <li>The ribosome consists of structural rRNAs and over 80 proteins. It acts as an enzyme: in bacteria, the <strong className="text-emerald-400">23S rRNA</strong> acts as the ribozyme <strong className="text-emerald-400">peptidyl transferase</strong> that catalyzes peptide bond formation between amino acids.</li>
              </ul>
            </li>
            <li><strong>Active Ribosomal Sites:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>A Site (Aminoacyl):</strong> Decodes mRNA and binds incoming charged aminoacyl-tRNA.</li>
                <li><strong>P Site (Peptidyl):</strong> Holds the tRNA carrying the growing polypeptide chain.</li>
                <li><strong>E Site (Exit):</strong> Binds the uncharged, deacylated tRNA before it is released from the ribosome.</li>
              </ul>
            </li>
            <li><strong>Translation Steps:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Initiation:</strong> Small subunit binds mRNA at start codon (AUG); initiator methionyl-tRNA (charged with Met) binds P site. Large subunit then associates.</li>
                <li><strong>Elongation:</strong> New charged tRNA enters A site. Peptide bond forms between P-site amino acid and A-site amino acid. Ribosome translocates by one codon (5' ➔ 3'), moving P-site tRNA to E site and A-site tRNA to P site.</li>
                <li><strong>Termination:</strong> A stop codon (UAA, UAG, UGA) enters A site. No tRNA binds; instead, a <strong className="text-emerald-400">release factor</strong> binds, causing hydrolysis and release of the polypeptide chain.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 14: Translation Ribosome Complex */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">TRANSLATION AT RIBOSOME COMPLEX</text>
              
              {/* Ribosome outline */}
              <path d="M 100 80 C 100 30, 320 30, 320 80 Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              <rect x="100" y="100" width="220" height="30" rx="6" fill="#334155" stroke="#ffffff" strokeWidth="1.5" />

              {/* mRNA Strand */}
              <line x1="60" y1="95" x2="360" y2="95" stroke="#10b981" strokeWidth="3" />
              <text x="70" y="108" fill="#10b981" fontSize="7" fontWeight="bold">mRNA 5' ➔ 3'</text>

              {/* Ribosomal Sites */}
              <rect x="130" y="55" width="40" height="40" rx="3" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
              <text x="150" y="78" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">E</text>

              <rect x="190" y="55" width="40" height="40" rx="3" fill="#eab308" fillOpacity="0.2" stroke="#eab308" strokeWidth="1" />
              <text x="210" y="78" fill="#eab308" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>

              <rect x="250" y="55" width="40" height="40" rx="3" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1" />
              <text x="270" y="78" fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>

              {/* Growing Polypeptide Chain */}
              <circle cx="210" cy="35" r="5" fill="#f43f5e" />
              <circle cx="210" cy="23" r="5" fill="#f43f5e" />
              <circle cx="210" cy="11" r="5" fill="#f43f5e" />
              <path d="M 210 50 L 210 40" stroke="#f43f5e" strokeWidth="1.5" />

              {/* Labels */}
              <text x="280" y="150" fill="#3b82f6" fontSize="8">Incoming tRNA</text>
              <text x="130" y="150" fill="#ef4444" fontSize="8">Uncharged tRNA Exit</text>
            </svg>
          </div>

          <SectionBanner label="8. Regulation of Expression (Lac Operon)" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Lac Operon Genes:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Regulator gene (i):</strong> Codes for the lac repressor protein.</li>
                <li><strong>Promoter (p):</strong> Binding site for RNA polymerase.</li>
                <li><strong>Operator (o):</strong> Binding site for the repressor protein. Overlaps the promoter.</li>
                <li><strong>z gene:</strong> Codes for <strong>&beta;-galactosidase</strong> (hydrolyzes lactose to glucose and galactose).</li>
                <li><strong>y gene:</strong> Codes for <strong className="text-emerald-400">permease</strong> (increases cell membrane permeability to lactose).</li>
                <li><strong>a gene:</strong> Codes for <strong className="text-emerald-400">transacetylase</strong> (transfers acetyl group).</li>
              </ul>
            </li>
            <li><strong>Induction Mechanism:</strong> Lactose (or allolactose) binds the repressor, changing its shape so it cannot bind the operator, turning the operon ON. In the absence of lactose, the repressor binds the operator, shutting transcription OFF.</li>
          </ul>

          {/* SVG 6: Lac Operon */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 180" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">LAC OPERON REGULATION CIRCUIT</text>
              
              {/* OFF State */}
              <g transform="translate(10, 40)">
                <rect x="0" y="10" width="200" height="20" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="20" y="23" fill="#ffffff" fontSize="7">i gene</text>
                <text x="60" y="23" fill="#ffffff" fontSize="7">Promoter</text>
                <rect x="90" y="10" width="30" height="20" fill="#ef4444" />
                <text x="105" y="23" fill="#ffffff" fontSize="7" textAnchor="middle">Operator</text>
                <text x="150" y="23" fill="#ffffff" fontSize="7">z - y - a</text>
                
                {/* Repressor binding operator */}
                <rect x="95" y="30" width="20" height="15" fill="#ef4444" rx="2" />
                <path d="M 105 30 L 105 15" stroke="#ef4444" strokeWidth="1.5" />
                <text x="215" y="23" fill="#ef4444" fontSize="9" fontWeight="bold">OFF State</text>
              </g>

              {/* ON State */}
              <g transform="translate(10, 110)">
                <rect x="0" y="10" width="200" height="20" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="20" y="23" fill="#ffffff" fontSize="7">i gene</text>
                <text x="60" y="23" fill="#ffffff" fontSize="7">Promoter</text>
                <text x="105" y="23" fill="#10b981" fontSize="7" textAnchor="middle">Operator</text>
                <text x="150" y="23" fill="#10b981" fontSize="7">z - y - a</text>

                {/* Repressor blocked by Inducer */}
                <rect x="95" y="45" width="20" height="15" fill="#ef4444" rx="2" />
                <circle cx="105" cy="52" r="4" fill="#fb7185" /> {/* Inducer */}
                <text x="120" y="55" fill="#fb7185" fontSize="7">Lactose Inducer</text>
                <text x="215" y="23" fill="#10b981" fontSize="9" fontWeight="bold">ON State</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="9. Inducible vs. Repressible Operon (Lac vs. Trp)" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>The Trp Operon Comparison:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Repressible System:</strong> In contrast to the inducible Lac operon, the tryptophan (trp) operon is repressible. It controls the anabolic pathway of tryptophan synthesis and is <strong className="text-emerald-400">turned ON by default</strong>.</li>
                <li><strong>Corepressor Control:</strong> When tryptophan (the product) levels are high, tryptophan acts as a <strong className="text-emerald-400">corepressor</strong>, binding to the inactive aporepressor to activate it. The active repressor then binds the operator, blocking transcription (Feedback repression).</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="10. Human Genome Project (HGP)" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Project Overview:</strong> Initiated in <strong className="text-emerald-400">1990</strong> and completed in <strong className="text-emerald-400">2003</strong> (with chromosome 1 sequencing finished in May 2006). A 13-year mega-project coordinated by the US Department of Energy and National Institutes of Health.</li>
            <li><strong>Methodological Approaches:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Expressed Sequence Tags (ESTs):</strong> Sequencing only the genes that are expressed as RNA (coding sequences).</li>
                <li><strong>Sequence Annotation:</strong> Sequencing the entire genome (both coding and non-coding) first, then assigning functions to different regions.</li>
              </ul>
            </li>
          </ul>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">HGP Parameter</th>
                  <th className="p-2.5 text-cyan-400">Salient Features & Outcomes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">Total Base Pairs</td>
                  <td className="p-2.5 text-emerald-400 font-mono">3.1647 billion base pairs (3.16 × 10⁹ bp)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Estimated Genes</td>
                  <td className="p-2.5 text-emerald-400 font-mono">~30,000 total genes (99.9% nucleotide bases are identical in all humans)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Average Gene Size</td>
                  <td className="p-2.5 text-emerald-400">3,000 bases. Largest gene: <strong className="text-emerald-400">dystrophin</strong> on X-chromosome (2.4 million bases).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Coding portion</td>
                  <td className="p-2.5">Less than <strong className="text-emerald-400">2%</strong> of the genome codes for proteins. Repetitive sequences make up a major portion.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Chromosome Density</td>
                  <td className="p-2.5"><strong className="text-emerald-400">Chromosome 1</strong> has the most genes (2968). <strong className="text-emerald-400">Y chromosome</strong> has the fewest genes (231).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">SNPs (Single Nucleotide Polymorphisms)</td>
                  <td className="p-2.5">Found at 1.4 million locations, aiding in disease mapping and human history studies.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="11. DNA Fingerprinting Steps" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Polymorphism:</strong> Variation at genetic level. Satellite DNA shows high degree of polymorphism. Repetitive sequences of DNA are classified into microsatellites and minisatellites (<strong className="text-emerald-400">VNTRs - Variable Number of Tandem Repeats</strong>).</li>
            <li><strong>Experimental Steps:</strong>
              <p className="font-mono mt-1 text-[11px] bg-black/30 p-2 rounded border border-white/5 text-emerald-400">
                1. DNA Isolation ➔ 2. Restriction Enzyme Digestion (EcoRI etc.) ➔ 3. Gel Electrophoresis (size separation) ➔ 4. Southern Blotting (transfer to nylon membrane) ➔ 5. Hybridization with labeled VNTR probe ➔ 6. Autoradiography detection
              </p>
            </li>
          </ul>

          {/* SVG 7: DNA Fingerprinting Gel */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">DNA FINGERPRINTING AUTORADIOGRAM</text>
              
              {/* Gel lanes */}
              <rect x="80" y="40" width="240" height="120" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
              <line x1="140" y1="40" x2="140" y2="160" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="200" y1="40" x2="200" y2="160" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="260" y1="40" x2="260" y2="160" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="3" />

              <text x="110" y="52" fill="#ffffff" fontSize="8" textAnchor="middle">Crime Scene</text>
              <text x="170" y="52" fill="#ffffff" fontSize="8" textAnchor="middle">Suspect A</text>
              <text x="230" y="52" fill="#ffffff" fontSize="8" textAnchor="middle">Suspect B</text>
              <text x="290" y="52" fill="#ffffff" fontSize="8" textAnchor="middle">Ladder</text>

              {/* DNA Bands */}
              {/* Crime Scene */}
              <rect x="95" y="70" width="30" height="5" fill="#f43f5e" />
              <rect x="95" y="100" width="30" height="5" fill="#f43f5e" />
              <rect x="95" y="130" width="30" height="5" fill="#f43f5e" />

              {/* Suspect A (match) */}
              <rect x="155" y="70" width="30" height="5" fill="#10b981" />
              <rect x="155" y="100" width="30" height="5" fill="#10b981" />
              <rect x="155" y="130" width="30" height="5" fill="#10b981" />

              {/* Suspect B (mismatch) */}
              <rect x="215" y="60" width="30" height="5" fill="#a78bfa" />
              <rect x="215" y="90" width="30" height="5" fill="#a78bfa" />
              <rect x="215" y="140" width="30" height="5" fill="#a78bfa" />

              {/* Ladder */}
              <rect x="275" y="50" width="30" height="3" fill="#ffffff" />
              <rect x="275" y="70" width="30" height="3" fill="#ffffff" />
              <rect x="275" y="90" width="30" height="3" fill="#ffffff" />
              <rect x="275" y="110" width="30" height="3" fill="#ffffff" />
              <rect x="275" y="130" width="30" height="3" fill="#ffffff" />
              <rect x="275" y="150" width="30" height="3" fill="#ffffff" />
            </svg>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 3: EVOLUTION ─────────────────────────────────────────── */}
      <Collapsible title="3 · Evolution" icon={<Activity className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Origin of Life & Miller-Urey Experiment" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Oparin-Haldane Hypothesis:</strong> Stated that life arose from pre-existing non-living organic molecules (chemical evolution). The prebiotic atmosphere was reducing (lacked free oxygen).</li>
            <li><strong>Miller-Urey Experiment (1953):</strong> Provided experimental proof.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Gases:</strong> Methane (<InlineMath math="\text{CH}_4" />), Ammonia (<InlineMath math="\text{NH}_3" />), Hydrogen (<InlineMath math="\text{H}_2" />), and Water vapor (<InlineMath math="\text{H}_2\text{O}" />).</li>
                <li><strong>Ratio:</strong> <InlineMath math="\text{CH}_4 : \text{NH}_3 : \text{H}_2" /> in a <strong>2:1:2</strong> volume ratio.</li>
                <li><strong>Conditions:</strong> Heat (800°C), continuous electric spark discharge.</li>
                <li><strong>Results:</strong> Synthesized amino acids (glycine, alanine, aspartic acid), supporting chemical evolution theory.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 8: Miller Urey Spark Chamber */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 200" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">MILLER-UREY SPARK APPARATUS</text>
              
              {/* Flasks */}
              <circle cx="120" cy="120" r="18" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" /> {/* Boiling water */}
              <circle cx="280" cy="80" r="28" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />  {/* Spark Chamber */}
              
              {/* Electrodes */}
              <line x1="260" y1="60" x2="275" y2="75" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="300" y1="60" x2="285" y2="75" stroke="#ffffff" strokeWidth="2.5" />
              <ellipse cx="280" cy="75" rx="3" ry="1.5" fill="#f59e0b" /> {/* Spark glow */}

              {/* Condenser */}
              <rect x="268" y="130" width="24" height="40" rx="3" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1" />
              <text x="300" y="152" fill="#3b82f6" fontSize="8">Condenser</text>

              {/* Connecting tubes */}
              <path d="M 120 102 L 120 70 L 252 70" fill="none" stroke="#ffffff" strokeWidth="2" />
              <path d="M 280 108 L 280 130" fill="none" stroke="#ffffff" strokeWidth="2" />
              <path d="M 280 170 L 280 190 L 120 190 L 120 138" fill="none" stroke="#ffffff" strokeWidth="2" />

              {/* Labels */}
              <text x="120" y="148" fill="#ffffff" fontSize="7" textAnchor="middle">Boiling Water</text>
              <text x="280" y="38" fill="#10b981" fontSize="7" textAnchor="middle">CH4, NH3, H2, H2O</text>
            </svg>
          </div>

          <SectionBanner label="2. Evidence for Evolution: Morphological & Industrial" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Homologous Organs (Divergent Evolution):</strong> Organs sharing anatomical similarity due to common ancestry, though they perform different functions.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Animals:</strong> Limbs of whale, bat, cheetah, and human (share same basic skeletal pattern of humerus, radius, ulna, carpals).</li>
                <li><strong>Plants:</strong> Thorns of *Bougainvillea* and tendrils of *Cucurbita* (both are modified axillary buds).</li>
              </ul>
            </li>
            <li><strong>Analogous Organs (Convergent Evolution):</strong> Organs performing similar functions though they have distinct anatomical structures and origins.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Animals:</strong> Wings of butterfly and wings of bird; flippers of penguins and dolphins.</li>
                <li><strong>Plants:</strong> Sweet potato (root modification) and potato (stem modification).</li>
              </ul>
            </li>
            <li><strong>Industrial Melanism (Directional Selection):</strong> Natural selection evidenced in the peppered moth (*Biston betularia*) in England.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Pre-Industrialization (before 1850s):</strong> White-winged moths were abundant because they camouflaged against light-colored lichens on tree trunks. Melanic (dark) moths were easily spotted and eaten by predators.</li>
                <li><strong>Post-Industrialization:</strong> Soot deposits darkened tree trunks and killed lichens. Dark-winged moths survived better as they were camouflaged against dark bark. White moths became vulnerable, showing direct natural selection shifts.</li>
              </ul>
            </li>
            <li><strong>Anthropogenic Evolution:</strong> Selection of resistant organisms due to human actions:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Antibiotic Resistance:</strong> Excess use of antibiotics selects for resistant mutant bacteria (e.g., MDR strains of *Mycobacterium tuberculosis*).</li>
                <li><strong>Pesticide Resistance:</strong> Chemical pesticides select for mutant insects, rendering previously effective dosages ineffective.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 9: Homology vs Analogy diagram */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 160" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="250" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">EVOLUTIONARY PATTERNS</text>
              
              {/* Divergent */}
              <g transform="translate(10, 30)">
                <text x="100" y="20" fill="#22d3ee" fontSize="10" fontWeight="bold" textAnchor="middle">DIVERGENT (Homology)</text>
                <circle cx="100" cy="70" r="10" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <path d="M 100 70 L 60 120" stroke="#22d3ee" strokeWidth="1.5" />
                <path d="M 100 70 L 100 120" stroke="#22d3ee" strokeWidth="1.5" />
                <path d="M 100 70 L 140 120" stroke="#22d3ee" strokeWidth="1.5" />
                <text x="100" y="135" fill="#ffffff" fontSize="8" textAnchor="middle">Common Ancestor ➔ Diff Functions</text>
              </g>

              {/* Convergent */}
              <g transform="translate(260, 30)">
                <text x="100" y="20" fill="#a78bfa" fontSize="10" fontWeight="bold" textAnchor="middle">CONVERGENT (Analogy)</text>
                <circle cx="100" cy="120" r="10" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <path d="M 60 70 L 100 120" stroke="#a78bfa" strokeWidth="1.5" />
                <path d="M 100 70 L 100 120" stroke="#a78bfa" strokeWidth="1.5" />
                <path d="M 140 70 L 100 120" stroke="#a78bfa" strokeWidth="1.5" />
                <text x="100" y="135" fill="#ffffff" fontSize="8" textAnchor="middle">Diff Origin ➔ Similar Function</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="3. Adaptive Radiation & Evolutionary Theories" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Adaptive Radiation:</strong> Process of evolution of different species in a given geographical area starting from a point and radiating to other geographical areas (habitats).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Darwin's Finches:</strong> Original seed-eating finches on Galapagos Islands radiated into insectivorous, vegetarian, and cactus-eating species with varied beak structures.</li>
                <li><strong>Australian Marsupials:</strong> Diverse marsupials (kangaroo, Tasmanian tiger, koala) evolved from a single ancestral stock within the isolated island continent of Australia.</li>
                <li><strong>Convergent Evolution:</strong> Placental mammals in North America show striking convergent similarities with Australian marsupials (e.g., Placental Wolf and Tasmanian Wolf; Flying Squirrel and Sugar Glider).</li>
              </ul>
            </li>
            <li><strong>Evolutionary Theories:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Lamarckism:</strong> Theory of use and disuse of organs, stating that acquired characters are inherited (e.g., giraffe elongating its neck to reach high leaves). Rejected by modern genetics.</li>
                <li><strong>Darwinism (Natural Selection):</strong> Built on observations of overproduction, struggle for existence, variation, and differential reproduction/survival. Natural selection is the directive agent of adaptation.</li>
                <li><strong>Mutation Theory (Hugo de Vries):</strong> Stated that mutation is the cause of speciation, calling it <strong className="text-emerald-400">saltation</strong> (single-step large mutations) rather than the gradual minor variations Darwin proposed. Mutations are random and directionless.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 15: Adaptive Radiation Wheel */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 200" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">ADAPTIVE RADIATION WHEEL</text>
              
              <circle cx="175" cy="110" r="15" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
              <text x="175" y="113" fill="#ffffff" fontSize="8" textAnchor="middle">Ancestor</text>

              <line x1="175" y1="95" x2="175" y2="45" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3" />
              <rect x="135" y="25" width="80" height="20" rx="3" fill="#172554" stroke="#60a5fa" strokeWidth="1" />
              <text x="175" y="37" fill="#60a5fa" fontSize="8" textAnchor="middle">Seed Eaters</text>

              <line x1="160" y1="115" x2="80" y2="135" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3" />
              <rect x="25" y="125" width="80" height="20" rx="3" fill="#172554" stroke="#60a5fa" strokeWidth="1" />
              <text x="65" y="137" fill="#60a5fa" fontSize="8" textAnchor="middle">Insect Eaters</text>

              <line x1="190" y1="115" x2="270" y2="135" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3" />
              <rect x="245" y="125" width="80" height="20" rx="3" fill="#172554" stroke="#60a5fa" strokeWidth="1" />
              <text x="285" y="137" fill="#60a5fa" fontSize="8" textAnchor="middle">Cactus Feeders</text>
            </svg>
          </div>

          <SectionBanner label="4. Hardy-Weinberg Principle & Selection Types" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Hardy-Weinberg Equation:</strong> In a stable population, allele and genotype frequencies remain constant from generation to generation in the absence of evolutionary forces.
              <p className="font-mono mt-1 text-[11.5px] bg-black/30 p-2.5 rounded border border-white/5 text-emerald-400">
                <InlineMath math="p^2 + 2pq + q^2 = 1" /> &nbsp; | &nbsp; <InlineMath math="p + q = 1" />
              </p>
              where p is the frequency of dominant allele A, q is the frequency of recessive allele a, p² is the frequency of homozygous dominant AA, q² is the frequency of homozygous recessive aa, and 2pq is the frequency of heterozygous Aa.
            </li>
            <li><strong>Disrupting Factors:</strong> Gene migration, genetic drift (accidental change in small populations - Founder effect), mutation, genetic recombination, and natural selection.</li>
            <li><strong>Natural Selection Types:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Stabilizing:</strong> More individuals acquire mean character value (peak gets higher and narrower).</li>
                <li><strong>Directional:</strong> More individuals acquire value other than mean character value (peak shifts in one direction).</li>
                <li><strong>Disruptive:</strong> Individuals at both extremes are favored (two peaks form, value at mean is depleted).</li>
              </ul>
            </li>
          </ul>

          {/* SVG 10: Natural Selection curves */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 180" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="260" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">TYPES OF NATURAL SELECTION</text>
              
              {/* Stabilizing */}
              <g transform="translate(10, 30)">
                <rect x="10" y="10" width="140" height="110" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                <path d="M 20 110 Q 80 10 140 110" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                <text x="80" y="130" fill="#ffffff" fontSize="9" textAnchor="middle">Stabilizing</text>
              </g>

              {/* Directional */}
              <g transform="translate(180, 30)">
                <rect x="10" y="10" width="140" height="110" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                <path d="M 20 110 Q 110 30 150 110" fill="none" stroke="#eab308" strokeWidth="2.5" />
                <text x="80" y="130" fill="#ffffff" fontSize="9" textAnchor="middle">Directional</text>
              </g>

              {/* Disruptive */}
              <g transform="translate(350, 30)">
                <rect x="10" y="10" width="140" height="110" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                <path d="M 20 110 Q 50 20 80 110 Q 110 20 140 110" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                <text x="80" y="130" fill="#ffffff" fontSize="9" textAnchor="middle">Disruptive</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="5. Speciation & Population Genetics" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Speciation:</strong> The formation of new and distinct species in the course of evolution.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Allopatric Speciation:</strong> Occurs when populations are physically separated by a geographic barrier (e.g., mountains, rivers), preventing gene flow. The isolated groups undergo genetic divergence (e.g., Darwin's finches).</li>
                <li><strong>Sympatric Speciation:</strong> Occurs within the same geographic area without physical barriers. Driven by polyploidy (common in plants), sexual selection, or niche/habitat differentiation.</li>
              </ul>
            </li>
            <li><strong>Important Population Genetics Concepts:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Gene Flow:</strong> Transfer of alleles from one population to another due to migration of fertile individuals.</li>
                <li><strong>Genetic Drift (Sewall Wright Effect):</strong> Random fluctuations in allele frequencies in small populations due to chance alone. Can lead to loss of alleles or fixation of neutral alleles.</li>
                <li><strong>Genetic Bottleneck:</strong> Sudden, drastic reduction in population size due to environmental disasters (e.g., earthquakes, fires), leaving a random sample of surviving alleles.</li>
                <li><strong>Founder Effect:</strong> Occurs when a small group splits from a larger population to colonize a new area. The new colony's gene pool represents only a fraction of the original population's diversity.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 16: Speciation Flowchart */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 160" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">SPECIATION MECHANISMS</text>
              
              <rect x="25" y="60" width="80" height="40" rx="5" fill="#1e293b" stroke="#ffffff" strokeWidth="1.2" />
              <text x="65" y="85" fill="#ffffff" fontSize="8" textAnchor="middle">Single Population</text>

              <path d="M 105 70 L 160 50" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />
              <rect x="170" y="30" width="100" height="35" rx="5" fill="#172554" stroke="#22d3ee" strokeWidth="1" />
              <text x="220" y="51" fill="#22d3ee" fontSize="7" textAnchor="middle">Allopatric (Geographic Barrier)</text>

              <path d="M 105 90 L 160 110" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2" />
              <rect x="170" y="95" width="100" height="35" rx="5" fill="#312e81" stroke="#a78bfa" strokeWidth="1" />
              <text x="220" y="116" fill="#a78bfa" fontSize="7" textAnchor="middle">Sympatric (Genetic/Behavioral)</text>

              <path d="M 270 48 L 310 48" stroke="#10b981" strokeWidth="1.5" />
              <rect x="320" y="30" width="100" height="35" rx="5" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
              <text x="370" y="51" fill="#10b981" fontSize="7" textAnchor="middle">Divergent Species A & B</text>

              <path d="M 270 113 L 310 113" stroke="#10b981" strokeWidth="1.5" />
              <rect x="320" y="95" width="100" height="35" rx="5" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
              <text x="370" y="116" fill="#10b981" fontSize="7" textAnchor="middle">Reproductively Isolated</text>
            </svg>
          </div>

          <SectionBanner label="6. Human Evolution Chronology" color="emerald" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Stage</th>
                  <th className="p-2.5 text-cyan-400">Cranial Capacity</th>
                  <th className="p-2.5 text-emerald-400">Salient Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">Dryopithecus</td>
                  <td className="p-2.5">-</td>
                  <td className="p-2.5 text-white/60">Ape-like, hairy, walked like gorillas and chimpanzees (15 mya).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Ramapithecus</td>
                  <td className="p-2.5">-</td>
                  <td className="p-2.5 text-white/60">More man-like, lived around 15 mya.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Australopithecines</td>
                  <td className="p-2.5">~500 cc</td>
                  <td className="p-2.5 text-white/60">Lived in East African grasslands (3-2 mya). Hunted with stone weapons; essentially ate fruit.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Homo habilis</td>
                  <td className="p-2.5">650 – 800 cc</td>
                  <td className="p-2.5 text-white/60">First human-like hominid. Did not eat meat.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Homo erectus</td>
                  <td className="p-2.5">~900 cc</td>
                  <td className="p-2.5 text-white/60">Fossils found in Java (1.5 mya). Probably ate meat.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Homo neanderthalensis</td>
                  <td className="p-2.5">1400 cc</td>
                  <td className="p-2.5 text-white/60">Lived near East/Central Asia (100,000-40,000 years ago). Used hides to protect bodies; buried their dead.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Homo sapiens</td>
                  <td className="p-2.5">1350 – 1500 cc</td>
                  <td className="p-2.5 text-white/60">Arose in Africa during Ice Age (75,000-10,000 years ago). Developed cave art (~18,000 years ago) and agriculture (~10,000 years ago).</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 4: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            4 · Genetics & Evolution Lab Simulator
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Perform monohybrid test crosses, trigger mutagenic radiation, induce promoter operons, execute Miller-Urey spark discharges, and hybridize DNA fingerprint VNTRs to observe outcomes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Biological Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('pea_plant')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'pea_plant' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  F1 Pea Plant (Tt)
                </button>
                <button 
                  onClick={() => setSpecimen('dna_sample')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'dna_sample' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Purified DNA Strand
                </button>
                <button 
                  onClick={() => setSpecimen('ecoli_culture')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'ecoli_culture' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  E. coli Wild Type Culture
                </button>
                <button 
                  onClick={() => setSpecimen('miller_chamber')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'miller_chamber' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Miller-Urey Gas Mix
                </button>
                <button 
                  onClick={() => setSpecimen('forensic_tissue')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'forensic_tissue' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Forensic DNA Sample
                </button>
              </div>
            </div>

            {/* Treatment Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Stimulus / Reagent</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'test_cross', label: 'Cross with Recessive Parent (tt)' },
                  { id: 'uv_mutagen', label: 'Expose to UV Radiation' },
                  { id: 'lac_induce', label: 'Add Lactose/Allolactose' },
                  { id: 'spark_discharge', label: 'Induce 75,000V Spark Discharge' },
                  { id: 'southern_blot', label: 'Apply Labeled VNTR Probes' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setTreatment(r.id as any)}
                    className={`p-2 rounded-lg border text-left text-xs font-bold transition ${treatment === r.id ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
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
              <span className="text-xs font-mono text-cyan-400">Status: Analysis Complete</span>
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
                  <span className="text-white/40 block text-[10px] uppercase">Major Products</span>
                  <span className="text-white font-mono font-semibold">{sim.product}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-left leading-relaxed text-white/70">
              <strong className="text-cyan-400 block mb-1">Biological Mechanism:</strong>
              {sim.explanation}
            </div>

            <div className="p-3.5 bg-rose-500/5 border border-rose-500/10 rounded-xl text-left leading-relaxed text-white/70">
              <strong className="text-rose-400 block mb-1">IAT Trap Warning:</strong>
              {renderBoldText(sim.trap)}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION 5: CONCEPTUAL SOLVED PROBLEMS ─────────────────────────── */}
      <Collapsible title="5 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 font-sans text-[13px]">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Hardy-Weinberg Frequency Calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"In a human population under Hardy-Weinberg equilibrium, the frequency of a recessive autosomal genetic disorder (cystic fibrosis) is 1 in 10,000. Calculate the frequency of healthy carriers (heterozygotes) in this population."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The frequency of the homozygous recessive genotype (cystic fibrosis, aa) is given by:"}</div>
              <div className="pl-3"><InlineMath math="q^2 = \frac{1}{10000} = 0.0001" /></div>
              <div>{"2. Taking the square root to find the recessive allele frequency (q):"}</div>
              <div className="pl-3"><InlineMath math="q = \sqrt{0.0001} = 0.01" /></div>
              <div>{"3. Using the equation p + q = 1, find the dominant allele frequency (p):"}</div>
              <div className="pl-3"><InlineMath math="p = 1 - 0.01 = 0.99" /></div>
              <div>{"4. The frequency of healthy carriers (heterozygotes, Aa) is given by 2pq:"}</div>
              <div className="pl-3"><InlineMath math="2pq = 2 \times 0.99 \times 0.01 = 0.0198 \text{ (or } 1.98\% \text{)}" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Carrier frequency = 0.0198 (approx 2%).</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Gene Mapping on Chromosome</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Three genes A, B, and C are located on the same chromosome. The recombination frequency between A and B is 9%, between B and C is 17%, and between A and C is 8%. Determine the linear order of these genes on the chromosome."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Recombination frequency directly translates to genetic distance: 1% recombination = 1 centimorgan (cM)."}</div>
              <div>{"2. Distances:"}</div>
              <div className="pl-3">{"A to B = 9 cM"}</div>
              <div className="pl-3">{"B to C = 17 cM"}</div>
              <div className="pl-3">{"A to C = 8 cM"}</div>
              <div>{"3. The largest distance is between B and C (17 cM), meaning B and C must be at the two outer ends."}</div>
              <div>{"4. Gene A lies in between B and C. Check compatibility:"}</div>
              <div className="pl-3">{"Distance B to A + A to C = 9 cM + 8 cM = 17 cM. This perfectly matches the B to C distance."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The linear sequence is B - A - C (or C - A - B).</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: DNA Nucleotide Base Ratios (Chargaff's Rules)</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A double-stranded DNA molecule contains 22% Cytosine (C). Calculate the percentage of Adenine (A), Thymine (T), and Guanine (G) bases present in this DNA molecule."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. According to Chargaff's rules for double-stranded DNA, purines equal pyrimidines, specifically: [A] = [T] and [G] = [C]."}</div>
              <div>{"2. Since Cytosine [C] = 22%, Guanine [G] must also be 22%."}</div>
              <div>{"3. Combined, [G] + [C] = 22% + 22% = 44%."}</div>
              <div>{"4. The remaining percentage belongs to Adenine and Thymine:"}</div>
              <div className="pl-3">{"[A] + [T] = 100% - 44% = 56%"}</div>
              <div>{"5. Since [A] = [T]:"}</div>
              <div className="pl-3">{"[A] = [T] = 56% / 2 = 28%"}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: G = 22%; A = 28%; T = 28%.</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Pedigree Analysis Mode of Inheritance</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An autosomal recessive trait is analyzed. A normal man whose brother has the disease marries a normal woman whose sister has the disease. What is the probability that their first child will be affected with the disease?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Let the disease-causing recessive allele be 'a' and the normal allele be 'A'."}</div>
              <div>{"2. For both families, since the siblings of the couple have the disease (genotype aa), their parents must be heterozygous carriers (Aa x Aa)."}</div>
              <div>{"3. The normal man and the normal woman themselves cannot be homozygous recessive (aa). Thus, their possible genotypes are either AA or Aa."}</div>
              <div>{"4. The probability that a normal child of Aa x Aa parents is a carrier (Aa) is 2/3 (since the aa possibility is excluded)."}</div>
              <div className="pl-3">{"P(Man is Aa) = 2/3"}</div>
              <div className="pl-3">{"P(Woman is Aa) = 2/3"}</div>
              <div>{"5. An affected child (aa) can only be born if both parents are carriers (Aa). If both are carriers, the probability of them having an affected child (aa) is 1/4."}</div>
              <div>{"6. Combined probability:"}</div>
              <div className="pl-3"><InlineMath math="\text{P(Affected Child)} = \text{P(Man is Aa)} \times \text{P(Woman is Aa)} \times \text{P(Child is aa | Aa } \times \text{ Aa)}" /></div>
              <div className="pl-3"><InlineMath math="\text{P(Affected Child)} = \frac{2}{3} \times \frac{2}{3} \times \frac{1}{4} = \frac{4}{36} = \frac{1}{9}" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The probability that their first child will be affected is 1/9 (approx 11.1%).</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 6: PRACTICE MOCK TEST ────────────────────────────────── */}
      <Collapsible title="6 · Practice Mock Test (15 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your understanding of Inheritance, Molecular Genetics, and Evolution with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following represents the correct F2 phenotypic ratio for incomplete dominance (e.g., in flower color of snapdragon)?',
                a: '3 : 1',
                b: '9 : 3 : 3 : 1',
                c: '1 : 2 : 1',
                d: '9 : 7',
                ans: 'Correct Answer: C. In incomplete dominance, red (RR) crossed with white (rr) yields pink (Rr). The F2 generation yields 1 Red (RR) : 2 Pink (Rr) : 1 White (rr), making the phenotypic and genotypic ratios identical (1:2:1).'
              },
              {
                q: 'What is the genotype of a patient suffering from Klinefelter\'s syndrome?',
                a: '44 + XO',
                b: '44 + XXY',
                c: '44 + XYY',
                d: '45 + XX',
                ans: 'Correct Answer: B. Klinefelter\'s syndrome is a chromosomal disorder caused by the presence of an additional X chromosome in males, yielding a 44 + XXY karyotype (47 chromosomes total).'
              },
              {
                q: 'In his linkage experiments on Drosophila, why did T.H. Morgan observe low recombination frequency (1.3%) between the yellow-body and white-eye genes?',
                a: 'The genes are located on different autosomes.',
                b: 'The genes are situated very close to each other on the X chromosome.',
                c: 'The genes are on the Y chromosome.',
                d: 'The genes undergo multiple crossovers.',
                ans: 'Correct Answer: B. Genes situated very close on the same chromosome are tightly linked and tend to assort together, resulting in very low recombination frequencies during gametogenesis.'
              },
              {
                q: 'How many base pairs of DNA are typically wrapped around a single nucleosome core particle?',
                a: '146 bp',
                b: '200 bp',
                c: '300 bp',
                d: '100 bp',
                ans: 'Correct Answer: B. A typical nucleosome contains about 200 base pairs of DNA wrapped around the histone octamer core.'
              },
              {
                q: 'In the Hershey-Chase experiment, what radioactive isotope was used to specifically label the viral DNA of bacteriophage T2?',
                a: '35S',
                b: '32P',
                c: '14C',
                d: '15N',
                ans: 'Correct Answer: B. DNA contains phosphorus but not sulfur, so radiolabeled phosphorus (32P) was used to label DNA. Radioactive sulfur (35S) was used to label the protein coat.'
              },
              {
                q: 'Which enzyme is responsible for removing RNA primers and replacing them with DNA nucleotides during replication in E. coli?',
                a: 'DNA Polymerase III',
                b: 'DNA Polymerase I',
                c: 'DNA Ligase',
                d: 'Helicase',
                ans: 'Correct Answer: B. DNA Polymerase I has 5\'➔3\' exonuclease activity that removes RNA primers, replacing them with corresponding DNA nucleotides. DNA Polymerase III performs bulk synthesis.'
              },
              {
                q: 'Which of the following modifications occurs at the 5\' end of primary eukaryotic hnRNA transcripts during processing?',
                a: 'Addition of poly-A tail',
                b: 'Splicing of exons',
                c: 'Capping with methylguanosine triphosphate',
                d: 'Methylation of adenines',
                ans: 'Correct Answer: C. Processing of eukaryotic pre-mRNA includes 5\' capping (adding methylguanosine triphosphate) and 3\' poly-A tailing (adding 200-300 adenylate residues).'
              },
              {
                q: 'The genetic code is degenerate. What does this property mean?',
                a: 'One codon can code for multiple amino acids.',
                b: 'More than one codon can code for a single amino acid.',
                c: 'The code is read continuously without punctuation.',
                d: 'The same codon is utilized in all organisms.',
                ans: 'Correct Answer: B. Degeneracy means that since there are 61 codons coding for only 20 amino acids, most amino acids are coded by multiple synonym codons.'
              },
              {
                q: 'In the lac operon system of E. coli, which gene codes for the lac repressor protein?',
                a: 'z gene',
                b: 'y gene',
                c: 'i gene',
                d: 'a gene',
                ans: 'Correct Answer: C. The regulator gene (i gene) constitutively transcribes the repressor protein. The z, y, and a genes are structural genes.'
              },
              {
                q: 'In the Miller-Urey prebiotic synthesis experiment, which of the following gases was NOT included in the spark discharge flask?',
                a: 'CH4',
                b: 'NH3',
                c: 'O2',
                d: 'H2',
                ans: 'Correct Answer: C. Free oxygen (O2) was absent in prebiotic conditions. The gas mixture consisted of methane, ammonia, hydrogen, and water vapor.'
              },
              {
                q: 'Thorns of Bougainvillea and tendrils of Cucurbita represent:',
                a: 'Homologous organs resulting from divergent evolution',
                b: 'Analogous organs resulting from convergent evolution',
                c: 'Vestigial organs',
                d: 'Atavistic structures',
                ans: 'Correct Answer: A. Both thorns of Bougainvillea and tendrils of Cucurbita develop from axillary buds, representing homologous structures reflecting common origin (divergent evolution).'
              },
              {
                q: 'What is the correct cranial capacity order of human ancestors from smallest to largest?',
                a: 'Homo erectus < Australopithecus < Homo habilis < Neanderthal man',
                b: 'Australopithecus < Homo habilis < Homo erectus < Neanderthal man',
                c: 'Homo habilis < Homo erectus < Neanderthal man < Australopithecus',
                d: 'Homo erectus < Homo habilis < Australopithecus < Neanderthal man',
                ans: 'Correct Answer: B. Australopithecus (~500 cc) < Homo habilis (650-800 cc) < Homo erectus (900 cc) < Neanderthal man (1400 cc).'
              },
              {
                q: 'According to the Hardy-Weinberg equation, p2 represents the frequency of which genotype?',
                a: 'Heterozygous (Aa)',
                b: 'Homozygous dominant (AA)',
                c: 'Homozygous recessive (aa)',
                d: 'Hemizygous dominant',
                ans: 'Correct Answer: B. In the H-W expansion (p2 + 2pq + q2 = 1), p2 represents homozygous dominant individuals, q2 represents homozygous recessive, and 2pq represents heterozygotes.'
              },
              {
                q: 'The DNA-dependent RNA polymerase synthesizes RNA strands in which direction?',
                a: '3\' ➔ 5\'',
                b: '5\' ➔ 3\'',
                c: 'Both directions simultaneously',
                d: 'Template-independent direction',
                ans: 'Correct Answer: B. All nucleic acid polymerases (DNA polymerases and RNA polymerases) synthesize strands exclusively in the 5\' ➔ 3\' direction, reading the template strand in the 3\' ➔ 5\' direction.'
              },
              {
                q: 'Which method is used to transfer separated DNA fragments from an agarose gel to a nitrocellulose membrane during DNA fingerprinting?',
                a: 'Northern blotting',
                b: 'Southern blotting',
                c: 'Western blotting',
                d: 'Eastern blotting',
                ans: 'Correct Answer: B. Southern blotting is the specific transfer method for DNA fragments. Northern blotting is for RNA; Western blotting is for proteins.'
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
        <span className="text-[11px] text-white/30 font-mono">Genetics & Evolution · Unit 7</span>
      </div>

    </div>
  );
}
