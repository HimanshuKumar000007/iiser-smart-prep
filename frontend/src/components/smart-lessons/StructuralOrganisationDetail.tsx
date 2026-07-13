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

export default function StructuralOrganisationDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'dicot_stem' | 'monocot_leaf' | 'dicot_root' | 'frog_blood' | 'frog_tadpole'>('dicot_stem');
  const [reagent, setReagent] = useState<'safranin' | 'water_stress' | 'adrenaline' | 'thyroxine' | 'iodine'>('safranin');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    // Safranin Staining (lignified walls)
    if (reagent === 'safranin') {
      if (specimen === 'dicot_stem') {
        return {
          outcome: 'Lignified Xylem Vessels Stain Red-Orange',
          color: 'text-rose-400',
          visualEffect: 'Central ring of vascular bundles reveals red-stained xylem vessels facing inwards.',
          product: 'Lignified secondary walls stained with Safranin',
          explanation: 'Safranin is a basic dye that binds selectively to acidic, lignified cell walls. In dicot stems, the conjoint, collateral, open vascular bundles are arranged in a ring. The lignified xylem elements on the inside stain bright red/orange, while outer phloem and parenchymatous pith remain light green/unstained.',
          trap: 'Monocot stems do not show a ring arrangement; their conjoint closed vascular bundles are scattered throughout the ground tissue (looks like a face/monkey face bundle).'
        };
      }
      if (specimen === 'dicot_root') {
        return {
          outcome: 'Radial Diarch-Tetrarch Red Star',
          color: 'text-rose-400',
          visualEffect: 'Central stellar region reveals a red-stained 2 to 4 rayed star of xylem.',
          product: 'Lignified radial xylem rays',
          explanation: 'Dicot roots have radial vascular bundles where xylem and phloem alternate. The xylem exhibits exarch development (protoxylem outwards, metaxylem inwards) and stains red in 2-4 distinct star-like rays.',
          trap: 'Monocot roots are polyarch, having more than six xylem bundles arranged in a ring, surrounding a very large, well-developed pith.'
        };
      }
      return {
        outcome: 'Weak Staining',
        color: 'text-zinc-400',
        visualEffect: 'Only mild red coloration on cell margins.',
        product: 'Slight lignification detection',
        explanation: 'Only vascular tissues (specifically xylem vessels/tracheids and sclerenchyma cells) contain high lignin concentrations to take up safranin strongly.',
        trap: 'Parenchyma and collenchyma contain cellulose and pectin cell walls, which do not stain strongly with safranin.'
      };
    }

    // Water stress (Bulliform cells)
    if (reagent === 'water_stress') {
      if (specimen === 'monocot_leaf') {
        return {
          outcome: 'Leaf Inward Rolling (Turgor loss)',
          color: 'text-cyan-400',
          visualEffect: 'The flat blade of the grass leaf rolls tightly inwards along the midrib.',
          product: 'Inward curled leaf shape',
          explanation: 'Isobilateral monocot leaves possess large, empty, colorless bulliform (motor) cells on the upper epidermis. During water stress, these cells lose turgor pressure and become flaccid, causing the leaf to roll inward to minimize surface area and limit transpiration.',
          trap: 'Dicot leaf (dorsiventral) lacks bulliform cells and does not roll; it simply wilts/droops.'
        };
      }
      return {
        outcome: 'No rolling action; cell wilting only',
        color: 'text-rose-400',
        visualEffect: 'Cells lose turgidity, causing the structure to droop.',
        product: 'Flaccid parenchyma tissues',
        explanation: 'Leaves or stems without specialized motor epidermal cells undergo general cellular plasmolysis rather than co-ordinated rolling.',
        trap: 'Bulliform cells are a specific evolutionary adaptation of grasses and monocots.'
      };
    }

    // Adrenaline response in Frog
    if (reagent === 'adrenaline') {
      if (specimen === 'frog_blood' || specimen === 'frog_tadpole') {
        return {
          outcome: 'Cardiovascular Stimulation',
          color: 'text-emerald-400',
          visualEffect: 'Heart rate and stroke volume increase rapidly; systemic blood vessels constrict.',
          product: 'Elevated cardiac output',
          explanation: 'Adrenaline binds adrenergic receptors on the pacemaker cells of the frog\'s 3-chambered heart (ventricle/atria), increasing contraction rate. Cutaneous circulation decreases as blood is diverted to muscles.',
          trap: 'Unlike mammals, frogs have a single ventricle where oxygenated and deoxygenated blood undergo partial mixing. However, double circulation is maintained via the sinus venosus and conus arteriosus.'
        };
      }
    }

    // Thyroxine trigger for tadpole
    if (reagent === 'thyroxine') {
      if (specimen === 'frog_tadpole') {
        return {
          outcome: 'Accelerated Metamorphosis to Adult Frog',
          color: 'text-emerald-400',
          visualEffect: 'The aquatic tadpole rapidly resorbs its tail, grows hindlimbs/forelimbs, and forms lungs.',
          product: 'Young adult froglet',
          explanation: 'Thyroxine hormone secreted by the thyroid gland is the absolute controller of amphibian metamorphosis. Iodine is required for thyroxine synthesis. Adding thyroxine to water forces the tadpole to undergo premature metamorphosis into a tiny frog.',
          trap: 'If you place a tadpole in iodine-deficient water, it can never metamorphose and remains a giant tadpole forever!'
        };
      }
      return {
        outcome: 'No Metamorphosis Effect',
        color: 'text-rose-400',
        visualEffect: 'No morphological change.',
        product: 'None',
        explanation: 'Thyroxine triggers metamorphosis specific to larval amphibians. Plant tissues lack the thyroid receptors and remain unchanged.',
        trap: 'Always check if the organism is an amphibian larva before predicting a thyroxine response.'
      };
    }

    // Starch test
    if (reagent === 'iodine') {
      if (specimen === 'dicot_stem') {
        return {
          outcome: 'Starch Sheath Stains Blue-Black',
          color: 'text-violet-400',
          visualEffect: 'The innermost layer of the cortex (endodermis) stains dark blue-black under the microscope.',
          product: 'Starch-iodine inclusion complexes in endodermis',
          explanation: 'In dicot stems, the endodermis layer is rich in starch grains and is therefore referred to as the starch sheath. Exposing a stem cross-section to iodine stains this layer blue-black.',
          trap: 'In roots, the endodermis features suberized Casparian strips rather than functioning primarily as a starch sheath.'
        };
      }
    }

    return {
      outcome: 'No specific diagnostic reaction occurred.',
      color: 'text-zinc-400',
      visualEffect: 'Specimen remains unchanged.',
      product: 'None',
      explanation: 'No unique morphological or physiological marker was triggered by this combination.',
      trap: 'Try other combinations to test diagnostic details.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white structural-org-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .structural-org-chapter .text-xs { font-size: 13px !important; }
        .structural-org-chapter .text-sm { font-size: 15px !important; }
        .structural-org-chapter .text-base { font-size: 17.5px !important; }
        .structural-org-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .structural-org-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .structural-org-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .structural-org-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .structural-org-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 2</Tag>
            <Tag color="rose">IAT Essential</Tag>
            <Tag color="violet">Structural Organisation</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Structural Organisation in <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Plants & Animals</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Complete revision framework for plant morphology, vascular tissue systems, dicot/monocot anatomy comparisons, and the anatomical systems of the amphibian Frog (*Rana tigrina*).
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: MORPHOLOGY OF FLOWERING PLANTS ────────────────────── */}
      <Collapsible title="1 · Morphology: Roots, Stems, Leaves, Fruits & Seeds" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Roots: Regions & Types" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Types:</strong> Tap root system (dicots, primary root develops from radicle, e.g. mustard), Adventitious root system (emerge from parts other than radicle, e.g. grass, monstera, banyan).</li>
            <li><strong>Regions:</strong> Root cap (protection) ➔ Region of Meristematic activity (small, thin-walled active division cells) ➔ Region of Elongation (rapid enlargement, length growth) ➔ Region of Maturation (differentiation, carries root hairs for water/mineral absorption).</li>
            <li><strong>Modifications:</strong> Prop roots (Banyan tree supports), Stilt roots (emerge from lower nodes of stem in Maize/Sugarcane), Pneumatophores (vertically upward breathing roots with lenticels in saline swampy areas, e.g. <em>Rhizophora</em>).</li>
          </ul>

          <SectionBanner label="2. Stems & Leaves Modifications" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            {/* Stem */}
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Stem Configurations</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Food Storage:</strong> Potato (tuber), Ginger (rhizome), Colocasia (corm).</li>
                <li><strong>Tendrils:</strong> Slender spirals helping to climb (gourds, grapevines).</li>
                <li><strong>Thorns:</strong> Woody pointed defenses from axillary buds (<em>Citrus</em>, <em>Bougainvillea</em>).</li>
                <li><strong>Phylloclades:</strong> Fleshy green photosynthetic stems (*Opuntia* flat, *Euphorbia* cylindrical).</li>
              </ul>
            </div>
            {/* Leaf */}
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Leaf, Phyllotaxy & Types</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Leaves:</strong> Simple (undivided lamina or incisions do not touch midrib) vs. Compound (lamina incised down to midrib forming leaflets). Pinnately compound (leaflets on common axis rachis, e.g. Neem) vs. Palmately compound (leaflets attached at a common point, e.g. Silk Cotton).</li>
                <li><strong>Phyllotaxy:</strong> Alternate (Mustard, China rose), Opposite (Calotropis, Guava), Whorled (Alstonia).</li>
                <li><strong>Modifications:</strong> Tendrils (pea) for climbing, Spines (cacti) for protection.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="3. Inflorescence & Flower Symmetry" color="cyan" />
          <ul className="list-disc pl-4 space-y-2 text-xs text-white/60">
            <li><strong>Inflorescence:</strong> Arrangement of flowers on floral axis. Racemose (main axis grows indefinitely, flowers borne laterally in acropetal order) vs. Cymose (main axis terminates in a flower, basipetal order).</li>
            <li><strong>Flower Symmetry:</strong> Actinomorphic (radial: Mustard, Datura, Chilli) vs. Zygomorphic (bilateral: Pea, Gulmohur, Bean, Cassia) vs. Asymmetric (Canna).</li>
          </ul>

          <SectionBanner label="4. Placentation & Corolla Aestivation" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-2">
              <strong className="text-cyan-400 block uppercase">Placentation Types (Ovary Ovule Arrangement)</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Marginal:</strong> Ridge along ventral suture, double row of ovules. e.g. Pea.</li>
                <li><strong>Axile:</strong> Multilocular ovary, placenta on central axis. e.g. Tomato, Lemon.</li>
                <li><strong>Parietal:</strong> Ovules on peripheral inner wall. e.g. Mustard, Argemone.</li>
                <li><strong>Free Central:</strong> Septa absent, ovules on central axis. e.g. Dianthus, Primrose.</li>
                <li><strong>Basal:</strong> Single ovule attached at ovary base. e.g. Sunflower, Marigold.</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-2">
              <strong className="text-rose-400 block uppercase">Corolla Aestivation</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Valvate:</strong> Whorl margins touch without overlapping. e.g. <em>Calotropis</em>.</li>
                <li><strong>Twisted:</strong> One margin overlaps next. e.g. China rose, Lady\'s finger, Cotton.</li>
                <li><strong>Imbricate:</strong> Margins overlap but not in any regular pattern. e.g. <em>Cassia</em>, Gulmohur.</li>
                <li><strong>Vexillary (Papilionaceous):</strong> Large standard petal overlaps two lateral wings, which overlap two fused keel petals. e.g. Pea, Bean.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="5. The Fruit & The Seed" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-2">
              <strong className="text-cyan-400 block uppercase">Fruit Classifications</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Drupe (Fleshy):</strong> Stony endocarp. e.g. Mango (mesocarp is edible), Coconut (mesocarp is fibrous). Developed from monocarpellary superior ovaries.</li>
                <li><strong>Berry (Fleshy):</strong> Edible pericarp and placenta. e.g. Tomato, Banana.</li>
                <li><strong>Pepo (Fleshy):</strong> Hard rind. e.g. Cucumber, Watermelon.</li>
                <li><strong>Legume (Dry dehiscent):</strong> Cleaves along sutures. e.g. Pea, Bean.</li>
                <li><strong>Caryopsis (Dry indehiscent):</strong> Pericarp fused with seed coat. e.g. Maize, Wheat.</li>
                <li><strong>Parthenocarpic:</strong> Fruit formed without fertilization (seedless, e.g. Banana).</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-2">
              <strong className="text-rose-400 block uppercase">Seed Structure & Classifications</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Dicot Seed:</strong> Seed coat (outer testa, inner tegmen), hilum scar, micropore micropyle. Embryonal axis consists of radicle and plumule flanked by two cotyledons. Non-endospermic (endosperm consumed, e.g. Pea, Gram, Bean). Exception: Castor is endospermic.</li>
                <li><strong>Monocot Seed:</strong> Generally endospermic. Seed coat fused with fruit wall. Embryo is small, shield-shaped cotyledon is called <strong className="text-white">scutellum</strong>. Plumule covered by protective sheath <strong className="text-white">coleoptile</strong>, radicle covered by <strong className="text-white">coleorhiza</strong>. e.g. Maize, Wheat.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="6. Floral Families & Semi-Technical Descriptions" color="cyan" />
          <p className="leading-relaxed text-xs">
            A <strong className="text-white">semi-technical description</strong> of a flower uses standard botanical symbols to convey morphology sequentially: Bracteate (Br) / Ebracteate (Ebr); pedicellate / sessile; complete / incomplete; Actinomorphic (⊕) / Zygomorphic (%); bisexual (⚦); Calyx (K); Corolla (C); Androecium (A); Gynoecium (G) with superior ovary (<span className="underline">G</span>) or inferior ovary (<span className="overline">G</span>).
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Family</th>
                  <th className="p-3 text-cyan-400">Floral Formula</th>
                  <th className="p-3 text-rose-400">Key Features</th>
                  <th className="p-3">Economic Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Fabaceae (Pea)</td>
                  <td className="p-3 font-mono text-cyan-400">% ⚦ K₍₅₎ C₁₊₂₊₍₂₎ A₍₉₎₊₁ G₁</td>
                  <td className="p-3 text-rose-400">Diadelphous stamens, marginal placentation, vexillary aestivation</td>
                  <td className="p-3 font-italic">Gram, Pea, Soyabean, Indigofera, Mulethi</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Solanaceae (Potato)</td>
                  <td className="p-3 font-mono text-cyan-400">⊕ ⚦ K₍₅₎ C₍₅₎ A₅ G₍₂₎ (epipetalous)</td>
                  <td className="p-3 text-rose-400">Epipetalous stamens, swollen axile placenta, persistent calyx</td>
                  <td className="p-3 font-italic">Tomato, Brinjal, Potato, Chilli, Belladonna, Petunia</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Liliaceae (Lily)</td>
                  <td className="p-3 font-mono text-cyan-400">⊕ ⚦ P₍₃₊₃₎ A₃₊₃ G₍₃₎ (epiphyllous)</td>
                  <td className="p-3 text-rose-400">Perianth (tepals), epiphyllous stamens, axile placentation</td>
                  <td className="p-3 font-italic">Tulip, Aloe, Asparagus, Onion, Colchicum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: ANATOMY & TISSUE SYSTEMS ───────────────────────────── */}
      <Collapsible title="2 · Anatomy: Tissue Systems, Vascular Bundles & Secondary Growth" icon={<Layers className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          
          <SectionBanner label="1. The Tissue Systems" color="amber" />
          <ul className="list-disc pl-4 space-y-2 text-white/60 text-xs">
            <li><strong>Meristematic Tissues:</strong> Actively dividing cells. Apical (primary growth, apex of roots/stems), Intercalary (primary growth, between permanent tissues, regenerates grass parts eaten by herbivores), and Lateral/Secondary (girth growth, e.g. fascicular/interfascicular cambium and cork cambium).</li>
            <li><strong>Permanent Tissues:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Simple:</strong> Parenchyma (thin cellulose walls, photosynthesis/storage), Collenchyma (pectin thickenings at corners, mechanical support in young dicot stems), Sclerenchyma (thick lignified secondary walls, dead, fibers/sclereids).</li>
                <li><strong>Complex:</strong> Xylem (tracheids, vessels, xylem fibers, xylem parenchyma) and Phloem (sieve tube elements, companion cells, phloem parenchyma, phloem fibers).</li>
              </ul>
            </li>
            <li><strong>Tissue Systems:</strong> Epidermal (epidermis, cuticle, stomatal guard/subsidiary cells, root hairs, trichomes), Ground (cortex, endodermis, pericycle, medullary rays, pith), and Vascular (conjoint or radial bundles).</li>
          </ul>

          <SectionBanner label="2. Dicot vs. Monocots Anatomical Contrasts" color="amber" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Organ Type</th>
                  <th className="p-3 text-cyan-400">Dicot characteristics</th>
                  <th className="p-3 text-rose-400">Monocot characteristics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Root</td>
                  <td className="p-3 text-cyan-400">Diarch to tetrarch (2-4 bundles), pith is tiny/absent. Endodermis has Casparian strips (suberin).</td>
                  <td className="p-3 text-rose-400">Polyarch (&gt;6 xylem bundles), pith is large and well-developed.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Stem</td>
                  <td className="p-3 text-cyan-400">Vascular bundles in a ring, conjoint open (with cambium), collenchyma hypodermis. Pith present.</td>
                  <td className="p-3 text-rose-400">Vascular bundles scattered (face-like), conjoint closed, sclerenchyma hypodermis & sheath. Pith absent.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Leaf</td>
                  <td className="p-3 text-cyan-400">Dorsiventral. Palisade & spongy mesophyll, stomata mainly lower. Subsidiary cells distinct.</td>
                  <td className="p-3 text-rose-400">Isobilateral. Homogeneous mesophyll, equal stomata, bulliform cells (turgor rolling control).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Secondary Growth & Wood Formations" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-2">
              <strong className="text-cyan-400 block uppercase">Spring Wood vs. Autumn Wood</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Spring Wood (Early Wood):</strong> Active cambium in spring. Produces many wide-lumen xylem vessels. Wood has low density and light color.</li>
                <li><strong>Autumn Wood (Late Wood):</strong> Less active cambium in winter. Produces fewer narrow-lumen xylem vessels. Wood has high density and dark color.</li>
                <li><strong>Annual Rings:</strong> Alternating rings of spring and autumn wood. Used to estimate tree age (Dendrochronology).</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-2">
              <strong className="text-rose-400 block uppercase">Heartwood, Sapwood & Tyloses</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Heartwood:</strong> Central dead wood. Vessels blocked by balloon-like parenchymatous ingrowths called <strong className="text-white">Tyloses</strong>. Highly durable, resistant to decay due to tannins/oils. Provides strength, no water transport.</li>
                <li><strong>Sapwood:</strong> Peripheral living wood. Active water and mineral transport.</li>
                <li><strong>Dicot Root Secondary Growth:</strong> Vascular cambium emerges as a completely wavy continuous ring from pericycle tissue located below phloem bundles, becoming circular later.</li>
              </ul>
            </div>
          </div>

          {/* SVG Figure: Secondary Growth ring cross section */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="250" y="20" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">DICOT SECONDARY GROWTH LAYERS</text>
              
              {/* Concentric rings */}
              <circle cx="250" cy="115" r="70" fill="none" stroke="#e11d48" strokeWidth="6" opacity="0.3" /> {/* Cork bark */}
              <circle cx="250" cy="115" r="55" fill="none" stroke="#b45309" strokeWidth="4" /> {/* Secondary Phloem */}
              <circle cx="250" cy="115" r="45" fill="none" stroke="#22d3ee" strokeWidth="2.5" /> {/* Vascular Cambium */}
              <circle cx="250" cy="115" r="30" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" /> {/* Secondary Xylem Wood */}
              <circle cx="250" cy="115" r="10" fill="#fef08a" /> {/* Pith */}

              {/* Labels */}
              <g fontSize="8" fontFamily="monospace" fill="#ffffff">
                <text x="345" y="118" fill="#e11d48">Bark (Phellem)</text>
                <text x="325" y="85" fill="#b45309">Sec. Phloem</text>
                <text x="315" y="60" fill="#22d3ee">Cambium Ring</text>
                <text x="290" y="45" fill="#fbbf24">Sec. Xylem (Wood)</text>
                <text x="250" y="118" fill="#000000" textAnchor="middle">Pith</text>
              </g>

              {/* Guide lines */}
              <path d="M 320 115 L 340 115" stroke="#e11d48" strokeWidth="1" />
              <path d="M 305 92 L 320 85" stroke="#b45309" strokeWidth="1" />
              <path d="M 292 82 L 310 60" stroke="#22d3ee" strokeWidth="1" />
              <path d="M 275 92 L 285 48" stroke="#fbbf24" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: ANIMAL TISSUES & ORGAN SYSTEMS ────────────────────── */}
      <Collapsible title="3 · Animal Tissues & Organ Systems (The Foundation)" icon={<Workflow className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="Four Basic Animal Tissues" color="emerald" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Tissue type</th>
                  <th className="p-3">Sub-types</th>
                  <th className="p-3 text-cyan-400">Structure / Elements</th>
                  <th className="p-3 text-rose-400">Location</th>
                  <th className="p-3">Function</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Epithelial</td>
                  <td className="p-3">Squamous, Cuboidal, Columnar, Ciliated, Glandular</td>
                  <td className="p-3 text-cyan-400">Single layer of compact cells on basement membrane</td>
                  <td className="p-3 text-rose-400">Blood vessels, stomach lining, kidney tubules, trachea</td>
                  <td className="p-3">Diffusion, secretion, absorption, particle movement</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Connective</td>
                  <td className="p-3">Areolar, Adipose, Bone, Cartilage, Blood, Lymph</td>
                  <td className="p-3 text-cyan-400">Cells scattered inside an extracellular matrix with fibers</td>
                  <td className="p-3 text-rose-400">Under skin, skeleton, ears, blood vessels</td>
                  <td className="p-3">Support, binding, fat storage, nutrient/gas transport</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Muscular</td>
                  <td className="p-3">Skeletal (Striated), Smooth (Unstriated), Cardiac</td>
                  <td className="p-3 text-cyan-400">Elongated fibers; voluntary or involuntary; intercalated discs in heart</td>
                  <td className="p-3 text-rose-400">Attached to bones, viscera (gut), heart wall</td>
                  <td className="p-3">Movement, locomotion, pumping of blood</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Neural</td>
                  <td className="p-3">Neurons, Neuroglia</td>
                  <td className="p-3 text-cyan-400">Excitable nerve cells + support glial cells</td>
                  <td className="p-3 text-rose-400">Brain, spinal cord, nerves</td>
                  <td className="p-3">Conduction of electrical impulses, integration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: AMPHIBIAN - FROG ANATOMY ───────────────────────────── */}
      <Collapsible title="4 · Amphibian: Frog (Rana tigrina) Detailed Anatomy" icon={<Activity className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          
          <SectionBanner label="1. Frog Digestive System" color="violet" />
          <p className="leading-relaxed text-xs">
            The digestive system consists of an alimentary canal and digestive glands.
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Alimentary Canal:</strong> Short because frogs are carnivores (shortens intestine length). Mouth ➔ Buccal cavity ➔ Pharynx ➔ Esophagus (short tube) ➔ Stomach (site of HCl/pepsin digestion) ➔ Duodenum (receives bile and pancreatic juice) ➔ Ileum ➔ Rectum ➔ <strong className="text-white">Cloaca</strong> (common chamber for fecal, urinary, and reproductive discharge).</li>
            <li><strong>Tongue:</strong> Bilobed and attached at the front, allowing it to flip outward rapidly to capture prey.</li>
          </ul>

          <SectionBanner label="2. Frog Nervous System & Brain parts" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Brain division</th>
                  <th className="p-3 text-cyan-400">Constituent Parts</th>
                  <th className="p-3 text-rose-400">Function / Features</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Forebrain</td>
                  <td className="p-3 text-cyan-400">Olfactory lobes (paired), Cerebral hemispheres (paired), unpaired Diencephalon</td>
                  <td className="p-3 text-rose-400">Sensation of smell, voluntary motor control, integration</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Midbrain</td>
                  <td className="p-3 text-cyan-400">Optic lobes (paired)</td>
                  <td className="p-3 text-rose-400">Visual processing (large and well-developed in frogs)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Hindbrain</td>
                  <td className="p-3 text-cyan-400">Cerebellum, Medulla oblongata</td>
                  <td className="p-3 text-rose-400">Medulla oblongata passes through <strong className="text-white">foramen magnum</strong> into spinal cord. Controls balance and autonomic functions.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Frog Cardiovascular & Excretory circuits" color="violet" />
          
          {/* SVG Figure: Frog Heart schematics */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="250" y="20" fill="#ec4899" fontSize="12" fontWeight="bold" textAnchor="middle">FROG 3-CHAMBERED HEART SCHEMATIC</text>
              
              {/* Heart Chambers */}
              <rect x="150" y="45" width="80" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="190" y="75" fill="#ffffff" fontSize="9" textAnchor="middle">Left Atrium</text>

              <rect x="270" y="45" width="80" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="310" y="75" fill="#ffffff" fontSize="9" textAnchor="middle">Right Atrium</text>

              <rect x="210" y="110" width="80" height="60" rx="8" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="250" y="145" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Single Ventricle</text>

              {/* Mixing note */}
              <text x="380" y="140" fill="#f43f5e" fontSize="9" fontWeight="bold">Mixing Zone</text>
              <text x="380" y="155" fill="#a1a1aa" fontSize="8">Oxygenated &</text>
              <text x="380" y="167" fill="#a1a1aa" fontSize="8">Deoxygenated blood</text>
              <text x="380" y="179" fill="#a1a1aa" fontSize="8">mix in the ventricle.</text>

              {/* Vessels lines */}
              <path d="M 190 95 L 225 110" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M 310 95 L 275 110" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Circulatory Circuit</strong>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>3-Chambered Heart:</strong> Two atria (separate receiving) and one single ventricle.</li>
                <li><strong>Sinus Venosus:</strong> Triangular chamber on dorsal side of heart receiving deoxygenated blood from vena cava.</li>
                <li><strong>Conus Arteriosus:</strong> Ventral muscular tube leaving the ventricle to distribute blood.</li>
                <li><strong>Portal Circuits:</strong> Hepatic portal system (liver-gut) and <strong className="text-white">Renal portal system</strong> (kidney-lower body limbs).</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Excretion & Water Balance</strong>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Kidneys:</strong> Pair of compact, dark red, mesonephric kidneys located dorsally.</li>
                <li><strong>Ureters:</strong> Act as urinogenital ducts in male frogs (carrying both sperm and urine) opening directly into the <strong className="text-white">cloaca</strong>.</li>
                <li><strong>Ureotelic:</strong> Frogs excrete urea as the primary nitrogenous waste.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="4. Frog Reproductive & Development cycles" color="violet" />
          <ul className="list-disc pl-4 space-y-2 text-white/60 text-xs">
            <li><strong>Male:</strong> Pair of yellow ovoid testes adhered to kidneys by double fold peritoneum called <strong className="text-white">mesorchium</strong>. Vasa efferentia (10-12) enter <strong className="text-white">Bidder\'s organ/canal</strong> in kidneys before communicating with the urinogenital duct and opening to cloaca.</li>
            <li><strong>Female:</strong> Pair of lobulated ovaries (no functional link to kidneys). Oviducts open separately into cloaca.</li>
            <li><strong>Development:</strong> External fertilization occurs in water inside a gelatinous spawn. Larva is the aquatic herbivorous <strong className="text-white">Tadpole</strong>, which undergoes thyroid-controlled retrogressive/progressive metamorphosis to develop into a carnivorous adult.</li>
          </ul>

          <SectionBanner label="5. Comparison: Tadpole vs. Adult Frog" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Feature</th>
                  <th className="p-3 text-cyan-400">Tadpole Larva</th>
                  <th className="p-3 text-rose-400">Adult Frog</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Habitat & Nutrition</td>
                  <td className="p-3 text-cyan-400">Aquatic; herbivorous (feeds on algae, long intestine)</td>
                  <td className="p-3 text-rose-400">Amphibious; carnivorous (feeds on insects, short intestine)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Respiration</td>
                  <td className="p-3 text-cyan-400">Gills (Branchial respiration)</td>
                  <td className="p-3 text-rose-400">Skin (Cutaneous), Buccal, Lungs (Pulmonary)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Locomotion</td>
                  <td className="p-3 text-cyan-400">Tail with tail-fin (swimming)</td>
                  <td className="p-3 text-rose-400">Limbs (leaping, webbed toes for swimming); tail resorbed</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Excretion</td>
                  <td className="p-3 text-cyan-400">Ammonotelic (excretes ammonia)</td>
                  <td className="p-3 text-rose-400">Ureotelic (excretes urea)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 5: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            5 · Structural Organisation & Amphibian Physiology Lab
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Expose vegetative tissue configurations, bulliform cells, or tadpole larva to chemical reagents/stains to analyze structural responses and critical pathways.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('dicot_stem')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'dicot_stem' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Dicot Stem (Sunflower)
                </button>
                <button 
                  onClick={() => setSpecimen('monocot_leaf')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'monocot_leaf' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Monocot Leaf (Grass)
                </button>
                <button 
                  onClick={() => setSpecimen('dicot_root')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'dicot_root' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Dicot Root (Radish)
                </button>
                <button 
                  onClick={() => setSpecimen('frog_tadpole')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'frog_tadpole' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Frog Tadpole Larva
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Stimulus / Reagent</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'safranin', label: 'Stain with Safranin basic dye' },
                  { id: 'water_stress', label: 'Induce Water stress (Dehydration)' },
                  { id: 'adrenaline', label: 'Inject Adrenaline hormone' },
                  { id: 'thyroxine', label: 'Add Thyroxine to aquatic media' },
                  { id: 'iodine', label: 'Stain with Iodine solution' }
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

      {/* ─── SECTION 6: CONCEPTUAL SOLVED PROBLEMS ─────────────────────────── */}
      <Collapsible title="6 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 font-sans text-[13px]">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Bulliform cells rolling mechanism</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why do grass leaves curl inwards under hot dry wind conditions? Explain the cellular mechanism."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Grass leaves are isobilateral monocots containing specialized bulliform cells (large, empty, colorless epidermal cells) on the upper/adaxial surface."}</div>
              <div>{"2. When water is plentiful, these cells absorb water, become turgid, and keep the leaf blade open."}</div>
              <div>{"3. Under dry winds, transpiration rate increases, causing bulliform cells to lose water and turn flaccid."}</div>
              <div>{"4. This flaccidity causes the leaf margins to curl inwards, minimizing direct exposure to light and wind, reducing further water loss."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Water loss turns bulliform cells flaccid, causing leaf margins to curl inwards.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Mesorchium and Bidder\'s Canal link</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"In a male frog, track the passage of sperm from the testes to the exterior environment."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Testes are yellow ovoid structures adhered to kidneys by a peritoneal fold called mesorchium."}</div>
              <div>{"2. 10-12 vasa efferentia emerge from the testes, enter the kidneys, and open into Bidder\'s canal."}</div>
              <div>{"3. From Bidder\'s canal, it communicates with the urinogenital duct which carries both sperm and urine."}</div>
              <div>{"4. The urinogenital duct opens directly into the cloaca, which discharges the sperm out of the body."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Testis ➔ Vasa Efferentia ➔ Bidder\'s Canal ➔ Urinogenital Duct ➔ Cloaca.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Heartwood vs Sapwood functionality</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A tree trunk undergoes complete fungal infestation in its central heartwood region but continues to survive with green leaves. Explain why."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The secondary xylem in dicot stems is divided into central Heartwood and peripheral Sapwood."}</div>
              <div>{"2. Heartwood contains dead cells stuffed with highly resistant organic compounds (tannins, resins, oils). It does not conduct water; it only provides mechanical support."}</div>
              <div>{"3. Sapwood, the outer peripheral xylem, remains active in water and mineral conduction from roots to leaves."}</div>
              <div>{"4. Consequently, central heartwood destruction compromises mechanical strength but does not affect the tree\'s vital water conduction, allowing it to survive."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Water conduction occurs solely through peripheral sapwood, which was not destroyed.</span>
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
            <Tag color="cyan">Problem 5: Spring Wood vs Autumn Wood</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"How do seasonal variations affect cambial activity and lead to the formation of distinct annual rings?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Vascular cambium activity is highly responsive to seasonal climate variations."}</div>
              <div>{"2. In spring, physiological activity is high; the cambium produces abundant secondary xylem vessels with wider lumens (Spring Wood - light color, low density)."}</div>
              <div>{"3. In winter/autumn, physiological activity drops; the cambium produces fewer vessels with narrow lumens (Autumn Wood - dark color, high density)."}</div>
              <div>{"4. These alternating light and dark bands formed each year appear as concentric annual rings, reflecting seasonal transitions."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Alternation of wide-lumen spring wood and narrow-lumen autumn wood creates visible annual rings.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 7: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="7 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Plant & Animal Structural Organisation with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following is an example of a respiratory root modification (pneumatophore)?',
                a: 'Banyan tree hanging roots',
                b: 'Rhizophora growing in swampy soils',
                c: 'Maize stilt roots',
                d: 'Sweet potato roots',
                ans: 'Correct Answer: B. Pneumatophores are specialized respiratory root modifications that grow vertically upwards out of swampy soils to obtain oxygen, typical of Rhizophora.'
              },
              {
                q: 'In which family do we find epipetalous stamens, a persistent calyx, and swollen axile placentation?',
                a: 'Fabaceae',
                b: 'Solanaceae',
                c: 'Liliaceae',
                d: 'Brassicaceae',
                ans: 'Correct Answer: B. Solanaceae (potato family) is characterized by epipetalous stamens (stamens fused to petals), persistent calyx (sepals that remain on the mature fruit), and swollen axile placenta.'
              },
              {
                q: 'Which aestivation type is characterized by a large standard standard overlapping two lateral wings, which in turn overlap two fused keel petals?',
                a: 'Valvate',
                b: 'Twisted',
                c: 'Imbricate',
                d: 'Vexillary',
                ans: 'Correct Answer: D. Vexillary (or papilionaceous) aestivation is typical of Fabaceae family, featuring a standard, wings, and keel arrangement.'
              },
              {
                q: 'Which anatomical feature helps to distinguish a monocot stem from a dicot stem in cross section?',
                a: 'Presence of pith in monocots',
                b: 'Ring arrangement of vascular bundles in dicots vs. scattered in monocots',
                c: 'Radial bundles in dicots',
                d: 'Presence of cambium in monocot bundles',
                ans: 'Correct Answer: B. Dicot stems have vascular bundles arranged in a neat ring, whereas monocot stems feature vascular bundles scattered throughout the ground tissue.'
              },
              {
                q: 'Bulliform cells are specialized epidermal cells on the adaxial surface of leaves, responsible for water stress curling. In which group are they found?',
                a: 'Dorsiventral dicot leaves',
                b: 'Isobilateral monocot leaves',
                c: 'Gymnosperm needles',
                d: 'Pteridophyte microphylls',
                ans: 'Correct Answer: B. Bulliform (motor) cells are found on the upper (adaxial) epidermis of isobilateral monocot leaves (like grasses).'
              },
              {
                q: 'During secondary growth in dicot stems, the cork cambium (phellogen) divides to produce:',
                a: 'Cork (phellem) outwards, secondary cortex (phelloderm) inwards',
                b: 'Secondary xylem outwards, secondary phloem inwards',
                c: 'Bark outwards, sapwood inwards',
                d: 'Heartwood outwards, sapwood inwards',
                ans: 'Correct Answer: A. Cork cambium (phellogen) divides to form suberized cork (phellem) on the outer side and parenchymatous secondary cortex (phelloderm) on the inner side.'
              },
              {
                q: 'In a male frog, the testes are attached to the upper part of kidneys by a double fold of peritoneum called:',
                a: 'Urinogenital duct',
                b: 'Bidder\'s canal',
                c: 'Mesorchium',
                d: 'Cloaca',
                ans: 'Correct Answer: C. Mesorchium is the double fold of peritoneum that attaches the ovoid testes of a male frog to the kidneys.'
              },
              {
                q: 'Which nitrogenous waste is primarily excreted by adult frogs, and which classification does it represent?',
                a: 'Ammonia (Ammonotelic)',
                b: 'Uric Acid (Uricotelic)',
                c: 'Urea (Ureotelic)',
                d: 'Creatinine (Aminotelic)',
                ans: 'Correct Answer: C. Adult frogs are ureotelic, excreting urea as their primary nitrogenous waste. Tadpoles, being aquatic, are ammonotelic.'
              },
              {
                q: 'In a frog\'s circulatory system, the triangular chamber on the dorsal side of the heart that receives deoxygenated blood is the:',
                a: 'Conus arteriosus',
                b: 'Sinus venosus',
                c: 'Left atrium',
                d: 'Systemic arch',
                ans: 'Correct Answer: B. The sinus venosus is the triangular chamber that receives deoxygenated blood from the three vena cavae and opens into the right atrium.'
              },
              {
                q: 'Which hormone is crucial for triggering metamorphosis in aquatic frog tadpoles into terrestrial adults?',
                a: 'Adrenaline',
                b: 'Insulin',
                c: 'Thyroxine',
                d: 'Growth hormone',
                ans: 'Correct Answer: C. Thyroxine (secreted by the thyroid gland and requiring iodine) is the hormone that triggers and controls the metamorphosis of tadpoles into adult frogs.'
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
        <span className="text-[11px] text-white/30 font-mono">Structural Organisation · Unit 2</span>
      </div>

    </div>
  );
}
