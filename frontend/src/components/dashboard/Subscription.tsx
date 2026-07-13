import React, { useState } from 'react';
import { useEntitlement } from '../../hooks/useEntitlement';
import { Sparkles, Check, ShieldCheck, AlertCircle, Calendar, CreditCard, Loader2 } from 'lucide-react';

interface SubscriptionProps {
  returnTo?: string;
  onNavigate?: (view: string) => void;
}

export function Subscription({ returnTo, onNavigate }: SubscriptionProps) {
  const { isPro, planId, expiresAt, daysRemaining, refresh } = useEntitlement();
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
      price: 1299,
      period: '6 months',
      savings: 'MOST POPULAR',
      savingsText: 'Save ₹1,095 vs monthly',
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
      name: 'Pro Lifetime Access',
      price: 2000,
      period: '1 year',
      savings: 'BEST VALUE',
      savingsText: 'Save ₹2,788 vs monthly',
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
          className={`w-full h-12 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            isCurrentPlan
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 cursor-default'
              : plan.popular
              ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98]'
              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-[0.98]'
          }`}
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
        className={`relative flex flex-col rounded-2xl border transition-all duration-300 p-5 sm:p-8 overflow-hidden bg-slate-900/60 backdrop-blur-sm ${
          plan.popular
            ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)]'
            : 'border-white/5 hover:border-white/10'
        }`}
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
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">{plan.name}</h3>
            {plan.savings && (
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30 whitespace-nowrap">
                {plan.savings}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 min-h-[32px]">{plan.description}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">₹{plan.price}</span>
            <span className="text-xs text-slate-400">/ {plan.period}</span>
          </div>
          {plan.savingsText && (
            <p className="text-xs font-semibold text-emerald-400">{plan.savingsText}</p>
          )}
        </div>

        {/* CTA (on mobile, CTA is ABOVE feature list; on desktop, it's at the bottom) */}
        {isMobile && renderCTAButton(plan, isCurrentPlan)}

        <hr className="border-white/5 my-6" />

        {/* Features List */}
        <ul className="space-y-3.5 mb-8 flex-grow">
          {plan.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-white/5 px-4 py-8 md:p-12 text-center space-y-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Elevate Your Preparation
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight" style={{ fontSize: 'clamp(28px, 6.5vw, 48px)' }}>
          Get SmartPrep <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Pro Access</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Unlock smarter IAT preparation with premium practice, PYQs, analytics and personalized guidance.
        </p>

        {returnTo && (
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium max-w-md mx-auto transition-all">
            <AlertCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>{returnTo.replace('_', ' ').replace('/', '').toUpperCase()} requires Pro access</span>
          </div>
        )}
      </div>

      {/* Subscription Status Block */}
      {isPro && (
        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Your Pro Membership is ACTIVE</p>
              <p className="text-xs text-slate-400">
                Plan: <span className="text-emerald-400 font-semibold">{planId?.toUpperCase() || 'LIFETIME'}</span>
                {expiresAt && ` · Expires on: ${new Date(expiresAt).toLocaleDateString()}`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              {daysRemaining === 9999 ? 'LIFETIME ACCESS' : `${daysRemaining} Days Left`}
            </span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Mobile Plan Selector Segmented Switch */}
      <div className="flex lg:hidden w-full max-w-sm mx-auto bg-slate-950 p-1 rounded-xl border border-white/5 items-center justify-between">
        <button
          onClick={() => setSelectedMobilePlan('monthly')}
          className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            selectedMobilePlan === 'monthly'
              ? 'bg-indigo-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          1 Month
        </button>
        <button
          onClick={() => setSelectedMobilePlan('six_month')}
          className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            selectedMobilePlan === 'six_month'
              ? 'bg-indigo-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          6 Months
        </button>
        <button
          onClick={() => setSelectedMobilePlan('annual')}
          className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            selectedMobilePlan === 'annual'
              ? 'bg-indigo-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
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
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Everything you need to prepare smarter</h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
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
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/25 text-indigo-400 shrink-0">
                <Check className="w-4.5 h-4.5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold text-white">{feat.title}</h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <h2 className="text-lg sm:text-xl font-bold text-white text-center font-display">Frequently Asked Questions</h2>
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
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-slate-900/20 space-y-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-white">{faq.q}</h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Shield */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-xl">
          <h4 className="text-sm font-semibold text-white">Secure Payments via Razorpay</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            All transactions are encrypted and processed securely. Your card/banking credentials are never stored. Contact support at <a href="mailto:support@iisersmartprep.space" className="text-indigo-400 font-semibold">support@iisersmartprep.space</a> if you have any questions.
          </p>
        </div>
      </div>
    </div>
  );
}
