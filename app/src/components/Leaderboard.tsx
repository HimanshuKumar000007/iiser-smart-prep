import { motion } from 'framer-motion';
import { Crown, Medal, Award, TrendingUp, TrendingDown } from 'lucide-react';
import type { GroupMember } from '../types';

interface LeaderboardProps {
  members: GroupMember[];
  currentUserId?: string;
}

const rankIcons = [
  { icon: Crown, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
  { icon: Medal, color: 'text-gray-300', bg: 'bg-gray-300/20' },
  { icon: Award, color: 'text-amber-600', bg: 'bg-amber-600/20' },
];

export default function Leaderboard({ members, currentUserId }: LeaderboardProps) {
  const sortedMembers = [...members].sort((a, b) => a.rank - b.rank);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5">
        <h3 className="font-semibold text-lg">Leaderboard</h3>
        <p className="text-sm text-gray-400">Top performers this week</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-white/5">
              <th className="px-6 py-3 font-medium">Rank</th>
              <th className="px-6 py-3 font-medium">Member</th>
              <th className="px-6 py-3 font-medium">Accuracy</th>
              <th className="px-6 py-3 font-medium">XP</th>
              <th className="px-6 py-3 font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((member, index) => {
              const isCurrentUser = member.id === currentUserId;
              const rankConfig = rankIcons[index];
              const RankIcon = rankConfig?.icon;

              return (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`
                    group transition-colors
                    ${isCurrentUser ? 'bg-indigo-500/10' : 'hover:bg-white/5'}
                  `}
                >
                  {/* Rank */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index < 3 ? (
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center
                          ${rankConfig.bg}
                        `}>
                          <RankIcon className={`w-4 h-4 ${rankConfig.color}`} />
                        </div>
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 font-medium">
                          #{member.rank}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Member */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className={`
                            w-10 h-10 rounded-full object-cover
                            ${isCurrentUser ? 'ring-2 ring-indigo-500' : ''}
                          `}
                        />
                        {member.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#111827]" />
                        )}
                      </div>
                      <div>
                        <p className={`
                          font-medium
                          ${isCurrentUser ? 'text-indigo-400' : 'text-white'}
                        `}>
                          {member.name}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-indigo-400/70">(You)</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Accuracy */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${member.accuracy}%` }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                          className={`
                            h-full rounded-full
                            ${member.accuracy >= 90 ? 'bg-green-400' :
                              member.accuracy >= 70 ? 'bg-yellow-400' : 'bg-red-400'}
                          `}
                        />
                      </div>
                      <span className="text-sm text-gray-300">{member.accuracy}%</span>
                    </div>
                  </td>

                  {/* XP */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">
                      {member.xp.toLocaleString()}
                    </span>
                  </td>

                  {/* Trend */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {Math.random() > 0.5 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`
                        text-sm
                        ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}
                      `}>
                        {Math.floor(Math.random() * 10) + 1}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
