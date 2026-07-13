import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Flame, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

interface Props {
  progress: number;
  isCompleted: boolean;
  onNavigate?: (view: string) => void;
}

// ─── SVG VISUALS ─────────────────────────────────────────────────────────────

function GasContainerSVG() {
  const molecules: [number, number, string][] = [
    [80,55,'#22d3ee'],[130,40,'#a78bfa'],[185,70,'#34d399'],[220,45,'#22d3ee'],
    [100,100,'#fb923c'],[165,115,'#a78bfa'],[210,100,'#34d399'],[75,140,'#22d3ee'],
    [145,155,'#fb923c'],[230,140,'#a78bfa'],[110,75,'#34d399'],[195,155,'#22d3ee'],
  ];
  const arrows: [number,number,number,number][] = [
    [80,55,105,42],[130,40,155,55],[185,70,165,95],[220,45,200,65],
    [100,100,78,120],[165,115,185,130],[210,100,230,115],[145,155,125,140],
  ];
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F]">
      <div className="px-4 pt-3 pb-1">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 1 — Molecular Motion &amp; Pressure</p>
      </div>
      <svg viewBox="0 0 310 200" className="w-full" style={{ maxHeight: 200 }}>
        <rect x="35" y="15" width="240" height="165" fill="none" stroke="#22d3ee" strokeWidth="2" rx="4" strokeOpacity="0.4" />
        <rect x="35" y="15" width="240" height="165" fill="#22d3ee" fillOpacity="0.015" rx="4" />
        {arrows.map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.12" markerEnd="url(#arr)" />
        ))}
        <defs>
          <marker id="arr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill="#ffffff" fillOpacity="0.15" />
          </marker>
        </defs>
        {molecules.map(([cx,cy,col],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={9} fill={col} fillOpacity="0.08" stroke={col} strokeWidth="1" strokeOpacity="0.5" />
            <circle cx={cx} cy={cy} r={3.5} fill={col} fillOpacity="0.9" />
          </g>
        ))}
        <rect x="35" y="15" width="10" height="165" fill="#22d3ee" fillOpacity="0.06" rx="2" />
        <text x="42" y="105" fill="#22d3ee" fontSize="8" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,42,98)">PRESSURE</text>
        <line x1="50" y1="60" x2="35" y2="60" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#parr)" strokeOpacity="0.7" />
        <line x1="50" y1="98" x2="35" y2="98" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#parr)" strokeOpacity="0.7" />
        <line x1="50" y1="136" x2="35" y2="136" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#parr)" strokeOpacity="0.7" />
        <defs>
          <marker id="parr" markerWidth="5" markerHeight="5" refX="2" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#f87171" fillOpacity="0.7" />
          </marker>
        </defs>
        <text x="275" y="102" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle" transform="rotate(90,275,102)" fillOpacity="0.7">WALL</text>
        <text x="155" y="196" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.35">Elastic collision → momentum transfer → force on wall → Pressure</text>
      </svg>
    </div>
  );
}

function MaxwellBoltzmannSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F]">
      <div className="px-4 pt-3 pb-1">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 2 — Maxwell-Boltzmann Speed Distribution</p>
      </div>
      <svg viewBox="0 0 360 185" className="w-full" style={{ maxHeight: 185 }}>
        <line x1="30" y1="158" x2="340" y2="158" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
        <line x1="30" y1="10" x2="30" y2="158" stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.15" />
        <text x="185" y="178" textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="monospace" fillOpacity="0.35">Molecular Speed &rarr;</text>
        <text x="14" y="90" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.35" transform="rotate(-90,14,90)">f(v)</text>
        <path d="M 30 158 C 55 158, 75 30, 118 20 C 138 14, 152 14, 168 22 C 192 35, 240 115, 330 156" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 30 158 C 55 158, 75 30, 118 20 C 138 14, 152 14, 168 22 C 192 35, 240 115, 330 156 L330 158 Z" fill="#22d3ee" fillOpacity="0.08" />
        <line x1="118" y1="20" x2="118" y2="158" stroke="#a78bfa" strokeDasharray="4,3" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="118" cy="20" r="3.5" fill="#a78bfa" />
        <line x1="145" y1="16" x2="145" y2="158" stroke="#34d399" strokeDasharray="4,3" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="145" cy="16" r="3.5" fill="#34d399" />
        <line x1="172" y1="21" x2="172" y2="158" stroke="#fb923c" strokeDasharray="4,3" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="172" cy="21" r="3.5" fill="#fb923c" />
        <text x="118" y="170" textAnchor="middle" fill="#a78bfa" fontSize="7.5" fontFamily="monospace" fontWeight="bold">v<sub>mp</sub></text>
        <text x="145" y="170" textAnchor="middle" fill="#34d399" fontSize="7.5" fontFamily="monospace" fontWeight="bold">v<sub>avg</sub></text>
        <text x="172" y="170" textAnchor="middle" fill="#fb923c" fontSize="7.5" fontFamily="monospace" fontWeight="bold">v<sub>rms</sub></text>
        <rect x="205" y="12" width="140" height="72" rx="6" fill="#0a0c18" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
        <circle cx="218" cy="28" r="4" fill="#a78bfa" />
        <text x="228" y="32" fill="#a78bfa" fontSize="7.5" fontFamily="monospace">v<sub>mp</sub> = sqrt(2RT/M)</text>
        <circle cx="218" cy="46" r="4" fill="#34d399" />
        <text x="228" y="50" fill="#34d399" fontSize="7.5" fontFamily="monospace">v<sub>avg</sub> = sqrt(8RT/piM)</text>
        <circle cx="218" cy="64" r="4" fill="#fb923c" />
        <text x="228" y="68" fill="#fb923c" fontSize="7.5" fontFamily="monospace">v<sub>rms</sub> = sqrt(3RT/M)</text>
        <text x="275" y="80" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.4">v<sub>mp</sub> &lt; v<sub>avg</sub> &lt; v<sub>rms</sub></text>
        <path d="M 30 158 C 50 158, 65 55, 100 40 C 118 33, 132 33, 148 40 C 170 52, 210 125, 305 156" fill="none" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="5,3" strokeOpacity="0.35" />
        <text x="310" y="78" fill="#22d3ee" fontSize="7" fontFamily="monospace" fillOpacity="0.45">High T</text>
        <text x="68" y="34" fill="#22d3ee" fontSize="7" fontFamily="monospace" fillOpacity="0.45">Low T</text>
      </svg>
    </div>
  );
}

