import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  ArrowRight, BookOpen, Zap, Eye, TrendingUp, Activity, Brain, Award,
  Copy, Check, RefreshCw
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
      <span className={colors[color] ?? 'text-violet-400'}>{icon}</span>
 <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-widest">{label}</h2>
    </div>
  );
}

function ModuleHeader({ number, title, difficulty, color = 'violet' }: { number: number; title: string; difficulty: number; color?: string }) {
  const badgeColors: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
      <div className="flex items-center gap-2.5">
 <span className={cn('text-xs font-bold px-2 py-0.5 rounded border uppercase', badgeColors[color])}>
          Module {number}
        </span>
        <h3 className="text-white font-display font-bold text-[17px]">{title}</h3>
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
  formula, use_when, freq_stars, difficulty_stars, color = 'violet', copy_text
}: {
  formula: string;
  use_when: string;
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
    <div className={cn('rounded-xl border p-4.5 space-y-3.5 transition-all duration-200', bgColors[color], borderColors[color])}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className={cn('font-mono font-bold text-[17px] sm:text-lg tracking-wide', formulaColors[color])}>
            <span dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
          <div className="text-white/80 text-[13px] font-semibold leading-relaxed"><span dangerouslySetInnerHTML={{ __html: use_when }} /></div>
        </div>
        <button
          onClick={() => { navigator.clipboard.writeText(copy_text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-3">
        <FrequencyBadge stars={freq_stars} />
 <div className="flex items-center gap-1.5 text-[12px] uppercase tracking-wider text-white/40">
          <span>Difficulty:</span>
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

function MemoryBox({ title = 'Visual Memory Trick', children, type = 'default' }: { title?: string; children: React.ReactNode; type?: 'default' | 'alert' }) {
  return (
    <div className={cn(
      'rounded-2xl border p-4.5 flex gap-3.5 leading-relaxed',
      type === 'alert'
        ? 'border-rose-500/25 bg-rose-500/[0.03] text-rose-200'
        : 'border-amber-500/20 bg-amber-500/[0.03] text-amber-200'
    )}>
      <div className="text-2xl shrink-0">💡</div>
      <div className="space-y-1 text-[14.5px]">
        <div className="font-bold uppercase text-[13px] tracking-wider opacity-90">{title}</div>
        <div className="opacity-80 text-[13px] sm:text-sm">{children}</div>
      </div>
    </div>
  );
}

function SolvedExample({ title, problem, steps, insight, color = 'violet' }: { title: string; problem: string; steps: string[]; insight: string; color?: string }) {
  const borderColors: Record<string, string> = {
    violet: 'border-violet-500/20 bg-violet-500/5',
    cyan: 'border-cyan-500/20 bg-cyan-500/5',
    amber: 'border-amber-500/20 bg-amber-500/5',
    emerald: 'border-emerald-500/20 bg-emerald-500/5',
    rose: 'border-rose-500/20 bg-rose-500/5',
  };
  return (
    <div className={cn('rounded-2xl border p-5 space-y-4 bg-[#0A0C18]', borderColors[color])}>
      <div className="border-b border-white/5 pb-2.5">
        <h4 className="text-white font-bold text-[14.5px] text-left">{title}</h4>
      </div>
 <p className="text-white/70 text-[13px] sm:text-sm bg-black/20 rounded-lg px-3 py-2 leading-relaxed">{problem}</p>
      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
 <span className="text-[12px] font-bold text-white/30 bg-white/5 rounded px-1.5 py-0.5 shrink-0 mt-0.5">Step {i + 1}</span>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step }} />
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2.5 flex gap-2">
        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-amber-200 text-[13px] leading-relaxed">{insight}</p>
      </div>
    </div>
  );
}

function RecognitionCard({ trigger, thought, action, color = 'violet' }: { trigger: string; thought: string; action: string; color?: string }) {
  const borderColors: Record<string, string> = {
    violet: 'border-violet-500/25',
    cyan: 'border-cyan-500/25',
    amber: 'border-amber-500/25',
  };
  const badgeColors: Record<string, string> = {
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  };
  return (
    <div className={cn('rounded-2xl border bg-white/[0.02] p-4 space-y-3', borderColors[color])}>
      <div className="flex items-center gap-2">
        <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border', badgeColors[color])}>If question says...</span>
      </div>
      <div className="font-mono text-white font-semibold text-[14.5px] bg-white/5 rounded-lg px-3 py-2" dangerouslySetInnerHTML={{ __html: `&ldquo;${trigger}&rdquo;` }} />
      <div className="flex items-center gap-2 text-white/40 text-[13px]">
        <ArrowRight className="w-3 h-3" />
        <span>Immediately think</span>
      </div>
      <div className="font-mono text-emerald-300 font-bold text-[14.5px]" dangerouslySetInnerHTML={{ __html: thought }} />
      <div className="text-white/65 text-[13px] border-t border-white/5 pt-2" dangerouslySetInnerHTML={{ __html: action }} />
    </div>
  );
}

// ─── SVG Diagram Components ───────────────────────────────────────────────────

function FxWorkGraphDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Force-displacement work graph">
      {/* Grid Lines */}
      <line x1="30" y1="100" x2="220" y2="100" stroke="#ffffff15" strokeWidth="1" />
      <line x1="30" y1="20" x2="30" y2="120" stroke="#ffffff15" strokeWidth="1" />
      
      {/* Axes */}
      <line x1="30" y1="110" x2="220" y2="110" stroke="#ffffff40" strokeWidth="1.5" />
      <line x1="30" y1="10" x2="30" y2="110" stroke="#ffffff40" strokeWidth="1.5" />
      <text x="225" y="114" fill="#ffffff60" fontSize="9" fontFamily="monospace">x</text>
      <text x="22" y="15" fill="#ffffff60" fontSize="9" fontFamily="monospace">F</text>
      
      {/* Shaded Area under Curve */}
      <path d="M 60 110 L 60 70 Q 110 30 160 50 L 160 110 Z" fill="#38bdf810" />
      
      {/* Curve */}
      <path d="M 40 90 Q 60 70 110 30 T 200 60" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
      
      {/* Shading / Limits */}
      <line x1="60" y1="70" x2="60" y2="110" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="160" y1="50" x2="160" y2="110" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
      
      <text x="56" y="122" fill="#38bdf8" fontSize="8" fontFamily="monospace">x₁</text>
      <text x="156" y="122" fill="#38bdf8" fontSize="8" fontFamily="monospace">x₂</text>
      
      {/* Label */}
      <rect x="80" y="65" width="80" height="22" rx="4" fill="#0A0C18" stroke="#38bdf830" strokeWidth="1" />
      <text x="86" y="79" fill="#38bdf8" fontSize="8" fontFamily="monospace">Area = ∫ F dx = W</text>
    </svg>
  );
}

function SpringEnergyParabolaDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Spring potential energy parabola graph">
      {/* Axes */}
      <line x1="20" y1="110" x2="220" y2="110" stroke="#ffffff40" strokeWidth="1.5" />
      <line x1="120" y1="15" x2="120" y2="120" stroke="#ffffff20" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="120" y1="10" x2="120" y2="110" stroke="#ffffff40" strokeWidth="1.5" />
      <text x="225" y="114" fill="#ffffff60" fontSize="9" fontFamily="monospace">x</text>
      <text x="112" y="15" fill="#ffffff60" fontSize="9" fontFamily="monospace">U</text>
      
      {/* Parabola: U = 1/2 k x^2 */}
      {/* Center is (120, 110) */}
      <path d="M 40 30 Q 120 110 200 30" fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      
      {/* Helper labels */}
      <circle cx="120" cy="110" r="3" fill="#a78bfa" />
      <text x="125" y="119" fill="#ffffff40" fontSize="8" fontFamily="monospace">0</text>
      
      {/* Compression and Extension */}
      <line x1="60" y1="50" x2="60" y2="110" stroke="#ffffff20" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="180" y1="50" x2="180" y2="110" stroke="#ffffff20" strokeWidth="1" strokeDasharray="2 2" />
      
      <text x="42" y="122" fill="#a78bfa" fontSize="8" fontFamily="monospace">-x<sub>max</sub></text>
      <text x="165" y="122" fill="#a78bfa" fontSize="8" fontFamily="monospace">+x<sub>max</sub></text>
      
      {/* Curve Formula Label */}
      <text x="80" y="25" fill="#a78bfa" fontSize="9" fontFamily="monospace" fontWeight="bold">U = (1/2)kx²</text>
    </svg>
  );
}

function ObliqueCollisionVectorDiagram() {
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-xs mx-auto" aria-label="Oblique 2D collision vector diagram">
      {/* Initial state (ghosted sphere A and target B) */}
      <circle cx="40" cy="70" r="10" fill="none" stroke="#ffffff20" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="35" y="73" fill="#ffffff20" fontSize="8" fontFamily="monospace">A</text>
      <line x1="50" y1="70" x2="90" y2="70" stroke="#ffffff30" strokeWidth="1.5" />
      <polygon points="90,70 84,66 84,74" fill="#ffffff30" />
      <text x="60" y="62" fill="#ffffff30" fontSize="8" fontFamily="monospace">u₁</text>
      
      {/* Collision Point */}
      <circle cx="100" cy="70" r="10" fill="#0A0C18" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="96" y="73" fill="#38bdf8" fontSize="8" fontFamily="monospace">B</text>
      
      {/* Separation vectors */}
      <line x1="100" y1="70" x2="152" y2="40" stroke="#f43f5e" strokeWidth="2.5" />
      <polygon points="152,40 144,41 148,48" fill="#f43f5e" />
      <text x="156" y="40" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">v₁ (30°)</text>
      
      <line x1="100" y1="70" x2="125" y2="113" stroke="#34d399" strokeWidth="2.5" />
      <polygon points="125,113 118,109 125,105" fill="#34d399" />
      <text x="130" y="116" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold">v₂ (-60°)</text>
      
      {/* Right angle arc / indicator */}
      <path d="M 126 55 A 30 30 0 0 1 113 92" fill="none" stroke="#ffffff40" strokeWidth="1" strokeDasharray="2 2" />
      <text x="122" y="78" fill="#ffffff60" fontSize="9" fontFamily="monospace">90°</text>
      <text x="10" y="20" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">v₁ ⊥ v₂ (Oblique elastic)</text>
    </svg>
  );
}

function EnergyFlowDiagram() {
  return (
    <svg viewBox="0 0 280 160" className="w-full max-w-xs mx-auto" aria-label="Energy conversion flow diagram">
      {/* Box PE */}
      <rect x="15" y="40" width="70" height="35" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" rx="4" />
      <text x="25" y="62" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">Potential E</text>
      <text x="35" y="88" fill="#ffffff50" fontSize="8" fontFamily="monospace">Config / Height</text>
      
      {/* Arrow 1 */}
      <line x1="90" y1="57.5" x2="115" y2="57.5" stroke="#ffffff30" strokeWidth="2" />
      <polygon points="115,57.5 109,53.5 109,61.5" fill="#ffffff30" />
      
      {/* Box KE */}
      <rect x="120" y="40" width="70" height="35" fill="#0A0C18" stroke="#a78bfa" strokeWidth="2" rx="4" />
      <text x="131" y="62" fill="#a78bfa" fontSize="10" fontFamily="monospace" fontWeight="bold">Kinetic E</text>
      <text x="136" y="88" fill="#ffffff50" fontSize="8" fontFamily="monospace">(1/2)mv² / Motion</text>
      
      {/* Arrow 2 */}
      <line x1="195" y1="57.5" x2="220" y2="57.5" stroke="#ffffff30" strokeWidth="2" />
      <polygon points="220,57.5 214,53.5 214,61.5" fill="#ffffff30" />
      
      {/* Box Thermal/Sound */}
      <rect x="225" y="25" width="50" height="30" fill="#0A0C18" stroke="#f43f5e" strokeWidth="1.5" rx="3" />
      <text x="233" y="44" fill="#f43f5e" fontSize="9" fontFamily="monospace">Thermal E</text>
      
      <rect x="225" y="65" width="50" height="30" fill="#0A0C18" stroke="#f59e0b" strokeWidth="1.5" rx="3" />
      <text x="236" y="84" fill="#f59e0b" fontSize="9" fontFamily="monospace">Sound E</text>
      
      {/* Dissipated arrow indicator */}
      <path d="M 155 75 Q 155 125 215 125" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
      <polygon points="215,125 209,121 209,129" fill="#f43f5e" />
      <text x="140" y="140" fill="#f43f5e" fontSize="9" fontFamily="monospace">Dissipation (Friction)</text>
    </svg>
  );
}

function SpringSystemDiagram() {
  return (
    <svg viewBox="0 0 240 120" className="w-full max-w-xs mx-auto" aria-label="Spring mass system diagram">
      {/* Wall */}
      <line x1="20" y1="20" x2="20" y2="90" stroke="#ffffff40" strokeWidth="4" />
      <line x1="20" y1="25" x2="10" y2="35" stroke="#ffffff20" strokeWidth="1.5" />
      <line x1="20" y1="45" x2="10" y2="55" stroke="#ffffff20" strokeWidth="1.5" />
      <line x1="20" y1="65" x2="10" y2="75" stroke="#ffffff20" strokeWidth="1.5" />
      <line x1="20" y1="85" x2="10" y2="95" stroke="#ffffff20" strokeWidth="1.5" />
      
      {/* Floor */}
      <line x1="20" y1="90" x2="220" y2="90" stroke="#ffffff40" strokeWidth="2" />
      
      {/* Spring */}
      <path d="M 20 60 L 40 60 L 45 45 L 55 75 L 65 45 L 75 75 L 85 45 L 95 75 L 105 45 L 115 75 L 125 45 L 135 75 L 140 60 L 160 60"
        fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinejoin="miter" />
      
      {/* Block */}
      <rect x="160" y="40" width="40" height="50" fill="#0A0C18" stroke="#a78bfa" strokeWidth="2.5" rx="3" />
      <text x="175" y="70" fill="#a78bfa" fontSize="12" fontFamily="monospace" fontWeight="bold">m</text>
      
      {/* Displacement helper arrow */}
      <line x1="160" y1="102" x2="190" y2="102" stroke="#22d3ee" strokeWidth="1.5" />
      <polygon points="190,102 184,98 184,106" fill="#22d3ee" />
      <text x="165" y="114" fill="#22d3ee" fontSize="9" fontFamily="monospace">x (elongation)</text>
      <text x="60" y="30" fill="#38bdf8" fontSize="9" fontFamily="monospace">Spring Constant k</text>
    </svg>
  );
}

