import React, { useState } from 'react';
import { 
  Star, 
  BarChart3, 
  Atom, 
  Layers, 
  FlaskConical, 
  BookOpen, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  Lightbulb,
  Zap,
  TrendingUp,
  RefreshCw,
  Sparkles
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

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
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
      border: 'border-white/8 hover:border-cyan-500/30',
      activeBorder: 'border-cyan-500/30',
      bg: 'bg-[#0b1220]/20',
      text: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10'
    },
    rose: {
      border: 'border-white/8 hover:border-rose-500/30',
      activeBorder: 'border-rose-500/30',
      bg: 'bg-[#180a0f]/20',
      text: 'text-rose-400',
      iconBg: 'bg-rose-500/10'
    },
    amber: {
      border: 'border-white/8 hover:border-amber-500/30',
      activeBorder: 'border-amber-500/30',
      bg: 'bg-[#151007]/20',
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/10'
    },
    violet: {
      border: 'border-white/8 hover:border-violet-500/30',
      activeBorder: 'border-violet-500/30',
      bg: 'bg-[#110718]/20',
      text: 'text-violet-400',
      iconBg: 'bg-violet-500/10'
    },
    emerald: {
      border: 'border-white/8 hover:border-emerald-500/30',
      activeBorder: 'border-emerald-500/30',
      bg: 'bg-[#06120e]/20',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10'
    }
  };

  const style = colors[accent];

  return (
    <div className={`rounded-3xl border transition-all overflow-hidden ${isOpen ? `${style.activeBorder} ${style.bg}` : style.border}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${style.iconBg} ${style.text} shrink-0`}>
            {icon}
          </div>
          <span className="text-[14.5px] font-black text-white leading-tight tracking-wide">{title}</span>
        </div>
        <div className={`text-[11px] font-bold uppercase tracking-wider shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''} ${style.text}`}>
          {isOpen ? 'Collapse ▲' : 'Expand ▼'}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 hover:border-white/15 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-white/45">Formula / Rule</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-2.5 h-2.5 ${i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10'}`} />
          ))}
        </span>
      </div>
      <p className="text-cyan-300 font-mono font-bold text-[13.5px] leading-snug" dangerouslySetInnerHTML={{ __html: formula }} />
      <p className="text-white/80 text-[11px]"><strong className="text-white/40">Use:</strong> {use}</p>
      <p className="text-white/55 text-[11px]"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: note }} /></p>
    </div>
  );
}

// ─── STATIC SVG FIGURES ─────────────────────────────────────────────────────

function KMnO4ColorTransitionDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12.5px] text-white/50 mb-3 font-bold text-center">KMnO₄ Medium-Dependent Color & Oxidation State Transitions</span>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 150 }}>
        {/* Starting state: KMnO4 (+7) */}
        <rect x="120" y="10" width="100" height="35" rx="8" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" />
        <text x="170" y="26" fill="#f3e8ff" fontSize="9.5" fontWeight="bold" textAnchor="middle">MnO₄⁻ (Purple)</text>
        <text x="170" y="38" fill="#c084fc" fontSize="8" textAnchor="middle">Mn Oxidation State: +7</text>

        {/* Transition Arrows */}
        {/* Acidic path */}
        <path d="M 120,28 L 50,28 L 50,75" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="45" y="48" fill="#94a3b8" fontSize="7.5" textAnchor="end">Acidic Medium</text>
        <text x="45" y="58" fill="#f87171" fontSize="7.5" fontWeight="bold" textAnchor="end">Gain 5e⁻ (n = 5)</text>

        {/* Neutral path */}
        <path d="M 170,45 L 170,75" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="175" y="58" fill="#94a3b8" fontSize="7.5" textAnchor="start">Neutral / Mildly Alkaline</text>
        <text x="175" y="68" fill="#f59e0b" fontSize="7.5" fontWeight="bold" textAnchor="start">Gain 3e⁻ (n = 3)</text>

        {/* Strong Alkaline path */}
        <path d="M 220,28 L 290,28 L 290,75" fill="none" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="295" y="48" fill="#94a3b8" fontSize="7.5" textAnchor="start">Strongly Basic</text>
        <text x="295" y="58" fill="#34d399" fontSize="7.5" fontWeight="bold" textAnchor="start">Gain 1e⁻ (n = 1)</text>

        {/* Ending States */}
        {/* Acidic: Mn2+ (Colorless) */}
        <rect x="10" y="80" width="80" height="40" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <text x="50" y="96" fill="#cbd5e1" fontSize="8.5" fontWeight="bold" textAnchor="middle">Mn²⁺</text>
        <text x="50" y="107" fill="#94a3b8" fontSize="7.5" textAnchor="middle">(Colorless / Pale Pink)</text>
        <text x="50" y="116" fill="#f87171" fontSize="7" fontWeight="bold" textAnchor="middle">n-factor = 5</text>

        {/* Neutral: MnO2 (Brown PPT) */}
        <rect x="130" y="80" width="80" height="40" rx="6" fill="#451a03" stroke="#b45309" strokeWidth="1.5" />
        <text x="170" y="96" fill="#fed7aa" fontSize="8.5" fontWeight="bold" textAnchor="middle">MnO₂</text>
        <text x="170" y="107" fill="#fb923c" fontSize="7.5" textAnchor="middle">(Brown Precipitate)</text>
        <text x="170" y="116" fill="#f59e0b" fontSize="7" fontWeight="bold" textAnchor="middle">n-factor = 3</text>

        {/* Strongly Alkaline: MnO4 2- (Green) */}
        <rect x="250" y="80" width="80" height="40" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
        <text x="290" y="96" fill="#d1fae5" fontSize="8.5" fontWeight="bold" textAnchor="middle">MnO₄²⁻</text>
        <text x="290" y="107" fill="#34d399" fontSize="7.5" textAnchor="middle">(Green Solution)</text>
        <text x="290" y="116" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">n-factor = 1</text>

        {/* Arrow Marker definition */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function DisproportionationComproportionationDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12.5px] text-white/50 mb-3 font-bold text-center">Disproportionation vs. Comproportionation Mechanics</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Disproportionation */}
        <div className="flex flex-col items-center border border-white/5 p-3 rounded-xl bg-white/5">
          <span className="text-[11px] text-amber-300 font-bold mb-2">Disproportionation (Diverging States)</span>
          <svg viewBox="0 0 180 110" className="w-full" style={{ maxHeight: 90 }}>
            {/* Reactant: H2O2 (-1) */}
            <rect x="55" y="5" width="70" height="22" rx="4" fill="#1e1b4b" stroke="#4f46e5" strokeWidth="1" />
            <text x="90" y="19" fill="#e0e7ff" fontSize="8.5" fontWeight="bold" textAnchor="middle">H₂O₂ (O.N. = −1)</text>

            {/* Arrows */}
            <path d="M 70,27 L 40,65" fill="none" stroke="#f87171" strokeWidth="1" markerEnd="url(#arrow-red)" />
            <text x="45" y="44" fill="#f87171" fontSize="7" textAnchor="end">Reduction</text>
            
            <path d="M 110,27 L 140,65" fill="none" stroke="#34d399" strokeWidth="1" markerEnd="url(#arrow-green)" />
            <text x="135" y="44" fill="#34d399" fontSize="7" textAnchor="start">Oxidation</text>

            {/* Products */}
            <rect x="5" y="70" width="70" height="22" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="40" y="84" fill="#d1fae5" fontSize="8" fontWeight="bold" textAnchor="middle">H₂O (O.N. = −2)</text>

            <rect x="105" y="70" width="70" height="22" rx="4" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
            <text x="140" y="84" fill="#fef3c7" fontSize="8" fontWeight="bold" textAnchor="middle">O₂ (O.N. = 0)</text>
          </svg>
        </div>

        {/* Comproportionation */}
        <div className="flex flex-col items-center border border-white/5 p-3 rounded-xl bg-white/5">
          <span className="text-[11px] text-cyan-300 font-bold mb-2">Comproportionation (Converging States)</span>
          <svg viewBox="0 0 180 110" className="w-full" style={{ maxHeight: 90 }}>
            {/* Reactants: Fe (0) and Fe3+ (+3) */}
            <rect x="5" y="5" width="70" height="22" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <text x="40" y="19" fill="#cbd5e1" fontSize="8" fontWeight="bold" textAnchor="middle">Fe (O.N. = 0)</text>

            <rect x="105" y="5" width="70" height="22" rx="4" fill="#581c87" stroke="#a855f7" strokeWidth="1" />
            <text x="140" y="19" fill="#f3e8ff" fontSize="8" fontWeight="bold" textAnchor="middle">Fe³⁺ (O.N. = +3)</text>

            {/* Arrows */}
            <path d="M 40,27 L 70,65" fill="none" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#arrow-blue)" />
            <text x="43" y="48" fill="#60a5fa" fontSize="7" textAnchor="end">Oxidation</text>

            <path d="M 140,27 L 110,65" fill="none" stroke="#c084fc" strokeWidth="1" markerEnd="url(#arrow-purple)" />
            <text x="137" y="48" fill="#c084fc" fontSize="7" textAnchor="start">Reduction</text>

            {/* Product: Fe2+ (+2) */}
            <rect x="55" y="70" width="70" height="22" rx="4" fill="#172554" stroke="#3b82f6" strokeWidth="1" />
            <text x="90" y="84" fill="#dbeafe" fontSize="8.5" fontWeight="bold" textAnchor="middle">Fe²⁺ (O.N. = +2)</text>
          </svg>
        </div>
      </div>
      <defs>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f87171" />
        </marker>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
        </marker>
        <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#c084fc" />
        </marker>
      </defs>
    </div>
  );
}

