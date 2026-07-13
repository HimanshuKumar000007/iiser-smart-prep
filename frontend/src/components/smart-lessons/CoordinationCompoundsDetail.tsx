import React, { useState } from 'react';
import {
  Star, AlertTriangle, Zap, BookOpen, FlaskConical,
  Atom, BarChart3, RefreshCw, ChevronDown, ChevronUp, Layers
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
  const c: Record<string, string> = { cyan: 'bg-cyan-400 text-cyan-400', violet: 'bg-violet-400 text-violet-400', emerald: 'bg-emerald-400 text-emerald-400', amber: 'bg-amber-400 text-amber-400', rose: 'bg-rose-400 text-rose-400' };
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
        <span className="text-[12.5px] font-extrabold text-rose-400 uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-white/70 text-[13px] leading-relaxed">{children}</div>
    </div>
  );
}

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

// ─── CFT SVG DIAGRAMS ────────────────────────────────────────────────────────
function OctahedralSplittingDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 150 }}>
        {/* Free ion */}
        <text x="50" y="16" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Free Ion</text>
        <text x="50" y="27" fill="#64748b" fontSize="6.5" textAnchor="middle">5 degenerate</text>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={26 + i*9} y={60} width={7} height={22} rx={1} fill="#38bdf8" fillOpacity={0.3} stroke="#38bdf8" strokeWidth={0.8} />
        ))}
        {/* Arrow */}
        <path d="M 100 80 L 145 80" stroke="#eab308" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="122" y="74" fill="#eab308" fontSize="7" textAnchor="middle">Octahedral</text>
        <text x="122" y="84" fill="#eab308" fontSize="7" textAnchor="middle">field</text>
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#eab308" />
          </marker>
        </defs>
        {/* eg — higher energy */}
        <text x="240" y="22" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">e_g  (×2) — HIGHER</text>
        <rect x="210" y="28" width="20" height="18" rx={2} fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={1} />
        <rect x="255" y="28" width="20" height="18" rx={2} fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={1} />
        <text x="220" y="40" fill="#f43f5e" fontSize="6" textAnchor="middle">dz²</text>
        <text x="265" y="40" fill="#f43f5e" fontSize="6" textAnchor="middle">dx²-y²</text>
        {/* Δo bracket */}
        <line x1="295" y1="37" x2="295" y2="115" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <path d="M 295 37 L 292 42 M 295 37 L 298 42" stroke="#eab308" strokeWidth="1" />
        <path d="M 295 115 L 292 110 M 295 115 L 298 110" stroke="#eab308" strokeWidth="1" />
        <text x="318" y="79" fill="#eab308" fontSize="9" fontWeight="bold" textAnchor="middle">Δo</text>
        {/* t2g — lower energy */}
        <text x="240" y="135" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">t₂g (×3) — LOWER</text>
        <rect x="193" y="100" width="20" height="18" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
        <rect x="228" y="100" width="20" height="18" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
        <rect x="263" y="100" width="20" height="18" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
        <text x="203" y="112" fill="#34d399" fontSize="5.5" textAnchor="middle">dxy</text>
        <text x="238" y="112" fill="#34d399" fontSize="5.5" textAnchor="middle">dyz</text>
        <text x="273" y="112" fill="#34d399" fontSize="5.5" textAnchor="middle">dxz</text>
        {/* Energy labels */}
        <text x="163" y="37" fill="#f43f5e" fontSize="7" textAnchor="end">+0.6Δo</text>
        <text x="163" y="112" fill="#34d399" fontSize="7" textAnchor="end">-0.4Δo</text>
        <text x="50" y="155" fill="#64748b" fontSize="6.5" textAnchor="middle">each d-orbital</text>
        <text x="240" y="155" fill="#64748b" fontSize="7" textAnchor="middle">ligands approach along ±x, ±y, ±z axes → eg repelled more</text>
      </svg>
    </div>
  );
}

function TetrahedralSplittingDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 140 }}>
        <text x="50" y="16" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Free Ion</text>
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={26 + i*9} y={58} width={7} height={22} rx={1} fill="#38bdf8" fillOpacity={0.3} stroke="#38bdf8" strokeWidth={0.8} />
        ))}
        <path d="M 100 78 L 145 78" stroke="#eab308" strokeWidth="1.5" />
        <path d="M 145 78 L 140 75 M 145 78 L 140 81" stroke="#eab308" strokeWidth="1" />
        <text x="122" y="72" fill="#eab308" fontSize="7" textAnchor="middle">Tetrahedral</text>
        <text x="122" y="82" fill="#eab308" fontSize="7" textAnchor="middle">field</text>
        {/* t2 — HIGHER */}
        <text x="240" y="22" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">t₂ (×3) — HIGHER</text>
        <rect x="193" y="28" width="20" height="18" rx={2} fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={1} />
        <rect x="228" y="28" width="20" height="18" rx={2} fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={1} />
        <rect x="263" y="28" width="20" height="18" rx={2} fill="#f43f5e" fillOpacity={0.2} stroke="#f43f5e" strokeWidth={1} />
        <text x="203" y="40" fill="#f43f5e" fontSize="5.5" textAnchor="middle">dxy</text>
        <text x="238" y="40" fill="#f43f5e" fontSize="5.5" textAnchor="middle">dyz</text>
        <text x="273" y="40" fill="#f43f5e" fontSize="5.5" textAnchor="middle">dxz</text>
        {/* Δt bracket */}
        <line x1="295" y1="37" x2="295" y2="105" stroke="#eab308" strokeWidth="1" strokeDasharray="3,2" />
        <path d="M 295 37 L 292 42 M 295 37 L 298 42" stroke="#eab308" strokeWidth="1" />
        <path d="M 295 105 L 292 100 M 295 105 L 298 100" stroke="#eab308" strokeWidth="1" />
        <text x="320" y="74" fill="#eab308" fontSize="9" fontWeight="bold">Δt</text>
        {/* e — LOWER */}
        <text x="240" y="125" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">e  (×2) — LOWER</text>
        <rect x="215" y="95" width="20" height="18" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
        <rect x="250" y="95" width="20" height="18" rx={2} fill="#34d399" fillOpacity={0.2} stroke="#34d399" strokeWidth={1} />
        <text x="225" y="107" fill="#34d399" fontSize="6" textAnchor="middle">dz²</text>
        <text x="260" y="107" fill="#34d399" fontSize="6" textAnchor="middle">dx²-y²</text>
        <text x="240" y="145" fill="#64748b" fontSize="7" textAnchor="middle">Δt = (4/9)Δo — always small → usually HIGH SPIN</text>
      </svg>
    </div>
  );
}

// ─── NEW GRAPHICAL DIAGRAMS ──────────────────────────────────────────────────
function ColorWheelDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 mb-2 font-bold text-center">Complementary Color Wheel (d-d Transitions)</span>
      <svg viewBox="0 0 200 200" className="w-48 h-48">
        <circle cx="100" cy="100" r="85" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.1" />
        
        {/* Colors sectors */}
        {/* Red (0-60 deg) -> Green (180-240 deg) */}
        {/* Orange (60-120) -> Blue (240-300) */}
        {/* Yellow (120-180) -> Violet (300-360) */}
        
        {/* Red sector */}
        <path d="M100,100 L100,15 A85,85 0 0,1 173.6,57.5 Z" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.5" />
        {/* Orange sector */}
        <path d="M100,100 L173.6,57.5 A85,85 0 0,1 173.6,142.5 Z" fill="#f97316" fillOpacity="0.15" stroke="#f97316" strokeWidth="1.5" />
        {/* Yellow sector */}
        <path d="M100,100 L173.6,142.5 A85,85 0 0,1 100,185 Z" fill="#eab308" fillOpacity="0.15" stroke="#eab308" strokeWidth="1.5" />
        {/* Green sector */}
        <path d="M100,100 L100,185 A85,85 0 0,1 26.4,142.5 Z" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
        {/* Blue sector */}
        <path d="M100,100 L26.4,142.5 A85,85 0 0,1 26.4,57.5 Z" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1.5" />
        {/* Violet sector */}
        <path d="M100,100 L26.4,57.5 A85,85 0 0,1 100,15 Z" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="1.5" />

        {/* Outer label texts */}
        <text x="100" y="10" fill="#ef4444" fontSize="7.5" fontWeight="bold" textAnchor="middle">RED (~650nm)</text>
        <text x="180" y="55" fill="#f97316" fontSize="7.5" fontWeight="bold" textAnchor="start">ORANGE (~600nm)</text>
        <text x="180" y="150" fill="#eab308" fontSize="7.5" fontWeight="bold" textAnchor="start">YELLOW (~570nm)</text>
        <text x="100" y="195" fill="#22c55e" fontSize="7.5" fontWeight="bold" textAnchor="middle">GREEN (~520nm)</text>
        <text x="20" y="150" fill="#3b82f6" fontSize="7.5" fontWeight="bold" textAnchor="end">BLUE (~450nm)</text>
        <text x="20" y="55" fill="#a855f7" fontSize="7.5" fontWeight="bold" textAnchor="end">VIOLET (~400nm)</text>

        {/* Center arrows showing complementary relationships */}
        <g stroke="#ffffff" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.5">
          <line x1="100" y1="25" x2="100" y2="175" />
          <line x1="35" y1="62.5" x2="165" y2="137.5" />
          <line x1="35" y1="137.5" x2="165" y2="62.5" />
        </g>
        <circle cx="100" cy="100" r="4" fill="#ffffff" />
      </svg>
      <span className="text-[10.5px] text-white/40 mt-2 text-center max-w-xs">Opposite colors are complementary. If a compound absorbs 570 nm (Yellow), it transmits violet, appearing violet to the eye.</span>
    </div>
  );
}

