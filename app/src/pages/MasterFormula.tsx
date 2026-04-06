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
  // Physics - Mechanics
  { id: 'p1', name: 'Kinematic Equations (Constant a)', math: 'v = u + at | s = ut + ½at² | v² = u² + 2as', category: 'Kinematics', subject: 'physics' },
  { id: 'p2', name: 'Relative Velocity', math: 'v_AB = v_A - v_B | River: v_res = √(v² + u² + 2vucosθ)', category: 'Kinematics', subject: 'physics' },
  { id: 'p3', name: 'Projectile Motion', math: 'T = 2usinθ/g | H = u²sin²θ/2g | R = u²sin2θ/g', category: 'Kinematics', subject: 'physics' },
  { id: 'p4', name: 'Newton\'s Laws', math: 'F_net = ma = dp/dt | Impulse: J = FΔt = Δp', category: 'Dynamics', subject: 'physics' },
  { id: 'p5', name: 'Friction', math: 'f_s ≤ μ_sN | f_k = μ_kN | tanλ = μ', category: 'Dynamics', subject: 'physics' },
  { id: 'p6', name: 'Centripetal Force', math: 'F = mv²/r = mω²r | Banking: tanθ = v²/rg', category: 'Dynamics', subject: 'physics' },
  { id: 'p7', name: 'Work & Power', math: 'W = F·s·cosθ | P = dW/dt = F·v', category: 'Dynamics', subject: 'physics' },
  { id: 'p8', name: 'Conservation Laws', math: 'ME = KE + PE = constant | ΔKE + ΔPE = 0', category: 'Dynamics', subject: 'physics' },
  { id: 'p9', name: 'Collision', math: 'e = (v₂-v₁)/(u₁-u₂) | v₁ = [(m₁-m₂)u₁ + 2m₂u₂]/(m₁+m₂)', category: 'Dynamics', subject: 'physics' },
  { id: 'p10', name: 'Rotational Kinematics', math: 'ω = ω₀ + αt | θ = ω₀t + ½αt² | ω² = ω₀² + 2αθ', category: 'Rotation', subject: 'physics' },
  { id: 'p11', name: 'Moment of Inertia', math: 'Ring: MR² | Disc: ½MR² | Rod (ctr): ML²/12', category: 'Rotation', subject: 'physics' },
  { id: 'p12', name: 'Torque & Angular Momentum', math: 'τ = r×F = Iα | L = r×p = Iω | τ = dL/dt', category: 'Rotation', subject: 'physics' },
  { id: 'p13', name: 'Gravitation', math: 'F = Gm₁m₂/r² | g = GM/R² | g\' = g(1 - 2h/R)', category: 'Gravitation', subject: 'physics' },
  { id: 'p14', name: 'Orbital Mechanics', math: 'v₀ = √(GM/r) | vₑ = √(2GM/R) | T² ∝ r³', category: 'Gravitation', subject: 'physics' },
  { id: 'p15', name: 'SHM Basics', math: 'x = Asin(ωt+φ) | v = Aωcos(ωt+φ) | a = -ω²x', category: 'Oscillations', subject: 'physics' },
  { id: 'p16', name: 'Spring Systems', math: 'T = 2π√(m/k) | Series: 1/k_eq = Σ1/kᵢ', category: 'Oscillations', subject: 'physics' },
  { id: 'p17', name: 'Fluid Pressure', math: 'P = P₀ + ρgh | Gauge P = ρgh', category: 'Fluids', subject: 'physics' },
  { id: 'p18', name: 'Bernoulli\'s Equation', math: 'P + ½ρv² + ρgh = constant', category: 'Fluids', subject: 'physics' },
  
  // Physics - Thermo & Heat
  { id: 'p19', name: 'Ideal Gas Law', math: 'PV = nRT = NkT | R = 8.314 J/mol·K', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p20', name: 'Kinetic Theory', math: 'v_rms = √(3RT/M) | U = (f/2)nRT', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p21', name: 'First Law of Thermo', math: 'ΔU = Q - W | dU = dQ - dW', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p22', name: 'Adiabatic Process', math: 'PV^γ = const | W = (P₁V₁-P₂V₂)/(γ-1)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p23', name: 'Heat Transfer - Radiation', math: 'P = σAeT⁴ | λ_max T = b', category: 'Thermodynamics', subject: 'physics' },
  
  // Physics - Electro & Magnetism
  { id: 'p24', name: 'Coulomb\'s Law', math: 'F = kq₁q₂/r² | k = 9 × 10⁹ N·m²/C²', category: 'Electrostatics', subject: 'physics' },
  { id: 'p25', name: 'Electric Potential', math: 'V = kQ/r | ΔV = -∫E·dr | E = -dV/dr', category: 'Electrostatics', subject: 'physics' },
  { id: 'p26', name: 'Capacitance', math: 'C = Q/V | C₀ = ε₀A/d | U = ½CV²', category: 'Electrostatics', subject: 'physics' },
  { id: 'p27', name: 'Ohm\'s Law', math: 'V = IR | R = ρL/A | J = σE', category: 'Current', subject: 'physics' },
  { id: 'p28', name: 'Circuit Power', math: 'P = VI = I²R = V²/R', category: 'Current', subject: 'physics' },
  { id: 'p29', name: 'Ampere\'s Law', math: '∮B·dl = μ₀I_enc | Solenoid: B = μ₀nI', category: 'Magnetism', subject: 'physics' },
  { id: 'p30', name: 'Faraday\'s Law', math: 'ε = -dΦ/dt | Φ = BAcosθ | ε = Blv', category: 'Magnetism', subject: 'physics' },
  { id: 'p31', name: 'AC Circuits', math: 'Z = √(R² + (X_L-X_C)²) | tanφ = (X_L-X_C)/R', category: 'Magnetism', subject: 'physics' },
  
  // Physics - Optics & Modern
  { id: 'p32', name: 'Mirror & Lens Formula', math: 'Mirror: 1/f = 1/v + 1/u | Lens: 1/f = 1/v - 1/u', category: 'Optics', subject: 'physics' },
  { id: 'p33', name: 'Refraction & Snell\'s', math: 'n₁sinθ₁ = n₂sinθ₂ | n = c/v', category: 'Optics', subject: 'physics' },
  { id: 'p34', name: 'Photoelectric Effect', math: 'hν = φ + K_max | K_max = eV₀', category: 'Modern Physics', subject: 'physics' },
  { id: 'p35', name: 'Bohr\'s Model', math: 'mvr = nh/2π | E_n = -13.6Z²/n² eV', category: 'Modern Physics', subject: 'physics' },
  { id: 'p36', name: 'Radioactivity', math: 'N = N₀e^(-λt) | t½ = 0.693/λ', category: 'Modern Physics', subject: 'physics' },

  // Chemistry - Physical
  { id: 'c1', name: 'Mole Concept', math: 'n = w/M = N/N_A = V/22.4 (STP)', category: 'Physical Chem', subject: 'chemistry' },
  { id: 'c2', name: 'Colligative Properties', math: 'ΔT_b = iK_bm | ΔT_f = iK_fm | π = iCRT', category: 'Physical Chem', subject: 'chemistry' },
  { id: 'c3', name: 'Gibbs & Entropy', math: 'ΔG = ΔH - TΔS | ΔG° = -RTlnK', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c4', name: 'Ionic Equilibrium - pH', math: 'pH = -log[H⁺] | pH = pK_a + log([A⁻]/[HA])', category: 'Equilibrium', subject: 'chemistry' },
  { id: 'c5', name: 'Nernst Equation', math: 'E = E° - (0.059/n)logQ (at 25°C)', category: 'Electrochemistry', subject: 'chemistry' },
  { id: 'c6', name: 'Integrated Rate Laws', math: 'Zero: [A] = [A]₀-kt | 1st: ln[A] = ln[A]₀-kt', category: 'Kinetics', subject: 'chemistry' },
  { id: 'c7', name: 'Arrhenius Equation', math: 'k = Ae^(-E_a/RT) | log(k₂/k₁) = (E_a/2.303R)(ΔT/T₁T₂)', category: 'Kinetics', subject: 'chemistry' },
  
  // Chemistry - Inorganic & Organic
  { id: 'c8', name: 'Quantum Numbers', math: 'n, l (0 to n-1), m (-l to +l), s (±½)', category: 'Structure', subject: 'chemistry' },
  { id: 'c9', name: 'Effective Nuclear Charge', math: 'Z_eff = Z - σ (Slater\'s rules)', category: 'Structure', subject: 'chemistry' },
  { id: 'c10', name: 'Bond Order', math: 'BO = ½(N_b - N_a)', category: 'Bonding', subject: 'chemistry' },
  { id: 'c11', name: 'Degree of Unsaturation', math: 'DU = C - H/2 - X/2 + N/2 + 1', category: 'Organic Chem', subject: 'chemistry' },
  { id: 'c12', name: 'Optical Activity', math: '[α] = α/(l×c)', category: 'Organic Chem', subject: 'chemistry' },
  
  // Math - Algebra & Calculus
  { id: 'm1', name: 'Complex Numbers', math: 'z = x+iy = r(cosθ + isinθ) = re^(iθ)', category: 'Algebra', subject: 'math' },
  { id: 'm2', name: 'Quadratic Roots', math: 'x = (-b ± √D)/2a | D = b²-4ac', category: 'Algebra', subject: 'math' },
  { id: 'm3', name: 'AP & GP Series', math: 'AP: S_n = n/2(2a+(n-1)d) | GP: S_∞ = a/(1-r)', category: 'Sequences', subject: 'math' },
  { id: 'm4', name: 'Binomial Theorem', math: '(a+b)^n = ΣⁿC_r a^(n-r)b^r', category: 'Sequences', subject: 'math' },
  { id: 'm5', name: 'Standard Limits', math: 'lim(x→0) sinx/x = 1 | lim(x→0) (e^x-1)/x = 1', category: 'Calculus', subject: 'math' },
  { id: 'm6', name: 'Integration by Parts', math: '∫u dv = uv - ∫v du', category: 'Calculus', subject: 'math' },
  { id: 'm7', name: 'Definite Properties', math: '∫_0^a f(x)dx = ∫_0^a f(a-x)dx', category: 'Calculus', subject: 'math' },
  { id: 'm8', name: 'Linear Differential Eq', math: 'dy/dx + Py = Q | I.F. = e^(∫Pdx)', category: 'Calculus', subject: 'math' },
  
  // Math - Geometry & Vectors
  { id: 'm9', name: 'Distance & Section', math: 'd = √Σ(Δxᵢ)² | Int: (mx₂+nx₁)/(m+n)', category: 'Geometry', subject: 'math' },
  { id: 'm10', name: 'Straight Line Dist', math: 'd = |ax₁+by₁+c|/√(a²+b²)', category: 'Geometry', subject: 'math' },
  { id: 'm11', name: 'Circle Standard', math: '(x-h)² + (y-k)² = r²', category: 'Geometry', subject: 'math' },
  { id: 'm12', name: 'Conic Eccentricity', math: 'e = √(1-b²/a²) (Ellipse) | √(1+b²/a²) (Hyperbola)', category: 'Geometry', subject: 'math' },
  { id: 'm13', name: 'Vector Products', math: 'a·b = |a||b|cosθ | |a×b| = |a||b|sinθ', category: 'Vectors', subject: 'math' },
  { id: 'm14', name: 'Shortest Distance', math: 'SD = |(a₂-a₁)·(b₁×b₂)|/|b₁×b₂|', category: 'Vectors', subject: 'math' },

  // Biology - Physiology & Genetics
  { id: 'b1', name: 'Water Potential', math: 'Ψ_w = Ψ_s + Ψ_p', category: 'Physiology', subject: 'biology' },
  { id: 'b2', name: 'Michaelis-Menten', math: 'V = (V_max[S])/(K_m + [S])', category: 'Physiology', subject: 'biology' },
  { id: 'b3', name: 'Respiratory Quotient', math: 'RQ = Vol CO₂ produced / Vol O₂ consumed', category: 'Physiology', subject: 'biology' },
  { id: 'b4', name: 'Hardy-Weinberg', math: 'p + q = 1 | p² + 2pq + q² = 1', category: 'Genetics', subject: 'biology' },
  { id: 'b5', name: 'Chargaff\'s Rules', math: '%A = %T | %G = %C | (A+G) = (T+C)', category: 'Genetics', subject: 'biology' },
  { id: 'b6', name: 'Melting Temp (DNA)', math: 'T_m ≈ 2(A+T) + 4(G+C)', category: 'Genetics', subject: 'biology' },
  { id: 'b7', name: 'Cardiac Output', math: 'CO = HR × SV | SV = EDV - ESV', category: 'Physiology', subject: 'biology' },
  { id: 'b8', name: 'Population Growth', math: 'dN/dt = rN (Exp) | dN/dt = rN(K-N)/K (Log)', category: 'Ecology', subject: 'biology' },
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
