import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Settings,
  Menu,
  Flame,
  Trophy,
  X,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '../lib/supabaseClient';

interface TopbarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

interface Profile {
  full_name?: string;
  rank?: number;
  streak?: number;
  avatar_url?: string;
  subscription?: string;
}

export default function Topbar({ onMenuToggle, isSidebarOpen }: TopbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name, rank, streak, avatar_url, subscription')
        .eq('id', user.id)
        .single();
      if (data) {
        setProfile(data);
        const sub = data.subscription?.toUpperCase();
        if (sub === 'PRO' || sub === 'PREMIUM') {
          setIsPro(true);
          localStorage.setItem('IAT_PLAN', 'PRO');
        }
      }
    }
    loadProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-white/5 bg-[#0B0F14]/80 backdrop-blur-xl">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {!isSidebarOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </motion.button>
        )}

        {/* Search */}
        <AnimatePresence>
          {isSearchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                autoFocus
                placeholder="Search tests, topics..."
                className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
              </button>
            </motion.div>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-white/10 rounded">
                ⌘K
              </kbd>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Real stats pills from profile */}
        <div className="hidden md:flex items-center gap-2">
          {(profile?.streak ?? 0) > 0 && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20"
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">{profile?.streak} Days</span>
            </motion.div>
          )}

          {profile?.rank && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20"
            >
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">#{profile.rank}</span>
            </motion.div>
          )}
        </div>

        {/* Notifications (empty until real DB integration) */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-white/5"
          onClick={() => setUnreadCount(0)}
        >
          <Bell className="w-5 h-5 text-gray-400" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-indigo-500 rounded-full text-xs flex items-center justify-center font-medium"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/5"
        >
          <Settings className="w-5 h-5 text-gray-400" />
        </Button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-3 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{profile?.full_name ?? '—'}</p>
                <p className="text-xs font-medium">
                  {isPro ? (
                    <span className="text-indigo-400 font-bold">PRO Member</span>
                  ) : (
                    <span className="text-gray-400 capitalize">{profile?.subscription ?? 'Free'}</span>
                  )}
                </p>
              </div>
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/30"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-500/40 border-2 border-indigo-500/30 flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-300" />
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-[#111827] border-white/10"
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:bg-white/5"
              onClick={handleSignOut}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
