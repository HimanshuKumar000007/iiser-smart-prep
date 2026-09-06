import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
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
  CornerDownLeft
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
  title: string;
  desc: string;
  icon: React.ElementType;
}

const IMPROVEMENT_OPTIONS: ImprovementOption[] = [
  {
    id: 'full_mocks',
    title: 'Full-Length TCS iON Mocks',
    desc: 'Official format 60-question tests with all-India percentile',
    icon: Target
  },
  {
    id: 'formula_sheets',
    title: 'Formula Sheets & Mind Maps',
    desc: 'High-yield formula cheat sheets for Physics, Chem & Math',
    icon: BookOpen
  },
  {
    id: 'speed_drills',
    title: 'Speed & Accuracy Drills',
    desc: 'Timed 15-minute micro-tests targeting chapter speed',
    icon: Clock
  },
  {
    id: 'ai_tutor',
    title: 'AI Step-by-Step Doubt Solver',
    desc: 'Audio & conversational hints for tough numerical problems',
    icon: BrainCircuit
  },
  {
    id: 'rank_predictor',
    title: 'IISER Cutoff & Rank Predictor',
    desc: 'Category-wise cutoffs for Pune, Kolkata, Mohali, Bhopal',
    icon: BarChart3
  },
  {
    id: 'mobile_app',
    title: 'Mobile App / Offline Mode',
    desc: 'Offline question bank practice without internet access',
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
    dotColor: 'bg-amber-400'
  },
  {
    id: 'improving',
    label: 'Steadily Improving',
    subtitle: 'Making daily progress',
    icon: TrendingUp,
    color: 'text-emerald-400',
    dotColor: 'bg-emerald-400'
  },
  {
    id: 'need_help',
    label: 'Need More Practice',
    subtitle: 'Targeting weak areas',
    icon: HelpCircle,
    color: 'text-sky-400',
    dotColor: 'bg-sky-400'
  }
];

