import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Swords,
  Zap,
  Target,
  Trophy,
  Users,
  Shuffle,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Home,
  TrendingUp,
  Award,
  Crown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BattleCard from '../components/BattleCard';
import BattleScreen from '../components/BattleScreen';
import type { BattleMode, User, BattleQuestion } from '../types';

const battleModes: BattleMode[] = [
  {
    id: 'quick',
    name: 'Quick Battle',
    description: 'Fast-paced 5-question duel',
    questionCount: 5,
    icon: <Zap className="w-6 h-6" />,
    color: '#f59e0b',
  },
  {
    id: 'standard',
    name: 'Standard Battle',
    description: 'Classic 15-question challenge',
    questionCount: 15,
    icon: <Target className="w-6 h-6" />,
    color: '#6366f1',
  },
  {
    id: 'topic',
    name: 'Topic-Based',
    description: 'Focus on specific subjects',
    questionCount: 10,
    icon: <Trophy className="w-6 h-6" />,
    color: '#22c55e',
  },
];

const mockOpponents: User[] = [
  { id: '1', name: 'Rahul Kumar', email: '', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&face', rank: 15, xp: 12500, accuracy: 88, questionsSolved: 980, streak: 5 },
  { id: '2', name: 'Priya Patel', email: '', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&face', rank: 8, xp: 15200, accuracy: 92, questionsSolved: 1200, streak: 12 },
  { id: '3', name: 'Vikram Rao', email: '', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&face', rank: 23, xp: 10800, accuracy: 85, questionsSolved: 850, streak: 3 },
  { id: '4', name: 'Ananya Singh', email: '', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&face', rank: 5, xp: 16800, accuracy: 94, questionsSolved: 1450, streak: 21 },
];

const mockQuestions: BattleQuestion[] = [
  {
    id: '1',
    question: 'In a right-angled triangle, if one angle is 30°, what is the ratio of the sides opposite to 30° and 90°?',
    options: ['1:2', '1:√2', '√3:2', '1:√3'],
    correctAnswer: 0,
    timeLimit: 30,
  },
  {
    id: '2',
    question: 'Which of the following is the correct IUPAC name for CH₃CH₂CH=CH₂?',
    options: ['1-butene', '2-butene', 'butane', 'butyne'],
    correctAnswer: 0,
    timeLimit: 30,
  },
  {
    id: '3',
    question: 'The work function of a metal is 2.5 eV. What is the maximum kinetic energy of photoelectrons emitted when light of wavelength 400 nm falls on it?',
    options: ['0.6 eV', '1.1 eV', '1.6 eV', '2.1 eV'],
    correctAnswer: 0,
    timeLimit: 30,
  },
  {
    id: '4',
    question: 'If the roots of x² + px + q = 0 are tan 30° and tan 15°, then the value of 2 + q - p is:',
    options: ['0', '1', '2', '3'],
    correctAnswer: 2,
    timeLimit: 30,
  },
  {
    id: '5',
    question: 'Which cell organelle is known as the "powerhouse of the cell"?',
    options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Ribosome'],
    correctAnswer: 1,
    timeLimit: 30,
  },
];

type BattleState = 'select-mode' | 'select-opponent' | 'in-battle' | 'result';

export default function Battles() {
  const [battleState, setBattleState] = useState<BattleState>('select-mode');
  const [selectedMode, setSelectedMode] = useState<BattleMode | null>(null);
  const [selectedOpponent, setSelectedOpponent] = useState<User | null>(null);
  const [opponentType, setOpponentType] = useState<'friend' | 'random'>('friend');
  const [battleResult, setBattleResult] = useState<{ playerScore: number; opponentScore: number; playerAnswers: boolean[] } | null>(null);

  const handleStartBattle = () => {
    if (selectedMode && (selectedOpponent || opponentType === 'random')) {
      setBattleState('in-battle');
    }
  };

  const handleBattleFinish = (result: { playerScore: number; opponentScore: number; playerAnswers: boolean[] }) => {
    setBattleResult(result);
    setBattleState('result');
  };

  const handleRematch = () => {
    setBattleState('in-battle');
    setBattleResult(null);
  };

  const handleExit = () => {
    setBattleState('select-mode');
    setSelectedMode(null);
    setSelectedOpponent(null);
    setBattleResult(null);
  };

  // Result Screen
  if (battleState === 'result' && battleResult && selectedOpponent) {
    const isWinner = battleResult.playerScore > battleResult.opponentScore;
    const isDraw = battleResult.playerScore === battleResult.opponentScore;
    const accuracy = Math.round((battleResult.playerScore / mockQuestions.length) * 100);
    const xpGained = isWinner ? 100 : isDraw ? 50 : 25;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center py-8"
      >
        {/* Winner Announcement */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className={`
            w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center
            ${isWinner ? 'bg-green-500/20' : isDraw ? 'bg-yellow-500/20' : 'bg-red-500/20'}
          `}>
            {isWinner ? (
              <Crown className="w-12 h-12 text-yellow-400" />
            ) : isDraw ? (
              <Award className="w-12 h-12 text-yellow-400" />
            ) : (
              <XCircle className="w-12 h-12 text-red-400" />
            )}
          </div>
          <h1 className={`
            text-4xl font-bold mb-2
            ${isWinner ? 'text-green-400' : isDraw ? 'text-yellow-400' : 'text-red-400'}
          `}>
            {isWinner ? 'Victory!' : isDraw ? 'Draw!' : 'Defeat!'}
          </h1>
          <p className="text-gray-400">
            {isWinner 
              ? 'You dominated the battlefield!' 
              : isDraw 
                ? 'A worthy opponent!' 
                : 'Better luck next time!'}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <Target className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
            <p className="text-3xl font-bold">{accuracy}%</p>
            <p className="text-sm text-gray-400">Accuracy</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <p className="text-3xl font-bold">{battleResult.playerScore}</p>
            <p className="text-sm text-gray-400">Correct Answers</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <p className="text-3xl font-bold">+{xpGained}</p>
            <p className="text-sm text-gray-400">XP Gained</p>
          </motion.div>
        </div>

        {/* Score Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-xl p-6 rounded-2xl bg-white/5 border border-white/10 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&face"
                alt="You"
                className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-indigo-500"
              />
              <p className="font-semibold">You</p>
              <p className="text-2xl font-bold text-indigo-400">{battleResult.playerScore}</p>
            </div>
            <div className="text-4xl font-bold text-gray-500">VS</div>
            <div className="text-center">
              <img
                src={selectedOpponent.avatar}
                alt={selectedOpponent.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-purple-500"
              />
              <p className="font-semibold">{selectedOpponent.name}</p>
              <p className="text-2xl font-bold text-purple-400">{battleResult.opponentScore}</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4"
        >
          <Button
            onClick={handleRematch}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Rematch
          </Button>
          <Button
            variant="outline"
            onClick={handleExit}
            className="px-6 py-3 border-white/10 hover:bg-white/5"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // Live Battle Screen
  if (battleState === 'in-battle' && selectedMode && selectedOpponent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full"
      >
        <BattleScreen
          opponent={selectedOpponent}
          questions={mockQuestions}
          onFinish={handleBattleFinish}
          onExit={handleExit}
        />
      </motion.div>
    );
  }

  // Pre-Battle UI
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-glow"
        >
          <Swords className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">Battle Arena</h1>
        <p className="text-gray-400">Challenge your peers and test your knowledge</p>
      </div>

      {/* Step 1: Select Mode */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">1</span>
          Select Battle Mode
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {battleModes.map((mode, index) => (
            <BattleCard
              key={mode.id}
              mode={mode}
              isSelected={selectedMode?.id === mode.id}
              onClick={() => setSelectedMode(mode)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Step 2: Select Opponent */}
      <AnimatePresence>
        {selectedMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">2</span>
              Choose Your Opponent
            </h2>

            <Tabs value={opponentType} onValueChange={(v) => setOpponentType(v as 'friend' | 'random')}>
              <TabsList className="mb-4 bg-white/5 border border-white/10">
                <TabsTrigger value="friend" className="data-[state=active]:bg-indigo-500">
                  <Users className="w-4 h-4 mr-2" />
                  Friends
                </TabsTrigger>
                <TabsTrigger value="random" className="data-[state=active]:bg-indigo-500">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Random
                </TabsTrigger>
              </TabsList>

              {opponentType === 'friend' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mockOpponents.map((opponent, index) => (
                    <motion.button
                      key={opponent.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedOpponent(opponent)}
                      className={`
                        flex items-center gap-4 p-4 rounded-xl border transition-all
                        ${selectedOpponent?.id === opponent.id
                          ? 'bg-indigo-500/10 border-indigo-500'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <img
                        src={opponent.avatar}
                        alt={opponent.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 text-left">
                        <p className="font-medium">{opponent.name}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            #{opponent.rank}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {opponent.accuracy}%
                          </span>
                        </div>
                      </div>
                      {selectedOpponent?.id === opponent.id && (
                        <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
                >
                  <Shuffle className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                  <h3 className="text-lg font-semibold mb-2">Random Matchmaking</h3>
                  <p className="text-gray-400 mb-4">We'll find an opponent with similar skill level</p>
                  <p className="text-sm text-indigo-400">Estimated wait time: ~30 seconds</p>
                </motion.div>
              )}
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Battle Button */}
      <AnimatePresence>
        {(selectedMode && (selectedOpponent || opponentType === 'random')) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartBattle}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-glow hover:shadow-glow-lg transition-shadow"
            >
              <Swords className="w-6 h-6" />
              Start Battle
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