function SpeedBarSVG() {
  const bars = [
    { label: 'v_mp', pct: 76, color: '#a78bfa', formula: 'sqrt(2RT/M)', ratio: '1.00' },
    { label: 'v_avg', pct: 87, color: '#34d399', formula: 'sqrt(8RT/piM)', ratio: '1.13' },
    { label: 'v_rms', pct: 100, color: '#fb923c', formula: 'sqrt(3RT/M)', ratio: '1.22' },
  ];
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F]">
      <div className="px-4 pt-3 pb-1">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 3 — Comparative Speed Chart (same gas, same T)</p>
      </div>
      <svg viewBox="0 0 340 115" className="w-full" style={{ maxHeight: 115 }}>
        {bars.map((b, i) => {
          const y = 18 + i * 30;
          const w = b.pct / 100 * 200;
          return (
            <g key={b.label}>
              <text x="42" y={y + 12} textAnchor="end" fill={b.color} fontSize="9" fontFamily="monospace" fontWeight="bold">
                v
                {b.label === 'v_mp' && <tspan dy="2" fontSize="6.5">mp</tspan>}
                {b.label === 'v_avg' && <tspan dy="2" fontSize="6.5">avg</tspan>}
                {b.label === 'v_rms' && <tspan dy="2" fontSize="6.5">rms</tspan>}
              </text>
              <rect x="48" y={y} width={w} height="18" rx="4" fill={b.color} fillOpacity="0.18" />
              <rect x="48" y={y} width={w} height="18" rx="4" fill="none" stroke={b.color} strokeWidth="1" strokeOpacity="0.5" />
              <text x={52} y={y + 12} fill={b.color} fontSize="7.5" fontFamily="monospace">{b.formula}</text>
              <text x={52 + w} y={y + 12} fill={b.color} fontSize="8" fontFamily="monospace" fontWeight="bold"> x{b.ratio}</text>
            </g>
          );
        })}
        <text x="170" y="108" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.35">RAM mnemonic: RMS &gt; Average &gt; Most Probable</text>
      </svg>
    </div>
  );
}

function DoFMoleculesSVG() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F]">
      <div className="px-4 pt-3 pb-1">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 4 — Molecular Structures and Degrees of Freedom</p>
      </div>
      <svg viewBox="0 0 340 160" className="w-full" style={{ maxHeight: 160 }}>
        {/* Monatomic */}
        <rect x="10" y="18" width="100" height="130" rx="8" fill="#22d3ee" fillOpacity="0.04" stroke="#22d3ee" strokeWidth="0.7" strokeOpacity="0.3" />
        <text x="60" y="35" textAnchor="middle" fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold">MONATOMIC</text>
        <text x="60" y="47" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.45">He, Ar, Ne</text>
        <circle cx="60" cy="83" r="22" fill="#22d3ee" fillOpacity="0.12" stroke="#22d3ee" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="60" cy="83" r="8" fill="#22d3ee" fillOpacity="0.8" />
        <line x1="36" y1="83" x2="84" y2="83" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.4" />
        <line x1="60" y1="59" x2="60" y2="107" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.4" />
        <text x="60" y="128" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">f = 3</text>
        <text x="60" y="140" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.5">3 translational</text>
        <text x="60" y="151" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.5">gamma = 5/3 = 1.67</text>
        {/* Diatomic */}
        <rect x="120" y="18" width="100" height="130" rx="8" fill="#a78bfa" fillOpacity="0.04" stroke="#a78bfa" strokeWidth="0.7" strokeOpacity="0.3" />
        <text x="170" y="35" textAnchor="middle" fill="#a78bfa" fontSize="9" fontFamily="monospace" fontWeight="bold">DIATOMIC</text>
        <text x="170" y="47" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.45">H2, O2, N2</text>
        <line x1="143" y1="83" x2="197" y2="83" stroke="#a78bfa" strokeWidth="2.5" strokeOpacity="0.5" />
        <circle cx="143" cy="83" r="14" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="197" cy="83" r="14" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="143" cy="83" r="5.5" fill="#a78bfa" fillOpacity="0.8" />
        <circle cx="197" cy="83" r="5.5" fill="#a78bfa" fillOpacity="0.8" />
        <path d="M 145 65 Q 170 57 195 65" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="2,2" strokeOpacity="0.5" markerEnd="url(#rot1)" />
        <path d="M 145 101 Q 170 109 195 101" fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="2,2" strokeOpacity="0.5" />
        <defs>
          <marker id="rot1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M0,0 L4,2 L0,4 Z" fill="#a78bfa" fillOpacity="0.6" />
          </marker>
        </defs>
        <text x="200" y="72" fill="#a78bfa" fontSize="6.5" fontFamily="monospace" fillOpacity="0.6">rot</text>
        <text x="170" y="128" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace" fontWeight="bold">f = 5</text>
        <text x="170" y="140" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.5">3 trans + 2 rot</text>
        <text x="170" y="151" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.5">gamma = 7/5 = 1.40</text>
        {/* Polyatomic */}
        <rect x="230" y="18" width="100" height="130" rx="8" fill="#f59e0b" fillOpacity="0.04" stroke="#f59e0b" strokeWidth="0.7" strokeOpacity="0.3" />
        <text x="280" y="35" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">POLYATOMIC</text>
        <text x="280" y="47" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontFamily="monospace" fillOpacity="0.45">H2O, CH4</text>
        <line x1="280" y1="95" x2="258" y2="72" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="280" y1="95" x2="302" y2="72" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.5" />
        <circle cx="280" cy="95" r="13" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="258" cy="72" r="9" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="302" cy="72" r="9" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="280" cy="95" r="5" fill="#f59e0b" fillOpacity="0.8" />
        <circle cx="258" cy="72" r="3.5" fill="#f59e0b" fillOpacity="0.7" />
        <circle cx="302" cy="72" r="3.5" fill="#f59e0b" fillOpacity="0.7" />
        <text x="280" y="128" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">f = 6</text>
        <text x="280" y="140" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.5">3 trans + 3 rot</text>
        <text x="280" y="151" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace" fillOpacity="0.5">gamma = 4/3 = 1.33</text>
      </svg>
    </div>
  );
}

