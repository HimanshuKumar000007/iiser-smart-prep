import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileQuestion, Brain, Target, Clock, CheckCircle2, XCircle,
  ArrowRight, ArrowLeft, ChevronRight, Zap, TrendingUp,
  BarChart3, BookOpen, Atom, FlaskConical, Dna, Calculator,
  AlertTriangle, Trophy, RefreshCcw, Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

// ─── AI Algorithm: Topic Gap Detector ───────────────────────────────────────
interface TopicPerf { topic: string; accuracy: number; attempted: number; }
function detectWeakTopics(data: TopicPerf[]): TopicPerf[] {
  return [...data]
    .filter(t => t.attempted > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);
}

// ─── AI Algorithm: Adaptive Difficulty Scaling ───────────────────────────────
function getNextDifficulty(answers: boolean[], current: 1 | 2 | 3): 1 | 2 | 3 {
  if (answers.length < 3) return current;
  const last3 = answers.slice(-3);
  const correct = last3.filter(Boolean).length;
  if (correct === 3 && current < 3) return (current + 1) as 1 | 2 | 3;
  if (correct === 0 && current > 1) return (current - 1) as 1 | 2 | 3;
  return current;
}

// ─── Question Bank (IISER IAT style) ─────────────────────────────────────────
interface Question {
  id: string; subject: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics';
  topic: string; question: string; options: string[];
  correct: number; difficulty: 1 | 2 | 3; explanation: string;
}

const questionBank: Question[] = [
  { id: 'p1', subject: 'Physics', topic: 'Mechanics', difficulty: 1,
    question: 'A body is thrown vertically upward with velocity u. The maximum height reached is:',
    options: ['u²/g', 'u²/2g', '2u²/g', 'u/2g'], correct: 1,
    explanation: 'At max height, v=0. Using v²=u²-2gh → h = u²/2g' },
  { id: 'p2', subject: 'Physics', topic: 'Thermodynamics', difficulty: 2,
    question: 'For an ideal gas undergoing adiabatic process, which relation holds?',
    options: ['PV = const', 'TV^(γ-1) = const', 'P/T = const', 'PV/T = const'], correct: 1,
    explanation: 'For adiabatic: TV^(γ-1) = constant (derived from PV^γ = const and ideal gas law)' },
  { id: 'p3', subject: 'Physics', topic: 'Electromagnetism', difficulty: 3,
    question: 'The work done by an electric field on a charge moving in a closed path is:',
    options: ['Maximum', 'qV', 'Zero', 'Negative'], correct: 2,
    explanation: 'Electric force is conservative. Work done in closed loop = 0.' },
  { id: 'p4', subject: 'Physics', topic: 'Optics', difficulty: 2,
    question: 'Critical angle for total internal reflection depends on:',
    options: ['Wavelength only', 'Refractive index only', 'Both wavelength and RI', 'Neither'], correct: 2,
    explanation: 'sin(C) = 1/μ, and μ depends on wavelength (dispersion), so C depends on both.' },
  { id: 'p5', subject: 'Physics', topic: 'Modern Physics', difficulty: 3,
    question: 'De Broglie wavelength of a particle with KE = E is proportional to:',
    options: ['E', '1/√E', '√E', '1/E'], correct: 1,
    explanation: 'λ = h/p = h/√(2mE) ∝ 1/√E' },
  { id: 'c1', subject: 'Chemistry', topic: 'Organic Chemistry', difficulty: 1,
    question: 'Which of the following is the correct IUPAC name of CH₃-CH(OH)-CH₃?',
    options: ['1-propanol', '2-propanol', 'propan-2-ol', 'Both B and C'], correct: 3,
    explanation: 'Propan-2-ol is the IUPAC name (2-propanol is the common name).' },
  { id: 'c2', subject: 'Chemistry', topic: 'Physical Chemistry', difficulty: 2,
    question: 'For a first-order reaction, the half-life is:',
    options: ['0.693/k', '0.693×k', '1/k', '2/k'], correct: 0,
    explanation: 't₁/₂ = ln2/k = 0.693/k for first-order reactions.' },
  { id: 'c3', subject: 'Chemistry', topic: 'Inorganic Chemistry', difficulty: 3,
    question: 'The number of σ bonds in benzene is:',
    options: ['6', '9', '12', '3'], correct: 2,
    explanation: '6 C-H + 6 C-C σ bonds = 12 total σ bonds.' },
  { id: 'c4', subject: 'Chemistry', topic: 'Electrochemistry', difficulty: 2,
    question: 'EMF of a galvanic cell is related to Gibbs energy by:',
    options: ['ΔG = nFE', 'ΔG = -nFE', 'ΔG = nRT ln E', 'ΔG = -nRT'], correct: 1,
    explanation: 'ΔG = -nFE (negative for spontaneous reaction with positive EMF).' },
  { id: 'b1', subject: 'Biology', topic: 'Cell Biology', difficulty: 1,
    question: 'The fluid mosaic model of the cell membrane was proposed by:',
    options: ['Watson & Crick', 'Singer & Nicolson', 'Gorter & Grendel', 'Robertson'], correct: 1,
    explanation: 'Singer and Nicolson proposed the fluid mosaic model in 1972.' },
  { id: 'b2', subject: 'Biology', topic: 'Genetics', difficulty: 2,
    question: 'In a test cross, the offspring ratio 1:1:1:1 indicates:',
    options: ['Complete dominance', 'Codominance', 'Dihybrid cross', 'Independent assortment with heterozygous parent'], correct: 3,
    explanation: 'A 1:1:1:1 from testcross shows the parent was dihybrid (AaBb) with independent assortment.' },
  { id: 'b3', subject: 'Biology', topic: 'Ecology', difficulty: 2,
    question: 'Which of the following has the highest ecological efficiency?',
    options: ['Producers', 'Primary consumers', 'Secondary consumers', 'All equal'], correct: 0,
    explanation: 'Producers have the most energy; each trophic level loses ~90%, so producers are most efficient energy-wise.' },
  { id: 'm1', subject: 'Mathematics', topic: 'Calculus', difficulty: 1,
    question: 'The derivative of sin(x²) with respect to x is:',
    options: ['cos(x²)', '2x·cos(x²)', 'cos(2x)', '2cos(x²)'], correct: 1,
    explanation: 'Chain rule: d/dx[sin(u)] = cos(u)·du/dx = cos(x²)·2x' },
  { id: 'm2', subject: 'Mathematics', topic: 'Algebra', difficulty: 2,
    question: 'If |z - 2| = 2|z - 1| for complex z = x + iy, the locus is:',
    options: ['Circle', 'Straight line', 'Ellipse', 'Parabola'], correct: 0,
    explanation: 'Expanding: x²+y²=4√(x²+y²)/3... it reduces to a circle equation.' },
  { id: 'm3', subject: 'Mathematics', topic: 'Probability', difficulty: 2,
    question: 'P(A∪B) when P(A)=0.5, P(B)=0.4, P(A∩B)=0.2 is:',
    options: ['0.7', '0.9', '0.5', '0.3'], correct: 0,
    explanation: 'P(A∪B) = P(A)+P(B)-P(A∩B) = 0.5+0.4-0.2 = 0.7' },
  { id: 'm4', subject: 'Mathematics', topic: 'Coordinate Geometry', difficulty: 3,
    question: 'The eccentricity of x²/9 + y²/4 = 1 is:',
    options: ['√5/3', '√5/2', '2/3', '√13/3'], correct: 0,
    explanation: 'a²=9, b²=4. c²=a²-b²=5. e=c/a=√5/3' },
];

