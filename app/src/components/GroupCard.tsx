import { motion } from 'framer-motion';
import { Users, Lock, Unlock, TrendingUp, ChevronRight } from 'lucide-react';
import type { StudyGroup } from '../types';

interface GroupCardProps {
  group: StudyGroup;
  onClick: () => void;
  index?: number;
}

export default function GroupCard({ group, onClick, index = 0 }: GroupCardProps) {
  const progressPercent = (group.weeklyProgress / group.weeklyGoal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onClick}
      className="
        relative p-6 rounded-2xl cursor-pointer
        bg-gradient-to-br from-white/5 to-white/[0.02]
        border border-white/10 backdrop-blur-xl
        hover:border-indigo-500/30 hover:shadow-glow
        transition-all duration-300 group
        overflow-hidden
      "
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={group.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${group.name}&backgroundColor=6366f1`}
                alt={group.name}
                className="w-12 h-12 rounded-xl object-cover border border-white/10"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#111827] border border-white/10">
                {group.isPrivate ? (
                  <Lock className="w-3 h-3 text-gray-400" />
                ) : (
                  <Unlock className="w-3 h-3 text-green-400" />
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                {group.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-1">{group.description}</p>
            </div>
          </div>
          
          <motion.div
            whileHover={{ x: 4 }}
            className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5 text-indigo-400" />
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              {group.memberCount}/{group.maxMembers} members
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">
              Rank #{group.rank}
            </span>
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Weekly Goal</span>
            <span className="text-indigo-400 font-medium">
              {group.weeklyProgress}/{group.weeklyGoal} questions
            </span>
          </div>
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercent, 100)}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