const SUGGESTED_TAGS = [
  'Organic Chemistry mechanisms',
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Clean display name
  const formatName = (raw: string) => {
    if (!raw || raw === 'Aspirant') return 'Aspirant';
    const clean = raw.includes('@') ? raw.split('@')[0] : raw;
    const match = clean.match(/^[a-zA-Z]+/);
    const candidate = match ? match[0] : clean.slice(0, 12);
    return candidate.charAt(0).toUpperCase() + candidate.slice(1);
  };

  const displayName = formatName(userName);

  // Reset states when opening
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePriority = (id: string) => {
    setSelectedPriorities(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // Max 3 items
      }
      return [...prev, id];
    });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleDismiss = () => {
    localStorage.setItem('smartprep_improvement_feedback_v1', 'dismissed');
    localStorage.setItem('smartprep_feedback_shown_v2', 'true');
    const email = userEmail || localStorage.getItem('currentUserEmail') || '';
    if (email) localStorage.setItem(`smartprep_feedback_shown_v2_${email}`, 'true');
    onClose();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (selectedPriorities.length === 0 && !notes.trim() && !selectedConfidence && selectedTags.length === 0) {
      handleDismiss();
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem('IAT_TOKEN');
    const API_BASE =
      (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    const priorityLabels = selectedPriorities.map(
      id => IMPROVEMENT_OPTIONS.find(opt => opt.id === id)?.title || id
    );

    const confidenceLabel =
      CONFIDENCE_OPTIONS.find(opt => opt.id === selectedConfidence)?.label || selectedConfidence;

    // Combine tags and notes cleanly
    let compiledNotes = notes.trim();
    if (selectedTags.length > 0) {
      const tagsHeader = `[Requested Additions: ${selectedTags.join(', ')}]`;
      compiledNotes = compiledNotes ? `${tagsHeader}\n\n${compiledNotes}` : tagsHeader;
    }

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
          notes: compiledNotes
        })
      });

      try {
        Analytics.track('Submitted Improvement Wishlist', {
          priorities: priorityLabels,
          confidence: confidenceLabel,
          tags: selectedTags,
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
      }, 1500);
    } catch (err) {
      console.warn('Feedback submission error:', err);
      const email = userEmail || localStorage.getItem('currentUserEmail') || '';
      localStorage.setItem('smartprep_improvement_feedback_v1', 'submitted');
      localStorage.setItem('smartprep_feedback_shown_v2', 'true');
      if (email) localStorage.setItem(`smartprep_feedback_shown_v2_${email}`, 'true');
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      {/* Vercel Dialog Frame */}
      <div
        className={cn(
          'relative w-full max-w-2xl rounded-xl border transition-all',
          isLight
            ? 'bg-white border-neutral-200 text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.12)]'
            : 'bg-[#0a0a0a] border-[#222222] text-[#EDEDED] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_54px_rgba(0,0,0,0.9)]'
        )}
      >
        {/* Header Bar */}
        <div className={cn(
          'flex items-center justify-between px-6 py-4 border-b',
          isLight ? 'border-neutral-100' : 'border-[#1a1a1a]'
        )}>
          <div className="flex items-center gap-2.5">
            <div className={cn(
              'w-2 h-2 rounded-full',
              isLight ? 'bg-neutral-900' : 'bg-white'
            )} />
            <span className={cn(
              'text-xs font-mono font-medium tracking-tight uppercase',
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            )}>
              Feedback / Wishlist
            </span>
            <span className={cn('text-xs', isLight ? 'text-neutral-300' : 'text-neutral-700')}>/</span>
            <span className={cn('text-xs font-mono', isLight ? 'text-neutral-400' : 'text-neutral-500')}>
              IISER IAT 2027
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={cn(
              'hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border',
              isLight ? 'border-neutral-200 text-neutral-400 bg-neutral-50' : 'border-[#262626] text-neutral-500 bg-[#111111]'
            )}>
              ESC
            </span>
            <button
              onClick={handleDismiss}
              className={cn(
                'p-1.5 rounded-md transition-colors cursor-pointer',
                isLight
                  ? 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
                  : 'text-neutral-400 hover:text-white hover:bg-[#1a1a1a]'
              )}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isSubmitted ? (
          /* Vercel Clean Success State */
          <div className="p-10 text-center space-y-3">
            <div className={cn(
              'w-12 h-12 rounded-full mx-auto flex items-center justify-center border',
              isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-900' : 'bg-[#141414] border-[#2a2a2a] text-white'
            )}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">
              Feedback received. Thank you, {displayName}.
            </h3>
            <p className={cn('text-xs max-w-sm mx-auto leading-relaxed', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
              Your requested priorities have been added directly to our product roadmap.
            </p>
          </div>
        ) : (
          /* Main Vercel Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title & Introduction */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                What should we build next on SmartPrep?
              </h2>
              <p className={cn('text-xs mt-1 leading-relaxed', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
                Hi <span className={isLight ? 'text-neutral-900 font-semibold' : 'text-white font-semibold'}>{displayName}</span>, select up to 3 features you'd like us to prioritize for your IISER exam preparation.
              </p>
            </div>

            {/* Feature Cards Grid (Roomy 2-column layout, NO truncation) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className={cn('text-[11px] font-mono uppercase tracking-wider', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
                  Select Priorities
                </span>
                <span className={cn(
                  'text-[10px] font-mono px-2 py-0.5 rounded border',
                  selectedPriorities.length > 0
                    ? isLight ? 'border-neutral-900 text-neutral-900 bg-neutral-100 font-semibold' : 'border-white text-white bg-[#141414] font-semibold'
                    : isLight ? 'border-neutral-200 text-neutral-400' : 'border-[#262626] text-neutral-500'
                )}>
                  {selectedPriorities.length} of 3 selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {IMPROVEMENT_OPTIONS.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = selectedPriorities.includes(opt.id);
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => togglePriority(opt.id)}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg border text-left transition-all duration-150 cursor-pointer group',
                        isSelected
                          ? isLight
                            ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                            : 'bg-[#141414] border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]'
                          : isLight
                            ? 'bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-neutral-300 hover:bg-neutral-100'
                            : 'bg-[#0c0c0c] border-[#222222] text-neutral-300 hover:border-[#333333] hover:bg-[#121212]'
                      )}
                    >
                      <div
                        className={cn(
                          'w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors mt-0.5',
                          isSelected
                            ? isLight ? 'bg-white text-black' : 'bg-white text-black'
                            : isLight ? 'bg-neutral-200 text-neutral-700' : 'bg-[#1a1a1a] text-neutral-400 group-hover:text-neutral-200'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <div className={cn(
                          'text-xs font-semibold leading-snug',
                          isSelected ? (isLight ? 'text-white' : 'text-white') : (isLight ? 'text-neutral-900' : 'text-[#EDEDED]')
                        )}>
                          {opt.title}
                        </div>
                        <div className={cn(
                          'text-[11px] leading-relaxed mt-0.5',
                          isSelected ? (isLight ? 'text-neutral-300' : 'text-neutral-400') : (isLight ? 'text-neutral-500' : 'text-neutral-500')
                        )}>
                          {opt.desc}
                        </div>
                      </div>

                      {/* Crisp Checkbox */}
                      <div
                        className={cn(
                          'w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all mt-0.5',
                          isSelected
                            ? isLight ? 'bg-white border-white text-black' : 'bg-white border-white text-black'
                            : isLight ? 'border-neutral-300 bg-transparent' : 'border-[#333333] bg-transparent group-hover:border-[#555555]'
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preparation Confidence (Segmented Control) */}
            <div className="space-y-2">
              <span className={cn('text-[11px] font-mono uppercase tracking-wider block', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
                Current Preparation Sentiment
              </span>

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
                        'p-2.5 rounded-lg border text-left transition-all duration-150 cursor-pointer group',
                        isSelected
                          ? isLight
                            ? 'bg-neutral-900 border-neutral-900 text-white'
                            : 'bg-[#141414] border-white text-white'
                          : isLight
                            ? 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100'
                            : 'bg-[#0c0c0c] border-[#222222] text-neutral-400 hover:border-[#333333] hover:text-neutral-200'
                      )}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', opt.dotColor)} />
                        <span className={cn('text-xs font-medium leading-none', isSelected ? 'text-white' : (isLight ? 'text-neutral-900' : 'text-[#EDEDED]'))}>
                          {opt.label}
                        </span>
                      </div>
                      <span className={cn('text-[10px] leading-tight block', isSelected ? 'text-neutral-400' : 'text-neutral-500')}>
                        {opt.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Suggestion Tag Pills (Interactive Selection) + Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={cn('text-[11px] font-mono uppercase tracking-wider', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
                  Specific Content Requests (Optional)
                </span>
                <span className={cn('text-[10px] font-mono', isLight ? 'text-neutral-400' : 'text-neutral-600')}>
                  {notes.length}/300
                </span>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_TAGS.map(tag => {
                  const isTagActive = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'text-xs px-2.5 py-1 rounded-md border transition-all duration-150 cursor-pointer font-medium',
                        isTagActive
                          ? isLight
                            ? 'bg-neutral-900 border-neutral-900 text-white'
                            : 'bg-white border-white text-black font-semibold'
                          : isLight
                            ? 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-200'
                            : 'bg-[#111111] border-[#262626] text-neutral-400 hover:border-[#383838] hover:text-neutral-200'
                      )}
                    >
                      {isTagActive ? '✓ ' : '+ '}
                      {tag}
                    </button>
                  );
                })}
              </div>

              {/* Clean Minimalist Textarea */}
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Anything else you'd like us to improve? (e.g., specific chapter difficulty, test series scheduling, etc.)"
                rows={2}
                maxLength={300}
                className={cn(
                  'w-full text-xs sm:text-sm p-3 rounded-lg border outline-none resize-none transition-colors duration-150',
                  isLight
                    ? 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:bg-white'
                    : 'bg-[#0c0c0c] border-[#222222] text-[#EDEDED] placeholder:text-neutral-600 focus:border-white focus:bg-[#111111]'
                )}
              />
            </div>

            {/* Footer Bar */}
            <div className={cn(
              'flex items-center justify-between pt-3 border-t',
              isLight ? 'border-neutral-100' : 'border-[#1a1a1a]'
            )}>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className={cn(
                    'text-xs font-medium px-3 py-2 rounded-md transition-colors cursor-pointer',
                    isLight
                      ? 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                      : 'text-neutral-400 hover:text-white hover:bg-[#1a1a1a]'
                  )}
                >
                  Skip for now
                </button>

                {onOpenFullFeedback && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDismiss();
                      onOpenFullFeedback();
                    }}
                    className={cn(
                      'hidden sm:inline-flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer',
                      isLight ? 'text-neutral-400 hover:text-neutral-900' : 'text-neutral-500 hover:text-neutral-300'
                    )}
                  >
                    <span>Bug report or detailed form</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer disabled:opacity-50',
                  isLight
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.99] shadow-sm'
                    : 'bg-white text-black hover:bg-neutral-200 active:scale-[0.99] shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                )}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit feedback</span>
                    <CornerDownLeft className="w-3 h-3 opacity-60" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
