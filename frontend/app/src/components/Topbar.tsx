import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Settings,
  Menu,
  Flame,
  Trophy,
  X,
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

interface TopbarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

const notifications = [
  {
    id: 1,
    title: 'New Battle Challenge',
    message: 'Rahul challenged you to a Quick Battle!',
    time: '2 min ago',
    type: 'battle',
    unread: true,
  },
  {
    id: 2,
    title: 'Streak Milestone',
    message: 'Congratulations! 7-day streak achieved!',
    time: '1 hour ago',
    type: 'achievement',
    unread: true,
  },
  {
    id: 3,
    title: 'Group Activity',
    message: 'Physics Masters completed weekly goal',
    time: '3 hours ago',
    type: 'group',
    unread: false,
  },
];

export default function Topbar({ onMenuToggle, isSidebarOpen }: TopbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleNotificationClick = () => {
    setUnreadCount(0);
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
                placeholder="Search tests, groups, topics..."
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
        {/* Stats pills */}
        <div className="hidden md:flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">7 Days</span>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20"
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">#42</span>
          </motion.div>
        </div>

        {/* Notifications */}
        <DropdownMenu onOpenChange={handleNotificationClick}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-white/5"
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
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-80 bg-[#111827] border-white/10"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
              <span className="font-medium">Notifications</span>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">
                Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-white/5"
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className={`w-2 h-2 rounded-full ${notif.unread ? 'bg-indigo-500' : 'bg-transparent'}`} />
                    <span className="font-medium text-sm flex-1">{notif.title}</span>
                    <span className="text-xs text-gray-500">{notif.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 pl-4">{notif.message}</p>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

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
                <p className="text-sm font-medium">Arjun Sharma</p>
                <p className="text-xs text-gray-400">Premium</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/30"
              />
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
            <DropdownMenuItem className="cursor-pointer hover:bg-white/5">
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="cursor-pointer text-red-400 hover:bg-white/5">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
