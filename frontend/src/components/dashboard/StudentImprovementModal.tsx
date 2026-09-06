import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Target,
  BookOpen,
  Clock,
  BrainCircuit,
  BarChart3,
  Smartphone,
  Check
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
    desc: 'Official IISER exam pattern tests with all-India rank percentiles',
    icon: Target
  },
  {
    id: 'speed_drills',
    title: '15-Minute Speed & Accuracy Drills',
    desc: 'Rapid timed chapter practice to boost problem-solving speed',
    icon: Clock
  },
  {
    id: 'formula_sheets',
    title: 'Formula Cheat Sheets & Mind Maps',
    desc: 'High-yield formula cards for Physics, Chemistry, Math & Biology',
    icon: BookOpen
  },
  {
    id: 'ai_tutor',
    title: 'AI Step-by-Step Problem Hints',
    desc: 'Instant audio & text hints for difficult numerical problems',
    icon: BrainCircuit
  },
  {
    id: 'rank_predictor',
    title: 'IISER Cutoff & College Predictor',
    desc: 'Target cutoffs & probability for Pune, Kolkata, Mohali, Bhopal, etc.',
    icon: BarChart3
  },
  {
    id: 'mobile_app',
    title: 'Mobile App / Offline Mode',
    desc: 'Solve questions and review lessons without active internet',
    icon: Smartphone
  }
];

