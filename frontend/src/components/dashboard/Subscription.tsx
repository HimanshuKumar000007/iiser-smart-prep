import React, { useState } from 'react';
import { useEntitlement } from '../../hooks/useEntitlement';
import { Sparkles, Check, ShieldCheck, AlertCircle, Calendar, CreditCard, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

interface SubscriptionProps {
  returnTo?: string;
  onNavigate?: (view: string) => void;
}

export function Subscription({ returnTo, onNavigate }: SubscriptionProps) {
  const { isPro, planId, expiresAt, daysRemaining, refresh } = useEntitlement();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedMobilePlan, setSelectedMobilePlan] = useState<'monthly' | 'six_month' | 'annual'>('six_month');

  const PLANS = [
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: 399,
      period: 'month',
      savings: null,
      savingsText: '',
      popular: false,
      ctaLabel: 'Get 1 Month Pro',
      description: 'Flexible access for focused preparation.',
      features: [
        '45+ Full-Length IAT Pattern Mocks',
        'Unlimited Chapter-wise Quick Mocks',
        'Premium Concept Notes with Advanced Practice Questions',
        'Real IAT PYQ Exam Simulation with Detailed Solutions',
        'Personalized Smart Coach V2',
        'Advanced Performance & Readiness Insights',
        'Personalized Daily Action Plans',
        'Smart Revision Recommendations'
      ]
    },
    {
      id: 'six_month',
      name: 'Pro Premium',
      price: 499,
      period: '6 months',
      savings: 'MOST POPULAR',
      savingsText: 'Save ₹1,895 vs monthly',
      popular: true,
      ctaLabel: 'Start 6 Month Pro',
      description: 'Most popular choice for complete IISER IAT syllabus prep.',
      features: [
        '45+ Full-Length IAT Pattern Mocks',
        'Unlimited Chapter-wise Quick Mocks',
        'Premium Concept Notes with Advanced Practice Questions',
        'Real IAT PYQ Exam Simulation with Detailed Solutions',
        'Personalized Smart Coach V2',
        'Advanced Performance & Readiness Insights',
        'Personalized Daily Action Plans',
        'Smart Revision Recommendations',
        'Priority Academic email support',
        'Adaptive Spaced Revision planner'
      ]
    },
    {
      id: 'annual',
      name: 'Pro Annual',
      price: 899,
      period: '1 year',
      savings: 'BEST VALUE',
      savingsText: 'Save ₹3,889 vs monthly',
      popular: false,
      ctaLabel: 'Get Annual Pro',
      description: 'Complete peace of mind for the entire admission cycle.',
      features: [
        '45+ Full-Length IAT Pattern Mocks',
        'Unlimited Chapter-wise Quick Mocks',
        'Premium Concept Notes with Advanced Practice Questions',
        'Real IAT PYQ Exam Simulation with Detailed Solutions',
        'Personalized Smart Coach V2',
        'Advanced Performance & Readiness Insights',
        'Personalized Daily Action Plans',
        'Smart Revision Recommendations',
        'Priority Academic email support',
        'Adaptive Spaced Revision planner',
        'Personal study schedule audit & plan'
      ]
    }
  ];

  const handleSubscribe = async (selectedPlanId: string) => {
    setLoadingPlan(selectedPlanId);
    setErrorMessage(null);
    const token = localStorage.getItem('IAT_TOKEN');

    if (!token) {
      setErrorMessage("Authentication session missing. Please log out and log back in.");
      setLoadingPlan(null);
      return;
    }

    try {
      const API_BASE =
        (import.meta as any).env?.VITE_API_URL ??
        ((import.meta as any).env?.DEV ? 'http://localhost:5000' : 'https://api.iisersmartprep.space');

      // 1. Create order
      const orderRes = await fetch(`${API_BASE}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ planId: selectedPlanId })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || orderData.error) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.order_id,
        name: "IISER Smart Prep",
        description: `Pro Plan — ${selectedPlanId === 'monthly' ? '1 Month' : selectedPlanId === 'six_month' ? '6 Months' : '1 Year'}`,
        image: "https://iisersmartprep.space/apple-touch-icon.png",
        
        handler: async function (response: any) {
          try {
            setLoadingPlan(selectedPlanId);
            const verifyRes = await fetch(`${API_BASE}/api/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(response)
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              await refresh();
              // Redirect back to intended page if one was saved
              if (returnTo && onNavigate) {
                onNavigate(returnTo);
              } else if (onNavigate) {
                onNavigate('dashboard');
              }
            } else {
              setErrorMessage(verifyData.error || "Payment verification failed");
            }
          } catch (verifyErr: any) {
            console.error("Payment verification error:", verifyErr);
            setErrorMessage("Payment completed but verification failed. Please contact support with payment ID: " + response.razorpay_payment_id);
          } finally {
            setLoadingPlan(null);
          }
        },
        modal: {
          ondismiss: function () {
            console.log("Razorpay checkout dismissed");
            setLoadingPlan(null);
          }
        },
        theme: { color: "#2563eb" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      console.error("Subscription purchase error:", err);
      setErrorMessage(err.message || "Failed to initialize payment process");
      setLoadingPlan(null);
    }
  };

  function renderCTAButton(plan: any, isCurrentPlan: boolean) {
    return (
      <div className="space-y-2 w-full mt-2">
        <button
          disabled={loadingPlan !== null || isCurrentPlan}
          onClick={() => handleSubscribe(plan.id)}
          className={cn(
            "w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]",
            isCurrentPlan
              ? isLight
                ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 cursor-default shadow-none'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 cursor-default shadow-none'
              : plan.popular
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/20'
              : isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
          )}
        >
          {loadingPlan === plan.id ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              Processing Payment...
            </>
          ) : isCurrentPlan ? (
            <>
              <ShieldCheck className="w-4 h-4" />
              Active Plan
            </>
          ) : isPro ? (
            <>
              <Calendar className="w-4 h-4" />
              Extend Subscription
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              {plan.ctaLabel}
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-slate-500 font-medium">
          🔒 Secure payment via Razorpay
        </p>
      </div>
    );
  }

  function PricingCard({ plan, isMobile }: { plan: any; isMobile: boolean }) {
    const isCurrentPlan = isPro && planId === plan.id;
    return (
      <div
        className={cn(
          "relative flex flex-col rounded-2xl border transition-all duration-300 p-5 sm:p-8 overflow-hidden backdrop-blur-sm",
          isLight
            ? plan.popular
              ? 'bg-white border-indigo-500 shadow-[0_10px_30px_rgba(99,102,241,0.08)]'
              : 'bg-white/80 border-slate-200/80 hover:border-slate-300 shadow-[0_4px_20px_rgba(15,23,42,0.02)]'
            : plan.popular
              ? 'bg-slate-900/60 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)]'
              : 'bg-slate-900/60 border-white/5 hover:border-white/10'
        )}
      >
        {plan.popular && (
          <div className="absolute top-0 right-0">
            <span className="inline-block bg-indigo-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl">
              Most Popular
            </span>
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between gap-2">
            <h3 className={cn("text-xl sm:text-2xl font-bold font-display", isLight ? "text-slate-900" : "text-white")}>{plan.name}</h3>
            {plan.savings && (
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30 whitespace-nowrap">
                {plan.savings}
              </span>
            )}
          </div>
          <p className={cn("text-xs min-h-[32px]", isLight ? "text-slate-500" : "text-slate-400")}>{plan.description}</p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn("text-4xl sm:text-5xl font-extrabold tracking-tight", isLight ? "text-slate-900" : "text-white")}>₹{plan.price}</span>
            <span className={cn("text-xs", isLight ? "text-slate-500" : "text-slate-400")}>/ {plan.period}</span>
          </div>
          {plan.savingsText && (
            <p className={cn("text-xs font-semibold", isLight ? "text-emerald-600" : "text-emerald-400")}>{plan.savingsText}</p>
          )}
        </div>

        {/* CTA (on mobile, CTA is ABOVE feature list; on desktop, it's at the bottom) */}
        {isMobile && renderCTAButton(plan, isCurrentPlan)}

        <hr className={cn("my-6", isLight ? "border-slate-100" : "border-white/5")} />

        {/* Features List */}
        <ul className="space-y-3.5 mb-8 flex-grow">
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className={cn("flex items-start gap-2.5 text-xs", isLight ? "text-slate-600" : "text-slate-300")}>
              <Check className={cn("w-4 h-4 shrink-0 mt-0.5", isLight ? "text-emerald-600" : "text-emerald-400")} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA (on desktop, CTA is at the bottom) */}
        {!isMobile && renderCTAButton(plan, isCurrentPlan)}
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:p-6 max-w-7xl mx-auto pb-36 lg:pb-8 w-full box-sizing-border-box overflow-x-hidden min-w-0">
      {/* Header Banner */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl border px-4 py-8 md:p-12 text-center space-y-4 transition-colors",
        isLight
          ? "bg-gradient-to-r from-indigo-50 via-indigo-100/70 to-indigo-50 border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.02)]"
          : "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-white/5"
      )}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider",
          isLight
            ? "bg-indigo-600/10 border border-indigo-600/20 text-indigo-700"
            : "bg-indigo-500/10 border border-indigo-500/30 text-indigo-300"
        )}>
          <Sparkles className="w-3.5 h-3.5" />
          Elevate Your Preparation
        </div>
        <h1 className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight leading-tight",
          isLight ? "text-slate-900" : "text-white"
        )} style={{ fontSize: 'clamp(28px, 6.5vw, 48px)' }}>
          Get SmartPrep <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-cyan-400 dark:to-indigo-400">Pro Access</span>
        </h1>
        <p className={cn(
          "max-w-xl mx-auto text-sm sm:text-base leading-relaxed",
          isLight ? "text-slate-600" : "text-slate-400"
        )}>
          Unlock smarter IAT preparation with premium practice, PYQs, analytics and personalized guidance.
        </p>

        {returnTo && (
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium max-w-md mx-auto transition-all border",
            isLight
              ? "bg-indigo-600/10 border-indigo-600/15 text-indigo-700"
              : "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
          )}>
            <AlertCircle className={cn("w-3.5 h-3.5 shrink-0", isLight ? "text-indigo-600" : "text-indigo-400")} />
            <span>{returnTo.replace('_', ' ').replace('/', '').toUpperCase()} requires Pro access</span>
          </div>
        )}
      </div>

      {/* Subscription Status Block */}
      {isPro && (
        <div className={cn(
          "p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border transition-colors",
          isLight
            ? "bg-emerald-500/5 border-emerald-500/20"
            : "bg-emerald-500/5 border-emerald-500/20"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center border",
              isLight
                ? "bg-emerald-50 border-emerald-500/25 text-emerald-600"
                : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            )}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className={cn("text-sm font-semibold", isLight ? "text-slate-900" : "text-white")}>Your Pro Membership is ACTIVE</p>
              <p className={cn("text-xs", isLight ? "text-slate-500" : "text-slate-400")}>
                Plan: <span className={cn("font-semibold", isLight ? "text-emerald-600" : "text-emerald-400")}>{planId?.toUpperCase() || 'LIFETIME'}</span>
                {expiresAt && ` · Expires on: ${new Date(expiresAt).toLocaleDateString()}`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={cn(
              "inline-block px-3 py-1 rounded-lg text-xs font-bold border",
              isLight
                ? "bg-emerald-50 text-emerald-700 border-emerald-500/20"
                : "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
            )}>
              {daysRemaining === 9999 ? 'LIFETIME ACCESS' : `${daysRemaining} Days Left`}
            </span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className={cn(
          "p-4 rounded-xl text-sm flex items-center gap-3 border transition-colors",
          isLight
            ? "bg-rose-50 border-rose-500/25 text-rose-700"
            : "bg-rose-500/10 border-rose-500/20 text-rose-300"
        )}>
          <AlertCircle className={cn("w-5 h-5 shrink-0", isLight ? "text-rose-600" : "text-rose-400")} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Mobile Plan Selector Segmented Switch */}
      <div className={cn(
        "flex lg:hidden w-full max-w-sm mx-auto p-1 rounded-xl border items-center justify-between transition-colors",
        isLight
          ? "bg-slate-100 border-slate-200/80"
          : "bg-slate-950 border-white/5"
      )}>
        <button
          onClick={() => setSelectedMobilePlan('monthly')}
          className={cn(
            "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
            selectedMobilePlan === 'monthly'
              ? 'bg-indigo-600 text-white shadow-md'
              : isLight
                ? 'text-slate-500 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
          )}
        >
          1 Month
        </button>
        <button
          onClick={() => setSelectedMobilePlan('six_month')}
          className={cn(
            "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
            selectedMobilePlan === 'six_month'
              ? 'bg-indigo-600 text-white shadow-md'
              : isLight
                ? 'text-slate-500 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
          )}
        >
          6 Months
        </button>
        <button
          onClick={() => setSelectedMobilePlan('annual')}
          className={cn(
            "flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
            selectedMobilePlan === 'annual'
              ? 'bg-indigo-600 text-white shadow-md'
              : isLight
                ? 'text-slate-500 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
          )}
        >
          1 Year
        </button>
      </div>

      {/* Desktop Pricing Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {PLANS.map((plan) => (
          <PricingCard key={plan.id} plan={plan} isMobile={false} />
        ))}
      </div>

      {/* Mobile Pricing Card */}
      <div className="block lg:hidden w-full">
        {PLANS.filter(p => p.id === selectedMobilePlan).map((plan) => (
          <PricingCard key={plan.id} plan={plan} isMobile={true} />
        ))}
      </div>

      {/* Shared Pro Value Section */}
      <div className={cn("space-y-6 pt-8 border-t transition-colors", isLight ? "border-slate-200/80" : "border-white/5")}>
        <div className="text-center space-y-2">
          <h2 className={cn("text-xl sm:text-2xl font-bold font-display", isLight ? "text-slate-900" : "text-white")}>Everything you need to prepare smarter</h2>
          <p className={cn("text-xs sm:text-sm max-w-lg mx-auto", isLight ? "text-slate-600" : "text-slate-400")}>
            Genuine tools and resources engineered to help you master the IAT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: '45+ Full-Length IAT Mocks', desc: 'Simulate the real exam with complete full-length test patterns.' },
            { title: 'Unlimited Chapter Quick Mocks', desc: 'Focus practice on specific chapters with rapid 16-question mocks.' },
            { title: 'Premium Concept Notes', desc: 'Master core topics with clear notes and advanced practice questions.' },
            { title: 'Real IAT PYQ Simulation', desc: 'Practice actual past year questions in a realistic exam player.' },
            { title: 'Smart Coach V2 Guidance', desc: 'Get AI-driven tips and direction tailored to your daily study progress.' },
            { title: 'Advanced Performance & Readiness Analytics', desc: 'Track chapter accuracies, identify weak areas, and predict performance.' },
            { title: 'Adaptive Spaced Revision', desc: 'Intelligently schedules concepts for review based on your retention.' }
          ].map((feat, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border flex items-start gap-3 transition-colors",
              isLight
                ? "border-slate-200/85 bg-white/80 shadow-[0_4px_16px_rgba(15,23,42,0.015)]"
                : "border-white/5 bg-slate-900/30"
            )}>
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center border shrink-0",
                isLight
                  ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                  : "bg-indigo-500/10 border-indigo-500/25 text-indigo-400"
              )}>
                <Check className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className={cn("text-xs sm:text-sm font-semibold", isLight ? "text-slate-800" : "text-white")}>{feat.title}</h4>
                <p className={cn("text-[11px] sm:text-xs leading-relaxed", isLight ? "text-slate-500" : "text-slate-400")}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={cn("space-y-6 pt-8 border-t transition-colors", isLight ? "border-slate-200/80" : "border-white/5")}>
        <h2 className={cn("text-lg sm:text-xl font-bold text-center font-display", isLight ? "text-slate-950" : "text-white")}>Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Can I change my plan later?",
              a: "Yes, you can upgrade to a longer duration plan at any time. Contact support to calculate your pro-rata adjustments."
            },
            {
              q: "What happens when my subscription expires?",
              a: "Your account will return to the free tier. You will lose access to premium mocks, notes, and analytics, but your history and progress will remain saved."
            },
            {
              q: "Is my payment secure?",
              a: "Absolutely. All transactions are securely processed via Razorpay, a PCI-DSS certified gateway. We never store your card details."
            },
            {
              q: "Do I keep my learning progress after expiry?",
              a: "Yes. Your mock attempts, lesson progress, and weak area analysis are safely retained. They will reactivate immediately when you subscribe again."
            }
          ].map((faq, i) => (
            <div key={i} className={cn(
              "p-4 rounded-xl border space-y-1.5 transition-colors",
              isLight
                ? "bg-white/80 border-slate-200/85 shadow-[0_4px_16px_rgba(15,23,42,0.015)]"
                : "bg-slate-900/20 border-white/5"
            )}>
              <h4 className={cn("text-xs sm:text-sm font-bold", isLight ? "text-slate-800" : "text-white")}>{faq.q}</h4>
              <p className={cn("text-[11px] sm:text-xs leading-relaxed", isLight ? "text-slate-500" : "text-slate-400")}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Shield */}
      <div className={cn(
        "flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl border text-center sm:text-left transition-colors",
        isLight
          ? "bg-white/80 border-slate-200/85 shadow-[0_8px_30px_rgba(15,23,42,0.02)]"
          : "bg-white/5 border-white/5"
      )}>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border shrink-0",
          isLight
            ? "bg-indigo-50 border-indigo-100 text-indigo-600"
            : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
        )}>
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-xl">
          <h4 className={cn("text-sm font-semibold", isLight ? "text-slate-800" : "text-white")}>Secure Payments via Razorpay</h4>
          <p className={cn("text-xs leading-relaxed", isLight ? "text-slate-500" : "text-slate-400")}>
            All transactions are encrypted and processed securely. Your card/banking credentials are never stored. Contact support at <a href="mailto:support@iisersmartprep.space" className="text-indigo-600 dark:text-indigo-400 font-semibold">support@iisersmartprep.space</a> if you have any questions.
          </p>
        </div>
      </div>
    </div>
  );
}
