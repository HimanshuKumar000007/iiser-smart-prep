import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageSquare,
  Search,
  Plus,
  ChevronUp,
  Bookmark,
  Share2,
  Send,
  X,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  Check,
  AlertCircle,
  Bell,
  Flag,
  ChevronDown,
  TrendingUp,
  Brain,
  Target,
  ShieldAlert,
  ExternalLink,
  Eye,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Flame,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { currentUser } from '../../data/mockData';

// ── TYPES & INTERFACES ──────────────────────────────────────────────────────

export interface Comment {
  id: string;
  author: string;
  authorInitial: string;
  authorRole: 'Official Mentor' | 'Aspirant' | 'Study Partner' | 'Alumni' | string;
  authorLevel?: number;
  timeAgo: string;
  content: string;
  upvotes: number;
  isAccepted?: boolean;
}

export interface AIExplanation {
  summary: string;
  keyConcepts: string[];
  instantFormula?: string;
  promptTopic: string;
}

export interface Discussion {
  id: string;
  slug?: string;
  category: 'discussions' | 'success_stories' | 'updates' | 'help';
  author: string;
  authorInitial: string;
  authorRole: 'Official Mentor' | 'Aspirant' | string;
  userLevel?: number;
  timeAgo: string;
  createdAtTimestamp: number;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  views?: string;
  comments: Comment[];
  isPinned?: boolean;
  isReported?: boolean;
  aiExplanation?: AIExplanation;
}

export interface TopContributor {
  id: string;
  name: string;
  initials: string;
  role: string;
  points: number;
  rank: number;
  level: string;
  avatarColor: string;
  acceptedCount: number;
}

export interface NotificationItem {
  id: string;
  type: 'reply' | 'accepted' | 'upvote' | 'mention';
  title: string;
  description: string;
  timeAgo: string;
  isRead: boolean;
  targetDiscussionId?: string;
}

// ── DEFAULT MOCK DATA ───────────────────────────────────────────────────────

const DEFAULT_DISCUSSIONS: Discussion[] = [
  {
    id: 'disc-1',
    slug: 'rotational-dynamics-shortcuts',
    category: 'discussions',
    author: 'Lena W.',
    authorInitial: 'LW',
    authorRole: 'Aspirant',
    userLevel: 3,
    timeAgo: '2 hours ago',
    createdAtTimestamp: Date.now() - 2 * 3600 * 1000,
    title: 'How to solve Rotational Dynamics & Moment of Inertia questions fastest?',
    content: 'I find myself taking over 12-15 minutes on complex rotational questions in mock tests. This leaves very little buffer for Optics and Thermodynamics. Does anyone have a proven shortcut strategy or dimensional analysis trick that genuinely saves time during IAT?',
    tags: ['Physics', 'RotationalDynamics', 'Time Pressure'],
    upvotes: 28,
    views: '1.4k views',
    aiExplanation: {
      summary: 'For IAT rotational problems with rolling without slipping on an inclined plane, avoid full torque integrals. Use the acceleration conservation equation.',
      keyConcepts: [
        'Acceleration formula: a = (g sin θ) / (1 + I_cm / (m R²))',
        'Kinetic energy ratio: K_rot / K_trans = k² / R² (radius of gyration ratio)',
        'Check extreme cases: set mass distribution to point mass to eliminate incorrect options in 30 seconds.'
      ],
      instantFormula: 'a = (g·sinθ) / (1 + β), where β = 2/5 (sphere), 1/2 (cylinder), 1 (ring)',
      promptTopic: 'Rotational dynamics rolling without slipping shortcut formulas'
    },
    comments: [
      {
        id: 'c-101',
        author: 'Arjun N.',
        authorInitial: 'AN',
        authorRole: 'Official Mentor',
        authorLevel: 5,
        timeAgo: '1 hour ago',
        content: 'For IAT, always check limiting cases (e.g., set radius or angle to 0 or 90 degrees) first! More than 40% of rotational multiple-choice questions can be eliminated in under 45 seconds without solving the differential equation.',
        upvotes: 14,
        isAccepted: true
      },
      {
        id: 'c-102',
        author: 'Priya K.',
        authorInitial: 'PK',
        authorRole: 'Aspirant',
        authorLevel: 2,
        timeAgo: '45 mins ago',
        content: 'Also practice the perpendicular axis theorem vs parallel axis theorem quickly with the standard table memorized. I cut my time by half after creating a 1-page formula sheet.',
        upvotes: 6
      }
    ]
  },
  {
    id: 'disc-2',
    slug: 'organic-chemistry-reaction-mechanisms',
    category: 'help',
    author: 'Tobias R.',
    authorInitial: 'TR',
    authorRole: 'Aspirant',
    userLevel: 2,
    timeAgo: '5 hours ago',
    createdAtTimestamp: Date.now() - 5 * 3600 * 1000,
    title: 'Organic Chemistry Reactions & Mechanisms: What must truly be memorized?',
    content: 'The NCERT organic chemistry syllabus is enormous, especially when diving into multi-step conversions and named reactions. For those who analyzed 2019-2024 PYQs, which reaction mechanisms come up in almost every exam cycle? I have Aldol, Cannizzaro, and Diazotization down—what else should I prioritize?',
    tags: ['Chemistry', 'ReactionMechanisms', 'PYQs'],
    upvotes: 21,
    views: '980 views',
    aiExplanation: {
      summary: 'IAT tests electronic displacements and intermediate stability rather than rote synthesis paths.',
      keyConcepts: [
        'Electrophilic aromatic substitution: Ortho/para directing resonance vs meta inductive deactivation.',
        'Carbocation rearrangements: 1,2-hydride and 1,2-methyl shifts in Pinacol-Pinacolone & dehydration.',
        'Hoffmann Bromamide Degradation intermediate: isocyanate (R-N=C=O).'
      ],
      instantFormula: 'Relative nucleophilicity in polar protic solvents: I⁻ > Br⁻ > Cl⁻ > F⁻',
      promptTopic: 'High yield organic chemistry reaction mechanisms for IISER IAT'
    },
    comments: [
      {
        id: 'c-201',
        author: 'Shreya M.',
        authorInitial: 'SM',
        authorRole: 'Official Mentor',
        authorLevel: 4,
        timeAgo: '4 hours ago',
        content: 'Definitely master Hoffmann Bromamide, Reimer-Tiemann, and Electrophilic Aromatic Substitutions (activating vs deactivating groups directing power). IAT loves conceptual questions on stability of carbocations and carbene intermediates!',
        upvotes: 11,
        isAccepted: true
      }
    ]
  },
  {
    id: 'disc-3',
    slug: 'air-142-roadmap-for-non-bio',
    category: 'success_stories',
    author: 'Aarav Sharma',
    authorInitial: 'AS',
    authorRole: 'Official Mentor',
    userLevel: 5,
    timeAgo: '1 day ago',
    createdAtTimestamp: Date.now() - 24 * 3600 * 1000,
    title: 'From 85 marks in Mock 1 to AIR 142 in IAT: My 6-Month Roadmap',
    content: 'When I started preparing, Biology felt completely alien to me because I was a pure PCM student. But I realized that leaving Biology completely means throwing away 60 easy marks. By focusing on Genetics, Ecology, and Cell Biology for just 1 hour every evening, I scored 44/60 in Bio on exam day! Don\'t abandon any of the 4 PCMB subjects—balanced scoring is the secret.',
    tags: ['IAT Strategy', 'Motivation', 'MockTestStrategy'],
    upvotes: 52,
    views: '3.1k views',
    comments: [
      {
        id: 'c-301',
        author: 'Kavita D.',
        authorInitial: 'KD',
        authorRole: 'Aspirant',
        authorLevel: 2,
        timeAgo: '18 hours ago',
        content: 'This is super inspiring! Did you read NCERT line by line for biology or stick to question practice and Smart Lessons?',
        upvotes: 8
      },
      {
        id: 'c-302',
        author: 'Aarav Sharma',
        authorInitial: 'AS',
        authorRole: 'Official Mentor',
        authorLevel: 5,
        timeAgo: '16 hours ago',
        content: 'I did NCERT summaries + high-yield diagrams + IISER PYQs. Doing PYQs helped identify which specific concepts IAT repeats year after year.',
        upvotes: 15,
        isAccepted: true
      }
    ]
  },
  {
    id: 'disc-4',
    slug: 'iiser-cutoffs-seat-matrix',
    category: 'updates',
    author: 'IISER Prep Desk',
    authorInitial: 'IP',
    authorRole: 'Official Mentor',
    userLevel: 6,
    timeAgo: '1 day ago',
    createdAtTimestamp: Date.now() - 26 * 3600 * 1000,
    title: 'IISER 2026/2027 Projected Cutoffs & Seat Matrix Across All 7 Campuses',
    content: 'Detailed breakdown of past trends: IISER Pune and Kolkata consistently require safe target scores of 135+ marks. IISER Mohali, Bhopal, and Thiruvananthapuram generally settle in the 115-125 bracket, while Tirupati and Berhampur offer great research infrastructure for candidates scoring 98-112. Total seats across all campuses are ~1,930.',
    tags: ['Official Updates', 'IISER Pune', 'IISER Kolkata'],
    upvotes: 42,
    views: '4.8k views',
    isPinned: true,
    comments: [
      {
        id: 'c-401',
        author: 'Mehul T.',
        authorInitial: 'MT',
        authorRole: 'Aspirant',
        authorLevel: 1,
        timeAgo: '1 day ago',
        content: 'Thanks for this! Does the BS Economic Sciences program at IISER Bhopal have the exact same cutoff as BS-MS Natural Sciences?',
        upvotes: 6
      }
    ]
  },
  {
    id: 'disc-5',
    slug: 'definite-integrals-kings-property',
    category: 'help',
    author: 'Neha Patel',
    authorInitial: 'NP',
    authorRole: 'Aspirant',
    userLevel: 2,
    timeAgo: '2 days ago',
    createdAtTimestamp: Date.now() - 48 * 3600 * 1000,
    title: 'Maths Calculus: Definite Integrals with periodicity and King’s property [Unanswered Doubt]',
    content: 'Can someone explain how to quickly recognize when to apply King’s rule ∫[a,b] f(x)dx = ∫[a,b] f(a+b-x)dx versus standard substitution? Specifically on problems with limits [0, π/2] having sin^n(x)/(sin^n(x) + cos^n(x)). Also, what if there is an x in the numerator?',
    tags: ['Mathematics', 'KingsProperty', 'Formulas'],
    upvotes: 19,
    views: '840 views',
    aiExplanation: {
      summary: 'King’s Property is most effective when f(x) + f(a+b-x) simplifies into a constant or cancels the troublesome numerator.',
      keyConcepts: [
        'Numerator elimination: When integrating x·f(sin x) from 0 to π, King’s rule transforms it to (π/2) ∫[0,π] f(sin x)dx, removing x immediately.',
        'Symmetric sum: For ∫[a,b] (f(x) / (f(x) + f(a+b-x))) dx, the result is ALWAYS (b - a) / 2 regardless of f(x).',
        'For limits [0, π/2], sin(π/2 - x) = cos x, immediately giving I + I = ∫ 1 dx = π/2 → I = π/4.'
      ],
      instantFormula: '∫[a,b] f(x)/(f(x)+f(a+b-x)) dx = (b - a) / 2',
      promptTopic: 'Definite integrals Kings rule step by step evaluation'
    },
    comments: []
  },
  {
    id: 'disc-6',
    slug: 'genetics-pedigree-analysis-elimination',
    category: 'help',
    author: 'Tanmay Das',
    authorInitial: 'TD',
    authorRole: 'Aspirant',
    userLevel: 2,
    timeAgo: '3 days ago',
    createdAtTimestamp: Date.now() - 72 * 3600 * 1000,
    title: 'Genetics & Pedigree Analysis: Quick technique to eliminate autosomal vs X-linked?',
    content: 'I frequently get confused on autosomal dominant vs X-linked dominant pedigrees when affected father has affected daughters. Is there a simple checklist to eliminate options within 30 seconds for IAT?',
    tags: ['Biology', 'PedigreeAnalysis', 'PYQs'],
    upvotes: 16,
    views: '620 views',
    comments: []
  },
  {
    id: 'disc-8',
    slug: 'optics-tir-composite-prisms',
    category: 'help',
    author: 'Ananya Verma',
    authorInitial: 'AV',
    authorRole: 'Aspirant',
    userLevel: 1,
    timeAgo: '4 days ago',
    createdAtTimestamp: Date.now() - 96 * 3600 * 1000,
    title: 'Optics: Condition for Total Internal Reflection in composite prisms [Unanswered]',
    content: 'When light passes through a composite right-angled prism made of two materials with refractive indices n1 and n2, how do we systematically check the critical angle boundary condition without drawing messy ray diagrams?',
    tags: ['Physics', 'Formulas', 'MockTestStrategy'],
    upvotes: 14,
    views: '450 views',
    comments: []
  }
];