const SUGGESTED_CHIPS = [
  'Video PYQ solutions',
  'Organic mechanisms',
  'Harder Physics numericals',
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
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Clean friendly greeting name
  const formatName = (raw: string) => {
    if (!raw || raw === 'Aspirant') return 'Aspirant';
    const clean = raw.includes('@') ? raw.split('@')[0] : raw;
    const match = clean.match(/^[a-zA-Z]+/);
    const candidate = match ? match[0] : clean.slice(0, 12);
    return candidate.charAt(0).toUpperCase() + candidate.slice(1);
  };

  const displayName = formatName(userName);

  // Reset submitted state when opening
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Escape to close & permanently dismiss)
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

  // Toggle card selection
  const togglePriority = (id: string) => {
    setSelectedPriorities(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Toggle suggestion chip
  const toggleChip = (chip: string) => {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    );
  };

  // Permanent dismissal: sets all flags so it NEVER appears again automatically
  const handleDismiss = () => {
    localStorage.setItem('smartprep_improvement_feedback_v1', 'dismissed');
    localStorage.setItem('smartprep_feedback_shown_v2', 'true');
    localStorage.setItem('smartprep_feedback_dismissed', 'true');
    const email = userEmail || localStorage.getItem('currentUserEmail') || '';
    if (email) {
      localStorage.setItem(`smartprep_feedback_shown_v2_${email}`, 'true');
      localStorage.setItem(`smartprep_feedback_dismissed_${email}`, 'true');
    }
    onClose();
  };

  // Submit feedback
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // If nothing chosen, just dismiss gracefully
    if (selectedPriorities.length === 0 && !notes.trim() && selectedChips.length === 0) {
      handleDismiss();
      return;
    }

    setIsSubmitting(true);

    // Immediately mark as submitted so it never triggers again
    localStorage.setItem('smartprep_improvement_feedback_v1', 'submitted');
    localStorage.setItem('smartprep_feedback_shown_v2', 'true');
    localStorage.setItem('smartprep_feedback_dismissed', 'true');
    const email = userEmail || localStorage.getItem('currentUserEmail') || '';
    if (email) {
      localStorage.setItem(`smartprep_feedback_shown_v2_${email}`, 'true');
      localStorage.setItem(`smartprep_feedback_dismissed_${email}`, 'true');
    }

    const token = localStorage.getItem('IAT_TOKEN');
    const API_BASE =
      (import.meta as any).env?.VITE_API_URL ??
      ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

    const priorityLabels = selectedPriorities.map(
      id => IMPROVEMENT_OPTIONS.find(opt => opt.id === id)?.title || id
    );

    // Combine any chips and text notes cleanly
    let compiledNotes = notes.trim();
    if (selectedChips.length > 0) {
      const chipHeader = `[Requested: ${selectedChips.join(', ')}]`;
      compiledNotes = compiledNotes ? `${chipHeader}\n\n${compiledNotes}` : chipHeader;
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
          confidence: 'Active Aspirant',
          notes: compiledNotes
        })
      });

      try {
        Analytics.track('Submitted Improvement Wishlist', {
          priorities: priorityLabels,
          chips: selectedChips,
          has_notes: Boolean(notes.trim())
        });
      } catch (_) {}

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.warn('Feedback submission error:', err);
      // Still show success to user & close gracefully
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      {/* Vercel Dialog Frame */}
      <div
        className={cn(
          'relative w-full max-w-2xl rounded-2xl border transition-all overflow-hidden',
          isLight
            ? 'bg-white border-neutral-200 text-neutral-900 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_48px_rgba(0,0,0,0.12)]'
            : 'bg-[#0c0c0c] border-[#222222] text-[#EDEDED] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_54px_rgba(0,0,0,0.9)]'
        )}
      >
        {/* Top Minimal Bar */}
        <div className={cn(
          'flex items-center justify-between px-6 py-3.5 border-b',
          isLight ? 'border-neutral-100 bg-neutral-50/50' : 'border-[#1a1a1a] bg-[#0f0f0f]/60'
        )}>
          <div className="flex items-center gap-2">
            <span className={cn(
              'w-2 h-2 rounded-full',
              isLight ? 'bg-neutral-900' : 'bg-white'
            )} />
            <span className={cn(
              'text-xs font-mono font-medium tracking-tight uppercase',
              isLight ? 'text-neutral-600' : 'text-neutral-300'
            )}>
              Quick Wishlist
            </span>
            <span className={cn('text-xs', isLight ? 'text-neutral-300' : 'text-neutral-700')}>•</span>
            <span className={cn('text-xs font-mono', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
              IISER IAT 2026/27
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={cn(
              'hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border',
              isLight ? 'border-neutral-200 text-neutral-400 bg-neutral-50' : 'border-[#262626] text-neutral-500 bg-[#141414]'
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
          <div className="p-10 sm:p-12 text-center space-y-3">
            <div className={cn(
              'w-12 h-12 rounded-full mx-auto flex items-center justify-center border',
              isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-900' : 'bg-[#141414] border-[#2a2a2a] text-white'
            )}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Thank you, {displayName}!
            </h3>
            <p className={cn('text-xs max-w-sm mx-auto leading-relaxed', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
              Your preferences have been saved. We prioritize new features based directly on student votes.
            </p>
          </div>
        ) : (
          /* Simple, Easy 1-Screen Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            {/* Header / Call to Action */}
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                What should we improve next?
              </h2>
              <p className={cn('text-xs leading-relaxed', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
                Hi <span className={isLight ? 'text-neutral-900 font-semibold' : 'text-white font-semibold'}>{displayName}</span>, tap what you need most for your IISER IAT prep (takes 5 seconds):
              </p>
            </div>

            {/* 6 Clean, Non-Truncated Cards */}
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
                      'flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer group select-none',
                      isSelected
                        ? isLight
                          ? 'bg-neutral-900 border-neutral-900 text-white shadow-sm'
                          : 'bg-[#161616] border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                        : isLight
                          ? 'bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-neutral-300 hover:bg-neutral-100/80'
                          : 'bg-[#0f0f0f] border-[#222222] text-neutral-300 hover:border-[#333333] hover:bg-[#141414]'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5',
                        isSelected
                          ? 'bg-white text-black'
                          : isLight ? 'bg-neutral-200 text-neutral-700' : 'bg-[#1c1c1c] text-neutral-400 group-hover:text-neutral-200'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 pr-1">
                      <div className={cn(
                        'text-xs font-semibold leading-snug',
                        isSelected ? 'text-white' : (isLight ? 'text-neutral-900' : 'text-[#EDEDED]')
                      )}>
                        {opt.title}
                      </div>
                      <div className={cn(
                        'text-[11px] leading-relaxed mt-0.5',
                        isSelected ? 'text-neutral-300' : (isLight ? 'text-neutral-500' : 'text-neutral-400')
                      )}>
                        {opt.desc}
                      </div>
                    </div>

                    {/* Crisp Checkbox Indicator */}
                    <div
                      className={cn(
                        'w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all mt-0.5',
                        isSelected
                          ? 'bg-white border-white text-black'
                          : isLight ? 'border-neutral-300 bg-transparent' : 'border-[#333333] bg-transparent group-hover:border-[#555555]'
                      )}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Suggestion Chips + Compact Note */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className={cn('text-xs font-medium block', isLight ? 'text-neutral-700' : 'text-neutral-300')}>
                  Have any specific suggestion? <span className="font-normal text-neutral-500">(Optional)</span>
                </label>
                {selectedPriorities.length > 0 && (
                  <span className={cn('text-[10px] font-mono', isLight ? 'text-neutral-500' : 'text-neutral-400')}>
                    {selectedPriorities.length} selected
                  </span>
                )}
              </div>

              {/* Quick 1-click pills */}
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_CHIPS.map(chip => {
                  const isActive = selectedChips.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleChip(chip)}
                      className={cn(
                        'text-xs px-2.5 py-1 rounded-md border transition-all duration-150 cursor-pointer font-medium select-none',
                        isActive
                          ? isLight
                            ? 'bg-neutral-900 border-neutral-900 text-white'
                            : 'bg-white border-white text-black font-semibold'
                          : isLight
                            ? 'bg-neutral-100 border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-200'
                            : 'bg-[#141414] border-[#262626] text-neutral-400 hover:border-[#3a3a3a] hover:text-neutral-200'
                      )}
                    >
                      {isActive ? '✓ ' : '+ '}
                      {chip}
                    </button>
                  );
                })}
              </div>

              {/* Simple 2-line textarea */}
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value.slice(0, 300))}
                placeholder="e.g. Please add 2024-25 PYQ chapter-wise breakdown or question timer..."
                rows={2}
                className={cn(
                  'w-full text-xs rounded-xl p-3 border outline-none resize-none transition-all placeholder:text-neutral-500',
                  isLight
                    ? 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-neutral-400 focus:bg-white'
                    : 'bg-[#101010] border-[#222222] text-[#EDEDED] focus:border-neutral-500 focus:bg-[#141414]'
                )}
              />
            </div>

            {/* Footer Buttons */}
            <div className={cn(
              'flex items-center justify-between pt-3 border-t',
              isLight ? 'border-neutral-100' : 'border-[#1a1a1a]'
            )}>
              <button
                type="button"
                onClick={handleDismiss}
                className={cn(
                  'text-xs font-medium px-3 py-2 rounded-lg transition-colors cursor-pointer',
                  isLight
                    ? 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                    : 'text-neutral-400 hover:text-white hover:bg-[#1a1a1a]'
                )}
              >
                Skip for now
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer select-none active:scale-[0.99]',
                  isLight
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm'
                    : 'bg-white hover:bg-neutral-200 text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]',
                  isSubmitting && 'opacity-60 cursor-not-allowed'
                )}
              >
                <span>{isSubmitting ? 'Saving...' : 'Submit Feedback'}</span>
                {!isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
