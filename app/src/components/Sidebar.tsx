import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileQuestion,
  Bot,
  Users,
  Swords,
  BarChart3,
  ChevronLeft,
  Sparkles,
  User,
} from 'lucide-react';
import type { Page } from '../types';
import { supabase } from '../lib/supabaseClient';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'mock-tests', label: 'Mock Tests', icon: FileQuestion },
  { id: 'ai-doubts', label: 'AI Doubts', icon: Bot },
  { id: 'study-groups', label: 'Study Groups', icon: Users },
  { id: 'battles', label: 'Battles', icon: Swords },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

interface Profile {
  full_name?: string;
  rank?: number;
  xp?: number;
  avatar_url?: string;
}

export default function Sidebar({ currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name, rank, xp, avatar_url')
        .eq('id', user.id)
        .single();
      if (data) setProfile(data);
    }
    loadProfile();
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      {!isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 260 : 80,
          x: isOpen ? 0 : 0
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 h-screen bg-[#0B0F14]/95 backdrop-blur-xl border-r border-white/5 flex flex-col"
      >
        {/* Logo section */}
        <div className="p-6 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 overflow-hidden"
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0B0F14]" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="font-bold text-lg whitespace-nowrap">IISER</h1>
                <p className="text-xs text-gray-400 whitespace-nowrap">Smart Prep</p>
              </motion.div>
            )}
          </motion.div>

          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                onClick={() => onPageChange(item.id)}
                className={`
                  relative w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 group
                  ${isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Glow effect for active item */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-indigo-500/5 blur-xl" />
                )}

                <div className={`
                  relative p-2 rounded-lg transition-all duration-300
                  ${isActive
                    ? 'bg-indigo-500/20 shadow-glow'
                    : 'group-hover:bg-white/5'
                  }
                `}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
                </div>

                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-white/10">
                    {item.label}
                  </div>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom section - Real user profile */}
        <div className="p-4 border-t border-white/5">
          <motion.div
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl
              bg-white/[0.03] border border-white/5
              ${!isOpen && 'justify-center'}
            `}
          >
            <div className="relative flex-shrink-0">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border-2 border-indigo-500/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-300" />
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0B0F14]" />
            </div>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-left overflow-hidden"
              >
                <p className="font-medium text-sm truncate">
                  {profile?.full_name ?? 'Loading...'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {profile?.rank ? `Rank #${profile.rank}` : 'No rank yet'}
                  {profile?.xp ? ` • ${(profile.xp / 1000).toFixed(1)}K XP` : ''}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