const TOP_CONTRIBUTORS: TopContributor[] = [
  {
    id: 'top-1',
    name: 'Arjun N.',
    initials: 'AN',
    role: 'Official Mentor • IISER Pune',
    points: 520,
    rank: 1,
    level: 'Lvl 5 Master',
    avatarColor: 'from-amber-400 to-amber-600',
    acceptedCount: 18
  },
  {
    id: 'top-2',
    name: 'Aarav Sharma',
    initials: 'AS',
    role: 'AIR 142 • IISER Pune',
    points: 445,
    rank: 2,
    level: 'Lvl 4 Scholar',
    avatarColor: 'from-purple-400 to-indigo-600',
    acceptedCount: 14
  },
  {
    id: 'top-3',
    name: 'Shreya M.',
    initials: 'SM',
    role: 'IISER Kolkata Qualifier',
    points: 380,
    rank: 3,
    level: 'Lvl 4 Scholar',
    avatarColor: 'from-rose-400 to-pink-600',
    acceptedCount: 11
  },
  {
    id: 'top-4',
    name: 'Lena W.',
    initials: 'LW',
    role: 'PCMB Aspirant (Top Solver)',
    points: 310,
    rank: 4,
    level: 'Lvl 3 Aspirant',
    avatarColor: 'from-teal-400 to-emerald-600',
    acceptedCount: 8
  }
];

const TRENDING_TOPICS = [
  { tag: 'RotationalDynamics', count: 14, icon: '🔥' },
  { tag: 'KingsProperty', count: 11, icon: '📐' },
  { tag: 'ReactionMechanisms', count: 9, icon: '⚗️' },
  { tag: 'PedigreeAnalysis', count: 7, icon: '🧬' },
  { tag: 'MockTestStrategy', count: 6, icon: '⏱️' }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'accepted',
    title: 'Answer Marked as Best Answer! (+25 pts)',
    description: 'Arjun N. marked your Rotational Dynamics shortcut as the verified solution.',
    timeAgo: '30m ago',
    isRead: false,
    targetDiscussionId: 'disc-1'
  },
  {
    id: 'notif-2',
    type: 'reply',
    title: 'New reply on your question',
    description: 'Shreya M. commented on Organic Chemistry Reactions & Mechanisms.',
    timeAgo: '2h ago',
    isRead: false,
    targetDiscussionId: 'disc-2'
  },
  {
    id: 'notif-3',
    type: 'upvote',
    title: 'Your Solution Upvoted',
    description: 'Siddharth M. and 4 others upvoted your physics solution (+10 XP).',
    timeAgo: '4h ago',
    isRead: false,
    targetDiscussionId: 'disc-1'
  },
  {
    id: 'notif-4',
    type: 'mention',
    title: 'Mentioned by Mentor',
    description: 'Dr. Ananya referenced your post in Genetics & Pedigree Analysis.',
    timeAgo: '1d ago',
    isRead: true,
    targetDiscussionId: 'disc-6'
  }
];

const MAIN_TABS = [
  { id: 'all', label: 'All Discussions' },
  { id: 'unanswered', label: 'Unanswered' },
  { id: 'help', label: 'Help & Doubts' },
  { id: 'updates', label: 'Exam Updates' },
  { id: 'success_stories', label: 'Success Stories' },
] as const;

type TabId = typeof MAIN_TABS[number]['id'];

const TAG_FILTERS = [
  'All',
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
  'IAT Strategy',
  'PYQs',
  'Mock Tests',
  'Formulas',
  'Time Pressure',
  'Motivation',
  'Official Updates'
];

interface CommunityProps {
  onNavigate?: (view: string) => void;
}

