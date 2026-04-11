import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileQuestion,
  Bot,
  BookOpen,
  ChevronLeft,
  Sparkles,
  User,
  ExternalLink,
  Scroll,
} from 'lucide-react';
import type { Page } from '../types';
import { supabase } from '../lib/supabaseClient';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface Profile {
  full_name?: string;
  rank?: number;
  xp?: number;
  avatar_url?: string;
}

type NavItem =
  | { id: Page; label: string; icon: React.ElementType; external?: never }
  | { external: string; label: string; icon: React.ElementType; id?: never };

const menuItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'mock-tests', label: 'Mock Tests', icon: FileQuestion },
  { external: '/news/iiser-iat-formula-sheet.html', label: 'Master Formula', icon: Scroll },
  { external: '/ai_tutor.html', label: 'AI Doubts', icon: Bot },
  { external: '/smart_notes_homepage.html', label: 'Smart Notes', icon: BookOpen },
];

export default function Sidebar({ currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('profiles')
          .select('full_name, rank, xp, avatar_url')
          .eq('id', user.id)
          .single();
        if (data) setProfile(data);
      } catch (error) {
        console.error('Error loading profile in sidebar:', error);
      }
    }
    loadProfile();
  }, []);

  const handleItemClick = (item: NavItem) => {
    if (item.external) {
      window.location.href = item.external;
    } else if (item.id) {
      onPageChange(item.id);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: window.innerWidth >= 1024 ? (isOpen ? 240 : 72) : (isOpen ? 240 : 0),
          x: window.innerWidth < 1024 && !isOpen ? -240 : 0
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed lg:relative z-[70] h-screen bg-[#0B0F14]/95 backdrop-blur-xl border-r border-white/5 flex flex-col flex-shrink-0 overflow-hidden
          ${window.innerWidth < 1024 && !isOpen ? 'pointer-events-none' : 'pointer-events-auto'}
        `}
      >
        {/* Logo */}
        <div className="p-5 flex items-center justify-between min-h-[72px]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0B0F14]" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="overflow-hidden"
              >
                <p className="font-bold text-base whitespace-nowrap leading-tight">IISER</p>
                <p className="text-xs text-gray-400 whitespace-nowrap">Smart Prep</p>
              </motion.div>
            )}
          </div>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors flex-shrink-0"
          >
            <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </motion.div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = item.id ? currentPage === item.id : false;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.1 }}
                onClick={() => handleItemClick(item)}
                className={`
                  relative w-full flex items-center gap-3 px-3 py-3 rounded-xl
                  transition-all duration-200 group text-left
                  ${isActive
                    ? 'bg-indigo-500/15 text-indigo-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-r-full"
                  />
                )}

                <div className={`
                  p-2 rounded-lg flex-shrink-0 transition-all duration-200
                  ${isActive ? 'bg-indigo-500/20' : 'group-hover:bg-white/5'}
                `}>
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-indigo-400' : ''}`} style={{ width: 18, height: 18 }} />
                </div>

                {isOpen && (
                  <span className="font-medium text-sm whitespace-nowrap flex-1">{item.label}</span>
                )}

                {/* External link indicator */}
                {isOpen && item.external && (
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 flex-shrink-0" />
                )}

                {/* Tooltip when collapsed */}
                {!isOpen && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-[#111827] rounded-lg text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-white/10 shadow-xl pointer-events-none">
                    {item.label}
                    {item.external && <ExternalLink className="w-3 h-3 inline ml-1 text-gray-500" />}
                  </div>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-white/5">
          <div className={`flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 ${!isOpen ? 'justify-center' : ''}`}>
            <div className="relative flex-shrink-0">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/30"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border-2 border-indigo-500/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-300" />
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0B0F14]" />
            </div>

            {isOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden min-w-0">
                <p className="font-medium text-sm truncate">
                  {profile?.full_name ?? 'Loading...'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {profile?.rank ? `Rank #${profile.rank}` : 'Start studying'}
                  {profile?.xp ? ` · ${(profile.xp / 1000).toFixed(1)}K XP` : ''}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}
