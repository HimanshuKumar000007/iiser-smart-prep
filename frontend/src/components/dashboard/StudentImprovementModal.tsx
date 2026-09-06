import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  Send,
  Flame,
  TrendingUp,
  HelpCircle,
  Target,
  BookOpen,
  Clock,
  BrainCircuit,
  BarChart3,
  Smartphone,
  Check,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { Analytics } from '../../lib/analytics';

interface StudentImprovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFullFeedback?: () => void;
  userName?: string;
  userEmail?: string;
}

interface ImprovementOption {
  id: string;
  label: string;
  desc: string;
  badge: string;
  icon: React.ElementType;
}

const IMPROVEMENT_OPTIONS: ImprovementOption[] = [
  {
    id: 'full_mocks',
    label: 'More Full-Length TCS iON Mocks',
    desc: 'Exact IISER 2026/27 exam pattern tests with rank percentiles',
    badge: 'Popular',
    icon: Target
  },
  {
    id: 'formula_sheets',
    label: 'Formula Sheets & Mind Maps',
    desc: 'High-yield revision sheets for Physics, Chem & Math',
    badge: 'High Yield',
    icon: BookOpen
  },
  {
    id: 'speed_drills',
    label: 'Speed & Accuracy Drills',
    desc: 'Timed 15-minute quick fire practice by chapter',
    badge: 'Daily',
    icon: Clock
  },
  {
    id: 'ai_tutor',
    label: 'AI Step-by-Step Doubt Solver',
    desc: 'Audio & conversational hints for tough numerical problems',
    badge: 'AI Active',
    icon: BrainCircuit
  },
  {
    id: 'rank_predictor',
    label: 'Cutoff & Rank Predictor',
    desc: 'Category-wise cutoffs for Pune, Kolkata, Mohali, Bhopal',
    badge: 'Real Data',
    icon: BarChart3
  },
  {
    id: 'mobile_app',
    label: 'Mobile App / Offline Mode',
    desc: 'Practice without internet connection and sync progress',
    badge: 'Offline',
    icon: Smartphone
  }
];

const CONFIDENCE_OPTIONS = [
  {
    id: 'on_track',
    label: 'Aiming Top 500',
    subtitle: 'Confidently on track',
    icon: Flame,
    color: 'text-amber-400',
    accentBg: 'from-amber-500/15 to-orange-500/5',
    activeBorder: 'border-amber-500/60 ring-amber-500/40 text-amber-300'
  },
  {
    id: 'improving',
    label: 'Steadily Improving',
    subtitle: 'Making daily progress',
    icon: TrendingUp,
    color: 'text-emerald-400',
    accentBg: 'from-emerald-500/15 to-teal-500/5',
    activeBorder: 'border-emerald-500/60 ring-emerald-500/40 text-emerald-300'
  },
  {
    id: 'need_help',
    label: 'Need Practice',
    subtitle: 'Targeting weak topics',
    icon: HelpCircle,
    color: 'text-cyan-400',
    accentBg: 'from-cyan-500/15 to-indigo-500/5',
    activeBorder: 'border-cyan-500/60 ring-cyan-500/40 text-cyan-300'
  }
];

const SUGGESTED_CHIPS = [
  'More Organic Chemistry mechanisms',
  'Previous 10-year video solutions',
  'Harder numericals for Physics',
  'NCERT Biology diagram quizzes'
];

