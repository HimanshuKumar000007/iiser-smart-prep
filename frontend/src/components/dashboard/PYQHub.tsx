import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History, 
  Target, 
  CheckCircle2, 
  BookOpen, 
  Flame, 
  AlertTriangle, 
  ArrowRight, 
  BarChart, 
  Calendar, 
  Play, 
  Clock, 
  Sparkles, 
  Lock,
  Zap,
  RotateCcw,
  Award,
  Filter,
  Layers,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import { LESSONS_DATA } from '../../data/lessons';
import { PYQPlayer } from './PYQPlayer';
import { PYQResults } from './PYQResults';
import { useEntitlement } from '../../hooks/useEntitlement';
import { useTheme } from '../../context/ThemeContext';

interface PYQHubProps {
  onNavigate?: (view: string) => void;
  initialTab?: string;
  initialSessionId?: string;
  initialResultId?: string;
}

export function PYQHub({ onNavigate, initialTab, initialResultId, initialMockId }: PYQHubProps & { initialMockId?: string }) {
  const { isPro } = useEntitlement();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  // Main view state: 'hub' | 'player' | 'results'
  const [view, setView] = useState<'hub' | 'player' | 'results'>(
    initialTab === 'results' ? 'results' : 'hub'
  );

  const [resultId, setResultId] = useState<string | null>(initialResultId || null);

  // Configuration Modal state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configType, setConfigType] = useState<'subject' | 'chapter' | 'year' | 'recommended' | null>(null);
  const [configTarget, setConfigTarget] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'presets' | 'custom'>('presets');

  // Goal Presets & Config parameters
  const [goalPreset, setGoalPreset] = useState<'iat_section' | 'speed_sprint' | 'rank_booster' | 'mistake_fix' | 'custom'>('iat_section');
  const [selectedExam, setSelectedExam] = useState<'IAT' | 'NEST'>('IAT');
  const [questionCount, setQuestionCount] = useState<'10' | '15' | '30' | 'all'>('15');
  const [difficulty, setDifficulty] = useState<'all' | 'foundation' | 'hard'>('all');
  const [yearRange, setYearRange] = useState<'modern' | 'all' | 'recent_5'>('modern');
  const [practiceMode, setPracticeMode] = useState<'Practice' | 'Timed'>('Timed');
  const [attemptFilter, setAttemptFilter] = useState<'all' | 'unattempted' | 'incorrect'>('all');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('');

  // Player session data
  const [playerData, setPlayerData] = useState<any | null>(null);

  // Summary statistics states
  const [summaryData, setSummaryData] = useState<any | null>(null);
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [highFreqTopics, setHighFreqTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = (import.meta as any).env?.VITE_API_URL ?? 
    ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

  // 1. Fetch PYQ summary stats
  const fetchSummary = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('IAT_TOKEN');
    if (!token) {
      setSummaryData({ questionsSolved: 0, accuracy: '0%', yearsAttempted: 0, strongestSubject: 'Not Started' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/student/pyq-summary`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSummaryData(data.summary);
          setRecentSessions(data.recentSessions || []);
          setHighFreqTopics(data.highFrequencyTopics || []);
        }
      } else {
        if (res.status === 401) {
          localStorage.removeItem('IAT_TOKEN');
        }
        setSummaryData({ questionsSolved: 0, accuracy: '0%', yearsAttempted: 0, strongestSubject: 'Not Started' });
      }
    } catch (err: any) {
      console.warn("PYQ summary loading error:", err);
      setSummaryData({ questionsSolved: 0, accuracy: '0%', yearsAttempted: 0, strongestSubject: 'Not Started' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === 'hub') {
      fetchSummary();
    }
  }, [view]);

  // Handle route params on mount
  useEffect(() => {
    if (initialTab === 'results' && initialResultId) {
      setView('results');
      setResultId(initialResultId);
    }
  }, [initialTab, initialResultId]);

  // Lock body scroll and hide bottom floating navigation dock when config modal is open
  useEffect(() => {
    if (showConfigModal) {
      document.body.classList.add('modal-open', 'pyq-modal-open');
    } else {
      document.body.classList.remove('modal-open', 'pyq-modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open', 'pyq-modal-open');
    };
  }, [showConfigModal]);

  // Smart Preset Handler
  const applyPreset = (preset: 'iat_section' | 'speed_sprint' | 'rank_booster' | 'mistake_fix' | 'custom') => {
    setGoalPreset(preset);
    if (preset === 'iat_section') {
      setQuestionCount('15');
      setPracticeMode('Timed');
      setYearRange(configType === 'year' ? 'all' : 'modern');
      setDifficulty('all');
      setAttemptFilter('all');
    } else if (preset === 'speed_sprint') {
      setQuestionCount('10');
      setPracticeMode('Practice');
      setYearRange(configType === 'year' ? 'all' : 'modern');
      setDifficulty('all');
      setAttemptFilter('all');
    } else if (preset === 'rank_booster') {
      setQuestionCount('15');
      setPracticeMode('Practice');
      setYearRange('all');
      setDifficulty('hard');
      setAttemptFilter('all');
    } else if (preset === 'mistake_fix') {
      setQuestionCount('15');
      setPracticeMode('Practice');
      setYearRange('all');
      setDifficulty('all');
      setAttemptFilter('incorrect');
    }
  };

  // Open config modal with correct lock context and student-aligned smart defaults
  const handleOpenConfig = (type: 'subject' | 'chapter' | 'year' | 'recommended', target: string) => {
    setConfigType(type);
    setConfigTarget(target);
    if (type === 'year') {
      setGoalPreset('custom');
      setYearRange('all');
      setQuestionCount('all');
      setPracticeMode('Timed');
      setDifficulty('all');
      setAttemptFilter('all');
    } else if (type === 'recommended') {
      setGoalPreset('speed_sprint');
      setQuestionCount('10');
      setPracticeMode('Practice');
      setYearRange('modern');
      setDifficulty('all');
      setAttemptFilter('all');
    } else {
      setGoalPreset('iat_section');
      setQuestionCount('15');
      setPracticeMode('Timed');
      setYearRange('modern');
      setDifficulty('all');
      setAttemptFilter('all');
    }
    setModalTab(type === 'year' ? 'custom' : 'presets');
    setShowConfigModal(true);
  };

  const getTargetTitle = () => {
    if (configType === 'subject') return `${configTarget} Section Practice`;
    if (configType === 'chapter') {
      const ch = LESSONS_DATA.find(l => l.id === configTarget);
      return ch ? `${ch.title}` : (configTarget || 'Chapter Practice');
    }
    if (configType === 'year') return `${selectedExam} ${configTarget} Official Paper`;
    return `${selectedExam} Recommended High-Yield Mix`;
  };

  const getTargetSubtitle = () => {
    if (configType === 'subject') return `Official ${selectedExam} questions across all ${configTarget} chapters`;
    if (configType === 'chapter') {
      const ch = LESSONS_DATA.find(l => l.id === configTarget);
      return `${ch?.subject || 'Subject'} Chapter Drill from past ${selectedExam} exams`;
    }
    if (configType === 'year') return `All official questions from the ${configTarget} exam`;
    return `Balanced multi-subject question mix targeting high-frequency topics`;
  };

  // Launch a session using POST /api/pyq/session/start
  const handleLaunchSession = async () => {
    setShowConfigModal(false);
    setLoading(true);
    const token = localStorage.getItem('IAT_TOKEN');
    
    // Prepare API body based on type locks and student selections
    const body: any = {
      count: questionCount,
      yearRange: configType === 'year' ? [configTarget] : yearRange,
      practiceMode,
      filter: attemptFilter,
      exam: selectedExam,
      difficulty
    };

    let title = "";
    let mockId = "";

    if (configType === 'subject') {
      body.subject = configTarget;
      title = `${configTarget} PYQ Practice`;
      mockId = `pyq_subj_${configTarget?.toLowerCase()}`;
    } else if (configType === 'chapter') {
      body.chapterId = configTarget;
      const chName = LESSONS_DATA.find(l => l.id === configTarget)?.title || configTarget;
      title = `${chName} PYQ Practice`;
      mockId = `pyq_chap_${configTarget}`;
    } else if (configType === 'year') {
      body.yearRange = [configTarget];
      title = `${selectedExam} ${configTarget} Paper`;
      mockId = `pyq_year_${selectedExam?.toLowerCase()}_${configTarget}`;
    } else {
      // Recommended Mix
      title = `${selectedExam} Recommended PYQs`;
      mockId = `pyq_recom_${selectedExam?.toLowerCase()}`;
    }

    try {
      const res = await fetch(`${API_BASE}/api/pyq/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 401) {
          alert("Your session has expired. Please login again.");
          window.location.href = '/login.html';
          return;
        }
        if (res.status === 403 || errorData.code === 'PRO_REQUIRED') {
          alert("This PYQ feature is available on the Pro plan. Please upgrade to unlock unlimited access.");
          onNavigate?.('pricing');
          return;
        }
        throw new Error(errorData.error || errorData.message || 'Failed to start session.');
      }

      const data = await res.json();
      if (data.success && data.questions && data.questions.length > 0) {
        setPlayerData({
          questions: data.questions,
          sessionId: data.sessionId,
          mockId,
          mockTitle: title,
          practiceMode
        });
        setView('player');
      } else {
        alert(data.questions?.length === 0 
          ? "No questions match this specific combination (e.g. no past incorrect attempts found yet). Try switching the filter to 'All Questions' or 'Unattempted'." 
          : "Failed to load session questions.");
      }
    } catch (err: any) {
      console.error("PYQ launch session error:", err);
      alert(err.message || "Failed to start practice session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerSubmitSuccess = (submittedResultId: string) => {
    setResultId(submittedResultId);
    setView('results');
  };

  // Mount Player View
  if (view === 'player' && playerData) {
    return (
      <PYQPlayer
        questions={playerData.questions}
        sessionId={playerData.sessionId}
        mockId={playerData.mockId}
        mockTitle={playerData.mockTitle}
        practiceMode={playerData.practiceMode}
        onNavigate={onNavigate}
        onSubmitSuccess={handlePlayerSubmitSuccess}
      />
    );
  }

  // Mount Results View
  if (view === 'results' && resultId) {
    return (
      <PYQResults
        resultId={resultId}
        onNavigate={(dest) => {
          if (dest === 'pyqs') {
            setView('hub');
            setResultId(null);
            setPlayerData(null);
          } else {
            onNavigate?.(dest);
          }
        }}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full space-y-6 flex-1 mt-2 lg:mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32 lg:pb-0">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <History className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">PYQ Hub</h1>
            <p className="text-sm text-white/50">Solve real IISER Previous Year Questions.</p>
          </div>
        </div>
      </div>

      {/* ERROR SCREEN */}
      {error && (
        <div className="p-8 rounded-3xl bg-[#0A0C16] border border-rose-500/10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Summary Loading Failed</h3>
          <p className="text-sm text-white/50 max-w-sm mx-auto">{error}</p>
          <button 
            onClick={fetchSummary}
            className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* SKELETON LOADERS */}
      {loading && !error && (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-white/5 border border-white/5 rounded-2xl" />
            ))}
          </div>
          <div className="h-44 bg-white/5 border border-white/5 rounded-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-white/5 border border-white/5 rounded-3xl" />
            <div className="h-96 bg-white/5 border border-white/5 rounded-3xl" />
          </div>
        </div>
      )}

      {/* CONTENT PANES (READY) */}
      {!loading && !error && (
        <>
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
              <p className="text-xs text-white/50 mb-1">Questions Solved</p>
              <span className="text-3xl font-display font-bold text-white">
                {summaryData?.questionsSolved || 0}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
              <p className="text-xs text-white/50 mb-1">PYQ Accuracy</p>
              <span className="text-3xl font-display font-bold text-white">
                {summaryData?.accuracy || "No Evidence"}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
              <p className="text-xs text-white/50 mb-1">Years Attempted</p>
              <span className="text-3xl font-display font-bold text-white">
                {summaryData?.yearsAttempted || 0}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 relative overflow-hidden group">
              <p className="text-xs text-white/50 mb-1">Strongest Subject</p>
              <span className="text-xl font-display font-bold text-purple-400 mt-1 block">
                {summaryData?.strongestSubject || "Not Enough Data"}
              </span>
            </div>
          </div>

            <>
              {/* MAIN HERO ACTION CONTAINER */}
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-indigo-500/5 border border-purple-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 relative z-10 w-full md:w-auto">
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold tracking-wider uppercase border border-purple-500/20 flex items-center gap-1.5 w-fit">
                    <Sparkles className="w-3 h-3 text-purple-400" /> Recommended Session
                  </span>
                  <h2 className="text-3xl font-display font-bold text-white leading-tight">
                    {selectedExam} Mixed Subject Challenge
                  </h2>
                  <p className="text-sm text-white/50 max-w-md">
                    Launch a 10-question practice mix covering key high-weightage topics dynamically optimized for your profile.
                  </p>
                  <button 
                    onClick={() => handleOpenConfig('recommended', 'Mixed')}
                    className="px-6 py-3.5 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.25)] flex items-center gap-2"
                  >
                    Launch Recommended Challenge <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Small decorative icon */}
                <div className="relative w-40 h-40 hidden md:flex items-center justify-center shrink-0">
                  <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-[40px]" />
                  <Play className="w-16 h-16 text-purple-500/30" />
                </div>
              </div>

              {/* CONTENT GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                
                {/* LEFT 2/3 COLUMN: PRACTICE MODES & CHANNELS */}
                <div className="lg:col-span-2 space-y-6 flex flex-col">
                  
                  {/* BY SUBJECT CARDS */}
                  <section className="space-y-4">
                    <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-purple-400" /> Practice By Subject
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: 'Physics', icon: '⚛', color: 'border-blue-500/20 text-blue-400 bg-blue-500/5' },
                        { name: 'Chemistry', icon: '🧪', color: 'border-rose-500/20 text-rose-400 bg-rose-500/5' },
                        { name: 'Biology', icon: '🌿', color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' },
                        { name: 'Mathematics', icon: '📐', color: 'border-amber-500/20 text-amber-400 bg-amber-500/5' }
                      ].map((subj, i) => {
                        const isSubjLocked = !isPro && i > 0;
                        return (
                          <div key={subj.name} className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center text-lg", subj.color)}>
                                {subj.icon}
                              </div>
                              <div>
                                <h4 className="font-bold text-white text-sm">{subj.name}</h4>
                                {isSubjLocked && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 mt-0.5 w-fit">
                                    <Lock className="w-2.5 h-2.5" /> PRO
                                  </span>
                                )}
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                if (isSubjLocked) {
                                  onNavigate?.('subscription:pyqs');
                                } else {
                                  handleOpenConfig('subject', subj.name);
                                }
                              }}
                              className={cn(
                                "px-3.5 py-2 rounded-xl border text-[10px] font-bold transition-all flex items-center gap-1",
                                isSubjLocked
                                  ? "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300"
                                  : "bg-white/5 hover:bg-white/10 border-white/5 text-white"
                              )}
                            >
                              {isSubjLocked ? <Lock className="w-3 h-3 text-amber-400" /> : 'Start'} {!isSubjLocked && <Play className="w-3 h-3 text-purple-400" />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* BY CHAPTER SELECT */}
                  <section className="space-y-4">
                    <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-400" /> Select Chapter PYQs
                    </h3>
                    
                    <div className="p-5 rounded-2xl bg-[#0A0C16] border border-white/5 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <select
                          id="pyq-chapter-select"
                          value={selectedChapterId}
                          onChange={(e) => setSelectedChapterId(e.target.value)}
                          className="w-full bg-[#03040A] border border-white/10 rounded-xl px-4 py-3 text-xs text-white/80 focus:border-purple-500 focus:outline-none transition-colors"
                        >
                          <option value="" disabled>-- Select a Chapter to Practice --</option>
                          {['Biology', 'Chemistry', 'Physics', 'Mathematics'].map(subj => {
                            const chapters = LESSONS_DATA.filter(l => l.subject === subj);
                            return (
                              <optgroup key={subj} label={subj} className="bg-[#0A0C16] text-white/60">
                                {chapters.map(chap => (
                                  <option key={chap.id} value={chap.id} className="text-white">
                                    {chap.title}
                                  </option>
                                ))}
                              </optgroup>
                            );
                          })}
                        </select>
                        <button
                          disabled={!selectedChapterId}
                          onClick={() => {
                            if (!isPro) {
                              onNavigate?.('subscription:pyqs');
                            } else {
                              handleOpenConfig('chapter', selectedChapterId);
                            }
                          }}
                          className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:bg-purple-500/20 disabled:text-white/40 disabled:border-purple-500/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                        >
                          Start Chapter Practice {!isPro ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* BY YEAR SELECT */}
                  <section className="space-y-4">
                    <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-400" /> Previous Year Papers
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { year: '2024', count: 60 },
                        { year: '2023', count: 60 },
                        { year: '2022', count: 60 },
                        { year: '2021', count: 60 },
                        { year: '2019', count: 60 },
                        { year: '2018', count: 60 },
                        { year: '2017', count: 60 }
                      ].map((paper, i) => {
                        const isYearLocked = !isPro && i > 0;
                        return (
                          <div key={paper.year} className="p-4 rounded-xl bg-[#0A0C16] border border-white/5 flex items-center justify-between hover:border-white/10 transition-all">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-white text-sm">{selectedExam} {paper.year}</h4>
                                {isYearLocked ? (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                    <Lock className="w-2.5 h-2.5" /> PRO
                                  </span>
                                ) : !isPro ? (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">FREE</span>
                                ) : null}
                              </div>
                              <span className="text-[10px] text-white/40 block mt-0.5">{paper.count} Questions Available</span>
                            </div>
                            <button 
                              onClick={() => {
                                if (isYearLocked) {
                                  onNavigate?.('subscription:pyqs');
                                } else {
                                  handleOpenConfig('year', paper.year);
                                }
                              }}
                              className={cn(
                                "px-3.5 py-2 rounded-xl border text-[10px] font-bold transition-colors flex items-center gap-1",
                                isYearLocked
                                  ? "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300"
                                  : "bg-white/5 hover:bg-white/10 border-white/5 text-purple-400"
                              )}
                            >
                              {isYearLocked ? <Lock className="w-3 h-3 text-amber-400" /> : null} Solve
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                </div>

                {/* RIGHT 1/3 COLUMN: SIDEBAR METADATA & RECENT SESSIONS */}
                <div className="space-y-6 flex flex-col">
                  
                  {/* HIGH-FREQUENCY PYQ TOPICS */}
                  {highFreqTopics.length > 0 && (
                    <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-4">
                      <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                        <Flame className="w-4 h-4 text-rose-500" /> High-Frequency PYQ Topics
                      </h3>
                      
                      <div className="space-y-3">
                        {highFreqTopics.map((topic, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-gradient-to-r from-rose-500/[0.02] to-transparent border border-rose-500/10 flex items-center justify-between text-xs">
                            <span className="font-semibold text-white/80 pr-2 leading-snug">{topic.chapterTitle}</span>
                            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold shrink-0">{topic.freqText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RECENT PYQ SESSIONS */}
                  <div className="p-6 rounded-3xl bg-[#0A0C16] border border-white/5 space-y-4 flex-1">
                    <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider">Recent Sessions</h3>
                    
                    {recentSessions.length === 0 ? (
                      <div className="p-8 text-center text-white/30 text-xs rounded-xl bg-black/20 border border-dashed border-white/5">
                        No recent sessions completed yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {recentSessions.map((session) => (
                          <div key={session.id} className="p-4 rounded-xl bg-[#03040A] border border-white/5 flex items-center justify-between group">
                            <div className="space-y-1">
                              <h4 className="font-bold text-white text-xs leading-snug">{session.mockTitle}</h4>
                              <div className="flex gap-2.5 text-[9px] text-white/40">
                                <span>{session.questions} Qs</span>
                                <span>{session.accuracy} Acc</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => {
                                setResultId(session.id);
                                setView('results');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-white/5 group-hover:bg-purple-500/25 group-hover:text-purple-300 text-[10px] font-bold text-white/50 transition-all"
                            >
                              Results
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </>
        </>
      )}

      {/* CONFIGURATION DIALOG / MODAL */}
      {showConfigModal && (
        <div 
          className={cn(
            "fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 overflow-y-auto transition-colors",
            isLight ? "bg-slate-900/40 backdrop-blur-sm" : "bg-black/85 backdrop-blur-md"
          )}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConfigModal(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className={cn(
              "w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-colors",
              isLight 
                ? "bg-white border border-slate-200 text-slate-900 shadow-[0_25px_60px_rgba(15,23,42,0.18)]" 
                : "bg-[#0A0C16] border border-white/10 text-white"
            )}
          >
            
            {/* 1. Header with Target Context */}
            <div className={cn(
              "p-5 border-b flex items-start justify-between gap-4 sticky top-0 z-20 transition-colors",
              isLight ? "bg-white/95 border-slate-200/90 backdrop-blur-md" : "bg-[#070810]/95 border-white/10 backdrop-blur-sm"
            )}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                    isLight ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-purple-500/10 text-purple-300 border-purple-500/20"
                  )}>
                    {selectedExam} Official PYQs
                  </span>
                  {configType === 'year' && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      isLight ? "bg-cyan-50 text-cyan-700 border-cyan-200" : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                    )}>
                      Official Paper
                    </span>
                  )}
                </div>
                <h3 className={cn(
                  "text-lg font-display font-bold tracking-tight",
                  isLight ? "text-slate-900" : "text-white"
                )}>
                  {getTargetTitle()}
                </h3>
                <p className={cn(
                  "text-xs",
                  isLight ? "text-slate-500" : "text-white/50"
                )}>
                  {getTargetSubtitle()}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className={cn(
                  "p-2 rounded-xl transition-colors shrink-0",
                  isLight 
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900" 
                    : "bg-white/5 hover:bg-white/10 text-white/50 hover:text-white"
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2. Sleek Tab Switcher */}
            <div className={cn("px-5 pt-4 transition-colors", isLight ? "bg-white" : "bg-[#0A0C16]")}>
              <div className={cn(
                "flex items-center gap-1 p-1 rounded-2xl border transition-colors",
                isLight ? "bg-slate-100 border-slate-200" : "bg-black/50 border-white/5"
              )}>
                <button
                  type="button"
                  onClick={() => setModalTab('presets')}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                    modalTab === 'presets'
                      ? isLight 
                        ? "bg-white text-purple-700 shadow-sm border border-slate-200" 
                        : "bg-purple-500/20 border border-purple-500/30 text-purple-300 shadow-sm"
                      : isLight 
                        ? "text-slate-500 hover:text-slate-900" 
                        : "text-white/40 hover:text-white"
                  )}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>1-Tap Goal Presets</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('custom')}
                  className={cn(
                    "flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                    modalTab === 'custom'
                      ? isLight 
                        ? "bg-white text-purple-700 shadow-sm border border-slate-200" 
                        : "bg-purple-500/20 border border-purple-500/30 text-purple-300 shadow-sm"
                      : isLight 
                        ? "text-slate-500 hover:text-slate-900" 
                        : "text-white/40 hover:text-white"
                  )}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Custom Controls</span>
                </button>
              </div>
            </div>

            {/* 3. Scrollable Tab Content */}
            <div className={cn(
              "p-5 overflow-y-auto flex-1 min-h-0 space-y-4 text-xs transition-colors",
              isLight ? "bg-white text-slate-800" : "bg-[#0A0C16] text-white/80"
            )}>
              
              {/* TAB 1: 1-TAP GOAL PRESETS */}
              {modalTab === 'presets' && (
                <div className="space-y-4">
                  
                  {/* 4 Goal Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Official Section Drill */}
                    <button
                      type="button"
                      onClick={() => applyPreset('iat_section')}
                      className={cn(
                        "p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 relative",
                        goalPreset === 'iat_section'
                          ? isLight
                            ? "bg-purple-50/80 border-purple-500 text-slate-900 shadow-[0_4px_16px_rgba(168,85,247,0.12)] ring-1 ring-purple-500/30"
                            : "bg-purple-500/15 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                          : isLight
                            ? "bg-slate-50/90 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800"
                            : "bg-[#03040A] border-white/5 hover:border-white/10 text-white/70 hover:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                            goalPreset === 'iat_section' 
                              ? "bg-purple-600 text-white" 
                              : isLight ? "bg-purple-100 text-purple-700" : "bg-white/5 text-purple-400"
                          )}>
                            <Award className="w-4 h-4" />
                          </div>
                          <span className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-white")}>Official Section Drill</span>
                        </div>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold border",
                          isLight ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        )}>
                          Recommended
                        </span>
                      </div>
                      <p className={cn("text-[11px] leading-snug", isLight ? "text-slate-600" : "text-white/50")}>
                        15 Qs &bull; Timed Exam Simulation &bull; Modern CBT Era (2021–2024). Exact subject test pacing.
                      </p>
                    </button>

                    {/* Speed & Concept Sprint */}
                    <button
                      type="button"
                      onClick={() => applyPreset('speed_sprint')}
                      className={cn(
                        "p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 relative",
                        goalPreset === 'speed_sprint'
                          ? isLight
                            ? "bg-amber-50/80 border-amber-500 text-slate-900 shadow-[0_4px_16px_rgba(245,158,11,0.12)] ring-1 ring-amber-500/30"
                            : "bg-amber-500/15 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                          : isLight
                            ? "bg-slate-50/90 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800"
                            : "bg-[#03040A] border-white/5 hover:border-white/10 text-white/70 hover:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                            goalPreset === 'speed_sprint' 
                              ? "bg-amber-500 text-white" 
                              : isLight ? "bg-amber-100 text-amber-700" : "bg-white/5 text-amber-400"
                          )}>
                            <Zap className="w-4 h-4" />
                          </div>
                          <span className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-white")}>Speed & Concept Sprint</span>
                        </div>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold border",
                          isLight ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        )}>
                          15 Mins
                        </span>
                      </div>
                      <p className={cn("text-[11px] leading-snug", isLight ? "text-slate-600" : "text-white/50")}>
                        10 Qs &bull; Practice & Learn &bull; Foundation & Core. Fast formula recall with instant solutions.
                      </p>
                    </button>

                    {/* Rank Booster */}
                    <button
                      type="button"
                      onClick={() => applyPreset('rank_booster')}
                      className={cn(
                        "p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 relative",
                        goalPreset === 'rank_booster'
                          ? isLight
                            ? "bg-rose-50/80 border-rose-500 text-slate-900 shadow-[0_4px_16px_rgba(244,63,94,0.12)] ring-1 ring-rose-500/30"
                            : "bg-rose-500/15 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                          : isLight
                            ? "bg-slate-50/90 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800"
                            : "bg-[#03040A] border-white/5 hover:border-white/10 text-white/70 hover:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                            goalPreset === 'rank_booster' 
                              ? "bg-rose-600 text-white" 
                              : isLight ? "bg-rose-100 text-rose-700" : "bg-white/5 text-rose-400"
                          )}>
                            <Flame className="w-4 h-4" />
                          </div>
                          <span className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-white")}>Rank Booster (AIR &lt; 100)</span>
                        </div>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold border",
                          isLight ? "bg-rose-100 text-rose-700 border-rose-200" : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                        )}>
                          Hard Only
                        </span>
                      </div>
                      <p className={cn("text-[11px] leading-snug", isLight ? "text-slate-600" : "text-white/50")}>
                        15 Qs &bull; Multi-concept problems &bull; High weightage rank deciders for top IISER cutoffs.
                      </p>
                    </button>

                    {/* Mistake Remediation */}
                    <button
                      type="button"
                      onClick={() => applyPreset('mistake_fix')}
                      className={cn(
                        "p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 relative",
                        goalPreset === 'mistake_fix'
                          ? isLight
                            ? "bg-emerald-50/80 border-emerald-500 text-slate-900 shadow-[0_4px_16px_rgba(16,185,129,0.12)] ring-1 ring-emerald-500/30"
                            : "bg-emerald-500/15 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                          : isLight
                            ? "bg-slate-50/90 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800"
                            : "bg-[#03040A] border-white/5 hover:border-white/10 text-white/70 hover:text-white"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                            goalPreset === 'mistake_fix' 
                              ? "bg-emerald-600 text-white" 
                              : isLight ? "bg-emerald-100 text-emerald-700" : "bg-white/5 text-emerald-400"
                          )}>
                            <RotateCcw className="w-4 h-4" />
                          </div>
                          <span className={cn("font-bold text-xs", isLight ? "text-slate-900" : "text-white")}>Mistake Remediation</span>
                        </div>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-bold border",
                          isLight ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        )}>
                          Error Fix
                        </span>
                      </div>
                      <p className={cn("text-[11px] leading-snug", isLight ? "text-slate-600" : "text-white/50")}>
                        Re-attempt past incorrect questions &bull; Untimed practice &bull; Stop repeating errors.
                      </p>
                    </button>
                  </div>

                  {/* Compact Quick-Tweak Bar */}
                  <div className={cn(
                    "p-3.5 rounded-2xl border space-y-3 transition-colors",
                    isLight ? "bg-slate-50/90 border-slate-200" : "bg-[#03040A] border-white/5"
                  )}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className={cn(
                        "text-[11px] font-bold uppercase tracking-wider",
                        isLight ? "text-slate-500" : "text-white/50"
                      )}>
                        Quick Adjustments
                      </span>
                      <button
                        type="button"
                        onClick={() => setModalTab('custom')}
                        className={cn(
                          "text-[11px] font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto",
                          isLight ? "text-purple-600 hover:text-purple-700" : "text-purple-400 hover:text-purple-300"
                        )}
                      >
                        Advanced filters & year era &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Question Count */}
                      <div className="space-y-1.5">
                        <label className={cn("text-[10px] font-semibold block", isLight ? "text-slate-500" : "text-white/40")}>Questions</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { id: '10', label: '10 Qs' },
                            { id: '15', label: '15 Qs' },
                            { id: '30', label: '30 Qs' },
                            { id: 'all', label: 'ALL' }
                          ].map(c => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => {
                                setQuestionCount(c.id as any);
                                setGoalPreset('custom');
                              }}
                              className={cn(
                                "py-1.5 rounded-lg border font-bold text-xs transition-all text-center",
                                questionCount === c.id
                                  ? isLight
                                    ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                                    : "bg-purple-500/25 border-purple-500 text-purple-200"
                                  : isLight
                                    ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                    : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                              )}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mode */}
                      <div className="space-y-1.5">
                        <label className={cn("text-[10px] font-semibold block", isLight ? "text-slate-500" : "text-white/40")}>Mode</label>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setPracticeMode('Practice');
                              setGoalPreset('custom');
                            }}
                            className={cn(
                              "py-1.5 px-2 rounded-lg border font-semibold text-xs transition-all flex items-center justify-center gap-1",
                              practiceMode === 'Practice'
                                ? isLight
                                  ? "bg-purple-600 border-purple-600 text-white shadow-sm"
                                  : "bg-purple-500/25 border-purple-500 text-purple-200"
                                : isLight
                                  ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                  : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                            )}
                          >
                            <BookOpen className="w-3 h-3" /> Practice
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPracticeMode('Timed');
                              setGoalPreset('custom');
                            }}
                            className={cn(
                              "py-1.5 px-2 rounded-lg border font-semibold text-xs transition-all flex items-center justify-center gap-1",
                              practiceMode === 'Timed'
                                ? isLight
                                  ? "bg-rose-600 border-rose-600 text-white shadow-sm"
                                  : "bg-rose-500/25 border-rose-500 text-rose-200"
                                : isLight
                                  ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                  : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                            )}
                          >
                            <Clock className="w-3 h-3" /> Timed (+4/-1)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: GRANULAR CUSTOM SETUP */}
              {modalTab === 'custom' && (
                <div className="space-y-3.5">
                  
                  {/* 1. Question Count */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={cn("font-bold block text-xs", isLight ? "text-slate-800" : "text-white/60")}>Question Count</label>
                      <span className={cn("text-[10px] font-semibold", isLight ? "text-purple-600" : "text-purple-400")}>15 Qs is official IAT section</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: '10', label: '10 Qs', sub: '15 min sprint' },
                        { id: '15', label: '15 Qs', sub: 'Official section' },
                        { id: '30', label: '30 Qs', sub: 'Double block' },
                        { id: 'all', label: 'ALL', sub: 'Full bank' }
                      ].map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setQuestionCount(c.id as any);
                            setGoalPreset('custom');
                          }}
                          className={cn(
                            "p-2 rounded-xl border font-bold transition-all text-center flex flex-col items-center",
                            questionCount === c.id
                              ? isLight
                                ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm"
                                : "bg-purple-500/20 border-purple-500 text-purple-200"
                              : isLight
                                ? "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          <span className="text-xs">{c.label}</span>
                          <span className={cn("text-[9px] font-normal", isLight ? "text-slate-500" : "text-white/40")}>{c.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Difficulty */}
                  <div className="space-y-1.5">
                    <label className={cn("font-bold block text-xs", isLight ? "text-slate-800" : "text-white/60")}>Difficulty Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'all', label: 'Real Exam Mix', sub: 'Easy, Med & Hard' },
                        { id: 'foundation', label: 'Foundation & Core', sub: 'Easy & Medium' },
                        { id: 'hard', label: 'Rank Deciders', sub: 'Hard only' }
                      ].map(d => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setDifficulty(d.id as any);
                            setGoalPreset('custom');
                          }}
                          className={cn(
                            "p-2 rounded-xl border text-center transition-all flex flex-col items-center",
                            difficulty === d.id
                              ? isLight
                                ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm"
                                : "bg-purple-500/20 border-purple-500 text-purple-200"
                              : isLight
                                ? "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          <span className="text-xs font-bold">{d.label}</span>
                          <span className={cn("text-[9px] font-normal", isLight ? "text-slate-500" : "text-white/40")}>{d.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Session Mode */}
                  <div className="space-y-1.5">
                    <label className={cn("font-bold block text-xs", isLight ? "text-slate-800" : "text-white/60")}>Practice Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPracticeMode('Practice');
                          setGoalPreset('custom');
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center gap-2",
                          practiceMode === 'Practice'
                            ? isLight
                              ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm"
                              : "bg-purple-500/20 border-purple-500 text-purple-200"
                            : isLight
                              ? "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                              : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                        )}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                        <span>Practice & Learn (Untimed)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPracticeMode('Timed');
                          setGoalPreset('custom');
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center gap-2",
                          practiceMode === 'Timed'
                            ? isLight
                              ? "bg-rose-50 border-rose-500 text-rose-900 shadow-sm"
                              : "bg-rose-500/20 border-rose-500 text-rose-200"
                            : isLight
                              ? "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                              : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                        )}
                      >
                        <Clock className="w-3.5 h-3.5 text-rose-500" />
                        <span>Timed Exam (+4 / -1)</span>
                      </button>
                    </div>
                  </div>

                  {/* 4. Year Range (if not year paper) */}
                  {configType !== 'year' && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className={cn("font-bold block text-xs", isLight ? "text-slate-800" : "text-white/60")}>Exam Era</label>
                        <span className={cn("text-[10px] font-semibold", isLight ? "text-cyan-600" : "text-cyan-400")}>2021+ is modern online CBT</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setYearRange('modern');
                            setGoalPreset('custom');
                          }}
                          className={cn(
                            "p-2 rounded-xl border text-center transition-all flex flex-col items-center",
                            yearRange === 'modern'
                              ? isLight
                                ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm"
                                : "bg-purple-500/20 border-purple-500 text-purple-200"
                              : isLight
                                ? "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          <span className="text-xs font-bold">Modern CBT (2021–2024)</span>
                          <span className={cn("text-[9px] font-normal", isLight ? "text-slate-500" : "text-white/40")}>Current online pattern</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setYearRange('all');
                            setGoalPreset('custom');
                          }}
                          className={cn(
                            "p-2 rounded-xl border text-center transition-all flex flex-col items-center",
                            yearRange === 'all'
                              ? isLight
                                ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm"
                                : "bg-purple-500/20 border-purple-500 text-purple-200"
                              : isLight
                                ? "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          <span className="text-xs font-bold">All Years (2017–2024)</span>
                          <span className={cn("text-[9px] font-normal", isLight ? "text-slate-500" : "text-white/40")}>All 420 questions</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 5. Question Filter */}
                  <div className="space-y-1.5">
                    <label className={cn("font-bold block text-xs", isLight ? "text-slate-800" : "text-white/60")}>Question Filter</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'all', label: 'All Questions', sub: 'Standard mix' },
                        { id: 'unattempted', label: 'Unattempted Only', sub: 'No recall bias' },
                        { id: 'incorrect', label: 'Past Mistakes', sub: 'Revise errors' }
                      ].map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => {
                            setAttemptFilter(f.id as any);
                            setGoalPreset('custom');
                          }}
                          className={cn(
                            "p-2 rounded-xl border text-center transition-all flex flex-col items-center",
                            attemptFilter === f.id
                              ? isLight
                                ? "bg-purple-50 border-purple-500 text-purple-900 shadow-sm"
                                : "bg-purple-500/20 border-purple-500 text-purple-200"
                              : isLight
                                ? "bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                : "bg-white/5 border-white/5 text-white/50 hover:text-white"
                          )}
                        >
                          <span className="text-xs font-bold">{f.label}</span>
                          <span className={cn("text-[9px] font-normal", isLight ? "text-slate-500" : "text-white/40")}>{f.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* 4. Sticky Modal Footer: Live Blueprint & Action Buttons */}
            <div className={cn(
              "p-4 sm:p-5 border-t space-y-3 sticky bottom-0 z-20 transition-colors",
              isLight ? "bg-white/95 border-slate-200/90 backdrop-blur-md" : "bg-[#070810]/95 border-white/10 backdrop-blur-md"
            )}>
              {/* Live Blueprint Summary Bar */}
              <div className={cn(
                "p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-[11px] transition-colors",
                isLight ? "bg-slate-50 border-slate-200/90" : "bg-white/[0.03] border-white/5"
              )}>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={cn("font-semibold", isLight ? "text-slate-500" : "text-white/40")}>Blueprint:</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold border",
                    isLight ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-purple-500/20 text-purple-300 border-purple-500/20"
                  )}>
                    {questionCount === 'all' ? 'All Questions' : `${questionCount} Qs`}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded font-semibold border",
                    isLight ? "bg-slate-200/80 text-slate-700 border-slate-300" : "bg-white/5 text-white/70 border-white/10"
                  )}>
                    {difficulty === 'all' ? 'Exam Mix' : difficulty === 'hard' ? 'Hard Only' : 'Foundation'}
                  </span>
                  {configType !== 'year' && (
                    <span className={cn(
                      "px-2 py-0.5 rounded font-semibold border",
                      isLight ? "bg-slate-200/80 text-slate-700 border-slate-300" : "bg-white/5 text-white/70 border-white/10"
                    )}>
                      {yearRange === 'modern' ? '2021–2024' : '2017–2024'}
                    </span>
                  )}
                  <span className={cn(
                    "px-2 py-0.5 rounded font-bold border",
                    practiceMode === 'Timed' 
                      ? isLight ? "bg-rose-100 text-rose-800 border-rose-200" : "bg-rose-500/10 text-rose-300 border-rose-500/20" 
                      : isLight ? "bg-purple-100 text-purple-800 border-purple-200" : "bg-purple-500/10 text-purple-300 border-purple-500/20"
                  )}>
                    {practiceMode === 'Timed' ? '⏱️ Timed (+4/-1)' : '📖 Practice'}
                  </span>
                </div>

                <span className={cn("text-[10px] hidden sm:inline", isLight ? "text-slate-500" : "text-white/40")}>
                  {goalPreset === 'custom' ? '⚙️ Custom' : '🎯 Preset'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                    isLight ? "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900" : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLaunchSession}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2"
                >
                  <span>Start Practice Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
