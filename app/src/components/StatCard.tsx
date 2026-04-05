import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { StatCardProps } from '../types';

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  trend = 'neutral',
  glowColor = 'indigo'
}: StatCardProps) {
  const glowColors = {
    indigo: 'shadow-glow hover:shadow-glow-lg',
    success: 'shadow-glow-success',
    danger: 'shadow-glow-danger',
    warning: 'shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]',
  };

  const gradientColors = {
    indigo: 'from-indigo-500/20 to-purple-500/20',
    success: 'from-green-500/20 to-emerald-500/20',
    danger: 'from-red-500/20 to-rose-500/20',
    warning: 'from-amber-500/20 to-yellow-500/20',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative p-6 rounded-2xl overflow-hidden
        bg-gradient-to-br ${gradientColors[glowColor]}
        border border-white/10 backdrop-blur-xl
        transition-shadow duration-300
        ${glowColors[glowColor]}
      `}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`
            p-3 rounded-xl bg-white/5 backdrop-blur-sm
            border border-white/10
          `}>
            {icon}
          </div>
          
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-1
        bg-gradient-to-r ${gradientColors[glowColor].replace('/20', '')}
        opacity-50
      `} />
    </motion.div>
  );
}
