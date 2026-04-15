import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, Sparkles, BookOpen, Clock, RotateCcw,
  Brain, Star, TrendingUp, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ─── SM-2 Spaced Repetition Algorithm ────────────────────────────────────────
interface FlashCard {
  id: string; front: string; back: string; subject: string; topic: string;
  interval: number; repetitions: number; ef: number; nextReview: Date; dueNow: boolean;
}

function sm2Update(card: FlashCard, quality: 0 | 1 | 2 | 3 | 4 | 5): FlashCard {
  let { interval, repetitions, ef } = card;
  if (quality < 3) { repetitions = 0; interval = 1; }
  else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ef);
    repetitions += 1;
  }
  ef = Math.max(1.3, ef + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  const nextReview = new Date(); nextReview.setDate(nextReview.getDate() + interval);
  return { ...card, interval, repetitions, ef, nextReview, dueNow: false };
}

// ─── Keyword → Concept Mapping AI ────────────────────────────────────────────
interface Concept { title: string; explanation: string; formula?: string; relatedTopics: string[]; }
const conceptDB: Record<string, Concept> = {
  'newton': { title: "Newton's Laws of Motion", explanation: "Three fundamental laws describing the relationship between a body and forces acting upon it.", formula: "F = ma (2nd Law)", relatedTopics: ['momentum', 'friction', 'gravity'] },
  'photosynthesis': { title: "Photosynthesis", explanation: "Process by which plants convert light energy into chemical energy stored in glucose.", formula: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂", relatedTopics: ['chlorophyll', 'ATP', 'Calvin cycle'] },
  'derivative': { title: "Derivatives (Calculus)", explanation: "Rate of change of a function with respect to a variable.", formula: "f'(x) = lim(h→0) [f(x+h)-f(x)]/h", relatedTopics: ['limits', 'chain rule', 'integration'] },
  'entropy': { title: "Entropy (Thermodynamics)", explanation: "Measure of disorder/randomness in a system. Always increases in spontaneous processes.", formula: "ΔS = Q_rev / T", relatedTopics: ['gibbs free energy', 'second law', 'enthalpy'] },
  'orbital': { title: "Atomic Orbitals", explanation: "Regions of probability where electrons are likely found around the nucleus.", formula: "Energy = -13.6/n² eV (H-atom)", relatedTopics: ['quantum numbers', 'Hund rule', 'Aufbau principle'] },
  'dna': { title: "DNA Structure", explanation: "Double helix molecule carrying genetic information. Made of nucleotides with A-T and G-C base pairing.", formula: "Chargaff's rule: [A]=[T], [G]=[C]", relatedTopics: ['replication', 'transcription', 'mutation'] },
  'integration': { title: "Integration (Calculus)", explanation: "Process of finding the area under a curve or the antiderivative of a function.", formula: "∫xⁿdx = xⁿ⁺¹/(n+1) + C", relatedTopics: ['derivative', 'area', 'differential equations'] },
  'wave': { title: "Wave Motion", explanation: "Transfer of energy through a medium without net movement of matter.", formula: "v = fλ, f = 1/T", relatedTopics: ['interference', 'diffraction', 'Doppler effect'] },
  'mole': { title: "Mole Concept", explanation: "A mole contains 6.022×10²³ particles (Avogadro's number). Used to count atoms and molecules.", formula: "n = m/M = PV/RT", relatedTopics: ['stoichiometry', 'molarity', 'gas laws'] },
  'mitosis': { title: "Mitosis", explanation: "Type of cell division producing two identical daughter cells. Phases: PMAT (Prophase, Metaphase, Anaphase, Telophase).", relatedTopics: ['meiosis', 'cell cycle', 'chromosome'] },
};

function findConcept(query: string): Concept | null {
  const q = query.toLowerCase();
  for (const [key, val] of Object.entries(conceptDB)) {
    if (q.includes(key)) return val;
  }
  return null;
}

// ─── AI Response Generator ────────────────────────────────────────────────────
function generateAIResponse(userQuery: string): string {
  const concept = findConcept(userQuery);
  if (concept) {
    let resp = `**${concept.title}**\n\n${concept.explanation}`;
    if (concept.formula) resp += `\n\n📐 **Formula:** \`${concept.formula}\``;
    if (concept.relatedTopics.length) resp += `\n\n🔗 **Related Topics:** ${concept.relatedTopics.join(', ')}`;
    return resp;
  }
  if (userQuery.toLowerCase().includes('rank') || userQuery.toLowerCase().includes('iiser')) {
    return "For IISER IAT, focus on NCERT thoroughly for Biology and Chemistry. For Physics and Math, solve NCERT + HC Verma/RD Sharma. Aim for 70%+ accuracy in each subject for a good rank.";
  }
  if (userQuery.toLowerCase().includes('study') || userQuery.toLowerCase().includes('plan')) {
    return "📅 **Smart Study Plan:**\n\n1. Study weak topics first (use your analytics page)\n2. Use Pomodoro: 25 min study, 5 min break\n3. Review yesterday's notes before starting new content\n4. Solve 20-30 questions daily per subject\n5. Weekly mock test to track progress";
  }
  return `I understand you're asking about "${userQuery}". Try asking me about specific topics like **Newton's Laws**, **Photosynthesis**, **Integration**, **DNA**, **Entropy**, **Orbitals**, **Mole Concept**, **Wave Motion**, or **Mitosis** for detailed concept breakdowns with formulas.`;
}

// ─── Flash Card Data (Spaced Repetition) ─────────────────────────────────────
const initialCards: FlashCard[] = [
  { id: '1', front: 'What is the work-energy theorem?', back: 'Work done by net force = Change in KE: W = ΔKE = ½mv² - ½mu²', subject: 'Physics', topic: 'Mechanics', interval: 1, repetitions: 0, ef: 2.5, nextReview: new Date(), dueNow: true },
  { id: '2', front: 'State Le Chatelier\'s principle', back: 'If a system at equilibrium is disturbed, it shifts to counteract the disturbance and restore equilibrium.', subject: 'Chemistry', topic: 'Equilibrium', interval: 3, repetitions: 1, ef: 2.3, nextReview: new Date(), dueNow: true },
  { id: '3', front: 'Define mitosis', back: 'Cell division producing 2 genetically identical daughter cells. Phases: Prophase, Metaphase, Anaphase, Telophase.', subject: 'Biology', topic: 'Cell Biology', interval: 1, repetitions: 0, ef: 2.5, nextReview: new Date(), dueNow: true },
  { id: '4', front: 'Product rule of differentiation', back: 'd/dx[u·v] = u·dv/dx + v·du/dx', subject: 'Mathematics', topic: 'Calculus', interval: 7, repetitions: 2, ef: 2.6, nextReview: new Date(Date.now() + 86400000 * 5), dueNow: false },
  { id: '5', front: 'What is Avogadro\'s number?', back: '6.022 × 10²³ particles per mole of substance', subject: 'Chemistry', topic: 'Mole Concept', interval: 14, repetitions: 3, ef: 2.7, nextReview: new Date(Date.now() + 86400000 * 10), dueNow: false },
  { id: '6', front: 'Doppler effect formula', back: 'f observed = f source × (v ± v_observer)/(v ∓ v_source)', subject: 'Physics', topic: 'Waves', interval: 1, repetitions: 0, ef: 2.5, nextReview: new Date(), dueNow: true },
];

interface Message { id: string; role: 'user' | 'ai'; content: string; timestamp: Date; }

const subjectColors: Record<string, string> = {
  Physics: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  Chemistry: 'text-green-400 bg-green-400/10 border-green-400/30',
  Biology: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  Mathematics: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
};

export default function AIDoubts() {
  const [activeTab, setActiveTab] = useState<'chat' | 'spaced'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: "Hello! I'm your AI Study Assistant 🤖\n\nAsk me anything about Physics, Chemistry, Biology, or Mathematics. I can explain concepts, provide formulas, and help you understand complex topics.\n\nTry asking: **\"Explain Newton's laws\"** or **\"What is photosynthesis?\"**", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [reviewCard, setReviewCard] = useState<FlashCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const dueCards = cards.filter(c => c.dueNow);
  const upcomingCards = cards.filter(c => !c.dueNow);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput(''); setIsTyping(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', content: generateAIResponse(userMsg.content), timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]); setIsTyping(false);
  };

  const handleReview = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (!reviewCard) return;
    setCards(prev => prev.map(c => c.id === reviewCard.id ? sm2Update(c, quality) : c));
    setReviewCard(null); setIsFlipped(false);
    const nextDue = dueCards.find(c => c.id !== reviewCard.id);
    if (nextDue) setTimeout(() => setReviewCard(nextDue), 200);
  };

  const renderMessage = (content: string) => (
    content.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={`${i > 0 ? 'mt-1' : ''} text-sm leading-relaxed`}>
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}
        </p>
      );
    })
  );

  const quickQuestions = [
    "Explain Newton's laws", "What is DNA replication?",
    "Explain integration", "What is entropy?",
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 h-full">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
              <Bot className="w-6 h-6 text-white" />
            </div>
            AI Study Assistant
          </h1>
          <p className="text-gray-400 text-sm mt-1">Concept explanations • Spaced repetition • Smart scheduling</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          {(['chat', 'spaced'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {tab === 'chat' ? '💬 Ask AI' : `🔁 Review (${dueCards.length})`}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── CHAT TAB ── */}
        {activeTab === 'chat' && (
          <motion.div key="chat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ height: 'calc(100vh - 220px)' }}>
            {/* Chat Window */}
            <div className="lg:col-span-2 flex flex-col rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map(msg => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'ai' && (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'ai'
                      ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                      : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-none'}`}>
                      {renderMessage(msg.content)}
                      <p className="text-xs text-white/30 mt-2">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-1">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, delay: d, duration: 0.6 }}
                          className="w-2 h-2 bg-purple-400 rounded-full" />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              <div className="px-5 py-3 border-t border-white/5 flex flex-wrap gap-2">
                {quickQuestions.map(q => (
                  <button key={q} onClick={() => { setInput(q); }}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-indigo-500/50 hover:text-white transition-all">
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex gap-3">
                  <Input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="Ask about any IISER IAT topic..." className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                  <Button onClick={sendMessage} disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Sidebar: Concept Map */}
            <div className="space-y-4 overflow-y-auto">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> Concept Library
                </h3>
                <div className="space-y-2">
                  {Object.entries(conceptDB).map(([key, concept]) => (
                    <button key={key} onClick={() => setExpandedConcept(expandedConcept === key ? null : key)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white truncate">{concept.title}</span>
                        {expandedConcept === key ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                      </div>
                      <AnimatePresence>
                        {expandedConcept === key && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <p className="text-xs text-gray-400 mt-2">{concept.explanation}</p>
                            {concept.formula && <p className="text-xs text-indigo-400 mt-1 font-mono">{concept.formula}</p>}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── SPACED REPETITION TAB ── */}
        {activeTab === 'spaced' && (
          <motion.div key="spaced" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-5">
            {/* SM-2 Info */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 flex items-center gap-4">
              <Brain className="w-8 h-8 text-indigo-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-indigo-300">SM-2 Spaced Repetition Algorithm</p>
                <p className="text-sm text-gray-400">Cards are scheduled based on how well you know them. Harder cards appear more often, mastered cards appear less.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Due Today', value: dueCards.length, color: 'text-red-400', icon: Clock },
                { label: 'Total Cards', value: cards.length, color: 'text-blue-400', icon: BookOpen },
                { label: 'Mastered', value: cards.filter(c => c.repetitions >= 3).length, color: 'text-green-400', icon: Star },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <s.icon className={`w-6 h-6 ${s.color} mx-auto mb-2`} />
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Active Card Review */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-400" /> Due for Review ({dueCards.length})
                </h3>
                {dueCards.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                    <Star className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <p className="font-semibold text-white">All caught up! 🎉</p>
                    <p className="text-sm text-gray-400">No cards due for review right now.</p>
                  </div>
                ) : reviewCard ? (
                  <div className="space-y-4">
                    {/* Flashcard */}
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 cursor-pointer min-h-[200px]"
                      onClick={() => setIsFlipped(!isFlipped)}>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs px-2 py-1 rounded-lg border ${subjectColors[reviewCard.subject] || 'text-gray-400 bg-white/5 border-white/10'}`}>
                          {reviewCard.subject} • {reviewCard.topic}
                        </span>
                        <span className="text-xs text-gray-500">{isFlipped ? 'Answer' : 'Question — tap to flip'}</span>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.p key={isFlipped ? 'back' : 'front'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                          className={`text-base font-medium leading-relaxed ${isFlipped ? 'text-green-300' : 'text-white'}`}>
                          {isFlipped ? reviewCard.back : reviewCard.front}
                        </motion.p>
                      </AnimatePresence>
                    </div>

                    {isFlipped && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <p className="text-sm text-gray-400 text-center mb-2">How well did you know this?</p>
                        <div className="grid grid-cols-3 gap-2">
                          {([
                            { label: '😵 Blackout', q: 0, cls: 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30' },
                            { label: '😕 Hard', q: 2, cls: 'bg-orange-500/20 border-orange-500/40 text-orange-400 hover:bg-orange-500/30' },
                            { label: '✅ Got it!', q: 5, cls: 'bg-green-500/20 border-green-500/40 text-green-400 hover:bg-green-500/30' },
                          ] as const).map(opt => (
                            <button key={opt.label} onClick={() => handleReview(opt.q as 0 | 2 | 5)}
                              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${opt.cls}`}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => { setReviewCard(dueCards[0]); setIsFlipped(false); }}
                    className="w-full p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-center hover:from-indigo-500/20 hover:to-purple-500/20 transition-all">
                    <RotateCcw className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                    <p className="font-semibold">Start Review Session</p>
                    <p className="text-sm text-gray-400">{dueCards.length} cards due</p>
                  </button>
                )}
              </div>

              {/* Upcoming Cards */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" /> Upcoming Cards
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {[...dueCards.filter(c => c.id !== reviewCard?.id), ...upcomingCards].map(card => (
                    <div key={card.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${card.dueNow ? 'bg-red-400' : 'bg-green-400'}`} />
                      <span className="text-sm text-white truncate flex-1">{card.front}</span>
                      <span className="text-xs text-gray-500 flex-shrink-0">{card.dueNow ? 'Due now' : `In ${card.interval}d`}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
