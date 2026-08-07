import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { History, Target, CheckCircle2, BookOpen, Flame, AlertTriangle, ArrowRight, BarChart, Calendar, Play, Clock, Sparkles, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Footer } from '../layout/Footer';
import { LESSONS_DATA } from '../../data/lessons';
import { PYQPlayer } from './PYQPlayer';
import { PYQResults } from './PYQResults';
import { useEntitlement } from '../../hooks/useEntitlement';

interface PYQHubProps {
  onNavigate?: (view: string) => void;
  initialTab?: string;
  initialSessionId?: string;
  initialResultId?: string;
}

export function PYQHub({ onNavigate, initialTab, initialResultId, initialMockId }: PYQHubProps & { initialMockId?: string }) {
  const { isPro } = useEntitlement();
  // Main view state: 'hub' | 'player' | 'results'
  const [view, setView] = useState<'hub' | 'player' | 'results'>(
    initialTab === 'results' ? 'results' : 'hub'
  );

  const [resultId, setResultId] = useState<string | null>(initialResultId || null);

  // Configuration Modal state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configType, setConfigType] = useState<'subject' | 'chapter' | 'year' | 'recommended' | null>(null);
  const [configTarget, setConfigTarget] = useState<string | null>(null);

  // Config parameters
  const [selectedExam, setSelectedExam] = useState<'IAT' | 'NEST'>('IAT');
  const [questionCount, setQuestionCount] = useState<'10' | '15' | '25' | 'all'>('10');
  const [yearRange, setYearRange] = useState<'all' | 'recent_5'>('all');
  const [practiceMode, setPracticeMode] = useState<'Practice' | 'Timed'>('Practice');
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
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/student/pyq-summary`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve statistics.');
      }

      const data = await res.json();
      if (data.success) {
        setSummaryData(data.summary);
        setRecentSessions(data.recentSessions || []);
        setHighFreqTopics(data.highFrequencyTopics || []);
      }
    } catch (err: any) {
      console.error("PYQ summary loading error:", err);
      setError("We couldn't load your PYQ summary. Please check your connection and try again.");
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

  // Open config modal with correct lock context
  const handleOpenConfig = (type: 'subject' | 'chapter' | 'year' | 'recommended', target: string) => {
    setConfigType(type);
    setConfigTarget(target);
    setShowConfigModal(true);
  };

  // Launch a session using POST /api/pyq/session/start
  const handleLaunchSession = async () => {
    setShowConfigModal(false);
    setLoading(true);
    const token = localStorage.getItem('IAT_TOKEN');
    
    // Prepare API body based on type locks
    const body: any = {
      count: questionCount,
      yearRange,
      practiceMode,
      filter: attemptFilter,
      exam: selectedExam
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
        throw new Error('Failed to start session.');
      }

      const data = await res.json();
      if (data.success && data.questions.length > 0) {
        setPlayerData({
          questions: data.questions,
          sessionId: data.sessionId,
          mockId,
          mockTitle: title,
          practiceMode
        });
        setView('player');
      } else {
        alert(data.questions?.length === 0 ? "No matching questions exist for the selected filters." : "Failed to load session questions.");
      }
    } catch (err: any) {
      console.error("PYQ launch session error:", err);
      alert("Something went wrong. Please check your connection and try again.");
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
                                ) : (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">FREE</span>
                                )}
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-6 rounded-3xl bg-[#0A0C16] border border-white/10 shadow-2xl space-y-6"
          >
            
            {/* Header */}
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Configure Practice Session
              </h3>
              <p className="text-xs text-white/50 mt-1">Customize your session configuration parameters.</p>
            </div>

            {/* Config Fields */}
            <div className="space-y-4 text-xs">
              
              {/* Question Count */}
              <div className="space-y-2">
                <label className="text-white/60 font-bold block">Question Count</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['10', '15', '25', 'all'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setQuestionCount(c)}
                      className={cn(
                        "py-2 rounded-lg border font-semibold transition-all uppercase",
                        questionCount === c 
                          ? "bg-purple-500/20 border-purple-500 text-purple-300"
                          : "bg-black/30 border-white/5 text-white/50 hover:text-white"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              {configType !== 'year' && (
                <div className="space-y-2">
                  <label className="text-white/60 font-bold block">Year Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setYearRange('all')}
                      className={cn(
                        "py-2 rounded-lg border font-semibold transition-all",
                        yearRange === 'all' 
                          ? "bg-purple-500/20 border-purple-500 text-purple-300"
                          : "bg-black/30 border-white/5 text-white/50 hover:text-white"
                      )}
                    >
                      All Years
                    </button>
                    <button
                      onClick={() => setYearRange('recent_5')}
                      className={cn(
                        "py-2 rounded-lg border font-semibold transition-all",
                        yearRange === 'recent_5' 
                          ? "bg-purple-500/20 border-purple-500 text-purple-300"
                          : "bg-black/30 border-white/5 text-white/50 hover:text-white"
                      )}
                    >
                      Recent 5 Years
                    </button>
                  </div>
                </div>
              )}

              {/* Attempt filter */}
              <div className="space-y-2">
                <label className="text-white/60 font-bold block">Question Filter</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['all', 'unattempted', 'incorrect'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setAttemptFilter(f)}
                      className={cn(
                        "py-2 rounded-lg border font-semibold transition-all text-[10px]",
                        attemptFilter === f 
                          ? "bg-purple-500/20 border-purple-500 text-purple-300"
                          : "bg-black/30 border-white/5 text-white/50 hover:text-white"
                      )}
                    >
                      {f === 'all' ? 'All Questions' : f === 'unattempted' ? 'Unattempted' : 'Incorrect'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Practice Mode */}
              <div className="space-y-2">
                <label className="text-white/60 font-bold block">Practice Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPracticeMode('Practice')}
                    className={cn(
                      "py-2.5 rounded-lg border font-semibold transition-all flex items-center justify-center gap-1.5",
                      practiceMode === 'Practice' 
                        ? "bg-purple-500/20 border-purple-500 text-purple-300"
                        : "bg-black/30 border-white/5 text-white/50 hover:text-white"
                    )}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Practice
                  </button>
                  <button
                    onClick={() => setPracticeMode('Timed')}
                    className={cn(
                      "py-2.5 rounded-lg border font-semibold transition-all flex items-center justify-center gap-1.5",
                      practiceMode === 'Timed' 
                        ? "bg-purple-500/20 border-purple-500 text-purple-300"
                        : "bg-black/30 border-white/5 text-white/50 hover:text-white"
                    )}
                  >
                    <Clock className="w-3.5 h-3.5 text-rose-400" /> Timed Mode
                  </button>
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunchSession}
                className="px-5 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              >
                Start Practice
              </button>
            </div>

          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