export function Community({ onNavigate }: CommunityProps) {
  const { theme } = useTheme();

  // Storage keys
  const STORAGE_DISCUSSIONS = 'iiser_community_discussions_v4';
  const STORAGE_UPVOTES = 'iiser_community_upvotes_v4';
  const STORAGE_BOOKMARKS = 'iiser_community_bookmarks_v4';
  const STORAGE_USER_XP = 'iiser_community_user_xp_v4';

  // Navigation & filter state
  const [activeTab, setActiveTab] = useState<TabId>('all');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'upvotes' | 'replies' | 'unanswered'>('newest');

  // Gamification state for current user
  const [userXP, setUserXP] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER_XP);
      if (saved) return parseInt(saved, 10);
    } catch (e) {}
    return 245;
  });

  // Discussions state
  const [discussions, setDiscussions] = useState<Discussion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DISCUSSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((d: any) => d.category !== 'study_groups');
          const existingIds = new Set(filtered.map((d: any) => d.id));
          const missing = DEFAULT_DISCUSSIONS.filter(d => !existingIds.has(d.id));
          return filtered.concat(missing);
        }
      }
    } catch (e) {
      console.error('Failed to load community discussions', e);
    }
    return DEFAULT_DISCUSSIONS;
  });

  // Interaction sets
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_UPVOTES);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {}
    return new Set(['disc-1']);
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {}
    return new Set(['disc-4']);
  });

  // AI accordion expansion set
  const [expandedAiIds, setExpandedAiIds] = useState<Set<string>>(new Set(['disc-1']));

  // Modals & Panels
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [activeThread, setActiveThread] = useState<Discussion | null>(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [reportModalDisc, setReportModalDisc] = useState<Discussion | null>(null);
  const [reportReason, setReportReason] = useState('Irrelevant / off-topic content');

  // Weekly challenge banner dismiss state
  const [showChallenge, setShowChallenge] = useState(true);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal replies sort order
  const [repliesSort, setRepliesSort] = useState<'top' | 'newest' | 'oldest'>('top');

  // New discussion composer state
  const [composerTemplate, setComposerTemplate] = useState<
    'question' | 'concept' | 'pyq' | 'strategy' | 'story'
  >('question');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Discussion['category']>('help');
  const [newTags, setNewTags] = useState<string[]>(['Physics']);
  const [newContent, setNewContent] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Reply text in thread view
  const [replyText, setReplyText] = useState('');

  // ── FOCUS MODE STATE ────────────────────────────────────────────────────────
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [focusDurationMinutes, setFocusDurationMinutes] = useState<number>(25);
  const [focusSecondsLeft, setFocusSecondsLeft] = useState<number>(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState<boolean>(false);
  const [focusSubject, setFocusSubject] = useState<string>('Physics');
  const [focusGoal, setFocusGoal] = useState<string>('Deep problem-solving session');
  const [focusAmbientSound, setFocusAmbientSound] = useState<'none' | 'alpha' | 'rain'>('none');
  const [isFocusFullscreen, setIsFocusFullscreen] = useState<boolean>(false);
  const [focusSessionsCompleted, setFocusSessionsCompleted] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('iiser_focus_sessions_completed');
      if (saved) return parseInt(saved, 10);
    } catch (e) {}
    return 3;
  });

  // Web Audio refs for ambient audio & chime
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);
  const rainNoiseSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const stopAmbientAudio = () => {
    try {
      if (ambientOscillatorRef.current) {
        ambientOscillatorRef.current.stop();
        ambientOscillatorRef.current.disconnect();
        ambientOscillatorRef.current = null;
      }
      if (rainNoiseSourceRef.current) {
        rainNoiseSourceRef.current.stop();
        rainNoiseSourceRef.current.disconnect();
        rainNoiseSourceRef.current = null;
      }
    } catch (e) {}
  };

  const playAmbientAudio = (type: 'none' | 'alpha' | 'rain') => {
    stopAmbientAudio();
    if (type === 'none') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'alpha') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        ambientOscillatorRef.current = osc;
        ambientGainRef.current = gain;
      } else if (type === 'rain') {
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        whiteNoise.connect(gain);
        gain.connect(ctx.destination);
        whiteNoise.start();
        rainNoiseSourceRef.current = whiteNoise;
      }
    } catch (e) {}
  };

  const playCompletionChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioCtx();
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
        gain.gain.setValueAtTime(0.16, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.7);
      });
    } catch (e) {}
  };

  const handleToggleAmbient = (type: 'none' | 'alpha' | 'rain') => {
    const nextType = focusAmbientSound === type ? 'none' : type;
    setFocusAmbientSound(nextType);
    playAmbientAudio(nextType);
  };

  const handleSelectFocusDuration = (minutes: number) => {
    setFocusDurationMinutes(minutes);
    setFocusSecondsLeft(minutes * 60);
    if (isFocusRunning) {
      setIsFocusRunning(false);
      stopAmbientAudio();
      setFocusAmbientSound('none');
    }
  };

  const handleToggleFocusRunning = () => {
    if (!isFocusRunning) {
      setIsFocusRunning(true);
      if (focusAmbientSound !== 'none') {
        playAmbientAudio(focusAmbientSound);
      }
    } else {
      setIsFocusRunning(false);
      stopAmbientAudio();
    }
  };

  const handleResetFocusTimer = () => {
    setIsFocusRunning(false);
    stopAmbientAudio();
    setFocusSecondsLeft(focusDurationMinutes * 60);
    showToast('Focus timer reset.');
  };

  const handleAddFiveMinutes = () => {
    setFocusSecondsLeft(prev => prev + 5 * 60);
    showToast('+5 Minutes added to your focus session.');
  };

  const formatFocusTime = (totalSec: number): string => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Focus Countdown Effect
  useEffect(() => {
    let interval: any = null;
    if (isFocusRunning) {
      interval = setInterval(() => {
        setFocusSecondsLeft(prev => {
          if (prev <= 1) {
            setIsFocusRunning(false);
            stopAmbientAudio();
            playCompletionChime();
            awardXP(25, `${focusDurationMinutes}-min deep focus session`);
            setFocusSessionsCompleted(c => {
              const next = c + 1;
              try { localStorage.setItem('iiser_focus_sessions_completed', next.toString()); } catch (e) {}
              return next;
            });
            showToast(`🎉 Focus goal achieved! +25 XP earned.`);
            return focusDurationMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusRunning, focusDurationMinutes]);

  useEffect(() => {
    return () => {
      stopAmbientAudio();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  // Refs for accessibility & scroll lock
  const notifRef = useRef<HTMLDivElement>(null);
  const lastTriggerCardRef = useRef<HTMLElement | null>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  // ── REDDIT-STYLE SHALLOW ROUTING & POPUP MANAGEMENT ─────────────────────────

  // Open discussion: Updates URL shallowly without page reload and preserves scroll
  const openDiscussion = (disc: Discussion, triggerElement?: HTMLElement) => {
    if (triggerElement) {
      lastTriggerCardRef.current = triggerElement;
    }
    setActiveThread(disc);
    setReplyText('');

    const isMobile = window.innerWidth < 768;
    const url = new URL(window.location.href);
    url.searchParams.set('discussion', disc.slug || disc.id);
    if (!isMobile) {
      url.searchParams.set('modal', 'true');
    } else {
      url.searchParams.delete('modal'); // full page on mobile
    }
    window.history.pushState({ discussionId: disc.id }, '', url.toString());
  };

  // Close discussion: Reverts URL shallowly and restores focus
  const closeDiscussion = () => {
    setActiveThread(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has('discussion')) {
      url.searchParams.delete('discussion');
      url.searchParams.delete('modal');
      window.history.pushState({}, '', url.toString());
    }
    if (lastTriggerCardRef.current) {
      lastTriggerCardRef.current.focus();
    }
  };

  // Sync with browser back/forward buttons (popstate) & direct link on mount
  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      const discParam = params.get('discussion');
      if (discParam) {
        const found = discussions.find(
          d => d.slug === discParam || d.id === discParam
        );
        if (found) {
          setActiveThread(found);
        }
      } else {
        setActiveThread(null);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, [discussions]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeThread) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeThread]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeThread) {
        closeDiscussion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeThread]);

  // Focus reply input when modal opens on desktop
  useEffect(() => {
    if (activeThread && window.innerWidth >= 768) {
      setTimeout(() => {
        replyInputRef.current?.focus();
      }, 150);
    }
  }, [activeThread]);

  // Sync persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DISCUSSIONS, JSON.stringify(discussions));
    } catch (e) {}
  }, [discussions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_UPVOTES, JSON.stringify(Array.from(upvotedIds)));
    } catch (e) {}
  }, [upvotedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(Array.from(bookmarkedIds)));
    } catch (e) {}
  }, [bookmarkedIds]);


  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USER_XP, userXP.toString());
    } catch (e) {}
  }, [userXP]);

  // Click outside notification panel to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNotifOpen]);

  // Toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3000);
  };

  // Add XP helper with gamification feedback
  const awardXP = (amount: number, reason: string) => {
    setUserXP(prev => {
      const next = prev + amount;
      showToast(`+${amount} XP earned for ${reason}! Total: ${next} XP`);
      return next;
    });
  };

  // User gamification details
  const userLevel = useMemo(() => {
    if (userXP >= 500) return { title: 'Lvl 5 Master', badge: 'Master', next: 600 };
    if (userXP >= 350) return { title: 'Lvl 4 Scholar', badge: 'Scholar', next: 500 };
    if (userXP >= 200) return { title: 'Lvl 3 Aspirant', badge: 'Aspirant', next: 350 };
    return { title: 'Lvl 2 Novice', badge: 'Novice', next: 200 };
  }, [userXP]);



  // Unanswered questions list for the Right Sidebar card
  const oldestUnanswered = useMemo(() => {
    return discussions
      .filter(d => d.comments.length === 0)
      .sort((a, b) => a.createdAtTimestamp - b.createdAtTimestamp)
      .slice(0, 3);
  }, [discussions]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: discussions.length,
      unanswered: discussions.filter(d => d.comments.length === 0).length,
      help: discussions.filter(d => d.category === 'help').length,
      updates: discussions.filter(d => d.category === 'updates').length,
      success_stories: discussions.filter(d => d.category === 'success_stories').length
    };
  }, [discussions]);

  // Feed filtering and sorting
  const filteredDiscussions = useMemo(() => {
    return discussions
      .filter(item => {
        if (activeTab === 'unanswered') {
          if (item.comments.length !== 0) return false;
        } else if (activeTab === 'all') {
          // show all
        } else if (item.category !== activeTab) {
          return false;
        }

        if (
          selectedTag !== 'All' &&
          !item.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())
        ) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = item.title.toLowerCase().includes(q);
          const matchesContent = item.content.toLowerCase().includes(q);
          const matchesAuthor = item.author.toLowerCase().includes(q);
          const matchesTag = item.tags.some(t => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesTag) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        if (sortBy === 'upvotes') {
          return b.upvotes - a.upvotes;
        }
        if (sortBy === 'replies') {
          return b.comments.length - a.comments.length;
        }
        if (sortBy === 'unanswered') {
          return a.comments.length - b.comments.length;
        }
        return b.createdAtTimestamp - a.createdAtTimestamp;
      });
  }, [discussions, activeTab, selectedTag, searchQuery, sortBy]);

  // Related discussions for the right panel inside the modal
  const relatedDiscussions = useMemo(() => {
    if (!activeThread) return [];
    return discussions
      .filter(d => d.id !== activeThread.id)
      .slice(0, 4);
  }, [discussions, activeThread]);

  // Sorted comments inside activeThread
  const sortedComments = useMemo(() => {
    if (!activeThread) return [];
    const list = [...activeThread.comments];
    if (repliesSort === 'top') {
      return list.sort((a, b) => {
        if (a.isAccepted && !b.isAccepted) return -1;
        if (!a.isAccepted && b.isAccepted) return 1;
        return b.upvotes - a.upvotes;
      });
    }
    if (repliesSort === 'newest') {
      return list.reverse();
    }
    return list;
  }, [activeThread, repliesSort]);

  // Handlers
  const handleToggleUpvote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const hasUpvoted = upvotedIds.has(id);
    const updatedUpvotes = new Set(upvotedIds);

    if (hasUpvoted) {
      updatedUpvotes.delete(id);
    } else {
      updatedUpvotes.add(id);
      awardXP(2, 'upvoting helpful discussion');
    }
    setUpvotedIds(updatedUpvotes);

    setDiscussions(prev =>
      prev.map(item => {
        if (item.id === id) {
          const delta = hasUpvoted ? -1 : 1;
          const updated = { ...item, upvotes: Math.max(0, item.upvotes + delta) };
          if (activeThread && activeThread.id === id) {
            setActiveThread(updated);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = new Set(bookmarkedIds);
    if (updated.has(id)) {
      updated.delete(id);
      showToast('Removed from saved bookmarks');
    } else {
      updated.add(id);
      showToast('Saved to your bookmarks! Access anytime.');
    }
    setBookmarkedIds(updated);
  };

  const handleShareDiscussion = (disc: Discussion, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const shareUrl = `${window.location.origin}/dashboard-react.html?discussion=${disc.slug || disc.id}`;
      navigator.clipboard.writeText(`[SmartPrep IISER Community] ${disc.title} - ${shareUrl}`);
      showToast('Discussion link copied to clipboard!');
    } catch (err) {
      showToast('Discussion link copied!');
    }
  };

  const handleToggleAiAccordion = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setExpandedAiIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleOpenAiDoubtSolver = (topic: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    localStorage.setItem('iiser_ai_prompt_preload', topic);
    onNavigate?.('ai_doubt_solver');
  };

  const handleReportPost = (disc: Discussion, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setReportModalDisc(disc);
  };

  const handleSubmitReport = () => {
    if (!reportModalDisc) return;
    setDiscussions(prev =>
      prev.map(d => (d.id === reportModalDisc.id ? { ...d, isReported: true } : d))
    );
    setReportModalDisc(null);
    showToast('Report submitted. Our moderation team will review this within 1 hour.');
  };

  const handleToggleAcceptedAnswer = (commentId: string) => {
    if (!activeThread) return;

    const updatedComments = activeThread.comments.map(c => {
      if (c.id === commentId) {
        const nextState = !c.isAccepted;
        if (nextState) {
          awardXP(25, 'accepted best answer solution');
        }
        return { ...c, isAccepted: nextState };
      }
      return c;
    });

    const updatedThread: Discussion = {
      ...activeThread,
      comments: updatedComments
    };

    setActiveThread(updatedThread);
    setDiscussions(prev =>
      prev.map(d => (d.id === activeThread.id ? updatedThread : d))
    );
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    const userProfileName = localStorage.getItem('currentUser') || currentUser.name || 'Himanshu Kumar';
    const initials =
      userProfileName
        .split(' ')
        .map(n => n.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('') || 'HK';

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: userProfileName,
      authorInitial: initials,
      authorRole: 'Aspirant',
      authorLevel: 3,
      timeAgo: 'Just now',
      content: replyText.trim(),
      upvotes: 0,
      isAccepted: false
    };

    const updatedThread: Discussion = {
      ...activeThread,
      comments: [...activeThread.comments, newComment]
    };

    setActiveThread(updatedThread);
    setDiscussions(prev =>
      prev.map(item => (item.id === activeThread.id ? updatedThread : item))
    );
    setReplyText('');
    awardXP(10, 'posting a helpful solution');
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim().length < 5) {
      setFormError('Please enter a descriptive title (at least 5 characters).');
      return;
    }
    if (newContent.trim().length < 15) {
      setFormError('Please provide more details in the description (at least 15 characters).');
      return;
    }
    setFormError(null);

    const userProfileName = localStorage.getItem('currentUser') || currentUser.name || 'Himanshu Kumar';
    const initials =
      userProfileName
        .split(' ')
        .map(n => n.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('') || 'HK';

    const newSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50);

    const newDiscussionItem: Discussion = {
      id: `disc-${Date.now()}`,
      slug: newSlug || `disc-${Date.now()}`,
      category: newCategory,
      author: userProfileName,
      authorInitial: initials,
      authorRole: 'Aspirant',
      userLevel: 3,
      timeAgo: 'Just now',
      createdAtTimestamp: Date.now(),
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: newTags.length > 0 ? newTags : ['Physics'],
      upvotes: 1,
      views: '1 view',
      comments: []
    };

    const nextUpvotes = new Set(upvotedIds);
    nextUpvotes.add(newDiscussionItem.id);
    setUpvotedIds(nextUpvotes);

    setDiscussions(prev => [newDiscussionItem, ...prev]);
    if (newCategory === 'help') {
      setActiveTab('help');
    } else {
      setActiveTab('all');
    }

    setIsNewModalOpen(false);
    awardXP(10, 'creating a community discussion');
    showToast('Your discussion has been published to the community!');

    setNewTitle('');
    setNewContent('');
    setNewTags(['Physics']);
  };

  const handleSelectTemplate = (template: typeof composerTemplate) => {
    setComposerTemplate(template);
    setFormError(null);
    switch (template) {
      case 'question':
        setNewCategory('help');
        if (!newTitle) setNewTitle('How do I solve ');
        if (!newTags.includes('Physics')) setNewTags(['Physics']);
        break;
      case 'concept':
        setNewCategory('discussions');
        if (!newTitle) setNewTitle('Conceptual Breakdown: ');
        if (!newTags.includes('Chemistry')) setNewTags(['Chemistry']);
        break;
      case 'pyq':
        setNewCategory('discussions');
        if (!newTitle) setNewTitle('IAT PYQ Analysis: ');
        setNewTags(['PYQs', 'Physics']);
        break;
      case 'strategy':
        setNewCategory('discussions');
        if (!newTitle) setNewTitle('Preparation Strategy: ');
        setNewTags(['IAT Strategy', 'Time Pressure']);
        break;
      case 'story':
        setNewCategory('success_stories');
        if (!newTitle) setNewTitle('My Journey & Lessons: ');
        setNewTags(['Motivation', 'IAT Strategy']);
        break;
    }
  };

  const handleOpenComposerWithTemplate = (
    template: typeof composerTemplate,
    category: Discussion['category']
  ) => {
    handleSelectTemplate(template);
    setNewCategory(category);
    setIsNewModalOpen(true);
  };

  const getRoleBadgeClasses = (role: string) => {
    if (role.toLowerCase().includes('mentor') || role.toLowerCase().includes('desk')) {
      return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
    }
    if (role.toLowerCase().includes('study') || role.toLowerCase().includes('partner')) {
      return 'bg-purple-500/15 text-purple-300 border border-purple-500/30';
    }
    return 'bg-slate-700/40 text-slate-300 border border-slate-600/40';
  };

  return (
    <div className="w-full min-h-screen bg-[#0D1117] text-[#F8FAFC] pb-32 transition-colors selection:bg-[#F43F5E]/30">
      {/* ── Toast Notification ─────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#161B22] text-[#F8FAFC] shadow-2xl border border-[#21262D] text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 pt-2 lg:pt-4">
        {/* ── Top Header with Gamification & Notification Bell ────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide pb-0.5">
              <span className="text-white/50">Dashboard</span>
              <span className="text-white/30">&gt;</span>
              <span className="text-cyan-400 font-semibold tracking-wider uppercase">Community</span>
              <span className="text-white/20 mx-1">•</span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                Community Exchange
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[11px] text-slate-400 font-normal">
                ⏱ Avg. answer: <strong className="text-slate-200 font-semibold">25m</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              Your IISER Journey, Together.
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
              Ask questions, discuss PYQs, solve daily sprints, and learn alongside serious IISER aspirants.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-xs font-semibold cursor-pointer transition-colors"
              title="Gamification: +10 pts for answers, +25 for Best Answer, +2 for upvotes"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#F43F5E] to-[#A78BFA] flex items-center justify-center text-[10px] font-bold text-white">
                3
              </div>
              <span className="text-slate-200 font-medium">{userLevel.badge}</span>
              <span className="text-slate-500 text-[11px]">({userXP} XP)</span>
            </div>

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotifOpen(prev => !prev)}
                className="relative p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.isRead) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F43F5E] ring-2 ring-[#0D1117]" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#161B22] border border-white/[0.1] shadow-2xl p-4 z-50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#F43F5E]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Notifications</h4>
                    </div>
                    <button
                      onClick={() => {
                        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
                        showToast('All notifications marked as read.');
                      }}
                      className="text-[11px] text-[#2DD4BF] hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {notifications.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.targetDiscussionId) {
                            const found = discussions.find(d => d.id === item.targetDiscussionId);
                            if (found) openDiscussion(found);
                          }
                          setIsNotifOpen(false);
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border text-xs cursor-pointer transition-colors space-y-1",
                          item.isRead
                            ? "bg-transparent border-transparent text-slate-400 hover:bg-white/[0.03]"
                            : "bg-white/[0.04] border-white/[0.08] text-white hover:border-[#F43F5E]/40"
                        )}
                      >
                        <div className="flex items-center justify-between font-semibold text-white">
                          <span className="truncate">{item.title}</span>
                          <span className="text-[10px] text-slate-500 font-normal">{item.timeAgo}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleOpenComposerWithTemplate('question', 'help')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F43F5E] hover:bg-rose-600 text-white font-semibold text-xs transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Ask a Question</span>
            </button>

            <button
              onClick={() => setIsFocusModeOpen(true)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-sm",
                isFocusRunning
                  ? "bg-purple-500/20 text-purple-200 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
                  : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200"
              )}
              title="Distraction-free focus timer with custom duration"
            >
              <Target className={cn("w-3.5 h-3.5", isFocusRunning ? "text-purple-400 animate-pulse" : "text-[#A78BFA]")} />
              <span>Focus</span>
              {isFocusRunning && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {formatFocusTime(focusSecondsLeft)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Weekly Challenge Banner (Minimalist Dark Glass Banner) ─────────── */}
        {showChallenge && (
          <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.08] hover:border-white/[0.12] transition-colors">
            <button
              onClick={() => setShowChallenge(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Dismiss challenge banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pr-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Weekly Challenge
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Ends in 2d 14h
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-display font-bold text-white">
                  Share the Physics or Math problem that took you the longest to solve in mock tests
                </h3>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  Break down your roadblock, the conceptual breakthrough, or shortcut. Top answers earn +25 XP and a mentor review.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-1 md:pt-0">
                <button
                  onClick={() => handleOpenComposerWithTemplate('question', 'help')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all cursor-pointer whitespace-nowrap active:scale-95"
                >
                  Contribute Solution
                </button>
                <button
                  onClick={() => {
                    setSelectedTag('Mock Tests');
                    showToast('Filtered by Mock Test challenge submissions');
                  }}
                  className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View submissions</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Two-Column Layout (Feed + Right Sidebar) ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ════ LEFT COLUMN: Main Community Feed (8 cols on lg) ═══════════════ */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md overflow-x-auto no-scrollbar">
              {MAIN_TABS.map(tab => {
                const isActive = activeTab === tab.id;
                const count = tabCounts[tab.id];
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer",
                      isActive
                        ? "bg-white/[0.08] text-white border border-white/10 shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded-full text-[10px] font-medium",
                        isActive ? "bg-rose-500/15 text-rose-300" : "bg-white/[0.04] text-slate-400"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sticky Topic Chips Bar */}
            <div className="sticky top-0 z-20 py-2 backdrop-blur-xl bg-[#0D1117]/85 border-y border-white/[0.06] flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {TAG_FILTERS.map(tag => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer",
                        isSelected
                          ? "bg-white text-slate-950 font-semibold shadow-sm"
                          : "bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.06]"
                      )}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>

              {(selectedTag !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedTag('All');
                    setSearchQuery('');
                  }}
                  className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 flex items-center rounded-xl bg-white/[0.02] border border-white/[0.08] px-3 py-2 focus-within:border-white/20 transition-colors">
                <Search className="w-4 h-4 mr-2 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search questions, concepts, PYQs, or preparation advice..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs font-medium text-slate-400 shrink-0">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="bg-transparent font-medium text-slate-200 outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-[#0D1117] text-white">Newest First</option>
                  <option value="upvotes" className="bg-[#0D1117] text-white">Most Upvoted</option>
                  <option value="replies" className="bg-[#0D1117] text-white">Most Replies</option>
                  <option value="unanswered" className="bg-[#0D1117] text-white">Unanswered First</option>
                </select>
              </div>
            </div>

            {/* Discussions Feed */}
            <div className="space-y-4">

              {filteredDiscussions.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-xl text-slate-300">
                    ✨
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {activeTab === 'unanswered'
                      ? 'No unanswered questions'
                      : 'No discussions found'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm font-normal">
                    {activeTab === 'unanswered'
                      ? 'Every academic doubt posted by peers currently has answers. Check back later or ask a new question!'
                      : 'Try broadening your search keywords or clearing active filters.'}
                  </p>
                  <button
                    onClick={() => handleOpenComposerWithTemplate('question', 'help')}
                    className="mt-2 px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium transition-all cursor-pointer shadow-sm"
                  >
                    Ask a Question
                  </button>
                </div>
              ) : (
                filteredDiscussions.map(disc => {
                  const isUpvoted = upvotedIds.has(disc.id);
                  const isBookmarked = bookmarkedIds.has(disc.id);
                  const hasAccepted = disc.comments.some(c => c.isAccepted);
                  const isUnanswered = disc.comments.length === 0;
                  const isAiExpanded = expandedAiIds.has(disc.id);

                  return (
                    <div
                      key={disc.id}
                      tabIndex={0}
                      onClick={e => openDiscussion(disc, e.currentTarget)}
                      className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-200 cursor-pointer flex gap-3.5 items-start focus:outline-none focus:ring-1 focus:ring-rose-500/40"
                    >
                      <div
                        onClick={e => handleToggleUpvote(disc.id, e)}
                        className={cn(
                          "flex flex-col items-center justify-center min-w-[42px] py-2 px-1.5 rounded-xl border transition-all select-none cursor-pointer shrink-0",
                          isUpvoted
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                            : "bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20"
                        )}
                        title="Upvote (+2 XP)"
                      >
                        <ChevronUp className={cn("w-4 h-4 transition-transform", isUpvoted && "stroke-[2.5]")} />
                        <span className="text-xs font-semibold mt-0.5">{disc.upvotes}</span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500/80 via-purple-600/80 to-indigo-600/80 flex items-center justify-center font-bold text-xs text-white">
                              {disc.authorInitial}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-white truncate">{disc.author}</span>
                            <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md", getRoleBadgeClasses(disc.authorRole))}>
                              {disc.authorRole}
                            </span>
                            <span className="text-xs text-slate-500">• {disc.timeAgo}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {disc.isPinned && (
                              <span className="text-[10px] bg-amber-500/10 border border-amber-500/25 text-amber-300 font-medium px-2 py-0.5 rounded-md uppercase">
                                Pinned
                              </span>
                            )}
                            {hasAccepted && (
                              <span className="text-[10px] bg-teal-500/10 border border-teal-500/25 text-teal-300 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Check className="w-3 h-3 stroke-[2.5]" />
                                Best Answer
                              </span>
                            )}
                            {isUnanswered && (
                              <span className="text-[10px] bg-amber-500/10 border border-amber-500/25 text-amber-300 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                Unanswered
                              </span>
                            )}
                            <button
                              onClick={e => handleToggleBookmark(disc.id, e)}
                              className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer transition-colors"
                              title="Bookmark"
                            >
                              <Bookmark className={cn("w-3.5 h-3.5", isBookmarked && "fill-rose-500 text-rose-500")} />
                            </button>
                            <button
                              onClick={e => handleReportPost(disc, e)}
                              className="p-1 text-slate-400 hover:text-amber-400 cursor-pointer transition-colors"
                              title="Report post"
                            >
                              <Flag className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={e => handleShareDiscussion(disc, e)}
                              className="p-1 text-slate-400 hover:text-white cursor-pointer transition-colors"
                              title="Share"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-sm sm:text-base font-display font-bold text-white group-hover:text-rose-400 transition-colors leading-snug">
                          {disc.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                          {disc.content}
                        </p>

                        {disc.aiExplanation && (
                          <div className="pt-0.5">
                            <button
                              type="button"
                              onClick={e => handleToggleAiAccordion(disc.id, e)}
                              className="flex items-center gap-1.5 text-[11px] font-medium text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>{isAiExpanded ? 'Hide AI Explanation' : '✨ Related AI Explanation'}</span>
                              <ChevronDown className={cn("w-3 h-3 transition-transform", isAiExpanded && "rotate-180")} />
                            </button>

                            {isAiExpanded && (
                              <div
                                onClick={e => e.stopPropagation()}
                                className="mt-2 p-3 rounded-xl bg-black/40 border border-teal-500/20 text-xs space-y-2 animate-in fade-in duration-150"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5 font-medium text-teal-300">
                                    <Brain className="w-3.5 h-3.5" />
                                    <span>AI Science Tutor Breakdown</span>
                                  </div>
                                  <button
                                    onClick={e => handleOpenAiDoubtSolver(disc.aiExplanation?.promptTopic || disc.title, e)}
                                    className="text-[10px] font-medium text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    <span>Open in AI Tutor</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </button>
                                </div>
                                <p className="text-slate-300 leading-relaxed font-normal">{disc.aiExplanation.summary}</p>
                                <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-400">
                                  {disc.aiExplanation.keyConcepts.map((pt, i) => (
                                    <li key={i}>{pt}</li>
                                  ))}
                                </ul>
                                {disc.aiExplanation.instantFormula && (
                                  <div className="p-1.5 rounded-lg bg-black/50 border border-white/5 font-mono text-[11px] text-teal-300">
                                    {disc.aiExplanation.instantFormula}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-3 pt-1 text-xs">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {disc.tags.map(t => (
                              <button
                                key={t}
                                onClick={e => {
                                  e.stopPropagation();
                                  setSelectedTag(t);
                                }}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06] cursor-pointer transition-colors"
                              >
                                #{t}
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-medium flex items-center gap-1 text-xs">
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>{disc.comments.length} {disc.comments.length === 1 ? 'reply' : 'replies'}</span>
                            </span>
                            <div className="text-rose-400 font-medium flex items-center gap-1 text-xs group-hover:translate-x-0.5 transition-transform">
                              <span>View Discussion</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ════ RIGHT COLUMN: High-Yield Community Sidebar (4 cols on lg) ══════ */}
          <div className="lg:col-span-4 space-y-4">
            {/* CARD 1: Top Contributors */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white">
                    Top Contributors
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">This Week</span>
              </div>

              <div className="space-y-2">
                {TOP_CONTRIBUTORS.map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative">
                        <div className={cn("w-7 h-7 rounded-full bg-gradient-to-tr flex items-center justify-center font-bold text-xs text-white", c.avatarColor)}>
                          {c.initials}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#0D1117] border border-white/10 flex items-center justify-center text-[8px] font-bold text-amber-400">
                          {c.rank}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white truncate">{c.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{c.level} • {c.acceptedCount} solves</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-teal-400">{c.points}</span>
                      <span className="text-[10px] text-slate-500 block">pts</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/15 text-[11px] text-amber-300/80 font-normal leading-relaxed">
                💡 <strong>Weekly Reward:</strong> Top 3 contributors earn direct 1-on-1 strategy sessions with IISER seniors.
              </div>
            </div>

            {/* CARD 2: Needs an Answer */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white">
                    Needs an Answer
                  </h3>
                </div>
                <span className="text-[10px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  +10 XP
                </span>
              </div>

              <p className="text-[11px] text-slate-400 font-normal">
                Help peers break past difficult questions.
              </p>

              <div className="space-y-2">
                {oldestUnanswered.map(u => (
                  <div key={u.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-medium text-rose-400">#{u.tags[0] || 'General'}</span>
                      <span>{u.timeAgo}</span>
                    </div>
                    <h4 className="text-xs font-medium text-white line-clamp-2 leading-snug">
                      {u.title}
                    </h4>
                    <button
                      onClick={() => openDiscussion(u)}
                      className="w-full py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 text-[11px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Answer Question</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: Sprint Leaderboard */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-teal-400" />
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white">
                    Sprint Goal
                  </h3>
                </div>
                <span className="text-[10px] text-teal-400 font-medium">2d 14h left</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Community Goal</span>
                  <span className="text-white font-medium">18 / 25 Solutions</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-400 to-purple-400 rounded-full transition-all duration-500" style={{ width: '72%' }} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>72% completed</span>
                  <span>7 solutions to goal</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Top Sprint Solver:</span>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">Arjun N. (3 accepted)</span>
                  <span className="text-[10px] font-medium text-amber-400">Leading</span>
                </div>
              </div>
            </div>

            {/* CARD 4: Trending Topics */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-400" />
                  <h3 className="text-xs font-display font-bold uppercase tracking-wider text-white">
                    Trending Topics
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">This Week</span>
              </div>

              <div className="space-y-1.5">
                {TRENDING_TOPICS.map(item => (
                  <button
                    key={item.tag}
                    onClick={() => {
                      setSelectedTag(item.tag);
                      showToast(`Filtered discussions by #${item.tag}`);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-300 group-hover:text-white">
                      <span>{item.icon}</span>
                      <span>#{item.tag}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-rose-400">
                      {item.count} posts
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal: New Discussion / Question Composer with AI Helper ───────── */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl bg-[#0D1117] border border-white/[0.08] p-5 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setIsNewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-semibold uppercase text-rose-400 tracking-wider">
                Community Forum
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                {composerTemplate === 'question'
                  ? 'Ask a Science Doubt'
                  : composerTemplate === 'story'
                  ? 'Share Success Story'
                  : 'Start Discussion'}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {[
                { id: 'question', label: '💡 Ask a Doubt', cat: 'help' },
                { id: 'concept', label: '🔍 Explain Concept', cat: 'discussions' },
                { id: 'pyq', label: '📝 Discuss a PYQ', cat: 'discussions' },
                { id: 'strategy', label: '🎯 Study Advice', cat: 'discussions' },
                { id: 'story', label: '🏆 Success Story', cat: 'success_stories' },
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleSelectTemplate(item.id as any)}
                  className={cn(
                    "p-2 rounded-xl text-xs font-medium border transition-all cursor-pointer truncate",
                    composerTemplate === item.id
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-300 font-semibold"
                      : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-4 pt-1">
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. How to evaluate definite integrals with fractional parts in IAT?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-white/20 text-white text-xs sm:text-sm outline-none transition-colors"
                />
              </div>

              {/* Instant AI Hint suggestion */}
              {newTitle.length > 6 && (
                <div className="p-3 rounded-xl bg-teal-500/5 border border-teal-500/20 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-teal-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Instant AI Hint Available
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenAiDoubtSolver(newTitle)}
                      className="text-[10px] font-medium text-purple-400 hover:underline cursor-pointer"
                    >
                      Ask AI Tutor first →
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Have an urgent question? The AI Doubt Solver can provide a step-by-step derivation immediately before publishing.
                  </p>
                </div>
              )}


              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1">
                  Topic Tags
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'IAT Strategy', 'Formulas', 'Mock Tests', 'PYQs'].map(t => {
                    const isSelected = newTags.includes(t);
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          if (isSelected) setNewTags(newTags.filter(item => item !== t));
                          else setNewTags([...newTags, t]);
                        }}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer",
                          isSelected
                            ? "bg-white text-slate-950 border-white font-semibold"
                            : "bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white"
                        )}
                      >
                        #{t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1">
                  Details / Context
                </label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Share details, problem context, formulas, or steps you've already attempted..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-white/20 text-white text-xs sm:text-sm outline-none resize-none transition-colors"
                />
              </div>

              {formError && (
                <div className="text-xs text-rose-400 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-xs shadow-sm transition-all cursor-pointer"
                >
                  Publish Discussion (+10 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── REDDIT-STYLE DISCUSSION POPUP / MODAL (SHALLOW ROUTING) ───────── */}
      {activeThread && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="discussion-modal-title"
          onClick={closeDiscussion}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-hidden"
        >
          {/* Inner Dialog Container (Desktop: Centered Rounded Modal, Mobile: Full-screen) */}
          <div
            onClick={e => e.stopPropagation()}
            className={cn(
              "w-full bg-[#0D1117] border-white/[0.08] flex flex-col md:flex-row overflow-hidden shadow-2xl transition-all",
              // Desktop: 768px+ max-w-5xl with rounded corners and border
              "md:max-w-5xl md:max-h-[90vh] md:rounded-2xl md:border",
              // Mobile (<768px): Full-screen page (Reddit-style)
              "h-full max-h-screen rounded-none border-0"
            )}
          >
            {/* ── MAIN DISCUSSION & REPLIES PANEL (LEFT / CENTER) ── */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
              {/* Top Navigation Bar inside Modal */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.08] shrink-0 bg-[#0D1117]/95 backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={closeDiscussion}
                    className="md:hidden p-1.5 -ml-1 text-slate-400 hover:text-white cursor-pointer"
                    title="Back to Feed"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500/80 via-purple-600/80 to-indigo-600/80 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                    {activeThread.authorInitial}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white truncate">{activeThread.author}</span>
                      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md shrink-0", getRoleBadgeClasses(activeThread.authorRole))}>
                        {activeThread.authorRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{activeThread.timeAgo}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Eye className="w-3 h-3 text-teal-400" />
                        {activeThread.views || '1.2k views'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Icons: Bookmark, Share, Flag, Close */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={e => handleToggleBookmark(activeThread.id, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Bookmark Discussion"
                  >
                    <Bookmark className={cn("w-4 h-4", bookmarkedIds.has(activeThread.id) && "fill-rose-500 text-rose-500")} />
                  </button>
                  <button
                    onClick={e => handleShareDiscussion(activeThread, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Share Link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={e => handleReportPost(activeThread, e)}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Report Post"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeDiscussion}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Discussion Body & Threaded Replies */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                {/* Discussion Title */}
                <h1 id="discussion-modal-title" className="text-lg sm:text-2xl font-display font-bold text-white leading-snug">
                  {activeThread.title}
                </h1>

                {/* Tags Metadata Bar */}
                <div className="flex items-center gap-2 flex-wrap">
                  {activeThread.tags.map(t => (
                    <span
                      key={t}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/[0.03] text-slate-400 border border-white/[0.06]"
                    >
                      #{t}
                    </span>
                  ))}
                  {activeThread.comments.some(c => c.isAccepted) && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/20 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Verified Solution Available
                    </span>
                  )}
                </div>

                {/* Prose Body Content */}
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                  {activeThread.content}
                </div>



                {/* Post Upvote & Reaction Bar */}
                <div className="flex items-center gap-3 pt-2 pb-4 border-b border-white/[0.08]">
                  <button
                    onClick={e => handleToggleUpvote(activeThread.id, e)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer",
                      upvotedIds.has(activeThread.id)
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        : "bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white"
                    )}
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>{activeThread.upvotes} Upvotes</span>
                  </button>

                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-teal-400" />
                    <span>{activeThread.comments.length} Solutions & Replies</span>
                  </span>
                </div>

                {/* ── Replies Section ── */}
                <div className="space-y-4">
                  {/* Replies Sort Bar */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Solutions & Discussions
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Sort by:</span>
                      <select
                        value={repliesSort}
                        onChange={e => setRepliesSort(e.target.value as any)}
                        className="bg-white/[0.02] border border-white/[0.08] rounded-lg px-2 py-1 text-slate-200 font-medium outline-none cursor-pointer"
                      >
                        <option value="top" className="bg-[#0D1117] text-white">Top Solutions</option>
                        <option value="newest" className="bg-[#0D1117] text-white">Newest First</option>
                        <option value="oldest" className="bg-[#0D1117] text-white">Oldest First</option>
                      </select>
                    </div>
                  </div>

                  {/* Empty state */}
                  {sortedComments.length === 0 ? (
                    <div className="p-8 text-center rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <p className="text-xs font-medium text-white">No solutions posted yet.</p>
                      <p className="text-xs text-slate-400">
                        Know the answer or shortcut? Post your solution below to earn +10 XP!
                      </p>
                    </div>
                  ) : (
                    /* Reply Cards List */
                    <div className="space-y-3">
                      {sortedComments.map(c => (
                        <div
                          key={c.id}
                          className={cn(
                            "p-4 rounded-xl border space-y-2.5 transition-all",
                            c.isAccepted
                              ? "bg-teal-500/5 border-teal-500/25"
                              : "bg-white/[0.02] border-white/[0.06]"
                          )}
                        >
                          {/* Best Answer Badge */}
                          {c.isAccepted && (
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-300 pb-1">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                              <span>VERIFIED BEST ANSWER (+25 XP)</span>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-white">
                                {c.authorInitial}
                              </div>
                              <span className="font-semibold text-xs text-white">{c.author}</span>
                              <span className={cn("text-[9px] font-medium px-1.5 py-0.2 rounded", getRoleBadgeClasses(c.authorRole))}>
                                {c.authorRole}
                              </span>
                              <span className="text-[10px] text-slate-500">• {c.timeAgo}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Mark as Best Answer Toggle */}
                              <button
                                type="button"
                                onClick={() => handleToggleAcceptedAnswer(c.id)}
                                className={cn(
                                  "text-[10px] font-medium px-2 py-0.5 rounded border transition-all cursor-pointer flex items-center gap-1",
                                  c.isAccepted
                                    ? "bg-teal-500 text-slate-950 border-teal-500 font-semibold"
                                    : "border-white/[0.08] text-slate-400 hover:text-teal-400 hover:border-teal-500/30"
                                )}
                              >
                                <Check className="w-3 h-3" />
                                <span>{c.isAccepted ? 'Accepted' : 'Mark as Best'}</span>
                              </button>
                              <span className="text-xs text-slate-400 font-medium">▲ {c.upvotes}</span>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line pl-9 leading-relaxed font-normal">
                            {c.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Sticky Bottom Reply Composer ── */}
              <form
                onSubmit={handleAddReply}
                className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#0D1117] shrink-0 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={replyInputRef}
                    type="text"
                    maxLength={500}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => {
                      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                        handleAddReply(e);
                      }
                    }}
                    placeholder="Write a helpful answer, formula shortcut, or insight... (Cmd/Ctrl + Enter to send)"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs sm:text-sm text-white outline-none focus:border-white/20 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-40 text-white font-medium text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit (+10 XP)</span>
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                  <span>Press <kbd className="px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">Ctrl + Enter</kbd> to submit</span>
                  <span>{replyText.length} / 500 characters</span>
                </div>
              </form>
            </div>

            {/* ── RELATED DISCUSSIONS SIDEBAR (DESKTOP ONLY, INSIDE MODAL) ── */}
            <div className="hidden md:flex md:w-72 lg:w-80 flex-col border-l border-white/[0.08] bg-[#070914] p-5 space-y-4 shrink-0 overflow-y-auto">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Related Discussions</span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">
                Browse similar questions from IAT aspirants.
              </p>

              <div className="space-y-2">
                {relatedDiscussions.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => openDiscussion(rel)}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-medium text-rose-400">#{rel.tags[0]}</span>
                      <span>{rel.timeAgo}</span>
                    </div>
                    <h4 className="text-xs font-medium text-white group-hover:text-rose-400 line-clamp-2 leading-snug transition-colors">
                      {rel.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                      <span>▲ {rel.upvotes} upvotes</span>
                      <span>{rel.comments.length} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Report Post Modal ─────────────────────────────────────────────── */}
      {reportModalDisc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#0D1117] border border-white/[0.08] p-5 space-y-3 shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Report Post to Moderation</span>
            </div>
            <p className="text-xs text-slate-400 font-normal">
              Help maintain a high academic standard for IISER SmartPrep.
            </p>
            <select
              value={reportReason}
              onChange={e => setReportReason(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-slate-200 outline-none"
            >
              <option value="Irrelevant / off-topic content" className="bg-[#0D1117] text-white">Irrelevant / off-topic content</option>
              <option value="Incorrect or misleading academic answer" className="bg-[#0D1117] text-white">Incorrect or misleading academic answer</option>
              <option value="Spam or promotional link" className="bg-[#0D1117] text-white">Spam or promotional link</option>
              <option value="Inappropriate language" className="bg-[#0D1117] text-white">Inappropriate language</option>
            </select>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setReportModalDisc(null)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReport}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-medium text-xs transition-colors cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ── Mini Floating Focus Pill (When timer is running & modal is closed) ── */}
      {isFocusRunning && !isFocusModeOpen && (
        <div
          onClick={() => setIsFocusModeOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0D1117]/95 backdrop-blur-xl border border-purple-500/40 text-white shadow-[0_10px_35px_rgba(168,85,247,0.25)] hover:border-purple-400 transition-all cursor-pointer group hover:scale-[1.02] active:scale-95 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40">
            <Target className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-purple-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{focusSubject} Focus</span>
            </div>
            <div className="text-sm font-bold font-mono text-white tracking-wider">
              {formatFocusTime(focusSecondsLeft)}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFocusRunning();
            }}
            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
            title={isFocusRunning ? "Pause Focus" : "Resume Focus"}
          >
            {isFocusRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-purple-400" />}
          </button>
        </div>
      )}

      {/* ── FOCUS MODE MODAL / FULLSCREEN OVERLAY ──────────────────────────── */}
      {isFocusModeOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center transition-all duration-300",
            isFocusFullscreen
              ? "p-0 bg-[#090D14]"
              : "p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          )}
        >
          <div
            className={cn(
              "relative w-full flex flex-col justify-between rounded-3xl bg-[#0D1117] border border-white/[0.1] shadow-2xl transition-all duration-300 overflow-hidden",
              isFocusFullscreen
                ? "h-full max-w-none rounded-none border-none p-6 sm:p-12 justify-center"
                : "max-w-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-7"
            )}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#F43F5E]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-white font-display tracking-tight">
                      Focus Mode
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" /> +25 XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal">
                    Distraction-free environment for intense IISER problem solving.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFocusFullscreen(!isFocusFullscreen)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title={isFocusFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFocusFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsFocusFullscreen(false);
                    setIsFocusModeOpen(false);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  title="Minimize (timer continues in background)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="relative z-10 py-6 space-y-6">
              {/* Subject Selector & Goal Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                  {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Aptitude'].map(sub => (
                    <button
                      key={sub}
                      onClick={() => setFocusSubject(sub)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap",
                        focusSubject === sub
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                          : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:text-slate-200 hover:bg-white/[0.06]"
                      )}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                  <Flame className="w-3.5 h-3.5" />
                  <span className="font-semibold">{focusSessionsCompleted}</span>
                  <span className="text-[11px] text-amber-300/70">completed today</span>
                </div>
              </div>

              {/* Goal Input */}
              <div className="relative">
                <input
                  type="text"
                  value={focusGoal}
                  onChange={(e) => setFocusGoal(e.target.value)}
                  placeholder="Set your micro-goal for this session..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>

              {/* Circular Gauge Countdown */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
                  {/* SVG Circle Progress */}
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 240 240">
                    <circle
                      cx="120"
                      cy="120"
                      r="104"
                      className="text-white/[0.04]"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="120"
                      cy="120"
                      r="104"
                      className="text-purple-500 transition-all duration-1000 ease-linear"
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 104}
                      strokeDashoffset={
                        2 * Math.PI * 104 * (1 - (focusDurationMinutes * 60 > 0 ? (focusDurationMinutes * 60 - focusSecondsLeft) / (focusDurationMinutes * 60) : 0))
                      }
                      strokeLinecap="round"
                      stroke="url(#focusGradient)"
                      fill="transparent"
                    />
                    <defs>
                      <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A78BFA" />
                        <stop offset="100%" stopColor="#F43F5E" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Inner Content */}
                  <div className="absolute flex flex-col items-center justify-center text-center space-y-1">
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">
                      {focusSubject}
                    </span>
                    <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
                      {formatFocusTime(focusSecondsLeft)}
                    </span>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          isFocusRunning ? "bg-emerald-400 animate-ping" : "bg-slate-500"
                        )}
                      />
                      <span className="text-[11px] font-medium text-slate-400">
                        {isFocusRunning ? "Session in progress" : "Paused / Ready"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Presets & Custom Duration Controls */}
              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Choose Duration:</span>
                  </span>
                  <span className="font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">
                    {focusDurationMinutes} Minutes
                  </span>
                </div>

                {/* Duration Presets */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {[
                    { label: '15m', mins: 15, sub: 'Sprint' },
                    { label: '25m', mins: 25, sub: 'Pomodoro' },
                    { label: '45m', mins: 45, sub: 'IAT Drill' },
                    { label: '60m', mins: 60, sub: 'Deep Work' },
                    { label: '90m', mins: 90, sub: 'Mock Exam' }
                  ].map(preset => (
                    <button
                      key={preset.mins}
                      onClick={() => handleSelectFocusDuration(preset.mins)}
                      className={cn(
                        "py-2 sm:py-2.5 px-1 rounded-xl text-center transition-all cursor-pointer border flex flex-col items-center justify-center",
                        focusDurationMinutes === preset.mins
                          ? "bg-purple-500/20 border-purple-500/50 text-white shadow-sm"
                          : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05] hover:border-white/[0.12]"
                      )}
                    >
                      <span className="text-xs sm:text-sm font-bold font-mono">{preset.label}</span>
                      <span className="text-[9px] text-slate-400 hidden sm:inline">{preset.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Time Slider + Steppers */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSelectFocusDuration(Math.max(5, focusDurationMinutes - 5))}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-mono text-xs border border-white/[0.08] transition-colors cursor-pointer"
                      title="Minus 5 minutes"
                    >
                      -5m
                    </button>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      step="5"
                      value={focusDurationMinutes}
                      onChange={(e) => handleSelectFocusDuration(parseInt(e.target.value, 10))}
                      className="flex-1 accent-purple-500 h-1.5 bg-white/[0.08] rounded-lg cursor-pointer"
                    />
                    <button
                      onClick={() => handleSelectFocusDuration(Math.min(180, focusDurationMinutes + 5))}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-mono text-xs border border-white/[0.08] transition-colors cursor-pointer"
                      title="Plus 5 minutes"
                    >
                      +5m
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 font-mono">
                    <span>5 min (Micro)</span>
                    <span>Custom Drag Slider</span>
                    <span>120 min (Max)</span>
                  </div>
                </div>
              </div>

              {/* Ambient Sound Generator (Web Audio) */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  {focusAmbientSound === 'none' ? (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
                  )}
                  <span>Focus Sound:</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleAmbient('none')}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                      focusAmbientSound === 'none'
                        ? "bg-white/[0.1] text-white border border-white/[0.2]"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Mute
                  </button>
                  <button
                    onClick={() => handleToggleAmbient('alpha')}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                      focusAmbientSound === 'alpha'
                        ? "bg-purple-500/25 text-purple-200 border border-purple-500/40"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    432Hz Alpha Waves
                  </button>
                  <button
                    onClick={() => handleToggleAmbient('rain')}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer",
                      focusAmbientSound === 'rain'
                        ? "bg-purple-500/25 text-purple-200 border border-purple-500/40"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Pink Rain
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetFocusTimer}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer border border-white/[0.08]"
                  title="Reset to selected duration"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  onClick={handleAddFiveMinutes}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer border border-white/[0.08]"
                  title="Extend time by 5 minutes"
                >
                  +5 Min
                </button>
              </div>

              {/* Main Play / Pause CTA */}
              <button
                onClick={handleToggleFocusRunning}
                className={cn(
                  "flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-lg active:scale-95",
                  isFocusRunning
                    ? "bg-amber-500/90 hover:bg-amber-500 text-slate-950 shadow-amber-500/20"
                    : "bg-gradient-to-r from-purple-500 to-[#F43F5E] hover:opacity-95 text-white shadow-purple-500/25"
                )}
              >
                {isFocusRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Session</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Focus Session</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
