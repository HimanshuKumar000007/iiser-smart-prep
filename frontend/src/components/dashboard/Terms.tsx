import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

interface TermsProps {
  onNavigate?: (view: string) => void;
}

export function Terms({ onNavigate }: TermsProps) {
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
            Terms &amp; Conditions
          </h1>
          <p className={cn("text-xs sm:text-sm max-w-xl", isLight ? "text-slate-500" : "text-white/60")}>
            Last Updated: May 2026
          </p>
        </div>

        <div className="flex items-center justify-center p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 z-10">
          <FileText className="w-10 h-10 text-indigo-500" />
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
          Welcome to <strong>IISER Smart Prep</strong> (iisersmartprep.space). By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <hr className={isLight ? "border-slate-100" : "border-white/5"} />

        <div className="space-y-6 text-xs sm:text-sm">
          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              1. Services Provided
            </h2>
            <p>
              We provide specialized online educational resources, including study material, interactive mock tests, performance analytics, and revision tools tailored for the IISER Aptitude Test (IAT).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              2. User Accounts
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>You must provide accurate and complete information during the registration process.</li>
              <li>You are solely responsible for maintaining the confidentiality of your account credentials.</li>
              <li>Account sharing is strictly prohibited. Detection of simultaneous logins may result in account suspension.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              3. Payments &amp; Subscriptions
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All payments are processed securely via our payment partner, Razorpay.</li>
              <li>Purchased plans and mock test series are non-transferable and tied to a single user account.</li>
            </ul>
          </section>

          <section className="space-y-3 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10">
            <h2 className="text-sm sm:text-base font-extrabold text-amber-500">
              4. No-Refund Policy
            </h2>
            <p className="font-semibold text-amber-600/90 dark:text-amber-400/90">
              IISER Smart Prep operates a strict No-Refund Policy. By completing a purchase on our platform, you explicitly acknowledge and agree to the following terms:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>All Sales Are Final:</strong> Once a payment is successfully processed, it is non-refundable under any circumstances.</li>
              <li><strong>Instant Digital Access:</strong> Our products grant immediate, unrestricted access to premium content upon purchase completion. Due to the instantaneous delivery of digital services, refunds are not applicable.</li>
              <li><strong>No Chargebacks:</strong> Initiating an unauthorized chargeback or payment dispute with your bank or payment provider after purchasing a subscription constitutes a breach of these Terms, resulting in permanent termination.</li>
              <li><strong>Pre-Purchase Evaluation:</strong> We strongly encourage prospective users to evaluate the platform thoroughly via the free mock test previews.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              5. Usage Restrictions
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All content provided is for personal, non-commercial educational use only.</li>
              <li>Reproduction, screen recording, reselling, or redistribution of questions, notes, or analytics is strictly prohibited.</li>
              <li>Any attempt to bypass payment gateways or security protocols will lead to immediate legal action.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              6. Legal Disclaimer
            </h2>
            <p>
              IISER Smart Prep is an independent educational platform. We are <strong>not affiliated</strong>, associated, authorized, endorsed by, or in any way officially connected with any of the Indian Institutes of Science Education and Research (IISERs) or the Joint Admissions Committee.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className={cn("text-sm sm:text-base font-extrabold", isLight ? "text-slate-800" : "text-white")}>
              7. Contact Us
            </h2>
            <p>
              If you have questions regarding these terms, please contact our support team at <a href="mailto:weborbitsolutions0@gmail.com" className="text-indigo-500 font-bold hover:underline">weborbitsolutions0@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
