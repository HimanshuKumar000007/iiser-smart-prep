import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { 
  Atom, 
  Layers, 
  BookOpen, 
  Award,
  SlidersHorizontal
} from 'lucide-react';

const renderBoldText = (text: string) => {
  if (!text) return null;
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="text-zinc-500">{part}</strong>;
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

export default function EcologyDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'desert_plant' | 'phytoplankton' | 'forest_habitat' | 'orchid'>('desert_plant');
  const [treatment, setTreatment] = useState<'water_stress' | 'introduce_herbivore' | 'clear_land' | 'seed_bank'>('water_stress');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    if (treatment === 'water_stress' && specimen === 'desert_plant') {
      return {
        outcome: 'CAM Pathway Activated & Stomatal Closure',
        color: 'text-amber-400',
        visualEffect: 'Desert plant (e.g., Opuntia) closing stomata during the day to prevent transpiration, using CAM photosynthesis.',
        product: 'NPP preserved under drought conditions; leaves reduced to spines',
        explanation: 'Xerophytic plants exhibit structural adaptations (sunken stomata, thick cuticles, leaves reduced to spines) and biochemical adaptations (Crassulacean Acid Metabolism - CAM) to minimize transpiration loss while keeping carbon fixation active at night.',
        trap: 'Opuntia has no leaves; its photosynthetic function is carried out by its flattened stems (phylloclades).'
      };
    }

    if (treatment === 'introduce_herbivore' && specimen === 'phytoplankton') {
      return {
        outcome: 'Inverted Biomass Pyramid Formation',
        color: 'text-cyan-400',
        visualEffect: 'Introduction of herbivorous fish grazing rapidly on high-turnover phytoplankton.',
        product: 'Inverted standing crop biomass (Phytoplankton < Zooplankton < Fish)',
        explanation: 'In aquatic ecosystems, the pyramid of biomass is inverted. Phytoplankton have a very small standing crop biomass at any given instant because they are grazed upon rapidly, but their high turnover rate (productivity) keeps the food chain supplied with energy.',
        trap: 'Even though the pyramid of biomass is inverted in the sea, the pyramid of energy is always upright. Energy can never be inverted.'
      };
    }

    if (treatment === 'clear_land' && specimen === 'forest_habitat') {
      return {
        outcome: 'Species-Area Depletion calculated via Humboldt&apos;s Law',
        color: 'text-rose-400',
        visualEffect: '50% of forest cleared, creating habitat fragmentation and reducing total species richness.',
        product: 'Species richness (S) decreases following S = C A^z where z is 0.1 to 0.2 locally',
        explanation: 'Alexander von Humboldt observed that within a region, species richness increases with increasing explored area, but only up to a limit. When a habitat is fragmented, the species richness drops exponentially. For large areas (e.g. continents), the slope Z is steeper (0.6 - 1.2).',
        trap: 'Habitat loss and fragmentation is the number one cause of the Evil Quartet driving animal and plant extinctions.'
      };
    }

    if (treatment === 'seed_bank' && specimen === 'orchid') {
      return {
        outcome: 'Ex-situ Cryopreservation Activated',
        color: 'text-emerald-400',
        visualEffect: 'Endangered orchid seeds/gametes stored at -196°C in liquid nitrogen.',
        product: 'Off-site preservation of genetic diversity',
        explanation: 'Ex-situ conservation involves taking threatened organisms out of their natural habitats and placing them under human protection. Methods include botanical gardens, zoological parks, cryopreservation, seed banks, and tissue cultures.',
        trap: 'Biosphere reserves, national parks, wildlife sanctuaries, and sacred groves are in-situ conservation, not ex-situ.'
      };
    }

    return {
      outcome: 'Incompatible reaction. Reagent is incompatible with this ecological specimen.',
      color: 'text-zinc-400',
      visualEffect: 'No observable change in ecosystem equilibrium.',
      product: 'None',
      explanation: 'Try matching the correct specimen with its appropriate environmental stress or relocation strategy.',
      trap: 'Check ecological factors like abiotic stress, herbivore trophic relationships, habitat size, or conservation type.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white ecology-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .ecology-chapter .text-xs { font-size: 13px !important; }
        .ecology-chapter .text-sm { font-size: 15px !important; }
        .ecology-chapter .text-base { font-size: 17.5px !important; }
        .ecology-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .ecology-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .ecology-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .ecology-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .ecology-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 10</Tag>
            <Tag color="rose">High Yield</Tag>
            <Tag color="violet">Ecology</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Ecology & Environment: <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Populations, Ecosystems & Conservation</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            IAT-aligned comprehensive revision notes covering Verhulst-Pearl logistic growth models, population interactions, productivity equations, Lindeman&apos;s energy pathways, Humboldt&apos;s species-area curves, and biological conservation.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: ORGANISMS AND POPULATIONS ──────────────────────────── */}
      <Collapsible title="1 · Organisms and Populations" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Populations: Attributes & Age Pyramids" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Population Attributes:</strong> Unlike an individual which has births and deaths, a population has <strong className="text-zinc-500">birth rates</strong>, <strong className="text-zinc-500">death rates</strong>, and a <strong className="text-zinc-500">sex ratio</strong>.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Birth/Death rates are calculated as change in numbers relative to initial members of the population.</li>
              </ul>
            </li>
            <li><strong>Population Density (N):</strong> Represents population size in a given area. Can be measured as <strong className="text-zinc-500">absolute density</strong> (total count, biomass) or <strong className="text-zinc-500">relative density</strong> (e.g. number of fish caught per trap, pugmarks/fecal pellets for tiger censuses).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Density Change Equation:</strong> The population size at time <InlineMath math="t+1" /> is expressed as:
                  <DisplayMath math="N_{t+1} = N_t + [ (B + I) - (D + E) ]" />
                  Where <InlineMath math="B" /> = Natality, <InlineMath math="I" /> = Immigration, <InlineMath math="D" /> = Mortality, and <InlineMath math="E" /> = Emigration.
                </li>
              </ul>
            </li>
            <li><strong>Ecological Adaptations (Survival Mechanisms):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Allen&apos;s Rule:</strong> Mammals living in colder climates generally have shorter ears and extremities (limbs) to minimize heat loss.</li>
                <li><strong>Bergmann&apos;s Rule:</strong> Warm-blooded (endothermic) animals tend to be larger in size in colder environments because larger bodies have a lower surface-area-to-volume ratio, conserving heat.</li>
                <li><strong>Kangaroo Rat (North American Deserts):</strong> Meets all water requirements through internal fat oxidation (producing water as byproduct) and has the ability to concentrate its urine to a minimal volume.</li>
                <li><strong>Antarctic Fishes:</strong> Contain specialized <strong className="text-zinc-500">antifreeze proteins</strong> (glycoproteins) in their body fluids that prevent ice crystal growth down to -1.9°C.</li>
                <li><strong>Desert Lizards (Behavioral adaptation):</strong> Lack physiological thermoregulation. Maintain steady body temperature behaviorally by basking in the sun to absorb heat, then moving to shade when ambient temperature rises.</li>
                <li><strong>Dormancy (Dodge in Time):</strong> <strong className="text-zinc-500">Hibernation</strong> (winter sleep in bears), <strong className="text-zinc-500">Aestivation</strong> (summer sleep in snails and fish to avoid heat/desiccation), and <strong className="text-zinc-500">Diapause</strong> (stage of suspended development in zooplankton under unfavorable conditions).</li>
                <li><strong>Migration (Dodge in Space):</strong> Organisms temporarily move from stressful habitats to hospitable areas. Example: Keoladeo National Park in Bharatpur (Rajasthan) hosts thousands of migratory birds (Siberian cranes) in winter.</li>
              </ul>
            </li>
            <li><strong>Age Pyramids:</strong> Plotting the percentage of individuals in three age groups: <strong className="text-zinc-500">Pre-reproductive</strong>, <strong className="text-zinc-500">Reproductive</strong>, and <strong className="text-zinc-500">Post-reproductive</strong>:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Expanding (Triangular):</strong> Pre-reproductive group is very large. Population grows rapidly.</li>
                <li><strong>Stable (Bell-shaped):</strong> Pre-reproductive and reproductive groups are almost equal.</li>
                <li><strong>Declining (Urn-shaped):</strong> Pre-reproductive group is smaller than the reproductive group.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 1: Age Pyramids */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 140" className="w-full max-w-md bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="18" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">AGE PYRAMID REPRESENTATIONS</text>
              
              {/* Expanding */}
              <g transform="translate(20, 30)">
                <text x="50" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Expanding</text>
                <polygon points="50,20 15,100 85,100" fill="#f43f5e" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="1" />
                <line x1="28" y1="70" x2="72" y2="70" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="40" y1="45" x2="60" y2="45" stroke="#ffffff" strokeWidth="0.8" />
                <text x="50" y="93" fill="#ffffff" fontSize="6" textAnchor="middle">Pre-Repro</text>
              </g>

              {/* Stable */}
              <g transform="translate(165, 30)">
                <text x="50" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Stable</text>
                <path d="M 25 100 L 25 70 C 25 40, 75 40, 75 70 L 75 100 Z" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1" />
                <line x1="25" y1="70" x2="75" y2="70" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="30" y1="52" x2="70" y2="52" stroke="#ffffff" strokeWidth="0.8" />
                <text x="50" y="93" fill="#ffffff" fontSize="6" textAnchor="middle">Pre = Repro</text>
              </g>

              {/* Declining */}
              <g transform="translate(310, 30)">
                <text x="50" y="12" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Declining</text>
                <path d="M 35 100 L 20 65 L 50 20 L 80 65 L 65 100 Z" fill="#3b82f6" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
                <line x1="20" y1="65" x2="80" y2="65" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="32" y1="42" x2="68" y2="42" stroke="#ffffff" strokeWidth="0.8" />
                <text x="50" y="93" fill="#ffffff" fontSize="6" textAnchor="middle">Pre &lt; Repro</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="2. Population Growth Models: Exponential & Logistic" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Exponential Growth (J-shaped):</strong> Occurs when resources (food, space) are unlimited.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Differential Equation: <InlineMath math="\frac{dN}{dt} = rN" /></li>
                <li>Integral form: <InlineMath math="N_t = N_0 e^{rt}" /></li>
                <li>Where <InlineMath math="r" /> is the intrinsic rate of natural increase (for Norway rat <InlineMath math="r = 0.015" />, flour beetle <InlineMath math="r = 0.12" />).</li>
              </ul>
            </li>
            <li><strong>Logistic Growth (S-shaped / Sigmoid):</strong> More realistic model since resources are finite, introducing a carrying capacity (<InlineMath math="K" />).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Differential Equation (Verhulst-Pearl Logistic Growth): <InlineMath math="\frac{dN}{dt} = rN\left(\frac{K - N}{K}\right)" /></li>
                <li>At initial stages, population exhibits a lag phase, followed by acceleration, deceleration, and finally an asymptote when population density matches <InlineMath math="K" />.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 2: Growth Curves */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 380 200" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="190" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">POPULATION GROWTH CURVES</text>
              
              {/* Axes */}
              <line x1="50" y1="160" x2="330" y2="160" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="50" y1="40" x2="50" y2="160" stroke="#ffffff" strokeWidth="1.5" />
              
              <text x="190" y="178" fill="#ffffff" fontSize="8" textAnchor="middle">Time (t)</text>
              <text x="25" y="100" fill="#ffffff" fontSize="8" textAnchor="middle" transform="rotate(-90 25 100)">Population Size (N)</text>

              {/* Carrying capacity line */}
              <line x1="50" y1="80" x2="330" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="3" />
              <text x="315" y="75" fill="#ef4444" fontSize="7">Carrying Capacity (K)</text>

              {/* J Curve (Exponential) */}
              <path d="M 60 155 Q 120 150 160 50" fill="none" stroke="#60a5fa" strokeWidth="2" />
              <text x="175" y="48" fill="#60a5fa" fontSize="8">J-shape (dN/dt = rN)</text>

              {/* S Curve (Logistic) */}
              <path d="M 60 155 Q 120 155 170 120 T 270 82 L 320 82" fill="none" stroke="#10b981" strokeWidth="2" />
              <text x="280" y="98" fill="#10b981" fontSize="8">S-shape (Verhulst-Pearl)</text>
            </svg>
          </div>

          <SectionBanner label="3. Population Interactions Matrix" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Mutualism (+/+):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong className="text-zinc-500">Lichens:</strong> Symbiotic association of a fungus and photosynthesizing alga/cyanobacterium.</li>
                <li><strong className="text-zinc-500">Mycorrhizae:</strong> Fungi (Glomus) absorb phosphorus from soil for plant roots; plants supply sugars to fungi.</li>
                <li><strong className="text-zinc-500">Fig-wasp mutualism:</strong> Wasps pollinate the fig inflorescence while laying eggs in the fig fruit (developing seeds serve as food for larvae).</li>
                <li><strong className="text-zinc-500">Sexual Deceit:</strong> Mediterranean orchid *Ophrys* employs sexual deceit. One petal resembles a female bee. Male bees "pseudocopulate" with it, transferring pollen from one orchid to another.</li>
              </ul>
            </li>
            <li><strong>Competition (-/-):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong className="text-zinc-500">Gause&apos;s Competitive Exclusion Principle:</strong> Two closely related species competing for the same resources cannot co-exist indefinitely; the inferior one is eliminated. Examples: Abingdon tortoise in Galapagos extinct after goats introduced.</li>
                <li><strong className="text-zinc-500">Connell&apos;s Field Experiments:</strong> In Scotland rocky coasts, larger barnacle *Balanus* dominates the intertidal zone, excluding smaller barnacle *Chthamalus*.</li>
                <li><strong className="text-zinc-500">Resource Partitioning:</strong> Competitors feed at different times or use different parts of a tree (MacArthur&apos;s warblers) to co-exist.</li>
              </ul>
            </li>
            <li><strong>Predation (+/-):</strong> Keeps prey populations under check (e.g. Prickly pear cactus pest in Australia controlled by *Cactoblastis* moth). Prey camouflage (insects, frogs) or chemical defense (Monarch butterfly accumulates toxic cardiac glycosides from milkweed).</li>
            <li><strong>Parasitism (+/-):</strong> Ectoparasites (ticks, lice, *Cuscuta* vine) vs. Endoparasites (malarial plasmodium, liver fluke). <strong className="text-zinc-500">Brood parasitism</strong> in birds (Cuckoo lays eggs in Crow&apos;s nest; crow incubates them).</li>
            <li><strong>Commensalism (+/0):</strong> Orchid epiphyte on mango branch, barnacles on whale back, cattle egret feeding on insects flushed by grazing cattle, sea anemone protecting clownfish.</li>
            <li><strong>Amensalism (-/0):</strong> One species is harmed, other unaffected. Example: *Penicillium* mold secreting penicillin that kills bacteria; black walnut tree secreting juglone.</li>
          </ul>

          {/* SVG 3: Interactions Grid */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">POPULATION INTERACTIONS MATRIX</text>
              
              {/* Matrix Layout */}
              <rect x="30" y="35" width="340" height="130" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
              
              <line x1="30" y1="78" x2="370" y2="78" stroke="#ffffff" strokeWidth="0.8" />
              <line x1="30" y1="121" x2="370" y2="121" stroke="#ffffff" strokeWidth="0.8" />
              <line x1="143" y1="35" x2="143" y2="165" stroke="#ffffff" strokeWidth="0.8" />
              <line x1="256" y1="35" x2="256" y2="165" stroke="#ffffff" strokeWidth="0.8" />

              {/* Grid Contents */}
              <text x="86" y="55" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Mutualism (+/+)</text>
              <text x="86" y="68" fill="#ffffff" fontSize="7" textAnchor="middle">Lichen / Fig-Wasp</text>

              <text x="200" y="55" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Competition (-/-)</text>
              <text x="200" y="68" fill="#ffffff" fontSize="7" textAnchor="middle">Gause Exclusion / Goats</text>

              <text x="313" y="55" fill="#eab308" fontSize="9" fontWeight="bold" textAnchor="middle">Predation (+/-)</text>
              <text x="313" y="68" fill="#ffffff" fontSize="7" textAnchor="middle">Herbivore / Camouflage</text>

              <text x="86" y="98" fill="#eab308" fontSize="9" fontWeight="bold" textAnchor="middle">Parasitism (+/-)</text>
              <text x="86" y="111" fill="#ffffff" fontSize="7" textAnchor="middle">Ticks / Brood Cuckoo</text>

              <text x="200" y="98" fill="#3b82f6" fontSize="9" fontWeight="bold" textAnchor="middle">Commensalism (+/0)</text>
              <text x="200" y="111" fill="#ffffff" fontSize="7" textAnchor="middle">Orchid-Mango / Egret</text>

              <text x="313" y="98" fill="#a78bfa" fontSize="9" fontWeight="bold" textAnchor="middle">Amensalism (-/0)</text>
              <text x="313" y="111" fill="#ffffff" fontSize="7" textAnchor="middle">Penicillium / Juglone</text>

              <text x="200" y="145" fill="#94a3b8" fontSize="8" textAnchor="middle">+ (Benefited)  |  - (Harmed)  |  0 (Neutral)</text>
            </svg>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 2: ECOSYSTEM ─────────────────────────────────────────── */}
      <Collapsible title="2 · Ecosystem: Structure, Energy & Pyramids" icon={<Layers className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Structure, Stratification & Productivity" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Ecosystem Components:</strong> Biotic components (producers, consumers, decomposers) and abiotic components (temperature, light, soil).</li>
            <li><strong>Stratification:</strong> Vertical distribution of different species occupying different levels in an ecosystem (e.g. trees occupy top vertical strata, shrubs the second, herbs/grasses the bottom layers).</li>
            <li><strong>Food Chains &amp; Food Webs:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Grazing Food Chain (GFC):</strong> Starts with living green plants (producers) at the base. It is the major conduit of energy flow in <strong className="text-zinc-500">aquatic ecosystems</strong>.</li>
                <li><strong>Detritus Food Chain (DFC):</strong> Starts with dead organic matter (detritus). It is mediated by decomposers (fungi, bacteria) and is the major conduit of energy flow in <strong className="text-zinc-500">terrestrial ecosystems</strong>, where a larger fraction of energy flows through DFC than GFC.</li>
                <li><strong>Food Web:</strong> Interconnected network of multiple food chains. Provides stability; if one food source fails, consumers can switch to alternatives.</li>
              </ul>
            </li>
            <li><strong>Productivity:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Gross Primary Productivity (GPP):</strong> Rate of production of organic matter during photosynthesis.</li>
                <li><strong>Net Primary Productivity (NPP):</strong> GPP minus respiration losses (<InlineMath math="R" />):
                  <DisplayMath math="NPP = GPP - R" />
                </li>
                <li><strong>Secondary Productivity:</strong> Rate of formation of new organic matter by consumers.</li>
                <li>Annual NPP of the entire biosphere is about <strong className="text-zinc-500">170 billion tons</strong> of dry weight. Marine ecosystems contribute only <strong className="text-zinc-500">55 billion tons</strong>, despite covering 70% of the Earth&apos;s surface.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="2. Decomposition Stages" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li>Decomposition is the process of breaking down complex organic matter (detritus) into simpler inorganic substances like carbon dioxide, water, and nutrients.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Fragmentation:</strong> Detritivores (e.g., earthworms) break detritus into smaller particles.</li>
                <li><strong>Leaching:</strong> Water-soluble inorganic nutrients migrate down into the soil horizon and precipitate as chemical salts.</li>
                <li><strong>Catabolism:</strong> Bacterial and fungal enzymes degrade detritus into simpler inorganic substances.</li>
                <li><strong>Humification:</strong> Accumulation of humus, a dark colored amorphous substance highly resistant to microbial action (decomposes slowly).</li>
                <li><strong>Mineralization:</strong> Degradation of humus by microbes to release inorganic nutrients.</li>
              </ul>
            </li>
            <li>Decomposition rate is faster under warm, moist conditions and when detritus is rich in nitrogen and water-soluble substances. It is slower if detritus is rich in <strong className="text-zinc-500">lignin and chitin</strong>.</li>
          </ul>

          {/* SVG 4: Decomposition flowchart */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 130" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="16" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">STAGES OF DETRITUS DECOMPOSITION</text>
              
              {/* Flow boxes */}
              <g transform="translate(15, 30)">
                <rect x="0" y="10" width="70" height="30" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <text x="35" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">1. Fragment</text>
              </g>

              <line x1="85" y1="55" x2="100" y2="55" stroke="#10b981" strokeWidth="1" />

              <g transform="translate(100, 30)">
                <rect x="0" y="10" width="70" height="30" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <text x="35" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">2. Leaching</text>
              </g>

              <line x1="170" y1="55" x2="185" y2="55" stroke="#10b981" strokeWidth="1" />

              <g transform="translate(185, 30)">
                <rect x="0" y="10" width="80" height="30" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <text x="40" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">3. Catabolism</text>
              </g>

              <line x1="265" y1="55" x2="280" y2="55" stroke="#10b981" strokeWidth="1" />

              <g transform="translate(280, 30)">
                <rect x="0" y="10" width="70" height="30" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <text x="35" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">4. Humify</text>
              </g>

              <line x1="350" y1="55" x2="365" y2="55" stroke="#10b981" strokeWidth="1" />

              <g transform="translate(365, 30)">
                <rect x="0" y="10" width="70" height="30" rx="3" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                <text x="35" y="28" fill="#10b981" fontSize="7" textAnchor="middle">5. Mineralise</text>
              </g>

              <text x="225" y="95" fill="#a78bfa" fontSize="8" textAnchor="middle">Lignin &amp; Chitin retard rate  |  Warmth &amp; Moisture accelerate rate</text>
            </svg>
          </div>

          <SectionBanner label="3. Ecological Succession" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Succession Dynamics:</strong> Gradual and predictable change in species composition of a given area:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Primary Succession:</strong> Begins in a bare, barren area where no life existed previously (e.g. cooled lava, bare rock, newly created pond). Extremely slow because soil formation takes hundreds of years.</li>
                <li><strong>Secondary Succession:</strong> Begins in areas where natural biotic communities were destroyed (e.g. abandoned farm land, burned forest, flooded land). Faster because soil is already present.</li>
                <li><strong>Succession Stages:</strong> The pioneer community (first colonizer) progresses through several <strong className="text-zinc-500">seral stages</strong> to reach a stable, self-sustaining <strong className="text-zinc-500">climax community</strong> in equilibrium with the climate.</li>
                <li><strong>Hydrarch Succession (in water):</strong> Phytoplanktons (pioneers) ➔ Submerged plants ➔ Submerged free-floating plants ➔ Reed-swamp stage ➔ Marsh-meadow ➔ Scrub ➔ Forest (climax).</li>
                <li><strong>Xerarch Succession (on dry rock):</strong> Lichens (pioneers secreting acid to weather rock) ➔ Mosses ➔ Annual herbs ➔ Perennial herbs ➔ Shrubs ➔ Trees (climax). Both pathways lead to a medium water (<strong className="text-zinc-500">mesic</strong>) condition.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 6B: Succession Pathway */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 120" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="16" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">XERARCH &amp; HYDRARCH SUCCESSION TO MESIC CLIMAX</text>
              
              <g transform="translate(10, 30)">
                <text x="45" y="12" fill="#ffffff" fontSize="7" fontWeight="bold">Xerarch (Dry)</text>
                <rect x="0" y="18" width="80" height="20" rx="3" fill="#3b0764" stroke="#a78bfa" strokeWidth="0.8" />
                <text x="40" y="30" fill="#ffffff" fontSize="7" textAnchor="middle">Lichens (Pioneer)</text>
                <path d="M 85 28 L 105 28" stroke="#ffffff" strokeWidth="1" />
                <rect x="110" y="18" width="60" height="20" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <text x="140" y="30" fill="#ffffff" fontSize="7" textAnchor="middle">Mosses / Herbs</text>
              </g>

              <g transform="translate(10, 70)">
                <text x="45" y="12" fill="#ffffff" fontSize="7" fontWeight="bold">Hydrarch (Wet)</text>
                <rect x="0" y="18" width="80" height="20" rx="3" fill="#172554" stroke="#60a5fa" strokeWidth="0.8" />
                <text x="40" y="30" fill="#ffffff" fontSize="7" textAnchor="middle">Phytoplankton</text>
                <path d="M 85 28 L 105 28" stroke="#ffffff" strokeWidth="1" />
                <rect x="110" y="18" width="60" height="20" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <text x="140" y="30" fill="#ffffff" fontSize="7" textAnchor="middle">Floating / Reeds</text>
              </g>

              <g transform="translate(290, 45)">
                <rect x="0" y="10" width="130" height="40" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
                <text x="65" y="24" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Climax Forest</text>
                <text x="65" y="38" fill="#ffffff" fontSize="8" textAnchor="middle">(Mesic Community)</text>
              </g>

              <path d="M 180 28 L 220 28 L 285 50" stroke="#ffffff" strokeWidth="1" strokeDasharray="2" />
              <path d="M 180 88 L 220 88 L 285 70" stroke="#ffffff" strokeWidth="1" strokeDasharray="2" />
            </svg>
          </div>

          <SectionBanner label="4. Biogeochemical Nutrient Cycling" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Nutrient Reservoirs:</strong> Standing state refers to the amount of inorganic nutrients present in soil at any given time. Cycles are of two types:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Gaseous Cycles:</strong> Reservoir is in the atmosphere or hydrosphere. Examples: <strong className="text-zinc-500">Carbon Cycle</strong>, <strong className="text-zinc-500">Nitrogen Cycle</strong>.</li>
                <li><strong>Sedimentary Cycles:</strong> Reservoir is in the Earth&apos;s crust (rocks). Examples: <strong className="text-zinc-500">Phosphorus Cycle</strong>, <strong className="text-zinc-500">Sulfur Cycle</strong>.</li>
              </ul>
            </li>
            <li><strong>Carbon Cycle:</strong> Carbon constitutes 49% of dry weight of organisms. Fixed through photosynthesis (approx. <InlineMath math="4 \times 10^{13} \text{ kg}" /> of carbon annually). Released back via respiration, decomposer catabolism, and burning of fossil fuels.</li>
            <li><strong>Phosphorus Cycle:</strong> Rocks are the natural reservoir, containing phosphates. Weathering releases phosphates into soil solution, absorbed by plant roots. Decomposers return phosphates from detritus. Unlike Carbon, there is no respiratory release of phosphorus.</li>
            <li><strong>Ecosystem Services:</strong> Robert Costanza and colleagues put an average price tag of <strong className="text-emerald-400">{"US $33 trillion per year"}</strong> on global fundamental ecosystem services (nearly twice the global GNP of {"US $18 trillion"}).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong className="text-zinc-500">Soil formation</strong> accounts for <strong className="text-zinc-500">50%</strong> of the cost.</li>
                <li><strong className="text-zinc-500">Recreation</strong> and <strong className="text-zinc-500">Nutrient Cycling</strong> account for less than <strong className="text-zinc-500">10%</strong> each.</li>
                <li><strong className="text-zinc-500">Climate Regulation</strong> and <strong className="text-zinc-500">Habitat for wildlife</strong> account for about <strong className="text-zinc-500">6%</strong> each.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 4B: Food Chain and Succession Pathways */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 160" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="18" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">FOOD CHAINS &amp; SUCCESSION STAGES</text>
              <g transform="translate(10, 35)">
                <rect x="0" y="0" width="180" height="110" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="90" y="15" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">GFC vs. DFC Channels</text>
                <text x="10" y="38" fill="#ffffff" fontSize="7">GFC: Grass ➔ Goat ➔ Tiger</text>
                <text x="10" y="48" fill="#a78bfa" fontSize="6">(Major flow in Aquatic systems)</text>
                <text x="10" y="78" fill="#ffffff" fontSize="7">DFC: Litter ➔ Earthworm ➔ Sparrow</text>
                <text x="10" y="88" fill="#a78bfa" fontSize="6">(Major flow in Terrestrial systems)</text>
              </g>
              <g transform="translate(210, 35)">
                <rect x="0" y="0" width="190" height="110" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="95" y="15" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">Xerarch Succession (Dry ➔ Mesic)</text>
                <text x="95" y="38" fill="#ffffff" fontSize="7" textAnchor="middle">Bare Rock (Pioneers)</text>
                <path d="M 95 44 L 95 53" stroke="#eab308" strokeWidth="1" />
                <text x="95" y="62" fill="#ffffff" fontSize="7" textAnchor="middle">Lichens ➔ Mosses ➔ Herbs</text>
                <path d="M 95 68 L 95 77" stroke="#eab308" strokeWidth="1" />
                <text x="95" y="87" fill="#10b981" fontSize="7" textAnchor="middle" fontWeight="bold">Forest (Climax mesic)</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="5. Energy Flow &amp; Lindeman&apos;s 10% Trophic Rule" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Photosynthetically Active Radiation (PAR):</strong> Out of total incident solar radiation, less than 50% is PAR. Plants capture only 2-10% of PAR.</li>
            <li><strong>Lindeman&apos;s 10% Law:</strong> During energy transfer from one trophic level to the next, only 10% of the energy is conserved as biomass; the remaining 90% is lost as respiration or heat.</li>
          </ul>

          {/* SVG 5: 10% Energy Flow */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="18" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">10% TROPHIC ENERGY TRANSFER</text>
              
              {/* Producers */}
              <g transform="translate(20, 35)">
                <rect x="0" y="0" width="75" height="35" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="37" y="15" fill="#ffffff" fontSize="7" textAnchor="middle">Producers</text>
                <text x="37" y="28" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">10,000 J</text>
              </g>

              <line x1="95" y1="52" x2="115" y2="52" stroke="#10b981" strokeWidth="1.5" />

              {/* Primary Consumers */}
              <g transform="translate(115, 35)">
                <rect x="0" y="0" width="85" height="35" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="42" y="15" fill="#ffffff" fontSize="7" textAnchor="middle">Primary Cons.</text>
                <text x="42" y="28" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">1,000 J</text>
              </g>

              <line x1="200" y1="52" x2="220" y2="52" stroke="#10b981" strokeWidth="1.5" />

              {/* Secondary Consumers */}
              <g transform="translate(220, 35)">
                <rect x="0" y="0" width="85" height="35" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="42" y="15" fill="#ffffff" fontSize="7" textAnchor="middle">Secondary Cons.</text>
                <text x="42" y="28" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">100 J</text>
              </g>

              <line x1="305" y1="52" x2="325" y2="52" stroke="#10b981" strokeWidth="1.5" />

              {/* Tertiary Consumers */}
              <g transform="translate(325, 35)">
                <rect x="0" y="0" width="75" height="35" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="37" y="15" fill="#ffffff" fontSize="7" textAnchor="middle">Tertiary Cons.</text>
                <text x="37" y="28" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">10 J</text>
              </g>

              {/* Heat loss arrows */}
              <path d="M 57 70 L 57 110" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
              <text x="57" y="125" fill="#ef4444" fontSize="7" textAnchor="middle">90% Heat Loss</text>

              <path d="M 262 70 L 262 110" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
              <text x="262" y="125" fill="#ef4444" fontSize="7" textAnchor="middle">90% Heat Loss</text>
            </svg>
          </div>

          <SectionBanner label="6. Upright vs. Inverted Ecological Pyramids" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Pyramid of Numbers:</strong> Usually upright. Exception: Inverted numbers pyramid on a single tree host supporting hundreds of herbivorous birds, which support thousands of hyperparasites.</li>
            <li><strong>Pyramid of Biomass:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Generally upright in terrestrial ecosystems.</li>
                <li><strong className="text-zinc-500">Inverted in Aquatic Ecosystems:</strong> Biomass of fish/zooplankton exceeds phytoplankton because of the high turnover rate of microscopic producers.</li>
              </ul>
            </li>
            <li><strong>Pyramid of Energy:</strong> <strong className="text-emerald-400">ALWAYS upright</strong>. Energy transfer is unidirectional, and thermodynamics dictates heat loss at each level. It can never be inverted.</li>
          </ul>

          {/* SVG 6: Pyramids */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="18" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">PYRAMID CONFIGURATIONS</text>
              
              {/* Upright energy (left) */}
              <g transform="translate(10, 35)">
                <text x="80" y="15" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Upright Energy (Always)</text>
                
                {/* tiers */}
                <polygon points="80,25 30,105 130,105" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1" />
                <line x1="50" y1="75" x2="110" y2="75" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="65" y1="50" x2="95" y2="50" stroke="#ffffff" strokeWidth="0.8" />
                
                <text x="80" y="98" fill="#ffffff" fontSize="7" textAnchor="middle">Producers (10,000 J)</text>
                <text x="80" y="68" fill="#ffffff" fontSize="7" textAnchor="middle">Herbivores (1,000 J)</text>
                <text x="80" y="42" fill="#ffffff" fontSize="7" textAnchor="middle">Carnivores (100 J)</text>
              </g>

              {/* Inverted Biomass (right) */}
              <g transform="translate(220, 35)">
                <text x="80" y="15" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Inverted Biomass (Marine)</text>
                
                {/* tiers */}
                <polygon points="80,105 20,25 140,25" fill="#f43f5e" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="1" />
                <line x1="38" y1="55" x2="122" y2="55" stroke="#ffffff" strokeWidth="0.8" />
                <line x1="56" y1="80" x2="104" y2="80" stroke="#ffffff" strokeWidth="0.8" />
                
                <text x="80" y="42" fill="#ffffff" fontSize="7" textAnchor="middle">Fishes (Large Biomass)</text>
                <text x="80" y="73" fill="#ffffff" fontSize="7" textAnchor="middle">Zooplankton</text>
                <text x="80" y="98" fill="#ffffff" fontSize="7" textAnchor="middle">Phytoplankton (Small)</text>
              </g>
            </svg>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 3: BIODIVERSITY AND CONSERVATION ──────────────────────── */}
      <Collapsible title="3 · Biodiversity and Conservation" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Biodiversity Levels &amp; India Hotspots" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Levels of Biodiversity (Edward Wilson):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Genetic Diversity:</strong> Variation within a single species (e.g. *Rauwolfia vomitoria* yielding different concentrations of reserpine; India has &gt;50,000 strains of rice and 1,000 mango varieties).</li>
                <li><strong>Species Diversity:</strong> Variation at the species level (e.g. Western Ghats have greater amphibian species diversity than Eastern Ghats).</li>
                <li><strong>Ecological Diversity:</strong> Variation at ecosystem levels (deserts, rain forests, mangroves, coral reefs in India vs. Norway).</li>
                <li><strong>Diversity Indices:</strong> <strong className="text-zinc-500">Alpha diversity</strong> (diversity within a single community/habitat), <strong className="text-zinc-500">Beta diversity</strong> (diversity between communities along an environmental gradient), and <strong className="text-zinc-500">Gamma diversity</strong> (total regional diversity across all habitats).</li>
              </ul>
            </li>
            <li><strong>India as a Mega-diversity Nation &amp; Hotspots:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>India covers only <strong className="text-zinc-500">2.4%</strong> of the world&apos;s land area but contributes <strong className="text-zinc-500">8.1%</strong> to global species diversity, ranking among the 12 mega-diversity countries.</li>
                <li><strong>Biodiversity Hotspots:</strong> Regions with high species richness, high endemism, and high threat levels. There are 34 hotspots globally; India hosts 4: <strong className="text-zinc-500">Himalayas</strong>, <strong className="text-zinc-500">Western Ghats &amp; Sri Lanka</strong>, <strong className="text-zinc-500">Indo-Burma</strong>, and <strong className="text-zinc-500">Sundaland</strong>.</li>
              </ul>
            </li>
            <li><strong>IUCN Red List Categories:</strong> The International Union for Conservation of Nature evaluates species threat status:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong className="text-zinc-500">EX (Extinct):</strong> No reasonable doubt that the last individual has died.</li>
                <li><strong className="text-zinc-500">EW (Extinct in the Wild):</strong> Survives only in captivity or cultivation.</li>
                <li><strong className="text-zinc-500">CR (Critically Endangered):</strong> Extremely high risk of extinction in the wild (e.g. Great Indian Bustard).</li>
                <li><strong className="text-zinc-500">EN (Endangered):</strong> Very high risk of extinction in the wild (e.g. Tiger, Asian Elephant).</li>
                <li><strong className="text-zinc-500">VU (Vulnerable):</strong> High risk of extinction in the wild (e.g. One-horned Rhino).</li>
                <li><strong className="text-zinc-500">NT (Near Threatened) &amp; LC (Least Concern):</strong> Lower risk categories.</li>
              </ul>
            </li>
            <li><strong>Biodiversity Act 2002 (India):</strong> Enacted to regulate access to biological resources. Established a three-tier structure: <strong className="text-zinc-500">National Biodiversity Authority (NBA)</strong>, <strong className="text-zinc-500">State Biodiversity Boards (SBB)</strong>, and <strong className="text-zinc-500">Biodiversity Management Committees (BMC)</strong> at local levels.</li>
          </ul>

          {/* SVG 10B: Alpha/Beta/Gamma & IUCN Categories */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 160" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">BIODIVERSITY SCALES &amp; IUCN CATEGORIES</text>
              <g transform="translate(15, 35)">
                <rect x="0" y="0" width="180" height="110" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="90" y="15" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">Alpha, Beta, Gamma Scales</text>
                <circle cx="50" cy="65" r="20" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                <text x="50" y="68" fill="#3b82f6" fontSize="6" textAnchor="middle">Hab A</text>
                <text x="50" y="53" fill="#ffffff" fontSize="6" textAnchor="middle">Alpha</text>
                <circle cx="130" cy="65" r="20" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                <text x="130" y="68" fill="#3b82f6" fontSize="6" textAnchor="middle">Hab B</text>
                <text x="130" y="53" fill="#ffffff" fontSize="6" textAnchor="middle">Alpha</text>
                <path d="M 75 65 L 105 65" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <text x="90" y="58" fill="#eab308" fontSize="6" textAnchor="middle">Beta</text>
                <rect x="25" y="95" width="130" height="10" fill="#022c22" rx="2" />
                <text x="90" y="102" fill="#10b981" fontSize="6" textAnchor="middle">Gamma = Total Regional Diversity</text>
              </g>
              <g transform="translate(225, 35)">
                <rect x="0" y="0" width="180" height="110" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="90" y="15" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle">IUCN Threat Hierarchy</text>
                <rect x="15" y="28" width="150" height="15" rx="2" fill="#7f1d1d" stroke="#f87171" strokeWidth="1" />
                <text x="90" y="38" fill="#ffffff" fontSize="6" textAnchor="middle" fontWeight="bold">EXTINCT (EX / EW)</text>
                <rect x="15" y="48" width="150" height="15" rx="2" fill="#991b1b" stroke="#f87171" strokeWidth="1" />
                <text x="90" y="58" fill="#ffffff" fontSize="6" textAnchor="middle" fontWeight="bold">CRITICALLY ENDANGERED (CR)</text>
                <rect x="15" y="68" width="150" height="15" rx="2" fill="#b91c1c" stroke="#f87171" strokeWidth="1" />
                <text x="90" y="78" fill="#ffffff" fontSize="6" textAnchor="middle" fontWeight="bold">ENDANGERED (EN)</text>
                <rect x="15" y="88" width="150" height="15" rx="2" fill="#7c2d12" stroke="#fb923c" strokeWidth="1" />
                <text x="90" y="98" fill="#ffffff" fontSize="6" textAnchor="middle" fontWeight="bold">VULNERABLE (VU) / NT / LC</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="2. Gradients &amp; Humboldt&apos;s Species-Area Law" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Latitudinal Gradients:</strong> Species diversity decreases from equator towards poles. Tropical rain forests (like Amazon) harbor high diversity due to constant environment, low seasonality, and high solar energy.</li>
            <li><strong>Alexander von Humboldt Species-Area Relationship:</strong> In explored areas, species richness increases with increasing area up to a limit:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Log scale equation:
                  <DisplayMath math="\log S = \log C + Z \log A" />
                </li>
                <li>Where <InlineMath math="S" /> is species richness, <InlineMath math="A" /> is area, <InlineMath math="C" /> is Y-intercept, and <InlineMath math="Z" /> is slope of the regression line.</li>
                <li>Regardless of taxonomic group or region, the Z-value is usually <strong className="text-zinc-500">0.1 to 0.2</strong> for small areas, but climbs to <strong className="text-zinc-500">0.6 to 1.2</strong> for entire continents (e.g. frugivorous birds and mammals in tropical forests of different continents have Z = 1.15).</li>
              </ul>
            </li>
          </ul>

          {/* SVG 7: Species-Area Relationship */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 380 200" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="190" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">SPECIES-AREA RELATIONSHIP</text>
              
              {/* Axes */}
              <line x1="50" y1="160" x2="330" y2="160" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="50" y1="40" x2="50" y2="160" stroke="#ffffff" strokeWidth="1.5" />
              
              <text x="190" y="178" fill="#ffffff" fontSize="8" textAnchor="middle">Area (A)</text>
              <text x="25" y="100" fill="#ffffff" fontSize="8" textAnchor="middle" transform="rotate(-90 25 100)">Species Richness (S)</text>

              {/* Hyperbola curve */}
              <path d="M 60 150 Q 80 80 300 70" fill="none" stroke="#60a5fa" strokeWidth="2" />
              <text x="220" y="90" fill="#60a5fa" fontSize="8">S = C A^Z (Hyperbola)</text>

              {/* Straight line (log-log) */}
              <line x1="60" y1="140" x2="300" y2="50" stroke="#10b981" strokeWidth="2" />
              <text x="180" y="125" fill="#10b981" fontSize="8" transform="rotate(-20 180 125)">log S = log C + Z log A</text>
            </svg>
          </div>

          <SectionBanner label="3. Biodiversity Importance: Rivet Popper Hypothesis" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>David Tilman&apos;s Findings:</strong> Ecosystems with higher species richness show less year-to-year variation in total biomass and demonstrate higher productivity.</li>
            <li><strong>Rivet Popper Hypothesis (Paul Ehrlich):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>An airplane (ecosystem) has thousands of rivets (species).</li>
                <li>If passengers pop rivets (extinct species) from seats, flight safety is not initially threatened. But popping rivets from wings (<strong className="text-zinc-500">key species</strong> that drive major ecosystem processes) compromises flight safety immediately.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 8: Rivet Popper Visual */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 140" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="18" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">RIVET POPPER HYPOTHESIS</text>
              
              {/* Airplane schematic */}
              <path d="M 40 70 C 80 50, 180 50, 220 70 C 240 78, 280 78, 300 70 L 310 80 L 290 85 C 200 95, 80 95, 40 70 Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              
              {/* Wing */}
              <polygon points="130,55 100,10 120,10 170,55" fill="#3b82f6" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" />
              
              {/* Wing Rivets (Key species) */}
              <circle cx="110" cy="18" r="3" fill="#ef4444" />
              <circle cx="115" cy="30" r="3" fill="#ef4444" />
              <text x="65" y="28" fill="#ef4444" fontSize="7">Key Wing Rivets</text>
              <text x="65" y="38" fill="#ef4444" fontSize="6">(Major Extinctions)</text>

              {/* Seat Rivets */}
              <circle cx="200" cy="70" r="2.5" fill="#10b981" />
              <circle cx="215" cy="72" r="2.5" fill="#10b981" />
              <text x="245" y="65" fill="#10b981" fontSize="7">Seat Rivets</text>
              <text x="245" y="75" fill="#10b981" fontSize="6">(Minor Species)</text>
            </svg>
          </div>

          <SectionBanner label="4. Loss of Biodiversity: The Evil Quartet" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>The Evil Quartet:</strong> The four major causes of anthropogenic biodiversity loss:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>1. Habitat Loss and Fragmentation:</strong> Tropical rain forests, once covering 14% of Earth&apos;s land surface, now cover less than 6%. Example: Amazon forest (lungs of the planet) cleared for soybean cultivation or beef cattle pastures.</li>
                <li><strong>2. Over-exploitation:</strong> Overharvesting leading to extinction of Stellar&apos;s sea cow and Passenger pigeon.</li>
                <li><strong>3. Alien Species Invasions:</strong> Introduction of exotic species disrupts native species. Examples: <strong className="text-zinc-500">Nile perch</strong> introduced into Lake Victoria (East Africa) led to the extinction of over 200 species of cichlid fish. Water hyacinth (*Eichhornia crassipes*), Lantana camera, and African catfish (*Clarias gariepinus*).</li>
                <li><strong>4. Co-extinctions:</strong> When a host species goes extinct, its obligate parasite/mutualist species also goes extinct.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 9: The Evil Quartet */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 160" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">THE EVIL QUARTET WHEEL</text>
              
              {/* Wheel sectors */}
              <circle cx="175" cy="90" r="45" fill="none" stroke="#3b82f6" strokeWidth="2" />
              
              <text x="175" y="40" fill="#f43f5e" fontSize="7" fontWeight="bold" textAnchor="middle">1. HABITAT LOSS &amp; FRAG</text>
              <text x="175" y="148" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">2. OVER-EXPLOITATION</text>
              <text x="75" y="93" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="end">3. ALIEN INVASION</text>
              <text x="275" y="93" fill="#ffffff" fontSize="7" fontWeight="bold">4. CO-EXTINCTION</text>

              <line x1="175" y1="45" x2="175" y2="80" stroke="#ffffff" strokeWidth="0.8" />
              <line x1="175" y1="100" x2="175" y2="135" stroke="#ffffff" strokeWidth="0.8" />
              <line x1="130" y1="90" x2="170" y2="90" stroke="#ffffff" strokeWidth="0.8" />
              <line x1="180" y1="90" x2="220" y2="90" stroke="#ffffff" strokeWidth="0.8" />
            </svg>
          </div>

          <SectionBanner label="5. Conservation Strategies: In-situ vs. Ex-situ" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>In-situ Conservation (On-site):</strong> Protects organisms within their natural habitats.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Biosphere Reserves:</strong> 14 in India. Large tracts of protected land containing multiple ecosystems.</li>
                <li><strong>National Parks &amp; Sanctuaries:</strong> 90 National Parks and 448 Wildlife Sanctuaries in India. Harvesting or resource collection is prohibited/strictly controlled.</li>
                <li><strong>Sacred Groves:</strong> Forests protected by local tribal beliefs. Examples: Khasi and Jaintia Hills in Meghalaya, Aravalli Hills of Rajasthan, Western Ghats of Karnataka/Maharashtra, and Sarguja, Chanda and Bastar areas of Madhya Pradesh. Often the last refuges for rare plants.</li>
              </ul>
            </li>
            <li><strong>Ex-situ Conservation (Off-site):</strong> Protects threatened organisms outside their natural habitat.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Includes <strong className="text-zinc-500">Zoological Parks</strong>, <strong className="text-zinc-500">Botanical Gardens</strong>, and <strong className="text-zinc-500">Wildlife Safari Parks</strong>.</li>
                <li><strong className="text-zinc-500">Cryopreservation:</strong> Storing gametes of threatened species at ultra-low temperatures (-196°C in liquid nitrogen) in viable conditions.</li>
                <li><strong className="text-zinc-500">Seed Banks &amp; Tissue Culture:</strong> Storing seeds or multiplying cells of rare species.</li>
              </ul>
            </li>
            <li><strong>International Conventions:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>The Earth Summit (Rio de Janeiro, 1992):</strong> Called upon nations to take measures for biodiversity conservation and sustainable utilization.</li>
                <li><strong>The World Summit (Johannesburg, 2002):</strong> 190 countries pledged to significantly reduce the rate of biodiversity loss at global, regional, and local levels.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 10: Conservation Tree */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="18" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">BIODIVERSITY CONSERVATION METHODS</text>
              
              {/* In-situ (left) */}
              <g transform="translate(15, 35)">
                <rect x="0" y="0" width="180" height="120" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
                <text x="90" y="15" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">In-situ Conservation (On-site)</text>
                <text x="15" y="38" fill="#ffffff" fontSize="7">➔ Biosphere Reserves (14 in India)</text>
                <text x="15" y="55" fill="#ffffff" fontSize="7">➔ National Parks (90 in India)</text>
                <text x="15" y="72" fill="#ffffff" fontSize="7">➔ Wildlife Sanctuaries (448)</text>
                <text x="15" y="89" fill="#ffffff" fontSize="7">➔ Sacred Groves (Khasi, Aravalli)</text>
              </g>

              {/* Ex-situ (right) */}
              <g transform="translate(225, 35)">
                <rect x="0" y="0" width="180" height="120" rx="4" fill="#3b0764" stroke="#a78bfa" strokeWidth="1.2" />
                <text x="90" y="15" fill="#a78bfa" fontSize="9" fontWeight="bold" textAnchor="middle">Ex-situ Conservation (Off-site)</text>
                <text x="15" y="38" fill="#ffffff" fontSize="7">➔ Botanical Gardens / Zoos</text>
                <text x="15" y="55" fill="#ffffff" fontSize="7">➔ Wildlife Safari Parks</text>
                <text x="15" y="72" fill="#ffffff" fontSize="7">➔ Cryopreservation (-196°C)</text>
                <text x="15" y="89" fill="#ffffff" fontSize="7">➔ Seed Banks &amp; Tissue Culture</text>
              </g>
            </svg>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 4: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            4 · Applied Ecology Lab Simulator
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select an ecological specimen and apply a specific treatment/stress to observe adaptation pathways, marine biomass inversion ratios, species-area curve shifts, and cryopreservation states.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('desert_plant')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'desert_plant' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Desert Plant (Opuntia)
                </button>
                <button 
                  onClick={() => setSpecimen('phytoplankton')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'phytoplankton' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Marine Phytoplankton
                </button>
                <button 
                  onClick={() => setSpecimen('forest_habitat')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'forest_habitat' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Forest Habitat Area
                </button>
                <button 
                  onClick={() => setSpecimen('orchid')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'orchid' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Endangered Forest Orchid
                </button>
              </div>
            </div>

            {/* Treatment Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Apply Treatment / Stress</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'water_stress', label: 'Apply Severe Drought Stress' },
                  { id: 'introduce_herbivore', label: 'Introduce Herbivorous Fish' },
                  { id: 'clear_land', label: 'Clear 50% Forest Land' },
                  { id: 'seed_bank', label: 'Relocate to Seed Cryo-Bank' }
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setTreatment(r.id as any)}
                    className={`p-2 rounded-lg border text-left text-xs font-bold transition ${treatment === r.id ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
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
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Applied Ecology Analyzer</span>
              <span className="text-xs font-mono text-cyan-400">Status: Complete</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Ecosystem State</span>
                  <span className={`text-base font-bold font-display ${sim.color}`}>{sim.outcome}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Field Observation</span>
                  <span className="text-white font-semibold">{sim.visualEffect}</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Biomass / Species Yield</span>
                  <span className="text-white font-mono font-semibold">{sim.product}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-left leading-relaxed text-white/70">
              <strong className="text-cyan-400 block mb-1">Ecological Process:</strong>
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
            <Tag color="cyan">Problem 1: Logistic Growth Rate Calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A population with carrying capacity K = 1,000 has an intrinsic growth rate r = 0.1. Calculate the population growth rate (dN/dt) when the population size N is (a) 100, (b) 500, and (c) 900. Interpret the results."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Use Verhulst-Pearl Logistic Growth equation:"}</div>
              <div className="pl-3"><InlineMath math="\frac{dN}{dt} = rN\left(\frac{K - N}{K}\right)" /></div>
              <div>{"2. Case (a): N = 100"}</div>
              <div className="pl-3"><InlineMath math="\frac{dN}{dt} = 0.1 \times 100 \times \left(\frac{1000 - 100}{1000}\right) = 10 \times 0.9 = 9 \text{ individuals/time}" /></div>
              <div>{"3. Case (b): N = 500"}</div>
              <div className="pl-3"><InlineMath math="\frac{dN}{dt} = 0.1 \times 500 \times \left(\frac{1000 - 500}{1000}\right) = 50 \times 0.5 = 25 \text{ individuals/time}" /></div>
              <div>{"4. Case (c): N = 900"}</div>
              <div className="pl-3"><InlineMath math="\frac{dN}{dt} = 0.1 \times 900 \times \left(\frac{1000 - 900}{1000}\right) = 90 \times 0.1 = 9 \text{ individuals/time}" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Interpretation: Growth rate is highest at N = K/2 (inflection point). It decreases as N approaches carrying capacity K due to environmental resistance.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Species-Area Relationship Slope Extrapolations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"In a tropical forest continent, the slope Z of the species-area relationship is 1.15. If the explored habitat area is reduced by a factor of 10, calculate the proportion of species remaining, using Alexander von Humboldt\'s log-log formula."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The species-area equation is:"}</div>
              <div className="pl-3"><InlineMath math="S = C A^Z" /></div>
              <div>{"2. Let the initial area be A₁ and final area be A₂ = A₁ / 10. Let initial species be S₁ and final species be S₂."}</div>
              <div className="pl-3"><InlineMath math="\frac{S_2}{S_1} = \frac{C A_2^Z}{C A_1^Z} = \left(\frac{A_2}{A_1}\right)^Z" /></div>
              <div>{"3. Substitute the ratio of areas (1/10) and Z = 1.15:"}</div>
              <div className="pl-3"><InlineMath math="\frac{S_2}{S_1} = (0.1)^{1.15}" /></div>
              <div>{"4. Solve exponential:"}</div>
              <div className="pl-3"><InlineMath math="10^{-1.15} \approx 0.07" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Only about 7% of species remain; 93% are lost due to a tenfold reduction in habitat area!</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Lindeman 10% Trophic Level Energy Calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An ecosystem receives 1,000,000 J of incident solar radiation. If producers capture 1% of this solar energy as Net Primary Productivity (NPP), calculate the energy available to tertiary consumers under Lindeman\'s 10% rule."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Calculate primary energy captured by producers (NPP):"}</div>
              <div className="pl-3"><InlineMath math="\text{Producer energy} = 1,000,000 \text{ J} \times 0.01 = 10,000 \text{ J}" /></div>
              <div>{"2. Apply the 10% transfer rule for subsequent trophic levels:"}</div>
              <div className="pl-3"><InlineMath math="\text{Primary Consumers (Herbivores)} = 10,000 \text{ J} \times 0.1 = 1,000 \text{ J}" /></div>
              <div className="pl-3"><InlineMath math="\text{Secondary Consumers (Primary Carnivores)} = 1,000 \text{ J} \times 0.1 = 100 \text{ J}" /></div>
              <div className="pl-3"><InlineMath math="\text{Tertiary Consumers (Secondary Carnivores)} = 100 \text{ J} \times 0.1 = 10 \text{ J}" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Exactly 10 J of energy is available at the tertiary consumer level.</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Population Density Dynamic Tracking</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An initial population has 500 individuals. Over a year, there are 80 births, 60 deaths, 30 individuals immigrate, and 10 individuals emigrate. Calculate the final population size at the end of the year."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Use the population size change equation:"}</div>
              <div className="pl-3"><InlineMath math="N_{t+1} = N_t + [ (B + I) - (D + E) ]" /></div>
              <div>{"Where:"}</div>
              <div className="pl-3"><InlineMath math="N_t = 500 \text{ (Initial population)}" /></div>
              <div className="pl-3"><InlineMath math="B = 80 \text{ (Births/Natality)}" /></div>
              <div className="pl-3"><InlineMath math="I = 30 \text{ (Immigration)}" /></div>
              <div className="pl-3"><InlineMath math="D = 60 \text{ (Deaths/Mortality)}" /></div>
              <div className="pl-3"><InlineMath math="E = 10 \text{ (Emigration)}" /></div>
              <div>{"2. Substitute the values:"}</div>
              <div className="pl-3"><InlineMath math="N_{t+1} = 500 + [ (80 + 30) - (60 + 10) ]" /></div>
              <div className="pl-3"><InlineMath math="N_{t+1} = 500 + [ 110 - 70 ]" /></div>
              <div className="pl-3"><InlineMath math="N_{t+1} = 500 + 40 = 540" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The final population size is 540 individuals.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 5: PRACTICE MOCK TEST ────────────────────────────────── */}
      <Collapsible title="5 · Practice Mock Test (15 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your understanding of Population Dynamics, Energy Flow, Pyramids, and Biodiversity conservation with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which population pyramid configuration represents a declining population?',
                a: 'Triangular shape',
                b: 'Bell-shaped curve',
                c: 'Urn-shaped layout',
                d: 'Rectangular block shape',
                ans: 'Correct Answer: C. An urn-shaped age pyramid has pre-reproductive individuals smaller than reproductive ones, indicating decline.'
              },
              {
                q: 'In the Verhulst-Pearl logistic growth equation, dN/dt is zero when population density N matches:',
                a: 'Intrinsic rate r',
                b: 'Carrying Capacity K',
                c: 'K / 2',
                d: 'Zero',
                ans: 'Correct Answer: B. When N = K, the term (K-N)/K becomes zero, causing dN/dt to drop to zero (reaches asymptote).'
              },
              {
                q: 'The competitive exclusion principle stating that two species competing for identical resources cannot co-exist indefinitely was formulated by:',
                a: 'Alexander von Humboldt',
                b: 'MacArthur',
                c: 'G. F. Gause',
                d: 'David Tilman',
                ans: 'Correct Answer: C. Gause\'s Competitive Exclusion Principle states that two closely related species competing for the same resources cannot co-exist.'
              },
              {
                q: 'The symbiotic association between fungi of the genus Glomus and roots of higher plants is an example of:',
                a: 'Commensalism',
                b: 'Amensalism',
                c: 'Mutualism',
                d: 'Parasitism',
                ans: 'Correct Answer: C. Glomus mycorrhizae represent a mutualistic relationship where the plant gets minerals and the fungus gets food.'
              },
              {
                q: 'The Mediterranean orchid Ophrys employs which mechanism to ensure pollination by male bees?',
                a: 'Nectar reward',
                b: 'Sexual deceit (Pseudocopulation)',
                c: 'Color guides',
                d: 'Pollen storage chamber',
                ans: 'Correct Answer: B. Ophrys has one petal resembling a female bee, attracting male bees for pseudocopulation.'
              },
              {
                q: 'If GPP of an ecosystem is 100 kcal/m²/year and respiration losses are 20 kcal/m²/year, what is the Net Primary Productivity?',
                a: '120 kcal/m²/year',
                b: '80 kcal/m²/year',
                c: '50 kcal/m²/year',
                d: '5 kcal/m²/year',
                ans: 'Correct Answer: B. NPP = GPP - R = 100 - 20 = 80 kcal/m²/year.'
              },
              {
                q: 'Which step of decomposition involves water-soluble inorganic nutrients migrating down into the soil horizon?',
                a: 'Catabolism',
                b: 'Fragmentation',
                c: 'Leaching',
                d: 'Humification',
                ans: 'Correct Answer: C. Leaching is the downward movement and precipitation of soluble inorganic nutrients.'
              },
              {
                q: 'The rate of decomposition is significantly retarded when the detritus is rich in:',
                a: 'Sugars and Nitrogen',
                b: 'Water',
                c: 'Lignin and Chitin',
                d: 'Proteins',
                ans: 'Correct Answer: C. Lignin and Chitin have complex structures that make them highly resistant to enzymatic decay.'
              },
              {
                q: 'What percentage of incident solar radiation constitutes Photosynthetically Active Radiation (PAR)?',
                a: '10%',
                b: 'Less than 50%',
                c: '80%',
                d: '2-10%',
                ans: 'Correct Answer: B. Less than 50% of solar radiation is PAR. Plants capture only 2-10% of this PAR.'
              },
              {
                q: 'Which ecological pyramid is ALWAYS upright and can never be inverted?',
                a: 'Pyramid of Numbers',
                b: 'Pyramid of Biomass',
                c: 'Pyramid of Energy',
                d: 'Pyramid of Species Richness',
                ans: 'Correct Answer: C. The pyramid of energy is always upright due to Lindeman\'s 10% law and thermodynamic heat losses.'
              },
              {
                q: 'The species-area relationship straight line slope Z value for frugivorous birds in tropical forests of different continents is:',
                a: '0.15',
                b: '1.15',
                c: '0.2',
                d: '0.6',
                ans: 'Correct Answer: B. For large regions like continents, the slope Z increases; for frugivorous birds in tropical forests, it is 1.15.'
              },
              {
                q: 'Paul Ehrlich compared individual species in an ecosystem to rivets in a:',
                a: 'Car',
                b: 'Airplane',
                c: 'Ship',
                d: 'Bridge',
                ans: 'Correct Answer: B. The Rivet Popper hypothesis compares the ecosystem to an airplane, where species are rivets.'
              },
              {
                q: 'Which cause of biodiversity loss is considered the most significant for driving animal and plant extinctions?',
                a: 'Over-exploitation',
                b: 'Alien species invasions',
                c: 'Habitat loss and fragmentation',
                d: 'Co-extinctions',
                ans: 'Correct Answer: C. Habitat loss and fragmentation is the single most important factor driving extinctions.'
              },
              {
                q: 'Which of the following conservation methods is an example of In-situ conservation?',
                a: 'Cryopreservation',
                b: 'Seed Banks',
                c: 'Sacred Groves',
                d: 'Botanical Gardens',
                ans: 'Correct Answer: C. Sacred Groves are protected natural forest sites and represent in-situ conservation.'
              },
              {
                q: 'The Earth Summit of 1992 on biodiversity conservation was held in:',
                a: 'Johannesburg',
                b: 'Rio de Janeiro',
                c: 'Kyoto',
                d: 'Montreal',
                ans: 'Correct Answer: B. The Earth Summit (1992) was held in Rio de Janeiro, Brazil.'
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
        <span className="text-[11px] text-white/30 font-mono">Ecology &amp; Environment · Unit 10</span>
      </div>

    </div>
  );
}