function GeometricalIsomerSketches() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 space-y-4">
      <div className="text-[12px] text-white/50 font-bold text-center">3D Geometrical Isomers Sketches</div>
      
      {/* Square Planar cis/trans Pt(NH3)2Cl2 */}
      <div className="space-y-2">
        <div className="text-[11px] text-cyan-300 font-bold text-center">Square Planar cis- & trans-platin [Pt(NH₃)₂Cl₂]</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/3 p-2 rounded-xl border border-white/5 flex flex-col items-center">
            <span className="text-[11px] text-emerald-400 font-bold">cis-platin (active)</span>
            <svg viewBox="0 0 120 100" className="w-24 h-20">
              <line x1="30" y1="30" x2="90" y2="70" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="30" y1="70" x2="90" y2="30" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="60" cy="50" r="10" fill="#a855f7" />
              <text x="60" y="53" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Pt</text>
              {/* Adjacent ligands */}
              <text x="22" y="28" fill="#38bdf8" fontSize="8" fontWeight="bold">NH₃</text>
              <text x="98" y="28" fill="#38bdf8" fontSize="8" fontWeight="bold">NH₃</text>
              <text x="24" y="78" fill="#ef4444" fontSize="8" fontWeight="bold">Cl</text>
              <text x="96" y="78" fill="#ef4444" fontSize="8" fontWeight="bold">Cl</text>
            </svg>
          </div>
          <div className="bg-white/3 p-2 rounded-xl border border-white/5 flex flex-col items-center">
            <span className="text-[11px] text-white/50">trans-platin (inactive)</span>
            <svg viewBox="0 0 120 100" className="w-24 h-20">
              <line x1="30" y1="30" x2="90" y2="70" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="30" y1="70" x2="90" y2="30" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="60" cy="50" r="10" fill="#a855f7" />
              <text x="60" y="53" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Pt</text>
              {/* Opposite ligands */}
              <text x="22" y="28" fill="#38bdf8" fontSize="8" fontWeight="bold">NH₃</text>
              <text x="98" y="28" fill="#ef4444" fontSize="8" fontWeight="bold">Cl</text>
              <text x="24" y="78" fill="#ef4444" fontSize="8" fontWeight="bold">Cl</text>
              <text x="96" y="78" fill="#38bdf8" fontSize="8" fontWeight="bold">NH₃</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Octahedral fac/mer Co(NH3)3Cl3 */}
      <div className="space-y-2">
        <div className="text-[11px] text-violet-300 font-bold text-center">Octahedral fac- & mer- [Co(NH₃)₃Cl₃]</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/3 p-2 rounded-xl border border-white/5 flex flex-col items-center">
            <span className="text-[11px] text-emerald-400 font-bold">facial (fac)</span>
            <svg viewBox="0 0 120 110" className="w-24 h-22">
              {/* Octahedral axes */}
              <line x1="60" y1="20" x2="60" y2="90" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="30" y1="45" x2="90" y2="65" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="35" y1="70" x2="85" y2="40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              {/* Highlight face */}
              <polygon points="60,20 85,40 90,65" fill="#22c55e" fillOpacity="0.25" stroke="#22c55e" strokeWidth="0.8" strokeDasharray="2,1" />
              
              <circle cx="60" cy="55" r="9" fill="#eab308" />
              <text x="60" y="58" fill="#000000" fontSize="7.5" fontWeight="bold" textAnchor="middle">Co</text>
              
              {/* 3 identical ligands on one face */}
              <text x="60" y="15" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">NH₃</text>
              <text x="88" y="38" fill="#38bdf8" fontSize="7" fontWeight="bold">NH₃</text>
              <text x="92" y="70" fill="#38bdf8" fontSize="7" fontWeight="bold">NH₃</text>
              
              {/* Other 3 on opposite face */}
              <text x="25" y="44" fill="#ef4444" fontSize="7" fontWeight="bold">Cl</text>
              <text x="28" y="78" fill="#ef4444" fontSize="7" fontWeight="bold">Cl</text>
              <text x="60" y="100" fill="#ef4444" fontSize="7" fontWeight="bold" textAnchor="middle">Cl</text>
            </svg>
          </div>
          <div className="bg-white/3 p-2 rounded-xl border border-white/5 flex flex-col items-center">
            <span className="text-[11px] text-white/50">meridional (mer)</span>
            <svg viewBox="0 0 120 110" className="w-24 h-22">
              <line x1="60" y1="20" x2="60" y2="90" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="30" y1="45" x2="90" y2="65" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              <line x1="35" y1="70" x2="85" y2="40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
              
              {/* Highlight meridian */}
              <polygon points="60,20 90,65 60,90" fill="#3b82f6" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="2,1" />

              <circle cx="60" cy="55" r="9" fill="#eab308" />
              <text x="60" y="58" fill="#000000" fontSize="7.5" fontWeight="bold" textAnchor="middle">Co</text>
              
              {/* Meridional belt */}
              <text x="60" y="15" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">NH₃</text>
              <text x="92" y="70" fill="#38bdf8" fontSize="7" fontWeight="bold">NH₃</text>
              <text x="60" y="100" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle">NH₃</text>
              
              {/* Rest are Cl */}
              <text x="25" y="44" fill="#ef4444" fontSize="7" fontWeight="bold">Cl</text>
              <text x="28" y="78" fill="#ef4444" fontSize="7" fontWeight="bold">Cl</text>
              <text x="88" y="38" fill="#ef4444" fontSize="7" fontWeight="bold">Cl</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpticalIsomerPropellers() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 space-y-3">
      <div className="text-[12px] text-white/50 font-bold text-center">Optical Isomerism propellor shapes [Co(en)₃]³⁺</div>
      <div className="grid grid-cols-2 gap-4">
        {/* Delta isomer */}
        <div className="bg-white/3 p-2 rounded-xl border border-white/5 flex flex-col items-center">
          <span className="text-[11px] text-cyan-300 font-bold">Right-handed (Δ-isomer)</span>
          <svg viewBox="0 0 120 120" className="w-28 h-28">
            <line x1="60" y1="20" x2="60" y2="100" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <line x1="25" y1="50" x2="95" y2="70" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <line x1="30" y1="80" x2="90" y2="40" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            
            <circle cx="60" cy="60" r="10" fill="#a855f7" />
            <text x="60" y="63" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Co</text>
            
            {/* en rings shown as arcs */}
            {/* Top-to-righten */}
            <path d="M 60,20 A 40,40 0 0,1 95,70" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            {/* Topleft-to-bottomleft */}
            <path d="M 90,40 A 40,40 0 0,1 60,100" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            {/* Bottom-to-left */}
            <path d="M 30,80 A 40,40 0 0,1 25,50" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            
            <text x="83" y="32" fill="#22c55e" fontSize="7" fontWeight="bold">en</text>
            <text x="85" y="85" fill="#22c55e" fontSize="7" fontWeight="bold">en</text>
            <text x="18" y="70" fill="#22c55e" fontSize="7" fontWeight="bold">en</text>
          </svg>
        </div>

        {/* Lambda isomer */}
        <div className="bg-white/3 p-2 rounded-xl border border-white/5 flex flex-col items-center">
          <span className="text-[11px] text-violet-300 font-bold">Left-handed (Λ-isomer)</span>
          <svg viewBox="0 0 120 120" className="w-28 h-28">
            <line x1="60" y1="20" x2="60" y2="100" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <line x1="25" y1="70" x2="95" y2="50" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <line x1="30" y1="40" x2="90" y2="80" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            
            <circle cx="60" cy="60" r="10" fill="#a855f7" />
            <text x="60" y="63" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Co</text>
            
            {/* en rings mirror arcs */}
            <path d="M 60,20 A 40,40 0 0,0 25,50" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <path d="M 30,40 A 40,40 0 0,0 60,100" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            <path d="M 90,80 A 40,40 0 0,0 95,70" fill="none" stroke="#a855f7" strokeWidth="2.5" />
            
            <text x="35" y="32" fill="#a855f7" fontSize="7" fontWeight="bold">en</text>
            <text x="32" y="85" fill="#a855f7" fontSize="7" fontWeight="bold">en</text>
            <text x="96" y="65" fill="#a855f7" fontSize="7" fontWeight="bold">en</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SynergicBondingDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4 flex flex-col items-center">
      <span className="text-[12px] text-white/50 font-bold mb-2 text-center">Synergic Bonding in Metal Carbonyls</span>
      <svg viewBox="0 0 320 120" className="w-full" style={{ maxHeight: 110 }}>
        {/* Metal atom on left */}
        <circle cx="60" cy="60" r="22" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="60" y="63" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">METAL</text>

        {/* CO ligand on right */}
        <circle cx="240" cy="60" r="15" fill="#f97316" fillOpacity="0.2" stroke="#f97316" strokeWidth="1" />
        <text x="240" y="63" fill="#fb923c" fontSize="8" fontWeight="bold" textAnchor="middle">C</text>
        <circle cx="280" cy="60" r="12" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1" />
        <text x="280" y="63" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">O</text>
        <line x1="255" y1="60" x2="268" y2="60" stroke="#fca5a5" strokeWidth="2" />

        {/* Sigma donation arrow */}
        <path d="M 220 54 L 95 54" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-green)" />
        <text x="155" y="47" fill="#22c55e" fontSize="7" fontWeight="bold" textAnchor="middle">σ-donation (CO → empty M orbital)</text>
        
        {/* Pi backbonding arrows */}
        <path d="M 85 70 C 110 88, 170 88, 222 72" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" />
        <text x="155" y="98" fill="#a855f7" fontSize="7" fontWeight="bold" textAnchor="middle">π-back-bonding (filled M d → vacant CO π*)</text>

        {/* SVG Arrow definitions */}
        <defs>
          <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#22c55e" />
          </marker>
          <marker id="arrow-purple" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#a855f7" />
          </marker>
        </defs>
      </svg>
      <span className="text-[10.5px] text-white/40 mt-1 text-center">Synergy: σ-donation increases electron density on M, allowing stronger π-back-donation. This strengthens the M-C bond but weakens C-O.</span>
    </div>
  );
}

function SquarePlanarSplittingDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 130 }}>
        <text x="170" y="14" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Square-Planar Crystal Field Splitting (d⁸)</text>
        
        {/* Octahedral splitting reference on left */}
        <line x1="40" y1="75" x2="100" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.1" />
        <text x="70" y="32" fill="#94a3b8" fontSize="7.5" textAnchor="middle">Octahedral (Oh)</text>
        
        {/* eg level */}
        <line x1="60" y1="42" x2="90" y2="42" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="54" y="45" fill="#f43f5e" fontSize="6.5" textAnchor="end">eg</text>
        
        {/* t2g level */}
        <line x1="60" y1="95" x2="90" y2="95" stroke="#34d399" strokeWidth="1.5" />
        <text x="54" y="98" fill="#34d399" fontSize="6.5" textAnchor="end">t2g</text>

        {/* Transition arrow */}
        <path d="M 115 68 L 155 68" stroke="#a855f7" strokeWidth="1.5" />
        <path d="M 155 68 L 150 65 M 155 68 L 150 71" stroke="#a855f7" strokeWidth="1" />
        <text x="135" y="60" fill="#a855f7" fontSize="7" textAnchor="middle">Pull z-ligands out</text>

        {/* Square Planar levels on right */}
        <text x="250" y="32" fill="#38bdf8" fontSize="7.5" textAnchor="middle">Square Planar (D4h)</text>
        
        {/* dx2-y2 at top */}
        <line x1="210" y1="42" x2="250" y2="42" stroke="#f43f5e" strokeWidth="2" />
        <text x="255" y="45" fill="#f43f5e" fontSize="7" fontWeight="bold">dx²-y²</text>

        {/* dxy */}
        <line x1="210" y1="68" x2="250" y2="68" stroke="#eab308" strokeWidth="2" />
        <text x="255" y="71" fill="#eab308" fontSize="7" fontWeight="bold">dxy</text>

        {/* dz2 */}
        <line x1="210" y1="92" x2="250" y2="92" stroke="#38bdf8" strokeWidth="2" />
        <text x="255" y="95" fill="#38bdf8" fontSize="7" fontWeight="bold">dz²</text>

        {/* dxz, dyz at bottom */}
        <line x1="210" y1="118" x2="250" y2="118" stroke="#34d399" strokeWidth="2" />
        <text x="255" y="121" fill="#34d399" fontSize="7" fontWeight="bold">dxz, dyz</text>

        <text x="170" y="142" fill="#64748b" fontSize="6.5" textAnchor="middle">Energy: dx²-y² &gt;&gt; dxy &gt; dz² &gt; dxz, dyz. Large gap favors low spin.</text>
      </svg>
    </div>
  );
}

function JahnTellerDistortionDiagram() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#060814] p-4">
      <svg viewBox="0 0 340 150" className="w-full" style={{ maxHeight: 130 }}>
        <text x="170" y="14" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Jahn-Teller Distortion (e.g., d⁹ Cu²⁺ Octahedral Complex)</text>
        
        {/* Octahedral splitting reference */}
        <line x1="40" y1="75" x2="100" y2="75" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
        <text x="70" y="32" fill="#94a3b8" fontSize="7.5" textAnchor="middle">Regular Oh</text>
        <rect x="50" y="40" width="16" height="12" rx="1" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" />
        <rect x="74" y="40" width="16" height="12" rx="1" fill="#f43f5e" fillOpacity="0.2" stroke="#f43f5e" />
        <text x="70" y="65" fill="#f43f5e" fontSize="7" textAnchor="middle">eg</text>

        {/* Distortion arrow */}
        <path d="M 120 75 L 160 75" stroke="#eab308" strokeWidth="1.5" />
        <path d="M 160 75 L 155 72 M 160 75 L 155 78" stroke="#eab308" strokeWidth="1" />
        <text x="140" y="68" fill="#eab308" fontSize="7.5" textAnchor="middle">Distortion</text>

        {/* Distorted levels showing further splitting */}
        <text x="250" y="32" fill="#eab308" fontSize="7.5" textAnchor="middle">Elongated Oh (Z-out)</text>
        
        {/* Split eg -> dx2-y2 rises, dz2 falls */}
        <line x1="210" y1="38" x2="250" y2="38" stroke="#f43f5e" strokeWidth="2" />
        <text x="255" y="41" fill="#f43f5e" fontSize="7" fontWeight="bold">dx²-y²</text>

        <line x1="210" y1="58" x2="250" y2="58" stroke="#38bdf8" strokeWidth="2" />
        <text x="255" y="61" fill="#38bdf8" fontSize="7" fontWeight="bold">dz²</text>

        {/* Split t2g -> dxy rises, dxz/dyz fall */}
        <line x1="210" y1="95" x2="250" y2="95" stroke="#f43f5e" strokeWidth="2" />
        <text x="255" y="98" fill="#f43f5e" fontSize="7">dxy</text>

        <line x1="210" y1="115" x2="250" y2="115" stroke="#34d399" strokeWidth="2" />
        <text x="255" y="118" fill="#34d399" fontSize="7">dxz, dyz</text>

        <text x="170" y="142" fill="#64748b" fontSize="6.5" textAnchor="middle">Degeneracy is lifted to lower the overall thermodynamic energy of the system.</text>
      </svg>
    </div>
  );
}

