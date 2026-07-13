import React, { useState } from 'react';
import { useEntitlement } from '../../hooks/useEntitlement';
import { Sparkles, Check, ShieldCheck, AlertCircle, Calendar, CreditCard, Loader2 } from 'lucide-react';

interface SubscriptionProps {
  returnTo?: string;
  onNavigate?: (view: string) => void;
}

export function Subscription({ returnTo, onNavigate }: SubscriptionProps) {
  const { isPro, status, planId, expiresAt, daysRemaining, refresh } = useEntitlement();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const PLANS = [
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: 399,
      period: 'month',
      savings: null,
      popular: false,
      description: 'Perfect for quick revision and checking out full mocks.',
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
      savings: 'Save ~46%',
      popular: true,
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
      savings: 'Best value for long-term',
      popular: false,
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

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-white/5 p-8 md:p-12 text-center space-y-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Elevate Your Preparation
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight">
          Get SmartPrep <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Pro Access</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Unlock the complete suite of premium AI diagnostics, PYQ pattern solvers, full-length test analysis, and study schedules.
        </p>

        {returnTo && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs max-w-md mx-auto">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>You need a Pro subscription to access <strong>{returnTo.replace('_', ' ').toUpperCase()}</strong>. Choose a plan to unlock instantly!</span>
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

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PLANS.map((plan) => {
          const isCurrentPlan = isPro && planId === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border transition-all duration-300 p-6 md:p-8 overflow-hidden bg-slate-900/60 backdrop-blur-sm ${
                plan.popular
                  ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)] scale-100 lg:scale-[1.03]'
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
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-display">{plan.name}</h3>
                  {plan.savings && (
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30">
                      {plan.savings}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">₹{plan.price}</span>
                  <span className="text-xs text-slate-400">/ {plan.period}</span>
                </div>
              </div>

              <hr className="border-white/5 my-0 mb-6" />

              {/* Features List */}
              <ul className="space-y-3.5 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <button
                disabled={loadingPlan !== null || isCurrentPlan}
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                  isCurrentPlan
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 cursor-default'
                    : plan.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.01]'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
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
                    Upgrade Now
                  </>
                )}
              </button>
            </div>
          );
        })}
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
