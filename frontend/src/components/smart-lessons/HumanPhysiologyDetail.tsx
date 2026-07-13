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

export default function HumanPhysiologyDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'hbo2_curve' | 'ecg_cardiac' | 'nephron_grad' | 'sarcomere_slide' | 'synaptic_cleft'>('hbo2_curve');
  const [treatment, setTreatment] = useState<'co2_spike' | 'beta_blocker' | 'block_adh' | 'atp_depletion' | 'ach_blocker'>('co2_spike');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    // CO2 spike / Bohr Effect
    if (treatment === 'co2_spike') {
      if (specimen === 'hbo2_curve') {
        return {
          outcome: 'Oxyhemoglobin Dissociation Curve Shifts Right (Bohr Effect)',
          color: 'text-rose-400',
          visualEffect: 'Hemoglobin releases oxygen molecules rapidly into the surrounding tissue.',
          product: 'Increased pO2 in tissue; decreased affinity of Hb for O2',
          explanation: 'Under high partial pressure of CO2 (pCO2), high hydrogen ion concentration (low pH), and elevated temperature, the oxygen-dissociation curve shifts to the right. This represents a conformational shift in hemoglobin that lowers its affinity for oxygen, facilitating oxygen unloading in metabolically active tissues.',
          trap: 'Bohr effect describes how CO2 and H+ affect oxygen binding, whereas Haldane effect describes how O2 affects CO2 binding in the lungs.'
        };
      }
    }

    // Beta Blocker / Cardiac rhythm
    if (treatment === 'beta_blocker') {
      if (specimen === 'ecg_cardiac') {
        return {
          outcome: 'Bradycardia (Slowing of Heart Rate & Cardiac Output)',
          color: 'text-cyan-400',
          visualEffect: 'The distance between consecutive QRS complexes (R-R interval) widens on the screen.',
          product: 'Decreased heart rate; extended joint diastole duration',
          explanation: 'Beta-blockers antagonize sympathetic epinephrine and norepinephrine receptors on the SA node. This slows the generation of action potentials (pacemaker potential), extending the duration of joint diastole and lowering cardiac output.',
          trap: 'Heart rate is calculated from the R-R interval, not from the T-wave which represents ventricular repolarization.'
        };
      }
    }

    // Block ADH / Diuresis
    if (treatment === 'block_adh') {
      if (specimen === 'nephron_grad') {
        return {
          outcome: 'Profuse Diuresis (Diabetes Insipidus Simulated)',
          color: 'text-amber-400',
          visualEffect: 'Large volumes of dilute urine flow rapidly out of the collecting duct; medullary gradient fails to concentrate urine.',
          product: 'Hypotonic urine; dehydration risk',
          explanation: 'Without Antidiuretic Hormone (ADH), the late distal tubule and collecting ducts remain impermeable to water. Aquaporin channels are not inserted into the apical membrane, preventing water reabsorption back into the concentrated medullary interstitium.',
          trap: 'Diabetes Insipidus is caused by lack of ADH and yields dilute urine. Diabetes Mellitus involves insulin deficiency/resistance and yields glucose in urine.'
        };
      }
    }

    // ATP Depletion / Muscle rigor
    if (treatment === 'atp_depletion') {
      if (specimen === 'sarcomere_slide') {
        return {
          outcome: 'Rigor State / Cross-Bridge Lock',
          color: 'text-rose-400',
          visualEffect: 'The actin and myosin filaments remain locked in a contracted state; sarcomere cannot relax.',
          product: 'Stable actin-myosin actomyosin complexes',
          explanation: 'ATP binding is required to detach the myosin head from the active site on actin after the power stroke. In the absence of ATP, the cross-bridge cannot dissociate, locking the muscle in a rigid contracted state (the biochemical basis of rigor mortis).',
          trap: 'ATP is required BOTH for the detachment of the cross-bridge and for re-cocking the myosin head, as well as active calcium pumping back into the SR.'
        };
      }
    }

    // ACh Blocker / Synapse block
    if (treatment === 'ach_blocker') {
      if (specimen === 'synaptic_cleft') {
        return {
          outcome: 'Synaptic Transmission Block / Flaccid Paralysis',
          color: 'text-rose-400',
          visualEffect: 'Neurotransmitter vesicles fuse with the presynaptic membrane, but post-synaptic depolarization (EPSP) drops to zero.',
          product: 'Inactivated post-synaptic ligand-gated Na+ channels',
          explanation: 'Blocking acetylcholine (ACh) receptors on the post-synaptic motor endplate prevents the opening of ligand-gated Na+ channels. Without Na+ influx, depolarization cannot reach threshold to generate a muscle action potential.',
          trap: 'Chemical synapses are unidirectional and slower than electrical synapses, which utilize direct gap junctions for bidirectional flow.'
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
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white human-physio-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .human-physio-chapter .text-xs { font-size: 13px !important; }
        .human-physio-chapter .text-sm { font-size: 15px !important; }
        .human-physio-chapter .text-base { font-size: 17.5px !important; }
        .human-physio-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .human-physio-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .human-physio-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .human-physio-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .human-physio-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 5</Tag>
            <Tag color="rose">IAT Core Framework</Tag>
            <Tag color="violet">Human Physiology</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Human Physiology: <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Homeostasis & Regulation</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Rigorously aligned NCERT revision covering Digestion, Respiration, Circulation, Excretion, Muscle sliding filament theory, Neuronal action potentials, Sensory organs, and Endocrine pathways.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: DIGESTION AND ABSORPTION ───────────────────────────── */}
      <Collapsible title="1 · Digestion & Absorption: Alimentary Canal & Enzymes" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Mouth & Stomach Secretory Cells" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Dentition:</strong> Human teeth are thecodont (embedded in jaw sockets), diphyodont (two sets: temporary/deciduous and permanent), and heterodont (incisors, canines, premolars, molars). Dental formula: <strong className="text-emerald-400">2123/2123</strong>.</li>
            <li><strong>Salivary Amylase:</strong> Initiates digestion in the mouth, converting about 30% of starch into maltose at an optimum pH of 6.8.</li>
            <li><strong>Stomach Gastric Glands:</strong> Contain three major cell types:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Mucous Neck Cells:</strong> Secrete protective mucus.</li>
                <li><strong>Peptic / Chief Cells:</strong> Secrete the inactive proenzyme <strong className="text-emerald-400">pepsinogen</strong>.</li>
                <li><strong>Parietal / Oxyntic Cells:</strong> Secrete hydrochloric acid (HCl, pH 1.8; activates pepsinogen to pepsin) and <strong className="text-emerald-400">intrinsic factor</strong> (essential for vitamin B12 absorption in the ileum).</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="2. Pancreatic & Intestinal Secretory Enzymes" color="cyan" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Gland / Secretion</th>
                  <th className="p-3 text-cyan-400">Enzymes / Active Constituents</th>
                  <th className="p-3 text-rose-400">Function / Substrate Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-3 font-bold">Liver (Bile)</td>
                  <td className="p-3 text-cyan-400">Bile pigments (bilirubin, biliverdin), bile salts, cholesterol, phospholipids. <strong className="text-emerald-400">Contains no enzymes</strong>.</td>
                  <td className="p-3 text-rose-400">Emulsification of fats; activates pancreatic lipases.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Pancreatic Juice</td>
                  <td className="p-3 text-cyan-400">Trypsinogen, chymotrypsinogen, procarboxypeptidase, amylase, lipases, nucleases.</td>
                  <td className="p-3 text-rose-400">Proteolytic digestion (proteins ➔ peptones/proteoses); nucleases digest nucleic acids.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Intestinal Glands (Succus Entericus)</td>
                  <td className="p-3 text-cyan-400">Enterokinase (activator), dipeptidases, maltase, lactase, sucrase, nucleosidases.</td>
                  <td className="p-3 text-rose-400">Converts trypsinogen to active trypsin; completes breakdown into amino acids and monosaccharides.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="3. Absorption & Disorders" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Absorption Mechanisms:</strong> Glucose and amino acids are absorbed by active transport or facilitated diffusion. Fatty acids and glycerol are insoluble; they form water-soluble <strong className="text-emerald-400">micelles</strong> which enter intestinal mucosal cells, where they are re-formed into protein-coated fat globules called <strong className="text-emerald-400">chylomicrons</strong>, which are released into lymphatic vessels (lacteals) inside intestinal villi.</li>
            <li><strong>Disorders:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Jaundice:</strong> Liver is affected; bile pigments accumulate in skin and eyes.</li>
                <li><strong>Vomiting:</strong> Ejection of stomach contents through mouth, controlled by the vomit center in the medulla.</li>
                <li><strong>Diarrhea:</strong> Increased frequency of bowel movements and liquidity of feces, reducing nutrient absorption.</li>
                <li><strong>Indigestion:</strong> Inadequate enzyme secretion, anxiety, food poisoning, or spicy food leading to feeling of fullness.</li>
              </ul>
            </li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 2: BREATHING AND EXCHANGE OF GASES ────────────────────── */}
      <Collapsible title="2 · Breathing & Exchange of Gases: Bohr Effect & Volumes" icon={<Activity className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70">
          
          <SectionBanner label="1. Respiratory Anatomy & Air Conducting Passages" color="violet" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Conducting Zone vs Respiratory Zone</strong>
              <p>
                <strong>Conducting Zone:</strong> External nares ➔ Pharynx ➔ Larynx (voice box with vocal cords) ➔ Trachea (supported by incomplete cartilaginous C-rings to prevent collapse) ➔ Primary, secondary, tertiary bronchi ➔ Terminal bronchioles. It humidifies, warms, and clears foreign particles from inhaled air (dead space volume ~150 mL).
              </p>
              <p>
                <strong>Respiratory Zone:</strong> Respiratory bronchioles ➔ Alveolar ducts ➔ Alveolar sacs ➔ Alveoli. The site of actual gas exchange.
              </p>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-emerald-400 block uppercase">Pleural Cavity & Epithelial Cells</strong>
              <p>
                <strong>Pleural Membrane:</strong> Double-layered membrane enclosing lungs. Outer parietal pleura is in contact with thoracic lining; inner visceral pleura adheres to lung surface. <strong className="text-emerald-400">Pleural fluid</strong> in between reduces friction and holds layers together via surface tension.
              </p>
              <p>
                <strong>Alveolar Cells:</strong> <strong className="text-emerald-400">Type I pneumocytes</strong> (thin squamous cells, 95% surface area, active in gas diffusion) and <strong className="text-emerald-400">Type II pneumocytes</strong> (cuboidal cells, secrete pulmonary surfactant to prevent alveolar collapse).
              </p>
            </div>
          </div>

          <SectionBanner label="2. Mechanism of Breathing (Ventilation)" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Inspiration (Active Process):</strong> Diaphragm contracts and flattens (increases thoracic volume antero-posteriorly). External intercostal muscles contract, pulling ribs and sternum upward and outward (increases volume dorso-ventrally). Intrapleural pressure becomes more negative, causing intrapulmonary pressure to drop below atmospheric pressure (~ -1 to -2 mmHg), drawing air into the lungs.</li>
            <li><strong>Expiration (Passive Process):</strong> Diaphragm and external intercostals relax, decreasing thoracic volume and increasing intrapulmonary pressure above atmospheric level, forcing air out. During <strong className="text-emerald-400">forced expiration</strong> (active), internal intercostal muscles and abdominal muscles contract to rapidly decrease thoracic cavity volume.</li>
            <li><strong>Surfactant & Surface Tension:</strong> Dipalmitoylphosphatidylcholine (DPPC) surfactant decreases surface tension at the air-water interface within alveoli. This prevents collapse of smaller alveoli on expiration (Laplace's Law) and increases lung compliance.</li>
            <li><strong>Intrapleural Pressure:</strong> Under normal conditions, intrapleural pressure is always negative (<InlineMath math="-4\text{ to }-5\text{ mmHg}" /> relative to atmospheric) due to the elastic recoil of lungs pulling inward and chest wall expanding outward. If compromised (pneumothorax), lungs collapse immediately.</li>
          </ul>

          <SectionBanner label="3. Pulmonary Volumes & Capacities" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Tidal Volume (TV):</strong> Volume of air inspired or expired during normal respiration (~500 mL).</li>
            <li><strong>Inspiratory Reserve Volume (IRV):</strong> Additional volume of air a person can inspire by forceful inspiration (2500–3000 mL).</li>
            <li><strong>Expiratory Reserve Volume (ERV):</strong> Additional volume of air a person can expire by forceful expiration (1000–1100 mL).</li>
            <li><strong>Residual Volume (RV):</strong> Volume of air remaining in lungs even after a forceful expiration (1100–1200 mL).</li>
            <li><strong>Vital Capacity (VC):</strong> TV + IRV + ERV. Maximum volume of air a person can breathe in after a forced expiration.</li>
            <li><strong>Total Lung Capacity (TLC):</strong> VC + RV. Total volume of air accommodated in the lungs at the end of a forced inspiration.</li>
            <li><strong>Trap:</strong> RV, Functional Residual Capacity (<InlineMath math="FRC = ERV + RV" />), and Total Lung Capacity (<InlineMath math="TLC" />) <strong className="text-emerald-400">cannot be measured by simple spirometry</strong> because RV never leaves the lungs during breathing.</li>
          </ul>

          <SectionBanner label="4. Exchange of Gases & Partial Pressures" color="violet" />
          
          {/* Custom Respiratory SVG Diagram */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="260" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">RESPIRATORY SYSTEM & ALVEOLAR GAS EXCHANGE</text>
              
              {/* Left zoom-in: Alveolar gas exchange */}
              <circle cx="120" cy="110" r="45" fill="none" stroke="#22d3ee" strokeWidth="3" />
              <text x="120" y="105" fill="#22d3ee" fontSize="10" fontWeight="bold" textAnchor="middle">Alveolar Air</text>
              <text x="120" y="120" fill="#ffffff" fontSize="9" textAnchor="middle">pO₂ = 104 | pCO₂ = 40</text>
              
              {/* Capillary passing under */}
              <path d="M 40 165 Q 120 172 200 165" fill="none" stroke="#f43f5e" strokeWidth="4" /> {/* Deoxygenated side */}
              <path d="M 200 165 Q 280 172 360 165" fill="none" stroke="#10b981" strokeWidth="4" /> {/* Oxygenated side */}
              
              {/* Text for partial pressures */}
              <text x="50" y="145" fill="#f43f5e" fontSize="8" fontWeight="bold">Deoxygenated Blood</text>
              <text x="50" y="155" fill="#ffffff" fontSize="7.5" className="font-mono">pO₂=40 | pCO₂=45</text>

              <text x="320" y="145" fill="#10b981" fontSize="8" fontWeight="bold">Oxygenated Blood</text>
              <text x="320" y="155" fill="#ffffff" fontSize="7.5" className="font-mono">pO₂=95 | pCO₂=40</text>

              {/* Diffusion membrane */}
              <path d="M 90 148 Q 120 155 150 148" stroke="#ffffff" strokeWidth="1" strokeDasharray="2" fill="none" />
              <text x="120" y="143" fill="#ffffff" fontSize="7" textAnchor="middle">Diffusion Membrane &lt; 0.5 μm</text>

              {/* Lungs schematic on right */}
              <path d="M 420 70 Q 435 50 450 70 L 455 110 Q 435 125 415 110 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.5" />
              <path d="M 480 70 Q 465 50 450 70 L 445 110 Q 465 125 485 110 Z" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" strokeWidth="1.5" />
              {/* Trachea */}
              <line x1="450" y1="35" x2="450" y2="70" stroke="#cccccc" strokeWidth="3" />
              <line x1="445" y1="45" x2="455" y2="45" stroke="#cccccc" strokeWidth="1.5" />
              <line x1="445" y1="53" x2="455" y2="53" stroke="#cccccc" strokeWidth="1.5" />
              <text x="450" y="30" fill="#ffffff" fontSize="8" textAnchor="middle">Trachea & Bronchi</text>
            </svg>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-3">Gas type</th>
                  <th className="p-3 text-cyan-400">Atmospheric Air</th>
                  <th className="p-3 text-cyan-300">Alveoli</th>
                  <th className="p-3 text-rose-400">Deoxygenated Blood</th>
                  <th className="p-3 text-emerald-400">Oxygenated Blood</th>
                  <th className="p-3 text-amber-400">Tissues</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70 font-mono">
                <tr>
                  <td className="p-3 font-bold text-white uppercase font-sans">O₂ (mmHg)</td>
                  <td className="p-3 text-cyan-400">159</td>
                  <td className="p-3 text-cyan-300">104</td>
                  <td className="p-3 text-rose-400">40</td>
                  <td className="p-3 text-emerald-400">95</td>
                  <td className="p-3 text-amber-400">40</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white uppercase font-sans">CO₂ (mmHg)</td>
                  <td className="p-3 text-cyan-400">0.3</td>
                  <td className="p-3 text-cyan-300">40</td>
                  <td className="p-3 text-rose-400">45</td>
                  <td className="p-3 text-emerald-400">40</td>
                  <td className="p-3 text-amber-400">45</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-white/60">
            <strong>Diffusion Membrane layers:</strong> Three layers form the barrier (total thickness &lt; 0.5 mm): (1) Thin squamous epithelium of alveoli, (2) Endothelium of alveolar capillaries, and (3) Basement substance sandwiched between them. Since solubility of CO₂ is 20–25 times higher than O₂, its diffusion rate across the membrane is much faster despite lower partial pressure difference.
          </p>

          <SectionBanner label="5. Gas Transport & Physiological Shifts" color="violet" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Oxygen Transport & Bohr Effect</strong>
              <p>97% of oxygen is transported bound to hemoglobin as oxyhemoglobin; 3% is dissolved in plasma. Each Hb molecule binds up to 4 oxygen molecules cooperatively.</p>
              <strong className="text-cyan-300 block font-bold">Bohr Effect (Right-Shift ➔ Unloading at tissues):</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>High partial pressure of CO2 (pCO2)</li>
                <li>High H⁺ concentration (low pH / acidosis)</li>
                <li>High temperature</li>
                <li>High 2,3-Bisphosphoglycerate (2,3-BPG) in RBCs</li>
              </ul>
              <p className="mt-1 text-[11px] text-white/40">Conversely, low pCO2, high pH, low temp, and low 2,3-BPG in lungs shift the curve left, enhancing oxygen loading.</p>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Carbon Dioxide Transport & Haldane Effect</strong>
              <p>Transported in three forms: (1) 70% as Bicarbonate (HCO₃⁻), (2) 20–25% as Carbamino-hemoglobin, (3) 7% dissolved in plasma.</p>
              <p>
                <strong>Chloride Shift (Hamburger's Phenomenon):</strong> HCO₃⁻ produced inside RBCs exits into plasma in exchange for Cl⁻ ions entering the cell to maintain ionic balance.
              </p>
              <p>
                <strong>Haldane Effect:</strong> In lungs, binding of oxygen to hemoglobin displaces carbon dioxide from hemoglobin and releases H⁺, facilitating carbon dioxide expulsion. While Bohr effect operates at tissues, Haldane effect operates primarily at the lungs.
              </p>
            </div>
          </div>

          <SectionBanner label="6. Respiratory Regulation & Disorders" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Regulation:</strong> Respiration is primarily regulated by the <strong className="text-emerald-400">Respiratory Rhythm Center</strong> in the medulla oblongata, which is highly sensitive to CO2 and H+ concentrations (oxygen levels have a minor role, acting only through carotid and aortic body chemoreceptors under hypoxia). The <strong className="text-emerald-400">Pneumotaxic Center</strong> in the pons moderates respiratory rhythm.</li>
            <li><strong>Disorders:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Asthma:</strong> Difficulty in breathing due to bronchospasms and bronchial inflammation.</li>
                <li><strong>Emphysema:</strong> Chronic disorder where alveolar walls are damaged, decreasing the respiratory surface area. Majorly caused by <strong className="text-emerald-400">cigarette smoking</strong>.</li>
                <li><strong>Occupational Lung Diseases:</strong> Fibrosis (proliferation of fibrous tissue) in lungs due to exposure to stone dust (Silicosis, Asbestosis).</li>
              </ul>
            </li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 3: BODY FLUIDS AND CIRCULATION ────────────────────────── */}
      <Collapsible title="3 · Body Fluids & Circulation: ABO groups, Cardiac Cycle & ECG" icon={<Layers className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Plasma Composition & Blood formed elements" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/60">
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Liquid Plasma (55% of Blood)</strong>
              <p>
                Consists of 90–92% water and 6–8% solutes. Major plasma proteins:
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Fibrinogen:</strong> Essential for blood clotting.</li>
                <li><strong>Globulins:</strong> Primarly involved in host defense mechanisms (immunoglobulins).</li>
                <li><strong>Albumins:</strong> Maintain blood colloidal osmotic pressure.</li>
              </ul>
              <p className="text-[10px] text-white/40">Also contains glucose, amino acids, lipids, and minerals (Na⁺, Ca²⁺, Mg²⁺, HCO₃⁻, Cl⁻).</p>
            </div>
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-emerald-400 block uppercase">RBCs & WBCs (Leukocytes)</strong>
              <p>
                <strong>Erythrocytes (RBCs):</strong> 5–5.5 million/mm³, non-nucleated, biconcave, live 120 days. Destroyed in the spleen (RBC graveyard).
              </p>
              <p>
                <strong>Leukocytes (WBCs):</strong> 6000–8000/mm³, nucleated. Divided into:
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Granulocytes:</strong> Neutrophils (60–65%, phagocytic), Eosinophils (2–3%, resist allergy/parasites), Basophils (0.5–1%, secrete histamine, serotonin, heparin).</li>
                <li><strong>Agranulocytes:</strong> Lymphocytes (20–25%, B/T cells immune response), Monocytes (6–8%, phagocytic).</li>
              </ul>
            </div>
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-amber-400 block uppercase">Coagulation & Clotting Cascade</strong>
              <p>
                <strong>Thrombocytes (Platelets):</strong> 1.5–3.5 lakh/mm³. Release clotting factors.
              </p>
              <p>
                <strong>Coagulation Mechanism:</strong>
              </p>
              <ul className="list-decimal pl-4 space-y-0.5">
                <li>Injured tissue and platelets release thromboplastin, forming the enzyme complex <strong className="text-emerald-400">thrombokinase</strong>.</li>
                <li>Thrombokinase, in presence of calcium ions (<InlineMath math="\text{Ca}^{2+}" />), converts inactive <strong className="text-emerald-400">prothrombin</strong> to active <strong className="text-emerald-400">thrombin</strong>.</li>
                <li>Thrombin converts soluble monomeric <strong className="text-emerald-400">fibrinogen</strong> to insoluble polymer <strong className="text-emerald-400">fibrin</strong> threads that trap formed elements, forming a clot.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Lymphatic System & Tissue Fluid" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Lymph Composition:</strong> As blood passes through capillaries, some water and soluble substances filter out into intercellular spaces, forming interstitial fluid. When this fluid enters lymphatic vessels, it is called <strong className="text-emerald-400">lymph</strong>. It is a colorless fluid containing specialized lymphocytes, lower protein than plasma, and completely lacks RBCs and platelets.</li>
            <li><strong>Fat Absorption:</strong> Fats are insoluble and cannot enter blood capillaries directly. They are packed into micelles, absorbed into intestinal mucosal cells, rebuilt as chylomicrons, and discharged into lymphatic capillaries called <strong className="text-emerald-400">lacteals</strong> in the intestinal villi.</li>
            <li><strong>Function:</strong> Acts as a middleman between blood vessels and body tissues, returning protein and excess tissue fluid to the venous blood stream, and playing a critical role in immune defense.</li>
          </ul>

          <SectionBanner label="3. Double Circulation & Autonomic Regulation" color="amber" />
          
          {/* upgraded Heart conducting system & Cardiac cycle SVG */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="260" y="20" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">HEART CONDUCTION SYSTEM & DOUBLE CIRCULATION</text>
              
              {/* Conducting nodes illustration (Left) */}
              <rect x="30" y="45" width="200" height="135" fill="none" stroke="#f59e0b" strokeWidth="1" rx="8" />
              <text x="130" y="58" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">Nodal Conduction Pathway</text>
              
              {/* SA Node */}
              <circle cx="70" cy="80" r="10" fill="#ef4444" />
              <text x="70" y="83" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">SA</text>
              <text x="50" y="98" fill="#ef4444" fontSize="7">SA Node (Pacemaker)</text>
              
              {/* Path to AV Node */}
              <path d="M 80 80 L 130 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3" fill="none" />
              
              {/* AV Node */}
              <circle cx="140" cy="115" r="8" fill="#eab308" />
              <text x="140" y="118" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">AV</text>
              <text x="140" y="130" fill="#eab308" fontSize="7" textAnchor="middle">AV Node</text>

              {/* Bundle of His */}
              <path d="M 148 115 L 180 125" stroke="#10b981" strokeWidth="2.5" fill="none" />
              <text x="195" y="120" fill="#10b981" fontSize="7">Bundle of His</text>

              {/* Purkinje fibers */}
              <path d="M 180 125 Q 195 145 210 160" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
              <path d="M 180 125 Q 165 145 150 165" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
              <text x="180" y="170" fill="#22d3ee" fontSize="7" textAnchor="middle">Purkinje Fibers</text>

              {/* Double Circulation loops (Right) */}
              <rect x="260" y="45" width="230" height="135" fill="none" stroke="#f59e0b" strokeWidth="1" rx="8" />
              <text x="375" y="58" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">Double Circulation Pathways</text>

              {/* Pulm loop */}
              <circle cx="375" cy="80" r="14" fill="none" stroke="#22d3ee" strokeWidth="2" />
              <text x="375" y="83" fill="#22d3ee" fontSize="8" textAnchor="middle">Lungs</text>
              <path d="M 350 110 C 330 95 350 80 361 80" stroke="#ef4444" strokeWidth="1.5" fill="none" />
              <text x="325" y="95" fill="#ef4444" fontSize="7">Pulm. Artery</text>
              
              {/* Heart box in middle of circ */}
              <rect x="350" y="105" width="50" height="30" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" rx="4" />
              <text x="375" y="123" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Heart</text>

              {/* Systemic loop */}
              <circle cx="375" cy="160" r="14" fill="none" stroke="#3b82f6" strokeWidth="2" />
              <text x="375" y="163" fill="#3b82f6" fontSize="8" textAnchor="middle">Body</text>
              <path d="M 390 135 C 415 145 405 160 389 160" stroke="#ef4444" strokeWidth="1.5" fill="none" />
              <text x="430" y="150" fill="#ef4444" fontSize="7">Aorta (Systemic)</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Circulatory Circuits & Conduction</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Pulmonary Circuit:</strong> Right ventricle ➔ Pulmonary artery ➔ Lungs ➔ Pulmonary veins ➔ Left atrium.</li>
                <li><strong>Systemic Circuit:</strong> Left ventricle ➔ Aorta ➔ Body tissues ➔ Vena cava ➔ Right atrium.</li>
                <li><strong>Coronary Circuit:</strong> Heart wall receives blood supply via coronary arteries; drains into right atrium via coronary sinus.</li>
                <li><strong>Nodal conduction:</strong> Sinoatrial (SA) node acts as natural pacemaker, rhythmically depolarizing at 70–75 beats/min. Signal travels to Atrioventricular (AV) node ➔ Bundle of His ➔ Right/Left Bundle branches ➔ Purkinje fibers.</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Autonomic regulation & Cardiac Cycle</strong>
              <p>
                <strong>Autonomic Regulation:</strong> Medulla oblongata regulates heart rhythm via the autonomic nervous system (ANS):
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Sympathetic:</strong> Releases noradrenaline; increases heart rate, ventricular contraction strength, and cardiac output.</li>
                <li><strong>Parasympathetic (Vagus nerve):</strong> Releases acetylcholine; decreases heart rate, action potential conduction speed.</li>
              </ul>
              <p>
                <strong>Stroke Volume & Cardiac Output:</strong> Stroke volume (~70 mL) is regulated by venous return (Frank-Starling law). Cardiac Output = Stroke Volume × Heart Rate = <InlineMath math="70\text{ mL} \times 72\text{ beats/min} \approx 5000\text{ mL/min}" />.
              </p>
            </div>
          </div>

          <SectionBanner label="4. ECG Waves & Cardiovascular Disorders" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">ECG Waves (Electrocardiogram)</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>P-wave:</strong> Represents atrial depolarization (atrial contraction/systole).</li>
                <li><strong>QRS complex:</strong> Represents ventricular depolarization (ventricular contraction/systole). R-wave peak counting gives heart rate.</li>
                <li><strong>T-wave:</strong> Represents ventricular repolarization (ventricular relaxation/diastole). The end of the T-wave marks the end of ventricular systole.</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Circulatory System Disorders</strong>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Hypertension:</strong> High blood pressure exceeding <InlineMath math="140/90\text{ mmHg}" />. Can cause damage to brain, kidneys, and heart.</li>
                <li><strong>Coronary Artery Disease (Atherosclerosis):</strong> Deposition of calcium, fat, cholesterol, and fibrous tissue inside the lumen of arteries feeding the heart muscle, narrowing their lumen.</li>
                <li><strong>Angina Pectoris:</strong> Severe chest pain caused by ischemia (insufficient oxygen delivery to heart muscle cells).</li>
                <li><strong>Heart Failure:</strong> State where heart fails to pump blood effectively to meet body needs (manifests as lung congestion; differs from cardiac arrest and heart attack).</li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 4: EXCRETORY PRODUCTS AND ELIMINATION ─────────────────── */}
      <Collapsible title="4 · Excretory Products: Counter-Current Gradient & RAAS" icon={<FlaskConical className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Gross Renal Anatomy & Nephron Types" color="rose" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Gross Kidney Structure & JGA</strong>
              <p>
                <strong>Gross Anatomy:</strong> Human kidneys are bean-shaped, situated between the levels of the last thoracic (T12) and third lumbar (L3) vertebrae. A tough fibrous capsule covers the outer surface. Through the notch (<strong className="text-emerald-400">hilum</strong>), the ureter, blood vessels, and nerves enter. Inner pelvis projects into calyces. Inside, the kidney has an outer cortex and inner medulla divided into medullary pyramids (pyramids of Malpighi) projecting into calyces.
              </p>
              <p>
                <strong>Juxtaglomerular Apparatus (JGA):</strong> A specialized structure formed by cellular modifications in the distal convoluted tubule (macula densa) and the afferent arteriole (JG cells containing renin) at their contact point.
              </p>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-emerald-400 block uppercase">Cortical vs Juxtamedullary Nephrons</strong>
              <p>
                Each kidney contains ~1 million nephrons:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Cortical Nephrons (85%):</strong> Glomeruli located in outer cortex; Loop of Henle is short and extends only minimally into the medulla. Vasa recta is highly reduced or completely absent.</li>
                <li><strong>Juxtamedullary Nephrons (15%):</strong> Glomeruli located close to corticomedullary junction; Loop of Henle is long and dips deep into the medulla. Vasa recta is highly developed, running parallel to Loop of Henle to maintain medullary concentration gradients.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Urine Formation & Tubular Function Details" color="rose" />
          <ul className="list-disc pl-4 space-y-2 text-white/60 text-xs">
            <li><strong>Glomerular Ultrafiltration:</strong> Driven by glomerular hydrostatic pressure (~60 mmHg), opposed by blood colloidal osmotic pressure (~32 mmHg) and capsular hydrostatic pressure (~18 mmHg), yielding a net filtration pressure (NFP) of ~10 mmHg. Glomerular Filtration Rate (GFR) is ~125 mL/min (180 Liters/day). The filtration membrane consists of: fenestrated capillary endothelium, basement membrane, and podocyte slit diaphragm (filtration slits) of Bowman's capsule.</li>
            <li><strong>Selective Reabsorption (Active vs. Passive):</strong> 99% of filtrate is reabsorbed. Glucose and amino acids are completely reabsorbed via secondary active transport in the PCT. Water (passive osmolarity matching) and urea (passive diffusion) are also reabsorbed.</li>
            <li><strong>Tubular Secretion:</strong> Active transport of H⁺, K⁺, and NH₃ from peritubular capillaries into the tubule lumen, maintaining blood pH and ionic equilibrium.</li>
            <li><strong>Segmental Functions of the Nephron Tubule:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>PCT:</strong> Lined by simple cuboidal brush border epithelium (with microvilli to maximize surface area). Reabsorbs 70–80% of electrolytes and water. Secretes H⁺, NH₃, K⁺.</li>
                <li><strong>Loop of Henle (Descending):</strong> Thin wall, highly permeable to water but impermeable to electrolytes. Filtrate becomes concentrated (hypertonic) as water leaves.</li>
                <li><strong>Loop of Henle (Ascending):</strong> Impermeable to water, actively and passively transports NaCl. Filtrate becomes diluted (hypotonic) as electrolytes leave.</li>
                <li><strong>DCT:</strong> Conditional (facultative) reabsorption of Na⁺ and water under hormonal control. Reabsorbs HCO₃⁻ and selectively secretes H⁺, K⁺, NH₃.</li>
                <li><strong>Collecting Duct:</strong> Runs from cortex to inner medulla. Permits final concentrated water reabsorption under ADH control. Also allows small amounts of urea to diffuse into medullary interstitium to maintain hyperosmolarity.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="3. The Counter-Current Mechanism" color="rose" />
          
          {/* Nephron & Vasa Recta SVG */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 500 240" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="250" y="20" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">COUNTER-CURRENT MULTIPLIER SYSTEM</text>
              
              {/* Cortex Medulla Boundary */}
              <line x1="30" y1="70" x2="470" y2="70" stroke="#ffffff" strokeWidth="1" strokeDasharray="3" />
              <text x="45" y="65" fill="#ffffff" fontSize="8">Cortex (300 mOsm/L)</text>
              <text x="45" y="85" fill="#f43f5e" fontSize="8">Outer Medulla</text>
 
              {/* Loop of Henle */}
              <path d="M 120 70 L 120 200 Q 150 230 180 200 L 180 70" fill="none" stroke="#22d3ee" strokeWidth="3" />
              <text x="110" y="130" fill="#22d3ee" fontSize="8" transform="rotate(90 110 130)" textAnchor="middle">Descending Limb (Water Out)</text>
              <text x="195" y="130" fill="#22d3ee" fontSize="8" transform="rotate(-90 195 130)" textAnchor="middle">Ascending Limb (NaCl Out)</text>
 
              {/* Osmolarity values inside Loop */}
              <text x="120" y="90" fill="#ffffff" fontSize="8" textAnchor="middle">300</text>
              <text x="120" y="150" fill="#ffffff" fontSize="8" textAnchor="middle">600</text>
              <text x="150" y="215" fill="#ff7171" fontSize="9" fontWeight="bold" textAnchor="middle">1200 mOsm/L</text>
              <text x="180" y="150" fill="#ffffff" fontSize="8" textAnchor="middle">600</text>
              <text x="180" y="90" fill="#ffffff" fontSize="8" textAnchor="middle">300</text>
 
              {/* Water leaving descending */}
              <path d="M 120 120 Q 90 120 70 120" fill="none" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#arrow)" />
              <text x="80" y="115" fill="#60a5fa" fontSize="8" textAnchor="middle">H₂O</text>
 
              {/* Salt leaving ascending */}
              <path d="M 180 140 Q 210 140 230 140" fill="none" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#arrow)" />
              <text x="220" y="135" fill="#f59e0b" fontSize="8" textAnchor="middle">NaCl</text>
 
              <text x="350" y="120" fill="#ffffff" fontSize="9" textAnchor="middle">Vasa Recta carries blood in opposite direction,</text>
              <text x="350" y="135" fill="#ffffff" fontSize="9" textAnchor="middle">maintaining the corticomedullary hyperosmotic</text>
              <text x="350" y="150" fill="#ffffff" fontSize="9" textAnchor="middle">gradient in the interstitium.</text>
            </svg>
          </div>

          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Descending Limb of Henle:</strong> Permeable to water but nearly impermeable to electrolytes, concentrating the filtrate as it descends.</li>
            <li><strong>Ascending Limb of Henle:</strong> Impermeable to water but permits transport of electrolytes (NaCl) actively and passively, diluting the filtrate.</li>
            <li><strong>Corticomedullary Osmolarity Gradient:</strong> Progressively increases from <strong className="text-emerald-400">300 mOsm/L</strong> in the cortex to <strong className="text-emerald-400">1200 mOsm/L</strong> in the inner medulla near the papillary region, enabling water conservation.</li>
          </ul>

          <SectionBanner label="4. Regulation, Micturition & Other Excretory Organs" color="rose" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>RAAS Pathway:</strong> Low blood pressure or GFR ➔ Juxtaglomerular Apparatus (JGA) releases <strong className="text-emerald-400">Renin</strong> ➔ Renin converts angiotensinogen in plasma to Angiotensin I ➔ Angiotensin-Converting Enzyme (ACE) converts it to <strong className="text-emerald-400">Angiotensin II</strong> (a strong vasoconstrictor) ➔ Angiotensin II stimulates the adrenal cortex to release <strong className="text-emerald-400">Aldosterone</strong>, promoting Na+ and water reabsorption in the DCT.</li>
            <li><strong>ANF Counter-Regulation:</strong> Atrial Natriuretic Factor (ANF) is released by the heart atria in response to high BP, causing vasodilation and opposing the RAAS pathway to lower blood pressure.</li>
            <li><strong>ADH (Vasopressin):</strong> Released from hypothalamus/posterior pituitary under hyperosmotic stress. ADH increases water permeability mainly in the late distal tubule and collecting ducts by inserting aquaporin channels, increasing water reabsorption.</li>
            <li><strong>Micturition Reflex:</strong> As bladder fills, stretch receptors in the muscular wall (detrusor muscle) send signals to the CNS. CNS initiates parasympathetic motor signals causing contraction of detrusor muscle and relaxation of internal urethral sphincter. Voluntary somatic signals relax the external urethral sphincter, causing micturition (urination).</li>
            <li><strong>Other Excretory Organs:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Lungs:</strong> Excrete ~18 Liters of CO₂/day and water vapor.</li>
                <li><strong>Liver:</strong> Synthesizes urea via the <strong className="text-emerald-400">ornithine (urea) cycle</strong>. Also excretes bile pigments (bilirubin, biliverdin), cholesterol, and degraded steroid hormones.</li>
                <li><strong>Skin:</strong> Sweat glands excrete sweat (water, NaCl, small amounts of urea, lactic acid); sebaceous glands eliminate sebum (sterols, hydrocarbons, waxes).</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="5. Renal System Disorders" color="rose" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Uremia:</strong> Accumulation of urea in the blood due to kidney malfunction. High urea levels are toxic; treated with hemodialysis or kidney transplantation.</li>
            <li><strong>Renal Failure:</strong> Acute or chronic reduction in glomerular filtration, leading to oliguria and fluid/electrolyte retention.</li>
            <li><strong>Renal Calculi (Kidney Stones):</strong> Insoluble mass of crystallized salts (primarily calcium oxalate or phosphates) formed within the renal pelvis or calyces.</li>
            <li><strong>Glomerulonephritis:</strong> Immunologically-mediated inflammation of the renal glomeruli, often following streptococcal throat infections.</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 5: LOCOMOTION AND MOVEMENT ────────────────────────────── */}
      <Collapsible title="5 · Locomotion & Movement: Sarcomere & Sliding Filament Theory" icon={<Workflow className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Types of Movement & Muscle Categories" color="emerald" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Three Types of Cellular Movement</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Amoeboid Movement:</strong> Exhibited by macrophages and leukocytes in blood. Accomplished by pseudopodia formed by streaming of protoplasm (microfilaments involved).</li>
                <li><strong>Ciliary Movement:</strong> Occurs in internal tubular organs lined by ciliated epithelium. Helps remove dust particles in trachea, and passage of ova through fallopian tubes.</li>
                <li><strong>Muscular Movement:</strong> Movement of limbs, tongue, and jaws using the contractile property of muscle tissue.</li>
              </ul>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-emerald-400 block uppercase">Muscle Tissue Comparison</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Skeletal Muscle:</strong> Striated, voluntary, multinucleated, cylindrical, attached to bones, fast speed of contraction, tires easily.</li>
                <li><strong>Smooth (Visceral) Muscle:</strong> Non-striated, involuntary, uninucleated, spindle-shaped, walls of visceral organs (stomach, blood vessels), slow and sustained contraction.</li>
                <li><strong>Cardiac Muscle:</strong> Striated, involuntary, branched, uninucleated, found in heart wall, possesses <strong className="text-emerald-400">intercalated discs</strong> (gap junctions for syncytial conduction), never fatigues.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Sarcomere & Sliding Filament Theory" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Sarcomere Bands:</strong> Functional unit of contraction located between two Z-lines.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>A-band (Anisotropic):</strong> Dark band of thick myosin filaments overlapping thin actin filaments. Length remains constant during contraction.</li>
                <li><strong>I-band (Isotropic):</strong> Light band of thin actin filaments only. Shortens during contraction.</li>
                <li><strong>H-zone:</strong> Central gap in A-band with only thick myosin. Disappears during full contraction.</li>
                <li><strong>M-line:</strong> Fibrous midline connecting thick filaments.</li>
              </ul>
            </li>
            <li><strong>Sliding Filament Mechanism:</strong> Action potential down T-tubules releases Ca²⁺ from sarcoplasmic reticulum. Ca²⁺ binds to <strong className="text-emerald-400">Troponin C</strong>, moving <strong className="text-emerald-400">Tropomyosin</strong> off actin active sites. Myosin head hydrolyzes ATP (<InlineMath math="ATP \rightarrow ADP + P_i" />), binds actin, executes power stroke pulling actin toward M-line, binds a new ATP to detach, and repeats.</li>
            <li><strong>Energy Roles:</strong> ATP hydrolysis drives the re-cocking of myosin head. ATP binding is required for cross-bridge detachment (rigor mortis occurs in absence of ATP). Active transport of Ca²⁺ back into the sarcoplasmic reticulum also requires ATP.</li>
          </ul>

          <SectionBanner label="3. Labeled Joints & Skeletal Divisions" color="emerald" />
          
          {/* Joints & Skeletal SVG */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="260" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">SKELETAL DIVISIONS & SYNOVIAL JOINT STRUCTURE</text>
              
              {/* Skeletal divisions (Left) */}
              <rect x="30" y="45" width="200" height="135" fill="none" stroke="#10b981" strokeWidth="1" rx="8" />
              <text x="130" y="58" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Skeletal Bones (206 Total)</text>
              <text x="50" y="80" fill="#ffffff" fontSize="8" fontWeight="bold">Axial Skeleton (80 bones):</text>
              <text x="60" y="93" fill="#ffffff" fontSize="7.5">· Skull (29) & Vertebrae (26)</text>
              <text x="60" y="105" fill="#ffffff" fontSize="7.5">· Ribs (24) & Sternum (1)</text>

              <text x="50" y="125" fill="#ffffff" fontSize="8" fontWeight="bold">Appendicular (126 bones):</text>
              <text x="60" y="138" fill="#ffffff" fontSize="7.5">· Pectoral (4) & Pelvic Girdle (2)</text>
              <text x="60" y="150" fill="#ffffff" fontSize="7.5">· Limbs (120 - 30 per limb)</text>

              {/* Joint structure (Right) */}
              <rect x="260" y="45" width="230" height="135" fill="none" stroke="#10b981" strokeWidth="1" rx="8" />
              <text x="375" y="58" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Synovial Joint Anatomy</text>
              
              {/* Bone 1 */}
              <path d="M 330 75 Q 360 85 365 95 L 365 110" stroke="#cccccc" strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Bone 2 */}
              <path d="M 330 165 Q 360 155 365 145 L 365 130" stroke="#cccccc" strokeWidth="6" fill="none" strokeLinecap="round" />
              
              {/* Joint capsule membrane */}
              <rect x="350" y="105" width="30" height="30" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" rx="2" />
              <text x="390" y="112" fill="#22d3ee" fontSize="7.5">Synovial Fluid</text>
              <text x="390" y="122" fill="#ffffff" fontSize="7">Synovial Membrane</text>
              <text x="390" y="132" fill="#a78bfa" fontSize="7">Articular Cartilage</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Skeletal Bone Breakdown</strong>
              <p>
                <strong>Ribs Classification:</strong> 12 pairs. True Ribs (1–7 pairs: connected dorsally to vertebrae, ventrally to sternum via hyaline cartilage), False Ribs (8–10 pairs: vertebrochondral, connect to 7th rib), Floating Ribs (11–12 pairs: do not connect ventrally).
              </p>
              <p>
                <strong>Vertebral Formula:</strong> <InlineMath math="\text{C}_7 \text{T}_{12} \text{L}_5 \text{S}_{(5)} \text{Co}_{(4)}" />. Atlas (1st) and Axis (2nd) enable head rotation.
              </p>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Joint Types & Mechanics</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Fibrous Joints:</strong> Immovable joints where bones are fused by dense fibrous connective tissues (e.g., skull sutures).</li>
                <li><strong>Cartilaginous Joints:</strong> Permits limited movement; bones connected by cartilage (e.g., adjacent vertebrae in spinal column, pubic symphysis).</li>
                <li><strong>Synovial Joints:</strong> Freely movable. Fluid-filled synovial cavity between articulating surfaces. Types:
                  <ul className="list-circle pl-5 mt-0.5 space-y-0.5 text-[11px]">
                    <li>Ball-and-Socket: Shoulder / hip joints.</li>
                    <li>Hinge: Knee / elbow / finger joints.</li>
                    <li>Pivot: Between Atlas and Axis vertebrae.</li>
                    <li>Saddle: Between carpal and metacarpal of thumb.</li>
                    <li>Gliding: Between carpals of the wrist.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <SectionBanner label="4. Muscular & Skeletal Disorders" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Myasthenia Gravis:</strong> Autoimmune disorder targeting acetylcholine receptors at neuromuscular junctions. Symptoms: progressive skeletal muscle fatigue, weakness, and eventual paralysis.</li>
            <li><strong>Muscular Dystrophy:</strong> Progressive genetic degeneration of skeletal muscles, commonly linked to structural protein deficiencies (e.g., dystrophin).</li>
            <li><strong>Tetany:</strong> Rapid involuntary muscle spasms (wild contractions) caused by hypocalcemia (abnormally low calcium levels in body fluids, raising membrane excitability).</li>
            <li><strong>Arthritis:</strong> Inflammation of joints. Divided into:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Osteoarthritis:</strong> Mechanical wear-and-tear degradation of articular cartilage.</li>
                <li><strong>Rheumatoid Arthritis:</strong> Autoimmune inflammation of the synovial membrane, causing painful pannus formation.</li>
                <li><strong>Gouty Arthritis (Gout):</strong> Deposition of needle-like uric acid crystals in joints, causing acute inflammation.</li>
              </ul>
            </li>
            <li><strong>Osteoporosis:</strong> Age-related reduction in bone mass density, increasing susceptibility to fractures. Commonly caused by decreased estrogen levels in post-menopausal women.</li>
          </ul>
        </div>
      </Collapsible>

      {/* ─── SECTION 6: NEURAL CONTROL AND COORDINATION ────────────────────── */}
      <Collapsible title="6 · Neural Control & Coordination: Action Potentials & Sensory Organs" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Neuron Structure, Myelination & PNS Divisions" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/60">
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Nervous System Divisions</strong>
              <p>
                <strong>CNS:</strong> Brain & Spinal Cord. Integration/control center.
              </p>
              <p>
                <strong>PNS:</strong> Divided into:
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Somatic:</strong> Relays impulses from CNS to skeletal muscles (voluntary).</li>
                <li><strong>Autonomic (ANS):</strong> Relays impulses to smooth/involuntary muscles and glands. Divided into:
                  <ul className="list-circle pl-4 space-y-0.5">
                    <li>Sympathetic: Emergency/exercise ("fight or flight").</li>
                    <li>Parasympathetic: Rest and digest ("SLUDD" activities).</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-emerald-400 block uppercase">Neuron Structure & Nissl's</strong>
              <p>
                The structural and functional unit of the nervous system. Comprises:
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Soma (Cell Body):</strong> Contains cytoplasm, nucleus, and dense granules called <strong className="text-emerald-400">Nissl's granules</strong> (composed of RER and free ribosomes for active protein synthesis).</li>
                <li><strong>Dendrites:</strong> Short, branched projections; conduct impulses toward cell body.</li>
                <li><strong>Axon:</strong> Long process conducting impulses away from cell body, ending in synaptic knobs.</li>
              </ul>
            </div>
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-amber-400 block uppercase">Types & Myelination of Neurons</strong>
              <p>
                <strong>Morphology:</strong> Unipolar (cell body with single axon; embryonic), Bipolar (one axon, one dendrite; retina of eye), Multipolar (one axon, multiple dendrites; cerebral cortex).
              </p>
              <p>
                <strong>Myelination:</strong>
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Myelinated:</strong> Enwrapped in myelin sheath secreted by Schwann cells (PNS) or oligodendrocytes (CNS). Gaps are Nodes of Ranvier, allowing rapid <strong className="text-emerald-400">saltatory conduction</strong>.</li>
                <li><strong>Non-myelinated:</strong> Covered by Schwann cell but lacks myelin wraps. Slower continuous conduction.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Action Potentials & Synaptic Transmission" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Resting Potential (-70 mV):</strong> Axon membrane is polarized. High Na⁺ outside, high K⁺ inside. Axon membrane is highly permeable to K⁺ but nearly impermeable to Na⁺. Maintained by active <strong className="text-emerald-400">Na⁺/K⁺ ATPase pump</strong> (pumps 3 Na⁺ out in exchange for 2 K⁺ in, creating electrogenic negativity).</li>
            <li><strong>Depolarization:</strong> Stimulus alters membrane permeability. Voltage-gated Na⁺ channels open rapidly. Na⁺ influx reverses polarity, reaching action potential spike at +30 mV.</li>
            <li><strong>Repolarization:</strong> Na⁺ channels close; voltage-gated K⁺ channels open. K⁺ efflux restores negative resting membrane potential.</li>
            <li><strong>Synaptic Transmission:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Action potential reaches terminal knob ➔ opens voltage-gated Ca²⁺ channels.</li>
                <li>Ca²⁺ influx triggers synaptic vesicles to fuse with presynaptic membrane, releasing neurotransmitters (exocytosis) into the synaptic cleft.</li>
                <li>Bind to post-synaptic receptors, opening channels to cause either an excitatory postsynaptic potential (EPSP; Na⁺ influx depolarizes) or inhibitory postsynaptic potential (IPSP; Cl⁻ influx or K⁺ efflux hyperpolarizes).</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="3. CNS Anatomy: Labeled Brain & Reflex Arc" color="cyan" />
          
          {/* Labeled Brain Sagittal Section & Neuron SVG */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="260" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">CNS ANATOMY: SAGITTAL BRAIN DIVISIONS</text>
              
              {/* Brain outline (Left) */}
              <path d="M 50 140 Q 40 80 100 60 Q 150 40 200 80 Q 220 100 210 130 L 190 140 Q 150 150 120 145 Z" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
              <text x="130" y="100" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Cerebrum</text>
              <text x="130" y="112" fill="#ffffff" fontSize="7" textAnchor="middle">(Forebrain)</text>

              {/* Hypothalamus/Pituitary area */}
              <circle cx="140" cy="125" r="5" fill="#f43f5e" />
              <text x="125" y="130" fill="#f43f5e" fontSize="7" textAnchor="end">Hypothalamus</text>

              {/* Cerebellum (Hindbrain) */}
              <path d="M 210 130 Q 230 140 220 160 Q 200 170 190 150 Z" fill="none" stroke="#a78bfa" strokeWidth="1" />
              <text x="220" y="172" fill="#a78bfa" fontSize="8" textAnchor="middle">Cerebellum</text>

              {/* Brainstem (Midbrain, Pons, Medulla) */}
              <path d="M 160 135 L 160 175 L 175 175 L 175 135 Z" fill="none" stroke="#10b981" strokeWidth="1.5" />
              <text x="150" y="155" fill="#10b981" fontSize="7" textAnchor="end">Pons</text>
              <text x="150" y="168" fill="#10b981" fontSize="7" textAnchor="end">Medulla</text>
              <line x1="168" y1="135" x2="168" y2="148" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="195" y="145" fill="#f59e0b" fontSize="7">Midbrain</text>

              {/* Reflex Arc Schematic (Right) */}
              <rect x="270" y="45" width="220" height="135" fill="none" stroke="#22d3ee" strokeWidth="1" rx="8" />
              <text x="380" y="58" fill="#22d3ee" fontSize="8" fontWeight="bold" textAnchor="middle">Monosynaptic Reflex Arc</text>
              
              <circle cx="310" cy="110" r="10" fill="#eab308" fillOpacity="0.2" stroke="#eab308" />
              <text x="310" y="113" fill="#ffffff" fontSize="7" textAnchor="middle">Muscle</text>
              
              {/* Sensory line (Afferent) */}
              <path d="M 320 110 L 410 110" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
              <text x="365" y="103" fill="#f43f5e" fontSize="7" textAnchor="middle">Afferent Neuron</text>

              {/* Spinal cord synapsing */}
              <rect x="410" y="90" width="30" height="40" fill="#a78bfa" rx="2" />
              <text x="425" y="112" fill="#ffffff" fontSize="6" textAnchor="middle">CNS</text>

              {/* Motor line (Efferent) */}
              <path d="M 410 120 L 320 120" stroke="#10b981" strokeWidth="1.5" fill="none" />
              <text x="365" y="132" fill="#10b981" fontSize="7" textAnchor="middle">Efferent Motor</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">CNS Brain Sub-regions</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Forebrain:</strong> Includes Cerebrum (left/right hemispheres connected by <strong className="text-emerald-400">corpus callosum</strong>), Thalamus (sensory relay center), and Hypothalamus (controls BMR, body temperature, hunger, thirst, pituitary gland secretions).</li>
                <li><strong>Midbrain:</strong> Located between thalamus and pons. Contains cerebral aqueduct and corpora quadrigemina (four dorsal colliculi visual/auditory reflex lobes).</li>
                <li><strong>Hindbrain:</strong> Cerebellum (highly folded, coordinates voluntary motor posture and balance), Pons (fiber tracts interconnecting brain levels), Medulla oblongata (vital centers: cardiovascular, gastric secretions, vomiting, respiratory rhythm).</li>
                <li><strong>Brain Stem:</strong> Composed of Midbrain, Pons, and Medulla oblongata. Connects brain to spinal cord.</li>
              </ul>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Reflex Arc & Synapses</strong>
              <p>
                <strong>Reflex Arc:</strong> The neural pathway governing reflex actions: Sensory receptor ➔ Sensory afferent neuron ➔ Integration center (CNS spinal cord gray matter) ➔ Motor efferent neuron ➔ Effector muscle.
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Monosynaptic:</strong> Afferent sensory synapses directly onto efferent motor neuron (e.g., patellar knee-jerk reflex). No interneuron.</li>
                <li><strong>Polysynaptic:</strong> One or more interneurons present between afferent and efferent neurons (e.g., pain withdrawal reflex).</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="4. Detailed Sensory Organs & Defects" color="cyan" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">The Eye: Structure & Defects</strong>
              <p>
                <strong>Structure:</strong> Outer fibrous sclera and cornea; middle vascular choroid, ciliary body, and iris; inner neural retina containing photoreceptors (Rods [rhodopsin, twilight scotopic vision] and Cones [photopsin, daylight photopic color vision]). Fovea centralis is the point of maximal visual resolution (contains cones only). Blind spot completely lacks photoreceptors.
              </p>
              <strong className="text-cyan-300 block font-bold text-[10px]">Visual Defects:</strong>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Myopia:</strong> Near-sightedness. Image focused in front of retina. Corrected with concave lenses.</li>
                <li><strong>Hypermetropia:</strong> Far-sightedness. Image focused behind retina. Corrected with convex lenses.</li>
                <li><strong>Astigmatism:</strong> Unequal curvature of the cornea. Corrected with cylindrical lenses.</li>
                <li><strong>Presbyopia:</strong> Age-related loss of lens elasticity. Corrected with bifocal lenses.</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">The Ear: Hearing & Balance</strong>
              <p>
                <strong>Hearing Pathway:</strong> Sound waves ➔ Pinna ➔ Tympanic membrane ➔ Malleus, Incus, Stapes (amplification) ➔ Oval window ➔ Perilymph/Endolymph inside Cochlea ➔ Waves bend hair cells in the <strong className="text-emerald-400">Organ of Corti</strong> on the basilar membrane ➔ Auditory nerve action potentials ➔ Temporal cortex of brain.
              </p>
              <p>
                <strong>Equilibrium & Balance:</strong> Governed by the vestibular apparatus:
              </p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li><strong>Dynamic Balance:</strong> Semicircular canals (cristae ampullaris sensory hair cells respond to angular rotation).</li>
                <li><strong>Static Balance:</strong> Otolith organs (Saccule and Utricle, maculae sensory hair cells respond to linear acceleration and gravity).</li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 7: CHEMICAL COORDINATION AND INTEGRATION ──────────────── */}
      <Collapsible title="7 · Chemical Coordination: Hormone Receptors & Endocrine Glands" icon={<Layers className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Hormone Transport & Receptor Mechanisms" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Peptide & Catecholamine Hormones</strong>
              <p>Water-soluble (e.g., Insulin, Glucagon, Pituitary hormones, Epinephrine). Cannot cross the cell membrane.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Bind to specific membrane-bound receptors on the target cell surface.</li>
                <li>Generate <strong className="text-emerald-400">second messengers</strong> (cAMP, IP₃, Ca²⁺) inside the cell.</li>
                <li>Second messengers initiate enzymatic cascades that amplify the signal, altering cellular metabolism without entering the nucleus.</li>
              </ul>
            </div>
            <div className="p-4 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Steroid & Thyroid Hormones</strong>
              <p>Lipid-soluble (e.g., Cortisol, Aldosterone, Testosterone, Estrogen, Thyroxine). Pass through phospholipid bilayers easily.</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Bind to intracellular or intranuclear receptors inside the target cell.</li>
                <li>The hormone-receptor complex binds directly to specific DNA regulatory elements.</li>
                <li>Directly alters gene expression, driving transcription of specific mRNA molecules and protein synthesis.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="2. Hypothalamic-Pituitary Axis & Feedback Loops" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-cyan-400 block uppercase">Hypothalamic-Pituitary Transport</strong>
              <p>
                <strong>Hypothalamus:</strong> Synthesizes releasing and inhibiting hormones (e.g., GnRH, Somatostatin, TRH).
              </p>
              <p>
                <strong>Anterior Pituitary (Adenohypophysis):</strong> Controlled by hypothalamic hormones delivered via the <strong className="text-emerald-400">hypophyseal portal veins</strong>. Secretes GH, TSH, ACTH, Prolactin, LH, FSH, MSH.
              </p>
              <p>
                <strong>Posterior Pituitary (Neurohypophysis):</strong> Direct axonal connection from hypothalamus. Stores and releases <strong className="text-emerald-400">ADH (Vasopressin)</strong> and <strong className="text-emerald-400">Oxytocin</strong> synthesized in hypothalamic nuclei.
              </p>
            </div>
            <div className="p-3.5 bg-black/35 rounded-xl border border-white/5 space-y-1.5">
              <strong className="text-rose-400 block uppercase">Hormonal Feedback Loops</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Negative Feedback (Most Common):</strong> Elevating target hormone levels inhibits releasing hormones at hypothalamus and pituitary levels (e.g., high T3/T4 inhibits TSH and TRH release).</li>
                <li><strong>Positive Feedback (Rare):</strong> Accumulation of target hormone stimulates more releasing hormone. Example: Oxytocin release during labor increases uterine contraction intensity, which stimulates further sensory signals and oxytocin release.</li>
              </ul>
            </div>
          </div>

          <SectionBanner label="3. Endocrine Glands Mapping" color="amber" />
          
          {/* Labeled Endocrine Glands SVG */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 520 200" className="w-full max-w-xl bg-black/40 rounded-2xl border border-white/5 p-4">
              <text x="260" y="20" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">MAJOR HUMAN ENDOCRINE GLANDS</text>
              
              {/* Human figure outline schematic */}
              <circle cx="120" cy="70" r="14" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="120" y1="84" x2="120" y2="150" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="120" y1="100" x2="90" y2="120" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="120" y1="100" x2="150" y2="120" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="120" y1="150" x2="105" y2="185" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="120" y1="150" x2="135" y2="185" stroke="#ffffff" strokeWidth="1.5" />
              
              {/* Mapping lines & Labels */}
              {/* Hypothalamus/Pituitary (Brain) */}
              <circle cx="120" cy="68" r="3" fill="#f43f5e" />
              <line x1="123" y1="68" x2="230" y2="55" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2" />
              <text x="235" y="58" fill="#f43f5e" fontSize="8" fontWeight="bold">Hypothalamus & Pituitary</text>
              
              {/* Pineal Gland */}
              <circle cx="123" cy="64" r="2" fill="#a78bfa" />
              <line x1="125" y1="64" x2="230" y2="75" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2" />
              <text x="235" y="78" fill="#a78bfa" fontSize="8" fontWeight="bold">Pineal Gland (Melatonin)</text>

              {/* Thyroid (Neck) */}
              <path d="M 115 82 L 125 82 L 120 87 Z" fill="#22d3ee" />
              <line x1="123" y1="84" x2="230" y2="95" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2" />
              <text x="235" y="98" fill="#22d3ee" fontSize="8" fontWeight="bold">Thyroid & Parathyroid (T3, T4, PTH)</text>

              {/* Thymus (Chest) */}
              <circle cx="120" cy="100" r="3.5" fill="#10b981" />
              <line x1="123" y1="100" x2="230" y2="115" stroke="#10b981" strokeWidth="1" strokeDasharray="2" />
              <text x="235" y="118" fill="#10b981" fontSize="8" fontWeight="bold">Thymus Gland (Thymosin)</text>

              {/* Adrenals & Pancreas (Abdomen) */}
              <circle cx="120" cy="120" r="3.5" fill="#eab308" />
              <line x1="123" y1="120" x2="230" y2="135" stroke="#eab308" strokeWidth="1" strokeDasharray="2" />
              <text x="235" y="138" fill="#eab308" fontSize="8" fontWeight="bold">Pancreas (Insulin) & Adrenals (Cortisol)</text>
            </svg>
          </div>

          <SectionBanner label="4. Key Glands, Hormone Details & Disorders" color="amber" />
          <ul className="list-disc pl-4 space-y-1.5 text-xs text-white/60">
            <li><strong>Thyroid Gland (T3/T4 & Calcitonin):</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li>Follicular cells synthesize T3 (triiodothyronine) and T4 (thyroxine) using iodine. Regulate basal metabolic rate (BMR).</li>
                <li><strong>Hypothyroidism:</strong> Simple goiter (enlargement of thyroid due to iodine deficiency), cretinism (infant hypothyroidism, causing stunted physical growth and mental retardation), myxedema (adult hypothyroidism, puffiness, lethargy).</li>
                <li><strong>Hyperthyroidism:</strong> Graves' disease (exophthalmic goiter, protrusion of eyeballs, weight loss, increased BMR).</li>
                <li><strong>Calcitonin:</strong> Peptide hormone lowering blood calcium levels (hypocalcemic).</li>
              </ul>
            </li>
            <li><strong>Parathyroid Gland (PTH):</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li>Secretes <strong className="text-emerald-400">Parathyroid Hormone (PTH)</strong>, a hypercalcemic hormone. Raises blood calcium by: promoting bone resorption (calcium demineralization), stimulating calcium reabsorption in renal tubules, and enhancing calcium absorption from digested food in intestines. Hyposecretion causes hypocalcemic tetany.</li>
              </ul>
            </li>
            <li><strong>Adrenal Gland (Cortex & Medulla):</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li><strong>Adrenal Medulla:</strong> Secretes Epinephrine (Adrenaline) and Norepinephrine (Noradrenaline). "Emergency/Fight-or-Flight" hormones; raise heart rate, alert levels, sweating, pupil dilation, glycogenolysis.</li>
                <li><strong>Adrenal Cortex:</strong> Divided into: (1) Zona glomerulosa (secrete mineralocorticoids like aldosterone, promoting Na⁺/water reabsorption in DCT), (2) Zona fasciculata (glucocorticoids like cortisol, promoting gluconeogenesis and acting as anti-inflammatory), (3) Zona reticularis (gonadocorticoids).</li>
                <li><strong>Adrenal Disorders:</strong> <strong className="text-emerald-400">Addison's Disease</strong> (hyposecretion of corticoids; severe fatigue, bronzing of skin, hypotension); <strong className="text-emerald-400">Cushing's Syndrome</strong> (hypersecretion; fat redeposition, "moon face", hypertension).</li>
              </ul>
            </li>
            <li><strong>Pancreas (Insulin & Glucagon):</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li>Islets of Langerhans: Alpha cells (Glucagon, hyperglycemic glycogenolysis); Beta cells (Insulin, hypoglycemic glucose uptake).</li>
                <li><strong>Diabetes Mellitus:</strong> Hyperglycemia, glycosuria (glucose in urine), polyuria, ketonuria. Type 1 is insulin-dependent (autoimmune destruction of beta cells). Type 2 is non-insulin-dependent (insulin resistance).</li>
              </ul>
            </li>
            <li><strong>Pineal & Thymus Glands:</strong>
              <ul className="list-circle pl-5 mt-0.5 space-y-0.5">
                <li><strong>Pineal:</strong> Secretes melatonin. Regulates 24-hour diurnal sleep-wake cycle, body temperature, pigmentation, and menstrual cycles.</li>
                <li><strong>Thymus:</strong> Secretes thymosins. Essential for cellular immunity (differentiation of T-lymphocytes) and humoral immunity (antibody production). Degenerates in old age.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="5. Hormones of Heart, Kidney & Gastrointestinal Tract" color="amber" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-white/60">
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1">
              <strong className="text-cyan-400 block uppercase">Atrial Natriuretic Factor (ANF)</strong>
              <p>
                Secreted by the atrial wall of the heart in response to elevated blood pressure. Causes vasodilation of blood vessels to decrease blood pressure, directly counteracting the vasoconstrictive effects of the renin-angiotensin (RAAS) system.
              </p>
            </div>
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1">
              <strong className="text-rose-400 block uppercase">Erythropoietin (EPO)</strong>
              <p>
                A peptide hormone secreted by juxtaglomerular (JG) cells of the kidney under hypoxic (low oxygen) conditions. Reaches the red bone marrow to stimulate <strong className="text-emerald-400">erythropoiesis</strong> (production of red blood cells).
              </p>
            </div>
            <div className="p-3 bg-black/35 rounded-xl border border-white/5 space-y-1">
              <strong className="text-emerald-400 block uppercase">GI Tract Hormones</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                <li><strong>Gastrin:</strong> Stimulates secretion of HCl and pepsinogen in stomach.</li>
                <li><strong>Secretin:</strong> Stimulates release of water and bicarbonate ions from pancreas.</li>
                <li><strong>Cholecystokinin (CCK):</strong> Stimulates release of pancreatic enzymes and bile juice from gallbladder.</li>
                <li><strong>GIP:</strong> Inhibits gastric secretion and motility.</li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ─── SECTION 8: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            8 · Human Physiology & Homeostasis Lab
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Subject oxyhemoglobin curves, ECG recordings, detrusor tissue, or muscle sarcomeres to metabolic triggers to study functional feedback loops.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('hbo2_curve')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'hbo2_curve' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Oxyhemoglobin curve
                </button>
                <button 
                  onClick={() => setSpecimen('ecg_cardiac')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'ecg_cardiac' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Cardiac Muscle (ECG)
                </button>
                <button 
                  onClick={() => setSpecimen('nephron_grad')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'nephron_grad' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Nephron Medullary System
                </button>
                <button 
                  onClick={() => setSpecimen('sarcomere_slide')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'sarcomere_slide' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Actin-Myosin Sarcomere
                </button>
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Select stimulus</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'co2_spike', label: 'Raise pCO2 / H+ concentration' },
                  { id: 'beta_blocker', label: 'Apply Beta-blocker drug' },
                  { id: 'block_adh', label: 'Block ADH secretion' },
                  { id: 'atp_depletion', label: 'Induce Cellular ATP depletion' },
                  { id: 'ach_blocker', label: 'Apply Acetylcholine blocker' }
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

      {/* ─── SECTION 9: CONCEPTUAL SOLVED PROBLEMS ─────────────────────────── */}
      <Collapsible title="9 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 font-sans text-[13px]">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Cardiac Output calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A patient has an end-diastolic volume of 120 mL and an end-systolic volume of 50 mL. If their heart rate is 75 beats per minute, calculate their total cardiac output."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Stroke Volume (SV) is the volume of blood pumped per beat, calculated as: SV = End-Diastolic Volume (EDV) - End-Systolic Volume (ESV)."}</div>
              <div>{"2. Substitute values: SV = 120 mL - 50 mL = 70 mL."}</div>
              <div>{"3. Cardiac Output (CO) is calculated as: CO = Heart Rate (HR) × Stroke Volume (SV)."}</div>
              <div>{"4. Substitute values: CO = 75 beats/min × 70 mL = 5250 mL/min (or 5.25 L/min)."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The cardiac output is 5250 mL/min.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Glomerular Net Filtration Pressure</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Given the Glomerular Hydrostatic Pressure is 60 mm Hg, Blood Colloidal Osmotic Pressure is 32 mm Hg, and Capsular Hydrostatic Pressure is 18 mm Hg, calculate the Net Filtration Pressure (NFP) driving ultrafiltration."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Ultrafiltration is driven by the balance of opposing pressures. The formula is: Net Filtration Pressure (NFP) = Glomerular Hydrostatic Pressure (GHP) - [Blood Colloidal Osmotic Pressure (BCOP) + Capsular Hydrostatic Pressure (CHP)]."}</div>
              <div>{"2. GHP favors filtration, while BCOP and CHP oppose it."}</div>
              <div>{"3. Substitute values: NFP = 60 - [32 + 18] = 60 - 50 = 10 mm Hg."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The Net Filtration Pressure is 10 mm Hg.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Oxygen transport calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Every 100 mL of oxygenated blood delivers approximately 5 mL of oxygen to tissue cells under normal conditions. If cardiac output is 5 Liters/min, calculate the total volume of oxygen delivered to tissues per minute."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Volume of oxygen delivered per 100 mL of blood = 5 mL."}</div>
              <div>{"2. Total blood flow (cardiac output) = 5 Liters/min = 5000 mL/min."}</div>
              <div>{"3. Calculate total oxygen delivered: (5000 mL / 100 mL) × 5 mL = 50 × 5 = 250 mL of oxygen per minute."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: 250 mL of oxygen is delivered to tissues per minute.</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Axial vs Appendicular Bone Counts</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An adult human skeleton is being cataloged. Calculate the total bone count of the axial skeleton and the appendicular skeleton, respectively, specifying the count of ribs and limb bones."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{renderBoldText("1. The adult human skeleton comprises 206 bones in total.")}</div>
              <div>{renderBoldText("2. The **axial skeleton contains 80 bones**: Skull (29), Vertebral column (26), Sternum (1), and **Ribs (24)**.")}</div>
              <div>{renderBoldText("3. The **appendicular skeleton contains 126 bones**: Pectoral girdle (4), Pelvic girdle (2), and **Limbs (120)** (30 bones per limb).")}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Axial skeleton is 80 bones (24 ribs); Appendicular skeleton is 126 bones (120 limb bones).</span>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: Neuronal Action Potential Refractory Period</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"If a neuron has an absolute refractory period of 2 milliseconds, calculate the maximum theoretical frequency at which it can transmit impulses per second."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{renderBoldText("1. During the **absolute refractory period**, voltage-gated sodium channels are inactivated and no new action potential can be generated, limiting the firing frequency.")}</div>
              <div>{renderBoldText("2. Period duration = 2 ms = 0.002 seconds.")}</div>
              <div>{renderBoldText("3. Maximum frequency = 1 / Refractory Period = 1 / 0.002 s = **500 impulses per second**.")}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The maximum theoretical impulse transmission frequency is 500 impulses/sec.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 10: PRACTICE MOCK TEST ────────────────────────────────── */}
      <Collapsible title="10 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your mastery of Human Physiology with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which gastric secretory cells produce intrinsic factor, and what is its physiological role?',
                a: 'Peptic cells; digests proteins',
                b: 'Parietal cells; essential for Vitamin B12 absorption',
                c: 'Chief cells; activates pepsinogen',
                d: 'Oxyntic cells; emulsifies lipids',
                ans: 'Correct Answer: B. Parietal (or oxyntic) cells secrete hydrochloric acid and intrinsic factor. Intrinsic factor is essential for Vitamin B12 absorption in the ileum.'
              },
              {
                q: 'Which of the following lung volumes or capacities CANNOT be measured using simple spirometry?',
                a: 'Tidal Volume (TV)',
                b: 'Vital Capacity (VC)',
                c: 'Inspiratory Reserve Volume (IRV)',
                d: 'Residual Volume (RV)',
                ans: 'Correct Answer: D. Residual Volume (RV) represents air that cannot be exhaled from the lungs, so it cannot be measured by a spirometer. Consequently, FRC and TLC also cannot be measured.'
              },
              {
                q: 'The Bohr Effect describes the shift of the oxyhemoglobin dissociation curve to the right, which is promoted by:',
                a: 'High pH, low temp, low pCO2',
                b: 'Low pH, high temp, high pCO2',
                c: 'High pH, high temp, low pCO2',
                d: 'Low pH, low temp, high pCO2',
                ans: 'Correct Answer: B. Curve shifts right (decreased oxygen affinity, promoting unloading) under low pH (high H+), elevated temperature, and high pCO2.'
              },
              {
                q: 'Erythroblastosis Fetalis is an Rh incompatibility condition occurring when:',
                a: 'An Rh-positive mother carries an Rh-negative fetus',
                b: 'An Rh-negative mother carries an Rh-positive fetus',
                c: 'Both mother and fetus are Rh-negative',
                d: 'Both mother and fetus are Rh-positive',
                ans: 'Correct Answer: B. Erythroblastosis fetalis occurs when an Rh-negative mother carries an Rh-positive fetus, leading to maternal anti-Rh antibodies crossing the placenta to attack fetal RBCs.'
              },
              {
                q: 'The end of the T-wave in a standard ECG represents:',
                a: 'The beginning of Atrial systole',
                b: 'The end of Ventricular systole',
                c: 'The beginning of Ventricular systole',
                d: 'The end of Ventricular diastole',
                ans: 'Correct Answer: B. The T-wave represents ventricular repolarization, and the end of the T-wave marks the end of ventricular systole.'
              },
              {
                q: 'Glomerular ultrafiltration is selective based primarily on:',
                a: 'Hormonal signals only',
                b: 'Molecular size and charge',
                c: 'Lipid solubility only',
                d: 'The level of urea in blood',
                ans: 'Correct Answer: B. Ultrafiltration is a selective filtration process where blood cells and large proteins are retained based on size and charge, while smaller solutes pass freely into Bowman\'s capsule.'
              },
              {
                q: 'During muscle contraction, which of the following bands shortens, and which remains constant in length?',
                a: 'A-band shortens; I-band remains constant',
                b: 'I-band shortens; A-band remains constant',
                c: 'Both A and I bands shorten',
                d: 'Both A and I bands remain constant',
                ans: 'Correct Answer: B. During contraction, the I-band and H-zone shorten, while the dark A-band remains constant in length.'
              },
              {
                q: 'In a resting neuron, the resting membrane potential of -70 mV is actively maintained by:',
                a: 'Passive leakage of sodium only',
                b: 'The Na+/K+ ATPase pump',
                c: 'Efflux of large proteins',
                d: 'Opening of voltage-gated calcium channels',
                ans: 'Correct Answer: B. The active Na+/K+ ATPase pump (3 Na+ out / 2 K+ in) maintains the resting concentration gradients across the neuronal membrane.'
              },
              {
                q: 'The point of greatest visual acuity on the retina is the:',
                a: 'Blind spot',
                b: 'Fovea centralis',
                c: 'Optic disc',
                d: 'Sclera',
                ans: 'Correct Answer: B. The fovea centralis is a thinned-out depression on the retina containing cones only, which provides the highest visual resolution.'
              },
              {
                q: 'Which hormone is hypercalcemic, directly raising blood calcium levels?',
                a: 'Calcitonin',
                b: 'Parathyroid Hormone (PTH)',
                c: 'Thyroxine',
                d: 'Aldosterone',
                ans: 'Correct Answer: B. Parathyroid Hormone (PTH) increases blood calcium levels (hypercalcemic), opposing calcitonin.'
              },
              {
                q: 'Which inorganic ion is essential for multiple stages of the blood clotting cascade, particularly the conversion of prothrombin to thrombin?',
                a: 'Iron (Fe2+)',
                b: 'Sodium (Na+)',
                c: 'Calcium (Ca2+)',
                d: 'Magnesium (Mg2+)',
                ans: 'Correct Answer: C. Calcium ions (Factor IV) are crucial cofactors required in both intrinsic and extrinsic clotting pathways, including the activation of prothrombin to thrombin.'
              },
              {
                q: 'Stimulation of the vagus nerve (parasympathetic division) results in which of the following cardiac changes?',
                a: 'Release of noradrenaline, increasing heart rate',
                b: 'Release of acetylcholine, decreasing heart rate and conduction speed',
                c: 'Increased ventricular contraction strength',
                d: 'Epinephrine secretion, accelerating depolarization',
                ans: 'Correct Answer: B. The vagus nerve releases acetylcholine, which binds to muscarinic receptors to decrease SA node firing rate and slow conduction velocity.'
              },
              {
                q: 'Which anatomical feature distinguishes juxtamedullary nephrons from cortical nephrons?',
                a: 'A longer Loop of Henle dipping deep into the medulla, with well-developed vasa recta',
                b: 'Glomeruli located in the outer renal cortex only',
                c: 'Absence of the Distal Convoluted Tubule (DCT)',
                d: 'Higher abundance, comprising 85% of total kidney nephrons',
                ans: 'Correct Answer: A. Juxtamedullary nephrons (15%) have long loops of Henle dipping deep into the medulla with well-developed vasa recta to facilitate concentrated urine production.'
              },
              {
                q: 'What is the correct human vertebral formula representing cervical, thoracic, lumbar, sacral, and coccygeal vertebrae?',
                a: 'C7 T12 L5 S(5) Co(4)',
                b: 'C5 T10 L7 S(4) Co(5)',
                c: 'C7 T12 L5 S5 Co4',
                d: 'C8 T12 L5 S(5) Co(4)',
                ans: 'Correct Answer: A. The human vertebral column is represented as C7 (cervical), T12 (thoracic), L5 (lumbar), S(5) (sacral, fused), and Co(4) (coccygeal, fused).'
              },
              {
                q: 'During the depolarization phase of a neuronal action potential, which channel behavior is responsible for the voltage spike to +30 mV?',
                a: 'Opening of voltage-gated potassium channels causing K+ efflux',
                b: 'Opening of voltage-gated sodium channels causing rapid Na+ influx',
                c: 'Activation of the Na+/K+ ATPase pump pumping sodium out',
                d: 'Opening of ligand-gated chloride channels causing hyperpolarization',
                ans: 'Correct Answer: B. Depolarization is caused by the rapid opening of voltage-gated Na+ channels, allowing sodium ions to flow down their concentration gradient into the cell.'
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
        <span className="text-[11px] text-white/30 font-mono">Human Physiology · Unit 5</span>
      </div>

    </div>
  );
}
