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

export default function DiversityDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [substrate, setSubstrate] = useState<'nostoc' | 'diatom' | 'basidio' | 'moss' | 'starfish' | 'lichen' | 'bacteriophage' | 'bird'>('nostoc');
  const [reagent, setReagent] = useState<'salinity' | 'acid_rain' | 'light' | 'metamorphosis' | 'cell_wall' | 'viral_cycle'>('salinity');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    // Lichen and acid rain check
    if (substrate === 'lichen') {
      if (reagent === 'acid_rain') {
        return {
          outcome: 'Death / Decoloration of Lichen Thallus',
          color: 'text-rose-400',
          visualEffect: 'The bright green algal/fungal association turns dull grey and dies.',
          product: 'None (Symbiosis breakdown)',
          explanation: 'Lichens are highly sensitive to air pollution, particularly sulfur dioxide (SO₂). Acid rain dissolves SO₂ which poisons the phycobiont algal chloroplasts, stopping photosynthesis and killing the entire symbiotic structure.',
          trap: 'Lichens are excellent bioindicators of pollution and do NOT grow in polluted city centers or heavy industrial zones. Don\'t forget: Phycobiont cooks food, Mycobiont provides shelter and absorbs water!'
        };
      }
      if (reagent === 'cell_wall') {
        return {
          outcome: 'Dual Composition Detected',
          color: 'text-cyan-400',
          visualEffect: 'Staining reveals a mixture of cellulose (algae) and chitin (fungal hyphae).',
          product: 'Cellulose + Chitin',
          explanation: 'The Phycobiont algal cell wall contains cellulose, whereas the Mycobiont fungal cell wall consists of chitin.',
          trap: 'Always keep their individual cell wall properties distinct.'
        };
      }
    }

    // Cyanobacteria (Nostoc)
    if (substrate === 'nostoc') {
      if (reagent === 'cell_wall') {
        return {
          outcome: 'Peptidoglycan + Gelatinous Sheath',
          color: 'text-cyan-400',
          visualEffect: 'Observation of a thick mucilaginous/gelatinous layer wrapping the cyanobacterial filament.',
          product: 'Peptidoglycan wall + Mucilage',
          explanation: 'Nostoc is a cyanobacterium (Monera) with a peptidoglycan wall surrounded by a gelatinous sheath. In nitrogen-depleted medium, it develops specialized large, pale, thick-walled cells called heterocysts for atmospheric N₂ fixation.',
          trap: 'Only specific cyanobacteria species (like Nostoc and Anabaena) possess heterocysts. It is NOT a universal feature of all cyanobacteria.'
        };
      }
    }

    // Diatoms
    if (substrate === 'diatom') {
      if (reagent === 'cell_wall') {
        return {
          outcome: 'Indestructible Silica Shells',
          color: 'text-cyan-400',
          visualEffect: 'Glistening, rigid, soap-box-like glassy cell walls that resist acid digestion.',
          product: 'Silicified cell walls (Frustules)',
          explanation: 'Diatoms (Chrysophytes, Protista) have cell walls embedded with silica, which form two thin overlapping shells fitting together like a soap box. Because of the silica, the walls are indestructible, accumulating over millions of years to form Diatomaceous Earth.',
          trap: 'Diatomaceous earth is highly gritty and used in polishing, filtration of oils and syrups, and is the chief producer in oceans.'
        };
      }
    }

    // Starfish Metamorphosis
    if (substrate === 'starfish') {
      if (reagent === 'metamorphosis') {
        return {
          outcome: 'Bilateral Larva ➔ Pentamerous Radial Adult',
          color: 'text-emerald-400',
          visualEffect: 'The free-swimming ciliated larva metamorphoses into a bottom-dwelling radial starfish.',
          product: 'Radially symmetrical adult Echinoderm',
          explanation: 'Echinoderms exhibit a unique developmental shift: the larvae are bilaterally symmetrical, but undergo metamorphosis to develop into pentamerous radially symmetrical adults.',
          trap: 'Adult echinoderms are radially symmetrical, but their evolutionary lineage is bilaterian. Examiners love testing this specific developmental symmetry exception!'
        };
      }
    }

    // Moss Funaria dominant phase
    if (substrate === 'moss') {
      if (reagent === 'light') {
        return {
          outcome: 'Haploid Gametophyte Photosynthesis',
          color: 'text-emerald-400',
          visualEffect: 'Dominant leafy green gametophyte actively captures light for carbon fixation.',
          product: 'Sugars / ATP in Gametophyte',
          explanation: 'In Bryophytes (Mosses), the dominant, independent, photosynthetic phase of the life cycle is the haploid gametophyte. The sporophyte is physically attached to and dependent on the gametophyte for nutrition.',
          trap: 'This is the exact opposite of Pteridophytes and Gymnosperms, where the sporophyte is the dominant, independent phase!'
        };
      }
    }

    // Bacteriophage
    if (substrate === 'bacteriophage') {
      if (reagent === 'viral_cycle') {
        return {
          outcome: 'Lytic Burst vs Lysogenic Integration',
          color: 'text-violet-400',
          visualEffect: 'Bacterial cell lyses under virulent conditions, releasing new virions.',
          product: 'Lytic (Virulent) / Lysogenic (Prophage) pathways',
          explanation: 'Bacteriophages reproduce via two cycles: (1) Lytic cycle: Phage DNA replication, assembly, and host cell lysis. (2) Lysogenic cycle: Phage DNA integrates into the host chromosome as a prophage, duplication occurring silently during host cell division.',
          trap: 'Bacteriophages contain double-stranded DNA as their genetic material. Make sure not to confuse them with RNA retroviruses like HIV!'
        };
      }
    }

    // Bird
    if (substrate === 'bird') {
      if (reagent === 'metamorphosis') {
        return {
          outcome: 'Direct Development with Air Sacs',
          color: 'text-emerald-400',
          visualEffect: 'No larval stage; hatchling emerges directly from a calcareous shelled egg.',
          product: 'Aves flight adaptations',
          explanation: 'Birds (Aves) are warm-blooded vertebrates with a 4-chambered heart, feathers, beak, pneumatic (hollow) bones to reduce weight, and air sacs connected to lungs for continuous double respiration.',
          trap: 'Feathers are unique to birds; however, remember that all birds lay calcareous-shelled eggs (oviparous), matching the reptilian egg-laying lineage.'
        };
      }
    }

    return {
      outcome: 'No specific reaction or phase transition observed.',
      color: 'text-rose-400',
      visualEffect: 'No observable change.',
      product: 'None',
      explanation: 'This specific reagent/condition does not trigger a unique taxonomic marker for the selected organism.',
      trap: 'Check other combinations to explore diagnostic features!'
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
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 1</Tag>
            <Tag color="rose">IAT Core Framework</Tag>
            <Tag color="violet">Diversity in the Living World</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Diversity in the <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Living World</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Complete revision framework for Taxonomy, 5-Kingdom Classification, Plant Kingdom life cycles, and Animal Kingdom body plans. Master diagnostic traits, rules of nomenclature, and chordate divisions.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: THE LIVING WORLD & TAXONOMY ────────────────────────── */}
      <Collapsible title="1 · The Living World & Taxonomy Hierarchy" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Defining vs Non-Defining */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider font-display">Defining vs. Non-Defining Properties</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Defining Properties:</strong> Metabolism, Cellular Organization, and Consciousness (response to stimuli) are defining features of life with no exceptions.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Non-Defining Properties:</strong> Growth and Reproduction (mules, sterile worker bees, and infertile human couples do not reproduce; mountains accumulate mass and grow).
                  </div>
                </li>
              </ul>
            </div>

            {/* Rules of Binomial Nomenclature */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider font-display">Rules of Binomial Nomenclature</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Two-Word System:</strong> Generic name (Capitalized) + Specific epithet (lowercase). e.g. <em>Mangifera indica</em>.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Formatting:</strong> Printed in italics; if handwritten, they are separately underlined.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Author Citation:</strong> Author\'s name appears in roman type after the specific epithet (e.g., <em>Mangifera indica</em> Linn.).
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <SectionBanner label="Taxonomic Categories Hierarchy" color="cyan" />
          <p className="leading-relaxed">
            The descending taxonomic hierarchy is: <strong>Kingdom ➔ Phylum/Division ➔ Class ➔ Order ➔ Family ➔ Genus ➔ Species</strong>.
          </p>
          
          {/* SVG Figure 1: Taxonomic Hierarchy Tree */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 600 240" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="300" y="25" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="1">TAXONOMIC HIERARCHY TREE</text>
              
              {/* Nodes hierarchy */}
              <g stroke="#ffffff" strokeWidth="1" opacity="0.15">
                <line x1="300" y1="50" x2="300" y2="200" />
                <line x1="260" y1="70" x2="340" y2="70" />
                <line x1="260" y1="95" x2="340" y2="95" />
                <line x1="260" y1="120" x2="340" y2="120" />
                <line x1="260" y1="145" x2="340" y2="145" />
                <line x1="260" y1="170" x2="340" y2="170" />
              </g>

              {/* Steps */}
              <g fontSize="10" fontWeight="bold" fontFamily="monospace">
                <rect x="220" y="40" width="160" height="20" rx="6" fill="#0e7490" stroke="#22d3ee" strokeWidth="1" />
                <text x="300" y="53" fill="#ffffff" textAnchor="middle">KINGDOM (Animalia)</text>

                <rect x="220" y="65" width="160" height="20" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                <text x="300" y="78" fill="#ffffff" textAnchor="middle">PHYLUM (Chordata)</text>

                <rect x="220" y="90" width="160" height="20" rx="6" fill="#311042" stroke="#d946ef" strokeWidth="1" />
                <text x="300" y="103" fill="#ffffff" textAnchor="middle">CLASS (Mammalia)</text>

                <rect x="220" y="115" width="160" height="20" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
                <text x="300" y="128" fill="#ffffff" textAnchor="middle">ORDER (Carnivora)</text>

                <rect x="220" y="140" width="160" height="20" rx="6" fill="#3f2b0f" stroke="#f59e0b" strokeWidth="1" />
                <text x="300" y="153" fill="#ffffff" textAnchor="middle">FAMILY (Felidae)</text>

                <rect x="220" y="165" width="160" height="20" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                <text x="300" y="178" fill="#ffffff" textAnchor="middle">GENUS (Panthera)</text>

                <rect x="220" y="190" width="160" height="20" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="1" />
                <text x="300" y="203" fill="#ffffff" textAnchor="middle">SPECIES (leo / tigris)</text>
              </g>

              {/* Info pointers */}
              <text x="120" y="55" fill="#a1a1aa" fontSize="9" textAnchor="middle">Highest Level (Least similarities)</text>
              <path d="M 120 65 L 120 185" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="2,2" />
              <text x="120" y="195" fill="#a1a1aa" fontSize="9" textAnchor="middle">Basic Unit (Most similarities)</text>
            </svg>
          </div>

          <div className="p-3 bg-black/45 rounded-xl text-center font-mono text-[12px] text-cyan-300">
            {"Mnemonic (Descending): King Philip Comes Over For Good Soup"}
          </div>

          <SectionBanner label="Taxonomic Aids Summary" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-left text-xs">
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>Herbarium:</strong> Storehouse of dried, pressed, and preserved plant specimens sheets with details.
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>Botanical Garden:</strong> Live plant collections (e.g. Kew, Indian Botanical Garden).
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>Museum:</strong> Preserved animal and plant specimens, insects in boxes, stuffed large animals.
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>Zoological Park:</strong> Ex-situ conservation of wild animals in human-managed parks.
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>Key:</strong> Contradictory pairs (<strong className="text-white">Couplets</strong>) where each statement is a <strong className="text-white">Lead</strong>. Analytical.
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: 5-KINGDOM CLASSIFICATION ───────────────────────────── */}
      <Collapsible title="2 · Five-Kingdom System & Microorganisms" icon={<Layers className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          <p className="leading-relaxed">
            Robert Whittaker (1969) proposed the 5-Kingdom Classification based on cell complexity, body organization, mode of nutrition, reproduction, and phylogenetic relationships.
          </p>

          <ProTip>
            <strong className="text-white">Three-Domain Classification:</strong> Carl Woese proposed the Three-Domain system (Bacteria, Archaea, and Eukarya), dividing Kingdom Monera into two distinct domains based on differences in 16S ribosomal RNA genes.
          </ProTip>

          <SectionBanner label="Kingdom Monera: Shapes & Gram Cell Walls" color="amber" />
          
          {/* SVG Figure 2: Bacterial Shapes & Cell Walls */}
          <div className="py-2 flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Shapes */}
            <svg viewBox="0 0 300 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-3">
              <text x="150" y="20" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">BACTERIAL SHAPES & FLAGELLATION</text>
              
              {/* Coccus */}
              <circle cx="50" cy="70" r="12" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
              <circle cx="68" cy="75" r="10" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1" />
              <text x="59" y="105" fill="#a1a1aa" fontSize="10" textAnchor="middle">Coccus (Spherical)</text>

              {/* Bacillus */}
              <rect x="120" y="55" width="40" height="18" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
              <path d="M 160 64 Q 175 60 185 64" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="140" y="105" fill="#a1a1aa" fontSize="10" textAnchor="middle">Bacillus (Monotrichous)</text>

              {/* Spirillum */}
              <path d="M 215 50 Q 225 60 215 70 Q 205 80 215 90" fill="none" stroke="#ec4899" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 215 50 L 210 38 M 215 90 L 220 102" fill="none" stroke="#ec4899" strokeWidth="1" />
              <text x="215" y="115" fill="#a1a1aa" fontSize="10" textAnchor="middle">Spirillum (Amphitrichous)</text>

              {/* Vibrio */}
              <path d="M 125 140 Q 140 135 150 148" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
              <path d="M 150 148 L 165 152" fill="none" stroke="#10b981" strokeWidth="1" />
              <text x="140" y="170" fill="#a1a1aa" fontSize="10" textAnchor="middle">Vibrio (Comma)</text>
            </svg>

            {/* Cell Walls */}
            <svg viewBox="0 0 320 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-3">
              <text x="160" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">GRAM-POSITIVE VS. GRAM-NEGATIVE</text>
              
              {/* Gram positive */}
              <g transform="translate(10, 0)">
                <text x="65" y="40" fill="#a78bfa" fontSize="10" fontWeight="bold" textAnchor="middle">Gram-Positive</text>
                {/* Thick peptidoglycan */}
                <rect x="15" y="55" width="100" height="25" fill="#7c3aed" rx="3" opacity="0.8" />
                <text x="65" y="70" fill="#ffffff" fontSize="8" textAnchor="middle">Thick Peptidoglycan</text>
                {/* Plasma membrane */}
                <rect x="15" y="90" width="100" height="12" fill="#0d9488" rx="2" />
                <text x="65" y="99" fill="#ffffff" fontSize="7" textAnchor="middle">Plasma Membrane</text>
                {/* Color indicator */}
                <circle cx="65" cy="130" r="10" fill="#8b5cf6" />
                <text x="65" y="155" fill="#a1a1aa" fontSize="9" textAnchor="middle">Purple Stain</text>
              </g>

              {/* Gram negative */}
              <g transform="translate(160, 0)">
                <text x="65" y="40" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">Gram-Negative</text>
                {/* Outer membrane */}
                <rect x="15" y="50" width="100" height="10" fill="#db2777" rx="2" />
                <text x="65" y="58" fill="#ffffff" fontSize="7" textAnchor="middle">Outer Membrane (LPS)</text>
                {/* Thin Peptidoglycan */}
                <rect x="15" y="68" width="100" height="8" fill="#7c3aed" rx="1.5" opacity="0.5" />
                {/* Plasma membrane */}
                <rect x="15" y="85" width="100" height="10" fill="#0d9488" rx="2" />
                {/* Color indicator */}
                <circle cx="65" cy="130" r="10" fill="#f43f5e" />
                <text x="65" y="155" fill="#a1a1aa" fontSize="9" textAnchor="middle">Pink/Red Stain</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2 text-xs">
              <span className="font-bold text-cyan-400 block uppercase">Eubacteria (Shapes & Cell Walls)</span>
              <ul className="list-disc pl-4 space-y-1.5 text-white/60">
                <li><strong>Shapes:</strong> Coccus (spherical), Bacillus (rod), Spirillum (spiral), Vibrio (comma-shaped).</li>
                <li><strong>Flagellation:</strong> Atrichous (none), Monotrichous (one), Lophotrichous (tuft at one end), Amphitrichous (one at both ends), Peritrichous (all over).</li>
                <li><strong>Gram Staining:</strong> Gram-positive (retains crystal violet, thick peptidoglycan cell wall) vs. Gram-negative (retains pink/safranin, thin peptidoglycan layer + outer lipopolysaccharide membrane).</li>
                <li><strong>Reproduction:</strong> Primarily by binary fission; under unfavorable conditions they produce endospores (*Bacillus*, *Clostridium*).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2 text-xs">
              <span className="font-bold text-rose-400 block uppercase">Archaebacteria & Mycoplasma</span>
              <ul className="list-disc pl-4 space-y-1.5 text-white/60">
                <li><strong>Archaebacteria:</strong> Extreme habitats due to different cell wall structures (lipids with branched chains). Halophiles (salty areas), Thermoacidophiles (hot springs), Methanogens (marshy areas, gut of ruminants).</li>
                <li><strong>Mycoplasma:</strong> Completely lack a cell wall, smallest living cells, pleomorphic, survive without oxygen, pathogenic.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="Kingdom Protista (Unicellular Eukaryotes)" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-400 block uppercase">Protozoans</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Amoeboid:</strong> Move via pseudopodia (*Amoeba*, *Entamoeba*).</li>
                <li><strong>Flagellated:</strong> Possess flagella (*Trypanosoma* - sleeping sickness).</li>
                <li><strong>Ciliated:</strong> Cilia movement (*Paramecium*).</li>
                <li><strong>Sporozoans:</strong> Infectious spore stage (*Plasmodium* - malaria).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-emerald-400 block uppercase">Slime Moulds</span>
              <p className="text-white/60">
                Saprophytic protists. Under suitable conditions, they form aggregates called <strong className="text-white">Plasmodium</strong>. Under unfavorable conditions, the plasmodium differentiates into fruiting bodies bearing spores.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-rose-400 block uppercase">Chrysophytes & Dinoflagellates</span>
              <p className="text-white/60">
                Diatoms possess soap-box silica frustules. Dinoflagellates have two flagella and cause toxic red tides (*Gonyaulax*).
              </p>
            </div>
          </div>

          <SectionBanner label="Kingdom Fungi (Eukaryotic Heterotrophs)" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase">Fungal Reproduction Cycle</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Asexual:</strong> Budding (yeast), fragmentation, spores (conidia, sporangiospores).</li>
                <li><strong>Sexual Phases:</strong>
                  <ol className="list-decimal pl-5 mt-1 space-y-1">
                    <li><strong>Plasmogamy:</strong> Fusion of protoplasms between two motile/non-motile gametes.</li>
                    <li><strong>Karyogamy:</strong> Fusion of two nuclei. (In Ascomycetes and Basidiomycetes, an intervening dikaryotic stage n+n occurs).</li>
                    <li><strong>Meiosis:</strong> division in zygote resulting in haploid spores.</li>
                  </ol>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase">Mycorrhiza Symbiosis</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Ectomycorrhiza:</strong> Fungal hyphae form a dense sheath (mantle) around the root surface, penetrating only intercellular spaces of the cortex.</li>
                <li><strong>Endomycorrhiza:</strong> Hyphae penetrate inside the cortical cells, forming arbuscules or vesicles (VAM - Vesicular Arbuscular Mycorrhiza).</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="Viruses & Bacteriophage Cycles" color="amber" />
          
          {/* SVG Figure 3: Bacteriophage Cycles */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 600 240" className="w-full max-w-2xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="300" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">BACTERIOPHAGE REPRODUCTION CYCLES</text>
              
              {/* Lytic cycle */}
              <g transform="translate(50, 0)">
                <rect x="10" y="45" width="220" height="175" rx="10" fill="none" stroke="#db2777" strokeWidth="1" strokeDasharray="4,2" />
                <text x="120" y="65" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">LYTIC PATHWAY (Virulent)</text>
                
                <circle cx="60" cy="110" r="18" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <path d="M 50 110 L 70 110" stroke="#f472b6" strokeWidth="1" />
                <text x="60" y="145" fill="#a1a1aa" fontSize="8" textAnchor="middle">1. Infection</text>

                <path d="M 95 110 L 115 110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

                <circle cx="150" cy="110" r="18" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <path d="M 140 102 L 145 115 L 155 105 L 160 118" fill="none" stroke="#f472b6" strokeWidth="1" />
                <text x="150" y="145" fill="#a1a1aa" fontSize="8" textAnchor="middle">2. Replication</text>

                <path d="M 150 135 L 150 155" stroke="#f59e0b" strokeWidth="2" />

                <circle cx="150" cy="180" r="18" fill="#e11d48" stroke="#ef4444" strokeWidth="1" opacity="0.7" />
                <text x="150" y="183" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">LYSIS</text>
                <text x="150" y="210" fill="#a1a1aa" fontSize="8" textAnchor="middle">3. Host Cell Burst</text>
              </g>

              {/* Lysogenic cycle */}
              <g transform="translate(330, 0)">
                <rect x="10" y="45" width="220" height="175" rx="10" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="4,2" />
                <text x="120" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">LYSOGENIC PATHWAY (Temperate)</text>
                
                <circle cx="60" cy="110" r="18" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <circle cx="60" cy="110" r="8" fill="none" stroke="#10b981" strokeWidth="1" />
                <text x="60" y="145" fill="#a1a1aa" fontSize="8" textAnchor="middle">1. Integration</text>

                <path d="M 95 110 L 115 110" stroke="#f59e0b" strokeWidth="2" />

                <circle cx="150" cy="110" r="18" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <circle cx="150" cy="110" r="8" fill="none" stroke="#10b981" strokeWidth="1" />
                <text x="150" y="145" fill="#a1a1aa" fontSize="8" textAnchor="middle">2. Prophage Divides</text>

                <text x="120" y="190" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontStyle="italic">Host cell survives and replicates</text>
              </g>
            </svg>
          </div>

          <ul className="list-disc pl-4 space-y-2 text-white/60 text-xs">
            <li><strong>Viral Structure:</strong> Protein coat (<strong className="text-white">Capsid</strong> composed of subunits called capsomeres) enclosing genetic material (DNA or RNA, never both). Retroviruses like HIV contain single-stranded RNA and reverse transcriptase.</li>
            <li><strong>Lichens:</strong> Symbiosis of Phycobiont (algae) and Mycobiont (fungi). Classified by growth form: <strong className="text-white">Crustose</strong> (crust-like, e.g. *Graphis*), <strong className="text-white">Foliose</strong> (leaf-like, e.g. *Parmelia*), <strong className="text-white">Fruticose</strong> (shrubby, e.g. *Usnea*). Highly sensitive to air pollution.</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: PLANT KINGDOM & LIFE CYCLES ────────────────────────── */}
      <Collapsible title="3 · Plant Kingdom: Algae Classes & Life Cycles" icon={<TrendingUp className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          <SectionBanner label="1. Algae Classes Comparative Grid" color="emerald" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Class</th>
                  <th className="p-3">Pigments</th>
                  <th className="p-3 text-cyan-400">Stored Food</th>
                  <th className="p-3 text-rose-400">Cell Wall</th>
                  <th className="p-3">Flagella</th>
                  <th className="p-3">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Chlorophyceae (Green)</td>
                  <td className="p-3">Chlorophyll a, b</td>
                  <td className="p-3 text-cyan-400 font-semibold">Starch</td>
                  <td className="p-3 text-rose-400">Cellulose</td>
                  <td className="p-3">2-8, equal, apical</td>
                  <td className="p-3 font-italic">Chlamydomonas, Volvox, Spirogyra</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Phaeophyceae (Brown)</td>
                  <td className="p-3">Chlorophyll a, c + Fucoxanthin</td>
                  <td className="p-3 text-cyan-400 font-semibold">Laminarin / Mannitol</td>
                  <td className="p-3 text-rose-400">Cellulose + Algin</td>
                  <td className="p-3">2, unequal, lateral</td>
                  <td className="p-3 font-italic">Ectocarpus, Fucus, Sargassum, Kelps</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Rhodophyceae (Red)</td>
                  <td className="p-3">Chlorophyll a, d + Phycoerythrin</td>
                  <td className="p-3 text-cyan-400 font-semibold">Floridean Starch</td>
                  <td className="p-3 text-rose-400">Cellulose, pectin & sulphate esters</td>
                  <td className="p-3">Absent</td>
                  <td className="p-3 font-italic">Polysiphonia, Porphyra, Gelidium</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="2. Angiosperm Double Fertilization" color="emerald" />
          
          {/* SVG Figure 4: Double Fertilization */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 600 220" className="w-full max-w-2xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="300" y="20" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">ANGIOSPERM DOUBLE FERTILIZATION</text>
              
              {/* Pollen tube entry */}
              <g transform="translate(80, 40)">
                <rect x="0" y="0" width="140" height="140" rx="8" fill="none" stroke="#10b981" strokeWidth="1" />
                <path d="M 70 0 L 70 120" fill="none" stroke="#fbbf24" strokeWidth="4" />
                <circle cx="70" cy="120" r="4" fill="#ef4444" />
                <circle cx="80" cy="110" r="4" fill="#ef4444" />
                <text x="70" y="-10" fill="#fbbf24" fontSize="9" textAnchor="middle">Pollen Tube</text>
                <text x="70" y="135" fill="#a1a1aa" fontSize="8" textAnchor="middle">2 Male Gametes (n)</text>
              </g>

              {/* Syngamy */}
              <g transform="translate(260, 40)">
                <rect x="0" y="0" width="130" height="60" rx="8" fill="none" stroke="#22d3ee" strokeWidth="1" />
                <text x="65" y="20" fill="#22d3ee" fontSize="10" fontWeight="bold" textAnchor="middle">SYNGAMY</text>
                <text x="65" y="38" fill="#ffffff" fontSize="9" textAnchor="middle">Gamete (n) + Egg (n)</text>
                <text x="65" y="52" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">➔ Zygote (2n)</text>
              </g>

              {/* Triple Fusion */}
              <g transform="translate(260, 120)">
                <rect x="0" y="0" width="130" height="60" rx="8" fill="none" stroke="#f472b6" strokeWidth="1" />
                <text x="65" y="20" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">TRIPLE FUSION</text>
                <text x="65" y="38" fill="#ffffff" fontSize="9" textAnchor="middle">Gamete (n) + 2 Polar nuclei (2n)</text>
                <text x="65" y="52" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">➔ PEN (3n)</text>
              </g>

              {/* Endosperm note */}
              <g transform="translate(420, 40)">
                <rect x="0" y="0" width="120" height="140" rx="8" fill="#042f1a" stroke="#10b981" strokeWidth="1" opacity="0.8" />
                <text x="60" y="25" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Endosperm (3n)</text>
                <text x="60" y="55" fill="#ffffff" fontSize="8" textAnchor="middle">Coordinates nutrition</text>
                <text x="60" y="70" fill="#ffffff" fontSize="8" textAnchor="middle">investment with</text>
                <text x="60" y="85" fill="#ffffff" fontSize="8" textAnchor="middle">embryo formation</text>
                <text x="60" y="110" fill="#fbbf24" fontSize="8" textAnchor="middle">No wasted energy!</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase">Bryophytes & Pteridophytes</span>
              <ul className="list-disc pl-4 space-y-1.5 text-white/60">
                <li><strong>Bryophytes:</strong> Division includes Liverworts (dorsiventrally flattened thallus, asexual cup-like <strong className="text-white">gemmae</strong> in *Marchantia*) and Mosses (*Funaria* has two gametophyte stages: filamentous <strong className="text-white">protonema</strong> and upright <strong className="text-white">leafy stage</strong>; sporophyte contains foot, seta, and capsule with peristome teeth).</li>
                <li><strong>Pteridophytes:</strong> First vascular land plants. Can be <strong className="text-white">Homosporous</strong> (producing one type of spores: *Lycopodium*, *Equisetum*) or <strong className="text-white">Heterosporous</strong> (producing two types of spores - microspores and megaspores: *Selaginella*, *Salvinia*). Spores germinate to form a multicellular, free-living thalloid gametophyte called a <strong className="text-white">prothallus</strong>.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase">Gymnosperms & Angiosperms</span>
              <ul className="list-disc pl-4 space-y-1.5 text-white/60">
                <li><strong>Gymnosperms:</strong> Bear microsporangiate (male) and megasporangiate (female) cones. Pollination is primarily anemophilous (wind-borne). Pollen tube conveys male gametes directly to the archegonia in ovules. Seeds are naked.</li>
                <li><strong>Angiosperms:</strong> Double Fertilization:
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li><strong>Syngamy:</strong> Male gamete (n) + Egg (n) ➔ Zygote (2n).</li>
                    <li><strong>Triple Fusion:</strong> Male gamete (n) + 2 polar nuclei (2n) ➔ Primary Endosperm Nucleus (3n).</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: ANIMAL KINGDOM BODY PLANS ──────────────────────────── */}
      <Collapsible title="4 · Animal Kingdom: Body Plans & Diagnostic Phyla" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          <SectionBanner label="1. Classification Criteria" color="violet" />
          <ul className="list-disc pl-4 space-y-2 text-white/60">
            <li><strong>Organization:</strong> Cellular (Porifera) ➔ Tissue (Cnidaria, Ctenophora) ➔ Organ (Platyhelminthes) ➔ Organ System.</li>
            <li><strong>Symmetry:</strong> Radial (Cnidaria, Ctenophora, adult Echinoderms) vs. Bilateral (Annelida onwards, Echinoderm larvae).</li>
            <li><strong>Coelom:</strong> Acoelomate (Platyhelminthes), Pseudocoelomate (Aschelminthes - mesoderm is scattered pouches), Coelomate (Annelids onwards).</li>
          </ul>

          <SectionBanner label="2. High-Yield Phylum Diagnostics" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Phylum</th>
                  <th className="p-3 text-cyan-400">Diagnostic Features</th>
                  <th className="p-3 text-rose-400">Key Organ / Trap</th>
                  <th className="p-3">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Porifera</td>
                  <td className="p-3">Canal system, porous body</td>
                  <td className="p-3 text-rose-400">Choanocytes (collar cells)</td>
                  <td className="p-3 font-italic">Sycon, Spongilla</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Cnidaria</td>
                  <td className="p-3">Metagenesis (Obelia), polyp/medusa</td>
                  <td className="p-3 text-rose-400">Cnidoblasts (stinging cells)</td>
                  <td className="p-3 font-italic">Aurelia, Obelia</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Ctenophora</td>
                  <td className="p-3">Bioluminescence, marine</td>
                  <td className="p-3 text-rose-400">8 rows of ciliated comb plates</td>
                  <td className="p-3 font-italic">Pleurobrachia</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Platyhelminthes</td>
                  <td className="p-3">Flat body, acoelomate</td>
                  <td className="p-3 text-rose-400">Flame cells (excretion)</td>
                  <td className="p-3 font-italic">Taenia, Planaria</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Aschelminthes</td>
                  <td className="p-3">Roundworms, complete gut</td>
                  <td className="p-3 text-rose-400">Pseudocoelomate cavity</td>
                  <td className="p-3 font-italic">Ascaris, Wuchereria</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Annelida</td>
                  <td className="p-3">True segmentations (metameres)</td>
                  <td className="p-3 text-rose-400">Nephridia, parapodia (Nereis only)</td>
                  <td className="p-3 font-italic">Nereis, Earthworm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Arthropoda</td>
                  <td className="p-3">Chitinous exoskeleton, open blood</td>
                  <td className="p-3 text-rose-400">Jointed appendages, Malpighian tubules</td>
                  <td className="p-3 font-italic">Apis, Cockroach</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Mollusca</td>
                  <td className="p-3">Unsegmented soft body, shell</td>
                  <td className="p-3 text-rose-400">Radula rasping feeding organ (absent in bivalves)</td>
                  <td className="p-3 font-italic">Pila, Octopus</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Echinodermata</td>
                  <td className="p-3">Spiny skin, larval bilateral/adult radial</td>
                  <td className="p-3 text-rose-400">Water Vascular System (locomotion)</td>
                  <td className="p-3 font-italic">Asterias (Starfish)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Hemichordata</td>
                  <td className="p-3">Worm-like marine, stomochord</td>
                  <td className="p-3 text-rose-400">Proboscis gland (excretion)</td>
                  <td className="p-3 font-italic">Balanoglossus</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Chordata Subphyla & Vertebrate Classes" color="violet" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase">Chordata Subphyla</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Urochordata:</strong> Notochord present only in larval tail, disappearing in sedentary adults (e.g. <em>Ascidia</em>).</li>
                <li><strong>Cephalochordata:</strong> Notochord extends from head to tail and persists throughout life (e.g. <em>Branchiostoma</em>).</li>
                <li><strong>Vertebrata:</strong> Notochord replaced by a cartilaginous or bony vertebral column in adults.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase font-display">Vertebrata Classes Comparison</span>
              <ul className="list-disc pl-4 space-y-1.5 text-white/60">
                <li><strong>Chondrichthyes (Cartilaginous fish):</strong> Placoid scales, operculum absent, air bladder absent (must swim constantly to avoid sinking), ventral mouth. e.g. *Scoliodon* (Dogfish).</li>
                <li><strong>Osteichthyes (Bony fish):</strong> Cycloid/ctenoid scales, operculum present, air bladder present, terminal mouth. e.g. *Labeo* (Rohu).</li>
                <li><strong>Amphibia:</strong> Dual life, moist scale-less skin, 3-chambered heart (2 auricles, 1 ventricle), external fertilization.</li>
                <li><strong>Reptilia:</strong> Dry cornified skin with scales/scutes, 3-chambered heart (4-chambered in crocodiles), internal fertilization, calcareous eggs.</li>
                <li><strong>Aves (Birds):</strong> Feathers, beak, forelimbs modified into wings, pneumatic (hollow) bones, 4-chambered heart, air sacs for double respiration, warm-blooded (homeothermous).</li>
                <li><strong>Mammalia:</strong> Mammary glands, hair, diaphragm, 4-chambered heart. Division: Monotremes (egg-laying, *Ornithorhynchus*), Marsupials (pouched, *Macropus*), Placentals (*Rattus*, *Homo*).</li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 5: INTERACTIVE SIMULATOR ──────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            5 · Diversity & Taxonomy Diagnostic Lab Simulator
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select a biological specimen and a test environment to identify unique taxonomic markers, life cycle patterns, and specific evolutionary configurations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Substrate Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSubstrate('nostoc')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'nostoc' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Nostoc (Cyanobacteria)
                </button>
                <button 
                  onClick={() => setSubstrate('diatom')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'diatom' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Diatom (Chrysophyte)
                </button>
                <button 
                  onClick={() => setSubstrate('moss')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'moss' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Funaria (Moss Gametophyte)
                </button>
                <button 
                  onClick={() => setSubstrate('starfish')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'starfish' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Starfish Larva/Adult
                </button>
                <button 
                  onClick={() => setSubstrate('lichen')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'lichen' ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Lichen Specimen
                </button>
                <button 
                  onClick={() => setSubstrate('bacteriophage')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'bacteriophage' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Bacteriophage (Virus)
                </button>
                <button 
                  onClick={() => setSubstrate('bird')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'bird' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Pigeon (Aves Class)
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Condition / Reagent</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'salinity', label: 'Check Salinity tolerance' },
                  { id: 'acid_rain', label: 'Check SO₂ Air Pollution' },
                  { id: 'light', label: 'Expose to Light / Darkness' },
                  { id: 'metamorphosis', label: 'Trigger Metamorphosis phase' },
                  { id: 'cell_wall', label: 'Perform Cell Wall Staining' },
                  { id: 'viral_cycle', label: 'Analyze Virulent reproduction' }
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
              <span className="text-xs font-mono text-cyan-400">Status: Complete</span>
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
                  <span className="text-white/40 block text-[10px] uppercase">Scientific details</span>
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

      {/* ─── SECTION 6: CONCEPTUAL SOLVED PROBLEMS ─────────────────────────── */}
      <Collapsible title="6 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 font-sans text-[13px]">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Echinoderm Symmetry Exception</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An adult echinoderm exhibits radial symmetry, but the phylum is grouped under Bilateria. Justify this classification."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Radial symmetry in adult echinoderms is a secondary adaptation for a sedentary/benthic lifestyle."}</div>
              <div>{"2. Echinoderm larvae are strictly bilaterally symmetrical, showing their true ancestral bilaterian lineage."}</div>
              <div>{"3. Therefore, they are phylogenetically grouped under Bilateria based on larval symmetry characteristics."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Larval bilateral symmetry represents their true phylogenetic lineage.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Angiosperm Double Fertilization</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Describe the two fusion events of double fertilization and state their end products."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Syngamy: One male gamete (n) fuses with the egg cell (n) to form the diploid zygote (2n), which develops into the embryo."}</div>
              <div>{"2. Triple Fusion: The second male gamete (n) fuses with two polar nuclei (2n) to form the triploid Primary Endosperm Nucleus (PEN, 3n), which forms the endosperm."}</div>
              <div>{"3. This coordinates endosperm nutrient investment with successful embryo formation, conserving energy."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Zygote (2n) via Syngamy + Primary Endosperm Nucleus (3n) via Triple Fusion.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Gram-Negative Cell Wall Outer Membrane</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why are Gram-negative bacteria generally more resistant to many antibiotics compared to Gram-positive bacteria?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Gram-negative bacteria possess an outer membrane rich in lipopolysaccharides (LPS) surrounding their thin peptidoglycan cell wall."}</div>
              <div>{"2. This outer membrane acts as an effective permeability barrier, blocking large hydrophobic antibiotic molecules."}</div>
              <div>{"3. In contrast, Gram-positive bacteria lack this outer lipid membrane, leaving their thick peptidoglycan cell wall directly exposed."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The presence of the outer lipopolysaccharide membrane blocks antibiotic entry.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 8: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="8 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Biological Diversity with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following properties is a defining feature of living organisms?',
                a: 'Self-replication',
                b: 'Growth',
                c: 'Metabolism',
                d: 'Reproduction',
                ans: 'Correct Answer: C. Metabolism is a defining property because chemical reactions occur in all living cells without exception. Inanimate objects do not exhibit metabolism.'
              },
              {
                q: 'In the taxonomic hierarchy, which descending sequence is correct?',
                a: 'Kingdom ➔ Class ➔ Order ➔ Family ➔ Genus ➔ Species',
                b: 'Kingdom ➔ Phylum ➔ Order ➔ Class ➔ Genus ➔ Species',
                c: 'Species ➔ Genus ➔ Family ➔ Order ➔ Class ➔ Phylum',
                d: 'Kingdom ➔ Phylum ➔ Family ➔ Order ➔ Class ➔ Genus',
                ans: 'Correct Answer: A. The correct descending sequence is Kingdom ➔ Phylum/Division ➔ Class ➔ Order ➔ Family ➔ Genus ➔ Species.'
              },
              {
                q: 'Which of the following cyanobacteria species possesses specialized cells (heterocysts) for nitrogen fixation?',
                a: 'Chlamydomonas',
                b: 'Nostoc',
                c: 'Mycoplasma',
                d: 'Spirogyra',
                ans: 'Correct Answer: B. Nostoc and Anabaena are cyanobacteria that possess thick-walled heterocysts for nitrogen fixation.'
              },
              {
                q: 'Diatoms are grouped under Protista. Their indestructible cell walls are due to the embedding of:',
                a: 'Chitin',
                b: 'Silica',
                c: 'Pectin',
                d: 'Cellulose',
                ans: 'Correct Answer: B. Diatoms possess cell walls embedded with silica, making them indestructible and leading to the formation of diatomaceous earth.'
              },
              {
                q: 'Floridean starch is the stored food material in which algae class?',
                a: 'Chlorophyceae',
                b: 'Phaeophyceae',
                c: 'Rhodophyceae',
                d: 'Chrysophyta',
                ans: 'Correct Answer: C. Rhodophyceae (red algae) stores food in the form of Floridean starch, which is structurally similar to amylopectin and glycogen.'
              },
              {
                q: 'Which plant group represents the first vascular terrestrial plants?',
                a: 'Bryophytes',
                b: 'Pteridophytes',
                c: 'Gymnosperms',
                d: 'Angiosperms',
                ans: 'Correct Answer: B. Pteridophytes are the evolutionary first vascular plants to colonize land (possessing xylem and phloem).'
              },
              {
                q: 'Which phylum is characterized by a pseudocoelomate body plan?',
                a: 'Platyhelminthes',
                b: 'Aschelminthes',
                c: 'Annelida',
                d: 'Arthropoda',
                ans: 'Correct Answer: B. Aschelminthes (roundworms) possess a pseudocoelom where the body cavity is not lined by mesoderm, but exists as scattered pouches.'
              },
              {
                q: 'Adult echinoderms exhibit radial symmetry, while their larvae exhibit:',
                a: 'Asymmetry',
                b: 'Bilateral symmetry',
                c: 'Spherical symmetry',
                d: 'Radial symmetry',
                ans: 'Correct Answer: B. Echinoderm larvae are bilaterally symmetrical, which is a major phylogenetic indicator of their evolutionary lineage.'
              },
              {
                q: 'In Urochordata, the notochord is present in:',
                a: 'Larval tail only',
                b: 'Head to tail throughout life',
                c: 'Embryonic vertebral column',
                d: 'Adult tail only',
                ans: 'Correct Answer: A. In Urochordates, the notochord is present only in the larval tail and completely degenerates in the sedentary adult phase.'
              },
              {
                q: 'Which of the following lacks a cell wall and represents the smallest living cell that can survive without oxygen?',
                a: 'Cyanobacteria',
                b: 'Mycoplasma',
                c: 'Diatoms',
                d: 'Euglenoids',
                ans: 'Correct Answer: B. Mycoplasmas are the smallest known living cells. They completely lack a cell wall and can survive without oxygen.'
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
        <span className="text-[11px] text-white/30 font-mono">Diversity in the Living World · Unit 1</span>
      </div>

    </div>
  );
}