function MeanFreePathSVG() {
  const path = "M 40 100 L 85 65 L 130 120 L 175 55 L 218 105 L 258 70 L 295 115";
  const dots: [number,number][] = [[85,65],[130,120],[175,55],[218,105],[258,70]];
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#05060F]">
      <div className="px-4 pt-3 pb-1">
 <p className="text-[10px] uppercase tracking-wider text-white/30">Fig 5 — Mean Free Path (zigzag between collisions)</p>
      </div>
      <svg viewBox="0 0 330 160" className="w-full" style={{ maxHeight: 160 }}>
        <path d={path} fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
        {dots.map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={10} fill="#f87171" fillOpacity="0.08" stroke="#f87171" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx={cx} cy={cy} r={4} fill="#f87171" fillOpacity="0.8" />
          </g>
        ))}
        <circle cx="40" cy="100" r="5" fill="#22d3ee" fillOpacity="0.9" />
        <circle cx="295" cy="115" r="5" fill="#22d3ee" fillOpacity="0.5" />
        <line x1="85" y1="80" x2="130" y2="80" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,2" strokeOpacity="0.6" />
        <text x="108" y="76" textAnchor="middle" fill="#34d399" fontSize="7.5" fontFamily="monospace" fillOpacity="0.9">lambda</text>
        <line x1="85" y1="81" x2="85" y2="78" stroke="#34d399" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="130" y1="121" x2="130" y2="78" stroke="#34d399" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.4" />
        <text x="165" y="148" fill="#ffffff" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fillOpacity="0.35">lambda = 1/(sqrt(2) pi d<sup>2</sup> n)  |  Red dots = collisions</text>
        <rect x="10" y="10" width="145" height="38" rx="5" fill="#0a0c18" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.1" />
        <text x="18" y="25" fill="#22d3ee" fontSize="7.5" fontFamily="monospace">lambda prop. to 1/P  (const T)</text>
        <text x="18" y="38" fill="#34d399" fontSize="7.5" fontFamily="monospace">lambda prop. to T    (const P)</text>
        <text x="18" y="51" fill="#a78bfa" fontSize="7.5" fontFamily="monospace">lambda prop. to 1/d<sup>2</sup> (always)</text>
      </svg>
    </div>
  );
}

// ─── Small reusable UI components ────────────────────────────────────────────

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
    <div className="flex items-center gap-2 mb-5">
      <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
      <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">{children}</h2>
    </div>
  );
}

