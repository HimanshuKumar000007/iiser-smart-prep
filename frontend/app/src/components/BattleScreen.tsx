import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, CheckCircle2, XCircle, Zap, Trophy, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { BattleQuestion, User } from '../types';

interface BattleScreenProps {
  opponent: User;
  questions: BattleQuestion[];
  onFinish: (result: { playerScore: number; opponentScore: number; playerAnswers: boolean[] }) => void;
  onExit: () => void;
}

export default function BattleScreen({ opponent, questions, onFinish, onExit }: BattleScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState<boolean[]>([]);
  const [opponentAnswers, setOpponentAnswers] = useState<boolean[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const playerScore = playerAnswers.filter(Boolean).length;
  const opponentScore = opponentAnswers.filter(Boolean).length;

  // Timer countdown
  useEffect(() => {
    if (timeRemaining > 0 && !hasAnswered) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !hasAnswered) {
      handleAnswer(-1); // Time's up
    }
  }, [timeRemaining, hasAnswered]);

  // Simulate opponent answering
  useEffect(() => {
    if (!hasAnswered) {
      const opponentTime = Math.random() * 20 + 5; // 5-25 seconds
      const timer = setTimeout(() => {
        const isCorrect = Math.random() > 0.3; // 70% accuracy
        setOpponentAnswers(prev => [...prev, isCorrect]);
      }, opponentTime * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, hasAnswered]);

  const handleAnswer = (optionIndex: number) => {
    if (hasAnswered) return;

    setHasAnswered(true);
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    setPlayerAnswers(prev => [...prev, isCorrect]);

    // Show result briefly
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeRemaining(30);
        setHasAnswered(false);
        setSelectedOption(null);
      } else {
        onFinish({ playerScore: playerScore + (isCorrect ? 1 : 0), opponentScore, playerAnswers: [...playerAnswers, isCorrect] });
      }
    }, 1500);
  };

  const getStatusMessage = () => {
    if (playerScore > opponentScore) return { text: 'You are ahead!', icon: Flame, color: 'text-orange-400' };
    if (playerScore < opponentScore) return { text: 'Catch up!', icon: Zap, color: 'text-yellow-400' };
    return { text: 'Tie game!', icon: Trophy, color: 'text-indigo-400' };
  };

  const status = getStatusMessage();
  const StatusIcon = status.icon;

  return (
    <div className="h-full flex flex-col">
      {/* Battle Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Player side */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
              alt="You"
              className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500 ring-4 ring-indigo-500/20"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[#0B0F14]" />
          </div>
          <div>
            <p className="font-semibold text-white">You</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-indigo-400">{playerScore}</span>
              <span className="text-sm text-gray-400">pts</span>
            </div>
          </div>
        </motion.div>

        {/* VS & Timer */}
        <div className="text-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-400">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full
            ${timeRemaining <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-300'}
          `}>
            <Timer className="w-4 h-4" />
            <span className="font-mono font-bold">{timeRemaining}s</span>
          </div>
        </div>

        {/* Opponent side */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 flex-row-reverse text-right"
        >
          <div className="relative">
            <img
              src={opponent.avatar}
              alt={opponent.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 ring-4 ring-purple-500/20"
            />
            <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[#0B0F14]" />
          </div>
          <div>
            <p className="font-semibold text-white">{opponent.name}</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-2xl font-bold text-purple-400">{opponentScore}</span>
              <span className="text-sm text-gray-400">pts</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Banner */}
      <motion.div
        key={status.text}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          flex items-center justify-center gap-2 py-2 mb-6 rounded-full
          ${status.color} bg-white/5
        `}
      >
        <StatusIcon className="w-5 h-5" />
        <span className="font-medium">{status.text}</span>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          <div className="flex-1 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 mb-6">
            <h3 className="text-xl font-medium text-white mb-8 leading-relaxed">
              {currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrectness = hasAnswered;

                return (
                  <motion.button
                    key={index}
                    whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                    whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(index)}
                    disabled={hasAnswered}
                    className={`
                      relative p-4 rounded-xl text-left transition-all duration-200
                      ${showCorrectness 
                        ? isCorrect 
                          ? 'bg-green-500/20 border-2 border-green-500' 
                          : isSelected 
                            ? 'bg-red-500/20 border-2 border-red-500' 
                            : 'bg-white/5 border border-white/10 opacity-50'
                        : isSelected
                          ? 'bg-indigo-500/20 border-2 border-indigo-500'
                          : 'bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/[0.07]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`
                        w-8 h-8 rounded-lg flex items-center justify-center font-medium
                        ${showCorrectness
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : isSelected
                              ? 'bg-red-500 text-white'
                              : 'bg-white/10 text-gray-400'
                          : isSelected
                            ? 'bg-indigo-500 text-white'
                            : 'bg-white/10 text-gray-400'
                        }
                      `}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-white">{option}</span>
                    </div>

                    {showCorrectness && isCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      </motion.div>
                    )}

                    {showCorrectness && isSelected && !isCorrect && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <XCircle className="w-6 h-6 text-red-400" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Exit button */}
      <Button
        variant="ghost"
        onClick={onExit}
        className="self-center text-gray-400 hover:text-white"
      >
        Exit Battle
      </Button>
    </div>
  );
}
