import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Target, Clock, Zap, PlayCircle,
  AlertTriangle, ChevronRight, CheckCircle2, ChevronDown, Compass,
  TrendingUp, RotateCcw, Brain,
} from 'lucide-react';
import { LESSONS_DATA } from '../../data/lessons';
import { SearchBar } from '../smart-lessons/SearchBar';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import type { SlsDashboardData, SlsMasteryChapter } from '../../types/sls';

interface Props {
  onNavigate?: (view: string) => void;
  initialSubject?: string;
  dashboardData?: any;
  slsData?: SlsDashboardData;
  slsLoading?: boolean;
}

const SUBJECT_ICONS: Record<string, string> = {
  Physics:     '⚛️',
  Chemistry:   '🧪',
  Biology:     '🌿',
  Mathematics: '📐',
};

const SUBJECT_THEMES: Record<string, {
  glow: string;
  bgGrad: string;
  iconBg: string;
  textColor: string;
  progressBar: string;
  borderHover: string;
}> = {
  Physics: {
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]',
    bgGrad: 'bg-gradient-to-r from-[#0A0C16] via-[#0A0C16] to-blue-500/[0.03]',
    iconBg: 'bg-blue-500/10 border border-blue-500/20 text-blue-400',
    textColor: 'text-blue-300 border-blue-500/20 bg-blue-500/5',
    progressBar: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    borderHover: 'hover:border-blue-500/30'
  },
  Chemistry: {
    glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.08)]',
    bgGrad: 'bg-gradient-to-r from-[#0A0C16] via-[#0A0C16] to-rose-500/[0.03]',
    iconBg: 'bg-rose-500/10 border border-rose-500/20 text-rose-400',
    textColor: 'text-rose-300 border-rose-500/20 bg-rose-500/5',
    progressBar: 'bg-gradient-to-r from-rose-500 to-pink-400',
    borderHover: 'hover:border-rose-500/30'
  },
  Biology: {
    glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]',
    bgGrad: 'bg-gradient-to-r from-[#0A0C16] via-[#0A0C16] to-emerald-500/[0.03]',
    iconBg: 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400',
    textColor: 'text-emerald-300 border-emerald-500/20 bg-emerald-500/5',
    progressBar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    borderHover: 'hover:border-emerald-500/30'
  },
  Mathematics: {
    glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]',
    bgGrad: 'bg-gradient-to-r from-[#0A0C16] via-[#0A0C16] to-amber-500/[0.03]',
    iconBg: 'bg-amber-500/10 border border-amber-500/20 text-amber-400',
    textColor: 'text-amber-300 border-amber-500/20 bg-amber-500/5',
    progressBar: 'bg-gradient-to-r from-amber-500 to-yellow-400',
    borderHover: 'hover:border-amber-500/30'
  }
};

