import React, { useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
  Star, AlertTriangle, CheckCircle,
  BookOpen, Flame, Target, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

// ─── MATH RENDERING HELPERS ──────────────────────────────────────────────────
const InlineMath: React.FC<{ math: string; className?: string }> = ({ math, className }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode: false,
      throwOnError: false,
    });
    return <span className={cn("inline-block", className)} dangerouslySetInnerHTML={{ __html: html }} />;
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
    return <div className={cn("overflow-x-auto py-2 my-2 text-center", className)} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (e) {
    return <div className={cn("font-mono my-2 text-center", className)}>{math}</div>;
  }
};

const renderMathText = (text: string) => {
  if (!text) return null;
  const parts = text.split('$');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <InlineMath key={index} math={part} />;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG 1: ENERGY BAND DIAGRAMS ──────────────────────────────────────────────
function EnergyBandsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Energy Band Gaps (CB vs. VB)</p>
      <svg viewBox="0 0 340 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* CONDUCTORS */}
        <g transform="translate(10, 10)">
          <rect x="0" y="10" width="80" height="30" fill="#22d3ee" fillOpacity="0.25" stroke="#22d3ee" strokeWidth="1" />
          <text x="40" y="28" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Overlap (CB/VB)</text>
          <text x="40" y="55" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Conductor</text>
          <text x="40" y="68" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Eg &approx; 0 eV</text>
        </g>

        {/* SEMICONDUCTORS */}
        <g transform="translate(125, 10)">
          {/* CB */}
          <rect x="0" y="0" width="80" height="20" fill="#a78bfa" fillOpacity="0.15" stroke="#a78bfa" strokeWidth="1" />
          <text x="40" y="12" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">CB</text>
          {/* Gap */}
          <line x1="40" y1="20" x2="40" y2="35" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
          <text x="45" y="31" fill="#e2e8f0" fontSize="7" fontFamily="monospace">Small Eg</text>
          {/* VB */}
          <rect x="0" y="35" width="80" height="20" fill="#a78bfa" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
          <text x="40" y="47" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">VB</text>
          <text x="40" y="70" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Semiconductor</text>
          <text x="40" y="82" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Eg &lt; 3 eV (Si: 1.1 eV)</text>
        </g>

        {/* INSULATORS */}
        <g transform="translate(240, 10)">
          {/* CB */}
          <rect x="0" y="0" width="80" height="15" fill="#f43f5e" fillOpacity="0.1" stroke="#f43f5e" strokeWidth="1" />
          <text x="40" y="10" fill="#f43f5e" fontSize="7" fontFamily="monospace" textAnchor="middle">CB</text>
          {/* Large Gap */}
          <line x1="40" y1="15" x2="40" y2="45" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
          <text x="45" y="33" fill="#f43f5e" fontSize="7" fontFamily="monospace" fontWeight="bold">Large Eg</text>
          {/* VB */}
          <rect x="0" y="45" width="80" height="15" fill="#f43f5e" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="1" />
          <text x="40" y="55" fill="#f43f5e" fontSize="7" fontFamily="monospace" textAnchor="middle">VB</text>
          <text x="40" y="75" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Insulator</text>
          <text x="40" y="87" fill="#64748b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">Eg &gt; 3 eV</text>
        </g>
      </svg>
    </div>
  );
}

