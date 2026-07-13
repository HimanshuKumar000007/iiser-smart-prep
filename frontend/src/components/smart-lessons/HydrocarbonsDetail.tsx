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
  Scissors,
  Activity
} from 'lucide-react';

// ─── LOCAL SUB-COMPONENTS ───────────────────────────────────────────────────

function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' | 'pink' }) {
  const styles = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${styles[color]}`}>
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
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 flex gap-3 text-[13px] text-white/70 leading-relaxed">
      <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      <div>
        <span className="text-cyan-400 font-bold block mb-0.5">Gold Tip / Insight</span>
        {children}
      </div>
    </div>
  );
}

function WarningCard({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 flex gap-3 text-[13px] text-white/70 leading-relaxed">
      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
      <div>
        <span className="text-rose-400 font-bold block mb-0.5">{title}</span>
        {children}
      </div>
    </div>
  );
}

function Collapsible({ 
  title, 
  icon, 
  accent = 'cyan', 
  defaultOpen = false, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode; 
  accent?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald'; 
  defaultOpen?: boolean; 
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const colors = {
    cyan: {
      border: 'border-white/5 hover:border-cyan-500/30',
      activeBorder: 'border-cyan-500/30',
      bg: 'bg-[#0b1220]/20',
      text: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10'
    },
    rose: {
      border: 'border-white/5 hover:border-rose-500/30',
      activeBorder: 'border-rose-500/30',
      bg: 'bg-[#180a0f]/20',
      text: 'text-rose-400',
      iconBg: 'bg-rose-500/10'
    },
    amber: {
      border: 'border-white/5 hover:border-amber-500/30',
      activeBorder: 'border-amber-500/30',
      bg: 'bg-[#18110a]/20',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    },
    violet: {
      border: 'border-white/5 hover:border-violet-500/30',
      activeBorder: 'border-violet-500/30',
      bg: 'bg-[#110a18]/20',
      text: 'text-violet-400',
      iconBg: 'bg-violet-500/10'
    },
    emerald: {
      border: 'border-white/5 hover:border-emerald-500/30',
      activeBorder: 'border-emerald-500/30',
      bg: 'bg-[#0a1811]/20',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10'
    }
  };

  const style = colors[accent];

  return (
    <div className={`border rounded-3xl transition-all duration-300 overflow-hidden ${isOpen ? style.activeBorder + ' ' + style.bg : style.border}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-3.5">
          <div className={`p-2.5 rounded-xl ${style.iconBg} ${style.text}`}>
            {icon}
          </div>
          <span className="font-bold text-white text-sm sm:text-base">{title}</span>
        </div>
        <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </div>
      </button>
      
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 border-t border-white/5 pt-5 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface HydrocarbonsDetailProps {
  progress?: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

export default function HydrocarbonsDetail({ progress, isCompleted, onNavigate }: HydrocarbonsDetailProps) {
  // --- Simulator 1: Ozonolysis Predictor ---
  const [alkeneTemplate, setAlkeneTemplate] = useState<'but2ene' | 'methylbut2ene' | 'cyclohexene' | 'but1ene'>('but2ene');
  const [workupType, setWorkupType] = useState<'reductive' | 'oxidative'>('reductive');

  const getOzonolysisResult = () => {
    switch (alkeneTemplate) {
      case 'but2ene':
        return {
          reactants: 'But-2-ene (CH₃-CH=CH-CH₃)',
          products: workupType === 'reductive' 
            ? '2 × Acetaldehyde (CH₃CHO)' 
            : '2 × Acetic acid (CH₃COOH)',
          mechanism: workupType === 'reductive'
            ? 'Cleavage of the C=C double bond via molozonide to form an ozonide. Reductive workup with Zn/H₂O prevents oxidation of acetaldehyde products.'
            : 'Initial cleavage forms acetaldehyde, which is subsequently oxidized to acetic acid by H₂O₂.',
          equation: workupType === 'reductive'
            ? 'CH₃-CH=CH-CH₃ + O₃ ➔ [Ozonide] ➔ (Zn/H₂O) ➔ 2 CH₃CHO'
            : 'CH₃-CH=CH-CH₃ + O₃ ➔ [Ozonide] ➔ (H₂O₂) ➔ 2 CH₃COOH'
        };
      case 'methylbut2ene':
        return {
          reactants: '2-Methylbut-2-ene (CH₃-C(CH₃)=CH-CH₃)',
          products: workupType === 'reductive'
            ? 'Acetone (CH₃COCH₃) + Acetaldehyde (CH₃CHO)'
            : 'Acetone (CH₃COCH₃) + Acetic acid (CH₃COOH)',
          mechanism: workupType === 'reductive'
            ? 'Unsymmetrical alkene. Reductive workup yields one ketone (acetone) and one aldehyde (acetaldehyde).'
            : 'Unsymmetrical alkene. Oxidative workup yields one ketone (acetone, which remains stable to further oxidation) and one carboxylic acid (acetic acid).',
          equation: workupType === 'reductive'
            ? 'CH₃-C(CH₃)=CH-CH₃ + O₃ ➔ [Ozonide] ➔ (Zn/H₂) ➔ CH₃COCH₃ + CH₃CHO'
            : 'CH₃-C(CH₃)=CH-CH₃ + O₃ ➔ [Ozonide] ➔ (H₂O₂) ➔ CH₃COCH₃ + CH₃COOH'
        };
      case 'cyclohexene':
        return {
          reactants: 'Cyclohexene (Cyclic C₆H₁₀)',
          products: workupType === 'reductive'
            ? 'Adipaldehyde / Hexanedial (OHC-CH₂-CH₂-CH₂-CH₂&minus;CHO)'
            : 'Adipic acid / Hexanedioic acid (HOOC-CH₂-CH₂-CH₂-CH₂&minus;COOH)',
          mechanism: workupType === 'reductive'
            ? 'Cleavage of a cyclic double bond opens the ring, forming a single dicarbonyl compound (dialdehyde).'
            : 'Cleavage of a cyclic double bond opens the ring, followed by oxidation of both terminal aldehyde positions to dicarboxylic acid.',
          equation: workupType === 'reductive'
            ? 'Cyclohexene + O₃ ➔ [Ozonide] ➔ (Zn/H₂O) ➔ OHC-(CH₂)₄&minus;CHO'
            : 'Cyclohexene + O₃ ➔ [Ozonide] ➔ (H₂O₂) ➔ HOOC-(CH₂)₄&minus;COOH'
        };
      case 'but1ene':
        return {
          reactants: 'But-1-ene (CH₃-CH₂-CH=CH₂)',
          products: workupType === 'reductive'
            ? 'Propanal (CH₃CH₂CHO) + Formaldehyde (HCHO)'
            : 'Propanoic acid (CH₃CH₂COOH) + Carbon dioxide (CO₂) + H₂O',
          mechanism: workupType === 'reductive'
            ? 'Terminal alkene yields propanal and formaldehdye under mild conditions.'
            : 'Terminal alkene yields propanoic acid. The formaldehyde fragment is oxidized all the way to formic acid (HCOOH) and then further to unstable carbonic acid, decomposing to CO₂ + H₂O.',
          equation: workupType === 'reductive'
            ? 'CH₃-CH₂-CH=CH₂ + O₃ ➔ [Ozonide] ➔ (Zn/H₂O) ➔ CH₃CH₂CHO + HCHO'
            : 'CH₃-CH₂-CH=CH₂ + O₃ ➔ [Ozonide] ➔ (H₂O₂) ➔ CH₃CH₂COOH + CO₂ + H₂O'
        };
    }
  };

  const ozonolysis = getOzonolysisResult();

  // --- Simulator 2: EAS Regiochemistry Predictor ---
  const [easSubstituent, setEasSubstituent] = useState<'OH' | 'NO2' | 'Cl' | 'CH3' | 'COOH'>('OH');

  const getEasResult = () => {
    switch (easSubstituent) {
      case 'OH':
        return {
          name: 'Phenol',
          class: 'Highly Activating',
          directing: 'Ortho / Para directing',
          reason: 'Strong positive resonance (+M) effect from oxygen lone pairs overrides its negative inductive (-I) effect. Increases electron density at ortho and para positions.',
          color: '#ef4444', // Red (Activating)
          electrophileLoc: 'Ortho (position 2/6) & Para (position 4) are highly reactive centers.'
        };
      case 'CH3':
        return {
          name: 'Toluene',
          class: 'Weakly Activating',
          directing: 'Ortho / Para directing',
          reason: 'Alkyl group donates electron density through hyperconjugation (3 alpha C-H bonds) and weak positive inductive (+I) effect.',
          color: '#f97316', // Orange
          electrophileLoc: 'Ortho & Para positions are activated, favoring o/p-substitution.'
        };
      case 'Cl':
        return {
          name: 'Chlorobenzene',
          class: 'Weakly Deactivating',
          directing: 'Ortho / Para directing (Halogen Exception)',
          reason: 'The strong negative inductive (-I) effect pulls electron density from the ring, overall deactivating it. However, lone-pair donation (+M) stabilizes the ortho/para transition states, directing incoming groups there.',
          color: '#fbbf24', // Amber
          electrophileLoc: 'Ortho/Para positions are directed, but reaction rates are slower than benzene.'
        };
      case 'NO2':
        return {
          name: 'Nitrobenzene',
          class: 'Strongly Deactivating',
          directing: 'Meta directing',
          reason: 'Powerful electron-withdrawing mesomeric (-M) and inductive (-I) effects. Positive charges are placed on ortho and para positions, leaving meta relatively richer in electron density.',
          color: '#3b82f6', // Blue (Deactivating)
          electrophileLoc: 'Meta (position 3/5) is directed. Highly deactivated ring; completely fails to undergo Friedel-Crafts reactions.'
        };
      case 'COOH':
        return {
          name: 'Benzoic Acid',
          class: 'Moderately Deactivating',
          directing: 'Meta directing',
          reason: 'Carbonyl group withdraws electron density from ortho and para positions via conjugation (-M) and induction (-I).',
          color: '#6366f1', // Violet
          electrophileLoc: 'Meta position is directed. Does not undergo Friedel-Crafts alkylation.'
        };
    }
  };

  const eas = getEasResult();

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white">
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0e1612] via-[#09120e] to-[#0e1612] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Chemistry</Tag>
            <Tag color="cyan">Unit 11</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="violet">Hydrocarbons</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Hydrocarbons: <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Aliphatic & Aromatic</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Master the structural trends, synthesis mechanisms, additions (rearrangements, ozonolysis, Baeyer\'s test), acidic terminal alkynes, aromaticity criteria, electrophilic aromatic substitution, cyclohexane conformation profiles, and PAH carcinogenicity.
          </p>
        </div>
      </div>

      {/* ── SECTION 1: CORE CONCEPT ────────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-emerald-400" />
            1. Core Concept & Structural Boundaries
          </h2>
          <SectionBanner label="Core Concept" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            {"Hydrocarbons are organic compounds composed exclusively of carbon and hydrogen atoms. They form the parent structures of all organic molecules. They are categorized based on their carbon-carbon bonding (saturated containing only single bonds vs. unsaturated containing double or triple bonds) and aromatic profiles."}
          </p>
        </div>
      </div>

      {/* ── SECTION 2: CLASSIFICATION ──────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            2. Classification Hierarchy
          </h2>
          <SectionBanner label="Classification" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Hydrocarbons are primarily classified based on their <strong>carbon-carbon bond saturation</strong> as the fundamental criterion, and secondary skeletal structure:
          </p>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2 text-xs">
            <span className="font-bold text-cyan-400 block uppercase tracking-wider">Primary Classification Criterion</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70">
              <div>
                <strong className="text-white">1. Saturated Hydrocarbons:</strong> Contain only carbon-carbon single (&sigma;) bonds with sp<sup>3</sup> hybridisation. They maximize the hydrogen-to-carbon ratio and undergo substitution reactions (e.g. Alkanes, Cycloalkanes).
              </div>
              <div>
                <strong className="text-white">2. Unsaturated Hydrocarbons:</strong> Contain at least one carbon-carbon double (&pi;) or triple bond (sp<sup>2</sup> or sp hybridisation). They have lower hydrogen-to-carbon ratios and readily undergo addition reactions (e.g. Alkenes, Alkynes).
              </div>
            </div>
          </div>

          <p>
            The classification hierarchy of structural skeletons:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">1. Aliphatic Hydrocarbons</span>
              <p className="text-xs text-white/55 leading-normal">
                Open-chain structures that may be saturated or unsaturated:
              </p>
              <div className="space-y-2 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white">Alkanes:</strong> Saturated, only C-C single bonds (C<sub>n</sub>H<sub>2n+2</sub>).
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white">Alkenes:</strong> Unsaturated, contain C=C double bonds (C<sub>n</sub>H<sub>2n</sub>).
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white">Alkynes:</strong> Unsaturated, contain C≡C triple bonds (C<sub>n</sub>H<sub>2n-2</sub>).
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">2. Alicyclic Hydrocarbons</span>
              <p className="text-xs text-white/55 leading-normal">
                Non-aromatic rings containing carbon atoms:
              </p>
              <div className="space-y-2 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-violet-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white">Cycloalkanes:</strong> Saturated carbon rings (e.g. Cyclohexane, Cyclobutane).
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-violet-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white">Cycloalkenes:</strong> Rings with at least one double bond (e.g. Cyclohexene).
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">3. Aromatic Hydrocarbons</span>
              <p className="text-xs text-white/55 leading-normal">
                Cyclic, planar, conjugated rings satisfying Huckel's rule:
              </p>
              <div className="space-y-2 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-rose-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white">Benzenoid:</strong> Contain benzene rings (Benzene, Toluene, Naphthalene).
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-rose-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white">Non-Benzenoid:</strong> Aromatic rings without benzene (e.g. Azulene, Tropylium cation).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: DEGREE OF UNSATURATION ──────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            3. Degree of Unsaturation / Double Bond Equivalent (DBE)
          </h2>
          <SectionBanner label="Formulas" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            The <strong>Double Bond Equivalent (DBE)</strong> determines the total number of rings and pi bonds present in a molecule. Use the formula:
          </p>

          <div className="my-1 text-center text-xs sm:text-sm text-cyan-300 font-semibold flex items-center justify-center gap-1.5">
            <span>DBE = C &minus;</span>
            <div className="flex flex-col items-center">
              <span className="px-1 border-b border-white/20 pb-0.5">H + X</span>
              <span className="px-1 pt-0.5">2</span>
            </div>
            <span>+</span>
            <div className="flex flex-col items-center">
              <span className="px-1 border-b border-white/20 pb-0.5">N</span>
              <span className="px-1 pt-0.5">2</span>
            </div>
            <span>+ 1</span>
          </div>

          <p className="text-white/70">
            Where C = Carbons, H = Hydrogens, X = Halogens (F, Cl, Br, I), and N = Nitrogens. Oxygen/Sulfur atoms do not affect the calculation.
          </p>

          <div className="p-3 bg-black/45 rounded-xl text-[13px] space-y-1 leading-normal text-white/70 font-mono">
            <div>{"• 1 DBE = 1 Ring OR 1 Pi Bond (Double bond)"}</div>
            <div>{"• 2 DBE = 2 Rings, 2 Double bonds, 1 Triple bond, or 1 Ring + 1 Double bond"}</div>
            <div>{"• 4 DBE = Highly indicative of a Benzene ring (1 Ring + 3 Double bonds)"}</div>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: ALKANES ─────────────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-violet-400" />
            4. Alkanes: Saturated Hydrocarbons & Preparations
          </h2>
          <SectionBanner label="Alkanes" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Alkanes contain only C-C and C-H single bonds with sp<sup>3</sup> hybridised carbons. They are synthesized via:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">1. Hydrogenation & Decarboxylation</span>
              <div className="space-y-3.5 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Catalytic Hydrogenation:</strong>
                    <span>Addition of H<sub>2</sub> to alkenes/alkynes in the presence of finely divided Ni, Pt, or Pd catalyst.</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Decarboxylation (Soda Lime):</strong>
                    <span>Heating sodium salts of carboxylic acids with soda lime (NaOH + CaO in 3:1 ratio) yields an alkane with <strong>one less carbon atom</strong> than the parent acid.</span>
                    <div className="mt-2.5 p-2 bg-black/35 rounded-lg font-mono text-[11px] text-cyan-300 text-center">
                      R-COONa + NaOH &rarr; <span className="text-[10px] text-white/40">(CaO, &Delta;)</span> &rarr; R-H + Na<sub>2</sub>CO<sub>3</sub>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">2. Wurtz Reaction & Kolbe Electrolysis</span>
              <div className="space-y-3.5 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-emerald-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Wurtz Reaction:</strong>
                    <span>Coupling of alkyl halides with sodium in dry ether:</span>
                    <div className="mt-2 p-2 bg-black/35 rounded-lg font-mono text-[11px] text-emerald-300 text-center">
                      2 R-X + 2 Na &rarr; <span className="text-[10px] text-white/40">(dry ether)</span> &rarr; R-R + 2 NaX
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-emerald-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Kolbe's Electrolytic Method:</strong>
                    <span>Electrolysis of an aqueous solution of sodium/potassium carboxylate yields symmetrical alkanes containing <strong>even numbers of carbon atoms</strong> at the anode:</span>
                    <div className="mt-2 p-2 bg-black/35 rounded-lg font-mono text-[11px] text-emerald-300 text-center">
                      2 RCOO<sup>&minus;</sup> + 2 H<sub>2</sub>O &rarr; <span className="text-[10px] text-white/40">(Electrolysis)</span> &rarr; R-R + 2 CO<sub>2</sub> + H<sub>2</sub> + 2 OH<sup>&minus;</sup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <WarningCard title="Wurtz Reaction Limitations">
            {"1. Methane (CH₄) cannot be prepared by Wurtz reaction since it requires at least two carbons."}
            <br />{"2. Mixing two different alkyl halides (e.g. CH₃Cl + C₂H₅Cl) yields a messy mixture of three different alkanes (Ethane, Propane, and Butane) which are difficult to separate due to close boiling points."}
            <br />{"3. The Wurtz reaction fails / gives poor yields with tertiary halides (which undergo elimination to form alkenes) and is not applicable to aryl/vinyl halides."}
          </WarningCard>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Other Key Alkane Reactions & Physical Properties</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
              <div className="space-y-2">
                <div>
                  <strong className="text-white block">Pyrolysis (Cracking):</strong>
                  {"Thermal decomposition of higher alkanes to a mixture of lower alkanes, alkenes, and hydrogen under high heat (500–800°C) or in the presence of alumina-silicate catalysts:"}
                  <div className="font-mono text-cyan-300 mt-1">C₁₀H₂₂ ➔ (Heat/Catalyst) ➔ C₈H₁₈ + C₂H₄ (Ethylene)</div>
                </div>
                <div>
                  <strong className="text-white block">Isomerisation:</strong>
                  {"Straight-chain alkanes heated with anhydrous AlCl₃ and HCl gas isomerise to branched alkanes (crucial for raising octane number of fuel):"}
                  <div className="font-mono text-cyan-300 mt-1">n-Butane ➔ (anh. AlCl₃ / HCl, Δ) ➔ Isobutane (2-methylpropane)</div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <strong className="text-white block">Combustion:</strong>
                  {"Complete oxidation with oxygen releasing highly exothermic energy (&Delta;H<sub>comb</sub>):"}
                  <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold flex flex-wrap items-center justify-center gap-1">
              <span>C<sub>n</sub>H<sub>2n+2</sub> +</span>
              <div className="flex flex-col items-center mx-1">
                <span className="px-1 border-b border-white/20 pb-0.5 text-[10px]">3n+1</span>
                <span className="px-1 pt-0.5 text-[10px]">2</span>
              </div>
              <span>O<sub>2</sub> &rarr; n CO<sub>2</sub> + (n+1) H<sub>2</sub>O + &Delta;H</span>
            </div>
                </div>
                <div>
                  <strong className="text-white block">Physical Properties Trends:</strong>
                  {"• Boiling Point: Increases with carbon number (due to larger Van der Waals surface area). For isomers, boiling point <strong>decreases with branching</strong> because branching makes the molecule spherical, reducing surface area (n-pentane > isopentane > neopentane)."}
                  <br />{"• Melting Point: Even-numbered carbons have significantly higher melting points than adjacent odd-numbered ones (alternation effect) because even carbons pack more symmetrically in the crystal lattice."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: FREE RADICAL HALOGENATION ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-rose-400" />
            5. Free Radical Halogenation Mechanism & Selectivity
          </h2>
          <SectionBanner label="Halogenation" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Halogenation of alkanes undergoes a photochemically or thermally initiated <strong>Free Radical Chain Mechanism</strong>:
          </p>

          <div className="p-4 rounded-xl bg-black/45 font-mono text-xs text-rose-400 space-y-1.5 border border-white/5 leading-relaxed">
            <div>{"1. Initiation (Endothermic): Homolytic cleavage of halogen molecules by UV light (hν):"}</div>
            <div className="pl-4">{"Cl₂ ➔ (hν) ➔ 2 Cl•"}</div>
            <div>{"2. Propagation (Exothermic): Radical abstracting hydrogen, then forming product:"}</div>
            <div className="pl-4">{"CH₄ + Cl• ➔ •CH₃ + HCl"}</div>
            <div className="pl-4">{"•CH₃ + Cl₂ ➔ CH₃Cl + Cl•"}</div>
            <div>{"3. Termination: Recombination of any two radicals:"}</div>
            <div className="pl-4">{"Cl• + Cl• ➔ Cl₂ | •CH₃ + Cl• ➔ CH₃Cl | •CH₃ + •CH₃ ➔ C₂H₆"}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Halogen Selectivity Trends</span>
              <div className="space-y-3 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Fluorination:</strong>
                    <span>Extremely rapid and explosive (requires dilution).</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Chlorination:</strong>
                    <span>Moderately selective, reacts with primary, secondary, and tertiary C-H bonds based on statistics and stability.</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Bromination:</strong>
                    <span>Highly selective. Rates follow the hydrogen stability order:</span>
                    <div className="mt-2 p-2 bg-black/35 rounded-lg font-mono text-[11px] text-cyan-300 text-center">
                      Tertiary (3&deg;) &gt; Secondary (2&deg;) &gt; Primary (1&deg;)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Chlorination Selectivity Calculations</span>
              <div className="space-y-3 text-[13px] text-white/70">
                <p>
                  At room temperature, the relative rates of abstraction of C-H bonds by chlorine radicals are:
                </p>
                <div className="p-2 bg-black/35 rounded-lg font-mono text-[11px] text-violet-300 text-center">
                  Tertiary (5.0) : Secondary (3.8) : Primary (1.0)
                </div>
                <p className="text-white/50 leading-relaxed">
                  Multiply the relative rate by the number of equivalent hydrogens of that type to estimate product yields.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: ALKENES ─────────────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            6. Alkenes: Unsaturated Hydrocarbons & Stability
          </h2>
          <SectionBanner label="Alkenes" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Alkenes contain C=C double bonds made of one strong σ-bond and one lateral π-bond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Alkene Stability Rules</span>
              <p className="text-[13px] text-white/70 leading-relaxed">
                Alkene stability increases with <strong>alkylation (substitution)</strong> of the C=C double bond due to hyperconjugation from alpha-hydrogens and inductive stabilization:
              </p>
              <div className="p-2 bg-black/35 rounded-xl text-center text-xs font-mono text-cyan-300">
                {"Tetra-substituted > Tri-substituted > Di-substituted > Mono-substituted > Ethene"}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Heat of Hydrogenation (HoH)</span>
              <p className="text-[13px] text-white/70 leading-relaxed">
                - Heat of Hydrogenation is the enthalpy released during addition of H<sub>2</sub> to an alkene.
                <br />- <strong>Key Rule:</strong> HoH is inversely proportional to alkene stability for isomers.
                <br /><span className="font-mono text-violet-300">{"More Stable Alkene ➔ Lower Heat of Hydrogenation (HoH)"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 7: PREPARATION & REGIOCHEMISTRY ────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            7. Alkene Synthesis: Saytzeff vs. Hofmann Elimination
          </h2>
          <SectionBanner label="Elimination" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-2 text-xs sm:text-sm text-white/80">
            <p>
              Alkenes are commonly prepared via <strong>&beta;-Elimination reactions</strong>:
            </p>
            <div className="space-y-2 text-[13px] text-white/70 pl-2">
              <div className="flex gap-2 items-start">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <div>
                  <strong className="text-white">Dehydrohalogenation:</strong> Alkyl halides heated with alcoholic KOH.
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <div>
                  <strong className="text-white">Dehydration of Alcohols:</strong> Alcohols treated with concentrated H<sub>2</sub>SO<sub>4</sub> or H<sub>3</sub>PO<sub>4</sub> at high temperatures.
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Saytzeff\'s (Zaitsev) Rule</span>
              <p className="text-[13px] text-white/70 leading-relaxed">
                In elimination reactions, the major product is the <strong>most highly substituted, most stable alkene</strong> (having the maximum number of alkyl groups attached to the double-bonded carbon atoms).
                <br />*Example:* Dehydrohalogenation of 2-bromobutane with alcoholic KOH yields <strong>But-2-ene</strong> (81%, major) and But-1-ene (19%, minor).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Hofmann Rule (Exceptions)</span>
              <p className="text-[13px] text-white/70 leading-relaxed">
                The <strong>least substituted alkene</strong> becomes the major product when:
                <br />1. A <strong>bulky, sterically hindered base</strong> is used (e.g. Potassium tert-butoxide, t-BuOK).
                <br />2. The leaving group is bulky / strongly charged (e.g. quaternary ammonium salts, fluoride).
                <br />*Reason:* Bulky bases abstract the more accessible, less sterically hindered primary hydrogen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 8: ELECTROPHILIC ADDITION & REARRANGEMENTS ──────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            8. Electrophilic Additions: Markovnikov vs. Anti-Markovnikov & Rearrangements
          </h2>
          <SectionBanner label="Additions" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Markovnikov's Rule</span>
              <div className="space-y-3 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Rule:</strong>
                    <span>The electrophile adds to the C=C carbon with more hydrogen atoms, placing the incoming nucleophile on the more substituted carbon.</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Mechanism-based reason:</strong>
                    <span>Addition proceeds via the <strong>most stable carbocation intermediate</strong> (3&deg; &gt; 2&deg; &gt; 1&deg;).</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">Anti-Markovnikov (Kharasch Effect)</span>
              <div className="space-y-3 text-[13px] text-white/70">
                <div className="flex gap-2 items-start">
                  <span className="text-rose-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Rule:</strong>
                    <span>Electrophilic addition of <strong>HBr ONLY</strong> in the presence of <strong>peroxides (R<sub>2</sub>O<sub>2</sub>)</strong> places bromine on the less substituted carbon.</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-rose-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Reason:</strong>
                    <span>Peroxides initiate a <strong>free radical mechanism</strong> where the Br&bull; radical adds first, yielding the most stable carbon radical.</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-rose-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Thermodynamic Limit:</strong>
                    <span>Does not occur for HCl or HI due to thermodynamic limitations.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Carbocation Rearrangements</span>
              <div className="space-y-3 text-[13px] text-white/70">
                <p>
                  Because Markovnikov additions involve carbocations, they can undergo <strong>hydride (H<sup>&minus;</sup>) shifts</strong> or <strong>methyl (CH<sub>3</sub><sup>&minus;</sup>) shifts</strong> to achieve a more stable carbocation (2&deg; &rarr; 3&deg;) before nucleophilic capture.
                </p>
                <div className="p-2 bg-black/35 rounded-lg font-mono text-[10px] text-white/50 text-center leading-normal">
                  <strong className="text-white block text-[11px] mb-0.5">Example:</strong>
                  3,3-Dimethylbut-1-ene + HCl yields 2-chloro-2,3-dimethylbutane via methyl shift.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Advanced Hydrations, Epoxidation & Polymerisation</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
              <div className="space-y-2">
                <div>
                  <strong className="text-white block">Oxymercuration-Demercuration (OMDM):</strong>
                  {"Reaction with Hg(OAc)₂ in H₂O, followed by NaBH₄ reduction. Yields <strong>Markovnikov</strong> alcohol <strong>without carbocation rearrangement</strong> (proceeds via a cyclic mercurinium ion intermediate):"}
                  <div className="font-mono text-cyan-300 mt-1">R-CH=CH₂ ➔ (1. Hg(OAc)₂/H₂O, 2. NaBH₄) ➔ R-CH(OH)-CH₃</div>
                </div>
                <div>
                  <strong className="text-white block">Hydroboration-Oxidation (HBO):</strong>
                  {"Reaction with BH₃·THF, followed by alkaline H₂O₂. Renders stereospecific <strong>syn-addition</strong> yielding <strong>Anti-Markovnikov</strong> alcohols <strong>without rearrangements</strong>:"}
                  <div className="font-mono text-cyan-300 mt-1">R-CH=CH₂ ➔ (1. BH₃·THF, 2. H₂O₂/OH⁻) ➔ R-CH₂-CH₂-OH</div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <strong className="text-white block">Epoxidation:</strong>
                  {"Reaction with peroxyacids (e.g., mCPBA) yields a 3-membered cyclic ether (epoxide) via a stereospecific <strong>syn-addition</strong> that preserves the alkene cis/trans geometry."}
                </div>
                <div>
                  <strong className="text-white block">Polymerisation:</strong>
                  {"• Free-radical addition polymerisation (high temp/pressure) converts ethene to low-density polyethylene."}
                  <br />{"• Coordination polymerisation using <strong>Ziegler-Natta catalysts</strong> (TiCl₄ + Al(C₂H₅)₃) produces highly crystalline, stereoregular polymers (e.g., isotactic polypropylene)."}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2 mt-2">
            <span className="text-xs font-bold text-white block uppercase tracking-wider">Unsaturation Tests & Physical Properties</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-black/45 rounded-xl space-y-1">
                <span className="text-xs font-bold text-rose-400 block uppercase">1. Bromine Test</span>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  {"Addition of orange-brown Bromine dissolved in CCl₄ to an alkene results in rapid decolorisation (forming colorless vicinal dibromides). Benzene does not react without a Lewis acid catalyst."}
                </p>
              </div>

              <div className="p-3 bg-black/45 rounded-xl space-y-1">
                <span className="text-xs font-bold text-emerald-400 block uppercase">2. Baeyer's Test</span>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  {"Reaction with cold, dilute, alkaline potassium permanganate (KMnO₄, Baeyer's reagent) results in the loss of its purple color and formation of a brown MnO₂ precipitate, yielding vicinal glycols."}
                </p>
              </div>

              <div className="p-3 bg-black/45 rounded-xl space-y-1">
                <span className="text-xs font-bold text-cyan-400 block uppercase">3. Alkene Physical Properties</span>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  {"• Boiling Point: Cis-alkenes have higher dipole moments, leading to stronger intermolecular forces and higher boiling points than trans-alkenes."}
                  <br />{"• Melting Point: Trans-alkenes pack more symmetrically in solid state, resulting in higher melting points than cis-alkenes."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 9: OZONOLYSIS SIMULATOR ─────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            9. Interactive Lab: Ozonolysis Product Predictor
          </h2>
          <SectionBanner label="Lab Simulator" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Predict the ozonolysis cleavage products of alkenes. Toggle between <strong>Reductive</strong> and <strong>Oxidative</strong> workup options.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/[0.01] border border-white/5 p-4.5 rounded-2xl">
            <div className="space-y-4 lg:col-span-1">
              <div className="space-y-2">
                <span className="text-xs font-bold text-white/50 block uppercase tracking-wider">1. Select Alkene</span>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setAlkeneTemplate('but2ene')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold uppercase transition ${alkeneTemplate === 'but2ene' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    But-2-ene
                  </button>
                  <button 
                    onClick={() => setAlkeneTemplate('methylbut2ene')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold uppercase transition ${alkeneTemplate === 'methylbut2ene' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    2-Methylbut-2-ene
                  </button>
                  <button 
                    onClick={() => setAlkeneTemplate('cyclohexene')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold uppercase transition ${alkeneTemplate === 'cyclohexene' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    Cyclohexene
                  </button>
                  <button 
                    onClick={() => setAlkeneTemplate('but1ene')}
                    className={`p-2.5 rounded-xl border text-[11px] font-bold uppercase transition ${alkeneTemplate === 'but1ene' ? 'bg-emerald-500/20 border-emerald-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    But-1-ene
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-white/50 block uppercase tracking-wider">2. Select Workup</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setWorkupType('reductive')}
                    className={`flex-1 p-2.5 rounded-xl border text-[11px] font-bold uppercase transition ${workupType === 'reductive' ? 'bg-cyan-500/20 border-cyan-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    Reductive (Zn / H₂O)
                  </button>
                  <button 
                    onClick={() => setWorkupType('oxidative')}
                    className={`flex-1 p-2.5 rounded-xl border text-[11px] font-bold uppercase transition ${workupType === 'oxidative' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    Oxidative (H₂O₂)
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-4 rounded-xl bg-black/45 border border-white/5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">Ozonolysis Outcome</span>
                <h3 className="text-base font-black text-white font-mono">{ozonolysis.reactants}</h3>
                <div className="text-[13px] text-white/70 mt-2 font-mono space-y-1">
                  <div><strong className="text-emerald-400">Products:</strong> {ozonolysis.products}</div>
                  <div><strong className="text-emerald-400">Equation:</strong> {ozonolysis.equation}</div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[13px] text-white/60 font-mono leading-relaxed">
                <span className="text-white font-bold block mb-0.5">Reaction Notes:</span>
                {ozonolysis.mechanism}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 10: ALKYNES ────────────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-violet-400" />
            10. Alkynes: Synthesis, Acidity, Additions & Selective Reductions
          </h2>
          <SectionBanner label="Alkynes" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Acidity of Terminal Alkynes</span>
              <div className="space-y-3 text-[13px] text-white/70 leading-relaxed">
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">sp Carbon Hybridization:</strong>
                    <span>Contains <strong>50% s-character</strong>, holding the C-H &sigma;-bond electrons very close to the nucleus.</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Acetylide Ion Stability:</strong>
                    <span>Stabilizes the conjugate base (R-C&equiv;C<sup>&minus;</sup>) upon deprotonation by strong bases like sodamide (NaNH<sub>2</sub>) or liquid NH<sub>3</sub>.</span>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-cyan-400 mt-1 font-bold">&bull;</span>
                  <div>
                    <strong className="text-white block mb-0.5">Order of Acidity:</strong>
                    <div className="mt-1 p-2 bg-black/35 rounded-lg font-mono text-xs text-cyan-300 text-center">
                      Alkynes &gt; Alkenes &gt; Alkanes
                      <br />(HC&equiv;CH &gt; H<sub>2</sub>C=CH<sub>2</sub> &gt; H<sub>3</sub>C-CH<sub>3</sub>)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Terminal Alkyne Qualitative Tests</span>
              <div className="space-y-3 text-[13px] text-white/70 leading-relaxed">
                <p>
                  Terminal alkynes react with ammoniacal metal salts to form distinct insoluble precipitates:
                </p>
                <div className="flex gap-2 items-start">
                  <span className="text-emerald-400 mt-1 font-bold">&bull;</span>
                  <div className="w-full">
                    <strong className="text-white block mb-0.5">Ammoniacal Silver Nitrate (Tollens):</strong>
                    <span>Forms a <strong>white precipitate</strong> of silver acetylide:</span>
                    <div className="mt-1 p-2 bg-black/35 rounded-lg font-mono text-xs text-emerald-300 text-center">
                      R-C&equiv;C-H + Ag<sup>+</sup> &rarr; R-C&equiv;C-Ag&darr; (White) + H<sup>+</sup>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-emerald-400 mt-1 font-bold">&bull;</span>
                  <div className="w-full">
                    <strong className="text-white block mb-0.5">Ammoniacal Cuprous Chloride:</strong>
                    <span>Forms a <strong>red precipitate</strong> of copper acetylide:</span>
                    <div className="mt-1 p-2 bg-black/35 rounded-lg font-mono text-xs text-emerald-300 text-center">
                      R-C&equiv;C-H + Cu<sup>+</sup> &rarr; R-C&equiv;C-Cu&darr; (Red) + H<sup>+</sup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-yellow-400 block uppercase tracking-wider">1. Synthesis of Alkynes</span>
              <ul className="list-disc pl-4 space-y-2 text-[13px] text-white/70 leading-relaxed">
                <li>
                  <strong>From Calcium Carbide (Industrial):</strong> Calcium oxide heated with coke yields calcium carbide, which reacts with water to release ethyne:
                  <div className="font-mono text-yellow-300 text-xs mt-0.5">CaC₂ + 2 H₂O ➔ HC≡CH + Ca(OH)₂</div>
                </li>
                <li>
                  <strong>Double Dehydrohalogenation:</strong> Vicinal or geminal dihalides undergo sequential eliminations with alcoholic KOH, then sodamide (NaNH<sub>2</sub>), a stronger base required for vinyl halides):
                  <div className="font-mono text-yellow-300 text-xs mt-0.5">R-CHX-CH₂X + 2 KOH(alc) / NaNH₂ ➔ R-C≡CH + 2 KX + 2 H₂O</div>
                </li>
                <li>
                  <strong>Dehalogenation of Tetrahalides:</strong> Heating tetrahaloalkanes with zinc dust:
                  <div className="font-mono text-yellow-300 text-xs mt-0.5">R-CX₂-CHX₂ + 2 Zn ➔ (Δ) ➔ R-C≡CH + 2 ZnX₂</div>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
              <span className="text-xs font-bold text-pink-400 block uppercase tracking-wider">2. Selective Alkyne Reductions (High-Yield IAT)</span>
              <div className="space-y-3 text-[13px] text-white/70 leading-relaxed">
                <p>
                  Alkynes can be selectively reduced to either cis or trans alkenes depending on the reagent:
                </p>
                <div className="flex gap-2 items-start">
                  <span className="text-pink-400 font-bold">&bull;</span>
                  <div className="w-full">
                    <strong className="text-white block mb-0.5">Cis-Alkenes (Syn-Addition):</strong>
                    <span>Hydrogenation with <strong>Lindlar's Catalyst</strong> (Pd/CaCO<sub>3</sub> partially deactivated / poisoned with lead acetate/quinoline) or Pd/BaSO<sub>4</sub>:</span>
                    <div className="mt-1 p-2 bg-black/35 rounded-lg font-mono text-xs text-pink-300 text-center">
                      R-C&equiv;C-R + H<sub>2</sub> &rarr; <span className="text-[10px] text-white/40">(Pd/CaCO₃, quinoline)</span> &rarr; Cis-Alkene
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-pink-400 font-bold">&bull;</span>
                  <div className="w-full">
                    <strong className="text-white block mb-0.5">Trans-Alkenes (Anti-Addition):</strong>
                    <span>Dissolving metal reduction using <strong>Sodium in liquid Ammonia</strong> (Na / liquid NH<sub>3</sub>):</span>
                    <div className="mt-1 p-2 bg-black/35 rounded-lg font-mono text-xs text-pink-300 text-center">
                      R-C&equiv;C-R &rarr; <span className="text-[10px] text-white/40">(Na / liq. NH₃)</span> &rarr; Trans-Alkene
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">3. Alkyne Additions & Ozonolysis</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70">
              <div className="space-y-2">
                <div>
                  <strong className="text-white block">Acid-Catalyzed Hydration (Kucherov\'s Reaction):</strong>
                  {"Addition of water in the presence of HgSO₄ and dilute H₂SO₄. Electrophilic addition follows Markovnikov\'s rule to form an unstable enol intermediate, which immediately tautomerises to form ketones (except ethyne, which forms acetaldehyde):"}
                  <div className="font-mono text-cyan-300 mt-1">R-C≡CH + H₂O ➔ (Hg²⁺ / H⁺) ➔ [R-C(OH)=CH₂] ➔ R-CO-CH₃ (Methyl Ketone)</div>
                </div>
                <div>
                  <strong className="text-white block">Hydroboration-Oxidation of Alkynes:</strong>
                  {"Reaction with a sterically hindered borane (e.g. disiamylborane, Sia₂BH) followed by H₂O₂/OH⁻ yields anti-Markovnikov hydration. For terminal alkynes, this gives aldehydes:"}
                  <div className="font-mono text-cyan-300 mt-1">R-C≡CH ➔ (1. Sia₂BH, 2. H₂O₂/OH⁻) ➔ [R-CH=CH-OH] ➔ R-CH₂&minus;CHO</div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <strong className="text-white block">Addition of X₂ and HX:</strong>
                  {"Alkynes react with chlorine or bromine in CCl₄ to yield tetrahalides. Addition of hydrogen halides (HX) follows Markovnikov\'s rule sequentially to yield geminal dihalides (halogens on the same carbon atom):"}
                  <div className="font-mono text-cyan-300 mt-1">R-C≡CH + 2 HX ➔ R-CX₂-CH₃</div>
                </div>
                <div>
                  <strong className="text-white block">Oxidative Ozonolysis:</strong>
                  {"Alkynes react with ozone followed by water cleavage to yield carboxylic acids by splitting the triple bond entirely. (Unlike alkenes, no reductive zinc workup is needed to prevent carboxylic acid formation, as the triple bond naturally oxidizes to carboxyl groups):"}
                  <div className="font-mono text-cyan-300 mt-1">R-C≡C-R\' ➔ (1. O₃, 2. H₂O) ➔ R&minus;COOH + R\'&minus;COOH</div>
                  <span className="text-[10px] text-white/50">*Note:* Terminal alkynes yield R&minus;COOH + CO<sub>2</sub>.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 11: AROMATIC HYDROCARBONS & AROMATICITY ─────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-rose-400" />
            11. Aromaticity & Huckel\'s Criteria
          </h2>
          <SectionBanner label="Aromaticity" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Aromatic hydrocarbons (arenes) are highly stabilized cyclic structures. To be aromatic, a compound must satisfy:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
              <span className="text-xs font-bold text-cyan-400 block uppercase">1. Cyclic</span>
              <span className="text-[13px] text-white/70">Ring architecture</span>
            </div>
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
              <span className="text-xs font-bold text-emerald-400 block uppercase">2. Planar</span>
              <span className="text-[13px] text-white/70">sp² or sp ring atoms</span>
            </div>
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
              <span className="text-xs font-bold text-violet-400 block uppercase">3. Conjugated</span>
              <span className="text-[13px] text-white/70">Continuous p-orbitals</span>
            </div>
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl">
              <span className="text-xs font-bold text-rose-400 block uppercase">4. (4n + 2) π</span>
              <span className="text-[13px] text-white/70">Huckel electron count</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2 mt-2">
            <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Antiaromaticity vs. Non-Aromaticity (Key GOC distinction)</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] text-white/70 leading-relaxed">
              <div className="p-3 bg-black/45 rounded-xl space-y-1">
                <span className="font-bold text-emerald-400 block uppercase text-xs">Aromatic Compounds</span>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Must be cyclic, planar, fully conjugated, with <strong>(4n+2)&pi;</strong> electrons. They display extra thermodynamic stability, ring currents, and undergo EAS (e.g., Benzene, Naphthalene, Pyrrole).
                </p>
              </div>
              <div className="p-3 bg-black/45 rounded-xl space-y-1">
                <span className="font-bold text-rose-400 block uppercase text-xs">Antiaromatic Compounds</span>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Must be cyclic, planar, and fully conjugated, but contain <strong>4n&pi;</strong> electrons (e.g., Cyclobutadiene, Cyclooctatetraene dication). They are highly destabilized and extremely reactive.
                </p>
              </div>
              <div className="p-3 bg-black/45 rounded-xl space-y-1">
                <span className="font-bold text-amber-400 block uppercase text-xs">Non-Aromatic Compounds</span>
                <p className="text-[13px] text-white/70 leading-relaxed">
                  Fail to meet at least one of the conditions (cyclic, planar, or conjugated). E.g. Cyclooctatetraene (assumes a tub conformation to avoid antiaromaticity), cyclopentadiene (contains sp<sup>3</sup> carbon).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 12: EAS MECHANISM ──────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-cyan-400" />
            12. Electrophilic Aromatic Substitution (EAS) Mechanism
          </h2>
          <SectionBanner label="EAS" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Unlike alkenes, benzene undergoes <strong>substitution</strong> rather than addition because substitution preserves the highly stable aromatic ring. The EAS mechanism follows three steps:
          </p>

          <div className="p-4 bg-black/45 font-mono text-xs text-cyan-300 border border-white/5 rounded-2xl space-y-2 leading-relaxed">
            <div>
              <strong className="text-white block">Step 1: Generation of the Electrophile (E⁺)</strong>
              {"A Lewis acid catalyst abstracts a leaving group to generate a strong electrophile (e.g. Cl₂ + AlCl₃ ➔ Cl⁺ + AlCl₄⁻)."}
            </div>
            <div>
              <strong className="text-white block">Step 2: Attack of Electrophile on Ring (Rate Determining Step - RDS)</strong>
              {"Benzene pi electrons attack the electrophile, forming a non-aromatic carbocation intermediate stabilized by resonance: the <strong>σ-complex (Arenium ion)</strong>."}
            </div>
            <div>
              <strong className="text-white block">Step 3: Deprotonation to Restore Aromaticity (Fast Step)</strong>
              {"A weak base abstracts the proton from the sp<sup>3</sup> hybridised ring carbon, restoring the aromatic conjugation."}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2 mt-2">
            <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Specific EAS Reactions Reagents Summary</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-[10px] uppercase font-mono">
                    <th className="py-2 pr-4 font-normal">Reaction</th>
                    <th className="py-2 pr-4 font-normal">Reagents / Catalyst</th>
                    <th className="py-2 pr-4 font-normal">Electrophile (E<sup>+</sup>)</th>
                    <th className="py-2 font-normal">Product</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  <tr>
                    <td className="py-2 pr-4 font-semibold text-white">Nitration</td>
                    <td className="py-2 pr-4">Conc. HNO<sub>3</sub> + Conc. H<sub>2</sub>SO<sub>4</sub></td>
                    <td className="py-2 pr-4 font-mono text-cyan-300">NO<sub>2</sub><sup>+</sup> (Nitronium ion)</td>
                    <td className="py-2">Nitrobenzene</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold text-white">Sulfonation</td>
                    <td className="py-2 pr-4">Conc. H<sub>2</sub>SO<sub>4</sub> (Fuming, contains SO<sub>3</sub>)</td>
                    <td className="py-2 pr-4 font-mono text-cyan-300">SO<sub>3</sub> (Neutral electrophile)</td>
                    <td className="py-2">Benzenesulfonic acid</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold text-white">Halogenation</td>
                    <td className="py-2 pr-4">Cl<sub>2</sub> or Br<sub>2</sub> + anh. FeCl<sub>3</sub> / FeBr<sub>3</sub></td>
                    <td className="py-2 pr-4 font-mono text-cyan-300">Cl<sup>+</sup> or Br<sup>+</sup> (Halonium ion)</td>
                    <td className="py-2">Chlorobenzene or Bromobenzene</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold text-white">FC Alkylation</td>
                    <td className="py-2 pr-4">Alkyl Halide (R-X) + anh. AlCl<sub>3</sub></td>
                    <td className="py-2 pr-4 font-mono text-cyan-300">R<sup>+</sup> (Carbocation)</td>
                    <td className="py-2">Alkylbenzene (rearrangements can occur)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold text-white">FC Acylation</td>
                    <td className="py-2 pr-4">Acyl Halide (R-COCl) + anh. AlCl<sub>3</sub></td>
                    <td className="py-2 pr-4 font-mono text-cyan-300">R-C&equiv;O<sup>+</sup> (Acylium ion)</td>
                    <td className="py-2">Acylbenzene (no rearrangements)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-white/50 pt-2 border-t border-white/5 leading-normal">
              <strong>Reversibility of Sulfonation:</strong> Unlike nitration or halogenation, sulfonation is highly <strong>reversible</strong>. Heating benzenesulfonic acid with superheated steam (dilute acid, high temperature) decomposes it back to Benzene. This reaction is utilized in synthesis as a <strong>protecting / blocking group</strong> for the ortho/para positions:
              <br />
              <span className="font-mono text-amber-400 block mt-1">C₆H₅SO₃H + H₂O (Steam, H⁺) ➔ C₆H₆ + H₂SO₄</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 13: REGIOCHEMISTRY SIMULATOR ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            13. Interactive Lab: EAS Regiochemistry & Ring Activation
          </h2>
          <SectionBanner label="Lab Simulator" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Choose a substituent group attached to the benzene ring. Observe its activation strength and directing effect for incoming electrophilic attack.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white/[0.01] border border-white/5 p-4.5 rounded-2xl">
            <div className="space-y-4 lg:col-span-1">
              <div className="space-y-2">
                <span className="text-xs font-bold text-white/50 block uppercase tracking-wider">Select Ring Substituent</span>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setEasSubstituent('OH')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold uppercase transition flex justify-between items-center ${easSubstituent === 'OH' ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    <span>-OH (Phenol)</span>
                    <span className="text-[10px] text-rose-400 font-normal">Activating</span>
                  </button>
                  <button 
                    onClick={() => setEasSubstituent('CH3')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold uppercase transition flex justify-between items-center ${easSubstituent === 'CH3' ? 'bg-amber-500/20 border-amber-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    <span>-CH₃ (Toluene)</span>
                    <span className="text-[10px] text-amber-400 font-normal">Activating</span>
                  </button>
                  <button 
                    onClick={() => setEasSubstituent('Cl')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold uppercase transition flex justify-between items-center ${easSubstituent === 'Cl' ? 'bg-yellow-500/20 border-yellow-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    <span>-Cl (Chlorobenzene)</span>
                    <span className="text-[10px] text-yellow-400 font-normal">Deactivating</span>
                  </button>
                  <button 
                    onClick={() => setEasSubstituent('NO2')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold uppercase transition flex justify-between items-center ${easSubstituent === 'NO2' ? 'bg-blue-500/20 border-blue-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    <span>-NO₂ (Nitrobenzene)</span>
                    <span className="text-[10px] text-blue-400 font-normal">Deactivating</span>
                  </button>
                  <button 
                    onClick={() => setEasSubstituent('COOH')}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold uppercase transition flex justify-between items-center ${easSubstituent === 'COOH' ? 'bg-violet-500/20 border-violet-500 text-white' : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/10'}`}
                  >
                    <span>&minus;COOH (Benzoic Acid)</span>
                    <span className="text-[10px] text-violet-400 font-normal">Deactivating</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Visual SVG Output */}
            <div className="lg:col-span-2 p-4 rounded-xl bg-black/45 border border-white/5 flex flex-col justify-between space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative shrink-0">
                  {/* Benzene Ring Drawing */}
                  <svg className="w-36 h-36" viewBox="0 0 100 100">
                    {/* Ring lines */}
                    <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="white" strokeWidth="2.5" fill="none" />
                    {/* Inner Pi Circle or Double Bonds */}
                    <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1.5" strokeDasharray="4" fill="none" />
                    {/* Substituent attachment */}
                    <line x1="50" y1="15" x2="50" y2="2" stroke="white" strokeWidth="2.5" />
                    <text x="50" y="-1" fill={eas.color} fontSize="9" fontWeight="black" textAnchor="middle">{`-${easSubstituent}`}</text>
                    {/* Position Labels */}
                    <text x="85" y="32" fill={eas.directing.includes('Ortho') ? '#34d399' : 'white'} fontSize="6" fontWeight="bold">o (C2)</text>
                    <text x="85" y="68" fill={eas.directing.includes('Meta') ? '#34d399' : 'white'} fontSize="6" fontWeight="bold">m (C3)</text>
                    <text x="50" y="93" fill={eas.directing.includes('Ortho') ? '#34d399' : 'white'} fontSize="6" fontWeight="bold">p (C4)</text>
                  </svg>
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Ring Properties</span>
                  <h3 className="text-base font-black text-white">{eas.name}</h3>
                  <div className="text-[13px] space-y-1 font-mono text-white/70 leading-relaxed">
                    <div><strong className="text-emerald-400">Class:</strong> {eas.class}</div>
                    <div><strong className="text-emerald-400">Directing:</strong> {eas.directing}</div>
                    <div><strong className="text-emerald-400">Incoming attack:</strong> {eas.electrophileLoc}</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[13px] text-white/60 font-mono leading-relaxed">
                <span className="text-white font-bold block mb-0.5">Physical Justification:</span>
                {eas.reason}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 14: FRIEDEL-CRAFTS LIMITATIONS & REACTIONS ──────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-violet-400" />
            14. Friedel-Crafts Alkylation/Acylation & Aromatic Side-Chains
          </h2>
          <SectionBanner label="Reactions" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            The two categories of Friedel-Crafts electrophilic substitutions are:
            <br />- <strong>Alkylation:</strong> Benzene + R-Cl in the presence of anhydrous AlCl<sub>3</sub> yields alkylbenzenes.
            <br />- <strong>Acylation:</strong> Benzene + R-CO-Cl in the presence of anhydrous AlCl<sub>3</sub> yields acylbenzenes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block uppercase tracking-wider">Friedel-Crafts Limitations</span>
              <ul className="list-disc pl-4 space-y-1.5 text-[13px] text-white/70">
                <li><strong>Deactivated Rings Fail:</strong> Rings containing strongly deactivating groups (e.g. &minus;NO<sub>2</sub>, &minus;COOH, &minus;CHO, &minus;SO<sub>3</sub>H) fail to react.</li>
                <li><strong>Aniline Fails:</strong> Aniline (aminobenzene) does not undergo Friedel-Crafts reactions because the nitrogen lone pair reacts with the Lewis acid catalyst (AlCl<sub>3</sub>) to form a deactivating salt complex.</li>
                <li><strong>Polyalkylation:</strong> Alkylation activates the ring, making the product react faster than the starting material. Acylation avoids this because the product ketone is deactivating.</li>
                <li><strong>Carbocation Rearrangements:</strong> Alkylation can undergo rearrangements (e.g. 1-chloropropane gives isopropylbenzene). Acylation avoids rearrangements because the acylium ion is resonance-stabilized.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider">Side-Chain Aromatic Transformations</span>
              <p className="text-[13px] text-white/70 leading-relaxed">
                - <strong>Side-Chain Oxidation:</strong> Alkylbenzenes heated with alkaline KMnO<sub>4</sub> are oxidized all the way to <strong>Benzoic acid</strong>, regardless of the alkyl chain length, provided the benzylic carbon has <strong>at least one benzylic hydrogen</strong>.
                <br /><span className="font-mono text-emerald-300">Toluene + KMnO₄ ➔ (Δ) ➔ Benzoic Acid</span>
                <br /><span className="font-mono text-rose-400 text-[10px]">*Note:* t-butylbenzene fails to undergo oxidation because it lacks a benzylic hydrogen.</span>
                <br />- <strong>Benzylic Bromination:</strong> Reaction with N-Bromosuccinimide (NBS) or Br<sub>2</sub> / h&nu; yields substitution at the <strong>benzylic position</strong>, not addition or ring substitution.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
            <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Gattermann-Koch Formylation & Aryl Halide Coupling Reactions</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/70 text-left">
              <div className="space-y-1.5">
                <strong className="text-white block">Gattermann-Koch Formylation:</strong>
                {"Reaction of Benzene with Carbon Monoxide (CO) and Hydrogen Chloride (HCl) gas in the presence of anhydrous AlCl₃ and CuCl catalyst to directly yield Benzaldehyde:"}
                <div className="font-mono text-violet-300 mt-1 text-[11px]">C₆H₆ + CO + HCl ➔ (anh. AlCl₃ / CuCl) ➔ C₆H₅CHO + HCl</div>
              </div>
              <div className="space-y-1.5">
                <strong className="text-white block">Aryl Halide Couplings (Fittig & Wurtz-Fittig):</strong>
                <strong>&bull; Fittig Reaction:</strong> Coupling of two aryl halides with sodium in dry ether to yield biphenyl (diaryl) compounds:
                <div className="font-mono text-violet-300 mt-0.5 text-[11px]">2 C₆H₅-X + 2 Na ➔ (dry ether) ➔ C₆H₅-C₆H₅ + 2 NaX</div>
                <strong>&bull; Wurtz-Fittig Reaction:</strong> Coupling of an aryl halide and an alkyl halide with sodium in dry ether to yield alkylbenzenes:
                <div className="font-mono text-violet-300 mt-0.5 text-[11px]">C₆H₅-X + R-X + 2 Na ➔ (dry ether) ➔ C₆H₅-R + 2 NaX</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 15: CYCLOHEXANE CONFORMATIONS ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-400" />
            15. Cyclohexane Conformational Analysis
          </h2>
          <SectionBanner label="Conformations" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Cyclohexane is strain-free due to non-planar puckering. It exists in several interconvertible conformers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-emerald-400 block uppercase">1. Chair Conformation</span>
              <p className="text-white/70">
                Most stable conformer. Staggered C-H bonds minimize torsional strain, and bond angles are 110.9° (minimizing angle strain).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-amber-400 block uppercase">2. Twist Boat Conformation</span>
              <p className="text-white/70">
                A local minimum on the energy path. Partially relieves eclipsing interactions of the boat conformer.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-xs font-bold text-rose-400 block uppercase">3. Boat Conformation</span>
              <p className="text-white/70">
                High-energy conformer. Destabilized by eclipsing strain (adjacent C-H bonds) and steric repulsion between "flagpole" hydrogens.
              </p>
            </div>
          </div>

          <div className="p-3 bg-black/35 rounded-xl text-center text-xs font-mono text-cyan-300">
            {"Stability Order: Chair > Twist Boat > Boat > Half Chair"}
          </div>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 text-xs">
            <span className="font-bold text-white uppercase block tracking-wider">Axial vs. Equatorial Substituents</span>
            <div className="space-y-2.5 text-white/70 pl-1">
              <div className="flex gap-2 items-start">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <div>
                  <strong className="text-white">Axial Bonds:</strong> 6 bonds pointing vertically up or down.
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <div>
                  <strong className="text-white">Equatorial Bonds:</strong> 6 bonds pointing outwards along the ring equator.
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-cyan-400 font-bold">&bull;</span>
                <div>
                  <strong className="text-white">Conformational Stability:</strong> Large substituents (like methyl or t-butyl) are much more stable in the <strong>equatorial position</strong> to avoid steric crowding (<strong>1,3-diaxial interactions</strong>).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 16: CARCINOGENICITY ────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            16. Carcinogenicity & Toxicity of Polynuclear Aromatic Hydrocarbons (PAHs)
          </h2>
          <SectionBanner label="Toxicity" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            **Polynuclear Aromatic Hydrocarbons (PAHs)** consist of multiple fused benzene rings. They represent a major environmental hazard:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-[13px] text-white/70 text-left">
            <li><strong>Formation:</strong> Produced by the incomplete combustion of organic matter (tobacco, coal tar, petroleum exhaust, charbroiled meats).</li>
            <li><strong>Mechanism:</strong> PAHs are metabolically activated in the human liver into highly reactive epoxide intermediates, which bind directly to DNA, causing mutations that trigger cancer.</li>
            <li><strong>Examples:</strong> 1,2-Benzanthracene, 3-Methylcholanthrene, 1,2-Benzpyrene.</li>
            <li><strong>Benzene Toxicity:</strong> Benzene is highly toxic and exposure causes bone marrow suppression, leading to aplastic anemia and leukemia. In laboratory procedures, <strong>Toluene</strong> is widely used as a safer substitute because the methyl group is easily metabolized in the body to form benzoic acid (which is excreted safely), unlike benzene.</li>
          </ul>
        </div>
      </div>

      {/* ── SECTION 17: SOLVED PROBLEMS ────────────────────────────────────── */}
      <Collapsible title="17 · Solved Problems (14 IAT-Level Questions)" icon={<BookOpen className="w-4 h-4" />} accent="emerald" defaultOpen={true}>
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Mixing Alkyl Halides in Wurtz reaction</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"What products are formed when a mixture of methyl bromide and ethyl bromide is reacted with sodium metal in dry ether?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Three radical couplings can occur simultaneously:"}</div>
              <div>{"- Methyl radical + Methyl radical ➔ Ethane (CH₃-CH₃)"}</div>
              <div>{"- Methyl radical + Ethyl radical ➔ Propane (CH₃-CH₂-CH₃)"}</div>
              <div>{"- Ethyl radical + Ethyl radical ➔ Butane (CH₃-CH₂-CH₂-CH₃)"}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Ethane, Propane, and Butane</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Ozonolysis Product Identification</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An alkene on reductive ozonolysis yields two moles of formaldehyde and one mole of glyoxal (CHO&minus;CHO). Identify the structure of the alkene."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Reconstruct the alkene by aligning carbonyl carbons: H₂C=O + O=CH-CH=O + O=CH₂."}</div>
              <div>{"2. Remove oxygen atoms and join with double bonds: H₂C=CH-CH=CH₂."}</div>
              <div>{"3. The alkene is Buta-1,3-diene."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Buta-1,3-diene (H₂C=CH-CH=CH₂)</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Carbocation Rearrangement in Addition</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Predict the major product when 3-methylbut-1-ene is reacted with HBr."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. H⁺ adds to C1 to form the secondary carbocation at C2: (CH₃)₂CH-C⁺H-CH₃ (secondary)."}</div>
              <div>{"2. A hydride shift (1,2-hydride shift) occurs from C3 to C2 to generate the highly stable tertiary carbocation: (CH₃)₂C⁺-CH₂-CH₃ (tertiary)."}</div>
              <div>{"3. Br⁻ attacks this tertiary carbocation to form 2-bromo-2-methylbutane."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: 2-Bromo-2-methylbutane</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Decarboxylation Yields</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Which sodium salt of a carboxylic acid is required to prepare propane via soda-lime decarboxylation?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Decarboxylation yields an alkane with one less carbon than the parent carboxylate salt."}</div>
              <div>{"2. Propane has 3 carbon atoms. Therefore, the starting carboxylate salt must have 3 + 1 = 4 carbon atoms."}</div>
              <div>{"3. The reactant is sodium butanoate (CH₃CH₂CH₂COONa)."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Sodium butanoate</span>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: Friedel-Crafts Reaction Feasibility</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why does nitrobenzene not undergo Friedel-Crafts alkylation when treated with CH₃Cl and AlCl₃?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. The nitro group (-NO₂) is a strongly deactivating substituent by mesomeric (-M) and inductive (-I) withdraw rules."}</div>
              <div>{"2. It pulls electron density away from the ring, making the benzene ring too poor in electron density to attack electrophiles."}</div>
              <div>{"3. Therefore, Friedel-Crafts reactions do not occur on strongly deactivated rings."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Nitrobenzene ring is too deactivated due to strong -M and -I effects of the nitro group</span>
            </div>
          </div>

          {/* Problem 6 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 6: Heat of Hydrogenation comparison</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Arrange trans-but-2-ene, cis-but-2-ene, and but-1-ene in increasing order of their heat of hydrogenation."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Stability order: trans-but-2-ene (most stable due to trans methyls) > cis-but-2-ene > but-1-ene (least stable monosubstituted alkene)."}</div>
              <div>{"2. Heat of hydrogenation is inversely proportional to alkene stability."}</div>
              <div>{"3. Thus, trans-but-2-ene has the lowest heat of hydrogenation, and but-1-ene has the highest."}</div>
              <span className="text-emerald-400 font-bold block mt-1">{"Answer: trans-but-2-ene < cis-but-2-ene < but-1-ene"}</span>
            </div>
          </div>

          {/* Problem 7 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 7: Aromaticity evaluation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Identify whether Cyclooctatetraene is aromatic, antiaromatic, or non-aromatic, and justify."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Cyclooctatetraene has 8 pi electrons (4n system with n=2)."}</div>
              <div>{"2. If it were planar, it would be antiaromatic and highly unstable."}</div>
              <div>{"3. To avoid antiaromatic destabilization, it adopts a non-planar, tub-like conformation."}</div>
              <div>{"4. Lacking planarity, it is classified as non-aromatic."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Non-aromatic due to its non-planar tub-like conformation</span>
            </div>
          </div>

          {/* Problem 8 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 8: Toluene Oxidation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"What product is formed when toluene is treated with alkaline KMnO₄ followed by acid workup? What happens with t-butylbenzene?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Toluene has 3 benzylic hydrogens. Under hot alkaline KMnO₄, the methyl group is completely oxidized to form benzoic acid."}</div>
              <div>{"2. t-Butylbenzene lacks any benzylic hydrogens on its quaternary carbon. Hence, it remains unreactive to side-chain oxidation."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Toluene yields benzoic acid; t-butylbenzene is unreactive</span>
            </div>
          </div>

          {/* Problem 9 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 9: Hofmann elimination product prediction</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Predict the major product when 2-fluorobutane is treated with sodium ethoxide."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Fluoride is a poor, highly electronegative leaving group."}</div>
              <div>{"2. In dehydrofluorinations, the transition state has high carbanionic character."}</div>
              <div>{"3. Primary carbanions are more stable than secondary carbanions. Therefore, elimination favors abstraction of the less substituted beta-proton, yielding the Hofmann product."}</div>
              <div>{"4. The major product is But-1-ene."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: But-1-ene (Hofmann product)</span>
            </div>
          </div>

          {/* Problem 10 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 10: Alkynes qualitative test differentiation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"How can you distinguish chemically between But-1-yne and But-2-yne?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. But-1-yne is a terminal alkyne (CH₃-CH₂-C≡C-H) with an acidic hydrogen."}</div>
              <div>{"2. But-2-yne is an internal alkyne (CH₃-C≡C-CH₃) without terminal hydrogens."}</div>
              <div>{"3. Adding ammoniacal silver nitrate yields a white precipitate with But-1-yne, while But-2-yne shows no reaction."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Use Tollens' reagent (ammoniacal AgNO₃); only But-1-yne forms a white precipitate</span>
            </div>
          </div>

          {/* Problem 11 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 11: Cyclohexane Conformation stability</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Why is cis-1,3-dimethylcyclohexane more stable in its chair conformation than trans-1,3-dimethylcyclohexane?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. In cis-1,3-dimethylcyclohexane, both methyl groups can adopt equatorial positions: (1-equatorial, 3-equatorial)."}</div>
              <div>{"2. In trans-1,3-dimethylcyclohexane, one methyl group must be axial and one equatorial: (1-axial, 3-equatorial)."}</div>
              <div>{"3. Having both groups equatorial avoids steric 1,3-diaxial interactions, making the cis isomer more stable."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Cis-1,3-dimethylcyclohexane can place both methyl groups in equatorial positions</span>
            </div>
          </div>

          {/* Problem 12 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 12: DBE Calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Calculate the Degree of Unsaturation (DBE) for the molecular formula C₈H₉NCl₂."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Apply formula: DBE = C - (H + X)/2 + N/2 + 1."}</div>
              <div>{"2. Substitute values: C = 8, H = 9, X = 2 (two Cl), N = 1."}</div>
              <div>{"3. DBE = 8 - (9 + 2)/2 + 1/2 + 1 = 8 - 5.5 + 0.5 + 1 = 4."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: DBE = 4 (indicating a likely benzene ring)</span>
            </div>
          </div>

          {/* Problem 13 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 13: Acid-Catalyzed Hydration of Propyne</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Predict the major organic product formed when propyne reacts with aqueous H₂SO₄ in the presence of HgSO₄ catalyst."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Hydration of an alkyne under Hg²⁺ / H⁺ follows Markovnikov's rule."}</div>
              <div>{"2. Propyne (CH₃-C≡CH) reacts with water to add H to the terminal CH and OH to the central carbon: CH₃-C(OH)=CH₂ (prop-1-en-2-ol, an enol intermediate)."}</div>
              <div>{"3. The enol undergoes rapid keto-enol tautomerism where the double bond shifts to C=O and the proton shifts to the terminal carbon, producing a stable methyl ketone."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Propanone (Acetone)</span>
            </div>
          </div>

          {/* Problem 14 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 14: Selective Alkyne Reduction Stereochemistry</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An internal alkyne, hex-3-yne, is subjected to: (A) H₂ over Lindlar's catalyst, and (B) sodium in liquid ammonia. State the stereochemistry and IUPAC name of the product in each case."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed text-left">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Case (A): Lindlar's catalyst (Pd/CaCO₃/Pb(OAc)₂/quinoline) catalyzes selective syn-addition of hydrogen to an alkyne, yielding the cis-alkene."}</div>
              <div>{"   Product: cis-hex-3-ene (or (Z)-hex-3-ene)."}</div>
              <div>{"2. Case (B): Sodium in liquid ammonia reduces the alkyne via a radical-anion mechanism that places the radical and anion groups anti to each other, yielding the trans-alkene."}</div>
              <div>{"   Product: trans-hex-3-ene (or (E)-hex-3-ene)."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: (A) cis-hex-3-ene, (B) trans-hex-3-ene</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ── SECTION 18: PRACTICE MOCK TEST ──────────────────────────────────── */}
      <Collapsible title="18 · Practice Mock Test (10 Questions)" icon={<Award className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-xs sm:text-sm text-white/80">
          <p className="text-white/60">
            Test your knowledge of Aliphatic and Aromatic Hydrocarbons with this mock test.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'Which of the following alkanes cannot be synthesized in good yield by the Wurtz reaction?',
                a: 'Ethane',
                b: 'Butane',
                c: 'Propane',
                d: 'Hexane',
                ans: 'Correct Answer: C. Propane is an unsymmetrical alkane with 3 carbons. Reaction of a mixture of methyl chloride and ethyl chloride with sodium yields a messy mixture of ethane, propane, and butane, leading to poor propene yields.'
              },
              {
                q: 'Select the correct order of acidic strength for the following hydrocarbons:',
                a: 'Ethyne > Ethene > Ethane',
                b: 'Ethane > Ethene > Ethyne',
                c: 'Ethene > Ethyne > Ethane',
                d: 'Ethyne > Ethane > Ethene',
                ans: 'Correct Answer: A. Ethyne (sp hybridised carbon, 50% s-character) is more acidic than ethene (sp², 33% s-character) and ethane (sp³, 25% s-character) due to stabilization of the conjugate base.'
              },
              {
                q: 'Predict the major product when 1-methylcyclohexene undergoes hydroboration-oxidation.',
                a: '1-Methylcyclohexanol',
                b: 'trans-2-Methylcyclohexanol',
                c: 'cis-2-Methylcyclohexanol',
                d: '1-Methylcyclohexane-1,2-diol',
                ans: 'Correct Answer: B. Hydroboration-oxidation adds H₂O across double bonds with anti-Markovnikov regioselectivity and syn-stereospecificity, yielding trans-2-methylcyclohexanol.'
              },
              {
                q: 'Which of the following rings fails to undergo Friedel-Crafts alkylation?',
                a: 'Aniline',
                b: 'Nitrobenzene',
                c: 'Benzoic Acid',
                d: 'All of the above',
                ans: 'Correct Answer: D. All of the above. Nitrobenzene and benzoic acid contain deactivating substituents. Aniline fails because its basic nitrogen coordinates with the AlCl₃ catalyst, forming a deactivated complex.'
              },
              {
                q: 'Under oxidative ozonolysis, But-2-ene yields which of the following compounds?',
                a: 'Acetaldehyde',
                b: 'Acetic acid',
                c: 'Formaldehyde',
                d: 'Propanoic acid',
                ans: 'Correct Answer: B. Oxidative ozonolysis of but-2-ene yields acetic acid (ethanoic acid) because the initial acetaldehyde intermediate is oxidized by the H₂O₂ workup.'
              },
              {
                q: 'Which conformation of cyclohexane represents a energy maximum / transition state?',
                a: 'Chair Conformation',
                b: 'Twist Boat Conformation',
                c: 'Half Chair Conformation',
                d: 'Boat Conformation',
                ans: 'Correct Answer: C. The Half-Chair conformation represents the highest energy maximum (transition state) on the cyclohexane ring inversion energy coordinate.'
              },
              {
                q: 'Which of the following groups is meta-directing in electrophilic aromatic substitution?',
                a: 'Chlorine (-Cl)',
                b: 'Methoxy (-OCH₃)',
                c: 'Nitro (-NO₂)',
                d: 'Methyl (-CH₃)',
                ans: 'Correct Answer: C. The nitro group is strongly deactivating and meta-directing due to its negative mesomeric (-M) and inductive (-I) effects.'
              },
              {
                q: 'What is the correct order of stability for the following alkenes?',
                a: 'trans-But-2-ene > cis-But-2-ene > But-1-ene',
                b: 'But-1-ene > cis-But-2-ene > trans-But-2-ene',
                c: 'cis-But-2-ene > trans-But-2-ene > But-1-ene',
                d: 'trans-But-2-ene > But-1-ene > cis-But-2-ene',
                ans: 'Correct Answer: A. trans-But-2-ene is most stable (trans methyl groups minimize steric crowding) followed by cis-but-2-ene, with monosubstituted but-1-ene being the least stable.'
              },
              {
                q: 'What is the electrophile in the nitration of benzene using a mixture of concentrated nitric and sulfuric acids?',
                a: 'NO₂',
                b: 'NO₂⁺ (Nitronium ion)',
                c: 'NO₃⁻',
                d: 'HNO₃',
                ans: 'Correct Answer: B. H₂SO₄ protonates HNO₃, which subsequently loses water to generate the nitronium ion (NO₂⁺) electrophile.'
              },
              {
                q: 'Which test is used to detect unsaturation in hydrocarbons?',
                a: 'Baeyer\'s Test (cold alkaline KMnO₄)',
                b: 'Bromine in CCl₄ test',
                c: 'Lassaigne\'s Test',
                d: 'Both A and B',
                ans: 'Correct Answer: D. Both Bromine in CCl₄ and Baeyer\'s test (cold alkaline KMnO₄) are decolorised by alkenes/alkynes, serving as chemical tests for unsaturation.'
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
          className="text-[13px] text-white/50 hover:text-white transition flex items-center gap-1.5"
        >
          ← Back to Dashboard
        </button>
        <span className="text-[11px] text-white/30 font-mono">Hydrocarbons · Unit 11</span>
      </div>

    </div>
  );
}