// ─── INTERACTIVE SIMULATORS ──────────────────────────────────────────────────

interface CompoundData {
  name: string;
  formula: string;
  medium: string;
  startON: number;
  endON: number;
  nFactor: number;
  molarMassLabel: string;
  explanation: string;
}

const COMPOUNDS_DB: Record<string, CompoundData> = {
  kmno4_acid: {
    name: 'Potassium Permanganate (Acidic)',
    formula: 'KMnO₄',
    medium: 'Acidic (pH < 7)',
    startON: 7,
    endON: 2,
    nFactor: 5,
    molarMassLabel: 'M / 5',
    explanation: 'In acidic media, MnO₄⁻ is reduced to Mn²⁺. The change in oxidation state is from +7 to +2, which involves a gain of 5 electrons per Mn atom.'
  },
  kmno4_neutral: {
    name: 'Potassium Permanganate (Neutral/Mildly Basic)',
    formula: 'KMnO₄',
    medium: 'Neutral / Weakly Alkaline',
    startON: 7,
    endON: 4,
    nFactor: 3,
    molarMassLabel: 'M / 3',
    explanation: 'In neutral or faintly alkaline media, MnO₄⁻ is reduced to brown MnO₂ precipitate. The oxidation state changes from +7 to +4 (gain of 3 electrons).'
  },
  kmno4_basic: {
    name: 'Potassium Permanganate (Strongly Basic)',
    formula: 'KMnO₄',
    medium: 'Strongly Alkaline (pH > 12)',
    startON: 7,
    endON: 6,
    nFactor: 1,
    molarMassLabel: 'M / 1',
    explanation: 'In strongly basic media, MnO₄⁻ is reduced to green manganate ion MnO₄²⁻. The oxidation state changes from +7 to +6 (gain of 1 electron).'
  },
  k2cr2o7: {
    name: 'Potassium Dichromate (Acidic)',
    formula: 'K₂Cr₂O₇',
    medium: 'Acidic (pH < 7)',
    startON: 6,
    endON: 3,
    nFactor: 6,
    molarMassLabel: 'M / 6',
    explanation: 'Cr₂O₇²⁻ is reduced to Cr³⁺ in acidic media. Each Cr changes from +6 to +3 (change = 3). Since there are 2 Cr atoms per formula unit of K₂Cr₂O₇, the total change is 2 × 3 = 6.'
  },
  h2o2_ox: {
    name: 'Hydrogen Peroxide (as Oxidizing Agent)',
    formula: 'H₂O₂',
    medium: 'Acidic or Basic',
    startON: -1,
    endON: -2,
    nFactor: 2,
    molarMassLabel: 'M / 2',
    explanation: 'When acting as an oxidizing agent, H₂O₂ is reduced to H₂O. The oxidation state of oxygen changes from −1 to −2 (change = 1 per oxygen). Since H₂O₂ contains 2 oxygen atoms, the total n-factor is 2.'
  },
  h2o2_red: {
    name: 'Hydrogen Peroxide (as Reducing Agent)',
    formula: 'H₂O₂',
    medium: 'Acidic or Basic',
    startON: -1,
    endON: 0,
    nFactor: 2,
    molarMassLabel: 'M / 2',
    explanation: 'When acting as a reducing agent, H₂O₂ is oxidized to O₂. The oxidation state of oxygen changes from −1 to 0 (change = 1 per oxygen). With 2 oxygen atoms in H₂O₂, the total n-factor is 2.'
  },
  fec2o4: {
    name: 'Ferrous Oxalate (Oxidized to Fe³⁺ & CO₂)',
    formula: 'FeC₂O₄',
    medium: 'Acidic (pH < 7)',
    startON: 2,
    endON: 3,
    nFactor: 3,
    molarMassLabel: 'M / 3',
    explanation: 'Both Fe²⁺ and C₂O₄²⁻ undergo oxidation. Fe²⁺ ➔ Fe³⁺ + e⁻ (1 electron lost). C₂O₄²⁻ ➔ 2CO₂ + 2e⁻ (2 electrons lost). The total electrons lost per formula unit = 1 + 2 = 3.'
  },
  na2s2o3: {
    name: 'Sodium Thiosulfate (Oxidized to Tetrathionate)',
    formula: 'Na₂S₂O₃',
    medium: 'Neutral / Acidic (with Iodine)',
    startON: 2,
    endON: 2.5,
    nFactor: 1,
    molarMassLabel: 'M / 1',
    explanation: '2S₂O₃²⁻ ➔ S₄O₆²⁻ + 2e⁻. The reaction involves the loss of 2 electrons for two formula units of thiosulfate, which yields exactly 1 electron lost per formula unit (n-factor = 1).'
  }
};

