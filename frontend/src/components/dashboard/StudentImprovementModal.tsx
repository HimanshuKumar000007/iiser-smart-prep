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
  Smartphone
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

const IMPROVEMENT_OPTIONS = [
  { id: 'full_mocks', label: 'More Full-Length TCS iON Mocks', icon: Target },
  { id: 'formula_sheets', label: 'NCERT Formula Sheets & Mind Maps', icon: BookOpen },
  { id: 'speed_drills', label: 'Speed & Accuracy Timed Drills', icon: Clock },
  { id: 'ai_tutor', label: 'AI Tutor Step-by-Step Audio/Chat', icon: BrainCircuit },
  { id: 'rank_predictor', label: 'IISER Cutoff & Rank Predictor', icon: BarChart3 },
  { id: 'mobile_app', label: 'Mobile App / Offline Mode', icon: Smartphone }
];

const CONFIDENCE_OPTIONS = [
  { id: 'on_track', label: 'On Track (Aiming Top 500)', icon: Flame, color: 'text-amber-500' },
  { id: 'improving', label: 'Steadily Improving', icon: TrendingUp, color: 'text-emerald-500' },
  { id: 'need_help', label: 'Need More Practice', icon: HelpCircle, color: 'text-indigo-400' }
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

  const handleDismiss = () => {
    localStorage.setItem('smartprep_improvement_feedback_v1', 'dismissed');
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

      localStorage.setItem('smartprep_improvement_feedback_v1', 'submitted');
      setIsSubmitted(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.warn('Feedback submission failed:', err);
      // Still mark as submitted locally so the user is never stuck or repeatedly prompted
      localStorage.setItem('smartprep_improvement_feedback_v1', 'submitted');
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={cn(
          'relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border transition-all',
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-slate-900 border-slate-800 text-white'
        )}
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className={cn(
            'absolute top-4 right-4 p-1.5 rounded-full transition-colors z-10',
            isLight
              ? 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          )}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold">Thank you, {userName}! 🎯</h3>
            <p className={cn('text-sm max-w-sm mx-auto', isLight ? 'text-slate-600' : 'text-slate-400')}>
              Your suggestions have been sent directly to the development team. We are building these into the next SmartPrep updates!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Quick 10-Second Poll
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                Help us shape SmartPrep for you 🚀
              </h2>
              <p className={cn('text-xs sm:text-sm mt-1', isLight ? 'text-slate-600' : 'text-slate-400')}>
                Hi <span className="font-semibold">{userName}</span>! Which features or improvements would help you crack IISER IAT 2027 the most?
              </p>
            </div>

            {/* Selectable Feature Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pick up to 3 priority improvements:
              </label>
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
                        'flex items-center gap-2.5 p-2.5 text-left rounded-xl border text-xs sm:text-sm font-medium transition-all',
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                          : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      )}
                    >
                      <Icon className={cn('w-4 h-4 shrink-0', isSelected ? 'text-white' : 'text-indigo-500')} />
                      <span className="leading-tight">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preparation Sentiment */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
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
                        'flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all',
                        isSelected
                          ? 'bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500 text-indigo-400 font-bold'
                          : isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                      )}
                    >
                      <Icon className={cn('w-4 h-4 mb-1', opt.color)} />
                      <span className="text-[11px] leading-tight font-medium">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Wish/Note */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Anything specific you wish SmartPrep had? (Optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Can you add more organic chemistry reaction mechanisms or formula cheat sheets?"
                rows={2}
                maxLength={300}
                className={cn(
                  'w-full text-xs sm:text-sm p-2.5 rounded-xl border outline-none resize-none transition-colors',
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white'
                    : 'bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:bg-slate-800'
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1 gap-3">
              <button
                type="button"
                onClick={handleDismiss}
                className={cn(
                  'text-xs font-semibold px-3 py-2 rounded-lg transition-colors',
                  isLight
                    ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                )}
              >
                Skip for now
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit & Continue</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {onOpenFullFeedback && (
              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
                <button
                  type="button"
                  onClick={() => {
                    handleDismiss();
                    onOpenFullFeedback();
                  }}
                  className="text-[11px] font-medium text-slate-400 hover:text-indigo-500 transition-colors inline-block"
                >
                  Need to report a bug or write detailed feedback? Open full form →
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
