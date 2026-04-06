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
  FileText,
  Calculator
} from 'lucide-react';

interface Formula {
  id: string;
  name: string;
  math: string;
  category: string;
  subject: 'physics' | 'chemistry' | 'math' | 'biology';
}

const formulas: Formula[] = [
  // PHYSICS - Mechanics (Kinematics & Dynamics)
  { id: 'p1', name: 'First Kinematic Equation', math: 'v = u + at', category: 'Mechanics', subject: 'physics' },
  { id: 'p2', name: 'Second Kinematic Equation', math: 's = ut + ½at²', category: 'Mechanics', subject: 'physics' },
  { id: 'p3', name: 'Third Kinematic Equation', math: 'v² = u² + 2as', category: 'Mechanics', subject: 'physics' },
  { id: 'p4', name: 'Displacement in nth Second', math: 'sₙ = u + a(n - ½)', category: 'Mechanics', subject: 'physics' },
  { id: 'p5', name: 'Relative Velocity', math: 'v_AB = v_A - v_B', category: 'Mechanics', subject: 'physics' },
  { id: 'p6', name: 'River Boat Resultant', math: 'v_resultant = √(v² + u² + 2vucosθ)', category: 'Mechanics', subject: 'physics' },
  { id: 'p7', name: 'Time of Flight (Projectile)', math: 'T = 2usinθ/g', category: 'Mechanics', subject: 'physics' },
  { id: 'p8', name: 'Maximum Height (Projectile)', math: 'H = u²sin²θ/2g', category: 'Mechanics', subject: 'physics' },
  { id: 'p9', name: 'Horizontal Range', math: 'R = u²sin2θ/g', category: 'Mechanics', subject: 'physics' },
  { id: 'p10', name: 'Maximum Range', math: 'R_max = u²/g (θ=45°)', category: 'Mechanics', subject: 'physics' },
  { id: 'p11', name: 'Newton\'s Second Law', math: 'F_net = ma = dp/dt', category: 'Mechanics', subject: 'physics' },
  { id: 'p12', name: 'Impulse-Momentum', math: 'J = FΔt = Δp', category: 'Mechanics', subject: 'physics' },
  { id: 'p13', name: 'Newton\'s Third Law', math: 'F_12 = -F_21', category: 'Mechanics', subject: 'physics' },
  { id: 'p14', name: 'Static Friction', math: 'f_s ≤ μ_sN', category: 'Mechanics', subject: 'physics' },
  { id: 'p15', name: 'Kinetic Friction', math: 'f_k = μ_kN', category: 'Mechanics', subject: 'physics' },
  { id: 'p16', name: 'Angle of Friction', math: 'tanλ = μ', category: 'Mechanics', subject: 'physics' },
  { id: 'p17', name: 'Centripetal Force', math: 'F = mv²/r = mω²r', category: 'Mechanics', subject: 'physics' },
  { id: 'p18', name: 'Banking Angle', math: 'tanθ = v²/rg', category: 'Mechanics', subject: 'physics' },
  { id: 'p19', name: 'Max Speed on Banked Road', math: 'v_max = √[rg(μ+tanθ)/(1-μtanθ)]', category: 'Mechanics', subject: 'physics' },
  { id: 'p20', name: 'Work Done', math: 'W = F·s·cosθ', category: 'Mechanics', subject: 'physics' },
  { id: 'p21', name: 'Power', math: 'P = dW/dt = F·v', category: 'Mechanics', subject: 'physics' },
  { id: 'p22', name: 'Instantaneous Power', math: 'P = Fvcosθ', category: 'Mechanics', subject: 'physics' },
  { id: 'p23', name: 'Mechanical Energy Conservation', math: 'ME = KE + PE = constant', category: 'Mechanics', subject: 'physics' },
  { id: 'p24', name: 'Work-Energy Theorem', math: 'ΔKE + ΔPE = 0', category: 'Mechanics', subject: 'physics' },
  { id: 'p25', name: 'Coefficient of Restitution', math: 'e = (v₂-v₁)/(u₁-u₂)', category: 'Mechanics', subject: 'physics' },
  { id: 'p26', name: '1D Elastic Collision', math: 'v₁ = [(m₁-m₂)u₁ + 2m₂u₂]/(m₁+m₂)', category: 'Mechanics', subject: 'physics' },
  { id: 'p27', name: 'Center of Mass Position', math: 'x_cm = Σmᵢxᵢ/Σmᵢ', category: 'Mechanics', subject: 'physics' },
  { id: 'p28', name: 'Center of Mass Velocity', math: 'v_cm = Σmᵢvᵢ/M', category: 'Mechanics', subject: 'physics' },
  { id: 'p29', name: 'Center of Mass Acceleration', math: 'a_cm = F_ext/M', category: 'Mechanics', subject: 'physics' },

  // PHYSICS - Rotation & Gravitation
  { id: 'p30', name: 'Angular Velocity', math: 'ω = ω₀ + αt', category: 'Rotation', subject: 'physics' },
  { id: 'p31', name: 'Angular Displacement', math: 'θ = ω₀t + ½αt²', category: 'Rotation', subject: 'physics' },
  { id: 'p32', name: 'Angular Kinematic Relation', math: 'ω² = ω₀² + 2αθ', category: 'Rotation', subject: 'physics' },
  { id: 'p33', name: 'Moment of Inertia (Definition)', math: 'I = Σmᵢrᵢ²', category: 'Rotation', subject: 'physics' },
  { id: 'p34', name: 'Moment of Inertia (Ring)', math: 'I = MR²', category: 'Rotation', subject: 'physics' },
  { id: 'p35', name: 'Moment of Inertia (Disc)', math: 'I = ½MR²', category: 'Rotation', subject: 'physics' },
  { id: 'p36', name: 'Moment of Inertia (Rod - Center)', math: 'I = ML²/12', category: 'Rotation', subject: 'physics' },
  { id: 'p37', name: 'Moment of Inertia (Rod - End)', math: 'I = ML²/3', category: 'Rotation', subject: 'physics' },
  { id: 'p38', name: 'Parallel Axis Theorem', math: 'I = I_cm + Md²', category: 'Rotation', subject: 'physics' },
  { id: 'p39', name: 'Perpendicular Axis Theorem', math: 'I_z = I_x + I_y', category: 'Rotation', subject: 'physics' },
  { id: 'p40', name: 'Torque', math: 'τ = r×F = Iα', category: 'Rotation', subject: 'physics' },
  { id: 'p41', name: 'Angular Momentum', math: 'L = r×p = Iω', category: 'Rotation', subject: 'physics' },
  { id: 'p42', name: 'Torque-Angular Momentum', math: 'τ = dL/dt', category: 'Rotation', subject: 'physics' },
  { id: 'p43', name: 'Rolling Condition', math: 'v_cm = Rω', category: 'Rotation', subject: 'physics' },
  { id: 'p44', name: 'Total KE in Rolling', math: 'KE = ½Mv² + ½Iω²', category: 'Rotation', subject: 'physics' },
  { id: 'p45', name: 'Acceleration on Incline', math: 'a = gsinθ/(1 + I/MR²)', category: 'Rotation', subject: 'physics' },
  { id: 'p46', name: 'Newton\'s Law of Gravitation', math: 'F = Gm₁m₂/r²', category: 'Gravitation', subject: 'physics' },
  { id: 'p47', name: 'Acceleration due to Gravity', math: 'g = GM/R²', category: 'Gravitation', subject: 'physics' },
  { id: 'p48', name: 'Gravity at Height h', math: 'g\' = g(1 - 2h/R)', category: 'Gravitation', subject: 'physics' },
  { id: 'p49', name: 'Gravitational Potential Energy', math: 'U = -GMm/r', category: 'Gravitation', subject: 'physics' },
  { id: 'p50', name: 'Escape Velocity', math: 'vₑ = √(2GM/R) = √2gR ≈ 11.2 km/s', category: 'Gravitation', subject: 'physics' },
  { id: 'p51', name: 'Orbital Velocity', math: 'v₀ = √(GM/r)', category: 'Gravitation', subject: 'physics' },
  { id: 'p52', name: 'Kepler\'s Third Law', math: 'T² = (4π²/GM)r³', category: 'Gravitation', subject: 'physics' },
  { id: 'p53', name: 'Total Orbital Energy', math: 'E = -GMm/2a', category: 'Gravitation', subject: 'physics' },
  { id: 'p54', name: 'Geostationary Velocity', math: 'v_geo = √[gR²/(R+h)]', category: 'Gravitation', subject: 'physics' },

  // PHYSICS - Oscillations & Elasticity
  { id: 'p55', name: 'SHM Displacement', math: 'x = Asin(ωt+φ)', category: 'Oscillations', subject: 'physics' },
  { id: 'p56', name: 'SHM Velocity', math: 'v = Aωcos(ωt+φ)', category: 'Oscillations', subject: 'physics' },
  { id: 'p57', name: 'SHM Acceleration', math: 'a = -ω²x', category: 'Oscillations', subject: 'physics' },
  { id: 'p58', name: 'Angular Frequency', math: 'ω = 2πf = 2π/T', category: 'Oscillations', subject: 'physics' },
  { id: 'p59', name: 'Spring Time Period', math: 'T = 2π√(m/k)', category: 'Oscillations', subject: 'physics' },
  { id: 'p60', name: 'Springs in Series', math: '1/k_eq = 1/k₁ + 1/k₂', category: 'Oscillations', subject: 'physics' },
  { id: 'p61', name: 'Springs in Parallel', math: 'k_eq = k₁ + k₂', category: 'Oscillations', subject: 'physics' },
  { id: 'p62', name: 'Simple Pendulum', math: 'T = 2π√(L/g)', category: 'Oscillations', subject: 'physics' },
  { id: 'p63', name: 'Physical Pendulum', math: 'T = 2π√(I/mgd)', category: 'Oscillations', subject: 'physics' },
  { id: 'p64', name: 'Total Energy in SHM', math: 'E = ½kA² = ½mω²A²', category: 'Oscillations', subject: 'physics' },
  { id: 'p65', name: 'Average KE/PE in SHM', math: 'KE_avg = PE_avg = E/4', category: 'Oscillations', subject: 'physics' },
  { id: 'p66', name: 'Maximum KE/PE in SHM', math: 'KE_max = PE_max = E/2', category: 'Oscillations', subject: 'physics' },
  { id: 'p67', name: 'Damped Oscillation', math: 'x = A₀e^(-bt/2m)cos(ω\'t+φ)', category: 'Oscillations', subject: 'physics' },
  { id: 'p68', name: 'Damped Frequency', math: 'ω\' = √(ω₀² - (b/2m)²)', category: 'Oscillations', subject: 'physics' },
  { id: 'p69', name: 'Stress Definition', math: 'Stress = F/A', category: 'Elasticity', subject: 'physics' },
  { id: 'p70', name: 'Strain Definition', math: 'Strain = ΔL/L', category: 'Elasticity', subject: 'physics' },
  { id: 'p71', name: 'Young\'s Modulus', math: 'Y = Stress/Strain', category: 'Elasticity', subject: 'physics' },
  { id: 'p72', name: 'Elastic Moduli Relation', math: 'Y = 3B(1-2σ) = 2η(1+σ)', category: 'Elasticity', subject: 'physics' },
  { id: 'p73', name: 'Elastic Potential Energy', math: 'U = ½Y × (Strain)² × Volume', category: 'Elasticity', subject: 'physics' },
  { id: 'p74', name: 'Elastic Energy (Spring)', math: 'U = ½FΔL = ½kx²', category: 'Elasticity', subject: 'physics' },

  // PHYSICS - Thermodynamics
  { id: 'p75', name: 'Ideal Gas Law', math: 'PV = nRT = NkT', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p76', name: 'Boyle\'s Law', math: 'PV = constant (T constant)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p77', name: 'Charles\'s Law', math: 'V/T = constant (P constant)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p78', name: 'Gay-Lussac\'s Law', math: 'P/T = constant (V constant)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p79', name: 'Kinetic Theory Pressure', math: 'PV = ⅓Nm(v_rms)²', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p80', name: 'RMS Velocity', math: 'v_rms = √(3RT/M) = √(3kT/m)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p81', name: 'Most Probable Speed', math: 'v_mp = √(2RT/M)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p82', name: 'Average Speed', math: 'v_avg = √(8RT/πM)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p83', name: 'Degrees of Freedom', math: 'U = (f/2)nRT', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p84', name: 'First Law of Thermodynamics', math: 'ΔU = Q - W', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p85', name: 'Mayer\'s Relation', math: 'C_p - C_v = R', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p86', name: 'Isothermal Work', math: 'W = nRTln(V₂/V₁)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p87', name: 'Adiabatic Condition', math: 'PV^γ = constant', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p88', name: 'Adiabatic Work', math: 'W = (P₁V₁-P₂V₂)/(γ-1)', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p89', name: 'Heat Engine Efficiency', math: 'η = 1 - Q₂/Q₁', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p90', name: 'Carnot Efficiency', math: 'η = 1 - T₂/T₁', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p91', name: 'COP (Refrigerator)', math: 'COP = Q₂/W', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p92', name: 'Entropy Change', math: 'ΔS = ∫dQ_rev/T', category: 'Thermodynamics', subject: 'physics' },
  { id: 'p93', name: 'Boltzmann Entropy', math: 'S = klnΩ', category: 'Thermodynamics', subject: 'physics' },

  // PHYSICS - Fluid Mechanics
  { id: 'p94', name: 'Hydrostatic Pressure', math: 'P = P₀ + ρgh', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p95', name: 'Buoyant Force', math: 'F_b = ρ_fluid V_displaced g', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p96', name: 'Equation of Continuity', math: 'A₁v₁ = A₂v₂', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p97', name: 'Bernoulli\'s Equation', math: 'P + ½ρv² + ρgh = constant', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p98', name: 'Torricelli\'s Law', math: 'v = √(2gh)', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p99', name: 'Viscous Force', math: 'F = ηA(dv/dy)', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p100', name: 'Poiseuille\'s Formula', math: 'Q = πPr⁴/8ηL', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p101', name: 'Stokes\' Law', math: 'F = 6πηrv', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p102', name: 'Surface Tension Force', math: 'T = F/L', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p103', name: 'Excess Pressure (Bubble)', math: 'ΔP = 2T/R', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p104', name: 'Excess Pressure (Soap Bubble)', math: 'ΔP = 4T/R', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p105', name: 'Capillary Rise', math: 'h = 2Tcosθ/ρgr', category: 'Fluid Mechanics', subject: 'physics' },
  { id: 'p106', name: 'Heat Transfer (Conduction)', math: 'dQ/dt = -kA(dT/dx)', category: 'Heat Transfer', subject: 'physics' },
  { id: 'p107', name: 'Stefan-Boltzmann Law', math: 'P = σAeT⁴', category: 'Heat Transfer', subject: 'physics' },
  { id: 'p108', name: 'Newton\'s Law of Cooling', math: 'dT/dt = -k(T - T₀)', category: 'Heat Transfer', subject: 'physics' },
  { id: 'p109', name: 'Cooling Temperature', math: 'T(t) = T₀ + (Tᵢ - T₀)e^(-kt)', category: 'Heat Transfer', subject: 'physics' },
  { id: 'p110', name: 'Wien\'s Displacement Law', math: 'λ_max T = b = 2.898 × 10⁻³ m·K', category: 'Heat Transfer', subject: 'physics' },

  // PHYSICS - Electrostatics
  { id: 'p111', name: 'Coulomb\'s Law', math: 'F = kq₁q₂/r² = q₁q₂/(4πε₀r²)', category: 'Electrostatics', subject: 'physics' },
  { id: 'p112', name: 'Electric Field (Point)', math: 'E = kQ/r²', category: 'Electrostatics', subject: 'physics' },
  { id: 'p113', name: 'Electric Field (Infinite Plane)', math: 'E = σ/2ε₀', category: 'Electrostatics', subject: 'physics' },
  { id: 'p114', name: 'Electric Field (Conductor)', math: 'E = σ/ε₀', category: 'Electrostatics', subject: 'physics' },
  { id: 'p115', name: 'Gauss\'s Law', math: '∮E·dA = Q_enclosed/ε₀', category: 'Electrostatics', subject: 'physics' },
  { id: 'p116', name: 'Electric Potential', math: 'V = kQ/r', category: 'Electrostatics', subject: 'physics' },
  { id: 'p117', name: 'Potential-Electric Field', math: 'E = -dV/dr', category: 'Electrostatics', subject: 'physics' },
  { id: 'p118', name: 'Potential Energy (Two Charges)', math: 'U = kq₁q₂/r', category: 'Electrostatics', subject: 'physics' },
  { id: 'p119', name: 'Potential Energy (Charge)', math: 'U = qV', category: 'Electrostatics', subject: 'physics' },
  { id: 'p120', name: 'System Potential Energy', math: 'U = ½ΣqᵢVᵢ', category: 'Electrostatics', subject: 'physics' },
  { id: 'p121', name: 'Electric Dipole Moment', math: 'p = qd', category: 'Electrostatics', subject: 'physics' },
  { id: 'p122', name: 'Dipole Field (Axial)', math: 'E_axial = 2kp/r³', category: 'Electrostatics', subject: 'physics' },
  { id: 'p123', name: 'Dipole Field (Equatorial)', math: 'E_eq = kp/r³', category: 'Electrostatics', subject: 'physics' },
  { id: 'p124', name: 'Torque on Dipole', math: 'τ = p×E', category: 'Electrostatics', subject: 'physics' },
  { id: 'p125', name: 'Dipole Potential Energy', math: 'U = -p·E', category: 'Electrostatics', subject: 'physics' },
  { id: 'p126', name: 'Capacitance Definition', math: 'C = Q/V', category: 'Electrostatics', subject: 'physics' },
  { id: 'p127', name: 'Parallel Plate Capacitor', math: 'C₀ = ε₀A/d', category: 'Electrostatics', subject: 'physics' },
  { id: 'p128', name: 'Energy Stored in Capacitor', math: 'U = ½CV² = ½QV = ½Q²/C', category: 'Electrostatics', subject: 'physics' },
  { id: 'p129', name: 'Capacitors in Series', math: '1/C = 1/C₁ + 1/C₂', category: 'Electrostatics', subject: 'physics' },
  { id: 'p130', name: 'Capacitors in Parallel', math: 'C = C₁ + C₂', category: 'Electrostatics', subject: 'physics' },
  { id: 'p131', name: 'Energy Density', math: 'u = ½ε₀E²', category: 'Electrostatics', subject: 'physics' },
  { id: 'p132', name: 'Dielectric Capacitance', math: 'C = KC₀', category: 'Electrostatics', subject: 'physics' },
  { id: 'p133', name: 'Spherical Capacitor', math: 'C = 4πε₀R', category: 'Electrostatics', subject: 'physics' },
  { id: 'p134', name: 'Cylindrical Capacitor', math: 'C = 2πε₀L/ln(b/a)', category: 'Electrostatics', subject: 'physics' },

  // PHYSICS - Current Electricity
  { id: 'p135', name: 'Ohm\'s Law', math: 'V = IR', category: 'Current Electricity', subject: 'physics' },
  { id: 'p136', name: 'Resistance Formula', math: 'R = ρL/A', category: 'Current Electricity', subject: 'physics' },
  { id: 'p137', name: 'Temperature Dependence', math: 'ρ = ρ₀(1 + αΔT)', category: 'Current Electricity', subject: 'physics' },
  { id: 'p138', name: 'Microscopic Ohm\'s Law', math: 'J = σE', category: 'Current Electricity', subject: 'physics' },
  { id: 'p139', name: 'Drift Velocity', math: 'v_d = eEτ/m', category: 'Current Electricity', subject: 'physics' },
  { id: 'p140', name: 'Current-Drift Velocity', math: 'I = neAv_d', category: 'Current Electricity', subject: 'physics' },
  { id: 'p141', name: 'Mobility', math: 'μ = v_d/E = eτ/m', category: 'Current Electricity', subject: 'physics' },
  { id: 'p142', name: 'Resistors in Series', math: 'R = R₁ + R₂', category: 'Current Electricity', subject: 'physics' },
  { id: 'p143', name: 'Resistors in Parallel', math: '1/R = 1/R₁ + 1/R₂', category: 'Current Electricity', subject: 'physics' },
  { id: 'p144', name: 'Wheatstone Bridge', math: 'P/Q = R/S', category: 'Current Electricity', subject: 'physics' },
  { id: 'p145', name: 'Terminal Voltage', math: 'V = ε - Ir', category: 'Current Electricity', subject: 'physics' },
  { id: 'p146', name: 'Circuit Current', math: 'I = ε/(R + r)', category: 'Current Electricity', subject: 'physics' },
  { id: 'p147', name: 'Power in Circuit', math: 'P = VI = I²R = V²/R', category: 'Current Electricity', subject: 'physics' },
  { id: 'p148', name: 'Maximum Power Transfer', math: 'P_max = ε²/4r', category: 'Current Electricity', subject: 'physics' },
  { id: 'p149', name: 'Kirchhoff\'s Junction Rule', math: 'ΣI = 0', category: 'Current Electricity', subject: 'physics' },
  { id: 'p150', name: 'Kirchhoff\'s Loop Rule', math: 'ΣIR + ΣEMF = 0', category: 'Current Electricity', subject: 'physics' },
  { id: 'p151', name: 'Potentiometer Principle', math: 'ε₁/ε₂ = l₁/l₂', category: 'Current Electricity', subject: 'physics' },
  { id: 'p152', name: 'Internal Resistance', math: 'r = R(l₁-l₂)/l₂', category: 'Current Electricity', subject: 'physics' },
  { id: 'p153', name: 'Meter Bridge', math: 'R/S = l/(100-l)', category: 'Current Electricity', subject: 'physics' },
  { id: 'p154', name: 'Ammeter Shunt', math: 'S = G/(n-1)', category: 'Current Electricity', subject: 'physics' },
  { id: 'p155', name: 'Voltmeter Multiplier', math: 'R = G(n-1)', category: 'Current Electricity', subject: 'physics' },
  { id: 'p156', name: 'RC Charging', math: 'q = Cε(1-e^(-t/RC))', category: 'Current Electricity', subject: 'physics' },
  { id: 'p157', name: 'RC Discharging', math: 'q = q₀e^(-t/RC)', category: 'Current Electricity', subject: 'physics' },

  // PHYSICS - Magnetism & EMI
  { id: 'p158', name: 'Biot-Savart Law', math: 'dB = (μ₀/4π)(Idl×r)/r³', category: 'Magnetism', subject: 'physics' },
  { id: 'p159', name: 'Ampere\'s Law', math: '∮B·dl = μ₀I_enclosed', category: 'Magnetism', subject: 'physics' },
  { id: 'p160', name: 'Magnetic Field (Long Wire)', math: 'B = μ₀I/2πr', category: 'Magnetism', subject: 'physics' },
  { id: 'p161', name: 'Magnetic Field (Solenoid)', math: 'B = μ₀nI', category: 'Magnetism', subject: 'physics' },
  { id: 'p162', name: 'Lorentz Force', math: 'F = q(v×B)', category: 'Magnetism', subject: 'physics' },
  { id: 'p163', name: 'Force on Current Element', math: 'F = I(L×B)', category: 'Magnetism', subject: 'physics' },
  { id: 'p164', name: 'Cyclotron Radius', math: 'r = mv/qB', category: 'Magnetism', subject: 'physics' },
  { id: 'p165', name: 'Cyclotron Period', math: 'T = 2πm/qB', category: 'Magnetism', subject: 'physics' },
  { id: 'p166', name: 'Helical Pitch', math: 'p = 2πmv_∥/qB', category: 'Magnetism', subject: 'physics' },
  { id: 'p167', name: 'Magnetic Dipole Moment', math: 'M = IA', category: 'Magnetism', subject: 'physics' },
  { id: 'p168', name: 'Torque on Dipole', math: 'τ = M×B', category: 'Magnetism', subject: 'physics' },
  { id: 'p169', name: 'Dipole Potential Energy', math: 'U = -M·B', category: 'Magnetism', subject: 'physics' },
  { id: 'p170', name: 'Faraday\'s Law', math: 'ε = -dΦ/dt', category: 'EMI', subject: 'physics' },
  { id: 'p171', name: 'Motional EMF', math: 'ε = Blv', category: 'EMI', subject: 'physics' },
  { id: 'p172', name: 'Self Inductance', math: 'ε = -L(dI/dt)', category: 'EMI', subject: 'physics' },
  { id: 'p173', name: 'Mutual Inductance', math: 'ε₂ = -M(dI₁/dt)', category: 'EMI', subject: 'physics' },
  { id: 'p174', name: 'Energy in Inductor', math: 'U = ½LI²', category: 'EMI', subject: 'physics' },
  { id: 'p175', name: 'LR Circuit Current', math: 'I = (ε/R)(1-e^(-t/τ)), τ=L/R', category: 'EMI', subject: 'physics' },
  { id: 'p176', name: 'LC Oscillation', math: 'ω = 1/√(LC)', category: 'EMI', subject: 'physics' },
  { id: 'p177', name: 'AC Voltage', math: 'V = V₀sin(ωt)', category: 'AC Circuits', subject: 'physics' },
  { id: 'p178', name: 'AC Current', math: 'I = I₀sin(ωt+φ)', category: 'AC Circuits', subject: 'physics' },
  { id: 'p179', name: 'Inductive Reactance', math: 'X_L = ωL', category: 'AC Circuits', subject: 'physics' },
  { id: 'p180', name: 'Capacitive Reactance', math: 'X_C = 1/ωC', category: 'AC Circuits', subject: 'physics' },
  { id: 'p181', name: 'Impedance', math: 'Z = √[R² + (X_L-X_C)²]', category: 'AC Circuits', subject: 'physics' },
  { id: 'p182', name: 'Phase Angle', math: 'tanφ = (X_L-X_C)/R', category: 'AC Circuits', subject: 'physics' },
  { id: 'p183', name: 'Average Power', math: 'P_avg = VIcosφ = I²R', category: 'AC Circuits', subject: 'physics' },
  { id: 'p184', name: 'Resonant Frequency', math: 'ω₀ = 1/√(LC)', category: 'AC Circuits', subject: 'physics' },
  { id: 'p185', name: 'Q-Factor', math: 'Q = ω₀L/R = 1/(ω₀CR)', category: 'AC Circuits', subject: 'physics' },
  { id: 'p186', name: 'Transformer Ratio', math: 'V_s/V_p = N_s/N_p = I_p/I_s', category: 'AC Circuits', subject: 'physics' },

  // PHYSICS - Optics
  { id: 'p187', name: 'Mirror Formula', math: '1/f = 1/v + 1/u', category: 'Ray Optics', subject: 'physics' },
  { id: 'p188', name: 'Focal Length (Mirror)', math: 'f = R/2', category: 'Ray Optics', subject: 'physics' },
  { id: 'p189', name: 'Magnification (Mirror)', math: 'm = -v/u = f/(f-u)', category: 'Ray Optics', subject: 'physics' },
  { id: 'p190', name: 'Lens Formula', math: '1/f = 1/v - 1/u', category: 'Ray Optics', subject: 'physics' },
  { id: 'p191', name: 'Lensmaker\'s Formula', math: '1/f = (μ-1)(1/R₁ - 1/R₂)', category: 'Ray Optics', subject: 'physics' },
  { id: 'p192', name: 'Power of Lens', math: 'P = 1/f (diopters)', category: 'Ray Optics', subject: 'physics' },
  { id: 'p193', name: 'Lens Combination', math: '1/F = 1/f₁ + 1/f₂', category: 'Ray Optics', subject: 'physics' },
  { id: 'p194', name: 'Snell\'s Law', math: 'n₁sinθ₁ = n₂sinθ₂', category: 'Ray Optics', subject: 'physics' },
  { id: 'p195', name: 'Refractive Index', math: 'n = c/v = λ₀/λ', category: 'Ray Optics', subject: 'physics' },
  { id: 'p196', name: 'Critical Angle', math: 'sinθ_c = n₂/n₁ (n₁>n₂)', category: 'Ray Optics', subject: 'physics' },
  { id: 'p197', name: 'Apparent Depth', math: 'd\' = d/n', category: 'Ray Optics', subject: 'physics' },
  { id: 'p198', name: 'Lateral Shift', math: 'Shift = d(1 - 1/n)', category: 'Ray Optics', subject: 'physics' },
  { id: 'p199', name: 'Prism Angle', math: 'r₁ + r₂ = A', category: 'Ray Optics', subject: 'physics' },
  { id: 'p200', name: 'Angle of Deviation', math: 'δ = i + e - A', category: 'Ray Optics', subject: 'physics' },
  { id: 'p201', name: 'Minimum Deviation', math: 'μ = sin[(A+δ_m)/2]/sin(A/2)', category: 'Ray Optics', subject: 'physics' },
  { id: 'p202', name: 'Dispersive Power', math: 'ω = (μ_v - μ_r)/(μ_y - 1)', category: 'Ray Optics', subject: 'physics' },
  { id: 'p203', name: 'Simple Microscope', math: 'm = 1 + D/f', category: 'Optical Instruments', subject: 'physics' },
  { id: 'p204', name: 'Compound Microscope', math: 'M = (v₀/u₀)(1 + D/f_e)', category: 'Optical Instruments', subject: 'physics' },
  { id: 'p205', name: 'Astronomical Telescope', math: 'M = -f₀/f_e', category: 'Optical Instruments', subject: 'physics' },
  { id: 'p206', name: 'YDSE Fringe Width', math: 'β = λD/d', category: 'Wave Optics', subject: 'physics' },
  { id: 'p207', name: 'YDSE Path Difference', math: 'Δx = dsinθ = nλ (bright)', category: 'Wave Optics', subject: 'physics' },
  { id: 'p208', name: 'Intensity in Interference', math: 'I = I₁ + I₂ + 2√(I₁I₂)cosφ', category: 'Wave Optics', subject: 'physics' },
  { id: 'p209', name: 'Diffraction Minima', math: 'asinθ = nλ', category: 'Wave Optics', subject: 'physics' },
  { id: 'p210', name: 'Width of Central Maximum', math: 'width = 2λD/a', category: 'Wave Optics', subject: 'physics' },
  { id: 'p211', name: 'Brewster\'s Law', math: 'tanθ_p = n₂/n₁', category: 'Wave Optics', subject: 'physics' },
  { id: 'p212', name: 'Malus\'s Law', math: 'I = I₀cos²θ', category: 'Wave Optics', subject: 'physics' },

  // PHYSICS - Modern Physics
  { id: 'p213', name: 'Einstein\'s Photoelectric Eq', math: 'hν = φ + K_max', category: 'Modern Physics', subject: 'physics' },
  { id: 'p214', name: 'Max KE (Photoelectric)', math: 'K_max = eV₀', category: 'Modern Physics', subject: 'physics' },
  { id: 'p215', name: 'Threshold Frequency', math: 'ν₀ = φ/h', category: 'Modern Physics', subject: 'physics' },
  { id: 'p216', name: 'de Broglie Wavelength', math: 'λ = h/p = h/√(2mK)', category: 'Modern Physics', subject: 'physics' },
  { id: 'p217', name: 'Bohr Quantization', math: 'mvr = nh/2π', category: 'Modern Physics', subject: 'physics' },
  { id: 'p218', name: 'Bohr Energy Level', math: 'E_n = -13.6Z²/n² eV', category: 'Modern Physics', subject: 'physics' },
  { id: 'p219', name: 'Bohr Radius', math: 'r_n = 0.529n²/Z Å', category: 'Modern Physics', subject: 'physics' },
  { id: 'p220', name: 'Rydberg Formula', math: '1/λ = R(1/n₁² - 1/n₂²)', category: 'Modern Physics', subject: 'physics' },
  { id: 'p221', name: 'X-ray Cutoff Wavelength', math: 'λ_min = hc/eV = 1240/V nm', category: 'Modern Physics', subject: 'physics' },
  { id: 'p222', name: 'Moseley\'s Law', math: '√ν = a(Z-b)', category: 'Modern Physics', subject: 'physics' },
  { id: 'p223', name: 'Mass-Energy Equivalence', math: 'E = mc²', category: 'Modern Physics', subject: 'physics' },
  { id: 'p224', name: 'Atomic Mass Unit', math: '1 u = 931.5 MeV/c²', category: 'Modern Physics', subject: 'physics' },
  { id: 'p225', name: 'Binding Energy per Nucleon', math: 'B.E./A = [Zm_p + Nm_n - M_nucleus]c²/A', category: 'Modern Physics', subject: 'physics' },
  { id: 'p226', name: 'Radioactive Decay', math: 'N = N₀e^(-λt)', category: 'Modern Physics', subject: 'physics' },
  { id: 'p227', name: 'Activity', math: 'A = A₀e^(-λt)', category: 'Modern Physics', subject: 'physics' },
  { id: 'p228', name: 'Half Life', math: 't½ = 0.693/λ', category: 'Modern Physics', subject: 'physics' },
  { id: 'p229', name: 'Mean Life', math: 'τ = 1/λ = t½/0.693', category: 'Modern Physics', subject: 'physics' },

  // CHEMISTRY - Physical (Mole Concept)
  { id: 'c1', name: 'Number of Moles', math: 'n = w/M = N/N_A = V/22.4 (STP)', category: 'Mole Concept', subject: 'chemistry' },
  { id: 'c2', name: 'Molarity', math: 'M = n/V(L)', category: 'Mole Concept', subject: 'chemistry' },
  { id: 'c3', name: 'Molality', math: 'm = n/w(kg)', category: 'Mole Concept', subject: 'chemistry' },
  { id: 'c4', name: 'Mass Percentage', math: '%w/w = (w_solute/w_solution) × 100', category: 'Mole Concept', subject: 'chemistry' },
  { id: 'c5', name: 'Parts Per Million', math: 'ppm = (w_solute/w_solution) × 10⁶', category: 'Mole Concept', subject: 'chemistry' },
  { id: 'c6', name: 'Mole Fraction', math: 'X_A = n_A/(n_A + n_B)', category: 'Mole Concept', subject: 'chemistry' },
  { id: 'c7', name: 'Molarity-Mole Fraction', math: 'M = (1000ρX)/(MX + 1000)', category: 'Mole Concept', subject: 'chemistry' },
  { id: 'c8', name: 'Raoult\'s Law (Volatile)', math: 'P = X_AP°_A + X_BP°_B', category: 'Liquid Solutions', subject: 'chemistry' },
  { id: 'c9', name: 'Relative Lowering', math: '(P°-P)/P° = X_solute', category: 'Liquid Solutions', subject: 'chemistry' },
  { id: 'c10', name: 'Elevation in Boiling Point', math: 'ΔT_b = iK_bm', category: 'Colligative Properties', subject: 'chemistry' },
  { id: 'c11', name: 'Depression in Freezing Point', math: 'ΔT_f = iK_fm', category: 'Colligative Properties', subject: 'chemistry' },
  { id: 'c12', name: 'Osmotic Pressure', math: 'π = iCRT', category: 'Colligative Properties', subject: 'chemistry' },
  { id: 'c13', name: 'Van\'t Hoff Factor', math: 'i = (Normal molar mass)/(Observed molar mass)', category: 'Colligative Properties', subject: 'chemistry' },
  { id: 'c14', name: 'Henry\'s Law', math: 'p = K_H·X', category: 'Liquid Solutions', subject: 'chemistry' },

  // CHEMISTRY - Physical (Thermodynamics)
  { id: 'c15', name: 'First Law', math: 'ΔU = q + w', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c16', name: 'Enthalpy Relation', math: 'ΔH = ΔU + Δn_gRT', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c17', name: 'Heat Capacities', math: 'C_p - C_v = R', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c18', name: 'Hess\'s Law', math: 'ΔH_reaction = ΣΔH_f(products) - ΣΔH_f(reactants)', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c19', name: 'Entropy Definition', math: 'ΔS = q_rev/T', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c20', name: 'Gibbs Free Energy', math: 'ΔG = ΔH - TΔS', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c21', name: 'Equilibrium Criterion', math: 'ΔG° = -RTlnK', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c22', name: 'Reaction Quotient', math: 'ΔG = ΔG° + RTlnQ', category: 'Thermodynamics', subject: 'chemistry' },
  { id: 'c23', name: 'Equilibrium Constant (Kp/Kc)', math: 'K_p = K_c(RT)^Δn', category: 'Equilibrium', subject: 'chemistry' },
  { id: 'c24', name: 'Ionic Product of Water', math: 'K_w = [H⁺][OH⁻] = 10⁻¹⁴ (25°C)', category: 'Ionic Equilibrium', subject: 'chemistry' },
  { id: 'c25', name: 'pH + pOH', math: 'pH + pOH = 14', category: 'Ionic Equilibrium', subject: 'chemistry' },
  { id: 'c26', name: 'pH Definition', math: 'pH = -log[H⁺]', category: 'Ionic Equilibrium', subject: 'chemistry' },
  { id: 'c27', name: 'Henderson-Hasselbalch', math: 'pH = pK_a + log([A⁻]/[HA])', category: 'Ionic Equilibrium', subject: 'chemistry' },
  { id: 'c28', name: 'Solubility Product', math: 'K_sp = [A⁺]^m[B⁻]^n', category: 'Ionic Equilibrium', subject: 'chemistry' },
  { id: 'c29', name: 'Cell Potential', math: 'E°_cell = E°_cathode - E°_anode', category: 'Electrochemistry', subject: 'chemistry' },
  { id: 'c30', name: 'Gibbs-Cell Potential', math: 'ΔG° = -nFE°', category: 'Electrochemistry', subject: 'chemistry' },
  { id: 'c31', name: 'Nernst Equation', math: 'E = E° - (0.059/n)logQ', category: 'Electrochemistry', subject: 'chemistry' },
  { id: 'c32', name: 'Conductivity', math: 'κ = 1/ρ = G*', category: 'Electrochemistry', subject: 'chemistry' },
  { id: 'c33', name: 'Molar Conductivity', math: 'Λ_m = κ/C', category: 'Electrochemistry', subject: 'chemistry' },
  { id: 'c34', name: 'Kohlrausch\'s Law', math: 'Λ°_m = Λ°_+ + Λ°_-', category: 'Electrochemistry', subject: 'chemistry' },

  // CHEMISTRY - Kinetics
  { id: 'c35', name: 'Rate of Reaction', math: 'Rate = -d[R]/dt = +d[P]/dt', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c36', name: 'Rate Law', math: 'Rate = k[A]^m[B]^n', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c37', name: 'Zero Order Integrated', math: '[A] = [A]₀ - kt', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c38', name: 'First Order Integrated', math: 'ln[A] = ln[A]₀ - kt', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c39', name: 'Second Order Integrated', math: '1/[A] = 1/[A]₀ + kt', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c40', name: 'Zero Order Half-life', math: 't½ = [A]₀/2k', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c41', name: 'First Order Half-life', math: 't½ = 0.693/k', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c42', name: 'Second Order Half-life', math: 't½ = 1/k[A]₀', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c43', name: 'Arrhenius Equation', math: 'k = Ae^(-E_a/RT)', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c44', name: 'Arrhenius Two-Point', math: 'ln(k₂/k₁) = (E_a/R)(1/T₁ - 1/T₂)', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c45', name: 'Activation Energy', math: 'E_a = RT²(dlnk/dT)', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c46', name: 'Collision Theory', math: 'Rate = PZ_ABe^(-E_a/RT)', category: 'Chemical Kinetics', subject: 'chemistry' },
  { id: 'c47', name: 'Freundlich Adsorption', math: 'x/m = kp^(1/n)', category: 'Surface Chemistry', subject: 'chemistry' },
  { id: 'c48', name: 'Langmuir Adsorption', math: 'x/m = ap/(1+bp)', category: 'Surface Chemistry', subject: 'chemistry' },

  // CHEMISTRY - Inorganic
  { id: 'c49', name: 'de Broglie Wavelength', math: 'λ = h/mv = h/p', category: 'Atomic Structure', subject: 'chemistry' },
  { id: 'c50', name: 'Heisenberg Uncertainty', math: 'Δx·Δp ≥ h/4π', category: 'Atomic Structure', subject: 'chemistry' },
  { id: 'c51', name: 'Bohr Radius', math: 'r_n = 0.529n²/Z Å', category: 'Atomic Structure', subject: 'chemistry' },
  { id: 'c52', name: 'Bohr Energy', math: 'E_n = -13.6Z²/n² eV', category: 'Atomic Structure', subject: 'chemistry' },
  { id: 'c53', name: 'Bohr Velocity', math: 'v_n = 2.188×10⁶Z/n m/s', category: 'Atomic Structure', subject: 'chemistry' },
  { id: 'c54', name: 'Max Electrons in Shell', math: 'Max e⁻ = 2n²', category: 'Atomic Structure', subject: 'chemistry' },
  { id: 'c55', name: 'Effective Nuclear Charge', math: 'Z_eff = Z - σ', category: 'Periodic Table', subject: 'chemistry' },
  { id: 'c56', name: 'Bond Order', math: 'BO = ½(N_b - N_a)', category: 'Chemical Bonding', subject: 'chemistry' },
  { id: 'c57', name: 'Dipole Moment', math: 'μ = q × d', category: 'Chemical Bonding', subject: 'chemistry' },
  { id: 'c58', name: '% Ionic Character', math: '% = (μ_obs/μ_theo) × 100', category: 'Chemical Bonding', subject: 'chemistry' },
  { id: 'c59', name: 'CFSE (Octahedral)', math: 'CFSE = (-0.4n_t2g + 0.6n_eg)Δ_o', category: 'Coordination Chemistry', subject: 'chemistry' },
  { id: 'c60', name: 'Tetrahedral Splitting', math: 'Δ_t = 4/9 Δ_o', category: 'Coordination Chemistry', subject: 'chemistry' },
  { id: 'c61', name: 'EAN Rule', math: 'EAN = Z - O.N. + 2×C.N.', category: 'Coordination Chemistry', subject: 'chemistry' },
  { id: 'c62', name: 'Magnetic Moment', math: 'μ = √[n(n+2)] BM', category: 'Coordination Chemistry', subject: 'chemistry' },

  // CHEMISTRY - Organic
  { id: 'c63', name: 'Degree of Unsaturation', math: 'DU = C - H/2 - X/2 + N/2 + 1', category: 'General Organic', subject: 'chemistry' },
  { id: 'c64', name: 'Specific Rotation', math: '[α] = α/(l×c)', category: 'Stereochemistry', subject: 'chemistry' },
  { id: 'c65', name: 'Hückel\'s Rule', math: '(4n+2)π e⁻', category: 'General Organic', subject: 'chemistry' },
  { id: 'c66', name: 'Resonance Energy', math: 'ΔH_exp - ΔH_calc', category: 'General Organic', subject: 'chemistry' },

  // MATHEMATICS - Algebra
  { id: 'm1', name: 'Quadratic Formula', math: 'x = [-b ± √(b²-4ac)] / 2a', category: 'Algebra', subject: 'math' },
  { id: 'm2', name: 'Discriminant', math: 'D = b² - 4ac', category: 'Algebra', subject: 'math' },
  { id: 'm3', name: 'Vieta\'s (Sum)', math: 'α + β = -b/a', category: 'Algebra', subject: 'math' },
  { id: 'm4', name: 'Vieta\'s (Product)', math: 'αβ = c/a', category: 'Algebra', subject: 'math' },
  { id: 'm5', name: 'Euler\'s Formula', math: 'e^(iθ) = cosθ + isinθ', category: 'Complex Numbers', subject: 'math' },
  { id: 'm6', name: 'De Moivre\'s Theorem', math: '(cosθ + isinθ)^n = cos(nθ) + isin(nθ)', category: 'Complex Numbers', subject: 'math' },
  { id: 'm7', name: 'Modulus', math: '|z| = √(x²+y²)', category: 'Complex Numbers', subject: 'math' },
  { id: 'm8', name: 'Argument', math: 'θ = arg(z) = tan⁻¹(y/x)', category: 'Complex Numbers', subject: 'math' },
  { id: 'm9', name: 'Cube Roots of Unity', math: '1 + ω + ω² = 0', category: 'Complex Numbers', subject: 'math' },
  { id: 'm10', name: 'AP nth Term', math: 'a_n = a + (n-1)d', category: 'Sequences', subject: 'math' },
  { id: 'm11', name: 'AP Sum', math: 'S_n = n/2[2a + (n-1)d]', category: 'Sequences', subject: 'math' },
  { id: 'm12', name: 'GP nth Term', math: 'a_n = ar^(n-1)', category: 'Sequences', subject: 'math' },
  { id: 'm13', name: 'GP Sum (Finite)', math: 'S_n = a(r^n-1)/(r-1)', category: 'Sequences', subject: 'math' },
  { id: 'm14', name: 'GP Sum (Infinite)', math: 'S_∞ = a/(1-r) for |r| < 1', category: 'Sequences', subject: 'math' },
  { id: 'm15', name: 'AM-GM-HM', math: 'AM ≥ GM ≥ HM', category: 'Sequences', subject: 'math' },
  { id: 'm16', name: 'Sum of First n Naturals', math: 'Σn = n(n+1)/2', category: 'Series', subject: 'math' },
  { id: 'm17', name: 'Sum of Squares', math: 'Σn² = n(n+1)(2n+1)/6', category: 'Series', subject: 'math' },
  { id: 'm18', name: 'Sum of Cubes', math: 'Σn³ = [n(n+1)/2]²', category: 'Series', subject: 'math' },
  { id: 'm19', name: 'Binomial Expansion', math: '(a+b)^n = Σ ⁿC_r a^(n-r)b^r', category: 'Binomial', subject: 'math' },
  { id: 'm20', name: 'General Term', math: 'T_(r+1) = ⁿC_r a^(n-r)b^r', category: 'Binomial', subject: 'math' },
  { id: 'm21', name: 'Combination Formula', math: 'ⁿC_r = n!/(r!(n-r)!)', category: 'Binomial', subject: 'math' },
  { id: 'm22', name: 'Pascal\'s Identity', math: 'ⁿC_r + ⁿC_(r-1) = ⁿ⁺¹C_r', category: 'Binomial', subject: 'math' },
  { id: 'm23', name: 'Sum of Binomial Coeffs', math: 'Σ ⁿC_r = 2^n', category: 'Binomial', subject: 'math' },
  { id: 'm24', name: 'Permutation', math: 'ⁿP_r = n!/(n-r)!', category: 'P&C', subject: 'math' },
  { id: 'm25', name: 'Circular Permutation', math: '(n-1)!', category: 'P&C', subject: 'math' },
  { id: 'm26', name: 'Derangements', math: 'D_n = n!(1 - 1/1! + 1/2! - ...)', category: 'P&C', subject: 'math' },
  { id: 'm27', name: 'Bayes\' Theorem', math: 'P(A|B) = P(B|A)P(A)/P(B)', category: 'Probability', subject: 'math' },
  { id: 'm28', name: 'Conditional Probability', math: 'P(A|B) = P(A∩B)/P(B)', category: 'Probability', subject: 'math' },
  { id: 'm29', name: 'Total Probability', math: 'P(A) = Σ P(E_i)P(A|E_i)', category: 'Probability', subject: 'math' },
  { id: 'm30', name: 'Binomial Distribution', math: 'P(X=r) = ⁿC_r p^r q^(n-r)', category: 'Probability', subject: 'math' },
  { id: 'm31', name: 'Matrix Transpose Product', math: '(AB)^T = B^T A^T', category: 'Matrices', subject: 'math' },
  { id: 'm32', name: 'Matrix Inverse Product', math: '(AB)^-1 = B^-1 A^-1', category: 'Matrices', subject: 'math' },
  { id: 'm33', name: 'Determinant Product', math: '|AB| = |A||B|', category: 'Matrices', subject: 'math' },
  { id: 'm34', name: 'Inverse Formula', math: 'A^-1 = adj(A)/|A|', category: 'Matrices', subject: 'math' },
  { id: 'm35', name: 'Cramer\'s Rule', math: 'x = Δ₁/Δ, y = Δ₂/Δ', category: 'Matrices', subject: 'math' },

  // MATHEMATICS - Calculus
  { id: 'm36', name: 'Limit (sinx/x)', math: 'lim(x→0) sinx/x = 1', category: 'Limits', subject: 'math' },
  { id: 'm37', name: 'Limit (tanx/x)', math: 'lim(x→0) tanx/x = 1', category: 'Limits', subject: 'math' },
  { id: 'm38', name: 'Limit (Exponential)', math: 'lim(x→0) (e^x-1)/x = 1', category: 'Limits', subject: 'math' },
  { id: 'm39', name: 'Limit (Logarithmic)', math: 'lim(x→0) ln(1+x)/x = 1', category: 'Limits', subject: 'math' },
  { id: 'm40', name: 'L\'Hospital\'s Rule', math: 'lim f(x)/g(x) = lim f\'(x)/g\'(x)', category: 'Limits', subject: 'math' },
  { id: 'm41', name: 'Power Rule', math: 'd(x^n)/dx = nx^(n-1)', category: 'Derivatives', subject: 'math' },
  { id: 'm42', name: 'Exponential Derivative', math: 'd(e^x)/dx = e^x', category: 'Derivatives', subject: 'math' },
  { id: 'm43', name: 'Logarithmic Derivative', math: 'd(lnx)/dx = 1/x', category: 'Derivatives', subject: 'math' },
  { id: 'm44', name: 'Sine Derivative', math: 'd(sinx)/dx = cosx', category: 'Derivatives', subject: 'math' },
  { id: 'm45', name: 'Cosine Derivative', math: 'd(cosx)/dx = -sinx', category: 'Derivatives', subject: 'math' },
  { id: 'm46', name: 'Product Rule', math: '(uv)\' = u\'v + uv\'', category: 'Derivatives', subject: 'math' },
  { id: 'm47', name: 'Quotient Rule', math: '(u/v)\' = (u\'v - uv\')/v²', category: 'Derivatives', subject: 'math' },
  { id: 'm48', name: 'Chain Rule', math: 'dy/dx = dy/du × du/dx', category: 'Derivatives', subject: 'math' },
  { id: 'm49', name: 'Inverse Sine', math: 'd(sin⁻¹x)/dx = 1/√(1-x²)', category: 'Derivatives', subject: 'math' },
  { id: 'm50', name: 'Inverse Cosine', math: 'd(cos⁻¹x)/dx = -1/√(1-x²)', category: 'Derivatives', subject: 'math' },
  { id: 'm51', name: 'Inverse Tangent', math: 'd(tan⁻¹x)/dx = 1/(1+x²)', category: 'Derivatives', subject: 'math' },
  { id: 'm52', name: 'Rolle\'s Theorem', math: 'f\'(c) = 0', category: 'Application of Derivatives', subject: 'math' },
  { id: 'm53', name: 'LMVT', math: 'f\'(c) = [f(b)-f(a)]/(b-a)', category: 'Application of Derivatives', subject: 'math' },
  { id: 'm54', name: 'Power Rule Integration', math: '∫x^n dx = x^(n+1)/(n+1)', category: 'Integration', subject: 'math' },
  { id: 'm55', name: 'Exponential Integration', math: '∫e^x dx = e^x + C', category: 'Integration', subject: 'math' },
  { id: 'm56', name: 'Logarithmic Integration', math: '∫1/x dx = ln|x| + C', category: 'Integration', subject: 'math' },
  { id: 'm57', name: 'Sine Integration', math: '∫sinx dx = -cosx + C', category: 'Integration', subject: 'math' },
  { id: 'm58', name: 'Cosine Integration', math: '∫cosx dx = sinx + C', category: 'Integration', subject: 'math' },
  { id: 'm59', name: 'Standard Form (1)', math: '∫1/(x²+a²) dx = (1/a)tan⁻¹(x/a)', category: 'Integration', subject: 'math' },
  { id: 'm60', name: 'Standard Form (2)', math: '∫1/√(a²-x²) dx = sin⁻¹(x/a)', category: 'Integration', subject: 'math' },
  { id: 'm61', name: 'Integration by Parts', math: '∫u dv = uv - ∫v du', category: 'Integration', subject: 'math' },
  { id: 'm62', name: 'Special Integral', math: '∫e^x[f(x)+f\'(x)]dx = e^xf(x)', category: 'Integration', subject: 'math' },
  { id: 'm63', name: 'Definite Property', math: '∫_a^b f(x)dx = ∫_a^b f(a+b-x)dx', category: 'Integration', subject: 'math' },
  { id: 'm64', name: 'Gamma Function', math: 'Γ(n+1) = n!', category: 'Integration', subject: 'math' },
  { id: 'm65', name: 'Variable Separable', math: 'dy/dx = f(x)g(y)', category: 'Differential Equations', subject: 'math' },
  { id: 'm66', name: 'Linear Differential Eq', math: 'dy/dx + P(x)y = Q(x)', category: 'Differential Equations', subject: 'math' },
  { id: 'm67', name: 'Integrating Factor', math: 'I.F. = e^(∫Pdx)', category: 'Differential Equations', subject: 'math' },
  { id: 'm68', name: 'Area Under Curve', math: 'A = ∫_a^b y dx', category: 'Application of Integrals', subject: 'math' },

  // MATHEMATICS - Coordinate Geometry & Vectors
  { id: 'm69', name: 'Distance Formula', math: 'd = √[(x₂-x₁)² + (y₂-y₁)²]', category: 'Coordinate Geometry', subject: 'math' },
  { id: 'm70', name: 'Section Formula', math: '((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))', category: 'Coordinate Geometry', subject: 'math' },
  { id: 'm71', name: 'Area of Triangle', math: '½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)|', category: 'Coordinate Geometry', subject: 'math' },
  { id: 'm72', name: 'Slope-Intercept Form', math: 'y = mx + c', category: 'Straight Lines', subject: 'math' },
  { id: 'm73', name: 'Point-Slope Form', math: 'y-y₁ = m(x-x₁)', category: 'Straight Lines', subject: 'math' },
  { id: 'm74', name: 'Distance from Point to Line', math: '|ax₁+by₁+c|/√(a²+b²)', category: 'Straight Lines', subject: 'math' },
  { id: 'm75', name: 'Circle Standard', math: '(x-h)² + (y-k)² = r²', category: 'Circles', subject: 'math' },
  { id: 'm76', name: 'Circle General', math: 'x² + y² + 2gx + 2fy + c = 0', category: 'Circles', subject: 'math' },
  { id: 'm77', name: 'Parabola Standard', math: 'y² = 4ax', category: 'Conic Sections', subject: 'math' },
  { id: 'm78', name: 'Ellipse Standard', math: 'x²/a² + y²/b² = 1', category: 'Conic Sections', subject: 'math' },
  { id: 'm79', name: 'Eccentricity (Ellipse)', math: 'e = √(1-b²/a²)', category: 'Conic Sections', subject: 'math' },
  { id: 'm80', name: 'Hyperbola Standard', math: 'x²/a² - y²/b² = 1', category: 'Conic Sections', subject: 'math' },
  { id: 'm81', name: 'Eccentricity (Hyperbola)', math: 'e = √(1+b²/a²)', category: 'Conic Sections', subject: 'math' },
  { id: 'm82', name: 'Dot Product', math: 'a⃗·b⃗ = |a||b|cosθ = a₁b₁ + a₂b₂ + a₃b₃', category: 'Vectors', subject: 'math' },
  { id: 'm83', name: 'Cross Product Magnitude', math: '|a⃗×b⃗| = |a||b|sinθ', category: 'Vectors', subject: 'math' },
  { id: 'm84', name: 'Scalar Triple Product', math: '[a⃗ b⃗ c⃗] = a⃗·(b⃗×c⃗)', category: 'Vectors', subject: 'math' },
  { id: 'm85', name: 'Direction Cosines', math: 'l² + m² + n² = 1', category: '3D Geometry', subject: 'math' },
  { id: 'm86', name: 'Plane Equation', math: 'ax + by + cz + d = 0', category: '3D Geometry', subject: 'math' },

  // MATHEMATICS - Statistics
  { id: 'm87', name: 'Mean', math: 'x̄ = Σxᵢ/n', category: 'Statistics', subject: 'math' },
  { id: 'm88', name: 'Variance', math: 'σ² = Σ(xᵢ - x̄)²/n', category: 'Statistics', subject: 'math' },
  { id: 'm89', name: 'Standard Deviation', math: 'σ = √σ²', category: 'Statistics', subject: 'math' },
  { id: 'm90', name: 'Correlation Coefficient', math: 'r = Cov(x,y)/(σ_x σ_y)', category: 'Statistics', subject: 'math' },

  // BIOLOGY - Cell Biology
  { id: 'b1', name: 'Water Potential', math: 'Ψ = Ψ_s + Ψ_p', category: 'Cell Biology', subject: 'biology' },
  { id: 'b2', name: 'Solute Potential', math: 'Ψ_s = -iCRT', category: 'Cell Biology', subject: 'biology' },
  { id: 'b3', name: 'Surface Area to Volume', math: 'SA:V = 3/r', category: 'Cell Biology', subject: 'biology' },
  { id: 'b4', name: 'Michaelis-Menten', math: 'V = (V_max [S])/(K_m + [S])', category: 'Enzymology', subject: 'biology' },
  { id: 'b5', name: 'Lineweaver-Burk', math: '1/V = (K_m/V_max)(1/[S]) + 1/V_max', category: 'Enzymology', subject: 'biology' },
  { id: 'b6', name: 'Respiratory Quotient', math: 'RQ = CO₂ produced/O₂ consumed', category: 'Respiration', subject: 'biology' },
  { id: 'b7', name: 'ATP Yield (Aerobic)', math: '~36-38 ATP/glucose', category: 'Respiration', subject: 'biology' },

  // BIOLOGY - Genetics
  { id: 'b8', name: 'Hardy-Weinberg (Alleles)', math: 'p + q = 1', category: 'Genetics', subject: 'biology' },
  { id: 'b9', name: 'Hardy-Weinberg (Genotypes)', math: 'p² + 2pq + q² = 1', category: 'Genetics', subject: 'biology' },
  { id: 'b10', name: 'Allele Frequency', math: 'p = (2N_AA + N_Aa)/2N', category: 'Genetics', subject: 'biology' },
  { id: 'b11', name: 'Recombination Frequency', math: 'RF = (Recombinants/Total) × 100%', category: 'Genetics', subject: 'biology' },
  { id: 'b12', name: 'Chi-Square', math: 'χ² = Σ[(O-E)²/E]', category: 'Genetics', subject: 'biology' },
  { id: 'b13', name: 'Chargaff\'s Rule', math: '%A = %T, %G = %C', category: 'Molecular Biology', subject: 'biology' },
  { id: 'b14', name: 'DNA Quantification', math: '1 A260 = 50 μg/mL dsDNA', category: 'Molecular Biology', subject: 'biology' },
  { id: 'b15', name: 'Melting Temperature', math: 'T_m ≈ 2°C×(A+T) + 4°C×(G+C)', category: 'Molecular Biology', subject: 'biology' },
  { id: 'b16', name: 'PCR Amplification', math: 'DNA copies = 2^n', category: 'Biotechnology', subject: 'biology' },
  { id: 'b17', name: 'Transformation Efficiency', math: 'CFU/μg = (Colonies × DF)/DNA(μg)', category: 'Biotechnology', subject: 'biology' },
  { id: 'b18', name: 'Ligation Ratio', math: 'Insert:Vector = 3:1 to 10:1', category: 'Biotechnology', subject: 'biology' },

  // BIOLOGY - Physiology
  { id: 'b19', name: 'Cardiac Output', math: 'CO = HR × SV (~5 L/min)', category: 'Human Physiology', subject: 'biology' },
  { id: 'b20', name: 'Stroke Volume', math: 'SV = EDV - ESV', category: 'Human Physiology', subject: 'biology' },
  { id: 'b21', name: 'Ejection Fraction', math: 'EF = (SV/EDV) × 100%', category: 'Human Physiology', subject: 'biology' },
  { id: 'b22', name: 'Mean Arterial Pressure', math: 'MAP = DP + (SP-DP)/3', category: 'Human Physiology', subject: 'biology' },
  { id: 'b23', name: 'GFR', math: '~125 mL/min', category: 'Human Physiology', subject: 'biology' },
  { id: 'b24', name: 'BMI', math: 'weight(kg)/height²(m²)', category: 'Human Physiology', subject: 'biology' },
  { id: 'b25', name: 'Respiratory Quotient (Carb)', math: 'RQ = 1.0', category: 'Plant Physiology', subject: 'biology' },
  { id: 'b26', name: 'Respiratory Quotient (Fat)', math: 'RQ ≈ 0.7', category: 'Plant Physiology', subject: 'biology' },
  { id: 'b27', name: 'Transpiration Ratio (C3)', math: '450-950 H₂O/g dry matter', category: 'Plant Physiology', subject: 'biology' },
  { id: 'b28', name: 'Transpiration Ratio (C4)', math: '250-350 H₂O/g dry matter', category: 'Plant Physiology', subject: 'biology' },

  // BIOLOGY - Ecology & Evolution
  { id: 'b29', name: 'Exponential Growth', math: 'dN/dt = rN or N_t = N₀e^(rt)', category: 'Ecology', subject: 'biology' },
  { id: 'b30', name: 'Logistic Growth', math: 'dN/dt = rN((K-N)/K)', category: 'Ecology', subject: 'biology' },
  { id: 'b31', name: 'Net Reproductive Rate', math: 'R₀ = Σ l_x m_x', category: 'Ecology', subject: 'biology' },
  { id: 'b32', name: 'Generation Time', math: 'T = Σ x l_x m_x / R₀', category: 'Ecology', subject: 'biology' },
  { id: 'b33', name: 'Doubling Time', math: 't_d = ln(2)/r ≈ 0.693/r', category: 'Ecology', subject: 'biology' },
  { id: 'b34', name: 'Shannon Diversity', math: 'H\' = -Σ p_i ln(p_i)', category: 'Ecology', subject: 'biology' },
  { id: 'b35', name: 'Simpson Diversity', math: 'D = 1 - Σ p_i²', category: 'Ecology', subject: 'biology' },
  { id: 'b36', name: 'Trophic Efficiency', math: '~10% between levels', category: 'Ecology', subject: 'biology' },
  { id: 'b37', name: 'Selection Coefficient', math: 's = 1 - w', category: 'Evolution', subject: 'biology' },
  { id: 'b38', name: 'Mutation-Selection Balance', math: 'q = √(μ/s)', category: 'Evolution', subject: 'biology' },
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
    { id: 'math', label: 'Mathematics', icon: Calculator, color: 'emerald' },
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
            Complete PCMB formula repository for IAT 2026. {formulas.length}+ formulas covering Physics, Chemistry, Mathematics, and Biology.
          </p>
        </div>

        <div className="relative group max-w-md w-full">
          <div className="absolute inset-0 bg-indigo-500/10 blur-xl group-focus-within:bg-indigo-500/20 transition-all rounded-full" />
          <div className="relative flex items-center bg-[#141529]/80 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-500/50 transition-all">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Search formulas (e.g. lens formula, quadratic)..."
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

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Showing {filteredFormulas.length} formulas</span>
        <span className="hidden md:inline">Press <kbd className="px-2 py-1 bg-white/5 rounded text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white/5 rounded text-xs">K</kbd> to search</span>
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
              <div className="h-full p-6 rounded-2xl bg-[#141529]/60 backdrop-blur-md border border-white/10 hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/5">
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
                    {formula.subject === 'math' && <Calculator className="w-4 h-4" />}
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
                    {formula.subject.charAt(0).toUpperCase() + formula.subject.slice(1)}
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
            Don't just memorize! Understand how these formulas are derived. For IAT, the application of multiple formulas in a single problem is very common. Use the **AI Tutor** for derivation steps and practice problems.
          </p>
        </div>
      </motion.div>
    </div>
  );
}