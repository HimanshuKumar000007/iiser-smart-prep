import React, { useState } from 'react';
import { HelpCircle, Mail, Send, Check, Copy, ChevronDown, ChevronUp, Sparkles, MessageCircle, Info, Shield, LifeBuoy, HeartHandshake } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is the IISER SmartPrep platform?",
    answer: "SmartPrep is an AI-powered intelligence dashboard custom built to help students prepare for the IAT (IISER Aptitude Test). It tracks your learning progress, identifies weaknesses, creates custom study schedules, and provides structured revision checklists."
  },
  {
    question: "How do I upgrade to the premium Pro plan?",
    answer: "You can click on the 'Upgrade to Pro' button in the sidebar navigation or visit the Subscription page. Upgrading unlocks deep analytics, Python study coaching, custom PYQs, and full predicted ranks."
  },
  {
    question: "Are mock tests and previous year questions (PYQs) official?",
    answer: "Yes, our database includes actual curated PYQs from 2017 to 2024, structured into mock formats with high-fidelity solutions and time tracking analysis so you can practice under exam conditions."
  },
  {
    question: "How does the SLS Intelligence system analyze my learning progress?",
    answer: "The SLS system analyzes your active study time, mock test completion metrics, and chapter quiz performance to dynamically output a 'Readiness Score'. It highlights gaps and adds suggested topics directly to your Revision Queue."
  },
  {
    question: "I have billing issues. Whom should I contact?",
    answer: "For any payment, invoice, or refund concerns, please write directly to our billing support desk at weborbitsolutions0@gmail.com with your transaction ID, and our team will get it resolved within 24 hours."
  }
];

