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

export default function PlantPhysiologyDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'guard_cells' | 'root_nodule' | 'c3_c4' | 'fermentation' | 'dwarf_plant'>('guard_cells');
  const [treatment, setTreatment] = useState<'aba' | 'ga_spray' | 'oxygen_exposure' | 'light_filter' | 'k_block'>('aba');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    if (treatment === 'aba') {
      if (specimen === 'guard_cells') {
        return {
          outcome: 'Rapid Stomatal Closure (Turgor Loss)',
          color: 'text-rose-400',
          visualEffect: 'The guard cells lose water rapidly, collapsing and closing the stomatal pore.',
          product: 'Flaccid guard cells; decreased transpiration rate',
          explanation: 'Abscisic acid (ABA) acts as a stress hormone. Under water deficit, ABA binds receptors on the guard cell membrane, initiating calcium influx which triggers K+ and anion efflux. Water follows osmotically, making guard cells flaccid and closing the pore to prevent transpiration.',
          trap: 'ABA is a direct antagonist to cytokinins and auxins on stomatal openings. It acts fast via ion leakage without requiring new gene transcription.'
        };
      }
      return {
        outcome: 'General growth inhibition; stress defense triggered.',
        color: 'text-zinc-400',
        visualEffect: 'Metabolic activity slows down.',
        product: 'Stress-induced dormancy proteins',
        explanation: 'ABA shuts down growth activities, inducing seed dormancy and protecting tissues from dehydration.',
        trap: 'Always recall that ABA is an antagonist to Gibberellins (GA) in seed germination.'
      };
    }

    if (treatment === 'ga_spray') {
      if (specimen === 'dwarf_plant') {
        return {
          outcome: 'Massive Internode Elongation (Phenotypic Reversal)',
          color: 'text-emerald-400',
          visualEffect: 'The rosette dwarf plant grows rapidly in height, resembling a normal tall variety.',
          product: 'Elongated stem cells; bolting induced',
          explanation: 'Gibberellins (GA) promote cell elongation by increasing cell wall plasticity and activating xyloglucan endotransglycosylase (XET). Rosette dwarf mutants are genetically deficient in GA synthesis; spraying them with exogenous GA3 bypasses the genetic block to restore normal height.',
          trap: 'GA spray alters the phenotype of dwarf plants but does NOT change their genotype (their selfed seeds will still grow into dwarf plants).'
        };
      }
    }

    if (treatment === 'oxygen_exposure') {
      if (specimen === 'root_nodule') {
        return {
          outcome: 'Irreversible Nitrogenase Denaturation / Deactivation',
          color: 'text-rose-400',
          visualEffect: 'Red-pink leghemoglobin turns brown; biological nitrogen fixation drops to zero.',
          product: 'Inactive nitrogenase enzymes',
          explanation: 'Nitrogenase is highly sensitive to free oxygen because O2 oxidizes its iron-sulfur protein components. Symbiotic nodules maintain an anaerobic microenvironment using Leghemoglobin (an oxygen scavenger). Overwhelming the nodule with high O2 denatures nitrogenase, halting nitrogen fixation.',
          trap: 'Nitrogen fixation is energetically expensive, costing 16 ATP per N2 molecule fixed (8 ATP per NH3 formed).'
        };
      }
    }

    if (treatment === 'light_filter') {
      if (specimen === 'c3_c4') {
        return {
          outcome: 'Wavelength-Dependent Photosynthetic Action Shift',
          color: 'text-cyan-400',
          visualEffect: 'Green light filter drops rate to minimum; red/blue filters yield peak rates.',
          product: 'Varying oxygen evolution levels',
          explanation: 'Chlorophyll a and b absorb light mainly in the blue and red wavelengths, showing negligible absorption of green light (which is reflected, giving plants their green color). Light quality directly determines photochemical excitation.',
          trap: 'Wavelengths beyond 680 nm (far-red) excite only PS I, shifting the system exclusively into cyclic photophosphorylation, which produces ATP but no NADPH or O2.'
        };
      }
    }

    if (treatment === 'k_block') {
      if (specimen === 'guard_cells') {
        return {
          outcome: 'Inability to Open Stomata',
          color: 'text-rose-400',
          visualEffect: 'Stomata remain closed even under intense blue light stimulation.',
          product: 'Closed stomatal pore',
          explanation: 'Stomatal opening is driven by active proton pumping out of guard cells, which draws K+ ions in down the electrical gradient. Blocking K+ accumulation prevents the osmotic water entry required to swell the bean/dumbbell-shaped guard cells.',
          trap: 'Potassium ion movement is passive electrogenic influx, but it is driven by active H+ efflux pumps (requires ATP).'
        };
      }
    }

    return {
      outcome: 'No specific diagnostic reaction occurred.',
      color: 'text-zinc-400',
      visualEffect: 'Specimen remains unchanged.',
      product: 'None',
      explanation: 'No unique physiological or metabolic marker was triggered by this combination.',
      trap: 'Try other combinations to test diagnostic details.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white plant-physio-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .plant-physio-chapter .text-xs { font-size: 13px !important; }
        .plant-physio-chapter .text-sm { font-size: 15px !important; }
        .plant-physio-chapter .text-base { font-size: 17.5px !important; }
        .plant-physio-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .plant-physio-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .plant-physio-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .plant-physio-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .plant-physio-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 4</Tag>
            <Tag color="rose">IAT Core Framework</Tag>
            <Tag color="violet">Plant Physiology</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Plant Physiology: <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Photosynthesis, Respiration & PGRs</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Complete revision framework mapping historical experiments, photophosphorylation, Calvin/Hatch-Slack cycles, Glycolysis/Krebs/ETS pathways, and Plant Growth Regulators.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: PHOTOSYNTHESIS IN HIGHER PLANTS ────────────────────── */}
      <Collapsible title="1 · Photosynthesis in Higher Plants: Early Experiments & Pathways" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Overall Chemical Equation & Early Experiments" color="cyan" />
          <div className="p-4 bg-black/45 rounded-2xl border border-white/5 text-center font-mono text-cyan-400 text-xs sm:text-sm">
            {"6CO₂ + 12H₂O ➔ C₆H₁₂O₆ + 6O₂ + 6H₂O  [Light & Pigments required]"}
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Scientist</th>
                  <th className="p-3">Experimental Setup</th>
                  <th className="p-3 text-cyan-400">Key Conclusion / Discovery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Joseph Priestley (1770)</td>
                  <td className="p-3">Mint plant + candle + mouse under a bell jar.</td>
                  <td className="p-3 text-cyan-400">Plants restore oxygen to the air that is consumed by breathing animals and burning candles.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Jan Ingenhousz (1779)</td>
                  <td className="p-3">Aquatic plant placed in bright sunlight vs. darkness.</td>
                  <td className="p-3 text-cyan-400">Only the green parts of the plant in the presence of sunlight release oxygen bubbles.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Julius von Sachs (1854)</td>
                  <td className="p-3">Chemical extraction of plant leaf tissue.</td>
                  <td className="p-3 text-cyan-400">Green plant parts produce glucose, which is typically stored as starch.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">T.W. Engelmann (1882)</td>
                  <td className="p-3">Spotted aerobic bacteria with Cladophora algae split by a light prism.</td>
                  <td className="p-3 text-cyan-400">Bacteria clustered near red and blue light zones, mapping the first action spectrum of photosynthesis.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Cornelius van Niel (1930s)</td>
                  <td className="p-3">Purple and green sulfur bacteria (H₂S electron donor).</td>
                  <td className="p-3 text-cyan-400">Oxygen released in photosynthesis comes from water (H₂O), not from carbon dioxide (CO₂).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="2. Pigments, Reaction Centers & Absorption Spectra" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Pigments:</strong> Separated by paper chromatography: Chlorophyll a (bright/blue-green), Chlorophyll b (yellow-green), Xanthophylls (yellow), and Carotenoids (yellow to yellow-orange).</li>
            <li><strong>Chlorophyll a:</strong> Primary pigment forming the reaction center. All other pigments act as accessory pigments, absorbing light and transferring energy to Chl a, protecting it from photo-oxidation.</li>
            <li><strong>Photosystems:</strong> PS II reaction center absorbs peak light at **680 nm (P680)**; PS I absorbs peak light at **700 nm (P700)**.</li>
            <li><strong>Emerson Enhancement Effect:</strong> Illuminating chloroplasts with red and far-red wavelengths together yields a synergistic photosynthetic rate greater than the sum of individual rates, proving the existence of two cooperating photosystems.</li>
          </ul>

          <SectionBanner label="3. Light Reactions, Z-Scheme & Chemiosmosis" color="cyan" />
          
          {/* Z-Scheme SVG Diagram */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 240" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="250" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">Z-SCHEME ELECTRON TRANSPORT CHAIN</text>
              
              {/* Energy scale */}
              <line x1="40" y1="200" x2="40" y2="40" stroke="#ffffff" strokeWidth="1" strokeDasharray="2" />
              <text x="30" y="120" fill="#ffffff" fontSize="8" transform="rotate(-90 30 120)" textAnchor="middle">Redox Potential (Energy)</text>

              {/* PS II */}
              <circle cx="100" cy="180" r="15" fill="#e11d48" />
              <text x="100" y="183" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">PS II</text>
              <text x="100" y="210" fill="#e11d48" fontSize="8" textAnchor="middle">P680 (Water Splitting)</text>

              {/* Light excitation 1 */}
              <path d="M 100 165 L 100 80" fill="none" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="110" y="120" fill="#fbbf24" fontSize="8">Light Excitation</text>

              {/* Primary Acceptor 1 */}
              <rect x="75" y="55" width="50" height="20" rx="5" fill="#374151" stroke="#ffffff" strokeWidth="1" />
              <text x="100" y="67" fill="#ffffff" fontSize="7" textAnchor="middle">Electron Acc.</text>

              {/* Downhill ETC */}
              <path d="M 125 65 L 230 145" fill="none" stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="190" y="95" fill="#22d3ee" fontSize="8">PQ ➔ Cyt b6-f ➔ PC</text>
              <text x="190" y="110" fill="#34d399" fontSize="8" fontWeight="bold">Generates ATP</text>

              {/* PS I */}
              <circle cx="250" cy="150" r="15" fill="#a78bfa" />
              <text x="250" y="153" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">PS I</text>
              <text x="250" y="178" fill="#a78bfa" fontSize="8" textAnchor="middle">P700</text>

              {/* Light excitation 2 */}
              <path d="M 250 135 L 250 65" fill="none" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arrow)" />

              {/* Primary Acceptor 2 */}
              <rect x="225" y="40" width="50" height="20" rx="5" fill="#374151" stroke="#ffffff" strokeWidth="1" />
              <text x="250" y="52" fill="#ffffff" fontSize="7" textAnchor="middle">Electron Acc.</text>

              {/* Downhill to NADP+ */}
              <path d="M 275 50 L 380 90" fill="none" stroke="#f472b6" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="340" y="65" fill="#f472b6" fontSize="8">Fd ➔ Reductase</text>
              <rect x="385" y="80" width="70" height="20" rx="4" fill="#f472b6" />
              <text x="420" y="92" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">NADPH + H+</text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff" />
                </marker>
              </defs>
            </svg>
          </div>

          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Non-Cyclic Photophosphorylation (Z-Scheme):</strong> Photolysis of water occurs on the inner side of the thylakoid membrane (2H₂O ➔ 4H⁺ + 4e⁻ + O₂). Electrons are excited from PS II, flow down the electron transport chain (generating ATP), to PS I, where they are excited again to reduce NADP⁺ to NADPH.</li>
            <li><strong>Cyclic Photophosphorylation:</strong> Occurs when only PS I is functional (wavelengths &gt;680 nm, or stroma lamellae which lack PS II and NADP reductase). Electrons cycle within PS I, generating **ATP only** (no NADPH or O₂).</li>
            <li><strong>Chemiosmotic ATP Synthesis:</strong> Protons accumulate inside the **Thylakoid Lumen**. This chemical gradient drives protons down their concentration gradient into the stroma through the **CF₀ channel** of ATP Synthase, activating the **CF₁ headpiece** to synthesize ATP.</li>
          </ul>

          <SectionBanner label="4. Dark Reactions: C3, C4, CAM & Photorespiration" color="cyan" />
          <ul className="list-disc pl-4 space-y-2 text-xs text-white/60">
            <li><strong>C3 Calvin Cycle:</strong> Universal carbon fixation pathway. 
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Carboxylation:</strong> CO₂ + RuBP (5C) ➔ catalyzed by **RuBisCO** ➔ two molecules of 3-PGA (3C).</li>
                <li><strong>Reduction:</strong> Consumes 2 ATP + 2 NADPH per CO₂.</li>
                <li><strong>Regeneration:</strong> Regenerates RuBP, consuming 1 ATP.</li>
                <li>Total Cost per Glucose: **18 ATP and 12 NADPH** (6 turns).</li>
              </ul>
            </li>
            <li><strong>C4 Hatch-Slack Pathway:</strong> Tropical plants (Maize, Sorghum). Features **Kranz Anatomy** (large, thick-walled bundle sheath cells containing chloroplasts, lack intercellular spaces).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Primary CO2 fixation occurs in mesophyll cells via **PEP carboxylase (PEPcase)** to form Oxaloacetic acid (OAA - 4C).</li>
                <li>Malate is transported to bundle sheath cells, where decarboxylation releases CO₂ directly to RuBisCO for the C3 cycle.</li>
                <li>Completely suppresses **Photorespiration** by maintaining high local CO₂ concentrations.</li>
                <li>Total Cost per Glucose: **30 ATP** (18 ATP for C3 + 12 ATP for PEP regeneration).</li>
              </ul>
            </li>
            <li><strong>Photorespiration (C2 Cycle):</strong> Highly wasteful process occurring in C3 plants under high light, temperature, and low CO₂ levels. RuBisCO binds oxygen instead of CO₂ due to its dual activity. Occurs across three organelles: **Chloroplast ➔ Peroxisome ➔ Mitochondria** (Mnemonic: <strong className="text-white">Cheap Pizza Mart</strong>). No ATP or sugar is synthesized.</li>
            <li><strong>CAM Pathway (Crassulacean Acid Metabolism):</strong> Adaptation for desert plants (e.g., Pineapple, Cacti). Stomata open only at night to fix CO₂ as malate, which is stored in vacuoles and decarboxylated during the day.</li>
            <li><strong>Factors Affecting Photosynthesis:</strong> Light intensity (saturation point at ~10% of full sunlight; compensation point where respiration equals photosynthesis), temperature (enzymatic optimum, C4 plants have higher optimum than C3), water stress (causes stomatal closure and reduces surface area), and internal factors (leaf age, chlorophyll content).</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: RESPIRATION IN PLANTS ──────────────────────────────── */}
      <Collapsible title="2 · Respiration in Plants: Do Plants Breathe?, Glycolysis & Krebs" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          
          <SectionBanner label="1. do plants breathe? & Glycolysis Steps" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Introductory Concept:</strong> Plants do not have specialized respiratory organs. Gas exchange occurs via stomata and lenticels. Every plant part takes care of its own gas exchange needs. Roots require aerated soil; waterlogging causes anaerobic root stress.</li>
            <li><strong>Glycolysis (EMP Pathway):</strong> Occurs in the cytoplasm. Does not directly require oxygen. 1 Glucose (6C) is converted into 2 Pyruvic acid (3C). Consumes 2 ATP; generates 4 ATP and 2 NADH. Net yield: **2 ATP and 2 NADH**.</li>
          </ul>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Glycolysis Step</th>
                  <th className="p-3">Substrate/Product Conversion</th>
                  <th className="p-3 text-cyan-400">Enzyme Involved</th>
                  <th className="p-3 text-rose-400">ATP/NADH Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Step 1 (Activation)</td>
                  <td className="p-3">Glucose ➔ Glucose-6-Phosphate</td>
                  <td className="p-3 text-cyan-400">Hexokinase</td>
                  <td className="p-3 text-rose-400">Consumes 1 ATP</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Step 3 (Activation)</td>
                  <td className="p-3">Fructose-6-Phosphate ➔ Fructose-1,6-Bisphosphate</td>
                  <td className="p-3 text-cyan-400">Phosphofructokinase (PFK)</td>
                  <td className="p-3 text-rose-400">Consumes 1 ATP</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Step 6 (Oxidation)</td>
                  <td className="p-3">Glyceraldehyde-3-Phosphate ➔ 1,3-Bisphosphoglycerate</td>
                  <td className="p-3 text-cyan-400">G3P Dehydrogenase</td>
                  <td className="p-3 text-rose-400">Generates 2 NADH</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Step 7 (Payoff)</td>
                  <td className="p-3">1,3-Bisphosphoglycerate ➔ 3-Phosphoglycerate</td>
                  <td className="p-3 text-cyan-400">Phosphoglycerate Kinase</td>
                  <td className="p-3 text-rose-400">Generates 2 ATP</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Step 10 (Payoff)</td>
                  <td className="p-3">Phosphoenolpyruvate (PEP) ➔ Pyruvic Acid</td>
                  <td className="p-3 text-cyan-400">Pyruvate Kinase</td>
                  <td className="p-3 text-rose-400">Generates 2 ATP</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="2. Mitochondria Link Reaction & Krebs Cycle" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Link Reaction (Oxidative Decarboxylation):</strong> Pyruvate enters the mitochondrial matrix, undergoing decarboxylation to form **Acetyl-CoA (2C)**, catalyzed by Pyruvate Dehydrogenase and generating **1 CO₂ and 1 NADH** per pyruvate.</li>
            <li><strong>Krebs Cycle (TCA Cycle):</strong> Occurs in the mitochondrial matrix. Initiated when Acetyl-CoA (2C) condenses with Oxaloacetic Acid (OAA - 4C) to form Citric Acid (6C). One turn of Krebs cycle occurs for **one Acetyl-CoA** molecule.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Yield per glucose (2 turns): **6 NADH, 2 FADH₂, 2 ATP/GTP, and 4 CO₂**.</li>
                <li><strong>Amphibolic Pathway:</strong> Serves both catabolic (breakdown of glucose) and anabolic (synthesizing lipids from Acetyl-CoA, amino acids from α-ketoglutarate, or chlorophyll from Succinyl-CoA) roles.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="3. ETS complexes & Respiratory Balance Sheet" color="amber" />
          <p className="leading-relaxed text-xs text-white/60">
            Electron Transport System (ETS) is located on the **inner mitochondrial membrane**. Protons are pumped from the matrix into the **intermembrane space** (contrast with chloroplasts, where protons collect in the thylakoid lumen).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">ETS Complexes & Carriers</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Complex I:</strong> NADH Dehydrogenase</li>
                <li><strong>Complex II:</strong> Succinate Dehydrogenase (direct link between Krebs cycle and ETS)</li>
                <li><strong>Complex III:</strong> Cytochrome bc₁ complex</li>
                <li><strong>Complex IV:</strong> Cytochrome c Oxidase (contains cytochromes a, a₃, and copper centers; terminal O₂ acceptor)</li>
                <li><strong>Complex V:</strong> ATP Synthase (F₀F₁ complex)</li>
                <li><strong>Mobile Carriers:</strong> Ubiquinone (lipid-soluble, inner membrane) and Cytochrome c (peripheral membrane protein).</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Respiratory Balance Sheet</strong>
              <p><strong>Traditional NCERT Accounting:</strong> Assumes a perfect, sequential pathway with no leakages: **38 ATP per glucose** (1 NADH = 3 ATP, 1 FADH₂ = 2 ATP).</p>
              <p><strong>Modern Biochemical Accounting:</strong> Real-world yields are closer to **30-32 ATP** per glucose due to active transport costs (1 NADH = 2.5 ATP, 1 FADH₂ = 1.5 ATP).</p>
              <strong className="text-rose-300 block mt-1">RQ Values:</strong>
              <p>Carbohydrates = 1.0; Fats = 0.7; Proteins = 0.9. Anaerobic RQ is **infinite** (since O₂ consumption is 0).</p>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: PLANT GROWTH AND DEVELOPMENT ────────────────────────── */}
      <Collapsible title="3 · Plant Growth & Development: Kinetics, PGRs & Phytochrome" icon={<Workflow className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          
          <SectionBanner label="1. Growth Kinetics & Phases of Development" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Measurement of Growth:</strong> Measured by dry weight (most reliable), fresh weight, surface area, volume, cell number, or length.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Arithmetic Growth:</strong> Only one daughter cell continues division. Formula: Lt = L₀ + rt (linear graph).</li>
                <li><strong>Geometric Growth:</strong> Both daughter cells continue division. Formula: W₁ = W₀e^(rt) (exponential sigmoid graph).</li>
              </ul>
            </li>
            <li><strong>Phases of Growth:</strong> Formative (active cell division at meristems), Elongation (cell expansion and vacuole enlargement behind meristems), and Maturation (structural differentiation).</li>
            <li><strong>Plasticity (Heterophylly):</strong> Ability of plants to form different leaf shapes in response to environment (e.g., aquatic vs. terrestrial leaves in buttercup/Ranunculus) or phase of life (e.g., cotton, coriander, larkspur).</li>
          </ul>

          <SectionBanner label="2. Plant Growth Regulators (PGRs) Discovery & Functions" color="emerald" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">PGR Class</th>
                  <th className="p-3 text-cyan-400">Discovery History</th>
                  <th className="p-3 text-rose-400">Key Physiological Functions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Auxin (e.g., IAA, 2,4-D)</td>
                  <td className="p-3 text-cyan-400">Charles Darwin (phototropism in canary grass coleoptiles); F.W. Went (isolated auxin from oat coleoptiles).</td>
                  <td className="p-3 text-rose-400">Apical dominance, initiates roots in stem cuttings, induces parthenocarpy. 2,4-D is a broadleaf weedicide.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Gibberellins (GA)</td>
                  <td className="p-3 text-cyan-400">E. Kurosawa identified Gibberella fujikuroi fungus causing "foolish seedling" (bakanae) disease in rice.</td>
                  <td className="p-3 text-rose-400">Internode elongation (**bolting** in rosette plants), increases grape stalk length, breaks seed dormancy, speeds up malting.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Cytokinins</td>
                  <td className="p-3 text-cyan-400">F. Skoog and Miller (discovered kinetin from autoclaved herring sperm DNA).</td>
                  <td className="p-3 text-rose-400">Cell division, lateral growth (overcomes apical dominance), delays leaf senescence (**Richmond-Lang effect**).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Ethylene (gaseous)</td>
                  <td className="p-3 text-cyan-400">H.H. Cousins (showed volatile gas from ripened oranges accelerates banana ripening).</td>
                  <td className="p-3 text-rose-400">Fruit ripening, triple response in seedlings (horizontal growth, axis swelling, apical hook), root hair formation.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Abscisic Acid (ABA)</td>
                  <td className="p-3 text-cyan-400">Isolated as Inhibitor-B, Abscisin II, and Dormin. Synthesized from carotenoids.</td>
                  <td className="p-3 text-rose-400">Stress hormone; induces stomatal closure and seed dormancy (direct antagonist to GA).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Photoperiodism, Phytochrome & Vernalization" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Photoperiodic Perception:</strong> Light duration is perceived by the **leaves**, which release a hypothetical flowering hormone (florigen).</li>
            <li><strong>Phytochrome System (Pr / Pfr):</strong> Photoreceptor pigment existing in two interconvertible forms:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Pr (Inactive):</strong> Absorbs red light (660 nm), converting to Pfr.</li>
                <li><strong>Pfr (Active):</strong> Absorbs far-red light (730 nm), converting back to Pr.</li>
                <li>Pfr triggers physiological processes like flowering and seed germination.</li>
              </ul>
            </li>
            <li><strong>Vernalization:</strong> Requirement of low temperature treatment to shorten the vegetative phase and induce flowering. Perceived by the **shoot apex** and active meristems.</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            4 · Plant Physiology & Metabolism Lab
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Subject guard cells, nodules, rosette plants, or C3/C4 specimens to hormone sprays or oxygen leaks to analyze physiological rates.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('guard_cells')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'guard_cells' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Guard Cells (Stomata)
                </button>
                <button 
                  onClick={() => setSpecimen('root_nodule')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'root_nodule' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Leguminous Root Nodule
                </button>
                <button 
                  onClick={() => setSpecimen('c3_c4')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'c3_c4' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  C3 vs C4 Leaves
                </button>
                <button 
                  onClick={() => setSpecimen('dwarf_plant')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'dwarf_plant' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Rosette Dwarf Plant
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Stimulus / Reagent</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'aba', label: 'Apply ABA hormone (Stress)' },
                  { id: 'ga_spray', label: 'Spray Gibberellic Acid (GA3)' },
                  { id: 'oxygen_exposure', label: 'Expose Nodule to Free Oxygen' },
                  { id: 'light_filter', label: 'Filter Light (Red/Green filters)' },
                  { id: 'k_block', label: 'Apply Potassium Channel Blocker' }
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
            <Tag color="cyan">Problem 1: Water Potential Calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A plant cell has a solute potential of -12 bars and is placed in a beaker containing a solution with a water potential of -8 bars. At equilibrium, if the cell volume does not change, calculate the pressure potential of the cell."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. At osmotic equilibrium, the water potential of the cell (Ψw) must equal the water potential of the external solution."}</div>
              <div>{"2. Therefore, cell Ψw = -8 bars."}</div>
              <div>{"3. Using the water potential equation: Ψw = Ψs + Ψp."}</div>
              <div>{"4. Substitute values: -8 = -12 + Ψp."}</div>
              <div>{"5. Solve: Ψp = -8 + 12 = 4 bars."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The pressure potential (Ψp) is 4 bars.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: ATP cost for nitrogen fixation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Calculate the total ATP energy cost required for a symbiotic Rhizobium inside a root nodule to reduce 3 molecules of gaseous nitrogen into ammonia."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{renderBoldText("1. The enzymatic reduction of nitrogen gas to ammonia is catalyzed by nitrogenase: N₂ + 8H⁺ + 8e⁻ + 16ATP ➔ 2NH₃ + H₂ + 16ADP + 16Pi.")}</div>
              <div>{renderBoldText("2. Reducing 1 molecule of N₂ requires 16 ATP molecules.")}</div>
              <div>{renderBoldText("3. For 3 molecules of N₂: 3 × 16 = 48 ATP molecules are consumed.")}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: 48 ATP molecules are required.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Cyclic vs. Non-Cyclic Photophosphorylation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A researcher blocks PS II activity in isolated chloroplasts but keeps PS I functional. What products will be formed under continuous red light illumination?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Non-cyclic photophosphorylation requires both PS II (water splitting, electron source) and PS I."}</div>
              <div>{"2. When PS II is blocked, non-cyclic flow stops, preventing the reduction of NADP+ to NADPH and oxygen evolution."}</div>
              <div>{"3. However, PS I can continue to cycle electrons independently through plastoquinone and the cytochrome b6-f complex."}</div>
              <div>{"4. This cyclic flow drives proton accumulation in the thylakoid lumen, generating only ATP via ATP synthase."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Only ATP is synthesized; no NADPH or oxygen is produced.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 6: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="6 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Plant Physiology with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which early photosynthesis experimenter demonstrated that plants restore "injured" air using a mint plant and a candle under a bell jar?',
                a: 'Jan Ingenhousz',
                b: 'Joseph Priestley',
                c: 'T.W. Engelmann',
                d: 'Cornelius van Niel',
                ans: 'Correct Answer: B. Joseph Priestley in 1770 performed the bell-jar experiments, demonstrating that plants restore oxygen to the air.'
              },
              {
                q: 'Which of the following describes the active form of phytochrome, and what wavelength converts it to the inactive form?',
                a: 'Pfr is active; converted by red light (660 nm)',
                b: 'Pr is active; converted by far-red light (730 nm)',
                c: 'Pfr is active; converted by far-red light (730 nm)',
                d: 'Pr is active; converted by red light (660 nm)',
                ans: 'Correct Answer: C. Pfr is the physiologically active form of phytochrome, and it is converted back to the inactive Pr form upon absorbing far-red light (730 nm).'
              },
              {
                q: 'What is the theoretical yield of ATP per glucose molecule under aerobic respiration according to traditional NCERT accounting?',
                a: '2 ATP',
                b: '30 ATP',
                c: '38 ATP',
                d: '18 ATP',
                ans: 'Correct Answer: C. Traditional NCERT accounting states a theoretical yield of 38 ATP per glucose molecule, assuming complete oxidation and no intermediate leakage.'
              },
              {
                q: 'Which enzyme is extremely sensitive to oxygen in root nodules, and what scavenger protects it?',
                a: 'Nitrate Reductase; Chlorophyll',
                b: 'Nitrogenase; Leghemoglobin',
                c: 'Carbonic Anhydrase; Myoglobin',
                d: 'PEPcase; Rubisco',
                ans: 'Correct Answer: B. Nitrogenase is highly oxygen-sensitive and is protected by leghemoglobin, which acts as an oxygen scavenger inside legume nodules.'
              },
              {
                q: 'During Dark Reaction (Biosynthetic Phase), how many ATP and NADPH are consumed to synthesize one single molecule of Glucose in C3 plants?',
                a: '18 ATP, 12 NADPH',
                b: '30 ATP, 12 NADPH',
                c: '12 ATP, 12 NADPH',
                d: '18 ATP, 18 NADPH',
                ans: 'Correct Answer: A. C3 plants consume 18 ATP and 12 NADPH per glucose molecule in the Calvin Cycle.'
              },
              {
                q: 'How many ATP are required to produce one molecule of Glucose in C4 plants (e.g. Maize)?',
                a: '18 ATP',
                b: '30 ATP',
                c: '12 ATP',
                d: '38 ATP',
                ans: 'Correct Answer: B. C4 plants require 30 ATP per glucose molecule (18 ATP for the standard Calvin cycle plus 12 additional ATP for PEP regeneration).'
              },
              {
                q: 'Which of the following describes the correct sequence of organelles in the photorespiratory pathway (C2 cycle)?',
                a: 'Chloroplast ➔ Mitochondria ➔ Peroxisome',
                b: 'Chloroplast ➔ Peroxisome ➔ Mitochondria',
                c: 'Mitochondria ➔ Peroxisome ➔ Chloroplast',
                d: 'Peroxisome ➔ Chloroplast ➔ Mitochondria',
                ans: 'Correct Answer: B. Photorespiration occurs sequentially in Chloroplast ➔ Peroxisome ➔ Mitochondria (Mnemonic: Cheap Pizza Mart).'
              },
              {
                q: 'The respiratory quotient (RQ) of tripalmitin (fat) is approximately:',
                a: '1.0',
                b: '0.7',
                c: '0.9',
                d: '1.3',
                ans: 'Correct Answer: B. Fats (like tripalmitin) have an RQ of approximately 0.7.'
              },
              {
                q: 'Which plant growth regulator is used to overcome apical dominance and delay leaf senescence?',
                a: 'Auxin',
                b: 'Gibberellin',
                c: 'Cytokinin',
                d: 'Abscisic Acid',
                ans: 'Correct Answer: C. Cytokinins promote lateral bud growth (overcoming apical dominance) and delay leaf senescence (Richmond-Lang effect).'
              },
              {
                q: 'Short-day plants flower when the continuous dark period is:',
                a: 'Shorter than critical duration',
                b: 'Longer than critical duration',
                c: 'Interrupted by brief flashes of red light',
                d: 'Completely absent',
                ans: 'Correct Answer: B. Short-day plants require a continuous, uninterrupted dark period that is longer than a critical duration to flower.'
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
        <span className="text-[11px] text-white/30 font-mono">Plant Physiology · Unit 4</span>
      </div>

    </div>
  );
}
