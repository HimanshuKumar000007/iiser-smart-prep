import React, { useState } from 'react';
import {
  Star, AlertTriangle, Zap, BookOpen, FlaskConical,
  Atom, BarChart3, RefreshCw, ChevronDown, ChevronUp, Layers, HelpCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SHARED HELPERS ──────────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' | 'orange' | 'pink' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    orange:  'bg-orange-500/10 border-orange-500/20 text-orange-400',
    pink:    'bg-pink-500/10 border-pink-500/20 text-pink-400',
  };
  return <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold uppercase tracking-wider ${styles[color]}`}>{children}</span>;
}

function SectionBanner({ label, color = 'cyan' }: { label: string; color?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' }) {
  const c: Record<string, string> = { 
    cyan: 'bg-cyan-400 text-cyan-400', 
    violet: 'bg-violet-400 text-violet-400', 
    emerald: 'bg-emerald-400 text-emerald-400', 
    amber: 'bg-amber-400 text-amber-400', 
    rose: 'bg-rose-400 text-rose-400' 
  };
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${c[color].split(' ')[0]}`} />
      <span className={`text-[11px] font-black tracking-widest uppercase ${c[color].split(' ')[1]}`}>{label}</span>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-rose-400 uppercase tracking-wider">Exam Trap</span>
      </div>
      <div className="text-white/70 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

// IAT Shortcut Banner
function ExamTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-amber-400 uppercase tracking-wider">IAT Shortcut</span>
      </div>
      <div className="text-white/75 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-[12.5px] font-extrabold text-cyan-400 uppercase tracking-wider">Professor's Perspective</span>
      </div>
      <div className="text-white/75 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

function Collapsible({ title, icon, children, defaultOpen = true, accent = 'cyan' }:
  { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean; accent?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' }) {
  const [open, setOpen] = useState(defaultOpen);
  const accents: Record<string, string> = {
    cyan: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-300',
    violet: 'border-violet-500/20 bg-violet-500/5 text-violet-300',
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
    amber: 'border-amber-500/20 bg-amber-500/5 text-amber-300',
    rose: 'border-rose-500/20 bg-rose-500/5 text-rose-300',
  };
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-white/3 transition-colors">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg border ${accents[accent]}`}>{icon}</div>
          <span className="text-[15px] font-bold text-white text-left">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 space-y-4">{children}</div>}
    </div>
  );
}

function SolvedProblem({ title, question, solution }: { title: string; question: string; solution: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-white/3 border border-white/8 space-y-3">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-[12.5px] font-black text-emerald-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-[13px] text-white/90 font-bold leading-relaxed">{question}</div>
      <div className="p-4 rounded-xl bg-[#060814] border border-white/5 text-[12.5px] text-white/70 space-y-2 leading-relaxed font-mono">
        <div className="text-emerald-300 font-bold text-[11px] uppercase tracking-wider mb-1">Detailed Solution:</div>
        {solution}
      </div>
    </div>
  );
}