// ─── ORBITAL BOX HELPER ───────────────────────────────────────────────────────
function OrbitalBoxRow({ label, boxes, colors }: { label: string; boxes: ('up' | 'both' | 'empty')[]; colors: string[] }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-white/40 text-[10px] w-10 text-right shrink-0">{label}</span>
      <div className="flex gap-1">
        {boxes.map((b, i) => (
          <div key={i} className="w-7 h-8 border border-white/20 rounded-md flex flex-col items-center justify-center bg-white/3">
            {b === 'up' && <span className={`text-[11px] leading-none ${colors[i] ?? 'text-cyan-400'}`}>↑</span>}
            {b === 'both' && <>
              <span className={`text-[11px] leading-none ${colors[i] ?? 'text-cyan-400'}`}>↑</span>
              <span className="text-rose-400 text-[10px] leading-none mt-0.5">↓</span>
            </>}
            {b === 'empty' && <span className="text-white/10 text-[10px]">·</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── WIDGET 1: COMPLEX ANALYZER ──────────────────────────────────────────────
const analyzerPresets = [
  { formula: '[Fe(CN)₆]⁴⁻', metal: 'Fe', os: 2, ligand: 'CN⁻', cn: 6, geometry: 'Octahedral', strong: true },
  { formula: '[FeF₆]³⁻', metal: 'Fe', os: 3, ligand: 'F⁻', cn: 6, geometry: 'Octahedral', strong: false },
  { formula: '[Fe(CN)₆]³⁻', metal: 'Fe', os: 3, ligand: 'CN⁻', cn: 6, geometry: 'Octahedral', strong: true },
  { formula: '[CoF₆]³⁻', metal: 'Co', os: 3, ligand: 'F⁻', cn: 6, geometry: 'Octahedral', strong: false },
  { formula: '[Co(NH₃)₆]³⁺', metal: 'Co', os: 3, ligand: 'NH₃', cn: 6, geometry: 'Octahedral', strong: true },
  { formula: '[Ni(CO)₄]', metal: 'Ni', os: 0, ligand: 'CO', cn: 4, geometry: 'Tetrahedral', strong: true },
  { formula: '[NiCl₄]²⁻', metal: 'Ni', os: 2, ligand: 'Cl⁻', cn: 4, geometry: 'Tetrahedral', strong: false },
  { formula: '[Ni(CN)₄]²⁻', metal: 'Ni', os: 2, ligand: 'CN⁻', cn: 4, geometry: 'Square Planar', strong: true },
  { formula: '[CuCl₄]²⁻', metal: 'Cu', os: 2, ligand: 'Cl⁻', cn: 4, geometry: 'Tetrahedral', strong: false },
  { formula: '[Cr(NH₃)₆]³⁺', metal: 'Cr', os: 3, ligand: 'NH₃', cn: 6, geometry: 'Octahedral', strong: true },
];

const metalDConfig: Record<string, number[]> = {
  Sc: [1], Ti: [2,3,4], V: [2,3,4,5], Cr: [0,2,3,6], Mn: [2,3,4,6,7],
  Fe: [0,2,3], Co: [0,2,3], Ni: [0,2,3,4], Cu: [1,2], Zn: [2],
};

function getDCount(metal: string, os: number): number {
  const zMap: Record<string, number> = { Sc: 21, Ti: 22, V: 23, Cr: 24, Mn: 25, Fe: 26, Co: 27, Ni: 28, Cu: 29, Zn: 30 };
  const z = zMap[metal] ?? 26;
  const valenceTotal = z - 18; // electrons beyond Ar
  return Math.max(0, valenceTotal - os);
}

function getCFTFilling(dCount: number, geometry: string, strong: boolean): { t2g: number; eg: number; e?: number; t2?: number; unpaired: number } {
  if (geometry === 'Tetrahedral') {
    const e = Math.min(dCount, 4);
    const t2 = Math.max(0, dCount - 4);
    // Tetrahedral is always high-spin (Δt small)
    const unpaired = [dCount <= 2 ? dCount : dCount <= 4 ? 4 - dCount + dCount : 0, // approximate
      dCount === 0 ? 0 : dCount === 1 ? 1 : dCount === 2 ? 2 : dCount === 3 ? 3 : dCount === 4 ? 4 : dCount === 5 ? 5 : dCount === 6 ? 4 : dCount === 7 ? 3 : dCount === 8 ? 2 : dCount === 9 ? 1 : 0][1];
    return { t2g: 0, eg: 0, e, t2: Math.max(0, dCount - 4), unpaired };
  }
  // Octahedral and Square Planar: high vs low spin
  if (strong) {
    // Low spin: fill t2g first (max 6), then eg
    const t2g = Math.min(dCount, 6);
    const eg = Math.max(0, dCount - 6);
    let unpaired = 0;
    if (t2g <= 3) unpaired = t2g;
    else if (t2g <= 6) unpaired = 6 - t2g;
    unpaired += eg; // eg electrons each unpaired (never paired in low-spin eg for d7 downward)
    return { t2g, eg, unpaired };
  } else {
    // High spin: Hund's rule
    const up = Math.min(dCount, 5);
    const down = Math.max(0, dCount - 5);
    const unpaired = up - down;
    const t2g = Math.min(up, 3) + Math.min(down, 3);
    const eg = up - Math.min(up, 3) + Math.max(0, down - 3);
    return { t2g, eg, unpaired };
  }
}

function cfseCalc(t2g: number, eg: number): string {
  const val = -0.4 * t2g + 0.6 * eg;
  const sign = val <= 0 ? '' : '+';
  return `${sign}${val.toFixed(1)} Δo`;
}

function ComplexAnalyzer() {
  const [selected, setSelected] = useState(0);
  const preset = analyzerPresets[selected];
  const dCount = getDCount(preset.metal, preset.os);
  const filling = getCFTFilling(dCount, preset.geometry, preset.strong);
  const mu = parseFloat(Math.sqrt(filling.unpaired * (filling.unpaired + 2)).toFixed(2));
  const isTet = preset.geometry === 'Tetrahedral';
  const isOct = preset.geometry === 'Octahedral';
  const isSq = preset.geometry === 'Square Planar';
  const cfse = (isOct || isSq) && !isTet ? cfseCalc(filling.t2g ?? 0, filling.eg ?? 0) : 'N/A (Tetrahedral)';

  // Build orbital boxes for octahedral
  const buildOctBoxes = (): { t2g: ('up' | 'both' | 'empty')[]; eg: ('up' | 'both' | 'empty')[] } => {
    const { t2g: t2gCount, eg: egCount } = filling;
    const t2g: ('up' | 'both' | 'empty')[] = [0, 1, 2].map(i => {
      const up = Math.min(t2gCount ?? 0, 3);
      const down = Math.max(0, (t2gCount ?? 0) - 3);
      if (i < down) return 'both';
      if (i < up) return 'up';
      return 'empty';
    });
    const eg: ('up' | 'both' | 'empty')[] = [0, 1].map(i => {
      const up = Math.min(egCount ?? 0, 2);
      const down = Math.max(0, (egCount ?? 0) - 2);
      if (i < down) return 'both';
      if (i < up) return 'up';
      return 'empty';
    });
    return { t2g, eg };
  };

  const octBoxes = (isOct || isSq) ? buildOctBoxes() : null;

  return (
    <div className="space-y-5">
      {/* Preset selector */}
      <div className="flex flex-wrap gap-2">
        {analyzerPresets.map((p, i) => (
          <button key={p.formula} onClick={() => setSelected(i)}
            className={cn('px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all',
              i === selected ? 'bg-violet-500/20 border-violet-500/40 text-violet-300' : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70')}>
            {p.formula}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Step-by-step */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-3">
          <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Step-by-Step CFT Analysis</div>
          {[
            { step: '1. Formula', val: preset.formula, color: 'text-white' },
            { step: '2. Metal & OS', val: `${preset.metal}${preset.os > 0 ? '('+preset.os+'⁺)' : '(0)'}`, color: 'text-amber-300' },
            { step: '3. d-electron count', val: `d${dCount} → ${dCount} electrons`, color: 'text-cyan-300' },
            { step: '4. Geometry', val: preset.geometry, color: 'text-violet-300' },
            { step: '5. Ligand field', val: preset.strong ? `${preset.ligand} = Strong field → LOW SPIN` : `${preset.ligand} = Weak field → HIGH SPIN`, color: preset.strong ? 'text-emerald-300' : 'text-rose-300' },
          ].map(s => (
            <div key={s.step} className="flex justify-between items-start gap-2 p-2.5 rounded-lg bg-white/3 border border-white/5 text-[12.5px]">
              <span className="text-white/40 shrink-0">{s.step}</span>
              <span className={`font-bold text-right ${s.color}`}>{s.val}</span>
            </div>
          ))}
          {(isOct || isSq) && octBoxes && (
            <div className="p-2.5 rounded-lg bg-white/3 border border-white/5 space-y-2">
              <div className="text-white/40 text-[11px]">6. Orbital filling</div>
              <OrbitalBoxRow label="eg" boxes={octBoxes.eg} colors={['text-rose-400', 'text-rose-400']} />
              <OrbitalBoxRow label="t₂g" boxes={octBoxes.t2g} colors={['text-emerald-400', 'text-emerald-400', 'text-emerald-400']} />
            </div>
          )}
          {isTet && (
            <div className="p-2.5 rounded-lg bg-white/3 border border-white/5">
              <div className="text-white/40 text-[11px] mb-1">6. Tetrahedral filling (always high-spin)</div>
              <div className="text-white/70 text-[12px]">e({filling.e}) t₂({filling.t2}) — Δt = 4/9 Δo (too small to force pairing)</div>
            </div>
          )}
        </div>

        {/* Results panel */}
        <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-4">
          <div className="text-[11px] text-white/30 uppercase tracking-wider font-bold">Results</div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="text-white/30 text-[10px] uppercase">Config</div>
              <div className="text-white font-bold text-[13px] mt-1 font-mono">
                {(isOct || isSq) ? `t₂g${filling.t2g}eg${filling.eg}` : `e${filling.e}t₂${filling.t2}`}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="text-white/30 text-[10px] uppercase">CFSE</div>
              <div className="text-emerald-300 font-bold text-[13px] mt-1">{cfse}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="text-white/30 text-[10px] uppercase">Unpaired e⁻</div>
              <div className="text-2xl font-black text-white mt-1">{filling.unpaired}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="text-white/30 text-[10px] uppercase">μ (BM)</div>
              <div className="text-2xl font-black text-violet-300 mt-1">{mu.toFixed(2)}</div>
            </div>
          </div>
          <div className={cn('p-3 rounded-xl border text-center font-bold text-[13px]',
            filling.unpaired === 0 ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' : 'bg-rose-500/10 border-rose-500/20 text-rose-300')}>
            {filling.unpaired === 0 ? '◆ Diamagnetic' : `⟐ Paramagnetic (${filling.unpaired} unpaired e⁻)`}
          </div>
          <div className={cn('p-3 rounded-xl border text-center font-bold text-[13px]',
            preset.strong ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 border-amber-500/20 text-amber-300')}>
            {preset.strong ? (isTet ? 'Tetrahedral (always high spin)' : '↓ Low Spin') : '↑ High Spin'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WIDGET 2: IUPAC NAMER ───────────────────────────────────────────────────
const ligandNames: Record<string, { iupac: string; ncert: string; charge: number; denticity: number }> = {
  'Cl⁻':    { iupac: 'chlorido',  ncert: 'chloro',   charge: -1, denticity: 1 },
  'Br⁻':    { iupac: 'bromido',   ncert: 'bromo',    charge: -1, denticity: 1 },
  'F⁻':     { iupac: 'fluorido',  ncert: 'fluoro',   charge: -1, denticity: 1 },
  'CN⁻':    { iupac: 'cyanido',   ncert: 'cyano',    charge: -1, denticity: 1 },
  'OH⁻':    { iupac: 'hydroxido', ncert: 'hydroxo',  charge: -1, denticity: 1 },
  'NO₂⁻(N)':{ iupac: 'nitro',    ncert: 'nitro-N',  charge: -1, denticity: 1 },
  'NO₂⁻(O)':{ iupac: 'nitrito-κO', ncert: 'nitrito-O', charge: -1, denticity: 1 },
  'SCN⁻(S)':{ iupac: 'thiocyanato-κS', ncert: 'thiocyanato', charge: -1, denticity: 1 },
  'NH₃':    { iupac: 'ammine',    ncert: 'ammine',   charge: 0,  denticity: 1 },
  'H₂O':    { iupac: 'aqua',      ncert: 'aqua',     charge: 0,  denticity: 1 },
  'CO':     { iupac: 'carbonyl',  ncert: 'carbonyl', charge: 0,  denticity: 1 },
  'NO':     { iupac: 'nitrosyl',  ncert: 'nitrosyl', charge: 0,  denticity: 1 },
  'en':     { iupac: 'ethane-1,2-diamine', ncert: 'ethylenediamine', charge: 0, denticity: 2 },
  'ox²⁻':   { iupac: 'oxalato',   ncert: 'oxalato',  charge: -2, denticity: 2 },
  'edta⁴⁻': { iupac: 'ethylenediaminetetraacetato', ncert: 'EDTA', charge: -4, denticity: 6 },
};

const metalNamesAnionic: Record<string, string> = {
  Fe: 'ferrate', Cu: 'cuprate', Ag: 'argentate', Au: 'aurate', Sn: 'stannate',
  Pb: 'plumbate', Co: 'cobaltate', Cr: 'chromate', Ni: 'nickelate', Mn: 'manganate',
  Pt: 'platinate', Pd: 'palladate', Ti: 'titanate', V: 'vanadate', Zn: 'zincate',
};

function IUPACNamer() {
  const [metal, setMetal] = useState('Co');
  const [os, setOs] = useState(3);
  const [ligandList, setLigandList] = useState<string[]>(['NH₃', 'NH₃', 'NH₃', 'NH₃', 'NH₃', 'NH₃']);
  const [overallCharge, setOverallCharge] = useState(3);

  const isAnion = overallCharge < 0;
  const metalName = isAnion
    ? (metalNamesAnionic[metal] ?? metal.toLowerCase() + 'ate')
    : metal.toLowerCase() + (metal === 'Fe' ? 'iron' : '').replace('ironn', 'iron');

  // Count ligands
  const counts: Record<string, number> = {};
  ligandList.forEach(l => { counts[l] = (counts[l] ?? 0) + 1; });

  const prefix = (n: number, ligand: string): string => {
    const name = ligandNames[ligand]?.ncert ?? ligand;
    const needsBis = name.includes('-') || name.includes(',') || name.length > 8;
    const p = needsBis
      ? ['', 'bis', 'tris', 'tetrakis', 'pentakis', 'hexakis'][n] ?? `${n}×`
      : ['', 'di', 'tri', 'tetra', 'penta', 'hexa'][n] ?? `${n}`;
    return `${p}(${name})`;
  };

  const sorted = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  const ligandStr = sorted.map(([l, n]) => prefix(n, l)).join('');
  const metalStr = isAnion ? metalName : metal.toLowerCase();
  const osRoman = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][Math.abs(os)] ?? os.toString();

  const iupacName = `${ligandStr}${metalStr}(${osRoman})`;

  const allLigands = Object.keys(ligandNames);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Central Metal</label>
          <select value={metal} onChange={e => setMetal(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-violet-500/40">
            {['Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Pt','Pd','Ag','Au'].map(m => (
              <option key={m} value={m} className="bg-[#0d1220]">{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Oxidation State</label>
          <select value={os} onChange={e => setOs(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-violet-500/40">
            {[-1,0,1,2,3,4,5,6].map(o => (
              <option key={o} value={o} className="bg-[#0d1220]">{o >= 0 ? '+' : ''}{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Overall Charge</label>
          <select value={overallCharge} onChange={e => setOverallCharge(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-[12.5px] focus:outline-none focus:border-violet-500/40">
            {[-4,-3,-2,-1,0,1,2,3,4].map(c => (
              <option key={c} value={c} className="bg-[#0d1220]">{c > 0 ? '+' : ''}{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Ion type</label>
          <div className={`mt-2 px-3 py-2 rounded-lg border text-center text-[12px] font-bold ${isAnion ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' : overallCharge > 0 ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' : 'bg-white/5 border-white/10 text-white/50'}`}>
            {isAnion ? 'Anionic' : overallCharge > 0 ? 'Cationic' : 'Neutral'}
          </div>
        </div>
      </div>

      {/* Ligand slots */}
      <div>
        <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-2">Ligands (up to 6)</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[0,1,2,3,4,5].map(i => (
            <select key={i} value={ligandList[i] ?? 'NH₃'}
              onChange={e => {
                const next = [...ligandList];
                next[i] = e.target.value;
                setLigandList(next);
              }}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-[11.5px] focus:outline-none focus:border-violet-500/40">
              <option value="none" className="bg-[#0d1220]">(none)</option>
              {allLigands.map(l => (
                <option key={l} value={l} className="bg-[#0d1220]">{l}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="p-4 rounded-2xl bg-[#090b18] border border-violet-500/20 space-y-2">
        <div className="text-[10px] text-white/30 uppercase tracking-wider">IUPAC Name (NCERT exam convention)</div>
        <div className="text-emerald-300 font-bold text-[15px] break-all">{iupacName}</div>
        <div className="text-[11px] text-white/30 mt-2">Metal naming rule: {isAnion ? `Anionic complex → use Latin name: "${metalNamesAnionic[metal] ?? metal.toLowerCase() + 'ate'}"` : `Cationic/neutral → use English name: "${metal.toLowerCase()}"`}</div>
      </div>

      {/* Quick reference */}
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-[11.5px]">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              <th className="px-3 py-2 text-left text-white/40 font-bold">Ligand</th>
              <th className="px-3 py-2 text-left text-white/40 font-bold">NCERT Name</th>
              <th className="px-3 py-2 text-left text-white/40 font-bold">Modern IUPAC</th>
              <th className="px-3 py-2 text-left text-white/40 font-bold">Type</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ligandNames).map(([k, v]) => (
              <tr key={k} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-3 py-2 font-mono font-bold text-white/80">{k}</td>
                <td className="px-3 py-2 text-cyan-300">{v.ncert}</td>
                <td className="px-3 py-2 text-violet-300">{v.iupac}</td>
                <td className="px-3 py-2 text-white/40">{v.charge < 0 ? 'Anionic' : v.charge === 0 ? 'Neutral' : 'Anionic'} / {v.denticity === 1 ? 'Unidentate' : v.denticity === 2 ? 'Didentate' : `${v.denticity}-dentate`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── WIDGET 3: ISOMER COUNTER ─────────────────────────────────────────────────
const isomerTypes = [
  {
    type: 'Square Planar [MA₄]', geoCount: 0, optCount: 0,
    description: 'All 4 ligands identical — no isomerism possible.',
    note: 'e.g. [Ni(CN)₄]²⁻'
  },
  {
    type: 'Square Planar [MA₂B₂]', geoCount: 2, optCount: 0,
    description: 'cis (same ligands adjacent) and trans (same ligands opposite). trans has a plane of symmetry → no optical isomers. cis also has a plane of symmetry → no optical isomers.',
    note: 'e.g. [Pt(NH₃)₂Cl₂]: cis-platin (cancer drug!) and transplatin'
  },
  {
    type: 'Square Planar [MA₃B]', geoCount: 0, optCount: 0,
    description: 'All arrangements are equivalent — only one isomer exists.',
    note: 'e.g. [Pt(NH₃)₃Cl]⁺'
  },
  {
    type: 'Square Planar [MABCD]', geoCount: 3, optCount: 0,
    description: '3 geometric isomers. Each has a plane of symmetry → not optically active.',
    note: 'e.g. [Pt(NH₃)(py)(Cl)(Br)]'
  },
  {
    type: 'Octahedral [MA₆]', geoCount: 0, optCount: 0,
    description: 'No isomerism.',
    note: 'e.g. [Co(NH₃)₆]³⁺'
  },
  {
    type: 'Octahedral [MA₄B₂]', geoCount: 2, optCount: 0,
    description: 'cis (2 B adjacent) and trans (2 B opposite). Both have symmetry elements → not optically active.',
    note: 'e.g. [Co(NH₃)₄Cl₂]⁺'
  },
  {
    type: 'Octahedral [MA₃B₃]', geoCount: 2, optCount: 0,
    description: 'fac (all A facial, forming triangular face) and mer (A in meridional plane). Both achiral.',
    note: 'e.g. [Rh(NH₃)₃Cl₃]: fac and mer'
  },
  {
    type: 'Octahedral [M(AA)₃]', geoCount: 0, optCount: 2,
    description: 'AA = symmetric bidentate ligand (e.g. en). Propeller-like arrangement — no plane of symmetry or centre of inversion → Δ (right-handed) and Λ (left-handed).',
    note: 'e.g. [Co(en)₃]³⁺ — classic optical isomers'
  },
  {
    type: 'Octahedral [M(AA)₂B₂] cis', geoCount: 2, optCount: 2,
    description: 'cis isomer has no plane of symmetry → optically active (Δ and Λ). trans isomer has plane of symmetry → optically inactive.',
    note: 'e.g. [Co(en)₂Cl₂]⁺ — only the cis form is optically active'
  },
];

function IsomerCounter() {
  const [selected, setSelected] = useState(1);
  const iso = isomerTypes[selected];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {isomerTypes.map((t, i) => (
          <button key={i} onClick={() => setSelected(i)}
            className={cn('px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all',
              i === selected ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-white/3 border-white/10 text-white/40 hover:text-white/70')}>
            {t.type.split(' ').slice(-1)[0]}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-4">
        <div className="text-white font-bold text-[14px]">{iso.type}</div>
        <div className="text-white/50 text-[12.5px] italic">{iso.note}</div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl text-center border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Geometric Isomers</div>
            <div className="text-4xl font-black text-white mt-1">{iso.geoCount === 0 ? '—' : iso.geoCount}</div>
            <div className="text-white/30 text-[10px] mt-1">{iso.geoCount === 0 ? 'None' : iso.geoCount === 2 ? 'cis / trans' : iso.geoCount === 2 ? 'fac / mer' : `${iso.geoCount} forms`}</div>
          </div>
          <div className="p-3 rounded-xl text-center border border-violet-500/20 bg-violet-500/5">
            <div className="text-violet-400 text-[10px] font-bold uppercase tracking-wider">Optical Isomers</div>
            <div className="text-4xl font-black text-white mt-1">{iso.optCount === 0 ? '—' : iso.optCount}</div>
            <div className="text-white/30 text-[10px] mt-1">{iso.optCount === 0 ? 'None (has σ or i)' : 'Δ (d) and Λ (l) forms'}</div>
          </div>
        </div>

        <p className="text-white/65 text-[12.5px] leading-relaxed">{iso.description}</p>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 text-[12.5px] text-white/70 space-y-1">
        <div className="text-amber-400 font-bold text-[11px] uppercase tracking-wider">General Rules for Optical Isomerism</div>
        <ul className="space-y-1 mt-1">
          <li className="flex gap-1.5"><span className="text-amber-400">▸</span>A complex is optically active if it has <strong className="text-white">no plane of symmetry (σ), no centre of inversion (i), and no improper rotation axis (Sn)</strong>.</li>
          <li className="flex gap-1.5"><span className="text-amber-400">▸</span>Trans isomers of [M(AA)₂B₂] always have a plane of symmetry → inactive.</li>
          <li className="flex gap-1.5"><span className="text-amber-400">▸</span>Propeller-shaped [M(AA)₃]ⁿ complexes are always optically active (Δ/Λ).</li>
          <li className="flex gap-1.5"><span className="text-amber-400">▸</span>Square planar complexes are generally NOT optically active (flat molecule → always has σh).</li>
        </ul>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CoordinationCompoundsDetail({ progress, isCompleted, onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'namer' | 'isomers'>('analyzer');

  const tabs = [
    { id: 'analyzer' as const, label: 'Complex Analyzer', icon: <Atom className="w-3.5 h-3.5" /> },
    { id: 'namer' as const, label: 'IUPAC Namer', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'isomers' as const, label: 'Isomer Counter', icon: <Layers className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0b0f1e] via-[#0d1220] to-[#0b0f1e] p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-violet-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color="emerald">Chemistry</Tag>
            <Tag color="amber">Unit 9</Tag>
            <Tag color="rose">IAT Advanced</Tag>
            <Tag color="pink">Hot Topic</Tag>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Coordination<br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">Compounds</span>
          </h1>
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl">
            Werner's theory, IUPAC nomenclature, structural and stereo isomerism, VBT, Crystal Field Theory (octahedral, tetrahedral, square-planar), magnetic properties, and metal carbonyls — the complete IAT-level treatment.
          </p>
          <div className="flex gap-3 flex-wrap text-[12px] text-white/40">
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 25 min read</span>
            <span>·</span><span>pyqFrequency: 60%</span>
            <span>·</span><span className="text-rose-400 font-bold">Priority: Hot Topic</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 1: Core Definitions & Coordination Entity ─────────────── */}
      <Collapsible title="1 · Core Definitions & Coordination Entity" icon={<Atom className="w-4 h-4" />} accent="emerald">
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>A <strong className="text-white">coordination compound</strong> contains a central metal atom/ion surrounded by molecules or ions (<strong className="text-white">ligands</strong>) bonded via coordinate covalent bonds. The key structural unit is the <strong className="text-emerald-300">coordination entity</strong>.</p>

          <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="text-emerald-400 font-bold text-[12.5px] uppercase tracking-wider mb-3">Example: [Co(NH₃)₆]Cl₃</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              {[
                { term: 'Coordination entity', val: '[Co(NH₃)₆]³⁺', desc: 'The complex ion (in square brackets)' },
                { term: 'Central atom/ion', val: 'Co³⁺', desc: 'Metal that accepts electron pairs' },
                { term: 'Ligands', val: '6 × NH₃', desc: 'Molecules/ions donating electron pairs' },
                { term: 'Coordination number (CN)', val: '6', desc: 'Number of ligating donor atoms' },
                { term: 'Coordination sphere', val: '[Co(NH₃)₆]³⁺', desc: 'Central atom + all ligands within []' },
                { term: 'Counter ions', val: '3 × Cl⁻', desc: 'Ions outside the coordination sphere' },
                { term: 'Oxidation number', val: '+3', desc: 'Charge on central metal (ionizable)' },
              ].map(r => (
                <div key={r.term} className="flex flex-col gap-0.5 p-2 rounded-lg bg-white/3 border border-white/5">
                  <span className="text-white/40 text-[10.5px] uppercase tracking-wider">{r.term}</span>
                  <span className="text-emerald-300 font-bold font-mono">{r.val}</span>
                  <span className="text-white/50 text-[11px]">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <TrapCard title="CN ≠ Oxidation Number">
            These are completely different quantities! In [Co(NH₃)₆]Cl₃: <strong>Oxidation Number = +3</strong> (Co³⁺, equals primary valency) and <strong>Coordination Number = 6</strong> (6 donor atoms, equals secondary valency). A complex can have CN = 6 and OS = +2, or CN = 4 and OS = +3 — they are independent.
          </TrapCard>

          {/* CN and Geometries Summary Table */}
          <div className="space-y-2 mt-3">
            <SectionBanner label="Common Coordination Numbers & Geometries" color="emerald" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-3 py-2 text-left text-white/40 font-bold">CN</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Geometry</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Hybridization</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['2', 'Linear', 'sp', '[Ag(NH₃)₂]⁺, [Au(CN)₂]⁻'],
                    ['4', 'Tetrahedral', 'sp³', '[NiCl₄]²⁻, [Zn(NH₃)₄]²⁺, [Ni(CO)₄]'],
                    ['4', 'Square Planar', 'dsp²', '[Ni(CN)₄]²⁻, [Pt(NH₃)₂Cl₂], [PdCl₄]²⁻'],
                    ['6', 'Octahedral', 'd²sp³ or sp³d²', '[Co(NH₃)₆]³⁺, [Fe(H₂O)₆]²⁺, [Cr(H₂O)₆]³⁺'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-2 font-bold text-emerald-300">{r[0]}</td>
                      <td className="px-3 py-2 text-white/70">{r[1]}</td>
                      <td className="px-3 py-2 font-mono text-cyan-300">{r[2]}</td>
                      <td className="px-3 py-2 text-white/50 text-[11px] font-mono">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 2: Ligand Classification ─────────────────────────────── */}
      <Collapsible title="2 · Ligand Classification & Denticity" icon={<Layers className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  {['Type', 'Denticity', 'Definition', 'Examples'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-white/40 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Unidentate', d: 1, def: 'One donor atom', ex: 'Cl⁻, Br⁻, NH₃, H₂O, CO, NO, CN⁻, OH⁻' },
                  { type: 'Didentate', d: 2, def: 'Two donor atoms', ex: 'en (N,N), oxalate ox²⁻ (O,O), dmgH⁻ (N,O)' },
                  { type: 'Tridentate', d: 3, def: 'Three donor atoms', ex: 'diethylenetriamine (dien)' },
                  { type: 'Tetradentate', d: 4, def: 'Four donor atoms', ex: 'triethylenetetramine (trien)' },
                  { type: 'Pentadentate', d: 5, def: 'Five donor atoms', ex: 'DTPA (partial)' },
                  { type: 'Hexadentate', d: 6, def: 'Six donor atoms', ex: 'EDTA⁴⁻ (N₂O₄ donors)' },
                  { type: 'Ambidentate', d: '1 (either atom)', def: 'Two possible donor atoms in same ligand', ex: 'NO₂⁻: N-bonded (nitro) or O-bonded (nitrito); SCN⁻: S-bonded or N-bonded' },
                ].map(r => (
                  <tr key={r.type} className="border-b border-white/5 hover:bg-white/3">
                    <td className="px-3 py-2.5 font-bold text-cyan-300">{r.type}</td>
                    <td className="px-3 py-2.5 text-violet-300 font-bold text-center">{r.d}</td>
                    <td className="px-3 py-2.5 text-white/60">{r.def}</td>
                    <td className="px-3 py-2.5 text-white/55 text-[11px]">{r.ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Chelate Effect" color="emerald" />
            <p>When a di- or polydentate ligand coordinates through multiple donor atoms to the <strong className="text-white">same metal ion</strong>, it forms a ring structure — a <strong className="text-emerald-300">chelate</strong>. This results in <strong className="text-white">extra thermodynamic stability</strong>.</p>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-[12.5px]">
              <div className="text-emerald-400 font-bold mb-2">Why is the chelate effect entropic?</div>
              <p className="text-white/65">Replacing n unidentate ligands with one n-dentate chelating ligand releases more particles into solution (ΔS increases), making ΔG = ΔH − TΔS more negative. The chelate complex is more stable even if ΔH is similar.</p>
              <div className="mt-2 font-mono text-emerald-300 text-[11.5px]">
                [Ni(H₂O)₆]²⁺ + 3en → [Ni(en)₃]²⁺ + 6H₂O (large Keq due to +ΔS)
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Stability Constants (K_stable / β) & Quantification" color="emerald" />
            <p>The formation of a complex in solution is a reversible equilibrium characterized by the <strong className="text-white">Stability Constant (K_stable or β)</strong>. A higher log K_stable value indicates greater thermodynamic stability.</p>
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Complex</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Ligand Type</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">log K_stable</th>
                    <th className="px-3 py-2 text-left text-white/40 font-bold">Stability Comparison</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['[Ni(NH₃)₆]²⁺', '6 × Monodentate (NH₃)', '8.6', 'Base stability (no chelation)'],
                    ['[Ni(en)₃]²⁺', '3 × Didentate (en)', '18.3', 'Chelate Effect (+9.7 orders of magnitude!)'],
                    ['[Cu(NH₃)₄]²⁺', '4 × Monodentate (NH₃)', '12.6', 'Base stability'],
                    ['[Cu(en)₂]²⁺', '2 × Didentate (en)', '20.0', 'Chelate stability'],
                    ['[Fe(EDTA)]²⁻', '1 × Hexadentate (EDTA)', '25.1', 'Extremely high stability (multiple rings)'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-2 font-mono text-cyan-300 font-bold">{r[0]}</td>
                      <td className="px-3 py-2 text-white/60">{r[1]}</td>
                      <td className="px-3 py-2 font-bold text-emerald-300 text-center">{r[2]}</td>
                      <td className="px-3 py-2 text-white/50 text-[11px]">{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11.5px] text-white/45">Note the massive difference between [Ni(NH₃)₆]²⁺ and [Ni(en)₃]²⁺. Although both coordinate 6 nitrogen donor atoms to Ni²⁺, the chelated en complex is nearly 10 billion times more stable.</p>
          </div>

          <TrapCard title="Ambidentate Ligand Naming — CORRECTED">
            <strong>NO₂⁻ bonded via N:</strong> called <strong>nitro</strong> (not "nitrito-N"). <strong>NO₂⁻ bonded via O:</strong> called <strong>nitrito</strong> (or nitrito-κO in modern IUPAC). Similarly, <strong>SCN⁻</strong> bonded via S = thiocyanato; bonded via N = isothiocyanato.
          </TrapCard>

          <div className="space-y-3">
            <SectionBanner label="Homoleptic vs Heteroleptic + Double Salts vs Complex" color="violet" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Homoleptic', desc: 'Only one type of ligand', ex: '[Co(NH₃)₆]³⁺ — all NH₃', color: 'cyan' },
                { label: 'Heteroleptic', desc: 'More than one type of ligand', ex: '[Co(NH₃)₄Cl₂]⁺ — NH₃ and Cl⁻', color: 'violet' },
                { label: 'Double Salt', desc: 'Two salts, loses identity in solution', ex: "Mohr's salt (NH₄)₂Fe(SO₄)₂·6H₂O → gives Fe²⁺, NH₄⁺, SO₄²⁻ ions freely", color: 'amber' },
                { label: 'Coordination Compound', desc: 'Complex ion retains identity in solution', ex: 'K₄[Fe(CN)₆] → gives K⁺ and [Fe(CN)₆]⁴⁻ — CN⁻ is NOT free', color: 'emerald' },
              ].map(c => (
                <div key={c.label} className={`p-3 rounded-xl bg-${c.color}-500/5 border border-${c.color}-500/15`}>
                  <div className={`text-${c.color}-300 font-bold text-[12.5px]`}>{c.label}</div>
                  <div className="text-white/60 text-[12px] mt-1">{c.desc}</div>
                  <div className="text-white/40 text-[11px] italic mt-1">{c.ex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 3: Werner's Theory + EAN ─────────────────────────────── */}
      <Collapsible title="3 · Werner's Theory & EAN Rule" icon={<Star className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-3">
            <SectionBanner label="Werner's Two Valencies" color="amber" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
                <div className="text-amber-300 font-bold text-[12.5px]">Primary Valency</div>
                <ul className="text-white/65 text-[12px] mt-2 space-y-1">
                  <li>Ionizable in solution</li>
                  <li>Corresponds to oxidation state</li>
                  <li>Satisfied by anions in outer sphere (counter ions)</li>
                  <li>Shown by dashed lines in Werner's notation</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
                <div className="text-cyan-300 font-bold text-[12.5px]">Secondary Valency</div>
                <ul className="text-white/65 text-[12px] mt-2 space-y-1">
                  <li>Non-ionizable — fixed</li>
                  <li>Corresponds to coordination number</li>
                  <li>Satisfied by ligands in inner sphere</li>
                  <li>Directional → determines geometry</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="AgNO₃ Evidence — All 4 Classic Experiments" color="rose" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    {['Formula','Complex Ion','Counter Cl⁻','AgCl ppt','1° Valency','2° Valency'].map(h => (
                      <th key={h} className="px-3 py-2.5 text-left text-white/40 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CoCl₃·6NH₃', '[Co(NH₃)₆]³⁺', '3 Cl⁻', '3 mol', '+3', '6'],
                    ['CoCl₃·5NH₃', '[Co(NH₃)₅Cl]²⁺', '2 Cl⁻', '2 mol', '+3', '6'],
                    ['CoCl₃·4NH₃', '[Co(NH₃)₄Cl₂]⁺', '1 Cl⁻', '1 mol', '+3', '6'],
                    ['CoCl₃·3NH₃', '[Co(NH₃)₃Cl₃]', '0 Cl⁻', '0 mol', '+3', '6'],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      <td className="px-3 py-2.5 font-mono text-amber-300 text-[11px]">{row[0]}</td>
                      <td className="px-3 py-2.5 font-mono text-cyan-300 text-[11px]">{row[1]}</td>
                      <td className="px-3 py-2.5 text-white/60">{row[2]}</td>
                      <td className="px-3 py-2.5 font-bold text-rose-300">{row[3]}</td>
                      <td className="px-3 py-2.5 text-white/60">{row[4]}</td>
                      <td className="px-3 py-2.5 text-emerald-300 font-bold">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11.5px] text-white/45">Key insight: All four compounds have the same primary valency (+3) and same secondary valency (6). Only the ratio of coordinated vs free Cl⁻ changes.</p>
          </div>

          <div className="space-y-3">
            <SectionBanner label="EAN Rule (Effective Atomic Number)" color="violet" />
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-2">
              <div className="font-mono text-violet-300 text-[14px] font-bold text-center">EAN = Z − oxidation state + total electrons donated by ligands</div>
              <div className="text-white/50 text-[12px] text-center">For monodentate 2-electron donors: EAN = Z − OS + 2 × CN (shortcut)</div>
            </div>
            <p>If EAN equals the atomic number of the <strong className="text-white">next noble gas</strong>, the complex tends to be stable. This is a useful but imperfect rule.</p>
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead><tr className="border-b border-white/8 bg-white/3">{['Complex','Z','OS','2×CN','EAN','Noble Gas?'].map(h=><th key={h} className="px-3 py-2 text-left text-white/40 font-bold">{h}</th>)}</tr></thead>
                <tbody>
                  {[
                    ['[Fe(CN)₆]⁴⁻','26','-2','12','36','Kr (36) ✓'],
                    ['[Co(NH₃)₆]³⁺','27','-3','12','36','Kr (36) ✓'],
                    ['Ni(CO)₄','28','0','8','36','Kr (36) ✓'],
                    ['[Fe(CN)₆]³⁻','26','-3','12','35','No (Kr=36) ✗'],
                  ].map((r,i)=>(
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      {r.map((cell, j) => <td key={j} className={`px-3 py-2 ${j===0?'font-mono text-white/80':j===5?cell.includes('✓')?'text-emerald-300 font-bold':'text-rose-300':'text-white/60'}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ProTip>
              <strong>EAN works well for metal carbonyls but has many exceptions:</strong>
              <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                <li>[Fe(CN)₆]³⁻: EAN = 26 − 3 + 12 = 35 (does not reach Kr, but very stable)</li>
                <li>[Cu(NH₃)₄]²⁺: EAN = 29 − 2 + 8 = 35 (stable, common)</li>
                <li>[Pt(Cl)₆]²⁻: EAN = 78 − 4 + 12 = 86 (reaches Rn, stable)</li>
                <li>[Ni(NH₃)₆]²⁺: EAN = 28 − 2 + 12 = 38 (exceeds Kr, but stable)</li>
              </ul>
              Never use EAN as an absolute stability predictor for non-carbonyl complexes.
            </ProTip>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 4: IUPAC Nomenclature ────────────────────────────────── */}
      <Collapsible title="4 · IUPAC Nomenclature" icon={<BookOpen className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-3">
            <SectionBanner label="Naming Order" color="cyan" />
            <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
              {['Ligands (alphabetical)', '→', 'Metal name', '→', 'OS (Roman numerals)'].map((s, i) => (
                s === '→' ? <span key={i} className="text-white/30 font-bold">{s}</span>
                  : <span key={i} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-bold">{s}</span>
              ))}
            </div>
            <div className="space-y-2 text-[12.5px]">
              {[
                { rule: 'Anionic ligand names', detail: 'End in "-o": chlorido (or chloro), cyanido (or cyano), hydroxido, oxalato, nitro (N-bonded), nitrito (O-bonded)' },
                { rule: 'Neutral ligand names', detail: 'Special names: H₂O → aqua, NH₃ → ammine (double m!), CO → carbonyl, NO → nitrosyl' },
                { rule: 'Anionic complex metal', detail: 'Use Latin names: Fe → ferrate, Cu → cuprate, Ag → argentate, Au → aurate, Sn → stannate, Pb → plumbate. Others: Co → cobaltate, Ni → nickelate, Pt → platinate' },
                { rule: 'Prefix for ligands', detail: 'di, tri, tetra... for simple ligands. bis, tris, tetrakis... for ligands whose names already contain a number prefix (e.g., en → bis(ethane-1,2-diamine))' },
              ].map(r => (
                <div key={r.rule} className="p-3 rounded-xl bg-white/3 border border-white/8">
                  <div className="text-cyan-300 font-bold text-[11.5px]">{r.rule}</div>
                  <div className="text-white/60 text-[12px] mt-1">{r.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <SectionBanner label="Worked Examples" color="violet" />
            {[
              { formula: '[Co(NH₃)₆]Cl₃', name: 'hexaamminecobalt(III) chloride', note: 'Cationic complex → English metal name' },
              { formula: 'K₃[Fe(CN)₆]', name: 'potassium hexacyanidoferrate(III)', note: 'Anionic complex → Latin name: ferrate' },
              { formula: '[Co(en)₂Cl₂]Cl', name: 'dichloridodibis(ethane-1,2-diamine)cobalt(III) chloride', note: 'bis- prefix because en has a number in its name' },
              { formula: 'K₄[Fe(CN)₆]', name: 'potassium hexacyanidoferrate(II)', note: 'Fe²⁺ → ferrate(II)' },
              { formula: '[Pt(NH₃)₂Cl₂]', name: 'dichloridodiamminplatinum(II)', note: 'Neutral complex; Cl before NH₃ alphabetically (c before a)' },
            ].map(ex => (
              <div key={ex.formula} className="p-3 rounded-xl bg-[#090b18] border border-white/8 space-y-1">
                <div className="font-mono text-amber-300 text-[12.5px] font-bold">{ex.formula}</div>
                <div className="text-violet-300 text-[13px] font-bold">→ {ex.name}</div>
                <div className="text-white/40 text-[11px] italic">{ex.note}</div>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 5: Isomerism ──────────────────────────────────────────── */}
      <Collapsible title="5 · Structural Isomerism" icon={<Layers className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          {[
            {
              type: 'Ionization Isomerism', color: 'violet',
              desc: 'Ligand and counter ion exchange positions.',
              ex1: '[Co(NH₃)₅SO₄]Br — gives AgBr precipitate with AgNO₃',
              ex2: '[Co(NH₃)₅Br]SO₄ — gives BaSO₄ ppt with BaCl₂',
            },
            {
              type: 'Linkage Isomerism', color: 'amber',
              desc: 'Ambidentate ligand bonds via different donor atoms.',
              ex1: '[Co(NH₃)₅(NO₂)]²⁺ — N-bonded (nitro), stable',
              ex2: '[Co(NH₃)₅(ONO)]²⁺ — O-bonded (nitrito), less stable',
            },
            {
              type: 'Solvate (Hydrate) Isomerism', color: 'cyan',
              desc: 'Water (or solvent) molecules shift between inner and outer coordination sphere.',
              ex1: '[Cr(H₂O)₆]Cl₃ — violet; 3 Cl⁻ ionizable',
              ex2: '[Cr(H₂O)₅Cl]Cl₂·H₂O — green; 2 Cl⁻ ionizable, 1 Cl in sphere',
            },
            {
              type: 'Coordination Isomerism', color: 'rose',
              desc: 'In salts with two complex ions, distribution of ligands between the cationic and anionic complex differs.',
              ex1: '[Co(NH₃)₆][Cr(CN)₆] — all NH₃ on Co, all CN⁻ on Cr',
              ex2: '[Cr(NH₃)₆][Co(CN)₆] — all NH₃ on Cr, all CN⁻ on Co',
            },
          ].map(iso => (
            <div key={iso.type} className={`p-4 rounded-2xl bg-${iso.color}-500/5 border border-${iso.color}-500/15 space-y-2`}>
              <div className={`text-${iso.color}-300 font-bold text-[13px]`}>{iso.type}</div>
              <div className="text-white/60 text-[12.5px]">{iso.desc}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px]">
                <div className="font-mono text-white/70 bg-white/3 p-2 rounded-lg">{iso.ex1}</div>
                <div className="font-mono text-white/70 bg-white/3 p-2 rounded-lg">{iso.ex2}</div>
              </div>
            </div>
          ))}
        </div>
      </Collapsible>

      {/* ── SECTION 6: Stereoisomerism ────────────────────────────────────── */}
      <Collapsible title="6 · Stereoisomerism (Geometric & Optical)" icon={<BarChart3 className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-3">
            <SectionBanner label="Geometric Isomerism" color="rose" />
            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    {['Complex Type', 'Geometry', 'Isomers', 'Names', 'Example'].map(h => <th key={h} className="px-3 py-2.5 text-left text-white/40 font-bold">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['[MA₂B₂]', 'Sq. Planar', '2', 'cis / trans', '[Pt(NH₃)₂Cl₂] — cis-platin!'],
                    ['[MABCD]', 'Sq. Planar', '3', '—', '[Pt(NH₃)(py)(Cl)(Br)]'],
                    ['[MA₃B]', 'Sq. Planar', '0 (1 only)', 'No isomerism', '[Pt(NH₃)₃Cl]⁺'],
                    ['[MA₄B₂]', 'Octahedral', '2', 'cis / trans', '[Co(NH₃)₄Cl₂]⁺'],
                    ['[MA₃B₃]', 'Octahedral', '2', 'fac / mer', '[Rh(NH₃)₃Cl₃]'],
                    ['[MA₂B₂C₂]', 'Octahedral', '5', 'several', '[Co(NH₃)₂(en)(NO₂)₂]⁺'],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      {r.map((cell, j) => <td key={j} className={`px-3 py-2 ${j===0?'font-mono text-rose-300':j===2?'text-amber-300 font-bold':j===4?'text-white/50 text-[11px]':'text-white/65'}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ExamTip>[MA₃B] and [MAB₃] square-planar types have ZERO geometric isomers — only one arrangement exists. This is a classic trap question.</ExamTip>

            <GeometricalIsomerSketches />

            {/* Trans Effect Card */}
            <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-2 mt-3">
              <div className="text-violet-300 font-bold text-[12.5px] uppercase tracking-wider">The Trans Effect (Advanced IAT Concept)</div>
              <p className="text-[12.5px] text-white/65">In square-planar substitution reactions, the rate of substitution of a ligand trans to a given group is affected by the nature of that group. A strong trans-directing group labilizes the bond opposite to it, directing incoming ligands to the trans position.</p>
              <div className="p-3 rounded-lg bg-white/3 font-mono text-[11.5px] text-cyan-300">
                Trans Effect Order: H₂O &lt; OH⁻ &lt; NH₃ &lt; Cl⁻ &lt; Br⁻ &lt; I⁻ &lt; PR₃ &lt; CO &lt; CN⁻
              </div>
              <p className="text-[11.5px] text-white/45">Use this series to predict which product (cis or trans) forms when substituting square planar complexes sequentially.</p>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Optical Isomerism (Correct Explanation)" color="violet" />
            <p>A complex exhibits optical isomerism if it is <strong className="text-white">non-superimposable on its mirror image</strong>. This occurs when the molecule lacks:</p>
            <ul className="list-disc list-inside space-y-1 ml-2 text-white/65 text-[13px]">
              <li>A plane of symmetry (σ)</li>
              <li>A centre of inversion (i)</li>
              <li>An improper rotation axis (Sₙ)</li>
            </ul>
            <p>The two non-superimposable mirror images are called <strong className="text-white">enantiomers</strong> — Δ (delta, right-handed) and Λ (lambda, left-handed) forms.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/15 space-y-2">
                <div className="text-violet-300 font-bold">Optically ACTIVE (chiral)</div>
                <ul className="text-white/65 space-y-1">
                  <li>▸ [M(en)₃]ⁿ⁺ — propeller shape, always chiral</li>
                  <li>▸ cis-[M(en)₂Cl₂]⁺ — no mirror plane</li>
                  <li>▸ cis-[M(AA)₂B₂] — if no σ plane</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 space-y-2">
                <div className="text-rose-400 font-bold">Optically INACTIVE (achiral)</div>
                <ul className="text-white/65 space-y-1">
                  <li>▸ trans-[M(en)₂Cl₂]⁺ — has σ plane</li>
                  <li>▸ Square planar — always has σh</li>
                  <li>▸ [MA₄B₂] — both cis and trans are achiral</li>
                </ul>
              </div>
            </div>

            <OpticalIsomerPropellers />

            <TrapCard title="Optical Isomerism Rule Correction">
              Do NOT say "only cis isomers of [M(AA)₂B₂] are optically active" as a universal formula rule. The correct criterion is <strong>molecular symmetry</strong>. For [M(AA)₂B₂], the cis isomer IS optically active (no σ), but this is a consequence of symmetry analysis — not a formula rule to memorize blindly. Always analyze σ, i, and Sₙ.
            </TrapCard>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 7: VBT ────────────────────────────────────────────────── */}
      <Collapsible title="7 · Valence Bond Theory (VBT)" icon={<Atom className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">
          <p>VBT explains metal-ligand bonding as overlap between a filled ligand orbital (lone pair) and an <strong className="text-white">empty hybrid orbital</strong> on the metal.</p>

          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-white/8 bg-white/3">
                  {['CN','Hybridization','Geometry','Orbital type','d orbitals used','Example'].map(h => <th key={h} className="px-3 py-2.5 text-left text-white/40 font-bold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  ['4', 'sp³', 'Tetrahedral', 'Outer (high spin)', 's, px, py, pz', '[NiCl₄]²⁻'],
                  ['4', 'dsp²', 'Square Planar', 'Inner (low spin)', 'dx²-y², s, px, py', '[Ni(CN)₄]²⁻'],
                  ['6', 'd²sp³', 'Octahedral (inner)', 'Inner (low spin)', 'Two (n-1)d + s + px + py + pz', '[Co(NH₃)₆]³⁺'],
                  ['6', 'sp³d²', 'Octahedral (outer)', 'Outer (high spin)', 's + px + py + pz + dz² + dx²-y²', '[CoF₆]³⁻'],
                ].map((r, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                    {r.map((cell, j) => (
                      <td key={j} className={`px-3 py-2.5 ${j===1?'font-mono text-cyan-300 font-bold':j===2?'text-violet-300':j===3?cell.includes('Inner')?'text-emerald-300':'text-amber-300':j===5?'text-white/50 text-[11px]':'text-white/65'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Inner vs Outer Orbital Complexes" color="amber" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-2">
                <div className="text-emerald-400 font-bold">Inner Orbital (Low Spin)</div>
                <div className="text-white/65 space-y-1">
                  <p>Uses <strong className="text-white">(n−1)d</strong> orbitals.</p>
                  <p>Hybridization: d²sp³ (octahedral), dsp² (sq. planar)</p>
                  <p>Formed with <strong className="text-white">strong-field ligands</strong> (CN⁻, CO, en, NH₃)</p>
                  <p>Often paramagnetic or diamagnetic depending on d-count</p>
                  <p>More stable, less magnetic moment</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 space-y-2">
                <div className="text-amber-400 font-bold">Outer Orbital (High Spin)</div>
                <div className="text-white/65 space-y-1">
                  <p>Uses <strong className="text-white">nd</strong> orbitals (same period).</p>
                  <p>Hybridization: sp³d² (octahedral), sp³ (tetrahedral)</p>
                  <p>Formed with <strong className="text-white">weak-field ligands</strong> (Cl⁻, F⁻, Br⁻)</p>
                  <p>Generally more paramagnetic (more unpaired e⁻)</p>
                  <p>Less stable</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Limitations of VBT" color="rose" />
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15">
              <p className="text-rose-300 font-bold text-[12.5px] mb-2">VBT cannot explain:</p>
              <ul className="text-white/65 text-[12.5px] space-y-1.5">
                <li className="flex gap-1.5"><span className="text-rose-400 shrink-0">✗</span>Color of coordination compounds (no energy-level picture)</li>
                <li className="flex gap-1.5"><span className="text-rose-400 shrink-0">✗</span>Why some complexes are high-spin and others low-spin</li>
                <li className="flex gap-1.5"><span className="text-rose-400 shrink-0">✗</span>Thermodynamic stability quantitatively</li>
                <li className="flex gap-1.5"><span className="text-rose-400 shrink-0">✗</span>Electronic spectra</li>
                <li className="flex gap-1.5"><span className="text-rose-400 shrink-0">✗</span>Exact magnetic behavior in all cases</li>
              </ul>
              <p className="text-white/50 text-[12px] mt-2 italic">→ These failures motivated the development of Crystal Field Theory (CFT)</p>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 8: CFT — Octahedral ──────────────────────────────────── */}
      <Collapsible title="8 · Crystal Field Theory — Octahedral Splitting" icon={<BarChart3 className="w-4 h-4" />} accent="violet" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">
          <p>In CFT, ligands are treated as <strong className="text-white">point charges</strong> (or dipoles). Their electrostatic field breaks the degeneracy of the five d-orbitals, splitting them into groups of different energies.</p>

          <OctahedralSplittingDiagram />

          <div className="space-y-3">
            <SectionBanner label="High-Spin vs Low-Spin (d⁴–d⁷)" color="rose" />
            <p>For d⁴, d⁵, d⁶, d⁷ configurations, the electron filling depends on a competition:</p>
            <div className="grid grid-cols-2 gap-3 text-center text-[12.5px]">
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/15">
                <div className="text-rose-300 font-bold mb-1">Strong field (Δo {'>'} P)</div>
                <div className="text-white/65">Electrons pair in t₂g before entering eg</div>
                <div className="text-emerald-300 font-bold mt-1">LOW SPIN — fewer unpaired e⁻</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                <div className="text-amber-300 font-bold mb-1">Weak field (Δo {'<'} P)</div>
                <div className="text-white/65">Electrons enter eg before pairing in t₂g (Hund's rule dominates)</div>
                <div className="text-rose-300 font-bold mt-1">HIGH SPIN — more unpaired e⁻</div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/8">
              <table className="w-full text-[11.5px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/3">
                    {['d-count','HS config','LS config','HS unpaired','LS unpaired','Example (LS)','Example (HS)'].map(h=><th key={h} className="px-2 py-2 text-left text-white/40 font-bold text-[11px]">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['d⁴','t₂g³eg¹','t₂g⁴','4','2','[Cr(CN)₆]²⁻','[CrF₆]³⁻'],
                    ['d⁵','t₂g³eg²','t₂g⁵','5','1','[Fe(CN)₆]³⁻','[FeF₆]³⁻'],
                    ['d⁶','t₂g⁴eg²','t₂g⁶','4','0','[Fe(CN)₆]⁴⁻','[FeF₆]⁴⁻'],
                    ['d⁷','t₂g⁵eg²','t₂g⁶eg¹','3','1','[Co(CN)₆]⁴⁻','[CoF₆]³⁻'],
                  ].map((r,i)=>(
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      {r.map((cell,j)=>(
                        <td key={j} className={`px-2 py-2 ${j===0?'font-bold text-white':j===3?'text-amber-300 font-bold':j===4?'text-emerald-300 font-bold':j<=2?'font-mono text-[11px] text-white/60':'text-white/50 text-[10.5px]'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="CFSE — Crystal Field Stabilization Energy" color="emerald" />
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center space-y-2">
              <div className="font-mono text-emerald-300 text-[15px] font-black">CFSE = [−0.4·n(t₂g) + 0.6·n(eg)] × Δo</div>
              <div className="font-mono text-cyan-300 text-[13.5px] font-bold">Or in Dq units: CFSE = [−4·n(t₂g) + 6·n(eg)] × Dq  (where Δo = 10 Dq)</div>
              <div className="text-white/50 text-[12px]">n = number of electrons in each set</div>
              <div className="text-white/40 text-[11.5px]">If pairing is involved, add pairing energy P separately: ΔE_total = CFSE + m·P, where m = extra paired electrons vs free ion</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11.5px] text-center">
              {[
                { config: 't₂g³eg⁰', cfse: '−1.2 Δo (−12 Dq)', label: 'd³ (always)' },
                { config: 't₂g⁶eg⁰', cfse: '−2.4 Δo (−24 Dq)', label: 'd⁶ low spin' },
                { config: 't₂g³eg²', cfse: '0 Δo (0 Dq)', label: 'd⁵ high spin' },
                { config: 't₂g⁶eg²', cfse: '−0.6 Δo (−6 Dq)', label: 'd⁸ (always)' },
              ].map(e => (
                <div key={e.config} className="p-2 rounded-lg bg-white/3 border border-white/8">
                  <div className="font-mono text-white/70 text-[10.5px]">{e.config}</div>
                  <div className="text-emerald-300 font-bold mt-1">{e.cfse}</div>
                  <div className="text-white/40 text-[10px]">{e.label}</div>
                </div>
              ))}
            </div>

            {/* Worked Example with pairing energy correction */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-2 mt-3 text-[12.5px]">
              <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Worked Example: d⁶ Octahedral Complex (e.g. [Fe(CN)₆]⁴⁻ vs [Fe(H₂O)₆]²⁺)</div>
              
              <div className="space-y-1 bg-white/3 p-3 rounded-lg">
                <div className="text-cyan-300 font-bold">1. Strong-field case: [Fe(CN)₆]⁴⁻ (Low Spin)</div>
                <div>d-electron count = 6. Config = t₂g⁶ eg⁰.</div>
                <div>CFSE = 6 × (−0.4)Δo + 0 = −2.4 Δo (or −24 Dq)</div>
                <div>Pairing correction: In free Fe²⁺ ion, there is 1 pair of electrons (d⁶ = ↑↓ ↑ ↑ ↑ ↑). In low-spin [Fe(CN)₆]⁴⁻, there are 3 pairs (t₂g⁶ = ↑↓ ↑↓ ↑↓). Extra pairs (m) = 3 − 1 = 2.</div>
                <div className="font-mono text-emerald-300 font-bold">ΔE_total = −2.4 Δo + 2P  (or −24 Dq + 2P)</div>
              </div>

              <div className="space-y-1 bg-white/3 p-3 rounded-lg">
                <div className="text-amber-300 font-bold">2. Weak-field case: [Fe(H₂O)₆]²⁺ (High Spin)</div>
                <div>d-electron count = 6. Config = t₂g⁴ eg².</div>
                <div>CFSE = 4 × (−0.4)Δo + 2 × (+0.6)Δo = −0.4 Δo (or −4 Dq)</div>
                <div>Pairing correction: In high-spin complex, there is 1 pair of electrons (t₂g⁴ eg² = ↑↓ ↑ ↑ in t₂g, ↑ ↑ in eg). Extra pairs (m) = 1 − 1 = 0.</div>
                <div className="font-mono text-emerald-300 font-bold">ΔE_total = −0.4 Δo  (or −4 Dq)</div>
              </div>
              <p className="text-[11px] text-white/40 italic">Note: P is pairing energy (energy required to force two electrons into the same orbital, typically 15,000–25,000 cm⁻¹). If Δo &gt; P, low spin is more stable. If Δo &lt; P, high spin is more stable.</p>
            </div>
          </div>


          <div className="space-y-3">
            <SectionBanner label="Spectrochemical Series" color="cyan" />
            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 overflow-x-auto">
              <div className="font-mono text-[11.5px] text-white/70 whitespace-nowrap">
                I⁻ {'<'} Br⁻ {'<'} SCN⁻ {'<'} Cl⁻ {'<'} S²⁻ {'<'} F⁻ {'<'} OH⁻ {'<'} C₂O₄²⁻ {'<'} H₂O {'<'} NCS⁻ {'<'} EDTA⁴⁻ {'<'} NH₃ {'<'} en {'<'} CN⁻ {'<'} CO
              </div>
              <div className="flex justify-between mt-2 text-[10px]">
                <span className="text-rose-400 font-bold">← Weak field (high spin)</span>
                <span className="text-emerald-400 font-bold">Strong field (low spin) →</span>
              </div>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 9: Tetrahedral & Square-Planar CFT ────────────────────── */}
      <Collapsible title="9 · Tetrahedral & Square-Planar Splitting" icon={<BarChart3 className="w-4 h-4" />} accent="cyan" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-3">
            <SectionBanner label="Tetrahedral Crystal Field" color="amber" />
            <p>In a tetrahedral field, ligands approach along the body diagonals — NOT along x, y, z axes. This causes the <strong className="text-white">inverse splitting</strong> compared to octahedral:</p>
            <TetrahedralSplittingDiagram />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12.5px]">
              <div className="p-3 rounded-xl bg-white/3 border border-white/8 text-center">
                <div className="text-white/40 text-[10px] uppercase">e set (lower)</div>
                <div className="text-emerald-300 font-bold mt-1">dz², dx²-y²</div>
                <div className="text-white/40 text-[10px]">2 orbitals</div>
              </div>
              <div className="p-3 rounded-xl bg-white/3 border border-white/8 text-center">
                <div className="text-white/40 text-[10px] uppercase">t₂ set (higher)</div>
                <div className="text-rose-300 font-bold mt-1">dxy, dyz, dxz</div>
                <div className="text-white/40 text-[10px]">3 orbitals</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-white/40 text-[10px] uppercase">Key relation</div>
                <div className="text-amber-300 font-bold font-mono mt-1">Δt = 4/9 Δo</div>
                <div className="text-white/40 text-[10px]">Always high spin</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Square-Planar Crystal Field (d⁸)" color="violet" />
            <p>Square-planar geometry can be derived by removing 2 axial ligands from an octahedral field. The dx²-y² orbital points directly at ligands → highest energy. Important for <strong className="text-white">d⁸ ions: Ni²⁺, Pd²⁺, Pt²⁺</strong>.</p>
            <SquarePlanarSplittingDiagram />
            <ExamTip>d⁸ square-planar complexes with strong-field ligands (CN⁻) are <strong>diamagnetic</strong> — all 8 electrons fill the four lower d-levels, leaving dx²-y² empty. [Ni(CN)₄]²⁻ is square-planar and diamagnetic. [NiCl₄]²⁻ is tetrahedral (weak field) and paramagnetic (2 unpaired e⁻).</ExamTip>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Jahn-Teller Distortion" color="amber" />
            <p>The <strong className="text-white">Jahn-Teller theorem</strong> states that any non-linear molecular system in an electronically degenerate state will undergo a geometrical distortion that removes the degeneracy, lowering its overall symmetry and energy. Most common in <strong className="text-white">d⁹ (Cu²⁺)</strong> and high-spin d⁴ complexes.</p>
            <JahnTellerDistortionDiagram />
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 10: Color & Magnetic Properties ───────────────────────── */}
      <Collapsible title="10 · Color & Magnetic Properties" icon={<Star className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-5 text-[13.5px] text-white/75 leading-relaxed">
          <div className="space-y-3">
            <SectionBanner label="Color — d-d Transitions" color="violet" />
            <p>When white light hits a coordination compound, the energy Δo corresponds to a specific visible wavelength. Electrons absorb that wavelength, jumping from t₂g → eg. The <strong className="text-white">complementary color</strong> is transmitted/reflected and observed.</p>
            
            <ColorWheelDiagram />

            <div className="overflow-x-auto rounded-xl border border-white/8">

              <table className="w-full text-[12px]">
                <thead><tr className="border-b border-white/8 bg-white/3">{['Absorbed Color','Wavelength (nm)','Observed Color','Example Ion'].map(h=><th key={h} className="px-3 py-2 text-left text-white/40 font-bold">{h}</th>)}</tr></thead>
                <tbody>
                  {[
                    ['Violet','400–430','Yellow-green','Ti(H₂O)₆]³⁺'],
                    ['Blue','430–480','Orange','[Co(H₂O)₆]²⁺'],
                    ['Green','490–560','Red-purple','—'],
                    ['Yellow','560–590','Violet','—'],
                    ['Orange','590–620','Blue','—'],
                    ['Red','620–700','Green','[Ni(H₂O)₆]²⁺'],
                  ].map((r,i)=>(
                    <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                      {r.map((cell,j)=><td key={j} className={`px-3 py-2.5 ${j===0||j===2?'font-bold text-white/80':j===3?'font-mono text-violet-300 text-[11px]':'text-white/55'}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TrapCard title="d⁰ and d¹⁰ are Colorless">
              [Ti(H₂O)₆]³⁺ (d¹) is purple — one electron can undergo d-d transition. But [Sc(H₂O)₆]³⁺ (d⁰) and [Zn(H₂O)₆]²⁺ (d¹⁰) are colorless — no d-d transition possible. MnO₄⁻ (Mn⁷⁺ = d⁰) is colored by charge-transfer, not d-d.
            </TrapCard>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Magnetic Properties — Full CFT Procedure" color="rose" />
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/15 text-[13px] space-y-2">
              <div className="text-rose-400 font-bold mb-2">Complete Analysis Procedure:</div>
              {['1. Determine metal oxidation state from overall charge and ligand charges', '2. Find d-electron count: d(n) = Z − 18 − OS', '3. Identify geometry from CN (4 → Tet/Sq.Pl., 6 → Oct)', '4. Check ligand strength (spectrochemical series)', '5. Fill orbitals: low/high spin for d⁴–d⁷; unique for d¹–d³ and d⁸–d¹⁰', '6. Count unpaired electrons (n)', '7. Apply μ = √[n(n+2)] BM'].map((step, i) => (
                <div key={i} className="flex gap-2 text-[12.5px]">
                  <span className="text-rose-400 font-black shrink-0 w-4">{i+1}.</span>
                  <span className="text-white/70">{step}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
              {[
                { complex: '[Fe(CN)₆]⁴⁻', steps: 'Fe²⁺ → d⁶ | Oct | CN⁻ strong | Low spin | t₂g⁶eg⁰ | n=0 | μ=0 BM', nature: 'Diamagnetic', color: 'cyan' },
                { complex: '[FeF₆]³⁻', steps: 'Fe³⁺ → d⁵ | Oct | F⁻ weak | High spin | t₂g³eg² | n=5 | μ=5.92 BM', nature: 'Paramagnetic', color: 'rose' },
                { complex: '[Co(NH₃)₆]³⁺', steps: 'Co³⁺ → d⁶ | Oct | NH₃ strong | Low spin | t₂g⁶eg⁰ | n=0 | μ=0 BM', nature: 'Diamagnetic', color: 'cyan' },
                { complex: '[CoF₆]³⁻', steps: 'Co³⁺ → d⁶ | Oct | F⁻ weak | High spin | t₂g⁴eg² | n=4 | μ=4.90 BM', nature: 'Paramagnetic', color: 'rose' },
              ].map(ex => (
                <div key={ex.complex} className={`p-3 rounded-xl bg-${ex.color}-500/5 border border-${ex.color}-500/15 space-y-1.5`}>
                  <div className="font-mono text-white/90 font-bold">{ex.complex}</div>
                  <div className="text-white/55 text-[11.5px]">{ex.steps}</div>
                  <div className={`text-${ex.color}-300 font-bold text-[12px]`}>{ex.nature}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <SectionBanner label="Limitations of CFT" color="amber" />
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
              <ul className="text-white/65 text-[12.5px] space-y-1.5">
                <li className="flex gap-1.5"><span className="text-amber-400">✗</span>Assumes purely electrostatic (ionic) metal-ligand interaction — ignores covalent character</li>
                <li className="flex gap-1.5"><span className="text-amber-400">✗</span>Cannot fully explain the spectrochemical series (CO is neutral, yet strongest field — due to π back-bonding, which CFT ignores)</li>
                <li className="flex gap-1.5"><span className="text-amber-400">✗</span>Does not account for π-bonding (back donation) in metal carbonyls</li>
                <li className="flex gap-1.5"><span className="text-amber-400">✗</span>Treats ligands as structureless point charges — no orbital information</li>
              </ul>
            </div>
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 11: Metal Carbonyls ───────────────────────────────────── */}
      <Collapsible title="11 · Metal Carbonyls & Synergic Bonding" icon={<FlaskConical className="w-4 h-4" />} accent="emerald" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <p>Metal carbonyls contain CO as a ligand. CO is a weak σ-donor but a strong π-acceptor — this combination makes it the <strong className="text-white">strongest-field ligand</strong> in the spectrochemical series.</p>
          <div className="p-5 rounded-2xl bg-[#090b18] border border-white/8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-emerald-300 font-bold text-[12.5px]">σ-Bond (CO → Metal)</div>
                <p className="text-white/65 text-[12px]">Lone pair on C of CO donates into a <strong className="text-white">vacant metal orbital</strong>. This is the conventional coordinate bond.</p>
              </div>
              <div className="space-y-2">
                <div className="text-violet-300 font-bold text-[12.5px]">π-Back-Bond (Metal → CO)</div>
                <p className="text-white/65 text-[12px]">Filled metal d-orbital (t₂g) back-donates into the <strong className="text-white">vacant antibonding π* orbital of CO</strong>. This is back-donation or back-bonding.</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/15 text-[12.5px] space-y-1">
              <div className="text-violet-400 font-bold">Net Effect of Synergic Bonding:</div>
              <ul className="text-white/65 space-y-1">
                <li className="flex gap-1.5"><span className="text-violet-400">▸</span><strong className="text-white">M-C bond strengthened</strong> (both σ and π contributions)</li>
                <li className="flex gap-1.5"><span className="text-violet-400">▸</span><strong className="text-white">C-O bond weakened</strong> — electrons in CO π* weaken the C≡O bond → ν(CO) decreases in IR spectrum</li>
                <li className="flex gap-1.5"><span className="text-violet-400">▸</span>More back-donation → shorter M-C, longer C-O (↑ bond length)</li>
              </ul>
            </div>
          </div>
          <SynergicBondingDiagram />

          <div className="overflow-x-auto rounded-xl border border-white/8 mt-3">
            <table className="w-full text-[12px]">
              <thead><tr className="border-b border-white/8 bg-white/3">{['Compound','Formula','Metal OS','Structure','ν(CO) stretching freq','EAN check'].map(h=><th key={h} className="px-3 py-2 text-left text-white/40 font-bold">{h}</th>)}</tr></thead>
              <tbody>
                {[
                  ['Nickel carbonyl','Ni(CO)₄','0','Tetrahedral','2057 cm⁻¹ (vs free CO: 2143 cm⁻¹)','28 + 8 = 36 (Kr)'],
                  ['Iron pentacarbonyl','Fe(CO)₅','0','Trigonal bipyramidal','2013, 2031 cm⁻¹','26 + 10 = 36 (Kr)'],
                  ['Chromium hexacarbonyl','Cr(CO)₆','0','Octahedral','2000 cm⁻¹','24 + 12 = 36 (Kr)'],
                ].map((r,i)=>(
                  <tr key={i} className="border-b border-white/5 hover:bg-white/3">
                    {r.map((cell,j)=><td key={j} className={`px-3 py-2.5 ${j===0?'text-white/80 font-bold':j===1?'font-mono text-emerald-300':j===5?'text-cyan-300':' text-white/65'}`}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11.5px] text-white/45">
            Note: The <strong className="text-rose-400">CO stretching frequency decreases</strong> from 2143 cm⁻¹ (free gas) to ~2000 cm⁻¹ in complexes. Stronger metal back-donation lowers the bond order of C-O, indicating a weaker C-O bond and a stronger M-C bond.
          </p>

        </div>
      </Collapsible>

      {/* ── SECTION 12: Applications ──────────────────────────────────────── */}
      <Collapsible title="12 · Applications" icon={<Star className="w-4 h-4" />} accent="amber" defaultOpen={false}>
        <div className="space-y-4 text-[13.5px] text-white/75 leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { area: 'Qualitative Analysis', color: 'cyan', items: ['Ni²⁺ + DMG (dimethylglyoxime) → red complex in ammoniacal solution', 'Fe³⁺ gives blood-red [Fe(SCN)n]³⁻ⁿ complex with SCN⁻', 'Cu²⁺ gives deep blue [Cu(NH₃)₄]²⁺ with excess NH₃'] },
              { area: 'Metallurgy', color: 'amber', items: ['Silver extraction: Ag dissolves in NaCN → [Ag(CN)₂]⁻, then Zn displaces Ag', 'Gold extraction similarly uses NaCN → [Au(CN)₂]⁻'] },
              { area: 'Biology & Hemoglobin Spin-State', color: 'emerald', items: ['Hemoglobin: Fe²⁺ in heme binds O₂. In deoxyhemoglobin, Fe²⁺ is high-spin (t₂g⁴eg²) with large ionic radius, sitting slightly out of the porphyrin ring plane.', 'On O₂ binding, Fe²⁺ transitions to low-spin (t₂g⁶eg⁰) with smaller ionic radius, slipping perfectly into the plane of the porphyrin ring. This structural shift triggers cooperative O₂ binding.', 'Chlorophyll: Mg²⁺ complex — photosynthesis', 'Vitamin B₁₂: Co³⁺ complex — essential for DNA synthesis'] },
              { area: 'Medicine & Complexometric Titration', color: 'violet', items: ['Cis-platin [Pt(NH₃)₂Cl₂] (cis-isomer) — anticancer drug; binds DNA', 'Trans-platin is NOT an anticancer drug (geometric isomers differ in activity!)', 'EDTA and related chelating agents used in metal-ion sequestration; chelation therapy under clinical supervision', 'Water Hardness: EDTA⁴⁻ is used to determine water hardness (concentration of Ca²⁺/Mg²⁺) via complexometric titrations with Eriochrome Black T (EBT) indicator.'] },
              { area: 'Catalysis', color: 'rose', items: ["Wilkinson's catalyst [RhCl(PPh₃)₃] — homogeneous hydrogenation", 'Ziegler-Natta catalyst TiCl₄ + AlEt₃ — polymerization of alkenes', 'V₂O₅ in Contact process (heterogeneous)'] },
            ].map(a => (
              <div key={a.area} className={`p-4 rounded-xl bg-${a.color}-500/5 border border-${a.color}-500/15 space-y-2`}>
                <div className={`text-${a.color}-300 font-bold text-[12.5px] uppercase tracking-wider`}>{a.area}</div>
                <ul className="space-y-1">
                  {a.items.map((item, i) => <li key={i} className="flex gap-1.5 text-[12px] text-white/65"><span className={`text-${a.color}-400 shrink-0`}>▸</span>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Collapsible>

      {/* ── SECTION 13: Common Mistakes & IAT Shortcuts ───────────────────── */}
      <Collapsible title="13 · Common Mistakes & IAT Shortcuts" icon={<Zap className="w-4 h-4" />} accent="rose" defaultOpen={false}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {[
              { title: 'Nitro vs Nitrito', body: 'NO₂⁻ bonded via N = NITRO (not "nitrito-N"). Bonded via O = NITRITO. This is a common exam error.' },
              { title: 'CN ≠ Oxidation State', body: 'Coordination number and oxidation state are completely independent. Always determine OS first from charges, then count donor atoms for CN.' },
              { title: '[MA₃B] has NO geometric isomers', body: 'Square planar [MA₃B] or [MAB₃] — only one arrangement. Zero geometric isomers. A classic trap that tricks students into writing two structures.' },
              { title: 'Cis-platin = cis isomer only', body: '[Pt(NH₃)₂Cl₂]: only the CIS isomer is the anticancer drug. The TRANS isomer (transplatin) has no clinical anticancer activity. Geometric isomers have dramatically different biological properties.' },
              { title: 'Low-spin d⁶ → diamagnetic', body: 'The most-tested combination: d⁶ metal + strong field ligand (CN⁻, CO, en, NH₃) → t₂g⁶eg⁰ → 0 unpaired → diamagnetic. Examples: [Fe(CN)₆]⁴⁻, [Co(NH₃)₆]³⁺.' },
              { title: 'EAN rule has exceptions', body: "Do NOT say a complex 'is stable because it satisfies EAN'. EAN is a guide, not a law. [Fe(CN)₆]³⁻ (EAN = 35, not 36) is a well-known stable complex." },
              { title: 'Double m in ammine', body: 'NH₃ ligand is called AMMINE (double m). Not amine (organic compound). [Co(NH₃)₆]³⁺ = hexaamminecobalt(III), not hexaaminecobalt(III).' },
            ].map(trap => <TrapCard key={trap.title} title={trap.title}>{trap.body}</TrapCard>)}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              'Spectrochemical series: I⁻ < Br⁻ < SCN⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO. CO is strongest!',
              'Tetrahedral complexes: ALWAYS high spin (Δt = 4/9 Δo is too small to force pairing).',
              'Square planar: d⁸ metals + strong field → diamagnetic. d⁸ + weak field (Cl⁻) → tetrahedral + paramagnetic.',
              'Optical isomers exist when molecule has no σ, no i, no Sₙ. Propeller [M(en)₃] is always chiral.',
              'Coordinate isomerism: both cation AND anion are complexes; ligand distribution differs.',
              'CFSE for d³ and d⁸ is always fixed regardless of spin (−1.2 Δo and −0.6 Δo respectively).',
              'Back-bonding in CO: more back-donation → weaker C-O bond → longer C-O, lower ν(CO) in IR.',
              'Latin names: ferrate (Fe), cuprate (Cu), argentate (Ag), aurate (Au), stannate (Sn), plumbate (Pb), platinate (Pt).',
            ].map((tip, i) => <ExamTip key={i}>{tip}</ExamTip>)}
          </div>
        </div>
      </Collapsible>

      {/* ── INTERACTIVE STUDY LAB ─────────────────────────────────────────── */}
      <div className="rounded-3xl border border-white/8 overflow-hidden bg-[#090b18]">
        <div className="p-5 border-b border-white/8 bg-gradient-to-r from-emerald-500/5 to-violet-500/5">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-black tracking-widest text-emerald-400 uppercase">Interactive Study Lab</span>
          </div>
          <h2 className="text-lg font-black text-white">Coordination Chemistry Tools</h2>
          <p className="text-white/40 text-[12px] mt-1">Three tools to master the highest-frequency coordination compound concepts</p>
        </div>

        <div className="flex border-b border-white/8">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('flex items-center gap-2 px-4 py-3 text-[11.5px] font-bold border-b-2 transition-all flex-1 justify-center',
                activeTab === tab.id ? 'border-emerald-400 text-emerald-300 bg-emerald-500/5' : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/3')}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'analyzer' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Select a complex to trace the complete CFT analysis: OS → d-count → geometry → spin state → orbital filling → CFSE → unpaired e⁻ → magnetic moment.</p>
              <ComplexAnalyzer />
            </div>
          )}
          {activeTab === 'namer' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Build a coordination compound and get its IUPAC name (NCERT exam convention) with the complete ligand and metal name reference table.</p>
              <IUPACNamer />
            </div>
          )}
          {activeTab === 'isomers' && (
            <div className="space-y-3">
              <p className="text-white/50 text-[12px]">Select a complex formula type to see how many geometric and optical isomers it has, with correct symmetry-based explanation.</p>
              <IsomerCounter />
            </div>
          )}
        </div>
      </div>

      {/* ── RAPID REVISION ────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span className="text-[12px] font-black text-emerald-400 uppercase tracking-wider">Rapid Revision Checklist</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12.5px] text-white/70">
          {[
            'Coordination entity, coordination sphere, counter ions — know each term',
            'CN ≠ OS — completely independent quantities',
            'Werner: primary (ionizable) = OS; secondary (non-ionizable) = CN',
            'All 4 CoCl₃·xNH₃ experiments: 3, 2, 1, 0 mol AgCl',
            'EAN = Z − OS + 2×CN; useful but has exceptions',
            'Anionic ligands end in -o; NH₃ = ammine (double m); H₂O = aqua',
            'Latin metal names: Fe=ferrate, Cu=cuprate, Ag=argentate, Au=aurate',
            'Ambidentate: NO₂⁻ → nitro (N) or nitrito (O); SCN⁻ → two modes',
            'Coordination isomerism: both cation and anion are complexes',
            'Optical isomers: based on symmetry (σ, i, Sₙ) — not just formula',
            'VBT: d²sp³ = inner orbital; sp³d² = outer orbital octahedral',
            'VBT cannot explain color — CFT is needed',
            'CFT octahedral: t₂g (lower, −0.4Δo) and eg (higher, +0.6Δo)',
            'High vs low spin: compare Δo and P for d⁴–d⁷',
            'Spectrochemical series: CO > CN⁻ > en > NH₃ > H₂O > F⁻ > Cl⁻ > Br⁻ > I⁻',
            'Tetrahedral: t₂ higher, e lower; Δt = 4/9 Δo; always high spin',
            'Square planar: dx²-y² highest; d⁸ + strong field = diamagnetic',
            'CFSE = [−0.4n(t₂g) + 0.6n(eg)]Δo (or [−4n(t₂g) + 6n(eg)] Dq)',
            'Synergic bonding in CO: σ-donation C→M + π-back M→C',
            'Back-donation: weakens C≡O bond; lowers ν(CO) in IR from 2143 to ~2000 cm⁻¹',
            'Cis-platin is the anticancer drug; trans-platin is inactive',
            'μ = √[n(n+2)] BM; combine with CFT filling to get magnetic nature',
            'Jahn-Teller distortion: lift degeneracy to lower overall energy in d⁹ (Cu²⁺) systems',
            'Trans effect series: H₂O < OH⁻ < NH₃ < Cl⁻ < Br⁻ < I⁻ < PR₃ < CO < CN⁻',
            'Hemoglobin O₂ binding: Fe²⁺ transitions from high-spin (out of plane) to low-spin (in plane)',
            'EDTA water hardness titration: complexometric titration with EBT indicator',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