export function Support({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issueType, setIssueType] = useState('technical');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Email Copy State
  const [copied, setCopied] = useState(false);

  // FAQ Accordion States
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('weborbitsolutions0@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const API_BASE =
        (import.meta as any).env?.VITE_API_URL ??
        ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

      const fullMessage = `[Category: ${issueType.toUpperCase()}]
[Subject: ${subject}]

Message:
${message}`;

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: fullMessage })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Support ticket submission error:', err);
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

        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              isLight ? "bg-cyan-500/10 text-cyan-600 border-cyan-500/20" : "bg-cyan-950/40 border border-cyan-500/30 text-cyan-400"
            )}>
              Help Center
            </span>
          </div>
          <h1 className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight", isLight ? "text-slate-800" : "text-white")}>
            Support & Help Desk
          </h1>
          <p className={cn("text-xs sm:text-sm", isLight ? "text-slate-600" : "text-white/60")}>
            Have questions about preparation plans, subscription features, or content? Our technical and academic team is ready to help you succeed in IAT.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center border shadow-inner",
            isLight ? "bg-indigo-50 border-indigo-100 text-indigo-500" : "bg-indigo-950/20 border-indigo-500/30 text-indigo-400"
          )}>
            <LifeBuoy className="w-8 h-8 animate-[spin_8s_linear_infinite]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Contact & FAQ (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Direct Email Card */}
          <div className={cn(
            "p-6 rounded-3xl border shadow-md relative overflow-hidden",
            isLight ? "bg-white/80 border-slate-200/80" : "bg-[#0A0C18] border-white/5"
          )}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  isLight ? "bg-cyan-50 border-cyan-100 text-cyan-600" : "bg-cyan-950/40 border-cyan-500/20 text-cyan-400"
                )}>
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className={cn("font-bold text-sm sm:text-base", isLight ? "text-slate-800" : "text-white")}>
                    Direct Email Support
                  </h3>
                  <p className={cn("text-xs", isLight ? "text-slate-500" : "text-white/40")}>
                    Send queries anytime. Typical response time is under 12 hours.
                  </p>
                  <p className={cn("font-mono text-xs sm:text-sm font-semibold select-all mt-1", isLight ? "text-cyan-600" : "text-cyan-400")}>
                    weborbitsolutions0@gmail.com
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 select-none",
                  copied
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                    : isLight
                      ? "bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 active:scale-95"
                      : "bg-white/5 hover:bg-white/10 border border-white/8 text-white/80 active:scale-95"
                )}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </div>

          {/* Interactive FAQs Accordion */}
          <div className={cn(
            "p-6 rounded-3xl border shadow-md space-y-4",
            isLight ? "bg-white/80 border-slate-200/80" : "bg-[#0A0C18] border-white/5"
          )}>
            <div className="flex items-center gap-2 pb-3 border-b border-white/5">
              <HelpCircle className={cn("w-5 h-5", isLight ? "text-indigo-500" : "text-indigo-400")} />
              <h3 className={cn("font-bold text-sm uppercase tracking-wider", isLight ? "text-slate-800" : "text-white")}>
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-2">
              {FAQS.map((faq, index) => {
                const isOpen = openFAQIndex === index;
                return (
                  <div
                    key={index}
                    className={cn(
                      "border rounded-2xl overflow-hidden transition-all duration-300",
                      isLight 
                        ? (isOpen ? "border-indigo-500/20 bg-indigo-50/10" : "border-slate-200/60 bg-white/40")
                        : (isOpen ? "border-indigo-500/20 bg-indigo-950/5" : "border-white/5 bg-white/[0.01]")
                    )}
                  >
                    <button
                      onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left transition-colors font-medium text-xs sm:text-sm select-none"
                    >
                      <span className={isLight ? "text-slate-700 font-semibold" : "text-white/80"}>
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className={cn("w-4 h-4 shrink-0", isLight ? "text-slate-500" : "text-white/40")} />
                      ) : (
                        <ChevronDown className={cn("w-4 h-4 shrink-0", isLight ? "text-slate-500" : "text-white/40")} />
                      )}
                    </button>
                    {isOpen && (
                      <div className={cn(
                        "px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed border-t border-white/5",
                        isLight ? "text-slate-600" : "text-white/60"
                      )}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Notice Panel */}
          <div className={cn(
            "p-5 rounded-2xl border flex gap-3.5",
            isLight ? "bg-indigo-50/30 border-indigo-100/50" : "bg-indigo-950/10 border-indigo-500/10"
          )}>
            <HeartHandshake className={cn("w-5 h-5 shrink-0 mt-0.5", isLight ? "text-indigo-600" : "text-indigo-400")} />
            <div className="space-y-1">
              <h4 className={cn("text-xs font-bold", isLight ? "text-indigo-950" : "text-indigo-300")}>Academic Honor Commitment</h4>
              <p className={cn("text-[11px] leading-relaxed", isLight ? "text-slate-600" : "text-indigo-200/60")}>
                Our team provides guidance to clarify concepts, answer platform queries, and resolve technical bugs. For direct help with active exam papers, homework integrity, or academic test evaluations, support is limited in adherence to educational guidelines.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Submit Support Ticket (5 Cols) */}
        <div className="lg:col-span-5">
          <div className={cn(
            "p-6 rounded-3xl border shadow-md relative overflow-hidden h-full flex flex-col justify-between",
            isLight ? "bg-white/80 border-slate-200/80" : "bg-[#0A0C18] border-white/5"
          )}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[50px] rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-5">
                <MessageCircle className={cn("w-5 h-5", isLight ? "text-indigo-500" : "text-indigo-400")} />
                <h3 className={cn("font-bold text-sm uppercase tracking-wider", isLight ? "text-slate-800" : "text-white")}>
                  Submit Support Ticket
                </h3>
              </div>

              {isSubmitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className={cn(
                    "w-12 h-12 rounded-full mx-auto flex items-center justify-center border shadow-md",
                    "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  )}>
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className={cn("font-bold text-sm sm:text-base", isLight ? "text-slate-800" : "text-white")}>
                      Ticket Submitted Successfully!
                    </h4>
                    <p className={cn("text-xs leading-relaxed max-w-xs mx-auto", isLight ? "text-slate-600" : "text-white/60")}>
                      Thank you for contacting SmartPrep. We have received your query. A confirmation email and response will be sent to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className={cn(
                      "px-6 py-2 rounded-xl text-xs font-bold transition-all mt-4 inline-block select-none",
                      isLight
                        ? "bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 active:scale-95"
                        : "bg-white/5 hover:bg-white/10 border border-white/8 text-white/80 active:scale-95"
                    )}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
                  {errorMsg && (
                    <div className={cn(
                      "p-3 rounded-xl border text-xs font-semibold flex items-center gap-2",
                      "bg-rose-500/10 border-rose-500/20 text-rose-500"
                    )}>
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className={cn("block text-[10px] font-bold uppercase tracking-widest mb-1.5", isLight ? "text-slate-400" : "text-white/40")}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className={cn(
                          "w-full rounded-xl p-3 text-xs outline-none border transition-colors",
                          isLight
                            ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                            : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                        )}
                      />
                    </div>

                    <div>
                      <label className={cn("block text-[10px] font-bold uppercase tracking-widest mb-1.5", isLight ? "text-slate-400" : "text-white/40")}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
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
                    <label className={cn("block text-[10px] font-bold uppercase tracking-widest mb-1.5", isLight ? "text-slate-400" : "text-white/40")}>
                      Topic Category
                    </label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className={cn(
                        "w-full rounded-xl p-3 text-xs outline-none border transition-colors appearance-none cursor-pointer",
                        isLight
                          ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                          : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                      )}
                    >
                      <option value="technical">🖥️ Technical Issue / Bug</option>
                      <option value="billing">💳 Billing & Subscriptions</option>
                      <option value="content">📚 Syllabus & Study Content</option>
                      <option value="other">💬 Other General Query</option>
                    </select>
                  </div>

                  <div>
                    <label className={cn("block text-[10px] font-bold uppercase tracking-widest mb-1.5", isLight ? "text-slate-400" : "text-white/40")}>
                      Subject Header
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Cannot open mock test analytics page"
                      className={cn(
                        "w-full rounded-xl p-3 text-xs outline-none border transition-colors",
                        isLight
                          ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                          : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                      )}
                    />
                  </div>

                  <div>
                    <label className={cn("block text-[10px] font-bold uppercase tracking-widest mb-1.5", isLight ? "text-slate-400" : "text-white/40")}>
                      Detailed Explanation
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Describe your issue or request here in detail..."
                      className={cn(
                        "w-full rounded-xl p-3 text-xs outline-none border transition-colors resize-none",
                        isLight
                          ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                          : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs rounded-xl transition-all shadow-md mt-2",
                      isSubmitting
                        ? "bg-indigo-600/50 text-white/50 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/20 active:scale-[0.98]"
                    )}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? "Sending Ticket..." : "Submit Support Request"}
                  </button>
                </form>
              )}
            </div>

            <div className={cn(
              "text-[10px] text-center mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5",
              isLight ? "text-slate-400" : "text-white/20"
            )}>
              <Shield className="w-3 h-3" />
              Secure SSL submission. Your data is handled in confidence.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