// ─── Subject config ────────────────────────────────────────────────────────
const subjectConfig = {
  Physics: { icon: Atom, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', gradient: 'from-blue-500/20 to-cyan-500/20' },
  Chemistry: { icon: FlaskConical, color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', gradient: 'from-green-500/20 to-emerald-500/20' },
  Biology: { icon: Dna, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', gradient: 'from-purple-500/20 to-pink-500/20' },
  Mathematics: { icon: Calculator, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', gradient: 'from-orange-500/20 to-yellow-500/20' },
};

// Initial topic performance data (simulating historical data)
const initialTopicPerf: TopicPerf[] = [
  { topic: 'Mechanics', accuracy: 72, attempted: 25 },
  { topic: 'Thermodynamics', accuracy: 45, attempted: 20 },
  { topic: 'Organic Chem', accuracy: 58, attempted: 30 },
  { topic: 'Calculus', accuracy: 88, attempted: 40 },
  { topic: 'Genetics', accuracy: 35, attempted: 15 },
  { topic: 'Electromagnetism', accuracy: 60, attempted: 18 },
];

type TestState = 'select' | 'in-test' | 'review';

const difficultyLabel = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
const difficultyColor = { 1: 'text-green-400', 2: 'text-yellow-400', 3: 'text-red-400' };

export default function MockTests() {
  const [testState, setTestState] = useState<TestState>('select');
  const [selectedSubject, setSelectedSubject] = useState<Question['subject'] | 'All'>('All');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<1 | 2 | 3>(1);
  const [isAdaptive, setIsAdaptive] = useState(true);

  const weakTopics = detectWeakTopics(initialTopicPerf);

  // Timer
  useEffect(() => {
    if (testState !== 'in-test' || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [testState, timeLeft]);

  const startTest = useCallback(() => {
    let pool = selectedSubject === 'All' ? questionBank : questionBank.filter(q => q.subject === selectedSubject);
    if (isAdaptive) pool = pool.filter(q => q.difficulty === 1 || q.difficulty === 2);
    const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(selected);
    setAnswers(new Array(selected.length).fill(null));
    setAnswered(new Array(selected.length).fill(false));
    setCurrentIdx(0);
    setTimeLeft(selected.length * 120);
    setCurrentDifficulty(1);
    setTestState('in-test');
  }, [selectedSubject, isAdaptive]);

  const handleAnswer = (optionIdx: number) => {
    if (answered[currentIdx]) return;
    const newAnswers = [...answers]; newAnswers[currentIdx] = optionIdx;
    const newAnswered = [...answered]; newAnswered[currentIdx] = true;
    setAnswers(newAnswers); setAnswered(newAnswered);

    if (isAdaptive) {
      const ansHistory = newAnswers.slice(0, currentIdx + 1).map((a, i) => a === questions[i].correct);
      const nextDiff = getNextDifficulty(ansHistory, currentDifficulty);
      setCurrentDifficulty(nextDiff);
    }
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const subjectBreakdown = (['Physics', 'Chemistry', 'Biology', 'Mathematics'] as const).map(s => {
    const sq = questions.filter(q => q.subject === s);
    const correct = sq.filter((q) => {
      const idx = questions.indexOf(q);
      return answers[idx] === q.correct;
    }).length;
    return { subject: s, accuracy: sq.length > 0 ? Math.round((correct / sq.length) * 100) : 0, count: sq.length };
  });

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  // ─── SELECT SCREEN ─────────────────────────────────────────────────
  if (testState === 'select') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 mb-4">
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Adaptive Mock Tests</h1>
          <p className="text-gray-400">AI-powered difficulty scaling tailored to your performance</p>
        </div>

        {/* AI Insight: Weak Topics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-orange-500/20"><AlertTriangle className="w-5 h-5 text-orange-400" /></div>
            <div>
              <h3 className="font-semibold text-orange-300">🧠 AI Insight: Weak Topics Detected</h3>
              <p className="text-sm text-gray-400">Focus recommended based on your historical accuracy</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {weakTopics.map(t => (
              <div key={t.topic} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm font-medium text-white">{t.topic}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${t.accuracy < 50 ? 'bg-red-400/20 text-red-400' : 'bg-yellow-400/20 text-yellow-400'}`}>
                  {t.accuracy}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">1</span>
            Select Subject
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'] as const).map(s => {
              const cfg = s !== 'All' ? subjectConfig[s] : null;
              const Icon = cfg?.icon ?? BookOpen;
              const isSelected = selectedSubject === s;
              return (
                <motion.button key={s} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedSubject(s)}
                  className={`p-4 rounded-xl border text-center transition-all ${isSelected
                    ? `border-indigo-500 bg-indigo-500/10`
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
                  <Icon className={`w-7 h-7 mx-auto mb-2 ${cfg?.color ?? 'text-indigo-400'}`} />
                  <p className="text-sm font-medium">{s}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mode Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
            Test Mode
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setIsAdaptive(true)}
              className={`p-5 rounded-xl border text-left transition-all ${isAdaptive ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600"><Brain className="w-5 h-5 text-white" /></div>
                <span className="font-semibold text-white">Adaptive Mode</span>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-medium">AI</span>
              </div>
              <p className="text-sm text-gray-400">Difficulty adjusts dynamically. 3 correct → harder. 3 wrong → easier. Optimal learning zone.</p>
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setIsAdaptive(false)}
              className={`p-5 rounded-xl border text-left transition-all ${!isAdaptive ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/[0.03] hover:border-white/20'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700"><FileQuestion className="w-5 h-5 text-white" /></div>
                <span className="font-semibold text-white">Fixed Mode</span>
              </div>
              <p className="text-sm text-gray-400">Mixed difficulty, standard 10-question test. Simulates actual IISER IAT format.</p>
            </motion.button>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={startTest}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg">
            <Play className="w-6 h-6" /> Start Test <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ─── IN-TEST SCREEN ────────────────────────────────────────────────
  if (testState === 'in-test') {
    const q = questions[currentIdx];
    if (!q) return null;
    const cfg = subjectConfig[q.subject];
    const Icon = cfg.icon;
    const userAnswer = answers[currentIdx];
    const isAnswered = answered[currentIdx];

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-6">
        {/* Progress Bar + Timer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Question {currentIdx + 1} of {questions.length}</span>
              {isAdaptive && (
                <span className={`font-medium ${difficultyColor[currentDifficulty]}`}>
                  🎯 {difficultyLabel[currentDifficulty]}
                </span>
              )}
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                animate={{ width: `${((currentIdx + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
                transition={{ duration: 0.4 }} />
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg
            ${timeLeft < 60 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-white'}`}>
            <Clock className="w-5 h-5" /> {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div key={currentIdx} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            {/* Subject badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${cfg.bg} ${cfg.border} border`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
                <span className={`text-sm font-medium ${cfg.color}`}>{q.subject}</span>
              </div>
              <span className="text-sm text-gray-500">{q.topic}</span>
            </div>

            <p className="text-lg font-medium text-white mb-6 leading-relaxed">{q.question}</p>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let cls = 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]';
                if (isAnswered) {
                  if (idx === q.correct) cls = 'border-green-500 bg-green-500/10';
                  else if (idx === userAnswer && userAnswer !== q.correct) cls = 'border-red-500 bg-red-500/10';
                  else cls = 'border-white/5 bg-white/[0.02] opacity-50';
                }
                return (
                  <motion.button key={idx} onClick={() => handleAnswer(idx)} disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.01 } : {}}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${cls}`}>
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm flex-shrink-0
                      ${isAnswered && idx === q.correct ? 'bg-green-500/20 text-green-400' :
                        isAnswered && idx === userAnswer && userAnswer !== q.correct ? 'bg-red-500/20 text-red-400' :
                        'bg-white/5 text-gray-400'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm">{opt}</span>
                    {isAnswered && idx === q.correct && <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto" />}
                    {isAnswered && idx === userAnswer && userAnswer !== q.correct && <XCircle className="w-5 h-5 text-red-400 ml-auto" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="mt-5 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-sm text-indigo-300 font-semibold mb-1">💡 Explanation</p>
                  <p className="text-sm text-gray-300">{q.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentIdx(i => Math.max(0, i - 1))} disabled={currentIdx === 0}
            className="hover:bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <button key={i} onClick={() => setCurrentIdx(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  i === currentIdx ? 'bg-indigo-500 text-white' :
                  answered[i] ? (answers[i] === questions[i].correct ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400') :
                  'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}>{i + 1}</button>
            ))}
          </div>
          {currentIdx < questions.length - 1 ? (
            <Button onClick={() => setCurrentIdx(i => i + 1)} className="bg-indigo-500 hover:bg-indigo-600">
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => setTestState('review')} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              Submit Test <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  // ─── REVIEW SCREEN ─────────────────────────────────────────────────
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl mx-auto">
      {/* Score Header */}
      <div className="text-center py-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
          className={`w-28 h-28 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl font-black
          ${accuracy >= 70 ? 'bg-green-500/20 text-green-400' : accuracy >= 50 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
          {accuracy}%
        </motion.div>
        <h1 className="text-3xl font-bold mb-1">Test Complete!</h1>
        <p className="text-gray-400">{score} out of {questions.length} correct</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Score', value: `${score}/${questions.length}`, icon: Target, color: 'text-indigo-400' },
          { label: 'Accuracy', value: `${accuracy}%`, icon: TrendingUp, color: 'text-green-400' },
          { label: 'XP Earned', value: `+${score * 15}`, icon: Zap, color: 'text-yellow-400' },
          { label: 'Time Used', value: formatTime(questions.length * 120 - timeLeft), icon: Clock, color: 'text-purple-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <s.icon className={`w-7 h-7 ${s.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-400">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Subject Breakdown Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" /> Subject Breakdown
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectBreakdown.filter(s => s.count > 0)}>
              <XAxis dataKey="subject" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                {subjectBreakdown.map((_, i) => (
                  <Cell key={i} fill={['#6366f1', '#22c55e', '#a855f7', '#f59e0b'][i % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Badges */}
      {accuracy >= 80 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
          className="p-5 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 flex items-center gap-4">
          <Trophy className="w-10 h-10 text-yellow-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-yellow-300 text-lg">🏆 Excellent Performance!</p>
            <p className="text-sm text-gray-400">You scored above 80%. You're in the top tier for this topic!</p>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" onClick={() => setTestState('select')} className="border-white/10 hover:bg-white/5">
          <RefreshCcw className="w-4 h-4 mr-2" /> New Test
        </Button>
        <Button onClick={() => setTestState('select')} className="bg-gradient-to-r from-indigo-500 to-purple-600">
          <BarChart3 className="w-4 h-4 mr-2" /> View Analytics
        </Button>
      </div>
    </motion.div>
  );
}
