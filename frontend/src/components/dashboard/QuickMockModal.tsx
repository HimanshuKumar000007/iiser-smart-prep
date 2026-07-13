import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Lock, AlertTriangle, ChevronDown, Search, Atom, FlaskConical, Dna, Calculator } from 'lucide-react';
import { cn } from '../../lib/utils';

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
  onClose: () => void;
  onStartMock: (quickMockId: string, chapterTitle: string, questions: any[]) => void;
}

const API_BASE =
  (import.meta as any).env?.VITE_API_URL ??
  ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

export function QuickMockModal({ subject, onClose, onStartMock }: QuickMockModalProps) {
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
      try {
        const res = await fetch(`${API_BASE}/api/quick-mocks/catalog?subject=${encodeURIComponent(subject)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error('Failed to load Quick Mocks catalog.');
        }
        const data = await res.json();
        if (data.success) {
          setChapters(data.chapters || []);
        } else {
          throw new Error(data.error || 'Failed to load catalog');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to retrieve catalog. Please check your connection.');
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

  const selectedChapter = chapters.find(c => c.chapterId === selectedChapterId);
  const availableQuestionCount = selectedChapter?.availableQuestionCount ?? 0;
  const isChapterAvailable = availableQuestionCount >= 16;

  // Selected mock details
  const selectedMock = selectedChapter?.mocks.find(m => m.variant === selectedVariant);
  const isMockAvailable = selectedMock?.status === 'AVAILABLE';

  // Filter chapters by query
  const filteredChapters = chapters.filter(c => 
    c.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStart = async () => {
    if (!selectedChapterId || !selectedVariant || starting) return;
    setStarting(true);
    setStartError(null);
    const token = localStorage.getItem('IAT_TOKEN');
    const quickMockId = `qm_${selectedChapterId}_${String(selectedVariant).padStart(2, '0')}`;
    
    try {
      const res = await fetch(`${API_BASE}/api/quick-mock/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quickMockId })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to start Quick Mock session.');
      }
      const data = await res.json();
      if (data.success && data.questions && data.questions.length > 0) {
        onStartMock(quickMockId, selectedChapter?.chapterTitle || 'Chapter', data.questions);
      } else {
        throw new Error('No questions returned for this session.');
      }
    } catch (err: any) {
      console.error(err);
      setStartError(err.message || 'Failed to start session. Please try again.');
    } finally {
      setStarting(false);
    }
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
                      
                      return (
                        <button
                          key={chap.chapterId}
                          type="button"
                          onClick={() => {
                            setSelectedChapterId(chap.chapterId);
                            setSelectedVariant(null);
                            setDropdownOpen(false);
                            setSearchQuery('');
                          }}
                          className={cn(
                            "w-full p-2.5 rounded-lg text-left transition-colors flex flex-col gap-0.5",
                            selectedChapterId === chap.chapterId 
                              ? "bg-purple-500/25 text-purple-200" 
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span className="text-xs font-semibold leading-snug">{chap.chapterTitle}</span>
                          <span className="text-[9px] text-white/40">
                            {chap.availableQuestionCount} questions available
                            {!isAvailable && ' • More questions needed'}
                          </span>
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
                          {!isAvailable && <Lock className="w-2.5 h-2.5 text-white/10" />}
                        </div>
                        
                        <div className="text-[8px] text-white/30 font-medium">
                          16 Questions • 30 Mins
                        </div>

                        <div className="text-[8px] font-bold mt-0.5 uppercase tracking-wide">
                          {isAvailable ? (
                            <span className="text-purple-400">AVAILABLE</span>
                          ) : (
                            <span className="text-white/20">CONTENT COMING SOON</span>
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

            {/* START FAILURE ERROR */}
            {startError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] leading-normal flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{startError}</span>
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
                  "px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center min-w-[120px]",
                  selectedChapterId !== null && selectedVariant !== null && isMockAvailable && !starting
                    ? "bg-purple-500 hover:bg-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    : "bg-white/5 border border-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                {starting ? (
                  <div className="w-4 h-4 rounded-full border border-white/20 border-t-white animate-spin" />
                ) : (
                  'Start Quick Mock'
                )}
              </button>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
