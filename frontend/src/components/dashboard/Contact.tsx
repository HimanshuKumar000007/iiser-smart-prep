import React, { useState } from 'react';
import { Mail, Send, ArrowLeft, CheckCircle2, Globe, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { currentUser } from '../../data/mockData';

interface ContactProps {
  onNavigate?: (view: string) => void;
}

export function Contact({ onNavigate }: ContactProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Form states
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

      const fullMessage = `[Contact Form Submission]
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
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setErrorMsg(err.message || 'Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-6 mt-2 lg:mt-4 pb-24">
      {/* Header Banner */}
      <div className={cn(
        "relative overflow-hidden p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6",
        isLight
          ? "bg-white/80 border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
          : "bg-gradient-to-br from-[#0B0D1B] via-[#0D0F22] to-[#12142E] border-white/10"
      )}>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        
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
            Contact Us
          </h1>
          <p className={cn("text-xs sm:text-sm max-w-xl", isLight ? "text-slate-500" : "text-white/60")}>
            Have questions about subscriptions or mock tests? Get in touch with our team.
          </p>
        </div>

        <div className="flex items-center justify-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 z-10">
          <Mail className="w-10 h-10 text-indigo-500" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form */}
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
                  Message Sent Successfully!
                </h3>
                <p className={cn("text-xs max-w-md mx-auto leading-relaxed", isLight ? "text-slate-500" : "text-white/60")}>
                  Thank you for contacting SmartPrep. We have received your message and will respond to your email address shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className={cn("block text-xs font-semibold mb-2", isLight ? "text-slate-700" : "text-white/80")}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
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
                    placeholder="Enter your email"
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
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter message subject"
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
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className={cn(
                      "w-full rounded-xl p-3 text-xs outline-none border transition-colors resize-none",
                      isLight
                        ? "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                        : "bg-[#05060F] border-white/10 text-white focus:border-indigo-500/50"
                    )}
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 text-xs rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-semibold">
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className={cn(
            "rounded-3xl border p-5 sm:p-6 transition-all duration-300 space-y-6",
            isLight
              ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)]"
              : "bg-[#0A0B16] border-white/5"
          )}>
            <h3 className={cn("text-sm font-extrabold tracking-tight", isLight ? "text-slate-800" : "text-white")}>
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 h-10 w-10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className={cn("text-[10px] font-bold block", isLight ? "text-slate-400" : "text-white/40")}>EMAIL INBOX</span>
                  <a href="mailto:weborbitsolutions0@gmail.com" className="text-xs font-semibold text-indigo-500 hover:underline">
                    weborbitsolutions0@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 h-10 w-10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className={cn("text-[10px] font-bold block", isLight ? "text-slate-400" : "text-white/40")}>RESPONSE TIME</span>
                  <p className={cn("text-xs font-semibold", isLight ? "text-slate-700" : "text-white/85")}>
                    Within 24 Hours (Mon - Fri)
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 h-10 w-10 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className={cn("text-[10px] font-bold block", isLight ? "text-slate-400" : "text-white/40")}>PLATFORM ORIGIN</span>
                  <p className={cn("text-xs font-semibold", isLight ? "text-slate-700" : "text-white/85")}>
                    IISER SmartPrep Space
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