function NFactorCalculator() {
  const [selectedId, setSelectedId] = useState<string>('kmno4_acid');
  const active = COMPOUNDS_DB[selectedId];

  return (
    <div className="rounded-3xl border border-white/8 bg-[#090b18] p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider">n-Factor & Equivalent Weight Calculator</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-white/45 block mb-1.5 uppercase font-bold">Select Redox Reactant</label>
          <select 
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-cyan-500/50"
          >
            {Object.entries(COMPOUNDS_DB).map(([id, item]) => (
              <option key={id} value={id} className="bg-[#0c0e22] text-white">
                {item.name} ({item.formula})
              </option>
            ))}
          </select>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-center">
          <span className="text-[10px] text-white/40 block uppercase font-bold mb-1">Reaction Medium</span>
          <span className="text-[13px] text-cyan-300 font-bold">{active.medium}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/40 p-4 rounded-2xl border border-white/5">
        <div className="text-center">
          <span className="text-[10px] text-white/35 block uppercase font-bold mb-0.5">Start O.N.</span>
          <span className="text-md font-bold text-white">{active.startON >= 0 ? `+${active.startON}` : active.startON}</span>
        </div>
        <div className="text-center border-l border-white/5">
          <span className="text-[10px] text-white/35 block uppercase font-bold mb-0.5">End O.N.</span>
          <span className="text-md font-bold text-white">{active.endON >= 0 ? `+${active.endON}` : active.endON}</span>
        </div>
        <div className="text-center border-l border-white/5">
          <span className="text-[10px] text-white/35 block uppercase font-bold mb-0.5">n-factor (n)</span>
          <span className="text-md font-black text-amber-400">{active.nFactor}</span>
        </div>
        <div className="text-center border-l border-white/5">
          <span className="text-[10px] text-white/35 block uppercase font-bold mb-0.5">Equiv Mass</span>
          <span className="text-md font-bold text-emerald-400 font-mono">{active.molarMassLabel}</span>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-[12.5px] text-white/70 leading-relaxed">
        <span className="font-bold text-white block mb-1">Step-by-Step Chemistry Explanation:</span>
        {active.explanation}
      </div>
    </div>
  );
}

interface BalancingStep {
  equation: string;
  description: string;
  notes: string;
}

interface ReactionSteps {
  title: string;
  steps: BalancingStep[];
}

const BALANCING_DB: Record<string, ReactionSteps> = {
  acidic: {
    title: 'Acidic Medium: Fe²⁺ + MnO₄⁻ ➔ Fe³⁺ + Mn²⁺',
    steps: [
      {
        equation: 'Fe²⁺ + MnO₄⁻ ➔ Fe³⁺ + Mn²⁺',
        description: 'Assign Oxidation Numbers to find the oxidized and reduced species.',
        notes: 'Fe is oxidized (+2 ➔ +3, loss of 1e⁻). Mn is reduced (+7 in MnO₄⁻ ➔ +2 in Mn²⁺, gain of 5e⁻).'
      },
      {
        equation: '5Fe²⁺ + MnO₄⁻ ➔ 5Fe³⁺ + Mn²⁺',
        description: 'Equalize oxidation number changes by multiplying coefficients.',
        notes: 'Multiply Fe by 5 so that total electrons lost (5 × 1 = 5) equals total electrons gained (1 × 5 = 5).'
      },
      {
        equation: '5Fe²⁺ + MnO₄⁻ + 8H⁺ ➔ 5Fe³⁺ + Mn²⁺',
        description: 'Balance charge by adding H⁺ (since it is acidic medium).',
        notes: 'Total charge on left: 5(+2) + (−1) = +9. Total charge on right: 5(+3) + (+2) = +17. Add 8 H⁺ on the left to make left charge +17.'
      },
      {
        equation: '5Fe²⁺ + MnO₄⁻ + 8H⁺ ➔ 5Fe³⁺ + Mn²⁺ + 4H₂O',
        description: 'Balance hydrogen and oxygen atoms by adding H₂O to the opposite side.',
        notes: 'There are 8 H on the left, so add 4 H₂O on the right. Both mass and charge are now perfectly conserved! (Verify: 4 O on both sides).'
      }
    ]
  },
  basic: {
    title: 'Basic Medium: Cl₂ ➔ Cl⁻ + ClO₃⁻',
    steps: [
      {
        equation: 'Cl₂ ➔ Cl⁻ + ClO₃⁻',
        description: 'Identify oxidation states for disproportionation of Cl₂.',
        notes: 'Cl₂ (0) is reduced to Cl⁻ (−1, loss of 1e⁻ per Cl) and oxidized to ClO₃⁻ (+5, gain of 5e⁻ per Cl).'
      },
      {
        equation: '3Cl₂ ➔ 5Cl⁻ + ClO₃⁻',
        description: 'Equalize changes in oxidation number.',
        notes: 'Reduction: Cl₂ ➔ 2Cl⁻ (needs 2e⁻). Oxidation: Cl₂ ➔ 2ClO₃⁻ (releases 10e⁻). To balance electrons, multiply reduction by 5: 3Cl₂ ➔ 5Cl⁻ + ClO₃⁻.'
      },
      {
        equation: '3Cl₂ + 6OH⁻ ➔ 5Cl⁻ + ClO₃⁻',
        description: 'Balance charge by adding OH⁻ (since it is basic medium).',
        notes: 'Total charge on right: 5(−1) + 1(−1) = −6. Total charge on left: 0. Add 6 OH⁻ on the left side to match charge.'
      },
      {
        equation: '3Cl₂ + 6OH⁻ ➔ 5Cl⁻ + ClO₃⁻ + 3H₂O',
        description: 'Balance oxygen and hydrogen atoms by adding H₂O.',
        notes: 'Add 3 H₂O to the right. Let\'s check: 6 O and 6 H on both sides, net charge −6 on both sides. Perfectly balanced!'
      }
    ]
  }
};

