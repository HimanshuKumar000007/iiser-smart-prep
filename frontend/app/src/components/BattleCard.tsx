import { motion } from 'framer-motion';
import { Clock, Target } from 'lucide-react';
import type { BattleMode } from '../types';

interface BattleCardProps {
  mode: BattleMode;
  isSelected: boolean;
  onClick: () => void;
  index?: number;
}

export default function BattleCard({ mode, isSelected, onClick, index = 0 }: BattleCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative w-full p-6 rounded-2xl text-left
        transition-all duration-300 overflow-hidden
        ${isSelected 
          ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500 shadow-glow' 
          : 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
        }
      `}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="selectionIndicator"
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      {/* Icon */}
      <div 
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center mb-4
          ${isSelected ? 'bg-indigo-500/30' : 'bg-white/5'}
        `}
        style={{ color: mode.color }}
      >
        {mode.icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-1">{mode.name}</h3>
      <p className="text-sm text-gray-400 mb-4">{mode.description}</p>

      {/* Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-300">{mode.questionCount} Qs</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-300">
            ~{Math.ceil(mode.questionCount * 0.5)} min
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      {isSelected && (
        <>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        </>
      )}
    </motion.button>
  );
}
