import React, { useState } from 'react';
import { ThumbsUp, Star, Send, ArrowLeft, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { currentUser } from '../../data/mockData';

interface FeedbackProps {
  onNavigate?: (view: string) => void;
}

export function Feedback({ onNavigate }: FeedbackProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [satisfaction, setSatisfaction] = useState<number | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [nps, setNps] = useState<number | null>(null);
  const [comments, setComments] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const roadmapItems = [
    { title: "Mobile Apps (iOS & Android)", desc: "Full native mobile experience with offline lesson access.", status: "In Progress", color: "text-amber-500 bg-amber-500/10" },
    { title: "AI Explanations for Mock Tests", desc: "Get dynamic step-by-step reasoning for all incorrect responses.", status: "In Progress", color: "text-indigo-500 bg-indigo-500/10" },
    { title: "Offline Practice Mode", desc: "Download chapters and question banks to study without internet.", status: "Planned", color: "text-emerald-500 bg-emerald-500/10" },
    { title: "Parent Analytics Dashboard", desc: "Let parents track readiness level and weekly milestones.", status: "Planned", color: "text-cyan-500 bg-cyan-500/10" },
    { title: "Gamified Revision Quizzes", desc: "Challenge peer students in real-time speed revision tests.", status: "Under Review", color: "text-slate-400 bg-slate-500/10" }
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !comments.trim()) {
      setErrorMsg('Please enter your name, email, and feedback comments.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (satisfaction === null) {
      setErrorMsg('Please select a satisfaction rating.');
      return;
    }

    if (nps === null) {
      setErrorMsg('Please select your likelihood score (NPS).');
      return;
    }

    setIsSubmitting(true);
    try {
      const API_BASE =
        (import.meta as any).env?.VITE_API_URL ??
        ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

      const fullMessage = `[Category: FEEDBACK - ${feedbackType.toUpperCase()}]
[Satisfaction Rating: ${satisfaction}/5 Stars]
[NPS Recommendation Score: ${nps}/10]

User Comments:
${comments}`;

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: fullMessage })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit feedback.');
      }

      setIsSubmitted(true);
      setComments('');
      setSatisfaction(null);
      setNps(null);
    } catch (err: any) {
      console.error('Feedback submission error:', err);
      setErrorMsg(err.message || 'Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-6 mt-2 lg:mt-4 pb-24">
      {/* 1. Header Banner */}
      <div className={cn(
        "relative overflow-hidden p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6",
        isLight
          ? "bg-white/80 border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
          : "bg-gradient-to-br from-[#0B0D1B] via-[#0D0F22] to-[#12142E] border-white/10"
      )}>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="space-y-2 z-10 relative">
          <button
            onClick={() => onNavigate?.('dashboard')}
            className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-600 transition-colors font-medium mb-3 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>
          <h1 className={cn(
            "text-2xl sm:text-3xl font-extrabold tracking-tight",
            isLight ? "text-slate-900" : "text-white"
          )}>
            Share Your Feedback
          </h1>
          <p className={cn("text-xs sm:text-sm max-w-xl", isLight ? "text-slate-500" : "text-white/60")}>
            Help us shape the future of SmartPrep. Your insights directly influence our product roadmap.
          </p>
        </div>

        <div className="flex items-center justify-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 z-10">
          <ThumbsUp className="w-10 h-10 text-indigo-500 animate-pulse" />
        </div>
      </div>

      {/* 2. Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className={cn(
            "rounded-3xl border p-5 sm:p-7 relative overflow-hidden transition-all duration-300",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0B16] border-white/5"
          )}>
            {isSubmitted ? (
              <div className="py-10 text-center space-y-5">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 mb-2">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className={cn("text-xl font-bold", isLight ? "text-slate-900" : "text-white")}>
                  Thank you for your feedback!
                </h3>
                <p className={cn("text-xs max-w-md mx-auto leading-relaxed", isLight ? "text-slate-500" : "text-white/60")}>
                  Your feedback has been successfully submitted to our product team. We review every response to improve the platform.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg cursor-pointer"
                  >
                    Submit Another Response
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={cn("block text-xs font-semibold mb-2", isLight ? "text-slate-700" : "text-white/80")}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className={cn(
                        "w-full rounded-xl p-3 text-xs outline-none border transition-colors",
                        isLight
                          ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                          : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                      )}
                    />
                  </div>
                  <div>
                    <label className={cn("block text-xs font-semibold mb-2", isLight ? "text-slate-700" : "text-white/80")}>
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className={cn(
                        "w-full rounded-xl p-3 text-xs outline-none border transition-colors",
                        isLight
                          ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                          : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label className={cn("block text-xs font-semibold mb-2", isLight ? "text-slate-700" : "text-white/80")}>
                    Feedback Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'suggestion', label: 'Suggestion' },
                      { id: 'bug', label: 'Bug Report' },
                      { id: 'feature', label: 'Feature Request' },
                      { id: 'praise', label: 'Praise' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFeedbackType(cat.id)}
                        className={cn(
                          "py-2 px-3 rounded-xl border text-[11px] font-semibold transition-all duration-200 cursor-pointer",
                          feedbackType === cat.id
                            ? "bg-indigo-600/10 border-indigo-500 text-indigo-500"
                            : isLight
                              ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                              : "bg-[#05060F] border-white/5 text-white/60 hover:bg-white/5"
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 1-5 Star satisfaction rating */}
                <div>
                  <label className={cn("block text-xs font-semibold mb-2", isLight ? "text-slate-700" : "text-white/80")}>
                    How satisfied are you with SmartPrep?
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setSatisfaction(starValue)}
                        onMouseEnter={() => setHoveredStar(starValue)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="p-1.5 rounded-lg transition-transform duration-150 hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={cn(
                            "w-7 h-7 transition-colors duration-150",
                            starValue <= (hoveredStar ?? satisfaction ?? 0)
                              ? "fill-amber-400 text-amber-400"
                              : isLight
                                ? "text-slate-200"
                                : "text-white/10"
                          )}
                        />
                      </button>
                    ))}
                    {satisfaction !== null && (
                      <span className={cn(
                        "ml-3 text-xs font-bold",
                        satisfaction >= 4 ? "text-emerald-500" : satisfaction >= 3 ? "text-amber-500" : "text-rose-500"
                      )}>
                        {satisfaction === 5 ? 'Excellent' : satisfaction === 4 ? 'Very Good' : satisfaction === 3 ? 'Good' : satisfaction === 2 ? 'Fair' : 'Poor'}
                      </span>
                    )}
                  </div>
                </div>

                {/* NPS Recommendation chips */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={cn("block text-xs font-semibold", isLight ? "text-slate-700" : "text-white/80")}>
                      How likely are you to recommend us to a friend or classmate?
                    </label>
                    {nps !== null && (
                      <span className="text-xs font-extrabold text-indigo-500">
                        {nps}/10
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-11 gap-1">
                    {Array.from({ length: 11 }, (_, i) => i).map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setNps(score)}
                        className={cn(
                          "py-2.5 rounded-lg text-center text-xs font-bold transition-all border cursor-pointer",
                          nps === score
                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20"
                            : isLight
                              ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                              : "bg-[#05060F] border-white/5 text-white/50 hover:bg-white/5"
                        )}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400 mt-2 px-1">
                    <span>Not likely</span>
                    <span>Neutral</span>
                    <span>Extremely likely</span>
                  </div>
                </div>

                <div>
                  <label className={cn("block text-xs font-semibold mb-2", isLight ? "text-slate-700" : "text-white/80")}>
                    Tell us more (What do you like? What can we do better?)
                  </label>
                  <textarea
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Enter detailed suggestions or bugs encountered..."
                    className={cn(
                      "w-full rounded-xl p-3 text-xs outline-none border transition-colors resize-none",
                      isLight
                        ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                        : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                    )}
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-semibold animate-shake">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full rounded-xl p-3 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/10 cursor-pointer",
                    isSubmitting ? "bg-indigo-500/50 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                  )}
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Info Column (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Product Roadmap Panel */}
          <div className={cn(
            "rounded-3xl border p-5 sm:p-6 transition-all duration-300",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0B16] border-white/5"
          )}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <h3 className={cn("text-sm font-extrabold tracking-tight", isLight ? "text-slate-800" : "text-white")}>
                Product Roadmap
              </h3>
            </div>
            
            <p className={cn("text-[11px] leading-relaxed mb-4", isLight ? "text-slate-500" : "text-white/50")}>
              Here is what we are currently developing. We update this based directly on what our students suggest!
            </p>

            <div className="space-y-4">
              {roadmapItems.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-3 rounded-2xl border transition-all duration-200 flex items-start gap-3",
                    isLight
                      ? "bg-slate-50/50 border-slate-100 hover:border-slate-200 shadow-sm"
                      : "bg-[#05060F]/50 border-white/[0.03] hover:border-white/[0.07]"
                  )}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("text-xs font-bold", isLight ? "text-slate-800" : "text-white")}>
                        {item.title}
                      </span>
                      <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide", item.color)}>
                        {item.status}
                      </span>
                    </div>
                    <p className={cn("text-[10px] leading-relaxed", isLight ? "text-slate-400" : "text-white/40")}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ Box */}
          <div className={cn(
            "rounded-3xl border p-5 transition-all duration-300 flex items-start gap-4",
            isLight
              ? "bg-slate-50 border-slate-200/60 shadow-[0_8px_30px_rgba(15,23,42,0.01)]"
              : "bg-gradient-to-br from-[#060814] to-[#0A0D23] border-white/5"
          )}>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className={cn("text-xs font-bold", isLight ? "text-slate-800" : "text-white")}>
                Have a feature idea?
              </h4>
              <p className={cn("text-[11px] leading-relaxed", isLight ? "text-slate-500" : "text-white/50")}>
                Select the <strong>Feature Request</strong> category to submit detail requirements. Our tech team reviews inputs every Friday!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
