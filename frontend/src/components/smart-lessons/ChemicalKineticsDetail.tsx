import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Sliders
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

interface ChemicalKineticsDetailProps {
  progress?: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

export default function ChemicalKineticsDetail({ progress, isCompleted, onNavigate }: ChemicalKineticsDetailProps) {
  // --- Simulator 1: Initial Rates Order Solver ---
  const [targetOrderA, setTargetOrderA] = useState<number>(2);
  const [targetOrderB, setTargetOrderB] = useState<number>(1);
  const [targetK, setTargetK] = useState<number>(0.15);
  
  const [experiments, setExperiments] = useState<Array<{ id: number; concA: number; concB: number; rate: number }>>([
    { id: 1, concA: 0.10, concB: 0.10, rate: 0.15 * Math.pow(0.10, 2) * 0.10 },
    { id: 2, concA: 0.20, concB: 0.10, rate: 0.15 * Math.pow(0.20, 2) * 0.10 },
    { id: 3, concA: 0.10, concB: 0.20, rate: 0.15 * Math.pow(0.10, 2) * 0.20 }
  ]);

  const [guessA, setGuessA] = useState<string>('');
  const [guessB, setGuessB] = useState<string>('');
  const [guessK, setGuessK] = useState<string>('');
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [solverResult, setSolverResult] = useState<{ status: 'idle' | 'success' | 'fail'; message: string }>({ status: 'idle', message: '' });

  const handleGenerateSystem = () => {
    const orders = [0, 1, 2];
    const newA = orders[Math.floor(Math.random() * orders.length)];
    const newB = orders[Math.floor(Math.random() * orders.length)];
    const newK = parseFloat((Math.random() * 0.4 + 0.05).toFixed(3)); // 0.05 to 0.45
    
    setTargetOrderA(newA);
    setTargetOrderB(newB);
    setTargetK(newK);

    const exp1 = { id: 1, concA: 0.1, concB: 0.1, rate: parseFloat((newK * Math.pow(0.1, newA) * Math.pow(0.1, newB)).toExponential(4)) };
    const exp2 = { id: 2, concA: 0.2, concB: 0.1, rate: parseFloat((newK * Math.pow(0.2, newA) * Math.pow(0.1, newB)).toExponential(4)) };
    const exp3 = { id: 3, concA: 0.1, concB: 0.2, rate: parseFloat((newK * Math.pow(0.1, newA) * Math.pow(0.2, newB)).toExponential(4)) };

    setExperiments([
      { id: 1, concA: exp1.concA, concB: exp1.concB, rate: exp1.rate },
      { id: 2, concA: exp2.concA, concB: exp2.concB, rate: exp2.rate },
      { id: 3, concA: exp3.concA, concB: exp3.concB, rate: exp3.rate }
    ]);

    setGuessA('');
    setGuessB('');
    setGuessK('');
    setShowSolution(false);
    setSolverResult({ status: 'idle', message: '' });
  };

  const handleCheckGuess = () => {
    const gA = parseInt(guessA);
    const gB = parseInt(guessB);
    const gK = parseFloat(guessK);

    if (isNaN(gA) || isNaN(gB) || isNaN(gK)) {
      setSolverResult({ status: 'fail', message: 'Please enter valid numerical answers for orders and rate constant.' });
      return;
    }

    const kDiff = Math.abs(gK - targetK) / targetK;
    if (gA === targetOrderA && gB === targetOrderB && kDiff < 0.05) {
      setSolverResult({ 
        status: 'success', 
        message: `Correct! Order wrt A = ${targetOrderA}, B = ${targetOrderB}, and k ≈ ${targetK} mol¹⁻ⁿ Lⁿ⁻¹ s⁻¹.` 
      });
    } else {
      setSolverResult({ 
        status: 'fail', 
        message: 'Incorrect guesses. Look closely at how the rates change when you double the concentrations.' 
      });
    }
  };

  // --- Simulator 2: Arrhenius Coordinate & Catalyst Simulator ---
  const [ea, setEa] = useState<number>(55); // kJ/mol
  const [temp, setTemp] = useState<number>(300); // Kelvin
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const R_const = 8.314; // J/(mol*K)

  const activeEa = hasCatalyst ? Math.max(ea - 20, 15) : ea;
  const factor = Math.exp(-(activeEa * 1000) / (R_const * temp));
  const preExponentialA = 1e8; // hypothetical
  const kRate = preExponentialA * factor;

  // Reactant & Product potentials for coordinate SVG graph
  const reactantE = 40;
  const productE = 15; // Exothermic by 25 kJ/mol
  const peakE = reactantE + activeEa;

  // Render SVG Path dynamically
  const svgPath = `
    M 20,${150 - reactantE} 
    C 70,${150 - reactantE} 90,${150 - peakE} 120,${150 - peakE} 
    C 150,${150 - peakE} 170,${150 - productE} 220,${150 - productE}
  `;

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-3 pb-12 select-text text-white">
      
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0b0f1e] via-[#0d1220] to-[#0b0f1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-rose-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="cyan">Chemistry</Tag>
            <Tag color="amber">Unit 11</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="pink">High Weightage</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Chemical <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">Kinetics</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Master the core principles of reaction rates, stoichiometry normalized rate relations, experimental rate laws, integrated rate equations, pseudo-first-order reactions, Kelvin-scaled Arrhenius activation barriers, and transition state collision theory.
          </p>
        </div>
      </div>

      {/* ── SECTION 1: CORE CONCEPTS & THERMO VS KINETICS ───────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            1. Core Concept & Spontaneity Boundaries
          </h2>
          <SectionBanner label="Introduction" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Chemical kinetics studies the speed of chemical reactions. While thermodynamics tells us if a reaction will occur (spontaneity governed by &Delta;G &lt; 0), kinetics tells us <strong>how fast</strong> it happens and <strong>by what mechanism</strong> it occurs.
          </p>

          <WarningCard title="The Spontaneity vs. Speed Boundary Trap">
            Thermodynamics predicts whether a process is spontaneous under specified conditions, whereas kinetics determines its rate. A reaction can be highly spontaneous (&Delta;G &ll; 0) yet kinetically inert.
            <p className="text-white/60 text-xs mt-1">
              <strong>Example:</strong> The conversion of diamond to graphite is thermodynamically favorable under ordinary conditions (&Delta;G &lt; 0), but it does not occur traceably because the activation energy barrier is extremely high. Thus, its kinetics are extremely slow.
            </p>
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 2: RATES OF REACTION ────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            2. Reaction Rates: Average, Instantaneous & Stoichiometry
          </h2>
          <SectionBanner label="Rates" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Average Rate</span>
              <p className="text-xs text-white/70">
                The change in concentration of a reactant or product over a finite time interval (&Delta;t):
              </p>
              <div className="p-3 bg-black/45 rounded-xl font-mono text-center text-xs text-amber-200">
                <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <span>Avg Rate = &minus;</span>
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">&Delta;[A]</span>
                      <span className="px-1 pt-0.5">&Delta;t</span>
                    </div>
                    <span className="mx-1.5">= +</span>
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">&Delta;[P]</span>
                      <span className="px-1 pt-0.5">&Delta;t</span>
                    </div>
                  </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">Instantaneous Rate</span>
              <p className="text-xs text-white/70">
                The rate of concentration change at a specific instant (when time interval &Delta;t &rarr; 0):
              </p>
              <div className="p-3 bg-black/45 rounded-xl font-mono text-center text-xs text-amber-200">
                <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <span>Instantaneous Rate = &minus;</span>
                    <div className="flex flex-col items-center">
                      <span className="px-1.5 border-b border-white/20 pb-0.5">d[A]</span>
                      <span className="px-1.5 pt-0.5">dt</span>
                    </div>
                    <span className="mx-1.5">= +</span>
                    <div className="flex flex-col items-center">
                      <span className="px-1.5 border-b border-white/20 pb-0.5">d[P]</span>
                      <span className="px-1.5 pt-0.5">dt</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Stoichiometric Rate Expression:</h3>
          <p>
            For a general reaction:
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm font-mono text-cyan-300">
            aA + bB &rarr; cC + dD
          </div>
          <p>
            The rates of consumption of reactants and formation of products must be normalized by dividing them by their respective stoichiometric coefficients:
          </p>
          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs sm:text-sm font-mono text-emerald-300">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold py-1">
              <span>Rate of Reaction = &minus;</span>
              <div className="flex flex-col items-center">
                <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                <span className="px-1 pt-0.5">a</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-1.5 border-b border-white/20 pb-0.5">d[A]</span>
                <span className="px-1.5 pt-0.5">dt</span>
              </div>
              <span>= &minus;</span>
              <div className="flex flex-col items-center">
                <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                <span className="px-1 pt-0.5">b</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-1.5 border-b border-white/20 pb-0.5">d[B]</span>
                <span className="px-1.5 pt-0.5">dt</span>
              </div>
              <span>= +</span>
              <div className="flex flex-col items-center">
                <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                <span className="px-1 pt-0.5">c</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-1.5 border-b border-white/20 pb-0.5">d[C]</span>
                <span className="px-1.5 pt-0.5">dt</span>
              </div>
              <span>= +</span>
              <div className="flex flex-col items-center">
                <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                <span className="px-1 pt-0.5">d</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-1.5 border-b border-white/20 pb-0.5">d[D]</span>
                <span className="px-1.5 pt-0.5">dt</span>
              </div>
            </div>
          </div>

          <ProTip>
            <strong>Units of Reaction Rate:</strong><br />
            Reaction rate has units of <strong>concentration/time</strong>, typically <strong>mol L⁻¹ s⁻¹</strong> (or <strong>M s⁻¹</strong>). Unlike the rate constant, the unit of reaction rate <strong>never depends on the reaction order</strong> when expressed as concentration change per unit time.
          </ProTip>
        </div>
      </div>

      {/* ── SECTION 3: FACTORS INFLUENCING REACTION RATES ─────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-400" />
            3. Factors Influencing Reaction Rates (The 6-Factor Pillar)
          </h2>
          <SectionBanner label="Influencing Factors" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            The speed at which reactants turn into products is highly dependent on experimental and chemical factors. Under the IAT syllabus, there are six main influencing factors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-rose-400 block uppercase">1. Concentration of Reactants</span>
              <p className="text-xs text-white/70">
                Increasing concentration increases the number of particles per unit volume, which increases the <strong>collision frequency</strong> of reacting molecules. Under the rate law, rate is directly proportional to concentration raised to the partial order exponent (except for zero-order reactions).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 block uppercase">2. Temperature of the System</span>
              <p className="text-xs text-white/70">
                An increase in temperature increases the average kinetic energy of the reactants, resulting in a higher fraction possessing energy &ge; E<sub>a</sub>.
                <br /><strong>Van't Hoff Rule:</strong> For most reactions, the rate of reaction approximately <strong>doubles or triples</strong> for every 10°C rise in temperature.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block uppercase">3. Reactant Surface Area</span>
              <p className="text-xs text-white/70">
                For heterogeneous reactions (reactions involving a solid and a gas/liquid), increasing the surface area by finely grinding or powdering the solid exposes more active sites to collisions.
                <br /><strong>Example:</strong> Powdered CaCO₃ dissolves in HCl exponentially faster than solid marble chips.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">4. Nature of Reactants</span>
              <p className="text-xs text-white/70">
                - <strong>Ionic vs. Covalent:</strong> Ionic reactions (e.g., precipitation of AgCl) involve simple attraction of ions, requiring zero bond-breaking, and are near-instantaneous. Covalent reactions require energy to break bonds, making them slower.
                <br />- <strong>Bond Strength:</strong> {"Weaker reactant chemical bonds yield faster reaction speeds (e.g., Oxidation of NO is fast, while oxidation of CO is slow due to the extremely strong C≡O triple bond)."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-violet-400 block uppercase">5. Pressure & Volume (For Gases)</span>
              <p className="text-xs text-white/70">
                Increasing the pressure (or compressing the volume) of gaseous reactants increases their concentration (particles per unit volume), directly boosting collision frequency and acceleration rate.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-pink-400 block uppercase">6. Radiation / Photochemical Light</span>
              <p className="text-xs text-white/70">
                Some reactions (photochemical reactions) occur only in the presence of light photons (h&nu;) which supply the necessary energy to cross activation barriers.
                <br /><strong>Example:</strong> Gaseous synthesis H<sub>2</sub> + Cl<sub>2</sub> &rarr; 2HCl (under light photons h&nu;) is zero-order because the rate is independent of concentrations but varies with light intensity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: THE RATE LAW & ORDER OF REACTION ──────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            4. Rate Law & Order vs. Molecularity
          </h2>
          <SectionBanner label="Order & Molecularity" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            The <strong>Rate Law</strong> is an mathematical expression that relates the rate of a reaction to the concentration of reactants.
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm font-mono text-violet-300">
            Rate = k [A]<sup>x</sup> [B]<sup>y</sup>
          </div>
          <p>
            Where <strong>k</strong> is the rate constant, and <strong>x</strong> and <strong>y</strong> represent the partial orders with respect to A and B.
          </p>

          <WarningCard title="The Stoichiometry Stopper Warning">
            The partial orders <strong>x</strong> and <strong>y</strong> cannot be predicted merely by looking at the coefficients <strong>a</strong> and <strong>b</strong> of the overall balanced equation. They <strong>must be determined experimentally</strong>. The exception is an elementary reaction (occurring in a single step) where the rate law exponents match the stoichiometric coefficients directly.
          </WarningCard>

          <h3 className="text-sm font-bold text-white pt-2">Comparison: Order vs. Molecularity</h3>
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2.5">Feature</th>
                  <th className="p-2.5">Order of Reaction</th>
                  <th className="p-2.5">Molecularity of Reaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2.5 font-bold text-white">Definition</td>
                  <td className="p-2.5">Sum of exponents of concentrations in the rate law.</td>
                  <td className="p-2.5">Number of reactant species colliding simultaneously in an elementary step.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">Determination</td>
                  <td className="p-2.5 text-emerald-400">Experimental.</td>
                  <td className="p-2.5 text-cyan-400">Theoretical.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">Allowable Values</td>
                  <td className="p-2.5">Can be zero, integer, or fractional.</td>
                  <td className="p-2.5">Always a positive integer (1, 2, rarely 3). Cannot be zero or fractional.</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-white">Complex Reactions</td>
                  <td className="p-2.5">Has meaning for the overall complex reaction.</td>
                  <td className="p-2.5">Has no meaning for the overall complex reaction; applies only to elementary steps.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2 mt-3">
            <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider">Molecularity Examples & Limits:</h4>
            <ul className="list-disc pl-5 space-y-1 text-xs text-white/70">
              <li><strong>Unimolecular (Molecularity = 1):</strong> Only one reactant molecule undergoes decomposition.
                <br /><span className="font-mono text-cyan-300">NH₄NO₂ ➔ N₂ + 2H₂O</span>
              </li>
              <li><strong>Bimolecular (Molecularity = 2):</strong> Two reactant molecules collide simultaneously.
                <br /><span className="font-mono text-cyan-300">2HI ➔ H₂ + I₂</span> or <span className="font-mono text-cyan-300">NO + O₃ ➔ NO₂ + O₂</span>
              </li>
              <li><strong>Termolecular (Molecularity = 3):</strong> Three reactant species collide simultaneously. Extremely rare because the probability of three particles colliding at the exact same point in space and time with proper orientation is very low.
                <br /><span className="font-mono text-cyan-300">2NO + O₂ ➔ 2NO₂</span>
              </li>
              <li><strong>Why molecularity cannot be zero:</strong> A reaction cannot occur with zero reactant molecules colliding.</li>
              <li><strong>Why molecularity cannot be fractional:</strong> Half or quarter molecules cannot participate in collisions in their standard molecular identity.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: LAB 1 - ORDER SOLVER (INITIAL RATES METHOD) ──────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            5. Interactive Lab 1: Initial Rates Order Solver
          </h2>
          <SectionBanner label="Lab Simulator" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Learn how to extract orders by analyzing rates. The simulator generated a random reaction mechanism with unknown order exponents for A and B. Review the experimental logs and deduce the orders!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 p-4.5 rounded-2xl">
            {/* Table of experiments */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">Experimental Logs (A + B ➔ Products)</span>
                <button 
                  onClick={handleGenerateSystem}
                  className="flex items-center gap-1 text-[11px] text-white/60 bg-white/5 hover:bg-white/10 hover:text-white px-2.5 py-1 rounded transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Generate New System
                </button>
              </div>

              <div className="overflow-x-auto border border-white/5 rounded-xl">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                      <th className="p-2">Run</th>
                      <th className="p-2">[A]₀ (mol/L)</th>
                      <th className="p-2">[B]₀ (mol/L)</th>
                      <th className="p-2">Initial Rate (M/s)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {experiments.map((exp) => (
                      <tr key={exp.id}>
                        <td className="p-2 text-white font-bold">{exp.id}</td>
                        <td className="p-2 text-cyan-300">{exp.concA.toFixed(2)}</td>
                        <td className="p-2 text-violet-300">{exp.concB.toFixed(2)}</td>
                        <td className="p-2 text-emerald-300 font-bold">{exp.rate.toExponential(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inputs & Solve Panel */}
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">Solve the Rate Law</span>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Order wrt A (x)</label>
                  <input 
                    type="number" 
                    value={guessA} 
                    onChange={(e) => setGuessA(e.target.value)}
                    placeholder="e.g. 1" 
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Order wrt B (y)</label>
                  <input 
                    type="number" 
                    value={guessB} 
                    onChange={(e) => setGuessB(e.target.value)}
                    placeholder="e.g. 0" 
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-white/50 block mb-1">Rate Constant k</label>
                  <input 
                    type="number" 
                    step="0.001"
                    value={guessK} 
                    onChange={(e) => setGuessK(e.target.value)}
                    placeholder="e.g. 0.15" 
                    className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handleCheckGuess}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition"
                >
                  Verify Guess
                </button>
                <button 
                  onClick={() => setShowSolution(true)}
                  className="bg-white/5 hover:bg-white/10 text-white font-semibold py-2 px-4 rounded-xl text-xs transition"
                >
                  Show Calculations
                </button>
              </div>

              {solverResult.status !== 'idle' && (
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed font-mono ${
                  solverResult.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                }`}>
                  {solverResult.message}
                </div>
              )}

              {showSolution && (
                <div className="p-3 bg-black/35 rounded-xl font-mono text-xs text-white/70 space-y-1 leading-relaxed border border-white/5 max-h-[140px] overflow-y-auto">
                  <div className="font-bold text-white mb-1">Deduction Math:</div>
                  <div>1. Comparing Run 1 and 2: [B] is constant. [A] doubles (0.1 ➔ 0.2).</div>
                  <div>   Rate ratio = Rate2 / Rate1 = {experiments[1].rate.toExponential(2)} / {experiments[0].rate.toExponential(2)} = {Math.pow(2, targetOrderA).toFixed(1)}.</div>
                  <div>   So, 2^x = {Math.pow(2, targetOrderA).toFixed(0)} ➔ <strong>x = {targetOrderA}</strong></div>
                  <div>2. Comparing Run 1 and 3: [A] is constant. [B] doubles (0.1 ➔ 0.2).</div>
                  <div>   Rate ratio = Rate3 / Rate1 = {experiments[2].rate.toExponential(2)} / {experiments[0].rate.toExponential(2)} = {Math.pow(2, targetOrderB).toFixed(1)}.</div>
                  <div>   So, 2^y = {Math.pow(2, targetOrderB).toFixed(0)} ➔ <strong>y = {targetOrderB}</strong></div>
                  <div>3. Rate Constant: k = Rate / ([A]^x * [B]^y) = {experiments[0].rate.toExponential(3)} / ({0.1}^{targetOrderA} * {0.1}^{targetOrderB}) = <strong>{targetK.toFixed(3)}</strong>.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: INTEGRATED RATE EQUATIONS ────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            6. Integrated Rate Equations & Order Identification
          </h2>
          <SectionBanner label="Math of Kinetics" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Integrated rate laws express the concentration of reactants as a function of time. Here is the formal mathematical breakdown of Zero, First, and Second-order kinetics:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Zero Order */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <Tag color="cyan">Zero-Order</Tag>
              <div className="space-y-2 text-xs">
                <p>Reaction Rate is independent of concentrations.</p>
                <div className="p-3 bg-black/45 rounded-xl text-cyan-200">
                  <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <span className="mr-1.5">k =</span>
                    <div className="flex flex-col items-center">
                      <span className="px-2 border-b border-white/20 pb-0.5">[A]<sub>0</sub> &minus; [A]<sub>t</sub></span>
                      <span className="px-2 pt-0.5">t</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-black/45 rounded-xl text-cyan-200">
                  <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <span className="mr-1.5">t<sub>1/2</sub> =</span>
                    <div className="flex flex-col items-center">
                      <span className="px-2 border-b border-white/20 pb-0.5">[A]<sub>0</sub></span>
                      <span className="px-2 pt-0.5">2k</span>
                    </div>
                  </div>
                </div>
                <ul className="list-disc pl-4 text-white/60 space-y-1 text-[11px]">
                  <li><strong>Graph:</strong> Plot [A] vs t yields a straight line with slope = &minus;k, intercept = [A]<sub>0</sub>.</li>
                  <li><strong>Examples:</strong> Photochemical reactions (like H<sub>2</sub> + Cl<sub>2</sub> &rarr; 2HCl) over catalyst surfaces saturated with reactants.</li>
                </ul>
              </div>
            </div>

            {/* First Order */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <Tag color="violet">First-Order</Tag>
              <div className="space-y-2 text-xs">
                <p>Reaction Rate is proportional to concentration of one reactant.</p>
                <div className="p-3 bg-black/45 rounded-xl text-violet-200">
                  <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <span className="mr-1.5">k =</span>
                    <div className="flex flex-col items-center">
                      <span className="px-2 border-b border-white/20 pb-0.5">2.303</span>
                      <span className="px-2 pt-0.5">t</span>
                    </div>
                    <span className="ml-1.5">log</span>
                    <div className="flex flex-col items-center ml-1">
                      <span className="px-1 border-b border-white/20 pb-0.5">[A]<sub>0</sub></span>
                      <span className="px-1 pt-0.5">[A]<sub>t</sub></span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-black/45 rounded-xl text-violet-200">
                  <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <span className="mr-1.5">t<sub>1/2</sub> =</span>
                    <div className="flex flex-col items-center">
                      <span className="px-2 border-b border-white/20 pb-0.5">0.693</span>
                      <span className="px-2 pt-0.5">k</span>
                    </div>
                  </div>
                </div>
                <ul className="list-disc pl-4 text-white/60 space-y-1 text-[11px]">
                  <li><strong>Graph:</strong> Plot ln[A] vs t has slope = &minus;k. Plot log[A] vs t has slope = &minus;k / 2.303.</li>
                  <li><strong>Radiochemistry:</strong> Radioactive decay follows first-order kinetics: N = N<sub>0</sub> &middot; e<sup>&minus;kt</sup> where t<sub>1/2</sub> = 0.693 / k.</li>
                </ul>
              </div>
            </div>

            {/* Second Order */}
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
              <Tag color="rose">Second-Order</Tag>
              <div className="space-y-2 text-xs">
                <p>Specifically for reactions governed by Rate = k[A]²:</p>
                <div className="p-3 bg-black/45 rounded-xl text-rose-200">
                  <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <div className="flex flex-col items-center">
                      <span className="px-1.5 border-b border-white/20 pb-0.5">1</span>
                      <span className="px-1.5 pt-0.5">[A]<sub>t</sub></span>
                    </div>
                    <span className="mx-2">=</span>
                    <div className="flex flex-col items-center">
                      <span className="px-1.5 border-b border-white/20 pb-0.5">1</span>
                      <span className="px-1.5 pt-0.5">[A]<sub>0</sub></span>
                    </div>
                    <span className="ml-2">+ k &middot; t</span>
                  </div>
                </div>
                <div className="p-3 bg-black/45 rounded-xl text-rose-200">
                  <div className="flex items-center justify-center text-xs sm:text-sm font-semibold py-1">
                    <span className="mr-1.5">t<sub>1/2</sub> =</span>
                    <div className="flex flex-col items-center">
                      <span className="px-2 border-b border-white/20 pb-0.5">1</span>
                      <span className="px-2 pt-0.5">k &middot; [A]<sub>0</sub></span>
                    </div>
                  </div>
                </div>
                <ul className="list-disc pl-4 text-white/60 space-y-1 text-[11px]">
                  <li><strong>Graph:</strong> Plot 1/[A] vs t yields a straight line with slope = +k, intercept = 1 / [A]<sub>0</sub>.</li>
                  <li><strong>Dependence:</strong> Half-life is inversely proportional to the initial concentration.</li>
                </ul>
              </div>
            </div>
          </div>

          <ProTip>
            <strong>General Half-Life Dependency (n-th Order):</strong><br />
            For a single-reactant reaction obeying Rate = k[A]<sup>n</sup> (with n &ne; 1), the half-life depends on initial concentration as:
            <div className="my-1.5 p-3 bg-black/35 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold flex items-center justify-center gap-1.5">
              <span>t<sub>1/2</sub> &prop;</span>
              <div className="flex flex-col items-center">
                <span className="px-2 border-b border-white/20 pb-0.5">1</span>
                <span className="px-2 pt-0.5">[A]<sub>0</sub><sup>n&minus;1</sup></span>
              </div>
            </div>
            <strong>Order Identification Shortcuts:</strong><br />
            - t<sub>1/2</sub> &prop; [A]<sub>0</sub> &rArr; Zero Order<br />
            - t<sub>1/2</sub> is independent of [A]<sub>0</sub> &rArr; First Order<br />
            - t<sub>1/2</sub> &prop; 1 / [A]<sub>0</sub> &rArr; Second Order
          </ProTip>

          <h3 className="text-sm font-bold text-white pt-2">Units of Rate Constant (k):</h3>
          <p>
            The units of the rate constant change with the overall order of reaction <strong>n</strong>:
          </p>
          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-emerald-300 font-semibold">
            Units of k = (mol L<sup>&minus;1</sup>)<sup>1&minus;n</sup> s<sup>&minus;1</sup>
          </div>
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2">Order</th>
                  <th className="p-2">Units of k</th>
                  <th className="p-2">Exam Shortcut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2 font-bold text-white">0 (Zero)</td>
                  <td className="p-2">mol L⁻¹ s⁻¹</td>
                  <td className="p-2">Units match reaction rate unit</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-white">1 (First)</td>
                  <td className="p-2 text-violet-400">s⁻¹ (or min⁻¹)</td>
                  <td className="p-2">Time units only, completely concentration-independent</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-white">2 (Second)</td>
                  <td className="p-2">L mol⁻¹ s⁻¹</td>
                  <td className="p-2">Concentration term inverted</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-white">3 (Third)</td>
                  <td className="p-2">L² mol⁻² s⁻¹</td>
                  <td className="p-2">Concentration term squared and inverted</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-bold text-white pt-4">Concentration vs. Time Graphs:</h3>
          <p>
            Visualizing how concentration [A] changes over time is a fast way to identify the reaction order on exams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-cyan-400 mb-2">Zero-Order: [A] vs. t</span>
              <svg className="w-full h-36" viewBox="0 0 200 120">
                <line x1="20" y1="10" x2="20" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="20" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="20" y1="20" x2="170" y2="90" stroke="#22d3ee" strokeWidth="2.5" />
                <text x="10" y="25" fill="rgba(255,255,255,0.6)" fontSize="8">[A]</text>
                <text x="175" y="108" fill="rgba(255,255,255,0.6)" fontSize="8">t</text>
                <text x="100" y="30" fill="#22d3ee" fontSize="8" fontWeight="bold">Slope = -k</text>
                <text x="25" y="15" fill="rgba(255,255,255,0.4)" fontSize="7">[A]₀</text>
              </svg>
            </div>
            
            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-violet-400 mb-2">First-Order: ln[A] vs. t</span>
              <svg className="w-full h-36" viewBox="0 0 200 120">
                <line x1="20" y1="10" x2="20" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="20" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="20" y1="20" x2="170" y2="90" stroke="#a78bfa" strokeWidth="2.5" />
                <text x="5" y="25" fill="rgba(255,255,255,0.6)" fontSize="8">ln[A]</text>
                <text x="175" y="108" fill="rgba(255,255,255,0.6)" fontSize="8">t</text>
                <text x="100" y="30" fill="#a78bfa" fontSize="8" fontWeight="bold">Slope = -k</text>
                <text x="25" y="15" fill="rgba(255,255,255,0.4)" fontSize="7">ln[A]₀</text>
              </svg>
            </div>

            <div className="p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col items-center">
              <span className="text-xs font-bold text-rose-400 mb-2">Second-Order: 1/[A] vs. t</span>
              <svg className="w-full h-36" viewBox="0 0 200 120">
                <line x1="20" y1="10" x2="20" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="20" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="20" y1="90" x2="170" y2="20" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="5" y="20" fill="rgba(255,255,255,0.6)" fontSize="8">1/[A]</text>
                <text x="175" y="108" fill="rgba(255,255,255,0.6)" fontSize="8">t</text>
                <text x="100" y="80" fill="#f43f5e" fontSize="8" fontWeight="bold">Slope = +k</text>
                <text x="25" y="98" fill="rgba(255,255,255,0.4)" fontSize="7">1/[A]₀</text>
              </svg>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-4">Methods to Determine Reaction Order:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">1. Graphical Method</span>
              <p className="text-xs text-white/70">
                Plot concentration variables against time. The plot that yields a straight line identifies the order:
                <br />- <strong>[A] vs t</strong> is linear &rArr; <strong>Zero Order</strong>
                <br />- <strong>ln[A] vs t</strong> is linear &rArr; <strong>First Order</strong>
                <br />- <strong>1/[A] vs t</strong> is linear &rArr; <strong>Second Order</strong>
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-violet-400 block uppercase">2. Half-Life Method</span>
              <p className="text-xs text-white/70">
                Determine the half-life t<sub>1/2</sub> at different initial concentrations [A]<sub>0</sub>:
                <br />- If t<sub>1/2</sub> &prop; [A]<sub>0</sub>, then <strong>Zero Order</strong>.
                <br />- If t<sub>1/2</sub> is independent of [A]<sub>0</sub>, then <strong>First Order</strong>.
                <br />- If t<sub>1/2</sub> &prop; 1 / [A]<sub>0</sub>, then <strong>Second Order</strong>.
                <br />- In general, t<sub>1/2</sub> &prop; 1 / [A]<sub>0</sub><sup>n&minus;1</sup> for n-th order.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-rose-400 block uppercase">3. Initial Rates Method</span>
              <p className="text-xs text-white/70">
                Vary the concentration of one reactant while keeping others constant, and measure initial rate. Compare rate changes mathematically (e.g., doubling concentration doubles rate &rArr; 1st order; quadruples rate &rArr; 2nd order).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 block uppercase">4. Ostwald's Isolation Method</span>
              <p className="text-xs text-white/70">
                Keep all reactants in massive excess except one. The concentration of the excess reactants remains virtually constant, so the rate law collapses to depend only on the isolated reactant, revealing its partial order.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 7: PSEUDO-FIRST ORDER & FRACTIONAL COMPLETION ───────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            7. Pseudo-First Order & First-Order shortcuts
          </h2>
          <SectionBanner label="Shortcuts" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <h3 className="text-sm font-bold text-white">Pseudo-First Order Reactions:</h3>
          <p>
            Reactions which are not truly first-order but behave as first-order due to one reactant (usually solvent water) being present in large excess.
          </p>
          <div className="p-3 bg-black/45 rounded-xl font-mono text-xs leading-relaxed space-y-1">
            <div>For: A + B ➔ Products, where B is water in huge excess.</div>
            <div>Rate = k [A] [B]</div>
            <div>Since [B] stays practically constant, we combine it with k:</div>
            <div>Rate = k' [A] &nbsp;&bull;&nbsp; where k' = k [B]</div>
          </div>
          <p className="text-white/60">
            <strong>Common examples:</strong> Acid-catalyzed hydrolysis of ethyl acetate (ester hydrolysis) and inversion of cane sugar.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">Fractional Completion Shortcuts (First-Order):</h3>
          <p>
            Avoid standard log calculations in simple multiple-choice questions by using fractional half-life ratios:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
            <div className="p-2.5 bg-black/45 rounded-xl border border-white/5">
              <div className="text-white font-bold text-[11px]">50% Completion</div>
              <div className="text-cyan-400 font-bold text-xs mt-1">1 &middot; t<sub>1/2</sub></div>
            </div>
            <div className="p-2.5 bg-black/45 rounded-xl border border-white/5">
              <div className="text-white font-bold text-[11px]">75% Completion</div>
              <div className="text-cyan-400 font-bold text-xs mt-1">2 &middot; t<sub>1/2</sub></div>
            </div>
            <div className="p-2.5 bg-black/45 rounded-xl border border-white/5">
              <div className="text-white font-bold text-[11px]">87.5% Completion</div>
              <div className="text-cyan-400 font-bold text-xs mt-1">3 &middot; t<sub>1/2</sub></div>
            </div>
            <div className="p-2.5 bg-black/45 rounded-xl border border-white/5">
              <div className="text-white font-bold text-[11px]">99.9% Completion</div>
              <div className="text-cyan-400 font-bold text-xs mt-1">&approx; 10 &middot; t<sub>1/2</sub></div>
            </div>
          </div>
          <div className="p-3.5 bg-black/45 rounded-xl text-cyan-200 font-semibold flex items-center justify-center gap-1.5 text-xs sm:text-sm">
            <div className="flex flex-col items-center">
              <span className="px-1.5 border-b border-white/20 pb-0.5">[A]<sub>t</sub></span>
              <span className="px-1.5 pt-0.5">[A]<sub>0</sub></span>
            </div>
            <span>=</span>
            <span className="text-[14px] font-light">(</span>
            <div className="flex flex-col items-center">
              <span className="px-1 border-b border-white/20 pb-0.5">1</span>
              <span className="px-1 pt-0.5">2</span>
            </div>
            <span className="text-[14px] font-light">)</span>
            <sup className="text-[10px] pl-0.5">t / t<sub>1/2</sub></sup>
          </div>
        </div>
      </div>

      {/* ── SECTION 8: TEMPERATURE DEPENDENCE (ARRHENIUS) ──────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-400" />
            8. Temperature Dependence & Activation Energy
          </h2>
          <SectionBanner label="Arrhenius Equation" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            The speed of a chemical reaction is highly sensitive to temperature. The relationship is expressed by the <strong>Arrhenius Equation</strong>:
          </p>
          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-rose-300 font-semibold">
            k = A &middot; e<sup>&minus;E<sub>a</sub> / (R &middot; T)</sup>
          </div>
          <p>
            Where <strong>A</strong> is the pre-exponential frequency factor, <strong>Ea</strong> is the activation energy in J/mol, <strong>R</strong> = 8.314 J/(mol K), and <strong>T</strong> is the absolute temperature in Kelvin.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">Logarithmic Forms for Graphing:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">Natural Log (ln) Form</span>
              <div className="p-3 bg-black/40 rounded-xl text-center text-xs sm:text-sm text-rose-300 font-semibold flex items-center justify-center gap-1.5">
                <span>ln k = ln A &minus;</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">E<sub>a</sub></span>
                  <span className="px-1 pt-0.5">R</span>
                </div>
                <span>&middot;</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                  <span className="px-1 pt-0.5">T</span>
                </div>
              </div>
              <p className="text-[11px] text-white/50 pt-1">
                A plot of <strong>ln k vs 1/T</strong> gives a straight line with <strong>slope = -Ea/R</strong> and intercept = <strong>ln A</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 block uppercase">Common Log (log₁₀) Form</span>
              <div className="p-3 bg-black/40 rounded-xl text-center text-xs sm:text-sm text-rose-300 font-semibold flex items-center justify-center gap-1.5">
                <span>log k = log A &minus;</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">E<sub>a</sub></span>
                  <span className="px-1 pt-0.5">2.303 &middot; R</span>
                </div>
                <span>&middot;</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                  <span className="px-1 pt-0.5">T</span>
                </div>
              </div>
              <p className="text-[11px] text-white/50 pt-1">
                A plot of <strong>log k vs 1/T</strong> gives a straight line with <strong>slope = -Ea/(2.303 R)</strong> and intercept = <strong>log A</strong>.
              </p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Two-Temperature Equation (to solve numericals):</h3>
          <p>
            To find the activation energy Ea without knowing A, measure the rate constants at two temperatures T₁ and T₂:
          </p>
          <div className="p-3.5 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-emerald-300 font-semibold flex flex-wrap items-center justify-center gap-2">
            <span>log</span>
            <div className="flex flex-col items-center">
              <span className="px-1.5 border-b border-white/20 pb-0.5">k<sub>2</sub></span>
              <span className="px-1.5 pt-0.5">k<sub>1</sub></span>
            </div>
            <span>=</span>
            <div className="flex flex-col items-center">
              <span className="px-1.5 border-b border-white/20 pb-0.5">E<sub>a</sub></span>
              <span className="px-1.5 pt-0.5">2.303 &middot; R</span>
            </div>
            <span className="text-[14px] font-light">(</span>
            <div className="flex flex-col items-center">
              <span className="px-1.5 border-b border-white/20 pb-0.5">T<sub>2</sub> &minus; T<sub>1</sub></span>
              <span className="px-1.5 pt-0.5">T<sub>1</sub> &middot; T<sub>2</sub></span>
            </div>
            <span className="text-[14px] font-light">)</span>
            <span>=</span>
            <div className="flex flex-col items-center">
              <span className="px-1.5 border-b border-white/20 pb-0.5">E<sub>a</sub></span>
              <span className="px-1.5 pt-0.5">2.303 &middot; R</span>
            </div>
            <span className="text-[14px] font-light">(</span>
            <div className="flex flex-col items-center">
              <span className="px-1.5 border-b border-white/20 pb-0.5">1</span>
              <span className="px-1.5 pt-0.5">T<sub>1</sub></span>
            </div>
            <span className="mx-1">&minus;</span>
            <div className="flex flex-col items-center">
              <span className="px-1.5 border-b border-white/20 pb-0.5">1</span>
              <span className="px-1.5 pt-0.5">T<sub>2</sub></span>
            </div>
            <span className="text-[14px] font-light">)</span>
          </div>

          <WarningCard title="The Kelvin Conversion Warning">
            In all Arrhenius calculations, temperature must always be converted to <strong>Kelvin</strong>. Failing to convert Celsius value to Kelvin will lead to entirely incorrect values.
          </WarningCard>

          <h3 className="text-sm font-bold text-white pt-4">Maxwell-Boltzmann Distribution & Temperature Activation:</h3>
          <p>
            The Maxwell-Boltzmann distribution shows the distribution of kinetic energy among reactant molecules. At a given temperature, not all molecules possess the same kinetic energy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white/[0.01] border border-white/5 rounded-3xl p-4 sm:p-5">
            <div>
              <p className="text-xs text-white/70 leading-relaxed space-y-2">
                <strong>Key Observations:</strong>
                <br />1. <strong>Peak Shifts Right and Flattens:</strong> When temperature is raised from T<sub>1</sub> to T<sub>2</sub> (T<sub>2</sub> &gt; T<sub>1</sub>), the curve shifts to the right and flattens out. The peak (representing the most probable kinetic energy) decreases in height, meaning the energy distribution is broader.
                <br />2. <strong>Area Shift (The 10°C Rule):</strong> The shaded area under the curve to the right of the Activation Energy (E<sub>a</sub>) line represents the fraction of molecules with kinetic energy &ge; E<sub>a</sub>. Raising temperature by just 10°C shifts the curve such that this shaded area <strong>approximately doubles or triples</strong>, causing the reaction rate to double/triple.
                <br />3. <strong>Catalyst Effect:</strong> A catalyst lowers the activation energy from E<sub>a</sub> to E<sub>a</sub>', shifting the threshold line to the left, which exponentially increases the shaded area (fraction of active molecules) without changing temperature.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-rose-400 mb-2">Maxwell-Boltzmann Energy Distribution Plot</span>
              <svg className="w-full max-w-sm h-64 bg-black/30 rounded-2xl p-2 border border-white/5" viewBox="0 0 400 250">
                <line x1="40" y1="20" x2="40" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="40" y1="210" x2="380" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                
                {/* Shaded Area for T1 (Cyan) */}
                <path d="M 240 210 L 240 120 C 270 145, 300 200, 360 210 Z" fill="rgba(34, 211, 238, 0.15)" />
                
                {/* Shaded Area for T2 (Amber) */}
                <path d="M 240 210 L 240 98 C 275 110, 310 180, 360 210 Z" fill="rgba(245, 158, 11, 0.25)" />
                
                {/* Shaded Area for Catalyst Shift (Ea' at x = 160) */}
                <path d="M 160 210 L 160 115 C 200 115, 240 120, 240 210 Z" fill="rgba(16, 185, 129, 0.1)" />

                {/* T1 Curve (Cyan) */}
                <path d="M 40 210 C 80 210, 100 40, 140 40 C 180 40, 220 100, 360 210" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
                
                {/* T2 Curve (Amber) */}
                <path d="M 40 210 C 90 210, 130 90, 180 90 C 230 90, 270 130, 360 210" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                
                {/* Threshold Energy (Ea) Line */}
                <line x1="240" y1="30" x2="240" y2="210" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                <text x="245" y="45" fill="#f43f5e" fontSize="9" fontWeight="bold">Ea (Uncatalyzed)</text>

                {/* Catalyst Threshold Energy (Ea') Line */}
                <line x1="160" y1="30" x2="160" y2="210" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <text x="165" y="45" fill="#10b981" fontSize="9" fontWeight="bold">Ea' (Catalyzed)</text>

                <text x="15" y="110" fill="rgba(255,255,255,0.6)" fontSize="9" transform="rotate(-90 15 110)" textAnchor="middle">Fraction of Molecules</text>
                <text x="210" y="230" fill="rgba(255,255,255,0.6)" fontSize="9" textAnchor="middle">Kinetic Energy ➔</text>
                
                <text x="145" y="32" fill="#22d3ee" fontSize="9" fontWeight="bold">T₁</text>
                <text x="185" y="82" fill="#f59e0b" fontSize="9" fontWeight="bold">T₂</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 9: LAB 2 - ARRHENIUS PLOTTER & COORDINATE GRAPH ─────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            9. Interactive Lab 2: Arrhenius Coordinate & Catalyst Simulator
          </h2>
          <SectionBanner label="Lab Simulator" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Adjust the sliders below to see how activation energy and temperature dictate the rate constant k. Toggle a catalyst to observe the lowering of the transition state barrier.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 p-4.5 rounded-2xl">
            {/* Control Panel */}
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-rose-400 uppercase block">Reaction Parameters</span>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Activation Energy Ea:</span>
                    <span className="font-mono text-rose-400 font-bold">{ea} kJ/mol</span>
                  </div>
                  <input 
                    type="range" 
                    min="30" 
                    max="100" 
                    value={ea} 
                    onChange={(e) => setEa(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Temperature T:</span>
                    <span className="font-mono text-rose-400 font-bold">{temp} K ({ (temp - 273).toFixed(0) }°C)</span>
                  </div>
                  <input 
                    type="range" 
                    min="250" 
                    max="500" 
                    value={temp} 
                    onChange={(e) => setTemp(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-xs">
                    <span className="text-white font-bold block">Introduce Catalyst</span>
                    <span className="text-white/40 text-[10.5px]">Lowers Ea activation barrier by 20 kJ/mol</span>
                  </div>
                  <button 
                    onClick={() => setHasCatalyst(!hasCatalyst)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all duration-300 ${
                      hasCatalyst ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {hasCatalyst ? 'Active' : 'Off'}
                  </button>
                </div>
              </div>

              {/* Math readout */}
              <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-white/80 space-y-1 border border-white/5">
                <div>Ea (Effective) = <span className="text-cyan-400 font-bold">{activeEa} kJ/mol</span></div>
                <div>Temperature = <span className="text-cyan-400 font-bold">{temp} K</span></div>
                <div>Factor e<sup>&minus;E<sub>a</sub>/RT</sup> = <span className="text-emerald-400 font-bold">{factor.toExponential(4)}</span></div>
                <div>Rate Constant k = <span className="text-emerald-400 font-bold">{kRate.toExponential(3)} s⁻¹</span></div>
              </div>
            </div>

            {/* Reaction Coordinate Graph SVG */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-between">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-wider text-center block mb-2">Reaction Coordinate Potential Diagram</span>
              
              <div className="relative w-full h-[160px] flex items-center justify-center">
                <svg width="300" height="150" viewBox="0 0 300 150" className="w-full">
                  {/* Energy axis */}
                  <line x1="15" y1="10" x2="15" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  {/* Reaction axis */}
                  <line x1="15" y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  
                  {/* Graph line */}
                  <path d={svgPath} fill="none" stroke={hasCatalyst ? '#10b981' : '#f43f5e'} strokeWidth="2.5" />

                  {/* Labels */}
                  <text x="25" y={150 - reactantE - 6} fill="white" fontSize="9" fontWeight="bold">Reactants</text>
                  <text x="225" y={150 - productE - 6} fill="white" fontSize="9" fontWeight="bold">Products</text>
                  <text x="120" y={150 - peakE - 10} fill={hasCatalyst ? '#10b981' : '#f43f5e'} fontSize="9" fontWeight="bold" textAnchor="middle">Transition State</text>

                  {/* Peak guide line */}
                  <line x1="120" y1={150 - peakE} x2="120" y2="140" stroke="rgba(255,255,255,0.1)" strokeDasharray="2,2" />
                  
                  {/* Ea barrier dimension */}
                  <line x1="75" y1={150 - reactantE} x2="135" y2={150 - reactantE} stroke="rgba(255,255,255,0.15)" strokeDasharray="3,3" />
                  <path d={`M 120,${150 - reactantE} L 120,${150 - peakE}`} stroke="#38bdf8" strokeWidth="1.2" markerEnd="url(#arrow)" />
                  <text x="125" y={150 - reactantE - (activeEa / 2)} fill="#38bdf8" fontSize="8.5" fontWeight="bold">Ea</text>
                </svg>
              </div>

              <div className="text-[10px] text-white/40 text-center leading-relaxed mt-2">
                As Ea decreases or Temp increases, reactant molecules easily cross the transition state barrier, boosting rate k.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 9: THERMODYNAMICS & CATALYSIS ───────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            10. Catalysis & Activation Energy Diagrams
          </h2>
          <SectionBanner label="Catalysis" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            A <strong>catalyst</strong> increases the rate of reaction by providing an alternative reaction pathway with a lower activation energy barrier.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">What the Catalyst DOES</span>
              <ul className="list-disc pl-5 space-y-1 text-xs text-white/70">
                <li>Lowers the activation energy (Ea) for both the forward and reverse reactions equally.</li>
                <li>Accelerates the rate at which chemical equilibrium is reached.</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-2">
              <span className="text-xs font-bold text-rose-400 block uppercase tracking-wider">What the Catalyst DOES NOT Do</span>
              <ul className="list-disc pl-5 space-y-1 text-xs text-rose-300">
                <li>Does <strong>not</strong> change the enthalpy of reaction (&Delta;H).</li>
                <li>Does <strong>not</strong> change the Gibbs free energy (&Delta;G) of the reaction.</li>
                <li>Does <strong>not</strong> alter the equilibrium constant (K<sub>eq</sub>) or equilibrium composition.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Enthalpy & Activation Energies:</h3>
          <p>
            For any chemical reaction, the change in enthalpy is given by:
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm font-mono text-cyan-300">
            &Delta;H = E<sub>a</sub>(forward) &minus; E<sub>a</sub>(reverse)
          </div>
          <ul className="list-disc pl-5 space-y-1 text-white/70 border-b border-white/5 pb-3">
            <li><strong>Exothermic Reaction:</strong> E<sub>a</sub>(forward) &lt; E<sub>a</sub>(reverse) &rArr; &Delta;H &lt; 0</li>
            <li><strong>Endothermic Reaction:</strong> E<sub>a</sub>(forward) &gt; E<sub>a</sub>(reverse) &rArr; &Delta;H &gt; 0</li>
          </ul>

          <h3 className="text-sm font-bold text-white pt-2">Types of Catalysis & Advanced Concepts:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block uppercase">1. Homogeneous vs. Heterogeneous</span>
              <p className="text-xs text-white/70">
                - <strong>Homogeneous Catalysis:</strong> The catalyst and reactants are in the same phase.
                <br /><span className="text-[11px] text-white/40">*Example:* Oxidation of SO<sub>2</sub> to SO<sub>3</sub> with gaseous NO catalyst.</span>
                <br />- <strong>Heterogeneous Catalysis:</strong> The catalyst is in a different phase (usually solid) than reactants (liquids/gases).
                <br /><span className="text-[11px] text-white/40">*Example:* Hydrogenation of alkenes using solid Nickel/Platinum.</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-violet-400 block uppercase">2. Enzyme Catalysis</span>
              <p className="text-xs text-white/70">
                Enzymes are highly specific biological catalysts (proteins) that operate under mild temperatures (37°C) and pH. Follows the "Lock and Key" mechanism and Michelis-Menten kinetics, accelerating metabolic reactions by factors of 10<sup>12</sup> or higher.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1.5">
              <span className="text-xs font-bold text-rose-400 block uppercase">3. Autocatalysis</span>
              <p className="text-xs text-white/70">
                A reaction in which one of the products formed acts as a catalyst for the reaction. The initial rate is slow but increases rapidly as the autocatalytic product accumulates.
                <br /><span className="text-[11px] text-white/40">*Example:* Titration of Oxalic acid with KMnO<sub>4</sub>, where formed Mn²⁺ acts as autocatalyst.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 11: COLLISION THEORY & MECHANISMS ───────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-violet-400" />
            11. Collision Theory & Reaction Mechanisms
          </h2>
          <SectionBanner label="Collisions" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <h3 className="text-sm font-bold text-white">Collision Theory of Chemical Reactions:</h3>
          <p>
            According to this theory, reactant molecules are assumed to be hard spheres, and reaction occurs when they collide. The rate is given by:
          </p>
          <div className="p-3 bg-black/45 rounded-xl text-center text-xs sm:text-sm font-mono text-violet-300">
            Rate = P &middot; Z<sub>AB</sub> &middot; e<sup>&minus;E<sub>a</sub> / (R &middot; T)</sup>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li><strong>Collision Frequency (ZAB):</strong> The number of collisions per second per unit volume of the reacting mixture.</li>
            <li><strong>Steric Factor (P):</strong> Accounts for the requirement that molecules must collide with the <strong>proper orientation</strong> for chemical bonds to break and form.</li>
            <li><strong>Energetic Factor (e<sup>&minus;E<sub>a</sub>/RT</sup>):</strong> The fraction of molecules with kinetic energy equal to or greater than the activation energy E<sub>a</sub>.</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Threshold Energy (E<sub>threshold</sub>)</span>
              <p className="text-xs text-white/70">
                The minimum total energy that colliding reactant molecules must possess for a collision to result in chemical reaction (bond breaking/making).
                <br /><span className="font-mono text-cyan-300">E<sub>threshold</sub> = E<sub>a</sub> + Average Kinetic Energy of Reactants</span>
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Collision vs. Transition State Theory</span>
              <p className="text-xs text-white/70">
                - <strong>Collision Theory:</strong> Views reactant molecules as hard, structureless spheres and defines rate via active collision frequency.
                <br />- <strong>Transition State Theory:</strong> Focuses on structural changes and energy, showing reactants passing through a high-energy, unstable configuration called the <strong>Activated Complex</strong> (transition state) at the peak of the reaction profile.
              </p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Elementary vs. Complex Reactions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Elementary Reactions</span>
              <p className="text-xs text-white/70">
                Occur in a single step. The rate law exponents match the stoichiometry coefficients directly, and molecularity equals the overall order.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-xs font-bold text-violet-400 block uppercase tracking-wider">Complex Reactions</span>
              <p className="text-xs text-white/70">
                Occur in a sequence of elementary steps (mechanism). The overall rate is governed by the <strong>Rate Determining Step (RDS)</strong>, which is the slowest step in the mechanism.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 12: SOLVED PROBLEMS (IAT LEVEL) ─────────────────────────── */}
      <Collapsible title="12 · Solved Problems (IAT Level)" icon={<BookOpen className="w-4 h-4" />} accent="violet" defaultOpen={true}>
        <div className="space-y-4">
          
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Stoichiometric Rates comparison</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"For the reaction: 2N₂O₅(g) ➔ 4NO₂(g) + O₂(g), the rate of formation of NO₂ is 6.0 × 10⁻⁴ mol L⁻¹ s⁻¹. Calculate the rate of consumption of N₂O₅ and the overall reaction rate."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Write the normalized rate relation:</div>
              <div>   {"Rate = - (1/2) * d[N₂O₅]/dt = + (1/4) * d[NO₂]/dt = + d[O₂]/dt"}</div>
              <div>2. Given: d[NO₂]/dt = 6.0 × 10⁻⁴ mol L⁻¹ s⁻¹.</div>
              <div>3. Overall Rate = (1/4) * d[NO₂]/dt = (1/4) * 6.0 × 10⁻⁴ = 1.5 × 10⁻⁴ mol L⁻¹ s⁻¹.</div>
              <div>4. Consumption of N₂O₅: -d[N₂O₅]/dt = 2 * (Overall Rate) = 2 * 1.5 × 10⁻⁴ = 3.0 × 10⁻⁴ mol L⁻¹ s⁻¹.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: N₂O₅ rate = 3.0 × 10⁻⁴ M/s; Overall rate = 1.5 × 10⁻⁴ M/s</span>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Initial Rates Method Order Deduction</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A reaction A + B ➔ C has these initial rates: Run 1: [A]₀=0.1M, [B]₀=0.1M, Rate=2.0×10⁻³ M/s. Run 2: [A]₀=0.2M, [B]₀=0.1M, Rate=8.0×10⁻³ M/s. Run 3: [A]₀=0.1M, [B]₀=0.2M, Rate=2.0×10⁻³ M/s. Deduce the rate law and rate constant."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Write general rate law: Rate = k[A]ˣ[B]ʸ"}</div>
              <div>2. Compare Run 1 & 2: [B]₀ is constant, [A]₀ doubles. Rate ratio = 8.0×10⁻³ / 2.0×10⁻³ = 4.</div>
              <div>   So, 2\^x = 4 ➔ x = 2 (Second-order wrt A).</div>
              <div>3. Compare Run 1 & 3: [A]₀ is constant, [B]₀ doubles. Rate ratio = 2.0×10⁻³ / 2.0×10⁻³ = 1.</div>
              <div>   So, 2\^y = 1 ➔ y = 0 (Zero-order wrt B).</div>
              <div>{"4. Rate law: Rate = k[A]²"}</div>
              <div>5. Find k using Run 1: 2.0 × 10⁻³ = k * (0.1)² ➔ k = 2.0 × 10⁻³ / 0.01 = 0.2 L mol⁻¹ s⁻¹.</div>
              <span className="text-emerald-400 font-bold block mt-1">{"Answer: Rate = k[A]²; k = 0.2 L mol⁻¹ s⁻¹"}</span>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: First-Order Decay calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A first-order reaction has a rate constant k = 1.15 × 10⁻³ s⁻¹. How long will it take for 5.0 g of this reactant to reduce to 3.0 g?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. First-order integrated rate law:</div>
              <div>   t = (2.303 / k) &middot; log([A]<sub>0</sub> / [A]<sub>t</sub>)</div>
              <div>2. Given: k = 1.15 &times; 10&minus;³ s&minus;¹, [A]<sub>0</sub> = 5.0 g, [A]<sub>t</sub> = 3.0 g.</div>
              <div>   {"t = (2.303 / 1.15 × 10⁻³) * log(5.0 / 3.0)"}</div>
              <div>3. Calculate ratio log(1.667) = 0.2218.</div>
              <div>   t = (2002.6) * 0.2218 = 444.2 seconds.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Time t = 444 seconds</span>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Radioactive decay half-life</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"The half-life of radioactive Carbon-14 is 5730 years. An archaeological wood sample was found to contain only 80% of C-14 found in living trees. Calculate the age of the sample."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Radioactive decay is 1st order. Find decay constant k:</div>
              <div>   k = 0.693 / t₁/₂ = 0.693 / 5730 = 1.209 × 10⁻⁴ year⁻¹.</div>
              <div>2. Let [A]<sub>0</sub> = 100, then [A]<sub>t</sub> = 80.</div>
              <div>   {"t = (2.303 / k) * log(100 / 80)"}</div>
              <div>3. log(1.25) = 0.0969.</div>
              <div>   t = (2.303 / 1.209 × 10⁻⁴) * 0.0969 = 19048.8 * 0.0969 ≈ 1845 years.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Age of wood sample = 1845 years</span>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: First-Order fractional shortcuts</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A first-order reaction is 60% complete in 60 minutes. Calculate the time required for the reaction to be 90% complete."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Use 1st order formula for 60% completion ([A]<sub>0</sub> = 100, [A]<sub>t</sub> = 40):</div>
              <div>   {"k = (2.303 / 60) * log(100 / 40) = (0.03838) * log(2.5)"}</div>
              <div>   k = 0.03838 * 0.3979 = 0.01527 min⁻¹.</div>
              <div>2. Use k to calculate time for 90% completion ([A]<sub>0</sub> = 100, [A]<sub>t</sub> = 10):</div>
              <div>   {"t = (2.303 / 0.01527) * log(100 / 10)"}</div>
              <div>   t = 150.8 * log(10) = 150.8 * 1.0 = 151 minutes.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Time for 90% completion = 151 minutes</span>
            </div>
          </div>

          {/* Problem 6 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 6: Zero-Order rate calculation</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A zero-order reaction has a rate constant k = 0.0030 M/s. If the initial concentration of reactant is 0.50 M, find the concentration remaining after 100 seconds and calculate the half-life."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Integrated rate law for zero-order: [A]<sub>t</sub> = [A]<sub>0</sub> &minus; kt.</div>
              <div>   [A]<sub>t</sub> = 0.50 &minus; (0.0030 &times; 100) = 0.50 &minus; 0.30 = 0.20 M.</div>
              <div>2. Half-life equation: t₁/₂ = [A]₀ / (2k).</div>
              <div>   t₁/₂ = 0.50 / (2 * 0.0030) = 0.50 / 0.006 = 83.3 seconds.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Concentration remaining = 0.20 M; t₁/₂ = 83.3 seconds</span>
            </div>
          </div>

          {/* Problem 7 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 7: Arrhenius Activation Energy</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"The rate constant of a reaction is 2.0 × 10⁻² s⁻¹ at 300 K and 8.0 × 10⁻² s⁻¹ at 320 K. Calculate the activation energy (Ea) of the reaction."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Use Two-Temperature Arrhenius Form: log(k₂ / k₁) = (Ea / 2.303 R) * [(T₂ - T₁) / (T₁T₂)]"}</div>
              <div>   Given: k₁ = 2.0×10⁻², k₂ = 8.0×10⁻², T₁ = 300 K, T₂ = 320 K.</div>
              <div>   log(4) = (Ea / (2.303 * 8.314)) * [(320 - 300) / (300 * 320)]</div>
              <div>   0.602 = (Ea / 19.147) * [20 / 90000]</div>
              <div>   0.602 = (Ea / 19.147) * 0.0002222</div>
              <div>2. Ea = (0.602 * 19.147) / 0.0002222 = 11.526 / 0.0002222 = 51870 J/mol ≈ 51.9 kJ/mol.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Activation energy Ea = 51.9 kJ/mol</span>
            </div>
          </div>

          {/* Problem 8 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 8: Activation energy forward/reverse and Enthalpy</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"An endothermic reaction has a heat of reaction ΔH = +30 kJ/mol. If the activation energy of the forward reaction is 85 kJ/mol, what is the activation energy of the reverse reaction?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Use the relation: ΔH = Ea(forward) - Ea(reverse).</div>
              <div>   Given: ΔH = +30 kJ/mol, Ea(forward) = 85 kJ/mol.</div>
              <div>   +30 = 85 - Ea(reverse).</div>
              <div>2. Solve for Ea(reverse): Ea(reverse) = 85 - 30 = 55 kJ/mol.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Ea(reverse) = 55 kJ/mol</span>
            </div>
          </div>

          {/* Problem 9 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 9: Pseudo-First Order Rate Constant</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"During hydrolysis of sucrose (in excess water), the true rate law is: Rate = k [sucrose] [H₂O]. In an experiment with [H₂O] = 55 M, the reaction behaves as first-order with an apparent rate constant k' = 3.5 × 10⁻⁴ s⁻¹. Find the value of the true second-order rate constant k."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Define relationship between apparent and true constants:</div>
              <div>   {"k' = k [H₂O]  ➔  k = k' / [H₂O]"}</div>
              <div>2. Given: k' = 3.5 × 10⁻⁴ s⁻¹ and [H₂O] = 55 M.</div>
              <div>   k = (3.5 × 10⁻⁴) / 55 ≈ 6.36 × 10⁻⁶ L mol⁻¹ s⁻¹.</div>
              <span className="text-emerald-400 font-bold block mt-1">{"Answer: True rate constant k = 6.36 × 10⁻⁶ L mol⁻¹ s⁻¹"}</span>
            </div>
          </div>

          {/* Problem 10 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 10: Fraction of molecules crossing the barrier</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"Calculate the fraction of molecules having kinetic energy equal to or greater than an activation energy of 50 kJ/mol at 300 K."}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. The fraction of molecules is given by the factor: f = e<sup>&minus;E<sub>a</sub>/RT</sup></div>
              <div>2. Convert Ea to J/mol: Ea = 50 kJ/mol = 50000 J/mol.</div>
              <div>   RT = 8.314 * 300 = 2494.2 J/mol.</div>
              <div>   {"Exponent = -Ea / RT = -50000 / 2494.2 ≈ -20.046"}</div>
              <div>{"3. Calculate f = e^{-20.046} ≈ 1.97 × 10⁻⁹."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Fraction of molecules = 1.97 × 10⁻⁹</span>
            </div>
          </div>

          {/* Problem 11 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 11: Factors affecting rate (Pressure dependence)</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"A gaseous reaction 2A(g) ➔ B(g) is first-order with respect to A. If the initial volume of the reaction container is compressed to 1/3 of its original volume at constant temperature, by what factor does the reaction rate change?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. Concentration is inversely proportional to volume: [A] = n/V."}</div>
              <div>{"2. When volume is compressed to V/3, the concentration of reactant A becomes 3 times the initial: [A]' = 3[A]₀."}</div>
              <div>{"3. The rate law is first-order: Rate = k[A]."}</div>
              <div>{"4. Substitute the new concentration: Rate' = k[A]' = k(3[A]₀) = 3 · Rate₀."}</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Reaction rate increases by a factor of 3</span>
            </div>
          </div>

          {/* Problem 12 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 12: Temperature Coefficient of Reaction</Tag>
            <p className="text-white font-bold text-xs sm:text-sm">
              {"The rate of a certain chemical reaction doubles for every 10°C rise in temperature. If the temperature of the system is raised from 300 K to 350 K, by what factor does the reaction rate increase?"}
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1.5 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>{"1. The temperature coefficient (η) of the reaction is 2."}</div>
              <div>2. The number of 10°C intervals (n) is: n = (T<sub>2</sub> &minus; T<sub>1</sub>) / 10 = (350 &minus; 300) / 10 = 50 / 10 = 5.</div>
              <div>3. The rate ratio is given by: Rate<sub>2</sub> / Rate<sub>1</sub> = &eta;<sup>n</sup> = 2<sup>5</sup> = 32.</div>
              <span className="text-emerald-400 font-bold block mt-1">Answer: Reaction rate increases by a factor of 32</span>
            </div>
          </div>

        </div>
      </Collapsible>

      {/* ── SECTION 13: COMMON MISTAKES & EXAM TRAPS ───────────────────────── */}
      <Collapsible title="13 · Common Mistakes & Exam Traps" icon={<AlertCircle className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-3">
          <WarningCard title="Stoichiometric Coefficient Trap">
            {"Never assume overall reaction coefficients equal rate-law powers. Powers must be determined experimentally (unless specified that the reaction is elementary)."}
          </WarningCard>

          <WarningCard title="Order vs. Molecularity Trap">
            {"Order can be zero, fractional, or negative, but molecularity is strictly a theoretical positive integer (1, 2, or 3) and cannot be zero or fractional."}
          </WarningCard>

          <WarningCard title="Second-Order Formula Trap">
            The equation 1 / [A]<sub>t</sub> = 1 / [A]<sub>0</sub> + kt is only universal for a second-order reaction obeying Rate = k[A]². It is not valid for Rate = k[A][B] if the initial concentrations are unequal.
          </WarningCard>

          <WarningCard title="Log vs. ln Trap">
            {"Natural log (ln) equations and base-10 log equations differ by a factor of 2.303. Watch your denominator terms!"}
          </WarningCard>

          <WarningCard title="Arrhenius Temperature Trap">
            {"Always convert temperatures to Kelvin (K = °C + 273). Working in Celsius will destroy the numerical values."}
          </WarningCard>

          <WarningCard title="Graph Slope Trap">
            {"For a first-order plot, the slope of ln[A] vs t is -k. However, the slope of log[A] vs t is -k/2.303."}
          </WarningCard>

          <WarningCard title="Catalyst Trap">
            {"A catalyst speeds up the rate of forward and reverse reactions by lowering Ea, but it does NOT change the enthalpy (ΔH), Gibbs free energy (ΔG), or equilibrium constant (Keq)."}
          </WarningCard>

          <WarningCard title="First-Order Half-Life Trap">
            {"Half-life is independent of initial concentration only for first-order reactions. For zero-order, t₁/₂ is directly proportional to [A]₀, and for second-order, it is inversely proportional."}
          </WarningCard>

          <WarningCard title="Units of k Trap">
            {"The units of the rate constant (k) change with the overall reaction order. Do not mix up the units: (mol/L)¹⁻ⁿ s⁻¹."}
          </WarningCard>

          <WarningCard title="RDS Trap">
            {"The final rate law should not contain the concentration of any intermediate species. Use equilibrium approximation steps to substitute intermediates out."}
          </WarningCard>

          <WarningCard title="Completion Trap">
            {"A first-order reaction theoretically takes infinite time to go to 100% completion, as it decays exponentially. Do not attempt to compute a finite completion time for 100%!"}
          </WarningCard>

          <WarningCard title="Activation Energy Trap">
            {"A higher activation energy Ea indicates that the rate constant (k) will have a stronger temperature dependence, not necessarily that the reaction is less spontaneous thermodynamically."}
          </WarningCard>
        </div>
      </Collapsible>

      {/* ── SECTION 14: IAT EXAM FOCUS & CHECKLIST ──────────────────────────────── */}
      <Collapsible title="14 · IAT Exam Focus & Checklist" icon={<Star className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="p-4.5 rounded-2xl bg-violet-500/5 border border-violet-500/15">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Spontaneity (thermodynamics) does not guarantee speed (kinetics).",
              "Reaction rates must be divided by stoichiometry coefficients to define overall reaction rate.",
              "Reactants rate is negative; products rate is positive.",
              "Partial orders are determined experimentally, not from stoichiometric coefficients.",
              "Unit of rate is always mol L⁻¹ s⁻¹, while unit of k depends on order.",
              "For First-Order, t<sub>75%</sub> = 2 &times; t<sub>1/2</sub>, t<sub>87.5%</sub> = 3 &times; t<sub>1/2</sub>, and t<sub>93.75%</sub> = 4 &times; t<sub>1/2</sub>.",
              "Arrhenius log plot of ln k vs 1/T yields a straight line with slope = -Ea/R.",
              "A catalyst lowers both forward and reverse Ea barriers by the same amount, keeping ΔH and ΔG constant.",
              "Collision theory rate equation includes Collision Frequency (Z), Steric Factor (P), and energetic factor e^-Ea/RT.",
              "Molecularity applies only to elementary reactions; overall complex reactions have no molecularity.",
              "Rate is directly proportional to surface area for heterogeneous reactions (powder > chips).",
              "Pressure increases gaseous reaction rates by increasing particles per unit volume.",
              "Photochemical reactions (zero-order) rate depends only on light intensity, not reactant concentration."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                <CheckCircle2 className="w-4.5 h-4.5 text-violet-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ─── FOOTER NAVIGATOR ──────────────────────────────────────────────── */}
      <div className="flex justify-between items-center border-t border-white/10 pt-5 mt-4">
        <button 
          onClick={() => onNavigate?.('smart_lessons')}
          className="text-xs text-white/50 hover:text-white transition flex items-center gap-1.5"
        >
          ← Back to Dashboard
        </button>
        <span className="text-[11px] text-white/30 font-mono">Chemical Kinetics · Unit 11</span>
      </div>

    </div>
  );
}
