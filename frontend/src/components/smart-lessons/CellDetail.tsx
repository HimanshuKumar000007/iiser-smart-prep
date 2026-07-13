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
      return <strong key={index} className="text-emerald-400">{part}</strong>;
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

export default function CellDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'plant_cell' | 'cyanobacteria' | 'dividing_root' | 'enzyme_mix'>('plant_cell');
  const [reagent, setReagent] = useState<'tca' | 'colchicine' | 'malonate' | 'temp_spike' | 'feulgen'>('tca');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    // Trichloroacetic Acid (TCA) Chemical Analysis
    if (reagent === 'tca') {
      if (specimen === 'plant_cell') {
        return {
          outcome: 'Acid-Soluble Filtrate vs. Insoluble Retentate Separation',
          color: 'text-cyan-400',
          visualEffect: 'Tissue dissolves in Cl3CCOOH, separating small molecules from large polymers.',
          product: 'Filtrate (Amino acids, sugars, nucleotides) & Retentate (Proteins, starch, DNA)',
          explanation: 'Grinding plant cells in TCA separates them into two pools: the acid-soluble pool (filtrate, molecules of molecular weight 18-800 Da like amino acids and simple sugars) and the acid-insoluble fraction (retentate, macromolecules like proteins, polysaccharides, and nucleic acids).',
          trap: 'Lipids are NOT true macromolecules (molecular weight < 800 Da) but end up in the acid-insoluble retentate because they form large vesicle membranes that do not pass through the filter.'
        };
      }
      return {
        outcome: 'General lysis; macromolecular pellet formed.',
        color: 'text-zinc-400',
        visualEffect: 'Precipitation of large intracellular proteins and DNA.',
        product: 'Acid-insoluble precipitate',
        explanation: 'TCA breaks cell envelopes and denatures large structures, precipitating macromolecules.',
        trap: 'Always filter through cheesecloth to extract the filtrate accurately.'
      };
    }

    // Colchicine Spindle Poison
    if (reagent === 'colchicine') {
      if (specimen === 'dividing_root') {
        return {
          outcome: 'Mitotic Arrest at Metaphase (Polyploidy Induced)',
          color: 'text-rose-400',
          visualEffect: 'Spindle fibers dissolve, leaving duplicated chromosomes clustered at the cell center.',
          product: 'Tetraploid cells (chromosome doubling without separation)',
          explanation: 'Colchicine binds tubulin dimers, preventing microtubule assembly and spindle fiber formation. Chromosomes duplicate during S phase and align at metaphase, but cannot separate during anaphase due to lack of spindle fibers.',
          trap: 'Colchicine arrests cells specifically at Metaphase, not Prophase or Anaphase. It is used to induce polyploidy in plant breeding.'
        };
      }
      return {
        outcome: 'Tubulin inhibition; cell division halts.',
        color: 'text-rose-400',
        visualEffect: 'No spindle assembly observed.',
        product: 'Non-functional tubulin pools',
        explanation: 'Colchicine prevents mitotic spindle assembly by binding tubulin, blocking equational chromosome separation.',
        trap: 'This agent has no effect on quiescent G0 cells or non-dividing tissue.'
      };
    }

    // Malonate Competitive Inhibition
    if (reagent === 'malonate') {
      if (specimen === 'enzyme_mix') {
        return {
          outcome: 'Competitive Inhibition of Succinate Dehydrogenase',
          color: 'text-violet-400',
          visualEffect: 'Enzymatic conversion of succinate to fumarate drops dramatically.',
          product: 'Enzyme-inhibitor complex; Km increased, Vmax unchanged',
          explanation: 'Malonate structurally resembles succinate (the natural substrate) and competes for the active site of succinate dehydrogenase. Adding more succinate reverses the inhibition, meaning Vmax remains unchanged but Km increases.',
          trap: 'Competitive inhibitors increase Km (lower affinity) but do NOT change Vmax because excess substrate outcompetes the inhibitor.'
        };
      }
    }

    // Temperature spike (Enzyme denaturation)
    if (reagent === 'temp_spike') {
      if (specimen === 'enzyme_mix') {
        return {
          outcome: 'Irreversible Thermal Denaturation of Proteins',
          color: 'text-rose-400',
          visualEffect: 'Catalytic activity ceases completely as tertiary protein structures unfold.',
          product: 'Denatured inactive enzyme proteins',
          explanation: 'High temperatures break hydrogen, ionic, and disulfide bonds stabilizing the active tertiary structure of enzymes, causing them to precipitate. Low temperatures only deactivate enzymes temporarily.',
          trap: 'Inorganic catalysts work efficiently at high temperatures and pressures, whereas biological enzymes are highly thermolabile.'
        };
      }
    }

    // Feulgen stain (Nuclear DNA)
    if (reagent === 'feulgen') {
      if (specimen === 'plant_cell' || specimen === 'dividing_root') {
        return {
          outcome: 'Nuclei & Chromosomes Stain Magenta',
          color: 'text-pink-400',
          visualEffect: 'The central nucleus or condensed chromosome chromatids turn bright reddish-purple.',
          product: 'Stained deoxyribose sugars',
          explanation: 'Feulgen staining is a specific histochemical reaction for DNA. Acid hydrolysis releases aldehyde groups from deoxyribose, which react with Schiff\'s reagent to yield a deep magenta color.',
          trap: 'Feulgen does not stain RNA because ribose lacks the deoxy configuration, making it a perfect test to differentiate nucleolus (rRNA-rich, unstained) from chromatin (DNA-rich, stained).'
        };
      }
    }

    return {
      outcome: 'No specific diagnostic reaction occurred.',
      color: 'text-zinc-400',
      visualEffect: 'Specimen remains unchanged.',
      product: 'None',
      explanation: 'No unique physiological or chemical marker was triggered by this combination.',
      trap: 'Try other combinations to test diagnostic details.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white cell-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .cell-chapter .text-xs { font-size: 13px !important; }
        .cell-chapter .text-sm { font-size: 15px !important; }
        .cell-chapter .text-base { font-size: 17.5px !important; }
        .cell-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .cell-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .cell-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .cell-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .cell-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 3</Tag>
            <Tag color="rose">IAT High Yield</Tag>
            <Tag color="violet">Cell & Biomolecules</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Cell: Structure, Biomolecules & <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Cell Division</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Complete revision framework for Cell Theory, Prokaryotic & Eukaryotic structures, elemental composition analysis, proteins/polysaccharides/nucleic acids, enzyme kinetics, and mitosis/meiosis cycles.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: CELL - THE UNIT OF LIFE ────────────────────────────── */}
      <Collapsible title="1 · Cell: Prokaryotic vs. Eukaryotic Organisation" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Overview & Cell Theory" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>A Cell:</strong> Structural and functional unit of all living organisms. Anton von Leeuwenhoek first saw/described a live cell; Robert Brown discovered the nucleus.</li>
            <li><strong>Cell Theory:</strong> Formulated by Schleiden (botanist, 1838) and Schwann (zoologist, 1839). Schwann noted that cell walls are a unique character of plant cells, and animal cells are bounded by thin membranes. Modified by <strong className="text-emerald-400">Rudolf Virchow (1855)</strong>: <strong className="text-emerald-400">Omnis cellula-e cellula</strong> (all cells arise from division of pre-existing cells).</li>
            <li><strong>Cell Sizes:</strong> Mycoplasma (smallest, 0.3 μm), Bacteria (1-2 μm), ostrich egg (largest single cell). Human RBCs are about 7.0 μm.</li>
          </ul>

          <SectionBanner label="2. Cell Membrane & Cell Wall" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Plasma Membrane (Fluid Mosaic Model)</strong>
              <p>Proposed by <strong className="text-emerald-400">Singer and Nicolson (1972)</strong>. Lipids (mainly phosphoglycerides) are arranged in a bilayer with polar heads pointing outwards and hydrophobic tails pointing inwards. Integral proteins span the membrane, while peripheral proteins lie on the surface. Cholesterol provides stability. Fluidity enables cell growth, junction formation, secretion, and endocytosis.</p>
              <strong className="text-cyan-300 block">Transport Mechanisms:</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Passive:</strong> Diffusion along gradient without ATP (e.g., neutral solutes).</li>
                <li><strong>Osmosis:</strong> Water transport across membrane down gradient.</li>
                <li><strong>Facilitated:</strong> Polar molecules require carrier membrane proteins.</li>
                <li><strong>Active:</strong> Pumps solutes against concentration gradient using ATP (e.g., Na+/K+ Pump).</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Cell Wall</strong>
              <p>Non-living, rigid outer layer providing shape, protection, and cell-to-cell interaction.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Algae:</strong> Made of cellulose, galactans, mannans, and calcium carbonate.</li>
                <li><strong>Plants:</strong> Cellulose, hemicellulose, pectins, and proteins. Primary wall (capable of growth) decreases as cell matures, replaced by secondary wall (inner).</li>
                <li><strong>Middle Lamella:</strong> Made of calcium pectate; glues neighboring cells together. Crossed by <strong className="text-emerald-400">plasmodesmata</strong> (cytoplasmic junctions).</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="3. Prokaryote vs. Eukaryote Structure Comparison" color="cyan" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Feature</th>
                  <th className="p-3 text-cyan-400">Prokaryotic Cell (e.g., Bacteria)</th>
                  <th className="p-3 text-rose-400">Eukaryotic Cell (e.g., Plant/Animal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Nucleus</td>
                  <td className="p-3 text-cyan-400">Absent (naked circular DNA in nucleoid; no histone association)</td>
                  <td className="p-3 text-rose-400">Present (true double-membrane nucleus with linear histone-bound DNA)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Envelope System</td>
                  <td className="p-3 text-cyan-400">Glycocalyx (capsule or slime layer), wall (peptidoglycan), and cell membrane</td>
                  <td className="p-3 text-rose-400">Cell membrane (phospholipids + cholesterol). Cellulose/chitin walls in plants/fungi.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Ribosomes</td>
                  <td className="p-3 text-cyan-400">70S (50S + 30S subunits) in cytoplasm</td>
                  <td className="p-3 text-rose-400">80S (60S + 40S subunits) in cytoplasm; 70S inside mitochondria/chloroplasts</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Internal Structures</td>
                  <td className="p-3 text-cyan-400">Mesosome infoldings (respiration, cell division), plasmids (small circular DNA)</td>
                  <td className="p-3 text-rose-400">Membrane-bound organelles (ER, Golgi, Lysosomes, Vacuoles, Mitochondria, Plastids)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Cytoskeleton</td>
                  <td className="p-3 text-cyan-400">Absent / primitive structural analogs</td>
                  <td className="p-3 text-rose-400">Microtubules (tubulin), microfilaments (actin), intermediate filaments</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Cell Junctions</td>
                  <td className="p-3 text-cyan-400">None</td>
                  <td className="p-3 text-rose-400">Plasmodesmata (plants); Tight, Gap, and Desmosomes (animals)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="4. Eukaryotic Organelle Details" color="cyan" />
          <ul className="list-disc pl-4 space-y-2 text-xs text-white/60">
            <li><strong>Endomembrane System:</strong> Group of organelles whose functions are coordinated. Consists of:
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Endoplasmic Reticulum (ER):</strong> RER (studded with ribosomes; protein synthesis and export) vs. SER (lacks ribosomes; lipid and steroid hormone synthesis).</li>
                <li><strong>Golgi Apparatus:</strong> Flat cisternae. Polarized orientation: cis-forming face (faces nucleus, receives proteins from ER) ➔ trans-maturing face (releases vesicles). Processing center for glycosylation (formation of glycoproteins and glycolipids).</li>
                <li><strong>Lysosomes:</strong> Formed by Golgi budding. Acidic membrane vesicles containing active hydrolytic enzymes (lipases, proteases, carbohydrases) operating at pH 5.</li>
                <li><strong>Vacuoles:</strong> Bound by a single membrane called <strong className="text-emerald-400">tonoplast</strong>. Tonoplast transports ions against concentration gradient into the vacuole. Types include: Central vacuole (plants, storage/osmosis), Contractile vacuole (amoeba, osmoregulation/excretion), Food vacuole.</li>
              </ul>
            </li>
            <li><strong>Powerhouse & Plastids (Double Membrane, Endosymbiotic Origin):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Mitochondria:</strong> Double membrane. Inner membrane forms folding <strong className="text-emerald-400">cristae</strong> to increase surface area. Matrix contains circular DNA, RNA, 70S ribosomes, and site of aerobic respiration/ATP synthesis.</li>
                <li><strong>Plastids:</strong> Found in plants and euglenoids. Chloroplasts (contain thylakoid stacks as grana, stroma fluid containing circular DNA and RuBisCO), Chromoplasts (contain fat-soluble carotenoid pigments like carotene/xanthophylls), Leucoplasts (colorless starch-storing <strong className="text-emerald-400">Amyloplasts</strong>, oil-storing <strong className="text-emerald-400">Elaioplasts</strong>, protein-storing <strong className="text-emerald-400">Aleuroplasts</strong>).</li>
              </ul>
            </li>
            <li><strong>Nucleus & Chromosome Morphology:</strong> Nucleolus is non-membrane bound, site for active rRNA synthesis. Metacentric centromere forms two equal arms (V-shape), Sub-metacentric has one shorter arm (L-shape), Acrocentric centromere sits near the end (J-shape), and Telocentric centromere sits at the terminal end (I-shape). Satellites represent secondary constrictions.</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: BIOMOLECULES & ENZYMES ─────────────────────────────── */}
      <Collapsible title="2 · Biomolecules: Macromolecules, Nucleic Acids & Enzyme Inhibition" icon={<Layers className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          
          <SectionBanner label="1. Acid-Soluble Pool vs. Insoluble Retentate" color="amber" />
          <p className="leading-relaxed text-xs">
            Grinding biological tissues in <strong className="text-emerald-400">Trichloroacetic acid</strong> (Cl₃CCOOH) separates them into two distinct fractions:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Acid-Soluble Pool (Filtrate):</strong> Contains micro-molecules of molecular weight 18 to 800 Da (amino acids, monosaccharides/disaccharides, nitrogenous bases).</li>
            <li><strong>Acid-Insoluble Fraction (Retentate):</strong> Contains biomacromolecules with molecular weights &gt;10,000 Da (polypeptides/proteins, polysaccharides, nucleic acids).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong className="text-rose-400">The Lipid Exception:</strong> Lipids are small molecules (MW &lt; 800 Da) but aggregate into cell membrane vesicles upon grinding, making them remain in the acid-insoluble retentate.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="2. Primary vs. Secondary Metabolites" color="amber" />
          <p className="leading-relaxed text-xs">
            Primary metabolites play direct roles in physiological processes (respiration, growth). Secondary metabolites are ecological defense compounds.
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Secondary Metabolite Class</th>
                  <th className="p-3 text-cyan-400">Key High-Yield Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Alkaloids</td>
                  <td className="p-3 text-cyan-400">Morphine, Codeine</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Toxins</td>
                  <td className="p-3 text-cyan-400">Abrin, Ricin</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Lectins</td>
                  <td className="p-3 text-cyan-400">Concanavalin A</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Drugs</td>
                  <td className="p-3 text-cyan-400">Vinblastine (anti-cancer), Curcumin</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Polymeric substances</td>
                  <td className="p-3 text-cyan-400">Rubber, Gums, Cellulose</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Structure of Macromolecules (Proteins & Polysaccharides)" color="amber" />
          <ul className="list-disc pl-4 space-y-2 text-xs text-white/60">
            <li><strong>Proteins:</strong> Polymers of amino acids linked by peptide bonds (formed by condensation elimination of water). 
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Structures:</strong> Primary (amino acid sequence), Secondary (α-helix, β-sheet), Tertiary (3D folding stabilized by disulfide, ionic, and hydrophobic bonds; functional enzyme conformation), Quaternary (multimeric assembly, e.g. adult Hemoglobin with 2α and 2β sub-units).</li>
                <li><strong>Abundances:</strong> <strong className="text-emerald-400">Collagen</strong> (most abundant animal protein); <strong className="text-emerald-400">RuBisCO</strong> (most abundant protein in the biosphere).</li>
              </ul>
            </li>
            <li><strong>Polysaccharides:</strong> 
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Cellulose:</strong> Unbranched homopolymer of β-D-glucose (β-1,4 linkages). Cannot hold iodine because it lacks helical turns.</li>
                <li><strong>Starch:</strong> Plant reserve. Amylose (unbranched helices that trap iodine to stain blue) + Amylopectin (branched, α-1,6).</li>
                <li><strong>Chitin:</strong> Homopolymer of N-acetylglucosamine (NAG) forming fungal cell walls and arthropod exoskeletons.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="4. Nucleic Acids (DNA & RNA)" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">DNA Double Helix (Watson-Crick Model)</strong>
              <p>Composed of nucleotides containing a nitrogenous base, deoxyribose sugar, and a phosphate group. Nucleotides are linked by <strong className="text-emerald-400">3'-5' phosphodiester bonds</strong>.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Strands:</strong> Antiparallel (5' ➔ 3' and 3' ➔ 5') held together by hydrogen bonds.</li>
                <li><strong>Base Pairing:</strong> Adenine pairs with Thymine (2 H-bonds); Guanine pairs with Cytosine (3 H-bonds).</li>
                <li><strong>Chargaff's Rule:</strong> Purines = Pyrimidines ($[A] + [G] = [T] + [C]$).</li>
                <li><strong>Dimensions:</strong> Pitch of helix is 3.4 nm (34 Å), containing 10 base pairs per turn (distance between consecutive base pairs is 0.34 nm).</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">DNA vs. RNA Comparison</strong>
              <ul className="list-disc pl-4 space-y-1.5">
                <li><strong>Sugar:</strong> Deoxyribose in DNA; Ribose (carrying 2'-OH group, making it reactive) in RNA.</li>
                <li><strong>Bases:</strong> Thymine in DNA; Uracil in RNA.</li>
                <li><strong>Structure:</strong> Double-stranded stable DNA; Single-stranded catalytic RNA.</li>
                <li><strong>RNA Types:</strong> mRNA (template), tRNA (cloverleaf adapter fetching amino acids), rRNA (ribosomal catalytic component).</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="5. Enzyme Kinetics & Inhibition Types" color="amber" />
          <p className="leading-relaxed text-xs">
            Enzymes bind substrates at the <strong className="text-emerald-400">active site</strong>, lowering transition-state activation energy.
          </p>

          {/* SVG Figure: Michaelis-Menten kinetics curve */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="250" y="20" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">MICHAELIS-MENTEN ENZYME KINETICS</text>
              
              {/* Axes */}
              <line x1="50" y1="160" x2="450" y2="160" stroke="#ffffff" strokeWidth="1.5" /> {/* Substrate [S] */}
              <line x1="50" y1="160" x2="50" y2="30" stroke="#ffffff" strokeWidth="1.5" /> {/* Velocity V */}

              {/* Vmax line */}
              <line x1="50" y1="60" x2="450" y2="60" stroke="#e11d48" strokeWidth="1" strokeDasharray="4" />
              <text x="440" y="55" fill="#e11d48" fontSize="8">Vmax</text>

              {/* 1/2 Vmax line */}
              <line x1="50" y1="110" x2="200" y2="110" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3" />
              <text x="40" y="113" fill="#22d3ee" fontSize="8">1/2 Vmax</text>

              {/* Reaction curves */}
              <path d="M 50 160 Q 120 70 450 60" fill="none" stroke="#fbbf24" strokeWidth="2" /> {/* Normal */}
              <path d="M 50 160 Q 200 120 450 60" fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="2" /> {/* Competitive Inhibited */}

              {/* Km points */}
              <circle cx="120" cy="110" r="3" fill="#22d3ee" />
              <line x1="120" y1="110" x2="120" y2="160" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2" />
              <text x="120" y="172" fill="#22d3ee" fontSize="8" textAnchor="middle">Km</text>

              <circle cx="180" cy="110" r="3" fill="#a78bfa" />
              <line x1="180" y1="110" x2="180" y2="160" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2" />
              <text x="180" y="172" fill="#a78bfa" fontSize="8" textAnchor="middle">Km (inhibited)</text>

              <text x="250" y="192" fill="#ffffff" fontSize="9" textAnchor="middle">Substrate Concentration [S]</text>
              <text x="25" y="95" fill="#ffffff" fontSize="9" transform="rotate(-90 25 95)" textAnchor="middle">Velocity V</text>
            </svg>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Inhibition Class</th>
                  <th className="p-3 text-cyan-400">Km Effect</th>
                  <th className="p-3 text-rose-400">Vmax Effect</th>
                  <th className="p-3">Mechanism / Location</th>
                  <th className="p-3">Key Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Competitive</td>
                  <td className="p-3 text-cyan-400">Increases (decreased affinity)</td>
                  <td className="p-3 text-rose-400">Unchanged</td>
                  <td className="p-3">Binds directly to active site. Reversible by excess substrate.</td>
                  <td className="p-3 font-italic">Malonate competing with succinate for Succinate Dehydrogenase</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Non-Competitive</td>
                  <td className="p-3 text-cyan-400">Unchanged</td>
                  <td className="p-3 text-rose-400">Decreases</td>
                  <td className="p-3">Binds allosteric site; changes active site shape irreversibly.</td>
                  <td className="p-3 font-italic">Cyanide binding to Cytochrome c oxidase</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Uncompetitive</td>
                  <td className="p-3 text-cyan-400">Decreases</td>
                  <td className="p-3 text-rose-400">Decreases</td>
                  <td className="p-3">Binds only to the Enzyme-Substrate [ES] complex.</td>
                  <td className="p-3 font-italic">Rare in nature</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: CELL CYCLE & DIVISION ──────────────────────────────── */}
      <Collapsible title="3 · Cell Cycle, Mitosis, Meiosis Stages & Checkpoints" icon={<Workflow className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          
          <SectionBanner label="1. Interphase, DNA Content & Checkpoints" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>G1 Phase (Gap 1):</strong> Cellular growth and organelle replication. Chromosome number 2N, DNA content 2C.</li>
            <li><strong>S Phase (Synthesis):</strong> DNA replication duplicates genome. DNA content doubles from <strong className="text-emerald-400">2C to 4C</strong>. Chromosome number remains <strong className="text-emerald-400">2N</strong>. Centrioles duplicate in cytoplasm.</li>
            <li><strong>G2 Phase (Gap 2):</strong> Tubulin proteins synthesis; final checks. DNA content is 4C, chromosome number is 2N.</li>
            <li><strong>G0 Phase (Quiescent):</strong> Cell exits division cycle, remains metabolically active but does not divide unless stimulated (e.g., heart muscle cells, neurons).</li>
            <li><strong>Regulation:</strong> Controlled by <strong className="text-emerald-400">Cyclins and Cyclin-Dependent Kinases (CDKs)</strong>. Key checkpoints: G1/S (major restriction point), G2/M (mitotic entry controlled by MPF), and Spindle Assembly checkpoint (M checkpoint).</li>
          </ul>

          <SectionBanner label="2. Mitosis (Equational Division) & Significance" color="emerald" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1">
              <strong className="text-cyan-400 block uppercase">Prophase</strong>
              <span>Chromatin condenses. Nuclear envelope breaks down; nucleolus and organelles disappear. Centrioles move to opposite poles.</span>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1">
              <strong className="text-emerald-400 block uppercase">Metaphase</strong>
              <span>Chromosomes align along equatorial plate. Spindle fibers attach to <strong className="text-emerald-400">kinetochores</strong> (protein structures flanking centromeres).</span>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1">
              <strong className="text-amber-400 block uppercase">Anaphase</strong>
              <span>Centromeres split; sister chromatids separate and pull toward opposite poles.</span>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1">
              <strong className="text-rose-400 block uppercase">Telophase</strong>
              <span>Chromosomes decondense at poles. Nuclear envelope reforms; nucleolus, ER, and Golgi reappear.</span>
            </div>
          </div>
          <p className="text-xs mt-2 text-white/60">
            <strong>Cytokinesis:</strong> Division of cytoplasm. Plant cells divide via <strong className="text-emerald-400">cell plate formation</strong> (centrifugal, starts inside from phragmoplast). Animal cells divide via <strong className="text-emerald-400">cleavage furrow formation</strong> (centripetal, ring of actin-myosin microfilaments).
          </p>
          <p className="text-xs text-white/60">
            <strong>Significance of Mitosis:</strong> Growth and development, cell repair/replacement (e.g., epidermis, lining of gut), maintenance of chromosome count (2N ➔ 2N) in daughter tissues.
          </p>

          <SectionBanner label="3. Meiosis: Prophase I Sub-stages" color="emerald" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Prophase I Stage</th>
                  <th className="p-3 text-cyan-400">Key Events / Mechanisms</th>
                  <th className="p-3 text-rose-400">Major Markers / Enzymes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Leptotene</td>
                  <td className="p-3 text-cyan-400">Chromosomes become gradually visible under light microscope. Condensation continues.</td>
                  <td className="p-3 text-rose-400">Bouquet stage of chromatin fibers</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Zygotene</td>
                  <td className="p-3 text-cyan-400">Pairing of homologous chromosomes (<strong className="text-emerald-400">Synapsis</strong>). Form complex of tetrads/bivalents.</td>
                  <td className="p-3 text-rose-400">Synaptonemal complex formation</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Pachytene</td>
                  <td className="p-3 text-cyan-400">Exchange of genetic material between non-sister chromatids of homologous chromosomes (<strong className="text-emerald-400">Crossing Over</strong>).</td>
                  <td className="p-3 text-rose-400">Recombination nodules; <strong className="text-emerald-400">Recombinase</strong> enzyme active</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Diplotene</td>
                  <td className="p-3 text-cyan-400">Dissolution of synaptonemal complex. Homologous chromosomes separate except at crossover sites.</td>
                  <td className="p-3 text-rose-400">X-shaped <strong className="text-emerald-400">Chiasmata</strong> visible. Developmental arrest in some vertebrate oocytes.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Diakinesis</td>
                  <td className="p-3 text-cyan-400">Complete terminalisation of chiasmata. Nuclear envelope disintegrates, spindle fibers assemble.</td>
                  <td className="p-3 text-rose-400">Transition to Metaphase I</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="4. Meiosis I vs. Meiosis II & Significance" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Anaphase I:</strong> Homologous chromosomes separate to opposite poles, but sister chromatids remain associated at centromeres. Reduces chromosome number by half (2N ➔ 1N).</li>
            <li><strong>Anaphase II:</strong> Centromeres split, separating sister chromatids. Equational division (N ➔ N).</li>
            <li><strong>Significance of Meiosis:</strong> Reduces chromosome number by half to maintain species-specific ploidy across generations; crossing over and independent assortment introduce genetic variations crucial for evolution.</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            4 · Cell Analysis & Enzyme Kinetics Laboratory
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Subject plant cells, mitotic root tips, or enzyme mixtures to chemical treatments or stains to analyze structural responses and critical kinetic properties.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('plant_cell')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'plant_cell' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Plant Cell Tissue
                </button>
                <button 
                  onClick={() => setSpecimen('cyanobacteria')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'cyanobacteria' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Cyanobacteria Envelope
                </button>
                <button 
                  onClick={() => setSpecimen('dividing_root')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'dividing_root' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Dividing Onion Root Tip
                </button>
                <button 
                  onClick={() => setSpecimen('enzyme_mix')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'enzyme_mix' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Succinate Dehydrogenase Mix
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Stimulus / Reagent</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'tca', label: 'Extract with Trichloroacetic Acid' },
                  { id: 'colchicine', label: 'Expose to Colchicine spindle poison' },
                  { id: 'malonate', label: 'Add competitive inhibitor Malonate' },
                  { id: 'temp_spike', label: 'Raise Temperature above 60°C' },
                  { id: 'feulgen', label: 'Stain with Feulgen reagent' }
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
            <Tag color="cyan">Problem 1: DNA doubling vs Chromosome number</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"During S phase of the cell cycle, DNA replication occurs. If a diploid cell initially has 2C DNA content and 2N chromosome count, what are the values after S phase?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{renderBoldText("1. DNA replication occurs in the S phase, duplicating every genome copy. The DNA content doubles from **2C to 4C**.")}</div>
              <div>{"2. However, the duplicate sister chromatids remain attached at the single centromere."}</div>
              <div>{renderBoldText("3. Since chromosome count is determined by centromere number, the chromosome number remains unchanged at **2N**.")}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: DNA content is 4C, chromosome number is 2N.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Competitive inhibitor kinetics</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"In a Lineweaver-Burk plot of succinate dehydrogenase kinetics under malonate inhibition, how are Km and Vmax affected?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Malonate is a competitive inhibitor which competes for the active site of succinate dehydrogenase."}</div>
              <div>{renderBoldText("2. Increasing substrate concentration outcompetes malonate, allowing the reaction to reach the same maximum velocity. Thus, **Vmax remains unchanged**.")}</div>
              <div>{renderBoldText("3. However, a higher concentration of substrate is required to achieve half-maximal velocity, meaning **Km increases**.")}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Km increases, Vmax remains unchanged.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Lipid solubility extraction discrepancy</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Explain why lipids, which are non-polymeric molecules of molecular weight < 800 Da, are recovered in the acid-insoluble retentate during chemical analysis."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. True biomacromolecules (proteins, nucleic acids) are polymers with molecular weights exceeding 10,000 Da."}</div>
              <div>{"2. Lipids are small molecules (molecular weight < 800 Da) but are hydrophobic and form extensive lipid bilayer membrane sheets."}</div>
              <div>{"3. Upon mechanical grinding, these membranes break up into spherical water-insoluble vesicles."}</div>
              <div>{"4. These large vesicles are physically too big to pass through the filter pores, causing them to collect in the acid-insoluble retentate."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Lipids form large vesicle aggregates that fail to pass through filter membranes.</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Dicot vs Monocot Seed Endosperm</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why are some dicot seeds described as endospermic while others are non-endospermic? Give one example of each."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. During embryo development, the triploid endosperm tissue provides nutrition to the growing embryo."}</div>
              <div>{"2. In non-endospermic (or exalbuminous) seeds, the endosperm is completely consumed by the developing embryo before seed maturity. Food is instead stored in the cotyledons. Example: Pea, Gram, Bean."}</div>
              <div>{"3. In endospermic (or albuminous) seeds, the endosperm persists in the mature seed and is used during germination. Example: Castor (dicot), Maize (monocot)."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Non-endospermic seeds completely consume endosperm before maturity (Pea); endospermic seeds retain it (Castor).</span>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: DNA Base Ratio Calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"If a double-stranded DNA segment contains 30% Adenine bases, calculate the percentage of Cytosine bases in this segment."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. According to Chargaff\'s base-pairing rules, Adenine pairs with Thymine (A = T), and Guanine pairs with Cytosine (G = C)."}</div>
              <div>{"2. Since A = 30%, then T must also be 30%. Together, A + T = 60% of the bases."}</div>
              <div>{"3. The remaining bases (G + C) constitute 100% - 60% = 40%."}</div>
              <div>{"4. Since G = C, the percentage of Cytosine is 40% / 2 = 20%."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Cytosine bases constitute 20% of the DNA segment.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 6: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="6 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Cell Biology & Biomolecules with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following scientists stated "Omnis cellula-e cellula", implying all cells arise from pre-existing cells?',
                a: 'Matthias Schleiden',
                b: 'Theodor Schwann',
                c: 'Rudolf Virchow',
                d: 'Robert Hooke',
                ans: 'Correct Answer: C. Rudolf Virchow in 1855 modified the Schleiden-Schwann cell theory by introducing the concept of Omnis cellula-e cellula.'
              },
              {
                q: 'Which organelle is a single-membrane bound vesicle rich in acid hydrolases active at pH 5?',
                a: 'Peroxisome',
                b: 'Lysosome',
                c: 'Glyoxysome',
                d: 'Vacuole',
                ans: 'Correct Answer: B. Lysosomes are single-membrane bound vesicles formed by Golgi packaging, filled with digestive enzymes (hydrolases) active in acidic pH (approx. 5).'
              },
              {
                q: 'In a chloroplast, where are the enzymes required for synthesis of carbohydrates and proteins located?',
                a: 'Thylakoids',
                b: 'Grana',
                c: 'Stroma',
                d: 'Inner membrane space',
                ans: 'Correct Answer: C. The stroma contains the enzymes (like RuBisCO) required for carbohydrate and protein synthesis, as well as double-stranded circular DNA and 70S ribosomes.'
              },
              {
                q: 'Which of the following secondary metabolites is classified as a toxin?',
                a: 'Morphine',
                b: 'Vinblastine',
                c: 'Concanavalin A',
                d: 'Ricin',
                ans: 'Correct Answer: D. Toxins include abrin and ricin; Concanavalin A is a lectin; morphine is an alkaloid; vinblastine is a drug.'
              },
              {
                q: 'What is the most abundant protein in the whole biosphere?',
                a: 'Collagen',
                b: 'Keratin',
                c: 'RuBisCO',
                d: 'Myosin',
                ans: 'Correct Answer: C. RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) is the most abundant protein in the biosphere. Collagen is the most abundant animal protein.'
              },
              {
                q: 'Why does cellulose not show a blue color when treated with iodine solution?',
                a: 'It is a complex branched polymer',
                b: 'It lacks helical structures to trap iodine molecules',
                c: 'It contains alpha-glucosidic bonds',
                d: 'It is an animal reserve carbohydrate',
                ans: 'Correct Answer: B. Cellulose is a linear beta-1,4 homopolymer that does not form complex helical structures, meaning it cannot bind or trap iodine to produce color.'
              },
              {
                q: 'If a competitive inhibitor like malonate is added to an enzyme-substrate system, how are Km and Vmax affected?',
                a: 'Km decreases, Vmax remains unchanged',
                b: 'Km increases, Vmax remains unchanged',
                c: 'Km remains unchanged, Vmax decreases',
                d: 'Both Km and Vmax decrease',
                ans: 'Correct Answer: B. Competitive inhibitors compete for the active site. Km increases (lower substrate affinity), but Vmax remains unchanged because excess substrate can outcompete the inhibitor.'
              },
              {
                q: 'At which mitotic phase do duplicated chromosomes align at the equatorial plate of the cell?',
                a: 'Prophase',
                b: 'Metaphase',
                c: 'Anaphase',
                d: 'Telophase',
                ans: 'Correct Answer: B. Metaphase is characterized by alignment of chromosomes along the metaphase (equatorial) plate, attached to spindle fibers at their kinetochores.'
              },
              {
                q: 'During which specific stage of Prophase I of Meiosis I does crossing over take place?',
                a: 'Zygotene',
                b: 'Pachytene',
                c: 'Diplotene',
                d: 'Diakinesis',
                ans: 'Correct Answer: B. Crossing over (genetic exchange mediated by recombinase) takes place during the Pachytene stage of Prophase I.'
              },
              {
                q: 'A chemical agent is added to root tip cells which blocks spindle microtubule assembly. What phase will the dividing cells arrest in?',
                a: 'Prophase',
                b: 'Metaphase',
                c: 'Anaphase',
                d: 'Telophase',
                ans: 'Correct Answer: B. Spindle poisons like Colchicine prevent spindle assembly, arresting cells at Metaphase because chromosomes cannot separate without spindle microtubules.'
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
        <span className="text-[11px] text-white/30 font-mono">Cell & Biomolecules · Unit 3</span>
      </div>

    </div>
  );
}
