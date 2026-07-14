import React from 'react';
import { FileLock2, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

interface PrivacyProps {
  onNavigate?: (view: string) => void;
}

export function Privacy({ onNavigate }: PrivacyProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 mt-2 lg:mt-4 pb-24">
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
            Privacy Policy
          </h1>
          <p className={cn("text-xs sm:text-sm max-w-xl", isLight ? "text-slate-500" : "text-white/60")}>
            Last Updated: January 2026
          </p>
        </div>

        <div className="flex items-center justify-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 z-10">
          <FileLock2 className="w-10 h-10 text-indigo-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className={cn(
        "rounded-3xl border p-6 sm:p-10 transition-all duration-300 leading-relaxed space-y-8",
        isLight
          ? "bg-white/80 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.03)] text-slate-700"
          : "bg-[#0A0B16] border-white/5 text-white/80"
      )}>
        <p className="text-sm sm:text-base font-medium">
          Your privacy is important to us. This policy explains how <strong>IISER Smart Prep</strong> collects, uses, and protects your personal and academic data.
        </p>

        <hr className={isLight ? "border-slate-100" : "border-white/5"} />

        <div className="space-y-6 text-xs sm:text-sm">
          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              1. Information We Collect
            </h2>
            <p>We only collect the data necessary to provide you with a personalized learning experience:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Identity:</strong> Email address for secure account credentials.</li>
              <li><strong>Security:</strong> Encrypted login credentials.</li>
              <li><strong>Transactions:</strong> Payment status (e.g. Paid/Unpaid). We do NOT store card or banking credentials.</li>
              <li><strong>Academics:</strong> Mock test scores, time spent per question, and SLS mastery metrics.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              2. Payment Security
            </h2>
            <p>
              All financial transactions are processed securely through <strong>Razorpay</strong>. We do not collect, store, or have access to your credit card numbers, UPI PINs, or banking passwords.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              3. How We Use Data
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To evaluate your mock tests and supply analytical metrics.</li>
              <li>To generate personalized smart study pathways.</li>
              <li>To unlock premium features under active subscription tiers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              4. Data Sharing
            </h2>
            <p>
              We value your trust. We <strong>do not</strong> sell, trade, or rent your personal identification information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              5. User Rights
            </h2>
            <p>
              You have the right to request the deletion of your account and all associated test data at any time. To request this, email our support team at <a href="mailto:weborbitsolutions0@gmail.com" className="text-indigo-500 font-bold hover:underline">weborbitsolutions0@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
