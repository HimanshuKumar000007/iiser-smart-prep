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

interface SolutionsDetailProps {
  progress?: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

export default function SolutionsDetail({ progress, isCompleted, onNavigate }: SolutionsDetailProps) {
  // --- Simulator 1 States (Vapor Pressure & Raoult's Law) ---
  const [pA0, setPA0] = useState<number>(150); // Pure A VP (mmHg)
  const [pB0, setPB0] = useState<number>(80);  // Pure B VP (mmHg)
  const [xA, setXA] = useState<number>(0.6);   // Mole fraction of A
  const [deviation, setDeviation] = useState<'ideal' | 'positive' | 'negative'>('ideal');

  // Calculations for Simulator 1
  const xB = 1 - xA;
  const pA_ideal = xA * pA0;
  const pB_ideal = xB * pB0;
  const pTotal_ideal = pA_ideal + pB_ideal;

  // Add deviation factors (Activity coefficients gamma_A, gamma_B)
  // We model this using a simple symmetric regular solution model: ln(gamma_i) = W * x_j^2
  // W > 0 for positive deviation, W < 0 for negative deviation
  const W = deviation === 'ideal' ? 0 : deviation === 'positive' ? 1.2 : -1.2;
  const gammaA = Math.exp(W * xB * xB);
  const gammaB = Math.exp(W * xA * xA);

  const pA_real = gammaA * xA * pA0;
  const pB_real = gammaB * xB * pB0;
  const pTotal_real = pA_real + pB_real;

  // Vapour-phase composition
  const yA = pTotal_real > 0 ? pA_real / pTotal_real : 0;
  const yB = 1 - yA;

  // --- Simulator 2 States (Colligative Calculator) ---
  const [solvent, setSolvent] = useState<'water' | 'benzene'>('water');
  const [w2, setW2] = useState<number>(5.85);  // Solute mass (g)
  const [w1, setW1] = useState<number>(100);   // Solvent mass (g)
  const [m2, setM2] = useState<number>(58.5);  // Solute molar mass (g/mol)
  const [soluteType, setSoluteType] = useState<'none' | 'dissociation' | 'association'>('dissociation');
  const [alpha, setAlpha] = useState<number>(100); // Degree in %
  const [nVal, setNVal] = useState<number>(2);     // Number of ions / particles

  const Kf = solvent === 'water' ? 1.86 : 5.12;
  const Kb = solvent === 'water' ? 0.52 : 2.53;
  const Tb_pure = solvent === 'water' ? 100 : 80.1;
  const Tf_pure = solvent === 'water' ? 0 : 5.5;

  // Calculate Van't Hoff factor (i)
  const alpha_dec = alpha / 100;
  let iFactor = 1;
  if (soluteType === 'dissociation') {
    iFactor = 1 + (nVal - 1) * alpha_dec;
  } else if (soluteType === 'association') {
    iFactor = 1 + (1 / nVal - 1) * alpha_dec;
  }

  // Molality
  const molality = (w2 / m2) / (w1 / 1000);
  const deltaTb = iFactor * Kb * molality;
  const deltaTf = iFactor * Kf * molality;
  const newTb = Tb_pure + deltaTb;
  const newTf = Tf_pure - deltaTf;

  // Osmotic pressure at 298K assuming density of water/solvent = 1g/mL
  // Volume in L roughly equals w1/1000 L
  const R = 0.0821; // L atm / mol K
  const Temp = 298.15; // 25C
  const conc = (w2 / m2) / (w1 / 1000); // Molarity approx. equals Molality for dilute aqueous
  const piVal = iFactor * conc * R * Temp;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0b0f1e] via-[#0d1220] to-[#0b0f1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Chemistry</Tag>
            <Tag color="amber">Unit 2</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="pink">Hot Topic</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Solutions &<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Colligative Properties</span>
          </h1>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-2xl">
            A solution is a homogeneous mixture. This guide covers gas/solid solubility rules, Henry's and Raoult's laws, deviation properties, azeotropes, and colligative properties with rigorous Van't Hoff corrections.
          </p>
        </div>
      </div>

      {/* ── SECTION 1: TYPES OF SOLUTIONS ──────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            1. Classification & Definition
          </h2>
          <SectionBanner label="Definitions" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            A <strong className="text-white">Solution</strong> is a homogeneous mixture of two or more chemically non-reacting substances whose composition can be varied within limits. 
          </p>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h4 className="text-white font-bold text-xs sm:text-sm">Refined Definition of Components:</h4>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>
                <strong className="text-emerald-400">Solvent</strong>: The component that determines the physical state of the solution (usually, but not always, present in larger quantity).
              </li>
              <li>
                <strong className="text-cyan-400">Solute</strong>: The component dissolved in the solvent.
              </li>
            </ul>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">The Standard 9-Type Solution Classification:</h3>
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2 sm:p-3">Solute State</th>
                  <th className="p-2 sm:p-3">Solvent State</th>
                  <th className="p-2 sm:p-3">Solution Type</th>
                  <th className="p-2 sm:p-3">Common Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-emerald-400">Gas</td>
                  <td className="p-2 sm:p-3 text-white/60">Gas</td>
                  <td className="p-2 sm:p-3">Gaseous</td>
                  <td className="p-2 sm:p-3">Air (Oxygen mixed with Nitrogen)</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-emerald-400">Liquid</td>
                  <td className="p-2 sm:p-3 text-white/60">Gas</td>
                  <td className="p-2 sm:p-3">Gaseous</td>
                  <td className="p-2 sm:p-3">Chloroform vapour mixed with Nitrogen gas</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-emerald-400">Solid</td>
                  <td className="p-2 sm:p-3 text-white/60">Gas</td>
                  <td className="p-2 sm:p-3">Gaseous</td>
                  <td className="p-2 sm:p-3">Camphor vapour in Nitrogen gas (Sublimation)</td>
                </tr>
                <tr className="bg-white/[0.01]">
                  <td className="p-2 sm:p-3 font-semibold text-cyan-400">Gas</td>
                  <td className="p-2 sm:p-3 text-white/60">Liquid</td>
                  <td className="p-2 sm:p-3">Liquid</td>
                  <td className="p-2 sm:p-3">Oxygen dissolved in Water / Carbonated Drinks</td>
                </tr>
                <tr className="bg-white/[0.01]">
                  <td className="p-2 sm:p-3 font-semibold text-cyan-400">Liquid</td>
                  <td className="p-2 sm:p-3 text-white/60">Liquid</td>
                  <td className="p-2 sm:p-3">Liquid</td>
                  <td className="p-2 sm:p-3">Ethanol dissolved in Water</td>
                </tr>
                <tr className="bg-white/[0.01]">
                  <td className="p-2 sm:p-3 font-semibold text-cyan-400">Solid</td>
                  <td className="p-2 sm:p-3 text-white/60">Liquid</td>
                  <td className="p-2 sm:p-3">Liquid</td>
                  <td className="p-2 sm:p-3">Glucose or Salt dissolved in Water</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-violet-400">Gas</td>
                  <td className="p-2 sm:p-3 text-white/60">Solid</td>
                  <td className="p-2 sm:p-3">Solid</td>
                  <td className="p-2 sm:p-3">Solution of Hydrogen in Palladium (Occlusion)</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-violet-400">Liquid</td>
                  <td className="p-2 sm:p-3 text-white/60">Solid</td>
                  <td className="p-2 sm:p-3">Solid</td>
                  <td className="p-2 sm:p-3">Amalgam of Mercury with Sodium (Hg is liquid, Na is solid)</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-violet-400">Solid</td>
                  <td className="p-2 sm:p-3 text-white/60">Solid</td>
                  <td className="p-2 sm:p-3">Solid</td>
                  <td className="p-2 sm:p-3">Alloys (e.g., Copper dissolved in Gold)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: EXPRESSING CONCENTRATION ─────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            2. Expressing Concentration
          </h2>
          <SectionBanner label="Concentration" color="cyan" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Concentration measures the quantity of solute dissolved in a specific amount of solvent or solution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-400 uppercase block tracking-widest">Molarity (M)</span>
              <p className="text-xs font-mono text-white">M = Moles of Solute / Volume of Solution (L)</p>
              <p className="text-white/60 text-xs">
                Unit: mol/L (or M). <strong className="text-rose-400">Temperature Dependent</strong> because volume expands/contracts with temperature changes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-400 uppercase block tracking-widest">Molality (m)</span>
              <p className="text-xs font-mono text-white">m = Moles of Solute / Mass of Solvent (kg)</p>
              <p className="text-white/60 text-xs">
                Unit: mol/kg (or m). <strong className="text-emerald-400">Temperature Independent</strong> because mass remains constant regardless of temperature.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-400 uppercase block tracking-widest">Mole Fraction (x)</span>
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span>x<sub>A</sub> =</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">n<sub>A</sub></span>
                  <span className="px-1 pt-0.5">n<sub>A</sub> + n<sub>B</sub></span>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-1.5">
                Dimensionless parameter. The sum of all mole fractions is always equal to 1: <i>x</i><sub>A</sub> + <i>x</i><sub>B</sub> = 1.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <span className="text-[10px] font-black text-cyan-400 uppercase block tracking-widest">Parts Per Million (ppm)</span>
              <p className="text-xs font-mono text-white">ppm = (Mass of Solute / Total Mass of Solution) × 10⁶</p>
              <p className="text-white/60 text-xs">
                Used for extremely dilute solutions (e.g., pollutants in air/water, hardness of water).
              </p>
            </div>
          </div>

          <ProTip>
            <strong>Crucial Molarity (M) ➔ Molality (m) Conversion:</strong><br />
            To convert between concentration types using density of solution <code className="text-white">d</code> (in g/mL) and molar mass of solute <code className="text-white">M<sub>s</sub></code> (in g/mol):
            <div className="my-2.5 p-4 bg-black/45 rounded-xl text-cyan-300">
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold">
                <div className="flex items-center">
                  <span className="mr-1.5">m =</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">1000 &middot; M</span>
                    <span className="px-2 pt-0.5">1000 &middot; d &minus; M &middot; M<sub>s</sub></span>
                  </div>
                </div>
                <span className="text-white/40">or</span>
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">1</span>
                    <span className="px-2 pt-0.5">m</span>
                  </div>
                  <span className="mx-1.5">=</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">d</span>
                    <span className="px-2 pt-0.5">M</span>
                  </div>
                  <span className="mx-1.5">&minus;</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">M<sub>s</sub></span>
                    <span className="px-2 pt-0.5">1000</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3.5 pt-3.5 border-t border-white/5 space-y-1">
              <strong>Dilute Solution Approximations:</strong><br />
              For dilute aqueous solutions where the moles of solute <i>n</i><sub>2</sub> &ll; <i>n</i><sub>1</sub>, the relation between the mole fraction of the solute (<i>x</i><sub>2</sub>), molality (<i>m</i>), and molarity (<i>M</i>) simplifies directly to:
              <div className="my-2.5 p-4 bg-black/45 rounded-xl text-cyan-300">
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold">
                  <div className="flex items-center">
                    <span className="mr-1.5">x<sub>2</sub> &asymp;</span>
                    <div className="flex flex-col items-center">
                      <span className="px-2 border-b border-white/20 pb-0.5">m &middot; M<sub>1</sub></span>
                      <span className="px-2 pt-0.5">1000</span>
                    </div>
                  </div>
                  <span className="text-white/40">and</span>
                  <div className="flex items-center">
                    <span className="mr-1.5">x<sub>2</sub> &asymp;</span>
                    <div className="flex flex-col items-center">
                      <span className="px-2 border-b border-white/20 pb-0.5">M &middot; M<sub>1</sub></span>
                      <span className="px-2 pt-0.5">1000 &middot; d</span>
                    </div>
                  </div>
                </div>
              </div>
              Where <i>M</i><sub>1</sub> is the molar mass of the solvent (e.g., 18 g/mol for water) and <i>d</i> is the density of the solution in g/mL.
            </div>
            Make sure to use <code className="text-cyan-400">d</code> in g/mL. In the formulas, <code className="text-white">M</code> represents molarity, while <code className="text-white">M<sub>s</sub></code> represents the molar mass of the solute.
          </ProTip>
        </div>
      </div>

      {/* ── SECTION 3: SOLUBILITY & HENRY'S LAW ──────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-amber-400" />
            3. Solubility & Henry's Law
          </h2>
          <SectionBanner label="Solubility" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Solubility is the maximum amount of solute that can be dissolved in a specified amount of solvent at a specific temperature.
          </p>

          <h3 className="text-sm font-bold text-white">Temperature Effect on Solids:</h3>
          <p className="text-white/70">
            For solids dissolving in liquids, the temperature dependence depends on the sign of the enthalpy of dissolution (&Delta;<sub>sol</sub>H):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li>
              If the dissolution process is <strong className="text-emerald-400">endothermic (&Delta;<sub>sol</sub>H &gt; 0)</strong>, solubility increases as temperature rises (Le Chatelier's principle).
            </li>
            <li>
              If the dissolution process is <strong className="text-rose-400">exothermic (&Delta;<sub>sol</sub>H &lt; 0)</strong>, solubility decreases as temperature rises.
            </li>
          </ul>

          <h3 className="text-sm font-bold text-white pt-2">Solubility of Gases in Liquids (Henry's Law):</h3>
          <p>
            The solubility of a gas in a liquid decreases with increasing temperature (since gas dissolution is generally exothermic). Henry's Law states that the partial pressure of the gas in the vapour phase (<code className="text-white">p</code>) is proportional to the mole fraction of the gas (<code className="text-white">x</code>) in the solution:
          </p>
          <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-center text-white text-sm sm:text-base font-semibold">
            p = K<sub>H</sub> &middot; x
          </div>

          <WarningCard title={<span className="flex items-center gap-1">Henry's Law Constant (K<sub>H</sub>) Warnings</span>}>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>
                <strong>Inverse Solubility Relationship</strong>: At a given pressure, a <strong className="text-rose-400">larger K<sub>H</sub> value implies lower solubility</strong> of the gas in the liquid.
              </li>
              <li>
                <strong>Temperature Hook</strong>: K<sub>H</sub> increases with temperature. This is why solubility of gases decreases with temp, explaining why aquatic species are more active/comfortable in cold water (higher dissolved O<sub>2</sub>).
              </li>
              <li>
                <strong>Dimension Trap</strong>: The units of K<sub>H</sub> depend on the equation structure. If written as <i>p</i> = K<sub>H</sub><i>x</i>, the unit of K<sub>H</sub> is pressure (bar, atm, or Torr). If written as solubility <i>C</i> = K&prime;<sub>H</sub><i>p</i>, the units are inverted. Always check the axes/units.
              </li>
            </ul>
          </WarningCard>
        </div>
      </div>

      {/* ── SECTION 4: VAPOUR PRESSURE & RAOULT'S LAW ────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-400" />
            4. Vapour Pressure & Raoult's Law
          </h2>
          <SectionBanner label="Raoult's Law" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Vapour pressure is the pressure exerted by vapours in equilibrium with the liquid at a given temperature.
          </p>

          <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
            <h4 className="text-white font-bold text-xs sm:text-sm">Rigorous Lowering Explanation:</h4>
            <p className="text-white/70">
              Adding a non-volatile solute lowers the mole fraction of the solvent in the liquid phase. Since chemical potential is proportional to mole fraction (<code className="text-white">μ = μ° + RT ln(x)</code>), the chemical potential of the solvent decreases. As a result, the rate of escape of solvent molecules decreases, leading to a lower equilibrium vapour pressure.
            </p>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Raoult's Law for Volatile Liquids:</h3>
          <p>
            For a binary solution of volatile liquids A and B, the partial vapour pressure of each component is directly proportional to its mole fraction in the solution:
          </p>
          <div className="p-4 bg-black/45 rounded-xl text-xs sm:text-sm text-white space-y-3 font-semibold">
            <div className="flex flex-wrap items-center justify-center gap-1">
              <span>P<sub>A</sub> = x<sub>A</sub> &middot; P<sub>A</sub>&deg;</span>
              <span className="mx-4 text-white/30">and</span>
              <span>P<sub>B</sub> = x<sub>B</sub> &middot; P<sub>B</sub>&deg;</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 pt-1.5 border-t border-white/5">
              <span>P<sub>total</sub> = P<sub>A</sub> + P<sub>B</sub> = x<sub>A</sub> &middot; P<sub>A</sub>&deg; + x<sub>B</sub> &middot; P<sub>B</sub>&deg; = P<sub>B</sub>&deg; + (P<sub>A</sub>&deg; &minus; P<sub>B</sub>&deg;) &middot; x<sub>A</sub></span>
            </div>
          </div>
          <p className="text-white/60">
            For an ideal binary solution, the total vapour pressure varies linearly with the liquid-phase mole fraction of either component.
          </p>

          <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10 space-y-2">
            <span className="text-[10px] font-black text-violet-400 tracking-wider uppercase block">IAT Exam Focus: Vapour Phase Composition</span>
            <p className="text-white/70">
              Let <i>y</i><sub>A</sub> and <i>y</i><sub>B</sub> be the mole fractions of components A and B in the vapour phase:
            </p>
            <div className="p-3 bg-black/30 rounded-xl text-center text-xs text-violet-300 flex items-center justify-center gap-1.5 font-semibold">
              <span>y<sub>A</sub> =</span>
              <div className="flex flex-col items-center">
                <span className="px-1 border-b border-white/20 pb-0.5">P<sub>A</sub></span>
                <span className="px-1 pt-0.5">P<sub>total</sub></span>
              </div>
              <span className="mx-1">=</span>
              <div className="flex flex-col items-center">
                <span className="px-1 border-b border-white/20 pb-0.5">x<sub>A</sub> &middot; P<sub>A</sub>&deg;</span>
                <span className="px-1 pt-0.5">x<sub>A</sub> &middot; P<sub>A</sub>&deg; + x<sub>B</sub> &middot; P<sub>B</sub>&deg;</span>
              </div>
            </div>
            <p className="text-white/70 text-[12px] italic">
              <strong>Key Insight:</strong> The vapour phase is always richer in the more volatile component (the component with the higher pure vapour pressure, <i>P</i><sub>A</sub>&deg; &gt; <i>P</i><sub>B</sub>&deg;).
            </p>
          </div>

          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <span className="text-[10px] font-black text-cyan-400 tracking-wider uppercase block">Raoult's Law for Non-Volatile Solutes</span>
            <p className="text-white/70">
              When a non-volatile solute is dissolved in a volatile solvent, the vapour pressure of the solution is solely due to the solvent, and is directly proportional to the mole fraction of the solvent:
            </p>
            <div className="my-2.5 p-4 bg-black/45 rounded-xl text-center text-xs sm:text-sm text-cyan-300 font-semibold">
              P<sub>solution</sub> = x<sub>solvent</sub> &middot; P&deg;<sub>solvent</sub> = (1 &minus; x<sub>solute</sub>) &middot; P&deg;<sub>solvent</sub>
            </div>
            <p className="text-white/70">
              Rearranging this gives the direct conceptual link to the first colligative property, **Relative Lowering of Vapour Pressure (RLVP)**:
            </p>
            <div className="my-2.5 p-4 bg-black/45 rounded-xl text-cyan-300 flex items-center justify-center gap-1.5 font-semibold text-xs sm:text-sm">
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">P&deg;<sub>solvent</sub> &minus; P<sub>solution</sub></span>
                  <span className="px-2 pt-0.5">P&deg;<sub>solvent</sub></span>
                </div>
              </div>
              <span className="mx-1.5">=</span>
              <span>x<sub>solute</sub></span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SIMULATOR 1: VAPOUR PRESSURE SIMULATOR ──────────────────────────── */}
      <div className="bg-[#070913] border border-white/8 rounded-3xl p-5 sm:p-6 space-y-6">
        <div>
          <span className="text-cyan-400 text-[10px] font-black tracking-widest uppercase block mb-1">Interactive Lab 1</span>
          <h3 className="text-white font-bold text-lg">Vapour Pressure & Composition Simulator</h3>
          <p className="text-white/50 text-xs mt-1">
            Toggle solution type and adjust mole fractions to calculate real vs. ideal partial pressures and vapor-phase mole fractions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-1 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">Controls</h4>
            
            {/* Solution Deviation Type */}
            <div className="space-y-1">
              <label className="text-[11px] text-white/50 font-bold block">Solution Type</label>
              <select 
                value={deviation} 
                onChange={(e) => setDeviation(e.target.value as any)}
                className="w-full bg-black border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ideal">Ideal Solution (Raoult's Law)</option>
                <option value="positive">Positive Deviation (A-B &lt; A-A, B-B)</option>
                <option value="negative">Negative Deviation (A-B &gt; A-A, B-B)</option>
              </select>
            </div>

            {/* Mole Fraction Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/50 font-bold">Mole Fraction of A (x<sub>A</sub>)</span>
                <span className="text-cyan-400 font-bold font-mono">{xA.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={xA} 
                onChange={(e) => setXA(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/30">
                <span>0.0 (Pure B)</span>
                <span>1.0 (Pure A)</span>
              </div>
            </div>

            {/* Pure Pressure A */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/50 font-bold">Pure Vapour Pressure P<sub>A</sub>&deg;</span>
                <span className="text-white font-mono">{pA0} mmHg</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="250" 
                step="10"
                value={pA0} 
                onChange={(e) => setPA0(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Pure Pressure B */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-white/50 font-bold">Pure Vapour Pressure P<sub>B</sub>&deg;</span>
                <span className="text-white font-mono">{pB0} mmHg</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="150" 
                step="5"
                value={pB0} 
                onChange={(e) => setPB0(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Liquid state block */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[10px] font-black text-cyan-400 uppercase block tracking-wider">Liquid Phase Mole Fractions</span>
                <p className="text-xs text-white/70">
                  A (Solvent): <span className="font-mono text-white font-bold">{xA.toFixed(2)}</span>
                </p>
                <p className="text-xs text-white/70">
                  B (Solute): <span className="font-mono text-white font-bold">{xB.toFixed(2)}</span>
                </p>
              </div>

              {/* Vapour state block */}
              <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-1">
                <span className="text-[10px] font-black text-cyan-400 uppercase block tracking-wider">Vapour Phase Mole Fractions</span>
                <p className="text-xs text-white/70">
                  A in Vapour (y<sub>A</sub>): <span className="font-mono text-cyan-300 font-bold">{yA.toFixed(3)}</span>
                </p>
                <p className="text-xs text-white/70">
                  B in Vapour (y<sub>B</sub>): <span className="font-mono text-cyan-300 font-bold">{yB.toFixed(3)}</span>
                </p>
              </div>

              {/* Ideal Vapour Pressures */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[10px] font-black text-emerald-400 uppercase block tracking-wider">Ideal Raoult Vapour Pressure</span>
                <p className="text-xs text-white/70">
                  Ideal P<sub>total</sub>: <span className="font-mono text-white font-bold">{pTotal_ideal.toFixed(1)} mmHg</span>
                </p>
                <p className="text-xs text-white/40">
                  P<sub>A</sub>: {pA_ideal.toFixed(1)} | P<sub>B</sub>: {pB_ideal.toFixed(1)}
                </p>
              </div>

              {/* Real Vapour Pressures */}
              <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10 space-y-1">
                <span className="text-[10px] font-black text-violet-400 uppercase block tracking-wider">Real/Observed Vapour Pressure</span>
                <p className="text-xs text-white/70">
                  Real P<sub>total</sub>: <span className="font-mono text-violet-300 font-bold">{pTotal_real.toFixed(1)} mmHg</span>
                </p>
                <p className="text-xs text-white/40">
                  &gamma;<sub>A</sub>: {gammaA.toFixed(2)} | &gamma;<sub>B</sub>: {gammaB.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Dynamic VP Curve Diagram */}
            <div className="bg-black/35 border border-white/5 p-4 rounded-2xl flex flex-col items-center">
              <span className="text-[10px] font-black text-white/40 uppercase block self-start mb-2">Vapour Pressure vs. Liquid Mole Fraction (x<sub>A</sub>)</span>
              
              <svg viewBox="0 0 320 200" className="w-full max-w-[340px] overflow-visible">
                {/* Axes */}
                <line x1="40" y1="160" x2="280" y2="160" stroke="#333" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="160" stroke="#333" strokeWidth="1.5" />
                <line x1="280" y1="20" x2="280" y2="160" stroke="#333" strokeWidth="1.5" />

                {/* Gridlines for Pure Pressures */}
                <line x1="40" y1="160" x2="280" y2="80" stroke="#555" strokeDasharray="3,3" /> {/* PB0 to PA0 */}
                
                {/* Ideal lines */}
                {/* P_A ideal line */}
                <line x1="40" y1="160" x2="280" y2="40" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,2" />
                {/* P_B ideal line */}
                <line x1="40" y1="110" x2="280" y2="160" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />

                {/* Total pressure lines */}
                {/* Ideal Total */}
                <line x1="40" y1="110" x2="280" y2="40" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" />

                {/* Real Total (Curve) */}
                {deviation === 'ideal' ? (
                  <line x1="40" y1="110" x2="280" y2="40" stroke="#8b5cf6" strokeWidth="2.5" />
                ) : deviation === 'positive' ? (
                  <path d="M 40 110 Q 160 30 280 40" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                ) : (
                  <path d="M 40 110 Q 160 140 280 40" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                )}

                {/* Indicators */}
                {/* X axis labels */}
                <text x="35" y="175" fill="#888" fontSize="9" textAnchor="middle">0.0 (Pure B)</text>
                <text x="280" y="175" fill="#888" fontSize="9" textAnchor="middle">1.0 (Pure A)</text>
                <text x="160" y="190" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">Mole Fraction x<tspan dy="2" fontSize="7">A</tspan></text>

                {/* Y axis labels */}
                <text x="25" y="110" fill="#888" fontSize="8" textAnchor="middle">P<tspan dy="2" fontSize="6">B</tspan><tspan dy="-2">&deg;</tspan></text>
                <text x="295" y="40" fill="#888" fontSize="8" textAnchor="middle">P<tspan dy="2" fontSize="6">A</tspan><tspan dy="-2">&deg;</tspan></text>

                {/* Current Dot */}
                {(() => {
                  const cx = 40 + xA * 240;
                  let cy = 110 + xA * (40 - 110); // Ideal
                  if (deviation === 'positive') {
                    const t = xA;
                    cy = (1-t)*(1-t)*110 + 2*(1-t)*t*30 + t*t*40;
                  } else if (deviation === 'negative') {
                    const t = xA;
                    cy = (1-t)*(1-t)*110 + 2*(1-t)*t*140 + t*t*40;
                  }
                  return (
                    <circle cx={cx} cy={cy} r="5" fill="#ec4899" stroke="#fff" strokeWidth="1.5" />
                  );
                })()}
              </svg>
              <div className="flex gap-4 mt-2 text-[10px] text-white/50">
                <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-emerald-500 inline-block"></span> Ideal Raoult</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 bg-violet-500 inline-block"></span> Real solution</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-500 inline-block"></span> Current State</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: IDEAL VS NON-IDEAL solutions ────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            5. Ideal vs. Non-Ideal Solutions
          </h2>
          <SectionBanner label="Interactions" color="amber" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Solutions are classified based on their behavior relative to Raoult's Law.
          </p>

          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                  <th className="p-2 sm:p-3">Property</th>
                  <th className="p-2 sm:p-3">Ideal Solution</th>
                  <th className="p-2 sm:p-3">Positive Deviation</th>
                  <th className="p-2 sm:p-3">Negative Deviation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Raoult's Law</td>
                  <td className="p-2 sm:p-3 text-emerald-400">Obeyed at all concentration ranges</td>
                  <td className="p-2 sm:p-3">Observed V.P. &gt; Calculated V.P.</td>
                  <td className="p-2 sm:p-3">Observed V.P. &lt; Calculated V.P.</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Interactions</td>
                  <td className="p-2 sm:p-3">A-B strength ≈ A-A or B-B</td>
                  <td className="p-2 sm:p-3">A-B adhesive force &lt; cohesive force</td>
                  <td className="p-2 sm:p-3">A-B adhesive force &gt; cohesive force</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Enthalpy of Mixing (&Delta;H<sub>mix</sub>)</td>
                  <td className="p-2 sm:p-3">&Delta;H<sub>mix</sub> = 0</td>
                  <td className="p-2 sm:p-3 text-rose-400">&Delta;H<sub>mix</sub> &gt; 0 (Endothermic, absorbs heat)</td>
                  <td className="p-2 sm:p-3 text-cyan-400">&Delta;H<sub>mix</sub> &lt; 0 (Exothermic, releases heat)</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Volume of Mixing (&Delta;V<sub>mix</sub>)</td>
                  <td className="p-2 sm:p-3">&Delta;V<sub>mix</sub> = 0</td>
                  <td className="p-2 sm:p-3">&Delta;V<sub>mix</sub> &gt; 0 (Slight volume expansion)</td>
                  <td className="p-2 sm:p-3">&Delta;V<sub>mix</sub> &lt; 0 (Slight volume contraction)</td>
                </tr>
                <tr>
                  <td className="p-2 sm:p-3 font-semibold text-white">Common Examples</td>
                  <td className="p-2 sm:p-3">Benzene + Toluene<br />n-Hexane + n-Heptane</td>
                  <td className="p-2 sm:p-3">Acetone + Ethanol<br />Ethanol + Water</td>
                  <td className="p-2 sm:p-3">Chloroform + Acetone<br />Nitric acid (HNO₃) + Water</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProTip>
            <strong>Conceptual Correction about Ideal Solutions:</strong><br />
            An ideal solution does not mean that there are no intermolecular forces acting in the solution. It means that the newly formed solute-solvent (A-B) interactions on mixing are approximately equal in strength and geometry to the original solvent-solvent (A-A) and solute-solute (B-B) interactions.
          </ProTip>

          <h3 className="text-sm font-bold text-white pt-2">Azeotropes (Constant Boiling Mixtures):</h3>
          <p>
            Azeotropes are binary mixtures having the same composition in liquid and vapour phases and boiling at a constant temperature. <strong className="text-rose-400">Ordinary fractional distillation cannot separate the components</strong> because the vapor is identical to the liquid.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-white/70">
            <li>
              <strong className="text-rose-400">Minimum Boiling Azeotrope</strong>: Formed by solutions showing a large <strong className="text-rose-400">positive deviation</strong>. The boiling point of the azeotrope is lower than the boiling points of either of the pure components (e.g., 95% ethanol + 5% water).
            </li>
            <li>
              <strong className="text-cyan-400">Maximum Boiling Azeotrope</strong>: Formed by solutions showing a large <strong className="text-cyan-400">negative deviation</strong>. The boiling point of the azeotrope is higher than the boiling points of either of the pure components (e.g., 68% nitric acid + 32% water).
            </li>
          </ul>

          {/* Azeotrope Phase Diagrams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Minimum Boiling Azeotrope */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase block text-center">Minimum Boiling Azeotrope (T-x-y Diagram)</span>
              <div className="flex justify-center">
                <svg width="280" height="190" viewBox="0 0 280 190" className="w-full max-w-[280px]">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="240" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="40" y1="150" x2="240" y2="150" stroke="rgba(255,255,255,0.1)" />
                  <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(255,255,255,0.1)" />
                  <line x1="240" y1="20" x2="240" y2="150" stroke="rgba(255,255,255,0.1)" />
                  
                  {/* Azeotropic composition vertical line */}
                  <line x1="160" y1="20" x2="160" y2="150" stroke="rgba(244,63,94,0.3)" strokeDasharray="2,2" />

                  {/* Curves */}
                  {/* Liquidus Curve (Upper) */}
                  <path d="M 40,80 Q 100,125 160,130 Q 200,110 240,60" fill="none" stroke="#f43f5e" strokeWidth="2" />
                  {/* Vaporus Curve (Lower) */}
                  <path d="M 40,80 Q 100,142 160,130 Q 200,90 240,60" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,1" />

                  {/* Labels */}
                  <text x="35" y="83" fill="white" fontSize="10" textAnchor="end">T<tspan dy="2" fontSize="7">B</tspan><tspan dy="-2">&deg;</tspan></text>
                  <text x="245" y="63" fill="white" fontSize="10" textAnchor="start">T<tspan dy="2" fontSize="7">A</tspan><tspan dy="-2">&deg;</tspan></text>
                  <text x="160" y="142" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Azeotrope (T<tspan dy="2" fontSize="7">min</tspan><tspan dy="-2">)</tspan></text>
                  <text x="14" y="90" fill="rgba(255,255,255,0.5)" fontSize="9" transform="rotate(-90 14 90)" textAnchor="middle">Temperature (T)</text>
                  <text x="140" y="168" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">Mole Fraction (x<tspan dy="2" fontSize="7">A</tspan><tspan dy="-2">, y</tspan><tspan dy="2" fontSize="7">A</tspan><tspan dy="-2">)</tspan></text>
                  <text x="40" y="162" fill="white" fontSize="9" textAnchor="middle">0 (Pure B)</text>
                  <text x="240" y="162" fill="white" fontSize="9" textAnchor="middle">1 (Pure A)</text>
                  <text x="160" y="162" fill="#22d3ee" fontSize="9" textAnchor="middle">x_A = 0.6</text>
                </svg>
              </div>
              <p className="text-[11px] text-white/50 text-center leading-relaxed">
                At the minimum point (e.g., 95% Ethanol + 5% Water), the liquid and vapor curves touch. The solution boils constantly at a lower temperature than pure A or B.
              </p>
            </div>

            {/* Maximum Boiling Azeotrope */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <span className="text-[10px] font-black text-cyan-400 tracking-wider uppercase block text-center">Maximum Boiling Azeotrope (T-x-y Diagram)</span>
              <div className="flex justify-center">
                <svg width="280" height="190" viewBox="0 0 280 190" className="w-full max-w-[280px]">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="240" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3,3" />
                  <line x1="40" y1="150" x2="240" y2="150" stroke="rgba(255,255,255,0.1)" />
                  <line x1="40" y1="20" x2="40" y2="150" stroke="rgba(255,255,255,0.1)" />
                  <line x1="240" y1="20" x2="240" y2="150" stroke="rgba(255,255,255,0.1)" />
                  
                  {/* Azeotropic composition vertical line */}
                  <line x1="120" y1="20" x2="120" y2="150" stroke="rgba(34,211,238,0.3)" strokeDasharray="2,2" />

                  {/* Curves */}
                  {/* Liquidus Curve (Lower) */}
                  <path d="M 40,90 Q 80,45 120,40 Q 180,65 240,110" fill="none" stroke="#22d3ee" strokeWidth="2" />
                  {/* Vaporus Curve (Upper) */}
                  <path d="M 40,90 Q 80,30 120,40 Q 180,55 240,110" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,1" />

                  {/* Labels */}
                  <text x="35" y="93" fill="white" fontSize="10" textAnchor="end">T<tspan dy="2" fontSize="7">B</tspan><tspan dy="-2">&deg;</tspan></text>
                  <text x="245" y="113" fill="white" fontSize="10" textAnchor="start">T<tspan dy="2" fontSize="7">A</tspan><tspan dy="-2">&deg;</tspan></text>
                  <text x="120" y="32" fill="#22d3ee" fontSize="9" fontWeight="bold" textAnchor="middle">Azeotrope (T<tspan dy="2" fontSize="7">max</tspan><tspan dy="-2">)</tspan></text>
                  <text x="14" y="90" fill="rgba(255,255,255,0.5)" fontSize="9" transform="rotate(-90 14 90)" textAnchor="middle">Temperature (T)</text>
                  <text x="140" y="168" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">Mole Fraction (x<tspan dy="2" fontSize="7">A</tspan><tspan dy="-2">, y</tspan><tspan dy="2" fontSize="7">A</tspan><tspan dy="-2">)</tspan></text>
                  <text x="40" y="162" fill="white" fontSize="9" textAnchor="middle">0 (Pure B)</text>
                  <text x="240" y="162" fill="white" fontSize="9" textAnchor="middle">1 (Pure A)</text>
                  <text x="120" y="162" fill="#f43f5e" fontSize="9" textAnchor="middle">x_A = 0.4</text>
                </svg>
              </div>
              <p className="text-[11px] text-white/50 text-center leading-relaxed">
                At the maximum point (e.g., 68% HNO₃ + 32% Water), the liquid and vapor curves touch. The solution boils constantly at a higher temperature than pure A or B.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: COLLIGATIVE PROPERTIES ────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-violet-400" />
            6. Colligative Properties & Van't Hoff Factor
          </h2>
          <SectionBanner label="Colligative" color="violet" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            Colligative properties are those that depend <strong className="text-white">only on the number of solute particles</strong>, and not on the chemical nature of the solute.
          </p>

          <WarningCard title="The 'Proportionality' Trap">
            Do NOT assume that all colligative properties are directly proportional to <i>i</i> &times; <i>m</i>.
            <ul className="list-disc pl-5 space-y-1 mt-1 text-white/70">
              <li>
                Elevation in Boiling Point (&Delta;T<sub>b</sub>) and Depression in Freezing Point (&Delta;T<sub>f</sub>) are proportional to molality: &Delta;T &prop; i &middot; m.
              </li>
              <li>
                Osmotic Pressure (&pi;) is proportional to molarity: &pi; &prop; i &middot; C.
              </li>
              <li>
                Relative Lowering of Vapour Pressure is proportional to the solute's effective mole fraction in the liquid phase.
              </li>
            </ul>
          </WarningCard>

          <h3 className="text-sm font-bold text-white pt-2">The Four Colligative Formulas:</h3>
          <div className="space-y-3">
            {/* RLVP */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-violet-400 block uppercase">1. Relative Lowering of Vapour Pressure (RLVP)</span>
              <div className="p-1 text-xs font-semibold text-white">
                <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-semibold text-violet-200">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">P<sub>A</sub>&deg; &minus; P<sub>A</sub></span>
                      <span className="px-1 pt-0.5">P<sub>A</sub>&deg;</span>
                    </div>
                  </div>
                  <span>=</span>
                  <span>i &middot; x<sub>B</sub></span>
                  <span>&asymp;</span>
                  <span>i &middot;</span>
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">n<sub>B</sub></span>
                      <span className="px-1 pt-0.5">n<sub>A</sub></span>
                    </div>
                  </div>
                  <span>=</span>
                  <span>i &middot;</span>
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">w<sub>2</sub> &middot; M<sub>1</sub></span>
                      <span className="px-1 pt-0.5">M<sub>2</sub> &middot; w<sub>1</sub></span>
                    </div>
                  </div>
                  <span className="ml-2 text-xs text-white/40 font-normal font-sans">(for dilute solutions)</span>
                </div>
              </div>
              <p className="text-[11px] text-white/50">
                Where w<sub>2</sub>, M<sub>2</sub> are mass and molar mass of solute, and w<sub>1</sub>, M<sub>1</sub> are mass and molar mass of solvent in grams.
              </p>
            </div>

            {/* Boiling Point Elevation */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-violet-400 block uppercase">2. Elevation in Boiling Point</span>
              <div className="p-1 text-xs font-semibold text-white">
                <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-semibold text-violet-200">
                  <span>&Delta;T<sub>b</sub> = i &middot; K<sub>b</sub> &middot; m</span>
                  <span className="mx-1.5 text-white/40">&rArr;</span>
                  <span>M<sub>2</sub> =</span>
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">1000 &middot; K<sub>b</sub> &middot; w<sub>2</sub></span>
                      <span className="px-1 pt-0.5">&Delta;T<sub>b</sub> &middot; w<sub>1</sub></span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-white/50">
                Where K<sub>b</sub> is the Ebullioscopic constant (depends only on the solvent's latent heat of vaporization).
              </p>
            </div>

            {/* Freezing Point Depression */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-violet-400 block uppercase">3. Depression in Freezing Point</span>
              <div className="p-1 text-xs font-semibold text-white">
                <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-semibold text-violet-200">
                  <span>&Delta;T<sub>f</sub> = i &middot; K<sub>f</sub> &middot; m</span>
                  <span className="mx-1.5 text-white/40">&rArr;</span>
                  <span>M<sub>2</sub> =</span>
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">1000 &middot; K<sub>f</sub> &middot; w<sub>2</sub></span>
                      <span className="px-1 pt-0.5">&Delta;T<sub>f</sub> &middot; w<sub>1</sub></span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-white/50">
                Where K<sub>f</sub> is the Cryoscopic constant of the solvent.
              </p>
            </div>

            {/* Osmotic Pressure */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-violet-400 block uppercase">4. Osmotic Pressure (π)</span>
              <div className="p-1 text-xs font-semibold text-white">
                <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-semibold text-violet-200">
                  <span>&pi; = i &middot; C &middot; R &middot; T</span>
                  <span className="mx-1.5 text-white/40">&rArr;</span>
                  <span>M<sub>2</sub> =</span>
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <span className="px-1 border-b border-white/20 pb-0.5">w<sub>2</sub> &middot; R &middot; T</span>
                      <span className="px-1 pt-0.5">&pi; &middot; V</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-white/50">
                Where <code className="text-white">C</code> is molarity in mol/L, <code className="text-white">R = 0.0821</code> L atm / mol K (or 8.314 J/mol K), and <code className="text-white">V</code> is volume in Liters.
              </p>
            </div>
          </div>

          <ProTip>
            <strong>Why Osmotic Pressure is Preferred for Macromolecules:</strong><br />
            Osmotic pressure is highly preferred for determining the molar masses of proteins, polymers, and biomolecules because:
            <ul className="list-disc pl-5 space-y-1 mt-1 text-white/70">
              <li>It is measured at <strong>room temperature</strong>, preventing thermal denaturation of fragile biomolecules.</li>
              <li>Its magnitude is <strong>comparatively very large and easy to measure</strong>, even for extremely dilute solutions where boiling elevation or freezing depression are too tiny to record accurately.</li>
            </ul>
          </ProTip>

          {/* Thermodynamic Relations & Common Constants Table */}
          <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <span className="text-[10px] font-black text-violet-400 tracking-wider uppercase block">Thermodynamic Relations for K_b and K_f</span>
            <p className="text-white/70 text-xs sm:text-sm">
              The ebullioscopic constant (<code className="text-white">K<sub>b</sub></code>) and cryoscopic constant (<code className="text-white">K<sub>f</sub></code>) depend solely on the thermodynamic properties of the **solvent**, and not the solute:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 bg-black/45 rounded-xl text-center space-y-1.5">
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">Boiling Constant (K<sub>b</sub>)</span>
                <div className="text-xs sm:text-sm text-cyan-300 font-semibold flex items-center justify-center gap-1.5">
                  <span>K<sub>b</sub> =</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">R &middot; (T<sub>b</sub>&deg;)<sup>2</sup> &middot; M<sub>1</sub></span>
                    <span className="px-2 pt-0.5">1000 &middot; &Delta;<sub>vap</sub>H</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/40 block">T<sub>b</sub>&deg; = pure solvent B.P., M<sub>1</sub> = solvent molar mass, &Delta;<sub>vap</sub>H = enthalpy of vaporization.</span>
              </div>
              <div className="p-3.5 bg-black/45 rounded-xl text-center space-y-1.5">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block">Freezing Constant (K<sub>f</sub>)</span>
                <div className="text-xs sm:text-sm text-rose-300 font-semibold flex items-center justify-center gap-1.5">
                  <span>K<sub>f</sub> =</span>
                  <div className="flex flex-col items-center">
                    <span className="px-2 border-b border-white/20 pb-0.5">R &middot; (T<sub>f</sub>&deg;)<sup>2</sup> &middot; M<sub>1</sub></span>
                    <span className="px-2 pt-0.5">1000 &middot; &Delta;<sub>fus</sub>H</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/40 block">T<sub>f</sub>&deg; = pure solvent F.P., M<sub>1</sub> = solvent molar mass, &Delta;<sub>fus</sub>H = enthalpy of fusion.</span>
              </div>
            </div>

            <span className="text-[10px] font-black text-violet-400 tracking-wider uppercase block pt-2">Values for Common Solvents</span>
            <div className="overflow-x-auto border border-white/5 rounded-xl">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-white font-semibold">
                    <th className="p-2">Solvent</th>
                    <th className="p-2">B.P. (T<sub>b</sub>&deg;, K)</th>
                    <th className="p-2">K<sub>b</sub> (K kg/mol)</th>
                    <th className="p-2">F.P. (T<sub>f</sub>&deg;, K)</th>
                    <th className="p-2">K<sub>f</sub> (K kg/mol)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  <tr>
                    <td className="p-2 text-white font-semibold">Water (H₂O)</td>
                    <td className="p-2">373.15</td>
                    <td className="p-2 text-cyan-300">0.52</td>
                    <td className="p-2">273.15</td>
                    <td className="p-2 text-rose-300">1.86</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-white font-semibold">Benzene (C₆H₆)</td>
                    <td className="p-2">353.3</td>
                    <td className="p-2 text-cyan-300">2.53</td>
                    <td className="p-2">278.6</td>
                    <td className="p-2 text-rose-300">5.12</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-white font-semibold">Ethanoic Acid (CH₃COOH)</td>
                    <td className="p-2">391.1</td>
                    <td className="p-2 text-cyan-300">3.07</td>
                    <td className="p-2">289.8</td>
                    <td className="p-2 text-rose-300">3.90</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-white font-semibold">Naphthalene</td>
                    <td className="p-2">491.4</td>
                    <td className="p-2 text-cyan-300">5.80</td>
                    <td className="p-2">353.4</td>
                    <td className="p-2 text-rose-300">6.90</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-white font-semibold">Camphor</td>
                    <td className="p-2">481.6</td>
                    <td className="p-2 text-cyan-300">5.95</td>
                    <td className="p-2">451.6</td>
                    <td className="p-2 text-rose-300">37.7 (Highest)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Phase Diagram for Boiling Elevation & Freezing Depression */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3 mt-4">
            <span className="text-[10px] font-black text-violet-400 tracking-wider uppercase block text-center">Solvent vs. Solution Phase Diagram (P-T Curve)</span>
            <div className="flex justify-center">
              <svg width="340" height="240" viewBox="0 0 340 240" className="w-full max-w-[340px]">
                {/* 1 atm line */}
                <line x1="40" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <text x="305" y="63" fill="rgba(255,255,255,0.4)" fontSize="8">P = 1 atm</text>

                {/* Axes */}
                <line x1="40" y1="20" x2="40" y2="200" stroke="rgba(255,255,255,0.2)" />
                <line x1="40" y1="200" x2="310" y2="200" stroke="rgba(255,255,255,0.2)" />

                {/* Curves */}
                {/* Solid Solvent curve */}
                <path d="M 40,200 C 60,180 80,140 100,100" fill="none" stroke="#93c5fd" strokeWidth="2.5" />
                
                {/* Pure Liquid Solvent curve */}
                <path d="M 100,100 C 130,80 180,65 240,50" fill="none" stroke="#3b82f6" strokeWidth="2" />
                
                {/* Solution curve (lower VP) */}
                <path d="M 80,140 C 120,115 170,95 280,75" fill="none" stroke="#a78bfa" strokeWidth="2" />

                {/* Intersection points & Vertical projection lines */}
                {/* Freezing Point Pure Solvent (Intersection of Liquid solvent and Solid solvent at (100,100)) */}
                <line x1="100" y1="100" x2="100" y2="200" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />
                <circle cx="100" cy="100" r="3" fill="#3b82f6" />
                
                {/* Freezing Point Solution (Intersection of Liquid solution and Solid solvent at (80,140)) */}
                <line x1="80" y1="140" x2="80" y2="200" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />
                <circle cx="80" cy="140" r="3" fill="#a78bfa" />

                {/* Boiling Point Pure Solvent (Intersection of Liquid solvent and 1 atm line at (200,60)) */}
                <line x1="200" y1="60" x2="200" y2="200" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />
                <circle cx="200" cy="60" r="3" fill="#3b82f6" />

                {/* Boiling Point Solution (Intersection of Liquid solution and 1 atm line at (250,60)) */}
                <line x1="250" y1="60" x2="250" y2="200" stroke="rgba(255,255,255,0.2)" strokeDasharray="2,2" />
                <circle cx="250" cy="60" r="3" fill="#a78bfa" />

                {/* Text labels inside diagram */}
                <text x="65" y="85" fill="#93c5fd" fontSize="9" fontWeight="bold">Solid Solvent</text>
                <text x="145" y="55" fill="#3b82f6" fontSize="9" fontWeight="bold">Pure Solvent</text>
                <text x="185" y="105" fill="#a78bfa" fontSize="9" fontWeight="bold">Solution</text>

                {/* X-axis labels */}
                <text x="80" y="212" fill="#a78bfa" fontSize="9" textAnchor="middle">T<tspan dy="2" fontSize="7">f</tspan></text>
                <text x="100" y="212" fill="#3b82f6" fontSize="9" textAnchor="middle">T<tspan dy="2" fontSize="7">f</tspan><tspan dy="-2">&deg;</tspan></text>
                <text x="200" y="212" fill="#3b82f6" fontSize="9" textAnchor="middle">T<tspan dy="2" fontSize="7">b</tspan><tspan dy="-2">&deg;</tspan></text>
                <text x="250" y="212" fill="#a78bfa" fontSize="9" textAnchor="middle">T<tspan dy="2" fontSize="7">b</tspan></text>

                {/* Delta indicators */}
                {/* ΔTf */}
                <path d="M 80,185 L 100,185" stroke="#f43f5e" strokeWidth="1" />
                <text x="90" y="180" fill="#f43f5e" fontSize="8" textAnchor="middle">&Delta;T<tspan dy="2" fontSize="6">f</tspan></text>

                {/* ΔTb */}
                <path d="M 200,185 L 250,185" stroke="#10b981" strokeWidth="1" />
                <text x="225" y="180" fill="#10b981" fontSize="8" textAnchor="middle">&Delta;T<tspan dy="2" fontSize="6">b</tspan></text>

                {/* Axis labels */}
                <text x="16" y="100" fill="rgba(255,255,255,0.5)" fontSize="9" transform="rotate(-90 16 100)" textAnchor="middle">Vapour Pressure (P)</text>
                <text x="175" y="232" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle">Temperature (T)</text>
              </svg>
            </div>
            <p className="text-[11px] text-white/50 text-center leading-relaxed">
              <strong>Boiling Point Elevation (&Delta;T<sub>b</sub>):</strong> Vapor pressure lowering shifts the liquid curve to the right, raising the boiling point of the solution.<br />
              <strong>Freezing Point Depression (&Delta;T<sub>f</sub>):</strong> The liquid solution curve intersects the solid solvent sublimation curve at a lower temperature, lowering the freezing point.
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 7: OSMOSIS & REVERSE OSMOSIS ─────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            7. Osmosis & Reverse Osmosis
          </h2>
          <SectionBanner label="Osmosis" color="emerald" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong className="text-white">Osmosis</strong> is the spontaneous flow of solvent molecules through a semipermeable membrane (SPM) from a region of lower solute concentration (pure solvent) to a region of higher solute concentration (solution).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-emerald-400 uppercase block">Isotonic Solutions</span>
              <p className="text-xs text-white/70">
                Solutions with the same osmotic pressure at a given temperature:
              </p>
              <div className="text-xs font-semibold text-white py-1">
                &pi;<sub>1</sub> = &pi;<sub>2</sub> &rArr; i<sub>1</sub>C<sub>1</sub> = i<sub>2</sub>C<sub>2</sub>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-rose-400 uppercase block">Hypertonic Solution</span>
              <p className="text-xs text-white/70">
                A solution that has a higher osmotic pressure than another solution (causes cells to shrink due to exosmosis).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
              <span className="text-[10px] font-black text-cyan-400 uppercase block">Hypotonic Solution</span>
              <p className="text-xs text-white/70">
                A solution that has a lower osmotic pressure than another solution (causes cells to swell/burst due to endosmosis).
              </p>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Reverse Osmosis (RO):</h3>
          <p>
            If a pressure greater than the osmotic pressure (<code className="text-white">P &gt; π</code>) is applied on the solution side, the solvent molecules begin to flow in the reverse direction—from the solution side to the pure solvent side. This is widely used for **desalination of sea water**.
          </p>

          {/* Dynamic SVG Diagram for RO */}
          <div className="bg-black/35 border border-white/5 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] font-black text-white/40 uppercase block self-start mb-2">Figure 1: Osmosis vs. Reverse Osmosis Mechanism</span>
            <svg viewBox="0 0 400 150" className="w-full max-w-[380px] overflow-visible">
              <rect x="20" y="30" width="160" height="90" fill="none" stroke="#444" strokeWidth="2" />
              <rect x="220" y="30" width="160" height="90" fill="none" stroke="#444" strokeWidth="2" />
              
              <line x1="200" y1="20" x2="200" y2="130" stroke="#06b6d4" strokeWidth="3" strokeDasharray="3,3" />
              <text x="200" y="15" fill="#06b6d4" fontSize="8" textAnchor="middle" fontWeight="bold">SPM</text>

              <rect x="22" y="50" width="156" height="68" fill="#3b82f6" fillOpacity="0.05" />
              <rect x="222" y="50" width="156" height="68" fill="#3b82f6" fillOpacity="0.2" />

              <text x="100" y="70" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">Pure Solvent (Water)</text>
              <text x="300" y="70" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">Concentrated Solution</text>
              <text x="300" y="82" fill="#a78bfa" fontSize="8" textAnchor="middle">e.g., Salt Water</text>

              <rect x="260" y="25" width="80" height="8" fill="#ec4899" />
              <text x="300" y="20" fill="#ec4899" fontSize="9" textAnchor="middle" fontWeight="bold">Applied P &gt; π</text>
              
              <path d="M 240 90 L 160 90" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
              <text x="200" y="102" fill="#10b981" fontSize="8" textAnchor="middle" fontWeight="bold">Solvent Flow in RO</text>

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* ── SECTION 8: ABNORMAL MOLAR MASSES & VAN'T HOFF FACTOR ─────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-400" />
            8. Abnormal Molar Masses & Degree of Reactions
          </h2>
          <SectionBanner label="Van't Hoff" color="rose" />
        </div>

        <div className="space-y-4 text-white/80 text-xs sm:text-sm leading-relaxed">
          <p>
            When solutes undergo association or dissociation in solution, the calculated molar mass from colligative properties differs from the actual molar mass. This is called the <strong className="text-white">abnormal molar mass</strong>.
          </p>

          <div className="p-4 bg-black/45 rounded-xl text-xs text-white space-y-4">
            <div className="flex flex-col items-center justify-center gap-4 text-xs font-semibold">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="mr-1.5">i =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">Observed Colligative Property</span>
                  <span className="px-2 pt-0.5">Calculated Colligative Property</span>
                </div>
                <span className="mx-2">=</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">Normal (Theoretical) Molar Mass</span>
                  <span className="px-2 pt-0.5">Abnormal (Observed) Molar Mass</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5 w-full">
                <span className="mr-1.5">i =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-white/20 pb-0.5">Total Moles of Particles After Association/Dissociation</span>
                  <span className="px-2 pt-0.5">Total Moles of Particles Before</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Degree of Dissociation (α):</h3>
          <p>
            For a solute that dissociates into <code className="text-white">n</code> ions (e.g., NaCl ➔ n=2, K₂SO₄ ➔ n=3):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center text-white text-xs flex items-center justify-center font-semibold">
              i = 1 + (n &minus; 1)&alpha;
            </div>
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-center text-emerald-300 text-xs flex items-center justify-center font-semibold">
              <div className="flex items-center justify-center gap-1.5">
                <span>&alpha; =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-emerald-500/20 pb-0.5">i &minus; 1</span>
                  <span className="px-2 pt-0.5">n &minus; 1</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-white pt-2">Degree of Association (α):</h3>
          <p>
            For a solute that associates (dimerizes, trimerizes) in solution (e.g., acetic acid in benzene ➔ n=2):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center text-white text-xs flex items-center justify-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                <span>i = 1 + </span>
                <span className="text-sm font-light">(</span>
                <div className="flex flex-col items-center">
                  <span className="px-1 border-b border-white/20 pb-0.5">1</span>
                  <span className="px-1 pt-0.5">n</span>
                </div>
                <span className="mx-1">&minus; 1</span>
                <span className="text-sm font-light">)</span>
                <span>&alpha;</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-center text-emerald-300 text-xs flex items-center justify-center font-semibold">
              <div className="flex items-center justify-center gap-1">
                <span>&alpha; =</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-emerald-500/20 pb-0.5">1 &minus; i</span>
                  <span className="px-2 pt-0.5">1 &minus; 1/n</span>
                </div>
                <span className="mx-1.5">=</span>
                <div className="flex flex-col items-center">
                  <span className="px-2 border-b border-emerald-500/20 pb-0.5">n(1 &minus; i)</span>
                  <span className="px-2 pt-0.5">n &minus; 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SIMULATOR 2: COLLIGATIVE PROPERTY & MOLAR MASS CALCULATOR ───────── */}
      <div className="bg-[#070913] border border-white/8 rounded-3xl p-5 sm:p-6 space-y-6">
        <div>
          <span className="text-cyan-400 text-[10px] font-black tracking-widest uppercase block mb-1">Interactive Lab 2</span>
          <h3 className="text-white font-bold text-lg">Colligative Property & Molar Mass Calculator</h3>
          <p className="text-white/50 text-xs mt-1">
            Simulate molality, freezing/boiling shifts, and osmotic pressures for ideal vs. electrolytic solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-1 bg-white/[0.01] border border-white/5 p-4 rounded-2xl text-xs">
            <h4 className="text-[11px] font-bold text-white tracking-wide uppercase">Setup Variables</h4>

            {/* Select Solvent */}
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 font-bold block">Solvent</label>
              <select 
                value={solvent} 
                onChange={(e) => setSolvent(e.target.value as any)}
                className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="water">Water (Kf=1.86, Kb=0.52)</option>
                <option value="benzene">Benzene (Kf=5.12, Kb=2.53)</option>
              </select>
            </div>

            {/* Solute Mass w2 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-white/50 font-bold">Solute Mass (w<sub>2</sub>)</span>
                <span className="text-white font-mono">{w2} g</span>
              </div>
              <input 
                type="number"
                step="0.05"
                value={w2}
                onChange={(e) => setW2(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
                className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Solvent Mass w1 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-white/50 font-bold">Solvent Mass (w<sub>1</sub>)</span>
                <span className="text-white font-mono">{w1} g</span>
              </div>
              <input 
                type="number"
                step="5"
                value={w1}
                onChange={(e) => setW1(Math.max(1, parseFloat(e.target.value) || 100))}
                className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Solute Type */}
            <div className="space-y-1">
              <label className="text-[10px] text-white/50 font-bold block">Solute Electrolyte Behavior</label>
              <select 
                value={soluteType} 
                onChange={(e) => setSoluteType(e.target.value as any)}
                className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="none">Non-electrolyte (i = 1)</option>
                <option value="dissociation">Dissociation (e.g. NaCl, CaCl2)</option>
                <option value="association">Association (Dimerization)</option>
              </select>
            </div>

            {/* Show Dissociation Parameters if selected */}
            {soluteType !== 'none' && (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/50 font-bold">Degree of Reaction (α)</span>
                    <span className="text-cyan-400 font-mono font-bold">{alpha}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={alpha} 
                    onChange={(e) => setAlpha(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 bg-white/10 h-1 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 font-bold block">n (Number of Ions/Dimer particles)</label>
                  <select 
                    value={nVal} 
                    onChange={(e) => setNVal(parseInt(e.target.value))}
                    className="w-full bg-black border border-white/10 rounded-xl p-2 text-white focus:outline-none"
                  >
                    <option value="2">2 (e.g. NaCl, Benzoic acid dimer)</option>
                    <option value="3">3 (e.g. K2SO4, CaCl2)</option>
                    <option value="4">4 (e.g. FeCl3)</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="md:col-span-2 space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="text-[10px] font-black text-rose-400 uppercase block tracking-wider">Calculated Van't Hoff & Molality</span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-white/40 block text-[10px]">Van't Hoff Factor (i)</span>
                  <span className="font-mono text-white text-base font-bold">{iFactor.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Solution Molality (m)</span>
                  <span className="font-mono text-white text-base font-bold">{molality.toFixed(4)} mol/kg</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-3">
              <span className="text-[10px] font-black text-cyan-400 uppercase block tracking-wider">Calculated Colligative Effects</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-white/50 block text-[10px]">Boiling Point Shift</span>
                  <p className="text-xs text-white/70">
                    &Delta;T<sub>b</sub>: <span className="font-mono text-white font-bold">+{deltaTb.toFixed(3)} °C</span>
                  </p>
                  <p className="text-xs text-white/40">
                    New B.P.: {newTb.toFixed(3)} °C
                  </p>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Freezing Point Shift</span>
                  <p className="text-xs text-white/70">
                    &Delta;T<sub>f</sub>: <span className="font-mono text-white font-bold">-{deltaTf.toFixed(3)} °C</span>
                  </p>
                  <p className="text-xs text-white/40">
                    New F.P.: {newTf.toFixed(3)} °C
                  </p>
                </div>
                <div>
                  <span className="text-white/50 block text-[10px]">Osmotic Pressure (298K)</span>
                  <p className="text-xs text-white/70">
                    π: <span className="font-mono text-cyan-300 font-bold">{piVal.toFixed(2)} atm</span>
                  </p>
                  <p className="text-xs text-white/40">
                    ≈ {(piVal * 1.01325).toFixed(2)} bar
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-2">
              <span className="text-[10px] font-black text-white/40 uppercase block tracking-wider">Step-by-step Math Explanation</span>
              <div className="text-[11px] leading-relaxed text-white/70 space-y-1.5 font-semibold">
                <div>1. Molality = (w<sub>2</sub> / M<sub>2</sub>) / (w<sub>1</sub> / 1000) = ({w2} / {m2}) / ({w1} / 1000) = {molality.toFixed(4)} mol/kg</div>
                <div>2. &Delta;T<sub>f</sub> = i &middot; K<sub>f</sub> &middot; m = {iFactor.toFixed(3)} &middot; {Kf} &middot; {molality.toFixed(4)} = {deltaTf.toFixed(4)} &deg;C</div>
                <div>3. Observed Freezing Point = T<sub>f, pure</sub> &minus; &Delta;T<sub>f</sub> = {Tf_pure} &minus; {deltaTf.toFixed(4)} = {newTf.toFixed(4)} &deg;C</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 9: SOLVED PROBLEMS ──────────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            9. Solved Advanced Problems
          </h2>
          <SectionBanner label="Practice" color="emerald" />
        </div>

        <div className="space-y-6 text-xs sm:text-sm">
          {/* Problem 1 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 1: Parts Per Million (ppm)</Tag>
            <p className="text-white font-bold">
              A sample of drinking water is found to be severely contaminated with chloroform (CHCl₃), supposed to be carcinogenic in nature. The level of contamination was 15 ppm (by mass). Express this in percent by mass and calculate the molality of chloroform in the water.
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. 15 ppm means 15 grams of CHCl₃ is present in 10⁶ grams of solution.</div>
              <div>2. Percent by mass = (15 / 10⁶) * 100 = 1.5 * 10⁻³ % (or 0.0015%).</div>
              <div>3. Mass of solvent (water) ≈ 10⁶ g (since solute is extremely small).</div>
              <div>4. Moles of CHCl₃ = 15 / Molar Mass (12 + 1 + 3 * 35.5) = 15 / 119.5 = 0.1255 moles.</div>
              <div>5. Molality (m) = Moles / Solvent Mass (kg) = 0.1255 / (10⁶ / 1000) = 0.1255 / 1000 = 1.25 * 10⁻⁴ mol/kg.</div>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 2: Molality of KI Solution</Tag>
            <p className="text-white font-bold">
              Calculate the molality of a 20% (w/w) aqueous KI solution if the density of the solution is 1.202 g/mL. (Molar mass of KI = 166 g/mol)
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. 20% w/w means 20 g of KI is present in 100 g of solution.</div>
              <div>2. Mass of solvent (water) = 100 g - 20 g = 80 g.</div>
              <div>3. Moles of KI = 20 / 166 = 0.1205 mol.</div>
              <div>4. Molality (m) = Moles of solute / Mass of solvent (kg) = 0.1205 / (80 / 1000) = 0.1205 / 0.08 = 1.506 mol/kg.</div>
              <div>Note: The density (1.202 g/mL) is only needed if you are asked to calculate Molarity or Normality. Make sure to keep solvent mass in kg.</div>
            </div>
          </div>

          {/* Problem 3 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 3: Vapor Pressure Calculation</Tag>
            <p className="text-white font-bold">
              Vapour pressure of chloroform (CHCl₃) and dichloromethane (CH₂Cl₂) at 298 K are 200 mmHg and 415 mmHg respectively. Calculate the vapour pressure of a solution prepared by mixing 25.5 g of CHCl₃ and 40 g of CH₂Cl₂ at 298 K, and find the mole fraction of each component in the vapour phase.
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Molar Mass of CHCl₃ = 119.5 g/mol. Moles = 25.5 / 119.5 = 0.213 mol.</div>
              <div>2. Molar Mass of CH₂Cl₂ = 85 g/mol. Moles = 40 / 85 = 0.47 mol.</div>
              <div>3. Mole fractions in liquid:</div>
              <div>   x(CH₂Cl₂) = 0.47 / (0.213 + 0.47) = 0.688</div>
              <div>   x(CHCl₃) = 1 - 0.688 = 0.312</div>
              <div>4. P<sub>total</sub> = x<sub>A</sub> &middot; P<sub>A</sub>&deg; + x<sub>B</sub> &middot; P<sub>B</sub>&deg; = 0.312 * 200 + 0.688 * 415 = 62.4 + 285.5 = 347.9 mmHg.</div>
              <div>5. Mole fractions in Vapour Phase (y):</div>
              <div>   y(CH₂Cl₂) = P(CH₂Cl₂) / P<sub>total</sub> = 285.5 / 347.9 = 0.82</div>
              <div>   y(CHCl₃) = 62.4 / 347.9 = 0.18</div>
              <div>Insight: The vapor phase is richer in dichloromethane (y<sub>B</sub> = 0.82) than the liquid phase (x<sub>B</sub> = 0.688) since it is more volatile.</div>
            </div>
          </div>

          {/* Problem 4 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 4: Molar Mass by Osmotic Pressure</Tag>
            <p className="text-white font-bold">
              200 cm³ of an aqueous solution of a protein contains 1.26 g of the protein. The osmotic pressure of such a solution at 300 K is found to be 2.57 × 10⁻³ bar. Calculate the molar mass of the protein. (R = 0.083 L bar / mol K)
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Volume = 200 cm³ = 0.2 L. Mass of solute = 1.26 g.</div>
              <div>2. π = 2.57 × 10⁻³ bar. Temp = 300 K.</div>
              <div>3. Formula: π = C * R * T = (w2 / M2) * (R * T / V)</div>
              <div>4. M2 = (w2 * R * T) / (π * V)</div>
              <div>5. M2 = (1.26 * 0.083 * 300) / (2.57 × 10⁻³ * 0.2)</div>
              <div>6. M2 = 31.374 / 0.000514 ≈ 61,038 g/mol.</div>
            </div>
          </div>

          {/* Problem 5 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 5: Weak Acid Dissociation</Tag>
            <p className="text-white font-bold">
              A 0.5% (w/w) aqueous solution of a monobasic weak acid HA (Molar Mass = 60 g/mol) freezes at −0.155 °C. Calculate the degree of dissociation (α) of the acid. (Kf of water = 1.86 K kg/mol)
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. 0.5% w/w means 0.5 g HA in 99.5 g of water solvent (w1 = 99.5 g).</div>
              <div>2. Theoretical molality (m) = (0.5 / 60) / (99.5 / 1000) = 0.00833 / 0.0995 = 0.0837 mol/kg.</div>
              <div>3. Calculated freezing depression &Delta;T<sub>f</sub> (theoretical) = K<sub>f</sub> &middot; m = 1.86 * 0.0837 = 0.1557 °C.</div>
              <div>4. Observed freezing depression &Delta;T<sub>f</sub> (observed) = 0.155 °C.</div>
              <div>5. i = Observed / Calculated = 0.155 / 0.1557 ≈ 0.995.</div>
              <div>6. For a monobasic acid HA ⇌ H⁺ + A⁻, n = 2. α = i - 1. Therefore, α ≈ 0 under these conditions (acid is barely dissociated).</div>
            </div>
          </div>

          {/* Problem 6 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 6: Boiling Point Elevation of NaCl</Tag>
            <p className="text-white font-bold">
              Calculate the boiling point of a solution containing 2 g of NaCl (Molar Mass = 58.5 g/mol) in 100 g of water, assuming complete dissociation of NaCl. (Kb of water = 0.52 K kg/mol)
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Complete dissociation of NaCl ➔ NaCl ➔ Na⁺ + Cl⁻. Therefore, Van't Hoff factor i = 2.</div>
              <div>2. Molality m = (2 / 58.5) / (100 / 1000) = 0.0342 / 0.1 = 0.342 mol/kg.</div>
              <div>3. &Delta;T<sub>b</sub> = i &middot; K<sub>b</sub> &middot; m = 2 * 0.52 * 0.342 = 0.356 °C.</div>
              <div>4. New Boiling Point = 100 °C + 0.356 °C = 100.356 °C.</div>
            </div>
          </div>

          {/* Problem 7 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 7: Degree of Association of Benzoic Acid</Tag>
            <p className="text-white font-bold">
              2 g of benzoic acid (C₆H₅COOH) dissolved in 25 g of benzene shows a depression in freezing point equal to 1.62 K. Molal depression constant (Kf) of benzene is 4.9 K kg/mol. What is the percentage association of acid if it forms dimer in solution?
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Solute weight w2 = 2 g. Solvent weight w1 = 25 g. Kf = 4.9.</div>
              <div>2. Molar mass of Benzoic acid (C₇H₆O₂) = 122 g/mol.</div>
              <div>3. Calculated molality m = (2 / 122) / (25 / 1000) = 0.01639 / 0.025 = 0.656 mol/kg.</div>
              <div>4. Calculated depression &Delta;T<sub>f</sub> (calc) = K<sub>f</sub> &middot; m = 4.9 * 0.656 = 3.214 K.</div>
              <div>5. Observed depression = 1.62 K.</div>
              <div>6. i = Observed / Calculated = 1.62 / 3.214 = 0.504</div>
              <div>7. Benzoic acid dimers: 2C₆H₅COOH ⇌ (C₆H₅COOH)₂. Thus, n = 2.</div>
              <div>8. α = n(1 - i) / (n - 1) = 2(1 - 0.504) / (2 - 1) = 2 * 0.496 = 0.992 or 99.2%.</div>
            </div>
          </div>

          {/* Problem 8 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 8: Henry's Law Solubility</Tag>
            <p className="text-white font-bold">
              If N₂ gas is bubbled through water at 293 K, how many millimoles of N₂ gas would dissolve in 1 liter of water? Assume N₂ exerts a partial pressure of 0.987 bar. Given that Henry's law constant for N₂ at 293 K is 76.48 kbar.
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. p(N₂) = 0.987 bar. KH = 76.48 kbar = 76,480 bar.</div>
              <div>2. Mole fraction of N₂ in solution: x(N₂) = p / KH = 0.987 / 76,480 = 1.29 × 10⁻⁵.</div>
              <div>3. In 1 L of water, mass = 1000 g. Moles of water (n1) = 1000 / 18 = 55.5 moles.</div>
              <div>4. x(N₂) = n(N₂) / (n(N₂) + 55.5) ≈ n(N₂) / 55.5 (since n(N₂) is tiny).</div>
              <div>5. n(N₂) = 1.29 × 10⁻⁵ * 55.5 = 7.16 × 10⁻⁴ moles = 0.716 millimoles.</div>
            </div>
          </div>

          {/* Problem 9 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 9: Raoult's Law with Non-Volatile Solute</Tag>
            <p className="text-white font-bold">
              Calculate the vapour pressure of a 5% (by mass) aqueous solution of glucose (C₆H₁₂O₆, Molar Mass = 180 g/mol) at 373 K. The vapour pressure of pure water at 373 K is 760 mmHg.
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. 5% by mass means 5 g glucose in 100 g solution. Mass of water solvent (w1) = 100 g - 5 g = 95 g.</div>
              <div>2. Moles of glucose (n2) = 5 / 180 = 0.0278 moles.</div>
              <div>3. Moles of water solvent (n1) = 95 / 18 = 5.278 moles.</div>
              <div>4. Mole fraction of solvent (x1) = n1 / (n1 + n2) = 5.278 / (5.278 + 0.0278) = 5.278 / 5.3058 = 0.9948.</div>
              <div>5. Vapour pressure of solution (P<sub>solution</sub>) = x<sub>1</sub> &middot; P&deg; = 0.9948 * 760 mmHg = 756 mmHg.</div>
              <div>Note: Alternatively, using RLVP: (760 &minus; P<sub>solution</sub>)/760 = x<sub>2</sub> = 0.0278/5.3058 = 0.00524. Thus, &Delta;P = 760 * 0.00524 = 3.98 mmHg. P<sub>solution</sub> = 760 &minus; 3.98 &asymp; 756 mmHg.</div>
            </div>
          </div>

          {/* Problem 10 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 10: Vapour and Liquid Phase Composition Match</Tag>
            <p className="text-white font-bold">
              Vapour pressures of pure components A and B at 350 K are 300 mmHg and 800 mmHg respectively. If they form an ideal solution, calculate the liquid phase composition (<i>x</i><sub>A</sub>) at which the vapour phase mole fraction of A is 0.4.
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Given: P&deg;<sub>A</sub> = 300 mmHg, P&deg;<sub>B</sub> = 800 mmHg, y<sub>A</sub> = 0.4.</div>
              <div>2. From Raoult's Law: P<sub>A</sub> = x<sub>A</sub> &middot; P&deg;<sub>A</sub> = 300 &middot; x<sub>A</sub>.</div>
              <div>3. P<sub>total</sub> = x<sub>A</sub> &middot; P&deg;<sub>A</sub> + (1 &minus; x<sub>A</sub>) &middot; P&deg;<sub>B</sub> = 300 &middot; x<sub>A</sub> + 800 &middot; (1 &minus; x<sub>A</sub>) = 800 &minus; 500 &middot; x<sub>A</sub>.</div>
              <div>4. Vapour composition formula: y<sub>A</sub> = P<sub>A</sub> / P<sub>total</sub>.</div>
              <div>5. Substitute values: 0.4 = (300 &middot; x<sub>A</sub>) / (800 &minus; 500 &middot; x<sub>A</sub>)</div>
              <div>6. Solve for <i>x</i><sub>A</sub>: 0.4 &middot; (800 &minus; 500 &middot; x<sub>A</sub>) = 300 &middot; x<sub>A</sub> &rArr; 320 &minus; 200 &middot; x<sub>A</sub> = 300 &middot; x<sub>A</sub> &rArr; 320 = 500 &middot; x<sub>A</sub> &rArr; <i>x</i><sub>A</sub> = 320 / 500 = 0.64.</div>
              <div>Concept Insight: Since B is more volatile (P&deg;<sub>B</sub> &gt; P&deg;<sub>A</sub>), the vapour phase is richer in B than the liquid phase (y<sub>B</sub> = 0.60 &gt; x<sub>B</sub> = 0.36). At azeotropic state (x<sub>A</sub> = y<sub>A</sub>), but this is impossible for an ideal system since pure vapor pressures differ. Azeotropes require non-ideal systems with strong deviation.</div>
            </div>
          </div>

          {/* Problem 11 */}
          <div className="p-4.5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-2.5">
            <Tag color="cyan">Problem 11: Boiling Point Elevation & Dimerization</Tag>
            <p className="text-white font-bold">
              2 g of ethanoic acid (CH₃COOH, Molar Mass = 60 g/mol) dissolved in 25 g of benzene shows an elevation in boiling point of 1.84 K. Given that Kb of benzene is 2.53 K kg/mol, determine the degree of association (α) of ethanoic acid if it dimerizes in benzene.
            </p>
            <div className="p-3.5 bg-black/45 rounded-xl font-mono text-xs text-emerald-400 space-y-1 leading-relaxed">
              <span className="text-white font-bold block mb-1">Detailed Solution:</span>
              <div>1. Given: w2 = 2 g, M2 (normal) = 60 g/mol, w1 = 25 g, Kb = 2.53, ΔTb (observed) = 1.84 K.</div>
              <div>2. Calculate theoretical molality: m = (2 / 60) / (25 / 1000) = 0.0333 / 0.025 = 1.333 mol/kg.</div>
              <div>3. Calculate theoretical boiling elevation: ΔTb (calc) = Kb * m = 2.53 * 1.333 = 3.373 K.</div>
              <div>4. Calculate Van't Hoff factor (i): i = ΔTb (observed) / ΔTb (calc) = 1.84 / 3.373 = 0.545.</div>
              <div>5. Ethanoic acid forms a dimer: 2CH₃COOH ⇌ (CH₃COOH)₂. Thus, n = 2 (two molecules associate into one).</div>
              <div>6. Degree of association formula: α = n(1 - i) / (n - 1).</div>
              <div>7. Substitute values: α = 2 * (1 - 0.545) / (2 - 1) = 2 * 0.455 = 0.91 or 91%.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COMMON MISTAKES & EXAM TRAPS ───────────────────────────────────── */}
      <div className="bg-[#070913] border border-white/5 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400" />
            Common Mistakes & Exam Traps
          </h2>
          <SectionBanner label="Traps" color="rose" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-1.5">
            <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase block">Molality Solvent Trap</span>
            <p className="text-white/70">
              When calculating molality, make sure to divide by the **mass of the solvent in kg**, not the total mass of the solution!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-1.5">
            <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase block">Temperature Dependence Trap</span>
            <p className="text-white/70">
              Molarity, Normality, and volume percentages change with temperature. Molality, mass percentage, and mole fractions are temperature-independent.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-1.5">
            <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase block">Osmotic absolute Temp</span>
            <p className="text-white/70">
              Always convert the temperature to **Kelvin** when using <code className="text-white">π = iCRT</code>. Using Celsius is the most common source of numeric errors.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 space-y-1.5">
            <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase block">Van't Hoff dissociation</span>
            <p className="text-white/70">
              Always check if the solute is an electrolyte. If Na₂SO₄ is 100% dissociated, use <code className="text-white">i = 3</code> instead of <code className="text-white">i = 1</code>.
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-center text-xs text-white/40 pt-4 border-t border-white/5">
        <span>Solutions & Colligative Properties · Unit 2</span>
        <button 
          onClick={() => onNavigate?.('smart_lessons')}
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Back to Lessons <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
}
