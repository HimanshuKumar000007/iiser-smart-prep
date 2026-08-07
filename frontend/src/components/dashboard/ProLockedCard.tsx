/**
 * ProLockedCard — Reusable Pro gate overlay card
 *
 * Wraps any feature that requires a Pro subscription.
 * Shows a blurred preview of the feature with a premium
 * upgrade prompt on top.
 */

import { Lock, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface Props {
  /** Feature name to display in the lock overlay */
  featureName: string;
  /** Short description of what Pro unlocks */
  featureDesc?: string;
  /** Icon emoji or text label shown in the feature badge */
  featureIcon?: string;
  /** Colour accent: 'violet' | 'cyan' | 'emerald' | 'amber' */
  accent?: 'violet' | 'cyan' | 'emerald' | 'amber';
  /** The actual component to blur behind the overlay (optional preview) */
  children?: React.ReactNode;
  /** Navigate handler — used to go to subscription page */
  onNavigate?: (view: string) => void;
  /** Additional class names for the wrapper */
  className?: string;
}

const accentMap = {
  violet: {
    glow: 'from-violet-600/20 to-indigo-600/10',
    border: 'border-violet-500/30',
    badge: 'bg-violet-500/15 border-violet-500/25 text-violet-300',
    btn: 'from-violet-600 via-indigo-600 to-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.4)]',
    pill: 'bg-violet-500/10 text-violet-300',
    iconBg: 'bg-violet-500/15',
    lockColor: 'text-violet-400',
  },
  cyan: {
    glow: 'from-cyan-600/20 to-blue-600/10',
    border: 'border-cyan-500/30',
    badge: 'bg-cyan-500/15 border-cyan-500/25 text-cyan-300',
    btn: 'from-cyan-600 via-blue-600 to-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    pill: 'bg-cyan-500/10 text-cyan-300',
    iconBg: 'bg-cyan-500/15',
    lockColor: 'text-cyan-400',
  },
  emerald: {
    glow: 'from-emerald-600/20 to-teal-600/10',
    border: 'border-emerald-500/30',
    badge: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300',
    btn: 'from-emerald-600 via-teal-600 to-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.4)]',
    pill: 'bg-emerald-500/10 text-emerald-300',
    iconBg: 'bg-emerald-500/15',
    lockColor: 'text-emerald-400',
  },
  amber: {
    glow: 'from-amber-600/20 to-orange-600/10',
    border: 'border-amber-500/30',
    badge: 'bg-amber-500/15 border-amber-500/25 text-amber-300',
    btn: 'from-amber-500 via-orange-500 to-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    pill: 'bg-amber-500/10 text-amber-300',
    iconBg: 'bg-amber-500/15',
    lockColor: 'text-amber-400',
  },
};

export function ProLockedCard({
  featureName,
  featureDesc = 'Upgrade to SmartPrep Pro to unlock this feature.',
  featureIcon = '✦',
  accent = 'violet',
  children,
  onNavigate,
  className,
}: Props) {
  const a = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'relative rounded-3xl overflow-hidden border bg-[#0A0C16]',
        a.border,
        className
      )}
    >
      {/* Blurred children preview */}
      {children && (
        <div className="pointer-events-none select-none blur-[3px] opacity-30 saturate-50 scale-[0.98] origin-top transition-all">
          {children}
        </div>
      )}

      {/* Overlay lock panel */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center text-center p-6',
          'bg-gradient-to-br',
          a.glow,
          'backdrop-blur-[2px]'
        )}
      >
        {/* Ambient glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

        {/* PRO Badge */}
        <div className={cn('flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase mb-4', a.badge)}>
          <Sparkles className="w-3 h-3" />
          SmartPrep Pro
        </div>

        {/* Lock icon */}
        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border', a.iconBg, a.border)}>
          <Lock className={cn('w-5 h-5', a.lockColor)} />
        </div>

        {/* Feature name */}
        <h3 className="text-white font-display font-black text-lg lg:text-xl mb-1.5 tracking-tight">
          {featureIcon && <span className="mr-1.5">{featureIcon}</span>}
          {featureName}
        </h3>
        <p className="text-white/45 text-xs max-w-[260px] leading-relaxed mb-5">
          {featureDesc}
        </p>

        {/* Upgrade CTA */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate?.('subscription')}
          className={cn(
            'flex items-center gap-2 bg-gradient-to-r text-white font-bold px-5 py-2.5 rounded-full text-xs transition-all',
            a.btn
          )}
        >
          Upgrade to Pro
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
