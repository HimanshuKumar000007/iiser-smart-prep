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

export default function BiotechDetail({ progress, isCompleted, onNavigate }: Props) {
  // Simulator States
  const [specimen, setSpecimen] = useState<'pbr322' | 'target_dna' | 'tobacco_root' | 'lymphocyte'>('pbr322');
  const [treatment, setTreatment] = useState<'eco_ri' | 'pcr_ampl' | 'rnai_dsrna' | 'ada_retrovirus'>('eco_ri');

  // Simulator Outcome logic
  const getSimulatorOutcome = () => {
    if (treatment === 'eco_ri' && specimen === 'pbr322') {
      return {
        outcome: 'Restriction Digestion: Linearized Vector with Sticky Ends',
        color: 'text-violet-400',
        visualEffect: 'EcoRI endonuclease scanning and cleaving pBR322 at its single EcoRI recognition sequence (5\'-GAATTC-3\').',
        product: 'Linear pBR322 plasmid with 5\'-AATT overhanging cohesive (sticky) ends.',
        explanation: 'EcoRI recognizes the double-stranded palindromic sequence GAATTC and cuts between G and A on both strands, leaving single-stranded overhanging ends. These overhanging sticky ends can easily form hydrogen bonds with complementary sticky ends of a target gene cut with the same enzyme.',
        trap: 'Restriction enzymes cut between the same two bases on both strands. EcoRI cuts between G and A, not in the middle of the palindrome.'
      };
    }

    if (treatment === 'pcr_ampl' && specimen === 'target_dna') {
      return {
        outcome: 'PCR Gene Amplification: Billion-Fold Target Replication',
        color: 'text-cyan-400',
        visualEffect: '30 automated cycles of Denaturation (94°C), Primer Annealing (54°C), and Extension (72°C) via Taq Polymerase.',
        product: 'approx. 1.07 billion copies of the target gene (2^30 yield)',
        explanation: 'Polymerase Chain Reaction (PCR) enables selective amplification of DNA. Denaturation breaks hydrogen bonds. Annealing allows chemically synthesized oligonucleotide primers to bind to complementary 3\' ends. Extension utilizes dNTPs and thermostable Taq Polymerase (isolated from Thermus aquaticus) to extend primers.',
        trap: 'Taq polymerase remains active at high temperatures (up to 95°C) because it is isolated from a thermophilic bacterium. Do not use human DNA polymerase in PCR.'
      };
    }

    if (treatment === 'rnai_dsrna' && specimen === 'tobacco_root') {
      return {
        outcome: 'RNA Interference (RNAi): Nematode Gene Silencing',
        color: 'text-emerald-400',
        visualEffect: 'Double-stranded RNA (dsRNA) processed by Dicer into siRNA, silencing critical nematode mRNA.',
        product: 'Post-transcriptional silencing of Meloidogyne incognita target genes',
        explanation: 'Agrobacterium vectors introduce nematode-specific genes into the host tobacco plant. The plant cells produce both sense and antisense RNA, forming double-stranded RNA (dsRNA). When the nematode parasite feeds, this dsRNA enters its cells, triggering the RNAi pathway to silence essential nematode transcripts.',
        trap: 'RNAi is a cellular defense mechanism present in all eukaryotic organisms, not in prokaryotes. It acts by post-transcriptional gene silencing, not transcriptional blockade.'
      };
    }

    if (treatment === 'ada_retrovirus' && specimen === 'lymphocyte') {
      return {
        outcome: 'ADA Gene Therapy: Transduced Functional Lymphocytes',
        color: 'text-amber-400',
        visualEffect: 'Patient lymphocytes transduced with a disarmed retroviral vector carrying functional ADA cDNA.',
        product: 'Genetically engineered ADA-producing T-lymphocytes ready for re-infusion',
        explanation: 'Adenosine Deaminase (ADA) deficiency causes severe combined immunodeficiency (SCID). Transducing functional ADA cDNA into the patient\'s cultured lymphocytes and re-infusing them restores immune function. However, this therapy is temporary since mature T-lymphocytes are not immortal and divide a limited number of times.',
        trap: 'For a permanent cure, the therapeutic gene must be introduced into stem cells isolated from the bone marrow at early embryonic stages.'
      };
    }

    return {
      outcome: 'No reaction occurred. Reagent is incompatible with the specimen.',
      color: 'text-zinc-400',
      visualEffect: 'Specimen remains unaffected.',
      product: 'None',
      explanation: 'Try matching the correct specimen with its appropriate enzyme or transfection trigger.',
      trap: 'Read the instructions to match vector plasmids and target genes with their corresponding biotechnology tools.'
    };
  };

  const sim = getSimulatorOutcome();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white biotech-chapter">
      <style dangerouslySetInnerHTML={{ __html: `
        .biotech-chapter .text-xs { font-size: 13px !important; }
        .biotech-chapter .text-sm { font-size: 15px !important; }
        .biotech-chapter .text-base { font-size: 17.5px !important; }
        .biotech-chapter .text-\\[10px\\] { font-size: 11px !important; }
        .biotech-chapter .text-\\[11px\\] { font-size: 12px !important; }
        .biotech-chapter .text-\\[11.5px\\] { font-size: 12.5px !important; }
        .biotech-chapter .text-\\[13px\\] { font-size: 14px !important; }
        .biotech-chapter .text-\\[14px\\] { font-size: 15px !important; }
      `}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#0c0d1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-emerald-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Biology</Tag>
            <Tag color="cyan">Unit 9</Tag>
            <Tag color="rose">High Yield</Tag>
            <Tag color="violet">Biotechnology</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Biotechnology: <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">Principles, Vectors & Applied Bioengineering</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Syllabus-aligned framework covering restriction enzymes, pBR322 map, competent host transformation, PCR phases, bioreactors, Bt cotton toxins, RNAi silencing, Humulin production, and gene therapy.
          </p>
        </div>
      </div>

      {/* ─── SECTION 1: PRINCIPLES AND PROCESSES ───────────────────────────── */}
      <Collapsible title="1 · Biotechnology: Principles and Processes" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={true}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Principles & Restriction Endonucleases" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>DNA Ligation:</strong> Joining of two double-stranded DNA fragments.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Catalyzed by the enzyme **DNA Ligase** (commonly **T4 DNA Ligase**).</li>
                <li>Requires **ATP** and divalent magnesium ions (<InlineMath math="\text{Mg}^{2+}" />) as cofactors.</li>
                <li>Creates a covalent **phosphodiester bond** between the 3&apos;-OH group of one nucleotide and the 5&apos;-phosphate group of another, sealing nicks in the sugar-phosphate backbone.</li>
              </ul>
            </li>
            <li><strong>Core Principles:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Genetic Engineering:</strong> Techniques to alter the chemistry of genetic material (DNA/RNA) to introduce them into host organisms and thus change the phenotype of the host organism.</li>
                <li><strong>Bioprocess Engineering:</strong> Maintenance of sterile ambience in chemical engineering processes to enable growth of only the desired microbe/eukaryotic cell in large quantities for the manufacture of biotechnological products like antibiotics, vaccines, enzymes, etc.</li>
              </ul>
            </li>
            <li><strong>Restriction Endonucleases (Molecular Scissors):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Nucleases are of two types: **Exonucleases** (remove nucleotides from ends of DNA) and **Endonucleases** (cut at specific positions within the DNA).</li>
                <li>The first restriction endonuclease discovered was **HindII** (always cuts DNA molecules by recognizing a specific sequence of six base pairs).</li>
                <li>Each restriction endonuclease inspects the length of a DNA sequence to find its specific **recognition sequence** and cuts the sugar-phosphate backbone.</li>
                <li><strong>EcoRI</strong> recognition sequence is `5'-GAATTC-3'` / `3'-CTTAAG-5'`. It cuts the DNA strands between G and A, producing overhanging single-stranded **sticky ends**.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 1: EcoRI Restriction Digestion & Sticky Ends */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 150" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">EcoRI RESTRICTION DIGESTION</text>
              
              {/* Palindrome sequences */}
              <g transform="translate(60, 45)">
                <text x="0" y="10" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="monospace">5&apos;- G A A T T C -3&apos;</text>
                <text x="0" y="28" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="monospace">3&apos;- C T T A A G -5&apos;</text>
                
                {/* Cutting Arrows */}
                <path d="M 23 -2 L 23 6" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 85 40 L 85 32" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
                
                <text x="23" y="-5" fill="#ef4444" fontSize="7" textAnchor="middle">Cut</text>
                <text x="85" y="47" fill="#ef4444" fontSize="7" textAnchor="middle">Cut</text>
              </g>

              {/* Resulting Sticky Ends */}
              <g transform="translate(40, 110)">
                <text x="0" y="10" fill="#ffffff" fontSize="9" fontFamily="monospace">5&apos;-G</text>
                <text x="0" y="22" fill="#ffffff" fontSize="9" fontFamily="monospace">3&apos;-C T T A A</text>

                <text x="180" y="10" fill="#ffffff" fontSize="9" fontFamily="monospace">A A T T C-3&apos;</text>
                <text x="228" y="22" fill="#ffffff" fontSize="9" fontFamily="monospace">G-5&apos;</text>

                <text x="145" y="16" fill="#10b981" fontSize="8" textAnchor="middle">Sticky Ends</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="2. Cloning Vectors: pBR322 & Selectable Markers" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Cloning Vector Features:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Origin of Replication (ori):</strong> Initiates replication. Any DNA linked to it replicates inside host. Also controls the copy number of linked DNA.</li>
                <li><strong>Selectable Markers:</strong> Help identify and select transformants and eliminate non-transformants. Commonly used antibiotic resistance genes: **ampicillin** (<InlineMath math="\text{amp}^\text{R}" />) and **tetracycline** (<InlineMath math="\text{tet}^\text{R}" />).</li>
                <li><strong>Cloning Sites:</strong> Recognition sites for restriction enzymes where foreign DNA is ligated. Undergoing ligation at a restriction site within an antibiotic resistance gene inactivates that gene (**insertional inactivation**).</li>
                <li><strong>Blue-White Selection (Alternative Selectable Marker):</strong> Insertional inactivation of <InlineMath math="\beta" />-galactosidase gene. Recombinants do not produce the enzyme and form white colonies on chromogenic substrate (X-gal); non-recombinants form blue colonies.</li>
                <li><strong>Multiple Cloning Site (MCS):</strong> A clustered region containing several unique restriction recognition sites, providing flexibility in choosing restriction enzymes.</li>
                <li><strong>Shuttle Vectors:</strong> Plasmids capable of replicating in two different host organisms (e.g., *E. coli* and yeast), containing two different origins of replication and host-specific selectable markers.</li>
                <li><strong>Expression Vectors:</strong> Specialized vectors designed for active protein production. Unlike cloning vectors, they must contain a strong **promoter** (for transcription initiation), a **ribosome binding site (RBS)** (for translation initiation), and a **transcription terminator**.</li>
                <li><strong>Ti Plasmid details:</strong> The Tumor-inducing (Ti) plasmid from *Agrobacterium tumefaciens* transfers a specific segment called **T-DNA (transfer DNA)** flanked by **left and right border sequences**. Transfer requires virulence (**vir**) genes on the plasmid. Disarmed Ti vectors have tumor genes deleted but retain border sequences to transfer target genes.</li>
                <li><strong>Vectors for Plants and Animals:</strong> *Agrobacterium tumefaciens* (delivers tumor-inducing Ti plasmid T-DNA into dicot plants; disarmed to act as delivery vector) and disarmed Retroviruses in animals.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 2B: Vector Configurations */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 160" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">EXPRESSION VECTOR VS. Ti PLASMID</text>
              
              <g transform="translate(20, 35)">
                <circle cx="70" cy="65" r="35" fill="none" stroke="#10b981" strokeWidth="4" />
                <text x="70" y="15" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Expression Vector</text>
                <rect x="52" y="25" width="36" height="10" fill="#a78bfa" rx="2" />
                <text x="70" y="32" fill="#ffffff" fontSize="6" textAnchor="middle">Promoter</text>
                <rect x="88" y="55" width="25" height="10" fill="#fb7185" rx="2" />
                <text x="100" y="62" fill="#ffffff" fontSize="6" textAnchor="middle">RBS</text>
                <rect x="52" y="95" width="36" height="10" fill="#ef4444" rx="2" />
                <text x="70" y="102" fill="#ffffff" fontSize="6" textAnchor="middle">Terminator</text>
              </g>

              <g transform="translate(240, 35)">
                <circle cx="70" cy="65" r="35" fill="none" stroke="#f59e0b" strokeWidth="4" />
                <text x="70" y="15" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">Ti Plasmid (250 kb)</text>
                <path d="M 50 35 A 35 35 0 0 1 90 35" fill="none" stroke="#ef4444" strokeWidth="4" />
                <text x="70" y="31" fill="#ef4444" fontSize="7" fontWeight="bold" textAnchor="middle">T-DNA</text>
                <text x="36" y="44" fill="#ef4444" fontSize="6">LB</text>
                <text x="104" y="44" fill="#ef4444" fontSize="6">RB</text>
                <rect x="75" y="85" width="30" height="12" fill="#3b82f6" rx="2" />
                <text x="90" y="93" fill="#ffffff" fontSize="6" textAnchor="middle">vir genes</text>
              </g>
            </svg>
          </div>

          {/* SVG 2: pBR322 Vector Map */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 250" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">pBR322 CLONING VECTOR MAP</text>
              
              {/* Circular Plasmid */}
              <circle cx="175" cy="130" r="65" fill="none" stroke="#60a5fa" strokeWidth="6" />
              
              {/* ampR region in green */}
              <path d="M 120 95 A 65 65 0 0 1 175 65" fill="none" stroke="#10b981" strokeWidth="6" />
              <text x="125" y="80" fill="#10b981" fontSize="8" fontWeight="bold">ampR</text>

              {/* tetR region in orange */}
              <path d="M 175 65 A 65 65 0 0 1 235 105" fill="none" stroke="#f59e0b" strokeWidth="6" />
              <text x="215" y="80" fill="#f59e0b" fontSize="8" fontWeight="bold">tetR</text>

              {/* restriction sites */}
              <text x="105" y="55" fill="#22d3ee" fontSize="7">PstI</text>
              <line x1="120" y1="62" x2="135" y2="78" stroke="#ffffff" strokeWidth="0.8" />

              <text x="235" y="55" fill="#22d3ee" fontSize="7">BamHI</text>
              <line x1="230" y1="62" x2="215" y2="78" stroke="#ffffff" strokeWidth="0.8" />

              <text x="250" y="125" fill="#22d3ee" fontSize="7">SalI</text>
              <line x1="240" y1="125" x2="230" y2="125" stroke="#ffffff" strokeWidth="0.8" />

              {/* ori and rop */}
              <text x="135" y="195" fill="#ffffff" fontSize="8" fontWeight="bold">ori</text>
              <text x="200" y="195" fill="#ffffff" fontSize="8" fontWeight="bold">rop</text>
              
              <text x="175" y="134" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">4361 bp</text>
            </svg>
          </div>

          <SectionBanner label="3. Competent Hosts & DNA Transformation" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Competent Host Preparation:</strong> Since DNA is hydrophilic, it cannot pass through cell membranes. The host must be made competent to take up plasmids:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Chemical Treatment:</strong> Treating bacteria with a specific concentration of a divalent cation like **Calcium** (<InlineMath math="\text{Ca}^{2+}" />), which increases membrane pore efficiency.</li>
                <li><strong>Heat Shock:</strong> Incubating recombinant DNA with cells on ice, followed by brief exposure to **42°C**, and placing them back on ice. This forces bacteria to take up the plasmid.</li>
              </ul>
            </li>
            <li><strong>Physical Direct Delivery:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Microinjection:</strong> Recombinant DNA is directly injected into the nucleus of an animal cell using a glass micropipette.</li>
                <li><strong>Biolistics / Gene Gun:</strong> Cells are bombarded with high-velocity microparticles of gold or tungsten coated with DNA (primarily used for plant cells).</li>
              </ul>
            </li>
          </ul>

          {/* SVG 3: Biolistics vs Microinjection */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 140" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">DIRECT GENE DELIVERY METHODS</text>
              
              {/* Microinjection (left) */}
              <g transform="translate(30, 35)">
                <rect x="0" y="0" width="150" height="90" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="75" y="15" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Microinjection</text>
                
                {/* Cell */}
                <circle cx="65" cy="55" r="22" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <circle cx="65" cy="55" r="8" fill="#3b0764" stroke="#a78bfa" strokeWidth="1.5" />
                
                {/* Needle */}
                <path d="M 5 60 L 50 56 L 60 55" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                <text x="65" y="83" fill="#ffffff" fontSize="7" textAnchor="middle">DNA injected into nucleus</text>
              </g>

              {/* Gene Gun (right) */}
              <g transform="translate(220, 35)">
                <rect x="0" y="0" width="150" height="90" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="75" y="15" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">Biolistics / Gene Gun</text>
                
                {/* Target Cell */}
                <rect x="90" y="35" width="40" height="40" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                
                {/* Fired particles */}
                <circle cx="30" cy="55" r="2" fill="#eab308" />
                <circle cx="50" cy="53" r="2" fill="#eab308" />
                <circle cx="70" cy="56" r="2" fill="#eab308" />
                
                <text x="75" y="83" fill="#ffffff" fontSize="7" textAnchor="middle">Gold/Tungsten microparticles</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="4. Processes of r-DNA: PCR & Gel Electrophoresis" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Isolation of DNA:</strong> Cells are treated with enzymes like lysozyme (bacteria), cellulase (plants), or chitinase (fungi). DNA is precipitated out as fine threads by adding **chilled ethanol**.</li>
            <li><strong>Gel Electrophoresis:</strong> Separates DNA fragments cut by restriction endonucleases:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>DNA fragments are negatively charged and migrate toward the positive terminal (**anode**).</li>
                <li>Sieve properties of **agarose gel** separate fragments by size (smaller fragments travel faster and further).</li>
                <li>Fragments are stained with <strong className="text-emerald-400">Ethidium Bromide (EtBr)</strong> and visualized under **UV light**, showing bright orange bands. They are extracted via **elution**.</li>
              </ul>
            </li>
            <li><strong>Polymerase Chain Reaction (PCR):</strong> Consists of three main sequential thermal steps:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Denaturation (94°C):</strong> The double-stranded template DNA is heated to separate the strands.</li>
                <li><strong>Annealing (54°C):</strong> Two sets of oligonucleotide primers hybridize to the 3\' ends of separated single-stranded templates.</li>
                <li><strong>Extension (72°C):</strong> **Taq Polymerase** synthesizes new strands by adding deoxynucleotides (dNTPs) to the primers. Taq polymerase is thermostable (isolated from *Thermus aquaticus*) and does not denature at high temperatures.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 4: PCR Thermal Cycles */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 200" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">POLYMERASE CHAIN REACTION (PCR) STAGES</text>
              
              {/* Stage 1: Denaturation */}
              <g transform="translate(10, 40)">
                <rect x="0" y="10" width="120" height="120" rx="4" fill="#0c0d1e" stroke="#ffffff" strokeWidth="1" />
                <text x="60" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">1. Denaturation (94°C)</text>
                {/* separated strands */}
                <path d="M 20 50 Q 60 35 100 50" fill="none" stroke="#ef4444" strokeWidth="2" />
                <path d="M 20 90 Q 60 105 100 90" fill="none" stroke="#ef4444" strokeWidth="2" />
                <text x="60" y="115" fill="#ef4444" fontSize="7" textAnchor="middle">Strands Separate</text>
              </g>

              {/* Stage 2: Annealing */}
              <g transform="translate(150, 40)">
                <rect x="0" y="10" width="130" height="120" rx="4" fill="#0c0d1e" stroke="#ffffff" strokeWidth="1" />
                <text x="65" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">2. Annealing (54°C)</text>
                {/* strands with primers */}
                <path d="M 15 50 L 115 50" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M 15 90 L 115 90" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                {/* primers */}
                <rect x="15" y="52" width="30" height="4" fill="#eab308" />
                <rect x="85" y="84" width="30" height="4" fill="#eab308" />
                <text x="65" y="115" fill="#eab308" fontSize="7" textAnchor="middle">Primers Bind</text>
              </g>

              {/* Stage 3: Extension */}
              <g transform="translate(300, 40)">
                <rect x="0" y="10" width="130" height="120" rx="4" fill="#0c0d1e" stroke="#ffffff" strokeWidth="1" />
                <text x="65" y="23" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">3. Extension (72°C)</text>
                {/* Taq extending */}
                <path d="M 15 50 L 115 50" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M 15 90 L 115 90" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                {/* extended strands */}
                <path d="M 15 54 L 85 54" fill="none" stroke="#10b981" strokeWidth="2.5" />
                <path d="M 45 86 L 115 86" fill="none" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="85" cy="54" r="5" fill="#22d3ee" />
                <text x="85" y="47" fill="#22d3ee" fontSize="6">Taq</text>
                <text x="65" y="115" fill="#10b981" fontSize="7" textAnchor="middle">Taq Polymerase Adds bases</text>
              </g>
            </svg>
          </div>

          {/* SVG 5: Gel Electrophoresis */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 380 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="190" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">GEL ELECTROPHORESIS DNA SEPARATION</text>
              
              {/* Gel chamber */}
              <rect x="50" y="40" width="280" height="120" fill="#1e1b4b" stroke="#ffffff" strokeWidth="1" />
              
              {/* Wells at cathode end */}
              <rect x="70" y="50" width="15" height="8" fill="#090b16" stroke="#ffffff" strokeWidth="0.8" />
              <rect x="70" y="75" width="15" height="8" fill="#090b16" stroke="#ffffff" strokeWidth="0.8" />
              <rect x="70" y="100" width="15" height="8" fill="#090b16" stroke="#ffffff" strokeWidth="0.8" />
              <rect x="70" y="125" width="15" height="8" fill="#090b16" stroke="#ffffff" strokeWidth="0.8" />

              {/* DNA Bands orange */}
              {/* Well 2 (Partially digested) */}
              <rect x="110" y="75" width="5" height="8" fill="#f97316" />
              <rect x="160" y="75" width="5" height="8" fill="#f97316" />
              <rect x="220" y="75" width="5" height="8" fill="#f97316" />

              {/* Well 3 (Fully digested - small fragments travel far) */}
              <rect x="130" y="100" width="5" height="8" fill="#f97316" />
              <rect x="200" y="100" width="5" height="8" fill="#f97316" />
              <rect x="280" y="100" width="5" height="8" fill="#f97316" />

              {/* Terminals */}
              <text x="25" y="105" fill="#f43f5e" fontSize="14" fontWeight="bold" textAnchor="middle">-</text>
              <text x="25" y="120" fill="#f43f5e" fontSize="8" textAnchor="middle">Cathode</text>
              
              <text x="355" y="105" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
              <text x="355" y="120" fill="#10b981" fontSize="8" textAnchor="middle">Anode</text>
              
              <text x="190" y="152" fill="#ffffff" fontSize="8" textAnchor="middle">Small fragments travel faster toward Anode (+)</text>
            </svg>
          </div>

          <SectionBanner label="5. Bioreactors & Downstream Processing" color="cyan" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Bioreactors:</strong> Large vessels (<InlineMath math="100 - 1000\\text{ liters}" />) where raw materials are biologically converted into specific products using microbial, plant, or animal cells:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Provide optimal growth conditions: temperature, pH, substrate, salts, vitamins, and oxygen.</li>
                <li><strong>Simple Stirred-Tank Bioreactor:</strong> Features a flat-bladed impeller for mixing and oxygen transport.</li>
                <li><strong>Sparged Stirred-Tank Bioreactor:</strong> Sterile air bubbles are sparged through the reactor, increasing the surface area for oxygen transfer.</li>
              </ul>
            </li>
            <li><strong>Downstream Processing:</strong> A multi-step sequence to prepare the raw product for clinical release or commercial sale:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Separation & Purification:</strong> Isolating the desired enzyme/protein from host cells and cultivation broth.</li>
                <li><strong>Quality Control Testing:</strong> Strict validation of product safety and efficacy.</li>
                <li><strong>Formulation:</strong> Formulating the product with appropriate preservatives before packaging.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 6: Simple Stirred-Tank Bioreactor */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 350 220" className="w-full max-w-xs bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="175" y="20" fill="#22d3ee" fontSize="12" fontWeight="bold" textAnchor="middle">STIRRED-TANK BIOREACTOR SYSTEM</text>
              
              {/* Tank outline */}
              <rect x="110" y="50" width="130" height="120" rx="10" fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
              
              {/* Central shaft with impellers */}
              <line x1="175" y1="35" x2="175" y2="160" stroke="#ffffff" strokeWidth="2" />
              <rect x="160" y="30" width="30" height="10" rx="2" fill="#ef4444" /> {/* Motor */}
              <text x="175" y="28" fill="#ef4444" fontSize="6" textAnchor="middle">Motor</text>

              {/* Impeller blades */}
              <line x1="150" y1="90" x2="200" y2="90" stroke="#a78bfa" strokeWidth="3.5" />
              <line x1="150" y1="130" x2="200" y2="130" stroke="#a78bfa" strokeWidth="3.5" />

              {/* Sterile air entry */}
              <path d="M 75 155 L 120 155" stroke="#3b82f6" strokeWidth="2" />
              <text x="65" y="152" fill="#3b82f6" fontSize="7">Sterile Air</text>

              {/* pH adjustment inlet */}
              <path d="M 90 70 L 120 75" stroke="#10b981" strokeWidth="1.5" />
              <text x="75" y="67" fill="#10b981" fontSize="7">pH control</text>

              {/* Impeller label */}
              <text x="215" y="112" fill="#a78bfa" fontSize="8">Stirrer Blades</text>
            </svg>
          </div>

          {/* SVG 7: Downstream Processing Flowchart */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 120" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="15" fill="#22d3ee" fontSize="11" fontWeight="bold" textAnchor="middle">DOWNSTREAM PROCESSING FLOW</text>
              
              <rect x="20" y="35" width="90" height="30" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              <text x="65" y="53" fill="#ffffff" fontSize="8" textAnchor="middle">1. Separation</text>
              
              <line x1="110" y1="50" x2="140" y2="50" stroke="#10b981" strokeWidth="1.5" />
              
              <rect x="150" y="35" width="100" height="30" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              <text x="200" y="53" fill="#ffffff" fontSize="8" textAnchor="middle">2. Purification</text>

              <line x1="250" y1="50" x2="280" y2="50" stroke="#10b981" strokeWidth="1.5" />

              <rect x="290" y="35" width="90" height="30" rx="3" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              <text x="335" y="53" fill="#ffffff" fontSize="8" textAnchor="middle">3. Quality Testing</text>

              <path d="M 200 65 L 200 85" stroke="#ffffff" strokeWidth="1" />
              <rect x="130" y="85" width="140" height="25" rx="3" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
              <text x="200" y="100" fill="#10b981" fontSize="8" textAnchor="middle" fontWeight="bold">Preservation & Formulation</text>
            </svg>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 2: BIOTECHNOLOGY AND ITS APPLICATIONS ──────────────────── */}
      <Collapsible title="2 · Biotechnology and Its Applications" icon={<Layers className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13px] text-white/70 font-sans">
          
          <SectionBanner label="1. Agricultural Biotechnology: Bt Cotton & RNAi" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Golden Rice:</strong> Genetically modified rice variety enriched with <strong className="text-emerald-400"><InlineMath math="\\beta" />-carotene</strong> (provitamin A) to combat Vitamin A deficiency.
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Created by introducing two genes: **psy** (phytoene synthase) from daffodil (*Narcissus pseudonarcissus*) and **crtI** (phytoene desaturase) from the soil bacterium *Erwinia uredovora*.</li>
                <li>These enzymes complete the biosynthesis pathway of <InlineMath math="\\beta" />-carotene in the rice endosperm, turning the grains golden-yellow.</li>
              </ul>
            </li>
            <li><strong>Other GM Crops:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Bt Brinjal:</strong> Resistant to shoot and fruit borer insect pests due to Bt Cry toxin genes.</li>
                <li><strong>Flavr Savr Tomato:</strong> Developed using antisense RNA technology to silence the gene encoding the cell wall pectin-degrading enzyme **polygalacturonase**. This delays softening, prolonging shelf-life.</li>
              </ul>
            </li>
            <li><strong>Bt Cotton:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>*Bacillus thuringiensis* bacteria produce crystalline insecticidal protein crystals (**Cry toxins**). These are encoded by genes named **cry** (e.g., *cryIAc* and *cryIIAb* control cotton bollworms, *cryIAb* controls corn borer).</li>
                <li>The toxin exists as an inactive protoxin in the bacteria. Once ingested by the insect, it is solubilized by the **alkaline pH** of the insect midgut.</li>
                <li>The active toxin binds to the surface of **midgut epithelial cells**, creating pores that cause cell swelling and lysis, eventually leading to death of the insect.</li>
              </ul>
            </li>
            <li><strong>Pest-Resistant Plants (RNA Interference):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>The nematode **Meloidogyne incognita** infects the roots of tobacco plants, reducing crop yield.</li>
                <li>**RNAi** is a natural cellular defense mechanism in all eukaryotic organisms that blocks translation via post-transcriptional gene silencing.</li>
                <li>Nematode-specific genes are introduced into the tobacco plant using *Agrobacterium* vectors. The plant cell transcribes both sense and antisense RNA, forming **double-stranded RNA (dsRNA)**.</li>
                <li>When the nematode ingests host tissue, this dsRNA is processed by the host enzyme **Dicer** into small interfering RNAs (siRNAs) that associate with the **RISC** complex to bind and cleave the nematode\'s complementary mRNA, silencing the gene.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 8: RNA Interference (RNAi) Pathway */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">RNA INTERFERENCE (RNAi) SILENCING</text>
              
              {/* dsRNA */}
              <g transform="translate(40, 35)">
                <line x1="10" y1="15" x2="90" y2="15" stroke="#60a5fa" strokeWidth="2.5" />
                <line x1="10" y1="21" x2="90" y2="21" stroke="#fb7185" strokeWidth="2.5" />
                <text x="50" y="10" fill="#ffffff" fontSize="7" textAnchor="middle">dsRNA</text>
              </g>

              {/* Dicer enzyme */}
              <g transform="translate(150, 35)">
                <rect x="0" y="5" width="50" height="25" rx="3" fill="#eab308" stroke="#ffffff" strokeWidth="1" />
                <text x="25" y="20" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">Dicer</text>
              </g>

              {/* siRNA */}
              <g transform="translate(230, 35)">
                <line x1="10" y1="12" x2="35" y2="12" stroke="#60a5fa" strokeWidth="2" strokeDasharray="1.5" />
                <line x1="10" y1="17" x2="35" y2="17" stroke="#fb7185" strokeWidth="2" strokeDasharray="1.5" />
                <text x="22" y="7" fill="#ffffff" fontSize="6">siRNA</text>
              </g>

              {/* Target mRNA cleavage */}
              <g transform="translate(60, 100)">
                <line x1="20" y1="20" x2="280" y2="20" stroke="#fb7185" strokeWidth="3" />
                <text x="30" y="13" fill="#fb7185" fontSize="8" fontWeight="bold">Nematode target mRNA</text>
                {/* cleavage cut scissors */}
                <rect x="150" y="10" width="30" height="20" fill="#ef4444" rx="3" />
                <text x="165" y="22" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">Cut</text>
                <text x="215" y="13" fill="#10b981" fontSize="8">RISC Silenced</text>
              </g>
            </svg>
          </div>

          <SectionBanner label="2. Medical Applications: Humulin & Gene Therapy" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Genetically Engineered Insulin (Humulin):</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Insulin was previously extracted from pancreas of slaughtered pigs/cattle, causing allergies in some patients.</li>
                <li>In 1983, Eli Lilly (an American company) prepared two DNA sequences corresponding to **A and B chains** of human insulin.</li>
                <li>These were introduced into plasmids of *E. coli* to produce insulin chains separately. The chains were extracted and combined by creating **disulfide bonds**.</li>
                <li><strong>Proinsulin vs. Mature Insulin:</strong> In humans, insulin is synthesized as a pro-hormone containing a **C-peptide**. During maturation into active insulin, this C-peptide is removed. Genetically engineered insulin lacks this C-peptide.</li>
              </ul>
            </li>
            <li><strong>Molecular Diagnosis Techniques:</strong> Early diagnostic methods that overcome the limitations of low pathogen titers:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>PCR Diagnosis:</strong> Amplifies trace amounts of pathogen DNA/RNA (e.g., HIV detection, screening genetic disorders).</li>
                <li><strong>Recombinant DNA Probes:</strong> Single-stranded DNA/RNA tagged with radioactive molecules. Probes hybridize with complementary DNA in a clone pool; detected using **autoradiography**. Mutated genes fail to hybridize due to lack of complementarity, leaving a blank on the film.</li>
                <li><strong>ELISA:</strong> Detects antigens or antibodies based on capture antibody-substrate assays.</li>
              </ul>
            </li>
            <li><strong>Recombinant Vaccines:</strong> Produced by expressing immunogenic antigen proteins in microbial systems:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Hepatitis B Vaccine:</strong> The first recombinant vaccine. Produced by expressing the Hepatitis B surface antigen (HBsAg) in the yeast **Saccharomyces cerevisiae**, yielding high-purity antigens.</li>
              </ul>
            </li>
            <li><strong>Stem Cell & Cancer Gene Therapies:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>Stem Cell Therapy:</strong> Employs self-renewing pluripotent stem cells for tissue regeneration (e.g., bone marrow transplants, repairing cardiac muscle).</li>
                <li><strong>Cancer Gene Therapy:</strong> Introducing tumor suppressor genes (like **p53**) or suicide genes into tumor cells to arrest growth or trigger selective cell death.</li>
              </ul>
            </li>
            <li><strong>ADA Gene Therapy:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>The first clinical gene therapy was given in 1990 to a 4-year-old girl with **Adenosine Deaminase (ADA) deficiency** (causes SCID).</li>
                <li>Lymphocytes from the patient\'s blood are grown in culture. A functional ADA cDNA (using a disarmed retroviral vector) is introduced into these lymphocytes, which are then reinfused into the patient.</li>
                <li>Because lymphocytes are not immortal, the patient requires periodic infusion of engineered lymphocytes.</li>
                <li>A **permanent cure** is achieved only if genes isolated from bone marrow cells producing ADA are introduced into cells at **early embryonic stages**.</li>
              </ul>
            </li>
          </ul>

          {/* SVG 9: Insulin Maturation Flow */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 400 180" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="200" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">HUMAN INSULIN MATURATION</text>
              
              {/* Proinsulin (A + B + C) */}
              <g transform="translate(30, 35)">
                <rect x="0" y="0" width="130" height="90" rx="5" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
                <text x="65" y="15" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">Proinsulin (Inactive)</text>
                
                <path d="M 20 40 Q 65 30 110 40" fill="none" stroke="#60a5fa" strokeWidth="3" /> {/* A chain */}
                <path d="M 20 80 Q 65 90 110 80" fill="none" stroke="#fb7185" strokeWidth="3" /> {/* B chain */}
                <path d="M 110 40 C 130 50, 130 70, 110 80" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="2" /> {/* C peptide */}
                
                <text x="35" y="52" fill="#60a5fa" fontSize="7">A Chain</text>
                <text x="35" y="72" fill="#fb7185" fontSize="7">B Chain</text>
                <text x="125" y="63" fill="#eab308" fontSize="7">C Peptide</text>
              </g>

              {/* Arrow showing cleavage */}
              <path d="M 175 80 L 210 80" stroke="#ffffff" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="192" y="72" fill="#ef4444" fontSize="7" textAnchor="middle">Cleaved</text>

              {/* Mature Active Insulin */}
              <g transform="translate(230, 35)">
                <rect x="0" y="0" width="140" height="90" rx="5" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                <text x="70" y="15" fill="#10b981" fontSize="8" textAnchor="middle" fontWeight="bold">Active Insulin (Humulin)</text>
                
                <path d="M 20 40 Q 70 30 120 40" fill="none" stroke="#60a5fa" strokeWidth="3" />
                <path d="M 20 70 Q 70 80 120 70" fill="none" stroke="#fb7185" strokeWidth="3" />
                
                {/* Disulfide bonds linking A and B */}
                <line x1="45" y1="42" x2="45" y2="68" stroke="#eab308" strokeWidth="1.5" />
                <line x1="95" y1="42" x2="95" y2="68" stroke="#eab308" strokeWidth="1.5" />
                
                <text x="70" y="58" fill="#eab308" fontSize="7" textAnchor="middle">Disulfide Bonds</text>
              </g>
            </svg>
          </div>

          {/* SVG 10B: Golden Rice & Hybridization Probe */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 420 150" className="w-full max-w-sm bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="210" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">GOLDEN RICE PATHWAY & DNA PROBE</text>
              
              <g transform="translate(15, 35)">
                <rect x="0" y="0" width="180" height="90" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="90" y="15" fill="#eab308" fontSize="8" fontWeight="bold" textAnchor="middle">Beta-Carotene Biosynthesis</text>
                
                <text x="15" y="38" fill="#ffffff" fontSize="7">GGPP</text>
                <line x1="45" y1="35" x2="80" y2="35" stroke="#eab308" strokeWidth="1.5" />
                <text x="62" y="32" fill="#eab308" fontSize="6" textAnchor="middle">psy</text>
                
                <text x="85" y="38" fill="#ffffff" fontSize="7">Phytoene</text>
                <line x1="125" y1="35" x2="160" y2="35" stroke="#eab308" strokeWidth="1.5" />
                <text x="142" y="32" fill="#eab308" fontSize="6" textAnchor="middle">crtI</text>
                
                <rect x="40" y="55" width="100" height="25" rx="3" fill="#78350f" stroke="#eab308" strokeWidth="1" />
                <text x="90" y="70" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">Beta-Carotene</text>
              </g>

              <g transform="translate(225, 35)">
                <rect x="0" y="0" width="170" height="90" rx="4" fill="#090b16" stroke="#ffffff" strokeWidth="1" />
                <text x="85" y="15" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">Radioactive DNA Probe</text>
                
                <line x1="20" y1="45" x2="150" y2="45" stroke="#a78bfa" strokeWidth="2.5" />
                <line x1="40" y1="52" x2="130" y2="52" stroke="#eab308" strokeWidth="2" strokeDasharray="2" />
                <circle cx="85" cy="52" r="3" fill="#eab308" />
                <text x="85" y="65" fill="#eab308" fontSize="7" textAnchor="middle">Radioactive Label</text>
                <text x="85" y="80" fill="#ffffff" fontSize="7" textAnchor="middle">Detects complementary sequence</text>
              </g>
            </svg>
          </div>

          {/* SVG 10: ADA Lymphocyte Gene Therapy */}
          <div className="py-2 flex justify-center">
            <svg viewBox="0 0 450 150" className="w-full max-w-lg bg-black/40 rounded-2xl border border-white/5 p-2">
              <text x="225" y="20" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">ADA LYMPHOCYTE GENE THERAPY WORKFLOW</text>
              
              <rect x="15" y="45" width="80" height="35" rx="4" fill="#1e293b" stroke="#ffffff" strokeWidth="1" />
              <text x="55" y="60" fill="#ffffff" fontSize="7" textAnchor="middle">Lymphocytes</text>
              <text x="55" y="70" fill="#94a3b8" fontSize="6" textAnchor="middle">isolated from patient</text>

              <line x1="95" y1="62" x2="125" y2="62" stroke="#10b981" strokeWidth="1.5" />

              <rect x="130" y="45" width="90" height="35" rx="4" fill="#3b0764" stroke="#a78bfa" strokeWidth="1" />
              <text x="175" y="58" fill="#a78bfa" fontSize="7" textAnchor="middle">Transduction</text>
              <text x="175" y="68" fill="#d8b4fe" fontSize="6" textAnchor="middle">Retroviral ADA cDNA</text>

              <line x1="220" y1="62" x2="250" y2="62" stroke="#10b981" strokeWidth="1.5" />

              <rect x="255" y="45" width="80" height="35" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
              <text x="295" y="60" fill="#10b981" fontSize="7" textAnchor="middle">Re-infusion</text>
              <text x="295" y="70" fill="#ffffff" fontSize="6" textAnchor="middle">infused to patient</text>

              <text x="225" y="115" fill="#f43f5e" fontSize="8" textAnchor="middle" fontWeight="bold">Not Permanent: Lymphocytes are not immortal (Requires repeat dosing)</text>
            </svg>
          </div>

          <SectionBanner label="3. Transgenic Animals & Ethical Issues" color="emerald" />
          <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-xs">
            <li><strong>Transgenic Animals:</strong> Animals that have had their DNA manipulated to possess and express an extra (foreign) gene:
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li>Over 95% of all existing transgenic animals are **mice**.</li>
                <li><strong>Rosie Cow (1997):</strong> First transgenic cow, produced human protein-enriched milk (<InlineMath math="2.4\\text{ g/liter}" />). The milk contained the human protein **<InlineMath math="\\alpha" />-lactalbumin** and was nutritionally more balanced for human babies than natural cow milk.</li>
                <li><strong>Biological Products:</strong> Transgenic animals are created to produce proteins like **<InlineMath math="\\alpha" />-1-antitrypsin** (used to treat emphysema) and treatments for PKU and cystic fibrosis.</li>
              </ul>
            </li>
            <li><strong>Ethical Issues & Biopiracy:</strong>
              <ul className="list-circle pl-5 mt-1 space-y-0.5">
                <li><strong>GEAC (Genetic Engineering Appraisal Committee):</strong> An Indian government organization that evaluates the validity of GM research and inspects the safety of introducing GM organisms for public services.</li>
                <li><strong>Biopiracy:</strong> Use of bio-resources by multinational companies and other organizations without proper authorization from the countries and people concerned without compensatory payment.</li>
                <li><strong>Basmati Rice Patent:</strong> In 1997, an American company got patent rights on Basmati rice through the US Patent and Trademark Office. This allowed the company to sell a "new" variety of Basmati, which was actually derived by crossing Indian Basmati with semi-dwarf varieties.</li>
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
            3 · Applied Biotechnology Lab Simulator
          </h2>
          <Tag color="cyan">Interactive Lab</Tag>
        </div>

        <p className="text-[13px] text-white/70 leading-relaxed">
          Select a genetic specimen and apply a specific biotechnology treatment to evaluate DNA cuts, thermal cycle amplifications, RNA interference silencing, and retroviral ADA transduction.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Specimen Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">1. Select Specimen</label>
              <div className="grid grid-cols-1 gap-2">
                <button 
                  onClick={() => setSpecimen('pbr322')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'pbr322' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  pBR322 Plasmid Vector
                </button>
                <button 
                  onClick={() => setSpecimen('target_dna')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'target_dna' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Target Gene DNA Insert
                </button>
                <button 
                  onClick={() => setSpecimen('tobacco_root')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'tobacco_root' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  Tobacco Root Tissue
                </button>
                <button 
                  onClick={() => setSpecimen('lymphocyte')}
                  className={`p-2 rounded-xl border text-xs font-bold text-left transition ${specimen === 'lymphocyte' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                >
                  SCID Patient Lymphocytes
                </button>
              </div>
            </div>

            {/* Treatment Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block">2. Apply Stimulus / Enzyme</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'eco_ri', label: 'Add EcoRI Endonuclease' },
                  { id: 'pcr_ampl', label: 'Run PCR Amplification' },
                  { id: 'rnai_dsrna', label: 'Transfect Nematode dsRNA' },
                  { id: 'ada_retrovirus', label: 'Transduce Retroviral ADA cDNA' }
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
              <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Applied Biotech Screen</span>
              <span className="text-xs font-mono text-cyan-400">Status: Complete</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Recombinant Outcome</span>
                  <span className={`text-base font-bold font-display ${sim.color}`}>{sim.outcome}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Microscope / Cycle Observation</span>
                  <span className="text-white font-semibold">{sim.visualEffect}</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Molecular Products</span>
                  <span className="text-white font-mono font-semibold">{sim.product}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl text-left leading-relaxed text-white/70">
              <strong className="text-cyan-400 block mb-1">Molecular Mechanism:</strong>
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
            <Tag color="cyan">Problem 1: PCR Amplification Yield Calculations</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Starting with 10 double-stranded target DNA molecules, calculate the total number of DNA molecules synthesized after 25 complete cycles of PCR, assuming 100% amplification efficiency."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The formula for PCR yield after n cycles is:"}</div>
              <div className="pl-3"><InlineMath math="\text{Yield} = N_0 \times 2^n" /></div>
              <div>{"Where:"}</div>
              <div className="pl-3"><InlineMath math="N_0 = 10 \text{ (Initial molecules)}" /></div>
              <div className="pl-3"><InlineMath math="n = 25 \text{ (Number of cycles)}" /></div>
              <div>{"2. Calculate the exponential term:"}</div>
              <div className="pl-3"><InlineMath math="2^{25} = 33,554,432" /></div>
              <div>{"3. Calculate the total yield:"}</div>
              <div className="pl-3"><InlineMath math="\text{Yield} = 10 \times 33,554,432 = 335,544,320" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Approximately 3.36 × 10⁸ DNA molecules are synthesized.</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Insertional Inactivation Recombinant Ratios</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"During a cloning experiment in pBR322, a target gene is ligated at the BamHI site. The ligation mix is transformed into E. coli. Explain the expected growth profiles of recombinants and non-recombinants on Ampicillin-containing and Tetracycline-containing agar plates."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The BamHI restriction site resides inside the tetR (tetracycline resistance) gene. Ligation of target DNA at this site disrupts the tetR gene, causing insertional inactivation."}</div>
              <div>{"2. Transformants containing Recombinant Plasmids: Will grow on Ampicillin plates (since ampR remains intact) but will NOT grow on Tetracycline plates."}</div>
              <div>{"3. Transformants containing Non-Recombinant Plasmids: Will grow on both Ampicillin plates and Tetracycline plates."}</div>
              <div>{"4. Non-transformants: Lacking any plasmid, they will fail to grow on either plate."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Recombinants grow on Ampicillin but die on Tetracycline. Non-recombinants grow on both.</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: ADA Transgene Therapy Infusion Frequencies</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Explain why SCID patients receiving ADA gene therapy via engineered T-lymphocytes require periodic repeat infusions, whereas transfecting stem cells at the embryonic stage provides a permanent cure."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. Adult T-lymphocytes are differentiated cells that are not immortal. They undergo apoptosis and are replaced by the body\'s native, non-engineered cells over time."}</div>
              <div>{"2. Transfected mature lymphocytes are depleted within months, causing the ADA levels in blood to fall, requiring fresh infusions of genetically modified cells."}</div>
              <div>{"3. In contrast, bone marrow stem cells transfected during the embryonic stage are self-renewing (pluripotent) and give rise to an immortal lineage of ADA-producing T-lymphocytes, offering a lifetime cure."}</div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: Mature T-lymphocytes have a finite lifespan; embryonic stem cells are self-renewing.</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Ligation Vector-to-Insert Molar Ratios</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A researcher performs a ligation with a 4.0 kb plasmid vector and a 1.0 kb target insert. If 100 ng of vector DNA is used, calculate the mass of insert DNA required to achieve a 1:3 vector-to-insert molar ratio."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <strong className="text-white block mb-1 font-mono text-xs">Detailed Solution:</strong>
              <div>{"1. The formula relating mass, size, and molar ratio of vector and insert is:"}</div>
              <div className="pl-3"><InlineMath math="\text{Mass of Insert (ng)} = \text{Molar Ratio} \times \left(\frac{\text{Size of Insert (kb)}}{\text{Size of Vector (kb)}}\right) \times \text{Mass of Vector (ng)}" /></div>
              <div>{"Where:"}</div>
              <div className="pl-3"><InlineMath math="\text{Molar Ratio (Insert:Vector)} = 3 / 1 = 3" /></div>
              <div className="pl-3"><InlineMath math="\text{Size of Insert} = 1.0 \text{ kb}" /></div>
              <div className="pl-3"><InlineMath math="\text{Size of Vector} = 4.0 \text{ kb}" /></div>
              <div className="pl-3"><InlineMath math="\text{Mass of Vector} = 100 \text{ ng}" /></div>
              <div>{"2. Substitute values into the formula:"}</div>
              <div className="pl-3"><InlineMath math="\text{Mass of Insert} = 3 \times \left(\frac{1.0}{4.0}\right) \times 100" /></div>
              <div className="pl-3"><InlineMath math="\text{Mass of Insert} = 3 \times 0.25 \times 100 = 75 \text{ ng}" /></div>
              <span className="text-emerald-400 font-bold block mt-1 font-mono text-xs font-bold">Answer: The researcher needs exactly 75 ng of insert DNA to achieve the desired 1:3 molar ratio.</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ─── SECTION 5: PRACTICE MOCK TEST ────────────────────────────────── */}
      <Collapsible title="5 · Practice Mock Test (15 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13px] sm:text-sm text-white/80">
          <p className="text-white/60 font-sans">
            Validate your understanding of Biotechnology Tools, Processes, and applications with these IAT-level questions.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which restriction endonuclease was discovered first and cuts DNA by recognizing a specific sequence of 6 base pairs?',
                a: 'EcoRI',
                b: 'HindII',
                c: 'BamHI',
                d: 'PstI',
                ans: 'Correct Answer: B. HindII was the first restriction endonuclease discovered and characterized.'
              },
              {
                q: 'EcoRI cleaves double-stranded DNA between which two nucleotides in its palindromic recognition sequence?',
                a: 'A and T',
                b: 'G and A',
                c: 'T and C',
                d: 'C and G',
                ans: 'Correct Answer: B. EcoRI cuts between Guanine (G) and Adenine (A) in the sequence 5\'-GAATTC-3\'.'
              },
              {
                q: 'In the pBR322 plasmid vector, where does the BamHI restriction site reside?',
                a: 'Within the ampR gene',
                b: 'Within the tetR gene',
                c: 'Within the ori region',
                d: 'Within the rop gene',
                ans: 'Correct Answer: B. The BamHI site is located inside the tetracycline resistance (tetR) gene.'
              },
              {
                q: 'Which enzyme is insertional inactivated in the blue-white screening marker selection system?',
                a: 'Taq Polymerase',
                b: 'Beta-galactosidase',
                c: 'DNA Ligase',
                d: 'Alkaline Phosphatase',
                ans: 'Correct Answer: B. Recombinants cause insertional inactivation of beta-galactosidase, making colonies white.'
              },
              {
                q: 'Which bacterium is used to deliver disarmed Ti plasmids to transform plant cells?',
                a: 'Bacillus thuringiensis',
                b: 'Agrobacterium tumefaciens',
                c: 'Thermus aquaticus',
                d: 'Escherichia coli',
                ans: 'Correct Answer: B. Agrobacterium tumefaciens is a natural genetic engineer used to transfer T-DNA into dicot plants.'
              },
              {
                q: 'What divalent cation is commonly used to treat bacterial cells to increase their competency to take up DNA?',
                a: 'Magnesium',
                b: 'Calcium',
                c: 'Sodium',
                d: 'Potassium',
                ans: 'Correct Answer: B. Divalent Calcium ions (Ca2+) increase the efficiency of DNA entry through cell wall pores.'
              },
              {
                q: 'The Gold or Tungsten microparticles used in the Biolistics Gene Gun are coated with:',
                a: 'RNA probes',
                b: 'Recombinant DNA',
                c: 'Antibiotics',
                d: 'Ligases',
                ans: 'Correct Answer: B. High-velocity gold/tungsten particles are coated with DNA and fired into target cells.'
              },
              {
                q: 'What is the temperature required for the Denaturation step in a standard PCR cycle?',
                a: '54°C',
                b: '94°C',
                c: '72°C',
                d: '37°C',
                ans: 'Correct Answer: B. Denaturation is carried out at high temperatures (around 94°C) to separate double-stranded DNA.'
              },
              {
                q: 'Taq Polymerase used in PCR is isolated from which thermophilic bacterium?',
                a: 'Bacillus thuringiensis',
                b: 'Thermus aquaticus',
                c: 'Methanobacterium',
                d: 'Streptococcus pyogenes',
                ans: 'Correct Answer: B. Taq Polymerase is extracted from Thermus aquaticus, allowing it to withstand high heat cycles.'
              },
              {
                q: 'Bt cotton toxin is activated in the insect midgut due to which physiological condition?',
                a: 'Acidic pH',
                b: 'Alkaline pH',
                c: 'Neutral pH',
                d: 'High temperature',
                ans: 'Correct Answer: B. The alkaline pH of the insect midgut solubilizes the crystalline protoxins, activating them.'
              },
              {
                q: 'RNA interference (RNAi) silences genes post-transcriptionally through the formation of:',
                a: 'Single-stranded DNA',
                b: 'Double-stranded RNA (dsRNA)',
                c: 'Triplex DNA',
                d: 'mRNA-ribosome complexes',
                ans: 'Correct Answer: B. dsRNA triggers cellular silencing pathways (Dicer/RISC) to cleave matching mRNAs.'
              },
              {
                q: 'Genetically engineered insulin (Humulin) differs from human proinsulin because it lacks:',
                a: 'A chain',
                b: 'C peptide',
                c: 'B chain',
                d: 'Disulfide bonds',
                ans: 'Correct Answer: B. Humulin contains only A and B chains linked by disulfide bonds; the C-peptide is excluded.'
              },
              {
                q: 'To achieve a permanent cure for ADA deficiency, functional genes must be introduced into cells at what stage?',
                a: 'Adulthood',
                b: 'Early embryonic stages',
                c: 'Infancy',
                d: 'During puberty',
                ans: 'Correct Answer: B. Transfection into stem cells at early embryonic stages yields a permanent lifetime cure.'
              },
              {
                q: 'The first transgenic cow, Rosie (1997), produced milk enriched with which human protein?',
                a: 'Alpha-1-antitrypsin',
                b: 'Alpha-lactalbumin',
                c: 'Adenosine Deaminase',
                d: 'Beta-galactosidase',
                ans: 'Correct Answer: B. Rosie produced milk containing 2.4 g/L of human alpha-lactalbumin.'
              },
              {
                q: 'Which Indian government committee evaluates the safety and validity of GM research and public release?',
                a: 'Widal Committee',
                b: 'GEAC',
                c: 'Avery Committee',
                d: 'NIH Board',
                ans: 'Correct Answer: B. The Genetic Engineering Appraisal Committee (GEAC) evaluates ethical and safety aspects of GMOs.'
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
        <span className="text-[11px] text-white/30 font-mono">Biotechnology · Unit 9</span>
      </div>

    </div>
  );
}
