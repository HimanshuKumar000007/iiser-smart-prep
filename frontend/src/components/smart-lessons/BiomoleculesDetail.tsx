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

export default function BiomoleculesDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [substrate, setSubstrate] = useState<'glucose' | 'fructose' | 'sucrose' | 'lactose' | 'starch' | 'protein'>('glucose');
  const [reagent, setReagent] = useState<'tollens' | 'fehling' | 'iodine' | 'biuret' | 'ninhydrin' | 'acid_hydrolysis'>('tollens');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    // Iodine Test (Specific to Starch)
    if (reagent === 'iodine') {
      if (substrate === 'starch') {
        return {
          outcome: 'Intense Blue-Black Complex',
          color: 'text-violet-400',
          visualEffect: 'Solution turns a dark, inky blue-black color instantly.',
          product: 'Starch-Iodine Amylose inclusion complex',
          explanation: 'Starch contains amylose, which forms helical structures. Iodine ($I_2$) slides into the center of these helices to form a coordinate inclusion complex that absorbs all visible wavelengths except deep blue/black.',
          trap: 'On heating, the helix expands, releasing iodine, and the color disappears. On cooling, the helix reforms and the blue color returns!'
        };
      } else {
        return {
          outcome: 'No Reaction / Stays Yellow-Brown',
          color: 'text-rose-400',
          visualEffect: 'Solution retains the light yellow-brown color of iodine.',
          product: 'None',
          explanation: 'Only starch possesses the helical polysaccharide cavities necessary to accommodate and stabilize the polyiodide chains. Simple sugars like glucose, fructose, and sucrose show a negative test.',
          trap: 'Cellulose does not react with iodine to give blue color because it lacks the helical conformation (it forms straight parallel sheets).'
        };
      }
    }

    // Biuret Test (Specific to Proteins/Peptides)
    if (reagent === 'biuret') {
      if (substrate === 'protein') {
        return {
          outcome: 'Violet / Purple Complex (Positive Biuret)',
          color: 'text-violet-400',
          visualEffect: 'Solution turns from light blue to a beautiful violet-purple color.',
          product: 'Copper-peptide coordination complex',
          explanation: 'Copper (II) ions coordinate with nitrogen atoms of peptide bonds (-CONH-) in basic solution to form a purple coordination complex. Requires at least two peptide bonds.',
          trap: 'Single amino acids (except Histidine) do not give a positive Biuret test because they lack multiple peptide linkages.'
        };
      } else {
        return {
          outcome: 'No Reaction / Stays Light Blue',
          color: 'text-rose-400',
          visualEffect: 'Solution remains light blue from copper ions.',
          product: 'None',
          explanation: 'Carbohydrates and free amino acids lack the peptide linkages needed to coordinate with $Cu^{2+}$ to form the colored coordination complex.',
          trap: 'Always check if the substrate is a protein or peptide before predicting a positive Biuret.'
        };
      }
    }

    // Ninhydrin Test (Specific to Amino Acids / Proteins)
    if (reagent === 'ninhydrin') {
      if (substrate === 'protein') {
        return {
          outcome: 'Ruhemann\'s Purple Complex',
          color: 'text-violet-400',
          visualEffect: 'Solution turns deep purple-blue upon heating.',
          product: 'Ruhemann\'s Purple Complex',
          explanation: 'Ninhydrin undergoes oxidative deamination of $\alpha$-amino acids/terminal amines, forming hydrindantin which couples with ammonia and another ninhydrin molecule to form a colored complex.',
          trap: 'Proline (a secondary amino acid) yields a yellow product instead of purple because of its cyclic structure!'
        };
      } else {
        return {
          outcome: 'No Reaction / Clear Solution',
          color: 'text-rose-400',
          visualEffect: 'No color change occurs.',
          product: 'None',
          explanation: 'Simple carbohydrates and polysaccharides do not possess amino groups and are completely inert to ninhydrin oxidation.',
          trap: 'Used in fingerprint detection because amino acids in sweat react to form Ruhemann\'s purple.'
        };
      }
    }

    // Acid Hydrolysis
    if (reagent === 'acid_hydrolysis') {
      if (substrate === 'sucrose') {
        return {
          outcome: 'Hydrolyzed to Glucose + Fructose',
          color: 'text-emerald-400',
          visualEffect: 'Dextrorotatory sucrose invert to a laevorotatory mixture.',
          product: 'Equimolar mixture of D-Glucose and D-Fructose (Invert Sugar)',
          explanation: 'Acid-catalyzed cleavage of the $\alpha$-1,2-glycosidic bond converts sucrose into its monomer units. Since fructose has a higher laevorotation ($-92.4^\circ$) than glucose\'s dextrorotation ($+52.5^\circ$), the overall mixture changes optical sign from positive to negative (inversion).',
          trap: 'The resulting mixture is reducing, whereas sucrose itself was non-reducing. This is a very common IAT question!'
        };
      }
      if (substrate === 'lactose') {
        return {
          outcome: 'Hydrolyzed to Glucose + Galactose',
          color: 'text-emerald-400',
          visualEffect: 'Breakdown of disaccharide yields two hexose monomers.',
          product: 'D-Glucose + D-Galactose',
          explanation: 'Acid cleaves the $\beta$-1,4-glycosidic bond holding galactose and glucose together.',
          trap: 'Both monomers are reducing sugars.'
        };
      }
      if (substrate === 'starch') {
        return {
          outcome: 'Hydrolyzed to D-Glucose',
          color: 'text-emerald-400',
          visualEffect: 'Viscous starch solution thins out and becomes reducing.',
          product: 'D-Glucose monomers',
          explanation: 'Complete hydrolysis of the $\alpha$-1,4 and $\alpha$-1,6 glycosidic bonds in starch yields pure glucose.',
          trap: 'Partial hydrolysis yields maltose.'
        };
      }
      return {
        outcome: 'No Hydrolysis Reaction',
        color: 'text-rose-400',
        visualEffect: 'No chemical change.',
        product: 'Monomers remain unchanged',
        explanation: 'Monomers like glucose and fructose cannot be hydrolyzed further into simpler sugars.',
        trap: 'Monosaccharides are the simplest carbohydrate units.'
      };
    }

    // Tollens & Fehling Tests (Reducing Sugar checks)
    if (reagent === 'tollens') {
      const isReducing = substrate === 'glucose' || substrate === 'fructose' || substrate === 'lactose';
      if (isReducing) {
        return {
          outcome: 'Silver Mirror Formed (Positive)',
          color: 'text-emerald-400',
          visualEffect: 'A shiny silver layer deposits on the walls of the tube.',
          product: 'Oxidized sugar carboxylate + Metallic Silver (Ag)↓',
          explanation: 'Reducing sugars possess an active hemiacetal/hemiketal form which opens in solution to reveal a free aldehyde/ketone group. This carbonyl reduces Tollens\' ammoniacal silver reagent to metallic silver.',
          trap: 'Fructose is a ketose but still reduces Tollens\' reagent because under basic conditions of the test, it undergoes Lobry de Bruyn-Alberda van Ekenstein isomerisation to glucose and mannose!'
        };
      } else {
        return {
          outcome: 'No Reaction / Negative Test',
          color: 'text-rose-400',
          visualEffect: 'Solution remains clear and colorless.',
          product: 'None',
          explanation: 'Sucrose and starch are non-reducing. In sucrose, both anomeric carbons (C1 of glucose, C2 of fructose) are tied up in the glycosidic bond and cannot open up to form a carbonyl group.',
          trap: 'This clearly distinguishes Sucrose (non-reducing) from Lactose and Maltose (reducing).'
        };
      }
    }

    if (reagent === 'fehling') {
      const isReducing = substrate === 'glucose' || substrate === 'fructose' || substrate === 'lactose';
      if (isReducing) {
        return {
          outcome: 'Brick-Red Precipitate (Positive)',
          color: 'text-emerald-400',
          visualEffect: 'Blue solution forms a cloudy green suspension which deposits a red-brown cuprous oxide precipitate.',
          product: 'Oxidized sugar + Cuprous Oxide (Cu₂O)↓',
          explanation: 'The open-chain formyl group of reducing sugars reduces alkaline copper complex to cuprous oxide.',
          trap: 'Fructose reduces Fehling\'s solution due to base-catalyzed isomerisation (keto-enol tautomerism) yielding aldose intermediates.'
        };
      } else {
        return {
          outcome: 'No Reaction / Negative Test',
          color: 'text-rose-400',
          visualEffect: 'Solution remains clear blue.',
          product: 'None',
          explanation: 'Non-reducing sugars lack free hemiacetal groups and cannot reduce copper (II) ions.',
          trap: 'Sucrose fails both Tollens and Fehling tests because it is a non-reducing disaccharide.'
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
            <Tag color="cyan">Unit 14</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="violet">Biomolecules</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Biomolecules: <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Complete Revision</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Complete revision framework for carbohydrates, proteins, enzymes, vitamins, nucleic acids, and hormones. Master D/L configurations, Michaelis-Menten kinetics, Watson-Crick double helix replication, and peptide configurations for IAT.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: CARBOHYDRATES & HAWORTH ────────────────────────────── */}
      <Collapsible title="1 · Carbohydrates: Structures & Reducing Sugars" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          <p className="leading-relaxed">
            Carbohydrates are optically active polyhydroxy aldehydes or ketones, or compounds that yield them on hydrolysis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Glucose & Fructose Rings */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider font-display">Glucose & Fructose Rings</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Glucose Pyranose:</strong> Open-chain glucose has 1 aldehyde and 5 hydroxyls. In solution, it exists predominantly in cyclic hemiacetal pyranose forms (<InlineMath math="\alpha" />- and <InlineMath math="\beta" />-D-glucopyranose).
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Fructose Furanose:</strong> Fructose exists predominantly as a 5-membered cyclic furanose ring in solution, though pyranose forms also exist.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">&bull;</span>
                  <div>
                    <strong>Mutarotation:</strong> <InlineMath math="\alpha" />-D-glucopyranose (<InlineMath math="+112^\circ" />) and <InlineMath math="\beta" />-D-glucopyranose (<InlineMath math="+19^\circ" />) interconvert via open-chain form in solution to yield an equilibrium value of <InlineMath math="+52.7^\circ" />.
                  </div>
                </li>
              </ul>
            </div>

            {/* Config & Linkages */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider font-display">D/L Config & Linkages</span>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>D & L Configurations:</strong> Determined relative to D-glyceraldehyde (based on configuration at the highest-numbered chiral carbon - C5 in glucose). Optical rotation direction is unrelated.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">&bull;</span>
                  <div>
                    <strong>Reducing Sugars:</strong> All monosaccharides are reducing sugars because they can form an open-chain carbonyl form in solution. Sucrose is non-reducing because both anomeric carbons participate in the glycosidic bond.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <SectionBanner label="Polysaccharides Functional Roles" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-400 block uppercase text-[11px]">Starch</span>
              <p className="text-white/60 text-xs">
                Storage polysaccharide in plants. Amylose (water-soluble, linear, <InlineMath math="\alpha" />-1,4 links) + Amylopectin (insoluble, branched, <InlineMath math="\alpha" />-1,4 and <InlineMath math="\alpha" />-1,6 links).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-emerald-400 block uppercase text-[11px]">Glycogen</span>
              <p className="text-white/60 text-xs">
                Storage polysaccharide in animals. Highly branched polymer of glucose stored in liver and muscle tissues.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-1">
              <span className="font-bold text-rose-400 block uppercase text-[11px]">Cellulose</span>
              <p className="text-white/60 text-xs">
                Structural component in plant cell walls. Linear polymer of glucose with <InlineMath math="\beta" />-1,4-glycosidic linkages (indigestible by humans).
              </p>
            </div>
          </div>

          <ProTip>
            {"**Anomers vs Epimers:** Anomers differ only at the hemiacetal/hemiketal carbon (C1 in cyclic glucose). Epimers differ at any other single chiral carbon (e.g. D-glucose and D-galactose differ at C4)."}
          </ProTip>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: PROTEINS, ZWITTERION & SEQUENCING ──────────────────── */}
      <Collapsible title="2 · Proteins: Zwitterions, R-Groups & Peptide bonds" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="1. Amino Acid Classifications & Zwitterion pH dependence" color="amber" />
          <p className="leading-relaxed">
            At isoelectric point (pI), amino acids exist as dipolar <strong className="text-white">Zwitterions</strong> (<InlineMath math="\text{H}_3\text{N}^+\text{-CH(R)-COO}^-" />).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Amino Acid R-Group Classifications</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Acidic:</strong> Aspartic Acid (Asp), Glutamic Acid (Glu).</li>
                <li><strong>Basic:</strong> Lysine (Lys), Arginine (Arg), Histidine (His).</li>
                <li><strong>Aromatic:</strong> Phenylalanine (Phe), Tyrosine (Tyr), Tryptophan (Trp).</li>
                <li><strong>Sulfur-containing:</strong> Cysteine (Cys), Methionine (Met).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Zwitterion pH Dependence</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>pH &lt; pI (Acidic):</strong> The amine gets protonated; exists as cationic form.</li>
                <li><strong>pH = pI (Isoelectric):</strong> Net neutral dipolar zwitterion form. Minimal solubility.</li>
                <li><strong>pH &gt; pI (Basic):</strong> The carboxyl group loses proton; exists as anionic form.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Peptide Bond & Sequencing Methods" color="amber" />
          <p className="leading-relaxed">
            A peptide bond is a planar amide linkage (<InlineMath math="\text{-CONH-}" />) formed between the carboxyl group of one amino acid and the amino group of another. It has partial double-bond character due to resonance stabilization, favoring the <strong className="text-white">trans configuration</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">N-Terminal Identification (Sanger\'s Reagent)</span>
              Reaction with 1-fluoro-2,4-dinitrobenzene (DNFB / FDNB) tag-labeling of the N-terminal amino group allows identification upon complete hydrolysis.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Sequence Analysis (Edman Degradation)</span>
              Reacts with phenylisothiocyanate (PITC) to selectively cleave and identify the N-terminal residue sequentially without destroying the remainder of the peptide chain.
            </div>
          </div>

          <SectionBanner label="3. Structure Levels & Denaturation" color="amber" />
          <ul className="list-disc pl-4 space-y-2 text-white/60">
            <li><strong>Primary:</strong> Linear amino acid sequence. (Peptide bonds).</li>
            <li><strong>Secondary:</strong> hydrogen-bonded conformation (alpha-helix or beta-pleated sheets).</li>
            <li><strong>Tertiary:</strong> Overall 3D folding (disulfide bonds, salt bridges, hydrophobic interactions). Active form.</li>
            <li><strong>Denaturation:</strong> Disruption of secondary and tertiary structures by heat/pH changes. <strong className="text-white">Crucial Trap:</strong> Peptide bonds are NOT broken; primary structure remains intact.</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: ENZYMES: KINETICS & INHIBITIONS ────────────────────── */}
      <Collapsible title="3 · Enzymes: Kinetics, Inhibitions & Classifications" icon={<Activity className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <SectionBanner label="1. Michaelis-Menten Enzyme Kinetics" color="violet" />
          <p className="leading-relaxed">
            Enzymes lower reaction activation barriers. The reaction rate varies with substrate concentration according to the Michaelis-Menten relation:
          </p>
          <DisplayMath math="v = \frac{V_{\max} [S]}{K_m + [S]}" />
          <p className="leading-relaxed">
            Where <InlineMath math="K_m" /> is the Michaelis constant (the substrate concentration at which reaction rate is exactly half <InlineMath math="V_{\max}" />). <strong className="text-white">Low Km indicates high affinity</strong> of enzyme for substrate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Lineweaver-Burk Double Reciprocal Plot</span>
              Plotting <InlineMath math="1/v" /> vs <InlineMath math="1/[S]" /> gives a linear relation used to determine kinetics parameters:
              <DisplayMath math="\frac{1}{v} = \frac{K_m}{V_{\max}[S]} + \frac{1}{V_{\max}}" />
              Y-intercept represents <InlineMath math="1/V_{\max}" />, X-intercept is <InlineMath math="-1/K_m" />.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">Cofactors & Coenzymes</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Cofactor:</strong> Non-protein chemical component required for catalytic activity.</li>
                <li><strong>Coenzyme:</strong> Organic cofactor (e.g. NAD⁺, FAD, Coenzyme A).</li>
                <li><strong>Metal ions:</strong> Inorganic cofactors (e.g. <InlineMath math="\text{Zn}^{2+}" /> in carbonic anhydrase).</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Enzyme Inhibition Profiles" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Inhibition Type</th>
                  <th className="p-3">Active Site Competition</th>
                  <th className="p-3 text-cyan-400">Vmax Value Effect</th>
                  <th className="p-3 text-rose-400">Km Value Effect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Competitive</td>
                  <td className="p-3">Inhibitor binds active site directly</td>
                  <td className="p-3 text-cyan-400 font-semibold">Unchanged</td>
                  <td className="p-3 text-rose-400 font-semibold">Increases (lower affinity)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Non-competitive</td>
                  <td className="p-3">Inhibitor binds allosteric site</td>
                  <td className="p-3 text-cyan-400 font-semibold">Decreases</td>
                  <td className="p-3 text-rose-400 font-semibold">Unchanged</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Uncompetitive</td>
                  <td className="p-3">Inhibitor binds only to ES complex</td>
                  <td className="p-3 text-cyan-400 font-semibold">Decreases</td>
                  <td className="p-3 text-rose-400 font-semibold">Decreases</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Enzyme Classification Groups (EC Nomenclature)" color="violet" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs text-white/60">
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>1. Oxidoreductases:</strong> Catalyze redox reactions (dehydrogenases).
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>2. Transferases:</strong> Catalyze transfer of functional groups (kinases).
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>3. Hydrolases:</strong> Catalyze hydrolytic cleavage (amylases, lipases).
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>4. Lyases:</strong> Catalyze non-hydrolytic addition/elimination.
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>5. Isomerases:</strong> Catalyze structural rearrangement.
            </div>
            <div className="p-3 bg-black/35 rounded-lg border border-white/5">
              <strong>6. Ligases:</strong> Catalyze joining of molecules using ATP (DNA ligase).
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: VITAMINS ───────────────────────────────────────────── */}
      <Collapsible title="4 · Vitamins classification & Deficiencies" icon={<TrendingUp className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-emerald-400 block uppercase text-xs">Fat-Soluble (stored in liver)</span>
              Vitamins A, D, E, K (ADEK). Excreted slowly.
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Water-Soluble (excreted)</span>
              Vitamin B-complex & Vitamin C. Must be supplied regularly. Exception: Vitamin B₁₂ can be stored.
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Vitamin Name</th>
                  <th className="p-3">Chemical Name</th>
                  <th className="p-3 text-cyan-400">Deficiency Diseases</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Vitamin A</td>
                  <td className="p-3">Retinol</td>
                  <td className="p-3 text-cyan-400">Xerophthalmia, Night blindness</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Vitamin B₁</td>
                  <td className="p-3">Thiamine</td>
                  <td className="p-3 text-cyan-400">Beri-beri</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Vitamin B₁₂</td>
                  <td className="p-3">Cyanocobalamin</td>
                  <td className="p-3 text-cyan-400">Pernicious anemia</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Vitamin C</td>
                  <td className="p-3">Ascorbic Acid</td>
                  <td className="p-3 text-cyan-400">Scurvy (bleeding gums)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Vitamin D</td>
                  <td className="p-3">Calciferol</td>
                  <td className="p-3 text-cyan-400">Rickets</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Vitamin E</td>
                  <td className="p-3">Tocopherol</td>
                  <td className="p-3 text-cyan-400">RBC fragility, muscular weakness</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Vitamin K</td>
                  <td className="p-3">Phylloquinone</td>
                  <td className="p-3 text-cyan-400">Delayed blood clotting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 5: NUCLEIC ACIDS & CENTRAL DOGMA ──────────────────────── */}
      <Collapsible title="5 · Nucleic Acids: Base Pairing & Replication" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70 font-sans">
          <SectionBanner label="1. Watson-Crick DNA Helix & Chargaff's rules" color="violet" />
          <p className="leading-relaxed">
            DNA exists as a double-stranded antiparallel helix. Complementary hydrogen bonds hold the strands together:
          </p>
          <div className="p-3 bg-black/45 rounded-xl font-mono text-cyan-300 text-xs text-center">
            {"A = T (2 Hydrogen Bonds) | G ≡ C (3 Hydrogen Bonds)"}
          </div>
          <p className="leading-relaxed">
            <strong>Chargaff\'s Rules:</strong> In any double-stranded DNA, the ratio of Adenine to Thymine and Guanine to Cytosine is stoichiometric:
            <DisplayMath math="A+G = T+C \implies \text{Purines} = \text{Pyrimidines}" />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-cyan-400 block uppercase text-xs">Nucleoside vs. Nucleotide</span>
              <ul className="list-disc pl-4 space-y-1 text-white/60">
                <li><strong>Nucleoside:</strong> Sugar + Nitrogenous Base (C1\' linkage).</li>
                <li><strong>Nucleotide:</strong> Sugar + Base + Phosphate (C5\' ester linkage).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-black/35 border border-white/5 space-y-2">
              <span className="font-bold text-rose-400 block uppercase text-xs">DNA Replication</span>
              Semi-conservative process (proved by Meselson-Stahl). Unwinding by helicase creates a replication fork. DNA Polymerase synthesizes leading strand continuously, and lagging strand discontinuously as **Okazaki fragments**.
            </div>
          </div>

          <SectionBanner label="2. Central Dogma: Transcription & Translation" color="violet" />
          <ul className="list-disc pl-4 space-y-2 text-white/60">
            <li>
              <strong>Transcription:</strong> Synthesis of mRNA from DNA template strand catalyzed by RNA Polymerase.
            </li>
            <li>
              <strong>Translation:</strong> Ribosomes translate triplet mRNA codons. Transfer RNAs (tRNA cloverleaf loop) bring specific amino acids to the polypeptide chain.
            </li>
            <li>
              <strong>Genetic Code:</strong> Triplet, non-overlapping, degenerate, and universal.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Start Codon:</strong> AUG (codes for Methionine).</li>
                <li><strong>Stop Codons:</strong> UAA, UAG, UGA (do not code for any amino acid).</li>
              </ul>
            </li>
            <li>
              <strong>Mutations:</strong> Point mutation (single base change - e.g. Sickle Cell Anemia), Frameshift (insertion/deletion changes entire downstream reading frame).
            </li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 6: HORMONES (NEW SECTION) ────────────────────────────── */}
      <Collapsible title="6 · Hormones: Chemical Classes & Mechanisms" icon={<Workflow className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] text-white/70">
          <p className="leading-relaxed">
            Hormones are intercellular messengers secreted by endocrine glands directly into the blood stream.
          </p>

          <SectionBanner label="1. Chemical Classifications" color="rose" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Class</th>
                  <th className="p-3">Hormone Examples</th>
                  <th className="p-3 text-cyan-400">Mechanism of Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Peptides / Proteins</td>
                  <td className="p-3">Insulin, Glucagon, Oxytocin, ADH (Vasopressin)</td>
                  <td className="p-3 text-cyan-400">Water-soluble. Bind membrane-bound receptors, triggering secondary messengers (cAMP, IP₃).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Steroids (Lipid-derived)</td>
                  <td className="p-3">Estrogens, Progesterone, Testosterone, Cortisol</td>
                  <td className="p-3 text-cyan-400">Lipid-soluble. Cross cell membrane to bind intracellular nuclear receptors, directly altering gene transcription.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Amino Acid Derivatives</td>
                  <td className="p-3">Thyroxine (from Tyrosine), Epinephrine (Adrenaline)</td>
                  <td className="p-3 text-cyan-400">Thyroxine binds intracellularly; Epinephrine binds membrane receptors.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 7: INTERACTIVE BIOMOLECULES SIMULATOR ────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            7 · Carbonyl & Protein Identification Lab & Reaction Predictor
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select a biomolecule substrate and a chemical reagent/condition to test reducing sugars, starch helix inclusion, peptide links, or disaccharide inversion outcomes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Substrate Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Biomolecule Substrate</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSubstrate('glucose')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'glucose' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  D-Glucose (Reducing Sugar)
                </button>
                <button 
                  onClick={() => setSubstrate('fructose')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'fructose' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  D-Fructose (Ketose Sugar)
                </button>
                <button 
                  onClick={() => setSubstrate('sucrose')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'sucrose' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Sucrose (Non-Reducing Sugar)
                </button>
                <button 
                  onClick={() => setSubstrate('lactose')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'lactose' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Lactose (Reducing Disaccharide)
                </button>
                <button 
                  onClick={() => setSubstrate('starch')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'starch' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Starch (Polysaccharide)
                </button>
                <button 
                  onClick={() => setSubstrate('protein')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${substrate === 'protein' ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Egg Albumin (Protein)
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select Reagent / Test Method</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'tollens', label: 'Tollens\' Reagent (Silver Mirror)' },
                  { id: 'fehling', label: 'Fehling\'s Test (Cu₂O Red ppt)' },
                  { id: 'iodine', label: 'Iodine Solution (Starch Blue)' },
                  { id: 'biuret', label: 'Biuret Test (Peptide CuSO₄/NaOH)' },
                  { id: 'ninhydrin', label: 'Ninhydrin Reagent (Amino acid check)' },
                  { id: 'acid_hydrolysis', label: 'Acid Hydrolysis (H⁺ / Heat)' }
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

      {/* ─── SECTION 8: SOLVED PROBLEMS ────────────────────────────────────── */}
      <Collapsible title="8 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Michaelis-Menten & Affinity</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An enzyme (A) has Km = 2.0 × 10⁻⁵ M for a substrate, while enzyme (B) has Km = 5.0 × 10⁻⁴ M. Which enzyme has a higher affinity for the substrate?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-sans text-[13px] text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Km is the Michaelis constant, representing the substrate concentration at which half maximum velocity is reached."}</div>
              <div>{"2. A lower Km indicates that the enzyme reaches its half-maximum rate at a lower substrate concentration, showing a higher affinity."}</div>
              <div>{"3. Comparing 2.0 × 10⁻⁵ M (Enzyme A) with 5.0 × 10⁻⁴ M (Enzyme B):"}</div>
              <div className="font-mono text-[11px] text-emerald-300">{"Km (A) < Km (B)"}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Enzyme A has a higher affinity.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Chargaff\'s Rule Calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A double-stranded DNA sample contains 20% Cytosine. Calculate the percentages of Adenine, Thymine, and Guanine in the sample."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-sans text-[13px] text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. According to Chargaff\'s rules, double-stranded DNA contains equimolar counts of complementary bases: G = C and A = T."}</div>
              <div>{"2. Given C = 20%, it follows that G = 20%."}</div>
              <div>{"3. Total G + C = 40%."}</div>
              <div>{"4. Therefore, total A + T = 100% - 40% = 60%."}</div>
              <div>{"5. Since A = T, we have A = 30% and T = 30%."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: G = 20%, A = 30%, T = 30%</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Competitive vs Non-competitive inhibition</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"How can you experimentally distinguish between competitive and non-competitive inhibition of an enzyme?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-sans text-[13px] text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Measure the reaction velocity (v) over varying substrate concentrations [S] in the presence of the inhibitor."}</div>
              <div>{"2. Plot a Lineweaver-Burk double reciprocal plot (1/v vs 1/[S])."}</div>
              <div>{"3. If competitive: Increasing substrate concentration outcompetes the inhibitor, so maximum velocity is unchanged (same Y-intercept) but Km increases (steeper slope, X-intercept shifts right)."}</div>
              <div>{"4. If non-competitive: Inhibitor binds allosterically, so maximum velocity decreases (higher Y-intercept) but Km remains unchanged (same X-intercept)."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: In competitive, Vmax is unchanged and Km increases. In non-competitive, Vmax decreases and Km is unchanged.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 9: PRACTICE MOCK TEST ─────────────────────────────────── */}
      <Collapsible title="9 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Biomolecules, Kinetics, and Hormones with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following is a non-reducing sugar?',
                a: 'Glucose',
                b: 'Fructose',
                c: 'Maltose',
                d: 'Sucrose',
                ans: 'Correct Answer: D. Sucrose is non-reducing because both of its anomeric carbons (C1 of Glucose and C2 of Fructose) are involved in forming the glycosidic bond, preventing the sugar from opening into free carbonyl forms.'
              },
              {
                q: 'During competitive inhibition of an enzyme, how are Km and Vmax affected?',
                a: 'Vmax decreases, Km is unchanged',
                b: 'Vmax is unchanged, Km increases',
                c: 'Both Vmax and Km decrease',
                d: 'Both Vmax and Km increase',
                ans: 'Correct Answer: B. Competitive inhibitors compete for the active site. Excess substrate can overcome the inhibition, so Vmax is unchanged. However, more substrate is needed to reach half Vmax, meaning Km increases.'
              },
              {
                q: 'A double-stranded DNA segment contains 35% Adenine. What is the percentage of Guanine in this segment?',
                a: '15%',
                b: '35%',
                c: '30%',
                d: '70%',
                ans: 'Correct Answer: A. By Chargaff\'s rules: A = T = 35%. Total A + T = 70%. The remaining G + C must equal 30%. Since G = C, G = 15%.'
              },
              {
                q: 'Which of the following is a lipid-soluble steroid hormone?',
                a: 'Insulin',
                b: 'Thyroxine',
                c: 'Glucagon',
                d: 'Estrogen',
                ans: 'Correct Answer: D. Estrogen is a steroid hormone derived from cholesterol. Peptide hormones like insulin and glucagon are water-soluble, and thyroxine is an amino-acid derivative.'
              },
              {
                q: 'Which peptide sequencing method involves sequential cleavage of N-terminal amino acids using phenylisothiocyanate (PITC)?',
                a: 'Sanger\'s Method',
                b: 'Edman Degradation',
                c: 'Trypsin Cleavage',
                d: 'CNBr Hydrolysis',
                ans: 'Correct Answer: B. Edman degradation utilizes phenylisothiocyanate (PITC) to sequentially remove and identify N-terminal amino acids one-by-one without digesting the rest of the peptide.'
              },
              {
                q: 'What is the start codon in the genetic code, and which amino acid does it represent?',
                a: 'AUG (Methionine)',
                b: 'UAA (Stop)',
                c: 'UAG (Stop)',
                d: 'UGA (Tryptophan)',
                ans: 'Correct Answer: A. AUG is the start codon, representing Methionine. UAA, UAG, and UGA are stop codons.'
              },
              {
                q: 'The deficiency of Vitamin B₁₂ (Cyanocobalamin) causes which disease?',
                a: 'Beri-beri',
                b: 'Scurvy',
                c: 'Rickets',
                d: 'Pernicious anemia',
                ans: 'Correct Answer: D. Deficiency of Vitamin B₁₂ leads to pernicious anemia (malformed RBCs). Beri-beri is caused by B₁ deficiency, Scurvy by C, and Rickets by D.'
              },
              {
                q: 'The peptide bond linkage is planar due to:',
                a: 'Hydrophobic forces',
                b: 'Resonance and partial double bond character of the C-N bond',
                c: 'Steric clashes between side chains',
                d: 'Intramolecular hydrogen bonding',
                ans: 'Correct Answer: B. The peptide bond has resonance structures showing partial double-bond character between C and N, rendering it planar and rigid.'
              },
              {
                q: 'Which of the following is an essential basic amino acid?',
                a: 'Glutamic Acid',
                b: 'Alanine',
                c: 'Lysine',
                d: 'Proline',
                ans: 'Correct Answer: C. Lysine is an essential amino acid and contains a basic side chain (containing an additional amino group).'
              },
              {
                q: 'Which enzyme classification EC group catalyzes the joining of two molecules using ATP hydrolysis?',
                a: 'Hydrolases',
                b: 'Isomerases',
                c: 'Ligases',
                d: 'Transferases',
                ans: 'Correct Answer: C. Ligases (Group 6) catalyze the condensation and joining of two substrate molecules coupled with ATP cleavage.'
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
        <span className="text-[11px] text-white/30 font-mono">Biomolecules · Unit 14</span>
      </div>

    </div>
  );
}
