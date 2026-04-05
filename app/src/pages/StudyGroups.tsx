import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Trophy,
  Target,
  ArrowLeft,
  Zap,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GroupCard from '../components/GroupCard';
import Leaderboard from '../components/Leaderboard';
import type { StudyGroup, GroupMember, ActivityItem } from '../types';

const mockGroups: StudyGroup[] = [
  {
    id: '1',
    name: 'Physics Masters',
    description: 'Advanced physics problem solving and discussions',
    memberCount: 24,
    maxMembers: 30,
    rank: 3,
    weeklyGoal: 100,
    weeklyProgress: 78,
    isPrivate: false,
    avatar: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Organic Chemistry Wizards',
    description: 'Mastering organic chemistry reactions and mechanisms',
    memberCount: 18,
    maxMembers: 25,
    rank: 1,
    weeklyGoal: 80,
    weeklyProgress: 65,
    isPrivate: false,
    avatar: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Math Olympiad Prep',
    description: 'Competitive mathematics and problem solving',
    memberCount: 15,
    maxMembers: 20,
    rank: 5,
    weeklyGoal: 120,
    weeklyProgress: 95,
    isPrivate: true,
    avatar: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'JEE Advanced 2025',
    description: 'Comprehensive preparation for JEE Advanced',
    memberCount: 45,
    maxMembers: 50,
    rank: 2,
    weeklyGoal: 150,
    weeklyProgress: 112,
    isPrivate: false,
    avatar: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    name: 'Biology NEET Group',
    description: 'NEET biology focused study group',
    memberCount: 32,
    maxMembers: 40,
    rank: 7,
    weeklyGoal: 90,
    weeklyProgress: 45,
    isPrivate: false,
    avatar: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=100&h=100&fit=crop',
  },
  {
    id: '6',
    name: 'Elite Problem Solvers',
    description: 'Invitation-only group for top performers',
    memberCount: 12,
    maxMembers: 15,
    rank: 1,
    weeklyGoal: 200,
    weeklyProgress: 180,
    isPrivate: true,
    avatar: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=100&h=100&fit=crop',
  },
];

const mockMembers: GroupMember[] = [
  { id: '1', name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&face', rank: 1, accuracy: 94, xp: 15200, isOnline: true },
  { id: '2', name: 'Rahul Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&face', rank: 2, accuracy: 91, xp: 14800, isOnline: true },
  { id: '3', name: 'Ananya Singh', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&face', rank: 3, accuracy: 89, xp: 14200, isOnline: false },
  { id: '4', name: 'Vikram Rao', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&face', rank: 4, accuracy: 87, xp: 13800, isOnline: true },
  { id: '5', name: 'Neha Gupta', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&face', rank: 5, accuracy: 85, xp: 13200, isOnline: false },
  { id: '6', name: 'Arjun Sharma', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&face', rank: 6, accuracy: 84, xp: 12900, isOnline: true },
  { id: '7', name: 'Divya Menon', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&face', rank: 7, accuracy: 82, xp: 12500, isOnline: false },
  { id: '8', name: 'Karthik Iyer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&face', rank: 8, accuracy: 80, xp: 12100, isOnline: true },
];

const mockActivities: ActivityItem[] = [
  { id: '1', user: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&face', action: 'completed', target: 'Physics Mock Test', timestamp: new Date(Date.now() - 1000 * 60 * 5), type: 'complete' },
  { id: '2', user: 'Rahul Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&face', action: 'achieved', target: '7-day streak', timestamp: new Date(Date.now() - 1000 * 60 * 15), type: 'achievement' },
  { id: '3', user: 'Ananya Singh', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&face', action: 'joined', target: 'the group', timestamp: new Date(Date.now() - 1000 * 60 * 30), type: 'join' },
  { id: '4', user: 'Vikram Rao', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&face', action: 'won a battle against', target: 'Neha Gupta', timestamp: new Date(Date.now() - 1000 * 60 * 45), type: 'battle' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function StudyGroups() {
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' ? true :
                      activeTab === 'public' ? !group.isPrivate :
                      activeTab === 'private' ? group.isPrivate : true;
    return matchesSearch && matchesTab;
  });

  const formatTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  if (selectedGroup) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Back button & Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedGroup(null)}
            className="hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-4">
            <img
              src={selectedGroup.avatar}
              alt={selectedGroup.name}
              className="w-14 h-14 rounded-xl object-cover border border-white/10"
            />
            <div>
              <h1 className="text-2xl font-bold">{selectedGroup.name}</h1>
              <p className="text-gray-400">{selectedGroup.description}</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button className="bg-indigo-500 hover:bg-indigo-600">
              <Target className="w-4 h-4 mr-2" />
              Start Session
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Members', value: `${selectedGroup.memberCount}/${selectedGroup.maxMembers}`, icon: Users },
            { label: 'Group Rank', value: `#${selectedGroup.rank}`, icon: Trophy },
            { label: 'Weekly Goal', value: `${selectedGroup.weeklyProgress}/${selectedGroup.weeklyGoal}`, icon: Target },
            { label: 'Active Now', value: '12', icon: Zap },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5 text-indigo-400" />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <Leaderboard members={mockMembers} currentUserId="6" />
          </div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl glass-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-indigo-400">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {mockActivities.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium text-white">{activity.user}</span>
                      {' '}<span className="text-gray-400">{activity.action}</span>{' '}
                      <span className="text-indigo-400">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{formatTime(activity.timestamp)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Study Groups</h1>
          <p className="text-gray-400">Join groups to collaborate and compete with peers</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-glow hover:shadow-glow-lg transition-shadow"
        >
          <Plus className="w-5 h-5" />
          Create Group
        </motion.button>
      </motion.div>

      {/* Search & Filter */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-indigo-500">All</TabsTrigger>
            <TabsTrigger value="public" className="data-[state=active]:bg-indigo-500">Public</TabsTrigger>
            <TabsTrigger value="private" className="data-[state=active]:bg-indigo-500">Private</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Groups Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {filteredGroups.map((group, index) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() => setSelectedGroup(group)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredGroups.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No groups found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </motion.div>
  );
}