export function StudentImprovementModal({
  isOpen,
  onClose,
  onOpenFullFeedback,
  userName = 'Aspirant',
  userEmail = ''
}: StudentImprovementModalProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedConfidence, setSelectedConfidence] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Format display name cleanly (e.g. ankit003ssssssss690 -> Ankit)
  const formatName = (raw: string) => {
    if (!raw || raw === 'Aspirant') return 'Aspirant';
    const clean = raw.includes('@') ? raw.split('@')[0] : raw;
    const match = clean.match(/^[a-zA-Z]+/);
    const candidate = match ? match[0] : clean.slice(0, 12);
    return candidate.charAt(0).toUpperCase() + candidate.slice(1);
  };

  const displayName = formatName(userName);

  const togglePriority = (id: string) => {
    setSelectedPriorities(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // keep max 3
      }
      return [...prev, id];
    });
  };

  const handleAppendSuggestion = (suggestion: string) => {
    if (!notes.trim()) {
      setNotes(suggestion);
    } else if (!notes.includes(suggestion)) {
      setNotes(prev => `${prev.trim()}, ${suggestion}`);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('smartprep_improvement_feedback_v1', 'dismissed');
    localStorage.setItem('smartprep_feedback_shown_v2', 'true');
    const email = userEmail || localStorage.getItem('currentUserEmail') || '';
    if (email) localStorage.setItem(`smartprep_feedback_shown_v2_${email}`, 'true');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPriorities.length === 0 && !notes.trim() && !selectedConfidence) {
      handleDismiss();
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem('IAT_TOKEN');
    const API_BASE =
      (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    const priorityLabels = selectedPriorities.map(
      id => IMPROVEMENT_OPTIONS.find(opt => opt.id === id)?.label || id
    );

    const confidenceLabel =
      CONFIDENCE_OPTIONS.find(opt => opt.id === selectedConfidence)?.label || selectedConfidence;

    try {
      await fetch(`${API_BASE}/api/user-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          priorities: priorityLabels,
          confidence: confidenceLabel,
          notes: notes.trim()
        })
      });

      // Track Mixpanel event
      try {
        Analytics.track('Submitted Improvement Wishlist', {
          priorities: priorityLabels,
          confidence: confidenceLabel,
          has_notes: Boolean(notes.trim())
        });
      } catch (_) {}

      const email = userEmail || localStorage.getItem('currentUserEmail') || '';
      localStorage.setItem('smartprep_improvement_feedback_v1', 'submitted');
      localStorage.setItem('smartprep_feedback_shown_v2', 'true');
      if (email) localStorage.setItem(`smartprep_feedback_shown_v2_${email}`, 'true');
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.warn('Feedback submission error:', err);
      const email = userEmail || localStorage.getItem('currentUserEmail') || '';
      localStorage.setItem('smartprep_improvement_feedback_v1', 'submitted');
      localStorage.setItem('smartprep_feedback_shown_v2', 'true');
      if (email) localStorage.setItem(`smartprep_feedback_shown_v2_${email}`, 'true');
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1800);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      {/* Outer Glow Container with Gradient Border */}
      <div
        className={cn(
          'relative w-full max-w-xl rounded-2xl p-[1px] shadow-2xl transition-all',
          isLight
            ? 'bg-gradient-to-b from-indigo-200/80 via-slate-200 to-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.15)]'
            : 'bg-gradient-to-b from-cyan-500/30 via-indigo-500/20 to-purple-500/10 shadow-[0_0_60px_rgba(79,70,229,0.22)]'
        )}
      >
        <div
          className={cn(
            'relative w-full rounded-[15px] overflow-hidden transition-all',
            isLight
              ? 'bg-white/95 backdrop-blur-xl text-slate-900'
              : 'bg-[#0b0f19]/95 backdrop-blur-2xl text-white'
          )}
        >
          {/* Subtle Ambient Top Radial Glow */}
          <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className={cn(
              'absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer',
              isLight
                ? 'text-slate-400 hover:text-slate-800 bg-slate-100/80 hover:bg-slate-200 border border-slate-200/80'
                : 'text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
            )}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {isSubmitted ? (
            /* Success Feedback State */
            <div className="p-8 sm:p-10 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 blur-md opacity-40 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Thank You, {displayName}! 🎯
                </h3>
                <p className={cn('text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed', isLight ? 'text-slate-600' : 'text-slate-400')}>
                  Your priorities have been added directly to our engineering roadmap. We are building these into the upcoming SmartPrep updates!
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                <span>Saving your preferences...</span>
              </div>
            </div>
          ) : (
            /* Interactive Form State */
            <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 border border-cyan-500/20 text-cyan-400 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Quick 10-Second Wishlist
                  </span>
                  <span className={cn('text-[11px] font-medium', isLight ? 'text-slate-400' : 'text-white/40')}>
                    • IISER IAT 2027
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  <span>Help us shape SmartPrep for you</span>
                  <span className="inline-block animate-bounce">🚀</span>
                </h2>
                <p className={cn('text-xs sm:text-sm mt-1 leading-relaxed', isLight ? 'text-slate-600' : 'text-slate-400')}>
                  Hi <span className="font-bold text-foreground">{displayName}</span>! Pick what would elevate your preparation the most:
                </p>
              </div>

              {/* Priority Cards Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className={cn('text-[11px] font-bold uppercase tracking-wider', isLight ? 'text-slate-500' : 'text-slate-400')}>
                    Pick up to 3 priority features:
                  </label>
                  <span className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                    selectedPriorities.length > 0
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      : isLight ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-white/5 border-white/10 text-white/40'
                  )}>
                    {selectedPriorities.length}/3 selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {IMPROVEMENT_OPTIONS.map(opt => {
                    const Icon = opt.icon;
                    const isSelected = selectedPriorities.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => togglePriority(opt.id)}
                        className={cn(
                          'relative flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-200 group cursor-pointer',
                          isSelected
                            ? isLight
                              ? 'bg-indigo-50/90 border-indigo-500 shadow-sm ring-1 ring-indigo-500/40 text-indigo-950'
                              : 'bg-gradient-to-r from-indigo-950/80 to-cyan-950/70 border-cyan-500/60 ring-1 ring-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.12)] text-white'
                            : isLight
                              ? 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                              : 'bg-slate-900/60 border-white/[0.07] text-slate-300 hover:bg-slate-800/80 hover:border-white/15'
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div
                            className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all',
                              isSelected
                                ? 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/25'
                                : isLight
                                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-100'
                                  : 'bg-white/5 text-slate-400 border border-white/10 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={cn('text-xs font-bold leading-tight truncate', isSelected ? (isLight ? 'text-indigo-900' : 'text-white') : '')}>
                                {opt.label}
                              </span>
                            </div>
                            <span className={cn('text-[10px] block truncate', isLight ? 'text-slate-500' : 'text-slate-400')}>
                              {opt.desc}
                            </span>
                          </div>
                        </div>

                        {/* Checkbox badge */}
                        <div
                          className={cn(
                            'w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all border',
                            isSelected
                              ? 'bg-cyan-500 border-cyan-500 text-slate-950 font-bold'
                              : isLight
                                ? 'border-slate-300 group-hover:border-slate-400 bg-white'
                                : 'border-white/15 group-hover:border-white/30 bg-white/5'
                          )}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Confidence Sentiment Radio Section */}
              <div className="space-y-2">
                <label className={cn('text-[11px] font-bold uppercase tracking-wider', isLight ? 'text-slate-500' : 'text-slate-400')}>
                  How is your IAT preparation feeling so far?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CONFIDENCE_OPTIONS.map(opt => {
                    const Icon = opt.icon;
                    const isSelected = selectedConfidence === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setSelectedConfidence(isSelected ? '' : opt.id)}
                        className={cn(
                          'flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all duration-200 cursor-pointer group',
                          isSelected
                            ? isLight
                              ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/30 shadow-sm'
                              : cn('bg-gradient-to-b border ring-1 shadow-md', opt.accentBg, opt.activeBorder)
                            : isLight
                              ? 'bg-slate-50/80 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                              : 'bg-slate-900/60 border-white/[0.07] text-slate-400 hover:bg-slate-800/80 hover:border-white/15'
                        )}
                      >
                        <div className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110',
                          isSelected ? (isLight ? 'bg-indigo-100' : 'bg-white/10') : 'bg-transparent'
                        )}>
                          <Icon className={cn('w-4 h-4', opt.color)} />
                        </div>
                        <span className={cn('text-[11px] font-bold leading-tight', isSelected ? (isLight ? 'text-indigo-950' : 'text-white') : '')}>
                          {opt.label}
                        </span>
                        <span className={cn('text-[9.5px] mt-0.5 leading-tight', isLight ? 'text-slate-400' : 'text-slate-500')}>
                          {opt.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Wish/Note with 1-Click Suggestion Chips */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={cn('text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5', isLight ? 'text-slate-500' : 'text-slate-400')}>
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>Anything specific you wish SmartPrep had? (Optional)</span>
                  </label>
                  <span className={cn('text-[10px] font-medium font-mono', isLight ? 'text-slate-400' : 'text-white/30')}>
                    {notes.length}/300
                  </span>
                </div>

                {/* Quick 1-click suggestion pills */}
                <div className="flex items-center gap-1.5 flex-wrap pb-0.5">
                  {SUGGESTED_CHIPS.map(chip => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleAppendSuggestion(chip)}
                      className={cn(
                        'text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer truncate max-w-[200px]',
                        isLight
                          ? 'bg-slate-100 hover:bg-indigo-50 border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600'
                          : 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300'
                      )}
                    >
                      + {chip}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="e.g. Can you add more organic chemistry reaction mechanisms or previous year video solutions?"
                    rows={2}
                    maxLength={300}
                    className={cn(
                      'w-full text-xs sm:text-sm p-3 rounded-xl border outline-none resize-none transition-all duration-200',
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20'
                        : 'bg-slate-900/80 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-500/60 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-500/20'
                    )}
                  />
                </div>
              </div>

              {/* Action Footer Buttons */}
              <div className="flex items-center justify-between pt-1 gap-3">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className={cn(
                    'text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer',
                    isLight
                      ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  Skip for now
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50',
                    'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500',
                    'shadow-[0_0_25px_rgba(79,70,229,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] active:scale-95'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit & Continue</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Secondary Navigation to Full Form */}
              {onOpenFullFeedback && (
                <div className="pt-2 border-t border-white/[0.06] text-center">
                  <button
                    type="button"
                    onClick={() => {
                      handleDismiss();
                      onOpenFullFeedback();
                    }}
                    className={cn(
                      'text-[11px] font-medium transition-colors inline-flex items-center gap-1 cursor-pointer',
                      isLight ? 'text-slate-500 hover:text-indigo-600' : 'text-slate-400 hover:text-cyan-300'
                    )}
                  >
                    <span>Need to report a bug or write comprehensive feedback? Open full form</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
