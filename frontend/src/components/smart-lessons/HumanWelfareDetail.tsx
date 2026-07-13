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

export default function HumanWelfareDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'patient_serum' | 'wastewater' | 'biogas_slurry' | 'crop_pest'>('patient_serum');
  const [treatment, setTreatment] = useState<'elisa_test' | 'bod_measure' | 'methanogens' | 'bt_biocontrol'>('elisa_test');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    if (treatment === 'elisa_test' && specimen === 'patient_serum') {
      return {
        outcome: 'ELISA Test Result: Positive (Antigen-Antibody complex formed)',
        color: 'text-violet-400',
        visualEffect: 'Patient serum reacted with HIV antigens coated on microtiter wells. Alkaline phosphatase conjugate added, substrate changed to yellow.',
        product: 'Yellow colored product; Absorbance read at 405 nm',
        explanation: 'Enzyme-Linked Immunosorbent Assay (ELISA) is the primary screening diagnostic test for HIV. It relies on the principle of antigen-antibody interactions. If the patient has HIV antibodies, they bind to the coated antigens. A secondary enzyme-linked antibody then binds, triggering a colored product on substrate addition.',
        trap: 'ELISA is a screening test with high sensitivity but potential false positives. A **Western blot** or PCR-based viral load test is required for definitive confirmation.'
      };
    }

    if (treatment === 'bod_measure' && specimen === 'wastewater') {
      return {
        outcome: 'Biochemical Oxygen Demand (BOD) Evaluation',
        color: 'text-cyan-400',
        visualEffect: 'Oxygen consumption by aerobic micro-organisms measured over 5 days at 20°C.',
        product: 'BOD = 380 mg/L (High organic load / High pollution)',
        explanation: 'BOD measures the amount of oxygen required by bacteria to oxidize the organic matter in one liter of water. A high BOD value indicates high organic pollution and low dissolved oxygen. Secondary sewage treatment is continued until the BOD of the effluent is significantly reduced.',
        trap: 'BOD is directly proportional to the organic pollution index of water. Clean drinking water has a BOD < 1 mg/L, whereas raw sewage can have a BOD of 100-400 mg/L.'
      };
    }

    if (treatment === 'methanogens' && specimen === 'biogas_slurry') {
      return {
        outcome: 'Anaerobic Slurry Digestion & Biogas Production',
        color: 'text-amber-400',
        visualEffect: 'Methanobacterium fermenting cellulose under anaerobic conditions inside the concrete digester tank.',
        product: 'Biogas (approx. 55% Methane CH4, 30% CO2, and traces of H2S / H2)',
        explanation: 'Methanogens are anaerobic bacteria commonly found in the rumen of cattle and in anaerobic sludge. They digest cellulose and organic wastes to produce biogas. The spent slurry is removed through another outlet and used as excellent organic biofertiliser.',
        trap: 'Biogas contains primarily Methane (CH4) and Carbon Dioxide (CO2), not pure Hydrogen or pure Oxygen. The dome cover rises as gas accumulates.'
      };
    }

    if (treatment === 'bt_biocontrol' && specimen === 'crop_pest') {
      return {
        outcome: 'Bt-Toxin Activation & Larval Midgut Cell Lysis',
        color: 'text-emerald-400',
        visualEffect: 'Insect pest (lepidopteran larva) ingests inactive crystalline protoxin from Bacillus thuringiensis.',
        product: 'Activated Cry toxin; gut membrane pore formation',
        explanation: 'In the alkaline pH of the insect midgut, the inactive Bt crystalline protoxin is solubilized and cleaved into its active toxic form. It binds to epithelial receptors, creating pores that cause cell swelling, lysis, and starvation-induced death of the pest.',
        trap: 'Bt toxin does not harm mammals or humans because the mammalian stomach is highly acidic (which keeps the toxin inactive) and lacks the specific epithelial receptors.'
      };
    }

    return {
      outcome: 'No specific biological reaction occurred. Reagent does not match the specimen.',
      color: 'text-zinc-400',
      visualEffect: 'Specimen remains unchanged.',
      product: 'None',
      explanation: 'Try matching the correct specimen with its diagnostic or chemical stimulus.',
      trap: 'Ensure matching biological specimens with their designated chemical or micro-organism treatments.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white human-welfare-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .human-welfare-chapter .text-xs { font-size: 13px !important; }
        .human-welfare-chapter .text-sm { font-size: 15px !important; }
        .human-welfare-chapter .text-base { font-size: 17.5px !important; }
        .human-welfare-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .human-welfare-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .human-welfare-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .human-welfare-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .human-welfare-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 8</Tag>
            <Tag color="rose">High Yield</Tag>
            <Tag color="violet">Human Welfare</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Biology in Human Welfare: <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Health, Pathology & Applied Microbes</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Complete syllabus-aligned guide covering common pathogens, innate and acquired immunity, HIV replication cycles, cancer properties, drug classifications, sewage stages, and biogas biochemistry.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: HUMAN HEALTH AND DISEASE ────────────────────────────── */}
      <Collapsible title="1 · Human Health and Disease" icon={<Atom className="w-4 h-4" />} accent="violet" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Common Human Diseases & Pathogens" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Disease</th>
                  <th className="p-2.5 text-violet-400">Pathogen Type</th>
                  <th className="p-2.5 text-cyan-400">Transmission & Symptoms</th>
                  <th className="p-2.5 text-emerald-400">Key Diagnostic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">Typhoid</td>
                  <td className="p-2.5 text-violet-400 font-mono">Salmonella typhi (Bacterium)</td>
                  <td className="p-2.5">Contaminated food/water. Symptoms: sustained high fever (39-40°C), stomach pain, constipation, headache, intestinal perforation in severe cases.</td>
                  <td className="p-2.5 text-emerald-400 font-mono font-bold">Widal Test</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Pneumonia</td>
                  <td className="p-2.5 text-violet-400 font-mono">Streptococcus pneumoniae (Bacterium)</td>
                  <td className="p-2.5">Aerosols/droplets from infected person. Symptoms: alveoli get filled with fluid, fever, chills, cough, gray-to-bluish lips/fingernails.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Sputum / X-Ray</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Common Cold</td>
                  <td className="p-2.5 text-violet-400 font-mono">Rhinoviruses (Virus)</td>
                  <td className="p-2.5">Nasal droplets, contaminated objects. Affects nose and respiratory passage (not lungs). Lasts 3-7 days. Nasal congestion, sore throat.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Clinical evaluation</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Amebiasis</td>
                  <td className="p-2.5 text-violet-400 font-mono">Entamoeba histolytica (Protozoan)</td>
                  <td className="p-2.5">Houseflies act as mechanical carriers. Contaminated food/water. Symptoms: constipation, abdominal pain, stools with excess mucus and blood clots.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Stool microscopy</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Ascariasis</td>
                  <td className="p-2.5 text-violet-400 font-mono">Ascaris lumbricoides (Helminth)</td>
                  <td className="p-2.5">Eggs of parasite excreted with feces contaminate soil/water. Symptoms: internal bleeding, muscular pain, fever, anemia, intestinal passage blockage.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Stool analysis</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Elephantiasis</td>
                  <td className="p-2.5 text-violet-400 font-mono">Wuchereria bancrofti / malayi</td>
                  <td className="p-2.5">Bite of female Culex mosquito vector. Symptoms: chronic inflammation and swelling of lymphatic vessels of lower limbs and genital organs.</td>
                  <td className="p-2.5 text-emerald-400 font-mono font-bold">Blood smear (night)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Ringworm</td>
                  <td className="p-2.5 text-violet-400 font-mono">Microsporum / Trichophyton</td>
                  <td className="p-2.5">From soil or using towels/combs of infected person. Symptoms: dry, scaly lesions on skin, nails, scalp with intense itching. Thrives in heat/moisture.</td>
                  <td className="p-2.5 text-emerald-400 font-mono">Skin scraping</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="2. Plasmodium (Malaria) Life Cycle" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Infective Stage:</strong> Plasmodium enters the human body as <strong className="text-zinc-500">sporozoites</strong> through the bite of an infected female Anopheles mosquito.</li>
            <li><strong>Liver Stage (Asexual):</strong> Sporozoites migrate to liver cells, reproduce asexually, and burst the cells to release <strong className="text-zinc-500">merozoites</strong>.</li>
            <li><strong>Erythrocytic Stage (Asexual):</strong> Merozoites infect Red Blood Cells (RBCs), reproducing asexually. The rupture of RBCs releases a toxic substance called <strong className="text-emerald-400">hemozoin</strong>, which causes recurring chills and high fever every 3 to 4 days.</li>
            <li><strong>Sexual Reproduction Stage:</strong> Gametocytes (sexual stages) develop in human RBCs. They are taken up by a female Anopheles mosquito during a blood meal. <strong className="text-zinc-500">Fertilization and development</strong> take place in the <strong className="text-zinc-500">mosquito gut</strong>. Mature infective sporozoites escape the gut and migrate to the <strong className="text-zinc-500">mosquito salivary glands</strong>.</li>
          </ul>

          {/* SVG 1: Plasmodium Life Cycle */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 460 220" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="230" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">PLASMODIUM LIFE CYCLE SCHEMA</text>
              
              {/* Mosquito Bite -> Sporozoites */}
              <g transform="translate(10, 40)">
                <rect x="10" y="10" width="80" height="40" rx="5" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="50" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">Mosquito Bite</text>
                <text x="50" y="40" fill="#22d3ee" fontSize="7" textAnchor="middle">Sporozoites (n)</text>
              </g>

              {/* Arrow to Liver */}
              <path d="M 100 50 L 130 65" stroke="#ffffff" strokeWidth="1.5" />

              {/* Liver Stage */}
              <g transform="translate(140, 50)">
                <rect x="10" y="10" width="80" height="40" rx="5" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="50" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">Liver Cells</text>
                <text x="50" y="40" fill="#a78bfa" fontSize="7" textAnchor="middle">Asexual division</text>
              </g>

              {/* Arrow to RBCs */}
              <path d="M 230 70 L 260 85" stroke="#ffffff" strokeWidth="1.5" />

              {/* RBC Stage */}
              <g transform="translate(270, 70)">
                <rect x="10" y="10" width="90" height="45" rx="5" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="55" y="25" fill="#ffffff" fontSize="7" textAnchor="middle">RBC Infection</text>
                <text x="55" y="35" fill="#f43f5e" fontSize="7" textAnchor="middle">Hemozoin Release</text>
                <text x="55" y="45" fill="#f43f5e" fontSize="6" textAnchor="middle">(Chills & Fever)</text>
              </g>

              {/* Arrow to mosquito gut */}
              <path d="M 370 92 L 390 110 L 280 160" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3" />

              {/* Mosquito Gut Fertilization */}
              <g transform="translate(160, 140)">
                <rect x="10" y="10" width="100" height="40" rx="5" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                <text x="60" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">Mosquito Gut</text>
                <text x="60" y="40" fill="#10b981" fontSize="7" textAnchor="middle">Fertilization (2n)</text>
              </g>

              {/* Loop back to start */}
              <path d="M 160 160 L 50 160 L 50 95" stroke="#ffffff" strokeWidth="1.5" />
              <text x="95" y="152" fill="#22d3ee" fontSize="7">Sporozoites to Salivary Glands</text>
            </svg>
          </div>

          <SectionBanner label="3. Immune System: Innate & Acquired" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Innate Immunity (Non-specific, present at birth):</strong> Has four major barrier types:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Physical Barriers:</strong> Skin (keratinized outer layer) and mucus coating of respiratory, gastrointestinal, and urogenital tracts.</li>
                <li><strong>Physiological Barriers:</strong> Acid in the stomach, saliva in the mouth, and tears from eyes (contain lysozyme).</li>
                <li><strong>Cellular Barriers:</strong> Phagocytic white blood cells like polymorphonuclear leukocytes (<strong className="text-zinc-500">PMNL-neutrophils</strong>), monocytes, natural killer (NK) cells, and tissue macrophages.</li>
                <li><strong>Cytokine Barriers:</strong> Virus-infected cells secrete proteins called <strong className="text-emerald-400">interferons</strong> which protect adjacent non-infected cells from viral replication.</li>
              </ul>
            </li>
            <li><strong>Acquired Immunity (Pathogen-specific, memory-driven):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Primary Response:</strong> First encounter with a pathogen. Low intensity and slow onset.</li>
                <li><strong>Secondary (Anamnestical) Response:</strong> Subsequent encounter with the same pathogen. Highly intensified and rapid due to immunological memory.</li>
                <li><strong>Humoral Immune Response:</strong> B-lymphocytes produce a swarm of <strong className="text-zinc-500">antibodies</strong> (<InlineMath math="H_2L_2" />) into blood/lymph plasma to neutralize extracellular pathogens.</li>
                <li><strong>Cell-Mediated Immunity (CMI):</strong> Mediated by <strong className="text-zinc-500">T-lymphocytes</strong> (specifically Helper T and Cytotoxic T-cells). Responsible for <strong className="text-zinc-500">graft rejection</strong> (recognition of non-self tissue MHC antigens).</li>
              </ul>
            </li>
            <li><strong>Active vs. Passive Immunity:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Active:</strong> Host body produces its own antibodies in response to antigen exposure. Slow, but long-lasting (e.g., natural infection or active vaccine).</li>
                <li><strong>Passive:</strong> Readymade antibodies are directly introduced. Fast, but temporary. Examples: <strong className="text-zinc-500">IgA</strong> in initial yellow breast milk (<strong className="text-zinc-500">colostrum</strong>), and <strong className="text-zinc-500">IgG</strong> crossing the placenta to the fetus.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 2: Antibody Structure */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 200" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">ANTIBODY MOLECULE STRUCTURE (IgG)</text>
              
              {/* Heavy Chains in purple */}
              <path d="M 140 160 L 140 80 L 110 50" fill="none" stroke="#a78bfa" strokeWidth="4.5" />
              <path d="M 170 160 L 170 80 L 200 50" fill="none" stroke="#a78bfa" strokeWidth="4.5" />
              
              {/* Light Chains in green */}
              <path d="M 120 110 L 120 85 L 90 55" fill="none" stroke="#10b981" strokeWidth="3" />
              <path d="M 190 110 L 190 85 L 220 55" fill="none" stroke="#10b981" strokeWidth="3" />

              {/* Disulfide bonds */}
              <line x1="140" y1="90" x2="170" y2="90" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="140" y1="95" x2="170" y2="95" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="120" y1="90" x2="140" y2="90" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="170" y1="90" x2="190" y2="90" stroke="#f59e0b" strokeWidth="1.5" />

              {/* Labels */}
              <text x="80" y="45" fill="#10b981" fontSize="8">Light Chain</text>
              <text x="230" y="45" fill="#a78bfa" fontSize="8">Heavy Chain</text>
              <text x="155" y="38" fill="#ffffff" fontSize="7" textAnchor="middle">Antigen Binding Sites</text>
              <text x="155" y="115" fill="#f59e0b" fontSize="8" textAnchor="middle">Disulfide Bonds (-S-S-)</text>
            </svg>
          </div>

          {/* SVG 2B: Primary vs. Secondary Titer Curve */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 160" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">PRIMARY VS. SECONDARY IMMUNE TITER</text>
              
              {/* Axes */}
              <line x1="40" y1="130" x2="360" y2="130" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="40" y1="30" x2="40" y2="130" stroke="#ffffff" strokeWidth="1.2" />
              <text x="200" y="145" fill="#ffffff" fontSize="8" textAnchor="middle">Time (Days)</text>
              <text x="15" y="80" fill="#ffffff" fontSize="8" transform="rotate(-90 15 80)" textAnchor="middle">Antibody Titer</text>
              
              {/* Primary Curve */}
              <path d="M 40 130 C 60 130, 80 90, 100 100 T 140 130" fill="none" stroke="#60a5fa" strokeWidth="2" />
              {/* Secondary Curve */}
              <path d="M 170 130 C 190 130, 200 40, 220 50 T 260 130" fill="none" stroke="#f43f5e" strokeWidth="2" />
              
              {/* Exposure arrows */}
              <line x1="40" y1="130" x2="40" y2="120" stroke="#eab308" strokeWidth="1.5" />
              <polygon points="40,118 38,122 42,122" fill="#eab308" />
              <text x="45" y="115" fill="#eab308" fontSize="7">1st Exposure</text>

              <line x1="170" y1="130" x2="170" y2="120" stroke="#eab308" strokeWidth="1.5" />
              <polygon points="170,118 168,122 172,122" fill="#eab308" />
              <text x="175" y="115" fill="#eab308" fontSize="7">2nd Exposure</text>

              <text x="90" y="85" fill="#60a5fa" fontSize="8" textAnchor="middle">Primary Response</text>
              <text x="240" y="42" fill="#f43f5e" fontSize="8" textAnchor="middle">Secondary Response</text>
            </svg>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs mt-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Vaccine Class</th>
                  <th className="p-2.5 text-cyan-400">Mechanism & Features</th>
                  <th className="p-2.5 text-emerald-400">Examples</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">Live Attenuated</td>
                  <td className="p-2.5">Uses weakened live pathogen. Excellent long-term protection; mimics natural infection.</td>
                  <td className="p-2.5 text-emerald-400"><strong className="text-zinc-500">BCG</strong> (Tuberculosis), <strong className="text-zinc-500">OPV Sabin</strong> (Polio), <strong className="text-zinc-500">MMR</strong> (Measles/Mumps/Rubella)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Killed / Inactivated</td>
                  <td className="p-2.5">Uses heat/chemical-killed pathogen. Safer, but may require booster doses.</td>
                  <td className="p-2.5 text-emerald-400"><strong className="text-zinc-500">Salk Polio</strong> (IPV), <strong className="text-zinc-500">Rabies</strong>, <strong className="text-zinc-500">Typhoid</strong></td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Toxoids</td>
                  <td className="p-2.5">Uses inactivated bacterial toxins (toxoids) to elicit neutralizing antibodies.</td>
                  <td className="p-2.5 text-emerald-400"><strong className="text-zinc-500">Tetanus toxoid</strong>, <strong className="text-zinc-500">Diphtheria</strong></td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Recombinant Subunit</td>
                  <td className="p-2.5">Uses antigen proteins produced via recombinant DNA technology in hosts like yeast.</td>
                  <td className="p-2.5 text-emerald-400"><strong className="text-zinc-500">Hepatitis B vaccine</strong> (produced in yeast), <strong className="text-zinc-500">HPV vaccine</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionBanner label="4. Immune System Tissues & Disorders" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Primary Lymphoid Organs:</strong> <strong className="text-zinc-500">Bone marrow</strong> and <strong className="text-zinc-500">Thymus</strong>. Sites where immature lymphocytes differentiate and mature into antigen-sensitive lymphocytes.</li>
            <li><strong>Secondary Lymphoid Organs:</strong> <strong className="text-zinc-500">Spleen</strong> (filters blood, reservoir of erythrocytes), <strong className="text-zinc-500">lymph nodes</strong> (trap micro-organisms), <strong className="text-zinc-500">tonsils</strong>, <strong className="text-zinc-500">Peyer&apos;s patches</strong> of small intestine, and <strong className="text-zinc-500">MALT (Mucosal-Associated Lymphoid Tissue)</strong> which constitutes about <strong className="text-zinc-500">50%</strong> of lymphoid tissue in the human body.</li>
            <li><strong>Allergic Response:</strong> Hypersensitive immune reaction to environmental antigens (allergens like pollen, dust mites).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Mediated primarily by <strong className="text-emerald-400">IgE</strong> antibodies.</li>
                <li>Allergen cross-linking on IgE triggers <strong className="text-zinc-500">Mast cells</strong> to degranulate and release inflammatory chemicals like <strong className="text-zinc-500">histamine</strong> and <strong className="text-zinc-500">serotonin</strong>.</li>
                <li>Symptoms: sneezing, watery eyes, running nose, breathing difficulties. Treated with antihistamines, adrenaline, and steroids.</li>
              </ul>
            </li>
            <li><strong>Autoimmunity:</strong> Abnormal state where the body&apos;s immune system loses self-tolerance and attacks its own cells. Example: <strong className="text-zinc-500">Rheumatoid arthritis</strong>.</li>
          </ul>

          {/* SVG 3: Allergic Degranulation */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 160" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">ALLERGIC MAST CELL DEGRANULATION</text>
              
              {/* Mast Cell Body */}
              <circle cx="120" cy="90" r="35" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              
              {/* IgE receptors on membrane */}
              <path d="M 120 55 L 120 45" stroke="#fb7185" strokeWidth="2" />
              <path d="M 150 75 L 158 70" stroke="#fb7185" strokeWidth="2" />
              
              {/* Allergens binding */}
              <circle cx="120" cy="40" r="3" fill="#eab308" />
              
              {/* Granules releasing */}
              <circle cx="150" cy="110" r="4" fill="#ef4444" />
              <circle cx="165" cy="120" r="4" fill="#ef4444" />
              <circle cx="180" cy="115" r="4" fill="#ef4444" />

              {/* Labels */}
              <text x="120" y="93" fill="#ffffff" fontSize="8" textAnchor="middle">Mast Cell</text>
              <text x="210" y="115" fill="#ef4444" fontSize="8">Histamine & Serotonin</text>
              <text x="210" y="45" fill="#fb7185" fontSize="8">IgE Antibodies</text>
            </svg>
          </div>

          <SectionBanner label="5. AIDS (Acquired Immuno Deficiency Syndrome)" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Pathogen:</strong> Retrovirus named <strong className="text-zinc-500">Human Immunodeficiency Virus (HIV)</strong>. Possesses an envelope enclosing two identical single-stranded RNA genomes and <strong className="text-zinc-500">reverse transcriptase</strong> enzymes.</li>
            <li><strong>Replication Cycle in Host helper T-cells:</strong>
              <p className="font-mono mt-1 text-[11px] bg-black/30 p-2 rounded border border-white/5 text-emerald-400">
                HIV binding ➔ Viral RNA entry ➔ Reverse Transcription (Viral DNA synthesized) ➔ Integration into host genome ➔ Transcription of viral mRNA ➔ Translation & assembly ➔ Budding and lysis of Helper T-cells
              </p>
            </li>
            <li><strong>Immune Collapse:</strong> Over time, the helper T-cell (<InlineMath math="T_H" />) count drops drastically, leaving the patient vulnerable to opportunistic pathogens like *Mycobacterium*, Toxoplasma, viruses, and fungi.</li>
          </ul>

          {/* SVG 4: HIV replication */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 180" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">HIV REPLICATION IN HELPER T-CELL</text>
              
              {/* Helper T Cell Outline */}
              <path d="M 60 140 C 60 70, 360 70, 360 140 Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
              
              {/* HIV Virion entering */}
              <circle cx="90" cy="50" r="10" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
              <path d="M 90 60 L 95 85" stroke="#ffffff" strokeWidth="1.5" />
              
              {/* Reverse transcriptase */}
              <rect x="120" y="90" width="80" height="20" rx="3" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              <text x="160" y="102" fill="#10b981" fontSize="7" textAnchor="middle">Reverse Transcriptase</text>

              {/* Host Nucleus */}
              <circle cx="270" cy="115" r="22" fill="#3b0764" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="270" y="118" fill="#ffffff" fontSize="7" textAnchor="middle">Nucleus</text>

              {/* Labels */}
              <text x="130" y="45" fill="#f43f5e" fontSize="8">Viral RNA enters</text>
              <text x="320" y="80" fill="#a78bfa" fontSize="8">Viral DNA integrates</text>
            </svg>
          </div>

          <SectionBanner label="6. Cancer: Properties & Treatments" color="violet" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Key Properties of Cancer Cells:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Loss of Contact Inhibition:</strong> Normal cells stop dividing when they make contact with other cells. Cancer cells lose this property, dividing continuously to form tumors.</li>
                <li><strong>Metastasis:</strong> Cells sloughed from malignant tumors reach distant sites via blood/lymph, starting new tumors. This is the most feared property of cancer.</li>
              </ul>
            </li>
            <li><strong>Causes (Carcinogens):</strong> Physical (ionizing radiations like X-rays, non-ionizing like UV), chemical (tobacco smoke, soot), and biological agents (oncogenic viruses containing viral oncogenes, or activation of cellular proto-oncogenes to active oncogenes).</li>
            <li><strong>Cancer Detection & Diagnosis:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Biopsy & Histopathological Studies:</strong> Definitive test. A piece of suspected tissue is cut into thin sections, stained, and examined under a microscope by a pathologist.</li>
                <li><strong>Imaging Techniques:</strong> Radiography (using X-rays), <strong className="text-zinc-500">CT (Computed Tomography)</strong> scan using X-rays to generate a 3D image of internals, and <strong className="text-zinc-500">MRI (Magnetic Resonance Imaging)</strong> scan using strong magnetic fields and non-ionizing radiation to safely detect pathological/physiological changes.</li>
                <li><strong>Immunological/Antibody Detection:</strong> Utilizing monoclonal antibodies directed against tumor-specific antigens.</li>
                <li><strong>Molecular Biology:</strong> DNA probes used to identify specific oncogenes or inherited genetic susceptibility.</li>
              </ul>
            </li>
            <li><strong>Therapy Methods:</strong> Surgery, radiation therapy (selective irradiation of tumor), chemotherapy, and immunotherapy (administration of biological response modifiers like <strong className="text-emerald-400"><InlineMath math="\\alpha" />-interferon</strong> which activates the immune system to destroy the tumor).</li>
          </ul>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs mt-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Feature</th>
                  <th className="p-2.5 text-cyan-400">Benign Tumor</th>
                  <th className="p-2.5 text-rose-400">Malignant Tumor (Cancer)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">Localization</td>
                  <td className="p-2.5">Remains confined to original site. Does not spread.</td>
                  <td className="p-2.5 text-rose-400">Invades surrounding tissues and metastasizes to distant organs.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Growth Rate</td>
                  <td className="p-2.5">Slow growth; mass is usually encapsulated.</td>
                  <td className="p-2.5 text-rose-400">Rapid growth; unencapsulated with invasive margins.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Cellular Features</td>
                  <td className="p-2.5">Well-differentiated, normal nucleus-to-cytoplasm ratio.</td>
                  <td className="p-2.5 text-rose-400">Anaplastic (poorly differentiated), high nucleus-to-cytoplasm ratio.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SVG 3B: Cancer Biopsy Cell Comparison */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 140" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold" textAnchor="middle">HISTOPATHOLOGY: NORMAL VS. CANCER CELLS</text>
              
              <g transform="translate(40, 35)">
                <rect x="0" y="0" width="130" height="80" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="65" y="15" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Normal / Benign</text>
                <circle cx="25" cy="35" r="8" fill="#1e293b" stroke="#10b981" />
                <circle cx="25" cy="35" r="3" fill="#a78bfa" />
                <circle cx="65" cy="35" r="8" fill="#1e293b" stroke="#10b981" />
                <circle cx="65" cy="35" r="3" fill="#a78bfa" />
                <circle cx="105" cy="35" r="8" fill="#1e293b" stroke="#10b981" />
                <circle cx="105" cy="35" r="3" fill="#a78bfa" />

                <circle cx="25" cy="60" r="8" fill="#1e293b" stroke="#10b981" />
                <circle cx="25" cy="60" r="3" fill="#a78bfa" />
                <circle cx="65" cy="60" r="8" fill="#1e293b" stroke="#10b981" />
                <circle cx="65" cy="60" r="3" fill="#a78bfa" />
                <circle cx="105" cy="60" r="8" fill="#1e293b" stroke="#10b981" />
                <circle cx="105" cy="60" r="3" fill="#a78bfa" />
              </g>

              <g transform="translate(230, 35)">
                <rect x="0" y="0" width="130" height="80" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="65" y="15" fill="#f43f5e" fontSize="8" fontWeight="bold" textAnchor="middle">Malignant (Cancer)</text>
                <path d="M 20 30 Q 30 25, 35 40 T 15 45 Z" fill="#312e81" stroke="#f43f5e" />
                <circle cx="26" cy="35" r="6" fill="#ef4444" />
                
                <path d="M 55 35 Q 70 30, 75 45 T 50 50 Z" fill="#312e81" stroke="#f43f5e" />
                <circle cx="63" cy="42" r="7" fill="#ef4444" />

                <path d="M 90 25 Q 110 30, 105 45 T 85 45 Z" fill="#312e81" stroke="#f43f5e" />
                <circle cx="98" cy="35" r="7" fill="#ef4444" />

                <path d="M 30 65 Q 40 55, 45 70 T 25 75 Z" fill="#312e81" stroke="#f43f5e" />
                <circle cx="36" cy="66" r="6" fill="#ef4444" />
              </g>
            </svg>
          </div>

          <SectionBanner label="7. Drug & Alcohol Abuse Classifications" color="violet" />
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#090b16]/60 text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono bg-[#0c0d1e]">
                  <th className="p-2.5">Drug Group</th>
                  <th className="p-2.5 text-violet-400">Biological Target Receptors</th>
                  <th className="p-2.5 text-cyan-400">Source Organism</th>
                  <th className="p-2.5 text-emerald-400">Physiological Effect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold">Opioids (Morphine, Heroin)</td>
                  <td className="p-2.5 font-mono">CNS & Gastrointestinal tract receptors</td>
                  <td className="p-2.5 font-italic">Papaver somniferum (Poppy plant latex)</td>
                  <td className="p-2.5 text-emerald-400">Depressants; slow down body functions. Heroin is diacetylmorphine (white, odorless, bitter crystalline compound).</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Cannabinoids</td>
                  <td className="p-2.5 font-mono">Cannabinoid receptors in the brain</td>
                  <td className="p-2.5 font-italic">Cannabis sativa inflorescences</td>
                  <td className="p-2.5 text-emerald-400">Effects on cardiovascular system. Taken by inhalation or oral ingestion.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Coca Alkaloids (Cocaine)</td>
                  <td className="p-2.5 font-mono">Interferes with dopamine neurotransmitter transport</td>
                  <td className="p-2.5 font-italic">Erythroxylum coca</td>
                  <td className="p-2.5 text-emerald-400">CNS stimulant; produces euphoria and increased energy. Excessive dosage causes strong hallucinations.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Hallucinogens</td>
                  <td className="p-2.5 font-mono">Serotonergic and CNS pathways</td>
                  <td className="p-2.5 font-italic">Atropa belladonna, Datura, LSD from Claviceps purpurea</td>
                  <td className="p-2.5 text-emerald-400">Alters perceptions, thoughts, and feelings. Used in medicine to treat insomnia/depression but highly abused.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs mt-3">
            <li><strong>Tobacco Abuse & Nicotine Effects:</strong> Tobacco contains chemical substances including <strong className="text-zinc-500">nicotine</strong> (an alkaloid).
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Nicotine stimulates the <strong className="text-zinc-500">adrenal gland</strong> to release adrenaline and noradrenaline into blood circulation, leading to increased blood pressure and heart rate.</li>
                <li>Smoking tobacco is associated with cancers of the lungs, throat, and urinary bladder, as well as coronary heart disease, emphysema, and bronchitis.</li>
                <li>Smoking increases carbon monoxide (<InlineMath math="\text{CO}" />) content in the blood, which binds to hemoglobin and reduces the concentration of oxyhemoglobin, causing systemic oxygen deficiency.</li>
              </ul>
            </li>
            <li><strong>Alcohol Abuse:</strong> Chronic consumption of alcohol damages the central nervous system and causes liver cirrhosis. It also affects the fetus in pregnant mothers.</li>
            <li><strong>Prevention & Rehabilitation Strategies:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Avoid Undue Peer Pressure:</strong> Respect the adolescent&apos;s choices and individuality without forcing performance standards.</li>
                <li><strong>Education & Counseling:</strong> Teach them to face disappointments/failures as part of life.</li>
                <li><strong>Seeking Help:</strong> Reach out to parents, trusted peers, and teachers immediately for guidance.</li>
                <li><strong>Professional Help:</strong> Utilize qualified psychologists, psychiatrists, and specialized de-addiction/rehabilitation centers to recover from dependency.</li>
              </ul>
            </li>
          </ul>

        </div>
      </Collapsible>

      {/* ─── SECTION 2: MICROBES IN HUMAN WELFARE ───────────────────────────── */}
      <Collapsible title="2 · Microbes in Human Welfare" icon={<Layers className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Household Products & Dairy Microbes" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Curd Production:</strong> <strong className="text-zinc-500">Lactobacillus</strong> and other Lactic Acid Bacteria (LAB) grow in milk, producing acids that coagulate and partially digest milk proteins. LAB enhances nutritional quality by increasing <strong className="text-zinc-500">Vitamin <InlineMath math="\\text{B}_{12}" /></strong> and checks growth of disease-causing microbes in the stomach.</li>
            <li><strong>Fermented Dough:</strong> Used in dosa, idli, and bread. Leavening occurs via carbon dioxide (<InlineMath math="\\text{CO}_2" />) gas released during anaerobic fermentation by <strong className="text-zinc-500">Saccharomyces cerevisiae</strong> (Baker&apos;s yeast).</li>
            <li><strong>Cheese Varieties:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Swiss Cheese:</strong> Characterized by large holes due to high volume of <InlineMath math="\\text{CO}_2" /> production by the bacterium <strong className="text-emerald-400">Propionibacterium sharmanii</strong>.</li>
                <li><strong>Roquefort Cheese:</strong> Ripened by growing a specific fungus (*Penicillium roqueforti*) on them, giving them a unique blue color and flavor.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="2. Industrial Microbes & Bioactive Molecules" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Fermented Beverages:</strong> Produced using <strong className="text-zinc-500">Saccharomyces cerevisiae</strong> (Brewer&apos;s yeast) to ferment malted cereals and fruit juices into ethanol.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Undistilled Beverages:</strong> Produced without distillation. Lower alcohol content (e.g., <strong className="text-zinc-500">Wine</strong> and <strong className="text-zinc-500">Beer</strong>).</li>
                <li><strong>Distilled Beverages:</strong> Produced by distillation of the fermented broth. Higher alcohol content (e.g., <strong className="text-zinc-500">Whisky</strong>, <strong className="text-zinc-500">Brandy</strong>, <strong className="text-zinc-500">Rum</strong>).</li>
              </ul>
            </li>
            <li><strong>Antibiotics:</strong> Chemical substances produced by some microbes that kill or retard growth of other disease-causing microbes.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Discovery:</strong> <strong className="text-zinc-500">Alexander Fleming (1928)</strong> discovered Penicillin while working on *Staphylococcus* bacteria. He observed a green mold (*Penicillium notatum*) inhibiting bacterial growth.</li>
                <li><strong>Therapeutic Validation:</strong> <strong className="text-zinc-500">Ernest Chain</strong> and <strong className="text-zinc-500">Howard Florey</strong> established its full potential as an effective therapeutic antibiotic. All three received the Nobel Prize in 1945.</li>
                <li><strong>Medical Use:</strong> Transformed clinical medicine, treating killer diseases like plague, whooping cough, diphtheria, and leprosy.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 7B: Fermented Beverages & Distillation Workflow */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 140" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">FERMENTED BEVERAGES PRODUCTION</text>
              
              <rect x="150" y="35" width="100" height="25" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              <text x="200" y="50" fill="#ffffff" fontSize="8" textAnchor="middle">Saccharomyces Ferment</text>

              <line x1="150" y1="47" x2="100" y2="47" stroke="#10b981" strokeWidth="1.5" />
              <line x1="100" y1="47" x2="100" y2="70" stroke="#10b981" strokeWidth="1.5" />
              <rect x="50" y="70" width="100" height="30" rx="3" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
              <text x="100" y="85" fill="#10b981" fontSize="7" textAnchor="middle" fontWeight="bold">UNDISTILLED (Wine, Beer)</text>

              <line x1="250" y1="47" x2="300" y2="47" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="300" y1="47" x2="300" y2="70" stroke="#ef4444" strokeWidth="1.5" />
              <rect x="250" y="70" width="100" height="30" rx="3" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.2" />
              <text x="300" y="85" fill="#ef4444" fontSize="7" textAnchor="middle" fontWeight="bold">DISTILLED (Whisky, Rum)</text>
            </svg>
          </div>

          <div className="p-4 rounded-2xl border border-white/5 bg-amber-500/[0.02] space-y-1.5 text-xs text-white/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Single Cell Protein (SCP)</span>
            <p>
              <strong className="text-zinc-500">Single Cell Protein (SCP)</strong> is one of the alternate sources of proteins for animal and human nutrition. With protein deficiency affecting a large population, SCP offers high-yield microbial biomass:
            </p>
            <ul className="list-circle pl-5 space-y-0.5 text-white/60">
              <li><strong>Spirulina:</strong> A blue-green alga grown easily on waste water, starch, straw, and molasses. Rich in protein, minerals, fats, and vitamins; also reduces environmental pollution.</li>
              <li><strong>Methylophilus methylotrophus:</strong> A bacterium whose high rate of biomass production and growth can yield <strong className="text-zinc-500">25 tonnes of protein</strong> from just 250g of initial bacterial culture daily.</li>
            </ul>
          </div>

          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Organic Acids & Solvents:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Citric Acid:</strong> Produced by *Aspergillus niger* (Fungus).</li>
                <li><strong>Acetic Acid:</strong> Produced by *Acetobacter aceti* (Bacterium).</li>
                <li><strong>Butyric Acid:</strong> Produced by *Clostridium butylicum* (Bacterium).</li>
                <li><strong>Lactic Acid:</strong> Produced by *Lactobacillus* (Bacterium).</li>
                <li><strong>Ethanol:</strong> Produced by *Saccharomyces cerevisiae* (Yeast).</li>
              </ul>
            </li>
            <li><strong>Bioactive Molecules & Enzymes:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Cyclosporin A:</strong> Obtained from the fungus <strong className="text-emerald-400">Trichoderma polysporum</strong>. Used as an <strong className="text-zinc-500">immunosuppressive agent</strong> in organ transplant patients.</li>
                <li><strong>Statins:</strong> Obtained from the yeast <strong className="text-emerald-400">Monascus purpureus</strong>. Used as <strong className="text-zinc-500">blood-cholesterol lowering agents</strong> by competitively inhibiting the HMG-CoA reductase enzyme responsible for cholesterol synthesis.</li>
                <li><strong>Streptokinase:</strong> Obtained from the bacterium *Streptococcus*. Modified by genetic engineering to act as a <strong className="text-zinc-500">clot buster</strong> to dissolve clots in patients with myocardial infarction.</li>
                <li><strong>Pectinases & Proteases:</strong> Used to clarify bottled fruit juices (making them clearer than home-squeezed juice).</li>
                <li><strong>Lipases:</strong> Used in detergent formulations to remove oily stains from laundry.</li>
              </ul>
            </li>
          </ul>

          <SectionBanner label="3. Sewage Treatment Plant (STP) Stages" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Primary (Physical) Treatment:</strong> Filtration and sedimentation. Floating debris is removed by sequential filtration; grit (soil/pebbles) is removed by sedimentation. The settled solids form primary sludge, and the supernatant forms the primary effluent.</li>
            <li><strong>Secondary (Biological) Treatment:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Primary effluent is passed into large <strong className="text-zinc-500">aeration tanks</strong> and constantly agitated, allowing aerobic bacteria and fungi to grow into <strong className="text-zinc-500">flocs</strong> (mesh-like structures).</li>
                <li>Flocs consume the organic matter, drastically reducing the <strong className="text-zinc-500">Biochemical Oxygen Demand (BOD)</strong> of the effluent.</li>
                <li>Effluent is then passed into a settling tank where the flocs sediment, forming <strong className="text-zinc-500">activated sludge</strong>. A small part of this is pumped back into the aeration tank as inoculum.</li>
                <li>The remaining sludge is pumped into <strong className="text-zinc-500">anaerobic sludge digesters</strong>, where anaerobic bacteria digest the aerobic bacteria and fungi, producing a mixture of gases like <strong className="text-zinc-500">Methane (<InlineMath math="\\text{CH}_4" />), <InlineMath math="\\text{CO}_2" />, and <InlineMath math="\\text{H}_2\\text{S}" /></strong> (Biogas).</li>
              </ul>
            </li>
          </ul>

          {/* SVG 8: Sewage Treatment Flowchart */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 160" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">SEWAGE TREATMENT FLOW CHART</text>
              
              {/* Primary Sedimentation */}
              <g transform="translate(10, 40)">
                <rect x="0" y="10" width="90" height="40" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1.2" />
                <text x="45" y="28" fill="#ffffff" fontSize="7" textAnchor="middle">Primary Treatment</text>
                <text x="45" y="40" fill="#94a3b8" fontSize="7" textAnchor="middle">(Filtration/Sediment)</text>
              </g>

              {/* Arrow to secondary */}
              <path d="M 100 70 L 130 70" stroke="#ffffff" strokeWidth="1.5" />

              {/* Aeration Tank */}
              <g transform="translate(140, 40)">
                <rect x="0" y="10" width="90" height="40" rx="3" fill="#172554" stroke="#60a5fa" strokeWidth="1.2" />
                <text x="45" y="28" fill="#60a5fa" fontSize="7" textAnchor="middle">Aeration Tank</text>
                <text x="45" y="40" fill="#38bdf8" fontSize="7" textAnchor="middle">Flocs Reduce BOD</text>
              </g>

              {/* Arrow to anaerobic */}
              <path d="M 230 70 L 260 70" stroke="#ffffff" strokeWidth="1.5" />

              {/* Sludge Digesters */}
              <g transform="translate(270, 40)">
                <rect x="0" y="10" width="100" height="40" rx="3" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
                <text x="50" y="28" fill="#10b981" fontSize="7" textAnchor="middle">Anaerobic Sludge</text>
                <text x="50" y="40" fill="#10b981" fontSize="7" textAnchor="middle">Digesters (Biogas)</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="4. Biogas Plant Layout" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Concrete Tank (Digester):</strong> A 10-15 feet deep concrete well in which bio-wastes are collected and a slurry of dung is fed.</li>
            <li><strong>Floating Cover:</strong> Placed over the slurry, which keeps rising as gas is produced in the tank due to microbial activity.</li>
            <li><strong>Methanogens:</strong> Bacteria like *Methanobacterium* grow anaerobically on cellulosic materials to produce methane (<InlineMath math="\\text{CH}_4" />), carbon dioxide (<InlineMath math="\\text{CO}_2" />), and hydrogen (<InlineMath math="\\text{H}_2" />).</li>
            <li><strong>Outlets:</strong> One outlet connected to a pipe to supply biogas to nearby houses. Another outlet to remove spent slurry, which is dried and used as fertilizer.</li>
          </ul>

          {/* SVG 9: Biogas Digester */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 200" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">BIOGAS PLANT SCHEMATIC</text>
              
              {/* Digester body */}
              <rect x="120" y="70" width="110" height="100" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
              
              {/* Floating gas holder dome */}
              <path d="M 115 70 C 115 40, 235 40, 235 70 Z" fill="#3b82f6" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="175" y="55" fill="#3b82f6" fontSize="8" textAnchor="middle">Floating Gas Holder</text>

              {/* Slurry Inlet */}
              <path d="M 60 90 L 120 120" stroke="#ffffff" strokeWidth="2" />
              <rect x="30" y="70" width="40" height="25" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1" />
              <text x="50" y="85" fill="#ffffff" fontSize="7" textAnchor="middle">Dung Slurry</text>

              {/* Gas outlet pipe */}
              <line x1="175" y1="40" x2="175" y2="25" stroke="#ffffff" strokeWidth="2" />
              <circle cx="175" cy="22" r="3" fill="#ffffff" />
              <text x="195" y="25" fill="#ffffff" fontSize="8">Gas Valve</text>

              {/* Labels */}
              <text x="175" y="125" fill="#10b981" fontSize="8" textAnchor="middle">Anaerobic Slurry</text>
              <text x="175" y="140" fill="#10b981" fontSize="7" textAnchor="middle">(Methanobacterium)</text>
            </svg>
          </div>

          <SectionBanner label="5. Microbial Biocontrol Agents & Biofertilisers" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Microbial Biocontrol:</strong> Natural predators used to manage agricultural pests instead of toxic chemical pesticides:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Bacillus thuringiensis (Bt):</strong> Spores are sprayed on plants. Vulnerable insect larvae ingest them, and the toxin becomes activated in their alkaline gut, punching pores in their epithelial cells, leading to death. Used to control butterfly caterpillars.</li>
                <li><strong>Trichoderma:</strong> Free-living fungi common in root ecosystems. Effective biocontrol agents against several soil-borne plant pathogens.</li>
                <li><strong>Baculoviruses (Nucleopolyhedrovirus):</strong> Excellent candidates for species-specific, narrow-spectrum insecticidal applications. They have <strong className="text-zinc-500">no negative impacts</strong> on plants, mammals, birds, or non-target insects. Crucial in Integrated Pest Management (IPM) programs.</li>
              </ul>
            </li>
            <li><strong>Biofertilisers:</strong> Organisms that enrich the nutrient quality of the soil:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Symbiotic Nitrogen Fixers:</strong> <strong className="text-zinc-500">Rhizobium</strong> (forms nodules in roots of leguminous plants, converting atmospheric nitrogen into organic forms).</li>
                <li><strong>Free-living Nitrogen Fixers:</strong> *Azotobacter* and *Azospirillum* in soil.</li>
                <li><strong>Mycorrhiza (Symbiosis):</strong> Fungi of the genus <strong className="text-zinc-500">Glomus</strong> form symbiotic associations with plant roots. The fungus absorbs <strong className="text-zinc-500">phosphorus</strong> from the soil and passes it to the plant, while protecting the plant from root-borne pathogens and salinity.
                  <ul className="list-square pl-5 mt-1 space-y-0.5">
                    <li><strong>Ectomycorrhiza:</strong> The fungus forms an external sheath or mantle around the root surface and penetrates intercellular spaces in the root cortex to form a network (<strong className="text-zinc-500">Hartig net</strong>), but does not enter the cells themselves (common in gymnosperms like Pinus).</li>
                    <li><strong>Endomycorrhiza (VAM - Vesicular Arbuscular Mycorrhiza):</strong> The fungal hyphae penetrate the cortical cell walls of roots, forming intracellular branched structures (<strong className="text-zinc-500">arbuscules</strong>) for nutrient transfer and swelling storage units (<strong className="text-zinc-500">vesicles</strong>) (common in crop plants and orchids).</li>
                  </ul>
                </li>

          {/* SVG 10: Ecto vs Endo Mycorrhiza */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 150" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">ECTOMYCORRHIZA VS. ENDOMYCORRHIZA (VAM)</text>
              
              <g transform="translate(30, 35)">
                <rect x="0" y="0" width="150" height="90" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="75" y="15" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Ectomycorrhiza</text>
                <rect x="20" y="30" width="30" height="20" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <rect x="60" y="30" width="30" height="20" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <rect x="20" y="55" width="30" height="20" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <rect x="60" y="55" width="30" height="20" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <path d="M 10 20 L 110 20 L 110 85 L 10 85 Z" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="2" />
                <path d="M 53 30 L 53 75 M 20 52 L 90 52" stroke="#eab308" strokeWidth="1.5" />
                <text x="75" y="83" fill="#eab308" fontSize="7" textAnchor="middle">External Mantle & Hartig Net</text>
              </g>

              <g transform="translate(220, 35)">
                <rect x="0" y="0" width="150" height="90" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="75" y="15" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">Endomycorrhiza (VAM)</text>
                <rect x="30" y="30" width="90" height="45" fill="#1e293b" stroke="#ffffff" strokeWidth="0.8" />
                <path d="M 75 75 L 75 55 M 75 55 L 60 45 M 75 55 L 90 45 M 60 45 L 55 35 M 90 45 L 95 35" stroke="#a78bfa" strokeWidth="1.5" />
                <circle cx="105" cy="52" r="5" fill="#fb7185" />
                <text x="75" y="83" fill="#a78bfa" fontSize="7" textAnchor="middle">Intracellular Arbuscule & Vesicle</text>
              </g>
            </svg>
          </div>
                <li><strong>Cyanobacteria:</strong> Blue-green algae (*Anabaena*, *Nostoc*, *Oscillatoria*) act as biofertilisers in paddy fields, fixing atmospheric nitrogen and adding organic matter.</li>
              </ul>
            </li>
          </ul>

        </div>
      </Collapsible>

      {/* ─── SECTION 3: INTERACTIVE LAB SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2 font-display">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            3 · Applied Biology Lab Simulator
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select a biological specimen and apply a specific stimulus to evaluate diagnostic color changes, biochemical oxygen demand, anaerobic gas yields, and larval toxicity.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('patient_serum')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'patient_serum' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Suspected HIV Patient Serum
                </button>
                <button 
                  onClick={() => setSpecimen('wastewater')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'wastewater' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Raw Sewage Wastewater
                </button>
                <button 
                  onClick={() => setSpecimen('biogas_slurry')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'biogas_slurry' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Biogas Plant Slurry
                </button>
                <button 
                  onClick={() => setSpecimen('crop_pest')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'crop_pest' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Lepidopteran Crop Larvae
                </button>
              </div>
            </div>

            {/* Treatment Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Apply Treatment / Assay</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'elisa_test', label: 'Run ELISA Assay' },
                  { id: 'bod_measure', label: 'Measure BOD Level' },
                  { id: 'methanogens', label: 'Introduce Methanobacterium' },
                  { id: 'bt_biocontrol', label: 'Apply Bacillus thuringiensis' }
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
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Diagnostic Screen</span>
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

      {/* ─── SECTION 4: CONCEPTUAL SOLVED PROBLEMS ─────────────────────────── */}
      <Collapsible title="4 · Conceptual Solved Problems" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 font-sans text-[13px]">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Sewage BOD Reduction Calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A sample of raw sewage has a measured BOD of 360 mg/L. After passing through the aeration tank for secondary treatment, the BOD is measured at 18 mg/L. Calculate the percentage efficiency of the biological secondary treatment stage in removing organic matter."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Calculate the absolute reduction in BOD concentration:"}</div>
              <div className="pl-3"><InlineMath math="\Delta \text{BOD} = \text{Initial BOD} - \text{Final BOD} = 360 - 18 = 342 \text{ mg/L}" /></div>
              <div>{"2. Calculate the percentage efficiency of removal using the formula:"}</div>
              <div className="pl-3"><InlineMath math="\text{Efficiency (\%)} = \left(\frac{\Delta \text{BOD}}{\text{Initial BOD}}\right) \times 100" /></div>
              <div className="pl-3"><InlineMath math="\text{Efficiency (\%)} = \left(\frac{342}{360}\right) \times 100 = 0.95 \times 100 = 95\%" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The secondary treatment stage is 95% efficient in removing organic waste.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Active vs. Passive Immunization Antigen Response</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Explain the difference in immune response kinetics (antibody titer peaks over time) when a patient receives a tetanus toxoid vaccine (Active) versus a tetanus antitoxin injection (Passive) after an injury."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Tetanus Toxoid (Active Immunization): Contains inactivated toxin. When injected, the host's immune system takes 7–14 days to process antigens and synthesize memory cells. A primary response yields a moderate peak. A booster shot triggers an anamnestic secondary response with a massive antibody peak."}</div>
              <div>{"2. Tetanus Antitoxin (Passive Immunization): Contains readymade antibodies. When injected, the blood antibody titer peaks almost immediately (within hours), providing instant protection. However, no memory cells are created, and the injected antibodies degrade within weeks (titer drops to zero)."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Active immunization provides slow but long-term memory; passive provides instant but short-lived antibody protection.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Helper T-Cell Count Progression in HIV Latency</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"During the asymptomatic latency phase of HIV infection, the count of Helper T-cells (CD4+) declines at an average rate of 60 cells/mm³ of blood per year. If a patient starts with a normal CD4+ count of 900 cells/mm³, calculate the estimated years before their count drops below the critical clinical threshold for AIDS diagnosis (200 cells/mm³)."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Calculate the total allowable decline in Helper T-cells to reach the threshold:"}</div>
              <div className="pl-3"><InlineMath math="\Delta \text{CD4+} = 900 - 200 = 700 \text{ cells/mm}^3" /></div>
              <div>{"2. Divide the total decline by the annual depletion rate to find the time in years:"}</div>
              <div className="pl-3"><InlineMath math="\text{Time (years)} = \frac{700}{60} \approx 11.67 \text{ years}" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: It will take approximately 11.7 years of untreated latency before clinical AIDS threshold is crossed.</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Active Vaccine Immunity vs. Readymade Immunoglobulin Ratios</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"During an active rabies exposure, a patient requires both Rabies Vaccine (active) and Rabies Immunoglobulin (passive) administered on Day 0. If the half-life of injected passive antibodies is 21 days and the active vaccine takes 14 days to begin endogenous synthesis, calculate the percentage of passive antibodies remaining in circulation when active antibody production begins."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The time elapsed before active synthesis starts is t = 14 days."}</div>
              <div>{"2. The half-life of the passive antibodies is T = 21 days."}</div>
              <div>{"3. The fraction of passive antibodies remaining is calculated using the exponential decay formula:"}</div>
              <div className="pl-3"><InlineMath math="\text{Fraction Remaining} = (0.5)^{\frac{t}{T}}" /></div>
              <div className="pl-3"><InlineMath math="\text{Fraction Remaining} = (0.5)^{\frac{14}{21}} = (0.5)^{\frac{2}{3}} \approx 0.63" /></div>
              <div>{"4. Convert the fraction to a percentage:"}</div>
              <div className="pl-3"><InlineMath math="\text{Percentage} = 0.63 \times 100 = 63\%" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Approximately 63% of the passive immunoglobulin dose remains active in circulation when active synthesis begins.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 5: PRACTICE MOCK TEST ────────────────────────────────── */}
      <Collapsible title="5 · Practice Mock Test (15 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your understanding of Human Diseases, Immunology, and Applied Microbes with these exam-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following pathogens causes sustained high fever (39-40°C), stomach pain, and can be diagnosed via the Widal test?',
                a: 'Streptococcus pneumoniae',
                b: 'Salmonella typhi',
                c: 'Entamoeba histolytica',
                d: 'Wuchereria bancrofti',
                ans: 'Correct Answer: B. Salmonella typhi is the bacterium responsible for typhoid fever, which is diagnosed using the Widal test.'
              },
              {
                q: 'In the life cycle of Plasmodium, which stage represents the infective form that enters the human body through a female Anopheles mosquito bite?',
                a: 'Merozoite',
                b: 'Sporozoite',
                c: 'Trophozoite',
                d: 'Gametocyte',
                ans: 'Correct Answer: B. Sporozoites are the mature infective forms stored in the salivary glands of female Anopheles mosquitoes.'
              },
              {
                q: 'Which of the following forms a cytokine barrier of innate immunity, protecting non-infected adjacent cells from viral replication?',
                a: 'Lysozyme',
                b: 'Interferons',
                c: 'Macrophage',
                d: 'Mucus',
                ans: 'Correct Answer: B. Interferons are proteins secreted by virus-infected cells to protect neighboring non-infected cells.'
              },
              {
                q: 'What is the structural formula abbreviation representing a monomeric IgG antibody molecule?',
                a: 'H1L1',
                b: 'H2L2',
                c: 'H4L4',
                d: 'H2L1',
                ans: 'Correct Answer: B. An antibody molecule has four polypeptide chains: two heavy (H) and two light (L) chains, denoted as H2L2.'
              },
              {
                q: 'MALT constitutes approximately what percentage of the lymphoid tissue in the human body?',
                a: '20%',
                b: '50%',
                c: '75%',
                d: '10%',
                ans: 'Correct Answer: B. Mucosal-Associated Lymphoid Tissue (MALT) constitutes about 50 percent of the total lymphoid tissue in humans.'
              },
              {
                q: 'What antibody isotype mediates type I hypersensitivity allergic reactions, triggering histamine release from mast cells?',
                a: 'IgG',
                b: 'IgE',
                c: 'IgA',
                d: 'IgM',
                ans: 'Correct Answer: B. IgE is the antibody isotype that binds to allergens and triggers mast cell degranulation.'
              },
              {
                q: 'Which cell type does HIV selectively attack and replicate within, leading to a collapse of cell-mediated immunity?',
                a: 'B-lymphocyte',
                b: 'Helper T-cell (CD4+)',
                c: 'Red blood cell',
                d: 'NK cell',
                ans: 'Correct Answer: B. HIV binds to CD4 receptors on Helper T-cells, replicating inside them and destroying them.'
              },
              {
                q: 'Which of the following is the most feared property of malignant tumors, where cancer cells migrate to distant tissues via blood?',
                a: 'Loss of contact inhibition',
                b: 'Metastasis',
                c: 'Apoptosis',
                d: 'Contact inhibition',
                ans: 'Correct Answer: B. Metastasis is the movement of malignant cells from the primary site to other body organs to form secondary tumors.'
              },
              {
                q: 'Heroin is chemically classified as:',
                a: 'Diacetylmorphine',
                b: 'Tetrahydrocannabinol',
                c: 'Benzoylmethyl ecgonine',
                d: 'Lysergic acid diethylamide',
                ans: 'Correct Answer: A. Heroin is diacetylmorphine, obtained by the acetylation of morphine.'
              },
              {
                q: 'Swiss cheese features large holes due to CO2 production by which of the following micro-organisms?',
                a: 'Penicillium roqueforti',
                b: 'Propionibacterium sharmanii',
                c: 'Saccharomyces cerevisiae',
                d: 'Lactobacillus acidophilus',
                ans: 'Correct Answer: B. Propionibacterium sharmanii produces large quantities of carbon dioxide gas during ripening, forming Swiss cheese holes.'
              },
              {
                q: 'Cyclosporin A, an immunosuppressive drug used in organ transplants, is extracted from which organism?',
                a: 'Monascus purpureus',
                b: 'Trichoderma polysporum',
                c: 'Streptococcus pyogenes',
                d: 'Aspergillus niger',
                ans: 'Correct Answer: B. Trichoderma polysporum is the fungus that yields Cyclosporin A.'
              },
              {
                q: 'Which bioactive molecule acts as a blood-cholesterol lowering agent by competitively inhibiting HMG-CoA reductase?',
                a: 'Streptokinase',
                b: 'Statin',
                c: 'Cyclosporin A',
                d: 'Penicillin',
                ans: 'Correct Answer: B. Statins, produced by Monascus purpureus yeast, inhibit the cholesterol-synthesis enzyme.'
              },
              {
                q: 'During which sewage treatment stage are "flocs" (mesh-like structures of bacteria and fungi) utilized to consume organic waste?',
                a: 'Primary Physical Treatment',
                b: 'Secondary Biological Treatment',
                c: 'Tertiary Chemical Treatment',
                d: 'Anaerobic sedimentation',
                ans: 'Correct Answer: B. Flocs are active during the biological secondary treatment stage in aeration tanks, reducing BOD.'
              },
              {
                q: 'The gas mixture produced in anaerobic sludge digesters (biogas) consists primarily of:',
                a: 'Pure Hydrogen and oxygen',
                b: 'Methane, Carbon Dioxide, and Hydrogen Sulfide',
                c: 'Carbon Monoxide and nitrogen',
                d: 'Propane and butane',
                ans: 'Correct Answer: B. Biogas contains Methane (CH4), Carbon Dioxide (CO2), and traces of Hydrogen Sulfide (H2S).'
              },
              {
                q: 'Which biocontrol agent is species-specific and narrow-spectrum, showing no negative impact on non-target arthropods?',
                a: 'Bacillus thuringiensis',
                b: 'Nucleopolyhedrovirus',
                c: 'Trichoderma',
                d: 'Rhizobium',
                ans: 'Correct Answer: B. Baculoviruses of the genus Nucleopolyhedrovirus are highly selective, narrow-spectrum insecticides.'
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
        <span className="text-[11px] text-white/30 font-mono">Biology & Human Welfare · Unit 8</span>
      </div>

    </div>
  );
}
