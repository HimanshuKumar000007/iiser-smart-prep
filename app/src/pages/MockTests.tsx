import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Target, Lock, Clock, Trophy, Sparkles, X, ChevronRight, Activity, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '../lib/supabaseClient';

// Generate 32 mock tests
const fullMocks = Array.from({ length: 32 }, (_, i) => ({
  id: String(i + 1),
  title: `IAT Full Mock ${String(i + 1).padStart(2, '0')}`,
  difficulty: i % 3 === 0 ? 'High Difficulty' : 'Standard Difficulty',
  timeMin: 180,
  marks: 240,
  isFree: i < 2, // First 2 are free
  topic: 'Full Syllabus',
}));

const quickMocks = [
  { id: 'q1', title: 'Mechanics Quick Fire', difficulty: 'Standard', timeMin: 30, marks: 40, isFree: true, topic: 'Physics' },
  { id: 'q2', title: 'Organic Chemistry Drill', difficulty: 'High', timeMin: 45, marks: 60, isFree: false, topic: 'Chemistry' },
  { id: 'q3', title: 'Calculus Mastery', difficulty: 'High', timeMin: 45, marks: 60, isFree: false, topic: 'Math' },
  { id: 'q4', title: 'Genetics Review', difficulty: 'Standard', timeMin: 30, marks: 40, isFree: true, topic: 'Biology' },
  { id: 'q5', title: 'Thermodynamics Sprint', difficulty: 'Standard', timeMin: 30, marks: 40, isFree: false, topic: 'Physics' },
  { id: 'q6', title: 'Inorganic Chemistry', difficulty: 'Standard', timeMin: 30, marks: 40, isFree: false, topic: 'Chemistry' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

type TestItem = {
  id: string;
  isFree: boolean;
};

export default function MockTests() {
  const [activeTab, setActiveTab] = useState('full');
  const [showProModal, setShowProModal] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    async function loadPlan() {
      // 1. First check local storage for instant feedback
      const localPlan = localStorage.getItem('IAT_PLAN');
      if (localPlan === 'PRO' || localPlan === 'Premium') {
        setIsPro(true);
      }

      // 2. Fetch fresh from Supabase to be 100% sure
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('subscription')
        .eq('id', user.id)
        .single();
        
      if (data && (data.subscription === 'PRO' || data.subscription === 'Premium')) {
        setIsPro(true);
        localStorage.setItem('IAT_PLAN', 'PRO');
      }
    }
    loadPlan();
  }, []);

  const testsToDisplay = activeTab === 'full' ? fullMocks : quickMocks;

  const handleStartTest = (test: TestItem) => {
    if (!test.isFree && !isPro) {
      setShowProModal(true);
      return;
    }
    // Redirect to the actual test HTML page
    window.location.assign(`/mock_test/full_mock_test_homepage.html?test=${test.id}`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <Target className="w-8 h-8 text-indigo-400" />
            Mock Tests Library
          </h1>
          <p className="text-gray-400">Master the 2026 Exam Pattern with full-length and topic-wise mocks</p>
        </div>
      </motion.div>

      {/* Upsell Banner (Always visible to tease premium content unless logic added to hide for pro users) */}
      {!isPro && (
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex-1">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Unlock Full Access
            </h3>
            <p className="text-gray-300 max-w-xl">
              Get unrestricted access to 30+ Premium Mocks, AI Analytics, and dedicated performance tracking to secure your IISER seat.
            </p>
          </div>
          <div className="relative z-10">
            <Button
              onClick={() => setShowProModal(true)}
              className="bg-white text-indigo-900 hover:bg-indigo-50 font-semibold px-6 py-5 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all"
            >
              Upgrade to Pro — Just ₹249
            </Button>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
            <TabsTrigger value="full" className="rounded-lg data-[state=active]:bg-indigo-500 data-[state=active]:text-white px-6">
              Full Mocks
            </TabsTrigger>
            <TabsTrigger value="quick" className="rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white px-6">
              Quick Mocks
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Test Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {testsToDisplay.map((test, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: (index % 12) * 0.05 }}
              key={test.id}
              onClick={() => handleStartTest(test)}
              className={`
                relative p-5 rounded-2xl border transition-all duration-300 flex flex-col h-full cursor-pointer group
                ${test.isFree
                  ? 'bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/30 hover:border-indigo-500 hover:shadow-[0_4px_20px_rgba(79,70,229,0.15)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl flex items-center justify-center ${test.isFree ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/10 text-gray-400'}`}>
                  {activeTab === 'full' ? <Target className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                </div>
                {test.isFree ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                    FREE
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-300 flex items-center gap-1 border border-white/10">
                    <Lock className="w-3 h-3" /> PRO
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{test.title}</h3>
              <p className="text-xs text-gray-400 mb-4">{test.difficulty}</p>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-400 bg-black/20 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    {test.timeMin}m
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="flex items-center gap-1.5 font-medium">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    {test.marks}M
                  </div>
                </div>

                <Button
                  className={`w-full font-medium ${test.isFree 
                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-glow' 
                    : 'bg-white/10 hover:bg-white/20 text-white'}`}
                >
                  {test.isFree ? 'Start Test' : 'Unlock to Proceed'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pro Modal */}
      <AnimatePresence>
        {showProModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0B0F14] border border-white/10 w-full max-w-md rounded-3xl p-8 relative shadow-2xl overflow-hidden"
              >
                {/* Background glow in modal */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/20 blur-[50px] pointer-events-none" />

                <button
                  onClick={() => setShowProModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-6 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-glow mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Premium Test Locked</h2>
                  <p className="text-gray-400">Upgrade to Pro to access this test and 30+ other premium mocks.</p>
                </div>

                <div className="space-y-3 mb-8 relative z-10">
                  {[
                    'Full access to 32 IAT Mocks',
                    'Detailed Analytics & Reports',
                    'AI Tutor Doubts Assistant',
                    'Previous Year Papers'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="relative z-10">
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">₹249</span>
                    <span className="text-gray-500 line-through ml-2 text-sm">₹499</span>
                    <p className="text-xs text-green-400 mt-1 font-medium">Limited Time Offer</p>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-6 text-lg rounded-xl shadow-glow"
                    onClick={() => {
                      window.location.href = '/dashboard/upgrade_page.html';
                    }}
                  >
                    Unlock Pro Now
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