function RedoxBalancingTrainer() {
  const [selectedReact, setSelectedReact] = useState<string>('acidic');
  const [stepIdx, setStepIdx] = useState<number>(0);

  const activeReact = BALANCING_DB[selectedReact];
  const activeStep = activeReact.steps[stepIdx];

  return (
    <div className="rounded-3xl border border-white/8 bg-[#090b18] p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <span className="text-[12px] font-bold text-amber-400 uppercase tracking-wider">Redox Equation Balancing Trainer</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-white/45 block mb-1.5 uppercase font-bold">Select Reaction Scheme</label>
          <select 
            value={selectedReact}
            onChange={(e) => {
              setSelectedReact(e.target.value);
              setStepIdx(0);
            }}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-cyan-500/50"
          >
            {Object.entries(BALANCING_DB).map(([id, item]) => (
              <option key={id} value={id} className="bg-[#0c0e22] text-white">
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between gap-1 border border-white/5 p-2 rounded-2xl bg-white/[0.02]">
          <span className="text-[10.5px] text-white/40 font-bold ml-2">BALANCING STEP</span>
          <div className="flex gap-1.5">
            {activeReact.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStepIdx(i)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                  stepIdx === i 
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                    : 'bg-white/5 text-white/55 hover:bg-white/10 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live equation container */}
      <div className="p-5 rounded-2xl border border-white/5 bg-[#05060f] flex flex-col items-center justify-center relative overflow-hidden min-h-[70px]">
        <div className="absolute top-2 left-3 text-[9px] font-bold text-white/30 uppercase tracking-wider">Current Equation State</div>
        <div className="text-md sm:text-lg font-mono font-black text-amber-300 text-center select-none pt-2">
          {activeStep.equation}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2.5 text-[13px] text-white/90">
          <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-white">Action: </span>
            {activeStep.description}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-[12px] text-white/55 leading-relaxed font-sans">
          <strong className="text-white/40 block mb-0.5">Step Chemistry Notes:</strong>
          {activeStep.notes}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          disabled={stepIdx === 0}
          onClick={() => setStepIdx(stepIdx - 1)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
        >
          ◀ Previous Step
        </button>
        <span className="text-[11px] text-white/35 font-bold">Step {stepIdx + 1} of 4</span>
        <button
          disabled={stepIdx === 3}
          onClick={() => setStepIdx(stepIdx + 1)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-black hover:bg-amber-400 disabled:opacity-30 disabled:pointer-events-none"
        >
          Next Step ▶
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface Props {
  progress: number;
  isCompleted: boolean;
  onNavigate?: (direction: 'next' | 'prev') => void;
}

export default function RedoxDetail({ progress, isCompleted, onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'nfactor' | 'balancing'>('nfactor');

  const tabs = [
    { id: 'nfactor' as const, label: 'n-Factor & Equiv Mass', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'balancing' as const, label: 'Redox Balancing Lab', icon: <Zap className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0b0f1e] via-[#0d1220] to-[#0b0f1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="cyan">Chemistry</Tag>
            <Tag color="amber">Unit 8</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="pink">Hot Topic</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Redox<br />
            <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">Reactions</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Master the core principles of electron transfer, oxidation numbers, fractional states, systematic equation balancing (acidic/basic media), n-factor calculations across different environments, and high-yield titration reagents.
          </p>
          <div className="flex gap-3 flex-wrap text-[12px] text-white/40">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 20 min read</span>
            <span>·</span><span>pyqFrequency: 79%</span>
            <span>·</span><span className="text-rose-400 font-bold">Priority: Hot Topic</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: Classical Concept ────────────────── */}
      <Collapsible title="1 · Classical Concept of Oxidation & Reduction" icon={<Atom className="w-4 h-4" />} accent="emerald" defaultOpen={true}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Initially, chemical processes were defined as oxidation or reduction based on the addition or removal of oxygen and hydrogen. The classical framework was later extended to encompass any electronegative or electropositive elements.</p>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12.5px] text-left">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-3 py-2 text-white/45 font-bold">Process</th>
                  <th className="px-3 py-2 text-white/45 font-bold">Extended Classical Definition</th>
                  <th className="px-3 py-2 text-white/45 font-bold font-mono">Representative Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-3 py-2.5 font-bold text-emerald-400">Oxidation</td>
                  <td className="px-3 py-2.5 text-white/70">Addition of oxygen / electronegative elements OR removal of hydrogen / electropositive elements.</td>
                  <td className="px-3 py-2.5 font-mono text-cyan-300">2Mg + O₂ ➔ 2MgO<br />Mg + Cl₂ ➔ MgCl₂</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-3 py-2.5 font-bold text-rose-400">Reduction</td>
                  <td className="px-3 py-2.5 text-white/70">Removal of oxygen / electronegative elements OR addition of hydrogen / electropositive elements.</td>
                  <td className="px-3 py-2.5 font-mono text-cyan-300">2HgO ➔ 2Hg + O₂<br />CuO + H₂ ➔ Cu + H₂O</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProTip>
            Always look at the elements being transferred: addition of chlorine, fluorine, or oxygen is classical <strong>oxidation</strong> because they are highly electronegative elements. Addition of sodium, calcium, or hydrogen is classical <strong>reduction</strong>.
          </ProTip>
        </div>
      </Collapsible>

      {/* ── SECTION 2: Electron Transfer ────────────────── */}
      <Collapsible title="2 · Electron-Transfer Concept & Agents" icon={<Layers className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>A redox reaction is a process in which oxidation and reduction occur simultaneously. Many ionic redox reactions in solution are most clearly described by the literal transfer of electrons from a donor to an acceptor.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px] mt-2">
            <div className="p-4 rounded-xl bg-[#090b18] border border-white/8 space-y-1.5">
              <span className="text-cyan-300 font-bold block">Oxidation (OIL)</span>
              <p className="text-white/60">Loss of electrons by a species. The oxidation state increases.</p>
              <div className="font-mono text-cyan-400 text-[11px] bg-black/30 p-2 rounded">
                Na ➔ Na⁺ + e⁻<br />
                2Cl⁻ ➔ Cl₂ + 2e⁻
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#090b18] border border-white/8 space-y-1.5">
              <span className="text-rose-300 font-bold block">Reduction (RIG)</span>
              <p className="text-white/60">Gain of electrons by a species. The oxidation state decreases.</p>
              <div className="font-mono text-rose-400 text-[11px] bg-black/30 p-2 rounded">
                Fe³⁺ + e⁻ ➔ Fe²⁺<br />
                O₂ + 4e⁻ ➔ 2O²⁻
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px] mt-2">
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-1.5">
              <span className="text-emerald-400 font-bold block">Oxidizing Agent (OA) / Oxidant</span>
              <p className="text-white/60">The reactant that gains electrons and undergoes reduction. It oxidizes other species.</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1.5">
              <span className="text-amber-400 font-bold block">Reducing Agent (RA) / Reductant</span>
              <p className="text-white/60">The reactant that loses electrons and undergoes oxidation. It reduces other species.</p>
            </div>
          </div>

          <TrapCard title="Covalent Bond Trap">
            Covalent reactions, such as <code className="text-white font-mono">H₂ + Cl₂ ➔ 2HCl</code>, do not involve a literal, complete physical transfer of electrons. Applying the strict "electron transfer" definition is an oversimplification here. We must use the broader <strong>Oxidation Number</strong> method instead.
          </TrapCard>
        </div>
      </Collapsible>

      {/* ── SECTION 3: Oxidation Number ────────────────── */}
      <Collapsible title="3 · Oxidation Number Concept & Assignment Rules" icon={<FlaskConical className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p><strong className="text-white">Oxidation Number (O.N.):</strong> The hypothetical charge assigned to an atom in a molecule by assuming that shared bonding electrons are completely assigned to the more electronegative atom in the bond.</p>

          <SectionBanner label="Rules for Assigning Oxidation Numbers" color="amber" />
          <ul className="space-y-2 text-white/70 text-[12.5px] list-disc list-inside">
            <li>• <strong className="text-white">Free State Rule:</strong> The O.N. of an element in its free or uncombined state (allotropic forms) is always zero. (e.g. O₂, P₄, S₈, Na, C(graphite) = 0).</li>
            <li>• <strong className="text-white">Fluorine:</strong> Fluorine is the most electronegative element; its O.N. is strictly <strong>−1</strong> in all its compounds.</li>
            <li>• <strong className="text-white">Oxygen:</strong> Oxygen usually has an O.N. of <strong>−2</strong>. Important exceptions:
              <ul className="pl-5 space-y-1 text-white/60 list-circle">
                <li>− Peroxides (e.g., H₂O₂, Na₂O₂): O.N. = <strong>−1</strong></li>
                <li>− Superoxides (e.g., KO₂, RbO₂): O.N. = <strong>−1/2</strong></li>
                <li>− Oxygen Fluorides (e.g., OF₂): O.N. = <strong>+2</strong></li>
                <li>− Dioxygen Difluoride (e.g., O₂F₂): O.N. = <strong>+1</strong></li>
              </ul>
            </li>
            <li>• <strong className="text-white">Hydrogen:</strong> Hydrogen is generally <strong>+1</strong> when bonded to non-metals. In ionic hydrides of highly electropositive elements (active metals like LiH, NaH, KH, CaH₂), hydrogen is <strong>−1</strong>.</li>
            <li>• <strong className="text-white">Halogens (Cl, Br, I):</strong> Usually have O.N. of <strong>−1</strong>. However, when bonded to more electronegative oxygen or fluorine atoms, they exhibit positive oxidation states (e.g. in HClO₄, Cl is +7).</li>
            <li>• <strong className="text-white">Sum Rule:</strong> The algebraic sum of oxidation numbers of all atoms in a neutral molecule must be <strong>0</strong>. For a polyatomic ion, the sum must equal the net charge of the ion.</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormulaCard 
              formula="Σ (O.N.) = 0"
              use="Neutral molecules" 
              note="Used to calculate unknown state of a central metal atom (e.g., K₂Cr₂O₇ ➔ 2(+1) + 2(x) + 7(−2) = 0 ➔ x = +6)."
              priority={5}
            />
            <FormulaCard 
              formula="Σ (O.N.) = Charge"
              use="Polyatomic ions" 
              note="For SO₄²⁻, x + 4(−2) = −2 ➔ x = +6."
              priority={5}
            />
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 4: Fractional States ────────────────── */}
      <Collapsible title="4 · Fractional & Average Oxidation States" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Fractional oxidation numbers are not physical charges on individual atoms. They represent an <strong>average oxidation state</strong> of different atoms of the same element in a single molecule that are located in structurally distinct bonding environments.</p>

          <div className="p-4.5 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-3 text-[13px]">
            <span className="text-violet-300 font-bold block">Examples of Average vs. Structural Oxidation States</span>
            <ul className="space-y-2 text-white/60">
              <li>• <strong className="text-white">Carbon Suboxide (C₃O₂):</strong> Structure is <code className="text-cyan-300 font-mono">O=C=C=C=O</code>.
                <br />By calculation: 3x + 2(−2) = 0 ➔ average O.N. = <strong>+4/3</strong>.
                <br />Structurally: The central carbon atom is bonded only to carbons, having O.N. = <strong>0</strong>. The two terminal carbons are bonded to electronegative oxygens, each having O.N. = <strong>+2</strong>.
              </li>
              <li>• <strong className="text-white">Mixed Iron Oxide (Fe₃O₄):</strong> Iron exists in a mixed valence state containing FeO (Fe in <strong>+2</strong> state) and Fe₂O₃ (Fe in <strong>+3</strong> state). The calculated average state is <strong>+8/3</strong>.
              </li>
              <li>• <strong className="text-white">Tetrathionate Ion (S₄O₆²⁻):</strong> Structure contains a linear sulfur chain. The two central sulfur atoms are bonded only to sulfur, having O.N. = <strong>0</strong>. The two terminal sulfur atoms are bonded to oxygen atoms, each having O.N. = <strong>+5</strong>. The average is <strong>+2.5</strong>.
              </li>
              <li>• <strong className="text-white">Tribromide Octoxide (Br₃O₈):</strong> Calculated average O.N. of Br = <strong>+16/3</strong>. Structurally, the central Br is bonded only to oxygen and bromine (O.N. = <strong>+4</strong>), while the two terminal Br atoms are in the <strong>+6</strong> state.
              </li>
            </ul>
          </div>

          <div className="mt-3">
            <DisproportionationComproportionationDiagram />
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 5: Types of Redox ────────────────── */}
      <Collapsible title="5 · Types of Redox Reactions" icon={<Star className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Redox reactions can be classified into several categories based on structural changes of reactants:</p>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12.5px] text-left">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-3 py-2 text-white/45 font-bold">Category</th>
                  <th className="px-3 py-2 text-white/45 font-bold">Process Definition</th>
                  <th className="px-3 py-2 text-white/45 font-bold font-mono">Example Reactions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-3 py-2 font-bold text-cyan-300">Combination</td>
                  <td className="px-3 py-2 text-white/70">Two reactants combine to form a single product.</td>
                  <td className="px-3 py-2 font-mono text-cyan-400">C(s) + O₂(g) ➔ CO₂(g)</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-3 py-2 font-bold text-violet-300">Decomposition</td>
                  <td className="px-3 py-2 text-white/70">A compound breaks down into two or more products.</td>
                  <td className="px-3 py-2 font-mono text-violet-400">2H₂O(l) ➔ 2H₂(g) + O₂(g)</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-3 py-2 font-bold text-emerald-300">Displacement</td>
                  <td className="px-3 py-2 text-white/70">An atom/ion in a compound is replaced by another element.</td>
                  <td className="px-3 py-2 font-mono text-emerald-400">Zn(s) + CuSO₄(aq) ➔ ZnSO₄(aq) + Cu(s)</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-3 py-2 font-bold text-amber-300">Disproportionation</td>
                  <td className="px-3 py-2 text-white/70">The same element is simultaneously oxidized and reduced.</td>
                  <td className="px-3 py-2 font-mono text-amber-400">2H₂O₂ ➔ 2H₂O + O₂ (O: −1 ➔ −2, 0)<br />P₄ + 3OH⁻ + 3H₂O ➔ PH₃ + 3H₂PO₂⁻</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/3">
                  <td className="px-3 py-2 font-bold text-rose-300">Comproportionation</td>
                  <td className="px-3 py-2 text-white/70">Reactants in two different oxidation states form a single state.</td>
                  <td className="px-3 py-2 font-mono text-rose-400">Ag(s) + Ag²⁺(aq) ➔ 2Ag⁺(aq)<br />IO₃⁻ + 5I⁻ + 6H⁺ ➔ 3I₂ + 3H₂O</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 6: Balancing Equations ────────────────── */}
      <Collapsible title="6 · Balancing Redox Equations (Systematic Methods)" icon={<Layers className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Balanced chemical equations must satisfy two fundamental laws: **Conservation of Mass** (equal number of atoms of each element on both sides) and **Conservation of Charge** (equal net charge on both sides).</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Oxidation Number Method */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[12.5px] font-bold text-cyan-400 block uppercase tracking-wider">Method A: Oxidation Number Method</span>
              <ol className="space-y-1.5 text-[12px] text-white/60 list-decimal list-inside">
                <li>Write the skeleton equation.</li>
                <li>Assign O.N. to identify which atoms change.</li>
                <li>Calculate O.N. change per atom and per molecule.</li>
                <li>Multiply with appropriate integers to equalize change.</li>
                <li>Balance all atoms other than H and O.</li>
                <li>Add H₂O to balance O, and H⁺ to balance H (acidic).</li>
              </ol>
            </div>

            {/* Half-Reaction Method */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[12.5px] font-bold text-amber-400 block uppercase tracking-wider">Method B: Ion-Electron Method</span>
              <ol className="space-y-1.5 text-[12px] text-white/60 list-decimal list-inside">
                <li>Divide into oxidation and reduction half-reactions.</li>
                <li>Balance all atoms except O and H in each half.</li>
                <li>Balance O by adding H₂O, and H by adding H⁺.</li>
                <li>Balance ionic charges by adding electrons.</li>
                <li>Equalize electrons and add half-reactions.</li>
                <li>Cancel spectator species on both sides.</li>
              </ol>
            </div>
          </div>

          <TrapCard title="Basic Medium Trap: Residual H⁺ Ions">
            In a basic medium, do not leave free H⁺ in your final balanced equation. To balance in basic media: first balance as if it were acidic (using H⁺), then add OH⁻ to both sides equal to the number of H⁺. Combine H⁺ + OH⁻ to form H₂O, and simplify any excess water molecules on both sides.
          </TrapCard>
        </div>
      </Collapsible>

      {/* ── SECTION 7: n-Factor & Equiv Weight ────────────────── */}
      <Collapsible title="7 · n-Factor, Equivalent Mass & Law of Equivalence" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p><strong className="text-white">n-Factor:</strong> For oxidizing and reducing agents, the n-factor is the **total change in oxidation number per formula unit** of the reactant.</p>

          <div className="font-mono text-[13.5px] text-emerald-300 font-bold bg-[#060814] p-3 rounded-xl border border-white/5 text-center">
            Equivalent Mass (E) = Molar Mass (M) / n-factor
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-2 text-[12.5px]">
            <span className="text-emerald-400 font-bold block">Key Quantitative Formulas</span>
            <ul className="space-y-2 text-white/60">
              <li>• <strong className="text-white">Number of Equivalents:</strong> Moles × n-factor = Weight / Equivalent Mass.</li>
              <li>• <strong className="text-white">Normality (N):</strong> Molarity (M) × n-factor.</li>
              <li>• <strong className="text-white">Law of Equivalence:</strong> During any chemical reaction, substances react in the ratio of their chemical equivalents:
                <div className="font-mono text-emerald-300 text-center bg-black/40 p-2 rounded mt-1.5">
                  Equivalents of Oxidizing Agent = Equivalents of Reducing Agent<br />
                  N₁V₁ = N₂V₂
                </div>
              </li>
            </ul>
          </div>

          <ProTip>
            The n-factor is not a fixed property of a substance. It depends on the specific reaction, medium, and the number of atoms undergoing a change in oxidation state per formula unit. Always calculate it dynamically!
          </ProTip>
        </div>
      </Collapsible>

      {/* ── SECTION 8: Important Reagents ────────────────── */}
      <Collapsible title="8 · Key Oxidizing Agents: KMnO₄ & K₂Cr₂O₇ Chemistry" icon={<Star className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Two primary inorganic reagents are highly favored in advanced quantitative redox analysis. Their behaviors are highly dependent on the solution environment:</p>

          <SectionBanner label="Potassium Permanganate (KMnO₄)" color="amber" />
          <ul className="space-y-2 text-[12.5px] text-white/70 list-disc list-inside">
            <li>• <strong className="text-white">Acidic Medium:</strong> Reduced to Mn²⁺ (gain of 5 electrons). n-factor = <strong>5</strong>.
              <div className="font-mono text-cyan-300 text-[11px] bg-[#060814] p-2 rounded mt-1">
                MnO₄⁻ + 8H⁺ + 5e⁻ ➔ Mn²⁺ + 4H₂O
              </div>
            </li>
            <li>• <strong className="text-white">Neutral / Faintly Alkaline Medium:</strong> Reduced to MnO₂ precipitate (gain of 3 electrons). n-factor = <strong>3</strong>.
              <div className="font-mono text-cyan-300 text-[11px] bg-[#060814] p-2 rounded mt-1">
                MnO₄⁻ + 2H₂O + 3e⁻ ➔ MnO₂ + 4OH⁻
              </div>
            </li>
            <li>• <strong className="text-white">Strongly Alkaline Medium:</strong> Reduced to manganate ion MnO₄²⁻ (gain of 1 electron). n-factor = <strong>1</strong>.
              <div className="font-mono text-cyan-300 text-[11px] bg-[#060814] p-2 rounded mt-1">
                MnO₄⁻ + e⁻ ➔ MnO₄²⁻
              </div>
            </li>
          </ul>

          <div className="my-3">
            <KMnO4ColorTransitionDiagram />
          </div>

          <SectionBanner label="Potassium Dichromate (K₂Cr₂O₇)" color="amber" />
          <p>K₂Cr₂O₇ acts as a powerful oxidizing agent <strong>only in acidic media</strong>. It is reduced to green Cr³⁺ ions:</p>
          <div className="font-mono text-[13px] bg-[#060814] p-3 rounded-xl border border-white/5 text-center">
            Cr₂O₇²⁻ + 14H⁺ + 6e⁻ ➔ 2Cr³⁺ + 7H₂O
          </div>
          <p className="text-[12px] text-white/60">
            Each Chromium atom changes from +6 to +3 (loss/gain of 3 electrons). Since there are 2 Chromium atoms per formula unit of K₂Cr₂O₇, its n-factor is always <strong>6</strong> in acidic solutions.
          </p>
        </div>
      </Collapsible>

      {/* ── SECTION 9: H2O2 Dual Behavior ────────────────── */}
      <Collapsible title="9 · Dual Behavior of Hydrogen Peroxide (H₂O₂)" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>In H₂O₂, oxygen is in an intermediate oxidation state of <strong>−1</strong>. Because oxygen can be oxidized to 0 (in O₂) or reduced to −2 (in H₂O), H₂O₂ exhibits dual behavior, functioning as both an oxidizing and a reducing agent.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
              <span className="text-[12.5px] font-bold text-emerald-400 block uppercase tracking-wider">H₂O₂ as Oxidizing Agent</span>
              <p className="text-[12px] text-white/60">Oxygen is reduced from −1 to −2. n-factor = <strong>2</strong>.</p>
              <div className="font-mono text-[11px] text-cyan-300 bg-black/40 p-2 rounded">
                Acidic: H₂O₂ + 2H⁺ + 2e⁻ ➔ 2H₂O<br />
                Basic: H₂O₂ + 2e⁻ ➔ 2OH⁻
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-2">
              <span className="text-[12.5px] font-bold text-rose-400 block uppercase tracking-wider">H₂O₂ as Reducing Agent</span>
              <p className="text-[12px] text-white/60">Oxygen is oxidized from −1 to 0. n-factor = <strong>2</strong>.</p>
              <div className="font-mono text-[11px] text-rose-300 bg-black/40 p-2 rounded">
                Acidic: H₂O₂ ➔ O₂ + 2H⁺ + 2e⁻<br />
                Basic: H₂O₂ + 2OH⁻ ➔ O₂ + 2H₂O + 2e⁻
              </div>
            </div>
          </div>

          <ProTip>
            Whether functioning as an oxidizing or reducing agent, the n-factor of H₂O₂ is always <strong>2</strong>. Thus, its equivalent mass is always its molecular mass divided by 2 (34 / 2 = 17 g/eq).
          </ProTip>
        </div>
      </Collapsible>

      {/* ── SECTION 10: Electrochemistry ────────────────── */}
      <Collapsible title="10 · Connecting Redox to Electrochemical Cells" icon={<Atom className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Spontaneous chemical redox processes release energy that can be harvested as electrical current. This form of energy conversion is studied in electrochemical cells.</p>

          <div className="p-4 rounded-xl bg-[#090b18] border border-white/8 space-y-2 text-[12.5px]">
            <span className="text-cyan-300 font-bold block">Electrode Assignments in Cells</span>
            <ul className="space-y-2 text-white/60">
              <li>• <strong className="text-white">Anode:</strong> The electrode where <strong>oxidation</strong> takes place. In a galvanic cell, this is the negative terminal.</li>
              <li>• <strong className="text-white">Cathode:</strong> The electrode where <strong>reduction</strong> takes place. In a galvanic cell, this is the positive terminal.</li>
              <li>• <strong className="text-white">Salt Bridge:</strong> Maintains electrical neutrality by allowing ionic migration between half-cells, completing the electrical circuit.</li>
            </ul>
          </div>

          <TrapCard title="Spontaneity Rule">
            For any spontaneous cell reaction: the Gibbs free energy change must be negative (<code className="text-white font-mono">ΔG &lt; 0</code>), which requires the standard cell potential (<code className="text-white font-mono">E°cell</code>) to be <strong>positive</strong>.
          </TrapCard>
        </div>
      </Collapsible>

      {/* ── INTERACTIVE WIDGETS TABS ────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-b from-[#0b0f19] to-[#070912] overflow-hidden">
        <div className="border-b border-white/5 bg-white/2 p-2 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-5">
          {activeTab === 'nfactor' && <NFactorCalculator />}
          {activeTab === 'balancing' && <RedoxBalancingTrainer />}
        </div>
      </div>

      {/* ── SECTION 11: Solved Problems ────────────────── */}
      <Collapsible title="11 · Solved Advanced Numerical Problems" icon={<Sparkles className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] leading-relaxed">
          
          {/* Problem 1 */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">Problem 1: O.N. in Caro's Acid (H₂SO₅)</span>
            <p className="text-white/80">Calculate the oxidation number of sulfur in peroxomonosulfuric acid (Caro's acid, H₂SO₅).</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 text-[12.5px]">
              <p><strong>Step 1:</strong> Skeletal formula setup. H₂SO₅. If we use the simple sum rule: 2(+1) + x + 5(−2) = 0 ➔ x = +8.</p>
              <p><strong>Step 2:</strong> Evaluate limit. Sulfur is in Group 16, so its maximum possible oxidation state is its valence electron count: +6. A value of +8 is physically impossible.</p>
              <p><strong>Step 3:</strong> Structure analysis. H₂SO₅ contains one peroxide linkage (<code className="text-cyan-300 font-mono">−O−O−</code>). The structure is: <code className="text-cyan-300 font-mono">HO−SO₂−O−O−H</code>.</p>
              <p><strong>Step 4:</strong> Re-calculate. There are 3 oxide-like oxygens (O.N. = −2) and 2 peroxide-like oxygens (O.N. = −1).
                <br />2(+1) + x + 3(−2) + 2(−1) = 0 ➔ 2 + x − 6 − 2 = 0 ➔ x = +6.
              </p>
              <p className="text-emerald-400 font-bold font-mono">Answer: Oxidation State of Sulfur = +6</p>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">Problem 2: Equivalent Weight of Na₂S₂O₃</span>
            <p className="text-white/80">Find the equivalent mass of Na₂S₂O₃ in terms of its molecular mass M when it reacts with I₂ to form tetrathionate.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 text-[12.5px]">
              <p><strong>Step 1:</strong> Write the reaction scheme: <code className="text-cyan-300 font-mono">2Na₂S₂O₃ + I₂ ➔ Na₂S₄O₆ + 2NaI</code>.</p>
              <p><strong>Step 2:</strong> Ionic representation: <code className="text-cyan-300 font-mono">2S₂O₃²⁻ + I₂ ➔ S₄O₆²⁻ + 2I⁻</code>.</p>
              <p><strong>Step 3:</strong> Calculate oxidation states. In S₂O₃²⁻, S is +2. In S₄O₆²⁻, average S is +2.5. The change in O.N. = 2.5 − 2.0 = 0.5 per sulfur atom.</p>
              <p><strong>Step 4:</strong> Find n-factor. Since one formula unit of Na₂S₂O₃ contains 2 sulfur atoms, the total change per formula unit is: 2 × 0.5 = 1 electron.</p>
              <p><strong>Step 5:</strong> Equivalent Mass formula: E = M / n-factor = M / 1 = M.</p>
              <p className="text-emerald-400 font-bold font-mono">Answer: Equivalent Mass = M</p>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">Problem 3: n-factor of FeS₂ in acidic combustion</span>
            <p className="text-white/80">Calculate the n-factor of FeS₂ when it is oxidized completely to Fe₂O₃ and SO₂.</p>
            <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 text-[12.5px]">
              <p><strong>Step 1:</strong> Starting states: In FeS₂ (iron pyrite), Fe is in the +2 state and sulfur is present as disulfide S₂²⁻ (average O.N. of S = −1).</p>
              <p><strong>Step 2:</strong> Product states: Fe is oxidized to Fe³⁺ (in Fe₂O₃), and S is oxidized to S⁴⁺ (in SO₂).</p>
              <p><strong>Step 3:</strong> Change in O.N.:
                <br />− For Fe: +2 ➔ +3 (change of 1 per Fe atom).
                <br />− For S: −1 ➔ +4 (change of 5 per S atom). Since there are 2 sulfur atoms in FeS₂, the total change is 2 × 5 = 10.
              </p>
              <p><strong>Step 4:</strong> Combine changes: Total n-factor = Change of Fe + Change of S = 1 + 10 = 11.</p>
              <p className="text-emerald-400 font-bold font-mono">Answer: n-factor of FeS₂ = 11</p>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ── SECTION 12: Common Mistakes ────────────────── */}
      <Collapsible title="12 · Common Mistakes & Traps" icon={<AlertCircle className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-3">
          <TrapCard title="OA/RA Confusion">
            Always remember: the <strong>Oxidizing Agent</strong> gains electrons and gets <strong>Reduced</strong> itself. The <strong>Reducing Agent</strong> loses electrons and gets <strong>Oxidized</strong> itself.
          </TrapCard>
          <TrapCard title="Symmetrical Hydrogen O.N.">
            Do not assume hydrogen is always +1. In metallic hydrides (such as LiH, NaH, CaH₂), hydrogen is strongly electronegative relative to the metal, and thus takes on an O.N. of <strong>−1</strong>.
          </TrapCard>
          <TrapCard title="Oxide vs Peroxide sum rule errors">
            In structures containing peroxides (e.g. H₂O₂ or CrO₅), the oxygen atoms are not all −2. Check the skeletal molecular structure first to avoid getting invalid oxidation states (e.g. S = +8 or Cr = +10).
          </TrapCard>
          <TrapCard title="Unbalanced Spectator Ions">
            Ensure you cancel spectator ions (ions that appear unchanged on both sides, e.g. Na⁺ or K⁺) before balancing net ionic equations. Adding them back incorrectly can create mass imbalance.
          </TrapCard>
        </div>
      </Collapsible>

      {/* ── SECTION 13: Exam Focus Points ────────────────── */}
      <Collapsible title="13 · IAT Exam Focus Points & Checklist" icon={<Star className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/15">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Know the oxidation state exceptions for oxygen (OF₂ = +2, O₂F₂ = +1, KO₂ = −1/2, H₂O₂ = −1).",
              "Be ready to balance equations in basic media by neutralizing H⁺ with OH⁻ to form H₂O.",
              "Recall the KMnO₄ n-factors: 5 (acidic), 3 (neutral/weakly alkaline), 1 (strongly alkaline).",
              "K₂Cr₂O₂ has n-factor = 6 in acidic media; it acts as an oxidizing agent only in acidic environments.",
              "Average oxidation states can be fractional (e.g., C₃O₂ = +4/3, Fe₃O₄ = +8/3, S₄O₆²⁻ = +2.5).",
              "Equivalent weight E = M / n-factor. Normality = Molarity × n-factor."
            ].map((s, i) => (
              <div key={i} className="flex gap-2 text-[12.5px] text-white/70">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ── NAVIGATOR ──────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <button
          onClick={() => onNavigate?.('prev')}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[12px] font-bold border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all"
        >
          ◀ Previous Lesson
        </button>
        <span className="text-[12px] text-white/40">Redox Reactions · Unit 8</span>
        <button
          onClick={() => onNavigate?.('next')}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl text-[12px] font-bold bg-white text-black hover:bg-white/90 transition-all"
        >
          Next Lesson ▶
        </button>
      </div>

    </div>
  );
}
