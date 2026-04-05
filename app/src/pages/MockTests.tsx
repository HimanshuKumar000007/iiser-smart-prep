import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Target, Clock, Trophy, ChevronRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Generate 32 mock tests
const fullMocks = Array.from({ length: 32 }, (_, i) => ({
  id: String(i + 1),
  title: `IAT Full Mock ${String(i + 1).padStart(2, '0')}`,
  difficulty: i % 3 === 0 ? 'High Difficulty' : 'Standard Difficulty',
  timeMin: 180,
  marks: 240,
  topic: 'Full Syllabus',
}));

const quickMocks = [
  { id: 'q1', title: 'Mechanics Quick Fire', difficulty: 'Standard', timeMin: 30, marks: 40, topic: 'Physics' },
  { id: 'q2', title: 'Organic Chemistry Drill', difficulty: 'High', timeMin: 45, marks: 60, topic: 'Chemistry' },
  { id: 'q3', title: 'Calculus Mastery', difficulty: 'High', timeMin: 45, marks: 60, topic: 'Math' },
  { id: 'q4', title: 'Genetics Review', difficulty: 'Standard', timeMin: 30, marks: 40, topic: 'Biology' },
  { id: 'q5', title: 'Thermodynamics Sprint', difficulty: 'Standard', timeMin: 30, marks: 40, topic: 'Physics' },
  { id: 'q6', title: 'Inorganic Chemistry', difficulty: 'Standard', timeMin: 30, marks: 40, topic: 'Chemistry' },
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
};

export default function MockTests() {
  const [activeTab, setActiveTab] = useState('full');

  const testsToDisplay = activeTab === 'full' ? fullMocks : quickMocks;

  const handleStartTest = (test: TestItem) => {
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
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Target className="w-8 h-8 text-indigo-400" />
              Mock Tests Library
            </h1>
          </div>
          <p className="text-gray-400">Master the 2026 Exam Pattern with full-length and topic-wise mocks</p>
        </div>
      </motion.div>

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
              className="relative p-5 rounded-2xl border transition-all duration-300 flex flex-col h-full cursor-pointer group bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/30 hover:border-indigo-500 hover:shadow-[0_4px_20px_rgba(79,70,229,0.15)]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-xl flex items-center justify-center bg-indigo-500/20 text-indigo-400">
                  {activeTab === 'full' ? <Target className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors uppercase tracking-tight">{test.title}</h3>
              <p className="text-xs text-gray-400 mb-4 font-medium">{test.difficulty}</p>

              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-400 bg-black/20 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    {test.timeMin}m
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="flex items-center gap-1.5 font-medium">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    {test.marks}Marks
                  </div>
                </div>

                <Button
                  className="w-full font-bold h-11 rounded-xl transition-all bg-indigo-500 hover:bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                >
                  Start Test
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