function StabilityCurvesDiagram() {
  return (
    <svg viewBox="0 0 280 120" className="w-full max-w-xs mx-auto" aria-label="Stability potential energy curves diagram">
      {/* Stable minima */}
      <path d="M 15 50 Q 50 110 85 50" fill="none" stroke="#34d399" strokeWidth="2" />
      <circle cx="50" cy="80" r="5" fill="#34d399" />
      <text x="32" y="35" fill="#34d399" fontSize="9" fontFamily="monospace">Stable (∪)</text>
      <text x="35" y="112" fill="#34d399" fontSize="8" fontFamily="monospace">d²U/dx² &gt; 0</text>
      
      {/* Unstable maxima */}
      <path d="M 105 80 Q 140 20 175 80" fill="none" stroke="#f43f5e" strokeWidth="2" />
      <circle cx="140" cy="50" r="5" fill="#f43f5e" />
      <text x="118" y="15" fill="#f43f5e" fontSize="9" fontFamily="monospace">Unstable (∩)</text>
      <text x="122" y="112" fill="#f43f5e" fontSize="8" fontFamily="monospace">d²U/dx² &lt; 0</text>
      
      {/* Neutral flat */}
      <line x1="195" y1="65" x2="265" y2="65" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="230" cy="60" r="5" fill="#38bdf8" />
      <text x="208" y="35" fill="#38bdf8" fontSize="9" fontFamily="monospace">Neutral (─)</text>
      <text x="212" y="112" fill="#38bdf8" fontSize="8" fontFamily="monospace">d²U/dx² = 0</text>
    </svg>
  );
}

