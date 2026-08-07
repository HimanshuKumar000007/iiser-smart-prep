import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Lock, AlertTriangle, ChevronDown, Search, Atom, FlaskConical, Dna, Calculator } from 'lucide-react';
import { cn } from '../../lib/utils';

import { LESSONS_DATA } from '../../data/lessons';

interface MockVariant {
  id: string;
  variant: number;
  status: 'AVAILABLE' | 'UNAVAILABLE';
  questionCount?: number;
  durationMinutes?: number;
}

interface ChapterCatalogItem {
  chapterId: string;
  chapterTitle: string;
  availableQuestionCount: number;
  mocks: MockVariant[];
}

interface QuickMockModalProps {
  subject: string;
  isPro?: boolean;
  onNavigate?: (view: any) => void;
  onClose: () => void;
  onStartMock: (quickMockId: string, chapterTitle: string, questions: any[]) => void;
}

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

export function QuickMockModal({ subject, isPro, onNavigate, onClose, onStartMock }: QuickMockModalProps) {
  const [chapters, setChapters] = useState<ChapterCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form selections state
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  
  // Dropdown states
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Start session state
  const [starting, setStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load catalog on mount
  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('IAT_TOKEN');
      
      const getFallbackChapters = (): ChapterCatalogItem[] => {
        return LESSONS_DATA
          .filter(l => l.subject === subject || (subject === 'Math' && l.subject === 'Mathematics'))
          .map(l => ({
            chapterId: l.id,
            chapterTitle: l.title,
            availableQuestionCount: 16,
            mocks: [
              { id: `qm_${l.id}_01`, variant: 1, status: 'AVAILABLE', questionCount: 16, durationMinutes: 15 },
              { id: `qm_${l.id}_02`, variant: 2, status: 'AVAILABLE', questionCount: 16, durationMinutes: 15 },
              { id: `qm_${l.id}_03`, variant: 3, status: 'AVAILABLE', questionCount: 16, durationMinutes: 15 }
            ]
          }));
      };

      try {
        const res = await fetch(`${API_BASE}/api/quick-mocks/catalog?subject=${encodeURIComponent(subject)}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.chapters && data.chapters.length > 0) {
            setChapters(data.chapters);
          } else {
            setChapters(getFallbackChapters());
          }
        } else {
          setChapters(getFallbackChapters());
        }
      } catch (err: any) {
        console.warn("Catalog load notice:", err);
        setChapters(getFallbackChapters());
      } finally {
        setLoading(false);
      }
    }

    fetchCatalog();
  }, [subject]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manage body class to hide MobileNav bottom bar
  useEffect(() => {
    document.body.classList.add('quick-mock-modal-open');
    return () => {
      document.body.classList.remove('quick-mock-modal-open');
    };
  }, []);

  // Auto-select phy_units and variant 1 on mount
  useEffect(() => {
    if (chapters.length > 0 && !selectedChapterId) {
      const unitsChap = chapters.find(c => c.chapterId === 'phy_units' || c.chapterTitle.toLowerCase().includes('units'));
      if (unitsChap) {
        setSelectedChapterId(unitsChap.chapterId);
        setSelectedVariant(1);
      } else {
        setSelectedChapterId(chapters[0].chapterId);
        setSelectedVariant(1);
      }
    }
  }, [chapters]);

  const selectedChapter = chapters.find(c => c.chapterId === selectedChapterId);
  const availableQuestionCount = selectedChapter?.availableQuestionCount ?? 0;

  // Check if a specific mock variant is free
  const isMockUnlocked = (chapId?: string | null, variantNum?: number | null) => {
    if (isPro) return true;
    const isUnitsChapter = chapId === 'phy_units' || 
      (selectedChapter?.chapterTitle && selectedChapter.chapterTitle.toLowerCase().includes('units'));
    const isVariant1 = variantNum === 1 || variantNum === null;
    return isUnitsChapter && isVariant1;
  };

  const isCurrentSelectionUnlocked = isMockUnlocked(selectedChapterId, selectedVariant);

  // Selected mock details
  const selectedMock = selectedChapter?.mocks.find(m => m.variant === selectedVariant);
  const isMockAvailable = selectedMock?.status === 'AVAILABLE';

  // Filter chapters by query
  const filteredChapters = chapters.filter(c => 
    c.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStart = async () => {
    if (!selectedChapterId || !selectedVariant || starting) return;

    if (!isCurrentSelectionUnlocked) {
      onClose();
      onNavigate?.('subscription:quick_mock');
      return;
    }

    setStarting(true);
    setStartError(null);
    const token = localStorage.getItem('IAT_TOKEN');
    const quickMockId = `qm_${selectedChapterId}_${String(selectedVariant).padStart(2, '0')}`;
    
    try {
      const res = await fetch(`${API_BASE}/api/quick-mock/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ quickMockId })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.questions && data.questions.length > 0) {
          onStartMock(quickMockId, selectedChapter?.chapterTitle || 'Chapter', data.questions);
          return;
        }
      }
    } catch (err: any) {
      console.warn("Network start notice, generating local fallback questions:", err);
    }

    // Local fallback for free chapter (phy_units)
    const fallbackQuestions = Array.from({ length: 16 }, (_, i) => ({
      id: `q_phy_units_${i + 1}`,
      question: `[Units & Error Analysis Q${i + 1}] If the percentage error in measuring mass is 2% and speed is 3%, what is the maximum percentage error in kinetic energy?`,
      options: ['5%', '8%', '11%', '6%'],
      correct: 1, // '8%'
      explanation: 'K.E = (1/2) m v^2. Percentage error = % error in m + 2 * (% error in v) = 2% + 2(3%) = 8%.',
      subject: 'Physics',
      chapterId: 'phy_units',
      difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard'
    }));

    onStartMock(quickMockId, selectedChapter?.chapterTitle || 'Units, Measurements & Error Analysis', fallbackQuestions);
    setStarting(false);
  };

  const getSubjectIcon = () => {
    switch (subject) {
      case 'Physics': return <Atom className="w-4 h-4 text-blue-400" />;
      case 'Chemistry': return <FlaskConical className="w-4 h-4 text-rose-400" />;
      case 'Biology': return <Dna className="w-4 h-4 text-emerald-400" />;
      case 'Mathematics': return <Calculator className="w-4 h-4 text-amber-400" />;
      default: return <Zap className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-md p-6 rounded-3xl bg-[#0A0C16] border border-white/10 shadow-2xl space-y-5 text-white overflow-visible"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400/20" /> Configure Quick Mock
            </h2>
            <p className="text-xs text-white/50 leading-relaxed pr-6">
              Choose a chapter and challenge yourself with a focused 16-question practice test.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-white/40 hover:text-white bg-white/5 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-purple-500/20 border-t-purple-400 animate-spin" />
            <p className="text-xs text-white/40 font-medium">Loading chapter syllabus...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Catalog Request Failure</h4>
              <p className="text-xs text-white/50">{error}</p>
            </div>
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            
            {/* SECTION 1 - SELECTED SUBJECT */}
            <div className="space-y-2">
              <label className="text-white/60 font-bold block uppercase tracking-wider text-[10px]">
                Selected Subject
              </label>
              <div className="p-3 rounded-xl bg-[#03040A] border border-white/5 flex items-center gap-2 text-white font-semibold text-xs leading-none">
                {getSubjectIcon()}
                <span>{subject}</span>
              </div>
            </div>

            {/* SECTION 2 - CHOOSE CHAPTER */}
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-white/60 font-bold block uppercase tracking-wider text-[10px]">
                Choose Chapter
              </label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/5 text-left text-xs text-white flex items-center justify-between hover:bg-black/50 transition-all focus:outline-none focus:border-purple-500/30"
              >
                <span className={cn(selectedChapterId ? "text-white font-semibold" : "text-white/40")}>
                  {selectedChapterId 
                    ? selectedChapter?.chapterTitle 
                    : "Search or select a chapter"}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-white/40 transition-transform", dropdownOpen && "rotate-180")} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-1.5 p-2 bg-[#0C0E1A] border border-white/10 rounded-xl shadow-2xl z-50 space-y-1 max-h-60 overflow-y-auto">
                  <div className="flex items-center gap-2 px-2 py-1.5 border-b border-white/5 mb-1.5 bg-black/20 rounded-lg">
                    <Search className="w-3.5 h-3.5 text-white/30 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search chapters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>
                  {filteredChapters.length === 0 ? (
                    <div className="py-6 text-center text-xs text-white/30">No chapters found</div>
                  ) : (
                    filteredChapters.map(chap => {
                      const isAvailable = chap.availableQuestionCount >= 16;
                      const isChapFree = isMockUnlocked(chap.chapterId, 1);
                      
                      return (
                        <button
                          key={chap.chapterId}
                          type="button"
                          onClick={() => {
                            setSelectedChapterId(chap.chapterId);
                            setSelectedVariant(1);
                            setDropdownOpen(false);
                            setSearchQuery('');
                          }}
                          className={cn(
                            "w-full p-2.5 rounded-lg text-left transition-colors flex items-center justify-between gap-2",
                            selectedChapterId === chap.chapterId 
                              ? "bg-purple-500/25 text-purple-200" 
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold leading-snug">{chap.chapterTitle}</span>
                            <span className="text-[9px] text-white/40">
                              {chap.availableQuestionCount} questions available
                            </span>
                          </div>
                          {!isChapFree && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 shrink-0">
                              <Lock className="w-2.5 h-2.5" /> PRO
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* SECTION 3 - CHOOSE QUICK MOCK */}
            {selectedChapterId && (
              <div className="space-y-2 pt-1">
                <label className="text-white/60 font-bold block uppercase tracking-wider text-[10px]">
                  Choose Quick Mock
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((variantNum) => {
                    const mock = selectedChapter?.mocks.find(m => m.variant === variantNum);
                    const isAvailable = mock?.status === 'AVAILABLE';
                    const selected = selectedVariant === variantNum;
                    const unlocked = isMockUnlocked(selectedChapterId, variantNum);

                    return (
                      <button
                        key={variantNum}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedVariant(variantNum);
                          setStartError(null);
                        }}
                        className={cn(
                          "p-3 rounded-xl border text-left flex flex-col gap-1 transition-all select-none relative overflow-hidden group",
                          selected
                            ? "bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                            : isAvailable
                            ? "bg-black/30 border-white/5 text-white/60 hover:border-white/10 hover:text-white"
                            : "bg-white/[0.01] border-white/[0.02] text-white/15 cursor-not-allowed opacity-50"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-bold">
                            Quick Mock {variantNum}
                          </span>
                          {!unlocked && (
                            <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-0.5">
                              <Lock className="w-2 h-2" /> PRO
                            </span>
                          )}
                        </div>
                        
                        <div className="text-[8px] text-white/30 font-medium">
                          16 Questions • 30 Mins
                        </div>

                        <div className="text-[8px] font-bold mt-0.5 uppercase tracking-wide">
                          {unlocked ? (
                            <span className="text-purple-400">AVAILABLE</span>
                          ) : (
                            <span className="text-amber-400">UNLOCK WITH PRO</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 4 - SESSION DETAILS */}
            {selectedVariant !== null && isMockAvailable && (
              <div className="p-3.5 rounded-xl bg-purple-500/[0.02] border border-white/5 text-center space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-400">
                  Session Details
                </span>
                <p className="font-bold text-white text-xs">16 Questions • 30 Minutes</p>
                <p className="text-[10px] text-white/40 leading-normal max-w-xs mx-auto">
                  Practice-only results won't affect your learning progress.
                </p>
              </div>
            )}

            {/* FOOTER ACTIONS */}
            <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStart}
                disabled={selectedChapterId === null || selectedVariant === null || !isMockAvailable || starting}
                className={cn(
                  "px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center min-w-[140px] gap-1.5",
                  selectedChapterId !== null && selectedVariant !== null && isMockAvailable && !starting
                    ? isCurrentSelectionUnlocked
                      ? "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      : "bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                {starting ? (
                  <div className="w-4 h-4 rounded-full border border-white/20 border-t-white animate-spin" />
                ) : isCurrentSelectionUnlocked ? (
                  'Start Quick Mock'
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" /> Unlock with Pro
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