// ─── SVG 2: DIODE V-I CHARACTERISTICS ──────────────────────────────────────────
function DiodeCharacteristicsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Diode V-I Curve (Forward &amp; Reverse breakdown)</p>
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 150 }}>
        {/* Origin axes */}
        <line x1="170" y1="10" x2="170" y2="150" stroke="#475569" strokeWidth="1" />
        <line x1="20" y1="80" x2="320" y2="80" stroke="#475569" strokeWidth="1" />
        
        {/* Axes Labels */}
        <text x="315" y="75" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="end">+V (Forward)</text>
        <text x="25" y="92" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="start">-V (Reverse)</text>
        <text x="175" y="18" fill="#94a3b8" fontSize="8" fontFamily="monospace">+I (mA)</text>
        <text x="175" y="145" fill="#94a3b8" fontSize="8" fontFamily="monospace">-I (&mu;A)</text>

        {/* FORWARD BIAS CURVE (1st quadrant) */}
        {/* Starts flat, bends upward sharply at Knee voltage (threshold) */}
        <path d="M 170 80 Q 240 80 255 25" fill="none" stroke="#22d3ee" strokeWidth="2" />
        <circle cx="230" cy="80" r="2.5" fill="#f43f5e" />
        <text x="230" y="73" fill="#f43f5e" fontSize="7" fontFamily="monospace" textAnchor="middle">Knee (0.7V for Si)</text>

        {/* REVERSE BIAS CURVE (3rd quadrant) */}
        {/* Small saturation current, then breaks down vertically */}
        <path d="M 170 80 L 100 83 L 100 145" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <line x1="100" y1="83" x2="100" y2="145" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
        <text x="95" y="125" fill="#f43f5e" fontSize="7.5" fontFamily="monospace" textAnchor="end" fontWeight="bold">Zener Breakdown</text>
        <text x="145" y="92" fill="#a78bfa" fontSize="6.5" fontFamily="monospace">Leakage (~&mu;A)</text>
      </svg>
    </div>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' }) {
  const styles: Record<string, string> = {
    cyan:    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:    'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet:  'bg-violet-500/10 border-violet-500/20 text-violet-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[12px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function FormulaCard({ formula, use, note, priority = 5 }: { formula: string; use: string; note: string; priority?: number }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 hover:border-white/15 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-white/45 font-mono">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <div className="text-cyan-300 font-bold text-[13.5px] sm:text-sm">
        <InlineMath math={formula} />
      </div>
      <p className="text-white/80 text-[12px]">
        <strong className="text-white/40">Use: </strong>
        {renderMathText(use)}
      </p>
      <p className="text-white/55 text-[12px]">
        <strong className="text-white/40">Note: </strong>
        {renderMathText(note)}
      </p>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function InsightCard({ title = "Key Concept", children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">{title}</span>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function SemiconductorDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'massaction' | 'transistor' | 'gates'>('massaction');

  // Calculator 1: Mass Action
  const [niExponent, setNiExponent] = useState('16'); // ni = 1.5 * 10^16
  const [dopantType, setDopantType] = useState<'n' | 'p'>('n');
  const [dopedExponent, setDopedExponent] = useState('20'); // doped = 10^20

  const ni = 1.5 * Math.pow(10, parseFloat(niExponent));
  const nd = Math.pow(10, parseFloat(dopedExponent));

  const minorityCarrier = (ni * ni) / nd;

  // Simulator: Logic Gates
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR'>('AND');
  const [inputA, setInputA] = useState<0 | 1>(0);
  const [inputB, setInputB] = useState<0 | 1>(0);

  const calculateOutput = (a: 0 | 1, b: 0 | 1, gate: string): 0 | 1 => {
    if (gate === 'AND') return (a && b) ? 1 : 0;
    if (gate === 'OR') return (a || b) ? 1 : 0;
    if (gate === 'NOT') return a ? 0 : 1; // Ignores input B
    if (gate === 'NAND') return !(a && b) ? 1 : 0;
    if (gate === 'NOR') return !(a || b) ? 1 : 0;
    if (gate === 'XOR') return (a !== b) ? 1 : 0;
    return 0;
  };

  const gateOutput = calculateOutput(inputA, inputB, gateType);

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">🔌</span>
              <Tag color="cyan">Physics Unit 14</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">Hot Topic</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Semiconductor Electronics: Materials, Devices and Simple Circuits
            </h1>
            <p className="text-[12px] text-cyan-400/80 font-semibold tracking-wide mt-1.5 flex flex-wrap items-center gap-1">
              <span>Prerequisites:</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Bohr Atomic Model</span>
 <span className="text-white/60 bg-white/5 px-1.5 py-0.5 rounded text-[12px] border border-white/10">Electrostatics &amp; Current</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '25 min' },
              { label: 'Expected Questions', value: '2-3 / year' },
              { label: 'Weightage', value: '★★★★★' },
              { label: 'Difficulty', value: 'Medium (3.0/5)' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[12px] font-bold text-white/40">
              <span className="uppercase tracking-wider">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[12px] text-white/35 font-medium">
              {isCompleted ? 'Reading Completed — Quiz Unlocked! 🔓' : 'Scroll to complete the lesson and unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

      {/* PART 1: BAND THEORY & MATERIALS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Classification &amp; Energy Band Theory</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Electrical conduction is determined by the size of the band gap (<InlineMath math="E_g" />) between the Valence Band (VB) and the empty Conduction Band (CB). Materials are classified into three types based on band theory and resistivity:
        </p>
        <EnergyBandsSVG />

        {/* 1. CLASSIFICATION DETAILS */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">⚡ Band Structure &amp; Examples</strong>
 <div className="grid sm:grid-cols-3 gap-4 text-[12px] text-white/70">
            <div className="space-y-1">
              <strong className="text-cyan-400 block">&bull; Conductors (Metals)</strong>
              <p className="text-white/65">
                Conduction and Valence bands overlap (<InlineMath math="E_g \approx 0\,\text{eV}" />) or Conduction band is partially filled. Contains abundant free electrons (<InlineMath math="\approx 10^{28}\,\text{m}^{-3}" />).
              </p>
              <p className="text-[11px] text-white/40"><strong className="text-white/35">Examples:</strong> Cu, Ag, Al, Au.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-violet-400 block">&bull; Semiconductors</strong>
              <p className="text-white/65">
                Small, finite band gap (<InlineMath math="E_g < 3\,\text{eV}" />). Electrons can thermally cross at room temperature. Moderate free carrier density.
              </p>
              <p className="text-[11px] text-white/40"><strong className="text-white/35">Examples:</strong> Si (1.1 eV), Ge (0.72 eV), GaAs (1.43 eV).</p>
            </div>
            <div className="space-y-1">
              <strong className="text-rose-400 block">&bull; Insulators</strong>
              <p className="text-white/65">
                Very wide band gap (<InlineMath math="E_g > 3\,\text{eV}" />, often <InlineMath math="> 5\,\text{eV}" />). Conduction band remains completely empty.
              </p>
              <p className="text-[11px] text-white/40"><strong className="text-white/35">Examples:</strong> Diamond (~5.4 eV), Quartz, Wood, Glass.</p>
            </div>
          </div>
        </div>

        {/* 2. TEMPERATURE & RESISTIVITY BEHAVIOR */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">📊 Temperature-Resistivity Relationship</strong>
          <p className="text-white/65">
            The temperature coefficient of resistance (<InlineMath math="\alpha" />) dictates how resistivity changes as thermal energy increases:
          </p>
          <div className="overflow-x-auto">
 <table className="w-full text-left text-[12px] text-white/70 border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="pb-1.5 font-bold">Material Type</th>
                  <th className="pb-1.5 font-bold">Temp. Coeff. (<InlineMath math="\alpha" />)</th>
                  <th className="pb-1.5 font-bold">As Temp. (<InlineMath math="T" />) Increases</th>
                  <th className="pb-1.5 font-bold">At <InlineMath math="0\,\text{K}" /> Behaviour</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-cyan-400 font-bold">Conductors</td>
                  <td className="py-2"><InlineMath math="\alpha > 0" /> (Positive)</td>
                  <td className="py-2">Resistivity increases (<InlineMath math="\rho \propto T" />) due to lattice collisions.</td>
                  <td className="py-2 text-white/50">Perfect conduction (superconductivity in some).</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-2 text-violet-400 font-bold">Semiconductors</td>
                  <td className="py-2"><InlineMath math="\alpha < 0" /> (Negative)</td>
                  <td className="py-2">Resistivity decreases exponentially (<InlineMath math="\rho \downarrow" />) as more carriers are excited.</td>
                  <td className="py-2 text-rose-400 font-bold">Perfect Insulator (conduction band empty).</td>
                </tr>
                <tr>
                  <td className="py-2 text-rose-400 font-bold">Insulators</td>
                  <td className="py-2">Negligible</td>
                  <td className="py-2">Resistivity remains extremely high.</td>
                  <td className="py-2 text-white/50">Perfect Insulator.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. INTRINSIC & EXTRINSIC FERMI LEVELS & TEMPERATURE MODELS */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">⚙️ Fermi Energy Levels &amp; Temperature Dependence</strong>
 <div className="grid sm:grid-cols-2 gap-4 text-[12px] text-white/70">
            <div className="space-y-2">
              <span className="text-cyan-400 font-bold block">&bull; Fermi Level Position (<InlineMath math="E_F" />)</span>
              <p className="text-white/60">
                The Fermi Level is the energy level at which the probability of electron occupancy is exactly <InlineMath math="50\%" />.
              </p>
              <p>
                &bull; <strong>Intrinsic:</strong> Lies exactly at the center of the band gap (<InlineMath math="E_F = E_i \approx E_g / 2" />).
                <br />
                &bull; <strong>N-Type:</strong> Shifts upwards, closer to the bottom of the conduction band (<InlineMath math="E_c" />).
                <br />
                &bull; <strong>P-Type:</strong> Shifts downwards, closer to the top of the valence band (<InlineMath math="E_v" />).
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-violet-400 font-bold block">&bull; Intrinsic Carrier Concentration</span>
              <p className="text-white/60">
                The carrier density (<InlineMath math="n_i" />) is highly dependent on both temperature (<InlineMath math="T" />) and the band gap (<InlineMath math="E_g" />):
              </p>
              <DisplayMath math="n_i(T) = n_0 \exp\left( -\frac{E_g}{2kT} \right)" />
              <p className="text-[11px] text-white/40">
                Where <InlineMath math="k" /> is the Boltzmann constant and <InlineMath math="n_0" /> is a material constant. Thus, carrier concentration increases exponentially with temperature.
              </p>
            </div>
          </div>
        </div>

        {/* 4. ADVANCED DOPING CONCEPTS */}
        <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[13px] space-y-3">
          <strong className="text-white text-[14px] block border-b border-white/5 pb-1">💡 Doping Mechanics, Compensation &amp; Degeneracy</strong>
 <div className="grid sm:grid-cols-2 gap-4 text-[12px] text-white/70">
            <div className="space-y-1">
              <span className="text-cyan-400 font-bold block">&bull; Compensation Doping</span>
              <p className="text-white/65">
                When both donors (<InlineMath math="N_d" />) and acceptors (<InlineMath math="N_a" />) are added simultaneously:
                <br />
                - If <InlineMath math="N_d > N_a" />, the material remains n-type with net electron concentration <InlineMath math="n_e \approx N_d - N_a" />.
                <br />
                - If <InlineMath math="N_a > N_d" />, it becomes p-type with net hole concentration <InlineMath math="n_h \approx N_a - N_d" />.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-violet-400 font-bold block">&bull; Degenerate Semiconductors</span>
              <p className="text-white/65">
                Under extremely heavy doping levels (above <InlineMath math="10^{20}\,\text{cm}^{-3}" />), the Fermi Level shifts entirely into the Conduction or Valence bands. The material begins to show metallic conductivity, violating standard Maxwell-Boltzmann statistics.
              </p>
            </div>
          </div>
 <div className="border-t border-white/5 pt-2 text-[12px] text-white/70">
            <span className="text-emerald-400 font-bold block">&bull; Temperature Regions in Extrinsic Semiconductors:</span>
            <p className="text-white/65">
              1. <strong>Low Temp (Freeze-out):</strong> Thermal energy is too low; carriers remain bound to dopant atoms.
              <br />
              2. <strong>Medium Temp (Extrinsic Saturation):</strong> All dopants are ionized. Conductivity is stable and dominated by majority carriers (<InlineMath math="n_e \approx N_d" />).
              <br />
              3. <strong>High Temp (Intrinsic):</strong> Thermal energy creates so many intrinsic electron-hole pairs that <InlineMath math="n_i" /> exceeds doping concentration (<InlineMath math="n_i \gg N_d" />), making it act like a pure intrinsic semiconductor.
            </p>
          </div>
        </div>

        {/* 5. FORMULAS & INTRINSIC/EXTRINSIC CARRIERS */}
        <div className="grid sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="n_e \cdot n_h = n_i^2"
            use="Law of Mass Action"
            note="Holds true for both intrinsic and doped (extrinsic) semiconductors in thermal equilibrium. $n_i$ is the intrinsic carrier concentration."
            priority={5}
          />
          <FormulaCard
            formula="\sigma = e(n_e \mu_e + n_h \mu_h) \quad \text{and} \quad I = I_e + I_h"
            use="Semiconductor Conductivity &amp; Total Current"
            note="Both electrons and holes contribute. Electron mobility $\mu_e$ is always greater than hole mobility $\mu_h$ due to energy band dynamics."
            priority={5}
          />
        </div>
      </div>

      {/* PART 2: P-N JUNCTION BIAS & CHARACTERISTICS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-400 text-[12px] font-bold">PART 2 (EXTENDED)</span>
          <h2 className="text-white font-display font-bold text-[17px]">P-N Junction Bias &amp; Characteristics</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
 <span className="inline-block text-[11px] font-bold bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-lg border border-rose-500/20 mb-2 uppercase tracking-wider block w-fit">&bull; Beyond Syllabus &mdash; Extended Material for Advanced IAT/JEE</span>
          Diffusion of majority charge carriers across the junction creates a depletion layer containing immobile ionized dopant atoms. This sets up an <strong>internal built-in electric field pointing from N to P</strong> (opposite to the diffusion direction), which establishes the barrier potential and opposes further majority carrier diffusion (holes from P to N, and electrons from N to P).
        </p>
        <DiodeCharacteristicsSVG />

 <div className="grid sm:grid-cols-2 gap-4 text-[13px]">
          <div className="bg-[#090b18] p-4 rounded-2xl border border-white/5 space-y-1.5">
            <strong className="text-cyan-400 text-[13px] block mb-1">&bull; Forward Bias (P to +, N to -)</strong>
            <p className="text-white/70 leading-relaxed">
              &bull; External field opposes and <strong>reduces</strong> the depletion barrier width.
              <br />
              &bull; Current flows easily via majority carriers above threshold (knee) voltage.
            </p>
          </div>
          <div className="bg-[#090b18] p-4 rounded-2xl border border-white/5 space-y-1.5">
            <strong className="text-violet-400 text-[13px] block mb-1">&bull; Reverse Bias (P to -, N to +)</strong>
            <p className="text-white/70 leading-relaxed">
              &bull; External field assists and <strong>widens</strong> the depletion barrier width.
              <br />
              &bull; Current is nearly zero, limited to tiny reverse saturation leakage current (<InlineMath math="I_0 \approx \mu\text{A}" />) due to minority carriers.
            </p>
          </div>
        </div>

        <InsightCard title="Special Purpose Diodes Summary">
          &bull; <strong>Zener Diode:</strong> Heavily doped to achieve low, sharp breakdown voltage. Operated in the reverse breakdown region to act as a <strong>constant voltage regulator</strong>.
          <br />
          &bull; <strong>LED (Light Emitting Diode):</strong> Forward biased. Recombinations of electrons/holes at junction emit photons of energy <code>E &approx; h&nu; &approx; Eg</code>.
          <br />
          &bull; <strong>Photodiode:</strong> Reverse biased. Absorbed photons generate electron-hole pairs, increasing reverse current linearly with light intensity.
          <br />
          &bull; <strong>Solar Cell:</strong> Unbiased. Generates voltage from incoming light via separation of photo-generated carrier pairs by junction electric field.
        </InsightCard>
      </div>

      {/* PART 3: RECTIFIERS, TRANSISTORS & LOGIC GATES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-rose-500/20 bg-rose-500/10 text-rose-400 text-[12px] font-bold">PART 3 (EXTENDED)</span>
          <h2 className="text-white font-display font-bold text-[17px]">Rectification, Transistors &amp; Logic Gates</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
 <span className="inline-block text-[11px] font-bold bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded-lg border border-rose-500/20 mb-2 uppercase tracking-wider block w-fit">&bull; Beyond Syllabus &mdash; Extended Material for Advanced IAT/JEE</span>
          Diodes serve to rectify AC currents. Transistors amplify small signals, and logic gates process binary information.
        </p>

        {/* Rectifiers Card */}
 <div className="p-4.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[12px] space-y-2 text-white/70">
          <strong className="text-white text-[13px] block mb-1">⚡ Rectifier Efficiency &amp; Ripples</strong>
          <p>&bull; <strong>Half-Wave:</strong> Single diode. Efficiency <code>&eta; &approx; 40.6%</code>. Ripple frequency equals input AC frequency (<code>f<sub>out</sub> = f<sub>in</sub></code>).</p>
          <p>&bull; <strong>Full-Wave:</strong> Two or four diodes (bridge). Efficiency <code>&eta; &approx; 81.2%</code>. Ripple frequency is doubled (<code>f<sub>out</sub> = 2 &middot; f<sub>in</sub></code>).</p>
        </div>

        {/* Transistor Section */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-3">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">⚙️ Bipolar Junction Transistors (BJT)</span>
          <div className="grid sm:grid-cols-2 gap-4 text-white/70 leading-relaxed">
            <div className="space-y-1">
              <strong className="text-white block">Current Division Rule</strong>
              <p>
                In both NPN and PNP configurations, emitter current is sum of base and collector current:
                <br />
                <code className="text-cyan-300">I<sub>E</sub> = I<sub>B</sub> + I<sub>C</sub></code> (since base is extremely thin and lightly doped).
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block">Current Amplification Factors</strong>
              <p>
                &bull; Common Base gain: <code>&alpha; = I<sub>C</sub> / I<sub>E</sub></code> (always &lt; 1).
                <br />
                &bull; Common Emitter gain: <code>&beta; = I<sub>C</sub> / I<sub>B</sub></code> (ranges 20 to 200).
                <br />
                &bull; Relationship: <code>&beta; = &alpha; / (1 − &alpha;)</code> | <code>&alpha; = &beta; / (1 + &beta;)</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Logic Gates Section */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-2 text-white/70">
          <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">🔑 Logic Gates &amp; Boolean Expressions</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-black/35 p-2 rounded-xl border border-white/5">
              <strong>AND</strong>
              <code className="block text-cyan-300 my-1">Y = A &middot; B</code>
            </div>
            <div className="bg-black/35 p-2 rounded-xl border border-white/5">
              <strong>OR</strong>
              <code className="block text-cyan-300 my-1">Y = A + B</code>
            </div>
            <div className="bg-black/35 p-2 rounded-xl border border-white/5">
              <strong>NAND</strong>
              <code className="block text-rose-400 my-1">Y = &oline;(A &middot; B)</code>
            </div>
            <div className="bg-black/35 p-2 rounded-xl border border-white/5">
              <strong>NOR</strong>
              <code className="block text-rose-400 my-1">Y = &oline;(A + B)</code>
            </div>
          </div>
        </div>
      </div>

      {/* PART 4: INTERACTIVE LOGIC GATE SIMULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Logic Gate Simulator <span className="text-[11px] font-bold bg-rose-500/15 text-rose-400 px-2 py-0.5 rounded-lg border border-rose-500/20 ml-2 uppercase tracking-widest inline-block">Extended</span></h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Toggle input values A and B, select gate type to see the binary truth result.
        </p>
        <div className="flex flex-wrap gap-2">
          {['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'].map(gate => (
            <button
              key={gate}
              onClick={() => setGateType(gate as any)}
              className={cn(
'px-3 py-1.5 rounded-xl border text-[13px] font-bold transition-all',
                gateType === gate
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white/80 hover:bg-white/[0.04]'
              )}
            >
              {gate}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex justify-around items-center">
              <div>
                <span className="text-[12px] font-bold text-white/35 block mb-1">Input A</span>
                <button
                  onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                  className={cn(
'px-4 py-2 rounded-xl text-[13px] font-bold transition-all border',
                    inputA === 1 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300' : 'bg-white/5 border-white/10 text-white/50'
                  )}
                >
                  {inputA}
                </button>
              </div>
              {gateType !== 'NOT' && (
                <div>
                  <span className="text-[12px] font-bold text-white/35 block mb-1">Input B</span>
                  <button
                    onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                    className={cn(
'px-4 py-2 rounded-xl text-[13px] font-bold transition-all border',
                      inputB === 1 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300' : 'bg-white/5 border-white/10 text-white/50'
                    )}
                  >
                    {inputB}
                  </button>
                </div>
              )}
            </div>
            <div className="text-center p-3 border border-white/8 bg-black/35 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-white/35">Output Y</span>
 <p className="text-[19px] font-black text-cyan-400 mt-1">{gateOutput}</p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
 <span className="text-[12px] font-bold text-cyan-400 block mb-2">📊 Truth Table: {gateType}</span>
 <div className="text-[12px] space-y-1">
              {gateType === 'NOT' ? (
                <>
                  <div className={cn("p-1.5 rounded flex justify-between", inputA === 0 ? "bg-cyan-500/10 text-cyan-300 font-bold" : "text-white/40")}>
                    <span>A = 0</span><span>Y = 1</span>
                  </div>
                  <div className={cn("p-1.5 rounded flex justify-between", inputA === 1 ? "bg-cyan-500/10 text-cyan-300 font-bold" : "text-white/40")}>
                    <span>A = 1</span><span>Y = 0</span>
                  </div>
                </>
              ) : (
                [
                  [0, 0],
                  [0, 1],
                  [1, 0],
                  [1, 1],
                ].map(([a, b]) => {
                  const out = calculateOutput(a as any, b as any, gateType);
                  const isCurrentRow = (a === inputA && b === inputB);
                  return (
                    <div key={`${a}-${b}`} className={cn("p-1 rounded flex justify-between", isCurrentRow ? "bg-cyan-500/10 text-cyan-300 font-bold" : "text-white/40")}>
                      <span>A = {a}, B = {b}</span>
                      <span>Y = {out}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PART 5: DYNAMIC CARRIER CONCENTRATION CALCULATOR */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Carrier Concentration Calculator</h2>
        </div>
 <p className="text-white/50 text-[13px]">
          Dope an intrinsic semiconductor and trace the minority carrier count using the Law of Mass Action.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Intrinsic n_i (1.5 * 10^X):</label>
            <input
              type="number" min="10" max="22"
              value={niExponent} onChange={e => setNiExponent(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Doped carrier type:</label>
            <select
              value={dopantType} onChange={e => setDopantType(e.target.value as any)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            >
              <option value="n" className="bg-[#0A0C18]">Pentavalent electrons (nₑ)</option>
              <option value="p" className="bg-[#0A0C18]">Trivalent holes (nₕ)</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-bold text-white/40 block mb-1">Doped Concentration (10^Y):</label>
            <input
              type="number" min="15" max="24"
              value={dopedExponent} onChange={e => setDopedExponent(e.target.value)}
 className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] outline-none"
            />
          </div>
        </div>
 <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/8 text-center text-[13px]">
          <div>
            <span className="text-[12px] uppercase font-bold text-white/35">Majority Carriers</span>
            <p className="text-[17px] font-bold text-cyan-400 my-1">
              10^{dopedExponent} m⁻³
            </p>
          </div>
          <div>
            <span className="text-[12px] uppercase font-bold text-white/35">Minority Carriers</span>
            <p className="text-[17px] font-bold text-rose-400 my-1">
              {minorityCarrier.toExponential(2)} m⁻³
            </p>
          </div>
        </div>
      </div>

      {/* PART 6: MEMORY BOX & FOCUS POINTS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Revision Cheat Sheet &amp; Shortcuts</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-1">
            <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">💡 dopant classifications</span>
            <p className="text-white/70">
              &bull; <strong>Pentavalent (P, As, Sb):</strong> Creates n-type. Donor levels sit just below Conduction Band.
              <br />
              &bull; <strong>Trivalent (B, Al, Ga, In):</strong> Creates p-type. Acceptor levels sit just above Valence Band.
            </p>
          </div>
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 text-[12px] space-y-1">
            <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">⚙️ Transistor &amp; logic formulas</span>
            <p className="text-white/70">
              &bull; Emitter current: <code>I<sub>E</sub> = I<sub>B</sub> + I<sub>C</sub></code>.
              <br />
              &bull; Current gains: <code>&beta; = I<sub>C</sub> / I<sub>B</sub></code>, <code>&alpha; = I<sub>C</sub> / I<sub>E</sub></code>.
              <br />
              &bull; De Morgan's laws:
              <br />
              &nbsp;&nbsp; - <code>&oline;(A + B) = &oline;A &middot; &oline;B</code> (NOR equals inverted-AND).
              <br />
              &nbsp;&nbsp; - <code>&oline;(A &middot; B) = &oline;A + &oline;B</code> (NAND equals inverted-OR).
            </p>
          </div>
        </div>
      </div>

      {/* PART 7: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0">
            <BookOpen className="w-5 h-5" />
          </span>
 <h3 className="text-white font-display font-bold text-[17px] uppercase">Solved IAT Examples</h3>
        </div>

        {/* Example 1 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 1: Carrier Concentration using Mass Action</span>
          <p className="text-white/80">An intrinsic Silicon crystal has an intrinsic carrier density of <InlineMath math="n_i = 1.5 \times 10^{16}\,\text{m}^{-3}" />. If it is doped with Phosphorus to an electron concentration of <InlineMath math="n_e = 10^{20}\,\text{m}^{-3}" />, calculate the resulting hole concentration (<InlineMath math="n_h" />).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Identify given values: <InlineMath math="n_i = 1.5 \times 10^{16}\,\text{m}^{-3}" />, <InlineMath math="n_e = 10^{20}\,\text{m}^{-3}" /> (majority electron density).</p>
            <p>2. Mass Action relation: <InlineMath math="n_e n_h = n_i^2" />.</p>
            <p>3. Solve for hole concentration: <InlineMath math="n_h = \frac{n_i^2}{n_e} = \frac{(1.5 \times 10^{16})^2}{10^{20}} = 2.25 \times 10^{12}\,\text{m}^{-3}" />.</p>
            <p className="text-cyan-300 font-bold">Hole concentration <InlineMath math="n_h = 2.25 \times 10^{12}\,\text{m}^{-3}" /></p>
          </div>
        </div>

        {/* Example 2 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 2: Transistor amplification factors</span>
          <p className="text-white/80">A transistor connected in common-emitter configuration has a current gain <InlineMath math="\beta" /> of <InlineMath math="100" />. If the base current (<InlineMath math="I_B" />) is changed by <InlineMath math="10\,\mu\text{A}" />, calculate the corresponding change in the emitter current (<InlineMath math="I_E" />).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Given current gain: <InlineMath math="\beta = 100" />, base current change: <InlineMath math="\Delta I_B = 10\,\mu\text{A}" />.</p>
            <p>2. Find change in collector current: <InlineMath math="\Delta I_C = \beta \cdot \Delta I_B = 100 \times 10\,\mu\text{A} = 1000\,\mu\text{A} = 1\,\text{mA}" />.</p>
            <p>3. Emitter current relation: <InlineMath math="\Delta I_E = \Delta I_B + \Delta I_C" />.</p>
            <p>4. Calculate: <InlineMath math="\Delta I_E = 10\,\mu\text{A} + 1000\,\mu\text{A} = 1010\,\mu\text{A} = 1.01\,\text{mA}" />.</p>
            <p className="text-cyan-300 font-bold">Change in Emitter Current <InlineMath math="\Delta I_E = 1.01\,\text{mA}" /></p>
          </div>
        </div>

        {/* Example 4 (New) */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 4: Temperature Dependence of Conductivity</span>
          <p className="text-white/80">At room temperature (<InlineMath math="300\,\text{K}" />), the intrinsic carrier concentration of Silicon is <InlineMath math="1.5 \times 10^{16}\,\text{m}^{-3}" />. If the temperature is raised to <InlineMath math="400\,\text{K}" />, calculate the ratio of the new intrinsic carrier concentration to the old one. (Given band gap of Silicon <InlineMath math="E_g = 1.1\,\text{eV}" />, and Boltzmann constant <InlineMath math="k = 8.62 \times 10^{-5}\,\text{eV/K}" />).</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Formula for temperature dependence of carrier concentration: <InlineMath math="n_i(T) = n_0 \exp\left(-\frac{E_g}{2kT}\right)" />.</p>
            <p>2. Write the ratio of concentrations at <InlineMath math="T_2 = 400\,\text{K}" /> and <InlineMath math="T_1 = 300\,\text{K}" />:</p>
            <DisplayMath math="\frac{n_i(T_2)}{n_i(T_1)} = \exp\left( -\frac{E_g}{2k} \left( \frac{1}{T_2} - \frac{1}{T_1} \right) \right)" />
            <p>3. Substitute values: <InlineMath math="E_g = 1.1\,\text{eV}" />, <InlineMath math="k = 8.62 \times 10^{-5}\,\text{eV/K}" />:</p>
            <DisplayMath math="\frac{E_g}{2k} = \frac{1.1}{2 \times 8.62 \times 10^{-5}} \approx 6380\,\text{K}" />
            <p>4. Evaluate the exponent difference: <InlineMath math="\frac{1}{400} - \frac{1}{300} = \frac{3-4}{1200} = -\frac{1}{1200}\,\text{K}^{-1}" />.</p>
            <p>5. Calculate ratio: <InlineMath math="\frac{n_i(400)}{n_i(300)} = \exp(-6380 \times (-1/1200)) = \exp(5.317) \approx 203.7" />.</p>
            <p className="text-cyan-300 font-bold">The intrinsic carrier concentration increases by a factor of ~204 times!</p>
          </div>
        </div>

        {/* Example 3 */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase block">Example 3: Logic gate combination simplification</span>
          <p className="text-white/80">Find the boolean expression for the output <InlineMath math="Y" /> of the logic gate combination where inputs <InlineMath math="A" /> and <InlineMath math="B" /> are first passed separately through NOT gates, and then their outputs are fed into a NOR gate.</p>
          <div className="space-y-1.5 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <p>1. Output of separate NOT gates: <InlineMath math="A' = \bar{A}" /> and <InlineMath math="B' = \bar{B}" />.</p>
            <p>2. NOR gate expression: <InlineMath math="Y = \overline{A' + B'} = \overline{\bar{A} + \bar{B}}" />.</p>
            <p>3. Apply De Morgan's Law: <InlineMath math="\overline{\bar{A} + \bar{B}} = \overline{\overline{A}} \cdot \overline{\overline{B}}" />.</p>
            <p>4. Double inversion cancels: <InlineMath math="Y = A \cdot B" /> (equivalent to a single AND gate!).</p>
            <p className="text-cyan-300 font-bold">Simplified expression: <InlineMath math="Y = A \cdot B" /> (Equivalent to AND gate)</p>
          </div>
        </div>
      </div>

      {/* FORMULA DECISION TREE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-bold text-[17px] font-mono uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'massaction', label: '📊 Law of Mass Action relations' },
            { id: 'transistor', label: '🔌 Transistor CE/CB current gains' },
            { id: 'gates', label: '⚡ De Morgan gate conversions' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setSelectedGoal(btn.id as any)}
              className={cn(
'px-3 py-1.5 rounded-xl border text-[13px] font-bold transition-all',
                selectedGoal === btn.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.15)]'
                  : 'bg-white/[0.02] text-white/50 border-white/5 hover:text-white/80 hover:bg-white/[0.04]'
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
 <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5 text-[13px] space-y-2">
          {selectedGoal === 'massaction' && (
            <>
              <span className="text-[12px] font-bold text-cyan-400 uppercase block">Objective: Carrier Density ratios</span>
              <p className="text-white/70">1. Concentration relation: <code>n_e * n_h = n_i²</code>.</p>
              <p className="text-white/70">2. Intrinsic conductivity: <code>&sigma; = n_i * e * (μ_e + μ_h)</code>.</p>
            </>
          )}
          {selectedGoal === 'transistor' && (
            <>
              <span className="text-[12px] font-bold text-violet-400 uppercase block">Objective: Collector/Emitter/Base currents</span>
              <p className="text-white/70">1. Kirchhoff current relation: <code>I_E = I_B + I_C</code>.</p>
              <p className="text-white/70">2. Amplification factors: <code>&alpha; = I_C / I_E</code> and <code>&beta; = I_C / I_B</code>.</p>
              <p className="text-white/70">3. Conversions: <code>&beta; = &alpha; / (1 − &alpha;)</code>.</p>
            </>
          )}
          {selectedGoal === 'gates' && (
            <>
              <span className="text-[12px] font-bold text-rose-400 uppercase block">Objective: Gate combination boolean outputs</span>
              <p className="text-white/70">1. Double negation cancel: <code>&oline;&oline;A = A</code>.</p>
              <p className="text-white/70">2. NOR conversion: <code>&oline;(A + B) = &oline;A &middot; &oline;B</code>.</p>
              <p className="text-white/70">3. NAND conversion: <code>&oline;(A &middot; B) = &oline;A + &oline;B</code>.</p>
            </>
          )}
        </div>
      </div>

      {/* QUESTION RECOGNITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"Find the majority and minority carrier concentration after doping"', think: "Apply the Law of Mass Action: n<sub>e</sub> * n<sub>h</sub> = n<sub>i</sub>²." },
            { cue: '"A circuit containing two diodes connected to a DC source"', think: "Identify which diode is forward biased (replace with a wire, V<sub>B</sub> drop) and which is reverse biased (replace with open break)." },
            { cue: '"Find the output of a network of NAND / NOR gates"', think: "Apply De Morgan's laws to simplify the Boolean expression step-by-step." },
            { cue: '"In a common emitter configuration, given base current and current gain..."', think: "Use &beta; = I<sub>C</sub> / I<sub>B</sub> to find collector current, then I<sub>E</sub> = I<sub>B</sub> + I<sub>C</sub>." },
            { cue: '"Temperature increases in a pure semiconductor crystal"', think: "Conductivity increases and resistance decreases (negative temperature coefficient of resistance &alpha; &lt; 0)" },
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="text-[13px] font-mono text-cyan-400" dangerouslySetInnerHTML={{ __html: cue }} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">Immediately think...</p>
                <p className="text-[13px] text-white/70 font-mono" dangerouslySetInnerHTML={{ __html: think }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMON TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Assuming physical motion of holes">
            Holes do not physically move in the lattice. Hole motion is the effective motion of valence electrons hopping into neighboring vacant bonds.
          </TrapCard>
          <TrapCard title="Trap 2: Assuming reverse bias current is exactly zero">
            Reverse bias current is not zero. A tiny reverse saturation leakage current (~micro-amps) always flows due to minority carrier thermal excitation.
          </TrapCard>
          <TrapCard title="Trap 3: Doping carrier definitions inversion">
            Donor levels do NOT accept electrons; they DONATE electrons. Acceptor levels do not donate; they ACCEPT electrons. Pentavalent = donor, Trivalent = acceptor.
          </TrapCard>
          <TrapCard title="Trap 4: Diode threshold barrier potential voltage drop">
            In silicon diode numericals, remember to subtract the barrier potential (0.7V for Silicon, 0.3V for Germanium) from the battery voltage before applying Ohm's law!
          </TrapCard>
        </div>
      </div>

      {/* NEXT STEPS IN SYLLABUS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />
 <div className="relative z-10 text-[13px]">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">CONGRATULATIONS — SYLLABUS COMPLETE!</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/80 bg-white/5 px-2.5 py-1 rounded-xl border border-white/10 font-bold">Semiconductors (Unit 14)</span>
            <span className="text-white/30">&rarr;</span>
            <span className="text-[#34d399] bg-[#34d399]/10 px-2.5 py-1 rounded-xl border border-[#34d399]/20 font-bold">IISER IAT Practice Mock Exams 🎯</span>
          </div>
        </div>
      </div>

      {/* 2-MIN REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/15">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-cyan-400" />
 <h3 className="text-cyan-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            "Valence vs Conduction Band Gap: Insulators (>3eV), Semiconductors (~1eV)",
            "Si Eg = 1.1 eV (Barrier = 0.7V). Ge Eg = 0.72 eV (Barrier = 0.3V)",
            "Pentavalent (P, As, Sb) = N-type (donors). Trivalent (B, Al, Ga, In) = P-type (acceptors)",
            "Law of Mass Action: n<sub>e</sub> * n<sub>h</sub> = n<sub>i</sub>² (holds for doped too)",
            "Forward Bias: depletion width decreases, resistance drops, current flows",
            "Reverse Bias: depletion width increases, resistance increases, current ≈ 0",
            "Half-wave efficiency: ~40.6%. Full-wave efficiency: ~81.2%",
            "Zener diode: operated in reverse breakdown region for voltage regulation",
            "LED: forward biased, recombinations emit light (E = hc/λ)",
            "Photodiode: reverse biased, current changes with light intensity",
            "Transistor current division rule: I<sub>E</sub> = I<sub>B</sub> + I<sub>C</sub>",
            "Transistor gains: β = I<sub>C</sub>/I<sub>B</sub> (high), α = I<sub>C</sub>/I<sub>E</sub> (less than 1)",
            "De Morgan's Laws: NOR = ̅(̅A̅+̅B̅) = ̅A·̅B, NAND = ̅(̅A̅·̅B̅) = ̅A+̅B",
            "Truth tables: AND (both 1), OR (any 1), NAND/NOR (inverted output)"
          ].map(item => (
            <div key={item} className="flex items-start gap-2 text-[13px] text-white/70 py-1 border-b border-white/[0.04] last:border-0">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
