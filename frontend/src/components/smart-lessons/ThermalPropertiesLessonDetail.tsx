import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  BookOpen, Zap, Brain, Copy, Check, ChevronDown, ChevronUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── Sub-Components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, label, color = 'violet' }: { icon: React.ReactNode; label: string; color?: string }) {
  const colors: Record<string, string> = {
    cyan: 'text-cyan-400',
    violet: 'text-violet-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
    indigo: 'text-indigo-400',
    sky: 'text-sky-400',
  };
  return (
    <div className="flex items-center gap-3 pb-1">
      <div className={cn('p-2 rounded-xl bg-white/5 border border-white/10 shrink-0', colors[color])}>
        {icon}
      </div>
 <h3 className="text-white font-display font-bold text-[17px] sm:text-lg tracking-wide uppercase">
        {label}
      </h3>
    </div>
  );
}

function ModuleHeader({
  number, title, difficulty, color = 'violet'
}: {
  number: number;
  title: string;
  difficulty: number;
  color?: string;
}) {
  const bgColors: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
      <div className="flex items-center gap-3">
 <span className={cn('text-xs font-bold px-2.5 py-1 rounded-lg border uppercase shrink-0', bgColors[color])}>
          Module {number}
        </span>
        <h4 className="text-white font-bold text-[14.5px] sm:text-base">{title}</h4>
      </div>
      <div className="flex items-center gap-1.5 text-[13px] text-white/50">
        <span>Difficulty:</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-3.5 h-3.5', i < difficulty ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
    </div>
  );
}

function FrequencyBadge({ stars }: { stars: number }) {
  return (
 <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider">
      <span className="text-white/40">Frequency:</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn('w-2.5 h-2.5', i < stars ? 'text-amber-400 fill-amber-400' : 'text-white/20')} />
        ))}
      </span>
    </div>
  );
}

function FormulaCard({
  formula, use_when, priority, freq_stars, difficulty_stars, color = 'violet', copy_text
}: {
  formula: string;
  use_when: string;
  priority: string;
  freq_stars: number;
  difficulty_stars: number;
  color?: string;
  copy_text: string;
}) {
  const [copied, setCopied] = useState(false);
  const borderColors: Record<string, string> = {
    cyan: 'border-cyan-500/20 hover:border-cyan-400/30',
    violet: 'border-violet-500/20 hover:border-violet-400/30',
    amber: 'border-amber-500/20 hover:border-amber-400/30',
    emerald: 'border-emerald-500/20 hover:border-emerald-400/30',
    rose: 'border-rose-500/20 hover:border-rose-400/30',
  };
  const bgColors: Record<string, string> = {
    cyan: 'bg-cyan-500/[0.03]',
    violet: 'bg-violet-500/[0.03]',
    amber: 'bg-amber-500/[0.03]',
    emerald: 'bg-emerald-500/[0.03]',
    rose: 'bg-rose-500/[0.03]',
  };
  const formulaColors: Record<string, string> = {
    cyan: 'text-cyan-300',
    violet: 'text-violet-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
    rose: 'text-rose-300',
  };
  return (
    <div className={cn('rounded-xl border p-4.5 transition-all duration-200 bg-[#0A0C18]', bgColors[color], borderColors[color])}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 w-full overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-2">
 <span className="text-[12px] font-bold px-1.5 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10 uppercase">
              Priority: {priority}
            </span>
          </div>
          <div className={cn('font-mono font-bold text-[14.5px] sm:text-base tracking-wide pt-1 whitespace-nowrap', formulaColors[color])}>
            <span dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
          <div className="text-white/85 text-[13px] font-semibold leading-relaxed pt-1"><span dangerouslySetInnerHTML={{ __html: use_when }} /></div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(copy_text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-white/5">
        <FrequencyBadge stars={freq_stars} />
 <div className="flex items-center gap-1.5 text-[12px] text-white/40">
          <span>DIFFICULTY:</span>
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn('w-2.5 h-2.5', i < difficulty_stars ? 'text-amber-400 fill-amber-400' : 'text-white/20')} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

function SolvedExample({
  number, question, steps, answer, color = 'violet'
}: {
  number: number;
  question: string;
  steps: string[];
  answer: string;
  color?: string;
}) {
  const accentColors: Record<string, string> = {
    violet: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
    cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    rose: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
  };
  return (
    <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex items-center gap-3">
 <span className={cn('text-xs font-bold px-2 py-0.5 rounded border uppercase', accentColors[color])}>
          Solved Numerical {number}
        </span>
      </div>
      <div className="text-white font-medium text-[14.5px] leading-relaxed" dangerouslySetInnerHTML={{ __html: question }} />

      <div className="space-y-3 pt-3 border-t border-white/5">
 <h4 className="text-white/40 font-bold text-[13px] uppercase tracking-wider">Step-by-Step Derivation</h4>
        <ol className="space-y-3">
          {steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 text-[13px] leading-relaxed text-white/80">
 <span className="font-bold text-cyan-400 shrink-0">[{idx + 1}]</span>
              <span dangerouslySetInnerHTML={{ __html: step }} />
            </li>
          ))}
        </ol>
      </div>

      <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
 <div className="text-[12px] text-emerald-400 font-bold uppercase tracking-wider">Final Result</div>
          <div className="text-white font-bold text-[14.5px] mt-0.5 font-mono" dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
}

// ─── Extra SVG Diagrams ─────────────────────────────────────────────────────────

function AnomalousWaterDensityDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Anomalous expansion of water volume and density curves">
      {/* Volume vs Temp */}
      <g transform="translate(10, 10)">
        <line x1="20" y1="10" x2="20" y2="100" stroke="#ffffff40" strokeWidth="1" />
        <line x1="20" y1="100" x2="100" y2="100" stroke="#ffffff40" strokeWidth="1" />
        <text x="105" y="103" fill="#ffffff50" fontSize="7">T(°C)</text>
        <text x="15" y="8" fill="#ffffff50" fontSize="7" textAnchor="end">Vol</text>
        
        {/* volume curve (minimum at 4C) */}
        <path d="M 25 25 Q 55 90 95 30" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <line x1="55" y1="83" x2="55" y2="100" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="55" y="109" fill="#fcd34d" fontSize="7" textAnchor="middle">4°C</text>
        <text x="60" y="45" fill="#38bdf8" fontSize="8">Min Volume</text>
      </g>
      
      {/* Density vs Temp */}
      <g transform="translate(130, 10)">
        <line x1="20" y1="10" x2="20" y2="100" stroke="#ffffff40" strokeWidth="1" />
        <line x1="20" y1="100" x2="100" y2="100" stroke="#ffffff40" strokeWidth="1" />
        <text x="105" y="103" fill="#ffffff50" fontSize="7">T(°C)</text>
        <text x="15" y="8" fill="#ffffff50" fontSize="7" textAnchor="end">ρ</text>
        
        {/* density curve (maximum at 4C) */}
        <path d="M 25 80 Q 55 20 95 75" fill="none" stroke="#f43f5e" strokeWidth="2" />
        <line x1="55" y1="35" x2="55" y2="100" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="55" y="109" fill="#fcd34d" fontSize="7" textAnchor="middle">4°C</text>
        <text x="60" y="32" fill="#fca5a5" fontSize="8">Max Density</text>
      </g>
    </svg>
  );
}

function BlackBodyRadiationDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Blackbody radiation intensity vs wavelength curves">
      {/* Axes */}
      <line x1="30" y1="110" x2="220" y2="110" stroke="#ffffff40" strokeWidth="1" />
      <line x1="30" y1="10" x2="30" y2="110" stroke="#ffffff40" strokeWidth="1" />
      <text x="225" y="113" fill="#ffffff50" fontSize="7">Wavelength (λ)</text>
      <text x="25" y="8" fill="#ffffff50" fontSize="7" textAnchor="end">Eλ</text>
      
      {/* Wien's Displacement Curves */}
      {/* Curve 1: T3 = 5000K */}
      <path d="M 30 110 Q 55 15 110 80 T 210 108" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x="80" y="35" fill="#fcd34d" fontSize="7" fontWeight="bold">T₃ = 5000 K</text>
      
      {/* Curve 2: T2 = 4000K */}
      <path d="M 30 110 Q 75 40 130 90 T 210 109" fill="none" stroke="#38bdf8" strokeWidth="1.8" />
      <text x="95" y="65" fill="#38bdf8" fontSize="7" fontWeight="bold">T₂ = 4000 K</text>
      
      {/* Curve 3: T1 = 3000K */}
      <path d="M 30 110 Q 95 70 150 98 T 210 110" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
      <text x="110" y="88" fill="#c084fc" fontSize="7" fontWeight="bold">T₁ = 3000 K</text>
      
      {/* Wien displacement dashed trace */}
      <path d="M 55 30 L 75 52 L 95 80" fill="none" stroke="#ffffff40" strokeWidth="1" strokeDasharray="2 2" />
      <text x="80" y="20" fill="#ffffff60" fontSize="7.5" fontStyle="italic">λ_max · T = Constant</text>
    </svg>
  );
}

function PhaseTransitionPlateausDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Heating curve showing phase transition plateaus">
      {/* Axes */}
      <line x1="30" y1="115" x2="220" y2="115" stroke="#ffffff40" strokeWidth="1" />
      <line x1="30" y1="10" x2="30" y2="115" stroke="#ffffff40" strokeWidth="1" />
      <text x="225" y="118" fill="#ffffff50" fontSize="7">Heat Supplied (Q)</text>
      <text x="25" y="8" fill="#ffffff50" fontSize="7" textAnchor="end">Temp (°C)</text>
      
      {/* Curve: Ice warming -> 0C plateau -> Water warming -> 100C plateau -> Steam warming */}
      <path d="M 30 110 L 55 95 L 105 95 L 140 35 L 195 35 L 215 15" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
      
      {/* Points and labels */}
      <circle cx="55" cy="95" r="2" fill="#38bdf8" />
      <circle cx="105" cy="95" r="2" fill="#38bdf8" />
      <text x="80" y="90" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">Fusion (0°C)</text>
      <text x="80" y="103" fill="#a5b4fc" fontSize="7" textAnchor="middle">Q = m L<tspan fontSize="5" dy="1.8">f</tspan></text>
      
      <circle cx="140" cy="35" r="2" fill="#38bdf8" />
      <circle cx="195" cy="35" r="2" fill="#38bdf8" />
      <text x="167" y="30" fill="#ffffff" fontSize="7" textAnchor="middle" fontWeight="bold">Vaporization (100°C)</text>
      <text x="167" y="43" fill="#a5b4fc" fontSize="7" textAnchor="middle">Q = m L<tspan fontSize="5" dy="1.8">v</tspan></text>
      
      {/* Slopes */}
      <text x="40" y="125" fill="#ffffff50" fontSize="6">Ice (ms<tspan fontSize="4" dy="1">i</tspan><tspan dy="-1"> &Delta;T</tspan>)</text>
      <text x="128" y="70" fill="#ffffff50" fontSize="6" transform="rotate(-45 128 70)">Water (ms<tspan fontSize="4" dy="1">w</tspan><tspan dy="-1"> &Delta;T</tspan>)</text>
      <text x="210" y="30" fill="#ffffff50" fontSize="6">Steam</text>
    </svg>
  );
}

function RegelationDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Regelation in ice blocks diagram">
      {/* Ice block */}
      <rect x="50" y="30" width="140" height="70" rx="4" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="120" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Ice Block (0°C)</text>
      
      {/* Metal wire cutting through */}
      <line x1="30" y1="50" x2="210" y2="50" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="120" y="45" fill="#fca5a5" fontSize="8" textAnchor="middle">Weighted Wire</text>
      
      {/* Pressure melting zone under the wire */}
      <ellipse cx="120" cy="52" rx="40" ry="3" fill="#38bdf8" opacity="0.6" />
      <text x="120" y="60" fill="#38bdf8" fontSize="7" textAnchor="middle">Melts under pressure (T<tspan fontSize="5" dy="1.8">m</tspan><tspan dy="-1.8"> &lt; 0°C</tspan>)</text>
      
      {/* Refreezing above the wire */}
      <text x="120" y="23" fill="#ffffff60" fontSize="8" textAnchor="middle">Refreezes above (pressure released)</text>
      
      {/* Weight arrows */}
      <line x1="30" y1="50" x2="30" y2="90" stroke="#ffffff40" strokeWidth="1" />
      <polygon points="30,90 27,85 33,85" fill="#ffffff60" />
      <text x="25" y="105" fill="#ffffff40" fontSize="7">Weight</text>

      <line x1="210" y1="50" x2="210" y2="90" stroke="#ffffff40" strokeWidth="1" />
      <polygon points="210,90 207,85 213,85" fill="#ffffff60" />
      <text x="205" y="105" fill="#ffffff40" fontSize="7">Weight</text>
    </svg>
  );
}

function TemperatureScalesDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Visual alignment of Celsius, Fahrenheit, and Kelvin temperature scales">
      <defs>
        <marker id="arrow-red-scale" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
        <marker id="arrow-cyan-scale" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
        <marker id="arrow-violet-scale" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
        </marker>
      </defs>
      {/* Celsius scale */}
      <g transform="translate(10, 0)">
        <rect x="25" y="15" width="8" height="90" rx="3" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" />
        {/* LFP */}
        <line x1="20" y1="90" x2="38" y2="90" stroke="#f43f5e" strokeWidth="1" />
        <text x="15" y="93" fill="#ffffff" fontSize="6.5" textAnchor="end">0°C</text>
        <text x="43" y="93" fill="#ffffff40" fontSize="5.5">Ice Pt</text>
        {/* Room Temp */}
        <line x1="22" y1="72" x2="36" y2="72" stroke="#ffffff40" strokeWidth="0.8" />
        <text x="15" y="75" fill="#ffffff70" fontSize="6" textAnchor="end">25°C</text>
        {/* UFP */}
        <line x1="20" y1="30" x2="38" y2="30" stroke="#f43f5e" strokeWidth="1" />
        <text x="15" y="33" fill="#ffffff" fontSize="6.5" textAnchor="end">100°C</text>
        <text x="43" y="33" fill="#ffffff40" fontSize="5.5">Steam Pt</text>
        <text x="29" y="115" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">Celsius (°C)</text>
      </g>

      {/* Fahrenheit scale */}
      <g transform="translate(90, 0)">
        <rect x="25" y="15" width="8" height="90" rx="3" fill="#ec4899" fillOpacity="0.15" stroke="#ec4899" strokeWidth="1" />
        {/* LFP */}
        <line x1="20" y1="90" x2="38" y2="90" stroke="#f43f5e" strokeWidth="1" />
        <text x="15" y="93" fill="#ffffff" fontSize="6.5" textAnchor="end">32°F</text>
        {/* Room Temp */}
        <line x1="22" y1="72" x2="36" y2="72" stroke="#ffffff40" strokeWidth="0.8" />
        <text x="15" y="75" fill="#ffffff70" fontSize="6" textAnchor="end">77°F</text>
        {/* UFP */}
        <line x1="20" y1="30" x2="38" y2="30" stroke="#f43f5e" strokeWidth="1" />
        <text x="15" y="33" fill="#ffffff" fontSize="6.5" textAnchor="end">212°F</text>
        <text x="29" y="115" fill="#ec4899" fontSize="8" fontWeight="bold" textAnchor="middle">Fahrenheit (°F)</text>
      </g>

      {/* Kelvin scale */}
      <g transform="translate(170, 0)">
        <rect x="25" y="15" width="8" height="90" rx="3" fill="#a78bfa" fillOpacity="0.15" stroke="#a78bfa" strokeWidth="1" />
        {/* LFP */}
        <line x1="20" y1="90" x2="38" y2="90" stroke="#f43f5e" strokeWidth="1" />
        <text x="15" y="93" fill="#ffffff" fontSize="6.5" textAnchor="end">273 K</text>
        {/* Room Temp */}
        <line x1="22" y1="72" x2="36" y2="72" stroke="#ffffff40" strokeWidth="0.8" />
        <text x="15" y="75" fill="#ffffff70" fontSize="6" textAnchor="end">298 K</text>
        {/* UFP */}
        <line x1="20" y1="30" x2="38" y2="30" stroke="#f43f5e" strokeWidth="1" />
        <text x="15" y="33" fill="#ffffff" fontSize="6.5" textAnchor="end">373 K</text>
        <text x="29" y="115" fill="#a78bfa" fontSize="8" fontWeight="bold" textAnchor="middle">Kelvin (K)</text>
      </g>
    </svg>
  );
}

function CavityExpansionDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Visual demonstration of thermal expansion of a cavity (hole in plate)">
      <defs>
        <marker id="arrow-white" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff60" />
        </marker>
      </defs>
      {/* Plate at T0 */}
      <g transform="translate(15, 20)">
        <rect x="0" y="0" width="70" height="70" rx="3" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="1" />
        <circle cx="35" cy="35" r="15" fill="#0A0C18" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
        <text x="35" y="38" fill="#38bdf8" fontSize="7.5" textAnchor="middle">Hole (r₀)</text>
        <text x="35" y="85" fill="#ffffff50" fontSize="7" textAnchor="middle">Before Heating (T₀)</text>
      </g>

      {/* Zoom arrows */}
      <g transform="translate(100, 50)" stroke="#ffffff40" strokeWidth="1.5" fill="none">
        <path d="M 0 5 L 20 5" markerEnd="url(#arrow-white)" />
        <text x="10" y="-3" fill="#ffffff60" fontSize="6" textAnchor="middle">Heated</text>
      </g>

      {/* Plate at T */}
      <g transform="translate(145, 10)">
        <rect x="0" y="0" width="85" height="85" rx="3" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="1" />
        <circle cx="42.5" cy="42.5" r="18.5" fill="#0A0C18" stroke="#ef4444" strokeWidth="1.2" />
        <text x="42.5" y="45.5" fill="#fca5a5" fontSize="8" textAnchor="middle" fontWeight="bold">Hole (r &gt; r₀)</text>
        <text x="42.5" y="98" fill="#ffffff50" fontSize="7" textAnchor="middle">After Heating (T)</text>
      </g>
    </svg>
  );
}

function BimetallicStripDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Bimetallic strip bending due to differential thermal expansion">
      {/* Straight strip */}
      <g transform="translate(10, 15)">
        <text x="50" y="10" fill="#ffffff50" fontSize="7">At Room Temp (T₀)</text>
        {/* Metal A */}
        <rect x="0" y="15" width="100" height="8" fill="#38bdf8" stroke="#38bdf8" strokeWidth="0.5" />
        <text x="50" y="21" fill="#05060F" fontSize="5" textAnchor="middle">Brass (&alpha;<sub>high</sub>)</text>
        {/* Metal B */}
        <rect x="0" y="23" width="100" height="8" fill="#a78bfa" stroke="#a78bfa" strokeWidth="0.5" />
        <text x="50" y="29" fill="#05060F" fontSize="5" textAnchor="middle">Steel (&alpha;<sub>low</sub>)</text>
      </g>

      {/* Bending strip */}
      <g transform="translate(130, 15)">
        <text x="50" y="10" fill="#ffffff50" fontSize="7">Heated (T &gt; T₀)</text>
        {/* Curved strips */}
        {/* Brass outer curve */}
        <path d="M 0 20 Q 50 10 90 40 L 86 45 Q 48 18 0 26 Z" fill="#38bdf8" stroke="#38bdf8" strokeWidth="0.5" />
        {/* Steel inner curve */}
        <path d="M 0 26 Q 48 18 86 45 L 82 50 Q 46 25 0 32 Z" fill="#a78bfa" stroke="#a78bfa" strokeWidth="0.5" />
        <text x="60" y="65" fill="#fcd34d" fontSize="7" textAnchor="middle">Bends toward Steel</text>
      </g>
    </svg>
  );
}

function CalorimetryPhaseBalanceDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Visual flowchart representing thermal heat exchange in calorimetry phase changes">
      <defs>
        <marker id="arrow-white-cal" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ffffff60" />
        </marker>
      </defs>
      {/* Hot water */}
      <rect x="10" y="15" width="60" height="30" rx="3" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1" />
      <text x="40" y="32" fill="#ef4444" fontSize="7" fontWeight="bold" textAnchor="middle">Hot Water</text>
      
      {/* Ice */}
      <rect x="170" y="15" width="60" height="30" rx="3" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1" />
      <text x="200" y="32" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">Ice (0°C)</text>

      {/* Heat flow arrows */}
      <g fill="none" stroke="#ffffff40" strokeWidth="1">
        {/* Heat release */}
        <path d="M 40 45 L 40 70 L 100 70" markerEnd="url(#arrow-white-cal)" />
        <text x="70" y="65" fill="#fca5a5" fontSize="5.5" textAnchor="middle">Q<sub>lost</sub> = ms&Delta;T</text>

        {/* Ice gains */}
        <path d="M 200 45 L 200 70 L 140 70" markerEnd="url(#arrow-white-cal)" />
        <text x="170" y="65" fill="#93c5fd" fontSize="5.5" textAnchor="middle">Q<sub>gain</sub> = mL<sub>f</sub></text>
      </g>

      {/* Balance state */}
      <rect x="80" y="85" width="80" height="40" rx="4" fill="#a78bfa" fillOpacity="0.15" stroke="#a78bfa" strokeWidth="1.2" />
      <text x="120" y="98" fill="#c084fc" fontSize="7" fontWeight="bold" textAnchor="middle">Final Equilibrium</text>
      <text x="120" y="108" fill="#ffffff80" fontSize="5.5" textAnchor="middle">Q<sub>gained</sub> = Q<sub>lost</sub></text>
      <text x="120" y="118" fill="#ffffff40" fontSize="5" textAnchor="middle">(Verify if all ice melts!)</text>
    </svg>
  );
}

function ThermalResistanceDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Visual diagram comparing series and parallel thermal resistance configurations">
      <defs>
        <marker id="arrow-red-res" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
      </defs>
      {/* Series */}
      <g transform="translate(5, 5)">
        <text x="50" y="15" fill="#38bdf8" fontSize="8" fontWeight="bold">1. Series Configuration</text>
        {/* Rod 1 */}
        <rect x="10" y="25" width="45" height="20" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="1" />
        <text x="32.5" y="37" fill="#38bdf8" fontSize="6.5" textAnchor="middle">R<sub>1</sub> (K₁)</text>
        {/* Rod 2 */}
        <rect x="55" y="25" width="45" height="20" fill="#a78bfa" fillOpacity="0.08" stroke="#a78bfa" strokeWidth="1" />
        <text x="77.5" y="37" fill="#a78bfa" fontSize="6.5" textAnchor="middle">R<sub>2</sub> (K₂)</text>
        {/* Heat Flow */}
        <path d="M 0 35 L 8 35" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow-red-res)" />
        <path d="M 102 35 L 110 35" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow-red-res)" />
        <text x="55" y="55" fill="#ffffff50" fontSize="6" textAnchor="middle">R<sub>eq</sub> = R₁ + R₂</text>
      </g>

      {/* Parallel */}
      <g transform="translate(125, 5)">
        <text x="50" y="15" fill="#ec4899" fontSize="8" fontWeight="bold">2. Parallel Configuration</text>
        {/* Rod 1 */}
        <rect x="15" y="25" width="80" height="12" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="1" />
        <text x="55" y="33" fill="#38bdf8" fontSize="6" textAnchor="middle">R<sub>1</sub> (K₁)</text>
        {/* Rod 2 */}
        <rect x="15" y="37" width="80" height="12" fill="#a78bfa" fillOpacity="0.08" stroke="#a78bfa" strokeWidth="1" />
        <text x="55" y="45" fill="#a78bfa" fontSize="6" textAnchor="middle">R<sub>2</sub> (K₂)</text>
        {/* Heat Flow */}
        <path d="M 0 37 L 10 37" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow-red-res)" />
        <text x="55" y="58" fill="#ffffff50" fontSize="6" textAnchor="middle">1/R<sub>eq</sub> = 1/R₁ + 1/R₂</text>
      </g>
    </svg>
  );
}

function CoolingCurveDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Newton's Law of Cooling exponential decay curve showing temperature over time">
      {/* Axes */}
      <line x1="30" y1="115" x2="220" y2="115" stroke="#ffffff40" strokeWidth="1" />
      <line x1="30" y1="15" x2="30" y2="115" stroke="#ffffff40" strokeWidth="1" />
      <text x="225" y="118" fill="#ffffff50" fontSize="7">Time (t)</text>
      <text x="25" y="13" fill="#ffffff50" fontSize="7" textAnchor="end">Temp (&theta;)</text>
      
      {/* Ambient temp line */}
      <line x1="30" y1="95" x2="220" y2="95" stroke="#ffffff20" strokeWidth="0.8" strokeDasharray="3 3" />
      <text x="223" y="98" fill="#ffffff30" fontSize="6.5">Room Temp (&theta;<sub>s</sub>)</text>
      
      {/* Exponential curve */}
      <path d="M 30 25 Q 60 85 210 94" fill="none" stroke="#38bdf8" strokeWidth="2" />
      
      {/* Points & Dash lines for successive drops */}
      <circle cx="30" cy="25" r="2" fill="#ef4444" />
      <text x="35" y="22" fill="#ef4444" fontSize="6">&theta;₀</text>

      {/* Interval 1 */}
      <line x1="70" y1="58" x2="70" y2="115" stroke="#ffffff20" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="70" cy="58" r="1.5" fill="#38bdf8" />
      <line x1="130" y1="78" x2="130" y2="115" stroke="#ffffff20" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="130" cy="78" r="1.5" fill="#38bdf8" />

      {/* Bracket times */}
      <text x="50" y="123" fill="#ffffff60" fontSize="5.5" textAnchor="middle">t₁ (Fast cooling)</text>
      <text x="100" y="123" fill="#ffffff60" fontSize="5.5" textAnchor="middle">t₂ &gt; t₁ (Slower)</text>

      <text x="120" y="45" fill="#38bdf8" fontSize="7" textAnchor="middle">Rate slows as (&theta; - &theta;<sub>s</sub>) decreases</text>
    </svg>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function ThermalPropertiesLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [revealExpansion, setRevealExpansion] = useState(false);
  const [revealTransfer, setRevealTransfer] = useState(false);
  const [revealAtmospheric, setRevealAtmospheric] = useState(false);
  const [revealScale, setRevealScale] = useState(false);
  const [revealWaterAnomalous, setRevealWaterAnomalous] = useState(false);
  const [revealCalorimetryCp, setRevealCalorimetryCp] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Breadcrumbs Navigation */}
 <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 10 (Thermal Properties)</span>
      </div>

      {/* Subject Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0A0C18] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
 <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-wider">
              Physics Revision Suite
            </span>
 <span className="flex items-center gap-1 text-[12px] text-white/40">
              <Clock className="w-3.5 h-3.5" /> 40 Mins Read
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Thermal Properties of Matter</h2>
          <p className="text-white/60 text-[13.5px] leading-relaxed max-w-xl">
            A comprehensive NCERT-aligned syllabus masterclass covering Temperature scales, Thermal expansion, Anomalous Water volume, Calorimetry, Phase state boundaries, and Radiation laws.
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0 shrink-0 gap-3">
          <div className="space-y-0.5">
 <div className="text-[11px] text-white/30 uppercase tracking-widest text-right">Unit Progress</div>
            <div className="text-white font-mono font-bold text-xl sm:text-2xl">{progress}% Completed</div>
          </div>
          <div className="w-32 sm:w-40 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* ── MODULE 1: Heat, Temperature & Thermal Expansion ────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={1} title="Heat, Temperature & Thermal Expansion" difficulty={3} color="amber" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
            <p>
              Heat is **energy in transit** between systems due to a temperature gradient. Unlike internal energy, which is a state function representing total kinetic/potential energy of molecules, heat is a **path function**.
            </p>
            <p>
              Temperature is the macroscopic measure of the average kinetic energy of molecular translation.
            </p>
          </div>

          {/* Temperature Scales Conversion */}
          <div className="bg-[#05060F] p-4.5 rounded-xl border border-white/5 space-y-3">
 <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">1. Temperature Scales &amp; Gas Law Foundations</span>
            <p className="text-[13px] text-white/70 leading-relaxed font-sans">
              To convert between Celsius (C), Fahrenheit (F), and Kelvin (K) scales, we use the constant linear ratio:
            </p>
 <div className="bg-black/35 p-3 rounded-lg border border-white/5 text-center text-cyan-300 text-[13px] leading-relaxed">
              (C - 0) / 100 = (F - 32) / 180 = (K - 273.15) / 100
              <br />
              <span className="text-white/40 text-[11px] block mt-1">Thermometric scale rule: (Reading - Lower Fixed Point) / (Upper Fixed Point - LFP) = Constant</span>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed font-sans mt-2">
              <strong>Ideal Gas Equation:</strong> Governs gas temperature under absolute conditions: <code className="text-cyan-300">P · V = μ · R · T</code>. 
              Here, temperature <code className="text-cyan-300">T</code> **must** be expressed in Kelvin. 
              <br />
              <strong>Absolute Zero:</strong> The theoretical minimum temperature where molecular translational kinetic energy becomes zero (-273.15°C or 0 K). Derived by plotting Pressure vs. Temperature for low-density gases at constant volume.
            </p>
            <button
              onClick={() => setRevealScale(!revealScale)}
 className="w-full flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[12.5px] text-cyan-400"
            >
              <span>🔬 View details on Thermometric Properties &amp; Ideal Gas assumptions</span>
              {revealScale ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {revealScale && (
              <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 text-[12.5px] text-white/70 leading-relaxed space-y-2 font-sans">
                <p>
                  <strong>Thermometric Property:</strong> Any physical property of a substance that changes linearly and measurably with temperature. Examples include:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-white/60">
                  <li>Constant-volume gas thermometer: Pressure (P) of gas.</li>
                  <li>Constant-pressure gas thermometer: Volume (V) of gas.</li>
                  <li>Platinum resistance thermometer: Electrical resistance (R).</li>
                  <li>Liquid-in-glass thermometer: Volume height of mercury column.</li>
                </ul>
                <p>
                  <strong>Ideal Gas Assumptions:</strong> (i) Molecules are point masses with negligible volume, (ii) No intermolecular forces of attraction, (iii) Collisions are perfectly elastic.
                </p>
              </div>
            )}
          </div>

          {/* Thermal Expansion Grid */}
          <div className="space-y-3">
 <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">2. Thermal Expansion in Solids</span>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px] text-center">
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-white/40 block text-[10px] uppercase">1D: Linear</span>
                <span className="text-cyan-300 font-bold">α = ΔL / (L₀ΔT)</span>
                <span className="text-[10px] text-white/50 block">ΔL = L₀αΔT</span>
              </div>
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-white/40 block text-[10px] uppercase">2D: Area</span>
                <span className="text-cyan-300 font-bold">β = ΔA / (A₀ΔT)</span>
                <span className="text-[10px] text-white/50 block">β = 2α</span>
              </div>
              <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-white/40 block text-[10px] uppercase">3D: Volume</span>
                <span className="text-cyan-300 font-bold">γ = ΔV / (V₀ΔT)</span>
                <span className="text-[10px] text-white/50 block">γ = 3α</span>
              </div>
            </div>
          </div>

          {/* Anomalous Expansion of Water Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
              <AnomalousWaterDensityDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
                Figure 1.1: Anomalous Volume &amp; Density profiles of Water
              </div>
            </div>
            <div className="p-4.5 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-3 justify-center flex flex-col">
 <span className="text-[13.5px] font-bold text-amber-400 uppercase tracking-wider block">Anomalous Expansion of Water</span>
              <p className="text-white/80 text-[13px] leading-relaxed font-sans">
                Most liquids expand continuously when heated. However, water is a critical exception:
              </p>
              <ul className="list-disc list-inside text-white/70 text-[12.5px] space-y-1.5 pl-1 font-sans">
                <li>When water at 0°C is heated, its volume **decreases** (it contracts) until it reaches <strong>4°C</strong>.</li>
                <li>Above 4°C, it expands normally. Thus, water has its **minimum volume** and **maximum density** (ρ = 1.0 g/cm³) at exactly <strong>4°C</strong>.</li>
                <li><strong>Ecological Significance:</strong> In cold climates, lake surface water cools to 4°C and sinks to the bottom. Once the surface freezes at 0°C, the denser 4°C water remains at the bottom, protecting aquatic life from freezing solid.</li>
              </ul>
            </div>
          </div>

          {/* Tap to reveal pendulum clock */}
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-4.5 space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Pendulum Clock Thermal Error</h4>
            <div className="space-y-2">
              <button
                onClick={() => setRevealExpansion(!revealExpansion)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-cyan-400"
              >
                <span>⏰ Clock error equations (Lost vs Gained time)?</span>
                {revealExpansion ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {revealExpansion && (
                <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 text-[13px] text-white/70 leading-relaxed font-sans space-y-2">
                  <p>
                    The time period of a simple pendulum is <code className="text-cyan-300 font-mono">T = 2π√(L/g)</code>. Taking logarithms and differentiating yields a fractional period change: <code className="text-cyan-300 font-mono">dT/T = (1/2) dL/L = (1/2) α dT</code>.
                  </p>
                  <p>
                    For a total duration of t seconds (e.g., a full day t = 86400 seconds), the time lost or gained is:
                  </p>
 <div className="bg-black/35 p-2.5 rounded-lg border border-white/5 text-center text-cyan-300 text-[12px]">
                    Δt = (1/2) · α · ΔT · t
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-white/60">
                    <li>**Temperature rises (ΔT &gt; 0)**: Pendulum elongates, time period increases (swings slower), clock **loses time**.</li>
                    <li>**Temperature drops (ΔT &lt; 0)**: Pendulum contracts, period decreases (swings faster), clock **gains time**.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Thermal Stress Derivation Card */}
          <div className="p-4.5 bg-[#05060F] border border-white/5 rounded-2xl space-y-2.5">
 <span className="text-[12px] font-bold text-amber-400 tracking-wider block uppercase flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Derivation: Thermal Stress &amp; Clamped Rod Tension
            </span>
            <div className="text-[13px] text-white/70 leading-relaxed font-sans space-y-2">
              <p>
                When a rod of length L₀ and cross-sectional area A is heated by temperature ΔT, its free thermal expansion would be:
                <code className="text-cyan-300 font-mono ml-1 text-[13px]">ΔL = L₀ · α · ΔT</code>.
              </p>
              <p>
                If the rod is clamped between rigid walls, the walls exert a compressing normal force F to prevent expansion. The compressive strain experienced is:
                <br />
 <span className="text-cyan-300 block text-center py-1">ε = ΔL / L₀ = (L₀ · α · ΔT) / L₀ = α · ΔT</span>
              </p>
              <p>
                From Young&apos;s Modulus definition:
                <code className="text-cyan-300 font-mono ml-1 text-[13px]">Y = Stress / Strain = (F / A) / (α · ΔT)</code>. Solving for the thermal force (tension) exerted:
              </p>
 <div className="bg-black/35 p-2.5 rounded-lg border border-white/5 text-center text-cyan-300 text-[13px]">
                Force F = Y · A · α · ΔT
              </div>
              <p className="text-[12px] text-white/50 leading-relaxed italic">
                *Key IAT Hook: Since length L₀ cancels out, the thermal stress (F/A = Y·α·ΔT) and force depend ONLY on temperature change and material constants, not on rod length!
              </p>
            </div>
          </div>
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          <SolvedExample
            number={1}
            question="A clock with a brass pendulum keeps correct time at 15°C. If the temperature rises to 35°C, find the time lost by the clock per day. (&alpha;<sub>brass</sub> = 2.0 &times; 10<sup>&minus;5</sup> /°C)"
            steps={[
              "Identify parameters: Temperature rise &Delta;T = 35 - 15 = 20°C.",
              "Linear expansion coefficient &alpha; = 2.0 * 10<sup>&minus;5</sup> /°C.",
              "Total seconds in one day t = 86400 s.",
              "Apply clock error formula: &Delta;t = (1/2) * &alpha; * &Delta;T * t.",
              "Substitute values: &Delta;t = 0.5 * (2.0 * 10<sup>&minus;5</sup>) * 20 * 86400 = 10<sup>&minus;5</sup> * 20 * 86400 = 17.28 seconds."
            ]}
            answer="Time Lost = 17.28 seconds / day"
            color="amber"
          />

          <SolvedExample
            number={2}
            question="A circular steel washer of outer radius R = 2.0 cm has a hole of radius r = 1.0 cm at the center. If the washer is heated such that its outer circumference expands by 1.0%, what is the percentage change in the area of the hole?"
            steps={[
              "Circular washer expansions are linear. Circumference C = 2πR. If C expands by 1%, outer radius R expands by 1% (since C ∝ R).",
              "Thermal expansion acts like photographic zoom. All linear dimensions expand by the same ratio.",
              "Therefore, the inner hole radius r also expands by 1.0% (Δr / r₀ = 1.0%).",
              "Area of the hole is A = πr². Taking logs and differentiating: dA/A = 2 dr/r.",
              "Substitute values: dA/A = 2 * (1.0%) = 2.0%."
            ]}
            answer="Hole Area increases by 2.0%"
            color="amber"
          />
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          <SolvedExample
            number={3}
            question="A steel rod of cross-sectional area 1.5 cm² is held rigidly at both ends at 20°C. If the temperature is raised to 100°C, calculate the thermal force developed in the rod. (Young's Modulus Y = 2.0 &times; 10¹¹ N/m², coefficient of linear expansion &alpha; = 1.2 &times; 10<sup>&minus;5</sup> /°C)"
            steps={[
              "Identify parameters: Area A = 1.5 cm² = 1.5 * 10⁻⁴ m².",
              "Temperature difference: ΔT = 100°C - 20°C = 80°C.",
              "Material properties: Y = 2.0 * 10¹¹ N/m², α = 1.2 * 10⁻⁵ /°C.",
              "Apply the thermal stress force formula derived above: F = Y * A * α * ΔT.",
              "Substitute values: F = (2.0 * 10¹¹) * (1.5 * 10⁻⁴) * (1.2 * 10⁻⁵) * 80.",
              "Calculate intermediate: (2.0 * 1.5 * 1.2) = 3.6.",
              "Combine powers of ten: 10¹¹ * 10⁻⁴ * 10⁻⁵ = 10² = 100.",
              "Total: F = 3.6 * 100 * 80 = 28,800 N."
            ]}
            answer="Thermal Force = 28,800 N"
            color="amber"
          />

          <SolvedExample
            number={4}
            question="A glass beaker of volume 250 cm³ is filled to the brim with water at 4°C. (i) If the beaker is heated to 10°C, does water overflow? (ii) If it is instead cooled to 0°C, does it overflow? (Ignore glass expansion)"
            steps={[
              "Identify initial condition: Water is at 4°C, where its density is maximum and volume is minimum.",
              "Heating case (4°C to 10°C): Since 4°C is the minimum volume state, heating water causes it to expand. Volume increases, leading to overflow.",
              "Cooling case (4°C to 0°C): Due to anomalous expansion of water, cooling below 4°C also causes it to expand. Volume increases, leading to overflow here as well.",
              "Conclusion: In both cases (heating or cooling), the water expands from its minimum volume state and overflows."
            ]}
            answer="Water overflows in both cases (heating & cooling)!"
            color="amber"
          />
        </div>
      </div>

      {/* ── MODULE 2: Calorimetry & Phase Transitions ──────────────────────── */}
      <div className="space-y-6">
        <ModuleHeader number={2} title="Calorimetry & Phase Transitions" difficulty={3} color="rose" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          <div className="text-white/80 text-[14.5px] leading-relaxed space-y-4">
            <p>
              Calorimetry is governed by the **Law of Heat Exchange**: in an isolated system, Heat Lost by hot bodies equals Heat Gained by cold bodies.
            </p>
          </div>

          {/* Phase Transition Diagrams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
              <PhaseTransitionPlateausDiagram />
 <div className="text-[11px] text-white/40 uppercase tracking-widest text-center">
                Figure 2.1: Heating Curve &amp; Latent Heat Plateaus
              </div>
            </div>
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
              <RegelationDiagram />
 <div className="text-[11px] text-white/40 uppercase tracking-widest text-center">
                Figure 2.2: Regelation wire cutting through ice block
              </div>
            </div>
          </div>

          {/* Specific Heat, Latent Heat, Regelation Theory card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4.5 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-2.5">
 <span className="text-[13px] font-bold text-rose-300 uppercase tracking-wider block">Specific Heat Capacity &amp; Cp vs Cv</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed font-sans">
                <strong>Specific Heat Capacity (s):</strong> Heat required to raise the temperature of a unit mass of substance by 1&deg;C: s = Q / (m &Delta;T). Unit: J/(kg&middot;K) or cal/(g&middot;&deg;C). Water has a very high specific heat capacity (1 cal/g&deg;C = 4186 J/kg&middot;K), making it an excellent coolant.
              </p>
              <p className="text-white/70 text-[12.5px] leading-relaxed font-sans">
                <strong>Molar Specific Heat (C):</strong> Heat required to raise the temperature of 1 mole of a substance by 1&deg;C: C = Q / (&mu; &Delta;T).
              </p>
 <ul className="list-disc list-inside text-white/60 text-[12px] space-y-1.5 pl-2">
                <li><strong>C<sub>p</sub> vs C<sub>v</sub> (Gases):</strong> C<sub>p</sub> is molar specific heat at constant pressure; C<sub>v</sub> is at constant volume.</li>
                <li><strong>Mayer&apos;s Relation:</strong> C<sub>p</sub> &minus; C<sub>v</sub> = R. C<sub>p</sub> &gt; C<sub>v</sub> because at constant pressure, gas expands and does work, requiring extra heat input.</li>
                <li><strong>Water Equivalent (W):</strong> Mass of water which has the same heat capacity as the body: W = m &middot; (s<sub>body</sub> / s<sub>water</sub>).</li>
              </ul>
            </div>

            <div className="p-4.5 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-2.5 justify-center flex flex-col">
 <span className="text-[13px] font-bold text-violet-300 uppercase tracking-wider block">Regelation, Sublimation &amp; Pressure Effects</span>
              <p className="text-white/70 text-[12.5px] leading-relaxed font-sans">
                <strong>Regelation:</strong> Phenomenon where ice melts under increased pressure and refreezes when pressure is released. This happens because the melting point of ice decreases below 0°C under pressure.
              </p>
              <p className="text-white/70 text-[12.5px] leading-relaxed font-sans">
                <strong>Sublimation:</strong> Direct phase change from solid to gas without entering the liquid state (e.g., dry ice, camphor, iodine).
              </p>
              <p className="text-white/70 text-[12.5px] leading-relaxed font-sans">
                <strong>Pressure &amp; Impurities:</strong>
                <br />
                &bull; Melting point of substances that contract on melting (like ice) <strong>decreases</strong> with pressure, while for those that expand (like wax) it <strong>increases</strong>.
                <br />
                &bull; Boiling point of all liquids <strong>increases</strong> with pressure.
                <br />
                &bull; Impurities <strong>lower</strong> the melting point (e.g. salting frozen roads) and <strong>raise</strong> the boiling point of water.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaCard
              formula="Q = m · s · ΔT"
              use_when="Heat required for Temperature Change within a single phase (solid, liquid, or gas). s is specific heat."
              priority="HIGH"
              freq_stars={5}
              difficulty_stars={1}
              color="rose"
              copy_text="Q = m*s*dT"
            />
            <FormulaCard
              formula="Q = m · L"
              use_when="Heat required during Phase Change (melting or boiling). Temperature remains constant. L is Latent heat."
              priority="HIGH"
              freq_stars={5}
              difficulty_stars={2}
              color="rose"
              copy_text="Q = m*L"
            />
          </div>

          {/* Interactive Calorimetry check */}
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-4.5 space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Calorimetry &amp; Specific Heat Theory</h4>
            <div className="space-y-2">
              <button
                onClick={() => setRevealCalorimetryCp(!revealCalorimetryCp)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-rose-400"
              >
                <span>🔬 Molar specific heats, water equivalent &amp; gas constants?</span>
                {revealCalorimetryCp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {revealCalorimetryCp && (
                <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 text-[13px] text-white/70 leading-relaxed font-sans space-y-2">
                  <p>
                    <strong>Molar Specific Heat Ratio (&gamma;):</strong> Defined as C<sub>p</sub> / C<sub>v</sub>. For a monatomic gas, &gamma; &asymp; 1.67; diatomic, &gamma; &asymp; 1.40; polyatomic, &gamma; &asymp; 1.33.
                  </p>
                  <p>
                    <strong>Calorimeter Water Equivalent:</strong> If a calorimeter of mass m<sub>c</sub> and specific heat s<sub>c</sub> is used, we treat it as equivalent to a mass W = m<sub>c</sub> &middot; s<sub>c</sub> / s<sub>w</sub> of water. Total heat capacity becomes (m<sub>w</sub> + W) &middot; s<sub>w</sub>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          <SolvedExample
            number={5}
            question="10 g of ice at 0°C is mixed with 10 g of water at 40°C in a calorimeter. Calculate the final temperature of the mixture. (L<sub>fusion</sub> = 80 cal/g, s<sub>water</sub> = 1 cal/g°C)"
            steps={[
              "Assume all ice melts at 0°C. Heat required to melt 10 g ice: Q<sub>melt</sub> = m * L = 10 * 80 = 800 calories.",
              "Calculate maximum heat released by 10 g water cooling from 40°C to 0°C: Q<sub>release</sub> = m * s * &Delta;T = 10 * 1 * 40 = 400 calories.",
              "Compare heats: Q<sub>release</sub> (400) is less than Q<sub>melt</sub> (800). All ice CANNOT melt. The system gets stuck in equilibrium at 0°C.",
              "Let m'' * L  →  400 = m'' = 5 g.",
              "Final State: 5 g ice melted into water. Mixture has 5 g remaining ice and 15 g water at 0°C."
            ]}
            answer="Final Temperature = 0°C | Mixture: 5 g Ice & 15 g Water"
            color="rose"
          />

          <SolvedExample
            number={6}
            question="A steam bubble of mass 1.0 g at 100°C is passed into a calorimeter containing 10 g of water and 2.0 g of ice at 0°C. If calorimeter mass is negligible, find the final temperature of water. (L<sub>vapor</sub> = 540 cal/g, L<sub>fusion</sub> = 80 cal/g, s = 1 cal/g°C)"
            steps={[
              "Phase 1: Melting of 2.0 g ice at 0°C requires: Q<sub>melt</sub> = 2 * 80 = 160 cal.",
              "Phase 2: If we condense 1.0 g steam to water at 100°C, it releases: Q<sub>condense</sub> = 1 * 540 = 540 cal.",
              "Since Q<sub>condense</sub> (540 cal) is greater than Q<sub>melt</sub> (160 cal), the ice fully melts and the mixture warms up.",
              "Let T be the final temperature of the system. Total water mass warming up is 10 g + 2 g = 12 g (from 0°C).",
              "Heat gained: Q<sub>gained</sub> = 160 (to melt ice) + 12 * 1 * (T - 0) = 160 + 12T.",
              "Heat lost: steam condenses and cools from 100°C to T: Q<sub>lost</sub> = 540 + 1 * 1 * (100 - T) = 640 - T.",
              "Set Q<sub>gained</sub> = Q<sub>lost</sub>: 160 + 12T = 640 - T  →  13T = 480  →  T = 480 / 13 ≈ 36.9°C."
            ]}
            answer="Final Temperature ≈ 36.9°C"
            color="rose"
          />
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          <SolvedExample
            number={7}
            question="For a gas, the difference between two molar specific heats is 8.3 J/(mol·K). If the ratio of specific heats C<sub>p</sub>/C<sub>v</sub> is 1.67, calculate the values of C<sub>v</sub> and C<sub>p</sub>."
            steps={[
              "From Mayer's Relation: 1.67 * C<sub>v</sub> - C<sub>v</sub> = 8.3  →  0.67 * C<sub>v</sub> = 8.3.",
              "Solve for C<sub>v</sub>: C<sub>v</sub> = 8.3 / 0.67 ≈ 12.4 J/(mol·K).",
              "Calculate C<sub>p</sub>: C<sub>p</sub> = 12.4 + 8.3 = 20.7 J/(mol·K)."
            ]}
            answer="C<sub>v</sub> &asymp; 12.4 J/(mol&middot;K) | C<sub>p</sub> &asymp; 20.7 J/(mol&middot;K)"
            color="rose"
          />

          <SolvedExample
            number={8}
            question="An ice skater moves smoothly on ice at 0°C. Explain how pressure from the skater's blades enables smooth gliding and why this is an example of regelation."
            steps={[
              "The narrow blades of the ice skates exert high pressure on the ice directly underneath them.",
              "Under increased pressure, the melting point of ice decreases below 0°C (e.g. to -2°C).",
              "As a result, the ice directly under the blades melts at 0°C, forming a thin layer of water that acts as a lubricant for smooth gliding.",
              "Once the skate blade passes, the pressure drops back to normal, and the water refreezes into ice immediately. This cycle is a classic example of regelation."
            ]}
            answer="High pressure lowers melting point &rarr; melts to lubricate &rarr; pressure released &rarr; refreezes."
            color="rose"
          />
        </div>

        {/* Calorimetry Phase Balance visual guide */}
        <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3 mt-4">
          <CalorimetryPhaseBalanceDiagram />
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
            Figure 2.3: Calorimetry Mixed-Phase Heat balance accounting chart
          </div>
        </div>
      </div>

      {/* ── MODULE 3: Modes of Heat Transfer & Thermal Resistance ───────────── */}
      <div className="space-y-6">
        <ModuleHeader number={3} title="Modes of Heat Transfer & Thermal Resistance" difficulty={4} color="cyan" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-5">
          {/* Decision Tree */}
          <div className="bg-[#05060F] p-4.5 rounded-xl border border-white/5 space-y-3">
 <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase text-center">💡 Heat Transfer Mode Decision Tree</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[13px]">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-cyan-300 font-mono font-bold block">1. Medium present? NO</span>
                <span className="text-white font-bold">☀️ RADIATION</span>
                <span className="text-[12px] text-white/50 block">Electromagnetic waves. T⁴ dependency. No contact needed.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-cyan-300 font-mono font-bold block">2. Medium? YES | Fluid? YES</span>
                <span className="text-white font-bold">🌪️ CONVECTION</span>
                <span className="text-[12px] text-white/50 block">Actual mass movement. Hot fluid rises, cold sinks. Requires gravity.</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-lg space-y-1">
                <span className="text-cyan-300 font-mono font-bold block">3. Medium? YES | Fluid? NO (Solid)</span>
                <span className="text-white font-bold">⚛️ CONDUCTION</span>
                <span className="text-[12px] text-white/50 block">Transfer via lattice vibrations & free electrons. No net mass movement.</span>
              </div>
            </div>
          </div>

          {/* SVG: Heat transfer mechanisms */}
          <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center gap-3">
            <svg width="380" height="150" viewBox="0 0 380 150" className="max-w-full">
              {/* Conduction Rod */}
              <g transform="translate(10, 0)">
                <text x="60" y="15" fill="#22d3ee" fontSize="8" fontWeight="bold" textAnchor="middle">⚛️ Conduction (Rod)</text>
                
                {/* Rod block */}
                <rect x="15" y="45" width="90" height="20" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
                <rect x="15" y="45" width="90" height="20" fill="#22d3ee" fillOpacity="0.05" />
                
                {/* Temperatures */}
                <text x="5" y="58" fill="#f87171" fontSize="7" fontWeight="bold">T<sub>H</sub></text>
                <text x="110" y="58" fill="#60a5fa" fontSize="7" fontWeight="bold">T<sub>L</sub></text>

                {/* Heat flow arrows */}
                <path d="M 25 55 L 95 55" fill="none" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrow-cyan-scale)" />
                <text x="60" y="80" fill="#ffffff" fillOpacity="0.5" fontSize="7" textAnchor="middle">H = KA(T<sub>H</sub> - T<sub>L</sub>)/L</text>
              </g>

              {/* Convection Cycle */}
              <g transform="translate(145, 0)">
                <text x="55" y="15" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">🌪️ Convection Beaker</text>
                
                {/* Beaker */}
                <path d="M 25 35 L 25 105 L 85 105 L 85 35" fill="none" stroke="#cccccc" strokeWidth="1.5" />
                <rect x="26" y="55" width="58" height="49" fill="#3b82f6" fillOpacity="0.1" />

                {/* Flame at base */}
                <circle cx="55" cy="115" r="4" fill="#ef4444" />
                <path d="M 51 115 Q 55 105 59 115" fill="#f97316" />

                {/* Convection loops */}
                <path d="M 55 95 L 55 60" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow-red-scale)" />
                <path d="M 33 65 L 33 95" fill="none" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#arrow-cyan-scale)" />
                <path d="M 77 65 L 77 95" fill="none" stroke="#60a5fa" strokeWidth="1" markerEnd="url(#arrow-cyan-scale)" />
              </g>

              {/* Radiation waves */}
              <g transform="translate(265, 0)">
                <text x="50" y="15" fill="#ec4899" fontSize="8" fontWeight="bold" textAnchor="middle">☀️ Radiation (Sun)</text>
                
                {/* Sun */}
                <circle cx="50" cy="50" r="15" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" strokeWidth="1.5" />
                
                {/* Radiating waves */}
                <path d="M 50 72 C 45 78 55 84 50 90 C 45 96 55 102 50 108" fill="none" stroke="#f472b6" strokeWidth="1" />
                <path d="M 28 65 C 22 71 28 77 22 83" fill="none" stroke="#f472b6" strokeWidth="1" />
                <path d="M 72 65 C 78 71 72 77 78 83" fill="none" stroke="#f472b6" strokeWidth="1" />
                
                <text x="50" y="125" fill="#ffffff" fillOpacity="0.5" fontSize="7" textAnchor="middle">Power &prop; T⁴</text>
              </g>
            </svg>
 <div className="text-[12px] text-white/40 uppercase tracking-widest text-center">
              Figure 3.1: Heat transfer pathways: solid lattice conduction, buoyant convection cycles, and vacuum radiation waves
            </div>
          </div>

          {/* Convection Depth and Thermal Resistance diagram section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2.5 justify-center flex flex-col text-[12.5px] leading-relaxed">
 <span className="text-[13.5px] font-bold text-cyan-400 uppercase tracking-wider block">Convection Mechanisms & Gravity</span>
              <p>
                <strong>Convection:</strong> Heat transfer by bulk movement of matter. Can only occur in fluids (liquids & gases).
              </p>
              <ul className="list-disc list-inside text-white/60 text-[12px] space-y-1 pl-1 font-sans">
                <li><strong>Natural (Free) Convection:</strong> Driven by buoyancy. Fluid near the heat source warms, expands, density decreases, and it rises. Cooler, denser fluid sinks to replace it (e.g., land/sea breezes, trade winds).</li>
                <li><strong>Forced Convection:</strong> Fluid is forced to flow by an external pump, fan, or stirrer (e.g., human circulatory system, cooling fans in laptops).</li>
                <li><strong>Gravity Dependency:</strong> Natural convection relies entirely on density differences and buoyancy forces, meaning <strong>gravity is required</strong>. In a zero-gravity space station, hot air will not rise; heat is transferred only via conduction.</li>
              </ul>
            </div>

            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
              <ThermalResistanceDiagram />
 <div className="text-[11.5px] text-white/40 uppercase tracking-widest text-center">
                Figure 3.3: Composite rod Ohm's Law analogy
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormulaCard
              formula="H = dQ/dt = K&middot;A&middot;(T<sub>H</sub> - T<sub>L</sub>) / L"
              use_when="Thermal Conduction rate (Heat Current). K is Thermal Conductivity, A is cross-section area, L is rod length."
              priority="HIGH"
              freq_stars={5}
              difficulty_stars={2}
              color="cyan"
              copy_text="H = K*A*(Th-Tl)/L"
            />
            <FormulaCard
              formula="R<sub>th</sub> = L / (K &middot; A)"
              use_when="Thermal Resistance: Ohm's law analogy. Heat flow treats Temp Diff (&Delta;T) as Voltage and H as Current."
              priority="HIGH"
              freq_stars={5}
              difficulty_stars={2}
              color="cyan"
              copy_text="R = L/(K*A)"
            />
            <FormulaCard
              formula="P = e &middot; &sigma; &middot; A &middot; T<sup>4</sup>"
              use_when="Stefan-Boltzmann Radiation Power. T must be in Kelvin. Doubling T scales radiated power by 16x."
              priority="HIGH"
              freq_stars={4}
              difficulty_stars={3}
              color="cyan"
              copy_text="P = e*sigma*A*T^4"
            />
            <FormulaCard
              formula="&lambda;<sub>max</sub> &middot; T = b"
              use_when="Wien's Displacement Law. Product of peak emission wavelength and Kelvin temperature is constant (b &asymp; 2.898 * 10^-3 m K)."
              priority="HIGH"
              freq_stars={4}
              difficulty_stars={2}
              color="cyan"
              copy_text="lamda*T = b"
            />
          </div>

          {/* Blackbody Spectrum SVG & Conduction Series/Parallel details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
              <BlackBodyRadiationDiagram />
 <div className="text-[11px] text-white/40 uppercase tracking-widest text-center">
                Figure 3.2: Wien's Displacement Law Peak Shift
              </div>
            </div>
            <div className="p-4.5 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2.5 justify-center flex flex-col text-[12.5px] leading-relaxed">
 <span className="text-[13.5px] font-bold text-cyan-400 uppercase tracking-wider block">Blackbody Radiation &amp; Kirchhoff's Law</span>
              <p>
                <strong>Blackbody:</strong> An ideal body that absorbs 100% of electromagnetic radiation incident on it. 
              </p>
              <p>
                <strong>Absorptive Power (a) &amp; Emissive Power (e):</strong> Absorptive power is the fraction of incident radiation absorbed by a surface. Emissivity (e) is the ratio of emissive power of a body to that of a perfect blackbody.
              </p>
              <p>
                <strong>Kirchhoff's Law of Radiation:</strong> At any temperature, the ratio of emissive power to absorptive power is constant and equal to the emissive power of a perfect blackbody: <code className="text-cyan-300">e / a = Constant</code>. 
                <br />
                <span className="text-amber-400 font-semibold">&quot;Good absorbers are good emitters.&quot;</span>
              </p>
            </div>
          </div>

          {/* Standalone Newton's Law of Cooling Concept Card */}
          <div className="p-5 bg-cyan-500/[0.03] border border-cyan-500/20 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] font-bold text-cyan-300 uppercase tracking-wider font-mono">Newton's Law of Cooling &amp; Decay Curve</span>
 <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">IAT HIGH YIELD</span>
            </div>
            <p className="text-[13px] leading-relaxed text-white/80">
              The rate of loss of heat (&minus;dQ/dt) of a body is directly proportional to the difference in temperature between the body and its surroundings:
            </p>
 <div className="bg-[#05060F] p-3 rounded-xl border border-white/5 text-center text-[13px] text-cyan-300">
              d&theta;/dt = &minus;K(&theta; &minus; &theta;<sub>s</sub>) &nbsp; &rarr; &nbsp; &theta;(t) &minus; &theta;<sub>s</sub> = (&theta;₀ &minus; &theta;<sub>s</sub>) &middot; e<sup>&minus;Kt</sup>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="space-y-2.5 text-[12.5px] text-white/70">
                <p><strong>Two ways to solve IAT problems:</strong></p>
                <ul className="list-disc list-inside space-y-1.5 pl-1">
                  <li><strong>Average Approximation (Fastest)</strong>: For small drops (e.g. from 60°C to 50°C), use the average temperature &theta;<sub>avg</sub> = (&theta;₁ + &theta;₂)/2 and write:
                    <br />
 <span className="text-cyan-300 text-[12px] block text-center mt-1">(&theta;₁ &minus; &theta;₂)/t = K &middot; [ (&theta;₁ + &theta;₂)/2 &minus; &theta;<sub>s</sub> ]</span>
                  </li>
                  <li><strong>Logarithmic Exact Form</strong>: For large temperature swings, use:
                    <br />
 <span className="text-cyan-300 text-[12px] block text-center mt-1">ln[ (&theta;₂ &minus; &theta;<sub>s</sub>) / (&theta;₁ &minus; &theta;<sub>s</sub>) ] = &minus;Kt</span>
                  </li>
                </ul>
              </div>
              <div className="p-3 bg-[#05060F] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-2.5">
                <CoolingCurveDiagram />
 <div className="text-[11px] text-white/40 uppercase tracking-widest text-center">
                  Figure 3.4: Temperature decay vs time
                </div>
              </div>
            </div>
          </div>

          {/* Tap to Reveal Conduction Analogy */}
          <div className="bg-[#05060F] border border-white/5 rounded-2xl p-4.5 space-y-3">
 <h4 className="text-white font-bold text-[13px] uppercase tracking-wider">Conduction &amp; Ohm&apos;s Law Analogy</h4>
            <div className="space-y-2">
              <button
                onClick={() => setRevealTransfer(!revealTransfer)}
 className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 text-left text-[13px] text-cyan-400"
              >
                <span>🔌 View series and parallel resistance equations?</span>
                {revealTransfer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {revealTransfer && (
                <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 text-[13px] text-white/70 leading-relaxed font-sans space-y-2">
                  <p>
                    By modeling conduction as current, we can instantly solve composite rods using resistance rules:
                  </p>
 <ul className="list-disc pl-4 space-y-1.5 text-white/60 text-[12px]">
                    <li>**Series Rods**: Heat flow is constant. R<sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub>. Equivalent conductivity: L<sub>total</sub>/K<sub>eq</sub> = L<sub>1</sub>/K<sub>1</sub> + L<sub>2</sub>/K<sub>2</sub>.</li>
                    <li>**Parallel Rods**: Temperature difference is constant. 1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub>. Equivalent conductivity: K<sub>eq</sub> = (K<sub>1</sub>A<sub>1</sub> + K<sub>2</sub>A<sub>2</sub>)/A<sub>total</sub>.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SolvedExample
            number={9}
            question="Two metal rods of same length and area but conductivities K<sub>1</sub> and K<sub>2</sub> are connected in series. Find the equivalent thermal conductivity K<sub>eq</sub> of the composite rod."
            steps={[
              "Since the rods are in series, the total thermal resistance is the sum of individual resistances: R<sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub>.",
              "The formulas for resistances are: R<sub>1</sub> = L / (K<sub>1</sub> * A) and R<sub>2</sub> = L / (K<sub>2</sub> * A).",
              "For the composite rod, the total length is 2L, so R<sub>eq</sub> = 2L / (K<sub>eq</sub> * A).",
              "Substitute into the sum: 2L / (K<sub>eq</sub> * A) = L / (K<sub>1</sub> * A) + L / (K<sub>2</sub> * A).",
              "Cancel L and A from both sides: 2 / K<sub>eq</sub> = 1 / K<sub>1</sub> + 1 / K<sub>2</sub> = (K<sub>1</sub> + K<sub>2</sub>) / (K<sub>1</sub> * K<sub>2</sub>).",
              "Invert to solve for K<sub>eq</sub>: K<sub>eq</sub> = 2 * K<sub>1</sub> * K<sub>2</sub> / (K<sub>1</sub> + K<sub>2</sub>). (Harmonic mean!)"
            ]}
            answer="K<sub>eq</sub> = 2 &middot; K<sub>1</sub> &middot; K<sub>2</sub> / (K<sub>1</sub> + K<sub>2</sub>)"
            color="cyan"
          />

          <SolvedExample
            number={10}
            question="The temperature of a perfect blackbody is increased from 1000 K to 2000 K. Find the ratio of: (i) the total energy radiated per second, and (ii) the peak emission wavelength."
            steps={[
              "According to Stefan-Boltzmann Law, total energy radiated per second is: P = e &middot; &sigma; &middot; A &middot; T<sup>4</sup>  →  P ∝ T<sup>4</sup>.",
              "Therefore, ratio of radiated energy is: P<sub>new</sub> / P<sub>old</sub> = (T<sub>new</sub> / T<sub>old</sub>)<sup>4</sup> = (2000 / 1000)<sup>4</sup> = 2<sup>4</sup> = 16.",
              "According to Wien's Displacement Law: &lambda;<sub>max</sub> · T = Constant  →  &lambda;<sub>max</sub> ∝ 1/T.",
              "Therefore, ratio of peak wavelengths is: &lambda;<sub>new</sub> / &lambda;<sub>old</sub> = T<sub>old</sub> / T<sub>new</sub> = 1000 / 2000 = 1 / 2 = 0.5."
            ]}
            answer="Radiated Energy Ratio = 16 : 1 | Peak Wavelength Ratio = 1 : 2 (0.5)"
            color="cyan"
          />
        </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
          <SolvedExample
            number={11}
            question="Newton's Law of Cooling states: d&theta;/dt = -K(&theta; - &theta;<sub>s</sub>). A body cools from 60°C to 50°C in 10 minutes in a room at 30°C. How long will it take to cool from 50°C to 40°C in the same room?"
            steps={[
              "For the first cooling interval (60°C to 50°C): Average temperature &theta;<sub>avg</sub> = (60 + 50)/2 = 55°C.",
              "Rate of cooling is: d&theta;/dt = (60 - 50)/10 = 1 °C/min.",
              "Apply Newton's approximation: 1 = K * (&theta;<sub>avg</sub> - &theta;<sub>s</sub>) = K * (55 - 30) = 25K  →  K = 1 / 25 /min.",
              "For the second cooling interval (50°C to 40°C): Average temperature &theta;<sub>avg</sub> = (50 + 40)/2 = 45°C.",
              "Let t be the required time: rate is (50 - 40)/t = 10/t.",
              "Apply formula: 10/t = K * (&theta;<sub>avg</sub> - &theta;<sub>s</sub>) = (1/25) * (45 - 30) = (1/25) * 15 = 3/5  →  t = 50 / 3 ≈ 16.7 minutes."
            ]}
            answer="Time taken &asymp; 16.7 minutes (Average Temp Approximation)"
            color="cyan"
          />
        </div>
      </div>

      {/* Aligned diagrams: Scales, Cavity, Bimetallic strip in Module 1 & 2 */}
      {/* ── Visual Reference Room ────────────────────────────────────────── */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <SectionHeader icon={<Brain className="w-5 h-5" />} label="Visual Concepts Reference Room" color="indigo" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#0A0C18] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
            <TemperatureScalesDiagram />
 <div className="text-[11.5px] text-white/40 uppercase tracking-widest text-center">
              Figure 3.5: Thermometer conversions
            </div>
          </div>
          <div className="p-4 bg-[#0A0C18] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
            <CavityExpansionDiagram />
 <div className="text-[11.5px] text-white/40 uppercase tracking-widest text-center">
              Figure 3.6: Expansion of a cavity
            </div>
          </div>
          <div className="p-4 bg-[#0A0C18] border border-white/5 rounded-2xl flex flex-col items-center justify-between gap-3">
            <BimetallicStripDiagram />
 <div className="text-[11.5px] text-white/40 uppercase tracking-widest text-center">
              Figure 3.7: Bimetallic bending strip
            </div>
          </div>
        </div>
      </div>

      {/* ── PREMIUM REVISION UPGRADE: Traps, Focus, Recognition, Checklist ──── */}
      {/* ── SECTION 3: Strategy & Memory Guidelines ─────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
        {/* Memorize Box */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4.5 h-4.5 text-emerald-400" /> What You MUST Memorize
          </h4>
          <ul className="space-y-3.5 text-[13px] text-white/80">
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Expansion coefficient ratios:</strong>
              <br />
              α : β : γ = 1 : 2 : 3. If area expansion is needed, substitute β = 2α. If volume expansion, γ = 3α.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Stefan-Boltzmann power scaling:</strong>
              <br />
              P ∝ T⁴. Remind yourself that doubling absolute temperature scales the radiated power by 2⁴ = 16 times.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Brass/Steel clock behavior:</strong>
              <br />
              Temp rises → length expands → period increases → clock ticks slower → clock loses time.
            </li>
            <li className="leading-relaxed">
              <strong className="text-emerald-400">Anomalous Expansion:</strong>
              <br />
              Water reaches its highest density and minimum volume at exactly 4°C.
            </li>
          </ul>
        </div>

        {/* Don't Memorize Box */}
        <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-400" /> What You Should NOT Memorize
          </h4>
          <ul className="space-y-3.5 text-[13px] text-white/80">
            <li className="leading-relaxed">
              <strong className="text-amber-400">Exact emissivity values:</strong>
              <br />
              Just remember that a perfect blackbody has e = 1, and shiny/polished surfaces have e close to 0. The formula handles the rest.
            </li>
            <li className="leading-relaxed">
              <strong className="text-amber-400">Full derivation of Wien&apos;s law:</strong>
              <br />
              Only memorize the result: &lambda;<sub>max</sub> &middot; T = 2.898 &times; 10<sup>&minus;3</sup> m&middot;K. Apply it directly.
            </li>
            <li className="leading-relaxed">
              <strong className="text-amber-400">Individual α, β, γ values for every material:</strong>
              <br />
              IAT provides them. Just know α : β : γ = 1 : 2 : 3 and how to convert.
            </li>
          </ul>
        </div>
      </div>

      {/* Memory Boxes Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <div className="p-4 bg-orange-500/[0.03] border border-orange-500/20 rounded-2xl space-y-2">
 <span className="text-[12px] font-bold text-orange-400 uppercase tracking-wider block">🔥 CONCEPT BLOCK</span>
          <p className="text-[12.5px] leading-relaxed text-white/80">
            <strong>Water Anomaly:</strong> Minimum volume &amp; max density occur at exactly 4°C. Lakes freeze from top-down because dense 4°C water sits at the bottom.
          </p>
        </div>
        <div className="p-4 bg-orange-500/[0.03] border border-orange-500/20 rounded-2xl space-y-2">
 <span className="text-[12px] font-bold text-orange-400 uppercase tracking-wider block">🔥 EMISSION RULE</span>
          <p className="text-[12.5px] leading-relaxed text-white/80">
            <strong>Kirchhoff's Law:</strong> Good absorbers are good emitters. Perfect blackbodies have e = a = 1. Polished silver is a poor absorber and emitter.
          </p>
        </div>
        <div className="p-4 bg-orange-500/[0.03] border border-orange-500/20 rounded-2xl space-y-2">
 <span className="text-[12px] font-bold text-orange-400 uppercase tracking-wider block">🔥 TEMP SCALE TRICK</span>
          <p className="text-[12.5px] leading-relaxed text-white/80">
            <strong>Interval Equality:</strong> Temperature intervals are equal in magnitude: <strong>&Delta;T = 1°C is exactly equal to &Delta;T = 1 K</strong>. Only absolute scales matter for ratios.
          </p>
        </div>
      </div>

      {/* Trap Cards Section */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <SectionHeader icon={<AlertTriangle className="w-5 h-5" />} label="🚨 Critical IAT Trap Cards" color="rose" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-2.5">
 <h5 className="text-[13.5px] font-bold text-rose-400 uppercase tracking-wider">Trap 1: The Kelvin Radiation Error</h5>
            <p className="text-[13px] leading-relaxed text-white/70">
              Substituting Celsius directly into Stefan's law: P = e&sigma;AT⁴ (e.g. using 50⁴ instead of 323⁴).
            </p>
 <div className="text-[12px] text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
              ✔️ Safe Path: Always add 273.15 to convert temperatures to Kelvin before raising to the 4th power.
            </div>
          </div>
          <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-2.5">
 <h5 className="text-[13.5px] font-bold text-rose-400 uppercase tracking-wider">Trap 2: The Hole Contraction Illusion</h5>
            <p className="text-[13px] leading-relaxed text-white/70">
              Assuming that heating a metal plate with a cavity causes the hole to contract due to inward metal expansion.
            </p>
 <div className="text-[12px] text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
              ✔️ Safe Path: The cavity expands exactly as if it were a solid metal piece. Photographic zoom analogy applies.
            </div>
          </div>
          <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-2.5">
 <h5 className="text-[13.5px] font-bold text-rose-400 uppercase tracking-wider">Trap 3: Calorimetry False Melting</h5>
            <p className="text-[13px] leading-relaxed text-white/70">
              Assuming that mixing ice and water always results in complete ice melting, calculating the final temperature blindly.
            </p>
 <div className="text-[12px] text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
              ✔️ Safe Path: Compare max heat water can release (cooling to 0°C) with heat needed to melt all ice. If Q_released &lt; Q_melt, temp locks at 0°C.
            </div>
          </div>
          <div className="p-5 bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl space-y-2.5">
 <h5 className="text-[13.5px] font-bold text-rose-400 uppercase tracking-wider">Trap 4: Forgetting the Calorimeter equivalent</h5>
            <p className="text-[13px] leading-relaxed text-white/70">
              Calculating thermal equilibrium in a calorimetry problem but ignoring the mass/heat capacity of the container.
            </p>
 <div className="text-[12px] text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
              ✔️ Safe Path: Calculate water equivalent W = m_c * s_c / s_w and add it to the mass of the water (m_w + W).
            </div>
          </div>
        </div>
      </div>

      {/* Question Recognition Patterns */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <SectionHeader icon={<Target className="w-5 h-5" />} label="Question Recognition Patterns" color="cyan" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0A0C18] border border-white/5 rounded-2xl space-y-2.5">
 <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">1. &quot;Steam mixed with ice-water&quot;</span>
            <p className="text-[13px] text-white/70 leading-relaxed font-sans">
              Matches mixed-phase calorimetry. Set up a phase-by-phase balance sheet: first check if steam condensation releases enough heat to melt ice; then check the final thermal equilibrium.
            </p>
          </div>
          <div className="p-4 bg-[#0A0C18] border border-white/5 rounded-2xl space-y-2.5">
 <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">2. &quot;Equivalent thermal conductivity of rods&quot;</span>
            <p className="text-[13px] text-white/70 leading-relaxed font-sans">
              Matches composite rod conduction. Map to Ohm's Law thermal resistance cards. Use R<sub>eq</sub> = R<sub>1</sub> + R<sub>2</sub> for series, and 1/R<sub>eq</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub> for parallel.
            </p>
          </div>
          <div className="p-4 bg-[#0A0C18] border border-white/5 rounded-2xl space-y-2.5">
 <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">3. &quot;Power radiated by blackbody shifts&quot;</span>
            <p className="text-[13px] text-white/70 leading-relaxed font-sans">
              Matches Stefan-Boltzmann radiation scaling. Identify the temperature scale ratio in Kelvin, and scale the radiated power by the 4th power of that ratio (<i>P</i> &prop; <i>T</i><sup>4</sup>).
            </p>
          </div>
          <div className="p-4 bg-[#0A0C18] border border-white/5 rounded-2xl space-y-2.5">
 <span className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider block">4. &quot;Pendulum clock losing time&quot;</span>
            <p className="text-[13px] text-white/70 leading-relaxed font-sans">
              Matches clock error. Use the fractional change in time period &Delta;<i>t</i> = &frac12; &alpha; &Delta;<i>T</i> <i>t</i> where t is the total duration (86,400s per day).
            </p>
          </div>
        </div>
      </div>

      {/* IAT Exam Focus Section */}
      <div className="p-5 bg-gradient-to-r from-violet-950/20 to-cyan-950/20 border border-violet-500/15 rounded-2xl space-y-4 pt-6">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400" /> IAT Exam Focus High-Yield Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px] text-white/80 font-sans leading-relaxed">
          <div className="space-y-1.5">
            <strong className="text-amber-300 block">&bull; Calorimetry Phase-Change Locks:</strong>
            <p className="text-white/60">
              IAT rarely gives simple mixing. Expect partial melting where the final temperature is locked at 0°C. Always calculate threshold energies (heat release capacity vs heat needed for phase change) first.
            </p>
          </div>
          <div className="space-y-1.5">
            <strong className="text-amber-300 block">&bull; Stefan-Boltzmann Scaling &amp; Wavelengths:</strong>
            <p className="text-white/60">
              Combine Stefan's Law (P &prop; T<sup>4</sup>) and Wien's Law (&lambda;<sub>max</sub> &prop; 1/T) in the same problem. A star temperature doubling reduces peak wavelength to 0.5× and scales total radiation by 16×.
            </p>
          </div>
          <div className="space-y-1.5">
            <strong className="text-amber-300 block">&bull; Bimetallic Strip Bending direction:</strong>
            <p className="text-white/60">
              On heating, the bimetallic strip bends with the higher-expansion metal on the outer, longer radius. On cooling, the higher-expansion metal contracts more, ending up on the inner, shorter radius.
            </p>
          </div>
          <div className="space-y-1.5">
            <strong className="text-amber-300 block">&bull; Thermal stress length independence:</strong>
            <p className="text-white/60">
              Understand that thermal stress in a clamped rod (<i>Y</i> &alpha; &Delta;<i>T</i>) depends only on temperature change and material constants, not on the rod's length.
            </p>
          </div>
        </div>
      </div>

      {/* 1-Minute Revision Checklist */}
      <div className="bg-[#0A0C18] border border-white/5 rounded-2xl p-5 space-y-4">
 <h4 className="text-white font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <CheckCircle className="w-4.5 h-4.5 text-cyan-400" /> 1-Minute Last-Check Revision List
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 text-[13px] text-white/70 pl-2">
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Scale conversion formula: C/5 = (F-32)/9 = (K-273)/5</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Mayer's Molar Heat Capacity relation: C<sub>p</sub> - C<sub>v</sub> = R</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Solid thermal expansion coefficient ratios: &alpha; : &beta; : &gamma; = 1 : 2 : 3</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Water reaches minimum volume and highest density at exactly 4°C</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Pendulum clock error daily formula: &Delta;t = 0.5 &middot; &alpha; &middot; &Delta;T &middot; t</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Thermal resistance of a rod: R<sub>th</sub> = L / (K &middot; A)</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Equivalent conductivity of series rods: harmonic mean of K</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Stefan's Radiation law: power scales with absolute temperature T⁴</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Wien's law displacement relation: &lambda;<sub>max</sub> &middot; T = Constant</span>
          </li>
          <li className="flex items-center gap-2.5">
            <input type="checkbox" readOnly checked className="accent-cyan-400 w-3.5 h-3.5" />
            <span>Newton's Law of Cooling cooling rate: d&theta;/dt = &minus;K(&theta; &minus; &theta;<sub>s</sub>)</span>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default ThermalPropertiesLessonDetail;

