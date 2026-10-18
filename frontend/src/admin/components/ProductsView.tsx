import React from 'react';
import { Package, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { KpiCard } from './KpiCard';

interface ProductsViewProps {
  overviewStats?: any;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ overviewStats }) => {
  const plans = [
    {
      id: 'monthly_399',
      name: 'PRO Monthly',
      price: '₹399',
      duration: '30 Days Access',
      badge: 'Legacy Popular',
      features: [
        'Full Mock Tests (1-45)',
        'Detailed AI Explanations',
        'Smart Revision Engine',
        'Rank & Percentile Predictor',
        'Chapter Quizzes & Analytics'
      ]
    },
    {
      id: 'sprint_499',
      name: 'PRO Exam Sprint',
      price: '₹499',
      duration: '45 Days Access',
      badge: 'Exam Season',
      features: [
        'Everything in Monthly',
        'Full 45-Test Catalog',
        'High-Yield PYQ Archive',
        'Closed-Loop Mastery Path',
        'Priority Doubt Assistance'
      ]
    },
    {
      id: 'semester_599',
      name: 'PRO 6-Month',
      price: '₹599',
      duration: '180 Days Access',
      badge: 'Best Value',
      features: [
        '180-Day Unlimited Access',
        'Full Mock Test Engine',
        'Subject-Wise Analytics',
        'AI Study Coach',
        'Target IISER Roadmap'
      ]
    },
    {
      id: 'annual_899',
      name: 'PRO Annual Pass',
      price: '₹899',
      duration: '365 Days Access',
      badge: 'Complete Cycle',
      features: [
        'Full Year Access',
        'All Mock Tests & Updates',
        'Unlimited AI Doubt Solving',
        'Personalized Performance Review',
        'Direct Mentor Support'
      ]
    },
    {
      id: 'lifetime_1299',
      name: 'PRO Lifetime / 2-Year',
      price: '₹1,299',
      duration: '730 Days Access',
      badge: 'Maximum Access',
      features: [
        'Multi-Year IAT Preparation',
        'Full Mock Library Access',
        'Unconditional Cloud Sync',
        'All Future Course Expansions'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Active Pro Students"
          value={overviewStats?.proUsers?.value ?? null}
          icon={ShieldCheck}
          variant="amber"
          comparisonLabel="Users with active pro access"
        />
        <KpiCard
          title="Free Tier Students"
          value={overviewStats?.proUsers?.freeUsers ?? null}
          icon={Package}
          comparisonLabel="Eligible for upgrade"
        />
        <KpiCard
          title="Total Subscriptions Sold"
          value={overviewStats?.revenue?.successfulTransactions ?? null}
          icon={Zap}
          variant="success"
          comparisonLabel="Lifetime orders captured"
        />
        <KpiCard
          title="Platform Conversion Rate"
          value={overviewStats?.conversionRate?.label ?? null}
          icon={Sparkles}
          variant="indigo"
          comparisonLabel="Pro / Total ratio"
        />
      </div>

      {/* Plan Catalog Grid */}
      <div className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-6 shadow-lg shadow-black/20 backdrop-blur-md">
        <div className="mb-6">
          <h3 className="text-base font-bold text-white tracking-tight font-space">
            Active Subscription Plans
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Production tiers configured for IISER Aptitude Test (IAT) candidates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-950/60 p-5 hover:border-slate-700 transition-all shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 font-space">{p.name}</span>
                  <span className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono text-indigo-300 font-semibold">
                    {p.badge}
                  </span>
                </div>

                <div className="my-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-white font-space">{p.price}</span>
                  <span className="text-xs text-slate-400 font-mono">/ {p.duration}</span>
                </div>

                <div className="my-4 border-t border-slate-800/80 pt-3 space-y-2">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 text-center">
                <span className="text-[11px] font-mono text-slate-400">
                  Managed via Razorpay
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