export function SmartLessonsHub({ onNavigate, initialSubject, dashboardData, slsData, slsLoading }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState<string>(
    initialSubject && initialSubject !== 'All' ? initialSubject : 'Physics'
  );
  const [statuses, setStatuses] = useState<Record<string, 'not_started' | 'in_progress' | 'completed'>>({});

  // Sync with initialSubject when parameter changes
  useEffect(() => {
    if (initialSubject && initialSubject !== 'All') {
      setActiveSubject(initialSubject);
    }
  }, [initialSubject]);

  // Load progress from Supabase + localStorage + SLS Mastery on mount / data update
  useEffect(() => {
    const completedSet = new Set(dashboardData?.completed_lessons || []);
    
    // Build a set of completed chapters from SLS Mastery data
    const slsCompletedSet = new Set<string>();
    if (slsData?.mastery?.mastery) {
      slsData.mastery.mastery.forEach((m: any) => {
        if (m.attemptCount > 0) {
          slsCompletedSet.add(m.chapterId);
        }
      });
    }

    const loaded: Record<string, 'not_started' | 'in_progress' | 'completed'> = {};
    LESSONS_DATA.forEach((l) => {
      const saved = localStorage.getItem(`lesson_${l.id}`);
      if (
        completedSet.has(`lesson_${l.id}`) || 
        saved === 'completed' || 
        slsCompletedSet.has(l.id)
      ) {
        loaded[l.id] = 'completed';
      } else if (saved === 'in_progress') {
        loaded[l.id] = 'in_progress';
      } else {
        loaded[l.id] = 'not_started';
      }
    });
    setStatuses(loaded);
  }, [dashboardData, slsData]);

  // Compute stats
  const stats = useMemo(() => {
    const total = LESSONS_DATA.length;
    let completed = 0;
    let inProgress = 0;
    Object.values(statuses).forEach((st) => {
      if (st === 'completed') completed++;
      else if (st === 'in_progress') inProgress++;
    });
    const remaining = total - completed - inProgress;
    return { total, completed, inProgress, remaining };
  }, [statuses]);

  const completionPercent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const streakDays = dashboardData?.streak_days ?? 0;
  const hoursStudied = useMemo(() => {
    let estimatedMinutes = 0;
    LESSONS_DATA.forEach((l) => {
      if (statuses[l.id] === 'completed') {
        estimatedMinutes += l.duration || 45;
      } else if (statuses[l.id] === 'in_progress') {
        // Only count in-progress lessons at a tiny fraction (e.g. 10% up to 5 mins) to prevent inflation
        estimatedMinutes += Math.min(5, (l.duration || 45) * 0.1);
      }
    });

    const dbHours = (dashboardData?.total_study_time || 0) / 3600;
    const estHours = estimatedMinutes / 60;
    const finalHours = Math.max(dbHours, estHours);

    if (finalHours === 0) return 0;
    if (finalHours < 0.1) return Number(finalHours.toFixed(2));
    return Number(finalHours.toFixed(1));
  }, [dashboardData?.total_study_time, statuses]);

  const readinessImpact = useMemo(() => {
    // 3% readiness impact for each completed lesson, 0.3% for each in-progress lesson
    const completedScore = stats.completed * 3.0;
    const inProgressScore = stats.inProgress * 0.3;
    return Math.max(1, Math.round(completedScore + inProgressScore)) || 1;
  }, [stats.completed, stats.inProgress]);

  // Continue Learning lesson selection logic
  const continueLesson = useMemo(() => {
    // 1. Find all in-progress lessons (progress > 0% and < 100%)
    const inProgressLessons = LESSONS_DATA.filter(l => {
      const status = statuses[l.id];
      if (status !== 'in_progress') return false;
      const pctStr = localStorage.getItem(`lesson_progress_${l.id}`);
      const pct = pctStr ? parseInt(pctStr, 10) : 72; // default fallback if status is in_progress
      return pct > 0 && pct < 100;
    });

    if (inProgressLessons.length > 0) {
      // Sort by last opened timestamp desc
      return inProgressLessons.sort((a, b) => {
        const timeA = parseInt(localStorage.getItem(`lesson_last_opened_${a.id}`) || '0', 10);
        const timeB = parseInt(localStorage.getItem(`lesson_last_opened_${b.id}`) || '0', 10);
        return timeB - timeA;
      })[0];
    }

    // 2. If no in-progress lesson, show the most appropriate next unstarted lesson
    const unstarted = LESSONS_DATA.find(l => statuses[l.id] === 'not_started');
    if (unstarted) return unstarted;

    // 3. Fallback to first lesson (or a completed one if all are completed)
    return LESSONS_DATA.find(l => statuses[l.id] !== 'completed') || LESSONS_DATA[0];
  }, [statuses]);

  const continueProgress = useMemo(() => {
    const status = statuses[continueLesson.id];
    if (status === 'completed') return 100;
    if (status === 'in_progress') {
      const savedProgress = localStorage.getItem(`lesson_progress_${continueLesson.id}`);
      if (savedProgress) {
        const parsed = parseInt(savedProgress, 10);
        if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
          return parsed;
        }
      }
      return 72; // fallback default
    }
    return 0; // not started
  }, [continueLesson, statuses]);

  const headingText = continueProgress === 0 ? 'Start Learning' : continueProgress === 100 ? 'Review Lesson' : 'Continue Reading';
  const buttonText = continueProgress === 0 ? 'Start' : continueProgress === 100 ? 'Review' : 'Continue';

  // Recently viewed lessons (mini)
  const recentLessons = useMemo(() => {
    const active = LESSONS_DATA.filter(l => statuses[l.id] === 'in_progress' || statuses[l.id] === 'completed');
    if (active.length > 0) {
      return active.slice(0, 3).map(l => {
        const status = statuses[l.id];
        let progressVal = 0;
        if (status === 'completed') {
          progressVal = 100;
        } else {
          const savedProgress = localStorage.getItem(`lesson_progress_${l.id}`);
          if (savedProgress) {
            const parsed = parseInt(savedProgress, 10);
            if (!isNaN(parsed) && parsed > 0 && parsed <= 100) {
              progressVal = parsed;
            }
          }
          if (progressVal === 0) progressVal = 72; // fallback
        }
        return {
          id: l.id,
          title: l.title,
          progress: progressVal,
          icon: SUBJECT_ICONS[l.subject] || '⚛️'
        };
      });
    }
    return [
      { id: 'che_bonding', title: 'Chemical Bonding and Molecular Structure', progress: 45, icon: '🧪' },
      { id: 'bio_plant_kingdom', title: 'Plant Kingdom', progress: 12, icon: '🌿' },
      { id: 'mat_limits_derivatives', title: 'Limits and Derivatives', progress: 8, icon: '📐' }
    ];
  }, [statuses]);

  // Subjects Overview Dynamic data
  const subjectsOverview = useMemo(() => {
    return [
      { name: 'Physics', icon: '⚛️', color: 'blue' },
      { name: 'Chemistry', icon: '🧪', color: 'rose' },
      { name: 'Biology', icon: '🌿', color: 'emerald' },
      { name: 'Mathematics', icon: '📐', color: 'amber' }
    ].map(sub => {
      const subjectLessons = LESSONS_DATA.filter(l => l.subject === sub.name);
      const total = subjectLessons.length;
      const completedCount = subjectLessons.filter(l => statuses[l.id] === 'completed').length;
      const progress = total > 0 ? Math.round((completedCount / total) * 100) : 0;
      
      let msg = 'Not Started';
      if (progress >= 80) msg = 'Nearly Complete';
      else if (progress >= 50) msg = 'Good Progress';
      else if (progress > 0) msg = 'In Progress';
      else msg = 'Needs Attention';

      return {
        name: sub.name,
        icon: sub.icon,
        color: sub.color,
        completed: completedCount,
        total: total,
        progress: progress,
        msg: msg
      };
    });
  }, [statuses]);

  // Active Subject Chapters Filtered List
  const activeSubjectChapters = useMemo(() => {
    return LESSONS_DATA.filter(l => {
      const matchesSearch = !searchQuery.trim() || 
        l.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        l.subject.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        l.weightage.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        l.difficulty.toLowerCase().includes(searchQuery.toLowerCase().trim());
      
      if (searchQuery.trim()) return matchesSearch;
      
      // If no search, filter by selected activeSubject tab
      const filterTarget = activeSubject === 'Mathematics' || activeSubject === 'Math' ? 'Mathematics' : activeSubject;
      return l.subject === filterTarget;
    }).map(l => {
      const status = statuses[l.id] || 'not_started';
      return {
        id: l.id,
        name: l.title,
        subject: l.subject,
        status: status,
        progress: status === 'completed' ? 100 : status === 'in_progress' ? 72 : 0,
        weightage: l.weightage,
        revision: l.revision,
        difficulty: l.difficulty,
        ncertEnough: l.ncertEnough
      };
    });
  }, [activeSubject, searchQuery, statuses]);

  // Global search suggestions matches list
  const matchingSearchLessons = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return LESSONS_DATA.filter(l => 
      l.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      l.subject.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      l.weightage.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      l.difficulty.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery]);

  // ── SLS: build a chapterId → full mastery object map ──────────────────
  const masteryMap = useMemo<Record<string, SlsMasteryChapter>>(() => {
    const list = slsData?.mastery?.mastery ?? [];
    return Object.fromEntries(list.map(item => [item.chapterId, item]));
  }, [slsData?.mastery]);

  // ── SLS: top 3 recommendations — deduplicated by chapterId, chapter must be resolvable ──
  const topRecs = useMemo(() => {
    const recs = slsData?.recommendations?.recommendations ?? [];
    const lessonIds = new Set(LESSONS_DATA.map(l => l.id));

    // Keep only recs whose chapterId maps to a known lesson
    const resolvable = recs.filter(r => r.chapterId && lessonIds.has(r.chapterId));

    // Deduplicate by chapterId: keep the one with highest priorityScore
    const byChapter = new Map<string, typeof resolvable[0]>();
    for (const rec of resolvable) {
      const existing = byChapter.get(rec.chapterId!);
      if (!existing || rec.priorityScore > existing.priorityScore) {
        byChapter.set(rec.chapterId!, rec);
      }
    }

    return [...byChapter.values()]
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, 3);
  }, [slsData?.recommendations]);

  // ── SLS: top 4 revision queue items (due first, then by priority) ──────
  const topQueue = useMemo(() => {
    const queue = slsData?.revision?.revisionQueue ?? [];
    return queue.slice(0, 4); // already sorted server-side: isDue first, then priorityScore desc
  }, [slsData?.revision]);

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 lg:pb-0">
      
      {/* HEADER STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-2 lg:col-span-4 flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <BookOpen className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">Smart Lessons</h1>
            <p className="text-sm text-white/50 mt-0.5">Master concepts faster with personalised smart lessons and revision.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-white/50 mb-1">Lessons Completed</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{stats.completed}</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors" />
          <p className="text-xs text-amber-400/80 mb-1">Current Streak</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-amber-400">{streakDays}</span>
            <span className="text-sm text-amber-400/60 font-medium">Days</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-xs text-white/50 mb-1">Hours Studied</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-white">{hoursStudied}</span>
            <span className="text-sm text-white/40">h</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0A0C16] border border-emerald-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5" />
          <p className="text-xs text-emerald-400/80 mb-1">Chapters Mastered</p>
          <div className="flex items-baseline gap-2">
            {slsLoading ? (
              <div className="h-8 w-8 bg-white/10 rounded animate-pulse" />
            ) : (
              <>
                <span className="text-3xl font-display font-bold text-emerald-400">
                  {slsData?.mastery?.summary?.masteredCount ?? '—'}
                </span>
                {slsData?.mastery?.summary?.totalChapters != null && (
                  <span className="text-sm text-emerald-400/50 font-medium">
                    / {slsData.mastery.summary.totalChapters}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="space-y-4 relative max-w-2xl mx-auto w-full">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        {/* Floating Search Results Dropdown */}
        {searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0C0E1B] border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                Matches ({matchingSearchLessons.length})
              </span>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear
              </button>
            </div>
            
            {matchingSearchLessons.length === 0 ? (
              <div className="p-6 text-center text-xs text-white/40">
                No matching lessons found.
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto divide-y divide-white/5">
                {matchingSearchLessons.slice(0, 6).map((l) => (
                  <div
                    key={l.id}
                    onClick={() => {
                      onNavigate?.(`/smart-lessons/${l.id}`);
                      setSearchQuery('');
                    }}
                    className="p-3 hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg shrink-0">{SUBJECT_ICONS[l.subject] || '⚛️'}</span>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {l.title}
                        </h4>
                        <p className="text-[10px] text-white/40 font-medium">
                          {l.subject} · {l.weightage} Weightage
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: 2/3 Width */}
        <div className="lg:col-span-2 space-y-6">
           
          {/* CONTINUE LEARNING */}
          <section>
            <div 
              onClick={() => onNavigate?.(`/smart-lessons/${continueLesson.id}`)}
              className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#0A0C16] to-indigo-500/5 border border-indigo-500/20 relative overflow-hidden group hover:border-indigo-500/40 transition-all cursor-pointer"
            >
              <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute right-6 top-6 p-3 bg-white/5 rounded-full backdrop-blur-md">
                 <PlayCircle className="w-8 h-8 text-indigo-400 pl-1" />
              </div>

              <div className="relative z-10">
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold tracking-wider uppercase border border-indigo-500/20 mb-4 inline-block">
                  {headingText}
                </span>
                
                <div className="flex items-center gap-3 mb-2 text-indigo-200">
                  <span className="text-2xl">{SUBJECT_ICONS[continueLesson.subject] || '📚'}</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white">{continueLesson.title}</h2>
                </div>
                
                <div className="flex items-center gap-4 text-xs font-medium text-white/50 mb-6 pb-6 border-b border-white/5">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {continueLesson.revision} min remaining</span>
                  <span>Last opened yesterday</span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 max-w-sm">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-emerald-400 font-bold text-sm">{continueProgress}% Complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300" style={{ width: `${continueProgress}%` }} />
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); onNavigate?.(`/smart-lessons/${continueLesson.id}`); }}
                    className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 w-full md:w-auto"
                  >
                    {buttonText} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* RECENTLY VIEWED (Mini) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
               {recentLessons.map((item, i) => (
                 <div 
                   key={i} 
                   onClick={() => onNavigate?.(`/smart-lessons/${item.id}`)} 
                   className="p-3 bg-[#0A0C16] border border-white/5 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all"
                 >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg shrink-0">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white/90 truncate">{item.title}</h4>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1.5">
                        <div className="h-full bg-cyan-400" style={{ width: `${item.progress}%` }}/>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* SUBJECT EXPLORER */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" /> Subject Explorer
              </h3>
            </div>
            
            {/* Horizontal Subjects Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {subjectsOverview.map((sub) => {
                const theme = SUBJECT_THEMES[sub.name] || SUBJECT_THEMES.Physics;
                const isActive = activeSubject === sub.name || (activeSubject === 'Math' && sub.name === 'Mathematics');
                
                return (
                  <div 
                    key={sub.name}
                    onClick={() => {
                      setActiveSubject(sub.name);
                      setSearchQuery(''); // clear search when switching tabs to avoid confusion
                    }}
                    className={cn(
                      "rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer bg-[#0A0C16] relative flex flex-col gap-3 p-5 select-none",
                      isActive 
                        ? cn("border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]", theme.glow, "ring-1", 
                             sub.name === 'Physics' ? 'ring-blue-500/30' :
                             sub.name === 'Chemistry' ? 'ring-rose-500/30' :
                             sub.name === 'Biology' ? 'ring-emerald-500/30' :
                             'ring-amber-500/30'
                            )
                        : "border-white/5 opacity-75 hover:opacity-100 hover:border-white/10"
                    )}
                  >
                    {isActive && (
                      <div className={cn("absolute inset-0 opacity-10 bg-gradient-to-br from-transparent to-white pointer-events-none",
                        sub.name === 'Physics' ? 'bg-blue-500' :
                        sub.name === 'Chemistry' ? 'bg-rose-500' :
                        sub.name === 'Biology' ? 'bg-emerald-500' :
                        'bg-amber-500'
                      )} />
                    )}

                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border shadow-inner",
                        theme.iconBg
                      )}>
                        {sub.icon}
                      </div>
                      
                      <div className="text-right">
                        <span className="text-lg font-display font-black text-white leading-none">
                          {sub.progress}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-white leading-snug text-sm sm:text-base">
                        {sub.name === 'Mathematics' ? 'Math' : sub.name}
                      </h4>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">
                        {sub.completed} / {sub.total} completed
                      </p>
                    </div>

                    {/* Minimal Progress Bar */}
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                       <div 
                         className={cn("h-full rounded-full transition-all duration-500", theme.progressBar)} 
                         style={{ width: `${sub.progress}%` }} 
                       />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chapters list under active subject */}
            <div className="bg-[#0A0C16] border border-white/5 rounded-3xl p-6 relative">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  {searchQuery.trim() ? 'Search Results' : `${activeSubject === 'Math' ? 'Mathematics' : activeSubject} Chapters`}
                  <span className="text-[10px] text-cyan-300 font-extrabold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {activeSubjectChapters.length} topics
                  </span>
                </h3>
              </div>

              {activeSubjectChapters.length === 0 ? (
                <div className="text-center py-12 text-white/35 text-xs">
                  No chapters match the active filters or search terms.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSubjectChapters.map((chap) => {
                    const theme = SUBJECT_THEMES[chap.subject] || SUBJECT_THEMES.Physics;
                    const cm = masteryMap[chap.id];

                    // ── Mastery state label (from Mastery Engine if available) ──
                    const masteryState = cm?.state;
                    const masteryLabel = (() => {
                      if (masteryState === 'MASTERED')  return 'Mastered ✓';
                      if (masteryState === 'STRONG')    return 'Strong 💪';
                      if (masteryState === 'IMPROVING') return 'Improving ↗';
                      if (masteryState === 'WEAK')      return 'Needs Review ⚠';
                      if (masteryState === 'LEARNING')  return 'Building Mastery';
                      // Fallback: localStorage status (never implies mastery)
                      if (chap.status === 'in_progress') return 'In Progress';
                      if (chap.status === 'completed')   return 'Quiz Done';
                      return 'Start Lesson';
                    })();

                    // ── Progress bar: real masteryScore, else localStorage fallback ──
                    const masteryProgress = cm?.masteryScore
                      ?? (chap.status === 'completed' ? 55 : chap.status === 'in_progress' ? 20 : 0);

                    // ── Progress bar colour ──
                    const barColor =
                      masteryState === 'MASTERED'  ? 'bg-emerald-500' :
                      masteryState === 'STRONG'    ? 'bg-cyan-400' :
                      masteryState === 'IMPROVING' ? theme.progressBar :
                      masteryState === 'WEAK'      ? 'bg-amber-500' :
                      masteryState === 'LEARNING'  ? 'bg-indigo-400' :
                      chap.status === 'in_progress' ? theme.progressBar : 'bg-transparent';

                    // ── Status icon colour ──
                    const iconColor =
                      masteryState === 'MASTERED' || masteryState === 'STRONG' ? 'text-emerald-400' :
                      masteryState === 'IMPROVING' || masteryState === 'LEARNING' ? 'text-cyan-400' :
                      masteryState === 'WEAK' ? 'text-amber-400 animate-pulse' :
                      chap.status === 'in_progress' ? 'text-cyan-400 animate-pulse' :
                      'text-white/20 group-hover:text-white/40';

                    const StatusIcon =
                      masteryState === 'MASTERED' || masteryState === 'STRONG' ? CheckCircle2 :
                      masteryState === 'WEAK' ? AlertTriangle :
                      PlayCircle;

                    return (
                      <div
                        key={chap.id}
                        onClick={() => onNavigate?.(`/smart-lessons/${chap.id}`)}
                        className={cn(
                          "group relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5",
                          "bg-gradient-to-br from-[#090B13] via-[#090B13] to-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]",
                          masteryState === 'WEAK' ? 'border-amber-500/15' : '',
                          theme.glow
                        )}
                      >
                        <div>
                          {/* Upper row: subject + labels */}
                          <div className="flex items-center justify-between gap-2 mb-3.5">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "w-5 h-5 rounded-md flex items-center justify-center text-xs border leading-none shadow-sm",
                                theme.iconBg
                              )}>
                                {SUBJECT_ICONS[chap.subject]}
                              </span>
                              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-none">
                                {chap.subject}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {chap.ncertEnough === 'Yes' && (
                                <span className="text-[8px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full tracking-wide leading-none uppercase">
                                  NCERT
                                </span>
                              )}
                              <span className={cn(
                                "text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border leading-none",
                                chap.weightage === 'Very High' ? 'text-rose-400 border-rose-500/25 bg-rose-500/5' :
                                chap.weightage === 'High' ? 'text-amber-400 border-amber-500/25 bg-amber-500/5' :
                                chap.weightage === 'Medium' ? 'text-blue-400 border-blue-500/25 bg-blue-500/5' :
                                'text-white/40 border-white/10 bg-white/5'
                              )}>
                                {chap.weightage}
                              </span>
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-xs font-bold text-white/85 leading-snug mb-3 group-hover:text-cyan-300 transition-colors">
                            {chap.name}
                          </h4>

                          {/* Mastery progress bar — real masteryScore from API */}
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-3.5 mt-2">
                            <div
                              className={cn('h-full rounded-full transition-all duration-300', barColor)}
                              style={{ width: `${masteryProgress}%` }}
                            />
                          </div>
                        </div>

                        {/* Lower Row: mastery status + detail line */}
                        <div className="flex flex-col gap-1 border-t border-white/5 pt-3.5 mt-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <StatusIcon className={cn('w-3.5 h-3.5 shrink-0', iconColor)} />
                              <span className={cn(
                                'text-[10px] font-bold transition-colors',
                                masteryState === 'WEAK' ? 'text-amber-400' :
                                masteryState === 'MASTERED' || masteryState === 'STRONG' ? 'text-emerald-400' :
                                'text-white/50 group-hover:text-white/70'
                              )}>
                                {masteryLabel}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-white/35 font-semibold">
                              <Clock className="w-3.5 h-3.5 text-white/20" />
                              <span>{chap.revision}m</span>
                            </div>
                          </div>

                          {/* Mastery detail line — only shown when real SLS data exists */}
                          {cm && cm.attemptCount > 0 && (
                            <p className="text-[9px] text-white/30 leading-none pl-5">
                              Mastery {cm.masteryScore}%
                              {cm.latestAttemptAccuracy != null && ` · Latest Quiz ${Math.round(cm.latestAttemptAccuracy)}%`}
                              {` · ${cm.attemptCount} ${cm.attemptCount === 1 ? 'Attempt' : 'Attempts'}`}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* SMART SEARCH & COLLECTIONS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 rounded-2xl bg-[#0A0C16] border border-white/5 flex flex-col justify-center text-center items-center relative">
                <Target className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Syllabus Search</h3>
                <p className="text-xs text-white/50 mb-4">Find exactly what you need to study.</p>
                <div className="w-full relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics..."
                    className="w-full py-2 px-3 bg-white/5 text-white text-xs font-medium rounded-xl border border-white/10 focus:border-cyan-500/50 outline-none transition-colors"
                  />
                  
                  {/* Floating dropdown for bottom search */}
                  {searchQuery.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#0C0E1B] border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="max-h-48 overflow-y-auto divide-y divide-white/5">
                        {matchingSearchLessons.slice(0, 5).map((l) => (
                          <div
                            key={l.id}
                            onClick={() => {
                              onNavigate?.(`/smart-lessons/${l.id}`);
                              setSearchQuery('');
                            }}
                            className="p-2.5 hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors group"
                          >
                            <div className="min-w-0 pr-2">
                              <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                                {l.title}
                              </h4>
                              <p className="text-[9px] text-white/40">
                                {l.subject} · {l.weightage}
                              </p>
                            </div>
                            <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-white/60 shrink-0" />
                          </div>
                        ))}
                        {matchingSearchLessons.length === 0 && (
                          <div className="p-4 text-center text-xs text-white/40">
                            No matches found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <button onClick={() => setSearchQuery('Physics')} className="text-[10px] bg-white/5 text-white/40 px-2 py-1 rounded hover:bg-white/10 transition-colors">Physics</button>
                  <button onClick={() => setSearchQuery('Chemistry')} className="text-[10px] bg-white/5 text-white/40 px-2 py-1 rounded hover:bg-white/10 transition-colors">Chemistry</button>
                  <button onClick={() => setSearchQuery('Biology')} className="text-[10px] bg-white/5 text-white/40 px-2 py-1 rounded hover:bg-white/10 transition-colors">Biology</button>
                  <button onClick={() => setSearchQuery('Math')} className="text-[10px] bg-white/5 text-white/40 px-2 py-1 rounded hover:bg-white/10 transition-colors">Math</button>
                </div>
             </div>

             <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-4">
                   <BookOpen className="w-5 h-5 text-indigo-400" />
                   <h3 className="text-base font-display font-bold text-white">Lesson Weightage</h3>
                </div>
                <div className="space-y-2">
                   {[
                     { title: 'Very High Weightage', query: 'Very High', color: 'text-rose-400' },
                     { title: 'High Weightage', query: 'High', color: 'text-amber-400' },
                     { title: 'Medium Weightage', query: 'Medium', color: 'text-blue-400' },
                     { title: 'Easy Difficulty', query: 'Easy', color: 'text-emerald-400' },
                   ].map((item, i) => (
                     <button 
                       key={i} 
                       onClick={() => {
                         // Search weightage/difficulty by setting search query
                         setSearchQuery(item.query);
                       }}
                       className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
                     >
                       <span className="flex items-center gap-3 text-sm font-medium text-white/80 group-hover:text-white">
                         <span className={cn("w-2 h-2 rounded-full", item.color === 'text-rose-400' ? 'bg-rose-400' : item.color === 'text-amber-400' ? 'bg-amber-400' : item.color === 'text-blue-400' ? 'bg-blue-400' : 'bg-emerald-400')} /> {item.title}
                       </span>
                       <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60" />
                     </button>
                   ))}
                </div>
             </div>
          </section>

        </div>

        {/* RIGHT COLUMN: 1/3 Width */}
        <div className="space-y-6">

          {/* QUICK REVISION SECTION */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Zap className="w-24 h-24 text-amber-500" />
            </div>
            <h3 className="text-base font-display font-bold text-white mb-6 relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" /> Quick Revision
            </h3>
            
            <div className="space-y-3 relative z-10">
               {[
                 { title: '5 Minute Revision', time: '5m' },
                 { title: '10 Minute Revision', time: '10m' },
                 { title: 'Formula Sheet Review', time: 'Quick' },
                 { title: 'Revision Analytics', time: 'Deep' },
               ].map((item, i) => (
                 <button 
                   key={i} 
                   onClick={() => onNavigate?.('analytics')}
                   className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#0A0C16]/80 backdrop-blur-sm border border-amber-500/10 hover:border-amber-500/30 transition-all group"
                 >
                    <span className="font-bold text-sm text-amber-50 group-hover:text-white">{item.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80 bg-amber-500/10 px-2 py-1 rounded">{item.time}</span>
                 </button>
               ))}
               <button 
                 onClick={() => onNavigate?.('analytics')}
                 className="w-full py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold text-sm transition-colors border border-amber-500/30"
               >
                 Go to Analytics Mode
               </button>
            </div>
          </div>
          
          {/* RECOMMENDED NEXT — real SLS data */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-rose-500/10">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-rose-400" />
              <h3 className="text-base font-display font-bold text-white">Recommended Next</h3>
            </div>

            {slsLoading ? (
              <div className="space-y-2.5">
                {[1,2,3].map(i => (
                  <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : topRecs.length > 0 ? (
              <div className="space-y-2.5">
                {topRecs.map((rec) => {
                  const urgencyColor =
                    rec.urgency === 'immediate' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
                    rec.urgency === 'high'      ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' :
                    rec.urgency === 'moderate'  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                                                 'text-blue-400 bg-blue-500/10 border-blue-500/20';
                  const actionIcon =
                    rec.actionType === 'RETRY_CHAPTER_QUIZ' ? <RotateCcw className="w-3.5 h-3.5" /> :
                    rec.actionType === 'REVISE_CHAPTER'     ? <TrendingUp className="w-3.5 h-3.5" /> :
                    <PlayCircle className="w-3.5 h-3.5" />;
                  // Resolve title: API chapterTitle first, then LESSONS_DATA lookup
                  const resolvedTitle =
                    rec.chapterTitle ||
                    LESSONS_DATA.find(l => l.id === rec.chapterId)?.title ||
                    rec.chapterId;
                  // Only show accuracy when it is a real positive value
                  const hasAccuracy = rec.evidence?.accuracy != null && rec.evidence.accuracy > 0;
                  return (
                    <div
                      key={rec.id}
                      onClick={() => rec.chapterId && onNavigate?.(`/smart-lessons/${rec.chapterId}`)}
                      className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 flex items-center gap-3 cursor-pointer transition-all group hover:border-white/15"
                    >
                      <div className={cn('shrink-0 w-6 h-6 rounded-lg flex items-center justify-center border', urgencyColor)}>
                        {actionIcon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-white/90 text-xs leading-snug truncate group-hover:text-cyan-300 transition-colors">
                          {resolvedTitle}
                        </h4>
                        <p className="text-[10px] mt-0.5">
                          <span className={cn('font-bold capitalize', urgencyColor.split(' ')[0])}>{rec.urgency}</span>
                          <span className="text-white/30"> · {rec.subject}</span>
                          {hasAccuracy && (
                            <span className="text-white/30"> · {Math.round(rec.evidence!.accuracy)}% acc</span>
                          )}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-white/35 leading-relaxed">
                Complete chapter quizzes to unlock personalised recommendations.
              </p>
            )}
          </div>

          {/* REVISION QUEUE — real SLS data */}
          <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest">Revision Queue</h3>
              {topQueue.length > 0 && (
                <span className="text-[10px] font-bold text-white/30">
                  {slsData?.revision?.summary?.dueNowCount ?? 0} due now
                </span>
              )}
            </div>

            {slsLoading ? (
              <div className="space-y-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 bg-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : topQueue.length > 0 ? (
              <ul className="space-y-2.5">
                {topQueue.map((item) => {
                  const stateColor =
                    item.masteryState === 'WEAK'      ? 'text-amber-400' :
                    item.masteryState === 'MASTERED'  ? 'text-emerald-400' :
                    item.masteryState === 'STRONG'    ? 'text-cyan-400' :
                    'text-white/50';
                  return (
                    <li
                      key={item.id}
                      onClick={() => onNavigate?.(`/smart-lessons/${item.chapterId}`)}
                      className="flex items-center gap-3 text-sm cursor-pointer hover:bg-white/[0.06] rounded-xl px-2 py-1.5 -mx-2 transition-all group"
                    >
                      {item.isDue ? (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 shrink-0 bg-amber-400/20" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="font-medium text-white/80 group-hover:text-white/100 transition-colors block truncate text-xs">
                          {item.chapterTitle}
                        </span>
                        <span className={cn('text-[9px] font-bold', stateColor)}>
                          {item.masteryState}
                          {item.isDue
                            ? ' · Due now'
                            : item.daysUntilReview === 1
                            ? ' · Tomorrow'
                            : ` · ${item.daysUntilReview}d`}
                        </span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-white/15 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-white/35 leading-relaxed">
                No revision items yet. Complete chapter quizzes to build your queue.
              </p>
            )}
          </div>
          
        </div>
      </div>
      
      <Footer />
    </div>
  );
}