function CollisionDiagram() {
  return (
    <svg viewBox="0 0 280 120" className="w-full max-w-xs mx-auto" aria-label="1D Collision before and after diagram">
      {/* Before Collision */}
      <text x="20" y="25" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">BEFORE COLLISION</text>
      <circle cx="50" cy="55" r="14" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" />
      <text x="45" y="59" fill="#38bdf8" fontSize="10" fontFamily="monospace">m₁</text>
      <line x1="68" y1="55" x2="95" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
      <polygon points="95,55 89,51 89,59" fill="#38bdf8" />
      <text x="75" y="47" fill="#38bdf8" fontSize="9" fontFamily="monospace">u₁</text>
      
      <circle cx="140" cy="55" r="14" fill="#0A0C18" stroke="#38bdf8" strokeWidth="2" />
      <text x="135" y="59" fill="#38bdf8" fontSize="10" fontFamily="monospace">m₂</text>
      <line x1="158" y1="55" x2="175" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
      <polygon points="175,55 169,51 169,59" fill="#38bdf8" />
      <text x="160" y="47" fill="#38bdf8" fontSize="9" fontFamily="monospace">u₂</text>
      
      {/* Divider */}
      <line x1="15" y1="80" x2="265" y2="80" stroke="#ffffff10" strokeWidth="1" />
      
      {/* After Collision */}
      <text x="20" y="98" fill="#a78bfa" fontSize="9" fontFamily="monospace" fontWeight="bold">AFTER COLLISION</text>
      <circle cx="70" cy="115" r="14" fill="#0A0C18" stroke="#a78bfa" strokeWidth="2" />
      <text x="65" y="119" fill="#a78bfa" fontSize="10" fontFamily="monospace">m₁</text>
      <line x1="88" y1="115" x2="110" y2="115" stroke="#a78bfa" strokeWidth="1.5" />
      <polygon points="110,115 104,111 104,119" fill="#a78bfa" />
      <text x="92" y="107" fill="#a78bfa" fontSize="9" fontFamily="monospace">v₁</text>
      
      <circle cx="180" cy="115" r="14" fill="#0A0C18" stroke="#a78bfa" strokeWidth="2" />
      <text x="175" y="119" fill="#a78bfa" fontSize="10" fontFamily="monospace">m₂</text>
      <line x1="198" y1="115" x2="235" y2="115" stroke="#a78bfa" strokeWidth="1.5" />
      <polygon points="235,115 229,111 229,119" fill="#a78bfa" />
      <text x="210" y="107" fill="#a78bfa" fontSize="9" fontFamily="monospace">v₂</text>
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function WorkEnergyLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const toggleCheck = (i: number) => setChecklist(p => ({ ...p, [i]: !p[i] }));

  const revisionItems = [
    'Work-Energy Theorem (WET): W<sub>net</sub> = &Delta;K for ALL forces',
    'WET frame dependency & System of Particles WET (W<sub>ext</sub> + W<sub>int</sub> = &Delta;K)',
    'F-x Force-Displacement graph area work interpretation',
    'Conservative forces vs. Non-conservative forces summary',
    'Potential Energy Reference Points (Spring natural length vs. Gravity infinity)',
    'Spring Potential Energy parabola & stability minima/maxima curves',
    '3D Force vector calculation from Potential gradient F = &minus;&nabla;U',
    'Constant power kinetics velocity (t^1/2) and displacement (t^3/2) scaling',
    '1D elastic, inelastic, and perfectly inelastic collisions',
    'Identical Mass Elastic Oblique Collision Perpendicularity Theorem',
    'Center of Mass Frame collision velocity inversion shortcut',
    'Vertical circular motion bounds and velocity cutoffs',
    'Bouncing ball series and hanging chain shortcuts',
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12 pb-32">

      {/* Breadcrumbs Navigation */}
      <div className="flex items-center gap-2 text-[13px] text-white/30">
        <button onClick={() => onNavigate?.('smart_lessons')} className="hover:text-white/60 transition-colors">Smart Lessons</button>
        <span>/</span>
        <span className="text-violet-400">Physics</span>
        <span>/</span>
        <span className="text-white/50 font-medium">Unit 5</span>
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
                  PHYSICS UNIT 5
                </span>
 <span className="px-3 py-1 rounded-full bg-[#3B1219] border border-rose-500/30 text-rose-400 text-[12px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> HIGH WEIGHTAGE
                </span>
              </div>
            </div>
            
            <div className="text-right shrink-0">
 <div className="text-[12px] uppercase tracking-widest text-white/40">READING PROGRESS</div>
              <div className="text-cyan-400 font-bold text-[19px] font-mono">{progress}%</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold text-white tracking-tight leading-tight">
              Work, Energy and Power
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
 <div className="text-[12px] font-bold uppercase tracking-widest text-cyan-400/80">
              CORE NCERT FOUNDATION FOR IISER IAT EXAM
            </div>
          </div>

          {/* Prerequisites box */}
          <div className="bg-white/5 border border-white/5 rounded-xl p-4.5 space-y-2">
 <div className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider">Before You Start</div>
            <p className="text-white/60 text-[13px] leading-relaxed">
              You should already be comfortable with:
            </p>
 <div className="flex flex-wrap gap-4 text-[13px] text-white/80">
              <span className="flex items-center gap-1">✓ Newton's Laws (F = ma)</span>
              <span className="flex items-center gap-1">✓ Basic Differentiation & Integration</span>
              <span className="flex items-center gap-1">✓ Vectors & Resolving Components</span>
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
                <span>2-3 questions every year</span>
              </div>
            </div>
          </div>

          {/* Premium Progress Track */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="h-3 bg-white/5 rounded-full relative overflow-visible border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 relative shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                style={{ width: `${progress}%` }}
              >
                {progress > 0 && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_10px_#06b6d4] animate-pulse pointer-events-none" />
                )}
              </div>
            </div>
 <div className="flex justify-between items-center text-[12px] mt-1">
              <span className="text-white/40">Status: {isCompleted ? 'Completed' : progress >= 90 ? 'Ready to Quiz' : 'Reading Content'}</span>
              <span className={cn("font-bold transition-all", isCompleted ? "text-emerald-400" : "text-cyan-400")}>
                {isCompleted ? '✅ Lesson Completed! • Quiz Passed!' : progress >= 90 ? 'Reading Completed (100%) • Quiz Unlocked!' : `Scroll to unlock quiz (${90 - progress}% more)`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn box */}
      <div className="bg-[#0B0D19] border border-white/5 rounded-2xl p-5 space-y-4">
 <h3 className="text-white font-display font-bold text-[14.5px] uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" /> WHAT YOU&apos;LL LEARN
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-white/65">
          {[
            'Work-Energy Theorem (WET): W<sub>net</sub> = &Delta;K for ALL forces',
            'WET frame dependency (displacement varies with observer)',
            'Conservative forces (path independent) vs. Non-conservative (dissipative)',
            'Stable (∪, d²U/dx² > 0) vs. Unstable (∩, d²U/dx² < 0) vs. Neutral stability',
            '3D Force vector calculation from Potential gradient F = -∇U',
            'Constant power kinetics velocity (t^1/2) and displacement (t^3/2) scaling',
            '1D elastic, inelastic, and perfectly inelastic collisions',
            'Oblique collision lines of impact and coefficient of restitution e',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-white/80">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>

      {/* ── MODULE 1: Work & Energy ─────────────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={1} title="Work & Kinetic Energy" difficulty={3} color="violet" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">The Master Equation: Work-Energy Theorem</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            The Work-Energy Theorem states that the total work done by <strong className="text-white">all forces</strong> (conservative, non-conservative, internal, and external) acting on a body is exactly equal to its change in kinetic energy:
          </p>
 <div className="bg-white/5 rounded-lg p-3 text-[12px] text-cyan-300 text-center">
            W<sub>net</sub> = W<sub>conservative</sub> + W<sub>nonconservative</sub> + W<sub>internal</sub> + W<sub>external</sub> = &Delta;K
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EnergyFlowDiagram />
            <FxWorkGraphDiagram />
            <div className="space-y-3 justify-center flex flex-col">
              <div className="text-[13px] font-bold text-violet-400 uppercase tracking-wider">Work Done Formulations</div>
 <ul className="list-disc list-inside text-white/70 text-[13px] space-y-1.5 leading-relaxed">
                <li>Constant Force: W = F &middot; s = Fs&middot;cos&theta;</li>
                <li>Variable Force: W = &int; F &middot; dx</li>
                <li>Work = Area under F-x Graph</li>
                <li>K &amp; Momentum Link: K = p² / 2m</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Calculus Derivation of WET (Variable Force)</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            NCERT derives the Work-Energy Theorem using calculus to link variable force and kinetic energy:
          </p>
 <div className="bg-white/5 rounded-xl p-4.5 space-y-3 text-[12px] leading-relaxed text-cyan-300">
            <div>1. Define Kinetic Energy: K = (1/2)mv²</div>
            <div>2. Differentiate K w.r.t time t:</div>
            <div className="pl-4">dK/dt = d/dt [ (1/2)mv² ] = m * v * (dv/dt)</div>
            <div>3. Use Newton's 2nd Law (F = m·dv/dt):</div>
            <div className="pl-4">dK/dt = v * F = (dx/dt) * F</div>
            <div>4. Cancel dt and integrate:</div>
            <div className="pl-4">dK = F * dx ⟹ &int;<sub>K<sub>i</sub></sub><sup>K<sub>f</sub></sup> dK = &int;<sub>x<sub>i</sub></sub><sup>x<sub>f</sub></sup> F &middot; dx</div>
            <div className="pl-4">⟹ K<sub>f</sub> - K<sub>i</sub> = W<sub>net</sub> ⟹ &Delta;K = W<sub>net</sub></div>
          </div>
          <p className="text-white/50 text-[12px] leading-relaxed">
            <strong>Key Step:</strong> The transition from velocity change rate to position change rate (<code className="font-mono text-white">v = dx/dt</code>) is what allows us to integrate over distance to obtain work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MemoryBox title="Frame Dependency Alert" type="alert">
            Since displacement depends on the observer's frame, work done and kinetic energy are frame-dependent. However, the Work-Energy Theorem holds true in all inertial frames.
          </MemoryBox>
          <MemoryBox title="Internal Forces Warning">
            Do not assume internal forces do no work. In explosions, internal chemical forces do positive work to increase the system's kinetic energy.
          </MemoryBox>
        </div>

        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">Module 1 Formula Cards</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FormulaCard
              formula="W = &int; F &middot; dx"
              use_when="Variable Force: Find work from position-dependent force"
              freq_stars={5}
              difficulty_stars={2}
              color="cyan"
              copy_text="W = integral(F, x)"
            />
            <FormulaCard
              formula="W = &minus;mg&Delta;h"
              use_when="Work done by Gravity: Path-independent conservative work"
              freq_stars={5}
              difficulty_stars={1}
              color="emerald"
              copy_text="W_g = -m*g*dh"
            />
            <FormulaCard
              formula="K = p² / 2m"
              use_when="Momentum changes: link momentum to kinetic energy"
              freq_stars={5}
              difficulty_stars={1}
              color="violet"
              copy_text="K = p^2 / (2*m)"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 space-y-3">
          <h4 className="text-rose-300 font-bold text-[14.5px]">Friction Work Example (Dissipation)</h4>
          <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
            When a block of mass m slides a distance d on a rough horizontal surface with kinetic friction coefficient &mu;<sub>k</sub>:
          </p>
 <div className="bg-black/20 rounded-lg px-3 py-2 text-[12px] text-rose-300">
            W<sub>friction</sub> = &minus;f<sub>k</sub> &middot; d = &minus;&mu;<sub>k</sub> &middot; N &middot; d = &minus;&mu;<sub>k</sub> &middot; m &middot; g &middot; d
          </div>
          <p className="text-white/65 text-[13px] leading-relaxed">
            This work is negative because kinetic friction always opposes relative sliding. By WET, this negative work decreases the block's kinetic energy: <code className="font-mono text-white text-[12px] bg-white/5 px-1 rounded">&Delta;K = &minus;&mu;<sub>k</sub>&middot;mg&middot;d</code>.
          </p>
        </div>

        <SolvedExample
          title="Work done by Variable Force"
          problem="A force F = (3x² + 2x) N acts on a particle of mass 2 kg. Find the work done by this force to move the particle from x = 1 m to x = 3 m."
          steps={[
            'Since force depends on position x, use the variable work formula: W = &int; F dx.',
            'Set up the integral with limits: W = &int;<sub>1</sub><sup>3</sup> (3x&sup2; + 2x) dx.',
            'Find the antiderivative: &int; (3x&sup2; + 2x) dx = [x&sup3; + x&sup2;].',
            'Evaluate the limits: W = (3&sup3; + 3&sup2;) &minus; (1&sup3; + 1&sup2;) = (27 + 9) &minus; (1 + 1) = 36 &minus; 2 = 34 Joules.'
          ]}
          insight="The work done equals the area under the F-x curve from x = 1 to 3."
          color="violet"
        />
      </div>

      {/* ── MODULE 2: Potential Energy & Stability ────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={2} title="Potential Energy & Springs" difficulty={4} color="cyan" />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Conservative vs. Non-Conservative Forces</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            NCERT distinguishes forces based on path-dependence of work:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] sm:text-sm">
            <div className="bg-emerald-500/[0.03] border border-emerald-500/10 p-4 rounded-xl space-y-2">
 <div className="text-emerald-300 font-bold">Conservative Forces</div>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Work done is independent of the path.</li>
                <li>Work in a closed loop is zero: <code className="font-mono text-white">∮ F * dr = 0</code>.</li>
                <li>Can define Potential Energy (U) for them.</li>
                <li>Examples: Gravity, Springs, Electrostatic, Magnetic forces.</li>
              </ul>
            </div>
            <div className="bg-rose-500/[0.03] border border-rose-500/10 p-4 rounded-xl space-y-2">
 <div className="text-rose-300 font-bold">Non-Conservative Forces</div>
              <ul className="list-disc list-inside text-white/70 space-y-1">
                <li>Work done depends on the path taken.</li>
                <li>Work in a closed loop is non-zero (energy dissipated).</li>
                <li>Potential energy CANNOT be defined.</li>
                <li>Examples: Friction, Air resistance, Viscous force.</li>
              </ul>
            </div>
          </div>
          <MemoryBox title="Conservative Path Independence">
            Since gravity is a conservative force, the work done by gravity in moving a mass m from height y₁ to y₂ is strictly: 
            <strong>W = -mg(y₂ - y₁)</strong>, regardless of whether it goes vertically, along an incline, or along a complex spiral loop. Path doesn't matter!
          </MemoryBox>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Conservation of Mechanical Energy</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            The total mechanical energy (E = K + U) of a system is conserved if only conservative forces do work:
          </p>
 <div className="bg-white/5 rounded-xl p-4.5 space-y-3 text-[12px] leading-relaxed text-cyan-300">
            <div>1. Define Potential Energy (U) change: W<sub>conservative</sub> = &minus;&Delta;U</div>
            <div>2. Apply Work-Energy Theorem (WET): W<sub>net</sub> = &Delta;K</div>
            <div>3. For a system with only conservative forces:</div>
            <div className="pl-4">W<sub>net</sub> = W<sub>conservative</sub> &rArr; &Delta;K = &minus;&Delta;U</div>
            <div className="pl-4">&rArr; &Delta;K + &Delta;U = 0 &rArr; K<sub>initial</sub> + U<sub>initial</sub> = K<sub>final</sub> + U<sub>final</sub></div>
            <div className="pl-4">&rArr; E = K + U = Constant</div>
          </div>
          <p className="text-white/50 text-[12px] leading-relaxed">
            <strong>NCERT Nuance:</strong> The absolute value of potential energy is not physically measurable. U is defined only up to an arbitrary additive constant. Only the difference <code className="font-mono text-white">ΔU</code> is physically significant. Typically, we choose a reference position where we define U = 0:
          </p>
          <ul className="list-disc list-inside text-white/50 text-[12px] space-y-1 pl-4">
            <li><strong>Spring Potential Energy:</strong> U = 0 is chosen at the natural length (x = 0) of the spring.</li>
            <li><strong>Gravitational Potential Energy:</strong> U = 0 is chosen at ground level for earth-based kinematics, or at infinity (r = &infin;) for astronomical gravitation.</li>
          </ul>
        </div>
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Force and Potential Energy Gradient</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            Potential energy <code className="font-mono text-white bg-white/5 px-1 rounded">U</code> is defined strictly for conservative forces. The force vector is the negative gradient of the potential energy function:
          </p>
 <div className="bg-white/5 rounded-lg p-3 text-[12px] text-cyan-300 text-center">
            F = -∇U = -(∂U/∂x î + ∂U/∂y ĵ + ∂U/∂z k̂)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SpringSystemDiagram />
            <SpringEnergyParabolaDiagram />
            <div className="space-y-3 justify-center flex flex-col">
              <div className="text-[13px] font-bold text-cyan-400 uppercase tracking-wider">Spring Potential Energy</div>
              <p className="text-white/60 text-[13px] leading-relaxed">
                A spring stretched or compressed by length <code className="font-mono text-white">x</code> stores potential energy:
              </p>
 <div className="bg-white/5 rounded-lg p-3 text-[12px]">
                U = &frac12;kx&sup2;
              </div>
              <p className="text-white/50 text-[12px] leading-relaxed">
                <strong>Spring Work Sign Trap:</strong> Work done BY the spring is <code className="font-mono text-white">&minus;&frac12;kx&sup2;</code> (opposite to displacement), while work done BY an external agent stretching it slowly is <code className="font-mono text-white">+&frac12;kx&sup2;</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Equilibrium and Stability Curves</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            A system is in equilibrium at points where net force is zero: <code className="font-mono text-white bg-white/5 px-1 rounded">F = -dU/dx = 0</code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StabilityCurvesDiagram />
            <div className="space-y-2 text-[13px]">
 <div className="font-bold text-emerald-400">1. Stable: d²U/dx² &gt; 0 (Potential Minima ∪)</div>
              <p className="text-white/50 leading-relaxed">If displaced, a restoring force pushes the particle back to equilibrium (SHM).</p>
 <div className="font-bold text-rose-400">2. Unstable: d²U/dx² &lt; 0 (Potential Maxima ∩)</div>
              <p className="text-white/50 leading-relaxed">If displaced, force pulls the particle further away. Never returns.</p>
 <div className="font-bold text-cyan-400">3. Neutral: d²U/dx² = 0 (Flat Surface)</div>
              <p className="text-white/50 leading-relaxed">Stays in equilibrium at the new position.</p>
            </div>
          </div>
        </div>

        <SolvedExample
          title="Force from Potential Energy Gradient"
          problem="The potential energy of a particle in 2D is given by U(x, y) = 3x²y - 2y² Joules. Find the force acting on the particle at coordinates (1, 2)."
          steps={[
            'Calculate the x-component of force by taking the negative partial derivative w.r.t x: Fx = -∂U/∂x = -d/dx [3x²y - 2y²] = -6xy.',
            'Calculate the y-component of force by taking the negative partial derivative w.r.t y: Fy = -∂U/∂y = -d/dy [3x²y - 2y²] = -(3x² - 4y).',
            'Substitute the coordinates (1, 2) into the force equations: Fx = -6(1)(2) = -12 N.',
            'Substitute coordinates into Fy: Fy = -(3(1)² - 4(2)) = -(3 - 8) = 5 N.',
            'Write force vector: F = -12î + 5ĵ. Magnitude: |F| = √((-12)² + 5²) = √169 = 13 N.'
          ]}
          insight="Always treat other variables as constants when performing partial derivatives."
          color="cyan"
        />

        <SolvedExample
          title="Maximum Spring Compression in Collision"
          problem="A block of mass m = 2 kg slides at speed v = 6 m/s on a frictionless horizontal surface and collides with a spring of force constant k = 200 N/m attached to another stationary block of mass M = 4 kg. Find the maximum compression of the spring."
          steps={[
            'Understand that maximum compression occurs when both blocks move at the exact same common velocity vc.',
            'Apply conservation of linear momentum: m * v = (m + M) * vc.',
            'Substitute mass values to find common velocity: 2 * 6 = (2 + 4) * vc ⟹ 12 = 6 * vc ⟹ vc = 2 m/s.',
            'Apply conservation of mechanical energy: initial kinetic energy equals final kinetic energy plus spring potential energy: (1/2)mv² = (1/2)(m + M)vc² + (1/2)kx².',
            'Substitute values: (1/2)(2)(6²) = (1/2)(6)(2²) + (1/2)(200)x².',
            'Calculate: 36 = 12 + 100x² ⟹ 24 = 100x² ⟹ x² = 0.24 ⟹ x = √0.24 ≈ 0.49 meters (or 49 cm).'
          ]}
          insight="This two-step momentum + energy analysis is required because the collision is inelastic during the compression phase until maximum compression is reached, when elastic potential energy is maximized."
          color="cyan"
        />
      </div>

      {/* ── MODULE 3: Power ─────────────────────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={3} title="Power" difficulty={3} color="amber" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Average vs. Instantaneous Power</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            Power is the rate at which work is performed (energy is transferred).
          </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-center text-cyan-300">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-white/40 text-[12px] mb-1">Average Power (P<sub>avg</sub>)</div>
              P<sub>avg</sub> = W / &Delta;t = &Delta;E / &Delta;t
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-white/40 text-[12px] mb-1">Instantaneous Power (P<sub>inst</sub>)</div>
              P<sub>inst</sub> = dW / dt = F &middot; v
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl space-y-2">
              <div className="text-[13px] font-bold text-amber-300 uppercase">Kinematics with Constant Power</div>
              <p className="text-white/70 text-[13px] leading-relaxed">
                If an engine delivers constant power P to a particle starting from rest:
              </p>
 <div className="text-amber-200 text-[13px] bg-white/5 p-2 rounded">
                - Velocity: v &prop; t<sup>1/2</sup><br />
                - Displacement: s &prop; t<sup>3/2</sup>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl space-y-2">
              <div className="text-[13px] font-bold text-amber-300 uppercase">Engine Pump Work</div>
              <p className="text-white/70 text-[13px] leading-relaxed">
                A pump lifting water mass m from depth h and ejecting it with velocity v in time t does two things:
              </p>
 <div className="text-amber-200 text-[12px] bg-white/5 p-2 rounded">
                Total Work = mgh + (1/2)mv²<br />
                Power = (m/t) * [gh + v²/2]
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-white/60 text-[13px] font-semibold uppercase tracking-wider">Module 3 Formula Cards</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormulaCard
              formula="P = F * v"
              use_when="Moving Body: Find instantaneous power of an engine or force"
              freq_stars={5}
              difficulty_stars={2}
              color="cyan"
              copy_text="P = F * v"
            />
            <FormulaCard
              formula="v ∝ t^(1/2)"
              use_when="Constant Power: Velocity scaling over time"
              freq_stars={4}
              difficulty_stars={3}
              color="amber"
              copy_text="v = t^(1/2)"
            />
          </div>
        </div>

        <SolvedExample
          title="Constant Power Kinematics"
          problem="An engine delivers constant power P to a car of mass m starting from rest. Derive the expression for velocity as a function of time."
          steps={[
            'Write the expression for instantaneous power: P = F·v = m·(dv/dt)·v.',
            'Separate variables: v dv = (P/m) dt.',
            'Integrate both sides from rest: ∫₀ᵛ v dv = ∫₀ᵗ (P/m) dt.',
            'Evaluate: [v²/2] = (P/m)t ⟹ v² = 2Pt / m ⟹ v = √(2Pt / m).'
          ]}
          insight="This shows velocity grows as the square root of time under constant power delivery."
          color="amber"
        />
      </div>

      {/* ── MODULE 4: Collisions ─────────────────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={4} title="Collisions" difficulty={4} color="rose" />
        
        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Coefficient of Restitution</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            The coefficient of restitution <code className="font-mono text-white bg-white/5 px-1 rounded">e</code> is evaluated strictly along the Line of Impact:
          </p>
 <div className="bg-white/5 rounded-lg p-3 text-[12px] text-cyan-300 text-center">
            e = Velocity of Separation / Velocity of Approach = (v₂ - v₁) / (u₁ - u₂)
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-[13px] sm:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-white font-bold">
                  <th className="p-3">Collision Type</th>
                  <th className="p-3">e Value</th>
                  <th className="p-3">Momentum</th>
                  <th className="p-3">Kinetic Energy</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                <tr className="border-b border-white/5">
                  <td className="p-3 font-semibold text-white">Perfectly Elastic</td>
                  <td className="p-3">e = 1</td>
                  <td className="p-3">Conserved</td>
                  <td className="p-3 text-emerald-400">Conserved</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="p-3 font-semibold text-white">Inelastic</td>
                  <td className="p-3">0 &lt; e &lt; 1</td>
                  <td className="p-3">Conserved</td>
                  <td className="p-3 text-amber-400">Loss (Thermal/Sound)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Perfectly Inelastic</td>
                  <td className="p-3">e = 0</td>
                  <td className="p-3">Conserved</td>
                  <td className="p-3 text-rose-400 font-bold">Maximum Loss (Stick together)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CollisionDiagram />
            <ObliqueCollisionVectorDiagram />
            <div className="space-y-3 justify-center flex flex-col text-[13px] leading-relaxed text-white/70">
              <div className="text-[13px] font-bold text-rose-400 uppercase tracking-wider">Oblique 2D Collision Trap</div>
              <p>
                In oblique (2D) collisions, the coefficient of restitution formula <strong className="text-white">only</strong> applies to velocity components along the line of impact (common normal). Tangential velocity components remain unchanged.
              </p>
              <p className="border-t border-white/5 pt-2 text-[12px] text-white/50">
 <strong>Identical Mass Perpendicularity Theorem:</strong> If an elastic oblique collision occurs between two identical masses, one of which is initially stationary, they will move at exactly <strong>90&deg; relative to each other</strong> after collision (<span className="text-cyan-300">v₁ &perp; v₂</span>).
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Energy Loss in Inelastic Collisions</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            The kinetic energy lost during a partially or perfectly inelastic 1D collision is given by the reduced mass formula:
          </p>
 <div className="bg-white/5 rounded-lg p-3 text-[12px] text-cyan-300 text-center">
            &Delta;E<sub>loss</sub> = &frac12; &middot; [ (m₁&middot;m₂) / (m₁ + m₂) ] &middot; (u₁ &minus; u₂)&sup2; &middot; (1 &minus; e&sup2;)
          </div>
 <p className="text-white/55 text-[13px]">
            Where &mu; = (m₁&middot;m₂)/(m₁+m₂) is the reduced mass of the system, and |u₁ &minus; u₂| is the relative velocity of approach. Note that for a perfectly inelastic collision (e = 0), energy loss is maximized.
          </p>
        </div>

        <SolvedExample
          title="Kinetic Energy Loss in Inelastic Collision"
          problem="A block of mass m₁ = 2 kg moving at u₁ = 6 m/s collides horizontally with another block of mass m₂ = 3 kg moving at u₂ = 1 m/s in the same direction. If the coefficient of restitution is e = 0.5, find the loss in kinetic energy."
          steps={[
            'Calculate the reduced mass: &mu; = (m₁&middot;m₂) / (m₁ + m₂) = (2·3) / (2 + 3) = 6/5 = 1.2 kg.',
            'Calculate the relative velocity of approach: u<sub>rel</sub> = u₁ &minus; u₂ = 6 &minus; 1 = 5 m/s.',
            'Apply the energy loss formula: &Delta;E<sub>loss</sub> = &frac12; &middot; &mu; &middot; u<sub>rel</sub>&sup2; &middot; (1 &minus; e&sup2;).',
            'Substitute values: &Delta;E<sub>loss</sub> = &frac12; &middot; 1.2 &middot; 5&sup2; &middot; (1 &minus; 0.5&sup2;) = 0.6 &middot; 25 &middot; (1 &minus; 0.25) = 15 &middot; 0.75 = 11.25 Joules.'
          ]}
          insight="Using this formula avoids having to solve for both final velocities first, saving valuable time during exams."
          color="rose"
        />

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">General 1D Elastic Collision Velocity Formulas</h4>
          <p className="text-white/70 text-[13px] sm:text-sm leading-relaxed">
            For unequal masses m₁ and m₂ colliding elastically (e = 1) with initial velocities u₁ and u₂:
          </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px] text-center text-cyan-300">
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-white/40 text-[12px] mb-1">Final Velocity of m₁ (v₁)</div>
              v₁ = [(m₁ - m₂) / (m₁ + m₂)] * u₁ + [2m₂ / (m₁ + m₂)] * u₂
            </div>
            <div className="bg-white/5 p-3 rounded-lg">
              <div className="text-white/40 text-[12px] mb-1">Final Velocity of m₂ (v₂)</div>
              v₂ = [2m₁ / (m₁ + m₂)] * u₁ + [(m₂ - m₁) / (m₁ + m₂)] * u₂
            </div>
          </div>
          <div className="bg-white/5 p-3.5 rounded-lg space-y-1.5 text-[13px] text-white/70">
            <div className="font-bold text-white uppercase tracking-wider text-[12px]">Special Cases to Memorize:</div>
            <div>• <strong>Equal Masses (m₁ = m₂)</strong>: velocities swap (v₁ = u₂, v₂ = u₁).</div>
            <div>• <strong>Stationary Heavy Target (m₂ &gt;&gt; m₁, u₂ = 0)</strong>: light mass rebounds with opposite velocity (v₁ ≈ -u₁), heavy mass remains at rest (v₂ ≈ 0).</div>
            <div>• <strong>Stationary Light Target (m₁ &gt;&gt; m₂, u₂ = 0)</strong>: heavy mass continues at same velocity (v₁ ≈ u₁), light target takes off with double velocity (v₂ ≈ 2u₁).</div>
          </div>
        </div>

        <SolvedExample
          title="Elastic 1D Collision velocities"
          problem="Two identical masses m₁ = m₂ = 2 kg undergo a perfectly elastic 1D collision. m₁ is moving at 5 m/s and m₂ is moving at 2 m/s in the same direction. Find their velocities after the collision."
          steps={[
            'Identify restitution for elastic collision: e = 1.',
            'Apply the identical mass rule: For m₁ = m₂, velocities simply interchange.',
            'Result: m₁ final velocity is v₁ = 2 m/s, m₂ final velocity is v₂ = 5 m/s.'
          ]}
          insight="No integration or momentum equations are required when masses are identical and collision is elastic — velocities always swap!"
          color="rose"
        />

        {/* Center of Mass Collision Shortcut & System WET */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-2">
            <span className="text-[11px] font-black text-violet-400 uppercase tracking-wider block">Center of Mass (CM) Frame Collision Shortcut</span>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              In the CM frame, the total momentum is always zero. For a 1D elastic collision, the particles simply **reverse their velocities w.r.t the CM**:
            </p>
 <div className="text-violet-300 text-[12.5px] bg-black/20 p-2 rounded">
              v<sub>1,cm</sub> = &minus;u<sub>1,cm</sub> &nbsp;&nbsp;|&nbsp;&nbsp; v<sub>2,cm</sub> = &minus;u<sub>2,cm</sub>
            </div>
            <p className="text-white/55 text-[11.5px] leading-relaxed">
 Convert initial velocities to CM frame (<span className="text-cyan-300">v<sub>cm</sub> = (m₁u₁+m₂u₂)/(m₁+m₂)</span>), reverse them, and convert back to the ground frame to find final velocities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 space-y-2">
            <span className="text-[11px] font-black text-cyan-400 uppercase tracking-wider block">WET for a System of Particles</span>
            <p className="text-white/70 text-[12.5px] leading-relaxed">
              For a system of multiple particles, the Work-Energy Theorem states that the work done by both **external and internal forces** equals the change in total kinetic energy:
            </p>
 <div className="text-cyan-300 text-[12.5px] bg-black/20 p-2 rounded text-center">
              W<sub>ext</sub> + W<sub>int</sub> = &Delta;K<sub>total</sub>
            </div>
            <p className="text-white/55 text-[11.5px] leading-relaxed">
              Even if internal forces cancel out in Newton's Third Law (vector sum of forces = 0), the total work done by internal forces (like springs or chemical reactions) is **not necessarily zero**!
            </p>
          </div>
        </div>

        <SolvedExample
          title="Oblique (2D) Elastic Collision Decomposition"
          problem="A sphere A of mass m moving with velocity uî collides elastically with an identical stationary sphere B. After the collision, sphere A moves at an angle of 30° w.r.t the initial direction. Find the final velocities of both spheres."
          steps={[
            'Apply momentum conservation along the initial x-axis: m&middot;u = m&middot;v<sub>Ax</sub> + m&middot;v<sub>Bx</sub> &rArr; u = v<sub>A</sub>&middot;cos(30&deg;) + v<sub>B</sub>&middot;cos(&theta;) = v<sub>A</sub>&middot;(&radic;3/2) + v<sub>Bx</sub>.',
            'Apply momentum conservation along the y-axis: 0 = m&middot;v<sub>Ay</sub> + m&middot;v<sub>By</sub> &rArr; 0 = v<sub>A</sub>&middot;sin(30&deg;) &minus; v<sub>B</sub>&middot;sin(&theta;) &rArr; v<sub>A</sub>&middot;(&frac12;) = v<sub>By</sub>.',
            'Use the identical mass elastic oblique collision theorem: The velocities of two identical spheres colliding obliquely and elastically are always perpendicular after collision &rArr; &theta; = 90&deg; &minus; 30&deg; = 60&deg;.',
            'Express final velocities in components: v<sub>A</sub> = u&middot;cos(30&deg;) = u&middot;(&radic;3/2), v<sub>B</sub> = u&middot;sin(30&deg;) = u&middot;(&frac12;) along their respective directions.',
            'Represent in vector form: v<sub>A</sub> = u(&radic;3/2) &middot; (cos 30&deg;&icirc; + sin 30&deg;&jcirc;) = u(3/4 &icirc; + &radic;3/4 &jcirc;). v<sub>B</sub> = u(&frac12;) &middot; (cos &minus;60&deg;&icirc; + sin &minus;60&deg;&jcirc;) = u(1/4 &icirc; &minus; &radic;3/4 &jcirc;).'
          ]}
          insight="Because the masses are identical and the collision is elastic, the vectors v<sub>A</sub> and v<sub>B</sub> are perpendicular. Their magnitudes form a right triangle with hypotenuse u."
          color="rose"
        />
      </div>

      {/* ── MODULE 5: Elite Shortcuts & VCM ─────────────────────────────────── */}
      <div className="space-y-5">
        <ModuleHeader number={5} title="Elite Shortcuts & VCM" difficulty={5} color="emerald" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'The Bullet & Plank Trick',
              emoji: '🎯',
              formula: 'N = n² / (2n - 1)',
              note: 'Number of planks to stop a bullet that loses 1/n of velocity passing through one plank.',
              color: 'border-cyan-500/20 bg-cyan-500/5'
            },
            {
              title: 'Hanging Chain Pull-up Work',
              emoji: '⛓️',
              formula: 'W = MgL / (2n²)',
              note: 'Work to pull up a chain of mass M, length L when 1/n of it hangs off the table.',
              color: 'border-violet-500/20 bg-violet-500/5'
            },
            {
              title: 'Bouncing Ball Inelastic Series',
              emoji: '🏀',
              formula: 'hn = e²ⁿ * h₀\nTotal Dist: D = h₀(1+e²) / (1-e²)',
              note: 'Total height and distance covered after n bounces on a floor of restitution e.',
              color: 'border-rose-500/20 bg-rose-500/5'
            },
            {
              title: "Work by Gravity on Projectile",
              emoji: '☄️',
              formula: 'W = -mg(y₂ - y₁)',
              note: 'Gravity work is path-independent. Returns 0 for any full symmetric horizontal flight.',
              color: 'border-amber-500/20 bg-amber-500/5'
            },
          ].map(item => (
            <div key={item.title} className={cn('rounded-2xl border p-4 space-y-3', item.color)}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-white font-bold text-[14.5px]">{item.title}</span>
              </div>
 <div className="text-white/90 text-[14.5px] whitespace-pre-line bg-black/20 rounded-lg px-3 py-2">
                {item.formula}
              </div>
              <p className="text-white/55 text-[13px]">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0A0C18] p-5 space-y-4">
          <h4 className="text-white font-bold text-[14.5px]">Vertical Circular Motion (String Length R)</h4>
          <ul className="list-disc list-inside text-white/70 text-[13px] sm:text-sm space-y-1.5 leading-relaxed">
            <li>To complete the full circle: <code className="font-mono text-white bg-white/5 px-1 rounded">v<sub>bottom</sub> &ge; &radic;(5gR)</code></li>
            <li>To reach the top and momentarily stop (string slackens): <code className="font-mono text-white bg-white/5 px-1 rounded">v<sub>bottom</sub> &ge; &radic;(4gR)</code></li>
            <li>Oscillates in the lower half circle: <code className="font-mono text-white bg-white/5 px-1 rounded">v<sub>bottom</sub> &le; &radic;(2gR)</code></li>
          </ul>
        </div>

        <SolvedExample
          title="Bouncing Ball Total Distance"
          problem="A ball is dropped from a height of 10 m onto a horizontal floor. If the coefficient of restitution is e = 0.5, calculate the total distance covered by the ball before it comes to rest."
          steps={[
            'Identify parameters: initial height h₀ = 10 m, restitution e = 0.5.',
            'Apply the total distance shortcut formula: D = h₀(1 + e²) / (1 - e²).',
            'Substitute values: e² = 0.25.',
            'Calculate: D = 10 * (1 + 0.25) / (1 - 0.25) = 10 * (1.25 / 0.75) = 10 * (5 / 3) = 50 / 3 ≈ 16.67 meters.'
          ]}
          insight="The infinite sum of bounces forms a geometric progression, which simplifies cleanly to this distance shortcut."
          color="emerald"
        />
      </div>

      {/* ── SECTION 5: Common Mistakes ───────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<AlertTriangle className="w-5 h-5" />} label="Common Traps & Mistakes" color="rose" />
        <div className="space-y-3">
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 space-y-2">
            <div className="text-rose-300 font-bold text-[14.5px]">Trap 1: The Spring Work Sign Trap</div>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
              Work done BY the spring when stretched by x is <code className="font-mono text-white bg-white/5 px-1 rounded">W = -(1/2)kx²</code> (since force is restorative and opposite to displacement). Work done BY the external agent stretching it slowly is <code className="font-mono text-white bg-white/5 px-1 rounded">W = +(1/2)kx²</code>.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 space-y-2">
            <div className="text-rose-300 font-bold text-[14.5px]">Trap 2: Internal Forces doing work</div>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
              Do not assume internal forces do no work. In a bomb explosion or a spring release, internal conservative forces do positive work to increase the system's kinetic energy.
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5 space-y-2">
            <div className="text-rose-300 font-bold text-[14.5px]">Trap 3: Oblique Collisions Restitution</div>
            <p className="text-white/75 text-[13px] sm:text-sm leading-relaxed">
              Applying the restitution formula along coordinates blindly. Remember <code className="font-mono text-white bg-white/5 px-1 rounded">e</code> is ONLY valid along the Line of Impact (common normal).
            </p>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: Question Recognition ─────────────────────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Target className="w-5 h-5" />} label="Question Recognition Patterns" color="violet" />
        <p className="text-white/50 text-[14.5px]">Spot key terms in questions to instantly identify the right solving strategy.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RecognitionCard
            trigger="maximum compression of spring"
            thought="Momentum + Energy Conservation"
            action="Find the common velocity at max compression using momentum conservation, then apply energy conservation."
            color="violet"
          />
          <RecognitionCard
            trigger="potential energy graph given"
            thought="F = -dU/dx & Stability"
            action="Find points where force is zero. Check the sign of the second derivative to determine stability."
            color="cyan"
          />
          <RecognitionCard
            trigger="pump lifts water and ejects it"
            thought="Power = work/time"
            action="Total work done per second includes potential energy lift (mgh) and kinetic energy ((1/2)mv²)."
            color="amber"
          />
        </div>
      </div>

      {/* ── SECTION 7: "Must Memorize" Quick Reference Box ──────────────────── */}
      <div className="space-y-5">
        <SectionHeader icon={<Award className="w-5 h-5" />} label="Must Memorize Quick Reference" color="amber" />
        <div className="rounded-2xl border border-amber-500/30 bg-amber-900/10 p-5 space-y-3">
          <p className="text-amber-200 text-[13px] sm:text-sm">Save time in exams. Memorize these values and equations directly:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Bullet Plank: N = n&sup2;/(2n&minus;1)', 'Hanging Chain: W = MgL/2n&sup2;', 'Bouncing ball: D = h<sub>0</sub>(1+e&sup2;)/(1&minus;e&sup2;)', 'VCM bottom speed &radic;(5gR)', 'VCM tension diff: T<sub>bot</sub>&minus;T<sub>top</sub> = 6mg', 'Potential stability: d&sup2;U/dx&sup2; &gt; 0 stable', 'Spring energy: U = &frac12;kx&sup2;', 'Restitution: e = v<sub>sep</sub> / v<sub>app</sub>'].map(item => (
 <div key={item} className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-amber-200 text-[13px] text-center flex items-center justify-center">
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 8: 2-Minute Revision Sheet ───────────────────────────────── */}
      <div className="space-y-4">
        <SectionHeader icon={<RefreshCw className="w-5 h-5" />} label="2-Minute Revision Checklist" color="emerald" />
        <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-5 space-y-4">
          <p className="text-white/50 text-[13px]">Run through this checklist before your mock tests to verify readiness.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {revisionItems.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-150',
                  checklist[i]
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                    : 'border-white/5 bg-white/[0.02] text-white/60 hover:border-white/10'
                )}
              >
                <div className={cn('w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                  checklist[i] ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                )}>
                  {checklist[i] && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-[13px]" dangerouslySetInnerHTML={{ __html: item }} />
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-white/40 text-[13px]">
              {Object.values(checklist).filter(Boolean).length} / {revisionItems.length} checked
            </span>
            {Object.values(checklist).filter(Boolean).length === revisionItems.length && (
              <span className="text-emerald-400 text-[13px] font-bold">🎉 Fully prepared for Unit 5!</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
