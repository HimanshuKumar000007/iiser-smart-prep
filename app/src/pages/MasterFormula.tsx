import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Book, 
  Zap, 
  Beaker, 
  Dna, 
  Plus, 
  Scroll,
  ArrowRight,
  FileText
} from 'lucide-react';

interface Formula {
  id: string;
  name: string;
  math: string;
  category: string;
  subject: 'physics' | 'chemistry' | 'math' | 'biology';
}

const formulas: Formula[] = [
  // Physics
  { id: 'p1', name: 'Kinematic Equation 1', math: 'v = u + at', category: 'Mechanics', subject: 'physics' },
  { id: 'p2', name: 'Kinematic Equation 2', math: 's = ut + ½at²', category: 'Mechanics', subject: 'physics' },
  { id: 'p3', name: 'Projectile Range', math: 'R = u²sin(2θ)/g', category: 'Mechanics', subject: 'physics' },
  { id: 'p4', name: 'Newton\'s Second Law', math: 'F = ma = dp/dt', category: 'Mechanics', subject: 'physics' },
  { id: 'p5', name: 'Centripetal Force', math: 'F = mv²/r', category: 'Mechanics', subject: 'physics' },
  { id: 'p6', name: 'Coulomb\'s Law', math: 'F = kq₁q₂/r²', category: 'Electrostatics', subject: 'physics' },
  { id: 'p7', name: 'Lens Formula', math: '1/f = 1/v - 1/u', category: 'Optics', subject: 'physics' },
  
  // Chemistry
  { id: 'c1', name: 'Ideal Gas Law', math: 'PV = nRT', category: 'Physical Chemistry', subject: 'chemistry' },
  { id: 'c2', name: 'Mole Fraction', math: 'χᵢ = nᵢ / Σnⱼ', category: 'Basic Concepts', subject: 'chemistry' },
  { id: 'c3', name: 'Molarity', math: 'M = n / V_L', category: 'Basic Concepts', subject: 'chemistry' },
  { id: 'c4', name: 'Gibbs Free Energy', math: 'ΔG = ΔH - TΔS', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c5', name: 'Arrhenius Equation', math: 'k = Ae^(-Eₐ/RT)', category: 'Kinetics', subject: 'chemistry' },
  
  // Math
  { id: 'm1', name: 'Quadratic Formula', math: 'x = [-b ± √(b² - 4ac)] / 2a', category: 'Algebra', subject: 'math' },
  { id: 'm2', name: 'Integration by Parts', math: '∫u dv = uv - ∫v du', category: 'Calculus', subject: 'math' },
  { id: 'm3', name: 'De Moivre\'s Theorem', math: '(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)', category: 'Complex Numbers', subject: 'math' },
  { id: 'm4', name: 'Standard Derivative (sin x)', math: 'd/dx(sin x) = cos x', category: 'Calculus', subject: 'math' },
  { id: 'm5', name: 'Bayes\' Theorem', math: 'P(A|B) = [P(B|A)P(A)] / P(B)', category: 'Probability', subject: 'math' },
  
  // Biology
  { id: 'b1', name: 'Water Potential', math: 'Ψ_w = Ψ_s + Ψ_p', category: 'Plant Physiology', subject: 'biology' },
  { id: 'b2', name: 'Hardy-Weinberg Principle', math: 'p² + 2pq + q² = 1', category: 'Genetics', subject: 'biology' },
  { id: 'b3', name: 'Respiratory Quotient', math: 'RQ = Vol CO₂ evolved / Vol O₂ consumed', category: 'Plant Physiology', subject: 'biology' },
  { id: 'b4', name: 'Cardiac Output', math: 'CO = Stroke Volume × Heart Rate', category: 'Human Physiology', subject: 'biology' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

export default function MasterFormula() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState<'all' | 'physics' | 'chemistry' | 'math' | 'biology'>('all');

  const filteredFormulas = useMemo(() => {
    return formulas.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            f.math.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            f.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = activeSubject === 'all' || f.subject === activeSubject;
      return matchesSearch && matchesSubject;
    });
  }, [searchQuery, activeSubject]);

  const subjects = [
    { id: 'all', label: 'All Subjects', icon: Scroll, color: 'indigo' },
    { id: 'physics', label: 'Physics', icon: Zap, color: 'blue' },
    { id: 'chemistry', label: 'Chemistry', icon: Beaker, color: 'purple' },
    { id: 'math', label: 'Mathematics', icon: Plus, color: 'emerald' },
    { id: 'biology', label: 'Biology', icon: Dna, color: 'amber' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 pb-12 px-4">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
            Master <span className="text-indigo-400">Formula</span>
          </h1>
          <p className="text-gray-400 max-w-md">
            The ultimate PCMB formula repository for IAT 2026. Quick reference for the night before.
          </p>
        </div>

        <div className="relative group max-w-md w-full">
          <div className="absolute inset-0 bg-indigo-500/10 blur-xl group-focus-within:bg-indigo-500/20 transition-all rounded-full" />
          <div className="relative flex items-center bg-[#141529]/80 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search formulas (e.g. lens formula)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 w-full text-base"
            />
          </div>
        </div>
      </div>

      {/* Subject Filter Area */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
        {subjects.map((s) => {
          const Icon = s.icon;
          const isActive = activeSubject === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSubject(s.id as any)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all border
                ${isActive 
                  ? `bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(79,70,229,0.15)]` 
                  : `bg-[#141529]/40 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300`
                }
              `}
            >
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-indigo-400' : ''}`} />
              <span className="font-semibold text-sm">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Formulas Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredFormulas.map((formula) => (
            <motion.div
              layout
              key={formula.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative"
            >
              <div className="h-full p-6 rounded-2xl bg-[#141529]/60 backdrop-blur-md border border-white/10 hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/5 group">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white/5 text-gray-400`}>
                    {formula.category}
                  </span>
                  <div className={`p-2 rounded-lg ${
                    formula.subject === 'physics' ? 'bg-blue-500/10 text-blue-400' :
                    formula.subject === 'chemistry' ? 'bg-purple-500/10 text-purple-400' :
                    formula.subject === 'math' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-amber-500/10 text-amber-400'
                  }`}>
                    {formula.subject === 'physics' && <Zap className="w-4 h-4" />}
                    {formula.subject === 'chemistry' && <Beaker className="w-4 h-4" />}
                    {formula.subject === 'math' && <Plus className="w-4 h-4" />}
                    {formula.subject === 'biology' && <Dna className="w-4 h-4" />}
                  </div>
                </div>

                <h3 className="text-white font-bold text-lg mb-4 group-hover:text-indigo-300 transition-colors">
                  {formula.name}
                </h3>

                <div className="p-4 rounded-xl bg-black/30 font-mono text-sm break-words border border-white/5 text-indigo-200 shadow-inner group-hover:border-indigo-500/20 transition-all">
                  {formula.math}
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Book className="w-3.5 h-3.5" />
                    Subject: {formula.subject.charAt(0).toUpperCase() + formula.subject.slice(1)}
                  </span>
                  <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors font-semibold">
                    Details <ArrowRight className="w-3 h-3 translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredFormulas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-400 font-medium">No formulas found matching "{searchQuery}"</p>
          <button 
            onClick={() => {setSearchQuery(''); setActiveSubject('all');}}
            className="mt-4 text-indigo-400 hover:underline text-sm font-semibold"
          >
            Clear all filters
          </button>
        </motion.div>
      )}

      {/* Pro Tip Card */}
      <motion.div 
        variants={itemVariants}
        className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-start gap-4 mt-8"
      >
        <div className="p-3 rounded-xl bg-indigo-500/20">
          <Plus className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h4 className="text-white font-bold mb-1">Study Tip</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Don't just memorize! Understand how these formulas are derived. For IAT, the application of multiple formulas in a single problem is very common. Use the **AI Tutor** for derivation steps.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
