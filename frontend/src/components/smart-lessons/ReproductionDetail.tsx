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

export default function ReproductionDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'ovule_sac' | 'testis_tubule' | 'ovarian_follicle' | 'contra_device' | 'art_embryo'>('ovule_sac');
  const [treatment, setTreatment] = useState<'triple_fusion' | 'block_gonado' | 'lh_surge' | 'copper_ions' | 'cleavage_div'>('triple_fusion');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    if (treatment === 'triple_fusion' && specimen === 'ovule_sac') {
      return {
        outcome: 'Double Fertilization / PEN Formation (3n)',
        color: 'text-cyan-400',
        visualEffect: 'Syngamy forms a 2n zygote; Triple Fusion forms the 3n Primary Endosperm Nucleus (PEN).',
        product: 'Zygote (2n), Primary Endosperm Cell (3n)',
        explanation: 'In angiosperms, one male gamete fertilizes the egg (syngamy ➔ 2n zygote), while the second male gamete fuses with two polar nuclei in the central cell (triple fusion ➔ 3n PEN). This double fertilization is unique to flowering plants.',
        trap: 'Ploidy levels: Zygote (2n), PEN (3n), Nucellus (2n), Antipodals (n). The endosperm development starts first to provide nutrition before embryo growth.'
      };
    }

    if (treatment === 'block_gonado' && specimen === 'testis_tubule') {
      return {
        outcome: 'Spermatogenesis Arrest / Leydig Cell Inactivation',
        color: 'text-rose-400',
        visualEffect: 'Seminiferous tubule activity drops; spermatids fail to transform into mature spermatozoa.',
        product: 'Depleted testosterone levels; spermiogenesis blocked',
        explanation: 'FSH acts on Sertoli cells to support spermatogenesis and release ABP. LH acts on Leydig cells to stimulate androgen (testosterone) secretion. Blocking gonadotropins halts both spermatogenesis and Leydig cell steroidogenesis.',
        trap: 'Distinguish spermiogenesis (spermatid to sperm) from spermiation (sperm release from Sertoli cells into the tubule lumen).'
      };
    }

    if (treatment === 'lh_surge' && specimen === 'ovarian_follicle') {
      return {
        outcome: 'Ovulation / Rupture of Graafian Follicle',
        color: 'text-emerald-400',
        visualEffect: 'Graafian follicle ruptures, releasing the secondary oocyte surrounded by zona pellucida.',
        product: 'Secondary oocyte (arrested in Metaphase II), Corpus Luteum',
        explanation: 'A mid-cycle LH surge (around day 14) induces the rupture of the mature Graafian follicle, releasing the secondary oocyte. The remaining follicular cells transform into the progesterone-secreting corpus luteum.',
        trap: 'A female is born with all primary oocytes arrested at Prophase I (diplotene). Meiosis II is only completed upon fertilization by sperm.'
      };
    }

    if (treatment === 'copper_ions' && specimen === 'contra_device') {
      return {
        outcome: 'Sperm Motility Suppression / Phagocytosis Active',
        color: 'text-amber-400',
        visualEffect: 'Sperm motility drops to zero within the uterine cavity; macrophage activity increases.',
        product: 'Inactivated sperms; failed fertilization',
        explanation: 'Copper-releasing IUDs (e.g., CuT, Cu7, Multiload 375) release Cu²⁺ ions which suppress sperm motility and fertilizing capacity, while promoting phagocytosis of sperm within the uterus.',
        trap: 'Copper IUDs suppress motility, whereas hormonal IUDs (LNG-20) make the endometrium unsuitable for implantation and thicken cervical mucus.'
      };
    }

    if (treatment === 'cleavage_div' && specimen === 'art_embryo') {
      return {
        outcome: 'Blastomer Division / ART Route Decision',
        color: 'text-violet-400',
        visualEffect: 'Zygote undergoes rapid mitotic cleavages into 2, 4, 8, and 16 blastomeres.',
        product: 'Morula (8-16 cells), Blastocyst (implantation stage)',
        explanation: 'If the embryo contains up to 8 blastomeres, it is transferred into the fallopian tube (ZIFT). If it exceeds 8 blastomeres, it is transferred directly into the uterus (IUT).',
        trap: 'Be absolutely clear: ZIFT is transfer to the fallopian tube (<= 8 cells), whereas IUT is intrauterine transfer (> 8 cells).'
      };
    }

    return {
      outcome: 'No specific diagnostic reaction occurred.',
      color: 'text-zinc-400',
      visualEffect: 'Specimen remains unchanged.',
      product: 'None',
      explanation: 'No unique physiological or metabolic marker was triggered by this combination.',
      trap: 'Try matching the correct specimen with its physiological trigger.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white repro-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .repro-chapter .text-xs { font-size: 13px !important; }
        .repro-chapter .text-sm { font-size: 15px !important; }
        .repro-chapter .text-base { font-size: 17.5px !important; }
        .repro-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .repro-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .repro-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .repro-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .repro-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 6</Tag>
            <Tag color="rose">IAT Core Framework</Tag>
            <Tag color="violet">Reproduction</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Reproduction: <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Angiosperms & Human Systems</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Syllabus-aligned comprehensive study system detailing microsporogenesis, double fertilization, hormonal cycles, spermatogenesis, oogenesis, contraceptive mechanisms, and Assisted Reproductive Technologies (ART).
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: SEXUAL REPRODUCTION IN FLOWING PLANTS ──────────────── */}
      <Collapsible title="1 · Sexual Reproduction in Flowering Plants" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Flower Structure & Placentations" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Flower Whorls:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Calyx:</strong> Outer whorl of sepals protecting the flower in the bud stage.</li>
                <li><strong>Corolla:</strong> Whorl of petals that attracts pollinators via scent and pigments.</li>
                <li><strong>Androecium:</strong> Male reproductive organ composed of stamens, each containing a distal anther (typically bilobed and dithecous) and a proximal stalk (filament).</li>
                <li><strong>Gynoecium:</strong> Female reproductive organ composed of carpels/pistils. Each carpel has a terminal receptive stigma, an elongated style, and a basal ovary containing ovules.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 1: Flower LS */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 240" className="w-full max-w-md bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="25" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">FLOWER LONGITUDINAL SECTION (L.S.)</text>
              {/* Petals */}
              <path d="M 120 180 C 60 140 80 80 150 110" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
              <path d="M 280 180 C 340 140 320 80 250 110" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
              {/* Sepals */}
              <path d="M 150 190 C 130 180 140 160 160 175" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M 250 190 C 270 180 260 160 240 175" fill="none" stroke="#10b981" strokeWidth="2" />
              {/* Thalamus */}
              <path d="M 170 190 Q 200 170 230 190 L 210 220 L 190 220 Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              {/* Pistil */}
              <path d="M 195 180 Q 185 140 195 100 L 205 100 Q 215 140 205 180 Z" fill="#0284c7" fillOpacity="0.3" stroke="#0284c7" strokeWidth="2" />
              <circle cx="200" cy="95" r="7" fill="#0ea5e9" />
              {/* Ovules inside Ovary */}
              <circle cx="200" cy="155" r="5" fill="#f59e0b" />
              <circle cx="200" cy="168" r="5" fill="#f59e0b" />
              {/* Stamens */}
              <path d="M 175 185 Q 165 130 180 110" fill="none" stroke="#eab308" strokeWidth="1.5" />
              <ellipse cx="180" cy="107" rx="5" ry="3" fill="#eab308" />
              <path d="M 225 185 Q 235 130 220 110" fill="none" stroke="#eab308" strokeWidth="1.5" />
              <ellipse cx="220" cy="107" rx="5" ry="3" fill="#eab308" />
              {/* Labels */}
              <text x="70" y="110" fill="#f43f5e" fontSize="9">Petal (Corolla)</text>
              <text x="110" y="210" fill="#10b981" fontSize="9">Sepal (Calyx)</text>
              <text x="310" y="110" fill="#eab308" fontSize="9">Stamen (Androecium)</text>
              <text x="235" y="98" fill="#0ea5e9" fontSize="9">Stigma / Pistil</text>
              <text x="235" y="160" fill="#f59e0b" fontSize="9">Ovary / Ovules</text>
            </svg>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Placentation Type</th>
                  <th className="p-2.5 text-cyan-400">Description</th>
                  <th className="p-2.5 text-emerald-400">Common Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">Marginal</td>
                  <td className="p-2.5">Placenta forms a ridge along the ventral suture of the ovary.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Pea (Pisum sativum)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Axile</td>
                  <td className="p-2.5">Placenta is axial and the ovules are attached to it in a multilocular ovary.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Tomato, Lemon, China rose</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Parietal</td>
                  <td className="p-2.5">Ovules develop on the inner wall of the ovary or peripheral part.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Mustard, Argemone</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Free Central</td>
                  <td className="p-2.5">Ovules are borne on a central axis and septa are absent.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Dianthus, Primrose</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Basal</td>
                  <td className="p-2.5">Placenta develops at the base of the ovary and a single ovule is attached.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Sunflower, Marigold</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="2. Microsporogenesis & Pollen Shedding Stages" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Microsporogenesis Steps:</strong> Cells of the sporogenous tissue undergo meiotic divisions to form microspore tetrads.
              <p className="font-mono mt-1 text-[11px] bg-black/30 p-2 rounded border border-white/5">
                Pollen Mother Cell (PMC, 2n) ➔ [Meiosis] ➔ Microspore Tetrad (n) ➔ [Dehydration & Dissociation] ➔ Microspores (n) ➔ Pollen Grains (n)
              </p>
            </li>
            <li><strong>Pollen Grain Wall Structure:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Exine:</strong> Hard outer layer made of <strong className="text-emerald-400">sporopollenin</strong>, a highly resistant organic material that withstands high temperatures, strong acids, and alkalis. No enzyme is currently known to degrade sporopollenin. It features <strong className="text-emerald-400">germ pores</strong> where sporopollenin is absent, allowing pollen tube exit.</li>
                <li><strong>Intine:</strong> Thin, continuous inner wall composed of cellulose and pectin.</li>
              </ul>
            </li>
            <li><strong>Pollen Shedding Stages:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>2-Celled Stage (~60% of Angiosperms):</strong> Pollen is shed containing a larger **vegetative cell** (abundant food reserve) and a smaller **generative cell** (spindle-shaped, floats in vegetative cell cytoplasm).</li>
                <li><strong>3-Celled Stage (~40% of Angiosperms):</strong> The generative cell divides mitotically to produce two male gametes before the pollen grain is shed.</li>
              </ul>
            </li>
            <li><strong>Pollen Viability & Cryopreservation:</strong> Viability ranges from 30 minutes in rice and wheat to several months in Rosaceae, Leguminosae, and Solanaceae. Pollen grains can be stored for years in <strong className="text-emerald-400">liquid nitrogen</strong> at <InlineMath math="-196^\circ\text{C}" /> for crop breeding programs.</li>
          </ul>

          <SectionBanner label="3. Megasporogenesis & Anatropous Ovule Anatomy" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Anatropous Ovule (Inverted Ovule) Anatomy:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Funicle:</strong> Stalk attaching the ovule body to the placenta.</li>
                <li><strong>Hilum:</strong> Region representing the junction where the ovule body fuses with the funicle.</li>
                <li><strong>Integuments:</strong> Protective envelopes surrounding the nucellus.</li>
                <li><strong>Micropyle:</strong> Narrow opening at the tip where integuments are absent (micropylar pole). Entry point for the pollen tube.</li>
                <li><strong>Chalaza:</strong> Basal part of the ovule opposite the micropyle (chalazal pole).</li>
                <li><strong>Nucellus:</strong> Central parenchymatous tissue containing abundant reserve food, enclosing the embryo sac.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 2: Anatropous Ovule */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 250" className="w-full max-w-md bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">ANATROPOUS OVULE L.S.</text>
              {/* Outer shape inverted */}
              <path d="M 210 50 C 290 50 310 180 230 200 L 210 200 C 190 200 170 180 170 130 C 170 90 190 50 210 50 Z" fill="none" stroke="#a78bfa" strokeWidth="2" />
              {/* Inner Integument */}
              <path d="M 210 65 C 270 65 285 165 225 185" fill="none" stroke="#e9d5ff" strokeWidth="1.5" />
              {/* Embryo Sac */}
              <ellipse cx="220" cy="125" rx="20" ry="40" fill="#3b0764" fillOpacity="0.5" stroke="#f472b6" strokeWidth="2" />
              {/* Funicle */}
              <path d="M 220 200 Q 140 220 120 180" fill="none" stroke="#22c55e" strokeWidth="2.5" />
              {/* Labels */}
              <text x="290" y="60" fill="#a78bfa" fontSize="9">Chalaza (Base)</text>
              <text x="270" y="195" fill="#a78bfa" fontSize="9">Micropyle (Tip)</text>
              <text x="140" y="125" fill="#f472b6" fontSize="9">Embryo Sac</text>
              <text x="100" y="210" fill="#22c55e" fontSize="9">Funicle (Stalk)</text>
              <text x="310" y="130" fill="#e9d5ff" fontSize="9">Integuments</text>
              
              {/* Hilum marker */}
              <circle cx="178" cy="201" r="3" fill="#ef4444" />
              <text x="125" y="235" fill="#ef4444" fontSize="9">Hilum (Junction)</text>
              <path d="M 125 225 L 172 203" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2" />
            </svg>
          </div>

          <SectionBanner label="4. The 7-Celled, 8-Nucleate Female Embryo Sac" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Embryo Sac Structure:</strong> In a typical Polygonum-type embryo sac, the mature structure contains 7 cells and 8 nuclei:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Antipodals (3):</strong> Group of haploid (n) cells at the chalazal end.</li>
                <li><strong>Synergids (2):</strong> Haploid (n) cells at the micropylar end. They contain a specialized <strong className="text-emerald-400">filiform apparatus</strong> (cellular finger-like projections) at their micropylar tip to guide the entry of the pollen tube.</li>
                <li><strong>Egg Cell (1):</strong> The haploid (n) female gamete situated between the synergids.</li>
                <li><strong>Central Cell (1):</strong> A large cell containing two polar nuclei, which typically fuse to form a secondary nucleus prior to double fertilisation.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 3: Embryo Sac */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 240" className="w-full max-w-md bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="25" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">FEMALE EMBRYO SAC (7-Celled, 8-Nucleate)</text>
              <rect x="140" y="40" width="120" height="180" rx="60" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="2" />
              
              {/* Antipodals at chalazal end (top) */}
              <circle cx="175" cy="70" r="8" fill="#a78bfa" />
              <circle cx="200" cy="65" r="8" fill="#a78bfa" />
              <circle cx="225" cy="70" r="8" fill="#a78bfa" />
              <text x="200" y="50" fill="#a78bfa" fontSize="8" textAnchor="middle">3 Antipodals (n)</text>
 
              {/* Central Cell Polar Nuclei */}
              <circle cx="192" cy="120" r="6" fill="#fb7185" />
              <circle cx="208" cy="120" r="6" fill="#fb7185" />
              <text x="200" y="140" fill="#fb7185" fontSize="8" textAnchor="middle">2 Polar Nuclei</text>
 
              {/* Egg Apparatus at micropylar end (bottom) */}
              <circle cx="200" cy="180" r="10" fill="#38bdf8" /> {/* Egg Cell */}
              <circle cx="175" cy="190" r="9" fill="#10b981" />  {/* Synergid */}
              <circle cx="225" cy="190" r="9" fill="#10b981" />  {/* Synergid */}
              
              {/* Filiform apparatus lines on synergids */}
              <path d="M 168 195 Q 175 188 182 195" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <path d="M 218 195 Q 225 188 232 195" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              
              <text x="200" y="165" fill="#38bdf8" fontSize="8" textAnchor="middle">Egg Cell (n)</text>
              <text x="140" y="195" fill="#10b981" fontSize="8" textAnchor="end">Synergids (n)</text>
              <text x="270" y="210" fill="#ffffff" fontSize="8">Filiform apparatus</text>
              <path d="M 268 208 L 230 196" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="2" />
            </svg>
          </div>

          <SectionBanner label="5. Pollination Types, Cleistogamy & Outbreeding Devices" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Autogamy & Geitonogamy vs. Xenogamy:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Autogamy:</strong> Self-pollination within the same flower.</li>
                <li><strong>Geitonogamy:</strong> Transfer of pollen grains from the anther to the stigma of another flower on the same plant. It is genetically similar to autogamy but functionally resembles cross-pollination because it requires a pollinating agent.</li>
                <li><strong>Xenogamy:</strong> Transfer of pollen grains to the stigma of a flower on a different plant, introducing genetic variation (true cross-pollination).</li>
              </ul>
            </li>
            <li><strong>Cleistogamy:</strong> Cleistogamous flowers (e.g., <strong className="text-emerald-400">Viola (common pansy), Oxalis, and Commelina</strong>) do not open. They are invariably autogamous, ensuring seed-set even in the complete absence of pollinators. Chasmogamous flowers of the same plants expose their anthers and stigma.</li>
            <li><strong>Outbreeding Devices:</strong> Mechanisms evolved by flowering plants to discourage self-pollination (inbreeding depression) and encourage cross-pollination:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Dichogamy:</strong> Pollen release and stigma receptivity are temporally separated (not synchronized).</li>
                <li><strong>Herkogamy:</strong> Spatial separation or physical positioning of the anther and stigma to prevent contact.</li>
                <li><strong>Self-Incompatibility:</strong> A genetic mechanism that prevents self-pollen (from the same flower or other flowers of the same plant) from fertilising the ovules by inhibiting pollen germination or pollen tube growth in the pistil.</li>
                <li><strong>Unisexuality:</strong> Production of unisexual flowers. In monoecious plants (e.g., castor, maize), autogamy is prevented but geitonogamy is not. In dioecious plants (e.g., papaya, date palm), both autogamy and geitonogamy are prevented.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="6. Pollen-Pistil Interaction & Artificial Hybridisation" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Pollen-Pistil Interaction:</strong> A dynamic chemical dialogue between the pistil and the pollen grain, leading to either compatibility recognition (germination) or incompatibility rejection.</li>
            <li><strong>Pollen Tube Entry Routes:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Porogamy:</strong> Pollen tube enters the ovule through the micropyle (most common).</li>
                <li><strong>Chalazogamy:</strong> Entry through the chalazal end (e.g., *Casuarina*).</li>
                <li><strong>Mesogamy:</strong> Entry through the integuments or funicle (e.g., *Cucurbita*).</li>
              </ul>
            </li>
            <li><strong>Artificial Hybridisation:</strong> Crop improvement technique involving controlled pollination:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Emasculation:</strong> Removal of anthers from bisexual female parent flower buds before dehiscence using forceps. Not required for unisexual female flowers.</li>
                <li><strong>Bagging:</strong> Emasculated flowers are covered with a bag (usually butter paper) to prevent contamination of the stigma by unwanted pollen. The bag is temporarily opened to dust desired pollen onto the receptive stigma, then rebagged.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="7. Double Fertilisation & Post-Fertilisation Events" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Double Fertilisation Mechanism (Angiosperms):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Syngamy:</strong> One haploid male gamete fuses with the haploid egg cell to produce a diploid ($2n$) zygote.</li>
                <li><strong>Triple Fusion:</strong> The second haploid male gamete fuses with the two polar nuclei in the central cell, producing a triploid ($3n$) Primary Endosperm Nucleus (PEN).</li>
              </ul>
            </li>
            <li><strong>Endosperm Development:</strong> Endosperm development precedes embryo development. The triploid endosperm cell divides repeatedly to form a nutritive tissue. In nuclear endosperm (e.g., coconut water), PEN undergoes free nuclear divisions; cellular endosperm (e.g., coconut white kernel) involves immediate cytokinesis.</li>
            <li><strong>Seed Categories:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Albuminous (Endospermic) Seeds:</strong> Retain a portion of endosperm in the mature seed (e.g., wheat, maize, barley, castor, sunflower).</li>
                <li><strong>Non-albuminous (Non-endospermic) Seeds:</strong> Endosperm is completely consumed by the developing embryo before seed maturation (e.g., pea, bean, groundnut).</li>
              </ul>
            </li>
            <li><strong>Perisperm:</strong> Persistent, residual nucellus that remains in the mature seed (e.g., black pepper and beet).</li>
          </ul>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Pre-Fertilisation Structure</th>
                  <th className="p-2.5 text-cyan-400">Post-Fertilisation Product</th>
                  <th className="p-2.5 text-emerald-400">Ploidy Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-mono">
                <tr>
                  <td className="p-2.5">Ovary</td>
                  <td className="p-2.5 text-cyan-400">Fruit</td>
                  <td className="p-2.5 text-emerald-400">2n</td>
                </tr>
                <tr>
                  <td className="p-2.5">Ovary Wall</td>
                  <td className="p-2.5 text-cyan-400">Pericarp (Fruit wall)</td>
                  <td className="p-2.5 text-emerald-400">2n</td>
                </tr>
                <tr>
                  <td className="p-2.5">Ovule</td>
                  <td className="p-2.5 text-cyan-400">Seed</td>
                  <td className="p-2.5 text-emerald-400">2n</td>
                </tr>
                <tr>
                  <td className="p-2.5">Integuments (Outer/Inner)</td>
                  <td className="p-2.5 text-cyan-400">Seed Coats (Testa/Tegmen)</td>
                  <td className="p-2.5 text-emerald-400">2n</td>
                </tr>
                <tr>
                  <td className="p-2.5">Zygote</td>
                  <td className="p-2.5 text-cyan-400">Embryo</td>
                  <td className="p-2.5 text-emerald-400">2n</td>
                </tr>
                <tr>
                  <td className="p-2.5">Primary Endosperm Cell (PEC/PEN)</td>
                  <td className="p-2.5 text-cyan-400">Endosperm</td>
                  <td className="p-2.5 text-emerald-400">3n</td>
                </tr>
                <tr>
                  <td className="p-2.5">Nucellus</td>
                  <td className="p-2.5 text-cyan-400">Perisperm (when persistent)</td>
                  <td className="p-2.5 text-emerald-400">2n</td>
                </tr>
                <tr>
                  <td className="p-2.5">Antipodals / Synergids</td>
                  <td className="p-2.5 text-cyan-400">Degenerate</td>
                  <td className="p-2.5 text-emerald-400">n</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="8. Embryogeny, Apomixis & Polyembryony" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Embryo Development Stages (Dicot):</strong>
              <p className="font-mono mt-1 text-[11px] bg-black/30 p-2 rounded border border-white/5">
                Zygote (2n) ➔ Proembryo ➔ Globular Embryo ➔ Heart-shaped Embryo ➔ Torpedo Stage ➔ Mature Embryo
              </p>
            </li>
            <li><strong>Embryo Structures:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Dicot Embryo:</strong> Comprises an embryonal axis and two cotyledons. The portion of the axis above the cotyledons is the **epicotyl** (terminates at plumule/shoot tip); the portion below is the **hypocotyl** (terminates at radicle/root tip, covered by root cap).</li>
                <li><strong>Monocot Embryo:</strong> Possesses a single cotyledon called the **scutellum** located laterally. The radicle and root cap are enclosed in an undifferentiated sheath called **coleorhiza**, while the shoot apex and leaf primordia are enclosed in a hollow foliar sheath called **coleoptile**.</li>
              </ul>
            </li>
            <li><strong>Apomixis vs. Parthenocarpy:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Apomixis:</strong> Form of asexual reproduction that mimics sexual reproduction, where viable seeds are produced without fertilisation (e.g., Asteraceae and grasses). Can involve diploid cell division in the nucellus.</li>
                <li><strong>Parthenocarpy:</strong> Development of fruit without fertilisation, resulting in seedless fruits (e.g., banana). Induced naturally or by growth regulators.</li>
              </ul>
            </li>
            <li><strong>Polyembryony:</strong> Presence of more than one embryo in a single seed (e.g., citrus varieties like lemon, orange, and mango). Often occurs when maternal nucellar cells surrounding the embryo sac start dividing, protrude into the sac, and develop into embryos.</li>
          </ul>

          {/* SVG 4: Embryo Development Stages */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 180" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="250" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">DICOT EMBRYOGENY STAGES</text>
              
              {/* Globular Stage */}
              <g transform="translate(40, 40)">
                <line x1="50" y1="90" x2="50" y2="40" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="50" cy="40" r="12" fill="#10b981" />
                <text x="50" y="115" fill="#ffffff" fontSize="8" textAnchor="middle">Globular Stage</text>
                <text x="65" y="42" fill="#10b981" fontSize="7">Embryo</text>
                <text x="25" y="70" fill="#94a3b8" fontSize="7">Suspensor</text>
              </g>

              {/* Heart-Shaped Stage */}
              <g transform="translate(200, 40)">
                <line x1="50" y1="90" x2="50" y2="50" stroke="#94a3b8" strokeWidth="2" />
                {/* Heart path */}
                <path d="M 50 55 C 35 30 25 50 50 65 C 75 50 65 30 50 55 Z" fill="#ec4899" stroke="#ffffff" strokeWidth="1" />
                <text x="50" y="115" fill="#ffffff" fontSize="8" textAnchor="middle">Heart-Shaped</text>
                <text x="75" y="45" fill="#ec4899" fontSize="7">Cotyledons</text>
              </g>

              {/* Mature Embryo */}
              <g transform="translate(360, 40)">
                {/* Suspensor */}
                <line x1="50" y1="90" x2="50" y2="70" stroke="#94a3b8" strokeWidth="2" />
                {/* Radicle axis and curved cotyledons */}
                <path d="M 50 70 L 50 45" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                <path d="M 50 45 C 30 40 35 15 45 25" fill="none" stroke="#22c55e" strokeWidth="3" />
                <path d="M 50 45 C 70 40 65 15 55 25" fill="none" stroke="#22c55e" strokeWidth="3" />
                <text x="50" y="115" fill="#ffffff" fontSize="8" textAnchor="middle">Mature Dicot</text>
                <text x="70" y="25" fill="#22c55e" fontSize="7">Cotyledon</text>
                <text x="25" y="65" fill="#3b82f6" fontSize="7">Radicle</text>
              </g>
            </svg>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: HUMAN REPRODUCTION ────────────────────────────────── */}
      <Collapsible title="2 · Human Reproduction" icon={<Activity className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Male Reproductive System & Accessory Structures" color="violet" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Testes & Duct Pathway</strong>
              <p>
                <strong>Scrotal Thermoregulation:</strong> Testes are situated outside the abdominal cavity in the scrotum to maintain testicular temperature 2–2.5°C lower than normal internal body temperature, which is essential for spermatogenesis. Dartos and cremaster muscles regulate this position.
              </p>
              <p>
                <strong>Male Accessory Ducts:</strong> The pathway of sperm transport is:
              </p>
              <p className="font-mono text-[11px] bg-black/30 p-2 rounded border border-white/5 text-emerald-400">
                Seminiferous Tubules ➔ Rete Testis ➔ Vasa Efferentia ➔ Epididymis ➔ Vas Deferens ➔ Ejaculatory Duct ➔ Urethra
              </p>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-emerald-400 block uppercase">Accessory Glands & Leydig Cells</strong>
              <p>
                <strong>Leydig & Sertoli Cells:</strong> Leydig (interstitial) cells synthesize and secrete testicular androgens (testosterone) under LH stimulation. Sertoli cells provide nutrition to developing germ cells and support spermatogenesis under FSH stimulation.
              </p>
              <p>
                <strong>Male Accessory Glands:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Seminal Vesicles (paired, 60%):</strong> Alkaline fluid containing fructose (sperm fuel), prostaglandins, and clotting proteins.</li>
                <li><strong>Prostate Gland (single, 30%):</strong> Slightly acidic fluid containing citrate and enzymes (e.g., fibrinolysin) to liquefy semen.</li>
                <li><strong>Bulbourethral Glands (paired, 10%):</strong> Secrete mucus for urethral lubrication.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Gametogenesis: Spermatogenesis vs. Oogenesis" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Spermatogenesis Sequence:</strong> Initiated at puberty and continues throughout life.
              <p className="font-mono mt-1 text-[11px] bg-black/30 p-2 rounded border border-white/5 text-emerald-400">
                Spermatogonium (2n) ➔ [Mitosis] ➔ Primary Spermatocyte (2n) ➔ [Meiosis I] ➔ Secondary Spermatocytes (n) ➔ [Meiosis II] ➔ Spermatids (n) ➔ [Spermiogenesis] ➔ Spermatozoa (n)
              </p>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Spermiogenesis:</strong> The developmental conversion of spherical, non-motile spermatids into flagellated, motile spermatozoa.</li>
                <li><strong>Spermiation:</strong> The release of mature spermatozoa from the Sertoli cells into the lumen of the seminiferous tubules.</li>
              </ul>
            </li>
            <li><strong>Oogenesis Sequence:</strong> Initiated during embryonic development; no new oogonia are formed or added after birth.
              <p className="font-mono mt-1 text-[11px] bg-black/30 p-2 rounded border border-white/5 text-pink-400">
                Oogonium (2n) ➔ Primary Oocyte (2n, arrested in Prophase I until puberty) ➔ [Completes Meiosis I at ovulation] ➔ Secondary Oocyte (n, arrested in Metaphase II) + First Polar Body ➔ [Completes Meiosis II after sperm entry] ➔ Ovum (n) + Second Polar Body
              </p>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Zona Pellucida & Corona Radiata:</strong> The secondary oocyte is released from the ovary surrounded by a non-cellular glycoprotein layer called the zona pellucida and outer cellular layers of follicular origin called the corona radiata.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 5: Sperm structure */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 180" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">HUMAN SPERM STRUCTURE</text>
              
              {/* Acrosome & Head */}
              <path d="M 40 90 C 40 70 80 70 95 90 C 80 110 40 110 40 90 Z" fill="#1e1b4b" stroke="#f472b6" strokeWidth="2" />
              <path d="M 40 90 C 40 70 60 70 65 90 C 60 110 40 110 40 90 Z" fill="#ec4899" /> {/* Acrosome */}
              <circle cx="80" cy="90" r="5" fill="#38bdf8" /> {/* Nucleus */}
              
              {/* Neck */}
              <rect x="95" y="86" width="10" height="8" fill="#a78bfa" />
              <line x1="98" y1="88" x2="98" y2="92" stroke="#ffffff" strokeWidth="2" /> {/* Centriole */}

              {/* Middle Piece */}
              <rect x="105" y="82" width="60" height="16" rx="3" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
              {/* Spiral mitochondria */}
              <path d="M 108 85 L 115 95 L 122 85 L 129 95 L 136 85 L 143 95 L 150 85 L 157 95" fill="none" stroke="#eab308" strokeWidth="1.5" />
              
              {/* Tail */}
              <path d="M 165 90 Q 240 70 300 90 T 400 90" fill="none" stroke="#94a3b8" strokeWidth="2" />

              {/* Labels */}
              <text x="50" y="55" fill="#ec4899" fontSize="9" textAnchor="middle">Acrosome</text>
              <path d="M 50 60 L 50 80" stroke="#ec4899" strokeWidth="0.8" strokeDasharray="2" />

              <text x="80" y="145" fill="#38bdf8" fontSize="9" textAnchor="middle">Nucleus (Head)</text>
              <path d="M 80 135 L 80 98" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2" />

              <text x="135" y="55" fill="#eab308" fontSize="9" textAnchor="middle">Mitochondria (Spiral)</text>
              <path d="M 135 60 L 135 80" stroke="#eab308" strokeWidth="0.8" strokeDasharray="2" />

              <text x="320" y="145" fill="#94a3b8" fontSize="9">Tail (Flagellum)</text>
            </svg>
          </div>

          <SectionBanner label="3. Ovarian and Uterine Menstrual Cycle" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Follicular (Proliferative) Phase (Days 1–13):</strong> Hypothalamic GnRH stimulates release of pituitary FSH and LH. These hormones drive primary follicular growth into a mature Graafian follicle and stimulate ovarian secretion of estrogen. Estrogen stimulates repair and proliferation of the uterine endometrium.</li>
            <li><strong>Ovulatory Phase (Day 14):</strong> High levels of estrogen exert positive feedback on the pituitary, triggering a sharp mid-cycle <strong className="text-emerald-400">LH surge</strong>. This LH spike induces the rupture of the Graafian follicle and release of the secondary oocyte (ovulation).</li>
            <li><strong>Luteal (Secretory) Phase (Days 15–28):</strong> The ruptured follicle transforms into the endocrine gland called the <strong className="text-emerald-400">corpus luteum</strong>, which secretes high amounts of progesterone. Progesterone maintains the endometrial lining, rendering it suitable for embryo implantation. If fertilisation fails, the corpus luteum degenerates, progesterone drops, and menstruation begins. If fertilisation succeeds, embryonic secretion of hCG maintains the corpus luteum during early pregnancy.</li>
          </ul>

          <SectionBanner label="4. Uterine Anatomy, Cleavage & Implantation" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Uterus Wall Layers:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Perimetrium:</strong> Outer thin membranous layer.</li>
                <li><strong>Myometrium:</strong> Middle thick layer of smooth muscle. Exhibits strong contractions during delivery.</li>
                <li><strong>Endometrium:</strong> Inner glandular lining that undergoes cyclic breakdown and regeneration during menstruation.</li>
              </ul>
            </li>
            <li><strong>Cleavage & Morula to Blastocyst:</strong> Following fertilisation at the ampullary-isthmic junction of the fallopian tube, the zygote undergoes mitotic cleavage divisions while moving toward the uterus:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Morula:</strong> A solid ball of 8–16 blastomeres formed within 3-4 days of fertilisation.</li>
                <li><strong>Blastocyst:</strong> Continued division forms a hollow structure comprising an outer cell layer called the **trophoblast** and an **inner cell mass**. The trophoblast attaches to the endometrium, while the inner cell mass differentiates to form the embryo.</li>
              </ul>
            </li>
            <li><strong>Mammary Glands Pathway:</strong> Lobe ➔ Alveoli (milk secretion) ➔ Tubule ➔ Duct ➔ Ampulla ➔ Lactiferous Duct.</li>
          </ul>

          {/* SVG 6: Female Reproductive System Organs */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 240" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">FEMALE REPRODUCTIVE ORGANS</text>
              
              {/* Uterus body */}
              <path d="M 180 80 Q 225 60 270 80 L 250 140 L 200 140 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="2.5" />
              
              {/* Fallopian Tubes */}
              <path d="M 180 80 C 140 70 120 90 90 90" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
              <path d="M 270 80 C 310 70 330 90 360 90" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
              
              {/* Fimbriae */}
              <path d="M 90 90 Q 80 100 90 110" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              <path d="M 360 90 Q 370 100 360 110" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              
              {/* Ovaries */}
              <ellipse cx="85" cy="115" rx="10" ry="7" fill="#fb7185" />
              <ellipse cx="365" cy="115" rx="10" ry="7" fill="#fb7185" />
 
              {/* Cervix and Vagina */}
              <rect x="210" y="140" width="30" height="30" fill="#a78bfa" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="2" />
              <rect x="215" y="170" width="20" height="40" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
 
              {/* Labels */}
              <text x="225" y="110" fill="#f43f5e" fontSize="9" textAnchor="middle">Uterus</text>
              <text x="320" y="65" fill="#22d3ee" fontSize="9">Fallopian Tube</text>
              <text x="55" y="118" fill="#fb7185" fontSize="9">Ovary</text>
              <text x="250" y="158" fill="#a78bfa" fontSize="9">Cervix</text>
              <text x="245" y="195" fill="#10b981" fontSize="9">Vagina</text>
            </svg>
          </div>

          <SectionBanner label="5. Placental Endocrine Functions & Parturition" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Placental Endocrine Function:</strong> The placenta acts as an endocrine tissue during pregnancy. It synthesizes and secretes hormones to maintain pregnancy and support fetal development:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>hCG & hPL:</strong> Human Chorionic Gonadotropin and Human Placental Lactogen are synthesized by the placenta.</li>
                <li><strong>Estrogens & Progesterone:</strong> Secreted in high amounts by the placenta to support uterine tissue growth and block ovulation.</li>
                <li><strong>Relaxin:</strong> Secreted by the ovary during later pregnancy stages (not synthesized by the placenta itself).</li>
              </ul>
            </li>
            <li><strong>Physiological exchange:</strong> Supplies oxygen (<InlineMath math="\text{O}_2" />) and nutrients to the fetus, while removing carbon dioxide (<InlineMath math="\text{CO}_2" />) and nitrogenous wastes.</li>
            <li><strong>Parturition Neuroendocrine Reflex:</strong> Induced by the **fetal ejection reflex** (mild uterine contractions triggered by signals from the fully developed fetus and placenta). This stimulates release of maternal **oxytocin** from the posterior pituitary, which acts on myometrial smooth muscle to strengthen contractions. This positive feedback loop amplifies contractions until expulsion occurs.</li>
            <li><strong>Lactation:</strong> Controlled by hormones. **Prolactin** stimulates milk synthesis in mammary alveoli. **Oxytocin** triggers the milk ejection reflex. **Colostrum** (initial yellow milk) contains crucial maternal antibodies providing passive immunity to the newborn.</li>
          </ul>

          {/* SVG 7: Blastocyst */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">BLASTOCYST STRUCTURE</text>
              <circle cx="200" cy="100" r="50" fill="#1e1b4b" stroke="#10b981" strokeWidth="2.5" />
              
              {/* Inner Cell Mass */}
              <circle cx="180" cy="75" r="10" fill="#fb7185" />
              <circle cx="195" cy="70" r="9" fill="#fb7185" />
              <circle cx="185" cy="85" r="9" fill="#fb7185" />
 
              {/* Trophoblast nuclei */}
              <circle cx="200" cy="53" r="3" fill="#10b981" />
              <circle cx="225" cy="60" r="3" fill="#10b981" />
              <circle cx="243" cy="80" r="3" fill="#10b981" />
              <circle cx="248" cy="105" r="3" fill="#10b981" />
              <circle cx="238" cy="130" r="3" fill="#10b981" />
              <circle cx="218" cy="145" r="3" fill="#10b981" />
              <circle cx="190" cy="147" r="3" fill="#10b981" />
              <circle cx="165" cy="135" r="3" fill="#10b981" />
              <circle cx="153" cy="110" r="3" fill="#10b981" />
              <circle cx="155" cy="85" r="3" fill="#10b981" />
 
              {/* Labels */}
              <text x="270" y="65" fill="#10b981" fontSize="9">Trophoblast</text>
              <path d="M 268 68 L 235 80" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2" />
 
              <text x="120" y="60" fill="#fb7185" fontSize="9" textAnchor="end">Inner Cell Mass</text>
              <path d="M 125 60 L 175 72" stroke="#fb7185" strokeWidth="0.8" strokeDasharray="2" />
 
              <text x="200" y="115" fill="#ffffff" fontSize="9" textAnchor="middle">Blastocoel</text>
            </svg>
          </div>

          <SectionBanner label="6. Gastrulation & Germ Layer Derivatives" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Gastrulation:</strong> Morphogenetic cell movement of the inner cell mass to establish three primary germ layers: **Ectoderm** (outer), **Mesoderm** (middle), and **Endoderm** (inner).</li>
            <li><strong>Extra-Embryonic Membranes:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Amnion:</strong> Inner membrane forming a fluid-filled sac around embryo to cushion against mechanical shock.</li>
                <li><strong>Chorion:</strong> Outer membrane forming chorionic villi for placental nutrition and waste exchange.</li>
                <li><strong>Allantois:</strong> Contributes to umbilical cord formation and early urinary bladder.</li>
                <li><strong>Yolk Sac:</strong> Initial site of red blood cell formation (hematopoiesis) before liver/bone marrow take over.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 8: Gastrulation */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">GASTRULATION & GERM LAYERS</text>
              
              {/* Outer Ectoderm */}
              <circle cx="200" cy="100" r="50" fill="none" stroke="#38bdf8" strokeWidth="4" />
              {/* Middle Mesoderm */}
              <circle cx="200" cy="100" r="38" fill="none" stroke="#ef4444" strokeWidth="4" />
              {/* Inner Endoderm */}
              <circle cx="200" cy="100" r="26" fill="none" stroke="#eab308" strokeWidth="4" />
 
              <circle cx="200" cy="100" r="12" fill="#1e1b4b" stroke="#ffffff" strokeWidth="1" />
              
              {/* Labels */}
              <text x="270" y="65" fill="#38bdf8" fontSize="9">Ectoderm</text>
              <path d="M 268 68 L 243 80" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2" />
 
              <text x="270" y="105" fill="#ef4444" fontSize="9">Mesoderm</text>
              <path d="M 268 105 L 235 105" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2" />
 
              <text x="270" y="145" fill="#eab308" fontSize="9">Endoderm</text>
              <path d="M 268 142 L 222 122" stroke="#eab308" strokeWidth="0.8" strokeDasharray="2" />
 
              <text x="200" y="103" fill="#ffffff" fontSize="8" textAnchor="middle">Gut</text>
            </svg>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Germ Layer</th>
                  <th className="p-2.5 text-cyan-400">Tissue & Organ Derivatives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold text-sky-400">Ectoderm</td>
                  <td className="p-2.5">Nervous system (brain, spinal cord, peripheral nerves), Epidermis of skin, hair, nails, lens of eye, inner ear, adrenal medulla.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-rose-400">Mesoderm</td>
                  <td className="p-2.5">Muscles (skeletal, smooth, cardiac), Skeleton (bones, cartilage), Circulatory system (heart, blood vessels, blood cells), Kidneys, Gonads, Dermis of skin, adrenal cortex.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-yellow-400">Endoderm</td>
                  <td className="p-2.5">Epithelial lining of gastrointestinal tract, Liver, Pancreas, Thyroid, Parathyroid, epithelial lining of lungs and urinary bladder.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="7. Gestation Milestones Table" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Time Frame</th>
                  <th className="p-2.5 text-cyan-400">Fetal Development Milestones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-mono">
                <tr>
                  <td className="p-2.5">1st Month</td>
                  <td className="p-2.5 text-cyan-400 font-sans">Heart is formed and heartbeat can be heard using a stethoscope.</td>
                </tr>
                <tr>
                  <td className="p-2.5">2nd Month</td>
                  <td className="p-2.5 text-cyan-400 font-sans">Fetus develops limbs and digits.</td>
                </tr>
                <tr>
                  <td className="p-2.5">3rd Month (1st Trimester)</td>
                  <td className="p-2.5 text-cyan-400 font-sans">Most of the major organ systems (limbs, external genital organs) are well-formed.</td>
                </tr>
                <tr>
                  <td className="p-2.5">5th Month</td>
                  <td className="p-2.5 text-cyan-400 font-sans">First fetal movements occur; hair appears on the head.</td>
                </tr>
                <tr>
                  <td className="p-2.5">6th Month (2nd Trimester)</td>
                  <td className="p-2.5 text-cyan-400 font-sans">Body is covered with fine hair, eyelids separate, and eyelashes are formed.</td>
                </tr>
                <tr>
                  <td className="p-2.5">9th Month</td>
                  <td className="p-2.5 text-cyan-400 font-sans">Fetus is fully developed and ready for parturition.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: REPRODUCTIVE HEALTH ────────────────────────────────── */}
      <Collapsible title="3 · Reproductive Health: Problems, Contraception & ART" icon={<Layers className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Reproductive Strategies & Population Explosion" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Problems & Programs:</strong> Issues include teenage pregnancy, unsafe abortions, sexually transmitted infections (STIs), and high Maternal Mortality Rate (MMR) and Infant Mortality Rate (IMR). The Family Planning program was initiated in 1951 in India. The current program is the **Reproductive and Child Health Care (RCH)** program.</li>
            <li><strong>Population Explosion:</strong> Driven by a rapid decline in death rate, MMR, and IMR, alongside an increase in the number of people of reproducible age.</li>
            <li><strong>Ideal Contraceptive Criteria:</strong> User-friendly, easily available, effective, reversible with no or minimal side effects, and non-interfering with sexual drive or desire.</li>
          </ul>

          {/* SVG 9: Contraception Chart */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="260" y="20" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">CONTRACEPTIVE CLASSIFICATIONS</text>
              
              {/* Natural */}
              <rect x="20" y="50" width="80" height="40" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="60" y="70" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Natural</text>
              <text x="60" y="82" fill="#10b981" fontSize="7" textAnchor="middle">Amenorrhea</text>
 
              {/* Barrier */}
              <rect x="120" y="50" width="80" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="160" y="70" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Barrier</text>
              <text x="160" y="82" fill="#38bdf8" fontSize="7" textAnchor="middle">Condoms/Diaphragm</text>
 
              {/* IUDs */}
              <rect x="220" y="50" width="80" height="40" rx="8" fill="#1e293b" stroke="#fb923c" strokeWidth="1.5" />
              <text x="260" y="70" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">IUDs</text>
              <text x="260" y="82" fill="#fb923c" fontSize="7" textAnchor="middle">CuT / LNG-20</text>
 
              {/* Oral */}
              <rect x="320" y="50" width="80" height="40" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
              <text x="360" y="70" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Oral</text>
              <text x="360" y="82" fill="#ec4899" fontSize="7" textAnchor="middle">Saheli / Steroids</text>
 
              {/* Surgical */}
              <rect x="420" y="50" width="80" height="40" rx="8" fill="#1e293b" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="460" y="70" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Surgical</text>
              <text x="460" y="82" fill="#a78bfa" fontSize="7" textAnchor="middle">Tubectomy/Vasectomy</text>
            </svg>
          </div>

          <SectionBanner label="2. Contraceptive Methods & Mechanisms" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Natural Methods:</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li><strong>Periodic Abstinence:</strong> Avoiding coitus from day 10 to 17 of the menstrual cycle when ovulation is expected.</li>
                <li><strong>Coitus Interruptus:</strong> Withdrawal of penis before ejaculation.</li>
                <li><strong>Lactational Amenorrhea:</strong> Prevents conception for up to six months after childbirth when the mother is intensively breastfeeding and menstruation has not resumed.</li>
              </ul>
            </li>
            <li><strong>Barrier Methods:</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li><strong>Condoms:</strong> Barrier contraceptives that also reduce the risk of transmission of many STIs.</li>
                <li><strong>Diaphragms, Cervical Caps & Vaults:</strong> Rubber barriers inserted into the female tract to cover the cervix. They block sperm entry and are reusable, but do not provide comparable STI protection.</li>
              </ul>
            </li>
            <li><strong>Intrauterine Devices (IUDs):</strong> Inserted by doctors into the uterus:
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li><strong>Non-medicated IUDs:</strong> Lippes loop. Increase phagocytosis of sperm within the uterus.</li>
                <li><strong>Copper-releasing IUDs:</strong> CuT, Cu7, Multiload 375. Release <strong className="text-emerald-400">Cu²⁺ ions</strong> which suppress sperm motility and fertilising capacity.</li>
                <li><strong>Hormone-releasing IUDs:</strong> Progestasert, LNG-20. Make the uterus unsuitable for implantation and the cervix hostile to sperm.</li>
              </ul>
            </li>
            <li><strong>Oral Contraceptive Pills:</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li><strong>Progestogen or Progestogen-Estrogen Combinations:</strong> Inhibit ovulation and implantation, and alter cervical mucus quality to retard sperm entry.</li>
                <li><strong>Saheli:</strong> A non-steroidal oral contraceptive developed by the Central Drug Research Institute (CDRI), Lucknow. It is taken once a week and has high contraceptive value with relatively few side effects.</li>
              </ul>
            </li>
            <li><strong>Surgical Methods (Sterilisation):</strong> Terminal methods to prevent pregnancy. **Vasectomy** in males (ligation of vas deferens) and **Tubectomy** in females (ligation of fallopian tubes). Highly effective but reversibility is very poor.</li>
          </ul>

          <SectionBanner label="3. MTP & Amniocentesis" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Medical Termination of Pregnancy (MTP):</strong> Intentional or voluntary termination of pregnancy before full term.
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li>MTP is considered relatively safer during the first trimester (up to 12 weeks of pregnancy) than during later stages.</li>
                <li>Legally regulated in India to avoid misuse for sex-selective abortions (female foeticide).</li>
              </ul>
            </li>
            <li><strong>Amniocentesis:</strong> A prenatal diagnostic technique used to detect certain chromosomal and genetic disorders (e.g., Down syndrome, hemophilia, sickle-cell anemia) in the developing fetus by analyzing chromosomal patterns in cells from amniotic fluid. Its misuse for prenatal sex determination is prohibited in India.</li>
          </ul>

          <SectionBanner label="4. Sexually Transmitted Infections (STIs)" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>STI Symptoms:</strong> Common early symptoms include itching, abnormal fluid discharge, slight pain, and swelling in the genital region. STIs may initially be asymptomatic, especially in females.</li>
            <li><strong>Curable STIs:</strong> Infections such as Gonorrhea (bacterial), Syphilis (bacterial), and Chlamydiasis are curable if detected early and treated properly.</li>
            <li><strong>Non-Curable STIs:</strong> HIV infection and genital herpes do not currently have curative treatments, though they can be medically managed. Hepatitis B can become chronic but is preventable by vaccination.</li>
            <li><strong>Complications of Untreated STIs:</strong> Pelvic Inflammatory Diseases (PID), abortions, stillbirths, ectopic pregnancies, infertility, or cancer of the reproductive tract.</li>
          </ul>

          <SectionBanner label="5. Infertility Diagnostics & ART Pathways" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Assisted Reproductive Technology (ART):</strong> Special techniques used to assist infertile couples:
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li><strong>IVF-ET (In Vitro Fertilisation - Embryo Transfer):</strong> Fertilisation outside the body followed by transfer:
                  <ul className="list-disc pl-5 mt-0.5 space-y-0.5">
                    <li><strong>ZIFT (Zygote Intra-Fallopian Transfer):</strong> Zygote or early embryo up to 8 blastomeres is transferred into the fallopian tube.</li>
                    <li><strong>IUT (Intra-Uterine Transfer):</strong> Embryos with more than 8 blastomeres are transferred directly into the uterus.</li>
                  </ul>
                </li>
                <li><strong>GIFT (Gamete Intra-Fallopian Transfer):</strong> Transfer of an ovum collected from a donor into the fallopian tube of a female who cannot produce ova but can provide a suitable environment for fertilisation and further development.</li>
                <li><strong>ICSI (Intracytoplasmic Sperm Injection):</strong> A specialized laboratory procedure in which a single sperm is injected directly into the cytoplasm of an ovum.</li>
                <li><strong>AI / IUI (Artificial Insemination / Intrauterine Insemination):</strong> Semen collected from the husband or a healthy donor is artificially introduced into the vagina or directly into the uterus (IUI) of the female. Useful in cases of low sperm count or inability to inseminate.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 10: ART Flowchart */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 220" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="260" y="20" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">ART PATHWAY DECISION MATRIX</text>
              
              {/* In Vitro Fertilization (IVF) */}
              <rect x="40" y="50" width="160" height="40" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="120" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">In Vitro (Outside Body)</text>
              
              {/* In Vivo Fertilization */}
              <rect x="320" y="50" width="160" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="400" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">In Vivo (Inside Body)</text>
 
              {/* IVF splits to ZIFT or IUT */}
              <path d="M 120 90 L 80 130" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3" />
              <path d="M 120 90 L 160 130" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3" />
 
              <rect x="20" y="130" width="100" height="30" rx="5" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1" />
              <text x="70" y="148" fill="#a78bfa" fontSize="8" textAnchor="middle">ZIFT (≤ 8 cells)</text>
 
              <rect x="130" y="130" width="100" height="30" rx="5" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1" />
              <text x="180" y="148" fill="#a78bfa" fontSize="8" textAnchor="middle">IUT (&gt; 8 cells)</text>
 
              {/* In vivo splits to GIFT or IUI */}
              <path d="M 400 90 L 360 130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3" />
              <path d="M 400 90 L 440 130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3" />
 
              <rect x="310" y="130" width="90" height="30" rx="5" fill="#172554" stroke="#60a5fa" strokeWidth="1" />
              <text x="355" y="148" fill="#60a5fa" fontSize="8" textAnchor="middle">GIFT (Gamete)</text>
 
              <rect x="410" y="130" width="90" height="30" rx="5" fill="#172554" stroke="#60a5fa" strokeWidth="1" />
              <text x="455" y="148" fill="#60a5fa" fontSize="8" textAnchor="middle">IUI (Insemination)</text>
            </svg>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            4 · Reproduction & Embryogenesis Lab
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Trigger fertilization, hormonal surges, or contraceptive barriers across plant ovules, seminiferous tubules, Graafian follicles, and early stage embryos to study physiological feedback.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('ovule_sac')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'ovule_sac' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Angiosperm Ovule (7-cell)
                </button>
                <button 
                  onClick={() => setSpecimen('testis_tubule')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'testis_tubule' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Seminiferous Tubule (Testis)
                </button>
                <button 
                  onClick={() => setSpecimen('ovarian_follicle')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'ovarian_follicle' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Ovarian Graafian Follicle
                </button>
                <button 
                  onClick={() => setSpecimen('contra_device')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'contra_device' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Contraceptive Barrier/IUD
                </button>
                <button 
                  onClick={() => setSpecimen('art_embryo')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'art_embryo' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  ART Blastomere Embryo
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select stimulus</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'triple_fusion', label: 'Trigger Triple Fusion (Angiosperms)' },
                  { id: 'block_gonado', label: 'Block Gonadotropin (FSH/LH) signaling' },
                  { id: 'lh_surge', label: 'Induce Mid-cycle LH Surge' },
                  { id: 'copper_ions', label: 'Introduce Copper ions (Cu2+)' },
                  { id: 'cleavage_div', label: 'Trigger Cleavage cell division' }
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
            <Tag color="cyan">Problem 1: Endosperm Ploidy & Cell count calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"If the diploid chromosome number of a flowering plant is 24, calculate the chromosome number in: (1) Megaspore Mother Cell, (2) Endosperm cell of typical Polygonum sac, and (3) Synergid cell."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Diploid chromosome number (2n) = 24. Therefore, haploid number (n) = 12."}</div>
              <div>{"2. Megaspore Mother Cell is diploid (2n) ➔ 24 chromosomes."}</div>
              <div>{"3. Endosperm (derived from 3n PEN via triple fusion of one male gamete and two polar nuclei) is triploid (3n) ➔ 3 × 12 = 36 chromosomes."}</div>
              <div>{"4. Synergid is a cell of the female gametophyte, which is haploid (n) ➔ 12 chromosomes."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: MMC = 24; Endosperm = 36; Synergid = 12.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Gamete count requirements</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"To produce 100 viable seeds in a typical wheat plant, calculate the minimum number of meiotic divisions required in microsporogenesis and megasporogenesis combined."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Each seed requires 1 zygote (formed by 1 egg cell and 1 male gamete)."}</div>
              <div>{"2. To get 100 egg cells (megaspores): 1 meiotic division of MMC yields 4 megaspores, but 3 degenerate, leaving only 1 functional. Thus, 100 meiotic divisions are required to produce 100 eggs."}</div>
              <div>{"3. To get 100 pollen grains (microspores): 1 meiotic division of microspore mother cell yields 4 functional pollen grains. Thus, 100 / 4 = 25 meiotic divisions are required."}</div>
              <div>{"4. Total meiotic divisions required = 100 (megasporogenesis) + 25 (microsporogenesis) = 125 divisions."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: 125 total meiotic divisions are required.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Blastomere division calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A human zygote undergoes rapid cleavage divisions in the fallopian tube. Calculate the number of blastomeres present after exactly 4 cleavage divisions."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Cleavage divisions are mitotic, where the cell count doubles with each division."}</div>
              <div>{"2. Blastomere count = 2^x, where x is the number of cleavage divisions."}</div>
              <div>{"3. For 4 divisions: 2^4 = 16 cells (Morula stage)."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: 16 blastomeres (16-cell stage).</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Germ Layer Derivatives Analysis</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An embryologist identifies cells that will form the nervous system, the cardiac tissue, and the mucosal lining of the bladder. Match these tissues to their respective primary germ layers."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Nervous system (including brain, spinal cord) arises from Ectoderm."}</div>
              <div>{"2. Cardiac tissue (heart muscle, blood vessels) is derived from Mesoderm."}</div>
              <div>{"3. Mucosal epithelial lining of the urinary bladder is formed by Endoderm."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Nervous System = Ectoderm; Cardiac Tissue = Mesoderm; Bladder Lining = Endoderm.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 6: PRACTICE MOCK TEST ────────────────────────────────── */}
      <Collapsible title="6 · Practice Mock Test (15 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Reproductive systems with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which layer of the microsporangium is multinucleate and plays a role in nourishing the developing pollen grains?',
                a: 'Endothecium',
                b: 'Tapetum',
                c: 'Epidermis',
                d: 'Middle layers',
                ans: 'Correct Answer: B. The tapetum is the innermost layer of the anther wall. It is multinucleate, polyploid, and nourishes the developing microspores.'
              },
              {
                q: 'At the time of shedding, what percentage of angiosperms shed pollen grains at the 2-celled stage?',
                a: '100%',
                b: 'About 60%',
                c: 'About 40%',
                d: 'Only 15%',
                ans: 'Correct Answer: B. In about 60% of angiosperms, pollen grains are shed at the 2-celled stage. In the remaining species, the generative cell divides before shedding, producing 3-celled pollen.'
              },
              {
                q: 'Which outbreeding device prevents BOTH autogamy and geitonogamy in plants?',
                a: 'Monoecious state (e.g., castor)',
                b: 'Dioecious state (e.g., papaya)',
                c: 'Dichogamy',
                d: 'Cleistogamous flowers',
                ans: 'Correct Answer: B. In dioecious plants (male and female flowers on different plants), both autogamy and geitonogamy are prevented. Monoecious plants prevent only autogamy.'
              },
              {
                q: 'The correct pathway of sperm transport through the accessory ducts of the human male reproductive system is:',
                a: 'Seminiferous tubules ➔ Epididymis ➔ Rete testis ➔ Vas deferens ➔ Urethra',
                b: 'Seminiferous tubules ➔ Rete testis ➔ Vasa efferentia ➔ Epididymis ➔ Vas deferens ➔ Ejaculatory duct ➔ Urethra',
                c: 'Leydig cells ➔ Epididymis ➔ Vas deferens ➔ Ejaculatory duct ➔ Urethra',
                d: 'Rete testis ➔ Vasa efferentia ➔ Vas deferens ➔ Epididymis ➔ Urethra',
                ans: 'Correct Answer: B. Sperms move from seminiferous tubules ➔ Rete testis ➔ Vasa efferentia ➔ Epididymis ➔ Vas deferens ➔ Ejaculatory duct ➔ Urethra.'
              },
              {
                q: 'In a typical 28-day human menstrual cycle, a mid-cycle LH surge (around day 14) directly induces:',
                a: 'Menstruation',
                b: 'Ovulation',
                c: 'Implantation',
                d: 'Corpus luteum degeneration',
                ans: 'Correct Answer: B. The LH surge stimulates the rupture of the mature Graafian follicle, leading to ovulation.'
              },
              {
                q: 'Which of the following hormones is secreted by the ovary during later stages of pregnancy?',
                a: 'Human Chorionic Gonadotropin (hCG)',
                b: 'Relaxin',
                c: 'Human Placental Lactogen (hPL)',
                d: 'Prolactin',
                ans: 'Correct Answer: B. hCG, hPL, and progesterone are secreted by the placenta. Relaxin is secreted by the ovary during pregnancy.'
              },
              {
                q: 'During embryonic development, the solid ball of 8-16 blastomeres before the blastocyst stage is called a:',
                a: 'Zygote',
                b: 'Morula',
                c: 'Gastrula',
                d: 'Trophoblast',
                ans: 'Correct Answer: B. The solid sphere of 8 to 16 cells formed by cleavage divisions is called the morula.'
              },
              {
                q: 'Which contraceptive method releases Cu2+ ions to suppress sperm motility and fertilizing capacity?',
                a: 'LNG-20',
                b: 'Multiload 375',
                c: 'Lippes Loop',
                d: 'Saheli',
                ans: 'Correct Answer: B. Multiload 375, CuT, and Cu7 are copper-releasing IUDs that suppress sperm motility and fertilizing capacity.'
              },
              {
                q: 'In ART, the transfer of an embryo containing up to 8 blastomeres into the fallopian tube is termed:',
                a: 'Intra-Uterine Transfer (IUT)',
                b: 'Zygote Intra-Fallopian Transfer (ZIFT)',
                c: 'Gamete Intra-Fallopian Transfer (GIFT)',
                d: 'Artificial Insemination (AI)',
                ans: 'Correct Answer: B. Embryos containing up to 8 blastomeres are transferred into the fallopian tube using ZIFT, while embryos exceeding 8 blastomeres are moved into the uterus using IUT.'
              },
              {
                q: 'Amniocentesis is a prenatal diagnostic technique used to check for fetal genetic disorders by analyzing cells from:',
                a: 'Chorionic villi',
                b: 'Amniotic fluid',
                c: 'Maternal blood',
                d: 'Yolk sac',
                ans: 'Correct Answer: B. Amniocentesis involves drawing amniotic fluid from the uterus to examine fetal cells for chromosomal and genetic abnormalities.'
              },
              {
                q: 'Which extra-embryonic membrane forms the fetal portion of the placenta in humans?',
                a: 'Amnion',
                b: 'Chorion',
                c: 'Allantois',
                d: 'Yolk sac',
                ans: 'Correct Answer: B. The chorion is the outermost membrane that forms the chorionic villi, which interdigitate with the maternal uterine tissue to form the placenta.'
              },
              {
                q: 'Which of the following tissues is derived from the embryonic endoderm?',
                a: 'Nervous system',
                b: 'Cardiac muscle',
                c: 'Epithelial lining of the thyroid gland',
                d: 'Epidermis of skin',
                ans: 'Correct Answer: C. The thyroid, parathyroid, and epithelial lining of the gastrointestinal tract and urinary bladder are derived from the endoderm. Nervous system and epidermis are ectodermal; cardiac muscle is mesodermal.'
              },
              {
                q: 'If a pollen grain is stored at liquid nitrogen temperature for long-term preservation, what is the temperature maintained?',
                a: '0°C',
                b: '-80°C',
                c: '-196°C',
                d: '-273°C',
                ans: 'Correct Answer: C. Pollen cryopreservation is conducted in liquid nitrogen at -196°C to preserve viability for gene banks.'
              },
              {
                q: 'What type of endosperm is coconut water?',
                a: 'Cellular',
                b: 'Helobial',
                c: 'Free Nuclear',
                d: 'Ruminate',
                ans: 'Correct Answer: C. The liquid portion of the coconut is free-nuclear endosperm containing thousands of free nuclei; the surrounding white kernel is cellular endosperm.'
              },
              {
                q: 'Which of the following parts of the ovule represents the junction where its body fuses with the funicle?',
                a: 'Micropyle',
                b: 'Chalaza',
                c: 'Hilum',
                d: 'Nucellus',
                ans: 'Correct Answer: C. The hilum is the junction point where the funicle attaches to the main body of the ovule.'
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
        <span className="text-[11px] text-white/30 font-mono">Reproduction · Unit 6</span>
      </div>

    </div>
  );
}