function FormulaCard({ formula, label, note }: { formula: string; label: string; note?: string }) {
  return (
    <div className="p-4 rounded-2xl bg-[#090b18] border border-white/8">
      <p className="font-mono text-cyan-300 font-bold text-[14.5px] mb-1" dangerouslySetInnerHTML={{ __html: formula }} />
      <p className="text-[12px] text-white/50"><span dangerouslySetInnerHTML={{ __html: label }} /></p>
      {note && <p className="text-[12px] text-amber-400/80 mt-1"><span dangerouslySetInnerHTML={{ __html: note }} /></p>}
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
    violet: 'border-violet-500/20 bg-violet-500/[0.02]',
    cyan: 'border-cyan-500/20 bg-cyan-500/[0.02]',
    emerald: 'border-emerald-500/20 bg-emerald-500/[0.02]',
    amber: 'border-amber-500/20 bg-amber-500/[0.02]',
    rose: 'border-rose-500/20 bg-rose-500/[0.02]',
  };
  const badgeColors: Record<string, string> = {
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  };
  return (
    <div className={`rounded-2xl border p-5 space-y-4 bg-[#0A0C18] ${accentColors[color] || ''}`}>
      <div className="flex items-center gap-2">
 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase ${badgeColors[color] ||''}`}>
          Solved Example {number}
        </span>
      </div>
      <p className="text-white text-[13px] font-semibold leading-relaxed font-mono" dangerouslySetInnerHTML={{ __html: question }}></p>
      <div className="space-y-2 border-t border-white/5 pt-3">
 <h5 className="text-white/40 text-[12px] uppercase tracking-wider">Step-by-step Solution:</h5>
        <ol className="space-y-2 text-[13px] text-white/80 list-decimal pl-4 leading-relaxed font-sans">
          {steps.map((step, idx) => (
            <li key={idx} className="pl-1" dangerouslySetInnerHTML={{ __html: step }} />
          ))}
        </ol>
      </div>
 <div className="p-3 bg-black/45 border border-white/5 rounded-xl flex items-center justify-between text-[13px]">
        <span className="text-white/40 uppercase text-[12px] tracking-wider">Final Answer:</span>
        <span className="text-emerald-400 font-bold" dangerouslySetInnerHTML={{ __html: answer }}></span>
      </div>
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
            <p className="font-mono text-cyan-400 text-[14.5px] font-bold mt-0.5" dangerouslySetInnerHTML={{ __html: formula }} />
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
      </div>
      {open && (
        <p className="text-white/55 text-[13px] leading-relaxed mt-3 pt-3 border-t border-white/5" dangerouslySetInnerHTML={{ __html: detail }} />
      )}
    </button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function KineticTheoryLessonDetail({ progress, isCompleted, onNavigate }: Props) {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(10).fill(false));
  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pb-20">

      {/* HERO HEADER */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0A0C18] via-[#0D1026] to-[#0A0C18] border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Tag color="cyan">Physics Unit 10</Tag>
              <Tag color="rose">IAT Core</Tag>
              <Tag color="amber">Must Master</Tag>
            </div>
            <div className="text-right">
              <span className="text-[12px] uppercase font-bold text-white/40 block mb-1">Progress</span>
              <span className="text-[14.5px] font-mono font-bold text-cyan-400">{progress}%</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans font-extrabold">
              Kinetic Theory of Gases
            </h1>
            <p className="text-[12px] text-rose-400/80 font-semibold tracking-wide mt-1">
              Appears frequently in IAT exams
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { label: 'Revision Time', value: '15 min' },
              { label: 'IAT Priority', value: 'High' },
              { label: 'Difficulty', value: '3 / 5' },
              { label: 'IAT Questions', value: '1-2 / year' },
            ].map(({ label, value }) => (
              <div key={label} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase font-bold text-white/35 block mb-1">{label}</span>
                <span className="text-[13px] font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="pt-1">
            <div className="flex justify-between text-[12px] font-bold text-white/50 mb-1">
              <span className="uppercase">Lesson Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[12px] text-white/40 font-medium">
              {isCompleted ? 'Reading Completed (100%) - Quiz Unlocked!' : 'Reading - Complete lesson to unlock quiz.'}
            </p>
          </div>
        </div>
      </div>

      {/* WHAT YOU WILL LEARN */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5">
        <SectionTitle>What You will Learn</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            'Ideal gas equation and Avogadro hypothesis',
            'Core assumptions of Kinetic Theory',
            'Pressure derivation from molecular motion',
            'Kinetic interpretation of temperature',
            'Three molecular speed types and their order',
            'Degrees of freedom and Equipartition Law',
            'Specific heat capacity Cv, Cp and gamma',
            'Mean free path and its dependencies',
            'Mixed gas degrees of freedom (IAT trick)',
          ].map(item => (
            <div key={item} className="flex items-start gap-2.5 text-[13px] text-white/75">
              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
        </div>
      </div>

      {/* PART 1: MOLECULAR NATURE */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 1</span>
          <h2 className="text-white font-display font-bold text-[17px]">Molecular Nature and Gas Laws</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          At very low pressures and high temperatures, real gases behave like Ideal Gases. The state of an ideal gas is defined by macroscopic variables: Pressure (P), Volume (V), and Temperature (T).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="PV = &mu;RT = Nk<sub>B</sub> T"
            label="Ideal Gas Equation: &mu; = moles, N = total molecules, R = 8.314 J/mol/K, k<sub>B</sub> = 1.38 &times; 10<sup>&minus;23</sup> J/K"
            note="R = N<sub>A</sub> &times; k<sub>B</sub>. This connects macroscopic (R) and microscopic (k<sub>B</sub>) constants."
          />
          <FormulaCard
            formula="(P + a/V<sup>2</sup>)(V &minus; b) = RT"
            label="Van der Waals Equation (Real Gas): a corrects for attractive forces, b corrects for molecular volume"
            note="Shows molecular interactions and corrections to pressure and volume for non-ideal conditions."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12.5px] leading-relaxed">
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
            <span className="text-cyan-400 font-bold block">⚖️ Avogadro&apos;s Law</span>
            <span className="text-white/65 block">V &propto; n (at constant T and P). Equal volumes of ideal gases contain equal numbers of molecules.</span>
          </div>
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
            <span className="text-cyan-400 font-bold block">🧪 Dalton&apos;s Law</span>
            <span className="text-white/65 block">P<sub>total</sub> = P<sub>1</sub> + P<sub>2</sub> + ... for non-reacting gas mixtures in a single container.</span>
          </div>
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
            <span className="text-cyan-400 font-bold block">🌀 Brownian Motion</span>
            <span className="text-white/65 block">Random zig-zag motion of suspended particles. Experimental proof of KTG molecular motion.</span>
          </div>
        </div>

        <InsightCard>
          Avogadro Hypothesis: N<sub>A</sub> = 6.022 &times; 10<sup>23</sup> per mol. 1 mole of any ideal gas occupies exactly 22.4 L at STP (273.15 K, 1 atm).
        </InsightCard>

        <TrapCard title="Real vs Ideal Gas Trap">
          IAT sometimes gives real gas data (high P or low T) and asks you to apply PV = nRT. At high pressure or low temperature, intermolecular forces become significant and the ideal gas approximation breaks down. Never apply ideal gas laws blindly.
        </TrapCard>
      </div>

      {/* PART 2: KINETIC THEORY WITH VISUAL */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 2</span>
          <h2 className="text-white font-display font-bold text-[17px]">Kinetic Theory of an Ideal Gas</h2>
        </div>
        <GasContainerSVG />
        <div>
          <h3 className="text-white/90 font-display font-bold text-[14.5px] mb-3">Core Assumptions (IAT MCQ source)</h3>
          <div className="space-y-2">
            {[
              ['Identical point masses', 'Gas consists of a large number of identical, perfectly elastic, point-sized molecules whose volume is negligible compared to the container.'],
              ['Random motion', 'Molecules move randomly in all directions with no preferred direction. The distribution of velocities is isotropic.'],
              ['Elastic collisions', 'All collisions between molecules and walls are perfectly elastic: kinetic energy and momentum are conserved.'],
              ['Negligible collision time', 'Time spent during a collision is negligible compared to time between collisions.'],
              ['No intermolecular forces', 'Except during collisions, molecules exert no forces on each other (ideal assumption).'],
            ].map(([title, desc]) => (
              <div key={title as string} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-cyan-400 text-[13px] font-bold mt-0.5 shrink-0">-&gt;</span>
                <div>
                  <p className="text-white/85 text-[13px] font-semibold">{title as string}</p>
                  <p className="text-white/50 text-[12px] leading-relaxed mt-0.5">{desc as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormulaCard
            formula="P = (1/3) &rho; v<sub>rms</sub><sup>2</sup>"
            label="Gas pressure from molecular motion. Also written as P = (1/3)(N/V)m v<sub>rms</sub><sup>2</sup>"
            note="Derived from Newton 2nd law applied to molecular collisions with walls."
          />
          <FormulaCard
            formula="E<sub>avg</sub> = (3/2) k<sub>B</sub> T"
            label="Average translational KE per molecule. Temperature IS this energy, nothing else."
            note="T is NOT a measure of total energy, only translational KE."
          />
        </div>
        <div className="p-4 rounded-2xl bg-cyan-500/[0.03] border border-cyan-500/10 space-y-1">
 <span className="text-[12px] font-bold text-cyan-400 uppercase tracking-wider block">⚡ Derivation: v<sub>rms</sub> from Pressure</span>
          <p className="text-[12.5px] leading-relaxed text-white/70">
            From pressure: P = &frac13; &rho; v<sub>rms</sub><sup>2</sup> &rArr; v<sub>rms</sub> = &radic;(3P / &rho;). 
            Since density &rho; = M / V and PV = RT (for 1 mole):
            <br />
            <strong>v<sub>rms</sub> = &radic;(3PV / M) = &radic;(3RT / M)</strong>
          </p>
        </div>
        <TrapCard title="Temperature Misconception - Number 1 IAT Trap">
          Temperature measures ONLY the average translational KE of molecules which is (3/2)k<sub>BT</sub>. It does NOT measure total energy. Two gases at the same temperature have the same average translational KE regardless of their molecular mass.
        </TrapCard>
      </div>

      {/* PART 3: SPEEDS WITH VISUALS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 3</span>
          <h2 className="text-white font-display font-bold text-[17px]">Molecular Speeds</h2>
        </div>
        <p className="text-white/55 text-[13px] leading-relaxed">
          All three speeds are derived from the Maxwell-Boltzmann distribution. M = molar mass (kg/mol), m = molecular mass (kg), T in Kelvin.
        </p>
        <MaxwellBoltzmannSVG />
        <div className="space-y-2.5">
          <RevealCard
            emoji="&#x1F3AF;"
            title="Most Probable Speed - peak of distribution"
            formula="v<sub>mp</sub> = sqrt(2RT/M) = sqrt(2k<sub>B</sub>T/m)"
            detail="Speed possessed by the maximum number of molecules, the peak of the Maxwell-Boltzmann curve. LOWEST of the three speeds. At higher T, the peak flattens and shifts right."
          />
          <RevealCard
            emoji="&#x1F4CA;"
            title="Average Speed - arithmetic mean"
            formula="v<sub>avg</sub> = sqrt(8RT/&pi;M) = sqrt(8k<sub>B</sub>T/&pi;m)"
            detail="Arithmetic mean of all molecular speeds. v<sub>rms</sub> is approximately 1.085 times v<sub>avg</sub>. Note the pi in the denominator which comes from the Maxwell distribution integration."
          />
          <RevealCard
            emoji="&#x1F680;"
            title="RMS Speed - used in pressure and energy"
            formula="v<sub>rms</sub> = sqrt(3RT/M) = sqrt(3k<sub>B</sub>T/m)"
            detail="Root Mean Square speed. Directly related to KE: (1/2)mv<sub>rms</sub><sup>2</sup> = (3/2)k<sub>B</sub>T. This is the HIGHEST of the three speeds."
          />
        </div>
        <SpeedBarSVG />
        <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/15">
          <p className="text-[12px] font-black text-violet-400 uppercase tracking-wider mb-2">Speed Ratio Order - Memorise this</p>
 <p className="text-white font-bold text-[14.5px] text-center py-1">v<sub>rms</sub> &gt; v<sub>avg</sub> &gt; v<sub>mp</sub></p>
          <p className="text-white/50 text-[12px] text-center mt-1">Ratio: sqrt(3) : sqrt(8/pi) : sqrt(2) which is approximately 1.73 : 1.60 : 1.41</p>
          <p className="text-violet-300/70 text-[12px] text-center mt-1">Mnemonic: RAM (RMS greater than Average greater than Most Probable)</p>
        </div>
        <TrapCard title="Speed vs Temperature Scaling">
          All three speeds scale as sqrt(T), NOT linearly with T. To double v<sub>rms</sub> you need to quadruple T (in Kelvin). Also v is proportional to 1/sqrt(M): heavier molecules move slower at the same temperature. H2 moves approximately 4 times faster than O2 at the same T.
        </TrapCard>
      </div>

      {/* PART 4: EQUIPARTITION WITH DOF VISUAL */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 4</span>
          <h2 className="text-white font-display font-bold text-[17px]">Law of Equipartition of Energy</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          In thermal equilibrium, the total energy of a molecule is equally distributed among all its degrees of freedom (f). Each degree of freedom contributes (1/2)k<sub>BT</sub> of energy per molecule.
        </p>
        <FormulaCard
          formula="E<sub>total</sub> per molecule = (f/2) k<sub>B</sub> T"
          label="Total average energy per molecule at temperature T, where f = total degrees of freedom."
        />
        <DoFMoleculesSVG />
        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[500px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold text-[12px] uppercase tracking-wider">Gas Type</th>
                <th className="text-left px-4 py-3 text-white/50 font-bold text-[12px] uppercase tracking-wider">Example</th>
                <th className="text-center px-4 py-3 text-cyan-400/80 font-bold text-[12px] uppercase tracking-wider">Trans.</th>
                <th className="text-center px-4 py-3 text-amber-400/80 font-bold text-[12px] uppercase tracking-wider">Rot.</th>
                <th className="text-center px-4 py-3 text-white font-bold text-[12px] uppercase tracking-wider">Total f</th>
                <th className="text-center px-4 py-3 text-violet-400/80 font-bold text-[12px] uppercase tracking-wider">Energy/molecule</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Monatomic', 'He, Ar, Ne', '3', '0', '3', '(3/2)k<sub>B</sub>T'],
                ['Diatomic', 'H2, O2, N2', '3', '2', '5', '(5/2)k<sub>B</sub>T'],
                ['Polyatomic', 'H2O, CH4, CO2', '3', '3', '6', '3k<sub>B</sub>T'],
              ].map(([type, ex, t, r, f, e]) => (
                <tr key={type as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{type as string}</td>
                  <td className="px-4 py-3 text-white/50">{ex as string}</td>
 <td className="px-4 py-3 text-cyan-400 text-center">{t as string}</td>
 <td className="px-4 py-3 text-amber-400 text-center">{r as string}</td>
 <td className="px-4 py-3 text-white font-bold text-center">{f as string}</td>
 <td className="px-4 py-3 text-violet-300 text-center text-[12px]">{e as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <InsightCard>
          At room temperature, vibrational modes in diatomic molecules are NOT active. So diatomic gases use f = 5, NOT 7. IAT uses f = 5 for diatomic gases unless told otherwise.
          <br /><br />
          <strong>🔥 High-Temperature Exception:</strong> At very high temperatures (&gt; 1000 K), diatomic molecules activate vibrational modes, which add 2 additional degrees of freedom (1 kinetic + 1 potential). In this regime:
 <span className="text-cyan-300 block mt-1">f = 7, &gamma; = C<sub>p</sub>/C<sub>v</sub> = 9/7 &asymp; 1.29</span>
        </InsightCard>
      </div>

      {/* PART 5: SPECIFIC HEAT */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 5</span>
          <h2 className="text-white font-display font-bold text-[17px]">Specific Heat Capacity</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">Molar heat capacities are directly derived from degrees of freedom.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <FormulaCard formula="C<sub>v</sub> = (f/2)R" label="Molar heat capacity at constant volume" />
          <FormulaCard formula="C<sub>p</sub> = (1 + f/2)R" label="Molar heat capacity at constant pressure. C<sub>p</sub> = C<sub>v</sub> + R (Mayer relation)" />
          <FormulaCard formula="&gamma; = C<sub>p</sub>/C<sub>v</sub> = 1 + 2/f" label="Ratio of heat capacities. Used in adiabatic processes." />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/8 w-full">
          <table className="w-full text-[13px] min-w-[500px]">
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="text-left px-4 py-3 text-white/50 font-bold text-[12px] uppercase">Gas Type</th>
                <th className="text-center px-4 py-3 text-white/50 font-bold text-[12px] uppercase">f</th>
                <th className="text-center px-4 py-3 text-cyan-400/80 font-bold text-[12px] uppercase">C<sub>v</sub></th>
                <th className="text-center px-4 py-3 text-amber-400/80 font-bold text-[12px] uppercase">C<sub>p</sub></th>
                <th className="text-center px-4 py-3 text-rose-400/80 font-bold text-[12px] uppercase">gamma</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Monatomic', '3', '(3/2)R', '(5/2)R', '5/3 = 1.67'],
                ['Diatomic', '5', '(5/2)R', '(7/2)R', '7/5 = 1.40'],
                ['Polyatomic', '6', '3R', '4R', '4/3 = 1.33'],
              ].map(([t, f, cv, cp, g]) => (
                <tr key={t as string} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-white/80 font-semibold">{t as string}</td>
 <td className="px-4 py-3 text-center text-white/70">{f as string}</td>
 <td className="px-4 py-3 text-center text-cyan-300">{cv as string}</td>
 <td className="px-4 py-3 text-center text-amber-300">{cp as string}</td>
 <td className="px-4 py-3 text-center text-rose-300 font-bold">{g as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TrapCard title="C<sub>v</sub> vs C<sub>p</sub> Confusion">
          C<sub>p</sub> is ALWAYS greater than C<sub>v</sub> by exactly R (Mayer relation: C<sub>p</sub> minus C<sub>v</sub> = R). At constant pressure, some energy goes into doing PdV work on the surroundings so more heat is needed for the same temperature change.
        </TrapCard>
      </div>

      {/* PART 6: MEAN FREE PATH WITH VISUAL */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-5">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 6</span>
          <h2 className="text-white font-display font-bold text-[17px]">Mean Free Path</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          The average distance a molecule travels between two successive collisions. Determined by molecular size and number density.
        </p>
        <MeanFreePathSVG />
        <FormulaCard
          formula="lambda = 1 / (sqrt(2) pi d^2 n)"
          label="d = molecular diameter (m), n = N/V = number density (molecules per m^3)"
          note="The sqrt(2) factor accounts for the relative velocity between molecules during collisions."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { dep: 'lambda prop. 1/P', cond: 'at constant T', why: 'Higher P - more molecules per volume - more collisions' },
            { dep: 'lambda prop. T', cond: 'at constant P', why: 'Higher T - gas expands - fewer molecules per volume' },
            { dep: 'lambda prop. 1/d^2', cond: 'always', why: 'Larger molecule - bigger collision cross-section' },
          ].map(({ dep, cond, why }) => (
            <div key={dep} className="p-3 rounded-2xl bg-[#090b18] border border-white/8 text-center">
              <p className="font-mono text-cyan-300 font-bold text-[14.5px]">{dep}</p>
              <p className="text-[12px] text-amber-400/80 mt-0.5">{cond}</p>
              <p className="text-[12px] text-white/45 mt-1 leading-relaxed">{why}</p>
            </div>
          ))}
        </div>
        <InsightCard>
          At STP, lambda for air molecules is approximately 70 nm, while molecular diameter d is approximately 0.3 nm. So lambda/d is approximately 230 meaning molecules travel around 230 diameters between collisions. This justifies the negligible collision time assumption of KTG.
        </InsightCard>
      </div>

      {/* PART 7: SOLVED NUMERICAL EXAMPLES */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-6">
        <div className="flex items-center gap-2.5">
 <span className="px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">PART 7</span>
          <h2 className="text-white font-display font-bold text-[17px]">Solved Numerical Examples</h2>
        </div>
        <p className="text-white/60 text-[13px] leading-relaxed">
          KTG questions on the IAT are calculation-heavy. Master these step-by-step solutions to common problem models:
        </p>
        <div className="space-y-4">
          <SolvedExample
            number={1}
            question="Compare the root mean square velocity (v<sub>rms</sub>) of Hydrogen (H<sub>2</sub>) and Oxygen (O<sub>2</sub>) molecules at the same temperature."
            steps={[
              "Recall the RMS speed formula: v<sub>rms</sub> = &radic;(3RT/M), where M is the molar mass.",
              "At constant temperature T, v<sub>rms</sub> is inversely proportional to the square root of the molar mass: v<sub>rms</sub> &propto; 1/&radic;M.",
              "Molar mass of H<sub>2</sub> is 2 g/mol (2 &times; 10<sup>&minus;3</sup> kg/mol) and molar mass of O<sub>2</sub> is 32 g/mol (32 &times; 10<sup>&minus;3</sup> kg/mol).",
              "Set up the ratio: v(H<sub>2</sub>)/v(O<sub>2</sub>) = &radic;[M(O<sub>2</sub>)/M(H<sub>2</sub>)] = &radic;(32/2) = &radic;16 = 4."
            ]}
            answer="v<sub>rms</sub>(H<sub>2</sub>) : v<sub>rms</sub>(O<sub>2</sub>) = 4 : 1"
            color="cyan"
          />

          <SolvedExample
            number={2}
            question="Find the ratio of specific heat capacities (&gamma;<sub>mix</sub>) for a gas mixture containing 2 moles of Helium (He) and 3 moles of Oxygen (O<sub>2</sub>) at room temperature."
            steps={[
              "Helium is monatomic: f<sub>1</sub> = 3, n<sub>1</sub> = 2 mol.",
              "Oxygen is diatomic (vibrational modes inactive at room temp): f<sub>2</sub> = 5, n<sub>2</sub> = 3 mol.",
              "Compute mixture degrees of freedom using the mole-weighted average shortcut: f<sub>mix</sub> = (n<sub>1</sub>f<sub>1</sub> + n<sub>2</sub>f<sub>2</sub>)/(n<sub>1</sub> + n<sub>2</sub>) = (2&times;3 + 3&times;5)/(2 + 3) = (6 + 15)/5 = 21/5 = 4.2.",
              "Calculate the ratio of specific heats: &gamma;<sub>mix</sub> = 1 + 2/f<sub>mix</sub> = 1 + 2/4.2 = 1 + 10/21 = 31/21 &asymp; 1.48."
            ]}
            answer="&gamma;<sub>mix</sub> = 31/21 &asymp; 1.48"
            color="amber"
          />

          <SolvedExample
            number={3}
            question="Calculate the mean free path (&lambda;) of Nitrogen (N<sub>2</sub>) molecules at STP (T = 273.15 K, P = 1.013 &times; 10<sup>5</sup> N/m<sup>2</sup>), given the molecular diameter d = 0.3 nm."
            steps={[
              "Recall the mean free path formula: &lambda; = 1 / (&radic;2 &pi; d<sup>2</sup> n), where n is the molecular number density (N/V).",
              "From the ideal gas equation: PV = N k<sub>B</sub> T &rArr; n = N/V = P / (k<sub>B</sub> T).",
              "Substitute STP conditions: n = (1.013 &times; 10<sup>5</sup>) / (1.38 &times; 10<sup>&minus;23</sup> &times; 273.15) &asymp; 2.68 &times; 10<sup>25</sup> molecules/m<sup>3</sup>.",
              "Given diameter d = 0.3 nm = 3 &times; 10<sup>&minus;10</sup> m. Compute the collision factor: &radic;2 &pi; d<sup>2</sup> n = 1.414 &times; 3.1416 &times; (3 &times; 10<sup>&minus;10</sup>)<sup>2</sup> &times; 2.68 &times; 10<sup>25</sup> &asymp; 1.07 &times; 10<sup>7</sup> m<sup>&minus;1</sup>.",
              "Calculate mean free path: &lambda; = 1 / (1.07 &times; 10<sup>7</sup>) &asymp; 9.3 &times; 10<sup>&minus;8</sup> m = 93 nm."
            ]}
            answer="&lambda; &asymp; 93 nm"
            color="emerald"
          />

          <SolvedExample
            number={4}
            question="At what temperature will the root mean square velocity (v<sub>rms</sub>) of Oxygen (O<sub>2</sub>) molecules be equal to that of Hydrogen (H<sub>2</sub>) molecules at 300 K?"
            steps={[
              "Recall the RMS velocity formula: v<sub>rms</sub> = &radic;(3RT/M).",
              "Equate the velocities: v<sub>rms</sub>(O<sub>2</sub>) = v<sub>rms</sub>(H<sub>2</sub>) &rArr; &radic;[3R T(O<sub>2</sub>)/M(O<sub>2</sub>)] = &radic;[3R T(H<sub>2</sub>)/M(H<sub>2</sub>)].",
              "Square both sides and simplify: T(O<sub>2</sub>) / M(O<sub>2</sub>) = T(H<sub>2</sub>) / M(H<sub>2</sub>).",
              "Substitute the known values: T(H<sub>2</sub>) = 300 K, M(H<sub>2</sub>) = 2 g/mol, and M(O<sub>2</sub>) = 32 g/mol.",
              "Solve for T(O<sub>2</sub>): T(O<sub>2</sub>) = T(H<sub>2</sub>) &times; [M(O<sub>2</sub>)/M(H<sub>2</sub>)] = 300 &times; (32/2) = 300 &times; 16 = 4800 K."
            ]}
            answer="T = 4800 K"
            color="rose"
          />
        </div>
      </div>

      {/* PART 7: IAT EXAM FOCUS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-amber-500/10 space-y-5">
        <div className="flex items-center gap-2.5">
          <Flame className="w-4 h-4 text-amber-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[17px] uppercase tracking-widest text-[14.5px]">IAT Exam Focus and Shortcuts</h2>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
          <p className="text-[12px] font-black text-amber-400 uppercase tracking-wider mb-2">The Mixture DOF Trick - High Yield</p>
          <p className="text-white/60 text-[13px] leading-relaxed mb-3">
            For a mixture of n1 moles of gas A (f1 degrees) and n2 moles of gas B (f2 degrees):
          </p>
          <FormulaCard
            formula="f<sub>mix</sub> = (n<sub>1</sub>f<sub>1</sub> + n<sub>2</sub>f<sub>2</sub>) / (n<sub>1</sub> + n<sub>2</sub>)"
            label="Effective DOF for a gas mixture. Used to find C<sub>v</sub>, C<sub>p</sub>, &gamma; of the mixture."
          />
          <p className="text-white/50 text-[13px] mt-3">
            Example: 1 mol He (f=3) plus 2 mol O2 (f=5): f<sub>mix</sub> = (1x3 + 2x5)/(1+2) = 13/3 = 4.33. Then gamma<sub>mix</sub> = 1 + 2/f<sub>mix</sub> = 1 + 6/13 = 19/13.
          </p>
        </div>
        <h3 className="text-white/70 text-[13px] font-display font-bold uppercase tracking-wider">Question Recognition Patterns</h3>
        <div className="space-y-2">
          {[
            { cue: '"Find &gamma; of a mixture of gases"', think: 'Use f<sub>mix</sub> = (n<sub>1</sub>f<sub>1</sub>+n<sub>2</sub>f<sub>2</sub>)/(n<sub>1</sub>+n<sub>2</sub>), then &gamma; = 1+2/f<sub>mix</sub>' },
            { cue: '"Two gases at same T - compare KE"', think: 'Same T means same average translational KE = (3/2)k<sub>B</sub>T. Mass does NOT matter.' },
            { cue: '"Double the temperature - effect on v<sub>rms</sub>"', think: 'v<sub>rms</sub> is proportional to sqrt(T). Double T means v<sub>rms</sub> increases by sqrt(2), NOT by 2.' },
            { cue: '"Halve the volume at constant T"', think: 'n = N/V doubles, so lambda = 1/(sqrt(2)*pi*d^2*n) halves. Mean free path is halved.' },
            { cue: '"Why is C<sub>p</sub> greater than C<sub>v</sub>?"', think: 'At constant P, system does work W=PdeltaV. Extra heat equals this work. C<sub>p</sub> &minus; C<sub>v</sub> = R.' },
            { cue: '"Which gas has highest v<sub>rms</sub> at same T?"', think: 'v<sub>rms</sub> is proportional to 1/sqrt(M). Lowest molar mass means highest speed. H<sub>2</sub> is fastest.' },
          ].map(({ cue, think }) => (
            <div key={cue} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 grid sm:grid-cols-2 gap-2">
              <div>
                <p className="text-[12px] font-bold text-white/35 uppercase mb-1">If question says</p>
                <p className="text-[13px] font-mono text-cyan-400" dangerouslySetInnerHTML={{ __html: cue }} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-white/35 uppercase mb-1">Immediately think</p>
                <p className="text-[13px] text-white/70" dangerouslySetInnerHTML={{ __html: think }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMMON TRAPS */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <h2 className="text-white font-display font-bold text-[14.5px] uppercase tracking-widest">Common Traps and Mistakes</h2>
        </div>
        <div className="space-y-3">
          <TrapCard title="Trap 1: Temperature equals Total Energy">
            T measures ONLY average translational KE = (3/2)k<sub>BT</sub>. For polyatomic gases, total energy includes rotational modes too = (f/2)k<sub>BT</sub>. Do NOT say same T means same total energy for different gas types.
          </TrapCard>
          <TrapCard title="Trap 2: Using M vs m in speed formulas">
            v<sub>rms</sub> = sqrt(3RT/M) uses molar mass M in kg/mol such as O2 = 0.032 kg/mol. v<sub>rms</sub> = sqrt(3k<sub>B</sub>T/m) uses molecular mass m in kg. Mixing them gives answers off by a factor of approximately 10<sup>23</sup>.
          </TrapCard>
          <TrapCard title="Trap 3: Diatomic gamma equals 5/3 (the monatomic value)">
            Monatomic gamma = 5/3. Diatomic gamma = 7/5. Using 5/3 for N2 or O2 is a common error. Always identify gas type first, get f, then calculate gamma = 1+2/f.
          </TrapCard>
          <TrapCard title="Trap 4: Mean free path and temperature context">
            At CONSTANT PRESSURE lambda is proportional to T (gas expands, n decreases). At CONSTANT VOLUME, T has no direct effect on lambda since n is fixed. The context completely changes the answer.
          </TrapCard>
        </div>
      </div>

      {/* 1-MINUTE REVISION */}
      <div className="p-6 rounded-3xl bg-[#0A0C18] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <SectionTitle>1-Minute Revision Checklist</SectionTitle>
 <span className="text-[12px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
            {checkedItems.filter(Boolean).length} / 10 Checked
          </span>
        </div>
        <p className="text-[12.5px] text-white/50 leading-relaxed font-sans">
          Click on each item to check off your review progress before stepping into the exam hall:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
          {[
            "PV = &mu;RT = Nk<sub>B</sub>T &mdash; two forms, know both",
            "E<sub>avg</sub> = (3/2)k<sub>B</sub>T per molecule (translational only)",
            "RMS &gt; Average &gt; Most Probable &mdash; RAM mnemonic",
            "RMS: &radic;(3RT/M), Most Probable: &radic;(2RT/M), Average: &radic;(8RT/&pi;M)",
            "Monatomic f=3, Diatomic f=5, Polyatomic f=6",
            "C<sub>v</sub> = (f/2)R, C<sub>p</sub> = C<sub>v</sub> + R, &gamma; = 1 + 2/f",
            "&gamma;: monatomic 5/3 (1.67), diatomic 7/5 (1.40), polyatomic 4/3 (1.33)",
            "&lambda; = 1/(&radic;2 &pi; d<sup>2</sup> n) &mdash; mean free path formula",
            "&lambda; &propto; 1/P at constant T, and &lambda; &propto; T at constant P",
            "Mixture DOF shortcut: f<sub>mix</sub> = (n₁f₁ + n₂f₂) / (n₁ + n₂)"
          ].map((item, idx) => (
            <label
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                checkedItems[idx] 
                  ? "bg-cyan-500/5 border-cyan-500/20 text-cyan-200" 
                  : "bg-white/[0.01] border-white/5 hover:border-white/10 text-white/70"
              }`}
            >
              <input
                type="checkbox"
                checked={checkedItems[idx]}
                onChange={() => {
                  const newChecked = [...checkedItems];
                  newChecked[idx] = !newChecked[idx];
                  setCheckedItems(newChecked);
                }}
                className="rounded border-white/10 bg-black/40 text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0 w-4 h-4 shrink-0"
              />
              <span className="leading-snug" dangerouslySetInnerHTML={{ __html: item }} />
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}
