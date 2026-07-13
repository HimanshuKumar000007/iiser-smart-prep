import React, { useState } from 'react';
import { Clock, Target, BarChart2, Flame, HelpCircle, Check, PlayCircle, Star, AlertOctagon, Lightbulb, Copy, Sparkles, CheckCircle, ArrowRight, BookOpen, RefreshCw, Brain, Activity, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

export function UnitsLessonDetail({ isCompleted, onNavigate }: Props) {
  // Tap-to-reveal states
  const [revealAccuracy, setRevealAccuracy] = useState(false);
  const [revealPrecision, setRevealPrecision] = useState(false);

  // Copy states
  const [copiedFormula, setCopiedFormula] = useState<number | null>(null);

  // Interactive Vernier Calliper Slider State (0 to 15 mm)
  const [vernierVal, setVernierVal] = useState(2.4);

  // Interactive Screw Gauge Slider State (0 to 100 divisions)
  const [screwVal, setScrewVal] = useState(35);

  // Interactive Sig Fig Tester State
  const [sigFigInput, setSigFigInput] = useState('0.0750');

  // Interactive Revision Checklist States
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setChecklist((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyFormulaText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedFormula(index);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  // Helper to calculate significant figures for the interactive tester
  const calculateSigFigs = (numStr: string): { count: number; explanation: string } => {
    const trimmed = numStr.trim();
    if (!trimmed || isNaN(Number(trimmed))) {
      return { count: 0, explanation: 'Please enter a valid numeric value.' };
    }

    let count = 0;
    let explanation = '';

    if (!trimmed.includes('.')) {
      const nonZeroMatch = trimmed.match(/[^0]/g);
      if (!nonZeroMatch) {
        return { count: 1, explanation: 'Zero itself has 1 significant figure.' };
      }
      const firstIdx = trimmed.indexOf(nonZeroMatch[0]);
      const lastIdx = trimmed.lastIndexOf(nonZeroMatch[nonZeroMatch.length - 1]);
      count = lastIdx - firstIdx + 1;
      explanation = `Integer without decimal point: Trailing zeros are not significant. Only digits from the first non-zero to the last non-zero count (${trimmed.substring(firstIdx, lastIdx + 1)}).`;
    } else {
      const parts = trimmed.split('.');
      const whole = parts[0];
      const frac = parts[1];

      let firstNonZeroIndex = -1;
      for (let i = 0; i < trimmed.length; i++) {
        if (trimmed[i] !== '0' && trimmed[i] !== '.') {
          firstNonZeroIndex = i;
          break;
        }
      }

      if (firstNonZeroIndex === -1) {
        return { count: trimmed.replace('.', '').length, explanation: 'All zeros after a decimal point in a decimal fraction are significant.' };
      }

      const significantPart = trimmed.substring(firstNonZeroIndex).replace('.', '');
      count = significantPart.length;
      explanation = `Decimal number: Leading zeros are not significant, but trailing zeros after the decimal point ARE significant (${significantPart}).`;
    }

    return { count, explanation };
  };

  const sigFigResult = calculateSigFigs(sigFigInput);
  const checklistCompletedCount = Object.values(checklist).filter(Boolean).length;
  const isChecklistFinished = checklistCompletedCount === 8;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 1</span>
      </div>

      {/* Subject Header */}
      <div className="relative overflow-hidden p-6 bg-gradient-to-br from-[#0B0D1B] via-[#0D0F22] to-[#12142E] border border-white/10 rounded-3xl space-y-6 shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute -top-12 -right-12 w-72 h-72 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-violet-600/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center flex-wrap gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 shadow-lg shadow-violet-500/10">
                <Brain className="w-5.5 h-5.5" />
              </div>
              <div className="flex items-center gap-2">
 <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-[12px] font-bold uppercase tracking-wider">
                  PHYSICS UNIT 1
                </span>
 <span className="px-3 py-1 rounded-full bg-[#3B1219] border border-rose-500/30 text-rose-400 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> HIGH WEIGHTAGE
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Units, Measurements and Error Analysis
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
 <div className="text-[12px] font-bold uppercase tracking-widest text-cyan-400/80">
              CORE NCERT FOUNDATION FOR IISER IAT EXAM
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">REVISION TIME</div>
 <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>25 min</span>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">IAT IMPORTANCE</div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-3.5 space-y-1 hover:translate-y-[-2px] hover:border-cyan-500/30 transition-all duration-300">
 <div className="text-white/40 text-[10px] uppercase tracking-wider">YEARLY OCCURRENCE</div>
 <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>1-2 questions every year</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. What You'll Learn ─────────────────────────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">What You'll Learn</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              'Measurement theory & n1u1 = n2u2 equations',
              'Dimensional analysis consistency & base dimensions',
              'Accuracy vs. Precision (Least Count limits)',
              'Significant figures rules & scientific rounding',
              'Error propagation laws (addition & powers)',
              'Vernier Calliper & Screw Gauge true readings'
            ].map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-white/70">
                <div className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-cyan-400" />
                </div>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Concept 1: Measurement & Dimensional Analysis ─────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Concept 1: Core Fundamentals</h3>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px] sm:text-base flex items-center gap-2">
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Concept
            </span>
            Measurement & Dimensional Analysis
          </h4>
          
          <div className="text-white/70 text-[13px] sm:text-sm space-y-3 leading-relaxed">
            <p>
              <strong>Measurement:</strong> Expressing a physical quantity (Q) as a numerical value (n) * unit (u). The magnitude remains constant across different systems of units:
            </p>
            <div className="my-2 bg-[#05060F] p-3 rounded-xl border border-white/5 text-center">
              <span className="text-cyan-300 font-mono font-bold text-[14.5px]">n1 * u1 = n2 * u2  ⟹  n ∝ 1/u</span>
            </div>
            <p>
              <strong>Dimensional Analysis:</strong> Representing physical quantities in base dimensions <code>[M, L, T, A, K, mol, cd]</code> to check equation consistency or derive formulas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-1">
            <span className="text-[12px] font-black text-cyan-400 tracking-wider uppercase block">💡 Example / Application</span>
            <p className="text-white/60 text-[13px] leading-relaxed">
              If density is expressed in g/cm³ (u1) and kg/m³ (u2), since u2 is larger, the numerical factor n2 is smaller.
            </p>
          </div>

          {/* Dimension Tree Diagram */}
          <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3">
            <span className="text-[12px] font-black text-white/40 uppercase tracking-widest">Visual: Dimension Tree</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                <span className="text-[12px] text-cyan-400 font-bold block uppercase mb-1">Base Dimensions</span>
 <span className="text-[13px] text-white block">[M], [L], [T], [A]</span>
                <span className="text-[10px] text-white/30 block mt-1">Fundamental, independent</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                <span className="text-[12px] text-indigo-400 font-bold block uppercase mb-1">Mechanic Derived</span>
 <span className="text-[13px] text-white block">Force: [M L T⁻²]</span>
                <span className="text-[10px] text-white/30 block mt-1">Built from base values</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                <span className="text-[12px] text-amber-400 font-bold block uppercase mb-1">Electromagnetic</span>
 <span className="text-[13px] text-white block">Charge: [AT]</span>
                <span className="text-[10px] text-white/30 block mt-1">Uses Ampere [A] as base</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Concept 2: Significant Figures, Accuracy & Precision ────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Concept 2: Significant Figures & Precision</h3>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6">
          <h4 className="text-white font-bold text-[14.5px] sm:text-base flex items-center gap-2">
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Concept
            </span>
            Accuracy vs. Precision
          </h4>

          {/* Interactive Tap-to-Reveal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Accuracy */}
            <div
              onClick={() => setRevealAccuracy(!revealAccuracy)}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer space-y-2 select-none relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-black text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span>🎯 Accuracy</span>
                </span>
                <span className="text-[10px] text-cyan-400 font-bold uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                  {revealAccuracy ? 'Hide Details' : 'Reveal Answer'}
                </span>
              </div>
              <p className="text-white font-bold text-[14.5px]">How close is the measurement to the true value?</p>
              
              {revealAccuracy ? (
                <p className="text-white/60 text-[13px] sm:text-sm leading-relaxed pt-2 border-t border-white/5 animate-in fade-in duration-300">
                  Accuracy indicates how close a measured value is to the true or accepted standard value. It depends primarily on systematic errors (e.g. calibration, zero errors).
                </p>
              ) : (
                <div className="h-6 flex items-center text-[13px] text-white/30 font-medium">Click to reveal details...</div>
              )}
            </div>

            {/* Precision */}
            <div
              onClick={() => setRevealPrecision(!revealPrecision)}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer space-y-2 select-none relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span>🔍 Precision</span>
                </span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                  {revealPrecision ? 'Hide Details' : 'Reveal Answer'}
                </span>
              </div>
              <p className="text-white font-bold text-[14.5px]">How exact is the measurement resolution?</p>

              {revealPrecision ? (
                <p className="text-white/60 text-[13px] sm:text-sm leading-relaxed pt-2 border-t border-white/5 animate-in fade-in duration-300">
                  Precision refers to the repeatability or limit of resolution of the instrument. It is determined strictly by the <strong>Least Count</strong> of the measuring device.
                </p>
              ) : (
                <div className="h-6 flex items-center text-[13px] text-white/30 font-medium">Click to reveal details...</div>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#05060F] border border-white/5 space-y-3.5">
            <span className="text-[12px] font-black text-cyan-400 tracking-wider uppercase block">📊 Types of Experimental Errors</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] sm:text-sm text-white/70">
              <div className="space-y-1.5">
                <span className="font-bold text-white block">Systematic Errors (Unidirectional)</span>
                <p className="text-white/50 text-[13px] leading-relaxed">
                  Errors that tend to be in one direction (either positive or negative). Common causes include instrumental errors (calibration flaws, zero errors), personal bias, or environmental fluctuations. They can be mathematically modeled and eliminated.
                </p>
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-white block">Random Errors (Statistical)</span>
                <p className="text-white/50 text-[13px] leading-relaxed">
                  Errors that occur irregularly and are unpredictable in sign and magnitude. They stem from statistical variations in readings. They cannot be eliminated, but are minimized by taking the arithmetic mean of multiple repeated measurements.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-1">
            <span className="text-[12px] font-black text-cyan-400 tracking-wider uppercase block">💡 Significant Figures & Scientific Rounding</span>
            <p className="text-white/60 text-[13px] leading-relaxed">
              Leading zeros are never significant (e.g. 0.0034 has 2 sig figs). Trailing zeros are significant if a decimal point is present (e.g. 34.00 has 4 sig figs).
            </p>
          </div>

          {/* Interactive Significant Figures Tester */}
          <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-cyan-400" />
              <span className="text-[12px] font-black text-white/60 uppercase tracking-widest">Interactive Sig Fig Calculator</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={sigFigInput}
                onChange={(e) => setSigFigInput(e.target.value)}
                placeholder="Type a number (e.g. 0.00750)"
 className="flex-1 px-4 py-2.5 rounded-xl bg-[#05060F] border border-white/10 text-white text-[14.5px] focus:outline-none focus:border-cyan-500/50"
              />
              <div className="px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center gap-2 text-cyan-400 font-bold text-[13px]">
                <span>Result:</span>
 <span className="text-[14.5px] font-black">{sigFigResult.count}</span>
                <span>Sig Figs</span>
              </div>
            </div>
            <p className="text-[13px] text-white/50 leading-relaxed font-medium bg-white/[0.01] p-3 rounded-lg border border-white/5">
              {sigFigResult.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* ── 5. Concept 3: Key Formulas & Error Propagation ─────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Concept 3: Error Propagation</h3>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6">
          <h4 className="text-white font-bold text-[14.5px] sm:text-base flex items-center gap-2">
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Concept
            </span>
            Principle of Homogeneity & Error Bounds
          </h4>
          
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            <strong>Principle of Homogeneity:</strong> You can only add or subtract quantities with identical dimensions. For example, if <code>A = B + C - D</code>, then their dimensions must match exactly: <code>[A] = [B] = [C] = [D]</code>.
          </p>

          {/* Premium Formula cards layout */}
          <div className="space-y-3.5">
            {/* Formula 1 */}
            <div className="p-4 rounded-2xl bg-[#05060F] border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase rounded-md">
                  ⭐ Formula
                </span>
                <div className="text-[14.5px] font-mono font-bold text-cyan-300 select-all">ΔZ = ΔA + ΔB</div>
                <div className="text-[12px] text-white/40">Used in: <strong>Absolute Error for Z = A ± B</strong></div>
              </div>

              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-white/40 block">Shortcut / Tip</span>
                <span className="text-[12px] text-white/60 font-medium">Errors ALWAYS add up to find maximum possible uncertainty.</span>
              </div>
            </div>

            {/* Formula 2 */}
            <div className="p-4 rounded-2xl bg-[#05060F] border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase rounded-md">
                  ⭐ Formula
                </span>
                <div className="text-[14.5px] font-mono font-bold text-cyan-300 select-all">ΔZ/Z = x(ΔA/A) + y(ΔB/B) + z(ΔC/C)</div>
                <div className="text-[12px] text-white/40">Used in: <strong>Percentage Error for Z = Aˣ Bʸ / Cᶻ</strong></div>
              </div>

              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block font-black">🔥 Hot Shortcut</span>
                <span className="text-[12px] text-cyan-300 font-bold">Used in 9/10 IAT questions to link relative errors.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3b. Error Statistics Formulas ───────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Concept 3b: Error Statistics</h3>
        </div>
        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
          <h4 className="text-white font-bold text-[14.5px] sm:text-base flex items-center gap-2">
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Concept</span>
            Mean, Relative &amp; Percentage Error
          </h4>

          {/* Scientific notation note */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/60 leading-relaxed">
 <strong className="text-white">Scientific Notation:</strong> Write any measurement as <span className="text-cyan-300">N * 10ⁿ</span> where 1 ≤ N &lt; 10 to clearly express significant figures. E.g. 0.00302 = <span className="text-cyan-300">3.02 * 10⁻³</span> (3 sig figs). Trailing zeros only count when after a decimal point.
          </div>

          <div className="space-y-3">
            {[
              {
                label: 'Mean Absolute Error',
                formula: 'Δaₜ = (Σ|Δaᵢ|) / n',
                note: 'Average of all individual absolute deviations from the mean. Always positive.',
                tag: 'Formula'
              },
              {
                label: 'Relative (Fractional) Error',
                formula: 'Δa / aₜєєᵒ',
                note: 'Ratio of mean absolute error to mean value. Dimensionless.',
                tag: 'Formula'
              },
              {
                label: 'Percentage Error',
                formula: '(Δa / aₜєєᵒ) * 100 %',
                note: 'Commonly asked in IAT numericals. Report final answer to same sig figs as measurement.',
                tag: 'Hot Formula'
              },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#05060F] border border-white/5 hover:border-cyan-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase rounded-md">{f.tag}</span>
                  <div className="text-[14.5px] font-mono font-bold text-cyan-300">{f.label}: {f.formula}</div>
                </div>
                <p className="text-[12px] text-white/45 md:text-right md:max-w-[45%] leading-relaxed">{f.note}</p>
              </div>
            ))}
          </div>

          {/* Rounding Rules */}
          <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/15 space-y-2 text-[13px]">
            <span className="text-[12px] font-black text-indigo-400 uppercase tracking-wider block">Rounding Rules (for Sig Figs)</span>
            <div className="space-y-1 text-white/60 leading-relaxed">
              <p>• If digit to be dropped &lt; 5 → <strong>round down</strong> (e.g. 3.734 → 3.73)</p>
              <p>• If digit to be dropped &gt; 5 → <strong>round up</strong> (e.g. 3.736 → 3.74)</p>
              <p>• If digit to be dropped = 5 and followed by non-zero → round up (3.751 → 3.8)</p>
              <p>• If digit = 5 exactly and preceding digit is odd → round up; if even → round down (“Banker’s Rounding”)</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. Concept 4: Measuring Instruments & Zero Errors ────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Concept 4: Measuring Instruments</h3>
        </div>

        <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6">
          <h4 className="text-white font-bold text-[14.5px] sm:text-base flex items-center gap-2">
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Concept
            </span>
            Vernier Calliper & Screw Gauge Scales
          </h4>

          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed bg-rose-500/5 p-4 rounded-2xl border border-rose-500/10">
            <strong>True Reading Rule:</strong> <code>True Reading = Measured Value − Zero Error</code> (include the proper sign of the zero error: subtract positive zero error, add negative zero error!).
          </p>

          {/* ── Least Count & Instrument Formulas ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vernier LC */}
            <div className="p-4 rounded-2xl bg-[#05060F] border border-cyan-500/15 space-y-2">
              <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider block">Vernier Calliper</span>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-baseline gap-2">
                  <span className="text-white/40 text-[11px] w-24 shrink-0">Least Count</span>
                  <span className="font-mono font-bold text-cyan-300">LC = 1 MSD − 1 VSD = S / N</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/40 text-[11px] w-24 shrink-0">Reading</span>
                  <span className="font-mono font-bold text-cyan-300">MSR + (VSR * LC)</span>
                </div>
                <p className="text-white/40 text-[12px] leading-relaxed">S = 1 main-scale division value, N = number of vernier divisions. Typical LC = 0.1 mm.</p>
              </div>
            </div>
            {/* Screw Gauge LC */}
            <div className="p-4 rounded-2xl bg-[#05060F] border border-indigo-500/15 space-y-2">
              <span className="text-[11px] font-black text-indigo-400 uppercase tracking-wider block">Screw Gauge</span>
              <div className="space-y-1.5 text-[13px]">
                <div className="flex items-baseline gap-2">
                  <span className="text-white/40 text-[11px] w-24 shrink-0">Pitch</span>
 <span className="font-bold text-indigo-300">Distance moved in one full rotation</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/40 text-[11px] w-24 shrink-0">Least Count</span>
 <span className="font-bold text-indigo-300">LC = Pitch / N (circular divisions)</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white/40 text-[11px] w-24 shrink-0">Reading</span>
 <span className="font-bold text-indigo-300">PSR + (CSR * LC)</span>
                </div>
                <p className="text-white/40 text-[12px] leading-relaxed">PSR = pitch scale reading, CSR = circular scale reading. Typical LC = 0.01 mm.</p>
              </div>
            </div>
          </div>

          {/* Zero Error Types */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2">
            <span className="text-[12px] font-black text-amber-400 uppercase tracking-wider block">Zero Error Types</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Positive Zero Error</span>
 <p className="text-white/55 leading-relaxed">Zero of vernier/thimble is to the <em>right</em> of the main-scale zero when jaws are closed. Correction: <span className="text-cyan-300">subtract</span> the error.</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-white block">Negative Zero Error</span>
 <p className="text-white/55 leading-relaxed">Zero of vernier/thimble is to the <em>left</em> of the main-scale zero. Correction: <span className="text-cyan-300">add</span> the absolute error value.</p>
              </div>
            </div>
          </div>

          {/* Interactive Vernier and Screw Gauge Simulator Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Vernier Calliper Simulator */}
            <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-white/40 uppercase tracking-widest block">Interactive: Vernier Simulator</span>
 <span className="text-[13px] font-bold text-cyan-400">{vernierVal.toFixed(1)} mm</span>
              </div>

              {/* Slider scale representation */}
              <div className="h-24 bg-[#05060F] rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 80">
                  {/* Main Scale bar */}
                  <rect x="5" y="20" width="190" height="20" fill="#1e293b" rx="2" />
                  {/* Main scale tick marks */}
                  {Array.from({ length: 31 }).map((_, i) => {
                    const x = 10 + i * 6;
                    return (
                      <g key={i}>
                        <line x1={x} y1="20" x2={x} y2={i % 10 === 0 ? "35" : i % 5 === 0 ? "30" : "26"} stroke="#94a3b8" strokeWidth="0.8" />
                        {i % 10 === 0 && (
                          <text x={x} y="15" fill="#94a3b8" fontSize="5" textAnchor="middle">{i / 10}cm</text>
                        )}
                      </g>
                    );
                  })}

                  {/* Vernier scale slider (translates according to vernierVal) */}
                  <g transform={`translate(${vernierVal * 6}, 0)`}>
                    <rect x="10" y="40" width="60" height="20" fill="#334155" fillOpacity="0.9" rx="2" />
                    {/* Vernier ticks (aligned slightly differently, 9/10 spacing = 5.4) */}
                    {Array.from({ length: 11 }).map((_, i) => {
                      const x = 15 + i * 5.4;
                      return (
                        <g key={i}>
                          <line x1={x} y1="40" x2={x} y2="48" stroke="#38bdf8" strokeWidth="0.8" />
                          {i % 5 === 0 && (
                            <text x={x} y="55" fill="#38bdf8" fontSize="4" textAnchor="middle">{i}</text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Vernier slider control */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] text-white/40">
                  <span>Slide to measure:</span>
                  <span>Max: 15.0 mm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.1"
                  value={vernierVal}
                  onChange={(e) => setVernierVal(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>

            {/* Screw Gauge Simulator */}
            <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-white/40 uppercase tracking-widest block">Interactive: Screw Gauge thimble</span>
 <span className="text-[13px] font-bold text-indigo-400">{screwVal} divisions (LC=0.01mm)</span>
              </div>

              {/* Screw gauge circular scale */}
              <div className="h-24 bg-[#05060F] rounded-xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 80">
                  {/* Sleeve */}
                  <rect x="5" y="30" width="80" height="20" fill="#334155" />
                  <line x1="5" y1="40" x2="85" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Sleeve main scale ticks */}
                  {Array.from({ length: 11 }).map((_, i) => (
                    <g key={i}>
                      <line x1={15 + i * 6} y1="40" x2={15 + i * 6} y2="34" stroke="#94a3b8" strokeWidth="0.8" />
                      <line x1={18 + i * 6} y1="40" x2={18 + i * 6} y2="46" stroke="#94a3b8" strokeWidth="0.8" />
                    </g>
                  ))}

                  {/* Rotating Thimble (vertical translation to simulate rotation scroll) */}
                  <g transform={`translate(0, 0)`}>
                    <rect x="85" y="10" width="70" height="60" fill="#1e293b" rx="2" />
                    <line x1="85" y1="10" x2="85" y2="70" stroke="#38bdf8" strokeWidth="2" />
                    {/* Ticks shift vertically based on screwVal */}
                    {Array.from({ length: 25 }).map((_, i) => {
                      const value = (i - 10) * 5;
                      const yPos = 40 + (i - 10) * 5.5 - (screwVal % 5) * 1.1;
                      const displayVal = (50 + value - Math.floor(screwVal / 5) * 5) % 50;

                      if (yPos >= 15 && yPos <= 65) {
                        return (
                          <g key={i}>
                            <line x1="85" y1={yPos} x2="97" y2={yPos} stroke="#38bdf8" strokeWidth="0.8" />
                            <text x="101" y={yPos + 2} fill="#38bdf8" fontSize="4.5" textAnchor="start">{displayVal}</text>
                          </g>
                        );
                      }
                      return null;
                    })}
                  </g>
                </svg>
              </div>

              {/* Screw gauge slider control */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] text-white/40">
                  <span>Rotate circular thimble:</span>
                  <span>50 Div / Rotation</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={screwVal}
                  onChange={(e) => setScrewVal(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 7. SI Prefixes Reference Card ────────────────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">SI Prefixes Reference</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">nano (n)</span>
 <span className="text-cyan-400 font-bold block mt-1">10⁻⁹</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">micro (μ)</span>
 <span className="text-cyan-400 font-bold block mt-1">10⁻⁶</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">milli (m)</span>
 <span className="text-cyan-400 font-bold block mt-1">10⁻³</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">centi (c)</span>
 <span className="text-cyan-400 font-bold block mt-1">10⁻²</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">kilo (k)</span>
 <span className="text-cyan-400 font-bold block mt-1">10³</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">mega (M)</span>
 <span className="text-cyan-400 font-bold block mt-1">10⁶</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">giga (G)</span>
 <span className="text-cyan-400 font-bold block mt-1">10⁹</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
              <span className="font-bold text-white block">tera (T)</span>
 <span className="text-cyan-400 font-bold block mt-1">10¹²</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 7b. SI Base & Supplementary Units ────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-48 h-48 bg-violet-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-400" />
              <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">SI Base &amp; Supplementary Units</h3>
            </div>
            <span className="text-[12px] font-black text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded-full uppercase">Must Know</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase tracking-widest text-[10px] font-bold">
                  <th className="py-2.5">Quantity</th>
                  <th className="py-2.5">Unit Name</th>
                  <th className="py-2.5">Symbol</th>
                  <th className="py-2.5">Dimension</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                {[
                  { qty: 'Length', unit: 'metre', sym: 'm', dim: '[L]', type: 'base' },
                  { qty: 'Mass', unit: 'kilogram', sym: 'kg', dim: '[M]', type: 'base' },
                  { qty: 'Time', unit: 'second', sym: 's', dim: '[T]', type: 'base' },
                  { qty: 'Electric Current', unit: 'ampere', sym: 'A', dim: '[A]', type: 'base' },
                  { qty: 'Temperature', unit: 'kelvin', sym: 'K', dim: '[Θ]', type: 'base' },
                  { qty: 'Amount of Substance', unit: 'mole', sym: 'mol', dim: '[N]', type: 'base' },
                  { qty: 'Luminous Intensity', unit: 'candela', sym: 'cd', dim: '[J]', type: 'base' },
                  { qty: 'Plane Angle', unit: 'radian', sym: 'rad', dim: '[M⁰L⁰T⁰]', type: 'supp' },
                  { qty: 'Solid Angle', unit: 'steradian', sym: 'sr', dim: '[M⁰L⁰T⁰]', type: 'supp' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="py-2.5 font-semibold text-white/80 group-hover:text-violet-300 transition-colors">{row.qty}</td>
                    <td className="py-2.5 text-white/60">{row.unit}</td>
 <td className="py-2.5 font-bold text-violet-400">{row.sym}</td>
 <td className="py-2.5 text-cyan-400 text-[12px]">
                      <span className="flex items-center gap-1.5">
                        {row.dim}
                        <span className={row.type === 'supp'
                          ? 'text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20'
                        }>{row.type === 'supp' ? 'Suppl.' : 'Base'}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/10 text-[12px] text-white/50 leading-relaxed">
            <strong className="text-violet-400">Modern Definitions (key facts):</strong> 1 metre = distance light travels in 1/299,792,458 s &bull; 1 second = 9,192,631,770 oscillations of Cs-133 atom &bull; 1 kg defined by fixing Planck’s constant h = 6.626×10⁻³⁴ J·s.
          </div>
        </div>
      </div>

      {/* ── 8. High-Frequency Dimensions Table ───────────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">High-Frequency Dimensions</h3>
            </div>
            <span className="text-[12px] font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase">
              Memorization Sheet
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px] sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 uppercase tracking-widest text-[10px] font-bold">
                  <th className="py-2.5">Physical Quantity</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Dimensional Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                {[
                  { name: 'Force / Tension / Thrust', cat: 'Mechanical', formula: '[M L T⁻²]' },
                  { name: 'Work / Energy / Torque / Heat', cat: 'Mechanical', formula: '[M L² T⁻²]' },
                  { name: 'Pressure / Stress / Elastic Modulus', cat: 'Mechanical', formula: '[M L⁻¹ T⁻²]' },
                  { name: 'Universal Gravitational Constant (G)', cat: 'Mechanical', formula: '[M⁻¹ L³ T⁻²]' },
                  { name: 'Planck\'s Constant (h)', cat: 'Mechanical', formula: '[M L² T⁻¹]' },
                  { name: 'Coefficient of Viscosity (η)', cat: 'Mechanical', formula: '[M L⁻¹ T⁻¹]' },
                  
                  { name: 'Specific Heat Capacity (s)', cat: 'Thermal', formula: '[M⁰ L² T⁻² K⁻¹]' },
                  { name: 'Latent Heat (L)', cat: 'Thermal', formula: '[M⁰ L² T⁻²]' },
                  { name: 'Thermal Conductivity (K)', cat: 'Thermal', formula: '[M L T⁻³ K⁻¹]' },
                  { name: 'Stefan-Boltzmann Constant (σ)', cat: 'Thermal', formula: '[M L⁰ T⁻³ K⁻⁴]' },
                  
                  { name: 'Permittivity (ε₀)', cat: 'Electromagnetic', formula: '[M⁻¹ L⁻³ T⁴ A²]' },
                  { name: 'Permeability (μ₀)', cat: 'Electromagnetic', formula: '[M L T⁻² A⁻²]' },
                  
                  { name: 'Refractive Index (μ)', cat: 'Optical', formula: '[M⁰ L⁰ T⁰] (Dimensionless)' },
                  { name: 'Power of a Lens (P)', cat: 'Optical', formula: '[L⁻¹]' },
                  { name: 'Boltzmann Constant (kᴮ)', cat: 'Thermal', formula: '[M L² T⁻² K⁻¹]' },
                  { name: 'Universal Gas Constant (R)', cat: 'Thermal', formula: '[M L² T⁻² K⁻¹ mol⁻¹]' },
                  { name: 'Rydberg Constant (R∞)', cat: 'Optical', formula: '[L⁻¹]' }
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="py-3 font-semibold text-white/80 group-hover:text-cyan-300 transition-colors">{item.name}</td>
                    <td className="py-3">
                      <span className={cn(
                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                        item.cat === 'Mechanical' && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                        item.cat === 'Thermal' && "bg-rose-500/10 text-rose-400 border border-rose-500/20",
                        item.cat === 'Electromagnetic' && "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                        item.cat === 'Optical' && "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      )}>
                        {item.cat}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-cyan-400 font-bold">{item.formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── 9. Conceptual Insights & Limitations ──────────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Lightbulb className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Conceptual Insights & Limitations</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] sm:text-sm">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors space-y-2">
              <span className="font-bold text-white block">Dimensionless vs. Unitless</span>
              <p className="text-white/60 leading-relaxed text-[13px]">
                A <strong>dimensionless</strong> quantity can still have a unit (e.g. Plane Angle has dimensions [M⁰ L⁰ T⁰] but its unit is Radians). However, a <strong>unitless</strong> quantity is always dimensionless (e.g. Refractive Index, Strain).
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors space-y-2">
              <span className="font-bold text-white block">Math Functions Arguments</span>
              <p className="text-white/60 leading-relaxed text-[13px]">
                The arguments of trigonometric functions (sin(θ)), logs (ln(x)), and exponentials (e^kx) must be strictly dimensionless [M⁰ L⁰ T⁰].
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors space-y-2 col-span-1 sm:col-span-2">
              <span className="font-bold text-cyan-400 block flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-cyan-400" />
                <span>Limitations of Dimensional Analysis (High-Yield IAT Point)</span>
              </span>
              <ul className="text-white/60 text-[13px] leading-relaxed space-y-1 list-disc pl-4">
                <li>Cannot determine dimensionless constants of proportionality (e.g., the constant 4&pi;<sup>2</sup> in pendulum cannot be found).</li>
                <li>Cannot distinguish between physically distinct quantities sharing identical dimensions (e.g., Torque and Work both share [ML<sup>2</sup>T<sup>&minus;2</sup>]).</li>
                <li>Cannot derive relationships where a variable depends on more than three variables using base mechanics equations (M, L, T).</li>
                <li>Cannot derive formulas involving trigonometric (sin &theta;), logarithmic (ln x), or exponential (e<sup>kx</sup>) terms.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── 10. Exam Traps ⚠️ ─────────────────────────────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Exam Traps ⚠️</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1.5 hover:border-rose-500/20 transition-colors">
              <span className="text-[12px] font-black text-rose-400 block uppercase">Trap 1: Subtraction Errors</span>
              <p className="text-white/60 text-[13px] leading-relaxed">
                For Z = A - B, absolute errors STILL ADD (ΔZ = ΔA + ΔB). Never subtract errors!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1.5 hover:border-rose-500/20 transition-colors">
              <span className="text-[12px] font-black text-rose-400 block uppercase">Trap 2: Sig Fig Mixing</span>
              <p className="text-white/60 text-[13px] leading-relaxed">
                Addition uses decimal places; Multiplication uses total significant figures. Keep these rules separate.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-1.5 hover:border-rose-500/20 transition-colors">
              <span className="text-[12px] font-black text-rose-400 block uppercase">Trap 3: Zero Error Signs</span>
              <p className="text-white/60 text-[13px] leading-relaxed">
                Subtract Positive zero error from reading. Add Negative zero error to reading.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 11. Example Applications & IAT Exam Focus Points ──────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Lightbulb className="w-5 h-5 text-indigo-400" />
            <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">IAT Question Patterns & Shortcuts</h3>
          </div>

          <div className="space-y-4 text-[13px] sm:text-sm">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 hover:border-white/10 transition-colors">
              <span className="font-bold text-cyan-400 block">Van der Waals Equation Dimensional Analysis</span>
              <p className="text-white/60 leading-relaxed text-[13px]">
                Equation: <code>(P + a/V²)(V - b) = RT</code>
                <br />• By homogeneity, <code>[a/V²] = [P] ⟹ [a] = [P][V]² = [M L⁵ T⁻²]</code>.
                <br />• <code>[b] = [V] = [L³]</code>.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2 hover:border-white/10 transition-colors">
              <span className="font-bold text-cyan-400 block">Time Saver: Non-standard Base Quantities</span>
              <p className="text-white/60 leading-relaxed text-[13px]">
                If Force (F), Velocity (V), and Time (T) are fundamental, find dimensions of Mass.
                <br />• Shortcut: <code>F = ma ⟹ F = m(V/T) ⟹ m = FT/V ⟹ [F¹ V⁻¹ T¹]</code>. No need for solving equations!
              </p>
            </div>

            {/* EM Analogs */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 uppercase text-[10px] font-bold">
                    <th className="py-2">Dimension</th>
                    <th className="py-2">Electromagnetic Combinations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  <tr>
                    <td className="py-2.5 font-bold">[T] (Time)</td>
 <td className="py-2.5 text-cyan-400">L/R, RC, √(LC)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">[LT⁻¹] (Velocity)</td>
 <td className="py-2.5 text-cyan-400">E/B, 1/√(μ₀ε₀)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">[ML⁻¹T⁻²] (Energy Density)</td>
 <td className="py-2.5 text-cyan-400">½ε₀E², B²/(2μ₀)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── 12. PYQ References ───────────────────────────────────────────── */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">Asked in Previous IATs</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] sm:text-sm">
            <div className="p-4 rounded-xl bg-[#05060F] border border-emerald-500/20 flex items-center justify-between">
              <div>
 <span className="text-[12px] font-black text-emerald-400 uppercase block">IAT 2022</span>
                <span className="text-white font-bold">Question 5 (Dimensional Analysis)</span>
              </div>
              <Check className="w-5 h-5 text-emerald-400" />
            </div>

            <div className="p-4 rounded-xl bg-[#05060F] border border-emerald-500/20 flex items-center justify-between">
              <div>
 <span className="text-[12px] font-black text-emerald-400 uppercase block">IAT 2024</span>
                <span className="text-white font-bold">Question 2 (Error Propagation)</span>
              </div>
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 13. Interactive Revision Checklist in 2 Minutes ────────────────── */}
      <div className="bg-[#0A0C18] border border-emerald-500/10 rounded-3xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-400 animate-pulse" />
              <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider">🔥 Revision in 2 Minutes</h3>
            </div>
            
            <div className="text-[12px] font-bold text-white/50">
 Checklist: <span className="text-cyan-400">{checklistCompletedCount}/8</span> reviewed
            </div>
          </div>

          <p className="text-[13px] text-white/45">
            Click each concept checklist bullet below to mark it reviewed and finalize your prep.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              'Principle of Homogeneity: Only add/subtract same dimensions.',
              'Errors ALWAYS add (ΔZ = ΔA + ΔB) in addition and subtraction.',
              'For powers, fractional errors multiply by exponent: ΔZ/Z = a(ΔA/A) + b(ΔB/B).',
              'Least count limits precision; systematic errors dictate accuracy.',
              'Zero error correction: True reading = measured reading − zero error (keep signs!).',
              'Dimensionless quantities (e.g. Angle) can have units, but unitless values are always dimensionless.'
            ].map((bullet, idx) => {
              const isChecked = !!checklist[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={cn(
                    'p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none hover:scale-[1.01]',
                    isChecked
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-white/80'
                      : 'bg-white/[0.01] border-white/5 text-white/60 hover:border-white/10'
                  )}
                >
                  <div className={cn(
                    'w-4.5 h-4.5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-all',
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'border-white/20 bg-white/5'
                  )}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                  </div>
                  <span className="text-[13px] leading-relaxed">{bullet}</span>
                </div>
              );
            })}
          </div>

          {isChecklistFinished && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-in zoom-in-95 duration-300">
              <span className="text-emerald-400 font-bold text-[13px] sm:text-sm">🎉 Excellent! You have reviewed all key checklist items.</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