// ─── WIDGET 1: pH CALCULATOR ───────────────────────────────────────────────
function PhCalculator() {
  const [type, setType] = useState<'sa' | 'sb' | 'wa' | 'wb' | 'ab' | 'bb'>('sa');
  const [conc, setConc] = useState(0.01);
  const [kaPka, setKaPka] = useState(4.75); // for weak acid/buffers
  const [kbPkb, setKbPkb] = useState(4.75); // for weak base/buffers
  const [saltConc, setSaltConc] = useState(0.05); // for buffers

  let pH = 7.00;
  let steps: string[] = [];

  const Kw = 1e-14;

  if (type === 'sa') {
    // Strong Acid
    if (conc <= 0) {
      pH = 7;
      steps.push('Concentration = 0 M. Pure water pH = 7.00');
    } else if (conc < 1e-6) {
      // Extremely dilute case
      const hPlus = (conc + Math.sqrt(conc * conc + 4 * Kw)) / 2;
      pH = -Math.log10(hPlus);
      steps.push(`Extremely dilute Strong Acid (< 10⁻⁶ M). Water auto-ionization must be included.`);
      steps.push(`Quadratic relation: [H⁺]² − C_a[H⁺] − K_w = 0`);
      steps.push(`Solving for [H⁺]: C_a = ${conc.toExponential(3)} M`);
      steps.push(`[H⁺] = (${conc.toExponential(3)} + √(${conc.toExponential(3)}² + 4 × 10⁻¹⁴)) / 2 = ${hPlus.toExponential(4)} M`);
      steps.push(`pH = −log(${hPlus.toExponential(4)}) = ${pH.toFixed(2)}`);
    } else {
      pH = -Math.log10(conc);
      steps.push(`Strong Acid dissociates completely: [H⁺] = C_a = ${conc} M`);
      steps.push(`pH = −log([H⁺]) = −log(${conc}) = ${pH.toFixed(2)}`);
    }
  } else if (type === 'sb') {
    // Strong Base
    if (conc <= 0) {
      pH = 7;
      steps.push('Concentration = 0 M. Pure water pH = 7.00');
    } else if (conc < 1e-6) {
      const ohMinus = (conc + Math.sqrt(conc * conc + 4 * Kw)) / 2;
      const pOH = -Math.log10(ohMinus);
      pH = 14 - pOH;
      steps.push(`Extremely dilute Strong Base (< 10⁻⁶ M). Water auto-ionization included.`);
      steps.push(`Quadratic: [OH⁻]² − C_b[OH⁻] − K_w = 0`);
      steps.push(`[OH⁻] = ${ohMinus.toExponential(4)} M → pOH = ${pOH.toFixed(2)}`);
      steps.push(`pH = 14 − pOH = ${pH.toFixed(2)}`);
    } else {
      const pOH = -Math.log10(conc);
      pH = 14 - pOH;
      steps.push(`Strong Base dissociates completely: [OH⁻] = C_b = ${conc} M`);
      steps.push(`pOH = −log([OH⁻]) = −log(${conc}) = ${pOH.toFixed(2)}`);
      steps.push(`pH = 14 − pOH = 14 − ${pOH.toFixed(2)} = ${pH.toFixed(2)}`);
    }
  } else if (type === 'wa') {
    // Weak Acid
    const Ka = Math.pow(10, -kaPka);
    const alpha = Math.sqrt(Ka / conc);
    if (alpha < 0.05) {
      const hPlus = Math.sqrt(Ka * conc);
      pH = -Math.log10(hPlus);
      steps.push(`Weak Acid. α = √(K_a / C) = √(${Ka.toExponential(2)} / ${conc}) = ${alpha.toFixed(4)}`);
      steps.push(`Since α < 0.05 (5%), the weak-ionization approximation holds: 1 − α ≈ 1`);
      steps.push(`[H⁺] ≈ √(K_a × C) = √(${Ka.toExponential(2)} × ${conc}) = ${hPlus.toExponential(4)} M`);
      steps.push(`pH = 0.5 × (pK_a − log C) = 0.5 × (${kaPka} − log(${conc})) = ${pH.toFixed(2)}`);
    } else {
      // Solve quadratic: H^2 + Ka H - Ka C = 0
      const hPlus = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * conc)) / 2;
      const exactAlpha = hPlus / conc;
      pH = -Math.log10(hPlus);
      steps.push(`Weak Acid. Approximate α = ${alpha.toFixed(3)} ≥ 0.05. Using exact quadratic equation:`);
      steps.push(`[H⁺]² + K_a[H⁺] − K_a C = 0`);
      steps.push(`Solving for [H⁺] yields: [H⁺] = ${hPlus.toExponential(4)} M`);
      steps.push(`Exact dissociation degree: α = ${exactAlpha.toFixed(4)}`);
      steps.push(`pH = −log([H⁺]) = ${pH.toFixed(2)}`);
    }
  } else if (type === 'wb') {
    // Weak Base
    const Kb = Math.pow(10, -kbPkb);
    const alpha = Math.sqrt(Kb / conc);
    if (alpha < 0.05) {
      const ohMinus = Math.sqrt(Kb * conc);
      const pOH = -Math.log10(ohMinus);
      pH = 14 - pOH;
      steps.push(`Weak Base. α = √(K_b / C) = √(${Kb.toExponential(2)} / ${conc}) = ${alpha.toFixed(4)}`);
      steps.push(`Since α < 0.05, the approximation holds: 1 − α ≈ 1`);
      steps.push(`[OH⁻] ≈ √(K_b × C) = ${ohMinus.toExponential(4)} M`);
      steps.push(`pOH = 0.5 × (pK_b − log C) = ${pOH.toFixed(2)}`);
      steps.push(`pH = 14 − pOH = ${pH.toFixed(2)}`);
    } else {
      const ohMinus = (-Kb + Math.sqrt(Kb * Kb + 4 * Kb * conc)) / 2;
      const pOH = -Math.log10(ohMinus);
      pH = 14 - pOH;
      steps.push(`Weak Base. Approximate α = ${alpha.toFixed(3)} ≥ 0.05. Using exact quadratic equation:`);
      steps.push(`[OH⁻]² + K_b[OH⁻] − K_b C = 0`);
      steps.push(`Solving for [OH⁻] yields: [OH⁻] = ${ohMinus.toExponential(4)} M`);
      steps.push(`pOH = −log([OH⁻]) = ${pOH.toFixed(2)}`);
      steps.push(`pH = 14 − pOH = ${pH.toFixed(2)}`);
    }
  } else if (type === 'ab') {
    // Acidic Buffer
    pH = kaPka + Math.log10(saltConc / conc);
    steps.push(`Acidic Buffer (Weak Acid + Conjugate Base)`);
    steps.push(`Henderson-Hasselbalch equation: pH = pK_a + log([Salt]/[Acid])`);
    steps.push(`pH = ${kaPka} + log(${saltConc} / ${conc})`);
    steps.push(`pH = ${kaPka} + log(${ (saltConc / conc).toFixed(3) }) = ${kaPka} + ${Math.log10(saltConc / conc).toFixed(2)} = ${pH.toFixed(2)}`);
  } else {
    // Basic Buffer
    const pOH = kbPkb + Math.log10(saltConc / conc);
    pH = 14 - pOH;
    steps.push(`Basic Buffer (Weak Base + Conjugate Acid)`);
    steps.push(`Henderson-Hasselbalch equation: pOH = pK_b + log([Salt]/[Base])`);
    steps.push(`pOH = ${kbPkb} + log(${saltConc} / ${conc}) = ${pOH.toFixed(2)}`);
    steps.push(`pH = 14 − pOH = 14 − ${pOH.toFixed(2)} = ${pH.toFixed(2)}`);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Solution Type Selection */}
        <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
          <label className="text-[10px] text-white/30 uppercase tracking-wider block">Solution Type</label>
          <select value={type} onChange={e => setType(e.target.value as any)}
            className="w-full bg-[#0d1220] border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-cyan-500/40">
            <option value="sa">Strong Acid (e.g. HCl)</option>
            <option value="sb">Strong Base (e.g. NaOH)</option>
            <option value="wa">Weak Acid (e.g. CH₃COOH)</option>
            <option value="wb">Weak Base (e.g. NH₃)</option>
            <option value="ab">Acidic Buffer (Acid + Salt)</option>
            <option value="bb">Basic Buffer (Base + Salt)</option>
          </select>
        </div>

        {/* Concentration Inputs */}
        <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
          <div className="flex justify-between text-[10px] text-white/30 uppercase">
            <span>{type.includes('b') && !type.includes('wb') ? 'Base Conc (C_b)' : 'Acid/Base Conc (C)'}</span>
            <span className="font-mono text-white font-bold">{conc} M</span>
          </div>
          <input type="range" min="-5" max="-1" step="0.1" value={Math.log10(conc)}
            onChange={e => setConc(parseFloat(Math.pow(10, parseFloat(e.target.value)).toFixed(6)))}
            className="w-full accent-cyan-400" />
          <div className="flex justify-between text-[9px] text-white/20">
            <span>Dilute (10⁻⁵ M)</span>
            <span>Concentrated (0.1 M)</span>
          </div>
        </div>

        {/* Dynamic Parameter: pKa / pKb or Salt Conc */}
        <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2">
          {type === 'wa' || type === 'ab' ? (
            <>
              <div className="flex justify-between text-[10px] text-white/30 uppercase">
                <span>Acid pK_a</span>
                <span className="font-mono text-white font-bold">{kaPka.toFixed(2)}</span>
              </div>
              <input type="range" min="1" max="10" step="0.05" value={kaPka} onChange={e => setKaPka(parseFloat(e.target.value))} className="w-full accent-cyan-400" />
            </>
          ) : type === 'wb' || type === 'bb' ? (
            <>
              <div className="flex justify-between text-[10px] text-white/30 uppercase">
                <span>Base pK_b</span>
                <span className="font-mono text-white font-bold">{kbPkb.toFixed(2)}</span>
              </div>
              <input type="range" min="1" max="10" step="0.05" value={kbPkb} onChange={e => setKbPkb(parseFloat(e.target.value))} className="w-full accent-cyan-400" />
            </>
          ) : (
            <div className="opacity-40 select-none">
              <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Second Parameter</label>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/30 text-[12.5px]">N/A for Strong electrolytes</div>
            </div>
          )}
        </div>
      </div>

      {type.includes('b') && (
        <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2 max-w-sm">
          <div className="flex justify-between text-[10px] text-white/30 uppercase">
            <span>Salt Concentration</span>
            <span className="font-mono text-white font-bold">{saltConc} M</span>
          </div>
          <input type="range" min="-3" max="-1" step="0.05" value={Math.log10(saltConc)}
            onChange={e => setSaltConc(parseFloat(Math.pow(10, parseFloat(e.target.value)).toFixed(4)))}
            className="w-full accent-cyan-400" />
        </div>
      )}

      {/* pH output screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Calculation Output</div>
            <div className="text-4xl font-black text-cyan-300 font-mono mt-3">pH = {pH.toFixed(2)}</div>
            <div className="text-[12px] text-white/40 font-mono mt-1">pOH = {(14 - pH).toFixed(2)} | [H⁺] = {Math.pow(10, -pH).toExponential(2)} M</div>
          </div>
          <div className="h-px bg-white/10 my-1" />
          <div className="flex gap-4 text-[12.5px]">
            <div className="flex items-center gap-1.5">
              <span className={cn('h-2.5 w-2.5 rounded-full', pH < 6.8 ? 'bg-red-400' : pH > 7.2 ? 'bg-blue-400' : 'bg-green-400')} />
              <span className="text-white/60">{pH < 6.8 ? 'Acidic' : pH > 7.2 ? 'Basic' : 'Neutral'}</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
          <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Calculated Steps</div>
          <div className="text-[12px] font-mono text-white/70 space-y-2 bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed max-h-48 overflow-y-auto">
            {steps.map((st, idx) => (
              <div key={idx} className="flex gap-1.5">
                <span className="text-cyan-400">➔</span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WIDGET 2: LE CHATELIER SIMULATOR ──────────────────────────────────────
function LeChatelierSimulator() {
  const [reaction, setReaction] = useState<'haber' | 'pcl5'>('haber');
  const [temp, setTemp] = useState<'med' | 'high' | 'low'>('med');
  const [vol, setVol] = useState<'med' | 'low' | 'high'>('med'); // low vol = high press, high vol = low press
  const [addArg, setAddArg] = useState<'none' | 'react' | 'prod'>('none');
  const [inert, setInert] = useState<'none' | 'constV' | 'constP'>('none');

  // Compute shift based on variables
  let shift = 'System at Equilibrium ⇌';
  let color = 'text-white/50 bg-white/5 border-white/10';
  let details = '';

  const isHaber = reaction === 'haber';

  if (isHaber) {
    // N2 + 3H2 ⇌ 2NH3 (Exothermic, dH < 0, moles decrease 4 -> 2)
    const factorList: string[] = [];

    let forwardScore = 0; // positive pushes forward, negative backward

    // 1. Temperature (exothermic) -> high T shifts backward, low T shifts forward
    if (temp === 'high') {
      forwardScore -= 2;
      factorList.push('High Temperature shifts equilibrium backward (Exothermic, Le Chatelier absorbs heat).');
    } else if (temp === 'low') {
      forwardScore += 2;
      factorList.push('Low Temperature shifts equilibrium forward (exothermic reaction releases heat).');
    }

    // 2. Volume / Pressure -> low volume (high pressure) shifts to fewer moles (products side)
    if (vol === 'low') {
      forwardScore += 3;
      factorList.push('Decreasing Volume increases pressure, shifting to products side (fewer gas moles: 4 → 2).');
    } else if (vol === 'high') {
      forwardScore -= 3;
      factorList.push('Increasing Volume decreases pressure, shifting to reactants side (more gas moles: 2 → 4).');
    }

    // 3. Concentration additions
    if (addArg === 'react') {
      forwardScore += 4;
      factorList.push('Adding N₂ / H₂ increases Q reactants, shifting equilibrium forward to consume reactants.');
    } else if (addArg === 'prod') {
      forwardScore -= 4;
      factorList.push('Adding NH₃ increases product concentration, shifting equilibrium backward.');
    }

    // 4. Inert gas
    if (inert === 'constV') {
      factorList.push('Adding inert gas at Constant Volume does not change reacting partial pressures: No shift.');
    } else if (inert === 'constP') {
      forwardScore -= 1.5;
      factorList.push('Adding inert gas at Constant Pressure expands volume, shifting to side with MORE gas moles (reactants: 2 → 4).');
    }

    if (forwardScore > 0.5) {
      shift = 'Shifting FORWARD (towards NH₃) ➔';
      color = 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20';
    } else if (forwardScore < -0.5) {
      shift = 'Shifting BACKWARD (towards N₂ + H₂) ↵';
      color = 'text-rose-400 bg-rose-500/5 border-rose-500/20';
    } else {
      shift = 'System at Equilibrium ⇌';
      color = 'text-amber-400 bg-amber-500/5 border-amber-500/20';
    }
    details = factorList.join(' ');

  } else {
    // PCl5 ⇌ PCl3 + Cl2 (Endothermic, dH > 0, moles increase 1 -> 2)
    const factorList: string[] = [];
    let forwardScore = 0;

    // 1. Temperature (endothermic) -> high T shifts forward, low T backward
    if (temp === 'high') {
      forwardScore += 2;
      factorList.push('High Temperature shifts equilibrium forward (Endothermic process absorbs heat).');
    } else if (temp === 'low') {
      forwardScore -= 2;
      factorList.push('Low Temperature shifts equilibrium backward (releasing heat).');
    }

    // 2. Volume / Pressure -> low volume (high pressure) shifts to fewer moles (reactants side: 1 mole)
    if (vol === 'low') {
      forwardScore -= 3;
      factorList.push('Decreasing Volume increases pressure, shifting to reactants side (fewer gas moles: 2 → 1).');
    } else if (vol === 'high') {
      forwardScore += 3;
      factorList.push('Increasing Volume decreases pressure, shifting to products side (more gas moles: 1 → 2).');
    }

    // 3. Concentration additions
    if (addArg === 'react') {
      forwardScore += 4;
      factorList.push('Adding PCl₅ shifts equilibrium forward to consume reactants.');
    } else if (addArg === 'prod') {
      forwardScore -= 4;
      factorList.push('Adding PCl₃ / Cl₂ shifts equilibrium backward.');
    }

    // 4. Inert gas
    if (inert === 'constV') {
      factorList.push('Adding inert gas at Constant Volume does not change reacting partial pressures: No shift.');
    } else if (inert === 'constP') {
      forwardScore += 1.5;
      factorList.push('Adding inert gas at Constant Pressure expands volume, shifting to side with MORE gas moles (products: 1 → 2).');
    }

    if (forwardScore > 0.5) {
      shift = 'Shifting FORWARD (towards PCl₃ + Cl₂) ➔';
      color = 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20';
    } else if (forwardScore < -0.5) {
      shift = 'Shifting BACKWARD (towards PCl₅) ↵';
      color = 'text-rose-400 bg-rose-500/5 border-rose-500/20';
    } else {
      shift = 'System at Equilibrium ⇌';
      color = 'text-amber-400 bg-amber-500/5 border-amber-500/20';
    }
    details = factorList.join(' ');
  }

  return (
    <div className="space-y-4">
      {/* Reaction select */}
      <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-2 max-w-md">
        <label className="text-[10px] text-white/30 uppercase block">Select Reversible Reaction</label>
        <select value={reaction} onChange={e => { setReaction(e.target.value as any); setAddArg('none'); }}
          className="w-full bg-[#0d1220] border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-cyan-500/40">
          <option value="haber">Haber Process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) [ΔH = -92 kJ/mol]</option>
          <option value="pcl5">PCl₅ Dissociation: PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) [ΔH = +88 kJ/mol]</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Temp Selector */}
        <div className="p-3 bg-white/3 border border-white/8 rounded-xl space-y-1">
          <span className="text-[10px] text-white/30 uppercase block">Temperature</span>
          <div className="flex flex-col gap-1 mt-1 text-[11.5px]">
            {['low', 'med', 'high'].map(t => (
              <button key={t} onClick={() => setTemp(t as any)}
                className={cn('py-1 px-2.5 rounded text-left font-bold border transition-colors capitalize',
                  temp === t ? 'border-amber-500 bg-amber-500/10 text-amber-300' : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3')}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Volume Selector */}
        <div className="p-3 bg-white/3 border border-white/8 rounded-xl space-y-1">
          <span className="text-[10px] text-white/30 uppercase block">Reaction Volume</span>
          <div className="flex flex-col gap-1 mt-1 text-[11.5px]">
            {[
              { id: 'low', label: 'Low (High P)' },
              { id: 'med', label: 'Medium' },
              { id: 'high', label: 'High (Low P)' },
            ].map(v => (
              <button key={v.id} onClick={() => setVol(v.id as any)}
                className={cn('py-1 px-2.5 rounded text-left font-bold border transition-colors',
                  vol === v.id ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300' : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3')}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Concentration Selector */}
        <div className="p-3 bg-white/3 border border-white/8 rounded-xl space-y-1">
          <span className="text-[10px] text-white/30 uppercase block">Concentration Action</span>
          <div className="flex flex-col gap-1 mt-1 text-[11.5px]">
            {[
              { id: 'none', label: 'No Change' },
              { id: 'react', label: 'Add Reactants' },
              { id: 'prod', label: 'Add Products' },
            ].map(c => (
              <button key={c.id} onClick={() => setAddArg(c.id as any)}
                className={cn('py-1 px-2.5 rounded text-left font-bold border transition-colors',
                  addArg === c.id ? 'border-violet-500 bg-violet-500/10 text-violet-300' : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3')}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inert Gas Selector */}
        <div className="p-3 bg-white/3 border border-white/8 rounded-xl space-y-1">
          <span className="text-[10px] text-white/30 uppercase block">Add Inert Gas</span>
          <div className="flex flex-col gap-1 mt-1 text-[11.5px]">
            {[
              { id: 'none', label: 'No Inert Gas' },
              { id: 'constV', label: 'At Constant V' },
              { id: 'constP', label: 'At Constant P' },
            ].map(i => (
              <button key={i.id} onClick={() => setInert(i.id as any)}
                className={cn('py-1 px-2.5 rounded text-left font-bold border transition-colors',
                  inert === i.id ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3')}>
                {i.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Response screen */}
      <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
        <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Simulator shift prediction</div>
        <div className={`p-4 rounded-xl border text-center font-black text-[14px] ${color}`}>
          {shift}
        </div>
        {details && (
          <div className="text-[12.5px] text-white/70 bg-[#060814] p-3 rounded-lg border border-white/5 font-mono leading-relaxed">
            <span className="text-cyan-400 font-bold">Explanation:</span> {details}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── VISUAL SVG DIAGRAMS ─────────────────────────────────────────────────────
function SolubilityExponentsDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Solubility vs Solubility Product (Ksp) Formulas</span>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 100 }}>
        {/* AB Salt (e.g. AgCl) */}
        <rect x="10" y="10" width="100" height="95" rx="8" fill="#38bdf8" fillOpacity="0.05" stroke="#38bdf8" strokeOpacity="0.1" />
        <text x="60" y="28" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle">AB (1:1 Salt)</text>
        <text x="60" y="44" fill="#ffffff" fontSize="7.5" textAnchor="middle">e.g., AgCl, BaSO₄</text>
        <text x="60" y="65" fill="#38bdf8" fontSize="10" fontWeight="black" textAnchor="middle">Ksp = s²</text>
        <text x="60" y="85" fill="#94a3b8" fontSize="7.5" textAnchor="middle">Solubility: s = √Ksp</text>

        {/* AB2 Salt (e.g. PbCl2, CaF2) */}
        <rect x="120" y="10" width="100" height="95" rx="8" fill="#eab308" fillOpacity="0.05" stroke="#eab308" strokeOpacity="0.1" />
        <text x="170" y="28" fill="#eab308" fontSize="8.5" fontWeight="bold" textAnchor="middle">AB₂ / A₂B (1:2 Salt)</text>
        <text x="170" y="44" fill="#ffffff" fontSize="7.5" textAnchor="middle">e.g., CaF₂, PbCl₂</text>
        <text x="170" y="65" fill="#eab308" fontSize="10" fontWeight="black" textAnchor="middle">Ksp = 4s³</text>
        <text x="170" y="85" fill="#94a3b8" fontSize="7.5" textAnchor="middle">s = ³√(Ksp / 4)</text>

        {/* A2B3 Salt (e.g. As2S3, Al2(SO4)3) */}
        <rect x="230" y="10" width="100" height="95" rx="8" fill="#a855f7" fillOpacity="0.05" stroke="#a855f7" strokeOpacity="0.1" />
        <text x="280" y="28" fill="#a855f7" fontSize="8.5" fontWeight="bold" textAnchor="middle">A₂B₃ (2:3 Salt)</text>
        <text x="280" y="44" fill="#ffffff" fontSize="7.5" textAnchor="middle">e.g., Al₂(SO₄)₃, As₂S₃</text>
        <text x="280" y="65" fill="#a855f7" fontSize="10" fontWeight="black" textAnchor="middle">Ksp = 108s⁵</text>
        <text x="280" y="85" fill="#94a3b8" fontSize="7.5" textAnchor="middle">s = ⁵√(Ksp / 108)</text>
      </svg>
    </div>
  );
}

function BufferCapacityDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Buffer Capacity (β) vs. pH Profile</span>
      <svg viewBox="0 0 340 140" className="w-full" style={{ maxHeight: 120 }}>
        {/* Axes */}
        <line x1="40" y1="110" x2="300" y2="110" stroke="#475569" strokeWidth="1.5" />
        <line x1="40" y1="20" x2="40" y2="110" stroke="#475569" strokeWidth="1.5" />
        
        {/* Shaded buffer range: x = 105 to 235 */}
        <rect x="105" y="30" width="130" height="80" fill="#38bdf8" fillOpacity="0.06" stroke="#38bdf8" strokeOpacity="0.15" strokeDasharray="3,3" />
        
        {/* Bell curve representing capacity */}
        <path d="M 40,105 C 100,105 130,30 170,30 C 210,30 240,105 300,105" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        
        {/* Labels & Ticks */}
        <line x1="170" y1="110" x2="170" y2="114" stroke="#475569" strokeWidth="1.5" />
        <text x="170" y="125" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle">pH = pKa (Max Capacity)</text>

        <line x1="105" y1="110" x2="105" y2="114" stroke="#475569" strokeWidth="1.5" />
        <text x="105" y="125" fill="#94a3b8" fontSize="8" textAnchor="middle">pKa − 1</text>

        <line x1="235" y1="110" x2="235" y2="114" stroke="#475569" strokeWidth="1.5" />
        <text x="235" y="125" fill="#94a3b8" fontSize="8" textAnchor="middle">pKa + 1</text>
        
        {/* Y-axis label */}
        <text x="20" y="65" fill="#94a3b8" fontSize="8" transform="rotate(-90 20 65)" textAnchor="middle">Capacity (β)</text>
        <text x="170" y="15" fill="#38bdf8" fontSize="8.5" fontWeight="bold" textAnchor="middle" fillOpacity="0.8">Effective Buffer Range (pKa ± 1)</text>
      </svg>
    </div>
  );
}

function DynamicEquilibriumDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-3 font-bold text-center">Dynamic Equilibrium Profiles (Concentration & Rate vs. Time)</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {/* Concentration vs Time */}
        <div className="flex flex-col items-center border border-white/5 p-2 rounded-xl bg-white/5">
          <span className="text-[10.5px] text-white/40 mb-1 font-bold">Concentration vs. Time</span>
          <svg viewBox="0 0 200 120" className="w-full" style={{ maxHeight: 90 }}>
            {/* Axes */}
            <line x1="25" y1="100" x2="190" y2="100" stroke="#475569" strokeWidth="1" />
            <line x1="25" y1="10" x2="25" y2="100" stroke="#475569" strokeWidth="1" />
            
            {/* Equilibrium start vertical line */}
            <line x1="110" y1="10" x2="110" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
            
            {/* Reactant curve: starts at y=20 (high), drops to y=60, flattens */}
            <path d="M 25,20 C 60,20 80,60 110,60 L 190,60" fill="none" stroke="#f87171" strokeWidth="1.5" />
            
            {/* Product curve: starts at y=100 (zero), rises to y=40, flattens */}
            <path d="M 25,100 C 60,100 80,40 110,40 L 190,40" fill="none" stroke="#34d399" strokeWidth="1.5" />
            
            {/* Labels */}
            <text x="110" y="112" fill="#94a3b8" fontSize="7" textAnchor="middle">Equilibrium Achieved</text>
            <text x="50" y="32" fill="#f87171" fontSize="7">Reactants</text>
            <text x="50" y="80" fill="#34d399" fontSize="7">Products</text>
            <text x="15" y="55" fill="#94a3b8" fontSize="7" transform="rotate(-90 15 55)" textAnchor="middle">Conc.</text>
            <text x="180" y="112" fill="#94a3b8" fontSize="7">Time</text>
          </svg>
        </div>

        {/* Rate vs Time */}
        <div className="flex flex-col items-center border border-white/5 p-2 rounded-xl bg-white/5">
          <span className="text-[10.5px] text-white/40 mb-1 font-bold">Reaction Rate vs. Time</span>
          <svg viewBox="0 0 200 120" className="w-full" style={{ maxHeight: 90 }}>
            {/* Axes */}
            <line x1="25" y1="100" x2="190" y2="100" stroke="#475569" strokeWidth="1" />
            <line x1="25" y1="10" x2="25" y2="100" stroke="#475569" strokeWidth="1" />
            
            {/* Equilibrium start vertical line */}
            <line x1="110" y1="10" x2="110" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="2,2" />
            
            {/* Forward rate curve: starts high y=20, drops to y=50, flattens */}
            <path d="M 25,20 C 60,20 80,50 110,50 L 190,50" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
            
            {/* Reverse rate curve: starts at y=100 (zero), rises to y=50, flattens */}
            <path d="M 25,100 C 60,100 80,50 110,50 L 190,50" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
            
            {/* Labels */}
            <text x="110" y="112" fill="#94a3b8" fontSize="7" textAnchor="middle">Equilibrium Achieved</text>
            <text x="60" y="32" fill="#60a5fa" fontSize="7">Forward Rate</text>
            <text x="60" y="85" fill="#a78bfa" fontSize="7">Reverse Rate</text>
            <text x="15" y="55" fill="#94a3b8" fontSize="7" transform="rotate(-90 15 55)" textAnchor="middle">Rate</text>
            <text x="180" y="112" fill="#94a3b8" fontSize="7">Time</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeChatelierDisturbanceDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Quantitative Le Chatelier Concentration Disturbance (N₂ Injection)</span>
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 130 }}>
        {/* Axes */}
        <line x1="30" y1="130" x2="320" y2="130" stroke="#475569" strokeWidth="1" />
        <line x1="30" y1="15" x2="30" y2="130" stroke="#475569" strokeWidth="1" />
        
        {/* Time of disturbance t1 vertical dashed line */}
        <line x1="140" y1="15" x2="140" y2="130" stroke="#f87171" strokeWidth="1" strokeDasharray="2,2" />
        
        {/* N2 curve (Blue):
            Before t1: flat at y=90
            At t1: spikes to y=30
            After t1: gradually drops to y=55 and flattens
        */}
        <path d="M 30,90 L 140,90 L 140,30 C 180,30 220,55 250,55 L 320,55" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
        
        {/* H2 curve (Orange):
            Before t1: flat at y=75
            At t1: flat (no sudden spike)
            After t1: gradually drops to y=95 and flattens (consumed)
        */}
        <path d="M 30,75 L 140,75 C 180,75 220,95 250,95 L 320,95" fill="none" stroke="#f59e0b" strokeWidth="1.5" />

        {/* NH3 curve (Green):
            Before t1: flat at y=110
            At t1: flat
            After t1: gradually rises to y=80 and flattens (produced)
        */}
        <path d="M 30,110 L 140,110 C 180,110 220,80 250,80 L 320,80" fill="none" stroke="#34d399" strokeWidth="1.5" />
        
        {/* Text Labels */}
        <text x="140" y="142" fill="#f87171" fontSize="7.5" fontWeight="bold" textAnchor="middle">t₁ (N₂ Injected)</text>
        <text x="35" y="85" fill="#60a5fa" fontSize="7.5">N₂</text>
        <text x="35" y="70" fill="#f59e0b" fontSize="7.5">H₂</text>
        <text x="35" y="105" fill="#34d399" fontSize="7.5">NH₃</text>
        
        <text x="280" y="50" fill="#60a5fa" fontSize="7">New Equil</text>
        <text x="280" y="90" fill="#f59e0b" fontSize="7">New Equil</text>
        
        <text x="18" y="70" fill="#94a3b8" fontSize="7.5" transform="rotate(-90 18 70)" textAnchor="middle">Conc.</text>
        <text x="310" y="142" fill="#94a3b8" fontSize="7.5" textAnchor="end">Time</text>
      </svg>
    </div>
  );
}

function TitrationCurvesDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Acid-Base Titration Curves & Indicator Ranges</span>
      <svg viewBox="0 0 340 180" className="w-full" style={{ maxHeight: 140 }}>
        {/* Axes */}
        <line x1="35" y1="150" x2="310" y2="150" stroke="#475569" strokeWidth="1" />
        <line x1="35" y1="15" x2="35" y2="150" stroke="#475569" strokeWidth="1" />
        
        {/* Indicator Zone: Phenolphthalein (pH 8.3 to 10.0) */}
        <rect x="35" y="54" width="275" height="15" fill="#ec4899" fillOpacity="0.08" />
        <text x="290" y="64" fill="#ec4899" fontSize="7" fontWeight="bold" textAnchor="end">Phenolphthalein Range (8.3 - 10.0)</text>

        {/* Indicator Zone: Methyl Orange (pH 3.1 to 4.4) */}
        <rect x="35" y="102" width="275" height="11" fill="#f59e0b" fillOpacity="0.08" />
        <text x="290" y="110" fill="#f59e0b" fontSize="7" fontWeight="bold" textAnchor="end">Methyl Orange Range (3.1 - 4.4)</text>

        {/* Strong Acid - Strong Base Titration Curve (Blue) */}
        <path d="M 35,131 C 110,131 160,125 170,120 C 175,120 175,40 180,40 C 190,35 240,25 310,25" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="175" cy="80" r="3" fill="#3b82f6" />
        <text x="182" y="83" fill="#3b82f6" fontSize="7" fontWeight="bold">Equiv Point (pH = 7)</text>

        {/* Weak Acid - Strong Base Titration Curve (Violet) */}
        <path d="M 35,114 C 70,105 130,98 165,88 C 173,85 174,45 180,40 C 190,35 240,25 310,25" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,1" />
        <circle cx="172" cy="65" r="2.5" fill="#a855f7" />
        <text x="145" y="60" fill="#a855f7" fontSize="7" fontWeight="bold" textAnchor="end">Equiv Point (pH ≈ 8.8)</text>

        {/* Ticks & Labels on Y-axis (pH) */}
        {[0, 7, 14].map(ph => {
          const y = 140 - ph * 8.57;
          return (
            <g key={ph}>
              <line x1="31" y1={y} x2="35" y2={y} stroke="#475569" strokeWidth="1" />
              <text x="24" y={y + 3} fill="#94a3b8" fontSize="7.5" textAnchor="end">pH {ph}</text>
            </g>
          );
        })}
        
        {/* Labels */}
        <text x="50" y="137" fill="#3b82f6" fontSize="7.5">SA + SB</text>
        <text x="50" y="94" fill="#a855f7" fontSize="7.5">WA + SB</text>
        <text x="175" y="160" fill="#94a3b8" fontSize="7.5" textAnchor="middle">Volume of Base Added</text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EquilibriumDetail({ progress, isCompleted, onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'ph' | 'chatelier'>('ph');

  const tabs = [
    { id: 'ph' as const, label: 'pH Calculator', icon: <Star className="w-3.5 h-3.5" /> },
    { id: 'chatelier' as const, label: 'Le Chatelier Lab', icon: <BarChart3 className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0b0f1e] via-[#0d1220] to-[#0b0f1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="cyan">Chemistry</Tag>
            <Tag color="amber">Unit 7</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="pink">Hot Topic</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Equilibrium &<br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">Ionic Systems</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Syllabus-aligned mastery covering dynamic physical and chemical equilibria, Le Chatelier's principle, pH calculations for strong/weak systems, buffers, salt hydrolysis, solubility products, and quantitative tools.
          </p>
          <div className="flex gap-3 flex-wrap text-[12px] text-white/40">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 25 min read</span>
            <span>·</span><span>pyqFrequency: 89%</span>
            <span>·</span><span className="text-rose-400 font-bold">Priority: Hot Topic</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: Meaning of Equilibrium & Physical Processes ─────────── */}
      <Collapsible title="1 · Meaning & Dynamic Nature of Physical Equilibrium" icon={<Atom className="w-4 h-4" />} accent="emerald">
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Equilibrium is a state in a reversible process where the rates of the forward and reverse processes are exactly equal. It is <strong className="text-white">dynamic</strong>—the processes continue at molecular level, but macroscopic properties (concentrations, temperature, pressure) remain constant.</p>

          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-1 text-[12.5px]">
            <span className="text-emerald-400 font-bold block">Physical Equilibrium Examples</span>
            <ul className="space-y-2 text-white/60">
              <li>• <strong className="text-white">Solid-Liquid:</strong> Ice ⇌ Water. Solid-liquid equilibrium exists at the melting/freezing temperature corresponding to the specified pressure. For water at 1 atm, this is exactly 273.15 K.</li>
              <li>• <strong className="text-white">Liquid-Gas:</strong> Water ⇌ Steam. Vapour pressure of liquid becomes constant at a given temperature in a closed container.</li>
              <li>• <strong className="text-white">Solid-Gas:</strong> I₂(s) ⇌ I₂(v). Sublimation equilibrium inside a closed vessel.</li>
              <li>• <strong className="text-white">Dissolution:</strong> Sugar(s) ⇌ Sugar(aq). Achieved in a saturated solution.</li>
            </ul>
          </div>

          <ProTip>
            A stable thermodynamic chemical equilibrium is conventionally studied in a closed system, where there is no exchange of matter with the surroundings that continuously disturbs the composition.
          </ProTip>

          <div className="mt-3">
            <DynamicEquilibriumDiagram />
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 2: Chemical Equilibrium, Kc/Kp & Activity Rules ────────────── */}
      <Collapsible title="2 · Chemical Equilibrium, Kc/Kp & Activity Rules" icon={<Layers className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Chemical equilibrium is reached when the rate of the forward reaction equals the rate of the reverse reaction. Concentrations stop changing, but <strong className="text-emerald-300">equal rates do NOT mean equal concentrations</strong>.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px] mt-2">
            <div className="p-4 rounded-xl bg-[#090b18] border border-white/8 space-y-1.5">
              <span className="text-cyan-300 font-bold block">Homogeneous Equilibria</span>
              <p className="text-white/60">All reacting species and products exist in the same phase (e.g. gaseous mixtures, aqueous solutions).</p>
              <div className="font-mono text-cyan-400 text-[11px] bg-black/30 p-2 rounded">
                N₂(g) + 3H₂(g) ⇌ 2NH₃(g)<br />
                Fe³⁺(aq) + SCN⁻(aq) ⇌ [Fe(SCN)]²⁺(aq)
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#090b18] border border-white/8 space-y-1.5">
              <span className="text-violet-300 font-bold block">Heterogeneous Equilibria</span>
              <p className="text-white/60">Reacting species and products exist in different phases. Standard activities of pure solids and liquids are taken as 1.</p>
              <div className="font-mono text-violet-400 text-[11px] bg-black/30 p-2 rounded">
                CaCO₃(s) ⇌ CaO(s) + CO₂(g)<br />
                K<sub>c</sub> = [CO₂] &nbsp;|&nbsp; K<sub>p</sub> = P<sub>CO₂</sub>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Law of Mass Action & Equilibrium Constants" color="cyan" />
            <p>For a general gaseous/aqueous reaction: &nbsp;<strong className="font-mono text-cyan-300">aA(g) + bB(g) ⇌ cC(g) + dD(g)</strong></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[13px] text-center">
              <div className="p-3 bg-[#060814] rounded-xl border border-white/5">
                <div className="text-cyan-300 font-bold mb-1">Concentration Constant (Kc)</div>
                <div>K<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> / [A]<sup>a</sup>[B]<sup>b</sup></div>
              </div>
              <div className="p-3 bg-[#060814] rounded-xl border border-white/5">
                <div className="text-violet-300 font-bold mb-1">Partial Pressure Constant (Kp)</div>
                <div>K<sub>p</sub> = (P<sub>C</sub>)<sup>c</sup>(P<sub>D</sub>)<sup>d</sup> / (P<sub>A</sub>)<sup>a</sup>(P<sub>B</sub>)<sup>b</sup></div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-[12.5px] space-y-1">
            <span className="text-cyan-300 font-bold">Activity Rule for Pure Solids & Liquids</span>
            <p>The standard state thermodynamic <strong className="text-white">activities</strong> of pure solids and pure liquids are taken as <strong className="text-white">unity (1)</strong>. Their concentrations do not change during chemical processes. Thus, they are omitted from equilibrium-constant expressions.</p>
            <p className="text-[11px] text-white/40 italic">Thermodynamically, equilibrium constants are defined using activities. Concentration and partial-pressure expressions are common approximations for ideal/dilute systems.</p>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Ideal Gas Kp - Kc & Kp - Kx Relationships" color="violet" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-white/3 rounded-xl border border-white/8">
                <span className="text-[10px] text-white/30 uppercase tracking-wider block">Kp - Kc Relation</span>
                <div className="font-mono text-[14px] text-violet-300 font-bold mt-1">K<sub>p</sub> = K<sub>c</sub> &times; (RT)<sup>&Delta;n<sub>g</sub></sup></div>
              </div>
              <div className="p-3 bg-white/3 rounded-xl border border-white/8">
                <span className="text-[10px] text-white/30 uppercase tracking-wider block">Kp - Kx Relation (Mole Fraction)</span>
                <div className="font-mono text-[14px] text-cyan-300 font-bold mt-1">K<sub>p</sub> = K<sub>x</sub> &times; (P<sub>total</sub>)<sup>&Delta;n<sub>g</sub></sup></div>
              </div>
            </div>
            <p className="text-[12px] text-white/60 mt-1">
              Where <strong className="text-white">Δng</strong> is the difference between stoichiometric gas moles of products and reactants: &Delta;n<sub>g</sub> = (c + d)<sub>gas</sub> &minus; (a + b)<sub>gas</sub>. <strong className="text-white">Kx</strong> is the equilibrium constant defined in terms of mole fractions.
            </p>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 3: Manipulation & Properties of K ─────────────────────── */}
      <Collapsible title="3 · Properties & Mathematical Manipulation of K" icon={<Star className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>The equilibrium constant <i>K</i> is a thermodynamic property. It has several crucial properties:</p>
          
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 space-y-1 text-[12.5px]">
            <span className="text-amber-300 font-bold block">The Golden Rule: Temperature Dependency</span>
            <p>For a given reaction, <strong className="text-white">the equilibrium constant K changes ONLY with temperature</strong>. Changes in concentrations, pressures, volumes, catalysts, or inert gas additions can alter the equilibrium composition but will never change the numerical value of K at a fixed temperature.</p>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Algebraic Manipulations of K" color="amber" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Modification to Chemical Equation</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">New Equilibrium Constant Expression</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Reversing the reaction (A ⇌ B to B ⇌ A)', 'K\' = 1 / K'],
                    ['Multiplying equation by factor n (nA ⇌ nB)', 'K\' = K<sup>n</sup>'],
                    ['Dividing equation by factor n (A/n ⇌ B/n)', 'K\' = K<sup>1/n</sup> = <sup>n</sup>&radic;K'],
                    ['Adding two reactions (Rxn 1 + Rxn 2)', 'K<sub>overall</sub> = K₁ &times; K₂'],
                    ['Subtracting two reactions (Rxn 1 - Rxn 2)', 'K<sub>overall</sub> = K₁ / K₂'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-2.5 font-bold text-cyan-300">{r[0]}</td>
                      <td className="px-3 py-2.5 font-mono text-emerald-300 font-bold" dangerouslySetInnerHTML={{ __html: r[1] }} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 4: Extent, Direction & Gibbs Energy ────────────────────── */}
      <Collapsible title="4 · Extent, Direction, and Gibbs Free Energy (Q vs K)" icon={<Star className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="grid grid-cols-3 gap-2 text-center text-[12.5px] font-mono">
            <div className="p-3 bg-white/3 rounded-xl border border-white/8">
              <div className="text-white/40 text-[9px] uppercase">K &gt;&gt; 10³</div>
              <div className="text-emerald-300 font-bold mt-1">Completion</div>
              <div className="text-[10px] text-white/50 font-sans mt-0.5">Products strongly favored</div>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/8">
              <div className="text-white/40 text-[9px] uppercase">10⁻³ ≤ K ≤ 10³</div>
              <div className="text-cyan-300 font-bold mt-1">Intermediate</div>
              <div className="text-[10px] text-white/50 font-sans mt-0.5">Both reactants and products exist</div>
            </div>
            <div className="p-3 bg-white/3 rounded-xl border border-white/8">
              <div className="text-white/40 text-[9px] uppercase">K &lt;&lt; 10⁻³</div>
              <div className="text-rose-300 font-bold mt-1">Negligible</div>
              <div className="text-[10px] text-white/50 font-sans mt-0.5">Reactants strongly favored</div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Reaction Quotient (Q) & Direction Prediction" color="rose" />
            <p>The reaction quotient <i>Q</i><sub>c</sub> has the exact same algebraic form as <i>K</i><sub>c</sub>, but uses concentrations at <strong className="text-white">any given instant</strong> instead of equilibrium:</p>
            <div className="font-mono text-[13px] bg-[#060814] p-3 rounded-xl border border-white/5 text-center mb-3">
              Q<sub>c</sub> = [C]<sup>c</sup>[D]<sup>d</sup> / [A]<sup>a</sup>[B]<sup>b</sup>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[12px] text-center">
              <div className="p-3 rounded bg-[#060814] border border-white/5">
                <span className="text-emerald-400 font-bold">Q &lt; K</span>
                <p className="text-[11px] text-white/50 mt-1">Q must increase. Net reaction moves <strong className="text-emerald-300">FORWARD</strong>.</p>
              </div>
              <div className="p-3 rounded bg-[#060814] border border-white/5">
                <span className="text-amber-400 font-bold">Q = K</span>
                <p className="text-[11px] text-white/50 mt-1">System is in <strong className="text-amber-300">dynamic equilibrium</strong>.</p>
              </div>
              <div className="p-3 rounded bg-[#060814] border border-white/5">
                <span className="text-rose-400 font-bold">Q &gt; K</span>
                <p className="text-[11px] text-white/50 mt-1">Q must decrease. Net reaction moves <strong className="text-rose-300">BACKWARD</strong>.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Thermodynamic Gibbs Free Energy Relation" color="violet" />
            <p>At any concentration state, the actual Gibbs energy change &Delta;<i>G</i> is:</p>
            <div className="font-mono text-[13.5px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              ΔG = ΔG° + RT ln Q
            </div>
            <p>At equilibrium, &Delta;<i>G</i> = 0 and <i>Q</i> = <i>K</i>. This directly relates the standard free energy to <i>K</i>:</p>
            <div className="font-mono text-[14.5px] text-emerald-300 font-bold bg-white/3 p-3 rounded text-center">
              ΔG° = −RT ln K = −2.303 RT log K
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 5: ICE Tables & Dissociation (α) ───────────────────────── */}
      <Collapsible title="5 · Quantitative Calculations: ICE Tables & dissociation degree" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>For solving equilibrium concentrations, we use the <strong className="text-white">ICE Table</strong> method:</p>
          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-2 text-[12px] font-mono">
            <div className="text-violet-300 font-bold uppercase tracking-wider text-[11px]">ICE Table Example: A(g) ⇌ 2B(g)</div>
            <div className="grid grid-cols-4 border-b border-white/10 pb-1 font-sans text-white/50 font-bold text-center">
              <span>Stage</span>
              <span>A(g)</span>
              <span>⇌</span>
              <span>2B(g)</span>
            </div>
            <div className="grid grid-cols-4 text-center">
              <span className="text-white/45">Initial (I)</span>
              <span className="text-cyan-300">C</span>
              <span></span>
              <span className="text-cyan-300">0</span>
            </div>
            <div className="grid grid-cols-4 text-center text-rose-300">
              <span>Change (C)</span>
              <span>−x</span>
              <span></span>
              <span>+2x</span>
            </div>
            <div className="grid grid-cols-4 text-center text-emerald-300 font-bold border-t border-white/5 pt-1">
              <span>Equil (E)</span>
              <span>C − x</span>
              <span></span>
              <span>2x</span>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Degree of Dissociation (α)" color="rose" />
            <p>The fraction of reactant molecules that dissociate: <i>&alpha;</i> = <i>x</i> / <i>C</i>. Re-expressing equilibrium in terms of <i>&alpha;</i>:</p>
            <div className="p-3 bg-[#060814] rounded-xl border border-white/5 text-[12.5px] space-y-1 font-mono">
              <span className="text-cyan-300 font-bold block font-sans">Dissociation of PCl₅: PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)</span>
              <div>Initial moles: 1 mole of PCl₅, 0 product moles.</div>
              <div>Equilibrium: &nbsp; PCl₅ = 1−α | PCl₃ = α | Cl₂ = α &nbsp; (Total moles = 1+α)</div>
              <div>Partial pressures: &nbsp; P_PCl₅ = [(1−α)/(1+α)] × P_total &nbsp; | &nbsp; P_PCl₃ = P_Cl₂ = [α/(1+α)] × P_total</div>
              <div className="text-emerald-300 font-bold mt-1">Kp = [α² / (1 − α²)] × P_total</div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 6: Le Chatelier's Principle & Variables ────────────────── */}
      <Collapsible title="6 · Le Chatelier's Principle & Equilibrium Shifts" icon={<Star className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p><strong className="text-white">Le Chatelier's Principle:</strong> When an equilibrium system is subjected to a disturbance, its composition shifts in the direction that partially counteracts the imposed disturbance until a new equilibrium is established.</p>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Disturbance Factor</th>
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Imposed Change</th>
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Direction of Shift</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Concentration', 'Add reactant / Remove product', 'Shifts FORWARD (towards products)'],
                  ['Concentration', 'Add product / Remove reactant', 'Shifts BACKWARD (towards reactants)'],
                  ['Volume / Pressure', 'Decrease Volume (Increases Pressure)', 'Shifts to side with FEWER gas moles'],
                  ['Volume / Pressure', 'Increase Volume (Decreases Pressure)', 'Shifts to side with MORE gas moles'],
                  ['Temperature', 'Increase Temp (Exothermic, -ΔH)', 'Shifts BACKWARD (absorbs heat)'],
                  ['Temperature', 'Increase Temp (Endothermic, +ΔH)', 'Shifts FORWARD (absorbs heat)'],
                  ['Inert Gas Addition', 'Added at Constant Volume (V)', 'NO SHIFT (reaction partial pressures constant)'],
                  ['Inert Gas Addition', 'Added at Constant Pressure (P)', 'Shifts to side with MORE gaseous moles (dilution effect)'],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                    <td className="px-3 py-2 font-bold text-amber-300">{r[0]}</td>
                    <td className="px-3 py-2 text-white/70">{r[1]}</td>
                    <td className="px-3 py-2 text-emerald-300 font-bold">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <LeChatelierDisturbanceDiagram />
          </div>

          <TrapCard title="Inert Gas constant P vs constant V">
            Adding an inert gas at constant volume increases the total pressure, but does NOT change the concentrations or partial pressures of the reacting species. Thus, Q remains equal to K: <strong>No shift occurs</strong>. At constant pressure, the volume must expand to maintain pressure, effectively diluting the reaction mixture and shifting the system towards more gaseous moles.
          </TrapCard>

          <ProTip>
            <strong>Catalysts:</strong> A catalyst lowers the activation energy for both the forward and reverse reactions equally. It speeds up the rate of reaching equilibrium but <strong>does not alter the equilibrium composition</strong> or change the value of K.
          </ProTip>

          <div className="space-y-2">
            <SectionBanner label="van't Hoff Equation (Temperature Dependence)" color="cyan" />
            <p>The van't Hoff equation quantitatively relates the temperature dependence of the equilibrium constant K:</p>
            <div className="font-mono text-[13.5px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
              ln(K₂/K₁) = (ΔrH° / R) × (1/T₁ − 1/T₂)
            </div>
            <p className="text-[11.5px] text-white/45">Exothermic reactions (ΔrH° &lt; 0) have decreasing constants as temperature increases. Endothermic reactions (ΔrH° &gt; 0) have increasing constants.</p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 space-y-2 text-[12.5px]">
            <span className="text-cyan-300 font-bold block">Industrial Applications of Le Chatelier's Principle</span>
            <ul className="space-y-2 text-white/60">
              <li>• <strong className="text-white">Haber Process (Ammonia Synthesis):</strong> N₂(g) + 3H₂(g) ⇌ 2NH₃(g) [ΔH = −92.4 kJ/mol]. Optimal conditions: High pressure (~200 atm), low/moderate temperature (~700 K to balance kinetics and thermodynamics), iron catalyst with Mo promoter.</li>
              <li>• <strong className="text-white">Contact Process (SO₃ Synthesis):</strong> 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) [ΔH = −197 kJ/mol]. Optimal conditions: High pressure (~1-2 atm is sufficient as yield is already very high), moderate temperature (670-720 K), divanadium pentoxide (V₂O₅) catalyst.</li>
              <li>• <strong className="text-white">Ostwald Process (NO Synthesis):</strong> 4NH₃(g) + 5O₂(g) ⇌ 4NO(g) + 6H₂O(g) [ΔH = −905 kJ/mol]. Optimal conditions: Moderate pressure (1-9 atm), moderate temperature (~1120 K), Pt-Rh gauze catalyst.</li>
            </ul>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 7: Introduction to Ionic Equilibrium & Water ───────────── */}
      <Collapsible title="7 · Ionic Equilibrium, Acid-Base Theories & Water pKw" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Ionic equilibrium deals with the dissociation of weak electrolytes in solution. Let's recap the three primary definitions of acids and bases:</p>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Acid-Base Theory</th>
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Acid definition</th>
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Base definition</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Arrhenius Theory', 'Dissociates to produce H⁺ ions in water', 'Dissociates to produce OH⁻ ions in water'],
                  ['Brønsted-Lowry Theory', 'Proton (H⁺) Donor', 'Proton (H⁺) Acceptor'],
                  ['Lewis Theory', 'Electron-pair Acceptor (e.g., BF₃, AlCl₃)', 'Electron-pair Donor (e.g., NH₃, H₂O)'],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                    <td className="px-3 py-2.5 font-bold text-cyan-300">{r[0]}</td>
                    <td className="px-3 py-2.5 text-emerald-300 font-bold">{r[1]}</td>
                    <td className="px-3 py-2.5 text-violet-300 font-bold">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-[12.5px] space-y-1.5">
            <span className="text-cyan-300 font-bold block">Acid-Base Strength vs Ka / Kb</span>
            <p>The magnitude of <i>K</i><sub>a</sub> or <i>K</i><sub>b</sub> measures the strength of an acid or base. Higher <i>K</i><sub>a</sub> or <i>K</i><sub>b</sub> indicates greater dissociation (stronger electrolyte):</p>
            <div className="font-mono text-[12px] text-center bg-[#060814] p-2.5 rounded border border-white/5 space-y-1">
              <div>Stronger Acid ➔ Higher Ka ➔ Smaller pKa (e.g., HCl &gt;&gt; CH₃COOH)</div>
              <div>Stronger Base ➔ Higher Kb ➔ Smaller pKb (e.g., NaOH &gt;&gt; NH₃)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px] mt-3">
            <div className="p-4 rounded-xl bg-[#090b18] border border-white/8 space-y-2">
              <span className="text-cyan-300 font-bold block">Conjugate Acid-Base Pairs</span>
              <p className="text-white/60">A pair of species differing only by a single proton (H<sup>+</sup>):</p>
              <div className="font-mono text-cyan-300 text-[12px] text-center bg-black/30 p-2 rounded">
                Acid ⇌ Conjugate Base + H⁺
              </div>
              <p className="text-[11.5px] text-white/45">At 298 K, for a conjugate pair: &nbsp;<strong className="text-white font-mono">Ka × Kb = Kw = 10⁻¹⁴</strong>. Hence, <strong className="text-white font-mono">pKa + pKb = 14</strong>.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#090b18] border border-white/8 space-y-2">
              <span className="text-violet-300 font-bold block">Amphiprotic Species</span>
              <p className="text-white/60">Species that can act as both proton donors and proton acceptors (e.g., HCO₃⁻, H₂PO₄⁻, HPO₄²⁻, and H₂O).</p>
              <div className="font-mono text-violet-300 text-[11px] bg-black/30 p-2 rounded">
                HCO₃⁻ + H⁺ ⇌ H₂CO₃ &nbsp; (Base)<br />
                HCO₃⁻ ⇌ CO₃²⁻ + H⁺ &nbsp; (Acid)
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Ionic Product of Water (Kw) & pH scale" color="rose" />
            <p>Water auto-ionizes according to: &nbsp;<strong className="font-mono text-cyan-300">H₂O + H₂O ⇌ H₃O⁺ + OH⁻</strong></p>
            <div className="font-mono text-[13.5px] text-rose-300 font-bold bg-white/3 p-3 rounded text-center">
              Kw = [H₃O⁺][OH⁻] &nbsp;|&nbsp; pKw = pH + pOH
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <TrapCard title="Kw is Temperature Dependent">
                Auto-ionization is endothermic. Thus, as temperature increases, Kw increases (e.g. Kw = 10⁻¹³ at 335 K). Consequently, pKw decreases, and the neutral point (where [H⁺] = [OH⁻]) shifts below 7.00 (e.g. pH = 6.50 is neutral at high temperatures). Never assume pH = 7.00 is always neutral!
              </TrapCard>
              <TrapCard title="Dilute Base pH Trap (10⁻⁸ M NaOH)">
                Symmetric to the acid trap: for 10⁻⁸ M NaOH, water's auto-ionization cannot be ignored. Setting up the quadratic [OH⁻]² − 10⁻⁸[OH⁻] − Kw = 0 yields [OH⁻] ≈ 1.05 × 10⁻⁷ M. This gives pOH ≈ 6.98, yielding <strong className="text-white">pH ≈ 7.02</strong> (slightly basic), not pH = 6.00!
              </TrapCard>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Common Acid-Base Indicators" color="violet" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3 text-left">
                    <th className="px-3 py-2 text-white/40 font-bold">Indicator Name</th>
                    <th className="px-3 py-2 text-white/40 font-bold">pH Transition Range</th>
                    <th className="px-3 py-2 text-white/40 font-bold font-mono text-rose-300">Color in Acid (Low pH)</th>
                    <th className="px-3 py-2 text-white/40 font-bold font-mono text-emerald-300">Color in Base (High pH)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Phenolphthalein (HIn)', '8.3 − 10.0', 'Colorless', 'Pink / Magenta'],
                    ['Methyl Orange (HIn)', '3.1 − 4.4', 'Red / Pinkish-Red', 'Yellow'],
                    ['Bromothymol Blue', '6.0 − 7.6', 'Yellow', 'Blue'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-2.5 font-bold text-cyan-300">{r[0]}</td>
                      <td className="px-3 py-2.5 font-mono text-white/80">{r[1]}</td>
                      <td className="px-3 py-2.5 font-bold text-rose-400">{r[2]}</td>
                      <td className="px-3 py-2.5 font-bold text-emerald-400">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3">
              <TitrationCurvesDiagram />
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 8: Weak Acids/Bases & Ostwald Dilution ────────────────── */}
      <Collapsible title="8 · Weak Acid/Base Equilibria & Ostwald's Dilution Law" icon={<Star className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>For a weak monoprotic acid HA dissociating at concentration <i>C</i>:</p>
          <div className="font-mono text-[13px] bg-[#060814] p-3 rounded-xl border border-white/5 text-center">
            HA &nbsp; ⇌ &nbsp; H⁺ &nbsp; + &nbsp; A⁻<br />
            C(1−α) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cα &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cα
          </div>

          <div className="space-y-2">
            <SectionBanner label="Ostwald's Dilution Law" color="cyan" />
            <p>The exact equilibrium constant equation is:</p>
            <div className="font-mono text-[14px] text-cyan-300 font-bold bg-white/3 p-2.5 rounded text-center">
              Ka = C × α² / (1 − α)
            </div>
            <p className="text-[12px] text-white/60">
              If the degree of dissociation is small (<i>&alpha;</i> &le; 0.05 or 5%), we approximate 1 &minus; <i>&alpha;</i> &asymp; 1. Thus:
            </p>
            <div className="grid grid-cols-2 gap-2 text-center font-mono text-[13px] text-emerald-300 font-bold">
              <div className="p-2 bg-white/3 rounded">α ≈ √(Ka / C)</div>
              <div className="p-2 bg-white/3 rounded">[H⁺] ≈ √(Ka × C)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 text-[12.5px] space-y-1.5">
            <span className="text-violet-300 font-bold block">Common-Ion Suppression on Weak Acids</span>
            <p>When a salt with common ion A⁻ (at concentration C₀) is added to a weak acid HA (concentration C), the dissociation degree suppresses from α to α':</p>
            <div className="font-mono text-[12.5px] bg-[#060814] p-3 rounded-lg border border-white/5 space-y-1 text-center font-bold">
              <div className="text-cyan-300">α' ≈ Ka / C₀ &nbsp; (for C₀ &gt;&gt; Ka)</div>
              <div className="text-[11.5px] text-white/50 mt-1">General relation: α' ≈ α / √(1 + C₀ / [C × α])</div>
            </div>
            <p className="text-[11.5px] text-white/45 italic">Example: Adding CH₃COONa (C₀) to acetic acid (C) shifts HA ⇌ H⁺ + A⁻ backward, drastically lowering hydrogen ion concentration [H⁺] ≈ Ka × (C / C₀).</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-[12.5px]">
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-1">
              <span className="text-violet-300 font-bold block">pH of a Weak Acid</span>
              <div className="font-mono text-violet-300 text-[13.5px] bg-black/35 p-2 rounded text-center font-bold">
                pH = ½ (pKa − log C)
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-1">
              <span className="text-amber-300 font-bold block">pOH / pH of a Weak Base</span>
              <div className="font-mono text-amber-300 text-[13.5px] bg-black/35 p-2 rounded text-center font-bold">
                pOH = ½ (pKb − log C)
              </div>
              <div className="text-[11px] text-white/45 text-center mt-1">pH = 14 − pOH</div>
            </div>
          </div>

          <div className="space-y-2 mt-3">
            <SectionBanner label="Polyprotic Acids (e.g. H₃PO₄, H₂CO₃)" color="violet" />
            <p>Polyprotic acids lose protons in successive steps. Each step has its own constant:</p>
            <div className="font-mono text-[13px] text-violet-300 bg-[#060814] p-3 rounded-lg border border-white/5 text-center font-bold">
              Ka₁ &gt;&gt; Ka₂ &gt;&gt; Ka₃
            </div>
            <p className="text-[12px] text-white/60">
              Removing a positively charged proton (H<sup>+</sup>) from a negatively charged conjugate species becomes progressively more difficult due to electrostatics. Thus, the pH is dominated almost entirely by the first dissociation step (<i>K</i><sub>a1</sub>).
            </p>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 9: Salt Hydrolysis ─────────────────────────────────────── */}
      <Collapsible title="9 · Salt Hydrolysis: Hydrolysis Constants & pH Formulas" icon={<Layers className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Salt hydrolysis is the reaction of salt ions with water. The hydrolysis constant is <i>K</i><sub>h</sub>, and degree of hydrolysis is <i>h</i>. There are four primary cases:</p>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Salt Source Type</th>
                  <th className="px-3 py-2 text-left text-white/40 font-bold">Solution Nature</th>
                  <th className="px-3 py-2 text-center text-white/40 font-bold">K_h Expression</th>
                  <th className="px-3 py-2 text-center text-white/40 font-bold">pH Formula</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Strong Acid + Strong Base (e.g. NaCl)', 'Neutral', 'No Hydrolysis', 'pH = 7.00'],
                  ['Weak Acid + Strong Base (e.g. CH₃COONa)', 'Basic (Anionic)', 'Kh = Kw / Ka', 'pH = 7 + ½(pKa + log C)'],
                  ['Strong Acid + Weak Base (e.g. NH₄Cl)', 'Acidic (Cationic)', 'Kh = Kw / Kb', 'pH = 7 − ½(pKb + log C)'],
                  ['Weak Acid + Weak Base (e.g. NH₄CH₃COO)', 'Depends on Ka/Kb', 'Kh = Kw / (Ka × Kb)', 'pH = 7 + ½(pKa − pKb)'],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                    <td className="px-3 py-2.5 font-bold text-cyan-300">{r[0]}</td>
                    <td className="px-3 py-2.5 text-white/70">{r[1]}</td>
                    <td className="px-3 py-2.5 text-center font-mono text-emerald-300 font-bold">{r[2]}</td>
                    <td className="px-3 py-2.5 text-center font-mono text-violet-300 font-bold">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Exact Degree of Hydrolysis (h)" color="amber" />
            <p>The standard approximation h ≈ √(Kh / C) assumes h &lt; 0.05. If h is large:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2 text-[12.5px] text-white/70">
              <li>• <strong className="text-white">For WA + SB or SA + WB salts:</strong> Kh = C h² / (1 − h). Solve the quadratic equation C h² + Kh h − Kh = 0 for the exact value of h.</li>
              <li>• <strong className="text-white">For WA + WB salts:</strong> Kh = h² / (1 − h)², yielding the concentration-independent exact relation: <strong className="font-mono text-cyan-300">h = √Kh / (1 + √Kh)</strong>. In some reference systems, this is represented as the ratio h = √(Kh / (1 + Kh)).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 text-[12.5px] space-y-2">
            <span className="text-violet-300 font-bold block">pH of Amphiprotic Salts (NaHCO₃, KH₂PO₄, etc.)</span>
            <p>Amphiprotic anions (e.g., HCO₃⁻, HS⁻, H₂PO₄⁻) undergo simultaneous hydrolysis (as a base) and ionization (as an acid) in water:</p>
            <div className="font-mono text-[11px] text-violet-300 bg-black/40 p-2 rounded space-y-1">
              <div>Hydrolysis (Base): HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻ &nbsp; [Kb = Kw / Ka₁]</div>
              <div>Ionization (Acid): HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺ &nbsp; [Ka = Ka₂]</div>
            </div>
            <p>Applying approximation, the pH of such solutions is completely <strong className="text-white">independent of concentration</strong> and is given by the average of the two pKa values bounding the amphiprotic species:</p>
            <div className="font-mono text-[14px] text-emerald-300 font-bold bg-white/3 p-2.5 rounded text-center">
              pH = ½ (pKa₁ + pKa₂)
            </div>
            <p className="text-[11px] text-white/50 italic font-mono">Example: For NaHCO₃, Ka₁ of H₂CO₃ = 4.5 × 10⁻⁷ (pKa₁ = 6.35) and Ka₂ = 4.7 × 10⁻¹¹ (pKa₂ = 10.33). pH = ½(6.35 + 10.33) = 8.34.</p>
          </div>

          <TrapCard title="Weak Acid + Weak Base Salt pH is C-Independent">
            Notice that the pH formula for a salt of a weak acid and a weak base: &nbsp;<strong>pH = 7 + ½(pKa − pKb)</strong>&nbsp; does not contain the concentration term <i>C</i>! Thus, the pH of solutions of such salts (like ammonium acetate) is completely independent of their concentration.
          </TrapCard>
        </div>
      </Collapsible>

      {/* ── SECTION 10: Buffer Solutions & Henderson-Hasselbalch ───────────── */}
      <Collapsible title="10 · Buffer Solutions: Mechanisms, HH Equation & Capacity" icon={<Star className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p><strong className="text-white">Buffer Solutions:</strong> Solutions that resist changes in pH when small amounts of strong acid or base are added. Let's study how they work:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-1.5">
              <span className="text-cyan-300 font-bold block">1. Acidic Buffer (e.g., CH₃COOH / CH₃COO⁻)</span>
              <p className="text-[12px] text-white/60">Resists pH changes using conjugate pairs:</p>
              <ul className="text-[11.5px] text-white/50 space-y-1">
                <li>• Added H<sup>+</sup> is neutralized by acetate base: <br /><strong className="text-white font-mono">CH₃COO⁻ + H⁺ → CH₃COOH</strong></li>
                <li>• Added OH<sup>&minus;</sup> is neutralized by acetic acid: <br /><strong className="text-white font-mono">CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O</strong></li>
              </ul>
              <div className="font-mono text-cyan-300 text-[12px] bg-black/30 p-2 rounded text-center font-bold mt-2">
                pH = pKa + log([Conjugate Base] / [Weak Acid])
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-1.5">
              <span className="text-violet-300 font-bold block">2. Basic Buffer (e.g., NH₃ / NH₄⁺)</span>
              <p className="text-[12px] text-white/60">Resists pH changes using conjugate pairs:</p>
              <ul className="text-[11.5px] text-white/50 space-y-1">
                <li>• Added H<sup>+</sup> is neutralized by weak base: <br /><strong className="text-white font-mono">NH₃ + H⁺ → NH₄⁺</strong></li>
                <li>• Added OH<sup>&minus;</sup> is neutralized by ammonium acid: <br /><strong className="text-white font-mono">NH₄⁺ + OH⁻ → NH₃ + H₂O</strong></li>
              </ul>
              <div className="font-mono text-violet-300 text-[12px] bg-black/30 p-2 rounded text-center font-bold mt-2">
                pOH = pKb + log([Conjugate Acid] / [Weak Base])
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-3">
            <SectionBanner label="Buffer Capacity & Range" color="amber" />
            <p>Buffer capacity is a measure of a buffer's resistance to pH changes: the moles of acid/base required to change pH by 1 unit. Key insights:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-white/65 text-[12.5px]">
              <li>• Buffer capacity <strong className="text-white">increases with total concentration</strong> of the buffering components.</li>
              <li>• Buffer capacity is <strong className="text-emerald-300">maximized when [Acid] = [Conjugate Base]</strong> (i.e. pH = pKa).</li>
              <li>• The effective buffering range is generally limited to <strong className="text-white">pH = pKa ± 1</strong>.</li>
            </ul>
            <div className="mt-3">
              <BufferCapacityDiagram />
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 11: Solubility Product & Common Ion Effect ────────────── */}
      <Collapsible title="11 · Solubility Product (Ksp), Common-Ion Effect & Precipitation" icon={<Layers className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>For a sparingly soluble salt M<sub>x</sub>A<sub>y</sub> dissolving in water:</p>
          <div className="font-mono text-[13.5px] text-cyan-300 font-bold bg-white/3 p-3 rounded text-center">
            M<sub>x</sub>A<sub>y</sub>(s) ⇌ x M<sup>y+</sup> + y A<sup>x&minus;</sup> &nbsp;|&nbsp; K<sub>sp</sub> = [M<sup>y+</sup>]<sup>x</sup>[A<sup>x&minus;</sup>]<sup>y</sup>
          </div>

          <SolubilityExponentsDiagram />

          <div className="space-y-2 mt-3">
            <SectionBanner label="Common-Ion Suppression Effect" color="amber" />
            <p>According to Le Chatelier's Principle, addition of a common ion <strong className="text-white">suppresses the ionization</strong> of a weak electrolyte and <strong className="text-rose-400 font-bold">decreases the solubility</strong> of a sparingly soluble salt:</p>
            <div className="p-3 bg-[#060814] rounded-xl border border-white/5 text-[12px] leading-relaxed">
              Example: Dissolving AgCl in NaCl solution. The high concentration of Cl<sup>&minus;</sup> from NaCl shifts the equilibrium AgCl(s) ⇌ Ag<sup>+</sup>(aq) + Cl<sup>&minus;</sup>(aq) strongly to the left, decreasing silver ion solubility.
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/8 mt-2">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3 text-left">
                    <th className="px-3 py-2 text-white/40 font-bold">Solvent / Medium</th>
                    <th className="px-3 py-2 text-white/40 font-bold">Common Ion</th>
                    <th className="px-3 py-2 text-white/40 font-bold">Solubility Expression</th>
                    <th className="px-3 py-2 text-white/40 font-bold font-mono text-cyan-300">Solubility (s) at 298 K</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Pure Water', 'None', 's = √Ksp', '1.34 × 10⁻⁵ mol/L'],
                    ['0.1 M NaCl Solution', 'Cl⁻ (0.1 M)', 's ≈ Ksp / 0.1', '1.80 × 10⁻⁹ mol/L'],
                    ['0.1 M AgNO₃ Solution', 'Ag⁺ (0.1 M)', 's ≈ Ksp / 0.1', '1.80 × 10⁻⁹ mol/L'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-2 font-bold text-white/80">{r[0]}</td>
                      <td className="px-3 py-2 text-white/50">{r[1]}</td>
                      <td className="px-3 py-2 font-mono text-violet-300 font-bold">{r[2]}</td>
                      <td className="px-3 py-2 font-mono text-cyan-300 font-bold">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Precipitation Criterion (Qsp vs Ksp)" color="rose" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[12px] text-center">
              <div className="p-3 rounded bg-[#060814] border border-white/5">
                <span className="text-emerald-400 font-bold">Qsp &lt; Ksp</span>
                <p className="text-[11px] text-white/50 mt-1">Unsaturated solution. No precipitate formed.</p>
              </div>
              <div className="p-3 rounded bg-[#060814] border border-white/5">
                <span className="text-amber-400 font-bold">Qsp = Ksp</span>
                <p className="text-[11px] text-white/50 mt-1">Saturated solution in dynamic equilibrium.</p>
              </div>
              <div className="p-3 rounded bg-[#060814] border border-white/5">
                <span className="text-rose-400 font-bold">Qsp &gt; Ksp</span>
                <p className="text-[11px] text-white/50 mt-1">Supersaturated. <strong className="text-rose-300">Precipitation occurs</strong>.</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 text-[12.5px] space-y-1">
            <span className="text-violet-300 font-bold block">Selective Precipitation</span>
            <p>If a solution contains multiple metal ions (e.g. Ag⁺ and Pb²⁺), adding a precipitating reagent (like Cl⁻) will precipitate the salt with the lower solubility limit (Qsp &gt; Ksp) first. This forms the basis of qualitative inorganic group analysis.</p>
          </div>
        </div>
      </Collapsible>

      {/* ── INTERACTIVE STUDY LAB ─────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 overflow-hidden bg-[#090b18]">
        <div className="p-5 border-b border-white/8 bg-gradient-to-r from-cyan-500/5 to-violet-500/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-widest text-cyan-400 uppercase">Interactive Study Lab</span>
          </div>
          <h2 className="text-lg font-black text-white">Equilibrium Master Tools</h2>
          <p className="text-white/40 text-[12px] mt-1">Quantitative tools to simulate Le Chatelier shifts and calculate solution pH</p>
        </div>

        <div className="flex border-b border-white/8">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('flex items-center gap-2 px-4 py-3 text-[11.5px] font-bold border-b-2 transition-all flex-1 justify-center',
                activeTab === tab.id ? 'border-cyan-400 text-cyan-300 bg-cyan-500/5' : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3')}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'ph' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Vary type and concentration to compute pH with step-by-step ionization explanations.</p>
              <PhCalculator />
            </div>
          )}
          {activeTab === 'chatelier' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Change conditions of reversible processes to simulate qualitative Le Chatelier direction shifts.</p>
              <LeChatelierSimulator />
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 12: Solved Problems ───────────────────────────────────── */}
      <Collapsible title="12 · Solved Advanced Problems (8 High-Yield Cases)" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4">
          
          <SolvedProblem 
            title="Problem 1: ICE Table Method" 
            question="At a certain temperature, 2.0 moles of PCl₅ are placed in a 2.0 L closed flask. At equilibrium, the PCl₅ is 40% dissociated. Calculate the equilibrium constant Kc for PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)."
            solution={
              <div className="space-y-2">
                <div>Initial concentration of PCl₅: C = 2.0 mol / 2.0 L = 1.0 M</div>
                <div>Dissociation degree (α) = 40% = 0.40</div>
                <div className="mt-2 font-bold text-cyan-300">ICE Table:</div>
                <div>PCl₅ ⇌ PCl₃ + Cl₂</div>
                <div>I: 1.0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0</div>
                <div>C: −Cα &nbsp;&nbsp;&nbsp; +Cα &nbsp;&nbsp;&nbsp; +Cα &nbsp; [with Cα = 1.0 × 0.4 = 0.4 M]</div>
                <div>E: 0.6 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 0.4</div>
                <div className="mt-2">Expression:</div>
                <div>Kc = [PCl₃][Cl₂] / [PCl₅] = (0.4 × 0.4) / 0.6</div>
                <div>Kc = 0.16 / 0.6 = 0.267 mol/L</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 2: Kp - Kc Conversion" 
            question="For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), Kc is 0.061 at 500 K. Calculate the value of Kp at this temperature. (R = 0.0821 L·atm/mol·K)"
            solution={
              <div className="space-y-2">
                <div>Relation: K<sub>p</sub> = K<sub>c</sub>(RT)<sup>&Delta;n<sub>g</sub></sup></div>
                <div>&Delta;n<sub>g</sub> = (moles of gaseous products) − (moles of gaseous reactants) = 2 − (1 + 3) = −2</div>
                <div>R = 0.0821 L·atm/mol·K, T = 500 K</div>
                <div>Calculation:</div>
                <div>RT = 0.0821 × 500 = 41.05 atm</div>
                <div>K<sub>p</sub> = 0.061 × (41.05)⁻² = 0.061 / (41.05)²</div>
                <div>K<sub>p</sub> = 0.061 / 1685.1 = 3.62 × 10⁻⁵ atm⁻²</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 3: Solubility Product Ksp" 
            question="The solubility of PbCl₂ in water at 298 K is 1.62 × 10⁻² mol/L. Calculate its solubility product constant K<sub>sp</sub>."
            solution={
              <div className="space-y-2">
                <div>Dissociation: PbCl₂(s) ⇌ Pb²⁺(aq) + 2Cl⁻(aq)</div>
                <div>Solubility (s) = 1.62 × 10⁻² mol/L</div>
                <div>Exponents: [Pb²⁺] = s, [Cl⁻] = 2s</div>
                <div>Ksp = [Pb²⁺][Cl⁻]² = s × (2s)² = 4s³</div>
                <div className="mt-2">Calculation:</div>
                <div>K<sub>sp</sub> = 4 &times; (1.62 &times; 10⁻²)³</div>
                <div>Ksp = 4 × 4.25 × 10⁻⁶ = 1.70 × 10⁻⁵</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 4: Buffer Solution pH" 
            question="Calculate the pH of a buffer solution prepared by mixing 0.15 M acetic acid (pKa = 4.75) and 0.30 M sodium acetate."
            solution={
              <div className="space-y-2">
                <div>Using Henderson-Hasselbalch equation for acidic buffers:</div>
                <div>pH = pKa + log([Salt]/[Acid])</div>
                <div>pKa = 4.75</div>
                <div>[Salt] = [sodium acetate] = 0.30 M</div>
                <div>[Acid] = [acetic acid] = 0.15 M</div>
                <div className="mt-2">Calculation:</div>
                <div>pH = 4.75 + log(0.30 / 0.15)</div>
                <div>pH = 4.75 + log(2) = 4.75 + 0.301 = 5.05</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 5: Common Ion Effect" 
            question="Calculate the molar solubility of AgCl (Ksp = 1.8 × 10⁻¹⁰) in 0.10 M NaCl solution."
            solution={
              <div className="space-y-2">
                <div>Dissociation: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)</div>
                <div>NaCl dissociates completely: [Cl⁻] from NaCl = 0.10 M</div>
                <div>Let s be the molar solubility of AgCl in this solution.</div>
                <div>At equilibrium: [Ag⁺] = s, [Cl⁻] = s + 0.10 M</div>
                <div className="mt-2">Approximation:</div>
                <div>Since Ksp is extremely small, s &lt;&lt; 0.10 M, so [Cl⁻] ≈ 0.10 M</div>
                <div>Ksp = [Ag⁺][Cl⁻] = s × 0.10 = 1.8 × 10⁻¹⁰</div>
                <div>s = 1.8 × 10⁻¹⁰ / 0.10 = 1.8 × 10⁻⁹ mol/L</div>
                <div className="text-amber-300">Notice that solubility decreased from √Ksp = 1.34 × 10⁻⁵ M in pure water to 1.8 × 10⁻⁹ M in NaCl (common ion suppression).</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 6: Dilution/Neutralization pH" 
            question="50 mL of 0.20 M HCl is mixed with 50 mL of 0.10 M NaOH. Calculate the pH of the resulting mixture at 298 K."
            solution={
              <div className="space-y-2">
                <div>Calculate initial millimoles (mmol) of ions:</div>
                <div>mmol H⁺ = 50 mL × 0.20 M = 10.0 mmol</div>
                <div>mmol OH⁻ = 50 mL × 0.10 M = 5.0 mmol</div>
                <div className="mt-2">Neutralization reaction: H⁺ + OH⁻ → H₂O</div>
                <div>Excess H⁺ remaining = 10.0 − 5.0 = 5.0 mmol</div>
                <div>Total Volume of mixture = 50 mL + 50 mL = 100 mL</div>
                <div>[H⁺] in mixture = 5.0 mmol / 100 mL = 0.05 M = 5 × 10⁻² M</div>
                <div className="mt-2">Calculation:</div>
                <div>pH = −log([H⁺]) = −log(5 × 10⁻²) = 2 − log(5)</div>
                <div>pH = 2 − 0.699 = 1.30</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 7: Extremely Dilute Acid pH Trap" 
            question="Calculate the pH of a 1.0 × 10⁻⁸ M HCl solution at 298 K."
            solution={
              <div className="space-y-2">
                <div>Common mistake: pH = −log(10⁻⁸) = 8.00. (An acid solution cannot have a basic pH!)</div>
                <div>Since concentration is extremely dilute (&lt; 10⁻⁶ M), auto-ionization of water must be accounted for.</div>
                <div>Let x be the concentration of [H⁺] contributed by water.</div>
                <div>Total [H⁺] = 10⁻⁸ + x, and [OH⁻] = x</div>
                <div>Kw = [H⁺][OH⁻] = (10⁻⁸ + x) × x = 1.0 × 10⁻¹⁴</div>
                <div className="mt-2">Quadratic equation:</div>
                <div>x² + 10⁻⁸ x − 10⁻¹⁴ = 0</div>
                <div>Solving quadratic: x = 9.51 × 10⁻⁸ M</div>
                <div>Total [H⁺] = 10⁻⁸ + 9.51 × 10⁻⁸ = 1.05 × 10⁻⁷ M</div>
                <div>pH = −log(1.05 × 10⁻⁷) = 7 − log(1.05) = 6.98</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 8: Selective Precipitation" 
            question="A solution contains 0.01 M Cl⁻ and 0.001 M I⁻. AgNO₃ is added slowly. Which halide precipitates first, and what concentration of Ag⁺ is needed? (Ksp AgCl = 1.8 × 10⁻¹⁰, Ksp AgI = 8.5 × 10⁻¹⁷)"
            solution={
              <div className="space-y-2">
                <div>Find [Ag⁺] needed to precipitate each halide:</div>
                <div>For AgI to precipitate: [Ag⁺] = Ksp(AgI) / [I⁻] = 8.5 × 10⁻¹⁷ / 0.001 = 8.5 × 10⁻¹⁴ M</div>
                <div>For AgCl to precipitate: [Ag⁺] = Ksp(AgCl) / [Cl⁻] = 1.8 × 10⁻¹⁰ / 0.01 = 1.8 × 10⁻⁸ M</div>
                <div className="mt-2">Conclusion:</div>
                <div>Since AgI requires a much smaller concentration of Ag⁺ (8.5 × 10⁻¹⁴ M vs 1.8 × 10⁻⁸ M), AgI precipitates first.</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 9: Heterogeneous Decomposition" 
            question="At 1100 K, the equilibrium constant Kp for the decomposition of calcium carbonate CaCO₃(s) ⇌ CaO(s) + CO₂(g) is 2.0 atm. If a 10.0 L vessel containing excess CaCO₃ and CaO is filled with CO₂ at 3.0 atm, what will be the final total pressure at equilibrium?"
            solution={
              <div className="space-y-2">
                <div>For the heterogeneous equilibrium CaCO₃(s) ⇌ CaO(s) + CO₂(g):</div>
                <div>Since CaCO₃ and CaO are pure solids, their activities are unity (1).</div>
                <div>The equilibrium expression is simply: Kp = P_CO₂ = 2.0 atm</div>
                <div className="mt-2">Le Chatelier's Principle:</div>
                <div>The initial partial pressure of CO₂ (3.0 atm) is greater than Kp (2.0 atm). Hence, Qp &gt; Kp.</div>
                <div>The system shifts backward: CO₂(g) reacts with CaO(s) to form CaCO₃(s) until P_CO₂ drops to 2.0 atm.</div>
                <div className="mt-2">Conclusion:</div>
                <div>At equilibrium, the partial pressure of CO₂ will be exactly Kp = 2.0 atm. Since CO₂ is the only gaseous species present, the final total pressure is 2.0 atm.</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 10: Amphiprotic Salt pH" 
            question="Calculate the pH of a 0.050 M sodium bicarbonate (NaHCO₃) solution at 298 K. The successive dissociation constants for carbonic acid H₂CO₃ are Ka₁ = 4.5 × 10⁻⁷ and Ka₂ = 4.7 × 10⁻¹¹."
            solution={
              <div className="space-y-2">
                <div>NaHCO₃ dissociates completely in water into Na⁺ and HCO₃⁻.</div>
                <div>HCO₃⁻ is amphiprotic, capable of functioning as both an acid and a base.</div>
                <div className="mt-2">Calculations:</div>
                <div>pK_a₁ = −log(4.5 × 10⁻⁷) = 7 − log(4.5) = 7 − 0.65 = 6.35</div>
                <div>pK_a₂ = −log(4.7 × 10⁻¹¹) = 11 − log(4.7) = 11 − 0.67 = 10.33</div>
                <div className="mt-2">Formula:</div>
                <div>For an amphiprotic anion, the pH is independent of concentration:</div>
                <div>pH = ½ (pK_a₁ + pK_a₂)</div>
                <div>pH = ½ (6.35 + 10.33) = ½ (16.68) = 8.34</div>
              </div>
            }
          />

          <SolvedProblem 
            title="Problem 11: Le Chatelier Quantitative Shift" 
            question="A 1.0 L closed vessel contains 1.0 mol PCl₅, 0.20 mol PCl₃, and 0.20 mol Cl₂ in equilibrium at temp T. The volume is compressed to 0.50 L at constant temp. Compute the new equilibrium concentrations."
            solution={
              <div className="space-y-2">
                <div>1. Compute Kc from initial equilibrium concentrations (V = 1.0 L):</div>
                <div>[PCl₅] = 1.0 M, [PCl₃] = 0.20 M, [Cl₂] = 0.20 M</div>
                <div>Kc = ([PCl₃][Cl₂]) / [PCl₅] = (0.20 × 0.20) / 1.0 = 0.040 M</div>
                <div className="mt-1">2. When volume is halved to 0.50 L, concentrations double initially:</div>
                <div>[PCl₅]₀ = 2.0 M, [PCl₃]₀ = 0.40 M, [Cl₂]₀ = 0.40 M</div>
                <div>Qc = (0.40 × 0.40) / 2.0 = 0.080 M &gt; Kc. Reaction shifts BACKWARD.</div>
                <div className="mt-1">3. ICE Table for shift (let x be M of products shifting back to reactants):</div>
                <div>PCl₅ ⇌ PCl₃ + Cl₂</div>
                <div>E: 2.0 + x &nbsp;&nbsp;&nbsp; 0.40 − x &nbsp;&nbsp;&nbsp; 0.40 − x</div>
                <div className="mt-1">4. Solve for x:</div>
                <div>(0.40 − x)² / (2.0 + x) = 0.040 ➔ 0.16 − 0.80x + x² = 0.080 + 0.040x</div>
                <div>x² − 0.84x + 0.080 = 0</div>
                <div>Solving quadratic: x ≈ 0.11 M (rejecting 0.73 M since x &lt; 0.40)</div>
                <div className="mt-1">5. Final concentrations:</div>
                <div className="text-cyan-300 font-bold">
                  [PCl₅] = 2.11 M, [PCl₃] = 0.29 M, [Cl₂] = 0.29 M
                </div>
              </div>
            }
          />

        </div>
      </Collapsible>

      {/* ── SECTION 13: Common Mistakes & IAT Shortcuts ───────────────────── */}
      <Collapsible title="13 · Common Mistakes & IAT Shortcuts" icon={<Zap className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { title: 'The solid/liquid activity trap', body: 'Never include pure solids or pure liquids in your Kc/Kp expressions. Their activities are 1. For example, in the decomposition of CaCO₃(s) ⇌ CaO(s) + CO₂(g), Kp is simply equal to P_CO₂.' },
              { title: 'Logarithm simplification errors', body: 'In pH calculations, remember that pH = −log[H⁺]. If [H⁺] = 2.0 × 10⁻⁴, pH = 4 − log(2) ≈ 3.7. Do not guess 4.00 or make basic math slip-ups.' },
              { title: 'Δng gaseous state checks', body: 'When relating K<sub>p</sub> = K<sub>c</sub>(RT)<sup>&Delta;n<sub>g</sub></sup>, count gaseous stoichiometric moles only. Ignore any species marked as (s), (l), or (aq).' },
            ].map(trap => <TrapCard key={trap.title} title={trap.title}>{trap.body}</TrapCard>)}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              'Equilibrium constant K depends exclusively on Temperature. Do not let exam questions trick you into saying pressure changes K.',
              'Buffer range is pKa ± 1. Ideal buffer action occurs at pH = pKa.',
              'For weak acid/base salt hydrolysis, the pH is independent of salt concentration: pH = 7 + ½(pKa − pKb).',
              'Strong conjugate bases come from weak acids. Weak conjugate bases come from strong acids.',
              'When calculating solubilities from Ksp, write out the dissociation stoichiometry coefficients as exponents.',
              'For very dilute acids (e.g. 10⁻⁸ M HCl), the pH is never basic. The auto-ionization of water raises [H⁺] to around 1.05 × 10⁻⁷ M, yielding pH = 6.98.',
            ].map((tip, i) => <ExamTip key={i}>{tip}</ExamTip>)}
          </div>
        </div>
      </Collapsible>

      {/* ── RAPID REVISION ────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider">Rapid Revision Checklist</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] text-white/70">
          {[
            'Dynamic equilibrium involves equal rates of forward/reverse processes',
            'Equilibrium requires a closed system to prevent material loss',
            'Solid-liquid equilibrium temperature changes with pressure',
            'Kc and Kp are defined using activities (solids/liquids = 1)',
            'Relation: K<sub>p</sub> = K<sub>c</sub>(RT)<sup>&Delta;n<sub>g</sub></sup> (gaseous &Delta;n<sub>g</sub> only)',
            'Algebraic manipulation rules (K\' = 1/K, K\' = K<sup>n</sup>, K\' = &radic;K)',
            'K depends only on temperature; van\'t Hoff temperature relation',
            'Q < K (forward), Q = K (equil), Q > K (backward)',
            'Gibbs relation: ΔG = ΔG° + RT ln Q; standard ΔG° = −RT ln K',
            'ICE Table method for solving equilibrium compositions',
            'Degree of dissociation α; total mole fraction calculations',
            'Le Chatelier: Volume decrease shifts to fewer gas moles',
            'Inert gas at constant V (no shift) vs constant P (dilution shift)',
            'Catalysts decrease rates to equilibrium but do not shift K or composition',
            'Auto-ionization of water Kw increases with temperature',
            'Conjugate pairs: Ka × Kb = Kw; pKa + pKb = 14',
            'Ostwald\'s Dilution Law: Ka = Cα²/(1−α); α ≈ √(Ka/C) assumes α < 5%',
            'pH of weak acid: pH = ½(pKa − log C)',
            'Polyprotic acid stepwise dissociation: Ka₁ >> Ka₂ >> Ka₃',
            'Salt hydrolysis Kh: WA+SB (basic), SA+WB (acidic), WA+WB (independent of C)',
            'Buffer mechanisms: added proton/hydroxide consumption conjugate reactions',
            'Henderson-Hasselbalch equations for acidic and basic buffers',
            'Solubility product constants Ksp, solubilities for 1:1, 1:2, 2:3 salts',
            'Common ion effect decreases salt solubility and suppressing ionization',
            'Precipitation occurs only if Qsp > Ksp',
            'Selective precipitation based on differing Ksp limits',
            'Extremely dilute acid pH trap: water contribution quadratic correction',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5 shrink-0 font-bold font-sans">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
