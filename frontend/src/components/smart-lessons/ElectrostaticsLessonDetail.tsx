import React, { useState } from 'react';
import {
  Clock, Target, Flame, Star, AlertTriangle, Lightbulb, CheckCircle,
  BookOpen, Zap, Brain, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  progress: number;
  isCompleted?: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG VISUAL 1: ELECTRIC FIELD LINES ──────────────────────────────────────
function FieldLinesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Electric Field Lines Mapping</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Positive charge */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 block text-center">Positive Charge (+q)</span>
          <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 90 }}>
            <circle cx="50" cy="50" r="8" fill="#22d3ee" />
            <text x="50" y="53" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>
            {/* Outward lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <g key={deg} transform={`rotate(${deg} 50 50)`}>
                <line x1="50" y1="36" x2="50" y2="12" stroke="#22d3ee" strokeWidth="1.2" />
                <path d="M 50 12 L 48 18 L 52 18 Z" fill="#22d3ee" />
              </g>
            ))}
          </svg>
        </div>

        {/* Negative charge */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 block text-center">Negative Charge (-q)</span>
          <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 90 }}>
            <circle cx="50" cy="50" r="8" fill="#f87171" />
            <text x="50" y="52" fill="#000" fontSize="10" fontWeight="bold" textAnchor="middle">-</text>
            {/* Inward lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
              <g key={deg} transform={`rotate(${deg} 50 50)`}>
                <line x1="50" y1="36" x2="50" y2="12" stroke="#f87171" strokeWidth="1.2" />
                <path d="M 50 28 L 48 22 L 52 22 Z" fill="#f87171" />
              </g>
            ))}
          </svg>
        </div>

        {/* Electric Dipole */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-violet-400 block text-center">Electric Dipole (Moment p: - to +, Field: + to -)</span>
          <svg viewBox="0 0 120 100" className="w-full" style={{ maxHeight: 90 }}>
            <circle cx="30" cy="50" r="6" fill="#22d3ee" />
            <text x="30" y="53" fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">+</text>
            <circle cx="90" cy="50" r="6" fill="#f87171" />
            <text x="90" y="52" fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">-</text>
            
            {/* Curved field lines */}
            {/* Straight middle */}
            <path d="M 36 50 L 84 50" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <path d="M 60 50 L 56 48 L 56 52 Z" fill="#a78bfa" />
            {/* Curve Top 1 */}
            <path d="M 30 44 C 30 25, 90 25, 90 44" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <path d="M 60 30 L 64 30 L 61 27 Z" fill="#a78bfa" transform="rotate(5 60 30)" />
            {/* Curve Top 2 */}
            <path d="M 30 44 C 15 5, 105 5, 90 44" fill="none" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.7" />
            {/* Curve Bottom 1 */}
            <path d="M 30 56 C 30 75, 90 75, 90 56" fill="none" stroke="#a78bfa" strokeWidth="1" />
            <path d="M 60 70 L 56 70 L 59 73 Z" fill="#a78bfa" transform="rotate(-5 60 70)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function InductionDiagramSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1.1 — Three-Step Charging by Induction</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1: Charge Separation */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
          <span className="text-[10px] font-bold text-cyan-400 block">Step 1: Polarisation</span>
          <svg viewBox="0 0 100 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Charged Rod */}
            <rect x="5" y="25" width="22" height="6" rx="2" fill="#22d3ee" />
            <text x="16" y="22" fill="#22d3ee" fontSize="7" fontWeight="bold" textAnchor="middle">+</text>
            
            {/* Metal Sphere */}
            <circle cx="65" cy="40" r="18" fill="none" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="65" y1="58" x2="65" y2="75" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
            <line x1="55" y1="75" x2="75" y2="75" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Separated Charges */}
            <text x="52" y="42" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">&minus;</text>
            <text x="78" y="42" fill="#22d3ee" fontSize="8" fontWeight="bold" textAnchor="middle">+</text>

            <text x="16" y="29" fill="#000" fontSize="5" fontWeight="bold" textAnchor="middle">+++</text>
          </svg>
          <p className="text-[9.5px] text-white/45 leading-tight mt-1">Charged rod attracts opposite charge to near side, repels same charge to far side.</p>
        </div>

        {/* Step 2: Grounding */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
          <span className="text-[10px] font-bold text-amber-400 block">Step 2: Grounding</span>
          <svg viewBox="0 0 100 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Charged Rod */}
            <rect x="5" y="25" width="22" height="6" rx="2" fill="#22d3ee" />
            
            {/* Metal Sphere */}
            <circle cx="65" cy="40" r="18" fill="none" stroke="#ffffff" strokeWidth="1.2" />
            
            {/* Ground Wire connection */}
            <line x1="65" y1="58" x2="65" y2="70" stroke="#34d399" strokeWidth="1.5" />
            <line x1="57" y1="70" x2="73" y2="70" stroke="#34d399" strokeWidth="1.5" />
            <line x1="61" y1="73" x2="69" y2="73" stroke="#34d399" strokeWidth="1.5" />
            <line x1="63" y1="76" x2="67" y2="76" stroke="#34d399" strokeWidth="1.5" />

            {/* Earth Electrons Flow */}
            <path d="M 65 72 L 65 60" fill="none" stroke="#34d399" strokeWidth="1" markerEnd="url(#garr)" />
            <text x="73" y="68" fill="#34d399" fontSize="7" fontFamily="monospace">e&minus;</text>

            {/* Separated Charges */}
            <text x="52" y="42" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">&minus;</text>
            
            <text x="16" y="29" fill="#000" fontSize="5" fontWeight="bold" textAnchor="middle">+++</text>
            <defs>
              <marker id="garr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <path d="M0,4 L2,0 L4,4 Z" fill="#34d399" />
              </marker>
            </defs>
          </svg>
          <p className="text-[9.5px] text-white/45 leading-tight mt-1">Grounding allows electrons from Earth to flow in and neutralise positive charges.</p>
        </div>

        {/* Step 3: Net Net Charge */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 text-center">
          <span className="text-[10px] font-bold text-emerald-400 block">Step 3: Disconnection &amp; Spread</span>
          <svg viewBox="0 0 100 80" className="w-full" style={{ maxHeight: 75 }}>
            {/* Metal Sphere (Rod and ground removed) */}
            <circle cx="50" cy="40" r="18" fill="none" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="50" y1="58" x2="50" y2="75" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
            <line x1="40" y1="75" x2="60" y2="75" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Net distributed charges */}
            <text x="39" y="34" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">&minus;</text>
            <text x="61" y="34" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">&minus;</text>
            <text x="50" y="52" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">&minus;</text>
            <text x="50" y="28" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">&minus;</text>
          </svg>
          <p className="text-[9.5px] text-white/45 leading-tight mt-1">Ground removed first, then rod. Negative charge distributes uniformly.</p>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 2: GAUSSIAN SURFACES ─────────────────────────────────────────
function GaussianSurfacesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Gaussian Surface Selection</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cylindrical surface for line charge */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 block text-center">Line Charge (Cylinder)</span>
          <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Infinite Wire */}
            <line x1="50" y1="5" x2="50" y2="95" stroke="#fb923c" strokeWidth="2.5" />
            {/* Cylinder boundary */}
            <rect x="30" y="20" width="40" height="60" rx="4" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="3,2" />
            <ellipse cx="50" cy="20" rx="20" ry="6" fill="none" stroke="#22d3ee" strokeWidth="1.2" />
            <ellipse cx="50" cy="80" rx="20" ry="6" fill="none" stroke="#22d3ee" strokeWidth="1.2" />
            {/* Field lines */}
            <line x1="70" y1="50" x2="88" y2="50" stroke="#22d3ee" strokeWidth="0.8" />
            <line x1="30" y1="50" x2="12" y2="50" stroke="#22d3ee" strokeWidth="0.8" />
            <text x="50" y="53" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace" textAnchor="middle">r</text>
          </svg>
        </div>

        {/* Planar Pillbox for sheet charge */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 block text-center">Sheet Charge (Pillbox)</span>
          <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Sheet (skewed plane) */}
            <polygon points="10,50 90,50 80,60 0,60" fill="#fb923c" fillOpacity="0.4" stroke="#fb923c" strokeWidth="1" />
            {/* Pillbox cylinder intersecting */}
            <rect x="35" y="15" width="30" height="70" rx="3" fill="none" stroke="#f87171" strokeWidth="1.2" strokeDasharray="3,2" />
            <ellipse cx="50" cy="15" rx="15" ry="5" fill="none" stroke="#f87171" strokeWidth="1.2" />
            <ellipse cx="50" cy="85" rx="15" ry="5" fill="none" stroke="#f87171" strokeWidth="1.2" />
            <text x="50" y="58" fill="#ffffff" fillOpacity="0.8" fontSize="8" fontFamily="monospace" textAnchor="middle">+</text>
          </svg>
        </div>

        {/* Spherical shell surface */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-violet-400 block text-center">Spherical Shell (Sphere)</span>
          <svg viewBox="0 0 100 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Solid metal shell */}
            <circle cx="50" cy="50" r="22" fill="none" stroke="#fb923c" strokeWidth="2.5" />
            {/* Gaussian surface inside */}
            <circle cx="50" cy="50" r="14" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2,2" />
            {/* Gaussian surface outside */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="3,2" />
            <text x="50" y="53" fill="#ffffff" fillOpacity="0.3" fontSize="8" fontFamily="monospace" textAnchor="middle">R</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── SVG VISUAL 3: ELECTRIC FIELD & POTENTIAL GRAPHICAL INTUITION ─────────────
function SphereGraphsSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F] p-4 space-y-3">
      <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Spherical Charge Distributions: Field (E) and Potential (V) Profiles</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Electric Field (Shell) */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 block text-center">Shell: Field (E) vs (r)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Axes */}
            <line x1="20" y1="80" x2="150" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="20" y1="10" x2="20" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <text x="18" y="15" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="end">E</text>
            <text x="145" y="88" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">r</text>
            
            {/* E = 0 inside */}
            <line x1="20" y1="80" x2="70" y2="80" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Discontinuity jump */}
            <line x1="70" y1="80" x2="70" y2="25" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
            {/* E ∝ 1/r² decay */}
            <path d="M 70 25 Q 95 65, 140 76" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            
            {/* Boundary marker */}
            <line x1="70" y1="80" x2="70" y2="84" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.5" />
            <text x="70" y="93" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">r = R</text>
            <text x="45" y="70" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">E = 0</text>
            <text x="110" y="40" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">E &prop; 1/r&sup2;</text>
          </svg>
        </div>

        {/* Potential (Shell) */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 block text-center">Shell: Potential (V) vs (r)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Axes */}
            <line x1="20" y1="80" x2="150" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="20" y1="10" x2="20" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <text x="18" y="15" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="end">V</text>
            <text x="145" y="88" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">r</text>
            
            {/* V is constant inside */}
            <line x1="20" y1="30" x2="70" y2="30" stroke="#f87171" strokeWidth="2.5" />
            {/* V ∝ 1/r decay */}
            <path d="M 70 30 Q 95 60, 140 70" fill="none" stroke="#f87171" strokeWidth="2.5" />
            
            {/* Boundary marker */}
            <line x1="70" y1="80" x2="70" y2="84" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.5" />
            <text x="70" y="93" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">r = R</text>
            <text x="45" y="24" fill="#f87171" fontSize="7.5" fontFamily="monospace" fontWeight="bold">V = Const</text>
            <text x="110" y="40" fill="#f87171" fontSize="7.5" fontFamily="monospace" fontWeight="bold">V &prop; 1/r</text>
          </svg>
        </div>

        {/* Solid Sphere Field */}
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1">
          <span className="text-[10px] font-bold text-emerald-400 block text-center">Solid Sphere: Field (E) vs (r)</span>
          <svg viewBox="0 0 160 100" className="w-full" style={{ maxHeight: 90 }}>
            {/* Axes */}
            <line x1="20" y1="80" x2="150" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="20" y1="10" x2="20" y2="80" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.3" />
            <text x="18" y="15" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="end">E</text>
            <text x="145" y="88" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">r</text>
            
            {/* E ∝ r inside (linear) */}
            <line x1="20" y1="80" x2="70" y2="25" stroke="#34d399" strokeWidth="2.5" />
            {/* E ∝ 1/r² decay outside */}
            <path d="M 70 25 Q 95 65, 140 76" fill="none" stroke="#34d399" strokeWidth="2.5" />
            
            {/* Boundary marker */}
            <line x1="70" y1="80" x2="70" y2="84" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.5" />
            <text x="70" y="93" fill="#ffffff" fillOpacity="0.5" fontSize="7" fontFamily="monospace" textAnchor="middle">r = R</text>
            <text x="42" y="50" fill="#34d399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">E &prop; r</text>
            <text x="110" y="40" fill="#34d399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">E &prop; 1/r&sup2;</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── REUSABLE UI SMALL HELPERS ───────────────────────────────────────────────
function Tag({ children, color = 'cyan' }: { children: React.ReactNode; color?: 'cyan' | 'rose' | 'amber' | 'violet' }) {
  const styles = {
    cyan:   'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    rose:   'bg-rose-500/10 border-rose-500/20 text-rose-400',
    amber:  'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full border text-[12px] font-bold uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">{children}</h2>
  );
}

function PremiumFormulaCard({ formula, label, use, priority = 5 }: { formula: string; label: string; use: string; priority?: number }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8 space-y-2 hover:border-white/15 transition-all">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-white/45">Formula</span>
        <span className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn('w-2.5 h-2.5', i < priority ? 'text-amber-400 fill-amber-400' : 'text-white/10')} />
          ))}
        </span>
      </div>
      <p className=" text-cyan-300 font-bold text-[13px] sm:text-sm" dangerouslySetInnerHTML={{ __html: formula }} />
      <div className="text-[12px] space-y-0.5">
        <p className="text-white/80"><strong className="text-white/40">Use:</strong> <span dangerouslySetInnerHTML={{ __html: use }} /></p>
        <p className="text-white/55"><strong className="text-white/40">Note:</strong> <span dangerouslySetInnerHTML={{ __html: label }} /></p>
      </div>
    </div>
  );
}

function TrapCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-[12px] font-black text-rose-400 uppercase tracking-wider">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-rose-400/50" /> : <ChevronDown className="w-4 h-4 text-rose-400/50" />}
      </button>
      {isOpen && (
        <div className="text-white/65 text-[13px] leading-relaxed mt-2 pt-2 border-t border-rose-500/10">
          {children}
        </div>
      )}
    </div>
  );
}

function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
      <span className="text-[12px] font-black text-cyan-400 uppercase tracking-wider block mb-1">Key Insight</span>
      <p className="text-white/65 text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

function RevealCard({ emoji, title, formula, detail }: { emoji: string; title: string; formula: string; detail: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(v => !v)}
      className="w-full text-left p-4 rounded-2xl bg-[#090b18] border border-white/8 hover:border-white/15 transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[21px]">{emoji}</span>
          <div>
            <p className="text-white/80 font-bold text-[13px]">{title}</p>
            <p className=" text-cyan-400 text-[14.5px] font-bold mt-0.5" dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
      </div>
      {open && (
        <p className="text-white/55 text-[13px] leading-relaxed mt-3 pt-3 border-t border-white/5">
          {detail}
        </p>
      )}
    </button>
  );
}

export default function ElectrostaticsLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<'columb_gauss' | 'dipoles' | 'conductors_flux' | 'superposition'>('columb_gauss');
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(10).fill(false));

  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 p-5 sm:p-8 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[21px] p-2.5 rounded-2xl bg-white/5 border border-white/8 leading-none">⚡</span>
              <Tag color="cyan">Physics Unit 12</Tag>
              <Tag color="rose">IAT Advanced</Tag>
              <Tag color="amber">High Weightage</Tag>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[12px] uppercase font-bold text-white/35 block mb-0.5">Progress</span>
              <span className="text-[14.5px] font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-[21px] sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Electric Charges and Fields
            </h1>
            <p className="text-xs sm:text-sm text-rose-400 font-semibold tracking-wide flex items-center gap-1.5 mt-2">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              Appears frequently in IAT exams
            </p>
            <p className="text-[12px] text-rose-400/80 font-semibold tracking-wide mt-1.5">Coulomb&apos;s law, dipoles, and Gaussian boundary properties
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: 'Revision Time', value: '30 min' },
              { label: 'IAT Priority', value: 'High' },
              { label: 'Difficulty', value: '3.5 / 5' },
              { label: 'Expected Questions', value: '2-3 / year' },
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
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[12px] text-white/35 font-medium">
              {isCompleted ? '' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* WHAT YOU WILL GUIDE */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0A0C18] border border-white/5 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <SectionTitle>What You Will Learn</SectionTitle>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              "Quantization and properties of electric charges",
              "Coulomb's Law in vector format & Electric field lines properties",
              "Superposition Principle of electric fields (component addition)",
              "Force vs Field vs Potential comparison matrix",
              "Torque and potential energy of dipoles in uniform electric fields",
              "Gauss's Law and flux calculations through closed surfaces",
              "Applications of Gauss's Law (wires, sheets, spherical shells)",
              "Graphical intuition for E and V of conducting shells"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[13px] text-white/75">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART 1: ELECTROSTATICS BASICS & SUPERPOSITION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Electrostatics Basics &amp; Superposition</h2>
        </div>
        
        <div className="p-4 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 tracking-wider block uppercase">⚛️ Basic Properties of Electric Charge</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/70 leading-relaxed">
            <div>
              <strong className="text-white">1. Additivity:</strong> Total charge is the simple algebraic sum of all individual charges in a system: <code>Q = &Sigma; q<sub>i</sub></code>.
            </div>
            <div>
              <strong className="text-white">2. Conservation:</strong> The total net charge of an isolated system remains constant over time. Charge can be transferred, not created or destroyed.
            </div>
            <div>
              <strong className="text-white">3. Quantization:</strong> Charge always exists in discrete integral multiples of the elementary charge <code>e = 1.6 &times; 10<sup>&minus;19</sup> C</code>: <code>q = &plusmn; ne</code>.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[400px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Property</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Conductors</th>
                <th className="text-left px-4 py-3 text-emerald-400 font-bold uppercase">Insulators (Dielectrics)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Charge Mobility', 'Free to move (valence electron cloud)', 'Fixed in position, cannot move freely'],
                ['Internal Electric Field (Static)', 'E = 0 (charges move to cancel external fields)', 'E ≠ 0 (can be polarized, reducing net field)'],
                ['Static Charge Location', 'Resides strictly on the outer surface', 'Distributed throughout the volume'],
              ].map(([prop, cond, ins]) => (
                <tr key={prop as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{prop as string}</td>
                  <td className="px-4 py-3 text-cyan-300">{cond as string}</td>
                  <td className="px-4 py-3 text-emerald-300">{ins as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 text-[12px] font-bold">INSIGHT</span>
            <span className="text-[12px] text-white/50">Charging by Induction (No Physical Contact)</span>
          </div>
          <InductionDiagramSVG />
          <p className="text-white/60 text-[13px] leading-relaxed">
            <strong>Induction vs Conduction:</strong> In <em>conduction</em>, charges transfer via direct physical contact. In <em>induction</em>, a charged body brought near a neutral conductor polarises it. Grounding the far side allows same-sign charges to escape to ground (or opposite charges to enter from ground). Removing the ground connection first, then removing the inducing rod, leaves the conductor with a net charge opposite in sign to the inducing body.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <PremiumFormulaCard
            formula="q = ± n * e"
            use="Quantization of charge (e = 1.6 * 10^-19 C)"
            label="n is always an integer. Fractional charges like ±e/3 (quarks) exist but are not free in nature."
            priority={5}
          />
          <PremiumFormulaCard
            formula="F<sub>12</sub> = (1 / 4&pi;&epsilon;<sub>0</sub>) &middot; (q<sub>1</sub>q<sub>2</sub> / r<sub>12</sub>&sup2;) &middot; r̂<sub>12</sub>"
            use="Coulomb&apos;s Law in Vector form"
            label="&epsilon;<sub>0</sub> = 8.854 &times; 10<sup>&minus;12</sup> C&sup2;/N&middot;m&sup2;. Force is conservative, obeys Newton&apos;s 3rd law (F<sub>12</sub> = &minus;F<sub>21</sub>)."
            priority={5}
          />
          <PremiumFormulaCard
            formula="F<sub>med</sub> = (1 / 4&pi;&epsilon;) &middot; (q<sub>1</sub>q<sub>2</sub> / r&sup2;) = F<sub>vac</sub> / K"
            use="Coulomb&apos;s Law in a dielectric medium"
            label="&epsilon; = K &epsilon;<sub>0</sub> = &epsilon;<sub>r</sub> &epsilon;<sub>0</sub> where K is the dielectric constant (relative permittivity) of the medium."
            priority={5}
          />
        </div>

        {/* SUPERPOSITION PRINCIPLE */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-violet-400 uppercase tracking-wider block">📐 The Principle of Superposition</span>
          <p className="text-white/70 leading-relaxed">
            The net electric field at any point due to a system of charges is the vector sum of the electric fields produced by each individual charge at that point:
            <br /><code className="text-cyan-300 font-bold">E<sub>net</sub> = E<sub>1</sub> + E<sub>2</sub> + E<sub>3</sub> + ... + E<sub>n</sub></code>
          </p>
          <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-emerald-400 block uppercase">⚙️ Resolving Components is Mandatory</span>
            <p className="text-white/60 leading-relaxed">
              Because electric fields are vectors, you can NEVER add magnitudes directly unless the fields are parallel. You must resolve each field into components:
              <br />&bull; <code>E<sub>net,x</sub> = E<sub>1</sub>x + E<sub>2</sub>x + ...</code>
              <br />&bull; <code>E<sub>net,y</sub> = E<sub>1</sub>y + E<sub>2</sub>y + ...</code>
              <br />&bull; <code>E<sub>total</sub> = sqrt(E<sub>net,x</sub>² + E<sub>net,y</sub>²)</code>
            </p>
          </div>
        </div>
      </div>

      {/* PART 2: FORCE, FIELD & POTENTIAL COMPARISON MATRIX */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center flex-wrap gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Force, Field &amp; Potential Comparison</h2>
          <Tag color="violet">Extra (Potential is in Unit 2)</Tag>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Students frequently confuse how electrostatic parameters relate. This matrix outlines their core distinctions:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
 <table className="w-full text-[13px] min-w-[480px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Quantity</th>
                <th className="text-center px-4 py-3 text-cyan-400 font-bold uppercase">Basic Formula</th>
                <th className="text-center px-4 py-3 text-emerald-400 font-bold uppercase">Mathematical Nature</th>
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Physical Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Electric Force (F)', 'F = qE = (1/4&pi;&epsilon;<sub>0</sub>) &middot; q<sub>1</sub>q<sub>2</sub>/r&sup2;', 'Vector (N)', 'Interaction force between two charged objects'],
                ['Electric Field (E)', 'E = F/q = (1/4&pi;&epsilon;<sub>0</sub>) &middot; q/r&sup2;', 'Vector (N/C or V/m)', 'Force experienced per unit test charge at a point'],
                ['Electric Potential (V)', 'V = W/q = (1/4&pi;&epsilon;<sub>0</sub>) &middot; q/r', 'Scalar (Volts or J/C)', 'Work done per unit charge in bringing it from infinity'],
              ].map(([qty, form, nat, interp]) => (
                <tr key={qty as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: qty as string }} />
                  <td className="px-4 py-3 text-cyan-300 text-center" dangerouslySetInnerHTML={{ __html: form as string }} />
                  <td className="px-4 py-3 text-emerald-300 text-center font-bold" dangerouslySetInnerHTML={{ __html: nat as string }} />
                  <td className="px-4 py-3 text-white/50 text-[12px]" dangerouslySetInnerHTML={{ __html: interp as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PART 3: ELECTRIC DIPOLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Electric Dipoles in Fields</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          An electric dipole consists of a pair of equal and opposite point charges <code>+q</code> and <code>-q</code> separated by a distance <code>2a</code>.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          <PremiumFormulaCard
            formula="p = q * 2a"
            use="Dipole moment calculation"
            label="Direction: Vector points strictly from Negative (-) to Positive (+) charge."
            priority={5}
          />
          <PremiumFormulaCard
            formula="E<sub>axial</sub> = 2kp / r³ | E<sub>equatorial</sub> = -kp / r³"
            use="Dipole field approximations (for r >> a)"
            label="At a distance r: Axial field is twice as strong as equatorial field, and pointing in opposite direction."
            priority={5}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RevealCard
            emoji="🔄"
            title="Torque (τ) on Dipole"
            formula="τ = p * E = pE sinθ"
            detail="Max torque occurs at θ = 90° (perpendicular to field). Net force in a uniform E-field is always zero, so it undergoes pure rotation."
          />
          <RevealCard
            emoji="🔋"
            title="Potential Energy (U)"
            formula="U = -p * E = -pE cosθ"
            detail="Stable equilibrium: θ = 0° (U = -pE is minimum). Unstable equilibrium: θ = 180° (U = +pE is maximum)."
          />
        </div>
      </div>

      {/* PART 4: CONTINUOUS CHARGE DISTRIBUTIONS & ELECTRIC FLUX */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Continuous Charge Distributions &amp; Electric Flux</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Charges are not always discrete point particles. In practical systems, charge is continuously distributed along lines, sheets, or throughout volumes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block">Linear Density (λ)</span>
            <p className="text-white text-[13px] font-bold">λ = dq / dl</p>
            <p className="text-white/50 text-[12px]">Charge per unit length. Unit: <strong>C/m</strong>. Used for wires and thin rods.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-400 block">Surface Density (σ)</span>
            <p className="text-white text-[13px] font-bold">σ = dq / dA</p>
            <p className="text-white/50 text-[12px]">Charge per unit area. Unit: <strong>C/m²</strong>. Used for sheets, planes, and shell skins.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-violet-400 block">Volume Density (ρ)</span>
            <p className="text-white text-[13px] font-bold">ρ = dq / dV</p>
            <p className="text-white/50 text-[12px]">Charge per unit volume. Unit: <strong>C/m³</strong>. Used for non-conducting solid spheres.</p>
          </div>
        </div>

        {/* Integration Worked Example */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-2 text-[13px]">
          <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-wider block">📝 Integration Example: Total Charge of a Non-uniform Rod</span>
          <p className="text-white/70 leading-relaxed">
            <strong>Problem:</strong> A thin rod of length L lies along the x-axis from x=0 to x=L. Its linear charge density is non-uniform and given by <code>λ = &lambda;<sub>0</sub> x²</code>. Find the total charge Q of the rod.
            <br /><strong>Solution:</strong>
            <br />1. Express charge element <code>dq = λ dx = &lambda;<sub>0</sub> x² dx</code>.
            <br />2. Integrate from <code>x = 0</code> to <code>x = L</code>:
            <br />&nbsp;&nbsp;&nbsp;<code>Q = ∫ dq = ∫₀ᴸ &lambda;<sub>0</sub> x² dx = &lambda;<sub>0</sub> [ x³ / 3 ]₀ᴸ = (&lambda;<sub>0</sub> L³) / 3</code>.
          </p>
        </div>

        {/* Electric Flux definition */}
 <div className="p-4.5 rounded-2xl bg-[#090b18] border border-white/5 space-y-3 text-[13px]">
          <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">🔊 Electric Flux (Φ) from First Principles</span>
          <p className="text-white/70 leading-relaxed">
            Electric flux measures the number of electric field lines passing through a given surface area.
            <br />For a flat surface of area A in a uniform electric field E:
            <br /><code className="text-cyan-300 font-bold">Φ = E * A = E A cosθ</code>
            <br />where <code>θ</code> is the angle between the electric field vector <code>E</code> and the <strong>area vector A</strong> (which is perpendicular/normal to the surface).
          </p>
          <div className="space-y-1.5 border-t border-white/5 pt-2 text-[12px] text-white/50">
            <p>&bull; <strong className="text-white">Maximum Flux:</strong> θ = 0° (field lines are normal to surface) &rArr; <code>Φ = EA</code>.</p>
            <p>&bull; <strong className="text-white">Zero Flux:</strong> θ = 90° (field lines are parallel to surface) &rArr; <code>Φ = 0</code>.</p>
            <p>&bull; For general non-uniform fields/curved surfaces: <code>Φ = ∫ E * dA</code>.</p>
          </div>
        </div>
      </div>

      {/* PART 5: GAUSS'S LAW & FIELD SOLUTIONS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Gauss\'s Law &amp; Field Solutions</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Gauss\'s Law states that the net electric flux Φ through any closed Gaussian surface is equal to the net charge enclosed divided by ε₀.
        </p>
        <FieldLinesSVG />
        <GaussianSurfacesSVG />

        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
 <table className="w-full text-[13px] min-w-[480px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Distribution Shape</th>
                <th className="text-left px-4 py-3 text-cyan-400 font-bold uppercase">Gaussian Surface</th>
                <th className="text-center px-4 py-3 text-emerald-400 font-bold uppercase">Electric Field (E)</th>
                <th className="text-left px-4 py-3 text-white/50 font-bold uppercase">Dependency</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Infinite Wire (density &lambda;)', 'Coaxial Cylinder', '&lambda; / (2&pi;&epsilon;<sub>0</sub>r)', 'E &prop; 1/r (radially outwards)'],
                ['Infinite Sheet (density &sigma;)', 'Interpenetrating Pillbox', '&sigma; / (2&epsilon;<sub>0</sub>)', 'E = Constant (independent of distance r)'],
                ['Spherical Shell (Inside, r < R)', 'Concentric Sphere', '0', 'E = 0 (charge resides strictly on outer surface)'],
                ['Spherical Shell (Outside, r &ge; R)', 'Concentric Sphere', 'Q / (4&pi;&epsilon;<sub>0</sub>r&sup2;)', 'E &prop; 1/r&sup2; (behaves like point charge at center)'],
                ['Solid Sphere (Inside, r < R)', 'Concentric Sphere', 'Qr / (4&pi;&epsilon;<sub>0</sub>R<sup>3</sup>)', 'E &prop; r (linear increase from center)'],
                ['Solid Sphere (Outside, r &ge; R)', 'Concentric Sphere', 'Q / (4&pi;&epsilon;<sub>0</sub>r&sup2;)', 'E &prop; 1/r&sup2; (behaves like point charge at center)'],
              ].map(([dist, surf, field, dep]) => (
                <tr key={dist as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold" dangerouslySetInnerHTML={{ __html: dist as string }} />
                  <td className="px-4 py-3 text-cyan-300" dangerouslySetInnerHTML={{ __html: surf as string }} />
                  <td className="px-4 py-3 text-emerald-300 text-center font-bold" dangerouslySetInnerHTML={{ __html: field as string }} />
                  <td className="px-4 py-3 text-white/50 text-[12px]" dangerouslySetInnerHTML={{ __html: dep as string }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <SphereGraphsSVG />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <RevealCard
            emoji="✨"
            title="Electric Field Lines Rules"
            formula="No Cross | Density ∝ E"
            detail="Field lines start from positive charges and end on negative. They never intersect (otherwise the field would have two directions at one point) and do not form closed loops (conservative nature)."
          />
          <RevealCard
            emoji="🛡️"
            title="Electrostatic Shielding"
            formula="E<sub>inside</sub> = 0 | V = Const"
            detail="Inside a cavity of a hollow conductor, the electric field is always zero, regardless of external charges. Sensitive electronic instruments are protected by enclosing them inside Faraday cages."
          />
        </div>
      </div>

      {/* PART 5: SOLVED EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 shrink-0"><BookOpen className="w-5 h-5" /></span>
          <h3 className="text-white font-display font-bold text-[17px] sm:text-lg tracking-wide uppercase">Solved Numerical Examples</h3>
        </div>

        {/* Example 1: Superposition components */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 1: Superposition &amp; Midpoint Field</span>
            <p className="text-white/80 leading-relaxed">
              Two point charges q₁ = +2.0 μC and q₂ = -8.0 μC are placed at coordinates A(0, 0) and B(6.0 m, 0) respectively. Find the coordinates of the point on the x-axis where the net electric field is zero.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Determine the region:</strong>
              <br />&nbsp;&nbsp;&nbsp;Since the charges are opposite in sign, the electric fields point in opposite directions outside the line segment AB.
              <br />&nbsp;&nbsp;&nbsp;To find where they cancel, the point must be closer to the smaller charge in magnitude (q₁ at x = 0).
              <br />&nbsp;&nbsp;&nbsp;Let the point be P(x, 0) where x is negative (to the left of A).
            </p>
            <p>
              2. <strong className="text-white">Equate the field magnitudes:</strong>
              <br />&nbsp;&nbsp;&nbsp;Distance from q₁ to P is <code>|x| = -x</code>.
              <br />&nbsp;&nbsp;&nbsp;Distance from q₂ to P is <code>6.0 - x</code> (since x is negative, this is 6.0 + |x|).
              <br />&nbsp;&nbsp;&nbsp;<code>E₁ = E₂ &rArr; k * |q₁| / x² = k * |q₂| / (6.0 - x)²</code>.
            </p>
            <p>
              3. <strong className="text-white">Solve the equation:</strong>
              <br />&nbsp;&nbsp;&nbsp;<code>2 / x² = 8 / (6.0 - x)² &rArr; 1 / x² = 4 / (6.0 - x)²</code>.
              <br />&nbsp;&nbsp;&nbsp;Take the square root of both sides (since x is negative, <code>-x</code> is distance):
              <br />&nbsp;&nbsp;&nbsp;<code>1 / (-x) = 2 / (6 - x) &rArr; 6 - x = -2x &rArr; x = -6.0 m</code>.
            </p>
            <p>
              4. <strong className="text-white">Conclusion:</strong>
              <br />&nbsp;&nbsp;&nbsp;The net electric field is zero at <code className="text-cyan-300">(-6.0 m, 0)</code>.
            </p>
          </div>
        </div>

        {/* Example 2: Cube Flux */}
 <div className="p-5 rounded-2xl border border-white/5 bg-[#080913] space-y-4 text-[13px]">
          <div className="space-y-1">
            <span className="text-[12px] font-bold text-emerald-400 block uppercase">Solved Example 2: Gauss Flux through Cube geometry</span>
            <p className="text-white/80 leading-relaxed">
              A point charge q is placed at:
              <br />(i) the center of a cube of side length L.
              <br />(ii) one of the corners of the cube.
              <br />Find the total electric flux passing through the cube in both cases.
            </p>
          </div>
          <div className="space-y-2 border-t border-white/5 pt-3 text-white/60 leading-relaxed">
            <span className="text-[12px] font-bold text-cyan-400 block uppercase">Step-by-step Solution</span>
            <p>
              1. <strong className="text-white">Case (i) — Charge at center:</strong>
              <br />&nbsp;&nbsp;&nbsp;By Gauss\'s Law, the total flux through any closed surface enclosing charge q is:
              <br />&nbsp;&nbsp;&nbsp;<code>&Phi;<sub>total</sub> = q / ε₀</code>.
              <br />&nbsp;&nbsp;&nbsp;Since the cube has 6 symmetric faces, the flux through each face is:
              <br />&nbsp;&nbsp;&nbsp;<code>&Phi;<sub>face</sub> = q / (6ε₀)</code>.
            </p>
            <p>
              2. <strong className="text-white">Case (ii) — Charge at one corner:</strong>
              <br />&nbsp;&nbsp;&nbsp;A charge at a corner is shared equally among 8 adjacent cubes.
              <br />&nbsp;&nbsp;&nbsp;To enclose the charge completely, we need to construct a larger symmetric cube composed of 8 smaller cubes.
              <br />&nbsp;&nbsp;&nbsp;The total flux from the charge through the larger closed surface is <code>q / ε₀</code>.
              <br />&nbsp;&nbsp;&nbsp;Thus, the flux passing through one of the 8 smaller cubes is:
              <br />&nbsp;&nbsp;&nbsp;<code className="text-cyan-300">&Phi;<sub>cube</sub> = q / (8ε₀)</code>.
            </p>
          </div>
        </div>
      </div>

      {/* INTERACTIVE FORMULA FINDER (DECISION TREE) */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-cyan-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Formula Decision Tree</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          Select what your question is trying to solve to immediately find the correct approach:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'columb_gauss', label: '🚀 Coulomb & Gauss' },
            { id: 'dipoles', label: '🔋 Electric Dipoles' },
            { id: 'conductors_flux', label: '🛡️ Conductors & Shielding' },
            { id: 'superposition', label: '📐 Component Superposition' },
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

        <div className="p-4.5 rounded-2xl bg-[#080913] border border-white/5">
          {selectedGoal === 'columb_gauss' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-cyan-400 block uppercase">Objective: Calculate forces or flux</span>
              <p className="text-white/70">1. Obeys Coulomb\'s law: <code>F = (1 / 4πε₀) * (q₁q₂ / r²)</code>.</p>
              <p className="text-white/70">2. Net flux through closed surface: <code>&Phi; = q<sub>enclosed</sub> / ε₀</code>.</p>
              <p className="text-white/70">3. Electric field of a point charge: <code>E = kQ / r²</code>.</p>
            </div>
          )}
          {selectedGoal === 'dipoles' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-emerald-400 block uppercase">Objective: Solve dipole fields and energy</span>
              <p className="text-white/70">1. Dipole fields: Axial is <code>2kp / r³</code>; Equatorial is <code>kp / r³</code> (opposite direction).</p>
              <p className="text-white/70">2. Torque: <code>τ = pE sinθ</code> (zero at 0° and 180°).</p>
              <p className="text-white/70">3. Potential Energy: <code>U = -pE cosθ</code> (minimum -pE at 0° stable, max +pE at 180° unstable).</p>
            </div>
          )}
          {selectedGoal === 'conductors_flux' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-violet-400 block uppercase">Objective: Conductors and field distributions</span>
              <p className="text-white/70">1. Inside any conductor in static equilibrium: <code>E = 0</code>.</p>
              <p className="text-white/70">2. Potential inside/on conductor: <code>V = Constant</code>.</p>
              <p className="text-white/70">3. Hollow cavity shielding: protects from external electrical field noises.</p>
            </div>
          )}
          {selectedGoal === 'superposition' && (
 <div className="space-y-3 text-[13px]">
              <span className="text-[12px] font-bold text-amber-400 block uppercase">Objective: Resolve multiple field vectors</span>
              <p className="text-white/70">1. Write each electric field vector component wise: <code>E<sub>i</sub> = E<sub>i</sub>x x̂ + E<sub>i</sub>y ŷ</code>.</p>
              <p className="text-white/70">2. Sum components separately: <code>E<sub>x</sub> = Σ E<sub>i</sub>x</code> and <code>E<sub>y</sub> = Σ E<sub>i</sub>y</code>.</p>
              <p className="text-white/70">3. Net magnitude is <code>√(E<sub>x</sub>² + E<sub>y</sub>²)</code>.</p>
            </div>
          )}
        </div>
      </div>

      {/* QUESTION RECOGNITION SECTION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
          <Target className="w-5 h-5 text-cyan-400" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-wider">Question Recognition Patterns</h2>
        </div>
        <div className="space-y-2">
          {[
            { cue: '"Point charge at a corner of a cube"', think: 'Use the 8-cube construct. Total flux through this cube is q / 8ε₀.' },
            { cue: '"Conductor in electrostatic equilibrium"', think: 'Electric field inside is exactly zero. Surface is an equipotential, so field lines are perpendicular.' },
            { cue: '"Dipole in a uniform field experiences no net force"', think: 'Net force is zero because forces on +q and -q cancel, but torque is non-zero (τ = pE sinθ).' },
            { cue: '"Flux through a surface of doubled radius"', think: 'Flux remains unchanged because it depends ONLY on the enclosed charge (Gauss\'s Law).' },
            { cue: '"Three charges are in equilibrium"', think: 'Net force on each charge is zero. Equate Coulomb force vectors on each charge.' }
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">If the question says...</p>
                <p className="font-mono text-[13px] font-bold text-cyan-400" dangerouslySetInnerHTML={{ __html: cue }} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/35 uppercase mb-1">Immediately think...</p>
                <p className="font-mono text-[13px] text-white/70" dangerouslySetInnerHTML={{ __html: think }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMON MISTAKES & TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps &amp; Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Vector Addition Mistake">
            Do not add magnitudes of electric fields directly unless the fields point in the exact same direction. Always decompose fields into components before adding.
          </TrapCard>
          <TrapCard title="Trap 2: Gauss\'s Law E-field source">
            In <code>∮ E * dA = q<sub>in</sub> / ε₀</code>, the field <code>E</code> on the left is produced by ALL charges (both inside and outside the surface), but <code>q<sub>in</sub></code> is ONLY the charge inside.
          </TrapCard>
          <TrapCard title="Trap 3: Conducting Shell inside fields">
            Inside any empty conducting hollow sphere, <code>E = 0</code>, but the potential is NOT zero. It is constant and equal to its value on the outer surface (<code>V = kQ/R</code>).
          </TrapCard>
        </div>
      </div>

      {/* 2-MINUTE REVISION CHECKLIST */}
      <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/15 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="text-emerald-400 font-display font-bold text-[14.5px] uppercase tracking-wider">2-Minute Revision Checklist</h3>
          </div>
          <span className="text-[12px] font-bold px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            {checkedItems.filter(Boolean).length} / 10 Completed
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3.5">
          {[
            'Quantization of charge: q = &plusmn;ne',
            'Coulomb&apos;s Law in vacuum and dielectrics: F<sub>med</sub> = F<sub>vac</sub> / K',
            'Electric field lines never cross and are perpendicular to conductors',
            'Superposition: net field is component-wise sum of individual fields',
            'Axial field E = 2kp/r<sup>3</sup> is opposite to equatorial E = &minus;kp/r<sup>3</sup>',
            'Torque: &tau; = pE sin&theta;; Potential Energy: U = &minus;pE cos&theta;',
            'Gauss Law: flux &Phi; = q<sub>enclosed</sub> / &epsilon;<sub>0</sub> (independent of surface shape/size)',
            'Field of infinite wire: E = &lambda;/(2&pi;&epsilon;<sub>0</sub>r) (varies as 1/r)',
            'Field of infinite sheet: E = &sigma;/2&epsilon;<sub>0</sub> (independent of distance)',
            'Conducting shell inside: E = 0, V = Constant = kQ/R'
          ].map((item, idx) => (
            <button
              key={item}
              onClick={() => {
                const next = [...checkedItems];
                next[idx] = !next[idx];
                setCheckedItems(next);
              }}
 className="flex items-start text-left gap-2 text-[12px] text-white/70 py-1.5 border-b border-white/[0.04] last:border-0 w-full hover:bg-white/[0.02] rounded px-1 transition-colors group"
            >
              <CheckCircle className={cn(
                "w-4 h-4 shrink-0 mt-0.5 transition-colors",
                checkedItems[idx] ? "text-emerald-400 fill-emerald-500/10" : "text-white/20 group-hover:text-emerald-400/50"
              )} />
              <span className={cn(checkedItems[idx] && "line-through text-white/40")} dangerouslySetInnerHTML={{ __html: item }} />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
